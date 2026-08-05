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

QUEIXAS.push({
  id: "saude-mental-aps",
  nome: "Depressão, ansiedade e insônia",
  kw: "humor tristeza anedonia suicidio risco ideacao ansiedade insonia sono isrs fluoxetina caps benzodiazepinico acatisia alcool naltrexona trazodona phq gad matriciamento",
  tag: "Crônico",
  atualizado: "2026-08-05",

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

  conduta: {
    fonte: "medicina-wiki/wiki/saude-mental-fatos.md · guia-bolso-aps.html",
    itens: [
      "Episódio depressivo maior sem risco iminente é manejo da própria UBS: ISRS (fluoxetina 20 mg) + exercício + seguimento próximo",
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

  scores: ["phq9", "gad7"]
});

QUEIXAS.push({
  id: "has-dm2-aps",
  nome: "HAS e DM2 — consulta de crônico",
  kw: "hipertensao pressao arterial has mapa mrpa diabetes dm2 glicemia hba1c metformina risco cardiovascular estatina pe diabetico albuminuria tfg cronico",
  tag: "Crônico",
  atualizado: "2026-08-05",

  redflags: {
    fonte: "VERIFICAR — definir cortes e gatilhos com o protocolo da USF",
    itens: [
      { t: "PA muito elevada com sintoma agudo (dor torácica, dispneia, déficit neurológico, alteração visual): emergência hipertensiva, não ajuste de dose", v: true },
      { t: "Hipoglicemia sintomática — ver card de urgência do guia de bolso", f: "guia-bolso-aps.html" },
      { t: "Hiperglicemia com desidratação, dor abdominal, vômito ou respiração de Kussmaul: suspeitar de cetoacidose", v: true },
      { t: "Úlcera em pé diabético com sinal flogístico, secreção ou odor: não é curativo de rotina", v: true }
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
      "Uso de anti-inflamatório, corticoide ou descongestionante — elevam a PA",
      "Antecedente familiar de doença cardiovascular precoce"
    ]
  },

  exame: {
    fonte: "guia-bolso-aps.html · MS — rastreio anual de complicações no DM",
    itens: [
      "PA medida na técnica correta, com manguito adequado ao braço",
      "Peso, altura e circunferência abdominal",
      "Pés no diabético: inspeção, sensibilidade com monofilamento e pulsos periféricos",
      "Ausculta cardíaca e pulmonar",
      "Pesquisa de edema"
    ]
  },

  naoperder: {
    fonte: "guia-bolso-aps.html",
    itens: [
      "Emergência hipertensiva mascarada de 'pressão alta de rotina'",
      "Pé diabético infectado",
      "Doença renal crônica silenciosa — só aparece se pedir albuminúria e TFG",
      { t: "Hipertensão secundária: suspeitar em início precoce, resistente ao tratamento ou com achado sugestivo", v: true }
    ]
  },

  ddx: {
    fonte: "VERIFICAR — lista a completar com fonte brasileira datada",
    itens: [
      { t: "Hipertensão do jaleco branco e hipertensão mascarada: por isso MAPA e MRPA existem", f: "guia-bolso-aps.html" },
      { t: "Causas secundárias de HAS (renal, endócrina, apneia do sono, medicamentosa)", v: true },
      { t: "DM tipo 1, LADA e diabetes secundário em adulto com apresentação atípica", v: true }
    ]
  },

  exames: {
    fonte: "guia-bolso-aps.html (diagnóstico) · MS — rastreio anual de complicações",
    itens: [
      "HAS — diagnóstico: PA ≥140/90 em 2 ocasiões, ou MAPA vigília ≥135/85, ou MRPA ≥130/80",
      "HAS — estágio 1: 140–159 / 90–99",
      "DM2 — diagnóstico: jejum ≥126 · TOTG 2h ≥200 · HbA1c ≥6,5% · aleatória ≥200 com sintomas",
      "DM2 — exige 2 testes alterados, ou 1 teste + sintomas clássicos",
      "Rastreio anual no DM: pés (monofilamento + pulsos) · fundo de olho · albuminúria e creatinina com TFG",
      { t: "Demais exames de rotina e periodicidade: conferir no protocolo da USF", v: true }
    ]
  },

  conduta: {
    fonte: "guia-bolso-aps.html — cortes calibrados na wiki (junho/2026), diretrizes SBC e SBD",
    itens: [
      "Sempre estratificar risco cardiovascular global: é ele que define a meta e a intensidade do tratamento",
      "DM2 primeira linha: metformina + mudança de estilo de vida",
      "iSGLT2 ou GLP-1 se doença cardiovascular estabelecida, insuficiência cardíaca ou doença renal crônica",
      "Meta geral de HbA1c <7%, individualizando — idoso frágil tolera meta mais alta",
      "Crônico não se acompanha por demanda, se acompanha por risco: agenda programada e busca ativa de faltoso",
      { t: "Meta pressórica por estrato de risco, escolha e dose do anti-hipertensivo: conferir na diretriz vigente e no protocolo da USF", v: true },
      { t: "Indicação e intensidade de estatina: depende de risco CV calculado, que esta ferramenta deliberadamente não calcula ainda", v: true }
    ]
  },

  erros: {
    fonte: "guia-bolso-aps.html",
    itens: [
      "Ajustar dose sem antes checar adesão — a causa mais comum de 'falha terapêutica' é não estar tomando",
      "Diagnosticar HAS com uma única medida de PA",
      "Diagnosticar DM2 com um único exame alterado e sem sintoma",
      "Tratar o número da PA e não estratificar o risco cardiovascular",
      "Acompanhar crônico por demanda espontânea, sem agenda programada nem busca ativa",
      "Esquecer o exame dos pés no diabético porque a consulta foi sobre pressão"
    ]
  },

  scores: ["imc", "ckdepi"]
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
