import fs from 'node:fs';
const SP = process.argv[2] || new URL('.', import.meta.url).pathname;
const BASE = new URL('..', import.meta.url).pathname;
const PORTA = process.env.CDP_PORT || 9335;
const APP = 'file://' + BASE + 'index.html';
const alvo = await (await fetch(`http://127.0.0.1:${PORTA}/json/list`)).json();
const ws = new WebSocket(alvo.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const erros = []; const dialogos = [];
ws.onmessage = e => { const m = JSON.parse(e.data);
  // confirm() de verdade (ex.: desmarcar quadro com respostas) bloquearia o e2e: registra e aceita
  if (m.method === 'Page.javascriptDialogOpening') { dialogos.push(m.params.message); send('Page.handleJavaScriptDialog', { accept: true }); }
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
// D1: com Agitação marcada, o atalho cobre também os tri do bloco ef do quadro; nunca pílula nem vitais; nunca troca ✓
await vai();
await clica('button[data-esc="quadros"][data-v="agitacao"]');
await clica('button[data-tri="del-focal"][data-v="sim"]');
await clica('button[data-atalho="ef"]');
const efTri = await ev(`[...document.querySelectorAll('#s-ef button[data-tri][data-v="nao"]')].map(b=>b.dataset.tri+':'+(b.getAttribute('aria-pressed')==='true'?'nao':document.querySelector('button[data-tri="'+b.dataset.tri+'"][data-v="sim"]').getAttribute('aria-pressed')==='true'?'sim':'-')).join(' ')`);
ok('D1: atalho marca ✗ em todo tri visível do EF, base e quadro, sem trocar ✓', /del-focal:sim/.test(efTri) && /agi-acatisia:nao/.test(efTri) && /psi-snm:nao/.test(efTri) && /marcha:nao/.test(efTri) && !/:-/.test(efTri), efTri);
ok('D1: atalho não toca pílulas (pupilas) nem sinais vitais', await ev(`!document.querySelector('#s-ef button[data-esc="agi-pupilas"][aria-pressed="true"]') && !document.querySelector('#s-ef button[data-esc="eg"][aria-pressed="true"]')`)
  && /Sinais vitais não aferidos\./.test(await txt()) && /pupilas/.test(secao(await txt(), 'EXAME FÍSICO')), secao(await txt(), 'EXAME FÍSICO'));

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
ok('M1: chip tocado fica pressionado, os outros não', await ev(`[...document.querySelectorAll('.chip')].map(c=>c.getAttribute('aria-pressed')).join()`) === chips.map((c, k) => k === iIdoso ? 'true' : 'false').join());
ok('M1: campo Dose vem antes dos chips', await ev(`(()=>{const i=document.querySelector('input[data-presc="dose"]'), c=document.querySelector('.chip'); return !!(i.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING);})()`));
ok('M11: fonte da dose no chip com 12px', await ev(`getComputedStyle(document.querySelector('.chip small')).fontSize`) === '12px');
ok('M10: nome e dose de fármaco sem corretor', await ev(`[document.querySelector('input[data-presc="dose"]')].every(e=>e.getAttribute('autocorrect')==='off' && e.getAttribute('autocapitalize')==='off' && e.getAttribute('spellcheck')==='false')`));
// D2: o chip preenche só a posologia (sem fonte " — …" e sem explicação ", para …")
await escolhe('risperidona');
const iRisp = await ev(`[...document.querySelectorAll('.chip b')].map(b=>b.textContent).indexOf('Início (esquizofrenia)')`);
await clica(`button[data-chip="${iRisp}"]`);
const doseRisp = await ev(`document.querySelector('input[data-presc="dose"]').value`);
ok('D2: risperidona "1 mg 2 vezes ao dia, para evitar…" preenche "1 mg 2 vezes ao dia"', doseRisp === '1 mg 2 vezes ao dia', doseRisp);
ok('D2: o chip continua mostrando a linha inteira', await ev(`document.querySelectorAll('.chip')[${iRisp}].textContent.includes('para evitar efeito de primeira dose')`));
// D2 + M15: em TODO fármaco, cada chip k preenche a linha k de linhasDose (o texto do próprio chip);
// o que o chip corta nunca tem número (dose, frequência, máximo…)
const todos = await ev(`(()=>{const s=()=>document.querySelector('select[data-presc-f]'), out=[];
  [...s().querySelectorAll('option')].filter(o=>o.value).map(o=>o.value).forEach(fid=>{ const e=s(); e.value=fid; e.dispatchEvent(new Event('change',{bubbles:true}));
    const cs=[...document.querySelectorAll('.chip')];
    cs.forEach((c,k)=>{ document.querySelectorAll('.chip')[k].click();
      const full=c.childNodes[1].textContent.trim().split(' — ')[0], v=document.querySelector('input[data-presc="dose"]').value;
      out.push([fid,k,full,v]); }); });
  return out;})()`);
const ruins = todos.filter(([, , full, v]) => !full.startsWith(v) || /[0-9]/.test(full.slice(v.length)) || !v);
ok(`D2: ${todos.length} chips — cada um preenche o começo da própria linha e nunca corta número`, todos.length >= 200 && ruins.length === 0, JSON.stringify(ruins.slice(0, 3)));
await escolhe('fluoxetina');
// lítio: linhas que não são dose não viram botão
await escolhe('carbonato-de-litio');
const cl = await ev(`[...document.querySelectorAll('.chip b')].map(b=>b.textContent)`);
ok('lítio: "Como colher"/"Nível"/"Toxicidade" não viram chip', !cl.some(x => /colher|Nível|Toxicidade/.test(x)), JSON.stringify(cl));
ok('trocar fármaco troca o racional (não editado)', /potencializador/.test(await ev(`document.querySelector('input[data-presc="racional"]').value`)));
ok('autocompletar tem "sertr…" → Sertralina', await ev(`[...document.querySelectorAll('#dl-farmacos option')].some(o=>o.value.toLowerCase().startsWith('sertr'))`));
await clica('button[data-tri="meduso"][data-v="sim"]');
ok('medicação em uso ✓ abre uma linha de fármaco', await ev(`document.querySelectorAll('[data-bloco="meduso"] .row').length`) === 1);

/* ================= racional com vários quadros ================= */
const papel = (qid, fid) => ev(`(()=>{const q=QUADROS.find(x=>x.id==='${qid}'), x=QUEIXAS.find(z=>z.id===q.queixa); return ((x.formulario.farmacos||[]).find(f=>f.id==='${fid}')||{}).papel;})()`);
const racional = () => ev(`document.querySelector('input[data-presc="racional"]').value`);
const marcaQ = q => clica(`button[data-esc="quadros"][data-v="${q}"]`);
// F2: Álcool + Agitação, diazepam listado nos dois → o app não escolhe; mostra os dois papéis
await vai(); await ev('window.confirm=()=>true');
await marcaQ('agitacao'); await marcaQ('alcool'); await escolhe('diazepam');
ok('F2: fármaco listado em 2 quadros marcados → racional vazio', await racional() === '', await racional());
ok('F2: os 2 papéis aparecem com o nome do quadro', await ev(`[...document.querySelectorAll('button.opc')].map(b=>b.querySelector('b').textContent).join('|')`) === 'Agitação|Álcool');
await clica('button.opc[data-papel="1"]');
ok('F2: tocar no papel do Álcool preenche o racional com ele', await racional() === await papel('alcool', 'diazepam'));
ok('F2: o papel escolhido fica pressionado', await ev(`document.querySelector('button.opc[data-papel="1"]').getAttribute('aria-pressed')`) === 'true');
await marcaQ('agitacao');
ok('F2: desmarcar o outro quadro não troca o papel escolhido', await racional() === await papel('alcool', 'diazepam'));
// F1 (código): Ansiedade → sertralina → marca Depressão → fluoxetina: o papel da sertralina não vai para a fluoxetina
await vai(); await ev('window.confirm=()=>true');
await marcaQ('ansiedade'); await escolhe('sertralina');
ok('F1: sertralina com só Ansiedade → papel da ansiedade', await racional() === await papel('ansiedade', 'sertralina'));
await marcaQ('depressao');
ok('F1: marcar outro quadro que também lista a sertralina não troca o racional', await racional() === await papel('ansiedade', 'sertralina'));
await escolhe('fluoxetina');
ok('F1: trocar para fluoxetina não herda o racional da sertralina', await racional() !== await papel('ansiedade', 'sertralina') && await racional() === '', await racional());
// Depressão → fluoxetina → desmarca Depressão → Psicose → haloperidol
await vai(); await ev('window.confirm=()=>true');
await marcaQ('depressao'); await escolhe('fluoxetina'); await marcaQ('depressao');
ok('F1: desmarcar o único quadro do papel tira o racional do app', await racional() === '', await racional());
await marcaQ('psicose'); await escolhe('haloperidol');
ok('F1: haloperidol com Psicose → papel da psicose', await racional() === await papel('psicose', 'haloperidol'), await racional());
// Agitação → haloperidol → Psicose → olanzapina
await vai(); await ev('window.confirm=()=>true');
await marcaQ('agitacao'); await escolhe('haloperidol'); await marcaQ('psicose'); await escolhe('olanzapina');
ok('F1: olanzapina recebe o próprio papel, não o do haloperidol', await racional() === await papel('psicose', 'olanzapina'), await racional());
// racional escrito à mão nunca é trocado
await ev(`(()=>{const i=document.querySelector('input[data-presc="racional"]'); i.value='meu racional'; i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await marcaQ('mania'); await escolhe('quetiapina');
ok('racional escrito à mão sobrevive a troca de quadro e de fármaco', await racional() === 'meu racional');

/* ================= linhas de fármaco (pregressa / em uso) ================= */
await vai();
await clica('button[data-tri="meduso"][data-v="sim"]');
ok('F2: medicação em uso ✓ sem fármaco → "Medicação em uso." (sem ": .")', /(^|\n)Medicação em uso\.( |\n|$)/.test(secao(await txt(), 'CLÍNICA')) && !(await txt()).includes(': .'), secao(await txt(), 'CLÍNICA'));
await clica('button[data-tri="tratprevio"][data-v="sim"]');
ok('F2: tratamento prévio ✓ sem fármaco → "Tratamento prévio."', /Tratamento prévio\./.test(await txt()) && !(await txt()).includes(': .'));
const digRow = (k, v) => ev(`(()=>{const i=document.querySelector('input[data-row="${k}"]'); i.value=${JSON.stringify(v)}; i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await digRow('meduso|0|dose', '50 mg/dia');
ok('F2: dose digitada sem nome não some', /Medicação em uso: fármaco não informado 50 mg\/dia\./.test(await txt()), secao(await txt(), 'CLÍNICA'));
await clica('button[data-add="meduso"]'); await clica('button[data-add="meduso"]');
await digRow('meduso|0|nome', 'Sertralina'); await digRow('meduso|0|dose', ''); await digRow('meduso|1|nome', 'Clonazepam'); await digRow('meduso|2|nome', 'Losartana');
ok('M12: digitar na 2ª linha não muda a 1ª', await ev(`document.querySelector('input[data-row="meduso|0|nome"]').value`) === 'Sertralina');
await clica('button[data-del="meduso|1"]');
ok('M11: remover a do meio tira só ela', /Medicação em uso: sertralina; losartana\./.test(await txt()) && await ev(`[...document.querySelectorAll('[data-bloco="meduso"] input[data-row$="|nome"]')].map(i=>i.value).join()`) === 'Sertralina,Losartana', secao(await txt(), 'CLÍNICA'));
ok('M10: nome de fármaco sem corretor', await ev(`document.querySelector('input[data-row="meduso|0|nome"]').getAttribute('autocorrect')`) === 'off');
// volta ao estado que a seção seguinte espera: Depressão marcada, lítio escolhido, medicação em uso ✓
await vai(); await marcaQ('depressao'); await escolhe('carbonato-de-litio'); await clica('button[data-tri="meduso"][data-v="sim"]');

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

/* ================= achados clínicos e gerador (30/09) ================= */
// M6: desmarcar quadro com respostas pede confirmação; cancelar mantém tudo
await vai();
await marcaQ('suicidio');
await clica('button[data-tri="sui-atual"][data-v="sim"]'); await clica('button[data-tri="sui-desesperanca"][data-v="sim"]');
await ev(`window.__conf=[]; window.confirm=m=>{window.__conf.push(m); return false;}`);
await marcaQ('suicidio');
ok('M6: desmarcar com 2 respostas pede confirmação com o número', await ev(`window.__conf.length===1 && window.__conf[0].includes('2 respostas')`), await ev('JSON.stringify(window.__conf)'));
ok('M6: cancelar deixa o quadro marcado e o texto igual', /Tentativa de suicídio atual/.test(await txt()) && /desesperança/.test(await txt()));
// F7: tentativa atual ✓ sem detalhe → método e horário no "Não avaliado"; dano sem afirmação definitiva
let hdaT = secao(await txt(), 'HDA');
ok('F7: tentativa atual sem detalhe → "método e horário da tentativa" no Não avaliado', /Não avaliado:[^\n]*método e horário da tentativa/.test(hdaT), hdaT);
await ev(`(()=>{const i=document.querySelector('input[data-txt="sui-atual.d"]'); i.value='ingestão de comprimidos às 14h.'; i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
hdaT = secao(await txt(), 'HDA');
ok('F7: com detalhe, a lacuna some e o detalhe entra', !/método e horário/.test(hdaT) && /Tentativa de suicídio atual: ingestão de comprimidos às 14h[,.]/.test(hdaT), hdaT);
ok('M13: detalhe digitado com ponto final não vira ".."', !(await txt()).includes('..'));
await clica('button[data-tri="sui-dano"][data-v="nao"]');
ok('F7: dano ✗ → "sem repercussão clínica até o momento"', /sem repercussão clínica até o momento/.test(await txt()));
// F8: ideação passiva × ativa; F3: meio = o do plano; arma num lugar só
await clica('button[data-tri="ideacao"][data-v="sim"]'); await clica('button[data-esc="ideacao.d"][data-v="passiva"]');
await clica('button[data-tri="meio"][data-v="nao"]');
ok('F8: ideação passiva registrada', /Ideação suicida presente \(passiva, sem pensar em como\), sem acesso ao meio planejado\./.test(await txt()), secao(await txt(), 'RISCO DE SUICÍDIO'));
ok('F3: arma só em Heteroagressividade', await ev(`!document.querySelector('[data-esc="sui-meiocasa.d"][data-v="arma"]') && document.querySelectorAll('[data-bloco="arma"]').length===1`)
  && await ev(`document.querySelector('[data-bloco="arma"] .lrot').textContent`) === 'Arma de fogo em casa ou acesso a arma');
// F9: fala, alucinação tátil, delírio múltiplo
await clica('button[data-esc="delirio"][data-v="persecutorio"]'); await clica('button[data-esc="delirio"][data-v="grandeza"]');
await clica('button[data-esc="senso"][data-v="tatil"]'); await clica('button[data-esc="fala"][data-v="pressao"]');
let eemT = secao(await txt(), 'EEM');
ok('F9: persecutório + grandeza juntos; tátil; fala com pressão', /delírio persecutório e delírio de grandeza/i.test(eemT) && /alucinação tátil/i.test(eemT) && /Fala com pressão de discurso/.test(eemT), eemT);
await clica('button[data-esc="delirio"][data-v="ausente"]');
ok('F9: "ausente" é exclusivo no delírio', await pres('delirio') === 'ausente');
// F5: sonolência na consciência; fuga de ideias no pensamento; atenção da conversa
ok('F5: sonolento em Consciência, fuga de ideias em Pensamento, atenção "preservada na conversa"', await ev(`!!document.querySelector('[data-esc="consciencia"][data-v="sonolento"]') && !!document.querySelector('[data-esc="pensamento"][data-v="fuga"]') && document.querySelector('[data-esc="atencao"][data-v="preservada"]').textContent==='preservada na conversa'`));
// F10: gestação — sem lacuna quando não tocada; com ✓ entra
ok('F10: gestação não tocada não suja a nota', !/gesta/i.test(await txt()));
await clica('button[data-tri="gestacao"][data-v="sim"]');
ok('F10: gestação ✓ entra na CLÍNICA', /Gestação ou puerpério\./.test(secao(await txt(), 'CLÍNICA')), secao(await txt(), 'CLÍNICA'));
// M14: tokens de gênero para sexo M
await clica('button[data-esc="sexo"][data-v="M"]'); await clica('button[data-esc="trazido"][data-v="familia"]'); await clica('button[data-tri="explicado"][data-v="sim"]');
ok('M14: sexo M → "Trazido pela família" e "explicada ao paciente"', /Trazido pela família/.test(await txt()) && /Conduta explicada ao paciente e à família/.test(await txt()));
// F4 (gerador): "há" e unidade digitados não duplicam; F9 (gerador): "$&" sai literal
await vai(); await marcaQ('psicose'); await marcaQ('alcool');
const dig = (k, v) => ev(`(()=>{const i=document.querySelector('[data-txt="${k}"]'); i.value=${JSON.stringify(v)}; i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await dig('psi-duracao', 'há 2 semanas'); await dig('idade', '34 anos');
await dig('sv.pa', '120x80 mmHg'); await dig('sv.fc', '92 bpm'); await dig('sv.tax', '36,5°C'); await dig('sv.sat', '98%'); await dig('sv.hgt', '98 mg/dL');
t = await txt();
ok('F4: "há 2 semanas" e "34 anos" não duplicam', /Sintomas psicóticos há 2 semanas\./.test(t) && /34 anos\./.test(t) && !/há há|anos anos/.test(t), secao(t, 'HDA') + ' | ' + secao(t, 'IDENTIFICAÇÃO'));
ok('F10: unidade digitada nos sinais vitais não duplica', /PA 120x80 mmHg, FC 92 bpm, Tax 36,5 °C, SatO2 98%, HGT 98 mg\/dL\./.test(t), secao(t, 'EXAME FÍSICO'));
await clica('button[data-tri="alcool"][data-v="sim"]');
ok('D3: álcool ✓ sem detalhe → quantidade e último uso no Não avaliado', /Não avaliado:[^\n]*quantidade e último uso de álcool/.test(secao(await txt(), 'SUBSTÂNCIAS')), secao(await txt(), 'SUBSTÂNCIAS'));
await dig('alcool.d', "gasta R$$ 50 por dia, $' e $&");
ok('F9: "$$", "$\'" e "$&" digitados saem literais', secao(await txt(), 'SUBSTÂNCIAS').includes("Uso de álcool (gasta R$$ 50 por dia, $' e $&)."), secao(await txt(), 'SUBSTÂNCIAS'));
// M17: escolha de quadro não tocada entra no Não avaliado
await vai(); await marcaQ('agitacao'); await marcaQ('delirium'); await marcaQ('substancias');
await clica('button[data-tri="del-focal"][data-v="nao"]'); await clica('button[data-tri="del-agudo"][data-v="nao"]');
t = await txt();
ok('M17: pupilas, toxidrome e causa orgânica não tocadas entram no Não avaliado', /Não avaliado:[^\n]*pupilas/.test(secao(t, 'EXAME FÍSICO')) && /Não avaliado:[^\n]*toxidrome/.test(secao(t, 'EXAME FÍSICO')) && /Não avaliado:[^\n]*causa orgânica suspeita/.test(secao(t, 'HDA')), secao(t, 'EXAME FÍSICO'));
// F1: psicose sem antipsicótico + SNM ✗ não afirma uso
await vai(); await marcaQ('psicose');
await clica('button[data-esc="psi-adesao"][data-v="sem"]'); await clica('button[data-tri="psi-snm"][data-v="nao"]');
ok('F1: "sem uso de antipsicótico" + SNM ✗ não diz "em uso de antipsicótico"', /Sem uso de antipsicótico/.test(await txt()) && !/(^|[^e] )em uso de antipsicótico/.test((await txt()).replace(/se em uso de/g, '')), secao(await txt(), 'EXAME FÍSICO'));
// F4: déficit focal no exame da psicose; história separa visual e idade
ok('F4: Psicose mostra sinal focal no EF e visual/idade separados na HDA', await ev(`!!document.querySelector('#s-ef [data-bloco="del-focal"]') && !!document.querySelector('#s-hda [data-bloco="psi-visual"]') && !!document.querySelector('#s-hda [data-bloco="psi-40"]') && !document.querySelector('[data-bloco="psi-organico"]')`));

/* ================= Nova admissão, beforeunload, Copiar ================= */
await vai('#exemplo');
const bu = () => ev(`(()=>{const e=new Event('beforeunload',{cancelable:true}); window.dispatchEvent(e); return e.defaultPrevented;})()`);
ok('beforeunload: ficha preenchida → avisa', await bu() === true);
await ev('window.confirm=()=>true; window.scrollTo(0, 800)');
await clica('#bt-limpar-m');
const lim = await ev(`({didat:document.getElementById('saida').textContent.includes('MODELO DIDÁTICO'), faixa:document.querySelector('.didatico').classList.contains('hide'),
  pres:document.querySelectorAll('[aria-pressed="true"]').length, vals:[...document.querySelectorAll('input,textarea')].filter(e=>e.value).length, y:scrollY})`);
t = await txt();
const secs = t.split('\n\n').slice(1).map(b => b.split('\n'));
ok('Nova admissão: sem "MODELO DIDÁTICO", faixa escondida, nada pressionado, campos vazios, topo', !lim.didat && lim.faixa && lim.pres === 0 && lim.vals === 0 && lim.y === 0, JSON.stringify(lim));
ok('Nova admissão: toda seção volta ao vazio', secs.every(b => b.length === 2 && /^(Não avaliado nesta consulta|Não definid[ao] nesta consulta)\.$/.test(b[1])), JSON.stringify(secs.filter(b => b.length !== 2).slice(0, 2)));
ok('beforeunload: ficha vazia → não avisa', await bu() === false);
// Copiar: o que vai para a área de transferência é o texto da tela; duplo toque não prende "Copiado"
await vai('#exemplo');
await ev(`window.__copiado=[]; navigator.clipboard.writeText=t=>{window.__copiado.push(t); return Promise.resolve();}`);
await clica('#bt-copiar-m'); await espera(300); await clica('#bt-copiar-m');
ok('Copiar: copia exatamente o texto gerado', await ev(`window.__copiado.length===2 && window.__copiado[0]===document.getElementById('saida').textContent && window.__copiado[0].length>500`));
await espera(2600);
ok('Copiar: duplo toque → rótulo volta a "Copiar"', await ev(`document.getElementById('bt-copiar-m').textContent`) === 'Copiar');
await ev(`navigator.clipboard.writeText=()=>Promise.reject(new Error('x')); document.execCommand=()=>false; getSelection().removeAllRanges()`);
await clica('#bt-copiar-m'); await espera(200);
ok('Copiar: falha → avisa e deixa o texto selecionado', await ev(`document.getElementById('bt-copiar-m').textContent==='Não consegui copiar' && getSelection().toString().length>500`));
await espera(2600);
ok('Copiar: depois da falha o rótulo volta a "Copiar"', await ev(`document.getElementById('bt-copiar-m').textContent`) === 'Copiar');

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
// M4: em 360 e 375, o ✗/✓ fica na linha do rótulo
for (const w of [360, 375]) {
  await tela(w, 667, true, 2);
  await vai(); await marcaQ('depressao'); await marcaQ('suicidio');
  const q = await ev(`(()=>{const ls=[...document.querySelectorAll('.linha.lt')]; return {n:ls.length, quebra:ls.filter(l=>l.querySelector('.tri').getBoundingClientRect().top>=l.querySelector('.lrot').getBoundingClientRect().bottom-1).map(l=>l.querySelector('.lrot').textContent.slice(0,25))};})()`);
  ok(`M4: ${w}px: nenhuma linha ✗/✓ quebra`, q.n > 30 && q.quebra.length === 0, q.n + ' linhas; ' + q.quebra.join(', '));
}
// M5: campo focado não fica debaixo da barra nem do cabeçalho
await tela(375, 667, true, 2);
await vai(); await marcaQ('depressao'); await escolhe('sertralina');
const foco = await ev(`(()=>{const i=document.querySelector('input[data-presc="racional"]'), bar=document.querySelector('.barra').getBoundingClientRect().top, hd=document.querySelector('header').getBoundingClientRect().bottom;
  scrollBy(0, i.getBoundingClientRect().top-(innerHeight-40)); i.blur(); i.focus(); const a=i.getBoundingClientRect();
  scrollBy(0, i.getBoundingClientRect().top-30); i.blur(); document.activeElement.blur(); i.focus(); const b=i.getBoundingClientRect();
  return {ok1:a.bottom<=bar+1, ok2:b.top>=hd-1, a:[a.top,a.bottom,bar], b:[b.top,b.bottom,hd]};})()`);
ok('M5: foco num campo sob a barra rola até ele', foco.ok1, JSON.stringify(foco.a));
ok('M5: foco num campo sob o cabeçalho rola até ele', foco.ok2, JSON.stringify(foco.b));
// M1: tocar num chip no meio da tela deixa o campo Dose à vista
await ev(`(()=>{const c=document.querySelectorAll('.chip')[0]; scrollBy(0, c.getBoundingClientRect().top-300);})()`);
await clica('button[data-chip="0"]');
const dv = await ev(`(()=>{const i=document.querySelector('input[data-presc="dose"]').getBoundingClientRect(), bar=document.querySelector('.barra').getBoundingClientRect().top, hd=document.querySelector('header').getBoundingClientRect().bottom; return {v:i.top>=hd-1 && i.bottom<=bar+1, r:[i.top,i.bottom,hd,bar]};})()`);
ok('M1: depois do toque no chip, o campo Dose fica visível (nem sob o cabeçalho nem sob a barra)', dv.v, JSON.stringify(dv.r));
// M2: "Não perder" recolhido continua recolhido; o atalho do EF não faz a página pular
await vai(); await marcaQ('depressao'); await marcaQ('suicidio');
await ev(`document.querySelectorAll('#s-quadros details.rf').forEach(d=>d.open=false)`); await espera(100);
await marcaQ('ansiedade');
ok('M2: marcar outro quadro não reabre o "Não perder" recolhido', await ev(`[...document.querySelectorAll('#s-quadros details.rf')].map(d=>d.open).join()`) === 'false,false,true');
await ev(`document.querySelectorAll('#s-quadros details.rf').forEach(d=>d.open=false)`); await espera(100);
const pulo = await ev(`(()=>{const b=document.querySelector('button[data-atalho="ef"]'); scrollBy(0, b.getBoundingClientRect().top-311); const t0=b.getBoundingClientRect().top; b.click();
  const b2=document.querySelector('button[data-atalho="ef"]'); return [t0, b2.getBoundingClientRect().top];})()`);
ok('M2: atalho do EF não move a página', Math.abs(pulo[0] - pulo[1]) < 2, JSON.stringify(pulo));
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
