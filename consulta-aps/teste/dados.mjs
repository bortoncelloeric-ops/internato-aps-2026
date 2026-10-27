/* Validação dos dados da consulta-aps em node puro: quadros.js contra o copiloto e
   contra a tabela de códigos. Uso: node teste/dados.mjs */
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const PAG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/* A montagem dos quadros da onda (montar-quadros.mjs) roda isto contra uma cópia: o copiloto já
   integrado em modo seco e o quadros.js montado dos fragmentos. */
const COP = process.env.CONSULTA_COPILOTO || path.resolve(PAG, '..', 'copiloto');
const QUADROS_JS = process.env.CONSULTA_QUADROS || path.join(PAG, 'quadros.js');
const ctx = {}; vm.createContext(ctx);
const roda = (arq, fim = '') => vm.runInContext(fs.readFileSync(arq, 'utf8') + fim, ctx, { filename: arq });
roda(path.join(COP, 'queixas.js'));
roda(path.join(COP, 'queixas-aps.js'), ';this.QX=QUEIXAS;');
roda(path.join(COP, 'psicofarmacos.js'), ';this.P=PSICOFARMACOS;');
roda(path.join(COP, 'farmacos-aps.js'), ';this.A=FARMACOS_APS;');
roda(path.join(PAG, 'codigos.js'), ';this.C=CODIGOS;');
roda(QUADROS_JS, ';this.Q=QUADROS;this.EX=(typeof EXEMPLO!=="undefined"?EXEMPLO:null);');

let n = 0; const erros = [];
const ok = (nome, cond, det = '') => { n++; if (!cond) erros.push(nome + (det ? ' — ' + det : '')); };

/* ids da ficha base, lidos do index.html (a ficha é código, não dado) */
const html = fs.readFileSync(path.join(PAG, 'index.html'), 'utf8');
const ficha = html.slice(html.indexOf('var FICHA = ['), html.indexOf('var SEC = {};'));
const BASE = new Set([...ficha.matchAll(/\bid:'([\w.]+)'/g)].map(m => m[1]));
const SECOES = ['anamnese', 'ef', 'conduta'];
const TIPOS = ['tri', 'escolha', 'texto', 'data', 'rotulo'];
const DOSE = /\d+(?:[.,]\d+)?\s*(?:mg|mcg|µg|g|mL|UI|mEq)\b(?!\s*\/\s*(?:dL|L)\b)/i;
const ANO = /\b(19|20)\d\d\b/;
const QIDS = new Set(ctx.QX.map(q => q.id));

const Q = ctx.Q;
ok('quadros.js tem quadros', Array.isArray(Q) && Q.length > 0);
ok('ids de quadro únicos', new Set(Q.map(q => q.id)).size === Q.length);
const vistos = new Map();       // id de item → JSON do objeto (mesma pergunta = mesmo objeto)
const frases = it => [it.sim, it.nao, it.simSemDet, it.fmt, it.tpl, it.tplN,
  ...(it.opts || []).map(o => o.frase ?? o.rot), ...(it.det?.opts || []).map(o => o.frase ?? o.rot),
  ...(it.sub || []).flatMap(s => [s.sim, s.nao])].filter(Boolean).map(f => typeof f === 'object' ? f.t : f);

for (const q of Q) {
  const onde = 'quadro ' + q.id;
  ok(onde + ': id kebab-case', /^[a-z0-9-]+$/.test(q.id));
  ok(onde + ': tem nome curto', !!q.nome && q.nome.length <= 32, q.nome);
  ok(onde + ': aponta para queixa que existe no copiloto', QIDS.has(q.queixa), q.queixa);
  ok(onde + ': fonte com ano em cada parte', !!q.fonte && String(q.fonte).split(' · ').every(p => ANO.test(p)), q.fonte);
  ok(onde + ': grupo só "outros" ou ausente', q.grupo === undefined || q.grupo === 'outros');
  for (const c of q.ciap || []) ok(onde + ': CIAP-2 ' + c + ' está na tabela', !!ctx.C.ciap[c]);
  for (const c of q.cid || []) ok(onde + ': CID-10 ' + c + ' está na tabela', !!ctx.C.cid[c]);
  ok(onde + ': sugere ao menos um código', (q.ciap || []).length + (q.cid || []).length > 0);
  const secs = Object.keys(q.blocos || {});
  ok(onde + ': tem bloco', secs.length > 0);
  for (const s of secs) {
    const b = q.blocos[s];
    ok(onde + ': seção ' + s + ' existe na ficha', SECOES.includes(s));
    ok(onde + '/' + s + ': bloco tem rótulo e itens (nada entra vazio)', !!b.rot && (b.itens || []).length > 0);
    for (const it of b.itens || []) {
      const oi = onde + '/' + s + '/' + (it.id || it.tipo);
      ok(oi + ': tipo válido', TIPOS.includes(it.tipo), it.tipo);
      if (it.tipo === 'rotulo') continue;
      /* `meses` é a única exceção ao prefixo: o motor lê S.meses para o escore-z da OMS */
      ok(oi + ': id com prefixo, fora da ficha base', !!it.id && (it.id === 'meses' || /^[a-z0-9]+-[\w-]+$/.test(it.id)) && !BASE.has(it.id), it.id);
      ok(oi + ': tem rótulo', !!it.rot);
      const js = JSON.stringify(it);
      if (vistos.has(it.id)) ok(oi + ': mesmo id em dois quadros é o MESMO objeto', vistos.get(it.id) === js);
      vistos.set(it.id, js);
      if (it.tipo === 'tri') ok(oi + ': tri tem sim e nao', !!it.sim && !!it.nao);
      if (it.tipo === 'escolha') ok(oi + ': escolha tem opções', (it.opts || []).length > 0);
      if (it.tipo === 'data') ok(oi + ': data só calcula dpp', !it.calc || it.calc === 'dpp');
      if (it.sub) ok(oi + ': sub só em tri', it.tipo === 'tri');
      for (const f of frases(it)) {
        ok(oi + ': frase sem dose', !DOSE.test(f), f);
        ok(oi + ': frase sem * _ ~', !/[*_~]/.test(f), f);
        ok(oi + ': frase não termina em ponto', !/\.\s*$/.test(f), f);
      }
      ok(oi + ': rótulo sem dose', !DOSE.test(it.rot), it.rot);
    }
  }
}

/* caso de exemplo: inventado, sem dose, só com chaves que existem */
const EX = ctx.EX;
if (!process.env.CONSULTA_SEM_EXEMPLO) ok('há caso de exemplo', !!EX);
if (EX) {
  const chaves = new Set([...BASE, ...vistos.keys()]);
  const raiz = k => k.replace(/\.(d|rows|peso|alt|ca|pc|pa|fc|fr|tax|sat|hgt|ciap|cid)$/, '').replace(/^(sv|med|cod)\..*$/, '$1');
  for (const k of Object.keys(EX)) ok('exemplo: chave ' + k + ' existe na ficha', k === 'quadros' || chaves.has(raiz(k)) || ['sv', 'med', 'cod'].includes(raiz(k)), k);
  ok('exemplo: quadros existem', (EX.quadros || []).every(id => Q.some(q => q.id === id)));
  ok('exemplo: prescrição com dose vazia', (EX.presc || []).every(r => !r.dose));
  /* os VALORES (não as chaves: a linha de medicação tem a chave `nome`, que é o fármaco) */
  const valores = JSON.stringify(EX, (k, v) => (v && typeof v === 'object') ? v : (typeof v === 'string' ? v : undefined)).replace(/"[\w.-]+":/g, '');
  ok('exemplo: sem PII (prontuário, CNS, nascimento, data de nascimento)',
     !/prontu[aá]rio|\bcns\b|nascid|nascimento|\b\d{2}\/\d{2}\/(19|20)\d\d\b/i.test(valores), valores.slice(0, 120));
}

console.log(erros.length ? erros.map(e => ' ✗ ' + e).join('\n') + `\n\n${n - erros.length}/${n} ok` : `dados: ${n}/${n} ok`);
process.exit(erros.length ? 1 : 0);
