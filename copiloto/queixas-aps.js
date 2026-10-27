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
  tema: "TC-Clinica-Prevalente",
  atualizado: "2026-10-26",

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
      { t: "Perda súbita de visão, luzes piscando, moscas volantes de repente ou sombra em cortina: oftalmologia imediata", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 45" }
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
      { t: "Hipoglicemia sem sintoma de alerta depois de episódios repetidos: o paciente não percebe e chega já confuso", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 31" }
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
      {
        t: "Diagnóstico há menos de 3 meses e sem fator de risco: 3 meses só de modo de vida e, sem resposta, metformina; nos demais, metformina já. HbA1c acima de 7,5% no diagnóstico: considerar começar combinado",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 21"
      },
      {
        t: "Dapagliflozina pelo SUS: segunda intensificação, com 40 anos ou mais e doença cardiovascular estabelecida, ou homem a partir de 55 e mulher a partir de 60 anos com HAS, dislipidemia ou tabagismo",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 12"
      },
      {
        t: "Insulina quando: falha dos orais, HbA1c acima de 9% ou jejum a partir de 300, sintomas de hiperglicemia aguda. Começa pela NPH ao deitar, somada ao oral (a metformina fica); sulfonilureia só enquanto a insulina for apenas basal",
        f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 25 e 38"
      },
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
      {
        t: "Qual estatina e em que intensidade: está no PCDT de Dislipidemias, que não foi baixado nesta onda",
        v: true
      }
    ]
  },

  formulario: {
    fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026",
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
      { id: "insulina-nph", papel: "a insulina que começa — basal ao deitar, somada ao oral" },
      { id: "insulina-regular", papel: "bolus antes da refeição quando a hiperglicemia é pós-prandial" },
      {
        id: "insulina-glargina",
        papel: "basal prolongada para hipoglicemia noturna ou grave, idoso, DRC; dispensação gradual"
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
      "cro-sulfonilureia-insulina-bolus"
    ],
    dosemuda: []
  },

  conduta: {
    fonte: "guia-bolso-aps.html — cortes calibrados na wiki (junho/2026), diretrizes SBC e SBD",
    itens: [
      { t: "Estratificar o risco cardiovascular uma vez por ano, dos 40 aos 74 anos, com a calculadora HEARTS (OPAS/OMS) — funciona sem colesterol, mas com ele é mais precisa. Fora dessa faixa, calculadora própria para a idade", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 6" },
      { t: "Metas no DM2: HbA1c abaixo de 7,0%, jejum 80–130, 2 h depois da refeição abaixo de 180. No PCDT de DM2, idoso é a partir dos 60 anos (p. 13). Idoso saudável: HbA1c abaixo de 7,5%; comprometido: abaixo de 8,0% (jejum 90–150); muito comprometido: só evitar sintoma de hiper e de hipoglicemia", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 13 e 14" },
      "Crônico não se acompanha por demanda, se acompanha por risco: agenda programada e busca ativa de faltoso",
      { t: "Meta de PA: primeiro abaixo de 140/90 para todos; se tolerar, 130/80 abaixo dos 65 anos, sobretudo com diabetes, DRC, coronariopatia ou AVC. De 65 a 79: PAS entre 130 e 140 (abaixo de 130 se tolerar), PAD abaixo de 80, nunca abaixo de 120/70. Idoso frágil, pelo PCDT (p. 32): 75 anos ou mais, ou ILPI, acamado, internação recente, AVE, demência ou outra doença neurodegenerativa, etilismo, neoplasia terminal, amputação, uma incapacidade funcional básica ou violência doméstica. Nele: monoterapia e meta flexível de 140–149/70–79. Entre 75 e 79 anos o PCDT cai nas duas faixas: na dúvida, vale a do frágil", f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025, p. 21, 22, 32 e 38" },
      { t: "Meta de LDL-c por categoria de risco: abaixo de 115 no baixo, de 70 no alto, de 50 no muito alto e de 40 no extremo", f: "SBC — Rached FH et al., Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose 2025, Arq Bras Cardiol 2025;122(9):e20250640" },
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
      { t: "Pedir glicemia capilar diária a quem só usa antidiabético oral — o benefício demonstrado é para quem usa insulina", f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026, p. 42" }
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
  atualizado: "2026-10-26",

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
      "A dose para fogacho dessas alternativas está no Protocolo 2016, p. 206 (Quadro 4) — não é a dose antidepressiva nem a de outra indicação: conferir lá antes de prescrever",
      "Fitoterápico da RENAME para o climatério: só a isoflavona da soja"
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
    fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016 · MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026 · RENAME 2024",
    farmacos: [
      { id: "estriol", papel: "síndrome geniturinária — estrogênio vaginal do SUS, absorção sistêmica desprezível" },
      { id: "estrogenios-conjugados", papel: "terapia hormonal sistêmica (comprimido da RENAME); creme vaginal absorve mais que o estriol" },
      { id: "estradiol", papel: "terapia hormonal sistêmica — oral, adesivo ou gel; via escolhida pela preferência e pela comorbidade" },
      { id: "progesterona", papel: "proteção do endométrio na mulher com útero em uso de estrogênio" },
      { id: "tibolona", papel: "alternativa que age no útero como terapia combinada contínua, sem estímulo mamário" },
      { id: "medroxiprogesterona", outra: true, papel: "proteção do endométrio na mulher com útero — o progestágeno da RENAME, com mais risco de câncer de mama na terapia combinada" },
      { id: "etinilestradiol-levonorgestrel", outra: true, papel: "perimenopausa com sangramento aumentado ou que ainda precisa de contracepção, se elegível" }
    ],
    combos: ["mul-th-estrogenio-progestageno"],
    proibidos: ["mul-th-tev", "mul-th-cancer-mama"],
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
  atualizado: "2026-10-26",

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
      { t: "Dispneia: opioide em dose menor que a da dor; benzodiazepínico só junto com o opioide. Clonazepam em gotas, começando pelo menor degrau da faixa do Manual (p. 190), não pela dose do cartão de psiquiatria, vigiando sedação e respiração", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Náusea pela causa: química (opioide, uremia) com antidopaminérgico; estase gástrica com procinético; obstrução intestinal maligna com haloperidol e antissecretor, sem procinético", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Delirium: tratar a causa; antipsicótico só para agitação com risco, nunca para prevenir. Benzodiazepínico não, salvo abstinência de álcool ou benzodiazepínico, ou sedação paliativa no delirium refratário", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Haloperidol no delirium (Manual p. 200–201) e na náusea por opioide ou obstrução intestinal maligna (p. 173–174): dose do Manual, não a faixa de psicose do cartão de psiquiatria; idoso começa com metade da dose do jovem; na via SC ou na hipodermóclise (p. 348), só a solução injetável comum — nunca o decanoato (depósito)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Midazolam só na sedação paliativa do sintoma refratário, decidida com paciente, família e equipe (EMAD ou paliativo especializado): esquema no Manual p. 303–305 e hipodermóclise p. 349; a dose do cartão de psiquiatria é de indutor do sono e não serve para sedação nem para dispneia", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Naloxona só na depressão respiratória grave por opioide no paliativo: pequena dose repetida, sem a escalada do SAMU, até frequência respiratória acima de 10, mesmo sem acordar por completo, para não reverter toda a analgesia nem precipitar abstinência (Manual p. 158–159)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Amitriptilina como adjuvante na dor neuropática: o efeito analgésico vem em dose baixa (Manual p. 162) — não subir até a faixa antidepressiva do cartão de psiquiatria; idoso começa abaixo da dose inicial habitual; evitar na arritmia e no glaucoma", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Sororoca: reduzir hidratação e dieta, decúbito lateral, depois anticolinérgico (escopolamina)", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "Sem via oral: hipodermóclise, com no máximo três medicamentos compatíveis por sítio no mesmo horário", f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
      { t: "O que a NT recomenda que a rede tenha: lista essencial conforme a RENAME, referencial para estados e municípios; morfina, codeína, metadona e gabapentina são do Componente Especializado, fora da farmácia da USF", f: "MS — Nota Técnica nº 2/2026-DAET (medicamentos em cuidados paliativos), 2026" }
    ]
  },

  formulario: {
    fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023 · MS — Nota Técnica nº 2/2026-DAET (medicamentos em cuidados paliativos), 2026",
    farmacos: [
      { id: "dipirona", papel: "não opioide do primeiro degrau; mantida ao lado do opioide; vai por hipodermóclise" },
      { id: "paracetamol", papel: "não opioide do primeiro degrau, somável ao opioide" },
      { id: "codeina", papel: "opioide fraco do segundo degrau; também dispneia leve, tosse e diarreia sem fecaloma; muito constipante" },
      { id: "morfina", papel: "opioide forte de escolha e resgate de qualquer opioide forte; dispneia moderada ou intensa" },
      { id: "metoclopramida", papel: "náusea química ou por estase gástrica; evitar na obstrução intestinal maligna" },
      { id: "dexametasona", papel: "adjuvante na dor óssea e na compressão medular; anorexia, náusea, dispneia" },
      { id: "butilbrometo-de-escopolamina", papel: "sororoca e broncorreia; antissecretor na obstrução intestinal maligna; fora da RENAME" },
      { id: "bisacodil", papel: "laxante irritativo de escolha na constipação por opioide; fora da RENAME" },
      { id: "lactulose", papel: "laxante osmótico, associado quando o irritativo não basta" }
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
