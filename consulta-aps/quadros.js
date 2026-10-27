/* Quadros da consulta na USF — SÓ DADOS. Contrato em CLAUDE.md (esquema, tipos de item, regras de texto).
 * Montado de copiloto-onda-aps1/fragmentos-consulta/ por ferramentas/montar-quadros.mjs da onda APS I.
 * Cada quadro aponta para a queixa do copiloto (Não perder e fármacos vêm de lá, lidos, nunca copiados). */
var QUADROS = [];

/* quadros-a.js — agente quadros A (F3 da onda APS I), 26/10/2026
 * Quadros: puericultura, crianca-2-10, adolescente, crianca-doente, prenatal, puerperio, planejamento, climaterio.
 * Cada item sai de um item da queixa do copiloto indicada em `queixa` (perguntas → anamnese; exame → ef;
 * conduta, exames, fármaco e não perder → conduta).
 *
 * Convenções (as mesmas do quadros-b.js, para a página falar uma língua só):
 * - Conduta em 1ª pessoa, como a preceptora escreve (oriento, solicito, encaminho).
 * - `lacuna: false` em dois casos: (a) pergunta que só vale para uma fase ou um subgrupo (1ª consulta, depois de
 *   20 semanas, DUM incerta, teve DMG, usuária de DIU), em que "não avaliado" seria falso para os demais;
 *   (b) ação opcional da conduta (orientação, pedido de exame, encaminhamento), em que intocado quer dizer
 *   "não feito", não "não avaliado".
 * - No exame físico, achado que não se procura em toda consulta daquele tipo (reflexo vermelho e teste de
 *   cobertura em idades certas, PA da criança aos 3 e aos 6 anos, especular, mamas no climatério, fios do DIU)
 *   é `escolha` ou texto, não ✗/✓: o atalho "Sem alterações nos achados dos quadros" marca ✗ em todo tri visível
 *   e escreveria "sem alteração" num exame que não foi feito.
 * - Medida digitada (meses, AU, BCF, edema, Tanner, velocidade de crescimento, acuidade visual) não tem `na`:
 *   fica fora do texto quando vazia. A página só calcula IG, DPP, IMC e escore-z.
 * - `rotulo` no pré-natal separa as perguntas por fase (1ª consulta, toda consulta, depois de 20 semanas). */

/* ---------- perguntas compartilhadas (mesmo id, mesmo objeto) ---------- */

/* anamnese — puericultura, criança 2–10, adolescente, criança doente */
/* idade em meses — a página lê S.meses para o escore-z da OMS (id `meses`, sem prefixo, de propósito);
   puericultura e criança 2–10 (o escore-z vai até 19 anos no IMC) */
const IDADE_MESES = {tipo:'texto', id:'meses', rot:'Idade em meses', curto:true, fmt:'{v} meses de vida'};
const PU_VACINA = { tipo:'tri', id:'pu-vacina', rot:'Vacina atrasada no cartão de vacinas (conferir no cartão, não no relato)', na:'vacinas no cartão', junto:true,
  sim:'vacina em atraso no cartão de vacinas[: {d}]', nao:'vacinas em dia no cartão de vacinas', det:{tipo:'texto', ph:'qual vacina'} };
/* anamnese — puericultura, criança 2–10 */
const PU_REGRIDE = { tipo:'tri', id:'pu-regride', rot:'Perdeu habilidade que já tinha (fala, esfíncter, brincar)', na:'perda de habilidade',
  sim:'refere perda de habilidade já conquistada[: {d}]', nao:'nega perda de habilidade já conquistada', det:{tipo:'texto', ph:'qual, desde quando'} };
const PU_CASA = { tipo:'tri', id:'pu-casa', rot:'Conflito, álcool ou droga, ou punição física em casa', na:'ambiente em casa', junto:true,
  sim:'refere conflito, álcool ou droga, ou punição física em casa[: {d}]', nao:'nega conflito, álcool, droga e punição física em casa',
  det:{tipo:'texto', ph:'o quê, quem; palmada como disciplina'} };
/* anamnese — puericultura, puerpério */
const PU_AME = { tipo:'escolha', id:'pu-ame', rot:'Aleitamento materno', na:'aleitamento materno', opts:[
  {v:'exclusivo', rot:'exclusivo', frase:'em aleitamento materno exclusivo'},
  {v:'agua', rot:'com água ou chá', frase:'em aleitamento materno com água ou chá'},
  {v:'leite', rot:'com outro leite', frase:'em aleitamento materno com outro leite'},
  {v:'comida', rot:'com comida (6 meses ou mais)', frase:'em aleitamento materno com alimentação complementar'},
  {v:'nao', rot:'não mama no peito', frase:'sem aleitamento materno'}] };
const PU_MAMA = { tipo:'tri', id:'pu-mama', rot:'Dor, fissura, mama endurecida ou repuxada ao amamentar', na:'dor ou fissura ao amamentar', junto:true,
  sim:'refere dor, fissura ou mama endurecida ao amamentar[: {d}]', nao:'nega dor, fissura ou mama endurecida ao amamentar',
  det:{tipo:'texto', ph:'qual mama, desde quando'} };
/* ef — puericultura, criança 2–10 */
const PU_ALERTA = { tipo:'tri', id:'pu-alerta', rot:'Sinal de alerta do desenvolvimento para a idade (marcos da caderneta)', na:'marcos do desenvolvimento', junto:true,
  sim:'sinal de alerta do desenvolvimento para a idade[: {d}]', nao:'sem sinais de alerta do desenvolvimento para a idade',
  det:{tipo:'texto', ph:'qual (prematuro: idade corrigida até 2 anos)'} };
const PU_LESAO = { tipo:'tri', id:'pu-lesao', rot:'Lesão que a história não explica (área protegida, marca de objeto, queimadura em luva ou meia)', na:'lesões suspeitas de violência', junto:true,
  sim:'lesão não explicada pela história[: {d}]', nao:'sem lesões suspeitas de violência', det:{tipo:'texto', ph:'onde, aspecto'} };
/* conduta — puericultura, criança 2–10, adolescente */
const PU_C_VACINA = { tipo:'escolha', id:'pu-c-vacina', rot:'Vacinas', na:'vacinas', opts:[
  {v:'hoje', rot:'atualizadas hoje', frase:'vacinas da idade atualizadas'},
  {v:'sala', rot:'à sala de vacina', frase:'encaminho à sala de vacina'},
  {v:'nada', rot:'nenhuma prevista hoje', frase:'sem vacina prevista para hoje'}] };
/* ef — pré-natal, puerpério */
const PN_MUCOSAS = { tipo:'tri', id:'pn-mucosas', rot:'Palidez de mucosas', na:'mucosas', junto:true, sim:'mucosas hipocoradas', nao:'mucosas coradas' };

/* ---------- puericultura 0 a 2 anos ---------- */
QUADROS.push({
  id: 'puericultura', nome: 'Puericultura 0–2 anos', queixa: 'puericultura-0-2',
  fonte: 'MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012 · MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026 · medicina-wiki/wiki/materno-infantil-fatos.md (2026-05-31)',
  ciap: ['A98'], cid: ['Z00'],
  blocos: {
    anamnese: { rot: 'Puericultura 0–2 anos — anamnese', itens: [
      /* `meses` sem prefixo: o motor lê S.meses para o escore-z da OMS */
      IDADE_MESES,
      {tipo:'texto', id:'pu-nasc', rot:'Nascimento (1ª consulta): parto, peso, IG, Apgar, intercorrências', ph:'parto normal, 39 semanas, Apgar 9 e 10, sem intercorrências', fmt:'nascimento: {v}'},
      {tipo:'tri', id:'pu-triagem', rot:'Triagem neonatal com teste pendente ou alterado (pezinho, olhinho, orelhinha, coraçãozinho, linguinha)', na:'triagem neonatal', lacuna:false,
        sim:'triagem neonatal pendente ou alterada[: {d}]', nao:'triagem neonatal completa e normal na caderneta', det:{tipo:'texto', ph:'qual teste, resultado'}},
      {tipo:'tri', id:'pu-soromae', rot:'Sorologia materna reagente no pré-natal ou na maternidade (HIV, HTLV, HBsAg, sífilis)', na:'sorologias maternas', lacuna:false, junto:true,
        sim:'sorologia materna reagente[: {d}]', nao:'sorologias maternas não reagentes para HIV, HTLV, HBsAg e sífilis', det:{tipo:'texto', ph:'qual, conduta feita'}},
      PU_VACINA,
      PU_AME,
      PU_MAMA,
      {tipo:'texto', id:'pu-alim', rot:'Alimentação complementar (6 meses ou mais): o que come, consistência, vezes ao dia, carne na papa', ph:'papa salgada com carne 2 vezes ao dia, fruta amassada', fmt:'alimentação: {v}'},
      {tipo:'tri', id:'pu-acucar', rot:'Recebe açúcar, mel, refrigerante ou salgadinho', na:'açúcar, mel e ultraprocessados', junto:true,
        sim:'recebe açúcar, mel, refrigerante ou salgadinho[: {d}]', nao:'nega oferta de açúcar, mel, refrigerante ou salgadinho', det:{tipo:'texto', ph:'o quê'}},
      {tipo:'escolha', id:'pu-sono', rot:'Posição para dormir (berço firme, sem objeto macio)', na:'posição para dormir', opts:[
        {v:'costas', rot:'barriga para cima', frase:'dorme de barriga para cima'},
        {v:'lado', rot:'de lado', frase:'dorme de lado'},
        {v:'brucos', rot:'de bruços', frase:'dorme de bruços'}]},
      PU_REGRIDE,
      {tipo:'tri', id:'pu-mae', rot:'Mãe com tristeza, desânimo ou sono ruim; quem ajuda', na:'humor da mãe',
        sim:'mãe refere tristeza, desânimo ou sono ruim[: {d}]', nao:'mãe nega tristeza, desânimo ou sono ruim', det:{tipo:'texto', ph:'o quê, quem ajuda'}},
      {tipo:'tri', id:'pu-risco', rot:'Vulnerabilidade: mãe com menos de 18 anos ou de 8 anos de estudo, prematuro, baixo peso ao nascer, internação, óbito de menor de 5 anos na família, área de risco', na:'vulnerabilidade',
        sim:'fator de vulnerabilidade[: {d}]', nao:'sem fatores de vulnerabilidade', det:{tipo:'texto', ph:'qual'}},
      PU_CASA
    ]},
    ef: { rot: 'Puericultura 0–2 anos — exame dirigido', itens: [
      {tipo:'tri', id:'pu-fontanela', rot:'Fontanela anterior túrgida, abaulada ou deprimida', na:'fontanela',
        sim:'fontanela anterior {d}', simSemDet:'fontanela anterior alterada', nao:'fontanela anterior sem alterações',
        det:{tipo:'escolha', opts:[{v:'turgida', rot:'túrgida', frase:'túrgida'}, {v:'abaulada', rot:'abaulada', frase:'abaulada'}, {v:'deprimida', rot:'deprimida', frase:'deprimida'}]}},
      {tipo:'escolha', id:'pu-rv', rot:'Reflexo vermelho (1ª consulta, 4, 6 e 12 meses)', na:'reflexo vermelho', lacuna:false, junto:true, opts:[
        {v:'ok', rot:'presente e simétrico', frase:'reflexo vermelho presente e simétrico'},
        {v:'alterado', rot:'assimétrico ou com opacidade', frase:'reflexo vermelho alterado, assimétrico ou com opacidade'}]},
      {tipo:'escolha', id:'pu-desvio', rot:'Teste de cobertura e de Hirschberg (4, 6 e 12 meses)', na:'alinhamento ocular', lacuna:false, junto:true, opts:[
        {v:'ok', rot:'sem desvio', frase:'sem desvio ocular no teste de cobertura e de Hirschberg'},
        {v:'desvio', rot:'desvio', frase:'desvio ocular no teste de cobertura ou de Hirschberg'}]},
      {tipo:'tri', id:'pu-quadril', rot:'Quadril: Ortolani ou Barlow positivo, abdução limitada ou membro encurtado', na:'quadril', junto:true,
        sim:'exame do quadril alterado[: {d}]', nao:'exame do quadril sem alterações', det:{tipo:'texto', ph:'manobra, lado'}},
      {tipo:'tri', id:'pu-genital', rot:'Testículo fora da bolsa ou hérnia inguinal', na:'genitália e região inguinal', junto:true,
        sim:'alteração genital ou inguinal[: {d}]', nao:'sem alterações genitais ou inguinais', det:{tipo:'texto', ph:'testículo não palpável à direita, hérnia inguinal'}},
      {tipo:'tri', id:'pu-umbigo', rot:'Umbigo: secreção, vermelhidão ou hérnia umbilical', na:'umbigo', junto:true,
        sim:'alteração umbilical[: {d}]', nao:'umbigo sem alterações', det:{tipo:'texto', ph:'coto com secreção, hérnia umbilical'}},
      {tipo:'tri', id:'pu-ictericia', rot:'Icterícia', junto:true, sim:'icterícia[ até {d}]', nao:'sem icterícia', det:{tipo:'texto', ph:'face, tronco, abaixo do umbigo, braços e pernas'}},
      {tipo:'tri', id:'pu-boca', rot:'Boca: freio lingual curto, palato alterado, dente ao nascer ou nenhum dente aos 12 meses', na:'boca', junto:true,
        sim:'alteração na boca[: {d}]', nao:'freio lingual e palato sem alterações', det:{tipo:'texto', ph:'qual'}},
      PU_ALERTA,
      PU_LESAO
    ]},
    conduta: { rot: 'Puericultura 0–2 anos — conduta', itens: [
      {tipo:'escolha', id:'pu-c-orienta', rot:'Orientações da faixa', na:'orientações da faixa', lacuna:false, multi:true, tpl:'oriento a família sobre {d}', opts:[
        {v:'ame', rot:'aleitamento exclusivo até 6 meses', frase:'aleitamento materno exclusivo até 6 meses'},
        {v:'compl', rot:'alimentação complementar', frase:'alimentação complementar'},
        {v:'anemia', rot:'prevenção de anemia na comida', frase:'prevenção de anemia pela alimentação'},
        {v:'acid', rot:'prevenção de acidentes', frase:'prevenção de acidentes da faixa'},
        {v:'bucal', rot:'saúde bucal', frase:'saúde bucal'},
        {v:'estim', rot:'estimulação do desenvolvimento', frase:'estimulação do desenvolvimento'}]},
      {tipo:'escolha', id:'pu-c-curva', rot:'Peso, comprimento e PC nas curvas da caderneta', na:'marcação nas curvas', opts:[
        {v:'s', rot:'marcados', frase:'marco peso, comprimento e perímetro cefálico nas curvas da caderneta'}]},
      PU_C_VACINA,
      {tipo:'escolha', id:'pu-c-supl', rot:'Suplementação (vitamina A de 6 a 59 meses; ferro profilático, esquema a conferir)', na:'suplementação', multi:true, opts:[
        {v:'vita', rot:'vitamina A conferida', frase:'confiro a vitamina A em megadose na caderneta'},
        {v:'ferro', rot:'ferro profilático', frase:'indico ferro profilático'},
        {v:'nao', rot:'sem indicação na idade', frase:'sem suplementação indicada para a idade', so:true}]},
      {tipo:'escolha', id:'pu-c-odonto', rot:'1ª consulta odontológica (entre o 1º dente e os 12 meses)', na:'consulta odontológica', lacuna:false, opts:[
        {v:'agenda', rot:'agendada', frase:'agendo a 1ª consulta odontológica'},
        {v:'acomp', rot:'já acompanha', frase:'em acompanhamento odontológico'}]},
      {tipo:'texto', id:'pu-mchat', rot:'M-CHAT-R (entre 16 e 30 meses, nas consultas de 18 e 24): resultado', ph:'baixo risco', fmt:'M-CHAT-R aplicado: {v}'}
    ]}
  }
});

/* ---------- criança de 2 a 10 anos ---------- */
QUADROS.push({
  id: 'crianca-2-10', nome: 'Criança 2–10 anos', queixa: 'puericultura-2-10', grupo: 'outros',
  fonte: 'MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012 · MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026 · MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017',
  ciap: ['A98'], cid: ['Z00'],
  blocos: {
    anamnese: { rot: 'Criança 2–10 anos — anamnese', itens: [
      IDADE_MESES,
      PU_VACINA,
      {tipo:'tri', id:'cr-escola', rot:'Dificuldade na escola (aprender, faltas, brigas)', na:'escola',
        sim:'refere dificuldade na escola[: {d}]', nao:'nega dificuldade na escola', det:{tipo:'texto', ph:'série, aprender, faltas, brigas'}},
      {tipo:'tri', id:'cr-bullying', rot:'Apelido, exclusão ou agressão na escola (bullying)', na:'bullying', junto:true,
        sim:'refere bullying[: {d}]', nao:'nega bullying', det:{tipo:'texto', ph:'o quê, desde quando'}},
      {tipo:'texto', id:'cr-alim', rot:'Alimentação: refeições, horário, com a família e sem TV; leite no lugar do almoço ou do jantar', ph:'5 refeições, almoça com a família sem TV', fmt:'alimentação: {v}'},
      {tipo:'tri', id:'cr-ultra', rot:'Refrigerante, suco, salgadinho ou doce com frequência', na:'ultraprocessados', junto:true,
        sim:'consumo frequente de refrigerante, suco, salgadinho ou doce[: {d}]', nao:'nega consumo frequente de refrigerante, suco, salgadinho ou doce', det:{tipo:'texto', ph:'o quê'}},
      {tipo:'texto', id:'cr-tela', rot:'Tela por dia (TV, celular, videogame)', curto:true, ph:'3 horas', fmt:'{v} de tela por dia', na:'tempo de tela'},
      {tipo:'tri', id:'cr-sono', rot:'Problema de sono (horário, ritual, tela ou luz no quarto)', na:'sono', junto:true,
        sim:'refere problema de sono[: {d}]', nao:'nega problema de sono', det:{tipo:'texto', ph:'o quê'}},
      {tipo:'tri', id:'cr-esfincter', rot:'Perde xixi ou cocô (de dia ou na cama)', na:'controle esfincteriano',
        sim:'refere perda de urina ou fezes[: {d}]', nao:'nega perda de urina ou fezes', det:{tipo:'texto', ph:'enurese noturna, de dia, encoprese; treino com castigo'}},
      {tipo:'tri', id:'cr-comport', rot:'Birra, agressividade, medo ou isolamento que preocupa', na:'comportamento', junto:true,
        sim:'refere alteração de comportamento[: {d}]', nao:'nega alteração de comportamento', det:{tipo:'texto', ph:'o quê, como a família corrige'}},
      PU_REGRIDE,
      PU_CASA,
      {tipo:'tri', id:'cr-escova', rot:'Escovação da noite feita ou supervisionada por adulto, com creme dental com flúor', na:'escovação',
        sim:'escovação da noite feita ou supervisionada por adulto, com creme dental com flúor', nao:'sem escovação da noite supervisionada por adulto'},
      {tipo:'tri', id:'cr-risco', rot:'Risco de acidente: sem cadeirinha, sozinho perto de água, arma de fogo em casa, fogos, pipa perto de fio, sem capacete', na:'risco de acidente', junto:true,
        sim:'risco de acidente identificado[: {d}]', nao:'nega situações de risco de acidente', det:{tipo:'texto', ph:'qual'}}
    ]},
    ef: { rot: 'Criança 2–10 anos — exame dirigido', itens: [
      {tipo:'escolha', id:'cr-pa', rot:'PA pela tabela de percentil (aos 3 e aos 6 anos; média das 2 últimas de 3 medidas)', na:'percentil da PA', lacuna:false, opts:[
        {v:'ok', rot:'abaixo do percentil 95', frase:'PA abaixo do percentil 95 para idade, sexo e estatura'},
        {v:'alta', rot:'acima do percentil 95', frase:'PA acima do percentil 95 para idade, sexo e estatura'}]},
      {tipo:'texto', id:'cr-av', rot:'Acuidade visual (alterada: abaixo de 20/40 dos 3 aos 5 anos, de 20/30 a partir de 6, ou 2 linhas de diferença)', ph:'OD 20/20, OE 20/25', fmt:'acuidade visual {v}', junto:true},
      {tipo:'tri', id:'cr-marcha', rot:'Marcha: Trendelenburg, anserina ou hiperlordose lombar', na:'marcha', junto:true,
        sim:'marcha alterada[: {d}]', nao:'marcha sem alterações', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'cr-genital', rot:'Genitália: testículo fora da bolsa, lesão ou secreção', na:'genitália', junto:true,
        sim:'alteração genital[: {d}]', nao:'genitália sem alterações', det:{tipo:'texto', ph:'testículo retrátil à esquerda'}},
      {tipo:'tri', id:'cr-puberdade', rot:'Sinal de puberdade antes dos 8 anos (menina) ou dos 9 (menino)', na:'puberdade precoce', junto:true,
        sim:'sinal de puberdade precoce[: {d}]', nao:'sem sinal de puberdade precoce', det:{tipo:'texto', ph:'broto mamário, pelos, aumento testicular'}},
      {tipo:'tri', id:'cr-boca', rot:'Boca: mancha branca ou cavidade (cárie ativa), dente permanente nascendo sem cair o de leite', na:'boca', junto:true,
        sim:'alteração dentária[: {d}]', nao:'sem cárie ativa ou alteração da dentição', det:{tipo:'texto', ph:'qual'}},
      PU_ALERTA,
      PU_LESAO
    ]},
    conduta: { rot: 'Criança 2–10 anos — conduta', itens: [
      {tipo:'escolha', id:'cr-c-orienta', rot:'Orientações da faixa', na:'orientações da faixa', lacuna:false, multi:true, tpl:'oriento a família sobre {d}', opts:[
        {v:'alim', rot:'alimentação da idade', frase:'alimentação da idade'},
        {v:'ativ', rot:'atividade física e tela até 2 horas', frase:'atividade física diária e tela até 2 horas por dia'},
        {v:'acid', rot:'prevenção de acidentes', frase:'prevenção de acidentes'},
        {v:'transp', rot:'transporte no banco de trás', frase:'transporte no banco de trás com cadeirinha ou assento de elevação'},
        {v:'alcool', rot:'álcool (a partir de 7 anos)', frase:'riscos do álcool'}]},
      {tipo:'escolha', id:'cr-c-escova', rot:'Escovação com creme dental com flúor', na:'orientação de escovação', lacuna:false, opts:[
        {v:'ate6', rot:'até 6 anos: o adulto escova à noite', frase:'oriento a escovação da noite pelo adulto, com creme dental com flúor do tamanho de um grão de arroz cru'},
        {v:'mais6', rot:'acima de 6: o adulto supervisiona', frase:'oriento a escovação pela criança, com a da noite supervisionada pelo adulto'}]},
      {tipo:'escolha', id:'cr-c-curva', rot:'Peso, altura e IMC nas curvas da caderneta', na:'marcação nas curvas', opts:[
        {v:'s', rot:'marcados', frase:'marco peso, altura e IMC para a idade nas curvas da caderneta'}]},
      PU_C_VACINA,
      {tipo:'escolha', id:'cr-c-supl', rot:'Suplementação (vitamina A até 59 meses; polivitamínico não)', na:'suplementação', opts:[
        {v:'vita', rot:'vitamina A conferida', frase:'confiro a vitamina A em megadose na caderneta'},
        {v:'nao', rot:'sem suplemento indicado', frase:'sem indicação de suplemento ou polivitamínico'}]},
      {tipo:'escolha', id:'cr-c-exames', rot:'Exames (não são rotina: só com indicação)', na:'exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'hemo', rot:'hemograma (risco de anemia)', frase:'hemograma por risco de anemia'},
        {v:'lipid', rot:'perfil lipídico (doença cardiovascular precoce na família)', frase:'perfil lipídico por doença cardiovascular precoce na família'},
        {v:'epf', rot:'parasitológico (alta prevalência local)', frase:'parasitológico de fezes por alta prevalência local'}]}
    ]}
  }
});

/* ---------- adolescente ---------- */
QUADROS.push({
  id: 'adolescente', nome: 'Adolescente', queixa: 'adolescente', grupo: 'outros',
  fonte: 'MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026',
  ciap: ['A98'], cid: ['Z00'],
  blocos: {
    anamnese: { rot: 'Adolescente — anamnese', itens: [
      {tipo:'escolha', id:'ad-sozinho', rot:'Atendimento', na:'atendimento sozinho', opts:[
        {v:'sozinho', rot:'sozinho(a)', frase:'atendid{a} sozinh{a}'},
        {v:'parte', rot:'sozinho(a) em parte', frase:'atendid{a} sozinh{a} em parte da consulta'},
        {v:'acomp', rot:'com o responsável', frase:'atendid{a} com o responsável'}]},
      {tipo:'texto', id:'ad-motivo', rot:'Motivo do responsável, se diferente', fmt:'motivo do responsável: {v}'},
      {tipo:'texto', id:'ad-mora', rot:'Com quem mora; adulto de referência', ph:'mãe e irmãos; referência: avó', fmt:'mora com {v}', na:'com quem mora'},
      {tipo:'texto', id:'ad-escola', rot:'Escola e trabalho (série, rendimento, faltas; trabalha em quê)', ph:'9º ano, bom rendimento; não trabalha', fmt:'escola e trabalho: {v}', na:'escola e trabalho'},
      {tipo:'tri', id:'ad-purga', rot:'Vômito induzido, laxante ou anabolizante', na:'vômito induzido, laxante ou anabolizante',
        sim:'refere {d}', simSemDet:'refere vômito induzido, laxante ou anabolizante', nao:'nega vômito induzido, laxante ou anabolizante',
        det:{tipo:'escolha', multi:true, opts:[{v:'vomito', rot:'vômito induzido', frase:'vômito induzido'}, {v:'laxante', rot:'laxante', frase:'uso de laxante'}, {v:'anabol', rot:'anabolizante', frase:'uso de anabolizante'}]}},
      {tipo:'tri', id:'ad-drogas', rot:'Outras drogas (além de álcool e tabaco)', na:'outras drogas', junto:true,
        sim:'uso de {d}', simSemDet:'refere uso de outras drogas', nao:'nega uso de outras drogas', det:{tipo:'texto', ph:'qual, frequência, com quem, última vez'}},
      {tipo:'tri', id:'ad-sexual', rot:'Já teve relação sexual', na:'vida sexual',
        sim:'vida sexual iniciada[: {d}]', nao:'nega início da vida sexual', det:{tipo:'texto', ph:'idade de início, parcerias'}, sub:[
        {id:'ad-preserv', rot:'Usa preservativo', na:'uso de preservativo', sim:'usa preservativo', nao:'não usa preservativo'},
        {id:'ad-metodo', rot:'Usa outro método contraceptivo', na:'outro método contraceptivo', sim:'usa outro método contraceptivo', nao:'sem outro método contraceptivo'},
        {id:'ad-gravidez', rot:'Possibilidade de gravidez agora', na:'possibilidade de gravidez', sim:'possibilidade de gravidez atual', nao:'sem possibilidade de gravidez atual'}]},
      {tipo:'tri', id:'ad-violencia', rot:'Já sofreu abuso ou violência', na:'violência', junto:true,
        sim:'refere violência[: {d}]', nao:'nega violência ou abuso', det:{tipo:'texto', ph:'qual, quando, por quem'}},
      {tipo:'tri', id:'ad-humor', rot:'Tristeza, isolamento ou insatisfação com o corpo', na:'humor e imagem corporal',
        sim:'refere tristeza, isolamento ou insatisfação com o corpo[: {d}]', nao:'nega tristeza, isolamento ou insatisfação com o corpo', det:{tipo:'texto', ph:'o quê, desde quando'}},
      {tipo:'tri', id:'ad-morte', rot:'Pensamento de morte, plano ou tentativa de suicídio (perguntar diretamente)', na:'ideação suicida', junto:true,
        sim:'refere {d}', simSemDet:'refere pensamento de morte', nao:'nega pensamento de morte, plano ou tentativa de suicídio',
        det:{tipo:'escolha', multi:true, opts:[{v:'ideia', rot:'pensamento de morte', frase:'pensamento de morte'}, {v:'plano', rot:'plano', frase:'plano de suicídio'}, {v:'tentativa', rot:'tentativa prévia', frase:'tentativa prévia de suicídio'}]}},
      {tipo:'texto', id:'ad-puberdade', rot:'Menarca, ciclos e cólica; polução noturna e dúvidas sobre o corpo', ph:'menarca aos 12 anos, ciclos regulares', fmt:'{v}'},
      PU_VACINA
    ]},
    ef: { rot: 'Adolescente — exame dirigido', itens: [
      {tipo:'texto', id:'ad-tanner', rot:'Tanner', curto:true, ph:'M3 P3 ou G3 P3', fmt:'Tanner {v}'},
      {tipo:'texto', id:'ad-vc', rot:'Velocidade de crescimento (cm/ano)', curto:true, ph:'6 cm/ano', fmt:'velocidade de crescimento {v}', junto:true},
      {tipo:'tri', id:'ad-atraso', rot:'Atraso puberal: menina sem broto mamário após 13 anos ou sem menarca após 16; menino sem caractere sexual aos 14', na:'atraso puberal', junto:true,
        sim:'atraso puberal[: {d}]', nao:'sem atraso puberal', det:{tipo:'texto', ph:'qual'}},
      {tipo:'texto', id:'ad-av', rot:'Acuidade visual', ph:'OD 20/20, OE 20/20', fmt:'acuidade visual {v}', junto:true},
      {tipo:'tri', id:'ad-dentes', rot:'Cárie ou tártaro', junto:true, sim:'cárie ou tártaro[: {d}]', nao:'sem cárie ou tártaro', det:{tipo:'texto', ph:'onde'}},
      {tipo:'tri', id:'ad-acne', rot:'Acne', junto:true, sim:'acne[ {d}]', nao:'sem acne', det:{tipo:'texto', ph:'leve, moderada, onde'}},
      {tipo:'tri', id:'ad-coluna', rot:'Escoliose', junto:true, sim:'escoliose[: {d}]', nao:'sem escoliose', det:{tipo:'texto', ph:'onde'}},
      {tipo:'tri', id:'ad-mamas', rot:'Mamas alteradas ou ginecomastia', na:'mamas', junto:true,
        sim:'alteração mamária[: {d}]', nao:'mamas sem alterações', det:{tipo:'texto', ph:'ginecomastia bilateral, firme, móvel'}},
      {tipo:'tri', id:'ad-sinaldroga', rot:'Sinais de uso de droga: hálito etílico, rinite persistente, septo perfurado, marcas de injeção', na:'sinais de uso de droga', junto:true,
        sim:'sinais de uso de droga[: {d}]', nao:'sem sinais de uso de droga', det:{tipo:'texto', ph:'qual'}}
    ]},
    conduta: { rot: 'Adolescente — conduta', itens: [
      {tipo:'escolha', id:'ad-c-sigilo', rot:'Sigilo', na:'sigilo', opts:[
        {v:'s', rot:'combinado, com as exceções de risco', frase:'combino o sigilo, com quebra só em risco à vida ou risco relevante para si ou para outros'}]},
      {tipo:'escolha', id:'ad-c-orienta', rot:'Orientações', na:'orientações', lacuna:false, multi:true, tpl:'oriento sobre {d}', opts:[
        {v:'alim', rot:'alimentação', frase:'alimentação'},
        {v:'ativ', rot:'atividade física', frase:'atividade física'},
        {v:'bucal', rot:'saúde bucal', frase:'saúde bucal'},
        {v:'sexo', rot:'sexo seguro e dupla proteção', frase:'sexo seguro e dupla proteção'},
        {v:'violencia', rot:'risco de violência', frase:'risco de violência'}]},
      PU_C_VACINA,
      {tipo:'escolha', id:'ad-c-contracep', rot:'Contracepção', na:'contracepção', lacuna:false, multi:true, opts:[
        {v:'preserv', rot:'preservativos entregues', frase:'entrego preservativos'},
        {v:'pr', rot:'planejamento reprodutivo', frase:'encaminho ao planejamento reprodutivo'},
        {v:'ae', rot:'anticoncepção de emergência', frase:'oferto anticoncepção de emergência'}]},
      {tipo:'escolha', id:'ad-c-testes', rot:'Testes rápidos (com aconselhamento e sigilo)', na:'testes rápidos', lacuna:false, multi:true,
        tpl:'realizo teste rápido de {d}', tplN:'realizo testes rápidos de {d}', opts:[
        {v:'grav', rot:'gravidez', frase:'gravidez'}, {v:'sifilis', rot:'sífilis', frase:'sífilis'}, {v:'hiv', rot:'HIV', frase:'HIV'}, {v:'hep', rot:'hepatites B e C', frase:'hepatites B e C'}]},
      {tipo:'escolha', id:'ad-c-curva', rot:'Peso, estatura e IMC na Caderneta do Adolescente', na:'marcação na caderneta', opts:[
        {v:'s', rot:'marcados', frase:'marco peso, estatura e IMC para a idade na Caderneta do Adolescente'}]}
    ]}
  }
});

/* ---------- criança doente, 2 meses a 5 anos (AIDPI) ---------- */
QUADROS.push({
  id: 'crianca-doente', nome: 'Criança doente (AIDPI)', queixa: 'crianca-aidpi', grupo: 'outros',
  fonte: 'MS/OPAS/UNICEF — Manual de Quadros de Procedimentos AIDPI Criança, 2 meses a 5 anos, 2017 · MS/OPAS/UNICEF — AIDPI Criança 2017',
  ciap: ['A03', 'R05', 'D11', 'R74'], cid: ['R50', 'R05', 'A09', 'J06'],
  blocos: {
    anamnese: { rot: 'Criança doente — anamnese', itens: [
      {tipo:'escolha', id:'cd-consulta', rot:'Consulta', na:'primeira consulta ou retorno', opts:[
        {v:'primeira', rot:'primeira por este problema', frase:'primeira consulta por este problema'},
        {v:'retorno', rot:'retorno', frase:'retorno pelo mesmo problema'}]},
      {tipo:'tri', id:'cd-beber', rot:'Não consegue beber ou mamar no peito', na:'consegue beber ou mamar', junto:true,
        sim:'não consegue beber ou mamar no peito', nao:'consegue beber ou mamar no peito'},
      {tipo:'tri', id:'cd-vomita', rot:'Vomita tudo o que ingere', junto:true, sim:'vomita tudo o que ingere', nao:'nega vomitar tudo o que ingere'},
      {tipo:'tri', id:'cd-convulsao', rot:'Convulsão ou movimento anormal há menos de 72 h', na:'convulsão', junto:true,
        sim:'convulsão ou movimento anormal há menos de 72 horas', nao:'nega convulsão ou movimento anormal'},
      {tipo:'tri', id:'cd-tosse', rot:'Tosse ou dificuldade para respirar', na:'tosse ou dificuldade para respirar', junto:true,
        sim:'tosse ou dificuldade para respirar[ há {d}]', nao:'nega tosse ou dificuldade para respirar', det:{tipo:'texto', ph:'3 dias'}},
      {tipo:'tri', id:'cd-chiado', rot:'Chiado (sibilância)', na:'chiado', junto:true, sim:'refere chiado', nao:'nega chiado'},
      {tipo:'tri', id:'cd-diarreia', rot:'Diarreia', junto:true, sim:'diarreia[ há {d}]', nao:'nega diarreia', det:{tipo:'texto', ph:'2 dias'}, sub:[
        {id:'cd-sangue', rot:'Sangue nas fezes', na:'sangue nas fezes', sim:'com sangue nas fezes', nao:'sem sangue nas fezes'}]},
      {tipo:'tri', id:'cd-febre', rot:'Febre', junto:true, sim:'febre[ há {d}]', nao:'nega febre', det:{tipo:'texto', ph:'2 dias'}},
      {tipo:'escolha', id:'cd-aliment', rot:'Alimentação e líquidos', na:'alimentação e líquidos', opts:[
        {v:'mantida', rot:'mantidos', frase:'alimentação e ingestão de líquidos mantidas'},
        {v:'reduzida', rot:'reduzidos', frase:'alimentação e ingestão de líquidos reduzidas'}]},
      PU_VACINA
    ]},
    ef: { rot: 'Criança doente — exame dirigido', itens: [
      {tipo:'tri', id:'cd-fr', rot:'Respiração rápida: 50 ou mais de 2 a 11 meses; 40 ou mais de 1 a 5 anos (contar 1 minuto, criança tranquila)', na:'respiração rápida',
        sim:'respiração rápida para a idade', nao:'sem respiração rápida para a idade'},
      {tipo:'tri', id:'cd-tiragem', rot:'Tiragem subcostal', junto:true, sim:'tiragem subcostal', nao:'sem tiragem subcostal'},
      {tipo:'tri', id:'cd-estridor', rot:'Estridor em repouso', junto:true, sim:'estridor em repouso', nao:'sem estridor em repouso'},
      {tipo:'tri', id:'cd-sibilancia', rot:'Sibilância', junto:true, sim:'sibilância', nao:'sem sibilância'},
      {tipo:'tri', id:'cd-tec', rot:'Enchimento capilar maior que 2 segundos', na:'enchimento capilar', junto:true,
        sim:'tempo de enchimento capilar maior que 2 segundos', nao:'tempo de enchimento capilar de até 2 segundos'},
      {tipo:'tri', id:'cd-asa', rot:'Batimento de asa do nariz ou gemência', na:'batimento de asa do nariz e gemência', junto:true,
        sim:'batimento de asa do nariz ou gemência', nao:'sem batimento de asa do nariz ou gemência'},
      {tipo:'escolha', id:'cd-consciencia', rot:'Estado de consciência', na:'estado de consciência', junto:true, opts:[
        {v:'alerta', rot:'alerta', frase:'criança alerta'},
        {v:'irritada', rot:'irritada', frase:'criança irritada'},
        {v:'letargica', rot:'letárgica', frase:'criança letárgica'},
        {v:'inconsciente', rot:'inconsciente', frase:'criança inconsciente'}]}
    ]},
    conduta: { rot: 'Criança doente — conduta', itens: [
      {tipo:'escolha', id:'cd-c-grave', rot:'Sinal geral de perigo, tiragem subcostal ou estridor em repouso', na:'classificação de gravidade', opts:[
        {v:'nao', rot:'ausente', frase:'sem sinal de pneumonia grave ou doença muito grave'},
        {v:'sim', rot:'presente: tratar e referir', frase:'pneumonia grave ou doença muito grave: faço a primeira dose de antibiótico, previno hipoglicemia, ofereço oxigênio se disponível e refiro com urgência'}]},
      {tipo:'escolha', id:'cd-c-imediato', rot:'Retorno imediato orientado', na:'sinais de retorno imediato', multi:true, tpl:'oriento retorno imediato {d}', opts:[
        {v:'geral', rot:'toda criança doente: não beber, piorar ou febre', frase:'se não conseguir beber nem mamar, piorar o estado geral ou aparecer ou piorar a febre'},
        {v:'resp', rot:'com tosse: respiração rápida ou difícil', frase:'se respirar rápido ou com dificuldade'},
        {v:'diar', rot:'com diarreia: sangue nas fezes ou dificuldade para beber', frase:'se tiver sangue nas fezes ou dificuldade para beber'}]},
      {tipo:'escolha', id:'cd-c-curva', rot:'Peso e altura na curva da caderneta', na:'marcação na curva', opts:[
        {v:'s', rot:'marcados', frase:'marco peso e altura na curva da caderneta'}]},
      {tipo:'escolha', id:'cd-c-dose', rot:'Dose pediátrica', na:'dose pelo peso', opts:[
        {v:'peso', rot:'calculada pelo peso de hoje', frase:'calculo a dose pelo peso de hoje'},
        {v:'sem', rot:'sem prescrição', frase:'sem prescrição de medicamento'}]},
      {tipo:'escolha', id:'cd-c-seguimento', rot:'Retorno de seguimento conforme a classificação', na:'retorno de seguimento', opts:[
        {v:'s', rot:'combinado e registrado na caderneta', frase:'combino o retorno de seguimento conforme a classificação e registro na caderneta'}]}
    ]}
  }
});

/* ---------- pré-natal de baixo risco ---------- */
QUADROS.push({
  id: 'prenatal', nome: 'Pré-natal', queixa: 'prenatal-baixo-risco',
  fonte: 'MS — Caderneta Brasileira da Gestante, 2026 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026 · MS — Manual de Gestação de Alto Risco, 2022',
  ciap: ['W78'], cid: ['Z34'],
  blocos: {
    anamnese: { rot: 'Pré-natal — anamnese', itens: [
      {tipo:'texto', id:'pn-gpa', rot:'G/P/A', curto:true, ph:'G2P1A0', fmt:'{v}', na:'G/P/A'},
      {tipo:'data', id:'pn-dum', rot:'DUM', calc:'dpp', na:'DUM', junto:true},
      {tipo:'rotulo', rot:'1ª consulta'},
      {tipo:'tri', id:'pn-dumincerta', rot:'DUM incerta: ciclo irregular ou anticoncepcional hormonal (a IG sai da USG)', na:'certeza da DUM', lacuna:false, junto:true,
        sim:'DUM incerta[ ({d})]', nao:'DUM certa', det:{tipo:'texto', ph:'ciclo irregular, usava anticoncepcional'}},
      {tipo:'escolha', id:'pn-planejada', rot:'Gravidez', na:'gravidez planejada ou desejada', lacuna:false, opts:[
        {v:'planejada', rot:'planejada', frase:'gestação planejada'},
        {v:'desejada', rot:'não planejada, desejada', frase:'gestação não planejada, desejada'},
        {v:'nao', rot:'não desejada', frase:'gestação não desejada'}]},
      {tipo:'tri', id:'pn-violencia', rot:'Violência doméstica', lacuna:false, junto:true,
        sim:'refere violência doméstica[: {d}]', nao:'nega violência doméstica', det:{tipo:'texto', ph:'qual, por quem'}},
      {tipo:'rotulo', rot:'Toda consulta'},
      {tipo:'tri', id:'pn-humor', rot:'Tristeza, ansiedade, sono ruim ou vontade de se machucar', na:'humor',
        sim:'refere {d}', simSemDet:'refere alteração de humor ou sono', nao:'nega tristeza, ansiedade, sono ruim e vontade de se machucar',
        det:{tipo:'escolha', multi:true, opts:[{v:'triste', rot:'tristeza', frase:'tristeza'}, {v:'ansiedade', rot:'ansiedade', frase:'ansiedade'},
          {v:'sono', rot:'sono ruim', frase:'sono ruim'}, {v:'machucar', rot:'vontade de se machucar', frase:'vontade de se machucar'}]}},
      {tipo:'tri', id:'pn-adesao', rot:'Usa ferro e ácido fólico regularmente (gosto metálico, náusea, constipação?)', na:'adesão ao ferro e ao ácido fólico',
        sim:'em uso regular de ferro e ácido fólico', nao:'sem uso regular de ferro e ácido fólico'},
      {tipo:'tri', id:'pn-sangra', rot:'Sangramento vaginal', na:'sangramento', sim:'refere sangramento vaginal', nao:'nega sangramento vaginal'},
      {tipo:'tri', id:'pn-liquido', rot:'Perda de líquido', junto:true, sim:'refere perda de líquido', nao:'nega perda de líquido'},
      {tipo:'tri', id:'pn-contracoes', rot:'Contrações', junto:true, sim:'refere contrações[: {d}]', nao:'nega contrações', det:{tipo:'texto', ph:'frequência, regulares ou não'}},
      {tipo:'tri', id:'pn-cefaleia', rot:'Cefaleia, escotomas ou epigastralgia', junto:true,
        sim:'refere {d}', simSemDet:'refere cefaleia, escotomas ou epigastralgia', nao:'nega cefaleia, escotomas e epigastralgia',
        det:{tipo:'escolha', multi:true, opts:[{v:'cef', rot:'cefaleia', frase:'cefaleia'}, {v:'esc', rot:'escotomas', frase:'escotomas'}, {v:'epi', rot:'epigastralgia', frase:'epigastralgia'}]}},
      {tipo:'tri', id:'pn-febre', rot:'Febre', junto:true, sim:'refere febre', nao:'nega febre'},
      {tipo:'tri', id:'pn-urina', rot:'Queixa urinária ou corrimento', na:'queixas urinárias e corrimento', junto:true,
        sim:'refere {d}', simSemDet:'refere queixa urinária ou corrimento', nao:'nega queixas urinárias e corrimento',
        det:{tipo:'escolha', multi:true, opts:[{v:'urina', rot:'queixa urinária', frase:'queixa urinária'}, {v:'corrimento', rot:'corrimento', frase:'corrimento'}]}},
      {tipo:'rotulo', rot:'A partir de 20 semanas'},
      {tipo:'tri', id:'pn-mf', rot:'Movimentos fetais', lacuna:false, junto:true, sim:'refere movimentos fetais', nao:'refere ausência de movimentos fetais'}
    ]},
    ef: { rot: 'Pré-natal — exame obstétrico', itens: [
      {tipo:'texto', id:'pn-au', rot:'Altura uterina (cm)', curto:true, im:'decimal', ph:'24', fmt:'AU {v} cm'},
      {tipo:'escolha', id:'pn-aucurva', rot:'AU na curva da Caderneta', na:'AU na curva', lacuna:false, junto:true, opts:[
        {v:'ok', rot:'entre os percentis 10 e 90', frase:'AU entre os percentis 10 e 90 para a IG'},
        {v:'fora', rot:'fora (repetir em 15 dias)', frase:'AU fora dos percentis 10 a 90 para a IG'}]},
      {tipo:'texto', id:'pn-bcf', rot:'BCF (bpm)', curto:true, im:'numeric', ph:'140', fmt:'BCF {v} bpm', junto:true},
      {tipo:'texto', id:'pn-edema', rot:'Edema', curto:true, ph:'ausente ou 1+/4+ pré-tibial', fmt:'edema {v}', junto:true},
      {tipo:'escolha', id:'pn-apresentacao', rot:'Apresentação fetal (por volta de 36 semanas)', na:'apresentação fetal', lacuna:false, junto:true, opts:[
        {v:'cefalica', rot:'cefálica', frase:'apresentação cefálica'},
        {v:'pelvica', rot:'pélvica', frase:'apresentação pélvica'},
        {v:'transversa', rot:'transversa', frase:'situação transversa'}]},
      PN_MUCOSAS
    ]},
    conduta: { rot: 'Pré-natal — conduta', itens: [
      {tipo:'escolha', id:'pn-c-risco', rot:'Risco gestacional (rever em toda consulta)', na:'risco gestacional', opts:[
        {v:'habitual', rot:'habitual', frase:'risco gestacional habitual, mantenho o pré-natal na USF'},
        {v:'atencao', rot:'fator de risco que fica na USF', frase:'fator de risco que permanece no pré-natal da USF, com atenção redobrada'},
        {v:'alto', rot:'alto risco', frase:'encaminho ao pré-natal de alto risco, mantendo o vínculo com a USF'}]},
      {tipo:'escolha', id:'pn-c-exames', rot:'Exames do trimestre', na:'exames do trimestre', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'t1', rot:'1º trimestre', frase:'os exames do 1º trimestre'},
        {v:'usg', rot:'USG obstétrica', frase:'ultrassonografia obstétrica'},
        {v:'t2', rot:'2º trimestre (TOTG de 24 a 28 semanas)', frase:'os exames do 2º trimestre'},
        {v:'t3', rot:'3º trimestre', frase:'os exames do 3º trimestre'}]},
      {tipo:'escolha', id:'pn-c-tr', rot:'Testes rápidos feitos hoje', na:'testes rápidos', lacuna:false, multi:true,
        tpl:'realizo teste rápido de {d}', tplN:'realizo testes rápidos de {d}', opts:[
        {v:'sifilis', rot:'sífilis', frase:'sífilis'}, {v:'hiv', rot:'HIV', frase:'HIV'}, {v:'hepb', rot:'hepatite B', frase:'hepatite B'}, {v:'hepc', rot:'hepatite C', frase:'hepatite C'}]},
      {tipo:'escolha', id:'pn-c-vacina', rot:'Vacinas da gestação (hepatite B, influenza e covid-19 em qualquer IG; dT se esquema incompleto; dTpa a partir de 20 semanas; VSR a partir de 28)', na:'vacinas', opts:[
        {v:'hoje', rot:'atualizadas hoje', frase:'vacinas da gestação atualizadas'},
        {v:'sala', rot:'à sala de vacina', frase:'encaminho à sala de vacina'},
        {v:'dia', rot:'já em dia', frase:'vacinas da gestação em dia'}]},
      {tipo:'escolha', id:'pn-c-supl', rot:'Suplementação', na:'suplementação', multi:true, tpl:'suplementação de {d}', opts:[
        {v:'ferro', rot:'ferro', frase:'ferro'}, {v:'folico', rot:'ácido fólico', frase:'ácido fólico'}]},
      {tipo:'escolha', id:'pn-c-pe', rot:'AAS e cálcio para pré-eclâmpsia (1 fator de alto risco ou 2 moderados; AAS antes de 16 semanas)', na:'indicação de AAS e cálcio', opts:[
        {v:'nao', rot:'sem indicação', frase:'sem indicação de AAS e cálcio para prevenir pré-eclâmpsia'},
        {v:'sim', rot:'indicados', frase:'indico AAS e cálcio para prevenir pré-eclâmpsia'}]},
      {tipo:'escolha', id:'pn-c-alarme', rot:'Sinais de alarme e quando ir à maternidade', na:'sinais de alarme', lacuna:false, opts:[
        {v:'s', rot:'orientada', frase:'oriento sinais de alarme e quando ir à maternidade'}]},
      {tipo:'escolha', id:'pn-c-odonto', rot:'Avaliação odontológica (ao menos uma na gestação)', na:'avaliação odontológica', opts:[
        {v:'enc', rot:'encaminhada', frase:'encaminho à avaliação odontológica'},
        {v:'feita', rot:'já feita', frase:'avaliação odontológica já feita na gestação'}]},
      {tipo:'escolha', id:'pn-c-colo', rot:'Rastreamento do colo pendente (colher na gestação)', na:'rastreamento do colo', lacuna:false, opts:[
        {v:'colhido', rot:'colhido hoje', frase:'colho o rastreamento do colo do útero'},
        {v:'dia', rot:'em dia', frase:'rastreamento do colo do útero em dia'}]},
      {tipo:'escolha', id:'pn-c-maternidade', rot:'Maternidade de referência e visita antes do parto', na:'maternidade de referência', lacuna:false, opts:[
        {v:'s', rot:'informada', frase:'informo a maternidade de referência e oriento a visita antes do parto'}]},
      {tipo:'escolha', id:'pn-c-plano', rot:'Plano de parto (3º trimestre)', na:'plano de parto', lacuna:false, opts:[
        {v:'s', rot:'conversado', frase:'converso o plano de parto'}]}
    ]}
  }
});

/* ---------- puerpério ---------- */
QUADROS.push({
  id: 'puerperio', nome: 'Puerpério', queixa: 'puerperio', grupo: 'outros',
  fonte: 'MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012 · MS — Caderneta Brasileira da Gestante, 2026 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026',
  ciap: ['W18', 'W19'], cid: ['Z39'],
  blocos: {
    anamnese: { rot: 'Puerpério — anamnese', itens: [
      {tipo:'texto', id:'pp-parto', rot:'Dias de pós-parto e tipo de parto (indicação da cesárea)', ph:'10º dia de pós-parto de cesárea por DCP', fmt:'{v}', na:'dias e tipo de parto'},
      {tipo:'tri', id:'pp-intercorr', rot:'Intercorrência na gestação, no parto ou no pós-parto: hemorragia, febre, hipertensão, diabetes, convulsão', na:'intercorrências', junto:true,
        sim:'intercorrência na gestação ou no parto[: {d}]', nao:'nega intercorrências na gestação, no parto e no pós-parto', det:{tipo:'texto', ph:'pré-eclâmpsia, DMG, hemorragia'}},
      {tipo:'tri', id:'pp-sifhiv', rot:'Sífilis e HIV testados no pré-natal e no parto (cartão da gestante)', na:'sífilis e HIV no cartão', junto:true,
        sim:'sífilis e HIV testados no pré-natal e no parto, conforme o cartão', nao:'sem registro de sífilis e HIV testados no pré-natal ou no parto'},
      {tipo:'tri', id:'pp-sangra', rot:'Sangramento que encharca o absorvente ou com mau cheiro', na:'sangramento',
        sim:'refere sangramento aumentado ou com mau cheiro[: {d}]', nao:'nega sangramento aumentado ou com mau cheiro', det:{tipo:'texto', ph:'quantidade, cor'}},
      {tipo:'tri', id:'pp-febre', rot:'Febre', junto:true, sim:'refere febre', nao:'nega febre'},
      {tipo:'tri', id:'pp-dor', rot:'Dor (abdome, ferida, períneo)', na:'dor', junto:true, sim:'refere dor[: {d}]', nao:'nega dor', det:{tipo:'texto', ph:'onde'}},
      {tipo:'tri', id:'pp-urina', rot:'Queixa urinária ou intestinal', na:'queixas urinárias e intestinais', junto:true,
        sim:'refere queixa urinária ou intestinal[: {d}]', nao:'nega queixas urinárias e intestinais', det:{tipo:'texto', ph:'ardência, constipação'}},
      PU_AME,
      PU_MAMA,
      {tipo:'tri', id:'pp-humor', rot:'Tristeza, desânimo, perda de prazer ou sono ruim', na:'humor e sono',
        sim:'refere {d}', simSemDet:'refere alteração de humor ou sono', nao:'nega tristeza, desânimo, perda de prazer e alteração do sono',
        det:{tipo:'escolha', multi:true, opts:[{v:'triste', rot:'tristeza', frase:'tristeza'}, {v:'desanimo', rot:'desânimo', frase:'desânimo'},
          {v:'prazer', rot:'perda de prazer', frase:'perda de prazer'}, {v:'sono', rot:'sono ruim', frase:'sono ruim'}]}},
      {tipo:'tri', id:'pp-bebe', rot:'Pensamento de machucar o bebê (perguntar diretamente)', na:'pensamento de machucar o bebê', junto:true,
        sim:'refere pensamento de machucar o bebê[: {d}]', nao:'nega pensamento de machucar o bebê', det:{tipo:'texto', ph:'intrusivo ou com intenção'}},
      {tipo:'tri', id:'pp-psiq', rot:'Depressão, transtorno bipolar ou psicose antes ou em outro parto', na:'antecedente psiquiátrico', junto:true,
        sim:'antecedente de {d}', simSemDet:'refere antecedente de depressão, transtorno bipolar ou psicose', nao:'nega antecedente de depressão, transtorno bipolar ou psicose',
        det:{tipo:'escolha', multi:true, opts:[{v:'dep', rot:'depressão', frase:'depressão'}, {v:'dpp', rot:'depressão pós-parto', frase:'depressão pós-parto'},
          {v:'bip', rot:'transtorno bipolar', frase:'transtorno bipolar'}, {v:'psic', rot:'psicose', frase:'psicose'}]}},
      {tipo:'texto', id:'pp-metodo', rot:'Contracepção: saiu da maternidade com método? qual prefere? quer mais filhos?', ph:'sem método; prefere DIU', fmt:'contracepção: {v}', na:'contracepção'},
      {tipo:'tri', id:'pp-violencia', rot:'Violência em casa ou relação sem consentimento', na:'violência',
        sim:'refere violência[: {d}]', nao:'nega violência em casa e relação sem consentimento', det:{tipo:'texto', ph:'qual'}}
    ]},
    ef: { rot: 'Puerpério — exame dirigido', itens: [
      PN_MUCOSAS,
      {tipo:'tri', id:'pp-mamas', rot:'Mamas: ingurgitamento, fissura ou sinais inflamatórios', na:'mamas', junto:true,
        sim:'mamas com {d}', simSemDet:'alteração nas mamas', nao:'mamas sem ingurgitamento, fissura ou sinais inflamatórios',
        det:{tipo:'escolha', multi:true, opts:[{v:'ingurg', rot:'ingurgitamento', frase:'ingurgitamento'}, {v:'fissura', rot:'fissura', frase:'fissura'},
          {v:'inflam', rot:'sinais inflamatórios', frase:'sinais inflamatórios'}, {v:'flutua', rot:'flutuação', frase:'área de flutuação'}]}},
      {tipo:'escolha', id:'pp-pega', rot:'Mamada observada (posição e pega)', na:'mamada observada', lacuna:false, junto:true, opts:[
        {v:'ok', rot:'adequadas', frase:'mamada observada com posição e pega adequadas'},
        {v:'alt', rot:'inadequadas', frase:'mamada observada com posição ou pega inadequada'}]},
      {tipo:'tri', id:'pp-utero', rot:'Útero com involução inadequada ou doloroso à palpação', na:'útero', junto:true,
        sim:'útero com involução inadequada ou doloroso[: {d}]', nao:'útero em involução, indolor à palpação', det:{tipo:'texto', ph:'altura, dor'}},
      {tipo:'tri', id:'pp-cicatriz', rot:'Cicatriz da cesárea, laceração ou episiotomia com sinais de infecção', na:'cicatriz', junto:true,
        sim:'cicatriz com sinais de infecção[: {d}]', nao:'sem sinais de infecção em ferida operatória ou períneo', det:{tipo:'texto', ph:'onde, secreção, deiscência'}},
      {tipo:'tri', id:'pp-loquios', rot:'Lóquios aumentados ou com mau cheiro', na:'lóquios', junto:true,
        sim:'lóquios aumentados ou fétidos', nao:'lóquios sem aumento ou odor fétido'},
      {tipo:'tri', id:'pp-mmii', rot:'Edema assimétrico ou dor na panturrilha', na:'membros inferiores', junto:true,
        sim:'edema assimétrico ou dor na panturrilha[: {d}]', nao:'sem edema assimétrico ou dor na panturrilha', det:{tipo:'texto', ph:'lado'}},
      {tipo:'tri', id:'pp-vinculo', rot:'Vínculo com o bebê prejudicado (como olha, segura e acalma)', na:'vínculo com o bebê', junto:true,
        sim:'vínculo mãe-bebê prejudicado[: {d}]', nao:'vínculo mãe-bebê preservado', det:{tipo:'texto', ph:'o que observou'}},
      {tipo:'tri', id:'pp-rn', rot:'RN: coto, icterícia, palidez, cianose ou desidratação', na:'exame do RN', junto:true,
        sim:'RN com alteração[: {d}]', nao:'RN sem alteração no coto, na pele ou na hidratação', det:{tipo:'texto', ph:'qual'}}
    ]},
    conduta: { rot: 'Puerpério — conduta', itens: [
      {tipo:'escolha', id:'pp-c-amamenta', rot:'Amamentação', na:'orientação de amamentação', lacuna:false, multi:true, opts:[
        {v:'ame', rot:'exclusiva até 6 meses', frase:'oriento amamentação exclusiva em livre demanda até 6 meses'},
        {v:'pega', rot:'posição e pega corrigidas', frase:'corrijo posição e pega'}]},
      {tipo:'escolha', id:'pp-c-mama', rot:'Problema na mama', na:'manejo da mama', lacuna:false, multi:true, tpl:'oriento manejo {d}', opts:[
        {v:'fissura', rot:'fissura', frase:'da fissura'},
        {v:'ingurg', rot:'ingurgitamento', frase:'do ingurgitamento'},
        {v:'mastite', rot:'mastite: manter amamentação', frase:'da mastite sem suspender a amamentação'}]},
      {tipo:'escolha', id:'pp-c-contracep', rot:'Contracepção pós-parto', na:'contracepção', multi:true, tpl:'contracepção pós-parto: {d}', opts:[
        {v:'preserv', rot:'preservativo', frase:'preservativo'},
        {v:'diu', rot:'DIU de cobre', frase:'DIU de cobre'},
        {v:'implante', rot:'implante', frase:'implante'},
        {v:'mini', rot:'minipílula', frase:'minipílula'},
        {v:'trim', rot:'injetável trimestral', frase:'injetável trimestral'},
        {v:'lam', rot:'LAM', frase:'LAM'}]},
      {tipo:'escolha', id:'pp-c-vacina', rot:'Vacinas que faltaram na gestação (até 45 dias)', na:'vacinas', opts:[
        {v:'hoje', rot:'atualizadas hoje', frase:'vacinas que faltaram na gestação atualizadas'},
        {v:'sala', rot:'à sala de vacina', frase:'encaminho à sala de vacina'},
        {v:'dia', rot:'já em dia', frase:'vacinas em dia'}]},
      {tipo:'escolha', id:'pp-c-ferro', rot:'Ferro até o 3º mês pós-parto', na:'ferro', opts:[
        {v:'s', rot:'mantido', frase:'mantenho ferro até o 3º mês pós-parto'}]},
      {tipo:'escolha', id:'pp-c-alarme', rot:'Sinais de alarme da mãe e do bebê', na:'sinais de alarme', lacuna:false, opts:[
        {v:'s', rot:'orientada', frase:'oriento sinais de alarme da mãe e do bebê'}]},
      {tipo:'escolha', id:'pp-c-humor', rot:'Blues ou depressão pós-parto', na:'conduta de humor', lacuna:false, opts:[
        {v:'blues', rot:'blues: rever em 10 dias', frase:'blues puerperal: acolho e revejo nos primeiros 10 dias'},
        {v:'dpp', rot:'depressão: apoio matricial', frase:'depressão pós-parto: solicito apoio matricial em saúde mental, com a USF coordenando o cuidado'}]},
      {tipo:'escolha', id:'pp-c-dmg', rot:'Teve diabetes gestacional', na:'glicemia pós-parto', lacuna:false, opts:[
        {v:'s', rot:'glicemia ou TOTG a partir de 6 semanas', frase:'solicito glicemia de jejum ou TOTG a partir de 6 semanas do parto, por diabetes gestacional'}]},
      {tipo:'escolha', id:'pp-c-testes', rot:'Não testada para sífilis e HIV na gestação nem no parto', na:'testes de sífilis e HIV', lacuna:false, opts:[
        {v:'s', rot:'testada hoje', frase:'realizo testes de sífilis e HIV'}]},
      {tipo:'escolha', id:'pp-c-pontos', rot:'Pontos da cesárea (7 a 10 dias)', na:'pontos da cesárea', lacuna:false, opts:[
        {v:'retirados', rot:'retirados', frase:'retiro os pontos da cesárea'},
        {v:'agenda', rot:'retirada agendada', frase:'agendo a retirada dos pontos da cesárea'}]}
    ]}
  }
});

/* ---------- planejamento reprodutivo ---------- */
QUADROS.push({
  id: 'planejamento', nome: 'Planejamento reprodutivo', queixa: 'planejamento-reprodutivo',
  fonte: 'MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025',
  ciap: ['W14', 'W11', 'W12', 'W10'], cid: ['Z30'],
  blocos: {
    anamnese: { rot: 'Planejamento reprodutivo — anamnese', itens: [
      {tipo:'escolha', id:'pl-desejo', rot:'O que deseja agora', na:'desejo reprodutivo', opts:[
        {v:'evitar', rot:'evitar gravidez', frase:'deseja evitar gravidez'},
        {v:'espacar', rot:'adiar ou espaçar', frase:'deseja adiar ou espaçar a gravidez'},
        {v:'planejar', rot:'planejar gravidez', frase:'deseja planejar gravidez'}]},
      {tipo:'data', id:'pl-dum', rot:'DUM', fmt:'DUM {v}', na:'DUM', junto:true},
      {tipo:'tri', id:'pl-desprot', rot:'Relação sem proteção desde a DUM', na:'relação sem proteção', junto:true,
        sim:'relação sem proteção desde a DUM[: {d}]', nao:'nega relação sem proteção desde a DUM', det:{tipo:'texto', ph:'quando (nos últimos 5 dias?)'}},
      {tipo:'texto', id:'pl-previos', rot:'Métodos já usados: o que funcionou, efeito adverso, por que parou', ph:'pílula por 2 anos, parou por cefaleia', fmt:'métodos prévios: {v}'},
      {tipo:'tri', id:'pl-amamenta', rot:'Amamentando, ou parto ou aborto recente', na:'amamentação e parto recente',
        sim:'amamentando ou com parto ou aborto recente[: {d}]', nao:'nega amamentação e parto ou aborto recente', det:{tipo:'texto', ph:'há quanto tempo'}},
      {tipo:'tri', id:'pl-enxaqueca', rot:'Enxaqueca (com ou sem aura)', na:'enxaqueca', junto:true,
        sim:'refere enxaqueca[ {d}]', nao:'nega enxaqueca', det:{tipo:'escolha', opts:[{v:'aura', rot:'com aura', frase:'com aura'}, {v:'sem', rot:'sem aura', frase:'sem aura'}]}},
      {tipo:'tri', id:'pl-estrogenio', rot:'HAS, AVC, infarto, TVP/TEP (própria ou em parente de 1º grau), DM com lesão de órgão ou câncer de mama', na:'condições que restringem estrogênio', junto:true,
        sim:'refere {d}', simSemDet:'refere condição que restringe estrogênio', nao:'nega HAS, AVC, infarto, TVP/TEP, DM com lesão de órgão e câncer de mama', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'pl-interacao', rot:'Anticonvulsivante, rifampicina ou antirretroviral em uso', na:'fármacos que interagem', junto:true,
        sim:'em uso de {d}', simSemDet:'em uso de anticonvulsivante, rifampicina ou antirretroviral', nao:'nega uso de anticonvulsivante, rifampicina ou antirretroviral', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'pl-sangramento', rot:'Dispareunia, sangramento pós-coito ou fora do ciclo', na:'dispareunia e sangramento anormal', junto:true,
        sim:'refere {d}', simSemDet:'refere dispareunia ou sangramento anormal', nao:'nega dispareunia e sangramento pós-coito ou fora do ciclo',
        det:{tipo:'escolha', multi:true, opts:[{v:'disp', rot:'dispareunia', frase:'dispareunia'}, {v:'poscoito', rot:'sangramento pós-coito', frase:'sangramento pós-coito'}, {v:'fora', rot:'fora do ciclo', frase:'sangramento fora do ciclo'}]}},
      {tipo:'tri', id:'pl-ist', rot:'Antecedente de IST', na:'antecedente de IST', junto:true, sim:'antecedente de IST[: {d}]', nao:'nega antecedente de IST', det:{tipo:'texto', ph:'qual, quando'}}
    ]},
    ef: { rot: 'Planejamento reprodutivo — exame conforme o método', itens: [
      {tipo:'escolha', id:'pl-trg', rot:'Teste rápido de gravidez (sem certeza razoável de não gravidez)', na:'teste de gravidez', lacuna:false, opts:[
        {v:'neg', rot:'negativo', frase:'teste rápido de gravidez negativo'},
        {v:'pos', rot:'positivo', frase:'teste rápido de gravidez positivo'}]},
      {tipo:'escolha', id:'pl-especular', rot:'Especular antes do DIU', na:'especular', lacuna:false, opts:[
        {v:'ok', rot:'sem cervicite ou sinal de DIP', frase:'especular sem cervicite purulenta ou sinal de DIP'},
        {v:'alt', rot:'cervicite ou sinal de DIP', frase:'cervicite purulenta ou sinal de DIP ao especular'}]},
      {tipo:'escolha', id:'pl-fios', rot:'Usuária de DIU: fios no canal cervical', na:'fios do DIU', lacuna:false, opts:[
        {v:'vistos', rot:'visíveis', frase:'fios do DIU visíveis no canal cervical'},
        {v:'ausentes', rot:'não visíveis', frase:'fios do DIU não visíveis'}]}
    ]},
    conduta: { rot: 'Planejamento reprodutivo — conduta', itens: [
      {tipo:'escolha', id:'pl-c-metodo', rot:'Método escolhido', na:'método escolhido', multi:true, tpl:'método escolhido: {d}', opts:[
        {v:'aoc', rot:'pílula combinada', frase:'pílula combinada'},
        {v:'mini', rot:'minipílula', frase:'minipílula'},
        {v:'mensal', rot:'injetável mensal', frase:'injetável mensal'},
        {v:'trim', rot:'injetável trimestral', frase:'injetável trimestral'},
        {v:'diu', rot:'DIU de cobre', frase:'DIU de cobre'},
        {v:'implante', rot:'implante', frase:'implante'},
        {v:'preserv', rot:'preservativo', frase:'preservativo'},
        {v:'diafragma', rot:'diafragma', frase:'diafragma'}]},
      {tipo:'escolha', id:'pl-c-oms', rot:'Critérios de elegibilidade da OMS para o método', na:'elegibilidade (OMS)', opts:[
        {v:'12', rot:'categoria 1 ou 2', frase:'método em categoria 1 ou 2 dos critérios de elegibilidade da OMS'},
        {v:'3', rot:'categoria 3 (sem alternativa aceitável)', frase:'método em categoria 3 da OMS, sem alternativa aceitável, com acompanhamento'}]},
      {tipo:'escolha', id:'pl-c-informada', rot:'Escolha informada', na:'escolha informada', lacuna:false, opts:[
        {v:'s', rot:'eficácia, uso, efeitos e contraindicações', frase:'apresento eficácia, forma de uso, efeitos adversos e contraindicações dos métodos'}]},
      {tipo:'escolha', id:'pl-c-dupla', rot:'Dupla proteção (só o preservativo protege de IST)', na:'dupla proteção', lacuna:false, opts:[
        {v:'s', rot:'orientada, preservativos entregues', frase:'oriento dupla proteção e entrego preservativos'}]},
      {tipo:'escolha', id:'pl-c-inicio', rot:'Início do método hormonal', na:'início do método', lacuna:false, opts:[
        {v:'ciclo', rot:'1º ao 5º dia do ciclo', frase:'início entre o 1º e o 5º dia do ciclo'},
        {v:'apoio', rot:'fora do início do ciclo: apoio por 7 dias', frase:'início fora do começo do ciclo, com método de apoio por 7 dias'}]},
      {tipo:'escolha', id:'pl-c-ae', rot:'Contracepção de emergência (relação desprotegida nos últimos 5 dias)', na:'contracepção de emergência', lacuna:false, opts:[
        {v:'lng', rot:'levonorgestrel', frase:'oferto levonorgestrel de emergência'},
        {v:'diu', rot:'DIU de cobre', frase:'indico DIU de cobre como contracepção de emergência'}]},
      {tipo:'escolha', id:'pl-c-gravidez', rot:'Planejando gravidez', na:'planejamento da gravidez', lacuna:false, opts:[
        {v:'s', rot:'ácido fólico e sorologias do casal', frase:'planejando gravidez: oriento ácido fólico desde 30 dias antes da concepção e solicito sorologias do casal'}]},
      {tipo:'escolha', id:'pl-c-definitivo', rot:'Laqueadura ou vasectomia', na:'método definitivo', lacuna:false, opts:[
        {v:'s', rot:'orientado e encaminhado', frase:'oriento a baixa reversibilidade, ofereço métodos reversíveis e encaminho ao serviço de referência para laqueadura ou vasectomia'}]},
      {tipo:'escolha', id:'pl-c-porta', rot:'Retorno se problema, dúvida ou desejo de trocar', na:'porta aberta', lacuna:false, opts:[
        {v:'s', rot:'orientado', frase:'oriento retornar se houver problema, dúvida, desejo de trocar de método ou suspeita de gravidez'}]}
    ]}
  }
});

/* ---------- climatério ---------- */
QUADROS.push({
  id: 'climaterio', nome: 'Climatério', queixa: 'climaterio', grupo: 'outros',
  fonte: 'MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026 · MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025',
  ciap: ['X11', 'X12'], cid: ['N95'],
  blocos: {
    anamnese: { rot: 'Climatério — anamnese', itens: [
      {tipo:'texto', id:'cl-menstruacao', rot:'Última menstruação e ciclo (intervalo, volume, duração)', ph:'há 14 meses; antes, ciclos de 40 a 60 dias', fmt:'última menstruação: {v}', na:'última menstruação'},
      {tipo:'tri', id:'cl-fogacho', rot:'Fogacho ou suor noturno', na:'fogacho', junto:true,
        sim:'refere fogachos[: {d}]', nao:'nega fogacho e suor noturno', det:{tipo:'texto', ph:'frequência, intensidade, quanto atrapalha sono e trabalho'}},
      {tipo:'tri', id:'cl-humor', rot:'Sono, humor, irritabilidade, memória ou concentração alterados', na:'sono, humor e memória', junto:true,
        sim:'refere {d}', simSemDet:'refere alteração de sono, humor, memória ou concentração', nao:'nega alteração de sono, humor, memória e concentração',
        det:{tipo:'escolha', multi:true, opts:[{v:'sono', rot:'sono', frase:'alteração do sono'}, {v:'humor', rot:'humor', frase:'alteração de humor'},
          {v:'irrit', rot:'irritabilidade', frase:'irritabilidade'}, {v:'memoria', rot:'memória ou concentração', frase:'queixa de memória ou concentração'}]}},
      {tipo:'tri', id:'cl-gu', rot:'Ressecamento vaginal, dispareunia, prurido, disúria, urgência ou ITU de repetição', na:'queixas geniturinárias', junto:true,
        sim:'refere {d}', simSemDet:'refere queixa geniturinária', nao:'nega ressecamento vaginal, dispareunia, prurido e queixas urinárias',
        det:{tipo:'escolha', multi:true, opts:[{v:'resseca', rot:'ressecamento vaginal', frase:'ressecamento vaginal'}, {v:'disp', rot:'dispareunia', frase:'dispareunia'},
          {v:'prurido', rot:'prurido', frase:'prurido vulvar'}, {v:'disuria', rot:'disúria', frase:'disúria'}, {v:'urgencia', rot:'urgência', frase:'urgência urinária'},
          {v:'itu', rot:'ITU de repetição', frase:'infecção urinária de repetição'}]}},
      {tipo:'tri', id:'cl-sexualidade', rot:'Queixa de sexualidade ou desejo', na:'sexualidade', junto:true,
        sim:'refere queixa de sexualidade[: {d}]', nao:'nega queixa de sexualidade', det:{tipo:'texto', ph:'o quê'}},
      {tipo:'tri', id:'cl-sangra', rot:'Sangramento após 12 meses sem menstruar', na:'sangramento pós-menopausa', junto:true,
        sim:'refere sangramento após 12 meses de amenorreia', nao:'nega sangramento após 12 meses de amenorreia'},
      {tipo:'texto', id:'cl-metodo', rot:'Método contraceptivo (na transição ainda há risco de gravidez)', ph:'DIU de cobre', fmt:'contracepção: {v}'},
      {tipo:'tri', id:'cl-th', rot:'Tromboembolismo, AVC, infarto, câncer de mama ou de endométrio, doença hepática', na:'contraindicações à terapia hormonal',
        sim:'refere {d}', simSemDet:'refere antecedente que pesa na terapia hormonal', nao:'nega tromboembolismo, AVC, infarto, câncer de mama ou de endométrio e doença hepática',
        det:{tipo:'texto', ph:'qual'}},
      {tipo:'texto', id:'cl-rastreio', rot:'Último citopatológico ou DNA-HPV e última mamografia', ph:'DNA-HPV negativo há 2 anos; mamografia há 1 ano', fmt:'rastreamento: {v}', na:'último rastreamento'},
      {tipo:'tri', id:'cl-queda', rot:'Risco de queda: casa, psicotrópico, anti-hipertensivo, visão, audição', na:'risco de queda',
        sim:'fator de risco para queda[: {d}]', nao:'sem fator de risco para queda', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'cl-sobrecarga', rot:'Sobrecarga de cuidado, relação conflituosa ou violência', na:'rede de apoio e violência',
        sim:'refere {d}', simSemDet:'refere sobrecarga, conflito ou violência', nao:'nega sobrecarga de cuidado, conflito e violência', det:{tipo:'texto', ph:'o quê'}},
      {tipo:'texto', id:'cl-expectativa', rot:'O que sabe, teme e espera da menopausa e do tratamento', fmt:'expectativas: {v}'}
    ]},
    ef: { rot: 'Climatério — exame orientado pela queixa', itens: [
      {tipo:'texto', id:'cl-rcv', rot:'Risco cardiovascular estimado', ph:'baixo', fmt:'risco cardiovascular {v}'},
      {tipo:'escolha', id:'cl-mamas', rot:'Exame das mamas (se feito)', na:'exame das mamas', lacuna:false, multi:true, tpl:'mamas: {d}', opts:[
        {v:'ok', rot:'sem alterações', frase:'sem nódulo, retração ou descarga papilar', so:true},
        {v:'nodulo', rot:'nódulo', frase:'nódulo'},
        {v:'retracao', rot:'retração de pele ou mamilo', frase:'retração de pele ou mamilo'},
        {v:'descarga', rot:'descarga papilar', frase:'descarga papilar'}]},
      {tipo:'escolha', id:'cl-especular', rot:'Especular (se feito)', na:'especular', lacuna:false, multi:true, tpl:'especular: {d}', opts:[
        {v:'ok', rot:'sem atrofia ou prolapso', frase:'sem atrofia ou prolapso', so:true},
        {v:'atrofia', rot:'mucosa delgada e seca', frase:'mucosa delgada e seca'},
        {v:'prolapso', rot:'prolapso', frase:'prolapso'}]}
    ]},
    conduta: { rot: 'Climatério — conduta', itens: [
      {tipo:'escolha', id:'cl-c-diag', rot:'Diagnóstico', na:'diagnóstico clínico', opts:[
        {v:'s', rot:'clínico, sem dosagem hormonal', frase:'diagnóstico clínico, sem dosagem hormonal de rotina'}]},
      {tipo:'escolha', id:'cl-c-orienta', rot:'Orientações', na:'orientações', lacuna:false, multi:true, tpl:'oriento sobre {d}', opts:[
        {v:'fogacho', rot:'medidas para o fogacho', frase:'medidas não farmacológicas para o fogacho'},
        {v:'sono', rot:'higiene do sono', frase:'higiene do sono'},
        {v:'gu', rot:'lubrificante e hidratante vaginal', frase:'lubrificante e hidratante vaginal'},
        {v:'ativ', rot:'atividade física e fortalecimento', frase:'atividade física aeróbica e fortalecimento'},
        {v:'osso', rot:'saúde óssea e prevenção de queda', frase:'saúde óssea e prevenção de queda'},
        {v:'contracep', rot:'contracepção até a menopausa', frase:'contracepção até a menopausa'}]},
      {tipo:'escolha', id:'cl-c-th', rot:'Terapia hormonal', na:'terapia hormonal', opts:[
        {v:'sem', rot:'sem indicação', frase:'sem indicação de terapia hormonal'},
        {v:'contra', rot:'contraindicada', frase:'terapia hormonal contraindicada'},
        {v:'inicia', rot:'iniciada em decisão compartilhada', frase:'inicio terapia hormonal em decisão compartilhada, após avaliar contraindicações'},
        {v:'segue', rot:'em uso: reavaliada', frase:'em terapia hormonal, reavalio adesão, efeitos adversos, sangramento, PA e peso'}]},
      {tipo:'escolha', id:'cl-c-vaginal', rot:'Queixa geniturinária persistente', na:'estrogênio vaginal', lacuna:false, opts:[
        {v:'s', rot:'estrogênio vaginal', frase:'indico estrogênio vaginal para queixa geniturinária persistente'}]},
      {tipo:'escolha', id:'cl-c-mamografia', rot:'Mamografia (50 a 74 anos, a cada 2 anos)', na:'mamografia', opts:[
        {v:'sol', rot:'solicitada', frase:'solicito mamografia de rastreamento'},
        {v:'dia', rot:'em dia', frase:'mamografia de rastreamento em dia'},
        {v:'conversa', rot:'40 a 49 ou mais de 74: conversado', frase:'converso riscos e benefícios da mamografia fora da faixa de rastreamento'}]},
      {tipo:'escolha', id:'cl-c-colo', rot:'Colo do útero (DNA-HPV de 25 a 64 anos)', na:'rastreamento do colo', opts:[
        {v:'colhido', rot:'colhido hoje', frase:'colho o rastreamento do colo do útero'},
        {v:'dia', rot:'em dia', frase:'rastreamento do colo do útero em dia'},
        {v:'fora', rot:'fora da faixa', frase:'fora da faixa de rastreamento do colo do útero'}]},
      {tipo:'escolha', id:'cl-c-sangra', rot:'Sangramento pós-menopausa', na:'sangramento pós-menopausa', lacuna:false, opts:[
        {v:'s', rot:'USG transvaginal', frase:'sangramento pós-menopausa: solicito USG transvaginal'}]}
    ]}
  }
});

/* quadros-b.js — agente quadros B (F3 da onda APS I), 26/10/2026
 * Quadros: has-dm, idoso, saude-mental, rastreamento, visita-domiciliar, paliativos, ist, tuberculose,
 * hanseniase, prep-pep. Cada item sai de um item da queixa do copiloto indicada em `queixa`.
 *
 * Convenções deste arquivo:
 * - `lacuna: false` só em dois casos: (a) pergunta que vale para um subgrupo (mulher em idade fértil, quem usa
 *   insulina, quem está em tratamento de TB ou de hanseníase, PEP e não PrEP), em que "não avaliado" seria falso
 *   para os demais; (b) ação opcional da conduta (pedido de exame, encaminhamento, orientação), em que intocado
 *   quer dizer "não feito", não "não avaliado".
 * - No exame físico, achado que só se procura em parte dos pacientes (pés no DM, especular, CAM, teste do
 *   sussurro) é `escolha`, não ✗/✓: o atalho "Sem alterações nos achados dos quadros" marca ✗ em todo tri
 *   visível e escreveria "sem alteração" num exame que não foi feito.
 * - Campo de medida ou de escore digitado (PHQ-9, IVCF-20, PAINAD, marcha, panturrilha) não tem `na`: fica
 *   fora do texto quando vazio. A página não calcula escore nenhum.
 * - Os itens só do DM no quadro HAS / DM (hipoglicemia, pés, controle glicêmico) ficam com lacuna: no
 *   hipertenso sem DM saem como "não avaliado". Escolha consciente: esquecer os pés do diabético é o erro que
 *   a queixa has-dm2-aps nomeia. */

/* ---------- perguntas compartilhadas (mesmo id, mesmo objeto) ---------- */

/* ef — has-dm, tuberculose */
const AUSC_PULM = { tipo:'tri', id:'hd-ap', rot:'Alteração na ausculta pulmonar', na:'ausculta pulmonar', junto:true,
  sim:'ausculta pulmonar alterada[: {d}]', nao:'ausculta pulmonar sem alterações', det:{tipo:'texto', ph:'o quê, onde'} };
/* ef — has-dm, idoso */
const EDEMA = { tipo:'tri', id:'hd-edema', rot:'Edema de membros inferiores', na:'edema', junto:true,
  sim:'edema de membros inferiores[: {d}]', nao:'sem edema de membros inferiores', det:{tipo:'texto', ph:'até onde, cacifo, uni ou bilateral'} };
const PULSOS = { tipo:'tri', id:'hd-pulsos', rot:'Pulsos periféricos diminuídos, ausentes ou assimétricos (radial × femoral; pés)', na:'pulsos periféricos', junto:true,
  sim:'pulsos periféricos alterados[: {d}]', nao:'pulsos periféricos palpáveis e simétricos', det:{tipo:'texto', ph:'qual, lado'} };
const PES = { tipo:'escolha', id:'hd-pes', rot:'Pés: feridas, calos, unhas, deformidade, calçado', na:'inspeção dos pés', multi:true, opts:[
  {v:'ok', rot:'sem alterações', frase:'pés sem feridas, calos, alteração de unhas ou deformidade, com calçado adequado', so:true},
  {v:'ferida', rot:'ferida ou úlcera', frase:'ferida nos pés'}, {v:'calo', rot:'calo', frase:'calosidade nos pés'},
  {v:'unha', rot:'unhas alteradas', frase:'alteração das unhas dos pés'}, {v:'deformidade', rot:'deformidade', frase:'deformidade nos pés'},
  {v:'calcado', rot:'calçado inadequado', frase:'calçado inadequado'}] };

/* anamnese — idoso, visita domiciliar */
const QUEDAS = { tipo:'tri', id:'id-quedas', rot:'Queda no último ano (quantas, como, onde, fazendo o quê)', na:'quedas',
  sim:'queda no último ano[: {d}]', nao:'nega queda no último ano', det:{tipo:'texto', ph:'quantas, como, onde, fazendo o quê; conseguiu levantar?'} };
const PERDA_PESO = { tipo:'tri', id:'id-peso', rot:'Perda de peso não intencional (4,5 kg ou 5% no ano, 6 kg em 6 meses, 3 kg no mês)', na:'perda de peso',
  sim:'perda de peso não intencional[: {d}]', nao:'nega perda de peso não intencional', det:{tipo:'texto', ph:'quanto, em quanto tempo'} };
const ENGASGO = { tipo:'tri', id:'id-engasgo', rot:'Engasgo ao comer ou beber, sobretudo líquido', na:'engasgo', junto:true,
  sim:'engasgos ao comer ou beber[: {d}]', nao:'nega engasgos ao comer ou beber', det:{tipo:'texto', ph:'com o quê, com que frequência'} };
/* ef — idoso, visita domiciliar. A suspeita já obriga a notificar (CAB nº 19): a notificação é sub do achado. */
const NEGLIGENCIA = { tipo:'tri', id:'id-negligencia', rot:'Sinais de violência ou negligência (lesão sem explicação, higiene precária, falta de comida, medicação dada errada)', na:'sinais de violência ou negligência',
  sim:'sinais de violência ou negligência[: {d}]', nao:'sem sinais de violência ou negligência ao exame', det:{tipo:'texto', ph:'o quê'}, sub:[
    { id:'id-negligencia-notifica', rot:'Notificação feita (a suspeita já obriga; ficha do Sinan)', na:'notificação de violência',
      sim:'notificação de violência feita', nao:'notificação de violência pendente' }] };
const DESIDRAT = { tipo:'tri', id:'id-desidrat', rot:'Sinais de desidratação ou desnutrição', na:'hidratação e nutrição', junto:true,
  sim:'sinais de {d}', simSemDet:'sinais de desidratação ou desnutrição', nao:'sem sinais de desidratação ou desnutrição',
  det:{tipo:'escolha', multi:true, opts:[{v:'desidratacao', rot:'desidratação'}, {v:'desnutricao', rot:'desnutrição'}]} };
/* conduta — idoso, visita domiciliar */
const CASA_SEGURA = { tipo:'escolha', id:'id-casa', rot:'Casa segura contra quedas', lacuna:false, opts:[
  {v:'orientada', rot:'orientada', frase:'oriento casa segura: chão livre, tapetes fixos ou retirados, luz nos cômodos e na escada, barra e piso antiderrapante no banheiro, corrimão dos dois lados, banho sentado se instável, banheiro sem tranca'}] };

/* anamnese — visita domiciliar, paliativos */
const CUIDADOR = { tipo:'texto', id:'vd-cuidador', rot:'Cuidador principal e quem reveza com ele', na:'cuidador principal',
  ph:'a filha; reveza com o neto nos fins de semana', fmt:'cuidador principal: {v}' };
const SOBRECARGA = { tipo:'tri', id:'vd-sobrecarga', rot:'Cuidador sobrecarregado (cansaço, adoecimento, sem com quem dividir)', na:'sobrecarga do cuidador',
  sim:'cuidador com sinais de sobrecarga[: {d}]', nao:'cuidador nega sobrecarga', det:{tipo:'texto', ph:'o quê; Zarit, se aplicado'} };
const SABE_LIGAR = { tipo:'tri', id:'vd-sabe-ligar', rot:'Cuidador sabe o que fazer e para quem ligar se piorar', na:'plano para piora',
  sim:'cuidador sabe o que fazer e para quem ligar se piorar', nao:'cuidador não sabe o que fazer nem para quem ligar se piorar' };
const DOR = { tipo:'tri', id:'vd-dor', rot:'Dor (onde, nota de 0 a 10, como é, o que piora e alivia, remédio já usado)', na:'dor',
  sim:'refere dor[: {d}]', nao:'nega dor', det:{tipo:'texto', ph:'onde, nota, queimação ou choque, o que piora e alivia, remédio usado'} };
const CONSTIPACAO = { tipo:'tri', id:'vd-constipacao', rot:'Constipação (frequência, esforço, fezes endurecidas, evacuação incompleta; última evacuação)', na:'constipação',
  sim:'constipação[: {d}]', nao:'nega constipação', det:{tipo:'texto', ph:'última evacuação, frequência'} };
/* ef — visita domiciliar, paliativos */
const LPP = { tipo:'tri', id:'vd-lpp', rot:'Lesão por pressão (sacro, ísquios, trocânteres, escápulas, occipital, calcâneos, orelhas; sob sonda, cateter ou fralda)', na:'pele das proeminências',
  sim:'lesão por pressão[: {d}]', nao:'sem lesão por pressão nas proeminências e sob dispositivos',
  det:{tipo:'texto', ph:'onde, tamanho, aspecto; sinal de infecção; lesão de fim de vida?'} };
const PAINAD = { tipo:'texto', id:'vd-painad', rot:'PAINAD em quem não fala (pontuação, 5 minutos de observação)', curto:true, ph:'0 a 10', fmt:'escala PAINAD: {v} pontos' };
const CAM = { tipo:'escolha', id:'vd-cam', rot:'CAM: início agudo ou flutuação e desatenção, mais pensamento desorganizado ou alteração da consciência', na:'CAM', opts:[
  {v:'neg', rot:'sem critérios', frase:'sem critérios de delirium pelo CAM'},
  {v:'pos', rot:'com critérios de delirium', frase:'critérios de delirium pelo CAM presentes'}] };
const ABDOME = { tipo:'tri', id:'vd-abdome', rot:'Distensão abdominal, fecaloma ou globo vesical', na:'abdome e bexiga',
  sim:'{d}', simSemDet:'distensão abdominal, fecaloma ou globo vesical', nao:'sem distensão abdominal, fecaloma ou globo vesical',
  det:{tipo:'escolha', multi:true, opts:[{v:'distensao', rot:'distensão abdominal'}, {v:'fecaloma', rot:'fecaloma'}, {v:'globo', rot:'globo vesical'}]} };

/* anamnese — ist, prep-pep */
const IS_PRATICAS = { tipo:'escolha', id:'is-praticas', rot:'Práticas nos últimos 3 meses (define onde colher)', na:'práticas sexuais', multi:true,
  tpl:'práticas sexuais nos últimos 3 meses: {d}', opts:[
  {v:'vaginal', rot:'vaginal'}, {v:'anal-rec', rot:'anal receptiva'}, {v:'anal-ins', rot:'anal insertiva'}, {v:'oral', rot:'oral'}] };
const IS_PRESERVATIVO = { tipo:'escolha', id:'is-preservativo', rot:'Preservativo', na:'uso de preservativo', junto:true, opts:[
  {v:'sempre', rot:'usa sempre', frase:'uso regular de preservativo'}, {v:'irregular', rot:'às vezes', frase:'uso irregular de preservativo'},
  {v:'nunca', rot:'não usa', frase:'não usa preservativo'}] };
const IS_SUBSTANCIAS = { tipo:'tri', id:'is-substancias', rot:'Álcool ou drogas no sexo; já trocou sexo por dinheiro, drogas ou moradia', na:'álcool ou drogas no sexo e sexo transacional', junto:true,
  sim:'refere álcool ou drogas no sexo ou sexo em troca de dinheiro, drogas ou moradia[: {d}]', nao:'nega álcool ou drogas no sexo e sexo em troca de dinheiro, drogas ou moradia',
  det:{tipo:'texto', ph:'o quê; compartilha seringa?'} };
/* anamnese — saude-mental, ist, prep-pep (só vale para quem pode engravidar) */
const GRAVIDEZ = { tipo:'tri', id:'sm-gravidez', rot:'Gestante ou possibilidade de gravidez (DUM, atraso menstrual, método contraceptivo)', na:'possibilidade de gravidez', lacuna:false,
  sim:'gestante ou com possibilidade de gravidez[: {d}]', nao:'sem possibilidade de gravidez', det:{tipo:'texto', ph:'DUM, atraso, método'} };

/* ---------- 1. HAS / DM ---------- */
QUADROS.push({
  id: 'has-dm', nome: 'HAS / DM', queixa: 'has-dm2-aps',
  fonte: 'MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · MS — CAB nº 36, Diabetes Mellitus, 2013',
  ciap: ['K86', 'K87', 'T90'], cid: ['I10', 'E11'],
  blocos: {
    anamnese: { rot: 'HAS / DM — controle', itens: [
      { tipo:'tri', id:'hd-adesao', rot:'Esqueceu doses na última semana (perguntar sem julgamento)', na:'adesão',
        sim:'refere doses esquecidas na última semana[: {d}]', nao:'nega doses esquecidas na última semana', det:{tipo:'texto', ph:'quantas, de qual remédio'} },
      { tipo:'tri', id:'hd-loa', rot:'Dor torácica, dispneia aos esforços, edema, claudicação, alteração visual ou déficit neurológico', na:'sintomas de lesão de órgão-alvo',
        sim:'refere {d}', simSemDet:'refere sintomas de lesão de órgão-alvo',
        nao:'nega dor torácica, dispneia aos esforços, edema, claudicação, alteração visual e déficit neurológico',
        det:{tipo:'escolha', multi:true, opts:[{v:'dor', rot:'dor torácica'}, {v:'dispneia', rot:'dispneia aos esforços'}, {v:'edema', rot:'edema'},
          {v:'claudicacao', rot:'claudicação'}, {v:'visual', rot:'alteração visual'}, {v:'neuro', rot:'déficit neurológico ou confusão'}]} },
      { tipo:'tri', id:'hd-hipo', rot:'DM: hipoglicemia (tremor, sudorese, confusão, fome súbita), inclusive à noite', na:'hipoglicemia', junto:true,
        sim:'refere hipoglicemia[: {d}]', nao:'nega sintomas de hipoglicemia', det:{tipo:'texto', ph:'quantas vezes, à noite, precisou de ajuda, valor medido'} },
      { tipo:'tri', id:'hd-neuropatia', rot:'DM: dormência, queimação ou formigamento nos pés', na:'sintomas de neuropatia', junto:true,
        sim:'refere dormência, queimação ou formigamento nos pés', nao:'nega dormência, queimação ou formigamento nos pés' },
      { tipo:'tri', id:'hd-hgt', rot:'Em insulina: mede a glicemia capilar em casa e traz as anotações', na:'glicemia capilar domiciliar', lacuna:false,
        sim:'realiza glicemia capilar domiciliar[: {d}]', nao:'não realiza glicemia capilar domiciliar', det:{tipo:'texto', ph:'traz anotações? valores, horários'} },
      { tipo:'tri', id:'hd-elevapa', rot:'Anti-inflamatório, corticoide, descongestionante nasal, anticoncepcional oral ou outra substância que eleva a PA', na:'substâncias que elevam a PA',
        sim:'uso de substância que eleva a PA[: {d}]', nao:'nega uso de anti-inflamatório, corticoide, descongestionante, anticoncepcional oral ou outra substância que eleva a PA',
        det:{tipo:'texto', ph:'qual (também tricíclico, hormônio tireoidiano, cocaína, anfetamina)'} },
      { tipo:'tri', id:'hd-secundaria', rot:'Pistas de HAS secundária: ronco com sonolência diurna, crises de cefaleia com sudorese e palpitação, fraqueza ou cãibras, edema pulmonar súbito', na:'sintomas de HAS secundária',
        sim:'refere {d}', simSemDet:'refere sintomas sugestivos de HAS secundária',
        nao:'nega ronco com sonolência diurna, crises de cefaleia com sudorese e palpitação, fraqueza muscular, cãibras e edema pulmonar súbito',
        det:{tipo:'escolha', multi:true, opts:[{v:'ronco', rot:'ronco com sonolência diurna'},
          {v:'cefaleia', rot:'cefaleia com sudorese e palpitação', frase:'crises de cefaleia com sudorese e palpitação'},
          {v:'fraqueza', rot:'fraqueza, cãibras ou tetania', frase:'fraqueza muscular, cãibras ou tetania'}, {v:'eap', rot:'edema pulmonar súbito'}]} },
      { tipo:'escolha', id:'hd-fertil', rot:'Mulher em idade fértil: contracepção e plano de gravidez (IECA e BRA dependem disso)', na:'contracepção', lacuna:false, opts:[
        {v:'contracepcao', rot:'contracepção confiável', frase:'em uso de contracepção confiável'},
        {v:'sem', rot:'sem contracepção confiável', frase:'sem contracepção confiável'},
        {v:'planeja', rot:'planeja engravidar', frase:'planeja engravidar'}] },
      { tipo:'texto', id:'hd-alimentacao', rot:'Padrão alimentar', ph:'sal, açúcar, refeições do dia', fmt:'padrão alimentar: {v}' }
    ]},
    ef: { rot: 'HAS / DM — exame', itens: [
      { tipo:'tri', id:'hd-acv', rot:'Alteração na ausculta cardíaca', na:'ausculta cardíaca',
        sim:'ausculta cardíaca alterada[: {d}]', nao:'ausculta cardíaca sem alterações', det:{tipo:'texto', ph:'o quê'} },
      AUSC_PULM,
      { tipo:'tri', id:'hd-carotida', rot:'Sopro carotídeo', junto:true, sim:'sopro carotídeo[: {d}]', nao:'sem sopro carotídeo', det:{tipo:'texto', ph:'lado'} },
      EDEMA,
      PULSOS,
      { tipo:'texto', id:'hd-pa2', rot:'PA no outro braço (primeira consulta)', curto:true, ph:'130/80', fmt:'no outro braço, PA de {v} mmHg' },
      PES,
      { tipo:'escolha', id:'hd-pe-mono', rot:'DM — monofilamento nos pés', na:'monofilamento', opts:[
        {v:'ok', rot:'sensibilidade protetora preservada', frase:'sensibilidade protetora preservada ao monofilamento'},
        {v:'perda', rot:'perda da sensibilidade protetora', frase:'perda da sensibilidade protetora ao monofilamento'}] },
      { tipo:'escolha', id:'hd-pe-vibra', rot:'DM — diapasão de 128 Hz nos pés', na:'diapasão', opts:[
        {v:'ok', rot:'vibração preservada', frase:'sensibilidade vibratória preservada'},
        {v:'diminuida', rot:'vibração diminuída', frase:'sensibilidade vibratória diminuída'}] },
      { tipo:'escolha', id:'hd-pe-risco', rot:'DM — risco do pé (define o retorno)', na:'classificação de risco do pé', tpl:'pé de risco {d}', opts:[
        {v:'0', rot:'0', frase:'0'},
        {v:'1', rot:'1 — perda da sensibilidade protetora', frase:'1 (perda da sensibilidade protetora)'},
        {v:'2', rot:'2 — doença arterial periférica', frase:'2 (doença arterial periférica)'},
        {v:'3', rot:'3 — úlcera ou amputação prévia', frase:'3 (úlcera ou amputação prévia)'}] }
    ]},
    conduta: { rot: 'HAS / DM — conduta do controle', itens: [
      { tipo:'escolha', id:'hd-pa-meta', rot:'PA × meta (abaixo de 140/90; se tolerar, 130/80 abaixo dos 65 anos)', na:'PA em relação à meta', opts:[
        {v:'na', rot:'na meta', frase:'pressão arterial na meta'}, {v:'fora', rot:'fora da meta', frase:'pressão arterial fora da meta'}] },
      { tipo:'escolha', id:'hd-glic-meta', rot:'DM — controle × meta (HbA1c abaixo de 7%; no idoso, conforme a saúde)', na:'controle glicêmico', opts:[
        {v:'na', rot:'na meta', frase:'controle glicêmico na meta'}, {v:'fora', rot:'fora da meta', frase:'controle glicêmico fora da meta'},
        {v:'sem', rot:'sem HbA1c recente', frase:'sem hemoglobina glicada recente'}] },
      { tipo:'escolha', id:'hd-esquema', rot:'Medicações (ajustar só depois de conferir a adesão)', na:'conduta medicamentosa', opts:[
        {v:'mantido', rot:'mantidas', frase:'mantenho as medicações em uso'},
        {v:'ajustado', rot:'ajustadas, com adesão conferida', frase:'ajusto as medicações, com adesão conferida'},
        {v:'iniciado', rot:'início de tratamento', frase:'inicio tratamento medicamentoso'}] },
      { tipo:'texto', id:'hd-rcv', rot:'Risco cardiovascular pela calculadora HEARTS (anual, 40 a 74 anos)', curto:true, ph:'resultado da calculadora',
        fmt:'risco cardiovascular pela calculadora HEARTS: {v}' },
      { tipo:'escolha', id:'hd-exames', rot:'Exames de seguimento', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'has', rot:'HAS, anual', frase:'exames anuais da HAS (perfil lipídico, glicemia de jejum ou HbA1c, creatinina, potássio, urina e ECG)'},
        {v:'dm6', rot:'DM, semestral', frase:'glicemia de jejum e HbA1c'},
        {v:'dm12', rot:'DM, anual', frase:'exames anuais do DM (perfil lipídico, creatinina com TFG e relação albumina/creatinina em amostra)'},
        {v:'fo', rot:'fundo de olho', frase:'fundo de olho'}] },
      { tipo:'escolha', id:'hd-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'sal', rot:'sal: uma colher de chá rasa por dia', frase:'redução do sal, até uma colher de chá rasa por dia'},
        {v:'atividade', rot:'atividade física: 150 minutos por semana', frase:'atividade física moderada, ao menos 150 minutos por semana'},
        {v:'alcool', rot:'álcool: não há nível seguro', frase:'abstenção de álcool, sem nível seguro'},
        {v:'fumo', rot:'parar de fumar', frase:'cessação do tabagismo'},
        {v:'peso', rot:'DM: perder ao menos 5% do peso', frase:'perda de ao menos 5% do peso'},
        {v:'hipo', rot:'hipoglicemia: reconhecer e corrigir', frase:'reconhecimento e correção da hipoglicemia com carboidrato de absorção rápida e lanche antes de dormir'},
        {v:'alarme', rot:'sinais de alarme', frase:'sinais de alarme (dor torácica, falta de ar, déficit neurológico, confusão, perda súbita de visão)'}] }
    ]}
  }
});

/* ---------- 2. Pessoa idosa ---------- */
QUADROS.push({
  id: 'idoso', nome: 'Pessoa idosa', queixa: 'idoso-avaliacao',
  fonte: 'MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026',
  ciap: ['A98', 'A28'], cid: ['Z00', 'R54', 'W19'],
  blocos: {
    anamnese: { rot: 'Pessoa idosa — IVCF-20, quedas, remédios', itens: [
      {tipo:'texto', id:'id-ivcf', rot:'IVCF-20 (pontuação total)', curto:true, fmt:'IVCF-20: {v} pontos'},
      { tipo:'tri', id:'id-avd', rot:'Por causa da saúde, deixou de fazer compras, controlar o dinheiro, fazer serviço doméstico leve ou tomar banho sozinho', na:'atividades de vida diária',
        sim:'por causa da saúde, deixou de {d}', simSemDet:'refere perda de atividade de vida diária por causa da saúde',
        nao:'nega ter deixado de fazer compras, controlar o dinheiro, fazer serviço doméstico leve ou tomar banho sozinho',
        det:{tipo:'escolha', multi:true, opts:[{v:'compras', rot:'fazer compras'}, {v:'dinheiro', rot:'controlar o dinheiro ou pagar contas'},
          {v:'domestico', rot:'fazer serviço doméstico leve'}, {v:'banho', rot:'tomar banho sozinho'}]} },
      { tipo:'tri', id:'id-memoria', rot:'Esquecimento (alguém notou, piorando nos últimos meses, ou impede atividade do dia)', na:'esquecimento',
        sim:'refere esquecimento[ {d}]', nao:'nega esquecimento',
        det:{tipo:'escolha', multi:true, opts:[{v:'notado', rot:'notado por familiar ou amigo'}, {v:'piora', rot:'piorando nos últimos meses'},
          {v:'impede', rot:'que impede atividade do dia'}]} },
      { tipo:'tri', id:'id-humor', rot:'No último mês: desânimo, tristeza, desesperança ou perda de interesse ou prazer', na:'humor', junto:true,
        sim:'refere {d} no último mês', simSemDet:'refere alteração do humor no último mês',
        nao:'nega desânimo, tristeza, desesperança e perda de interesse ou prazer no último mês',
        det:{tipo:'escolha', multi:true, opts:[{v:'desanimo', rot:'desânimo, tristeza ou desesperança'}, {v:'anedonia', rot:'perda de interesse ou prazer'}]} },
      { tipo:'tri', id:'id-incontinencia', rot:'Perde urina ou fezes sem querer, mesmo pouco ou às vezes', na:'continência', junto:true,
        sim:'perda involuntária de {d}', simSemDet:'refere incontinência', nao:'nega perda involuntária de urina ou fezes',
        det:{tipo:'escolha', multi:true, opts:[{v:'urina', rot:'urina'}, {v:'fezes', rot:'fezes'}]} },
      QUEDAS,
      { tipo:'tri', id:'id-quedas-check', rot:'Check-up de quedas da Caderneta (p. 45) com algum SIM: bengala ou andador indicado, instável, segura nos móveis, medo de cair, usa as mãos para levantar, pressa para o banheiro, pés dormentes, remédio que dá tontura ou é para dormir', na:'check-up de quedas',
        sim:'check-up de quedas da caderneta com resposta positiva[: {d}]', nao:'check-up de quedas da caderneta sem resposta positiva', det:{tipo:'texto', ph:'quais'} },
      { tipo:'tri', id:'id-polifarmacia', rot:'Cinco ou mais medicamentos todo dia (contar os comprados por conta própria, chás, vitaminas e fitoterápicos)', na:'polifarmácia',
        sim:'polifarmácia, cinco ou mais medicamentos por dia[: {d}]', nao:'usa menos de cinco medicamentos por dia', det:{tipo:'texto', ph:'quantos; quais por conta própria'} },
      { tipo:'tri', id:'id-uso-remedios', rot:'Dificuldade para abrir, ler, lembrar, tomar vários de uma vez ou conseguir a tempo; muda o uso por conta própria', na:'dificuldade com os medicamentos', junto:true,
        sim:'dificuldade com os medicamentos[: {d}]', nao:'nega dificuldade com os medicamentos ou mudança do uso por conta própria', det:{tipo:'texto', ph:'qual'} },
      PERDA_PESO,
      { tipo:'tri', id:'id-alimentacao', rot:'Falta de apetite, dificuldade para mastigar, prótese folgada ou boca seca', na:'alimentação', junto:true,
        sim:'refere {d}', simSemDet:'refere dificuldade na alimentação', nao:'nega falta de apetite, dificuldade para mastigar, prótese folgada e boca seca',
        det:{tipo:'escolha', multi:true, opts:[{v:'apetite', rot:'falta de apetite'}, {v:'mastigar', rot:'dificuldade para mastigar'},
          {v:'protese', rot:'prótese folgada'}, {v:'boca', rot:'boca seca'}]} },
      ENGASGO,
      { tipo:'texto', id:'id-rede', rot:'Rede de apoio (mora só? viuvez no último ano? quem ajuda se adoecer? quem decide pela saúde dele se não puder? cuida de alguém dependente?)', na:'rede de apoio',
        ph:'mora com a filha; quem decide: a filha', fmt:'rede de apoio: {v}' },
      { tipo:'tri', id:'id-violencia', rot:'Violência no último ano, perguntado a sós (gritos sem razão, apelido que não gosta, dinheiro usado sem seguir suas instruções, ameaça)', na:'violência',
        sim:'refere violência no último ano[: {d}]', nao:'nega violência no último ano, perguntado sem acompanhante', det:{tipo:'texto', ph:'o quê, por quem'}, sub:[
          { id:'id-violencia-notifica', rot:'Notificação feita (ficha do Sinan) e rede acionada', na:'notificação de violência',
            sim:'notificação de violência feita', nao:'notificação de violência pendente' }] }
    ]},
    ef: { rot: 'Pessoa idosa — exame', itens: [
      { tipo:'escolha', id:'id-alcance', rot:'IVCF 12–13: mãos atrás da cabeça e segurar caneta ou moeda', na:'alcance e preensão', multi:true, opts:[
        {v:'ok', rot:'eleva e segura', frase:'eleva as mãos acima do ombro e segura caneta ou moeda', so:true},
        {v:'alcance', rot:'não eleva acima do ombro', frase:'não eleva as mãos acima do ombro'},
        {v:'preensao', rot:'não segura caneta ou moeda', frase:'não segura caneta ou moeda'}] },
      { tipo:'texto', id:'id-marcha', rot:'Velocidade da marcha: segundos para andar 4 metros (mais de 5 é menos de 0,8 m/s)', curto:true, ph:'4,5', fmt:'4 metros em {v} segundos' },
      { tipo:'texto', id:'id-panturrilha', rot:'Perímetro da panturrilha, em cm (abaixo de 31 sugere sarcopenia)', curto:true, ph:'33', fmt:'panturrilha de {v} cm' },
      { tipo:'texto', id:'id-pa-postural', rot:'PA deitado, sentado e em pé (hipotensão postural)', ph:'130/80, 125/80, 110/70', fmt:'pressão deitado, sentado e em pé: {v}' },
      { tipo:'escolha', id:'id-levantar', rot:'Levantar da cadeira, andar 3,5 m, voltar e sentar', na:'levantar e andar', opts:[
        {v:'ok', rot:'sem alteração', frase:'levanta, anda, volta e senta sem alteração'},
        {v:'alterado', rot:'com alteração (dor, força, equilíbrio, marcha)', frase:'alteração ao levantar e andar (dor, força, equilíbrio ou marcha)'},
        {v:'nao', rot:'não consegue', frase:'não consegue levantar e andar sem ajuda'}] },
      { tipo:'escolha', id:'id-sussurro', rot:'Teste do sussurro (sem resposta: otoscopia, cerume)', na:'teste do sussurro', multi:true, opts:[
        {v:'ok', rot:'responde dos dois lados', frase:'teste do sussurro normal', so:true},
        {v:'od', rot:'sem resposta à direita', frase:'sem resposta ao sussurro à direita'},
        {v:'oe', rot:'sem resposta à esquerda', frase:'sem resposta ao sussurro à esquerda'},
        {v:'cerume', rot:'cerume à otoscopia', frase:'cerume impactado à otoscopia'}] },
      { tipo:'texto', id:'id-jaeger', rot:'Se refere dificuldade para ler: cartão de Jaeger a 35 cm, com óculos (cada olho e os dois)', ph:'OD J2, OE J3, AO J2', fmt:'cartão de Jaeger com óculos: {v}' },
      { tipo:'escolha', id:'id-palavras', rot:'Mesa, maçã e dinheiro após 3 minutos (errou: MEEM)', na:'memória de 3 palavras', opts:[
        {v:'ok', rot:'lembrou as 3', frase:'evoca as 3 palavras após 3 minutos'},
        {v:'falha', rot:'não lembrou todas', frase:'não evoca as 3 palavras após 3 minutos'}] },
      PES,
      EDEMA,
      PULSOS,
      DESIDRAT,
      NEGLIGENCIA
    ]},
    conduta: { rot: 'Pessoa idosa — plano', itens: [
      { tipo:'escolha', id:'id-plano-ivcf', rot:'Plano pelo IVCF-20', na:'plano pelo IVCF-20', opts:[
        {v:'baixo', rot:'0–6, baixo risco', frase:'baixo risco pelo IVCF-20: reaplico em 1 ano'},
        {v:'moderado', rot:'7–14, risco moderado', frase:'risco moderado pelo IVCF-20: reaplico em 6 meses e aprofundo cada dimensão alterada'},
        {v:'alto', rot:'15 ou mais, alto risco', frase:'alto risco pelo IVCF-20: reaplico em 6 meses, com cuidado compartilhado com a atenção especializada, coordenado na APS'}] },
      { tipo:'escolha', id:'id-revisao-med', rot:'Polifarmácia revisada (Consenso de inapropriados; o que sair vai para a Caderneta, p. 56)', na:'revisão da medicação', multi:true, opts:[
        {v:'sem', rot:'revisada, nada a retirar', frase:'medicação revisada, sem medicamento a retirar', so:true},
        {v:'desprescrito', rot:'desprescrição registrada na Caderneta', frase:'medicação revisada, com desprescrição registrada na caderneta (data e motivo)'},
        {v:'bzd', rot:'benzodiazepínico em redução gradual', frase:'redução gradual do benzodiazepínico, negociada'}] },
      { tipo:'escolha', id:'id-vacinas', rot:'Vacinas a partir de 60 anos (influenza, covid-19, dT, hepatite B; VPC 20 a partir de 85 anos ou acamado)', na:'vacinas', opts:[
        {v:'em-dia', rot:'em dia', frase:'vacinas da idade em dia'},
        {v:'atualizadas', rot:'atualizadas hoje', frase:'vacinas da idade atualizadas'},
        {v:'sala', rot:'encaminhado à sala de vacina', frase:'encaminho à sala de vacina para atualizar o calendário'}] },
      { tipo:'escolha', id:'id-prevencao-quedas', rot:'Prevenção de quedas', lacuna:false, multi:true, opts:[
        {v:'exercicio', rot:'exercício de força e equilíbrio', frase:'oriento exercício de força e equilíbrio'},
        {v:'auxilio', rot:'bengala ou andador', frase:'indico bengala ou andador'},
        {v:'postural', rot:'remédio que dá hipotensão postural revisto', frase:'reviso remédio que causa hipotensão postural'},
        {v:'anual', rot:'exame de vista e dos pés anual', frase:'oriento exame de vista e dos pés anual'}] },
      CASA_SEGURA,
      { tipo:'escolha', id:'id-encaminha', rot:'Encaminhamento pelo achado (a equipe mantém o acompanhamento)', lacuna:false, multi:true,
        tpl:'encaminho, mantendo o acompanhamento na USF: {d}', opts:[
        {v:'oftalmo', rot:'oftalmologia (Jaeger pior que 20/40)', frase:'oftalmologia'},
        {v:'audio', rot:'audiometria (sussurro sem resposta com conduto livre)', frase:'audiometria'},
        {v:'neuropsi', rot:'neuropsicologia (dúvida após MEEM e Pfeffer)', frase:'avaliação neuropsicológica'},
        {v:'demencia', rot:'atenção especializada (suspeita de demência)', frase:'atenção especializada por suspeita de demência'},
        {v:'nutri', rot:'nutricionista (perda de peso, IMC nos extremos)', frase:'nutricionista'},
        {v:'fisio', rot:'fisioterapia (membros alterados)', frase:'fisioterapia'}] },
      { tipo:'texto', id:'id-metas', rot:'Plano de cuidados: meta imediata, de 3 meses e de longo prazo (o que o idoso quer)', ph:'andar até a igreja sem cair…', fmt:'plano de cuidados: {v}' }
    ]}
  }
});

/* ---------- 3. Saúde mental ---------- */
QUADROS.push({
  id: 'saude-mental', nome: 'Saúde mental', queixa: 'saude-mental-aps',
  fonte: 'medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · MS — CAB nº 34, Saúde Mental, 2013',
  ciap: ['P76', 'P74', 'P06'], cid: ['F32', 'F41', 'F51'],
  blocos: {
    anamnese: { rot: 'Saúde mental — humor, risco, sono', itens: [
      { tipo:'tri', id:'sm-humor', rot:'Humor deprimido nas últimas 2 semanas', na:'humor deprimido',
        sim:'refere humor deprimido nas últimas 2 semanas', nao:'nega humor deprimido nas últimas 2 semanas' },
      { tipo:'tri', id:'sm-anedonia', rot:'Perda de interesse ou prazer nas últimas 2 semanas', na:'perda de interesse ou prazer', junto:true,
        sim:'refere perda de interesse ou prazer', nao:'nega perda de interesse ou prazer' },
      { tipo:'texto', id:'sm-phq9', rot:'PHQ-9 (pontuação total; item 9 positivo: avaliar o risco agora)', curto:true, ph:'0 a 27', fmt:'PHQ-9: {v} pontos' },
      { tipo:'texto', id:'sm-gad7', rot:'GAD-7 (pontuação total)', curto:true, ph:'0 a 21', fmt:'GAD-7: {v} pontos' },
      { tipo:'tri', id:'sm-ideacao', rot:'Ideação suicida (perguntar diretamente: perguntar não induz)', na:'ideação suicida',
        sim:'refere ideação suicida[: {d}]', nao:'nega ideação suicida', det:{tipo:'texto', ph:'desde quando, frequência'}, sub:[
          { id:'sm-plano', rot:'Plano', na:'plano suicida', sim:'com plano', nao:'sem plano' },
          { id:'sm-meio', rot:'Meio letal disponível (arma de fogo em casa)', na:'meio letal disponível', sim:'com meio letal disponível', nao:'sem meio letal disponível' },
          { id:'sm-suporte', rot:'Suporte social frágil ou isolamento', na:'suporte social', sim:'com suporte social frágil', nao:'com suporte social' }] },
      { tipo:'tri', id:'sm-tentativa', rot:'Tentativa de suicídio prévia (o maior preditor isolado)', na:'tentativa prévia', junto:true,
        sim:'tentativa de suicídio prévia[: {d}]', nao:'nega tentativa de suicídio prévia', det:{tipo:'texto', ph:'quando, como'} },
      { tipo:'tri', id:'sm-insonia', rot:'Insônia (para iniciar, manter ou despertar precoce)', na:'insônia',
        sim:'refere insônia[ {d}]', nao:'nega insônia',
        det:{tipo:'escolha', multi:true, opts:[{v:'inicial', rot:'inicial'}, {v:'manutencao', rot:'de manutenção'}, {v:'precoce', rot:'despertar precoce', frase:'com despertar precoce'}]}, sub:[
          { id:'sm-insonia-cronica', rot:'Há 3 meses ou mais, em 3 noites ou mais por semana (crônica)', na:'duração da insônia',
            sim:'há 3 meses ou mais, em 3 noites ou mais por semana', nao:'há menos de 3 meses ou em menos de 3 noites por semana' }] },
      { tipo:'tri', id:'sm-bipolar', rot:'Período prévio de humor elevado, gastos incomuns ou pouca necessidade de sono (rastreio de bipolar)', na:'rastreio de bipolar',
        sim:'refere período prévio de humor elevado, gastos incomuns ou pouca necessidade de sono[: {d}]',
        nao:'nega período prévio de humor elevado, gastos incomuns ou pouca necessidade de sono', det:{tipo:'texto', ph:'quando, quanto tempo'} },
      { tipo:'tri', id:'sm-substancias', rot:'Outras substâncias além do álcool (padrão, última dose)', na:'outras substâncias',
        sim:'uso de outras substâncias[: {d}]', nao:'nega uso de outras substâncias', det:{tipo:'texto', ph:'qual, padrão, última dose'} },
      { tipo:'tri', id:'sm-antipsicotico', rot:'Antipsicótico iniciado ou aumentado nos últimos dias (pensar em acatisia)', na:'antipsicótico recente', junto:true,
        sim:'antipsicótico iniciado ou aumentado nos últimos dias[: {d}]', nao:'nega antipsicótico iniciado ou aumentado nos últimos dias', det:{tipo:'texto', ph:'qual, quando'} },
      GRAVIDEZ
    ]},
    ef: { rot: 'Saúde mental — observação', itens: [
      { tipo:'tri', id:'sm-inquietacao', rot:'Inquietação motora (alívio ao se movimentar sugere acatisia; com expansividade, mania)', na:'inquietação motora',
        sim:'inquietação motora[ {d}]', nao:'sem inquietação motora',
        det:{tipo:'escolha', opts:[{v:'alivio', rot:'alivia ao se movimentar', frase:'que alivia ao se movimentar, sugestiva de acatisia'},
          {v:'expansiva', rot:'com expansividade'}]} },
      { tipo:'tri', id:'sm-sinais-substancia', rot:'Sinais de uso ou de abstinência de substância', na:'sinais de uso ou abstinência', junto:true,
        sim:'sinais de uso ou abstinência de substância[: {d}]', nao:'sem sinais de uso ou abstinência de substância', det:{tipo:'texto', ph:'quais'} }
    ]},
    conduta: { rot: 'Saúde mental — conduta', itens: [
      { tipo:'escolha', id:'sm-onde', rot:'Onde segue (CAPS: risco de suicídio, psicose, uso prejudicial grave, transtorno grave e persistente, refratariedade)', na:'local do cuidado', multi:true, opts:[
        {v:'usf', rot:'na USF', frase:'mantenho o acompanhamento na USF'},
        {v:'caps', rot:'CAPS, mantendo o vínculo', frase:'encaminho ao CAPS, mantendo o vínculo com a USF'},
        {v:'matriciamento', rot:'matriciamento', frase:'discuto o caso em matriciamento com o CAPS'}] },
      { tipo:'escolha', id:'sm-meios', rot:'Risco de suicídio: restrição do acesso a meios letais (obrigatória)', lacuna:false, opts:[
        {v:'orientada', rot:'orientada', frase:'oriento a restrição do acesso a meios letais'}] },
      { tipo:'escolha', id:'sm-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'atividade', rot:'atividade física', frase:'atividade física'},
        {v:'sono', rot:'higiene do sono e TCC-I', frase:'higiene do sono e medidas da TCC-I (restrição de sono, controle de estímulos)'},
        {v:'psicoterapia', rot:'psicoterapia ou grupo', frase:'psicoterapia ou grupo'},
        {v:'isrs', rot:'efeito inicial do ISRS', frase:'que irritabilidade e piora do sono no início do ISRS são efeito indesejado, não falha'}] }
    ]}
  }
});

/* ---------- 4. Rastreamento ---------- */
QUADROS.push({
  id: 'rastreamento', nome: 'Rastreamento', queixa: 'rastreamento-adulto', grupo: 'outros',
  fonte: 'MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · MS — CAB nº 29, Rastreamento, 2010 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016 · MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025',
  ciap: ['A98'], cid: ['Z00', 'Z12', 'Z13'],
  blocos: {
    anamnese: { rot: 'Rastreamento — história', itens: [
      { tipo:'tri', id:'ra-alerta', rot:'Sinal de alerta, que tira do rastreio (sangramento vaginal anormal, nódulo de mama, sangue nas fezes, mudança do hábito intestinal, perda de peso, sintoma urinário, ferida que não cicatriza)', na:'sinais de alerta',
        sim:'sinal de alerta, fora do rastreio[: {d}]',
        nao:'nega sangramento vaginal anormal, nódulo de mama, sangue nas fezes, mudança do hábito intestinal, perda de peso, sintoma urinário e ferida que não cicatriza',
        det:{tipo:'texto', ph:'qual'} },
      { tipo:'escolha', id:'ra-colo', rot:'Mulher: tem colo do útero? (histerectomia total por lesão benigna ou por lesão precursora ou câncer)', na:'colo do útero', lacuna:false, opts:[
        {v:'tem', rot:'tem colo', frase:'tem colo do útero'},
        {v:'benigna', rot:'histerectomia total por lesão benigna', frase:'histerectomia total por lesão benigna'},
        {v:'lesao', rot:'histerectomia por lesão precursora ou câncer', frase:'histerectomia total por lesão precursora ou câncer'}] },
      { tipo:'tri', id:'ra-sexual', rot:'Mulher: já teve atividade sexual de algum tipo (sem nenhuma, não rastreia colo)', na:'atividade sexual', lacuna:false, junto:true,
        sim:'já teve atividade sexual', nao:'nunca teve atividade sexual' },
      { tipo:'tri', id:'ra-imunossupressao', rot:'Mulher: HIV, DRC, câncer, corticoide ou imunossupressor (muda o rastreio do colo)', na:'imunossupressão', lacuna:false, junto:true,
        sim:'condição que muda o rastreio do colo[: {d}]', nao:'sem HIV, DRC, câncer ou uso de corticoide ou imunossupressor', det:{tipo:'texto', ph:'qual'} },
      { tipo:'texto', id:'ra-ultimo-colo', rot:'Último preventivo ou DNA-HPV: quando e resultado (pedir o laudo)', ph:'DNA-HPV 2024 não detectado', fmt:'último exame do colo do útero: {v}' },
      { tipo:'texto', id:'ra-ultima-mamografia', rot:'Última mamografia: quando e resultado', ph:'2025, BI-RADS 1', fmt:'última mamografia: {v}' },
      { tipo:'tri', id:'ra-quer-parar', rot:'Tabagista: quer parar de fumar', na:'desejo de parar de fumar', lacuna:false,
        sim:'deseja parar de fumar', nao:'não deseja parar de fumar no momento' },
      { tipo:'texto', id:'ra-cage', rot:'CAGE: respostas sim, de 4 (2 ou mais é positivo)', na:'CAGE', curto:true, ph:'0', fmt:'CAGE: {v} de 4' },
      { tipo:'tri', id:'ra-fatores-dm', rot:'Fatores de risco de DM2 (parente de 1º grau com DM, doença cardiovascular, sedentarismo, HAS, SOP, acantose, diabetes gestacional ou bebê acima de 4 kg, antipsicótico, apneia, trabalho noturno, pré-diabetes)', na:'fatores de risco de DM2',
        sim:'fatores de risco para DM2[: {d}]', nao:'sem fatores de risco para DM2', det:{tipo:'texto', ph:'quais'} }
    ]},
    ef: { rot: 'Rastreamento — exame', itens: [
      { tipo:'texto', id:'ra-pa2', rot:'Segunda medida da PA', curto:true, ph:'128/82', fmt:'segunda medida de pressão arterial: {v} mmHg' },
      { tipo:'escolha', id:'ra-coleta', rot:'Coleta do colo (ectocérvice e endocérvice)', lacuna:false, opts:[
        {v:'dnahpv', rot:'DNA-HPV', frase:'coletado DNA-HPV de ectocérvice e endocérvice'},
        {v:'citologia', rot:'citologia (onde o DNA-HPV não chegou)', frase:'coletada citologia oncótica de ectocérvice e endocérvice'}] }
    ]},
    conduta: { rot: 'Rastreamento — conduta', itens: [
      { tipo:'escolha', id:'ra-consentimento', rot:'Benefício e risco explicados antes de pedir o rastreio', lacuna:false, opts:[
        {v:'sim', rot:'decisão compartilhada', frase:'explico benefícios e riscos do rastreio e decidimos juntos'}] },
      { tipo:'escolha', id:'ra-pa', rot:'PA de rastreio (anual, duas medidas)', na:'rastreio de HAS', opts:[
        {v:'normal', rot:'abaixo de 130/85: repetir em 1 ano', frase:'pressão abaixo de 130/85, repito em 1 ano'},
        {v:'limitrofe', rot:'130–139/85–89: mais 2 medidas em 7 a 14 dias se fator de risco', frase:'pressão entre 130/85 e 139/89, com novas medidas em 7 a 14 dias se houver fator de risco cardiovascular'},
        {v:'alta', rot:'140/90 ou mais: confirmar o diagnóstico', frase:'pressão de 140/90 ou mais, sigo para confirmar o diagnóstico de HAS'}] },
      { tipo:'escolha', id:'ra-exames', rot:'Exames de rastreio', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'glicemia', rot:'glicemia de jejum (35 anos ou mais; sobrepeso com fator de risco)', frase:'glicemia de jejum para rastreio de DM2'},
        {v:'lipidico', rot:'perfil lipídico (homem a partir de 35 anos; alto risco)', frase:'perfil lipídico'},
        {v:'mamografia', rot:'mamografia bilateral (50 a 74 anos, a cada 2 anos)', frase:'mamografia bilateral de rastreio'}] },
      { tipo:'escolha', id:'ra-colo-situacao', rot:'Rastreio do colo (25 a 64 anos, com colo e atividade sexual)', lacuna:false, opts:[
        {v:'em-dia', rot:'em dia', frase:'rastreio do colo do útero em dia'},
        {v:'feito', rot:'coletado hoje', frase:'rastreio do colo do útero coletado nesta consulta'},
        {v:'sem', rot:'sem indicação', frase:'sem indicação de rastreio do colo do útero'}] },
      { tipo:'escolha', id:'ra-psa', rot:'Homem que pede PSA: decisão compartilhada registrada (acima de 75 anos, não rastrear)', lacuna:false, opts:[
        {v:'faz', rot:'decidiu fazer', frase:'após explicar riscos e benefícios do PSA, decidimos fazer o exame'},
        {v:'nao', rot:'decidiu não fazer', frase:'após explicar riscos e benefícios do PSA, decidimos não fazer o exame'}] },
      { tipo:'escolha', id:'ra-abordagens', rot:'Abordagens', lacuna:false, multi:true, opts:[
        {v:'tabaco', rot:'tabagismo: abordagem breve (5 As)', frase:'faço abordagem breve do tabagismo (5 As)'},
        {v:'alcool', rot:'CAGE positivo: aconselhamento breve', frase:'faço aconselhamento breve sobre o álcool, com seguimento'},
        {v:'prediabetes', rot:'pré-diabetes ou 3 fatores de risco: modo de vida', frase:'oriento modo de vida e reavaliação anual da glicemia'},
        {v:'dnahpv', rot:'DNA-HPV positivo não é câncer', frase:'oriento que DNA-HPV positivo não significa lesão nem câncer'}] },
      { tipo:'texto', id:'ra-proximo', rot:'Próxima data de cada rastreio (registrar o que foi feito)', ph:'DNA-HPV em 2031; mamografia em 2028', fmt:'próximo rastreio: {v}' }
    ]}
  }
});

/* ---------- 5. Visita domiciliar ---------- */
QUADROS.push({
  id: 'visita-domiciliar', nome: 'Visita domiciliar', queixa: 'visita-domiciliar-acamado', grupo: 'outros',
  fonte: 'MS — Caderno de Atenção Domiciliar, vol. 1, 2012 · MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004',
  ciap: ['A28', 'S97'], cid: ['Z74', 'L89'],
  blocos: {
    anamnese: { rot: 'Visita domiciliar — paciente e cuidador', itens: [
      { tipo:'escolha', id:'vd-restricao', rot:'Restrito ao leito ou à casa', na:'grau de restrição', opts:[
        {v:'acamado', rot:'acamado', frase:'acamad{a}, restrit{a} ao leito'},
        {v:'domiciliado', rot:'domiciliado', frase:'domiciliad{a}, restrit{a} ao domicílio'}] },
      CUIDADOR,
      SOBRECARGA,
      SABE_LIGAR,
      { tipo:'texto', id:'vd-alimentacao', rot:'Como come e bebe (via, quantidade, quem oferece)', na:'alimentação e hidratação', ph:'pastoso, pela boca, a filha oferece', fmt:'alimentação: {v}' },
      ENGASGO,
      PERDA_PESO,
      CONSTIPACAO,
      { tipo:'tri', id:'vd-urina', rot:'Perde ou retém urina', na:'eliminação urinária', junto:true,
        sim:'{d}', simSemDet:'alteração urinária', nao:'nega perda ou retenção urinária',
        det:{tipo:'escolha', multi:true, opts:[{v:'perde', rot:'perde urina', frase:'perda urinária'}, {v:'retem', rot:'retém urina', frase:'retenção urinária'}]} },
      DOR,
      { tipo:'tri', id:'vd-sono', rot:'Sono: horas por noite, despertares, acorda cansado, atrapalha o sono do cuidador', na:'sono',
        sim:'alteração do sono[: {d}]', nao:'nega alteração do sono', det:{tipo:'texto', ph:'horas, despertares'} },
      { tipo:'texto', id:'vd-remedios', rot:'Remédios: quem administra, quantos ao todo, algum sedativo, hipnótico ou ansiolítico', na:'administração dos remédios',
        ph:'a filha administra; 7 remédios; um para dormir', fmt:'remédios: {v}' },
      QUEDAS,
      { tipo:'tri', id:'vd-concorda', rot:'Paciente (se lúcido) e família concordam com o cuidado em casa', na:'concordância com o cuidado em casa',
        sim:'paciente e família concordam com o cuidado em casa', nao:'paciente ou família não concordam com o cuidado em casa' }
    ]},
    ef: { rot: 'Visita domiciliar — exame e casa', itens: [
      LPP,
      DESIDRAT,
      PAINAD,
      CAM,
      ABDOME,
      NEGLIGENCIA,
      { tipo:'tri', id:'vd-casa-risco', rot:'Risco de queda na casa (tapete solto, fio no chão, pouca luz, banheiro sem barra ou antiderrapante, escada sem corrimão)', na:'segurança da casa',
        sim:'casa com risco de queda[: {d}]', nao:'casa sem risco aparente de queda', det:{tipo:'texto', ph:'o quê'} },
      { tipo:'tri', id:'vd-moradia', rot:'Moradia com limite para o cuidado (água, energia, acesso, cômodo com janela para o leito, organização, higiene)', na:'condição da moradia',
        sim:'moradia com limitação para o cuidado[: {d}]', nao:'moradia adequada ao cuidado', det:{tipo:'texto', ph:'o quê'} }
    ]},
    conduta: { rot: 'Visita domiciliar — plano', itens: [
      { tipo:'escolha', id:'vd-modalidade', rot:'Modalidade de atenção domiciliar', na:'modalidade de atenção domiciliar', opts:[
        {v:'ad1', rot:'AD1, equipe da USF', frase:'mantenho em AD1, com acompanhamento pela equipe da USF'},
        {v:'emad', rot:'AD2 ou AD3: acionar a EMAD', frase:'aciono a EMAD (Melhor em Casa) para AD2 ou AD3'},
        {v:'internacao', rot:'discutir internação', frase:'discuto internação'}] },
      { tipo:'escolha', id:'vd-plano', rot:'Plano de cuidados', lacuna:false, multi:true, opts:[
        {v:'pactuado', rot:'pactuado com a família, consentimento registrado', frase:'plano de cuidados pactuado com a família, com consentimento registrado'},
        {v:'escrito', rot:'orientação escrita ao cuidador', frase:'oriento o cuidador por escrito (cuidados diários, sinais de gravidade, quem chamar)'},
        {v:'pts', rot:'PTS (caso complexo)', frase:'caso levado a projeto terapêutico singular'}] },
      { tipo:'escolha', id:'vd-equipe', rot:'Equipe multiprofissional de apoio (disfagia, reabilitação, paliativo)', lacuna:false, multi:true, tpl:'aciono {d}', opts:[
        {v:'fisio', rot:'fisioterapia', frase:'fisioterapia'}, {v:'to', rot:'terapia ocupacional', frase:'terapia ocupacional'},
        {v:'fono', rot:'fonoaudiologia', frase:'fonoaudiologia'}] },
      { tipo:'escolha', id:'vd-cuidador-cuidado', rot:'Cuidado com o cuidador', lacuna:false, multi:true, opts:[
        {v:'zarit', rot:'Zarit aplicado', frase:'aplico a escala de Zarit ao cuidador'},
        {v:'grupo', rot:'grupo de cuidadores', frase:'convido o cuidador ao grupo de cuidadores'},
        {v:'rodizio', rot:'rodízio com familiares', frase:'oriento rodízio do cuidado com outros familiares'}] },
      CASA_SEGURA,
      { tipo:'escolha', id:'vd-cabeceira', rot:'Cabeceira entre 30 e 45 graus (náusea, vômito, risco de broncoaspiração)', lacuna:false, opts:[
        {v:'orientada', rot:'orientada', frase:'oriento cabeceira elevada entre 30 e 45 graus contra a broncoaspiração'}] },
      { tipo:'texto', id:'vd-savassi', rot:'Escala de Coelho-Savassi (prioridade das visitas)', curto:true, ph:'R3, escore 10', fmt:'escala de Coelho-Savassi: {v}' }
    ]}
  }
});

/* ---------- 6. Cuidados paliativos ---------- */
QUADROS.push({
  id: 'paliativos', nome: 'Cuidados paliativos', queixa: 'paliativos-aps', grupo: 'outros',
  fonte: 'MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — Caderno de Atenção Domiciliar, vol. 1, 2012',
  ciap: ['A28'], cid: ['Z51', 'R52'],
  blocos: {
    anamnese: { rot: 'Cuidados paliativos — necessidades e sintomas', itens: [
      { tipo:'escolha', id:'pa-surpresa', rot:'Pergunta surpresa: eu me surpreenderia se morresse nos próximos 12 meses?', na:'pergunta surpresa', opts:[
        {v:'positiva', rot:'não me surpreenderia', frase:'pergunta surpresa positiva'},
        {v:'negativa', rot:'me surpreenderia', frase:'pergunta surpresa negativa'}] },
      { tipo:'tri', id:'pa-spict', rot:'Indicadores gerais do SPICT-BR (internação não programada, metade do dia na cama ou cadeira, dependência para o cuidado pessoal, perda de peso em 3 a 6 meses, sintoma persistente, pedido de foco em qualidade de vida)', na:'SPICT-BR', junto:true,
        sim:'indicadores gerais do SPICT-BR presentes[: {d}]', nao:'sem indicadores gerais do SPICT-BR', det:{tipo:'texto', ph:'quais'} },
      { tipo:'texto', id:'pa-entende', rot:'O que entende da doença e do que pode acontecer; quer saber mais; com quem prefere que se fale', ph:'sabe que o câncer avançou; prefere que se fale com a filha', fmt:'compreensão da doença: {v}' },
      { tipo:'texto', id:'pa-importante', rot:'O que é mais importante agora; o que vem à cabeça quando pensa no futuro', ph:'ficar em casa, sem dor', fmt:'refere como mais importante agora: {v}' },
      { tipo:'texto', id:'pa-representante', rot:'Se não puder decidir, com quem conversar sobre o tratamento', ph:'a filha', fmt:'representante para decisões: {v}' },
      DOR,
      { tipo:'tri', id:'pa-sintomas', rot:'Falta de ar, náusea ou vômito, confusão, boca seca ou dificuldade para dormir', na:'outros sintomas', junto:true,
        sim:'refere {d}', simSemDet:'refere outros sintomas', nao:'nega falta de ar, náusea, vômito, confusão, boca seca e dificuldade para dormir',
        det:{tipo:'escolha', multi:true, opts:[{v:'dispneia', rot:'falta de ar'}, {v:'nausea', rot:'náusea ou vômito'}, {v:'confusao', rot:'confusão'},
          {v:'boca', rot:'boca seca'}, {v:'sono', rot:'dificuldade para dormir'}]} },
      CONSTIPACAO,
      { tipo:'tri', id:'pa-opioide', rot:'Em uso de opioide', na:'uso de opioide',
        sim:'em uso de opioide[: {d}]', nao:'sem uso de opioide', det:{tipo:'texto', ph:'qual, de horário ou só resgate'}, sub:[
          { id:'pa-opioide-laxante', rot:'Laxante prescrito junto', na:'laxante com o opioide', sim:'com laxante prescrito junto', nao:'sem laxante prescrito junto' },
          { id:'pa-opioide-resgates', rot:'Três ou mais resgates por dia', na:'número de resgates', sim:'com três ou mais resgates por dia', nao:'com menos de três resgates por dia' }] },
      CUIDADOR,
      SOBRECARGA,
      SABE_LIGAR,
      { tipo:'texto', id:'pa-local', rot:'Onde gostaria de ser cuidado e de morrer; rituais, despedidas ou pendências', ph:'em casa; quer ver o irmão', fmt:'preferência de local de cuidado e de morte: {v}' }
    ]},
    ef: { rot: 'Cuidados paliativos — exame', itens: [
      PAINAD,
      { tipo:'texto', id:'pa-dn4', rot:'DN4 na dor que parece neuropática (4 ou mais = neuropática)', curto:true, ph:'0 a 10', fmt:'DN4: {v} pontos' },
      { tipo:'tri', id:'pa-dispneia', rot:'Sinais de dispneia (FR alta, musculatura acessória, cianose; saturação normal não exclui)', na:'sinais de dispneia',
        sim:'sinais de desconforto respiratório[: {d}]', nao:'sem sinais de desconforto respiratório', det:{tipo:'texto', ph:'FR, musculatura acessória, cianose, edema, ascite'} },
      ABDOME,
      { tipo:'tri', id:'pa-boca', rot:'Boca: secura, lesões ou higiene precária', na:'boca', junto:true,
        sim:'alteração na boca[: {d}]', nao:'boca sem secura, lesões ou higiene precária', det:{tipo:'texto', ph:'o quê'} },
      LPP,
      CAM,
      { tipo:'escolha', id:'pa-hipodermoclise', rot:'Local da hipodermóclise, se houver', lacuna:false, opts:[
        {v:'ok', rot:'sem sinais flogísticos', frase:'local da hipodermóclise sem sinais flogísticos'},
        {v:'flogose', rot:'edema, calor, rubor, dor, endurecimento ou secreção', frase:'sinais flogísticos no local da hipodermóclise, nova punção a pelo menos 5 cm'}] }
    ]},
    conduta: { rot: 'Cuidados paliativos — plano', itens: [
      { tipo:'escolha', id:'pa-nivel', rot:'Nível do cuidado (especializado: sintoma de difícil controle, luto complicado, angústia existencial, conflito, dúvida de futilidade)', na:'nível do cuidado paliativo', multi:true, opts:[
        {v:'geral', rot:'geral, pela equipe da USF', frase:'cuidado paliativo geral pela equipe da USF'},
        {v:'especializado', rot:'acionar o especializado', frase:'aciono o cuidado paliativo especializado (matriciamento ou cuidado compartilhado)'}] },
      { tipo:'escolha', id:'pa-planejamento', rot:'Planejamento antecipado', lacuna:false, multi:true, opts:[
        {v:'revisao', rot:'tratamento atual revisado', frase:'reviso o tratamento atual'},
        {v:'objetivos', rot:'objetivos acordados', frase:'objetivos de cuidado acordados com paciente e família'},
        {v:'diretivas', rot:'diretivas antecipadas no prontuário', frase:'diretivas antecipadas registradas no prontuário'},
        {v:'reuniao', rot:'reunião familiar', frase:'reunião familiar realizada'},
        {v:'obito', rot:'família orientada para o óbito em casa', frase:'família orientada sobre o que fazer e quem chamar no óbito em casa'}] },
      { tipo:'escolha', id:'pa-sintomas-orienta', rot:'Medidas não farmacológicas', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'dispneia', rot:'dispneia', frase:'medidas para a dispneia (ambiente ventilado, leque no rosto, posicionamento)'},
        {v:'nausea', rot:'náusea', frase:'medidas para a náusea (alimento frio, refeição pequena, sem líquido junto, cabeceira entre 30 e 45 graus)'},
        {v:'constipacao', rot:'constipação', frase:'prevenção da constipação (líquido, dieta laxativa, privacidade e acesso ao vaso)'},
        {v:'delirium', rot:'delirium', frase:'medidas para o delirium (óculos, aparelho auditivo, relógio, calendário, luz de dia, família por perto)'}] },
      { tipo:'escolha', id:'pa-ultimos-dias', rot:'Últimos dias', lacuna:false, multi:true, opts:[
        {v:'profilaticos', rot:'profiláticos suspensos e explicados', frase:'suspendo medicação profilática e explico cada suspensão à família'},
        {v:'hidratacao', rot:'sem hiper-hidratação nem dieta forçada', frase:'evito hiper-hidratação e dieta forçada'}] }
    ]}
  }
});

/* ---------- 7. IST / sífilis ---------- */
QUADROS.push({
  id: 'ist', nome: 'IST / sífilis', queixa: 'sifilis-ist', grupo: 'outros',
  fonte: 'MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022 · MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023',
  ciap: ['X70', 'Y70', 'X71', 'Y71', 'X74', 'X14', 'Y03'], cid: ['A53', 'A51', 'A52', 'O98', 'A54', 'A56', 'N73', 'A64'],
  blocos: {
    anamnese: { rot: 'IST — história sexual e queixas', itens: [
      { tipo:'texto', id:'is-parcerias', rot:'Parcerias: quantas no último ano; homens, mulheres ou ambos; nova ou desconhecida nos últimos 3 meses', na:'parcerias',
        ph:'2 no último ano, homens; 1 nova há 1 mês', fmt:'parcerias: {v}' },
      IS_PRATICAS,
      IS_PRESERVATIVO,
      IS_SUBSTANCIAS,
      { tipo:'tri', id:'is-forcado', rot:'Já foi forçado(a) ou pressionado(a) a ter relação sexual', na:'violência sexual',
        sim:'refere já ter sido forçad{a} ou pressionad{a} a ter relação sexual[: {d}]', nao:'nega ter sido forçad{a} ou pressionad{a} a ter relação sexual',
        det:{tipo:'texto', ph:'quando (menos de 72 horas: quadro PrEP / PEP)'} },
      { tipo:'tri', id:'is-sifilis-previa', rot:'Sífilis prévia (tratamento documentado: data, droga, doses; VDRL depois)', na:'sífilis prévia',
        sim:'sífilis prévia[: {d}]', nao:'nega sífilis prévia', det:{tipo:'texto', ph:'data, droga, nº de doses, VDRL após'} },
      { tipo:'tri', id:'is-outra-previa', rot:'Outra IST anterior (qual, quando, tratou; a parceria tratou)', na:'outra IST anterior', junto:true,
        sim:'IST anterior[: {d}]', nao:'nega outra IST anterior', det:{tipo:'texto', ph:'qual, quando, tratou'} },
      { tipo:'texto', id:'is-testes-vacinas', rot:'Testes anteriores (HIV, sífilis, hepatites B e C: quando, resultado) e vacinas (hepatite B, hepatite A, HPV)', na:'testes e vacinas anteriores',
        ph:'HIV não reagente em 2025; hepatite B vacinada', fmt:'testes e vacinas anteriores: {v}' },
      GRAVIDEZ,
      { tipo:'tri', id:'is-corrimento', rot:'Corrimento vaginal ou uretral (cor, consistência, odor, prurido; duchas, produto íntimo, medicamento)', na:'corrimento',
        sim:'refere corrimento[: {d}]', nao:'nega corrimento', det:{tipo:'texto', ph:'cor, consistência, odor, prurido; duchas, produtos'} },
      { tipo:'tri', id:'is-ulcera', rot:'Úlcera genital (dói? quantas? bolha antes? há quanto tempo: mais de 4 semanas muda a conduta)', na:'úlcera genital', junto:true,
        sim:'refere úlcera genital[: {d}]', nao:'nega úlcera genital', det:{tipo:'texto', ph:'dolorosa?, quantas, vesícula antes, há quanto tempo'} },
      { tipo:'texto', id:'is-alergia-penicilina', rot:'Se refere alergia à penicilina: o que houve, há quanto tempo, como tratou; usou penicilina, amoxicilina ou cefalosporina depois', ph:'urticária há 20 anos; usou amoxicilina depois sem reação',
        fmt:'história de alergia à penicilina: {v}' }
    ]},
    ef: { rot: 'IST — exame', itens: [
      { tipo:'tri', id:'is-genitalia', rot:'Lesão na genitália externa ou na região anal (úlcera, verruga, vesícula)', na:'genitália externa e região anal',
        sim:'lesão em genitália externa ou região anal[: {d}]', nao:'genitália externa e região anal sem lesões',
        det:{tipo:'texto', ph:'úlcera: número, borda, base endurecida, fundo, vesículas; verruga: local, número, tamanho'} },
      { tipo:'tri', id:'is-linfonodos', rot:'Linfonodos inguinais aumentados (bubão, fístula)', na:'linfonodos inguinais', junto:true,
        sim:'linfonodos inguinais aumentados[: {d}]', nao:'sem linfonodomegalia inguinal', det:{tipo:'texto', ph:'lado, dor, fístula'} },
      { tipo:'tri', id:'is-secundaria', rot:'Pele e mucosas: roséola, lesões palmoplantares, placas mucosas, condiloma plano, alopecia em clareira, madarose', na:'pele e mucosas',
        sim:'sinais cutaneomucosos de sífilis secundária[: {d}]', nao:'pele e mucosas sem sinais de sífilis secundária', det:{tipo:'texto', ph:'quais'} },
      { tipo:'escolha', id:'is-uretra', rot:'Uretra: corrimento ou eritema de meato', lacuna:false, multi:true, tpl:'meato uretral {d}', opts:[
        {v:'ok', rot:'sem alterações', frase:'sem corrimento ou eritema', so:true},
        {v:'corrimento', rot:'corrimento', frase:'com corrimento'}, {v:'eritema', rot:'eritema de meato', frase:'com eritema'}] },
      { tipo:'escolha', id:'is-especular', rot:'Exame especular: paredes, fundo de saco e colo', lacuna:false, multi:true, tpl:'ao especular, {d}', opts:[
        {v:'ok', rot:'sem alterações', frase:'paredes, fundo de saco e colo sem alterações', so:true},
        {v:'corrimento', rot:'corrimento', frase:'corrimento vaginal'}, {v:'mucopus', rot:'muco-pus endocervical'},
        {v:'friavel', rot:'colo friável, sangra ao toque', frase:'colo friável, com sangramento ao toque'}, {v:'framboesa', rot:'colo em framboesa'}] },
      { tipo:'texto', id:'is-ph', rot:'pH vaginal (fita na parede lateral) e teste das aminas', ph:'pH 5, aminas positivas', fmt:'pH vaginal e teste das aminas: {v}' },
      { tipo:'escolha', id:'is-toque', rot:'Toque bimanual', lacuna:false, multi:true, tpl:'ao toque bimanual, {d}', opts:[
        {v:'ok', rot:'sem dor nem massa', frase:'sem dor à mobilização do colo ou dos anexos e sem massa pélvica', so:true},
        {v:'colo', rot:'dor à mobilização do colo'}, {v:'anexos', rot:'dor à palpação dos anexos'}, {v:'massa', rot:'massa pélvica'}] },
      { tipo:'escolha', id:'is-abdome', rot:'Na dor pélvica: abdome (defesa ou dor à palpação)', lacuna:false, multi:true, tpl:'abdome {d}', opts:[
        {v:'ok', rot:'sem defesa ou dor', frase:'sem defesa ou dor à palpação', so:true},
        {v:'dor', rot:'dor à palpação', frase:'com dor à palpação'}, {v:'defesa', rot:'defesa', frase:'com defesa'}] },
      { tipo:'escolha', id:'is-neuro', rot:'Pessoa vivendo com HIV e sífilis: exame neurológico minucioso', lacuna:false, opts:[
        {v:'ok', rot:'sem alterações', frase:'exame neurológico sem alterações'},
        {v:'alterado', rot:'alterado', frase:'alteração ao exame neurológico'}] }
    ]},
    conduta: { rot: 'IST — conduta', itens: [
      { tipo:'texto', id:'is-testes-rapidos', rot:'Testes rápidos na consulta (sífilis, HIV, hepatites B e C) e resultado', na:'testes rápidos',
        ph:'sífilis reagente; HIV, hepatites B e C não reagentes', fmt:'testes rápidos: {v}' },
      { tipo:'escolha', id:'is-estagio', rot:'Sífilis: estágio (decide o número de doses)', lacuna:false, opts:[
        {v:'recente', rot:'recente, até 1 ano', frase:'sífilis recente'},
        {v:'tardia', rot:'tardia ou de duração ignorada', frase:'sífilis tardia ou de duração ignorada'}] },
      { tipo:'escolha', id:'is-sifilis', rot:'Sífilis: na consulta', lacuna:false, multi:true, opts:[
        {v:'benzatina', rot:'benzatina aplicada', frase:'aplico penicilina benzatina na consulta'},
        {v:'vdrl', rot:'VDRL de base no dia do início', frase:'colho VDRL no dia do início do tratamento'},
        {v:'notifica', rot:'notificada', frase:'notifico o caso'},
        {v:'parcerias', rot:'parcerias dos últimos 90 dias chamadas (cartão)', frase:'convoco as parcerias dos últimos 90 dias com o cartão'},
        {v:'datas', rot:'gestante: próximas doses marcadas na caderneta', frase:'marco na caderneta as datas das próximas doses'}] },
      { tipo:'escolha', id:'is-sindromico', rot:'Tratamento na consulta, sem laboratório', lacuna:false, multi:true, opts:[
        {v:'uretral', rot:'corrimento uretral: gonorreia e clamídia', frase:'trato corrimento uretral para gonorreia e clamídia'},
        {v:'dip', rot:'DIP leve: retorno em 3 dias', frase:'trato doença inflamatória pélvica leve, com retorno em 3 dias e tratamento das parcerias dos últimos 2 meses'},
        {v:'verruga', rot:'verruga: tratamento na USF', frase:'trato verruga anogenital na USF'}] },
      { tipo:'escolha', id:'is-orienta', rot:'Seguimento orientado', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'vdrl', rot:'VDRL trimestral (gestante: mensal), mesmo método', frase:'seguimento com VDRL a cada 3 meses (gestante: mensal), sempre pelo mesmo método'},
        {v:'repetir', rot:'repetir HIV e sífilis em 4 a 6 semanas', frase:'repetir testes de HIV e sífilis em 4 a 6 semanas'}] },
      { tipo:'escolha', id:'is-prevencao', rot:'Prevenção ofertada', lacuna:false, multi:true, tpl:'ofereço {d}', opts:[
        {v:'vacina', rot:'vacina de hepatite B (A e HPV se indicadas)', frase:'vacina de hepatite B'},
        {v:'preservativo', rot:'preservativos', frase:'preservativos'},
        {v:'prep', rot:'prevenção combinada (PrEP e PEP)', frase:'prevenção combinada'}] }
    ]}
  }
});

/* ---------- 8. Tuberculose ---------- */
QUADROS.push({
  id: 'tuberculose', nome: 'Tuberculose', queixa: 'tuberculose', grupo: 'outros',
  fonte: 'MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019',
  ciap: ['A70', 'R05'], cid: ['A15', 'A16', 'Z20', 'R76'],
  blocos: {
    anamnese: { rot: 'Tuberculose — investigação e seguimento', itens: [
      { tipo:'tri', id:'tb-tosse', rot:'Tosse (2 semanas ou mais em quem procura a unidade; qualquer duração em contato, PVHIV, preso, situação de rua)', na:'tosse',
        sim:'refere tosse[ há {d}]', nao:'nega tosse', det:{tipo:'texto', ph:'3 semanas, produtiva'} },
      { tipo:'tri', id:'tb-sintomas', rot:'Febre no fim da tarde, sudorese noturna, emagrecimento, falta de apetite ou escarro com sangue', na:'sintomas constitucionais', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas constitucionais',
        nao:'nega febre no fim da tarde, sudorese noturna, emagrecimento, falta de apetite e escarro com sangue',
        det:{tipo:'escolha', multi:true, opts:[{v:'febre', rot:'febre no fim da tarde'}, {v:'sudorese', rot:'sudorese noturna'},
          {v:'emagrecimento', rot:'emagrecimento'}, {v:'apetite', rot:'falta de apetite'}, {v:'sangue', rot:'escarro com sangue'}]} },
      { tipo:'tri', id:'tb-contato', rot:'Convive ou conviveu com alguém com TB nos últimos 2 anos (casa, trabalho, prisão, abrigo)', na:'contato com TB',
        sim:'contato com caso de TB nos últimos 2 anos[: {d}]', nao:'nega contato com TB nos últimos 2 anos', det:{tipo:'texto', ph:'quem, onde, quando'} },
      { tipo:'tri', id:'tb-previo', rot:'Já tratou TB por mais de 30 dias (terminou ou abandonou)', na:'tratamento prévio de TB', junto:true,
        sim:'tratamento prévio de TB[: {d}]', nao:'nega tratamento prévio de TB', det:{tipo:'texto', ph:'quando, terminou ou abandonou'} },
      { tipo:'escolha', id:'tb-gestacao', rot:'Gestante ou em anticoncepcional hormonal (a rifampicina derruba o efeito)', lacuna:false, opts:[
        {v:'gestante', rot:'gestante', frase:'gestante'},
        {v:'aco', rot:'anticoncepcional hormonal', frase:'em uso de anticoncepcional hormonal'},
        {v:'nenhum', rot:'nenhum dos dois', frase:'não gestante e sem anticoncepcional hormonal'}] },
      { tipo:'texto', id:'tb-mes', rot:'Em tratamento: mês e fase do esquema', ph:'3º mês, manutenção (RH)', fmt:'em tratamento: {v}' },
      { tipo:'escolha', id:'tb-adesao', rot:'Em tratamento: doses tomadas', lacuna:false, opts:[
        {v:'tdo', rot:'todas, em TDO', frase:'tomou todas as doses, em tratamento diretamente observado'},
        {v:'auto', rot:'todas, autoadministradas', frase:'refere ter tomado todas as doses, autoadministradas'},
        {v:'perdeu', rot:'perdeu doses', frase:'refere doses perdidas'}] },
      { tipo:'tri', id:'tb-efeitos', rot:'Em tratamento: náusea, coceira, dor nas juntas, formigamento, visão alterada, pele ou olho amarelos', na:'efeitos adversos', lacuna:false, junto:true,
        sim:'refere {d}', simSemDet:'refere efeito adverso', nao:'nega náusea, coceira, dor nas juntas, formigamento, alteração visual e icterícia',
        det:{tipo:'escolha', multi:true, opts:[{v:'nausea', rot:'náusea'}, {v:'coceira', rot:'coceira'}, {v:'artralgia', rot:'dor nas juntas'},
          {v:'formigamento', rot:'formigamento'}, {v:'visao', rot:'visão alterada', frase:'alteração visual'}, {v:'ictericia', rot:'pele ou olho amarelos', frase:'icterícia'}]} }
    ]},
    ef: { rot: 'Tuberculose — exame', itens: [
      AUSC_PULM,
      { tipo:'tri', id:'tb-linfonodo', rot:'Linfonodo cervical ou supraclavicular aumentado (indolor, assimétrico, aderido, flutuação, fístula)', na:'linfonodos cervicais', junto:true,
        sim:'linfonodomegalia cervical ou supraclavicular[: {d}]', nao:'sem linfonodomegalia cervical ou supraclavicular', det:{tipo:'texto', ph:'onde, características'} },
      { tipo:'tri', id:'tb-derrame', rot:'Sinais de derrame pleural', na:'derrame pleural', junto:true,
        sim:'sinais de derrame pleural[: {d}]', nao:'sem sinais de derrame pleural', det:{tipo:'texto', ph:'lado'} },
      { tipo:'tri', id:'tb-meninge', rot:'Rigidez de nuca, alteração de consciência, déficit focal ou de par craniano', na:'sinais meníngeos e neurológicos', junto:true,
        sim:'sinais meníngeos ou neurológicos[: {d}]', nao:'sem rigidez de nuca, alteração de consciência ou déficit focal', det:{tipo:'texto', ph:'qual'} },
      { tipo:'tri', id:'tb-coluna', rot:'Dor à palpação da coluna (mal de Pott)', na:'palpação da coluna', junto:true,
        sim:'dor à palpação da coluna[: {d}]', nao:'sem dor à palpação da coluna', det:{tipo:'texto', ph:'nível'} },
      { tipo:'tri', id:'tb-ictericia', rot:'Icterícia ou hepatomegalia', na:'icterícia e fígado', junto:true,
        sim:'{d}', simSemDet:'icterícia ou hepatomegalia', nao:'sem icterícia ou hepatomegalia',
        det:{tipo:'escolha', multi:true, opts:[{v:'ictericia', rot:'icterícia'}, {v:'hepatomegalia', rot:'hepatomegalia'}]} },
      { tipo:'escolha', id:'tb-crianca', rot:'Criança: curva de peso, hepatoesplenomegalia, linfonodomegalia, conjuntivite flictenular, eritema nodoso', lacuna:false, multi:true, opts:[
        {v:'ok', rot:'sem achados', frase:'sem perda ou retificação da curva de peso, hepatoesplenomegalia, linfonodomegalia, conjuntivite flictenular ou eritema nodoso', so:true},
        {v:'curva', rot:'perda ou retificação da curva de peso'}, {v:'hepato', rot:'hepatoesplenomegalia'}, {v:'linfo', rot:'linfonodomegalia'},
        {v:'conjuntivite', rot:'conjuntivite flictenular'}, {v:'eritema', rot:'eritema nodoso'}] },
      { tipo:'escolha', id:'tb-cores', rot:'Adolescente em etambutol: discriminação de cores', lacuna:false, opts:[
        {v:'ok', rot:'preservada', frase:'discriminação de cores preservada'},
        {v:'alterada', rot:'alterada', frase:'discriminação de cores alterada'}] }
    ]},
    conduta: { rot: 'Tuberculose — conduta', itens: [
      { tipo:'escolha', id:'tb-investigacao', rot:'Sintomático respiratório: investigação', lacuna:false, multi:true, opts:[
        {v:'trm', rot:'escarro para TRM-TB (1 amostra)', frase:'colho escarro para TRM-TB'},
        {v:'baciloscopia', rot:'baciloscopia (2ª amostra na manhã seguinte)', frase:'colho baciloscopia, com a 2ª amostra na manhã seguinte'},
        {v:'cultura', rot:'cultura com teste de sensibilidade', frase:'solicito cultura com teste de sensibilidade'},
        {v:'rx', rot:'raio X de tórax', frase:'solicito raio X de tórax'},
        {v:'livro', rot:'registro no livro do SR', frase:'registro no livro do sintomático respiratório'}] },
      { tipo:'escolha', id:'tb-hiv', rot:'Teste rápido de HIV (todo diagnóstico de TB)', lacuna:false, opts:[
        {v:'nr', rot:'não reagente', frase:'teste rápido de HIV não reagente'},
        {v:'r', rot:'reagente: SAE', frase:'teste rápido de HIV reagente, encaminho ao SAE'}] },
      { tipo:'escolha', id:'tb-tratamento', rot:'Tratamento', lacuna:false, multi:true, opts:[
        {v:'inicio', rot:'esquema básico iniciado', frase:'inicio o esquema básico'},
        {v:'notifica', rot:'notificado no Sinan (caso confirmado)', frase:'notifico no Sinan'},
        {v:'tdo', rot:'TDO oferecido', frase:'ofereço tratamento diretamente observado'},
        {v:'controle', rot:'baciloscopia de controle', frase:'solicito baciloscopia de controle'},
        {v:'busca', rot:'faltoso: busca ativa', frase:'aciono busca ativa do faltoso (ACS, telefone, visita)'}] },
      { tipo:'escolha', id:'tb-contatos', rot:'Contatos', lacuna:false, multi:true, opts:[
        {v:'lista', rot:'listados com o caso índice', frase:'listo os contatos com o caso índice'},
        {v:'convoca', rot:'convocados (sintomáticos, menores de 5 anos, PVHIV primeiro)', frase:'convoco os contatos para avaliação, com prioridade para sintomáticos, menores de 5 anos e PVHIV'},
        {v:'pt', rot:'prova tuberculínica solicitada', frase:'solicito prova tuberculínica'},
        {v:'hiv', rot:'teste de HIV oferecido', frase:'ofereço teste de HIV aos contatos'}] },
      { tipo:'texto', id:'tb-pt', rot:'Prova tuberculínica: maior diâmetro do endurado, em mm (inclusive zero)', curto:true, ph:'0', fmt:'prova tuberculínica: {v} mm' },
      { tipo:'escolha', id:'tb-iltb', rot:'ILTB (TB ativa excluída por clínica e raio X)', lacuna:false, opts:[
        {v:'trata', rot:'tratar', frase:'TB ativa excluída por clínica e raio X, inicio tratamento da ILTB'},
        {v:'repetir', rot:'repetir a PT em 8 semanas', frase:'repito a prova tuberculínica em 8 semanas'},
        {v:'sem', rot:'sem indicação', frase:'sem indicação de tratamento da ILTB'}] }
    ]}
  }
});

/* ---------- 9. Hanseníase ---------- */
QUADROS.push({
  id: 'hanseniase', nome: 'Hanseníase', queixa: 'hanseniase', grupo: 'outros',
  fonte: 'MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022',
  ciap: ['A78'],
  cid: ['A30', 'Z20'],
  blocos: {
    anamnese: { rot: 'Hanseníase — queixas e contato', itens: [
      { tipo:'tri', id:'ha-mancha', rot:'Mancha clara ou avermelhada que não sente calor, frio, dor ou toque (sem suor ou sem pelo)', na:'mancha com alteração de sensibilidade',
        sim:'refere mancha com alteração de sensibilidade[: {d}]', nao:'nega mancha com alteração de sensibilidade', det:{tipo:'texto', ph:'onde, desde quando'} },
      { tipo:'tri', id:'ha-neural', rot:'Dormência, formigamento, agulhadas, choque ou câimbra em mãos e pés; deixa cair objetos', na:'sintomas neurais', junto:true,
        sim:'refere dormência, formigamento, choque ou câimbra em mãos ou pés[: {d}]', nao:'nega dormência, formigamento, agulhadas, choque ou câimbra em mãos e pés',
        det:{tipo:'texto', ph:'onde; deixa cair objetos?'} },
      { tipo:'tri', id:'ha-ferida', rot:'Ferida ou queimadura que não doeu, na mão ou no pé', na:'ferida indolor', junto:true,
        sim:'refere ferida ou queimadura indolor em mão ou pé[: {d}]', nao:'nega ferida ou queimadura indolor em mãos e pés', det:{tipo:'texto', ph:'onde'} },
      { tipo:'tri', id:'ha-nariz', rot:'Nariz entupido, com sangue ou ressecado, que não passa', na:'queixa nasal', junto:true,
        sim:'refere obstrução, sangramento ou ressecamento nasal persistente', nao:'nega obstrução, sangramento ou ressecamento nasal persistente' },
      { tipo:'tri', id:'ha-olhos', rot:'Olhos: ardor, ressecamento, vermelhidão, dificuldade para fechar, visão pior', na:'queixas oculares', junto:true,
        sim:'refere {d}', simSemDet:'refere queixa ocular', nao:'nega ardor, ressecamento, vermelhidão, dificuldade para fechar os olhos e piora da visão',
        det:{tipo:'escolha', multi:true, opts:[{v:'ardor', rot:'ardor ocular'}, {v:'ressecamento', rot:'ressecamento ocular'}, {v:'vermelhidao', rot:'olho vermelho'},
          {v:'fechar', rot:'dificuldade para fechar os olhos'}, {v:'visao', rot:'piora da visão'}]} },
      { tipo:'tri', id:'ha-reacao', rot:'Dor nos nervos, febre, dor nas juntas ou nos testículos, olho vermelho ou nódulos dolorosos novos (reação: antes, durante ou até 5 anos após a PQT-U)', na:'sintomas de reação',
        sim:'refere {d}', simSemDet:'refere sintomas de reação hansênica', nao:'nega dor nos nervos, febre, dor articular ou testicular, olho vermelho e nódulos dolorosos novos',
        det:{tipo:'escolha', multi:true, opts:[{v:'nervo', rot:'dor nos nervos'}, {v:'febre', rot:'febre'}, {v:'juntas', rot:'dor nas juntas'},
          {v:'testiculo', rot:'dor nos testículos'}, {v:'olho', rot:'olho vermelho'}, {v:'nodulos', rot:'nódulos dolorosos novos'}]} },
      { tipo:'tri', id:'ha-contato', rot:'Mora ou morou com alguém com hanseníase nos últimos 5 anos; viveu em área endêmica', na:'contato com hanseníase',
        sim:'contato com hanseníase[: {d}]', nao:'nega contato com hanseníase nos últimos 5 anos', det:{tipo:'texto', ph:'quem, quando'} },
      { tipo:'tri', id:'ha-previo', rot:'Já tratou hanseníase (quando terminou; suspeita de recidiva pede baciloscopia)', na:'tratamento prévio de hanseníase', junto:true,
        sim:'tratamento prévio de hanseníase[: {d}]', nao:'nega tratamento prévio de hanseníase', det:{tipo:'texto', ph:'quando terminou'} },
      { tipo:'escolha', id:'ha-gestacao', rot:'Mulher: gestante, amamentando ou querendo engravidar; método contraceptivo', lacuna:false, multi:true, opts:[
        {v:'gestante', rot:'gestante'}, {v:'amamenta', rot:'amamentando'}, {v:'planeja', rot:'quer engravidar'},
        {v:'metodo', rot:'usa método contraceptivo', frase:'em uso de método contraceptivo'}] },
      { tipo:'texto', id:'ha-dose', rot:'Em PQT-U: dose supervisionada de hoje', curto:true, ph:'4 de 12', fmt:'em PQT-U, dose supervisionada {v}' },
      { tipo:'escolha', id:'ha-adesao', rot:'Em PQT-U: doses diárias em casa', lacuna:false, opts:[
        {v:'todas', rot:'tomou todas', frase:'refere ter tomado as doses diárias'},
        {v:'perdeu', rot:'perdeu doses', frase:'refere doses diárias perdidas'}] },
      { tipo:'tri', id:'ha-anemia', rot:'Em PQT-U: cansaço e palidez (anemia da dapsona)', na:'anemia da dapsona', lacuna:false, junto:true,
        sim:'refere cansaço e palidez[: {d}]', nao:'nega cansaço e palidez', det:{tipo:'texto', ph:'desde quando'} }
    ]},
    ef: { rot: 'Hanseníase — exame dermatoneurológico', itens: [
      { tipo:'tri', id:'ha-pele', rot:'Lesões de pele ao exame do corpo inteiro, com boa luz', na:'pele do corpo inteiro',
        sim:'lesões de pele[: {d}]', nao:'sem lesões de pele ao exame do corpo inteiro', det:{tipo:'texto', ph:'tipo, onde'} },
      { tipo:'escolha', id:'ha-nlesoes', rot:'Número de lesões', lacuna:false, opts:[
        {v:'ate5', rot:'até 5', frase:'até 5 lesões'}, {v:'mais5', rot:'mais de 5', frase:'mais de 5 lesões'}] },
      { tipo:'tri', id:'ha-sensibilidade', rot:'Alteração da sensibilidade térmica, dolorosa ou tátil nas lesões ou nas áreas dormentes', na:'sensibilidade', junto:true,
        sim:'alteração de sensibilidade[: {d}]', nao:'sensibilidade térmica, dolorosa e tátil preservada', det:{tipo:'texto', ph:'qual, onde'} },
      { tipo:'tri', id:'ha-nervos', rot:'Nervo espessado, doloroso ou com choque (ulnar, mediano, radial, fibular, tibial posterior)', na:'palpação dos nervos',
        sim:'nervo alterado à palpação[: {d}]', nao:'nervos periféricos sem espessamento, dor ou choque à palpação', det:{tipo:'texto', ph:'qual nervo, lado; espessado, doloroso'} },
      { tipo:'tri', id:'ha-forca', rot:'Perda de força (extensão do punho, abdução do 5º dedo e do polegar, extensão do hálux, dorsiflexão do pé)', na:'força muscular', junto:true,
        sim:'diminuição de força[: {d}]', nao:'força preservada em mãos e pés', det:{tipo:'texto', ph:'qual movimento, lado'} },
      { tipo:'tri', id:'ha-monofilamento', rot:'Monofilamento em mãos e pés: não sente o violeta (já é grau 1)', na:'monofilamento', junto:true,
        sim:'não sente o monofilamento violeta[: {d}]', nao:'sente os monofilamentos em mãos e pés', det:{tipo:'texto', ph:'onde'} },
      { tipo:'tri', id:'ha-olhos-ef', rot:'Olhos: fraqueza para fechar (fenda), córnea sem sensibilidade ou baixa de acuidade', na:'avaliação ocular', junto:true,
        sim:'alteração ocular[: {d}]', nao:'fecha os olhos sem fenda, com sensibilidade da córnea e acuidade preservadas', det:{tipo:'texto', ph:'qual, lado'} },
      { tipo:'tri', id:'ha-face', rot:'Face e orelhas: infiltração, nódulos, perda de cílios e sobrancelhas', na:'face e orelhas', junto:true,
        sim:'infiltração, nódulos ou madarose em face ou orelhas[: {d}]', nao:'sem infiltração, nódulos ou madarose em face e orelhas', det:{tipo:'texto', ph:'onde'} },
      { tipo:'escolha', id:'ha-gif', rot:'Grau de incapacidade física (no diagnóstico, a cada 3 meses e na alta)', na:'grau de incapacidade física', tpl:'grau de incapacidade física {d}', opts:[
        {v:'0', rot:'0'}, {v:'1', rot:'1'}, {v:'2', rot:'2'}] },
      { tipo:'texto', id:'ha-omp', rot:'Escore OMP', curto:true, ph:'0', fmt:'escore OMP: {v}' }
    ]},
    conduta: { rot: 'Hanseníase — conduta', itens: [
      { tipo:'escolha', id:'ha-classificacao', rot:'Classificação operacional (na dúvida, MB)', lacuna:false, opts:[
        {v:'pb', rot:'paucibacilar (até 5 lesões e baciloscopia negativa)', frase:'hanseníase paucibacilar'},
        {v:'mb', rot:'multibacilar', frase:'hanseníase multibacilar'}] },
      { tipo:'escolha', id:'ha-caso', rot:'Caso definido', lacuna:false, multi:true, opts:[
        {v:'notifica', rot:'notificado no Sinan', frase:'notifico no Sinan'},
        {v:'pqtu', rot:'PQT-U iniciada, dose mensal supervisionada', frase:'inicio PQT-U, com dose mensal supervisionada'},
        {v:'ans', rot:'ANS feita', frase:'faço avaliação neurológica simplificada'},
        {v:'alta', rot:'alta por cura', frase:'alta por cura (doses completas, avaliação clínica e ANS)'}] },
      { tipo:'escolha', id:'ha-baciloscopia', rot:'Baciloscopia (dúvida de diagnóstico ou classificação; suspeita de recidiva)', lacuna:false, opts:[
        {v:'solicitada', rot:'solicitada', frase:'solicito baciloscopia do raspado intradérmico'}] },
      { tipo:'escolha', id:'ha-reacao-conduta', rot:'Reação ou neurite', lacuna:false, multi:true, opts:[
        {v:'corticoide', rot:'neurite ou reação tipo 1: corticoide e ANS seriada', frase:'neurite ou reação tipo 1: inicio corticoide, com ANS seriada e profilaxia de estrongiloidíase'},
        {v:'enh', rot:'eritema nodoso sem neurite: talidomida ou pentoxifilina', frase:'eritema nodoso sem neurite: talidomida, ou pentoxifilina quando a talidomida não pode'}] },
      { tipo:'escolha', id:'ha-contatos', rot:'Contatos (todos os que moram ou moraram com o caso nos últimos 5 anos)', lacuna:false, multi:true, opts:[
        {v:'exame', rot:'pele e nervos examinados', frase:'examino pele e nervos dos contatos'},
        {v:'bcg', rot:'BCG indicada', frase:'indico BCG ao contato sem doença (maior de 1 ano, sem vacina ou com 1 dose)'},
        {v:'tr', rot:'teste rápido do contato', frase:'solicito teste rápido anti-PGL-1 do contato'},
        {v:'autoexame', rot:'autoexame ensinado', frase:'ensino o autoexame aos contatos'}] },
      { tipo:'escolha', id:'ha-autocuidado', rot:'Autocuidado (olhos, nariz, pele, mãos, pés)', lacuna:false, opts:[
        {v:'orientado', rot:'orientado', frase:'oriento autocuidado de olhos, nariz, pele, mãos e pés e retorno se dor em nervo ou dormência nova, também depois da alta'}] },
      { tipo:'escolha', id:'ha-referencia', rot:'Referência à atenção especializada', lacuna:false, multi:true, tpl:'referencio à atenção especializada por {d}', opts:[
        {v:'duvida', rot:'dúvida diagnóstica ou forma neural pura', frase:'dúvida diagnóstica ou forma neural pura'},
        {v:'resistencia', rot:'investigar resistência', frase:'investigação de resistência'},
        {v:'cirurgia', rot:'avaliação cirúrgica do nervo', frase:'avaliação cirúrgica do nervo'}] }
    ]}
  }
});

/* ---------- 10. PrEP / PEP ---------- */
QUADROS.push({
  id: 'prep-pep', nome: 'PrEP / PEP', queixa: 'prep-pep', grupo: 'outros',
  fonte: 'MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016',
  ciap: ['A98', 'B25', 'Z25'], cid: ['Z20', 'Z29', 'T74', 'W46'],
  blocos: {
    anamnese: { rot: 'PrEP / PEP — exposição e risco', itens: [
      { tipo:'escolha', id:'pr-motivo', rot:'Motivo do atendimento', na:'motivo do atendimento', multi:true, opts:[
        {v:'pep', rot:'PEP: exposição sexual de risco', frase:'procura PEP após exposição sexual de risco'},
        {v:'violencia', rot:'violência sexual', frase:'atendimento por violência sexual'},
        {v:'acidente', rot:'acidente com material biológico', frase:'acidente com material biológico'},
        {v:'prep', rot:'PrEP', frase:'procura PrEP'}] },
      { tipo:'texto', id:'pr-quando', rot:'PEP: data e hora da exposição (é o que conta as 72 horas)', ph:'25/10 às 22h', fmt:'exposição em {v}' },
      { tipo:'escolha', id:'pr-material', rot:'PEP: material (sem risco: suor, lágrima, fezes, urina, vômito, saliva, secreção nasal, se sem sangue)', lacuna:false, opts:[
        {v:'risco', rot:'de risco (sangue, sêmen, fluido vaginal, líquor, serosa, amniótico)', frase:'material de risco'},
        {v:'sem', rot:'sem risco', frase:'material sem risco'}] },
      { tipo:'escolha', id:'pr-exposicao', rot:'PEP: tipo de exposição', lacuna:false, multi:true, opts:[
        {v:'percutanea', rot:'percutânea', frase:'exposição percutânea'},
        {v:'mucosa', rot:'mucosa (sexo sem preservativo, respingo)', frase:'exposição de mucosa'},
        {v:'pele', rot:'pele não íntegra', frase:'exposição em pele não íntegra'},
        {v:'mordedura', rot:'mordedura com sangue', frase:'mordedura com sangue'},
        {v:'sem', rot:'sem risco (pele íntegra, mordedura sem sangue)', frase:'exposição sem risco', so:true}] },
      { tipo:'texto', id:'pr-fonte', rot:'PEP: pessoa-fonte (vive com HIV? TARV? carga viral? ajuda, não é obrigatória)', ph:'desconhecida', fmt:'pessoa-fonte: {v}' },
      { tipo:'texto', id:'pr-previas', rot:'PEP antes (quantas vezes em 12 meses); usa ou usou PrEP (comprimidos nos 7 dias antes)', na:'PEP e PrEP prévias',
        ph:'nunca usou; PEP 1 vez em 2025', fmt:'PEP e PrEP prévias: {v}' },
      IS_PRATICAS,
      IS_PRESERVATIVO,
      IS_SUBSTANCIAS,
      { tipo:'tri', id:'pr-agudo', rot:'Nas últimas 4 semanas: febre, mal-estar, cefaleia, faringite, exantema, linfonodos, mialgia ou artralgia', na:'sintomas de infecção aguda pelo HIV',
        sim:'sintomas sugestivos de infecção aguda pelo HIV nas últimas 4 semanas[: {d}]', nao:'nega febre, mal-estar, cefaleia, faringite, exantema, linfonodos, mialgia e artralgia nas últimas 4 semanas',
        det:{tipo:'texto', ph:'quais, quando'} },
      GRAVIDEZ,
      { tipo:'texto', id:'pr-vacinas', rot:'Vacinas: hepatite B (esquema completo comprovado?), hepatite A, HPV; tétano se mordedura ou corte', na:'situação vacinal',
        ph:'hepatite B: 3 doses no cartão', fmt:'vacinação: {v}' },
      { tipo:'tri', id:'pr-interacao', rot:'PEP: rifampicina, carbamazepina, oxcarbazepina, fenitoína, fenobarbital, metformina ou dofetilida (mudam o dolutegravir)', na:'interação com dolutegravir', lacuna:false,
        sim:'em uso de fármaco que interage com o dolutegravir[: {d}]', nao:'sem fármaco que interage com o dolutegravir', det:{tipo:'texto', ph:'qual'} }
    ]},
    ef: { rot: 'PrEP / PEP — exame', itens: [
      { tipo:'tri', id:'pr-ist-ef', rot:'Sinais de IST: corrimento vaginal ou uretral, úlcera genital, verrugas anogenitais', na:'sinais de IST',
        sim:'sinais de IST[: {d}]', nao:'sem sinais de IST ao exame', det:{tipo:'texto', ph:'quais'} },
      { tipo:'tri', id:'pr-agudo-ef', rot:'Sinais de infecção aguda pelo HIV: febre, linfadenopatia, faringite, exantema, úlceras mucocutâneas, hepatoesplenomegalia', na:'sinais de infecção aguda pelo HIV', junto:true,
        sim:'sinais de infecção aguda pelo HIV[: {d}]', nao:'sem sinais de infecção aguda pelo HIV', det:{tipo:'texto', ph:'quais'} },
      { tipo:'escolha', id:'pr-sitios', rot:'Sítios expostos (vaginal, anal, oral): lesão ou sangramento', lacuna:false, multi:true, tpl:'sítios expostos {d}', opts:[
        {v:'ok', rot:'sem lesão ou sangramento', frase:'sem lesão ou sangramento', so:true},
        {v:'lesao', rot:'lesão', frase:'com lesão'}, {v:'sangramento', rot:'sangramento', frase:'com sangramento'}] },
      { tipo:'escolha', id:'pr-violencia-ef', rot:'Violência: tronco, membros (face interna das coxas), nádegas, cabeça, pescoço, mucosas, orelhas, mãos e pés', lacuna:false, multi:true, opts:[
        {v:'ok', rot:'sem lesões', frase:'sem lesões corporais de violência ao exame', so:true},
        {v:'lesoes', rot:'lesões', frase:'lesões corporais compatíveis com violência'},
        {v:'discrepante', rot:'ferimento que não condiz com a explicação', frase:'ferimento que não condiz com a explicação'}] },
      { tipo:'escolha', id:'pr-crianca-ef', rot:'Criança ou adolescente: lesão genital, de palato ou de dentes anteriores, sangramento vaginal na pré-púbere, fissura ou dilatação anal sem causa', lacuna:false, opts:[
        {v:'ok', rot:'sem sinais', frase:'sem sinais de violência sexual ao exame'},
        {v:'com', rot:'com sinais', frase:'sinais de violência sexual ao exame'}] }
    ]},
    conduta: { rot: 'PrEP / PEP — conduta', itens: [
      { tipo:'texto', id:'pr-testes', rot:'Testes rápidos na hora (HIV em sangue, sífilis, hepatites B e C; gravidez se indicado)', na:'testes rápidos',
        ph:'HIV, sífilis, hepatites B e C não reagentes', fmt:'testes rápidos: {v}' },
      { tipo:'escolha', id:'pr-pep', rot:'PEP (indicada se material de risco, exposição de risco, menos de 72 horas e HIV não reagente)', lacuna:false, opts:[
        {v:'inicia', rot:'indicada e iniciada', frase:'indico e inicio a PEP neste atendimento, com os 28 dias dispensados de uma vez'},
        {v:'nao', rot:'não indicada', frase:'sem indicação de PEP'},
        {v:'72h', rot:'mais de 72 horas', frase:'exposição há mais de 72 horas, sem PEP: testo HIV agora e em 30 dias'}] },
      { tipo:'escolha', id:'pr-violencia', rot:'Violência sexual: profilaxias, notificação e rede', lacuna:false, multi:true, tpl:'violência sexual: {d}', opts:[
        {v:'hbv', rot:'hepatite B (vacina e imunoglobulina se suscetível)', frase:'profilaxia de hepatite B'},
        {v:'ist', rot:'sífilis, gonorreia, clamídia e tricomoníase', frase:'profilaxia de sífilis, gonorreia, clamídia e tricomoníase'},
        {v:'ce', rot:'contracepção de emergência', frase:'contracepção de emergência'},
        {v:'hpv', rot:'vacina HPV', frase:'vacina HPV'},
        {v:'notifica', rot:'notificação imediata', frase:'notificação feita'},
        {v:'conselho', rot:'Conselho Tutelar (criança ou adolescente)', frase:'comunicação ao Conselho Tutelar'},
        {v:'referencia', rot:'acompanhada ao serviço de referência', frase:'acompanhamento até o serviço de referência'}] },
      { tipo:'escolha', id:'pr-prep', rot:'PrEP', lacuna:false, multi:true, opts:[
        {v:'inicia', rot:'iniciada no dia do teste', frase:'inicio PrEP no dia do teste, com dispensação para 30 dias'},
        {v:'pos-pep', rot:'ao fim da PEP (exposição repetida)', frase:'indico PrEP ao fim da PEP, por exposição repetida'},
        {v:'protecao', rot:'quando começa a proteger', frase:'oriento que a proteção começa após 7 dias na mulher cis e em quem usa estradiol, e após 2 horas nos demais'}] },
      { tipo:'escolha', id:'pr-modalidade', rot:'Modalidade da PrEP (sob demanda: só homem cis, não binário designado homem, travesti e mulher trans sem estradiol)', lacuna:false, tpl:'modalidade da PrEP: {d}', opts:[
        {v:'diaria', rot:'diária', frase:'diária'}, {v:'demanda', rot:'sob demanda (2 + 1 + 1)', frase:'sob demanda (2 + 1 + 1)'}] },
      { tipo:'escolha', id:'pr-seguimento', rot:'Seguimento', lacuna:false, multi:true, opts:[
        {v:'pep', rot:'PEP: retorno em 4 semanas; HIV na 4ª e na 12ª semana', frase:'retorno da PEP em 4 semanas, com HIV na 4ª e na 12ª semana'},
        {v:'prep', rot:'PrEP: consulta a cada 120 dias', frase:'consultas de PrEP a cada 120 dias'}] }
    ]}
  }
});

/* Caso de exemplo — MODELO DIDÁTICO, inventado (não é paciente). Mesmo formato das fotos do
 * sistema da USF: crônico que volta com exames. A dose da prescrição fica vazia de propósito
 * (exemplo não apresenta dose como conduta). Itens do quadro deixados em branco de propósito,
 * para o texto mostrar o "NÃO AVALIADO" do quadro. */
var EXEMPLO = {
  quadros: ['has-dm'],
  atend: ['retorno'],
  qp: 'Vim mostrar os exames',
  sexo: ['F'], idade: '58',
  comorb: 'sim', 'comorb.d': 'HAS e DM2',
  alergia: 'nao',
  cirurgia: 'sim', 'cirurgia.d': 'colecistectomia',
  hda: 'Comparece para mostrar os resultados dos exames pedidos na última consulta. Assintomática.',
  etilismo: 'nao', tabagismo: 'nao', atfis: ['sed'],
  hf: 'mãe com DM2; nega AVC ou infarto precoce na família',
  meduso: 'sim', 'meduso.rows': [{ nome: 'Losartana', dose: '50 mg (1-0-1)' }, { nome: 'Metformina', dose: '850 mg (1-0-1)' }],
  exames: 'HbA1c 8,1% / glicemia de jejum 152\nCreatinina 0,9 / potássio 4,3 / urina tipo I sem alterações',
  'hd-adesao': 'sim', 'hd-adesao.d': 'esquece a dose da noite 2 a 3 vezes por semana',
  'hd-loa': 'nao', 'hd-hipo': 'nao', 'hd-neuropatia': 'nao', 'hd-elevapa': 'nao',
  'sv.pa': '148x92', 'sv.fc': '76',
  'med.peso': '82', 'med.alt': '1,60', 'med.ca': '98',
  eg: ['beg'],
  'hd-acv': 'nao', 'hd-ap': 'nao', 'hd-edema': 'nao', 'hd-pulsos': 'nao',
  'hd-pes': ['ok'], 'hd-pe-mono': ['ok'],
  'hd-pa-meta': ['fora'], 'hd-glic-meta': ['fora'], 'hd-esquema': ['mantido'],
  'hd-exames': ['dm6'], 'hd-orienta': ['sal', 'atividade'],
  presc: [{ farmaco: 'metformina', dose: '' }],
  orientgerais: ['og'],
  retorno: 'em 3 meses com exames',
  'cod.ciap': ['K86', 'T90'], 'cod.cid': ['I10', 'E11']
};
