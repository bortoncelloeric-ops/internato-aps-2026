/* Quadros da consulta na USF — SÓ DADOS. Contrato em CLAUDE.md (esquema, tipos de item, regras de texto).
 * Montado de copiloto-onda-aps1 e copiloto-onda-aps2 (fragmentos-consulta/) por ferramentas/montar-quadros.mjs da onda APS II.
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

/* quadros-c.js — autor A (cardiorrenal + respiratória), APS II, 28/10/2026
 * Quadros: dislipidemia, drc, ic, obesidade (A2-Cardiorrenal-Metabolica); asma, dpoc, ivas, pneumonia,
 * tosse-cronica (A2-Respiratoria). Cada item sai de um item da queixa do copiloto indicada em `queixa`
 * (perguntas → anamnese; exame → ef; conduta e exames → conduta).
 *
 * Convenções (as mesmas do quadros-a.js e do quadros-b.js):
 * - Conduta em 1ª pessoa (oriento, solicito, encaminho). Sem dose: a prescrição é a ficha base.
 * - `lacuna: false` em dois casos: (a) pergunta ou achado que vale para um subgrupo (mulher em idade fértil,
 *   quem já usa estatina, criança, quem usa inalador), em que "não avaliado" seria falso para os demais;
 *   (b) ação opcional da conduta (orientação, pedido de exame, encaminhamento), em que intocado quer dizer
 *   "não feito", não "não avaliado".
 * - Peso, altura, IMC, circunferência abdominal, PA, FC, FR, SpO2, temperatura e glicemia estão na ficha base:
 *   não repetem aqui. Escore (Boston, CRB-65, mMRC, Fagerström, risco HEARTS) a página não calcula: o quadro
 *   pede o resultado, em campo curto ou em pílulas, e escreve a frase pronta.
 * - Ids: `ic-`, `drc-`, `dl-`, `ob-`, `as-`, `dp-`, `iv-`, `pc-`, `tc-` por quadro; `car-` e `res-` nas perguntas
 *   que dois ou mais quadros daqui compartilham (`cr-` já é da criança de 2 a 10 anos na APS I).
 * - Reaproveitados da APS I, pelo nome: AUSC_PULM (hd-ap), EDEMA (hd-edema), PULSOS (hd-pulsos),
 *   PN_MUCOSAS (pn-mucosas), GRAVIDEZ (sm-gravidez). Cópia literal (mesmo id, mesmo objeto) do has-dm, do
 *   saude-mental e do ist: hd-fertil (C_FERTIL), hd-rcv (C_RCV), hd-carotida, sm-ideacao, is-alergia-penicilina.
 * - Achado do exame que só se procura num subgrupo (criança, queixa de ouvido ou de seios) é `escolha`, não `tri`:
 *   o atalho "Sem alterações nos achados dos quadros" marca ✗ em todo `tri` do exame, e `lacuna:false` não protege.
 * - Revisado em 28/10/2026 (relatorios/revisao-quadros-c.md): C1, I1 a I13 e M1 a M14 aplicados. */

/* ---------- perguntas compartilhadas (mesmo id, mesmo objeto) ---------- */

/* anamnese — ic, drc, dislipidemia (só vale para quem pode engravidar) */
const C_FERTIL = { tipo:'escolha', id:'hd-fertil', rot:'Mulher em idade fértil: contracepção e plano de gravidez (IECA e BRA dependem disso)', na:'contracepção', lacuna:false, opts:[
        {v:'contracepcao', rot:'contracepção confiável', frase:'em uso de contracepção confiável'},
        {v:'sem', rot:'sem contracepção confiável', frase:'sem contracepção confiável'},
        {v:'planeja', rot:'planeja engravidar', frase:'planeja engravidar'}] };
/* conduta (ou ef) — dislipidemia, drc, obesidade, dpoc */
const C_RCV = { tipo:'texto', id:'hd-rcv', rot:'Risco cardiovascular pela calculadora HEARTS (anual, 40 a 74 anos)', curto:true, ph:'resultado da calculadora',
        fmt:'risco cardiovascular pela calculadora HEARTS: {v}' };
/* conduta — ic, asma */
const C_C_VACINA = { tipo:'escolha', id:'res-c-vacina', rot:'Vacinas (influenza todo ano e as demais indicadas)', na:'vacinas', lacuna:false, opts:[
  {v:'hoje', rot:'atualizadas hoje', frase:'vacinas da idade atualizadas'},
  {v:'sala', rot:'à sala de vacina', frase:'encaminho à sala de vacina para atualizar o calendário'}] };

/* anamnese — asma, dpoc, tosse crônica */
const C_EXPOSICAO = { tipo:'tri', id:'res-exposicao', rot:'Fumo passivo (em casa ou no carro), fogão a lenha, carvão ou querosene, poeiras ou vapores no trabalho', na:'exposição a fumaça e poeira', junto:true,
  sim:'refere exposição a {d}', simSemDet:'refere exposição a fumaça ou poeira', nao:'nega exposição a fumo passivo, fogão a lenha, carvão, querosene e poeiras ou vapores no trabalho',
  det:{tipo:'escolha', multi:true, opts:[{v:'passivo', rot:'fumo passivo'}, {v:'lenha', rot:'fogão a lenha, carvão ou querosene'}, {v:'trabalho', rot:'poeiras ou vapores no trabalho'}]} };
/* anamnese — asma, dpoc, ivas, pneumonia (influenza da temporada) */
const C_VACINA = { tipo:'tri', id:'res-vacina', rot:'Vacina de influenza desta temporada em dia', na:'vacina de influenza',
  sim:'vacina de influenza desta temporada em dia', nao:'sem vacina de influenza desta temporada' };
/* anamnese — ivas, pneumonia (só criança) */
const C_CRIANCA = { tipo:'tri', id:'res-crianca', rot:'Criança: não consegue beber ou mamar, vomita tudo, teve convulsão ou tem chiado', na:'sinais de perigo e chiado na criança', lacuna:false,
  sim:'criança {d}', simSemDet:'criança com sinal de perigo ou chiado', nao:'criança consegue beber ou mamar, não vomita tudo, sem convulsão e sem chiado',
  det:{tipo:'escolha', multi:true, opts:[{v:'beber', rot:'não consegue beber ou mamar'}, {v:'vomita', rot:'vomita tudo'}, {v:'convulsao', rot:'teve convulsão'}, {v:'chiado', rot:'tem chiado'}]} };
/* anamnese — asma, tosse crônica */
const C_BETABLOQ = { tipo:'tri', id:'res-betabloq', rot:'Betabloqueador, inclusive em colírio (piora a obstrução e a tosse)', na:'betabloqueador', junto:true,
  sim:'usa betabloqueador[: {d}]', nao:'nega betabloqueador, inclusive em colírio', det:{tipo:'texto', ph:'qual, via oral ou colírio'} };
/* ef — asma, dpoc */
const C_TECNICA = { tipo:'escolha', id:'res-tecnica', rot:'Técnica inalatória observada com o dispositivo do paciente (em toda consulta)', na:'técnica inalatória', multi:true, opts:[
  {v:'ok', rot:'correta', frase:'técnica inalatória correta com o dispositivo do paciente', so:true},
  {v:'erro', rot:'com erro', frase:'erro na técnica inalatória'},
  {v:'sem-espacador', rot:'não usa espaçador', frase:'não usa espaçador'}] };
/* ef — ivas, pneumonia (só criança) */
const C_TIRAGEM = { tipo:'escolha', id:'res-tiragem', rot:'Criança: tiragem subcostal, estridor em repouso ou sibilância', na:'tiragem, estridor e sibilância na criança', lacuna:false, junto:true, multi:true, tpl:'criança: {d}', opts:[
  {v:'ok', rot:'sem tiragem, estridor nem sibilância', frase:'sem tiragem subcostal, estridor em repouso nem sibilância', so:true},
  {v:'tiragem', rot:'tiragem subcostal', frase:'com tiragem subcostal'}, {v:'estridor', rot:'estridor em repouso', frase:'com estridor em repouso'},
  {v:'sibilancia', rot:'sibilância', frase:'com sibilância'}] };
/* ef — ivas, pneumonia (só criança) */
const C_FR_CRIANCA = { tipo:'escolha', id:'res-fr-crianca', rot:'Criança: FR com a criança tranquila (rápida: 50 ou mais de 2 a 11 meses; 40 ou mais de 1 a 5 anos; acima de 30 de 6 a 8 anos; acima de 25 a partir de 8 anos)', na:'frequência respiratória da criança', lacuna:false, opts:[
  {v:'normal', rot:'sem respiração rápida', frase:'frequência respiratória normal para a idade'},
  {v:'rapida', rot:'respiração rápida', frase:'respiração rápida para a idade'}] };


/* ======================= A2 — CARDIORRENAL E METABÓLICA ======================= */

/* ---------- 1. Dislipidemia e risco cardiovascular ---------- */
QUADROS.push({
  id: 'dislipidemia', nome: 'Dislipidemia / risco CV', queixa: 'dislipidemia-risco-cv', grupo: 'A2-Cardiorrenal-Metabolica',
  fonte: 'MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019 · SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025',
  ciap: ['T93', 'K22'], cid: ['E78'],
  blocos: {
    anamnese: { rot: 'Dislipidemia — risco, estatina, causas secundárias', itens: [
      { tipo:'tri', id:'dl-ascvd', rot:'Doença aterosclerótica já estabelecida: infarto, revascularização, angina com isquemia comprovada, AVC isquêmico, AIT com aterosclerose carotídea ou claudicação', na:'doença aterosclerótica prévia',
        sim:'refere {d}', simSemDet:'refere doença aterosclerótica prévia',
        nao:'nega infarto, revascularização, angina com isquemia comprovada, AVC isquêmico, AIT com aterosclerose carotídea e claudicação',
        det:{tipo:'escolha', multi:true, opts:[{v:'iam', rot:'infarto', frase:'infarto prévio'}, {v:'revasc', rot:'revascularização', frase:'revascularização prévia'},
          {v:'angina', rot:'angina com isquemia comprovada'}, {v:'avc', rot:'AVC isquêmico', frase:'AVC isquêmico prévio'},
          {v:'ait', rot:'AIT com aterosclerose carotídea'}, {v:'claud', rot:'claudicação'}]} },
      { tipo:'tri', id:'dl-fam', rot:'Parente de 1º grau com doença coronariana precoce (homem antes dos 55; mulher antes dos 60 ou dos 65, conforme o critério do PCDT) ou com colesterol muito alto', na:'doença coronariana precoce na família', junto:true,
        sim:'parente de 1º grau com doença coronariana precoce ou colesterol muito alto[: {d}]', nao:'nega parente de 1º grau com doença coronariana precoce ou colesterol muito alto',
        det:{tipo:'texto', ph:'quem, com que idade'} },
      { tipo:'tri', id:'dl-alim', rot:'Alimentação com muita gordura animal, fritura, ultraprocessado, carboidrato ou açúcar (causas de triglicerídeo alto)', na:'alimentação',
        sim:'alimentação com excesso de {d}', simSemDet:'alimentação com excesso de gordura, ultraprocessados, carboidrato ou açúcar',
        nao:'nega excesso de gordura animal, fritura, ultraprocessados, carboidrato e açúcar na alimentação',
        det:{tipo:'escolha', multi:true, opts:[{v:'gordura', rot:'gordura animal'}, {v:'fritura', rot:'fritura'}, {v:'ultra', rot:'ultraprocessados'},
          {v:'carbo', rot:'carboidrato'}, {v:'acucar', rot:'açúcar'}]} },
      C_FERTIL,
      GRAVIDEZ,
      { tipo:'tri', id:'dl-hepato', rot:'Icterícia ou doença hepática aguda ou crônica grave (fora do protocolo do hipolipemiante)', na:'icterícia e doença hepática', junto:true,
        sim:'refere icterícia ou doença hepática[: {d}]', nao:'nega icterícia e doença hepática', det:{tipo:'texto', ph:'qual, desde quando'} },
      { tipo:'tri', id:'dl-interacao', rot:'Usa anlodipino, verapamil, amiodarona, antirretroviral, itraconazol, claritromicina, eritromicina ou fibrato (mudam a escolha e a dose da estatina)', na:'fármacos que interagem com a estatina', junto:true,
        sim:'usa {d}', simSemDet:'usa fármaco que interage com a estatina',
        nao:'nega uso de anlodipino, verapamil, amiodarona, antirretroviral, itraconazol, claritromicina, eritromicina e fibrato',
        det:{tipo:'escolha', multi:true, opts:[{v:'anlodipino', rot:'anlodipino'}, {v:'verapamil', rot:'verapamil'}, {v:'amiodarona', rot:'amiodarona'},
          {v:'arv', rot:'antirretroviral'}, {v:'itra', rot:'itraconazol'}, {v:'macrolideo', rot:'claritromicina ou eritromicina'}, {v:'fibrato', rot:'fibrato'}]} },
      { tipo:'tri', id:'dl-adesao', rot:'Em uso de estatina: toma todo dia (sinvastatina, à noite)', na:'uso diário da estatina', lacuna:false,
        sim:'toma a estatina todo dia', nao:'não toma a estatina todo dia' },
      { tipo:'tri', id:'dl-mialgia', rot:'Em uso de estatina: dor muscular, cãibra ou fraqueza', na:'sintomas musculares com a estatina', lacuna:false, junto:true,
        sim:'refere dor muscular, cãibra ou fraqueza com a estatina[: {d}]', nao:'nega dor muscular, cãibra e fraqueza com a estatina', det:{tipo:'texto', ph:'desde quando; febre ou cansaço junto?'} },
      { tipo:'tri', id:'dl-tireoide', rot:'Sintomas de hipotireoidismo: cansaço, sensação de frio, constipação, ganho de peso (descompensado, tira do protocolo e causa miopatia com a estatina)', na:'sintomas de hipotireoidismo', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas de hipotireoidismo', nao:'nega cansaço, sensação de frio, constipação e ganho de peso',
        det:{tipo:'escolha', multi:true, opts:[{v:'cansaco', rot:'cansaço'}, {v:'frio', rot:'sensação de frio'}, {v:'constipacao', rot:'constipação'}, {v:'peso', rot:'ganho de peso'}]} }
    ]},
    ef: { rot: 'Dislipidemia — exame', itens: [
      { tipo:'tri', id:'dl-xantoma', rot:'Xantoma tendinoso ou tuberoso, xantelasma ou arco córneo antes dos 45 anos (hipercolesterolemia familiar)', na:'xantomas e arco córneo',
        sim:'presença de {d}', simSemDet:'presença de xantoma, xantelasma ou arco córneo precoce', nao:'sem xantomas, xantelasma nem arco córneo antes dos 45 anos',
        det:{tipo:'escolha', multi:true, opts:[{v:'tendinoso', rot:'xantoma tendinoso'}, {v:'tuberoso', rot:'xantoma tuberoso'}, {v:'xantelasma', rot:'xantelasma'},
          {v:'arco', rot:'arco córneo antes dos 45 anos'}]} },
      { tipo:'tri', id:'hd-carotida', rot:'Sopro carotídeo', junto:true, sim:'sopro carotídeo[: {d}]', nao:'sem sopro carotídeo', det:{tipo:'texto', ph:'lado'} },
      PULSOS
    ]},
    conduta: { rot: 'Dislipidemia — conduta', itens: [
      C_RCV,
      { tipo:'escolha', id:'dl-c-indica', rot:'Estatina pelo risco (sem calcular: doença aterosclerótica, diabetes a partir dos 40, DRC estágio 3 ou mais, LDL de 190 ou mais, HAS com lesão de órgão-alvo; os demais, pela calculadora)', na:'indicação de estatina', opts:[
        {v:'indicada', rot:'indicada', frase:'estatina indicada pelo risco cardiovascular'},
        {v:'nao', rot:'não indicada', frase:'estatina não indicada pelo risco cardiovascular'}] },
      { tipo:'escolha', id:'dl-c-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'lipidico', rot:'perfil lipídico (LDL de Friedewald só com triglicerídeo abaixo de 400; acima, o não-HDL)', frase:'perfil lipídico'},
        {v:'tgo', rot:'TGO e TGP antes da estatina e aos 6 meses', frase:'TGO/TGP'},
        {v:'cpk', rot:'CPK antes da estatina, aos 6 meses e na queixa muscular', frase:'CPK'},
        {v:'tsh', rot:'TSH antes da estatina e na queixa muscular', frase:'TSH'},
        {v:'glic', rot:'glicemia ou HbA1c e creatinina com TFG (diabetes e DRC mudam a indicação)', frase:'glicemia ou HbA1c e creatinina com TFG'},
        {v:'trig', rot:'triglicerídeo a cada 6 meses (fibrato para prevenir pancreatite)', frase:'triglicerídeo, para o seguimento do fibrato'}] },
      { tipo:'escolha', id:'dl-c-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'alim', rot:'menos gordura animal, sem gordura trans, menos óleo de coco, palma e dendê', frase:'alimentação com menos gordura animal (carne gordurosa, vísceras, leite integral, embutidos, pele de frango, gema), sem gordura trans e com menos óleo de coco, palma e dendê'},
        {v:'atividade', rot:'exercício de 3 a 6 vezes por semana, cerca de 150 minutos', frase:'exercício de 3 a 6 vezes por semana, cerca de 150 minutos semanais, de leve a moderado'},
        {v:'fumo', rot:'combate ao tabagismo', frase:'cessação do tabagismo, com abordagem cognitivo-comportamental e, se preciso, fármaco'},
        {v:'tg1000', rot:'triglicerídeo acima de 1.000: cortar a gordura total', frase:'corte da gordura total da dieta (óleo de cozinha e gordura visível), por triglicerídeo acima de 1.000'},
        {v:'tgsec', rot:'triglicerídeo de causa secundária: tratar a causa', frase:'menos carboidrato, dieta hipocalórica, abstenção de álcool e compensação do diabetes, para o triglicerídeo'}] },
      { tipo:'escolha', id:'dl-c-termo', rot:'Termo de esclarecimento ao iniciar estatina ou fibrato', na:'termo de esclarecimento', lacuna:false, opts:[
        {v:'s', rot:'riscos, benefícios e efeitos adversos informados', frase:'informo riscos, benefícios e efeitos adversos do tratamento (termo de esclarecimento)'}] },
      { tipo:'escolha', id:'dl-c-encaminha', rot:'Muito alto risco que precisa de terapia agressiva (PCDT de 2019: Framingham acima de 20%, que não é faixa da HEARTS, ou prevenção secundária com fator de risco maior mantido)', na:'muito alto risco', lacuna:false, opts:[
        {v:'terciaria', rot:'encaminhado', frase:'encaminho para avaliação na atenção terciária, por risco muito alto'}] }
    ]}
  }
});

/* ---------- 2. Doença renal crônica ---------- */
QUADROS.push({
  id: 'drc', nome: 'Doença renal crônica', queixa: 'drc-aps', grupo: 'A2-Cardiorrenal-Metabolica',
  fonte: 'MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026',
  ciap: ['U99'], cid: ['N18'],
  blocos: {
    anamnese: { rot: 'DRC — fatores de risco, nefrotóxicos, sintomas', itens: [
      { tipo:'tri', id:'drc-familia', rot:'DRC na família, doença glomerular ou rins policísticos', na:'DRC na família e doença glomerular',
        sim:'refere DRC na família, doença glomerular ou rins policísticos[: {d}]', nao:'nega DRC na família, doença glomerular e rins policísticos', det:{tipo:'texto', ph:'quem, qual doença'} },
      { tipo:'tri', id:'drc-nefrotox', rot:'Nefrotóxicos: anti-inflamatório, inibidor de bomba de prótons por muito tempo, antipsicótico atípico, laxativo com fosfato ou contraste recente', na:'nefrotóxicos', junto:true,
        sim:'refere uso de {d}', simSemDet:'refere uso de nefrotóxico',
        nao:'nega anti-inflamatório, inibidor de bomba de prótons por muito tempo, antipsicótico atípico, laxativo com fosfato e contraste recente',
        det:{tipo:'escolha', multi:true, opts:[{v:'aine', rot:'anti-inflamatório'}, {v:'ibp', rot:'inibidor de bomba de prótons por muito tempo'},
          {v:'antipsicotico', rot:'antipsicótico atípico'}, {v:'fosfato', rot:'laxativo com fosfato'}, {v:'contraste', rot:'contraste recente'}]} },
      { tipo:'tri', id:'drc-sintomas', rot:'Noctúria, urina espumosa ou escura, edema, falta de ar, coceira, inapetência, náusea, cansaço ou pernas inquietas (mais nos estágios 4 e 5)', na:'sintomas de DRC', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas de DRC',
        nao:'nega noctúria, urina espumosa ou escura, edema, falta de ar, coceira, inapetência, náusea, cansaço e pernas inquietas',
        det:{tipo:'escolha', multi:true, opts:[{v:'noct', rot:'noctúria'}, {v:'espumosa', rot:'urina espumosa'}, {v:'escura', rot:'urina escura'}, {v:'edema', rot:'edema'},
          {v:'dispneia', rot:'falta de ar'}, {v:'prurido', rot:'coceira'}, {v:'inapetencia', rot:'inapetência'}, {v:'nausea', rot:'náusea'},
          {v:'cansaco', rot:'cansaço'}, {v:'pernas', rot:'pernas inquietas'}]} },
      { tipo:'tri', id:'drc-itu', rot:'Infecção urinária de repetição, doença urológica ou cálculo', na:'infecção urinária de repetição e doença urológica', junto:true,
        sim:'refere infecção urinária de repetição, doença urológica ou cálculo[: {d}]', nao:'nega infecção urinária de repetição, doença urológica e cálculo', det:{tipo:'texto', ph:'qual'} },
      { tipo:'tri', id:'drc-angioedema', rot:'Em IECA: inchaço de língua, lábios ou garganta (angioedema: emergência de via aérea)', na:'angioedema com IECA', lacuna:false, junto:true,
        sim:'refere inchaço de língua, lábios ou garganta[: {d}]', nao:'nega inchaço de língua, lábios e garganta', det:{tipo:'texto', ph:'quando, evolução'} },
      { tipo:'tri', id:'drc-potassio', rot:'Em IECA, BRA ou espironolactona: suplemento de potássio, sal light (com potássio) ou outro diurético poupador de potássio', na:'fontes de potássio', lacuna:false, junto:true,
        sim:'usa suplemento de potássio, sal light ou diurético poupador de potássio[: {d}]', nao:'nega suplemento de potássio, sal light e diurético poupador de potássio', det:{tipo:'texto', ph:'qual'} },
      C_FERTIL
    ]},
    ef: { rot: 'DRC — exame', itens: [
      EDEMA,
      { tipo:'tri', id:'drc-sobrecarga', rot:'Outros sinais de sobrecarga de volume', na:'sobrecarga de volume', junto:true,
        sim:'sinais de sobrecarga de volume[: {d}]', nao:'sem outros sinais de sobrecarga de volume', det:{tipo:'texto', ph:'quais'} },
      { tipo:'tri', id:'drc-sopro', rot:'Sopro abdominal (doença renovascular)', na:'sopro abdominal', junto:true, sim:'sopro abdominal[: {d}]', nao:'sem sopro abdominal', det:{tipo:'texto', ph:'onde'} },
      { tipo:'tri', id:'drc-assimetria', rot:'Assimetria de PA ou de pulsos (coarctação)', na:'assimetria de PA e pulsos', junto:true,
        sim:'assimetria de PA ou de pulsos[: {d}]', nao:'sem assimetria de PA nem de pulsos', det:{tipo:'texto', ph:'qual membro'} },
      { tipo:'tri', id:'drc-uremia', rot:'Sinais de uremia: atrito pericárdico, confusão ou piora do estado mental, prurido', na:'sinais de uremia', junto:true,
        sim:'sinais de uremia: {d}', simSemDet:'sinais de uremia', nao:'sem atrito pericárdico, confusão ou prurido',
        det:{tipo:'escolha', multi:true, opts:[{v:'atrito', rot:'atrito pericárdico'}, {v:'confusao', rot:'confusão ou piora do estado mental'}, {v:'prurido', rot:'prurido'}]} },
      PN_MUCOSAS
    ]},
    conduta: { rot: 'DRC — estágio e plano', itens: [
      { tipo:'escolha', id:'drc-c-estagio', rot:'Estágio da DRC pela TFG (CKD-EPI), por mais de 3 meses', na:'estágio da DRC', tpl:'DRC estágio {d}', opts:[
        {v:'1', rot:'1 — TFG de 90 ou mais, com dano', frase:'1'}, {v:'2', rot:'2 — TFG de 60 a 89, com dano', frase:'2'},
        {v:'3a', rot:'3A — TFG de 45 a 59', frase:'3A'}, {v:'3b', rot:'3B — TFG de 30 a 44', frase:'3B'},
        {v:'4', rot:'4 — TFG de 15 a 29', frase:'4'}, {v:'5', rot:'5 — TFG abaixo de 15', frase:'5'}] },
      { tipo:'escolha', id:'drc-c-albuminuria', rot:'Albuminúria pela relação albumina/creatinina (RAC)', na:'albuminúria', junto:true, tpl:'albuminúria {d} pela RAC', opts:[
        {v:'a1', rot:'A1 — RAC abaixo de 30', frase:'A1'}, {v:'a2', rot:'A2 — RAC de 30 a 299', frase:'A2'}, {v:'a3', rot:'A3 — RAC de 300 ou mais', frase:'A3'}] },
      C_RCV,
      { tipo:'escolha', id:'drc-c-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'tfg', rot:'creatinina com TFG pela CKD-EPI (sem depuração de 24 horas nem Cockcroft-Gault)', frase:'creatinina com TFG pela CKD-EPI'},
        {v:'eas', rot:'EAS (todo paciente em risco)', frase:'EAS'},
        {v:'rac', rot:'RAC em amostra isolada (diabético ou hipertenso sem proteinúria no EAS)', frase:'relação albumina/creatinina em amostra isolada'},
        {v:'dismorfismo', rot:'hemácias dismórficas no EAS (hematúria)', frase:'pesquisa de hemácias dismórficas no EAS'},
        {v:'us', rot:'ultrassonografia de rins e vias urinárias (DRC na família, infecção urinária de repetição, doença urológica)', frase:'ultrassonografia de rins e vias urinárias'},
        {v:'crk', rot:'creatinina e potássio, 2 a 4 semanas depois de iniciar ou subir IECA, BRA ou espironolactona', frase:'creatinina e potássio'},
        {v:'est3a', rot:'estágio 3A: potássio, cálcio, fósforo, PTH e hemograma, anuais', frase:'potássio, cálcio, fósforo, PTH e hemograma'},
        {v:'leuco', rot:'leucograma com diferencial (captopril com insuficiência renal)', frase:'leucograma com diferencial'}] },
      { tipo:'escolha', id:'drc-c-modo', rot:'Modo de vida e nefroproteção', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'fumo', rot:'parar de fumar', frase:'cessação do tabagismo'},
        {v:'exercicio', rot:'150 minutos de exercício por semana, conforme a condição', frase:'exercício, cerca de 150 minutos por semana, conforme a condição'},
        {v:'peso', rot:'perder peso até o IMC normal', frase:'perda de peso até o IMC normal'},
        {v:'sodio', rot:'sódio reduzido (amplifica o efeito do IECA ou BRA)', frase:'redução do sódio, que amplifica o efeito do IECA ou BRA'},
        {v:'proteina', rot:'proteína reduzida, com nutricionista', frase:'ingestão reduzida de proteína, com nutricionista'},
        {v:'nefrotox', rot:'evitar nefrotóxicos', frase:'evitar nefrotóxicos: anti-inflamatório, contraste, aminoglicosídeo, antipsicótico atípico, preparo intestinal com fosfato ou alumínio e inibidor de bomba de prótons em excesso'}] },
      { tipo:'escolha', id:'drc-c-nefro', rot:'Encaminhar à nefrologia (a APS segue junto)', lacuna:false, multi:true,
        tpl:'encaminho à nefrologia, mantendo o acompanhamento na APS: {d}', opts:[
        {v:'tfg30', rot:'TFG abaixo de 30 (tem preferência)', frase:'TFG abaixo de 30'},
        {v:'tfg45', rot:'TFG abaixo de 45 com complicação da DRC', frase:'TFG abaixo de 45 com complicação da DRC (anemia ou hipercalemia refratárias, hiperfosfatemia, hipocalcemia, hiperparatireoidismo ou HAS resistente)'},
        {v:'rapida', rot:'perda rápida da função', frase:'perda rápida da função renal'},
        {v:'cilindros', rot:'cilindros patológicos no EAS', frase:'cilindros patológicos no EAS'},
        {v:'anatomica', rot:'alteração anatômica (estenose de artéria renal, assimetria, policística)', frase:'alteração anatômica (estenose de artéria renal, assimetria ou rins policísticos)'},
        {v:'proteinuria', rot:'proteinúria nefrótica, com hematúria ou cilindros, ou albuminúria moderada a grave confirmada sem causa na APS', frase:'proteinúria nefrótica, com hematúria ou cilindros, ou albuminúria moderada a grave confirmada sem causa na APS'},
        {v:'has', rot:'HAS resistente com TFG abaixo de 60', frase:'hipertensão resistente com TFG abaixo de 60'},
        {v:'dm25', rot:'diabético com TFG abaixo de 25 (também à endocrinologia)', frase:'diabético com TFG abaixo de 25, também à endocrinologia'}] },
      { tipo:'escolha', id:'drc-c-apoio', rot:'Apoio da nefrologia sem encaminhar (o PCDT sugere nos estágios 3B e 4)', lacuna:false, multi:true, opts:[
        {v:'matric', rot:'matriciamento', frase:'discuto o caso em matriciamento com a nefrologia'},
        {v:'tele', rot:'teleconsultoria ou teleassessoramento', frase:'solicito teleconsultoria com a nefrologia'}] }
    ]}
  }
});

/* ---------- 3. Insuficiência cardíaca ---------- */
QUADROS.push({
  id: 'ic', nome: 'Insuficiência cardíaca', queixa: 'insuficiencia-cardiaca', grupo: 'A2-Cardiorrenal-Metabolica',
  fonte: 'MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024',
  ciap: ['K77'], cid: ['I50'],
  blocos: {
    anamnese: { rot: 'IC — sintomas, classe funcional, adesão', itens: [
      { tipo:'tri', id:'ic-dispneia', rot:'Falta de ar: em repouso, ao deitar (ortopneia), acordando à noite (dispneia paroxística noturna), andando no plano ou só na subida', na:'dispneia',
        sim:'refere {d}', simSemDet:'refere dispneia', nao:'nega dispneia, ortopneia e dispneia paroxística noturna',
        det:{tipo:'escolha', multi:true, opts:[{v:'repouso', rot:'dispneia em repouso'}, {v:'ortopneia', rot:'ortopneia'}, {v:'dpn', rot:'dispneia paroxística noturna'},
          {v:'plano', rot:'dispneia ao andar no plano'}, {v:'subida', rot:'dispneia só na subida'}]} },
      { tipo:'escolha', id:'ic-nyha', rot:'Classe funcional NYHA: o que a atividade habitual causa', na:'classe funcional NYHA', junto:true, tpl:'classe funcional NYHA {d}', opts:[
        {v:'1', rot:'I — nada', frase:'I'}, {v:'2', rot:'II — dispneia ou cansaço nas atividades habituais', frase:'II'},
        {v:'3', rot:'III — nas atividades menores que as habituais', frase:'III'}, {v:'4', rot:'IV — em repouso', frase:'IV'}] },
      { tipo:'tri', id:'ic-sintomas', rot:'Inchaço nas pernas, tosse à noite, cansaço ou perda de capacidade para o que fazia antes', na:'edema, tosse noturna e cansaço', junto:true,
        sim:'refere {d}', simSemDet:'refere edema, tosse noturna ou cansaço', nao:'nega inchaço nas pernas, tosse à noite, cansaço e perda de capacidade para o que fazia antes',
        det:{tipo:'escolha', multi:true, opts:[{v:'edema', rot:'inchaço nas pernas'}, {v:'tosse', rot:'tosse à noite'}, {v:'cansaco', rot:'cansaço'},
          {v:'capacidade', rot:'perda de capacidade para o que fazia antes'}]} },
      { tipo:'tri', id:'ic-peso', rot:'Ganho de peso nos últimos dias (pesa-se todo dia? o diurético se ajusta pelo peso e pelo edema)', na:'ganho de peso', junto:true,
        sim:'refere ganho de peso nos últimos dias[: {d}]', nao:'nega ganho de peso nos últimos dias', det:{tipo:'texto', ph:'quanto, em quantos dias; pesa-se todo dia?'} },
      { tipo:'tri', id:'ic-palpitacao', rot:'Palpitação ou pulso irregular (IC com fibrilação atrial também vai ao especialista)', na:'palpitação', junto:true,
        sim:'refere palpitação ou pulso irregular[: {d}]', nao:'nega palpitação e pulso irregular', det:{tipo:'texto', ph:'desde quando'} },
      { tipo:'tri', id:'ic-adesao', rot:'Esquece doses dos remédios (o que faz quando esquece; sabe para que serve cada um)', na:'adesão',
        sim:'refere esquecer doses dos remédios[: {d}]', nao:'nega esquecer doses dos remédios', det:{tipo:'texto', ph:'quais, quantas vezes, o que faz quando esquece'} },
      { tipo:'tri', id:'ic-internacao', rot:'Internação por IC no último ano', na:'internação por IC',
        sim:'internação por IC no último ano[: {d}]', nao:'nega internação por IC no último ano', det:{tipo:'texto', ph:'quantas, quando'} },
      { tipo:'tri', id:'ic-sincope', rot:'Síncope, desmaio ou tontura (hipoperfusão: emergência)', na:'síncope e tontura', junto:true,
        sim:'refere {d}', simSemDet:'refere síncope ou tontura', nao:'nega síncope e tontura',
        det:{tipo:'escolha', multi:true, opts:[{v:'sincope', rot:'síncope'}, {v:'tontura', rot:'tontura'}]} },
      { tipo:'tri', id:'ic-digoxina', rot:'Em digoxina: náusea, vômitos, diarreia ou distúrbio visual (intoxicação digitálica)', na:'sintomas de intoxicação digitálica', lacuna:false, junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas de intoxicação digitálica', nao:'nega náusea, vômitos, diarreia e distúrbio visual',
        det:{tipo:'escolha', multi:true, opts:[{v:'nausea', rot:'náusea'}, {v:'vomitos', rot:'vômitos'}, {v:'diarreia', rot:'diarreia'}, {v:'visual', rot:'distúrbio visual'}]} },
      { tipo:'tri', id:'ic-angioedema', rot:'Em IECA ou sacubitril-valsartana: inchaço de língua, lábios ou garganta (angioedema: emergência de via aérea)', na:'angioedema com IECA ou sacubitril-valsartana', lacuna:false, junto:true,
        sim:'refere inchaço de língua, lábios ou garganta[: {d}]', nao:'nega inchaço de língua, lábios e garganta', det:{tipo:'texto', ph:'quando, evolução'} },
      { tipo:'tri', id:'ic-cardiopatia', rot:'Doença coronariana, doença valvar ou doença renal', na:'doença coronariana, valvar e renal', junto:true,
        sim:'refere {d}', simSemDet:'refere doença coronariana, valvar ou renal', nao:'nega doença coronariana, valvar e renal',
        det:{tipo:'escolha', multi:true, opts:[{v:'coronariana', rot:'doença coronariana'}, {v:'valvar', rot:'doença valvar'}, {v:'renal', rot:'doença renal'}]} },
      C_FERTIL,
      C_VACINA
    ]},
    ef: { rot: 'IC — exame', itens: [
      { tipo:'tri', id:'ic-jugular', rot:'Turgência jugular ou refluxo hepatojugular', na:'jugulares',
        sim:'{d}', simSemDet:'turgência jugular ou refluxo hepatojugular', nao:'sem turgência jugular nem refluxo hepatojugular',
        det:{tipo:'escolha', multi:true, opts:[{v:'turgencia', rot:'turgência jugular'}, {v:'refluxo', rot:'refluxo hepatojugular'}]} },
      { tipo:'tri', id:'ic-b3', rot:'Terceira bulha (galope)', na:'terceira bulha', junto:true, sim:'terceira bulha presente', nao:'sem terceira bulha' },
      AUSC_PULM,
      EDEMA,
      { tipo:'tri', id:'ic-hepato', rot:'Hepatomegalia', na:'fígado', junto:true, sim:'hepatomegalia', nao:'sem hepatomegalia' },
      { tipo:'tri', id:'ic-perfusao', rot:'Sinais de baixo débito: hipoperfusão, hipotensão ou choque (emergência)', na:'sinais de baixo débito', junto:true,
        sim:'sinais de baixo débito[: {d}]', nao:'sem sinais de baixo débito', det:{tipo:'texto', ph:'quais'} }
    ]},
    conduta: { rot: 'IC — probabilidade, exames e plano', itens: [
      { tipo:'texto', id:'ic-boston', rot:'Escore de Boston (até 4 pontos: baixa probabilidade; 5 a 7: moderada; 8 a 12: IC definida)', curto:true, ph:'0 a 12', fmt:'escore de Boston: {v} pontos' },
      { tipo:'escolha', id:'ic-c-prob', rot:'Probabilidade clínica de IC (alta: tratar já, incluindo o diurético, sem esperar BNP nem ecocardiograma)', na:'probabilidade clínica de IC', junto:true, tpl:'probabilidade clínica de IC {d}', opts:[
        {v:'baixa', rot:'baixa', frase:'baixa'}, {v:'moderada', rot:'moderada', frase:'moderada'}, {v:'alta', rot:'alta (IC definida)', frase:'alta'}] },
      { tipo:'escolha', id:'ic-c-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'ecg', rot:'ECG', frase:'ECG'}, {v:'rx', rot:'radiografia de tórax', frase:'radiografia de tórax'},
        {v:'bnp', rot:'BNP ou NT-proBNP (baixa probabilidade; na alta não pedir)', frase:'BNP ou NT-proBNP'},
        {v:'eco', rot:'ecocardiograma transtorácico (mede a fração de ejeção: ICFEr é abaixo de 40%)', frase:'ecocardiograma transtorácico'},
        {v:'cr-eletrolitos', rot:'creatinina e eletrólitos (potássio, sódio, magnésio) em uso de IECA, BRA e diurético', frase:'creatinina, sódio, potássio e magnésio'},
        {v:'potassio', rot:'potássio na espironolactona (1ª semana, 1º mês, depois a cada 1 a 4 meses e a cada aumento de dose)', frase:'potássio'},
        {v:'digoxina', rot:'digoxinemia (ajuste da dose ou suspeita de intoxicação)', frase:'digoxinemia'}] },
      { tipo:'escolha', id:'ic-c-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'sal', rot:'sal: dieta normossódica, sem restrição rigorosa', frase:'dieta normossódica, sem restrição rigorosa de sal'},
        {v:'liquidos', rot:'restrição de líquidos (só com congestão persistente, NYHA III e IV ou hiponatremia)', frase:'restrição de líquidos, de 1,5 a 2 litros por dia'},
        {v:'peso', rot:'perder peso (IMC acima de 35)', frase:'perda de peso, por IMC acima de 35'},
        {v:'exercicio', rot:'exercício aeróbico no estável (NYHA III supervisionado; NYHA IV, não)', frase:'exercício aeróbico regular em programa de reabilitação'},
        {v:'autocuidado', rot:'autocuidado: pesar-se, observar edema e falta de ar', frase:'pesar-se, observar edema e falta de ar e saber quando voltar ou procurar a emergência'},
        {v:'remedios', rot:'cada remédio: para que serve, horário e o que fazer se esquecer', frase:'para que serve cada remédio, o horário e o que fazer se esquecer, por escrito e de viva voz'}] },
      { tipo:'escolha', id:'ic-c-apoio', rot:'Apoio à adesão', lacuna:false, multi:true, opts:[
        {v:'vd', rot:'visita domiciliar e lembretes', frase:'combino visita domiciliar e lembretes para a adesão'},
        {v:'tele', rot:'telemonitoramento por telefone (saiu de internação, NYHA III e IV ou dificuldade de locomoção)', frase:'combino telemonitoramento por telefone'}] },
      { tipo:'escolha', id:'ic-c-encaminha', rot:'Especialista, com a APS corresponsável', lacuna:false, multi:true,
        tpl:'encaminho ao especialista, mantendo o acompanhamento na APS: {d}', opts:[
        {v:'nyha2', rot:'NYHA II com critério de sacubitril-valsartana', frase:'NYHA II com critério de sacubitril-valsartana'},
        {v:'nyha34', rot:'NYHA III ou IV já otimizado', frase:'NYHA III ou IV já otimizado'},
        {v:'internacao', rot:'internação por IC no último ano', frase:'internação por IC no último ano'},
        {v:'acesso', rot:'sem acesso a ecocardiograma ou BNP', frase:'sem acesso a ecocardiograma ou BNP'},
        {v:'dispositivo', rot:'disfunção grave candidata a dispositivo ou transplante', frase:'disfunção grave, candidata a dispositivo ou transplante'},
        {v:'fa', rot:'fibrilação atrial', frase:'fibrilação atrial'},
        {v:'icfep', rot:'suspeita de IC com fração de ejeção preservada', frase:'suspeita de IC com fração de ejeção preservada'}] },
      C_C_VACINA
    ]}
  }
});

/* ---------- 4. Obesidade no adulto ---------- */
QUADROS.push({
  id: 'obesidade', nome: 'Obesidade no adulto', queixa: 'obesidade-adulto', grupo: 'A2-Cardiorrenal-Metabolica',
  fonte: 'TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022 · MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020 · MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025',
  ciap: ['T82', 'T83'], cid: ['E66'],
  blocos: {
    anamnese: { rot: 'Obesidade — história do peso, causas, comportamento', itens: [
      { tipo:'texto', id:'ob-inicio', rot:'Como e quando o peso subiu; o que desencadeou (parar de fumar, estresse, cirurgia, gestação, remédio novo)', ph:'subiu depois da gestação; parou de fumar há 2 anos', fmt:'ganho de peso: {v}' },
      { tipo:'tri', id:'ob-obesogenico', rot:'Fármaco que engorda: antipsicótico, antidepressivo (amitriptilina, mirtazapina, paroxetina), lítio, corticoide, propranolol, insulina ou sulfonilureia, anticonvulsivante, anti-histamínico de 1ª geração ou progestágeno injetável', na:'fármacos que engordam',
        sim:'usa fármaco associado a ganho de peso[: {d}]', nao:'nega fármaco associado a ganho de peso', det:{tipo:'texto', ph:'qual'} },
      { tipo:'tri', id:'ob-compulsao', rot:'Come grande quantidade com sensação de perder o controle; come escondido ou à noite', na:'compulsão alimentar', junto:true,
        sim:'refere comer grande quantidade com perda de controle[: {d}]', nao:'nega comer grande quantidade com perda de controle', det:{tipo:'texto', ph:'escondido, à noite, quantas vezes'} },
      { tipo:'tri', id:'ob-compensa', rot:'Compensa com vômito provocado ou laxante (bulimia: tratar o transtorno alimentar primeiro)', na:'compensação com vômito ou laxante', junto:true,
        sim:'refere compensar com vômito ou laxante[: {d}]', nao:'nega compensar com vômito ou laxante', det:{tipo:'texto', ph:'qual, com que frequência'} },
      { tipo:'texto', id:'ob-alimentacao', rot:'Padrão alimentar (ultraprocessados, refrigerante e suco adoçado, número de refeições) e tempo de tela', ph:'3 refeições, refrigerante diário, 4 horas de tela', fmt:'padrão alimentar e tempo de tela: {v}' },
      { tipo:'tri', id:'ob-apneia', rot:'Ronco, pausas na respiração ou sonolência de dia (apneia do sono)', na:'sintomas de apneia do sono',
        sim:'refere {d}', simSemDet:'refere sintomas de apneia do sono', nao:'nega ronco, pausas na respiração e sonolência de dia',
        det:{tipo:'escolha', multi:true, opts:[{v:'ronco', rot:'ronco'}, {v:'pausas', rot:'pausas na respiração'}, {v:'sonolencia', rot:'sonolência de dia'}]} },
      { tipo:'tri', id:'ob-sintomas', rot:'Humor, sono, dor nas articulações, refluxo ou perda de urina', na:'humor, sono, dor articular, refluxo e perda de urina', junto:true,
        sim:'refere {d}', simSemDet:'refere alteração do humor, do sono, dor articular, refluxo ou perda de urina', nao:'nega alteração do humor e do sono, dor articular, refluxo e perda de urina',
        det:{tipo:'escolha', multi:true, opts:[{v:'humor', rot:'alteração do humor'}, {v:'sono', rot:'alteração do sono'}, {v:'artic', rot:'dor articular'},
          {v:'refluxo', rot:'refluxo'}, {v:'urina', rot:'perda de urina'}]} },
      { tipo:'tri', id:'sm-ideacao', rot:'Ideação suicida (perguntar diretamente: perguntar não induz)', na:'ideação suicida',
        sim:'refere ideação suicida[: {d}]', nao:'nega ideação suicida', det:{tipo:'texto', ph:'desde quando, frequência'}, sub:[
          { id:'sm-plano', rot:'Plano', na:'plano suicida', sim:'com plano', nao:'sem plano' },
          { id:'sm-meio', rot:'Meio letal disponível (arma de fogo em casa)', na:'meio letal disponível', sim:'com meio letal disponível', nao:'sem meio letal disponível' },
          { id:'sm-suporte', rot:'Suporte social frágil ou isolamento', na:'suporte social', sim:'com suporte social frágil', nao:'com suporte social' }] },
      { tipo:'tri', id:'ob-poliuria', rot:'Perda de peso sem querer com muita sede e muita urina (diabetes descompensado)', na:'poliúria, polidipsia e perda de peso', junto:true,
        sim:'refere {d}', simSemDet:'refere poliúria, polidipsia ou perda de peso involuntária', nao:'nega poliúria, polidipsia e perda de peso involuntária',
        det:{tipo:'escolha', multi:true, opts:[{v:'poliuria', rot:'poliúria'}, {v:'polidipsia', rot:'polidipsia'}, {v:'perda', rot:'perda de peso involuntária'}]} },
      { tipo:'tri', id:'ob-hipotalamica', rot:'Ganho de peso com cefaleia, alteração visual, convulsão, sonolência ou mudança de comportamento (obesidade hipotalâmica: rara, não é caso de dieta)', na:'sintomas neurológicos com o ganho de peso', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas neurológicos junto do ganho de peso', nao:'nega cefaleia, alteração visual, convulsão, sonolência e mudança de comportamento',
        det:{tipo:'escolha', multi:true, opts:[{v:'cefaleia', rot:'cefaleia'}, {v:'visual', rot:'alteração visual'}, {v:'convulsao', rot:'convulsão'}, {v:'sonolencia', rot:'sonolência'}, {v:'comportamento', rot:'mudança de comportamento'}]} },
      { tipo:'texto', id:'ob-tentativas', rot:'O que já tentou para emagrecer e o que espera do tratamento agora', ph:'dietas, academia; espera voltar ao peso de 5 anos atrás', fmt:'tratamentos já tentados e expectativa: {v}' },
      { tipo:'escolha', id:'ob-estagio', rot:'Quer mudar agora? Estágio de mudança', na:'estágio de mudança', tpl:'estágio de mudança: {d}', opts:[
        {v:'pre', rot:'não pensa nisso', frase:'não pensa em mudar'}, {v:'contempla', rot:'pensando', frase:'pensando em mudar'},
        {v:'prepara', rot:'se preparando', frase:'se preparando para mudar'}, {v:'acao', rot:'já mudou', frase:'já mudou'}] }
    ]},
    ef: { rot: 'Obesidade — sinais de causa endócrina', itens: [
      { tipo:'tri', id:'ob-cushing', rot:'Giba, estrias violáceas ou equimoses (síndrome de Cushing)', na:'sinais de Cushing',
        sim:'{d}', simSemDet:'sinais de síndrome de Cushing', nao:'sem giba, estrias violáceas nem equimoses',
        det:{tipo:'escolha', multi:true, opts:[{v:'giba', rot:'giba'}, {v:'estrias', rot:'estrias violáceas'}, {v:'equimoses', rot:'equimoses'}]} },
      { tipo:'tri', id:'ob-pelos', rot:'Rarefação de pelos (hipotireoidismo; a bradicardia aparece na FC)', na:'rarefação de pelos', junto:true,
        sim:'rarefação de pelos', nao:'sem rarefação de pelos' },
      { tipo:'tri', id:'ob-hirsutismo', rot:'Hirsutismo (ovários policísticos)', na:'hirsutismo', junto:true,
        sim:'hirsutismo[: {d}]', nao:'sem hirsutismo', det:{tipo:'texto', ph:'onde'} }
    ]},
    conduta: { rot: 'Obesidade — classificação e plano', itens: [
      { tipo:'escolha', id:'ob-c-grau', rot:'Classificação pelo IMC (sobrepeso 25 a 29,9; grau I 30 a 34,9; grau II 35 a 39,9; grau III 40 ou mais)', na:'classificação pelo IMC', tpl:'classificação pelo IMC: {d}', opts:[
        {v:'sobrepeso', rot:'sobrepeso', frase:'sobrepeso'}, {v:'g1', rot:'obesidade grau I', frase:'obesidade grau I'},
        {v:'g2', rot:'obesidade grau II', frase:'obesidade grau II'}, {v:'g3', rot:'obesidade grau III', frase:'obesidade grau III'}] },
      { tipo:'texto', id:'ob-c-meta', rot:'Meta combinada (perder 5 a 10% do peso já melhora PA, glicemia e triglicerídeo; sucesso é manter a perda de 10% ou mais depois de 1 ano)', ph:'perder 5% do peso em 6 meses', fmt:'meta combinada: {v}' },
      C_RCV,
      { tipo:'escolha', id:'ob-c-exames', rot:'Exames (sem comorbidade conhecida nem suspeita clínica; os demais, só pela suspeita)', lacuna:false, tpl:'solicito {d}', opts:[
        {v:'basico', rot:'hemograma, glicemia de jejum, perfil lipídico, TGO, TGP e TSH', frase:'hemograma, glicemia de jejum, perfil lipídico, TGO, TGP e TSH'}] },
      { tipo:'escolha', id:'ob-c-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'alim', rot:'alimentação pelos 10 passos do Guia Alimentar', frase:'alimentação pelos 10 passos do Guia Alimentar: base em alimentos in natura, evitar ultraprocessados, trocar bebida açucarada por água, ao menos 3 refeições por dia, pouco óleo, sal e açúcar'},
        {v:'atividade', rot:'atividade física: 150 minutos por semana de moderada, aeróbica e de força', frase:'atividade física de 150 minutos por semana de moderada (ou 75 de vigorosa), aeróbica e de força, com fortalecimento 2 vezes por semana, começando moderado'},
        {v:'peso', rot:'pesar-se em casa uma vez por semana (se quiser e tiver balança)', frase:'pesar-se em casa uma vez por semana'}] },
      { tipo:'escolha', id:'ob-c-rede', rot:'Rede de cuidado', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'nutri', rot:'nutricionista da APS (prioridade: comorbidade que exige dieta específica, candidato à cirurgia ou falha na APS)', frase:'nutricionista da APS'},
        {v:'academia', rot:'polo da Academia da Saúde', frase:'polo da Academia da Saúde'},
        {v:'psico', rot:'suporte psicológico (entrevista motivacional e TCC)', frase:'suporte psicológico, com entrevista motivacional e terapia cognitivo-comportamental'},
        {v:'pics', rot:'práticas integrativas (yoga, auriculoterapia, tai chi chuan)', frase:'práticas integrativas (yoga, auriculoterapia ou tai chi chuan)'},
        {v:'endocrino', rot:'endocrinologia (suspeita de obesidade secundária)', frase:'endocrinologia, por suspeita de obesidade secundária'},
        {v:'especializada', rot:'atenção especializada (IMC de 35 ou mais com comorbidade descompensada, ou de 40 ou mais)', frase:'atenção especializada, por IMC de 35 ou mais com comorbidade descompensada, ou de 40 ou mais'}] },
      { tipo:'escolha', id:'ob-c-bariatrica', rot:'Cirurgia bariátrica (IMC de 50 ou mais; de 40 a 49,9 ou de 35 a 39,9 com comorbidade, depois de 2 anos de tratamento clínico)', na:'cirurgia bariátrica', lacuna:false, opts:[
        {v:'discutida', rot:'encaminhamento discutido', frase:'discuto o encaminhamento para cirurgia bariátrica'},
        {v:'sem', rot:'sem critério no momento', frase:'sem critério para cirurgia bariátrica no momento'}] }
    ]}
  }
});


/* ======================= A2 — RESPIRATÓRIA ======================= */

/* ---------- 5. Asma ---------- */
QUADROS.push({
  id: 'asma', nome: 'Asma', queixa: 'asma', grupo: 'A2-Respiratoria',
  fonte: 'MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023 · SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012',
  ciap: ['R96'], cid: ['J45'],
  blocos: {
    anamnese: { rot: 'Asma — controle, risco, gatilhos', itens: [
      { tipo:'tri', id:'as-controle', rot:'Nas últimas 4 semanas: sintomas de dia, despertar à noite, SABA de alívio ou limitação por causa da asma', na:'sintomas nas últimas 4 semanas',
        sim:'nas últimas 4 semanas, {d}', simSemDet:'sintomas de asma nas últimas 4 semanas',
        nao:'nas últimas 4 semanas, nega sintomas de dia mais de 2 vezes por semana, despertar noturno, uso de SABA de alívio mais de 2 vezes por semana e limitação por asma',
        det:{tipo:'escolha', multi:true, opts:[{v:'dia', rot:'sintomas de dia mais de 2 vezes por semana'}, {v:'noite', rot:'acordou à noite pela asma', frase:'despertar noturno pela asma'},
          {v:'saba', rot:'SABA de alívio mais de 2 vezes por semana', frase:'uso de SABA de alívio mais de 2 vezes por semana'}, {v:'limita', rot:'limitação por causa da asma', frase:'limitação por asma'}]} },
      { tipo:'escolha', id:'as-nivel', rot:'Controle (nenhum sim: controlada; 1 ou 2: parcialmente; 3 ou 4: não controlada)', na:'nível de controle', junto:true, tpl:'asma {d}', opts:[
        {v:'controlada', rot:'controlada', frase:'controlada'}, {v:'parcial', rot:'parcialmente controlada', frase:'parcialmente controlada'},
        {v:'nao', rot:'não controlada', frase:'não controlada'}] },
      { tipo:'tri', id:'as-exacerbacao', rot:'No último ano: crise que precisou de corticoide oral ou ida à emergência; alguma vez internação, UTI ou intubação', na:'crises, emergência, internação e UTI',
        sim:'refere crise com corticoide oral, ida à emergência, internação, UTI ou intubação[: {d}]', nao:'nega, no último ano, crise com corticoide oral ou ida à emergência; nega internação, UTI e intubação',
        det:{tipo:'texto', ph:'quantas crises com corticoide oral, idas à emergência; internação, UTI, intubação'} },
      { tipo:'texto', id:'as-frascos', rot:'Frascos de salbutamol usados no último ano (mais de 3 frascos de 200 doses é uso excessivo)', curto:true, ph:'2', fmt:'usou {v} frascos de salbutamol no último ano' },
      { tipo:'tri', id:'as-ci-diario', rot:'Usa o corticoide inalatório todo dia', na:'uso diário do corticoide inalatório', lacuna:false,
        sim:'usa o corticoide inalatório todo dia', nao:'não usa o corticoide inalatório todo dia' },
      C_EXPOSICAO,
      { tipo:'tri', id:'as-trabalho', rot:'Sintomas pioram nos dias de trabalho e melhoram em folgas, feriados e férias (asma ocupacional)', na:'relação com o trabalho', lacuna:false, junto:true,
        sim:'sintomas pioram nos dias de trabalho e melhoram nas folgas[: {d}]', nao:'nega piora dos sintomas nos dias de trabalho', det:{tipo:'texto', ph:'trabalho, exposição'} },
      { tipo:'tri', id:'as-gatilhos', rot:'Gatilhos: virose, exercício, alérgenos (poeira, ácaro, mofo, pelos), ar frio ou riso', na:'gatilhos', junto:true,
        sim:'refere gatilhos: {d}', simSemDet:'refere gatilhos', nao:'nega gatilhos (virose, exercício, alérgenos, ar frio e riso)',
        det:{tipo:'escolha', multi:true, opts:[{v:'virose', rot:'virose'}, {v:'exercicio', rot:'exercício'}, {v:'alergenos', rot:'alérgenos (poeira, ácaro, mofo, pelos)'},
          {v:'frio', rot:'ar frio'}, {v:'riso', rot:'riso'}]} },
      { tipo:'tri', id:'as-aine', rot:'Anti-inflamatório (piora a obstrução)', na:'anti-inflamatório', junto:true,
        sim:'usa anti-inflamatório[: {d}]', nao:'nega anti-inflamatório', det:{tipo:'texto', ph:'qual'} },
      C_BETABLOQ,
      { tipo:'tri', id:'as-comorb', rot:'Rinite, refluxo, ronco com pausas, obesidade, ansiedade ou depressão', na:'rinite, refluxo, apneia e saúde mental', junto:true,
        sim:'refere {d}', simSemDet:'refere rinite, refluxo, ronco com pausas, obesidade, ansiedade ou depressão', nao:'nega rinite, refluxo, ronco com pausas, ansiedade e depressão',
        det:{tipo:'escolha', multi:true, opts:[{v:'rinite', rot:'rinite'}, {v:'refluxo', rot:'refluxo'}, {v:'ronco', rot:'ronco com pausas'}, {v:'obesidade', rot:'obesidade'},
          {v:'ansiedade', rot:'ansiedade'}, {v:'depressao', rot:'depressão'}]} },
      { tipo:'tri', id:'as-fatal', rot:'Anafilaxia ou alergia alimentar (risco de morrer de asma)', na:'anafilaxia e reação alérgica a alimento', junto:true,
        sim:'refere anafilaxia ou alergia alimentar[: {d}]', nao:'nega anafilaxia e alergia alimentar', det:{tipo:'texto', ph:'qual alimento, quando'} },
      { tipo:'tri', id:'as-labil', rot:'Crises que começam de repente e já graves, sem perceber o início (asma lábil)', na:'asma lábil', junto:true,
        sim:'refere crises de início súbito e já graves, sem perceber o início', nao:'nega crises de início súbito e já graves' },
      { tipo:'tri', id:'as-dpoc', rot:'Começou depois dos 40 anos, com falta de ar diária e progressiva (pensar em DPOC ou sobreposição)', na:'início tardio e dispneia progressiva',
        sim:'início depois dos 40 anos, com falta de ar diária e progressiva', nao:'nega início depois dos 40 anos com falta de ar diária e progressiva' },
      GRAVIDEZ,
      C_VACINA
    ]},
    ef: { rot: 'Asma — exame', itens: [
      C_TECNICA,
      AUSC_PULM,
      { tipo:'tri', id:'as-vas', rot:'Vias aéreas superiores: sinais de rinite alérgica ou pólipos nasais', na:'rinite alérgica e pólipos nasais', junto:true,
        sim:'sinais de rinite alérgica ou pólipos nasais[: {d}]', nao:'sem sinais de rinite alérgica nem pólipos nasais', det:{tipo:'texto', ph:'o quê'} },
      { tipo:'tri', id:'as-crise', rot:'Sinais de crise: fala entrecortada, musculatura acessória, cianose ou tórax silencioso', na:'sinais de crise', junto:true,
        sim:'sinais de crise[: {d}]', nao:'sem sinais de crise', det:{tipo:'texto', ph:'quais'} },
      { tipo:'texto', id:'as-pfe', rot:'PFE quando não há espirometria (maior de 3 sopros, sempre com o mesmo medidor)', curto:true, ph:'400 L/min, 80% do previsto', fmt:'PFE: {v}' }
    ]},
    conduta: { rot: 'Asma — etapa e plano', itens: [
      { tipo:'escolha', id:'as-c-etapa', rot:'Etapa do tratamento (a etapa 5 vai à pneumologia)', na:'etapa do tratamento', tpl:'etapa {d} do tratamento', opts:[
        {v:'1', rot:'1', frase:'1'}, {v:'2', rot:'2', frase:'2'}, {v:'3', rot:'3', frase:'3'}, {v:'4', rot:'4', frase:'4'}, {v:'5', rot:'5', frase:'5'}] },
      { tipo:'escolha', id:'as-c-regime', rot:'Regime combinado com o paciente (o regime 1, formoterol com budesonida, pede LME no CEAF; sem acesso, o regime 2, beclometasona com salbutamol, com o que a USF tem; os fármacos entram na prescrição)', na:'regime de tratamento', junto:true, tpl:'regime {d}', opts:[
        {v:'1', rot:'1 — formoterol com budesonida (CEAF)', frase:'1, com LME para o CEAF'},
        {v:'2', rot:'2 — beclometasona com salbutamol (USF e Farmácia Popular)', frase:'2, com o que a USF entrega'}] },
      { tipo:'escolha', id:'as-c-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'espirometria', rot:'espirometria com broncodilatador (diagnóstico; 3 a 6 meses depois de iniciar; depois a cada 1 a 2 anos; não em suspeita de tuberculose)', frase:'espirometria com broncodilatador'},
        {v:'pfe', rot:'PFE seriado, sem espirometria (aumento de 20% ou mais com broncodilatador, ou variabilidade acima de 10% em 2 semanas)', frase:'monitorização do PFE por 2 semanas'},
        {v:'rx', rot:'radiografia de tórax (só para diagnóstico diferencial)', frase:'radiografia de tórax, para diagnóstico diferencial'},
        {v:'hemograma', rot:'hemograma (anemia e eosinofilia)', frase:'hemograma'}] },
      { tipo:'escolha', id:'as-c-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'plano', rot:'plano de ação escrito, revisado em toda consulta', frase:'plano de ação escrito, revisado em toda consulta'},
        {v:'tecnica', rot:'técnica inalatória, treinada em toda consulta', frase:'técnica inalatória, com treino e revisão em toda consulta (espaçador artesanal de garrafa plástica funciona)'},
        {v:'fumaca', rot:'cessação do tabagismo; casa e carro sem fumaça', frase:'cessação do tabagismo e casa e carro sem fumaça'},
        {v:'ambiente', rot:'atividade física, perda de peso na obesidade, controle de mofo e umidade', frase:'atividade física regular (Academia da Saúde), perda de peso na obesidade e controle de mofo e umidade'}] },
      { tipo:'escolha', id:'as-c-encaminha', rot:'Encaminhamento à pneumologia', lacuna:false, multi:true, tpl:'encaminho à pneumologia, por {d}', opts:[
        {v:'etapa5', rot:'etapa 5', frase:'etapa 5'},
        {v:'etapa4', rot:'sintomas ou exacerbações na etapa 4 por 3 meses ou mais, com adesão e técnica revisadas', frase:'sintomas ou exacerbações na etapa 4 há 3 meses ou mais, com adesão e técnica revisadas'},
        {v:'fatal', rot:'risco de fatalidade', frase:'risco de fatalidade'},
        {v:'labil', rot:'asma lábil', frase:'asma lábil'},
        {v:'tabagista', rot:'tabagista motivado com Fagerström acima de 6 que falhou na APS', frase:'tabagismo com Fagerström acima de 6 que falhou na APS'}] },
      { tipo:'escolha', id:'as-c-trabalho', rot:'Medicina do Trabalho: asma ocupacional', lacuna:false, opts:[
        {v:'trabalho', rot:'encaminhado', frase:'encaminho à Medicina do Trabalho, por asma ocupacional'}] },
      C_C_VACINA
    ]}
  }
});

/* ---------- 6. DPOC ---------- */
QUADROS.push({
  id: 'dpoc', nome: 'DPOC', queixa: 'dpoc', grupo: 'A2-Respiratoria',
  fonte: 'MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 · medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)',
  ciap: ['R95'], cid: ['J44'],
  blocos: {
    anamnese: { rot: 'DPOC — tabagismo, dispneia, exacerbações', itens: [
      { tipo:'texto', id:'dp-fagerstrom', rot:'Fagerström (tempo até o primeiro cigarro: 6 a 7 é dependência elevada; 8 a 10, muito elevada)', curto:true, ph:'0 a 10', fmt:'Fagerström: {v} pontos' },
      { tipo:'escolha', id:'dp-estagio', rot:'Tabagista: estágio para parar de fumar', na:'estágio para parar de fumar', lacuna:false, junto:true, tpl:'estágio para parar de fumar: {d}', opts:[
        {v:'pre', rot:'não pensa em parar', frase:'não pensa em parar'}, {v:'contempla', rot:'pensando em parar', frase:'pensando em parar'},
        {v:'prepara', rot:'se preparando', frase:'se preparando para parar'}, {v:'acao', rot:'já parou', frase:'já parou'}] },
      C_EXPOSICAO,
      { tipo:'escolha', id:'dp-mmrc', rot:'Falta de ar pela escala mMRC', na:'dispneia pela mMRC', tpl:'dispneia mMRC {d}', opts:[
        {v:'0', rot:'0 — só em esforço intenso', frase:'0'}, {v:'1', rot:'1 — ao correr ou subir ladeira leve', frase:'1'},
        {v:'2', rot:'2 — anda mais devagar que os da mesma idade ou para no plano', frase:'2'}, {v:'3', rot:'3 — para depois de cerca de 100 metros', frase:'3'},
        {v:'4', rot:'4 — não sai de casa ou cansa ao se vestir', frase:'4'}] },
      { tipo:'tri', id:'dp-exacerbacao', rot:'Nos últimos 12 meses: pioras tratadas com antibiótico ou corticoide (moderadas) e internações (graves)', na:'exacerbações nos últimos 12 meses',
        sim:'exacerbações nos últimos 12 meses[: {d}]', nao:'nega exacerbação nos últimos 12 meses', det:{tipo:'texto', ph:'quantas moderadas, quantas internações'} },
      { tipo:'tri', id:'dp-antecedentes', rot:'Asma na infância, tuberculose, prematuridade ou baixo peso ao nascer, infecções respiratórias repetidas, HIV; DPOC ou enfisema precoce na família', na:'antecedentes respiratórios e familiares', junto:true,
        sim:'refere {d}', simSemDet:'refere antecedente respiratório ou familiar', nao:'nega asma na infância, tuberculose, prematuridade ou baixo peso ao nascer, infecções respiratórias repetidas, HIV e DPOC ou enfisema precoce na família',
        det:{tipo:'escolha', multi:true, opts:[{v:'asma', rot:'asma na infância'}, {v:'tb', rot:'tuberculose'}, {v:'prematuro', rot:'prematuridade ou baixo peso ao nascer'},
          {v:'infeccoes', rot:'infecções respiratórias repetidas'}, {v:'hiv', rot:'HIV'}, {v:'familia', rot:'DPOC ou enfisema precoce na família'}]} },
      { tipo:'tri', id:'dp-saba', rot:'Usa salbutamol todo dia como manutenção', na:'salbutamol de manutenção', junto:true,
        sim:'usa salbutamol todo dia como manutenção', nao:'não usa salbutamol todo dia como manutenção' },
      { tipo:'tri', id:'dp-asma', rot:'Sintomas que variam, pioram à noite ou alergia (asma junto muda o tratamento)', na:'sintomas variáveis, noturnos ou alérgicos', junto:true,
        sim:'refere sintomas variáveis, piora à noite ou alergia[: {d}]', nao:'nega sintomas variáveis, piora à noite e alergia', det:{tipo:'texto', ph:'o quê'} },
      { tipo:'tri', id:'dp-alarme', rot:'Tosse com expectoração, escarro com sangue, febre à tarde ou suor noturno (excluir tuberculose e câncer de pulmão antes de chamar de DPOC)', na:'expectoração, hemoptise, febre e suor noturno', junto:true,
        sim:'refere {d}', simSemDet:'refere expectoração, escarro com sangue, febre à tarde ou suor noturno', nao:'nega tosse com expectoração, escarro com sangue, febre à tarde e suor noturno',
        det:{tipo:'escolha', multi:true, opts:[{v:'expectoracao', rot:'tosse com expectoração'}, {v:'sangue', rot:'escarro com sangue'}, {v:'febre', rot:'febre à tarde'}, {v:'suor', rot:'suor noturno'}]} },
      { tipo:'tri', id:'dp-humor-peso', rot:'Ansiedade, depressão ou perda de peso', na:'ansiedade, depressão e perda de peso', junto:true,
        sim:'refere {d}', simSemDet:'refere ansiedade, depressão ou perda de peso', nao:'nega ansiedade, depressão e perda de peso',
        det:{tipo:'escolha', multi:true, opts:[{v:'ansiedade', rot:'ansiedade'}, {v:'depressao', rot:'depressão'}, {v:'peso', rot:'perda de peso'}]} },
      C_VACINA
    ]},
    ef: { rot: 'DPOC — exame', itens: [
      { tipo:'texto', id:'dp-sat-esforco', rot:'SpO2 ao esforço (degrau ou marcha parada por 3 a 5 minutos), na DPOC grave ou suspeita de hipoxemia', curto:true, ph:'90', fmt:'SpO2 ao esforço: {v}%' },
      { tipo:'tri', id:'dp-avancada', rot:'Cianose, tórax em barril ou tiragem intercostal (doença avançada)', na:'sinais de doença avançada',
        sim:'{d}', simSemDet:'sinais de doença avançada', nao:'sem cianose, tórax em barril nem tiragem intercostal',
        det:{tipo:'escolha', multi:true, opts:[{v:'cianose', rot:'cianose'}, {v:'barril', rot:'tórax em barril'}, {v:'tiragem', rot:'tiragem intercostal'}]} },
      { tipo:'tri', id:'dp-cancer', rot:'Linfonodo supraclavicular ou cervical baixo, derrame pleural ou baqueteamento digital (pensar em câncer de pulmão)', na:'linfonodo, derrame pleural e baqueteamento', junto:true,
        sim:'{d}', simSemDet:'linfonodo supraclavicular ou cervical baixo, derrame pleural ou baqueteamento digital', nao:'sem linfonodo supraclavicular ou cervical baixo, derrame pleural nem baqueteamento digital',
        det:{tipo:'escolha', multi:true, opts:[{v:'linfonodo', rot:'linfonodo supraclavicular ou cervical baixo'}, {v:'derrame', rot:'derrame pleural'}, {v:'baqueteamento', rot:'baqueteamento digital'}]} },
      { tipo:'tri', id:'dp-icd', rot:'Sinais de insuficiência cardíaca direita: turgência jugular, refluxo hepatojugular, edema, B2 hiperfonética', na:'sinais de insuficiência cardíaca direita', junto:true,
        sim:'sinais de insuficiência cardíaca direita[: {d}]', nao:'sem sinais de insuficiência cardíaca direita', det:{tipo:'texto', ph:'quais'} },
      C_TECNICA
    ]},
    conduta: { rot: 'DPOC — classificação e plano', itens: [
      { tipo:'escolha', id:'dp-c-gold', rot:'Grau GOLD pelo VEF1 pós-broncodilatador (espirometria)', na:'grau GOLD', tpl:'DPOC GOLD {d}', opts:[
        {v:'1', rot:'1 — VEF1 de 80% ou mais', frase:'1'}, {v:'2', rot:'2 — VEF1 de 50 a 79%', frase:'2'},
        {v:'3', rot:'3 — VEF1 de 30 a 49%', frase:'3'}, {v:'4', rot:'4 — VEF1 abaixo de 30%', frase:'4'}] },
      { tipo:'escolha', id:'dp-c-grupo', rot:'Grupo pelo risco (A: mMRC 0 a 1 e até uma exacerbação moderada; B: mMRC 2 ou mais; E: internação ou 2 ou mais moderadas no ano)', na:'grupo A, B ou E', junto:true, tpl:'grupo {d}', opts:[
        {v:'a', rot:'A', frase:'A'}, {v:'b', rot:'B', frase:'B'}, {v:'e', rot:'E', frase:'E'}] },
      { tipo:'escolha', id:'dp-c-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'espirometria', rot:'espirometria pré e pós-broncodilatador (diagnóstico e grau)', frase:'espirometria pré e pós-broncodilatador'},
        {v:'hemograma', rot:'hemograma na 1ª consulta (anemia, policitemia, eosinófilos)', frase:'hemograma'},
        {v:'rx', rot:'radiografia de tórax PA e perfil na 1ª consulta (sem outra dos últimos 12 meses)', frase:'radiografia de tórax PA e perfil'},
        {v:'gaso', rot:'gasometria arterial (SpO2 de 92% ou menos)', frase:'gasometria arterial'},
        {v:'ecg-eco', rot:'ECG e ecocardiograma (suspeita de cor pulmonale ou cardiopatia)', frase:'ECG e ecocardiograma'},
        {v:'alfa1', rot:'alfa-1-antitripsina (nos casos indicados)', frase:'alfa-1-antitripsina'},
        {v:'escarro', rot:'escarro para TRM-TB ou baciloscopia (tosse com expectoração há 2 semanas ou mais)', frase:'escarro para TRM-TB ou baciloscopia'}] },
      { tipo:'escolha', id:'dp-c-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'fumo', rot:'cessação do tabagismo, estruturada em toda consulta', frase:'cessação do tabagismo, com abordagem estruturada (mínima, terapia cognitivo-comportamental ou grupo)'},
        {v:'tecnica', rot:'técnica inalatória e adesão, com demonstração', frase:'técnica inalatória e adesão, com demonstração'},
        {v:'plano', rot:'plano escrito de autocuidado na piora', frase:'plano escrito de autocuidado: o que fazer na piora e quando procurar atendimento'},
        {v:'reabilita', rot:'reabilitação ou atividade física orientada', frase:'atividade física orientada (caminhada, subir e descer escada, sentar e levantar da cadeira, pesos leves; Academia da Saúde)'},
        {v:'oxigenio', rot:'não fumar em uso de oxigênio domiciliar (risco de explosão)', frase:'não fumar em uso de oxigênio domiciliar, pelo risco de explosão'}] },
      { tipo:'escolha', id:'dp-c-vacina', rot:'Vacinas (influenza todo ano; pneumocócicas nos sintomáticos, exacerbadores ou com comorbidade de risco)', na:'vacinas', lacuna:false, multi:true, opts:[
        {v:'hoje', rot:'atualizadas hoje', frase:'vacinas da idade atualizadas', so:true},
        {v:'sala', rot:'à sala de vacina', frase:'encaminho à sala de vacina'},
        {v:'crie', rot:'pneumocócica pelo CRIE (conjugada primeiro, polissacarídica 23-valente 6 meses depois)', frase:'encaminho ao CRIE para a vacina pneumocócica'}] },
      { tipo:'escolha', id:'dp-c-encaminha', rot:'Encaminhamento à pneumologia', lacuna:false, multi:true, tpl:'encaminho à pneumologia, por {d}', opts:[
        {v:'vef1', rot:'VEF1 abaixo de 30%', frase:'VEF1 abaixo de 30%'},
        {v:'exacerb', rot:'2 ou mais exacerbações no ano, 1 internação ou mMRC de 2 ou mais, apesar de 3 meses de tratamento otimizado', frase:'2 ou mais exacerbações no ano, 1 internação ou mMRC de 2 ou mais, apesar de 3 meses de tratamento otimizado'},
        {v:'cor', rot:'suspeita de cor pulmonale', frase:'suspeita de cor pulmonale'},
        {v:'o2', rot:'SpO2 de 92% ou menos em repouso, fora de exacerbação (oxigênio domiciliar)', frase:'SpO2 de 92% ou menos em repouso, fora de exacerbação (avaliar oxigênio domiciliar)'},
        {v:'tabagista', rot:'tabagista motivado com Fagerström acima de 6 que falhou na APS', frase:'tabagismo com Fagerström acima de 6 que falhou na APS'},
        {v:'enfisema', rot:'enfisema precoce (antes dos 40), de predomínio basal, sobretudo em não fumante', frase:'enfisema de início precoce, de predomínio basal'}] },
      { tipo:'escolha', id:'dp-c-reavalia', rot:'Depois de uma exacerbação', lacuna:false, opts:[
        {v:'s', rot:'reavaliar em 1 a 4 semanas e de novo em 12 a 16 semanas', frase:'reavalio em 1 a 4 semanas e de novo em 12 a 16 semanas depois da exacerbação'}] },
      C_RCV
    ]}
  }
});

/* ---------- 7. IVAS: gripe, garganta, ouvido, seios da face ---------- */
QUADROS.push({
  id: 'ivas', nome: 'IVAS (gripe, garganta, ouvido)', queixa: 'ivas', grupo: 'A2-Respiratoria',
  fonte: 'MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Guia de manejo e tratamento de influenza, 2023 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023',
  ciap: ['R74', 'R76', 'R72', 'R75', 'H71', 'H70', 'R80'], cid: ['J00', 'J06', 'J02', 'J03', 'J01', 'H66', 'H60', 'J11'],
  blocos: {
    anamnese: { rot: 'IVAS — quadro, risco de influenza, ouvido', itens: [
      { tipo:'tri', id:'iv-bacteriana', rot:'Piora depois do 5º dia ou sintomas além de 10 a 14 dias (sugere rinossinusite bacteriana)', na:'evolução dos sintomas',
        sim:'piora depois do 5º dia ou sintomas além de 10 a 14 dias', nao:'sem piora depois do 5º dia nem sintomas além de 10 a 14 dias' },
      { tipo:'tri', id:'iv-sg', rot:'Febre de início súbito com tosse ou dor de garganta, mais cefaleia, mialgia ou artralgia (síndrome gripal)', na:'síndrome gripal', junto:true,
        sim:'febre de início súbito com tosse ou dor de garganta[: {d}]', nao:'nega febre de início súbito com tosse ou dor de garganta', det:{tipo:'texto', ph:'cefaleia, mialgia, artralgia'} },
      { tipo:'tri', id:'iv-risco', rot:'Condição ou fator de risco para complicar a influenza', na:'fator de risco para complicação da influenza', junto:true,
        sim:'fator de risco para complicação da influenza: {d}', simSemDet:'fator de risco para complicação da influenza', nao:'nega condição ou fator de risco para complicação da influenza',
        det:{tipo:'escolha', multi:true, opts:[
          {v:'gestante', rot:'gestante ou puérpera até 2 semanas (inclusive depois de aborto ou perda fetal)', frase:'gestante ou puérpera até 2 semanas'},
          {v:'idoso', rot:'60 anos ou mais', frase:'idade de 60 anos ou mais'}, {v:'menor5', rot:'menor de 5 anos', frase:'idade menor de 5 anos'},
          {v:'indigena', rot:'indígena aldeado'}, {v:'aas', rot:'menor de 19 anos em uso prolongado de AAS'},
          {v:'pneumo', rot:'pneumopatia (inclusive asma) ou tuberculose', frase:'pneumopatia, inclusive asma, ou tuberculose'},
          {v:'cardio', rot:'cardiopatia (HAS isolada não conta)', frase:'cardiopatia'}, {v:'nefro', rot:'nefropatia ou hepatopatia'},
          {v:'dm', rot:'diabetes', frase:'diabetes'}, {v:'hemato', rot:'doença hematológica ou neurológica'},
          {v:'imuno', rot:'câncer, HIV/aids ou imunossupressão'}, {v:'obesidade', rot:'obesidade (sobretudo IMC de 40 ou mais)', frase:'obesidade'}]} },
      { tipo:'tri', id:'iv-imunossupressor', rot:'Corticoide sistêmico em dose imunossupressora há mais de 2 semanas, quimioterápico ou anti-TNF (conta como imunossupressão)', na:'imunossupressor', junto:true,
        sim:'em uso de corticoide sistêmico imunossupressor, quimioterápico ou anti-TNF[: {d}]', nao:'nega corticoide sistêmico imunossupressor, quimioterápico e anti-TNF', det:{tipo:'texto', ph:'qual'} },
      { tipo:'texto', id:'iv-horas', rot:'Há quantas horas começou a febre (oseltamivir tem mais benefício até 48 horas)', curto:true, ph:'36 horas', fmt:'febre há {v}' },
      { tipo:'escolha', id:'iv-garganta', rot:'Dor de garganta: padrão', na:'padrão da dor de garganta', lacuna:false, opts:[
        {v:'viral', rot:'com tosse, coriza, rouquidão, conjuntivite ou diarreia (sugere vírus)', frase:'dor de garganta de padrão viral (tosse, coriza, rouquidão, conjuntivite ou diarreia)'},
        {v:'estrepto', rot:'início súbito, febre, dor para engolir, cefaleia, náusea e dor abdominal, sem tosse (sugere estreptococo)', frase:'dor de garganta de padrão estreptocócico (início súbito, febre, dor para engolir, cefaleia, náusea e dor abdominal, sem tosse)'}] },
      { tipo:'tri', id:'iv-ouvido', rot:'Queixa no ouvido: dor, secreção, perda auditiva (natação, cotonete, gota otológica)', na:'queixa no ouvido', lacuna:false,
        sim:'refere queixa no ouvido[: {d}]', nao:'nega dor, secreção e perda auditiva no ouvido', det:{tipo:'texto', ph:'dor, secreção, perda auditiva; natação, cotonete, gota otológica'}, sub:[
          { id:'iv-ouvido-14', rot:'Há 14 dias ou mais (crônica; menos de 14 é aguda)', na:'duração da queixa no ouvido', sim:'há 14 dias ou mais', nao:'há menos de 14 dias' }] },
      { tipo:'tri', id:'iv-trismo', rot:'Dor de garganta com trismo, voz de "batata quente" ou dor muito intensa (abscesso periamigdaliano: encaminhar já)', na:'trismo e voz abafada', lacuna:false, junto:true,
        sim:'refere {d}', simSemDet:'refere trismo, voz abafada ou dor muito intensa na garganta', nao:'nega trismo, voz abafada e dor muito intensa na garganta',
        det:{tipo:'escolha', multi:true, opts:[{v:'trismo', rot:'trismo'}, {v:'voz', rot:'voz abafada'}, {v:'dor', rot:'dor muito intensa'}]} },
      { tipo:'texto', id:'is-alergia-penicilina', rot:'Se refere alergia à penicilina: o que houve, há quanto tempo, como tratou; usou penicilina, amoxicilina ou cefalosporina depois', ph:'urticária há 20 anos; usou amoxicilina depois sem reação',
        fmt:'história de alergia à penicilina: {v}' },
      { tipo:'tri', id:'iv-antibiotico', rot:'Antibiótico nas últimas 4 a 6 semanas (na rinossinusite, muda o esquema)', na:'antibiótico recente', junto:true,
        sim:'usou antibiótico nas últimas 4 a 6 semanas[: {d}]', nao:'nega antibiótico nas últimas 4 a 6 semanas', det:{tipo:'texto', ph:'qual'} },
      { tipo:'tri', id:'iv-complicacao', rot:'Cefaleia intensa, inchaço em volta do olho, visão alterada, vômitos, rigidez de nuca ou paralisia facial (complicação)', na:'sintomas de complicação', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas de complicação', nao:'nega cefaleia intensa, inchaço em volta do olho, visão alterada, vômitos, rigidez de nuca e paralisia facial',
        det:{tipo:'escolha', multi:true, opts:[{v:'cefaleia', rot:'cefaleia intensa'}, {v:'olho', rot:'inchaço em volta do olho'}, {v:'visao', rot:'visão alterada'},
          {v:'vomitos', rot:'vômitos'}, {v:'nuca', rot:'rigidez de nuca'}, {v:'facial', rot:'paralisia facial'}]} },
      C_CRIANCA,
      C_VACINA
    ]},
    ef: { rot: 'IVAS — exame', itens: [
      C_FR_CRIANCA,
      C_TIRAGEM,
      { tipo:'tri', id:'iv-orofaringe', rot:'Orofaringe com luz e abaixador: exsudato, petéquias no palato, úvula edemaciada, vesículas, membrana acinzentada ou abaulamento do palato', na:'orofaringe',
        sim:'orofaringe com {d}', simSemDet:'orofaringe alterada', nao:'orofaringe sem exsudato, petéquias no palato, úvula edemaciada, vesículas, membrana acinzentada nem abaulamento do palato',
        det:{tipo:'escolha', multi:true, opts:[{v:'exsudato', rot:'exsudato'}, {v:'petequias', rot:'petéquias no palato'}, {v:'uvula', rot:'úvula edemaciada'},
          {v:'vesiculas', rot:'vesículas'}, {v:'membrana', rot:'membrana acinzentada'}, {v:'abaulamento', rot:'abaulamento do palato'}]} },
      { tipo:'tri', id:'iv-linfonodo', rot:'Linfonodos cervicais anteriores aumentados e dolorosos (favorecem estreptococo)', na:'linfonodos cervicais', junto:true,
        sim:'linfonodos cervicais anteriores aumentados e dolorosos', nao:'sem linfonodos cervicais anteriores aumentados e dolorosos' },
      { tipo:'escolha', id:'iv-otoscopia', rot:'Otoscopia (sempre que possível; membrana só hiperemiada, em criança que chorou ou com febre, não fecha otite média aguda)', na:'otoscopia', lacuna:false, multi:true, opts:[
        {v:'normal', rot:'normal', frase:'otoscopia sem alterações', so:true},
        {v:'abaulada', rot:'membrana abaulada', frase:'membrana timpânica abaulada'}, {v:'opaca', rot:'membrana opaca', frase:'membrana timpânica opaca'},
        {v:'imovel', rot:'perda de mobilidade', frase:'perda de mobilidade da membrana timpânica'}, {v:'otorreia', rot:'otorreia', frase:'otorreia'},
        {v:'hiperemia', rot:'apenas hiperemia', frase:'membrana timpânica apenas hiperemiada'}] },
      { tipo:'escolha', id:'iv-tragus', rot:'Dor ao tracionar o pavilhão ou comprimir o tragus (otite externa)', na:'tragus e pavilhão', lacuna:false, junto:true, opts:[
        {v:'nao', rot:'sem dor', frase:'sem dor ao tracionar o pavilhão nem ao comprimir o tragus'},
        {v:'sim', rot:'com dor', frase:'dor ao tracionar o pavilhão ou comprimir o tragus'}] },
      { tipo:'escolha', id:'iv-mastoide', rot:'Dor ou tumefação atrás da orelha, comparando os dois lados (mastoidite)', na:'mastoides', lacuna:false, junto:true, opts:[
        {v:'nao', rot:'sem alterações', frase:'mastoides sem alterações à palpação'},
        {v:'sim', rot:'dor ou tumefação', frase:'dor ou tumefação à palpação da mastoide'}] },
      { tipo:'escolha', id:'iv-otalgia-ref', rot:'Otalgia com otoscopia normal: dentes molares, ATM, orofaringe e pares cranianos V, VII, IX e X', na:'otalgia referida', lacuna:false, junto:true, opts:[
        {v:'nao', rot:'sem alterações', frase:'sem alterações em dentes molares, ATM, orofaringe e pares cranianos V, VII, IX e X'},
        {v:'sim', rot:'com alteração', frase:'otalgia referida com alteração em dente, ATM, orofaringe ou par craniano'}] },
      { tipo:'escolha', id:'iv-seios', rot:'Face e órbita: dor à palpação dos seios, edema palpebral, proptose ou movimento ocular restrito', na:'seios da face e órbita', lacuna:false, junto:true, multi:true, tpl:'face e órbita: {d}', opts:[
        {v:'ok', rot:'sem alterações', frase:'sem dor à palpação dos seios, edema palpebral, proptose nem restrição do movimento ocular', so:true},
        {v:'dor', rot:'dor à palpação dos seios', frase:'dor à palpação dos seios'}, {v:'edema', rot:'edema palpebral', frase:'edema palpebral'},
        {v:'proptose', rot:'proptose', frase:'proptose'}, {v:'ocular', rot:'movimento ocular restrito', frase:'movimento ocular restrito'}] },
      AUSC_PULM
    ]},
    conduta: { rot: 'IVAS — classificação e plano', itens: [
      { tipo:'escolha', id:'iv-c-gripe', rot:'Síndrome gripal ou SRAG (o oseltamivir entra na prescrição)', na:'síndrome gripal', lacuna:false, opts:[
        {v:'srag', rot:'SRAG: máscara cirúrgica e remoção', frase:'SRAG: máscara cirúrgica no paciente e no profissional desde o acolhimento e remoção para o hospital ou o serviço indicado'},
        {v:'risco', rot:'síndrome gripal com fator de risco', frase:'síndrome gripal com fator de risco, com retorno orientado nos sinais de agravamento'},
        {v:'sem', rot:'síndrome gripal sem fator de risco', frase:'síndrome gripal sem fator de risco: hidratação, afastamento do trabalho ou da escola até 24 horas sem febre e retorno se houver agravamento'}] },
      { tipo:'escolha', id:'iv-c-exames', rot:'Exames (resfriado, faringite, otite e rinossinusite aguda: diagnóstico clínico, sem exame de rotina)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'seios', rot:'radiografia ou TC de seios da face (suspeita de complicação ou persistência depois do tratamento)', frase:'radiografia ou TC de seios da face'},
        {v:'rx', rot:'radiografia de tórax (gestante com suspeita de pneumonia, em qualquer idade gestacional)', frase:'radiografia de tórax'},
        {v:'audicao', rot:'avaliação da audição (otite média com efusão por mais de 3 meses)', frase:'avaliação da audição'}] },
      { tipo:'escolha', id:'iv-c-garganta', rot:'Faringite estreptocócica provável (a benzatina entra na prescrição)', lacuna:false, opts:[
        {v:'aplicar', rot:'aplicação na própria UBS, com estrutura para anafilaxia e 30 minutos de observação', frase:'faringite estreptocócica provável: tratamento aplicado na UBS, com estrutura para anafilaxia e 30 minutos de observação'}] },
      { tipo:'escolha', id:'iv-c-crianca-ouvido', rot:'Criança de 2 meses a 5 anos: ouvido (AIDPI; o antibiótico e o analgésico entram na prescrição)', na:'ouvido da criança', lacuna:false, opts:[
        {v:'otite', rot:'infecção aguda do ouvido', frase:'infecção aguda do ouvido: secar com mecha se houver secreção e retorno em 2 dias'},
        {v:'dor', rot:'só dor de ouvido (possível infecção)', frase:'dor de ouvido, possível infecção: retorno em 2 dias'},
        {v:'cronica', rot:'secreção há 14 dias ou mais', frase:'secreção no ouvido há 14 dias ou mais: secar com mecha e retorno em 5 dias'}] },
      { tipo:'escolha', id:'iv-c-crianca-garganta', rot:'Criança de 2 meses a 5 anos: garganta (AIDPI; o antibiótico e o analgésico entram na prescrição)', na:'garganta da criança', lacuna:false, opts:[
        {v:'moderada', rot:'infecção moderada de garganta', frase:'infecção moderada de garganta: retorno em 2 dias'},
        {v:'leve', rot:'infecção leve de garganta', frase:'infecção leve de garganta: retorno se a dor persistir'}] },
      { tipo:'escolha', id:'iv-c-orl', rot:'Encaminhar ao otorrino', lacuna:false, multi:true, tpl:'encaminho ao otorrino, por {d}', opts:[
        {v:'sinusite', rot:'rinossinusite crônica com alteração estrutural, refratária a 3 meses de tratamento ou com 4 ou mais episódios bacterianos no ano', frase:'rinossinusite crônica com alteração estrutural, refratária a 3 meses de tratamento ou com 4 ou mais episódios bacterianos no ano'},
        {v:'perfuracao', rot:'perfuração timpânica 6 semanas depois da otite média aguda', frase:'perfuração timpânica 6 semanas depois da otite média aguda'},
        {v:'cronica', rot:'otite média crônica: otorreia por mais de 3 meses, alteração da membrana ou hipoacusia', frase:'otite média crônica, com otorreia por mais de 3 meses, alteração da membrana ou hipoacusia'},
        {v:'efusao', rot:'efusão por mais de 3 meses', frase:'efusão por mais de 3 meses'},
        {v:'colesteatoma', rot:'suspeita de colesteatoma', frase:'suspeita de colesteatoma'}] },
      { tipo:'escolha', id:'iv-c-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'higiene', rot:'lavar as mãos, cobrir a tosse, não dividir objetos, ambiente ventilado', frase:'lavar as mãos, cobrir a tosse, não dividir objetos e manter o ambiente ventilado'},
        {v:'alarme', rot:'retorno nos sinais de alarme', frase:'retorno nos sinais de alarme'},
        {v:'liquido', rot:'mais de 2 litros de líquido por dia (síndrome gripal leve; sem restrição hídrica prescrita)', frase:'mais de 2 litros de líquido por dia'}] }
    ]}
  }
});

/* ---------- 8. Pneumonia adquirida na comunidade ---------- */
QUADROS.push({
  id: 'pneumonia', nome: 'Pneumonia (PAC)', queixa: 'pneumonia-comunitaria', grupo: 'A2-Respiratoria',
  fonte: 'SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 · medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)',
  ciap: ['R81'], cid: ['J18'],
  blocos: {
    anamnese: { rot: 'Pneumonia — quadro, risco de resistência, condição de tratar em casa', itens: [
      { tipo:'tri', id:'pc-sintomas', rot:'Febre, tosse com expectoração, falta de ar ou dor no peito que piora ao respirar (no idoso e na comorbidade a apresentação pode ser pobre)', na:'sintomas da pneumonia',
        sim:'refere {d}', simSemDet:'refere sintomas de pneumonia', nao:'nega febre, tosse com expectoração, falta de ar e dor no peito que piora ao respirar',
        det:{tipo:'escolha', multi:true, opts:[{v:'febre', rot:'febre'}, {v:'tosse', rot:'tosse com expectoração'}, {v:'dispneia', rot:'falta de ar'},
          {v:'dor', rot:'dor no peito que piora ao respirar'}]} },
      { tipo:'tri', id:'pc-antibiotico', rot:'Antibiótico nos últimos 3 meses (risco de pneumococo resistente: muda o esquema)', na:'antibiótico nos últimos 3 meses', junto:true,
        sim:'usou antibiótico nos últimos 3 meses[: {d}]', nao:'nega antibiótico nos últimos 3 meses', det:{tipo:'texto', ph:'qual'} },
      { tipo:'tri', id:'pc-multirresistente', rot:'Internação nos últimos 90 dias, hemodiálise, curativo crônico em serviço de saúde, sonda enteral ou moradia em instituição (risco de germe multirresistente)', na:'risco de germe multirresistente', junto:true,
        sim:'refere {d}', simSemDet:'refere fator de risco para germe multirresistente',
        nao:'nega internação nos últimos 90 dias, hemodiálise, curativo crônico em serviço de saúde, sonda enteral e moradia em instituição',
        det:{tipo:'escolha', multi:true, opts:[{v:'internacao', rot:'internação nos últimos 90 dias'}, {v:'hemodialise', rot:'hemodiálise'},
          {v:'curativo', rot:'curativo crônico em serviço de saúde'}, {v:'sonda', rot:'sonda enteral'}, {v:'instituicao', rot:'moradia em instituição'}]} },
      { tipo:'tri', id:'pc-via-oral', rot:'Consegue tomar remédio pela boca', na:'via oral', junto:true,
        sim:'consegue tomar medicação por via oral', nao:'não consegue tomar medicação por via oral' },
      { tipo:'tri', id:'pc-cuidador', rot:'Tem quem cuide em casa e traga de volta em dois dias', na:'quem cuide em casa', junto:true,
        sim:'tem quem cuide em casa e traga de volta em 2 dias', nao:'não tem quem cuide em casa nem traga de volta em 2 dias' },
      { tipo:'tri', id:'pc-tb', rot:'Tosse há 2 semanas ou mais, febre à tarde, suor noturno, emagrecimento, escarro com sangue ou contato com tuberculose (sintomático respiratório: colher escarro)', na:'sinais de tuberculose', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas sugestivos de tuberculose',
        nao:'nega tosse há 2 semanas ou mais, febre à tarde, suor noturno, emagrecimento, escarro com sangue e contato com tuberculose',
        det:{tipo:'escolha', multi:true, opts:[{v:'tosse', rot:'tosse há 2 semanas ou mais'}, {v:'febre', rot:'febre à tarde'}, {v:'suor', rot:'suor noturno'},
          {v:'emagrece', rot:'emagrecimento'}, {v:'sangue', rot:'escarro com sangue'}, {v:'contato', rot:'contato com tuberculose'}]} },
      C_CRIANCA,
      { tipo:'tri', id:'pc-tosse14', rot:'Criança com tosse há mais de 14 dias (investigar outra causa)', na:'duração da tosse na criança', lacuna:false, junto:true,
        sim:'criança com tosse há mais de 14 dias', nao:'criança sem tosse há mais de 14 dias' },
      C_VACINA
    ]},
    ef: { rot: 'Pneumonia — exame', itens: [
      { tipo:'tri', id:'pc-confusao', rot:'Confusão mental (um dos pontos do CRB-65)', na:'confusão mental',
        sim:'confusão mental', nao:'sem confusão mental' },
      AUSC_PULM,
      { tipo:'tri', id:'pc-hidratacao', rot:'Desidratação ou má aceitação oral', na:'hidratação e aceitação oral', junto:true,
        sim:'sinais de desidratação ou má aceitação oral', nao:'sem sinais de desidratação nem má aceitação oral' },
      C_FR_CRIANCA,
      C_TIRAGEM
    ]},
    conduta: { rot: 'Pneumonia — local do tratamento e plano', itens: [
      { tipo:'texto', id:'pc-crb65', rot:'CRB-65 (1 ponto cada: confusão mental; FR de 30 ou mais; PAS abaixo de 90 ou PAD de 60 ou menos; 65 anos ou mais. O CAB 28 e a SBPT divergem nas bordas: FR de 30, idade de 65)', curto:true, ph:'0 a 4', fmt:'CRB-65: {v} pontos' },
      { tipo:'escolha', id:'pc-c-local', rot:'Local do tratamento (CAB 28: CRB-65 de 0 ou 1, casa; 2, hospital; 3 ou 4, internação. A SBPT 2018 só aceita casa direto com 0: com 1 ponto, sobretudo idoso ou com comorbidade, decidir com a preceptora. SpO2 abaixo de 92%, comorbidade descompensada, sem via oral ou sem quem cuide: não é caso de casa)', na:'local do tratamento', opts:[
        {v:'casa', rot:'em casa', frase:'tratamento em casa, com a primeira dose do antibiótico na UBS'},
        {v:'hospital', rot:'hospital ou internação', frase:'encaminho para tratamento hospitalar, com a primeira dose do antibiótico ainda na UBS'},
        {v:'crianca', rot:'criança com pneumonia grave', frase:'criança com pneumonia grave: primeira dose do antibiótico na UBS e referência urgente'}] },
      { tipo:'escolha', id:'pc-c-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'rx', rot:'radiografia de tórax PA e perfil (indispensável em dúvida, complicação, resposta ruim e diferencial com câncer; o antibiótico não espera)', frase:'radiografia de tórax PA e perfil'},
        {v:'ureia', rot:'ureia (permite o CURB-65)', frase:'ureia, para o CURB-65'},
        {v:'escarro', rot:'escarro para TRM-TB ou baciloscopia (sintomático respiratório)', frase:'escarro para TRM-TB ou baciloscopia'}] },
      { tipo:'escolha', id:'pc-c-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'volta', rot:'sinais para voltar antes; piora antes do retorno, pronto-socorro', frase:'sinais para voltar antes e, se piorar antes do retorno, procurar o pronto-socorro'},
        {v:'reavalia', rot:'reavaliação a cada 2 dias do início do antibiótico', frase:'reavaliação a cada 2 dias do início do antibiótico'}] },
      { tipo:'escolha', id:'pc-c-crianca', rot:'Criança com pneumonia (o antibiótico por 7 dias entra na prescrição)', lacuna:false, multi:true, opts:[
        {v:'trat', rot:'medidas caseiras para a tosse, retorno em 2 dias', frase:'criança com pneumonia: medidas caseiras para aliviar a tosse e retorno em 2 dias'},
        {v:'tosse14', rot:'tosse há mais de 14 dias: investigar outra causa', frase:'investigo outra causa para a tosse há mais de 14 dias'}] },
      { tipo:'escolha', id:'pc-c-vacina', rot:'Depois da recuperação', na:'vacinas depois da recuperação', lacuna:false, multi:true, opts:[
        {v:'influenza', rot:'vacina de influenza para os grupos indicados', frase:'oriento vacina de influenza para os grupos indicados, depois da recuperação'},
        {v:'crie', rot:'avaliar a pneumocócica (fora da rotina do adulto; pelo CRIE nos grupos de risco)', frase:'avalio a vacina pneumocócica pelo CRIE, depois da recuperação'}] }
    ]}
  }
});

/* ---------- 9. Tosse crônica no adulto ---------- */
QUADROS.push({
  id: 'tosse-cronica', nome: 'Tosse crônica', queixa: 'tosse-cronica', grupo: 'A2-Respiratoria',
  fonte: 'SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 · MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026',
  ciap: ['R05'], cid: ['R05'],
  blocos: {
    anamnese: { rot: 'Tosse crônica — duração e causas comuns', itens: [
      { tipo:'escolha', id:'tc-tempo', rot:'Duração da tosse (aguda até 3 semanas; subaguda de 3 a 8; crônica acima de 8)', na:'duração da tosse', tpl:'tosse {d}', opts:[
        {v:'aguda', rot:'aguda', frase:'aguda'}, {v:'subaguda', rot:'subaguda', frase:'subaguda'}, {v:'cronica', rot:'crônica', frase:'crônica'}] },
      { tipo:'tri', id:'tc-pos-infecciosa', rot:'Começou depois de um resfriado ou gripe (pós-infecciosa: de 3 a 8 semanas, com exame sem outra causa)', na:'início após resfriado ou gripe', junto:true,
        sim:'tosse iniciada depois de resfriado ou gripe', nao:'nega início da tosse depois de resfriado ou gripe' },
      { tipo:'tri', id:'tc-ieca', rot:'Usa IECA (enalapril, captopril): a tosse começou depois dele', na:'IECA', junto:true,
        sim:'em uso de IECA, com tosse iniciada depois dele', nao:'nega início da tosse depois de IECA' },
      C_BETABLOQ,
      C_EXPOSICAO,
      { tipo:'tri', id:'tc-catarro', rot:'Catarro: quanto por dia (mais de uma xícara sugere bronquiectasia), purulento, com sangue, pior ao mudar de posição', na:'catarro', junto:true,
        sim:'tosse com catarro[: {d}]', nao:'nega catarro', det:{tipo:'texto', ph:'quantidade por dia, purulento, com sangue, piora ao mudar de posição'} },
      { tipo:'tri', id:'tc-nariz', rot:'Nariz entupido, coriza, espirros, secreção escorrendo para a garganta ou pigarro', na:'sintomas nasais', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas nasais', nao:'nega nariz entupido, coriza, espirros, secreção escorrendo para a garganta e pigarro',
        det:{tipo:'escolha', multi:true, opts:[{v:'entupido', rot:'nariz entupido'}, {v:'coriza', rot:'coriza'}, {v:'espirros', rot:'espirros'},
          {v:'gotejamento', rot:'secreção escorrendo para a garganta'}, {v:'pigarro', rot:'pigarro'}]} },
      { tipo:'tri', id:'tc-refluxo', rot:'Azia, regurgitação, rouquidão; tosse durante ou depois das refeições, deitado ou ao se curvar, que melhora no sono', na:'sintomas de refluxo', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas de refluxo', nao:'nega azia, regurgitação, rouquidão e tosse relacionada a refeições, ao deitar ou ao se curvar',
        det:{tipo:'escolha', multi:true, opts:[{v:'azia', rot:'azia'}, {v:'regurgitacao', rot:'regurgitação'}, {v:'rouquidao', rot:'rouquidão'},
          {v:'refeicoes', rot:'tosse durante ou depois das refeições'}, {v:'deitado', rot:'tosse deitado ou ao se curvar'}]} },
      { tipo:'tri', id:'tc-asma', rot:'Chiado, falta de ar, aperto no peito, piora à noite, com ar frio ou exercício (a asma pode ser só tosse)', na:'sintomas de asma', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas de asma', nao:'nega chiado, falta de ar, aperto no peito e piora à noite, com ar frio ou exercício',
        det:{tipo:'escolha', multi:true, opts:[{v:'chiado', rot:'chiado'}, {v:'dispneia', rot:'falta de ar'}, {v:'aperto', rot:'aperto no peito'},
          {v:'noite', rot:'piora à noite'}, {v:'gatilho', rot:'piora com ar frio ou exercício'}]} },
      { tipo:'tri', id:'tc-contato-tb', rot:'Contato com tuberculose, HIV, situação de rua ou prisão', na:'risco para tuberculose', junto:true,
        sim:'refere {d}', simSemDet:'refere risco para tuberculose', nao:'nega contato com tuberculose, HIV, situação de rua e prisão',
        det:{tipo:'escolha', multi:true, opts:[{v:'tb', rot:'contato com tuberculose'}, {v:'hiv', rot:'HIV'}, {v:'rua', rot:'situação de rua'}, {v:'prisao', rot:'prisão'}]} },
      { tipo:'tri', id:'tc-constitucionais', rot:'Febre à tarde, suor noturno, emagrecimento, falta de apetite ou escarro com sangue (tuberculose até prova em contrário; câncer)', na:'sintomas constitucionais e escarro com sangue', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas constitucionais ou escarro com sangue', nao:'nega febre à tarde, suor noturno, emagrecimento, falta de apetite e escarro com sangue',
        det:{tipo:'escolha', multi:true, opts:[{v:'febre', rot:'febre à tarde'}, {v:'suor', rot:'suor noturno'}, {v:'emagrecimento', rot:'emagrecimento'}, {v:'apetite', rot:'falta de apetite'}, {v:'sangue', rot:'escarro com sangue'}]} },
      { tipo:'tri', id:'tc-disfagia', rot:'Engasgo e regurgitação nasal ao engolir, dor ao engolir ou rouquidão por 3 semanas ou mais (disfagia orofaríngea; neoplasia em tabagista ou etilista)', na:'disfagia e rouquidão persistente', junto:true,
        sim:'refere {d}', simSemDet:'refere engasgo ao engolir, dor ao engolir ou rouquidão persistente', nao:'nega engasgo e regurgitação nasal ao engolir, dor ao engolir e rouquidão por 3 semanas ou mais',
        det:{tipo:'escolha', multi:true, opts:[{v:'engasgo', rot:'engasgo ao engolir'}, {v:'regurgitacao', rot:'regurgitação nasal ao engolir'}, {v:'odinofagia', rot:'dor ao engolir'}, {v:'rouquidao', rot:'rouquidão por 3 semanas ou mais'}]} },
      { tipo:'tri', id:'tc-coqueluche', rot:'Acessos longos de tosse com guincho ou vômito depois (coqueluche)', na:'acessos de tosse com guincho', junto:true,
        sim:'acessos longos de tosse com guincho ou vômito depois', nao:'nega acessos longos de tosse com guincho ou vômito depois' }
    ]},
    ef: { rot: 'Tosse crônica — exame', itens: [
      { tipo:'tri', id:'tc-orofaringe', rot:'Orofaringe: secreção na parede posterior da faringe, mucosa com aspecto atapetado ou eritema', na:'orofaringe',
        sim:'orofaringe com {d}', simSemDet:'orofaringe alterada', nao:'orofaringe sem secreção na parede posterior, aspecto atapetado nem eritema',
        det:{tipo:'escolha', multi:true, opts:[{v:'secrecao', rot:'secreção na parede posterior da faringe'}, {v:'atapetada', rot:'mucosa com aspecto atapetado'}, {v:'eritema', rot:'eritema'}]} },
      AUSC_PULM,
      { tipo:'tri', id:'tc-baqueteamento', rot:'Baqueteamento digital ou halitose (bronquiectasia; baqueteamento também em câncer)', na:'baqueteamento e halitose', junto:true,
        sim:'{d}', simSemDet:'baqueteamento digital ou halitose', nao:'sem baqueteamento digital nem halitose',
        det:{tipo:'escolha', multi:true, opts:[{v:'baqueteamento', rot:'baqueteamento digital'}, {v:'halitose', rot:'halitose'}]} },
      { tipo:'tri', id:'tc-linfonodo', rot:'Linfonodos cervicais e supraclaviculares aumentados', na:'linfonodos cervicais e supraclaviculares', junto:true,
        sim:'linfonodos cervicais ou supraclaviculares aumentados[: {d}]', nao:'sem linfonodos cervicais nem supraclaviculares aumentados', det:{tipo:'texto', ph:'onde'} },
      { tipo:'tri', id:'tc-ic', rot:'Sinais de insuficiência cardíaca', na:'sinais de insuficiência cardíaca', junto:true,
        sim:'sinais de insuficiência cardíaca[: {d}]', nao:'sem sinais de insuficiência cardíaca', det:{tipo:'texto', ph:'quais'} }
    ]},
    conduta: { rot: 'Tosse crônica — investigação e plano', itens: [
      { tipo:'escolha', id:'tc-c-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'rx', rot:'radiografia de tórax (em todos)', frase:'radiografia de tórax'},
        {v:'espirometria', rot:'espirometria com broncodilatador', frase:'espirometria com broncodilatador'},
        {v:'escarro', rot:'tosse produtiva: BAAR em duas amostras de escarro, ou TRM-TB com cultura e teste de sensibilidade', frase:'BAAR em duas amostras de escarro, ou TRM-TB com cultura e teste de sensibilidade'},
        {v:'ecg', rot:'ECG em repouso (com dispneia)', frase:'ECG em repouso'},
        {v:'tc-seios', rot:'TC de seios da face (dúvida que persiste; a radiografia simples tem valor controverso)', frase:'TC de seios da face'}] },
      { tipo:'escolha', id:'tc-c-tb', rot:'Sintomático respiratório (tosse há 2 semanas ou mais): o escarro vem antes de tratar as outras causas', lacuna:false, opts:[
        {v:'colhido', rot:'escarro colhido na hora', frase:'sintomático respiratório: escarro para tuberculose colhido na hora, antes de tratar as outras causas'}] },
      { tipo:'escolha', id:'tc-c-causa', rot:'Primeiro: tirar o que causa (a melhora com IECA suspenso leva de dias a vários meses)', lacuna:false, multi:true, opts:[
        {v:'ieca', rot:'IECA suspenso e trocado', frase:'IECA suspenso e trocado, como possível causa da tosse'},
        {v:'fumo', rot:'cessação do tabagismo orientada (cerca de 90% melhoram)', frase:'oriento a cessação do tabagismo'}] },
      { tipo:'escolha', id:'tc-c-empirico', rot:'Radiografia normal: tratamento empírico, em sequência, das causas comuns, reavaliando a resposta de cada um', lacuna:false, multi:true,
        tpl:'inicio tratamento empírico, em sequência, de {d}, reavaliando a resposta de cada um', opts:[
        {v:'gotejamento', rot:'gotejamento pós-nasal', frase:'gotejamento pós-nasal'}, {v:'asma', rot:'asma', frase:'asma'}, {v:'refluxo', rot:'refluxo', frase:'refluxo'}] },
      { tipo:'escolha', id:'tc-c-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'pneumo', rot:'pneumologia: investigação inconclusiva na APS e sem resposta ao tratamento empírico das causas comuns', frase:'à pneumologia, por investigação inconclusiva na APS e sem resposta ao tratamento empírico das causas comuns'},
        {v:'ieca', rot:'pneumologia: tosse por mais de 4 semanas depois de suspender e trocar o IECA', frase:'à pneumologia, por tosse por mais de 4 semanas depois de suspender e trocar o IECA'},
        {v:'torax', rot:'Cirurgia Torácica: tosse ou dispneia com suspeita de neoplasia na imagem', frase:'à Cirurgia Torácica, por suspeita de neoplasia na imagem'},
        {v:'orl-voz', rot:'otorrino: disfonia persistente sem causa (afastadas infecção, abuso da voz, corticoide inalatório e refluxo)', frase:'ao otorrino, por disfonia persistente sem causa (afastadas infecção, abuso da voz, corticoide inalatório e refluxo)'},
        {v:'orl-neo', rot:'otorrino: rouquidão por 3 semanas ou mais em tabagista ou etilista, com disfagia, dor ao engolir ou perda de peso', frase:'ao otorrino, por rouquidão por 3 semanas ou mais em tabagista ou etilista, com disfagia, dor ao engolir ou perda de peso (suspeita de neoplasia)'}] }
    ]}
  }
});

/* quadros-d.js — autor B (digestivo-nutricional + demanda comum), APS II, 28/10/2026
 * Quadros: anemia, constipacao, diarreia-aguda, dispepsia-drge, hepatites-esteatose, parasitoses-intestinais, tireoide
 * (A2-Digestivo-Nutricional); arboviroses, dermatoses-comuns, itu-cistite (A2-Demanda-Comum).
 * Cada item sai de um item da queixa do copiloto indicada em `queixa` (perguntas → anamnese; exame → ef; conduta e
 * exames → conduta). O que a ficha base já tem (sinais vitais, medidas, comorbidades, alergia, cirurgias, etilismo,
 * tabagismo, medicação em uso, exames trazidos) não se repete.
 *
 * Convenções (as mesmas do quadros-a.js e do quadros-b.js da APS I):
 * - Sintoma em sequência leva `junto: true`, para sair no estilo da preceptora (NEGA X, NEGA Y, REFERE Z). Texto livre
 *   e escolha que abre frase própria vêm depois da sequência, porque `junto` emenda na frase anterior.
 * - `lacuna: false` em dois casos: (a) pergunta ou achado que só vale para um subgrupo (mulher, homem, gestante,
 *   pós-menopausa, grupo B da dengue, diarreia arrastada, em uso de levotiroxina), em que "não avaliado" seria falso
 *   para os demais; (b) ação opcional da conduta (pedido de exame, orientação, encaminhamento, notificação), em que
 *   intocado quer dizer "não feito", não "não avaliado".
 * - No exame físico, achado que não se procura em toda consulta daquele tipo (toque retal, especular, prova do laço,
 *   couro cabeludo, lesão de uma dermatose específica) é `escolha`, não ✗/✓: o atalho "Sem alterações nos achados dos
 *   quadros" marca ✗ em todo tri visível e escreveria "sem alteração" num exame que não foi feito.
 * - Escore e medida digitada (APRI, FIB-4, PA em pé, nota da dor) não têm `na`: ficam fora do texto quando vazios.
 *   A página não calcula escore de tratamento nenhum.
 * - Conduta em 1ª pessoa (oriento, solicito, encaminho), como a preceptora escreve. Prescrição não é item.
 * - Achado do exame que só se procura num subgrupo (articulações na chikungunya) é `escolha`, não `tri`: o atalho
 *   "Sem alterações nos achados dos quadros" marca ✗ em todo `tri` do exame, e `lacuna:false` não protege.
 * - Revisado em 28/10/2026 (relatorios/revisao-quadros-d.md): C1, I1 a I19 e M1 a M24 aplicados (menos o M22, opcional);
 *   a perda de peso usa PERDA_PESO (id-peso) do quadros-b.js. */

/* ---------- perguntas compartilhadas (mesmo id, mesmo objeto) ---------- */

/* anamnese — anemia, constipação, dispepsia */
const D_SANGUE = { tipo:'tri', id:'dig-sangue', rot:'Fezes pretas ou com sangue', na:'sangue nas fezes', junto:true,
  sim:'refere fezes pretas ou com sangue[: {d}]', nao:'nega fezes pretas ou com sangue', det:{tipo:'texto', ph:'cor, quanto, desde quando'} };
/* perda de peso: PERDA_PESO (id-peso) do quadros-b.js, pelo nome */
/* anamnese — anemia, dispepsia */
const D_AINE = { tipo:'tri', id:'dig-aine', rot:'AAS, anti-inflamatório, antiplaquetário ou anticoagulante (ou vai começar)', na:'AAS, anti-inflamatório e anticoagulante',
  sim:'uso de {d}', simSemDet:'uso de AAS, anti-inflamatório, antiplaquetário ou anticoagulante',
  nao:'nega uso de AAS, anti-inflamatório, antiplaquetário e anticoagulante', det:{tipo:'texto', ph:'qual; vai começar?'} };
/* ef — anemia, hepatites */
const D_ICTERICIA = { tipo:'tri', id:'cmn-ictericia', rot:'Icterícia', na:'icterícia', junto:true, sim:'icterícia', nao:'sem icterícia' };
/* anamnese — diarreia, parasitoses, dermatoses */
const D_IMUNO = { tipo:'tri', id:'cmn-imuno', rot:'HIV, corticoide, imunossupressor ou quimioterapia (em uso ou a começar)', na:'imunossupressão',
  sim:'imunossupressão[: {d}]', nao:'nega HIV, uso de corticoide ou imunossupressor e quimioterapia',
  det:{tipo:'texto', ph:'o quê; corticoide em dose alta há quanto tempo'} };
/* anamnese — parasitoses, dermatoses (a gestante vem de GRAVIDEZ, do quadros-b.js) */
const D_AMAMENTA = { tipo:'tri', id:'cmn-amamenta', rot:'Amamentando (muda o fármaco)', na:'amamentação', lacuna:false, junto:true,
  sim:'amamentando', nao:'não amamenta' };

/* ---------- 1. Anemia no adulto ---------- */
QUADROS.push({
  id: 'anemia', nome: 'Anemia no adulto', queixa: 'anemia-adulto', grupo: 'A2-Digestivo-Nutricional',
  fonte: 'TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023 · MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Hematologia adulto, 2023 · FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026',
  ciap: ['B80', 'B81', 'B82'], cid: ['D50', 'D51', 'D52', 'D64'],
  blocos: {
    anamnese: { rot: 'Anemia — anamnese', itens: [
      D_SANGUE,
      {tipo:'tri', id:'anm-menstruacao', rot:'Mulher: menstruação abundante (quantos dias, quantos absorventes, coágulos)', na:'menstruação', lacuna:false, junto:true,
        sim:'refere menstruação abundante[: {d}]', nao:'nega menstruação abundante', det:{tipo:'texto', ph:'dias, absorventes por dia, coágulos'}},
      {tipo:'tri', id:'anm-gengiva-urina', rot:'Sangramento de gengiva ou na urina', na:'sangramento de gengiva e urina', junto:true,
        sim:'refere sangramento de gengiva ou na urina', nao:'nega sangramento de gengiva ou na urina'},
      {tipo:'tri', id:'anm-pica', rot:'Vontade de comer terra, gelo ou outra coisa estranha (pica)', na:'pica',
        sim:'refere pica[: {d}]', nao:'nega pica', det:{tipo:'texto', ph:'o quê'}},
      PERDA_PESO,
      {tipo:'tri', id:'anm-febre-suor', rot:'Febre ou suor à noite', na:'febre e suor noturno', junto:true,
        sim:'refere febre ou suor noturno', nao:'nega febre e suor noturno'},
      {tipo:'tri', id:'anm-azia', rot:'Azia, dor de estômago ou mudança no hábito intestinal', na:'azia, dor de estômago e hábito intestinal', junto:true,
        sim:'refere azia, dor de estômago ou mudança do hábito intestinal[: {d}]', nao:'nega azia, dor de estômago e mudança do hábito intestinal',
        det:{tipo:'texto', ph:'o quê'}},
      {tipo:'tri', id:'anm-dispneia', rot:'Falta de ar (anemia sintomática: dispneia; taquicardia e hipotensão vêm dos sinais vitais)', na:'dispneia', junto:true,
  sim:'refere dispneia[: {d}]', nao:'nega dispneia', det:{tipo:'texto', ph:'aos esforços ou em repouso'}},
      D_AINE,
      {tipo:'tri', id:'anm-b12-folato', rot:'Metformina, omeprazol, antiácido ou anticonvulsivante (B12); fenitoína ou metotrexato (folato)', na:'medicamento que reduz B12 ou folato', junto:true,
        sim:'uso de {d}', simSemDet:'uso de medicamento que reduz B12 ou folato',
        nao:'nega uso de metformina, omeprazol, antiácido, anticonvulsivante, fenitoína e metotrexato', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'anm-gastrica', rot:'Cirurgia de estômago ou bariátrica', na:'cirurgia gástrica ou bariátrica', junto:true,
        sim:'refere cirurgia de estômago ou bariátrica[: {d}]', nao:'nega cirurgia de estômago ou bariátrica', det:{tipo:'texto', ph:'qual, quando'}},
      {tipo:'tri', id:'anm-familia', rot:'Anemia na família (falciforme, talassemia)', na:'anemia na família', junto:true,
        sim:'refere anemia na família[: {d}]', nao:'nega anemia na família', det:{tipo:'texto', ph:'quem, qual tipo'}},
      {tipo:'tri', id:'anm-neuro-sint', rot:'Formigamento, perda de sensibilidade, memória pior ou tristeza (B12)', na:'sintomas neuropsiquiátricos',
        sim:'refere {d}', simSemDet:'refere sintomas neuropsiquiátricos',
        nao:'nega formigamento, perda de sensibilidade, piora da memória e tristeza',
        det:{tipo:'escolha', multi:true, opts:[{v:'formigamento', rot:'formigamento'}, {v:'sensibilidade', rot:'perda de sensibilidade'},
          {v:'memoria', rot:'piora da memória'}, {v:'tristeza', rot:'tristeza'}]}},
      {tipo:'escolha', id:'anm-dieta', rot:'Come carne? Dieta vegetariana estrita ou vegana?', na:'dieta', opts:[
        {v:'carne', rot:'come carne', frase:'come carne'},
        {v:'vegetariana', rot:'vegetariana estrita', frase:'dieta vegetariana estrita'},
        {v:'vegana', rot:'vegana', frase:'dieta vegana'}]},
      {tipo:'texto', id:'anm-tempo', rot:'Desde quando: a vida toda, crônica, vai e volta ou aguda; hemograma antigo para comparar',
        ph:'crônica; hemograma de 2024 com Hb 11', fmt:'tempo de anemia: {v}'}
    ]},
    ef: { rot: 'Anemia — exame', itens: [
      PN_MUCOSAS,
      D_ICTERICIA,
      {tipo:'tri', id:'anm-purpura', rot:'Púrpura ou petéquias', na:'púrpura e petéquias', junto:true,
        sim:'púrpura ou petéquias', nao:'sem púrpura ou petéquias'},
      {tipo:'tri', id:'anm-orgaos', rot:'Fígado ou baço palpáveis, ou linfonodos aumentados', na:'fígado, baço e linfonodos', junto:true,
  sim:'alteração à palpação de fígado, baço ou linfonodos[: {d}]', nao:'sem hepatomegalia, esplenomegalia e linfonodomegalia', det:{tipo:'texto', ph:'o quê, onde'}},
      {tipo:'tri', id:'anm-ic-alto-debito', rot:'Edema, estase jugular ou sopro de ejeção (insuficiência cardíaca de alto débito)', na:'sinais de IC de alto débito', junto:true,
  sim:'{d}', simSemDet:'sinais de insuficiência cardíaca de alto débito',
  nao:'sem edema, estase jugular e sopro de ejeção',
  det:{tipo:'escolha', multi:true, opts:[{v:'edema', rot:'edema'}, {v:'jugular', rot:'estase jugular'}, {v:'sopro', rot:'sopro de ejeção'}]}},
      {tipo:'escolha', id:'anm-boca-unhas', rot:'Boca e unhas: glossite, língua lisa, queilite angular, unhas em colher', na:'boca e unhas', multi:true, opts:[
  {v:'ok', rot:'sem alterações', frase:'sem glossite, língua lisa, queilite angular ou unhas em colher', so:true},
  {v:'glossite', rot:'glossite', frase:'glossite'},
  {v:'lisa', rot:'língua lisa', frase:'língua lisa'},
  {v:'queilite', rot:'queilite angular', frase:'queilite angular'},
  {v:'unhas', rot:'unhas em colher', frase:'unhas em colher'}]},
      {tipo:'escolha', id:'anm-neuro-ex', rot:'Exame neurológico: sensibilidade e cognição (B12)', na:'sensibilidade e cognição', multi:true, opts:[
        {v:'ok', rot:'sem alterações', frase:'sensibilidade e cognição sem alterações', so:true},
        {v:'sensibilidade', rot:'alteração da sensibilidade', frase:'alteração da sensibilidade'},
        {v:'cognicao', rot:'alteração cognitiva', frase:'alteração cognitiva'}]}
    ]},
    conduta: { rot: 'Anemia — conduta', itens: [
      {tipo:'escolha', id:'anm-exames', rot:'Exames para classificar a anemia', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
  {v:'hemograma', rot:'hemograma com VCM, esfregaço e reticulócitos (antes de começar ferro ou vitamina)', frase:'hemograma com VCM, esfregaço e reticulócitos'},
  {v:'ferro', rot:'microcítica ou normocítica: ferritina e saturação de transferrina', frase:'ferritina e saturação de transferrina'},
  {v:'b12', rot:'macrocítica: B12 e ácido fólico', frase:'vitamina B12 e ácido fólico'},
  {v:'hemolise', rot:'reticulócitos altos: LDH, bilirrubina indireta e Coombs direto', frase:'LDH, bilirrubina indireta e Coombs direto'},
  {v:'eletroforese', rot:'microcitose com ferritina normal: eletroforese de hemoglobina (traço talassêmico ou falciforme)', frase:'eletroforese de hemoglobina'}]},
      {tipo:'escolha', id:'anm-causa', rot:'Investigar a causa', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
  {v:'parasito', rot:'parasitológico de fezes (toda anemia ferropriva, em qualquer idade)', frase:'parasitológico de fezes'},
  {v:'eda', rot:'EDA e colonoscopia (ferropriva sem causa: homem ou mulher na pós-menopausa; no idoso, pesar riscos e benefícios)', frase:'endoscopia digestiva alta e colonoscopia'},
  {v:'hpylori', rot:'ferropriva sem explicação: testar o H. pylori', frase:'pesquisa de H. pylori'}]},
      {tipo:'escolha', id:'anm-controle', rot:'Controle do tratamento', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'ferro-3sem', rot:'ferro: hemograma e reticulócitos em 2 a 3 semanas (espera-se Hb 2 pontos maior em 3 semanas, no mínimo 1)', frase:'hemograma e reticulócitos em 2 a 3 semanas'},
        {v:'ferro-8sem', rot:'ferro: Hb a cada 8 semanas e ferritina a cada 3 meses', frase:'hemoglobina a cada 8 semanas e ferritina a cada 3 meses'},
        {v:'b12', rot:'B12: hemograma e reticulócitos em 7 a 10 dias e em 8 semanas', frase:'hemograma e reticulócitos em 7 a 10 dias e em 8 semanas (B12)'},
        {v:'folato', rot:'folato: hemograma entre o 10º e o 14º dia e na 8ª semana', frase:'hemograma entre o 10º e o 14º dia e na 8ª semana (folato)'}]},
      {tipo:'escolha', id:'anm-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'alim-ferro', rot:'fontes de ferro: carnes, miúdos, ovo, feijão, lentilha, folhas verde-escuras', frase:'fontes alimentares de ferro (carnes, miúdos, ovo, feijão, lentilha e folhas verde-escuras)'},
        {v:'alim-b12', rot:'fontes de B12: ovo, carne, leite', frase:'fontes alimentares de B12 (ovo, carne e leite)'},
        {v:'refeicoes', rot:'ferro longe das refeições, 1 hora antes; sem leite, cálcio, chá, café, ovo ou fibra junto', frase:'tomada do ferro longe das refeições, de preferência 1 hora antes, sem leite, cálcio, chá, café, ovo ou fibra junto'},
        {v:'ibp', rot:'com antiácido ou IBP: ferro 2 horas antes ou 4 depois', frase:'ferro 2 horas antes ou 4 horas depois de antiácido ou IBP'},
        {v:'intolerancia', rot:'intolerância ao ferro: fracionar, dias alternados, trocar o sal ou usar líquido', frase:'conduta na intolerância ao ferro: fracionar em 2 ou 3 tomadas, usar em dias alternados, trocar o sal ou passar a líquido'},
        {v:'duracao', rot:'manter o ferro até 6 meses depois de a Hb normalizar, para repor o estoque', frase:'manutenção do ferro por até 6 meses depois de a hemoglobina normalizar, para repor o estoque'}]},
      {tipo:'escolha', id:'anm-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'hemato', rot:'hematologia: suspeita de falciforme, outra hemoglobinopatia ou hemólise; anemia sem causa depois da investigação na APS (traço falciforme ou talassêmico NÃO vai: segue na APS, com orientação genética)', frase:'hematologia'},
        {v:'gastro', rot:'gastroenterologia: ferropriva sem causa, sem EDA ou colonoscopia na APS', frase:'gastroenterologia'},
        {v:'nefro', rot:'nefrologia: DRC com TFG abaixo de 45 e ferropriva refratária', frase:'nefrologia'}]},
      {tipo:'escolha', id:'anm-urgencia', rot:'Urgência: anemia sintomática ou instável; neutrófilos abaixo de 500 ou plaquetas abaixo de 50 mil; crise falciforme', lacuna:false, opts:[
        {v:'emergencia', rot:'encaminhado à emergência', frase:'encaminho à emergência'}]}
    ]}
  }
});

/* ---------- 2. Constipação ---------- */
QUADROS.push({
  id: 'constipacao', nome: 'Constipação', queixa: 'constipacao', grupo: 'A2-Digestivo-Nutricional',
  fonte: 'Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Proctologia adulto, 2021 · TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020 · TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012',
  ciap: ['D12'], cid: ['K59'],
  blocos: {
    anamnese: { rot: 'Constipação — anamnese', itens: [
      {tipo:'tri', id:'cst-criterios', rot:'Em mais de um quarto das evacuações: esforço, fezes em cíbalos ou duras (Bristol 1 ou 2), evacuação incompleta, sensação de bloqueio ou manobra com o dedo', na:'critérios de Roma IV',
  sim:'refere {d} em mais de um quarto das evacuações', simSemDet:'refere sintomas de constipação em mais de um quarto das evacuações',
  nao:'nega esforço, fezes duras, evacuação incompleta, sensação de bloqueio e manobra digital em mais de um quarto das evacuações',
  det:{tipo:'escolha', multi:true, opts:[{v:'esforco', rot:'esforço', frase:'esforço'},
    {v:'duras', rot:'fezes em cíbalos ou duras (Bristol 1 ou 2)', frase:'fezes em cíbalos ou duras'},
    {v:'incompleta', rot:'evacuação incompleta', frase:'sensação de evacuação incompleta'},
    {v:'bloqueio', rot:'sensação de bloqueio', frase:'sensação de bloqueio'},
    {v:'manobra', rot:'manobra com o dedo', frase:'manobra digital para evacuar'}]}},
      {tipo:'tri', id:'cst-dor', rot:'Dor abdominal que melhora ou piora com a evacuação (dor ligada à evacuação aponta intestino irritável)', na:'dor ligada à evacuação', junto:true,
        sim:'refere dor abdominal ligada à evacuação[: {d}]', nao:'nega dor abdominal ligada à evacuação', det:{tipo:'texto', ph:'melhora ou piora com a evacuação'}},
      D_SANGUE,
      PERDA_PESO,
      {tipo:'tri', id:'cst-familia', rot:'Câncer colorretal ou polipose na família', na:'câncer colorretal ou polipose na família', junto:true,
        sim:'refere câncer colorretal ou polipose na família[: {d}]', nao:'nega câncer colorretal e polipose na família', det:{tipo:'texto', ph:'quem, com que idade'}},
      {tipo:'tri', id:'cst-obstrucao', rot:'Parou de eliminar gases e fezes, com distensão, vômitos ou cólica (obstrução intestinal)', na:'sinais de obstrução intestinal', junto:true,
  sim:'refere parada de eliminação de gases e fezes, com {d}', simSemDet:'refere parada de eliminação de gases e fezes',
  nao:'nega parada de eliminação de gases e fezes, distensão, vômitos e cólica',
  det:{tipo:'escolha', multi:true, opts:[{v:'distensao', rot:'distensão'}, {v:'vomitos', rot:'vômitos'}, {v:'colica', rot:'cólica'}]}},
      {tipo:'tri', id:'cst-remedios', rot:'Remédio que constipa: anticolinérgico, antidepressivo, anti-histamínico, anticonvulsivante, bloqueador de canal de cálcio, clonidina, diurético, ferro, anti-inflamatório ou opioide', na:'medicamento que constipa',
        sim:'uso de medicamento que pode constipar[: {d}]', nao:'nega uso de medicamento que pode constipar', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'cst-fibra', rot:'Come pouca fibra ou bebe pouca água', na:'fibra e água', junto:true,
  sim:'refere pouca fibra ou pouca água na dieta', nao:'refere ingesta adequada de fibra e água'},
      {tipo:'tri', id:'cst-reflexo', rot:'Segura a vontade de evacuar, sobretudo depois das refeições', na:'reflexo gastrocólico', junto:true,
        sim:'refere segurar a vontade de evacuar', nao:'nega segurar a vontade de evacuar'},
      {tipo:'tri', id:'cst-laxante', rot:'Já usou laxante (qual, quanto, por quanto tempo)', na:'laxante',
  sim:'já usou laxante[: {d}]', nao:'nunca usou laxante', det:{tipo:'texto', ph:'qual, por quanto tempo'}},
      {tipo:'texto', id:'cst-freq', rot:'Evacuações por semana (menos de 3 conta)', curto:true, ph:'2', fmt:'evacuações por semana: {v}'},
      {tipo:'texto', id:'cst-tempo', rot:'Há quanto tempo (Roma IV pede 3 meses, com início há pelo menos 6)', curto:true, ph:'1 ano', fmt:'constipação há {v}'}
    ]},
    ef: { rot: 'Constipação — exame', itens: [
      {tipo:'tri', id:'cst-abdome', rot:'Abdome: distensão, fezes palpáveis ou massa no trajeto do cólon', na:'abdome',
        sim:'abdome com {d}', simSemDet:'abdome alterado à palpação', nao:'abdome sem distensão, fezes palpáveis ou massa no trajeto do cólon',
        det:{tipo:'escolha', multi:true, opts:[{v:'distensao', rot:'distensão'}, {v:'fezes', rot:'fezes palpáveis'}, {v:'massa', rot:'massa no trajeto do cólon'}]}},
      {tipo:'tri', id:'cst-tireoide', rot:'Sinais de hipotireoidismo: pele seca, bradicardia, fala lenta', na:'sinais de hipotireoidismo',
  sim:'sinais de hipotireoidismo[: {d}]', nao:'sem pele seca, bradicardia e fala lenta', det:{tipo:'texto', ph:'quais'}},
      {tipo:'escolha', id:'cst-toque', rot:'Toque retal: fecaloma, estenose anal, massa retal', na:'toque retal', multi:true, tpl:'toque retal: {d}', opts:[
  {v:'ok', rot:'sem alterações', frase:'sem alterações', so:true},
  {v:'fecaloma', rot:'fecaloma', frase:'fecaloma'},
  {v:'estenose', rot:'estenose anal', frase:'estenose anal'},
  {v:'massa', rot:'massa retal', frase:'massa retal'}]},
      {tipo:'escolha', id:'cst-perineo', rot:'Períneo em repouso e ao fazer força (contração em vez de relaxamento sugere dissinergia evacuatória)', na:'períneo ao esforço', opts:[
        {v:'relaxa', rot:'relaxa ao esforço', frase:'períneo relaxa ao esforço'},
        {v:'contrai', rot:'contrai ao esforço', frase:'contração do períneo ao esforço, sugestiva de dissinergia evacuatória'}]},
      {tipo:'escolha', id:'cst-anal', rot:'Inspeção anal: fissura, hemorroida, doença orificial que explique o sangue', na:'inspeção anal', multi:true, opts:[
        {v:'ok', rot:'sem alterações', frase:'inspeção anal sem alterações', so:true},
        {v:'fissura', rot:'fissura anal', frase:'fissura anal'},
        {v:'hemorroida', rot:'hemorroida', frase:'hemorroida'},
        {v:'orificial', rot:'outra doença orificial', frase:'outra doença orificial'}]}
    ]},
    conduta: { rot: 'Constipação — conduta', itens: [
      {tipo:'tri', id:'cst-alarme', rot:'Sinal de alarme: sangue nas fezes, emagrecimento, massa ao exame, parente de 1º grau com câncer colorretal ou anemia ferropriva sem causa (esta, pelos exames trazidos)', na:'sinal de alarme', junto:true,
  sim:'sinal de alarme presente[: {d}]', nao:'sem sangue nas fezes, emagrecimento, massa ao exame e parente de 1º grau com câncer colorretal',
  det:{tipo:'texto', ph:'qual'}},
      {tipo:'escolha', id:'cst-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'base', rot:'para encaminhar: sangue oculto nas fezes, hemograma, glicemia e TSH', frase:'pesquisa de sangue oculto nas fezes, hemograma, glicemia e TSH'},
        {v:'calcio', rot:'cálcio sérico (suspeita de causa metabólica)', frase:'cálcio sérico'},
        {v:'colono', rot:'colonoscopia (alarme, hematoquezia acima de 50 anos ou persistente, anemia ferropriva sem causa, parente de 1º grau com câncer colorretal)', frase:'colonoscopia'}]},
      {tipo:'escolha', id:'cst-orienta', rot:'Tratamento otimizado na APS (sem alarme, pode-se tentar laxante antes de qualquer exame do cólon)', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'fibra', rot:'dieta com fibra e água', frase:'dieta com fibra e água'},
        {v:'laxantes', rot:'alimentos laxantes', frase:'alimentos laxantes'},
        {v:'reflexo', rot:'reflexo gastrocólico', frase:'aproveitar o reflexo gastrocólico depois das refeições'},
        {v:'ferro-opioide', rot:'ao prescrever ferro ou opioide, já orientar o manejo da constipação', frase:'manejo da constipação com o ferro ou o opioide prescrito'}]},
      {tipo:'escolha', id:'cst-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'gastro', rot:'gastroenterologia: sem melhora depois de 12 semanas de tratamento otimizado', frase:'gastroenterologia'},
        {v:'colono', rot:'colonoscopia: alteração do hábito com suspeita de câncer (sem colonoscopia na APS, gastroenterologia ou proctologia)', frase:'colonoscopia'},
        {v:'proctologia', rot:'proctologia', frase:'proctologia'},
        {v:'funcional', rot:'avaliação funcional (manometria, defecografia): sem resposta a fibra e laxante, ou com sintoma de bloqueio', frase:'avaliação funcional (manometria, defecografia) por suspeita de dissinergia evacuatória'}]},
      {tipo:'escolha', id:'cst-urgencia', rot:'Obstrução intestinal: parada de gases e fezes, distensão, vômitos e cólica (jejum e pronto-socorro)', lacuna:false, opts:[
  {v:'ps', rot:'encaminhado ao pronto-socorro', frase:'encaminho ao pronto-socorro, em jejum, por suspeita de obstrução intestinal'}]},
      {tipo:'texto', id:'cst-tratado', rot:'Para o encaminhamento: tratamento já feito (fibra, laxante, tempo)', ph:'fibra e água há 3 meses, laxante osmótico há 2 meses', fmt:'tratamento já feito: {v}'}
    ]}
  }
});

/* ---------- 3. Diarreia aguda ---------- */
QUADROS.push({
  id: 'diarreia-aguda', nome: 'Diarreia aguda', queixa: 'diarreia-aguda', grupo: 'A2-Digestivo-Nutricional',
  fonte: 'MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Manejo do paciente com diarreia (cartaz), 2023 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025',
  ciap: ['D11', 'D73'], cid: ['A09'],
  blocos: {
    anamnese: { rot: 'Diarreia aguda — anamnese', itens: [
      {tipo:'tri', id:'dga-muco-sangue', rot:'Muco ou sangue nas fezes', na:'muco e sangue nas fezes',
        sim:'refere {d} nas fezes', simSemDet:'refere muco ou sangue nas fezes', nao:'nega muco e sangue nas fezes',
        det:{tipo:'escolha', multi:true, opts:[{v:'muco', rot:'muco'}, {v:'sangue', rot:'sangue'}]}},
      {tipo:'tri', id:'dga-febre', rot:'Febre', na:'febre', junto:true, sim:'refere febre', nao:'nega febre'},
      {tipo:'tri', id:'dga-nausea', rot:'Náusea ou vômitos', na:'náusea e vômitos', junto:true,
        sim:'refere {d}', simSemDet:'refere náusea ou vômitos', nao:'nega náusea e vômitos',
        det:{tipo:'escolha', multi:true, opts:[{v:'nausea', rot:'náusea'}, {v:'vomitos', rot:'vômitos'}]}},
      {tipo:'tri', id:'dga-dor', rot:'Dor abdominal forte, tenesmo ou vômito com sangue', na:'dor abdominal forte, tenesmo e vômito com sangue', junto:true,
  sim:'refere {d}', simSemDet:'refere dor abdominal forte, tenesmo ou vômito com sangue',
  nao:'nega dor abdominal forte, tenesmo e vômito com sangue',
  det:{tipo:'escolha', multi:true, opts:[{v:'dor', rot:'dor abdominal forte'}, {v:'tenesmo', rot:'tenesmo'}, {v:'hematemese', rot:'vômito com sangue', frase:'hematêmese'}]}},
      {tipo:'tri', id:'dga-bebe', rot:'Dificuldade para beber ou manter o que bebe', na:'ingestão de líquidos', junto:true,
        sim:'refere dificuldade para beber ou manter o que bebe', nao:'nega dificuldade para beber ou manter o que bebe'},
      {tipo:'tri', id:'dga-alerta', rot:'Muita sede, urinando menos ou recusando comida (sinais de alerta do plano A)', na:'sinais de alerta de desidratação', junto:true,
        sim:'refere {d}', simSemDet:'refere sinais de alerta de desidratação', nao:'nega muita sede, diminuição da urina e recusa de comida',
        det:{tipo:'escolha', multi:true, opts:[{v:'sede', rot:'muita sede'}, {v:'urina', rot:'diminuição da urina'}, {v:'recusa', rot:'recusa de comida'}]}},
      {tipo:'tri', id:'dga-contatos', rot:'Parentes ou conhecidos com os mesmos sintomas; refeição em comum', na:'outros casos e refeição em comum',
        sim:'refere pessoas com os mesmos sintomas[: {d}]', nao:'nega pessoas com os mesmos sintomas ou refeição em comum', det:{tipo:'texto', ph:'quem, refeição em comum'}},
      D_IMUNO,
      GRAVIDEZ,
      {tipo:'escolha', id:'dga-duracao', rot:'Diarreia há 14 dias ou mais (persistente) ou há mais de 30 dias (crônica)', na:'duração', lacuna:false, opts:[
        {v:'persistente', rot:'14 dias ou mais (persistente)', frase:'diarreia persistente, há 14 dias ou mais'},
        {v:'cronica', rot:'mais de 30 dias (crônica)', frase:'diarreia crônica, há mais de 30 dias'}]},
      {tipo:'tri', id:'dga-arrastada', rot:'Se arrastada: perda de peso, sangue, muco ou pus persistentes, dor abdominal ou anal, tenesmo', na:'sintomas da diarreia arrastada', lacuna:false,
        sim:'diarreia arrastada com {d}', simSemDet:'diarreia arrastada com sintomas associados',
        nao:'nega perda de peso, sangue, muco ou pus persistentes, dor abdominal ou anal e tenesmo',
        det:{tipo:'escolha', multi:true, opts:[{v:'peso', rot:'perda de peso'}, {v:'sangue', rot:'sangue, muco ou pus persistentes', frase:'sangue, muco ou pus persistentes'},
          {v:'dor', rot:'dor abdominal ou anal'}, {v:'tenesmo', rot:'tenesmo'}]}},
      {tipo:'texto', id:'dga-inicio', rot:'Quando começou e quantas evacuações por dia', ph:'há 2 dias, 6 por dia', fmt:'diarreia: {v}'}
    ]},
    ef: { rot: 'Diarreia aguda — hidratação e abdome', itens: [
      {tipo:'escolha', id:'dga-estado', rot:'Pelo cartaz da desidratação: ativo e alerta, irritado e intranquilo, ou letárgico', na:'atividade e consciência pelo cartaz', opts:[
        {v:'alerta', rot:'ativo e alerta', frase:'ativo e alerta'},
        {v:'irritado', rot:'irritado e intranquilo', frase:'irritado e intranquilo'},
        {v:'letargico', rot:'comatoso, hipotônico, letárgico ou inconsciente', frase:'comatoso, hipotônico, letárgico ou inconsciente'}]},
      {tipo:'escolha', id:'dga-olhos', rot:'Olhos e lágrimas', na:'olhos e lágrimas', junto:true, multi:true, opts:[
        {v:'normais', rot:'olhos normais, com lágrimas', frase:'olhos normais, com lágrimas', so:true},
        {v:'fundos', rot:'olhos fundos', frase:'olhos fundos'},
        {v:'sem-lagrimas', rot:'sem lágrimas', frase:'sem lágrimas'}]},
      {tipo:'escolha', id:'dga-boca', rot:'Boca e língua', na:'boca e língua', junto:true, opts:[
        {v:'umida', rot:'úmidas', frase:'boca e língua úmidas'},
        {v:'seca', rot:'secas', frase:'boca e língua secas'},
        {v:'muito-seca', rot:'muito secas', frase:'boca e língua muito secas'}]},
      {tipo:'escolha', id:'dga-sede', rot:'Sede', na:'sede', junto:true, opts:[
        {v:'sem', rot:'sem sede', frase:'sem sede'},
        {v:'avida', rot:'bebe rápido e avidamente', frase:'bebe rápido e avidamente'},
        {v:'nao-bebe', rot:'não consegue beber', frase:'não consegue beber'}]},
      {tipo:'escolha', id:'dga-prega', rot:'Sinal da prega abdominal', na:'sinal da prega', junto:true, opts:[
        {v:'imediata', rot:'desaparece imediatamente', frase:'prega abdominal desaparece imediatamente'},
        {v:'lenta', rot:'desaparece lentamente', frase:'prega abdominal desaparece lentamente'},
        {v:'muito-lenta', rot:'muito lentamente (mais de 2 segundos)', frase:'prega abdominal desaparece muito lentamente, em mais de 2 segundos'}]},
      {tipo:'escolha', id:'dga-pulso', rot:'Pulso', na:'pulso', junto:true, opts:[
        {v:'cheio', rot:'cheio', frase:'pulso cheio'},
        {v:'fraco', rot:'fraco ou ausente', frase:'pulso fraco ou ausente'}]},
      {tipo:'tri', id:'dga-abdome', rot:'Abdome: distensão, defesa ou dor que localiza (peritonite localizada não é gastroenterite)', na:'abdome',
        sim:'abdome com {d}', simSemDet:'abdome alterado', nao:'abdome sem distensão, defesa ou dor localizada',
        det:{tipo:'escolha', multi:true, opts:[{v:'distensao', rot:'distensão'}, {v:'defesa', rot:'defesa'}, {v:'dor', rot:'dor localizada'}]}}
    ]},
    conduta: { rot: 'Diarreia aguda — conduta', itens: [
      {tipo:'escolha', id:'dga-plano', rot:'Plano de hidratação (na dúvida entre duas classificações, tratar pelo pior cenário)', na:'plano de hidratação', opts:[
  {v:'a', rot:'A — sem desidratação, em casa', frase:'plano A de hidratação (sem desidratação), em casa'},
  {v:'b', rot:'B — com desidratação, na unidade até reidratar', frase:'plano B de hidratação (com desidratação), na unidade até reidratar'},
  {v:'c', rot:'C — desidratação grave, reidratação venosa', frase:'plano C de hidratação (desidratação grave)'}]},
      {tipo:'escolha', id:'dga-acoes-c', rot:'Plano C: o que já foi feito', lacuna:false, multi:true, tpl:'no plano C: {d}', opts:[
  {v:'venosa', rot:'reidratação venosa iniciada na UBS', frase:'reidratação venosa iniciada na UBS'},
  {v:'sro', rot:'SRO assim que conseguir beber', frase:'SRO assim que conseguir beber'},
  {v:'samu', rot:'SAMU ou remoção acionados', frase:'SAMU ou remoção acionados'},
  {v:'obs', rot:'observação por pelo menos 6 horas', frase:'observação por pelo menos 6 horas'}]},
      {tipo:'escolha', id:'dga-orienta', rot:'Orientações do plano A', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'liquidos', rot:'mais líquido que o habitual, SRO após cada evacuação e vômito, pouco e mais vezes; sem refrigerante', frase:'mais líquido que o habitual, líquidos caseiros ou SRO após cada evacuação e cada vômito, pouco e mais vezes, sem refrigerante'},
        {v:'alimentacao', rot:'manter a alimentação habitual', frase:'manutenção da alimentação habitual'},
        {v:'sro', rot:'sinais de desidratação e de alerta, preparo da SRO, higiene das mãos, da água e dos alimentos', frase:'sinais de desidratação e de alerta, preparo da SRO e higiene das mãos, da água e dos alimentos'},
        {v:'retorno', rot:'voltar já se não melhorar em 2 dias ou com piora, vômitos repetidos, sangue nas fezes, menos urina, muita sede ou recusa alimentar', frase:'retorno imediato se não melhorar em 2 dias ou se houver piora da diarreia, vômitos repetidos, sangue nas fezes, menos urina, muita sede ou recusa alimentar'}]},
      {tipo:'escolha', id:'dga-exames', rot:'Exames (o plano sai da avaliação clínica: não esperar exame para hidratar)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'giardia', rot:'14 dias ou mais: parasitológico de fezes (cistos ou trofozoítos de Giardia)', frase:'parasitológico de fezes'},
        {v:'cronica', rot:'crônica (mais de 4 semanas): hemograma, glicemia, TSH, anti-HIV ou teste rápido, parasitológico em 3 amostras, coprocultura, leucócitos fecais e sangue oculto', frase:'hemograma, glicemia, TSH, anti-HIV ou teste rápido, parasitológico de fezes em 3 amostras, coprocultura, leucócitos fecais e sangue oculto'}]},
      {tipo:'escolha', id:'dga-reavalia', rot:'Disenteria tratada em casa', lacuna:false, opts:[
  {v:'reav', rot:'reavaliar em 2 dias', frase:'reavalio em 2 dias, por disenteria tratada em casa'}]},
      {tipo:'escolha', id:'dga-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'hospital', rot:'hospital: diarreia de mais de 14 dias em menor de 6 meses ou desidratado (reidratar antes)', frase:'hospital'},
        {v:'internacao', rot:'internação: disenteria em criança até 10 anos, ou no adulto com condições comprometidas (ceftriaxona ou internação)', frase:'internação'},
        {v:'gastro', rot:'gastroenterologia: diarreia crônica sem diagnóstico ou tratamento possível na APS, ou suspeita de doença inflamatória intestinal', frase:'gastroenterologia'},
        {v:'colono', rot:'colonoscopia: alteração de hábito com suspeita de neoplasia', frase:'colonoscopia'}]}
    ]}
  }
});

/* ---------- 4. Dispepsia e refluxo ---------- */
QUADROS.push({
  id: 'dispepsia-drge', nome: 'Dispepsia / refluxo', queixa: 'dispepsia-drge', grupo: 'A2-Digestivo-Nutricional',
  fonte: 'TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025 · FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026 · FBG — Diretriz brasileira de tratamento da doença do refluxo gastroesofágico, Arq Gastroenterol, 2024 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024',
  ciap: ['D07', 'D84', 'D02'], cid: ['K30', 'K21'],
  blocos: {
    anamnese: { rot: 'Dispepsia / refluxo — anamnese', itens: [
      {tipo:'tri', id:'dsp-disfagia', rot:'Dificuldade ou dor para engolir', na:'disfagia',
        sim:'refere dificuldade ou dor para engolir[: {d}]', nao:'nega dificuldade ou dor para engolir', det:{tipo:'texto', ph:'sólido ou líquido, desde quando'}},
      {tipo:'tri', id:'dsp-vomitos', rot:'Vômitos que não param, ou vômito com sangue', na:'vômitos persistentes e hematêmese', junto:true,
  sim:'refere {d}', simSemDet:'refere vômitos persistentes ou hematêmese', nao:'nega vômitos persistentes e hematêmese',
  det:{tipo:'escolha', multi:true, opts:[{v:'persistentes', rot:'vômitos persistentes'}, {v:'sangue', rot:'vômito com sangue', frase:'hematêmese'}]}},
      D_SANGUE,
      PERDA_PESO,
      {tipo:'tri', id:'dsp-ganho-peso', rot:'Ganhou peso', na:'ganho de peso', junto:true,
        sim:'refere ganho de peso', nao:'nega ganho de peso'},
      {tipo:'tri', id:'dsp-familia', rot:'Parente de 1º grau com câncer de estômago ou de esôfago (com que idade)', na:'câncer gástrico ou de esôfago na família',
        sim:'refere parente de 1º grau com câncer de estômago ou de esôfago[: {d}]', nao:'nega parente de 1º grau com câncer de estômago ou de esôfago', det:{tipo:'texto', ph:'quem, com que idade'}},
      D_AINE,
      {tipo:'tri', id:'dsp-ibp', rot:'Já usou omeprazol ou outro IBP (dose, tempo, se tomava 30 minutos antes do café)', na:'uso prévio de IBP',
        sim:'já usou inibidor de bomba de prótons[: {d}]', nao:'nega uso prévio de inibidor de bomba de prótons', det:{tipo:'texto', ph:'qual, dose, por quanto tempo, 30 minutos antes do café?'}},
      {tipo:'tri', id:'dsp-hp-previo', rot:'Já tratou H. pylori (com quais antibióticos: claritromicina, levofloxacino)', na:'tratamento prévio de H. pylori', junto:true,
        sim:'já tratou H. pylori[: {d}]', nao:'nega tratamento prévio de H. pylori', det:{tipo:'texto', ph:'esquema, quando'}},
      {tipo:'tri', id:'dsp-eda-previa', rot:'Já fez endoscopia (laudo, biópsia e teste de H. pylori estão com o paciente)', na:'endoscopia prévia', junto:true,
        sim:'já fez endoscopia digestiva[: {d}]', nao:'nunca fez endoscopia digestiva', det:{tipo:'texto', ph:'quando, laudo, biópsia, teste de H. pylori'}},
      {tipo:'escolha', id:'dsp-predomina', rot:'O que predomina: dor ou queimação epigástrica e empachamento (dispepsia), ou azia e regurgitação (refluxo)', na:'sintoma predominante', multi:true, tpl:'sintomas predominantes: {d}', opts:[
        {v:'dispepsia', rot:'dor ou queimação epigástrica e empachamento (dispepsia)', frase:'dor ou queimação epigástrica com empachamento'},
        {v:'refluxo', rot:'azia e regurgitação (refluxo)', frase:'azia com regurgitação'}]},
      {tipo:'texto', id:'dsp-freq', rot:'Quantas vezes por semana', curto:true, ph:'3', fmt:'frequência dos sintomas por semana: {v}'},
      {tipo:'texto', id:'dsp-tempo', rot:'Há quanto tempo (início recente?)', curto:true, ph:'6 meses', fmt:'sintomas há {v}'},
      {tipo:'texto', id:'dsp-agrava', rot:'O que piora e o que alivia', ph:'piora com café, alivia com antiácido', fmt:'piora e alívio: {v}'}
    ]},
    ef: { rot: 'Dispepsia / refluxo — exame', itens: [
      PN_MUCOSAS,
      {tipo:'tri', id:'dsp-abdome', rot:'Palpação abdominal: massa epigástrica, defesa, abdome tenso ou rígido, dor desproporcional', na:'palpação abdominal',
        sim:'abdome com {d}', simSemDet:'abdome alterado à palpação', nao:'abdome sem massa epigástrica, defesa, tensão ou dor desproporcional',
        det:{tipo:'escolha', multi:true, opts:[{v:'massa', rot:'massa epigástrica'}, {v:'defesa', rot:'defesa'},
          {v:'rigido', rot:'abdome tenso ou rígido'}, {v:'dor', rot:'dor desproporcional'}]}},
      {tipo:'tri', id:'dsp-murphy', rot:'Sinal de Murphy (colecistite)', na:'sinal de Murphy', junto:true,
        sim:'sinal de Murphy positivo', nao:'sinal de Murphy negativo'},
      {tipo:'tri', id:'dsp-colestase', rot:'Sinais de colestase: icterícia ao exame; colúria e acolia pelo relato (perguntar antes de marcar ✗)', na:'sinais de colestase', junto:true,
  sim:'sinais de colestase: {d}', simSemDet:'sinais de colestase', nao:'sem icterícia, colúria e acolia',
  det:{tipo:'escolha', multi:true, opts:[{v:'ictericia', rot:'icterícia'}, {v:'coluria', rot:'colúria'}, {v:'acolia', rot:'acolia'}]}}
    ]},
    conduta: { rot: 'Dispepsia / refluxo — conduta', itens: [
      {tipo:'tri', id:'dsp-alarme', rot:'Sinal de alarme: perda de peso, disfagia, vômitos persistentes, sangramento digestivo, massa epigástrica ou anemia ferropriva sem causa (esta, pelos exames trazidos)', na:'sinal de alarme', junto:true,
  sim:'sinal de alarme presente[: {d}]', nao:'sem perda de peso, disfagia, vômitos persistentes, sangramento digestivo e massa epigástrica',
  det:{tipo:'texto', ph:'qual'}},
      {tipo:'escolha', id:'dsp-estrategia', rot:'Estratégia', na:'estratégia', opts:[
  {v:'testar-tratar', rot:'testar e tratar H. pylori: dispepsia não investigada, até 45 anos, sem alarme', frase:'estratégia de testar e tratar o H. pylori'},
  {v:'eda', rot:'EDA com biópsia: alarme, 40 anos ou mais, falha do IBP ou do testar-e-tratar, parente com câncer gástrico aos 30 anos ou mais', frase:'estratégia de investigar com endoscopia digestiva alta e biópsia'},
  {v:'drge', rot:'DRGE típica sem alarme: medidas comportamentais e IBP em dose plena por 2 meses', frase:'DRGE típica sem alarme: medidas comportamentais e IBP em dose plena por 2 meses, com EDA se não houver controle'}]},
      {tipo:'texto', id:'dsp-motivo', rot:'De 40 a 45 anos sem alarme: o V Consenso (testar e tratar até 45; EDA a partir de 40) e o Protocolo 2025 (EDA a partir de 50) divergem; decidir com a preceptora e registrar o motivo',
  ph:'testar e tratar, sem alarme', fmt:'decisão entre testar e tratar ou EDA, com a preceptora: {v}'},
      {tipo:'escolha', id:'dsp-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'teste-hp', rot:'H. pylori sem indicação de EDA: teste respiratório com ureia marcada com 13C (padrão)', frase:'teste respiratório com ureia marcada com 13C para H. pylori'},
  {v:'antigeno-hp', rot:'H. pylori sem indicação de EDA: antígeno fecal', frase:'antígeno fecal para H. pylori'},
        {v:'eda', rot:'EDA com biópsia de antro e corpo', frase:'endoscopia digestiva alta com biópsia de antro e corpo'},
        {v:'controle-hp', rot:'controle de erradicação: teste respiratório (sorologia não serve)', frase:'teste respiratório para controle de erradicação do H. pylori'},
  {v:'controle-hp-ag', rot:'controle de erradicação: antígeno fecal (sorologia não serve)', frase:'antígeno fecal para controle de erradicação do H. pylori'},
        {v:'eda-ulcera', rot:'úlcera péptica: EDA de controle 8 a 12 semanas depois do tratamento', frase:'endoscopia digestiva alta de controle da úlcera, 8 a 12 semanas depois do tratamento'},
        {v:'encaminhar', rot:'para encaminhar: hemoglobina (e VCM, ferro e ferritina se anemia) e parasitológico de fezes', frase:'hemoglobina e parasitológico de fezes'}]},
      {tipo:'escolha', id:'dsp-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'suspender', rot:'antes do teste de H. pylori: suspender IBP 14 dias antes, antibiótico e bismuto 4 semanas antes (antiácido e alginato não precisam)', frase:'suspensão do IBP 14 dias e de antibiótico e bismuto 4 semanas antes do teste de H. pylori (antiácido e alginato não precisam ser suspensos)'},
        {v:'comportamento', rot:'medidas comportamentais da DRGE e perda de peso', frase:'medidas comportamentais da DRGE e perda de peso'},
        {v:'ibp-cafe', rot:'IBP 30 minutos antes do café', frase:'tomada do IBP 30 minutos antes do café'},
        {v:'4semanas', rot:'confirmar a erradicação 4 semanas depois do antibiótico, com 14 dias sem IBP', frase:'confirmação da erradicação do H. pylori 4 semanas depois do antibiótico, com 14 dias sem IBP'}]},
      {tipo:'escolha', id:'dsp-encaminha', rot:'Encaminhamento', lacuna:false, tpl:'encaminho para {d}', opts:[
        {v:'gastro', rot:'gastroenterologia: esofagite C ou D, estenose péptica, hérnia hiatal com DRGE refratária, Barrett, úlcera que persiste no controle', frase:'gastroenterologia'}]}
    ]}
  }
});

/* ---------- 5. Hepatites e esteatose ---------- */
QUADROS.push({
  id: 'hepatites-esteatose', nome: 'Hepatites / esteatose', queixa: 'hepatites-esteatose', grupo: 'A2-Digestivo-Nutricional',
  fonte: 'MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025 · SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023 · MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026',
  ciap: ['D72', 'D97'], cid: ['B18', 'B19', 'B17', 'K76', 'R74'],
  blocos: {
    anamnese: { rot: 'Hepatites / esteatose — anamnese', itens: [
      {tipo:'tri', id:'hep-sintomas', rot:'Pele ou olho amarelos, urina escura, fezes claras, coceira, cansaço ou dor no lado direito da barriga', na:'sintomas de hepatopatia',
        sim:'refere {d}', simSemDet:'refere sintomas de hepatopatia', nao:'nega icterícia, colúria, acolia, prurido, cansaço e dor em hipocôndrio direito',
        det:{tipo:'escolha', multi:true, opts:[{v:'ictericia', rot:'icterícia'}, {v:'coluria', rot:'colúria'}, {v:'acolia', rot:'acolia'},
          {v:'prurido', rot:'prurido'}, {v:'cansaco', rot:'cansaço'}, {v:'dor', rot:'dor em hipocôndrio direito'}]}},
      {tipo:'tri', id:'hep-teste', rot:'Já fez teste de hepatite C alguma vez na vida', na:'teste de hepatite C prévio',
        sim:'já fez teste de hepatite C[: {d}]', nao:'nunca fez teste de hepatite C', det:{tipo:'texto', ph:'quando, resultado'}},
      {tipo:'tri', id:'hep-drogas', rot:'Usa ou usou droga injetável, inalada ou pipada', na:'uso de droga injetável, inalada ou pipada', junto:true,
        sim:'refere uso de droga injetável, inalada ou pipada[: {d}]', nao:'nega uso de droga injetável, inalada ou pipada', det:{tipo:'texto', ph:'qual, quando'}},
      {tipo:'tri', id:'hep-sexo', rot:'Sexo sem preservativo, sexo químico, HSH ou trabalho sexual', na:'exposição sexual de risco', junto:true,
        sim:'refere {d}', simSemDet:'refere exposição sexual de risco', nao:'nega sexo sem preservativo, sexo químico, HSH e trabalho sexual',
        det:{tipo:'escolha', multi:true, opts:[{v:'sem-preservativo', rot:'sexo sem preservativo'}, {v:'quimico', rot:'sexo químico'},
          {v:'hsh', rot:'HSH', frase:'sexo entre homens (HSH)'}, {v:'trabalho', rot:'trabalho sexual'}]}},
      {tipo:'tri', id:'hep-parenteral', rot:'Hemodiálise, passagem pela prisão, transfusão antes de 1992, tatuagem ou piercing', na:'outras exposições',  junto:true,
        sim:'refere {d}', simSemDet:'refere outra exposição de risco para hepatite C', nao:'nega hemodiálise, prisão, transfusão antes de 1992, tatuagem e piercing',
        det:{tipo:'escolha', multi:true, opts:[{v:'hemodialise', rot:'hemodiálise'}, {v:'prisao', rot:'passagem pela prisão'},
          {v:'transfusao', rot:'transfusão antes de 1992'}, {v:'tatuagem', rot:'tatuagem ou piercing'}]}},
      {tipo:'tri', id:'hep-vulneravel', rot:'Vive com HIV, usa PrEP, é pessoa trans, está em situação de rua ou usa outras drogas (testagem anual ou mais frequente; o álcool está no etilismo da ficha)', na:'grupo de vulnerabilidade', junto:true,
  sim:'em grupo de vulnerabilidade para hepatite C: {d}', simSemDet:'em grupo de vulnerabilidade para hepatite C',
  nao:'nega HIV, uso de PrEP, ser pessoa trans, situação de rua e uso de outras drogas',
  det:{tipo:'escolha', multi:true, opts:[{v:'hiv', rot:'HIV', frase:'vive com HIV'}, {v:'prep', rot:'PrEP', frase:'usa PrEP'}, {v:'trans', rot:'pessoa trans'},
    {v:'rua', rot:'situação de rua'}, {v:'drogas', rot:'outras drogas', frase:'uso de outras drogas'}]}},
      {tipo:'tri', id:'hep-figado-previo', rot:'Já teve doença do fígado', na:'doença do fígado prévia', junto:true,
        sim:'refere doença do fígado prévia[: {d}]', nao:'nega doença do fígado prévia', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'hep-remedios', rot:'Remédios, chás e suplementos: paracetamol, anti-inflamatório, estatina, IBP, antibióticos, chá verde, anabolizante ou suplemento', na:'medicamento, chá ou suplemento com risco hepático',
        sim:'uso de medicamento, chá ou suplemento com risco hepático[: {d}]', nao:'nega uso de paracetamol, anti-inflamatório, estatina, IBP, antibiótico, chá verde, anabolizante e suplemento', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'hep-antivirais', rot:'Carbamazepina, oxcarbazepina, fenitoína, fenobarbital, amiodarona ou rifampicina (interação com os antivirais)', na:'interação com os antivirais', lacuna:false, junto:true,
        sim:'uso de {d}', simSemDet:'uso de medicamento com interação com os antivirais',
        nao:'nega uso de carbamazepina, oxcarbazepina, fenitoína, fenobarbital, amiodarona e rifampicina', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'hep-quimio', rot:'Quimioterapia, imunossupressor, transplante ou neoplasia (em uso ou a começar)', na:'quimioterapia, imunossupressão, transplante ou neoplasia', lacuna:false, junto:true,
  sim:'refere {d}', simSemDet:'refere quimioterapia, imunossupressão, transplante ou neoplasia', nao:'nega quimioterapia, imunossupressor, transplante e neoplasia',
  det:{tipo:'escolha', multi:true, opts:[{v:'quimio', rot:'quimioterapia'}, {v:'imuno', rot:'imunossupressor'}, {v:'transplante', rot:'transplante'}, {v:'neoplasia', rot:'neoplasia'}]}},
{tipo:'tri', id:'hep-tratou-c', rot:'Já tratou hepatite C antes (falha prévia de antiviral muda o destino)', na:'tratamento prévio de hepatite C', lacuna:false, junto:true,
  sim:'já tratou hepatite C[: {d}]', nao:'nunca tratou hepatite C', det:{tipo:'texto', ph:'esquema, quando, resposta'}},
GRAVIDEZ,
      {tipo:'tri', id:'hep-vacina', rot:'Esquema de vacina de hepatite B incompleto (o completo tem 3 doses) ou sem registro na caderneta', na:'vacina de hepatite B',
        sim:'esquema de vacina de hepatite B incompleto ou sem registro na caderneta', nao:'esquema de vacina de hepatite B completo na caderneta'}
    ]},
    ef: { rot: 'Hepatites / esteatose — exame', itens: [
      D_ICTERICIA,
      {tipo:'tri', id:'hep-hepatomegalia', rot:'Hepatomegalia dolorosa (hepatite aguda)', na:'hepatomegalia dolorosa', junto:true,
        sim:'hepatomegalia dolorosa', nao:'sem hepatomegalia dolorosa'},
      {tipo:'tri', id:'hep-cirrose', rot:'Sinais de cirrose: aranhas vasculares, eritema palmar, ginecomastia, ascite, veias abdominais dilatadas, esplenomegalia', na:'sinais de cirrose', junto:true,
        sim:'sinais de cirrose: {d}', simSemDet:'sinais de cirrose',
        nao:'sem aranhas vasculares, eritema palmar, ginecomastia, ascite, veias abdominais dilatadas e esplenomegalia',
        det:{tipo:'escolha', multi:true, opts:[{v:'aranhas', rot:'aranhas vasculares'}, {v:'eritema', rot:'eritema palmar'}, {v:'ginecomastia', rot:'ginecomastia'},
          {v:'ascite', rot:'ascite'}, {v:'veias', rot:'veias abdominais dilatadas'}, {v:'esplenomegalia', rot:'esplenomegalia'}]}},
      {tipo:'tri', id:'hep-encefalopatia', rot:'Encefalopatia: confusão ou flapping ao exame; inversão do sono pelo relato (perguntar antes de marcar ✗)', na:'encefalopatia', junto:true,
  sim:'sinais de encefalopatia[: {d}]', nao:'sem inversão do sono, confusão e flapping', det:{tipo:'texto', ph:'quais'}}
    ]},
    conduta: { rot: 'Hepatites / esteatose — conduta', itens: [
      {tipo:'rotulo', rot:'Hepatite C'},
      {tipo:'texto', id:'hep-apri', rot:'APRI (calculado de AST e plaquetas; abaixo de 1 e sem critério de encaminhamento: tratar na APS)', curto:true, ph:'0,5', fmt:'APRI {v}'},
      {tipo:'escolha', id:'hep-exames-c', rot:'Exames da hepatite C', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'rapido', rot:'teste rápido anti-HCV (reagente não precisa de confirmação do anticorpo)', frase:'teste rápido anti-HCV'},
        {v:'rna', rot:'teste rápido reagente: HCV-RNA (carga viral) ou antígeno do HCV', frase:'HCV-RNA (carga viral) ou antígeno do HCV'},
        {v:'repetir', rot:'anti-HCV não reagente com suspeita forte: repetir em 30 dias', frase:'anti-HCV de repetição em 30 dias'},
        {v:'antes', rot:'antes de tratar: HCV-RNA, AST e plaquetas para o APRI, testes rápidos de HIV, HBV e sífilis', frase:'HCV-RNA, AST e plaquetas para o APRI e testes rápidos de HIV, HBV e sífilis'},
        {v:'cura', rot:'cura: HCV-RNA a partir de 12 semanas depois do fim do tratamento', frase:'HCV-RNA a partir de 12 semanas depois do fim do tratamento'}]},
      {tipo:'escolha', id:'hep-retesta', rot:'Reteste de hepatite C (quem curou e segue exposto retesta com HCV-RNA, não com anti-HCV)', lacuna:false, multi:true, tpl:'oriento reteste de hepatite C {d}', opts:[
        {v:'anual', rot:'anual, se a vulnerabilidade se mantém', frase:'anual'},
        {v:'prep', rot:'a cada 4 meses, na PrEP', frase:'a cada 4 meses'},
        {v:'gestacao', rot:'a cada gestação', frase:'a cada gestação'}]},
      {tipo:'rotulo', rot:'Hepatite B'},
      {tipo:'escolha', id:'hep-exames-b', rot:'Exames da hepatite B', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'hbsag', rot:'teste rápido HBsAg', frase:'teste rápido HBsAg'},
        {v:'igm', rot:'HBsAg e anti-HBc reagentes: anti-HBc IgM', frase:'anti-HBc IgM'}]},
      {tipo:'escolha', id:'hep-vacina-b', rot:'Vacina de hepatite B', lacuna:false, opts:[
        {v:'completar', rot:'7 anos ou mais sem esquema completo: completar as 3 doses (0, 1 e 6 meses), sem reiniciar', frase:'vacina de hepatite B a completar: 3 doses (0, 1 e 6 meses), sem reiniciar'},
        {v:'suscetivel', rot:'HBsAg e anti-HBc não reagentes (suscetível): vacinar', frase:'suscetível à hepatite B (HBsAg e anti-HBc não reagentes), vacinação indicada'}]},
      {tipo:'rotulo', rot:'Transaminases e esteatose'},
      {tipo:'texto', id:'hep-fib4', rot:'FIB-4 (calculado de AST, ALT, plaquetas e idade; acima de 3,25 = alta probabilidade de fibrose avançada; abaixo de 1,3 afasta na MASLD)', curto:true, ph:'1,1', fmt:'FIB-4 {v}'},
      {tipo:'escolha', id:'hep-exames-f', rot:'Exames do fígado', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'repetir', rot:'transaminases alteradas: repetir para confirmar', frase:'repetição das transaminases'},
        {v:'causas', rot:'investigar: HBsAg, anti-HCV, ecografia, glicose e lipídios; FAN e antimúsculo liso; ferritina e saturação', frase:'HBsAg, anti-HCV, ecografia, glicose e lipídios, FAN e antimúsculo liso, ferritina e saturação'},
        {v:'eco', rot:'esteatose: ecografia abdominal em quem tem sobrepeso ou obesidade (transaminase sozinha não rastreia)', frase:'ecografia abdominal'},
        {v:'elasto', rot:'MASLD com FIB-4 de 1,3 ou mais: elastografia', frase:'elastografia'}]},
      {tipo:'escolha', id:'hep-esteatose-orienta', rot:'Esteatose: orientações do tratamento conservador na APS', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'alcool', rot:'parar o álcool', frase:'abstenção do álcool'},
        {v:'estilo', rot:'perder 5% a 10% do peso, dieta e 150 minutos ou mais de exercício por semana', frase:'perda de 5% a 10% do peso, dieta e 150 minutos ou mais de exercício por semana'}]},
      {tipo:'escolha', id:'hep-esteatose-trata', rot:'Esteatose: comorbidades e risco cardiovascular', lacuna:false, multi:true, opts:[
        {v:'comorbidades', rot:'tratar diabetes, HAS e dislipidemia', frase:'trato diabetes, HAS e dislipidemia'},
        {v:'rcv', rot:'MASLD: estratificar o risco cardiovascular no diagnóstico', frase:'estratifico o risco cardiovascular (MASLD)'}]},
      {tipo:'rotulo', rot:'Encaminhamento e notificação'},
      {tipo:'escolha', id:'hep-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'hepc', rot:'serviço especializado em hepatite C: coinfecção HIV ou HBV, gestação, abaixo de 18 anos, depuração de creatinina abaixo de 30, quimioterapia, transplante, neoplasia, anticonvulsivante de 1ª geração, amiodarona, rifampicina, rifabutina ou rifapentina, manifestação extra-hepática grave, falha prévia ou APRI de 1 ou mais', frase:'serviço especializado em hepatite C'},
        {v:'hepb', rot:'SAE ou infectologia: hepatite B crônica', frase:'SAE ou infectologia'},
        {v:'gastro', rot:'gastroenterologia: hepatite B com cirrose; esteatose com FIB-4 acima de 3,25 ou suspeita de cirrose, ou transaminases de 1,5 vez o normal ou mais depois de 6 meses de tratamento conservador; transaminases acima de 5 vezes o normal sem causa, ou de 2 a 5 vezes por mais de 6 meses', frase:'gastroenterologia'}]},
      {tipo:'tri', id:'hep-notifica', rot:'Hepatite viral confirmada (compulsória regular, até 7 dias, no Sinan; HBsAg reagente: notificar)', na:'notificação de hepatite viral', lacuna:false,
        sim:'notificação de hepatite viral feita no Sinan', nao:'notificação de hepatite viral pendente'}
    ]}
  }
});

/* ---------- 6. Parasitoses intestinais ---------- */
QUADROS.push({
  id: 'parasitoses-intestinais', nome: 'Parasitoses intestinais', queixa: 'parasitoses-intestinais', grupo: 'A2-Digestivo-Nutricional',
  fonte: 'MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010 · MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024 · SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025',
  ciap: ['D96'], cid: ['B82', 'B80', 'B77', 'B76', 'B78', 'A07', 'A06', 'B65'],
  blocos: {
    anamnese: { rot: 'Parasitoses intestinais — anamnese', itens: [
      {tipo:'tri', id:'par-sintomas', rot:'Diarreia, dor abdominal ou cólica, náusea, vômitos, gases, sangue ou muco nas fezes', na:'sintomas digestivos',
  sim:'refere {d}', simSemDet:'refere sintomas digestivos', nao:'nega diarreia, dor abdominal, cólica, náusea, vômitos, gases e sangue ou muco nas fezes',
  det:{tipo:'escolha', multi:true, opts:[{v:'diarreia', rot:'diarreia'}, {v:'dor', rot:'dor abdominal'}, {v:'colica', rot:'cólica'}, {v:'nausea', rot:'náusea'},
    {v:'vomitos', rot:'vômitos'}, {v:'gases', rot:'gases'}, {v:'sangue', rot:'sangue nas fezes'}, {v:'muco', rot:'muco nas fezes'}]}},
      {tipo:'tri', id:'par-prurido', rot:'Coceira anal, sobretudo à noite; outros da casa com o mesmo', na:'coceira anal', junto:true,
        sim:'refere coceira anal[: {d}]', nao:'nega coceira anal', det:{tipo:'texto', ph:'à noite; outros da casa com o mesmo?'}},
      {tipo:'tri', id:'par-verme', rot:'Eliminou verme pelas fezes, pela boca ou pelo nariz', na:'eliminação de verme', junto:true,
        sim:'refere eliminação de verme[: {d}]', nao:'nega eliminação de verme pelas fezes, pela boca ou pelo nariz', det:{tipo:'texto', ph:'por onde, como era'}},
      {tipo:'tri', id:'par-loeffler', rot:'Tosse ou chiado passageiros', na:'tosse ou chiado passageiros', junto:true,
        sim:'refere tosse ou chiado passageiros', nao:'nega tosse e chiado passageiros'},
      {tipo:'tri', id:'par-febre', rot:'Febre (esquistossomose aguda, amebíase, estrongiloidíase com hiperinfecção)', na:'febre', junto:true,
  sim:'refere febre[: {d}]', nao:'nega febre', det:{tipo:'texto', ph:'há quanto tempo; depois de banho em rio?'}},
{tipo:'tri', id:'par-fraqueza', rot:'Fraqueza ou paralisia nas pernas, em quem teve contato com água de área endêmica (neuroesquistossomose)', na:'fraqueza ou paralisia de membros inferiores', junto:true,
  sim:'refere fraqueza ou paralisia de membros inferiores', nao:'nega fraqueza ou paralisia de membros inferiores'},
      {tipo:'tri', id:'par-descalco', rot:'Anda descalço', na:'andar descalço',
        sim:'anda descalço', nao:'não anda descalço'},
      {tipo:'tri', id:'par-saneamento', rot:'Sem água tratada ou sem esgoto em casa', na:'água tratada e esgoto', junto:true,
        sim:'sem água tratada ou sem esgoto em casa', nao:'tem água tratada e esgoto em casa'},
      {tipo:'tri', id:'par-rio', rot:'Banho, pesca, lavagem de roupa ou plantio em rio, lagoa ou córrego (esquistossomose): de onde, quando', na:'contato com água de rio, lagoa ou córrego', junto:true,
        sim:'refere contato com água de rio, lagoa ou córrego[: {d}]', nao:'nega contato com água de rio, lagoa ou córrego', det:{tipo:'texto', ph:'onde, quando, fazendo o quê'}},
      {tipo:'tri', id:'par-carne', rot:'Comeu carne de porco ou de boi crua ou malpassada', na:'carne crua ou malpassada', junto:true,
        sim:'refere consumo de carne crua ou malpassada', nao:'nega consumo de carne de porco ou de boi crua ou malpassada'},
      {tipo:'tri', id:'par-proglote', rot:'Eliminou pedaços brancos nas fezes (proglotes)', na:'proglotes', junto:true,
        sim:'refere eliminação de proglotes', nao:'nega eliminação de proglotes'},
      D_IMUNO,
      GRAVIDEZ,
      D_AMAMENTA
    ]},
    ef: { rot: 'Parasitoses intestinais — exame', itens: [
      PN_MUCOSAS,
      {tipo:'tri', id:'par-nutricao', rot:'Estado nutricional (na criança, curva de crescimento)', na:'estado nutricional', junto:true,
        sim:'comprometimento do estado nutricional[: {d}]', nao:'sem comprometimento do estado nutricional', det:{tipo:'texto', ph:'o quê; curva de crescimento'}},
      {tipo:'tri', id:'par-abdome', rot:'Abdome: distensão, massa palpável, fígado e baço (hepatoesplenomegalia na esquistossomose)', na:'abdome', junto:true,
        sim:'abdome com {d}', simSemDet:'abdome alterado à palpação', nao:'abdome sem distensão, massa palpável e hepatoesplenomegalia',
        det:{tipo:'escolha', multi:true, opts:[{v:'distensao', rot:'distensão'}, {v:'massa', rot:'massa palpável'}, {v:'hepatoesplenomegalia', rot:'hepatoesplenomegalia'}]}},
      {tipo:'escolha', id:'par-pele', rot:'Pele: lesão nos pés no local de entrada da larva, larva currens na estrongiloidíase', na:'pele', lacuna:false, multi:true, opts:[
        {v:'ok', rot:'sem alterações', frase:'pele sem lesão nos pés nem larva currens', so:true},
        {v:'pes', rot:'lesão nos pés', frase:'lesão nos pés no local de entrada da larva'},
        {v:'currens', rot:'larva currens', frase:'lesão serpiginosa migratória (larva currens)'}]},
      {tipo:'escolha', id:'par-perianal', rot:'Região perianal: escoriações de coçar (enterobíase)', na:'região perianal', lacuna:false, multi:true, opts:[
        {v:'ok', rot:'sem alterações', frase:'região perianal sem alterações', so:true},
        {v:'escoriacao', rot:'escoriações de coçar', frase:'escoriações de coçar na região perianal'}]}
    ]},
    conduta: { rot: 'Parasitoses intestinais — conduta', itens: [
      {tipo:'tri', id:'par-confirmado', rot:'Parasito confirmado no exame de fezes (esquistossomose: só com ovos confirmados)', na:'confirmação do parasito', lacuna:false, junto:true,
        sim:'parasito confirmado no exame de fezes', nao:'sem parasito confirmado em exame de fezes'},
      {tipo:'escolha', id:'par-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'pf', rot:'parasitológico de fezes', frase:'parasitológico de fezes'},
        {v:'pf3', rot:'parasitológico de fezes em 3 amostras (giárdia)', frase:'parasitológico de fezes em 3 amostras'},
        {v:'kato', rot:'Kato-Katz (esquistossomose; conta também ovos de ancilóstomo)', frase:'Kato-Katz'},
        {v:'baermann', rot:'Baermann-Moraes (estrongiloides: fezes, escarro ou lavado gástrico)', frase:'método de Baermann-Moraes'},
        {v:'graham', rot:'Graham, com fita adesiva na região perianal (enterobíase)', frase:'método de Graham, com fita adesiva na região perianal'},
        {v:'sorologia', rot:'esquistossomose com parasitológico negativo e suspeita forte: sorologia no Lacen (positiva: parasitológico seriado)', frase:'sorologia de esquistossomose no Lacen'},
        {v:'hemograma', rot:'hemograma (eosinofilia na esquistossomose aguda e no Löffler; anemia na ancilostomíase)', frase:'hemograma'}]},
      {tipo:'escolha', id:'par-cura', rot:'Controle de cura (ancilostomíase e estrongiloidíase)', lacuna:false, opts:[
        {v:'cura', rot:'parasitológico no 7º, 14º e 21º dia', frase:'solicito parasitológico de controle de cura no 7º, 14º e 21º dia depois do tratamento'}]},
      {tipo:'escolha', id:'par-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
  {v:'praziquantel', rot:'praziquantel: repouso de pelo menos 3 horas depois de tomar, para evitar náusea e tontura', frase:'repouso de pelo menos 3 horas depois do praziquantel, para evitar náusea e tontura'},
  {v:'enterobiase', rot:'enterobíase: tratar a casa toda, repetir em 2 semanas, cortar e limpar as unhas, lavar a roupa de cama em água quente', frase:'tratamento da casa toda na enterobíase, repetição em 2 semanas, unhas cortadas e limpas e roupa de cama lavada em água quente'},
  {v:'prevencao', rot:'prevenção: lavar as mãos, lavar verduras e deixá-las meia hora em hipoclorito de sódio, usar calçados', frase:'lavar as mãos depois do banheiro, lavar as verduras e deixá-las meia hora em água com hipoclorito de sódio e usar calçados'}]},
      {tipo:'escolha', id:'par-notifica', rot:'Esquistossomose: notificação (grave, hospitalizado ou de área não endêmica: Sinan; rotina em área endêmica: SISPCE). Giardíase e amebíase não são compulsórias', lacuna:false, multi:true, opts:[
        {v:'sinan', rot:'Sinan', frase:'esquistossomose notificada no Sinan'},
        {v:'sispce', rot:'SISPCE', frase:'esquistossomose registrada no SISPCE'},
        {v:'surto', rot:'surto de giardíase comunicado à saúde local', frase:'surto de giardíase comunicado à saúde local'}]}
    ]}
  }
});

/* ---------- 7. Tireoide ---------- */
QUADROS.push({
  id: 'tireoide', nome: 'Tireoide', queixa: 'tireoide', grupo: 'A2-Digestivo-Nutricional',
  fonte: 'TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020 · TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021 · TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022 · SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Endocrinologia adulto, 2021',
  ciap: ['T86', 'T85', 'T81'], cid: ['E03', 'E05', 'E04', 'E06'],
  blocos: {
    anamnese: { rot: 'Tireoide — anamnese', itens: [
      {tipo:'tri', id:'tir-hipo', rot:'Frio, cansaço, ganho de peso, prisão de ventre, pele seca, queda de cabelo, memória pior, desânimo ou menstruação irregular', na:'sintomas de hipotireoidismo',
        sim:'refere {d}', simSemDet:'refere sintomas de hipotireoidismo',
        nao:'nega intolerância ao frio, cansaço, ganho de peso, constipação, pele seca, queda de cabelo, piora da memória, desânimo e irregularidade menstrual',
        det:{tipo:'escolha', multi:true, opts:[{v:'frio', rot:'intolerância ao frio'}, {v:'cansaco', rot:'cansaço'}, {v:'peso', rot:'ganho de peso'},
          {v:'constipacao', rot:'constipação'}, {v:'pele', rot:'pele seca'}, {v:'cabelo', rot:'queda de cabelo'}, {v:'memoria', rot:'piora da memória'},
          {v:'desanimo', rot:'desânimo'}, {v:'menstruacao', rot:'irregularidade menstrual'}]}},
      {tipo:'tri', id:'tir-hiper', rot:'Calor e suor, palpitação, perda de peso com fome, tremor, ansiedade, insônia ou queda de cabelo', na:'sintomas de hipertireoidismo', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas de hipertireoidismo',
        nao:'nega intolerância ao calor, sudorese, palpitação, perda de peso com fome, tremor, ansiedade, insônia e queda de cabelo',
        det:{tipo:'escolha', multi:true, opts:[{v:'calor', rot:'intolerância ao calor e sudorese'}, {v:'palpitacao', rot:'palpitação'}, {v:'peso', rot:'perda de peso com fome'},
          {v:'tremor', rot:'tremor'}, {v:'ansiedade', rot:'ansiedade'}, {v:'insonia', rot:'insônia'}, {v:'cabelo', rot:'queda de cabelo'}]}},
      {tipo:'tri', id:'tir-nodulo', rot:'Caroço no pescoço, rouquidão, dificuldade para engolir ou falta de ar deitado', na:'sintomas compressivos ou nódulo', junto:true,
        sim:'refere {d}', simSemDet:'refere caroço ou sintomas compressivos no pescoço',
        nao:'nega caroço no pescoço, rouquidão, dificuldade para engolir e falta de ar deitado',
        det:{tipo:'escolha', multi:true, opts:[{v:'caroco', rot:'caroço no pescoço'}, {v:'rouquidao', rot:'rouquidão'}, {v:'disfagia', rot:'dificuldade para engolir'}, {v:'dispneia', rot:'falta de ar deitado'}]}},
      {tipo:'tri', id:'tir-visao', rot:'Visão dupla, visão pior ou dor atrás do olho (oftalmopatia moderada a grave)', na:'sintomas oculares', junto:true,
  sim:'refere {d}', simSemDet:'refere sintomas oculares', nao:'nega visão dupla, piora da visão e dor retro-ocular',
  det:{tipo:'escolha', multi:true, opts:[{v:'diplopia', rot:'visão dupla', frase:'diplopia'}, {v:'baixa', rot:'visão pior', frase:'baixa da visão'}, {v:'dor', rot:'dor atrás do olho', frase:'dor retro-ocular'}]}},
      {tipo:'tri', id:'tir-dor', rot:'Dor na frente do pescoço depois de uma virose', na:'dor cervical anterior', junto:true,
        sim:'refere dor na região anterior do pescoço depois de virose', nao:'nega dor na região anterior do pescoço depois de virose'},
      {tipo:'tri', id:'tir-radiacao', rot:'Radiação no pescoço ou câncer de tireoide em parente de 1º grau', na:'radiação no pescoço ou câncer de tireoide na família',
        sim:'refere radiação no pescoço ou câncer de tireoide em parente de 1º grau[: {d}]', nao:'nega radiação no pescoço e câncer de tireoide em parente de 1º grau', det:{tipo:'texto', ph:'o quê, quem'}},
      {tipo:'tri', id:'tir-drogas', rot:'Amiodarona, lítio, interferon, levotiroxina, biotina ou fórmula para emagrecer', na:'medicamento que interfere na tireoide',
        sim:'uso de {d}', simSemDet:'uso de medicamento que interfere na tireoide',
        nao:'nega uso de amiodarona, lítio, interferon, levotiroxina, biotina e fórmula para emagrecer',
        det:{tipo:'escolha', multi:true, opts:[{v:'amiodarona', rot:'amiodarona'}, {v:'litio', rot:'lítio'}, {v:'interferon', rot:'interferon'},
          {v:'levotiroxina', rot:'levotiroxina'}, {v:'biotina', rot:'biotina'}, {v:'formula', rot:'fórmula para emagrecer'}]}},
      {tipo:'tri', id:'tir-levo', rot:'Em levotiroxina: toma fora do jejum ou junto com ferro, cálcio, omeprazol ou antiácido', na:'tomada da levotiroxina', lacuna:false, junto:true,
        sim:'toma a levotiroxina fora do jejum ou junto com ferro, cálcio, omeprazol ou antiácido',
        nao:'toma a levotiroxina em jejum, 30 minutos antes do café, longe de ferro, cálcio, omeprazol e antiácido'},
      {tipo:'tri', id:'tir-gestacao', rot:'Gestante ou planeja engravidar', na:'gestação ou planejamento de gravidez', lacuna:false,
        sim:'gestante ou planeja engravidar[: {d}]', nao:'não está grávida nem planeja engravidar', det:{tipo:'texto', ph:'idade gestacional ou planos'}}
    ]},
    ef: { rot: 'Tireoide — exame', itens: [
      {tipo:'escolha', id:'tir-palpa', rot:'Palpação da tireoide: bócio difuso, nódulo único ou vários, sopro (Graves)', na:'palpação da tireoide', multi:true, opts:[
        {v:'ok', rot:'sem alterações', frase:'tireoide sem alterações à palpação', so:true},
        {v:'bocio', rot:'bócio difuso', frase:'bócio difuso'},
        {v:'unico', rot:'nódulo único', frase:'nódulo único'},
        {v:'varios', rot:'vários nódulos', frase:'vários nódulos'},
        {v:'sopro', rot:'sopro', frase:'sopro sobre a tireoide'}]},
      {tipo:'tri', id:'tir-ritmo', rot:'Ritmo cardíaco irregular (fibrilação atrial)', na:'ritmo cardíaco', junto:true,
        sim:'ritmo cardíaco irregular', nao:'ritmo cardíaco regular'},
      {tipo:'tri', id:'tir-olhos', rot:'Olhos: proptose, retração palpebral ou edema', na:'olhos', junto:true,
        sim:'olhos com {d}', simSemDet:'olhos alterados', nao:'olhos sem proptose, retração palpebral ou edema',
        det:{tipo:'escolha', multi:true, opts:[{v:'proptose', rot:'proptose'}, {v:'retracao', rot:'retração palpebral'}, {v:'edema', rot:'edema'}]}},
      {tipo:'tri', id:'tir-hiper-ex', rot:'Tremor, pele quente e úmida ou fraqueza muscular', na:'sinais de hipertireoidismo ao exame', junto:true,
        sim:'{d}', simSemDet:'sinais de hipertireoidismo ao exame', nao:'sem tremor, pele quente e úmida ou fraqueza muscular',
        det:{tipo:'escolha', multi:true, opts:[{v:'tremor', rot:'tremor'}, {v:'pele', rot:'pele quente e úmida'}, {v:'fraqueza', rot:'fraqueza muscular'}]}},
      {tipo:'tri', id:'tir-hipo-ex', rot:'Pele seca, fala e movimentos lentos ou madarose', na:'sinais de hipotireoidismo ao exame', junto:true,
        sim:'{d}', simSemDet:'sinais de hipotireoidismo ao exame', nao:'sem pele seca, fala e movimentos lentos e madarose',
        det:{tipo:'escolha', multi:true, opts:[{v:'pele', rot:'pele seca'}, {v:'fala', rot:'fala e movimentos lentos'}, {v:'madarose', rot:'madarose'}]}},
      {tipo:'tri', id:'tir-linfonodos', rot:'Linfonodos cervicais', na:'linfonodos cervicais', junto:true,
        sim:'linfonodos cervicais palpáveis[: {d}]', nao:'sem linfonodos cervicais palpáveis', det:{tipo:'texto', ph:'onde, tamanho'}}
    ]},
    conduta: { rot: 'Tireoide — conduta', itens: [
      {tipo:'escolha', id:'tir-exames', rot:'Exames da função tireoidiana (TSH só com suspeita clínica: não rastreia assintomático)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'tsh', rot:'TSH (suspeita de hipo ou hipertireoidismo)', frase:'TSH'},
        {v:'t4l', rot:'T4 livre (TSH alterado)', frase:'T4 livre'},
        {v:'t3', rot:'T3 total (suspeita de hipertireoidismo, TSH baixo)', frase:'T3 total'},
        {v:'antitpo', rot:'anti-TPO (só no diagnóstico, nunca no seguimento)', frase:'anti-TPO'},
        {v:'repetir', rot:'subclínico: repetir TSH e T4 livre em 1 a 3 meses antes de fechar', frase:'repetição de TSH e T4 livre em 1 a 3 meses'}]},
      {tipo:'escolha', id:'tir-nodulo-ex', rot:'Nódulo e ecografia (de rotina não se pede no hipo nem no hiper)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'eco', rot:'ecografia de tireoide: só com alteração na palpação', frase:'ecografia de tireoide'},
        {v:'paaf', rot:'PAAF pelo TI-RADS: TR3 a partir de 25 mm, TR4 a partir de 15 mm, TR5 a partir de 10 mm (TR1 e TR2 não puncionam)', frase:'PAAF de tireoide, pelo TI-RADS'},
        {v:'controle', rot:'sem indicação de PAAF: ecografia de controle (TR5 de 0,5 cm ou mais, anual por até 5 anos; TR4 de 1 cm ou mais, em 1, 2, 3 e 5 anos; TR3 de 1,5 cm ou mais, em 1, 3 e 5 anos)', frase:'ecografia de tireoide de controle pelo TI-RADS'}]},
      {tipo:'escolha', id:'tir-seguimento', rot:'Seguimento', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'tsh-dose', rot:'hipotireoidismo: TSH 6 a 8 semanas depois de iniciar ou mudar a dose, até normalizar (sem T4 livre, T3 nem ecografia no seguimento)', frase:'TSH 6 a 8 semanas depois de iniciar ou mudar a dose, até normalizar'},
        {v:'tsh-6m', rot:'depois de normalizar: TSH de 6 em 6 meses no 1º ano e então anual', frase:'TSH de 6 em 6 meses no 1º ano e depois anual'},
        {v:'subclinico', rot:'subclínico sem tratar: TSH a cada 6 a 12 meses', frase:'TSH a cada 6 a 12 meses (subclínico sem tratamento)'},
        {v:'gestante', rot:'gestante com hipotireoidismo: TSH mensal até a metade da gestação (alvo na metade inferior da referência do trimestre ou abaixo de 2,5)', frase:'TSH mensal até a metade da gestação'},
        {v:'hiper', rot:'hipertireoidismo em tratamento: T4 livre e T3 a cada 4 a 6 semanas até estabilizar (o TSH fica suprimido por 6 a 12 meses)', frase:'T4 livre e T3 a cada 4 a 6 semanas até estabilizar'},
        {v:'amiodarona', rot:'amiodarona: função tireoidiana antes, a cada 4 meses e 1 ano depois de parar; lítio: a cada 6 a 12 meses', frase:'função tireoidiana de acompanhamento do medicamento (amiodarona a cada 4 meses; lítio a cada 6 a 12 meses)'}]},
      {tipo:'escolha', id:'tir-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'levotiroxina', rot:'levotiroxina em jejum, 30 minutos antes do café, longe de ferro, cálcio, omeprazol e antiácido', frase:'tomada da levotiroxina em jejum, 30 minutos antes do café, longe de ferro, cálcio, omeprazol e antiácido'},
        {v:'retorno', rot:'antecipar o retorno com palpitação, agitação ou perda de peso (dose demais) ou com a volta dos sintomas (dose de menos)', frase:'retorno antecipado se houver palpitação, agitação ou perda de peso (dose demais) ou se os sintomas voltarem (dose de menos)'}]},
      {tipo:'escolha', id:'tir-encaminha', rot:'Encaminhamento (hipotireoidismo primário se trata e acompanha na APS)', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'hiper', rot:'endocrinologia: hipertireoidismo franco ou subclínico (já iniciando antitireoidiano e betabloqueador quando indicado)', frase:'endocrinologia, por hipertireoidismo'},
        {v:'nodulo', rot:'endocrinologia: nódulo com TSH suprimido, indicação de PAAF ou sinais de malignidade; bócio multinodular com compressão, crescimento ou desconforto estético', frase:'endocrinologia, por nódulo ou bócio multinodular'},
  {v:'oftalmo', rot:'oftalmologia: oftalmopatia moderada a grave (diplopia, baixa da visão, dor retro-ocular)', frase:'oftalmologia, por oftalmopatia'},
  {v:'prenatal-ar', rot:'pré-natal de alto risco: gestante com hipertireoidismo franco, ou subclínico com TRAb positivo', frase:'pré-natal de alto risco, por hipertireoidismo na gestação'},
  {v:'central', rot:'endocrinologia: TSH normal ou baixo com T4 livre baixo (hipotireoidismo central)', frase:'endocrinologia, por suspeita de hipotireoidismo central'}]}
    ]}
  }
});

/* ---------- 8. Dengue e outras arboviroses ---------- */
QUADROS.push({
  id: 'arboviroses', nome: 'Dengue / arboviroses', queixa: 'arboviroses', grupo: 'A2-Demanda-Comum',
  fonte: 'MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024 · MS — Chikungunya: manejo clínico, 2ª ed., 2024 · MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024',
  ciap: ['A77', 'A03'], cid: ['A90', 'A91', 'A92'],
  blocos: {
    anamnese: { rot: 'Dengue / arboviroses — anamnese', itens: [
      {tipo:'tri', id:'arb-alarme', rot:'Dor de barriga forte e contínua, vômito que não para, tontura ou desmaio ao levantar, sangramento de gengiva ou nariz, muita sonolência ou irritação', na:'sintomas de alarme',
        sim:'refere {d}', simSemDet:'refere sintomas de alarme de dengue',
        nao:'nega dor abdominal forte e contínua, vômitos persistentes, tontura ou desmaio ao levantar, sangramento de gengiva ou nariz, sonolência e irritação',
        det:{tipo:'escolha', multi:true, opts:[{v:'dor', rot:'dor abdominal forte e contínua'}, {v:'vomitos', rot:'vômitos persistentes'},
          {v:'tontura', rot:'tontura ou desmaio ao levantar'}, {v:'sangramento', rot:'sangramento de gengiva ou nariz'}, {v:'sonolencia', rot:'sonolência ou irritação'}]}},
      {tipo:'tri', id:'arb-gi', rot:'Náusea, vômito ou diarreia', na:'sintomas digestivos', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas digestivos', nao:'nega náusea, vômito e diarreia',
        det:{tipo:'escolha', multi:true, opts:[{v:'nausea', rot:'náusea'}, {v:'vomito', rot:'vômito'}, {v:'diarreia', rot:'diarreia'}]}},
      {tipo:'tri', id:'arb-ingere', rot:'Dificuldade para beber ou comer', na:'ingestão de líquidos e alimentos', junto:true,
        sim:'refere dificuldade para beber ou comer', nao:'nega dificuldade para beber ou comer'},
      {tipo:'tri', id:'arb-zika', rot:'Coceira forte, olho vermelho sem secreção, febre baixa ou ausente (Zika)', na:'sintomas de Zika', junto:true,
  sim:'refere {d}', simSemDet:'refere sintomas sugestivos de Zika', nao:'nega coceira forte e olho vermelho sem secreção',
  det:{tipo:'escolha', multi:true, opts:[{v:'prurido', rot:'coceira forte'}, {v:'olho', rot:'olho vermelho sem secreção'},
    {v:'febre-baixa', rot:'febre baixa', frase:'febre baixa'}, {v:'afebril', rot:'sem febre', frase:'ausência de febre'}]}},
      {tipo:'tri', id:'arb-juntas', rot:'Dor nas juntas: quais, inchaço, rigidez de manhã', na:'dor articular', junto:true,
        sim:'refere dor articular[: {d}]', nao:'nega dor articular', det:{tipo:'texto', ph:'quais, inchaço, rigidez de manhã'}},
      {tipo:'tri', id:'arb-funcao', rot:'Dificuldade para andar, pentear o cabelo ou pegar objetos', na:'função articular', lacuna:false, junto:true,
        sim:'refere dificuldade para andar, pentear o cabelo ou pegar objetos', nao:'nega dificuldade para andar, pentear o cabelo e pegar objetos'},
      {tipo:'tri', id:'arb-especial', rot:'Condição especial ou comorbidade: gestante, menor de 2 anos, maior de 65 anos, hipertensão ou cardiopatia grave, diabetes, DPOC, asma, obesidade, doença hematológica crônica, DRC, doença ácido-péptica, hepatopatia, doença autoimune', na:'condição especial ou comorbidade de risco',
        sim:'condição especial ou comorbidade de risco para dengue[: {d}]', nao:'nega condição especial ou comorbidade de risco para dengue', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'arb-anticoag', rot:'Usa AAS, clopidogrel, varfarina ou outro anticoagulante', na:'antiagregante ou anticoagulante', junto:true,
        sim:'uso de {d}', simSemDet:'uso de antiagregante ou anticoagulante', nao:'nega uso de AAS, clopidogrel, varfarina e anticoagulante', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'arb-aine', rot:'Tomou anti-inflamatório, AAS ou corticoide por conta própria', na:'anti-inflamatório, AAS ou corticoide por conta própria', junto:true,
        sim:'tomou {d} por conta própria', simSemDet:'tomou anti-inflamatório, AAS ou corticoide por conta própria', nao:'nega anti-inflamatório, AAS e corticoide por conta própria', det:{tipo:'texto', ph:'qual, desde quando'}},
      {tipo:'tri', id:'arb-epidemio', rot:'Alguém da casa ou da rua com dengue; viajou nos últimos 14 dias', na:'contato com dengue e viagem',
  sim:'refere {d}', simSemDet:'refere contato com caso de dengue ou viagem nos últimos 14 dias', nao:'nega caso de dengue na casa ou na rua e viagem nos últimos 14 dias',
  det:{tipo:'escolha', multi:true, opts:[{v:'contato', rot:'caso de dengue na casa ou na rua', frase:'caso de dengue na casa ou na rua'}, {v:'viagem', rot:'viagem nos últimos 14 dias', frase:'viagem nos últimos 14 dias'}]}},
      {tipo:'tri', id:'arb-retorno-cond', rot:'Sem condição de voltar amanhã ou sem quem acompanhe (sem condição de retorno é critério de internação)', na:'condição de retorno', junto:true,
  sim:'sem condição de voltar amanhã ou sem acompanhante', nao:'tem condição de voltar amanhã e tem quem acompanhe'},
      {tipo:'texto', id:'arb-dia', rot:'Em que dia começou a febre e se já baixou (os sinais de alarme aparecem quando a febre cede, entre o 3º e o 7º dia)',
        ph:'4º dia, febre baixou ontem', fmt:'febre: {v}'},
      {tipo:'texto', id:'arb-diurese', rot:'Quantas vezes urinou nas últimas 24 horas e a que horas foi a última vez', ph:'3 vezes, última às 8 horas', fmt:'diurese nas últimas 24 horas: {v}'},
      {tipo:'texto', id:'arb-nota-dor', rot:'Nota da dor articular de 0 a 10', curto:true, ph:'7', fmt:'dor articular, nota {v} de 10'}
    ]},
    ef: { rot: 'Dengue / arboviroses — exame', itens: [
      {tipo:'texto', id:'arb-pa-postural', rot:'PA deitado e em pé (hipotensão postural), pressão de pulso (PAS menos PAD) e PAM', na:'PA em pé e pressão de pulso', ph:'110/70 deitado, 100/70 em pé, pressão de pulso 40, PAM 83', fmt:'PA deitado e em pé, pressão de pulso e PAM: {v}'},
      {tipo:'tri', id:'arb-perfusao', rot:'Enchimento capilar lento, extremidades frias ou pulso periférico fraco', na:'perfusão periférica',
        sim:'sinais de má perfusão: {d}', simSemDet:'sinais de má perfusão periférica', nao:'sem enchimento capilar lento, extremidades frias e pulso periférico fraco',
        det:{tipo:'escolha', multi:true, opts:[{v:'enchimento', rot:'enchimento capilar lento'}, {v:'extremidades', rot:'extremidades frias'}, {v:'pulso', rot:'pulso periférico fraco'}]}},
      {tipo:'tri', id:'arb-consciencia', rot:'Alteração do nível de consciência (Glasgow)', na:'nível de consciência', junto:true,
        sim:'alteração do nível de consciência[: {d}]', nao:'nível de consciência preservado', det:{tipo:'texto', ph:'Glasgow'}},
      {tipo:'tri', id:'arb-hidratacao', rot:'Sinais de desidratação', na:'hidratação', junto:true,
        sim:'sinais de desidratação[: {d}]', nao:'sem sinais de desidratação', det:{tipo:'texto', ph:'quais'}},
      {tipo:'tri', id:'arb-pulmao', rot:'Pulmão: derrame pleural, taquipneia ou Kussmaul; no idoso que recebe volume, crepitação (hiper-hidratação)', na:'exame pulmonar',
        sim:'exame pulmonar com {d}', simSemDet:'exame pulmonar alterado', nao:'sem derrame pleural, taquipneia, Kussmaul e crepitação',
        det:{tipo:'escolha', multi:true, opts:[{v:'derrame', rot:'derrame pleural'}, {v:'taquipneia', rot:'taquipneia'}, {v:'kussmaul', rot:'respiração de Kussmaul'}, {v:'crepitacao', rot:'crepitação'}]}},
      {tipo:'tri', id:'arb-abdome', rot:'Abdome: dor à palpação, ascite ou hepatomegalia', na:'abdome', junto:true,
        sim:'abdome com {d}', simSemDet:'abdome alterado à palpação', nao:'abdome sem dor à palpação, ascite e hepatomegalia',
        det:{tipo:'escolha', multi:true, opts:[{v:'dor', rot:'dor à palpação'}, {v:'ascite', rot:'ascite'}, {v:'hepatomegalia', rot:'hepatomegalia'}]}},
      {tipo:'tri', id:'arb-pele', rot:'Pele: exantema, petéquias ou sangramento espontâneo', na:'pele', junto:true,
        sim:'pele com {d}', simSemDet:'pele alterada', nao:'pele sem exantema, petéquias e sangramento espontâneo',
        det:{tipo:'escolha', multi:true, opts:[{v:'exantema', rot:'exantema'}, {v:'petequias', rot:'petéquias'}, {v:'sangramento', rot:'sangramento espontâneo'}]}},
      {tipo:'escolha', id:'arb-articulacoes', rot:'Articulações (chikungunya): edema, derrame, mobilidade, crepitação ou tenossinovite; na fase crônica, atrofia e deformidade', na:'articulações', lacuna:false, multi:true, opts:[
  {v:'ok', rot:'sem alterações', frase:'articulações sem edema, derrame, limitação de mobilidade, crepitação e tenossinovite', so:true},
  {v:'edema', rot:'edema', frase:'edema articular'},
  {v:'derrame', rot:'derrame', frase:'derrame articular'},
  {v:'mobilidade', rot:'limitação de mobilidade', frase:'limitação de mobilidade articular'},
  {v:'crepitacao', rot:'crepitação', frase:'crepitação articular'},
  {v:'tenossinovite', rot:'tenossinovite', frase:'tenossinovite'},
  {v:'atrofia', rot:'atrofia', frase:'atrofia'},
  {v:'deformidade', rot:'deformidade', frase:'deformidade articular'}]},
      {tipo:'escolha', id:'arb-laco', rot:'Prova do laço, se não há sangramento espontâneo (positiva com 20 ou mais petéquias no adulto, 10 ou mais na criança; costuma dar negativa no obeso e no choque)', na:'prova do laço', lacuna:false, opts:[
        {v:'positiva', rot:'positiva', frase:'prova do laço positiva'},
        {v:'negativa', rot:'negativa', frase:'prova do laço negativa'}]}
    ]},
    conduta: { rot: 'Dengue / arboviroses — conduta', itens: [
      {tipo:'escolha', id:'arb-grupo', rot:'Grupo da dengue', na:'grupo da dengue', opts:[
  {v:'a', rot:'A — sem alarme, sem sangramento, sem condição especial nem comorbidade', frase:'dengue grupo A: acompanhamento em casa, com repouso, hidratação oral e cartão de acompanhamento'},
  {v:'b', rot:'B — sangramento de pele ou prova do laço positiva, condição especial, comorbidade ou risco social', frase:'dengue grupo B: hemograma na hora e hidratação oral em observação'},
  {v:'c', rot:'C — sinal de alarme', frase:'dengue grupo C (sinal de alarme): soro fisiológico já na UBS e durante a transferência, com internação'},
  {v:'d', rot:'D — choque, sangramento grave ou disfunção de órgão', frase:'dengue grupo D (choque, sangramento grave ou disfunção de órgão): expansão rápida já na UBS e durante o transporte, com oxigênio'}]},
      {tipo:'tri', id:'arb-internar', rot:'Critério de internação além do grupo: recusa de líquido ou comida, desconforto respiratório, impossibilidade de retorno, doença descompensada (diabetes, hipertensão, insuficiência cardíaca, varfarina, asma em crise, anemia falciforme)', na:'critério de internação', lacuna:false,
  sim:'critério de internação: {d}', simSemDet:'critério de internação presente', nao:'sem critério de internação além do grupo da dengue',
  det:{tipo:'escolha', multi:true, opts:[{v:'recusa', rot:'recusa de líquido ou comida'}, {v:'respiratorio', rot:'desconforto respiratório'},
    {v:'retorno', rot:'impossibilidade de retorno'}, {v:'descompensada', rot:'doença descompensada'}]}},
      {tipo:'escolha', id:'arb-gestante', rot:'Gestante', lacuna:false, opts:[
  {v:'vigilancia', rot:'mesmo estadiamento e volume, vigilância qualquer que seja a gravidade, cuidado com a hiper-hidratação', frase:'gestante com dengue em vigilância, qualquer que seja a gravidade, com cuidado com a hiper-hidratação e decúbito lateral esquerdo a partir de 20 semanas'}]},
      {tipo:'escolha', id:'arb-fase-chik', rot:'Chikungunya: fase', lacuna:false, opts:[
        {v:'aguda', rot:'aguda (até 14 dias)', frase:'chikungunya em fase aguda (até 14 dias)'},
        {v:'pos', rot:'pós-aguda (15 a 90 dias)', frase:'chikungunya em fase pós-aguda (15 a 90 dias)'},
        {v:'cronica', rot:'crônica (mais de 3 meses)', frase:'chikungunya em fase crônica (mais de 3 meses)'}]},
      {tipo:'escolha', id:'arb-chik-conduta', rot:'Chikungunya: conduta', lacuna:false, multi:true, opts:[
        {v:'observacao', rot:'grupo de risco ou manifestação extra-articular sem gravidade: observação até exames e reavaliação', frase:'mantenho em observação até os exames e a reavaliação'},
        {v:'reavalia', rot:'reavaliar a dor em 7 dias', frase:'reavalio a dor em 7 dias'},
        {v:'pos-aguda', rot:'mais de 10 dias de sintoma e dor persistente: tratar como pós-aguda', frase:'trato como pós-aguda, por mais de 10 dias de sintoma e dor persistente'},
        {v:'fisio', rot:'fisioterapia em todas as fases', frase:'indico fisioterapia'}]},
      {tipo:'tri', id:'arb-notifica', rot:'Notificação do caso suspeito de dengue, chikungunya ou Zika (óbito suspeito: imediata, em até 24 horas)', na:'notificação', lacuna:false,
        sim:'notificação do caso suspeito feita', nao:'notificação do caso suspeito pendente'},
      {tipo:'escolha', id:'arb-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'hemograma-b', rot:'grupo B: hemograma colhido na hora, resultado em até 2 horas (no máximo 4), com o paciente em observação e hidratando', frase:'hemograma na hora'},
        {v:'cd', rot:'grupos C e D: hemograma, albumina, transaminases, raio X de tórax e ultrassom de abdome (o exame não atrasa o soro)', frase:'hemograma, albumina, transaminases, raio X de tórax e ultrassom de abdome'},
        {v:'confirma', rot:'confirmação da dengue: NS1 ou RT-PCR até o 5º dia, IgM a partir do 6º (obrigatória para a vigilância, não para a conduta)', frase:'NS1 ou RT-PCR até o 5º dia, ou IgM a partir do 6º dia, para confirmação da dengue'},
        {v:'chik', rot:'chikungunya: RT-PCR até o 5º dia, IgM a partir do 6º', frase:'RT-PCR de chikungunya até o 5º dia, ou IgM a partir do 6º dia'},
        {v:'zika', rot:'suspeita de Zika: testar Zika e dengue (reação cruzada); negativos, chikungunya', frase:'sorologia para Zika e dengue, e para chikungunya se negativas'},
        {v:'plaq-antiag', rot:'em antiagregante: plaquetas diárias', frase:'plaquetas diárias, por uso de antiagregante'},
  {v:'plaq-varf', rot:'em varfarina: plaquetas e TAP', frase:'plaquetas e TAP, por uso de varfarina'},
  {v:'plaq-doac', rot:'em anticoagulante direto: plaquetas', frase:'plaquetas, por uso de anticoagulante direto'},
        {v:'pos-aguda', rot:'chikungunya pós-aguda, antes de anti-inflamatório ou corticoide: hemograma, glicemia de jejum, ureia, creatinina e transaminases', frase:'hemograma, glicemia de jejum, ureia, creatinina e transaminases'}]},
      {tipo:'escolha', id:'arb-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'hidratacao', rot:'hidratação oral desde a sala de espera, grupos A e B: volume por kg do cartão da SRO, um terço como SRO e o resto com água, suco, chá ou água de coco', frase:'hidratação oral, com o volume do dia por kg do cartão da SRO (um terço como SRO e o restante com água, suco, chá ou água de coco), mantida durante toda a febre e por 24 a 48 horas depois que ela cede'},
        {v:'analgesico', rot:'NÃO usar AAS, anti-inflamatório nem corticoide (analgésico e antitérmico vão na prescrição)', frase:'não usar AAS, anti-inflamatório nem corticoide'},
  {v:'alarme', rot:'sinais de alarme (dor de barriga forte e contínua, vômito que não para, tontura ou desmaio ao levantar, sangramento, muita sonolência ou irritação): voltar na hora', frase:'sinais de alarme (dor abdominal forte e contínua, vômitos persistentes, tontura ou desmaio ao levantar, sangramento de gengiva ou nariz, sonolência ou irritação), com retorno imediato'},
  {v:'neuro', rot:'formigamento ou fraqueza nos membros, ou alteração da consciência: retorno imediato; alteração visual: oftalmologia', frase:'retorno imediato se houver formigamento ou fraqueza nos membros ou alteração da consciência, e oftalmologia se houver alteração visual'},
        {v:'retorno', rot:'retorno no dia em que a febre baixar (a piora vem na queda da febre) ou no 5º dia, se não baixar', frase:'retorno no dia em que a febre baixar ou no 5º dia, se ela não baixar'},
        {v:'repelente', rot:'repelente no doente (na viremia ele infecta o mosquito) e eliminação de criadouros', frase:'repelente no doente e eliminação de criadouros'}]}
    ]}
  }
});

/* ---------- 9. Dermatoses comuns ---------- */
QUADROS.push({
  id: 'dermatoses-comuns', nome: 'Dermatoses comuns', queixa: 'dermatoses-comuns', grupo: 'A2-Demanda-Comum',
  fonte: 'TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025 · MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010 · MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012',
  ciap: ['S72', 'S74', 'S84', 'S76', 'S87', 'S88'], cid: ['B86', 'B35', 'B36', 'B37', 'L01', 'A46', 'L20', 'L25'],
  blocos: {
    anamnese: { rot: 'Dermatoses comuns — anamnese', itens: [
      {tipo:'tri', id:'der-prurido', rot:'Coceira que piora à noite', na:'coceira noturna',
        sim:'refere coceira que piora à noite', nao:'nega coceira que piora à noite'},
      {tipo:'tri', id:'der-contatos', rot:'Outras pessoas da casa, da creche ou do abrigo com coceira ou lesão', na:'outras pessoas com coceira ou lesão', junto:true,
        sim:'refere outras pessoas da casa, da creche ou do abrigo com coceira ou lesão[: {d}]', nao:'nega outras pessoas da casa, da creche ou do abrigo com coceira ou lesão', det:{tipo:'texto', ph:'quem'}},
      {tipo:'tri', id:'der-animal', rot:'Cão ou gato com falha no pelo (tinea)', na:'animal com falha no pelo', junto:true,
        sim:'refere cão ou gato com falha no pelo', nao:'nega cão ou gato com falha no pelo'},
      {tipo:'tri', id:'der-infeccao', rot:'Febre, mal-estar, dor e calor na lesão (piodermite, erisipela)', na:'sinais de infecção',
        sim:'refere {d}', simSemDet:'refere sinais de infecção na lesão', nao:'nega febre, mal-estar, dor e calor na lesão',
        det:{tipo:'escolha', multi:true, opts:[{v:'febre', rot:'febre'}, {v:'mal-estar', rot:'mal-estar'}, {v:'dor-calor', rot:'dor e calor na lesão'}]}},
      {tipo:'tri', id:'der-produto', rot:'Contato com produto novo antes de piorar: sabonete, perfume, creme perfumado, amaciante, roupa sintética, luva ou cosmético (dermatite de contato)', na:'produto novo em contato com a pele', junto:true,
        sim:'refere contato com produto novo antes de piorar[: {d}]', nao:'nega contato com produto novo antes de piorar', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'der-umidade', rot:'Calçado fechado, anda descalço em vestiário, trabalha com água ou umidade (tinea pedis, candidíase de unha)', na:'calçado fechado, vestiário e umidade', junto:true,
        sim:'refere calçado fechado, vestiário descalço ou trabalho com água ou umidade[: {d}]', nao:'nega calçado fechado, vestiário descalço e trabalho com água ou umidade', det:{tipo:'texto', ph:'qual'}},
      {tipo:'tri', id:'der-rua', rot:'Mora na rua ou em abrigo (piolho, Pthirus pubis, escabiose; picada que vira abscesso, impetigo ou celulite)', na:'situação de rua ou abrigo', lacuna:false, junto:true,
        sim:'mora na rua ou em abrigo', nao:'não mora na rua nem em abrigo'},
      D_IMUNO,
      GRAVIDEZ,
      D_AMAMENTA,
      {tipo:'tri', id:'der-tratou', rot:'Já usou pomada, creme ou comprimido para isso (inclusive por conta própria, inclusive corticoide)', na:'tratamento prévio da lesão',
        sim:'já usou tratamento para a lesão[: {d}]', nao:'nega tratamento prévio da lesão', det:{tipo:'texto', ph:'qual, por quanto tempo, com que resultado'}},
      {tipo:'texto', id:'der-inicio', rot:'Onde começou, para onde espalhou e há quanto tempo; outros sintomas junto', ph:'começou nas mãos, espalhou para a cintura, há 3 semanas', fmt:'lesão: {v}'}
    ]},
    ef: { rot: 'Dermatoses comuns — exame', itens: [
      {tipo:'escolha', id:'der-pele-inteira', rot:'Pele inteira, com boa luz (dobras, mãos, cintura, genitais; na criança, também face, couro cabeludo e plantas)', na:'exame da pele inteira', opts:[
        {v:'examinada', rot:'examinada', frase:'pele inteira examinada com boa luz'}]},
      {tipo:'escolha', id:'der-escabiose', rot:'Escabiose: sulco (saliência linear de cerca de 1 cm com vesícula na ponta), pápulas escoriadas com crosta, nódulos', na:'escabiose', lacuna:false, multi:true, opts:[
  {v:'sulco', rot:'sulco', frase:'sulco com vesícula na ponta'},
  {v:'papulas', rot:'pápulas escoriadas com crosta', frase:'pápulas escoriadas com crosta'},
  {v:'nodulos', rot:'nódulos', frase:'nódulos'},
  {v:'crostosa', rot:'descamação intensa e generalizada com pouco prurido, em imunossuprimido ou idoso (sarna crostosa)', frase:'descamação intensa e generalizada com pouco prurido, sugestiva de sarna crostosa'}]},
      {tipo:'escolha', id:'der-tinea', rot:'Tinea: placa vermelha descamativa com borda elevada e centro mais claro; examinar pés, virilha e unhas, que costumam vir juntos', na:'tinea', lacuna:false, multi:true, opts:[
        {v:'placa', rot:'placa descamativa com borda elevada', frase:'placa vermelha descamativa com borda elevada e centro mais claro'},
        {v:'pes', rot:'pés acometidos', frase:'pés acometidos'},
        {v:'virilha', rot:'virilha acometida', frase:'virilha acometida'},
        {v:'unhas', rot:'unhas acometidas', frase:'unhas acometidas'}]},
      {tipo:'escolha', id:'der-couro', rot:'Couro cabeludo da criança (tinea capitis)', na:'couro cabeludo', lacuna:false, multi:true, opts:[
        {v:'alopecia', rot:'placa de alopecia com descamação e pontos pretos', frase:'placa de alopecia com descamação e pontos pretos'},
        {v:'querion', rot:'placa inflamada, exsudativa e dolorosa (quérion)', frase:'placa inflamada, exsudativa e dolorosa (quérion)'}]},
      {tipo:'escolha', id:'der-piodermite', rot:'Piodermite (sinais vitais e estado geral): impetigo em face e extremidades; erisipela, em geral na perna', na:'piodermite', lacuna:false, multi:true, opts:[
        {v:'impetigo', rot:'impetigo: crosta cor de mel ou bolha flácida', frase:'crosta cor de mel (melicérica) ou bolha flácida'},
        {v:'erisipela', rot:'erisipela: eritema e edema de limite bem definido, calor, dor, casca de laranja', frase:'eritema e edema de limite bem definido, com calor, dor e pele em casca de laranja'},
        {v:'porta', rot:'porta de entrada (frieira entre os dedos)', frase:'porta de entrada na frieira entre os dedos'}]},
      {tipo:'escolha', id:'der-eczema', rot:'Dermatite atópica: pele seca, eczema, escoriação; procurar crosta e pus (infecção secundária) ou vesículas agrupadas e erosões (herpes)', na:'eczema', lacuna:false, multi:true, opts:[
        {v:'eczema', rot:'pele seca, eczema e escoriação', frase:'pele seca, áreas de eczema e escoriação'},
        {v:'infeccao', rot:'crosta e pus (infecção secundária)', frase:'crosta e pus, sugestivos de infecção secundária'},
        {v:'herpes', rot:'vesículas agrupadas e erosões (herpes)', frase:'vesículas agrupadas e erosões, sugestivas de herpes'}]},
      {tipo:'escolha', id:'der-mancha', rot:'Mancha clara ou avermelhada: testar a sensibilidade (pitiríase versicolor e hanseníase se confundem)', na:'sensibilidade da mancha', lacuna:false, opts:[
        {v:'preservada', rot:'sensibilidade preservada', frase:'sensibilidade preservada na mancha'},
        {v:'alterada', rot:'sensibilidade alterada', frase:'sensibilidade alterada na mancha'}]}
    ]},
    conduta: { rot: 'Dermatoses comuns — conduta', itens: [
      {tipo:'escolha', id:'der-exames', rot:'Exames (dermatoses comuns são diagnóstico clínico)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'micologico', rot:'exame micológico direto: só na dúvida ou na falha do tratamento', frase:'exame micológico direto'},
        {v:'raspado', rot:'escabiose: raspado do sulco ou da pápula à microscopia, se precisar', frase:'raspado do sulco ou da pápula à microscopia'},
        {v:'bacterio', rot:'impetigo: bacterioscopia e cultura, só em alguns casos', frase:'bacterioscopia e cultura da lesão'},
        {v:'ast-alt', rot:'antes do antifúngico oral: AST e ALT (terbinafina ou itraconazol diário por mais de 3 a 4 semanas; fluconazol diário; hepatopatia conhecida)', frase:'AST e ALT antes do antifúngico oral'}]},
      {tipo:'escolha', id:'der-orienta-escabiose', rot:'Escabiose', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
  {v:'contatos', rot:'tratar o paciente e todos os contatos no mesmo dia, mesmo sem coceira', frase:'tratamento do paciente e de todos os contatos no mesmo dia, mesmo sem coceira'},
  {v:'roupas', rot:'roupa de cama, toalhas e roupas lavadas em água quente e passadas a ferro; o que não lava, em saco plástico por uma semana', frase:'roupa de cama, toalhas e roupas lavadas em água quente e passadas a ferro, e o que não pode ser lavado fechado em saco plástico por uma semana'},
  {v:'afastar', rot:'afastar da escola ou do trabalho até 24 horas depois de terminar o tratamento', frase:'afastamento da escola ou do trabalho até 24 horas depois de terminar o tratamento'},
  {v:'coceira', rot:'a coceira e alguns nódulos podem durar semanas depois do escabicida', frase:'que a coceira e alguns nódulos podem durar semanas depois do escabicida e que o escabicida só se repete com novo sinal de infestação'}]},
      {tipo:'escolha', id:'der-orienta-tinea', rot:'Tinea (a tinea capitis não sara com creme nem xampu: o tratamento é sempre oral)', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'capitis', rot:'tinea capitis: examinar quem mora junto, xampu antifúngico para os sem lesão, lavar roupa de cama e travesseiro, veterinário se vários na casa ou recorrência', frase:'na tinea capitis, exame de quem mora junto, xampu antifúngico para os sem lesão, lavagem de roupa de cama e travesseiro e veterinário para o animal se vários na casa ou recorrência'},
        {v:'pedis', rot:'tinea pedis: secar bem os pés, talco, meia de algodão, alternar e arejar o calçado, não andar descalço em vestiário; vesícula ou maceração: compressa de permanganato diluído', frase:'na tinea pedis, secar bem os pés, usar talco e meia de algodão, alternar e arejar o calçado, não andar descalço em vestiário, e compressa de permanganato de potássio diluído se houver vesícula ou maceração'},
        {v:'cruris', rot:'tinea cruris: manter a área seca, cueca de algodão e tratar a tinea pedis junto', frase:'na tinea cruris, manter a área seca, cueca de algodão e tratar a tinea pedis junto'}]},
      {tipo:'escolha', id:'der-orienta-erisipela', rot:'Erisipela', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'repouso', rot:'repouso e perna elevada', frase:'repouso e perna elevada'},
        {v:'prevencao', rot:'depois do quadro agudo: meia compressiva, tratar a maceração entre os dedos e a insuficiência venosa para não repetir', frase:'depois do quadro agudo, meia compressiva e tratamento da maceração entre os dedos e da insuficiência venosa para não repetir'}]},
      {tipo:'escolha', id:'der-orienta-atopica', rot:'Dermatite atópica (conferir a adesão antes de chamar de falha)', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'banho', rot:'banho de 5 a 10 minutos, morno, sabonete suave sem perfume, sem bucha', frase:'banho de 5 a 10 minutos, morno, com sabonete suave sem perfume e sem bucha'},
        {v:'evitar', rot:'evitar perfume, amaciante e roupa sintética em contato com a pele', frase:'evitar perfume, amaciante e roupa sintética em contato com a pele'}]},
      {tipo:'escolha', id:'der-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'atopica', rot:'dermatologia: dermatite atópica grave e extensa, com prejuízo funcional grave, refratária a 1 mês de tratamento otimizado ou com 3 ou mais recidivas em 6 meses; outro eczema grave ou refratário', frase:'dermatologia, por dermatite atópica ou eczema grave ou refratário'},
        {v:'micose', rot:'dermatologia: micose subcutânea; tinea, candidíase ou pitiríase versicolor extensa em imunocomprometido ou refratária; onicomicose refratária com erisipela no mesmo membro, dor ou dúvida diagnóstica', frase:'dermatologia, por micose subcutânea, extensa em imunocomprometido, refratária ou com dúvida diagnóstica'},
        {v:'alergia', rot:'imunologia ou gastroenterologia pediátrica: suspeita de alergia alimentar (piora minutos ou horas depois de um alimento, ou quadro extenso refratário com vômito, diarreia ou atraso de crescimento)', frase:'imunologia ou gastroenterologia pediátrica, por suspeita de alergia alimentar'}]},
      {tipo:'escolha', id:'der-urgencia', rot:'Urgência: via aérea, dispneia, choque, angioedema ou púrpura com febre; eczema herpético; erisipela com estado geral comprometido ou comorbidade grave; infecção bacteriana grave sem resposta ao antibiótico oral', lacuna:false, multi:true, opts:[
  {v:'emergencia', rot:'encaminhado à emergência', frase:'encaminho à emergência'},
  {v:'hospital', rot:'avaliação hospitalar', frase:'encaminho para avaliação hospitalar'}]}
    ]}
  }
});

/* ---------- 10. ITU e cistite ---------- */
QUADROS.push({
  id: 'itu-cistite', nome: 'ITU / cistite', queixa: 'itu-cistite', grupo: 'A2-Demanda-Comum',
  fonte: 'MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Manual de Gestação de Alto Risco, 2022 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Urologia adulto, 2023 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023',
  ciap: ['U71', 'U70', 'U01', 'U02'], cid: ['N30', 'N39', 'N10', 'R30'],
  blocos: {
    anamnese: { rot: 'ITU / cistite — anamnese', itens: [
      {tipo:'tri', id:'itu-disuria', rot:'Ardência ao urinar', na:'disúria',
        sim:'refere disúria', nao:'nega disúria'},
      {tipo:'tri', id:'itu-polaciuria', rot:'Urinar muitas vezes', na:'polaciúria', junto:true,
        sim:'refere polaciúria', nao:'nega polaciúria'},
      {tipo:'tri', id:'itu-outros', rot:'Urgência, dor acima do púbis ou sangue na urina', na:'urgência, dor suprapúbica e hematúria', junto:true,
        sim:'refere {d}', simSemDet:'refere urgência, dor suprapúbica ou hematúria', nao:'nega urgência miccional, dor suprapúbica e hematúria',
        det:{tipo:'escolha', multi:true, opts:[{v:'urgencia', rot:'urgência miccional'}, {v:'dor', rot:'dor suprapúbica'}, {v:'hematuria', rot:'hematúria'}]}},
      {tipo:'tri', id:'itu-abrupto', rot:'Começou de repente (na cistite é abrupto; na uretrite é leve e gradual)', na:'início abrupto', junto:true,
  sim:'início abrupto', nao:'início gradual'},
      {tipo:'tri', id:'itu-corrimento', rot:'Corrimento vaginal ou uretral, irritação vaginal, lesão genital ou exposição sexual de risco (disúria e polaciúria SEM corrimento passam de 90% de chance de ITU)', na:'corrimento, lesão genital e exposição sexual de risco', junto:true,
  sim:'refere {d}', simSemDet:'refere corrimento, irritação ou lesão genital, ou exposição sexual de risco',
  nao:'nega corrimento, irritação vaginal, lesão genital e exposição sexual de risco',
  det:{tipo:'escolha', multi:true, opts:[{v:'vaginal', rot:'corrimento vaginal'}, {v:'uretral', rot:'corrimento uretral'}, {v:'irritacao', rot:'irritação vaginal'},
    {v:'lesao', rot:'lesão genital'}, {v:'exposicao', rot:'exposição sexual de risco'}]}},
      {tipo:'tri', id:'itu-sistemicos', rot:'Febre, calafrio, dor lombar ou no flanco, náusea ou vômito', na:'sintomas sistêmicos',
        sim:'refere {d}', simSemDet:'refere sintomas sistêmicos', nao:'nega febre, calafrio, dor lombar ou no flanco, náusea e vômito',
        det:{tipo:'escolha', multi:true, opts:[{v:'febre', rot:'febre'}, {v:'calafrio', rot:'calafrio'}, {v:'lombar', rot:'dor lombar ou no flanco'},
          {v:'nausea', rot:'náusea'}, {v:'vomito', rot:'vômito'}]}},
      GRAVIDEZ,
      {tipo:'tri', id:'itu-trat-previo', rot:'Já tratou este episódio ou teve falha; usou antibiótico nos últimos meses', na:'tratamento prévio e antibiótico recente',
        sim:'refere tratamento prévio deste episódio ou antibiótico nos últimos meses[: {d}]', nao:'nega tratamento prévio deste episódio e antibiótico nos últimos meses', det:{tipo:'texto', ph:'qual, quando, falha?'}},
      {tipo:'tri', id:'itu-sexual', rot:'Relação com a atividade sexual, parceria nova ou uso de espermicida', na:'atividade sexual, parceria nova e espermicida',
  sim:'refere {d}', simSemDet:'refere relação com atividade sexual, parceria nova ou espermicida', nao:'nega início ligado à atividade sexual, parceria nova e uso de espermicida',
  det:{tipo:'escolha', multi:true, opts:[{v:'relacao', rot:'início depois de relação sexual', frase:'início depois de relação sexual'},
    {v:'parceria', rot:'parceria nova'}, {v:'espermicida', rot:'uso de espermicida'}]}},
      {tipo:'tri', id:'itu-complicada', rot:'Imunossupressão, sonda vesical, cálculo renal, ITU na infância, alteração anatômica ou neurológica do trato urinário', na:'fator de ITU complicada', junto:true,
  sim:'refere {d}', simSemDet:'refere fator de ITU complicada', nao:'nega imunossupressão, sonda vesical, cálculo renal, ITU na infância e alteração anatômica ou neurológica do trato urinário',
  det:{tipo:'escolha', multi:true, opts:[{v:'imuno', rot:'imunossupressão'}, {v:'sonda', rot:'sonda vesical'}, {v:'calculo', rot:'cálculo renal'}, {v:'infancia', rot:'ITU na infância'},
    {v:'anatomica', rot:'alteração anatômica ou neurológica do trato urinário'}]}},
      {tipo:'tri', id:'itu-homem', rot:'Homem: jato fraco, esforço ou esvaziamento incompleto; manipulação ou trauma recente do trato urinário', na:'sintomas obstrutivos e manipulação', lacuna:false,
        sim:'refere {d}', simSemDet:'refere sintomas obstrutivos ou manipulação do trato urinário', nao:'nega jato fraco, esforço, esvaziamento incompleto e manipulação ou trauma recente do trato urinário',
        det:{tipo:'escolha', multi:true, opts:[{v:'jato', rot:'jato fraco'}, {v:'esforco', rot:'esforço para urinar'}, {v:'incompleto', rot:'esvaziamento incompleto'},
          {v:'manipulacao', rot:'manipulação ou trauma recente do trato urinário'}]}},
      {tipo:'tri', id:'itu-menopausa', rot:'Pós-menopausa: secura vaginal, perda de urina ou bola na vagina (prolapso)', na:'sintomas da pós-menopausa', lacuna:false, junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas da pós-menopausa', nao:'nega secura vaginal, perda de urina e sensação de bola na vagina',
        det:{tipo:'escolha', multi:true, opts:[{v:'secura', rot:'secura vaginal'}, {v:'perda', rot:'perda de urina'}, {v:'prolapso', rot:'sensação de bola na vagina'}]}},
      {tipo:'texto', id:'itu-recorrencia', rot:'ITU nos últimos 6 e 12 meses (2 em 6 meses ou 3 em 1 ano é ITU de repetição)', ph:'2 em 6 meses, 3 em 12 meses', fmt:'ITU anteriores: {v}'},
      {tipo:'texto', id:'itu-uroc-previa', rot:'Urocultura anterior (germe e sensibilidade orientam a escolha na ITU de repetição)', ph:'E. coli, sensível a nitrofurantoína', fmt:'urocultura anterior: {v}'}
    ]},
    ef: { rot: 'ITU / cistite — exame', itens: [
      {tipo:'tri', id:'itu-suprapubica', rot:'Dor à palpação suprapúbica', na:'dor suprapúbica à palpação',
        sim:'dor à palpação suprapúbica', nao:'sem dor à palpação suprapúbica'},
      {tipo:'tri', id:'itu-giordano', rot:'Sinal de Giordano (punho-percussão lombar)', na:'sinal de Giordano', junto:true,
        sim:'sinal de Giordano positivo[ {d}]', nao:'sinal de Giordano negativo', det:{tipo:'texto', ph:'lado'}},
      {tipo:'escolha', id:'itu-genitalia', rot:'Genitália: inspeção externa; na mulher com corrimento, exame especular', na:'genitália', lacuna:false, multi:true, opts:[
        {v:'ok', rot:'sem alterações', frase:'inspeção da genitália externa sem alterações', so:true},
        {v:'alterada', rot:'alteração na genitália externa', frase:'alteração na genitália externa'},
        {v:'corrimento', rot:'corrimento ao exame especular', frase:'corrimento ao exame especular'}]},
      {tipo:'escolha', id:'itu-toque', rot:'Homem com febre ou dor perineal: toque retal', na:'toque retal', lacuna:false, opts:[
        {v:'ok', rot:'sem alterações', frase:'toque retal sem alterações'},
        {v:'prostatite', rot:'próstata quente, dolorosa e firme (prostatite aguda)', frase:'próstata quente, dolorosa e de consistência firme ao toque retal, sugestiva de prostatite aguda'}]}
    ]},
    conduta: { rot: 'ITU / cistite — conduta', itens: [
      {tipo:'escolha', id:'itu-classe', rot:'Classificação e destino', na:'classificação da ITU', opts:[
  {v:'tipica', rot:'cistite típica, mulher não gestante, sem sinal sistêmico: tratar na consulta, sem exame', frase:'cistite típica em mulher não gestante, sem sinal sistêmico: diagnóstico clínico e tratamento na consulta, sem exame'},
  {v:'complicada', rot:'ITU complicada ou com sintoma sistêmico: avaliação médica (em casa, urocultura, antibiótico empírico e reavaliação em 24 horas)', frase:'ITU complicada ou com sintoma sistêmico: avaliação médica, urocultura, antibiótico empírico e reavaliação em 24 horas'},
  {v:'pielo', rot:'pielonefrite leve, bom estado geral, sem comorbidade: urina tipo I e urocultura antes, antibiótico oral, reavaliação em 48 horas', frase:'pielonefrite leve com bom estado geral e sem comorbidade: urina tipo I e urocultura antes, antibiótico oral e reavaliação em 48 horas'},
  {v:'hospital', rot:'sinal de sepse ou sem melhora: hospital', frase:'encaminho para avaliação hospitalar, para antibiótico venoso'}]},
      {tipo:'escolha', id:'itu-exames', rot:'Exames (cistite típica na mulher não gestante não pede exame: a fita reagente pouco acrescenta e, negativa, não exclui)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'uroc', rot:'urocultura com antibiograma ANTES do antibiótico: gestante, suspeita de pielonefrite, ITU de repetição, quadro atípico, falha em 48 horas ou recidiva em até 4 semanas', frase:'urocultura com antibiograma antes do antibiótico'},
        {v:'tipo1', rot:'urina tipo I e urocultura: homem, idoso, diabético, imunodeprimido e sonda vesical prolongada', frase:'urina tipo I e urocultura'},
        {v:'gestante', rot:'gestante: urocultura no início do pré-natal e no começo do 3º trimestre', frase:'urocultura no início do pré-natal e no começo do 3º trimestre'},
        {v:'controle', rot:'gestante: urocultura de controle 1 a 2 semanas depois de tratar', frase:'urocultura de controle 1 a 2 semanas depois do tratamento'},
        {v:'imagem', rot:'homem com pielonefrite: imagem do trato urinário', frase:'imagem do trato urinário'}]},
      {tipo:'escolha', id:'itu-gestante', rot:'Gestante com bacteriúria ou cistite (a bacteriúria assintomática se trata sempre)', lacuna:false, multi:true, opts:[
  {v:'tratar', rot:'urocultura antes, tratar já, ajustar pelo antibiograma, repetir a urocultura 2 semanas depois', frase:'gestante: urocultura antes do antibiótico, ajuste pelo antibiograma e urocultura de controle 2 semanas depois'},
  {v:'profilaxia', rot:'repetiu o episódio ou voltou da internação por pielonefrite: profilaxia até o parto', frase:'profilaxia até o parto, por repetição do episódio ou internação prévia por pielonefrite'}]},
      {tipo:'escolha', id:'itu-retorno', rot:'Retorno e sinais de piora', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'48-72', rot:'retorno se não melhorar em 48 a 72 horas ou se a ITU voltar em poucas semanas (reclassificar como complicada, repetir urocultura, outra classe)', frase:'retorno se não melhorar em 48 a 72 horas ou se a ITU voltar em poucas semanas'},
        {v:'piora', rot:'sinais de piora (pielonefrite leve)', frase:'sinais de piora, com reavaliação em 48 horas'}]},
      {tipo:'escolha', id:'itu-prevencao', rot:'ITU de repetição: medidas e manejo otimizado', lacuna:false, multi:true, tpl:'oriento {d}', opts:[
        {v:'comportamento', rot:'limpar de frente para trás, beber líquido à vontade, não segurar a urina, urinar depois da relação, evitar ducha vaginal e roupa íntima oclusiva', frase:'limpar de frente para trás, beber líquido à vontade, não segurar a urina, urinar depois da relação, evitar ducha vaginal e roupa íntima oclusiva'},
        {v:'espermicida', rot:'parar o espermicida', frase:'suspensão do espermicida'},
        {v:'constipacao', rot:'tratar a constipação, o resíduo urinário e, na pós-menopausa, a atrofia vaginal (estrogênio vaginal)', frase:'tratamento da constipação, do resíduo urinário e, na pós-menopausa, da atrofia vaginal'}]},
      {tipo:'escolha', id:'itu-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho para {d}', opts:[
        {v:'maternidade', rot:'maternidade, no mesmo dia: gestante com pielonefrite (não é tratamento de UBS)', frase:'maternidade (no mesmo dia)'},
        {v:'nefro', rot:'nefrologia: ITU de repetição mesmo com 6 meses de profilaxia e manejo otimizado, excluída causa anatômica urológica ou ginecológica', frase:'nefrologia'},
        {v:'uro', rot:'urologia: alteração anatômica ou neurológica do trato urinário que causa ITU de repetição', frase:'urologia'},
        {v:'gineco', rot:'ginecologia: alteração anatômica ginecológica (cistocele, prolapso)', frase:'ginecologia'}]}
    ]}
  }
});

/* quadros-e.js — autor C (neuromusculoesquelética), APS II, 28/10/2026
 * Quadros: cefaleia, dor-cronica, gota, lombalgia, neuropatia, ombro-joelho, tontura.
 * Cada item sai de um item da queixa do copiloto indicada em `queixa` (perguntas → anamnese; exame → ef;
 * conduta e exames → conduta). Prescrição não é item: vem da ficha base, com os chips do formulário da queixa.
 *
 * Convenções (as mesmas do quadros-a.js e do quadros-b.js):
 * - Conduta em 1ª pessoa (oriento, solicito, encaminho). `lacuna: false` em dois casos: (a) pergunta ou achado que só vale
 *   para um subgrupo (lombar × cervical, joelho × ombro, acima de 50 anos, quem usa alopurinol, vertigem aguda contínua);
 *   (b) ação opcional da conduta, em que intocado quer dizer "não feito", não "não avaliado".
 * - No exame físico, achado que não se procura em toda consulta é `escolha` ou texto, não ✗/✓: o atalho "Sem
 *   alterações nos achados dos quadros" marca ✗ em todo tri visível e escreveria "sem alteração" num exame não feito.
 * - Campo de medida ou de escore digitado (Schober, DN4, índice de dor generalizada, escore neuropático) não tem
 *   `na`: fica fora do texto quando vazio. A página não calcula escore nenhum.
 * - Sem dose. Valor de exame (meta de ácido úrico) só em `rot` e em `frase`, sempre com a unidade mg/dL.
 * - Prefixos de id: ce- cefaleia, df- dor crônica, go- gota, lc- lombalgia, np- neuropatia, oj- ombro e joelho, tv- tontura.
 *   Pergunta que vale para mais de um quadro leva o prefixo do primeiro (df-const, lc-trabalho, np-tinel…).
 * - `hd-pe-mono`, `hd-pe-vibra` e `hd-pe-risco` são cópia literal dos itens do quadro HAS / DM (quadros-b.js): o
 *   paciente diabético com neuropatia vê cada pergunta uma vez só, e o dados.mjs falha se as cópias divergirem.
 * - Achado do exame que só se procura num subgrupo (mielopatia na cervicalgia) é `escolha`, não `tri`: o atalho
 *   "Sem alterações nos achados dos quadros" marca ✗ em todo `tri` do exame, e `lacuna:false` não protege.
 * - Revisado em 28/10/2026 (relatorios/revisao-quadros-e.md): C1, I1 a I13 e M1 a M9, M13 e M14 aplicados
 *   (M10, M11, M15 e M17 sem código no relatório; M12 e M16 opcionais). */

/* ---------- perguntas compartilhadas (mesmo id, mesmo objeto) ---------- */

/* anamnese — dor crônica, lombalgia, ombro e joelho. Começa frase nova: é o bloco dos sinais de alarme. */
const E_CONSTITUCIONAL = { tipo:'tri', id:'df-const', rot:'Febre ou perda de peso sem querer', na:'febre e perda de peso',
  sim:'refere febre ou perda de peso não intencional[: {d}]', nao:'nega febre e perda de peso não intencional', det:{tipo:'texto', ph:'quanto, em quanto tempo'} };
/* anamnese — dor crônica, lombalgia, ombro e joelho */
const E_TRATOU = { tipo:'texto', id:'df-tratou', rot:'O que já usou ou tentou para a dor (remédio, fisioterapia, exercício): dose, tempo e resposta', na:'tratamentos já feitos',
  ph:'dipirona nas crises, sem alívio; fisioterapia por 2 meses, melhorou pouco', fmt:'já usou ou tentou para a dor: {v}' };
/* anamnese — lombalgia, ombro e joelho */
const E_TRABALHO = { tipo:'tri', id:'lc-trabalho', rot:'Dor ligada ao trabalho (carga, movimento repetitivo, postura)', na:'relação da dor com o trabalho',
  sim:'dor relacionada ao trabalho[: {d}]', nao:'nega relação da dor com o trabalho',
  det:{tipo:'texto', ph:'que trabalho; carga, movimento repetitivo ou postura; há quantos meses'} };
/* ef — dor crônica, neuropatia */
const E_DN4 = { tipo:'texto', id:'df-dn4', rot:'DN4 ou LANSS, para separar dor neuropática de nociceptiva (pontuação)', curto:true, ph:'DN4 6 de 10',
  fmt:'escore de dor neuropática: {v}' };
/* ef — neuropatia, tontura */
const E_ORTOSTATICA = { tipo:'tri', id:'np-ortostatica', rot:'PA e pulso deitado e em pé (queda da sistólica de 20 mmHg ou mais, ou pulso subindo 10 bpm)', na:'PA e pulso deitado e em pé', junto:true,
  sim:'hipotensão ortostática ou aumento do pulso ao ortostatismo[: {d}]', nao:'sem hipotensão ortostática e sem aumento do pulso ao ortostatismo', det:{tipo:'texto', ph:'PA e pulso deitado e em pé'} };
/* ef — neuropatia, ombro e joelho (só com parestesia na mão) */
const E_TINEL = { tipo:'escolha', id:'np-tinel', rot:'Mão com parestesia: Tinel e Phalen', na:'Tinel e Phalen', lacuna:false, multi:true, opts:[
  {v:'neg', rot:'negativos', frase:'Tinel e Phalen negativos', so:true},
  {v:'tinel', rot:'Tinel positivo', frase:'Tinel positivo'}, {v:'phalen', rot:'Phalen positivo', frase:'Phalen positivo'}] };
/* ef — cefaleia, tontura */
const E_NUCA = { tipo:'tri', id:'ce-nuca', rot:'Rigidez de nuca', na:'rigidez de nuca', junto:true, sim:'rigidez de nuca', nao:'sem rigidez de nuca' };
const E_FUNDO = { tipo:'escolha', id:'ce-fundo', rot:'Fundo de olho (papiledema)', na:'fundo de olho', junto:true, opts:[
  {v:'ok', rot:'sem papiledema', frase:'fundo de olho sem papiledema'}, {v:'papiledema', rot:'papiledema', frase:'papiledema ao fundo de olho'}] };
/* ef — neuropatia: cópia literal de has-dm (quadros-b.js) */
const E_PE_MONO = { tipo:'escolha', id:'hd-pe-mono', rot:'DM — monofilamento nos pés', na:'monofilamento', opts:[
  {v:'ok', rot:'sensibilidade protetora preservada', frase:'sensibilidade protetora preservada ao monofilamento'},
  {v:'perda', rot:'perda da sensibilidade protetora', frase:'perda da sensibilidade protetora ao monofilamento'}] };
const E_PE_VIBRA = { tipo:'escolha', id:'hd-pe-vibra', rot:'DM — diapasão de 128 Hz nos pés', na:'diapasão', opts:[
  {v:'ok', rot:'vibração preservada', frase:'sensibilidade vibratória preservada'},
  {v:'diminuida', rot:'vibração diminuída', frase:'sensibilidade vibratória diminuída'}] };
const E_PE_RISCO = { tipo:'escolha', id:'hd-pe-risco', rot:'DM — risco do pé (define o retorno)', na:'classificação de risco do pé', tpl:'pé de risco {d}', opts:[
  {v:'0', rot:'0', frase:'0'},
  {v:'1', rot:'1 — perda da sensibilidade protetora', frase:'1 (perda da sensibilidade protetora)'},
  {v:'2', rot:'2 — doença arterial periférica', frase:'2 (doença arterial periférica)'},
  {v:'3', rot:'3 — úlcera ou amputação prévia', frase:'3 (úlcera ou amputação prévia)'}] };

/* ---------- 1. Cefaleia ---------- */
/* anamnese — gota (fatores de artrite séptica; o red flag nº 1 da queixa) */
const E_SEPTICA = { tipo:'tri', id:'go-septica', rot:'Febre ou mal-estar; prótese ou cirurgia articular recente, infecção ou lesão de pele, droga injetável (fatores de risco de artrite séptica)', na:'febre, mal-estar e fatores de risco de artrite séptica', junto:true,
  sim:'refere {d}', simSemDet:'refere febre, mal-estar ou fator de risco de artrite séptica', nao:'nega febre, mal-estar, prótese ou cirurgia articular recente, infecção ou lesão de pele e uso de droga injetável',
  det:{tipo:'escolha', multi:true, opts:[{v:'febre', rot:'febre'}, {v:'mal', rot:'mal-estar'}, {v:'protese', rot:'prótese ou cirurgia articular recente'},
    {v:'pele', rot:'infecção ou lesão de pele'}, {v:'droga', rot:'uso de droga injetável'}]} };
/* anamnese — gota, lombalgia, ombro-joelho (a pergunta que decide o AINE e a gastroproteção) */
const E_AINE = { tipo:'tri', id:'go-aine', rot:'AAS, corticoide oral, anticoagulante ou ISRS em uso; úlcera péptica ou sangramento digestivo prévio (decide o AINE e a gastroproteção)', na:'AAS, corticoide, anticoagulante, ISRS ou úlcera',
  sim:'refere {d}', simSemDet:'refere uso de AAS, corticoide oral, anticoagulante ou ISRS, ou úlcera péptica ou sangramento digestivo prévio',
  nao:'nega uso de AAS, corticoide oral, anticoagulante e ISRS, e nega úlcera péptica e sangramento digestivo prévios',
  det:{tipo:'escolha', multi:true, opts:[{v:'aas', rot:'uso de AAS'}, {v:'corticoide', rot:'uso de corticoide oral'}, {v:'anticoagulante', rot:'uso de anticoagulante'},
    {v:'isrs', rot:'uso de ISRS'}, {v:'ulcera', rot:'úlcera péptica ou sangramento digestivo prévio'}]} };
/* anamnese — dor-cronica, ombro-joelho */
const E_TEMPO = { tipo:'texto', id:'df-tempo', rot:'Há quanto tempo dói (mais de 3 meses é dor crônica)', curto:true, na:'tempo de dor', ph:'8 meses', fmt:'dor há {v}' };

QUADROS.push({
  id: 'cefaleia', nome: 'Cefaleia', queixa: 'cefaleia', grupo: 'A2-Neuromusculoesqueletica',
  fonte: 'TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016 · TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020',
  ciap: ['N01', 'N89', 'N95'], cid: ['R51', 'G43', 'G44'],
  blocos: {
    anamnese: { rot: 'Cefaleia — crise, alerta e profilaxia', itens: [
      {tipo:'texto', id:'ce-padrao', rot:'Desde quando, quanto dura cada crise, quantas por mês', na:'padrão das crises', ph:'há 3 anos, crises de 6 horas, 4 por mês', fmt:'cefaleia {v}'},
      {tipo:'escolha', id:'ce-dor', rot:'Como é a dor: lado, tipo, intensidade e se impede as atividades', na:'características da dor', multi:true, tpl:'dor {d}', opts:[
        {v:'uni', rot:'unilateral', frase:'unilateral'}, {v:'bi', rot:'bilateral', frase:'bilateral'},
        {v:'latejante', rot:'latejante', frase:'latejante'}, {v:'aperto', rot:'em aperto', frase:'em aperto'},
        {v:'leve', rot:'leve a moderada', frase:'de intensidade leve a moderada'}, {v:'forte', rot:'forte', frase:'de forte intensidade'},
        {v:'impede', rot:'impede as atividades', frase:'que impede as atividades'},
        {v:'mesmolado', rot:'sempre do mesmo lado', frase:'sempre do mesmo lado'}, {v:'occipital', rot:'só occipital', frase:'só occipital'}] },
      {tipo:'tri', id:'ce-assoc', rot:'Náusea, vômito, incômodo com luz e barulho', na:'náusea, vômito, luz e barulho', junto:true,
        sim:'refere {d}', simSemDet:'refere náusea, vômito ou incômodo com luz e barulho', nao:'nega náusea, vômito e incômodo com luz e barulho',
        det:{tipo:'escolha', multi:true, opts:[{v:'nausea', rot:'náusea'}, {v:'vomito', rot:'vômito'},
          {v:'luz', rot:'incômodo com luz'}, {v:'barulho', rot:'incômodo com barulho'}]} },
      {tipo:'tri', id:'ce-aura', rot:'Aura antes da dor (visual, sensitiva ou de fala)', na:'aura', junto:true,
        sim:'aura antes da dor[: {d}]', nao:'nega aura antes da dor', det:{tipo:'texto', ph:'visual, sensitiva ou de fala; quanto dura'} },
      {tipo:'tri', id:'ce-autonomico', rot:'Lacrimejamento, olho vermelho, nariz entupido ou escorrendo do mesmo lado da dor', na:'sintomas autonômicos do mesmo lado', junto:true,
        sim:'refere lacrimejamento, olho vermelho ou nariz entupido ou escorrendo do mesmo lado da dor',
        nao:'nega lacrimejamento, olho vermelho e nariz entupido ou escorrendo do mesmo lado da dor' },
      {tipo:'tri', id:'ce-subito', rot:'Início súbito: dor no máximo em até 1 minuto, "a pior dor de cabeça da vida"', na:'início súbito',
        sim:'início súbito da dor[: {d}]', nao:'nega início súbito da dor', det:{tipo:'texto', ph:'o que fazia, hora de início'} },
      {tipo:'tri', id:'ce-mudou', rot:'O padrão da dor mudou', na:'mudança do padrão', junto:true,
        sim:'mudança do padrão da dor[: {d}]', nao:'nega mudança do padrão da dor', det:{tipo:'texto', ph:'o que mudou, desde quando'} },
      {tipo:'tri', id:'ce-esforco', rot:'A dor acorda, piora com esforço, tosse, relação sexual ou Valsalva, ou aparece ou some com a mudança de posição', na:'dor que acorda, de esforço ou postural', junto:true,
  sim:'dor que {d}', simSemDet:'dor que acorda, piora com esforço, tosse, relação sexual ou Valsalva, ou muda com a posição',
  nao:'nega dor que acorda ou piora com esforço, tosse, relação sexual e Valsalva, e nega dor que aparece ou some com a mudança de posição',
  det:{tipo:'escolha', multi:true, opts:[{v:'acorda', rot:'acorda do sono'}, {v:'esforco', rot:'piora com esforço'}, {v:'tosse', rot:'piora com tosse'},
    {v:'coito', rot:'piora na relação sexual'}, {v:'valsalva', rot:'piora com Valsalva'}, {v:'posicao', rot:'aparece ou some com a mudança de posição'}]} },
      {tipo:'tri', id:'ce-alarme', rot:'Junto com a dor: febre, rigidez de nuca, confusão, convulsão ou trauma de crânio recente', na:'febre, nuca, confusão, convulsão ou trauma', junto:true,
        sim:'refere {d}', simSemDet:'refere sinal de alarme junto com a dor', nao:'nega febre, rigidez de nuca, confusão, convulsão e trauma de crânio recente',
        det:{tipo:'escolha', multi:true, opts:[{v:'febre', rot:'febre'}, {v:'nuca', rot:'rigidez de nuca'}, {v:'confusao', rot:'confusão'},
          {v:'convulsao', rot:'convulsão'}, {v:'trauma', rot:'trauma de crânio recente'}]} },
      {tipo:'tri', id:'ce-gatilho', rot:'Gatilhos (estresse, privação de sono, jejum, álcool, cafeína, menstruação, medicamento, alimento)', na:'gatilhos',
        sim:'gatilhos da dor: {d}', simSemDet:'refere gatilhos da dor', nao:'nega gatilhos da dor',
        det:{tipo:'escolha', multi:true, opts:[{v:'estresse', rot:'estresse'}, {v:'sono', rot:'privação de sono'}, {v:'jejum', rot:'jejum'}, {v:'alcool', rot:'álcool'},
          {v:'cafeina', rot:'cafeína'}, {v:'menstruacao', rot:'menstruação'}, {v:'medicamento', rot:'medicamento'}, {v:'alimento', rot:'alimento'}]} },
      {tipo:'tri', id:'ce-abuso', rot:'Analgésico em dois ou mais dias por semana (já sugere cefaleia por abuso)', na:'uso de analgésico',
        sim:'usa analgésico em dois ou mais dias por semana[: {d}]', nao:'nega uso de analgésico em dois ou mais dias por semana', det:{tipo:'texto', ph:'qual, quantos dias por semana'} },
      {tipo:'tri', id:'ce-estrogenio', rot:'Usa contraceptivo com estrogênio (contraindica na migrânea com aura ou acima de 35 anos)', na:'contraceptivo com estrogênio', lacuna:false,
        sim:'usa contraceptivo com estrogênio', nao:'nega uso de contraceptivo com estrogênio' },
      GRAVIDEZ,
      {tipo:'tri', id:'ce-humor', rot:'Ansiedade ou depressão (mudam a escolha do tratamento)', na:'ansiedade e depressão',
        sim:'refere {d}', simSemDet:'refere ansiedade ou depressão', nao:'nega ansiedade e depressão',
        det:{tipo:'escolha', multi:true, opts:[{v:'ansiedade', rot:'ansiedade'}, {v:'depressao', rot:'depressão'}]} },
      {tipo:'tri', id:'ce-profilaxia', rot:'Já fez profilaxia (com quê, por quanto tempo, em que dose)', na:'profilaxia prévia', lacuna:false,
        sim:'já fez profilaxia[: {d}]', nao:'nega profilaxia prévia', det:{tipo:'texto', ph:'com quê, dose, por quanto tempo, resposta'} }
    ]},
    ef: { rot: 'Cefaleia — exame neurológico', itens: [
      E_NUCA,
      E_FUNDO,
      {tipo:'tri', id:'ce-neuro', rot:'Estado mental e pares cranianos (acuidade e campo visual, pupilas, sensibilidade e simetria da face)', na:'estado mental e pares cranianos', junto:true,
        sim:'alteração de estado mental ou de pares cranianos[: {d}]', nao:'estado mental e pares cranianos sem alterações', det:{tipo:'texto', ph:'o quê'} },
      {tipo:'tri', id:'ce-cerebelo', rot:'Dedo-nariz e Romberg', na:'dedo-nariz e Romberg', junto:true,
        sim:'dedo-nariz ou Romberg alterado[: {d}]', nao:'dedo-nariz e Romberg sem alterações', det:{tipo:'texto', ph:'o quê'} },
      {tipo:'tri', id:'ce-babinski', rot:'Babinski', na:'Babinski', junto:true, sim:'Babinski presente', nao:'Babinski ausente' },
      {tipo:'escolha', id:'ce-temporal', rot:'Acima de 50 anos: artéria temporal superficial (dor, edema)', na:'artéria temporal', lacuna:false, opts:[
        {v:'ok', rot:'sem dor ou edema', frase:'artéria temporal sem dor ou edema à palpação'},
        {v:'alterada', rot:'dolorosa ou com edema', frase:'artéria temporal dolorosa ou com edema à palpação'}] },
      {tipo:'tri', id:'ce-musculo', rot:'Musculatura cervical e do crânio: hipertonia ou ponto doloroso', na:'musculatura cervical e do crânio',
        sim:'hipertonia ou ponto doloroso na musculatura cervical e do crânio[: {d}]', nao:'sem hipertonia ou ponto doloroso na musculatura cervical e do crânio', det:{tipo:'texto', ph:'onde'} },
      {tipo:'tri', id:'ce-atm', rot:'Articulação temporomandibular dolorosa', na:'articulação temporomandibular', junto:true,
        sim:'dor na articulação temporomandibular', nao:'articulação temporomandibular sem dor' },
      {tipo:'escolha', id:'ce-orl', rot:'Otoscopia, oroscopia e seios da face (se houver sintoma associado)', na:'otoscopia, oroscopia e seios da face', lacuna:false, opts:[
        {v:'ok', rot:'sem alterações', frase:'otoscopia, oroscopia e seios da face sem alterações'},
        {v:'alterada', rot:'com alteração', frase:'alteração à otoscopia, oroscopia ou nos seios da face'}] }
    ]},
    conduta: { rot: 'Cefaleia — conduta', itens: [
      {tipo:'escolha', id:'ce-urgencia', rot:'Sinal de alerta de urgência (SAMU, UPA)', na:'encaminhamento à urgência', lacuna:false, multi:true, tpl:'encaminho à urgência por {d}', opts:[
        {v:'hsa', rot:'início súbito e muito forte (hemorragia subaracnoide)', frase:'suspeita de hemorragia subaracnoide'},
        {v:'meningite', rot:'febre, mialgia, petéquias, confusão ou rigidez de nuca (meningite)', frase:'suspeita de meningite'},
        {v:'focal', rot:'sinal neurológico focal, edema de papila ou alteração de consciência', frase:'sinal neurológico focal, edema de papila ou alteração de consciência'},
        {v:'convulsao', rot:'crise convulsiva junto com a cefaleia', frase:'cefaleia com crise convulsiva'},
        {v:'refrataria', rot:'dor forte que não cede com o analgésico dado na UBS', frase:'dor forte que não cede com o analgésico dado na UBS'},
        {v:'mal', rot:'crise de migrânea de mais de 72 horas, refratária', frase:'crise de migrânea refratária, com mais de 72 horas'}] },
      {tipo:'escolha', id:'ce-imagem', rot:'Imagem de crânio', na:'imagem de crânio', lacuna:false, opts:[
        {v:'nao', rot:'cefaleia primária típica, sem sinal de alerta: sem imagem', frase:'cefaleia primária típica, sem sinal de alerta: diagnóstico clínico, sem imagem'},
        {v:'pedida', rot:'sinal de alerta sem urgência: tomografia ou ressonância', frase:'solicito tomografia ou ressonância de crânio por sinal de alerta sem urgência'},
        {v:'neuro', rot:'sinal de alerta e sem acesso à imagem na APS: Neurologia', frase:'encaminho à Neurologia por sinal de alerta, sem acesso à imagem na APS'}] },
      {tipo:'escolha', id:'ce-vsg', rot:'Acima de 50 anos, suspeita de arterite temporal', na:'VSG', lacuna:false, opts:[
        {v:'vsg', rot:'VSG solicitada', frase:'solicito VSG por suspeita de arterite temporal'}] },
      {tipo:'escolha', id:'ce-diario', rot:'Diário de cefaleia', na:'diário de cefaleia', lacuna:false, opts:[
        {v:'orientado', rot:'orientado', frase:'oriento diário de cefaleia: frequência, intensidade, duração e uso de analgésico'}] },
      {tipo:'escolha', id:'ce-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento sobre {d}', opts:[
        {v:'gatilho', rot:'evitar o gatilho', frase:'como evitar o gatilho'},
        {v:'sono', rot:'sono regular', frase:'sono regular'},
        {v:'atividade', rot:'atividade física moderada', frase:'atividade física moderada'},
        {v:'doenca', rot:'a doença e o automanejo da crise', frase:'a doença e o automanejo da crise'},
        {v:'repouso', rot:'repouso na crise: lugar calmo, ventilado e com pouca luz', frase:'repouso na crise, em lugar calmo, ventilado e com pouca luz'},
        {v:'abuso', rot:'risco de cefaleia por abuso de analgésico', frase:'o risco de cefaleia por abuso de analgésico'},
        {v:'estrogenio', rot:'migrânea com aura: sem contraceptivo com estrogênio', frase:'contraceptivo com estrogênio contraindicado na migrânea com aura'}] },
      {tipo:'escolha', id:'ce-volta', rot:'Sinais para voltar', na:'sinais para voltar', lacuna:false, opts:[
        {v:'orientado', rot:'orientados', frase:'oriento voltar se a dor retornar, piorar ou mudar, ou se surgir febre, vômito, tontura, desequilíbrio, alteração visual, motora ou da fala'}] },
      {tipo:'escolha', id:'ce-profi', rot:'Profilaxia', na:'profilaxia', lacuna:false, opts:[
        {v:'indicada', rot:'indicada, reavaliar em 30 dias', frase:'profilaxia indicada, com reavaliação em 30 dias'},
        {v:'abuso', rot:'abuso de analgésico: profilaxia e suspensão do analgésico por cerca de uma semana', frase:'abuso de analgésico: inicio profilaxia e suspendo o analgésico por cerca de uma semana, com AINE fixo ou corticoide curto nesse período'},
        {v:'nao', rot:'sem indicação hoje', frase:'sem indicação de profilaxia hoje'}] },
      {tipo:'escolha', id:'ce-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'neurocir', rot:'Neurocirurgia (imagem com lesão expansiva, tumor, aneurisma ou malformação vascular, hidrocefalia ou Chiari)', frase:'à Neurocirurgia, por imagem com lesão expansiva, tumor, aneurisma ou malformação vascular, hidrocefalia ou Chiari'},
        {v:'refrataria', rot:'Neurologia (migrânea refratária a duas classes de profilaxia, ou tensional refratária a tricíclico, por 3 meses)', frase:'à Neurologia, por migrânea refratária a duas classes de profilaxia, ou tensional refratária a tricíclico, por ao menos 3 meses'},
        {v:'outra', rot:'Neurologia (cefaleia primária que não é migrânea nem tensional: trigêmino-autonômica)', frase:'à Neurologia, por cefaleia primária que não é migrânea nem tensional (trigêmino-autonômica)'},
        {v:'trigemeo', rot:'Neurologia ou Tratamento da Dor (neuralgia do trigêmeo)', frase:'à Neurologia ou ao Tratamento da Dor, por neuralgia do trigêmeo'}] }
    ]}
  }
});

/* ---------- 2. Dor crônica e fibromialgia ---------- */
QUADROS.push({
  id: 'dor-cronica', nome: 'Dor crônica / fibromialgia', queixa: 'dor-cronica-fibromialgia', grupo: 'A2-Neuromusculoesqueletica',
  fonte: 'MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020 · SBR — Diretrizes de tratamento da fibromialgia, parte I, Adv Rheumatol, 2026',
  ciap: ['A01', 'L18'], cid: ['M79', 'R52'],
  blocos: {
    anamnese: { rot: 'Dor crônica — tipo de dor, sono e humor', itens: [
      {tipo:'texto', id:'df-intens', rot:'Intensidade numa escala (numérica, de faces ou verbal) e quanto limita casa, trabalho e lazer', na:'intensidade e limitação',
        ph:'7 de 10, deixou de trabalhar', fmt:'intensidade da dor e limitação: {v}'},
      E_TEMPO,
      {tipo:'escolha', id:'df-onde', rot:'Onde dói (marcar no diagrama do corpo)', na:'distribuição da dor', opts:[
  {v:'difusa', rot:'difusa', frase:'dor difusa'}, {v:'localizada', rot:'localizada', frase:'dor localizada'},
  {v:'nervo', rot:'no trajeto de um nervo', frase:'dor no trajeto de um nervo'}] },
      {tipo:'escolha', id:'df-tipo', rot:'Como é a dor', na:'caráter da dor', multi:true, junto:true, opts:[
        {v:'neuropatica', rot:'queimação, choque, formigamento, agulhada', frase:'caráter neuropático (queimação, choque, formigamento ou agulhada)'},
        {v:'nociceptiva', rot:'peso, aperto, pontada, latejamento', frase:'caráter nociceptivo (peso, aperto, pontada ou latejamento)'},
        {v:'nociplastica', rot:'peso, tensão, dolorimento difuso', frase:'caráter nociplástico (peso, tensão e dolorimento difuso)'}] },
      E_CONSTITUCIONAL,
      {tipo:'tri', id:'df-noturna', rot:'Dor noturna que acorda e obriga a levantar para melhorar', na:'dor noturna', junto:true,
        sim:'dor noturna que acorda e obriga a levantar para melhorar', nao:'nega dor noturna que acorda e obriga a levantar para melhorar' },
      {tipo:'tri', id:'df-sono', rot:'Sono: não reparador, acorda à noite, ronco, pausas, pernas inquietas', na:'sono',
        sim:'refere {d}', simSemDet:'refere alteração do sono', nao:'nega sono não reparador, despertar noturno, ronco, pausas respiratórias e pernas inquietas',
        det:{tipo:'escolha', multi:true, opts:[{v:'naoreparador', rot:'sono não reparador'}, {v:'acorda', rot:'despertar noturno'}, {v:'ronco', rot:'ronco'},
          {v:'pausas', rot:'pausas respiratórias no sono'}, {v:'pernas', rot:'pernas inquietas'}]} },
      {tipo:'tri', id:'df-fibro', rot:'Fadiga, dificuldade de memória e de concentração, cefaleia, cólica abdominal', na:'sintomas da fibromialgia', junto:true,
        sim:'refere {d}', simSemDet:'refere fadiga, dificuldade de memória e de concentração, cefaleia ou cólica abdominal',
        nao:'nega fadiga, dificuldade de memória e de concentração, cefaleia e cólica abdominal',
        det:{tipo:'escolha', multi:true, opts:[{v:'fadiga', rot:'fadiga'}, {v:'memoria', rot:'dificuldade de memória e de concentração'},
          {v:'cefaleia', rot:'cefaleia'}, {v:'colica', rot:'cólica abdominal'}]} },
      {tipo:'tri', id:'df-humor', rot:'Humor: perda de prazer, ansiedade, pensamento catastrófico, ideação suicida', na:'humor', junto:true,
        sim:'refere {d}', simSemDet:'refere alteração do humor', nao:'nega perda de prazer, ansiedade, pensamento catastrófico e ideação suicida',
        det:{tipo:'escolha', multi:true, opts:[{v:'anedonia', rot:'perda de prazer'}, {v:'ansiedade', rot:'ansiedade'},
          {v:'catastrofico', rot:'pensamento catastrófico'}, {v:'ideacao', rot:'ideação suicida'}]} },
      {tipo:'texto', id:'df-escores', rot:'PHQ-9 e GAD-7 (pontuações)', curto:true, ph:'12 e 9', fmt:'PHQ-9 e GAD-7: {v}'},
      {tipo:'tri', id:'df-drogas', rot:'Outras drogas ou abuso prévio de medicamento', na:'outras drogas e abuso de medicamento',
        sim:'refere uso de outras drogas ou abuso prévio de medicamento[: {d}]', nao:'nega uso de outras drogas e abuso prévio de medicamento', det:{tipo:'texto', ph:'qual, quando'} },
      {tipo:'tri', id:'df-violencia', rot:'Violência doméstica ou sexual, discriminação (também se expressam como dor)', na:'violência e discriminação', junto:true,
        sim:'refere violência doméstica ou sexual ou discriminação[: {d}]', nao:'nega violência doméstica, violência sexual e discriminação', det:{tipo:'texto', ph:'o quê, por quem'} },
      GRAVIDEZ,
      E_TRATOU,
      {tipo:'texto', id:'df-expectativa', rot:'O que espera do tratamento, o que acha que causa a dor, litígio ou benefício em jogo', na:'expectativa e crenças',
        ph:'espera ficar sem dor; acha que é da coluna; sem litígio', fmt:'expectativa e crenças: {v}'}
    ]},
    ef: { rot: 'Dor crônica — exame', itens: [
      {tipo:'tri', id:'df-marcha', rot:'Postura, marcha e amplitude articular', na:'postura, marcha e amplitude articular',
        sim:'alteração de postura, marcha ou amplitude articular[: {d}]', nao:'postura, marcha e amplitude articular sem alterações', det:{tipo:'texto', ph:'o quê'} },
      {tipo:'tri', id:'df-sinovite', rot:'Sinovite (edema, calor)', na:'sinovite', junto:true,
        sim:'sinovite[: {d}]', nao:'sem sinovite', det:{tipo:'texto', ph:'onde'} },
      {tipo:'tri', id:'df-miofascial', rot:'Ponto-gatilho, banda tensa ou dor referida à palpação muscular (dor miofascial)', na:'palpação muscular',
        sim:'ponto-gatilho, banda tensa ou dor referida à palpação muscular[: {d}]', nao:'sem ponto-gatilho, banda tensa e dor referida à palpação muscular', det:{tipo:'texto', ph:'onde'} },
      {tipo:'tri', id:'df-neuro', rot:'Neurológico: força de 0 a 5, sensibilidade tátil, térmica, dolorosa e vibratória (diapasão de 128 Hz), reflexos', na:'exame neurológico',
        sim:'alteração no exame neurológico[: {d}]', nao:'força, sensibilidade tátil, térmica, dolorosa e vibratória e reflexos sem alterações', det:{tipo:'texto', ph:'o quê, onde'} },
      E_DN4,
      {tipo:'texto', id:'df-idg', rot:'Fibromialgia: índice de dor generalizada (regiões que doeram na última semana, 0 a 19)', curto:true, ph:'9', fmt:'índice de dor generalizada {v}'},
      {tipo:'texto', id:'df-egrav', rot:'Fibromialgia: escala de gravidade (fadiga, sintomas cognitivos e sono não reparador, 0 a 12)', curto:true, ph:'7', junto:true, fmt:'escala de gravidade {v}'}
    ]},
    conduta: { rot: 'Dor crônica — plano', itens: [
      {tipo:'escolha', id:'df-classe', rot:'Tipo de dor predominante (neuropática só com lesão do sistema nervoso demonstrada ao exame neurológico, em distribuição plausível; os mecanismos coexistem: tratar cada componente)', na:'tipo de dor predominante', lacuna:false, opts:[
  {v:'neuropatica', rot:'neuropática (exame neurológico alterado, em distribuição plausível)', frase:'dor de predomínio neuropático, com lesão do sistema nervoso demonstrada ao exame neurológico'},
  {v:'nociceptiva', rot:'nociceptiva', frase:'dor de predomínio nociceptivo'},
  {v:'nociplastica', rot:'nociplástica', frase:'dor de predomínio nociplástico'},
  {v:'mista', rot:'mista', frase:'dor mista, com mais de um mecanismo'}] },
      {tipo:'escolha', id:'df-criterio', rot:'Fibromialgia: critérios clínicos (índice e gravidade, dor em 4 de 5 regiões, há 3 meses ou mais)', na:'critérios de fibromialgia', lacuna:false, opts:[
        {v:'sim', rot:'preenche', frase:'preenche os critérios clínicos de fibromialgia'},
        {v:'nao', rot:'não preenche', frase:'não preenche os critérios clínicos de fibromialgia'}] },
      {tipo:'escolha', id:'df-meta', rot:'Metas', na:'metas', lacuna:false, opts:[
        {v:'combinadas', rot:'metas realistas combinadas', frase:'combino metas realistas: dor em nível aceitável e ganho de função e autonomia'}] },
      {tipo:'escolha', id:'df-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento sobre {d}', opts:[
        {v:'fibro', rot:'fibromialgia: doença real e benigna, o resultado depende também de educação, exercício e sono', frase:'a fibromialgia como doença real e benigna, cujo resultado depende também de educação, exercício e sono'},
        {v:'piora', rot:'a dor pode piorar um pouco ao começar o exercício', frase:'a possível piora leve da dor ao começar o exercício'},
        {v:'repouso', rot:'evitar repouso absoluto, manter as atividades', frase:'evitar repouso absoluto e manter as atividades habituais'},
        {v:'sono', rot:'higiene do sono', frase:'higiene do sono'},
        {v:'praticas', rot:'práticas corporais da UBS e Programa Academia da Saúde', frase:'práticas corporais da UBS e do Programa Academia da Saúde'},
        {v:'integrativas', rot:'práticas integrativas como complemento, sem parar o remédio', frase:'práticas integrativas como complemento, sem parar o remédio'}] },
      {tipo:'escolha', id:'df-equipe', rot:'Plano com a equipe multiprofissional', na:'equipe multiprofissional', lacuna:false, opts:[
        {v:'sim', rot:'combinado', frase:'defino plano com a equipe multiprofissional'}] },
      {tipo:'escolha', id:'df-exames', rot:'Exames conforme a suspeita (só por critério clínico: muita alteração de imagem não tem relação com a dor)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
  {v:'hemograma', rot:'hemograma', frase:'hemograma'}, {v:'inflam', rot:'VHS e PCR', frase:'VHS e PCR'},
  {v:'glicemia', rot:'glicemia e HbA1c', frase:'glicemia e HbA1c'}, {v:'lipidios', rot:'lipídios', frase:'lipídios'},
  {v:'renhep', rot:'função renal e hepática', frase:'função renal e hepática'}, {v:'eletrolitos', rot:'eletrólitos', frase:'eletrólitos'},
  {v:'vitd', rot:'vitamina D e PTH', frase:'vitamina D e PTH'}, {v:'fan', rot:'FAN e fator reumatoide', frase:'FAN e fator reumatoide'},
  {v:'eletroforese', rot:'eletroforese de proteínas', frase:'eletroforese de proteínas'}, {v:'tireoide', rot:'TSH e T4 livre', frase:'TSH e T4 livre'},
  {v:'cpk', rot:'CPK', frase:'CPK'},
  {v:'carencia', rot:'má absorção, alcoolismo, desnutrição ou anemia: ferro, ferritina, transferrina, ácido fólico e B12', frase:'ferro, ferritina, transferrina, ácido fólico e vitamina B12'}] },
      {tipo:'texto', id:'df-fiqr', rot:'Seguimento da fibromialgia: FIQR ou FSQ (pontuação)', curto:true, ph:'FIQR 42', fmt:'questionário da fibromialgia: {v}'},
      {tipo:'escolha', id:'df-reavalia', rot:'No retorno', na:'reavaliação', lacuna:false, opts:[
        {v:'escala', rot:'reavaliar com a mesma escala', frase:'no retorno, reavalio dor, sono, função e humor com a mesma escala'}] },
      {tipo:'escolha', id:'df-urgencia', rot:'Urgência', na:'encaminhamento à urgência', lacuna:false, multi:true, tpl:'encaminho à urgência por {d}', opts:[
        {v:'suicidio', rot:'risco alto de suicídio', frase:'risco alto de suicídio'},
        {v:'abstinencia', rot:'abstinência com risco de agressão', frase:'abstinência com risco de agressão'},
        {v:'intoxicacao', rot:'intoxicação por analgésico ou outra substância, com instabilidade ou rebaixamento', frase:'intoxicação por analgésico ou outra substância, com instabilidade ou rebaixamento'}] },
      {tipo:'escolha', id:'df-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'reuma', rot:'Reumatologia (suspeita de doença articular inflamatória em quem parece ter fibromialgia)', frase:'à Reumatologia, por suspeita de doença articular inflamatória'},
        {v:'fibro', rot:'equipe de tratamento da dor (fibromialgia sem resposta a 6 meses de tratamento otimizado)', frase:'à equipe de tratamento da dor, por fibromialgia sem resposta a 6 meses de tratamento otimizado, não medicamentoso e medicamentoso'},
        {v:'neuropatica', rot:'Tratamento da Dor (dor neuropática refratária a dois fármacos em dose otimizada)', frase:'ao Tratamento da Dor, por dor neuropática refratária a dois fármacos em dose otimizada'},
        {v:'opioide', rot:'Tratamento da Dor (dor refratária com uso problemático de opioide)', frase:'ao Tratamento da Dor, por dor refratária com uso problemático de opioide'},
        {v:'psiq', rot:'CAPS ou Psiquiatria (transtorno psiquiátrico predominante sem resposta na APS)', frase:'ao CAPS ou à Psiquiatria, por transtorno psiquiátrico predominante sem resposta na APS'}] }
    ]}
  }
});

/* ---------- 3. Gota ---------- */
QUADROS.push({
  id: 'gota', nome: 'Gota', queixa: 'gota', grupo: 'A2-Neuromusculoesqueletica',
  fonte: 'TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016 · SBR/SBPC-ML — Recomendação para o laudo de ácido úrico no tratamento da gota, Adv Rheumatol, 2024',
  ciap: ['T92'], cid: ['M10'],
  blocos: {
    anamnese: { rot: 'Gota — crise, ácido úrico e rim', itens: [
      {tipo:'escolha', id:'go-articulacao', rot:'Qual articulação', na:'articulação da crise', multi:true, tpl:'crise em {d}', opts:[
        {v:'mtf', rot:'1ª metatarsofalangeana (podagra)', frase:'primeira metatarsofalangeana (podagra)'},
        {v:'tornozelo', rot:'tornozelo', frase:'tornozelo'}, {v:'mediope', rot:'médio pé', frase:'médio pé'},
        {v:'outra', rot:'outra', frase:'outra articulação'}] },
      {tipo:'tri', id:'go-pico', rot:'A dor chegou ao máximo em menos de 24 horas', na:'pico da dor', junto:true,
        sim:'dor com pico em menos de 24 horas', nao:'nega dor com pico em menos de 24 horas' },
      {tipo:'tri', id:'go-resolve', rot:'A crise resolveu em até 14 dias', na:'resolução da crise', junto:true,
        sim:'crise resolvida em até 14 dias', nao:'crise sem resolução em até 14 dias' },
      {tipo:'tri', id:'go-entre', rot:'Ficou totalmente bem entre as crises', na:'intervalo entre as crises', junto:true,
        sim:'totalmente assintomático entre as crises', nao:'não ficou totalmente assintomático entre as crises' },
      {tipo:'tri', id:'go-inflam', rot:'Vermelhidão, não suporta toque nem pressão, não consegue andar ou usar a articulação', na:'sinais inflamatórios e incapacidade', junto:true,
        sim:'articulação com {d}', simSemDet:'articulação com sinais inflamatórios', nao:'nega vermelhidão, dor ao toque e à pressão e incapacidade de usar a articulação',
        det:{tipo:'escolha', multi:true, opts:[{v:'verm', rot:'vermelhidão'}, {v:'toque', rot:'dor que não suporta toque nem pressão'},
          {v:'uso', rot:'incapacidade de andar ou usar a articulação'}]} },
      E_SEPTICA,
      {tipo:'texto', id:'go-crises', rot:'Quantas crises no último ano', curto:true, na:'crises no último ano', ph:'3', fmt:'crises no último ano: {v}'},
      {tipo:'tri', id:'go-tofos', rot:'Nódulos em orelha, cotovelo, polpa dos dedos ou tendão de Aquiles (tofos)', na:'nódulos sugestivos de tofos',
        sim:'refere nódulos sugestivos de tofos[: {d}]', nao:'nega nódulos em orelha, cotovelo, polpa dos dedos e tendão de Aquiles', det:{tipo:'texto', ph:'onde'} },
      {tipo:'tri', id:'go-renal', rot:'Doença renal conhecida; já fez creatinina', na:'doença renal e creatinina',
        sim:'doença renal conhecida[: {d}]', nao:'nega doença renal conhecida', det:{tipo:'texto', ph:'creatinina e TFG, com data'} },
      {tipo:'tri', id:'go-medicamentos', rot:'Medicamento que sobe o ácido úrico (revisar todos os de uso contínuo)', na:'medicamentos que sobem o ácido úrico', junto:true,
        sim:'em uso de medicamento que sobe o ácido úrico[: {d}]', nao:'sem medicamento em uso que suba o ácido úrico', det:{tipo:'texto', ph:'qual'} },
      E_AINE,
      {tipo:'tri', id:'go-alopurinol', rot:'Já usa alopurinol', na:'uso de alopurinol', lacuna:false,
        sim:'em uso de alopurinol[: {d}]', nao:'nega uso de alopurinol', det:{tipo:'texto', ph:'desde quando, dose'}, sub:[
          { id:'go-alopurinol-adesao', rot:'Toma certo', na:'adesão ao alopurinol', sim:'toma conforme prescrito', nao:'não toma conforme prescrito' },
          { id:'go-alopurinol-crise', rot:'Tem tido crise apesar do alopurinol', na:'crises em uso de alopurinol', sim:'mantém crises apesar do tratamento', nao:'sem crises em uso do medicamento' }] },
      {tipo:'tri', id:'go-menopausa', rot:'Mulher: já está na menopausa (muda o encaminhamento)', na:'menopausa', lacuna:false,
        sim:'já na menopausa', nao:'ainda não está na menopausa' }
    ]},
    ef: { rot: 'Gota — articulação e tofos', itens: [
      {tipo:'texto', id:'go-onde-ef', rot:'Articulação examinada', curto:true, ph:'tornozelo direito', fmt:'exame da articulação: {v}'},
      {tipo:'tri', id:'go-eritema', rot:'Eritema na articulação', na:'eritema', junto:true, sim:'eritema articular', nao:'sem eritema articular' },
      {tipo:'tri', id:'go-edema', rot:'Edema na articulação', na:'edema', junto:true, sim:'edema articular', nao:'sem edema articular' },
      {tipo:'tri', id:'go-calor', rot:'Calor na articulação', na:'calor', junto:true, sim:'calor articular', nao:'sem calor articular' },
      {tipo:'tri', id:'go-toque', rot:'Dor ao toque e à pressão', na:'dor ao toque e à pressão', junto:true,
        sim:'dor ao toque e à pressão da articulação', nao:'sem dor ao toque e à pressão da articulação' },
      {tipo:'escolha', id:'go-numero', rot:'Quantas articulações (mono ou oligoarticular é o padrão da crise)', na:'número de articulações', opts:[
        {v:'mono', rot:'uma', frase:'artrite monoarticular'}, {v:'oligo', rot:'poucas', frase:'artrite oligoarticular'},
        {v:'poli', rot:'muitas', frase:'artrite poliarticular'}] },
      {tipo:'tri', id:'go-tofos-ef', rot:'Tofos: nódulos subcutâneos com material de giz, em articulações, orelhas, bursa do olécrano, polpas digitais e tendões, drenando ou não', na:'tofos',
        sim:'tofos[: {d}]', nao:'sem tofos', det:{tipo:'texto', ph:'onde, drenando ou não'} }
    ]},
    conduta: { rot: 'Gota — exames e encaminhamento', itens: [
      {tipo:'escolha', id:'go-lab', rot:'Exames de sangue', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'urico', rot:'ácido úrico sérico', frase:'ácido úrico sérico'},
        {v:'tfg', rot:'creatinina com TFG (CKD-EPI)', frase:'creatinina com TFG'}] },
      {tipo:'escolha', id:'go-imagem', rot:'Imagem (soma pontos no critério; sem imagem, conta zero)', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'rx', rot:'radiografia de mãos ou pés (erosão)', frase:'radiografia de mãos ou pés'},
        {v:'usg', rot:'ultrassonografia (depósito de urato)', frase:'ultrassonografia articular'}] },
      {tipo:'escolha', id:'go-repete', rot:'Ácido úrico normal na crise não descarta gota', na:'repetição do ácido úrico', lacuna:false, opts:[
        {v:'fora', rot:'repetir fora da crise (mais de 4 semanas) e sem hipouricemiante', frase:'oriento repetir o ácido úrico fora da crise, depois de mais de 4 semanas e sem hipouricemiante'}] },
      {tipo:'escolha', id:'go-meta', rot:'Meta do ácido úrico em quem trata', na:'meta do ácido úrico', lacuna:false, opts:[
        {v:'6', rot:'abaixo de 6 mg/dL', frase:'meta de ácido úrico abaixo de 6 mg/dL, com reavaliação até a meta'},
        {v:'5', rot:'com tofo, abaixo de 5 mg/dL', frase:'com tofo, meta de ácido úrico abaixo de 5 mg/dL, com reavaliação até a meta'}] },
      {tipo:'escolha', id:'go-urgencia', rot:'Monoartrite sem diagnóstico, sobretudo com febre ou mal-estar e fator de risco (suspeita de artrite séptica)', na:'suspeita de artrite séptica', lacuna:false, opts:[
        {v:'sim', rot:'encaminhado ao pronto-atendimento ou emergência', frase:'encaminho ao pronto-atendimento ou à emergência por suspeita de artrite séptica, antes de firmar gota'}] },
      {tipo:'escolha', id:'go-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'reuma', rot:'Reumatologia (3 ou mais crises no ano apesar de tratamento otimizado e boa adesão)', frase:'à Reumatologia, por 3 ou mais crises no ano apesar de tratamento otimizado e boa adesão'},
        {v:'origem', rot:'Medicina Interna ou Nefrologia (origem incerta da hiperuricemia: jovem ou mulher antes da menopausa)', frase:'à Medicina Interna ou Nefrologia, por origem incerta da hiperuricemia (jovem ou mulher antes da menopausa)'},
        {v:'drc', rot:'Medicina Interna ou Nefrologia (DRC estágio 4 ou 5, TFG abaixo de 30)', frase:'à Medicina Interna ou Nefrologia, por DRC estágio 4 ou 5 (TFG abaixo de 30)'},
        {v:'tofo', rot:'Ortopedia (tofo com infecção recorrente, compressão ou deformidade com prejuízo funcional, sem melhora com tratamento otimizado)', frase:'à Ortopedia, por tofo com infecção recorrente, compressão ou deformidade com prejuízo funcional, sem melhora com tratamento otimizado'}] }
    ]}
  }
});

/* ---------- 4. Lombalgia e cervicalgia ---------- */
QUADROS.push({
  id: 'lombalgia', nome: 'Lombalgia / cervicalgia', queixa: 'lombalgia-cervicalgia', grupo: 'A2-Neuromusculoesqueletica',
  fonte: 'MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024',
  ciap: ['L03', 'L01', 'L84', 'L86'], cid: ['M54'],
  blocos: {
    anamnese: { rot: 'Lombalgia e cervicalgia — alerta e mecânica', itens: [
      {tipo:'escolha', id:'lc-regiao', rot:'Onde dói', na:'região da dor', multi:true, tpl:'dor {d}', opts:[
        {v:'lombar', rot:'lombar', frase:'lombar'}, {v:'cervical', rot:'cervical', frase:'cervical'}] },
      {tipo:'texto', id:'lc-inicio', rot:'Desde quando, início (esforço, trauma), tipo de dor, irradiação, o que piora e o que alivia', na:'início e características',
        ph:'há 3 semanas, após carregar peso; em pontada; piora ao sentar', fmt:'início e características: {v}'},
      {tipo:'tri', id:'lc-irradia', rot:'A dor desce para a perna ou para o braço, com formigamento ou fraqueza (radiculopatia)', na:'irradiação com formigamento ou fraqueza',
        sim:'irradiação da dor para perna ou braço, com formigamento ou fraqueza[: {d}]', nao:'nega irradiação da dor para perna ou braço, formigamento e fraqueza', det:{tipo:'texto', ph:'para onde, lado'} },
      {tipo:'tri', id:'lc-claudicacao', rot:'Ao andar ou ficar em pé, dor e dormência nas pernas que só aliviam sentando ou curvando o tronco (claudicação neurogênica)', na:'claudicação neurogênica', lacuna:false, junto:true,
        sim:'dor e dormência nas pernas ao andar ou ficar em pé, que só aliviam sentando ou curvando o tronco',
        nao:'nega dor e dormência nas pernas ao andar ou ficar em pé que só aliviam sentando ou curvando o tronco' },
      {tipo:'tri', id:'lc-inflamatoria', rot:'Dor sem relação com esforço e repouso, pior à noite, com rigidez de manhã que melhora com o movimento (inflamatória)', na:'dor de padrão inflamatório', junto:true,
        sim:'dor de padrão inflamatório (sem relação com esforço e repouso, pior à noite, com rigidez matinal que melhora com o movimento)',
        nao:'nega dor de padrão inflamatório (pior à noite, com rigidez matinal que melhora com o movimento)' },
      E_CONSTITUCIONAL,
      {tipo:'tri', id:'lc-risco', rot:'Câncer prévio, HIV, corticoide crônico, droga injetável ou osteoporose', na:'câncer, HIV, corticoide, droga injetável ou osteoporose', junto:true,
        sim:'refere {d}', simSemDet:'refere câncer prévio, HIV, corticoide crônico, droga injetável ou osteoporose', nao:'nega câncer prévio, HIV, corticoide crônico, droga injetável e osteoporose',
        det:{tipo:'escolha', multi:true, opts:[{v:'cancer', rot:'câncer prévio'}, {v:'hiv', rot:'HIV'}, {v:'corticoide', rot:'uso crônico de corticoide'},
          {v:'droga', rot:'uso de droga injetável'}, {v:'osteoporose', rot:'osteoporose'}]} },
      {tipo:'tri', id:'lc-esfincter', rot:'Retenção ou perda de urina ou de fezes; dormência na região da sela', na:'esfíncteres e região da sela', junto:true,
        sim:'refere retenção ou perda de urina ou de fezes, ou dormência na região da sela[: {d}]', nao:'nega retenção ou perda de urina e de fezes e dormência na região da sela', det:{tipo:'texto', ph:'o quê, desde quando'} },
      E_AINE,
      E_TRABALHO,
      E_TRATOU,
      {tipo:'tri', id:'lc-psico', rot:'Humor, sono, medo de se mexer, insatisfação no trabalho, desejo de se aposentar (fatores que mantêm a dor)', na:'fatores que mantêm a dor',
        sim:'fatores que mantêm a dor: {d}', simSemDet:'refere fatores que mantêm a dor', nao:'nega alteração de humor e de sono, medo de se mexer, insatisfação no trabalho e desejo de se aposentar',
        det:{tipo:'escolha', multi:true, opts:[{v:'humor', rot:'alteração de humor'}, {v:'sono', rot:'sono ruim'}, {v:'medo', rot:'medo de se mexer'},
          {v:'trabalho', rot:'insatisfação no trabalho'}, {v:'aposentar', rot:'desejo de se aposentar'}]} }
    ]},
    ef: { rot: 'Lombalgia e cervicalgia — exame da coluna', itens: [
      {tipo:'tri', id:'lc-inspecao', rot:'Inspeção: curvatura (lordose, cifose, escoliose) e posição antálgica', na:'inspeção da coluna',
        sim:'alteração da curvatura da coluna ou posição antálgica[: {d}]', nao:'sem alteração da curvatura da coluna e sem posição antálgica', det:{tipo:'texto', ph:'o quê'} },
      {tipo:'texto', id:'lc-schober', rot:'Amplitude de movimento: teste de Schober', curto:true, ph:'14 para 17 cm', fmt:'teste de Schober: {v}'},
      {tipo:'tri', id:'lc-palpacao', rot:'Palpação: musculatura paravertebral, processos espinhosos, sacroilíacas', na:'palpação da coluna',
        sim:'dor à palpação da coluna[: {d}]', nao:'sem dor à palpação da musculatura paravertebral, dos processos espinhosos e das sacroilíacas', det:{tipo:'texto', ph:'onde'} },
      {tipo:'tri', id:'lc-lasegue', rot:'Lasègue: dor irradiada antes de a perna estendida chegar a 60 graus (acometimento do ciático)', na:'Lasègue', junto:true,
        sim:'Lasègue positivo[: {d}]', nao:'Lasègue negativo', det:{tipo:'texto', ph:'direita, esquerda ou os dois lados'} },
      {tipo:'tri', id:'lc-forca', rot:'Força (andar nos calcanhares e na ponta dos pés, flexão do tornozelo e do hálux), sensibilidade do pé, reflexos patelar e aquileu', na:'força, sensibilidade e reflexos', junto:true,
        sim:'alteração de força, sensibilidade ou reflexos[: {d}]', nao:'força, sensibilidade do pé e reflexos patelar e aquileu sem alterações', det:{tipo:'texto', ph:'o quê, lado'} },
      {tipo:'escolha', id:'lc-cervical', rot:'Cervicalgia ou déficit: nível sensitivo, espasticidade, reflexos vivos, Babinski, Hoffmann, clônus, Lhermitte; força e atrofia das mãos', na:'sinais de mielopatia cervical', lacuna:false, junto:true, opts:[
  {v:'ok', rot:'sem sinais de mielopatia, mãos sem fraqueza ou atrofia', frase:'sem nível sensitivo, espasticidade, hiper-reflexia, Babinski, Hoffmann, clônus, Lhermitte e sem fraqueza ou atrofia das mãos'},
  {v:'alterado', rot:'sinais de mielopatia cervical ou déficit nas mãos', frase:'sinais de mielopatia cervical ou déficit nas mãos'}] },
      {tipo:'tri', id:'lc-aorta', rot:'Abdome: massa pulsátil (aneurisma de aorta)', na:'massa pulsátil no abdome', junto:true,
        sim:'massa pulsátil no abdome', nao:'sem massa pulsátil no abdome' },
      {tipo:'tri', id:'lc-gatilho', rot:'Ponto-gatilho miofascial (o do glúteo mínimo dá dor nas nádegas e atrás da coxa e da perna, imitando ciatalgia)', na:'ponto-gatilho miofascial',
        sim:'ponto-gatilho miofascial[: {d}]', nao:'sem ponto-gatilho miofascial', det:{tipo:'texto', ph:'onde'} }
    ]},
    conduta: { rot: 'Lombalgia e cervicalgia — conduta', itens: [
      {tipo:'escolha', id:'lc-urgencia', rot:'Urgência (SAMU, UPA, regulação da neurocirurgia)', na:'encaminhamento à urgência', lacuna:false, multi:true, tpl:'encaminho à urgência por {d}', opts:[
        {v:'cauda', rot:'perda de força ou sensibilidade nas pernas, anestesia em sela, perda do controle da bexiga ou do intestino (cauda equina ou cone medular)', frase:'suspeita de cauda equina ou cone medular'},
        {v:'medula', rot:'fraqueza nos quatro membros ou nas pernas, nível sensitivo, espasticidade, Babinski ou Hoffmann, Lhermitte (compressão medular)', frase:'suspeita de compressão medular'},
        {v:'forca', rot:'perda de força progressiva, medida de forma objetiva', frase:'perda de força progressiva medida de forma objetiva'},
        {v:'infeccao', rot:'suspeita de infecção na coluna (dor com febre, imunossuprimido ou droga endovenosa)', frase:'suspeita de infecção na coluna'},
        {v:'cancer', rot:'câncer conhecido acometendo a coluna', frase:'câncer conhecido acometendo a coluna'},
        {v:'trauma', rot:'trauma recente com suspeita de fratura ou luxação', frase:'trauma recente com suspeita de fratura ou luxação'},
        {v:'refrataria', rot:'dor lombar intensa que não cede com tratamento clínico otimizado', frase:'dor lombar intensa que não cede com tratamento clínico otimizado'}] },
      {tipo:'escolha', id:'lc-imagem', rot:'Imagem da coluna (sem sinal de alerta, não pedir: muita alteração de imagem não tem relação com a dor)', na:'imagem da coluna', lacuna:false, opts:[
        {v:'nao', rot:'sem sinal de alerta: sem imagem', frase:'sem sinal de alerta, não solicito imagem'},
        {v:'pedida', rot:'sinal de alerta sem urgência: ressonância (de preferência) ou tomografia', frase:'solicito ressonância ou tomografia por sinal de alerta'},
        {v:'cirurgia', rot:'sinal de alerta e sem acesso à imagem na APS: Neurocirurgia ou Ortopedia', frase:'encaminho à Neurocirurgia ou Ortopedia por sinal de alerta, sem acesso à imagem na APS'},
        {v:'secundaria', rot:'sinal de alerta, sem acesso à imagem e suspeita de causa secundária: Medicina Interna', frase:'encaminho à Medicina Interna por suspeita de causa secundária, sem acesso à imagem na APS'}] },
      {tipo:'escolha', id:'lc-lab', rot:'Exames de sangue e urina', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'cancer', rot:'suspeita de câncer: VHS', frase:'VHS por suspeita de câncer'},
        {v:'infeccao', rot:'suspeita de infecção: hemograma, VHS e urina', frase:'hemograma, VHS e urina por suspeita de infecção'}] },
      {tipo:'escolha', id:'lc-orienta', rot:'Sem sinal de alerta: orientações', lacuna:false, multi:true, tpl:'oriento sobre {d}', opts:[
        {v:'benigna', rot:'dor benigna', frase:'o caráter benigno da dor'},
        {v:'atividade', rot:'manter a atividade', frase:'manter a atividade'},
        {v:'postura', rot:'postura nas atividades do dia', frase:'postura nas atividades do dia (dormir, levantar, sentar, pegar peso, varrer e passar roupa)'},
        {v:'grupo', rot:'grupo de atividade física ou de práticas integrativas', frase:'grupo de atividade física ou de práticas integrativas'},
        {v:'trabalho', rot:'voltar ao trabalho com limitação, ao melhorar', frase:'voltar ao trabalho com limitação, ao melhorar'}] },
      {tipo:'escolha', id:'lc-reavalia', rot:'Seguimento', na:'seguimento', lacuna:false, opts:[
        {v:'2-4', rot:'retorno em 2 e 4 semanas, com novo exame da coluna', frase:'retorno em 2 e 4 semanas, com novo exame da coluna'}] },
      {tipo:'escolha', id:'lc-equipe', rot:'Dor crônica inespecífica', na:'equipe multiprofissional', lacuna:false, opts:[
        {v:'discute', rot:'discutida com a equipe multiprofissional', frase:'discuto com a equipe multiprofissional (fisioterapeuta, educador físico e psicólogo)'}] },
      {tipo:'escolha', id:'lc-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'radiculopatia', rot:'Neurocirurgia ou Ortopedia (radiculopatia sem melhora após 6 semanas de tratamento otimizado)', frase:'à Neurocirurgia ou Ortopedia, por radiculopatia sem melhora após 6 semanas de tratamento otimizado (medicamento, exercício e fisioterapia)'},
        {v:'estenose', rot:'Neurocirurgia ou Ortopedia (claudicação neurogênica suspeita, estenose de canal ou espondilolistese com radiculopatia)', frase:'à Neurocirurgia ou Ortopedia, por suspeita de claudicação neurogênica, estenose de canal ou espondilolistese com radiculopatia'},
        {v:'cervical', rot:'Ortopedia ou Neurocirurgia (cervicalgia com artrite reumatoide definida, estenose de canal cervical ou mielopatia não operada)', frase:'à Ortopedia ou Neurocirurgia, por cervicalgia com artrite reumatoide definida, estenose de canal cervical ou mielopatia não operada'},
        {v:'aorta', rot:'Cirurgia geral e ultrassonografia (massa pulsátil no abdome: aneurisma de aorta)', frase:'à Cirurgia geral, com ultrassonografia de abdome, por massa pulsátil no abdome (suspeita de aneurisma de aorta)'},
        {v:'reuma', rot:'Reumatologia (dor crônica inflamatória)', frase:'à Reumatologia, por dor crônica inflamatória'},
        {v:'trabalho', rot:'Medicina do Trabalho ou Saúde do Trabalhador (dor crônica relacionada ao trabalho)', frase:'à Medicina do Trabalho ou Saúde do Trabalhador, por dor crônica relacionada ao trabalho'},
        {v:'dor', rot:'serviço de dor (dor crônica inespecífica sem melhora após 6 meses de tratamento otimizado)', frase:'ao serviço de dor (fisiatria), por dor crônica inespecífica sem melhora após 6 meses de tratamento otimizado'},
        {v:'dorsem', rot:'Neurocirurgia ou Ortopedia (dor crônica inespecífica sem melhora após 6 meses, sem serviço de dor)', frase:'à Neurocirurgia ou Ortopedia, por dor crônica inespecífica sem melhora após 6 meses de tratamento otimizado, na falta de serviço de dor'}] }
    ]}
  }
});

/* ---------- 5. Neuropatia periférica ---------- */
QUADROS.push({
  id: 'neuropatia', nome: 'Neuropatia periférica', queixa: 'neuropatia-periferica', grupo: 'A2-Neuromusculoesqueletica',
  fonte: 'MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022 · MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012',
  ciap: ['N94', 'N05', 'N93'], cid: ['G62', 'G63', 'G56'],
  blocos: {
    anamnese: { rot: 'Neuropatia periférica — sintomas e causas', itens: [
      {tipo:'escolha', id:'np-distribuicao', rot:'Onde começou e como subiu', na:'distribuição dos sintomas', multi:true, opts:[
        {v:'bota', rot:'pelos dois pés, simétrico, "em bota" (o típico)', frase:'sintomas simétricos, começando pelos dois pés', so:true},
        {v:'assimetrico', rot:'assimétrico', frase:'sintomas assimétricos'},
        {v:'naopes', rot:'não começou pelos pés', frase:'sintomas que não começaram pelos pés'}] },
      {tipo:'tri', id:'np-inicio', rot:'Início agudo ou piora rápida (em dias a poucas semanas)', na:'início agudo ou piora rápida', junto:true,
  sim:'início agudo ou piora rápida dos sintomas[: {d}]', nao:'nega início agudo ou piora rápida dos sintomas', det:{tipo:'texto', ph:'há quantos dias, quanto piorou'} },
      {tipo:'tri', id:'np-sintomas', rot:'Dormência, formigamento, queimação, choque; piora à noite', na:'sintomas sensitivos', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas sensitivos', nao:'nega dormência, formigamento, queimação e choque',
        det:{tipo:'escolha', multi:true, opts:[{v:'dormencia', rot:'dormência'}, {v:'formigamento', rot:'formigamento'}, {v:'queimacao', rot:'queimação'},
          {v:'choque', rot:'choque'}, {v:'noite', rot:'piora à noite'}]} },
      {tipo:'tri', id:'np-motor', rot:'Fraqueza ou tropeço', na:'fraqueza e tropeço', junto:true,
        sim:'refere {d}', simSemDet:'refere fraqueza ou tropeço', nao:'nega fraqueza e tropeço',
        det:{tipo:'escolha', multi:true, opts:[{v:'fraqueza', rot:'fraqueza'}, {v:'tropeco', rot:'tropeço'}]} },
      {tipo:'tri', id:'np-autonomica', rot:'Tontura ao levantar, boca seca, suor alterado, intestino ou bexiga diferentes (autonômica)', na:'sintomas autonômicos', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas autonômicos', nao:'nega tontura ao levantar, boca seca, alteração do suor e alteração do intestino ou da bexiga',
        det:{tipo:'escolha', multi:true, opts:[{v:'tontura', rot:'tontura ao levantar'}, {v:'boca', rot:'boca seca'}, {v:'suor', rot:'alteração do suor'},
          {v:'intestino', rot:'alteração do intestino ou da bexiga'}]} },
      {tipo:'tri', id:'np-mao', rot:'Parestesia na mão (túnel do carpo)', na:'parestesia na mão', lacuna:false, junto:true,
        sim:'parestesia na mão[: {d}]', nao:'nega parestesia na mão', det:{tipo:'texto', ph:'qual mão, quais dedos, piora à noite'} },
      {tipo:'tri', id:'np-glicemia', rot:'Glicemia alterada no passado que nunca foi repetida', na:'glicemia alterada não repetida',
        sim:'glicemia alterada no passado, sem repetição[: {d}]', nao:'nega glicemia alterada no passado sem repetição', det:{tipo:'texto', ph:'valor, quando'} },
      {tipo:'tri', id:'np-metformina', rot:'Usa metformina (causa deficiência de vitamina B12)', na:'uso de metformina', junto:true,
        sim:'em uso de metformina[: {d}]', nao:'nega uso de metformina', det:{tipo:'texto', ph:'desde quando'} },
      {tipo:'tri', id:'np-b6', rot:'Toma complexo B ou vitamina B6 por conta própria (o excesso de B6 também causa neuropatia)', na:'complexo B ou vitamina B6', junto:true,
        sim:'toma complexo B ou vitamina B6 por conta própria[: {d}]', nao:'nega uso de complexo B ou vitamina B6 por conta própria', det:{tipo:'texto', ph:'qual, dose, há quanto tempo'} },
      {tipo:'tri', id:'np-toxicos', rot:'Quimioterapia, isoniazida, nitrofurantoína, amiodarona, colchicina; chumbo, mercúrio ou solvente', na:'neurotóxicos',
        sim:'uso de medicamento ou exposição neurotóxica[: {d}]', nao:'nega quimioterapia, isoniazida, nitrofurantoína, amiodarona, colchicina e exposição a chumbo, mercúrio e solvente', det:{tipo:'texto', ph:'qual, desde quando'} },
      {tipo:'tri', id:'np-doencas', rot:'HIV, hanseníase, doença renal ou hepática, doença da tireoide, lúpus, artrite reumatoide ou câncer', na:'doenças associadas', junto:true,
        sim:'refere {d}', simSemDet:'refere doença associada à neuropatia', nao:'nega HIV, hanseníase, doença renal ou hepática, doença da tireoide, lúpus, artrite reumatoide e câncer',
        det:{tipo:'escolha', multi:true, opts:[{v:'hiv', rot:'HIV'}, {v:'hanseniase', rot:'hanseníase'}, {v:'renal', rot:'doença renal'}, {v:'hepatica', rot:'doença hepática'},
          {v:'tireoide', rot:'doença da tireoide'}, {v:'lupus', rot:'lúpus'}, {v:'ar', rot:'artrite reumatoide'}, {v:'cancer', rot:'câncer'}]} },
      {tipo:'tri', id:'np-absorcao', rot:'Má absorção, desnutrição ou anemia', na:'má absorção, desnutrição ou anemia', junto:true,
        sim:'refere má absorção, desnutrição ou anemia', nao:'nega má absorção, desnutrição e anemia' },
      {tipo:'tri', id:'np-familiar', rot:'Parentes com neuropatia hereditária', na:'neuropatia hereditária na família', junto:true,
        sim:'parente com neuropatia hereditária', nao:'nega parente com neuropatia hereditária' },
      QUEDAS
    ]},
    ef: { rot: 'Neuropatia periférica — pés, sensibilidade e marcha', itens: [
      PES,
      PULSOS,
      E_PE_MONO,
      E_PE_VIBRA,
      E_PE_RISCO,
      {tipo:'tri', id:'np-fina', rot:'Sensibilidade térmica e dolorosa (fibra fina)', na:'sensibilidade térmica e dolorosa',
        sim:'sensibilidade térmica ou dolorosa diminuída[: {d}]', nao:'sensibilidade térmica e dolorosa preservadas', det:{tipo:'texto', ph:'onde, até que nível'} },
      {tipo:'tri', id:'np-grossa', rot:'Tato, posição e reflexo aquileu (fibra grossa)', na:'tato, posição e reflexo aquileu', junto:true,
        sim:'alteração de tato, posição ou reflexo aquileu[: {d}]', nao:'tato, posição e reflexo aquileu sem alterações', det:{tipo:'texto', ph:'o quê'} },
      {tipo:'tri', id:'np-forca', rot:'Força distal, atrofia, hipotonia, fasciculação, reflexos', na:'força distal e reflexos',
        sim:'fraqueza distal, atrofia, hipotonia, fasciculação ou alteração de reflexos[: {d}]', nao:'sem fraqueza distal, atrofia, hipotonia e fasciculação, com reflexos preservados', det:{tipo:'texto', ph:'o quê, onde'} },
      {tipo:'tri', id:'np-romberg', rot:'Romberg e marcha (ataxia sensitiva)', na:'Romberg e marcha', junto:true,
        sim:'Romberg ou marcha alterados (ataxia sensitiva)[: {d}]', nao:'Romberg e marcha sem alterações', det:{tipo:'texto', ph:'o quê'} },
      E_ORTOSTATICA,
      E_TINEL,
      E_DN4,
      {tipo:'texto', id:'np-escore', rot:'Escore de comprometimento neuropático (vibração, temperatura, dor e aquileu dos dois lados: 3 a 5 leve, 6 a 8 moderada, 9 a 10 grave)', curto:true,
        ph:'7', fmt:'escore de comprometimento neuropático {v}'}
    ]},
    conduta: { rot: 'Neuropatia periférica — investigação e encaminhamento', itens: [
      {tipo:'escolha', id:'np-via', rot:'Onde conduzir', na:'condução do caso', lacuna:false, opts:[
        {v:'leve', rot:'quadro leve com causa tratável provável: tratar a causa, sem bateria extensa', frase:'quadro leve com causa tratável provável (diabetes, álcool, medicamento, hipotireoidismo): trato a causa, sem bateria extensa de exames'},
        {v:'tipica', rot:'polineuropatia típica com causa definida: conduzir na APS', frase:'polineuropatia típica com causa definida (diabetes, álcool, quimioterapia): conduzo na APS'}] },
      {tipo:'escolha', id:'np-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'minima', rot:'investigação mínima (glicose, B12, TSH, eletroforese de proteínas, VSG, hemograma, creatinina, sódio, potássio, cálcio, TGO, TGP, GGT, fosfatase alcalina, HIV)', frase:'investigação mínima (glicose, vitamina B12, TSH, eletroforese de proteínas, VSG, hemograma, creatinina, sódio, potássio, cálcio, TGO, TGP, GGT, fosfatase alcalina e teste rápido ou sorologia de HIV)'},
        {v:'dm', rot:'diabetes: glicemia de jejum e HbA1c na mesma amostra', frase:'glicemia de jejum e HbA1c na mesma amostra'},
        {v:'carencia', rot:'má absorção, alcoolismo, desnutrição ou anemia: ferro, ferritina, transferrina, ácido fólico e B12', frase:'ferro, ferritina, transferrina, ácido fólico e vitamina B12'},
        {v:'enmg', rot:'eletroneuromiografia (quadro grave, progressivo ou atípico, ou HIV, lúpus ou artrite reumatoide)', frase:'eletroneuromiografia'}] },
      {tipo:'escolha', id:'np-pes-orienta', rot:'Pé com perda de sensibilidade', na:'autocuidado dos pés', lacuna:false, opts:[
        {v:'autocuidado', rot:'autocuidado diário orientado', frase:'oriento autocuidado diário dos pés: olhar os pés e o calçado por dentro, lavar e secar entre os dedos, cortar as unhas certo e nunca andar descalço'}] },
      {tipo:'escolha', id:'np-visita', rot:'Idoso com ataxia sensitiva', na:'prevenção de queda', lacuna:false, opts:[
        {v:'vd', rot:'visita domiciliar e adaptação da casa', frase:'idoso com ataxia sensitiva: programo visita domiciliar e adaptação da casa para prevenir queda'}] },
      {tipo:'escolha', id:'np-urgencia', rot:'Urgência', na:'encaminhamento à urgência', lacuna:false, multi:true, tpl:'encaminho à urgência por {d}', opts:[
        {v:'gb', rot:'polineuropatia de início agudo (suspeita de Guillain-Barré)', frase:'polineuropatia de início agudo (suspeita de síndrome de Guillain-Barré)'},
        {v:'pe', rot:'pé insensível com úlcera infectada, infecção que se espalha, isquemia crítica, gangrena ou Charcot agudo (urgência no mesmo dia)', frase:'pé insensível com úlcera infectada, infecção que se espalha, isquemia crítica, gangrena ou suspeita de Charcot agudo'}] },
      {tipo:'escolha', id:'np-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'neuro', rot:'Neurologia (desmielinizante, atípica, sem causa após a investigação, progressiva ou refratária)', frase:'à Neurologia, por polineuropatia desmielinizante, atípica, sem causa depois da investigação inicial, ou progressiva ou refratária apesar de tratar a causa e de tricíclico ou gabapentina'},
        {v:'dor', rot:'Tratamento da Dor (neuropatia diabética refratária a dois fármacos, diabetes compensado)', frase:'ao Tratamento da Dor, por neuropatia diabética refratária a dois fármacos em dose otimizada, com diabetes compensado'},
        {v:'ulcera', rot:'serviço mais especializado (úlcera no pé sem profissional ou material na APS)', frase:'a serviço mais especializado, por úlcera no pé sem profissional ou material para tratar na APS'},
        {v:'complexo', rot:'serviço de nível mais complexo (deformidade importante do pé, pulsos ausentes ou suspeita de isquemia do membro)', frase:'a serviço de nível mais complexo, por deformidade importante do pé, pulsos ausentes ou suspeita de isquemia do membro'},
        {v:'carpo', rot:'Neurocirurgia ou cirurgia da mão (túnel do carpo com déficit de força ou atrofia tenar, déficit sensitivo contínuo por 3 meses ou mais, ou mais de 6 meses sem resposta)', frase:'à Neurocirurgia ou cirurgia da mão, por túnel do carpo com déficit de força ou atrofia tenar, déficit sensitivo contínuo por 3 meses ou mais, ou mais de 6 meses sem resposta ao tratamento otimizado'},
        {v:'trabalho', rot:'Saúde do Trabalhador (túnel do carpo ligado ao trabalho há mais de 3 meses)', frase:'à Saúde do Trabalhador, por túnel do carpo ligado ao trabalho há mais de 3 meses'}] }
    ]}
  }
});

/* ---------- 6. Ombro, joelho e artrose ---------- */
QUADROS.push({
  id: 'ombro-joelho', nome: 'Ombro, joelho e artrose', queixa: 'ombro-joelho-artrose', grupo: 'A2-Neuromusculoesqueletica',
  fonte: 'TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016 · MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024',
  ciap: ['L92', 'L90', 'L91', 'L89', 'L15'], cid: ['M17', 'M16', 'M19', 'M75', 'M25'],
  blocos: {
    anamnese: { rot: 'Ombro, joelho e artrose — dor articular', itens: [
      {tipo:'escolha', id:'oj-articulacao', rot:'Quais articulações', na:'articulações', multi:true, tpl:'dor em {d}', opts:[
        {v:'joelho', rot:'joelho', frase:'joelho'}, {v:'ombro', rot:'ombro', frase:'ombro'}, {v:'quadril', rot:'quadril', frase:'quadril'},
        {v:'maos', rot:'mãos', frase:'mãos'}, {v:'tornozelo', rot:'tornozelo ou pé', frase:'tornozelo ou pé'}] },
      E_TEMPO,
      {tipo:'escolha', id:'oj-padrao', rot:'Padrão da dor', na:'padrão da dor', junto:true, opts:[
        {v:'mecanico', rot:'início insidioso, piora com a atividade, melhora com o repouso', frase:'início insidioso, com piora pela atividade e melhora pelo repouso'},
        {v:'outro', rot:'sem padrão mecânico', frase:'sem padrão mecânico'}] },
      {tipo:'escolha', id:'oj-rigidez', rot:'Rigidez pela manhã ou depois do repouso', na:'rigidez matinal', junto:true, opts:[
        {v:'curta', rot:'menos de 30 minutos (artrose)', frase:'rigidez matinal por menos de 30 minutos'},
        {v:'longa', rot:'mais de 30 minutos', frase:'rigidez matinal por mais de 30 minutos'},
        {v:'nao', rot:'sem rigidez', frase:'sem rigidez matinal'}] },
      E_CONSTITUCIONAL,
      {tipo:'tri', id:'oj-noturna', rot:'Dor à noite', na:'dor noturna', junto:true, sim:'dor noturna', nao:'nega dor noturna' },
      {tipo:'tri', id:'oj-outras', rot:'Outras articulações inchadas', na:'outras articulações inchadas', junto:true,
        sim:'outras articulações inchadas[: {d}]', nao:'nega outras articulações inchadas', det:{tipo:'texto', ph:'quais'} },
      {tipo:'tri', id:'oj-psoriase', rot:'Psoríase, doença inflamatória intestinal ou história familiar de psoríase', na:'psoríase e doença inflamatória intestinal', junto:true,
        sim:'refere {d}', simSemDet:'refere psoríase, doença inflamatória intestinal ou história familiar de psoríase', nao:'nega psoríase, doença inflamatória intestinal e história familiar de psoríase',
        det:{tipo:'escolha', multi:true, opts:[{v:'psoriase', rot:'psoríase'}, {v:'dii', rot:'doença inflamatória intestinal'}, {v:'hf', rot:'história familiar de psoríase'}]} },
      {tipo:'tri', id:'oj-joelho', rot:'Joelho: trauma esportivo, derrame logo depois, bloqueio, falseio, dificuldade para agachar ou ajoelhar', na:'sintomas mecânicos do joelho', lacuna:false,
        sim:'joelho com {d}', simSemDet:'joelho com sintomas mecânicos', nao:'nega, no joelho, trauma esportivo, derrame, bloqueio, falseio e dificuldade para agachar ou ajoelhar',
        det:{tipo:'escolha', multi:true, opts:[{v:'trauma', rot:'trauma esportivo'}, {v:'derrame', rot:'derrame logo depois do trauma'}, {v:'bloqueio', rot:'bloqueio'},
          {v:'falseio', rot:'falseio'}, {v:'agachar', rot:'dificuldade para agachar ou ajoelhar'}]} },
      {tipo:'tri', id:'oj-ombro', rot:'Ombro: trauma, luxação prévia (quantas vezes), limitação para elevar o braço', na:'queixas do ombro', lacuna:false,
        sim:'ombro: {d}', simSemDet:'ombro com trauma, luxação prévia ou limitação para elevar o braço', nao:'nega, no ombro, trauma, luxação prévia e limitação para elevar o braço',
        det:{tipo:'texto', ph:'trauma; luxação prévia, quantas vezes; limitação para elevar o braço'} },
      {tipo:'tri', id:'oj-limita', rot:'A dor limita o dia: andar, escada, vestir, trabalho', na:'limitação nas atividades',
        sim:'dor limita {d}', simSemDet:'dor limita as atividades do dia', nao:'nega limitação para andar, subir escada, vestir-se e trabalhar',
        det:{tipo:'escolha', multi:true, opts:[{v:'andar', rot:'andar'}, {v:'escada', rot:'subir escada'}, {v:'vestir', rot:'vestir-se'}, {v:'trabalho', rot:'o trabalho'}]} },
      E_TRABALHO,
      E_AINE,
            E_TRATOU
    ]},
    ef: { rot: 'Ombro, joelho e artrose — exame da articulação', itens: [
      {tipo:'texto', id:'oj-onde-ef', rot:'Articulação examinada', curto:true, ph:'joelho direito', fmt:'exame da articulação: {v}'},
      {tipo:'tri', id:'oj-inspecao', rot:'Inspeção: aumento ósseo, nódulos de Heberden e Bouchard, alinhamento, atrofia muscular', na:'inspeção da articulação',
        sim:'alteração à inspeção (aumento ósseo, nódulos de Heberden ou Bouchard, desalinhamento ou atrofia muscular)[: {d}]', nao:'sem aumento ósseo, nódulos de Heberden e Bouchard, desalinhamento e atrofia muscular', det:{tipo:'texto', ph:'o quê, onde'} },
      {tipo:'tri', id:'oj-calor', rot:'Calor ou derrame (artrose: sem calor, derrame pequeno e frio)', na:'calor e derrame', junto:true,
        sim:'articulação com calor ou derrame[: {d}]', nao:'articulação sem calor e sem derrame', det:{tipo:'texto', ph:'o quê, tamanho do derrame'} },
      {tipo:'tri', id:'oj-interlinha', rot:'Dor na interlinha e periarticular', na:'dor na interlinha e periarticular', junto:true,
        sim:'dor à palpação da interlinha e periarticular', nao:'sem dor à palpação da interlinha e periarticular' },
      {tipo:'tri', id:'oj-amplitude', rot:'Amplitude: crepitação, perda de movimento, dor à mobilização, fraqueza', na:'amplitude de movimento',
        sim:'alteração da amplitude: {d}', simSemDet:'alteração à mobilização', nao:'sem crepitação, perda de movimento, dor à mobilização e fraqueza',
        det:{tipo:'escolha', multi:true, opts:[{v:'crepitacao', rot:'crepitação'}, {v:'perda', rot:'perda de movimento'}, {v:'dor', rot:'dor à mobilização'}, {v:'fraqueza', rot:'fraqueza'}]} },
      {tipo:'escolha', id:'oj-origem', rot:'Dor à mobilização: passiva suave (articular) × ativa e contra resistência (tendão, bursa)', na:'origem da dor à mobilização', opts:[
        {v:'articular', rot:'passiva suave: origem articular', frase:'dor à mobilização passiva suave, sugerindo origem articular'},
        {v:'extra', rot:'ativa e contra resistência: origem extra-articular', frase:'dor à mobilização ativa e contra resistência, sugerindo origem extra-articular (tendão ou bursa)'}] },
      {tipo:'escolha', id:'oj-joelho-testes', rot:'Joelho: McMurray (menisco); gaveta anterior, Lachman e pivot-shift (ligamento)', na:'testes de menisco e ligamento do joelho', lacuna:false, multi:true, opts:[
        {v:'neg', rot:'negativos', frase:'McMurray, gaveta anterior, Lachman e pivot-shift negativos', so:true},
        {v:'mcmurray', rot:'McMurray positivo', frase:'McMurray positivo'}, {v:'gaveta', rot:'gaveta anterior positiva', frase:'gaveta anterior positiva'},
        {v:'lachman', rot:'Lachman positivo', frase:'Lachman positivo'}, {v:'pivot', rot:'pivot-shift positivo', frase:'pivot-shift positivo'}] },
      {tipo:'escolha', id:'oj-aperto', rot:'Mãos: teste do aperto das metacarpofalangeanas (artrite reumatoide)', na:'teste do aperto das mãos', lacuna:false, opts:[
        {v:'neg', rot:'negativo', frase:'teste do aperto das metacarpofalangeanas negativo'},
        {v:'pos', rot:'positivo', frase:'teste do aperto das metacarpofalangeanas positivo'}] },
      E_TINEL
    ]},
    conduta: { rot: 'Ombro, joelho e artrose — conduta', itens: [
      {tipo:'escolha', id:'oj-dx', rot:'Artrose de joelho ou quadril', na:'diagnóstico clínico de artrose', lacuna:false, opts:[
  {v:'clinico', rot:'diagnóstico clínico, sem laboratório nem líquido sinovial', frase:'diagnóstico clínico de artrose, sem exame laboratorial de rotina nem análise de líquido sinovial'}] },
      {tipo:'escolha', id:'oj-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'rx', rot:'radiografia anteroposterior e perfil com apoio bipodal (joelho, quadril)', frase:'radiografia anteroposterior e perfil com apoio bipodal'},
        {v:'usg', rot:'ultrassonografia (tendão, bursa, partes moles)', frase:'ultrassonografia de tendão, bursa e partes moles'},
        {v:'rm', rot:'ressonância do joelho (suspeita de lesão meniscal ou ligamentar)', frase:'ressonância do joelho por suspeita de lesão meniscal ou ligamentar'},
        {v:'artrite', rot:'suspeita de artrite inflamatória: fator reumatoide, PCR ou VHS e radiografia de mãos, punhos e pés', frase:'fator reumatoide, PCR ou VHS e radiografia de mãos, punhos e pés, por suspeita de artrite inflamatória'}] },
      {tipo:'escolha', id:'oj-peso', rot:'Sobrepeso ou obesidade', na:'perda de peso', lacuna:false, opts:[
        {v:'perder', rot:'perder ao menos 10% do peso', frase:'oriento perda de ao menos 10% do peso, que trata a artrose de joelho e quadril'}] },
      {tipo:'escolha', id:'oj-auxilio', rot:'Casos graves', na:'auxílio à marcha', lacuna:false, opts:[
        {v:'bengala', rot:'bengala', frase:'indico bengala'}, {v:'muleta', rot:'muleta', frase:'indico muleta'}, {v:'andador', rot:'andador', frase:'indico andador'}] },
      {tipo:'escolha', id:'oj-urgencia', rot:'Emergência', na:'encaminhamento à emergência', lacuna:false, multi:true, tpl:'encaminho à emergência por {d}', opts:[
        {v:'trauma', rot:'trauma com suspeita de fratura ou luxação (joelho, ombro, quadril, tornozelo ou pé)', frase:'trauma com suspeita de fratura ou luxação'},
        {v:'septica', rot:'monoartrite sem diagnóstico, sobretudo com febre ou mal-estar e fator de risco (suspeita de artrite séptica)', frase:'monoartrite sem diagnóstico estabelecido, com suspeita de artrite séptica'}] },
      {tipo:'escolha', id:'oj-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'refrataria', rot:'Ortopedia (artrose de quadril, joelho, tornozelo ou ombro com dor refratária a 6 meses de tratamento otimizado, ou grande prejuízo nas atividades)', frase:'à Ortopedia, por artrose com dor refratária a 6 meses de tratamento otimizado (medicamento, exercício e fisioterapia) ou grande prejuízo nas atividades'},
        {v:'dor', rot:'serviço de dor (sem indicação ou condição para cirurgia e sem melhora em 6 meses)', frase:'ao serviço de dor (fisiatria, acupuntura), por falta de indicação ou de condição para cirurgia e sem melhora em 6 meses'},
        {v:'secundaria', rot:'Reumatologia (suspeita de artrose secundária a artrite inflamatória)', frase:'à Reumatologia, por suspeita de artrose secundária a artrite inflamatória'},
        {v:'ar', rot:'Reumatologia (artrite em 3 ou mais articulações com rigidez matinal acima de 30 minutos, ou teste do aperto positivo)', frase:'à Reumatologia, por alta suspeita de artrite reumatoide: artrite em 3 ou mais articulações com rigidez matinal acima de 30 minutos ou teste do aperto positivo'},
        {v:'mao', rot:'Ortopedia (artrose de mão com deformidade e prejuízo funcional, ou dor refratária a 6 meses)', frase:'à Ortopedia, por artrose de mão com deformidade e prejuízo funcional, ou dor refratária a 6 meses'},
        {v:'bursite', rot:'Ortopedia (bursite ou tendinite sem resposta a 4 meses de tratamento otimizado com fortalecimento)', frase:'à Ortopedia, por bursite ou tendinite sem resposta a 4 meses de tratamento otimizado com fortalecimento'},
        {v:'lesao', rot:'Ortopedia (lesão meniscal ou ligamentar suspeita, com potencial cirúrgico ou sem acesso à ressonância)', frase:'à Ortopedia, por suspeita de lesão meniscal ou ligamentar com potencial cirúrgico ou sem acesso à ressonância'},
        {v:'manguito', rot:'Ortopedia (ombro: ruptura total do manguito, ruptura parcial em progressão ou com dor refratária, luxação recorrente)', frase:'à Ortopedia, por ombro com ruptura total do manguito, ruptura parcial em progressão ou com dor refratária, ou luxação recorrente'},
        {v:'trabalho', rot:'Medicina do Trabalho ou Saúde do Trabalhador (dor articular há mais de 3 meses ligada ao trabalho)', frase:'à Medicina do Trabalho ou Saúde do Trabalhador, por dor articular há mais de 3 meses ligada ao trabalho'}] }
    ]}
  }
});

/* ---------- 7. Tontura e vertigem ---------- */
QUADROS.push({
  id: 'tontura', nome: 'Tontura / vertigem', queixa: 'tontura-vertigem', grupo: 'A2-Neuromusculoesqueletica',
  fonte: 'MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023',
  ciap: ['N17', 'H82'], cid: ['R42', 'H81'],
  blocos: {
    anamnese: { rot: 'Tontura e vertigem — central × periférica', itens: [
      {tipo:'escolha', id:'tv-tipo', rot:'O que é a "tontura"', na:'tipo de tontura', opts:[
        {v:'vertigem', rot:'tudo girando (vertigem)', frase:'tontura do tipo vertigem (tudo girando)'},
        {v:'presincope', rot:'quase desmaiar (pré-síncope)', frase:'tontura do tipo pré-síncope (quase desmaiar)'},
        {v:'desequilibrio', rot:'desequilíbrio', frase:'tontura do tipo desequilíbrio'},
        {v:'vazia', rot:'cabeça vazia', frase:'tontura do tipo cabeça vazia'}] },
      {tipo:'escolha', id:'tv-duracao', rot:'Quanto dura', na:'duração dos episódios', junto:true, opts:[
        {v:'curta', rot:'menos de 1 minuto (sugere VPPB)', frase:'episódios de menos de 1 minuto'},
        {v:'horas', rot:'20 minutos a horas (sugere Ménière)', frase:'episódios de 20 minutos a horas'},
        {v:'dias', rot:'contínua por dias (sugere neurite)', frase:'tontura contínua por dias'}] },
      {tipo:'tri', id:'tv-posicao', rot:'Vem ao virar na cama, deitar, levantar, olhar para cima ou se inclinar', na:'gatilho postural', junto:true,
        sim:'desencadeada por {d}', simSemDet:'desencadeada por mudança de posição', nao:'nega relação com virar na cama, deitar, levantar, olhar para cima e se inclinar',
        det:{tipo:'escolha', multi:true, opts:[{v:'virar', rot:'virar na cama'}, {v:'deitar', rot:'deitar'}, {v:'levantar', rot:'levantar'},
          {v:'cima', rot:'olhar para cima'}, {v:'inclinar', rot:'inclinar-se'}]} },
      {tipo:'tri', id:'tv-auditivo', rot:'Zumbido, perda de audição, ouvido tampado', na:'sintomas auditivos',
        sim:'refere {d}', simSemDet:'refere sintomas auditivos', nao:'nega zumbido, perda de audição e ouvido tampado',
        det:{tipo:'escolha', multi:true, opts:[{v:'zumbido', rot:'zumbido'}, {v:'hipoacusia', rot:'perda de audição'}, {v:'tampado', rot:'ouvido tampado'}]} },
      {tipo:'tri', id:'tv-neuro', rot:'Visão dupla, fala enrolada, fraqueza, formigamento, dificuldade de andar, dor de cabeça nova', na:'sintomas neurológicos', junto:true,
        sim:'refere {d}', simSemDet:'refere sintomas neurológicos associados', nao:'nega visão dupla, fala enrolada, fraqueza, formigamento, dificuldade de andar e dor de cabeça nova',
        det:{tipo:'escolha', multi:true, opts:[{v:'diplopia', rot:'visão dupla'}, {v:'fala', rot:'fala enrolada'}, {v:'fraqueza', rot:'fraqueza'},
          {v:'formigamento', rot:'formigamento'}, {v:'andar', rot:'dificuldade de andar'}, {v:'cefaleia', rot:'dor de cabeça nova'}]} },
      {tipo:'texto', id:'tv-horario', rot:'Horário de início dos sintomas (se houver suspeita de AVC)', na:'horário de início dos sintomas', lacuna:false, curto:true, ph:'hoje às 14h30', fmt:'início dos sintomas: {v}'},
      {tipo:'tri', id:'tv-antecedente', rot:'Infecção respiratória ou de ouvido recente, trauma de crânio, cirurgia de ouvido; migrânea ou Ménière na família', na:'antecedentes de ouvido, crânio e família',
        sim:'refere {d}', simSemDet:'refere antecedente de ouvido, crânio ou família', nao:'nega infecção respiratória ou de ouvido recente, trauma de crânio, cirurgia de ouvido e migrânea ou Ménière na família',
        det:{tipo:'escolha', multi:true, opts:[{v:'infeccao', rot:'infecção respiratória ou de ouvido recente'}, {v:'trauma', rot:'trauma de crânio'},
          {v:'cirurgia', rot:'cirurgia de ouvido'}, {v:'familia', rot:'migrânea ou Ménière na família'}]} },
      {tipo:'tri', id:'tv-medicamentos', rot:'Medicamento que dá tontura (anti-hipertensivo, diurético, antidepressivo, antipsicótico, anticonvulsivante, benzodiazepínico, antidiabético, relaxante muscular, aminoglicosídeo); álcool e cocaína', na:'medicamentos e substâncias que dão tontura',
        sim:'em uso de medicamento ou substância que dá tontura[: {d}]', nao:'nega medicamento ou substância que dê tontura', det:{tipo:'texto', ph:'qual'} },
      {tipo:'tri', id:'tv-presincope', rot:'Pré-síncope: última refeição, doença do coração, dor no peito, desmaio antes, morte súbita na família', na:'alerta cardíaco na pré-síncope', lacuna:false,
        sim:'pré-síncope com {d}', simSemDet:'pré-síncope com alerta cardíaco', nao:'nega doença do coração, dor no peito, desmaio prévio e morte súbita na família',
        det:{tipo:'escolha', multi:true, opts:[{v:'coracao', rot:'doença do coração'}, {v:'dor', rot:'dor no peito'}, {v:'desmaio', rot:'desmaio prévio'},
          {v:'morte', rot:'morte súbita na família'}]} },
      {tipo:'tri', id:'tv-noite', rot:'Idoso: a tontura piora à noite e no escuro', na:'piora à noite e no escuro', lacuna:false, junto:true,
        sim:'tontura que piora à noite e no escuro', nao:'nega piora da tontura à noite e no escuro' },
      {tipo:'tri', id:'tv-sentidos', rot:'Idoso: dificuldade para enxergar ou ouvir (déficit sensorial múltiplo)', na:'visão e audição', lacuna:false, junto:true,
        sim:'dificuldade para enxergar ou ouvir', nao:'nega dificuldade para enxergar ou ouvir' },
      QUEDAS
    ]},
    ef: { rot: 'Tontura e vertigem — exame vestibular', itens: [
      E_ORTOSTATICA,
      {tipo:'tri', id:'tv-ritmo', rot:'Ritmo cardíaco irregular', na:'ritmo cardíaco', junto:true,
        sim:'ritmo cardíaco irregular[: {d}]', nao:'ritmo cardíaco regular', det:{tipo:'texto', ph:'o quê'} },
      {tipo:'escolha', id:'tv-nistagmo', rot:'Nistagmo (olhar em todas as direções)', na:'nistagmo', opts:[
        {v:'nao', rot:'ausente', frase:'sem nistagmo'},
        {v:'periferico', rot:'horizontal ou rotatório, para com a fixação (periférico)', frase:'nistagmo horizontal ou rotatório que para com a fixação do olhar'},
        {v:'central', rot:'vertical, multidirecional ou que não para com a fixação (central)', frase:'nistagmo vertical, multidirecional ou que não para com a fixação do olhar'}] },
      {tipo:'escolha', id:'tv-dix', rot:'Dix-Hallpike nos dois lados (nistagmo com latência de até 20 segundos, fatigável: VPPB)', na:'Dix-Hallpike', lacuna:false, multi:true, opts:[
        {v:'neg', rot:'negativo dos dois lados', frase:'Dix-Hallpike negativo dos dois lados', so:true},
        {v:'d', rot:'positivo à direita', frase:'Dix-Hallpike positivo à direita'}, {v:'e', rot:'positivo à esquerda', frase:'Dix-Hallpike positivo à esquerda'}] },
      {tipo:'escolha', id:'tv-impulso', rot:'Teste do impulso cefálico (só na vertigem aguda contínua)', na:'impulso cefálico', lacuna:false, opts:[
        {v:'sacada', rot:'sacada ao virar para o lado afetado (periférico)', frase:'teste do impulso cefálico com sacada ao virar para o lado afetado (periférico)'},
        {v:'normal', rot:'normal, sem sacada (sugere central)', frase:'teste do impulso cefálico sem sacada (sugere causa central)'}] },
      {tipo:'escolha', id:'tv-skew', rot:'Teste de skew: cobrir e descobrir cada olho olhando para a frente', na:'teste de skew', lacuna:false, opts:[
        {v:'neg', rot:'sem desvio vertical', frase:'teste de skew sem desvio vertical do olho'},
        {v:'pos', rot:'desvio vertical do olho (tronco cerebral)', frase:'teste de skew com desvio vertical do olho (tronco cerebral)'}] },
      {tipo:'tri', id:'tv-cerebelo', rot:'Cerebelo e marcha: dedo-nariz, diadococinesia, Romberg e marcha de olhos abertos e fechados', na:'cerebelo e marcha',
        sim:'alteração ao dedo-nariz, à diadococinesia, ao Romberg ou à marcha[: {d}]', nao:'dedo-nariz, diadococinesia, Romberg e marcha sem alterações', det:{tipo:'texto', ph:'o quê, cai cedo no Romberg?'} },
      {tipo:'tri', id:'tv-otoscopia', rot:'Otoscopia: vesículas (Ramsay Hunt), otite média, colesteatoma', na:'otoscopia',
        sim:'alteração à otoscopia[: {d}]', nao:'otoscopia sem alterações', det:{tipo:'texto', ph:'vesículas, otite média, colesteatoma'} },
      E_FUNDO,
      E_NUCA,
      {tipo:'escolha', id:'tv-audicao', rot:'Audição: teste do sussurro', na:'teste do sussurro', opts:[
        {v:'ok', rot:'ouve dos dois lados', frase:'teste do sussurro normal dos dois lados'},
        {v:'reduzida', rot:'audição reduzida (fazer Weber e Rinne)', frase:'audição reduzida ao teste do sussurro'}] },
      {tipo:'texto', id:'tv-weber', rot:'Se a audição está reduzida: Weber e Rinne', ph:'Weber lateraliza para a direita; Rinne positivo', fmt:'Weber e Rinne: {v}'}
    ]},
    conduta: { rot: 'Tontura e vertigem — conduta', itens: [
      {tipo:'escolha', id:'tv-urgencia', rot:'Urgência (SAMU, UPA, hospital de referência do AVC)', na:'encaminhamento à urgência', lacuna:false, multi:true, tpl:'encaminho à urgência por {d}', opts:[
        {v:'focal', rot:'sinal neurológico focal: diplopia, borramento visual, disartria, parestesia, fraqueza, dismetria, ataxia (suspeita central)', frase:'vertigem com sinal neurológico focal e suspeita de causa central (AVC de fossa posterior)'},
        {v:'cefaleia', rot:'cefaleia nova junto com a vertigem, sobretudo occipital', frase:'cefaleia nova junto com a vertigem'},
        {v:'surdez', rot:'surdez súbita de um lado', frase:'surdez súbita de um lado'},
        {v:'nistagmo', rot:'nistagmo vertical, multidirecional ou que não para com a fixação do olhar', frase:'nistagmo vertical, multidirecional ou que não para com a fixação do olhar'},
        {v:'romberg', rot:'cai cedo e de forma abrupta no Romberg', frase:'queda precoce e abrupta no Romberg'},
        {v:'skew', rot:'desvio vertical do olho no teste de skew (tronco cerebral)', frase:'desvio vertical do olho ao teste de skew (tronco cerebral)'},
        {v:'andar', rot:'não consegue ficar de pé nem andar', frase:'incapacidade de ficar de pé e andar'},
        {v:'impulso', rot:'vertigem aguda e contínua com impulso cefálico normal', frase:'vertigem aguda e contínua com teste do impulso cefálico normal'},
        {v:'semresposta', rot:'neurite ou labirintite sem nenhuma resposta em 7 dias, ou sintoma incapacitante', frase:'neurite ou labirintite sem resposta em 7 dias ou sintoma incapacitante'},
        {v:'hospitalar', rot:'vertigem tão intensa que precisa de medicação hospitalar e hidratação', frase:'vertigem intensa que precisa de medicação hospitalar e hidratação'},
        {v:'ecg', rot:'ECG com arritmia de risco (TV, TSV paroxística rápida, QT longo ou curto, Brugada, BAV de 2º grau Mobitz II ou de 3º grau, bradicardia abaixo de 40 bpm, pausa acima de 3 segundos, disfunção de marca-passo)', frase:'ECG com arritmia de risco'}] },
      {tipo:'escolha', id:'tv-epley', rot:'VPPB', na:'manobra de Epley', lacuna:false, opts:[
        {v:'feita', rot:'manobra de Epley feita na consulta', frase:'realizo manobra de Epley na consulta'}] },
      {tipo:'escolha', id:'tv-exames', rot:'Exames', lacuna:false, multi:true, tpl:'solicito {d}', opts:[
        {v:'tsh', rot:'vertigem periférica com dúvida diagnóstica: TSH e glicemia de jejum ou HbA1c', frase:'TSH e glicemia de jejum ou HbA1c'},
        {v:'ecg', rot:'síncope ou pré-síncope com suspeita de arritmia: ECG', frase:'ECG'},
        {v:'glicemia', rot:'suspeita de hipoglicemia (sudorese, confusão, tremor, taquicardia): glicemia', frase:'glicemia'}] },
      {tipo:'escolha', id:'tv-orienta', rot:'Orientações', lacuna:false, multi:true, tpl:'oriento sobre {d}', opts:[
        {v:'lenta', rot:'melhora completa lenta, desequilíbrio por semanas a meses', frase:'melhora completa lenta, com possível desequilíbrio por semanas a meses'},
        {v:'volta', rot:'voltar se as crises não ficarem mais curtas', frase:'o retorno, se as crises não ficarem mais curtas'},
        {v:'sintomatico', rot:'o sintomático dá sono, tira a atenção e soma com o álcool', frase:'o risco de sono, perda de atenção e soma com o álcool no uso do sintomático'},
        {v:'devagar', rot:'pré-síncope: levantar devagar e meia elástica', frase:'levantar devagar e meia elástica, na pré-síncope'}] },
      {tipo:'escolha', id:'tv-ajuste', rot:'Pré-síncope por anti-hipertensivo ou vasodilatador', na:'ajuste do remédio na pré-síncope', lacuna:false, opts:[
        {v:'ajusto', rot:'remédio ajustado', frase:'pré-síncope por anti-hipertensivo ou vasodilatador: ajusto o remédio'}] },
      {tipo:'escolha', id:'tv-idoso', rot:'Desequilíbrio do idoso', lacuna:false, multi:true, opts:[
        {v:'sentidos', rot:'corrigir visão, audição e neuropatia', frase:'desequilíbrio do idoso: corrijo visão, audição e neuropatia'},
        {v:'vd', rot:'visita domiciliar e adaptação da casa (prevenir queda)', frase:'programo visita domiciliar e adaptação da casa para prevenir queda'}] },
      {tipo:'escolha', id:'tv-encaminha', rot:'Encaminhamento', lacuna:false, multi:true, tpl:'encaminho {d}', opts:[
        {v:'vppb', rot:'Otorrinolaringologia (VPPB com mais de 3 recorrências depois das manobras)', frase:'à Otorrinolaringologia, por VPPB com mais de 3 recorrências depois das manobras'},
        {v:'neurite', rot:'Otorrinolaringologia (neurite ou labirintite sem melhora progressiva em 15 dias, ou neuronite que volta em crises)', frase:'à Otorrinolaringologia, por neurite ou labirintite sem melhora progressiva em 15 dias de tratamento conservador, ou neuronite que volta em crises'},
        {v:'meniere', rot:'Otorrinolaringologia (suspeita de Ménière)', frase:'à Otorrinolaringologia, por suspeita de Ménière'},
        {v:'duvida', rot:'Otorrinolaringologia (vertigem periférica com dúvida depois de investigar medicamento, diabetes e tireoide)', frase:'à Otorrinolaringologia, por vertigem periférica com dúvida depois de investigar medicamento, diabetes e tireoide'},
        {v:'neuro', rot:'Neurologia (suspeita central já avaliada na emergência)', frase:'à Neurologia, por suspeita central já avaliada na emergência'}] }
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
