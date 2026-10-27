#!/usr/bin/env node
/* Confere se cada número de dose está escrito na fonte que o cartão cita.
 *
 * Por que existe: os testes garantem que toda dose TEM fonte. Não garantem que a
 * fonte DIZ aquilo — e número plausível com citação real é o erro mais perigoso
 * que este app pode cometer, porque tem cara de autoridade.
 *
 * Os textos das fontes ficam FORA do repo (direito autoral; o repo é público),
 * em duas pastas `raw/` (saúde mental e APS I, 26/10/2026): `fonte-*.txt`
 * (pdftotext -layout) e, ao lado, `fonte-*.cite` com uma chave por linha — um
 * trecho que identifica a fonte dentro do campo `fonte`/`f` do cartão (ex.:
 * "CAB nº 34").
 *
 * Maudsley: a linha cita a página IMPRESSA em `p`; confere p e p+1 (tabela que
 * quebra página). O texto é um arquivo só, páginas separadas por \f, e
 * página impressa = página do PDF − 22 (conferido em 6 pontos, 23/09/2026).
 *
 * Fonte do MS com página (APS I, 26/10/2026): "o número existe em algum lugar de
 * 366 páginas" é conferência fraca. Linha com `p` numa fonte brasileira confere só
 * p e p+1, desde que o `.cite` traga `offset=N` (página do PDF = p + N). Sem
 * offset, linha com `p` é erro: a página não pode ser conferida.
 *
 * Uso: node ferramentas/conferir-doses.mjs [--estrito] [registro.js …]
 *   sem arquivo: psicofarmacos.js e farmacos-aps.js
 *   número ausente da fonte  → erro, sempre
 *   fonte sem texto local    → aviso (erro com --estrito)
 *   nenhuma linha conferida  → erro (sem falso verde)
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
export const COPILOTO = path.resolve(AQUI, '..');
/* COPILOTO_RAW aceita várias pastas separadas por ':' (os testes usam uma ou duas). */
export const RAWS = process.env.COPILOTO_RAW
  ? process.env.COPILOTO_RAW.split(path.delimiter).filter(Boolean)
  : [path.resolve(COPILOTO, '..', '..', 'internato-sm-sc-2026-2', 'raw'),
     path.resolve(COPILOTO, '..', '..', 'internato-aps1-2026-2', 'copiloto-onda-aps1', 'raw')];
export const RAW = RAWS[0];
export const MAUDSLEY = 'Maudsley Prescribing Guidelines, 15ª ed., 2025';
export const OFFSET = 22;
export const PAG_MAX = 974;

/* Números do texto do app (pt-BR): ponto de milhar, vírgula decimal. */
export function numerosBR(s) {
  return (String(s).match(/\d+(?:[.,]\d+)*/g) || []).map(t => {
    if (/^\d{1,3}(?:\.\d{3})+$/.test(t)) return String(Number(t.replace(/\./g, '')));
    return String(Number(t.replace(',', '.')));
  });
}

/* Números da fonte nas duas convenções: o Maudsley é inglês (vírgula de milhar,
   ponto decimal), os PDFs do MS são pt-BR. Token ambíguo ganha as duas leituras. */
export function numerosFonte(s) {
  const out = new Set();
  /* O pdftotext do Maudsley deixa hífen condicional (U+00AD) dentro de decimal:
     "0.­25–­­2mg". Sem tirar, o 0.25 vira 0 e 25 e a faixa "não existe" na página. */
  for (const t of (String(s).replace(/­/g, '').match(/\d+(?:[.,]\d+)*/g) || [])) {
    if (/^\d{1,3}(?:\.\d{3})+$/.test(t)) { out.add(String(Number(t.replace(/\./g, '')))); out.add(String(Number(t))); }
    else if (/^\d{1,3}(?:,\d{3})+$/.test(t)) { out.add(String(Number(t.replace(/,/g, '')))); out.add(String(Number(t.replace(',', '.')))); }
    else if (t.includes(',')) out.add(String(Number(t.replace(',', '.'))));
    else out.add(String(Number(t)));
  }
  return out;
}

let _maud = null;
export function paginaMaudsley(p) {
  if (_maud === null) {
    const arq = RAWS.map(r => path.join(r, 'fonte-maudsley-15-2025.txt')).find(a => fs.existsSync(a));
    _maud = arq ? fs.readFileSync(arq, 'utf8').split('\f') : [];
  }
  return _maud[p + OFFSET - 1] ?? null;
}

let _docs = null;
export function documentos() {
  if (_docs) return _docs;
  _docs = [];
  for (const raw of RAWS) {
    if (!fs.existsSync(raw)) continue;
    for (const a of fs.readdirSync(raw)) {
      if (!a.endsWith('.cite') || a.startsWith('fonte-maudsley')) continue;
      const txt = path.join(raw, a.replace(/\.cite$/, '.txt'));
      if (!fs.existsSync(txt)) continue;
      const linhas = fs.readFileSync(path.join(raw, a), 'utf8').split('\n').map(x => x.trim()).filter(Boolean);
      const off = linhas.map(l => /^offset=(-?\d+)$/.exec(l)).find(Boolean);
      const chaves = linhas.filter(l => !/^offset=/.test(l));
      _docs.push({ arquivo: path.basename(txt), chaves, txt, texto: null, offset: off ? Number(off[1]) : null });
    }
  }
  return _docs;
}
const textoDe = d => (d.texto ??= fs.readFileSync(d.txt, 'utf8'));
/* Página impressa p do documento d (texto do PDF separado por \f). */
export function paginaDoc(d, p) {
  return textoDe(d).split('\f')[p + d.offset - 1] ?? null;
}

export function conferir(val, fonte, p) {
  const nums = numerosBR(val);
  if (!nums.length) return { ok: true, falta: [], semTexto: false, onde: '' };
  let pool, onde;
  if (String(fonte).includes(MAUDSLEY)) {
    if (!Number.isInteger(p)) return { ok: false, falta: nums, semTexto: false, onde: 'Maudsley sem página (p)' };
    const a = paginaMaudsley(p);
    if (a == null) return { ok: false, falta: [], semTexto: true, onde: 'texto do Maudsley ausente ou página fora do livro' };
    pool = numerosFonte(a + '\n' + (paginaMaudsley(p + 1) || ''));
    onde = `Maudsley p. ${p}–${p + 1}`;
  } else {
    const docs = documentos().filter(d => d.chaves.some(k => String(fonte).includes(k)));
    if (!docs.length) return { ok: false, falta: [], semTexto: true, onde: 'sem texto local para: ' + fonte };
    pool = new Set();
    if (p != null) {
      const comOff = docs.filter(d => d.offset != null);
      if (!Number.isInteger(p) || !comOff.length)
        return { ok: false, falta: nums, semTexto: false, onde: `p. ${p} sem offset no .cite de ${docs.map(d => d.arquivo).join(' + ')}` };
      for (const d of comOff) {
        const a = paginaDoc(d, p);
        if (a == null) continue;
        for (const x of numerosFonte(a + '\n' + (paginaDoc(d, p + 1) || ''))) pool.add(x);
      }
      onde = comOff.map(d => `${d.arquivo} p. ${p}–${p + 1}`).join(' + ');
    } else {
      for (const d of docs) for (const x of numerosFonte(textoDe(d))) pool.add(x);
      onde = docs.map(d => d.arquivo).join(' + ');
    }
  }
  const falta = nums.filter(x => !pool.has(x));
  return { ok: !falta.length, falta, semTexto: false, onde };
}

/* Carrega um registro de fármacos: psicofarmacos.js (PSICOFARMACOS) ou
   farmacos-aps.js (FARMACOS_APS) — o mesmo esquema, nomes diferentes. */
export function carregarRegistro(arquivo) {
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(arquivo, 'utf8') +
    '\n;this.__P = typeof PSICOFARMACOS !== "undefined" ? PSICOFARMACOS : FARMACOS_APS;', ctx);
  return ctx.__P;
}
export const carregarPsico = carregarRegistro;
export function conferirCartao(f) {
  if (f.v) return [];
  return (f.dose || []).filter(d => /\d/.test(d.val)).map(d => {
    const fonte = d.f || f.fonte;
    return { id: f.id, rot: d.rot, val: d.val, fonte, r: conferir(d.val, fonte, d.p) };
  });
}
export function conferirRelacao(i) {
  const txt = `${i.t} ${i.d}`;
  if (i.v || !/\d/.test(txt)) return [];
  return [{ id: i.id, rot: 'relação', val: txt, fonte: i.f, r: conferir(txt, i.f, i.p) }];
}

function main() {
  const args = process.argv.slice(2);
  const estrito = args.includes('--estrito');
  let arquivos = args.filter(a => !a.startsWith('--'));
  if (!arquivos.length) arquivos = ['psicofarmacos.js', 'farmacos-aps.js']
    .map(a => path.join(COPILOTO, a)).filter(a => fs.existsSync(a));
  const linhas = arquivos.flatMap(a => carregarRegistro(a).classes.flatMap(c => c.farmacos.flatMap(conferirCartao)));
  let erros = 0, semTexto = 0;
  for (const l of linhas) {
    if (l.r.semTexto) { semTexto++; console.log(`?  ${l.id} · ${l.rot} — ${l.r.onde}`); continue; }
    if (!l.r.ok) { erros++; console.log(`✗  ${l.id} · ${l.rot} · "${l.val}" — faltam [${l.r.falta.join(', ')}] em ${l.r.onde}`); }
  }
  console.log(`\n${linhas.length} linhas conferidas · ${erros} número(s) ausente(s) · ${semTexto} sem texto local`);
  if (!linhas.length) { console.log('NADA foi conferido — isso não é verde.'); process.exit(1); }
  process.exit(erros || (estrito && semTexto) ? 1 : 0);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
