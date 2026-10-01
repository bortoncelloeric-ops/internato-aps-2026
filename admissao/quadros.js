/* Quadros da admissão — SÓ DADOS.
   Contrato do esquema em CLAUDE.md desta pasta. Cada quadro marcado no topo da ficha
   acrescenta os blocos dele nas seções da nota; diferenciais, opções de prescrição e
   red flags são LIDOS da queixa do copiloto (campo `queixa`), nunca copiados para cá.
   Exceção: quadro sem a chave `queixa` (o copiloto não tem a queixa) traz redflags e ddx
   próprios, com fonte, e não tem formulário. */

/* Perguntas que valem para mais de um quadro: definidas UMA vez e reusadas pela
   referência (mesmo id, mesmo objeto). O app mostra uma vez só, no primeiro quadro
   marcado. Cada uma fica sempre na MESMA seção em todos os quadros que a usam. */

/* hda — psicose, mania, agitação */
const PSI_SUBST = { tipo: 'tri', id: 'psi-subst', rot: 'Uso de substância antes do quadro', na: 'substância antes do quadro',
  sim: 'uso de substância antes do quadro[: {d}]', nao: 'nega uso de substância antes do quadro',
  det: {tipo: 'texto', ph: 'qual, última dose'} };

/* hda — agitação, delirium */
const DEL_AGUDO = { tipo: 'tri', id: 'del-agudo', rot: 'Início agudo (horas ou dias)', na: 'início agudo',
  sim: 'início agudo, em horas ou dias', nao: 'sem início agudo' };
const DEL_FLUTUACAO = { tipo: 'tri', id: 'del-flutuacao', rot: 'Flutuação ao longo do dia, pior ao entardecer ou à noite', na: 'flutuação',
  sim: 'flutuação ao longo do dia, com piora ao entardecer ou à noite', nao: 'sem flutuação ao longo do dia' };
const DEL_MEDMUDOU = { tipo: 'tri', id: 'del-medmudou', rot: 'Medicação iniciada, suspensa ou alterada nos últimos dias', na: 'mudança recente de medicação',
  sim: 'medicação iniciada, suspensa ou alterada nos últimos dias[: {d}]', nao: 'nega mudança de medicação nos últimos dias',
  det: {tipo: 'texto', ph: 'qual, o que mudou'} };
const DEL_CLINICO = { tipo: 'tri', id: 'del-clinico', rot: 'Febre, infecção, queda / trauma craniano ou dor recentes', na: 'intercorrência clínica recente',
  sim: 'febre, infecção, trauma ou dor recentes[: {d}]', nao: 'nega febre, infecção, trauma ou dor recentes',
  det: {tipo: 'texto', ph: 'qual'} };
/* hda — delirium, deficiência intelectual */
const DEL_ELIMINACAO = { tipo: 'tri', id: 'del-eliminacao', rot: 'Alteração urinária ou intestinal (retenção, constipação)', na: 'eliminações',
  sim: 'alteração urinária ou intestinal[: {d}]', nao: 'nega alteração urinária ou intestinal', det: {tipo: 'texto', ph: 'qual'} };

/* ef — delirium, deficiência intelectual */
const DEL_GLOBO = { tipo: 'tri', id: 'del-globo', rot: 'Globo vesical ou fecaloma', na: 'globo vesical ou fecaloma',
  sim: 'globo vesical ou fecaloma[: {d}]', nao: 'sem globo vesical ou fecaloma', det: {tipo: 'texto', ph: 'qual'} };

/* ef — psicose, agitação, delirium */
/* O uso ou não de antipsicótico fica em "Medicação em uso" e em psi-adesao: a frase não o afirma. */
const PSI_SNM = { tipo: 'tri', id: 'psi-snm', rot: 'Febre com rigidez muscular e confusão (SNM se em uso de antipsicótico)', na: 'febre com rigidez',
  sim: 'febre com rigidez muscular e confusão[: {d}]',
  nao: 'sem febre com rigidez muscular (sem sinais de síndrome neuroléptica maligna)',
  det: {tipo: 'texto', ph: 'antipsicótico em uso, Tax'} };
/* ef — psicose, agitação, delirium */
const DEL_FOCAL = { tipo: 'tri', id: 'del-focal', rot: 'Sinal neurológico focal', na: 'sinal focal',
  sim: 'sinal neurológico focal[: {d}]', nao: 'sem sinal neurológico focal', det: {tipo: 'texto', ph: 'qual'} };
/* ef — agitação, ansiedade, deficiência intelectual. Sinais OBSERVÁVEIS (Maudsley 15ª ed., p. 127,
   tabela de efeitos extrapiramidais): quem não fala não relata inquietação subjetiva. */
const AGI_ACATISIA = { tipo: 'tri', id: 'agi-acatisia', rot: 'Inquietação após antipsicótico recente — relatada ou observada (bate os pés sentado, cruza e descruza as pernas, balança de um pé ao outro, anda sem parar)', na: 'acatisia',
  sim: 'inquietação motora sugestiva de acatisia[: {d}]', nao: 'sem inquietação sugestiva de acatisia',
  det: {tipo: 'texto', ph: 'relatada ou observada; o quê'} };

/* risco — psicose, suicídio */
const PSI_COMANDO = { tipo: 'tri', id: 'psi-comando', rot: 'Alucinação de comando para ferir a si ou a outros', na: 'comando para ferir',
  sim: 'alucinação de comando para ferir a si ou a outros[: {d}]', nao: 'nega alucinação de comando para ferir a si ou a outros',
  det: {tipo: 'texto', ph: 'o que a voz manda'} };

/* subst — álcool, crack / outras drogas, ansiedade, delirium */
const SUB_BZD = { tipo: 'tri', id: 'sub-bzd', rot: 'Benzodiazepínico', na: 'benzodiazepínico',
  sim: 'uso de benzodiazepínico[ ({d})]', nao: 'nega uso de benzodiazepínico', det: {tipo: 'texto', ph: 'qual, quanto / último uso'} };

var QUADROS = [
  {
    id: 'psicose',
    nome: 'Psicose',
    queixa: 'psicose-esquizofrenia',
    fonte: 'Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — psicose',
        grupos: { rev: {pre: 'Revisão de psicose: ', conj: ' e '}, revneg: {pre: 'Nega ', conj: ' e '} },
        itens: [
          { tipo: 'escolha', id: 'psi-episodio', rot: 'Primeiro episódio ou recaída', na: 'primeiro episódio ou recaída', opts: [
            {v: 'primeiro', rot: 'primeiro episódio', frase: 'primeiro episódio psicótico'},
            {v: 'recaida', rot: 'recaída', frase: 'recaída de quadro psicótico prévio'}] },
          { tipo: 'texto', id: 'psi-duracao', rot: 'Há quanto tempo (e o que veio primeiro: isolamento ou vozes)', na: 'duração', fmt: 'sintomas psicóticos há {v}' },
          { tipo: 'tri', id: 'psi-vozes', rot: 'Ouve vozes / chamarem o nome sem ter ninguém', na: 'alucinações auditivas', sim: {g: 'rev', t: 'alucinações auditivas'}, nao: {g: 'revneg', t: 'alucinações auditivas'} },
          { tipo: 'tri', id: 'psi-persec', rot: 'Sente-se seguido, vigiado, falado, comida mexida', na: 'ideias persecutórias',
            sim: {g: 'rev', t: 'ideias de perseguição ou vigilância'}, nao: {g: 'revneg', t: 'ideias de perseguição ou vigilância'} },
          { tipo: 'tri', id: 'psi-influencia', rot: 'Pensamento colocado, tirado ou conhecido pelos outros', na: 'vivência de influência',
            sim: {g: 'rev', t: 'vivência de influência sobre o pensamento'}, nao: {g: 'revneg', t: 'vivência de influência sobre o pensamento'} },
          { tipo: 'tri', id: 'psi-isolamento', rot: 'Isolamento social', sim: {g: 'rev', t: 'isolamento social'}, nao: {g: 'revneg', t: 'isolamento social'} },
          { tipo: 'tri', id: 'psi-negativos', rot: 'Sintomas negativos (abulia, alogia, embotamento)', na: 'sintomas negativos',
            sim: {g: 'rev', t: 'sintomas negativos[ ({d})]'}, nao: {g: 'revneg', t: 'sintomas negativos'},
            det: {tipo: 'escolha', multi: true, opts: [{v: 'abulia', rot: 'abulia'}, {v: 'alogia', rot: 'alogia'}, {v: 'embotamento', rot: 'embotamento afetivo'}]} },
          { tipo: 'tri', id: 'psi-funcao', rot: 'Queda de funcionamento (estudo, trabalho, autocuidado)', na: 'queda de funcionamento',
            sim: 'queda de funcionamento[: {d}]', nao: 'nega queda de funcionamento', det: {tipo: 'texto', ph: 'parou de estudar, trabalhar, sair, cuidar de si'} },
          { tipo: 'escolha', id: 'psi-adesao', rot: 'Antipsicótico — adesão real', na: 'adesão ao antipsicótico', opts: [
            {v: 'sem', rot: 'sem uso', frase: 'sem uso de antipsicótico'},
            {v: 'regular', rot: 'uso regular', frase: 'uso regular do antipsicótico'},
            {v: 'irregular', rot: 'uso irregular', frase: 'uso irregular do antipsicótico'},
            {v: 'suspenso', rot: 'suspenso', frase: 'antipsicótico suspenso'}] },
          PSI_SUBST,
          { tipo: 'tri', id: 'psi-visual', rot: 'Alucinação visual predominante (alarme de causa orgânica)', na: 'alucinação visual predominante',
            sim: 'alucinação visual predominante, alarme para causa orgânica', nao: 'sem predomínio de alucinação visual' },
          { tipo: 'tri', id: 'psi-40', rot: 'Primeiro episódio após os 40 anos (alarme de causa orgânica)', na: 'idade no primeiro episódio',
            sim: 'primeiro episódio após os 40 anos, alarme para causa orgânica', nao: 'primeiro episódio antes dos 40 anos' }
        ]
      },
      ef: { rot: 'Achados dirigidos — psicose', itens: [ DEL_FOCAL, PSI_SNM ] },
      eem: { rot: 'Achados dirigidos — psicose', itens: [
        { tipo: 'tri', id: 'psi-catatonia', rot: 'Catatonia', sim: 'sinais de catatonia[: {d}]', nao: 'sem sinais de catatonia',
          det: {tipo: 'escolha', multi: true, opts: [{v: 'imobilidade', rot: 'imobilidade'}, {v: 'mutismo', rot: 'mutismo'},
            {v: 'negativismo', rot: 'negativismo'}, {v: 'cerea', rot: 'flexibilidade cérea'}]} }
      ]},
      risco: { rot: 'Risco dirigido — psicose', itens: [ PSI_COMANDO ] }
    }
  },

  {
    id: 'mania',
    nome: 'Mania',
    queixa: 'transtorno-bipolar',
    fonte: 'Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — mania',
        grupos: { rev: {pre: 'Revisão de mania: ', conj: ' e '}, revneg: {pre: 'Nega ', conj: ' e '} },
        itens: [
          { tipo: 'tri', id: 'man-humor', rot: 'Humor elevado ou irritável por dias seguidos', na: 'humor elevado ou irritável',
            sim: {g: 'rev', t: 'humor elevado ou irritável'}, nao: {g: 'revneg', t: 'humor elevado ou irritável'} },
          { tipo: 'tri', id: 'man-sono', rot: 'Necessidade de sono reduzida (dorme pouco e acorda disposto)', na: 'necessidade de sono',
            sim: {g: 'rev', t: 'redução da necessidade de sono'}, nao: {g: 'revneg', t: 'redução da necessidade de sono'} },
          { tipo: 'tri', id: 'man-energia', rot: 'Aumento de energia e de atividade', sim: {g: 'rev', t: 'aumento de energia e de atividade'}, nao: {g: 'revneg', t: 'aumento de energia e de atividade'} },
          { tipo: 'tri', id: 'man-grandeza', rot: 'Autoestima inflada, sensação de poder ou missão especial', na: 'grandiosidade',
            sim: {g: 'rev', t: 'grandiosidade'}, nao: {g: 'revneg', t: 'grandiosidade'} },
          { tipo: 'tri', id: 'man-fala', rot: 'Fala acelerada, difícil de interromper', na: 'fala acelerada', sim: {g: 'rev', t: 'fala acelerada'}, nao: {g: 'revneg', t: 'fala acelerada'} },
          { tipo: 'tri', id: 'man-risco', rot: 'Comportamento de risco (gastos, sexo, negócios, viagens)', na: 'comportamento de risco',
            sim: {g: 'rev', t: 'comportamento de risco[ ({d})]'}, nao: {g: 'revneg', t: 'comportamento de risco'},
            det: {tipo: 'escolha', multi: true, opts: [{v: 'gastos', rot: 'gastos incomuns'}, {v: 'sexual', rot: 'indiscrição sexual'},
              {v: 'negocios', rot: 'negócios impulsivos'}, {v: 'viagens', rot: 'viagens'}]} },
          { tipo: 'texto', id: 'man-duracao', rot: 'Duração do episódio (7 dias ou mais, ou internação, sugere mania)', na: 'duração do episódio', fmt: 'episódio atual há {v}' },
          { tipo: 'tri', id: 'man-misto', rot: 'Sintomas depressivos ao mesmo tempo (episódio misto)', na: 'episódio misto',
            sim: 'sintomas depressivos simultâneos, sugerindo episódio misto', nao: 'sem sintomas depressivos simultâneos' },
          { tipo: 'tri', id: 'man-gatilho', rot: 'Antidepressivo, estimulante ou corticoide recente (gatilho)', na: 'gatilho medicamentoso',
            sim: 'uso recente de antidepressivo, estimulante ou corticoide[: {d}]', nao: 'nega uso recente de antidepressivo, estimulante ou corticoide',
            det: {tipo: 'texto', ph: 'qual, desde quando'} },
          { tipo: 'escolha', id: 'man-adesao', rot: 'Estabilizador de humor — adesão real', na: 'adesão ao estabilizador', opts: [
            {v: 'sem', rot: 'sem uso', frase: 'sem uso de estabilizador de humor'},
            {v: 'regular', rot: 'uso regular', frase: 'uso regular do estabilizador de humor'},
            {v: 'irregular', rot: 'uso irregular', frase: 'uso irregular do estabilizador de humor'},
            {v: 'suspenso', rot: 'suspenso', frase: 'estabilizador de humor suspenso'}] },
          { tipo: 'texto', id: 'man-episodios', rot: 'Episódios prévios (quantos, de cada polo, por ano)', na: 'episódios prévios', fmt: 'episódios prévios: {v}' },
          { tipo: 'tri', id: 'man-familia', rot: 'Bipolaridade na família', na: 'história familiar',
            sim: 'história familiar de transtorno bipolar[: {d}]', nao: 'nega história familiar de transtorno bipolar',
            det: {tipo: 'texto', ph: 'quem, resposta ao lítio'} }
        ]
      },
      ef: { rot: 'Achados dirigidos — mania', itens: [
        { tipo: 'tri', id: 'man-litio', rot: 'Sinais de intoxicação por lítio (tremor grosseiro, ataxia, disartria)', na: 'sinais de intoxicação por lítio',
          sim: 'sinais de intoxicação por lítio[: {d}]', nao: 'sem sinais de intoxicação por lítio',
          det: {tipo: 'escolha', multi: true, opts: [{v: 'tremor', rot: 'tremor grosseiro'}, {v: 'ataxia', rot: 'ataxia'}, {v: 'disartria', rot: 'disartria'}]} }
      ]}
    }
  },

  {
    id: 'depressao',
    nome: 'Depressão',
    queixa: 'depressao-maior',
    fonte: 'Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — humor',
        grupos: { rev: {pre: 'Revisão de humor: ', conj: ' e '}, revneg: {pre: 'Nega ', conj: ' e '} },
        itens: [
          { tipo: 'tri', id: 'humor', rot: 'Humor deprimido', sim: {g: 'rev', t: 'humor deprimido'}, nao: {g: 'revneg', t: 'humor deprimido'} },
          { tipo: 'tri', id: 'anedonia', rot: 'Perda de interesse ou prazer', sim: {g: 'rev', t: 'perda de interesse ou prazer'}, nao: {g: 'revneg', t: 'perda de interesse ou prazer'} },
          { tipo: 'tri', id: 'insonia', rot: 'Insônia', sim: {g: 'rev', t: 'insônia[ {d}]'}, nao: {g: 'revneg', t: 'insônia'},
            det: {tipo: 'escolha', multi: true, opts: [{v: 'inicial', rot: 'inicial'}, {v: 'manutencao', rot: 'de manutenção'}, {v: 'precoce', rot: 'com despertar precoce'}]} },
          { tipo: 'tri', id: 'apetite', rot: 'Alteração de apetite', sim: {g: 'rev', t: 'alteração de apetite'}, nao: {g: 'revneg', t: 'alteração de apetite'},
            det: {tipo: 'escolha', substitui: true, opts: [{v: 'reduzido', rot: 'reduzido', frase: 'apetite reduzido'}, {v: 'aumentado', rot: 'aumentado', frase: 'apetite aumentado'}]} },
          { tipo: 'tri', id: 'fadiga', rot: 'Fadiga / perda de energia', na: 'fadiga', sim: {g: 'rev', t: 'fadiga'}, nao: {g: 'revneg', t: 'fadiga'} },
          { tipo: 'tri', id: 'culpa', rot: 'Culpa excessiva / sensação de ser um peso', na: 'culpa excessiva', sim: {g: 'rev', t: 'culpa excessiva'}, nao: {g: 'revneg', t: 'culpa excessiva'} },
          { tipo: 'tri', id: 'bipolar', rot: 'Período prévio de humor elevado ou pouca necessidade de sono (rastreio de bipolar)',
            na: 'rastreio de bipolaridade',
            sim: 'relata período prévio de humor elevado ou pouca necessidade de sono[: {d}]',
            nao: 'nega período prévio de humor elevado ou pouca necessidade de sono', det: {tipo: 'texto', ph: 'quando, quanto tempo'} },
          { tipo: 'tri', id: 'psicose', rot: 'Sintomas psicóticos', na: 'sintomas psicóticos', sim: 'refere sintomas psicóticos[: {d}]', nao: 'nega sintomas psicóticos',
            det: {tipo: 'texto', ph: 'quais'} }
        ]
      }
    }
  },

  {
    id: 'suicidio',
    nome: 'Suicídio / tentativa',
    queixa: 'risco-suicidio',
    fonte: 'medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · APA — Practice Guidelines for the Psychiatric Evaluation of Adults, Am J Psychiatry, 2015',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — suicídio / tentativa',
        itens: [
          { tipo: 'tri', id: 'sui-atual', rot: 'Tentativa de suicídio atual (motivo desta vinda)', na: 'tentativa atual',
            sim: 'tentativa de suicídio atual[: {d}]', nao: 'nega tentativa de suicídio atual',
            det: {tipo: 'texto', ph: 'método, horário; se ingestão: o quê e quanto', na: 'método e horário da tentativa'}, sub: [
              { id: 'sui-planejada', rot: 'Planejada', na: 'planejamento', sim: 'tentativa planejada', nao: 'tentativa sem planejamento' },
              { id: 'sui-intencao', rot: 'Intenção de morrer no ato', na: 'intenção de morrer no ato', sim: 'com intenção de morrer no ato', nao: 'nega intenção de morrer no ato' },
              { id: 'sui-dano', rot: 'Repercussão clínica (até o momento)', na: 'repercussão clínica', sim: 'com repercussão clínica', nao: 'sem repercussão clínica até o momento' },
              { id: 'sui-intox', rot: 'Sob efeito de álcool ou substância', na: 'álcool ou substância no ato',
                sim: 'sob efeito de álcool ou substância no ato', nao: 'nega uso de álcool ou substância no ato' },
              { id: 'sui-arrepende', rot: 'Arrependimento por ter tentado', na: 'arrependimento', sim: 'refere arrependimento da tentativa', nao: 'sem arrependimento da tentativa' }] },
          { tipo: 'tri', id: 'sui-desesperanca', rot: 'Desesperança', sim: 'refere desesperança', nao: 'nega desesperança' },
          { tipo: 'tri', id: 'sui-perda', rot: 'Perda recente (luto, separação, desemprego, exposição pública, doença grave)', na: 'perda recente',
            sim: 'perda recente[: {d}]', nao: 'nega perda recente', det: {tipo: 'texto', ph: 'qual'} },
          { tipo: 'tri', id: 'sui-motivos', rot: 'Motivos para viver (o que te impede?)', na: 'motivos para viver',
            sim: 'refere motivos para viver[: {d}]', nao: 'não identifica motivos para viver', det: {tipo: 'texto', ph: 'quais'} },
          { tipo: 'tri', id: 'sui-autolesao', rot: 'Autolesão sem intenção de morrer', na: 'autolesão sem intenção suicida',
            sim: 'autolesão sem intenção suicida[: {d}]', nao: 'nega autolesão sem intenção suicida', det: {tipo: 'texto', ph: 'como, desde quando'} },
          { tipo: 'tri', id: 'sui-calma', rot: 'Calma súbita após período de sofrimento intenso', na: 'calma súbita',
            sim: 'calma súbita após período de sofrimento intenso', nao: 'sem calma súbita após período de sofrimento intenso' }
        ]
      },
      risco: { rot: 'Risco dirigido — suicídio / tentativa', itens: [
        { tipo: 'tri', id: 'sui-meiocasa', rot: 'Outro meio letal acessível em casa (arma: ver Heteroagressividade)', na: 'outro meio letal em casa',
          sim: 'meio letal acessível em casa[: {d}]', nao: 'nega medicação estocada, agrotóxico ou outro meio letal em casa',
          det: {tipo: 'escolha', multi: true, opts: [{v: 'medicacao', rot: 'medicação estocada'},
            {v: 'agrotoxico', rot: 'agrotóxico'}, {v: 'outro', rot: 'outro meio'}]} },
        { tipo: 'tri', id: 'sui-familia', rot: 'Suicídio em familiar biológico', na: 'suicídio na família',
          sim: 'suicídio em familiar biológico[: {d}]', nao: 'nega suicídio na família', det: {tipo: 'texto', ph: 'quem'} },
        PSI_COMANDO
      ]}
    }
  },

  {
    id: 'agitacao',
    nome: 'Agitação',
    queixa: 'agitacao-psicomotora',
    fonte: 'Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · Maudsley Prescribing Guidelines, 15ª ed., 2025',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — agitação',
        itens: [
          DEL_AGUDO,
          DEL_FLUTUACAO,
          { tipo: 'tri', id: 'agi-previo', rot: 'Já aconteceu antes', na: 'episódio prévio',
            sim: 'episódio semelhante prévio[: {d}]', nao: 'sem episódio semelhante prévio', det: {tipo: 'texto', ph: 'quando'} },
          { tipo: 'tri', id: 'agi-gatilho', rot: 'Desencadeante identificado', na: 'desencadeante',
            sim: 'desencadeante identificado[: {d}]', nao: 'sem desencadeante identificado', det: {tipo: 'texto', ph: 'qual'} },
          PSI_SUBST,
          DEL_MEDMUDOU,
          DEL_CLINICO
        ]
      },
      ef: { rot: 'Achados dirigidos — agitação', itens: [
        { tipo: 'escolha', id: 'agi-pupilas', rot: 'Pupilas', na: 'pupilas', opts: [
          {v: 'normal', rot: 'sem alteração', frase: 'pupilas sem alteração', so: true},
          {v: 'midriase', rot: 'midríase', frase: 'midríase'},
          {v: 'miose', rot: 'miose', frase: 'miose'}] },
        DEL_FOCAL,
        AGI_ACATISIA,
        PSI_SNM
      ]},
      eem: { rot: 'Achados dirigidos — agitação', itens: [
        { tipo: 'texto', id: 'agi-comport', rot: 'O que se vê (anda sem parar, gesticula, eleva a voz, ameaça, agride)', na: 'descrição do comportamento',
          fmt: 'comportamento observado: {v}' }
      ]},
      hetero: { rot: 'Manejo da agitação', itens: [
        { tipo: 'tri', id: 'agi-verbal', rot: 'Abordagem verbal tentada', na: 'abordagem verbal',
          sim: 'abordagem verbal tentada[: {d}]', nao: 'abordagem verbal não tentada', det: {tipo: 'texto', ph: 'resposta'} },
        { tipo: 'tri', id: 'agi-oral', rot: 'Medicação oral ofertada', na: 'oferta oral',
          sim: 'medicação oral ofertada[: {d}]', nao: 'sem oferta de medicação oral', det: {tipo: 'texto', ph: 'aceitou ou recusou'} },
        { tipo: 'tri', id: 'agi-contencao', rot: 'Contenção mecânica', na: 'contenção mecânica',
          sim: 'contenção mecânica[: {d}]', nao: 'sem contenção mecânica',
          det: {tipo: 'texto', ph: 'o que se tentou antes, indicação, horário de início'} }
      ]}
    }
  },

  {
    id: 'alcool',
    nome: 'Álcool',
    queixa: 'alcool-transtorno-uso',
    fonte: 'MS — CAB nº 34, Saúde Mental, 2013 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — álcool',
        grupos: { ant: {pre: 'Antecedente de ', conj: ' e '}, antneg: {pre: 'Nega antecedente de ', conj: ' e '} },
        itens: [
          { tipo: 'tri', id: 'alc-sintomas', rot: 'Sintomas de abstinência desde a última dose', na: 'sintomas de abstinência',
            sim: 'sintomas de abstinência desde a última dose[: {d}]', nao: 'nega sintomas de abstinência desde a última dose',
            det: {tipo: 'escolha', multi: true, opts: [{v: 'tremor', rot: 'tremor'}, {v: 'sudorese', rot: 'sudorese'},
              {v: 'nausea', rot: 'náusea'}, {v: 'alucinacao', rot: 'alucinação visual ou tátil'},
              {v: 'convulsao', rot: 'convulsão'}, {v: 'confusao', rot: 'confusão / desorientação', frase: 'confusão ou desorientação'}]} },
          { tipo: 'tri', id: 'alc-convulsao', rot: 'Convulsão em abstinência ANTERIOR', na: 'convulsão em abstinência anterior',
            sim: {g: 'ant', t: 'convulsão em abstinência'}, nao: {g: 'antneg', t: 'convulsão em abstinência'} },
          { tipo: 'tri', id: 'alc-dt', rot: 'Delirium tremens em abstinência ANTERIOR', na: 'delirium tremens anterior',
            sim: {g: 'ant', t: 'delirium tremens'}, nao: {g: 'antneg', t: 'delirium tremens'} },
          { tipo: 'tri', id: 'alc-manha', rot: 'Bebe pela manhã para aliviar', na: 'beber pela manhã',
            sim: 'bebe pela manhã para aliviar sintomas', nao: 'nega beber pela manhã para aliviar sintomas' },
          { tipo: 'tri', id: 'alc-tolerancia', rot: 'Precisa de mais para o mesmo efeito (tolerância)', na: 'tolerância',
            sim: 'refere tolerância', nao: 'nega tolerância' },
          { tipo: 'tri', id: 'alc-tentou', rot: 'Já tentou parar', na: 'tentativas de parar',
            sim: 'tentativas prévias de parar[: {d}]', nao: 'nega tentativas prévias de parar', det: {tipo: 'texto', ph: 'o que aconteceu, o que ajudou'} },
          { tipo: 'tri', id: 'alc-prejuizo', rot: 'Prejuízo associado ao uso', na: 'prejuízo associado',
            sim: 'prejuízo associado ao uso[: {d}]', nao: 'nega prejuízo associado ao uso',
            det: {tipo: 'escolha', multi: true, opts: [{v: 'trabalho', rot: 'trabalho'}, {v: 'familia', rot: 'família'},
              {v: 'transito', rot: 'trânsito'}, {v: 'saude', rot: 'saúde'}, {v: 'justica', rot: 'justiça'}]} },
          { tipo: 'tri', id: 'alc-nutricao', rot: 'Alimentação precária ou perda de peso', na: 'alimentação e peso',
            sim: 'alimentação precária ou perda de peso', nao: 'nega alimentação precária ou perda de peso',
            det: {tipo: 'escolha', multi: true, substitui: true, opts: [{v: 'alimentacao', rot: 'alimentação precária'}, {v: 'peso', rot: 'perda de peso'}]} },
          { tipo: 'escolha', id: 'alc-meta', rot: 'O que a pessoa quer agora', na: 'objetivo do paciente', tpl: 'objetivo do paciente: {d}', opts: [
            {v: 'abstinencia', rot: 'abstinência', frase: 'abstinência'},
            {v: 'reducao', rot: 'redução', frase: 'redução do uso'},
            {v: 'alivio', rot: 'só parar de passar mal', frase: 'aliviar o mal-estar atual'}] }
        ]
      },
      subst: { rot: 'Outras substâncias — álcool', itens: [ SUB_BZD ] },
      ef: { rot: 'Achados dirigidos — álcool', itens: [
        { tipo: 'tri', id: 'alc-wernicke', rot: 'Sinais de Wernicke (confusão, ataxia, oftalmoplegia / nistagmo)', na: 'sinais de Wernicke',
          sim: 'sinais de Wernicke[: {d}]', nao: 'sem sinais de Wernicke',
          det: {tipo: 'escolha', multi: true, opts: [{v: 'confusao', rot: 'confusão'}, {v: 'ataxia', rot: 'ataxia'},
            {v: 'ocular', rot: 'oftalmoplegia ou nistagmo'}]} },
        { tipo: 'tri', id: 'alc-hepato', rot: 'Estigmas de hepatopatia', na: 'estigmas de hepatopatia',
          sim: 'estigmas de hepatopatia[: {d}]', nao: 'sem estigmas de hepatopatia',
          det: {tipo: 'escolha', multi: true, opts: [{v: 'ictericia', rot: 'icterícia'}, {v: 'ascite', rot: 'ascite'},
            {v: 'aranhas', rot: 'aranhas vasculares'}, {v: 'ginecomastia', rot: 'ginecomastia'}, {v: 'eritema', rot: 'eritema palmar'}]} }
      ]}
    }
  },

  {
    id: 'substancias',
    nome: 'Crack / outras drogas',
    queixa: 'outras-substancias',
    fonte: 'Maudsley Prescribing Guidelines, 15ª ed., 2025 · AMB/ABP — Abuso e Dependência dos Opioides e Opiáceos, 2012 · SMS-SP — Manual de Toxicologia Clínica, 2017',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — crack / outras drogas',
        itens: [
          { tipo: 'tri', id: 'sub-mistura', rot: 'Misturou álcool, benzodiazepínico ou opioide', na: 'uso combinado',
            sim: 'uso combinado com álcool, benzodiazepínico ou opioide[: {d}]', nao: 'nega uso combinado com álcool, benzodiazepínico ou opioide',
            det: {tipo: 'texto', ph: 'qual'} },
          { tipo: 'tri', id: 'sub-torax', rot: 'Dor torácica, palpitação ou síncope após o uso', na: 'dor torácica após o uso',
            sim: 'sintoma cardiovascular após o uso[: {d}]', nao: 'nega dor torácica, palpitação ou síncope após o uso',
            det: {tipo: 'escolha', multi: true, na: 'qual sintoma cardiovascular', opts: [{v: 'dor', rot: 'dor torácica'}, {v: 'palpitacao', rot: 'palpitação'}, {v: 'sincope', rot: 'síncope'}]} },
          { tipo: 'tri', id: 'sub-convulsao', rot: 'Convulsão após o uso', na: 'convulsão após o uso',
            sim: 'convulsão após o uso', nao: 'nega convulsão após o uso' },
          { tipo: 'tri', id: 'sub-metadona', rot: 'Tratamento com metadona ou buprenorfina', na: 'metadona ou buprenorfina',
            sim: 'em tratamento com metadona ou buprenorfina[: {d}]', nao: 'nega tratamento com metadona ou buprenorfina',
            det: {tipo: 'texto', ph: 'última tomada supervisionada'} }
        ]
      },
      subst: { rot: 'Outras substâncias — crack / outras drogas', itens: [
        { tipo: 'tri', id: 'sub-opioide', rot: 'Opioide (ilícito, metadona, fentanil)', na: 'opioide',
          sim: 'uso de opioide[ ({d})]', nao: 'nega uso de opioide', det: {tipo: 'texto', ph: 'qual, quanto / último uso'} },
        SUB_BZD
      ]},
      ef: { rot: 'Achados dirigidos — crack / outras drogas', itens: [
        { tipo: 'escolha', id: 'sub-toxidrome', rot: 'Toxidrome', na: 'toxidrome', opts: [
          {v: 'nenhum', rot: 'sem toxidrome', frase: 'sem toxidrome evidente', so: true},
          {v: 'simpato', rot: 'simpatomimético', frase: 'toxidrome simpatomimético'},
          {v: 'opioide', rot: 'opioide', frase: 'toxidrome opioide'}] },
        { tipo: 'tri', id: 'sub-excitacao', rot: 'Estado de excitação (agitação violenta, hipertermia, luta contra contenção)', na: 'estado de excitação',
          sim: 'sinais de estado de excitação[: {d}]', nao: 'sem sinais de estado de excitação', det: {tipo: 'texto', ph: 'quais'} },
        { tipo: 'tri', id: 'sub-queimadura', rot: 'Queimadura em lábio ou mão (cachimbo)', na: 'queimadura de cachimbo',
          sim: 'queimadura em lábio ou mão', nao: 'sem queimadura em lábio ou mão' },
        { tipo: 'tri', id: 'sub-injecao', rot: 'Marcas de injeção', sim: 'marcas de injeção[: {d}]', nao: 'sem marcas de injeção', det: {tipo: 'texto', ph: 'onde'} },
        { tipo: 'tri', id: 'sub-septo', rot: 'Perfuração de septo nasal', na: 'septo nasal', sim: 'perfuração de septo nasal', nao: 'sem perfuração de septo nasal' }
      ]}
    }
  },

  {
    id: 'ansiedade',
    nome: 'Ansiedade / pânico',
    queixa: 'ansiedade-panico',
    fonte: 'Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03) · Maudsley Prescribing Guidelines, 15ª ed., 2025',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — ansiedade / pânico',
        grupos: { rev: {pre: 'Revisão de ansiedade: ', conj: ' e '}, revneg: {pre: 'Nega ', conj: ' e '} },
        itens: [
          { tipo: 'escolha', id: 'ans-padrao', rot: 'Padrão da ansiedade', na: 'padrão da ansiedade', opts: [
            {v: 'crises', rot: 'em crises', frase: 'ansiedade em crises, com começo e fim'},
            {v: 'constante', rot: 'constante', frase: 'ansiedade constante, sobre várias coisas'},
            {v: 'ambos', rot: 'constante + crises', frase: 'ansiedade constante, com crises sobrepostas'}] },
          { tipo: 'tri', id: 'ans-crise', rot: 'Crise com pico em minutos', na: 'crise com pico em minutos',
            sim: 'crises com pico em minutos[, com {d}]', nao: 'nega crises com pico em minutos',
            det: {tipo: 'escolha', multi: true, opts: [{v: 'palpitacao', rot: 'palpitação'}, {v: 'dispneia', rot: 'falta de ar'},
              {v: 'sudorese', rot: 'sudorese'}, {v: 'tremor', rot: 'tremor'}, {v: 'tontura', rot: 'tontura'},
              {v: 'parestesia', rot: 'formigamento'}, {v: 'morte', rot: 'medo de morrer ou de enlouquecer'}]} },
          { tipo: 'tri', id: 'ans-antecip', rot: 'Medo de ter nova crise', na: 'ansiedade antecipatória',
            sim: {g: 'rev', t: 'medo de nova crise'}, nao: {g: 'revneg', t: 'medo de nova crise'} },
          { tipo: 'tri', id: 'ans-agorafobia', rot: 'Deixou de sair, usar transporte, ficar só ou em lugar cheio', na: 'esquiva agorafóbica',
            sim: {g: 'rev', t: 'esquiva de lugares ou situações por medo'}, nao: {g: 'revneg', t: 'esquiva de lugares ou situações por medo'} },
          { tipo: 'tri', id: 'ans-social', rot: 'Medo de ser avaliado ou passar vergonha, some em casa', na: 'medo de avaliação social',
            sim: {g: 'rev', t: 'medo de avaliação social'}, nao: {g: 'revneg', t: 'medo de avaliação social'} },
          { tipo: 'tri', id: 'ans-preocupacao', rot: 'Preocupação difícil de controlar na maior parte dos dias', na: 'preocupação difícil de controlar',
            sim: {g: 'rev', t: 'preocupação difícil de controlar na maior parte dos dias[ ({d})]'},
            nao: {g: 'revneg', t: 'preocupação difícil de controlar'}, det: {tipo: 'texto', ph: 'há quanto tempo'} },
          { tipo: 'tri', id: 'ans-clinico', rot: 'Dor torácica, dispneia ou síncope', na: 'dor torácica, dispneia ou síncope',
            sim: 'dor torácica, dispneia ou síncope[: {d}]', nao: 'nega dor torácica, dispneia ou síncope', det: {tipo: 'texto', ph: 'qual, quando'} },
          { tipo: 'tri', id: 'ans-servicos', rot: 'Já procurou vários serviços pelo sintoma físico', na: 'procuras repetidas',
            sim: 'procuras repetidas a serviços pelo sintoma físico[: {d}]', nao: 'nega procuras repetidas a serviços', det: {tipo: 'texto', ph: 'quantos'} }
        ]
      },
      subst: { rot: 'Outras substâncias — ansiedade', itens: [
        { tipo: 'tri', id: 'ans-estimulante', rot: 'Cafeína, energético ou estimulante', na: 'cafeína ou estimulante',
          sim: 'uso de cafeína, energético ou estimulante[ ({d})]', nao: 'nega uso de cafeína, energético ou estimulante',
          det: {tipo: 'texto', ph: 'quanto, última dose'} },
        SUB_BZD
      ]},
      ef: { rot: 'Achados dirigidos — ansiedade', itens: [
        { tipo: 'tri', id: 'ans-ausculta', rot: 'Ausculta cardíaca ou pulmonar alterada', na: 'ausculta',
          sim: 'ausculta cardíaca ou pulmonar alterada[: {d}]', nao: 'ausculta cardíaca e pulmonar sem alteração', det: {tipo: 'texto', ph: 'o quê'} },
        { tipo: 'tri', id: 'ans-tireoide', rot: 'Sinais tireoidianos (bócio, tremor fino, pele quente)', na: 'sinais tireoidianos',
          sim: 'sinais tireoidianos[: {d}]', nao: 'sem sinais tireoidianos', det: {tipo: 'texto', ph: 'quais'} },
        AGI_ACATISIA
      ]}
    }
  },

  {
    id: 'delirium',
    nome: 'Delirium',
    queixa: 'delirium',
    fonte: 'Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019',
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — delirium',
        itens: [
          { tipo: 'texto', id: 'del-basal', rot: 'Como estava há uma semana (pergunte ao acompanhante)', na: 'estado prévio', fmt: 'estado prévio (há uma semana, segundo o acompanhante): {v}' },
          DEL_AGUDO,
          DEL_FLUTUACAO,
          DEL_MEDMUDOU,
          DEL_CLINICO,
          DEL_ELIMINACAO,
          { tipo: 'tri', id: 'del-sono', rot: 'Privação de sono', sim: 'privação de sono', nao: 'nega privação de sono' },
          { tipo: 'tri', id: 'del-demencia', rot: 'Demência prévia', sim: 'demência prévia', nao: 'sem demência prévia' },
          { tipo: 'escolha', id: 'del-causa', rot: 'Causa orgânica suspeita', na: 'causa orgânica suspeita', multi: true,
            tpl: 'causa orgânica suspeita: {d}', opts: [
            {v: 'hipoglicemia', rot: 'hipoglicemia'}, {v: 'hipoxia', rot: 'hipóxia'}, {v: 'infeccao', rot: 'infecção / sepse', frase: 'infecção ou sepse'},
            {v: 'retencao', rot: 'retenção / fecaloma', frase: 'retenção urinária ou fecaloma'},
            {v: 'abstinencia', rot: 'abstinência', frase: 'abstinência de álcool ou benzodiazepínico'},
            {v: 'medicamento', rot: 'medicamento', frase: 'medicamento'}, {v: 'tce', rot: 'trauma craniano'}, {v: 'dor', rot: 'dor'}] }
        ]
      },
      subst: { rot: 'Outras substâncias — delirium', itens: [ SUB_BZD ] },
      ef: { rot: 'Achados dirigidos — delirium', itens: [
        DEL_FOCAL,
        { tipo: 'tri', id: 'del-nuca', rot: 'Rigidez de nuca', sim: 'rigidez de nuca', nao: 'sem rigidez de nuca' },
        DEL_GLOBO,
        PSI_SNM
      ]},
      eem: { rot: 'Achados dirigidos — delirium', itens: [
        { tipo: 'tri', id: 'del-desatencao', rot: 'Desatenção em tarefa (meses do ano de trás para frente, MUNDO ao contrário)', na: 'atenção em tarefa',
          sim: 'desatenção em tarefa[: {d}]', nao: 'sem desatenção em tarefa', det: {tipo: 'texto', ph: 'qual tarefa, resultado'} },
        { tipo: 'tri', id: 'del-hipoativo', rot: 'Apresentação hipoativa (quieto, retraído; sonolência vai em Consciência)', na: 'apresentação hipoativa',
          sim: 'apresentação hipoativa, quiet{a} e retraíd{a}', nao: 'sem apresentação hipoativa' }
      ]}
    }
  },


  /* Sem queixa no copiloto: red flags e ddx moram aqui, com fonte (Maudsley 15ª ed. pp. 127, 471,
     605, 623, 824-827; PCDT TEA agressivo seções 5.2, 5.3 e 6.1; Dalgalarrondo 3ª ed.; Portaria
     GM/MS nº 5.201/2024). Item cuja única fonte fala de TEA diz isso no texto ("dado de TEA"); a
     cautela da fonte ("opinião difundida", "há preocupação") fica no texto. Sem formulário: a
     prescrição oferece só "Outros fármacos" e o racional fica vazio. */
  {
    id: 'deficiencia-intelectual',
    nome: 'Deficiência intelectual',
    fonte: 'Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · MS — Portaria GM/MS nº 5.201, 2024 (Lista Nacional de Notificação Compulsória) · APA — Practice Guidelines for the Psychiatric Evaluation of Adults, Am J Psychiatry, 2015',
    redflags: {
      fonte: 'Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022',
      itens: [
        'Ofuscamento diagnóstico: atribuir à deficiência intelectual um sintoma emocional ou comportamental que é outro transtorno ou doença clínica',
        { t: 'Comportamento novo ou mais intenso pode ser o jeito de mostrar dor, desconforto ou doença que a pessoa não consegue dizer — buscar a causa física antes de tratar o comportamento com psicotrópico (dado de TEA; vale para quem também tem TEA)', f: 'MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Epilepsia é mais frequente na deficiência intelectual (cerca de um terço até o início da vida adulta, mais quanto mais grave a deficiência); fármaco que baixa o limiar convulsivo ou interage com anticonvulsivante pede cuidado', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Possível maior sensibilidade a efeito adverso de psicotrópico (opinião difundida; um só estudo de coorte a sustenta, com extrapiramidal cerca de 30% maior): começar com dose menor e subir mais devagar. Vigiar extrapiramidal (inclusive com risperidona em dose habitual, sobretudo se já há dificuldade de mobilidade), sedação, piora das crises, disfagia com antipsicótico e piora cognitiva com anticolinérgico', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Benzodiazepínico pode causar reação paradoxal, com agitação e agressão, e a deficiência intelectual é fator de risco para ela', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Transtorno mental pode vir disfarçado: depressão como autolesão, ideia persecutória como queixa de que implicam com a pessoa. E falar sozinho pode ser habitual, não psicose', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Exploração ou abuso podem estar por trás da mudança de comportamento (dado de TEA; vale para quem também tem TEA)', f: 'MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022' },
        { t: 'Há preocupação de que a tranquilização rápida seja usada em excesso em pessoas neurodivergentes, nas quais outras estratégias podem ser mais adequadas (dado do capítulo de crianças e adolescentes)', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' }
      ]
    },
    ddx: {
      fonte: 'Maudsley Prescribing Guidelines, 15ª ed., 2025 · MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019',
      itens: [
        { t: 'Dor ou doença física não relatada — mudança de comportamento sem outra explicação; exame físico dirigido (dado de TEA; vale para quem também tem TEA)', f: 'MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Efeito adverso de fármaco — acatisia ou extrapiramidal com antipsicótico, desinibição com benzodiazepínico', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        'Epilepsia — frequente nessa população; perguntar crises e mudança no padrão delas',
        { t: 'Depressão — pode se apresentar como autolesão', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Psicose — ideia persecutória pode surgir como queixa de que implicam com a pessoa; falar sozinho pode ser habitual', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Transtorno bipolar de ciclagem muito rápida — alguns autores o descrevem por trás do comportamento desafiador na deficiência grave e profunda; passa despercebido com facilidade', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Demência — risco maior na deficiência intelectual, sobretudo na síndrome de Down', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'TEA comórbido — comunicação e interação social muito abaixo do esperado para as habilidades não verbais; no TEA o perfil cognitivo é desigual, na deficiência intelectual o rebaixamento é global', f: 'MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022 · medicina-wiki/wiki/saude-mental-fatos.md (2026-08-03)' },
        { t: 'Problema no ambiente de cuidado — o comportamento pode refletir falhas do cuidado; o relato varia entre cuidadores', f: 'Maudsley Prescribing Guidelines, 15ª ed., 2025' },
        { t: 'Reação a excesso de estímulo ou quebra de rotina (se também há TEA) — dado de TEA', f: 'MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022' },
        { t: 'Delirium — início agudo, flutuação e desatenção', f: 'Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019' }
      ]
    },
    blocos: {
      hda: {
        rot: 'Revisão de sintomas — deficiência intelectual',
        itens: [
          { tipo: 'texto', id: 'di-basal', rot: 'Como é no habitual: fala, compreensão, autocuidado (segundo quem convive)', na: 'funcionamento habitual',
            ph: 'quem informa; frases, palavras ou gestos; o que faz sem ajuda', fmt: 'funcionamento habitual, segundo quem convive: {v}' },
          { tipo: 'texto', id: 'di-mudanca', rot: 'O que mudou em relação ao habitual e desde quando', na: 'mudança em relação ao habitual',
            ph: 'o que é novo ou mais intenso; há quantos dias', fmt: 'mudança em relação ao habitual: {v}' },
          { tipo: 'escolha', id: 'di-comport', rot: 'Comportamento atual (agressão a pessoas: ver Heteroagressividade)', na: 'comportamento atual', multi: true,
            tpl: 'comportamento atual: {d}', opts: [
            {v: 'autolesao', rot: 'autolesão'}, {v: 'agitacao', rot: 'agitação'}, {v: 'irritabilidade', rot: 'irritabilidade'},
            {v: 'destruicao', rot: 'destruição de objetos'}, {v: 'sono', rot: 'mudança de sono', frase: 'mudança no sono'},
            {v: 'alimentacao', rot: 'mudança alimentar', frase: 'mudança na alimentação'}] },
          { tipo: 'tri', id: 'di-ambiente', rot: 'Mudança de rotina, cuidador ou casa antes da crise', na: 'mudança de rotina ou cuidador',
            sim: 'mudança de rotina, cuidador ou moradia antes da crise[: {d}]', nao: 'sem mudança de rotina, cuidador ou moradia antes da crise',
            det: {tipo: 'texto', ph: 'o quê, quando'} },
          /* violência doméstica e outras violências: notificação compulsória (Portaria GM/MS nº 5.201/2024, item 64) */
          { tipo: 'tri', id: 'di-abuso', rot: 'Suspeita de maus-tratos, abuso ou exploração', na: 'suspeita de abuso',
            sim: 'suspeita de maus-tratos, abuso ou exploração[: {d}]', nao: 'sem suspeita de maus-tratos, abuso ou exploração',
            det: {tipo: 'texto', ph: 'o que levanta a suspeita'}, sub: [
              { id: 'di-notifica', rot: 'Notificação de violência (SINAN) feita', na: 'notificação de violência',
                sim: 'notificação compulsória de violência feita', nao: 'notificação compulsória de violência pendente' }] },
          DEL_CLINICO,
          DEL_ELIMINACAO,
          DEL_MEDMUDOU
        ]
      },
      /* psicofármaco já usado (nome, resposta, por que parou) é o item base "Tratamento psiquiátrico prévio" */
      pregressa: { rot: 'Pregressa — deficiência intelectual', itens: [
        { tipo: 'tri', id: 'di-diagnostico', rot: 'Deficiência intelectual já diagnosticada', na: 'diagnóstico de deficiência intelectual',
          sim: 'deficiência intelectual diagnosticada[: {d}]', nao: 'deficiência intelectual suspeita, sem diagnóstico formal',
          det: {tipo: 'texto', ph: 'grau, quem diagnosticou, causa se conhecida'} },
        { tipo: 'tri', id: 'di-tea', rot: 'Autismo (TEA) diagnosticado', na: 'TEA comórbido',
          sim: 'transtorno do espectro autista diagnosticado[: {d}]', nao: 'sem diagnóstico de transtorno do espectro autista',
          det: {tipo: 'texto', ph: 'quem diagnosticou, quando'} }
      ]},
      subst: { rot: 'Outras substâncias — deficiência intelectual', itens: [ SUB_BZD ] },
      clinica: { rot: 'Clínica — deficiência intelectual', itens: [
        { tipo: 'tri', id: 'di-sindrome', rot: 'Síndrome genética conhecida (Down, 22q11.2)', na: 'síndrome genética',
          sim: 'síndrome genética conhecida[: {d}]', nao: 'sem síndrome genética conhecida', det: {tipo: 'texto', ph: 'qual'} },
        { tipo: 'tri', id: 'di-epilepsia', rot: 'Epilepsia ou crise convulsiva', na: 'epilepsia',
          sim: 'epilepsia ou crise convulsiva[: {d}]', nao: 'nega epilepsia ou crise convulsiva',
          det: {tipo: 'texto', ph: 'desde quando, última crise'}, sub: [
            { id: 'di-crise-recente', rot: 'Crise nos últimos dias ou mudança no padrão', na: 'crise recente',
              sim: 'crise nos últimos dias ou mudança no padrão das crises', nao: 'sem crise nos últimos dias nem mudança no padrão das crises' }] },
        { tipo: 'tri', id: 'di-sensorial', rot: 'Deficiência visual ou auditiva', na: 'visão e audição',
          sim: 'deficiência visual ou auditiva[: {d}]', nao: 'sem deficiência visual ou auditiva conhecida', det: {tipo: 'texto', ph: 'qual; usa óculos ou aparelho'} }
      ]},
      ef: { rot: 'Achados dirigidos — deficiência intelectual', itens: [
        { tipo: 'tri', id: 'di-dor', rot: 'Sinal de dor ou desconforto ao exame', na: 'sinal de dor ao exame',
          sim: 'sinal de dor ou desconforto ao exame[: {d}]', nao: 'sem sinal de dor ou desconforto ao exame', det: {tipo: 'texto', ph: 'onde, como reage'} },
        DEL_GLOBO,
        AGI_ACATISIA
      ]},
      /* a ausência de fala é a opção "mutismo" do item base Fala: aqui só a forma de comunicação */
      eem: { rot: 'Achados dirigidos — deficiência intelectual', itens: [
        { tipo: 'escolha', id: 'di-comunica', rot: 'Como se comunicou na entrevista (sem fala nenhuma: item Fala)', na: 'comunicação na entrevista', multi: true, tpl: 'comunicação na entrevista {d}', opts: [
          {v: 'frases', rot: 'frases', frase: 'por frases'}, {v: 'palavras', rot: 'palavras soltas', frase: 'por palavras soltas'},
          {v: 'gestos', rot: 'gestos ou sinais', frase: 'por gestos ou sinais'}] },
        { tipo: 'tri', id: 'di-igual', rot: 'Está diferente do habitual na avaliação (pergunte a quem convive)', na: 'comparação com o habitual',
          sim: 'apresentação diferente da habitual, segundo quem convive[: {d}]', nao: 'apresentação semelhante à habitual, segundo quem convive',
          det: {tipo: 'texto', ph: 'o que está diferente'} },
        /* Maudsley 15ª ed., p. 824-825 (capacity and consent): decisão plenamente informada é incomum
           nos serviços de DI e o cuidador costuma decidir junto. Sem isto, "paciente concorda com a
           conduta" (PLANO) vira consentimento de quem talvez não possa consentir. ✓ abre "com quem". */
        { tipo: 'tri', id: 'di-capacidade', rot: 'Capacidade de decidir sobre o tratamento comprometida', na: 'capacidade de decidir sobre o tratamento',
          sim: 'capacidade de decidir sobre o tratamento proposto comprometida[: {d}]', nao: 'capacidade de decidir sobre o tratamento proposto preservada',
          det: {tipo: 'texto', ph: 'como avaliou; quem decidiu junto (cuidador, responsável)', na: 'quem decidiu junto sobre o tratamento'} }
      ]}
    }
  }
];
