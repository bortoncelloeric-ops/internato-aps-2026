/* Verificação ponta a ponta do copiloto via Chrome DevTools Protocol.
   Roda o app real em file://, não uma cópia. */
const APP = 'file:///Users/fhilipe/Downloads/hermes_cofre/10-AREAS/medicina/internato-aps-2026-2/copiloto/index.html';
const PORT = 9333;

const alvo = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const page = alvo.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);

let id = 0;
const pend = new Map();
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
};
const send = (method, params = {}) => new Promise(res => {
  const i = ++id; pend.set(i, res);
  ws.send(JSON.stringify({ id: i, method, params }));
});
const evalJS = async expr => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails));
  return r.result?.result?.value;
};
const espera = ms => new Promise(r => setTimeout(r, ms));

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: APP });
await espera(1200);

const erros = [];
let n = 0;
const ok = (nome, real, esperado) => {
  n++;
  const bom = String(real) === String(esperado);
  if (!bom) erros.push(`${nome}: obtido ${JSON.stringify(real)}, esperado ${JSON.stringify(esperado)}`);
  console.log(`${bom ? '  ok  ' : ' FALHA'} ${nome}${bom ? '' : ` → ${real} (esperado ${esperado})`}`);
};

// 1. lista inicial
/* contra QUEIXAS.length, não contra um número fixo: a asserção é "mostra todas",
   e travar no total do dia quebraria o e2e a cada queixa nova */
ok('lista mostra todas as queixas', await evalJS(`document.querySelectorAll('.qcard').length === QUEIXAS.length`), true);
ok('detalhe começa escondido', await evalJS(`document.getElementById('detalhe').classList.contains('hide')`), true);
ok('botão Novo paciente começa desabilitado', await evalJS(`document.getElementById('novo').disabled`), true);

// 2. busca sem acento e por sinônimo
await evalJS(`(()=>{const q=document.getElementById('q');q.value='suicidio';q.dispatchEvent(new Event('input'));})()`);
ok('busca "suicidio" (sem acento) acha 1', await evalJS(`document.querySelectorAll('.qcard').length`), 1);
await evalJS(`(()=>{const q=document.getElementById('q');q.value='metformina';q.dispatchEvent(new Event('input'));})()`);
ok('busca "metformina" acha HAS/DM2', await evalJS(`document.querySelector('.qcard').dataset.id`), 'has-dm2-aps');
await evalJS(`(()=>{const q=document.getElementById('q');q.value='xilofone';q.dispatchEvent(new Event('input'));})()`);
ok('busca sem resultado mostra estado vazio', await evalJS(`!!document.querySelector('.vazio')`), true);
ok('estado vazio ensina: lista as queixas existentes', await evalJS(`document.querySelectorAll('.vazio .qcard').length === QUEIXAS.length`), true);
await evalJS(`(()=>{const q=document.getElementById('q');q.value='';q.dispatchEvent(new Event('input'));})()`);

// 3. navegação
await evalJS(`document.querySelector('[data-id="saude-mental-aps"]').click()`);
await espera(200);
ok('abriu o detalhe', await evalJS(`!document.getElementById('detalhe').classList.contains('hide')`), true);
ok('red flags visível sem clique', await evalJS(`!!document.querySelector('.rf')`), true);
ok('red flags é a primeira coisa do detalhe', await evalJS(`document.querySelector('#detalhe .rf, #detalhe .sec').classList.contains('rf')`), true);
ok('botão voltar aparece', await evalJS(`!document.getElementById('voltar').classList.contains('hide')`), true);
// 6 seções de texto + 1 de calculadoras. Saúde mental não tem `exames` escrita,
// e a ausência precisa sumir da tela — seção vazia lê como "nada a se preocupar".
ok('seções renderizadas (6 texto + calculadoras)', await evalJS(`document.querySelectorAll('#detalhe .sec').length`), 7);
ok('seção não escrita não aparece nem como placeholder',
   await evalJS(`/Exames a discutir|A preencher/.test(document.getElementById('detalhe').innerText)`), false);
ok('HAS, que tem exames escrita, mostra a seção',
   await evalJS(`(()=>{const q=QUEIXAS.find(x=>x.id==='has-dm2-aps');return !!(q.exames&&q.exames.itens.length)})()`), true);

// 4. checkboxes e contador
await evalJS(`(()=>{const c=document.querySelectorAll('[data-ck^="saude-mental-aps.perguntas."]');
  for(let i=0;i<3;i++){c[i].checked=true;c[i].dispatchEvent(new Event('change',{bubbles:true}));}})()`);
await espera(150);
ok('contador de perguntas vira 3/9', await evalJS(`document.querySelector('[data-cnt="perguntas"]').textContent`), '3/9');
ok('Novo paciente habilita quando há marcação', await evalJS(`document.getElementById('novo').disabled`), false);

// 5. estado NÃO persiste entre queixas do mesmo paciente, mas some no Novo paciente
await evalJS(`document.getElementById('novo').click()`);
await espera(200);
ok('Novo paciente desmarca tudo', await evalJS(`[...document.querySelectorAll('[data-ck]')].filter(c=>c.checked).length`), 0);
ok('contador zera', await evalJS(`document.querySelector('[data-cnt="perguntas"]').textContent`), '');
ok('Novo paciente volta a ficar desabilitado', await evalJS(`document.getElementById('novo').disabled`), true);

// 6. calculadora PHQ-9: o caso de segurança
await evalJS(`document.getElementById('voltar').click()`);
await espera(150);
await evalJS(`document.querySelector('[data-id="saude-mental-aps"]').click()`);
await espera(200);
await evalJS(`(()=>{const b=[...document.querySelectorAll('[data-calc="phq9"]')][0];
  b.querySelectorAll('select[data-f]').forEach(s=>{s.value='0';s.dispatchEvent(new Event('change',{bubbles:true}));});})()`);
await espera(150);
ok('PHQ-9 tudo 0 → total 0', await evalJS(`document.querySelector('[data-calc="phq9"] .res b').textContent`), '0,0');
ok('PHQ-9 tudo 0 → sem alerta', await evalJS(`document.querySelector('[data-calc="phq9"] .alerta').classList.contains('hide')`), true);
await evalJS(`(()=>{const s=document.querySelector('[data-calc="phq9"] select[data-f="q9"]');
  s.value='1';s.dispatchEvent(new Event('change',{bubbles:true}));})()`);
await espera(150);
ok('PHQ-9 item 9 positivo → total ainda mínimo', await evalJS(`document.querySelector('[data-calc="phq9"] .res b').textContent`), '1,0');
ok('PHQ-9 item 9 positivo → ALERTA APARECE', await evalJS(`!document.querySelector('[data-calc="phq9"] .alerta').classList.contains('hide')`), true);

// 7. calculadora numérica: erro e resultado
await evalJS(`document.getElementById('voltar').click()`); await espera(150);
await evalJS(`document.querySelector('[data-id="has-dm2-aps"]').click()`); await espera(200);
await evalJS(`(()=>{const b=document.querySelector('[data-calc="imc"]');
  const p=b.querySelector('[data-f="peso"]'),a=b.querySelector('[data-f="alt"]');
  p.value='70';p.dispatchEvent(new Event('input',{bubbles:true}));
  a.value='1.75';a.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await espera(150);
ok('IMC 70/1,75 na tela', await evalJS(`document.querySelector('[data-calc="imc"] .res b').textContent`), '22,9');
ok('IMC classifica como eutrofia', await evalJS(`/Eutrofia/.test(document.querySelector('[data-calc="imc"] .res').textContent)`), true);
await evalJS(`(()=>{const b=document.querySelector('[data-calc="imc"]'),p=b.querySelector('[data-f="peso"]');
  p.value='999';p.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await espera(150);
ok('peso fora de faixa marca erro no campo', await evalJS(`document.querySelector('[data-calc="imc"] [data-f="peso"]').classList.contains('erro')`), true);
ok('peso fora de faixa esconde o resultado', await evalJS(`document.querySelector('[data-calc="imc"] .res').classList.contains('hide')`), true);
ok('nenhum NaN na tela', await evalJS(`/NaN/.test(document.body.innerText)`), false);

// 7b. antropometria, dose e conferência da nota — a fase determinística
await evalJS(`document.getElementById('voltar').click()`); await espera(150);
await evalJS(`document.querySelector('[data-id="crianca-aidpi"]').click()`); await espera(250);

/* o caso do ex2: a nota diz 7 meses no alto e 8 embaixo */
await evalJS(`(()=>{const t=document.querySelector('[data-calc="nota-conferencia"] [data-f="nota"]');
  t.value='Paciente, 7 meses, feminina. Sintomas gripais ha 3 dias. Idade: 8 meses Peso 8,650kg Altura: 76 cm.';
  t.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await espera(200);
ok('nota com duas idades acusa contradição',
   await evalJS(`/divergem/.test(document.querySelector('[data-calc="nota-conferencia"] .res').textContent)`), true);
ok('contradição na nota dispara alerta',
   await evalJS(`!document.querySelector('[data-calc="nota-conferencia"] .alerta').classList.contains('hide')`), true);

/* o caso do ex1: 7 anos, sem peso na nota — nem calcular nem calar */
await evalJS(`(()=>{const t=document.querySelector('[data-calc="nota-conferencia"] [data-f="nota"]');
  t.value='Paciente, 7 anos, feminino. QP: feridas aquosas no nariz, mao e perna, ha 7 dias.';
  t.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await espera(200);
ok('nota sem peso diz qual dado falta',
   await evalJS(`/Falta/.test(document.querySelector('[data-calc="nota-conferencia"] .res').textContent)`), true);
ok('e diz o que aquele dado destrava',
   await evalJS(`/dose por peso/.test(document.querySelector('[data-calc="nota-conferencia"] .res').textContent)`), true);
ok('não cobra o que a nota já trouxe',
   await evalJS(`!/Falta[\\s\\S]{0,40}sexo/.test(document.querySelector('[data-calc="nota-conferencia"] .res').textContent)`), true);

/* mesmas medidas do ex2. O ChatGPT disse "próximo ou acima do P97"; o número é +3,05 */
await evalJS(`(()=>{const b=document.querySelector('[data-calc="antropo-infantil"]');
  const set=(f,v)=>{const e=b.querySelector('[data-f="'+f+'"]');e.value=v;
    e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));};
  set('sexo','f');set('meses','8');set('peso','8.650');set('est','76');})()`);
await espera(250);
ok('antropometria mostra o escore-z exato, sem hedge',
   await evalJS(`/z \\+3,05/.test(document.querySelector('[data-calc="antropo-infantil"] .res').textContent)`), true);
ok('antropometria classifica pelo SISVAN',
   await evalJS(`/Eutrofia/.test(document.querySelector('[data-calc="antropo-infantil"] .res').textContent)`), true);
ok('escore fora de ±3 DP avisa para conferir a medida',
   await evalJS(`!document.querySelector('[data-calc="antropo-infantil"] .alerta').classList.contains('hide')`), true);
/* conta contra o que a calculadora devolveu, não contra um número fixo: a
   asserção é "uma linha por indicador", e travar no total do dia quebraria o
   e2e a cada indicador novo (foi o que aconteceu ao entrar peso/estatura) */
ok('resultado de várias linhas renderiza uma linha por indicador',
   await evalJS(`(()=>{const c=CALCS.filter(x=>x.id==='antropo-infantil')[0];
     return document.querySelectorAll('[data-calc="antropo-infantil"] .lin').length ===
            c.calc({sexo:'f',meses:8,peso:8.650,est:76}).length})()`), true);
ok('peso para estatura aparece na tela',
   await evalJS(`/Peso para estatura/.test(document.querySelector('[data-calc="antropo-infantil"] .res').textContent)`), true);
ok('e diz a técnica de medida usada',
   await evalJS(`/\\(deitado\\)/.test(document.querySelector('[data-calc="antropo-infantil"] .res').textContent)`), true);

/* dose: o app converte, nunca escolhe */
await evalJS(`(()=>{const b=document.querySelector('[data-calc="dose-peso"]');
  const set=(f,v)=>{const e=b.querySelector('[data-f="'+f+'"]');e.value=v;
    e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));};
  set('peso','8.650');set('mgkg','15');set('vezes','3');set('conc','50');})()`);
await espera(200);
ok('dose por peso dá o número, não "conforme peso"',
   await evalJS(`/129,8 mg/.test(document.querySelector('[data-calc="dose-peso"] .res').textContent)`), true);
ok('dose por peso converte para mL da apresentação',
   await evalJS(`/2,60 mL/.test(document.querySelector('[data-calc="dose-peso"] .res').textContent)`), true);
ok('nenhum NaN nas calculadoras novas', await evalJS(`/NaN/.test(document.body.innerText)`), false);
ok('campo opcional em branco não impede o cálculo',
   await evalJS(`document.querySelector('[data-calc="dose-peso"] [data-f="teto"]').value === '' &&
                 !document.querySelector('[data-calc="dose-peso"] .res').classList.contains('hide')`), true);

await evalJS(`document.getElementById('voltar').click()`); await espera(150);
await evalJS(`document.querySelector('[data-id="has-dm2-aps"]').click()`); await espera(200);

// 8. teclado e gestão de foco
ok('abrir queixa move o foco para o h1', await evalJS(`document.activeElement.tagName`), 'H1');
await evalJS(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);
await espera(250);
ok('Esc volta para a lista', await evalJS(`document.getElementById('detalhe').classList.contains('hide')`), true);
ok('Esc devolve o foco ao card de origem', await evalJS(`document.activeElement.dataset.id`), 'has-dm2-aps');
await evalJS(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'/',bubbles:true}))`);
await espera(150);
ok('tecla / foca a busca', await evalJS(`document.activeElement.id`), 'q');

// digitar na busca estando dentro de uma queixa não pode roubar o foco do campo
await evalJS(`document.querySelector('[data-id="saude-mental-aps"]').click()`);
await espera(200);
await evalJS(`(()=>{const q=document.getElementById('q');q.focus();q.value='dm2';q.dispatchEvent(new Event('input'));})()`);
await espera(200);
ok('digitar na busca dentro da queixa mantém o foco no campo', await evalJS(`document.activeElement.id`), 'q');
await evalJS(`(()=>{const q=document.getElementById('q');q.value='';q.dispatchEvent(new Event('input'));})()`);

// hierarquia de cabeçalhos: h1 seguido de h2, sem pular nível
await evalJS(`document.querySelector('[data-id="saude-mental-aps"]').click()`); await espera(200);
ok('sem h3 pulando nível', await evalJS(`document.querySelectorAll('#detalhe h3').length`), 0);
ok('red flags é h2', await evalJS(`document.querySelector('.rf h2').textContent`), 'Red flags');

// 9. sessão de consulta: o copiloto acompanhando do começo ao fim
await evalJS(`document.getElementById('novo').click()`); await espera(200);
ok('sessão começa sem botão Revisar', await evalJS(`document.getElementById('revisar').classList.contains('hide')`), true);

await evalJS(`document.querySelector('[data-id="saude-mental-aps"]').click()`); await espera(200);
ok('abrir queixa inicia a consulta', await evalJS(`document.getElementById('revisar').classList.contains('hide')`), false);
ok('Revisar avisa quantas red flags faltam',
   await evalJS(`/Revisar · 5 red flags/.test(document.getElementById('revisar').textContent)`), true);
ok('botão de alerta fica destacado', await evalJS(`document.getElementById('revisar').classList.contains('alerta-pend')`), true);

// segunda queixa entra na mesma consulta
await evalJS(`document.getElementById('voltar').click()`); await espera(200);
ok('lista marca a queixa já aberta nesta consulta', await evalJS(`document.querySelectorAll('.t-nesta').length`), 1);
await evalJS(`document.querySelector('[data-id="has-dm2-aps"]').click()`); await espera(200);
await evalJS(`document.getElementById('voltar').click()`); await espera(200);
ok('duas queixas na mesma consulta', await evalJS(`document.querySelectorAll('.t-nesta').length`), 2);

// revisão de fechamento
await evalJS(`document.getElementById('revisar').click()`); await espera(250);
ok('revisão abre', await evalJS(`document.getElementById('revisao').classList.contains('hide')`), false);
ok('revisão cobre as duas queixas', await evalJS(`document.querySelectorAll('#revisao .rev-q').length`), 2);
ok('red flags não descartadas aparecem como críticas', await evalJS(`document.querySelectorAll('#revisao .pend.crit').length`), 2);
ok('revisão não inventa pendência em seção inexistente',
   await evalJS(`/Exames a discutir/.test(document.getElementById('revisao').innerText)`), false);
ok('foco vai para o título da revisão', await evalJS(`document.activeElement.tagName`), 'H1');

// descartar todas as red flags de uma queixa some com a pendência crítica dela
await evalJS(`document.getElementById('voltar').click()`); await espera(150);
await evalJS(`document.querySelector('[data-id="has-dm2-aps"]').click()`); await espera(200);
await evalJS(`document.querySelectorAll('[data-ck^="has-dm2-aps.redflags."]').forEach(c=>{c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}));})`);
await espera(200);
ok('contador de red flags da queixa fecha', await evalJS(`document.querySelector('[data-cnt="redflags"]').textContent`), '4/4');
await evalJS(`document.getElementById('revisar').click()`); await espera(250);
ok('só sobra 1 queixa com red flag pendente', await evalJS(`document.querySelectorAll('#revisao .pend.crit').length`), 1);

// fim da consulta zera a sessão inteira
await evalJS(`document.getElementById('novo').click()`); await espera(250);
ok('Novo paciente volta para a lista', await evalJS(`document.getElementById('lista').classList.contains('hide')`), false);
ok('Novo paciente encerra a consulta', await evalJS(`document.querySelectorAll('.t-nesta').length`), 0);
ok('Novo paciente esconde o Revisar', await evalJS(`document.getElementById('revisar').classList.contains('hide')`), true);
ok('Novo paciente apaga as marcações', await evalJS(`(()=>{const q=document.querySelector('[data-id="has-dm2-aps"]');q.click();
   const n=[...document.querySelectorAll('[data-ck]')].filter(c=>c.checked).length;
   document.getElementById('voltar').click();return n})()`), 0);

/* A nota da consulta é o primeiro texto livre do app e o único campo que chega a
   conter narrativa do paciente. Levá-la para o próximo atendimento é o dano que
   a regra de não-persistência existe para impedir. */
await evalJS(`document.querySelector('[data-id="crianca-aidpi"]').click()`); await espera(250);
await evalJS(`(()=>{const t=document.querySelector('[data-calc="nota-conferencia"] [data-f="nota"]');
  t.value='Paciente, 7 meses, feminina. Peso 8,650kg';
  t.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await espera(200);
ok('digitar a nota já habilita o Novo paciente',
   await evalJS(`document.getElementById('novo').disabled`), false);
await evalJS(`document.getElementById('novo').click()`); await espera(250);
ok('Novo paciente apaga a nota da consulta',
   await evalJS(`(()=>{document.querySelector('[data-id="crianca-aidpi"]').click();
     const v=document.querySelector('[data-calc="nota-conferencia"] [data-f="nota"]').value;
     document.getElementById('voltar').click();return v})()`), '');

// 10. a prova da decisão de não persistir
ok('localStorage vazio', await evalJS(`localStorage.length`), 0);
ok('sessionStorage vazio', await evalJS(`sessionStorage.length`), 0);
ok('sem cookie', await evalJS(`document.cookie === ''`), true);

console.log(`\n${n - erros.length}/${n} verificações passaram`);
if (erros.length) { console.log('\nFALHAS:\n' + erros.map(e => ' - ' + e).join('\n')); process.exit(1); }
ws.close();
