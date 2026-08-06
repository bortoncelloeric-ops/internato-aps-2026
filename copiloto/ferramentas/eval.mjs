/* Eval da camada generativa — 9 asserts determinísticos, zero LLM-juiz.
 *
 * O ponto: "melhor que o ChatGPT" precisa ser verificável, não impressão. Estes
 * asserts são todos regex ou checagem de schema, rodam em segundos e custam zero.
 * O guia que o ChatGPT devolveu nos dois casos reais FALHA 5 deles — esse é o
 * baseline a superar. Passar 9/9 é a definição operacional de melhor.
 *
 * Sem dependência, de propósito: `node ferramentas/eval.mjs`. O projeto inteiro
 * é zero-build e o eval não vai ser a primeira coisa a exigir `npm install`.
 * (O plano previa promptfoo; trocado por isto pelo mesmo motivo.)
 *
 * Uso:
 *   export OPENROUTER_API_KEY=sk-or-...       # nunca commitar a chave
 *   node ferramentas/eval.mjs                 # roda o modelo padrão
 *   node ferramentas/eval.mjs --modelo=x/y    # compara outro
 *   node ferramentas/eval.mjs --baseline      # só mostra como o ChatGPT se saiu
 */

import { readFileSync } from "node:fs";
import { CASOS } from "./eval-casos.js";

/* Carrega os MESMOS arquivos que o app carrega, na mesma ordem. É isso que
   garante que o eval mede o que roda no consultório: se o prompt mudar em
   guia-contrato.js, muda aqui junto, sem cópia para divergir. */
const raiz = new URL("..", import.meta.url).pathname;
const src = ["oms-lms.js", "calculadoras.js", "fontes.js", "guia-contrato.js"]
  .map(f => readFileSync(raiz + f, "utf8")).join("\n");
const { GUIA_SYS, GUIA_SCHEMA, montarDeterministica, guiaPrompt, montarSOAP, fonteValida, FONTES_VALIDAS } =
  new Function(src + "; return {GUIA_SYS,GUIA_SCHEMA,montarDeterministica,guiaPrompt,montarSOAP,fonteValida,FONTES_VALIDAS};")();

const MODELO_PADRAO = "anthropic/claude-sonnet-5";
/* Fixar o provedor: sem isso o OpenRouter pode rotear a nota para outro host.
   Os slugs do Google são estes — "google" sozinho devolve 404. */
const PROVEDOR_POR_FAMILIA = {
  "google/": ["google-ai-studio", "google-vertex"],
  "anthropic/": ["anthropic"],
  "openai/": ["openai"]
};
const provedores = (m) =>
  (Object.entries(PROVEDOR_POR_FAMILIA).find(([p]) => m.startsWith(p)) || [null, null])[1];

const arg = (n, d) => (process.argv.find(a => a.startsWith(`--${n}=`)) || `=${d}`).split("=").pop();
const MODELO = arg("modelo", MODELO_PADRAO);
const SO_BASELINE = process.argv.includes("--baseline");

/* --------------------------------------------------------------- asserts
   Cada um aponta para uma falha real observada nos PDFs, não para uma boa
   prática genérica. `alvo` limita o assert ao caso onde a falha aconteceu. */
const ASSERTS = [
  { id: 1, alvo: "ex2", nome: "aponta a contradição de idade",
    f: (o) => /7 meses|8 meses|idade/i.test(JSON.stringify(o.pontos_atencao)) },

  /* O defeito do ChatGPT era EVITAR o número ("próximo ou acima do P97"), não
     pedir conferência — a própria camada determinística manda conferir a
     aferição quando o escore passa de ±3 DP. "vale conferir" saiu da lista de
     hedges proibidos: proibi-lo punia o comportamento correto. */
  { id: 2, alvo: "ex2", nome: "usa o escore sem fugir do número",
    f: (o) => /3,0?5/.test(JSON.stringify(o)) &&
              !/(pr[óo]ximo (de|a|ou)|em torno de|aproximadamente|cerca de)/i.test(JSON.stringify(o)) },

  { id: 3, alvo: null, nome: 'nunca escreve "conforme o peso"',
    f: (o) => !/conforme .{0,12}peso|de acordo com .{0,12}peso|ajustad[oa] ao peso/i.test(JSON.stringify(o)) },

  /* Substitui o assert original, que exigia mg/kg no ex1. O ex1 NÃO TEM PESO —
     exigir dose ali contradiz a terceira categoria e o slot de dose. O certo
     é cobrar o peso. */
  { id: 4, alvo: "ex1", nome: "cobra o peso que falta, em vez de dosar",
    f: (o) => /peso/i.test(JSON.stringify(o.dados_faltantes || [])) },

  { id: 5, alvo: null, nome: "modelo não emite dígito de dose",
    f: (o) => !/\d+\s*(mg|ml|mcg|g|UI)\b/i.test(JSON.stringify(o)) },

  { id: 6, alvo: "ex1", nome: "pega a nistatina (baseline do ChatGPT)",
    f: (o) => /nistatina/i.test(JSON.stringify(o.pontos_atencao)) },

  /* Não basta citar a budesonida: o achado é o ERRO DE CLASSE — a nota a chama
     de antialérgico e ela é corticoide. "Budesonida sem indicação clara" cita e
     não acha nada. Por isso o assert exige o nome E uma palavra de classe. */
  { id: 7, alvo: "ex1", nome: "pega o erro de CLASSE da budesonida",
    f: (o) => {
      const s = JSON.stringify(o.pontos_atencao);
      return /budesonida/i.test(s) && /corticoid|corticoster|antial[ée]rg|anti-?histam|classe/i.test(s);
    } },

  /* Antes checava só "tem alguma coisa escrita", e o modelo passava citando de
     memória. Agora a string tem de estar no allowlist gerado da wiki, ou ser o
     literal VERIFICAR — que é o que o app aceita mostrar. */
  { id: 8, alvo: null, nome: "toda fonte está no allowlist ou é VERIFICAR",
    f: (o) => Array.isArray(o.conduta) && o.conduta.length > 0 &&
              o.conduta.every(c => c && fonteValida(c.fonte)) },

  /* O assert que mais pesa, e o que separou os modelos. Gabarito confirmado
     pelo Eric: o ex1 era impetigo. Errar aqui não é errar um campo — anamnese
     dirigida, exame dirigido e conduta saem todos ancorados na doença errada.
     Medido em 5 rodadas por modelo: Sonnet 5 acertou 5/5, Haiku 4.5 acertou 2/5
     (respondeu varicela duas vezes). */
  { id: 9, alvo: null, nome: "hipótese principal correta",
    f: (o, caso) => caso.espera.hipotese.test(o.hipotese_principal || "") }
];

/* Como o guia do ChatGPT (os dois PDFs de 05/08) se sai em cada assert.
   É o baseline: 5 falhas em 9. Fonte: leitura dos PDFs no brainstorming. */
const BASELINE = { 1: false, 2: false, 3: false, 4: false, 5: true, 6: true, 7: false, 8: false, 9: true };

async function roda(caso) {
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODELO,
      ...(provedores(MODELO) ? { provider: { order: provedores(MODELO), allow_fallbacks: false } } : {}),
      reasoning: { effort: "low" },
      /* explícito porque o default do roteador é apertado para um guia de 9
         seções, e resposta truncada aqui vira JSON inválido */
      max_tokens: 4000,
      /* seed fixo: o Gemini expõe `seed`, então a mesma entrada dá a mesma saída
         e o eval vira regressão de verdade em vez de amostra. */
      seed: 20260805,
      response_format: {
        type: "json_schema",
        json_schema: { name: "guia", strict: true, schema: GUIA_SCHEMA }
      },
      messages: [{ role: "system", content: GUIA_SYS },
                 { role: "user", content: guiaPrompt(caso.nota, montarDeterministica(caso.nota, caso.med)) }]
    })
  });
  const j = await r.json();
  if (j.error) throw new Error(JSON.stringify(j.error));
  const c = j.choices && j.choices[0];

  /* Recusa do filtro de segurança NÃO é assert falhando — é o modelo não tendo
     respondido. Tratar as duas coisas igual esconde o problema mais grave dos
     dois: um guia ausente parece um guia ruim. O filtro do Gemini já bloqueou o
     ex1 (menina de 7 anos com impetigo) com PROHIBITED_CONTENT, de forma
     intermitente. Um app que cair nisso com paciente na frente precisa dizer
     "o modelo recusou", nunca ficar em branco. */
  const fim = c && (c.native_finish_reason || c.finish_reason);
  if (!c || c.message.content == null || /content_filter|PROHIBITED|SAFETY|BLOCK/i.test(fim || "")) {
    return { bloqueado: fim || "sem conteúdo", uso: j.usage || {} };
  }
  return { out: JSON.parse(c.message.content), uso: j.usage || {} };
}

/* ------------------------------------------------------------------ main */
const linhas = [];
let passou = 0, total = 0, custoIn = 0, custoOut = 0;

if (SO_BASELINE) {
  console.log("\nBaseline — guia do ChatGPT nos dois PDFs de 05/08:\n");
  for (const a of ASSERTS) {
    console.log(`  ${BASELINE[a.id] ? "ok  " : "FALHA"}  ${a.id}. ${a.nome}`);
  }
  const n = Object.values(BASELINE).filter(Boolean).length;
  console.log(`\n  ${n}/9 — é isto que a v2 precisa superar.\n`);
  process.exit(0);
}

if (!process.env.OPENROUTER_API_KEY) {
  console.error("Falta OPENROUTER_API_KEY no ambiente. A chave nunca entra em arquivo.");
  process.exit(1);
}

console.log(`\nmodelo: ${MODELO}  ·  effort low  ·  seed fixo\n`);

const saidas = {};
const bloqueios = [];
for (const caso of CASOS) {
  try {
    const { out, bloqueado, uso } = await roda(caso);
    custoIn += uso.prompt_tokens || 0;
    custoOut += uso.completion_tokens || 0;
    if (bloqueado) { bloqueios.push(`${caso.id}: ${bloqueado}`); continue; }
    saidas[caso.id] = out;
  } catch (e) {
    console.error(`${caso.id}: FALHOU a chamada — ${e.message}`);
    process.exit(1);
  }
}

if (bloqueios.length) {
  console.log("  RECUSA DO MODELO (não é assert falhando — não houve resposta):");
  bloqueios.forEach(b => console.log(`    ${b}`));
  console.log("");
}

for (const a of ASSERTS) {
  const alvos = a.alvo ? [a.alvo] : CASOS.map(c => c.id);
  let ok = true;
  for (const id of alvos) {
    const caso = CASOS.find(c => c.id === id);
    try { if (!a.f(saidas[id], caso)) ok = false; } catch { ok = false; }
  }
  total++; if (ok) passou++;
  const base = BASELINE[a.id];
  const delta = ok && !base ? "  ← ganho sobre o ChatGPT" : (!ok && base ? "  ← PERDA vs ChatGPT" : "");
  linhas.push(`  ${ok ? "ok  " : "FALHA"}  ${a.id}. ${a.nome}${a.alvo ? ` [${a.alvo}]` : ""}${delta}`);
}

console.log(linhas.join("\n"));
const nBase = Object.values(BASELINE).filter(Boolean).length;
console.log(`\n  ${passou}/${total}  (ChatGPT: ${nBase}/${total})`);
console.log(`  tokens: ${custoIn} in · ${custoOut} out\n`);

if (process.argv.includes("--json")) console.log(JSON.stringify(saidas, null, 1));
process.exit(passou === total ? 0 : 1);
