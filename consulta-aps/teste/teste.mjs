/* e2e da consulta-aps via Chrome DevTools Protocol, no app real em file://.
   Uso: Chrome headless na porta CDP_PORT (padrão 9337) e `node teste/teste.mjs`.
   Os quadros são percorridos pelos DADOS (QUADROS), não por id fixo: quadro novo
   entra no teste sozinho. */
import fs from 'node:fs';
const SP = new URL('.', import.meta.url).pathname;
const BASE = new URL('..', import.meta.url).pathname;
const PORTA = process.env.CDP_PORT || 9337;
const APP = 'file://' + BASE + 'index.html';
const alvo = await (await fetch(`http://127.0.0.1:${PORTA}/json/list`)).json();
const ws = new WebSocket(alvo.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const erros = []; const dialogos = [];
ws.onmessage = e => { const m = JSON.parse(e.data);
  if (m.method === 'Page.javascriptDialogOpening') { dialogos.push(m.params.message); send('Page.handleJavaScriptDialog', { accept: true }); }
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') erros.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  /* o Chrome headless registra como "erro" a intervenção que bloqueia o aviso de saída (beforeunload) ao navegar
     sem gesto do usuário — é o aviso funcionando, não erro de JavaScript */
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error' && !/beforeunload/.test(m.params.entry.text)) erros.push(m.params.entry.text + ' ' + (m.params.entry.url || ''));
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') erros.push('console.error: ' + m.params.args.map(a => a.value).join(' '));
};
const send = (method, params = {}) => new Promise(res => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails)); return r.result?.result?.value; };
const espera = ms => new Promise(r => setTimeout(r, ms));
let nav = 0;
const vai = async (hash = '') => { await send('Page.navigate', { url: APP + '?n=' + (++nav) + hash }); await espera(900); };
const tudo = () => ev(`window.__consulta.gerarTexto()`);
const campo = c => ev(`window.__consulta.textoCampo(${JSON.stringify(c)})`);
const clica = sel => ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}); if(!b) return 'NAO ACHOU'; b.click(); return 'ok';})()`);
const digita = (sel, v) => ev(`(()=>{const i=document.querySelector(${JSON.stringify(sel)}); if(!i) return 'NAO ACHOU'; i.value=${JSON.stringify(v)}; i.dispatchEvent(new Event('input',{bubbles:true})); return 'ok';})()`);
const tela = async (w, h, mobile, scale) => send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile });
let n = 0, falhas = 0, pulos = 0;
const ok = (nome, cond, info = '') => { n++; if (!cond) falhas++; console.log((cond ? '  ok   ' : ' FALHA ') + nome + (cond ? '' : '  → ' + info)); };
const pula = nome => { pulos++; console.log('  --   ' + nome + ' (pulado: nenhum quadro tem isso)'); };

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await tela(1280, 2600, false, 1);

/* ---------- carga ---------- */
await vai();
ok('dados do copiloto, códigos e quadros carregaram',
  await ev(`typeof QUEIXAS!=='undefined' && typeof FARMACOS_APS!=='undefined' && typeof PSICOFARMACOS!=='undefined' && typeof CODIGOS!=='undefined' && Array.isArray(QUADROS) && QUADROS.length>0`));
ok('ficha vazia → texto vazio', (await tudo()) === '');
ok('os cinco campos do sistema aparecem, cada um vazio', await ev(`[...document.querySelectorAll('#saida [data-campo]')].map(x=>x.dataset.campo).join(',')`) === 'qp,anamnese,ef,conduta,codigos');

/* ---------- ficha base: intocado fica FORA; ✗ é "nega"; caixa alta ---------- */
await clica('[data-tri="alergia"][data-v="nao"]');
let a = await campo('anamnese');
ok('alergia ✗ → "NEGA ALERGIA MEDICAMENTOSA."', a === 'NEGA ALERGIA MEDICAMENTOSA.', a);
ok('base intocada não vira "não avaliado"', !/AVALIADO/.test(await tudo()));
await clica('[data-tri="alergia"][data-v="nao"]');
ok('✗ clicado de novo desfaz', (await campo('anamnese')) === '');
await clica('[data-esc="sexo"][data-v="F"]'); await digita('[data-txt="idade"]', '50');
await clica('[data-tri="comorb"][data-v="sim"]'); await digita('[data-txt="comorb.d"]', 'HAS');
await clica('[data-tri="alergia"][data-v="nao"]');
await clica('[data-tri="etilismo"][data-v="sim"]'); await digita('[data-txt="etilismo.d"]', 'social');
await clica('[data-tri="tabagismo"][data-v="nao"]'); await clica('[data-esc="atfis"][data-v="sed"]');
a = await campo('anamnese');
ok('estilo da preceptora: linha de identificação', a.split('\n')[0] === 'PACIENTE DE 50 ANOS, PORTADORA DE HAS, NEGA ALERGIA MEDICAMENTOSA.', a);
ok('estilo da preceptora: linha HV', a.split('\n')[1] === 'HV: ETILISMO SOCIAL, NEGA TABAGISMO, SEDENTÁRIA.', a);
await clica('[data-esc="sexo"][data-v="M"]');
ok('sexo masculino muda a concordância (portador, não "portadoro")', /PORTADOR DE HAS/.test(await campo('anamnese')) && /SEDENTÁRIO/.test(await campo('anamnese')), await campo('anamnese'));
ok('comorbidade ✓ sem detalhe não deixa "de" pendurado', await (async () => {
  await digita('[data-txt="comorb.d"]', ''); const t = await campo('anamnese'); await digita('[data-txt="comorb.d"]', 'HAS'); return /REFERE COMORBIDADES/.test(t) && !/PORTADOR DE[ ,.]/.test(t); })());
await digita('[data-txt="hf"]', 'irmã com HAS; nega AVC ou infarto na família');
ok('HF entra com prefixo', /\nHF: IRMÃ COM HAS; NEGA AVC OU INFARTO NA FAMÍLIA\./.test(await campo('anamnese')), await campo('anamnese'));
await clica('[data-tri="meduso"][data-v="sim"]');
await digita('[data-row="meduso|0|nome"]', 'Losartana'); await digita('[data-row="meduso|0|dose"]', '50 mg (1-0-0)');
await clica('[data-add="meduso"]');
await digita('[data-row="meduso|1|nome"]', 'Hidroclorotiazida'); await digita('[data-row="meduso|1|dose"]', '25 mg (1-0-0)');
ok('medicação em uso no formato "EM USO: A / B"', /\nEM USO: LOSARTANA 50 MG \(1-0-0\) \/ HIDROCLOROTIAZIDA 25 MG \(1-0-0\)\./.test(await campo('anamnese')), await campo('anamnese'));
await digita('textarea[data-txt="exames"]', 'USG abdome total: esteatose grau 1\nLab: Hb 11,1 / Ht 35,3');
a = await campo('anamnese');
ok('exames trazidos: uma linha por linha digitada, a 1ª com "AOS EXAMES:"', /\nAOS EXAMES: USG ABDOME TOTAL: ESTEATOSE GRAU 1\.\nLAB: HB 11,1 \/ HT 35,3\./.test(a), a);
ok('texto inteiro em caixa alta', (await tudo()) === (await tudo()).toLocaleUpperCase('pt-BR'));

/* ---------- exame físico: medidas ---------- */
await digita('[data-txt="sv.pa"]', '150x95 mmHg'); await digita('[data-txt="sv.fc"]', '78');
await digita('[data-txt="med.peso"]', '70'); await digita('[data-txt="med.alt"]', '1,65');
const e1 = await campo('ef');
ok('sinais vitais sem unidade repetida', /^PA 150X95 MMHG, FC 78 BPM\./.test(e1), e1);
ok('IMC calculado e altura na unidade digitada', /PESO 70 KG, ALTURA 1,65 M, IMC 25,7 KG\/M²\./.test(e1), e1);
ok('nenhum sinal vital vazio vira "não aferido"', !/AFERID/.test(e1));
await vai();
await clica('[data-esc="sexo"][data-v="F"]'); await digita('[data-txt="idade"]', '8 meses');
await digita('[data-txt="med.peso"]', '8,65'); await digita('[data-txt="med.alt"]', '76');
const e2 = await campo('ef');
ok('criança: escore-z da OMS por idade (mesmos números dos testes do copiloto)',
  /PESO 8,65 KG \(Z \+0,69\), COMPRIMENTO 76 CM \(Z \+3,05\), IMC 15,0 KG\/M² \(Z −1,33\)/.test(e2), e2);

/* ---------- conduta: prescrição com chip do registro, e "outro" ---------- */
await vai();
const comChip = await ev(`(()=>{ for (const R of [FARMACOS_APS, PSICOFARMACOS]) for (const c of R.classes) for (const f of c.farmacos)
  if (!f.v && (f.dose||[]).some(d=>/[0-9]/.test(d.val) && /\\b(mg|mcg|UI|mL|g)\\b/i.test(d.val))) return f.id; return null; })()`);
await ev(`(()=>{const s=document.querySelector('select[data-presc-f]'); s.value=${JSON.stringify(comChip)}; s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
ok('fármaco do registro mostra referências de dose como botão, com fonte', await ev(`document.querySelectorAll('.chip').length>0 && [...document.querySelectorAll('.chip small')].every(s=>s.textContent.trim().length>5)`));
await clica('.chip');
const dChip = await ev(`document.querySelector('input[data-presc="dose"]').value`);
ok('o chip preenche a posologia', !!dChip && /[0-9]/.test(dChip), dChip);
let c1 = await campo('conduta');
ok('prescrição: "PRESCREVO:" e uma linha por fármaco', /^PRESCREVO:\n.+ .*[0-9]/.test(c1), c1);
await clica('[data-presc-add="1"]');
await ev(`(()=>{const s=document.querySelectorAll('select[data-presc-f]')[1]; s.value='__outro'; s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
await digita('input[data-presc="nome"][data-i="1"]', 'Omeprazol');
c1 = await campo('conduta');
ok('fármaco fora do registro entra digitado, com dose vazia "___"', /\nOMEPRAZOL ___$/.test(c1), c1);
await digita('[data-txt="oriento"]', 'dieta e atividade física'); await clica('[data-esc="orientgerais"][data-v="og"]');
await digita('[data-txt="retorno"]', 'em 30 dias com exames');
c1 = await campo('conduta');
ok('conduta no formato da preceptora', /^ORIENTO SOBRE DIETA E ATIVIDADE FÍSICA\./.test(c1) && /\nORIENTAÇÕES GERAIS\./.test(c1) && /\nRETORNO EM 30 DIAS COM EXAMES\.$/.test(c1), c1);
/* APS II: com o quadro do climatério marcado, a fluoxetina põe primeiro a linha do fogacho (a `linha` do guia) */
await vai();
const qClima = await ev(`(QUADROS.find(q=>/climat/i.test(q.id))||{}).id`);
await clica(`[data-esc="quadros"][data-v="${qClima}"]`);
await ev(`(()=>{const s=document.querySelector('select[data-presc-f]'); s.value='fluoxetina'; s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
const climaFluox = await ev(`(document.querySelector('.chip b')||{}).textContent`);
ok('quadro Climatério → fluoxetina: o 1º botão de dose é "Climatério — fogacho"', /^Climatério — fogacho/.test(climaFluox), climaFluox);

/* ---------- seletor: os temas da APS II são grupos que abrem (innerText vem vazio em <details> fechado: por open e querySelectorAll) ---------- */
await vai();
const QG = await ev(`QUADROS.map(q=>({id:q.id, g:q.grupo||''}))`);
const qA2 = QG.filter(q => /^A2-/.test(q.g));
const TEMAS = await ev(`[...document.querySelectorAll('#s-quadros details.qgrupo')].map(d=>({g:d.dataset.qgrupo, open:d.open,
  s:d.querySelector('summary').textContent, pills:[...d.querySelectorAll('[data-esc="quadros"]')].map(b=>b.dataset.v)}))`);
ok('seletor: cada tema da APS II com quadro é um grupo', TEMAS.length > 0 && TEMAS.length === new Set(qA2.map(q => q.g)).size, JSON.stringify(TEMAS.map(t => t.g)));
ok('seletor: os temas da APS II vêm fechados', TEMAS.every(t => !t.open), TEMAS.filter(t => t.open).map(t => t.g).join(', '));
ok('seletor: cada tema traz a contagem e só os quadros dele', TEMAS.every(t => t.s.endsWith(' (' + t.pills.length + ')') &&
  t.pills.join() === qA2.filter(q => q.g === t.g).map(q => q.id).join()), TEMAS.map(t => t.s).join(' | '));
const deCima = await ev(`[...document.querySelectorAll('#s-quadros [data-qgrupo="programas"] [data-esc="quadros"], #s-quadros [data-qgrupo="outros"] [data-esc="quadros"]')].map(b=>b.dataset.v)`);
const aps1 = QG.filter(q => !/^A2-/.test(q.g)).map(q => q.id);
ok('seletor: os 18 quadros da APS I continuam nos dois grupos de cima', aps1.length === 18 && deCima.slice().sort().join() === aps1.slice().sort().join(), deCima.length + ' de ' + aps1.length);
const t0 = TEMAS[0]?.g, q0 = TEMAS[0]?.pills[0];
if (t0) {
  const aberto = g => ev(`document.querySelector('details[data-qgrupo="${g}"]').open`);
  await clica(`details[data-qgrupo="${t0}"] > summary`); await espera(80);
  ok('seletor: um toque abre o tema', await aberto(t0));
  await clica(`[data-esc="quadros"][data-v="${q0}"]`); await espera(80);
  const bloco0 = await ev(`(()=>{const it=Object.values(QUADROS.find(q=>q.id==='${q0}').blocos)[0].itens.find(i=>i.id);
    return !!document.querySelector('#ficha section:not(#s-quadros) [data-bloco="'+it.id+'"]');})()`);
  ok('seletor: marcar o quadro do tema põe o bloco dele na ficha', bloco0, q0);
  ok('seletor: o tema continua aberto depois do redesenho', await aberto(t0));
  await clica(`[data-esc="quadros"][data-v="${q0}"]`); await espera(80);
  ok('seletor: desmarcar não fecha o tema sozinho', await aberto(t0));
  await clica(`[data-esc="quadros"][data-v="${q0}"]`); await espera(80);
  await clica(`details[data-qgrupo="${t0}"] > summary`); await espera(80);
  await clica(`[data-esc="quadros"][data-v="${aps1[0]}"]`); await espera(80);
  ok('seletor: tema fechado à mão continua fechado quando a tela redesenha', !(await aberto(t0)));
} else pula('tema da APS II para abrir');
await vai();   // os testes de código começam sem quadro marcado

/* ---------- CID/CIAP: só da tabela ---------- */
const Q = await ev(`QUADROS.map(q=>({id:q.id, ciap:q.ciap||[], cid:q.cid||[]}))`);
const qc = Q.find(q => q.ciap.length);
if (qc) {
  await clica(`[data-esc="quadros"][data-v="${qc.id}"]`);
  await clica(`[data-esc="cod.ciap"][data-v="${qc.ciap[0]}"]`);
  const k = await campo('codigos');
  ok('código sugerido pelo quadro sai com a descrição da tabela', new RegExp('^CIAP-2: ' + qc.ciap[0] + ' — [A-ZÀ-Ü]').test(k), k);
} else pula('código sugerido pelo quadro');
await digita('input[data-cod="cid"]', 'z999'); await clica('[data-cod-add="cid"]');
ok('código fora da tabela sai VERIFICAR', /CID-10: Z99\.9 \(VERIFICAR: CÓDIGO FORA DA TABELA\)/.test(await campo('codigos')), await campo('codigos'));
await digita('input[data-cod="cid"]', 'I10 — Hipertensão essencial (primária)'); await clica('[data-cod-add="cid"]');
ok('código buscado na tabela entra pela lista', /CID-10: I10 — HIPERTENSÃO ESSENCIAL \(PRIMÁRIA\)/.test(await campo('codigos')), await campo('codigos'));

/* ---------- quadros: um por um, pelos dados ---------- */
const QS = await ev(`QUADROS.map(q=>q.id)`);
let semNaoPerder = [], lixo = [], lacuna = [], baseNaLacuna = [];
for (const qid of QS) {
  await vai();
  await clica(`[data-esc="quadros"][data-v="${qid}"]`);
  if (!(await ev(`!!document.querySelector('details.rf[data-rf="${qid}"] li')`))) semNaoPerder.push(qid);
  // intocado: "não avaliado" só com itens do quadro
  const t0 = await tudo();
  if (!/NÃO AVALIADO: /.test(t0)) lacuna.push(qid);
  if (/NÃO AVALIADO: [^\n]*(COMORBIDADES|ALERGIA|ETILISMO|TABAGISMO|ESTADO GERAL)/.test(t0)) baseNaLacuna.push(qid);
  // tudo ✓ (e cada detalhe/sub que abrir), depois tudo ✗
  for (const lado of ['sim', 'nao']) {
    await vai(); await clica(`[data-esc="quadros"][data-v="${qid}"]`);
    for (let volta = 0; volta < 3; volta++) await ev(`document.querySelectorAll('[data-bloco] .tri button[data-v="${lado}"][aria-pressed="false"]').forEach(b=>b.click())`);
    /* cada clique redesenha o bloco: guardar as chaves antes e buscar o botão de novo a cada clique */
    await ev(`[...document.querySelectorAll('#ficha section:not(#s-quadros) .pill[aria-pressed="false"]')].filter(b=>!b.closest('[data-bloco="cod"]'))
      .map(b=>[b.dataset.esc, b.dataset.v]).forEach(([k,v])=>{ const b=document.querySelector('.pill[data-esc="'+k+'"][data-v="'+v+'"][aria-pressed="false"]'); if(b) b.click(); })`);
    const t = await tudo();
    if (/undefined|null|\{a\}|\{ao\}|\{d\}|\[|\]|NaN/.test(t)) lixo.push(qid + '/' + lado + ': ' + (t.match(/.*(undefined|null|\{a\}|\{ao\}|\{d\}|\[|\]|NaN).*/) || [''])[0]);
  }
}
ok('todo quadro mostra o "Não perder" da queixa', !semNaoPerder.length, semNaoPerder.join(', '));
ok('quadro intocado → "NÃO AVALIADO:" com os itens dele', !lacuna.length, lacuna.join(', '));
ok('"NÃO AVALIADO:" nunca lista item da ficha base', !baseNaLacuna.length, baseNaLacuna.join(', '));
ok('tudo ✓ e tudo ✗ em cada quadro: sem undefined, token ou colchete no texto', !lixo.length, lixo.join(' | '));

/* sub-item só com o pai ✓ */
const comSub = await ev(`(()=>{for(const q of QUADROS) for(const s of Object.keys(q.blocos||{})) for(const it of q.blocos[s].itens) if(it.sub) return {q:q.id, it:it.id, sub:it.sub[0].id}; return null;})()`);
if (comSub) {
  await vai(); await clica(`[data-esc="quadros"][data-v="${comSub.q}"]`);
  await clica(`[data-tri="${comSub.it}"][data-v="nao"]`);
  ok('sub-item some com o pai ✗ e não vira lacuna', await ev(`!document.querySelector('[data-tri="${comSub.sub}"]')`) &&
     !new RegExp(await ev(`(QUADROS.find(q=>q.id==='${comSub.q}').blocos[Object.keys(QUADROS.find(q=>q.id==='${comSub.q}').blocos).find(s=>QUADROS.find(q=>q.id==='${comSub.q}').blocos[s].itens.some(i=>i.id==='${comSub.it}'))].itens.find(i=>i.id==='${comSub.it}').sub[0].na || QUADROS.find(q=>q.id==='${comSub.q}').blocos[Object.keys(QUADROS.find(q=>q.id==='${comSub.q}').blocos).find(s=>QUADROS.find(q=>q.id==='${comSub.q}').blocos[s].itens.some(i=>i.id==='${comSub.it}'))].itens.find(i=>i.id==='${comSub.it}').sub[0].rot).toUpperCase()`)).test(await tudo()));
} else pula('sub-item');

/* DUM → IG e DPP */
const comDum = await ev(`(()=>{for(const q of QUADROS) for(const s of Object.keys(q.blocos||{})) for(const it of q.blocos[s].itens) if(it.tipo==='data'&&it.calc==='dpp') return {q:q.id, it:it.id}; return null;})()`);
if (comDum) {
  await vai(); await clica(`[data-esc="quadros"][data-v="${comDum.q}"]`);
  await ev(`(()=>{const i=document.querySelector('[data-txt="${comDum.it}"]'); i.value='2026-01-10'; i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
  ok('DUM → IG e DPP de Näegele (DPP 17/10/2026, o mesmo teste do copiloto)', /DUM 10\/01\/2026, IG \d+ SEMANAS E \d+ DIAS, DPP 17\/10\/2026/.test(await tudo()), await tudo());
} else pula('DUM → IG e DPP');

/* desmarcar quadro com resposta pede confirmação */
await vai(); await clica(`[data-esc="quadros"][data-v="${QS[0]}"]`);
await ev(`document.querySelector('[data-bloco] .tri button[data-v="sim"]') && [...document.querySelectorAll('#ficha .rotulo + .bloco .tri button[data-v="sim"]')].slice(-1)[0].click()`);
const d0 = dialogos.length; await clica(`[data-esc="quadros"][data-v="${QS[0]}"]`);
ok('desmarcar quadro com resposta pede confirmação', dialogos.length === d0 + 1 && /tira do texto/.test(dialogos.at(-1) || ''), dialogos.at(-1));

/* ---------- exemplo palavra por palavra ---------- */
await vai('#exemplo');
const tx = await tudo();
fs.writeFileSync(SP + '/obtido.txt', tx + '\n');
const esp = fs.existsSync(SP + '/esperado.txt') ? fs.readFileSync(SP + '/esperado.txt', 'utf8').trim() : null;
ok('texto do exemplo = esperado.txt', esp !== null && tx === esp, esp === null ? 'sem esperado.txt' : 'ver diff obtido.txt × esperado.txt');
ok('exemplo marcado como MODELO DIDÁTICO', /^MODELO DIDÁTICO — NÃO É PACIENTE/.test(tx));
ok('sem * nem ~; _ só no marcador ___', !/[*~]/.test(tx) && tx.replace(/___/g, '').indexOf('_') < 0);
ok('copiar um campo copia só o campo', (await campo('anamnese')).length > 0 && !(await campo('anamnese')).includes('EXAME FÍSICO:'));

/* ---------- nada gravado ---------- */
/* a origem file:// é compartilhada com o copiloto, que grava SÓ a chave de API do "Gerar guia": esta página não grava nada */
ok('localStorage sem nenhuma chave desta página', await ev(`Object.keys(localStorage).filter(k=>k!=='copiloto.apikey').length`) === 0);
ok('sessionStorage vazio', await ev(`sessionStorage.length`) === 0);
ok('sem cookie', await ev(`document.cookie`) === '');
ok('com algo preenchido, sair pede confirmação (beforeunload)', await ev(`(()=>{const e=new Event('beforeunload',{cancelable:true}); window.dispatchEvent(e); return e.defaultPrevented;})()`));
await clica('#bt-limpar');
ok('Nova consulta apaga tudo', (await tudo()) === '' && await ev(`Object.keys(window.__consulta.estado()).length`) === 0);

/* ---------- celular ---------- */
for (const w of [360, 390]) {
  await tela(w, 800, true, 2); await vai();
  for (const qid of QS) await clica(`[data-esc="quadros"][data-v="${qid}"]`);
  ok(`celular ${w} · todos os quadros marcados, sem rolagem lateral`, await ev(`document.documentElement.scrollWidth <= document.documentElement.clientWidth`),
     await ev(`document.documentElement.scrollWidth + ' > ' + document.documentElement.clientWidth`));
  ok(`celular ${w} · botões da ficha com 44 px ou mais`, await ev(`[...document.querySelectorAll('#ficha button')].filter(b=>b.offsetParent && b.getBoundingClientRect().height < 43.5).length`) === 0);
}
await send('Emulation.clearDeviceMetricsOverride');

ok('sem erro de JavaScript em nenhuma carga', !erros.length, erros.slice(0, 5).join(' | '));
console.log(`\n${n - falhas}/${n} verificações passaram` + (pulos ? ` · ${pulos} puladas` : ''));
ws.close(); process.exit(falhas ? 1 : 0);
