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
