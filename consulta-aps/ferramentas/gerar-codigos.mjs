#!/usr/bin/env node
/* Gera consulta-aps/codigos.js — a tabela de CIAP-2 e CID-10 da página, com a descrição
 * COPIADA da fonte oficial, nunca digitada:
 *   CIAP-2: rubricas da tradução brasileira (WONCA/SBMFC, 2ª ed., 2009), do texto do PDF
 *           (raw/fonte-ciap2-sbmfc-2009.txt), com a página do PDF de onde saiu;
 *   CID-10: CSVs oficiais do DATASUS (V2008, latin-1) — todas as categorias de 3 caracteres
 *           e as subcategorias que os quadros pedem.
 * Código pedido por quadros.js que não existe na fonte faz o gerador FALHAR: erro de
 * digitação não chega à tela. Código digitado na tela fora da tabela sai VERIFICAR.
 * Os textos das fontes ficam fora do repo (pasta raw/ da onda APS I).
 * Uso: node ferramentas/gerar-codigos.mjs */
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const PAG = path.resolve(AQUI, '..');
const RAW = process.env.APS1_RAW || path.resolve(PAG, '..', '..', 'internato-aps1-2026-2', 'copiloto-onda-aps1', 'raw');
const FONTE_CIAP = 'CIAP-2 (WONCA/SBMFC, 2ª ed., 2009)', FONTE_CID = 'CID-10 (DATASUS, V2008)';

/* --- CIAP-2: rubricas em caixa alta, "K86      HIPERTENSÃO SEM COMPLICAÇÕES      I10" --- */
export function rubricasCiap(texto) {
  const out = {}, pags = texto.split('\f');
  const cab = /^\s{0,3}([A-Z]\d\d)[ \t]+(.+)$/;
  const cont = /^\s{6,}([A-ZÀ-Ü][A-ZÀ-Ü0-9 ,;\/()\-.'ºª]*[A-ZÀ-Ü)])\s*$/;
  /* primeiro trecho de uma linha de título, cortado antes do 1º código CID; '' se não for título */
  const trecho = l => { const s = String(l || '').trim().split(/\s{2,}|\t/)[0].replace(/\s+[A-Z]\d\d.*$/, '').trim();
    return /[A-ZÀ-Ü]{3}/.test(s) && !/[a-z]/.test(s) && !/^[A-Z]\d\d\b/.test(s) ? s : ''; };
  pags.forEach((t, i) => {
    const ls = t.split('\n');
    ls.forEach((l, k) => {
      /* código sozinho na linha e o título na(s) seguinte(s): " A78" / " HANSENÍASE E OUTRAS …" / " DOENÇAS INFECCIOSAS NE" */
      const so = /^\s{0,3}([A-Z]\d\d)\s*$/.exec(l);
      if (so && !out[so[1]]) {
        const t1 = trecho(ls[k + 1]); if (!t1) return;
        const t2 = /^\s*[A-Z]\d\d\b/.test(ls[k + 2] || '') ? '' : trecho(ls[k + 2]);
        out[so[1]] = { d: (t1 + (t2 ? ' ' + t2 : '')).replace(/\s+/g, ' '), p: i + 1 };
        return;
      }
      const m = cab.exec(l); if (!m || out[m[1]]) return;
      /* título = primeiro trecho (até 2+ espaços ou tab), cortado antes do 1º código CID */
      let tit = m[2].split(/\s{2,}|\t/)[0].replace(/\s+[A-Z]\d\d.*$/, '').trim();
      if (!/[A-ZÀ-Ü]{3}/.test(tit) || tit !== tit.toUpperCase()) return;    // linhas de tabela em caixa baixa ficam de fora
      const prox = ls[k + 1] || '', c = cont.exec(prox);
      if (c && !/[a-z]/.test(prox) && !/^\s*[A-Z]\d\d\b/.test(prox)) tit += ' ' + c[1].replace(/\s+[A-Z]\d\d.*$/, '').trim();
      out[m[1]] = { d: tit.replace(/\s+/g, ' '), p: i + 1 };
    });
  });
  return out;
}
/* --- CID-10: CSV do DATASUS, separado por ';' --- */
export function lerCsv(arq) {
  return new TextDecoder('latin1').decode(fs.readFileSync(arq)).split(/\r?\n/).slice(1).filter(Boolean).map(l => l.split(';'));
}
export const comPonto = c => c.length === 4 ? c.slice(0, 3) + '.' + c.slice(3) : c;

function pedidos() {
  const arq = path.join(PAG, 'quadros.js'); if (!fs.existsSync(arq)) return { ciap: [], cid: [] };
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(arq, 'utf8') + ';this.Q=QUADROS;', ctx);
  return { ciap: [...new Set(ctx.Q.flatMap(q => q.ciap || []))], cid: [...new Set(ctx.Q.flatMap(q => q.cid || []))] };
}

function main() {
  const ciapTodos = rubricasCiap(fs.readFileSync(path.join(RAW, 'fonte-ciap2-sbmfc-2009.txt'), 'utf8'));
  const cats = lerCsv(path.join(RAW, 'cid10-datasus-2008', 'CID-10-CATEGORIAS.CSV'));
  const subs = lerCsv(path.join(RAW, 'cid10-datasus-2008', 'CID-10-SUBCATEGORIAS.CSV'));
  const cid = {}; cats.forEach(c => { cid[c[0]] = { d: c[2] }; });
  const subIdx = {}; subs.forEach(s => { subIdx[comPonto(s[0])] = { d: s[4] }; });
  const P = pedidos(), erros = [];
  P.ciap.forEach(c => { if (!ciapTodos[c]) erros.push('CIAP-2 ' + c + ' não está nas rubricas da fonte'); });
  P.cid.forEach(c => { if (!cid[c] && !subIdx[c]) erros.push('CID-10 ' + c + ' não está no CSV do DATASUS'); else if (subIdx[c]) cid[c] = subIdx[c]; });
  if (erros.length) { console.log(erros.join('\n')); process.exit(1); }
  const ord = o => Object.fromEntries(Object.keys(o).sort().map(k => [k, o[k]]));
  const js = '/* Tabela de códigos da consulta-aps — GERADO, NÃO EDITAR À MÃO.\n' +
    ' * Regenerar: node ferramentas/gerar-codigos.mjs\n' +
    ' * Descrição copiada da fonte oficial: ' + FONTE_CIAP + ' (p = página do PDF) e ' + FONTE_CID + '.\n' +
    ' * Código fora desta tabela sai VERIFICAR na tela e no texto. */\n' +
    'var CODIGOS = ' + JSON.stringify({ fonte: FONTE_CIAP + ' · ' + FONTE_CID, ciap: ord(ciapTodos), cid: ord(cid) }) + ';\n';
  fs.writeFileSync(path.join(PAG, 'codigos.js'), js);
  console.log(`codigos.js — CIAP-2: ${Object.keys(ciapTodos).length} rubricas · CID-10: ${Object.keys(cid).length} códigos · ${(js.length / 1024).toFixed(0)} KB` +
    ` · pedidos pelos quadros: ${P.ciap.length} CIAP, ${P.cid.length} CID`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
