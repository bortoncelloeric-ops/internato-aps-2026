import fs from 'node:fs';
const SP = process.argv[2] || new URL('.', import.meta.url).pathname;
const BASE = new URL('..', import.meta.url).pathname;
const PORTA = process.env.CDP_PORT || 9335;
const APP = 'file://' + BASE + 'index.html';
const alvo = await (await fetch(`http://127.0.0.1:${PORTA}/json/list`)).json();
const ws = new WebSocket(alvo.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const erros = [];
ws.onmessage = e => { const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') erros.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') erros.push(m.params.entry.text + ' ' + (m.params.entry.url||''));
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') erros.push('console.error: ' + m.params.args.map(a => a.value).join(' '));
};
const send = (method, params = {}) => new Promise(res => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails)); return r.result?.result?.value; };
const espera = ms => new Promise(r => setTimeout(r, ms));
let nav = 0;
// query diferente a cada vez: trocar só o #hash não recarrega a página
const vai = async (hash = '') => { await send('Page.navigate', { url: APP + '?n=' + (++nav) + hash }); await espera(900); };
const txt = () => ev(`document.getElementById('saida').textContent`);
const clica = sel => ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}); if(!b) return 'NAO ACHOU'; b.click(); return 'ok';})()`);
const secao = (t, tit) => (t.split(tit + '\n')[1] || '').split('\n\n')[0];
const tela = async (w, h, mobile, scale) => send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: scale, mobile });
let n = 0, falhas = 0;
const ok = (nome, cond, info='') => { n++; if (!cond) falhas++; console.log((cond ? '  ok   ' : ' FALHA ') + nome + (cond ? '' : '  → ' + info)); };

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await tela(1280, 2600, false, 1);

/* ================= 27 verificações do protótipo ================= */

// 1. exemplo bate palavra por palavra
await vai('#exemplo');
ok('dados do copiloto e quadros.js carregaram', await ev(`typeof PSICOFARMACOS !== 'undefined' && typeof QUEIXAS !== 'undefined' && Array.isArray(QUADROS) && QUADROS.length > 0`));
const t1 = await txt(), esperado = fs.readFileSync(SP + '/esperado.txt', 'utf8').trim();
fs.writeFileSync(SP + '/obtido.txt', t1);
ok('texto do exemplo = esperado', t1 === esperado, 'ver diff obtido.txt × esperado.txt');
ok('sem * nem ~', !/[*~]/.test(t1));
ok('_ só no marcador ___', t1.replace(/___/g, '').indexOf('_') < 0);

// 2. três estados: ✓ de novo desfaz e vira "não avaliado"
await clica('button[data-tri="humor"][data-v="sim"]');
let t = await txt();
ok('✓ clicado de novo → não avaliado', /\nNão avaliado: humor deprimido\.\n/.test(t) && !/Revisão de humor: humor deprimido/.test(t), t.split('\n').filter(l => /humor/.test(l)).join(' | '));
ok('botão voltou a não pressionado', await ev(`document.querySelector('button[data-tri="humor"][data-v="sim"]').getAttribute('aria-pressed')`) === 'false');
await clica('button[data-tri="humor"][data-v="nao"]');
ok('✗ → entra no "Nega"', /Nega humor deprimido\./.test(await txt()));

// 3. ideação ✗ → sub-critérios somem e não viram lacuna
await clica('button[data-tri="ideacao"][data-v="nao"]');
t = await txt();
ok('ideação ✗ esconde plano/meio/intenção', await ev(`!document.querySelector('button[data-tri="plano"]') && !document.querySelector('button[data-tri="intencao"]')`));
const risco = secao(t, 'RISCO DE SUICÍDIO');
ok('ideação ✗ → "Nega ideação suicida" sem lacuna de sub', /^Nega ideação suicida\./.test(risco) && !/intenção/.test(risco), risco);

// 4. seção intocada
ok('seção intocada → não avaliado nesta consulta', /HETEROAGRESSIVIDADE\nNão avaliado nesta consulta\./.test(t));

// 5. atalho do exame físico numa ficha limpa, com autolesão já ✓
await vai();
await clica('button[data-tri="eg"]'); // não existe, só garante que não quebra
await clica('button[data-tri="autolesao"][data-v="sim"]');
await clica('button[data-atalho="ef"]');
const pr = await ev(`['autolesao','trauma','intox','abst','rigidez','marcha'].map(id=>{const s=document.querySelector('button[data-tri="'+id+'"][data-v="sim"]').getAttribute('aria-pressed'), x=document.querySelector('button[data-tri="'+id+'"][data-v="nao"]').getAttribute('aria-pressed'); return id+':'+(s==='true'?'sim':x==='true'?'nao':'-');}).join(' ')`);
ok('atalho não sobrescreve ✓ e marca ✗ nos outros', pr === 'autolesao:sim trauma:nao intox:nao abst:nao rigidez:nao marcha:nao', pr);
t = await txt();
const ef = secao(t, 'EXAME FÍSICO');
ok('sinais vitais vazios → "não aferidos"', /^Sinais vitais não aferidos\./.test(ef), ef);
ok('✗ agrupados e nomeados', /Sem sinais de trauma, intoxicação ou abstinência\. Sem rigidez ou movimento involuntário\. Marcha sem alteração\./.test(ef), ef);
ok('EF: estado geral não marcado vira lacuna', /Não avaliado: estado geral, hidratação, coloração\./.test(ef), ef);
ok('texto sem nada marcado não diz "normal"', !/normal/i.test(t));

// 6. fármacos: prescrição, chips, racional, autocompletar (com o quadro depressão marcado)
await clica('button[data-esc="quadros"][data-v="depressao"]');
const escolhe = (fid, i = 0) => ev(`(()=>{const s=document.querySelector('select[data-presc-f][data-i="${i}"]'); s.value='${fid}'; s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
await escolhe('fluoxetina');
const chips = await ev(`[...document.querySelectorAll('.chip b')].map(b=>b.textContent)`);
ok('fluoxetina → 7 chips de dose com rótulo', chips.length === 7, JSON.stringify(chips));
ok('racional = papel do formulário', await ev(`document.querySelector('input[data-presc="racional"]').value`) === '1ª linha — o ISRS que o SUS dispensa e o único dos PCDT');
const iIdoso = chips.indexOf('Idoso');
await clica(`button[data-chip="${iIdoso}"]`);
const doseIdoso = await ev(`document.querySelector('input[data-presc="dose"]').value`);
ok('clique em "Idoso" preenche a linha do idoso', doseIdoso === 'início 20 mg pela manhã · manutenção 20 mg pela manhã · máximo 40 mg pela manhã', doseIdoso);
ok('chip do idoso mostra a fonte com página', await ev(`document.querySelectorAll('.chip')[${iIdoso}].querySelector('small').textContent`) === 'Maudsley Prescribing Guidelines, 15ª ed., 2025, p. 701');
await clica('button.pill[data-esc="presc.acao"][data-v="iniciar"]');
ok('ação marcada aparece pressionada', await ev(`document.querySelector('button.pill[data-esc="presc.acao"][data-v="iniciar"]').getAttribute('aria-pressed')`) === 'true');
ok('prescrição entra no texto', /Início de fluoxetina início 20 mg pela manhã/.test(await txt()));
// lítio: linhas que não são dose não viram botão
await escolhe('carbonato-de-litio');
const cl = await ev(`[...document.querySelectorAll('.chip b')].map(b=>b.textContent)`);
ok('lítio: "Como colher"/"Nível"/"Toxicidade" não viram chip', !cl.some(x => /colher|Nível|Toxicidade/.test(x)), JSON.stringify(cl));
ok('trocar fármaco troca o racional (não editado)', /potencializador/.test(await ev(`document.querySelector('input[data-presc="racional"]').value`)));
ok('autocompletar tem "sertr…" → Sertralina', await ev(`[...document.querySelectorAll('#dl-farmacos option')].some(o=>o.value.toLowerCase().startsWith('sertr'))`));
await clica('button[data-tri="meduso"][data-v="sim"]');
ok('medicação em uso ✓ abre uma linha de fármaco', await ev(`document.querySelectorAll('[data-bloco="meduso"] .row').length`) === 1);

/* ================= prescrição com N linhas ================= */
ok('optgroups: quadro, outras classes e "Outros fármacos"', await ev(`(()=>{const g=[...document.querySelector('select[data-presc-f]').querySelectorAll('optgroup')].map(o=>o.label+':'+o.children.length); return g.some(x=>x.startsWith('Depressão:')) && g.some(x=>x.startsWith('Depressão — outras classes:')) && g.some(x=>/^Outros fármacos:[1-9]/.test(x));})()`));
await clica('button[data-presc-add]');
await escolhe('fluoxetina', 0);
await escolhe('sertralina', 1);
ok('+ prescrição → dois selects', await ev(`document.querySelectorAll('select[data-presc-f]').length`) === 2);
let plano = secao(await txt(), 'PLANO').split('\n');
ok('duas prescrições → duas linhas no PLANO', plano.filter(l => /^(Início de|Prescrição de) fluoxetina ___\. Racional: /.test(l)).length === 1 && plano.filter(l => /^Prescrição de sertralina ___\. Racional: /.test(l)).length === 1, plano.join(' | '));
await clica('button[data-presc-del="0"]');
plano = secao(await txt(), 'PLANO').split('\n');
ok('remover tira só aquela linha', plano.length === 1 && /^Prescrição de sertralina/.test(plano[0]), plano.join(' | '));
await clica('button[data-esc="quadros"][data-v="depressao"]');
ok('sem quadro: select só com "Outros fármacos" e sem papel', await ev(`[...document.querySelector('select[data-presc-f]').querySelectorAll('optgroup')].map(o=>o.label).join('|')`) === 'Outros fármacos'
  && await ev(`!document.querySelector('[data-bloco="presc"] .papel')`));
ok('sem quadro: alternativas viram uma linha de aviso', await ev(`!document.querySelector('button[data-esc="alternativas"]') && !!document.querySelector('[data-bloco="alternativas"] .nota')`));

/* ================= opção exclusiva (so: true) ================= */
await clica('button[data-esc="orientacao"][data-v="orientado"]');
await clica('button[data-esc="orientacao"][data-v="dtempo"]');
const pres = k => ev(`[...document.querySelectorAll('button[data-esc="${k}"]')].filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.dataset.v).join(',')`);
ok('so: marcar outra opção desmarca "orientado"', await pres('orientacao') === 'dtempo', await pres('orientacao'));
await clica('button[data-esc="orientacao"][data-v="despaco"]');
await clica('button[data-esc="orientacao"][data-v="orientado"]');
ok('so: marcar "orientado" desmarca as outras', await pres('orientacao') === 'orientado', await pres('orientacao'));
await clica('button[data-esc="senso"][data-v="auditiva"]');
await clica('button[data-esc="senso"][data-v="sem"]');
ok('so: sensopercepção "sem alterações" é exclusiva', await pres('senso') === 'sem' && /Sem alterações de sensopercepção\./.test(await txt()));

/* ================= quadros: genérico sobre QUADROS ================= */
await vai();
const quadros = await ev(`QUADROS.map(q=>({id:q.id, secs:Object.keys(q.blocos||{}).map(s=>({s, rot:q.blocos[s].rot, ids:(q.blocos[s].itens||[]).map(i=>i.id).filter(Boolean)})), tris:[].concat(...Object.values(q.blocos||{}).map(b=>(b.itens||[]).filter(i=>i.tipo==='tri'))).map(i=>({id:i.id, sub:(i.sub||[]).map(s=>s.id)}))}))`);
const ruim = s => ['undefined', '{', '}', '[', ']', '..', '  '].filter(x => s.includes(x))
  .concat(new RegExp('Revisão[^\\n.]*: *(\\.|\\n|$)').test(s) ? ['grupo Revisão vazio'] : []);
for (const q of quadros) {
  const base = await txt();
  await clica(`button[data-esc="quadros"][data-v="${q.id}"]`);
  const faltam = await ev(`(${JSON.stringify(q.secs)}).flatMap(b=>{const s=document.getElementById('s-'+b.s); if(!s) return ['seção '+b.s]; return (s.textContent.includes(b.rot)?[]:['rot '+b.rot]).concat(b.ids.filter(id=>!s.querySelector('[data-bloco="'+id+'"]')));})`);
  ok(`[${q.id}] blocos aparecem nas seções declaradas (${q.secs.map(b => b.s).join(', ')})`, faltam.length === 0, faltam.join(', '));
  const marca = v => ev(`(()=>{const t=${JSON.stringify(q.tris)}; t.forEach(i=>{const b=document.querySelector('button[data-tri="'+i.id+'"][data-v="${v}"]'); if(b && b.getAttribute('aria-pressed')!=='true') b.click();}); if('${v}'==='sim') t.forEach(i=>i.sub.forEach(s=>{const b=document.querySelector('button[data-tri="'+s+'"][data-v="sim"]'); if(b && b.getAttribute('aria-pressed')!=='true') b.click();}));})()`);
  await marca('sim');
  let tq = await txt();
  ok(`[${q.id}] tudo ✓ → texto limpo`, ruim(tq).length === 0, ruim(tq).join(' ; '));
  await marca('nao');
  tq = await txt();
  ok(`[${q.id}] tudo ✗ → texto limpo`, ruim(tq).length === 0, ruim(tq).join(' ; '));
  await clica(`button[data-esc="quadros"][data-v="${q.id}"]`);
  const sobra = await ev(`(${JSON.stringify(q.secs)}).flatMap(b=>b.ids).filter(id=>document.querySelector('[data-bloco="'+id+'"]'))`);
  ok(`[${q.id}] desmarcar tira da tela e do texto`, sobra.length === 0 && await txt() === base, sobra.join(', '));
  await clica(`button[data-esc="quadros"][data-v="${q.id}"]`);
  const t0 = q.tris[0];
  ok(`[${q.id}] remarcar devolve as respostas`, !t0 || await ev(`document.querySelector('button[data-tri="${t0?.id}"][data-v="nao"]').getAttribute('aria-pressed')`) === 'true');
  await clica(`button[data-esc="quadros"][data-v="${q.id}"]`);
}

// todos marcados: ids únicos na tela, "não perder" aberto por quadro, proibidos listados
await vai();
await ev(`QUADROS.forEach(q=>{const b=document.querySelector('button[data-esc="quadros"][data-v="'+q.id+'"]'); if(b.getAttribute('aria-pressed')!=='true') b.click();})`);
const blocos = await ev(`[...document.querySelectorAll('[data-bloco]')].map(b=>b.dataset.bloco)`);
ok('todos os quadros marcados: nenhum item aparece duas vezes', new Set(blocos).size === blocos.length, blocos.filter((b, i) => blocos.indexOf(b) !== i).join(', '));
const rfEsperado = await ev(`QUADROS.filter(q=>{const x=QUEIXAS.find(z=>z.id===q.queixa); return x && x.redflags && (x.redflags.itens||[]).length;}).length`);
ok('um "Não perder" aberto por quadro marcado', await ev(`document.querySelectorAll('#s-quadros details.rf[open]').length`) === rfEsperado && rfEsperado > 0, 'esperado ' + rfEsperado);
ok('"Não perder" lista os itens da queixa', await ev(`(()=>{const q=QUADROS[0], x=QUEIXAS.find(z=>z.id===q.queixa); const d=document.querySelector('#s-quadros details.rf'); return d.querySelectorAll('li').length===x.redflags.itens.length && d.textContent.includes('Não perder — '+q.nome);})()`));
const prEsperado = await ev(`(()=>{const ids=new Set(); QUADROS.forEach(q=>{const x=QUEIXAS.find(z=>z.id===q.queixa); ((x&&x.formulario&&x.formulario.proibidos)||[]).forEach(i=>{ if(PSICOFARMACOS.proibidos.itens.some(p=>p.id===i)) ids.add(i); });}); return ids.size;})()`);
ok('"Não combinar" lista os proibidos dos quadros (sem repetir)', prEsperado > 0 && await ev(`document.querySelectorAll('details.proib li').length`) === prEsperado
  && await ev(`document.querySelector('details.proib summary').textContent`) === `Não combinar nestes quadros (${prEsperado})`, 'esperado ' + prEsperado);
ok('"Não perder" e "Não combinar" não entram no texto', !/Não perder|Não combinar/.test(await txt()));

// id compartilhado + grupos com a mesma chave em dois quadros (quadro de teste injetado)
await vai();
const DEPQ = `QUADROS.find(q=>q.id==='depressao')`;
await ev(`QUADROS.push({id:'teste-dup', nome:'Teste', queixa:${DEPQ}.queixa, fonte:'fonte de teste', blocos:{hda:{rot:'Bloco de teste', grupos:{rev:{pre:'Teste: ', conj:' e '}}, itens:[${DEPQ}.blocos.hda.itens[0], {tipo:'tri', id:'tx-novo', rot:'Novo', sim:{g:'rev', t:'novo achado'}, nao:'nega novo achado'}]}}}); 0`);
await clica('button[data-esc="quadros"][data-v="depressao"]');
await clica('button[data-esc="quadros"][data-v="teste-dup"]');
const dupId = await ev(`${DEPQ}.blocos.hda.itens[0].id`);
ok('id compartilhado aparece uma vez só, no primeiro quadro', await ev(`document.querySelectorAll('[data-bloco="${dupId}"]').length`) === 1 && await ev(`!!document.querySelector('[data-bloco="tx-novo"]')`));
await clica(`button[data-tri="${dupId}"][data-v="sim"]`);
await clica('button[data-tri="tx-novo"][data-v="sim"]');
const hda = secao(await txt(), 'HDA').split('\n');
ok('grupos de quadros diferentes não se misturam; cada bloco em linha nova', hda.some(l => /^Revisão de humor: [^\n]*\./.test(l) && !l.includes('novo achado')) && hda.some(l => l.startsWith('Teste: novo achado.')), hda.join(' | '));
ok('lacunas dos blocos num "Não avaliado" só, no fim da seção', hda.filter(l => l.startsWith('Não avaliado:')).length === 1 && hda[hda.length - 1].startsWith('Não avaliado:'), hda.join(' | '));
await clica('button[data-esc="quadros"][data-v="depressao"]');
ok('desmarcar o 1º quadro passa o id compartilhado para o seguinte', await ev(`!!document.querySelector('[data-bloco="${dupId}"]') && document.getElementById('s-hda').textContent.includes('Bloco de teste')`));

/* ================= celular ================= */
for (const w of [390, 360]) {
  await tela(w, 844, true, 3);
  await vai('#exemplo');
  await ev(`QUADROS.forEach(q=>{const b=document.querySelector('button[data-esc="quadros"][data-v="'+q.id+'"]'); if(b.getAttribute('aria-pressed')!=='true') b.click();}); 0`);
  await clica('button[data-tri="meduso"][data-v="sim"]');
  await ev('window.scrollTo(0,0)');
  const m = await ev(`(()=>{const d=document.documentElement, bar=document.querySelector('.barra'), r=bar.getBoundingClientRect(), vis=e=>e.getClientRects().length>0 && getComputedStyle(e).visibility!=='hidden';
    return {sw:d.scrollWidth, cw:d.clientWidth, bar:getComputedStyle(bar).display!=='none' && r.bottom<=innerHeight+1 && r.top<innerHeight && r.height>=44,
      header:document.querySelector('header').getBoundingClientRect().height,
      baixos:[...document.querySelectorAll('button')].filter(vis).filter(b=>b.getBoundingClientRect().height<44-0.5).map(b=>(b.id||b.dataset.v||b.textContent).slice(0,30)+':'+Math.round(b.getBoundingClientRect().height)),
      fontes:[...document.querySelectorAll('input,select,textarea')].filter(vis).filter(e=>parseFloat(getComputedStyle(e).fontSize)<16).map(e=>(e.dataset.txt||e.dataset.presc||e.tagName)+':'+getComputedStyle(e).fontSize),
      pad:parseFloat(getComputedStyle(document.body).paddingBottom)>=r.height};})()`);
  ok(`${w}px: sem rolagem horizontal da página`, m.sw <= m.cw, m.sw + ' > ' + m.cw);
  ok(`${w}px: barra de baixo visível e o corpo reserva espaço para ela`, m.bar && m.pad);
  ok(`${w}px: cabeçalho fixo com no máximo 100px`, m.header <= 100, m.header);
  ok(`${w}px: todo botão visível tem ≥ 44px de altura`, m.baixos.length === 0, m.baixos.join(', '));
  ok(`${w}px: todo campo visível tem fonte ≥ 16px`, m.fontes.length === 0, m.fontes.join(', '));
  ok(`${w}px: botões do cabeçalho escondidos; "Carregar caso de exemplo" no fim da ficha`, await ev(`getComputedStyle(document.getElementById('bt-copiar')).display==='none' && document.getElementById('bt-exemplo-m').getClientRects().length>0`));
  await clica('#bt-ver');
  await espera(300);
  ok(`${w}px: "Ver texto" traz o texto gerado para a tela`, await ev(`(()=>{const r=document.getElementById('saida').getBoundingClientRect(); return r.top < innerHeight - 60 && r.bottom > 0 && r.top >= 0;})()`));
  ok(`${w}px: texto gerado sem rolagem interna`, await ev(`(()=>{const p=document.getElementById('saida'); return getComputedStyle(p).maxHeight==='none' && p.scrollHeight<=p.clientHeight+1;})()`));
  if (w === 390) {
    await ev('window.scrollTo(0,0)');
    const png = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(SP + '/tela-390.png', Buffer.from(png.result.data, 'base64'));
  }
}
ok('celular: inputmode numérico/decimal nos sinais vitais e idade, PA texto', await ev(`['fc','fr','sat','hgt'].every(k=>document.querySelector('[data-txt="sv.'+k+'"]').inputMode==='numeric') && document.querySelector('[data-txt="sv.tax"]').inputMode==='decimal' && document.querySelector('[data-txt="sv.pa"]').inputMode!=='numeric' && document.querySelector('[data-txt="idade"]').inputMode==='numeric'`));
ok('tri com aria-label "<rot>: ausente/presente"', await ev(`document.querySelector('button[data-tri="alcool"][data-v="nao"]').getAttribute('aria-label')==='Álcool: ausente' && document.querySelector('button[data-tri="alcool"][data-v="sim"]').getAttribute('aria-label')==='Álcool: presente'`));

/* ================= desktop ================= */
await tela(1280, 900, false, 1);
await vai('#exemplo');
const dk = await ev(`(()=>{const a=document.querySelector('.saida').getBoundingClientRect(), f=document.getElementById('ficha').getBoundingClientRect();
  return {bar:getComputedStyle(document.querySelector('.barra')).display, col:a.width>300 && a.left>f.right-1 && a.top<innerHeight, hbt:document.getElementById('bt-exemplo').getClientRects().length>0 && document.getElementById('bt-limpar').textContent==='Nova admissão'};})()`);
ok('1280px: barra de baixo escondida', dk.bar === 'none', dk.bar);
ok('1280px: coluna do texto visível à direita da ficha', dk.col);
ok('1280px: botões no cabeçalho (exemplo, Nova admissão, Copiar)', dk.hbt);
const png = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(SP + '/tela-1280.png', Buffer.from(png.result.data, 'base64'));

/* ================= nada é gravado ================= */
const fonte = fs.readFileSync(BASE + 'index.html', 'utf8');
const proibidas = ['localStorage', 'sessionStorage', 'document.cookie', 'fetch(', 'indexedDB'].filter(x => fonte.includes(x));
ok('index.html sem localStorage, sessionStorage, cookie, fetch, indexedDB', proibidas.length === 0, proibidas.join(', '));

const avisoSaida = erros.filter(e => /beforeunload/.test(e));
ok('aviso "sair mesmo?" armado com ficha preenchida (Chrome bloqueia sem gesto humano)', avisoSaida.length >= 1);
const outros = erros.filter(e => !/beforeunload/.test(e));
ok('console sem outro erro', outros.length === 0, JSON.stringify(outros));
console.log(`\n${n - falhas}/${n} ok`);
ws.close(); process.exit(falhas ? 1 : 0);
