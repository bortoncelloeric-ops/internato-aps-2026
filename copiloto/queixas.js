/* Copiloto Clínico APS — conteúdo clínico.
 *
 * SÓ DADOS. Nenhuma função mora aqui: este é o arquivo que se edita toda semana,
 * e ter código no meio obrigaria a ler programação para achar onde escrever.
 *
 * REGRA DE OURO (herdada de 30-RECURSOS/medicina-wiki/CLAUDE.md):
 * sem fonte → marcar VERIFICAR, nunca inventar.
 * Hierarquia: MS (PNAB/CAB/PCDT/PNI) > SBMFC > sociedades.
 *
 * NADA ENTRA VAZIO. O projeto dr-house morreu com 108 seções "A preencher".
 * Seção sem conteúdo é omitida, não preenchida com placeholder — numa tela
 * clínica, red flags vazia lê como "não há com o que se preocupar".
 *
 * Item = string OU {t, f?, v?}
 *   t = texto · f = fonte só deste item · v:true = marca VERIFICAR
 * A fonte é obrigatória por seção; o item só sobrescreve quando difere.
 * Schema completo e instruções em CLAUDE.md desta pasta.
 */

const QUEIXAS = [];

/* =====================================================================
 * PSIQUIATRIA — rodízio de Saúde Mental e Saúde Coletiva (CAPS III + HELR),
 * 07/09 a 25/10/2026. Onda 1: os oito quadros que respondem pelo volume do
 * CAPS e da emergência.
 *
 * A seção `farmaco` é nova e existe só aqui: nas queixas de APS o tratamento
 * cabia em `conduta`, em psiquiatria a escolha do fármaco É a consulta. Dose
 * com fonte datada citada no item; o detalhe por fármaco mora no painel
 * Psicofármacos, para não repetir a mesma tabela em oito lugares.
 * ===================================================================== */

QUEIXAS.push({
  id: "depressao-maior",
  nome: "Episódio depressivo maior",
  kw: "depressao humor tristeza anedonia isrs fluoxetina sertralina antidepressivo melancolia psicotica refrataria latencia virada maniaca phq",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Ideação suicida com plano, meio disponível ou tentativa prévia — avaliar agora, não no fim da consulta",
      "Sintoma psicótico (delírio de ruína, culpa ou negação de órgão): depressão psicótica tem risco de suicídio muito alto e não se trata com antidepressivo isolado",
      "Recusa alimentar ou de líquidos, com desidratação ou perda ponderal rápida",
      "Catatonia: imobilidade, mutismo, negativismo — é emergência e é subdiagnosticada",
      "Episódio prévio de humor elevado, gastos incomuns ou menos necessidade de sono: é bipolar até prova em contrário, e antidepressivo isolado pode virar para mania",
      "Puerpério com sintoma psicótico: psicose puerperal é emergência psiquiátrica"
    ]
  },

  perguntas: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Rastreio em duas perguntas: humor deprimido e perda de interesse ou prazer nas últimas 2 semanas",
      "Há quanto tempo, e o que mudou na vida quando começou",
      "Sono: insônia inicial, de manutenção ou despertar precoce? Ou hipersonia?",
      "Apetite e peso: quanto perdeu ou ganhou, em quanto tempo",
      "Energia, concentração, lentificação ou agitação percebida por outros",
      "Culpa desproporcional, sensação de ser um peso, desesperança",
      "Ideação suicida — perguntar direto. Perguntar não induz.",
      "SEMPRE: já teve período de dias seguidos com humor elevado ou irritável, muita energia e pouco sono?",
      "Uso de álcool, substância e medicação (corticoide, isotretinoína, interferon)",
      "Episódios prévios, quantos, o que funcionou, e resposta de parente de primeiro grau a antidepressivo",
      "Gestação, amamentação ou possibilidade de gravidez"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Aparência e autocuidado — descuido marcado é dado objetivo de gravidade",
      "Psicomotricidade: lentificação (melancólica) ou agitação",
      "Afeto observado × humor relatado, e a congruência entre os dois",
      "Curso do pensamento lentificado, latência de resposta longa",
      "Conteúdo: ruína, culpa, negação de órgão, ideação suicida",
      "Juízo crítico e prospecção — ausência de projeção futura é achado de risco mesmo sem ideação declarada",
      "Exame físico e tireoide: hipotireoidismo, anemia e deficiência de B12 imitam depressão",
      { t: "Rastreio laboratorial de causa orgânica: definir o painel com o protocolo do serviço", v: true }
    ]
  },

  naoperder: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Transtorno bipolar por trás do episódio depressivo",
      "Risco de suicídio não perguntado",
      "Sintoma psicótico não investigado",
      "Causa orgânica ou medicamentosa (hipotireoidismo, B12, corticoide, uso de substância)",
      "Luto e reação a adversidade tratados como depressão — e depressão descartada como se fosse só tristeza"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Depressão bipolar — início precoce, episódios recorrentes e curtos, sintoma psicótico, hipersonia e história familiar de bipolaridade puxam para bipolar",
      "Distimia — humor rebaixado por ≥2 anos, menos intenso e mais constante",
      "Transtorno de adaptação — estressor identificável e proporcionalidade preservada",
      "Luto — a dor vem em ondas, o autoestima se preserva, e a saudade coexiste com prazer residual",
      "Sintoma negativo da esquizofrenia — embotamento afetivo se confunde com anedonia; no embotamento a expressividade cai, no deprimido o sofrimento é expresso",
      "Demência × pseudodemência depressiva — no idoso deprimido a queixa de memória é MAIOR que o déficit medido; na demência é a família que se queixa",
      "Hipotireoidismo, anemia, deficiência de B12, apneia do sono"
    ]
  },

  exames: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Hemograma, TSH e glicemia como triagem de causa orgânica frequente",
      "Rastreio ampliado conforme idade, comorbidade e achado do exame físico",
      { t: "Painel exato e periodicidade: protocolo do CAPS", v: true }
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016",
    itens: [
      "Primeira linha é ISRS. A eficácia média entre eles é parecida: a escolha se faz pelo efeito adverso e pela comorbidade.",
      "Fluoxetina — dose usual 20 mg/dia, faixa 5 a 80 mg/dia. É o ISRS do SUS e o que consta dos PCDT. Meia-vida longa perdoa dose esquecida. Mais ativadora: evitar quando a insônia é o que mais incomoda.",
      "Sertralina — 50 a 150 mg/dia usual, faixa 50 a 200 mg/dia. Perfil de interação mais limpo; preferida tradicionalmente em cardiopata e no perinatal.",
      "Escitalopram — 10 mg/dia usual, faixa 10 a 30 mg/dia. Boa tolerabilidade, poucas interações.",
      "Paroxetina — 20 mg/dia usual, faixa 10 a 50 mg/dia. Mais sedativa, porém com a pior síndrome de retirada da classe: nunca suspender de golpe.",
      "Citalopram — 20 mg/dia usual, faixa 20 a 60 mg/dia. Atenção ao QT em dose alta, sobretudo em idoso.",
      "Tricíclico só quando o ISRS falhou ou quando há indicação clínica associada. Amitriptilina: iniciar 25 mg e subir 25 mg a cada 2 a 3 dias; usual 150 a 200 mg/dia; efeito antidepressivo só acima de 100 mg/dia.",
      "Latência de 2 a 4 semanas para o efeito antidepressivo. Piora inicial de ansiedade e sono é comum e não é falha do fármaco.",
      "Manter a dose plena por 6 a 8 semanas antes de julgar que não funcionou. Trocar antes disso é o erro que cria falsa refratariedade.",
      { t: "Escitalopram, sertralina, venlafaxina e mirtazapina não constam da RENAME 2024 como antidepressivos de uso geral. Bupropiona 150 mg de liberação prolongada está no Componente Estratégico — conferir o que a farmácia tem antes de prescrever", f: "RENAME 2024" },
      { t: "Tempo total de tratamento e critério de retirada: confirmar com o protocolo do serviço", v: true }
    ]
  },

  /* Formulário DESTA condição: referência por id ao psicofarmacos.js, nunca cópia.
     Dose e detalhe moram lá e são puxados na hora — o que mora aqui é a RELAÇÃO
     entre esta queixa e o fármaco, que é dado novo: o papel dele NESTE quadro.
     `papel` não pode conter dose (há teste): dose duplicada envelhece em dois lugares. */
  formulario: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · CANMAT 2023 (Can J Psychiatry, 2024) · CFM/CREMEC — Parecer nº 14/2021 (registro ANVISA Resolução-RE nº 4.413, 2020)",
    farmacos: [
      { id: "fluoxetina",   papel: "1ª linha — o ISRS que o SUS dispensa e o único dos PCDT" },
      { id: "sertralina",   papel: "1ª linha — interação mais limpa: polimedicado, cardiopata, perinatal" },
      { id: "escitalopram", papel: "1ª linha — quando tolerabilidade é a prioridade" },
      { id: "paroxetina",   papel: "1ª linha — mais sedativa; a pior retirada da classe" },
      { id: "citalopram",   papel: "1ª linha — atenção ao QT, sobretudo em idoso" },
      { id: "amitriptilina", papel: "2ª linha — só depois de ISRS em dose plena; contraindicação relativa forte se há risco de suicídio" },
      { id: "imipramina",   papel: "2ª linha — tricíclico menos sedativo que a amitriptilina" },
      { id: "bupropiona",   papel: "alternativa quando disfunção sexual ou ganho de peso derrubaram o ISRS; resolve duas coisas no fumante deprimido" },
      { id: "venlafaxina", papel: "dual; ponderar pressão arterial e retirada" },
      { id: "mirtazapina", papel: "quando insônia e perda de apetite pesam na escolha" },
      { id: "trazodona", papel: "distinguir adjuvante de sono de tratamento antidepressivo" },
      { id: "duloxetina", papel: "depressão com dor; avaliar função hepática e renal" },

      /* Outras classes: o fármaco cuja classe primária não é esta, mas que tem papel
         estabelecido aqui. É a pergunta que o formulário por classe não responde. */
      { id: "aripiprazol", outra: true,
        papel: "potencializador na resistente — 1ª linha adjuvante, em dose MENOR que a antipsicótica" },
      { id: "carbonato-de-litio", outra: true,
        papel: "potencializador de 2ª linha na resistente; pesa quando há risco de suicídio" },
      { id: "escetamina-intranasal", outra: true,
        papel: "resistente com ideação suicida aguda — dose sub-anestésica, em ambiente clínico e junto do antidepressivo oral" },
      { id: "cetamina-racemica", outra: true,
        papel: "resistente com ideação suicida — IV, dose sub-anestésica, off-label no Brasil" }
    ],
    combos: ["dep-resistente-antipsicotico", "dep-resistente-litio-t3", "dep-resistente-cetamina"],
    proibidos: ["ad-monoterapia-tab", "isrs-triciclico-imao", "isrs-tramadol", "bupropiona-limiar-convulsivo"],
    dosemuda: ["dm-amitriptilina"]
  },

  conduta: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Leve a moderado sem risco: psicoterapia e atividade física têm eficácia comparável à do fármaco — e a escolha é do paciente",
      "Moderado a grave: antidepressivo associado a psicoterapia bate qualquer um dos dois isolado",
      "Depressão psicótica: antidepressivo isolado é insuficiente — associar antipsicótico e discutir com o preceptor",
      "Reavaliar em 1 a 2 semanas quando houver qualquer ideação suicida, não em 30 dias",
      "Restringir o acesso a meio letal é medida obrigatória quando há ideação, não sugestão",
      "Fica na APS: leve a moderado, sem risco, com vínculo e seguimento. Vai para o CAPS: risco, psicose, refratariedade, transtorno grave e persistente",
      "Encaminhar não é transferir e sumir — o matriciamento mantém o vínculo com a equipe de origem"
    ]
  },

  erros: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Não perguntar sobre episódio prévio de humor elevado antes de prescrever antidepressivo",
      "Benzodiazepínico como tratamento da depressão — não trata, e em risco alto oferece outro meio letal",
      "Trocar de antidepressivo antes de 6 a 8 semanas em dose plena",
      "Aumentar a dose do ISRS quando a irritabilidade inicial é efeito do próprio ISRS",
      "Amitriptilina como primeira linha: anticolinérgica, cardiotóxica em overdose, hipotensão ortostática",
      "Suspender paroxetina de uma vez",
      "Prescrever o que a farmácia do SUS não dispensa e chamar isso de tratamento",
      "Chamar de refratária a depressão que nunca recebeu dose plena pelo tempo mínimo"
    ]
  },

  scores: ["phq9", "gad7", "nota-conferencia"]
});

QUEIXAS.push({
  id: "transtorno-bipolar",
  nome: "Transtorno bipolar — mania, depressão bipolar e manutenção",
  kw: "bipolar mania hipomania litio litemia valproato carbamazepina lamotrigina quetiapina ciclagem episodio misto virada estabilizador",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016 · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Mania com sintoma psicótico, agressividade ou exposição de risco: indicação de internação",
      "Episódio misto — mania e depressão simultâneas — é a apresentação de MAIOR risco de suicídio",
      "Intoxicação por lítio: disartria, ataxia e tremor grosseiro são os sinais precoces. Litemia acima de 1,5 mEq/L é tóxica; acima de 3,5 mEq/L é potencialmente fatal",
      "Rash cutâneo em quem está titulando lamotrigina: suspender e reavaliar, não observar",
      "Mulher em idade fértil em uso de valproato — é o antiepiléptico mais teratogênico",
      "Mania precipitada por antidepressivo: suspender o antidepressivo faz parte do tratamento"
    ]
  },

  perguntas: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Período de dias seguidos com humor elevado OU irritável, fora do normal para a pessoa — irritabilidade não exclui mania, é apresentação comum",
      "Necessidade de sono reduzida: dormiu 3 horas e acordou disposto? É diferente de insônia com cansaço",
      "Aumento de energia, de atividade dirigida a objetivo, de fala",
      "Gastos incomuns, indiscrição sexual, negócios impulsivos, viagens",
      "Autoestima inflada, sensação de poder ou missão especial",
      "Duração: ≥7 dias ou qualquer duração com internação sugere mania; 4 a 6 dias sem prejuízo grave sugere hipomania",
      "Quantos episódios já teve, de cada polo, e quantos por ano (4 ou mais = ciclagem rápida)",
      "O que já usou, em que dose, por quanto tempo, e por que parou",
      "História familiar de bipolaridade e de resposta ao lítio",
      "Uso de substância — estimulante imita mania e álcool imita quase tudo"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Psicomotricidade aumentada, inquietação com expansividade",
      "Fala com pressão de discurso, difícil de interromper",
      "Curso do pensamento acelerado, fuga de ideias por associação sonora ou trivial",
      "Distraibilidade — qualquer ruído desvia o curso",
      "Conteúdo: delírio de grandeza, congruente com o humor",
      "Juízo crítico, quase sempre ausente na mania — e é o que fundamenta a internação involuntária",
      "Tremor fino (lítio em dose terapêutica) × tremor grosseiro com ataxia e disartria (intoxicação)",
      "Sinais de hipotireoidismo em uso prolongado de lítio"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016",
    itens: [
      "Intoxicação por lítio precipitada por diurético, IECA, AINE, desidratação ou dieta hipossódica",
      "Episódio misto — maior risco de suicídio de todo o transtorno",
      "Bipolaridade por trás de uma depressão recorrente que se tratou como unipolar por anos",
      "Rash de lamotrigina em titulação acelerada",
      "Mania secundária a corticoide, estimulante ou hipertireoidismo"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Esquizofrenia — no bipolar o delírio é congruente com o humor e cede com o episódio; na esquizofrenia há sintoma bizarro, vivência de influência e prejuízo entre episódios",
      "Transtorno esquizoafetivo — psicose persiste 2 semanas SEM sintoma de humor proeminente",
      "Intoxicação por estimulante (cocaína, anfetamina) — início abrupto e resolve em dias",
      "Acatisia × agitação maníaca — acatisia é inquietação subjetiva que alivia ao movimentar e surge dias após iniciar ou aumentar antipsicótico; a conduta é REDUZIR a dose",
      "Personalidade borderline — labilidade em horas e reativa a evento interpessoal; na mania o humor sustenta por dias e vem com menos sono e mais energia",
      "TDAH — contínuo desde a infância, sem episódio delimitado",
      "Hipertireoidismo e mania por corticoide"
    ]
  },

  exames: {
    fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016",
    itens: [
      "Antes do lítio: função renal e tireoidiana. Antes do valproato: função hepática. Antes da carbamazepina: ALT/TGP, AST/TGO, creatinina, ureia, sódio e potássio",
      "Lítio em uso: creatinina e ureia trimestrais; TSH, cálcio sérico e litemia semestrais",
      "Valproato em uso: hemograma e função hepática trimestrais; nível sérico semestral",
      "Carbamazepina em uso: hemograma, função hepática, creatinina, ureia e eletrólitos MENSAIS nos 3 primeiros meses; nível sérico semestral; painel completo anual",
      "Lamotrigina em uso: hemograma e função hepática anuais",
      "Antipsicótico em uso: glicemia de jejum e perfil lipídico trimestrais no primeiro ano, depois anuais com ECG; prolactina quando houver sintoma sugestivo",
      "Antropometria e pressão arterial em 3, 6 e 12 meses",
      "Nível sérico de estabilizador: colher após 5 a 7 dias de dose estável e 12 horas após a última tomada — fora dessa janela o número não significa nada"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016",
    itens: [
      "A FASE decide o fármaco. Mania, depressão bipolar e manutenção não pedem o mesmo.",
      "Carbonato de lítio — início 300 mg/dia; subir 300 mg a cada 2 dias até 900 mg e então dosar o nível; faixa 300 a 1.800 mg/dia em dose única à noite; máximo 1.800 mg/dia; nível terapêutico 0,6 a 1,2 mEq/L.",
      "Lítio é o de maior lastro em manutenção e o único com efeito antissuicídio descrito. História familiar de boa resposta ao lítio é o melhor preditor que existe.",
      "Ácido valproico — início 250 mg/dia; subir 250 mg a cada 2 dias até 750 mg e então dosar; faixa 250 a 2.000 mg/dia; máximo 2.000 mg/dia; nível 50 a 125 mcg/mL. Bom em episódio misto e ciclagem rápida.",
      "Carbamazepina — início 200 mg/dia; subir 200 mg a cada 2 dias até 600 mg e então dosar; faixa 200 a 1.000 mg/dia; máximo 1.000 mg/dia; nível 8 a 12 mcg/mL. Induz o próprio metabolismo: rever a dose periodicamente.",
      "Lamotrigina — início 25 mg/dia; subir 25 mg a cada 2 SEMANAS nas primeiras 4 semanas; 100 mg/dia na quinta semana; depois no máximo 100 mg por semana até 100 a 200 mg/dia; máximo 300 mg/dia. É o melhor perfil na DEPRESSÃO bipolar.",
      "Quetiapina — início 25 mg/dia; na depressão bipolar 300 a 600 mg/dia; na mania 600 a 800 mg/dia; máximo 800 mg/dia. É o atípico com indicação própria na depressão bipolar.",
      "Risperidona — início 1 mg/dia, subir 1 mg/dia até a dose-alvo; faixa 1 a 6 mg/dia; máximo 8 mg/dia.",
      "Olanzapina — início 5 mg/dia, subir 5 mg até a dose-alvo; faixa 5 a 20 mg/dia; máximo 20 mg/dia. Melhor eficácia em mania, pior perfil metabólico.",
      "Clozapina — início 25 mg/dia, subir 25 mg a cada 1 a 2 dias até 300 a 400 mg/dia; acima de 400 mg fracionar 12/12 h; máximo 800 mg/dia. Exige hemograma semanal nas 18 primeiras semanas e mensal depois.",
      "Fluoxetina — início 20 mg/dia pela manhã, subir 20 mg a cada 1 a 2 semanas; faixa 20 a 40 mg; máximo 80 mg/dia. Antidepressivo no bipolar só em cima de estabilizador, nunca isolado.",
      "Na manutenção, reduzir o número de medicamentos sempre que possível — mas monoterapia pode ser insuficiente para prevenir recaída.",
      "O tempo de manutenção não se determina de antemão: em princípio é contínuo."
    ]
  },

  formulario: {
    fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016",
    farmacos: [
      { id: "carbonato-de-litio",
        papel: "1ª linha em todas as fases — maior lastro na manutenção e o único com efeito antissuicídio descrito" },
      { id: "acido-valproico-valproato",
        papel: "1ª linha — rende mais no episódio misto e na ciclagem rápida" },
      { id: "lamotrigina",
        papel: "o melhor perfil no polo DEPRESSIVO; titulação em semanas, não em dias" },
      { id: "carbamazepina",
        papel: "alternativa — induz o próprio metabolismo, e por isso a dose precisa ser revista" },
      { id: "quetiapina",
        papel: "o atípico com indicação própria na depressão bipolar; na mania o patamar é outro" },
      { id: "olanzapina",
        papel: "melhor eficácia na mania, e o pior perfil metabólico" },
      { id: "risperidona",
        papel: "atípico na mania, titulado até a dose-alvo" },
      { id: "clozapina",
        papel: "refratariedade — só com hemograma seriado" },
      { id: "fluoxetina", outra: true,
        papel: "o único ISRS do Protocolo no TAB, e SEMPRE sobre um estabilizador — nunca isolada" }
    ],
    combos: ["dep-bipolar-litio-mono", "dep-bipolar-refrataria-fluox"],
    proibidos: ["ad-monoterapia-tab", "litio-diuretico-ieca-aine", "lamotrigina-valproico", "carbamazepina-inducao"],
    dosemuda: ["dm-quetiapina"]
  },

  conduta: {
    fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Mania com psicose, agressividade ou exposição de risco: internação",
      "Suspender antidepressivo diante de virada maníaca",
      "Psicoeducação do paciente e da família sobre pródromo e adesão muda desfecho mais que troca de fármaco",
      "Valproato em mulher com possibilidade de gravidez: contraindicação formal — discutir contracepção ou trocar",
      "Orientar sobre o que eleva a litemia: diurético, IECA, AINE, desidratação, dieta hipossódica",
      "CAPS é o lugar do transtorno grave e persistente — e o matriciamento mantém a equipe da unidade dentro do cuidado"
    ]
  },

  erros: {
    fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016",
    itens: [
      "Antidepressivo isolado no bipolar — vira o humor e pode induzir ciclagem rápida",
      "Colher litemia fora da janela de 12 horas e decidir dose com esse número",
      "Titular lamotrigina depressa — é o que produz o rash grave",
      "Valproato em mulher em idade fértil sem discutir teratogenicidade",
      "Tratar mania irritável como transtorno de personalidade porque o paciente não está eufórico",
      "Parar o estabilizador quando o paciente melhora — a manutenção é o tratamento",
      "Confundir acatisia com piora do quadro e aumentar a dose do antipsicótico"
    ]
  },

  scores: ["nota-conferencia", "imc"]
});

QUEIXAS.push({
  id: "psicose-esquizofrenia",
  nome: "Psicose aguda e esquizofrenia",
  kw: "psicose esquizofrenia surto delirio alucinacao antipsicotico haloperidol risperidona clozapina refratariedade primeiro episodio duracao nao tratada negativos",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013",
    itens: [
      "Alucinação de comando mandando ferir a si ou a outro — muda a conduta na hora",
      "Alucinação VISUAL predominante: aponta causa orgânica, não esquizofrenia. Investigar delirium, demência, intoxicação e abstinência",
      "Primeiro episódio após os 40 anos, ou com alteração neurológica focal: investigar causa secundária antes de rotular",
      "Febre, rigidez, instabilidade autonômica e confusão em uso de antipsicótico: síndrome neuroléptica maligna",
      "Catatonia — imobilidade, mutismo, negativismo, flexibilidade cérea",
      "Clozapina em uso com febre ou odinofagia: agranulocitose até prova em contrário, hemograma hoje",
      "Risco de suicídio: é alto na esquizofrenia, sobretudo no primeiro ano e em quem recupera crítica"
    ]
  },

  perguntas: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Você já ouviu alguém chamar seu nome sem ter ninguém? Já viu coisa que os outros não viram?",
      "A voz manda você fazer alguma coisa? — perguntar SEMPRE quando há alucinação auditiva",
      "Sente que estão te seguindo, te vigiando, falando de você, mexendo na sua comida?",
      "Alguém consegue colocar pensamento na sua cabeça, tirar, ou saber o que você pensa?",
      "Há quanto tempo — e o que veio primeiro, o isolamento ou as vozes",
      "Queda de funcionamento: parou de estudar, trabalhar, sair, cuidar de si",
      "Uso de substância, sobretudo cannabis, cocaína e crack",
      "Antipsicótico em uso, dose e adesão real — quantos dias de fato tomou",
      "Se já usou antes: qual, em que dose, por quantas semanas, por que parou"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Contato: sintônico ou frio e bizarro — descritível mesmo sem delírio",
      "Forma do pensamento: desagregação e afrouxamento associativo, bloqueio",
      "Conteúdo: delírio persecutório, de influência, bizarro",
      "Consciência do eu: vivência de influência, roubo, inserção ou irradiação do pensamento",
      "Sintomas negativos: embotamento afetivo, abulia, alogia, isolamento — são os que mais incapacitam e os menos tratados",
      "Motricidade: estereotipia, maneirismo, catatonia",
      "Sinais extrapiramidais a CADA consulta: distonia, acatisia, parkinsonismo, discinesia tardia",
      "Juízo crítico — é o que sustenta manejo ambulatorial ou internação",
      "Antropometria, pressão arterial e cintura: síndrome metabólica é a principal causa de morte nesta população"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Psicose secundária: delirium, uso de substância, corticoide, epilepsia de lobo temporal, lúpus, HIV, tireoide",
      "Mania com psicose tratada como esquizofrenia",
      "Depressão psicótica tratada como esquizofrenia",
      "Síndrome neuroléptica maligna",
      "Agranulocitose por clozapina",
      "Acatisia confundida com piora do quadro — e a dose aumentada",
      "Síndrome metabólica instalada durante o tratamento"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Transtorno psicótico breve — menos de 1 mês, com retorno pleno ao funcionamento prévio",
      "Transtorno esquizofreniforme — 1 a 6 meses",
      "Esquizofrenia — ≥6 meses com queda de funcionamento",
      "Transtorno esquizoafetivo — psicose persiste ≥2 semanas sem sintoma de humor proeminente",
      "Transtorno delirante — delírio sistematizado sem desagregação e com funcionamento preservado fora do tema",
      "Psicose induzida por substância — temporalidade com o uso e remissão na abstinência",
      "Delirium — consciência rebaixada e flutuante, desatenção, alucinação visual. Este é o diferencial que não pode falhar",
      "Depressão com sintoma negativo × sintoma negativo primário — no embotamento a expressividade cai; no deprimido o sofrimento é expresso"
    ]
  },

  exames: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016",
    itens: [
      "Primeiro episódio: triagem de causa secundária conforme idade e achado neurológico",
      "Antipsicótico em uso: glicemia de jejum e perfil lipídico trimestrais no primeiro ano, depois anuais com ECG",
      "Prolactina quando houver queda de libido, alteração menstrual, impotência ou galactorreia",
      "Clozapina: hemograma SEMANAL nas 18 primeiras semanas e MENSAL enquanto durar o uso",
      "Antropometria e pressão arterial em 3, 6 e 12 meses",
      "ECG antes e durante a ziprasidona, e em qualquer associação que alargue QT",
      "Escore BPRS-A trimestral é o instrumento de seguimento previsto no PCDT"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013",
    itens: [
      "A eficácia entre antipsicóticos é semelhante, exceto a clozapina na refratariedade. A escolha é pelo efeito adverso que o paciente menos tolera.",
      "Risperidona — iniciar 1 mg 2x/dia (evita efeito de primeira dose por bloqueio alfa); subir 1 mg 2x/dia até a alvo de 6 mg/dia no terceiro dia; manutenção 3 a 6 mg/dia. Em insuficiência renal ou hepática, máximo 3 mg/dia. Se interrompida, reiniciar pela primeira dose.",
      "Olanzapina — iniciar 5 mg à noite; subir 5 mg após pelo menos 7 dias até 20 mg/dia. Acima de 20 mg não há evidência de ganho em não refratário. Paciente debilitado ou emagrecido: máximo 5 mg/dia.",
      "Quetiapina — iniciar 25 mg 2x/dia; subir 25 a 50 mg por dose por dia até 300 a 600 mg/dia entre o 4º e o 7º dia; máximo 750 a 800 mg/dia.",
      "Ziprasidona — 40 mg 2x/dia COM alimento (sem alimento a absorção cai e subdosa sem avisar); aumentos com mais de 2 dias de intervalo; máximo 160 mg/dia. É a metabolicamente mais neutra.",
      "Haloperidol — doses fracionadas no início; máximo 15 mg/dia em situação aguda e 10 mg/dia na manutenção. Acima disso só aumenta efeito adverso.",
      "Clorpromazina — iniciar 50 a 100 mg 2 a 3x/dia; média 400 a 800 mg/dia; máximo 1 g/dia. Abaixo de 150 mg/dia associa-se a mais recidiva. Café, cigarro e antiácido reduzem a absorção.",
      "Clozapina — iniciar 12,5 mg à noite; subir 25 mg a cada 1 a 2 dias até 300 a 400 mg/dia; sem melhora em 30 dias, subir 50 mg a cada 3 a 4 dias até 800 mg/dia; acima de 400 mg fracionar.",
      "Clozapina é para REFRATARIEDADE (falha de dois antipsicóticos adequados) — e também a escolha formal do PCDT em discinesia tardia e em tentativa de suicídio.",
      "Prazo para julgar falha: 6 semanas em dose máxima para os demais; 6 MESES para a clozapina, cujo mecanismo é mais lento.",
      "Má adesão ao oral tem resposta formal no PCDT: decanoato de haloperidol, 150 a 200 mg a cada 4 semanas. Nos primeiros meses pode ir a 400 mg/mês ou ser suplementado com haloperidol oral até 15 mg/dia.",
      "Síndrome metabólica instalada em uso de olanzapina ou quetiapina é critério formal de troca por ziprasidona.",
      "Efeito motor: biperideno 1 a 16 mg/dia em 1 a 4 tomadas para distonia e parkinsonismo; propranolol 40 a 160 mg/dia em 2 a 3 tomadas para acatisia.",
      "Obtida a melhora, reduzir a dose com cuidado para a manutenção — não manter dose de crise indefinidamente."
    ]
  },

  formulario: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013",
    farmacos: [
      { id: "risperidona",
        papel: "1ª linha — iniciar em duas tomadas, para evitar o efeito de primeira dose" },
      { id: "olanzapina",
        papel: "1ª linha — eficaz, com o pior custo metabólico" },
      { id: "quetiapina",
        papel: "1ª linha — a mais sedativa do grupo" },
      { id: "ziprasidona",
        papel: "a metabolicamente mais neutra; sem alimento a absorção cai e subdosa sem avisar" },
      { id: "haloperidol",
        papel: "típico de alta potência: pouca sedação, muito efeito motor" },
      { id: "clorpromazina",
        papel: "típico de baixa potência: sedativa e hipotensora; tem PISO de dose, não só teto" },
      { id: "clozapina",
        papel: "refratariedade (falha de dois adequados), discinesia tardia e tentativa de suicídio" },
      { id: "decanoato-de-haloperidol",
        papel: "má adesão ao oral — é a resposta formal do PCDT, não improviso" },
      { id: "biperideno", outra: true,
        papel: "distonia aguda e parkinsonismo. NÃO serve para acatisia nem para discinesia tardia" },
      { id: "propranolol-para-acatisia", outra: true,
        papel: "acatisia induzida por antipsicótico — trocar um pelo outro é erro comum" }
    ],
    combos: ["esq-manejo-motor", "esq-decanoato-oral", "atipico-sulpirida"],
    proibidos: ["clozapina-sem-hemograma", "ziprasidona-qt", "biperideno-acatisia-dt", "haloperidol-parkinson-lewy", "carbamazepina-inducao"],
    dosemuda: ["dm-clorpromazina"]
  },

  conduta: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Não confrontar o delírio: argumentar contra rompe o vínculo e não corrige a crença. Validar o AFETO sem confirmar o conteúdo",
      "Reduzir ameaça no ambiente: distância, porta livre, sem plateia, sem cercar",
      "Quanto maior a duração de psicose não tratada, pior o prognóstico funcional — tempo até o tratamento é desfecho",
      "Psicoeducação familiar e redução de emoção expressa em casa reduzem recaída de forma comparável ao fármaco",
      "CAPS é o lugar: transtorno grave e persistente é exatamente a indicação",
      "Reabilitação psicossocial e trabalho não são acessório — são o que muda funcionamento a longo prazo"
    ]
  },

  erros: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Tratar alucinação visual isolada como esquizofrenia sem investigar causa orgânica",
      "Biperideno para acatisia — não trata, e piora discinesia tardia",
      "Aumentar a dose do antipsicótico diante de acatisia",
      "Chamar de refratário quem nunca completou 6 semanas em dose adequada",
      "Iniciar clozapina sem garantir hemograma seriado",
      "Confrontar o delírio para provar que não é verdade",
      "Prescrever antipsicótico de depósito para quem nunca tomou o oral e não teve a tolerância testada",
      "Ignorar peso, cintura, glicemia e lipídios — a morte precoce nessa população é cardiovascular",
      "Haloperidol em paciente com Parkinson ou demência de corpos de Lewy"
    ]
  },

  scores: ["nota-conferencia", "imc"]
});

QUEIXAS.push({
  id: "agitacao-psicomotora",
  nome: "Agitação psicomotora — emergência",
  kw: "agitacao agressividade contencao tranquilizacao rapida haloperidol midazolam prometazina emergencia violencia manejo verbal",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Agitação com CONSCIÊNCIA REBAIXADA ou flutuante é delirium até prova em contrário — causa clínica, não psiquiátrica",
      "Glicemia capilar em toda agitação: hipoglicemia é a causa reversível que mais se perde",
      "Sinal vital alterado, febre, sinal neurológico focal: investigar antes de sedar",
      "Abstinência alcoólica com tremor, sudorese, taquicardia e alucinação: risco de convulsão e de delirium tremens",
      "Intoxicação por estimulante com dor torácica, hipertermia ou arritmia",
      "Rota de fuga bloqueada e ausência de equipe: não entre — chame apoio antes",
      "Febre com rigidez em uso de antipsicótico: síndrome neuroléptica maligna, não agitação"
    ]
  },

  perguntas: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Do acompanhante, antes de tudo: começou quando, começou de repente, já aconteceu antes?",
      "Flutuou no dia, piorou ao entardecer? — marcador de delirium",
      "Usa álcool ou outra substância? Quando foi a última dose?",
      "Parou algum remédio de uso contínuo nos últimos dias?",
      "Doença clínica, trauma de cabeça, infecção recente, febre?",
      "Antipsicótico iniciado ou aumentado nos últimos dias? — pensar acatisia e distonia",
      "Ao paciente, se der: o que está acontecendo, o que te ajudaria agora"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Nível de consciência ANTES de qualquer outra coisa",
      "Sinais vitais completos e GLICEMIA CAPILAR",
      "Descrever o que se vê, não só o rótulo: anda sem parar, gesticula, eleva a voz, ameaça, agride",
      "Pupilas: midríase (estimulante, abstinência) × miose (opioide)",
      "Sinais de abstinência: tremor, sudorese, taquicardia, hipertensão",
      "Sinais de trauma, de infecção, de foco neurológico",
      "Inquietação subjetiva com alívio ao movimentar após antipsicótico recente = acatisia, e sedar piora"
    ]
  },

  naoperder: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Hipoglicemia",
      "Delirium por causa clínica aguda",
      "Abstinência alcoólica",
      "Hipóxia, sepse, trauma craniano",
      "Acatisia medicamentosa",
      "Síndrome neuroléptica maligna e síndrome serotoninérgica",
      "Dor e retenção urinária no idoso — causas banais de agitação que somem quando tratadas"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Delirium — consciência flutuante, desatenção, alucinação visual, início agudo",
      "Mania — humor elevado ou irritável, menos sono, grandiosidade, consciência lúcida",
      "Psicose — delírio e alucinação auditiva com consciência lúcida",
      "Intoxicação por estimulante — midríase, taquicardia, hipertermia",
      "Abstinência de álcool ou benzodiazepínico — tremor, sudorese, alucinação tátil e visual",
      "Acatisia — inquietação subjetiva, alívio ao movimentar, antipsicótico recente",
      "Agitação de causa comportamental em TEA ou deficiência intelectual — procurar o gatilho (dor, mudança de rotina, estímulo sensorial) antes de medicar",
      "Crise de ansiedade ou pânico — autolimitada, sem alteração de consciência"
    ]
  },

  exames: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Glicemia capilar sempre",
      "Investigação de causa orgânica conforme a suspeita: hemograma, eletrólitos, função renal, urina, imagem",
      { t: "Painel mínimo de agitação e critérios de imagem: seguir o protocolo do HELR", v: true }
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013",
    itens: [
      "A primeira intervenção é VERBAL, e funciona na maioria: baixar o tom, reduzir estímulo, oferecer escolha real, nomear o que vai acontecer. Medicar antes de tentar é atalho que custa vínculo.",
      "Oferecer a medicação por via ORAL primeiro. Aceitar por boca preserva a aliança e tem o mesmo alvo.",
      "Midazolam — o CAB nº 34 destaca a prescrição INTRAMUSCULAR como útil em agitação; meia-vida 1 a 5 horas, dose usual 15 mg. Vigiar depressão respiratória.",
      "Diazepam IM NÃO serve para agitação: a absorção intramuscular é lenta e variável. Erro comum e caro.",
      "Haloperidol — máximo 15 mg/dia em situação aguda. Alta potência: pouca sedação e pouca hipotensão, muito efeito motor.",
      "Distonia aguda após haloperidol: biperideno 1 a 16 mg/dia em 1 a 4 tomadas. Resposta rápida.",
      "Agitação por ABSTINÊNCIA alcoólica é do benzodiazepínico, não do antipsicótico — antipsicótico baixa o limiar convulsivo e não previne convulsão de abstinência.",
      "Agitação por delirium: tratar a CAUSA. Benzodiazepínico piora delirium não alcoólico.",
      "Idoso: começar pela metade da dose do adulto e reavaliar mais cedo.",
      { t: "Esquema institucional de tranquilização rápida (fármacos, doses, via, intervalo de repetição): seguir o protocolo do HELR", v: true }
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013",
    farmacos: [
      { id: "midazolam",
        papel: "o CAB destaca a via intramuscular na agitação; vigiar depressão respiratória" },
      { id: "haloperidol",
        papel: "antipsicótico da crise: pouca sedação, muito efeito motor" },
      { id: "diazepam",
        papel: "por via oral serve; por via IM NÃO — a absorção intramuscular é lenta e variável" },
      { id: "biperideno", outra: true,
        papel: "distonia aguda depois do haloperidol — a resposta é rápida" }
    ],
    combos: ["esq-manejo-motor"],
    proibidos: ["bzd-delirium", "haloperidol-parkinson-lewy", "bzd-alcool-depressor"]
  },

  conduta: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Segurança primeiro: posicione-se com saída livre, sem cercar, sem plateia, sem objeto perfurante ao alcance",
      "Uma pessoa fala. Equipe visível, mas só um interlocutor",
      "Escalonar: verbal → oferta oral → parenteral → contenção física. Pular degrau sem necessidade é iatrogenia",
      "Contenção física é último recurso, por tempo mínimo, com equipe treinada e vigilância contínua de vias aéreas, circulação e posição",
      "Registrar em prontuário: o que se tentou antes, a indicação, o horário de início, as reavaliações e o horário de retirada",
      "Nunca conter em decúbito ventral e nunca deixar sem observação direta",
      "Reavaliar a necessidade em intervalos curtos — contenção esquecida é dano"
    ]
  },

  erros: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Sedar antes de medir glicemia e sinais vitais",
      "Sedar antes de tentar manejo verbal",
      "Diazepam IM em agitação",
      "Benzodiazepínico em delirium não alcoólico",
      "Antipsicótico como tratamento principal da abstinência alcoólica",
      "Contenção física como primeira medida, ou mantida sem reavaliação",
      "Tratar acatisia com mais antipsicótico",
      "Deixar de registrar a indicação e a reavaliação da contenção"
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "risco-suicidio",
  nome: "Risco de suicídio e tentativa",
  kw: "suicidio ideacao tentativa autoextermino risco meio letal restricao plano internacao involuntaria notificacao posvencao",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Tentativa prévia é o maior preditor isolado de nova tentativa",
      "Plano definido, meio disponível e data pensada: risco iminente",
      "Arma de fogo em casa somada a tentativa prévia, isolamento e suporte frágil: internação e medidas de segurança imediatas, não conduta ambulatorial",
      "Item 9 do PHQ-9 positivo: pare e avalie agora, não no fim da consulta",
      "Desesperança marcada e ausência total de prospecção — preditor mais forte que a intensidade da tristeza",
      "Calma súbita depois de período de sofrimento intenso pode significar decisão tomada, não melhora",
      "Alucinação de comando mandando se ferir",
      "Depressão psicótica, episódio misto e primeiro ano de esquizofrenia: risco elevado por si"
    ]
  },

  perguntas: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Perguntar sobre suicídio NÃO induz ao suicídio. Perguntar diretamente e sem eufemismo",
      "Escada: já sentiu que não valia a pena viver? já pensou em se matar? pensou em como?",
      "Os cinco eixos: ideação · plano · meio disponível · tentativa prévia · suporte social",
      "Tentativa prévia: quantas, quando, qual método, qual a intenção de morrer na hora e o que sente hoje sobre ter sobrevivido",
      "O que te impede — motivos para viver são fator de proteção e o que se constrói no plano de segurança",
      "Acesso a meio: arma de fogo, medicação estocada, agrotóxico, altura, trilho",
      "Uso de álcool e substância — desinibe e converte ideação em ato",
      "Perda recente: luto, separação, desemprego, exposição pública, doença grave",
      "Com quem mora, quem sabe disso, quem pode ficar junto nas próximas 48 horas"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Prospecção — a ausência de qualquer projeção futura é achado de risco mesmo sem ideação declarada",
      "Conteúdo do pensamento: desesperança, ruína, culpa, ideia de ser um peso para os outros",
      "Sintoma psicótico, sobretudo delírio de ruína e alucinação de comando",
      "Juízo crítico sobre o próprio risco",
      "Marcas de autolesão prévia — procurar em antebraços e coxas",
      "Sinais de intoxicação aguda"
    ]
  },

  naoperder: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Não perguntar por medo de induzir",
      "Meio letal acessível não retirado",
      "Depressão psicótica ou episódio misto por trás do quadro",
      "Alta sem plano de segurança escrito e sem data de retorno próxima",
      "Intoxicação aguda mascarando a gravidade da intenção",
      "Adolescente: sigilo não se sustenta diante de risco de vida — e isso se pactua com ele, não às escondidas"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Ideação passiva (queria não acordar) × ativa (pensei em como fazer) — gravidade diferente, ambas se registram",
      "Autolesão sem intenção de morrer — função de regulação afetiva, comum no borderline; é fator de risco futuro mesmo sem intenção agora",
      "Ideação como sintoma de episódio depressivo × como traço em transtorno de personalidade — a conduta imediata é a mesma diante de risco agudo",
      "Comportamento de risco sem intenção declarada (direção perigosa, uso pesado) — investigar intenção por trás"
    ]
  },

  exames: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Pós-tentativa: avaliação clínica completa da intoxicação ou lesão vem ANTES da avaliação psiquiátrica",
      "Rastreio toxicológico conforme o método relatado",
      { t: "Fluxo institucional pós-tentativa e critérios de internação: protocolo do HELR", v: true }
    ]
  },

  farmaco: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013",
    itens: [
      "Não existe fármaco que trate o risco agudo. O que reduz risco agora é restringir meio, garantir acompanhamento e não deixar sozinho.",
      "Tratar o transtorno de base é o que reduz risco a médio prazo.",
      "Lítio é o estabilizador com efeito antissuicídio descrito — pesa na escolha quando há bipolaridade.",
      "Clozapina é a escolha formal do PCDT de Esquizofrenia diante de tentativa de suicídio.",
      "Benzodiazepínico em risco alto oferece OUTRO meio letal e desinibe. Se for indicado, prescrever quantidade pequena e sob supervisão de terceiro.",
      "Tricíclico é cardiotóxico em overdose — a caixa inteira é o meio. Evitar em quem tem risco.",
      "Receita em quantidade fracionada e sob guarda de familiar é medida de segurança, não desconfiança."
    ]
  },

  formulario: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016 · CANMAT 2023 (Can J Psychiatry, 2024) · CFM/CREMEC — Parecer nº 14/2021 (registro ANVISA Resolução-RE nº 4.413, 2020)",
    farmacos: [
      { id: "carbonato-de-litio",
        papel: "o único estabilizador com efeito antissuicídio descrito — pesa na escolha quando há bipolaridade" },
      { id: "clozapina",
        papel: "a escolha formal do PCDT diante de tentativa de suicídio na esquizofrenia" },
      { id: "escetamina-intranasal", outra: true,
        papel: "TDM com ideação suicida aguda: reduz a ideação rápido, em ambiente clínico e junto do antidepressivo oral" },
      { id: "cetamina-racemica", outra: true,
        papel: "IV — o efeito antissuicida se estende por até uma semana após infusão única; off-label no Brasil" }
    ],
    combos: ["dep-resistente-cetamina"]
  },

  conduta: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Restringir o acesso ao meio letal é medida OBRIGATÓRIA, não sugestão — e se faz com a família, na consulta, não como conselho genérico",
      "Plano de segurança escrito, com o paciente: sinais de alerta, o que fazer, quem chamar, telefones, o que já ajudou antes",
      "Nunca deixar só quem tem risco iminente — alguém responsável fica junto até o próximo passo",
      "Risco iminente sem crítica e sem suporte: internação, involuntária se necessário, com o achado registrado no prontuário",
      "Risco moderado com suporte e crítica: manejo ambulatorial com retorno em dias, não em semanas, e contato telefônico entre consultas",
      "Vincular ao CAPS e garantir que o vínculo aconteceu — encaminhamento sem contato é encaminhamento que não existiu",
      "Tentativa de suicídio é agravo de NOTIFICAÇÃO COMPULSÓRIA imediata",
      "Posvenção: a família de quem morreu por suicídio é população de risco e precisa de cuidado ofertado ativamente"
    ]
  },

  erros: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Não perguntar por medo de induzir",
      "Aceitar promessa de não fazer nada como se fosse plano de segurança",
      "Dar alta sem retirar o meio letal de casa",
      "Prescrever benzodiazepínico ou tricíclico em quantidade grande a quem tem risco",
      "Encaminhar ao CAPS sem confirmar que o paciente chegou lá",
      "Tratar autolesão sem intenção de morrer como manipulação",
      "Deixar de notificar",
      "Retorno em 30 dias para quem tem ideação ativa"
    ]
  },

  scores: ["phq9", "nota-conferencia"]
});

QUEIXAS.push({
  id: "alcool-transtorno-uso",
  nome: "Álcool — intoxicação, abstinência e manutenção",
  kw: "alcool alcoolismo abstinencia delirium tremens tiamina wernicke korsakoff naltrexona acamprosato dissulfiram audit craving reducao de danos",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Delirium tremens: confusão flutuante, alucinação visual e tátil, tremor intenso, febre, taquicardia e hipertensão. Emergência com mortalidade real",
      "Convulsão de abstinência — costuma ocorrer nas primeiras 48 horas da última dose",
      "Tríade de Wernicke: confusão, ataxia e oftalmoplegia. Incompleta na maioria — não esperar as três",
      { t: "Hipoglicemia exige correção imediata; administrar tiamina prontamente em quem tem risco de deficiência, sem atrasar glicose para aguardá-la.", f: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23" },
      "Antecedente de convulsão ou de delirium tremens em abstinência prévia: alto risco de repetir",
      "Hepatopatia descompensada, sangramento digestivo, pancreatite",
      "Risco de suicídio: o álcool desinibe e converte ideação em ato"
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Quanto, de quê, com que frequência — em doses padrão, não em copos",
      "QUANDO FOI A ÚLTIMA DOSE — define se o quadro é intoxicação, abstinência ou nenhum dos dois",
      "Já teve tremor, sudorese, náusea ou alucinação ao parar de beber?",
      "Já teve convulsão ou delirium ao parar?",
      "Bebe pela manhã para aliviar? Precisa de mais para o mesmo efeito?",
      "Já tentou parar? O que aconteceu? O que ajudou?",
      "Prejuízo em trabalho, família, trânsito, saúde, justiça",
      "Outras substâncias associadas, sobretudo benzodiazepínico",
      "Alimentação, peso e sinais de carência nutricional",
      "O que a pessoa QUER neste momento — abstinência, redução, ou só parar de passar mal. Impor meta que não é dela derruba a adesão"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Nível de consciência e flutuação",
      "Sinais vitais completos: taquicardia, hipertensão e febre marcam gravidade da abstinência",
      "Tremor de extremidades e de língua, sudorese",
      "Alucinação visual e tátil (zoopsia — bichos na pele)",
      "Marcha, nistagmo e motricidade ocular — Wernicke",
      "Memória recente e confabulação — Korsakoff",
      "Estigmas de hepatopatia: icterícia, ascite, aranhas vasculares, ginecomastia, eritema palmar",
      "Sinais de trauma, sobretudo craniano — queda com álcool é frequente e o hematoma se esconde atrás da confusão"
    ]
  },

  naoperder: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Encefalopatia de Wernicke — tratável, e irreversível se não tratada",
      "Delirium tremens instalando",
      "Hematoma subdural atrás da confusão atribuída ao álcool",
      "Hipoglicemia e distúrbio hidroeletrolítico",
      "Infecção como gatilho da descompensação",
      "Depressão e risco de suicídio coexistentes",
      "Uso concomitante de benzodiazepínico — a abstinência combinada é mais grave"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Intoxicação — fala arrastada, ataxia, desinibição, sonolência. Última dose recente",
      "Abstinência — tremor, sudorese, taquicardia, ansiedade. Começa 6 a 24 h após a última dose",
      "Alucinose alcoólica — alucinação com CONSCIÊNCIA LÚCIDA, diferente do delirium tremens",
      "Delirium tremens — consciência rebaixada e flutuante, alucinação visual e tátil, hiperatividade autonômica",
      "Wernicke × Korsakoff — Wernicke é agudo (confusão, ataxia, oftalmoplegia); Korsakoff é a sequela crônica com amnésia e confabulação",
      "Depressão induzida pelo álcool × depressão primária — a induzida melhora muito nas primeiras semanas de abstinência",
      "Abstinência de benzodiazepínico — quadro parecido, curso mais arrastado"
    ]
  },

  exames: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Glicemia capilar sempre",
      "Hemograma, eletrólitos (incluindo magnésio), função hepática e renal",
      "Sorologias conforme exposição",
      "Imagem de crânio diante de trauma, foco neurológico ou confusão que não melhora",
      { t: "Escala de avaliação de abstinência adotada pelo serviço e limiares de intervenção: protocolo do HELR", v: true }
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      { t: "Preferir tiamina antes da glicose quando disponível; corrigir hipoglicemia sem demora e repor tiamina prontamente.", f: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23" },
      "Abstinência aguda é do BENZODIAZEPÍNICO, titulado por sintoma. De meia-vida longa, para não haver rebote entre as doses.",
      "Diazepam: meia-vida longa, útil na abstinência aguda; doses e contexto de monitorização no cartão.",
      "Clordiazepóxido: alternativa de longa duração; titulação por sintomas em ambiente monitorizado, conforme cartão.",
      { t: "Na hepatopatia, preferir benzodiazepínico sem metabólitos ativos, como lorazepam; a escolha não elimina risco de sedação e depressão respiratória.", f: "Maudsley Prescribing Guidelines, 15ª ed., 2025" },
      "Antipsicótico NÃO é o tratamento da abstinência: baixa o limiar convulsivo e não previne convulsão de abstinência. Entra só como adjuvante em alucinação ou agitação intensa, sobre a base do benzodiazepínico.",
      "Passada a janela da abstinência aguda, o benzodiazepínico deve SAIR. Mantê-lo cria uma dependência nova — e é o erro mais repetido.",
      "Manutenção da abstinência: naltrexona e acamprosato são primeira linha, associados a psicoterapia ou grupo. Dissulfiram é 2ª ou 3ª linha, com reação aversiva grave e necessidade de supervisão.",
      "Depressão que persiste após semanas de abstinência é depressão a tratar, não efeito residual do álcool.",
      { t: "Escala e fluxo operacional do HELR ainda precisam de confirmação local; os cartões trazem referências publicadas, não autorização para titulação sem monitorização.", v: true },
      { t: "Posologias agora nos cartões individuais; ler indicação, via e divergências antes de prescrever.", f: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004" }
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    farmacos: [
      { id: "tiamina", papel: "prevenir deficiência e Wernicke; não atrasar glicose em hipoglicemia" },
      { id: "diazepam",
        papel: "o preferido na abstinência aguda, pela meia-vida longa: não há rebote entre as doses" },
      { id: "clordiazepoxido",
        papel: "mesmo racional do diazepam na abstinência" },
      { id: "lorazepam", papel: "preferível em hepatopatia pela glucuronidação, sem metabólitos ativos; não dispensa cautela com sedação" },
      { id: "naltrexona", papel: "reduzir reforço e recaída; excluir uso de opioides" },
      { id: "acamprosato", papel: "sustentar abstinência; conferir função renal e divergência de peso" },
      { id: "dissulfiram", papel: "aversivo apenas com consentimento e supervisão" },
      { id: "haloperidol", outra: true,
        papel: "adjuvante só em alucinação ou agitação intensa, SOBRE a base do benzodiazepínico — nunca como tratamento da abstinência" }
    ],
    proibidos: ["glicose-antes-tiamina", "bzd-alcool-depressor", "bupropiona-limiar-convulsivo"]
  },

  conduta: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Já abstinente e SEM sinais de abstinência: o alvo é manter a abstinência, não desintoxicar",
      "Redução de danos é estratégia legítima da política brasileira — meta imposta de abstinência em quem não a quer derruba o vínculo e o tratamento",
      "Entrevista motivacional em vez de confronto: confrontação aumenta resistência",
      "Rede: CAPS AD, grupo de apoio, e a equipe da unidade seguem juntos — não é ou um ou outro",
      "Envolver família quando a pessoa autoriza, e cuidar de quem cuida",
      "Reavaliar sono, humor e ansiedade depois de semanas de abstinência, quando o quadro fica legível"
    ]
  },

  erros: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      { t: "Atrasar glicose em hipoglicemia para esperar tiamina, ou dar glicose de rotina sem avaliar indicação e carência nutricional.", f: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23" },
      "Iniciar benzodiazepínico fora da janela de abstinência aguda — cria dependência nova",
      "Manter o benzodiazepínico depois que a abstinência passou",
      "Tratar abstinência com antipsicótico isolado",
      "Esperar a tríade completa para pensar em Wernicke",
      "Atribuir toda confusão ao álcool e não procurar trauma craniano ou infecção",
      "Exigir abstinência como condição para atender",
      "Encaminhar ao CAPS AD sem tratar a abstinência que está acontecendo agora"
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "ansiedade-panico",
  nome: "Ansiedade, pânico e fobia social",
  kw: "ansiedade tag transtorno ansiedade generalizada panico agorafobia fobia social isrs benzodiazepinico tcc exposicao gad hiperventilacao",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Primeira crise após os 40 anos: investigar causa orgânica antes de rotular como pânico",
      "Dor torácica, dispneia, síncope ou alteração de sinal vital — descartar causa clínica antes",
      "Ideação suicida — ansiedade grave e pânico aumentam risco, sobretudo com depressão associada",
      "Hipertireoidismo, arritmia, feocromocitoma, embolia pulmonar, hipoglicemia e asma imitam crise de pânico",
      "Uso de estimulante, cafeína em excesso, ou abstinência de álcool e benzodiazepínico",
      "Ansiedade que surge dias após iniciar ou aumentar antipsicótico: pensar acatisia, não ansiedade"
    ]
  },

  perguntas: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "A ansiedade é constante e sobre várias coisas (TAG) ou vem em crises com começo e fim (pânico)?",
      "Na crise: pico em quanto tempo? Pânico atinge o auge em cerca de 10 minutos",
      "Sintomas da crise: palpitação, falta de ar, sudorese, tremor, tontura, formigamento, sensação de morte iminente ou de enlouquecer",
      "Depois da crise, ficou com medo de ter outra? Mudou a rotina por causa disso? (ansiedade antecipatória e esquiva)",
      "Deixou de sair, de usar transporte, de ficar sozinho ou em lugar cheio? (agorafobia)",
      "O medo é de ser avaliado, julgado ou passar vergonha, e some em casa? (fobia social)",
      "Preocupação difícil de controlar na maior parte dos dias por ≥6 meses, com tensão, irritabilidade, insônia e fadiga? (TAG)",
      "Cafeína, energético, estimulante, álcool e quando foi a última dose",
      "Sintoma físico predominante e quantos serviços já procurou por isso"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Sinais vitais e ausculta cardíaca e pulmonar — descartar antes de tranquilizar",
      "Tireoide: bócio, tremor fino, taquicardia, pele quente",
      "Ansiedade × angústia: ansiedade é antecipação apreensiva; angústia vem com corpo junto (aperto no peito, nó na garganta)",
      "Hipervigilância e varredura do ambiente",
      "Psicomotricidade: distinguir inquietação subjetiva que alivia ao movimentar (acatisia) de tensão ansiosa",
      "Sinais de intoxicação por estimulante ou de abstinência"
    ]
  },

  naoperder: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Causa cardíaca, pulmonar, tireoidiana ou metabólica na primeira crise",
      "Depressão coexistente — mais comum que ansiedade isolada, e muda o tratamento",
      "Bipolaridade por trás, antes de prescrever antidepressivo",
      "Abstinência de álcool ou de benzodiazepínico",
      "Acatisia medicamentosa",
      "Dependência de benzodiazepínico já instalada"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "TAG — preocupação difusa e persistente, ≥6 meses, sem crises delimitadas",
      "Transtorno de pânico — crises recorrentes e inesperadas, com ansiedade antecipatória e esquiva entre elas",
      "Fobia social — medo circunscrito a situação de avaliação social, comportamento normal em casa, início delimitado",
      "TEA × fobia social — no TEA a dificuldade social existe desde a primeira infância e é qualitativa; na fobia social há competência social preservada fora do contexto temido",
      "TOC — obsessão é ideia intrusiva reconhecida como própria e absurda, seguida de ritual que alivia",
      "TEPT — o gatilho remete a evento traumático definido, com revivescência e evitação",
      "Ansiedade secundária: hipertireoidismo, arritmia, asma, cafeína, estimulante, abstinência",
      "Acatisia — antipsicótico recente, inquietação que alivia ao movimentar"
    ]
  },

  exames: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "TSH e T4 livre",
      "Hemograma, glicemia, eletrólitos",
      "ECG na primeira crise, em quem tem fator de risco cardiovascular, e antes de tricíclico",
      "Investigação adicional guiada pelo achado — pedir tudo reforça a busca por doença e piora o quadro"
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Primeira linha farmacológica é ISRS — o mesmo grupo da depressão, em geral com início de dose MENOR, porque ISRS piora a ansiedade nas primeiras semanas.",
      "Fluoxetina — usual 20 mg/dia, faixa 5 a 80 mg/dia. Mais ativadora: em pânico, começar baixo e subir devagar para não precipitar crise.",
      "Sertralina — usual 50 a 150 mg/dia, faixa 50 a 200 mg/dia.",
      "Escitalopram — usual 10 mg/dia, faixa 10 a 30 mg/dia.",
      "Paroxetina — usual 20 mg/dia, faixa 10 a 50 mg/dia. Mais sedativa, o que ajuda na ansiedade; retirada difícil, o que atrapalha depois.",
      "Clomipramina — usual 150 a 200 mg/dia, faixa 50 a 300 mg/dia; iniciar 25 mg e subir 25 mg a cada 2 a 3 dias. No PÂNICO costumam bastar doses menores; no TOC são necessárias maiores.",
      "Benzodiazepínico é PONTE, não tratamento: prazo definido desde a primeira receita e plano de retirada combinado no mesmo dia.",
      "Alprazolam — faixa 0,5 a 2 mg/dia, usual 0,5 a 2 mg. Útil no pânico pela ação rápida, e o de maior potencial de dependência: meia-vida curta produz rebote entre as doses.",
      "Clonazepam — faixa 0,5 a 8 mg/dia, usual 0,5 a 2 mg. As gotas permitem retirar cerca de 0,12 mg a cada 2 semanas — é o que torna a descontinuação viável.",
      "Retirada de benzodiazepínico crônico: lenta, em gotas, negociada. Suspensão abrupta traz insônia e ansiedade de rebote que o paciente lê como prova de que precisa do remédio.",
      "Gestante com TAG leve a moderado e funcionamento preservado: começar por psicoterapia, atividade física e acompanhamento próximo — nada obriga a medicar.",
      { t: "Duração do tratamento e critério de retirada do ISRS na ansiedade: confirmar com o protocolo do serviço", v: true }
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013",
    farmacos: [
      { id: "fluoxetina",
        papel: "1ª linha — no pânico, começar baixo e subir devagar para não precipitar crise" },
      { id: "sertralina",
        papel: "1ª linha — a de interação mais limpa" },
      { id: "escitalopram",
        papel: "1ª linha — quando tolerabilidade é a prioridade" },
      { id: "paroxetina",
        papel: "1ª linha — a sedação ajuda na ansiedade; a retirada atrapalha depois" },
      { id: "clomipramina",
        papel: "o tricíclico mais serotoninérgico; no pânico costumam bastar doses menores que no TOC" },
      { id: "alprazolam",
        papel: "PONTE no pânico, pela ação rápida — e o de maior potencial de dependência" },
      { id: "clonazepam",
        papel: "PONTE — as gotas são o que torna a retirada viável" }
    ],
    combos: ["ansiedade-ad-base-bzd-ponte"],
    proibidos: ["bzd-alcool-depressor", "isrs-triciclico-imao", "isrs-tramadol"]
  },

  conduta: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "TCC tem eficácia igual ou superior ao fármaco na ansiedade, e o efeito dura mais depois de parar",
      "Fobia social e agorafobia: o tratamento é EXPOSIÇÃO gradual. Afastar da situação temida reforça a esquiva e piora",
      "Criança com fobia social: afastar da escola é iatrogenia — o caminho é retorno gradual com apoio",
      "Explicar o mecanismo da crise de pânico já reduz frequência: a crise é assustadora e não é perigosa, e o corpo volta sozinho",
      "Atividade física regular tem efeito ansiolítico consistente",
      "Cortar cafeína, energético e estimulante antes de subir dose de remédio",
      "Fica na APS: leve a moderado sem risco. Vai para o CAPS: grave, refratário, com risco ou com comorbidade importante"
    ]
  },

  erros: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Benzodiazepínico como tratamento de manutenção da ansiedade",
      "Renovar receita de benzodiazepínico por inércia, sem revisar a indicação",
      "Iniciar ISRS em dose cheia no pânico e precipitar crise — e o paciente abandonar o tratamento",
      "Chamar de piora a ansiedade das primeiras semanas de ISRS e trocar de fármaco",
      "Afastar da escola ou do trabalho a pessoa com fobia social",
      "Pedir bateria ampla de exames e alimentar a busca por doença",
      "Não perguntar sobre episódio prévio de humor elevado antes do antidepressivo",
      "Tratar acatisia como ansiedade"
    ]
  },

  scores: ["gad7", "phq9", "nota-conferencia"]
});

QUEIXAS.push({
  id: "delirium",
  nome: "Delirium",
  kw: "delirium confusao aguda flutuante desatencao idoso cam organico sindrome confusional demencia hipoativo",
  tag: "Psiquiatria",
  atualizado: "2026-09-16",

  redflags: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Delirium É uma emergência clínica: tem causa orgânica e mortalidade própria",
      "Hipoglicemia, hipóxia, sepse, retenção urinária, fecaloma, dor e infecção urinária são causas frequentes e reversíveis",
      "Delirium HIPOATIVO — sonolento, quieto, retraído — é o mais comum no idoso, o de pior prognóstico e o que passa despercebido porque não incomoda a equipe",
      "Abstinência alcoólica ou de benzodiazepínico como causa muda todo o tratamento",
      "Início agudo de confusão em quem tem demência é delirium sobreposto, não piora da demência",
      "Febre com rigidez em uso de antipsicótico: síndrome neuroléptica maligna"
    ]
  },

  perguntas: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Ao ACOMPANHANTE, sempre: como ele estava há uma semana? Isso começou quando?",
      "Começou de repente, em horas ou dias? (agudo é a regra do delirium)",
      "Piora no fim da tarde e à noite? Melhora de manhã? (flutuação)",
      "Que remédios começou, parou ou mudou nos últimos dias?",
      "Bebe? Quando foi a última dose? Usa benzodiazepínico?",
      "Febre, tosse, ardência ao urinar, diarreia, queda, dor",
      "Está urinando e evacuando normalmente? (retenção e fecaloma são causa clássica no idoso)",
      "Dormiu? Privação de sono e ambiente sem referência de dia e noite pioram tudo"
    ]
  },

  exame: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "NÍVEL DE CONSCIÊNCIA e sua flutuação — o achado central",
      "Atenção com tarefa: meses do ano de trás para frente, ou MUNDO ao contrário. Desatenção é o núcleo do diagnóstico",
      "Orientação no tempo e no espaço",
      "Sinais vitais, saturação e GLICEMIA CAPILAR",
      "Alucinação visual e ilusão — o padrão perceptivo do delirium",
      "Procurar globo vesical e fazer toque retal quando cabível — retenção e fecaloma",
      "Foco neurológico, sinal de trauma craniano, rigidez de nuca",
      "Revisar a lista de medicamentos procurando anticolinérgico, benzodiazepínico e opioide"
    ]
  },

  naoperder: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Hipoglicemia",
      "Hipóxia e sepse",
      "Abstinência alcoólica ou de benzodiazepínico",
      "Delirium hipoativo confundido com depressão ou com sonolência esperada",
      "Retenção urinária, fecaloma e dor não tratada no idoso",
      "Iatrogenia: anticolinérgico, benzodiazepínico, opioide, corticoide",
      "Hematoma subdural após queda",
      "Encefalopatia de Wernicke"
    ]
  },

  ddx: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Demência — início insidioso em meses a anos, consciência PRESERVADA, curso estável no dia. No delirium é agudo, flutuante e com consciência alterada",
      "Depressão no idoso — o hipoativo se parece muito; na depressão a atenção se sustenta com esforço e não há flutuação nem alucinação visual",
      "Psicose primária — consciência lúcida, alucinação auditiva predominante, sem flutuação",
      "Mania — humor elevado com consciência lúcida",
      "Afasia de Wernicke — fala fluente e incompreensível, sem alteração do nível de consciência",
      "Estado pós-ictal e estado de mal não convulsivo"
    ]
  },

  exames: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Glicemia capilar, saturação, hemograma, eletrólitos, função renal, urina tipo I e urocultura",
      "Radiografia de tórax e ECG conforme suspeita",
      "Imagem de crânio diante de trauma, foco neurológico, anticoagulação ou confusão que não melhora com o tratamento da causa",
      { t: "Painel mínimo e critérios de imagem no delirium: protocolo do HELR", v: true }
    ]
  },

  farmaco: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013",
    itens: [
      "O tratamento do delirium é a CAUSA. Nenhum psicofármaco encurta delirium — eles controlam sintoma enquanto a causa é tratada.",
      "Medida não farmacológica primeiro, e ela funciona: reorientação, luz de dia e escuro à noite, óculos e aparelho auditivo, mobilização precoce, presença de familiar, hidratação, sono protegido.",
      "Retirar o que está causando: anticolinérgico, benzodiazepínico, opioide em excesso.",
      "Antipsicótico só quando há agitação que ameaça a segurança ou impede o tratamento — na menor dose e pelo menor tempo.",
      "Haloperidol é o mais usado: máximo 15 mg/dia em situação aguda. Em idoso, começar por fração da dose do adulto.",
      "Haloperidol é CONTRAINDICADO em Parkinson e em demência de corpos de Lewy — a piora é dramática.",
      "Benzodiazepínico PIORA delirium não alcoólico. A exceção é a abstinência de álcool ou de benzodiazepínico, onde ele é o tratamento.",
      "Rever a indicação do antipsicótico todos os dias e suspender assim que a agitação ceder — antipsicótico iniciado no delirium costuma sair de alta junto com o paciente, sem ninguém ter decidido isso.",
      { t: "Doses e escolha de antipsicótico no delirium segundo o protocolo do HELR", v: true }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    farmacos: [
      { id: "haloperidol",
        papel: "o mais usado — e só quando a agitação ameaça a segurança: menor dose, menor tempo, revisto todo dia" }
    ],
    proibidos: ["bzd-delirium", "haloperidol-parkinson-lewy"]
  },

  conduta: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Diagnosticar é clínico e leva dois minutos: início agudo + curso flutuante + desatenção",
      "Buscar a causa ativamente e tratar — não existe delirium sem causa, existe causa não procurada",
      "Prevenção funciona melhor que tratamento no idoso internado: mobilizar, orientar, proteger o sono, corrigir visão e audição, hidratar",
      "Explicar à família o que é, que é agudo e que costuma melhorar com a causa — o susto é grande e a informação reduz sofrimento",
      "Registrar o achado que sustenta o diagnóstico, não só o rótulo",
      "Delirium é preditor de pior desfecho e de declínio cognitivo — merece seguimento após a alta"
    ]
  },

  erros: {
    fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
    itens: [
      "Chamar de demência ou de piora da demência sem investigar causa aguda",
      "Não diagnosticar o delirium hipoativo porque o paciente está quieto",
      "Benzodiazepínico em delirium não alcoólico",
      "Haloperidol em Parkinson ou em corpos de Lewy",
      "Sedar antes de medir glicemia e saturação",
      "Contenção física como primeira medida em vez de reorientação e presença de familiar",
      "Manter o antipsicótico na alta sem ninguém ter decidido isso",
      "Não procurar retenção urinária, fecaloma e dor no idoso confuso"
    ]
  },

  scores: ["nota-conferencia"]
});

/* =====================================================================
 * PSIQUIATRIA — onda 2 (23/09/2026): 12 quadros por doença e 2 por situação
 * (clozapina, troca e retirada). Mesmas regras da onda 1, e uma a mais: a
 * queixa não escreve dose — o número mora no cartão do psicofarmacos.js,
 * com fonte e página.
 * ===================================================================== */

QUEIXAS.push({
  id: "clozapina",
  nome: "Clozapina — início, monitorização e efeitos graves",
  kw: "clozapina clozaril leponex sialorreia hemograma neutropenia agranulocitose miocardite constipacao ileo convulsao tabagismo refrataria pneumonia",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Febre, dor de garganta ou úlcera oral — hemograma no mesmo dia, não no retorno",
      "Prisão de ventre nova, distensão, vômito, diarreia de transbordo ou abdome agudo — hipomotilidade e íleo matam mais que agranulocitose",
      "Dor torácica, dispneia, taquipneia, hipotensão ou mal-estar gripal nas primeiras semanas — miocardite até prova em contrário",
      "Taquicardia de repouso com febre, hipotensão ou dor no peito — não é a taquicardia benigna do início",
      "Convulsão ou mioclonia com joelho que cede — reduzir e discutir anticonvulsivante; não subir a titulação",
      "Parou de fumar, internou ou teve pneumonia — o nível sobe mesmo com adesivo de nicotina",
      "Última dose há mais de 48 horas — retitular; dose plena de manutenção num ingênuo pode matar",
      "Citopenia: leucócitos abaixo de 3.000, neutrófilos abaixo de 1.500 ou plaquetas abaixo de 100.000 — suspender e chamar hematologista"
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Dois antipsicóticos em dose e tempo adequados já falharam, ou há discinesia tardia ou tentativa de suicídio — é isso que autoriza a clozapina no PCDT",
      "Há como fazer hemograma semanal nas 18 primeiras semanas, e depois o restante do esquema, sem falha de logística",
      "Última evacuação: quando, consistência, dor, vômito — o paciente quase não relata constipação grave",
      "Baba de dia e de noite, engasgo, tosse ao deitar — sialorreia e risco de aspiração",
      "Fuma quanto, mudou na internação, vapeia ou usa adesivo — só a fumaça de tabaco induz o fígado",
      "Febre, dor no peito, falta de ar, palpitações nas últimas semanas",
      "Já teve convulsão, epilepsia ou deficiência intelectual — o PCDT exige parecer de neurologista",
      "Cardiopatia, diabetes instável, íleo prévio ou agranulocitose por clozapina — contraindicam início na comunidade",
      "Quem observa o paciente fora do horário e o que fazer se o hemograma vier vermelho",
      "Outros mielossupressores: carbamazepina, quimioterapia, alguns antibióticos e inibidores de bomba",
      "Gravidez possível ou lactação — o PCDT manda evitar se a gravidez não puder ser prevenida",
      "Adesão real: quem guarda o comprimido e quem leva ao laboratório"
    ]
  },

  exame: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Pressão sentado e em pé, frequência, saturação, temperatura e frequência respiratória na titulação",
      "Abdome: distensão, ruídos, dor — exame abdominal antes de iniciar se já há prisão de ventre",
      "Sialorreia visível, toalha no travesseiro, voz molhada, estertor — pista de aspiração",
      "Sedação, hipotensão postural e sialorreia são o trio do começo, não sinal de dose plena atingida",
      "Sinais de insuficiência cardíaca: edema, dispneia, terceira bulha — parar e referir cardiologia",
      "Peso, cintura e exame metabólico de base — o ganho costuma ser intenso no primeiro ano"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Constipação tratada como detalhe — a hipomotilidade é emergência abdominal",
      "Febre de titulação tratada como virose, sem hemograma e sem pensar em miocardite ou pneumonia",
      "Parada de tabaco na enfermaria sem ajuste nem nível",
      "Anticolinérgico sistêmico de primeira linha para baba — piora o intestino e a cognição",
      "Chamar de falha a clozapina com poucas semanas: o PCDT pede meses em dose plena",
      "Reiniciar a dose de manutenção depois de mais de 48 horas parado",
      "Agranulocitose prévia por clozapina seguida de rechallenge"
    ]
  },

  ddx: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Neutropenia coincidental — queda breve, não contínua, outra causa óbvia; a agranulocitose da clozapina cai rápido rumo a zero, em geral nas 18 primeiras semanas",
      "Febre de titulação — comum nas primeiras 4 semanas, com PCR e eosinófilos altos; ainda assim hemograma no dia e miocardite no DDx",
      "Miocardite — hipotensão, dispneia, dor torácica, febre ou náusea isolada nas primeiras 6 a 8 semanas",
      "Taquicardia sinusal benigna do início — frequente e sozinha não manda parar; com febre, hipotensão ou dor no peito vira cardiotoxicidade",
      "Pneumonia por aspiração da saliva — causa comum de morte; infecção ainda sobe o nível",
      "Síndrome neuroléptica maligna — rigidez, instabilidade autonômica e CK alta, não só febre de titulação",
      "Íleo e hipomotilidade — dor, distensão, vômito fecaloide ou diarreia de transbordo; não é prisão de ventre banal",
      "Convulsão da clozapina — ligada a nível e a subida rápida; mioclonia pode anteceder a crise tônico-clônica"
    ]
  },

  exames: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Hemograma completo obrigatório antes de iniciar",
      "No Brasil o PCDT manda semanal nas 18 primeiras semanas e a cada aumento de dose, depois mensal enquanto durar o uso",
      "O Maudsley, no esquema britânico, acrescenta quinzenal no restante do primeiro ano antes do mensal — divergência: seguir o protocolo do serviço e não misturar os dois calendários",
      "ECG de base; ecocardiograma se houver indício clínico",
      "Glicemia, lipídios, função hepática, ureia e eletrólitos de base",
      { t: "PCR, CK, troponina e peptídeo natriurético na titulação ou se a temperatura passar de 38 °C: conferir o painel do serviço", v: true },
      "Peso, IMC e cintura no início, no primeiro mês e depois no ritmo metabólico do protocolo"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "A clozapina é o único antipsicótico com lastro claro na refratariedade e o que o PCDT tira da terceira linha na discinesia tardia e na tentativa de suicídio",
      "Refratariedade no PCDT: falha de pelo menos dois antipsicóticos, cada um por pelo menos 6 semanas em dose adequada, sem queda de 30% na BPRS — salvo suicídio de alto risco ou discinesia tardia grave, que autorizam antes",
      "Sem combinado real de hemograma seriado não se inicia — não é excesso de zelo",
      "Titulação lenta e individualizada; o número mora no cartão. Titulação rápida aumenta miocardite, convulsão e falha por intolerância",
      "Julgar falha só depois de 6 meses em dose plena: o mecanismo é mais lento que o dos outros",
      "O PCDT não recomenda somar segundo antipsicótico de rotina depois da clozapina; o Maudsley admite adjunto depois de otimizar, com efeito pequeno e reavaliação em 3 a 6 meses",
      "Parar tabaco (inclusive internar) reduz a indução de CYP1A2: o nível sobe. Adesivo e vape não substituem a fumaça nesse ponto",
      "Constipação: laxante estimulante cedo, não esperar o relato. Formador de bolo não resolve trânsito lento",
      "Sialorreia é dose-relacionada e persiste; tratar, porque aspira. Anticolinérgico sistêmico não é primeira linha",
      "Se a última dose foi há mais de 48 horas, retitular. Interrupção de mais de uma semana trata-se como início de novo",
      "Saída do PCDT se caiu por agranulocitose: olanzapina, quetiapina, risperidona ou ziprasidona, de preferência as que ainda não foram usadas"
    ]
  },

  formulario: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "clozapina", papel: "o fármaco da refratariedade — e a escolha formal do PCDT em discinesia tardia e em tentativa de suicídio" },
      { id: "aripiprazol", papel: "adjunto depois de otimizar a clozapina — rende mais no metabólico e na enurese do que no delírio residual" },
      { id: "olanzapina", papel: "saída do PCDT se a clozapina caiu por agranulocitose — não é potencializador de rotina" },
      { id: "quetiapina", papel: "outra saída do PCDT após interrupção da clozapina" },
      { id: "risperidona", papel: "saída possível após interrupção; não soma de rotina com a clozapina" },
      { id: "lamotrigina", outra: true, papel: "depois de convulsão ou sintoma negativo residual — o PCDT ainda não a incorpora como adjunto da clozapina" },
      { id: "carbonato-de-litio", outra: true, papel: "sobe neutrófilo em neutropenia coincidental — não rechallenge depois de agranulocitose da clozapina" },
      { id: "terapia-de-reposicao-de-nicotina", outra: true, papel: "substitui nicotina; não induz CYP1A2 — o nível da clozapina sobe mesmo assim" }
    ],
    combos: ["clz-aripiprazol"],
    proibidos: ["clozapina-sem-hemograma", "clz-parar-fumar", "clz-carbamazepina", "clz-anticolinergico-sistemico"]
  },

  conduta: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Combinar hemograma, evacuação e tabaco ANTES da primeira dose — depois a logística vira o risco",
      "Início na comunidade só se adesão, contato e acesso fora do horário estiverem resolvidos; senão, internar para titulação",
      "Perguntar evacuação em toda coleta de hemograma; laxante estimulante cedo, não formador de bolo",
      "Febre: hemograma hoje. Se houver pista cardíaca ou PCR/troponina altas, parar e referir",
      "Mudança de tabaco: avisar, pedir nível se o serviço tiver, e reduzir com quem prescreve — não esperar toxicidade",
      "Citopenia do PCDT: suspender, hematologista, e só reavaliar inclusão com parecer",
      "Agranulocitose atribuída à clozapina: não rechallenge. Neutropenia breve e coincidental é outra conversa, com o serviço de monitorização",
      "Encaminhar não é transferir: o CAPS que inicia é o que garante a coleta semanal"
    ]
  },

  erros: {
    fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Iniciar clozapina sem combinado de hemograma seriado",
      "Tratar febre de titulação como virose e não pedir hemograma",
      "Ignorar prisão de ventre porque o paciente não se queixa",
      "Anticolinérgico sistêmico de primeira linha para sialorreia",
      "Parar de fumar na enfermaria sem avisar quem prescreve clozapina",
      "Chamar de falha a clozapina com poucas semanas em dose ainda em subida",
      "Reiniciar a dose de manutenção depois de mais de 48 horas parado",
      "Somar carbamazepina para proteger de convulsão",
      "Rechallenge depois de agranulocitose da própria clozapina"
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "troca-retirada",
  nome: "Troca e retirada de psicofármaco",
  kw: "troca retirada descontinuacao washout imao cross-taper recaida sindrome paroxetina venlafaxina clozapina litio",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Parar IMAO e começar ISRS ou tricíclico sem lavagem — síndrome serotoninérgica",
      "Fluoxetina parada há pouco e IMAO iniciado — a meia-vida longa ainda ocupa o sistema",
      "Clozapina interrompida há mais de 48 horas e retomada na dose de manutenção — hipotensão, convulsão, miocardite",
      "Lítio parado de golpe — recaída maníaca ou depressiva em semanas, não em meses",
      "Antipsicótico cortado em dias — recaída e sintomas de retirada, inclusive psicose de descontinuação",
      "Ideação suicida nova ao retirar paroxetina ou outro ISRS — pode ser retirada, não só recaída",
      "Rebound colinérgico da clozapina: náusea, diarreia, sudorese, cefaleia, distonia ou catatonia nas primeiras horas e dias"
    ]
  },

  perguntas: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Qual fármaco, há quanto tempo, em que dose plena, e por que troca: falha, intolerância ou pedido do paciente",
      "Já tentou parar antes, e o que apareceu nos primeiros dias",
      "ISRS, dual, tricíclico ou IMAO — a lavagem muda de par para par",
      "Fluoxetina recente: mesmo já suspensa, o metabólito ainda conta semanas",
      "Antipsicótico oral ou depósito, e a última aplicação do depósito",
      "Clozapina: última tomada, em horas — o corte de 48 horas muda a conduta",
      "Lítio: última litemia e se a retirada foi rápida",
      "Tabaco: vai internar ou parar agora, em cima de clozapina ou olanzapina",
      "Zaps, tontura, náusea, insônia e choque elétrico na cabeça — pista de retirada, não de recaída",
      "Quanto tempo de remissão: primeiro episódio psicótico ou multi-episódio muda quando se tenta parar",
      "Outro serotonérgico na lista: tramadol, linezolida, triptano, erva de São João",
      "Quem observa os primeiros 14 dias da troca e o que fazer se piorar"
    ]
  },

  exame: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Estado mental de agora contra o da semana passada — retirada começa em dias; recaída, em semanas",
      "Hiperreflexia, clônus, tremor, diaforese e febre baixa — sobreposição serotoninérgica na troca",
      "Agitação, insônia e ansiedade nas primeiras 72 horas após corte de antipsicótico — retirada histaminérgica e colinérgica",
      "Náusea, diarreia, sialorreia e sudorese após corte de clozapina — rebound colinérgico",
      "Sinais motores novos: acatisia, distonia ou discinesia de retirada",
      "Pressão e pulso se sai de IMAO ou de clozapina"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Lavagem de IMAO — o proibido isrs-triciclico-imao já existe; o intervalo exato muda com a fluoxetina",
      "Parada brusca de paroxetina ou venlafaxina chamada de recaída",
      "Stop-start para fluoxetina como se o primeiro comprimido já cobrisse o ISRS que saiu",
      "Clozapina retomada na dose antiga depois de mais de 48 horas",
      "Corte linear de antipsicótico até zero — o último degrau é o maior em ocupação D2",
      "Retirada rápida de lítio em quem estava bem",
      "Internação do fumante de clozapina tratada como troca de ambiente, não como parada de indutor"
    ]
  },

  ddx: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Síndrome de retirada de antidepressivo — início em dias, zaps, tontura, náusea; some em horas ou dias ao reintroduzir",
      "Recaída da depressão ou da ansiedade — semanas, o quadro antigo volta, sem os somáticos típicos da retirada",
      "Síndrome serotoninérgica na sobreposição — clônus, hiperreflexia, febre, agitação; não é ativação leve de ISRS",
      "Psicose de descontinuação — alucinação e delírio em quem tomava antipsicótico até para náusea; não prova esquizofrenia nova",
      "Recaída da esquizofrenia — pode ser precipitada pela velocidade do corte, não só pela doença de fundo",
      "Rebound colinérgico da clozapina — diarreia, vômito, sudorese e catatonia; não é gastroenterite isolada",
      "Mania de retirada de lítio — semanas após corte rápido; não é história natural inevitável",
      "Abstinência de benzodiazepínico — insônia, tremor, convulsão; não tratar com outro depressor sem plano"
    ]
  },

  farmaco: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Cross-taper é o padrão: desce o que sai enquanto sobe o que entra, no ritmo da tolerância. Parada brusca só se o evento adverso for grave",
      "Quem usa antidepressivo há menos de 3 a 4 semanas em geral tolera parar e começar o outro no dia seguinte; depois disso, retirar devagar",
      "Entre ISRS a troca direta às vezes cobre a retirada; para fluoxetina o nível sobe lento — stop-start deixa um buraco de efeito",
      "IMAO irreversível: não se cruza. Fluoxetina pede a lavagem mais longa; moclobemide, a mais curta. Os números estão na relação de washout",
      "Paroxetina e venlafaxina têm a retirada mais dura da prática diária; meia-vida curta e uso irregular pioram",
      "Antipsicótico: não cortar de golpe. Recaída concentra-se nas primeiras semanas após parada rápida. Taper lento, cortes menores no fim",
      "Tentativa de parar antipsicótico só entra em conversa depois de meses de remissão no primeiro episódio, ou de um ano no multi-episódio — e ainda assim a recaída é frequente",
      "Clozapina: mais de 48 horas parado manda retitular; mais de uma semana, como início. Rebound colinérgico e psicose rápida são o preço da parada abrupta",
      "Lítio: retirada rápida dispara recaída; descer devagar",
      "Troca por tolerância (peso, prolactina, acatisia): o Maudsley aponta aripiprazol, ziprasidona e outros de menor impacto — o papel está no formulário, a dose no cartão",
      "Distinguir retirada de recaída muda a conduta: retirada grave manda reintroduzir o mesmo fármaco e descer mais devagar, não pular para outro"
    ]
  },

  formulario: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "fluoxetina", papel: "meia-vida longa — cobre retirada de ISRS curto; para IMAO é a lavagem mais longa" },
      { id: "paroxetina", papel: "a pior retirada da classe ISRS — não se corta de golpe" },
      { id: "sertralina", papel: "ISRS de troca; entre pares da classe a passagem direta às vezes basta" },
      { id: "venlafaxina", papel: "dual com retirada intensa — descer devagar, como a paroxetina" },
      { id: "mirtazapina", papel: "exemplo clássico de cross-taper quando o ISRS sai por insônia ou náusea" },
      { id: "clozapina", papel: "se parou mais de 48 horas, retitular; parada abrupta dá rebound colinérgico e psicose rápida" },
      { id: "olanzapina", papel: "também CYP1A2: parar de fumar sobe o nível; no corte, o último degrau é o maior em D2" },
      { id: "aripiprazol", papel: "destino frequente na troca por peso, glicose, prolactina ou acatisia" },
      { id: "carbonato-de-litio", papel: "não se para de golpe — recaída maníaca ou depressiva segue a velocidade da retirada" }
    ],
    combos: ["trc-cross-taper"],
    proibidos: ["isrs-triciclico-imao", "trc-imao-washout", "trc-parada-brusca", "trc-litio-abrupto"]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Escrever o plano de descida e de subida em dias, com quem observa e o que fazer se zaps, insônia ou psicose aparecerem",
      "Evento grave (serotoninérgica, agranulocitose, miocardite): para o culpado agora; o resto não se cruza",
      "Retirada leve de antidepressivo: explicar que é comum e que passa. Retirada grave: reintroduzir o mesmo e descer mais devagar",
      "IMAO: conferir o par na tabela de lavagem antes de qualquer primeiro comprimido do outro",
      "Antipsicótico de manutenção: testar um corte pequeno e esperar semanas antes do próximo; se piorar, voltar um ou dois degraus — não prova que parar seja impossível para sempre",
      "Depósito não é auto-taper eterno: no fim ainda falta passar para oral em frações pequenas",
      "Clozapina parada: tratar rebound, não retomar a dose antiga depois de 48 horas",
      "Fumante internado em clozapina ou olanzapina: tratar como parada de indutor, não como detalhe da enfermaria"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Parar paroxetina ou venlafaxina de uma vez",
      "Começar IMAO no dia seguinte de um ISRS",
      "Trocar para fluoxetina em stop-start e achar que o primeiro dia já cobre o que saiu",
      "Chamar zaps e tontura de recaída e religar dose plena de outro fármaco",
      "Cortar antipsicótico em degraus iguais até zero",
      "Retomar clozapina na dose de manutenção depois de três dias parado",
      "Parar lítio de golpe em quem estava estável",
      "Esquecer que internar o fumante de clozapina é parar de fumar"
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "toc",
  nome: "Transtorno obsessivo-compulsivo",
  kw: "toc obsessivo compulsivo ritual lavagem verificacao clomipramina fluvoxamina",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Diagnóstico, 2009 · AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011",
    itens: [
      "Ritual que impede comer, beber ou dormir — o TOC grave é incapacidade, não mania",
      "Ideação suicida: perguntar agora; depressão comórbida é a regra, não a exceção",
      "Automutilação ligada a ritual (lavagem até ferir, escovação até gengiva sangrar)",
      "Início súbito na criança com tique e infecção — PANDAS/PANS entra no DDx, não fecha sozinho",
      "Insight ausente com convicção delirante — não é TOC simples; rever psicose"
    ]
  },

  perguntas: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Diagnóstico, 2009 · AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011",
    itens: [
      "O que a mente impõe (obsessão) e o que a pessoa faz para aliviar (compulsão) — os dois, não só o ritual visível",
      "Quanto tempo do dia some com isso — uma hora já é limiar clínico; várias horas é grave",
      "Preocupação com um defeito físico mínimo ou imaginado, conferir no espelho, evitar ser visto",
      "Tiques motores ou vocais, agora ou na infância, e em parentes de primeiro grau",
      "Quando começou e quando procurou ajuda — no Brasil a demora média passa de 10 anos, porque o sintoma é escondido por vergonha",
      "Humor: tristeza, perda de interesse, ideação suicida",
      "Já tentou ISRS? Qual, quanto tempo, se chegou na faixa alta — troca precoce fabrica refratariedade",
      "Uso de substância, gravidez, outro fármaco serotoninérgico"
    ]
  },

  exame: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Diagnóstico, 2009",
    itens: [
      "Mãos, pele, couro e mucosa oral — lesão de lavagem ou de ritual",
      "Insight: a pessoa sabe que o medo é excessivo, ou está convencida",
      "Tique, estereotipia, lentificação",
      "Humor observado e ideação suicida em voz alta",
      "Exame físico dirigido se o ritual substitui higiene ou alimentação"
    ]
  },

  naoperder: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Diagnóstico, 2009 · AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Tratar com dose de depressão e declarar falha em quatro semanas",
      "Clomipramina de primeira linha em quem nunca fez ISRS em faixa alta",
      "Benzodiazepínico como tratamento do TOC",
      "Depressão e suicídio não perguntados porque o quadro 'é só ritual'",
      "Tique e TOC tratados como a mesma coisa"
    ]
  },

  ddx: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Diagnóstico, 2009",
    itens: [
      "TOC — obsessão egodistônica e compulsão que alivia de modo incompleto",
      "Transtorno dismórfico corporal — o conteúdo é aparência; o ritual é espelho e camuflagem",
      "Transtorno de tique / Tourette — movimento ou som involuntário, não um ritual para desfazer um pensamento",
      "Transtorno de ansiedade generalizada — preocupação com problemas reais, sem ritual de desfazer",
      "Esquizofrenia — a convicção é delirante e o insight não volta com argumentação",
      "Transtorno do espectro autista — ritual de sameness, sem o medo obsessivo típico",
      "Uso de estimulante ou de cocaína — ritual induzido, some com a substância"
    ]
  },

  farmaco: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Primeira linha: ISRS em dose alta e por tempo longo. A faixa da depressão não basta. Fluoxetina, sertralina, fluvoxamina, paroxetina, citalopram e escitalopram entram; a fluvoxamina tem lastro específico de TOC.",
      "Latência de 10 a 12 semanas para julgar resposta — mais lenta que a depressão. Manter pelo menos um ano depois de responder.",
      "Clomipramina é segunda linha, depois de ISRS em faixa alta. Mais efeito e mais adverso (cardíaco, anticolinérgico, convulsão).",
      "Antipsicótico em dose baixa só como reforço se o ISRS falhou; não é tratamento do TOC.",
      "Exposição e prevenção de resposta (TCC) anda junto. Fármaco isolado raramente fecha o caso.",
      "O número de cada fármaco está no cartão. O dm-fluoxetina e o toc-isrs-dose-maior marcam que a dose muda de função."
    ]
  },

  formulario: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "fluoxetina", papel: "ISRS de primeira linha no TOC — a faixa é a alta, não a da depressão" },
      { id: "sertralina", papel: "ISRS de primeira linha; faixa larga e interação mais limpa" },
      { id: "fluvoxamina", papel: "ISRS com lastro específico de TOC; interações CYP1A2" },
      { id: "paroxetina", papel: "ISRS; retirada pior da classe — não cortar de golpe" },
      { id: "escitalopram", papel: "ISRS; a diretriz brasileira cita faixa mais estreita que os outros" },
      { id: "citalopram", papel: "ISRS; QT na dose alta, sobretudo no idoso" },
      { id: "clomipramina", papel: "segunda linha — tricíclico serotoninérgico depois de ISRS em faixa alta" },
      { id: "venlafaxina", papel: "alternativa quando o ISRS falhou; pressórica na faixa alta" }
    ],
    dosemuda: ["dm-fluoxetina", "toc-isrs-dose-maior"],
    proibidos: ["isrs-triciclico-imao"]
  },

  conduta: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Nomear obsessão e compulsão na frente do paciente — o segredo alimenta o ritual",
      "ISRS em faixa de TOC + TCC (exposição e prevenção de resposta) como eixo",
      "Reavaliar em semanas para adesão e suicídio; julgar eficácia só depois de dois a três meses em dose plena",
      "Clomipramina se dois ISRS falharam em tempo e dose",
      "APS segura o leve com vínculo; ritual incapacitante, suicídio ou insight delirante saem para o CAPS",
      "Encaminhar não é sumir"
    ]
  },

  erros: {
    fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Prescrever fluoxetina na dose da depressão e trocar em quatro semanas",
      "Chamar de refratário quem nunca fez faixa alta",
      "Clomipramina de primeira linha no jovem cardíaco",
      "Benzodiazepínico para 'acalmar o ritual'",
      "Não perguntar suicídio porque o quadro parece 'só mania de limpeza'"
    ]
  },

  scores: ["phq9", "gad7", "nota-conferencia"]
});

QUEIXAS.push({
  id: "tept",
  nome: "Transtorno de estresse pós-traumático",
  kw: "tept trauma estresse pesadelo flashback hipervigilancia prazosina",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Ideação suicida, plano ou meio disponível — o TEPT concentra suicídio; perguntar agora",
      "Dissociação com risco (atravessar rua, não lembrar trajetos, automutilação)",
      "Uso de álcool ou benzodiazepínico para dormir o pesadelo — troca um trauma por dependência",
      "Violência atual em casa — o 'tratamento' começa por segurança, não por receita",
      "Psicose, mania ou recusa de líquido — não é TEPT simples"
    ]
  },

  perguntas: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "O evento: o que aconteceu, quando, se ainda está exposto",
      "Revivescência (flashback, pesadelo), evitação, hipervigilância e embotamento — os quatro eixos",
      "Sono: pesadelo, despertar, medo de deitar",
      "Álcool, maconha, estimulante, benzodiazepínico — o que usa para 'desligar'",
      "Ideação suicida e automutilação",
      "Já fez psicoterapia focada no trauma (exposição, EMDR, TCC) — fármaco não é a primeira linha",
      "Gravidez, outro ISRS, pressão baixa se já tentou prazosina"
    ]
  },

  exame: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Hipervigilância na sala: sobressalto, olhar na porta, dificuldade de sentar de costas",
      "Humor, dissociação, insight",
      "Lesão de automutilação, cheiro de álcool",
      "Pressão sentado e em pé se prazosina entrar",
      "Sinais de uso de substância"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Benzodiazepínico de manutenção — o livro o descreve como relativamente ineficaz e de uso cuidadoso",
      "Tratar só o pesadelo e ignorar o trauma ainda acontecendo",
      "ISRS em dose de arranque plena — piora inicial de ansiedade",
      "Declarar falha antes de semanas em dose plena",
      "Prazosina como se tratasse o TEPT inteiro"
    ]
  },

  ddx: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "TEPT — trauma identificável, revivescência, evitação e hipervigilância por mais de um mês",
      "Transtorno de adaptação — estressor e proporcionalidade, sem revivescência típica",
      "Depressão — anedonia sem o eixo de ameaça e pesadelo traumático",
      "Pânico — ataque sem o fio do trauma",
      "Uso de substância — a abstinência imita hipervigilância",
      "TCE e epilepsia temporal — revivescência orgânica",
      "Psicose — a voz não é o flashback; o delírio não cede com o relato do evento"
    ]
  },

  farmaco: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Psicoterapia focada no trauma vem antes do fármaco. ISRS (paroxetina, sertralina, fluoxetina) e venlafaxina de liberação modificada são a primeira linha medicamentosa.",
      "Começar com metade da dose de depressão: a piora inicial de ansiedade é regra.",
      "Prazosina entra na segunda linha para pesadelo e sono, com titulação lenta por hipotensão. Não trata evitação nem hipervigilância.",
      "Antipsicótico (olanzapina, quetiapina, risperidona) só para intrusão refratária — não para o TEPT inteiro.",
      "Benzodiazepínico não é tratamento. Ponte de crise, se existir, é curta e tem nome de proibido se virar manutenção.",
      "Número no cartão."
    ]
  },

  formulario: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    farmacos: [
      { id: "sertralina", papel: "ISRS preferido no TEPT — primeira linha medicamentosa depois da psicoterapia" },
      { id: "fluoxetina", papel: "ISRS preferido; começar baixo" },
      { id: "paroxetina", papel: "ISRS preferido; a pior retirada da classe" },
      { id: "venlafaxina", papel: "primeira linha medicamentosa em liberação modificada; pressórica" },
      { id: "prazosina", outra: true, papel: "segunda linha só para pesadelo e sono — titular devagar, hipotensão" },
      { id: "mirtazapina", papel: "segunda linha; o livro a cita, não é o eixo" },
      { id: "olanzapina", outra: true, papel: "intrusão refratária — não trata evitação nem hipervigilância" },
      { id: "quetiapina", outra: true, papel: "intrusão; metabólico pesa" }
    ],
    proibidos: ["tept-bzd-manutencao"]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Segurança primeiro: o trauma ainda acontece? Encaminhar proteção, não só receita",
      "Oferecer psicoterapia focada no trauma; fármaco se o sintoma impede a terapia ou se ela não está disponível",
      "ISRS em arranque baixo; reavaliar suicídio cedo",
      "Prazosina só se o pesadelo restar depois do ISRS, com pressão medida",
      "Não prescrever benzodiazepínico de caixa para 'dormir o TEPT'",
      "APS segura o vínculo; risco, dissociação grave ou violência atual saem com matriciamento"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Diazepam todas as noites para o pesadelo",
      "Prazosina como único tratamento do TEPT",
      "ISRS em dose plena no primeiro dia",
      "Ignorar o álcool que 'ajuda a dormir'",
      "Mandar para casa sem perguntar se o agressor mora junto"
    ]
  },

  scores: ["phq9", "gad7", "nota-conferencia"]
});

QUEIXAS.push({
  id: "demencia",
  nome: "Demência e BPSD — Alzheimer, Lewy e o que não se seda",
  kw: "demencia alzheimer donepezila rivastigmina memantina bpsd lewy agitacao",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Queda, síncope ou confusão nova após inibidor de colinesterase — bradicardia até prova em contrário",
      "Agitação com febre, dor, retenção urinária ou obstipação — BPSD começa por causa física",
      "Alucinação visual precoce, parkinsonismo e flutuações — Lewy; haloperidol aqui mata",
      "Declínio em semanas, não em meses — delirium ou hematoma, não Alzheimer",
      "Cuidador exausto com ideação de agressão — a urgência é a dupla, não só o Mini-Mental"
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Quem nota o quê, e há quanto tempo — o paciente minimiza; a família data",
      "Memória, orientação, linguagem, praxia, julgamento e quanto já perdeu de autonomia",
      "Alucinação visual, queda, sonolência que vai e volta — pista de Lewy",
      "Mudança de personalidade, desinibição, linguagem — pista de frontotemporal (o PCDT não trata com estes fármacos)",
      "Lista de remédio com anticolinérgico, opioide, benzodiazepínico e Z-drug",
      "Dor, prisão de ventre, infecção, fome, sono — o BPSD costuma ser necessidade não dita",
      "Quem cuida de noite e o que acontece se essa pessoa adoecer"
    ]
  },

  exame: {
    fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Marcha, tremor, rigidez, reflexo postural — Parkinson e Lewy mudam o fármaco",
      "Pulso e pressão sentado e em pé antes de subir colinesterase",
      "Sinais de dor, retenção, fecaloma, desidratação",
      "Pele sob adesivo de rivastigmina, se já usa",
      "Estado mental: flutuação da atenção (delirium) versus déficit estável"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025",
    itens: [
      "Haloperidol na Lewy",
      "Antipsicótico de rotina no BPSD sem causa física",
      "Anticolinérgico (biperideno, amitriptilina, oxibutinina) junto da donepezila",
      "Tratar frontotemporal ou esclerose múltipla com inibidor de colinesterase",
      "Subir dose na primeira semana porque 'não viu efeito'"
    ]
  },

  ddx: {
    fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Alzheimer — memória episódica e orientação que degradam em meses a anos",
      "Lewy — alucinação visual, parkinsonismo, flutuação; antipsicótico é perigo",
      "Vascular — degraus após AVC; o PCDT só trata se houver Alzheimer junto",
      "Frontotemporal — desinibição e linguagem; não usar estes fármacos",
      "Delirium — horas a dias, atenção flutuante, causa clínica",
      "Depressão do idoso (pseudodemência) — a queixa de memória é maior que o déficit medido",
      "Hipotireoidismo, B12, sífilis, hematoma subdural crônico"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Donepezila, rivastigmina e galantamina: Alzheimer leve a moderada (donepezila também na grave). Titular devagar. Número no cartão.",
      "Memantina: moderada a grave, só ou com inibidor, segundo o PCDT. Ajuste na doença renal.",
      "BPSD: dor, infecção, obstipação, ambiente e cuidador primeiro. Antipsicótico é exceção, curto, e na Lewy quase não se usa.",
      "Não somar anticolinérgico. O dem-anticolinergico-ieca e o dem-antipsicotico-bpsd-rotina estão no formulário.",
      "RENAME 2024: os quatro estão no Componente Especializado — receita sem protocolo não vira caixa."
    ]
  },

  formulario: {
    fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "donepezila", papel: "inibidor de colinesterase de primeira linha no Alzheimer do PCDT" },
      { id: "rivastigmina", papel: "inibidor; adesivo quando a náusea da cápsula derruba a adesão" },
      { id: "galantamina", papel: "inibidor quando os outros dois não vão; teto menor se rim ou fígado medianos" },
      { id: "memantina", papel: "NMDA na moderada a grave — só ou com o inibidor" },
      { id: "haloperidol", outra: true, papel: "não é tratamento de BPSD; na Lewy é o erro grave — ver proibido" },
      { id: "risperidona", outra: true, papel: "exceção curta de BPSD grave depois de causa física; risco de AVC e morte" },
      { id: "quetiapina", outra: true, papel: "às vezes tentada na Lewy quando o antipsicótico é inevitável — ainda assim perigosa" }
    ],
    proibidos: ["dem-anticolinergico-ieca", "dem-antipsicotico-bpsd-rotina", "haloperidol-parkinson-lewy"]
  },

  conduta: {
    fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Confirmar o tipo de demência antes da caixa — Lewy e frontotemporal mudam tudo",
      "Causa física da agitação no mesmo dia",
      "Iniciar inibidor ou memantina pelo PCDT, com pulso e cuidador na sala",
      "Não sedar a noite com Z-drug ou benzodiazepínico de rotina — queda",
      "APS segura o vínculo e o cuidador; o CEAF dispensa o Especializado; instabilidade sai para urgência"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025",
    itens: [
      "Haloperidol IM no idoso agitado com alucinação visual",
      "Amitriptilina para dormir quem já toma donepezila",
      "Zolpidem todas as noites no dementado que cai",
      "Subir memantina sem olhar a creatinina",
      "Chamar de Alzheimer o declínio de duas semanas"
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "insonia",
  nome: "Insônia crônica do adulto",
  kw: "insonia sono zolpidem melatonina tcc higiene despertar",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Apneia (ronco, pausa, sonolência diurna) — hipnótico aqui mata",
      "Queda, confusão ou sonambulismo após Z-drug — sobretudo no idoso",
      "Ideação suicida: a insônia grave concentra risco; perguntar agora",
      "Uso diário de zolpidem ou benzodiazepínico há meses — dependência, não tratamento",
      "Dor, nictúria, tireoide, corticóide, estimulante — a causa não é 'falta de remédio'"
    ]
  },

  perguntas: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023",
    itens: [
      "Quanto demora para pegar no sono, quantas vezes acorda, a que horas levanta, quantas horas de fato dorme",
      "Há quanto tempo, quantas noites por semana, o que faz de dia por causa disso",
      "Cafeína, álcool, tela, cochilo, horário irregular",
      "Ronco, pausa, perna inquieta, pesadelo, trabalho em turno",
      "Humor, dor, nictúria, fármaco que ativa (fluoxetina, corticoide, teofilina)",
      "O que já tomou para dormir, por quanto tempo, se corta de golpe"
    ]
  },

  exame: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023",
    itens: [
      "Aspecto de sono, humor, marcha e equilíbrio no idoso",
      "Pescoço, palato, pressão — pista de apneia",
      "Tireoide se emagreceu, tremeu ou teve palpitação",
      "Lesão de queda recente"
    ]
  },

  naoperder: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "TCC-I disponível e nem oferecida",
      "Zolpidem contínuo como se fosse o tratamento da insônia crônica",
      "Melatonina vendida como se tivesse planejamento terapêutico no adulto saudável — a ABS diz que não há",
      "Apneia tratada com hipnótico",
      "Parar Z-drug de golpe no dependente"
    ]
  },

  ddx: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023",
    itens: [
      "Insônia crônica — dificuldade de início ou manutenção, prejuízo diurno, pelo menos três noites por semana, há pelo menos três meses",
      "Apneia obstrutiva — ronco, pausa, sonolência; o hipnótico piora",
      "Síndrome das pernas inquietas — urge mexer, piora ao deitar",
      "Ritmo circadiano — dorme bem, só no horário errado",
      "Depressão e ansiedade — a insônia é sintoma; tratar o eixo",
      "Uso de substância e abstinência de álcool ou benzodiazepínico"
    ]
  },

  farmaco: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "TCC-I é a primeira linha da insônia crônica. Higiene do sono sozinha não substitui TCC-I.",
      "Zolpidem: curto, intermitente, no máximo quatro semanas. Idoso começa na dose baixa. Número no cartão.",
      "Melatonina: a ABS não recomenda planejamento no adulto saudável. Pode entrar no idoso e na criança com TEA, com evidência limitada. Sem registro ativo no Brasil.",
      "Trazodona e mirtazapina, se entrarem, são off-label de sono — não confundir com tratamento antidepressivo. Ver os cartões.",
      "Benzodiazepínico hipnótico tem as mesmas armadilhas, com mais queda e dependência."
    ]
  },

  formulario: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "zolpidem", papel: "Z-drug de curto prazo — não é tratamento da insônia crônica" },
      { id: "melatonina", papel: "cronobiótico; a ABS não endossa no adulto saudável; sem registro ativo" },
      { id: "trazodona", papel: "off-label de sono; não confundir dose hipnótica com antidepressiva" },
      { id: "mirtazapina", papel: "sedação e apetite; trata depressão com insônia, não insônia isolada de primeira linha" },
      { id: "clonazepam", papel: "não é hipnótico de primeira linha; manutenção vira dependência" }
    ],
    proibidos: ["ins-zolpidem-cronico"]
  },

  conduta: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023",
    itens: [
      "Oferecer TCC-I ou equivalente antes da caixa",
      "Se hipnótico: prazo escrito, dose de idoso se for idoso, sem álcool",
      "Rastrear apneia antes de sedar",
      "Redução gradual se já usa há meses",
      "APS segura o caso sem apneia grave; queda, dependência ou suicídio saem com matriciamento"
    ]
  },

  erros: {
    fonte: "ABS — Diretriz de Insônia em Adultos, 2023",
    itens: [
      "Zolpidem todas as noites por seis meses",
      "Melatonina como se fosse a TCC-I do adulto jovem",
      "Hipnótico no roncador obeso sonolento",
      "Cortar zolpidem de uma vez no usuário crônico",
      "Amitriptilina no idoso 'para dormir' e chamar de seguro"
    ]
  },

  scores: ["phq9", "gad7", "nota-conferencia"]
});

QUEIXAS.push({
  id: "tdah",
  nome: "TDAH — criança, adolescente e adulto",
  kw: "tdah metilfenidato ritalina lisdexanfetamina atomoxetina clonidina atencao hiperatividade",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Dor no peito, síncope, sopro ou história familiar de morte súbita — não começa estimulante sem isso",
      "Uso de cocaína, anfetamina ou desvio da receita — o estimulante vira dano",
      "Virada maníaca ou psicose após metilfenidato",
      "Criança que não cresce ou não ganha peso — o PCDT e o Maudsley mandam medir",
      "Ideação suicida na atomoxetina — monitorar no início"
    ]
  },

  perguntas: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Desatenção, hiperatividade e impulsividade em mais de um ambiente, desde a infância — um relatório só da escola não fecha",
      "O que já tentou de orientação a pais, escola e psicoterapia — o PCDT começa por isso",
      "Quem informa o adulto: alguém que o conheceu criança",
      "Coração, pressão, crescimento, sono, tique, uso de substância",
      "O PCDT registra a NÃO incorporação de metilfenidato e lisdexanfetamina no SUS — a família precisa ouvir isso antes da receita particular"
    ]
  },

  exame: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Pressão, pulso, peso, altura (criança) — e de novo em cada retorno se estimulante",
      "Sopro, atraso puberal, tique",
      "Humor, psicose, uso de substância",
      "ECG só se houver sinal cardiovascular — o Maudsley não pede de rotina no saudável"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Receitar estimulante como se o SUS dispensasse — o PCDT não incorporou",
      "Diagnosticar adulto sem história da infância",
      "Tratar ansiedade ou TEA como se fosse só TDAH",
      "Combinar dois estimulantes sem protocolo",
      "Ignorar desvio e venda da caixa"
    ]
  },

  ddx: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022",
    itens: [
      "TDAH — sintomas em dois ambientes, início na infância, prejuízo",
      "Ansiedade — a 'desatenção' é preocupação",
      "TEA — o prejuízo social veio primeiro e não é só impulsividade",
      "Transtorno de conduta / oposição — desafio deliberado, não desorganização",
      "Uso de substância e abstinência",
      "Má qualidade de sono e apneia",
      "Deficit intelectual ou de aprendizagem sem o eixo de hiperatividade"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "O PCDT brasileiro NÃO preconiza metilfenidato nem lisdexanfetamina — Conitec não incorporou. Intervenção não medicamentosa é o que o SUS oferece neste protocolo.",
      "O Maudsley, no Reino Unido, coloca metilfenidato como primeira linha na criança quando fármaco é indicado; lisdexanfetamina se o metilfenidato falhou; atomoxetina ou guanfacina se estimulante não vai. Adulto: metilfenidato ou lisdexanfetamina primeiro.",
      "As duas frases ficam juntas. Não escolher em silêncio. Número no cartão, se a receita particular for o caminho combinado.",
      "Atomoxetina não é estimulante; demora semanas. Clonidina tem lastro em tique e em TDAH, com hipotensão e efeito rebote se cortar.",
      "Estimulante e uso de substância: o Maudsley cita lisdexanfetamina com algum dado em quem usa anfetamina; ainda assim desvio é red flag."
    ]
  },

  formulario: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "metilfenidato", papel: "primeira linha do Maudsley quando há fármaco; o PCDT brasileiro não incorpora — a farmácia do SUS não tem" },
      { id: "lisdexanfetamina", papel: "pró-droga de anfetamina; o Maudsley a põe após falha do metilfenidato na criança; o PCDT também não incorpora" },
      { id: "atomoxetina", papel: "não estimulante quando o estimulante não vai ou não pode" },
      { id: "clonidina", papel: "alfa-2; tique e TDAH — hipotensão, não cortar de golpe" }
    ],
    proibidos: ["tdah-estimulante-cardiopata"]
  },

  conduta: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Diagnóstico por quem sabe o desenvolvimento. Adulto: informante da infância.",
      "Dizer com clareza: o SUS, neste PCDT, não dispensa estimulante.",
      "Se a família compra: pressão, pulso, crescimento, sono, substância, receita A3.",
      "Não farmacológico não é espera: orientação a pais e escola começam agora.",
      "APS vincula; diagnóstico e estimulante saem com quem tem treino"
    ]
  },

  erros: {
    fonte: "MS — PCDT TDAH, Portaria Conjunta SAES/SCTIE/MS nº 14, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Receitar ritalina na primeira consulta sem dois ambientes e sem infância",
      "Prometer que o SUS vai entregar lisdexanfetamina",
      "Ignorar dor no peito e começar estimulante",
      "Usar a caixa da criança no adulto da casa",
      "Parar clonidina de uma vez"
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "tea",
  nome: "TEA — irritabilidade e agressividade",
  kw: "autismo tea agressividade irritabilidade risperidona comportamento",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Agressão ou autoagressão que fere agora — segurança da pessoa e de quem cuida",
      "Causa física: dor, otite, obstipação, dente, epilepsia — o TEA não 'explica' febre",
      "Ganho rápido de peso, galactorreia ou Parkinsonismo após risperidona",
      "Sedação que impede escola e comunicação",
      "Contenção prolongada ou isolamento como se fosse tratamento"
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022",
    itens: [
      "O que dispara a crise (som, troca de rotina, dor, fome) e o que acalma",
      "Comunicação: como pede, como recusa, o que acontece quando não entendem",
      "Sono, epilepsia, intestino, dente, ouvido",
      "O que já foi tentado de ambiente, visual, ocupacional — fármaco não é a primeira linha do comportamento",
      "Quem prescreveu risperidona, quanto, há quanto, e o peso de então"
    ]
  },

  exame: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022",
    itens: [
      "Peso, altura, cintura se já usa risperidona",
      "Extrapiramidal, prolactina clínica (galactorreia, amenorreia)",
      "Sinais de dor que a pessoa não nomeia",
      "Comunicação e estereotipia — o quê é o jeito, o quê é sofrimento novo"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Risperidona para 'tratar autismo' — trata irritabilidade, não o diagnóstico",
      "Pular causa física",
      "Estimulante no TEA sem TDAH claro — pode piorar irritabilidade",
      "Subir risperidona de golpe e chamar de extrapiramidal de 'jeito do autismo'"
    ]
  },

  ddx: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022",
    itens: [
      "Irritabilidade do TEA — agressão, autoagressão, crise de raiva, labilidade, depois de causa física excluída",
      "Dor e delirium — a mudança é aguda",
      "Epilepsia e pós-ictal",
      "TDAH comórbido — desatenção e impulsividade além do eixo autista",
      "Psicose — rara; não é o primeiro nome da crise"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "O PCDT preconiza risperidona para comportamento agressivo no TEA, depois de medida não farmacológica. Número no cartão da risperidona, com o recorte de peso da criança.",
      "Aripiprazol aparece em diretriz internacional; neste protocolo brasileiro o fármaco é a risperidona.",
      "Ambiente, comunicação alternativa e tratamento da dor rendem mais do que subir miligrama.",
      "Melatonina pode entrar no sono do TEA (Maudsley p. 620); não trata agressão.",
      "Reduzir a risperidona quando a crise ceder — manutenção plena sem reavaliação é o erro."
    ]
  },

  formulario: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "risperidona", papel: "único fármaco preconizado neste PCDT para irritabilidade/agressão do TEA — não trata o autismo" },
      { id: "aripiprazol", outra: true, papel: "citado em diretriz internacional; não é o fármaco deste PCDT brasileiro" },
      { id: "melatonina", papel: "sono no TEA, depois de higiene; não trata agressão; sem registro ativo" },
      { id: "clonidina", papel: "à vezes no hiper-arousal; não substitui a risperidona do PCDT" }
    ],
    dosemuda: ["dm-risperidona"],
    proibidos: ["tea-risperidona-autismo"]
  },

  conduta: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022",
    itens: [
      "Causa física no mesmo dia",
      "Plano de ambiente e comunicação antes ou junto da caixa",
      "Se risperidona: começar baixo, pesar, reavaliar, tentar reduzir quando responder",
      "APS vincula; prescrição de antipsicótico em criança sai com quem conhece o PCDT"
    ]
  },

  erros: {
    fonte: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022",
    itens: [
      "Risperidona 'para o autismo'",
      "Ignorar otite e chamar de birra",
      "Manter a dose máxima anos a fio sem tentar descer",
      "Contenção como rotina escolar"
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "transtornos-alimentares",
  nome: "Anorexia, bulimia e compulsão alimentar",
  kw: "anorexia bulimia compulsao alimentar realimentacao hipofosfatemia purgacao vomito lanugo imc inanicao",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "BRASPEN J 2019 · AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      { t: "Realimentação após jejum ou desnutrição — hipofosfatemia, hipocalemia e hipomagnesemia nas primeiras 72 horas (síndrome de realimentação); arritmia e morte súbita", f: "BRASPEN J 2019" },
      { t: "Bradicardia, hipotensão, síncope ou QT longo — risco de arritmia, sobretudo na realimentação e com hipocalemia", f: "AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011" },
      { t: "Hipocalemia com vômito, laxante ou diurético — potencialmente fatal; não espera sintoma", f: "AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011" },
      "Fármaco que alarga QT ou piora eletrólito na anorexia — o Maudsley manda alerta no prontuário e ECG se o fármaco for imprescindível",
      "Ideação suicida, plano ou automutilação — perguntar agora; o subtipo purgativo concentra impulsividade e suicídio",
      "Recusa de líquidos, desidratação ou perda ponderal rápida com instabilidade — não é 'só restrição'",
      "Edema, taquicardia ou taquipneia ao iniciar dieta — realimentação até prova em contrário"
    ]
  },

  perguntas: {
    fonte: "AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Peso atual, peso mínimo, quanto perdeu e em quanto tempo — o autorrelato costuma mentir; perguntar também à família",
      "Restringe, compulsiona, vomita, usa laxante, diurético, enemas, emético, estimulante, semaglutida, cafeína ou chá para emagrecer",
      "Medo mórbido de ganhar peso e distorção da imagem — sem isso, a perda de peso é outra doença até prova em contrário",
      "Amenorreia, frio, desmaio, palpitação, obstipação, dor abdominal, queda de cabelo",
      "Exercício escondido da família e quantas horas",
      "Quando toma o comprimido em relação ao vômito — fármaco vomitado não conta como dose",
      "Humor, TOC, ansiedade, uso de substância — comorbidade é a regra e muda o fármaco",
      "Ideação suicida e automutilação — direto",
      "Diabetes: omite insulina para não ganhar peso",
      "O que já foi prescrito para 'apetite' ou 'ansiedade da refeição'"
    ]
  },

  exame: {
    fonte: "AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011 · BRASPEN J 2019",
    itens: [
      "Peso, altura e IMC na balança, não no relato — na criança, percentil, não corte de adulto",
      "Frequência, pressão, temperatura — bradicardia é o achado cardiovascular mais comum",
      "Sinal de Russell (calo no dorso da mão), parótida, esmalte corroído — pista de vômito",
      "Lanugo, xerose, acrocianose, hipercarotenemia — desnutrição do transtorno, não de outra inanição",
      "Edema de realimentação × desnutrição: o edema novo depois de comer é alerta, não 'melhora'",
      "Abdome: distensão, ruídos, cicatriz de automutilação"
    ]
  },

  naoperder: {
    fonte: "AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025 · BRASPEN J 2019",
    itens: [
      "Síndrome de realimentação tratada como 'está comendo de novo, ótimo'",
      "Causa orgânica da perda de peso (celíaca, Crohn, Addison, tumor de SNC, hipertireoidismo) — e a coexistência das duas",
      "Depressão da inanição tratada com antidepressivo antes de recuperar peso",
      "Bupropiona na anorexia ou na bulimia",
      "Entrevista só com o paciente — negação e baixo insight são o quadro",
      "Subtipo purgativo tratado como o restritivo: mais substância, automutilação e suicídio"
    ]
  },

  ddx: {
    fonte: "AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Anorexia restritiva — recusa calórica obsessiva, sem vômito nem laxante",
      "Anorexia purgativa — restrição mais vômito, laxante ou diurético; mais impulsividade",
      "Bulimia — compulsão e compensação com peso na faixa; não é anorexia 'leve'",
      "Compulsão alimentar — episódios de ingestão sem compensação regular; o peso costuma subir",
      "Depressão com hiporexia — não há fobia de peso nem ritual para emagrecer",
      "Hipertireoidismo — come mais, treme, sua; na anorexia a restrição é o ponto",
      "Doença celíaca, Crohn, acalasia, Addison, tumor de SNC — emagrecem sem distorção de imagem",
      "ARFID / seletividade — recusa por sensorial ou medo de engasgo, sem fobia de gordura"
    ]
  },

  exames: {
    fonte: "AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011 · BRASPEN J 2019 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Laboratório não diagnostica anorexia — avalia complicação da desnutrição e da purgação",
      "Potássio, fósforo, magnésio, cálcio, sódio, ureia, creatinina e glicemia antes de realimentar",
      "Na realimentação de risco: eletrólito todo dia nas primeiras 72 horas, com olho no fósforo",
      "ECG — bradicardia, QT e arritmia; repetir se hipocalemia ou se o fármaco alarga QT",
      "Hemograma: anemia, leucopenia e plaquetopenia da desnutrição",
      "TSH: a síndrome do eutireoidismo doente se corrige com peso, não com hormônio tireoidiano",
      { t: "Critério local de internar por IMC ou frequência cardíaca: protocolo do serviço", v: true }
    ]
  },

  farmaco: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · BRASPEN J 2019",
    itens: [
      "Na anorexia nenhum fármaco tem registro e a evidência de peso é fraca. O tratamento físico é realimentar; a psicoterapia estruturada e a familiar vêm junto. Medicamento isolado não trata.",
      "Antidepressivo não devolve peso na anorexia (fluoxetina, sertralina, citalopram, clomipramina, amitriptilina). Depressão da fome só muda com peso. Risco de virada maníaca.",
      "Na bulimia e na compulsão, fármaco também não é tratamento único. Fluoxetina é o ISRS com licença para bulimia; pode-se tentar, junto da psicoterapia. Resposta cedo prediz resposta. Sertralina reduz compulsão e purgação nas duas; citalopram, só na compulsão.",
      "Bupropiona é contraindicada na anorexia (emagrece) e não se usa na bulimia (crise convulsiva).",
      "Olanzapina tem sinal de peso na anorexia em ensaios, com má tolerância e baixa aceitação. Se antipsicótico, poupador de prolactina — risperidona, sulpirida e amisulprida pioram osso.",
      "Benzodiazepínico e anti-histamínico não se usam para ganhar peso.",
      "Tiamina e eletrólito (fósforo, potássio, magnésio) antes e durante a realimentação de risco; calorias baixas no começo, subida lenta. Número no cartão da tiamina.",
      "Lisdexanfetamina aparece no Maudsley como opção na compulsão; não há cartão neste guia e não é tratamento isolado.",
      "Horário do comprimido: se vomita, a dose não entrou."
    ]
  },

  formulario: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011 · BRASPEN J 2019",
    farmacos: [
      { id: "fluoxetina", papel: "única com licença para bulimia — tentativa junto da psicoterapia, nunca isolada; na anorexia não devolve peso" },
      { id: "sertralina", papel: "reduz compulsão e purgação na bulimia e na compulsão; adjuvante, não único" },
      { id: "citalopram", papel: "sinal na compulsão; na bulimia o Maudsley cita mais efeito no humor do que a fluoxetina" },
      { id: "mirtazapina", papel: "não restaura peso na anorexia; na compulsão o ganho de peso pesa contra" },
      { id: "olanzapina", outra: true, papel: "sinal de peso e de ansiedade pré-refeição na anorexia — tolerância ruim, off-label, não primeira escolha" },
      { id: "aripiprazol", outra: true, papel: "evidência fraca de peso na anorexia; poupa prolactina se um atípico for tentado" },
      { id: "bupropiona", papel: "não usar — contraindicada na anorexia; na bulimia o risco é convulsão" },
      { id: "tiamina", outra: true, papel: "realimentação de risco — repor antes de subir caloria; não trata o transtorno" }
    ],
    proibidos: ["ta-farmaco-unico", "ta-bupropiona", "ta-risperidona-prolactina", "bupropiona-limiar-convulsivo"]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · BRASPEN J 2019 · AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011",
    itens: [
      "Primeiro: risco clínico (eletrólito, ECG, suicídio, realimentação). Depois o diagnóstico do subtipo.",
      "Anorexia: recuperar peso seguro, terapia familiar e psicoterapia estruturada. Fármaco não é o eixo.",
      "Bulimia e compulsão: autoajuda ou TCC específica primeiro; fluoxetina ou outro ISRS só junto, nunca sozinho.",
      "Risco de realimentação (IMC baixo, perda recente, pouco ou nenhum aporte por pelo menos 5 dias, álcool, eletrólito já baixo): tiamina, repor fósforo/potássio/magnésio, pouca caloria no início, eletrólito diário. Se o fósforo cair, reduzir a dieta e subir devagar.",
      "Família na sala — o paciente sozinho não se trata.",
      "APS segura o leve e o vínculo; instabilidade, IMC muito baixo, recusa de líquidos ou suicídio saem para serviço especializado. Encaminhar não é sumir.",
      "Restringir meio letal (laxante em caixa, diurético, estoque de comprimido) quando há ideação"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · BRASPEN J 2019 · AMB/CFM — Anorexia Nervosa: Diagnóstico e Prognóstico, 2011",
    itens: [
      "Prescrever fluoxetina para a anorexia 'ganhar peso'",
      "Bupropiona para a depressão da anorexia ou da bulimia",
      "Benzodiazepínico na hora da refeição para 'abrir o apetite'",
      "Risperidona na anorexia",
      "Realimentar agressivo sem fósforo nem tiamina",
      "Fármaco como único tratamento de anorexia, bulimia ou compulsão",
      "Acreditar no diário alimentar sem ouvir a família",
      "Hormônio tireoidiano porque o T3 está baixo — é eutireoidismo doente",
      "Tratar a tristeza da inanição como depressão primária e adiar a comida"
    ]
  },

  scores: ["imc", "nota-conferencia"]
});

QUEIXAS.push({
  id: "personalidade-borderline",
  nome: "Personalidade borderline — crise, autolesão e o que o fármaco não trata",
  kw: "borderline autolesao impulsividade abandono crise tpb instabilidade",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · Lei nº 13.819, 2019",
    itens: [
      "Ideação suicida com plano ou meio em casa — mais de três em quatro tentam; perguntar agora",
      "Corte, queimadura ou overdose na última semana — não é 'drama'",
      "Dissociação com risco (dirigir, atravessar via, não lembrar o que fez)",
      "Uso de álcool ou benzodiazepínico na crise — desinibição e mais um meio letal",
      "Psicose persistente, mania ou recusa de líquido — comorbidade, não 'só borderline'"
    ]
  },

  perguntas: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Padrão: medo de abandono, relações no tudo-ou-nada, identidade instável, impulsividade, autolesão, vazio, raiva, dissociação ou paranoia breve",
      "O que dispara a crise de hoje — briga, mensagem não respondida, alta, troca de profissional",
      "O que já foi prescrito e o que sobrou em casa — polifarmácia é a regra e não trata o transtorno",
      "Comorbidade: humor, TEPT, uso de substância, transtorno alimentar — tratar ISSO segundo o guia próprio",
      "Já fez DBT ou outra psicoterapia com evidência — é o tratamento; o fármaco não é",
      "Quem está com a pessoa depois da consulta"
    ]
  },

  exame: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Lesão recente, cicatriz linear, odor de álcool",
      "Humor do momento versus padrão de anos — a crise não diagnostica bipolar",
      "Insight, juízo, plano suicida",
      "Sinais de intoxicação ou abstinência",
      "Exame físico se overdose ou restrição"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Tratar o transtorno de personalidade com antipsicótico, antidepressivo ou estabilizador 'porque todo mundo usa'",
      "Benzodiazepínico de caixa para a raiva",
      "Ignorar a comorbidade tratável (depressão, TEPT, uso)",
      "Alta da crise sem plano de 24 horas e sem restringir meio letal",
      "Confundir instabilidade afetiva com mania"
    ]
  },

  ddx: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Borderline — padrão estável de instabilidade desde a adolescência, medo de abandono e autolesão",
      "Bipolar — episódios de dias a semanas, não oscilação de horas; menos necessidade de sono",
      "TEPT complexo — o trauma organiza o quadro; pode coexistir",
      "Depressão — humor rebaixado persistente sem o eixo de abandono",
      "Uso de substância — a impulsividade some com a abstinência, ou não",
      "Antissocial — prejuízo no outro, sem o terror do abandono"
    ]
  },

  farmaco: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Nenhum fármaco trata o transtorno de personalidade borderline. Nenhum tem registro para isso. O tratamento é psicoterapia (DBT e afins).",
      "O que se prescreve, quando se prescreve, é a COMORBIDADE: depressão, TEPT, psicose, uso — pelo guia daquela queixa, no papel daquela queixa.",
      "Antipsicótico, antidepressivo e estabilizador prescritos 'para o borderline' são o hábito que o livro descreve e não endossa.",
      "Benzodiazepínico de manutenção é proibido aqui: desinibe e vira meio letal.",
      "Polifarmácia é o erro, não o refinamento."
    ]
  },

  formulario: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "fluoxetina", papel: "não trata o transtorno — só entra se houver depressão ou TOC comórbidos, no papel daquela queixa" },
      { id: "sertralina", papel: "não trata o transtorno — comorbidade, se houver" },
      { id: "carbonato-de-litio", outra: true, papel: "não trata o transtorno; só se a comorbidade for bipolar verdadeira" },
      { id: "quetiapina", outra: true, papel: "não trata o transtorno; sedar a crise não é DBT" },
      { id: "clonazepam", papel: "não trata o transtorno — manutenção é o erro; ver proibido tpb-bzd-manutencao" }
    ],
    proibidos: ["tpb-bzd-manutencao"]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · Lei nº 13.819, 2019",
    itens: [
      "Crise: segurança, meio letal, companhia, plano de 24 horas. Notificar automutilação e suicídio quando a lei mandar",
      "Tratar a comorbidade pelo guia dela. Não abrir uma terceira caixa 'para personalidade'",
      "Oferecer psicoterapia com evidência e vínculo estável — troca de profissional dispara crise",
      "Não prescrever benzodiazepínico de manutenção",
      "APS segura o vínculo; risco iminente vai para urgência; o CAPS não substitui a psicoterapia estruturada"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Antipsicótico de depósito 'para o borderline'",
      "Diazepam de uso contínuo para a raiva",
      "Alta da overdose sem restringir o estoque",
      "Chamar de bipolar a oscilação de horas e ligar estabilizador",
      "Mandar embora porque 'é personalidade, não doença'"
    ]
  },

  scores: ["phq9", "nota-conferencia"]
});

QUEIXAS.push({
  id: "perinatal",
  nome: "Saúde mental na gestação e no puerpério",
  kw: "puerperio pos-parto gestante amamentacao psicose litio valproato",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "MS — Manual de Gestação de Alto Risco, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Psicose puerperal (delírio, alucinação, recusa do bebê) — emergência; não espera o retorno",
      "Ideação de matar o bebê ou a si — perguntar agora, sem eufemismo",
      "Valproato em quem pode engravidar — malformação e atraso de desenvolvimento; não é negociável",
      "Lítio no trabalho de parto sem litemia e sem volume — toxicidade no recém-nascido",
      "Parar de golpe o estabilizador porque 'está grávida' — recaída e suicídio perinatal se associam a tratamento ausente"
    ]
  },

  perguntas: {
    fonte: "MS — Manual de Gestação de Alto Risco, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Está grávida, pode estar, ou amamenta — antes de qualquer caixa",
      "Humor, insônia que não é só o bebê, ideação suicida, medo de machucar",
      "Episódio prévio de mania, psicose ou depressão grave — o risco de recaída no puerpério é alto",
      "Qual psicofármaco, em que dose, quem prescreveu, se já parou sozinha",
      "Álcool, tabaco, outra substância",
      "Rede: quem fica com o bebê se ela internar"
    ]
  },

  exame: {
    fonte: "MS — Manual de Gestação de Alto Risco, 2022",
    itens: [
      "Vínculo observado com o bebê — recusa, medo, indiferença",
      "Humor, psicose, juízo",
      "Sinais de intoxicação por lítio (tremor grosseiro, ataxia) se usa",
      "Pressão, edema, sinais de pré-eclâmpsia se valproato ou lítio no histórico"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — Manual de Gestação de Alto Risco, 2022",
    itens: [
      "Valproato em mulher em idade fértil sem contracepção à prova de falha",
      "Cortar lítio no primeiro trimestre sem plano — o livro descreve risco cardíaco e também o risco de recaída",
      "Escolher fluoxetina versus sertralina em silêncio: o Maudsley relata sinal de defeito cardíaco em alguns estudos de fluoxetina e paroxetina, e outros estudos que não acham; mostrar as duas frases",
      "Benzodiazepínico crônico perto do parto — hipotonia e síndrome do RN",
      "Achar que amamentar proíbe todo psicofármaco — a maioria continua; lítio é a grande exceção"
    ]
  },

  ddx: {
    fonte: "MS — Manual de Gestação de Alto Risco, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Blues puerperal — dias, choro, autolimitado",
      "Depressão perinatal — semanas, anedonia, prejuízo; um terço começa antes do parto",
      "Psicose puerperal — dias após o parto, emergência",
      "Tireoidite pós-parto — imita humor",
      "Delirium — febre, cesárea, infecção"
    ]
  },

  farmaco: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — Manual de Gestação de Alto Risco, 2022",
    itens: [
      "Não suspender psicofármaco só porque há gravidez. ACOG e o Maudsley alertam que suicídio perinatal se associa a tratamento ausente.",
      "ISRS: não são teratógenos maiores. Há sinal de defeito cardíaco em alguns estudos com fluoxetina e paroxetina; outros não acham. Sertralina costuma ser a mais usada no perinatal. Mostrar, não escolher em silêncio. Número no cartão.",
      "Valproato: malformação e atraso neurodesenvolvimento — contraindicado se pode engravidar, salvo o caso extremo que o livro descreve com termo de risco.",
      "Lítio: risco de malformação cardíaca superestimado no passado, ainda existe; se for o fármaco que a mantém, pode continuar com rastreio cardíaco fetal. Para na hora do parto. Amamentação: RID alto — em geral não amamenta.",
      "Benzodiazepínico crônico: hipotonia e síndrome de retirada no RN.",
      "Scores pode incluir DPP (Näegele) se a idade gestacional importa para o plano."
    ]
  },

  formulario: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — Manual de Gestação de Alto Risco, 2022",
    farmacos: [
      { id: "sertralina", papel: "ISRS mais usado no perinatal — interação mais limpa; não é isenção de risco" },
      { id: "fluoxetina", papel: "ISRS; o Maudsley cita sinal de defeito cardíaco em alguns estudos e ausência em outros — mostrar os dois" },
      { id: "paroxetina", papel: "ISRS com o sinal mais citado de defeito cardíaco; a pior retirada" },
      { id: "carbonato-de-litio", outra: true, papel: "se é o que a mantém, pode continuar com rastreio; parar no parto; amamentação em geral não" },
      { id: "acido-valproico-valproato", outra: true, papel: "contraindicado se pode engravidar — malformação e atraso de desenvolvimento" },
      { id: "lamotrigina", outra: true, papel: "alternativa de humor no perinatal com menos teratógeno que o valproato" },
      { id: "olanzapina", outra: true, papel: "antipsicótico com lastro de uso; peso e glicemia na gestação" }
    ],
    proibidos: ["per-valproato-gestante", "per-litio-amamentacao"]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — Manual de Gestação de Alto Risco, 2022",
    itens: [
      "Psicose puerperal: urgência, não espera, não deixa a mãe só com o bebê",
      "Não cortar estabilizador sem plano de recaída",
      "ISRS: informar o que cada fonte diz; sertralina é a escolha usual, não um dogma",
      "Pré-natal de alto risco se lítio ou anticonvulsivante",
      "APS vincula; psicose e mania saem no mesmo dia"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Parar fluoxetina no positivo da farmácia sem conversa",
      "Manter valproato 'porque sempre tomou'",
      "Amamentar em lítio sem saber o RID",
      "Diazepam todas as noites no terceiro trimestre",
      "Mandar a puérpera psicótica para casa porque 'é o blues'"
    ]
  },

  scores: ["phq9", "dpp", "nota-conferencia"]
});

QUEIXAS.push({
  id: "infanto-juvenil",
  nome: "Depressão, ansiedade e psicose na criança e no adolescente",
  kw: "adolescente crianca depressao fluoxetina ideacao suicida infanto",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Ideação suicida, plano ou tentativa — o maior preditor é tentativa prévia; perguntar agora",
      "Recusa de alimento ou líquido, catatonia, psicose — emergência",
      "Virada maníaca após antidepressivo",
      "Abuso atual em casa ou na escola — a receita não é o primeiro ato",
      "Automutilação repetida — notificar quando a lei mandar"
    ]
  },

  perguntas: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Humor, irritabilidade (mais comum que anedonia no jovem), sono, peso, culpa, morte",
      "Perguntar suicídio direto, com e sem o responsável na sala",
      "TDAH, TEA, uso de substância, bullying, tela, sono",
      "O que a escola e a família veem de diferente",
      "Já fez psicoterapia? O Maudsley e o NICE põem apoio e terapia antes do fármaco na depressão leve"
    ]
  },

  exame: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Peso, altura, Tanner se o fármaco mexer em crescimento",
      "Humor, psicose, tique, estereotipia",
      "Lesão de corte, cheiro de cola ou álcool",
      "Exame físico dirigido se recusa alimentar"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Antidepressivo na depressão leve sem tentativa de apoio/terapia",
      "Paroxetina de primeira linha no jovem — o lastro de suicídio da classe pesa; fluoxetina é a primeira linha clássica",
      "Não avisar ativação e ideação nas primeiras semanas",
      "Tratar TDAH só com estimulante e ignorar o humor",
      "Adultizar a dose"
    ]
  },

  ddx: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Depressão do jovem — irritabilidade, energia, sono e peso pesam mais que no adulto",
      "Ansiedade de separação e fobia escolar — o 'não vai' não é preguiça",
      "TEA e TDAH — o humor vem depois do eixo do desenvolvimento",
      "Bipolar de início precoce — cuidado com antidepressivo isolado",
      "Uso de substância e trauma"
    ]
  },

  farmaco: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Depressão leve: apoio ou psicoterapia primeiro; fármaco não.",
      "Moderada a grave: psicoterapia só ou com antidepressivo. Fluoxetina é a primeira linha clássica no adolescente. Número no cartão.",
      "Ideação suicida no início do ISRS: reavaliar cedo, não em 30 dias. Avisar a família.",
      "Psicose de início precoce: antipsicótico em dose de criança (tabela do Maudsley p. 626) — não copiar adulto.",
      "Valproato em menina adolescente: o mesmo problema do perinatal.",
      "Dose no cartão do adulto não se cola aqui."
    ]
  },

  formulario: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    farmacos: [
      { id: "fluoxetina", papel: "primeira linha clássica de ISRS no adolescente com depressão moderada a grave, junto da terapia; vigiar ideação no início" },
      { id: "sertralina", papel: "alternativa de ISRS; ansiedade também" },
      { id: "escitalopram", papel: "alternativa; QT no idoso pesa menos aqui, ainda existe" },
      { id: "risperidona", outra: true, papel: "psicose ou irritabilidade de TEA — dose de criança, não de adulto" },
      { id: "aripiprazol", outra: true, papel: "psicose de início precoce em dose menor que a do adulto" }
    ],
    proibidos: ["ij-ad-leve-sem-terapia"],
    dosemuda: ["dm-fluoxetina"]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "Risco agora: não deixar só. Restringir meio letal. Notificar quando couber",
      "Leve: terapia e vínculo. Moderada a grave: fluoxetina + terapia, retorno cedo",
      "Escola na conversa — o prejuízo mora lá",
      "APS vincula; psicose, mania e suicídio iminente saem no mesmo dia"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Amitriptilina de primeira linha no adolescente deprimido",
      "Alta da tentativa com o estoque ainda em casa",
      "Não perguntar suicídio porque o responsável está na sala",
      "Copiar dose de adulto no de 12 anos",
      "Valproato na menina 'porque é bipolar'"
    ]
  },

  scores: ["phq9", "gad7", "nota-conferencia"]
});

QUEIXAS.push({
  id: "emergencia-psicofarmaco",
  nome: "Emergência por psicofármaco",
  kw: "serotoninergica neuroleptica maligna intoxicacao snm sns litio catatonia distonia overdose flumazenil dantroleno ciproeptadina bromocriptina anticolinergica qt",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Febre, rigidez e instabilidade autonômica após antipsicótico — SNM até prova em contrário; a ausência de febre não exclui",
      "Hipertermia, clônus e confusão em quem usa fármaco serotoninérgico — síndrome serotoninérgica grave mata por falência respiratória",
      "Ataxia, tremor grosseiro, diarreia e confusão em quem usa lítio — toxicidade; desidratação e AINE/IECA/diurético precipitam",
      "Mutismo, negativismo e instabilidade autonômica — catatonia maligna; desidratação, trombose e pneumonia se não tratar",
      "Coma com miose e frequência respiratória baixa — opioide até prova em contrário; naloxona não substitui via aérea",
      "Depressão respiratória após benzodiazepínico parenteral — ter flumazenil à mão, e não usar se o coma for de causa mista",
      { t: "Temperatura que sobe após tranquilização rápida — SNM e arritmia; dosar CK com urgência", f: "Maudsley Prescribing Guidelines, 15ª ed., 2025" }
    ]
  },

  perguntas: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Qual psicofármaco, quando foi a última dose, e se houve aumento rápido, polifarmácia ou suspensão abrupta",
      "ISRS, IMAO, tramadol, triptano, lítio, antipsicótico de depósito e anticolinérgico — listar todos, não só o da receita do CAPS",
      "Febre, sudorese, diarreia, clônus, rigidez, retenção urinária ou mucosas secas",
      "Convulsão prévia, epilepsia em uso crônico de benzodiazepínico, ou overdose de tricíclico",
      "Vômito, diarreia, baixa ingestão de água, dieta hipossódica — precipitam toxicidade do lítio",
      "Tempo de evolução em horas versus dias — serotoninérgica costuma ser mais rápida que SNM",
      "Uso de cocaína, crack ou outro estimulante nas últimas horas — o quadro pode ser estado de excitação, não SNM"
    ]
  },

  exame: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Temperatura, pressão lábil, frequência cardíaca e respiratória — anotar agora e repetir",
      "Rigidez em cano de chumbo versus clônus e hiperreflexia — é a pista que separa SNM de serotoninérgica",
      "Pele: diaforese (SNM, serotoninérgica, simpatomimético) versus pele seca (anticolinérgico)",
      "Pupilas: midríase na serotoninérgica e na anticolinérgica; miose no opioide",
      "Mucosas secas, retenção urinária e diminuição de ruídos intestinais — toxídrome anticolinérgico",
      "Nível de consciência flutuante, mutismo, negativismo, flexibilidade cérea — catatonia",
      "Sinais de distonia: trismo, crise oculógira, opistótono, desvio conjugado do olhar",
      "ECG antes de antipsicótico parenteral e em intoxicação por lítio, tricíclico ou metadona"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "SNM atípica sem febre ou sem rigidez",
      "Catatonia maligna chamada de SNM, ou o inverso, e atrasar benzodiazepínico ou ECT",
      "Coma misto tratado com flumazenil — convulsão",
      "CK elevado assintomático tratado como SNM — o livro diz que CK isolado não diagnostica",
      "Intoxicação por lítio com litemia ainda \"no alvo\" — neurotoxicidade pode existir com nível plasmático enganoso",
      "Distonia aguda tratada com mais antipsicótico"
    ]
  },

  ddx: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Síndrome neuroléptica maligna — rigidez, instabilidade autonômica e CK alto após antagonista dopaminérgico; sem exposição recente, SNM é improvável",
      "Síndrome serotoninérgica — hiperreflexia, clônus, midríase e diarreia; pode ocorrer com um só fármaco serotoninérgico em dose terapêutica",
      "Catatonia — mutismo, negativismo e flexibilidade cérea; a forma maligna pode ser indistinguível da SNM no laboratório",
      "Crise anticolinérgica — pele e mucosas secas, retenção urinária e midríase, sem diaforese",
      "Intoxicação por lítio — náusea, diarreia, ataxia e tremor grosseiro; convulsão e coma na faixa alta",
      "Distonia aguda — trismo e crise oculógira horas após neuroléptico, sem febre",
      "Estado de excitação por estimulante — agitação violenta, hipertermia e luta contra contenção após crack ou cocaína",
      "Sepse, hipertireoidismo, hipertermia maligna anestésica e abstinência de álcool ou benzodiazepínico"
    ]
  },

  exames: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "CK, leucograma, função hepática e renal, eletrólitos e glicemia",
      "Litemia se há lítio na lista, mesmo que a última tomada seja incerta",
      "ECG com QTc; repetir se o fármaco alarga o intervalo",
      "Mioglobina urinária se houver rigidez, hipertermia ou CK alto",
      { t: "Painel toxicológico do HELR: o que o laboratório de plantão dosá de fato", v: true }
    ]
  },

  farmaco: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017 · ABP — Diretrizes brasileiras para o manejo da agitação psicomotora, 2021",
    itens: [
      "A primeira droga é parar a que causou o quadro. Antipsicótico na SNM, serotoninérgico na síndrome serotoninérgica, lítio na toxicidade.",
      "SNM na unidade psiquiátrica: suspender o antipsicótico, monitorar temperatura, pulso e pressão, e benzodiazepínico se ainda não estiver prescrito. Dantroleno e bromocriptina são do leito clínico ou da emergência, com hidratação e ventilação se precisar.",
      "Síndrome serotoninérgica: suspender o agente, resfriar com medida física (antitérmico não trata hipertermia muscular), benzodiazepínico para sedar. Ciproeptadina entra no refratário. Haloperidol não é sedativo deste quadro.",
      "Catatonia: benzodiazepínico é a primeira linha, em especial lorazepam. Resposta costuma ser rápida quando há resposta. Sem resposta, ECT. Não atrasar cuidado clínico da desidratação e da trombose.",
      "Distonia aguda: biperideno parenteral. Ter o fármaco à mão antes de haloperidol IM.",
      "Flumazenil reverte depressão respiratória de benzodiazepínico isolado. É proibido no dependente crônico, no epiléptico em benzodiazepínico de longo prazo e no coma misto com tricíclico: o mecanismo é convulsão e arritmia.",
      "Após SNM, o antipsicótico quase sempre precisará voltar. Esperar resolução, recomeçar dose muito baixa de fármaco estruturalmente diferente, sem depósito.",
      "Via oral primeiro na agitação; intravenosa a ABP manda evitar. Olanzapina IM não se combina com benzodiazepínico IM.",
      { t: "Quais antídotos o carro de emergência do HELR tem de fato: conferir no protocolo do serviço", v: true }
    ]
  },

  formulario: {
    fonte: "SMS-SP — Manual de Toxicologia Clínica, 2017 · Maudsley Prescribing Guidelines, 15ª ed., 2025 · ABP — Diretrizes brasileiras para o manejo da agitação psicomotora, 2021",
    farmacos: [
      { id: "dantroleno", papel: "SNM com hipertermia e rabdomiólise — reduz liberação de cálcio no músculo; entra no leito clínico, não substitui suspender o antipsicótico" },
      { id: "bromocriptina", papel: "agonista dopaminérgico no SNM, em geral junto do dantroleno; cartão clínico existe, registro ativo Anvisa não" },
      { id: "ciproeptadina", papel: "antagonista 5-HT na síndrome serotoninérgica refratária a benzodiazepínico e resfriamento" },
      { id: "flumazenil", papel: "só depressão respiratória por benzodiazepínico isolado — nunca no coma de causa desconhecida" },
      { id: "naloxona", papel: "coma com miose e hipoventilação quando opioide entra no diagnóstico diferencial da overdose mista" },
      { id: "lorazepam", outra: true, papel: "catatonia e sedação na SNM — não é o tratamento da causa dopaminérgica" },
      { id: "diazepam", outra: true, papel: "sedação e convulsão na emergência; na catatonia o lastro maior é do lorazepam" },
      { id: "biperideno", outra: true, papel: "distonia aguda após neuroléptico — ter à mão antes do haloperidol IM" },
      { id: "carbonato-de-litio", outra: true, papel: "o fármaco da intoxicação — a conduta é suspender e tratar o nível, não titolar agora" },
      { id: "midazolam", outra: true, papel: "tranquilização rápida quando a via IM ou IV é inevitável; depressão respiratória é dose-relacionada" }
    ],
    combos: ["emg-snm-dantroleno-bromocriptina"],
    proibidos: [
      "emg-flumazenil-convulsao",
      "emg-olanzapina-im-bzd",
      "isrs-triciclico-imao",
      "isrs-tramadol",
      "litio-diuretico-ieca-aine",
      "ziprasidona-qt"
    ]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017 · ABP — Diretrizes brasileiras para o manejo da agitação psicomotora, 2021",
    itens: [
      "ABC, oxigênio, acesso, glicemia e temperatura antes de qualquer antídoto",
      "SNM: suspender o antipsicótico agora; hidratar; transferir para leito clínico se houver hipertermia, rigidez grave ou rebaixamento",
      "Serotoninérgica grave: resfriamento físico; se a temperatura for extrema, sedação, paralisia e via aérea — antitérmico não resolve",
      "Catatonia: lorazepam e suporte; ECT se falhar ou se for forma maligna",
      "Lítio: suspender, hidratar, internar em leito clínico; diurese forçada e diálise são decisão da emergência clínica, não do CAPS",
      "Após parenteral: temperatura, pulso, pressão e frequência respiratória a cada quinze minutos na primeira hora",
      "Desescalada verbal primeiro; contenção física é último recurso e agrava hipertermia no estado de excitação",
      "Encaminhar não é sedar e sumir — o paciente permanece visível até estar deambulando"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017 · ABP — Diretrizes brasileiras para o manejo da agitação psicomotora, 2021",
    itens: [
      "Dar flumazenil no coma de causa desconhecida",
      "Tratar SNM com mais antipsicótico",
      "Usar haloperidol para sedar síndrome serotoninérgica",
      "Diagnosticar SNM só pelo CK, sem quadro clínico",
      "Combinar olanzapina IM com benzodiazepínico IM",
      "Atrasar ECT na catatonia maligna porque \"ainda não tentou outro neuroléptico\"",
      "Mandar para casa após naloxona sem observar — o opioide dura mais que o antídoto",
      "Contenção prolongada em prono no agitado hipertérmico"
    ]
  },

  scores: ["nota-conferencia", "dose-peso"]
});

QUEIXAS.push({
  id: "outras-substancias",
  nome: "Crack, cocaína, opioides, maconha e benzodiazepínicos",
  kw: "crack cocaina opioide maconha benzodiazepinico metadona buprenorfina naloxona heroina abstinencia intoxicacao estimulante excitacao",
  tag: "Psiquiatria",
  atualizado: "2026-09-23",

  redflags: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Coma, miose e frequência respiratória baixa — overdose de opioide; naloxona agora e via aérea se não reverter",
      "Agitação violenta, hipertermia e luta contra contenção após crack ou cocaína — estado de excitação; contenção em prono mata",
      "Dor torácica, arritmia ou convulsão após cocaína — emergência clínica, não \"quebra de fissura\"",
      "Intoxicação por benzodiazepínico com outro depressor — flumazenil pode precipitar convulsão",
      "Alta hospitalar de quem usa opioide — perda de tolerância; os dois dias seguintes concentram morte",
      "Metadona em quem ainda está intoxicado por álcool ou benzodiazepínico — overdose somada",
      "Body packer com rebaixamento — ruptura de invólucro; cirurgia, não carvão de rotina"
    ]
  },

  perguntas: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · AMB/ABP — Abuso e Dependência dos Opioides e Opiáceos, 2012 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Qual substância, via, última dose e se misturou álcool, benzodiazepínico ou opioide",
      "Crack, merla ou cloridrato — a via muda o tempo do pico e o risco cardíaco",
      "Opioide ilícito, metadona, buprenorfina, fentanil ou nitazeno — naloxona única pode não bastar nos de alta afinidade",
      "Já fez tratamento com metadona ou buprenorfina, e quando foi a última tomada supervisionada",
      "Gestação — metadona ou buprenorfina de manutenção não se suspende no pronto-socorro",
      "Convulsão prévia e uso crônico de benzodiazepínico — define se flumazenil está proibido",
      "Onde guarda a metadona se houver criança em casa"
    ]
  },

  exame: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Frequência respiratória, oximetria, pupila e temperatura — os quatro que separam opioide, estimulante e sedativo",
      "Toxidrome opioide: miose, bradipneia, pele fria e úmida, rebaixamento",
      "Toxidrome simpatomimético: midríase, hipertensão, taquicardia, diaforese, agitação",
      "Maconha aguda: taquicardia, olhos vermelhos, hipotensão postural, elação ou paranoia",
      "Abstinência de opioide: midríase, bocejo, piloereção, diarreia, dor — desconfortável, não mata; overdose mata",
      "Abstinência de benzodiazepínico: ansiedade, insônia, delirium, convulsão — esta sim pode matar",
      "Marcas de injeção, perfuração de septo, queimadura de lábio e de mão no cachimbo de crack",
      "ECG quando houver cocaína, metadona, sintético ou síncope"
    ]
  },

  naoperder: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · AMB/ABP — Abuso e Dependência dos Opioides e Opiáceos, 2012",
    itens: [
      "Overdose chamada de abstinência, e o contrário",
      "Buprenorfina iniciada ainda com agonista pleno no receptor — abstinência precipitada",
      "Naloxona em dependente de opioide sem preparo para a abstinência aguda que ela dispara",
      "Psicose da maconha de alta potência tratada só com alta, sem risco de suicídio e sem seguimento",
      "Substituição de cocaína com estimulante — não há evidência e o livro contra-indica de rotina",
      "Alta sem naloxona de casa para quem usa opioide"
    ]
  },

  ddx: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Overdose de opioide — miose, bradipneia e coma; reverte com naloxona se o opioide for o único depressor",
      "Intoxicação por cocaína ou crack — midríase, diaforese, hipertensão e paranoia; pele molhada, não seca",
      "Estado de excitação induzido por droga — agitação contínua, hipertermia e intolerância à dor após estimulante ou canabinoide sintético",
      "Intoxicação por maconha — elação, distorção perceptiva e taquicardia; psicose transitória possível, sobretudo na de alta potência",
      "Abstinência de opioide — midríase e piloereção com consciência preservada; não explica coma",
      "Abstinência de benzodiazepínico — tremor, insônia e convulsão; não tratar com outro fármaco que gera dependência",
      "Síndrome serotoninérgica — clônus e hiperreflexia após mistura de cocaína com ISRS ou metadona",
      "Hipoglicemia, TCE, sepse e abstinência alcoólica — toda agitação de rua precisa de glicemia"
    ]
  },

  exames: {
    fonte: "SMS-SP — Manual de Toxicologia Clínica, 2017 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    itens: [
      "Glicemia, eletrólitos, função renal e CK se houver agitação ou hipertermia",
      "ECG na cocaína, na metadona e no sintético",
      "Triagem urinária não fecha diagnóstico: falso positivo e janela curta; NPS muitas vezes não aparece",
      { t: "Qual painel o laboratório do HELR identifica de fato, e com que atraso", v: true }
    ]
  },

  farmaco: {
    fonte: "AMB/ABP — Abuso e Dependência dos Opioides e Opiáceos, 2012 · Maudsley Prescribing Guidelines, 15ª ed., 2025 · SMS-SP — Manual de Toxicologia Clínica, 2017 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Overdose de opioide: naloxona e suporte ventilatório. Fentanil, nitazeno e buprenorfina exigem bolus repetidos. Observar — a naloxona acaba antes do opioide.",
      "Abstinência de opioide: metadona é primeira linha na diretriz brasileira. Buprenorfina é alternativa, sublingual, e só entra se já houver abstinência visível — senão precipita.",
      "Manutenção (OST): metadona ou buprenorfina reduzem morte. Não iniciar OST no intoxicado. Interno não-especialista pede protocolo local ou o serviço de álcool e drogas antes de a primeira dose.",
      "Naltrexona não é tratamento de abstinência aguda e precipita privação se ainda há opioide no receptor.",
      "Cocaína e crack: não há fármaco de substituição. Abstinência é autolimitada (humor rebaixado, insônia, fissura). Benzodiazepínico seda a intoxicação aguda; betabloqueador na fase aguda da cocaína é armadilha.",
      "Estado de excitação: desescalada, benzodiazepínico, transferência urgente à emergência. Antipsicótico com cautela (distonia e SNM). Antitérmico não resfria; água fria, gelo e volume sim.",
      "Maconha: intoxicação aguda é suporte. Abstinência (irritabilidade, insônia) não tem fármaco específico. Psicose persiste — tratar como psicose, e o uso pesa no risco.",
      "Benzodiazepínico de uso indevido: redução gradual, em geral convertendo para diazepam. Flumazenil não é tratamento de abstinência nem de overdose mista.",
      { t: "Quem no município inicia metadona ou buprenorfina, e com qual receita: conferir o fluxo do CAPS AD", v: true }
    ]
  },

  formulario: {
    fonte: "AMB/ABP — Abuso e Dependência dos Opioides e Opiáceos, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · SMS-SP — Manual de Toxicologia Clínica, 2017 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      { id: "naloxona", papel: "antídoto da overdose de opioide — reverte hipoventilação; não trata abstinência e não previne edema pulmonar" },
      { id: "metadona", papel: "primeira linha da abstinência e da manutenção por opioide na diretriz brasileira; agonista pleno, titulação lenta" },
      { id: "buprenorfina", papel: "agonista parcial para abstinência e manutenção; bloqueia o pleno, precipita se o receptor ainda está ocupado" },
      { id: "naltrexona", papel: "prevenção de recaída depois de limpeza do opioide — não usar na abstinência aguda" },
      { id: "diazepam", outra: true, papel: "intoxicação por estimulante e conversão na retirada de benzodiazepínico; não substitui OST" },
      { id: "clonazepam", outra: true, papel: "não é tratamento da dependência de benzodiazepínico — se entrar, é ponte curta, não manutenção" },
      { id: "midazolam", outra: true, papel: "sedação da agitação aguda no pré-hospitalar; depressão respiratória se somar opioide" },
      { id: "clonidina", outra: true, papel: "alternativa sintomática na abstinência de opioide quando metadona não está disponível — pouco faz em fissura e insônia" },
      { id: "flumazenil", papel: "só hipoventilação por benzodiazepínico isolado no não dependente — proibido no misto e no crônico" },
      { id: "cetamina-racemica", outra: true, papel: "sedativo preferido da emergência no estado de excitação refratário, depois da transferência — não é conduta de CAPS" }
    ],
    combos: ["sub-naloxona-buprenorfina-alta"],
    proibidos: [
      "sub-buprenorfina-agonista-pleno",
      "sub-metadona-intoxicado",
      "sub-naltrexona-opioide",
      "sub-metadona-bzd",
      "emg-flumazenil-convulsao",
      "bzd-alcool-depressor"
    ]
  },

  conduta: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · AMB/ABP — Abuso e Dependência dos Opioides e Opiáceos, 2012 · SMS-SP — Manual de Toxicologia Clínica, 2017 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Overdose de opioide: chamar ajuda, via aérea, naloxona, repetir até ventilar; se não reverter com dose alta, há outro depressor ou lesão cerebral",
      "Não dar alta nos minutos após a naloxona — ressedação é regra com metadona e com opioide de longa ação",
      "Abstinência de opioide: conforto e metadona segundo protocolo; a privação não justifica alta a pedido sem plano",
      "Cocaína/crack agitado: benzodiazepínico, resfriamento, emergência clínica; não betabloqueador na fase aguda",
      "Estado de excitação: não imobilizar em prono; segundos, não minutos, se a contenção for inevitável",
      "Maconha com psicose: ambiente, risco de suicídio, antipsicótico se a psicose permanece; o uso não \"explica tudo\" e encerra a consulta",
      "Retirada de benzodiazepínico: combinada com o paciente, gradual; se a redução falhar, não escalar a dose",
      "Quem usa opioide e recebe alta: avisar perda de tolerância, treinar quem mora junto e, se o serviço tiver, naloxona de casa"
    ]
  },

  erros: {
    fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025 · AMB/ABP — Abuso e Dependência dos Opioides e Opiáceos, 2012 · SMS-SP — Manual de Toxicologia Clínica, 2017",
    itens: [
      "Dar metadona em quem ainda está intoxicado",
      "Iniciar buprenorfina com heroína ou metadona ainda no receptor",
      "Usar flumazenil no dependente de benzodiazepínico ou na overdose mista",
      "Tratar fissura de crack com antipsicótico de depósito na primeira consulta",
      "Prescrever estimulante como \"substituição\" da cocaína",
      "Mandar embora após naloxona porque \"já abriu o olho\"",
      "Contenção prolongada no crack hipertérmico",
      "Suspender metadona de gestante no pronto-socorro para \"não viciar o feto\""
    ]
  },

  scores: ["nota-conferencia", "dose-peso"]
});
