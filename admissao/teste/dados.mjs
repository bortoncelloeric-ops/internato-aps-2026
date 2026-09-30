// Validação dos dados do quadros.js em node puro (sem dependência).
// Uso: node teste/dados.mjs   → PASS/FAIL por checagem; sai 1 se algo falhar.
// Também escreve teste/saidas/frases.txt com toda frase que os quadros podem gerar.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const AQUI = path.dirname(new URL(import.meta.url).pathname);
const RAIZ = path.resolve(AQUI, '..');
const COP = path.resolve(RAIZ, '../copiloto');

// const/let de topo não viram propriedade do contexto: reescreve para var antes de rodar
const ctx = {};
vm.createContext(ctx);
for (const f of [path.join(COP, 'psicofarmacos.js'), path.join(COP, 'queixas.js'), path.join(RAIZ, 'quadros.js')]) {
  vm.runInContext(fs.readFileSync(f, 'utf8').replace(/^(const|let) /gm, 'var '), ctx, { filename: f });
}
const { QUADROS, QUEIXAS } = ctx;

// ids da ficha base (melhor esforço: todo `id:'…'` dentro de var FICHA = [ … ];)
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const ficha = (html.match(/var FICHA = \[([\s\S]*?)\n\];/) || [, ''])[1];
const BASE = new Set([...ficha.matchAll(/\bid\s*:\s*'([^']+)'/g)].map(m => m[1]));
// rótulos das opções de pílula da base: op('v','rot', …)
const BASE_OPS = [...ficha.matchAll(/\bop\('[^']*',\s*'([^']+)'/g)].map(m => m[1]);
// detalhe (placeholder) de cada item base: id → ph
const BASE_PH = Object.fromEntries([...ficha.matchAll(/\bid\s*:\s*'([^']+)'[^\n]*?(?:\n[^\n]*?)??ph\s*:\s*'([^']+)'/g)].map(m => [m[1], m[2]]));
const norm = t => String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s*\([^)]*\)/g, '').trim();

// mesma regra do app (index.html, function molde)
function molde(t, d) {
  return t.replace(/\[([^\]]*)\]/g, function (_, dentro) { return d ? dentro.replace('{d}', d) : ''; }).replace('{d}', d || '');
}
const genero = t => t.replace(/\{a\}/g, 'o(a)').replace(/\{ao\}/g, 'ao(à)');
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const juntar = (a, conj) => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + conj + a[a.length - 1];

const SECOES = ['hda', 'pregressa', 'subst', 'clinica', 'ef', 'eem', 'risco', 'hetero'];
const TIPOS = ['tri', 'escolha', 'texto'];
const DOSE = /\d+(?:[.,]\d+)?\s*(?:mg|mcg|µg|g|ml|UI|mEq)\b/i;

// percorre todos os itens (e sub-itens) de uma lista de quadros
function* itens(qs) {
  for (const q of qs) for (const [sec, b] of Object.entries(q.blocos || {}))
    for (const it of (b.itens || [])) {
      yield { q, sec, b, it };
      for (const s of (it.sub || [])) yield { q, sec, b, it: s, pai: it };
    }
}
// toda string de texto de um item, com o campo de onde veio
function textos(it) {
  const out = [];
  const add = (campo, v) => { if (typeof v === 'string') out.push([campo, v]); else if (v && typeof v === 'object' && 't' in v) out.push([campo + '.t', v.t]); };
  for (const k of ['rot', 'na', 'sim', 'nao', 'tpl', 'tplN', 'fmt', 'ph']) add(k, it[k]);
  for (const o of (it.opts || [])) { add('opts.rot', o.rot); if (o.frase !== undefined) add('opts.frase', o.frase); }
  if (it.det) { add('det.ph', it.det.ph); add('det.na', it.det.na); for (const o of (it.det.opts || [])) { add('det.rot', o.rot); if (o.frase !== undefined) add('det.frase', o.frase); } }
  return out;
}
// campos que viram frase da nota (devem começar minúsculos)
const FRASE = new Set(['sim', 'nao', 'sim.t', 'nao.t', 'opts.frase', 'tpl', 'tplN', 'fmt', 'det.frase']);
function frasesDoItem(it) {
  const t = textos(it).filter(([c]) => FRASE.has(c));
  // sem frase, a opção usa o rot como frase
  for (const o of (it.opts || [])) if (o.frase === undefined) t.push(['opts.rot→frase', o.rot]);
  if (it.det && it.det.tipo === 'escolha') for (const o of it.det.opts) if (o.frase === undefined) t.push(['det.rot→frase', o.rot]);
  return t;
}

// ---------- checagens ----------
const checks = [];
const check = (nome, fn) => checks.push({ nome, fn });

check('9 quadros, ids únicos, nome e fonte preenchidos', qs => {
  const e = [];
  if (qs.length !== 9) e.push('são ' + qs.length);
  const ordem = ['psicose', 'mania', 'depressao', 'suicidio', 'agitacao', 'alcool', 'substancias', 'ansiedade', 'delirium'];
  if (qs.map(q => q.id).join() !== ordem.join()) e.push('ordem/ids: ' + qs.map(q => q.id).join());
  if (new Set(qs.map(q => q.id)).size !== qs.length) e.push('id repetido');
  for (const q of qs) { if (!q.nome) e.push(q.id + ' sem nome'); if (!q.fonte) e.push(q.id + ' sem fonte'); }
  return e;
});
check('toda queixa existe em QUEIXAS', qs => qs.filter(q => !QUEIXAS.some(x => x.id === q.queixa)).map(q => q.id + ' → ' + q.queixa));
check('chaves de blocos dentro das seções permitidas', qs => qs.flatMap(q => Object.keys(q.blocos || {}).filter(k => !SECOES.includes(k)).map(k => q.id + '.' + k)));
check('todo bloco tem rot e pelo menos 1 item', qs => qs.flatMap(q => Object.entries(q.blocos || {}).filter(([, b]) => !b.rot || !(b.itens || []).length).map(([k]) => q.id + '.' + k)));
// hda: mínimo 4 desde 30/09 (D3): forma/via e última dose de cocaína e álcool passaram ao detalhe da base
check('hda com 4 a 12 itens; demais blocos com 1 a 6', qs => qs.flatMap(q => Object.entries(q.blocos || {})
  .filter(([k, b]) => k === 'hda' ? b.itens.length < 4 || b.itens.length > 12 : b.itens.length > 6).map(([k, b]) => q.id + '.' + k + ': ' + b.itens.length)));
check('todo item tem tipo válido, id e rot', qs => {
  const e = [];
  for (const { q, sec, it, pai } of itens(qs)) {
    if (!pai && !TIPOS.includes(it.tipo)) e.push(q.id + '.' + sec + ' tipo ' + it.tipo);
    if (!it.id || !it.rot) e.push(q.id + '.' + sec + ' ' + (it.id || '(sem id)') + ' sem id/rot');
  }
  return e;
});
check('tri e sub têm sim e nao', qs => [...itens(qs)].filter(({ it, pai }) => (pai || it.tipo === 'tri') && (!it.sim || !it.nao)).map(({ it }) => it.id));
check('todo {g} existe nos grupos do bloco', qs => {
  const e = [];
  for (const { q, sec, b, it } of itens(qs)) for (const k of ['sim', 'nao'])
    if (it[k] && typeof it[k] === 'object' && !(b.grupos || {})[it[k].g]) e.push(q.id + '.' + sec + ' ' + it.id + '.' + k + ' → ' + it[k].g);
  return e;
});
check('opções de escolha têm v e rot', qs => {
  const e = [];
  for (const { it } of itens(qs)) {
    if (it.tipo === 'escolha' && !(it.opts || []).length) e.push(it.id + ' sem opts');
    for (const o of [...(it.opts || []), ...((it.det && it.det.opts) || [])]) if (!o.v || !o.rot) e.push(it.id + ' opção sem v/rot');
  }
  return e;
});
check('ids únicos entre quadros (exceto o mesmo objeto reusado)', qs => {
  const visto = new Map(), e = [];
  for (const { q, it } of itens(qs)) {
    const ant = visto.get(it.id);
    if (ant && ant.it !== it) e.push(it.id + ' em ' + ant.q + ' e ' + q.id + ' com objetos diferentes');
    if (!ant) visto.set(it.id, { it, q: q.id });
  }
  return e;
});
check('objeto reusado fica sempre na mesma seção', qs => {
  const sec = new Map(), e = [];
  for (const { q, sec: s, it, pai } of itens(qs)) {
    if (pai) continue;
    if (sec.has(it) && sec.get(it) !== s) e.push(it.id + ' em ' + sec.get(it) + ' e ' + s + ' (' + q.id + ')');
    sec.set(it, s);
  }
  return e;
});
check('sem colisão com ids da ficha base (todos os quadros; ' + BASE.size + ' ids base lidos)', qs => {
  if (BASE.size < 20) return ['extração dos ids base falhou (' + BASE.size + ')'];
  return [...itens(qs)].filter(({ it }) => BASE.has(it.id)).map(({ q, it }) => q.id + ': ' + it.id);
});
// D3/F3/F5 (30/09): uma pergunta mora num lugar só. A ficha base já pergunta arma (HETEROAGRESSIVIDADE),
// forma/via e último uso (detalhe de SUBSTÂNCIAS), sonolência (Consciência) e fuga de ideias (Pensamento).
const REPETE = [
  [/\barma\b(?!: ver)/i, 'arma — item base "arma" (HETEROAGRESSIVIDADE)'],
  [/forma e via|\bvia\b/i, 'forma/via — detalhe base de cocaína'],
  [/^(ultima dose|ultimo uso)/i, 'última dose — detalhe base "quanto, último uso"'],
  [/sonolent/i, 'sonolência — opção base de Consciência']
];
check('nenhuma pergunta de quadro repete a ficha base (arma, forma/via, última dose, sonolência, opção base)', qs => {
  const e = [], ops = new Set(BASE_OPS.map(norm));
  if (BASE_OPS.length < 40) return ['extração das opções base falhou (' + BASE_OPS.length + ')'];
  for (const { q, it } of itens(qs)) {
    const rots = [it.rot, it.sim && (it.sim.t || it.sim), ...(it.opts || []).map(o => o.rot), ...((it.det && it.det.opts) || []).map(o => o.rot)].filter(x => typeof x === 'string');
    for (const r of rots) for (const [re, qual] of REPETE) if (re.test(norm(r))) e.push(q.id + ': ' + it.id + ' "' + r + '" → ' + qual);
    if (ops.has(norm(it.rot))) e.push(q.id + ': ' + it.id + ' "' + it.rot + '" já é opção da base');
  }
  for (const [id, re] of [['alcool', /ultimo uso/], ['cocaina', /forma\/via/], ['cocaina', /ultimo uso/]])
    if (!re.test(norm(BASE_PH[id] || ''))) e.push('detalhe base de ' + id + ' não pergunta ' + re + ' (ph: ' + BASE_PH[id] + ')');
  return [...new Set(e)];
});
// F4 (30/09): déficit focal é achado de exame (del-focal no ef), não item de história
check('nenhum item de hda pergunta sinal focal (vai no ef)', qs => [...itens(qs)].filter(({ sec, it }) => sec === 'hda' && /focal/i.test(it.rot)).map(({ q, it }) => q.id + ': ' + it.id));
// F1/F11 (30/09): frase de achado não afirma que o paciente usa o fármaco ("em uso de" só condicional)
check('nenhuma frase afirma uso de fármaco ("em uso de" só como "se em uso de")', qs => {
  const e = [];
  for (const { it } of itens(qs)) for (const [c, t] of frasesDoItem(it)) if (/(^|[^e] |^)em uso de/.test(t.replace(/se em uso de/g, ''))) e.push(it.id + '.' + c + ': ' + t);
  return e;
});
// F12 (30/09): sem `na`, a lacuna usa o rot — rot com "/", "?" ou "(" é texto de formulário
check('rot com "/", "?" ou "(" tem na curto', qs => [...itens(qs)].filter(({ it }) => !it.na && /[/?(]/.test(it.rot)).map(({ q, it }) => q.id + ': ' + it.id + ' "' + it.rot + '"'));
// F7 (30/09): det.na é lacuna do detalhe vazio com o pai ✓ — só em tri, texto curto de nota
check('det.na só em tri, minúsculo, sem ponto', qs => [...itens(qs)].filter(({ it, pai }) => it.det && it.det.na !== undefined
  && (pai || it.tipo !== 'tri' || typeof it.det.na !== 'string' || !/^[a-zà-ÿ]/.test(it.det.na) || /\.$/.test(it.det.na))).map(({ it }) => it.id));
// F6 (30/09): convulsão e confusão NO EPISÓDIO ATUAL têm onde entrar; os antecedentes dizem ANTERIOR
check('álcool: abstinência atual registra convulsão e confusão; antecedentes dizem "anterior"', qs => {
  const a = qs.find(q => q.id === 'alcool'), its = a ? a.blocos.hda.itens : [], by = id => its.find(i => i.id === id) || {};
  const e = [], vs = ((by('alc-sintomas').det || {}).opts || []).map(o => o.v);
  for (const v of ['convulsao', 'confusao']) if (!vs.includes(v)) e.push('alc-sintomas sem ' + v);
  for (const id of ['alc-convulsao', 'alc-dt']) if (!/anterior/i.test(by(id).rot || '')) e.push(id + ' rot sem ANTERIOR');
  return e;
});
check('ids dos quadros novos com prefixo do quadro', qs => {
  const PRE = /^(psi|man|sui|agi|alc|sub|ans|del)-[a-z0-9-]+$/;
  return [...itens(qs.filter(q => q.id !== 'depressao'))].filter(({ it }) => !PRE.test(it.id)).map(({ it }) => it.id);
});
check('nenhum texto com * _ ~, "undefined" ou ponto final', qs => {
  const e = [];
  for (const { it } of itens(qs)) for (const [c, t] of textos(it))
    if (/[*_~]/.test(t) || /undefined/.test(t) || /\.\s*$/.test(t)) e.push(it.id + '.' + c + ': ' + t);
  return e;
});
const semDose = qs => {
  const e = [];
  for (const q of qs) for (const k of ['nome', 'fonte']) if (DOSE.test(q[k])) e.push(q.id + '.' + k);
  for (const { q, b } of itens(qs)) if (DOSE.test(b.rot)) e.push(q.id + ' bloco ' + b.rot);
  for (const { it } of itens(qs)) for (const [c, t] of textos(it)) if (DOSE.test(t)) e.push(it.id + '.' + c + ': ' + t);
  for (const q of qs) for (const b of Object.values(q.blocos || {})) for (const g of Object.values(b.grupos || {})) if (DOSE.test(g.pre)) e.push(q.id + ' grupo ' + g.pre);
  return [...new Set(e)];
};
check('nenhuma dose (número + mg/mcg/µg/g/mL/UI/mEq)', semDose);
check('colchetes balanceados; {d} só em item com det; det texto usa {d} no sim', qs => {
  const e = [];
  for (const { it, pai } of itens(qs)) {
    for (const [c, t] of textos(it)) if (!/^[^\[\]]*(\[[^\[\]]*\][^\[\]]*)*$/.test(t)) e.push(it.id + '.' + c + ' colchete: ' + t);
    for (const k of ['sim', 'nao']) {
      const t = typeof it[k] === 'string' ? it[k] : it[k] && it[k].t;
      if (t && t.includes('{d}') && (pai || !it.det)) e.push(it.id + '.' + k + ' tem {d} sem det');
    }
    if (it.det && it.det.tipo === 'texto') { const s = typeof it.sim === 'string' ? it.sim : it.sim.t; if (!s.includes('{d}')) e.push(it.id + ' det texto sem {d} no sim'); }
  }
  return e;
});
check('frases começam minúsculas (ou sigla)', qs => {
  const e = [];
  for (const { it } of itens(qs)) for (const [c, t] of frasesDoItem(it))
    if (!/^([a-zà-ÿ{]|[A-Z]{2,})/.test(t)) e.push(it.id + '.' + c + ': ' + t);
  return e;
});

// regressão da leitura clínica das notas (30/09): frase sem sujeito ou sem verbo
check('texto com fmt diz de quê se trata (não começa solto em "há" nem "última dose há")', qs => {
  const e = [];
  for (const { it } of itens(qs)) if (it.tipo === 'texto' && it.fmt && /^(há |última dose há )/.test(it.fmt)) e.push(it.id + ': ' + it.fmt);
  return e;
});
check('"nega" seguido de substância leva "uso de" (nunca "nega álcool…")', qs => {
  const e = [];
  for (const { it } of itens(qs)) for (const [c, t] of frasesDoItem(it))
    if (/^nega (álcool|substância|droga|cocaína|crack|maconha|opioide|benzodiazepínico)/.test(t)) e.push(it.id + '.' + c + ': ' + t);
  return e;
});

// ---------- roda ----------
let falhou = 0;
for (const { nome, fn } of checks) {
  const e = fn(QUADROS);
  console.log((e.length ? 'FAIL ' : 'PASS ') + nome + (e.length ? '\n     ' + e.slice(0, 12).join('\n     ') : ''));
  if (e.length) falhou++;
}
// prova de que a checagem de dose morde: injeta dose numa cópia em memória
{
  const copia = JSON.parse(JSON.stringify(QUADROS));
  copia[0].blocos.hda.itens.find(i => i.tipo === 'tri' && typeof i.sim === 'string').sim = 'em uso de haloperidol 5 mg';
  copia[5].blocos.ef.itens[0].nao = 'reposição de 0,5 mEq';
  const pegou = semDose(copia);
  const ok = pegou.length === 2;
  console.log((ok ? 'PASS ' : 'FAIL ') + 'checagem de dose FALHA com dose injetada (' + pegou.length + ' de 2 pegas)');
  if (!ok) falhou++;
}

// ---------- simula o gerador → frases.txt ----------
const L = [];
const frase = t => cap(genero(t)) + '.';
const d1 = det => det && det.tipo === 'escolha' ? (det.opts[0].frase || det.opts[0].rot) : 'X';
for (const q of QUADROS) {
  L.push('', '='.repeat(72), q.nome.toUpperCase() + '  [' + q.id + ' → ' + q.queixa + ']', 'fonte: ' + q.fonte);
  for (const [sec, b] of Object.entries(q.blocos)) {
    L.push('', '-- ' + sec.toUpperCase() + ' · ' + b.rot);
    const grupos = {};
    for (const it of b.itens) {
      L.push('  [' + it.tipo + '] ' + it.id + ' — ' + it.rot);
      if (it.tipo === 'tri') {
        const r = (v, d) => typeof v === 'string' ? frase(molde(v, d)) : frase(b.grupos[v.g].pre + molde(v.t, d));
        if (it.det) {
          const d = d1(it.det);
          if (it.det.substitui) L.push('     ✓ com detalhe (substitui): ' + frase(b.grupos && typeof it.sim === 'object' ? b.grupos[it.sim.g].pre + d : d));
          else L.push('     ✓ com detalhe "' + d + '": ' + r(it.sim, d));
        }
        L.push('     ✓ sem detalhe: ' + r(it.sim, ''));
        L.push('     ✗: ' + r(it.nao, ''));
        for (const k of ['sim', 'nao']) if (typeof it[k] === 'object') (grupos[it[k].g] = grupos[it[k].g] || []).push(molde(it[k].t, ''));
        for (const s of (it.sub || [])) L.push('       sub ' + s.id + ' ✓: ' + frase(s.sim) + '   ✗: ' + frase(s.nao));
      } else if (it.tipo === 'escolha') {
        for (const o of it.opts) L.push('     • ' + o.rot + ': ' + frase(it.tpl ? it.tpl.replace('{d}', o.frase || o.rot) : (o.frase || o.rot)));
        if (it.multi && it.opts.length > 1) {
          const ds = juntar(it.opts.filter(o => !o.so).slice(0, 2).map(o => o.frase || o.rot), ' e ');
          L.push('     • (duas marcadas): ' + frase(it.tpl ? it.tpl.replace('{d}', ds) : ds));
        }
      } else if (it.tipo === 'texto') {
        L.push('     texto "X": ' + frase(it.fmt ? it.fmt.replace('{v}', 'X') : 'X'));
      }
      if (it.na) L.push('     não avaliado → ' + it.na);
    }
    for (const [g, ts] of Object.entries(grupos)) if (ts.length > 1) L.push('  (grupo ' + g + ' com todos) ' + frase(b.grupos[g].pre + juntar(ts, b.grupos[g].conj)));
  }
}
fs.mkdirSync(path.join(AQUI, 'saidas'), { recursive: true });
fs.writeFileSync(path.join(AQUI, 'saidas', 'frases.txt'), 'Frases geradas por quadros.js (simulação do gerador; detalhe fictício "X" ou 1ª opção). Gênero neutro: o(a).\n' + L.join('\n') + '\n');
console.log('frases → teste/saidas/frases.txt (' + L.length + ' linhas)');

console.log(falhou ? '\n' + falhou + ' checagem(ns) falharam' : '\nTudo passou');
process.exit(falhou ? 1 : 0);
