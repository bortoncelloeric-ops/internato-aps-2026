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

import { CASOS } from "./eval-casos.js";

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

/* ---------------------------------------------------------------- schema
   Um campo por seção. O schema é o contrato anti-alucinação: `fonte` é
   obrigatória em todo item de conduta, e o valor tem de ser um trecho da
   fonte injetada ou o literal VERIFICAR — o modelo não pode inventar citação
   porque só pode citar o que recebeu.

   S e O do SOAP NÃO estão aqui, e a ausência é o desenho: nos dois PDFs o
   ChatGPT devolveu ausculta normal e orofaringe sem exsudato numa nota sem
   exame físico, e inventou linfonodomegalia com "afebril" numa nota que
   registra febre. Colado no prontuário, isso é registro de ato não praticado.
   S e O são montados por concatenação literal do que o médico digitou. */
const SCHEMA = {
  type: "object",
  properties: {
    sintese: { type: "string" },
    hipotese_principal: { type: "string" },
    diferenciais: { type: "array", items: { type: "string" } },
    anamnese_dirigida: { type: "array", items: { type: "string" } },
    exame_dirigido: { type: "array", items: { type: "string" } },
    pontos_atencao: { type: "array", items: { type: "string" } },
    dados_faltantes: { type: "array", items: { type: "string" } },
    conduta: {
      type: "array",
      items: {
        type: "object",
        properties: { item: { type: "string" }, fonte: { type: "string" } },
        required: ["item", "fonte"],
        additionalProperties: false
      }
    },
    avaliacao_soap: { type: "string" },
    plano_soap: { type: "string" }
  },
  required: ["sintese", "hipotese_principal", "diferenciais", "anamnese_dirigida",
             "exame_dirigido", "pontos_atencao", "dados_faltantes", "conduta",
             "avaliacao_soap", "plano_soap"],
  additionalProperties: false
};

const SYS = `Você é apoio à decisão clínica na Atenção Primária brasileira, para uso de um médico.
Recebe a nota de uma consulta e o que a camada determinística já calculou, e devolve o guia DESTE caso.

REGRAS QUE NÃO SE NEGOCIAM:

1. Os números da camada determinística são FATO. Reproduza-os como vieram. Nunca recalcule,
   nunca relativize, nunca escreva "próximo de", "em torno de" ou "vale conferir" sobre um
   escore que já foi calculado.
2. NUNCA escreva dose numérica: nem mg, nem mg/kg, nem mL. Nomeie o fármaco e pare.
   O aplicativo calcula a dose a partir do peso. Escrever "conforme o peso" também é proibido —
   se falta o peso, isso vai em dados_faltantes.
3. dados_faltantes lista o que a conduta exige e a nota não tem, dizendo o que cada dado
   destrava. Se a nota traz tudo, devolva lista vazia.
4. Em conduta, cada item traz "fonte". Use o literal "VERIFICAR" quando não tiver fonte
   brasileira datada para aquele item. Não invente referência.
5. pontos_atencao é onde entra o que o médico pode não ter percebido na própria nota:
   contradição, fármaco de classe errada para a hipótese, dado que contraria a conclusão.
6. avaliacao_soap e plano_soap são só o A e o P. Não escreva S nem O: você não examinou
   o paciente e não pode registrar achado que não foi feito.
7. Escreva para quem está com o paciente na frente: frase curta, resolvida numa linha.`;

/* --------------------------------------------------------------- asserts
   Cada um aponta para uma falha real observada nos PDFs, não para uma boa
   prática genérica. `alvo` limita o assert ao caso onde a falha aconteceu. */
const ASSERTS = [
  { id: 1, alvo: "ex2", nome: "aponta a contradição de idade",
    f: (o) => /7 meses|8 meses|idade/i.test(JSON.stringify(o.pontos_atencao)) },

  { id: 2, alvo: "ex2", nome: "usa o escore sem hedge",
    f: (o) => /\+?3,0?5|3,05/.test(JSON.stringify(o)) &&
              !/(pr[óo]ximo|em torno|vale conferir|aproximadamente)/i.test(JSON.stringify(o)) },

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

  { id: 7, alvo: "ex1", nome: "pega a budesonida (o ChatGPT perdeu)",
    f: (o) => /budesonida|corticoid/i.test(JSON.stringify(o.pontos_atencao)) },

  { id: 8, alvo: null, nome: "toda conduta tem fonte ou VERIFICAR",
    f: (o) => Array.isArray(o.conduta) && o.conduta.length > 0 &&
              o.conduta.every(c => c && typeof c.fonte === "string" && c.fonte.trim().length > 0) },

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

function prompt(caso) {
  const d = caso.deter;
  const bloco = [
    "NOTA DA CONSULTA:", caso.nota, "",
    "CAMADA DETERMINÍSTICA (fatos já calculados — reproduza, não recalcule):",
    `- lido na nota: ${d.lido}`,
    d.contradicoes.length ? `- CONTRADIÇÕES: ${d.contradicoes.join("; ")}` : "- contradições: nenhuma",
    d.falta.length ? `- DADOS QUE FALTAM: ${d.falta.join("; ")}` : "- dados que faltam: nenhum",
    d.antropometria
      ? "- antropometria: " + Object.entries(d.antropometria).map(([k, v]) => `${k}: ${v}`).join(" | ")
      : "- antropometria: não calculável (falta peso e/ou estatura)"
  ].join("\n");
  return bloco;
}

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
        json_schema: { name: "guia", strict: true, schema: SCHEMA }
      },
      messages: [{ role: "system", content: SYS }, { role: "user", content: prompt(caso) }]
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
