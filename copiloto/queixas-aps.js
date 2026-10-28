/* Queixas de APS — estacionadas em 16/09/2026, REATIVADAS em 26/10/2026 (APS I).
 *
 * Toda queixa de APS tem `tema` (taxonomia APS1::T0…T7, TC), e a lista do módulo
 * APS agrupa por ele. Há teste.
 *
 * Depressão/ansiedade/insônia (nível UBS), HAS e DM2, e criança de 2 meses a
 * 5 anos (AIDPI). Conteúdo validado em campo no 1º rodízio, com fonte citada
 * item a item. NÃO foi apagado: o Eric pediu para focar em psiquiatria "por
 * agora", durante o rodízio de Saúde Mental (07/09 a 25/10/2026).
 *
 * COMO TRAZER DE VOLTA: descomentar as DUAS tags <script> no index.html —
 * esta e a do oms-lms.js. Elas andam juntas porque a queixa crianca-aidpi é a
 * única porta de entrada da calculadora antropo-infantil, que lê OMS_LMS.
 * Separar as duas deixa a antropometria quebrada em tempo de execução, e o
 * erro só aparece quando alguém abrir a queixa com um paciente na frente.
 *
 * Este arquivo CONTINUA carregado em testes.html, de propósito: conteúdo
 * estacionado tem de continuar passando no lint e nos testes, senão apodrece
 * calado e volta quebrado.
 *
 * Depende de queixas.js já ter declarado QUEIXAS — carregar depois, sempre.
 */

QUEIXAS.push({
  id: "saude-mental-aps",
  nome: "Depressão, ansiedade e insônia",
  kw: "humor tristeza anedonia suicidio risco ideacao ansiedade insonia sono isrs fluoxetina caps benzodiazepinico acatisia alcool naltrexona trazodona phq gad matriciamento",
  tag: "Crônico",
  mod: "aps",
  tema: "TC-Clinica-Prevalente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)",
    itens: [
      "Tentativa prévia de suicídio é o maior preditor isolado de nova tentativa",
      "Arma de fogo em casa + tentativa prévia + isolamento + suporte frágil: internação e medidas de segurança imediatas, não conduta ambulatorial",
      "Restringir o acesso ao meio letal é medida obrigatória, não sugestão",
      { t: "Item 9 do PHQ-9 positivo: pare e avalie risco agora, não no fim da consulta", f: "guia-bolso-aps.html" },
      { t: "Psicose, uso prejudicial grave de substância ou refratariedade: caso de CAPS", f: "guia-bolso-aps.html" }
    ]
  },

  perguntas: {
    fonte: "guia-bolso-aps.html · medicina-wiki/wiki/saude-mental-fatos.md",
    itens: [
      "Rastreio em duas perguntas: humor deprimido e perda de interesse ou prazer nas últimas 2 semanas",
      "Se houver ideação, investigar os cinco: ideação · plano · meio disponível · tentativa prévia · suporte social",
      "Perguntar sobre suicídio não induz ao suicídio. Perguntar diretamente.",
      "Sono: dificuldade para iniciar, manter, ou despertar precoce? Há quanto tempo?",
      "Insônia: há ≥3 meses, em ≥3 noites por semana? (define insônia crônica)",
      "Uso de álcool e outras substâncias, incluindo padrão e última dose",
      "Medicação em uso, sobretudo antipsicótico iniciado ou aumentado nos últimos dias",
      "Já teve período de humor elevado, gastos incomuns ou redução da necessidade de sono?",
      { t: "Gestante ou possibilidade de gravidez: muda toda a conduta medicamentosa", f: "medicina-wiki/wiki/saude-mental-fatos.md" }
    ]
  },

  exame: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md",
    itens: [
      "Observar psicomotricidade: inquietação que alivia ao movimentar sugere acatisia, não ansiedade",
      "Observar se a inquietação é subjetiva (acatisia) ou acompanha expansividade (mania)",
      "Sinais de uso ou abstinência de substância",
      { t: "Exame físico e rastreio laboratorial para descartar causa orgânica: definir o que pedir com o protocolo local", v: true }
    ]
  },

  naoperder: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md · guia-bolso-aps.html",
    itens: [
      "Risco de suicídio iminente",
      "Acatisia confundida com piora do quadro — aumentar a dose entra em ciclo vicioso",
      "Transtorno bipolar por trás de um episódio depressivo",
      "Causa orgânica ou medicamentosa do quadro afetivo"
    ]
  },

  ddx: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md",
    itens: [
      "Acatisia × agitação maníaca — acatisia é inquietação subjetiva com alívio ao movimentar e surge dias após iniciar ou aumentar antipsicótico; conduta é REDUZIR a dose. Maior incidência com aripiprazol.",
      "TEA × fobia social — na fobia social o medo é circunscrito a situações de avaliação, com comportamento normal em casa e início delimitado; no TEA a dificuldade social existe desde a primeira infância",
      "TEA × deficiência intelectual — no TEA o perfil cognitivo é desigual; na deficiência intelectual o rebaixamento é global",
      "Insônia crônica primária × insônia secundária a depressão, ansiedade, substância ou dor",
      { t: "Quando o enunciado nega explicitamente tristeza, anedonia e alteração de sono e apetite, está excluindo depressão de propósito", f: "medicina-wiki (marcador de banca, útil no raciocínio)" }
    ]
  },

  /* 26/10/2026 (APS I): a dose saiu do texto da conduta. Desde 23/09 a queixa não
     escreve dose; o número mora no cartão da fluoxetina, no psicofarmacos.js,
     que esta queixa REFERENCIA pelo id — não copia. */
  farmaco: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013",
    itens: [
      "ISRS é o antidepressivo de base na UBS, com destaque para a fluoxetina",
      "Ansiedade que se cronifica trata-se com antidepressivo, em dose de depressão; benzodiazepínico só para sintoma e por pouco tempo",
      "Irritabilidade no início do ISRS é efeito indesejado, não resposta parcial: não aumentar a dose por isso"
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 34, Saúde Mental, 2013 · RENAME 2024",
    farmacos: [
      { id: "fluoxetina", papel: "1ª escolha na UBS — o ISRS em destaque no CAB nº 34 e o que a farmácia do SUS dispensa" }
    ]
  },

  conduta: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md · guia-bolso-aps.html",
    itens: [
      "Episódio depressivo maior sem risco iminente é manejo da própria UBS: ISRS + exercício + seguimento próximo (fármaco e dose: formulário, acima)",
      "Fica na APS: depressão e ansiedade leves a moderadas, sem risco, com vínculo e seguimento",
      "Vai para o CAPS: risco de suicídio, psicose, uso prejudicial grave, transtorno grave e persistente, refratariedade",
      "Encaminhar não é transferir e sumir — o CAPS apoia a equipe por matriciamento e o vínculo com a USF continua",
      "Insônia crônica: primeira linha é não farmacológica — TCC-I (restrição de sono, controle de estímulos, reestruturação cognitiva) + higiene do sono",
      "Álcool, já abstinente e sem sinais de abstinência: o alvo é manter a abstinência. Primeira linha naltrexona ou acamprosato + psicoterapia ou grupo",
      "TAG leve a moderado na gestação com funcionamento preservado: começar por psicoterapia, atividade física e acompanhamento próximo",
      { t: "Conferir dose, titulação e tempo de reavaliação no protocolo da USF antes de prescrever", v: true }
    ]
  },

  erros: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md",
    itens: [
      "Benzodiazepínico não trata depressão — e em risco alto oferece outro meio letal",
      "Encaminhar ao CAPS sem tratar é abdicar da resolutividade; CAPS é para transtorno grave e persistente",
      "Tricíclico (amitriptilina) como primeira linha: anticolinérgico, cardiotóxico em overdose, hipotensão ortostática",
      "Trazodona é adjuvante na insônia, não medicação inicial",
      "Biperideno não trata acatisia — serve para parkinsonismo e distonia aguda",
      "Iniciar benzodiazepínico para álcool fora da janela de abstinência aguda cria dependência nova",
      "Esquecer que vários ISRS pioram o sono no início do tratamento",
      "Valproato em mulher com possibilidade de gravidez: é o antiepiléptico mais teratogênico, contraindicado formalmente",
      "Afastar da escola a criança com fobia social reforça a esquiva e piora o quadro"
    ]
  },

  scores: ["nota-conferencia", "phq9", "gad7", "dose-peso"]
});

QUEIXAS.push({
  id: "has-dm2-aps",
  nome: "HAS e DM2 — consulta de crônico",
  kw: "hipertensao pressao arterial has mapa mrpa diabetes dm2 glicemia hba1c metformina risco cardiovascular estatina pe diabetico albuminuria tfg cronico hearts crise hipertensiva hipoglicemia insulina nph glargina gliclazida glibenclamida dapagliflozina losartana enalapril captopril anlodipino hidroclorotiazida",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Cardiorrenal-Metabolica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "SBC/SBH/SBN — Barroso WKS et al., Diretrizes Brasileiras de Hipertensão Arterial 2020, Arq Bras Cardiol 2021;116(3):516-658 · SBD — Diretriz da Sociedade Brasileira de Diabetes, Ed. 2025",
    itens: [
      { t: "PA alta (em geral ≥180/120, mas pode ser menos) COM lesão aguda de órgão-alvo — dor torácica, dispneia, déficit neurológico, confusão, alteração visual — é EMERGÊNCIA hipertensiva: urgência no mesmo dia, não ajuste de dose no consultório", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 17 e 59" },
      { t: "Sem lesão aguda de órgão-alvo é urgência ou pseudocrise: observar em ambiente calmo, achar o gatilho (má adesão, dor, ansiedade, AINE, corticoide) e baixar a PA aos poucos, por via oral, em 24 a 48 h", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 17, 19 e 47" },
      { t: "Hipoglicemia com rebaixamento, convulsão ou coma — quem precisa de outra pessoa para se tratar —, qualquer que seja o valor da glicemia, é nível 3: emergência", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 32" },
      "Hiperglicemia com desidratação, dor abdominal, vômito ou respiração de Kussmaul: suspeitar de cetoacidose",
      { t: "Cetoacidose pode cursar com glicemia normal ou baixa (euglicêmica): glicemia abaixo de 200 com pH abaixo de 7,3 e bicarbonato abaixo de 18. Glicemia normal não descarta", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, Ed. 2025 (cetoacidose euglicêmica)" },
      { t: "Pé diabético com úlcera infectada, infecção que se espalha, isquemia crítica, gangrena, ou pé quente, vermelho e inchado sem explicação (Charcot agudo): urgência no mesmo dia, não curativo de rotina", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 36" },
      { t: "Para onde vai já está acima (urgência no mesmo dia); quem acionar — SAMU, UPA de referência, regulação — e se a USF tem sulfato de magnésio e quem aplica são do fluxo local: confirmar na USF", v: true },
      { t: "PAS ≥180 ou PAD ≥120 que persistem mesmo depois da medicação na unidade: encaminhar à urgência (tratamento intravenoso e monitorização)", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 17 e 44" },
      { t: "Gestante ou puérpera com PAS ≥160 ou PAD ≥110, cefaleia occipital, escotomas ou dor epigástrica: hipertensão grave ou iminência de eclâmpsia — indicação de sulfato de magnésio já (PCDT p. 50), antes do anti-hipertensivo de ação rápida, e urgência obstétrica no mesmo dia", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 20, 21, 50 e 59 · MS — Manual de Gestação de Alto Risco, 2022, p. 445" },
      { t: "Em uso de dapagliflozina, dois eventos graves: fasciíte necrotizante perineal e cetoacidose euglicêmica (mais no idoso)", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 25" },
      { t: "Isquemia aguda de membro — dor em repouso, palidez, pulso ausente, membro mais frio, alteração de força ou de sensibilidade: urgência vascular", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 45" },
      { t: "Perda súbita de visão, luzes piscando, moscas volantes de repente ou sombra em cortina: oftalmologia imediata", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 45" },
      { t: "Glicemia acima de 250 com cetonúria e hálito cetônico, desidratação ou vômitos: encaminhar prontamente à emergência — ler o campo de cetonas da fita de urina", f: "MS — CAB nº 36, Diabetes Mellitus, 2013, Tabela 5" }
    ]
  },

  perguntas: {
    fonte: "guia-bolso-aps.html (HAS e DM2 — o essencial da consulta)",
    itens: [
      "Adesão real: quantas doses esqueceu na última semana? (perguntar sem julgamento muda a resposta)",
      "Está tomando qual medicação, em que dose e em que horário?",
      "Sintomas de hipoglicemia: tremor, sudorese, confusão, fome súbita",
      "Tabagismo, álcool, atividade física e padrão alimentar",
      "Sintomas de lesão de órgão-alvo: dor torácica, dispneia aos esforços, edema, claudicação, alteração visual",
      "Neuropatia: dormência, queimação ou formigamento em pés",
      { t: "Usa anti-inflamatório, corticoide, descongestionante nasal, contraceptivo oral, tricíclico, hormônio tireoidiano, cocaína ou anfetamina? Elevam a PA ou atrapalham o controle", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 2" },
      "Antecedente familiar de doença cardiovascular precoce",
      { t: "Sintomas de HAS secundária: ronco e sonolência diurna; crises de cefaleia com sudorese e palpitação; fraqueza muscular, cãibras ou tetania; edema pulmonar súbito", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15" },
      { t: "Mulher em idade fértil: usa contracepção confiável? Planeja engravidar? (IECA e BRA dependem disso)", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 35" },
      { t: "Quem usa insulina: mede a glicemia capilar em casa e traz as anotações? Teve hipoglicemia, inclusive à noite?", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 42" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      {
        t: "PA com técnica correta e manguito do tamanho do braço; na primeira consulta, nos dois braços",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 12 e 15"
      },
      {
        t: "Peso, altura, IMC e circunferência abdominal; frequência cardíaca",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15"
      },
      {
        t: "Ausculta cardíaca e pulmonar; palpar e auscultar carótidas; pesquisar edema",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15 e 57"
      },
      {
        t: "Pulsos periféricos; comparar o radial com o femoral",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15 e 16"
      },
      {
        t: "Exame neurológico sumário e estado cognitivo",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15"
      },
      {
        t: "Fundo de olho na primeira avaliação, sobretudo na HAS grau 3, no diabetes ou com lesão de órgão-alvo — fazer ou solicitar",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15"
      },
      {
        t: "Pés no diabético, ao diagnóstico e todo ano: pele, unhas, deformidade, pulsos e ao menos dois testes de sensibilidade — monofilamento de 10 g mais um outro, de preferência o diapasão de 128 Hz",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 37"
      },
      {
        t: "Ao fim do exame dos pés, classificar o risco de 0 a 3 (IWGDF, Quadro S1 do PCDT) — é ele que define o retorno",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 37 e 70"
      },
      {
        t: "Na suspeita de HAS secundária: sopro abdominal ou renal, massa renal, manchas café com leite, sinais de Cushing, acromegalia ou tireoide",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15 e 16"
      }
    ]
  },

  naoperder: {
    fonte: "guia-bolso-aps.html",
    itens: [
      "Emergência hipertensiva mascarada de 'pressão alta de rotina'",
      "Pé diabético infectado",
      "Doença renal crônica silenciosa — só aparece se pedir albuminúria e TFG",
      { t: "HAS secundária: suspeitar em todo diagnóstico antes dos 40 anos, HAS resistente, hipopotassemia espontânea, tríade cefaleia-sudorese-palpitação, ronco com sonolência, sopro abdominal, pulsos assimétricos ou alteração de urina e de função renal", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 9 e 58" },
      { t: "HAS resistente: PA ≥140/90 apesar de IECA ou BRA, BCC e tiazídico em dose máxima e boa adesão por seis meses — antes, descartar má adesão, técnica errada e avental branco", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 12" },
      { t: "Hipoglicemia sem sintoma de alerta depois de episódios repetidos: o paciente não percebe e chega já confuso", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 31" },
      { t: "DM2 de estreia com poliúria, polidipsia e perda de peso, ou HbA1c acima de 9%: insulina desde o início; sem excesso de peso, pensar também em DM1", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 10, 22 e 25" }
    ]
  },

  ddx: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      {
        t: "Hipertensão do avental branco e hipertensão mascarada: por isso MAPA e MRPA existem",
        f: "guia-bolso-aps.html"
      },
      {
        t: "Doença renal parenquimatosa — edema, anemia, creatinina e ureia altas, sedimento urinário alterado",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 10"
      },
      {
        t: "Estenose de artéria renal — HAS súbita antes dos 30 ou depois dos 50, resistente, sopro abdominal, edema agudo de pulmão, piora da função renal com IECA ou BRA",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 10"
      },
      {
        t: "Apneia obstrutiva do sono — ronco, pausas ou engasgos, sonolência diurna, cefaleia matinal, noctúria, obesidade",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 10"
      },
      {
        t: "Coarctação de aorta — pulsos de membros inferiores fracos ou ausentes, PAS dos braços 10 mmHg maior que a das pernas, sopro interescapular",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 10"
      },
      {
        t: "Hiperaldosteronismo primário — HAS resistente, com ou sem hipopotassemia, nódulo adrenal",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 11"
      },
      {
        t: "Feocromocitoma — HAS paroxística com cefaleia, sudorese e palpitações",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 11"
      },
      {
        t: "Cushing e tireoide — face em lua cheia, giba, estrias purpúreas; hipotireoidismo com HAS diastólica e ganho de peso; hipertireoidismo com taquicardia e perda de peso",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 11"
      },
      {
        t: "DM1, diabetes monogênico ou secundário em adulto que parece DM2 — sintomas clássicos com desidratação e perda de peso em quem não tem excesso de peso; álcool e corticoide como causa. Na dúvida, endocrinologista",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 8 e 10"
      }
    ]
  },

  exames: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      {
        t: "HAS no consultório: ≥140/90 em 2 a 3 medidas, com intervalo de 1 dia a 4 semanas; no grau 1, confirmar com 2 medidas separadas por 7 a 14 dias",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 7"
      },
      {
        t: "HAS fechada numa consulta só: PA ≥180/110, ou doença cardiovascular ou lesão de órgão-alvo evidente. PA ≥160/100 pede consulta médica imediata",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 7"
      },
      {
        t: "Graus no consultório: normal alta 130–139/85–89 · grau 1 140–159/90–99 · grau 2 160–179/100–109 · grau 3 ≥180/≥110",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 8"
      },
      {
        t: "MAPA (ou MRPA, se não houver) para confirmar: suspeita de avental branco (grau 1, ou PA alta sem lesão e com risco baixo), de mascarada (130–139/85–89, ou abaixo de 140/90 com lesão de órgão-alvo ou risco alto) e HAS resistente",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 13"
      },
      {
        t: "Limiares fora do consultório: MAPA 24 h ≥130/80, vigília ≥135/85, sono ≥120/70; MRPA (5 dias, manhã e noite) média ≥130/80",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 13 e 14"
      },
      {
        t: "HAS — exames iniciais: sódio, potássio, ácido úrico, creatinina com TFG, albuminúria, perfil lipídico, glicemia de jejum, urina (fita) e ECG de 12 derivações",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 16"
      },
      {
        t: "HAS — seguimento: perfil lipídico, glicemia de jejum ou HbA1c, creatinina, potássio, sódio (se tiazídico), urina e ECG; todo ano, ou no máximo a cada 2 anos",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 57"
      },
      {
        t: "DM2 (18 anos ou mais): jejum ≥126 · HbA1c ≥6,5% · TTGO 1 h ≥209 ou 2 h ≥200 · aleatória ≥200 com sintomas. Pré-diabetes: jejum 100–125 · HbA1c 5,7–6,4%",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 7"
      },
      {
        t: "DM2 no assintomático: 2 resultados alterados — o mesmo teste em amostras diferentes, ou jejum e HbA1c na mesma amostra. Só um alterado: repetir",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 8"
      },
      {
        t: "HbA1c engana com anemia aguda, hemoglobinopatia, transfusão, deficiência de G6PD, alfaepoetina, antirretroviral (ITRN e inibidor de protease), DRC ou hemodiálise, 2º e 3º trimestres e puerpério: usar glicemia de jejum e TTGO",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 7 e 8"
      },
      {
        t: "DM2 — seguimento: glicemia de jejum e HbA1c a cada 6 meses (a cada 3 se fora da meta); todo ano: lipídios, creatinina com TFG (CKD-EPI), relação albumina/creatinina em amostra, fundo de olho e pés",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 33, 38 e 42"
      }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      {
        t: "HAS — começar com DOIS anti-hipertensivos de mecanismos diferentes no grau 1 com risco moderado ou alto, com lesão de órgão-alvo e nos graus 2 e 3. Monoterapia no grau 1 de risco baixo, no idoso frágil (75 anos ou mais, ou os outros critérios da p. 32) e na PA normal alta com risco alto ou muito alto (junto com estatina)",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 32 e 33"
      },
      {
        t: "Base: IECA ou BRA, BCC e tiazídico. Betabloqueador só com indicação — angina, pós-IAM, IC, fibrilação atrial ou controle de FC, mulher em idade fértil ou que planeja engravidar",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 35, 40 e 43"
      },
      {
        t: "Pela comorbidade: IECA ou BRA na proteinúria, no diabetes, na IC e na doença renal; diurético de alça com TFG abaixo de 30 ou edema de IC; verapamil na fibrilação atrial; na pessoa preta, tiazídico ou BCC primeiro",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 36, 42 e 51"
      },
      {
        t: "Sem meta com a dupla (e com adesão conferida): subir até a dose máxima; depois, terceira classe na menor dose. HAS resistente: a quarta classe é a espironolactona, de olho no potássio",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 36 e 44"
      },
      {
        t: "Gestação: IECA, BRA, espironolactona e atenolol são contraindicados — trocar ao planejar ou ao descobrir. Lactação: nifedipino (ou anlodipino, se já usava) primeiro; BRA, atenolol e clonidina são contraindicados",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 50 e 51"
      },
      {
        t: "DM2 — metformina primeiro, inclusive no idoso; a segunda linha se soma a ela: sulfonilureia (no idoso o PCDT manda evitar a classe e, se usar, a gliclazida; gliclazida também em quem tem hipoglicemia; glibenclamida não a partir dos 60), dapagliflozina ou insulina",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 21, 24 e 40"
      },
      { t: "Diagnóstico há menos de 3 meses e sem fator de risco: 3 meses só de modo de vida e, sem resposta, metformina; nos demais, metformina já. HbA1c acima de 7,5% no diagnóstico: pode-se considerar começar combinado (sulfonilureia ou insulina; a dapagliflozina do SUS só na segunda intensificação, com os critérios do PCDT) — mas acima de 9%, ou com sintomas, a indicação é insulina, não dupla oral (item abaixo)", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 21 e 22" },
      { t: "Dapagliflozina pelo SUS: segunda intensificação, com 40 anos ou mais e doença cardiovascular estabelecida, ou homem a partir de 55 e mulher a partir de 60 anos com HAS, dislipidemia ou tabagismo (a nota g da Figura 2 diz homem a partir de 65: divergência interna do PCDT)", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 12, 22 e 25" },
      { t: "Insulina JÁ, inclusive no diagnóstico, e não dupla oral: HbA1c acima de 9%, jejum a partir de 300, sintomas de hiperglicemia aguda (poliúria, polidipsia, perda de peso), intercorrência ou internação pelo DM2 (Figura 2, nota b: 'devem iniciar insulinoterapia'). E também quando os orais falham", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 22 (Figura 2, nota b: 'devem') e p. 25 ('deve-se considerar', basal e bolus)" },
      {
        t: "A TFG decide: metformina reduzida entre 30 e 45 e suspensa abaixo de 30; sulfonilureia não abaixo de 30 (gliclazida de liberação prolongada com cautela); dapagliflozina não começa abaixo de 25",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 23, 24 e 33"
      },
      {
        t: "Gestação no DM2: trocar o antidiabético oral por insulina antes ou logo no início da gravidez",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 21"
      },
      {
        t: "Estatina sem calcular risco: HAS com lesão de órgão-alvo, LDL ≥190, DRC estágio 3 ou mais, diabetes a partir dos 40 anos. PA normal alta com risco alto ou muito alto: anti-hipertensivo e estatina",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6 e 33"
      },
      { t: "Qual estatina: a da UBS é a sinvastatina (Componente Básico); a atorvastatina é do Componente Especializado e a única cuja dose máxima o PCDT restringe aos casos especiais (muito alto risco, avaliados na atenção terciária); a dose usual é a inicial (cartão atorvastatina). O PCDT de Dislipidemia decide pelo risco, não pela busca do LDL-alvo — ver o guia Dislipidemia e risco cardiovascular", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4, 5, 7 e 10 · RENAME 2024" },
      { t: "Como começar: NPH à noite, antes de dormir (perto das 22 h), somada ao oral que já usa; a metformina fica, sobretudo na resistência à insulina; a sulfonilureia só enquanto a insulina for apenas basal. Dose inicial e titulação: cartão insulina-nph", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 25, 26 e 38" },
      { t: "Titular pela glicemia capilar de jejum a cada 3 dias até 80–130 (idoso comprometido ou muito comprometido: até 180); jejum abaixo de 70 ou hipoglicemia noturna: reduzir. Jejum na meta e HbA1c fora: segunda dose de NPH antes do café. Pós-prandial acima de 180 com pré-prandial na meta: bolus de regular antes da refeição de maior glicemia", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 26, 27 e 28" },
      { t: "Ao começar a insulina: ensinar técnica de aplicação, automonitorização da glicemia capilar e como reconhecer e tratar a hipoglicemia (mais frequente ao iniciar e ao intensificar), envolvendo a família; o paciente treinado pode autotitular a basal", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 25, 26 e 27" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    farmacos: [
      {
        id: "enalapril",
        papel: "IECA preferencial do PCDT — proteinúria, diabetes, IC, doença renal, pós-IAM"
      },
      { id: "losartana", papel: "o BRA do SUS — as mesmas indicações do IECA; nunca junto com ele" },
      { id: "anlodipino", papel: "BCC de uma tomada; com tiazídico na pessoa preta; compõe a tripla" },
      {
        id: "hidroclorotiazida",
        papel: "o tiazídico do SUS — primeira opção na pessoa preta; perde efeito com TFG abaixo de 30"
      },
      {
        id: "captopril",
        papel: "IECA de várias tomadas; papel próprio na urgência hipertensiva, por via oral"
      },
      {
        id: "nifedipino",
        papel: "BCC de ação curta — prioridade na puérpera; crise hipertensiva da gestante"
      },
      { id: "espironolactona", papel: "quarta classe na HAS resistente — olho no potássio na DRC" },
      { id: "furosemida", papel: "diurético de alça: TFG abaixo de 30 ou edema de IC" },
      { id: "metoprolol", papel: "betabloqueador da mulher em idade fértil, gestante e lactante; IC" },
      { id: "carvedilol", papel: "betabloqueador que não piora a glicose; IC" },
      {
        id: "atenolol",
        papel: "betabloqueador só com indicação (angina, pós-IAM, controle de FC); proibido na gestação"
      },
      {
        id: "propranolol",
        papel: "betabloqueador não seletivo — angina, controle de FC; evitar na asma e em quem tende à hipoglicemia"
      },
      {
        id: "verapamil",
        papel: "BCC não di-hidropiridínico — HAS com fibrilação atrial; nunca com betabloqueador"
      },
      { id: "metildopa", papel: "gestante hipertensa; opção na HAS resistente" },
      { id: "hidralazina", papel: "gestante hipertensa; HAS resistente" },
      { id: "doxazosina", papel: "HAS resistente — cuidado com hipotensão postural" },
      {
        id: "sulfato-de-magnesio",
        outra: true,
        papel: "gestante com PAS ≥160 ou PAD ≥110 ou iminência de eclâmpsia — antes do anti-hipertensivo rápido e da transferência"
      },
      { id: "metformina", papel: "primeira escolha no DM2, inclusive no idoso; fica quando entra a insulina" },
      {
        id: "gliclazida",
        papel: "se precisar de sulfonilureia no idoso, esta (PCDT: evitar a classe no idoso); também em quem tem hipoglicemia"
      },
      { id: "glibenclamida", papel: "sulfonilureia só abaixo dos 60 anos e sem hipoglicemia recorrente" },
      {
        id: "dapagliflozina",
        papel: "segunda intensificação com doença cardiovascular ou alto risco, pelos critérios do PCDT; Componente Especializado"
      },
      {
        id: "insulina-nph",
        papel: "a insulina que começa — basal ao deitar, somada ao oral; já no diagnóstico se HbA1c acima de 9%, jejum a partir de 300 ou sintomas"
      },
      { id: "insulina-regular", papel: "bolus antes da refeição quando a hiperglicemia é pós-prandial" },
      {
        id: "insulina-glargina",
        papel: "basal prolongada para hipoglicemia noturna ou grave, idoso, DRC; dispensação gradual"
      },
      {
        id: "sinvastatina",
        outra: true,
        papel: "a estatina da UBS — DM a partir dos 40 anos, HAS com lesão de órgão-alvo, DRC estágio 3 ou mais, LDL ≥190, doença aterosclerótica: sem calcular risco; com anlodipino ou verapamil, teto menor"
      },
      {
        id: "atorvastatina",
        outra: true,
        papel: "dose alta só no muito alto risco (casos especiais do PCDT); Componente Especializado"
      }
    ],
    combos: [
      "cro-dupla-inicial-has",
      "cro-tripla-has",
      "cro-tiazidico-bcc-preta",
      "cro-metformina-segunda-linha",
      "cro-metformina-nph"
    ],
    proibidos: [
      "cro-ieca-bra",
      "cro-betabloqueador-verapamil",
      "cro-nifedipino-rifampicina",
      "cro-sulfonilureia-insulina-bolus",
      "car-estatina-genfibrozila",
      "car-sinvastatina-macrolideo"
    ],
    dosemuda: ["car-sinvastatina-bcc-amiodarona"]
  },

  conduta: {
    fonte: "guia-bolso-aps.html — cortes calibrados na wiki (junho/2026), diretrizes SBC e SBD",
    itens: [
      { t: "Estratificar o risco cardiovascular uma vez por ano, dos 40 aos 74 anos, com a calculadora HEARTS (OPAS/OMS) — funciona sem colesterol, mas com ele é mais precisa. Fora dessa faixa, calculadora própria para a idade", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Metas no DM2: HbA1c abaixo de 7,0%, jejum 80–130, 2 h depois da refeição abaixo de 180. No PCDT de DM2, idoso é a partir dos 60 anos (p. 13). Idoso saudável: HbA1c abaixo de 7,5%; comprometido: abaixo de 8,0% (jejum 90–150); muito comprometido: só evitar sintoma de hiper e de hipoglicemia", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 13 e 14" },
      "Crônico não se acompanha por demanda, se acompanha por risco: agenda programada e busca ativa de faltoso",
      { t: "Meta de PA: primeiro abaixo de 140/90 para todos; se tolerar, 130/80 abaixo dos 65 anos, sobretudo com diabetes, DRC, coronariopatia ou AVC. De 65 a 79: PAS entre 130 e 140 (abaixo de 130 se tolerar), PAD abaixo de 80, nunca abaixo de 120/70. Idoso frágil, pelo PCDT (p. 32): 75 anos ou mais, ou ILPI, acamado, internação recente, AVE, demência ou outra doença neurodegenerativa, etilismo, neoplasia terminal, amputação, uma incapacidade funcional básica ou violência doméstica. Nele: monoterapia e meta flexível de 140–149/70–79. Entre 75 e 79 anos o PCDT cai nas duas faixas: na dúvida, vale a do frágil", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 21, 22, 32 e 38" },
      { t: "Meta de LDL é da SBC, não do PCDT (que decide pelo risco, não pela busca do LDL-alvo), e vale para as categorias da SBC (escore PREVENT mais agravantes e estratificadores, Tabela 4.1), que não são as faixas da HEARTS: abaixo de 115 no baixo (PREVENT abaixo de 5%, sem DM2), de 100 no intermediário (5 a menos de 20%), de 70 no alto (20% ou mais, LDL de 190 ou mais, DM2 com estratificador), de 50 no muito alto (doença aterosclerótica significativa ou evento prévio), de 40 no extremo; não-HDL 30 acima. Não aplicar a meta à categoria da HEARTS", f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025 · MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 7" },
      { t: "Modo de vida na HAS: sal até uma colher de chá rasa por dia (5 g de sal, 2 g de sódio); ao menos 150 min por semana de atividade moderada; não há nível seguro de álcool; parar de fumar", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 23 e 24" },
      { t: "DM2 com excesso de peso: perder ao menos 5% do peso; 3 a 7% já melhoram a glicemia", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 14" },
      { t: "Retorno na HAS: 1 mês depois de iniciar ou mudar o tratamento, mensal até a meta; no 1º ano, a cada 3 a 6 meses; na meta, semestral", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 57 e 58" },
      { t: "Retorno no DM2: a cada 6 meses, trimestral enquanto fora da meta; peso e PA em toda consulta", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 41" },
      { t: "Retorno pelo risco do pé (IWGDF 2023, Quadro S1 do PCDT): 0 — sem perda de sensibilidade protetora (PSP) e sem doença arterial periférica (DAP): 1 vez ao ano · 1 — PSP ou DAP: a cada 6 a 12 meses · 2 — PSP + DAP, ou PSP ou DAP com deformidade: a cada 3 a 6 meses · 3 — PSP ou DAP com úlcera prévia, amputação ou DRC terminal: a cada 1 a 3 meses. O CAB nº 36, de 2013, classificava diferente", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 70" },
      { t: "Encaminhar o pé, sem urgência, a um nível de maior complexidade: deformidade importante, pulsos ausentes ou suspeita de isquemia; úlcera, quando a USF não tiver profissional ou material para tratar", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 36" },
      { t: "Hipoglicemia em quem está consciente: nível 1 (de 54 a menos de 70) com 15 g de carboidrato rápido (1 colher de sopa de açúcar ou mel) e repetir em 15 min se não subir; nível 2 (abaixo de 54) com 30 g. Lanche antes de dormir previne a noturna", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 32" },
      { t: "Encaminhar, mantendo o cuidado na USF: suspeita de HAS secundária (todo diagnóstico antes dos 40), HAS resistente, múltiplas comorbidades ou complicações, risco cardiovascular muito alto", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 58" },
      { t: "Endocrinologista: sem controle com insulina basal em dose alta, boa adesão e hipoglicemias (esquema mais complexo); complicação (fundo de olho alterado, albuminúria, perda de sensibilidade). TFG abaixo de 25: endocrinologista e nefrologista — suspender metformina, sulfonilureia e dapagliflozina e deixar só insulina", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 44" }
    ]
  },

  erros: {
    fonte: "guia-bolso-aps.html",
    itens: [
      "Ajustar dose sem antes checar adesão — a causa mais comum de 'falha terapêutica' é não estar tomando",
      { t: "Fechar HAS grau 1 com uma medida só — confirmar com 2 medidas em 7 a 14 dias (uma consulta só basta com ≥180/110 ou lesão de órgão-alvo)", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 7" },
      "Diagnosticar DM2 com um único exame alterado e sem sintoma",
      "Tratar o número da PA e não estratificar o risco cardiovascular",
      "Acompanhar crônico por demanda espontânea, sem agenda programada nem busca ativa",
      "Esquecer o exame dos pés no diabético porque a consulta foi sobre pressão",
      { t: "Captopril sublingual, ou baixar rápido a PA na urgência sem lesão de órgão-alvo — a via é oral, e a queda brusca causa AVE, IAM ou cegueira", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 47" },
      { t: "Betabloqueador como primeira escolha sem indicação (angina, pós-IAM, IC, fibrilação atrial ou controle de FC, mulher em idade fértil ou que planeja engravidar) — aumenta AVE", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 40 e 43" },
      { t: "IECA ou BRA em monoterapia como primeira escolha na pessoa preta", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 51" },
      { t: "Glibenclamida em quem tem 60 anos ou mais", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 40" },
      { t: "Prescrever GLP-1, iDPP-4, acarbose, glitazona ou glinida contando com o SUS — não estão incorporados", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 22" },
      { t: "Pedir glicemia capilar diária a quem só usa antidiabético oral — o benefício demonstrado é para quem usa insulina", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 42" },
      { t: "Tratar com dupla oral (metformina + sulfonilureia) o DM2 de estreia com HbA1c acima de 9%, jejum a partir de 300 ou poliúria, polidipsia e perda de peso — a indicação é insulina desde o início", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 22 e 25" },
      { t: "Adiar a insulina por receio do paciente ou da equipe — atrasar a intensificação é inércia terapêutica e determina complicação crônica", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 21" },
      { t: "Suspender a metformina ao começar a insulina", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 25 e 38" },
      { t: "Hiperglicemia importante, fita de urina na mão e o campo de cetonas sem leitura — a cetonúria muda a conduta", f: "MS — CAB nº 36, Diabetes Mellitus, 2013, Tabela 5" }
    ]
  },

  scores: ["nota-conferencia", "imc", "ckdepi", "dose-peso"]
});

/* ------------------------------------------------------------------------
   Criança de 2 meses a 5 anos — a porta de entrada da consulta pediátrica.
   Conteúdo transcrito do Manual de Quadros de Procedimentos AIDPI CRIANÇA
   (MS/OPAS/UNICEF, Brasília, 2017). A versão brasileira tem SEIS sinais
   gerais de perigo: além dos quatro clássicos da OMS, entram enchimento
   capilar >2 s e batimento de asa do nariz e/ou gemência. Não substituir
   pela lista da OMS, que é mais curta.
   ------------------------------------------------------------------------ */
QUEIXAS.push({
  id: "crianca-aidpi",
  nome: "Criança de 2 meses a 5 anos (AIDPI)",
  kw: "crianca pediatria lactente bebe febre tosse gripe ivas resfriado diarreia sinais de perigo aidpi peso crescimento antropometria puericultura dose",
  tag: "Agudo",
  mod: "aps",
  tema: "T4-Crianca-Adolescente",
  atualizado: "2026-08-05",

  redflags: {
    fonte: "MS/OPAS/UNICEF — Manual de Quadros de Procedimentos AIDPI Criança, 2 meses a 5 anos, 2017 (sinais gerais de perigo)",
    itens: [
      "Não consegue beber ou mamar no peito",
      "Vomita tudo o que ingere",
      "Apresentou convulsões ou movimentos anormais há menos de 72 h",
      "Está letárgica ou inconsciente",
      "Tempo de enchimento capilar maior que 2 segundos",
      "Batimento de asa do nariz e/ou gemência"
    ]
  },

  perguntas: {
    fonte: "MS/OPAS/UNICEF — AIDPI Criança 2017",
    itens: [
      "Qual é o problema da criança? (deixar a mãe ou o responsável contar antes de dirigir)",
      "É primeira consulta ou retorno para este mesmo problema?",
      "Consegue beber ou mamar no peito?",
      "Vomita tudo o que ingere?",
      "Teve convulsão ou movimento anormal há menos de 72 h?",
      "Tem tosse ou dificuldade para respirar? Há quanto tempo?",
      "Tem sibilância (chiado)?",
      "Tem diarreia? Há quanto tempo? Tem sangue nas fezes?",
      "Tem febre? Há quanto tempo?",
      "Como está a alimentação e a ingestão de líquidos?",
      "Vacinação em dia? Conferir na caderneta, não no relato"
    ]
  },

  exame: {
    fonte: "MS/OPAS/UNICEF — AIDPI Criança 2017",
    itens: [
      "Contar a frequência respiratória por um minuto inteiro, com a criança TRANQUILA",
      "Respiração rápida: 50 ou mais por minuto dos 2 aos 11 meses; 40 ou mais de 1 a 5 anos incompletos",
      "Procurar tiragem subcostal",
      "Procurar estridor em repouso ou sibilância",
      "Verificar o tempo de enchimento capilar",
      "Procurar batimento de asa do nariz e gemência",
      "Avaliar o estado de consciência: letárgica, inconsciente ou irritada",
      "Pesar e medir, e marcar na caderneta — o ponto isolado vale menos que a linha"
    ]
  },

  naoperder: {
    fonte: "MS/OPAS/UNICEF — AIDPI Criança 2017",
    itens: [
      "Qualquer sinal geral de perigo, tiragem subcostal ou estridor em repouso classifica como PNEUMONIA GRAVE OU DOENÇA MUITO GRAVE: primeira dose de antibiótico, tratar para evitar hipoglicemia, oxigênio se disponível e referir com urgência",
      "Criança com qualquer sinal geral de perigo precisa ser assistida com urgência: completar a avaliação imediatamente, tratar e referir",
      "Contar a frequência respiratória com a criança chorando superestima e faz classificar pneumonia onde não há"
    ]
  },

  conduta: {
    fonte: "MS/OPAS/UNICEF — AIDPI Criança 2017 (quadro \"Quando retornar imediatamente\")",
    itens: [
      "Orientar retorno IMEDIATO, para qualquer criança doente, se: não conseguir beber nem mamar no peito, piorar do estado geral, ou aparecer ou piorar a febre",
      "Se tosse ou dificuldade para respirar, acrescentar ao retorno imediato: respiração rápida e dificuldade para respirar",
      "Se diarreia, acrescentar ao retorno imediato: sangue nas fezes e dificuldade para beber",
      "Combinar o retorno de seguimento conforme a classificação, e registrar na caderneta"
    ]
  },

  erros: {
    fonte: "MS/OPAS/UNICEF — AIDPI Criança 2017",
    itens: [
      "Contar a frequência respiratória com a criança agitada ou chorando",
      "Usar a lista de sinais de perigo da OMS, mais curta, no lugar da brasileira — enchimento capilar e gemência ficam de fora",
      "Aceitar 'vacina em dia' sem ver a caderneta",
      "Pesar e medir sem marcar na curva: o valor isolado não mostra a inflexão",
      "Prescrever dose pediátrica de cabeça, sem recalcular pelo peso do dia"
    ]
  },

  scores: ["nota-conferencia", "antropo-infantil", "dose-peso"]
});

/* =====================================================================
 * APS I — onda de conteúdo (2026-10-26): as consultas da USF Viveiros II,
 * pelos temas do rodízio (campo `tema`). Mesmas regras de sempre, e a da onda 2:
 * a queixa não escreve dose — o número mora no cartão do farmacos-aps.js (ou do
 * psicofarmacos.js), com fonte e página.
 * ===================================================================== */

QUEIXAS.push({
  id: "puericultura-0-2",
  nome: "Puericultura de 0 a 2 anos",
  kw: "puericultura lactente bebe recem nascido rn consulta crianca vacina calendario marcos desenvolvimento sinais de alerta perimetro cefalico curva crescimento aleitamento amamentacao alimentacao complementar triagem neonatal teste do pezinho orelhinha olhinho vitamina a ferro acidentes violencia",
  tag: "Programa",
  mod: "aps",
  tema: "T4-Crianca-Adolescente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Menor de 2 meses que não consegue mamar, vomita tudo, teve convulsão ou apneia, está letárgico ou se mexe menos que o habitual: referir com urgência — infecção bacteriana grave mata em pouco tempo",
      "Menor de 2 meses com febre (37,5 °C ou mais), hipotermia (abaixo de 35,5 °C), respiração acima de 60 por minuto, tiragem subcostal, batimento de asa do nariz, gemido, cianose generalizada ou palidez importante: referir com urgência",
      "Menor de 2 meses com fontanela abaulada, onfalite (vermelhidão que passa para a parede do abdome ou secreção purulenta no umbigo), pústulas extensas, secreção purulenta no ouvido, frequência cardíaca abaixo de 100 ou dor à manipulação: referir com urgência",
      "Menor de 2 meses com icterícia nas primeiras 24 horas de vida ou visível abaixo do umbigo: referir com urgência",
      "Mãe com HIV ou HTLV1/2: não amamentar; criança com galactosemia, doença do xarope de bordo ou fenilcetonúria: não amamentar — referir",
      "Reflexo vermelho diferente entre os olhos ou com opacidade: oftalmologista com urgência — catarata congênita, retinoblastoma, retinopatia da prematuridade",
      "Perímetro cefálico abaixo de −2 ou acima de +2 escores z: referir para avaliação neuropsicomotora (microcefalia, hidrocefalia)",
      { t: "Perda de habilidade que já tinha conquistado (regressão), em qualquer idade", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      "Lesão que a história não explica: fratura antes dos 18 meses, equimose em área protegida (costas, nádegas, orelhas), marca de objeto, queimadura em luva ou em meia, lesões em fases diferentes de cicatrização, hemorragia de retina bilateral — suspeitar de violência",
      { t: "Violência sexual com exposição há menos de 72 horas: urgência — PEP, profilaxia de IST e testagem neste atendimento (usar a queixa PrEP, PEP e violência sexual), além de notificar e comunicar ao Conselho Tutelar", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Lactente sacudido (em geral menor de 6 meses): cegueira, convulsão, hematoma subdural, fratura de costela — pode evoluir para óbito",
      "Peso muito baixo para a idade ou magreza acentuada (abaixo de −3 escores z): investigar causa, Nasf e serviço social, retorno em no máximo 15 dias",
      { t: "Criança de 2 meses ou mais, doente, com qualquer sinal geral de perigo: usar a queixa AIDPI e referir", f: "MS/OPAS/UNICEF — Manual de Quadros de Procedimentos AIDPI Criança, 2 meses a 5 anos, 2017" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Primeira consulta: tipo e local do parto, peso ao nascer, idade gestacional, Apgar, intercorrências na gestação, no parto e no período neonatal; saúde dos pais e dos irmãos",
      "Sorologias da mãe no pré-natal e na maternidade: HIV, HTLV, HBsAg, sífilis — o resultado muda amamentação, vacina e seguimento",
      "Abrir com pergunta aberta: o que gostaria de me contar hoje? mudou algo importante na família? algo no comportamento da criança preocupa?",
      "Caderneta na mão: BCG e hepatite B da maternidade, vacinas da idade, teste do pezinho e demais triagens com o resultado",
      "Amamentação: exclusiva? em livre demanda? dor, fissura, mama repuxada? já recebe água, chá ou outro leite?",
      "A partir de 6 meses: o que come, em que consistência, quantas vezes ao dia, se tem carne na papa, se recebe açúcar, mel, refrigerante ou salgadinho",
      "A mãe: humor, sono, quem ajuda — depressão pós-parto aumenta o desmame",
      { t: "O que a criança já faz: conferir com os sinais de alerta da faixa (seção Exame)", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      "Sono: de barriga para cima, em berço firme, sem lençol solto nem objeto macio? Coleito com quem bebeu, usou droga ou sedativo, fuma ou está exausto?",
      "Vulnerabilidade: mãe com menos de 18 anos ou menos de 8 anos de estudo, baixo peso ao nascer (menos de 2.500 g), prematuridade, Apgar menor que 7 no 5º minuto, internações, morte de criança menor de 5 anos na família, área de risco",
      "Segurança: grade do berço, nunca sozinho em cima de móvel ou na banheira, água do banho morna, produtos de limpeza e remédios fora do alcance, transporte no banco de trás",
      "Casa: o pai participa do cuidado? há conflito, álcool ou droga, punição física?",
      "Diante de lesão: a história explica a lesão? demorou para procurar atendimento? os acidentes se repetem?"
    ]
  },

  exame: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Peso, comprimento e perímetro cefálico em TODA consulta até 2 anos, marcados nas curvas da caderneta (peso, comprimento e IMC para a idade)",
      "Recém-nascido: perda de até 10% do peso de nascimento é normal, com recuperação até o 15º dia. Prematuro: idade corrigida nas curvas e na avaliação do desenvolvimento até os 2 anos",
      "Fontanela anterior de 1 a 4 cm, fecha entre 9 e 18 meses e não pode estar fechada ao nascer; posterior fecha até o 2º mês; nenhuma túrgida, abaulada ou deprimida",
      "Olhos: reflexo vermelho na 1ª consulta e aos 4, 6 e 12 meses (e aos 2 anos); teste de cobertura e de Hirschberg aos 4, 6 e 12 meses — antes dos 4 meses o desvio pode ser normal",
      "Quadril: Barlow e Ortolani aos 15 dias, 1 e 2 meses; depois, limitação da abdução e encurtamento de um membro aos 4, 6, 9 e 12 meses; marcha quando começar a andar",
      "Testículos não palpáveis: reavaliar aos 3 meses; ausentes aos 6 meses → cirurgia pediátrica. Umbigo: coto cai nas 2 primeiras semanas; hérnia umbilical aguarda até 12 meses; hérnia inguinal tem indicação cirúrgica imediata",
      "Icterícia: atenção se começa depois do 7º dia, dura mais de 1 semana no termo ou 2 no prematuro, ou chega a braços e pernas",
      "Boca: freio lingual e palato; dente ao nascer ou no 1º mês deve ser extraído; nenhum dente até os 12 meses → investigar",
      { t: "Fim do 3º mês — alerta: sem sorriso social, nenhum controle da cabeça, não acompanha objetos com o olhar, não reage a sons, mãos sempre fechadas, não leva a mão à boca, tremores ou movimentos involuntários", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "Fim do 6º mês — alerta: sem controle da cabeça, tronco mole ou membros duros, não rola, não tenta pegar o que está ao alcance, não vira a cabeça para o som, não ri, não reage ao próprio nome, não demonstra afeto", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "Fim do 9º mês — alerta: não senta, não sustenta o peso nas pernas com apoio, pernas moles ou duras, polegar aduzido, não passa objeto de uma mão para a outra, não balbucia, não responde ao nome, não olha para onde se aponta", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "Fim do 12º mês — alerta: não engatinha, não fica de pé com apoio, não procura o objeto escondido, não aponta, não dá tchau nem balança a cabeça, não fala sílabas ou parou de balbuciar", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "15 meses — alerta: não engatinha, não fica de pé com apoio, não procura objeto escondido, não fala palavras simples (mama, papa), não acena nem balança a cabeça, não aponta, sem contato visual, prefere objetos a pessoas, gestos repetitivos", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "18 meses — alerta: não anda, não aponta quando nomeiam o objeto nem para mostrar, não imita, não sabe para que servem os objetos, menos de 6 palavras com função, sem jogo simbólico, perdeu habilidade", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "2 anos — alerta: não usa frase de 2 palavras, não segue comando simples, não anda com firmeza, não sabe usar colher ou escova, não imita, sem contato visual nem atenção compartilhada, isola-se", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" }
    ]
  },

  naoperder: {
    fonte: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026",
    itens: [
      { t: "Consultas: 1ª semana, 1, 2, 4, 6, 9 e 12 meses; 18 e 24 meses; depois anual, perto do aniversário. Criança de risco: mais vezes", f: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012" },
      "Ao nascer: BCG (dose única) e hepatite B nas primeiras 12 horas. A hepatite B monovalente só vale até 1 mês de vida; passou disso, o esquema é a penta",
      "2 meses: penta, VIP, rotavírus e pneumocócica VPC 20 (1ª dose de cada)",
      "3 meses: meningocócica C (1ª) · 5 meses: meningocócica C (2ª)",
      "4 meses: penta, VIP e rotavírus (2ª); pneumocócica 2ª dose com VPC 10 na transição (VPC 20 se faltar a VPC 10)",
      "6 meses: penta e VIP (3ª); influenza (na 1ª vez, 2 doses com 30 dias; depois anual até 5 anos 11 meses e 29 dias); covid-19 (1ª)",
      "7 meses: covid-19 (2ª) · 9 meses: febre amarela (1ª) e covid-19 (3ª)",
      "12 meses: tríplice viral (1ª), pneumocócica VPC 20 (reforço) e meningocócica ACWY (reforço)",
      "15 meses: DTP (1º reforço), VIP (1º reforço), tríplice viral (2ª) junto com varicela (1ª), hepatite A",
      "Rotavírus: 1ª dose de 1 mês e 15 dias até 11 meses e 29 dias; 2ª de 3 meses e 15 dias até 23 meses e 29 dias, com 60 dias entre elas. Perdeu a janela da 1ª, perde as duas. Regurgitou: não repetir",
      "Menor de 2 anos: tríplice viral e febre amarela não no mesmo dia (exceto emergência epidemiológica); 30 dias entre elas",
      "Mãe HBsAg+ ou sem sorologia: conferir imunoglobulina anti-hepatite B — ainda vale até 7 dias de vida; anti-HBs 30 a 60 dias após a 3ª dose",
      "RN contato de TB pulmonar: não fazer BCG — excluir TB, tratamento preventivo, depois PT; BCG só se a PT for negativa",
      "BCG: adiar enquanto pesar menos de 2.000 g; criança não vacinada pode receber até 4 anos 11 meses e 29 dias, se assintomática e sem imunodepressão"
    ]
  },

  exames: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      { t: "Triagem neonatal, os 5 testes: pezinho, olhinho (reflexo vermelho), orelhinha, coraçãozinho (oximetria) e linguinha — conferir se foram feitos e o resultado", f: "medicina-wiki/wiki/materno-infantil-fatos.md (2026-05-31)" },
      "Teste do pezinho entre o 3º e o 7º dia de vida (aceito até o 30º); resultado alterado → contato com o serviço de referência estadual de triagem neonatal",
      "Orelhinha (emissões otoacústicas) obrigatória na maternidade (Lei 12.303/2010), de preferência até o fim do 1º mês; falhou no reteste → otorrino e fonoaudiologia, com diagnóstico até os 6 meses",
      "Risco de perda auditiva (caso congênito na família, UTI por mais de 5 dias com ventilação, ototóxico ou exsanguineotransfusão, infecção congênita, meningite, anomalia craniofacial): emissões otoacústicas associadas ao BERA",
      "Prematuro de 32 semanas ou menos, ou com menos de 1.500 g: fundo de olho com dilatação pelo oftalmologista na 6ª semana — o reflexo vermelho só pega a retinopatia já grave",
      "Hemograma: não é rotina se a criança recebeu ferro profilático. Não suplementada: hemograma entre 9 e 12 meses. Prematuro ou PIG: aos 15 meses. Prematuro com hemorragia perinatal, gemelar ou mãe com Hb abaixo de 8: aos 6 e aos 15 meses",
      "EAS e parasitológico de rotina na criança sem sintoma: sem benefício demonstrado. Febre, irritabilidade, vômito ou parada do ganho de peso sem causa → pensar em infecção urinária"
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Criança em aleitamento exclusivo até os 6 meses, com mãe bem nutrida, não precisa de vitamina — exceto a vitamina K feita na maternidade e a vitamina D em situações selecionadas",
      "Vitamina K: conferir na caderneta se foi feita ao nascer; se os pais recusaram a injetável, a via oral exige doses repetidas nos 3 primeiros meses",
      "Vitamina A em megadose é ação do Programa Nacional, de 6 a 59 meses, em área do programa — a Região Nordeste está entre elas (faixa e áreas como o CAB nº 33 descreve; o caderno de 2025 não foi conferido). Conferir na caderneta a data da última dose",
      { t: "Ferro profilático: o CAB 33 (2012) dá 6 a 24 meses pela atualização do programa; o esquema vigente está no caderno de 2025, não conferido", v: true },
      "Vitamina D: só com fator de risco — prematuridade, pele escura, pouca exposição ao sol, filho amamentado de mãe vegetariana estrita; não há evidência para suplementação universal no Brasil",
      "Flúor: não suplementar onde a água de abastecimento é fluoretada",
      "Polivitamínico para abrir o apetite ou engordar: não prescrever — corrigir a alimentação; vitamina em excesso faz tanto mal quanto a falta",
      "Zinco: sem recomendação de suplementação universal; na diarreia, seguir a queixa AIDPI"
    ]
  },

  conduta: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Aleitamento materno exclusivo até 6 meses, em livre demanda, sem água, chá ou outro alimento; complementado até 2 anos ou mais — exceto nas contraindicações (mãe HIV+ ou HTLV+, galactosemia, xarope de bordo, fenilcetonúria, medicamento incompatível)",
      "Aos 6 meses: papa de fruta e papa salgada (comida de panela amassada) com um alimento de cada grupo desde a 1ª oferta — cereal ou tubérculo, leguminosa, carne ou ovo, legume ou verdura — espessa e de colher",
      "Refeições complementares: 3 vezes ao dia se mama no peito, 5 se desmamada; aos 8 meses, comida da família amassada ou desfiada; aos 12 meses, a refeição da família",
      "Sem açúcar, café, refrigerante, enlatado, fritura e salgadinho nos primeiros anos; mel proibido antes de 12 meses (botulismo)",
      "Anemia se previne na comida: carne nas papas, fígado de boi uma vez por semana, fruta com vitamina C depois do almoço e do jantar; leite de vaca no lugar da comida favorece anemia",
      "Desenvolvimento: marco da faixa ausente → orientar estimulação e retorno em 30 dias; marco da faixa anterior ausente, 3 ou mais alterações fenotípicas ou PC fora de ±2 escores z → referir para avaliação neuropsicomotora",
      { t: "M-CHAT-R (rastreio de TEA) entre 16 e 30 meses, em consulta de rotina (as consultas de 18 e 24 meses caem nessa janela)", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "Prematuro ou criança com risco pré, peri ou pós-natal: encaminhar já para estimulação precoce, mesmo com os marcos presentes", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      "Peso baixo ou magreza em menor de 2 anos: investigar desmame e alimentação, orientar a alimentação complementar, retorno em no máximo 15 dias; sem ganho → Nasf",
      "Saúde bucal: limpar a gengiva desde os primeiros dias; 1ª consulta odontológica entre o 1º dente e os 12 meses; escova macia quando nascerem os molares (por volta de 18 meses), com creme dental fluoretado do tamanho de um grão de arroz cru, na última escovação; nunca dormir com mamadeira",
      "Acidentes: 0–6 meses grade do berço, nunca sozinho em móvel ou banheira, sem talco, bebê-conforto de costas no banco de trás; 6–12 meses protetor de tomada, rede na janela, barreira na escada, cabo da panela para dentro, longe de balde e piscina, produtos de limpeza trancados; 1–2 anos porta da cozinha e do banheiro fechada, segurar pelo pulso na rua",
      "Suspeita de violência: acolher, registrar no prontuário, preencher a ficha de notificação e comunicar ao Conselho Tutelar — obrigatório para suspeita e para caso confirmado (ECA, arts. 13 e 245); manter o acompanhamento",
      { t: "Criança doente de 2 meses a 5 anos: usar a queixa AIDPI", f: "MS/OPAS/UNICEF — Manual de Quadros de Procedimentos AIDPI Criança, 2 meses a 5 anos, 2017" }
    ]
  },

  erros: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      { t: "Recusar a 1ª dose de rotavírus depois de 3 meses e 15 dias — pela IN 2026 a 1ª vai até 11 meses e 29 dias e a 2ª até 23 meses e 29 dias", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Aplicar hepatite B monovalente depois de 1 mês de vida para completar — passou de 1 mês, a proteção vem da penta", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Aplicar tríplice viral e febre amarela no mesmo dia em menor de 2 anos, fora de emergência epidemiológica", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Adiar vacina por resfriado sem febre, antibiótico, desnutrição ou prematuridade — prematuro vacina pela idade cronológica", f: "guia-bolso-aps.html" },
      "Medir e não marcar na curva, inclusive o perímetro cefálico — o ponto isolado não mostra a inflexão",
      "Comparar o prematuro com a curva e os marcos da idade cronológica antes dos 2 anos",
      "Receitar outro leite para complementar sem avaliar a pega e a mamada",
      "Liberar água ou chá antes dos 6 meses, ou mel antes de 1 ano",
      "Pedir hemograma, EAS e parasitológico de rotina na criança saudável",
      "Esperar confirmar a violência para notificar — a suspeita já obriga",
      "Encaminhar estrabismo antes dos 4 meses — até lá o desvio pode ser normal"
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    farmacos: [
      { id: "vitamina-a", papel: "megadose periódica de 6 a 59 meses pelo Programa Nacional de Suplementação de Vitamina A (o Nordeste é área do programa, pelo CAB nº 33; caderno de 2025 não conferido) — esquema e dose a conferir no cartão" }
    ],
    combos: [], proibidos: [], dosemuda: []
  },

  scores: ["nota-conferencia", "antropo-infantil", "dose-peso"]
});

QUEIXAS.push({
  id: "puericultura-2-10",
  nome: "Puericultura de 2 a 10 anos",
  kw: "puericultura crianca pre escolar escolar consulta anual crescimento imc obesidade sobrepeso magreza baixa estatura desenvolvimento linguagem fala tea escola bullying vacina reforco hpv dengue saude bucal carie fluor acidentes violencia negligencia pressao arterial acuidade visual",
  tag: "Programa",
  mod: "aps",
  tema: "T4-Crianca-Adolescente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      { t: "Perda de habilidade já adquirida (fala, controle de esfíncter, brincar), em qualquer idade", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "Pouco ou nenhum contato visual, isolamento, interesse excessivo por um objeto, gestos repetitivos, sem brincar de faz de conta: rastrear TEA", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      "Lesão em área coberta ou protegida, marca de objeto (fio, cinto, fivela), queimadura em luva, em meia ou de ponta de cigarro, lesões em fases diferentes, fratura de perna em queda de bicicleta antes dos 4 anos: suspeitar de violência física",
      "Lesão, sangramento ou secreção genital ou anal, IST, infecção urinária, enurese, encoprese, comportamento sexual impróprio para a idade: suspeitar de violência sexual — nenhum sinal isolado fecha, o conjunto sim",
      { t: "Violência sexual com exposição há menos de 72 horas: urgência — PEP, profilaxia de IST e testagem neste atendimento (usar a queixa PrEP, PEP e violência sexual), além de notificar e comunicar ao Conselho Tutelar", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Pressão arterial acima do percentil 95 para idade, sexo e estatura (média das 2 últimas de 3 medidas): hipertensão",
      "Magreza acentuada ou peso muito baixo para a idade (abaixo de −3 escores z): investigar alimentação, infecções, cuidado, afeto e higiene; Nasf, serviço social e retorno em no máximo 15 dias",
      { t: "Sinal de puberdade antes dos 8 anos na menina (broto mamário, pelos) ou antes dos 9 no menino (aumento dos testículos, pelos): puberdade precoce — referir", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      "Vítima de bullying com tristeza, isolamento ou ideia suicida: valorizar a queixa e o sofrimento, envolver família e escola",
      { t: "Criança de até 5 anos doente, com sinal geral de perigo: usar a queixa AIDPI", f: "MS/OPAS/UNICEF — Manual de Quadros de Procedimentos AIDPI Criança, 2 meses a 5 anos, 2017" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Pergunta aberta: o que gostaria de me contar? mudou algo na família? algo no comportamento preocupa?",
      "Escola: frequenta? rendimento, dificuldade para aprender, faltas, brigas, apelido, exclusão (bullying)?",
      "Alimentação: 5 ou 6 refeições em horário regular, com a família e sem TV? leite no lugar do almoço ou do jantar? suco, refrigerante, salgadinho, doce?",
      "Tela e movimento: quantas horas por dia de TV, celular e videogame; atividade física na escola e fora dela",
      "Sono: horário, ritual para dormir, tela ou luz acesa no quarto",
      "Xixi e cocô: controla de dia? molha a cama? o treino foi com pressão ou castigo?",
      { t: "Fala e brincadeira: fala frases, conta história, brinca de faz de conta, segue comando de 3 passos, sabe nome e sobrenome?", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      "Comportamento: birra, limites, agressividade, medo, isolamento; como a família corrige — palmada como disciplina é fator de risco para violência",
      "Dentes: quem escova à noite, se usa creme dental com flúor e quanto, se a gengiva sangra, se come doce entre as refeições",
      "Segurança: como anda de carro, fica sozinho perto de água, arma de fogo em casa, fogo e fogos de artifício, pipa perto de fio, capacete na bicicleta",
      "Casa: quem cuida, conflito, álcool ou droga, desemprego, doença mental de pai ou mãe",
      "A partir dos 7 anos: conversar sobre álcool, em casa e na escola"
    ]
  },

  exame: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Peso e altura em toda consulta, com IMC para a idade e altura para a idade marcados na curva — a altura para a idade é o melhor indicador de crescimento",
      "IMC para a idade: acima de +1 escore z = risco de sobrepeso (até 5 anos) ou sobrepeso (acima de 5); acima de +2 = sobrepeso (até 5) ou obesidade (acima de 5); acima de +3 = obesidade (até 5) ou obesidade grave (acima de 5); abaixo de −2 magreza, de −3 magreza acentuada",
      "Altura para a idade: abaixo de −2 escores z, baixa; abaixo de −3, muito baixa",
      "Pressão arterial: medir aos 3 anos e de novo no início da idade escolar (6 anos), com manguito adequado e tabela por percentil de estatura",
      "Acuidade visual com tabela de letras ou figuras a partir dos 3 anos: abaixo de 20/40 (3 a 5 anos) ou de 20/30 (6 anos ou mais), ou 2 linhas de diferença entre os olhos → oftalmologista",
      "Reflexo vermelho na consulta dos 2 anos",
      "Marcha: Trendelenburg positivo, marcha anserina ou hiperlordose lombar sugerem displasia do quadril",
      "Testículo retrátil: reexaminar a cada 6 a 12 meses dos 4 aos 10 anos — pode sair da bolsa no crescimento",
      "Boca: mancha branca ou cavidade (cárie ativa), dente permanente nascendo sem cair o de leite → equipe de saúde bucal",
      { t: "3 anos — alerta: fala ininteligível ou sem frases, não pula com os 2 pés, não pedala, não aponta partes do corpo, não sabe o primeiro nome, não controla o xixi de dia, não brinca de faz de conta", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "4 anos — alerta: não conta história, não segue comando de 3 passos, não entende dentro e fora nem igual e diferente, não usa eu e você, fala só palavras repetidas de desenho ou filme, ignora outras crianças", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      { t: "5 e 6 anos — alerta: não fala nome e sobrenome, fala incompreensível ou cheia de erros, pouco vocabulário, responde só superficialmente, não separa real de imaginário, não faz nenhuma atividade da rotina sozinho (lavar as mãos, se despir), comportamento extremo (medo, timidez, agressividade)", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" }
    ]
  },

  naoperder: {
    fonte: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026",
    itens: [
      { t: "Consulta anual, perto do aniversário; mais vezes se houver risco", f: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012" },
      "4 anos: DTP (2º reforço), VIP (2º reforço), febre amarela (reforço) e varicela (2ª dose)",
      "9 anos: HPV4 em dose única, meninas e meninos (janela até 14 anos 11 meses e 29 dias)",
      "10 anos: dengue, 2 doses com 3 meses de intervalo (janela até 14 anos 11 meses e 29 dias); observar pelo menos 15 minutos após a dose (30 se alergia grave prévia)",
      "Influenza anual até 5 anos 11 meses e 29 dias (na 1ª vez, 2 doses com 30 dias); covid-19: esquema da criança até 4 anos 11 meses e 29 dias",
      "Atrasada, até 4 anos 11 meses e 29 dias: ainda recebe VIP, pneumocócica (dose única de VPC 20 se nunca vacinou), meningocócica ACWY (dose única), hepatite A e BCG",
      "Atrasada, até 6 anos 11 meses e 29 dias: penta para completar as 3 doses (60 dias entre elas), DTP para os reforços (6 meses entre eles) e varicela (3 meses entre as doses)",
      "A partir de 7 anos: dT (3 doses com 60 dias se o esquema estiver incompleto) e hepatite B monovalente (0, 1 e 6 meses) — penta e DTP são contraindicadas",
      "Tríplice viral: quem não tem 2 doses comprovadas completa, com 30 dias entre elas",
      "Febre amarela: só 1 dose antes dos 5 anos → 1 dose de reforço; 1 dose a partir dos 5 anos → esquema completo",
      "Vítima de abuso sexual de 2 a 8 anos: 1 dose de HPV (não conta para o esquema; repetir aos 9 anos)",
      { t: "Esquema atrasado se completa, não se reinicia", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" }
    ]
  },

  exames: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Hemograma não é rotina. Pedir na criança de risco acima de 24 meses — dieta pobre em ferro (vegetariana, excesso de leite, pouca fruta e verdura), infecções ou sangramentos frequentes, cardiopatia cianótica, anti-inflamatório ou corticoide oral prolongado, pobreza — e repetir todo ano até os 5 anos nesse grupo",
      "Perfil lipídico a partir dos 2 anos, a cada 3 a 5 anos, só se pais ou avós tiveram doença cardiovascular precoce (homem antes dos 55, mulher antes dos 65) ou se os pais têm colesterol total acima de 240",
      "Lipídios da criança por percentil de idade e sexo: anormal acima do percentil 95, limítrofe entre 90 e 95",
      "EAS e parasitológico não são rotina; o parasitológico pode ser feito em área de alta prevalência de parasitose",
      { t: "M-CHAT-R até os 30 meses (consulta dos 2 anos), se ainda não foi aplicado", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" }
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Vitamina A em megadose até os 59 meses (4 anos e 11 meses) em área do programa — o Nordeste está entre elas (como o CAB nº 33 descreve; o caderno de 2025 não foi conferido); conferir a última dose na caderneta",
      "Polivitamínico ou estimulante de apetite: não prescrever — corrigir a alimentação",
      "Flúor: o método é o creme dental fluoretado; sem suplementação onde a água é fluoretada; cárie ativa → verniz ou gel pela equipe de saúde bucal",
      { t: "Anemia confirmada: esquema e dose de ferro de tratamento a conferir no protocolo vigente — o CAB 33 é de 2012 e o caderno de suplementação de 2025 não foi conferido", v: true }
    ]
  },

  conduta: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      "Magreza ou peso baixo acima de 2 anos: investigar alimentação, infecções, cuidado, afeto e higiene; tratar intercorrências; Nasf; serviço social se preciso; retorno em no máximo 15 dias",
      "Sobrepeso ou obesidade: rever a alimentação da família, o tempo de tela e a atividade física; avaliação clínica; Nasf",
      "Alimentação de 2 a 6 anos: 5 ou 6 refeições em horário regular, porções pequenas respeitando a aceitação, não trocar almoço e jantar por leite, doce nunca como prêmio ou castigo, mesa sem TV",
      "De 7 a 10 anos: comida da família, fruta, verdura e legume todo dia; levar fruta ou lanche salgado para a escola; atenção ao que se vende perto da escola",
      "Atividade física de 30 a 60 minutos por dia, de 3 a 5 vezes por semana; tela e outras atividades sedentárias até 2 horas por dia",
      "Marco ausente para a idade: orientar estimulação e retorno em 30 dias; atraso estabelecido ou sinais de TEA: referir para avaliação neuropsicomotora e estimulação precoce",
      "Saúde bucal: o adulto põe creme dental com flúor do tamanho de um grão de arroz cru e faz a escovação da noite até os 6 anos; depois, a criança escova e o adulto supervisiona a da noite",
      "Acidentes: 2 a 6 anos — segurar pelo pulso na rua, nada de brincar na garagem, nunca sozinha na água mesmo sabendo nadar, fósforo, álcool, remédio e arma fora do alcance; 6 a 10 anos — capacete na bicicleta, nada de laje sem grade, pipa longe de fios, sem fogueira nem fogos",
      { t: "Transporte: banco de trás, com cadeirinha e depois assento de elevação; idade e altura da troca a conferir na lei de trânsito vigente (o CAB 33 traz a regra de 2012)", v: true },
      "Violência ou negligência: acolher, registrar, notificar e comunicar ao Conselho Tutelar (suspeita ou confirmação); acionar a rede (CRAS, CREAS, escola) e manter o acompanhamento"
    ]
  },

  erros: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    itens: [
      { t: "Aplicar penta ou DTP a partir dos 7 anos — contraindicadas; usar dT e hepatite B monovalente", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Reiniciar o esquema vacinal atrasado — completa-se o que falta", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      { t: "Deixar a HPV para depois — a dose única é aos 9 anos, para meninas e meninos", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      "Pedir hemograma, EAS, parasitológico e perfil lipídico de rotina na criança saudável",
      "Fechar obesidade ou desnutrição pelo peso para a idade — o diagnóstico é pelo IMC para a idade e pela altura para a idade",
      "Usar doce como prêmio ou castigo, ou deixar o leite substituir o almoço e o jantar",
      "Deixar a criança menor de 3 anos usar creme dental com flúor à vontade ou engolir a pasta (fluorose)",
      { t: "Esperar a criança falar quando quiser — sem frases ou com fala ininteligível aos 3 anos é sinal de alerta", f: "MS — Desenvolvimento neuropsicomotor, sinais de alerta e estimulação precoce, 2023" },
      "Olhar só o desenvolvimento motor — os atrasos de linguagem e de relação são os que passam despercebidos",
      "Esperar confirmar a violência para notificar — a suspeita já obriga"
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 33, Saúde da Criança: Crescimento e Desenvolvimento, 2012",
    farmacos: [
      { id: "vitamina-a", papel: "megadose até 59 meses (4 anos e 11 meses) pelo Programa Nacional de Suplementação de Vitamina A (o Nordeste é área do programa, pelo CAB nº 33; caderno de 2025 não conferido) — esquema e dose a conferir no cartão" }
    ],
    combos: [], proibidos: [], dosemuda: []
  },

  scores: ["nota-conferencia", "antropo-infantil", "dose-peso"]
});

QUEIXAS.push({
  id: "adolescente",
  nome: "Adolescente (10 a 19 anos)",
  kw: "adolescente adolescencia jovem consulta sigilo confidencialidade sozinho puberdade tanner crescimento imc vacina hpv meningo acwy dt dengue sexualidade contracepcao anticoncepcao de emergencia gravidez teste rapido ist suicidio autolesao depressao drogas alcool violencia sexual estupro de vulneravel anorexia ginecomastia",
  tag: "Programa",
  mod: "aps",
  tema: "T4-Crianca-Adolescente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Ideia de morte, plano ou tentativa de suicídio: perguntar diretamente, mesmo sem cara de depressão — mais da metade dos que morreram por suicídio já tinha tentado antes",
      { t: "Com risco de suicídio, restringir o acesso ao meio letal (arma de fogo, remédios em casa) é obrigatório, não sugestão", f: "medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)" },
      { t: "Violência sexual: PEP em até 72 horas, anticoncepção de emergência, testagem rápida e vacinas — atendimento imediato e obrigatório (Lei do Minuto Seguinte)", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      { t: "Gravidez ou relação sexual em menor de 14 anos: estupro de vulnerável, independentemente de consentimento — notificar, proteger e oferecer a interrupção legal da gestação", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Indícios de violência: contusão, queimadura ou fratura mal explicadas, roupa rasgada ou com sangue, medo de ficar em casa, mudança súbita de comportamento, regressão, autodepreciação",
      "Uso de droga de alto risco (frequente, injetável, sexo em troca de dinheiro): descartar HIV e hepatites B e C e referir ao Nasf ou ao CAPS AD",
      "Recusa em manter o peso, medo intenso de engordar, distorção da imagem corporal e amenorreia: anorexia — avaliar risco de vida pela desnutrição",
      "Febre, calafrio, sangramento, dor no baixo ventre ou secreção após tentativa de interromper a gravidez: urgência",
      "Fuga de casa, abandono da escola, delito, gravidez no início da adolescência, muitos parceiros, uso abusivo de álcool e drogas: marcadores de violência e de vulnerabilidade"
    ]
  },

  perguntas: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Motivo da consulta do adolescente E do responsável — podem ser diferentes",
      "Atender o adolescente sozinho (a consulta toda ou uma parte) e o responsável em outro momento",
      "Combinar o sigilo logo no início: o que ele contar não vai para os pais sem a concordância dele, salvo risco à vida ou risco relevante para ele ou para outros",
      "Família: com quem mora, como é a relação, quem é o adulto de referência",
      "Escola e trabalho: estuda? série, rendimento, faltas; trabalha? em quê, quantas horas",
      "Lazer, amigos, esporte, grupo; projeto de vida",
      "Alimentação: pula o café da manhã? come vendo tela? refrigerante e ultraprocessados; induz vômito, usa laxante ou anabolizante?",
      "Álcool, tabaco e outras drogas: qual, quanto, com que frequência, com quem, quando foi a última vez",
      "Sexualidade: tem parceria? já teve relação? idade de início, número de parceiros, preservativo e método, possibilidade de gravidez agora, já sofreu abuso?",
      "Humor e imagem corporal: tristeza, isolamento, insatisfação com o corpo, pensamentos de morte",
      "Menarca, ciclos e cólica na menina; polução noturna e dúvidas sobre o pênis no menino",
      "Vacinas: caderneta ou cartão, dose por dose"
    ]
  },

  exame: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Perguntar se quer um familiar presente; explicar antes o que será feito; o exame pode ser feito em mais de uma consulta",
      "Peso, estatura e IMC para a idade na curva da Caderneta do Adolescente (escore z, OMS 2007) — no mínimo uma vez por ano; com alteração, a cada 2 a 3 meses",
      "Estatura para a idade abaixo de −2 escores z: baixa estatura (80% constitucional ou familiar); abaixo de −3: patológica",
      "IMC para a idade: acima de +1 escore z sobrepeso, acima de +2 obesidade, acima de +3 obesidade grave; abaixo de −2 magreza, abaixo de −3 magreza acentuada",
      "Tanner em toda consulta: o 1º sinal é o broto mamário na menina (8 a 13 anos) e o aumento do volume dos testículos no menino (9 a 14 anos)",
      "Velocidade de crescimento: investigar se abaixo de 4 cm/ano antes da puberdade ou de 6 cm/ano durante a puberdade",
      "Pressão arterial uma vez por ano",
      "Acuidade visual, dentes (cárie, tártaro), pele (acne), coluna (escoliose), mamas; ginecomastia no menino",
      "Exame genital com consentimento e com acompanhante; exame ginecológico nunca é forçado — adiar se preciso",
      "Atraso puberal: menina sem broto mamário depois dos 13 anos ou sem menarca depois dos 16; menino sem nenhum caractere sexual secundário aos 14 anos — referir",
      "Sinais de uso de droga: hálito etílico, rinite persistente, perfuração do septo nasal, marcas de injeção, flebite"
    ]
  },

  naoperder: {
    fonte: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026",
    itens: [
      "HPV4: dose única para meninas e meninos de 9 a 14 anos 11 meses e 29 dias; de 15 a 19 anos sem vacina, resgate com dose única conforme a organização do estado",
      "Meningocócica ACWY: 1 dose aos 11 anos (janela de 11 a 14 anos 11 meses e 29 dias)",
      "dT: reforço aos 14 anos e depois a cada 10 anos (antecipar para 5 anos se exposição a risco de difteria ou tétano); esquema incompleto → 3 doses com 60 dias entre elas",
      "Dengue: de 10 a 14 anos 11 meses e 29 dias, 2 doses com 3 meses; contraindicada em gestante e lactante; depois de dengue, aguardar 6 meses para começar; evitar gravidez por 30 dias; observar pelo menos 15 minutos após a dose (30 se alergia grave prévia)",
      "Hepatite B: sem 3 doses comprovadas → monovalente em 0, 1 e 6 meses, sem reiniciar",
      "Tríplice viral: até 29 anos são 2 doses comprovadas; evitar gravidez por 1 mês após a dose",
      "Febre amarela: só 1 dose antes dos 5 anos → 1 reforço; 1 dose a partir dos 5 anos → esquema completo",
      "HPV em 3 doses (0, 2 e 6 meses): usuário de PrEP de 15 a 45 anos e imunodeprimido (inclusive HIV) de 9 a 45 anos",
      "Vítima de abuso sexual: HPV em 2 doses (0 e 6 meses) dos 9 aos 14 anos e em 3 doses (0, 2 e 6 meses) dos 15 aos 45 anos",
      "Adolescente gestante: dTpa a partir da 20ª semana, vacina VSR a partir da 28ª, influenza e covid-19 — seguir a queixa de pré-natal"
    ]
  },

  ddx: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Baixa estatura constitucional ou familiar × patológica — 80% é constitucional ou familiar; abaixo de −3 escores z é patológica",
      "Ginecomastia puberal × patológica — a puberal é bilateral, firme, móvel e aparece no estirão; antes ou ao fim da maturação sexual, pensar em droga, endocrinopatia, tumor ou doença crônica",
      "Magreza do início do estirão × baixo peso — o adolescente longilíneo no estirão não deve ser rotulado de baixo peso",
      "Excesso de peso antes do estirão × obesidade — o aspecto é comum, desde que não passe de 20% do peso esperado para a altura",
      "Anorexia × depressão e outro transtorno psiquiátrico — fazer o diferencial antes de fechar",
      "Hirsutismo constitucional × doença virilizante, endocrinopatia ou ovários policísticos"
    ]
  },

  exames: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Teste rápido de gravidez na própria USF, com acolhimento e sigilo; o insumo pode ser entregue à adolescente ou à parceria",
      "Junto do teste de gravidez, oferecer testes rápidos de sífilis e HIV",
      "Testes rápidos de HIV e hepatites com aconselhamento; em menor de 18 anos, investigar se houve violação da dignidade sexual",
      "Teste de HIV de 12 a 18 anos: avaliar discernimento e autonomia — com essa capacidade, fazer o teste e contar o resultado a outros segue a vontade do adolescente; de 10 a 12 anos incompletos, testar e entregar o resultado com os pais ou responsáveis",
      "HIV positivo: a confidencialidade deve ser avaliada frente ao risco de não fazer ou de abandonar o tratamento",
      "Teste de gravidez negativo com relação desprotegida recente: avaliar anticoncepção de emergência e repetir o teste na dúvida — pode dar falso negativo no início",
      { t: "Citopatológico ou DNA-HPV antes dos 25 anos: não rastrear", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" }
    ]
  },

  farmaco: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Anticoncepção de emergência: até 120 horas após a relação, mais eficaz quanto antes (até 72 horas); indicada em violência sexual, falha do método ou relação sem método",
      "A anticoncepção de emergência é direito da adolescente, inclusive da menor de 14 anos, com prescrição criteriosa; não exige receita médica e o enfermeiro pode dispensar",
      "Não é abortiva nem teratogênica e não é método regular — falha mais que os métodos modernos; encaminhar ao planejamento reprodutivo",
      "Dupla proteção: preservativo (o único que protege de IST) junto com outro método; preservativo de acesso livre, sem exigir documento",
      "Tempo desde a menarca não impede prescrever método; a escolha é feita com a adolescente — ver a queixa de planejamento reprodutivo"
    ]
  },

  conduta: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Atender sozinho se o adolescente preferir — é direito dele, dos 10 aos 19 anos; a família entra em outro momento",
      "Quebrar o sigilo só em risco à vida ou risco relevante para ele ou para outros — violência sexual, ideia de suicídio, homicídio; ele deve saber disso desde o início",
      { t: "Com o responsável: pactuar com o adolescente o que será compartilhado e tranquilizar sem detalhar — não detalhar não é mentir", f: "medicina-wiki/wiki/etica-medica-fatos.md (2026-08-03)" },
      "Sem capacidade para decidir: pais ou responsável assistem a decisão; urgência sem responsável: consentimento presumido, registrado no prontuário",
      "Planejamento reprodutivo garantido, com privacidade, sigilo e consentimento informado, antes mesmo do início da vida sexual",
      "De 10 a 14 anos com vida sexual: investigar se é violência; suspeita ou confirmação → notificar, apoiar e referir à rede de proteção",
      "Teste de gravidez positivo e deseja a gestação: vincular ao pré-natal já; não deseja: orientar direitos, rede de proteção, adoção e os casos de interrupção legal (violência sexual, risco à vida, anencefalia)",
      "Violência: acreditar no relato, registrar com detalhes, notificar (ficha de violência) e comunicar ao Conselho Tutelar (ECA, arts. 13, 18 e 245)",
      "Depressão ou ideia suicida: ouvir, avaliar os fatores individuais, familiares e sociais de risco; interconsulta com a saúde mental (Nasf) ou referência especializada; caso grave → CAPSi",
      "Uso de drogas: profissional de referência com vínculo, redução de danos, família junto; alto risco → Nasf ou CAPS AD",
      "Ginecomastia puberal: tranquilizar e acompanhar — a maioria regride sozinha",
      "Cada consulta é oportunidade: vacina, alimentação, atividade física, saúde bucal, sexo seguro e risco de violência"
    ]
  },

  erros: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Exigir a presença ou a autorização dos pais para atender ou para prescrever contraceptivo",
      "Contar ao responsável o que o adolescente disse, sem a concordância dele, fora das situações de risco",
      "Negar anticoncepção de emergência à menor de 14 anos ou exigir receita",
      { t: "Pedir citopatológico anual na adolescente com vida sexual — o rastreamento começa aos 25 anos (o guia de 2017 ainda traz citologia anual)", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      { t: "Achar que a HPV do SUS é só para meninas ou que exige 2 doses — é dose única para meninas e meninos de 9 a 14 anos", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Oferecer varicela de rotina ao adolescente — a rotina vai até 6 anos 11 meses e 29 dias (exceto indígenas, trabalhador de saúde e bloqueio de surto)", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Não perguntar sobre suicídio por medo de induzir — perguntar não induz", f: "guia-bolso-aps.html" },
      { t: "Tratar como consentida a relação sexual de menor de 14 anos", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Desacreditar ou minimizar o relato de violência",
      "Forçar o exame ginecológico",
      "Reiniciar o esquema vacinal atrasado — completa-se o que falta"
    ]
  },

  formulario: {
    fonte: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026",
    farmacos: [
      { id: "levonorgestrel", papel: "anticoncepção de emergência — direito da adolescente, inclusive menor de 14 anos (prescrição criteriosa), sem receita médica; até 120 horas após a relação, quanto antes melhor; na menor de 14 anos, notificar (estupro de vulnerável)" }
    ],
    combos: [], proibidos: [], dosemuda: []
  },

  scores: ["nota-conferencia", "antropo-infantil"]
});

/* Agente gestante (onda APS I, 26/10/2026) — consulta de pré-natal de baixo risco na USF.
 * Base: Caderneta Brasileira da Gestante 2026 (nova caderneta nacional, 1ª ed., 2026; vale sobre
 * o CAB 32 onde divergem), CAB nº 32 (2012, ainda o guia nacional de pré-natal), Protocolo AB Saúde das
 * Mulheres 2016, Calendário Nacional de Vacinação 2026, PCDT TV 2020, NT 14/2023 e Manual de
 * Gestação de Alto Risco 2022. Páginas de cada item no gestante.notas.md. Glicemia escrita
 * sem a unidade colada ao número (o lint lê "número + mg" como dose): os valores são em mg/dL. */
QUEIXAS.push({
  id: "prenatal-baixo-risco",
  nome: "Pré-natal de baixo risco",
  kw: "prenatal pre natal gestante gravida gravidez gestacao obstetricia dum dpp idade gestacional trimestre altura uterina bcf vacina dtpa vsr hepatite b sifilis hiv toxoplasmose totg dmg diabetes gestacional pre-eclampsia aas calcio ferro acido folico alto risco plano de parto maternidade",
  tag: "Programa",
  mod: "aps",
  tema: "T5-Mulher-Gestante",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Caderneta Brasileira da Gestante, 2026",
    itens: [
      { t: "PA de 160 × 110 mmHg ou mais — urgência: maternidade agora, não reagendar", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      "PA de 140 × 90 mmHg ou mais com proteinúria, ou com cefaleia, escotomas, epigastralgia ou reflexos tendíneos aumentados — suspeita de pré-eclâmpsia: urgência na maternidade",
      "Sangramento vaginal em qualquer idade gestacional — avaliação médica imediata; nunca toque antes do exame especular",
      "Perda de líquido pela vagina, ou contrações regulares antes de 37 semanas — amniorrexe ou trabalho de parto prematuro: maternidade",
      "Diminuição dos movimentos fetais — pode ser sofrimento fetal: BCF e avaliação médica no mesmo dia",
      "Febre de 37,8 °C ou mais sem quadro de via aérea superior — pielonefrite, infecção ovular ou outra infecção: urgência",
      { t: "Convulsão — eclâmpsia até prova em contrário: SAMU 192", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      "Dor, edema e sinais flogísticos em uma perna só — suspeita de trombose venosa profunda: urgência",
      { t: "Dor forte no peito, falta de ar, desmaio ou mal-estar intenso", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      "41 semanas confirmadas sem trabalho de parto — encaminhar à maternidade",
      { t: "Dor abdominal forte ou persistente — abdome agudo, descolamento de placenta: urgência", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      "Vômitos incoercíveis que não respondem ao tratamento, com comprometimento sistêmico, antes de 20 semanas; vômitos inexplicáveis no 3º trimestre; prurido ou icterícia — urgência obstétrica",
      "USG com restrição de crescimento, oligodrâmnio ou óbito fetal — urgência obstétrica, não ambulatório",
      { t: "Hemoglobina abaixo de 8 g/dL — anemia grave: o CAB 32 a lista entre os motivos de urgência obstétrica e de alto risco", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Pensamento de se machucar, desespero ou sensação de que a vida não vale a pena — avaliar o risco na hora", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  perguntas: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      { t: "1ª consulta — DUM (1º dia da última menstruação), se é certa, se os ciclos são regulares e se usava anticoncepcional hormonal: decide se a IG sai da DUM ou da USG", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      "1ª consulta — a gravidez é desejada ou planejada? Se não desejada, acolher e avaliar o risco de abortamento inseguro",
      "1ª consulta — gestações anteriores: partos (termo, pré-termo, via, intervalo), abortos e perdas fetais, pré-eclâmpsia ou eclâmpsia, diabetes gestacional, isoimunização Rh, RN com baixo peso, icterícia ou óbito neonatal",
      "1ª consulta — doenças prévias: hipertensão, diabetes, cardiopatia, doença renal, tireoide, epilepsia, transtorno mental, doença falciforme, trombose, HIV, sífilis, hepatites, tuberculose, hanseníase",
      "1ª consulta — medicamentos de uso contínuo ou eventual, inclusive fitoterápicos e chás; alergias; cirurgias (uterina, de mama, bariátrica); tabaco, álcool e outras drogas",
      { t: "1ª consulta — cartão de vacina em mãos: dT/dTpa, hepatite B, influenza, covid-19 e tríplice viral", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      "1ª consulta — quem mora com ela, parceiro e família, trabalho, moradia, renda, programa de transferência de renda e história de violência",
      "Toda consulta — sangramento, perda de líquido, contrações, cefaleia, escotomas, epigastralgia, edema, febre, queixas urinárias e corrimento",
      { t: "Toda consulta, depois de 20 semanas — o bebê mexe como antes? Orientar: mais de 4 horas sem mexer é motivo para procurar atendimento", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Toda consulta — humor, ansiedade, sono, vontade de se machucar; medicação psiquiátrica não se suspende por conta própria", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Toda consulta — calendário de vacinas em dia e adesão ao ferro e ao ácido fólico", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "3º trimestre — sabe qual é a maternidade de referência? Escolheu o acompanhante? Conversou o plano de parto?", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  exame: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      { t: "PA em toda consulta, sentada, depois de 5 minutos de repouso, com manguito adequado ao braço", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Pressão alta na gestação: 140 × 90 mmHg ou mais, em duas medidas; 160 × 110 ou mais é urgência", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Peso em toda consulta; IMC pré-gestacional na 1ª — baixo peso abaixo de 18,5; adequado de 18,5 a menos de 25; sobrepeso de 25 a menos de 30; obesidade 30 ou mais — e o ganho no gráfico da Caderneta", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      "Altura uterina em toda consulta depois de 12 semanas: fita inelástica da borda superior da sínfise ao fundo; deve ficar entre os percentis 10 e 90 da curva",
      "AU fora da faixa na 1ª medida: repetir em 15 dias. Persistente com a mesma inclinação sugere erro de IG (avaliação médica, USG); inclinação diferente vai ao alto risco",
      "Sem DUM, IG pelo útero: 12 semanas palpável na sínfise; 16 entre a sínfise e o umbigo; 20 na cicatriz umbilical; de 20 a 30 semanas, a AU em cm acompanha a IG em semanas",
      "BCF em toda consulta: sonar a partir de 10 a 12 semanas, Pinard a partir de 20; contar 1 minuto, esperado de 110 a 160 bpm",
      "BCF inaudível no Pinard depois de 24 semanas, ou alteração persistente da frequência — médico ou maternidade",
      "Edema: inspecionar face e mãos; palpar região sacra e pré-tibial, sem meias",
      "Por volta de 36 semanas, apresentação fetal (manobras de Leopold): pélvica ou transversa no fim da gestação vai à maternidade de referência",
      { t: "1ª consulta — exame geral: mucosas, tireoide, mamas, ausculta cardíaca e pulmonar, abdome e membros inferiores", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      "Rastreamento do colo pendente: colher na gestação; a técnica não muda e não há restrição de idade gestacional",
      "Encaminhar toda gestante para avaliação odontológica, pelo menos uma vez"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Transmissão Vertical do HIV, Sífilis e Hepatites Virais, Portaria SCTIE nº 55, 2020",
    itens: [
      "Teste rápido de sífilis reagente na gestante: tratar no mesmo dia com penicilina benzatina, sem esperar o VDRL, e colher o teste não treponêmico",
      "Parceria sexual da gestante com sífilis: testar e tratar — é o que interrompe a cadeia de transmissão",
      { t: "Sífilis tardia ou de duração ignorada na gestante: 3 doses com intervalo ideal de 7 dias, no máximo 9; dose perdida ou intervalo maior que 9 dias reinicia o esquema", f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
      { t: "Tratamento adequado da sífilis na gestação: penicilina benzatina, completo para o estágio, iniciado o mais cedo possível — de preferência até a 28ª semana e no máximo até 30 dias antes do parto — e concluído antes do parto; outro fármaco conta como inadequado e o RN é notificado como sífilis congênita", f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
      { t: "Toxoplasmose: IgM reagente, com IgG reagente ou não, é infecção aguda até prova em contrário → espiramicina no mesmo dia e encaminhar ao pré-natal de alto risco (USG seriada, investigação fetal, esquema tríplice). IgG− IgM+: nova sorologia em 2 a 3 semanas — IgG ainda negativa é falso positivo, suspender. IgG+ IgM+ até 16 semanas: avidez na mesma amostra — alta avidez é infecção anterior à gestação, suspender; depois de 16 semanas a avidez não muda a conduta. IgG+ IgM−: imune, não repetir. IgG− IgM−: prevenção primária e repetir a sorologia", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "HIV reagente: aconselhamento e encaminhamento ao serviço especializado; mãe com HIV ou HTLV não amamenta", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Bacteriúria assintomática (urocultura com mais de 100 mil colônias por mL) se trata na gestação, mesmo sem sintoma — o sedimento costuma ser normal", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Rh negativo com Coombs indireto negativo: imunoglobulina anti-D na 28ª semana, até 72 horas após o parto de RN Rh positivo ou de Rh desconhecido e até 72 horas após sangramento, aborto ou procedimento", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Violência doméstica: perguntar; havendo, notificar e acionar a rede — vale para pré-natal, parto, abortamento e puerpério", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Faltou à consulta: busca ativa, visita do ACS e nova data — não existe alta do pré-natal", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Encaminhada ao alto risco continua vinculada à USF: consultas, visita domiciliar e contrarreferência", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      "Descolamento prematuro de placenta × placenta prévia — DPP: dor súbita, sangue vermelho-escuro, útero hipertônico e doloroso, BCF alterado, ligado a hipertensão ou a cocaína e crack; prévia: sangramento indolor, vermelho vivo, útero de tônus normal, BCF mantido — sem toque vaginal",
      { t: "Hipertensão crônica × gestacional × pré-eclâmpsia — antes de 20 semanas é crônica; depois de 20, sem proteinúria e sem sinal de gravidade, é gestacional; depois de 20 com proteinúria, OU sem proteinúria mas com disfunção de órgão, sintoma de iminência de eclâmpsia ou restrição de crescimento, é pré-eclâmpsia", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "DM prévio × diabetes gestacional — jejum de 126 ou mais, ou 2 h do TOTG de 200 ou mais, é diabetes diagnosticado na gestação; jejum de 92 a 125 é DMG (valores em mg/dL)", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Pródromos × fase ativa — pródromos: contrações irregulares, curtas, sem ritmo, por horas ou dias; fase ativa: regulares a cada 2 a 3 minutos, durando mais de 30 segundos — hora de ir à maternidade", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Edema postural × pré-eclâmpsia × TVP — só no tornozelo é postural; generalizado (face, membros, sacro) ou ao acordar sugere pré-eclâmpsia; unilateral com dor e sinais flogísticos sugere TVP", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Sangramento na 1ª metade da gestação — abortamento, gravidez ectópica, mola e lesões do colo (cervicite, pólipo, laceração): o exame especular faz parte do diagnóstico"
    ]
  },

  exames: {
    fonte: "MS — Caderneta Brasileira da Gestante, 2026",
    itens: [
      "1ª consulta ou 1º trimestre — hemograma; tipagem ABO e Rh (Coombs indireto se Rh negativo); eletroforese de hemoglobina; glicemia de jejum (TOTG 75 g direto se a 1ª consulta é depois de 24 semanas); urina tipo I e urocultura com antibiograma",
      "1ª consulta — testes rápidos de sífilis, HIV, hepatite B e hepatite C (ou VDRL/RPR, anti-HIV, HBsAg e anti-HCV); toxoplasmose IgG e IgM; HTLV",
      "1º trimestre — ultrassonografia obstétrica, idealmente entre 7 e 12 semanas",
      "Chagas (teste rápido e IgG) se houver suspeita; malária (gota espessa ou teste rápido) em região endêmica",
      "2º trimestre — TOTG 75 g, de preferência entre 24 e 28 semanas; Coombs indireto se Rh negativo e negativo antes; toxoplasmose se suscetível",
      { t: "Diabetes gestacional, rastreio universal (valores em mg/dL): jejum da 1ª consulta de 92 a 125 já é DMG e de 126 ou mais é DM prévio; abaixo de 92, TOTG entre 24 e 28 semanas — DMG com jejum de 92 ou mais, 1 h de 180 ou mais ou 2 h de 153 ou mais; um valor basta", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Sem TOTG disponível: repetir a glicemia de jejum entre 24 e 28 semanas, com os mesmos cortes", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      "3º trimestre — hemograma; glicemia de jejum; Coombs indireto se Rh negativo; teste rápido de sífilis e de HIV; toxoplasmose se suscetível; urina tipo I e urocultura",
      "No parto ou no pós-parto imediato — teste rápido de HIV e de sífilis; hepatite B e C se não feitos no pré-natal",
      "Por indicação clínica — TSH, proteinúria (teste rápido), clamídia e gonorreia, citopatológico ou teste de HPV, parasitológico de fezes, secreção vaginal, teste para tuberculose",
      { t: "Hemoglobina: acima de 11 g/dL normal; de 8 a 11 anemia leve a moderada (trata na USF e repete); abaixo de 8 anemia grave (alto risco)", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Proteinúria no teste rápido (indicado na gestante com hipertensão): 1+ ou mais com PA de 140 × 90 ou mais, ou qualquer sintoma (cefaleia, escotomas, epigastralgia) → urgência na maternidade, suspeita de pré-eclâmpsia; traços com hipertensão ou edema → pré-natal de alto risco, sem esperar repetir. Traços na urina tipo I sem hipertensão: repetir em 15 dias; persistindo, alto risco.", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" }
    ]
  },

  farmaco: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Manual de Gestação de Alto Risco, 2022",
    itens: [
      { t: "Ferro e ácido fólico para toda gestante desde a 1ª consulta; o ácido fólico, idealmente, desde antes de engravidar — doses no cartão", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Ferro longe das refeições, de preferência com suco cítrico", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Gosto metálico, náusea, flatulência e constipação afetam a adesão ao ferro: perguntar ativamente", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Anemia (Hb abaixo de 11 g/dL): dose de tratamento, parasitológico e tratamento da parasitose, Hb de novo em 30 a 60 dias; estacionada ou caindo vai ao alto risco", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "AAS e cálcio para prevenir pré-eclâmpsia só com 1 fator de alto risco ou 2 de risco moderado; o AAS começa antes da 16ª semana e vai até 36", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Alto risco para pré-eclâmpsia (basta um): pré-eclâmpsia prévia, gestação múltipla, obesidade com IMC acima de 30, hipertensão crônica, diabetes tipo 1 ou 2, doença renal, doença autoimune (lúpus, síndrome antifosfolípide)", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Risco moderado (precisa de dois): nuliparidade, mãe ou irmã com pré-eclâmpsia, baixo nível socioeconômico, afrodescendente, 35 anos ou mais, baixo peso ao nascer da própria gestante, gestação anterior com desfecho adverso, mais de 10 anos desde a última gestação", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Sífilis: a benzilpenicilina benzatina é a única opção segura e eficaz para o tratamento adequado na gestação", f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
      { t: "Suspeita de alergia à penicilina: anamnese criteriosa — a maioria das suspeitas se descarta só com ela; a gestante comprovadamente alérgica é dessensibilizada em ambiente hospitalar", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022" },
      { t: "Toxoplasmose aguda: espiramicina no mesmo dia e encaminhamento ao alto risco; o esquema tríplice é decisão do serviço de referência — dose no cartão", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "IECA e BRA (captopril, enalapril, losartana) não se usam na gestação, pelo risco de anormalidades fetais: substituir ao confirmar a gravidez", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Psicofármaco, anticonvulsivante ou outro uso contínuo: não suspender por conta própria; decidir risco e benefício com a gestante", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  formulario: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Manual de Gestação de Alto Risco, 2022 · MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023",
    farmacos: [
      { id: "sulfato-ferroso", papel: "toda gestante, do diagnóstico da gravidez ao terceiro mês pós-parto; dose de tratamento se Hb abaixo de 11 g/dL" },
      { id: "acido-folico", papel: "toda gestante e quem planeja engravidar — prevenção de DTN; dose alta com antecedente de DTN, epilepsia em anticonvulsivante, diabetes, trombofilia ou pós-bariátrica" },
      { id: "acido-acetilsalicilico", papel: "prevenção de pré-eclâmpsia só com 1 fator de alto risco ou 2 de risco moderado; começar antes da 16ª semana" },
      { id: "carbonato-de-calcio", papel: "prevenção de pré-eclâmpsia junto com o AAS, na mesma população, até o parto" },
      { id: "penicilina-benzatina", outra: true, papel: "sífilis na gestante e na parceria: a única que trata o feto; aplicar no dia do teste rápido reagente" },
      { id: "espiramicina", outra: true, papel: "toxoplasmose aguda na gestante (IgM reagente): iniciar no mesmo dia e encaminhar ao pré-natal de alto risco" }
    ],
    combos: ["ges-aas-calcio-pe"],
    proibidos: ["ges-ieca-bra-gestacao", "per-valproato-gestante"],
    dosemuda: ["ges-ferro-prevencao-tratamento", "ist-benzatina-estagio"]
  },

  conduta: {
    fonte: "MS — Caderneta Brasileira da Gestante, 2026 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      { t: "Começar até a 12ª semana. Mínimo de 7 consultas, intercaladas entre médico e enfermeiro, mais 1 odontológica: mensais até 28 semanas, quinzenais de 28 a 36, semanais a partir de 36. O CAB 32 dizia 6 — vale a Caderneta 2026. Não existe alta do pré-natal", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "1ª consulta: testes rápidos de HIV e sífilis no ato, cadastro no sistema, Caderneta preenchida, exames pedidos, ferro e ácido fólico prescritos e risco gestacional avaliado", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "IG pela DUM (dias desde a DUM divididos por 7, ou gestograma); DPP pela regra de Näegele: DUM + 7 dias e − 3 meses, OU + 9 meses se a DUM foi de janeiro a março — usar a calculadora DPP", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "DUM desconhecida: estimar pelo útero e pedir USG o quanto antes. DUM e 1ª USG discordando além do esperado: vale a USG, e a IG não se recalcula depois", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "PA entre 140 × 90 e 160 × 110, sem sintoma e sem ganho de peso acima de 500 g por semana: proteinúria no ato, consulta médica imediata, USG e referência ao alto risco", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Risco gestacional: classificar na 1ª consulta e rever em toda consulta; encaminhar ao alto risco é compartilhar o cuidado, não dar alta da USF", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Vai ao pré-natal de alto risco (condição prévia): hipertensão crônica ou uso de anti-hipertensivo, diabetes, cardiopatia, nefropatia grave, tireoidopatia, doença falciforme ou talassemia, epilepsia, doença autoimune, TVP ou TEP prévios, HIV, hepatites, tuberculose, hanseníase, transtorno psiquiátrico que precisa de acompanhamento, dependência de drogas", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Vai ao pré-natal de alto risco (história ou gestação atual): óbito fetal ou perinatal prévio, doença hipertensiva prévia com mau desfecho (eclâmpsia, HELLP), abortamento habitual, gemelaridade, polidrâmnio, DMG, proteinúria, anemia grave ou sem resposta a 30 a 60 dias de ferro, ITU de repetição ou 2 pielonefrites, isoimunização Rh, malformação fetal", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Fica no pré-natal da USF, com atenção redobrada: idade abaixo de 15 ou acima de 35 anos, altura abaixo de 1,45 m, IMC fora do adequado, baixa escolaridade, intervalo entre partos menor que 2 ou maior que 5 anos, nuliparidade ou 5 partos ou mais, ITU, anemia", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Vacinas já na 1ª consulta, em qualquer idade gestacional: hepatite B (iniciar ou completar 3 doses), influenza (1 dose por temporada) e covid-19 (1 dose por gestação, 6 meses depois da última)", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Também na 1ª consulta: dT se o esquema de tétano está incompleto — sem histórico, 2 doses de dT + 1 de dTpa a partir de 20 semanas, com 60 dias entre as doses; com 1 dose anterior, 1 dT + 1 dTpa; chegando com 20 semanas ou mais, dTpa primeiro e dT em sequência", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "A partir de 20 semanas: dTpa, 1 dose em toda gestação, mesmo vacinada antes. A partir de 28 semanas: vacina VSR, dose única por gestação", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Vínculo com a maternidade: informar a maternidade de referência e orientar a visita antes do parto (Lei 11.634/2007); direito a acompanhante de livre escolha no trabalho de parto, parto e pós-parto (Lei 11.108/2005)", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "3º trimestre — plano de parto: acompanhante e doula, posições, alívio da dor, procedimentos que aceita ou não (episiotomia, toques repetidos), cuidados com o bebê, contracepção logo após o parto", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Ir à maternidade: contrações regulares a cada 2 a 3 minutos, perda de líquido (verde ou amarelo pode ser mecônio), sangramento, ou bebê mexendo menos", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  erros: {
    fonte: "MS — PCDT Transmissão Vertical do HIV, Sífilis e Hepatites Virais, Portaria SCTIE nº 55, 2020",
    itens: [
      "Esperar o VDRL para tratar a gestante com teste rápido de sífilis reagente, ou tratar só ela e esquecer a parceria",
      { t: "Pedir TOTG só para quem tem fator de risco — o rastreio de diabetes gestacional é universal", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Diagnosticar DMG pelos cortes antigos do CAB 32 (jejum acima de 110, 2 h acima de 140) em vez de 92, 180 e 153", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Prescrever a dose alta de ácido fólico a toda gestante por hábito — ou a dose baixa à epiléptica em anticonvulsivante, à diabética, à com SAF ou à que já teve filho com DTN", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Manter só a dose de prevenção de ferro na gestante já anêmica", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Encaminhar por hipertensão com uma medida isolada — ou mandar para casa a gestante com PA elevada e proteinúria em vez da urgência", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Fazer toque vaginal antes do especular na gestante que sangra", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Recalcular a idade gestacional a cada nova ultrassonografia — a datação vale pela primeira", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Deixar a dTpa para depois do parto na gestante que já passou de 20 semanas", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Aplicar tríplice viral, varicela ou HPV na gestante — ficam para o pós-parto", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Começar AAS em gestante sem fator de risco, ou já no 3º trimestre", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Dar alta da USF à gestante encaminhada ao pré-natal de alto risco", f: "MS — Manual de Gestação de Alto Risco, 2022" }
    ]
  },

  scores: ["dpp", "imc", "nota-conferencia"]
});

/* Agente gestante (onda APS I, 26/10/2026) — consulta puerperal na USF (primeira semana
 * e até 42 dias): mãe e recém-nascido. Base: Caderneta Brasileira da Gestante 2026 (vale
 * sobre o CAB 32 onde divergem), CAB nº 32 (capítulo 9, pós-parto), Protocolo AB Saúde das
 * Mulheres 2016 (puerpério e aleitamento), Calendário Nacional de Vacinação 2026 e Manual de
 * Gestação de Alto Risco 2022. Psicofármaco na gestação e na amamentação em detalhe: queixa
 * "perinatal" do módulo Psiquiatria. Páginas de cada item no gestante.notas.md. */
QUEIXAS.push({
  id: "puerperio",
  nome: "Puerpério — consulta puerperal",
  kw: "puerperio pos-parto puerpera resguardo revisao puerperal loquios sangramento amamentacao aleitamento mastite fissura ingurgitamento depressao pos-parto blues psicose puerperal contracepcao lam diu implante vacina recem-nascido rn",
  tag: "Programa",
  mod: "aps",
  tema: "T5-Mulher-Gestante",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — Caderneta Brasileira da Gestante, 2026 · MS — Manual de Gestação de Alto Risco, 2022 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Sangramento que encharca o absorvente rapidamente, ou sangramento com mau cheiro — avaliação imediata",
      "Febre de 37,8 °C ou mais — procurar o foco: útero, ferida operatória, períneo, mama, urina",
      "Dor forte e persistente no abdome ou na pelve, ou corrimento com mau cheiro — infecção puerperal (endometrite)",
      "PA de 160 × 110 ou mais, ou PA de 140 × 90 ou mais com cefaleia, alteração visual ou dor epigástrica, ou convulsão — pré-eclâmpsia ou eclâmpsia pós-parto: urgência; a PA pode piorar do 3º ao 6º dia após o parto",
      "Edema súbito de rosto, mãos ou pernas",
      "Dor no peito, falta de ar, palpitação ou desmaio; dor, calor ou inchaço em uma panturrilha",
      { t: "Confusão mental, alucinação, delírio, agitação ou pensamento de machucar o bebê, de início abrupto nas 2 a 3 primeiras semanas — psicose puerperal: emergência", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      { t: "Risco de suicídio ou de infanticídio: internação, de preferência em hospital geral; a USF segue coordenando o cuidado", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
      "Tristeza intensa, desesperança, pensamento de se machucar, ou dificuldade para cuidar de si ou do bebê — avaliar agora",
      { t: "Mama vermelha, quente e dolorosa com febre, sem melhora em 48 horas de tratamento, ou com área de flutuação — abscesso: drenagem", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Ferida da cesárea ou do períneo com vermelhidão, inchaço, secreção, mau cheiro ou dor forte que não melhora",
      "Urina muito diminuída, ou dor para urinar com febre",
      "RN com dificuldade para mamar, respiração rápida ou com esforço, febre ou temperatura baixa, pele muito amarela, sonolência excessiva ou choro inconsolável — avaliação no mesmo dia"
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      "Data e tipo de parto (se cesárea, por qual indicação) e intercorrências na gestação, no parto e no pós-parto: hemorragia, febre, hipertensão, diabetes, convulsão, sensibilização Rh",
      { t: "Cartão da gestante: sífilis e HIV testados no pré-natal e no parto? Se Rh negativo, recebeu imunoglobulina anti-D?", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Medicamentos em uso: ferro, ácido fólico, anti-hipertensivo, insulina, psicofármaco, outros",
      "Sangramento (quantidade, cor, cheiro), dor, febre, queixa urinária, evacuação",
      "Amamentação: mamadas de dia e de noite, dor, fissura, mama cheia ou endurecida, bebê satisfeito com as mamadas",
      "Humor, sono, apetite e prazer, e o que sente em relação ao bebê — consegue dormir quando o bebê dorme?",
      "Pensamento de machucar o bebê: perguntar diretamente — a mulher costuma não contar se não for perguntada",
      "Depressão antes da gravidez ou depois de outro parto, transtorno bipolar ou psicose — maiores fatores de risco de depressão e de psicose puerperal",
      "Planejamento reprodutivo: quer mais filhos e quando; método que já usou ou prefere; saiu da maternidade com algum método?",
      "Rede de apoio: quem ajuda em casa e com os outros filhos; condições para as necessidades básicas",
      { t: "Violência em casa e consentimento nas relações sexuais", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Retomou a relação sexual? Dor, secura vaginal, medo de engravidar?", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      "PA, pulso, frequência respiratória e temperatura",
      "Estado geral, pele e mucosas (palidez) e edema",
      "Mamas: ingurgitamento, fissura, sinais inflamatórios ou infecciosos; observar uma mamada inteira — posição e pega",
      "Abdome: útero (involução, dor à palpação) e cicatriz da cesárea",
      { t: "Períneo e genitais: lóquios (quantidade, cor, cheiro) e cicatriz de laceração ou episiotomia — o fio é absorvível, não há ponto a retirar", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Membros inferiores: edema assimétrico, dor em panturrilha",
      "Estado psíquico e vínculo: como olha, segura e acalma o bebê",
      "RN: peso, coto umbilical, pele (icterícia, palidez, cianose), hidratação, mamada; Caderneta da Criança com teste do pezinho, BCG e hepatite B",
      { t: "Cesárea: retirar os pontos entre 7 e 10 dias após o parto, conforme orientação médica", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" }
    ]
  },

  naoperder: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      { t: "Teve pré-eclâmpsia ou hipertensão: medir a PA a cada contato — crise hipertensiva e eclâmpsia puerperal acontecem", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      "Mãe com HIV ou HTLV: não amamenta; inibir a lactação; amamentação cruzada é contraindicada",
      "RN de risco (peso abaixo de 2.500 g, internação por intercorrência após o nascimento, morte de criança menor de 5 anos na família, mãe com HIV, morte ou malformação por sífilis congênita na família): visita domiciliar nos primeiros 3 dias após a alta e avaliação médica",
      { t: "Rh negativo com RN Rh positivo ou de Rh desconhecido: imunoglobulina anti-D até 72 horas após o parto — conferir se foi feita", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      "Depressão pós-parto anterior: risco de nova depressão pós-parto de 50%; qualquer depressão prévia: 25% — perguntar em toda revisão",
      { t: "Fez pré-natal de alto risco: retorna também ao serviço especializado", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Vitamina A: o CAB 32 (2012) prevê megadose à puérpera na maternidade no Nordeste; a vigência dessa conduta em 2026 não foi conferida (manual de micronutrientes 2025 não lido)", v: true }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      "Blues puerperal — começa no 3º ao 4º dia; choro, labilidade, irritabilidade, ansiedade com o bebê; remite sozinho em uma semana a 10 dias; não é transtorno",
      "Depressão pós-parto — início insidioso na 2ª a 3ª semana; tristeza, desalento, culpa, insônia, ideias suicidas; sintomas na maior parte do dia por 2 semanas ou mais; aceita-se início até 1 ano após o parto",
      "Psicose puerperal — início abrupto nas 2 a 3 primeiras semanas; confusão, alucinações ou delírios, agitação, pensamentos de machucar o bebê; emergência",
      "Pensamento intrusivo de machucar o bebê na depressão (vivido como absurdo, sem intenção) × ideação psicótica — afastar psicose sempre",
      "Disfunção da tireoide no pós-parto pode aparecer como alteração leve do humor",
      "Ingurgitamento × mastite — ingurgitamento: do 3º ao 5º dia, mamas doloridas, edemaciadas e brilhantes, cede em 24 a 48 horas; mastite: em geral unilateral, a partir da 2ª semana, inflamatória ou infecciosa",
      { t: "Lóquio esperado × anormal — diminui aos poucos e pode durar cerca de 42 dias; encharcar o absorvente ou ter mau cheiro não é esperado", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Ardência ao urinar dos primeiros dias (irritação, sonda) × infecção urinária — se persiste, piora ou vem com febre, investigar", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  exames: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      "Teste de HIV e de sífilis (VDRL), com aconselhamento, para a puérpera que não foi testada na gestação nem no parto",
      "Teve diabetes gestacional: glicemia de jejum ou TOTG 75 g a partir de 6 semanas após o parto",
      "Rastreio de depressão pós-parto citado pelo CAB 32: EPDS (Edimburgo), 10 perguntas autoaplicáveis; 12 ou 13 pontos ou mais identifica depressão pós-parto. O PHQ-9 do app mede sintomas depressivos e não é a escala do CAB"
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      { t: "Ferro para toda puérpera sem anemia, até o terceiro mês após o parto — dose no cartão", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Puérpera com anemia: as fontes lidas só dão a prevenção 'para mulheres sem anemia' (CAB 32); seguir a lógica da gestante — dose de tratamento até Hb de 11 g/dL, depois a de prevenção até o terceiro mês — e confirmar com a preceptora", v: true },
      "Amamentando: nenhum medicamento sem orientação médica; se o fármaco é de uso criterioso na lactação, trocar o fármaco em vez de suspender a amamentação",
      { t: "Anti-hipertensivo no puerpério: nifedipina, anlodipina, captopril e propranolol estão entre as opções seguras; IECA voltam a ser opção, inclusive na lactação (enalapril e captopril no Quadro 3 do Manual)", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      "Na lactante, o Quadro 19 do CAB 32 classifica captopril, enalapril, metildopa, propranolol, hidralazina, nifedipino, hidroclorotiazida e espironolactona como seguros, e telmisartana, valsartana, fosinopril e ramipril como potencialmente perigosos",
      { t: "Puérpera que teve hipertensão ou pré-eclâmpsia: evitar anti-inflamatório para dor e cuidado com ergotamínico e com cabergolina ou bromocriptina — sobem a PA", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "DMG, hipertensão e outras comorbidades: revisar a medicação e a dose no pós-parto, com atenção às contraindicações da amamentação", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Depressão pós-parto leve a moderada: primeira abordagem psicossocial (psicoterapia, TCC, grupo, família); grave: acrescentar antidepressivo",
      "Na APS o ISRS é a primeira escolha; na lactante a sertralina pode ser preferível à fluoxetina — mas não trocar a fluoxetina que funcionou na gestação",
      "Começou antidepressivo: rever em 2 semanas — o risco de suicídio pode subir no início",
      { t: "Mastite: manter a amamentação e esvaziar a mama; antibiótico oral pelas opções do Quadro 15 do Protocolo AB; analgésico se dor ou febre", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" }
    ]
  },

  formulario: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    farmacos: [
      { id: "sulfato-ferroso", papel: "toda puérpera sem anemia, até o terceiro mês após o parto; anêmica: ver o item VERIFICAR do fármaco" },
      { id: "sertralina", outra: true, papel: "depressão pós-parto que precisa de fármaco, na lactante: o CAB 32 a considera preferível à fluoxetina" },
      { id: "fluoxetina", outra: true, papel: "o ISRS com mais estudos na lactação; metabólito de meia-vida longa — não trocar quem já está bem com ela" }
    ],
    proibidos: ["per-litio-amamentacao"]
  },

  conduta: {
    fonte: "MS — Caderneta Brasileira da Gestante, 2026 · MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      { t: "Mínimo de 2 consultas puerperais: a 1ª na primeira semana após a alta (o passaporte da Caderneta diz até 7 dias após o parto) e a 2ª em torno de 30 dias. O CAB 32 previa a visita na 1ª semana e a consulta até 42 dias — vale a Caderneta 2026", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Visita domiciliar na 1ª semana após a alta; RN de risco, em até 3 dias. Agendar a 1ª consulta já na alta da maternidade", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Amamentação exclusiva até 6 meses, em livre demanda, e continuada até 2 anos ou mais; dor e fissura do início em geral se resolvem com orientação, e ajustar posição e pega faz muita diferença", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Fissura: corrigir a pega; mamilo seco, banho de sol, leite do fim da mamada nas lesões; sem sabão, álcool, pomada ou creme", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Ingurgitamento: ordenha manual antes da mamada, massagem circular, mamadas frequentes sem horário, sutiã firme de alças largas, compressa fria de até 20 minutos entre as mamadas", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Mastite: não suspender; esvaziar a mama (ordenha se o bebê não esvaziar), repouso e líquidos; sem regressão em 48 horas, pensar em abscesso", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Contracepção compatível com a amamentação: preservativo desde já; DIU de cobre até 48 horas ou após 4 a 6 semanas; implante no pós-parto imediato; minipílula ou injetável trimestral de 4 a 6 semanas após o parto (pode ser antecipado se for difícil ela voltar ao serviço); combinado só depois de 6 meses em quem amamenta", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      "LAM só protege com amamentação exclusiva em livre demanda, amenorreia e bebê com menos de 6 meses — perdeu um dos três, associar outro método",
      { t: "Vacinas que faltaram na gestação, até 45 dias pós-parto: dTpa, influenza e hepatite B; covid-19 se não vacinada na gestação; tríplice viral se não imune — amamentar não contraindica", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Febre amarela na lactante de bebê com menos de 6 meses: adiar até o bebê completar 6 meses; se inadiável, suspender a amamentação por 10 dias após a vacina", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      "Blues: acolher, fortalecer a família e rever nos primeiros 10 dias; se não melhora, avaliar depressão pós-parto",
      "Depressão pós-parto: apoio matricial em saúde mental; grave → CAPS; risco de suicídio ou infanticídio → internação. Encaminhar não é transferir: a USF coordena",
      "Psicose, mania, lítio ou psicofármaco na amamentação: abrir também a queixa 'Saúde mental na gestação e no puerpério', no módulo Psiquiatria",
      { t: "Retorno à relação sexual: não há prazo certo, é quando ela quiser, com consentimento e contracepção definida; o CAB 32 falava em cerca de 20 dias — vale a Caderneta 2026", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  erros: {
    fonte: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012",
    itens: [
      { t: "Suspender a amamentação por mastite", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Chamar de blues uma tristeza que já passou de duas semanas",
      "Mandar para casa a puérpera confusa ou alucinando porque é cansaço",
      "Não perguntar sobre pensamentos de machucar o bebê",
      { t: "Prescrever anticoncepcional combinado à lactante antes de 6 meses", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      "Confiar na LAM com a menstruação de volta ou com o bebê já recebendo outro alimento",
      "Suspender a amamentação para usar um fármaco quando há alternativa compatível",
      "Esquecer a glicemia pós-parto de quem teve diabetes gestacional",
      { t: "Deixar de medir a PA da puérpera que teve pré-eclâmpsia ou hipertensão", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      "Liberar a amamentação da mãe com HIV ou HTLV",
      { t: "Vacinar contra febre amarela a lactante de bebê com menos de 6 meses sem adiar e sem suspender a amamentação por 10 dias", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Examinar só o bebê e esquecer a mãe", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Agendar retirada de pontos da episiorrafia — o fio é absorvível", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" }
    ]
  },

  scores: ["phq9", "nota-conferencia"]
});

QUEIXAS.push({
  id: "rastreamento-adulto",
  nome: "Rastreamento no adulto assintomático",
  kw: "rastreamento rastreio check-up checkup exames de rotina preventivo prevencao adulto assintomatico pressao arterial has diabetes glicemia colesterol dislipidemia dna-hpv hpv papanicolau citologia colo do utero mamografia mama psa prostata colorretal sangue oculto tabagismo alcool cage obesidade imc hearts",
  tag: "Programa",
  mod: "aps",
  tema: "TC-Clinica-Prevalente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025 · MS — CAB nº 29, Rastreamento, 2010 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      { t: "Sangramento vaginal anormal ou depois da relação: não é rastreio — investigar câncer de colo já, seja qual for a data do último exame",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 29" },
      { t: "Mama, em qualquer idade: nódulo endurecido e fixo, ou que cresce; descarga papilar sanguinolenta de um lado; retração de pele ou de mamilo, pele em casca de laranja; linfonodo axilar endurecido; eczema de mamilo ou aréola que não melhora com tratamento tópico; mama que aumenta progressivamente, com edema ou vermelhidão; mastite que não melhora com antibiótico; nódulo em homem — referência urgente para diagnóstico, não mamografia de rastreio",
        f: "MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025" },
      { t: "Mudança do hábito intestinal, sangue nas fezes, anemia ou perda de peso sem explicação: investigar câncer colorretal, não é rastreio",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Jato urinário que demora a começar e a terminar, nictúria, ou sangue na urina: avaliação diagnóstica, não conversa de rastreio com PSA",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "PA ≥180/110, ou sinais de lesão de órgão-alvo, na medida de rastreio: o diagnóstico de HAS se fecha na mesma consulta",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 7" },
      { t: "Poliúria, polidipsia ou perda de peso com glicemia ao acaso ≥200: diagnóstico de DM2 agora, não rastreio",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 8" },
      { t: "Rouquidão persistente; dor epigástrica crônica que não melhora, indigestão recente com perda de peso; aumento de um testículo: diagnóstico precoce, não rastreio",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Ferida que não cicatriza em 4 semanas, pinta que muda (assimétrica, borda irregular, várias cores, mais de 6 mm), mancha branca ou vermelha na boca: avaliar e encaminhar",
        f: "MS — CAB nº 29, Rastreamento, 2010" }
    ]
  },

  perguntas: {
    fonte: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · MS — CAB nº 29, Rastreamento, 2010 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      { t: "Tem colo do útero? Se fez histerectomia total, foi por lesão benigna ou por lesão precursora ou câncer?",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 19" },
      { t: "Já teve atividade sexual de algum tipo? Sem nenhuma, não rastreia colo",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 19" },
      { t: "Quando foi o último preventivo ou DNA-HPV, e o resultado? E a última mamografia? Pedir o laudo",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 16" },
      { t: "Vive com HIV, tem DRC ou câncer, ou usa corticoide ou imunossupressor? Muda o rastreio do colo",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 19" },
      { t: "Fuma? Quanto, há quanto tempo, e quer parar?",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Álcool, pelo CAGE: já sentiu que devia parar? As críticas incomodam? Sente culpa? Bebe ao acordar para firmar o pulso?",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Fatores de risco de DM2: parente de 1º grau com diabetes, doença cardiovascular, sedentarismo, HAS, SOP, acantose, diabetes gestacional ou bebê acima de 4 kg, antipsicótico, apneia, trabalho noturno, pré-diabetes",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 4" },
      { t: "Homem que pede PSA: sabe onde fica a próstata e o que o exame responde e o que não responde?",
        f: "MS — CAB nº 29, Rastreamento, 2010" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — CAB nº 29, Rastreamento, 2010 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025",
    itens: [
      { t: "PA: duas medidas no consultório, com manguito adequado ao braço",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 5" },
      { t: "Peso, altura e IMC (sobrepeso 25 a 29,9; obesidade a partir de 30); circunferência abdominal",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Coleta do DNA-HPV (ou do preventivo, onde o teste ainda não chegou) nos mesmos sítios: ectocérvice e endocérvice",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 15" },
      { t: "Exame clínico das mamas sempre que houver queixa mamária — acolher na hora",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Pele e boca quando houver lesão referida, sobretudo em quem fuma ou bebe",
        f: "MS — CAB nº 29, Rastreamento, 2010" }
    ]
  },

  naoperder: {
    fonte: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025",
    itens: [
      { t: "Rastreio é para quem não tem sintoma: qualquer sinal de alerta tira a pessoa do rastreio e põe na investigação",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 29" },
      { t: "Risco cardiovascular dos 40 aos 74 anos, todo ano, com a calculadora HEARTS — mesmo sem HAS",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Mulher de 30 a 49 anos sem preventivo há mais de 36 meses, ou que nunca fez: prioridade para o DNA-HPV",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 16" },
      { t: "Gestante com rastreio de colo atrasado pode colher DNA-HPV no pré-natal, em qualquer idade gestacional",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 18" },
      { t: "Atividade sexual inclui sexo oral e com dedos ou objetos: mulher que faz sexo com mulher também rastreia colo",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 19" }
    ]
  },

  exames: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · MS — CAB nº 29, Rastreamento, 2010 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016 · MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025",
    itens: [
      { t: "HAS: PA em todo adulto a partir dos 18 anos, uma vez por ano, com duas medidas. Abaixo de 130/85: repetir em 1 ano. De 130–139/85–89: procurar fator de risco cardiovascular e, havendo, medir mais 2 vezes em 7 a 14 dias. A partir de 140/90: confirmar o diagnóstico",
        f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 5" },
      { t: "DM2: glicemia de jejum (HbA1c, se disponível) a partir dos 35 anos; em qualquer idade com sobrepeso ou obesidade e 1 fator de risco; também HIV, fibrose cística e transplante. Normal: repetir em 3 anos; pré-diabetes ou 3 ou mais fatores de risco: todo ano",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 4 e 5" },
      { t: "Dislipidemia (perfil lipídico): homem a partir dos 35 anos; homem de 20 a 35 anos e mulher a partir dos 20, só com alto risco cardiovascular. Normal: repetir em cerca de 5 anos",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Tabagismo em toda consulta, álcool (CAGE: 2 ou mais respostas sim é positivo) e IMC: em todo adulto; fumo e álcool também na gestante",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Colo do útero: DNA-HPV oncogênico dos 25 aos 64 anos, em quem tem colo e já teve atividade sexual; negativo, repetir em 5 anos; um negativo a partir dos 60 encerra — exceto quem tratou NIC 2, NIC 3 ou AIS: segue até 25 anos depois do tratamento (Rec. 14)",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 16 e 30" },
      { t: "Colo, onde o DNA-HPV ainda não chegou: citologia dos 25 aos 64 anos, as 2 primeiras com 1 ano de intervalo e, se negativas, a cada 3 anos",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016, p. 29" },
      { t: "Colo na mulher vivendo com HIV ou imunossuprimida: começa com o início da atividade sexual, repete em 3 anos se negativo e não encerra; qualquer HPV detectado vai à colposcopia",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 19" },
      { t: "Mama: mamografia bilateral a cada 2 anos, dos 50 aos 74 anos. De 40 a 49 e acima de 74, sem sintoma: por demanda, depois de orientar riscos e benefícios — o SUS não nega",
        f: "MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025" },
      { t: "Próstata: não há rastreio populacional com PSA. Homem que pede: explicar riscos e benefícios, decidir junto e registrar no prontuário. Acima de 75 anos: não rastrear",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "A Nota Técnica nº 9/2023 do MS (próstata) não foi baixada nesta onda: o item acima segue o CAB nº 29, de 2010 — conferir a NT",
        v: true },
      { t: "Colorretal (CAB nº 29, 2010): recomenda rastrear dos 50 aos 75 anos (sangue oculto nas fezes, colonoscopia ou sigmoidoscopia; grau A); não rastrear de rotina dos 76 aos 85 nem depois dos 85. Não considerou viável um programa populacional no Brasil e prioriza o diagnóstico precoce pelos sinais de alerta",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Diretriz nacional vigente de rastreamento colorretal (idade, método, intervalo): sem diretriz final confirmada",
        v: true }
    ]
  },

  conduta: {
    fonte: "MS — CAB nº 29, Rastreamento, 2010 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      { t: "Antes de pedir qualquer rastreio, explicar benefício e risco e obter o consentimento; a quem pede check-up fora do recomendado, explicar por que não e decidir junto",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Avisar antes de colher: DNA-HPV positivo não quer dizer lesão nem câncer. Resultado: 16 e/ou 18 → colposcopia; outros tipos → citologia reflexa na mesma amostra (ASC-US ou mais, ou insatisfatória → colposcopia; negativa → novo DNA-HPV em 12 meses); não detectado → 5 anos",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 16 e 17" },
      { t: "Reteste de 12 meses: negativo, 5 anos; 16 ou 18, colposcopia; outros tipos de novo, mais 12 meses; positivo aos 24 meses, colposcopia mesmo com citologia negativa. Colposcopia negativa depois de 16 ou 18: reteste em 12 meses",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 17, 18 e 30" },
      { t: "Autocoleta do DNA-HPV, inclusive levada pelo ACS, amplia o acesso; se precisar de citologia reflexa, nova coleta por profissional",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 15 e 16" },
      { t: "Rastreio por citologia, ASC-US: até 25 anos, repetir em 3 anos; 26 a 29, em 12 meses; 30 ou mais, em 6 meses. LSIL: até 25 anos, repetir em 3 anos; acima de 25, em 6 meses",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016, p. 22" },
      { t: "Citologia com ASC-H, AGC, AOI, HSIL, microinvasão, carcinoma ou adenocarcinoma: encaminhar para colposcopia",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016, p. 22" },
      { t: "Conduta depois da colposcopia com doença: será tratada no volume 2 das Diretrizes de 2025, que ainda não saiu; a referência anterior é a de 2016 — confirmar com a colposcopia de referência",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 27 e 30" },
      { t: "Pré-diabetes, ou 3 ou mais fatores de risco com exame normal: orientar modo de vida e reavaliar todo ano",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 5" },
      { t: "Tabagista: abordagem breve em toda consulta, pelos 5 As — abordar, aconselhar, avaliar, assistir, arranjar o seguimento. Mesmo menos de 3 minutos aumenta a cessação",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "CAGE positivo: aconselhamento breve com seguimento; conhecer o CAPS e os grupos de apoio do território",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Alto risco para câncer colorretal: abordagem individualizada, fora do rastreio populacional",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Alto risco para câncer de mama (quem é e o que fazer): a NT 626/2025 trata só do rastreio populacional — conferir com a referência",
        v: true },
      { t: "Rastreio organizado, não oportunístico: registrar o que foi feito e a próxima data, e convidar ativamente",
        f: "MS — CAB nº 29, Rastreamento, 2010" }
    ]
  },

  erros: {
    fonte: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025 · MS — CAB nº 29, Rastreamento, 2010 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      { t: "Colher DNA-HPV ou preventivo antes dos 25 anos — a lesão de baixo grau regride sozinha, e o sobretratamento aumenta o parto prematuro. DNA-HPV colhido antes dos 25: não considerar o resultado, orientar e começar aos 25 (Rec. 11). Preventivo já colhido antes dos 25: segue o Quadro 4 de 2016 (ASC-US ou LSIL, repetir em 3 anos; HSIL ou mais grave, colposcopia)",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 16 e 38 · INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016, p. 22" },
      { t: "Repetir preventivo todo ano em quem já tem exames normais — mais da metade dos exames feitos no país é repetição desnecessária",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Pedir citologia junto com o DNA-HPV (coteste)",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 15" },
      { t: "Seguir rastreando colo depois dos 64 com exames negativos, em quem nunca teve atividade sexual, ou depois de histerectomia total por causa benigna com exames anteriores normais — exceto quem tratou NIC 2, NIC 3 ou AIS: segue até 25 anos depois do tratamento (Rec. 14)",
        f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025, p. 16, 19 e 30" },
      { t: "Mamografia de rastreio fora dos 50 a 74 anos sem conversar sobre riscos e benefícios",
        f: "MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025" },
      { t: "PSA de rotina, em campanha ou sem decisão compartilhada — dois em cada três PSA altos não são câncer, e o tratamento pode deixar incontinência e impotência",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "PSA de rastreio acima dos 75 anos — o dano supera o benefício",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "USG transvaginal, dosagens hormonais ou densitometria de rotina em mulher sem sintoma — não há rastreio indicado",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Raio X de tórax de rotina em fumante — não rastreia câncer de pulmão nem tranquiliza; o problema é o cigarro",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "ECG e bateria de exames de sangue de check-up em adulto de baixo risco, sem HAS nem DM",
        f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Rastrear DM2 só em quem tem PA alta (regra antiga, do CAB nº 29) — pelo PCDT atual, rastreia-se todo adulto a partir dos 35 anos",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 4" }
    ]
  },

  scores: ["imc", "nota-conferencia"]
});

QUEIXAS.push({
  id: "planejamento-reprodutivo",
  nome: "Planejamento reprodutivo — escolha do método",
  kw: "planejamento reprodutivo familiar contracepcao anticoncepcional pilula aoc minipilula injetavel trimestral mensal diu cobre implante emergencia pilula do dia seguinte levonorgestrel laqueadura vasectomia criterios elegibilidade oms adolescente pos parto amamentacao",
  tag: "Programa",
  mod: "aps",
  tema: "T5-Mulher-Gestante",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025",
    itens: [
      "Suspeita de gravidez (atraso, náusea, mama aumentada): teste antes de inserir DIU — DIU na gestação é categoria 4, por risco de infecção pélvica grave e aborto séptico",
      { t: "Relação desprotegida ou falha do método nos últimos 5 dias: oferecer contracepção de emergência na mesma consulta", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "TVP/TEP atual ou prévia, ou mutação trombogênica conhecida: método com estrogênio é categoria 4 — DIU de cobre (1); progestágeno isolado é 2 na prévia e 3 na aguda",
      "Enxaqueca com aura, em qualquer idade: método com estrogênio é categoria 4 (AVC isquêmico)",
      "PA de 160/100 ou mais, doença vascular, isquemia cardíaca ou AVC prévio: método com estrogênio é categoria 4",
      "Fumante com 35 anos ou mais: AOC é categoria 3 com menos de 15 cigarros por dia e 4 com 15 ou mais",
      "Amamentando há menos de 6 semanas: método com estrogênio é categoria 4",
      "Sangramento vaginal sem explicação, suspeito de doença grave: não inserir DIU antes de investigar (categoria 4); injetável trimestral e implante são categoria 3",
      "Cervicite purulenta, clamídia, gonorreia ou DIP atual: não inserir DIU (categoria 4); tratar antes",
      { t: "Dor aguda em baixo ventre em usuária de minipílula, DIU ou contracepção de emergência: pensar em gravidez ectópica e em DIP", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Menor de 14 anos com atividade sexual: é estupro de vulnerável, independentemente de consentimento — notificar e acionar a rede de proteção; contracepção de emergência e profilaxia não esperam", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      { t: "Adolescente de 14 anos com atividade sexual: avaliar se as circunstâncias apontam para violência; havendo suspeita, notificar", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" }
    ]
  },

  perguntas: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "O que ela (ou o casal) quer agora: evitar, adiar, espaçar ou planejar gravidez?",
      "Data da última menstruação e relação sem proteção desde então — há certeza razoável de que não está grávida?",
      "Métodos já usados: o que funcionou, que efeito adverso teve, por que parou",
      "Está amamentando? Há quanto tempo foi o parto ou o aborto?",
      { t: "Fuma? Quantos cigarros por dia? Qual a idade?", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "Cefaleia: é enxaqueca? Tem aura?", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "Hipertensão, diabetes com lesão de órgão, AVC, infarto, TVP/TEP prévia, TVP/TEP em parente de primeiro grau, câncer de mama", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "Medicação em uso: anticonvulsivante (fenitoína, carbamazepina, barbitúrico, primidona, topiramato, oxcarbazepina, lamotrigina), rifampicina, antirretroviral", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      "Dispareunia, sangramento pós-coito ou fora do ciclo — sobretudo se a escolha é DIU",
      "Antecedentes obstétricos e de IST; parcerias e prática sexual (orienta a dupla proteção)",
      { t: "Adolescente: oferecer atendimento sozinha, com sigilo, sem exigir pais ou responsável", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" }
    ]
  },

  exame: {
    fonte: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025",
    itens: [
      "PA antes de iniciar método com estrogênio — uma medida isolada não classifica como hipertensa",
      "Peso e altura: IMC de 30 ou mais é categoria 2 para AOC e injetável mensal",
      { t: "Pílula, minipílula e injetável não exigem citopatológico, exame das mamas nem exame pélvico para começar", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Exame ginecológico conforme o método: para DIU, especular para afastar cervicite purulenta e sinal de DIP", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Teste rápido de gravidez quando não há certeza razoável de que não está grávida", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Usuária de DIU: procurar os fios no canal cervical — em metade das ausências eles estão lá", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" }
    ]
  },

  naoperder: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Gravidez não planejada já em curso: acolher sem julgamento, iniciar pré-natal ou abordar o risco de abortamento inseguro",
      { t: "Violência sexual em até 5 dias: contracepção de emergência (levonorgestrel ou DIU de cobre) e avaliação de profilaxia pós-exposição", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      { t: "DIU de cobre de emergência é categoria 3 se houver alto risco de IST, como no estupro (1 com baixo risco): preferir levonorgestrel", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "Anticonvulsivante indutor ou rifampicina derrubam a eficácia de AOC e minipílula — o injetável trimestral não perde eficácia (categoria 1)", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      "Ácido valproico não está na lista dos anticonvulsivantes que reduzem a eficácia do AOC",
      { t: "Lamotrigina: o AOC derruba o nível e pode precipitar crise", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "Renovação de receita também é consulta: a categoria vale para continuar o método (fumante que fez 35 anos, enxaqueca nova, HAS nova)", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      "Mulher com HIV, em TARV ou com aids pode usar AOC e injetáveis; DIU se clinicamente bem, reavaliando dor pélvica ou corrimento",
      { t: "Só o preservativo protege contra IST e HIV: dupla proteção com qualquer outro método", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      { t: "Implante subdérmico: disponível no SUS desde 2025 para adolescentes e mulheres de 14 a 49 anos", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  ddx: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Sangramento irregular de adaptação — primeiros meses de AOC, minipílula ou injetável; garantir uso correto antes de trocar",
      "Sangramento por outra causa — começou depois de meses de padrão estável, ou é intenso, prolongado ou pós-coito: examinar e investigar",
      "Escape com AOC — mais comum nos 3 primeiros meses e com dose baixa de estrogênio; se surge após uso prolongado, avaliar adesão",
      "Amenorreia esperada — injetável trimestral com o tempo, ou amamentação; afastar gravidez",
      "Gravidez ectópica — dor aguda em baixo ventre com atraso, em usuária de minipílula, DIU ou contracepção de emergência",
      "DIP — dor pélvica com febre, corrimento ou dor à mobilização do colo em usuária de DIU",
      "Cólica de adaptação ao DIU — 1 a 2 dias após a inserção e nos 3 a 6 primeiros meses, sobretudo na menstruação",
      "Demora para engravidar após o trimestral — o retorno da fertilidade é gradual, não é infertilidade"
    ]
  },

  exames: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Nenhum exame é pré-requisito para pílula, minipílula ou injetável",
      "Teste rápido de gravidez se não há certeza razoável de não gravidez, ou injetável atrasado além da tolerância",
      "Fios do DIU ausentes: excluir gravidez e pedir USG pélvica",
      "Suspeita de expulsão total sem saber se o DIU saiu: radiografia ou USG para ver se migrou para a cavidade abdominal",
      "Planejando gravidez: sorologias do casal (toxoplasmose, sífilis, rubéola, hepatites B e C, HIV) e citopatológico conforme o protocolo",
      { t: "Rastrear trombofilia antes do AOC não é rotina: condição rara e exame caro", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" }
    ]
  },

  farmaco: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025",
    itens: [
      "O SUS oferta: AOC, minipílula, injetável mensal, injetável trimestral, levonorgestrel de emergência, DIU de cobre, diafragma, preservativos masculino e feminino, laqueadura e vasectomia — e, desde 2025, o implante subdérmico de 14 a 49 anos (Caderneta da Gestante 2026)",
      "Categorias de elegibilidade da OMS (referência internacional; o Protocolo 2016 usa a edição de 2010, as linhas daqui seguem a 6ª edição, de 2025): 1 e 2 pode usar; 3 em geral não, salvo sem alternativa aceitável e com acompanhamento; 4 não usar",
      "A decisão é da mulher: apresentar eficácia, forma de uso, efeitos adversos e contraindicações de cada método",
      "Falha no uso típico, por 100 mulheres no primeiro ano: DIU de cobre 0,8 · injetáveis 3 · pílula 8 · preservativo masculino 15",
      "Contraindicação a estrogênio: minipílula, injetável trimestral, implante ou DIU de cobre",
      "Adolescente pode usar qualquer método — idade sozinha não contraindica nenhum; trimestral abaixo de 18 anos e DIU abaixo de 20 são categoria 2",
      "Amamentando: progestágeno isolado é categoria 2 antes de 6 semanas e 1 depois (OMS 2025); estrogênio é 4 antes de 6 semanas e 3 até 6 meses",
      "DIU de cobre inserido em até 5 dias da relação também é contracepção de emergência",
      "Contracepção de emergência repetida no mesmo ciclo é categoria 1, mas não substitui método regular"
    ]
  },

  conduta: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "A pílula pode ser entregue em qualquer consulta para começar depois; o ideal é iniciar entre o 1º e o 5º dia do ciclo",
      "Começou fora do início do ciclo, ou vem de método não hormonal: método de apoio por 7 dias",
      "Esqueceu 3 ou mais pílulas: tomar uma já e usar método de apoio por 7 dias; se houve relação nos últimos 5 dias, avaliar contracepção de emergência",
      "Trimestral atrasado mais de 2 semanas: reaplicar só com certeza razoável de não gravidez (teste rápido se preciso), ou se amamenta de forma exclusiva ou quase e o parto foi há menos de 6 meses, e apoio por 7 dias; relação desprotegida nos últimos 5 dias: oferecer levonorgestrel de emergência",
      "Mensal atrasado mais de 7 dias: reaplicar só com certeza razoável de não gravidez (teste rápido se preciso) e apoio por 7 dias",
      { t: "Pós-parto amamentando: minipílula e trimestral de 4 a 6 semanas após o parto, antes se o retorno for difícil; implante no pós-parto imediato; AOC só após 6 meses", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Pós-parto sem amamentar: método combinado só após 6 semanas do parto", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Pós-parto sem amamentar, pela OMS: combinado é categoria 3 antes de 21 dias (4 com outro fator de risco para TEV); de 21 a 42 dias, 2, ou 3 com outro fator de risco para TEV — imobilidade, transfusão, IMC acima de 30, hemorragia pós-parto, cesárea, pré-eclâmpsia, tabagismo", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "DIU de cobre pós-parto: até 48 horas ou a partir de 4 semanas — entre 48 horas e 4 semanas é categoria 3; sepse puerperal é categoria 4", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      "DIU de cobre com ciclo menstrual: qualquer dia; passados 12 dias do início da menstruação, só com certeza de não gravidez; não precisa de método de apoio",
      "DIU pode ser inserido logo após a contracepção de emergência; inserção por médico ou enfermeiro treinado",
      "Contracepção de emergência: dose única de levonorgestrel, de preferência nas primeiras 72 horas, até 5 dias; vômito em até 1 hora, repetir",
      { t: "Adolescente, inclusive abaixo de 14 anos: prescrever contracepção de emergência não é ato ilícito — prescrição criteriosa, sob a proteção integral do ECA; o enfermeiro pode dispensar levonorgestrel sem receita médica", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      "Planejando gravidez: suspender o método, ácido fólico pelo menos 30 dias antes da concepção, sorologias do casal e controle de doença crônica",
      "Infertilidade — encaminhar: menos de 30 anos e mais de 2 anos tentando; 30 a 39 anos e mais de 1 ano; 40 a 49 anos e mais de 6 meses; ou fator impeditivo conhecido",
      "Laqueadura ou vasectomia: orientar a baixa reversibilidade e oferecer métodos reversíveis antes de encaminhar ao serviço de referência",
      { t: "Laqueadura no parto: a gestante leva o documento de vontade assinado e datado pelo menos 60 dias antes da data prevista e o termo de consentimento assinado só por ela (Lei 14.443/2022), e cumpre os critérios legais de idade e número de filhos (ver item VERIFICAR); não justifica indicar cesárea", f: "MS — Caderneta Brasileira da Gestante, 2026" },
      { t: "Idade mínima, número de filhos e prazo de espera para laqueadura e vasectomia, no parto e fora dele: o Protocolo 2016 traz a regra da Lei 9.263/1996 (mais de 25 anos ou 2 filhos vivos, 60 dias), alterada pela Lei 14.443/2022 — conferir o texto vigente da lei", v: true },
      "Retorno: combinar conforme o método e deixar a porta aberta — volte se tiver problema, dúvida, quiser trocar de método ou achar que está grávida",
      { t: "Prazo da revisão após inserção do DIU e periodicidade do retorno de cada método: as fontes não fixam — seguir o protocolo do serviço", v: true }
    ]
  },

  erros: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Exigir citopatológico, exame das mamas ou exame pélvico para iniciar pílula ou injetável",
      { t: "Negar método à adolescente pela idade ou por estar sem pais ou responsável", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      "Manter método com estrogênio em quem passou a ter enxaqueca, com ou sem aura",
      { t: "Prescrever AOC à fumante de 35 anos ou mais sem perguntar quantos cigarros por dia", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      "Iniciar AOC na mulher que amamenta antes de 6 meses de pós-parto",
      "Trocar o AOC por escape sem antes checar como ela está tomando",
      { t: "Pedir rastreio de trombofilia antes de iniciar AOC", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "Classificar como hipertensa por uma única medida e negar o método", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      "Retirar o DIU por Actinomyces no citopatológico — a conduta é expectante: não se trata, não se retira",
      { t: "Tratar a contracepção de emergência como abortiva", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      { t: "Negar a contracepção de emergência porque já foi usada no mesmo ciclo — a repetição é categoria 1, embora o método seja pouco eficaz como rotina", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      { t: "Negar laqueadura no parto só porque o Protocolo 2016 a proíbe no pós-parto — a Lei 14.443/2022 a permite, cumpridos os critérios legais e a vontade manifestada 60 dias antes", f: "MS — Caderneta Brasileira da Gestante, 2026" }
    ]
  },

  formulario: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025 · RENAME 2024",
    farmacos: [
      { id: "etinilestradiol-levonorgestrel", papel: "AOC do SUS — sem contraindicação a estrogênio e com uso diário possível; amamentando, só após 6 meses" },
      { id: "noretisterona", papel: "minipílula — amamentando, ou quando o estrogênio é contraindicado; exige horário rigoroso" },
      { id: "medroxiprogesterona", papel: "injetável trimestral — sem estrogênio, sem pílula diária; eficácia mantida com anticonvulsivante indutor e rifampicina" },
      { id: "enantato-de-noretisterona-valerato-de-estradiol", papel: "injetável mensal — combinado: mesmas restrições do estrogênio, sem pílula diária" },
      { id: "levonorgestrel", papel: "contracepção de emergência — direito da usuária, dispensável pelo enfermeiro sem receita" },
      { id: "acido-folico", outra: true, papel: "planejando gravidez: iniciar pelo menos 30 dias antes da concepção" }
    ],
    combos: ["mul-dupla-protecao"],
    proibidos: ["mul-estrogenio-enxaqueca-aura", "mul-estrogenio-tabagismo-35", "mul-estrogenio-has", "mul-estrogenio-tev",
      "mul-estrogenio-amamentacao", "mul-hormonal-oral-indutor", "mul-aoc-lamotrigina"],
    dosemuda: ["mul-medroxiprogesterona-funcao"]
  },

  scores: ["nota-conferencia", "imc", "dpp"]
});

QUEIXAS.push({
  id: "climaterio",
  nome: "Climatério e transição menopausal",
  kw: "climaterio menopausa perimenopausa transicao menopausal pos menopausa fogacho calorao suor noturno insonia ressecamento vaginal atrofia sindrome geniturinaria sangramento pos menopausa terapia hormonal reposicao estrogenio estriol osteoporose",
  tag: "Programa",
  mod: "aps",
  tema: "T5-Mulher-Gestante",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      { t: "Sangramento genital após 12 meses sem menstruar: câncer de endométrio até prova em contrário — USG transvaginal e biópsia se endométrio espessado", f: "medicina-wiki/wiki/materno-infantil-fatos.md (2026-05-31)" },
      "Endométrio de 5 mm ou mais na pós-menopausa: encaminhar à ginecologia (câncer ou hiperplasia de endométrio)",
      "Células endometriais normais na citologia após a menopausa: avaliar a cavidade (histeroscopia; na falta, USG transvaginal)",
      "Sangramento anormal em uso de terapia hormonal: referenciar à ginecologia",
      "Sangramento genital não esclarecido é contraindicação absoluta à terapia hormonal: investigar antes de qualquer estrogênio",
      "Amenorreia com fogacho antes dos 40 anos: menopausa precoce — afastar gravidez e encaminhar para investigação",
      "Sudorese noturna com perda de peso, calafrio ou outro sintoma: não atribuir ao climatério sem investigar",
      { t: "Nódulo de mama endurecido e fixo ou que cresce, descarga papilar sanguinolenta unilateral, retração de pele ou mamilo, pele em casca de laranja: referência urgente, em qualquer idade", f: "MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025" },
      "Sintomas depressivos, sobretudo após evento cardiovascular recente: avaliar e tratar depressão, não reduzir a hormônio"
    ]
  },

  perguntas: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Data da última menstruação e como está o ciclo: intervalo, volume, duração",
      "Fogacho e suor noturno: frequência, intensidade, quanto atrapalham sono e trabalho",
      "Sono, humor, irritabilidade, memória e concentração",
      "Ressecamento vaginal, dispareunia, prurido, disúria, urgência, infecção urinária de repetição",
      "Sexualidade e desejo — sem presumir que a causa é só hormonal",
      "Sangramento genital depois de 12 meses sem menstruar",
      "Método contraceptivo em uso — na transição ainda há risco de gravidez",
      "Tabagismo, álcool, atividade física e alimentação",
      "História familiar de câncer de mama; data do último citopatológico e da última mamografia",
      "Antecedente de tromboembolismo, AVC, infarto, câncer de mama ou de endométrio, doença hepática — pesa na terapia hormonal",
      "Rede de apoio, sobrecarga de cuidado, relação conflituosa e violência",
      { t: "O que ela sabe, teme e espera da menopausa e do tratamento", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" }
    ]
  },

  exame: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "PA, peso, altura (IMC) e circunferência da cintura",
      "Estimar o risco cardiovascular",
      "Exame das mamas e exame ginecológico orientados pela queixa e pelos fatores de risco",
      "Especular: mucosa delgada e seca (atrofia), prolapso",
      "Risco de queda: casa, psicotrópico, dose de anti-hipertensivo, visão e audição"
    ]
  },

  naoperder: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Na transição ainda há ovulação: orientar contracepção (o AOC é opção no climatério se ela for elegível)",
      { t: "A partir dos 40 anos, AOC e injetável mensal são categoria 2", f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
      "Contraceptivo hormonal mascara a menopausa: para dosar FSH, pausa de 7 dias do AOC",
      "Depressão e ansiedade: considerar tratamento quando necessário",
      "Prevenção primária de osteoporose e de queda para todas; densitometria não é rastreio universal",
      { t: "Mulheres negras tendem a ter início mais precoce, sintomas mais intensos e duradouros, pior sono e mais risco cardiovascular, com menos acesso ao cuidado", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" },
      "A queixa que mais pesa na qualidade de vida costuma ser psicossocial e afetiva, não o fogacho"
    ]
  },

  ddx: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Gravidez — atraso menstrual na perimenopausa ainda pode ser gestação",
      "Hipotireoidismo — fadiga, intolerância ao frio, constipação, pele seca, queda de cabelo",
      "Hiperprolactinemia — amenorreia com galactorreia; lembrar fenotiazínico, antidepressivo e metoclopramida",
      "Depressão — tristeza, anedonia, humor depressivo, insônia: tratar como depressão quando necessário",
      "Infecção urinária × síndrome geniturinária — disúria, urgência e polaciúria podem ser atrofia",
      "Infecção ou neoplasia — sudorese noturna com perda de peso ou outro sintoma",
      "Sangramento da perimenopausa: anovulatório × pólipo, mioma, hiperplasia ou câncer de endométrio — este sobretudo acima dos 45 anos"
    ]
  },

  exames: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      { t: "Diagnóstico é clínico: não dosar hormônio de rotina na mulher acima de 40 anos", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" },
      "FSH só na dúvida diagnóstica: acima de 40 mUI/mL indica hipofunção ovariana; valor menor não exclui climatério",
      "Não há exame de rotina no climatério: pedir de forma individualizada",
      { t: "Mamografia de rastreamento: 50 a 74 anos, a cada 2 anos; de 40 a 49 e acima de 74, por demanda, depois de conversar sobre riscos e benefícios", f: "MS — Nota Técnica nº 626/2025 (rastreamento do câncer de mama), 2025" },
      { t: "Colo do útero: DNA-HPV de 25 a 64 anos, a cada 5 anos se negativo; teste negativo a partir dos 60 libera do seguinte", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      { t: "Onde o DNA-HPV ainda não chegou: citopatológico de 25 a 64 anos, a cada 3 anos após 2 anuais negativos", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016" },
      { t: "HAS: rastrear em todo adulto; DM2: rastrear se PA sustentada acima de 135/80", f: "MS — CAB nº 29, Rastreamento, 2010" },
      { t: "Dislipidemia: rastrear a partir dos 45 anos se houver alto risco coronariano (grau A); de 20 a 45 anos com alto risco, também (grau B)", f: "MS — CAB nº 29, Rastreamento, 2010" },
      "Densitometria: não é rastreio universal no climatério",
      { t: "Osteoporose: o CAB 29 cita a recomendação americana (USPSTF) de rastrear a partir dos 65 anos, ou dos 60 com risco aumentado de fratura", f: "MS — CAB nº 29, Rastreamento, 2010" },
      "Antes da terapia hormonal: exame laboratorial não é obrigatório; considerar hemograma, glicemia, perfil lipídico, função hepática e renal; mamografia se a última tem mais de 1 ano; USG transvaginal se sangramento anormal"
    ]
  },

  farmaco: {
    fonte: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "A base do cuidado é não farmacológica: alimentação, atividade física, sono, manejo do estresse, menos álcool, parar de fumar",
      "Terapia hormonal: opção eficaz para sintoma vasomotor moderado a intenso e sintoma geniturinário persistente, sobretudo antes dos 60 anos, sem contraindicação e após pesar riscos e benefícios",
      "Terapia hormonal não é para prevenir doença crônica nem para retardar o envelhecimento (NT 72/2026; o Protocolo 2016 ainda admitia prevenir a perda de massa óssea na mulher de alto risco de fratura)",
      "Evitar iniciar estrogênio mais de 10 anos após a menopausa ou acima dos 59 anos: mais risco cardiovascular",
      "Mulher com útero: estrogênio sempre com progestágeno — cíclico, 12 a 14 dias por ciclo (com sangramento), ou contínuo (sem sangramento)",
      "Menor dose eficaz pelo menor tempo; em geral, estrogênio por no máximo 5 anos, individualizando",
      "Estrogênio com progestágeno por 3 a 5 anos aumenta o risco de câncer de mama, mais com medroxiprogesterona",
      "Só queixa geniturinária: estrogênio vaginal — estriol tem absorção sistêmica desprezível; estrogênio conjugado vaginal absorve mais",
      "No SUS: estriol creme vaginal; estrogênios conjugados e medroxiprogesterona também constam da RENAME",
      "Sem terapia hormonal (contraindicada ou não desejada): antidepressivo é alternativa eficaz e não é cuidado inferior — paroxetina, fluoxetina, venlafaxina ou imipramina, os quatro de primeira escolha; outras opções: clonidina, metildopa, propranolol, cinarizina, gabapentina",
      { t: "A dose para fogacho dos quatro antidepressivos e da clonidina está no formulário, na linha 'Climatério — fogacho' de cada cartão (Protocolo 2016, Quadro 4) — não é a dose antidepressiva nem a de outra indicação; titular e manter a menor dose que alivia. Metildopa, propranolol, cinarizina e gabapentina não têm essa linha: conferir o Quadro 4 antes de prescrever", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Fitoterápico da RENAME para o climatério: só a isoflavona da soja",
      { t: "Câncer de mama contraindica a terapia hormonal e leva à não hormonal: na mulher em tamoxifeno, paroxetina e fluoxetina não, porque inibem o CYP2D6 e reduzem a ativação do tamoxifeno; a venlafaxina inibe essa enzima só fracamente", f: "Maudsley Prescribing Guidelines, 15ª ed., 2025" }
    ]
  },

  conduta: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "Confirmar pela clínica: idade esperada + queixa sugestiva e/ou 12 meses de amenorreia",
      { t: "Considerar a transição menopausal na consulta a partir dos 40 anos, diante de alteração menstrual, fogacho, sono, humor ou queixa geniturinária", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" },
      "Fogacho: quarto ventilado, roupa em camadas, tecido que respira, água quando vier, evitar cigarro, álcool e cafeína, diário de gatilhos, atividade física, perder peso se excesso, respiração lenta",
      "Sono: horários fixos, sem cochilo à tarde, sem cafeína no fim do dia, sem exercício nas 3 horas antes de deitar; acordada mais de 15 minutos, sair da cama",
      "Queixa geniturinária: lubrificante na relação, hidratante vaginal no dia a dia; estrogênio vaginal se persistir",
      "Atividade física: 150 minutos por semana de aeróbico moderado + fortalecimento 2 ou mais vezes por semana",
      "Osso: dieta rica em cálcio e vitamina D, sol diário, exercício; suplementar só se aporte ou sol forem insuficientes",
      "Terapia hormonal só quando o sintoma não cede com medida não farmacológica ou não hormonal e prejudica a vida — decisão compartilhada",
      "Antes da terapia hormonal: história e exame detalhados (PA, mama), contraindicações absolutas e relativas",
      "Contraindicação absoluta à terapia hormonal: câncer de mama, câncer de endométrio, doença hepática grave, sangramento genital não esclarecido, história de tromboembolismo agudo e recorrente, porfiria. Relativa: HAS ou DM não controlados, endometriose, miomatose",
      "Seguimento da terapia hormonal: aos 2 a 3 meses e aos 6 meses (adesão, efeito adverso, sangramento, PA, peso); depois anual, com exame da mama e mamografia anual enquanto usar",
      "Mulher em terapia hormonal prescrita por especialista continua acompanhada na USF",
      "Sangramento aumentado antes da menopausa: progestágeno ou AOC, se elegível",
      { t: "Registro: CIAP-2 X11 (sintomas do climatério) e X12 (sangramento pós-menopausa); CID-10 N95.0 (sangramento pós-menopausa) e N95.2 (vaginite atrófica)", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" },
      { t: "Ações coletivas, eMulti e práticas integrativas como complemento do cuidado individual", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" }
    ]
  },

  erros: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      { t: "Pedir FSH ou estradiol para confirmar menopausa em mulher acima de 40 anos com quadro típico", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" },
      { t: "Pedir USG transvaginal de rotina na mulher assintomática no climatério", f: "MS — CAB nº 29, Rastreamento, 2010" },
      "Pedir densitometria para toda mulher no climatério",
      { t: "Iniciar terapia hormonal para prevenir doença cardiovascular ou envelhecimento", f: "MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026" },
      "Prescrever estrogênio sem progestágeno para mulher com útero",
      "Iniciar estrogênio sistêmico acima dos 59 anos ou mais de 10 anos após a menopausa",
      "Atribuir humor, libido e insônia só ao hormônio, sem abordagem biopsicossocial",
      "Esquecer a contracepção na perimenopausa",
      "Manter terapia hormonal sem reavaliação anual nem mamografia",
      { t: "Tratar sangramento pós-menopausa como resto de menstruação", f: "medicina-wiki/wiki/materno-infantil-fatos.md (2026-05-31)" },
      "Negar estriol vaginal à sobrevivente de câncer de mama sem avaliar caso a caso — contraindicado é com inibidor de aromatase; o creme de estrogênio conjugado absorve mais"
    ]
  },

  formulario: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026 · RENAME 2024 · Maudsley Prescribing Guidelines, 15ª ed., 2025",
    farmacos: [
      {
        id: "estriol",
        papel: "síndrome geniturinária — estrogênio vaginal do SUS, absorção sistêmica desprezível"
      },
      {
        id: "estrogenios-conjugados",
        papel: "terapia hormonal sistêmica (comprimido da RENAME); creme vaginal absorve mais que o estriol"
      },
      {
        id: "estradiol",
        papel: "terapia hormonal sistêmica — oral, adesivo ou gel; via escolhida pela preferência e pela comorbidade"
      },
      { id: "progesterona", papel: "proteção do endométrio na mulher com útero em uso de estrogênio" },
      {
        id: "tibolona",
        papel: "alternativa que age no útero como terapia combinada contínua, sem estímulo mamário"
      },
      {
        id: "medroxiprogesterona",
        outra: true,
        papel: "proteção do endométrio na mulher com útero — o progestágeno da RENAME, com mais risco de câncer de mama na terapia combinada"
      },
      {
        id: "etinilestradiol-levonorgestrel",
        outra: true,
        papel: "perimenopausa com sangramento aumentado ou que ainda precisa de contracepção, se elegível"
      },
      {
        id: "fluoxetina",
        outra: true,
        linha: "Climatério — fogacho",
        papel: "fogacho sem terapia hormonal: um dos quatro antidepressivos de primeira escolha do Protocolo; o ISRS da RENAME; titular e manter a menor dose que alivia; com tamoxifeno, não — inibe o CYP2D6 e tira o efeito do tamoxifeno"
      },
      {
        id: "paroxetina",
        outra: true,
        linha: "Climatério — fogacho",
        papel: "fogacho sem terapia hormonal: um dos quatro antidepressivos de primeira escolha, na formulação de liberação prolongada; fora da RENAME; com tamoxifeno, não — inibidor potente do CYP2D6, tira o efeito do tamoxifeno"
      },
      {
        id: "venlafaxina",
        outra: true,
        linha: "Climatério — fogacho",
        papel: "fogacho sem terapia hormonal: um dos quatro antidepressivos de primeira escolha; fora da RENAME"
      },
      {
        id: "imipramina",
        outra: true,
        linha: "Climatério — fogacho",
        papel: "fogacho sem terapia hormonal: um dos quatro antidepressivos de primeira escolha; fora da RENAME"
      },
      {
        id: "clonidina",
        outra: true,
        linha: "Climatério — fogacho",
        papel: "fogacho sem terapia hormonal: entre as outras opções, depois dos antidepressivos de primeira escolha; fora da RENAME"
      }
    ],
    combos: ["mul-th-estrogenio-progestageno"],
    proibidos: ["mul-th-tev", "mul-th-cancer-mama", "ap1-isrs-tamoxifeno"],
    dosemuda: ["mul-medroxiprogesterona-funcao"]
  },

  scores: ["nota-conferencia", "imc", "phq9", "gad7"]
});

QUEIXAS.push({
  id: "idoso-avaliacao",
  nome: "Pessoa idosa — IVCF-20, quedas e polifarmácia",
  kw: "idoso pessoa idosa ivcf ivcf-20 fragilidade vulnerabilidade funcionalidade queda quedas polifarmacia desprescricao benzodiazepinico anticolinergico aine beers stopp consenso caderneta vacina influenza pneumococica covid violencia negligencia delirium declinio funcional retencao urinaria geriatria",
  tag: "Programa",
  mod: "aps",
  tema: "T6-Idoso",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025",
    itens: [
      "Confusão, sonolência, agitação ou mudança de comportamento de início recente: delirium — procurar dor, infecção, desidratação e reação a medicamento antes de chamar de 'comportamento'",
      { t: "Comportamento com risco iminente de se machucar ou ferir outra pessoa: acionar o SAMU (192)", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Perda de peso não intencional — 4,5 kg ou 5% do peso no último ano, 6 kg em 6 meses ou 3 kg no último mês: procurar causa orgânica, problema bucal e insegurança alimentar", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "Engasgo ao engolir líquido, falta de apetite ou sinais de desidratação (boca seca, urina escura ou de cheiro forte)", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Retenção aguda de urina: pode aparecer só como incontinência, delirium ou perda de função, mesmo sem dor — sondagem vesical e encaminhar imediatamente à urgência", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Queda com impacto no quadril ou no punho, ou que deixou o idoso sem conseguir levantar: maior chance de fratura e de lesão grave", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Queda com trauma de crânio seguida de mudança aguda de consciência ou de comportamento: suspeitar de hematoma subdural agudo e mandar à urgência", v: true },
      { t: "Queda recente ou repetida é marcador de fragilidade e de declínio funcional: toda queda tem causa a achar e tratar", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Sinais de violência ou negligência: lesões e traumas, falta de comida, roupa limpa ou higiene, remédio dado a mais, a menos ou retirado pelo cuidador, dinheiro usado sem consentimento. A suspeita já obriga a notificar", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      "Declínio funcional rápido — sobretudo deixar de tomar banho sozinho: comprometimento importante de saúde; perda aguda ou subaguda costuma ser sintoma de doença, e tratá-la ajuda a recuperar a função",
      { t: "Esquecimento progressivo ou que já impede atividade do dia a dia: avaliação médica prioritária", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "Humor deprimido com perfil de risco de suicídio — homem, mora só, depressão severa, viuvez recente, álcool, insônia persistente, inquietude psicomotora importante, doença dolorosa ou incapacitante, institucionalizado ou dependente de cuidado de longa duração, culpa excessiva: avaliar o risco nesta consulta", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  perguntas: {
    fonte: "MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      { t: "IVCF-20 inteiro, no mesmo atendimento: no PEC (campo Objetivo, 5 a 10 minutos) ou na Caderneta, pp. 66–69. Responde o idoso; com autonomia reduzida, o familiar ou o cuidador", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "IVCF 1–2 · idade: 60–74 anos = 0, 75–84 = 1, 85 ou mais = 3 · saúde, comparada à de outros da mesma idade, regular ou ruim = 1", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "IVCF 3–6 · por causa da saúde, deixou de fazer compras, de controlar o dinheiro ou pagar contas, ou de fazer serviço doméstico leve = 4 (teto 4 no bloco) · deixou de tomar banho sozinho = 6", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "IVCF 7–9 · algum familiar ou amigo disse que está esquecido = 1 · esquecimento piorando nos últimos meses = 1 · esquecimento que impede alguma atividade do dia = 2", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "IVCF 10–11 · no último mês: desânimo, tristeza ou desesperança = 2 · perdeu o interesse ou o prazer em atividades = 2", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "IVCF 15–17 · dificuldade de caminhar que impede atividade = 2 · duas ou mais quedas no último ano = 2 · perde urina ou fezes sem querer, mesmo pouco ou às vezes = 2", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "IVCF 18–20 · visão ou audição que impede atividade, mesmo com óculos ou aparelho = 2 cada · cinco ou mais doenças crônicas, cinco ou mais medicamentos todo dia, ou internação nos últimos 6 meses = 4 (teto 4)", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Quedas: quantas no ano, como, quando, onde e fazendo o quê. Check-up da Caderneta (p. 45): bengala ou andador indicado, instável ao andar, segura nos móveis, medo de cair, usa as mãos para levantar da cadeira, dificuldade para subir no meio-fio, pressa para o banheiro, pés dormentes, remédio que dá tontura ou cansaço, remédio para dormir ou para o humor, muitas vezes triste ou deprimido — qualquer SIM pede avaliação", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      "Todos os remédios na mesa: pedir que traga na próxima consulta os receitados, os comprados por conta própria e os chás, xaropes, vitaminas e fitoterápicos. Perguntar se tem dificuldade para abrir, ler, lembrar, tomar vários de uma vez, conseguir a tempo, ou se muda o uso por conta própria",
      { t: "Alimentação: apetite, perda de peso, dificuldade para mastigar, prótese folgada, engasgo com líquido, boca seca", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      "Rede: mora só? viuvez no último ano? quem ajudaria se adoecer? quem decidiria pela saúde dele se não puder? cuida de alguém dependente?",
      { t: "Violência, com o idoso SOZINHO na sala — no último ano alguém: gritou sem razão? chamou por apelido que não gosta? usou o dinheiro sem seguir suas instruções? ameaçou por não fazer o que queriam? bateu, deu tapa ou golpeou? sacudiu ou segurou de forma ameaçadora? roubou dinheiro ou pertences? Qualquer SIM: avaliar a fundo", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Sono e álcool: quantas horas dorme, acorda cansado? As quatro perguntas de álcool da Caderneta (p. 116) — qualquer SIM pede atendimento", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" }
    ]
  },

  exame: {
    fonte: "MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      { t: "IVCF 12–13 · pedir que ponha as duas mãos atrás da cabeça (não eleva acima do ombro = 1) e que segure uma caneta ou moeda (não consegue = 1); limitação de um lado só já pontua", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "IVCF 14 · vale 2 se houver qualquer um: perda de peso não intencional (4,5 kg ou 5% no ano, 6 kg em 6 meses, 3 kg no mês), IMC abaixo de 22, panturrilha abaixo de 31 cm, 4 metros em mais de 5 segundos (teto 2)", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Velocidade da marcha: 4 metros 'como se atravessasse a rua, sem correr', no cronômetro. Mais de 5 segundos é menos de 0,8 m/s — mais queda, internação e morte", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "Peso, altura, IMC e perímetro da panturrilha — abaixo de 31 cm sugere sarcopenia", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "IMC do idoso: 22 ou menos = baixo peso; entre 22 e 27 = adequado; 27 ou mais = sobrepeso. A calculadora de IMC usa a faixa do adulto", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "PA deitado, sentado e em pé: procurar hipotensão postural", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Levantar da cadeira, andar 3,5 m, voltar e sentar: olhar dor, força, amplitude, equilíbrio e marcha. Não consegue: exame completo dos membros inferiores e escala de Tinetti", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      "Teste do sussurro: fora do campo visual, a cerca de 33 cm, uma pergunta simples em cada ouvido. Sem resposta: otoscopia — cerume impactado é causa comum e se remove na APS",
      { t: "Visão: se refere dificuldade para ler, ver TV ou dirigir, cartão de Jaeger a 35 cm, com os óculos, cada olho e depois os dois", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Memória: dizer mesa, maçã e dinheiro e pedir de volta após 3 minutos. Errou: MEEM; na dúvida, relógio, fluência verbal e Pfeffer", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Boca: ferida em lábio ou boca que não cicatriza em mais de 15 dias, mancha vermelha ou esbranquiçada, sangramento sem causa — sinal de alerta de câncer de boca: acionar já a equipe de saúde bucal", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Pés: feridas, calosidades, sensibilidade, unhas e calçado", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      "Pele e estado geral: úlcera por pressão, desidratação, desnutrição — e lesões ou traumas que possam ser sinal de violência",
      { t: "Circulação periférica e edema de membros inferiores — insuficiência venosa é causa comum de edema; doença arterial periférica marca aterosclerose", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  naoperder: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016",
    itens: [
      { t: "Doença no idoso se apresenta atípica: o idoso falante que fica quieto e depois confuso pode estar com infecção", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Declínio funcional pode ser o único sinal de doença ainda não diagnosticada", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Delirium muitas vezes é a primeira manifestação de demência, e depressão acompanha até metade das demências iniciais", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Sintoma novo pode ser efeito adverso: a lista de inapropriados serve também para reconhecer o evento adverso antes que ele vire receita nova", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Cerume impactado por trás da queixa de surdez — e perda auditiva é fator de risco para demência", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "Incontinência tem causa reversível: delirium, restrição de mobilidade, retenção urinária, infecção, efeito de medicamento", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Idoso e familiar discordam sobre a saúde dele: pode ser falta de insight de um dos dois — avaliar cognição e humor", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "Cuidador sobrecarregado: risco de violência contra o idoso e de adoecimento do próprio cuidador (escala de Zarit)", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Complicações da queda: fratura, hematoma subdural, restrição prolongada ao leito, hospitalização, institucionalização e morte", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Declínio cognitivo semanas depois de uma queda: lembrar hematoma subdural crônico, causa reversível de demência", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      "Pernas 'falsearam' — fraqueza muscular ou instabilidade articular",
      "Desequilíbrio para trás — problema postural, vestibular ou de processamento central",
      "Desequilíbrio para o lado — fraqueza dos estabilizadores do quadril, falha na estratégia motora",
      "Percebe que vai cair e não corrige a tempo — Parkinson ou sequela de AVE",
      "Cai ao levantar ou mudar de posição — hipotensão postural ou doença cardiocirculatória",
      "Cai andando — demência, incontinência, diabetes, osteoartrite ou medicação inadequada",
      "Outras causas de queda na comunidade — ambiente, tontura ou vertigem, síncope, lesão do SNC, baixa visão",
      "Queixa de memória — demência × depressão × transtorno psicótico de início tardio × delirium (agudo, por causa orgânica ou medicamentosa)",
      "Demência de causa reversível — psicotrópico ou opioide, distúrbio hidroeletrolítico, desidratação, insuficiência renal ou hepática, hipoxemia, hidrocefalia de pressão normal, hematoma subdural crônico, neurossífilis, tireoide, B12, álcool: tratar cedo, antes que vire irreversível"
    ]
  },

  farmaco: {
    fonte: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · MS — CAB nº 34, Saúde Mental, 2013 · ABS — Diretriz de Insônia em Adultos, 2023",
    itens: [
      { t: "Polifarmácia é cinco ou mais medicamentos: pontua no IVCF-20 e se associa a interação nociva, queda e piora da qualidade de vida", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Revisar a medicação rotineiramente: evitar polifarmácia e minimizar anticolinérgico e sedativo sempre que possível", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      "Na dúvida se o sintoma é efeito adverso, a melhor conduta é suspender o medicamento — exceto o que não se para de golpe, como o benzodiazepínico de uso longo",
      { t: "Esquema simples, com o mínimo de fármacos, trocando os que interagem. Juntar as receitas dos vários especialistas é papel da APS — duplicação é a iatrogenia típica", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Inapropriado não é contraindicação absoluta: se precisar, pesar risco e benefício, buscar alternativa não farmacológica, usar a menor dose necessária e monitorar", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Benzodiazepínico (diazepam, clonazepam, alprazolam, bromazepam, lorazepam) no idoso: evitar — cognição, delirium, queda, fratura e acidente de carro; nunca para tratar insônia, agitação ou delirium. Exceções do Consenso: convulsão, distúrbio do sono REM, abstinência de benzodiazepínico ou álcool, TAG grave, anestesia perioperatória e cuidado paliativo", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Benzodiazepínico de anos: não cortar de golpe. Negociar a redução gradual; as gotas (clonazepam, bromazepam) permitem degraus pequenos. A suspensão abrupta traz de volta insônia e ansiedade", f: "MS — CAB nº 34, Saúde Mental, 2013" },
      { t: "Quem já caiu ou fraturou: benzodiazepínico, zolpidem, antipsicótico, tricíclico, ISRS, anticonvulsivante fora da epilepsia, anti-histamínico de primeira geração e opioide de uso prolongado somam ataxia, síncope ou queda", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Delirium: anticolinérgico, benzodiazepínico, tricíclico, zolpidem, corticoide, antagonista H2 (cimetidina, ranitidina), clorpromazina e petidina podem induzir ou agravar", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      "Zolpidem: com demência, delirium ou queda prévia, não usar (Consenso, Quadro 2). Nos demais, só curto prazo — inapropriado acima de 90 dias (Consenso) e limitado a 4 semanas, de preferência intermitente (ABS)",
      { t: "Antipsicótico no comportamento da demência (o haloperidol está na lista do Quadro 1): AVC e morte. No critério da demência (Quadro 2), só quando o manejo não farmacológico falhou E há ameaça a si ou a outros. Evitar também em quem já caiu e no Parkinson. Neuroléptico como hipnótico (a quetiapina para dormir): evitar uso prolongado — confusão, hipotensão, extrapiramidal e queda", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Tricíclico terciário (amitriptilina, imipramina, clomipramina): anticolinérgico, sedativo, hipotensão ortostática. A exceção da dor ou da depressão grave (Quadro 1) NÃO vale com queda, demência, delirium, glaucoma, distúrbio de condução, síncope ou constipação (Quadro 2)", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Metoclopramida: evitar, exceto na gastroparesia — extrapiramidal e discinesia tardia, risco maior no idoso frágil; no Parkinson, piora o parkinsonismo", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Anticolinérgicos comuns na USF que se evitam no idoso: anti-histamínico de primeira geração, tricíclico terciário, relaxante muscular (ciclobenzaprina, carisoprodol, orfenadrina), antiespasmódico (escopolamina, hiosciamina — exceto paliativo de curto prazo para reduzir secreção oral) e, na demência, oxibutinina. Biperideno: evitar para tratar efeito extrapiramidal de neuroléptico, na constipação e na demência", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Anticolinérgico no homem com sintoma urinário ou HPB: diminui o fluxo e pode causar retenção urinária", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "AINE: evitar uso crônico — sangramento e úlcera, sobretudo acima de 75 anos ou com corticoide, anticoagulante ou antiagregante; o IBP reduz, mas não elimina. Evitar também na DRC estágio 4–5, na insuficiência cardíaca e na HAS moderada a grave", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "IBP em dose plena para úlcera péptica por mais de 8 semanas: reduzir a dose ou suspender — osteoporose e fratura, demência e insuficiência renal no uso prolongado. Não é o IBP de gastroproteção de quem precisa de AINE", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Sulfonilureia no idoso: glibenclamida não é recomendada a partir de 60 anos — hipoglicemia prolongada grave; o PCDT manda evitar sulfonilureia no idoso e, se precisar usar, é a gliclazida", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
      { t: "Meta de HbA1c no idoso (60 anos ou mais): abaixo de 7,5% no saudável (poucas comorbidades, função e cognição preservadas); abaixo de 8,0% no comprometido (múltiplas comorbidades, comprometimento funcional leve a moderado ou cognitivo moderado); no muito comprometido (doença terminal, IC classe IV, oxigênio domiciliar, diálise, comprometimento funcional e cognitivo grave) só evitar sintomas de hiper e de hipoglicemia. Abaixo de 7% teve mais mortalidade: meta agressiva é desencorajada no vulnerável", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
      { t: "Antes de iniciar anti-hipertensivo, investigar hipotensão postural ou pós-prandial", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    farmacos: [
      { id: "gliclazida", papel: "o PCDT DM2 manda evitar sulfonilureia no idoso; se precisar usar, é esta — menos hipoglicemia; com TFG abaixo de 30, só a de liberação modificada e com muita cautela" }
    ],
    combos: [],
    proibidos: ["ins-zolpidem-cronico", "dem-anticolinergico-ieca", "dem-antipsicotico-bpsd-rotina"],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016 · MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026",
    itens: [
      "IVCF 0–6, baixo risco: reaplicar no mínimo uma vez por ano. Aprofundar toda dimensão que pontuou — quem perdeu o banho sozinho soma 6 e cai aqui. Promoção da saúde, atividade coletiva, saúde bucal, vacina, prevenção de quedas e controle das doenças crônicas",
      "IVCF 7–14, risco moderado: reaplicar a cada 6 meses. Aprofundar cada dimensão alterada; plano de cuidados e abordagem multiprofissional coordenados na APS, reabilitação, articulação com a atenção especializada quando indicado, apoio ao cuidador",
      "IVCF 15–40, alto risco: reaplicar a cada 6 meses. Cuidado compartilhado multiprofissional prioritário, coordenado na APS, com articulação com a atenção especializada; prevenção quaternária e de iatrogenia, prevenção de violência, apoio ao cuidador, cuidados de longo prazo",
      { t: "Reaplicar antes do prazo diante de evento sentinela: queda, internação, mudança na prescrição, mudança de comportamento, viuvez recente", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      "Toda queda: achar a causa e tratar, depois os fatores de risco. Bengala ou andador se preciso, revisar remédio que dá hipotensão postural, exercício de força e equilíbrio, exame de vista anual e dos pés anual",
      "Casa segura: chão livre, tapete fixo ou retirado, luz em todo cômodo e na escada, interruptor na entrada, barra e piso antiderrapante no banheiro, corrimão dos dois lados, banho sentado se instável, banheiro sem tranca",
      "Desprescrever com o Consenso de inapropriados à mão e registrar na Caderneta (p. 56) o que saiu, com data e motivo",
      { t: "Plano de cuidados em três metas — a imediata, a de 3 meses e a de longo prazo —, alinhadas ao que o idoso quer e ao contexto em que vive", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Vacinas de rotina a partir de 60 anos: influenza, uma dose por temporada · covid-19, uma dose a cada 6 meses · dT a cada 10 anos (antecipar para 5 se exposição a risco de difteria ou tétano) · esquema incompleto: dT, iniciar ou completar as 3 doses; hepatite B, iniciar ou completar o esquema de 3 doses (0, 1 e 6 meses), sem reiniciar", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Pneumocócica VPC 20, dose única: todo idoso a partir de 85 anos e, de 60 a 84 anos, o acamado ou institucionalizado. Duas doses prévias de VPP 23 = vacinado; uma de VPP 23 = VPC 20 com intervalo mínimo de 1 ano. Já tomou VPC 13 ou VPC 15: com VPP 23 = vacinado; sem VPP 23 = VPC 20 com intervalo mínimo de 2 meses. Com condição clínica especial, ver a NT nº 52/2026", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "A partir de 60 anos não são rotina: febre amarela (só com circulação confirmada do vírus), tríplice viral (bloqueio de sarampo ou trabalhador de saúde) e varicela (só nos grupos da IN), sempre com avaliação caso a caso. A vacina da dengue é contraindicada", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      "Violência suspeita ou confirmada: notificar na ficha do Sinan e acionar a rede — CRAS ou CREAS, Conselho do Idoso, Ministério Público, delegacia, Disque 100 (opção 2). Idoso com cognição preservada decide o curso da intervenção — a notificação não depende dessa decisão",
      { t: "Encaminhar pelo achado: Jaeger pior que 20/40 → oftalmologia · sussurro sem resposta com conduto livre → audiometria · dúvida cognitiva depois de MEEM e Pfeffer → avaliação neuropsicológica · suspeita de demência → atenção especializada · perda de peso ou IMC nos extremos → nutricionista · membros alterados → fisioterapia. A equipe mantém o acompanhamento", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Para onde encaminhar em Feira de Santana (geriatria, reabilitação, eMulti, CREAS): confirmar o fluxo local com a preceptora", v: true }
    ]
  },

  erros: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025 · MS — Caderneta Brasileira da Pessoa Idosa, 2026 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016",
    itens: [
      { t: "Atribuir queda, esquecimento, incontinência ou perda de função à idade, sem procurar a causa", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Começar o IVCF-20 no PEC e deixar para terminar depois — todos os itens fecham no mesmo atendimento", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "Somar além do teto: AVD instrumental vale no máximo 4, o item 14 no máximo 2, comorbidade múltipla no máximo 4", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Pontuar AVD quando a pessoa não faz a tarefa por outro motivo que não a saúde", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Não pontuar a continência de quem usa fralda; contar como internação a observação de menos de 24 horas", f: "MS — Nota Informativa nº 2/2025 (IVCF-20 no PEC), 2025" },
      { t: "Ler o IMC do idoso pela faixa do adulto — no IVCF-20, IMC abaixo de 22 já pontua", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Tratar o efeito adverso com remédio novo, em vez de suspeitar do remédio (cascata iatrogênica)", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Benzodiazepínico ou zolpidem para insônia ou agitação do idoso, ou renovado por inércia em quem já caiu", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Anti-histamínico de primeira geração — prometazina, dexclorfeniramina, hidroxizina, dimenidrinato, meclizina — para dormir, alergia ou tontura de rotina", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "AINE contínuo para dor articular, sobretudo acima de 75 anos ou com anticoagulante, antiagregante ou corticoide", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Furosemida para edema de tornozelo sem insuficiência cardíaca — meia de compressão costuma ser mais apropriada", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Perguntar sobre violência com o acompanhante na sala", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Decidir pelo idoso dependente como se a dependência tirasse a autonomia", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  scores: ["nota-conferencia", "imc", "ckdepi"]
});

QUEIXAS.push({
  id: "visita-domiciliar-acamado",
  nome: "Visita domiciliar ao acamado ou domiciliado",
  kw: "visita domiciliar vd acamado domiciliado restrito ao leito atencao domiciliar ad1 ad2 ad3 melhor em casa emad emap sad cuidador sobrecarga zarit lesao por pressao escara ferida disfagia engasgo broncoaspiracao desnutricao desidratacao constipacao queda ambiente coelho savassi risco familiar declaracao de obito",
  tag: "Programa",
  mod: "aps",
  tema: "T3-Risco-Acamados-Paliativos",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012 · MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      { t: "Piora que não cabe mais na AD1 — precisa de visita semanal ou mais, procedimento ou equipamento: acionar a EMAD (AD2 ou AD3) ou discutir internação", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Confusão de início agudo e flutuante (delirium): marcador de gravidade — buscar causa reversível (infecção, desidratação, distúrbio eletrolítico, fármaco novo)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Disfagia com pneumonia aspirativa de repetição ou falta de ar: broncoaspiração — e indicador de cuidado paliativo (pergunta surpresa, SPICT-BR)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Queda com dor, deformidade, incapacidade de levantar ou rebaixamento: fratura e hematoma subdural estão entre as complicações", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Ferida ou lesão de pele com dor crescente ou sinais de infecção: avaliação de profissional especialista", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Sinais de violência, negligência ou abandono do dependente: suspeita já obriga a notificar", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Cuidador que não pode mais permanecer ou não dá conta: sem cuidador, o plano de cuidado em casa cai", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Risco iminente à segurança do paciente ou de outros (agressão, autolesão): SAMU 192", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Critérios clínicos de remoção para a urgência a partir do domicílio (instabilidade hemodinâmica, insuficiência respiratória aguda): o Caderno AD vol. 2 não baixou — seguir o protocolo do SAD e do SAMU locais", v: true }
    ]
  },

  perguntas: {
    fonte: "MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS — Caderno de Atenção Domiciliar, vol. 1, 2012 · MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      { t: "Quem é o cuidador principal? Há quem reveze com ele?", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "O cuidador sabe o que fazer e para quem ligar se piorar ou numa urgência?", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Está restrito ao leito (acamado) ou só à casa (domiciliado)?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Engasga com frequência ao comer ou beber?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Como come e bebe? Perdeu peso? Tem sinais de desidratação?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Intestino: frequência, esforço, fezes endurecidas, sensação de evacuação incompleta; urina: perde ou retém?", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Dor: onde, nota de 0 a 10, o que piora e o que alivia, que remédio já usou", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Sono: horas por noite, despertares, acorda cansado, o sono dele atrapalha o do cuidador?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Remédios: quem administra, o que toma, há sedativo, hipnótico ou ansiolítico, quantos ao todo?", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Caiu no último ano? Como e onde?", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Renda: a família depende da aposentadoria ou pensão do paciente? Recebe BPC ou Bolsa Família?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "O paciente, se lúcido, e a família concordam com o cuidado em casa?", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" }
    ]
  },

  exame: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — Caderneta Brasileira da Pessoa Idosa, 2026 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      { t: "Pele inteira, com foco nas proeminências: sacro, cóccix, ísquios, trocânteres, escápulas, occipital, calcâneos, dedos, nariz e orelhas", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Pele sob dispositivos (sonda, cateter, fralda): lesão por pressão relacionada a dispositivo", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Sinais de desidratação e de desnutrição", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Dor em quem não fala: PAINAD por 5 minutos (respiração, vocalização, face, corpo, consolabilidade)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Estado mental: início agudo ou flutuação, desatenção, pensamento desorganizado, nível de consciência (CAM)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Abdome distendido e fecaloma; retenção urinária", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Casa: circulação livre, tapetes fixos, fios fora do chão, iluminação até nos degraus, barras e antiderrapante no banheiro, corrimão dos dois lados", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Condição da moradia: água, energia, acesso, cômodo com janela para o leito, organização e higiene", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Sinais de negligência: higiene precária, roupa suja, falta de alimento, medicação dada errada", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  naoperder: {
    fonte: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012 · MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      { t: "O cuidador também é paciente da equipe: sobrecarga, depressão e doença crônica própria", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Acamado com indicação de cuidados paliativos ainda não reconhecida: pergunta surpresa e SPICT-BR", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Quanto mais dependente, maior o risco de violência contra a pessoa idosa", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Idoso que mora só: avaliar; sem família, a equipe busca pessoas da comunidade para o cuidado", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Constipação no acamado causa desconforto, náusea, retenção urinária e até agitação e confusão", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "O mesmo paciente migra entre AD1, AD2 e AD3 conforme evolui: reclassificar a cada piora ou melhora", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" }
    ]
  },

  ddx: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      "Delirium × demência — no delirium, início agudo e curso flutuante, com desatenção",
      "Delirium hipoativo × depressão — apatia e sonolência de instalação aguda, com desatenção, sugerem delirium",
      "Diarreia verdadeira × diarreia paradoxal — fezes líquidas saindo ao redor de um fecaloma no acamado constipado",
      "Lesão de fim de vida (úlcera terminal de Kennedy, lesão de Trombley-Brennan) × lesão por pressão por falha de cuidado — início súbito, em pera, borboleta ou ferradura, mesmo com prevenção, horas a semanas antes do óbito"
    ]
  },

  conduta: {
    fonte: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012",
    itens: [
      "AD1, da equipe da USF: problema de saúde controlado, dificuldade ou impossibilidade de ir à unidade, cuidado de menor complexidade, uma visita por mês, ajustada pela avaliação clínica — a frequência da visita ao acamado é clínica, pela modalidade",
      "AD2: precisa de visita pelo menos semanal até estabilizar; AD3: o mesmo, com equipamento ou procedimento especial — as duas são da EMAD com EMAP (Melhor em Casa)",
      "Município sem SAD: a equipe monta o projeto terapêutico com o NASF e a atenção especializada, e avalia se a internação serve melhor",
      "Plano de cuidados (PTS no caso complexo): condutas, serviços a acionar, periodicidade das visitas, papel de cada membro e o profissional de referência",
      "Pactuar com a família em reunião e registrar o consentimento do usuário, se consciente, ou do representante legal",
      "Orientar por escrito o cuidador, deixar registrado no prontuário domiciliar e supervisionar a execução: cuidados diários, sinais de gravidade, quem chamar",
      "Disfagia, reabilitação ou cuidado paliativo: acionar a equipe multiprofissional de apoio (eMulti, antigo NASF: fisioterapeuta, terapeuta ocupacional, fonoaudiólogo)",
      "Mudança de decúbito: atribuição do cuidador, ensinada e supervisionada pela equipe",
      { t: "Escala de Coelho-Savassi: prioriza as famílias do território para a visita de busca ativa e prevenção da equipe (R3 primeiro), não a visita ao acamado — pontuação na queixa Abordagem familiar", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      "Cuidar do cuidador: Zarit periódico, grupo de cuidadores, rodízio com outros familiares",
      { t: "Casa segura: tirar tapetes soltos e fios do chão, iluminar a escada, barras e piso antiderrapante no banheiro, banho sentado e banheiro destrancado", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Cabeceira elevada entre 30 e 45 graus no acamado com náusea ou vômito, contra a broncoaspiração", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      "Óbito em casa do paciente cadastrado e acompanhado, sem suspeita de morte violenta: a declaração de óbito é do médico da equipe disponível"
    ]
  },

  erros: {
    fonte: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012 · MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      { t: "Manter a mesma frequência de visita ao acamado sem reclassificar a modalidade (AD1, AD2, AD3) pela avaliação clínica", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Impor o plano de cuidado à família, em vez de pactuar", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Examinar o paciente e não perguntar pelo cuidador", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Dar a orientação de boca e ir embora: o que é simples para a equipe é complexo para a família", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Delegar ao cuidador medicação por via parenteral", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Prometer cicatrização da lesão de pele no fim de vida: o objetivo passa a ser conforto", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Conter fisicamente o acamado agitado: piora a agitação e causa lesão por pressão, broncoaspiração e delirium prolongado", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Passar sonda para alimentar no fim de vida sem discutir objetivos: desconforto, vômito e broncoaspiração", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Atestar como assistido o óbito de quem a equipe não acompanhava (sem assistência: SVO onde houver; sem SVO, médico do serviço público mais próximo, anotando 'sem assistência médica'), ou atestar com suspeita de morte violenta (vai ao perito médico-legal, IML)", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "paliativos-aps",
  nome: "Cuidados paliativos na APS",
  kw: "cuidados paliativos paliativo doenca grave terminal terminalidade fim de vida spict pergunta surpresa necpal dor escada analgesica opioide morfina codeina dispneia nausea vomito constipacao delirium sororoca ronco da morte hipodermoclise diretivas antecipadas planejamento antecipado reuniao familiar ortotanasia luto sedacao paliativa",
  tag: "Crônico",
  mod: "aps",
  tema: "T3-Risco-Acamados-Paliativos",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      "Em uso de opioide: miose bilateral, sedação e frequência respiratória abaixo de 10 por minuto — intoxicação: não dar a próxima dose",
      "Mioclonia em uso de opioide: neurotoxicidade, comum na desidratação — hidratar, reduzir a dose ou trocar o opioide",
      "Confusão aguda e flutuante (delirium): procurar e tratar causa reversível antes de pensar em sedar",
      "Suspeita de obstrução intestinal maligna: procinético é evitado — caso para equipe especializada",
      "Hemoptise maciça sem controle: considerar sedação paliativa; toalhas e lençóis escuros reduzem o impacto visual",
      "Dor ou outro sintoma de difícil controle apesar de tratamento otimizado: acionar cuidado paliativo especializado",
      "Sinais de processo ativo de morte (sonolência prolongada, respiração irregular, pele fria e acinzentada, queda da diurese, sororoca): avisar a família e ajustar a prescrição para conforto",
      "Família cuidando em casa sem saber o que fazer e para quem ligar em sintoma descontrolado ou no óbito",
      { t: "Dor nas costas com déficit neurológico novo em paciente com câncer (compressão medular): critério de urgência e encaminhamento não descritos no Manual — conferir no protocolo local", v: true }
    ]
  },

  perguntas: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      "Pergunta surpresa: eu me surpreenderia se este paciente morresse nos próximos 12 meses?",
      "Indicadores gerais do SPICT-BR: internação não programada, mais da metade do dia na cama ou cadeira, dependência para cuidado pessoal, perda de peso em 3 a 6 meses, sintoma persistente apesar do tratamento, pedido de foco em qualidade de vida",
      "O que você entende da sua doença e do que pode acontecer? Quer saber mais? Com quem prefere que eu fale?",
      "O que é mais importante para você agora? O que vem à cabeça quando pensa no futuro?",
      "Se um dia não puder decidir, com quem devemos conversar sobre o seu tratamento?",
      "Dor: nota de 0 a 10, onde, como é (queimação, choque, formigamento sugerem dor neuropática), o que piora e alivia",
      "Falta de ar, náusea ou vômito, última evacuação, sono, confusão, boca seca",
      "Usa opioide? Quantos resgates por dia? Tem laxante prescrito junto?",
      "Quem cuida? Como está o cuidador? Divide as tarefas com alguém?",
      "Onde gostaria de ser cuidado e de morrer? Há rituais, despedidas ou pendências a resolver?"
    ]
  },

  exame: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      "Dor em quem não fala: PAINAD por 5 minutos, em repouso e durante o cuidado",
      "Dor que parece neuropática: DN4 — 4 ou mais pontos indica dor neuropática",
      "Dispneia: frequência respiratória, musculatura acessória, cianose, edema, ascite — saturação normal não exclui dispneia",
      "Abdome e reto: distensão, fecaloma; bexiga: retenção urinária",
      "Boca: secura, lesões, higiene — cuidado redobrado na fase final",
      "Pele: lesão por pressão e lesões de fim de vida (Kennedy, Trombley-Brennan)",
      "CAM: início agudo ou flutuação e desatenção, mais pensamento desorganizado ou alteração da consciência = delirium",
      "Local de hipodermóclise, se houver: edema, calor, rubor, dor, endurecimento ou secreção pedem nova punção a pelo menos 5 cm"
    ]
  },

  naoperder: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      "Constipação por opioide não cria tolerância: laxante de horário desde a primeira dose",
      "Náusea pelo opioide costuma ceder em dias; persistindo apesar do antiemético, trocar o opioide",
      "Dor total: componentes físico, psicológico, social, familiar e espiritual",
      "Estresse do cuidador e luto antecipatório — raiva contra a equipe pode ser pedido de ajuda",
      "Medicação profilática (estatina, antiagregante, heparina) perde sentido nos últimos dias de vida",
      "Hidratação e dieta artificiais no fim da vida pioram edema, dispneia e sororoca",
      "Identificar a demanda de paliativo não contraindica tratamento modificador da doença"
    ]
  },

  farmaco: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — Nota Técnica nº 2/2026-DAET (medicamentos em cuidados paliativos), 2026",
    itens: [
      { t: "Escada da OMS, pela boca e pelo relógio: não opioide, depois opioide fraco, depois opioide forte, adjuvante em qualquer degrau; via oral primeiro, horário fixo e resgate prescrito", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Resgate: no opioide fraco, com o próprio opioide; no opioide forte, com morfina simples; três ou mais resgates por dia: considerar ajustar a dose de horário", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Antes de opioide forte: otimizar o resto, levantar risco de uso indevido (uso prévio de substância, transtorno mental) e discutir risco e benefício, sobretudo na dor crônica não oncológica", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Dispneia: opioide em dose menor que a da dor; benzodiazepínico só junto com o opioide. Clonazepam em gotas, pela linha 'Paliativo — dispneia' do cartão (no formulário; Manual p. 190), começando pelo menor degrau e vigiando sedação e respiração", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Náusea pela causa: química (opioide, uremia) com antidopaminérgico; estase gástrica com procinético; obstrução intestinal maligna com haloperidol e antissecretor, sem procinético", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Delirium: tratar a causa; antipsicótico só para agitação com risco, nunca para prevenir. Benzodiazepínico não, salvo abstinência de álcool ou benzodiazepínico, ou sedação paliativa no delirium refratário", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Haloperidol no delirium hiperativo com risco (Manual p. 200–201), na náusea química e na obstrução intestinal maligna, onde é a droga de escolha (p. 173–174): dose por idade e por indicação nas linhas 'Paliativo' do cartão (no formulário), não a faixa de psicose; idoso começa com metade da dose do jovem; via oral sempre que possível; na via SC ou na hipodermóclise, só a solução injetável comum — nunca o decanoato (depósito; quadros das p. 173 e 202)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Midazolam só na sedação paliativa do sintoma refratário, decidida com paciente, família e equipe (EMAD ou paliativo especializado): esquema na linha 'Paliativo — sedação paliativa' do cartão (no formulário; Manual p. 303–305); o alvo é o conforto, não a sedação profunda — sintoma controlado, mesmo acordado, não subir a infusão; sem bomba de infusão ou sem midazolam injetável, o Manual começa com clorpromazina (p. 305); as linhas de indutor do sono do cartão não servem para sedação nem para dispneia", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Naloxona só na depressão respiratória grave por opioide no paliativo: pequena dose repetida, sem a escalada do SAMU, até frequência respiratória acima de 10, mesmo sem acordar por completo, para não reverter toda a analgesia nem precipitar abstinência (Manual p. 158–159)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Amitriptilina como adjuvante na dor neuropática: dose nas linhas 'Paliativo' do cartão (no formulário; Manual p. 162) — o efeito analgésico costuma vir em dose baixa, e dose mais alta fica para a depressão associada, não para a dor; idoso começa mais baixo; evitar na arritmia e no glaucoma", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Sororoca: reduzir hidratação e dieta, decúbito lateral, depois anticolinérgico (escopolamina)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Sem via oral: hipodermóclise, com no máximo três medicamentos compatíveis por sítio no mesmo horário", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "O que a NT recomenda que a rede tenha: lista essencial conforme a RENAME, referencial para estados e municípios; morfina, codeína, metadona e gabapentina são do Componente Especializado, fora da farmácia da USF", f: "MS — Nota Técnica nº 2/2026-DAET (medicamentos em cuidados paliativos), 2026" },
      { t: "Haloperidol na hipodermóclise (Manual p. 348): bolus lento, diluído em soro fisiológico; solução preparada concentrada vai em água destilada, porque o haloperidol precipita no soro — volume e concentração-limite na tabela da p. 348", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" }
    ]
  },

  formulario: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — Nota Técnica nº 2/2026-DAET (medicamentos em cuidados paliativos), 2026",
    farmacos: [
      {
        id: "dipirona",
        papel: "não opioide do primeiro degrau; mantida ao lado do opioide; vai por hipodermóclise"
      },
      { id: "paracetamol", papel: "não opioide do primeiro degrau, somável ao opioide" },
      {
        id: "codeina",
        papel: "opioide fraco do segundo degrau; também dispneia leve, tosse e diarreia sem fecaloma; muito constipante"
      },
      {
        id: "morfina",
        papel: "opioide forte de escolha e resgate de qualquer opioide forte; dispneia moderada ou intensa"
      },
      {
        id: "metoclopramida",
        papel: "náusea química ou por estase gástrica; evitar na obstrução intestinal maligna"
      },
      {
        id: "dexametasona",
        papel: "adjuvante na dor óssea e na compressão medular; anorexia, náusea, dispneia"
      },
      {
        id: "butilbrometo-de-escopolamina",
        papel: "sororoca e broncorreia; antissecretor na obstrução intestinal maligna; fora da RENAME"
      },
      { id: "bisacodil", papel: "laxante irritativo de escolha na constipação por opioide; fora da RENAME" },
      { id: "lactulose", papel: "laxante osmótico, associado quando o irritativo não basta" },
      {
        id: "haloperidol",
        outra: true,
        linha: "Paliativo, idoso — delirium",
        papel: "delirium hiperativo com risco, depois das medidas não farmacológicas e nunca para prevenir; náusea química; droga de escolha na obstrução intestinal maligna — dose por idade e por indicação nas linhas 'Paliativo' do cartão; via oral sempre que possível; na via parenteral, nunca o decanoato"
      },
      {
        id: "midazolam",
        outra: true,
        linha: "Paliativo — sedação paliativa",
        papel: "sedação paliativa do sintoma refratário, decidida com paciente, família e equipe (EMAD ou paliativo especializado); o injetável não consta da RENAME; as linhas de indutor do sono do cartão não servem aqui"
      },
      {
        id: "naloxona",
        outra: true,
        linha: "Paliativo — intoxicação grave",
        papel: "intoxicação grave por opioide no paliativo: repetir a mesma dose pequena, sem a escalada do SAMU, e parar quando a respiração voltar, mesmo sem despertar por completo — reverte a analgesia e pode precipitar abstinência"
      },
      {
        id: "amitriptilina",
        outra: true,
        linha: "Paliativo, idoso — dor",
        papel: "adjuvante na dor neuropática: o efeito analgésico vem em dose baixa, sem subir à faixa antidepressiva; a dose fechada é a do idoso — a do adulto está na outra linha 'Paliativo' do cartão; não recomendada na arritmia e no glaucoma"
      },
      {
        id: "clonazepam",
        outra: true,
        linha: "Paliativo — dispneia",
        papel: "ansiedade que acompanha a dispneia: só junto com o opioide, em gotas, pelo menor degrau, vigiando sedação e respiração"
      }
    ],
    combos: ["pal-opioide-laxante", "pal-dispneia-opioide-ansiolitico"],
    proibidos: ["pal-metoclopramida-ondansetrona", "pal-bzd-delirium"],
    dosemuda: []
  },

  conduta: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      "SPICT-BR ou pergunta surpresa positivos: revisar o tratamento atual, acordar objetivos com a pessoa e a família, planejar antes da perda cognitiva, registrar e coordenar o plano",
      "Cuidado paliativo geral é da equipe da USF: dor e sintomas básicos, depressão e ansiedade básicas, conversa sobre prognóstico e objetivos, acolhimento da família",
      "Acionar o paliativo especializado (matriciamento ou cuidado compartilhado): sintoma de difícil controle (dor neuropática refratária, obstrução intestinal maligna), luto complicado, angústia existencial, conflito na família ou entre equipes, dúvida de futilidade terapêutica",
      "Planejamento antecipado em etapas: capacidade de decidir, permissão, o que já sabe, valores, informação sem eufemismo, quem decide por ele, registrar e revisar após cada internação",
      "Diretivas antecipadas ditas ao médico vão para o prontuário — não exigem cartório nem testemunha (Resolução CFM nº 1.995/2012)",
      "Reunião familiar: pré-reunião da equipe, não mais profissionais que familiares, começar pelo cuidador principal, resumir a história, ir ao objetivo, checar o que entenderam, registrar",
      "Dispneia: tratar a causa quando proporcional; ambiente ventilado, leque no rosto, posicionamento; oxigênio só no hipoxêmico",
      "Náusea: alimento frio, refeição pequena, sem líquido junto, cabeceira entre 30 e 45 graus, ambiente sem odor",
      "Constipação: prevenir já ao começar o opioide; líquido, dieta laxativa, privacidade e acesso ao vaso; impactação ou via oral impossível, supositório de glicerina ou lavagem",
      "Delirium: tratar a causa, suspender o fármaco suspeito, óculos e aparelho auditivo, relógio e calendário, luz de dia e escuro à noite, família por perto",
      "Últimos dias: suspender o profilático, evitar hiper-hidratação e dieta forçada, manter analgésico e anticonvulsivante, e explicar cada suspensão à família",
      "Ortotanásia (Resolução CFM nº 1.805/2006): limitar ou suspender o que só prolonga a vida na fase terminal, mantendo o alívio de sintomas, respeitada a vontade do paciente ou do representante, com registro",
      { t: "Óbito em casa do paciente acompanhado, sem suspeita de morte violenta: a declaração de óbito é do médico da equipe", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" }
    ]
  },

  erros: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      "Indicar paliativo só na terminalidade",
      "Dizer 'não há mais nada que possamos fazer'",
      "Prescrever opioide sem laxante",
      "Analgésico só 'se dor', sem horário",
      "Tratar a falta de ar pela saturação: oxigênio em quem não está hipoxêmico não alivia",
      "Benzodiazepínico sozinho na dispneia",
      "Antipsicótico para prevenir delirium, ou contenção física no agitado",
      "Metoclopramida na obstrução intestinal maligna",
      "Triturar morfina de liberação prolongada para dar pela sonda",
      "Discutir planos e decisões com o sintoma ainda descontrolado",
      "Pedir exame que não muda a decisão naquela fase da doença",
      "Suspender medicação sem explicar: a família lê como abandono"
    ]
  },

  scores: ["nota-conferencia", "ckdepi"]
});

QUEIXAS.push({
  id: "abordagem-familiar",
  nome: "Abordagem familiar: genograma, ecomapa e risco familiar",
  kw: "abordagem familiar familia genograma arvore familiar ecomapa apgar familiar funcionalidade familiar coelho savassi escala de risco familiar priorizar visita domiciliar ciclo de vida pts projeto terapeutico singular reuniao familiar cuidador zarit violencia intrafamiliar maus tratos conselho tutelar",
  tag: "Programa",
  mod: "aps",
  tema: "T2-Familia",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      "Sinais de violência intrafamiliar contra a pessoa idosa (física, psicológica, sexual, financeira, negligência, abandono): suspeita é de notificação obrigatória",
      { t: "Suspeita ou confirmação de maus-tratos contra criança ou adolescente: denúncia obrigatória ao Conselho Tutelar (ECA, arts. 13, 18 e 245)", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      "APGAR familiar de 0 a 4: elevada disfunção — ambiente estressante que pode pedir intervenção urgente",
      "Idoso tratado como 'bode expiatório' das crises da família: situação grave, a equipe trabalha com a família",
      "Cuidador sobrecarregado: fator de risco para violência contra o idoso e para o adoecimento do próprio cuidador",
      { t: "Dependente que mora só, sem ninguém disponível em caso de necessidade", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Família R3 na Escala de Coelho-Savassi (escore 9 ou mais): risco máximo, prioridade de visita", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "Risco iminente à segurança da pessoa ou de outros na casa: SAMU 192", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · MS — Caderneta Brasileira da Pessoa Idosa, 2026",
    itens: [
      { t: "Quem mora na casa? Parentesco, idade e como você se dá com cada um (bem, mais ou menos, mal)", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Se mora só: a quem procura quando precisa de ajuda?", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "APGAR familiar, cinco perguntas sobre satisfação com a família — adaptação, companheirismo, desenvolvimento, afetividade, capacidade resolutiva: sempre 2, algumas vezes 1, nunca 0", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Quem provê e quem cuida? Os papéis mudaram com a doença?", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Cônjuge, viuvez no último ano, visitas regulares de familiares ou amigos, alguém dependente sob seus cuidados?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Lê e escreve? Renda própria suficiente, BPC ou Bolsa Família, moradia própria?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Participa de igreja, grupo de convivência, trabalho ou outra atividade fora de casa?", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Para o genograma: doenças crônicas, hábitos (tabaco, álcool, atividade física) e mortes na família, com a causa", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Para a escala de risco: acamado, deficiência física ou mental, saneamento, desnutrição grave, drogadição, desemprego, analfabetismo, menor de 6 meses, maior de 70 anos, hipertensão, diabetes, número de moradores e de cômodos", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "A sós com a pessoa idosa: no último ano, alguém gritou, xingou, ameaçou, bateu, sacudiu ou usou seu dinheiro sem sua ordem?", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · MS — Caderneta Brasileira da Pessoa Idosa, 2026",
    itens: [
      { t: "Genograma: partir do doente, pelo menos três gerações, nome e idade dentro do símbolo, doenças, hábitos e mortes anotados; incluir quem não é parente mas cuida", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Genograma e ecomapa a lápis, na Caderneta da Pessoa Idosa (genograma e ecomapa nas páginas próprias), para atualizar sempre", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Ecomapa: família no centro, pessoas e instituições ao redor, linha pelo tipo de vínculo (forte, moderado, superficial, muito superficial, estressante) e setas para o fluxo de recursos", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Zarit no cuidador principal, sem a pessoa cuidada presente", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Moradia: organização e higiene", f: "MS — Caderneta Brasileira da Pessoa Idosa, 2026" },
      { t: "Relação de moradores por cômodo, para a escala de risco", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" }
    ]
  },

  naoperder: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006 · MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023",
    itens: [
      { t: "Família é quem a pessoa considera família, com ou sem vínculo biológico", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Família funcional é recurso terapêutico; a disfuncional culpa quem adoeceu, isola o idoso ou se afasta", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Orientação familiar é atributo derivado da APS (Starfield)", f: "medicina-wiki/wiki/mfc-aps-fatos.md (2026-08-03)" },
      { t: "Família que depende da aposentadoria ou pensão de quem está doente", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "O cuidador costuma ser cônjuge ou filha, muitas vezes idoso e com doença crônica", f: "MS — Caderno de Atenção Domiciliar, vol. 1, 2012" },
      { t: "Genograma e ecomapa são retrato do momento: a família muda", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" }
    ]
  },

  conduta: {
    fonte: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004 · MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      { t: "Coelho-Savassi, 3 pontos cada: acamado, deficiência física, deficiência mental, baixas condições de saneamento, desnutrição grave", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "Coelho-Savassi, 2 pontos cada: drogadição, desemprego · 1 ponto cada: analfabetismo, menor de 6 meses, maior de 70 anos, hipertensão, diabetes", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "Coelho-Savassi, moradores por cômodo: maior que 1 = 3 pontos · igual a 1 = 2 · menor que 1 = 0", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "Classificação do escore da família: 5 ou 6 = R1 · 7 ou 8 = R2 · 9 ou mais = R3; abaixo de 5, sem risco classificado", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "Aplicar em reunião de equipe com os dados do cadastro do ACS, pontuando o núcleo familiar; se toda a área não tem saneamento, isso é risco da área, não da família", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "APGAR: 7 a 10 boa funcionalidade · 5 e 6 moderada disfunção · 0 a 4 elevada disfunção", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Idoso dependente ou família disfuncional: elaborar projeto terapêutico", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "PTS em reunião de equipe para o caso de maior gravidade ou risco: avaliação, problemas em ordem de prioridade, metas de curto, médio e longo prazo, responsáveis, monitoramento", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Gestor do PTS: o profissional com melhor vínculo com o usuário; toda proposta da equipe é negociada com ele", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Reunião familiar para decisão, conflito ou cuidador inseguro: pré-reunião da equipe, não mais profissionais que familiares, começar pelo cuidador principal, checar o que entenderam, registrar", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Violência contra a pessoa idosa: notificar na ficha de violência e encaminhar conforme a rede local — Conselho Municipal dos Direitos da Pessoa Idosa, delegacia, CRAS, Ministério Público", f: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006" },
      { t: "Criança ou adolescente: suspeita ou confirmação de maus-tratos vai, além da ficha de notificação, ao Conselho Tutelar (ECA, arts. 13, 18 e 245), com relato do caso", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
      { t: "Situar a família no ciclo de vida familiar e nas crises previsíveis de cada fase: a fonte de referência (material UNA-SUS) não baixou", v: true }
    ]
  },

  erros: {
    fonte: "MS — CAB nº 19, Envelhecimento e Saúde da Pessoa Idosa, 2006",
    itens: [
      { t: "Visitar por ordem de pedido, sem estratificar o risco das famílias", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      { t: "Pontuar a pessoa em vez do núcleo familiar na escala de risco", f: "Coelho & Savassi — Escala de Risco Familiar, Rev Bras Med Fam Comunidade, 2004" },
      "Genograma só com laço de sangue, deixando de fora quem cuida",
      "Genograma de uma geração, sem doenças, hábitos e mortes",
      "Aplicar o Zarit com a pessoa cuidada presente",
      "Perguntar sobre violência na frente do familiar",
      "Tratar o idoso como causa da crise e institucionalizar sem trabalhar a família",
      "Fechar o PTS na equipe sem negociar com o usuário",
      { t: "Tomar partido no conflito da família durante a reunião", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" }
    ]
  },

  scores: ["nota-conferencia"]
});

QUEIXAS.push({
  id: "sifilis-ist",
  nome: "IST e sífilis — consulta na USF",
  kw: "ist dst sifilis vdrl rpr teste rapido treponemico benzatina penicilina corrimento uretral vaginal cervicite gonorreia clamidia tricomonas tricomoniase vaginose candidiase ulcera genital cancro herpes dip doenca inflamatoria pelvica verruga condiloma hpv parceria notificacao hiv hepatite",
  tag: "Agudo",
  mod: "aps",
  tema: "TC-Clinica-Prevalente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Gestante com teste rápido de sífilis reagente: tratar na mesma consulta, sem esperar o teste complementar — esperar é perder a chance de evitar a sífilis congênita",
      { t: "Gestante no esquema de 3 doses: não veio no 7º dia → busca ativa imediata; dose perdida ou intervalo acima de 9 dias → reiniciar o esquema inteiro", f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
      "Sífilis com sinal neurológico, ocular ou auditivo (uveíte, baixa visual, paralisia de par craniano, meningite, confusão, mudança de comportamento) ou com sífilis terciária ativa (gomas, aortite): punção lombar para neurossífilis e encaminhar — neurossífilis confirmada é tratada internada, e o quadro neurológico pode aparecer já na sífilis recente",
      "Pessoa vivendo com HIV e sífilis: exame neurológico minucioso; qualquer sinal ocular ou neurológico → especialista sem demora e punção lombar",
      "DIP com critério de internação: abscesso tubo-ovariano, gravidez, estado geral grave (náusea, vômito, febre), intolerância à via oral ou seguimento difícil, sem melhora em 72 horas, ou emergência cirúrgica não excluída (apendicite, ectópica)",
      "Dor pélvica aguda com sangramento vaginal, atraso menstrual, parto ou aborto recente, defesa abdominal ou febre (axilar acima de 37,5 °C): referenciar — não é DIP de ambulatório",
      { t: "Relato ou suspeita de violência sexual: atendimento de urgência. PEP do HIV até 72 horas; contracepção de emergência até 5 dias (quanto antes, melhor); profilaxia de IST na hora, sem prazo-limite (seguir a queixa de PrEP e PEP)", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Violência sexual: notificação em até 24 horas, na esfera municipal; o atendimento na saúde não exige boletim de ocorrência",
      "IST ou verruga anogenital em criança: suspeitar de abuso sexual; violência contra criança, adolescente ou pessoa idosa → comunicar o conselho tutelar ou órgão de proteção imediatamente",
      "Febre com lesões de pele, artrite ou tenossinovite em quem tem gonorreia: infecção gonocócica disseminada — o esquema é outro, não a dose única",
      "Anafilaxia após a benzatina é rara, mas a USF que aplica precisa estar pronta: adrenalina é a droga de escolha"
    ]
  },

  perguntas: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Avisar que as perguntas são as mesmas para todos e que a consulta é sigilosa; usar termos neutros (parceria, não marido ou namorada)",
      "Parcerias: quantas no último ano; homens, mulheres ou ambos; alguém novo ou desconhecido nos últimos 3 meses",
      "Práticas nos últimos 3 meses: anal, vaginal, oral; receptiva ou insertiva — define onde colher o exame",
      "Preservativo: usa, com quem e quando; álcool ou drogas no sexo; já trocou sexo por dinheiro ou drogas",
      "Já foi forçado(a) ou pressionado(a) a ter relação sexual?",
      "IST anterior: qual, quando, tratou? A parceria tratou?",
      "Testes anteriores de HIV, sífilis, hepatites B e C (quando e resultado) e vacinas de hepatite B, hepatite A e HPV",
      "Sífilis prévia: tratamento documentado (data, droga, número de doses) e VDRL ou RPR depois dele — é o que separa cicatriz sorológica de reinfecção",
      "Pode estar grávida? Data da última menstruação, desejo de ter filhos, método contraceptivo em uso",
      "Corrimento: cor, consistência, odor, prurido, irritação; duchas, higiene íntima, medicamento tópico ou sistêmico",
      "Úlcera: dói ou não, quantas, teve bolha antes, há quanto tempo (mais de 4 semanas muda a conduta)",
      "Alergia à penicilina: o que aconteceu, há quantos anos, como foi tratada; usou penicilina, amoxicilina ou cefalosporina depois?"
    ]
  },

  exame: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Genitália externa e região anal; afastar os lábios e ver o introito vaginal inteiro",
      "Especular: paredes, fundo de saco e colo — muco-pus, friabilidade, sangramento ao toque, colo em framboesa",
      "pH vaginal com a fita na parede lateral por 1 minuto, sem tocar o colo; teste das aminas com KOH 10%",
      "Toque bimanual: dor à mobilização do colo, dor à palpação dos anexos, massa pélvica",
      "Dor pélvica: sinais vitais, temperatura e abdome (defesa, dor à palpação)",
      "Uretra: corrimento mucoide a purulento, eritema de meato",
      "Úlcera: número, borda, base endurecida ou não, fundo (limpo, necrótico, granuloso), vesículas; linfonodos inguinais (bubão, fístula)",
      "Pele e mucosas: roséola no tronco, lesões palmoplantares com colarinho de escamação, placas mucosas, condiloma plano, alopecia em clareira, madarose, linfonodo epitroclear",
      "Verruga: local, número, tamanho; lesão anal → anuscopia e toque retal; mulher → exame ginecológico completo com preventivo",
      "Pessoa vivendo com HIV com sífilis: exame neurológico minucioso"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Uma pessoa com IST nunca é só uma pessoa: sem tratar a parceria, a cadeia de transmissão continua e a reinfecção volta",
      "Sífilis secundária confundida com alergia ou virose: toda erupção cutânea sem causa definida deve ser testada para sífilis",
      "Condiloma plano da sífilis secundária confundido com verruga do HPV",
      "Neurossífilis e sífilis ocular também na fase recente, não só na tardia",
      "Gravidez ectópica e apendicite atrás de uma suposta DIP: teste de gravidez em toda dor pélvica",
      "Cervicite é assintomática em até 70% a 80%: na mulher jovem, biologia molecular para clamídia e gonococo mesmo com colo normal",
      "Gestante com teste negativo no início: repetir sífilis e HIV no início do 3º trimestre e no parto ou aborto",
      "Uretrite que não melhora: pensar primeiro em reexposição a parceria não tratada e tratamento incompleto",
      "Pessoa com diagnóstico de IST: testar HIV e sífilis no diagnóstico e repetir 4 a 6 semanas depois",
      "Filho de mãe com sífilis: seguir na puericultura com VDRL ou RPR com 1, 3, 6, 12 e 18 meses; subida de 2 diluições ou título persistente aos 6 meses → investigar, tratar e notificar sífilis congênita"
    ]
  },

  ddx: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Sífilis primária (cancro duro) — úlcera geralmente única, indolor, base endurecida, fundo limpo, linfonodo regional",
      "Herpes genital — vesículas agrupadas sobre base eritematosa que viram úlceras dolorosas; na primoinfecção, febre, disúria e adenopatia inguinal dolorosa bilateral",
      "Cancroide — úlceras dolorosas, múltiplas, borda irregular, fundo necrótico de odor fétido; bubão que fistuliza por orifício único",
      "Linfogranuloma venéreo — lesão inicial que passa despercebida, depois adenopatia inguinal unilateral que fistuliza por vários orifícios; proctite no sexo anal receptivo",
      "Donovanose — úlcera de fundo granuloso vermelho vivo que sangra fácil, lesões em espelho, sem adenite",
      "Candidíase vulvovaginal — corrimento grumoso sem odor, prurido, eritema e fissura vulvar, pH abaixo de 4,5",
      "Vaginose bacteriana — corrimento homogêneo perolado, odor fétido pior após o coito e a menstruação, pH acima de 4,5, aminas positivas; não é IST",
      "Tricomoníase — corrimento amarelo-esverdeado bolhoso com odor fétido, colo em framboesa, pH acima de 5; é IST, trata a parceria",
      "Cervicite por gonococo ou clamídia — muco-pus endocervical, colo friável, sangramento ao toque, dor à mobilização do colo",
      "Uretrite gonocócica × não gonocócica — gonocócica: corrimento purulento 2 a 5 dias após a exposição; clamídia: corrimento mucoide discreto, disúria leve, incubação de 14 a 21 dias",
      "Corrimento não infeccioso — muco fisiológico em excesso, vaginite inflamatória descamativa, vaginite atrófica na pós-menopausa, corpo estranho; prurido SEM corrimento sugere dermatite (sabonete, perfume, látex), líquen ou psoríase",
      "DIP × gravidez ectópica, apendicite, infecção urinária, cálculo ureteral, torção ou rotura de cisto ovariano, endometriose"
    ]
  },

  exames: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Teste rápido de sífilis (treponêmico) primeiro, na própria consulta: resultado em até 30 minutos",
      "TR reagente: pedir ao laboratório \"Diagnóstico de sífilis após TR reagente\" — ele faz VDRL ou RPR e devolve o título",
      "Sem TR na unidade: pedir \"Diagnóstico de sífilis\", e o laboratório faz o fluxo completo na mesma amostra",
      "VDRL ou RPR colhido no dia em que o tratamento começa: é a linha de base do seguimento",
      "Toda pessoa com IST: ofertar teste rápido de HIV, hepatite B e hepatite C na mesma consulta",
      "Clamídia e gonococo por biologia molecular no sítio da prática: urina de 1º jato, endocérvice, swab anal ou de orofaringe",
      "Homem com corrimento uretral: Gram da secreção — diplococo Gram-negativo intracelular fecha gonorreia",
      "Corrimento vaginal: pH, KOH e microscopia a fresco quando houver; preventivo e colposcopia não diagnosticam vaginite nem cervicite",
      "DIP: teste de gravidez, hemograma, VHS ou PCR, EAS e urocultura, biologia molecular, ultrassonografia transvaginal",
      "Rastreio: sífilis e HIV anuais até 30 anos com vida sexual ativa; semestrais em gays e HSH, profissionais do sexo, pessoas trans e uso abusivo de álcool e drogas",
      "Gestante: sífilis e HIV na 1ª consulta, no início do 3º trimestre e no parto ou aborto; hepatites B e C na 1ª consulta; clamídia e gonococo na 1ª consulta se até 30 anos",
      "Hepatite C: testar toda pessoa com 40 anos ou mais"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Benzilpenicilina benzatina trata sífilis primária, secundária, latente e terciária e é a única que vale na gestante (qualquer outra droga na gestação é tratamento não adequado); neurossífilis, inclusive ocular ou auditiva, é penicilina cristalina IV, internada",
      "O estágio decide o número de doses: recente (até 1 ano) dose única; tardia ou de duração ignorada, 3 doses semanais",
      "Tratar após um único teste reagente em: gestante, violência sexual, risco de perda de seguimento, sinal de sífilis primária ou secundária, ou sem diagnóstico prévio de sífilis",
      "Gestante assintomática sem tratamento anterior adequado registrado: tratar como sífilis tardia",
      { t: "Intervalo entre doses na gestante: de 7 a 9 dias, contando o dia da dose como D0. Menos de 7 ou mais de 9 = tratamento inadequado. Dose perdida ou mais de 9 dias → reiniciar o esquema inteiro.", f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
      "Fora da gestação, o esquema recomeça se o intervalo entre as doses passar de 14 dias",
      "Doxiciclina substitui a penicilina só quando a benzatina é contraindicada (anafilaxia ou reação grave à penicilina, silicone no local da aplicação), fora da gestação e da amamentação, e com seguimento rigoroso",
      "Gonorreia: ceftriaxona sempre com azitromicina; quinolona não — o gonococo brasileiro é resistente",
      "DIP: três drogas juntas (ceftriaxona, doxiciclina, metronidazol); monoterapia não é recomendada",
      "Gestante: sem doxiciclina, sem quinolona, sem antifúngico oral, sem podofilina e sem imiquimode",
      "A APS aplica benzatina com segurança, na pessoa e na parceria; medo de anafilaxia não justifica encaminhar",
      { t: "Doxiciclina como PEP de IST bacterianas (Portaria SCTIE/MS nº 16/2026, segundo o levantamento de fontes): público, janela e posologia não conferidos — a portaria não está entre as fontes lidas", v: true }
    ]
  },

  conduta: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Sífilis: tratar na consulta, notificar (sífilis adquirida ou sífilis em gestante) e chamar as parcerias; cicatriz sorológica confirmada não se notifica",
      "Parcerias de sífilis dos últimos 90 dias: penicilina presuntiva em dose única, mesmo com teste negativo, e testagem; teste reagente → tratar pelo estágio. Comunicar com o cartão (parte A fica na USF, parte B vai com o caso-índice); sem resposta em 15 dias → telefone, correspondência ou busca ativa, com prioridade para parceria de gestante",
      "Seguimento com VDRL ou RPR, sempre pelo mesmo método: a cada 3 meses até 12 meses; gestante mensal até o parto e depois trimestral até completar 12 meses. O VDRL mensal da gestante e os dos meses 3 e 9 servem para flagrar subida de 2 diluições (reinfecção ou reativação), não para cobrar queda",
      "Resposta adequada: queda de 2 diluições (de 1:32 para 1:8) em até 6 meses na sífilis recente e em até 12 meses na tardia, ou negativação",
      "Retratar paciente e parcerias se: não caiu 2 diluições no prazo, subiu 2 diluições ou mais, ou os sinais persistem ou voltam. Punção lombar para neurossífilis: na população geral, se não houve nova exposição; em PVHIV, em todo retratamento, com ou sem nova exposição",
      { t: "Gestante: tratamento adequado é completo para o estágio, com benzatina, iniciado até 30 dias antes do parto e concluído antes dele, de preferência começando até a 28ª semana; registrar cada dose e o VDRL na caderneta", f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
      "Gestante ou lactante com história de alergia à penicilina: reação leve ou moderada sem anafilaxia → aplicar a benzatina; anafilaxia ou reação grave → encaminhar ou discutir com especialista (gestante comprovadamente alérgica: dessensibilização hospitalar)",
      "Corrimento uretral sem laboratório: tratar gonorreia e clamídia na consulta; persiste após 7 dias → rever reinfecção, adesão e outras causas e tratar Trichomonas; persiste após 14 dias → referenciar",
      "DIP leve sem critério de internação: tratar na hora, colher exames e retornar em 3 dias; sem melhora → referenciar; parcerias dos últimos 2 meses tratadas para gonococo e clamídia",
      "Úlcera sem laboratório: vesículas ativas → herpes; lesão há mais de 4 semanas → sífilis e cancroide, investigar LGV e donovanose e biopsiar; nos demais → sífilis e cancroide; persiste após 14 dias → referenciar",
      "Verruga: gestante, criança, imunossuprimido, lesão volumosa ou disseminada → referenciar; nos demais, imiquimode em casa ou ácido tricloroacético, crioterapia ou exérese na USF; sem melhora significativa em 3 sessões, considerar trocar a terapia",
      "Em toda IST: ofertar vacina de hepatite B (e hepatite A e HPV quando indicadas), preservativo e prevenção combinada — PrEP e PEP na queixa própria"
    ]
  },

  erros: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Esperar o VDRL para tratar a gestante com teste rápido reagente",
      "Dar 2 doses na sífilis secundária, como no protocolo antigo — sífilis recente é dose única",
      "Tratar como recente a sífilis de duração desconhecida — duração ignorada é sífilis tardia",
      "Seguir o tratamento com teste rápido ou FTA-Abs: o treponêmico fica reagente quase sempre, por toda a vida",
      "Ler título isolado de VDRL (\"baixo é falso positivo\"), trocar VDRL por RPR no meio do seguimento ou valorizar variação de uma diluição",
      "Encaminhar para dessensibilização toda \"alergia à penicilina\" sem anamnese — quase todas são descartadas só pela anamnese",
      { t: "Deixar a gestante sair sem as datas das próximas doses marcadas, sem checar se caem em fim de semana ou feriado", f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
      "Tratar a gestante e não chamar a parceria — a gestante tratada fica exposta à reinfecção",
      "Pedir preventivo para diagnosticar corrimento ou cervicite",
      "Tratar a parceria na vaginose bacteriana ou na candidíase sem sintoma",
      "Azitromicina sozinha ou ciprofloxacino para gonorreia",
      "Remover o DIU antes de começar o antibiótico na DIP"
    ]
  },

  formulario: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022 · MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023",
    farmacos: [
      { id: "penicilina-benzatina", papel: "sífilis primária, secundária, latente e terciária, parceria exposta e gestante — a única que conta como tratamento na gestação; neurossífilis não (penicilina cristalina IV)" },
      { id: "ceftriaxona", papel: "gonorreia, uretrite e cervicite sem agente, DIP — associada; isolada só no cancroide (alternativa à azitromicina)" },
      { id: "azitromicina", papel: "clamídia, complemento da ceftriaxona na gonorreia, cancroide; a opção da gestante para clamídia" },
      { id: "doxiciclina", papel: "clamídia e DIP; alternativa à penicilina só fora da gestação e da amamentação" },
      { id: "metronidazol", papel: "vaginose bacteriana, tricomoníase (com a parceria) e componente anaeróbio da DIP" },
      { id: "aciclovir", papel: "herpes genital: primeiro episódio, recidiva e supressão" },
      { id: "nitrato-de-miconazol", papel: "candidíase vulvovaginal, primeira opção, inclusive na gestante" },
      { id: "fluconazol", papel: "candidíase vulvovaginal, segunda opção e recorrente; não na gestante nem na lactante" },
      { id: "imiquimode", papel: "verruga anogenital externa, autoaplicado em casa; não na gestação" },
      { id: "paracetamol", outra: true, papel: "reação de Jarisch-Herxheimer após a benzatina: analgésico simples se necessário, sem suspender o tratamento" },
      { id: "dipirona", outra: true, papel: "reação de Jarisch-Herxheimer após a benzatina: alternativa ao paracetamol, se necessário" }
    ],
    combos: ["ist-gonorreia-dupla", "ist-dip-tripla"],
    proibidos: ["ist-metronidazol-alcool"],
    dosemuda: ["ist-benzatina-estagio", "ist-azitromicina-dose"]
  },

  scores: ["nota-conferencia", "dpp"]
});

/* Agente tb-hanseniase — queixa "tuberculose" (26/10/2026).
 * Base: Manual de Recomendações para o Controle da TB no Brasil, 2ª ed., 2019.
 * Onde NI mais nova altera o Manual, o item cita a NI e diz que ela vale:
 * NI nº 5/2024 (esquema de 4 meses e dispersível na criança), NI nº 2/2024 (3HP
 * em dose fixa), NI nº 25/2025 (volta da rifampicina na ILTB).
 * Páginas lidas por item: ver tb-hanseniase.notas.md. */

QUEIXAS.push({
  id: "tuberculose",
  nome: "Tuberculose — sintomático respiratório, tratamento, contatos e ILTB",
  kw: "tuberculose tb tosse sintomatico respiratorio sr escarro baciloscopia trm genexpert cultura raio x rhze esquema basico tdo iltb infeccao latente ppd prova tuberculinica contato isoniazida rifampicina rifapentina 3hp pirazinamida etambutol sinan",
  tag: "Programa",
  mod: "aps",
  tema: "TC-Clinica-Prevalente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Cefaleia, irritabilidade, sonolência, vômitos, febre e rigidez de nuca por mais de 2 semanas: TB meningoencefálica — internar",
      "Estado geral que não permite tratar em casa, ou intolerância aos fármacos que não se controla no ambulatório: internar",
      "TRM-TB com resistência à rifampicina detectada: repetir o TRM, pedir cultura com TS e mandar IMEDIATAMENTE à referência terciária, sem esperar resultado",
      "Icterícia, ou transaminases 3 vezes o normal com sintomas digestivos (5 vezes sem sintomas): suspender o esquema e encaminhar à referência",
      "Exantema moderado a grave, plaquetopenia, anemia hemolítica, insuficiência renal: suspender — o fármaco suspeito não volta",
      "Baixa de visão ou troca de cores em uso de etambutol (neurite óptica): suspender o etambutol",
      "Psicose, convulsão, encefalopatia ou coma em uso de isoniazida: suspender a isoniazida",
      "Falência: baciloscopia positiva no fim do tratamento, ++ ou +++ que segue positiva até o 4º mês, ou que volta a positivar por 2 meses seguidos a partir do 4º mês — referência",
      "Sem moradia fixa ou com alto risco de abandono, sobretudo em retratamento ou falência: considerar internação"
    ]
  },

  perguntas: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Tosse há quanto tempo? Sintomático respiratório: 3 semanas ou mais na busca ativa do território; 2 semanas ou mais em quem procura a unidade e no diabético",
      "Tosse de QUALQUER duração já é investigação em: contato de TB, PVHIV, pessoa presa, em situação de rua, em abrigo, ILPI ou comunidade terapêutica, indígena, profissional de saúde, imigrante em situação de maior vulnerabilidade",
      "PVHIV: tosse, febre, emagrecimento OU sudorese noturna — qualquer um dos quatro já investiga",
      "Febre no fim da tarde, sudorese noturna, emagrecimento, falta de apetite? Escarro com sangue?",
      "Convive ou conviveu com alguém com TB nos últimos 2 anos (casa, trabalho, prisão, abrigo)?",
      "Já tratou TB? Por mais de 30 dias? Terminou ou abandonou? (caso novo, recidiva ou reingresso após abandono)",
      "HIV, diabetes, doença renal, hepatopatia, álcool, silicose, uso de corticoide ou imunobiológico anti-TNF?",
      "Gestante ou pode engravidar? Usa anticoncepcional hormonal? (a rifampicina derruba o efeito)",
      "Medicamentos em uso: antirretroviral (inibidor de protease, dolutegravir), varfarina, hipoglicemiante oral, enalapril, anticonvulsivante, metadona",
      "No retorno: tomou todas as doses? Observadas por quem? Náusea, coceira, dor nas juntas, formigamento, visão alterada, pele ou olho amarelos?"
    ]
  },

  exame: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Peso em toda consulta: a dose é pela faixa de peso e muda quando o peso muda",
      "Estado geral, temperatura, emagrecimento; ausculta, que pode ser normal mesmo com TB pulmonar",
      "Linfonodos cervicais e supraclaviculares: aumento indolor, assimétrico, aderido, com flutuação ou fístula (TB ganglionar)",
      "Dor pleurítica e sinais de derrame (TB pleural, a extrapulmonar mais comum fora do HIV)",
      "Rigidez de nuca, alteração de consciência, déficit focal ou de par craniano (TB meningoencefálica)",
      "Dor lombar ou torácica baixa, dor à palpação da coluna e sudorese noturna (mal de Pott)",
      "Icterícia e hepatomegalia (hepatotoxicidade, ou TB miliar)",
      "Criança: curva de peso (perda ou retificação), hepatoesplenomegalia, linfonodomegalia, conjuntivite flictenular, eritema nodoso",
      "Adolescente em uso de etambutol: teste de discriminação de cores"
    ]
  },

  naoperder: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Todo diagnóstico de TB: teste rápido de HIV na hora; positivo vai ao SAE",
      "PVHIV com TB: TARV em até 2 semanas se CD4 abaixo de 50 ou sinais de imunodeficiência avançada; na 8ª semana nos demais; na TB meningoencefálica, só após 2 meses; nunca iniciar os dois tratamentos no mesmo dia",
      "Criança contato com até 5 anos: avaliação clínica imediata e ILTB priorizada",
      "TB pulmonar na criança costuma ser abacilífera: baciloscopia ou TRM negativos não descartam — usar o escore de pontos",
      "Criança com pneumonia que não melhora com antibiótico comum: pensar em TB",
      "Criança com TB: procurar entre os contatos o adulto que transmitiu",
      "Antes de tratar ILTB, excluir TB ativa com clínica e raio X — ILTB tratada em quem tem TB ativa é monoterapia e seleciona resistência",
      "Resposta ruim ao esquema básico: pensar em micobacteriose não tuberculosa e em resistência",
      "Diabético com TB: a rifampicina reduz o hipoglicemiante oral — monitorar glicemia e, se não controlar, insulina"
    ]
  },

  ddx: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Câncer de pulmão — tabagista, massa ou nódulo, sem resposta; sobretudo carcinoma epidermoide",
      "Micobacteriose não tuberculosa — sequela de TB, bronquiectasia, resposta ruim ao esquema básico; o TRM não detecta, só a cultura com identificação",
      "Histoplasmose e paracoccidioidomicose — história epidemiológica, nódulos de vários tamanhos, bilaterais e simétricos",
      "Silicose — história ocupacional; e a associação com TB é mais frequente",
      "Pneumonia bacteriana ou abscesso pulmonar — melhora com antibiótico comum",
      "Linfoma × TB pleural — os dois dão derrame linfocítico com ADA alto; o linfoma costuma alargar o mediastino e acometer outras estruturas",
      "Sarcoidose — granuloma sem necrose, linfonodomegalia hilar, pele, olhos e articulações",
      "Vasculite pulmonar — hemoptise e nódulos escavados, mas com doença sistêmica"
    ]
  },

  exames: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "TRM-TB: uma amostra de escarro — exame de escolha no caso novo de adulto e adolescente; resultado em cerca de 2 horas",
      "Sem TRM: baciloscopia em 2 amostras, uma na hora e outra na manhã seguinte ao acordar, e cultura em uma delas",
      "Cultura com teste de sensibilidade: todo TRM positivo, todo TRM negativo com sintoma persistente, populações vulneráveis desde o início e todo retratamento",
      "Retratamento (recidiva ou volta após abandono): baciloscopia + cultura com TS; o TRM só tria resistência à rifampicina",
      "Raio X de tórax em todo suspeito de TB pulmonar, junto com o escarro, nunca no lugar dele",
      "No diagnóstico: teste rápido de HIV; glicemia, função hepática e renal no início do tratamento",
      "Controle: baciloscopia mensal na forma pulmonar; raio X no 2º mês e no fim; o TRM não serve para controle",
      "Criança com baciloscopia ou TRM negativos: escore de pontos — 40 ou mais, iniciar; 30 a 35, a critério médico; abaixo de 25, seguir investigando",
      "Prova tuberculínica: leitura em 48 a 72 horas (até 96), maior diâmetro do endurado, em mm — inclusive 'zero mm'",
      "Trata ILTB com PT ≥ 5 mm: contato, anti-TNF, corticoide em dose alta por mais de 1 mês (o corte por idade está em 'Dose muda a função', no formulário), sequela fibrótica, pré-transplante",
      "PVHIV com raio X normal: trata ILTB se CD4 ≤ 350 ou desconhecido (independente da PT), se contato de TB pulmonar (independente da PT), se PT ≥ 5 mm prévia nunca tratada, ou com CD4 > 350 e PT ≥ 5 mm; cicatriz radiológica sem tratamento prévio também trata, afastada TB ativa",
      "Trata ILTB com PT ≥ 10 mm: diabetes, silicose, diálise, neoplasia hematológica ou de cabeça e pescoço, quimioterapia, baixo peso, tabagismo pesado, calcificação isolada",
      "Conversão (2ª PT com aumento de 10 mm): contato de TB confirmada no laboratório, profissional de saúde, de laboratório de micobactéria, do sistema prisional ou de ILPI. IGRA não está no SUS"
    ]
  },

  farmaco: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Caso novo e retratamento (recidiva, volta após abandono), adulto e criança: esquema básico na própria APS, todos os dias, numa tomada só",
      "A partir de 10 anos: 2RHZE/4RH em comprimidos de dose fixa combinada, pela faixa de peso. Abaixo de 10 anos: sem etambutol (2RHZ/4RH)",
      { t: "A NI nº 5/2024 vale sobre o Manual: TB pulmonar sensível, NÃO grave, sem suspeita de resistência, acima de 3 meses e abaixo de 16 anos pode fazer 4 meses — 2RHZ/2RH abaixo de 10 anos, 2RHZE/2RH de 10 a menos de 16. TB grave segue 6 meses; evolução ruim no esquema curto, estender para 6", f: "MS — Nota Informativa nº 5/2024-CGTM (tuberculose em criança), 2024" },
      { t: "Não grave: linfonodo periférico, intratorácica sem obstrução de via aérea, doença não cavitária num lobo só sem padrão miliar, ou pleural não complicada; TRM não detectado, traços, very low ou low, ou baciloscopia negativa; sintomas leves, sem internação. PVHIV com TB não grave: depende da imunossupressão e do TARV; reavaliar no 4º mês para decidir se estende a 6", f: "MS — Nota Informativa nº 5/2024-CGTM (tuberculose em criança), 2024" },
      { t: "Até 3 meses de idade ou abaixo de 4 kg: doses individualizadas, sem esquema curto. De 4 a 25 kg, abaixo de 10 anos: comprimido dispersível em dose fixa (RHZ, depois RH). 25 kg ou mais: doses individualizadas", f: "MS — Nota Informativa nº 5/2024-CGTM (tuberculose em criança), 2024" },
      { t: "Número de comprimidos dispersíveis por faixa de peso: está no Ofício Circular nº 3/2020 e no folder de mesa de 2023, que não foram baixados — conferir antes de prescrever", v: true },
      "Gestante: esquema básico nas doses habituais, com piridoxina; amamentação mantida, com máscara cirúrgica enquanto a baciloscopia for positiva",
      "Reação adversa menor (náusea, urina laranja, prurido leve, artralgia, neuropatia): manejar na APS sem mudar o esquema; maior: suspender e referência",
      "ILTB no Manual: isoniazida 6 a 9 meses (6H/9H) ou rifampicina 4 meses (4R). Rifampicina preferida acima de 50 anos, abaixo de 10, em hepatopata e na intolerância à isoniazida; isoniazida na PVHIV com inibidor de protease ou dolutegravir",
      { t: "4R voltou: a NI nº 25/2025 revogou a suspensão por falta de insumo (NI nº 33/2024) e restabeleceu os esquemas de ILTB do Manual 2019", f: "MS — Nota Informativa nº 25/2025 (rifampicina na ILTB), 2025" },
      { t: "3HP em dose fixa (rifapentina + isoniazida): acima de 14 anos e de 30 kg, 12 semanas, tomado com alimento; não recomendado em gestante nem lactante; abaixo disso, comprimidos isolados", f: "MS — Nota Informativa nº 2/2024-CGTM (3HP), 2024" },
      { t: "3HP: a NI diz 'comprimidos por semana', sem dizer se é uma tomada só; a dose da criança e as interações da rifapentina estão na NI nº 5/2021, não baixada", v: true }
    ]
  },

  conduta: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "SR identificado: colher escarro na hora (TRM, uma amostra; ou baciloscopia, a 2ª na manhã seguinte) e registrar no livro do SR",
      "TRM detectado sem resistência: iniciar o esquema básico já e pedir cultura com TS. TRM não detectado e o sintoma persiste: cultura com TS e investigar diferenciais",
      "Notificar no Sinan só o caso confirmado (critério laboratorial ou clínico); a ILTB tem ficha própria, recomendada mas não compulsória",
      "Oferecer TDO a todos: observar a tomada nos dias úteis; conta como TDO a partir de 3 vezes por semana (24 doses na fase intensiva e 48 na manutenção, no esquema padronizado de 6 meses), feito por profissional",
      "Consulta mensal: peso e faixa, adesão, efeitos adversos, baciloscopia de controle. Positiva no fim do 2º mês: cultura com TS e mais 30 dias de RHZE",
      "Faltou: buscar já (ACS, telefone, visita). Abandono = mais de 30 dias sem vir após a data marcada (no TDO, contados da última tomada)",
      "Contatos: entrevistar o caso índice já e listar todos; prioridade a sintomáticos, menores de 5 anos, PVHIV, imunossuprimidos e contato de caso com TB resistente; oferecer teste de HIV a todos",
      "Contato com sintoma: escarro + raio X. Sem sintoma, 10 anos ou mais: PT — 5 mm ou mais vai ao raio X (normal: trata ILTB); abaixo de 5 mm, repetir a PT em 8 semanas",
      "Contato abaixo de 10 anos sem sintoma: raio X + PT; PT de 5 mm ou mais com raio X normal trata ILTB, com ou sem BCG; PT sem critério: repetir em 8 semanas; com conversão, tratar ILTB. Contato PVHIV sem sintoma: trata ILTB sem depender da PT",
      "Contato de TB MDR ou XDR: avaliar na referência; não tratar ILTB com isoniazida ou rifampicina — seguir por pelo menos 2 anos. Contato de outra TB resistente: decisão individual pela sensibilidade do caso fonte",
      "Recém-nascido que mora com bacilífero: não vacinar BCG ao nascer; quimioprofilaxia primária (isoniazida ou rifampicina) por 3 meses e então PT",
      "Gestante com ILTB: tratar depois do parto (com HIV, a partir do 3º mês de gestação)",
      "Esquema especial (intolerância, hepatopatia, meningoencefálica ou osteoarticular, falência): referência secundária; resistência: terciária — com TDO compartilhado com a APS",
      { t: "Fluxo local: onde colher, qual laboratório faz TRM e cultura, e as referências secundária e terciária de TB de Feira de Santana — confirmar com a coordenação municipal", v: true }
    ]
  },

  erros: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Esperar 3 semanas de tosse para investigar PVHIV, preso, morador de rua ou contato de TB",
      "Pedir TRM para controle de tratamento, ou para diagnosticar retratamento",
      "Descartar TB na criança por baciloscopia negativa",
      "Tratar ILTB sem antes excluir TB ativa com clínica e raio X",
      "Manter a dose do início sem repesar o paciente",
      "Suspender o esquema por urina alaranjada, náusea ou coceira leve",
      "Esquecer que a rifampicina derruba o anticoncepcional hormonal",
      "Contar como TDO a tomada observada por familiar",
      "Notificar no Sinan o caso apenas suspeito",
      "Repetir a PT em quem já tem PT documentada de 5 mm ou mais",
      { t: "Usar o esquema de 4 meses em TB grave, em bebê de até 3 meses ou abaixo de 4 kg, ou em quem tem 16 anos ou mais", f: "MS — Nota Informativa nº 5/2024-CGTM (tuberculose em criança), 2024" },
      { t: "Prescrever 3HP a gestante ou lactante", f: "MS — Nota Informativa nº 2/2024-CGTM (3HP), 2024" }
    ]
  },

  formulario: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 · MS — Nota Informativa nº 5/2024-CGTM (tuberculose em criança), 2024 · MS — Nota Informativa nº 2/2024-CGTM (3HP), 2024 · MS — Nota Informativa nº 25/2025 (rifampicina na ILTB), 2025",
    farmacos: [
      { id: "rifampicina-isoniazida-pirazinamida-etambutol", papel: "fase intensiva do esquema básico a partir de 10 anos, pela faixa de peso, por 2 meses" },
      { id: "rifampicina-isoniazida", papel: "fase de manutenção a partir de 10 anos: 4 meses, ou 2 no adolescente com TB não grave (NI nº 5/2024)" },
      { id: "rifampicina", papel: "ILTB 4R (preferida acima de 50 anos, abaixo de 10 e em hepatopata) e dose individualizada da criança abaixo de 10 anos com 25 kg ou mais, ou de até 3 meses ou abaixo de 4 kg" },
      { id: "isoniazida", papel: "ILTB 6H ou 9H (escolha na PVHIV com inibidor de protease ou dolutegravir), quimioprofilaxia do recém-nascido e dose individualizada da criança com 25 kg ou mais, ou de até 3 meses ou abaixo de 4 kg" },
      { id: "isoniazida-rifapentina", papel: "ILTB 3HP em dose fixa, acima de 14 anos e de 30 kg, por 12 semanas" },
      { id: "pirazinamida", papel: "fase intensiva da criança abaixo de 10 anos com 25 kg ou mais, ou de até 3 meses ou abaixo de 4 kg, em dose individualizada" },
      { id: "piridoxina", papel: "prevenção da neuropatia da isoniazida em gestante, diabético e PVHIV; criança com HIV ou desnutrida; tratamento da neuropatia" },
      { id: "prednisona", outra: true, papel: "adjuvante na TB meningoencefálica e osteoarticular, iniciado no hospital ou na referência" }
    ],
    combos: [],
    proibidos: ["tb-rifampicina-inducao"],
    dosemuda: ["han-rifampicina-mensal", "tb-corticoide-limiar-iltb"]
  },

  scores: ["nota-conferencia", "dose-peso"]
});

/* Agente tb-hanseniase — queixa "hanseniase" (26/10/2026).
 * Base: PCDT Hanseníase, Portaria SCTIE nº 67, 2022 (texto, Quadro 1, Fluxogramas
 * 1 e 3 do Apêndice A, Anexo C). Páginas lidas por item: ver
 * tb-hanseniase.notas.md. */

QUEIXAS.push({
  id: "hanseniase",
  nome: "Hanseníase — diagnóstico, PQT-U, reações e contatos",
  kw: "hanseniase lepra mancha dormencia sensibilidade nervo espessado neurite pqt pqtu poliquimioterapia paucibacilar multibacilar baciloscopia reacao hansenica reacao reversa eritema nodoso talidomida prednisona clofazimina dapsona ans incapacidade bcg contato sinan",
  tag: "Programa",
  mod: "aps",
  tema: "TC-Clinica-Prevalente",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Neurite aguda — dor espontânea ou à palpação do nervo, com perda de sensibilidade ou de força: corticoide supervisionado imediato, imobilizar o membro e repetir a ANS",
      "Piora da sensibilidade ou da força na ANS sem dor e sem lesão inflamada (neurite silenciosa): indica corticoide do mesmo jeito",
      "Reação tipo 1 — lesões antigas edemaciadas e eritemato-vinhosas, lesões novas, muitas vezes com neurite: tratar imediatamente",
      "Reação tipo 2 com neurite, dor testicular (orquite) ou olho vermelho (episclerite, irite): é corticoide, não só talidomida",
      "Olho vermelho e doloroso, baixa de visão, lagoftalmo ou córnea sem sensibilidade: risco de úlcera de córnea e de cegueira",
      "Eritema nodoso grave — nódulos que necrosam e ulceram, ou febre, artralgia, nefrite: quadro sistêmico",
      "Talidomida e mulher com potencial reprodutivo: proibida na gestação e na amamentação; só em exceção, com 2 métodos (1 de alta eficácia) desde 4 semanas antes e β-hCG nas últimas 24 horas",
      "Talidomida abaixo de 18 anos: não autorizada (o eritema nodoso da criança é tratado com clofazimina, por clínico experiente)",
      "Neurite que não melhora com corticoide em 4 semanas, ou abscesso de nervo: avaliar cirurgia de descompressão"
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Mancha clara ou avermelhada que não sente calor, frio, dor ou toque? Sem suor ou sem pelo? Desde quando?",
      "Dormência, formigamento, agulhadas, choque ou câimbra em mãos e pés? Deixa cair objetos das mãos?",
      "Ferida ou queimadura que não doeu, na mão ou no pé?",
      "Nariz entupido, com sangue ou ressecado, que não passa?",
      "Olhos: ardor, ressecamento, vermelhidão, dificuldade para fechar, visão pior?",
      "Mora ou morou com alguém com hanseníase nos últimos 5 anos? Viveu em área endêmica?",
      "Já tratou hanseníase? Quando terminou? (suspeita de recidiva pede baciloscopia)",
      "Gestante, amamentando ou querendo engravidar? Qual método usa?",
      "Diabetes, HIV, hepatite, uso de corticoide ou de imunobiológico anti-TNF?",
      "Em tratamento: dor nos nervos, febre, dor nas juntas ou nos testículos, olho vermelho, nódulos dolorosos novos na pele?",
      "No retorno: tomou a dose diária? Cansaço e palidez (anemia da dapsona)? Pele escurecendo e urina rosada (clofazimina, esperado)?"
    ]
  },

  exame: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Pele do corpo inteiro, com boa luz — não só a mancha da queixa",
      "Sensibilidade térmica, dolorosa e tátil em cada lesão e nas áreas que o paciente diz dormentes",
      "Contar as lesões: até 5, ou mais de 5",
      "Palpar ulnar, mediano, radial, fibular e tibial posterior: espessamento, dor, choque",
      "Força: extensão do punho, abdução do 5º dedo e do polegar, extensão do hálux, dorsiflexão do pé",
      "Monofilamento em mãos e pés: não sentir o de 2 g (violeta) já é grau 1",
      "Olhos: força para fechar as pálpebras (fenda), sensibilidade da córnea, acuidade visual",
      "Face e orelhas: infiltração, nódulos, perda de cílios e sobrancelhas (madarose)",
      "Grau de incapacidade física — 0, 1 ou 2 — e escore OMP, anotados no diagnóstico"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Forma neural pura: sem lesão de pele, nervo espessado com déficit — referenciar para investigação",
      "Virchowiana: a lesão pode ter sensibilidade normal; o diagnóstico vem do nervo espessado e da baciloscopia",
      "Indeterminada: poucas manchas claras discretas, às vezes só sem sensibilidade ao calor — é a fase em que tratar evita sequela",
      "Menor de 15 anos com hanseníase indica transmissão recente: examinar todos os contatos",
      "Reação aparece antes, durante ou depois da PQT-U — até 5 anos após a alta",
      "Corticoide alivia a dor mas não protege o nervo: ANS seriada durante toda a corticoterapia",
      "Rastrear TB, hepatites B e C, HIV, HTLV-1, estrongiloidíase, diabetes e, em área endêmica, Chagas e leishmaniose",
      "Avaliação odontológica: foco dentário precipita reação",
      "Estigma e sofrimento psíquico: perguntar, acolher, oferecer apoio psicossocial"
    ]
  },

  ddx: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Reação tipo 1 × tipo 2 — tipo 1: piora das lesões que já existiam e neurite, em PB ou MB; tipo 2: nódulos dolorosos novos em pele sem lesão, com febre e mal-estar, só em MB",
      "Forma neural pura × neuropatia diabética, alcoólica, autoimune, nutricional, do hipotireoidismo ou do HIV — avaliação por neurologista com experiência em hanseníase",
      "Artrite da hanseníase × artrite reumatoide, lúpus, espondiloartropatia",
      "Uveíte, nefrite, hepatite ou vasculite sem causa clara em área endêmica: pode ser reação hansênica atípica",
      { t: "Mancha com sensibilidade normal — pitiríase versicolor, vitiligo, pitiríase alba, dermatofitose, eczemátide: o teste de sensibilidade é o que separa", v: true }
    ]
  },

  exames: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Diagnóstico clínico: basta 1 dos 3 sinais cardinais — lesão com alteração de sensibilidade; nervo espessado com alteração sensitiva, motora ou autonômica; bacilo na baciloscopia ou na biópsia",
      "Baciloscopia do raspado intradérmico (lesões, lóbulos das orelhas, cotovelos): na dúvida de diagnóstico ou de classificação e na suspeita de recidiva — deve existir na APS",
      "Baciloscopia negativa não exclui (o PB é negativo); positiva fecha o diagnóstico e classifica como MB",
      "PB: até 5 lesões E baciloscopia negativa. MB: mais de 5 lesões, ou 2 ou mais nervos comprometidos, ou baciloscopia positiva. Na dúvida, MB",
      "Teste rápido anti-PGL-1: só na investigação de contato — nunca diagnostica caso sozinho",
      "Hemograma nos primeiros meses de PQT-U (dapsona), com mais atenção na mulher e no idoso",
      "Antes da talidomida: β-hCG nas últimas 24 horas e neutrófilos (abaixo de 750/mm³ não inicia)",
      "Dúvida que persiste após clínica e baciloscopia: biópsia e exames especiais na Atenção Especializada"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "PQT-U (rifampicina + clofazimina + dapsona) para todo caso, PB ou MB, desde 2021",
      "PB: 6 doses mensais em até nove meses. MB: 12 doses mensais em até 18 meses",
      "Blíster pelo PESO: Adulto acima de 50 kg; Infantil de 30 a 50 kg (vale para adulto magro); abaixo de 30 kg, dose por kg. Mensal supervisionada na unidade, diária em casa",
      "Não estender além de 12 doses: lesão que regride devagar não é falha; suspeita de persistência vai para investigação de resistência",
      "Na reação, a PQT-U continua; reação depois da alta não reabre a PQT-U, salvo recidiva",
      "Reação tipo 1 e neurite: prednisona com redução lenta, no mínimo seis meses em média; ao iniciar, profilaxia de estrongiloidíase",
      "Reação tipo 2 sem neurite, orquite ou olho acometido: talidomida em adulto; com corticoide associado, AAS profilático",
      "Pentoxifilina: alternativa no eritema nodoso quando a talidomida não pode (por exemplo, mulher com potencial reprodutivo, sem neurite); contraindicada abaixo de 18 anos",
      "Gestação: manter a PQT-U; rifampicina nas últimas semanas pode causar hemorragia na mãe e no recém-nascido — vitamina K. Amamentação: não suspender",
      "Rifampicina mensal e anticoncepcional oral: efeito pouco provável, mas o PCDT manda trocar ou associar método — abordar contracepção em toda mulher em idade fértil",
      "Pigmentação da clofazimina não é motivo para parar, salvo risco real de abandono",
      "Dor neuropática crônica depois da alta: tratar pelo PCDT de Dor Crônica"
    ]
  },

  conduta: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Caso definido: classificar (PB ou MB), graduar a incapacidade, procurar reação e notificar no Sinan (notificação compulsória)",
      "Tratar na própria APS: PQT-U com consulta e dose supervisionada todo mês; ANS no diagnóstico, a cada 3 meses, na alta e a cada queixa nova",
      "Alta por cura: todas as doses supervisionadas + avaliação clínica + ANS; sai do registro ativo do Sinan",
      "Dúvida diagnóstica ou forma neural pura: referenciar à Atenção Especializada",
      "Neurite ou reação tipo 1: prednisona e ANS seriada. Eritema nodoso sem neurite: talidomida, ou pentoxifilina quando a talidomida não pode",
      "Avaliação cirúrgica: contraindicação a corticoide, abscesso de nervo, neurite sem resposta em 4 semanas, reações recorrentes ou subentrantes, subluxação do ulnar, neuropatia crônica com déficit tardio e dor",
      "Criança em corticoide por mais de três meses, ou com dose por kg acima da inicial do adulto: orientação pediátrica; nunca suspender de repente",
      "Caso novo com índice baciloscópico de 2 ou mais, ou MB com suspeita de persistência após 12 doses: investigar resistência na Atenção Especializada",
      "Contatos: examinar pele e nervos de TODOS os que moram ou moraram com o caso nos últimos 5 anos",
      "Contato sem doença: BCG se maior de 1 ano e sem vacina ou com só 1 dose (cartão ou cicatriz); não revacinar gestante, imunodeprimido, com neoplasia ou em corticoide em dose alta (o corte está em 'Dose muda a função', no formulário)",
      "Teste rápido do contato reagente, sem diagnóstico: não iniciar PQT-U, reavaliar todo ano por 5 anos. Não reagente: BCG conforme o histórico e ensinar o autoexame",
      "Autocuidado desde o diagnóstico (olhos, nariz, pele, mãos, pés), caderneta, e voltar se houver dor em nervo ou dormência nova — também depois da alta",
      { t: "Critério de encaminhamento clínico da reação (eritema nodoso crônico, corticoide que não se consegue reduzir, reação na gestante) e fluxo de dispensação da talidomida em Feira de Santana: o PCDT não fixa — combinar com a referência", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    itens: [
      "Esperar baciloscopia positiva para diagnosticar — o diagnóstico é clínico, e a do PB é negativa",
      "Diagnosticar caso pelo teste rápido",
      "Classificar como PB na dúvida",
      "Examinar só a mancha da queixa, sem ver a pele inteira e palpar os nervos",
      "Esperar dor para tratar neurite — a silenciosa só aparece na ANS",
      "Parar a PQT-U por causa da reação, ou reabrir a PQT-U por reação depois da alta",
      "Estender a PQT-U além de 12 doses porque a lesão não sumiu",
      "Tratar eritema nodoso com neurite ou orquite só com talidomida",
      "Prescrever talidomida a mulher com potencial reprodutivo sem contracepção dupla e β-hCG recente, ou a menor de 18 anos",
      "Iniciar corticoide sem profilaxia de estrongiloidíase",
      "Suspender a amamentação por medo da PQT-U",
      "Revacinar BCG em contato gestante, imunodeprimido ou em corticoide em dose alta"
    ]
  },

  formulario: {
    fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022",
    farmacos: [
      { id: "pqt-u", papel: "primeira linha para todo caso: PB 6 doses mensais, MB 12; blíster escolhido pelo peso" },
      { id: "prednisona", papel: "reação tipo 1, neurite (inclusive silenciosa) e reação tipo 2 com neurite, orquite ou olho acometido" },
      { id: "talidomida", papel: "reação tipo 2 (eritema nodoso) sem neurite, em adulto — proibida na gestação, na amamentação e abaixo de 18 anos" },
      { id: "clofazimina", papel: "eritema nodoso na criança, decidido por clínico experiente (a talidomida é proibida abaixo de 18 anos)" }
    ],
    combos: ["han-corticoide-antiparasitario", "han-talidomida-corticoide-aas"],
    proibidos: [],
    dosemuda: ["han-rifampicina-mensal", "han-corticoide-limiar-bcg"]
  },

  scores: ["nota-conferencia", "dose-peso"]
});

QUEIXAS.push({
  id: "prep-pep",
  nome: "PrEP, PEP e violência sexual",
  kw: "prep pep profilaxia pre exposicao pos exposicao hiv exposicao sexual camisinha estourou violencia sexual estupro abuso acidente perfurocortante agulha 72 horas tenofovir entricitabina lamivudina dolutegravir contracepcao de emergencia pilula do dia seguinte hepatite b sifilis ist",
  tag: "Agudo",
  mod: "aps",
  tema: "T7-Vulneraveis",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026 · MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017",
    itens: [
      "Exposição de risco há menos de 72 horas: é urgência — iniciar a PEP neste atendimento, sem esperar exame laboratorial, pessoa-fonte ou boletim de ocorrência (o teste rápido de HIV é feito na hora)",
      "Febre, exantema, faringite, linfonodos aumentados ou úlceras mucocutâneas durante a PEP ou logo após: suspeitar de infecção aguda pelo HIV, pedir carga viral e manter a PEP até a avaliação no serviço especializado",
      { t: "Em PrEP ou indo iniciar PrEP com quadro de infecção viral aguda: não iniciar; quem já usa vai à referência para carga viral, CD4 e genotipagem, com TARV logo após a coleta", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
      "Violência sexual contra criança ou adolescente: profilaxias + notificação + comunicação ao Conselho Tutelar da forma mais rápida possível (telefone, pessoalmente ou com uma via da ficha)",
      "Gravidez em menor de 14 anos é estupro de vulnerável, independentemente de consentimento: ofertar a interrupção legal",
      { t: "PrEP tomada de forma irregular + exposição sexual nas últimas 72 horas: a PEP pode ser indicada — contar as doses dos 7 dias anteriores", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" }
    ]
  },

  perguntas: {
    fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025",
    itens: [
      "PEP — quando foi a exposição? Data e hora: é o que conta as 72 horas",
      "PEP — qual material? Sangue, sêmen, fluido vaginal, líquor, líquido de serosa ou amniótico têm risco; suor, lágrima, fezes, urina, vômito, saliva e secreção nasal não têm, salvo com sangue",
      "PEP — qual exposição? Percutânea, mucosa (sexo sem preservativo, respingo em olho, nariz ou boca), pele não íntegra ou mordedura com sangue têm risco; pele íntegra e mordedura sem sangue não têm",
      "PEP — a pessoa-fonte é conhecida? Vive com HIV, usa TARV, tem carga viral indetectável? Teve exposição de risco nos 30 dias anteriores? (ajuda, mas não é obrigatória)",
      { t: "Foi violência sexual? Perguntar em local privativo, sem julgamento, respeitando os limites da pessoa", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Data da última menstruação, atraso menstrual ou sintomas de gravidez; usa algum método contraceptivo?",
      "Vacinação: hepatite B (esquema completo comprovado?), hepatite A, HPV; tétano se houve mordedura, corte ou lesão",
      "Já usou PEP antes? Quantas vezes nos últimos 12 meses? Usa ou já usou PrEP — quantos comprimidos nos 7 dias antes da exposição?",
      "Práticas e parcerias: sexo anal ou vaginal sem preservativo, parcerias eventuais, IST prévia, sexo em troca de dinheiro, drogas ou moradia, sexo com uso de drogas (chemsex), compartilhamento de seringa",
      "Remédios em uso: rifampicina, carbamazepina, oxcarbazepina, fenitoína, fenobarbital, metformina, dofetilida (mudam o dolutegravir)",
      "Sintomas nas últimas 4 semanas: febre, mal-estar, cefaleia, faringite, exantema, linfonodos, mialgia ou artralgia",
      "Doença renal, diabetes ou hipertensão; hepatite B conhecida ou em tratamento"
    ]
  },

  exame: {
    fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026 · MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025",
    itens: [
      "Sítios envolvidos (vaginal, anal, oral), lesões e sangramento",
      "Sinais de IST: corrimento vaginal ou uretral, úlcera genital, verrugas anogenitais",
      "Sinais de infecção aguda pelo HIV: febre, linfadenopatia, faringite, exantema, ulcerações mucocutâneas, hepatoesplenomegalia",
      "Criança e adolescente — sinais de violência sexual: edema ou lesão genital sem outra causa, lesão de palato ou de dentes anteriores, sangramento vaginal na pré-púbere, fissura, cicatriz ou dilatação anal sem causa, IST, gravidez",
      { t: "Violência: inspecionar tronco, membros (inclusive face interna das coxas), nádegas, cabeça, pescoço, mucosas, orelhas, mãos e pés; ferimento que não condiz com a explicação", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Peso: PrEP exige 35 kg ou mais, e na criança a PEP muda por faixa de peso"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025",
    itens: [
      "HIV já instalado: teste rápido 1 e 2 reagentes — não é PEP nem PrEP, é diagnóstico; encaminhar para iniciar TARV",
      "Hepatite B crônica (HBsAg reagente): na PEP, iniciar o esquema preferencial e encaminhar; na PrEP, só a diária e nunca suspender sem avaliação (flare, hepatite fulminante, óbito no cirrótico)",
      "Gravidez pode contraindicar a contracepção de emergência: testar se há atraso menstrual ou sintomas",
      "Adesão inadequada à PrEP, que pode levar à PEP depois de uma exposição: mulher cis e quem usa estradiol com 5 doses ou menos nos 7 dias antes; homem cis, travesti e mulher trans sem estradiol com 3 doses ou menos, em PrEP oral diária",
      "Quem buscou PEP mais de uma vez nos últimos 12 meses deve ser avaliado para PrEP",
      { t: "Depois da violência sexual: estresse pós-traumático, depressão e ansiedade — articular o cuidado em saúde mental", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Hepatite C não tem profilaxia, mas testar exposto e fonte permite tratar a infecção aguda; anti-HCV reagente no 1º atendimento é contato anterior com o vírus — confirmar, notificar e encaminhar",
      "Toda exposição de risco ao HIV também é de risco para outras IST: testar sífilis sempre que a exposição for sexual"
    ]
  },

  exames: {
    fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026",
    itens: [
      "PEP, 1º atendimento: teste rápido de HIV em sangue (não usar fluido oral), HBsAg, anti-HCV, teste treponêmico de sífilis, teste molecular de clamídia e gonococo no sítio exposto (sífilis, clamídia e gonococo: exceto no acidente com material biológico), teste de gravidez se indicado",
      "PEP, seguimento: HIV na 4ª e na 12ª semana; sífilis, clamídia, gonococo e gravidez em 4 a 6 semanas se o 1º foi negativo; anti-HCV em 4 a 6 semanas e em 6 meses (na violência sexual, sempre; fora dela, se a fonte for anti-HCV reagente, e caso a caso se for desconhecida); anti-HBs 6 meses após a imunoglobulina",
      "PEP: creatinina só em alto risco ou doença renal prévia; ALT, AST e amilase se houver efeito adverso; glicemia se diabetes; hemograma se a PEP usar zidovudina — nenhum exame atrasa o início",
      "PrEP, 1ª consulta: teste rápido de HIV, sífilis, clamídia e gonococo por biologia molecular no sítio da prática, HBsAg e anti-HBc total, anti-HCV, creatinina com clearance (opcional abaixo de 30 anos sem fator de risco)",
      "PrEP, seguimento: HIV com 1 mês e depois em toda consulta; sífilis e anti-HCV quadrimestral; clamídia e gonococo semestral; hepatite B anual se suscetível; gravidez quadrimestral",
      "PrEP, função renal: a cada 12 meses abaixo de 50 anos, sem comorbidade e com clearance inicial de 90 ou mais; a cada 6 meses acima de 50 anos, com HAS, diabetes ou clearance inicial abaixo de 90 (em mL/min)",
      "PrEP: clearance estimado abaixo de 60 (em mL/min) contraindica; no seguimento, repetir em outro dia antes de suspender",
      { t: "Violência sexual com teste rápido de sífilis reagente: colher teste não treponêmico (VDRL ou RPR); se não reagente, suspender o tratamento iniciado", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025 · MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026",
    itens: [
      "PrEP no SUS é uma só: tenofovir + entricitabina em dose fixa, na modalidade diária (qualquer pessoa elegível) ou sob demanda 2 + 1 + 1 (só homem cis, pessoa não binária designada homem ao nascer, travesti e mulher trans sem estradiol)",
      "PrEP protege após 7 dias de uso na mulher cis, na pessoa trans designada mulher ao nascer e em quem usa estradiol, e após 2 horas nos demais: orientar outra proteção até lá",
      "PrEP diária pode ser usada com hormonização (não há contraindicação; quem usa estradiol não usa a sob demanda) e não interage com contraceptivo; álcool e drogas não reduzem a eficácia — não suspender por isso",
      "PEP preferencial é tripla: tenofovir/lamivudina + dolutegravir, para qualquer exposição e qualquer material, inclusive gestante em qualquer idade gestacional, por 28 dias, dispensados de uma vez",
      "Sem tenofovir (lesão renal): zidovudina/lamivudina + dolutegravir. Sem dolutegravir (intolerância, dofetilida, pilsicainida): tenofovir/lamivudina + darunavir + ritonavir",
      "Dolutegravir: dose dobrada (de 12 em 12 horas) com rifampicina, carbamazepina, fenitoína ou fenobarbital; atenção à metformina (hipoglicemia)",
      "Criança: dolutegravir só a partir de 4 semanas e 3 kg; tenofovir só a partir de 35 kg; abacavir contraindicado na PEP pediátrica e nevirapina após os 2 anos — a dose por peso está no PCDT de HIV pediátrico, não no PCDT PEP",
      "Violência sexual, independentemente de sintomas: penicilina benzatina (sífilis), ceftriaxona + azitromicina (gonorreia e clamídia) e metronidazol (tricomoníase); metronidazol fora do 1º trimestre e adiado se houve contracepção de emergência ou ARV",
      { t: "Violência sexual com teste rápido de sífilis reagente: tratar como sífilis latente tardia (3 doses semanais de penicilina benzatina, a 1ª no próprio atendimento) enquanto sai o teste não treponêmico", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Exposição sexual consentida: investigar e tratar o que achar — o tratamento preemptivo de IST é só para violência sexual",
      "Contracepção de emergência até 5 dias (120 horas) após a violência: levonorgestrel ou DIU de cobre",
      "Quem prescreve: PEP pode ser prescrita por médico, enfermeiro ou farmacêutico; no SUS, a PrEP por qualquer profissional habilitado a prescrever"
    ]
  },

  conduta: {
    fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016",
    itens: [
      "PEP indicada se as 4 respostas forem SIM: material de risco · exposição de risco · menos de 72 horas · teste rápido de HIV não reagente",
      "Depois de 72 horas não há PEP do HIV: testar HIV agora e em 30 dias, rastrear IST e hepatites e avaliar PrEP. Ainda dá tempo de: contracepção de emergência até 120 horas; vacina + imunoglobulina da hepatite B até 14 dias (violência sexual); profilaxia de IST na violência sexual, que não tem prazo",
      "Acidente com material biológico: lavar a pele com água e sabão e a mucosa só com água ou soro fisiológico; não espremer, não cortar, não usar éter, hipoclorito ou glutaraldeído",
      { t: "Acidente ocupacional — hepatite B: não vacinado ou esquema incompleto com fonte HBsAg reagente = IGHAHB + vacina; resposta vacinal desconhecida = anti-HBs em até 48 h; IGHAHB em até 7 dias na exposição percutânea (Quadro 15)", f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024" },
      { t: "Acidente de trabalho com material biológico: notificar no Sinan na ficha própria", f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024" },
      { t: "Hepatite B na violência sexual: todo exposto suscetível (HBsAg não reagente e sem esquema vacinal completo comprovado, ou com anti-HBs abaixo de 10, colhido 30 a 60 dias após a última dose) recebe vacina + imunoglobulina, em músculos diferentes, de preferência em 24 horas e no máximo em 14 dias; imune comprovado não precisa; imunossuprimido: avaliar com especialista", f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
      "Hepatite B na exposição sexual consentida: vacinar quem não tem esquema completo; imunoglobulina se a parceria tem hepatite B aguda (a imunoglobulina está no CRIE)",
      "Violência sexual: acolher em local privativo, sem julgamento e sem revitimização; atendimento imediato e integral é lei (Lei do Minuto Seguinte); quem não registra ocorrência policial não pode ter atendimento negado; Ligue 180 (24 horas) orienta direitos, rede e denúncia",
      "Violência sexual: PEP do HIV + profilaxia de hepatite B + profilaxia de sífilis, gonorreia, clamídia e tricomoníase + contracepção de emergência + vacina HPV (2 a 8 anos dose única; 9 a 14 anos 2 doses; 15 a 45 anos 3 doses) + vacina de hepatite A quando indicado",
      "Notificar a violência sexual (notificação imediata, em âmbito municipal) na ficha de violência interpessoal/autoprovocada, com cópia no prontuário; criança ou adolescente: comunicar também o Conselho Tutelar",
      "Se a USF não dispensa ARV: fazer no 1º atendimento o que for possível (teste rápido, contracepção de emergência, notificação) e acompanhar a pessoa ao serviço de referência — não só entregar o encaminhamento",
      "Gravidez decorrente de estupro: o aborto legal é direito e depende só do relato — sem boletim de ocorrência, autorização judicial ou laudo do IML; encaminhar ao serviço de referência",
      "PEP: retorno em 4 semanas (efeito adverso, adesão); ao fim dos 28 dias, quem se expõe repetidamente começa a PrEP logo em seguida, com HIV excluído",
      { t: "PrEP: começar no dia do teste (no máximo 7 dias depois), primeira dispensação para 30 dias, consultas a cada 120 dias; após 1 ano sem interrupção, pode ir a 6 meses", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
      { t: "Adolescente: atender sem exigir pais ou responsáveis, com sigilo; PrEP a partir de 15 anos e 35 kg dispensa consentimento dos pais se houver compreensão", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" }
    ]
  },

  erros: {
    fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026",
    itens: [
      "Esperar a pessoa-fonte, exame laboratorial ou boletim de ocorrência para iniciar a PEP",
      "Indicar PEP depois de 72 horas — não há benefício",
      "Encaminhar a vítima de violência sexual a outro serviço sem nenhuma providência no primeiro atendimento",
      "Fracionar a dispensação da PEP em vez de entregar os 28 dias",
      "Na violência sexual, pedir anti-HBs para decidir a profilaxia da hepatite B (no acidente ocupacional com resposta vacinal desconhecida, o anti-HBs É pedido, com resultado em até 48 h)",
      "Testar HIV com fluido oral no seguimento da PEP",
      "Dar tratamento preemptivo de IST em exposição sexual consentida",
      "Encerrar a PEP sem oferecer PrEP a quem se expõe repetidamente",
      "Iniciar PrEP com sintomas de infecção viral aguda sem pedir carga viral",
      "Prescrever PrEP sob demanda para mulher cis, homem trans, quem usa estradiol ou para sexo neovaginal receptivo",
      "Suspender a PrEP de quem tem hepatite B sem avaliação médica",
      "Atrasar o início da PrEP esperando creatinina de quem não tem doença renal nem fator de risco"
    ]
  },

  formulario: {
    fonte: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025 · MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024 · MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026",
    farmacos: [
      { id: "tenofovir-entricitabina", papel: "PrEP — o único esquema do SUS; diária ou sob demanda" },
      { id: "tenofovir-lamivudina", papel: "PEP — dupla preferencial, com dolutegravir (ou com darunavir + ritonavir)" },
      { id: "dolutegravir", papel: "PEP — terceiro fármaco preferencial, inclusive na gestante e na criança a partir de 4 semanas" },
      { id: "zidovudina-lamivudina", papel: "PEP — substitui o tenofovir quando ele é contraindicado; dupla da criança abaixo de 35 kg" },
      { id: "darunavir-ritonavir", papel: "PEP — substitui o dolutegravir (intolerância, dofetilida, pilsicainida, suspeita de resistência)" },
      { id: "penicilina-benzatina", outra: true, papel: "violência sexual — profilaxia da sífilis com teste não reagente; teste reagente: esquema de sífilis latente tardia" },
      { id: "ceftriaxona", outra: true, papel: "violência sexual — profilaxia da gonorreia, junto com azitromicina" },
      { id: "azitromicina", outra: true, papel: "violência sexual — profilaxia da clamídia, junto com ceftriaxona" },
      { id: "metronidazol", outra: true, papel: "violência sexual — profilaxia da tricomoníase; não no 1º trimestre; adiar se houve contracepção de emergência ou ARV" },
      { id: "levonorgestrel", outra: true, papel: "contracepção de emergência até 5 dias após a violência ou a falha do método" }
    ],
    combos: ["vul-pep-preferencial", "vul-pep-sem-tenofovir", "vul-pep-sem-dolutegravir", "vul-pep-para-prep"],
    proibidos: [],
    dosemuda: []
  },

  scores: ["nota-conferencia", "ckdepi", "dose-peso"]
});

QUEIXAS.push({
  id: "populacao-rua",
  nome: "Pessoa em situação de rua",
  kw: "populacao em situacao de rua morador de rua psr consultorio na rua sem documento sem endereco cartao sus albergue centro pop tuberculose tosse reducao de danos crack alcool drogas pes feridas escabiose piolho gestante violencia vinculo",
  tag: "Programa",
  mod: "aps",
  tema: "T7-Vulneraveis",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Tosse de qualquer duração: investigar tuberculose já no primeiro contato — o risco de adoecer é 56 vezes o da população geral, e a pessoa muitas vezes não percebe ou desvaloriza a tosse",
      "Gestante em situação de rua: muitas são de alto risco (álcool, crack, sífilis, HIV, anemia grave, hepatites): avaliar e referenciar o mais breve possível",
      "Transtorno mental grave descompensado (parou de comer, hostil, inabordável, intoxicado): acionar urgência ou SAMU e articular com a saúde mental",
      "Relato de violência sexual: janela de 72 horas para a PEP — abrir a queixa de PrEP, PEP e violência sexual",
      "Pernas com edema, picadas e feridas: risco de úlcera e celulite — examinar sempre, a mobilidade é a sobrevivência na rua"
    ]
  },

  perguntas: {
    fonte: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012",
    itens: [
      "Onde você costuma ficar durante o dia? E durante a noite? (registrar no prontuário: é como a equipe vai achar a pessoa)",
      "Frequenta alguma instituição para comer, tomar banho ou dormir (albergue, abrigo, Centro POP)?",
      { t: "Tem tosse? Qualquer duração conta. Febre, suor à noite, emagrecimento?", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      "Álcool, crack e outras drogas: o que usa, quanto, e o que gostaria de mudar — sem exigir abstinência",
      "Sofrimento mental, diagnóstico psiquiátrico, internações anteriores",
      "Vida sexual: parcerias, uso de preservativo, IST anterior; oferecer teste de HIV, sífilis e hepatites",
      "Mulher: última menstruação, possibilidade de gravidez, violência física, psicológica ou sexual",
      "Pés e pernas: dor, feridas, calos, micose, inchaço",
      "Coceira no corpo ou na cabeça (escabiose, piolho)",
      "Hipertensão, diabetes, doença pulmonar; que remédio usa, onde guarda, perdeu receita ou remédio (roubo, recolhimento)?",
      "Fuma? Há quanto tempo?",
      { t: "Tem documento e Cartão SUS? (a falta de documento não impede atendimento nem cadastro)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" }
    ]
  },

  exame: {
    fonte: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012",
    itens: [
      "Pés e pernas sempre: varizes e estase, celulite e erisipela, micose, calos e clavus plantares, pé de imersão, bicho-de-pé, unha encravada",
      "Pele e couro cabeludo: escabiose, piolho de corpo e de cabeça, Pthirus pubis; picadas com abscesso, impetigo ou celulite",
      "Peso e estado nutricional — roupa doada maior que o corpo engana quanto ao emagrecimento",
      "Genitais se houver queixa: corrimento, úlcera, condiloma",
      "Boca e dentes: saúde bucal é prioridade nessa população",
      "Sinais de intoxicação ou abstinência (irritabilidade, impaciência, agitação psicomotora)"
    ]
  },

  naoperder: {
    fonte: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Tuberculose resistente e HIV: a população em situação de rua tem risco acrescido dos dois",
      "Hepatites B e C são muito frequentes: vacina de hepatite B e sorologias nos exames periódicos",
      "HAS, diabetes e DPOC aparecem mais cedo que na população geral; o difícil é guardar e tomar o remédio no horário",
      "Quem diz \"vou bem\" com tosse, febre e desnutrição não está dissimulando: o sintoma foi incorporado como normal",
      "Febre confundida com o frio da noite e tempo de doença que a pessoa não sabe dizer: a anamnese precisa de escuta e de tempo",
      "Alta hospitalar sem lugar para convalescer devolve à rua quem precisa de curativo, cateter ou prótese: articular abrigamento",
      "Subgrupos com abordagem própria: crianças e adolescentes, mulheres e migrantes"
    ]
  },

  exames: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 · MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012",
    itens: [
      "Tosse de qualquer duração, no primeiro contato: baciloscopia ou TRM-TB + cultura com teste de sensibilidade + radiografia de tórax; orientar a coleta de 2 amostras em dias consecutivos e oferecer a coleta na hora",
      "Testes rápidos de HIV, sífilis e hepatites B e C como parte dos exames periódicos",
      "Gestante: testes rápidos de gravidez, HIV e sífilis para ela e para a parceria na captação",
      { t: "Colo do útero: as mesmas recomendações do risco-padrão; considerar a autocoleta do DNA-HPV onde houver, para vencer a barreira de acesso", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      "Não fazer inquérito tuberculínico na população em situação de rua; contato de caso de TB é avaliado para doença ativa ou latente"
    ]
  },

  conduta: {
    fonte: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      { t: "Atender e cadastrar sem documento e sem endereço: a falta de documentação não é barreira para o atendimento nem para o Cartão SUS, e a pessoa em situação de rua está dispensada de informar domicílio (Portaria nº 940/2011)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      "Consultório na Rua: equipe multiprofissional da atenção básica que atende in loco, de forma itinerante, de dia ou de noite, integrada à UBS, ao CAPS e à urgência — articular com ele; onde não houver, a equipe da área acolhe e coordena",
      "Vínculo primeiro: escuta sem julgamento, linguagem adequada à realidade da pessoa, respeito ao tempo dela",
      "Redução de danos em todas as ações: não exigir abstinência de álcool ou drogas como condição para tratar nada, inclusive a tuberculose",
      "Agenda aberta para demanda espontânea, retorno por período (manhã ou tarde) e não por hora marcada; resolver o máximo no mesmo encontro",
      "Esquema terapêutico simplificado, mesmo que não ideal, e com remédio que a rede tem: o completo que a pessoa não consegue cumprir não trata",
      "Tuberculose: tratamento diretamente observado para toda pessoa em situação de rua — na UBS, in loco ou no albergue (inclusive por profissional da assistência social, com supervisão semanal da saúde); PTS junto com a assistência social",
      "Sem abrigamento possível durante o tratamento da TB: casa de apoio ou internação por vulnerabilidade social",
      "Prontuário com os lugares frequentados, lista de problemas e estratificação de risco; Índice de Autonomia (risco físico, mental e social, 0 a 2 cada): 0 a 2 discutir em reunião ampla com a abordagem, 3 a 4 com o apoio da UBS, 5 a 6 na reunião de equipe",
      "Gestante: referenciar ao alto risco e manter o pré-natal intercalado na APS; considerar CAPS AD, assistência social e Conselho Tutelar quando necessário",
      "Infestação: tratar e mapear onde a pessoa pode tomar banho, lavar e trocar roupa; orientar o albergue sobre a roupa de cama",
      "Rede intersetorial: Centro POP, CRAS, CREAS, albergues, restaurante comunitário, benefícios sociais e transporte gratuito"
    ]
  },

  erros: {
    fonte: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      "Recusar atendimento ou cadastro por falta de documento ou de endereço",
      "Exigir que pare de beber ou de usar droga para tratar a tuberculose",
      "Investigar TB só com tosse de 2 ou 3 semanas, como na população geral",
      "Marcar retorno para daqui a 15 dias e esperar que a pessoa volte sozinha",
      "Prescrever remédio que a rede não tem, ou de 8 em 8 horas, sem pensar em onde vai ser guardado e como vai ser tomado",
      "Antifúngico oral para micose de pé em quem bebe (soma hepatotoxicidade): preferir o tópico",
      "Monossulfiram para escabiose em quem bebe (risco de reação com o álcool)",
      "Tratar infecção latente de TB como rotina na rua — só é prioridade na criança e na pessoa vivendo com HIV",
      "Encaminhar e não acompanhar: a atenção básica é a coordenadora do cuidado",
      "Achar que cuidar na rua estimula a ficar na rua: quem cria vínculo tem mais chance de sair"
    ]
  },

  scores: ["nota-conferencia", "imc"]
});

QUEIXAS.push({
  id: "populacoes-vulneraveis",
  nome: "Pessoa LGBTIA+ e outras populações vulneráveis",
  kw: "lgbtia lgbt lgbtqiapn gay lesbica bissexual travesti transexual trans homem trans mulher trans nao binario intersexo nome social pronome identidade de genero orientacao sexual hormonizacao rastreio colo privado de liberdade presidio egresso indigena quilombola migrante imigrante refugiado vulnerabilidade equidade",
  tag: "Programa",
  mod: "aps",
  tema: "T7-Vulneraveis",
  atualizado: "2026-10-26",

  redflags: {
    fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      { t: "Exposição sexual de risco nas últimas 72 horas: avaliar PEP agora — abrir a queixa de PrEP, PEP e violência sexual", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
      { t: "Violência relatada, inclusive na família ou da parceria: acolher, avaliar o risco e notificar — a notificação de violência doméstica, sexual e outras violências é universal", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      "Tosse em pessoa privada de liberdade, indígena ou imigrante em situação vulnerável: qualquer duração conta — investigar tuberculose",
      "Indígena com suspeita de tuberculose: o diagnóstico NÃO se baseia na radiografia — micobactéria não tuberculosa e fungos dão imagem semelhante; pedir cultura ou TRM-TB"
    ]
  },

  perguntas: {
    fonte: "MS — Nota Técnica nº 10/2026 (população LGBTIA+ na APS), 2026",
    itens: [
      "Como você gostaria que eu te chamasse? Tem nome social?",
      "Com qual gênero você se identifica? Quais pronomes devemos usar?",
      "Qual a sua orientação sexual? Você se identifica como lésbica, gay, bissexual, pansexual, assexual, heterossexual ou de outra forma?",
      "Algum termo que usamos para descrever partes do corpo causa desconforto para você?",
      { t: "Qual o sexo designado no nascimento, como está registrado na certidão?", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022" },
      { t: "Práticas nos últimos 3 meses: anal, vaginal, oral; receptiva, insertiva ou ambas; álcool ou drogas no sexo; sexo em troca de dinheiro ou drogas", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022" },
      { t: "Usa hormônio? Qual? (estradiol muda o tempo de proteção e a modalidade da PrEP)", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
      { t: "Vacinas: hepatite A, hepatite B, HPV", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022" },
      "Deseja ter filhos? (parentalidade LGBTIA+ e desejo reprodutivo)",
      "Como é a relação com a família e a rede de apoio? Quer que alguém participe do cuidado?",
      "Há algo que você gostaria de compartilhar e que ainda não discutimos?",
      { t: "Esteve privado de liberdade? Vive em território indígena? É migrante? (muda a busca de tuberculose)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" }
    ]
  },

  naoperder: {
    fonte: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025 · MS — Nota Técnica nº 10/2026 (população LGBTIA+ na APS), 2026",
    itens: [
      { t: "Rastreio do colo do útero é pela anatomia: mulher lésbica ou bissexual, homem trans, pessoa não binária, de gênero fluido ou intersexo nascida com sistema reprodutivo feminino segue as mesmas recomendações do risco-padrão", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      { t: "Mulher lésbica fica sem rastreio pela crença errada, dela e do profissional, de que não se infecta pelo HPV no sexo entre mulheres", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Homem trans com útero em testosterona: a hormonização pode reduzir a sensibilidade do DNA-HPV (mais na autocoleta) e a atrofia pode deixar a citologia insatisfatória — o DNA-HPV ainda é melhor que a citologia; se precisar de citologia ou colposcopia, preparo estrogênico antes, como na pós-menopausa", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      "Ansiedade e depressão: a vivência constante de LGBTIfobia é fator importante — perguntar ativamente",
      "Interseccionalidade: ser negro, estar em situação de rua ou ser profissional do sexo soma vulnerabilidades; o racismo é fator de adoecimento",
      { t: "Mulher trans, travesti, gay e HSH têm prevalência de HIV muito acima da geral, mas pertencer ao grupo não basta para indicar PrEP: avaliar práticas, parcerias e contexto", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
      { t: "Populações-chave para HIV e IST: gays e HSH, travestis e pessoas trans, profissionais do sexo, quem usa álcool e outras drogas, pessoas privadas de liberdade; prioritárias: indígenas, jovens, população negra e pessoas em situação de rua", f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024" },
      { t: "Familiar de pessoa presa com tuberculose é contato: avaliar na USF", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Egresso do sistema prisional em tratamento de TB deve trazer o encaminhamento com a data de início e o esquema: continuar sem interromper na USF", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Tratamento da TB sensível no indígena: em território indígena, preferencialmente pela equipe multidisciplinar de saúde indígena (EMSI) na aldeia ou pela Atenção Básica do município; em área urbana, segue os fluxos da população geral", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" }
    ]
  },

  exames: {
    fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022",
    itens: [
      "Gays e HSH, profissionais do sexo, travestis e transexuais, pessoas com uso abusivo de álcool e outras drogas: HIV e sífilis semestral; hepatites B e C semestral a anual; clamídia e gonococo conforme a prática sexual",
      "Prática sexual anal receptiva sem preservativo: HIV, sífilis, clamídia e gonococo semestral; hepatites B e C semestral a anual",
      "Pessoa privada de liberdade: HIV anual, sífilis semestral, hepatites B e C semestral a anual",
      { t: "Colo do útero: DNA-HPV oncogênico é o método primário; as mesmas recomendações valem para pessoas LGBTQIAPN+; oferecer autocoleta independentemente de orientação sexual, identidade de gênero e prática, onde houver", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      { t: "Tuberculose em pessoa privada de liberdade, indígena ou imigrante vulnerável: baciloscopia ou TRM-TB + cultura com teste de sensibilidade; radiografia de tórax (sim na privada de liberdade, pode ser considerada nos demais)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Indígena: cultura ou TRM-TB obrigatórios — a baciloscopia não diferencia o M. tuberculosis de micobactéria não tuberculosa", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" }
    ]
  },

  conduta: {
    fonte: "MS — Nota Técnica nº 10/2026 (população LGBTIA+ na APS), 2026",
    itens: [
      "Nome social: perguntar desde o primeiro contato e usar em todo o atendimento e registro; emitir o Cartão SUS com nome social sempre que pedido; o PEC do e-SUS APS usa o nome social",
      { t: "Perguntar orientação sexual e identidade de gênero no cadastro do e-SUS APS (campos obrigatórios da ficha; a pessoa pode escolher não responder), com sigilo e sem discriminação", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      "Evitar pressupostos cisheteronormativos; linguagem inclusiva: genitais, órgãos reprodutivos internos e externos, responsável, parceria, preservativo externo e interno",
      "Respeitar o tempo e o desejo da pessoa de contar sobre identidade e vivências; sigilo e confidencialidade são condição do vínculo",
      "Toda a carteira de serviços da APS vale igual (promoção, prevenção, clínica, acompanhamento de crônicos); encaminhar na rede só quando indicado, mantendo a coordenação do cuidado",
      "Prevenção de HIV e IST pela prática, não pela identidade: campanha e testagem valem para toda a população",
      "Adolescente LGBTIA+: escuta qualificada, autonomia progressiva, acesso seguro a informação e cuidado",
      "Apoiar a família quando a pessoa quiser: ela pode ser fonte de sofrimento; envolver a rede de apoio só com o consentimento da pessoa",
      { t: "Hormonização pode ser iniciada na APS, com consentimento informado e sem exigir laudo psiquiátrico", f: "medicina-wiki/wiki/mfc-aps-fatos.md (2026-08-03)" },
      { t: "PrEP diária pode ser usada com hormonização feminilizante ou masculinizante: não há contraindicação nem interação; quem usa estradiol não usa a sob demanda", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
      { t: "Mulher lésbica ou bissexual tem direito a planejamento reprodutivo; reprodução assistida no SUS independe de diagnóstico de infertilidade", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
      { t: "Pessoas em situação de vulnerabilidade (rua; campo, floresta e águas; privadas de liberdade; adolescentes em medida socioeducativa; migrantes, refugiados e apátridas; pessoas com albinismo ou com deficiência; população negra e quilombola; LGBTQIAPN+; ciganos; circenses): mesmas recomendações de rastreio, autocoleta onde houver e integração com as outras ações de saúde", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      { t: "Indígena com TB: tratamento diretamente observado; contato é todo o domicílio e, às vezes, os núcleos familiares de intensa convivência", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Liderança indígena ou comunitária entra como interlocução, não como ferramenta para convencer", f: "medicina-wiki/wiki/etica-medica-fatos.md (2026-08-03)" }
    ]
  },

  erros: {
    fonte: "MS — Nota Técnica nº 10/2026 (população LGBTIA+ na APS), 2026",
    itens: [
      "Chamar pelo nome de registro quem informou nome social",
      "Presumir que a pessoa é heterossexual ou cisgênero",
      "Fazer pergunta invasiva, por curiosidade, sobre o corpo ou a identidade",
      "Restringir campanha de HIV e IST à população LGBTIA+",
      { t: "Não oferecer rastreio do colo do útero à mulher lésbica ou ao homem trans com útero", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025" },
      { t: "Encaminhar toda pessoa trans para serviço de IST", f: "medicina-wiki/wiki/mfc-aps-fatos.md (2026-08-03)" },
      { t: "Exigir laudo psiquiátrico para acolher a demanda de hormonização (a CID-11 retirou a transexualidade dos transtornos mentais)", f: "medicina-wiki/wiki/mfc-aps-fatos.md (2026-08-03)" },
      { t: "Indicar PrEP só porque a pessoa é de população-chave, ou negar a quem não é: a PrEP não é restrita a populações-chave", f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
      { t: "Diagnosticar tuberculose em indígena pela radiografia", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Negar o cuidado biomédico necessário em nome do respeito ao saber tradicional — é abandono terapêutico", f: "medicina-wiki/wiki/mfc-aps-fatos.md (2026-08-03)" }
    ]
  },

  scores: ["nota-conferencia"]
});

/* =====================================================================
 * APS II — onda de conteúdo (2026-10-27): a demanda espontânea do adulto,
 * pelos temas do rodízio (campo `tema`). Mesmas regras de sempre, e a da onda 2:
 * a queixa não escreve dose — o número mora no cartão do farmacos-aps.js (ou do
 * psicofarmacos.js), com fonte e página.
 * ===================================================================== */

/* Onda APS II · agente cardiorrenal · queixa dislipidemia-risco-cv (27/10/2026).
 * Base: PCDT Dislipidemia 2019 (Portaria Conjunta nº 8; vigente — a proposta da
 * consulta pública de 2026 NÃO é citável), PCDT de HAS 2025 (HEARTS e estatina sem
 * calcular risco, p. 6 e 33), RENAME 2024. SBC 2025 só onde o PCDT não cobre, dito
 * como SBC. Páginas lidas por item: ver cardiorrenal.notas.md. */

QUEIXAS.push({
  id: "dislipidemia-risco-cv",
  nome: "Dislipidemia e risco cardiovascular — quem recebe estatina e qual",
  kw: "dislipidemia colesterol ldl hdl triglicerideos trigliceride estatina sinvastatina atorvastatina fibrato genfibrozila hipercolesterolemia familiar risco cardiovascular hearts framingham pancreatite xantoma",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Cardiorrenal-Metabolica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "Triglicerídeos acima de 500: risco de pancreatite aguda", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 2 e 4" },
      { t: "Triglicerídeos acima de 1.000 (hiperquilomicronemia): risco maior de pancreatite — cortar gordura total da dieta já", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Em uso de estatina: dor muscular, cãibras, fraqueza, febre ou cansaço — pode ser miopatia ou rabdomiólise, que pede atenção médica imediata e pode ser fatal; dosar CPK", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 20" },
      { t: "CPK acima de 10 vezes o normal, aminotransferases acima de 3 vezes ou mialgia: suspender a estatina", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10" },
      { t: "Gestante em uso de estatina: suspender — estatina não se usa na gestação", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4 e 20" },
      { t: "Icterícia ou doença hepática aguda ou crônica grave em uso de hipolipemiante: fora do protocolo — suspender e avaliar", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4" }
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "Já teve infarto, revascularização, angina com isquemia comprovada, AVC isquêmico, AIT com aterosclerose carotídea ou claudicação? (doença aterosclerótica já é o maior risco)", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3 e 4" },
      { t: "Tem diabetes, hipertensão ou doença renal crônica? Fuma?", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Parente de primeiro grau com doença coronariana precoce (homem antes dos 55; mulher antes dos 60 no Quadro 1, ou dos 65 nos critérios de inclusão), xantoma, arco córneo ou colesterol muito alto?", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3 e 4" },
      { t: "Quanto bebe de álcool? Come muito carboidrato e açúcar? (causas de triglicerídeo alto)", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Mulher em idade fértil: usa contracepção segura? Pode estar grávida? Planeja engravidar?", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4" },
      { t: "Usa anlodipino, verapamil, amiodarona, antirretroviral, itraconazol, claritromicina ou eritromicina, ou um fibrato? (mudam a escolha e a dose da estatina)", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 5 · SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Se já usa estatina: está tomando todo dia, à noite? Teve dor muscular, cãibra ou fraqueza?", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10 e 20" },
      { t: "Sintomas de hipotireoidismo (cansaço, frio, constipação, ganho de peso)? Hipotireoidismo descompensado tira do protocolo e causa miopatia com a estatina", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4 · SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Atividade física, alimentação (gordura animal, frituras, ultraprocessados) e tabagismo", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "PA sistólica (entra no cálculo do risco) e se já está tratada", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Peso, altura e IMC — a calculadora HEARTS sem colesterol usa peso e altura", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Xantoma tendinoso, arco córneo antes dos 45 anos, xantoma tuberoso ou xantelasma: sinais de hipercolesterolemia familiar", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" },
      { t: "Circunferência abdominal", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15" },
      { t: "Pulsos periféricos e sopros carotídeos (doença aterosclerótica já estabelecida muda a categoria de risco)", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 15" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "Hipercolesterolemia familiar: LDL muito alto, xantoma, arco córneo precoce, parente com doença coronariana precoce — critérios da OMS no Quadro 1 do PCDT; examinar a família", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3 e 4" },
      { t: "Quem já teve evento aterosclerótico não precisa de calculadora: já é de alto risco e tem indicação de estatina", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" },
      { t: "Diabetes a partir dos 40 anos, DRC estágio 3 ou mais, LDL ≥190 e HAS com lesão de órgão-alvo: estatina sem calcular risco", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Triglicerídeo alto de causa secundária (álcool, diabetes descompensado, obesidade, excesso de carboidrato): tratar a causa trata o triglicerídeo", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Muito alto risco (Framingham acima de 20% ou prevenção secundária com fator de risco maior mantido): candidato a dose alta de estatina, avaliada na atenção terciária", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4 e 5" }
    ]
  },

  ddx: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "Hipertrigliceridemia secundária — triglicerídeo geralmente abaixo de 1.000, com excesso de carboidrato, obesidade, diabetes descompensado ou álcool", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Hiperquilomicronemia — triglicerídeo acima de 1.000, risco de pancreatite", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Hipercolesterolemia familiar — LDL muito alto (o Quadro 1 pontua a partir de 155), xantoma tendinoso, arco córneo antes dos 45, família com doença precoce", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3 e 4" },
      { t: "Hipotireoidismo — causa secundária; descompensado (TSH acima de 10) tira do protocolo até tratar", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4" },
      { t: "Triglicerídeo acima de 400: o LDL calculado não vale — usar o não-HDL", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" }
    ]
  },

  exames: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "Perfil lipídico: colesterol total, HDL e triglicerídeos; LDL pela fórmula de Friedewald (CT − HDL − TG/5) só com triglicerídeo abaixo de 400", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" },
      { t: "Triglicerídeo acima de 400: usar o não-HDL (CT − HDL); o alvo dele é 30 acima do alvo de LDL", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" },
      { t: "Risco cardiovascular uma vez por ano, dos 40 aos 74 anos, com a calculadora HEARTS (OPAS/OMS) — funciona sem colesterol, mas com ele é mais precisa. O PCDT de 2019 usava o Escore de Risco Global de Framingham", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6 · MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" },
      { t: "Antes da estatina: TGO/TGP e CPK; repetir aos 6 meses e a cada mudança de dose ou acréscimo de fármaco que aumente a toxicidade", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10 e 11" },
      { t: "TSH antes da estatina (SBC) — e na queixa muscular durante o uso", f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Glicemia ou HbA1c e creatinina com TFG: diabetes e DRC mudam a indicação", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Em estatina, o PCDT dispensa repetir o perfil lipídico (o tratamento é contínuo e pelo risco); a SBC repete em cerca de 4 semanas e persegue meta — divergência a decidir com a preceptora", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10 · SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Fibrato para prevenir pancreatite: triglicerídeo a cada 6 meses; outros hipolipemiantes sem estatina: perfil anual", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "O PCDT decide pelo RISCO do paciente, não pela busca do LDL-alvo (só cita, no diagnóstico, LDL abaixo de 100 para a maioria de risco elevado); o tratamento é contínuo", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 2, 3, 5, 7 e 10" },
      { t: "Quem entra no PCDT: doença aterosclerótica clínica; Framingham acima de 10% em 10 anos; diabetes no homem acima de 45 e na mulher acima de 50 com um fator de risco maior; hipercolesterolemia familiar definitiva. O PCDT de HAS de 2025 simplifica: diabetes a partir dos 40, DRC estágio 3 ou mais, LDL ≥190 e HAS com lesão de órgão-alvo", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Estatinas do PCDT: sinvastatina, pravastatina e atorvastatina. Na farmácia da UBS, a sinvastatina (Componente Básico); atorvastatina e pravastatina são do Componente Especializado", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 7 · RENAME 2024" },
      { t: "Estatina por via oral, dose única diária, de preferência à noite", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10" },
      { t: "Dose alta só no muito alto risco: das estatinas do SUS, a atorvastatina é a única cuja dose máxima o PCDT restringe aos casos especiais (muito alto risco, avaliados na atenção terciária), com a dose inicial como usual; a sinvastatina na dose máxima tem aviso de toxicidade e a SBC a considera proscrita", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4, 5 e 10 · SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Com antirretroviral, a estatina de escolha do PCDT é a pravastatina", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 5" },
      { t: "Triglicerídeo acima de 500 sem indicação de estatina: fibrato (bezafibrato, ciprofibrato, etofibrato, fenofibrato). Já em estatina, com dieta e exercício, triglicerídeo acima de 500: somar fenofibrato. Genfibrozila só em quem não pode usar estatina", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4 e 8" },
      { t: "Fibrato junto com estatina: tomar pela manhã, longe da estatina; genfibrozila nunca junto", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10" },
      { t: "Ácido nicotínico só para quem tem indicação de estatina, não tolera ou tem contraindicação e não cabe no fibrato", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4" },
      { t: "Rosuvastatina e ezetimiba não constam da RENAME 2024; o PCDT não preconiza a ezetimiba (não incorporada) nem os anti-PCSK9", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 7 e 9 · RENAME 2024" },
      { t: "Termo de esclarecimento: informar riscos, benefícios e efeitos adversos ao iniciar estatina ou fibrato", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 1 e 20" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · RENAME 2024 · SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025",
    farmacos: [
      { id: "sinvastatina", papel: "a estatina da UBS — primeira escolha para quem tem indicação pelo risco" },
      { id: "atorvastatina", papel: "dose alta só no muito alto risco (casos especiais do PCDT, atenção terciária); Componente Especializado" }
    ],
    combos: [],
    proibidos: ["car-estatina-genfibrozila", "car-sinvastatina-macrolideo"],
    dosemuda: ["car-sinvastatina-bcc-amiodarona"]
  },

  conduta: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "Estratificar uma vez por ano, dos 40 aos 74, com a HEARTS. Abaixo dos 40 e a partir dos 75: calculadora própria da faixa etária", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "PA normal alta com risco alto ou muito alto: anti-hipertensivo e estatina juntos", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 33" },
      { t: "Medidas sem fármaco para todos: alimentação com menos gordura animal (carne gordurosa, vísceras, leite integral, embutidos, pele de frango, gema), sem gordura trans e com menos óleo de coco, palma e dendê", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Exercício de 3 a 6 vezes por semana, cerca de 150 minutos semanais de leve a moderado; quem não tem sintoma dispensa avaliação médica prévia", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Tabagismo combatido de forma agressiva: abordagem cognitivo-comportamental e, se preciso, fármaco (Programa Nacional de Controle do Tabagismo)", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Triglicerídeo acima de 1.000: cortar gordura total (óleo de cozinha, gordura visível). Triglicerídeo secundário: menos carboidrato, dieta hipocalórica, zero álcool e compensar o diabetes", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 6" },
      { t: "Indicada a estatina: sinvastatina na UBS, à noite, contínua; TGO/TGP e CPK no início e aos 6 meses", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10" },
      { t: "Meta de LDL é da SBC, não do PCDT (que decide pelo risco, não pela busca do LDL-alvo), e vale para as categorias da SBC (escore PREVENT mais agravantes e estratificadores, Tabela 4.1), que não são as faixas da HEARTS: abaixo de 115 no baixo (PREVENT abaixo de 5%, sem DM2), de 100 no intermediário (5 a menos de 20%), de 70 no alto (20% ou mais, LDL de 190 ou mais, DM2 com estratificador), de 50 no muito alto (doença aterosclerótica significativa ou evento prévio), de 40 no extremo; não-HDL 30 acima. Não aplicar a meta à categoria da HEARTS", f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Muito alto risco que precisa de terapia agressiva: encaminhar — o PCDT sugere avaliação na atenção terciária", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 5" },
      { t: "O PCDT de Dislipidemia está em revisão em 2026: conferir se saiu portaria nova (calculadora, metas e estatinas podem mudar) antes de seguir as regras de 2019", v: true },
      { t: "Fluxo local da atorvastatina e dos fibratos (Componente Especializado): onde dar entrada no processo em Feira de Santana — confirmar com a farmácia", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019",
    itens: [
      { t: "Calcular o LDL por Friedewald com triglicerídeo acima de 400", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" },
      { t: "Ler colesterol total alto com triglicerídeo acima de 500 como hipercolesterolemia e dar só estatina — o risco imediato é a pancreatite", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 2, 3 e 4" },
      { t: "Genfibrozila junto com estatina", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4 e 10" },
      { t: "Prescrever rosuvastatina ou ezetimiba contando com o SUS", f: "RENAME 2024 · MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 7 e 9" },
      { t: "Subir a sinvastatina até a dose máxima para alcançar uma meta", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10 · SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Estatina em mulher em idade fértil sem contracepção segura", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4" },
      { t: "Calcular escore em quem já teve infarto ou AVC isquêmico — já é de alto risco", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 3" },
      { t: "Esperar o colesterol para estratificar — a HEARTS funciona sem exame", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Iniciar estatina sem TGO/TGP e CPK de base", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 10" },
      { t: "Claritromicina ou eritromicina sem rever a sinvastatina", f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
      { t: "Iniciar estatina com hipotireoidismo descompensado sem tratar a tireoide antes", f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019, p. 4" }
    ]
  },

  scores: ["nota-conferencia", "imc", "ckdepi"]
});

/* Onda APS II · agente cardiorrenal · queixa drc-aps (27/10/2026).
 * Base: PCDT Estratégias para Atenuar a Progressão da DRC 2024 (Portaria Conjunta
 * SAES/SECTICS nº 11; offset 0) e os protocolos de encaminhamento MS/UFRGS 2015
 * (vol. I, Nefrologia; offset 1) e TelessaúdeRS Nefrologia adulto (offset 1). As
 * Diretrizes Clínicas de DRC de 2014 são FALTA: o que dependia delas saiu VERIFICAR.
 * Páginas lidas por item: ver cardiorrenal.notas.md. */

QUEIXAS.push({
  id: "drc-aps",
  nome: "Doença renal crônica na APS — TFG, albuminúria, nefroproteção e quando encaminhar",
  kw: "drc doenca renal cronica insuficiencia renal tfg ckd epi creatinina albuminuria rac proteinuria microalbuminuria hematuria nefroprotecao ieca bra dapagliflozina espironolactona potassio hipercalemia nefrologia",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Cardiorrenal-Metabolica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023",
    itens: [
      { t: "DRC com sobrecarga de volume que não responde ao tratamento clínico: urgência (diálise de urgência)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "DRC com intoxicação aguda por álcool ou outras drogas: urgência (pode precisar de diálise de urgência)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "Potássio acima de 6,5 mEq/L, ou hipercalemia com alteração de condução no ECG ou fraqueza muscular: urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "Sinais de uremia — pericardite, náuseas e vômitos, encefalopatia, piora do estado mental sem explicação: urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "Síndrome nefrótica ou nefrítica com sobrecarga de volume, hipercalemia, uremia ou suspeita de lesão renal aguda: emergência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 6" },
      { t: "Proteinúria com PA sistólica acima de 180 ou diastólica acima de 100, ou subida rápida da PA com sintoma de emergência hipertensiva: emergência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 6" },
      { t: "Hematúria macroscópica com obstrução urinária, instabilidade hemodinâmica, sepse urinária ou dor de difícil manejo: emergência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 11" },
      { t: "Angioedema (língua, glote, laringe) em uso de IECA: pode obstruir a via aérea e matar — emergência", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 11" },
      { t: "Creatinina subindo mais de 30% ou hipercalemia 2 a 4 semanas depois de iniciar ou subir IECA, BRA ou espironolactona: rever a causa antes de seguir", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 16 e 17" }
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024",
    itens: [
      { t: "Fatores de risco: diabetes, hipertensão, idade avançada, obesidade, doença cardiovascular (coronária, AVC, doença vascular periférica, IC), DRC na família, tabagismo, doença glomerular, rins policísticos", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 2" },
      { t: "Usa anti-inflamatório, inibidor de bomba de prótons por muito tempo, antipsicótico atípico, laxativo com fosfato? Fez contraste recente? (nefrotóxicos)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 8" },
      { t: "Noctúria, urina espumosa ou escura, edema, falta de ar, coceira, inapetência, náusea, cansaço, pernas inquietas? (aparecem mais nos estágios 4 e 5)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" },
      { t: "Infecção urinária de repetição, doença urológica ou cálculo? (indicam imagem dos rins)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 5" },
      { t: "Quais medicamentos e em que dose? Na DRC as doses precisam ser revistas com frequência (metformina, sulfonilureia, dapagliflozina mudam pela TFG)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 8 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 23, 24 e 25" },
      { t: "Em uso de IECA, BRA ou espironolactona: usa suplemento de potássio, sal light (com potássio) ou outro diurético poupador de potássio?", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 13" },
      { t: "Mulher em idade fértil: contracepção e planos de gravidez (IECA, BRA e dapagliflozina não servem na gestação)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 12, 13 e 14" },
      { t: "Quando foi a última creatinina e a última albuminúria? (o seguimento depende do estágio)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 15" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024",
    itens: [
      { t: "PA, peso e IMC — hipertensão e obesidade são fatores de progressão", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 2 e 6" },
      { t: "Edema e sinais de sobrecarga de volume", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "Sopro abdominal (doença renovascular); assimetria de PA e de pulsos (coarctação)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 18" },
      { t: "Sinais de uremia: atrito pericárdico (pericardite), confusão ou piora do estado mental, prurido", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5 · MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" },
      { t: "Hálito urêmico como sinal de uremia", v: true },
      { t: "Palidez — a anemia da DRC aparece já nos estágios intermediários", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024",
    itens: [
      { t: "A DRC quase sempre não dá sintoma: só aparece se pedir TFG, EAS e albuminúria no hipertenso e no diabético", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 3" },
      { t: "TFG de 60 ou mais não descarta DRC: albuminúria, hematúria glomerular, alteração tubular ou de imagem já fazem o diagnóstico (estágios 1 e 2)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4 e 5" },
      { t: "DRC é risco cardiovascular: estimar o risco ao diagnóstico e uma vez por ano (HEARTS dos 40 aos 74); DRC estágio 3 ou mais já tem indicação de estatina", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Perda rápida da função: mais de 5 de TFG em 12 meses com TFG prévia abaixo de 60, ou queda de estágio com perda de 25% ou mais em 12 meses (no diabético, o PCDT de DM2 usa mais de 5 em 6 meses, confirmado em 2 exames)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 44" },
      { t: "Cilindros céreos, largos, graxos, epiteliais, hemáticos ou leucocitários no EAS: encaminhar à nefrologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "Hipertensão resistente na DRC com TFG abaixo de 60 (três anti-hipertensivos em dose plena, adesão conferida): nefrologia ou cardiologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 9" }
    ]
  },

  ddx: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023",
    itens: [
      { t: "Lesão renal aguda — alteração recente; a DRC exige alteração por mais de 3 meses", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" },
      { t: "Síndrome nefrótica — proteinúria acima de 3,5 g em 24 h, edema, albumina sérica baixa, hiperlipidemia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 16" },
      { t: "Síndrome nefrítica — hematúria, hipertensão, perda de função e menos urina, com proteinúria em geral abaixo do nível nefrótico", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 16" },
      { t: "Doença renovascular — sopro abdominal, HAS resistente que começa depois dos 50 ou antes dos 30, piora renal com IECA ou BRA, assimetria renal, edema pulmonar súbito", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 18" },
      { t: "Doença renal policística — história familiar com cistos múltiplos nos dois rins", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 19" },
      { t: "Hematúria não glomerular (dismorfismo negativo) — vai para a urologia, não para a nefrologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 11 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. I: Endocrinologia e Nefrologia, 2015, p. 15" },
      { t: "Obstrução — hidronefrose, cisto que obstrui, massa renal: urologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "Nefropatia por outra causa no diabético — a suspeita já é critério de encaminhamento à nefrologia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. I: Endocrinologia e Nefrologia, 2015, p. 14" }
    ]
  },

  exames: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024",
    itens: [
      { t: "Diagnóstico: TFG abaixo de 60, ou marcador de dano renal com TFG de 60 ou mais, por mais de 3 meses", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" },
      { t: "TFG estimada pela creatinina com a CKD-EPI — não usar depuração de creatinina em urina de 24 h nem Cockcroft-Gault", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" },
      { t: "EAS para todo paciente em risco; diabético ou hipertenso sem proteinúria no EAS: relação albumina/creatinina (RAC) em amostra isolada", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 5" },
      { t: "Estágio pela TFG: 1 (90 ou mais, com dano) · 2 (60 a 89, com dano) · 3A (45 a 59) · 3B (30 a 44) · 4 (15 a 29) · 5 (abaixo de 15). Albuminúria pela RAC em mg/g: A1 abaixo de 30 · A2 de 30 a 299 · A3 acima de 300", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 5 e 6" },
      { t: "Ultrassonografia de rins e vias urinárias: DRC na família, infecção urinária de repetição, doença urológica", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 5" },
      { t: "Hematúria: pesquisa de hemácias dismórficas no EAS — cilindro hemático ou dismorfismo = origem glomerular", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 5" },
      { t: "Em risco e ainda sem DRC: TFG, RAC e EAS uma vez por ano", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 15" },
      { t: "Estágios 1 e 2: TFG e EAS anuais. 3A: TFG, EAS, RAC, potássio, cálcio, fósforo, PTH e hemograma anuais (com RAC acima de 30, reavaliar a cada 6 meses). 3B: TFG, EAS, RAC e potássio a cada 6 meses", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 15" },
      { t: "Creatinina e potássio 2 a 4 semanas depois de iniciar ou subir IECA, BRA ou espironolactona", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 16" },
      { t: "Captopril com insuficiência renal: leucograma com diferencial antes de iniciar, a cada 2 semanas por cerca de 3 meses e depois periodicamente — suspender se neutrófilos abaixo de 1.000 (neutropenia). Com doença renal prévia ou dose alta: proteína urinária antes e periodicamente", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 11 e 12" },
      { t: "Albuminúria moderada ou grave só conta para encaminhar se confirmada em 2 exames, com 2 a 4 semanas de intervalo", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 6" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024",
    itens: [
      { t: "IECA ou BRA: diabético com DRC e RAC de 30 ou mais; não diabético com RAC de 300 ou mais — com ou sem hipertensão", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 8" },
      { t: "Espironolactona: DRC estágios 1 a 4 com RAC de 300 ou mais, hipertrofia ventricular esquerda ou IC; ao incluí-la, reduzir a dose do IECA", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 8 e 10" },
      { t: "Dapagliflozina somada ao IECA ou BRA: TFG entre 25 e 75 e, além disso, DM2 ou (sem diabetes) RAC acima de 300. Pelo PCDT de DRC, manter mesmo que a TFG caia ou a RAC melhore, até a terapia renal substitutiva; no DM2 com TFG persistentemente abaixo de 25, o PCDT de DM2 manda suspender (divergência entre os PCDTs: decidir com o nefrologista). Pode ser prescrita na APS", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 6, 11 e 17 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 40 e 44" },
      { t: "Depois de iniciar ou subir: potássio normal e creatinina sem subir mais de 30% — seguir até a dose máxima tolerada. Hipercalemia: rever medicamentos, dieta pobre em potássio, considerar diurético. Creatinina subindo mais de 30%: procurar causa de lesão aguda, evitar desidratação e diurético, pensar em estenose de artéria renal. Reduzir ou suspender só como última opção (a Figura 2 do PCDT traz '> 30%' no ramo da normocalemia, aparente erro de digitação; conferir com a preceptora)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 14 e 17" },
      { t: "IECA junto com BRA: não", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 41" },
      { t: "Evitar nefrotóxicos: AINE, contraste, aminoglicosídeo, antipsicótico atípico, preparo intestinal com fosfato ou alumínio, IBP em excesso — e ajustar a dose dos medicamentos à TFG", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 8" },
      { t: "No DM2, a TFG decide: metformina reduzida entre 30 e 45 e suspensa abaixo de 30; dapagliflozina não começa abaixo de 25", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 23 e 25" },
      { t: "Finerenona e cetoanálogos com dieta muito pobre em proteína não estão incorporados ao SUS", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 7 e 9" },
      { t: "Anemia, distúrbio mineral e ósseo e acidose da DRC têm PCDT próprio, que não foi baixado nesta onda: conferir antes de tratar", v: true }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025",
    farmacos: [
      { id: "enalapril", papel: "IECA da nefroproteção — dose inicial pela depuração de creatinina", linha: "Adulto com DRC" },
      { id: "captopril", papel: "IECA de várias tomadas; nefropatia diabética", linha: "Adulto com DRC" },
      { id: "losartana", papel: "o BRA do SUS — mesmas indicações do IECA; nunca junto com ele; sem ajuste inicial pela função renal", linha: "Adulto com DRC" },
      { id: "dapagliflozina", papel: "somada ao IECA ou BRA com TFG entre 25 e 75 e, além disso, DM2 ou (sem diabetes) RAC acima de 300; Componente Especializado", linha: "Adulto com DRC" },
      { id: "espironolactona", papel: "RAC de 300 ou mais, hipertrofia ventricular ou IC — olho no potássio; reduzir o IECA ao incluir", linha: "Adulto com DRC" },
      { id: "furosemida", papel: "diurético de alça quando a TFG fica abaixo de 30 ou há edema" },
      { id: "sinvastatina", outra: true, papel: "DRC estágio 3 ou mais já tem indicação de estatina" }
    ],
    combos: ["car-drc-ieca-dapagliflozina", "car-drc-espironolactona"],
    proibidos: ["cro-ieca-bra"],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024",
    itens: [
      { t: "Todo paciente com DRC fica na APS. Estágios 3B, 4 e 5, ou albuminúria A3: também com o nefrologista; mesmo em diálise, a APS segue junto", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 16 e 17" },
      { t: "Modo de vida: parar de fumar; 150 minutos de exercício por semana conforme a condição; perder peso até IMC normal; sódio abaixo de 2 g por dia (amplifica o efeito do IECA ou BRA); proteína abaixo de 0,8 g/kg/dia, com nutricionista", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 6 e 7" },
      { t: "Encaminhar à nefrologia: TFG abaixo de 30; TFG abaixo de 45 com complicação da DRC (anemia ou hipercalemia refratárias, hiperfosfatemia, hipocalcemia, hiperparatireoidismo, HAS resistente); perda rápida da função; cilindros patológicos; alteração anatômica (estenose de artéria renal, assimetria, policística)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 5" },
      { t: "Encaminhar por proteinúria: nefrótica (acima de 3,5 g em 24 h), com hematúria ou cilindros, ou albuminúria moderada a grave confirmada sem causa na APS. No DM1 com mais de 5 anos de diagnóstico, no DM2, na HAS complicada ou com TFG abaixo de 60: só com RAC de 300 ou mais depois de 6 meses de IECA ou BRA, PA e glicemia otimizados", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 6" },
      { t: "Pelo PCDT: estágios 1 a 3A encaminham se não diabético com RAC acima de 1 g/g, ou perda de 30% da TFG apesar de IECA ou BRA; 3B encaminha se não diabético com RAC acima de 300 ou a mesma perda", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 15" },
      { t: "TFG abaixo de 30 tem preferência no encaminhamento. Na guia: creatinina com data (duas, com no mínimo 12 meses de intervalo, se perda rápida), RAC ou proteinúria com o tipo de exame, EAS, laudo da ecografia e o número da teleconsultoria", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 3 e 5" },
      { t: "Diabético com TFG abaixo de 25: endocrinologista e nefrologista; suspender metformina, sulfonilureia e dapagliflozina e deixar só insulina", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 44" },
      { t: "Estágio 3B e 4: o PCDT sugere matriciamento, teleconsulta ou teleassessoramento para ampliar o acesso ao especialista", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 16" },
      { t: "Reavaliar quem está em tratamento a cada 6 meses (antes, se mudar algo)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 15" },
      { t: "Vacinação do renal crônico e periodicidade fina por estágio estão nas Diretrizes Clínicas de DRC de 2014, que não foram baixadas", v: true },
      { t: "Referência de nefrologia e de teleconsultoria de Feira de Santana: confirmar com a regulação", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024",
    itens: [
      { t: "Achar que creatinina normal descarta DRC no diabético ou hipertenso — sem RAC e EAS a lesão inicial passa", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4 e 5" },
      { t: "Estimar a função renal pela urina de 24 h ou por Cockcroft-Gault", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" },
      { t: "Fechar DRC com um exame só — o critério é alteração por mais de 3 meses", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 4" },
      { t: "Suspender IECA ou BRA na primeira subida da creatinina — o fluxograma do PCDT só manda rever a causa acima de 30%, e reduzir ou suspender é a última opção", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 17" },
      { t: "Iniciar IECA, BRA ou espironolactona e não pedir creatinina e potássio em 2 a 4 semanas", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 16" },
      { t: "Suspender a dapagliflozina só porque a TFG caiu depois de iniciada, ainda acima de 25 — pelo PCDT de DRC ela fica até a terapia renal substitutiva (no DM2 com TFG persistentemente abaixo de 25 o PCDT de DM2 manda suspender: ver conduta)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 6 e 11 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 40 e 44" },
      { t: "Prescrever anti-inflamatório para dor a quem tem DRC", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 8" },
      { t: "Manter metformina em dose cheia com TFG entre 30 e 45, ou mantê-la abaixo de 30", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 23" },
      { t: "Encaminhar à nefrologia por albuminúria de um exame só, sem confirmar e sem 6 meses de IECA ou BRA (no diabético e no hipertenso)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 6" },
      { t: "Mandar a hematúria não glomerular para a nefrologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 11" },
      { t: "Deixar o diabético hipertenso anos sem nenhum dado de função renal no prontuário — TFG e RAC são anuais", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 33, 38 e 42" }
    ]
  },

  scores: ["nota-conferencia", "ckdepi", "imc"]
});

/* Onda APS II · agente cardiorrenal · queixa insuficiencia-cardiaca (27/10/2026).
 * Base: PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida 2024 (Portaria
 * Conjunta SAES/SECTICS nº 10; offset 0) — Quadros 1 a 6, Figuras 1 e 2, texto das
 * p. 2 a 19, TER (p. 24 e 25). Edema agudo de pulmão na UBS: CAB nº 28, vol. II
 * (p. 73). O PCDT cobre a IC crônica estável com FE abaixo de 40%; IC aguda e
 * descompensada vão para a emergência. Páginas por item: cardiorrenal.notas.md. */

QUEIXAS.push({
  id: "insuficiencia-cardiaca",
  nome: "Insuficiência cardíaca (ICFEr) — diagnóstico, os pilares do tratamento e quando remover",
  kw: "insuficiencia cardiaca icc ic icfer fracao de ejecao reduzida dispneia ortopneia edema congestao bnp nt probnp ecocardiograma nyha ieca betabloqueador carvedilol metoprolol espironolactona furosemida dapagliflozina sacubitril digoxina hidralazina nitrato edema agudo de pulmao",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Cardiorrenal-Metabolica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "Sinais de hipoperfusão, hipotensão, síncope ou choque: emergência", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7 e 18" },
      { t: "Piora recente dos sintomas e sinais de congestão, ou suspeita de IC aguda: serviço de emergência — e procurar a causa (síndrome coronariana aguda, miocardite, doença valvar)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7 e 18" },
      { t: "Edema agudo de pulmão — dispneia intensa, sudorese, cianose, tosse com espuma rosada, crepitações das bases aos ápices: chamar o SAMU já; até a remoção, sentado com as pernas pendentes, oxigênio, acesso venoso, furosemida EV (cautela se PAS abaixo de 90) e, com PAS acima de 90, nitrato sublingual (cartões furosemida e dinitrato-de-isossorbida)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 73 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016, AC24" },
      { t: "Em uso de digoxina: náusea, vômitos, diarreia, distúrbio visual, bradicardia ou arritmia — intoxicação digitálica até prova em contrário (janela terapêutica estreita)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 15" },
      { t: "Angioedema em uso de IECA ou de sacubitril-valsartana: suspender e tratar como emergência de via aérea", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12 e 14 · MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 11" },
      { t: "Hipercalemia em uso de IECA, BRA ou espironolactona (o PCDT conta acima de 5,5 com o IECA e pede cautela com a espironolactona já acima de 5,0): rever a dose e os associados", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12 e 13" },
      { t: "Angina, tontura ou piora da dispneia durante o exercício: interromper a atividade e reavaliar", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 9" }
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "Falta de ar: em repouso, ao deitar (ortopneia), acordando à noite (dispneia paroxística noturna), andando no plano ou só na subida? (pontua no escore de Boston)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 3" },
      { t: "Classe funcional NYHA: o que a atividade habitual causa — nada (I), dispneia ou cansaço nas habituais (II), nas menores que as habituais (III), em repouso (IV)?", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7" },
      { t: "Inchaço nas pernas, tosse à noite, cansaço, perda de capacidade para o que fazia antes?", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 2 e 4" },
      { t: "Ganhou peso nos últimos dias? Pesa-se todo dia? (o diurético se ajusta pelo peso e pelo edema)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 13" },
      { t: "Toma todos os remédios, todo dia? O que faz quando esquece? Sabe para que serve cada um?", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 17" },
      { t: "Palpitação ou pulso irregular? (IC com fibrilação atrial vai também ao especialista)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 18 e 19" },
      { t: "Internou por IC no último ano?", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 18" },
      { t: "Hipertensão, diabetes, doença coronariana, doença renal, doença valvar? Mulher que pode engravidar? (IECA, BRA e sacubitril-valsartana são proibidos na gestação)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7, 11, 24 e 25" },
      { t: "Vacina de influenza deste ano, pneumococo e COVID-19 em dia?", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "Frequência cardíaca e PA (FC acima de 110 pontua no Boston; PA e FC baixas sem sintoma não obrigam a reduzir o betabloqueador)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 3 e 12" },
      { t: "Turgência jugular e refluxo hepatojugular — junto com a terceira bulha, indicam alta suspeita de IC, embora faltem na maioria", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 3" },
      { t: "Ausculta: terceira bulha (galope); crepitações só nas bases ou além delas; sibilos", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 3" },
      { t: "Edema de tornozelos bilateral e hepatomegalia", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 3 e 4" },
      { t: "Peso em toda consulta e IMC (acima de 35 pede redução de peso)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10 e 13" },
      { t: "Sinais de baixo débito — hipoperfusão, hipotensão, choque: emergência", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "Probabilidade pelo escore de Boston: até 4 pontos, baixa; 5 a 7, moderada; 8 a 12, IC definida. Framingham: 2 critérios maiores, ou 1 maior e 2 menores", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 4 e 5" },
      { t: "Alta probabilidade clínica: tratar já, incluindo o diurético, sem esperar BNP nem ecocardiograma — o eco vem depois, para medir a fração de ejeção", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7" },
      { t: "IC com fração de ejeção preservada (acima de 50%) tem o mesmo quadro e tratamento diferente: encaminhar ao especialista", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7 e 18" },
      { t: "Descompensação tem causa: síndrome coronariana aguda, miocardite, doença valvar, entre outras — procurar", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7" },
      { t: "Fibrilação atrial com IC: controle de ritmo ou frequência e anticoagulação decididos no serviço especializado, com acompanhamento junto na APS", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 19" },
      { t: "Para benefício previdenciário, IC sozinha não é cardiopatia grave: registrar tempo de doença, classe NYHA, disfunção ventricular e tratamento em uso", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 17 e 18" }
    ]
  },

  ddx: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "Outras doenças cardiopulmonares — a dispneia não é exclusiva da IC", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 3" },
      { t: "BNP alto sem IC — síndrome coronariana aguda, embolia pulmonar, miocardite, hipertrofia ventricular, doença valvar, taquiarritmia, hipertensão pulmonar", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 4 e 5" },
      { t: "BNP alto de causa não cardíaca — AVC, hemorragia subaracnoidea, disfunção renal ou hepática moderada a grave, infecção grave, queimadura, anemia, distúrbio metabólico grave", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 5" },
      { t: "ICFEP — mesmo quadro, fração de ejeção acima de 50%, comum no idoso", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7" },
      { t: "Edema por síndrome nefrótica — proteinúria nefrótica, edema, albumina sérica baixa", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 16" },
      { t: "Edema pulmonar de origem não cardiovascular — o edema agudo de pulmão nem sempre é IC", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 73" }
    ]
  },

  exames: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "ECG e radiografia de tórax: exames simples, com alterações comuns na IC, que corroboram o diagnóstico clínico", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 2 e 3" },
      { t: "Baixa probabilidade: BNP ou NT-proBNP primeiro (corte 35 e 125 pg/mL); negativo, procurar outra causa; positivo, ecocardiograma. Moderada: BNP ou eco, conforme o acesso. Alta: não pedir BNP", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 4, 5 e 7" },
      { t: "Ecocardiograma transtorácico: confirma e mede a fração de ejeção — ICFEr é abaixo de 40%", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7 e 8" },
      { t: "Em IECA, BRA e diurético: creatinina e eletrólitos (potássio, sódio, magnésio) periódicos; a creatinina sobe até 10–20% ao iniciar o IECA, sem progredir", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12 e 13" },
      { t: "Espironolactona: potássio na 1ª semana, no 1º mês e depois a cada 1 a 4 meses, e a cada aumento de dose", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 13" },
      { t: "BNP ou NT-proBNP no paciente já diagnosticado: só para ver se cabe o sacubitril-valsartana (BNP acima de 150 ou NT-proBNP acima de 600 pg/mL)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 4 e 8" },
      { t: "Digoxinemia: para ajustar a dose ou na suspeita de intoxicação", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 15" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "Tratamento padrão do PCDT: IECA (enalapril ou captopril), betabloqueador, espironolactona e diurético se houver congestão — todos em dose baixa, subindo até a maior dose tolerada (doses-alvo no Quadro 5)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10, 11, 12 e 16" },
      { t: "IECA para todo ICFEr, com ou sem sintoma. BRA (losartana) só se não tolerar o IECA, sobretudo por tosse — quem não tolerou por hipercalemia ou piora renal não é candidato a BRA", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 11 e 12" },
      { t: "Betabloqueador: carvedilol ou succinato de metoprolol (os do SUS com evidência); propranolol e atenolol não. Começar só no paciente compensado, não congesto; pode haver piora funcional discreta no início", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12" },
      { t: "Espironolactona na NYHA II a IV sintomática, já com IECA ou BRA e betabloqueador nas maiores doses toleradas; cautela com potássio acima de 5,0 mmol/L e perda de função renal", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12 e 13" },
      { t: "Diurético só com congestão: o de alça (furosemida) é o preferido; na congestão resistente, alça e tiazídico juntos. O paciente pode ajustar a dose pelo peso diário e pelo edema", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 13" },
      { t: "Ainda sintomático, NYHA II a IV, fração de ejeção abaixo de 40%: somar dapagliflozina (reduz hospitalização e morte)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 11 e 13" },
      { t: "Sacubitril-valsartana no lugar do IECA ou BRA: menos de 75 anos, NYHA II, fração de ejeção até 35%, BNP ou NT-proBNP altos, otimizado e sintomático — prescrição inicial pelo especialista, seguimento na APS; pelo menos 36 horas depois do último IECA", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 8 e 14" },
      { t: "Persistindo sintomático: hidralazina com nitrato (preferida na população negra; também para quem não tolera IECA e BRA por hipercalemia ou perda renal) ou digoxina em dose baixa", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 11, 14 e 15" },
      { t: "Reavaliar os sintomas quatro semanas depois de otimizar a dose do último fármaco", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 11" },
      { t: "Ivabradina não está incorporada ao SUS", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10" },
      { t: "Na farmácia da UBS: enalapril, captopril, losartana, carvedilol, succinato de metoprolol, espironolactona, furosemida, hidroclorotiazida, hidralazina, digoxina, nitratos. Dapagliflozina e sacubitril-valsartana: Componente Especializado", f: "RENAME 2024" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016",
    farmacos: [
      { id: "enalapril", papel: "IECA do tratamento padrão — todo ICFEr, com ou sem sintoma", linha: "Adulto — ICFEr" },
      { id: "captopril", papel: "IECA de três tomadas — alternativa ao enalapril", linha: "Adulto — ICFEr" },
      { id: "losartana", papel: "só se não tolerar o IECA (tosse); não serve a quem teve hipercalemia ou piora renal com IECA", linha: "Adulto — ICFEr" },
      { id: "carvedilol", papel: "betabloqueador da IC — começar só compensado", linha: "Adulto — ICFEr" },
      { id: "metoprolol", papel: "na IC, só o succinato (liberação prolongada) — começar só compensado", linha: "Adulto — ICFEr" },
      { id: "espironolactona", papel: "NYHA II a IV sintomática, somada ao IECA ou BRA e betabloqueador — olho no potássio", linha: "Adulto — ICFEr" },
      { id: "furosemida", papel: "diurético de escolha na congestão; EV no edema agudo de pulmão até a remoção", linha: "Adulto — ICFEr" },
      { id: "hidroclorotiazida", papel: "somada à furosemida na congestão resistente", linha: "Adulto — ICFEr" },
      { id: "dapagliflozina", papel: "somada ao tratamento padrão se ainda sintomático (FE abaixo de 40%); Componente Especializado", linha: "Adulto — ICFEr" },
      { id: "sacubitril-valsartana", papel: "substitui o IECA ou BRA nos critérios do PCDT; prescrição inicial do especialista" },
      { id: "hidralazina", papel: "com nitrato: intolerância a IECA e BRA por hipercalemia ou perda renal; NYHA III e IV, sobretudo na população negra", linha: "Adulto — ICFEr" },
      { id: "mononitrato-de-isossorbida", papel: "o nitrato oral que se associa à hidralazina" },
      { id: "dinitrato-de-isossorbida", papel: "edema agudo de pulmão com PAS acima de 90, até a remoção; para o uso crônico com hidralazina, o nitrato é o mononitrato", linha: "Adulto — edema agudo de pulmão" },
      { id: "digoxina", papel: "dose baixa em quem segue sintomático apesar do tratamento otimizado; no idoso, teto menor (linha 'Idoso — ICFEr')" }
    ],
    combos: ["car-ic-terapia-padrao", "car-hidralazina-nitrato"],
    proibidos: ["car-sacubitril-ieca", "cro-ieca-bra"],
    dosemuda: ["car-losartana-ic-has", "car-hidralazina-ic-has"]
  },

  conduta: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "A APS acompanha a maioria: suspeita de IC, NYHA I e II, diagnóstico recente em otimização. Encaminhar a IC sem necessidade deve ser evitado", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 2 e 18" },
      { t: "Especialista, com a APS corresponsável: NYHA II com critério de sacubitril-valsartana; NYHA III e IV já otimizado; internação por IC no último ano; sem acesso a eco ou BNP; disfunção grave candidata a dispositivo ou transplante; fibrilação atrial; suspeita de ICFEP", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 18" },
      { t: "Restrição de líquidos (1,5 a 2 litros por dia) só com congestão persistente, NYHA III e IV ou hiponatremia — não para todos", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 9" },
      { t: "Sal: dieta normossódica, cerca de 7 g de sal por dia; menos de 5 g por dia piorou desfechos", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 9" },
      { t: "Exercício aeróbico no estável, 25 a 60 minutos por dia, ao menos 3 vezes por semana, em programa de reabilitação; NYHA IV, arritmia não controlada, valvopatia grave e IC descompensada não fazem; NYHA III, supervisionado (Academia da Saúde, NASF)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 9" },
      { t: "Peso: IMC acima de 35, perder peso; abaixo de 35, não orientar emagrecer, salvo outra indicação (diabetes, artrose)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10" },
      { t: "Vacina de influenza todo ano; pneumococo e COVID-19 também indicadas", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10" },
      { t: "Adesão: explicar por escrito e de viva voz para que serve cada remédio, o horário e o que fazer se esquecer; visita domiciliar e lembretes; telemonitoramento por telefone para quem saiu da internação, é NYHA III e IV ou tem dificuldade de locomoção", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 17" },
      { t: "Autocuidado: pesar-se, observar edema e falta de ar, e saber quando voltar ou procurar a emergência", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 9 e 13" },
      { t: "Quem acionar na descompensação (SAMU, UPA de referência) e o acesso a ecocardiograma e BNP pela regulação de Feira de Santana: confirmar na USF", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024",
    itens: [
      { t: "Esperar o ecocardiograma para começar o diurético no paciente congesto com alta probabilidade", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7" },
      { t: "Pedir BNP quando a probabilidade clínica já é alta", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 7" },
      { t: "Usar propranolol ou atenolol como betabloqueador da IC", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12" },
      { t: "Começar betabloqueador no paciente congesto", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12" },
      { t: "Reduzir ou suspender o betabloqueador por PA ou FC baixas em quem está sem sintoma", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12" },
      { t: "Trocar o IECA por BRA em quem teve hipercalemia ou piora renal com o IECA", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12" },
      { t: "Parar o IECA, a losartana ou o betabloqueador na dose inicial ou no teto da HAS — a IC tem dose-alvo própria", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 12 e 16" },
      { t: "Diurético de rotina em quem não tem congestão", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 13" },
      { t: "Restringir líquido de todo paciente com IC, ou cortar o sal abaixo de 5 g por dia", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 9" },
      { t: "Mandar emagrecer quem tem IC e IMC abaixo de 35, sem outra indicação", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10" },
      { t: "Começar o sacubitril-valsartana antes de 36 horas da última dose do IECA, ou junto com ele", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 14" },
      { t: "Digoxina no idoso acima do teto da linha 'Idoso — ICFEr' do cartão (acima dele é medicamento potencialmente inapropriado), ou em dose cheia no renal crônico e no paciente de baixo peso", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 15 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Nitrato em quem usou inibidor da fosfodiesterase-5 — sildenafila, vardenafila ou lodenafila nas últimas 24 horas, tadalafila nas últimas 48 horas", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016, AC17" }
    ]
  },

  scores: ["nota-conferencia", "imc", "ckdepi"]
});

/* Onda APS II · agente cardiorrenal · queixa obesidade-adulto (27/10/2026).
 * Base: PCDT Sobrepeso e Obesidade em Adultos 2020 (Portaria SCTIE/MS nº 53;
 * offset 0 no corpo do PCDT), TeleCondutas Obesidade 2022 (TelessaúdeRS; offset 0),
 * CAB nº 38 (2014; sem página), protocolo de encaminhamento MS/UFRGS 2015 e IN
 * Anvisa nº 360/2025. O SUS não tem fármaco para obesidade: guia de abordagem, sem
 * cartão de fármaco e sem formulário. O Manual de obesidade na APS (2022) é FALTA.
 * Páginas lidas por item: ver cardiorrenal.notas.md. */

QUEIXAS.push({
  id: "obesidade-adulto",
  nome: "Obesidade no adulto — abordagem na APS (sem fármaco no SUS)",
  kw: "obesidade sobrepeso excesso de peso imc circunferencia abdominal cintura emagrecer perda de peso dieta alimentacao atividade fisica bariatrica cirurgia compulsao alimentar sibutramina orlistate liraglutida semaglutida glp-1",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Cardiorrenal-Metabolica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014",
    itens: [
      { t: "Perda de peso sem querer com poliúria e polidipsia em quem tem excesso de peso: diabetes descompensado até prova em contrário — glicemia capilar agora; HbA1c acima de 9% ou sintomas pedem insulina", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 22 e 25" },
      { t: "Obesidade central com giba, pele fina, estrias violáceas e equimoses: síndrome de Cushing (a causa mais comum é o corticoide) — encaminhar à endocrinologia", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 11 · TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 20" },
      { t: "Ganho de peso com cefaleia, alteração visual, convulsão, sonolência ou mudança de comportamento: obesidade hipotalâmica — rara, ligada a tumor, trauma ou hipertensão intracraniana; não é caso de dieta", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 11" },
      { t: "Comer descontrolado com vômito provocado, laxante ou outra compensação (bulimia): tratar o transtorno alimentar primeiro, com equipe multiprofissional, e só depois o peso", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 29" },
      { t: "Sintomas depressivos: o excesso de peso se associa a mais depressão e suicídio — perguntar diretamente por ideação e plano", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 22 · guia-bolso-aps.html" },
      { t: "Pós-bariátrica com sintoma novo: as complicações incluem trombose venosa, embolia pulmonar, pancreatite, obstrução intestinal e beribéri — avaliar, não orientar dieta", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014" }
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022",
    itens: [
      { t: "Como e quando o peso subiu? O que desencadeou (parar de fumar, estresse, cirurgia, gestação, remédio novo)?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 4 e 11" },
      { t: "Usa antipsicótico, antidepressivo (amitriptilina, mirtazapina, paroxetina), lítio, corticoide, propranolol, insulina ou sulfonilureia, anticonvulsivante, anti-histamínico de 1ª geração ou progestágeno injetável? (fármacos obesogênicos)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 5" },
      { t: "Come grande quantidade com sensação de perder o controle? Come escondido, à noite? Compensa com vômito ou laxante?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 4 · MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 29 e 30" },
      { t: "Padrão alimentar: ultraprocessados, refrigerante e suco adoçado, número de refeições; atividade física e tempo de tela", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 11 · MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 18 e 20" },
      { t: "Ronco, pausas na respiração, sonolência de dia? (apneia do sono)", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 10 · TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" },
      { t: "Doenças já conhecidas, exames e tratamentos que já tentou — e o que espera do tratamento agora?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 11" },
      { t: "Quer mudar agora? Em que estágio está (não pensa nisso, pensando, se preparando, já mudou)?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6 e 9" },
      { t: "Família: obesidade, diabetes, hábitos alimentares e de exercício em casa", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 11" },
      { t: "Fuma? Humor, sono, dor nas articulações, refluxo, perda de urina?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020",
    itens: [
      { t: "Pedir permissão para medir e fazer em local reservado", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 9" },
      { t: "Peso, altura e IMC: sobrepeso 25 a 29,9 · obesidade grau I 30 a 34,9 · grau II 35 a 39,9 · grau III 40 ou mais. De 18 a 20 anos incompletos, IMC para a idade (escore-z); no idoso, sobrepeso a partir de 27", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 7 e 8" },
      { t: "Circunferência abdominal em todo obeso com IMC abaixo de 35, no ponto médio entre a última costela e a crista ilíaca: elevada a partir de 94 cm no homem e 80 cm na mulher", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" },
      { t: "PA em toda consulta, com manguito adequado ao braço", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" },
      { t: "Frequência cardíaca", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 31" },
      { t: "Sinais de causa endócrina: giba, estrias violáceas e equimoses (Cushing); bradicardia e rarefação de pelos (hipotireoidismo); hirsutismo (ovários policísticos)", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 11" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020",
    itens: [
      { t: "Obesidade é doença crônica e multifatorial, não falha moral: o estigma do profissional afasta a pessoa do serviço e piora o cuidado", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 4 e 5" },
      { t: "Rastrear o que vem junto: diabetes, hipertensão, dislipidemia, esteatose hepática, apneia do sono, artrose, refluxo, colelitíase, depressão", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" },
      { t: "O IMC engana no músculo aumentado, acima dos 80 anos e em orientais — e não mostra onde está a gordura", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6 · MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 7" },
      { t: "Na insuficiência cardíaca, IMC entre 30 e 35 tem menos mortalidade: só orientar perder peso acima de 35, ou com outra indicação", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 10" },
      { t: "Gestante: IMC pela semana gestacional, e dieta para emagrecer sem acompanhamento não", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 25 e 26" },
      { t: "Compulsão alimentar: o foco inicial é o comportamento alimentar e o fim das dietas restritivas; o peso vem depois", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 30" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014",
    itens: [
      { t: "Hipotireoidismo — fadiga, frio, constipação, bradicardia; o ganho é modesto e não explica obesidade grave", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 11" },
      { t: "Síndrome de Cushing — obesidade central, giba, atrofia da pele, estrias violáceas, equimoses; quase sempre por corticoide", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 11" },
      { t: "Síndrome dos ovários policísticos — hirsutismo, oligo ou amenorreia, resistência à insulina", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 11" },
      { t: "Obesidade por medicamento — antipsicótico, antidepressivo, lítio, corticoide, anticonvulsivante, insulina, progestágeno", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 4 e 5" },
      { t: "Transtorno alimentar — compulsão periódica, bulimia, síndrome do comer noturno", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 4" },
      { t: "Ganho de peso por líquido — edema, dispneia e ortopneia (IC) ou edema com proteinúria (síndrome nefrótica)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024, p. 3 e 4 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 16" },
      { t: "Obesidade hipotalâmica — cefaleia, alteração visual, convulsão, sonolência, alteração de comportamento; muito rara", f: "MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 11" }
    ]
  },

  exames: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022",
    itens: [
      { t: "Sem comorbidade conhecida nem suspeita clínica: hemograma, glicemia de jejum, perfil lipídico, TGO, TGP e TSH", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" },
      { t: "Outros exames só pela suspeita clínica; não pedir bateria a cada consulta", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6 · MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 31" },
      { t: "Diabetes: jejum ≥126 ou HbA1c ≥6,5% (dois resultados no assintomático)", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 7 e 8" },
      { t: "Risco cardiovascular dos 40 aos 74 anos com a HEARTS — sem colesterol, ela usa peso e altura", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020",
    itens: [
      { t: "O SUS não tem fármaco para obesidade: orlistate e sibutramina foram avaliados e não incorporados (Portarias SCTIE nº 14 e 15, de 2020) — perda de peso pequena, com eventos adversos moderados a graves", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 13" },
      { t: "Fora do SUS, o fármaco pode ser considerado se a pessoa não perdeu 5% em 3 a 6 meses de mudança de hábitos e tem IMC acima de 30, ou de 27 a 29,9 com comorbidade (risco cardiovascular acima de 20%, doença cardiovascular, HAS ou diabetes de difícil controle, apneia, artrose) — decisão individual, custo conversado", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 14" },
      { t: "Aprovados para obesidade no Brasil pelo TeleCondutas (2022): sibutramina, orlistate e liraglutida; semaglutida, bupropiona e topiramato são uso off-label. A maioria não está na RENAME", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 14" },
      { t: "Sibutramina: receita B2 (azul) e termo de consentimento assinado por médico e paciente, entregue na farmácia; contraindicada em HAS mal controlada, insuficiência renal, disfunção hepática grave, glaucoma, abuso de drogas e doença cardiovascular estabelecida", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 16" },
      { t: "Agonistas de GLP-1 (semaglutida, liraglutida, tirzepatida e outros): retenção de receita, válida por 90 dias", f: "Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025" },
      { t: "GLP-1: não na gestação nem com história de pancreatite, de carcinoma medular de tireoide na família ou de neoplasia endócrina múltipla 2A ou 2B; somado a insulina ou sulfonilureia, monitorar glicemia capilar (hipoglicemia)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 15 e 17" },
      { t: "Escolha e dose dos fármacos fora do SUS: a diretriz brasileira mais nova de tratamento farmacológico da obesidade (2026) não foi baixada nesta onda — conferir antes de prescrever", v: true }
    ]
  },

  conduta: {
    fonte: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020",
    itens: [
      { t: "Sem julgar: identificar, conversar sobre as complicações já instaladas ou possíveis e estimular o tratamento — conforme o estágio de motivação, informar, explorar barreiras ou montar um plano com data, metas e obstáculos", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6 e 9" },
      { t: "Meta realista: perder 5 a 10% do peso já melhora PA, glicemia e triglicerídeo; sucesso é manter perda de 10% ou mais depois de 1 ano — não é chegar ao IMC normal", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 12 · TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 8" },
      { t: "Encontros individuais ou em grupo ao menos mensais, mais frequentes nos primeiros 6 meses, por cerca de 12 meses ou mais; sem comorbidade, ao menos uma avaliação médica por ano", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 10 · MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 31" },
      { t: "Alimentação pelos 10 passos do Guia Alimentar: base em alimentos in natura, evitar ultraprocessados, trocar bebida açucarada por água, ao menos 3 refeições por dia, pouco óleo, sal e açúcar; plano com déficit de 500 a 1.000 kcal por dia feito por profissional capacitado", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 18, 19 e 23" },
      { t: "Atividade física: 150 minutos por semana de moderada (ou 75 de vigorosa), aeróbica e de força, fortalecimento 2 vezes por semana; começar moderado; quem não aguenta, sessões de 10 minutos somadas, progredindo", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 20, 21 e 23" },
      { t: "Suporte psicológico com entrevista motivacional e terapia cognitivo-comportamental, individual ou em grupo; PICS (yoga, auriculoterapia por 12 semanas, tai chi chuan) quando houver", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 22, 23 e 24" },
      { t: "Rede: nutricionista da APS e polo da Academia da Saúde. Nutricionista com prioridade para quem tem comorbidade que exige dieta específica (DRC, hepatopatia, diabetes com insulina, IC, doença celíaca), candidato à cirurgia ou falha na APS", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 32 · TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 20" },
      { t: "No fluxo do SUS, IMC de 25 a 39,9 se cuida na APS; IMC 35 ou mais com comorbidade descompensada, ou 40 ou mais, vai também à atenção especializada", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 34" },
      { t: "Cirurgia bariátrica — discutir o encaminhamento: IMC de 50 ou mais; IMC de 40 a 49,9 depois de 2 anos de tratamento clínico longitudinal sem sucesso na APS; IMC de 35 a 39,9 com comorbidade (risco cardiovascular acima de 20%, doença cardiovascular, HAS ou diabetes de difícil controle, apneia, artrose), também depois de 2 anos", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 18 · MS — CAB nº 38, Estratégias para o cuidado da pessoa com doença crônica: obesidade, 2014, Quadro 20" },
      { t: "Na guia da bariátrica: IMC, peso, altura, descrição do tratamento clínico de pelo menos 2 anos, risco ou doença cardiovascular, diabetes e HAS de difícil controle com os remédios, apneia (como foi diagnosticada) e doença articular", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. I: Endocrinologia e Nefrologia, 2015, p. 12" },
      { t: "Suspeita de obesidade secundária (causa endócrina): endocrinologia", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 20 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. I: Endocrinologia e Nefrologia, 2015, p. 12" },
      { t: "Peso estável: IMC uma vez por ano; pesar-se em casa uma vez por semana ajuda, se a pessoa quiser e tiver balança", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 30 e 31" },
      { t: "Nutricionista da eMulti, polo da Academia da Saúde e serviço de referência para bariátrica de Feira de Santana: confirmar na USF e na regulação", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020",
    itens: [
      { t: "Tratar a obesidade como preguiça ou gula — culpa e estigma afastam a pessoa do serviço", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 4 e 5" },
      { t: "Prescrever dieta sem avaliar se a pessoa quer e pode mudar agora", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6 e 8" },
      { t: "Pôr o IMC normal como meta", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 12" },
      { t: "Dieta muito restritiva, rígida e artificial — não se sustenta", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 14" },
      { t: "Não medir a circunferência abdominal no obeso com IMC abaixo de 35", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" },
      { t: "Medir sem pedir permissão ou em local sem privacidade", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 9" },
      { t: "Orientar trocar açúcar por adoçante para emagrecer", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 19" },
      { t: "Prescrever orlistate, sibutramina ou GLP-1 contando com a farmácia do SUS", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 13" },
      { t: "Encaminhar para bariátrica (IMC abaixo de 50) sem os 2 anos de tratamento clínico longitudinal documentados", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 18" },
      { t: "Não olhar a lista de remédios atrás de fármaco obesogênico", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 4 e 5" },
      { t: "Mirar o peso de quem tem bulimia ou compulsão antes de tratar o transtorno alimentar", f: "MS — PCDT Sobrepeso e Obesidade em Adultos, Portaria SCTIE/MS nº 53, 2020, p. 29 e 30" },
      { t: "Ver o obeso só pelo peso e não rastrear diabetes — a estreia com HbA1c muito alta passa batida", f: "TelessaúdeRS-UFRGS — TeleCondutas: Obesidade, 2022, p. 6" }
    ]
  },

  scores: ["nota-conferencia", "imc"]
});

/* Agente digestivo (onda APS II, 27/10/2026) — queixa "dispepsia-drge".
 * Base: Protocolo de Gastroenterologia adulto do TelessaúdeRS (2025, Protocolos 7–10, Quadro 9);
 * TeleCondutas Alterações Endoscópicas (2024, Apêndices A–C, baseados no IV Consenso, 2018);
 * V Consenso Brasileiro de H. pylori (FBG, 2026, Statements 4–34, Tabela 3); Diretriz de DRGE da FBG
 * (2024); CAB nº 28 vol. II (2012) só para acolhimento e abdome agudo. Não há fonte do MS para
 * dispepsia, DRGE ou H. pylori. Páginas: ver digestivo.notas.md. */

QUEIXAS.push({
  id: "dispepsia-drge",
  nome: "Dispepsia, refluxo (DRGE) e H. pylori",
  kw: "dispepsia azia pirose queimacao epigastralgia gastrite ulcera refluxo drge regurgitacao empachamento h pylori helicobacter omeprazol ibp endoscopia eda",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Digestivo-Nutricional",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Sinal de alarme — disfagia, odinofagia, emagrecimento, vômitos persistentes, sangramento digestivo crônico ou anemia ferropriva sem causa, massa epigástrica: EDA (ou encaminhar), não prova terapêutica",
      "Dispepsia recente em quem tem parente de 1º grau com câncer gástrico ou de esôfago: EDA",
      "Dispepsia de início recente a partir dos 50 anos, sem causa: EDA",
      { t: "Pelo V Consenso, dispepsia a partir dos 40 anos já indica EDA com biópsia", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      "Dispepsia em quem vai começar antiplaquetário ou anticoagulante: EDA antes",
      { t: "Dor epigástrica súbita e intensa, abdome tenso ou rígido, defesa, sinais de choque: abdome agudo (úlcera perfurada, pancreatite, colecistite) — jejum e pronto-socorro já", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "'Dor no estômago' pode ser infarto: o IAM está entre as causas extra-abdominais de abdome agudo", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Hematêmese, melena ou sangue vivo pelo ânus agora, ou com taquicardia, palidez ou hipotensão: hemorragia digestiva — atendimento imediato, acesso venoso, acionar o SAMU", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "História de hematêmese ou de fezes pretas, estável: sinal de alarme — EDA, não prova terapêutica", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "O que predomina: dor ou queimação epigástrica e empachamento (dispepsia), ou azia e regurgitação (refluxo)? Quantas vezes por semana?",
      "Há quanto tempo? O que piora e o que alivia? Perdeu peso sem querer, e quanto?",
      "Dificuldade ou dor para engolir, vômitos que não param, fezes pretas ou com sangue?",
      "Parente de 1º grau com câncer de estômago ou de esôfago? Com que idade?",
      "Usa AAS, anti-inflamatório, antiplaquetário ou anticoagulante? Vai começar?",
      "Já usou omeprazol ou outro IBP? Em que dose, por quanto tempo, e tomava 30 minutos antes do café?",
      { t: "Já tratou H. pylori? Com quais antibióticos (claritromicina, levofloxacino)? Tem alergia comprovada a penicilina?", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      "Já fez endoscopia? O laudo, a biópsia e o teste de H. pylori estão com o paciente?",
      { t: "Fuma? Bebe? Ganhou peso? (medidas comportamentais e perda de peso entram no tratamento da DRGE)", f: "FBG — Diretriz brasileira de tratamento da doença do refluxo gastroesofágico, Arq Gastroenterol, 2024" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Sinais vitais: taquicardia, hipotensão ou choque mudam a consulta para urgência",
      "Peso e IMC; comparar com o peso anterior (emagrecimento é alarme)",
      "Palidez de mucosas (anemia)",
      "Palpação abdominal: massa epigástrica, defesa, abdome tenso ou rígido, dor desproporcional",
      "Sinal de Murphy (colecistite) e sinais de colestase: icterícia, colúria, acolia"
    ]
  },

  naoperder: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Câncer gástrico ou de esôfago por trás de dispepsia com sinal de alarme",
      "Anemia ferropriva sem causa: EDA e também colonoscopia",
      "Úlcera péptica que persiste no controle endoscópico depois de 8 a 12 semanas de tratamento otimizado: gastroenterologia",
      "DRGE refratária a 2 meses de tratamento otimizado: EDA (esofagite grave, estenose, Barrett)",
      { t: "H. pylori em quem usa ou vai usar AAS, anti-inflamatório ou antiplaquetário: testar e erradicar antes, se possível", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      { t: "Anemia ferropriva sem explicação e plaquetopenia imune do adulto: testar e tratar H. pylori", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" }
    ]
  },

  ddx: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024",
    itens: [
      "Úlcera péptica — dor epigástrica; causas principais: anti-inflamatório e H. pylori",
      { t: "Dispepsia funcional — sintoma que persiste ou volta depois da erradicação do H. pylori, EDA sem lesão", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      { t: "DRGE — azia e regurgitação típicas; erosiva e não erosiva tratam igual", f: "FBG — Diretriz brasileira de tratamento da doença do refluxo gastroesofágico, Arq Gastroenterol, 2024" },
      { t: "Câncer gástrico ou de esôfago — sinal de alarme, idade, parente de 1º grau", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Colelitíase sintomática — dor biliar; colecistite, pancreatite ou colangite vão para a urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      "Doença celíaca e giardíase — atrofia duodenal que pode ser indistinguível na EDA; antitransglutaminase IgA com IgA total",
      { t: "Infarto agudo do miocárdio — causa extra-abdominal de dor no andar superior do abdome", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  exames: {
    fonte: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026",
    itens: [
      "H. pylori sem indicação de EDA: teste respiratório com ureia marcada com 13C (padrão) ou antígeno fecal com anticorpo monoclonal",
      "Antes do teste: suspender IBP 14 dias antes, e antibiótico e bismuto 4 semanas antes; antiácido e alginato não precisam ser suspensos",
      "Controle de erradicação: teste respiratório ou antígeno fecal — sorologia não serve para controle",
      "EDA com biópsia (antro e corpo): sinal de alarme, 40 anos ou mais com dispepsia, falha do IBP ou do testar-e-tratar, e parente de câncer gástrico com 30 anos ou mais",
      { t: "Úlcera péptica: EDA de controle 8 a 12 semanas após o tratamento, para confirmar a erradicação", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Para encaminhar: hemoglobina (e VCM, ferro e ferritina se anemia) e parasitológico de fezes", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" }
    ]
  },

  farmaco: {
    fonte: "FBG — Diretriz brasileira de tratamento da doença do refluxo gastroesofágico, Arq Gastroenterol, 2024",
    itens: [
      "IBP é o fármaco de escolha no refluxo ácido; não há diferença de efeito entre os IBP",
      { t: "Tratamento otimizado da DRGE: medidas comportamentais + IBP em dose plena por 2 meses (dose no cartão do omeprazol)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      "Prova terapêutica empírica com IBP por 8 semanas não é rotina: só em casos selecionados",
      "Procinético não trata DRGE",
      "Controlada a DRGE, a manutenção pode ser contínua (dose plena ou meia dose) ou sob demanda",
      { t: "H. pylori pelo V Consenso (2026): 14 dias em todo esquema sem bismuto (a quádrupla com bismuto aceita 10 a 14); a tríplice IBP + amoxicilina + claritromicina está desencorajada, salvo resistência à claritromicina abaixo de 15% ou sensibilidade confirmada", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      { t: "1ª linha preferida do V Consenso: quádrupla com bismuto, metronidazol e tetraciclina, ou tríplice otimizada com bismuto ou vonoprazana. No Brasil, bismuto só em farmácia de manipulação", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      { t: "A farmácia do SUS tem omeprazol, amoxicilina, claritromicina, metronidazol e tetraciclina; não tem bismuto nem vonoprazana; levofloxacino só no Componente Estratégico", f: "RENAME 2024" },
      { t: "Sem bismuto, o V Consenso indica terapia dupla (amoxicilina em dose alta + IBP em dose alta, 14 dias) ou a concomitante (amoxicilina + claritromicina + metronidazol + IBP, 14 dias): as duas se montam com a RENAME — ver os combos", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      { t: "O TeleCondutas de 2024 ainda traz a tríplice com claritromicina como padrão de 1ª linha, porque segue o IV Consenso (2018): onde diverge, vale o V Consenso", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" },
      { t: "Alergia verdadeira à penicilina: os esquemas sem amoxicilina pedem levofloxacino (Componente Estratégico) ou bismuto (manipulado) — discutir com a preceptora", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" },
      { t: "Não repetir claritromicina nem levofloxacino já usados; cautela com os dois no QT longo; parar de fumar ajuda a erradicação", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" }
    ]
  },

  formulario: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024 · FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026 · FBG — Diretriz brasileira de tratamento da doença do refluxo gastroesofágico, Arq Gastroenterol, 2024 · RENAME 2024",
    farmacos: [
      { id: "omeprazol", papel: "o IBP da farmácia do SUS: dispepsia e DRGE na linha fechada; no H. pylori, a dose é a do esquema (ver os combos e as linhas de H. pylori do cartão)", linha: "Adulto — dose padrão" },
      { id: "amoxicilina", outra: true, papel: "H. pylori: na dupla em dose alta (1ª linha do V Consenso sem bismuto) e na concomitante; na tríplice só com resistência à claritromicina abaixo de 15% ou sensibilidade confirmada", linha: "Adulto — H. pylori, terapia dupla" },
      { id: "claritromicina", papel: "H. pylori: na concomitante; a tríplice com IBP está desencorajada pelo V Consenso (só com resistência abaixo de 15% ou sensibilidade confirmada); não repetir se já usou", linha: "Adulto — erradicação do H. pylori" },
      { id: "metronidazol", outra: true, papel: "H. pylori: na terapia concomitante; a quádrupla clássica pede bismuto, que o SUS não tem", linha: "Adulto — H. pylori" }
    ],
    combos: ["dig-concomitante-h-pylori", "dig-dupla-amoxicilina-h-pylori", "dig-tripla-claritromicina-h-pylori"],
    proibidos: ["ist-metronidazol-alcool", "car-sinvastatina-macrolideo"],
    dosemuda: []
  },

  conduta: {
    fonte: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026",
    itens: [
      "Dispepsia não investigada, até 45 anos e sem alarme: testar e tratar o H. pylori",
      { t: "De 40 a 45 anos sem alarme, o V Consenso se sobrepõe (testar e tratar até 45; EDA a partir de 40); a regulação da EDA no SUS segue o Protocolo 2025 (dispepsia recente a partir de 50 anos): decidir com a preceptora e registrar o motivo", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      { t: "O TeleCondutas (2024) manda antes medidas de estilo de vida e 2 meses de IBP, e testar o H. pylori só em quem não responde: diverge do V Consenso, que vale", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" },
      "Todo H. pylori confirmado tem indicação de erradicação; úlcera gástrica ou duodenal, sempre",
      "Depois do tratamento, confirmar a erradicação: teste respiratório ou antígeno fecal, pelo menos 4 semanas após o antibiótico e 14 dias sem IBP",
      "DRGE em uso crônico de IBP: testar e erradicar o H. pylori (o TeleCondutas 2024 não indica erradicar na DRGE)",
      { t: "DRGE típica sem alarme: medidas comportamentais e IBP em dose plena por 2 meses; sem controle, EDA (ou gastroenterologia se não houver EDA na APS)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Úlcera péptica: IBP por mais 4 a 8 semanas após o esquema de erradicação", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" },
      { t: "Encaminhar à gastroenterologia: esofagite C ou D de Los Angeles, estenose péptica, hérnia hiatal com DRGE refratária, Barrett, úlcera que persiste no controle", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Dispepsia não ulcerosa, sem história familiar de câncer gástrico, já erradicada: IBP de manutenção costuma bastar", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" }
    ]
  },

  erros: {
    fonte: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026",
    itens: [
      "Tríplice com claritromicina por 7 ou 10 dias, como rotina: o Consenso pede 14 dias em todo esquema sem bismuto (a quádrupla com bismuto aceita 10 a 14)",
      "Repetir a claritromicina em quem já falhou com ela",
      "Pedir sorologia para H. pylori para saber se curou",
      "Testar H. pylori com o paciente tomando IBP (falso negativo)",
      "Tratar e não confirmar a erradicação",
      { t: "Tratar H. pylori às cegas, sem teste, na dispepsia", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" },
      { t: "Prova terapêutica com IBP em quem tem sinal de alarme, em vez de EDA", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Dar procinético para DRGE", f: "FBG — Diretriz brasileira de tratamento da doença do refluxo gastroesofágico, Arq Gastroenterol, 2024" },
      { t: "Manter IBP por anos sem rever a indicação, sobretudo no idoso e em quem tem risco de deficiência de B12, ferro ou magnésio", f: "FBG — Diretriz brasileira de tratamento da doença do refluxo gastroesofágico, Arq Gastroenterol, 2024" },
      { t: "Prescrever ranitidina, que o CAB nº 28 ainda cita: não consta da RENAME 2024", f: "RENAME 2024" }
    ]
  },

  scores: ["nota-conferencia", "imc"]
});

/* Agente digestivo (onda APS II, 27/10/2026) — queixa "diarreia-aguda".
 * Base: cartaz "Manejo do paciente com diarreia" (MS, 2023: avaliação do estado de hidratação,
 * planos A/B/C, disenteria, diarreia persistente, uso de medicamentos); CAB nº 28 vol. II (2012,
 * pp. 56–60: classificação, etiologia, contraindicações da TRO, plano C na UBS); Protocolo de
 * Gastroenterologia adulto do TelessaúdeRS (2025, Protocolo 13 e Quadro 13: diarreia crônica).
 * A criança de 2 meses a 5 anos tem o guia "crianca-aidpi" — aqui só a referência. */

QUEIXAS.push({
  id: "diarreia-aguda",
  nome: "Diarreia aguda e desidratação",
  kw: "diarreia gastroenterite desidratacao vomito disenteria sangue nas fezes sro soro caseiro plano a plano b plano c virose intoxicacao alimentar colera",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Digestivo-Nutricional",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023",
    itens: [
      { t: "Hematêmese, hematoquezia, melena ou retorragia, dor intensa ou sinais de choque: atendimento médico imediato, acesso venoso e SAMU — não é plano A/B", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Desidratação grave — dois ou mais sinais, ao menos um destes: comatoso, hipotônico, letárgico ou inconsciente; não consegue beber; pulso fraco ou ausente: plano C, reidratação venosa já",
      { t: "Plano C é emergência: iniciar a reidratação venosa na própria UBS enquanto aguarda o SAMU ou a remoção", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Sangue nas fezes com comprometimento do estado geral, febre alta persistente, dor abdominal, tenesmo ou comprometimento sistêmico: disenteria — antibiótico",
      { t: "Vômitos persistentes, recusa persistente da SRO, distensão abdominal grave ou íleo, alteração da consciência, choque: contraindicam a via oral", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Plano B sem melhora da desidratação depois de 6 horas: hospital de referência",
      "Disenteria em criança abaixo de 3 meses ou com imunodeficiência: primeira dose de ceftriaxona IM e referenciar ao hospital",
      "Desnutrição grave: reidratar se desidratado e encaminhar para tratamento",
      "Temperatura de 39 °C ou mais junto com a diarreia: procurar outra causa (pneumonia, otite, amigdalite, faringite, infecção urinária)",
      { t: "Criança de 2 meses a 5 anos: conduzir pelo guia 'Criança de 2 meses a 5 anos (AIDPI)', com os sinais gerais de perigo", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Quando começou? Quantas evacuações por dia? Tem muco ou sangue?",
      "Febre, náusea, vômitos? Consegue beber e manter o que bebe?",
      "Parentes ou conhecidos com os mesmos sintomas? Refeição em comum?",
      { t: "Está com muita sede, urinando menos, recusando comida? (sinais de alerta do plano A)", f: "MS — Manejo do paciente com diarreia (cartaz), 2023" },
      "Doença crônica? Imunossupressão (HIV, corticoide, quimioterapia)?",
      { t: "Gestante? (a ondansetrona do plano B não se usa na gestante)", f: "MS — Manejo do paciente com diarreia (cartaz), 2023" },
      "Há 14 dias ou mais (persistente)? Mais de 30 dias (crônica)?",
      { t: "Se arrastada: perdeu peso? Sangue, muco ou pus persistentes? Dor abdominal ou anal, tenesmo? Câncer colorretal na família?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" }
    ]
  },

  exame: {
    fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023",
    itens: [
      "Estado geral: ativo e alerta; irritado e intranquilo; ou comatoso, hipotônico, letárgico, inconsciente",
      "Olhos fundos? Lágrimas? Boca e língua úmidas, secas ou muito secas?",
      "Sede: sem sede; bebe rápido e avidamente; ou não consegue beber",
      "Sinal da prega abdominal: desaparece imediatamente, lentamente ou muito lentamente (mais de 2 segundos)",
      "Pulso cheio, ou fraco e ausente",
      "Temperatura (39 °C ou mais: outra causa)",
      { t: "PA e frequência cardíaca; diurese", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Abdome: distensão, defesa, dor que localiza — peritonite localizada não é gastroenterite", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Na dúvida entre duas classificações, tratar pelo pior cenário"
    ]
  },

  naoperder: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Gastroenterite é diagnóstico de exclusão quando há peritonite localizada: apendicite, colecistite, doença inflamatória pélvica",
      { t: "Disenteria com comprometimento do estado geral e cólera grave: os dois casos em que antibiótico funciona", f: "MS — Manejo do paciente com diarreia (cartaz), 2023" },
      { t: "Disenteria em quem falhou o tratamento para Shigella: pensar em amebíase", f: "MS — Manejo do paciente com diarreia (cartaz), 2023" },
      { t: "Diarreia de 14 dias ou mais com cistos ou trofozoítos nas fezes: giardíase", f: "MS — Manejo do paciente com diarreia (cartaz), 2023" },
      "Antibiótico também em sepse ou translocação, e em Salmonella no menor de 3 meses ou no imunodeprimido",
      { t: "Diarreia crônica com emagrecimento, febre, sangue ou pus, tenesmo, artrite ou anemia: doença inflamatória intestinal", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Diarreia aquosa — toxina, muitas evacuações, em geral sem febre, cólica ou tenesmo",
      "Disenteria — agente invasor: muco, pus e sangue, com febre, cólica e tenesmo",
      "Intoxicação alimentar — toxina estafilocócica, de Bacillus cereus ou de Clostridium perfringens; vários doentes depois da mesma comida",
      "Diarreia persistente (14 dias ou mais) — Giardia, Cryptosporidium, E. coli",
      "Diarreia crônica (mais de 30 dias) — cólon irritável, parasitose, doença celíaca, tuberculose",
      "Clostridium difficile — com manifestação sistêmica, entra no antibiótico",
      { t: "Intolerância à lactose — dor, gases e diarreia depois de leite; melhora em 3 semanas sem lactose", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Síndrome do intestino irritável — dor recorrente ligada à evacuação, sem sinal de alarme e com exames normais", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" }
    ]
  },

  exames: {
    fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023",
    itens: [
      "O plano A, B ou C sai da avaliação clínica do estado de hidratação: não esperar exame para hidratar",
      "Perda de peso (até 10% ou mais de 10%) só conta no internado que evolui com diarreia e vômito",
      "Diarreia de 14 dias ou mais: parasitológico de fezes (cistos ou trofozoítos de Giardia)",
      { t: "Diarreia crônica (mais de 4 semanas): hemograma, glicemia, TSH, anti-HIV ou teste rápido, parasitológico em 3 amostras, coprocultura, leucócitos fecais e sangue oculto", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" }
    ]
  },

  farmaco: {
    fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023",
    itens: [
      "SRO é o tratamento; antidiarreicos não devem ser usados",
      "Antibiótico só na disenteria com comprometimento do estado geral, ou na cólera grave; nas outras diarreias é ineficaz e gera resistência",
      "Adulto, adolescente e criança acima de 10 anos com mais de 30 kg, com disenteria: ciprofloxacino por 3 dias (dose no cartão)",
      { t: "Alternativa do cartaz na disenteria do adulto: ceftriaxona IM — o cartaz escreve a dose por kg, sem teto para o adulto; conferir a dose com a preceptora antes de usar", v: true },
      "Criança até 10 anos e até 30 kg com disenteria, a partir de 3 meses e sem imunodeficiência: o cartaz de 2023 trocou o ciprofloxacino pela azitromicina, com dose por kg e sem teto publicado — conferir com a preceptora",
      "Vômitos persistentes no plano B: ondansetrona em dose única, para conseguir beber a SRO; não usar na gestante",
      "Zinco: só para menores de 5 anos (guia AIDPI); o adulto não recebe zinco",
      "Antiparasitário só para amebíase (trofozoítos com hemácias, ou falha do tratamento de Shigella) e giardíase de 14 dias ou mais com cistos ou trofozoítos nas fezes"
    ]
  },

  formulario: {
    fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · RENAME 2024",
    farmacos: [
      { id: "sais-de-reidratacao-oral", papel: "o tratamento: plano A em casa e plano B na unidade" },
      { id: "cloreto-de-sodio-0-9", papel: "plano C: expansão venosa na UBS enquanto a remoção chega (ou Ringer lactato)" },
      { id: "ondansetrona", papel: "dose única se vomitar tudo no plano B; nunca na gestante", linha: "Adulto e criança acima de 10 anos" },
      { id: "ciprofloxacino", papel: "só disenteria com comprometimento do estado geral, no adulto e acima de 30 kg; reavaliar em 2 dias" },
      { id: "metronidazol", outra: true, papel: "amebíase com trofozoítos com hemácias, ou falha do tratamento de Shigella; giardíase de 14 dias ou mais: ver a linha da giardíase no cartão", linha: "Adulto — amebíase intestinal sintomática" }
    ],
    combos: [],
    proibidos: ["pal-metoclopramida-ondansetrona", "ist-metronidazol-alcool"],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023",
    itens: [
      "Plano A (sem desidratação), em casa: mais líquido que o habitual — líquidos caseiros ou SRO após cada evacuação e cada vômito, pouco e mais vezes; sem refrigerante; chá e suco de preferência sem açúcar",
      "Plano A: manter a alimentação habitual; ensinar os sinais de desidratação e de alerta, o preparo da SRO e a higiene das mãos, da água e dos alimentos",
      "Plano A: voltar já se não melhorar em 2 dias ou se aparecer piora da diarreia, vômitos repetidos, sangue nas fezes, menos urina, muita sede ou recusa alimentar",
      "Plano B (com desidratação), na unidade até reidratar: SRO contínua, pela sede; reavaliar — sem sinais, plano A; continua desidratado, sonda nasogástrica; piora, plano C",
      "Plano C: reidratação venosa (SF 0,9% ou Ringer lactato) iniciada na UBS e SRO assim que conseguir beber; acionar o SAMU ou a remoção; só tirar o soro quando beber o bastante; observar pelo menos 6 horas",
      "Disenteria tratada em casa: reavaliar em 2 dias. Sangue depois de 48 horas no adulto: com boas condições, só hidratação; com condições comprometidas, ceftriaxona ou internação; criança até 10 anos: internação",
      "Diarreia de mais de 14 dias: menor de 6 meses ou desidratado, hospital (reidratar antes); acima de 6 meses e hidratado, consulta médica para investigar",
      { t: "Diarreia crônica sem diagnóstico ou tratamento possível na APS, ou suspeita de doença inflamatória intestinal: gastroenterologia; alteração de hábito com suspeita de neoplasia: colonoscopia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Vários doentes ligados à mesma fonte: pensar em surto — a monitorização das doenças diarreicas agudas existe para detectá-los", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  erros: {
    fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023",
    itens: [
      "Prescrever antidiarreico para 'cortar' a diarreia",
      "Dar antibiótico na diarreia aquosa sem sangue",
      "Liberar para casa o paciente em plano B antes de reidratar",
      "Esperar a ambulância sem começar a reidratação venosa no plano C",
      "Dar ondansetrona à gestante",
      "Prescrever zinco a adulto",
      { t: "Mandar suspender a comida: a alimentação habitual se mantém no plano A", f: "MS — Manejo do paciente com diarreia (cartaz), 2023" },
      { t: "Misturar a SRO com chá, leite ou refrigerante, ou usá-la no lugar das refeições", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  scores: ["nota-conferencia", "dose-peso"]
});

/* Agente digestivo (onda APS II, 27/10/2026) — queixa "parasitoses-intestinais".
 * Base: guia de bolso de Doenças Infecciosas e Parasitárias (MS, 2010, por parasita); Guia de
 * Vigilância em Saúde vol. 2 (MS, 2024: esquistossomose pp. 957–964, geo-helmintíases pp. 971–975);
 * SBP GPA nº 7 (2020, pediátrico — dito como SBP); TeleCondutas Alterações Endoscópicas (2024,
 * Apêndice D, giardíase); cartaz de diarreia (MS, 2023). FALTA: Vigilância da esquistossomose 2024 e
 * Guia prático de geo-helmintíases 2018. Tiabendazol e cambendazol, do guia de 2010, não entram. */

QUEIXAS.push({
  id: "parasitoses-intestinais",
  nome: "Parasitoses intestinais e esquistossomose",
  kw: "verme verminose parasitose lombriga ascaris ascaridiase amarelao ancilostomiase oxiuro enterobiase coceira anal estrongiloides giardia giardiase ameba amebiase tenia solitaria esquistossomose xistose barriga dagua caramujo parasitologico de fezes",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Digestivo-Nutricional",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024",
    itens: [
      "Esquistossomose com hepatoesplenomegalia, hipertensão portal, ascite ou hemorragia por varizes: forma grave — notificar no Sinan e encaminhar",
      "Fraqueza ou paralisia de membros inferiores em quem teve contato com água de área endêmica: neuroesquistossomose (mielorradiculite), forma grave",
      "Febre, linfonodomegalia, dor abdominal e eosinofilia três a sete semanas depois de banho em rio ou lagoa: febre de Katayama (esquistossomose aguda)",
      "Muitos áscaris: obstrução intestinal (cólica, distensão, vômitos) e, por migração, obstrução de via aérea, colédoco ou pâncreas — urgência",
      { t: "Estrongiloidíase em imunossuprimido, em uso de corticoide ou desnutrido: hiperinfecção com febre, diarreia profusa, sintomas pulmonares e sepse, letalidade de até 85%", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010" },
      { t: "Amebíase com disenteria e febre, ou dor no hipocôndrio direito com febre: forma grave ou abscesso hepático", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010" },
      { t: "Diarreia com desidratação ou sangue: conduzir pelo guia de diarreia aguda antes de pensar no verme", f: "MS — Manejo do paciente com diarreia (cartaz), 2023" }
    ]
  },

  perguntas: {
    fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010",
    itens: [
      "Diarreia, dor abdominal, náusea, gases? Há quanto tempo? Sangue ou muco nas fezes?",
      "Coceira anal, sobretudo à noite? Outros da casa com o mesmo?",
      "Eliminou verme pelas fezes, pela boca ou pelo nariz? Tosse ou chiado passageiros?",
      "Anda descalço? Água tratada e esgoto em casa?",
      { t: "Banho, pesca, lavagem de roupa ou plantio em rio, lagoa ou córrego — de onde, e quando? (esquistossomose)", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      "Usa corticoide ou imunossupressor, tem HIV ou vai começar quimioterapia? (estrongiloides)",
      "Comeu carne de porco ou de boi crua ou malpassada? Eliminou 'pedaços' brancos (proglotes)?",
      "Gestante ou amamentando? (muda o fármaco)",
      "Peso de hoje (ivermectina e praziquantel são pelo peso)"
    ]
  },

  exame: {
    fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010",
    itens: [
      "Peso",
      "Palidez de mucosas (ancilostomíase leva a anemia ferropriva)",
      "Estado nutricional e, na criança, a curva de crescimento",
      "Abdome: distensão, massa palpável, fígado e baço (hepatoesplenomegalia na esquistossomose)",
      "Pele: lesões nos pés no lugar onde a larva entrou; larva currens (lesão serpiginosa migratória) na estrongiloidíase",
      "Região perianal: escoriações de coçar (enterobíase)"
    ]
  },

  naoperder: {
    fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010",
    itens: [
      "Quem vai usar imunossupressor deve ser avaliado para estrongiloides e, se preciso, tratado antes",
      { t: "Corticoide em dose alta por duas semanas ou mais: tratamento empírico para estrongiloidíase (o corte de dose está no TeleCondutas de Hipertireoidismo)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Anemia ferropriva: pedir parasitológico de fezes em qualquer idade", f: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023" },
      { t: "Esquistossomose: as espécies transmissoras estão sobretudo no Nordeste, Sudeste e Centro-Oeste; quem vem de área endêmica com quadro sugestivo é caso suspeito e faz parasitológico", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      { t: "Enterobíase: reinfecção é comum — tratar todos da casa acima de 6 meses", f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020" },
      { t: "Giardíase e doença celíaca podem dar a mesma atrofia duodenal", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" }
    ]
  },

  ddx: {
    fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010",
    itens: [
      "Ascaridíase — em geral sem sintoma; dor abdominal; Löffler (broncoespasmo e eosinofilia); obstrução com carga alta",
      "Ancilostomíase (amarelão) — anemia ferropriva, dermatite no pé, criança com atraso de crescimento",
      "Enterobíase — prurido perianal noturno, sono intranquilo, vários da família",
      "Estrongiloidíase — larva currens, dor epigástrica que imita úlcera, hiperinfecção no imunossuprimido",
      "Giardíase — diarreia arrastada, empachamento, má absorção; cistos ou trofozoítos nas fezes",
      "Amebíase — de desconforto leve a disenteria com febre; abscesso hepático",
      "Teníase — oligossintomática; eliminação de proglotes",
      { t: "Esquistossomose — dermatite cercariana, febre de Katayama, depois forma hepatointestinal ou hepatoesplênica", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      { t: "Intolerância à lactose — sintomas depois de leite, melhora em 3 semanas sem lactose", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" }
    ]
  },

  exames: {
    fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010",
    itens: [
      "Parasitológico de fezes; para giárdia, pelo menos três amostras",
      "Esquistossomose: Kato-Katz (também conta ovos de ancilóstomo)",
      "Estrongiloides: método de Baermann-Moraes (fezes, escarro ou lavado gástrico)",
      { t: "Enterobíase: método de Graham, com fita adesiva na região perianal", f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020" },
      { t: "Esquistossomose com parasitológico negativo e suspeita forte: sorologia no Lacen; positiva, parasitológico seriado — sorologia sozinha não confirma", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      "Controle de cura na ancilostomíase e na estrongiloidíase: parasitológico no 7º, 14º e 21º dia após o tratamento",
      { t: "Hemograma: eosinofilia na esquistossomose aguda e no Löffler; anemia na ancilostomíase", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" }
    ]
  },

  farmaco: {
    fonte: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024",
    itens: [
      "Geo-helmintíases: albendazol é a 1ª escolha e é dado de graça na rede (Componente Básico)",
      "Esquistossomose: praziquantel, o único fármaco que o MS distribui (Componente Estratégico), com ovos confirmados nas fezes",
      "Anti-helmínticos não devem ser usados na gestação",
      { t: "Estrongiloidíase: ivermectina é a 1ª linha; não é segura abaixo de 15 kg nem na gestação", f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020" },
      { t: "Giardíase: metronidazol ou albendazol, que o SUS tem; tinidazol, secnidazol e nitazoxanida não estão disponíveis", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" },
      { t: "Amebíase: metronidazol (o secnidazol, 1ª opção do guia de 2010, não está na RENAME)", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010" },
      { t: "Teníase: albendazol por 3 dias ou praziquantel em dose única", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010" },
      { t: "Mebendazol, nitazoxanida, secnidazol e tinidazol não constam da RENAME 2024: receita que a família compra", f: "RENAME 2024" },
      { t: "Metronidazol: sem álcool durante o uso e por 24 horas depois (efeito antabuse)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024" }
    ]
  },

  formulario: {
    fonte: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024 · MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010 · SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020 · TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024 · RENAME 2024",
    farmacos: [
      { id: "albendazol", papel: "ascaridíase e ancilostomíase (linha fechada, dose única); enterobíase, tricuríase, giardíase e teníase têm esquema de dias — abrir o cartão", linha: "Adulto — ascaridíase" },
      { id: "ivermectina", papel: "estrongiloidíase (1ª linha) e escabiose, pela faixa de peso; não abaixo de 15 kg, nem na gestante, nem na lactante" },
      { id: "praziquantel", papel: "esquistossomose com ovos nas fezes, dose única por kg; também teníase" },
      { id: "metronidazol", outra: true, papel: "giardíase (linha da giardíase) e amebíase sintomática (linha de 10 dias, no cartão); sem álcool por 24 horas", linha: "Adulto — giardíase" }
    ],
    combos: [],
    proibidos: ["ist-metronidazol-alcool"],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024",
    itens: [
      "Tratar quem tem parasito confirmado no exame de fezes; esquistossomose só com ovos confirmados",
      "Praziquantel: repouso de pelo menos 3 horas depois de tomar, para evitar náusea e tontura",
      "Esquistossomose: casos graves, hospitalizados ou de área não endêmica são notificação compulsória no Sinan; na área endêmica, a rotina vai para o SISPCE",
      { t: "Diarreia crônica na APS: tratamento empírico de parasitose com albendazol por 5 dias é aceito antes de encaminhar", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Enterobíase: tratar a casa toda, repetir a dose em 2 semanas, cortar e limpar as unhas, lavar roupa de cama em água quente", f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020" },
      { t: "Prevenção: lavar as mãos depois do banheiro; lavar verduras e deixá-las meia hora em água com hipoclorito de sódio a 2,5% (uma colher de sopa por litro de água filtrada); usar calçados", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010" },
      { t: "Criança de 2 meses a 5 anos com anemia: o anti-helmíntico segue o guia AIDPI", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Giardíase e amebíase não são de notificação compulsória; surto de giardíase se comunica à saúde local", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010" }
    ]
  },

  erros: {
    fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010",
    itens: [
      "Dar ivermectina ou praziquantel sem pesar o paciente",
      { t: "Dar anti-helmíntico à gestante", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      { t: "Começar corticoide em dose alta ou imunossupressor sem pensar em estrongiloides", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      "Pedir uma amostra só de fezes para descartar giárdia",
      { t: "Tratar só a criança na enterobíase e esquecer a casa", f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020" },
      { t: "Prescrever mebendazol ou nitazoxanida contando com a farmácia do SUS", f: "RENAME 2024" },
      { t: "Usar na estrongiloidíase a dose de albendazol impressa no guia de bolso de 2010: o número não bate com a apresentação do comprimido — a escolha é a ivermectina", v: true },
      { t: "Confirmar esquistossomose só pela sorologia", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" }
    ]
  },

  scores: ["nota-conferencia", "dose-peso", "imc"]
});

/* Agente digestivo (onda APS II, 27/10/2026) — queixa "constipacao".
 * Base: Protocolo de Gastroenterologia adulto do TelessaúdeRS (2025, Protocolo 14 e Quadro 14);
 * Protocolo de Proctologia adulto do TelessaúdeRS (2021, Protocolos 6 e 9); revisão narrativa de
 * especialistas brasileiros (Arq Gastroenterol, 2022: Roma IV, sinais de alarme, laxantes); CAB nº 28
 * vol. II (2012) para dor abdominal e obstrução. Não há PCDT nem CAB de constipação. */

QUEIXAS.push({
  id: "constipacao",
  nome: "Constipação intestinal no adulto",
  kw: "constipacao prisao de ventre intestino preso obstipacao fezes duras laxante lactulose fibra psyllium fecaloma",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Digestivo-Nutricional",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Suspeita de câncer colorretal — sangramento intestinal crônico que não é de doença orificial, anemia ferropriva sem causa, massa abdominal ou retal, mudança persistente do hábito, dor abdominal ou retal, tenesmo, febre persistente, emagrecimento, câncer colorretal na família: colonoscopia",
      { t: "Constipação de início recente, mudança no calibre das fezes, prolapso retal, sangue oculto positivo; acima de 50 anos sem colonoscopia prévia (a revisão de especialistas considera alarme; o MS não tem rastreamento populacional — decidir com a preceptora)", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      { t: "Parada de eliminação de gases e fezes, distensão, vômitos e cólica: obstrução intestinal — jejum e pronto-socorro", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Hematoquezia acima de 50 anos, ou que persiste sem doença orificial que a explique: colonoscopia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Proctologia adulto, 2021" },
      { t: "Acima de 60 anos, a dor abdominal grave costuma vir com sintomas vagos: não atribuir à constipação sem examinar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  perguntas: {
    fonte: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022",
    itens: [
      "Quantas evacuações por semana? Menos de 3 conta",
      "Em mais de um quarto das evacuações: esforço, fezes em cíbalos ou duras (Bristol 1 ou 2), sensação de evacuação incompleta ou de bloqueio, manobra com o dedo?",
      "Há quanto tempo? Os critérios de Roma IV pedem 3 meses, com início há pelo menos 6",
      "A dor abdominal melhora ou piora com a evacuação? (dor ligada à evacuação aponta intestino irritável)",
      { t: "Remédios em uso: anticolinérgico, antidepressivo, anti-histamínico, anticonvulsivante, bloqueador de canal de cálcio, clonidina, diurético, ferro, anti-inflamatório, opioide", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Hipotireoidismo, diabetes, Parkinson, esclerose múltipla, depressão, ansiedade, doença anorretal?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Come fibra e bebe água? Segura a vontade de evacuar depois das refeições?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      "Sangue nas fezes, emagrecimento, câncer colorretal ou polipose na família?",
      "Já usou laxante? Qual, quanto e por quanto tempo?"
    ]
  },

  exame: {
    fonte: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022",
    itens: [
      "Peso (emagrecimento é alarme)",
      "Abdome: distensão, fezes palpáveis, massa no trajeto do cólon",
      "Toque retal: fecaloma, estenose anal, massa retal",
      "Períneo em repouso e ao fazer força: contração em vez de relaxamento sugere dissinergia evacuatória",
      { t: "Inspeção anal: fissura, hemorroida, doença orificial que explique o sangue", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Proctologia adulto, 2021" },
      { t: "Sinais de hipotireoidismo: pele seca, bradicardia, fala lenta", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" }
    ]
  },

  naoperder: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Câncer colorretal atrás de uma constipação nova",
      "Constipação causada por remédio — opioide, ferro, bloqueador de canal de cálcio",
      "Hipotireoidismo e hipercalcemia como causa secundária",
      { t: "Dissinergia evacuatória (defecação obstruída): sensação de bloqueio e manobra digital; pede avaliação funcional se não responde", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      { t: "Anemia ferropriva: não atribuir à hemorroida sem colonoscopia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Proctologia adulto, 2021" }
    ]
  },

  ddx: {
    fonte: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022",
    itens: [
      "Constipação funcional (Roma IV) — critérios presentes, fezes soltas raras sem laxante, sem critério de intestino irritável",
      "Intestino irritável com constipação — a dor abdominal ligada à evacuação diferencia",
      "Defecação dissinérgica — bloqueio anorretal, manobras manuais",
      { t: "Secundária a remédio — começou depois do fármaco", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Hipotireoidismo — frio, ganho de peso, cansaço, pele seca", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" },
      { t: "Câncer colorretal — sinal de alarme, idade, história familiar", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Obstrução intestinal — cólica, parada de gases, vômitos; bridas, hérnia, neoplasia", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  exames: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      { t: "Sem sinal de alarme: pode-se tentar laxante antes de qualquer exame do cólon", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      "Para encaminhar: pesquisa de sangue oculto nas fezes, hemograma, glicemia e TSH",
      { t: "Cálcio sérico quando houver suspeita de causa metabólica", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      { t: "Colonoscopia: sinal de alarme, hematoquezia acima de 50 anos ou persistente, anemia ferropriva sem causa, rastreamento por parente de 1º grau com câncer colorretal", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Proctologia adulto, 2021" }
    ]
  },

  farmaco: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Primeiro: fibra na dieta com água, alimentos laxantes (mamão, ameixa, laranja com bagaço, aveia, feijão, verduras) e menos farinha refinada e ultraprocessados",
      "Aproveitar o reflexo gastrocólico: tentar evacuar depois das refeições e não segurar a vontade",
      "Suplemento de fibra: aveia, farelo de trigo, linhaça; ou formador de bolo, como psyllium",
      "Laxante osmótico para quem não responde a essas medidas ou não tolera fibra: lactulose, leite de magnésia ou PEG",
      { t: "Na farmácia do SUS: lactulose, óleo mineral (não em quem tem doença neurológica; dito para criança no TeleCondutas Anemia 2023), Plantago ovata (psyllium) e cáscara-sagrada (fitoterápicos); PEG, leite de magnésia e bisacodil a família compra", f: "RENAME 2024" },
      { t: "PEG tem evidência mais forte que a lactulose; carboidratos não absorvidos, como a lactulose, dão gases e cólica", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      { t: "Hidróxido de magnésio (leite de magnésia) na insuficiência renal: risco de hipermagnesemia grave", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      { t: "Laxante estimulante (bisacodil) é o passo seguinte; com opioide, entra junto desde o início", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      "Rever e trocar, quando der, o remédio que constipa"
    ]
  },

  formulario: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025 · MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · RENAME 2024",
    farmacos: [
      { id: "lactulose", papel: "o osmótico da farmácia do SUS, quando fibra e medidas não bastam", linha: "Adulto — constipação crônica" },
      { id: "bisacodil", papel: "estimulante: passo seguinte, ou junto do opioide; não está na RENAME" }
    ],
    combos: ["pal-opioide-laxante"],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Constipação sem alarme: tratamento otimizado na APS — dieta com fibra e água, alimentos laxantes, reflexo gastrocólico, laxante e manejo das causas secundárias",
      "Sem melhora depois de 12 semanas de tratamento otimizado: gastroenterologia",
      "Alteração do hábito com suspeita de câncer: colonoscopia; sem colonoscopia na APS, gastroenterologia ou proctologia",
      { t: "No encaminhamento, descrever o tratamento já feito (fibra, laxante, dose, tempo) e a história familiar de câncer colorretal", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Proctologia adulto, 2021" },
      { t: "Sem resposta a fibra e laxante, ou com sintoma de bloqueio: pensar em dissinergia e avaliação funcional (manometria, defecografia) no especialista", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      { t: "Ao prescrever ferro ou opioide, já orientar o manejo da constipação", f: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023" }
    ]
  },

  erros: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Começar pelo laxante sem orientar fibra, água e o reflexo gastrocólico",
      "Esquecer de perguntar pelo ferro, pelo opioide e pelo bloqueador de canal de cálcio",
      "Encaminhar antes de 12 semanas de tratamento otimizado",
      { t: "Prescrever opioide sem laxante junto", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Leite de magnésia em quem tem doença renal", f: "Arq Gastroenterol — Diagnosis and management of chronic idiopathic constipation: a narrative review, 2022" },
      { t: "Atribuir sangue nas fezes à hemorroida sem examinar o ânus e sem pensar em colonoscopia acima de 50 anos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Proctologia adulto, 2021" }
    ]
  },

  scores: ["nota-conferencia", "imc"]
});

/* Agente digestivo (onda APS II, 27/10/2026) — queixa "hepatites-esteatose".
 * Base: PCDT Hepatite C e Coinfecções (Portaria SCTIE/MS nº 39, 2026: testagem, APRI, quem a APS
 * trata, esquema); Guia de Vigilância em Saúde vol. 2 (2024, hepatites virais pp. 483–495);
 * Protocolo de Gastroenterologia adulto do TelessaúdeRS (2025: Protocolos 1, 2, 4, 5, 6; Quadros 1, 2,
 * 4, 5, 6, 7, 8); Calendário Nacional de Vacinação 2026; diretriz de MASLD SBEM/SBH/Abeso (2023) e
 * posicionamento SBD (2024). FALTA: PCDT Hepatite B 2023 (o arquivo da CP nº 98/2026 é proposta, não
 * citável) — conduta de hepatite B que depende dele sai VERIFICAR. */

QUEIXAS.push({
  id: "hepatites-esteatose",
  nome: "Hepatites virais, transaminases alteradas e esteatose (MASLD)",
  kw: "hepatite b hepatite c hcv hbv hbsag anti-hcv teste rapido transaminase tgo tgp alt ast ictericia esteatose gordura no figado masld nash fib-4 apri cirrose sofosbuvir daclatasvir",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Digestivo-Nutricional",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Transaminases altas com encefalopatia ou RNI acima de 1,5: urgência",
      "Hepatite B aguda grave — RNI acima de 1,5; icterícia com bilirrubina total acima de 3 (ou direta acima de 1,5) por mais de 4 semanas; encefalopatia ou ascite (fulminante) — ou que não consegue se hidratar por via oral: urgência",
      "Cirrose com descompensação: ascite ou encefalopatia novas ou piorando, icterícia, hematêmese, melena ou hematoquezia — urgência",
      { t: "Hepatite fulminante: icterícia, coagulopatia e encefalopatia em até 8 semanas; letalidade de 40% a 80%", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      "Gestante com teste rápido para hepatite B ou HBsAg reagente: SAE ou infectologia com prioridade (profilaxia da transmissão vertical)",
      "HBsAg negativo e anti-HBc reagente em quem vai fazer imunossupressão ou quimioterapia: risco de reativação — SAE ou infectologia"
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026",
    itens: [
      "Já fez teste de hepatite C alguma vez na vida?",
      "Usa ou usou droga injetável, inalada ou pipada? Sexo sem preservativo, sexo químico, HSH, trabalho sexual?",
      "Hemodiálise? Esteve preso? Transfusão antes de 1992? Tatuagem ou piercing?",
      "Vive com HIV, usa PrEP, é pessoa trans, está em situação de rua, usa álcool ou outras drogas? (testagem anual ou mais)",
      "Diabetes ou outra doença crônica? Já teve doença do fígado?",
      { t: "Quanto bebe de álcool, por dia e por semana?", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      { t: "Remédios, chás e suplementos: paracetamol, anti-inflamatório, estatina, IBP, antibióticos, chá verde, anabolizante, 'Herbalife'", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Esquema de vacina de hepatite B completo (3 doses)? Trazer a caderneta", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      "Usa carbamazepina, oxcarbazepina, fenitoína, fenobarbital, amiodarona ou rifampicina? (interação com os antivirais)",
      { t: "Pele ou olho amarelos, urina escura, fezes claras, coceira, cansaço, dor no lado direito da barriga?", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" }
    ]
  },

  exame: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      { t: "Peso, altura, IMC e circunferência abdominal", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      "Icterícia",
      "Sinais de cirrose: aranhas vasculares, eritema palmar, ginecomastia, ascite, veias abdominais dilatadas, esplenomegalia",
      "Encefalopatia: inversão do sono, confusão, flapping",
      { t: "Hepatomegalia dolorosa (hepatite aguda)", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" }
    ]
  },

  naoperder: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      { t: "Hepatite C é silenciosa: todo adulto testa ao menos uma vez, com ou sem fator de risco", f: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026" },
      "Cirrose em quem tem hepatopatia: alta suspeita com ascite, veias abdominais dilatadas, esplenomegalia, plaquetas abaixo de 160 mil (mais ainda abaixo de 110 mil), albumina abaixo de 3,5 ou APRI acima de 2",
      { t: "Fibrose avançada no obeso ou diabético com esteatose: calcular o FIB-4", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      { t: "Pré-diabetes e DM2: rastrear risco de fibrose avançada em todos", f: "SBD — Posicionamento sobre o manejo da MASLD (atualização), Diabetol Metab Syndr, 2024" },
      "Hepatite B ou C: testar também HIV, sífilis e a outra hepatite no diagnóstico, de preferência com teste rápido",
      "Reativação da hepatite B com imunossupressão: rituximabe, anti-TNF, quimioterapia, prednisona de dose alta por 4 semanas ou mais"
    ]
  },

  ddx: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025",
    itens: [
      "Doença hepática alcoólica — AST/ALT acima de 2",
      "Hepatite viral — ALT maior que AST (na cirrose, inverte); HBsAg e anti-HCV",
      "Esteatose metabólica — sobrepeso, diabetes, dislipidemia, HAS; ALT maior que AST; ecografia",
      "Hepatite medicamentosa — rever remédios, chás e suplementos (Quadro 5)",
      "Hepatite autoimune — FAN, antimúsculo liso, IgG",
      "Hemocromatose — saturação de transferrina e ferritina",
      "Obstrução biliar — fosfatase alcalina alta, dor, prurido, emagrecimento; ecografia",
      { t: "Na fase ictérica: leptospirose, febre amarela, malária, dengue grave", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      "Gama-GT alta isolada, com transaminases e fosfatase alcalina normais, não indica doença hepática"
    ]
  },

  exames: {
    fonte: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026",
    itens: [
      "Teste rápido anti-HCV; reagente, pedir HCV-RNA (carga viral) ou antígeno do HCV — o teste rápido reagente não precisa de confirmação laboratorial do anticorpo",
      "Anti-HCV não reagente com suspeita forte: repetir em 30 dias",
      "Anti-HCV positivo continua positivo depois da cura: o que confirma infecção ativa é o HCV-RNA",
      "Antes de tratar: HCV-RNA confirmando infecção ativa; AST e plaquetas para o APRI; testes rápidos de HIV, HBV e sífilis",
      { t: "Hepatite B: teste rápido HBsAg; HBsAg e anti-HBc reagentes, pedir anti-HBc IgM; HBsAg e anti-HBc não reagentes, suscetível — vacinar", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      { t: "Transaminases alteradas: repetir para confirmar e investigar — HBsAg, anti-HCV, ecografia, glicose, lipídios; FAN e antimúsculo liso; ferritina e saturação", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "APRI e FIB-4 com AST, ALT, plaquetas e idade: APRI abaixo de 1 = baixa probabilidade de cirrose; FIB-4 acima de 3,25 = alta probabilidade de fibrose avançada", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Esteatose: ecografia abdominal em quem tem sobrepeso ou obesidade; transaminase sozinha não rastreia; excluir outras causas de doença hepática", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      { t: "MASLD: FIB-4 abaixo de 1,3 afasta fibrose avançada; 1,3 ou mais pede outro método (elastografia)", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026",
    itens: [
      "Toda pessoa com hepatite C, aguda ou crônica, tem indicação de tratar; a cura passa de 90%",
      "APRI abaixo de 1, sem cirrose e sem critério de encaminhamento: a APS trata — sofosbuvir + daclatasvir por 12 semanas (formulário)",
      "Nenhum antiviral da hepatite C pode ser usado com rifampicina, rifabutina, rifapentina, carbamazepina, oxcarbazepina, fenitoína ou fenobarbital; evitar amiodarona",
      { t: "Os antivirais da hepatite C são contraindicados na gestação e na amamentação", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Hepatite aguda (exceto C e B grave): sem tratamento específico; sintomáticos e nada de álcool", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      { t: "Hepatite B crônica: o tratamento é no SAE; esquema e critérios de tratamento estão no PCDT de Hepatite B (2023), não baixado nesta onda", v: true },
      { t: "MASLD: metformina e orlistate não tratam o fígado; análogo de GLP-1 reduz a esteatose e a pioglitazona serve na esteato-hepatite comprovada", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      { t: "Análogo de GLP-1 e glitazona não estão incorporados ao SUS para o DM2", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026 · RENAME 2024",
    farmacos: [
      { id: "sofosbuvir-daclatasvir", papel: "hepatite C com APRI abaixo de 1, sem cirrose e sem critério de encaminhamento: a APS prescreve, a unidade dispensadora entrega" }
    ],
    combos: [],
    proibidos: ["dig-daa-indutores", "dig-daa-amiodarona"],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026",
    itens: [
      "Testar hepatite C em toda pessoa de 18 anos ou mais ao menos uma vez na vida; busca ativa a partir de 40 anos; gestante, em cada gestação",
      "Vulnerabilidade mantida (HIV, PrEP, pessoa trans, trabalho sexual, situação de rua, álcool e drogas): anti-HCV pelo menos uma vez por ano; na PrEP, a cada 4 meses",
      "HCV-RNA detectável: calcular o APRI. Abaixo de 1 e sem critério de encaminhamento: tratar na APS",
      "Encaminhar ao serviço especializado: coinfecção HIV ou HBV, gestação, abaixo de 18 anos, depuração de creatinina abaixo de 30, quimioterapia, transplante, neoplasia, anticonvulsivante de 1ª geração, amiodarona, rifampicina, rifabutina ou rifapentina, manifestação extra-hepática grave, falha prévia de antiviral; APRI de 1 ou mais",
      "Cura: HCV-RNA indetectável a partir de 12 semanas depois do fim do tratamento; quem curou e segue exposto se retesta com HCV-RNA, não com anti-HCV",
      { t: "Hepatites virais confirmadas são notificação compulsória regular (até 7 dias), no Sinan", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024" },
      { t: "HBsAg reagente: notificar; hepatite B crônica vai ao SAE ou infectologia; hepatite B aguda sem gravidade pode seguir na APS; com cirrose, gastroenterologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Vacina de hepatite B a partir de 7 anos sem esquema completo: completar as 3 doses (0, 1 e 6 meses), sem reiniciar", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Esteatose: tratamento conservador na APS — parar o álcool, tratar diabetes, HAS e dislipidemia, perder 5% a 10% do peso, dieta e 150 minutos ou mais de exercício por semana", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Esteatose para a gastroenterologia: FIB-4 acima de 3,25 ou suspeita de cirrose; ou transaminases de 1,5 vez o normal ou mais depois de 6 meses de tratamento conservador com perda de pelo menos 5% do peso. A SBEM manda elastografia já com FIB-4 de 1,3: sem elastografia na APS, vale o corte do protocolo", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Transaminases acima de 5 vezes o normal sem causa, ou de 2 a 5 vezes por mais de 6 meses sem causa: gastroenterologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "MASLD: estratificar o risco cardiovascular no diagnóstico", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" }
    ]
  },

  erros: {
    fonte: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026",
    itens: [
      "Não testar hepatite C porque 'não tem fator de risco'",
      "Mandar confirmar teste rápido anti-HCV reagente com outra sorologia, em vez de pedir a carga viral",
      "Usar o anti-HCV para saber se o paciente curou",
      "Encaminhar toda hepatite C ao especialista quando o APRI é menor que 1 e não há critério de encaminhamento",
      "Começar o antiviral sem rever carbamazepina, fenitoína, fenobarbital, rifampicina ou amiodarona",
      { t: "Rastrear esteatose só com transaminase", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      { t: "Prescrever metformina para tratar a esteatose", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      { t: "Liberar 'só um pouco de álcool' no MASLD: não há quantidade segura estabelecida", f: "SBEM/SBH/Abeso — Diretriz brasileira baseada em evidências de MASLD, Arch Endocrinol Metab, 2023" },
      { t: "Acompanhar obeso diabético por anos sem nunca pedir TGO, TGP, plaquetas e o FIB-4", f: "SBD — Posicionamento sobre o manejo da MASLD (atualização), Diabetol Metab Syndr, 2024" },
      { t: "Investigar gama-GT alta isolada como se fosse doença hepática", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025" },
      { t: "Cravar idade de rastreio e corte de ALT para tratar a hepatite B crônica sem o PCDT vigente à mão (o PCDT Hepatite B 2023 não está nas fontes da pasta)", v: true }
    ]
  },

  scores: ["nota-conferencia", "imc"]
});

/* Agente digestivo (onda APS II, 27/10/2026) — queixa "tireoide".
 * Base: TeleCondutas do TelessaúdeRS — Hipotireoidismo (2020), Hipertireoidismo (2021), Nódulo de
 * Tireoide (2022); Protocolo de encaminhamento de Endocrinologia adulto (2021); posicionamento da SBEM
 * sobre hipotireoidismo em situações especiais (2022). Não há PCDT do MS de tireoide no adulto. */

QUEIXAS.push({
  id: "tireoide",
  nome: "Tireoide — hipotireoidismo, hipertireoidismo e nódulo",
  kw: "tireoide tireoidite hipotireoidismo hashimoto hipertireoidismo graves bocio nodulo de tireoide tsh t4 livre levotiroxina tiamazol metimazol propiltiouracila tirads paaf",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Digestivo-Nutricional",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022",
    itens: [
      "Nódulo com rouquidão, disfagia alta, ortopneia, compressão na radiografia, bócio que cresce rápido ou linfonodo cervical aumentado sem outra causa: endocrinologista, por suspeita de malignidade",
      { t: "Oftalmopatia moderada a grave — diplopia, baixa da visão, dor retro-ocular: oftalmologia", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Coma mixedematoso: a forma mais grave do hipotireoidismo, mais comum no idoso e quase sempre com insuficiência cardíaca — urgência", f: "SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022" },
      { t: "Tireotoxicose com febre, agitação ou confusão, taquiarritmia ou insuficiência cardíaca: suspeitar de crise tireotóxica — urgência", v: true },
      { t: "Agranulocitose e hepatite medicamentosa são efeitos raros do tiamazol e do propiltiouracila: se ocorrerem, suspender o antitireoidiano (dito no capítulo da gestante)", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Febre ou dor de garganta em uso de antitireoidiano: suspender e pedir hemograma no mesmo dia", v: true },
      { t: "Gestante com hipertireoidismo franco, ou subclínico com TRAb positivo: pré-natal de alto risco", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "TSH normal ou baixo com T4 livre baixo: hipotireoidismo central — endocrinologista", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" }
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020",
    itens: [
      "Frio, cansaço, ganho de peso, prisão de ventre, pele seca, queda de cabelo, memória pior, desânimo, menstruação irregular?",
      { t: "Calor e suor, palpitação, perda de peso com fome, tremor, ansiedade, insônia, queda de cabelo?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Usa amiodarona, lítio, interferon, levotiroxina, biotina ou fórmula para emagrecer?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      "Se já usa levotiroxina: toma em jejum, 30 minutos antes do café? Junto com ferro, cálcio, omeprazol ou antiácido?",
      "Gestante, ou planeja engravidar? Tem diabetes tipo 1 ou história pessoal ou familiar de tireoide?",
      { t: "Caroço no pescoço, rouquidão, dificuldade para engolir, falta de ar deitado?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" },
      { t: "Radiação no pescoço, câncer de tireoide em parente de 1º grau?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" },
      { t: "Dor na frente do pescoço depois de uma virose?", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      "Idade e doença do coração (mudam a dose de início)"
    ]
  },

  exame: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021",
    itens: [
      "Palpar a tireoide: bócio difuso, nódulo único ou vários, sopro (Graves)",
      "Frequência e ritmo cardíaco (taquicardia, fibrilação atrial); PA e pressão de pulso",
      "Peso",
      "Olhos: proptose, retração palpebral, edema",
      "Tremor, pele quente e úmida, fraqueza muscular",
      { t: "Pele seca, fala e movimentos lentos, madarose, bradicardia, HAS diastólica", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" },
      { t: "Linfonodos cervicais", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" }
    ]
  },

  naoperder: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021",
    itens: [
      "Tireotoxicose por amiodarona, lítio ou excesso de levotiroxina",
      "Tireotoxicose gestacional transitória, do 1º trimestre: não leva antitireoidiano",
      "Hipertireoidismo subclínico acima de 65 anos com TSH abaixo de 0,1: tratar",
      { t: "Nódulo com TSH suprimido: provável nódulo quente — endocrinologista e cintilografia, não PAAF", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" },
      { t: "Hipotireoidismo sem controle com dose alta de levotiroxina: antes de encaminhar, rever adesão, horário, ferro, cálcio, omeprazol, fenobarbital, fenitoína e carbamazepina", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" },
      { t: "Idoso: tratar demais causa fibrilação atrial e fratura", f: "SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022" }
    ]
  },

  ddx: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021",
    itens: [
      "Doença de Graves — mulher jovem, bócio difuso com sopro, oftalmopatia, descolamento das unhas",
      "Bócio multinodular tóxico — idoso, vários nódulos, sintomas mais leves, sem oftalmopatia",
      "Adenoma tóxico — nódulo palpável, em geral acima de 3 cm, sintomas leves",
      "Tireoidite subaguda — dor cervical anterior depois de virose, VHS e PCR altos; hiper, depois hipo",
      "Tireotoxicose por T4 ou T3 — levotiroxina em excesso ou fórmula para emagrecer",
      "TSH baixo com T4 e T3 normais: doença grave, glicocorticoide, biotina, contraste iodado; de 0,1 a 0,4 pode ser variante normal em cerca de 3% dos afrodescendentes",
      { t: "Hipotireoidismo subclínico × franco — T4 livre normal × baixo, com TSH alto", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" },
      { t: "Hipotireoidismo central — TSH normal ou baixo com T4 livre baixo; outros sinais de falha hipofisária", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" }
    ]
  },

  exames: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020",
    itens: [
      "TSH só com suspeita clínica: não é rastreamento de assintomático nem de gestante assintomática de baixo risco",
      "Suspeita de hipotireoidismo: TSH; alterado, repetir com T4 livre",
      "Subclínico (TSH alto, T4 livre normal): repetir TSH e T4 livre em 1 a 3 meses antes de fechar",
      "Anti-TPO só no diagnóstico, nunca no seguimento",
      "Sem valor do laboratório: TSH de 0,4 a 4,12 e T4 livre de 0,58 a 1,64",
      { t: "Suspeita de hipertireoidismo: TSH; baixo, T4 livre e T3 total. TSH baixo com T4 e T3 normais: repetir em 1 a 3 meses (subclínico)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      "Ecografia de tireoide só com alteração na palpação: não pedir de rotina no hipo nem no hiper",
      { t: "Nódulo: TSH primeiro; ecografia; PAAF pelo TI-RADS — TR3 a partir de 25 mm, TR4 a partir de 15 mm, TR5 a partir de 10 mm; TR1 e TR2 não puncionam", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" },
      { t: "Gestante: TSH com suspeita clínica, DM1 ou história de tireoide; referência de TSH de 0,1 a 4,0 no 1º trimestre e de 0,5 a 4,5 no 2º e 3º", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020" },
      { t: "Amiodarona: função tireoidiana antes, a cada 4 meses e 1 ano depois de parar. Lítio: a cada 6 a 12 meses", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" }
    ]
  },

  farmaco: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020",
    itens: [
      "Hipotireoidismo primário franco: levotiroxina em jejum, 30 minutos antes do café — dose plena no adulto saudável abaixo de 60 anos, início baixo e gradual no idoso ou cardiopata",
      { t: "A SBEM aceita dose plena no idoso saudável abaixo de 80 anos; início baixo a partir de 80 ou com coronariopatia ou insuficiência cardíaca", f: "SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022" },
      "Subclínico: tratar se TSH persistentemente acima de 10; de 7 a 10 com menos de 65 anos, ou 65 ou mais com sintomas muito sugestivos; acima do normal e abaixo de 7 com menos de 65 e anti-TPO alto, bócio ou sintomas muito sugestivos",
      { t: "Acima de 80 anos, o subclínico pede cautela e observação: o risco de tratar pode passar o benefício", f: "SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022" },
      { t: "Hipertireoidismo franco: tiamazol é a 1ª escolha (menos hepatotóxico); iniciar na APS e encaminhar ao endocrinologista", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Propiltiouracila só no 1º trimestre da gestação e na crise tireotóxica; a partir de 16 semanas, o TeleCondutas troca para tiamazol; o Manual de Alto Risco do MS mantém o PTU salvo intolerância — o pré-natal de alto risco decide; na amamentação, tiamazol", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Sintomas adrenérgicos: betabloqueador, de preferência propranolol; contraindicado em broncoespasmo, Raynaud e BAV de 2º ou 3º grau; na gestante, metoprolol ou propranolol pelo menor tempo, nunca atenolol", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Tireoidite subaguda: anti-inflamatório; sem melhora, corticoide; antitireoidiano não funciona", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Levotiroxina não serve para encolher nódulo em quem não tem hipotireoidismo", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" }
    ]
  },

  formulario: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020 · TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021 · SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022 · RENAME 2024",
    farmacos: [
      { id: "levotiroxina", papel: "hipotireoidismo primário franco e subclínico com indicação; gestante: ajustar já ao confirmar a gravidez" },
      { id: "metimazol", papel: "1ª escolha no hipertireoidismo: começar na APS pela T4 livre e encaminhar; na gestação, só a partir de 16 semanas" },
      { id: "propiltiouracil", papel: "só no 1º trimestre da gestação (e na crise tireotóxica, no hospital)" },
      { id: "propranolol", outra: true, papel: "sintomas adrenérgicos até controlar o hipertireoidismo; reduzir aos poucos depois", linha: "Adulto — sintomas adrenérgicos" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020",
    itens: [
      "Hipotireoidismo primário: tratar e acompanhar na APS — raramente precisa de endocrinologista",
      "TSH 6 a 8 semanas depois de iniciar ou mudar a dose, até normalizar; depois, de 6 em 6 meses no 1º ano e então anual. Não precisa de T4 livre, T3 nem ecografia no seguimento",
      "Subclínico sem tratar: TSH a cada 6 a 12 meses",
      "Antecipar o retorno com palpitação, agitação ou perda de peso (dose demais) ou com a volta dos sintomas (dose de menos)",
      "Gestante com hipotireoidismo: TSH na metade inferior da referência do trimestre (ou abaixo de 2,5); TSH mensal até a metade da gestação",
      { t: "Hipertireoidismo franco ou subclínico: encaminhar ao endocrinologista, já iniciando antitireoidiano e betabloqueador quando indicado", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Hipertireoidismo em tratamento: T4 livre e T3 a cada 4 a 6 semanas até estabilizar; o TSH fica suprimido por 6 a 12 meses e não guia o ajuste inicial", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Nódulo sem indicação de PAAF: palpar em toda consulta; ecografia de controle — TR5 de 0,5 cm ou mais, anual por até 5 anos; TR4 de 1 cm ou mais, em 1, 2, 3 e 5 anos; TR3 de 1,5 cm ou mais, em 1, 3 e 5 anos", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" },
      { t: "Endocrinologista no nódulo: TSH suprimido, indicação de PAAF ou sinais de malignidade; bócio multinodular com compressão, crescimento ou desconforto estético", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Endocrinologia adulto, 2021" },
      { t: "Idoso em levotiroxina: alvo de TSH entre 2,0 e 6,0", f: "SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022" }
    ]
  },

  erros: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020",
    itens: [
      "Pedir TSH de rotina em quem não tem sintoma, ou ecografia de tireoide sem nódulo palpável",
      "Pedir T4 livre ou T3 para acompanhar a levotiroxina no hipotireoidismo primário",
      "Repetir o anti-TPO no seguimento",
      "Deixar a levotiroxina ser tomada com o café da manhã ou junto com ferro, cálcio ou omeprazol",
      "Fechar hipotireoidismo subclínico com uma dosagem só",
      { t: "Ajustar o antitireoidiano pelo TSH nos primeiros meses", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Manter tiamazol no 1º trimestre da gestação", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Dar antitireoidiano na tireotoxicose gestacional transitória ou na tireoidite subaguda", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021" },
      { t: "Puncionar nódulo puramente cístico, ou abaixo de 1 cm sem critério", f: "TelessaúdeRS-UFRGS — TeleCondutas: Nódulo de Tireoide, 2022" },
      { t: "Tratar de rotina o TSH alto isolado do idoso de 80 anos ou mais", f: "SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022" }
    ]
  },

  scores: ["nota-conferencia", "imc", "dose-peso"]
});

/* Agente digestivo (onda APS II, 27/10/2026) — queixa "anemia-adulto".
 * Base: TeleCondutas Anemia do TelessaúdeRS (2023: definição, investigação pelo VCM, ferro oral e EV,
 * B12, folato, DRC, doença crônica, encaminhamento); PCDT Anemia por Deficiência de Ferro (Portaria
 * SAS/MS nº 1.247, 2014: critérios, esquema, duração, monitorização); Protocolo de Hematologia adulto
 * do TelessaúdeRS (2023). O cartão do sulfato ferroso já existia (gestante e puérpera): a linha do
 * adulto entrou por PATCH.doseRows (digestivo.patch.js). Gestante e criança têm guias próprios. */

QUEIXAS.push({
  id: "anemia-adulto",
  nome: "Anemia no adulto — ferropriva, vitamina B12 e folato",
  kw: "anemia hemoglobina baixa palidez cansaco ferropriva ferro ferritina sulfato ferroso vcm microcitica macrocitica b12 cianocobalamina acido folico talassemia traco falciforme",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Digestivo-Nutricional",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Anemia sintomática — dispneia, taquicardia, hipotensão — ou instabilidade hemodinâmica: urgência",
      { t: "Neutrófilos abaixo de 500 ou plaquetas abaixo de 50 mil junto com a anemia: urgência, de preferência com hematologista", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Hematologia adulto, 2023" },
      { t: "Doença falciforme com crise de dor, febre alta, priapismo, dispneia, dor torácica, dor abdominal difícil, alteração neurológica aguda ou queda de mais de 2 de Hb: urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Hematologia adulto, 2023" },
      "Homem ou mulher na pós-menopausa com anemia ferropriva sem outra fonte de sangramento: EDA e colonoscopia (câncer gástrico ou de cólon); no idoso, pesar os riscos e benefícios dos exames invasivos",
      "Deficiência de B12 com sintoma neurológico ou anemia sintomática: tratar já — o dano neurológico pode ficar",
      "Gestante com deficiência de B12: tratar já"
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Desde quando? A vida toda, crônica, vai e volta, ou aguda? Tem hemograma antigo para comparar?",
      "Vontade de comer terra, gelo ou outra coisa estranha (pica)?",
      "Sangramento: menstruação (quantos dias, quantos absorventes, coágulos), fezes pretas ou com sangue, gengiva, urina?",
      "Emagrecimento, febre, suor à noite? Azia, dor de estômago, mudança no hábito intestinal?",
      "Remédios: AAS, anti-inflamatório, anticoagulante; metformina, omeprazol, antiácido, anticonvulsivante (B12); fenitoína, metotrexato (folato)? Chás e suplementos?",
      "Cirurgia de estômago ou bariátrica? Transfusão antes? Álcool?",
      "Come carne? Dieta vegana ou vegetariana estrita?",
      "Anemia na família (falciforme, talassemia)?",
      "Formigamento, perda de sensibilidade, memória pior, tristeza (B12)?",
      "Doença renal, do fígado, da tireoide, reumatológica, HIV, câncer?"
    ]
  },

  exame: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "FC, FR e PA: taquicardia, taquipneia e hipotensão mudam a consulta",
      "Pele e mucosas: palidez (a falta dela não descarta anemia), icterícia, púrpura, petéquias",
      "Boca: glossite, língua lisa, queilite angular; unhas em colher",
      "Abdome: fígado e baço; linfonodos",
      "Sinais de insuficiência cardíaca de alto débito: edema, estase jugular, sopro de ejeção",
      "Exame neurológico: sensibilidade e alteração cognitiva (B12)"
    ]
  },

  naoperder: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Câncer do trato digestivo por trás da ferropenia sem causa",
      "Hemólise: reticulócitos, LDH e bilirrubina indireta altos, haptoglobina baixa — Coombs direto",
      "Deficiência de B12 junto com a de folato: repor a B12 antes do ácido fólico",
      "Ferro oral que não funciona: confirmar o diagnóstico, a dose, a adesão; depois, doença celíaca, gastrite autoimune e H. pylori",
      { t: "Anemia ferropriva sem explicação: testar e tratar o H. pylori", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
      "Traço talassêmico ou falciforme confundido com ferropenia: microcitose com ferritina normal pede eletroforese",
      "Parasitose intestinal: parasitológico de fezes em toda anemia ferropriva"
    ]
  },

  ddx: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Ferropriva — VCM baixo (ou normal no início), ferritina abaixo de 30, saturação de transferrina abaixo de 20%",
      "Traço talassêmico beta — VCM baixo, ferritina normal, Hb A2 de 3,5% a 7% na eletroforese",
      "Doença crônica ou inflamação — ferritina normal ou alta; ferropenia junto se ferritina abaixo de 100 ou saturação abaixo de 20%",
      "Deficiência de B12 — macrocítica, parestesia, glossite; metformina, IBP, bariátrica, dieta vegana",
      "Deficiência de folato — macrocítica; idoso, alcoolista, gestação, fenitoína, metotrexato",
      "Hemolítica — normo ou macrocítica com reticulócitos altos",
      "Doença renal crônica — anemia com TFG baixa",
      "Macrocítica com B12 e folato normais — álcool, hepatopatia, hipotireoidismo, zidovudina, metotrexato, mielodisplasia",
      "Neoplasia hematológica ou mielodisplasia — outras citopenias, leucocitose"
    ]
  },

  exames: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Anemia (OMS): homem de 15 anos ou mais com Hb abaixo de 13; mulher não gestante abaixo de 12; gestante abaixo de 11",
      { t: "No idoso, o PCDT usa cortes próprios: homem branco abaixo de 13,2 e negro abaixo de 12,7; mulher branca abaixo de 12,2 e negra abaixo de 11,5", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014" },
      "Hemograma com VCM (normal de 80 a 100), esfregaço e reticulócitos — antes de começar ferro ou vitamina",
      "Microcítica ou normocítica: ferritina e saturação de transferrina (sem saturação, ferro sérico e capacidade total de ligação)",
      "Ferritina com inflamação ou infecção no adulto: ferropenia até abaixo de 70; esperar 2 a 3 semanas depois de diarreia ou infecção respiratória para dosar",
      "Macrocítica: reticulócitos, B12 e ácido fólico; reticulócitos altos, LDH, bilirrubina indireta e Coombs direto",
      "Parasitológico de fezes em toda anemia ferropriva, em qualquer idade",
      { t: "Ferropriva sem causa (Hb abaixo de 13 no homem, abaixo de 12 na mulher), sem outro sinal que guie: EDA e colonoscopia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Hematologia adulto, 2023" },
      "Controle do ferro: hemograma e reticulócitos em 2 a 3 semanas; espera-se Hb 2 pontos maior em 3 semanas (no mínimo 1)",
      { t: "Seguimento: Hb a cada 8 semanas e ferritina a cada 3 meses", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014" },
      "B12 com alteração no sangue: hemograma e reticulócitos em 7 a 10 dias e em 8 semanas. Folato: hemograma entre o 10º e o 14º dia e na 8ª semana"
    ]
  },

  farmaco: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Ferro oral é a 1ª linha; o sulfato ferroso é o da RENAME (comprimido, solução oral e xarope)",
      "Longe das refeições, de preferência 1 hora antes; não junto com leite, cálcio, chá, café, ovo ou fibra; antiácido ou IBP: ferro 2 horas antes ou 4 depois",
      "Intolerância: tomada única, fracionar em 2 ou 3 tomadas, dias alternados (ou segunda, quarta e sexta), trocar de sal ou passar a líquido",
      { t: "Tempo: até 6 meses depois de a Hb normalizar, para repor o estoque — o TeleCondutas fala em 3 a 6 meses de tratamento", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014" },
      { t: "Idoso: o PCDT usa dose de ferro bem menor que a do adulto, corrigida a causa do sangramento", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014" },
      "Ferro EV: intolerância ou falha do oral por má absorção, Hb abaixo de 8 estável, gestante no 2º ou 3º trimestre, DRC; contraindicado no 1º trimestre; ferro IM não se usa",
      { t: "Ferro EV no SUS: o PCDT de 2014 só traz o sacarato, em hospital; carboximaltose (2023) e derisomaltose (2024) foram incorporadas depois — conferir a oferta local", v: true },
      "B12: a via oral é tão eficaz quanto a IM em quem adere; IM com anemia sintomática, sintoma neuropsiquiátrico, gestação ou má absorção. A RENAME só tem a injetável",
      "Anemia de doença crônica sem ferropenia: não dar ferro",
      "DRC fora de diálise: ferro oral na mesma dose; não suplementar com ferritina acima de 800"
    ]
  },

  formulario: {
    fonte: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014 · TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023 · RENAME 2024",
    farmacos: [
      { id: "sulfato-ferroso", papel: "anemia ferropriva do adulto: dose de tratamento, longe das refeições, até repor o estoque", linha: "Adulto não gestante — anemia ferropriva, tratamento" },
      { id: "cianocobalamina", papel: "deficiência de B12: ataque IM ou oral, e manutenção quando a causa não se reverte" },
      { id: "acido-folico", papel: "deficiência de folato, depois de garantir a B12", linha: "Adulto — deficiência de ácido fólico" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Investigar a causa sempre; ferro empírico, sem perfil de ferro, só na criança com quadro sugestivo, na gestante com anemia microcítica e no gastrectomizado sem sinal de outra doença",
      "Mulher na pré-menopausa: a perda menstrual é a causa principal; investigar o trato digestivo se não menstrua, se há câncer colorretal na família (sobretudo acima de 40) ou se a anemia é maior que a perda",
      "Orientar fontes de ferro (carnes, miúdos, ovo; feijão, lentilha, folhas verde-escuras) e de B12 (ovo, carne, leite)",
      "Hematologia: suspeita de anemia falciforme, de outra hemoglobinopatia ou de anemia hemolítica; anemia sem causa depois da investigação na APS",
      "Traço falciforme e traço talassêmico alfa ou beta não vão ao especialista: seguem na APS, com orientação genética",
      "Gastroenterologia: ferropriva sem causa quando não há EDA ou colonoscopia na APS",
      "Nefrologia: DRC com TFG abaixo de 45 e anemia ferropriva refratária",
      "Transfusão (decisão hospitalar, não só pela Hb): recomendada abaixo de 6; em geral de 6 a 7; de 7 a 10 só com sangramento ativo, sintoma ou cardiopatia isquêmica",
      { t: "Retorno pelo menos a cada 8 semanas durante o tratamento, conferindo adesão e efeitos adversos", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014" }
    ]
  },

  erros: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023",
    itens: [
      "Dar ferro sem investigar a causa",
      "Explicar a ferropenia de homem ou de mulher pós-menopausa pela dieta, sem EDA e colonoscopia",
      "Pedir reticulócitos depois de começar a reposição",
      "Dosar ferritina durante infecção ou diarreia",
      "Começar ácido fólico antes da B12 quando as duas faltam",
      "Prescrever ferro IM",
      "Dar ferro na anemia de doença crônica sem ferropenia",
      "Encaminhar traço falciforme ou talassêmico ao hematologista",
      { t: "Parar o ferro quando a Hb normaliza, sem repor o estoque", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014" },
      "Tratar 'falta de B12' sem dosar a B12",
      { t: "Atribuir neuropatia à B12 em quem nunca foi rastreado para diabetes", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
      "Usar por meses vitamina B12 associada a B6 em dose alta: risco de intoxicação pela B6"
    ]
  },

  scores: ["nota-conferencia", "imc", "ckdepi"]
});

/* Agente respiratoria — queixa "ivas" (onda APS II, 27/10/2026).
 * Adulto: CAB 28 vol. II (2.10 dor de ouvido p. 102–110; 2.11 dor de garganta p. 110–114;
 * 2.18 rinossinusites e síndrome gripal p. 167–177) e TelessaúdeRS Otorrino 2023 (P3, P5, Q7–Q12).
 * Influenza: Guia de manejo e tratamento de influenza 2023 (p. 11–26), que supera o CAB 28
 * na indicação do oseltamivir. Criança de 2 meses a 5 anos: AIDPI 2017 (p. 15, 22–26,
 * 59–65, 90–91, 169–171). A porta geral da criança doente é a queixa crianca-aidpi.
 * Dose: só no cartão. Páginas lidas: ver respiratoria.notas.md. */

QUEIXAS.push({
  id: "ivas",
  nome: "IVAS — resfriado, gripe, rinossinusite, dor de garganta e dor de ouvido",
  kw: "ivas resfriado gripe sindrome gripal influenza srag oseltamivir rinossinusite sinusite rinite coriza faringite amigdalite faringoamigdalite dor de garganta otite otalgia dor de ouvido oma otite externa mastoidite crianca aidpi amoxicilina penicilina benzatina",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Respiratoria",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — Guia de manejo e tratamento de influenza, 2023 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017",
    itens: [
      { t: "SRAG: síndrome gripal com dispneia, SpO2 de 94% ou menos em ar ambiente, desconforto respiratório, FR aumentada para a idade, piora de doença de base ou hipotensão — internar e iniciar oseltamivir já, sem esperar exame", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Sinais de agravamento na síndrome gripal: dispneia ou FR de 20 ou mais, febre por mais de 3 dias ou que volta depois de 48 h sem febre, confusão ou sonolência, PAS abaixo de 90 ou PAD abaixo de 60, diurese abaixo de 400 mL em 24 h, desidratação, piora de DPOC ou cardiopatia — com fator de risco, considerar hospitalização", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Gestante com síndrome gripal: FR acima de 20 e FC acima de 100 são sinais de alarme; SpO2 abaixo de 94%, oxigênio, monitorização e internação", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Rinossinusite com edema periorbitário ou malar, proptose, alteração visual, alteração do estado mental, sinais meníngeos ou outro sinal neurológico: complicação — urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      { t: "Rinossinusite com piora depois de 72 h de antibiótico: sinal de alerta para complicação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Otite com tumefação ou vermelhidão dolorosa atrás da orelha, pavilhão deslocado para baixo e para fora, febre, paralisia facial ou sinais meníngeos (mastoidite, meningite): urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      { t: "Otite externa com dor intensa que não cede, tecido de granulação ou necrose no conduto, dor na mastoide ou paralisia facial — sobretudo idoso, diabético ou PVHIV: otite externa maligna, urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      { t: "Dor de garganta com trismo, voz de 'batata quente', abaulamento ou desvio medial do palato e dor muito intensa: abscesso periamigdaliano — encaminhar imediatamente (pode obstruir a via aérea)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Criança com membrana branco-acinzentada que sangra ao destacar, nas amígdalas, úvula e pilares, com nenhuma ou só uma dose de vacina antidiftérica: possível difteria — infecção grave de garganta, referir com urgência", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Criança de 2 meses a 5 anos com sinal geral de perigo (não bebe nem mama, vomita tudo, convulsão nas últimas 72 h, letargia, enchimento capilar acima de 2 segundos, batimento de asa do nariz ou gemência): primeira dose do antibiótico e referência urgente", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Lactente abaixo de 2 meses: fora deste guia (a AIDPI daqui é de 2 meses a 5 anos); pneumonia nessa idade é sempre grave e interna", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Guia de manejo e tratamento de influenza, 2023",
    itens: [
      "Começou quando? Melhorando ou piorando? Piora depois do 5º dia ou sintomas além de 10 a 14 dias sugerem rinossinusite bacteriana",
      { t: "Febre de início súbito com tosse ou dor de garganta, mais cefaleia, mialgia ou artralgia? É síndrome gripal (abaixo de 2 anos: febre súbita com tosse, coriza ou obstrução nasal)", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Tem condição ou fator de risco para complicar a influenza? Gestante ou puérpera até 2 semanas, inclusive depois de aborto ou perda fetal, 60 anos ou mais, menor de 5 anos, indígena aldeado, menor de 19 anos em uso prolongado de AAS, pneumopatia (inclusive asma), tuberculose, cardiopatia (não HAS), nefropatia, hepatopatia, doença hematológica, diabetes, doença neurológica, câncer, HIV/aids, imunossupressão, obesidade (sobretudo IMC de 40 ou mais)", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Usa corticoide sistêmico em dose imunossupressora há mais de 2 semanas, quimioterápico ou anti-TNF? Conta como imunossupressão — o corte de dose do Guia está no cartão do oseltamivir", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Há quantas horas começou a febre? O oseltamivir tem mais benefício até 48 h; com fator de risco e SRAG ainda ajuda até 5 dias", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      "Dor de garganta com tosse, coriza, rouquidão, conjuntivite ou diarreia (vírus)? Ou início súbito, febre, dor para engolir, cefaleia, náusea e dor abdominal, sem tosse (estreptococo)?",
      { t: "Ouvido: dor, secreção há quanto tempo (menos de 14 dias é aguda; 14 ou mais, crônica), perda auditiva, natação, cotonete, uso de gota otológica?", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      "Alergia à penicilina: qual reação? Urticária ou anafilaxia (hipersensibilidade tipo I) muda a escolha",
      { t: "Dor ou reação local, rash maculopapular, náusea ou prurido, isolados, não configuram alergia à penicilina", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022" },
      "Usou antibiótico nas últimas 4 a 6 semanas? (na rinossinusite, muda para amoxicilina com clavulanato)",
      "Cefaleia intensa, inchaço em volta do olho, visão alterada, vômitos, rigidez de nuca? (complicação)",
      { t: "Criança: consegue beber ou mamar? Vomita tudo? Teve convulsão? Tem chiado?", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Vacinou contra influenza nesta temporada? (não muda a indicação do oseltamivir)", f: "MS — Guia de manejo e tratamento de influenza, 2023" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017",
    itens: [
      { t: "Temperatura, FR contada em 1 minuto, FC, PA e SpO2 em ar ambiente — é o que separa síndrome gripal de SRAG", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Criança: FR com a criança tranquila — respiração rápida é 50 ou mais de 2 a 11 meses e 40 ou mais de 1 a 5 anos; procurar tiragem subcostal, estridor em repouso e sibilância", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      "Orofaringe com luz e abaixador: exsudato, petéquias no palato, úvula edemaciada, vesículas, membrana acinzentada, abaulamento do palato",
      "Palpar linfonodos cervicais anteriores: aumentados e dolorosos favorecem estreptococo",
      "Otoscopia sempre que possível: abaulamento, opacificação, perda de mobilidade ou otorreia. Membrana só hiperemiada, em criança que chorou ou com febre, não fecha OMA",
      "Tracionar o pavilhão e comprimir o tragus (dor = otite externa); palpar e comparar atrás das duas orelhas (mastoidite)",
      "Otoscopia normal com otalgia: examinar dentes molares, ATM (abrir e fechar a boca), orofaringe e pares cranianos V, VII, IX e X",
      "Face e órbita: dor à palpação dos seios, edema palpebral, proptose, movimento ocular restrito",
      { t: "Ausculta pulmonar: crepitação ou sinal focal tira o quadro das IVAS — ver pneumonia", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  naoperder: {
    fonte: "MS — Guia de manejo e tratamento de influenza, 2023 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Síndrome gripal em quem tem condição ou fator de risco: oseltamivir para todos, mesmo vacinados e mesmo no ambulatório. O CAB 28 (2012) dizia 'a critério médico' — está superado pelo Guia 2023", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Gestante e puérpera com síndrome gripal, mesmo vacinada e sem sinal de agravamento: oseltamivir sempre; febre controlada, de preferência com paracetamol", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Covid-19 e influenza não se distinguem pela clínica, e o oseltamivir não trata covid-19", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      "Faringite estreptocócica: antibiótico iniciado até 9 dias do início dos sintomas previne febre reumática — o tratamento correto da garganta é prevenção primária",
      { t: "Faringite estreptocócica é rara antes dos 3 anos; abaixo dessa idade, dor de garganta é quase sempre viral", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "OMA da criança que segue com dor ou secreção depois de 2 dias de amoxicilina: subir a dose ou trocar por amoxicilina com clavulanato; sem melhora no segundo retorno, referir", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Criança com tosse há mais de 14 dias: não é mais resfriado — investigar rinossinusopatia, asma, tuberculose e coqueluche", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Criança com sibilância: classificar e tratar a sibilância antes de classificar a tosse", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      "Otalgia com otoscopia normal: aos 50 anos ou mais, com VHS alta, pensar em arterite temporal; com fator de risco coronariano, em infarto; tabagista ou etilista acima de 50 anos com disfagia e perda de peso, em tumor de cabeça e pescoço"
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Resfriado comum — coriza, obstrução, espirros, pouca febre; pior nos 3 primeiros dias e melhora do 7º ao 10º dia; secreção esverdeada nos primeiros dias não é bactéria",
      { t: "Síndrome gripal — febre súbita com tosse ou dor de garganta e cefaleia, mialgia ou artralgia", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      "Rinossinusite bacteriana — piora depois do 5º dia ou persiste além de 10 a 14 dias; rinorreia purulenta, dor facial em peso que piora ao inclinar a cabeça, dor em dente maxilar",
      { t: "Rinite alérgica — espirros, rinorreia e obstrução com prurido de olhos, nariz e palato; atopia, quadros repetidos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      { t: "Rinossinusite crônica — 12 semanas ou mais com obstrução ou descarga nasal e dor facial ou perda do olfato", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      "Faringite viral — tosse, coriza, rouquidão, conjuntivite, diarreia; vesículas no palato (herpangina) ou conjuntivite com febre alta (adenovírus)",
      "Faringite estreptocócica — início súbito, febre, exsudato, petéquias no palato, adenomegalia cervical dolorosa, sem tosse; mais comum entre 5 e 15 anos",
      "Mononucleose — faringoamigdalite com fadiga, exantema, adenomegalias e hepatomegalia",
      "Otite externa — dor à tração do pavilhão e ao tragus, conduto edemaciado; prurido predomina na fúngica",
      "Otite média com efusão — líquido atrás da membrana íntegra, sem inflamação aguda: não é quadro infeccioso",
      "Otalgia referida — otoscopia normal: dente, ATM, coluna cervical, faringe, neuralgia"
    ]
  },

  exames: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Resfriado, faringite, otite e rinossinusite aguda: diagnóstico clínico, sem exame de rotina",
      "Radiografia ou TC de seios da face só na suspeita de complicação ou na persistência depois do tratamento: não diferenciam viral de bacteriana",
      "Cultura de orofaringe não é rotina; ASLO mostra infecção passada e não diagnostica faringite aguda",
      { t: "Síndrome gripal e SRAG: o diagnóstico é clínico para prescrever; não atrasar o oseltamivir esperando o teste", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Gestante com suspeita de pneumonia: não adiar a radiografia de tórax em nenhuma idade gestacional", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      "Otite média com efusão que passa de 3 meses: avaliar a audição"
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Guia de manejo e tratamento de influenza, 2023 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017",
    itens: [
      "Resfriado e faringite viral: sintomáticos (paracetamol, dipirona), hidratação e soro fisiológico nasal; sem antibiótico. AINE e corticoide não são recomendados; mucolítico, antitussígeno e vitamina C não têm indicação",
      "Descongestionante nasal tópico: no máximo 3 dias (rinite química) e nunca no lactente; não há evidência de eficácia",
      { t: "Síndrome gripal com fator de risco, SRAG, gestante e puérpera: oseltamivir, de preferência nas primeiras 48 h, por receituário simples. Sem fator de risco: a critério clínico; com sinal de agravamento, já", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Criança acima de 5 anos ou acima de 24 kg: as fontes baixadas não trazem dose de amoxicilina por kg com teto (o CAB 28 dá dose por kg sem teto) — não usar a tabela da AIDPI nem a dose do adulto; conferir com a preceptora", v: true },
      { t: "O oseltamivir é do Componente Estratégico da RENAME: não sai da farmácia básica comum — saber onde a USF retira antes de precisar", f: "RENAME 2024" },
      "Faringoamigdalite estreptocócica: penicilina benzatina IM em dose única é a escolha, aplicada na UBS com observação de 30 minutos; penicilina oral só se a adesão aos 10 dias for garantida; alérgico: azitromicina por 5 dias ou cefalosporina",
      { t: "Criança de 2 meses a 5 anos: infecção moderada de garganta — penicilina benzatina; infecção aguda do ouvido — amoxicilina por 8 dias; segunda linha, amoxicilina com clavulanato. Dose pelo peso do dia, na linha do cartão, dentro da faixa de 4 a 24 kg da tabela", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      "OMA do adulto: amoxicilina por 10 dias; alérgico tipo I: azitromicina; falha ou recorrência: amoxicilina com clavulanato. Descongestionante e anti-histamínico não são rotina na OMA",
      "Rinossinusite bacteriana aguda: amoxicilina; antibiótico nas últimas 4 a 6 semanas ou quadro moderado a grave: amoxicilina com clavulanato em dose alta; manter até 5 a 7 dias depois da melhora. Macrolídeo fica para quem tem anafilaxia à penicilina",
      { t: "Rinossinusite crônica sem pólipo: lavagem salina e corticoide nasal e reavaliar em 8 a 12 semanas; sem resposta, edema grave ou agudização: curso curto de antibiótico com prednisona", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      { t: "Rinite alérgica: corticoide nasal prolongado e afastar o alérgeno; anti-histamínico oral pode; descongestionante e corticoide oral não são rotina", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      { t: "Corticoide nasal no SUS: budesonida e beclometasona nasais estão no Componente Básico", f: "RENAME 2024" },
      "Otite externa: gotas tópicas por 5 a 7 dias (cerca de 21 na fúngica, com retirada dos micélios); antibiótico oral só com sinal de infecção invasiva — os cartões de gotas otológicas não entraram nesta onda"
    ]
  },

  conduta: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Guia de manejo e tratamento de influenza, 2023 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023",
    itens: [
      "SRAG: oseltamivir já, máscara cirúrgica no paciente e no profissional desde o acolhimento, e remoção para o hospital ou o serviço indicado pela secretaria",
      { t: "Síndrome gripal com fator de risco: oseltamivir e acompanhamento dos critérios de SRAG, com retorno orientado nos sinais de agravamento", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Síndrome gripal sem fator de risco: sintomático, hidratação, afastamento do trabalho ou da escola até 24 h sem febre; voltar se houver agravamento", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      "Faringite estreptocócica provável: benzatina na própria UBS, com estrutura para anafilaxia e 30 minutos de observação",
      { t: "Criança de 2 meses a 5 anos — infecção aguda do ouvido: antibiótico por 8 dias, analgésico, secar com mecha se houver secreção, retorno em 2 dias. Só dor de ouvido (possível infecção): analgésico e retorno em 2 dias. Secreção há 14 dias ou mais: secar com mecha e retorno em 5 dias", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Criança de 2 meses a 5 anos — infecção moderada de garganta: antibiótico recomendado (benzatina em dose única; a segunda linha oral vai por 10 dias), analgésico, retorno em 2 dias. Infecção leve: analgésico, retorno se a dor persistir", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Encaminhar ao otorrino: rinossinusite crônica com alteração estrutural, refratária a 3 meses de tratamento ou com 4 ou mais episódios bacterianos no ano; perfuração timpânica 6 semanas depois da OMA; otite média crônica com otorreia por mais de 3 meses, alteração da membrana ou hipoacusia; efusão por mais de 3 meses; suspeita de colesteatoma", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      "Orientar: lavar as mãos, cobrir a tosse, não dividir objetos, ambiente ventilado e retorno nos sinais de alarme",
      { t: "Síndrome gripal leve, sem sinal de alerta nem fator de risco: mais de 2 litros de líquido por dia; quem tem restrição hídrica prescrita (insuficiência cardíaca, doença renal) confere com a preceptora", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Fluxo local: onde a USF Viveiros II retira o oseltamivir (Componente Estratégico), se a benzatina é aplicada no mesmo turno e qual a referência de otorrino e de urgência — confirmar com a equipe", v: true }
    ]
  },

  erros: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Guia de manejo e tratamento de influenza, 2023",
    itens: [
      { t: "Esperar o resultado do teste para começar o oseltamivir na SRAG ou em quem tem fator de risco", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Negar o oseltamivir porque o paciente tomou a vacina", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Prescrever oseltamivir para covid-19", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      "Dar antibiótico para resfriado porque a secreção ficou verde nos primeiros dias",
      "Pedir radiografia de seios da face para separar sinusite viral de bacteriana",
      "Fechar OMA só pela membrana hiperemiada, em criança que chorou",
      "Tratar faringite estreptocócica com penicilina oral ou amoxicilina por menos de 10 dias",
      "Usar macrolídeo como primeira escolha em sinusite ou otite de quem não é alérgico à penicilina",
      "Prescrever descongestionante nasal por mais de 3 dias, ou em lactente",
      "Prescrever AINE ou corticoide oral para resfriado",
      { t: "Usar a tabela de peso da AIDPI acima de 24 kg, ou a dose do adulto na criança", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Converter em mL a tabela de amoxicilina com clavulanato da AIDPI sem conferir a concentração do frasco da farmácia", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" }
    ]
  },

  formulario: {
    fonte: "MS — Guia de manejo e tratamento de influenza, 2023 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023",
    farmacos: [
      { id: "oseltamivir", papel: "síndrome gripal com fator de risco (mesmo vacinado, mesmo no ambulatório), SRAG, gestante e puérpera; criança, recém-nascido e renal têm linha própria" },
      { id: "penicilina-benzatina", papel: "faringoamigdalite estreptocócica: a escolha, em dose única IM na UBS — até 5 anos vale a linha da AIDPI; acima de 5 anos, a do CAB 28" },
      { id: "amoxicilina", papel: "OMA do adulto e da criança de 2 meses a 5 anos, rinossinusite bacteriana aguda do adulto" },
      { id: "amoxicilina-clavulanato", papel: "falha da amoxicilina ou OMA recorrente, rinossinusite moderada a grave ou com antibiótico recente, rinossinusite crônica agudizada; segunda linha da AIDPI" },
      { id: "azitromicina", papel: "alérgico à penicilina com reação tipo I: OMA do adulto e faringite estreptocócica" },
      { id: "budesonida", outra: true, papel: "spray nasal: rinite alérgica e rinossinusite crônica, com lavagem salina" },
      { id: "beclometasona", outra: true, papel: "suspensão nasal: alternativa na rinite alérgica e na rinossinusite crônica" },
      { id: "prednisona", outra: true, papel: "rinossinusite crônica sem resposta, com edema grave ou agudizada: curso de 10 dias junto do antibiótico" }
    ],
    combos: ["resp-rsc-antibiotico-corticoide"],
    proibidos: [],
    dosemuda: []
  },

  scores: ["nota-conferencia", "dose-peso"]
});

/* Agente respiratoria — queixa "pneumonia-comunitaria" (onda APS II, 27/10/2026).
 * Adulto: SBPT 2018 (HTML; texto em inglês e erratas; Quadros 5 e 6) e CAB 28 vol. II,
 * 2.6 Dispneia (p. 62–66: Quadros 22–24, CRB-65, seguimento). Criança de 2 meses a 5 anos:
 * AIDPI 2017 (p. 15, 22–26, 90–91) e CAB 28 (Quadro 23, indicações de internação, p. 64).
 * Não há PCDT do MS para PAC do adulto. A SBPT 2018 é mais restritiva que o CAB 28 no
 * corte do CRB-65 para tratar em casa: a queixa mostra os dois; o CAB 28 (MS) é a regra e a SBPT é a ressalva mais restritiva.
 * Dose: só no cartão. Páginas lidas: ver respiratoria.notas.md. */

QUEIXAS.push({
  id: "pneumonia-comunitaria",
  nome: "Pneumonia adquirida na comunidade — adulto e criança",
  kw: "pneumonia pac pneumonia comunitaria crb65 curb65 febre tosse dispneia dor toracica pleuritica crepitacao estertor raio x radiografia amoxicilina azitromicina antibiotico crianca respiracao rapida tiragem",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Respiratoria",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017",
    itens: [
      { t: "Adulto com CRB-65 de 2 ou mais (confusão mental, FR de 30 ou mais, PAS abaixo de 90 ou PAD de 60 ou menos, idade acima de 65): tratamento hospitalar — 3 ou 4, internação; remover dando a primeira dose do antibiótico ainda na UBS", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "SpO2 abaixo de 92% em ar ambiente: indicação de internação", f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
      { t: "CRB-65 (CAB 28, MS): 0 ou 1, pode tratar em casa; 2, tratamento hospitalar; 3 ou 4, internação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "A SBPT 2018 é mais restritiva: considera casa com CRB-65 de 0 (ou CURB-65 de 0 a 1, se houver ureia), sem hipoxemia, sem doença descompensada, com via oral e sem motivo social — com 1 ponto, sobretudo idoso ou com comorbidade, decidir com a preceptora", f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
      { t: "Comorbidade descompensada junto da pneumonia (insuficiência cardíaca, diabetes, doença renal, hepatopatia), não consegue tomar remédio oral ou não tem quem cuide: não é caso de casa", f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
      { t: "Criança de 2 meses a 5 anos com sinal geral de perigo, tiragem subcostal ou estridor em repouso: pneumonia grave ou doença muito grave — primeira dose do antibiótico na UBS, prevenir hipoglicemia, oxigênio se houver, referir com urgência", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Lactente abaixo de 2 meses com pneumonia: sempre grave — internar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Criança: convulsão, sonolência, estridor em repouso, desnutrição grave, não consegue ingerir líquido, sinal de hipoxemia, doença de base debilitante (cardiopatia, pneumopatia, doença falciforme), derrame, abscesso ou pneumatocele, falha do tratamento ambulatorial ou família sem condição de tratar em casa: internação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Suspeita de complicação (derrame pleural, abscesso): radiografia indispensável e referência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Pneumonia com síndrome gripal e critério de SRAG (SpO2 de 94% ou menos, desconforto respiratório, hipotensão): oseltamivir já e internação", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Piorou antes do retorno marcado: pronto-socorro mais próximo, sem esperar a reavaliação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  perguntas: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Febre, tosse com expectoração, falta de ar, dor no peito que piora ao respirar? No idoso e no paciente com comorbidade a apresentação pode ser pobre",
      "Comorbidade: DPOC, insuficiência cardíaca, hepatopatia, doença renal, diabetes, alcoolismo, câncer, asplenia, imunossupressão? (muda o antibiótico)",
      "Usou antibiótico nos últimos 3 meses? (risco de pneumococo resistente: muda o esquema)",
      "Esteve internado nos últimos 90 dias, faz hemodiálise, curativo crônico em serviço de saúde, sonda enteral, mora em instituição? (risco de germe multirresistente)",
      "Alergia a betalactâmico ou a macrolídeo? Que reação?",
      "Consegue tomar remédio pela boca? Tem quem cuide em casa e traga de volta em dois dias?",
      { t: "Tosse há 2 semanas ou mais, febre à tarde, suor noturno, emagrecimento, escarro com sangue? Contato com tuberculose? (pensar em TB e colher escarro)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      "Vacinas: influenza da temporada e pneumocócica?",
      { t: "Criança: consegue beber ou mamar? Vomita tudo? Teve convulsão? Há quanto tempo tosse (mais de 14 dias: investigar outra causa)? Tem chiado?", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018",
    itens: [
      "FR contada em 1 minuto, SpO2 em ar ambiente, PA, FC, temperatura e estado mental — são os dados do CRB-65 e da decisão do local",
      { t: "CRB-65, 1 ponto cada: confusão mental; FR acima de 30; PAS abaixo de 90 ou PAD abaixo de 60; 65 anos ou mais (o CAB 28 escreve FR de 30 ou mais, PAD de 60 ou menos e idade acima de 65)", f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
      "Ausculta: estertores crepitantes e outros sinais focais; ausculta normal não afasta pneumonia — menos de 40% dos médicos acertam só pelo exame",
      "Hidratação, aceitação oral e estado geral",
      { t: "Criança: FR com a criança tranquila — respiração rápida é 50 ou mais de 2 a 11 meses e 40 ou mais de 1 a 5 anos; tiragem subcostal, estridor em repouso, sibilância, sinais gerais de perigo", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      "Taquipneia na criança maior: acima de 30 de 6 a 8 anos; acima de 25 a partir de 8 anos",
      { t: "Se tiver sibilância, tratar a sibilância antes de classificar a pneumonia na criança", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" }
    ]
  },

  naoperder: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018",
    itens: [
      "O escore não pesa comorbidade: alcoolismo, insuficiência cardíaca ou hepática e câncer aumentam o risco mesmo com CRB-65 baixo",
      "Fatores sociais e de vulnerabilidade também decidem internação, não só o escore",
      { t: "A primeira dose do antibiótico é dada na própria UBS, em qualquer horário, sobretudo na criança", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Criança com pneumonia que não melhora com antibiótico comum: pensar em tuberculose", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      "Radiografia também para diferenciar de câncer de pulmão quando há dúvida e quando a resposta ao tratamento é ruim",
      { t: "Influenza e covid-19 causam pneumonia viral; o oseltamivir não trata covid-19", f: "MS — Guia de manejo e tratamento de influenza, 2023" }
    ]
  },

  ddx: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018",
    itens: [
      { t: "Traqueobronquite aguda — tosse de menos de 3 semanas, sem sinal de pneumonia, quase sempre viral; antibiótico não está indicado", f: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006" },
      { t: "Exacerbação de DPOC — piora da dispneia, escarro purulento e em maior volume, sem consolidação", f: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006" },
      { t: "Insuficiência cardíaca — dispneia aos esforços, sintoma noturno, edema de tornozelo; sem febre", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Tuberculose — tosse por semanas, febre vespertina, sudorese, emagrecimento, hemoptise; não responde ao antibiótico comum", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Embolia pulmonar — dispneia de início súbito com dor torácica", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Câncer de pulmão — hemoptise, perda de peso, linfonodo supraclavicular ou cervical baixo, derrame pleural, baqueteamento digital", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Síndrome gripal ou covid-19 — febre súbita com tosse ou dor de garganta e mialgia; pode evoluir para SRAG", f: "MS — Guia de manejo e tratamento de influenza, 2023" },
      { t: "Criança com sibilância — bronquiolite ou crise de sibilância; a respiração rápida pode ceder depois do broncodilatador", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" }
    ]
  },

  exames: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Radiografia de tórax PA e perfil quando disponível: a SBPT a considera obrigatória na suspeita de PAC, porque o exame físico sozinho erra muito",
      { t: "Com diagnóstico clínico seguro, o antibiótico não espera a radiografia", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Radiografia indispensável: dúvida diagnóstica, suspeita de complicação, resposta ruim ao tratamento e diferencial com câncer",
      "Escarro, hemocultura e pesquisa etiológica não são necessários na PAC não grave tratada em casa",
      "Oximetria em todos; ureia, se houver, permite o CURB-65 (ureia acima de 50 mg/dL soma 1 ponto)",
      { t: "Sintomático respiratório: escarro para TRM-TB ou baciloscopia junto da investigação", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" }
    ]
  },

  farmaco: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Adulto hígido, sem comorbidade, sem antibiótico recente, sem fator de risco para resistência e sem alergia: um antibiótico só — amoxicilina, amoxicilina com clavulanato ou macrolídeo (azitromicina, claritromicina)",
      "Com comorbidade, antibiótico nos últimos 3 meses ou fator de risco para resistência: betalactâmico junto de macrolídeo (no CAB 28, amoxicilina em dose alta ou amoxicilina com clavulanato, mais azitromicina)",
      "Na DPOC, a azitromicina é preferida à claritromicina: cobre melhor o H. influenzae",
      "Quinolona respiratória só para o alérgico a betalactâmico e macrolídeo ou com doença mais grave; evitar no hígido. Ciprofloxacino não serve para PAC (não cobre o pneumococo)",
      { t: "Levofloxacino é do Componente Estratégico, não da farmácia básica; claritromicina e amoxicilina estão no Básico", f: "RENAME 2024" },
      "Duração: PAC leve em casa, 5 dias de monoterapia pelo texto da SBPT (7 dias na tabela); moderada a grave, 7 a 10 dias; sem melhora em 3 dias, reavaliar e considerar estender",
      { t: "Primeira dose na UBS. Antibiótico que precisa de diluição: diluir com água potável", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Criança de 2 meses a 5 anos com pneumonia (respiração rápida, sem sinal de perigo): amoxicilina por 7 dias; segunda linha, amoxicilina com clavulanato ou eritromicina. Com sibilância, broncodilatador por 5 dias", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      "Corticoide adjuvante é para PAC grave internada; não estender ao tratamento em casa",
      { t: "Criança acima de 5 anos ou acima de 24 kg: as fontes baixadas não trazem dose de amoxicilina por kg com teto (o CAB 28 dá dose por kg sem teto) — não usar a tabela da AIDPI nem a dose do adulto; conferir com a preceptora", v: true },
      { t: "Suspeita de influenza junto da pneumonia: oseltamivir", f: "MS — Guia de manejo e tratamento de influenza, 2023" }
    ]
  },

  conduta: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Calcular o CRB-65, medir a SpO2 e decidir o local antes de prescrever",
      "Casa: prescrever, dar a primeira dose na UBS e explicar os sinais para voltar antes",
      { t: "Reavaliar a cada dois dias do início do antibiótico; piora antes do retorno, pronto-socorro", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Sem melhora em 3 dias: radiografia (se ainda não feita), rever o diagnóstico e o esquema",
      { t: "Criança com pneumonia: antibiótico por 7 dias, aliviar a tosse com medidas caseiras, retorno imediato se piorar, retorno marcado em 2 dias; tosse há mais de 14 dias, investigar", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Criança com pneumonia grave: primeira dose do antibiótico ainda na UBS e referência urgente", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Depois da recuperação: vacina influenza para os grupos indicados e avaliar a pneumocócica (fora da rotina do adulto; no SUS, pelo CRIE para os grupos de risco)", f: "medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)" },
      { t: "Fluxo local: onde fazer radiografia no mesmo dia, para onde remover (UPA, hospital de referência) e como acionar o transporte — confirmar com a equipe da USF", v: true }
    ]
  },

  erros: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Mandar para casa com CRB-65 de 1 ponto sem pesar comorbidade, SpO2 e quem cuida (a SBPT só considera casa direto com 0)",
      "Decidir o local do tratamento sem SpO2 e sem contar a FR em 1 minuto",
      "Esperar a radiografia para começar o antibiótico no paciente com diagnóstico clínico claro",
      "Prescrever ciprofloxacino para pneumonia",
      "Começar com quinolona no adulto hígido",
      "Dar macrolídeo sozinho a quem tem comorbidade ou usou antibiótico recente",
      "Não marcar a reavaliação em dois dias",
      "Prescrever corticoide de rotina na PAC tratada em casa",
      { t: "Contar a FR da criança chorando ou agitada e classificar pneumonia onde não há", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Repetir antibiótico em criança que não melhora sem pensar em tuberculose", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" }
    ]
  },

  formulario: {
    fonte: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017 · MS — Guia de manejo e tratamento de influenza, 2023",
    farmacos: [
      { id: "amoxicilina", papel: "PAC do adulto hígido (sozinha) e com comorbidade em dose alta junto do macrolídeo; pneumonia da criança de 2 meses a 5 anos" },
      { id: "azitromicina", papel: "PAC do adulto: sozinha no hígido sem fator de risco, ou junto do betalactâmico com comorbidade; preferida na DPOC" },
      { id: "amoxicilina-clavulanato", papel: "PAC do adulto: alternativa à amoxicilina, ou betalactâmico da associação com comorbidade; segunda linha da AIDPI na criança" },
      { id: "oseltamivir", outra: true, papel: "pneumonia na sazonalidade da influenza com critério de SRAG, ou em quem tem fator de risco" },
      { id: "salbutamol", outra: true, papel: "criança de 2 meses a 5 anos com pneumonia e sibilância: broncodilatador em casa" }
    ],
    combos: ["resp-pac-betalactamico-macrolideo"],
    proibidos: [],
    dosemuda: []
  },

  scores: ["nota-conferencia", "dose-peso"]
});

/* Agente respiratoria — queixa "asma" (onda APS II, 27/10/2026): a CONSULTA DE CONTROLE.
 * A crise grave na UBS é a queixa crise-asma-dpoc (agente urgencias).
 * Base: PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43/2026 (revoga a PC nº 32/2023): p. 2–44
 * (diagnóstico Q2–Q4, controle, sobreposição asma-DPOC Q5, tratamento Q6–Q7, doses Q9–Q11,
 * monitoramento). O CAB 28 (GINA 2007) está superado no tratamento. Encaminhamento e
 * avaliação de controle: TelessaúdeRS Pneumologia 2023 (P2, Q5, Q7, Q8). Componente da
 * RENAME 2024: formoterol + budesonida e budesonida inalatória no Especializado;
 * beclometasona e salbutamol no Básico e na Farmácia Popular (PCDT p. 38).
 * Dose: só no cartão. Páginas lidas: ver respiratoria.notas.md. */

QUEIXAS.push({
  id: "asma",
  nome: "Asma — consulta de controle",
  kw: "asma bronquite asmatica chiado sibilancia falta de ar aperto no peito tosse noturna bombinha salbutamol beclometasona budesonida formoterol corticoide inalatorio espacador controle exacerbacao air mart pcdt",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Respiratoria",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023 · MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      { t: "Crise com cianose, sudorese, exaustão, confusão ou sonolência, fala entrecortada, musculatura acessória, murmúrio diminuído ou tórax silencioso, FR acima de 30 no adulto, FC acima de 120 ou abaixo de 60, SpO2 abaixo de 90% ou PFE de 50% ou menos do previsto: urgência — ver a queixa da crise na UBS", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Sinal de gravidade ou risco iminente: iniciar SABA, oxigênio controlado e corticoide sistêmico e providenciar transferência urgente; SpO2 abaixo de 90% pede tratamento intensivo", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Risco de morrer de asma: crise com parada, intubação ou UTI; internação por asma no último ano; 3 ou mais idas à emergência no ano com tratamento adequado; anafilaxia ou alergia alimentar — encaminhar à pneumologia e seguir de perto", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Asma lábil: crises que começam de repente e já graves, sem o paciente perceber o início", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Uso excessivo de SABA (mais de três frascos de 200 doses por ano, em média mais de uma vez por dia): mais exacerbação e mais morte — rever o tratamento de controle", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Poucos sintomas não afastam risco: controle e risco podem ser discordantes, e quem tem pouco sintoma ainda pode ter crise grave ou fatal", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Gestante: exacerbação tratada com agressividade (hipóxia fetal) — SABA, oxigênio e corticoide sistêmico precoce; nunca suspender o CI na gravidez", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Criança de até 5 anos: procurar atendimento se estiver prostrada, não responder ao SABA ou piorar (sobretudo abaixo de 1 ano), se precisar de 4 ou mais jatos em 4 horas no mesmo dia ou de SABA mais de 3 vezes nas primeiras 12 horas", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Sintomas que não são de asma — escarro crônico, falta de ar com tontura ou formigamento, dor torácica, ruído inspiratório ao exercício: investigar outra causa", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" }
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      { t: "Nas últimas 4 semanas: sintomas de dia mais de 2 vezes por semana? Acordou à noite pela asma? Usou SABA de alívio mais de 2 vezes por semana? Alguma limitação por causa da asma? (nenhum sim: controlada; 1 ou 2: parcialmente; 3 ou 4: não controlada)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      "Quantas crises no último ano precisaram de corticoide oral? Idas à emergência? Internação, UTI ou intubação alguma vez?",
      "Quantos frascos de salbutamol usou no último ano?",
      "Usa o corticoide inalatório todo dia? Mostre como usa (com o seu dispositivo); usa espaçador?",
      "Fuma cigarro ou cigarro eletrônico? Alguém fuma em casa ou no carro? Fogão a lenha?",
      "Trabalho: os sintomas pioram nos dias de trabalho e melhoram em folgas, feriados e férias? (asma ocupacional)",
      "Gatilhos: virose, exercício, alérgenos (poeira, ácaro, mofo, pelos), ar frio, riso; usa anti-inflamatório ou betabloqueador?",
      { t: "Betabloqueador, inclusive em colírio, piora a obstrução e a tosse de quem tem asma ou DPOC", f: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006" },
      "Rinite, refluxo, ronco com pausas, obesidade, ansiedade ou depressão?",
      "Começou depois dos 40 anos, fuma ou fumou, a falta de ar é diária e progressiva? (pensar em DPOC ou sobreposição)",
      "Gestante ou planejando engravidar?",
      "Vacinas influenza e covid-19 em dia?"
    ]
  },

  exame: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Técnica inalatória observada com o dispositivo do paciente, em toda consulta",
      "Ausculta: sibilos expiratórios (podem faltar fora da crise); estertor ou sibilo inspiratório não é típico de asma",
      "Vias aéreas superiores: sinais de rinite alérgica e pólipos nasais",
      "SpO2, FR e FC (procurar sinal de crise)",
      "PFE quando não houver espirometria: o maior de 3 sopros, sempre com o mesmo medidor (pode variar até 20% entre aparelhos)",
      "Peso e IMC (asma associada à obesidade tem padrão próprio)"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Asma ou DPOC? Início depois dos 40 anos, tabagismo ou biomassa, dispneia persistente e sem asma prévia: DPOC. Com traços das duas, trata como asma (CI obrigatório) e o LAMA, se preciso, segue o PCDT da DPOC",
      "LABA ou LAMA nunca sem corticoide inalatório na asma, nem na sobreposição asma-DPOC",
      "Antes de subir a etapa: é mesmo asma? A técnica está certa? Usa todo dia? Segue exposto? Tem comorbidade? Educação em asma feita?",
      "Tosse crônica pode ser a única manifestação da asma (variante tosse)",
      "Asma ocupacional: afastar da exposição o quanto antes",
      "Depois de exacerbação grave: rever em 2 a 7 dias (criança, 1 a 2 dias), antes de suspender o corticoide oral, com plano de ação escrito",
      "Corticoide oral repetido acumula dano (diabetes, osteoporose, catarata, glaucoma); uso por 3 meses ou mais pede prevenção de osteoporose",
      "Gestação: CI, SABA e LABA são seguros; não é hora de reduzir o tratamento"
    ]
  },

  ddx: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "DPOC — 40 anos ou mais, tosse e expectoração, dispneia aos esforços, tabagismo ou exposição nociva",
      "Insuficiência cardíaca — dispneia ao esforço, sintoma noturno, edema de tornozelo",
      "Obstrução laríngea induzida — dispneia com estridor (sibilo inspiratório)",
      "Respiração disfuncional — tontura, formigamento, suspiros",
      "Bronquiectasia — tosse produtiva e infecções de repetição",
      "Tosse por IECA — começa com o anti-hipertensivo",
      "Tuberculose — tosse crônica, hemoptise, febre, suor noturno, emagrecimento",
      "Embolia pulmonar — dispneia súbita com dor no peito",
      "Deficiência de alfa-1-antitripsina — falta de ar com enfisema precoce na família",
      "Doença do refluxo, rinossinusite crônica e câncer de pulmão também imitam ou somam à asma"
    ]
  },

  exames: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Espirometria com broncodilatador: confirma asma o aumento do VEF1 ou da CVF de 12% ou mais e de pelo menos 200 mL (mais confiável com 15% e 400 mL)",
      "Sem espirometria: PFE — aumento de 20% ou mais depois do broncodilatador, ou variabilidade diária média acima de 10% em 2 semanas no adulto (acima de 13% na criança)",
      "Confirmar o diagnóstico antes de começar o CI, quando der; na urgência, tratar já e testar nas semanas seguintes",
      "Espirometria no diagnóstico, 3 a 6 meses depois de iniciar e, depois, a cada 1 a 2 anos (mais vezes no paciente de risco)",
      "Radiografia de tórax só para diagnóstico diferencial; não serve para acompanhar a asma",
      "Hemograma: anemia que agrava a dispneia e eosinofilia (orienta fenótipo na asma grave, não diagnostica)",
      "Não fazer espirometria em quem tem suspeita de tuberculose",
      { t: "Fluxo local da espirometria (regulação, tele-espirometria) em Feira de Santana — confirmar com a equipe", v: true }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "A partir de 6 anos, todo paciente com asma recebe corticoide inalatório; SABA sozinho não é mais recomendado. O PCDT de 2026 revogou o de 2023; o CAB 28 (2012) está superado no tratamento",
      "Regime 1, o preferido: formoterol + budesonida — sob demanda nas etapas 1 e 2 (AIR); manutenção e alívio com o mesmo inalador nas etapas 3 a 5 (MART)",
      { t: "O que a USF e a Farmácia Popular entregam é beclometasona + salbutamol, o regime 2. Formoterol + budesonida e budesonida inalatória são do Componente Especializado: precisam de LME no CEAF. Dizer ao paciente o que é preferido e o que há na USF — não é a mesma coisa", f: "RENAME 2024" },
      "Regime 2 por etapa: etapa 1, CI de dose baixa sempre que usar o SABA; etapa 2, CI diário de dose baixa + SABA sob demanda; etapa 3, CI-LABA de dose baixa ou CI de dose média + SABA; etapa 4, CI-LABA de dose média + SABA",
      "O regime 2 é a alternativa quando o regime 1 não é viável, ou para o paciente estável, aderente e sem exacerbação no último ano",
      { t: "Dose do salbutamol de alívio fora da crise (regime 2): o PCDT 2026 não traz; não usar a linha de exacerbação do cartão como receita de casa — conferir com a preceptora", v: true },
      { t: "Etapa 1 do regime 2: o PCDT não dá a dose do CI por uso ('sempre que usar o SABA') — conferir com a preceptora", v: true },
      "A maioria controla com dose baixa de CI; dose alta só por tempo limitado e com reavaliação",
      "Reduzir: estável por 3 meses, cair o CI de 25 a 50%; nunca suspender totalmente o CI",
      "Criança de 6 a 11 anos: SABA de alívio com CI (sempre que usar, ou diário). Até 5 anos: SABA para todos; etapa 1, curso intermitente de CI no início das viroses; CI diário se sintomas mais de 2 vezes por semana ou exacerbação grave no último ano, como teste de 2 a 3 meses",
      "Spray sempre com espaçador; enxaguar a boca e cuspir depois do CI; não prescrever spray e pó ao mesmo paciente",
      "Exacerbação leve pode ser tratada na APS; na alta, CI de manutenção + alívio + curso curto de corticoide oral — o SABA sozinho não",
      { t: "Formoterol + budesonida para criança de 6 a 11 anos: a apresentação de menor dose de budesonida, preferida pelo PCDT, não está na RENAME 2024", f: "RENAME 2024" },
      { t: "Tabagismo: tratamento pelo PCDT do Tabagismo — reposição de nicotina e bupropiona estão nos cartões de psicofármacos", f: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020" }
    ]
  },

  conduta: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Classificar o controle (as 4 perguntas) e o risco (exacerbações, SABA, técnica, adesão, VEF1, tabagismo, vulnerabilidade social)",
      "Escolher etapa e regime com o paciente; para o regime 1, preencher o LME para o CEAF; sem acesso, o regime 2 com o que a USF tem",
      "Plano de ação escrito, revisado em toda consulta",
      { t: "Treinar a técnica e revisar em toda consulta; espaçador artesanal (garrafa plástica) funciona", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Cessação do tabagismo em toda consulta; casa e carro sem fumaça para a criança com asma",
      "Vacinas influenza e covid-19 em dia",
      "Atividade física regular (Academia da Saúde), perda de peso na obesidade, controle de mofo e umidade",
      "Reavaliar 3 a 6 meses depois de iniciar ou ajustar e depois de toda exacerbação",
      { t: "Encaminhar à pneumologia: etapa 5; sintomas ou exacerbações na etapa 4 por pelo menos 3 meses com adesão e técnica revisadas; risco de fatalidade; asma lábil; tabagista motivado com Fagerström acima de 6 que falhou na APS. Asma ocupacional: Medicina do Trabalho", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Fluxo local: onde abrir o processo do CEAF (LME) em Feira de Santana e quanto demora — confirmar com a farmácia", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Manter só o salbutamol ('bombinha quando aperta'), sem corticoide inalatório",
      "Prescrever LABA sem CI",
      "Subir a etapa sem ver a técnica e a adesão",
      "Não explicar que o CI não alivia na hora — o paciente abandona porque 'não sente diferença'",
      "Suspender o CI porque melhorou, ou porque engravidou",
      "Repetir prednisona a cada crise sem rever o controle nem reavaliar em 2 a 7 dias",
      "Chamar de asma o tabagista acima de 40 anos com falta de ar progressiva sem nunca pedir espirometria",
      "Prescrever spray e pó ao mesmo paciente",
      { t: "Prescrever formoterol + budesonida como se saísse da farmácia da UBS, sem LME", f: "medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)" },
      "Dar mais frascos de salbutamol a quem já usa mais de um por mês, em vez de rever o controle"
    ]
  },

  formulario: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · RENAME 2024 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017",
    farmacos: [
      { id: "beclometasona", papel: "o CI que a USF e a Farmácia Popular entregam: base do regime 2 (CI sempre que usar o SABA, ou CI diário de dose baixa)" },
      { id: "salbutamol", papel: "alívio do regime 2, sempre junto do CI (dose de alívio fora da crise: VERIFICAR); a linha do cartão é a da exacerbação leve a moderada na UBS" },
      { id: "formoterol-budesonida", papel: "regime 1, o preferido do PCDT 2026 (AIR nas etapas 1 e 2, MART nas etapas 3 a 5); Componente Especializado, com LME" },
      { id: "budesonida", papel: "CI alternativo à beclometasona; a inalatória só pelo Componente Especializado" },
      { id: "prednisolona", papel: "exacerbação: curso curto — solução oral na criança; adolescente e adulto também" },
      { id: "prednisona", papel: "exacerbação no adolescente e no adulto: curso curto, sem desmame se menos de duas semanas" }
    ],
    combos: ["resp-asma-beclometasona-salbutamol"],
    proibidos: ["resp-saba-isolado-asma", "resp-laba-sem-ci-asma"],
    dosemuda: []
  },

  scores: ["nota-conferencia", "imc", "dose-peso"]
});

/* Agente respiratoria — queixa "dpoc" (onda APS II, 27/10/2026): a consulta do paciente com
 * DPOC na USF. A crise grave na UBS é a queixa crise-asma-dpoc (agente urgencias).
 * Base: PCDT DPOC, Portaria Conjunta SAES/SCTIE nº 29/2025 (revoga a PC nº 19/2021), p. 3–28
 * (diagnóstico Q1–Q4, tratamento Q5–Q6, hospitalização, O2, vacinas, monitoramento);
 * TelessaúdeRS Pneumologia 2023 (P1, Q1–Q4); wiki pneumologia-dpoc-fatos (fatos calibrados,
 * componente da RENAME). O padrão de erro vem do caso atp-04 (DPOC subdiagnosticada,
 * tratada como asma por anos): espirometria nunca pedida, SABA como manutenção, técnica
 * nunca vista, exacerbações não contadas, tabagismo aconselhado e nunca acompanhado.
 * Dose: só no cartão. Páginas lidas: ver respiratoria.notas.md. */

QUEIXAS.push({
  id: "dpoc",
  nome: "DPOC — consulta do paciente com doença pulmonar obstrutiva crônica",
  kw: "dpoc enfisema bronquite cronica tabagismo tabagista dispneia falta de ar tosse expectoracao espirometria vef1 gold mmrc cat exacerbacao salbutamol ipratropio umeclidinio vilanterol oxigenio oxigenoterapia fogao a lenha biomassa",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Respiratoria",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023",
    itens: [
      { t: "Exacerbação que pede hospital: resposta ruim ao tratamento ambulatorial, piora importante da dispneia, não consegue dormir ou comer pelos sintomas, hipoxemia ou hipercapnia piorando, alteração do estado mental, sem condição de autocuidado ou sem suporte em casa, dúvida diagnóstica ou comorbidade importante (pneumonia, cardiopatia, diabetes, insuficiência renal)", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Exacerbação com sinal de gravidade que a APS não maneja: urgência — ver a queixa da crise na UBS", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "SpO2 de 92% ou menos: gasometria arterial; fora de exacerbação e em repouso, encaminhar à pneumologia para avaliar oxigênio domiciliar", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Sinais de cor pulmonale — B2 hiperfonética em foco pulmonar, B3 de VD, turgência jugular, refluxo hepatojugular, ascite, edema periférico: pneumologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Hemoptise, perda de peso, linfonodo supraclavicular ou cervical baixo, derrame pleural, baqueteamento digital: pensar em câncer de pulmão", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Tosse com expectoração ou com sangue, cavitação ou infiltrado de lobo superior: excluir tuberculose antes de chamar de DPOC", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Nos 90 dias depois de uma exacerbação o risco de infarto, AVC e morte cardiovascular sobe: considerar ECG e ecocardiograma", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "IMC abaixo de 21 e perda de peso involuntária: pior prognóstico — avaliar suporte nutricional", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Fumar em uso de oxigênio domiciliar: risco de explosão", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" }
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "Fuma ou fumou? Quantos cigarros por dia e por quantos anos (maços-ano)? Já tentou parar? Em que estágio está para parar?",
      { t: "Quanto tempo depois de acordar fuma o primeiro cigarro? (Fagerström: 6 a 7 é dependência elevada, 8 a 10 muito elevada)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      "Exposição: fogão a lenha, queima de biomassa, carvão ou querosene na cozinha, sílica, poeiras e vapores no trabalho, fumo passivo",
      { t: "Falta de ar pela escala mMRC: 0 só em esforço intenso; 1 ao correr ou subir ladeira leve; 2 anda mais devagar que os da mesma idade ou para no plano; 3 para depois de cerca de 100 metros; 4 não sai de casa ou cansa ao se vestir", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      "Nos últimos 12 meses: quantas pioras tratadas com antibiótico ou corticoide (moderadas) e quantas internações (graves)?",
      "Asma na infância, tuberculose, prematuridade ou baixo peso ao nascer, infecções respiratórias repetidas, HIV? Família com DPOC ou enfisema precoce?",
      "O que usa e como usa: salbutamol todo dia como manutenção? Usa espaçador? Mostre a bombinha",
      "Sintomas que variam, pioram à noite, alergia? (asma junto muda o tratamento)",
      "Ansiedade, depressão, perda de peso; cardiopatia, diabetes, osteoporose, refluxo, doença periodontal?",
      "Vacina influenza deste ano e pneumocócicas?"
    ]
  },

  exame: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "SpO2 em repouso na primeira consulta e sempre que possível; em toda consulta se o VEF1 é menor que 50%",
      "SpO2 ao esforço na DPOC grave ou na suspeita de hipoxemia (policitemia): subir e descer um degrau ou marcha parada por 3 a 5 minutos, até FC de 100 a 110",
      "Peso, altura e IMC em toda consulta",
      "Cianose, tórax em barril e tiragem intercostal sugerem doença avançada",
      { t: "Sinais de insuficiência cardíaca direita: turgência jugular, refluxo hepatojugular, edema, B2 hiperfonética", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      "Técnica inalatória com o dispositivo do paciente, com demonstração",
      "PA e risco cardiovascular (calculadora HEARTS de 40 a 74 anos, todo ano)"
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "O diagnóstico exige espirometria pós-broncodilatador: VEF1/CVF abaixo de 0,7. Entre 0,6 e 0,8, repetir em outra ocasião",
      "Sem espirometria (ou quem não consegue fazer), o PCDT aceita PFE com questionário validado como apoio ao diagnóstico clínico — a falta do exame não pode virar anos sem diagnóstico",
      "Asma junto (suspeita ou confirmada): o tratamento segue prioritariamente o PCDT da Asma, com CI",
      "Espirometria sem obstrução depois de um curso de tratamento exclui DPOC",
      "Pré-DPOC e PRISm (alteração estrutural ou funcional sem relação VEF1/CVF baixa): acompanhar, não dar alta",
      "Enfisema de início precoce (antes dos 40), de predomínio basal, sobretudo em não fumante: dosar alfa-1-antitripsina e encaminhar",
      "Parar de fumar é a intervenção mais eficaz para frear a DPOC — e quem segue fumando responde menos ao corticoide inalatório",
      "Antitussígeno não se prescreve na DPOC"
    ]
  },

  ddx: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "Asma — início na infância, atopia, história familiar, piora noturna ou matinal, obstrução reversível",
      "Bronquiectasia — escarro crônico frequentemente purulento; a TC mostra as bronquiectasias",
      "Insuficiência cardíaca — tosse seca ou mucoide, melhora com diurético, edema pulmonar ou cardiomegalia na imagem",
      "Tuberculose — escarro com pus ou sangue, cavitação, infiltrado de lobo superior, fibrose residual",
      "Bronquiolite obliterante — pós-infecção viral, inalação tóxica, doença autoimune ou transplante; aprisionamento aéreo na TC",
      { t: "Câncer de pulmão — tabagista com hemoptise, perda de peso ou baqueteamento", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" }
    ]
  },

  exames: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "Espirometria pré e pós-broncodilatador: diagnóstico e grau (GOLD 1, VEF1 de 80% ou mais; 2, de 50 a 79%; 3, de 30 a 49%; 4, abaixo de 30%)",
      "Grupo pelo risco: A — mMRC 0 a 1 (ou CAT abaixo de 10) e no máximo uma exacerbação moderada; B — mMRC 2 ou mais (ou CAT 10 ou mais) e no máximo uma moderada; E — uma ou mais internações ou duas ou mais moderadas no ano, com qualquer sintoma",
      "Hemograma na primeira consulta (se não houver dos últimos 4 a 6 meses): anemia, policitemia e eosinófilos, que orientam o corticoide inalatório",
      "Oximetria; gasometria se SpO2 de 92% ou menos",
      "Radiografia de tórax PA e perfil na primeira consulta, se não houver dos últimos 12 meses",
      "ECG e ecocardiograma na suspeita de cor pulmonale ou cardiopatia",
      "Alfa-1-antitripsina nos casos indicados",
      { t: "Tosse com expectoração há 2 semanas ou mais: escarro para TRM-TB ou baciloscopia", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Fluxo local da espirometria em Feira de Santana (regulação, tele-espirometria) — confirmar com a equipe", v: true }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "Grupo A: broncodilatador de curta ação (salbutamol ou ipratrópio) sob demanda; LABA se os sintomas forem frequentes. Tratar de preferência na APS",
      "Grupos B e E: LAMA + LABA contínuo — umeclidínio + vilanterol, sem depender do VEF1; tiotrópio + olodaterol só no grupo E com VEF1 abaixo de 50%. Todos mantêm um broncodilatador de curta ação para alívio",
      { t: "Nenhum broncodilatador de longa ação sai da farmácia da UBS: LAMA + LABA e as triplas são Componente Especializado (LME no CEAF). Na UBS há salbutamol, ipratrópio, beclometasona e prednisona", f: "medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)" },
      "Corticoide inalatório não é monoterapia na DPOC: só como terapia tripla — eosinófilos de 300 ou mais, ou exacerbações frequentes com eosinófilos entre 100 e 300 (decisão individual), ou exacerbações apesar de LAMA + LABA. Evitar com eosinófilos abaixo de 100 ou pneumonia prévia",
      "Quem já usa LABA + CI do PCDT de 2021, estável e sem exacerbação: não precisa trocar de imediato",
      "Exacerbação moderada ou grave: ajustar o broncodilatador de curta ação (SAMA pode ir junto do SABA), corticoide oral por 5 dias (via oral sempre que possível) e antibiótico só na exacerbação infecciosa, com critério",
      { t: "Antibiótico na exacerbação infecciosa leve a moderada, sem comorbidade e com poucas exacerbações: betalactâmico com inibidor de betalactamase, cefuroxima ou macrolídeo (diretriz de 2006)", f: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006" },
      { t: "Dose e duração do antibiótico da exacerbação da DPOC: não estão no PCDT nem nas fontes baixadas — conferir com a preceptora antes de prescrever", v: true },
      "Azitromicina de uso contínuo para prevenir exacerbação: citada no PCDT sem esquema posológico; o uso crônico pode reduzir a audição (audiometria se houver suspeita)",
      "Teofilina não é rotina; antitussígeno, nunca",
      "Spray com espaçador ou aerocâmara; se não consegue a manobra, inalar em volume corrente (5 respirações por jato); pó seco pode falhar com obstrução muito grave",
      { t: "Tabagismo: tratamento medicamentoso se dependência elevada, pelo PCDT do Tabagismo — reposição de nicotina e bupropiona estão nos cartões de psicofármacos", f: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020" }
    ]
  },

  conduta: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "Confirmar o diagnóstico (espirometria) e classificar: grau GOLD (obstrução) e grupo A, B ou E (sintomas e exacerbações)",
      "Cessação do tabagismo em toda consulta, estruturada (abordagem mínima, terapia cognitivo-comportamental, grupo), com Fagerström e estágio de motivação",
      "Prescrever pelo grupo; grupos B e E: preencher o LME do LAMA + LABA",
      "Revisar a técnica inalatória e a adesão em toda consulta, com demonstração",
      "Plano escrito de autocuidado: o que fazer na piora e quando procurar atendimento",
      "Reabilitação: se não houver serviço, atividade física orientada — caminhada, subir e descer escada, sentar e levantar da cadeira, pesos leves; Academia da Saúde; telerreabilitação",
      "Vacinas: influenza todo ano para todos; pneumocócicas (conjugada primeiro, polissacarídica 23-valente 6 meses depois) nos sintomáticos e exacerbadores ou com comorbidade de risco",
      { t: "Pneumocócica do adulto com DPOC não é da rotina da sala de vacina: vai pelo CRIE", f: "medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)" },
      "Depois de uma exacerbação: reavaliar em 1 a 4 semanas e de novo em 12 a 16 semanas",
      { t: "Encaminhar à pneumologia: VEF1 abaixo de 30%; 2 ou mais exacerbações no ano ou 1 internação, ou mMRC de 2 ou mais, apesar de 3 meses de tratamento otimizado; suspeita de cor pulmonale; SpO2 de 92% ou menos em repouso, fora de exacerbação (oxigênio domiciliar); tabagista motivado com Fagerström acima de 6 que falhou na APS", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      "GOLD 3 em diante: acompanhar também com pneumologista, sem perder o vínculo com a USF",
      "Oxigênio domiciliar (pela pneumologia): PaO2 abaixo de 55 mmHg ou SpO2 abaixo de 88% em duas medidas em 3 semanas, ou PaO2 de 55 a 60 (SpO2 de 88%) com hipertensão pulmonar, edema de insuficiência cardíaca ou hematócrito acima de 55%; mais de 15 horas por dia, inclusive no sono",
      { t: "Fluxo local: onde abrir o LME do CEAF, acesso ao CRIE e programa de oxigênio domiciliar em Feira de Santana — confirmar com a equipe", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      "Chamar de 'bronquite' ou asma o fumante acima de 40 anos com falta de ar progressiva e nunca pedir espirometria",
      "Deixar o salbutamol como manutenção diária no paciente dos grupos B ou E, sem broncodilatador de longa ação",
      "Tratar 3 ou 4 pioras por ano com corticoide e antibiótico sem reclassificar como grupo E nem reavaliar depois",
      "Prescrever beclometasona sozinha para DPOC",
      "Trocar de remédio sem antes ver a técnica — remédio que não chega ao pulmão não tem dose certa",
      "Repetir 'pare de fumar' sem abordagem estruturada nem oferta de tratamento",
      "Não medir SpO2, ou ver 92% e não pedir gasometria",
      "Prescrever xarope antitussígeno",
      "Não aplicar mMRC ou CAT e não contar as exacerbações do ano",
      "Não perguntar por fogão a lenha e exposição no trabalho",
      "Esquecer a vacina influenza anual"
    ]
  },

  formulario: {
    fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025 · RENAME 2024",
    farmacos: [
      { id: "salbutamol", papel: "alívio sob demanda em todos os grupos; sozinho, só no grupo A; nebulização para o muito debilitado" },
      { id: "brometo-de-ipratropio", papel: "o antimuscarínico de curta ação da UBS: alívio no grupo A e junto do salbutamol na exacerbação" },
      { id: "umeclidinio-vilanterol", papel: "LAMA + LABA: tratamento inicial dos grupos B e E, sem depender do VEF1 (Componente Especializado, LME); com asma junto, suspeita ou confirmada, só com CI, pelo PCDT da Asma" },
      { id: "prednisona", papel: "exacerbação moderada ou grave: curso oral de 5 dias" },
      { id: "prednisolona", papel: "exacerbação moderada ou grave: alternativa em solução oral" },
      { id: "beclometasona", papel: "corticoide inalatório só dentro da terapia tripla, nunca sozinho na DPOC" },
      { id: "budesonida", papel: "corticoide inalatório da terapia tripla aberta (Componente Especializado), nunca sozinho" }
    ],
    combos: ["resp-dpoc-exacerbacao-saba-sama"],
    proibidos: ["resp-ci-isolado-dpoc", "resp-laba-sem-ci-asma"],
    dosemuda: []
  },

  scores: ["imc", "nota-conferencia"]
});

/* Agente respiratoria — queixa "tosse-cronica" (onda APS II, 27/10/2026), no adulto.
 * Não há fonte do MS para tosse crônica. Base: SBPT, II Diretrizes Brasileiras no Manejo da
 * Tosse Crônica, 2006 (HTML, sem página) e TelessaúdeRS Pneumologia 2023 (P3, P4) e
 * Otorrinolaringologia 2023 (P7, disfonia), com o Manual de TB 2019 para o sintomático
 * respiratório. O Resumo Clínico de tosse crônica do TelessaúdeRS (2016) não baixou (FALTA).
 * Dose: só no cartão. Páginas lidas: ver respiratoria.notas.md. */

QUEIXAS.push({
  id: "tosse-cronica",
  nome: "Tosse crônica no adulto (mais de 8 semanas)",
  kw: "tosse cronica tosse persistente tosse seca tosse que nao passa gotejamento pos nasal rinite rinossinusite asma variante tosse refluxo drge ieca enalapril captopril tabagismo bronquite cronica tuberculose sintomatico respiratorio",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Respiratoria",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023 · MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019",
    itens: [
      { t: "Hemoptise, perda de peso, linfonodo supraclavicular, cervical baixo ou mediastinal, derrame pleural ou baqueteamento digital: suspeita de câncer — imagem de tórax e encaminhamento", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Sintomático respiratório: tosse há 2 semanas ou mais em quem procura a unidade (3 ou mais na busca ativa); PVHIV, pessoa presa, em situação de rua, indígena ou contato de TB com tosse de qualquer duração — escarro para TB já", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Febre à tarde, suor noturno, emagrecimento, falta de apetite, escarro com sangue: tuberculose até prova em contrário", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Nódulo, massa ou alteração de imagem suspeita de neoplasia: Cirurgia Torácica ou Oncologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Rouquidão por 3 semanas ou mais em tabagista ou etilista, com disfagia, dor ao engolir ou perda de peso: otorrino (neoplasia), antes mesmo de achar outra causa", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      { t: "Tosse com dispneia de início súbito e dor no peito: embolia pulmonar; com dispneia aos esforços, sintoma noturno e edema: insuficiência cardíaca", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Tosse com engasgo e regurgitação nasal ao engolir (disfagia orofaríngea): com sintomas constitucionais, lesão na oroscopia, disfonia, aspiração ou linfonodo cervical, otorrino ou oncologia por suspeita de neoplasia; persistente sem causa na APS, otorrino", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" }
    ]
  },

  perguntas: {
    fonte: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006",
    itens: [
      "Há quanto tempo? Aguda até 3 semanas, subaguda de 3 a 8, crônica acima de 8",
      "Começou depois de um resfriado ou gripe? (pós-infecciosa: de 3 a 8 semanas, com exame sem outra causa)",
      "Usa enalapril, captopril ou outro IECA? Começou depois dele? Usa betabloqueador, inclusive colírio?",
      "Fuma? Quanto e há quanto tempo? Fumo passivo, fogão a lenha, poeiras e vapores no trabalho?",
      "Tem catarro? Quanto por dia (mais de uma xícara sugere bronquiectasia), purulento, com sangue, pior ao mudar de posição?",
      "Nariz entupido, coriza, espirros, sensação de secreção escorrendo para a garganta, pigarro?",
      "Azia, regurgitação, rouquidão? Tosse durante ou depois das refeições, deitado ou ao se curvar, que melhora no sono?",
      "Chiado, falta de ar, aperto no peito, piora à noite, com ar frio ou exercício? (a asma pode ser só tosse)",
      { t: "Contato com tuberculose, HIV, situação de rua ou prisão?", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      { t: "Acessos longos de tosse com guincho ou vômito depois? (coqueluche)", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" }
    ]
  },

  exame: {
    fonte: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006",
    itens: [
      "Nariz e orofaringe: secreção na parede posterior da faringe, mucosa com aspecto 'atapetado', eritema",
      "Ausculta: sibilos (asma), estertores localizados (bronquiectasia), roncos",
      "Baqueteamento digital e halitose (bronquiectasia; baqueteamento também em câncer)",
      { t: "Linfonodos cervicais e supraclaviculares", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      "Peso (perda?), SpO2, sinais de insuficiência cardíaca"
    ]
  },

  naoperder: {
    fonte: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006",
    itens: [
      "No não fumante, com radiografia de tórax normal e sem IECA, a tosse crônica é quase sempre asma, rinossinusite (gotejamento pós-nasal) ou refluxo — e duas podem coexistir",
      "História e exame resolvem a causa em até 70% dos casos; tratar a causa melhora o sintoma na grande maioria",
      "Tosse por IECA: suspender; a melhora pode levar de dias a vários meses",
      { t: "IECA suspenso e trocado: se a tosse persistir por mais de 4 semanas, encaminhar à pneumologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      "No tabagista, parar de fumar é o melhor tratamento da tosse (cerca de 90% melhoram) — e a espirometria define se há DPOC",
      "Tosse e escarro na maioria dos dias, por 3 meses, em 2 anos seguidos, em exposto ao tabaco ou à fumaça: bronquite crônica — espirometria",
      { t: "Sintomático respiratório: o escarro para TB vem antes de tratar empiricamente as outras causas", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      "Antitussígeno alivia pouco e tem dose eficaz perto da tóxica: tratar a doença, não a tosse"
    ]
  },

  ddx: {
    fonte: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006",
    itens: [
      "Gotejamento pós-nasal (rinite, rinossinusite) — obstrução, rinorreia, pigarro, secreção na parede posterior da faringe",
      "Asma, inclusive a variante tosse — tosse seca, piora noturna, ar frio, exercício; PFE variável",
      "Refluxo gastroesofágico — azia, rouquidão, tosse com refeições ou deitado, melhora no sono; mais comum no excesso de peso",
      "IECA — tosse seca e irritativa, em geral nas primeiras semanas de uso",
      "Bronquite crônica e DPOC — tabagista, escarro matinal, dispneia progressiva",
      "Bronquiectasia — escarro purulento em volume, ligado à posição, estertores, baqueteamento",
      "Tuberculose — tosse e expectoração por semanas, febre, sudorese, emagrecimento, hemoptise",
      "Pós-infecciosa — de 3 a 8 semanas depois de infecção de via aérea, sem outra causa ao exame",
      "Bronquite eosinofílica sem asma — tosse com espirometria normal; diagnóstico pelo escarro induzido, na referência",
      { t: "Câncer de pulmão — tabagista com hemoptise, perda de peso ou baqueteamento", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Coqueluche — acessos prolongados de tosse, às vezes com estridor", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Insuficiência cardíaca — dispneia ao esforço, sintoma noturno, edema de tornozelo", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" }
    ]
  },

  exames: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023 · SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006",
    itens: [
      { t: "Radiografia de tórax em todos: normal, desloca a busca para asma, rinossinusite e refluxo; alterada, guia a investigação", f: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006" },
      "Espirometria com broncodilatador",
      "Com tosse produtiva: BAAR em duas amostras de escarro, ou TRM-TB com cultura e teste de sensibilidade (negativo: no mínimo dois exames em dias diferentes)",
      "Com dispneia: eletrocardiograma em repouso",
      { t: "Seios da face: radiografia simples tem valor controverso; a TC é o exame de escolha quando a dúvida persiste", f: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006" },
      { t: "pHmetria só para quem não melhora com o tratamento empírico do refluxo (na referência)", f: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006" },
      { t: "Fluxo local de espirometria e de TRM-TB da USF — confirmar com a equipe", v: true }
    ]
  },

  farmaco: {
    fonte: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023",
    itens: [
      "Tratar a causa; antitussígeno só como paliativo, de preferência à noite",
      { t: "Tosse por IECA: substituir o anti-hipertensivo por outra classe", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Gotejamento pós-nasal por rinite ou rinossinusite crônica: lavagem salina e corticoide nasal", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
      "Suspeita de refluxo: medidas comportamentais e inibidor de bomba de prótons em dose dupla por 2 a 3 meses, como teste empírico (o cartão do omeprazol é do tema digestivo)",
      { t: "Asma variante tosse: corticoide inalatório pelo PCDT Asma — ver a queixa de asma", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      "Tosse pós-infecciosa: em geral cede sozinha em poucas semanas. Bronquite aguda é quase sempre viral e não leva antibiótico; a exceção é macrolídeo na suspeita de coqueluche ou em surto de germe atípico",
      { t: "DPOC: antitussígeno não se prescreve", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Tabagismo: tratamento pelo PCDT do Tabagismo — reposição de nicotina e bupropiona estão nos cartões de psicofármacos", f: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020" }
    ]
  },

  conduta: {
    fonte: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023",
    itens: [
      "Ordem: história e exame, radiografia de tórax, tirar o IECA e o cigarro, depois tratar a causa mais provável",
      { t: "Sintomático respiratório: colher o escarro na hora e seguir a queixa de tuberculose", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      "Radiografia normal: tratamento empírico, em sequência, das causas comuns (gotejamento pós-nasal, asma, refluxo) e reavaliar a resposta de cada um",
      { t: "Encaminhar à pneumologia: investigação inconclusiva na APS e sem resposta ao tratamento empírico das causas comuns (IECA, gotejamento pós-nasal, asma, refluxo, DPOC, tuberculose)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Encaminhar à Cirurgia Torácica: tosse ou dispneia com suspeita de neoplasia na imagem", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "No encaminhamento: tempo de evolução, tabagismo, laudo de imagem e de espirometria, ECG se houver dispneia, resultado do escarro (BAAR ou TRM com cultura) e os tratamentos já feitos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" },
      { t: "Disfonia persistente sem causa (afastadas infecção, abuso da voz, corticoide inalatório e refluxo): otorrino", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" }
    ]
  },

  erros: {
    fonte: "SBPT — II Diretrizes Brasileiras no Manejo da Tosse Crônica, J Bras Pneumol, 2006",
    itens: [
      "Prescrever xarope antitussígeno e não investigar",
      "Não perguntar por IECA e manter o enalapril de quem tosse",
      { t: "Não pedir escarro para TB de quem tosse há 2 semanas ou mais", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
      "Descartar asma porque 'não tem chiado'",
      "Dar antibiótico para tosse que ficou depois de uma virose",
      "Pedir radiografia de seios da face como rotina",
      "Chamar de 'tosse de fumante' sem espirometria",
      { t: "Encaminhar sem radiografia, espirometria e escarro descritos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023" }
    ]
  },

  formulario: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023 · MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    farmacos: [
      { id: "losartana", outra: true, papel: "substituto do IECA quando a tosse é do IECA (mesma indicação: hipertensão)" },
      { id: "budesonida", outra: true, papel: "spray nasal no gotejamento pós-nasal por rinite ou rinossinusite crônica" },
      { id: "beclometasona", papel: "asma variante tosse: corticoide inalatório pelo PCDT Asma" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  scores: ["nota-conferencia"]
});

/* Onda APS II · agente neuro (27/10/2026) — queixa "lombalgia-cervicalgia".
 * Base: Protocolos MS/UFRGS vol. 14 Neurocirurgia 2022 (P1 dor lombar, P2 dor cervical, Quadros 1 e 2,
 * p. 7–10 e 20); CAB nº 28 vol. II §2.12 (p. 116–120); PCDT Dor Crônica 2024 (p. 8, 9, 11, 14, 15);
 * Consenso PIM 2016. Páginas por item no neuro.notas.md. */

QUEIXAS.push({
  id: "lombalgia-cervicalgia",
  nome: "Lombalgia e cervicalgia — sinais de alerta, imagem e quando encaminhar",
  kw: "lombalgia dor lombar dor nas costas coluna lumbago ciatica ciatalgia radiculopatia hernia de disco cervicalgia dor cervical dor no pescoco torcicolo cauda equina estenose de canal claudicacao neurogenica",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Neuromusculoesqueletica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022",
    itens: [
      { t: "Perda de força ou de sensibilidade nas pernas, anestesia em sela, perda do controle da bexiga ou do intestino: cauda equina ou cone medular — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7 e 20" },
      { t: "Fraqueza nos quatro membros ou nas pernas, nível sensitivo, espasticidade, reflexos vivos, Babinski ou Hoffmann, sinal de Lhermitte, perda de esfíncter: compressão medular cervical ou torácica — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 9 e 20" },
      { t: "Perda de força progressiva, medida de forma objetiva — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "Suspeita de infecção na coluna (dor com febre, sobretudo em imunossuprimido ou usuário de droga endovenosa) — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7 e 9" },
      { t: "Câncer conhecido acometendo a coluna, ou trauma recente com suspeita de fratura ou luxação — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7 e 9" },
      { t: "Dor lombar intensa que não cede com tratamento clínico otimizado — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "Dor lombar com massa pulsátil no abdome, acima de 60 anos ou com outra doença aterosclerótica: aneurisma de aorta — ultrassonografia e cirurgia geral (CAB nº 28, p. 118); aneurisma doloroso: confirmar se é urgência", v: true },
      { t: "Para onde remover (SAMU, UPA, regulação da neurocirurgia em Feira de Santana): confirmar o fluxo local", v: true }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022",
    itens: [
      { t: "Onde dói, desde quando, como começou (esforço, trauma), como é, para onde irradia, o que piora e o que alivia", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 116 e 117" },
      { t: "A dor desce para a perna ou para o braço, com formigamento ou fraqueza? (radiculopatia)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 9" },
      { t: "Ao andar ou ficar em pé, dor e dormência nas pernas que só aliviam sentando ou curvando o tronco? (claudicação neurogênica)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "Dor que não tem relação com esforço e repouso, pior à noite, com rigidez de manhã que melhora com o movimento? (inflamatória)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7 e 20" },
      { t: "Febre, perda de peso, câncer prévio, HIV, corticoide crônico, droga injetável, osteoporose?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 117" },
      { t: "Retenção ou perda de urina ou de fezes? Dormência na região da sela?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 20" },
      { t: "Que trabalho faz (carga, movimento repetitivo, postura)? A dor tem relação com o trabalho?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 8" },
      { t: "O que já usou para a dor, em que dose, por quanto tempo e com que resposta — inclusive AINE por conta própria", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 8" },
      { t: "Humor, sono, medo de se mexer, insatisfação no trabalho, desejo de aposentar: fatores que mantêm a dor", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Inspeção: curvatura (lordose, cifose, escoliose), posição antálgica, amplitude de movimento com o teste de Schober", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Palpação: musculatura paravertebral, processos espinhosos, sacroilíacas", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Lasègue: dor irradiada antes de a perna estendida chegar a 60 graus indica acometimento do ciático", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Força (andar nos calcanhares e na ponta dos pés, flexão do tornozelo e do hálux), sensibilidade do pé, reflexos patelar e aquileu", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Na cervicalgia e em todo déficit: nível sensitivo, espasticidade, hiper-reflexia, Babinski, Hoffmann, clônus, Lhermitte; força e atrofia das mãos", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 20" },
      { t: "Abdome: massa pulsátil (aneurisma de aorta)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Ponto-gatilho miofascial: o do glúteo mínimo dá dor nas nádegas e atrás da coxa e da perna, imitando ciatalgia", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 8" }
    ]
  },

  naoperder: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022",
    itens: [
      { t: "Cauda equina com cara de lombalgia comum: perguntar sempre por esfíncter e anestesia em sela", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 20" },
      { t: "Mielopatia cervical: dor no pescoço com mão fraca, atrófica ou com parestesia (síndrome medular central)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 20" },
      { t: "Fratura osteoporótica: uso de corticoide, idade acima de 70 anos, trauma recente", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Neoplasia: câncer prévio, emagrecimento, acima de 50 anos, dor há mais de 4 a 6 semanas, dor noturna em repouso, sem resposta ao tratamento inicial", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Infecção (osteomielite, abscesso): febre, droga endovenosa, infecção bacteriana recente, imunodepressão — inclusive diabetes", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Dor lombar inflamatória (espondiloartrite): pelo menos 4 de 5 — início antes dos 40 anos, insidioso, melhora com exercício, não melhora com repouso, dor noturna que melhora ao levantar", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 20" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Lombalgia mecânica inespecífica (torção, estiramento) — a grande maioria; piora com esforço, melhora com repouso, sem déficit", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 116" },
      { t: "Hérnia de disco com radiculopatia — dor irradiada com parestesia ou fraqueza, Lasègue positivo", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118 e 119" },
      { t: "Compressão radicular ou medular — piora com tosse, espirro, Valsalva e em pé; melhora deitado", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 8" },
      { t: "Estenose de canal lombar — claudicação neurogênica: dor nas pernas ao andar que alivia devagar sentando ou fletindo o tronco", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "Fratura osteoporótica — idoso, corticoide, osteoporose, trauma", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Espondiloartrite — dor inflamatória que começou antes dos 40 anos", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 20" },
      { t: "Metástase ou neoplasia — câncer prévio, emagrecimento, dor noturna em repouso", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Aneurisma de aorta abdominal — massa pulsátil, acima de 60 anos, aterosclerose", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Dor miofascial — ponto-gatilho com dor referida (glúteo mínimo imita ciatalgia)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 8" },
      { t: "Depressão, somatização, conflito no trabalho — mantêm e amplificam a dor", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" }
    ]
  },

  exames: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022",
    itens: [
      { t: "Sem sinal de alerta, não pedir imagem: muita alteração de imagem não tem relação com o mecanismo da dor", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Sinal de alerta sem urgência pede ressonância (de preferência) ou tomografia: início acima de 70 ou abaixo de 20 anos, câncer prévio ou suspeito, imunossupressão (HIV, corticoide crônico), perda de peso ou febre, dor não mecânica ou noturna, osteoporose", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7 e 9" },
      { t: "Na cervicalgia, os mesmos sinais de alerta pedem imagem, exceto a dor não mecânica (que manda à Reumatologia quando crônica)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 9" },
      { t: "O CAB nº 28 (2012) pede raio X lombossacro em PA e perfil na suspeita de tumor, trauma ou infecção, idade abaixo de 20 ou acima de 50 anos, ou dor há mais de 2 meses sem melhora; o protocolo de 2022 usa o corte de 70 anos para a imagem", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Suspeita de câncer: VHS e procurar o sítio primário; suspeita de infecção: hemograma, VHS, urina e ressonância", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 118" },
      { t: "Sinal de alerta e sem acesso a ressonância ou tomografia na APS: encaminhar (Neurocirurgia ou Ortopedia), ou à Medicina Interna se a suspeita é de causa secundária", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7 e 8" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Primeiro o não medicamentoso: manter as atividades e voltar a elas aos poucos; sem repouso no leito", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Analgesia: paracetamol ou dipirona; AINE (ibuprofeno) pelo menor tempo — na lombalgia, ganho modesto com risco gastrointestinal e cardiovascular", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Antidepressivo e anticonvulsivante não superam o placebo na lombalgia sem componente neuropático; tricíclico só com radiculopatia ou sensibilização", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Relaxante muscular só na crise aguda (o CAB nº 28 lista a ciclobenzaprina); na dor crônica o PCDT não recomenda relaxante", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "Opioide só na fase aguda com dor extrema; na dor crônica não oncológica, com parcimônia e reavaliação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Diclofenaco oral e AINE tópico não foram incorporados ao SUS para dor crônica musculoesquelética", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Idoso: relaxante muscular e AINE por tempo prolongado são potencialmente inapropriados", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Calor local como alternativa ao AINE contínuo", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 120" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016",
    farmacos: [
      { id: "paracetamol", papel: "analgesia de base; somado ao AINE, com cautela pelo sangramento gastrointestinal" },
      { id: "dipirona", papel: "analgesia de base, alternativa ao paracetamol" },
      { id: "ibuprofeno", linha: "Adulto — dor (posologia geral", papel: "o AINE da farmácia básica: menor dose pelo menor tempo; não na DRC nem com anticoagulante; evitar uso prolongado no idoso e com AAS em dose baixa" },
      { id: "ciclobenzaprina", linha: "Adulto — lombalgia aguda", papel: "relaxante só na crise aguda; fora da RENAME; inapropriado no idoso" },
      { id: "amitriptilina", outra: true, linha: "Adulto — dor crônica, neuropática", papel: "só com componente neuropático (radiculopatia) ou sensibilização — sem isso, não supera o placebo na lombalgia; não na gravidez (Termo do PCDT)" }
    ],
    combos: [],
    proibidos: ["neu-aine-aas-baixa-dose", "neu-aine-anticoagulante"],
    dosemuda: []
  },

  conduta: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Sem sinal de alerta: explicar que é benigna, manter atividade, analgesia, retorno em 2 e 4 semanas com novo exame da coluna; melhorou, voltar ao trabalho com limitação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 120" },
      { t: "Orientar postura nas atividades do dia (dormir, levantar, sentar, pegar peso, varrer, passar roupa) e oferecer grupo de atividade física ou de práticas integrativas", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 120" },
      { t: "Encaminhar já: cauda equina, déficit neurológico progressivo, déficit grave ou de várias raízes", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 120" },
      { t: "Radiculopatia lombar ou cervical sem melhora após 6 semanas de tratamento otimizado (medicamento, exercício e fisioterapia): Neurocirurgia ou Ortopedia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7 e 9" },
      { t: "Claudicação neurogênica suspeita, ou estenose de canal ou espondilolistese com radiculopatia: Neurocirurgia ou Ortopedia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "Dor crônica (mais de 3 meses) inflamatória: Reumatologia; relacionada ao trabalho: Medicina do Trabalho ou Saúde do Trabalhador", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 8 a 10" },
      { t: "Dor crônica inespecífica sem melhora após 6 meses de tratamento otimizado: serviço de dor (fisiatria); na falta dele, Neurocirurgia ou Ortopedia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 8 a 10" },
      { t: "Cervicalgia com artrite reumatoide definida, ou estenose de canal cervical ou mielopatia não operada: Ortopedia ou Neurocirurgia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 9" },
      { t: "Dor crônica inespecífica: discutir com a equipe multiprofissional (fisioterapeuta, educador físico, psicólogo)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "No encaminhamento: características da dor, exame neurológico, tratamento usado com dose e resposta, imagem com data, imunossupressão, osteoporose, relação com o trabalho", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 8" }
    ]
  },

  erros: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022",
    itens: [
      { t: "Pedir raio X ou ressonância de coluna na lombalgia sem sinal de alerta", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Tratar o laudo ('desgaste', 'abaulamento discal') em vez do paciente", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Prescrever repouso no leito", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 119" },
      { t: "Não perguntar por esfíncter e anestesia em sela", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 20" },
      { t: "Chamar de ciática a dor nas pernas que piora ao andar e alivia sentando — é claudicação neurogênica e pede avaliação de estenose", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "Deixar o idoso no AINE ou no relaxante muscular por meses", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Encaminhar ao especialista antes de 6 semanas de tratamento otimizado, sem sinal de alerta", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" },
      { t: "Dar tricíclico ou gabapentina para lombalgia sem componente neuropático", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" }
    ]
  }
});

/* Onda APS II · agente neuro (27/10/2026) — queixa "ombro-joelho-artrose".
 * Base: PCDT Dor Crônica 2024 (§6.2.1.1, p. 9, 11, 14, 15); TSRS Reumatologia 2022 (P7, P9, Quadros 12
 * e 13, p. 12, 14, 29, 30); Protocolos MS/UFRGS vol. III Reumatologia e Ortopedia 2016 (p. 26–29, 38,
 * 42, 44); TSRS Ortopedia 2016 (P3, P6, P7); Consenso PIM 2016. Não há PCDT de artrose: a de joelho e
 * de quadril está dentro do PCDT Dor Crônica; para o ombro só há protocolo de encaminhamento. */

QUEIXAS.push({
  id: "ombro-joelho-artrose",
  nome: "Ombro, joelho e artrose — dor articular crônica",
  kw: "artrose osteoartrite osteoartrose gonartrose coxartrose joelho quadril ombro manguito rotador tendinite bursite tendinopatia dor articular crepitacao menisco ligamento heberden bouchard",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Neuromusculoesqueletica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016",
    itens: [
      { t: "Trauma com suspeita de fratura ou luxação de joelho, ombro, quadril, tornozelo ou pé: emergência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 27 a 30" },
      { t: "Articulação quente, vermelha e inchada, ou com sintoma constitucional: não é artrose (que é fria e sem sintoma geral) — pensar em gota, artrite inflamatória ou infecção", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" },
      { t: "Artrose atípica — menor de 45 anos sem trauma articular, local incomum (ombro, cotovelo, punho, tornozelo), dor de padrão inflamatório ou perda de peso involuntária: suspeitar de doença inflamatória", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12" },
      { t: "Artrite em 3 ou mais articulações com rigidez matinal acima de 30 minutos ou teste do aperto positivo: alta suspeita de artrite reumatoide", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 38" },
      { t: "Monoartrite sem diagnóstico estabelecido, sobretudo com febre ou mal-estar e fator de risco (acima de 80 anos, diabetes, prótese ou cirurgia articular recente, infecção ou lesão de pele, etilismo, droga endovenosa): suspeita de artrite séptica — pronto-atendimento ou emergência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 8" }
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016",
    itens: [
      { t: "Quais articulações, há quanto tempo, começo insidioso? Piora com a atividade e melhora com o repouso?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" },
      { t: "Rigidez pela manhã ou depois do repouso: quanto tempo dura? (artrose: menos de 30 minutos)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" },
      { t: "Dor à noite? Febre, perda de peso, outras articulações inchadas?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12 e 29" },
      { t: "Psoríase, doença inflamatória intestinal, história familiar de psoríase?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 15 e 38" },
      { t: "Joelho: trauma esportivo, derrame logo depois, bloqueio, falseio, dificuldade para agachar ou ajoelhar?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 44" },
      { t: "Ombro: trauma, luxação prévia (quantas vezes), limitação para elevar o braço?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 28" },
      { t: "Quanto a dor limita o dia: andar, escada, vestir, trabalho", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 27 e 28" },
      { t: "Trabalho com movimento repetitivo ou carga — dor há mais de 3 meses ligada ao trabalho?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 27 e 28" },
      { t: "Usa AAS, corticoide oral, anticoagulante ou ISRS? Já teve úlcera péptica ou sangramento digestivo? (decide o AINE e a gastroproteção)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 30" },
      { t: "O que já tentou: fisioterapia, exercício, analgésico — dose, tempo e resposta", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 27" }
    ]
  },

  exame: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Peso e IMC: com sobrepeso ou obesidade, perder pelo menos 10% do peso trata a artrose de joelho e quadril", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 30" },
      { t: "Inspeção: aumento ósseo, nódulos de Heberden e Bouchard, alinhamento, atrofia muscular", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" },
      { t: "Palpação: sem calor; derrame, se houver, pequeno e frio; dor na interlinha e periarticular", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" },
      { t: "Amplitude: crepitação, perda de movimento, dor à mobilização, fraqueza", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" },
      { t: "Dor à mobilização passiva suave sugere origem articular; à ativa e contra resistência, origem extra-articular (tendão, bursa)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 7" },
      { t: "Joelho: McMurray (menisco); gaveta anterior, Lachman e pivot-shift (ligamento)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 44 a 46" },
      { t: "Mãos: teste do aperto das metacarpofalangeanas (artrite reumatoide); Tinel e Phalen quando houver parestesia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 26 e 44" }
    ]
  },

  naoperder: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016",
    itens: [
      { t: "Artrite psoriásica: psoríase pessoal ou familiar com artrite de interfalangeanas distais, dactilite ou entesite", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 38" },
      { t: "Gota: crise monoarticular, sobretudo na primeira metatarsofalangeana (podagra)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Lesão meniscal: dificuldade de agachar, bloqueio, derrame, dor na interlinha, McMurray positivo", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 44" },
      { t: "Lesão ligamentar: trauma com derrame precoce, instabilidade, gaveta ou Lachman positivos", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 44" },
      { t: "Osteonecrose de quadril: todo caso vai à Ortopedia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 29" },
      { t: "Ruptura total do manguito rotador em exame de imagem: Ortopedia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 28" }
    ]
  },

  ddx: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016",
    itens: [
      { t: "Artrose de joelho — dor com osteófito na radiografia e mais um: idade acima de 40, rigidez abaixo de 30 minutos ou crepitação", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 42" },
      { t: "Artrose de quadril — dor no quadril e 2 de 3: VHS abaixo de 20 mm/h, osteófito, redução do espaço articular", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 42" },
      { t: "Artrose de mão — alargamento ósseo de interfalangeanas e da carpometacarpal do polegar, deformidade", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 42" },
      { t: "Bursite ou tendinite — dor periarticular que piora com o movimento ativo e contra resistência", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 7" },
      { t: "Lesão meniscal ou ligamentar — trauma esportivo, bloqueio, instabilidade", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 44" },
      { t: "Artrite reumatoide ou psoriásica — rigidez matinal longa, sinovite, várias articulações", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 38" },
      { t: "Gota — crise aguda com eritema, dor máxima em menos de 24 horas e resolução em até 14 dias", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Fibromialgia — dor difusa sem sinovite, com fadiga e sono não reparador", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 32" },
      { t: "Dor miofascial — ponto-gatilho com dor referida (gastrocnêmio: panturrilha e planta do pé)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 8" }
    ]
  },

  exames: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Artrose de joelho e de quadril é diagnóstico clínico: sem exame de laboratório de rotina nem análise de líquido sinovial", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Radiografia anteroposterior e perfil com apoio bipodal ajuda no diagnóstico da artrose de joelho e de quadril", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Ressonância não confirma nem guia o tratamento da artrose de joelho e quadril; ultrassonografia não confirma artrose de quadril", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Ultrassonografia para tendão, bursa e partes moles (tendinopatia, tenossinovite)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Suspeita clínica de lesão meniscal ou ligamentar: ressonância do joelho", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 27" },
      { t: "Suspeita de artrite inflamatória: fator reumatoide, PCR ou VHS e radiografia de mãos, punhos e pés", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 9" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Exercício e fisioterapia são o centro: fortalecimento, aeróbico de baixo impacto, alongamento; a artrose de joelho vai à fisioterapia já no diagnóstico", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 11" },
      { t: "Escada do PCDT na artrose de joelho e quadril: paracetamol ou dipirona em horário regular; depois trocar ou somar ibuprofeno; com risco cardiovascular, naproxeno (Componente Especializado)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "AINE na menor dose pelo menor tempo; passou de cinco dias em quem tem história gastrointestinal, somar omeprazol", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Quem toma AAS em dose baixa contínua: paracetamol ou dipirona, sem AINE", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "Não recomendados: condroitina, glucosamina, corticoide ou ácido hialurônico intra-articular", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "AINE tópico e duloxetina: o TSRS 2022 usa, mas o SUS não incorporou nenhum dos dois para dor crônica", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Tricíclico, gabapentina e corticoide sistêmico não são de rotina na artrose", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 30" },
      { t: "Artrose de ombro, fase aguda: AINE, calor úmido por 10 a 15 minutos, pêndulo com peso, evitar elevar o braço acima da cabeça; fase crônica: fortalecimento do manguito rotador", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 30" },
      { t: "Idoso: AINE prolongado é inapropriado, salvo sem alternativa e com gastroprotetor", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016",
    farmacos: [
      { id: "paracetamol", linha: "Adulto — osteoartrite de joelho ou quadril", papel: "primeira linha do PCDT na artrose de joelho e quadril, em horário regular" },
      { id: "dipirona", linha: "Adulto — osteoartrite de joelho ou quadril", papel: "primeira linha alternativa do PCDT, conforme resposta e preferência" },
      { id: "ibuprofeno", linha: "Adulto — osteoartrite de joelho ou quadril", papel: "quando paracetamol ou dipirona não bastam; menor dose, menor tempo; não na DRC, com anticoagulante nem com AAS em dose baixa" },
      { id: "naproxeno", linha: "Adulto — osteoartrite de joelho ou quadril", papel: "o AINE do PCDT para quem tem risco cardiovascular; Componente Especializado, só artrose de joelho ou quadril; não na DRC nem com anticoagulante" },
      { id: "omeprazol", outra: true, linha: "Adulto — gastroproteção com AINE", papel: "gastroproteção: AINE por mais de cinco dias em quem tem história de evento gastrointestinal" }
    ],
    combos: ["neu-aine-omeprazol"],
    proibidos: ["neu-aine-aas-baixa-dose", "neu-aine-anticoagulante"],
    dosemuda: []
  },

  conduta: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016",
    itens: [
      { t: "Artrose de quadril, joelho, tornozelo ou ombro com dor refratária a 6 meses de tratamento otimizado (medicamento, exercício, fisioterapia) ou grande prejuízo nas atividades: Ortopedia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12" },
      { t: "Sem indicação ou condição para cirurgia e sem melhora em 6 meses: serviço de dor (fisiatria, acupuntura)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12" },
      { t: "Suspeita de artrose secundária a artrite inflamatória: Reumatologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12" },
      { t: "Artrose de mão com deformidade e prejuízo funcional, ou dor refratária a 6 meses: Ortopedia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12" },
      { t: "Bursite ou tendinite isolada (exceto suspeita de espondiloartrite) não vai à Reumatologia; Ortopedia se não responder a 4 meses de tratamento otimizado com fortalecimento", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 14" },
      { t: "Suspeita de lesão meniscal ou ligamentar: ressonância; com potencial cirúrgico ou sem acesso à ressonância, Ortopedia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 27" },
      { t: "Ombro: ruptura total do manguito, ruptura parcial em progressão ou com dor refratária, dor refratária a 6 meses, luxação recorrente: Ortopedia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 28" },
      { t: "Dor articular há mais de 3 meses ligada ao trabalho: Medicina do Trabalho ou Saúde do Trabalhador", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 27 e 28" },
      { t: "Casos graves: bengala, muleta ou andador", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 30" },
      { t: "No encaminhamento: IMC, laudo da radiografia com data, tratamento usado com dose e resposta", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12" }
    ]
  },

  erros: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Pedir ressonância para 'confirmar' artrose de joelho ou de quadril", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Infiltrar corticoide ou ácido hialurônico como rotina na artrose de joelho", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "Prescrever condroitina ou glucosamina", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "Dar AINE a quem toma AAS em dose baixa", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "Manter o idoso no AINE contínuo, sem gastroproteção", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Encaminhar ao ortopedista sem 6 meses de tratamento otimizado, sem fisioterapia nem exercício", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 12" },
      { t: "Chamar de artrose a articulação quente e inchada", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" },
      { t: "Mandar bursite ou tendinite isolada para a Reumatologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 14" }
    ]
  },

  scores: ["imc"]
});

/* Onda APS II · agente neuro (27/10/2026) — queixa "gota".
 * Não há PCDT nem documento clínico do MS para gota. Base: TSRS Reumatologia 2022 (P6, p. 11; Quadro 11,
 * critério ACR/EULAR 2015, p. 28); Protocolos MS/UFRGS vol. III 2016 (§1.5, p. 14; Quadro 8, p. 41);
 * SBR/SBPC-ML 2024 (meta de ácido úrico); PCDT Dor Crônica 2024 (AINE); RENAME 2024 (colchicina fora).
 * O tratamento da crise (esquema e dose) não tem fonte brasileira na pasta: sai VERIFICAR. */

QUEIXAS.push({
  id: "gota",
  nome: "Gota — crise, ácido úrico e quando encaminhar",
  kw: "gota acido urico hiperuricemia podagra artrite gotosa crise de gota tofo alopurinol colchicina monoartrite urato",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Neuromusculoesqueletica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Monoartrite sem diagnóstico estabelecido, sobretudo com febre ou mal-estar e fator de risco (acima de 80 anos, diabetes, prótese ou cirurgia articular recente, infecção ou lesão de pele, etilismo, droga endovenosa): suspeita de artrite séptica — pronto-atendimento ou emergência, antes de chamar de gota", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 8" },
      { t: "Gota com doença renal crônica estágio 4 ou 5 (TFG abaixo de 30): Medicina Interna ou Nefrologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Tofo com infecção recorrente, compressão por efeito de massa ou deformidade com prejuízo funcional, sem melhora com o tratamento otimizado: Ortopedia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Gota em jovem ou em mulher antes da menopausa: origem incerta da hiperuricemia — Medicina Interna ou Nefrologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" }
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Qual articulação? Primeira metatarsofalangeana (podagra), tornozelo ou médio pé?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "A dor chegou ao máximo em menos de 24 horas? Resolveu em até 14 dias? Ficou totalmente bem entre as crises?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Vermelhidão, não suporta toque nem pressão, não consegue andar ou usar a articulação?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Quantas crises no último ano?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Nódulos em orelha, cotovelo, polpa dos dedos, tendão de Aquiles (tofos)?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Doença renal conhecida? Já fez creatinina?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Todos os medicamentos em uso — alguns sobem o ácido úrico", f: "SBR/SBPC-ML — Recomendação para o laudo de ácido úrico no tratamento da gota, Adv Rheumatol, 2024" },
      { t: "Já usa alopurinol? Desde quando, em que dose, toma certo? Tem tido crise?", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Idade e, na mulher, se já está na menopausa (muda o encaminhamento)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" }
    ]
  },

  exame: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Articulação: eritema, edema, calor, dor ao toque e à pressão", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Quantas articulações: mono ou oligoarticular é o padrão da crise", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 41" },
      { t: "Tofos: nódulos subcutâneos com material de giz sob a pele, drenando ou não, em articulações, orelhas, bursa do olécrano, polpas digitais e tendões", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" }
    ]
  },

  naoperder: {
    fonte: "SBR/SBPC-ML — Recomendação para o laudo de ácido úrico no tratamento da gota, Adv Rheumatol, 2024",
    itens: [
      { t: "Ácido úrico normal na crise não descarta gota: vale o maior valor, e o ideal é repetir fora da crise (mais de 4 semanas) e sem hipouricemiante", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Hiperuricemia é ácido úrico acima da solubilidade do urato (em geral 6,8 mg/dL); por isso a meta de quem trata gota é abaixo de 6 mg/dL" },
      { t: "Doença renal crônica, síndrome metabólica e fármacos hiperuricemiantes aumentam a gota" },
      { t: "Cristal de urato no líquido sinovial ou no tofo fecha o diagnóstico", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Tofo é gota crônica: a meta passa a ácido úrico abaixo de 5 mg/dL", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 14" }
    ]
  },

  ddx: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016",
    itens: [
      { t: "Artrite séptica — monoartrite sem diagnóstico, com febre ou fator de risco (diabetes, prótese, droga endovenosa, acima de 80 anos): emergência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 8" },
      { t: "Artrite reumatoide — 3 ou mais articulações com sinovite, rigidez matinal acima de 30 minutos, teste do aperto positivo", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 38" },
      { t: "Artrite psoriásica — psoríase, dactilite, interfalangeanas distais, entesite", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 38" },
      { t: "Artrose — dor mecânica, sem calor, rigidez curta, evolução de anos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 29" }
    ]
  },

  exames: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Ácido úrico sérico: abaixo de 4 mg/dL tira pontos; 6 a menos de 8, 8 a menos de 10 e 10 ou mais somam no critério ACR/EULAR 2015", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Classificação de gota: 8 pontos ou mais no critério ACR/EULAR 2015, depois de ao menos um episódio de dor, edema ou sensibilidade articular ou em bursa", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Creatinina com TFG (CKD-EPI): muda a conduta e o encaminhamento", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Líquido sinovial com cristal de urato é critério suficiente; sem cristal, tira pontos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Radiografia de mãos ou pés com erosão, ou ultrassonografia com depósito de urato, somam pontos (sem imagem, conta zero)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Em tratamento: o laudo do ácido úrico deve lembrar a meta abaixo de 6 mg/dL", f: "SBR/SBPC-ML — Recomendação para o laudo de ácido úrico no tratamento da gota, Adv Rheumatol, 2024" }
    ]
  },

  farmaco: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · RENAME 2024",
    itens: [
      { t: "Colchicina não está na RENAME 2024: a UBS não dispensa", f: "RENAME 2024" },
      { t: "Crise: anti-inflamatório (o ibuprofeno é o da farmácia básica) ou corticoide — esquema e dose da crise de gota sem fonte brasileira conferida na pasta", v: true },
      { t: "Tratamento otimizado antes de encaminhar: profilaxia das crises com colchicina (se contraindicada, AINE ou corticoide em dose baixa) mais alopurinol, até o teto do cartão", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Meta: ácido úrico abaixo de 6 mg/dL em quem trata gota", f: "SBR/SBPC-ML — Recomendação para o laudo de ácido úrico no tratamento da gota, Adv Rheumatol, 2024" },
      { t: "Estável, sem crise e aderente: não mudar o esquema só porque o ácido úrico está fora do alvo", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Dose inicial e titulação do alopurinol, e quando começá-lo em relação à crise: sem fonte brasileira datada na pasta", v: true },
      { t: "Doença renal crônica: evitar AINE na crise — o PCDT de DRC manda evitar nefrotóxicos, AINE à frente", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024, p. 8" },
      { t: "Naproxeno contraindicado com depuração de creatinina abaixo de 30; o ibuprofeno causa nefrite intersticial e disfunção renal", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 21 e 34" },
      { t: "Idoso: colchicina por tempo prolongado é inapropriada quando o alopurinol não está contraindicado — o alopurinol é o profilático de primeira escolha", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" }
    ]
  },

  formulario: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022 · SBR/SBPC-ML — Recomendação para o laudo de ácido úrico no tratamento da gota, Adv Rheumatol, 2024 · MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · RENAME 2024",
    farmacos: [
      { id: "alopurinol", papel: "hipouricemiante da farmácia básica: base do tratamento da gota recorrente, com a meta de ácido úrico abaixo de 6 mg/dL" },
      { id: "ibuprofeno", papel: "AINE da farmácia básica, já que a colchicina não está na RENAME — não há esquema de crise de gota com fonte na pasta (ver VERIFICAR do farmaco); não na DRC, com anticoagulante nem com AAS em dose baixa" }
    ],
    combos: [],
    proibidos: ["neu-aine-anticoagulante"],
    dosemuda: []
  },

  conduta: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "3 ou mais crises no ano apesar de tratamento otimizado e boa adesão: Reumatologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Origem incerta da hiperuricemia (jovem, mulher antes da menopausa) ou DRC 4 e 5 (TFG abaixo de 30): Medicina Interna ou Nefrologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Gota tofácea com complicação do tofo e sem melhora com tratamento otimizado: Ortopedia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "O protocolo MS de 2016 mandava à Nefrologia toda gota com TFG abaixo de 60, e à Clínica Médica ou Reumatologia quem segue fora do alvo apesar de tratamento e adesão; o TSRS 2022 fala em DRC 4 e 5 — combinar com a regulação local", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. III: Reumatologia e Ortopedia, 2016, p. 14" },
      { t: "Pedir ácido úrico e creatinina com TFG e reavaliar o ácido úrico até a meta", f: "SBR/SBPC-ML — Recomendação para o laudo de ácido úrico no tratamento da gota, Adv Rheumatol, 2024" },
      { t: "No encaminhamento: artrite e tofo, crises no ano, ácido úrico e creatinina com data, tratamentos com dose e posologia, outros medicamentos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" }
    ]
  },

  erros: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Descartar gota porque o ácido úrico da crise veio normal", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 28" },
      { t: "Mexer no alopurinol de quem está estável e sem crise só pelo número do ácido úrico", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Prescrever colchicina sem avisar que a UBS não tem", f: "RENAME 2024" },
      { t: "Encaminhar à Reumatologia antes do tratamento otimizado", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" },
      { t: "Dar AINE na crise sem olhar a TFG", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 34" },
      { t: "Pedir ácido úrico sem creatinina e TFG", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 11" }
    ]
  },

  scores: ["ckdepi"]
});

/* Onda APS II · agente neuro (27/10/2026) — queixa "dor-cronica-fibromialgia".
 * Base: PCDT Dor Crônica 2024 (Portaria Conjunta nº 1, revoga o PCDT de 2012): diagnóstico p. 3–9,
 * tratamento p. 10–15; SBR 2026 partes I e II (HTML, sem página), que substituem o consenso SBR 2010;
 * TSRS Reumatologia 2022 (P8, Quadros 14 e 15, p. 13, 32, 33); TSRS Tratamento da Dor 2020 (P1, P11).
 * Divergência SUS × SBR dita no texto: a SBR recomenda duloxetina e pregabalina (não incorporadas) e não
 * recomenda a gabapentina (que o SUS dá pelo Componente Especializado). */

QUEIXAS.push({
  id: "dor-cronica-fibromialgia",
  nome: "Dor crônica e fibromialgia — tipo de dor, o que o SUS tem e quando encaminhar",
  kw: "dor cronica fibromialgia dor no corpo todo dor difusa dor generalizada nociplastica neuropatica nociceptiva dn4 sono fadiga amitriptilina ciclobenzaprina duloxetina pregabalina gabapentina",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Neuromusculoesqueletica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Febre, perda de peso ou outro sintoma constitucional na dor crônica: investigar doença metabólica, neoplásica, infecciosa, inflamatória ou psiquiátrica", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 7" },
      { t: "Dor noturna que acorda e obriga a levantar para melhorar: suspeitar de dor inflamatória ou oncológica", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 6" },
      { t: "Risco alto de suicídio, abstinência com risco de agressão, ou intoxicação por analgésico ou outra substância com instabilidade ou rebaixamento: urgência", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "Suspeita de doença articular inflamatória em quem parece ter fibromialgia: Reumatologia", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 13" },
      { t: "Dor na coluna com sinal de compressão (cauda equina, déficit progressivo): urgência — ver Lombalgia e cervicalgia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" }
    ]
  },

  perguntas: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Há quanto tempo dói? Mais de 3 meses é dor crônica", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 4" },
      { t: "Onde dói — marcar no diagrama do corpo: difusa, localizada ou no trajeto de um nervo?", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 4" },
      { t: "Como é a dor: queimação, choque, formigamento, agulhada (neuropática); peso, aperto, pontada, latejamento (nociceptiva); peso, tensão e dolorimento difuso (nociplástica)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 4 e 5" },
      { t: "Intensidade numa escala (numérica, de faces ou descritores verbais — no idoso, numérica ou verbal) e quanto limita casa, trabalho e lazer", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 4" },
      { t: "Sono: reparador? Acorda à noite? Ronco, pausas, pernas inquietas?", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 6" },
      { t: "Fadiga, dificuldade de memória e de concentração, cefaleia, cólica abdominal (fibromialgia)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 32" },
      { t: "Humor: anedonia, ansiedade, pensamento catastrófico, ideação suicida", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 7" },
      { t: "Álcool, tabaco, outras drogas, abuso prévio de medicamento; o que já usou e com que resultado", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 4 e 7" },
      { t: "O que espera do tratamento e o que acha que causa a dor; litígio ou benefício em jogo", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 4" },
      { t: "Violência doméstica ou sexual, discriminação, trabalho e renda: também se expressam como dor", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 3 e 4" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Musculoesquelético: postura, marcha, amplitude articular, sinovite (edema, calor)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 7" },
      { t: "Palpar músculos atrás de ponto-gatilho, banda tensa e dor referida (dor miofascial)", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 7 e 8" },
      { t: "Neurológico: força de 0 a 5, sensibilidade tátil, térmica, dolorosa e vibratória (diapasão de 128 Hz), reflexos", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 8" },
      { t: "DN4 e LANSS para separar dor neuropática de nociceptiva", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" },
      { t: "Fibromialgia: contar as regiões que doeram na última semana (índice de dor generalizada, 0 a 19) e somar a gravidade de fadiga, sintomas cognitivos e sono não reparador (escala de gravidade, 0 a 12)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 32" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Depressão e ansiedade: comuns na dor crônica e a mantêm — rastrear", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 7" },
      { t: "Dor neuropática exige lesão do sistema nervoso com distribuição plausível e demonstrada; não rotular sem exame neurológico", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" },
      { t: "Fibromialgia não exclui outra doença: o diagnóstico vale mesmo com outros diagnósticos", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 32" },
      { t: "Mecanismos coexistem e se retroalimentam (nociplástico com nociceptivo): tratar cada componente", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" },
      { t: "Pseudodependência: dor subtratada que leva a pedir mais analgésico — diferente de dependência de opioide", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" }
    ]
  },

  ddx: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Dor nociceptiva — profunda, em peso, pontada; lombar ou cervical mecânica, tendinopatia, artrose", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" },
      { t: "Dor neuropática — superficial, queimação, choque, formigamento; neuropatia diabética, pós-herpética, radiculopatia", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" },
      { t: "Dor nociplástica — difusa, com hipersensibilidade em tecido sem lesão; fibromialgia, lombalgia crônica inespecífica", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" },
      { t: "Doença inflamatória (artrite reumatoide, espondilite, gota) — rigidez matinal de uma hora ou mais, dor que piora no repouso e à noite, sinovite", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 6" },
      { t: "Dor miofascial — ponto-gatilho com banda tensa e dor referida à distância", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" },
      { t: "Transtorno psiquiátrico predominante (inclusive sintomas somáticos) — CAPS ou Psiquiatria se não responder na APS", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" }
    ]
  },

  exames: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024",
    itens: [
      { t: "Exame complementar só por critério clínico: muita alteração de imagem não tem relação com a dor", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Conforme a suspeita: hemograma, VHS e PCR, glicemia e HbA1c, lipídios, função renal e hepática, eletrólitos, vitamina D, PTH, FAN, fator reumatoide, eletroforese de proteínas, TSH e T4 livre, CPK", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Má absorção, alcoolismo, desnutrição ou anemia: ferro, ferritina, transferrina, ácido fólico e vitamina B12", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Fibromialgia é diagnóstico clínico: índice de dor generalizada 7 ou mais com gravidade 5 ou mais (ou índice 4 a 6 com gravidade 9 ou mais), dor em 4 de 5 regiões, há 3 meses ou mais", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 32" },
      { t: "No seguimento da fibromialgia, um questionário padronizado validado em português (FIQR ou FSQ)", f: "SBR — Diretrizes de tratamento da fibromialgia, parte I, Adv Rheumatol, 2026" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · SBR — Diretrizes de tratamento da fibromialgia, parte II (farmacológico), Adv Rheumatol, 2026",
    itens: [
      { t: "Exercício é o eixo da fibromialgia: aeróbico de intensidade moderada ao menos 2 vezes por semana, 30 a 60 minutos, mais fortalecimento — juntos valem mais que um só", f: "SBR — Diretrizes de tratamento da fibromialgia, parte I, Adv Rheumatol, 2026" },
      { t: "Terapia cognitivo-comportamental e acupuntura têm recomendação na fibromialgia", f: "SBR — Diretrizes de tratamento da fibromialgia, parte I, Adv Rheumatol, 2026" },
      { t: "Amitriptilina: o fármaco do SUS que a SBR 2026 recomenda na fibromialgia; os outros tricíclicos não têm evidência para ela", f: "SBR — Diretrizes de tratamento da fibromialgia, parte II (farmacológico), Adv Rheumatol, 2026" },
      { t: "Divergência: a SBR 2026 recomenda duloxetina e pregabalina, mas o SUS não incorporou nenhuma das duas para fibromialgia nem dor neuropática — fora da farmácia", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14 e 15" },
      { t: "Divergência: a gabapentina sai pelo SUS (Componente Especializado, com LME) e o PCDT cita gabapentinoides na dor nociplástica, mas a SBR 2026 não a recomenda na fibromialgia (evidência insuficiente)", f: "SBR — Diretrizes de tratamento da fibromialgia, parte II (farmacológico), Adv Rheumatol, 2026" },
      { t: "Ciclobenzaprina em dose baixa ao deitar: a SBR recomenda na fibromialgia com distúrbio do sono; o PCDT não recomenda relaxante muscular na dor crônica", f: "SBR — Diretrizes de tratamento da fibromialgia, parte II (farmacológico), Adv Rheumatol, 2026" },
      { t: "Sem recomendação na fibromialgia: AINE, opioide (inclusive tramadol), ISRS isolado, benzodiazepínico; analgésico simples pode ficar se ajuda a manter a atividade", f: "SBR — Diretrizes de tratamento da fibromialgia, parte II (farmacológico), Adv Rheumatol, 2026" },
      { t: "Tramadol: o TSRS 2022 o lista na analgesia da fibromialgia; a SBR 2026 não o recomenda e o PCDT de Dor Crônica não o incorporou", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 33" },
      { t: "Dor neuropática: tricíclico, gabapentina ou carbamazepina conforme a causa — ver Neuropatia periférica", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "Dor crônica não oncológica: opioide com parcimônia; codeína, tramadol e morfina em dose baixa não foram incorporados para essa indicação", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Muitas vezes é preciso somar duas ou três classes: a combinação permite doses menores com menos efeito adverso", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14 e 15" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · SBR — Diretrizes de tratamento da fibromialgia, parte II (farmacológico), Adv Rheumatol, 2026 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    farmacos: [
      { id: "amitriptilina", linha: "Adulto — fibromialgia", papel: "primeira escolha na fibromialgia, à noite: melhora dor e sono; o tricíclico da farmácia básica — dose de dor, não a antidepressiva; contraindicada na gravidez pelo Termo do PCDT" },
      { id: "ciclobenzaprina", linha: "Adulto — fibromialgia", papel: "dose baixa ao deitar quando o sono é o problema; fora da RENAME; inapropriada no idoso" },
      { id: "duloxetina", outra: true, linha: "Adulto — fibromialgia", papel: "recomendada pela SBR 2026, mas não incorporada ao SUS — a família compra; nunca com IMAO" },
      { id: "gabapentina", linha: "Adulto — fibromialgia", papel: "o SUS dá pelo Componente Especializado (LME); a SBR 2026 não recomenda na fibromialgia" },
      { id: "paracetamol", papel: "analgesia simples: pode ficar se ajuda a manter a atividade; não trata a fibromialgia" },
      { id: "dipirona", papel: "analgesia simples, mesma ressalva do paracetamol" }
    ],
    combos: [],
    proibidos: ["isrs-triciclico-imao"],
    dosemuda: ["dm-amitriptilina"]
  },

  conduta: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022",
    itens: [
      { t: "Combinar metas realistas: reduzir a dor a nível aceitável e ganhar função e autonomia — muitas vezes não dá para zerar", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 10" },
      { t: "Fibromialgia: explicar que é doença real e benigna, que o sucesso depende também do paciente (educação, exercício, sono) e que a dor pode piorar um pouco ao começar o exercício", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 33" },
      { t: "Evitar repouso absoluto e manter as atividades habituais tanto quanto possível", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 11" },
      { t: "Plano com a equipe multiprofissional e práticas corporais da UBS e do Programa Academia da Saúde; práticas integrativas como complemento, sem parar o remédio", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 12" },
      { t: "Higiene do sono orientada por qualquer profissional da equipe", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 33" },
      { t: "Fibromialgia sem resposta satisfatória a 6 meses de tratamento otimizado (não medicamentoso e medicamentoso): equipe de tratamento da dor", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 13" },
      { t: "Dor neuropática refratária a dois fármacos em dose otimizada: Tratamento da Dor", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "Transtorno psiquiátrico predominante sem resposta na APS: CAPS ou Psiquiatria; dor refratária com uso problemático de opioide: Tratamento da Dor", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "No retorno, reavaliar dor, sono, função e humor com a mesma escala", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 4" }
    ]
  },

  erros: {
    fonte: "SBR — Diretrizes de tratamento da fibromialgia, parte II (farmacológico), Adv Rheumatol, 2026",
    itens: [
      "Prescrever AINE, opioide ou benzodiazepínico para fibromialgia",
      { t: "Prescrever duloxetina ou pregabalina sem avisar que o SUS não dá", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Pedir exame atrás de exame para achar a causa da fibromialgia", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "Tratar só com remédio, sem exercício", f: "SBR — Diretrizes de tratamento da fibromialgia, parte I, Adv Rheumatol, 2026" },
      { t: "Anotar depressão tratada com amitriptilina em dose de dor", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023, p. 162" },
      { t: "Encaminhar fibromialgia ao reumatologista sem suspeita de doença inflamatória", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022, p. 13" },
      { t: "Orientar repouso e afastamento prolongado da atividade", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 11" }
    ]
  },

  scores: ["phq9", "gad7"]
});

/* Onda APS II · agente neuro (27/10/2026) — queixa "cefaleia".
 * Base: Protocolos MS/UFRGS vol. 16 Neurologia 2022 (P1, p. 7; Quadros 1 e 2, p. 19); vol. 14
 * Neurocirurgia 2022 (P7, p. 15); TSRS Resumo clínico Cefaleia 2016 (critérios, Quadros 1–4, Tabelas 1–2);
 * SBCe crise migranosa 2016 e profilaxia parte I 2022 (HTML/artigo, sem página); CAB nº 28 vol. II §2.2
 * (p. 29–38: meningite, sinusite, medidas gerais); TSRS Tratamento da Dor 2020 (P6, neuralgia do trigêmeo);
 * RENAME 2024 (nenhum triptano; topiramato só pelo PCDT Epilepsia). */

QUEIXAS.push({
  id: "cefaleia",
  nome: "Cefaleia — sinais de alerta, crise e profilaxia",
  kw: "cefaleia dor de cabeca enxaqueca migranea aura cefaleia tensional cefaleia tipo tensao profilaxia abuso de analgesico salvas neuralgia do trigemeo arterite temporal hemorragia subaracnoidea meningite",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Neuromusculoesqueletica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Início súbito e muito forte ('a pior dor de cabeça da vida'): hemorragia subaracnoide — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Febre, mialgia, petéquias, confusão ou rigidez de nuca: meningite — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Até a remoção da suspeita de meningite: máscara no paciente, sala isolada, máscara em quem chegar a menos de 1 metro; acionar o SAMU e a vigilância epidemiológica", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 32" },
      { t: "Sinal neurológico focal, edema de papila, alteração de consciência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Cefaleia que começou após trauma de crânio recente", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Cefaleia com crise convulsiva: meningite ou encefalite (com febre e rigidez de nuca), malformação arteriovenosa ou processo expansivo (dor sempre do mesmo lado) — urgência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 32 e 38" },
      { t: "Acima de 50 anos com padrão novo, dor e edema da artéria temporal, mialgia ou VSG alto: arterite temporal", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Padrão novo em pessoa com HIV, câncer, anticoagulante ou discrasia sanguínea", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Crise hipertensiva com confusão mental; olho vermelho com pupila fixa em média midríase (glaucoma agudo)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Evolução progressiva com ápice em poucos dias", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Crise de migrânea de mais de 72 horas, refratária (estado de mal migranoso)", f: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016" },
      { t: "Dor forte que não cede com o analgésico dado na própria UBS: urgência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 38" },
      { t: "Fluxo de remoção (SAMU, UPA, neurologia de referência) e se a USF faz analgesia parenteral: confirmar na unidade", v: true }
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016",
    itens: [
      "Desde quando, como começa (súbito ou insidioso), quanto dura cada crise, quantas por mês",
      "Onde dói, como é (latejante ou em aperto), intensidade e se impede as atividades",
      "Náusea, vômito, incômodo com luz e barulho; aura visual, sensitiva ou de fala antes da dor",
      "Gatilhos: estresse, privação de sono, jejum, álcool, cafeína, menstruação, medicamento, alimento",
      "Quantos dias por semana usa analgésico? Duas ou mais vezes por semana já sugere cefaleia por abuso",
      { t: "O padrão mudou? A dor acorda? Piora com esforço, tosse, relação sexual ou Valsalva?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      "Usa contraceptivo com estrogênio? (migrânea com aura, ou acima de 35 anos, contraindica)",
      "Lacrimejamento, olho vermelho, nariz entupido ou escorrendo do mesmo lado da dor? (trigêmino-autonômica)",
      { t: "Comorbidades que mudam o tratamento: hipertensão, ansiedade e depressão", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      "Já fez profilaxia? Com quê, por quanto tempo, em que dose?"
    ]
  },

  exame: {
    fonte: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016",
    itens: [
      "PA e temperatura",
      { t: "Fundo de olho (papiledema) e rigidez de nuca", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 31" },
      "Estado mental, pares cranianos (acuidade e campo visual, pupilas, sensibilidade e simetria da face), dedo-nariz, Romberg, Babinski",
      "Acima de 50 anos: palpar a artéria temporal superficial",
      "Palpar musculatura cervical e do crânio (hipertonia, pontos dolorosos) e a articulação temporomandibular",
      "Otoscopia, oroscopia e seios da face se houver sintoma associado"
    ]
  },

  naoperder: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Cefaleia por abuso de analgésico: transforma a migrânea ou a tensional em dor quase diária", f: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016" },
      { t: "Início súbito quer dizer dor no máximo em até 1 minuto", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      { t: "Dor que acorda o paciente, ou disparada por esforço, tosse, coito ou Valsalva: pede imagem", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      { t: "Aura persistente ou prolongada; dor que aparece ou some com a mudança de posição; dor sempre do mesmo lado ou só occipital", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      { t: "Meningite é de notificação compulsória; a vigilância indica a quimioprofilaxia (rifampicina) só para contatos íntimos de doença meningocócica e de meningite por Haemophilus", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 33" },
      { t: "Migrânea com aura e contraceptivo com estrogênio: mais risco de AVC", f: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016" },
      { t: "Sinusite com celulite periorbitária: encaminhar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 33" },
      { t: "Suspeita de neuralgia do trigêmeo: ressonância de crânio em todos", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" }
    ]
  },

  ddx: {
    fonte: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016",
    itens: [
      "Migrânea sem aura — crises de 4 a 72 h, unilateral, pulsátil, moderada a forte, piora com atividade, com náusea ou foto e fonofobia",
      "Migrânea com aura — sintoma visual, sensitivo ou de fala reversível, de 5 a 60 minutos, antes ou junto da dor",
      "Cefaleia tipo tensão — bilateral, em aperto, leve a moderada, não piora com atividade, sem náusea",
      "Cefaleia por abuso de analgésico — dor que virou crônica em quem usa analgésico com frequência",
      { t: "Cefaleia em salvas (trigêmino-autonômica) — lancinante, em crises de cerca de 30 minutos, periorbitária, com lacrimejamento, congestão e rinorreia do mesmo lado; homem de 30 a 60 anos; álcool e nitrato desencadeiam", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 32" },
      { t: "Sinusite — dor frontal e retro-orbitária, em pressão ou latejante, que piora ao mexer a cabeça", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 33" },
      { t: "Hipertensão intracraniana ou tumor — dor contínua e progressiva, vômito em jato sem náusea, sinal focal", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 31 e 32" },
      { t: "Neuralgia do trigêmeo — dor lancinante, paroxística, em choque, no território do nervo", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      "Dor da articulação temporomandibular ou de infecção de vias aéreas — causas simples e frequentes"
    ]
  },

  exames: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Cefaleia primária típica, sem sinal de alerta: o diagnóstico é clínico — sem imagem", f: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016" },
      { t: "Imagem sem urgência (ressonância ou tomografia de crânio): padrão novo ou mudança recente, início acima de 50 anos, piora progressiva em semanas ou meses, dor que acorda, dor de esforço, tosse, coito ou Valsalva", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      { t: "VSG na suspeita de arterite temporal", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 19" },
      { t: "Diário de cefaleia: frequência, intensidade, duração e uso de analgésico — para diagnosticar e para acompanhar", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" }
    ]
  },

  farmaco: {
    fonte: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016 · SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016",
    itens: [
      { t: "Toda crise de migrânea deve ser tratada, de preferência cedo; repouso em lugar calmo, ventilado e com pouca luz", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      "Crise leve a moderada, migrânea ou tensional: analgésico simples ou AINE; dor forte: analgesia endovenosa ou triptano",
      { t: "Antiemético (metoclopramida) antes do analgésico, mesmo sem náusea; não usar com sedação intensa ou história de distonia", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 34" },
      { t: "Triptano: nenhum na RENAME 2024; contraindicado na cardiopatia isquêmica e no AVC isquêmico, e não se usa com derivado ergótico", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      "Opioide não está indicado na cefaleia",
      { t: "Analgésico em poucos dias por semana: duas ou mais vezes por semana já sugere abuso; o CAB nº 28 limita a três vezes por semana", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 37" },
      "Profilaxia se: interfere no dia a dia apesar da crise tratada, mais de uma crise por semana, uso excessivo de analgésico, abortivo ineficaz ou contraindicado, preferência, ou migrânea hemiplégica, basilar ou com aura prolongada",
      "Profilaxia na APS: tricíclico em dose baixa (tensional e migrânea); betabloqueador ou anticonvulsivante (migrânea)",
      { t: "Topiramato só sai pelo Componente Especializado do PCDT Epilepsia — não para enxaqueca", f: "RENAME 2024" },
      { t: "Ácido valproico na profilaxia: categoria X na gestação — evitar na mulher que pode engravidar", f: "SBCe — Consenso para o tratamento profilático da migrânea episódica, parte I, Arq Neuropsiquiatr, 2022" },
      "Reavaliar a profilaxia em 30 dias: sem melhora substancial, trocar de classe; melhora parcial, manter cerca de 3 meses",
      "Abuso de analgésico: começar a profilaxia e suspender o analgésico por cerca de uma semana (AINE fixo ou corticoide curto nesse período)",
      "Migrânea menstrual pura abaixo de 35 anos: contraceptivo combinado contínuo de baixa dose é opção de profilaxia; com aura ou acima de 35 anos, estrogênio contraindicado",
      { t: "Neuralgia do trigêmeo: carbamazepina é a primeira linha", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" }
    ]
  },

  formulario: {
    fonte: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016 · SBCe — Consenso para o tratamento profilático da migrânea episódica, parte I, Arq Neuropsiquiatr, 2022 · SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025",
    farmacos: [
      { id: "dipirona", linha: "Adulto — crise de migrânea", papel: "crise leve a moderada, da farmácia básica" },
      { id: "paracetamol", linha: "Adulto — crise de migrânea", papel: "crise leve a moderada; boa opção no idoso e em quem não pode usar AINE" },
      { id: "ibuprofeno", linha: "Adulto — crise de cefaleia", papel: "AINE da farmácia básica na crise leve a moderada; não na DRC nem com anticoagulante" },
      { id: "metoclopramida", papel: "antiemético antes do analgésico, mesmo sem náusea; não usar com sedação intensa ou distonia prévia — o cartão não tem linha própria de cefaleia" },
      { id: "amitriptilina", outra: true, linha: "Adulto — profilaxia de migrânea", papel: "profilaxia da tensional e da migrânea em dose baixa à noite — não é a dose antidepressiva; o PCDT de Dor Crônica contraindica na gravidez e a SBCe 2022 na amamentação" },
      { id: "propranolol", outra: true, linha: "Adulto — profilaxia de migrânea", papel: "profilaxia da migrânea; não na asma, na DPOC e em quem tende à hipoglicemia" },
      { id: "carbamazepina", outra: true, linha: "Adulto — neuralgia do trigêmeo", papel: "neuralgia do trigêmeo, primeira linha; indutora enzimática — derruba o contraceptivo oral" }
    ],
    combos: [],
    proibidos: ["mul-estrogenio-enxaqueca-aura", "mul-hormonal-oral-indutor", "neu-aine-anticoagulante"],
    dosemuda: ["dm-amitriptilina"]
  },

  conduta: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Sinal de alerta de urgência: remover (SAMU, UPA)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      { t: "Sinal de alerta sem urgência: pedir tomografia ou ressonância de crânio; sem acesso na APS, Neurologia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      { t: "Imagem com lesão expansiva, tumor, aneurisma ou malformação vascular, hidrocefalia ou Chiari: Neurocirurgia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7 e 19" },
      { t: "Migrânea refratária a duas classes de profilaxia, ou tensional refratária a tricíclico, por ao menos 3 meses: Neurologia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      { t: "Outra cefaleia primária que não é migrânea nem tensional (trigêmino-autonômica): Neurologia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      { t: "Neuralgia do trigêmeo: Neurologia ou Tratamento da Dor (sem ressonância na APS, Neurologia)", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "Medidas gerais: evitar o gatilho, tratar hipertensão e depressão, atividade física moderada, sono regular; educar sobre a doença e o automanejo da crise", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 33 e 34" },
      { t: "Ao liberar da crise: voltar se a dor retornar, piorar ou mudar, febre, vômito, tontura, desequilíbrio, alteração visual, motora ou da fala", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      { t: "No encaminhamento: idade de início, evolução, frequência, exame neurológico, comorbidades, tratamentos com dose e posologia, imagem com data", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" }
    ]
  },

  erros: {
    fonte: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016",
    itens: [
      { t: "Prescrever codeína ou tramadol para enxaqueca", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      "Não perguntar quantos dias por semana o paciente toma analgésico",
      { t: "Pedir tomografia de crânio para cefaleia primária típica sem sinal de alerta", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      "Manter contraceptivo combinado na migrânea com aura",
      { t: "Prescrever triptano sem avisar que o SUS não tem, ou a quem tem cardiopatia isquêmica ou teve AVC", f: "SBCe — Recomendações para o tratamento da crise migranosa, Arq Neuropsiquiatr, 2016" },
      "Desistir da profilaxia antes de 30 dias, ou trocar sem chegar à dose-alvo",
      { t: "Encaminhar ao neurologista sem ter tentado duas classes de profilaxia por 3 meses", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" },
      { t: "Chamar de enxaqueca a cefaleia nova acima de 50 anos", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 7" }
    ]
  }
});

/* Onda APS II · agente neuro (27/10/2026) — queixa "tontura-vertigem".
 * Base: Protocolos MS/UFRGS vol. 16 Neurologia 2022 (P9, p. 15; Quadros 11 a 14, p. 25–30; Dix-Hallpike p. 27,
 * Epley p. 28, impulso cefálico e Quadro 13 p. 29); TSRS Otorrinolaringologia 2023 (P1 p. 5; Quadros 1–4,
 * p. 20–25); CAB nº 28 vol. II §2.20 (p. 184–190); Consenso PIM 2016; RENAME 2024.
 * Sem documento brasileiro dedicado a HINTS: os sinais centrais são os do Quadro 11 e do TSRS 2023. */

QUEIXAS.push({
  id: "tontura-vertigem",
  nome: "Tontura e vertigem — central × periférica, VPPB e manobra de Epley",
  kw: "tontura vertigem labirintite vppb vertigem posicional paroxistica benigna epley dix-hallpike neurite vestibular neuronite meniere desequilibrio pre-sincope nistagmo avc cerebelo zumbido",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Neuromusculoesqueletica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Vertigem com sinal neurológico focal — diplopia, borramento visual, disartria, parestesia, fraqueza, dismetria, ataxia: suspeita central (AVC de fossa posterior) — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Cefaleia nova junto com a vertigem, sobretudo occipital — urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Surdez súbita de um lado (perda neurossensorial aguda sem causa óbvia) — urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 5" },
      { t: "Nistagmo vertical, multidirecional, ou que não para com a fixação do olhar — urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 5" },
      { t: "Não consegue ficar de pé nem andar, ou cai cedo e de forma abrupta no Romberg: sugere causa central", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 20" },
      { t: "Vertigem aguda e contínua com teste do impulso cefálico NORMAL (sem sacada): sugere causa central, como infarto cerebelar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 188" },
      { t: "Desvio vertical do olho ao descobri-lo no teste de skew: tronco cerebral", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 20" },
      { t: "Labirintite ou neuronite sem nenhuma resposta em 7 dias, ou sintoma incapacitante — urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 5" },
      { t: "Vertigem tão intensa que precisa de medicação hospitalar e hidratação: pronto-socorro", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 188 e 189" },
      { t: "Fluxo local do AVC (SAMU, UPA, hospital de referência para trombólise em Feira de Santana) e horário de início dos sintomas: confirmar e anotar", v: true }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "O que é a 'tontura': tudo girando (vertigem), quase desmaiar (pré-síncope), desequilíbrio, ou cabeça vazia?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 184" },
      { t: "Quanto dura: menos de 1 minuto (VPPB), 20 minutos a horas (Ménière), contínua por dias (neurite)?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 26" },
      { t: "Vem ao virar na cama, deitar, levantar, olhar para cima ou se inclinar?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 26" },
      { t: "Zumbido, perda de audição, ouvido tampado?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 25 e 26" },
      { t: "Visão dupla, fala enrolada, fraqueza, formigamento, dificuldade de andar, dor de cabeça nova?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Infecção respiratória ou de ouvido recente, trauma de crânio, cirurgia de ouvido; migrânea ou Ménière na família", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 184" },
      { t: "Medicamentos: anti-hipertensivo, diurético, antidepressivo, antipsicótico, anticonvulsivante, benzodiazepínico, antidiabético, relaxante muscular, aminoglicosídeo; álcool e cocaína", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 25" },
      { t: "Pré-síncope: última refeição, doença do coração, dor no peito, desmaio antes, morte súbita na família", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 189" },
      { t: "Idoso: piora à noite e no escuro? Já caiu? Enxerga e ouve bem? (déficit sensorial múltiplo)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "PA e pulso deitado e em pé: queda de 20 mmHg ou mais na sistólica, ou pulso subindo 10 bpm, é disfunção autonômica; ritmo cardíaco", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 186" },
      { t: "Nistagmo: olhar em todas as direções; periférico é horizontal ou rotatório e para com a fixação; vertical ou que não para é central", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 25" },
      { t: "Dix-Hallpike para os dois lados: cabeça a 45 graus, deitar rápido com a cabeça pendente cerca de 20 graus, olhos abertos; nistagmo com latência de até 20 segundos, fatigável — VPPB", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 27" },
      { t: "Teste do impulso cefálico só na vertigem aguda contínua (não na posicional nem na recorrente): sacada ao virar para o lado afetado é periférica", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 24" },
      { t: "Teste de skew: cobrir e descobrir cada olho olhando para a frente", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 20" },
      { t: "Cerebelo e marcha: dedo-nariz, diadococinesia, Romberg e marcha de olhos abertos e fechados", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 186 e 188" },
      { t: "Otoscopia: vesículas (Ramsay Hunt), otite média, colesteatoma", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 186" },
      { t: "Audição: teste do sussurro; se reduzida, Weber e Rinne", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 5" },
      { t: "Fundo de olho (papiledema) e rigidez de nuca; temperatura", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 186 e 188" }
    ]
  },

  naoperder: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Vertigem central: menos intensa e raramente com zumbido ou hipoacusia — a falta de sintoma auditivo não tranquiliza", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 25" },
      { t: "Idoso com desequilíbrio que piora à noite: déficit sensorial múltiplo (visão, audição, neuropatia) — prevenir queda e não sedar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" },
      { t: "Pré-síncope sem explicação em idoso cardiopata ou em uso de digoxina, tricíclico ou neuroléptico: avaliação cardíaca", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 189" },
      { t: "Hipotensão por anti-hipertensivo ou vasodilatador explica dois terços das pré-síncopes; hipoglicemia também", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 189" },
      { t: "Diabetes e tireoide descompensados como causa secundária de vertigem periférica", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Flunarizina e cinarizina causam parkinsonismo", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 20" },
      { t: "Cabeça vazia contínua, sem rotação: ansiedade, pânico, depressão — tratar a doença de base", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" }
    ]
  },

  ddx: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "VPPB — vertigem intensa de menos de 1 minuto ao mexer a cabeça; Dix-Hallpike positivo, com latência, fatigável", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 26" },
      { t: "Neurite vestibular (neuronite, labirintite) — vertigem contínua de início abrupto, náusea e vômito, sem zumbido nem sinal focal, impulso cefálico positivo", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 26" },
      { t: "Doença de Ménière — crises de 20 minutos a horas, que começam com hipoacusia, zumbido e plenitude do mesmo ouvido", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 26" },
      { t: "Vertigem central (AVC, tumor) — nistagmo vertical ou que não para com o olhar, desequilíbrio grave, sinal focal", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 25" },
      { t: "Pré-síncope — sensação de desmaio; hipotensão postural, arritmia, reação vasovagal", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 189" },
      { t: "Desequilíbrio — doença do cerebelo ou déficit sensorial múltiplo do idoso", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" },
      { t: "Tontura por medicamento — hipotensão, toxicidade cerebelar, hipoglicemia, ototoxicidade, efeito anticolinérgico", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 25" },
      { t: "Hiperventilação por ansiedade — dormência nas pernas, sudorese", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" }
    ]
  },

  exames: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "A história sozinha dá o diagnóstico em cerca de 3 de cada 4 pessoas com tontura, e a grande maioria das vertigens se maneja na APS", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 184" },
      { t: "TSH e glicemia de jejum ou HbA1c na vertigem periférica com dúvida diagnóstica", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Síncope ou pré-síncope com suspeita de arritmia: ECG; vão à emergência TV, TSV paroxística rápida, QT longo ou curto, Brugada, BAV de 2º grau Mobitz II ou de 3º grau, bradicardia abaixo de 40 bpm, pausa acima de 3 segundos e disfunção de marca-passo", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 20" },
      { t: "Glicemia na suspeita de hipoglicemia (sudorese, confusão, tremor, taquicardia)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 189" }
    ]
  },

  farmaco: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023",
    itens: [
      { t: "VPPB: o tratamento é a manobra de Epley; remédio ajuda pouco, porque a crise dura menos de 1 minuto", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 188" },
      { t: "Epley: Dix-Hallpike do lado afetado; virar a cabeça 90 graus para o lado são; virar mais 90 graus (rosto para o chão, tronco de lado); sentar — cada posição até passar o nistagmo, no mínimo 30 segundos", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 28" },
      { t: "Neurite ou labirintite: antiemético, anti-histamínico ou benzodiazepínico só nos 3 primeiros dias — passar disso atrasa a compensação central", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 29" },
      { t: "Prometazina (comprimido da farmácia básica) e ondansetrona também estão no Quadro 13; o cartão da prometazina é o da urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 29" },
      { t: "Suspeita de causa viral (herpes simples, zóster): corticoide ou antiviral", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 29" },
      { t: "Esquema e dose do corticoide ou do antiviral na neurite viral: o protocolo não traz — confirmar antes de prescrever", v: true },
      { t: "Dimenidrinato, meclizina, betaistina, cinarizina e flunarizina não estão na RENAME 2024", f: "RENAME 2024" },
      { t: "Idoso: anti-histamínico de primeira geração (dimenidrinato, prometazina, meclizina) e benzodiazepínico são inapropriados — confusão, queda, fratura", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
      { t: "Vertigem recorrente: reduzir o supressor vestibular assim que possível; reabilitação vestibular acelera a compensação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 188 e 189" }
    ]
  },

  formulario: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016",
    farmacos: [
      { id: "metoclopramida", linha: "Adulto — neurite vestibular", papel: "antiemético da farmácia básica na neurite ou labirintite, no máximo 3 dias; evitar no idoso" },
      { id: "dimenidrinato", papel: "anti-histamínico antivertiginoso, no máximo 3 dias; fora da RENAME; inapropriado no idoso" },
      { id: "diazepam", outra: true, linha: "Adulto — neurite vestibular", papel: "benzodiazepínico do protocolo, no máximo 3 dias; inapropriado no idoso (confusão, queda)" },
      { id: "prometazina", outra: true, linha: "Adulto — neurite vestibular", papel: "anti-histamínico e antiemético da farmácia básica na neurite ou labirintite, no máximo 3 dias; inapropriado no idoso" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023",
    itens: [
      { t: "Suspeita central com sinal de gravidade: urgência; não medicar e liberar", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "VPPB: fazer a Epley na consulta; mais de 3 recorrências depois das manobras: Otorrino", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Neurite ou labirintite sem melhora progressiva em 15 dias de tratamento conservador, ou neuronite que volta em crises: Otorrino", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 5" },
      { t: "Suspeita de Ménière: Otorrino", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Vertigem periférica com dúvida depois de investigar medicamento, diabetes e tireoide: Otorrino; central já avaliada na emergência: Neurologia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Explicar que a melhora completa é lenta e que algum desequilíbrio pode durar semanas a meses; voltar se as crises não ficarem mais curtas", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 5" },
      { t: "Avisar que o sintomático dá sono, tira a atenção e soma com o álcool", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 188" },
      { t: "Desequilíbrio do idoso: corrigir visão, audição e neuropatia; prevenir queda com visita domiciliar e adaptação da casa", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" },
      { t: "Pré-síncope por anti-hipertensivo ou vasodilatador: ajustar o remédio, meia elástica, levantar devagar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 189" },
      { t: "No encaminhamento: duração e frequência das crises, gatilhos, exame neurológico e otoscopia, tratamento usado com dose, TSH e glicemia, medicamentos que causam vertigem", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" }
    ]
  },

  erros: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Dar antivertiginoso contínuo por semanas 'para a labirintite'", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 29" },
      { t: "Tratar VPPB só com remédio, sem Dix-Hallpike e Epley", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 28" },
      { t: "Liberar como 'labirintite' a vertigem com sinal focal, nistagmo vertical ou cefaleia nova", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 15" },
      { t: "Dar dimenidrinato, prometazina ou diazepam a idoso com desequilíbrio", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 188 e 190" },
      { t: "Chamar toda tontura de labirintite sem separar vertigem, pré-síncope e desequilíbrio", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 184" },
      { t: "Não medir a PA em pé", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 186" },
      { t: "Prescrever flunarizina ou cinarizina por meses (parkinsonismo)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 20" },
      { t: "Não revisar os medicamentos em uso que causam tontura", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023, p. 25" }
    ]
  }
});

/* Onda APS II · agente neuro (27/10/2026) — queixa "neuropatia-periferica".
 * Base: Protocolos MS/UFRGS vol. 16 Neurologia 2022 (P8 p. 14; Quadros 9 e 10, p. 23–24); PCDT DM2 2026
 * (p. 7–8, 23, 34–37, 44); PCDT Dor Crônica 2024 (p. 5, 9, 14–18); TSRS Tratamento da Dor 2020 (P6, Quadros 5
 * e 8); Neurocirurgia 2022 (P3, túnel do carpo, p. 11); CAB nº 28 vol. II (p. 190); RENAME 2024.
 * O erro que este guia previne (caso ATP-05, só o padrão): polineuropatia tratada como falta de B12 sem
 * dosagem, com complexo B, em idosa nunca rastreada para diabetes. A cianocobalamina é cartão do agente
 * digestivo (referenciada pelo id). */

QUEIXAS.push({
  id: "neuropatia-periferica",
  nome: "Neuropatia periférica — formigamento nos pés, diabetes, B12 e dor neuropática",
  kw: "neuropatia periferica polineuropatia formigamento dormencia queimacao nos pes em bota neuropatia diabetica b12 vitamina b12 complexo b monofilamento diapasao dor neuropatica tunel do carpo guillain barre pe diabetico",
  tag: "Crônico",
  mod: "aps",
  tema: "A2-Neuromusculoesqueletica",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Polineuropatia de início agudo (suspeita de síndrome de Guillain-Barré): urgência", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 14 e 24" },
      { t: "Sintomas graves ou rapidamente progressivos, assimétricos ou que não começam pelos pés, predominantemente motores ou autonômicos: polineuropatia atípica — Neurologia, depois da emergência se preciso", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 14 e 23" },
      { t: "Pé insensível com úlcera infectada, infecção que se espalha, isquemia crítica, gangrena, ou pé quente, vermelho e inchado sem explicação (Charcot agudo): urgência no mesmo dia", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 36" },
      { t: "Deformidade importante do pé, pulsos ausentes ou suspeita de isquemia do membro: encaminhar a nível mais complexo", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 36" },
      { t: "Mão com déficit de força objetivo ou atrofia tenar (túnel do carpo): Neurocirurgia ou cirurgia da mão", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 11" }
    ]
  },

  perguntas: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Onde começou e como subiu: pelos dois pés, simétrico, 'em bota'? (o típico é distal e comprimento-dependente)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 23" },
      { t: "Dormência, formigamento, queimação, choque, piora à noite? Fraqueza, tropeço, queda?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Tontura ao levantar, boca seca, suor alterado, intestino e bexiga diferentes (autonômica)?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Diabetes conhecido? Glicemia alterada no passado que nunca foi repetida?", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 8" },
      { t: "Usa metformina? (causa deficiência de vitamina B12)", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 23" },
      { t: "Toma complexo B ou vitamina B6 por conta própria? (excesso de B6 também causa neuropatia)", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" },
      { t: "Álcool; quimioterapia, isoniazida, nitrofurantoína, amiodarona, colchicina; chumbo, mercúrio, solvente", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Má absorção, desnutrição, anemia?", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "HIV, hanseníase, doença renal ou hepática, tireoide, lúpus, artrite reumatoide, câncer?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Parentes com neuropatia hereditária?", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 14" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      { t: "Pés descalços: pele, unhas, deformidade (musculoesquelético), pulsos", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 36" },
      { t: "Sensibilidade protetora: monofilamento de 10 g mais um segundo teste — de preferência o diapasão de 128 Hz; ou picada, ou reflexo aquileu", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 37" },
      { t: "Fibra fina (térmica e dolorosa) e fibra grossa (vibração, reflexo, tato, posição)", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" },
      { t: "Escore de comprometimento neuropático: vibração, temperatura, dor e aquileu dos dois lados — 3 a 5 leve, 6 a 8 moderada, 9 a 10 grave", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 35" },
      { t: "Força distal, atrofia, hipotonia, fasciculação, reflexos", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Romberg e marcha (ataxia sensitiva); PA deitado e em pé (hipotensão ortostática)", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Mão: Tinel e Phalen quando a parestesia é na mão", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 11" },
      { t: "DN4 para caracterizar a dor como neuropática", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 5" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      { t: "Diabetes nunca rastreado em quem chega com neuropatia: glicemia e HbA1c antes de qualquer rótulo", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Neuropatia diabética é diagnóstico de exclusão: deficiência de B12, álcool, hipotireoidismo, túnel do carpo, excesso de B6 e drogas podem coexistir", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" },
      { t: "Deficiência de B12 se confirma pela dosagem sérica, que está na investigação mínima — não por suposição", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Diabético em metformina com neuropatia: lembrar a deficiência de B12", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 23" },
      { t: "Pé com perda de sensibilidade protetora: classificar o risco — define o intervalo de seguimento", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 37" },
      { t: "Perda de propriocepção desequilibra no escuro: o idoso cai à noite", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" },
      { t: "HIV, lúpus ou artrite reumatoide com neuropatia: eletroneuromiografia cedo", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" }
    ]
  },

  ddx: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Neuropatia diabética — distal, simétrica, progressiva; glicemia ou HbA1c alteradas", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" },
      { t: "Deficiência nutricional (vitamina B12, tiamina) — B12 baixa na dosagem; ver metformina, má absorção, álcool", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Alcoólica — uso abusivo de álcool", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Tóxica ou por medicamento — quimioterápico, colchicina, amiodarona, nitrofurantoína, isoniazida", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Excesso de vitamina B6 — complexo B ou B6 por conta própria", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" },
      { t: "Hipotireoidismo, hepatopatia crônica, DRC avançada ou dialítica, neoplasia, paraproteinemia", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Hanseníase ou HIV — polineuropatia infecciosa; teste de HIV está na investigação mínima", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Guillain-Barré — polineuropatia aguda; emergência médica", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 14 e 24" },
      { t: "Charcot-Marie-Tooth — perda de força distal, arreflexia, família", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Túnel do carpo — parestesia na mão, Tinel e Phalen positivos", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 11" },
      { t: "Radiculopatia ou claudicação neurogênica — dor no território de uma raiz, ou nas pernas ao andar que alivia sentando", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 7" }
    ]
  },

  exames: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Investigação mínima: glicose, vitamina B12, TSH, eletroforese de proteínas, VSG, hemograma, creatinina, sódio, potássio, cálcio, TGO, TGP, GGT, fosfatase alcalina, teste rápido ou sorologia de HIV", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Diabetes: glicemia de jejum e HbA1c na mesma amostra — jejum a partir de 126 mg/dL e HbA1c a partir de 6,5% fecham; só um alterado, repetir", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 8" },
      { t: "Quadro leve com causa tratável provável (diabetes, álcool, medicamento, hipotireoidismo): sem bateria extensa no início — tratar a causa", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Eletroneuromiografia: quadro grave, progressivo ou atípico, ou com HIV, lúpus ou artrite reumatoide", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Má absorção, alcoolismo, desnutrição ou anemia: ferro, ferritina, transferrina, ácido fólico e B12", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 9" },
      { t: "No DM2, pesquisar neuropatia ao diagnóstico e repetir todo ano se normal", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      { t: "Tratar a causa: na diabética, o controle glicêmico previne e freia a progressão", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 35" },
      { t: "Dor que não responde ao controle metabólico: analgésico não opioide primeiro; depois tricíclico ou anticonvulsivante, pelo PCDT Dor Crônica", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 35" },
      { t: "Tricíclico (amitriptilina, nortriptilina) e gabapentina são primeira linha na neuropatia diabética e na pós-herpética", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "Nortriptilina dá efeito adverso menos intenso que a amitriptilina; no idoso, tricíclico só para dor e na menor dose", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "Gabapentina: Componente Especializado, pelo PCDT Dor Crônica (CID R52.1 ou R52.2); reduzir com depuração de creatinina baixa", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 3 e 18" },
      { t: "Pregabalina e duloxetina não foram incorporadas ao SUS para dor neuropática", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 14" },
      { t: "Carbamazepina: neuralgia do trigêmeo e neuropatia diabética dolorosa", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15 e 17" },
      { t: "Persistiu com um fármaco em dose otimizada: somar outro de classe diferente", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "Opioide só em exacerbação ou dor intratável, na menor dose, com reavaliação de risco e benefício", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "B12: a RENAME 2024 só tem a cianocobalamina injetável (Componente Básico)", f: "RENAME 2024" },
      { t: "Excesso de vitamina B6 é causa de neuropatia não diabética a considerar: perguntar a dose e o tempo de uso de complexo B ou B6 por conta própria", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" },
      { t: "Túnel do carpo: órtese rígida de punho (sobretudo à noite), fisioterapia, corticoide oral curto ou infiltração local", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024 · TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · RENAME 2024 · Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016",
    farmacos: [
      { id: "amitriptilina", linha: "Adulto — dor crônica, neuropática", papel: "tricíclico da farmácia básica, à noite; no idoso, a linha 'Idoso — dor crônica' do cartão; não no infarto recente, com IMAO nem na gravidez (Termo do PCDT)" },
      { id: "nortriptilina", linha: "Adulto — dor neuropática", papel: "tricíclico com efeito adverso menos intenso que a amitriptilina — opção no idoso, na menor dose" },
      { id: "gabapentina", linha: "Adulto — dor neuropática", papel: "primeira linha na diabética e na pós-herpética; Componente Especializado com LME; reduzir na função renal baixa" },
      { id: "carbamazepina", outra: true, linha: "Adulto — neuropatia diabética dolorosa", papel: "alternativa na neuropatia diabética dolorosa; indutora enzimática — rever as interações" },
      { id: "duloxetina", outra: true, linha: "Adulto — dor neuropática", papel: "IRSN de primeira linha na neuropatia diabética pelo TSRS, mas não incorporado ao SUS — a família compra" },
      { id: "cianocobalamina", outra: true, linha: "Adulto com sintoma neurológico", papel: "só na deficiência de B12 confirmada por dosagem; a RENAME tem só a injetável" },
      { id: "prednisona", outra: true, linha: "Adulto — síndrome do túnel do carpo", papel: "túnel do carpo: curso oral curto, junto com órtese e fisioterapia" }
    ],
    combos: ["neu-dor-neuropatica-duas-classes"],
    proibidos: ["isrs-triciclico-imao"],
    dosemuda: ["dm-amitriptilina"]
  },

  conduta: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Polineuropatia típica com causa definida (diabetes, álcool, quimioterapia): conduzir na APS", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 14" },
      { t: "Neurologia: desmielinizante, atípica, sem causa depois da investigação inicial, ou progressiva ou refratária apesar de tratar a causa e de tricíclico ou gabapentina", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 14" },
      { t: "Neuropatia diabética refratária a tratamento otimizado (dois fármacos em dose otimizada) com diabetes compensado: Tratamento da Dor", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
      { t: "Pé: autocuidado diário — olhar os pés e o calçado por dentro, lavar e secar entre os dedos, cortar as unhas certo, nunca andar descalço", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 36" },
      { t: "Úlcera no pé sem profissional ou material na APS para tratar: encaminhar a nível mais especializado", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 36" },
      { t: "Túnel do carpo com déficit sensitivo contínuo por 3 meses ou mais de 6 meses sem resposta ao tratamento otimizado: Neurocirurgia ou cirurgia da mão; ligado ao trabalho há mais de 3 meses: Saúde do Trabalhador", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 14: Neurocirurgia adulto, 2022, p. 11" },
      { t: "Idoso com ataxia sensitiva: prevenir queda — visita domiciliar e adaptação da casa", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" },
      { t: "No encaminhamento: evolução, sintomas sensitivos, motores e reflexos, exames com data (hemograma, glicemia ou HbA1c, B12, TSH, HIV), tratamento usado, outros medicamentos, história familiar", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 14" }
    ]
  },

  erros: {
    fonte: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022",
    itens: [
      { t: "Rotular como 'falta de B12' e repor sem dosar, sem pedir glicemia e HbA1c", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Não perguntar por suplemento com B6 em quem tem neuropatia", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 34" },
      { t: "Deixar uma glicemia alterada antiga sem repetir nem avisar o paciente", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 8" },
      { t: "Investigar dormência distal simétrica com ressonância de coluna ou de pé em vez da investigação laboratorial mínima", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Tratar dor neuropática com AINE em vez de tricíclico ou gabapentina", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024, p. 15" },
      { t: "Não examinar os pés com monofilamento e um segundo teste", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 37" },
      { t: "Pedir eletroneuromiografia para todo formigamento típico com causa provável", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022, p. 24" },
      { t: "Esquecer a queda: quem perdeu a propriocepção cai no escuro", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 190" }
    ]
  },

  scores: ["ckdepi"]
});

/* Onda APS II · agente urgencias (27/10/2026) — dor torácica que chega à UBS.
 * Base: CAB nº 28 vol. II §2.13 (p. 121–128, Quadro 45); SAMU 2016 AC17 (SCA) e AC18 (dissecção);
 * Portaria GM/MS nº 2.994/2011 (Linha de Cuidado do IAM: clopidogrel na alta, troponina);
 * Portaria GM/MS nº 2.048/2002 (lista da UBS). A SBC 2025 de dor torácica está em FALTA e é de
 * unidade de emergência, não de UBS. Páginas por item: urgencias.notas.md. */

QUEIXAS.push({
  id: "dor-toracica",
  nome: "Dor torácica — síndrome coronariana até a remoção",
  kw: "dor toracica dor no peito angina infarto iam sindrome coronariana aguda sca precordialgia aas isossorbida nitrato ecg disseccao de aorta embolia pulmonar pneumotorax",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Urgencias",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Dor retroesternal, epigástrica ou precordial em aperto, contínua, por vários minutos, irradiando para braço (sobretudo o esquerdo), ombro, pescoço, mandíbula ou dorso, com sudorese fria, náusea, dispneia ou sensação de morte iminente: SCA até prova em contrário — acionar o SAMU já", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Idoso e diabético: SCA pode vir só com desconforto gastrointestinal, dispneia, tontura, confusão, síncope ou sinais de AVE", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Angina em repouso ou com menor tolerância ao esforço, mesmo que já tenha passado (dura em geral menos de 20 minutos): angina instável — pronto-socorro ou UPA, não consulta agendada", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Dor súbita, muito intensa, lacerante, retroesternal com irradiação para o dorso, com pulsos assimétricos: dissecção aguda de aorta", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Dispneia súbita com dor pleurítica, taquipneia, taquicardia e sinais de insuficiência cardíaca direita: embolia pulmonar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Dor pleurítica súbita de um lado, com dispneia, timpanismo e murmúrio abolido no mesmo hemitórax: pneumotórax espontâneo", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Instabilidade — hipotensão, sinais de choque, alteração de consciência, dispneia importante: acesso venoso calibroso, remoção, e estar pronto para RCP e desfibrilação", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Dor torácica com PA muito alta é emergência hipertensiva (SCA ou dissecção) — ver o guia 'PA muito elevada'", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Onde dói, como começou (súbito ou aos poucos), há quanto tempo, quanto dura cada crise, se é contínua ou vai e volta",
      "Como é a dor — aperto, peso, queimação, pontada — e para onde irradia",
      "O que desencadeia e o que alivia: esforço, frio, emoção, repouso; respirar, tossir ou mexer; comer ou deitar; antiácido",
      "Sintomas junto: sudorese fria, náusea, vômito, falta de ar, desmaio, palpitação, febre, tosse",
      { t: "Já teve angina ou infarto? Usa remédio para angina?", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Hipertensão, diabetes e outros fatores de risco cardiovascular; remédios em uso, álcool, drogas",
      { t: "Usou sildenafila, vardenafila ou lodenafila nas últimas 24 horas, ou tadalafila nas últimas 48 horas? (contraindica o nitrato)", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Alergia a AAS, sangramento ativo, hemofilia ou úlcera péptica ativa? (contraindicam o AAS)"
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      { t: "PA, FC, FR e nível de consciência na chegada, e de novo a intervalos regulares até a remoção", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Oximetria: oxigênio só se a saturação estiver abaixo de 94% ou houver desconforto respiratório", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Pulsos nas extremidades, comparando os lados: assimetria sugere dissecção de aorta", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Ausculta: estertores e B3 (insuficiência cardíaca), atrito pericárdico (pericardite), murmúrio abolido com timpanismo (pneumotórax)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Palpar a parede torácica: dor reproduzida pela pressão sugere costocondrite — mas nenhum achado isolado exclui SCA", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Pele: vesículas agrupadas em faixa de um dermátomo (herpes-zóster)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  naoperder: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Dor atípica não exclui SCA: a descrição atípica reduz a chance, mas nenhum dado isolado basta para descartar",
      "Dor 'definitivamente anginosa' fecha o diagnóstico de SCA mesmo sem exame — a falta de ECG na UBS não atrasa a remoção",
      { t: "ECG inicial normal não exclui: repetir em 5 a 10 minutos, sem atrasar a decisão de encaminhar", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "A dor do refluxo pode ser opressiva, irradiar para pescoço, braço ou dorso e melhorar com nitrato — a melhora com nitrato não prova origem cardíaca",
      "Ansiedade e pânico dão aperto torácico com dispneia por 30 minutos ou mais, sem relação com esforço; quem volta muito ao acolhimento precisa de cuidado em saúde mental, sem baixar a guarda para SCA"
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Angina estável — pressão ou queimação retroesternal no esforço, no frio ou na emoção, por menos de 2 a 10 minutos — tratar e acompanhar na UBS",
      "Angina instável — a mesma dor, em repouso ou com menos esforço, em geral por menos de 20 minutos — pronto-socorro ou UPA",
      "Infarto agudo do miocárdio — início súbito, 30 minutos ou mais, com dispneia, fraqueza, náusea, vômito, às vezes alteração hemodinâmica — pronto-socorro ou UPA",
      "Pericardite — dor aguda pleurítica que muda com a posição; atrito pericárdico",
      "Dissecção de aorta — dor muito intensa, lacerante, súbita, para o dorso; hipertensão ou Marfan; pulsos assimétricos",
      "Embolia pulmonar — dispneia súbita, dor pleurítica, taquipneia, taquicardia, sinais de insuficiência cardíaca direita",
      "Pneumotórax espontâneo — dor pleurítica súbita de um lado, dispneia, timpanismo, murmúrio abolido",
      "Pleurite ou pneumonia — dor pleurítica bem localizada, lateral, com dispneia e febre",
      "Refluxo ou úlcera — queimação retroesternal ou epigástrica ligada à refeição ou ao deitar, aliviada por antiácido",
      "Costocondrite — dor intensa e fugaz, bem localizada, reproduzida pela pressão na articulação",
      "Herpes-zóster — queimação prolongada em faixa de dermátomo, depois vesículas",
      "Pânico — aperto com dispneia por 30 minutos ou mais, sem relação com esforço, com outros sinais de ansiedade"
    ]
  },

  exames: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "ECG de 12 derivações o mais rápido possível, se a UBS tiver; segunda opinião por telecardiologia, se houver",
      "Sugerem SCA: supradesnivelamento de ST, bloqueio de ramo esquerdo novo ou supostamente novo, infradesnivelamento de ST, inversão dinâmica de onda T",
      { t: "Troponina e a investigação completa são do serviço de urgência: a UBS estabiliza e transfere, não investiga", f: "guia-bolso-aps.html" },
      { t: "Se a USF Viveiros II tem eletrocardiógrafo e telecardiologia: confirmar na unidade", v: true }
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      { t: "AAS mastigado logo na suspeita de SCA, se não houver contraindicação: reduz a mortalidade imediata e tardia, o infarto e o reinfarto", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Contraindicam o AAS: alergia, intolerância gástrica, sangramento ativo, hemofilia, úlcera péptica ativa (CAB nº 28); o SAMU acrescenta discrasia sanguínea e hepatopatia grave",
      { t: "Dinitrato de isossorbida sublingual se a dor persistir — antes, PAS acima de 90, FC entre 50 e 100, sem suspeita de infarto de VD e sem inibidor de PDE5 recente", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Oxigênio só com saturação abaixo de 94% ou desconforto respiratório", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Suspeita de dissecção de aorta (dor súbita e lacerante para o dorso, pulsos assimétricos): não seguir a rotina da SCA — o protocolo do SAMU para dissecção não usa AAS nem nitrato; acionar o SAMU", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Clopidogrel não é da UBS: o hospital entrega, na alta do IAM, 30 comprimidos, e a continuidade é pelo Componente Especializado", f: "MS — Linha de Cuidado do Infarto Agudo do Miocárdio e Protocolo de Síndromes Coronarianas Agudas, Portaria GM/MS nº 2.994, 2011" },
      { t: "Nada pela boca além do AAS: água e comida favorecem vômito e broncoaspiração", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · MS — Linha de Cuidado do Infarto Agudo do Miocárdio e Protocolo de Síndromes Coronarianas Agudas, Portaria GM/MS nº 2.994, 2011",
    farmacos: [
      { id: "acido-acetilsalicilico", linha: "Adulto — suspeita de síndrome coronariana aguda",
        papel: "primeira medida na suspeita de SCA, mastigado, se não houver alergia, sangramento ativo ou úlcera ativa; na suspeita de dissecção, não é esta a conduta" },
      { id: "dinitrato-de-isossorbida", linha: "Adulto — suspeita de síndrome coronariana aguda",
        papel: "dor que persiste, sublingual — antes, PA, FC, suspeita de infarto de VD e inibidor de PDE5" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      { t: "Suspeita de SCA: acionar o SAMU logo, antes de terminar a avaliação — a remoção corre junto com o atendimento", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Cadeira de rodas até uma maca na sala com material de reanimação; repouso, sem esforço, tranquilizar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Jejum: nem água nem comida até a remoção", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "AAS já; nitrato sublingual se a dor persistir e não houver contraindicação; oxigênio se houver hipoxemia; acesso venoso calibroso se instável", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "ECG se a UBS tiver, sem atrasar a remoção; repetir em 5 a 10 minutos se o primeiro não fecha", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Registrar a evolução desde a chegada — horários, PA, FC, o que foi dado — e mandar junto com o paciente", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Dor sem característica de risco (parede torácica, refluxo, zóster, ansiedade): tratar na UBS e acompanhar; angina estável: iniciar tratamento, acompanhar e encaminhar ao especialista se necessário", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Depois do IAM: o hospital entrega o clopidogrel por 30 dias; a continuidade é pelo Componente Especializado, e a USF retoma o acompanhamento", f: "MS — Linha de Cuidado do Infarto Agudo do Miocárdio e Protocolo de Síndromes Coronarianas Agudas, Portaria GM/MS nº 2.994, 2011" },
      { t: "A UBS deve ter espaço de urgência com oxigênio, ambu, material de punção e, entre os medicamentos, isossorbida; a lista é de 2002, está desatualizada e não traz AAS (que está na RENAME básica)", f: "MS — Portaria GM/MS nº 2.048/2002 (regulamento técnico dos sistemas de urgência), 2002" },
      { t: "Nas emergências, a equipe da UBS diagnostica cedo, inicia o suporte básico de vida e aciona a remoção", f: "MS — CAB nº 28, vol. I, Acolhimento à demanda espontânea, 2013" },
      { t: "Telefone do SAMU e da regulação, onde fica a maleta de urgência, se há oxigênio e DEA na USF: confirmar na primeira semana", v: true }
    ]
  },

  erros: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Pedir ECG 'na rua' e marcar retorno para quem tem suspeita de SCA — é remoção para o pronto-socorro, não consulta",
      "Descartar SCA porque a dor é atípica, porque doeu à palpação ou porque não há fator de risco",
      { t: "Descartar SCA porque o primeiro ECG veio normal", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Usar a melhora com nitrato como prova de que a dor é cardíaca",
      { t: "Dar AAS e nitrato pela rotina da SCA a quem tem dor lacerante para o dorso e pulsos assimétricos", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Dar nitrato a quem usou sildenafila ou tadalafila, a quem tem PAS abaixo de 90 ou na suspeita de infarto de VD", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Liberar porque a dor passou — angina instável costuma durar menos de 20 minutos e é encaminhamento para o pronto-socorro",
      "Deixar o paciente ir andando até a sala ou o carro, ou comer e beber enquanto espera",
      { t: "Oxigênio de rotina em quem satura bem", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Mandar o paciente sem registro do que foi feito e de quando foi feito"
    ]
  },

  scores: ["nota-conferencia"]
});

/* Onda APS II · agente urgencias (27/10/2026) — PA muito elevada que chega à UBS.
 * Base: PCDT HAS 2025 (p. 17–21, 44–47, 50, 59); CAB nº 28 vol. II §2.14 (p. 129–134, Quadros 47
 * e 48); CAB nº 37 §3.6 (p. impressa 75–76); SAMU 2016 AC19 e AC24; Manual de Gestação de Alto
 * Risco 2022 (p. 445). A consulta de crônico (metas, escolha do anti-hipertensivo) é o guia
 * has-dm2-aps: aqui é só o episódio agudo. Páginas por item: urgencias.notas.md. */

QUEIXAS.push({
  id: "pa-muito-elevada",
  nome: "PA muito elevada — emergência, urgência e pseudocrise",
  kw: "pa alta pressao alta pressao muito alta crise hipertensiva urgencia hipertensiva emergencia hipertensiva pseudocrise hipertensao captopril nifedipino sublingual edema agudo de pulmao encefalopatia",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Urgencias",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "PAS ≥180 ou PAD ≥120 com lesão aguda de órgão-alvo é emergência hipertensiva: chamar o SAMU para remoção imediata", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "A emergência pode vir com PA abaixo de 180/120: quem define é o órgão-alvo, não o número", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Dor torácica: SCA, ou dissecção de aorta se a dor é lancinante para as costas, com pulsos assimétricos ou sopro diastólico aórtico", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Dispneia com estertores, B3, turgência jugular ou cianose: edema agudo de pulmão", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Cefaleia com letargia, confusão, distúrbio visual ou convulsão: encefalopatia hipertensiva; déficit neurológico súbito: AVE", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Gestante com 20 semanas ou mais, ou puérpera, com PAS ≥160 ou PAD ≥110 (repetir em 15 minutos), mesmo sem sintoma, ou com cefaleia occipital, escotomas ou epigastralgia: sulfato de magnésio e urgência obstétrica no mesmo dia", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Crack, cocaína, anfetamina, ou suspensão recente de clonidina ou de betabloqueador, podem causar emergência por hiperatividade simpática: procurar lesão de órgão-alvo com mais cuidado", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "PAS ≥180 ou PAD ≥120 que persiste depois da medicação na unidade: encaminhar para tratamento venoso e monitorização", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025",
    itens: [
      { t: "Já é hipertenso? Há quanto tempo, já teve lesão de órgão-alvo, como está o controle — tomou o remédio hoje?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Dor no peito ou nas costas, falta de ar, fraqueza ou dormência, alteração da fala ou da visão, confusão, convulsão?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "O que veio antes: a dor, a cefaleia, a tontura, a ansiedade — ou a pressão?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Usa anti-inflamatório, corticoide, anticoncepcional, imunossupressor, anabolizante ou descongestionante?", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Crack, cocaína, anfetamina? Parou de repente clonidina ou betabloqueador?", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Pode estar grávida? Está acima de 20 semanas, ou pariu há pouco?", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Tem aneurisma de aorta ou cerebral conhecido? (muda a pressa)", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Dor de outra origem, retenção urinária, ansiedade intensa? (pseudocrise)", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Repetir a PA após repouso, com técnica correta e manguito do tamanho do braço: erro de técnica gera 'falsa crise'", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      "Fundo de olho, se possível: hemorragia, exsudato, papiledema",
      "Pulsos nas extremidades, comparando os lados; sopro abdominal, massa pulsátil",
      "Coração e pulmão: galope, B3, turgência jugular, estertores, hepatomegalia, edema",
      "Neurológico: nível de consciência e orientação, sinais meníngeos, campo visual, déficit focal",
      "ECG, se a UBS tiver, para lesão miocárdica"
    ]
  },

  naoperder: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Pseudocrise — PA alta puxada por dor, cefaleia, tontura ou ansiedade — é provavelmente a maior causa de procura com PA muito alta: trata-se a causa, não a PA",
      { t: "A urgência hipertensiva é quase sempre HAS mal tratada, de difícil controle ou sem adesão: a consulta é a chance de reorganizar o tratamento", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Emergência também acontece com PA menos alta, como na eclâmpsia, na glomerulonefrite aguda e no uso de cocaína", f: "MS — CAB nº 37, Hipertensão Arterial Sistêmica, 2013" },
      "Clonidina suspensa de repente dá rebote",
      { t: "No AVE isquêmico, a PA só é baixada se ≥220/120 (sem trombólise) ou ≥185/110 (candidato à trombólise), e pouco: não 'corrigir' a PA do AVE na UBS", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025",
    itens: [
      "Emergência hipertensiva — PA alta com lesão aguda de órgão-alvo (cérebro, coração, aorta, rim, gestação) — SAMU",
      "Urgência hipertensiva — PAS ≥180 ou PAD ≥120, sintomática, sem lesão aguda de órgão-alvo — via oral e redução em 24 a 48 horas",
      "Pseudocrise — PA alta por dor, ansiedade, desconforto, avental branco ou erro de técnica, sem lesão de órgão-alvo — tratar a causa",
      "Elevação eventual — PA alta sem queixa, achada na rotina — planejar o diagnóstico de HAS, conferir adesão, iniciar ou ajustar o tratamento"
    ]
  },

  exames: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025",
    itens: [
      "Urgência confirmada na UBS: exames só conforme a necessidade; o essencial é a história e o exame que afastam lesão de órgão-alvo",
      "Emergência: hemoglobina, plaquetas, sódio, potássio, creatinina com TFG, urina, relação albumina/creatinina e ECG — no serviço de urgência; mulher em idade fértil, teste de gravidez",
      { t: "Gestante com crise: exame complementar para monitorizar (pré-eclâmpsia) é motivo de referenciar a um pronto atendimento", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — CAB nº 37, Hipertensão Arterial Sistêmica, 2013",
    itens: [
      { t: "Urgência sem lesão de órgão-alvo: primeiro observação em ambiente calmo, com analgésico ou tranquilizante se preciso — isso sozinho pode baixar a PA", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Anti-hipertensivo por via oral, baixando a PA aos poucos em 24 a 48 horas (alguns dias no idoso); não há benefício em baixar rápido na HAS grave assintomática", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Captopril de ação curta: na urgência com risco cardiovascular iminente (aneurisma aórtico ou cerebral) e sem sobrecarga de volume, para baixar a PA em horas; e, por via oral, em quem não tem diagnóstico prévio de HAS; pico em 60 a 90 minutos; deglutido, nunca sublingual", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Hipertenso conhecido: a melhor estratégia é ajustar o tratamento de longo prazo e rever em 24 a 48 horas, buscando 160/95 ou menos em até 48 horas", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Pseudocrise: sintomático (analgésico, antivertiginoso, benzodiazepínico), não anti-hipertensivo", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Nifedipino de ação curta (cápsula) sublingual não: queda descontrolada da PA, estimulação simpática, AVE e eventos coronarianos", f: "MS — CAB nº 37, Hipertensão Arterial Sistêmica, 2013" },
      { t: "Emergência: tratamento venoso, em unidade de urgência — a UBS estabiliza e remove. A meta é reduzir a PA média em até 25% na 1ª hora, não normalizar", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Furosemida EV só no edema agudo de pulmão, até a remoção — não serve para baixar PA", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Clonidina, citada pelo CAB nº 28 na urgência, não está na RENAME 2024: na UBS, o oral da urgência é o captopril", f: "RENAME 2024" },
      { t: "Gestante: sulfato de magnésio na unidade e antes do anti-hipertensivo de ação rápida; o anti-hipertensivo é nifedipino por via oral (ou hidralazina EV)", f: "MS — Manual de Gestação de Alto Risco, 2022" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Manual de Gestação de Alto Risco, 2022 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    farmacos: [
      { id: "captopril", linha: "Adulto — urgência hipertensiva",
        papel: "urgência que não cede com repouso, ou PA muito alta sem diagnóstico prévio de HAS — via oral, deglutido, nunca sublingual; com aneurisma aórtico ou cerebral, a linha do risco cardiovascular iminente (PCDT)" },
      { id: "furosemida", linha: "Adulto — edema agudo de pulmão na UBS",
        papel: "só no edema agudo de pulmão, EV, até a remoção — não é para baixar PA" },
      { id: "nifedipino", linha: "Gestante — crise ou emergência hipertensiva",
        papel: "só na gestante, por via oral, depois do sulfato de magnésio; nunca sublingual, e fora da gestação não entra na crise" },
      { id: "sulfato-de-magnesio", outra: true, linha: "Gestante com eclâmpsia",
        papel: "gestante com PAS ≥160 ou PAD ≥110, mesmo sem sintoma, ou iminência de eclâmpsia — na unidade, antes do anti-hipertensivo rápido e da transferência; sem convulsão, a profilaxia usa o mesmo esquema de ataque (Manual, p. 157)" },
      { id: "dipirona", outra: true,
        papel: "pseudocrise com dor ou cefaleia: tratar a dor, não a PA" },
      { id: "diazepam", outra: true, linha: "Adulto — estresse emocional agudo",
        papel: "pseudocrise com ansiedade aguda, se necessário, de forma pontual — não é anti-hipertensivo; no idoso, benzodiazepínico é potencialmente inapropriado (Consenso PIM 2016): tratar a causa" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Repetir a PA, com técnica certa e o paciente em repouso, antes de qualquer remédio", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Separar quatro situações: emergência (com lesão aguda), urgência (sem lesão, PA ≥180/120), pseudocrise (dor, ansiedade) e elevação eventual (sem queixa)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Emergência: estabilizar, acionar o SAMU e, depois, coordenar o cuidado quando o paciente voltar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Urgência e pseudocrise: algumas horas em observação na unidade; assintomático e com a PA em queda, liberar para casa", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Sem diagnóstico prévio de HAS: captopril por via oral, se necessário, e consulta na APS para decidir se é HAS ou foi pseudocrise", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Retorno: depois de emergência, consulta em 7 dias; depois de urgência, com o médico da APS, que mantém o cuidado longitudinal", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Elevação eventual sem queixa: confirmar a HAS em outra medida, conferir adesão, iniciar ou ajustar o tratamento — é consulta de crônico (guia 'HAS e DM2')", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "O PCDT (p. 59) põe a urgência hipertensiva entre os quadros a avaliar no mesmo dia em serviço de urgência; o texto do tratamento (p. 44 e 47) a mantém na APS em observação. Na prática: sem queda da PA ou com qualquer sintoma de órgão-alvo, encaminhar", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Nas emergências, a equipe da UBS diagnostica cedo, inicia o suporte básico de vida e aciona a remoção", f: "MS — CAB nº 28, vol. I, Acolhimento à demanda espontânea, 2013" },
      { t: "Telefone do SAMU e da regulação, e se a USF tem captopril, furosemida injetável e sulfato de magnésio na maleta: confirmar na unidade", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025",
    itens: [
      { t: "Nifedipino sublingual para 'baixar a pressão' — ou captopril sublingual: o captopril é deglutido", f: "MS — CAB nº 37, Hipertensão Arterial Sistêmica, 2013" },
      "Baixar rápido a PA de quem não tem lesão aguda de órgão-alvo: o risco é de AVE, IAM, cegueira e dano renal",
      { t: "Dar anti-hipertensivo na pseudocrise em vez de tratar a dor ou a ansiedade", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Medir uma vez, com o paciente agitado ou o manguito errado, e já medicar",
      { t: "Furosemida para baixar a PA sem edema agudo de pulmão", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Baixar na UBS a PA de quem está com AVE",
      { t: "Na gestante com PA ≥160/110, dar o anti-hipertensivo e transferir sem o sulfato de magnésio", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      "Liberar sem retorno combinado e sem rever adesão e tratamento"
    ]
  },

  scores: ["nota-conferencia"]
});

/* Onda APS II · agente urgencias (27/10/2026) — hipoglicemia e hiperglicemia grave na UBS.
 * Base: CAB nº 28 vol. II §2.4 (p. 49–55); CAB nº 36 §4.2 (Tabela 5 e Quadro 11, p. impressa
 * 68–70); PCDT DM2 2026 (p. 25, 31–32); SBD 2026, cetoacidose (HTML); SAMU 2016 AC28, AC29,
 * APed25. O PCDT DM2 exclui a cetoacidose e o coma hiperosmolar do escopo. Padrão de erro do caso
 * atp-06 do rodízio (DM2 de estreia com sinais de insulinopenia tratado com dupla oral, volta em
 * cetoacidose) — sem dado do caso. Páginas por item: urgencias.notas.md. */

QUEIXAS.push({
  id: "hipo-hiperglicemia",
  nome: "Hipoglicemia e hiperglicemia grave — até a remoção",
  kw: "hipoglicemia hiperglicemia glicemia baixa glicemia alta cetoacidose diabetica cad estado hiperosmolar coma diabetico glicose 50 glucagon insulina regular cetonuria kussmaul diabetes descompensado",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Urgencias",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026",
    itens: [
      { t: "Hipoglicemia com rebaixamento, convulsão, coma ou confusão que exige outra pessoa para tratar é nível 3, emergência, qualquer que seja o valor; confuso mas engolindo é nível 2: carboidrato pela boca", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
      { t: "Glicemia acima de 250 com vômito, dor abdominal, desidratação, respiração de Kussmaul, hálito cetônico ou alteração mental: suspeita de cetoacidose — remoção com urgência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Glicemia acima de 250 com cetonúria de 2+ ou mais na fita: a SBD considera risco de cetoacidose que só a gasometria exclui — a UBS não tem gasometria nem potássio: discutir a remoção mesmo sem Kussmaul", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      { t: "Idoso desidratado, sonolento ou confuso, com glicemia acima de 600 e sem cetose: estado hiperosmolar — internação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Cetoacidose com glicemia normal ou pouco alta (euglicêmica): usuário de dapagliflozina ou outro iSGLT2, gestante, abuso de álcool, DRC terminal", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      { t: "Criança ou adolescente com sede, muita urina, perda de peso e vômito: estreia de DM1 em cetoacidose", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Hipoglicemia em quem usa sulfonilureia volta horas depois: observação de 48 a 72 horas", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      { t: "Idoso com hemiplegia ao acordar que melhora com glicose: era hipoglicemia, não AIT", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — CAB nº 36, Diabetes Mellitus, 2013",
    itens: [
      { t: "Usa insulina ou sulfonilureia (glibenclamida, gliclazida)? Que dose, que horas — mudou ou errou a dose?", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      { t: "Comeu? Pulou refeição, fez exercício forte, bebeu?", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      { t: "Já teve hipoglicemia antes? Percebe o aviso (tremor, suor, fome) ou só quando já está confuso?", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
      { t: "Parou a insulina por estar doente ou sem comer?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Febre, tosse, ardência para urinar, ferida infectada? (infecção é o precipitante mais comum)", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      { t: "Corticoide, diurético, antipsicótico atípico, cocaína, álcool em excesso? Usa dapagliflozina?", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      { t: "Sede, muita urina, emagrecimento, vômito, dor na barriga, falta de ar — desde quando?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Mora sozinho? Quem ajuda com a insulina e a glicemia?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 36, Diabetes Mellitus, 2013 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Glicemia capilar logo no acolhimento: todo diabético com queixa aguda e toda alteração de consciência ou convulsão", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Fita de urina com leitura de cetonas: cetonúria de 2+ ou mais fecha o critério de cetose", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      "PA, FC, FR, temperatura e nível de consciência",
      { t: "Desidratação: mucosa e língua secas, pele fria, olhos encovados, pulso rápido; hálito cetônico; respiração de Kussmaul", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Abdome: dor e defesa podem ser da própria cetoacidose", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Foco de infecção: boca, garganta, ouvidos, pulmão, pele, gânglios, urina", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    itens: [
      "DM2 com HbA1c acima de 9% ou jejum a partir de 300, ou com poliúria, polidipsia e perda de peso: o PCDT manda considerar insulina, não somar outro comprimido",
      "Hipoglicemias repetidas tiram os sintomas de alerta: o paciente chega já confuso",
      { t: "Idoso frágil que mora sozinho: hipoglicemia vira queda e fratura", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Hipoglicemia noturna: sono agitado, suor noturno, cefaleia ao acordar, dificuldade de despertar, convulsão", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Na doença aguda, a insulina não se suspende: muitas vezes é preciso mais, e não menos", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  ddx: {
    fonte: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026 · MS — CAB nº 36, Diabetes Mellitus, 2013",
    itens: [
      "Cetoacidose — glicemia alta, cetose e acidose: Kussmaul, vômito, dor abdominal, desidratação; DM1 e também DM2",
      "Estado hiperosmolar — glicemia acima de 600, desidratação grave e alteração de consciência, sem cetose; idoso com DM2",
      "Hiperglicemia sem cetose nem agravante — glicemia acima de 250 com sintomas, mas hidratado e sem vômito",
      "Cetoacidose alcoólica e cetose de jejum — cetose sem hiperglicemia importante",
      "Acidose lática (metformina), intoxicação por AAS ou paracetamol, metanol — acidose com outra causa",
      { t: "Hipoglicemia × AIT ou AVE — déficit focal que some com glicose", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  exames: {
    fonte: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026",
    itens: [
      { t: "Na UBS bastam glicemia capilar e fita de urina para agir; gasometria, potássio, sódio e creatinina, que definem a gravidade, são do hospital", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Critério de cetoacidose: glicemia acima de 200; pH venoso abaixo de 7,3 ou bicarbonato abaixo de 15; cetonemia de 3 ou mais, ou cetonúria de 2+ ou mais",
      "Cetonúria não serve para acompanhar a melhora: fica positiva por horas ou dias depois de começar a insulina",
      { t: "Hiperglicemia tratada na UBS: glicemia de 4 em 4 horas até estabilizar", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" }
    ]
  },

  farmaco: {
    fonte: "MS — CAB nº 36, Diabetes Mellitus, 2013 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      { t: "Consciente e engolindo: 15 g de carboidrato rápido (nível 1, de 54 a menos de 70) ou 30 g (nível 2, abaixo de 54) — uma colher de sopa de açúcar ou mel tem 15 g — e glicemia de novo em 15 minutos", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
      { t: "Não engole: nada pela boca — glicose 50% EV em veia calibrosa e depois glicose 10% até acordar", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      { t: "Sem acesso venoso: glucagon IM, se houver — está fora da RENAME, é caro e em geral a UBS não tem", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Etilista, hepatopata ou desnutrido: tiamina antes da glicose, sem atrasar a glicose", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Suspeita de cetoacidose ou estado hiperosmolar: soro fisiológico EV enquanto a remoção chega, anotando volume e horários; atenção ao coração", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Insulina na cetoacidose é do hospital: o potássio é dosado antes, e abaixo de 3,3 a insulina é adiada — a UBS não tem como saber o potássio", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      { t: "Em quem já usa insulina, glicemia acima de 250 SEM desidratação, vômito nem hálito cetônico: regular extra (fração da dose diária), soro fisiológico EV e nova glicemia em 4 horas; sem melhora ou com agravante, emergência", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      { t: "Na hidratação da cetoacidose, a glicemia não deve cair mais de 50 por hora nas primeiras horas (edema cerebral)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "DM2 que chega com sinais de insulinopenia (HbA1c acima de 9%, jejum a partir de 300, poliúria, polidipsia, perda de peso): considerar insulina — no ambulatório, começa pela basal NPH —, com educação para técnica, glicemia capilar e hipoglicemia", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" }
    ]
  },

  formulario: {
    fonte: "MS — CAB nº 36, Diabetes Mellitus, 2013 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
    farmacos: [
      { id: "glicose-hipertonica", linha: "Adulto — hipoglicemia grave",
        papel: "hipoglicemia grave sem via oral — EV em veia calibrosa, depois glicose 10% até acordar; criança: linhas próprias" },
      { id: "glucagon",
        papel: "sem acesso venoso, se houver — fora da RENAME; serve à família do DM1 treinada" },
      { id: "tiamina", outra: true, linha: "Adulto etilista, hepatopata ou desnutrido",
        papel: "antes da glicose no etilista, hepatopata ou desnutrido, sem atrasá-la; a forma injetável não está na RENAME 2024" },
      { id: "cloreto-de-sodio-0-9", linha: "Adulto — suspeita de cetoacidose",
        papel: "hidratação venosa enquanto aguarda a remoção na suspeita de cetoacidose ou estado hiperosmolar; anotar volume e horário" },
      { id: "insulina-regular", linha: "Adulto com diabetes em uso de insulina — glicemia acima de 250 com cetonúria",
        papel: "hiperglicemia sem agravante em quem já usa insulina: dose extra fracionada na UBS; com sinal de cetoacidose, não — o potássio vem antes; com cetonúria de 2+ ou mais, discutir a remoção antes da dose extra" },
      { id: "insulina-nph",
        papel: "DM2 com sinais de insulinopenia: começar a basal em vez de somar outro comprimido" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — CAB nº 36, Diabetes Mellitus, 2013",
    itens: [
      "Glicemia capilar no acolhimento; com hipoglicemia grave ou suspeita de cetoacidose, acionar o SAMU logo — a remoção corre junto com o tratamento",
      "Hipoglicemia leve: carboidrato pela boca e reavaliar o manejo; moderada a grave: carboidrato se engole, glicose EV ou glucagon se não, chamar o SAMU e marcar retorno depois da alta",
      { t: "Acordou e a glicemia normalizou: alimentar, observar enquanto durar o pico da insulina; com sulfonilureia, observação de 48 a 72 horas — combinar com a regulação onde", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      { t: "Glicemia acima de 250 com cetonúria e hálito cetônico, desidratação ou vômito: encaminhar prontamente para a emergência", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      "Enquanto a remoção não chega: soro fisiológico EV, sinais vitais e glicemia seriados, e anotar tudo para a ficha de referência",
      { t: "Hiperglicemia sem agravante: hidratação oral e tratar a doença intercorrente; em quem usa insulina, regular extra pela Tabela 5 e revisão em 4 horas", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      "Regras do dia de doença para quem usa insulina: glicemia de 4 em 4 horas, cetonúria se seguir acima de 250, nunca suspender a insulina, um copo de água por hora; procurar a UBS se precisar de duas doses extras em 24 horas, glicemia acima de 400 por 12 horas, ou se não consegue beber",
      "Depois do episódio: achar o motivo (dose, refeição, álcool, sulfonilureia no idoso), rever a prescrição, ensinar os sinais de alarme e o cartão de identificação de diabético",
      { t: "Nas emergências, a equipe da UBS diagnostica cedo, inicia o suporte básico de vida e aciona a remoção", f: "MS — CAB nº 28, vol. I, Acolhimento à demanda espontânea, 2013" },
      { t: "Se a USF tem fita de urina com cetona, glicose 50% e 10%, soro fisiológico e equipo na maleta, e o telefone da regulação: confirmar na unidade", v: true }
    ]
  },

  erros: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Tratar com dupla terapia oral o DM2 de estreia com HbA1c muito alta, poliúria, polidipsia e perda de peso, sem sinal de alarme combinado — volta em cetoacidose", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
      { t: "Ler a glicose da fita de urina e não ler as cetonas", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      { t: "Dar insulina na UBS a quem tem sinais de cetoacidose, sem saber o potássio", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      { t: "Liberar quem teve hipoglicemia por sulfonilureia assim que acorda", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      { t: "Forçar açúcar ou água pela boca em quem não consegue engolir", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
      "Mandar suspender a insulina porque a pessoa está doente e sem comer",
      { t: "Descartar cetoacidose porque a glicemia 'não está tão alta' em quem usa dapagliflozina", f: "SBD — Diretriz da Sociedade Brasileira de Diabetes, diagnóstico e tratamento da cetoacidose diabética, 2026" },
      "Hidratar sem anotar volume e horário para a ficha de referência",
      "Contar com glucagon na UBS: não está na RENAME"
    ]
  },

  scores: ["nota-conferencia"]
});

/* Onda APS II · agente urgencias (27/10/2026) — crise de asma e exacerbação de DPOC na UBS.
 * Base: PCDT Asma 2026 (p. 23, 25, 28, 38–39); PCDT DPOC 2025 (p. 11, 18, 22, 26); SAMU 2016 AC22,
 * AC23, APed20; CAB nº 28 vol. II §2.6 (p. 67–72: só gravidade, fatores de risco e encaminhamento —
 * o tratamento ali é do GINA 2007, superado pelo PCDT Asma 2026). O seguimento da doença crônica
 * é dos guias asma e dpoc (agente respiratoria); os cartões salbutamol, brometo-de-ipratropio,
 * prednisolona, beclometasona e formoterol-budesonida são de lá. Páginas: urgencias.notas.md. */

QUEIXAS.push({
  id: "crise-asma-dpoc",
  nome: "Crise de asma e exacerbação de DPOC na UBS",
  kw: "crise de asma asma aguda broncoespasmo chiado sibilancia falta de ar dispneia exacerbacao dpoc enfisema bronquite cronica salbutamol ipratropio prednisona hidrocortisona oxigenio pico de fluxo",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Urgencias",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025",
    itens: [
      { t: "Asma muito grave: cianose, sudorese, exaustão, agitação, confusão ou sonolência, frases curtas ou monossilábicas, sibilância que some com murmúrio diminuído, FC acima de 140 ou bradicardia, saturação abaixo de 90% — SAMU já", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Asma grave: frases incompletas, retração subcostal ou de fúrcula acentuada, FC acima de 110, saturação de 91 a 95% — tratar e transferir com urgência", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Saturação abaixo de 90% é tratamento intensivo; sinais de gravidade ou risco iminente: broncodilatador, oxigênio controlado, corticoide e transferência urgente", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Sem resposta, ou taquipneia que persiste depois de três doses de broncodilatador em 1 a 2 horas: hospital", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Risco de crise grave: intubação prévia por asma, corticoide oral atual ou recente, abandono do corticoide inalatório, 3 ou mais idas ao pronto-atendimento ou 2 ou mais internações por asma no último ano, 2 ou mais bombinhas de broncodilatador por mês", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "DPOC grave: movimento paradoxal do tórax, cianose central nova, instabilidade hemodinâmica, alteração do estado mental, edema periférico", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "DPOC — internar: resposta ruim ao tratamento ambulatorial, piora importante da dispneia, não dorme ou não come pela falta de ar, alteração mental, sem apoio em casa, pneumonia, cardiopatia, diabetes ou insuficiência renal associadas", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Febre com crepitação localizada (pneumonia) ou dor pleurítica súbita com murmúrio abolido de um lado (pneumotórax): complicação da crise", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      { t: "Desde quando piorou e o que desencadeou: resfriado ou gripe, poeira, ácaro, pelo de animal, fumaça, mudança de tempo, exercício forte, estresse, anti-inflamatório ou betabloqueador?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Quantas vezes usou a bombinha de alívio nas últimas 24 horas? Usa corticoide inalatório todo dia, ou parou?",
      { t: "Já foi intubado ou internado por asma? Quantas vezes foi ao pronto-socorro no último ano?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Usa ou usou corticoide oral há pouco tempo?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "DPOC: a falta de ar aumentou, o catarro aumentou ou ficou purulento?", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Febre, dor ao respirar, inchaço nas pernas, falta de ar ao deitar? (pneumonia, insuficiência cardíaca)", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "Tem quem cuide em casa para seguir o tratamento?", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" }
    ]
  },

  exame: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      { t: "Oximetria em todos", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      "Consegue falar frases completas? Posição, uso de musculatura acessória, FR, FC, nível de consciência, cianose, sudorese",
      "Ausculta: sibilância difusa ou localizada; pouco murmúrio com muito esforço respiratório é gravidade, não melhora",
      { t: "Pico de fluxo acima de 5 anos, se a UBS tiver: abaixo de 60% do previsto ou do melhor pessoal depois do broncodilatador é crise grave; de 60 a 80%, moderada", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Estase jugular, estertores, edema de membros: insuficiência cardíaca entra no diferencial", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" }
    ]
  },

  naoperder: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Nem todo chiado é asma: insuficiência cardíaca e obstrução laríngea também sibilam",
      "Asma que se apresenta pela primeira vez já em crise: tratar como crise na hora, enquanto se faz a história e o exame dirigidos",
      { t: "A gravidade se mede melhor pela resposta ao broncodilatador do que pela chegada", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "DPOC grave: oxigênio em alto fluxo piora a hipercapnia e a acidose — oxigênio com cautela, em baixo fluxo", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Tabagista acima de 40 anos com dispneia progressiva tratado como asma por anos, sem espirometria: pode ser DPOC; e asma junto com DPOC segue o PCDT da Asma", f: "medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)" }
    ]
  },

  ddx: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Crise de asma — sibilância que melhora com broncodilatador, crises prévias com volta ao normal entre elas",
      "Exacerbação de DPOC — tabagista, piora da dispneia, catarro mais volumoso ou purulento, obstrução que não reverte toda",
      "Insuficiência cardíaca descompensada — ortopneia, estertores, B3, edema, turgência jugular",
      "Pneumonia — febre, crepitação localizada, dor pleurítica",
      "Pneumotórax — dor pleurítica súbita, murmúrio abolido de um lado",
      "Obstrução laríngea ou anafilaxia — estridor, rouquidão, urticária, exposição a alérgeno"
    ]
  },

  exames: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Na crise, a avaliação é clínica: oximetria e, acima de 5 anos, pico de fluxo como medida complementar",
      { t: "DPOC: hipoxemia com PaO2 abaixo de 50 ou acidose com pH abaixo de 7,3 indicam internação — a gasometria é do hospital", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" }
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Broncodilatador de curta ação (salbutamol spray) com espaçador, repetido a cada 20 minutos na 1ª hora, na asma e na DPOC",
      { t: "Crise grave: somar o brometo de ipratrópio ao beta-2", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Corticoide sistêmico na 1ª hora, de preferência pela boca (prednisona ou prednisolona); hidrocortisona EV só se não puder engolir, ou na crise grave à espera do SAMU",
      { t: "A via oral do corticoide é a preferida: a parenteral tem mais toxicidade", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Oxigênio controlado: na asma, se a saturação estiver abaixo de 94%; na DPOC, com cautela e em baixo fluxo, se abaixo de 90%", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Nebulização com soro fisiológico, nunca com água destilada: pode agravar o broncoespasmo", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Aminofilina e outras xantinas têm papel restrito: não são tratamento inicial", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Corticoide oral por menos de 2 semanas não precisa de desmame",
      { t: "Antibiótico na exacerbação de DPOC só criteriosamente, na exacerbação infecciosa — o PCDT não traz esquema nem dose", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      "Alta da crise de asma: nunca só com o broncodilatador de alívio — corticoide inalatório de manutenção, alívio (o regime preferencial é budesonida-formoterol) e um curso curto de corticoide oral"
    ]
  },

  formulario: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    farmacos: [
      { id: "salbutamol", linha: "Exacerbação leve a moderada de asma",
        papel: "broncodilatador da crise, spray com espaçador, repetido a cada 20 minutos na 1ª hora; na exacerbação de DPOC, a linha 'Adulto — exacerbação de DPOC'" },
      { id: "brometo-de-ipratropio", linha: "Adulto — crise grave de asma ou exacerbação grave de DPOC",
        papel: "somado ao salbutamol na crise grave de asma e na exacerbação grave de DPOC; criança: linha própria" },
      { id: "prednisona", linha: "Adolescente (12 anos ou mais) e adulto — exacerbação de asma",
        papel: "corticoide oral da crise, já na 1ª hora; curso curto, sem desmame; na DPOC, a linha própria do cartão" },
      { id: "prednisolona", linha: "Adolescente (12 anos ou mais) e adulto — exacerbação de asma",
        papel: "a alternativa oral à prednisona; na criança de 6 a 11 anos, a linha por peso do cartão" },
      { id: "hidrocortisona", linha: "Adulto — crise grave de asma",
        papel: "EV na crise grave à espera do SAMU, ou na DPOC sem via oral; se engole, o corticoide oral é melhor" },
      { id: "formoterol-budesonida",
        papel: "na alta da crise de asma: manutenção e alívio no mesmo inalador, o regime preferencial do PCDT" },
      { id: "beclometasona",
        papel: "corticoide inalatório de manutenção que a alta da crise de asma exige" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Começar o broncodilatador já, enquanto faz a história e o exame dirigidos",
      "Classificar a gravidade (fala, consciência, musculatura acessória, FC, saturação): exacerbação leve a moderada trata na UBS, reavaliando a cada rodada; grave ou muito grave, tratar e transferir com urgência",
      { t: "Reavaliar depois de cada rodada de broncodilatador; sem resposta depois de três rodadas em 1 a 2 horas, hospital", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Crise grave: acionar o SAMU logo; até a chegada, beta-2 com ipratrópio, corticoide e oxigênio controlado", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Alta da crise de asma: manutenção com corticoide inalatório, alívio, corticoide oral curto e plano de ação escrito; revisão em 2 a 7 dias para ver se a crise resolveu, achar a causa e rever o controle",
      { t: "Na revisão, lembrar as vacinas de influenza e covid-19, que previnem exacerbação", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
      { t: "DPOC depois de exacerbação: reavaliar em 1 a 4 semanas e de novo em 12 a 16 semanas", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "A lista de urgência da UBS da Portaria nº 2.048/2002 traz ipratrópio e aminofilina, mas não salbutamol — é de 2002 e está desatualizada: conferir o que a maleta da USF tem", f: "MS — Portaria GM/MS nº 2.048/2002 (regulamento técnico dos sistemas de urgência), 2002" },
      { t: "Se a USF tem espaçador, oxímetro, medidor de pico de fluxo, nebulizador e oxigênio: confirmar na unidade", v: true }
    ]
  },

  erros: {
    fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026",
    itens: [
      "Dar alta da crise de asma só com o broncodilatador de alívio",
      { t: "Deixar o corticoide para depois, quando ele entra na 1ª hora", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Corticoide EV em quem engole bem", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      { t: "Nebulizar com água destilada", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Oxigênio em alto fluxo no DPOC grave", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Aminofilina como primeira linha porque está na maleta", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Antibiótico em toda exacerbação de DPOC", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
      "Fazer desmame de corticoide oral de 5 a 7 dias",
      { t: "Tratar como asma, por anos, o tabagista com dispneia progressiva sem nunca pedir espirometria", f: "medicina-wiki/wiki/pneumologia-dpoc-fatos.md (2026-08-13)" },
      { t: "Seguir o tratamento da crise do CAB nº 28 (2012), que é do GINA 2007 — o vigente é o PCDT Asma 2026", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  scores: ["nota-conferencia"]
});

/* Onda APS II · agente urgencias (27/10/2026) — anafilaxia na UBS (inclusive a sala de vacina).
 * Base: SAMU 2016 AC33 (adulto) e APed26 (criança) — a DOSE vem daqui; CAB nº 28 vol. II §2.1
 * (p. 25–28) para acolhimento, diferencial e prevenção — a dose de adrenalina do CAB 28 está
 * ERRADA ('IM ou SC', '0,01 mg/kg/dia'); ASBAI/SBA 2013 (diagnóstico); Calendário Nacional de
 * Vacinação 2026 (anafilaxia pós-vacina). Autoinjetor: nenhum entre os registros ativos da Anvisa
 * (CSV de 2026-09-23). Páginas por item: urgencias.notas.md. */

QUEIXAS.push({
  id: "anafilaxia",
  nome: "Anafilaxia — adrenalina IM e remoção",
  kw: "anafilaxia choque anafilatico reacao alergica grave alergia urticaria angioedema edema de glote adrenalina epinefrina vacina reacao a vacina picada de abelha alimento medicamento",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Urgencias",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013",
    itens: [
      { t: "Anafilaxia é muito provável com qualquer um de três critérios: (1) pele ou mucosa (urticária, prurido, rubor, inchaço de lábio, língua ou úvula) mais falta de ar, broncoespasmo, estridor ou hipoxemia, ou queda da PA, síncope, incontinência; (2) dois ou mais destes logo após alérgeno provável: pele ou mucosa, respiratório, PA baixa, vômito, diarreia ou dor abdominal persistentes; (3) queda da PA após alérgeno conhecido", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "No adulto, PAS abaixo de 90 ou queda de mais de 30% da PA basal após alérgeno conhecido já é anafilaxia, mesmo sem nada na pele", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Rouquidão, estridor, edema de língua, de orofaringe ou angioedema: via aérea em risco — adrenalina já e SAMU (pode precisar de intubação precoce)", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Não sentar nem levantar o paciente de repente: a posição em pé pode causar morte súbita", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Reação bifásica: os sintomas voltam 8 a 12 horas depois em cerca de 20% dos casos, sem nova exposição — mais na alergia alimentar", f: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013" },
      { t: "Idade avançada, doença cardíaca, asma, betabloqueador e IECA: anafilaxia mais grave", f: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013" },
      { t: "Em uso de betabloqueador, pode não responder à adrenalina: bradicardia persistente e broncoespasmo resistente", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Na criança, a queda da PA conta pela PAS baixa para a idade ou por queda de mais de 30% da basal; no adolescente, PAS abaixo de 90", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "A anafilaxia pode desmascarar doença coronariana: infarto e arritmia, com ou sem adrenalina", f: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013" }
    ]
  },

  perguntas: {
    fonte: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013",
    itens: [
      "O que comeu, tomou ou recebeu (remédio, vacina, injeção) ou o que picou, e quanto tempo antes de começar?",
      { t: "Já teve reação assim? Tem alergia conhecida?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Tem asma ou doença do coração?",
      "Usa betabloqueador (inclusive colírio) ou IECA?",
      "Falta de ar, rouquidão, aperto na garganta, tontura, desmaio, vômito, cólica, diarreia?",
      "Fez exercício logo depois de comer ou de tomar remédio? Bebeu álcool, estava com infecção?"
    ]
  },

  exame: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Via aérea: voz, estridor, edema de língua, lábio e orofaringe",
      "Respiração: FR, sibilância, saturação",
      "Circulação: PA, FC, pulso e perfusão",
      { t: "Pele e mucosa: urticária, rubor, angioedema; procurar a picada", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Nível de consciência",
      "Na criança, estimar o peso: a dose é por kg"
    ]
  },

  naoperder: {
    fonte: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013",
    itens: [
      { t: "Anafilaxia sem lesão de pele existe (critério 3): a queda da PA após alérgeno conhecido basta", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "No Brasil, medicamento é a causa mais comum (analgésico, anti-inflamatório, antibiótico), depois alimento e inseto",
      "Alimento: leite de vaca e ovo na criança; crustáceo e molusco no adulto",
      "Alergia ao látex cruza com banana, kiwi, abacate e aipim",
      "No choque anafilático, o ECG pode mostrar isquemia e confundir com infarto",
      { t: "Sala de vacina: anafilaxia é rara, e por isso mesmo o serviço tem de estar sempre pronto para responder", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Reação vasovagal ou síncope — sem pele, sem broncoespasmo e sem alérgeno: não preenche os critérios",
      "Crise de asma — sibilância sem pele e sem queda da PA (mas a asma agrava a anafilaxia)",
      "Infarto agudo do miocárdio — dor torácica; lembrar que a anafilaxia também pode causar isquemia",
      "Obstrução de via aérea por corpo estranho ou espasmo laríngeo — sem urticária e sem alérgeno",
      "Pânico — sintomas sem urticária, sem broncoespasmo e com PA normal",
      "Intoxicação aguda — história de exposição a medicamento ou planta, sem urticária",
      "Urticária ou angioedema isolados — só pele, sem outro sistema: tratamento sintomático na UBS"
    ]
  },

  exames: {
    fonte: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013",
    itens: [
      { t: "O diagnóstico é clínico: tratar na hora, sem esperar exame", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Triptase sérica (melhor de 1 a 2 horas depois do início) confirma depois, no serviço de referência",
      "Investigação do agente (teste cutâneo, IgE específica) é do especialista; na picada de inseto, 3 a 4 semanas depois do evento"
    ]
  },

  farmaco: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Adrenalina IM no terço médio da face anterolateral da coxa é a primeira e principal medida: dar já, sem esperar confirmação", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Repetir a adrenalina a cada 5 a 15 minutos, pela gravidade e pela resposta; seringa e agulha, no cartão da epinefrina", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Adrenalina venosa só na iminência de choque ou no choque, diluída e com monitor — é conduta do SAMU", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Choque: soro fisiológico EV rápido, deitado com as pernas elevadas", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Broncoespasmo que persiste: salbutamol spray com espaçador", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Hidrocortisona é segunda linha e pode ajudar a prevenir a reação bifásica (SAMU); hidrocortisona e anti-histamínico (prometazina) ajudam a evitar a evolução arrastada, mas não tratam a fase aguda (CAB nº 28)",
      { t: "Em uso de betabloqueador: bradicardia persistente, atropina; broncoespasmo resistente, ipratrópio inalatório", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Autoinjetor (caneta) de adrenalina: nenhum consta entre os registros ativos da Anvisa (só há ampola) — orientar o plano para nova reação sem contar com a caneta", f: "Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23" }
    ]
  },

  formulario: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    farmacos: [
      { id: "epinefrina", linha: "Adulto — anafilaxia",
        papel: "primeira e principal medida, IM na coxa, já; repetir se não melhorar — bebê e criança antes da puberdade: linha própria, com teto menor" },
      { id: "cloreto-de-sodio-0-9", linha: "Adulto — anafilaxia com choque",
        papel: "choque: expansão rápida, com o paciente deitado e as pernas elevadas" },
      { id: "hidrocortisona", linha: "Adulto — anafilaxia",
        papel: "segunda linha, depois da adrenalina — pode ajudar a prevenir a reação bifásica; não trata a fase aguda" },
      { id: "prometazina", linha: "Adulto — anafilaxia",
        papel: "adjuvante anti-histamínico, depois da adrenalina; nunca abaixo de 2 anos" },
      { id: "salbutamol", outra: true,
        papel: "broncoespasmo que persiste depois da adrenalina, spray com espaçador" },
      { id: "brometo-de-ipratropio", outra: true,
        papel: "broncoespasmo resistente em quem usa betabloqueador" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      { t: "Anafilaxia é sempre emergência: chamar o SAMU de imediato", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Suspender a exposição, se possível (parar o que está sendo aplicado)",
      "Adrenalina IM na coxa já e anotar o horário de cada dose",
      "Deitar com as pernas elevadas; com falta de ar ou vômito, posição de conforto com a cabeceira um pouco elevada, pernas ainda elevadas",
      "Oxigênio se saturação abaixo de 94%; acesso venoso; soro fisiológico rápido se houver choque",
      "PA, FC, saturação e consciência até a remoção; estar pronto para RCP",
      { t: "Melhorou com a adrenalina: mesmo assim, remover para observação — a reação pode voltar horas depois", f: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013" },
      { t: "Depois: identificar o gatilho, cartão ou pulseira de alergia, plano para nova exposição; alergista se o agente não for identificado ou para dessensibilização (inseto, medicamento); evitar betabloqueador nessas pessoas", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Anafilaxia depois de vacina: a dose seguinte daquela vacina (covid-19, influenza) fica contraindicada — avaliação especializada caso a caso", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Anafilaxia depois de vacina: notificar em até 24 horas no e-SUS Notifica (módulo ESAVI), com sinais, história de alergia, vacina aplicada e tratamento dado", f: "MS — Calendário Nacional de Vacinação 2026, Instrução Normativa, 4ª ed., 2026" },
      { t: "Onde está a adrenalina na USF (sala de vacina e maleta), quem aplica e o telefone do SAMU: confirmar na primeira semana", v: true }
    ]
  },

  erros: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Adrenalina subcutânea, ou 'por dia' na criança, como está no CAB nº 28 (2012): a via é IM na coxa e a dose é por aplicação, repetida se preciso",
      { t: "Dar anti-histamínico e corticoide e 'observar', sem adrenalina", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      "Não repetir a adrenalina quando o quadro não melhora",
      "Sentar ou levantar o paciente",
      "Adrenalina EV em bolus fora da parada ou do choque",
      { t: "Mandar para casa porque melhorou com a adrenalina", f: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013" },
      { t: "Deixar de dar adrenalina porque o paciente usa betabloqueador: a resposta pode ser menor, mas ela não deve ser evitada", f: "ASBAI/SBA — Anafilaxia: diagnóstico, Projeto Diretrizes, Rev Assoc Med Bras, 2013" },
      { t: "Prescrever betabloqueador para quem já teve anafilaxia", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Usar na criança o teto do adulto: o protocolo pediátrico do SAMU limita a dose menor", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
    ]
  },

  scores: ["nota-conferencia", "dose-peso"]
});

/* Onda APS II · agente urgencias (27/10/2026) — crise convulsiva que chega à UBS.
 * Base: PCDT Epilepsia 2018 (p. 6–7 crise febril, p. 9 estado de mal); SAMU 2016 AC26 (adulto) e
 * APed22 (criança); CAB nº 28 vol. II §2.3 (p. 39–49, Quadros 8, 9, 13); AIDPI Criança 2017
 * (p. 15–17 e 101); PCDT HAS 2025 (p. 20–21, eclâmpsia); Manual de Gestação de Alto Risco 2022
 * (p. 160, sulfato antes do benzodiazepínico). Diazepam, midazolam e tiamina são cartões da
 * psiquiatria: as linhas desta indicação entram por PATCH (urgencias.patch.js). Midazolam
 * injetável não consta da RENAME 2024. Páginas por item: urgencias.notas.md. */

QUEIXAS.push({
  id: "convulsao",
  nome: "Crise convulsiva — estado de mal e o que fazer até a remoção",
  kw: "convulsao crise convulsiva crise epileptica epilepsia estado de mal epileptico ataque crise febril diazepam midazolam fenitoina eclampsia hipoglicemia abstinencia alcoolica",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Urgencias",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      { t: "Crise que dura 5 minutos ou mais, ou duas crises sem recuperar a consciência entre elas: conduta de estado de mal — benzodiazepínico e SAMU", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Crise com febre: meningite ou encefalite até prova em contrário — pronto-socorro (CAB nº 28). Na criança de 6 meses a 5 anos, só é crise febril simples se cumprir todos os critérios (PCDT)",
      { t: "Não volta ao normal: sem melhora progressiva 30 minutos depois da crise — hospital", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Quem não é epiléptico e tem mais de uma crise generalizada no mesmo dia: hospital", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Primeira crise na vida ou déficit que persiste: transferir", f: "guia-bolso-aps.html" },
      { t: "Gestante, parturiente ou puérpera recente com convulsão ou coma e qualquer quadro hipertensivo: eclâmpsia — sulfato de magnésio, não benzodiazepínico como primeira escolha", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Glicemia baixa: a hipoglicemia pode ser a causa da crise — corrigir", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Crise febril complexa — focal, mais de 15 minutos, repete em 24 horas ou deixa déficit (paralisia de Todd): internar", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" },
      { t: "Criança de 2 meses a 5 anos que convulsionou na doença atual (nas últimas 72 horas): sinal geral de perigo — referir com urgência", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Como foi a crise, contada por quem viu: duração, movimentos, olhos, cor da pele, mordeu a língua, perdeu urina ou fezes, quanto tempo para voltar",
      "Teve aviso antes (aura): mal-estar subindo do estômago, medo, déjà vu, escurecimento visual, palpitação?",
      "É epiléptico? Que remédio usa, tomou, mudou a dose, ficou sem?",
      "Álcool — parou de beber de repente? Cocaína, anfetamina? Parou benzodiazepínico ou barbitúrico?",
      "Remédios que baixam o limiar: tramadol, meperidina, quinolona, betalactâmico, isoniazida, aciclovir, antidepressivo, antipsicótico, lítio, teofilina",
      "Febre, dor de cabeça, rigidez de nuca? Bateu a cabeça?",
      { t: "Diabético? Usa insulina ou sulfonilureia? Comeu?", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Gestante, em trabalho de parto ou pariu há pouco? Tem pressão alta?", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      { t: "Criança: idade, febre, quanto durou, já teve antes, alguém na família com crise febril ou epilepsia?", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" }
    ]
  },

  exame: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Durante a crise: via aérea pérvia, aspirar se preciso, proteger a cabeça contra trauma, oxigênio se saturação abaixo de 94%",
      { t: "Lateralizar, não conter os movimentos, não colocar nada na boca", f: "guia-bolso-aps.html" },
      { t: "Cronometrar: 5 minutos é o ponto em que a crise passa a ser tratada como estado de mal", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" },
      "Glicemia capilar em toda crise",
      "Sinais vitais e temperatura; PA (eclâmpsia, encefalopatia hipertensiva)",
      { t: "Depois da crise: nível de consciência, sinais meníngeos, déficit focal, sinais de trauma; o exame neurológico completo vem quando possível", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  naoperder: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Hipoglicemia convulsionando: a glicemia vem antes do diazepam", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Abstinência de álcool ou de benzodiazepínico é causa de crise",
      "Muitas doenças imitam epilepsia: a descrição de quem viu é a base do diagnóstico",
      "No epiléptico, crises que voltam podem ser falta de remédio ou nível baixo",
      { t: "Abstinência de fenobarbital: o fenobarbital é a droga de escolha, antes da fenitoína (conduta do SAMU)", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018",
    itens: [
      "Crise febril simples — 6 meses a 5 anos, generalizada, menos de 15 minutos, uma só em 24 horas, sem doença aguda do sistema nervoso, sem déficit e sem crise afebril prévia",
      "Crise febril complexa — focal, mais de 15 minutos, repete em 24 horas ou deixa déficit",
      "Crise provocada — hipoglicemia, abstinência de álcool ou benzodiazepínico, droga, medicamento",
      "Infecção do sistema nervoso — crise com febre, rigidez de nuca, alteração de consciência",
      { t: "Eclâmpsia — gestante, parturiente ou puérpera com qualquer quadro hipertensivo; sinais antes: escotomas, cefaleia occipital, epigastralgia", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
      "Encefalopatia hipertensiva — PA muito alta com cefaleia, confusão, distúrbio visual e convulsão",
      "AVE, tumor ou trauma — déficit focal; causas mais comuns acima dos 35 anos"
    ]
  },

  exames: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      "Na UBS: glicemia capilar. Hemograma, gasometria, eletrólitos, função renal e hepática, urina, toxicológico e nível do anticonvulsivante são do serviço de urgência",
      { t: "Crise febril simples: sem exame de rotina, sem EEG e sem imagem; punção lombar só com sinal meníngeo, antibiótico nos dias anteriores ou abaixo de 18 meses com piora clínica", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" },
      "Primeira crise: EEG e neuroimagem orientam a decisão de tratar"
    ]
  },

  farmaco: {
    fonte: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Remédio só se a crise passar de 5 minutos: a crise tônico-clônica raramente passa disso, e a febril simples costuma parar sozinha em 2 a 3 minutos",
      "Primeira linha: benzodiazepínico — diazepam EV no adulto; na criança, EV ou retal (o retal dispensa acesso venoso)",
      { t: "Diazepam: não diluir, não fazer IM, não dar se a crise já parou (pós-ictal); no recém-nascido até 28 dias, não usar", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Criança sem acesso venoso: midazolam IM ou intranasal é a segunda escolha do protocolo pediátrico do SAMU", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Midazolam injetável não consta da RENAME 2024 (só a solução oral): a UBS pode não ter", f: "RENAME 2024" },
      { t: "No adulto, as fontes lidas não trazem midazolam para a UBS: o SAMU só o usa em infusão contínua no estado de mal refratário", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Segunda linha (fenitoína ou fenobarbital EV, com ECG e PA monitorizados) e terceira (anestesia em UTI): SAMU e serviço de urgência", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" },
      { t: "Hipoglicemia: glicose EV; no etilista, hepatopata ou desnutrido, tiamina antes, sem atrasar a glicose", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "Eclâmpsia: sulfato de magnésio; diazepam ou midazolam só se dois bolus de sulfato não controlarem as convulsões", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Crise febril simples: profilaxia contínua com anticonvulsivante não é recomendada", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" },
      { t: "Depois de uma primeira crise única, em geral não se inicia anticonvulsivante sem avaliação (EEG, imagem)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016 · MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Manual de Gestação de Alto Risco, 2022",
    farmacos: [
      { id: "diazepam", linha: "Adulto — crise convulsiva",
        papel: "primeira linha na crise de 5 minutos ou mais, EV; bebê e criança têm linha própria (EV ou retal)" },
      { id: "midazolam", linha: "Criança fora do período neonatal — crise convulsiva",
        papel: "segunda escolha na criança sem acesso venoso, IM ou intranasal; o injetável não está na RENAME 2024; no adulto, sem fonte para uso na UBS" },
      { id: "glicose-hipertonica", outra: true, linha: "Adulto — hipoglicemia grave",
        papel: "crise com glicemia baixa" },
      { id: "tiamina", outra: true, linha: "Adulto etilista ou desnutrido",
        papel: "etilista ou desnutrido, junto com a glicose, sem atrasá-la; a forma injetável não está na RENAME 2024" },
      { id: "sulfato-de-magnesio", outra: true, linha: "Gestante com eclâmpsia",
        papel: "convulsão na gestante ou puérpera com quadro hipertensivo: eclâmpsia — o sulfato vem antes do benzodiazepínico e da transferência" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Durante a crise: proteger, via aérea, oxigênio se preciso, glicemia capilar e cronometrar",
      { t: "Crise de 5 minutos ou mais, ou duas sem recuperar a consciência: diazepam (EV; na criança, EV ou retal) e chamar o SAMU", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      "Persistiu depois do benzodiazepínico: a segunda linha é EV e monitorizada (PA e ECG) e fica com o SAMU, já acionado; o CAB nº 28 admite iniciar a fenitoína na UBS que tem ECG",
      "Depois da crise: deitado de lado, observar até voltar ao normal; sem melhora progressiva em 30 minutos, hospital",
      "Encaminhar ao pronto-socorro: febre (suspeita de infecção do sistema nervoso), não volta ao normal, mais de uma crise generalizada no dia em quem não é epiléptico, crises em salva no epiléptico",
      "Epiléptico conhecido, crise típica e recuperado: rever adesão, dose e o motivo; neurologista se houver efeito colateral que persiste, crises apesar do uso correto ou antes de somar a 2ª droga sem experiência",
      { t: "Criança de 2 meses a 5 anos que convulsionou, mesmo recuperada e com cara de crise febril simples: convulsão nas últimas 72 horas é sinal geral de perigo — completar a avaliação e referir com urgência", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017" },
      { t: "Para a família: a crise febril simples é benigna e não deixa dano permanente; profilaxia contínua não é recomendada", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" },
      { t: "Anotar duração, características da crise e o que foi dado, com horário, para quem recebe o paciente", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
      { t: "A lista de urgência da UBS (Portaria nº 2.048/2002) traz diazepam, fenitoína, fenobarbital e midazolam — é de 2002, está desatualizada, e o midazolam injetável não está na RENAME 2024", f: "MS — Portaria GM/MS nº 2.048/2002 (regulamento técnico dos sistemas de urgência), 2002" },
      { t: "Se a USF tem diazepam injetável, glicosímetro, oxigênio e aspirador na maleta, e o telefone do SAMU: confirmar na unidade", v: true }
    ]
  },

  erros: {
    fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016",
    itens: [
      "Diazepam IM",
      "Diazepam no pós-ictal, com a crise já terminada",
      "Esquecer a glicemia capilar",
      { t: "Colocar objeto na boca ou conter os movimentos", f: "guia-bolso-aps.html" },
      "Diazepam no recém-nascido: até 28 dias, a primeira linha é o fenobarbital",
      { t: "Tratar como 'só mais uma crise' a convulsão com febre no adulto", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Benzodiazepínico como primeira escolha na eclâmpsia", f: "MS — Manual de Gestação de Alto Risco, 2022" },
      { t: "Iniciar anticonvulsivante depois de uma crise única, sem avaliação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Suspender de uma vez o anticonvulsivante", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012" },
      { t: "Pedir exames de rotina, EEG ou imagem na crise febril simples", f: "MS — PCDT Epilepsia, Portaria Conjunta SAS/SCTIE nº 17, 2018" }
    ]
  },

  scores: ["nota-conferencia", "dose-peso"]
});

/* Agente demanda (onda APS II, 27/10/2026) — queixa "itu-cistite".
 * Base: consenso SBI/FEBRASGO/SBU/SBPC-ML 2020 (mulher, gestante e não gestante; sociedade),
 * Manual de Gestação de Alto Risco 2022 (cap. 34, p. 353-356), Protocolos da AB Saúde das
 * Mulheres 2016 (Fluxograma 14, p. 61), CAB nº 28 vol. II 2012 (cap. 2.7, p. 75-80: homem,
 * prostatite, pielonefrite) e protocolos TelessaúdeRS de Urologia 2023 (p. 14) e Nefrologia
 * 2025 (p. 7). Páginas por item: demanda.notas.md. */
QUEIXAS.push({
  id: "itu-cistite",
  nome: "ITU — cistite, bacteriúria e pielonefrite",
  kw: "itu infeccao urinaria cistite disuria ardencia ao urinar polaciuria urgencia hematuria pielonefrite giordano bacteriuria assintomatica gestante prostatite itu de repeticao recorrente urocultura nitrofurantoina fosfomicina cefalexina",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Demanda-Comum",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Febre, calafrio, taquicardia, náusea ou vômito, dor lombar com Giordano positivo ou dor em flanco: ITU complicada ou pielonefrite, não cistite — urocultura antes do antibiótico", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      { t: "Prostração, taquicardia e hipotensão: pielonefrite com repercussão sistêmica — manejo hospitalar", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 79" },
      { t: "Sinal precoce de sepse, ou ITU complicada sem melhora no tratamento em casa: encaminhar para avaliação e tratamento hospitalar (antibiótico venoso)", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      { t: "Gestante com pielonefrite: internação obrigatória, antibiótico venoso imediato; evolui com frequência para sepse", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 355 e 356" },
      { t: "Gestante com cistite e hematúria macroscópica franca (cistite complicada): avaliar internação e antibiótico parenteral, como na pielonefrite", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 354" },
      { t: "Homem com dor súbita e forte retal, suprapúbica ou lombar baixa, febre e próstata quente e dolorosa ao toque: prostatite aguda — pode exigir internação e antibiótico venoso; abscesso prostático é cirúrgico", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 78" },
      { t: "Sem melhora clínica em 48 horas de antibiótico, ou volta da ITU em até 4 semanas: falha — urocultura com antibiograma", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" },
      { t: "Para onde remover a pielonefrite grave e a gestante (UPA, maternidade de referência) e quem aciona o transporte: fluxo da USF Viveiros II — confirmar", v: true }
    ]
  },

  perguntas: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Ardência ao urinar, urinar muitas vezes, urgência, dor acima do púbis, sangue na urina? Começou de repente? (na cistite é abrupto; na uretrite é leve e gradual)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 76" },
      { t: "Corrimento ou irritação vaginal? Disúria e polaciúria SEM corrimento passam de 90% de chance de ITU; com corrimento, a chance cai", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" },
      { t: "Febre, calafrio, dor lombar ou no flanco, náusea ou vômito?", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      { t: "Pode estar grávida? Data da última menstruação; se gestante, idade gestacional (a nitrofurantoína para em 37 semanas)", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 354 e 355" },
      { t: "Quantas ITU nos últimos 6 e 12 meses? Já tratou esta? Teve falha? (2 em 6 meses ou 3 em 1 ano é ITU de repetição)", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" },
      { t: "Usou antibiótico nos últimos meses? Tem urocultura anterior? (orientam a escolha na ITU de repetição)", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" },
      { t: "Relação com a atividade sexual, parceria nova, uso de espermicida?", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" },
      { t: "Diabetes, imunossupressão, sonda vesical, cálculo renal, ITU na infância, alteração anatômica ou neurológica do trato urinário?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 75 e 77" },
      { t: "Homem: jato fraco, esforço ou esvaziamento incompleto (sintomas obstrutivos)? Manipulação ou trauma recente do trato urinário?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 75 e 78" },
      { t: "Corrimento uretral, lesão genital ou exposição sexual de risco? (uretrite por gonococo ou clamídia, herpes)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 75" },
      { t: "Pós-menopausa: secura vaginal, perda de urina, bola na vagina (prolapso)?", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Temperatura, frequência cardíaca e PA: taquicardia, hipotensão e prostração tiram o tratamento da UBS", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 79" },
      { t: "Abdome: dor à palpação suprapúbica; sinal de Giordano (punho-percussão lombar)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 75 e 76" },
      { t: "Genitália: inspeção externa; na mulher com corrimento, exame especular", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 75" },
      { t: "Homem com febre ou dor perineal: toque retal — na prostatite aguda a próstata está quente, dolorosa e de consistência firme", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 78" }
    ]
  },

  naoperder: {
    fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020",
    itens: [
      { t: "Gestante: bacteriúria assintomática se trata SEMPRE — sem tratamento, cerca de 30% evoluem para cistite ou pielonefrite", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 353" },
      "Gestante: urgência e polaciúria podem ser da própria gravidez; o que pesa é a disúria",
      { t: "Homem: toda cistite é infecção complicada — urina tipo I e urocultura", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 77" },
      { t: "Idoso e gestante: a apresentação pode ser atípica", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 76" },
      { t: "Diabético: a ITU complica mais rápido e pode comprometer o rim; outros agentes entram (Candida, estreptococo do grupo B, Klebsiella)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 76" },
      { t: "Pielonefrite no homem: pensar em problema estrutural do trato urinário — imagem e, se preciso, referência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 79" },
      { t: "ITU complicada também é: tratamento recente, falha, ITU de repetição, idosa frágil, imunossuprimida, multimorbidade ou sonda", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      "Pós-menopausa com ITU de repetição: a atrofia vaginal é fator tratável (estrogênio vaginal)"
    ]
  },

  ddx: {
    fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020",
    itens: [
      "Pielonefrite — febre, calafrio, dor no flanco, Giordano positivo, náusea ou vômito, além da disúria",
      { t: "Uretrite (gonococo, clamídia, ureaplasma) — sintomas leves e graduais, corrimento uretral", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 76" },
      "Vulvovaginite (candidíase) ou vulvite irritativa ou alérgica — corrimento, prurido, irritação vulvar",
      "Herpes genital — vesículas ou úlceras dolorosas com disúria",
      { t: "Prostatite — homem com dor retal, perineal, suprapúbica ou lombar baixa, febre, próstata dolorosa", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 78" },
      { t: "Litíase renal, trauma geniturinário, irritante uretral, reação alérgica e câncer de bexiga — outras causas de disúria", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 75" },
      "Bacteriúria assintomática — urocultura positiva SEM sintoma: fora da gestação não é ITU e não se trata"
    ]
  },

  exames: {
    fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020",
    itens: [
      "Cistite típica na mulher não gestante: diagnóstico clínico, sem exame — a fita reagente pouco acrescenta e, negativa, não exclui",
      "Urocultura com antibiograma ANTES do antibiótico: gestante, suspeita de pielonefrite, ITU de repetição, quadro atípico, falha em 48 horas ou recidiva em até 4 semanas",
      { t: "Homem, idoso, diabético, imunodeprimido e sonda vesical prolongada: urina tipo I e urocultura", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 77" },
      "Gestante: urocultura no início do pré-natal e no começo do 3º trimestre (mais vezes no diabetes); controle 1 a 2 semanas depois de tratar",
      "Bacteriúria significativa: 100 mil UFC/mL ou mais em jato médio (100 UFC/mL ou mais por sonda)",
      "Coleta: jato médio no laboratório, de preferência a primeira urina da manhã, ou depois de 2 horas sem urinar; não mandar beber muita água (dilui e dá falso negativo)",
      "Sem urocultura de controle em quem melhorou (exceto gestante); sem urocultura em quem não tem sintoma (exceto gestante e antes de procedimento urológico)",
      "ITU de repetição sem fator de risco: cistoscopia e ultrassom de rotina não estão indicados"
    ]
  },

  farmaco: {
    fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020",
    itens: [
      "Cistite não complicada da mulher não gestante — 1ª linha: nitrofurantoína por 5 dias ou fosfomicina em dose única",
      { t: "A fosfomicina não está na RENAME 2024: na farmácia da USF, a 1ª linha é a nitrofurantoína (Componente Básico)", f: "RENAME 2024" },
      "2ª linha: cefuroxima (fora da RENAME) ou amoxicilina-clavulanato (comprimido 500/125 da RENAME), por 7 dias",
      "Fluoroquinolona (norfloxacino, ciprofloxacino, levofloxacino) não trata cistite da mulher, salvo sem outra opção — resistência e efeitos incapacitantes (tendão, nervo, aorta, glicemia)",
      { t: "Gestante: quinolona é contraindicada (dano fetal) e SMX-TMP se evita no 1º e no 3º trimestres (teratogenicidade; kernicterus)", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012, p. 191" },
      { t: "SMX-TMP: o Protocolo de 2016 do MS ainda o lista em 1ª linha por 3 dias, mas no Brasil a E. coli é sensível em só 55 a 63% (consenso de 2020) — usar com urocultura sensível, fora da gestação", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      "Disúria intensa: fenazopiridina por até 48 horas alivia (fora da RENAME)",
      { t: "Gestante (bacteriúria ou cistite): tratar sempre, guiado pelo antibiograma quando houver — nitrofurantoína (5 dias, não depois de 37 semanas), fosfomicina (dose única) ou cefalexina (7 dias); amoxicilina-clavulanato ou cefuroxima (7 dias) na cistite", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 354 e 355" },
      { t: "Gestante: profilaxia até o parto depois de pielonefrite (sempre) ou quando a bacteriúria ou a cistite se repete, com nitrofurantoína ou cefalexina; com nitrofurantoína, trocar para cefalexina depois de 37 semanas (icterícia neonatal)", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 354 a 356" },
      "Gestante que já tinha ITU de repetição: o consenso de 2020 começa a profilaxia no 1º episódio; contínua (ao deitar) ou depois da relação, se as ITU têm relação com o sexo",
      { t: "ITU complicada da mulher que dá para tratar em casa: quinolona oral (ciprofloxacino) com urocultura e reavaliação em 24 horas; nitrofurantoína não serve (pouca penetração no tecido)", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      { t: "Homem: só o CAB nº 28 (2012) trata disso na pasta — fonte antiga, anterior aos alertas de quinolona (FDA 2016, EMA 2019); confirmar o esquema com a preceptora. Cistite por 7 dias (cefalexina ou ciprofloxacino); prostatite aguda por 3 a 4 semanas, crônica por 4 a 12 (SMX-TMP de 1ª escolha na crônica); pielonefrite leve por 10 a 14 dias", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 77 a 79" },
      "ITU de repetição: confirmar cada episódio por urocultura e tratar com o esquema usual depois da coleta; profilaxia antibiótica (nitrofurantoína ou fosfomicina, contínua ou pós-coito, por 6 a 12 meses) depois de conversar riscos — trocar o antibiótico periodicamente não ajuda",
      "Na pós-menopausa, o estrogênio vaginal (não o oral) reduz a ITU de repetição e dispensa progestágeno",
      "Não recomendados para prevenir ITU de repetição: D-manose, metenamina, probiótico, fitoterápico; cranberry e imunoterapia oral sem evidência suficiente — decidir caso a caso"
    ]
  },

  formulario: {
    fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020 · MS — Manual de Gestação de Alto Risco, 2022 · MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    farmacos: [
      { id: "nitrofurantoina", papel: "cistite não complicada da mulher — 1ª linha e a que a USF tem; gestante até 37 semanas (tratamento e profilaxia)", linha: "Mulher adulta não gestante — cistite" },
      { id: "fosfomicina", papel: "cistite não complicada — 1ª linha em dose única, fora da RENAME (a paciente compra); gestante", linha: "Mulher adulta não gestante — cistite" },
      { id: "cefalexina", papel: "gestante (bacteriúria, cistite e profilaxia, inclusive depois de 37 semanas); cistite no homem", linha: "Gestante — bacteriúria" },
      { id: "amoxicilina-clavulanato", papel: "cistite: 2ª linha na mulher, gestante ou não (a RENAME tem o comprimido de 500 + 125)", linha: "Mulher adulta, gestante ou não — cistite" },
      { id: "amoxicilina", papel: "gestante com bacteriúria por estreptococo do grupo B ou Enterococcus faecalis, pelo antibiograma", linha: "Gestante — bacteriúria" },
      { id: "ciprofloxacino", papel: "ITU complicada da mulher e pielonefrite leve tratadas em casa; homem — nunca na cistite não complicada da mulher nem na gestante", linha: "Mulher adulta não gestante — ITU complicada" },
      { id: "sulfametoxazol-trimetoprima", papel: "prostatite; cistite da mulher NÃO gestante só com urocultura sensível (resistência alta no Brasil); na gestante, evitar no 1º e no 3º trimestres" },
      { id: "estriol", outra: true, papel: "pós-menopausa com ITU de repetição: estrogênio vaginal reduz a recorrência, sem progestágeno", linha: "Pós-menopausa — prevenção de ITU" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020",
    itens: [
      "Mulher não gestante com cistite típica e sem sinal sistêmico: tratar na consulta, sem exame",
      { t: "Retorno se não melhorar em 48 a 72 horas ou se a ITU voltar em poucas semanas: reclassificar como complicada, repetir urocultura e tratar com outra classe", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      { t: "ITU complicada ou com sintoma sistêmico: avaliação médica; havendo recurso, pode ser tratada em casa — urocultura, antibiótico empírico e reavaliação em 24 horas; sinal de sepse ou sem melhora: hospital", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016, p. 61" },
      { t: "Pielonefrite leve, com bom estado geral e sem comorbidade: urina tipo I e urocultura antes, antibiótico oral, reavaliação em 48 horas e orientação dos sinais de piora; sem melhora, avaliação hospitalar para antibiótico venoso", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 79 e 80" },
      { t: "Gestante com bacteriúria ou cistite: urocultura antes, tratar já, ajustar pelo antibiograma e repetir a urocultura 2 semanas depois; repetiu o episódio, profilaxia até o parto", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 354 e 355" },
      { t: "Gestante com pielonefrite: maternidade no mesmo dia — não é tratamento de UBS", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 355 e 356" },
      { t: "Gestante que voltou da internação por pielonefrite: profilaxia até o parto (sempre) e urocultura de controle", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 356" },
      { t: "Homem: urina tipo I e urocultura; tratar como infecção complicada; na pielonefrite, imagem do trato urinário e, se preciso, referência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 77 e 79" },
      "Medidas comportamentais na ITU de repetição: limpar de frente para trás, beber líquido à vontade, não segurar a urina, urinar depois da relação, evitar ducha vaginal e roupa íntima oclusiva; parar espermicida e tratar resíduo urinário",
      { t: "Manejo otimizado da ITU de repetição também inclui tratar a constipação e o estrogênio vaginal na pós-menopausa", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Urologia adulto, 2023, p. 14" },
      "Bacteriúria sem sintoma fora da gestação (idosa, diabética, sonda, pós-menopausa, jovem saudável, lesão medular): não tratar, mesmo se multirresistente",
      { t: "Encaminhar à nefrologia: ITU de repetição mesmo com 6 meses de profilaxia e manejo otimizado, excluída causa anatômica urológica ou ginecológica", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Nefrologia adulto, 2023, p. 7" },
      { t: "Encaminhar à urologia: alteração anatômica ou neurológica do trato urinário que causa ITU de repetição; à ginecologia: alteração anatômica ginecológica (cistocele, prolapso)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Urologia adulto, 2023, p. 14" }
    ]
  },

  erros: {
    fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020",
    itens: [
      { t: "Prescrever norfloxacino para cistite da mulher porque o CAB nº 28 (2012) ainda o põe em 1ª linha — o consenso de 2020 tirou a quinolona da cistite", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 77" },
      { t: "Nitrofurantoína por 3 dias (CAB nº 28) ou por 10 dias na gestante (Protocolo de 2016): o esquema atual é 5 dias", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 354" },
      "Pedir urocultura em toda cistite não complicada",
      "Tratar bacteriúria assintomática fora da gestação (idosa, diabética, sondada)",
      "Pedir urocultura de controle em quem ficou boa (fora da gestação)",
      "Decidir que é ITU pela cor, cheiro ou turvação da urina",
      "Esquecer a urocultura de controle da gestante",
      { t: "Manter nitrofurantoína depois de 37 semanas", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 354" },
      { t: "Tratar pielonefrite de gestante na UBS", f: "MS — Manual de Gestação de Alto Risco, 2022, p. 355" },
      "Mandar beber muita água antes de colher a urocultura",
      "SMX-TMP empírico na cistite, sem antibiograma",
      "Quinolona como profilaxia de ITU de repetição",
      { t: "Prescrever quinolona ou SMX-TMP para a gestante com ITU", f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012, p. 191" },
      { t: "Tratar cistite do homem como não complicada, sem urocultura", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 77" }
    ]
  },

  scores: ["nota-conferencia"]
});

/* Agente demanda (onda APS II, 27/10/2026) — queixa "dermatoses-comuns".
 * Base: TeleCondutas Dermatofitoses 2ª ed. 2025 (p. 7-19), Protocolo de Dermatologia
 * TelessaúdeRS 2023 (Protocolos 4-6, p. 10-12; Quadros 11-18, p. 36-40), CAB nº 28 vol. II
 * 2012 (cap. 2.8, p. 80-91: impetigo, erisipela, escabiose), guia de bolso de DIP 2010
 * (escabiose p. 169-170; candidíase p. 111-113; diferencial de hanseníase p. 209), consenso
 * SBD de dermatite atópica 2019, Manual da População em Situação de Rua 2012 (p. 59-60).
 * O CAB nº 9 (Dermatologia na AB, 2002) é FALTA. Pediculose: sem fonte de tratamento na
 * pasta (VERIFICAR). Páginas por item: demanda.notas.md. */
QUEIXAS.push({
  id: "dermatoses-comuns",
  nome: "Dermatoses comuns — escabiose, micoses, piodermites e dermatites",
  kw: "pele coceira prurido sarna escabiose piolho pediculose micose tinha tinea frieira impingem pano branco pitiriase versicolor candidiase sapinho intertrigo onicomicose micose de unha impetigo erisipela celulite piodermite dermatite atopica eczema dermatite de contato dermatite seborreica caspa permetrina ivermectina cetoconazol miconazol fluconazol itraconazol terbinafina nistatina",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Demanda-Comum",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023",
    itens: [
      { t: "Lesão de pele com comprometimento de via aérea, dispneia, sibilos, sinais de choque, alteração de consciência, angioedema, ou púrpura com febre: atendimento médico imediato — emergência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 91" },
      { t: "Erisipela com comprometimento importante do estado geral ou comorbidade grave: pode precisar de hospitalização", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      { t: "Infecção bacteriana secundária grave e extensa sem resposta ao antibiótico oral: urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 10" },
      { t: "Eczema herpético: vesículas, pústulas, erosões e crostas hemorrágicas espalhando sobre a dermatite atópica, com febre ou linfonodomegalia — urgência", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 10" },
      { t: "Eczema herpético com febre, letargia, cefaleia, náusea ou tontura: internação e aciclovir venoso", f: "SBD — Consenso sobre o tratamento da dermatite atópica, An Bras Dermatol, 2019" },
      { t: "Imunossuprimido ou idoso com dermatite generalizada, descamação intensa e pouco prurido: sarna norueguesa — isolamento e lavagem rigorosa dos fômites", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 169 e 170" },
      { t: "Escabiose com infecção secundária: o estreptococo beta-hemolítico pode levar à glomerulonefrite", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 169" },
      { t: "Para onde remover a piodermite grave (UPA de referência) e qual é a dermatologia de referência em Feira de Santana: confirmar com a USF", v: true }
    ]
  },

  perguntas: {
    fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023",
    itens: [
      { t: "Coceira que piora à noite? Outras pessoas da casa, da creche ou do abrigo com coceira?", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85" },
      "Onde começou, para onde espalhou e há quanto tempo? Outros sintomas junto?",
      "Já usou pomada, creme ou comprimido para isso (inclusive por conta própria, inclusive corticoide)? Qual, por quanto tempo, com que resultado?",
      { t: "Cão ou gato com falha no pelo, ou outras pessoas da casa com lesão? (tinea)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 12" },
      "Diabetes, HIV, uso de corticoide ou de imunossupressor? (micose extensa, candidíase)",
      { t: "Febre, mal-estar, dor e calor na lesão? (piodermite, erisipela)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      { t: "Contato com produto novo antes de piorar — sabonete, perfume, creme perfumado, amaciante, roupa sintética, luva, cosmético? (dermatite de contato)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 36 e 37" },
      { t: "Gestante, amamentando, ou criança abaixo de três meses? (muda o escabicida e o antifúngico)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 86" },
      { t: "Calçado fechado, anda descalço em vestiário, trabalha com água ou umidade? (tinea pedis, candidíase de unha)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 14" },
      { t: "Mora na rua ou em abrigo? (piolho de corpo e de cabeça, Pthirus pubis, escabiose; picada que vira abscesso, impetigo ou celulite)", f: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012, p. 59" }
    ]
  },

  exame: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Pele inteira, com boa luz: entre os dedos, punhos, cotovelos, axilas, cintura, nádegas, genitais e mamilos; na criança, também face, couro cabeludo, pescoço, palmas e plantas", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85" },
      { t: "Escabiose: sulco (saliência linear de cerca de 1 cm com vesícula na ponta), pápulas escoriadas com crosta, nódulos", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85" },
      { t: "Tinea: placa vermelha descamativa com borda elevada e centro mais claro; examinar pés, virilha e unhas, que costumam vir juntos", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 7 e 14" },
      { t: "Couro cabeludo da criança: placa de alopecia com descamação e pontos pretos, ou placa inflamada, exsudativa e dolorosa (quérion) — tinea capitis", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 9" },
      { t: "Impetigo: crosta cor de mel (melicérica) ou bolha flácida, em face e extremidades", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 81" },
      { t: "Erisipela: eritema e edema de limite bem definido, calor, dor, pele em casca de laranja, em geral na perna; procurar a porta de entrada (frieira entre os dedos)", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      "Sinais vitais e estado geral na piodermite",
      { t: "Dermatite atópica: pele seca, áreas de eczema, escoriação; procurar crosta e pus (infecção secundária) ou vesículas agrupadas e erosões (herpes)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 10" },
      { t: "Mancha clara ou avermelhada: testar a sensibilidade — pitiríase versicolor e hanseníase se confundem", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 209" }
    ]
  },

  naoperder: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025",
    itens: [
      { t: "Escabiose: tratar todos os contatos ao mesmo tempo, mesmo sem coceira", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85 e 86" },
      { t: "A coceira e alguns nódulos podem durar semanas depois do escabicida — não é falha; falha é sinal e sintoma depois de 2 semanas; voltar depois de 4 semanas é reinfestação", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 170" },
      { t: "Tinea capitis não sara com creme nem com xampu: o tratamento é SEMPRE oral", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 10" },
      { t: "Micose entre os dedos é porta de entrada da erisipela; tratá-la previne a recidiva", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      "Corticoide tópico em lesão de micose favorece o granuloma de Majocchi (foliculite fúngica profunda, que exige antifúngico oral)",
      { t: "Candidíase extensa ou de repetição: procurar diabetes, hiperidrose, incontinência, corticoide tópico e imunossupressão, inclusive HIV", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 38" },
      "Tinea extensa em imunocomprometido (medicamento, HIV, imunodeficiência) ou refratária ao tratamento otimizado: dermatologia",
      { t: "Mancha com alteração de sensibilidade é hanseníase até prova em contrário (ver a queixa própria)", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 209" }
    ]
  },

  ddx: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Escabiose — prurido noturno, contatos com coceira, sulcos em punhos, dedos e genitais", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85" },
      { t: "Tinea corporis — placa anular pruriginosa, borda ativa e centro claro, crescimento centrífugo", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 7" },
      { t: "Tinea cruris — virilha e face interna das coxas, borda nítida, escroto em geral poupado; diferenciais: psoríase invertida, eritrasma, dermatite seborreica, candidíase inguinal", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 12" },
      { t: "Tinea capitis — diferenciais: dermatite seborreica, psoríase, pitiríase amiantácea, alopecia areata", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 9" },
      { t: "Pitiríase versicolor — manchas claras que podem levar meses para repigmentar, mesmo tratadas", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 39" },
      { t: "Candidíase — dobras (intertrigo), boca (placas brancas removíveis, o sapinho), unha com paroníquia; diferenciais: dermatite seborreica, tinea cruris, eritrasma", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 111 e 112" },
      { t: "Impetigo — crosta melicérica, sobretudo em criança, depois de escoriação ou picada", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 81" },
      { t: "Erisipela — placa vermelha, quente e dolorosa de borda nítida na perna, mais acima dos 60 anos; insuficiência venosa, obesidade e diabetes predispõem", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      { t: "Dermatite de contato — melhora quando se afasta o desencadeante", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 37" },
      { t: "Pediculose, piolho de corpo e Pthirus pubis — prurido em couro cabeludo, corpo ou região pubiana; comuns em quem não tem acesso a banho e lavagem de roupa", f: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012, p. 59" }
    ]
  },

  exames: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025",
    itens: [
      { t: "Dermatoses comuns: diagnóstico clínico; exame micológico direto só na dúvida ou na falha do tratamento", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 7" },
      { t: "Escabiose: clínico; se precisar, raspado do sulco ou da pápula à microscopia", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85" },
      { t: "Impetigo: bacterioscopia e cultura só em alguns casos", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 81" },
      { t: "Erisipela: diagnóstico clínico; a hemocultura raramente é positiva", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      { t: "Antes do antifúngico oral, AST e ALT: terbinafina ou itraconazol diário por mais de 3 a 4 semanas; fluconazol diário (qualquer duração) ou hepatopatia conhecida. Sem doença hepática, não atrasar o início; fluconazol semanal dispensa", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 11 e 14" }
    ]
  },

  farmaco: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025",
    itens: [
      { t: "Escabiose: permetrina 5% do pescoço aos pés, com atenção entre os dedos e sob as unhas, em todos da casa ao mesmo tempo; gestante e bebê abaixo de três meses: enxofre em vaselina (fora da RENAME); para a lactante, a fonte não indica alternativa", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 86" },
      { t: "Permetrina: o CAB nº 28 (2012) manda uma aplicação, sem repetir; o guia de bolso de 2010 diz uma aplicação por noite durante seis noites — as duas fontes do MS divergem", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 169 e 170" },
      { t: "Ivermectina oral quando o tópico não dá — lesões muito eczematizadas, acamado, instituição: não na gestante nem na lactante, só a partir de 5 anos ou 15 kg; pode repetir em 7 dias", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 86" },
      { t: "Escabiose em quem bebe: evitar o monossulfiram (reação com o álcool)", f: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012, p. 59" },
      { t: "Pediculose: a RENAME 2024 tem permetrina loção 1%, mas nenhuma fonte da pasta traz o esquema (o Manual População de Rua, p. 59, cita só ivermectina em dose fixa para as infestações da rua, sem peso nem idade)", v: true },
      "Tinea do corpo, da virilha, dos pés e das mãos: começar pelo tópico (miconazol creme), até a lesão sumir e mais 1 a 2 semanas; oral (terbinafina, itraconazol ou fluconazol) só se extensa ou se o tópico falhou",
      "Nistatina não serve para tinea; cetoconazol por via oral não se usa em micose superficial",
      "Tinea capitis: oral sempre; 1ª escolha griseofulvina (só manipulada) ou terbinafina; fluconazol e itraconazol funcionam menos; xampu de cetoconazol no paciente e nos contatos reduz os esporos; a criança volta à escola quando começa o oral",
      { t: "Pitiríase versicolor: tópico primeiro (azólico creme ou xampu de cetoconazol); oral só se extensa, recorrente ou refratária", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 39" },
      { t: "Candidíase oral: nistatina suspensão ou miconazol gel oral; fluconazol se não responder, se extensa ou recorrente; estomatite por dentadura: tratar também a prótese", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 38" },
      { t: "Candidíase oral na criança: o guia de bolso do MS (2010) manda evitar o fluconazol; o TSRS 2023 dá a dose — decidir com a preceptora", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 112" },
      { t: "Onicomicose por dermatófito (pés, ou mãos junto com os pés): terbinafina é a 1ª escolha sistêmica, itraconazol a 2ª; onicomicose das mãos por Candida (paroníquia, onicólise, trabalho com água): itraconazol, e luva para tarefas com água; nos pés, leve a moderada, esmalte (amorolfina, ciclopirox, fora da RENAME) é opção", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 40" },
      { t: "Impetigo: limpar e tirar as crostas com água e sabão 2 a 3 vezes ao dia (amolecer com vaselina); antibiótico tópico depois da limpeza; sistêmico (cefalexina, preferida se estafilococo) quando há lesões disseminadas e comprometimento do estado geral", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 81" },
      { t: "Antibiótico tópico de impetigo (mupirocina, ácido fusídico) não está na RENAME 2024; a neomicina da RENAME é só a solução otológica", f: "RENAME 2024" },
      { t: "Erisipela: antibiótico oral ou intramuscular (cefalexina; penicilina e eritromicina são as outras opções do CAB nº 28), repouso e perna elevada", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      { t: "Dermatite atópica: a base é hidratante sem perfume no mínimo 2 vezes ao dia; corticoide tópico nas áreas de eczema por 2 a 4 semanas; anti-histamínico sedativo para o prurido", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 36" },
      { t: "Corticoide tópico pela idade e pelo local: baixa potência (dexametasona 0,1% e hidrocortisona 1% creme, os da RENAME) na face e nas dobras; alta e muito alta potência no eczema disidrótico: betametasona (fora da RENAME) ou clobetasol (RENAME, Componente Especializado — não está na USF)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 36 e 37" },
      { t: "Infecção secundária na dermatite atópica: antibiótico oral só com sinal clínico de infecção — cefalosporina é a 1ª escolha, SMX-TMP a seguinte; corticoide oral só em exceção, por até 1 semana", f: "SBD — Consenso sobre o tratamento da dermatite atópica, An Bras Dermatol, 2019" },
      { t: "Dermatite seborreica: xampu de cetoconazol no couro cabeludo; na face e no corpo, azólico creme e/ou corticoide de baixa potência pelo menor tempo possível", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 37" }
    ]
  },

  formulario: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025 · TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023 · MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012 · MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010 · SBD — Consenso sobre o tratamento da dermatite atópica, An Bras Dermatol, 2019",
    farmacos: [
      { id: "permetrina", papel: "escabiose — escolha no adulto e na criança a partir de três meses; todos os contatos juntos" },
      { id: "ivermectina", outra: true, papel: "escabiose quando o tópico não dá (lesão muito eczematizada, acamado, instituição); não na gestante nem na lactante, só a partir de 15 kg", linha: "Pessoa com 15 kg ou mais — escabiose" },
      { id: "nitrato-de-miconazol", papel: "tópico de 1ª linha na tinea do corpo, virilha, pés e mãos, no intertrigo por Candida e na pitiríase versicolor; gel oral no sapinho", linha: "Tinea corporis" },
      { id: "cetoconazol", papel: "xampu: pitiríase versicolor, dermatite seborreica do couro cabeludo, adjuvante da tinea capitis (paciente e contatos); nunca oral" },
      { id: "nistatina", papel: "candidíase oral do adulto, da criança e do bebê; não serve para tinea" },
      { id: "fluconazol", papel: "tinea extensa ou que falhou no tópico, pitiríase versicolor extensa, candidíase que não respondeu ao tópico; 2ª linha na tinea capitis", linha: "Adulto — tinea corporis" },
      { id: "itraconazol", papel: "tinea extensa ou refratária, tinea capitis (2ª linha), pitiríase versicolor extensa, intertrigo por Candida, onicomicose em pulso", linha: "Adulto — tinea corporis" },
      { id: "terbinafina", papel: "1ª escolha oral na tinea capitis e na onicomicose; fora da RENAME", linha: "Adulto — tinea corporis" },
      { id: "cefalexina", papel: "impetigo disseminado ou com estado geral comprometido; erisipela; infecção secundária da dermatite atópica", linha: "Adulto — impetigo" },
      { id: "dexametasona-creme", papel: "eczema da dermatite atópica, de contato e seborreica — baixa potência, serve na face e nas dobras" },
      { id: "hidrocortisona-creme", papel: "as mesmas indicações, baixa potência — a outra opção da RENAME" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012",
    itens: [
      { t: "Escabiose: tratar o paciente e todos os contatos no mesmo dia; roupas de cama, toalhas e roupas lavadas com água quente e passadas a ferro; o que não dá para lavar, fechado em saco plástico por uma semana", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85 e 86" },
      { t: "Escabiose: afastar da escola ou do trabalho até 24 horas depois de terminar o tratamento; procurar casos na família, na rua e na creche", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 170" },
      { t: "Prurido que persiste depois do escabicida: anti-histamínico e corticoide tópico; não repetir o escabicida sem novo sinal de infestação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 86" },
      { t: "Tinea capitis: examinar quem mora junto; xampu antifúngico para os sem lesão; lavar roupa de cama e travesseiro; veterinário para o animal se vários na casa ou recorrência", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 12" },
      { t: "Tinea pedis: secar bem os pés e usar talco, meia de algodão, alternar e arejar o calçado, não andar descalço em vestiário; vesícula ou maceração: compressa de permanganato de potássio diluído", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 17" },
      { t: "Tinea cruris: manter a área seca, cueca de algodão e tratar a tinea pedis junto", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025, p. 13" },
      { t: "Erisipela: repouso e perna elevada; depois do quadro agudo, meia compressiva, tratamento da maceração entre os dedos e da insuficiência venosa para não repetir", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 82" },
      { t: "Dermatite atópica: banho de 5 a 10 minutos, morno, sabonete suave sem perfume, sem bucha; evitar perfume, amaciante e roupa sintética em contato com a pele; conferir a adesão antes de chamar de falha", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 36" },
      { t: "Encaminhar à dermatologia: dermatite atópica grave e extensa, com prejuízo funcional grave, refratária a 1 mês de tratamento otimizado ou com 3 ou mais recidivas em 6 meses; outro eczema grave ou refratário", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 10 e 11" },
      { t: "Encaminhar à dermatologia: micose subcutânea; tinea, candidíase ou pitiríase versicolor extensa em imunocomprometido ou refratária; onicomicose refratária com erisipela no mesmo membro, dor ou dúvida diagnóstica", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 12" },
      { t: "Dermatite atópica com suspeita de alergia alimentar (piora minutos ou horas depois de um alimento, ou quadro extenso refratário com vômito, diarreia ou atraso de crescimento): imunologia ou gastroenterologia pediátrica", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023, p. 10" }
    ]
  },

  erros: {
    fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025",
    itens: [
      { t: "Tratar a escabiose só no paciente, sem os contatos", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 85" },
      { t: "Repetir o escabicida porque a coceira continua", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010, p. 170" },
      { t: "Ivermectina para gestante ou lactante", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012, p. 86" },
      "Passar corticoide (ou creme combinado com corticoide) em lesão de micose",
      "Prescrever nistatina para tinea",
      "Cetoconazol oral para micose de pele",
      "Tratar tinea capitis só com creme ou xampu",
      "Parar o antifúngico tópico no dia em que a lesão some, em vez de manter mais 1 a 2 semanas",
      "Pedir exame micológico antes de tratar uma tinea típica",
      { t: "Prescrever mupirocina ou ácido fusídico contando com a farmácia da USF — não estão na RENAME 2024; comprados, a receita fica retida e vale 10 dias (IN nº 360/2025)", f: "RENAME 2024" },
      { t: "Corticoide oral de rotina na dermatite atópica; dieta restritiva sem alergia alimentar comprovada", f: "SBD — Consenso sobre o tratamento da dermatite atópica, An Bras Dermatol, 2019" },
      { t: "Monossulfiram para escabiose em quem bebe", f: "MS — Manual sobre o Cuidado à Saúde junto à População em Situação de Rua, 2012, p. 59" }
    ]
  },

  scores: ["nota-conferencia", "dose-peso"]
});

/* Agente demanda (onda APS II, 27/10/2026) — queixa "arboviroses".
 * Base: Dengue — diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024 (p. 11-63 e
 * Apêndices G e H, p. 76-77); Chikungunya — manejo clínico, 2ª ed., 2024 (p. 10-50 e
 * Fluxogramas 1 e 2, p. 25 e 69); Guia de Vigilância em Saúde vol. 2, 2024 (Zika, p. 738,
 * 744, 751; notificação, p. 753). O volume da hidratação oral (por kg) mora na linha da dengue
 * do cartão da SRO e a expansão venosa, no cartão do soro fisiológico (revisão I1). O manual de
 * dengue na gestação (2024) é FALTA. */
QUEIXAS.push({
  id: "arboviroses",
  nome: "Arboviroses — dengue, chikungunya e Zika",
  kw: "arbovirose dengue chikungunya chicungunha zika febre artralgia dor nas juntas exantema manchas aedes sinais de alarme prova do laco hidratacao soro grupo a b c d plaquetas hematocrito sangramento choque notificacao",
  tag: "Agudo",
  mod: "aps",
  tema: "A2-Demanda-Comum",
  atualizado: "2026-10-27",

  redflags: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Sinal de alarme — dor abdominal intensa e contínua, vômitos persistentes, acúmulo de líquido (ascite, derrame pleural ou pericárdico), hipotensão postural ou lipotimia, fígado mais de 2 cm abaixo do rebordo, sangramento de mucosa, letargia ou irritabilidade, hematócrito subindo: grupo C — começar o soro na UBS e remover", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 13 e 32" },
      { t: "Sinal de choque — taquicardia, extremidades frias, pulso fraco e filiforme, enchimento capilar acima de 2 segundos, PA convergente (diferencial abaixo de 20 mmHg), taquipneia, oligúria; hipotensão e cianose são tardias: grupo D — expansão rápida na UBS e remoção", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 36" },
      { t: "Hipotensão no adulto é PAS abaixo de 90 ou PAM abaixo de 70 mmHg; no hipertenso, queda de 40% da PA habitual já pode ser hipotensão", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 16 e 45" },
      { t: "Sangramento grave (hematêmese, melena, metrorragia volumosa, sangramento no sistema nervoso) ou disfunção grave de órgão (AST ou ALT acima de 1.000, alteração de consciência, miocardite): dengue grave, grupo D", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 56" },
      { t: "Criança: a piora é súbita e o quadro grave pode ser a primeira manifestação; abaixo de 2 anos, a dor aparece como choro persistente, adinamia e irritabilidade", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 18" },
      { t: "Gestante: taquicardia, hipotensão postural e hemoconcentração aparecem mais tarde e se confundem com a gravidez; com sangramento, perguntar febre nos últimos 7 dias; pensar também em pré-eclâmpsia, HELLP e sepse", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 19, 53 e 54" },
      { t: "Chikungunya com dor torácica, palpitação, arritmia, hipotensão postural, lipotimia, dispneia, cianose, déficit de força, cefaleia intensa, menos urina, sangramento, doença de base descompensada, ou neonato: internação", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 25" },
      { t: "Formigamento ou fraqueza nos membros, ou alteração da consciência (Guillain-Barré, encefalite): retorno imediato; alteração visual: oftalmologia", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024, p. 744" },
      { t: "Para onde remover o grupo C e o D em Feira de Santana, quem aciona o transporte e se a USF tem soro, equipo e acesso venoso para começar a expansão: confirmar", v: true }
    ]
  },

  perguntas: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Em que dia começou a febre? Já baixou? (os sinais de alarme aparecem quando a febre cede, entre o 3º e o 7º dia)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 12 e 23" },
      { t: "Dor de barriga forte e contínua, vômito que não para, tontura ou desmaio ao levantar, sangramento de gengiva ou nariz, muita sonolência ou irritação?", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 13 e 23" },
      { t: "Quantas vezes urinou nas últimas 24 horas e a que horas foi a última vez?", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 23" },
      { t: "Náusea, vômito, diarreia? Está conseguindo beber e comer?", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 23 e 43" },
      { t: "Condição especial ou comorbidade: gestante, menor de 2 anos, maior de 65 anos, hipertensão ou cardiopatia grave, diabetes, DPOC, asma, obesidade, doença hematológica crônica, doença renal crônica, doença ácido-péptica, hepatopatia, doença autoimune?", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 27" },
      { t: "Usa AAS, clopidogrel, varfarina ou outro anticoagulante? Qual anti-hipertensivo?", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 44 e 58 a 63" },
      { t: "Tomou anti-inflamatório, AAS ou corticoide por conta própria?", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 27" },
      { t: "Alguém da casa ou da rua com dengue? Viajou nos últimos 14 dias?", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 23" },
      { t: "Dor nas juntas: quais, inchaço, rigidez de manhã? Consegue andar, pentear o cabelo, pegar objetos? Nota da dor de 0 a 10", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 14, 26 e 32" },
      { t: "Coceira forte, olho vermelho sem secreção, febre baixa ou ausente? (Zika)", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024, p. 738" },
      { t: "Dá para voltar amanhã? Tem quem acompanhe? (sem condição de retorno, é critério de internação)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 43" }
    ]
  },

  exame: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Temperatura, FC, FR, PA deitado e em pé (hipotensão postural), pressão de pulso (PAS menos PAD) e PAM", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 24" },
      { t: "Enchimento capilar, temperatura das extremidades, pulso periférico, consciência (Glasgow), hidratação", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 24" },
      { t: "Pulmão: derrame, taquipneia, Kussmaul; no idoso que recebe volume, crepitação (hiper-hidratação)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 24 e 34" },
      { t: "Abdome: dor à palpação, ascite, hepatomegalia", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 24" },
      { t: "Pele: exantema, petéquias, sangramento espontâneo", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 24" },
      { t: "Prova do laço, se não há sangramento espontâneo: manguito na PA média por 5 minutos no adulto (3 na criança), contar petéquias num quadrado de 2,5 cm — positiva com 20 ou mais (adulto) ou 10 ou mais (criança); costuma dar negativa no obeso e no choque", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 24 e 76" },
      { t: "Peso (o volume de hidratação é por kg)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 30" },
      { t: "Articulações: edema, derrame, mobilidade, crepitação, tenossinovite; na fase crônica, atrofia e deformidade", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 29" }
    ]
  },

  naoperder: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Nos primeiros dias, quando não dá para separar dengue de outra virose, conduzir como dengue", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 22" },
      { t: "A piora vem na queda da febre: retorno no dia em que a febre baixar (ou no 5º dia, se não baixar)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 28" },
      { t: "Idoso: mais risco de choque e também de sobrecarga de volume — hidratar e auscultar o pulmão", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 34" },
      { t: "Hipertenso pode estar em choque com PA ainda 'normal': olhar perfusão periférica e diurese", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 45" },
      { t: "Stent recente em dupla antiagregação, AAS de prevenção secundária, varfarina ou anticoagulante direto: a conduta depende das plaquetas — não suspender por conta própria", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 58 a 63" },
      { t: "Chikungunya no idoso pode vir sem febre e sem dor articular: flexibilizar a suspeita", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 48" },
      { t: "Chikungunya: cerca de metade dos óbitos das formas graves acontece na fase pós-aguda; a descompensação de diabetes, cardiopatia e DRC é causa importante de morte", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 10 e 44" },
      { t: "Chikungunya no fim da gestação: transmissão ao recém-nascido em 50% quando a infecção é até uma semana antes do parto; o bebê adoece a partir do 4º dia", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 45" },
      { t: "Zika na gestante, mesmo sem sintoma, pode passar ao feto (aborto, óbito fetal, malformação): acompanhar pelo protocolo do pré-natal", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024, p. 738 e 744" },
      { t: "Chikungunya: dor neuropática em cerca de 20% — explica a falha da analgesia comum; tromboembolismo pulmonar no paciente imobilizado pela dor e pelo edema", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 17 e 18" }
    ]
  },

  ddx: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Dengue — febre alta por 2 a 7 dias, mialgia e cefaleia intensas, dor retro-orbital, exantema do 3º ao 6º dia, plaquetopenia marcante", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 12 e 21" },
      { t: "Chikungunya — febre alta por 2 a 3 dias, artralgia moderada a intensa com edema articular frequente, exantema do 2º ao 5º dia", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 21" },
      { t: "Zika — febre baixa ou ausente, exantema desde o 1º ou 2º dia, conjuntivite não purulenta em 50 a 90%, linfonodomegalia", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 21" },
      { t: "Leptospirose — exposição a água contaminada, cefaleia intensa, mialgia mais forte na panturrilha, hiperemia ou hemorragia conjuntival, icterícia, oligúria", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 21" },
      { t: "Malária — exposição em área de transmissão, calafrios, icterícia, alteração de consciência, hepato ou esplenomegalia", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 21" },
      { t: "Artrite séptica — grande articulação com derrame, leucocitose", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 21" },
      { t: "Febre reumática — poliartrite migratória de grandes articulações, faringoamigdalite antes", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 21" },
      { t: "Outras febres exantemáticas (sarampo, rubéola, escarlatina, eritema infeccioso), febre com abdome agudo, meningite, sepse e meningococcemia, febre hemorrágica (leptospirose, febre amarela, febre maculosa)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 20" }
    ]
  },

  exames: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Grupo A: exames a critério médico. Grupo B: hemograma obrigatório, colhido na hora, resultado em até 2 horas (no máximo 4), com o paciente em observação e hidratando", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 28 e 31" },
      { t: "Grupo B com hemoconcentração (hematócrito subindo) ou sinal de alarme: passa a grupo C", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 31" },
      { t: "Grupos C e D: hemograma, albumina e transaminases; raio X de tórax e ultrassom de abdome — o exame não atrasa o soro", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 33 e 37" },
      { t: "Confirmação da dengue: NS1 ou RT-PCR até o 5º dia, IgM a partir do 6º — obrigatória para a vigilância, não necessária para a conduta", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 34 e 57" },
      { t: "Chikungunya: RT-PCR até o 5º dia; IgM a partir do 6º dia", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 50" },
      { t: "Dengue e Zika têm reação cruzada na sorologia (flavivírus): suspeita de Zika testa Zika e dengue; negativos, chikungunya", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024, p. 751" },
      { t: "Em uso de antiagregante: plaquetas diárias; em varfarina: plaquetas e TAP; em anticoagulante direto: plaquetas", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 58 a 63" },
      { t: "Chikungunya antes de AINE ou corticoide na fase pós-aguda: hemograma, glicemia de jejum, ureia, creatinina e transaminases", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 35" }
    ]
  },

  farmaco: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Dengue: paracetamol e/ou dipirona; NÃO usar AAS (salicilato), anti-inflamatório nem corticoide", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 28" },
      { t: "Paracetamol em dose acima da recomendada é hepatotóxico: não passar da dose do cartão", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 77" },
      { t: "Grupo C e D: o soro fisiológico começa em qualquer ponto de atenção, inclusive na UBS e durante a transferência, mesmo sem exame", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 33 e 36" },
      { t: "Anti-hipertensivo na dengue: sem alarme e com PA normal, manter (cuidado ao suspender betabloqueador e clonidina: rebote); desidratado com sinal de alarme, suspender diurético e vasodilatador; no choque, suspender os hipotensores", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 45" },
      { t: "AAS (prevenção secundária ou stent antigo) e dupla antiagregação (stent recente): plaquetas acima de 50 mil, manter e contar plaquetas todo dia; entre 30 e 50 mil, manter, em leito de observação; abaixo de 30 mil, suspender, em leito de observação", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 58 a 60" },
      { t: "Varfarina: plaquetas acima de 50 mil, TAP e plaquetas no ambulatório; entre 30 e 50 mil, internar e trocar por heparina não fracionada quando o INR ficar abaixo de 2; abaixo de 30 mil, suspender e internar; não reverter a anticoagulação sem sangramento", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 61 e 62" },
      { t: "Dabigatrana, rivaroxabana, apixabana ou edoxabano: plaquetas de 50 mil ou mais, manter; abaixo de 50 mil, internar para trocar por heparina não fracionada 24 horas depois da última dose. Sangramento moderado ou grave: suspender antiagregante e anticoagulante", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 62 e 63" },
      { t: "Chikungunya fase aguda (até 14 dias): analgésico em horário fixo, nunca 'se necessário'; sem AINE nem AAS (sangramento, lesão renal e pode ser dengue) e sem corticoide; dor intensa: somar opioide fraco", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 31, 32 e 69" },
      { t: "Dipirona: o manual de chikungunya lista gravidez e lactação entre as contraindicações; o paracetamol não tem essa restrição no mesmo quadro", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 33" },
      { t: "Paracetamol em gotas: o manual de dengue conta 20 gotas por mL, o de chikungunya, 15 — na criança, contar pelo conta-gotas do frasco", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 33" },
      { t: "Chikungunya pós-aguda (15 a 90 dias): dor sem inflamação, AINE (depois de excluir dengue) por até 4 semanas, ou analgésico e opioide se o AINE for contraindicado; artrite ou tenossinovite, prednisona com retirada lenta (parar de uma vez dá rebote); dor neuropática (DN4 de 4 ou mais), amitriptilina ou gabapentina, que levam 2 semanas para agir", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 35 e 69" },
      { t: "Prednisona na chikungunya: cautela no diabetes e na hipertensão de difícil controle, na fratura por osteoporose, no transtorno bipolar, na DRC em diálise, no Cushing, na obesidade grau III, na arritmia e na coronariopatia; glicemia e PA no seguimento", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 69" },
      { t: "Chikungunya crônica (mais de 3 meses): hidroxicloroquina de escolha, reavaliada em 8 semanas; metotrexato se falhar; reumatologia se falhar o metotrexato", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 40" },
      { t: "Hidroxicloroquina e metotrexato são do Componente Especializado, vinculados a outros PCDTs (artrite reumatoide, LES): para chikungunya, conferir com a farmácia e a reumatologia", f: "RENAME 2024" },
      { t: "Zika: repouso enquanto houver febre, líquidos, paracetamol ou dipirona, anti-histamínico para o prurido; não usar AAS; com sinal de alarme da dengue, conduzir como dengue", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024, p. 744" }
    ]
  },

  formulario: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024 · MS — Chikungunya: manejo clínico, 2ª ed., 2024 · MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024",
    farmacos: [
      { id: "paracetamol", papel: "febre e dor na dengue (e em toda arbovirose aguda até excluir dengue), na Zika e na chikungunya", linha: "Adulto — dengue" },
      { id: "dipirona", papel: "febre e dor na dengue e na Zika; na chikungunya aguda, em horário fixo; o manual de chikungunya a contraindica na gestante e na lactante", linha: "Adulto — dengue" },
      { id: "sais-de-reidratacao-oral", outra: true, papel: "hidratação oral dos grupos A e B da dengue: volume do dia pelo peso, um terço como SRO", linha: "Adulto (13 anos ou mais) — dengue" },
      { id: "cloreto-de-sodio-0-9", papel: "dengue grupo C ou D: começar a expansão na UBS e manter no transporte; idoso e cardiopata, volume caso a caso", linha: "Dengue grupo C" },
      { id: "codeina", papel: "chikungunya aguda com dor intensa, somada ao analgésico comum (não está na farmácia da USF)", linha: "Adulto — chikungunya" },
      { id: "ibuprofeno", papel: "chikungunya pós-aguda (depois de 14 dias, com dengue excluída), dor sem artrite, por até 4 semanas — nunca na fase aguda nem na dengue", linha: "Adulto — dor (posologia geral" },
      { id: "prednisona", outra: true, papel: "chikungunya pós-aguda com artrite ou tenossinovite; nunca na fase aguda nem na dengue", linha: "Adulto — chikungunya" },
      { id: "amitriptilina", outra: true, papel: "dor neuropática da chikungunya (DN4 de 4 ou mais), na fase pós-aguda ou crônica", linha: "Adulto — dor neuropática da chikungunya" }
    ],
    combos: [],
    proibidos: [],
    dosemuda: []
  },

  conduta: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Notificar todo caso suspeito de dengue, chikungunya e Zika (se a USF foi o primeiro serviço); óbito suspeito: notificação imediata, em até 24 horas", f: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024, p. 753" },
      { t: "Hidratação oral começa já na sala de espera", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 30" },
      { t: "Grupo A (sem alarme, sem sangramento, sem condição especial nem comorbidade): casa, repouso, paracetamol ou dipirona, hidratação oral; retorno no dia em que a febre baixar ou no 5º dia; cartão de acompanhamento preenchido", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 28" },
      { t: "Hidratação oral dos grupos A e B: volume do dia por kg no cartão da SRO (linha da dengue); 1/3 como SRO e o resto com água, suco, chá, água de coco; um terço do volume nas primeiras 4 a 6 horas; escrever o volume na receita ou no cartão de acompanhamento", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 30" },
      { t: "Manter a hidratação durante toda a febre e por 24 a 48 horas depois que ela cede", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 30" },
      { t: "Grupo B (sangramento de pele ou prova do laço positiva, condição especial, comorbidade ou risco social): hemograma na hora e hidratação oral em observação; hematócrito normal, casa com reavaliação clínica e hemograma diários até 48 horas depois da febre", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 31 e 32" },
      { t: "Grupo C (sinal de alarme): soro fisiológico já na UBS e durante a transferência; reavaliar depois da 1ª hora; internação por no mínimo 48 horas", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 33 e 35" },
      { t: "Grupo D (choque, sangramento grave, disfunção de órgão): expansão rápida já, inclusive no transporte, reavaliação a cada 15 a 30 minutos, oxigênio, UTI", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 36 a 39" },
      { t: "Internar também: recusa de líquido ou comida, desconforto respiratório, impossibilidade de retorno (clínica ou social), doença descompensada (diabetes, hipertensão, insuficiência cardíaca, varfarina, asma em crise, anemia falciforme)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 43" },
      { t: "Repelente no doente (na viremia ele infecta o mosquito) e eliminação de criadouros", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 29" },
      { t: "Chikungunya: definir a fase (aguda até 14 dias, pós-aguda de 15 a 90, crônica depois de 3 meses) e o padrão da dor; grupo de risco (gestante, acima de 65, abaixo de 2 anos, comorbidade) ou manifestação extra-articular sem gravidade: observação até exames e reavaliação", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 25 e 31" },
      { t: "Chikungunya: reavaliar a dor em 7 dias; com mais de 10 dias de sintoma e dor persistente, tratar como pós-aguda; fisioterapia em todas as fases", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 41 e 69" },
      { t: "Gestante: mesmo estadiamento e mesmo volume dos demais, com vigilância qualquer que seja a gravidade e cuidado com a hiper-hidratação; deitada, decúbito lateral esquerdo a partir de 20 semanas", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 19 e 53" },
      { t: "Gestante com dengue: o manual de dengue na gestação e no puerpério (2024) não foi baixado — manejo obstétrico específico a conferir", v: true }
    ]
  },

  erros: {
    fonte: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024",
    itens: [
      { t: "Dar AAS, anti-inflamatório ou corticoide na dengue", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 28" },
      { t: "Esperar o resultado do exame ou a vaga para começar o soro no grupo C ou D", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 33 e 36" },
      { t: "Liberar o grupo A sem marcar retorno no dia em que a febre baixar", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 28" },
      { t: "Mandar 'beber bastante líquido' sem escrever o volume por dia", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 30" },
      { t: "Usar a prova do laço para decidir gravidade ou internação (valor preditivo baixo)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 76" },
      { t: "Suspender o AAS ou o clopidogrel de quem tem stent recente sem contar as plaquetas", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 58" },
      { t: "Hiper-hidratar idoso ou cardiopata", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 27 e 34" },
      { t: "Prescrever analgésico 'se dor' na chikungunya aguda", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 32" },
      { t: "Anti-inflamatório ou corticoide na primeira semana de artralgia, antes de excluir dengue", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 31 e 69" },
      { t: "Suspender de uma vez a prednisona da chikungunya (rebote)", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024, p. 35" },
      { t: "Esquecer de notificar o caso suspeito", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024, p. 55" }
    ]
  },

  scores: ["nota-conferencia", "dose-peso"]
});
