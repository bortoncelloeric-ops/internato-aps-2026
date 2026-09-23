/* Testes do conferir-doses com fontes FALSAS em pasta temporária — não depende
   do livro nem dos PDFs reais. Uso: node ferramentas/conferir-doses.teste.mjs */
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { execFileSync } from 'node:child_process';
const RAW = fs.mkdtempSync(path.join(os.tmpdir(), 'cd-raw-'));
process.env.COPILOTO_RAW = RAW;
const M = await import('./conferir-doses.mjs');
let n = 0, falhas = 0;
const ok = (nome, real, esp) => { n++; const b = JSON.stringify(real) === JSON.stringify(esp);
  if (!b) falhas++; console.log((b ? '  ok   ' : ' FALHA ') + nome + (b ? '' : ` → ${JSON.stringify(real)} (esperado ${JSON.stringify(esp)})`)); };

// livro falso: 30 páginas de PDF; página impressa p = índice p+22-1
const pags = Array.from({ length: 40 }, (_, i) => `pagina pdf ${i + 1}`);
pags[8 + 22 - 1] = 'Drug X 10mg mane, maximum 20mg; 1,800mg/day in mania; level 0.6-1.2';
pags[9 + 22 - 1] = 'continued table: Drug Y 25mg nocte';
pags[10 + 22 - 1] = 'Drug Z 75mg';
fs.writeFileSync(path.join(RAW, 'fonte-maudsley-15-2025.txt'), pags.join('\f'));
fs.writeFileSync(path.join(RAW, 'fonte-br.txt'), 'Dose usual de 20 a 60 mg/dia. Máximo 1.800 mg/dia. Nível 0,6 a 1,2 mEq/L.');
fs.writeFileSync(path.join(RAW, 'fonte-br.cite'), 'PCDT Falso\n');

ok('numerosBR lê milhar e decimal brasileiros', M.numerosBR('1.800 mg · 0,6 a 1,2 mEq/L · 20 a 60'), ['1800', '0.6', '1.2', '20', '60']);
ok('numerosFonte lê o inglês', [...M.numerosFonte('1,800mg 0.6-1.2')].includes('1800') && [...M.numerosFonte('0.6')].includes('0.6'), true);
ok('Maudsley: número na página citada passa', M.conferir('máximo 20 mg', M.MAUDSLEY, 8).ok, true);
ok('Maudsley: número na página seguinte passa (tabela quebrada)', M.conferir('25 mg à noite', M.MAUDSLEY, 8).ok, true);
ok('Maudsley: número duas páginas adiante falha', M.conferir('75 mg', M.MAUDSLEY, 8).falta, ['75']);
ok('Maudsley sem página falha', M.conferir('20 mg', M.MAUDSLEY, undefined).ok, false);
ok('Maudsley: milhar inglês casa com milhar brasileiro', M.conferir('1.800 mg/dia', M.MAUDSLEY, 8).ok, true);
ok('fonte BR pela chave do .cite', M.conferir('20 a 60 mg/dia', 'MS — PCDT Falso, Portaria nº 1, 2020', undefined).ok, true);
ok('fonte BR: número ausente falha', M.conferir('80 mg/dia', 'MS — PCDT Falso, Portaria nº 1, 2020', undefined).falta, ['80']);
ok('fonte sem texto local é sinalizada', M.conferir('20 mg', 'Livro Inexistente, 2019', undefined).semTexto, true);
ok('valor sem dígito não precisa de fonte', M.conferir('sem dose', 'qualquer', undefined).ok, true);

// CLI: arquivo de cartões falso
const psico = path.join(RAW, 'psico.js');
fs.writeFileSync(psico, `var PSICOFARMACOS = { classes: [ { rot: "A", farmacos: [
  { nome: "X", id: "x", dose: [ { rot: "Dose usual", val: "20 a 60 mg/dia" },
    { rot: "Idoso", val: "máximo 20 mg", f: "${M.MAUDSLEY}", p: 8 } ], fonte: "MS — PCDT Falso, Portaria nº 1, 2020" } ] } ] };`);
const cli = a => { try { execFileSync('node', [path.resolve('ferramentas/conferir-doses.mjs'), ...a],
  { env: { ...process.env, COPILOTO_RAW: RAW }, stdio: 'pipe' }); return 0; } catch (e) { return e.status; } };
ok('CLI sai 0 com tudo encontrado', cli([psico]), 0);
fs.writeFileSync(psico, fs.readFileSync(psico, 'utf8').replace('20 a 60', '20 a 90'));
ok('CLI sai 1 com número ausente', cli([psico]), 1);
fs.writeFileSync(path.join(RAW, 'vazio.js'), 'var PSICOFARMACOS = { classes: [] };');
ok('CLI sai 1 quando nada foi conferido (sem falso verde)', cli([path.join(RAW, 'vazio.js')]), 1);

console.log(`\n${n - falhas}/${n} ok`); process.exit(falhas ? 1 : 0);
