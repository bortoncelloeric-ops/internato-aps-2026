// Material de revisão: nota gerada por quadro (sim / não / vazio), combo e telas inteiras.
// Uso: Chrome aberto com --remote-debugging-port=$CDP_PORT (padrão 9335); node teste/saidas.mjs
import fs from 'node:fs';
const BASE = new URL('..', import.meta.url).pathname;
const OUT = BASE + 'teste/saidas/';
const PORTA = process.env.CDP_PORT || 9335;
const APP = 'file://' + BASE + 'index.html';
fs.mkdirSync(OUT, { recursive: true });

/* helpers: os mesmos do teste.mjs */
const alvo = await (await fetch(`http://127.0.0.1:${PORTA}/json/list`)).json();
const ws = new WebSocket(alvo.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const erros = [];
ws.onmessage = e => { const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') erros.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') erros.push('console.error: ' + m.params.args.map(a => a.value).join(' '));
};
const send = (method, params = {}) => new Promise(res => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails)); return r.result?.result?.value; };
const espera = ms => new Promise(r => setTimeout(r, ms));
let nav = 0;
const vai = async (hash = '') => { await send('Page.navigate', { url: APP + '?n=' + (++nav) + hash }); await espera(900); };
const txt = () => ev(`document.getElementById('saida').textContent`);
const clica = sel => ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}); if(!b) return 'NAO ACHOU'; b.click(); return 'ok';})()`);
const tela = async (w, h, mobile, scale) => send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile });
const marcaQuadro = q => clica(`button[data-esc="quadros"][data-v="${q}"]`);

await send('Page.enable'); await send('Runtime.enable');
await tela(1280, 2600, false, 1);

/* preenche, dentro da página, todos os itens do quadro:
   'sim' = tri ✓ (+ detalhe "X" ou 1ª opção, + sub ✓), 1ª opção de toda escolha, texto "X"; 'nao' = tri ✗ */
const preenche = (q, modo) => ev(`(()=>{
  const q = QUADROS.find(x => x.id === ${JSON.stringify(q)});
  const $ = s => document.querySelector(s);
  const aperta = s => { const b = $(s); if (b && b.getAttribute('aria-pressed') !== 'true') b.click(); };
  const digita = (k, v) => { const e = $('[data-txt="' + k + '"]'); if (!e) return; e.value = v; e.dispatchEvent(new Event('input', {bubbles: true})); };
  Object.values(q.blocos).forEach(b => b.itens.forEach(it => {
    if (it.tipo === 'tri') {
      aperta('button[data-tri="' + it.id + '"][data-v="${modo}"]');
      if ('${modo}' !== 'sim') return;
      if (it.det && it.det.tipo === 'texto') digita(it.id + '.d', 'X');
      if (it.det && it.det.tipo === 'escolha') aperta('button[data-esc="' + it.id + '.d"]');
      (it.sub || []).forEach(s => aperta('button[data-tri="' + s.id + '"][data-v="sim"]'));
    } else if ('${modo}' === 'sim' && it.tipo === 'escolha') aperta('button[data-esc="' + it.id + '"]');
    else if ('${modo}' === 'sim' && it.tipo === 'texto') digita(it.id, 'X');
  }));
})()`);

const quadros = await ev(`QUADROS.map(q => q.id)`);
for (const q of quadros) {
  for (const modo of ['sim', 'nao', 'vazio']) {
    await vai();
    await marcaQuadro(q);
    if (modo !== 'vazio') await preenche(q, modo);
    fs.writeFileSync(OUT + `${q}-${modo}.txt`, await txt() + '\n');
  }
}

/* combo: psicose + agitação + substâncias, tudo presente, duas prescrições preenchidas */
await vai();
for (const q of ['psicose', 'agitacao', 'substancias']) await marcaQuadro(q);
for (const q of ['psicose', 'agitacao', 'substancias']) await preenche(q, 'sim');
const escolhe = i => ev(`(()=>{const s=document.querySelector('select[data-presc-f][data-i="${i}"]'); const o=[...s.querySelectorAll('option')].filter(o=>o.value)[${i}]; s.value=o.value; s.dispatchEvent(new Event('change',{bubbles:true})); return o.value;})()`);
await clica('button[data-presc-add]');
for (const i of [0, 1]) {
  await escolhe(i);
  await clica(`button.pill[data-esc="presc.acao"][data-i="${i}"][data-v="iniciar"]`);
  await clica(`button[data-chip="0"][data-i="${i}"]`);
}
fs.writeFileSync(OUT + 'combo.txt', await txt() + '\n');

/* telas inteiras (altura do documento todo) */
const telaInteira = async (arquivo, w, mobile) => {
  await ev('window.scrollTo(0,0)');
  const lm = await send('Page.getLayoutMetrics');
  const h = Math.ceil(lm.result.cssContentSize.height);
  const png = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
  fs.writeFileSync(OUT + arquivo, Buffer.from(png.result.data, 'base64'));
  return h;
};
await tela(390, 844, true, 1);
await vai('#exemplo');
for (const q of ['psicose', 'alcool']) await marcaQuadro(q);
const h390 = await telaInteira('tela-390-full.png', 390, true);
await tela(1280, 900, false, 1);
await vai('#exemplo');
for (const q of ['psicose', 'alcool']) await marcaQuadro(q);
const h1280 = await telaInteira('tela-1280-full.png', 1280, false);
await send('Emulation.clearDeviceMetricsOverride');

const soErros = erros.filter(e => !/beforeunload/.test(e));
console.log(`${quadros.length * 3 + 1} notas + 2 telas (390: ${h390}px, 1280: ${h1280}px) em teste/saidas/`);
if (soErros.length) console.log('erros no console:', JSON.stringify(soErros));
ws.close(); process.exit(soErros.length ? 1 : 0);
