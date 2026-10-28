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
/* os temas da APS II, com os mesmos códigos do copiloto (cada um vira um grupo que abre no seletor) */
const GRUPOS_A2 = ['A2-Cardiorrenal-Metabolica', 'A2-Digestivo-Nutricional', 'A2-Respiratoria',
  'A2-Neuromusculoesqueletica', 'A2-Demanda-Comum'];

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
  ok(onde + ': grupo ausente, "outros" ou um tema da APS II', q.grupo === undefined || q.grupo === 'outros' || GRUPOS_A2.includes(q.grupo), q.grupo);
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

/* ---------- auditoria APS II (28/10/2026): cada C e I das revisões dos quadros c/d/e, com checagem que falhava
   antes da correção. Origem: copiloto-onda-aps2/relatorios/auditoria-quadros.md ---------- */
{
/* auditoria APS II · prelúdio */
const A2 = q => /^A2-/.test(q.grupo || '');
const qd = id => Q.find(q => q.id === id);
const itens = (qid, s) => (qd(qid)?.blocos?.[s]?.itens || []);
const item = (qid, s, id) => itens(qid, s).find(i => i.id === id);
const acha = (qid, id) => { for (const s of ['anamnese', 'ef', 'conduta']) { const i = item(qid, s, id); if (i) return i; } };
const opt = (it, v) => (it?.opts || []).find(o => o.v === v);
const detOpt = (it, v) => (it?.det?.opts || []).find(o => o.v === v);
const mesmo = (a, b) => !!a && !!b && JSON.stringify(a) === JSON.stringify(b);
const emNenhum = id => !Q.some(q => Object.values(q.blocos).some(b => b.itens.some(i => i.id === id)));
const frasesDe = it => [...(it?.opts || []).map(o => o.frase ?? o.rot), it?.tpl, it?.sim, it?.nao, it?.simSemDet].filter(Boolean).join(' | ');
{
/* auditoria APS II · C1 dos três relatórios: no exame físico, achado que só se procura num subgrupo é `escolha`.
   O atalho "Sem alterações nos achados dos quadros" marca ✗ em todo `tri` do ef; `lacuna:false` (a marca de subgrupo
   dos autores) não protege. Falhava em res-tiragem, iv-otalgia-ref (C), arb-articulacoes (D) e lc-cervical (E). */
for (const q of Q) for (const it of itens(q.id, 'ef'))
  ok('auditoria APS II · quadros ' + q.id + ': nenhum tri de subgrupo (lacuna:false) no exame (' + it.id + ')', !(it.tipo === 'tri' && it.lacuna === false));
}
{
/* auditoria APS II · acréscimo 2: o e2e lê "NÃO AVALIADO: …COMORBIDADES|ALERGIA|ETILISMO|TABAGISMO|ESTADO GERAL" como
   item da ficha base na lacuna. O rótulo da lacuna é `na || rot` (naDe). Falhava em dp-asma ("alergia") e dga-estado. */
{ const BASEW = /COMORBIDADES|ALERGIA|ETILISMO|TABAGISMO|ESTADO GERAL/;
  for (const q of Q) for (const s of Object.keys(q.blocos)) for (const it of q.blocos[s].itens) {
    if (it.tipo === 'rotulo' || it.lacuna === false || !(it.tipo === 'tri' || it.tipo === 'escolha' || it.na)) continue;
    ok('auditoria APS II · quadros ' + q.id + ': "NÃO AVALIADO" não cita item da ficha base (' + it.id + ')', !BASEW.test((it.na || it.rot.toLowerCase()).toUpperCase()));
  } }
}
{
/* auditoria APS II · acréscimo 3: D_PESO perguntava o mesmo que PERDA_PESO (id-peso, idoso): mesma const da APS I */
for (const qid of ['anemia', 'constipacao', 'dispepsia-drge'])
  ok('auditoria APS II · quadros ' + qid + ': perda de peso é o id-peso do idoso (mesmo objeto)', mesmo(acha(qid, 'id-peso'), acha('idoso', 'id-peso')));
ok('auditoria APS II · quadros anemia: dig-peso não existe mais', emNenhum('dig-peso'));
}
{
/* auditoria APS II · C1 (c): tiragem, tragus, mastoide, otalgia referida e seios da face são `escolha` */
for (const id of ['res-tiragem', 'iv-tragus', 'iv-mastoide', 'iv-otalgia-ref', 'iv-seios'])
  ok('auditoria APS II · quadros ivas: C1 ' + id + ' é escolha (fora do atalho ✗)', item('ivas', 'ef', id)?.tipo === 'escolha');
ok('auditoria APS II · quadros pneumonia: C1 res-tiragem é escolha', item('pneumonia', 'ef', 'res-tiragem')?.tipo === 'escolha');
ok('auditoria APS II · quadros ivas: C1 iv-otoscopia não entra na lacuna sem queixa de ouvido', item('ivas', 'ef', 'iv-otoscopia')?.lacuna === false);
}
{
/* auditoria APS II · I1 (c): dislipidemia pergunta gestação e hepatopatia */
ok('auditoria APS II · quadros dislipidemia: I1 pergunta gravidez (sm-gravidez da APS I)', mesmo(item('dislipidemia', 'anamnese', 'sm-gravidez'), acha('saude-mental', 'sm-gravidez')));
ok('auditoria APS II · quadros dislipidemia: I1 pergunta icterícia e hepatopatia', !!item('dislipidemia', 'anamnese', 'dl-hepato'));
}
{
/* auditoria APS II · I2 (c): DRC pergunta angioedema com IECA */
ok('auditoria APS II · quadros drc: I2 pergunta angioedema', item('drc', 'anamnese', 'drc-angioedema')?.lacuna === false);
}
{
/* auditoria APS II · I3 (c): IC pergunta síncope, intoxicação digitálica e angioedema */
for (const id of ['ic-sincope', 'ic-digoxina', 'ic-angioedema'])
  ok('auditoria APS II · quadros ic: I3 pergunta ' + id, !!item('ic', 'anamnese', id));
}
{
/* auditoria APS II · I4 (c): obesidade pergunta ideação suicida (cópia literal do saude-mental), diabetes descompensado e causa hipotalâmica */
ok('auditoria APS II · quadros obesidade: I4 sm-ideacao é o mesmo objeto do saude-mental', mesmo(item('obesidade', 'anamnese', 'sm-ideacao'), acha('saude-mental', 'sm-ideacao')));
ok('auditoria APS II · quadros obesidade: I4 pergunta poliúria, polidipsia e perda de peso', !!item('obesidade', 'anamnese', 'ob-poliuria'));
ok('auditoria APS II · quadros obesidade: I4 pergunta sintomas neurológicos (hipotalâmica)', !!item('obesidade', 'anamnese', 'ob-hipotalamica'));
}
{
/* auditoria APS II · I5 (c): asma pergunta anafilaxia/alergia alimentar e asma lábil (e o `na` não diz "alergia") */
ok('auditoria APS II · quadros asma: I5 pergunta anafilaxia e alergia alimentar', !!item('asma', 'anamnese', 'as-fatal') && !/alergia/i.test(item('asma', 'anamnese', 'as-fatal').na));
ok('auditoria APS II · quadros asma: I5 pergunta asma lábil', !!item('asma', 'anamnese', 'as-labil'));
}
{
/* auditoria APS II · I6 (c): DPOC exclui TB na anamnese e procura câncer no exame */
ok('auditoria APS II · quadros dpoc: I6 pergunta expectoração, hemoptise, febre e suor noturno', !!item('dpoc', 'anamnese', 'dp-alarme'));
ok('auditoria APS II · quadros dpoc: I6 procura linfonodo, derrame e baqueteamento no exame', !!item('dpoc', 'ef', 'dp-cancer'));
}
{
/* auditoria APS II · I7 (c): IVAS pergunta trismo/voz abafada e a complicação inclui paralisia facial */
ok('auditoria APS II · quadros ivas: I7 pergunta trismo e voz abafada', item('ivas', 'anamnese', 'iv-trismo')?.lacuna === false);
ok('auditoria APS II · quadros ivas: I7 complicação inclui paralisia facial', !!detOpt(item('ivas', 'anamnese', 'iv-complicacao'), 'facial') && /paralisia facial/.test(item('ivas', 'anamnese', 'iv-complicacao')?.nao || ''));
}
{
/* auditoria APS II · I8 (c): tosse crônica pergunta sintomas de TB/câncer e disfagia/rouquidão */
ok('auditoria APS II · quadros tosse-cronica: I8 pergunta sintomas constitucionais e hemoptise', !!item('tosse-cronica', 'anamnese', 'tc-constitucionais'));
ok('auditoria APS II · quadros tosse-cronica: I8 pergunta disfagia e rouquidão persistente', !!item('tosse-cronica', 'anamnese', 'tc-disfagia'));
}
{
/* auditoria APS II · I9 (c): pergunta que já existe no has-dm usa o id e o objeto de lá (a página deduplica por id) */
ok('auditoria APS II · quadros dislipidemia: I9 contracepção é o hd-fertil do has-dm', mesmo(item('dislipidemia', 'anamnese', 'hd-fertil'), acha('has-dm', 'hd-fertil')));
ok('auditoria APS II · quadros dislipidemia: I9 risco HEARTS é o hd-rcv do has-dm', mesmo(item('dislipidemia', 'conduta', 'hd-rcv'), acha('has-dm', 'hd-rcv')));
ok('auditoria APS II · quadros dislipidemia: I9 sopro carotídeo é o hd-carotida do has-dm', mesmo(item('dislipidemia', 'ef', 'hd-carotida'), acha('has-dm', 'hd-carotida')));
for (const qid of ['drc', 'ic']) ok('auditoria APS II · quadros ' + qid + ': I9 usa hd-fertil', !!item(qid, 'anamnese', 'hd-fertil'));
for (const id of ['car-fertil', 'car-rcv', 'dl-carotida']) ok('auditoria APS II · quadros dislipidemia: I9 ' + id + ' não existe mais', emNenhum(id));
}
{
/* auditoria APS II · I10 (c): FR da criança e betabloqueador são um objeto só (não saem duas vezes com dois quadros marcados) */
ok('auditoria APS II · quadros ivas: I10 FR da criança compartilhada com pneumonia', mesmo(acha('ivas', 'res-fr-crianca'), acha('pneumonia', 'res-fr-crianca')));
ok('auditoria APS II · quadros asma: I10 betabloqueador compartilhado com tosse-cronica', mesmo(item('asma', 'anamnese', 'res-betabloq'), item('tosse-cronica', 'anamnese', 'res-betabloq')));
ok('auditoria APS II · quadros asma: I10 anti-inflamatório virou pergunta própria', !!item('asma', 'anamnese', 'as-aine'));
for (const id of ['iv-fr-crianca', 'pc-fr-crianca', 'tc-betabloqueador', 'as-medicacao']) ok('auditoria APS II · quadros ivas: I10 ' + id + ' não existe mais', emNenhum(id));
}
{
/* auditoria APS II · I11 (c): a conduta não escreve prescrição (fármaco e duração ficam no rot e no "Prescrevo:") */
{ const FARMACO = /oseltamivir|benzatina|antibiótico|analgésico|formoterol|budesonida|beclometasona|salbutamol/i;
  for (const [qid, id] of [['ivas', 'iv-c-gripe'], ['ivas', 'iv-c-garganta'], ['ivas', 'iv-c-crianca-ouvido'], ['ivas', 'iv-c-crianca-garganta'], ['pneumonia', 'pc-c-crianca'], ['asma', 'as-c-regime']])
    ok('auditoria APS II · quadros ' + qid + ': I11 ' + id + ' existe e a frase não prescreve', !!item(qid, 'conduta', id) && !FARMACO.test(frasesDe(item(qid, 'conduta', id))));
  ok('auditoria APS II · quadros ivas: I11 iv-c-crianca (ouvido e garganta juntos) não existe mais', emNenhum('iv-c-crianca')); }
}
{
/* auditoria APS II · I12 (c): o `fonte` do quadro lista as fontes dos itens */
ok('auditoria APS II · quadros dislipidemia: I12 fonte cita o PCDT de HAS 2025 (HEARTS, indicação de estatina)', /PCDT Hipertensão Arterial Sistêmica/.test(qd('dislipidemia')?.fonte));
ok('auditoria APS II · quadros drc: I12 fonte cita Nefrologia adulto 2023, PCDT HAS 2025 e PCDT DM2 2026', ['Nefrologia adulto, 2023', 'PCDT Hipertensão Arterial Sistêmica', 'Diabete Melito Tipo 2'].every(s => (qd('drc')?.fonte || '').includes(s)));
ok('auditoria APS II · quadros obesidade: I12 fonte cita o PCDT de HAS 2025 (HEARTS)', /PCDT Hipertensão Arterial Sistêmica/.test(qd('obesidade')?.fonte));
}
{
/* auditoria APS II · I13 (c): o local do tratamento da pneumonia traz a ressalva da SBPT sobre CRB-65 = 1 */
ok('auditoria APS II · quadros pneumonia: I13 rot de pc-c-local traz a ressalva da SBPT 2018', /SBPT 2018/.test(item('pneumonia', 'conduta', 'pc-c-local')?.rot || ''));
}
{
/* auditoria APS II · C1 (d): articulações (só na chikungunya) é `escolha` */
ok('auditoria APS II · quadros arboviroses: C1 arb-articulacoes é escolha (fora do atalho ✗)', item('arboviroses', 'ef', 'arb-articulacoes')?.tipo === 'escolha');
}
{
/* auditoria APS II · I1 (d): anemia pergunta dispneia (anemia sintomática) */
ok('auditoria APS II · quadros anemia: I1 pergunta dispneia', !!item('anemia', 'anamnese', 'anm-dispneia'));
}
{
/* auditoria APS II · I2 (d): o ✗ da fibra/água não é dupla negativa */
ok('auditoria APS II · quadros constipacao: I2 ✗ de cst-fibra é frase de prontuário', item('constipacao', 'anamnese', 'cst-fibra')?.nao === 'refere ingesta adequada de fibra e água');
}
{
/* auditoria APS II · I3 (d): obstrução intestinal tem pergunta, saída e fonte */
ok('auditoria APS II · quadros constipacao: I3 pergunta parada de gases e fezes', !!item('constipacao', 'anamnese', 'cst-obstrucao'));
ok('auditoria APS II · quadros constipacao: I3 tem saída para o pronto-socorro', !!item('constipacao', 'conduta', 'cst-urgencia'));
ok('auditoria APS II · quadros constipacao: I3 fonte cita o CAB nº 28', /CAB nº 28/.test(qd('constipacao')?.fonte));
}
{
/* auditoria APS II · I4 (d): o ✗ de "sinal de alarme" lista só o que o quadro pergunta (sem a anemia) e o ✓ pede qual */
for (const [qid, id, ini] of [['constipacao', 'cst-alarme', 'sem sangue nas fezes'], ['dispepsia-drge', 'dsp-alarme', 'sem perda de peso']]) {
  const it = acha(qid, id);
  ok('auditoria APS II · quadros ' + qid + ': I4 ✗ de ' + id + ' diz só o que se perguntou', !!it && it.nao.startsWith(ini) && !/anemia/.test(it.nao) && !!it.det);
}
}
{
/* auditoria APS II · I5 (d): diarreia aguda pergunta dor forte, tenesmo e hematêmese */
ok('auditoria APS II · quadros diarreia-aguda: I5 pergunta dor abdominal forte, tenesmo e vômito com sangue', !!detOpt(item('diarreia-aguda', 'anamnese', 'dga-dor'), 'hematemese'));
}
{
/* auditoria APS II · I6 (d): a classificação no plano C não registra ato não feito; os atos são escolha à parte */
ok('auditoria APS II · quadros diarreia-aguda: I6 plano C não afirma SAMU nem observação', !/SAMU|observação/i.test(opt(item('diarreia-aguda', 'conduta', 'dga-plano'), 'c')?.frase || 'SAMU'));
ok('auditoria APS II · quadros diarreia-aguda: I6 atos do plano C em item próprio', !!opt(item('diarreia-aguda', 'conduta', 'dga-acoes-c'), 'samu'));
}
{
/* auditoria APS II · I7 (d): dispepsia pergunta hematêmese e há quanto tempo */
ok('auditoria APS II · quadros dispepsia-drge: I7 vômitos inclui hematêmese', !!detOpt(item('dispepsia-drge', 'anamnese', 'dsp-vomitos'), 'sangue'));
ok('auditoria APS II · quadros dispepsia-drge: I7 pergunta há quanto tempo', !!item('dispepsia-drge', 'anamnese', 'dsp-tempo'));
}
{
/* auditoria APS II · I8 (d): a frase da DRGE não leva o parêntese de protocolo */
ok('auditoria APS II · quadros dispepsia-drge: I8 DRGE sem "ou gastroenterologia se…"', !/gastroenterologia/.test(opt(acha('dispepsia-drge', 'dsp-estrategia'), 'drge')?.frase || 'gastroenterologia'));
}
{
/* auditoria APS II · I9 (d): hepatites pergunta quimioterapia/imunossupressão, tratamento prévio e gestação */
ok('auditoria APS II · quadros hepatites-esteatose: I9 pergunta quimioterapia, imunossupressão, transplante e neoplasia', item('hepatites-esteatose', 'anamnese', 'hep-quimio')?.lacuna === false);
ok('auditoria APS II · quadros hepatites-esteatose: I9 pergunta tratamento prévio de hepatite C', item('hepatites-esteatose', 'anamnese', 'hep-tratou-c')?.lacuna === false);
ok('auditoria APS II · quadros hepatites-esteatose: I9 pergunta gravidez (sm-gravidez da APS I)', mesmo(item('hepatites-esteatose', 'anamnese', 'sm-gravidez'), acha('saude-mental', 'sm-gravidez')));
}
{
/* auditoria APS II · I10 (d): vulnerabilidade não repete o etilismo da base e o ✗ é "nega …" */
{ const it = item('hepatites-esteatose', 'anamnese', 'hep-vulneravel');
  ok('auditoria APS II · quadros hepatites-esteatose: I10 ✗ de hep-vulneravel nega o que se perguntou, sem álcool', !!it && it.nao.startsWith('nega') && !/álcool/.test(it.nao)); }
}
{
/* auditoria APS II · I11 (d): parasitoses perguntam cólica, vômitos, febre e fraqueza de pernas */
ok('auditoria APS II · quadros parasitoses-intestinais: I11 sintomas incluem cólica e vômitos', !!detOpt(item('parasitoses-intestinais', 'anamnese', 'par-sintomas'), 'colica') && !!detOpt(item('parasitoses-intestinais', 'anamnese', 'par-sintomas'), 'vomitos'));
ok('auditoria APS II · quadros parasitoses-intestinais: I11 pergunta febre', !!item('parasitoses-intestinais', 'anamnese', 'par-febre'));
ok('auditoria APS II · quadros parasitoses-intestinais: I11 pergunta fraqueza ou paralisia de pernas', !!item('parasitoses-intestinais', 'anamnese', 'par-fraqueza'));
}
{
/* auditoria APS II · I12 (d): tireoide pergunta sintomas oculares e encaminha à oftalmologia, ao pré-natal de alto risco e por hipotireoidismo central */
ok('auditoria APS II · quadros tireoide: I12 pergunta diplopia, baixa da visão e dor retro-ocular', !!item('tireoide', 'anamnese', 'tir-visao'));
for (const v of ['oftalmo', 'prenatal-ar', 'central']) ok('auditoria APS II · quadros tireoide: I12 encaminhamento ' + v, !!opt(acha('tireoide', 'tir-encaminha'), v));
}
{
/* auditoria APS II · I13 (d): o ✓ do Zika diz qual (febre baixa ou ausência de febre), não "refere febre baixa ou ausente" */
{ const it = item('arboviroses', 'anamnese', 'arb-zika');
  ok('auditoria APS II · quadros arboviroses: I13 Zika separa febre baixa de ausência de febre', !!detOpt(it, 'afebril') && !/febre baixa ou ausente/.test(frasesDe(it) + (it?.det?.opts || []).map(o => o.frase ?? o.rot).join(' '))); }
}
{
/* auditoria APS II · I14 (d): as frases do grupo da dengue não copiam critérios nem prometem 48 horas ou UTI */
{ const it = item('arboviroses', 'conduta', 'arb-grupo');
  ok('auditoria APS II · quadros arboviroses: I14 grupo A não afirma quatro negativas', !/sem sinal de alarme/i.test(opt(it, 'a')?.frase || 'sem sinal de alarme'));
  ok('auditoria APS II · quadros arboviroses: I14 grupos C e D não decidem pelo hospital (48 horas, UTI)', !/48 horas|UTI/.test((opt(it, 'c')?.frase || 'UTI') + (opt(it, 'd')?.frase || 'UTI'))); }
}
{
/* auditoria APS II · I15 (d): a orientação não nomeia fármaco e inclui sinais de alarme e retorno imediato */
{ const it = item('arboviroses', 'conduta', 'arb-orienta');
  ok('auditoria APS II · quadros arboviroses: I15 analgésico sem dipirona na frase', !/dipirona|paracetamol/i.test(opt(it, 'analgesico')?.frase || 'dipirona'));
  ok('auditoria APS II · quadros arboviroses: I15 orienta sinais de alarme com retorno imediato', !!opt(it, 'alarme') && !!opt(it, 'neuro')); }
}
{
/* auditoria APS II · I16 (d): dermatoses têm saída de urgência */
ok('auditoria APS II · quadros dermatoses-comuns: I16 tem saída para emergência e hospital', !!opt(item('dermatoses-comuns', 'conduta', 'der-urgencia'), 'emergencia'));
}
{
/* auditoria APS II · I17 (d): classificação da ITU sem protocolo condicional */
{ const it = item('itu-cistite', 'conduta', 'itu-classe');
  ok('auditoria APS II · quadros itu-cistite: I17 frases sem "se em casa" e "ou sem melhora"', !!it && !/se em casa|sem melhora/i.test(frasesDe(it))); }
}
{
/* auditoria APS II · I18 (d): gestante com ITU sai em frase de prontuário */
ok('auditoria APS II · quadros itu-cistite: I18 gestante: urocultura antes do antibiótico…', (opt(item('itu-cistite', 'conduta', 'itu-gestante'), 'tratar')?.frase || '').startsWith('gestante: urocultura antes do antibiótico'));
}
{
/* auditoria APS II · I19 (d): imunossupressão entre os fatores de ITU complicada */
ok('auditoria APS II · quadros itu-cistite: I19 fator de ITU complicada inclui imunossupressão', !!detOpt(item('itu-cistite', 'anamnese', 'itu-complicada'), 'imuno'));
}
{
/* auditoria APS II · C1 (e): mielopatia cervical (só na cervicalgia ou no déficit) é `escolha` */
ok('auditoria APS II · quadros lombalgia: C1 lc-cervical é escolha (fora do atalho ✗)', item('lombalgia', 'ef', 'lc-cervical')?.tipo === 'escolha');
}
{
/* auditoria APS II · I1 (e): cefaleia pergunta "sempre do mesmo lado", "só occipital" e a dor postural */
ok('auditoria APS II · quadros cefaleia: I1 ce-dor tem "sempre do mesmo lado" e "só occipital"', !!opt(acha('cefaleia', 'ce-dor'), 'mesmolado') && !!opt(acha('cefaleia', 'ce-dor'), 'occipital'));
ok('auditoria APS II · quadros cefaleia: I1 ce-esforco pergunta a mudança com a posição', !!detOpt(acha('cefaleia', 'ce-esforco'), 'posicao'));
}
{
/* auditoria APS II · I2 (e): cefaleia e dor crônica perguntam gravidez (sm-gravidez da APS I) */
for (const qid of ['cefaleia', 'dor-cronica'])
  ok('auditoria APS II · quadros ' + qid + ': I2 pergunta gravidez (sm-gravidez da APS I)', mesmo(item(qid, 'anamnese', 'sm-gravidez'), acha('saude-mental', 'sm-gravidez')));
}
{
/* auditoria APS II · I3 (e): "neuropática" só com exame neurológico, e o item não vira lacuna em toda consulta */
{ const it = acha('dor-cronica', 'df-classe');
  ok('auditoria APS II · quadros dor-cronica: I3 df-classe exige exame neurológico e tem lacuna:false', it?.lacuna === false && /exame neurológico/.test(opt(it, 'neuropatica')?.frase || '')); }
}
{
/* auditoria APS II · I4 (e): exames da dor crônica, um por exame da fonte (sem painel fixo) */
{ const it = acha('dor-cronica', 'df-exames');
  ok('auditoria APS II · quadros dor-cronica: I4 df-exames sem painel "lab" e com os 14 exames da fonte', !!it && !opt(it, 'lab') && it.opts.length >= 12 && !!opt(it, 'tireoide') && !!opt(it, 'cpk')); }
}
{
/* auditoria APS II · I5 (e): gota pergunta febre/mal-estar e fatores de artrite séptica */
ok('auditoria APS II · quadros gota: I5 pergunta fatores de artrite séptica', !!detOpt(item('gota', 'anamnese', 'go-septica'), 'protese'));
}
{
/* auditoria APS II · I6 (e): a pergunta que decide o AINE é uma só, em gota, lombalgia e ombro-joelho */
for (const qid of ['gota', 'lombalgia', 'ombro-joelho'])
  ok('auditoria APS II · quadros ' + qid + ': I6 pergunta AAS/anticoagulante/úlcera (go-aine, mesmo objeto)', mesmo(item(qid, 'anamnese', 'go-aine'), item('gota', 'anamnese', 'go-aine')));
for (const id of ['oj-risco-gi', 'oj-ulcera']) ok('auditoria APS II · quadros ombro-joelho: I6 ' + id + ' não existe mais', emNenhum(id));
}
{
/* auditoria APS II · I7 (e): urgência da lombalgia separa câncer de trauma; "força" sem vírgula interna */
{ const it = acha('lombalgia', 'lc-urgencia');
  ok('auditoria APS II · quadros lombalgia: I7 câncer e trauma são opções separadas', !!opt(it, 'trauma') && !/trauma/.test(opt(it, 'cancer')?.frase || 'trauma'));
  ok('auditoria APS II · quadros lombalgia: I7 frase de "força" sem vírgula', !/,/.test(opt(it, 'forca')?.frase || ',')); }
}
{
/* auditoria APS II · I8 (e): aneurisma de aorta tem para onde ir */
ok('auditoria APS II · quadros lombalgia: I8 encaminha à Cirurgia geral por massa pulsátil', !!opt(acha('lombalgia', 'lc-encaminha'), 'aorta'));
}
{
/* auditoria APS II · I9 (e): neuropatia pergunta início agudo ou piora rápida */
ok('auditoria APS II · quadros neuropatia: I9 pergunta início agudo ou piora rápida', !!item('neuropatia', 'anamnese', 'np-inicio'));
}
{
/* auditoria APS II · I10 (e): o ✓ e o ✗ da PA deitado/em pé cobrem também o pulso */
{ const it = item('neuropatia', 'ef', 'np-ortostatica');
  ok('auditoria APS II · quadros neuropatia: I10 np-ortostatica registra o pulso ao ortostatismo', !!it && /pulso/.test(it.sim) && /pulso/.test(it.nao) && mesmo(it, item('tontura', 'ef', 'np-ortostatica'))); }
}
{
/* auditoria APS II · I11 (e): "há quanto tempo" na dor crônica e no ombro-joelho, mesmo objeto */
ok('auditoria APS II · quadros ombro-joelho: I11 pergunta há quanto tempo (df-tempo, mesmo objeto da dor-cronica)', mesmo(item('ombro-joelho', 'anamnese', 'df-tempo'), item('dor-cronica', 'anamnese', 'df-tempo')));
}
{
/* auditoria APS II · I12 (e): o diagnóstico clínico de artrose sai como registro, não como regra */
{ const it = acha('ombro-joelho', 'oj-dx');
  ok('auditoria APS II · quadros ombro-joelho: I12 oj-dx registra o diagnóstico (lacuna:false)', it?.lacuna === false && (opt(it, 'clinico')?.frase || '').startsWith('diagnóstico clínico de artrose')); }
}
{
/* auditoria APS II · I13 (e): urgência da tontura inclui Romberg e skew; frases sem vírgula interna */
{ const it = acha('tontura', 'tv-urgencia');
  ok('auditoria APS II · quadros tontura: I13 tem Romberg precoce e skew', !!opt(it, 'romberg') && !!opt(it, 'skew'));
  ok('auditoria APS II · quadros tontura: I13 focal, semresposta e hospitalar sem vírgula interna', ['focal', 'semresposta', 'hospitalar'].every(v => !/,/.test(opt(it, v)?.frase || ','))); }
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
