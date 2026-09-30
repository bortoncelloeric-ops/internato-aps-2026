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
  if (it.det) { add('det.ph', it.det.ph); for (const o of (it.det.opts || [])) { add('det.rot', o.rot); if (o.frase !== undefined) add('det.frase', o.frase); } }
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
check('hda com 6 a 12 itens; demais blocos com 1 a 6', qs => qs.flatMap(q => Object.entries(q.blocos || {})
  .filter(([k, b]) => k === 'hda' ? b.itens.length < 6 || b.itens.length > 12 : b.itens.length > 6).map(([k, b]) => q.id + '.' + k + ': ' + b.itens.length)));
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
check('sem colisão com ids da ficha base (quadros novos; ' + BASE.size + ' ids base lidos)', qs => {
  if (BASE.size < 20) return ['extração dos ids base falhou (' + BASE.size + ')'];
  return [...itens(qs.filter(q => q.id !== 'depressao'))].filter(({ it }) => BASE.has(it.id)).map(({ q, it }) => q.id + ': ' + it.id);
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
