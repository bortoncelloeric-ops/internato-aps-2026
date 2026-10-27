/* Gera teste/saidas/ para LER como prontuário: o texto de cada quadro em três estados
   (tudo ✓, tudo ✗, intocado), o caso de exemplo e as telas em 390 e 1280.
   Uso: Chrome headless na porta CDP_PORT (padrão 9337) e `node teste/saidas.mjs`. */
import fs from 'node:fs';
const SP = new URL('.', import.meta.url).pathname, OUT = SP + 'saidas/';
const APP = 'file://' + new URL('..', import.meta.url).pathname + 'index.html';
const PORTA = process.env.CDP_PORT || 9337;
fs.mkdirSync(OUT, { recursive: true });
const alvo = await (await fetch(`http://127.0.0.1:${PORTA}/json/list`)).json();
const ws = new WebSocket(alvo.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data);
  if (m.method === 'Page.javascriptDialogOpening') send('Page.handleJavaScriptDialog', { accept: true });
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
const send = (method, params = {}) => new Promise(res => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async e => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.result?.value;
const espera = ms => new Promise(r => setTimeout(r, ms));
let nav = 0;
const vai = async (h = '') => { await send('Page.navigate', { url: APP + '?n=' + (++nav) + h }); await espera(800); };
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 2600, deviceScaleFactor: 1, mobile: false });

const QS = await vai().then(() => ev(`QUADROS.map(q=>q.id)`));
for (const qid of QS) {
  for (const [nome, lado] of [['sim', 'sim'], ['nao', 'nao'], ['intocado', null]]) {
    await vai(); await ev(`document.querySelector('[data-esc="quadros"][data-v="${qid}"]').click()`);
    if (lado) {
      for (let v = 0; v < 3; v++) await ev(`document.querySelectorAll('[data-bloco] .tri button[data-v="${lado}"][aria-pressed="false"]').forEach(b=>b.click())`);
      if (lado === 'sim') await ev(`[...document.querySelectorAll('#ficha section:not(#s-quadros) .pill[aria-pressed="false"]')].filter(b=>!b.closest('[data-bloco="cod"]'))
        .map(b=>[b.dataset.esc, b.dataset.v]).forEach(([k,v])=>{ const b=document.querySelector('.pill[data-esc="'+k+'"][data-v="'+v+'"][aria-pressed="false"]'); if(b) b.click(); })`);
    }
    fs.writeFileSync(OUT + `${qid}-${nome}.txt`, (await ev(`window.__consulta.gerarTexto()`)) + '\n');
  }
}
await vai('#exemplo');
fs.writeFileSync(OUT + 'exemplo.txt', (await ev(`window.__consulta.gerarTexto()`)) + '\n');
for (const [w, mob] of [[390, true], [1280, false]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: mob ? 2 : 1, mobile: mob });
  await vai('#exemplo');
  const alto = await ev(`document.documentElement.scrollHeight`);
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: alto, scale: mob ? 0.5 : 1 } });
  fs.writeFileSync(OUT + `tela-${w}.png`, Buffer.from(shot.result.data, 'base64'));
}
await send('Emulation.clearDeviceMetricsOverride');
console.log(`saidas/: ${QS.length} quadros × 3 estados + exemplo + 2 telas`);
ws.close();
