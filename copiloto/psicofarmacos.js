/* Formulário psicofarmacológico — conteúdo do painel "Psicofármacos".
 *
 * Só dados. O renderer vive no index.html.
 *
 * REGRA DE DOSE DESTE ARQUIVO — leia antes de acrescentar qualquer fármaco.
 *
 * O projeto proíbe dígito de dose sem fonte datada conferida (CLAUDE.md, seção
 * "A regra vale para dose também"). Em 16/09/2026 essa regra foi afrouxada por
 * decisão explícita do Eric, com uma condição que NÃO é negociável: toda dose
 * carrega o rótulo da fonte no próprio card, e fármaco sem fonte conferida sai
 * marcado VERIFICAR em vez de sair com número plausível.
 *
 * As doses abaixo foram lidas do texto extraído dos PDFs, não citadas de
 * memória. Os PDFs estão em ../../internato-sm-sc-2026-2/raw/fonte-*.pdf e o
 * mapa de conferência em ../../internato-sm-sc-2026-2/.fontes-conferidas.md
 *
 * ESTRUTURA — quatro coisas, não uma:
 *   classes[]   fármaco a fármaco: dose, por que este, quando evitar, contraindicações
 *   combos[]    combinações que SE FAZEM, por situação clínica
 *   proibidos[] combinações que NÃO se fazem, com mecanismo e desfecho
 *   dosemuda[]  mesmo fármaco, dose diferente, função diferente
 *
 * Combo é RELAÇÃO, não propriedade de um fármaco: por isso mora em seção
 * própria e não repetido em 40 cartões, onde envelheceria em 40 lugares.
 *
 * Fármaco = {nome, kw, apres, dose:[{rot,val}], porque, escolher, evitar,
 *            contraind, adversos, monitor, fonte, v?}
 */

var PSICOFARMACOS = {
  atualizado: "2026-09-23",

  regra: {
    titulo: "Como ler este formulário",
    partes: [
      { rot: "A FONTE",
        txt: "Cada fármaco traz a fonte da dose no rodapé do card. PCDT é portaria do " +
             "Ministério da Saúde e vale como norma no SUS; CAB nº 34 é o caderno da " +
             "Atenção Básica; CANMAT é a diretriz canadense, usada onde o Brasil não " +
             "publicou. Onde não há fonte datada, o card sai marcado VERIFICAR e não " +
             "inventa número." },
      { rot: "O SUS",
        txt: "O que os PCDT listam é o que a farmácia do SUS dispensa por protocolo. " +
             "Escitalopram, sertralina, venlafaxina e mirtazapina não estão na RENAME " +
             "2024 como antidepressivos de uso geral. Bupropiona 150 mg de liberação " +
             "prolongada está no Componente Estratégico. Prescrever o que não tem é receita que " +
             "não vira tratamento." },
      { rot: "A ESCOLHA",
        txt: "Dentro de uma classe a eficácia média é parecida — a exceção é a clozapina " +
             "na refratariedade. A escolha real se faz por três coisas: o efeito adverso " +
             "que ESTE paciente menos tolera, a comorbidade que ele já tem, e o que já " +
             "funcionou nele ou num parente de primeiro grau." },
      { rot: "O COMBO",
        txt: "Combinação tem seção própria, no fim do painel: as que se fazem, as que " +
             "não se fazem, e os fármacos cuja dose muda a indicação. Procure lá antes " +
             "de somar dois psicofármacos." },
      { rot: "O LIMITE",
        txt: "Este formulário apoia a decisão, não a substitui. Primeira prescrição, " +
             "troca de esquema, qualquer combinação e qualquer decisão em gestante, " +
             "criança ou idoso frágil passam pelo preceptor." }
    ]
  },

  classes: [
    /* ---------------------------------------------------------------- */
    {
      rot: "Antipsicóticos de primeira geração (típicos)",
      kw: "haloperidol clorpromazina levomepromazina tipico neuroleptico incisivo sedativo decanoato deposito",
      quando: "Psicose aguda, agitação grave, esquizofrenia quando o atípico falhou ou não " +
              "está disponível. São os que o SUS mais tem e os que mais dão efeito motor.",
      nota: "O eixo da escolha é POTÊNCIA, e potência aqui não significa ser mais forte: " +
            "significa quanta miligrama é preciso para ocupar o mesmo tanto de receptor D2. " +
            "Alta potência (haloperidol) = mais efeito extrapiramidal, menos sedação, menos " +
            "hipotensão. Baixa potência (clorpromazina, levomepromazina) = mais sedação, mais " +
            "hipotensão, mais anticolinérgico, menos efeito motor.",
      farmacos: [
        {
          nome: "Haloperidol",
          id: "haloperidol",
          kw: "haldol incisivo alta potencia",
          apres: "comprimido de 1 e 5 mg; solução oral 2 mg/mL; solução injetável 5 mg/mL",
          dose: [
            { rot: "Início", val: "doses fracionadas, apesar da meia-vida de 24 h, para minimizar efeito adverso" },
            { rot: "Faixa (CAB 34)", val: "2 a 20 mg/dia; dose média 5 a 10 mg/dia" },
            { rot: "Máximo agudo", val: "15 mg/dia" },
            { rot: "Máximo manutenção", val: "10 mg/dia" },
            { rot: "Equivalência", val: "2 mg equivalem a 100 mg de clorpromazina" }
          ],
          porque: "Bloqueio D2 quase puro, com pouquíssima ação em receptor histamínico, " +
                  "muscarínico e alfa-adrenérgico. É isso que o torna o antipsicótico que " +
                  "menos derruba pressão e menos seda — e, pelo mesmo motivo, o que mais dá " +
                  "efeito motor. Existe injetável e existe depósito, o que nenhum atípico do " +
                  "SUS oferece.",
          escolher: "Psicose com agitação em quem não se pode sedar nem derrubar a pressão: " +
                    "idoso cardiopata, paciente com delirium que precisa manter nível de " +
                    "consciência avaliável, quem já teve hipotensão com fenotiazínico. " +
                    "Doses acima do máximo não trazem benefício e só aumentam efeito adverso.",
          evitar: "Parkinson e demência de corpos de Lewy — a piora é dramática e pode não " +
                  "reverter. Jovem do sexo masculino virgem de tratamento tem o maior risco de " +
                  "distonia aguda: se for usar, tenha biperideno à mão. Cautela em QT longo.",
          contraind: "Pelo PCDT: alergia ao fármaco; depressão grave do SNC; coma; DPOC; " +
                     "síndrome de Sjögren; transtornos convulsivos; câncer de mama ou tumor " +
                     "dependente de prolactina; bexiga neurogênica; hipertrofia de próstata; " +
                     "gravidez e amamentação; doença de Parkinson.",
          adversos: "Extrapiramidal em destaque, em ordem cronológica: distonia aguda (horas a " +
                    "dias), acatisia (dias), parkinsonismo (semanas), discinesia tardia (uso " +
                    "prolongado). Hiperprolactinemia. Síndrome neuroléptica maligna.",
          monitor: "Sinais extrapiramidais a cada consulta. Antropometria e pressão arterial em " +
                   "3, 6 e 12 meses. Glicemia de jejum e perfil lipídico em 3 e 12 meses, depois anuais.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; faixa e equivalência do CAB nº 34 (MS), 2013"
        },
        {
          nome: "Decanoato de haloperidol",
          id: "decanoato-de-haloperidol",
          kw: "deposito depot injetavel mensal adesao",
          apres: "solução injetável 50 mg/mL, intramuscular",
          dose: [
            { rot: "Usual", val: "150 a 200 mg por mês, aplicado a cada 4 semanas" },
            { rot: "Primeiros meses", val: "até 400 mg/mês e com intervalo menor (até semanal), ou dose usual suplementada com haloperidol oral até 15 mg/dia" },
            { rot: "Estabilização", val: "meia-vida de cerca de 3 semanas; leva 3 a 6 meses para estabilizar a concentração plasmática" }
          ],
          porque: "Resolve o problema que nenhum ajuste de dose resolve: o paciente que só " +
                  "recai porque parou de tomar. Transforma adesão diária em adesão mensal, e " +
                  "torna a falha VISÍVEL — quem não vem para a aplicação some do radar, e a " +
                  "equipe pode ir atrás.",
          escolher: "A indicação formal no PCDT é má adesão ao uso oral. É a resposta certa " +
                    "para o paciente que recai toda vez que para o comprimido — e a pergunta " +
                    "que raramente se faz no CAPS.",
          evitar: "Não usar para debutar tratamento em quem nunca tomou antipsicótico: a " +
                  "tolerância tem de ser testada por via oral antes, porque depois de aplicado " +
                  "não há como retirar. Mesmas contraindicações do oral.",
          contraind: "As do haloperidol oral.",
          adversos: "Os do haloperidol, com o agravante de não serem reversíveis por suspensão.",
          monitor: "Avaliação de extrapiramidalismo a cada aplicação — a consulta mensal é a " +
                   "oportunidade, não uma formalidade.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013"
        },
        {
          nome: "Clorpromazina",
          id: "clorpromazina",
          kw: "amplictil baixa potencia sedativa",
          apres: "comprimido de 25 e 100 mg; solução oral 40 mg/mL",
          dose: [
            { rot: "Início", val: "50 a 100 mg, 2 a 3 vezes ao dia" },
            { rot: "Faixa média", val: "400 a 800 mg/dia" },
            { rot: "Máximo", val: "1 g/dia" },
            { rot: "Piso", val: "abaixo de 150 mg/dia associa-se a maior chance de recidiva" },
            { rot: "Equilíbrio plasmático", val: "2 a 5 dias" }
          ],
          porque: "Bloqueia D2 mas também histamínico, muscarínico e alfa-1 — daí a sedação, a " +
                  "boca seca e a hipotensão. É a referência da escala de equivalência: toda " +
                  "dose equivalente da tabela é expressa em miligramas de clorpromazina.",
          escolher: "Quando a sedação é desejada e o efeito motor é o que se quer evitar. " +
                    "Meia-vida de 24 h permite dose única. Existe em gotas, o que ajuda em " +
                    "quem não engole comprimido.",
          evitar: "Idoso e pessoa com epilepsia — baixa o limiar convulsivo. Cardiopata e quem " +
                  "já tem hipotensão ortostática, pelo risco de queda. Café, cigarro e " +
                  "antiácido reduzem a absorção: paciente que fuma muito pode estar subdosado " +
                  "sem ninguém perceber.",
          contraind: "Pelo PCDT: depressão grave do SNC; coma; doença cardiovascular grave; " +
                     "angina; glaucoma de ângulo fechado; Parkinson; úlcera péptica; retenção " +
                     "urinária; síndrome de Reye; antecedente de síndrome neuroléptica maligna; " +
                     "doença cardio ou cerebrovascular que predisponha a hipotensão ortostática; " +
                     "câncer de mama ou tumor dependente de prolactina; insuficiência hepática; " +
                     "história de convulsão ou epilepsia; história de tumor cerebral; " +
                     "hiperprolactinemia; antecedente de discrasia sanguínea.",
          adversos: "Hipotensão postural, sedação intensa, efeito anticolinérgico, ganho de peso, " +
                    "fotossensibilidade, redução do limiar convulsivo.",
          monitor: "Pressão arterial em pé e deitado no início. Glicemia e lipídios como os demais.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; faixa do CAB nº 34 (MS), 2013"
        },
        {
          nome: "Levomepromazina",
          id: "levomepromazina",
          kw: "neozine baixa potencia muito sedativa",
          apres: "comprimido; solução oral",
          dose: [
            { rot: "Dose média", val: "100 a 300 mg/dia" },
            { rot: "Faixa", val: "25 a 600 mg/dia" },
            { rot: "Equivalência", val: "120 mg equivalem a 100 mg de clorpromazina" }
          ],
          porque: "É o mais sedativo do grupo — bloqueio histamínico e alfa-adrenérgico ainda " +
                  "mais marcado que o da clorpromazina. Quando o alvo terapêutico é dormir e " +
                  "baixar a tensão, e não só o delírio, é ela.",
          escolher: "Quando se busca sedação marcada e a via oral está disponível.",
          evitar: "Idoso e pessoa com epilepsia. Risco de hipotensão importante e de queda.",
          contraind: "As dos fenotiazínicos de baixa potência, como a clorpromazina.",
          adversos: "Sedação muito intensa, hipotensão, anticolinérgico.",
          monitor: "Pressão arterial. Risco de queda em idoso.",
          fonte: "MS — CAB nº 34, Saúde Mental, 2013"
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      rot: "Antipsicóticos de segunda geração (atípicos)",
      kw: "risperidona olanzapina quetiapina clozapina ziprasidona sulpirida aripiprazol atipico metabolico",
      quando: "Esquizofrenia e transtorno bipolar tipo I. Menos efeito motor que os típicos, " +
              "mais efeito metabólico — a troca é essa, e é uma troca, não uma melhora.",
      nota: "Escolha por eliminação, e a pergunta é qual efeito adverso ESTE paciente não " +
            "tolera: risperidona sobe prolactina · olanzapina engorda mais que todos · " +
            "quetiapina seda e é a única com indicação própria na depressão bipolar · " +
            "ziprasidona é a metabolicamente mais neutra e alarga QT · clozapina é a única " +
            "com eficácia na refratariedade e a única que exige hemograma seriado · " +
            "aripiprazol tem o melhor perfil metabólico e a maior incidência de acatisia.",
      farmacos: [
        {
          nome: "Risperidona",
          id: "risperidona",
          kw: "risperdal prolactina",
          apres: "comprimido de 1, 2 e 3 mg",
          dose: [
            { rot: "Início (esquizofrenia)", val: "1 mg 2 vezes ao dia, para evitar efeito de primeira dose por bloqueio alfa-adrenérgico" },
            { rot: "Titulação", val: "aumentar 1 mg 2 vezes ao dia até a dose-alvo de 6 mg/dia (3 mg 2 vezes ao dia) no terceiro dia" },
            { rot: "Manutenção", val: "3 a 6 mg/dia" },
            { rot: "Início (TAB tipo I)", val: "1 mg/dia, incremento de 1 mg/dia até a dose-alvo; faixa 1 a 6 mg/dia; máximo 8 mg/dia" },
            { rot: "Insuficiência renal ou hepática", val: "máximo 3 mg/dia" },
            { rot: "Alimento", val: "não interfere na biodisponibilidade" }
          ],
          porque: "É o atípico que mais se comporta como típico conforme a dose sobe: acima de " +
                  "6 mg/dia o bloqueio D2 é tão alto que o efeito extrapiramidal aparece. " +
                  "Abaixo disso, tem perfil previsível e pouca ação anticolinérgica — o que a " +
                  "torna razoável em criança e em idoso, onde confusão e retenção urinária " +
                  "custam caro.",
          escolher: "Primeira linha em esquizofrenia e em mania. Boa escolha em criança e idoso " +
                    "pela previsibilidade e pelos poucos efeitos anticolinérgicos. Se for " +
                    "interrompida, reiniciar pela primeira dose.",
          evitar: "Quando a hiperprolactinemia for intolerável — é o atípico que mais sobe " +
                  "prolactina, e a queixa costuma ser de libido, ciclo menstrual ou " +
                  "galactorreia, que o paciente não traz espontaneamente. Gravidez e lactação " +
                  "são critério formal de interrupção no PCDT.",
          contraind: "Pelo PCDT: antecedente de síndrome neuroléptica maligna; discinesia tardia; " +
                     "QT longo; doença cardio ou cerebrovascular que predisponha a hipotensão " +
                     "ortostática; hipo ou hipertermia; câncer de mama ou tumor dependente de " +
                     "prolactina; insuficiência renal; insuficiência hepática; Parkinson; " +
                     "história de convulsão ou epilepsia; história de tumor cerebral; gravidez, " +
                     "possibilidade de gravidez ou lactação; menos de 18 anos; hiperprolactinemia.",
          adversos: "Hiperprolactinemia, sintomas extrapiramidais em dose mais alta, sonolência, " +
                    "aumento de apetite, sialorreia, constipação, tremor, distonia, acatisia, " +
                    "bradicinesia, instabilidade postural.",
          monitor: "Prolactina sempre que houver queda de libido, alteração menstrual, impotência " +
                   "ou galactorreia. Glicemia e lipídios em 3 e 12 meses, depois anuais com ECG.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; e PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
        },
        {
          nome: "Olanzapina",
          id: "olanzapina",
          kw: "zyprexa ganho de peso metabolico mania",
          apres: "comprimido de 5 e 10 mg",
          dose: [
            { rot: "Início", val: "5 mg à noite" },
            { rot: "Titulação", val: "aumentar 5 mg após pelo menos 7 dias, até 20 mg/dia" },
            { rot: "Teto usual", val: "20 mg/dia — não há evidência de que doses maiores sejam mais eficazes em não refratário" },
            { rot: "Refratário", val: "até 30 mg/dia, apenas quando houve efeito adverso grave com clozapina (agranulocitose, cardiopatia, oclusão intestinal)" },
            { rot: "Paciente debilitado ou emagrecido", val: "máximo 5 mg/dia" },
            { rot: "Insuficiência renal ou hepática", val: "não exige ajuste" }
          ],
          porque: "Perfil receptor amplo, com forte ação histamínica — daí a eficácia rápida em " +
                  "mania e o apetite que vem junto. É o antipsicótico com melhor desempenho em " +
                  "mania aguda e o pior perfil metabólico da lista: as duas coisas pelo mesmo motivo.",
          escolher: "Mania aguda, e psicose em que a sedação ajuda e o efeito motor precisa ser " +
                    "evitado. Não exige ajuste em insuficiência renal ou hepática, o que " +
                    "simplifica muito no paciente clínico complexo.",
          evitar: "Síndrome metabólica, obesidade, diabetes ou dislipidemia já instalados — " +
                  "aqui ela é a pior escolha possível. Desenvolver IMC acima de 30, cintura " +
                  "acima de 94 cm, HAS, dislipidemia ou DM durante o uso é critério FORMAL de " +
                  "troca por ziprasidona no PCDT.",
          contraind: "Pelo PCDT: tumor cerebral; epilepsia ou condição que diminua o limiar " +
                     "convulsivo; câncer de mama; glaucoma; íleo paralítico atual ou prévio; " +
                     "hiperplasia prostática significativa; doença cardíaca ou cerebrovascular " +
                     "ou condição que predisponha a hipotensão; risco de pneumonia aspirativa; " +
                     "risco de suicídio; antecedente de síndrome neuroléptica maligna; gravidez, " +
                     "possibilidade de gravidez ou lactação; menos de 18 anos. Síndrome " +
                     "metabólica exige consentimento POR ESCRITO do médico assistente.",
          adversos: "Ganho de peso expressivo, sedação, dislipidemia, resistência insulínica, diabetes.",
          monitor: "Peso, cintura e pressão arterial em 3, 6 e 12 meses. Glicemia de jejum e " +
                   "perfil lipídico em 3 e 12 meses, depois anuais com ECG.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; e PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
        },
        {
          nome: "Quetiapina",
          id: "quetiapina",
          kw: "seroquel sedativa insonia depressao bipolar",
          apres: "comprimido de 25, 100, 200 e 300 mg",
          dose: [
            { rot: "Início (esquizofrenia)", val: "25 mg 2 vezes ao dia, com aumentos de 25 a 50 mg por dose por dia" },
            { rot: "Alvo (esquizofrenia)", val: "300 a 600 mg/dia, alcançado entre o 4º e o 7º dia, dividido em 2 ou 3 tomadas" },
            { rot: "Máximo", val: "750 a 800 mg/dia" },
            { rot: "Depressão bipolar", val: "300 a 600 mg/dia" },
            { rot: "Mania", val: "600 a 800 mg/dia" },
            { rot: "Ajuste", val: "incrementos ou reduções de 25 a 50 mg 2 vezes ao dia, ou a cada 2 dias" }
          ],
          porque: "Ocupação D2 baixa e transitória, com forte bloqueio histamínico e um " +
                  "metabólito ativo com ação noradrenérgica. É o que explica as três coisas: " +
                  "seda muito, quase não dá efeito motor, e funciona na DEPRESSÃO bipolar — " +
                  "onde os outros antipsicóticos não têm indicação própria.",
          escolher: "Depressão bipolar (é a única da classe com indicação própria no PCDT), e " +
                    "psicose com insônia grave associada. Segunda melhor evidência depois do " +
                    "lítio no episódio depressivo bipolar.",
          evitar: "Mesmo alerta metabólico da olanzapina, embora menos intenso. E o desvio mais " +
                  "comum: usar 25 a 50 mg só para dormir transforma um antipsicótico em " +
                  "hipnótico crônico sem indicação — nessa dose praticamente só o bloqueio " +
                  "histamínico age, ou seja, é um anti-histamínico caro com risco metabólico junto.",
          contraind: "Pelo PCDT: doença de Alzheimer; câncer de mama atual ou prévio; doença " +
                     "cardiovascular; doença cerebrovascular; condição que predisponha a " +
                     "hipotensão (desidratação, hipovolemia); insuficiência hepática ou renal; " +
                     "hipotireoidismo; história de convulsões; catarata; Parkinson com falência " +
                     "autonômica periférica. Síndrome metabólica exige consentimento por escrito. " +
                     "Mulher em idade fértil deve usar contracepção regular.",
          adversos: "Sedação marcada, tontura, hipotensão postural, boca seca, ganho de peso, " +
                    "elevação de triglicerídeos.",
          monitor: "Peso, cintura e PA em 3, 6 e 12 meses; glicemia e lipídios em 3 e 12 meses, anuais depois com ECG.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; e PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
        },
        {
          nome: "Ziprasidona",
          id: "ziprasidona",
          kw: "geodon qt metabolicamente neutra alimento",
          apres: "cápsula de 40 e 80 mg",
          dose: [
            { rot: "Início", val: "40 mg 2 vezes ao dia, por via oral, administrada COM alimento" },
            { rot: "Titulação", val: "aumentos em intervalos maiores que 2 dias" },
            { rot: "Manutenção ideal", val: "40 mg 2 vezes ao dia" },
            { rot: "Máximo", val: "160 mg/dia (80 mg 2 vezes ao dia)" }
          ],
          porque: "Praticamente não mexe em peso, glicemia e lipídios — e cobra esse preço no " +
                  "intervalo QT. É o único da lista cuja absorção depende de comida: sem " +
                  "alimento a biodisponibilidade despenca, então tomar em jejum é subdosar " +
                  "sem perceber e concluir que não funcionou.",
          escolher: "É a escolha FORMAL do PCDT quando o paciente desenvolveu HAS, obesidade, " +
                    "diabetes ou síndrome metabólica em uso de olanzapina ou quetiapina. " +
                    "Também quando o ganho de peso já derrubou a adesão.",
          evitar: "QT longo, arritmia, cardiopatia, e qualquer associação com outro fármaco que " +
                  "alargue QT ou que cause distúrbio hidroeletrolítico. Paciente que não " +
                  "consegue tomar junto com refeição.",
          contraind: "Pelo PCDT: cardiopatia, especialmente arritmia; HAS (aumenta o efeito de " +
                     "anti-hipertensivo); Parkinson (antagoniza levodopa e agonista " +
                     "dopaminérgico); sinais de torsade de pointes como tontura, palpitação e " +
                     "síncope; história de uso de drogas de abuso e dependência; hipotensão " +
                     "postural; uso concomitante de fármacos que produzam desequilíbrio " +
                     "hidroeletrolítico; risco de convulsão (epilepsia, TCE, lesão cerebral, " +
                     "alcoolismo, uso de fármacos que reduzam o limiar convulsivo); lactação.",
          adversos: "Prolongamento de QT, acatisia, insônia. Pouco ganho de peso.",
          monitor: "ECG antes e durante. Eletrólitos quando houver risco de distúrbio hidroeletrolítico.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013"
        },
        {
          nome: "Clozapina",
          id: "clozapina",
          kw: "leponex refratario agranulocitose hemograma suicidio discinesia tardia dose letal",
          apres: "comprimido de 25 e 100 mg",
          dose: [
            { rot: "Início", val: "12,5 mg à noite (PCDT Esquizofrenia) ou 25 mg/dia (PCDT TAB I)" },
            { rot: "Titulação", val: "aumentar 25 mg a cada 1 a 2 dias até 300 a 400 mg/dia" },
            { rot: "Sem melhora em 30 dias", val: "aumentar 50 mg a cada 3 a 4 dias até 800 mg/dia" },
            { rot: "Acima de 400 mg", val: "fracionar de 12 em 12 horas para melhorar tolerância" },
            { rot: "Máximo", val: "800 mg/dia" },
            { rot: "Prazo de avaliação", val: "6 MESES em 300 a 800 mg/dia antes de julgar falha — mecanismo mais lento que o dos demais" },
            { rot: "Dose letal", val: "2,5 g — o PCDT manda registrar alerta claro e dispensar ao responsável legal quando há risco grave de suicídio" }
          ],
          porque: "Ocupação D2 baixa com ação ampla em outros receptores. É o único " +
                  "antipsicótico com eficácia comprovada onde os outros falharam, e o único " +
                  "com efeito descrito sobre suicidalidade. O preço é a agranulocitose, que " +
                  "é rara e pode matar — daí o hemograma obrigatório.",
          escolher: "Refratariedade, definida como falha de dois antipsicóticos em dose e tempo " +
                    "adequados. E mais duas situações em que o PCDT a tira da terceira linha e " +
                    "a torna a escolha: DISCINESIA TARDIA e TENTATIVA DE SUICÍDIO.",
          evitar: "Sem possibilidade de hemograma seriado, não se inicia — não é excesso de " +
                  "zelo, é a condição de segurança do fármaco. Agranulocitose prévia por " +
                  "clozapina é contraindicação definitiva. Epilepsia mal controlada.",
          contraind: "Pelo PCDT: epilepsia anterior ao diagnóstico, convulsões ou deficiência " +
                     "intelectual exigem parecer OBRIGATÓRIO de neurologista. Citopenia " +
                     "(leucócitos abaixo de 3.000/mm³, neutrófilos abaixo de 1.500/mm³ ou " +
                     "plaquetas abaixo de 100.000/mm³) manda suspender e avaliar com " +
                     "hematologista. Em risco grave de suicídio, dispensar só ao responsável " +
                     "legal com alerta registrado da dose letal. Lactação ou gravidez não " +
                     "prevenível: evitar.",
          adversos: "Agranulocitose, convulsão, miocardite, sedação intensa, sialorreia " +
                    "expressiva, ganho de peso, oclusão intestinal.",
          monitor: "Hemograma SEMANAL nas 18 primeiras semanas e a cada aumento de dose; " +
                   "MENSAL enquanto durar o uso. Febre ou dor de garganta = hemograma hoje.",
          fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; e PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
        },
        {
          nome: "Sulpirida",
          id: "sulpirida",
          kw: "equilid associacao potencializar prolactina",
          apres: "comprimido; solução oral",
          dose: [
            { rot: "Dose média", val: "600 a 1.000 mg/dia" },
            { rot: "Faixa", val: "200 a 1.000 mg/dia" }
          ],
          porque: "Benzamida com bloqueio D2 seletivo. Costuma entrar somada a outro atípico " +
                  "para potencializar o efeito antipsicótico, não como monoterapia.",
          escolher: "Associação a outro atípico quando falta efeito antipsicótico e não se quer " +
                    "subir a dose do primeiro.",
          evitar: "Sobe prolactina de forma marcada — some as duas elevações quando associada " +
                  "a risperidona.",
          contraind: "Tumor dependente de prolactina. As gerais dos bloqueadores D2.",
          adversos: "Hiperprolactinemia, extrapiramidalismo em dose alta.",
          monitor: "Prolactina quando houver sintoma sugestivo.",
          fonte: "MS — CAB nº 34, Saúde Mental, 2013"
        },
        {
          nome: "Aripiprazol",
          id: "aripiprazol",
          kw: "abilify agonista parcial acatisia potencializacao",
          apres: "comprimido; linhas abaixo referem-se ao uso oral",
          dose: [
            {
              rot: "Dose mínima efetiva",
              val: "Esquizofrenia: 10 mg/dia, tanto em primeiro episódio como em múltiplos episódios; resposta individual varia",
              p: 8
            },
            {
              rot: "Mania",
              val: "15 mg/dia; aumentar se necessário até 30 mg/dia",
              p: 311
            },
            {
              rot: "Potencialização na depressão",
              val: "2–10 mg/dia podem ser eficazes como adjuvante; não extrapolar a dose antipsicótica",
              p: 348
            },
            {
              rot: "Idoso",
              val: "Iniciar 5 mg pela manhã; manutenção 5–15 mg/dia; máximo 20 mg/dia, sob reavaliação",
              p: 702
            }
          ],
          porque: "Agonista parcial dopaminérgico. O perfil de prolactina e metabólico pode favorecer a escolha, mas não elimina efeitos adversos.",
          escolher: "Esquizofrenia ou mania quando o perfil de efeitos favorece a escolha; potencialização especializada na depressão resistente.",
          evitar: "Acatisia ou insônia importantes; confundir inquietação induzida com piora psicótica leva a escalada inadequada.",
          contraind: "Hipersensibilidade ao fármaco. Uso para comportamento na demência exige avaliação de risco e não é indicação automática.",
          adversos: "Acatisia, inquietação, insônia, náusea e possível ganho de peso.",
          monitor: "Acatisia após início e ajustes, sono, peso, parâmetros metabólicos e resposta da indicação tratada.",
          fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
        }
]
    }
  ]
};

/* As demais classes entram por push, como em queixas.js — o objeto literal
   acima ficaria ilegível com sete classes dentro. */

PSICOFARMACOS.classes.push({
  rot: "Estabilizadores do humor",
  kw: "litio valproico valproato carbamazepina lamotrigina litemia nivel serico bipolar mania",
  quando: "Transtorno bipolar, em todas as fases. A FASE decide qual: mania, depressão " +
          "bipolar e manutenção não pedem o mesmo fármaco.",
  nota: "Os três primeiros exigem nível sérico, e a janela de coleta não é detalhe: " +
        "após 5 a 7 dias de dose estável e 12 horas depois da última tomada. Fora " +
        "disso o número não quer dizer nada e decidir dose com ele é pior que não dosar.",
  farmacos: [
    {
      nome: "Carbonato de lítio",
      id: "carbonato-de-litio",
      kw: "litemia intoxicacao tireoide renal suicidio",
      apres: "comprimido de 300 mg",
      dose: [
        { rot: "Início", val: "300 mg/dia" },
        { rot: "Titulação", val: "incremento de 300 mg a cada 2 dias até 900 mg; então dosar o nível sérico" },
        { rot: "Faixa", val: "300 a 1.800 mg/dia conforme o nível sérico, dose única à noite" },
        { rot: "Máximo", val: "1.800 mg/dia" },
        { rot: "Nível terapêutico", val: "0,6 a 1,2 mEq/L (CAB 34 detalha: 0,8 a 1,2 na fase aguda, 0,6 a 0,8 na manutenção)" },
        { rot: "Como colher", val: "após 5 a 7 dias de dose estável e 12 horas após a última tomada" },
        { rot: "Toxicidade", val: "risco aumenta muito acima de 1,5 mEq/L; acima de 3,5 mEq/L é potencialmente fatal" }
      ],
      porque: "É um íon, não uma molécula desenhada: não é metabolizado, é filtrado pelo rim. " +
              "Tudo o que mexe no sódio ou na função renal mexe na litemia — e é daí que vem " +
              "tanto a eficácia previsível quanto o risco. É o estabilizador com maior lastro " +
              "em manutenção e o único com efeito antissuicídio descrito.",
      escolher: "Manutenção do bipolar, e episódio depressivo bipolar (é nível 1 no PCDT, à " +
                "frente da quetiapina). História familiar de boa resposta ao lítio é o melhor " +
                "preditor que existe em psicofarmacologia — perguntar sempre. E quando há " +
                "risco de suicídio, ele pesa na escolha por razão própria.",
      evitar: "Paciente que não consegue fazer exame de sangue com regularidade não é " +
              "candidato, por melhor que seja a indicação. Doença renal, desidratação de " +
              "repetição, dieta hipossódica. Gravidez, pela anomalia de Ebstein.",
      contraind: "Doença renal. Gravidez. O PCDT manda EVITAR a associação com diurético, " +
                 "IECA e AINE, e evitar condições que alterem a função renal — são as três " +
                 "classes que elevam a litemia sem que a dose tenha mudado.",
      adversos: "Náusea, vômito, dor epigástrica, boca seca, gosto metálico, diarreia, ganho " +
                "de peso, tremor fino, cansaço, cefaleia, hipotireoidismo, exacerbação de " +
                "psoríase e acne. Sinais PRECOCES de intoxicação: disartria, ataxia e tremor grosseiro.",
      monitor: "Creatinina e ureia trimestrais. TSH, cálcio sérico e litemia semestrais. Sinais " +
               "de toxicidade: perda de equilíbrio, diarreia profusa, vômito, anorexia, fraqueza, " +
               "ataxia, visão borrada, zumbido, poliúria, tremor grosseiro, contração muscular, " +
               "irritabilidade, agitação; nos casos graves, sonolência, psicose, desorientação, " +
               "convulsão, coma e insuficiência renal.",
      fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016; faixas de manutenção do CAB nº 34 (MS), 2013"
    },
    {
      nome: "Ácido valproico / valproato",
      id: "acido-valproico-valproato",
      kw: "depakene depakote teratogenico tubo neural mania misto ciclagem",
      apres: "comprimido; solução oral",
      dose: [
        { rot: "Início", val: "250 mg/dia" },
        { rot: "Titulação", val: "incremento de 250 mg a cada 2 dias até 750 mg; então dosar o nível sérico" },
        { rot: "Faixa", val: "250 a 2.000 mg/dia conforme o nível sérico, dose única à noite" },
        { rot: "Máximo", val: "2.000 mg/dia" },
        { rot: "Nível terapêutico", val: "50 a 125 mcg/mL" },
        { rot: "Como colher", val: "após 5 a 7 dias de dose estável e 12 horas após a última tomada" }
      ],
      porque: "Titula mais rápido que o lítio e cobre bem episódio misto e ciclagem rápida, " +
              "que são justamente onde o lítio rende menos. É INIBIDOR enzimático — o oposto " +
              "da carbamazepina — e é por isso que dobra o nível da lamotrigina.",
      escolher: "Mania, sobretudo episódio misto e ciclagem rápida. Quando se precisa de " +
                "efeito mais rápido do que a titulação do lítio permite.",
      evitar: "CONTRAINDICADO em mulher com possibilidade de gravidez. Não é cautela: é o " +
              "antiepiléptico mais teratogênico, com defeito de tubo neural e prejuízo " +
              "cognitivo na criança. Hepatopatia.",
      contraind: "Gravidez e possibilidade de gravidez. Hepatopatia — o PCDT exige avaliação " +
                 "da função hepática ANTES de iniciar.",
      adversos: "Náusea, vômito, cólica abdominal, anorexia, diarreia, indigestão, aumento do " +
                "apetite, ganho de peso, sedação, tremor, queda de cabelo, trombocitopenia, " +
                "elevação de ALT/TGP e AST/TGO.",
      monitor: "Função hepática ANTES de iniciar. Depois, hemograma e função hepática " +
               "trimestrais; nível sérico semestral.",
      fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
    },
    {
      nome: "Carbamazepina",
      id: "carbamazepina",
      kw: "tegretol hiponatremia stevens johnson inducao enzimatica interacao",
      apres: "comprimido; suspensão oral",
      dose: [
        { rot: "Início", val: "200 mg/dia" },
        { rot: "Titulação", val: "incremento de 200 mg a cada 2 dias até 600 mg; então dosar o nível sérico" },
        { rot: "Faixa", val: "200 a 1.000 mg/dia conforme o nível sérico, dose única à noite" },
        { rot: "Máximo", val: "1.000 mg/dia" },
        { rot: "Nível terapêutico", val: "8 a 12 mcg/mL" },
        { rot: "Autoindução", val: "induz o próprio metabolismo e reduz a meia-vida com o uso crônico — rever a dosagem periodicamente e por vezes dividir em 3 a 4 tomadas" }
      ],
      porque: "É o problema de interação da psiquiatria, não só um estabilizador: indutora " +
              "potente de citocromo P450. O PCDT é explícito — ela REDUZ o nível sérico da " +
              "maioria dos antipsicóticos, e afeta antidepressivos, anticonvulsivantes, " +
              "risperidona e haloperidol. Quem a acrescenta a um esquema estável costuma " +
              "descobrir isso por recaída, não por exame.",
      escolher: "Alternativa quando lítio e valproato não servem ou falharam.",
      evitar: "Em qualquer esquema com vários fármacos, pense duas vezes: ela derruba o nível " +
              "dos outros, incluindo anticoncepcional oral e antirretroviral. Gravidez. " +
              "Discrasia sanguínea. Atenção à ascendência asiática pelo risco de reação " +
              "cutânea grave.",
      contraind: "Gravidez. Discrasia sanguínea. O PCDT exige ALT/TGP, AST/TGO, creatinina, " +
                 "ureia, sódio e potássio ANTES de iniciar.",
      adversos: "Hiponatremia, leucopenia, rash e reação cutânea grave (Stevens-Johnson), " +
                "ataxia, diplopia, sedação. Raros: anemia aplástica, agranulocitose, SIADH, " +
                "arritmia, hepatite.",
      monitor: "Hemograma, função hepática, creatinina, ureia e eletrólitos MENSAIS nos 3 " +
               "primeiros meses; nível sérico semestral; painel completo anual.",
      fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
    },
    {
      nome: "Lamotrigina",
      id: "lamotrigina",
      kw: "lamictal rash depressao bipolar titulacao lenta stevens johnson valproato",
      apres: "comprimido de 25, 50 e 100 mg",
      dose: [
        { rot: "Início", val: "25 mg/dia" },
        { rot: "Titulação", val: "incremento de 25 mg/dia a cada 2 SEMANAS nas primeiras 4 semanas; 100 mg/dia na quinta semana; depois no máximo 100 mg por semana até a dose-alvo" },
        { rot: "Alvo", val: "100 a 200 mg/dia, dose única à noite" },
        { rot: "Faixa", val: "25 a 200 mg/dia" },
        { rot: "Máximo", val: "300 mg/dia" }
      ],
      porque: "É o estabilizador que protege o polo DEPRESSIVO, onde os outros protegem mais " +
              "o maníaco. Não engorda, não seda e não exige nível sérico — praticamente o " +
              "oposto do perfil do valproato. Toda a sua dificuldade está concentrada na " +
              "titulação.",
      escolher: "Depressão bipolar e prevenção de recaída depressiva. Paciente cujo padrão é " +
                "de episódios depressivos recorrentes com poucos maníacos. Quem não tolerou " +
                "ganho de peso.",
      evitar: "Pressa. A titulação lenta não é conservadorismo: acelerar é o que produz o rash " +
              "grave. E não serve para tratar mania aguda — leva semanas para chegar à dose.",
      contraind: "Rash prévio por lamotrigina. Associação com valproato exige titulação ainda " +
                 "mais lenta, e o PCDT diz que a combinação deve em princípio ser EVITADA.",
      adversos: "Rash maculopapular, boca seca, náusea, vômito, diplopia, tontura, ataxia, " +
                "visão borrada, cefaleia, irritabilidade, sonolência, tremor, astenia, insônia, " +
                "artralgia. Raros: insuficiência hepática, discrasia sanguínea, Stevens-Johnson.",
      monitor: "Hemograma e função hepática anuais. Orientar o paciente a procurar o serviço " +
               "diante de QUALQUER lesão de pele — e suspender, não observar.",
      fonte: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
    }
  ]
});

PSICOFARMACOS.classes.push({
  rot: "Antidepressivos",
  kw: "isrs fluoxetina sertralina escitalopram paroxetina citalopram triciclico amitriptilina clomipramina imipramina bupropiona depressao latencia",
  quando: "Episódio depressivo maior, transtornos de ansiedade, TOC, TEPT, pânico. A escolha " +
          "dentro da classe é por efeito adverso e comorbidade, não por eficácia.",
  nota: "Três coisas que mudam a conduta e quase sempre se esquecem. (1) Latência de 2 a 4 " +
        "semanas, e piora inicial de ansiedade e sono é comum — não é falha. (2) Em ansiedade " +
        "crônica a dose é EQUIVALENTE à da depressão; em TOC é mais alta. (3) Antes de " +
        "prescrever, perguntar sobre episódio prévio de humor elevado: no bipolar, ISRS em " +
        "monoterapia é claramente contraindicado.",
  farmacos: [
    {
      nome: "Fluoxetina",
      id: "fluoxetina",
      kw: "prozac isrs meia vida longa ativadora toc",
      apres: "comprimido ou cápsula de 20 mg; solução oral",
      dose: [
        { rot: "Dose usual", val: "20 mg/dia" },
        { rot: "Faixa", val: "5 a 80 mg/dia (CAB 34)" },
        { rot: "Esquema no TAB tipo I", val: "início 20 mg/dia pela manhã, incremento de 20 mg a cada 1 a 2 semanas; faixa 20 a 40 mg; máximo 80 mg/dia" },
        { rot: "TOC", val: "60 a 80 mg/dia — sintoma obsessivo-compulsivo responde a doses mais altas, e ainda assim raramente com resposta plenamente satisfatória" }
      ],
      porque: "Meia-vida muito longa, com metabólito ativo de vários dias. Isso a torna " +
              "perdoadora de dose esquecida e praticamente livre de síndrome de retirada — e, " +
              "pelo mesmo motivo, ruim quando se precisa trocar rápido de esquema. É o ISRS " +
              "que o SUS tem e o único que consta dos PCDT.",
      escolher: "Quando a adesão é irregular. Quando o paciente precisa de algo ativador e não " +
                "sedativo. E é a única escolha real quando a dispensação depende da farmácia " +
                "do SUS.",
      evitar: "Insônia importante — é a mais ativadora da classe. Quando se prevê troca " +
              "próxima de esquema, pela meia-vida longa. Nunca associar a IMAO.",
      contraind: "Uso de IMAO. No bipolar, monoterapia — o PCDT só a autoriza em combinação " +
                 "com olanzapina, lítio ou valproato.",
      adversos: "Ansiedade, agitação, cefaleia, insônia, anorexia, disfunção sexual (anorgasmia " +
                "e retardo ejaculatório), inibição do citocromo P-450 com interação relevante. " +
                "Irritabilidade no início pode ser do próprio ISRS.",
      monitor: "Reavaliar em 2 a 4 semanas. Manter dose plena por 6 a 8 semanas antes de " +
               "julgar falha — trocar antes disso cria falsa refratariedade.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013; e PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016"
    },
    {
      nome: "Sertralina",
      id: "sertralina",
      kw: "zoloft isrs gestante cardiopata interacao limpa",
      apres: "comprimido de 50 mg",
      dose: [
        { rot: "Dose usual", val: "50 a 150 mg/dia" },
        { rot: "Faixa terapêutica", val: "50 a 200 mg/dia" }
      ],
      porque: "Perfil de interação mais limpo que o da fluoxetina e o da paroxetina — inibe " +
              "menos o citocromo. É o que a torna a escolha tradicional em quem já toma muita " +
              "coisa: cardiopata, idoso polimedicado, gestante.",
      escolher: "Paciente polimedicado, cardiopata, e o período perinatal. Quando a interação " +
                "medicamentosa é a principal preocupação.",
      evitar: "Não consta da RENAME como antidepressivo de uso geral — conferir disponibilidade " +
              "antes, ou a receita não vira tratamento. Náusea e diarreia são mais frequentes " +
              "que nos demais ISRS.",
      contraind: "Uso de IMAO.",
      adversos: "Náusea e diarreia acima da média da classe, disfunção sexual, insônia ou sonolência.",
      monitor: "Reavaliar em 2 a 4 semanas.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Escitalopram",
      id: "escitalopram",
      kw: "lexapro isrs qt tolerabilidade",
      apres: "comprimido",
      dose: [
        { rot: "Dose usual", val: "10 mg/dia" },
        { rot: "Faixa terapêutica", val: "10 a 30 mg/dia" }
      ],
      porque: "É o ISRS mais seletivo da lista, o que se traduz em boa tolerabilidade e poucas " +
              "interações. O preço aparece no QT em dose alta.",
      escolher: "Quando tolerabilidade é a prioridade e o paciente já abandonou outro ISRS por " +
                "efeito adverso.",
      evitar: "Não está na RENAME como antidepressivo de uso geral. Atenção ao QT em dose alta, " +
              "sobretudo em idoso e em associação com outro fármaco que alargue QT.",
      contraind: "Uso de IMAO. QT longo.",
      adversos: "Os do grupo, em geral mais brandos. Prolongamento de QT dose-dependente.",
      monitor: "Reavaliar em 2 a 4 semanas. ECG se dose alta em idoso ou cardiopata.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Paroxetina",
      id: "paroxetina",
      kw: "paxil isrs retirada anticolinergico sedativa",
      apres: "comprimido",
      dose: [
        { rot: "Dose usual", val: "20 mg/dia" },
        { rot: "Faixa terapêutica", val: "10 a 50 mg/dia" }
      ],
      porque: "É o ISRS mais sedativo e o mais anticolinérgico — e o de meia-vida mais curta " +
              "sem metabólito ativo. Essa combinação explica as duas pontas: ajuda quando há " +
              "ansiedade marcada, e produz a pior síndrome de descontinuação da classe.",
      escolher: "Ansiedade marcada em que a sedação ajuda, e paciente com boa adesão que não " +
                "vai esquecer doses.",
      evitar: "Quem falha adesão — a retirada é intensa e o paciente lê o mal-estar como prova " +
              "de que precisa do remédio. Idoso, pelo efeito anticolinérgico. Gestação.",
      contraind: "Uso de IMAO. Gestação.",
      adversos: "Sedação, ganho de peso, disfunção sexual, síndrome de descontinuação marcada " +
                "(tontura, choque elétrico, irritabilidade, sintoma gripal).",
      monitor: "Nunca suspender abruptamente. Retirada gradual e combinada com o paciente.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Citalopram",
      id: "citalopram",
      kw: "isrs qt idoso",
      apres: "comprimido",
      dose: [
        { rot: "Dose usual", val: "20 mg/dia" },
        { rot: "Faixa terapêutica", val: "20 a 60 mg/dia" }
      ],
      porque: "Mistura racêmica da qual o escitalopram é o enantiômero ativo. Perfil " +
              "semelhante, com poucas interações.",
      escolher: "Alternativa ao escitalopram com o mesmo racional.",
      evitar: "Alargamento de QT em dose alta, sobretudo em idoso.",
      contraind: "Uso de IMAO. QT longo.",
      adversos: "Os do grupo. QT dose-dependente.",
      monitor: "Reavaliar em 2 a 4 semanas.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Amitriptilina",
      id: "amitriptilina",
      kw: "triciclico tryptanol dor cronica enxaqueca cardiotoxico overdose dose baixa",
      apres: "comprimido de 25 e 75 mg",
      dose: [
        { rot: "Regra dos tricíclicos", val: "sempre iniciar com 25 mg e aumentar 25 mg a cada 2 a 3 dias até o nível terapêutico" },
        { rot: "Dose usual", val: "150 a 200 mg/dia" },
        { rot: "Faixa terapêutica", val: "50 a 300 mg/dia" },
        { rot: "Limiar antidepressivo", val: "o efeito antidepressivo só aparece ACIMA de 100 mg/dia — abaixo disso trata dor e insônia, não depressão" }
      ],
      porque: "Bloqueia recaptação de serotonina e noradrenalina, e de quebra os receptores " +
              "histamínico, muscarínico e alfa-1. A ação em dor neuropática e em sono aparece " +
              "em dose baixa; a antidepressiva exige dose alta. É o exemplo clássico de fármaco " +
              "cuja DOSE define a indicação.",
      escolher: "Dose baixa, para o que ela faz bem e com segurança: polineuropatia periférica, " +
                "dor crônica, profilaxia de enxaqueca, insônia associada a dor.",
      evitar: "Como primeira linha em depressão — anticolinérgica, cardiotóxica em overdose e " +
              "causa hipotensão ortostática. Idoso. E risco de suicídio é contraindicação " +
              "relativa FORTE: a caixa inteira é o meio letal, e a morte é por arritmia.",
      contraind: "Cardiopatia, arritmia, IAM recente. Glaucoma de ângulo fechado. Retenção " +
                 "urinária e hiperplasia prostática. Uso de IMAO.",
      adversos: "Boca seca, constipação, retenção urinária, visão borrada, confusão em idoso, " +
                "sedação, ganho de peso, hipotensão postural, arritmia.",
      monitor: "ECG antes de iniciar em cardiopata e em idoso. Rever dose máxima considerando " +
               "o risco cardíaco.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Clomipramina",
      id: "clomipramina",
      kw: "anafranil triciclico toc panico dose alta",
      apres: "comprimido",
      dose: [
        { rot: "Dose usual", val: "150 a 200 mg/dia" },
        { rot: "Faixa terapêutica", val: "50 a 300 mg/dia" },
        { rot: "Ajuste por quadro", val: "doses MENORES costumam bastar no transtorno do pânico; doses MAIORES são necessárias no TOC" }
      ],
      porque: "É o tricíclico mais serotoninérgico — e é por isso que se destaca no TOC, onde " +
              "a resposta é proporcional ao bloqueio de recaptação de serotonina.",
      escolher: "TOC que não respondeu a ISRS em dose alta pelo tempo adequado. Pânico, em " +
                "dose menor.",
      evitar: "Mesmas restrições dos tricíclicos: cardiopatia, idoso, risco de suicídio.",
      contraind: "As da amitriptilina. Uso de IMAO.",
      adversos: "Anticolinérgicos, sedação, ganho de peso, disfunção sexual marcada.",
      monitor: "ECG em cardiopata e idoso.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Imipramina",
      id: "imipramina",
      kw: "tofranil triciclico",
      apres: "comprimido",
      dose: [
        { rot: "Dose usual", val: "150 a 200 mg/dia" },
        { rot: "Faixa terapêutica", val: "50 a 300 mg/dia" }
      ],
      porque: "Tricíclico de perfil intermediário, menos sedativo que a amitriptilina.",
      escolher: "Alternativa dentro da classe quando a sedação da amitriptilina incomoda.",
      evitar: "Mesmas restrições dos tricíclicos. O CAB destaca observar interações medicamentosas.",
      contraind: "As da amitriptilina. Uso de IMAO.",
      adversos: "Anticolinérgicos, cardiotoxicidade em overdose, hipotensão postural.",
      monitor: "ECG em cardiopata e idoso.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Bupropiona",
      id: "bupropiona",
      kw: "zyban wellbutrin tabagismo cessacao convulsao sexual peso",
      apres: "comprimido de 150 mg de liberação prolongada",
      dose: [
        { rot: "Esquema no tabagismo", val: "1º ao 3º dia: 1 comprimido de 150 mg pela manhã. 4º ao 84º dia: 150 mg pela manhã e outro 150 mg oito horas após a primeira tomada" },
        { rot: "Duração", val: "84 dias no protocolo de cessação" },
        { rot: "Dose em depressão", val: "sem fonte brasileira datada conferida — confirmar no protocolo do serviço" }
      ],
      porque: "Não é serotoninérgica: age em dopamina e noradrenalina. É por isso que não causa " +
              "disfunção sexual nem ganho de peso — os dois efeitos que mais fazem paciente " +
              "abandonar ISRS — e por isso que baixa o limiar convulsivo.",
      escolher: "Cessação tabágica, isolada ou associada à reposição de nicotina. E como " +
                "alternativa quando disfunção sexual ou ganho de peso inviabilizaram um ISRS. " +
                "Fumante deprimido é a indicação que resolve duas coisas com um fármaco.",
      evitar: "Epilepsia e qualquer condição que baixe o limiar convulsivo. Transtorno " +
              "alimentar. Abstinência alcoólica — aqui a soma de riscos convulsivos é real.",
      contraind: "Epilepsia, TCE, transtorno alimentar, abstinência de álcool ou " +
                 "benzodiazepínico. Exige retenção de receita pelo farmacêutico (Portaria SVS " +
                 "nº 344, de 1998).",
      adversos: "Insônia, boca seca, cefaleia, risco de convulsão dose-dependente.",
      monitor: "Rever a indicação diante de qualquer antecedente convulsivo.",
      fonte: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020"
    },
    {
      nome: "Venlafaxina",
      id: "venlafaxina",
      kw: "efexor irsn dual retirada pressao",
      apres: "cápsula de liberação prolongada",
      dose: [
        {
          rot: "Dose mínima efetiva",
          val: "75 mg/dia VO para depressão",
          p: 342
        },
        {
          rot: "Idoso",
          val: "Iniciar 37,5 mg pela manhã; aumentar para 75 mg de liberação prolongada após 1 semana. Manutenção: 75–150 mg/dia; ocasionalmente 225 mg/dia, sob reavaliação",
          p: 702
        }
      ],
      porque: "Inibe recaptação de serotonina e noradrenalina. A retirada abrupta é especialmente problemática.",
      escolher: "Depressão com indicação de troca de antidepressivo; ponderar resposta anterior e tolerabilidade.",
      evitar: "Hipertensão não controlada, polifarmácia serotoninérgica e interrupção abrupta. A faixa geriátrica não é um esquema universal para adultos.",
      contraind: "Associação com IMAO; respeitar a transição específica entre os fármacos.",
      adversos: "Náusea, disfunção sexual, elevação pressórica e sintomas de retirada.",
      monitor: "Pressão arterial, adesão, resposta do humor, ativação e ideação suicida após início ou mudança de dose.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    },
    {
      nome: "Mirtazapina",
      id: "mirtazapina",
      kw: "remeron apetite peso insonia sedacao",
      apres: "comprimido",
      dose: [
        {
          rot: "Dose mínima efetiva",
          val: "30 mg/dia VO para depressão; o livro registra incerteza sobre 15 mg/dia como mínimo efetivo",
          p: 342
        },
        {
          rot: "Titulação",
          val: "Exemplo de introdução durante troca: 15 mg/dia, depois 30 mg/dia e, se necessário, 45 mg/dia; ajustar à tolerabilidade, não aplicar automaticamente",
          p: 366
        },
        {
          rot: "Idoso",
          val: "Iniciar 7,5 mg ou usualmente 15 mg à noite; manutenção 15–30 mg à noite; máximo 45 mg à noite",
          p: 701
        }
      ],
      porque: "O perfil sedativo e o aumento de apetite podem ajudar quando insônia e perda de peso acompanham a depressão.",
      escolher: "Depressão com insônia e baixo apetite, quando o ganho de peso não é um problema.",
      evitar: "Obesidade, risco metabólico e sonolência com prejuízo funcional. Sedar não comprova resposta antidepressiva.",
      contraind: "Associação com IMAO; planejar intervalo de troca.",
      adversos: "Sonolência, aumento de apetite e de peso; risco metabólico com manutenção.",
      monitor: "Peso, apetite, sedação diurna, quedas e resposta depressiva, além de ativação e risco suicida.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    },
    {
      nome: "Trazodona",
      id: "trazodona",
      kw: "donaren insonia sedacao antidepressivo",
      apres: "comprimido; conferir a formulação antes de usar",
      dose: [
        {
          rot: "Insônia — uso fora de bula",
          val: "25–150 mg VO próximo de deitar; individualizar, sem substituir TCC-I",
          f: "ABS — Diretriz de Insônia em Adultos, 2023"
        },
        {
          rot: "Dose mínima efetiva",
          val: "150 mg/dia VO para depressão; não confundir dose hipnótica com tratamento antidepressivo",
          p: 342,
          f: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
        },
        {
          rot: "Idoso",
          val: "Depressão: iniciar 100 mg/dia, divididos ou à noite; manutenção 100–200 mg/dia; máximo 300 mg/dia. Reavaliar sedação e hipotensão",
          p: 701,
          f: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
        }
      ],
      porque: "O efeito sedativo aparece em doses usadas para sono; tratar depressão exige avaliar a faixa antidepressiva.",
      escolher: "Insônia com comorbidade depressiva, após avaliação e medidas não farmacológicas; não é primeira resposta a toda queixa de sono.",
      evitar: "Quedas, hipotensão e associação a outros sedativos. Não usar em crianças, adolescentes, gestantes ou lactantes para insônia segundo a ABS.",
      contraind: "Associação com IMAO; doença cardíaca exige revisão do risco antes da escolha.",
      adversos: "Sonolência, hipotensão postural, arritmia e priapismo.",
      monitor: "Sedação diurna, pressão em ortostatismo, interações e sintomas cardíacos; orientar urgência se ereção prolongada.",
      fonte: "ABS — Diretriz de Insônia em Adultos, 2023"
    },
    {
      nome: "Duloxetina",
      id: "duloxetina",
      kw: "cymbalta irsn dual dor neuropatica",
      apres: "cápsula",
      dose: [
        {
          rot: "Dose mínima efetiva",
          val: "60 mg/dia VO para depressão",
          p: 342
        },
        {
          rot: "Idoso",
          val: "Iniciar 30 mg/dia; manutenção 60 mg/dia; máximo 120 mg/dia, com cautela pela escassez de dados geriátricos nessa dose",
          p: 701
        }
      ],
      porque: "Dual serotoninérgico e noradrenérgico; pode ser útil quando depressão e dor coexistem.",
      escolher: "Depressão com dor, considerando função hepática e renal antes da prescrição.",
      evitar: "Hepatopatia, uso importante de álcool e combinações serotoninérgicas; não extrapolar a faixa para insuficiência orgânica.",
      contraind: "Associação com IMAO. Disfunção hepática ou renal importante exige checagem da bula e alternativa antes de iniciar.",
      adversos: "Náusea, disfunção sexual, sintomas de retirada e possível lesão hepática.",
      monitor: "Humor, risco suicida, tolerância, pressão, função hepática conforme risco e revisão da função renal.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    },
    {
      nome: "Fluvoxamina",
      id: "fluvoxamina",
      kw: "luvox isrs toc obsessao compulsao cyp",
      apres: "comprimido",
      dose: [
        {
          rot: "TOC — faixa",
          val: "100–300 mg/dia VO; alcançar progressivamente conforme tolerância",
          f: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011"
        },
        {
          rot: "Dose mínima efetiva",
          val: "50 mg/dia VO para depressão; não é a faixa-alvo do TOC",
          p: 342,
          f: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
        }
      ],
      porque: "ISRS com uso no TOC; as interações por inibição enzimática pesam na escolha.",
      escolher: "TOC com indicação farmacológica, associado à terapia com exposição e prevenção de resposta.",
      evitar: "Polifarmácia, especialmente clozapina e clomipramina: pode aumentar exposição e toxicidade. Não combinar por conta própria.",
      contraind: "Associação com IMAO; evitar agomelatina concomitante conforme a referência de interações.",
      adversos: "Náusea, sonolência ou insônia, astenia, nervosismo e disfunção sexual.",
      monitor: "Lista completa de medicamentos, adesão, obsessões e compulsões, ativação e risco suicida; uso infantojuvenil requer acompanhamento especializado.",
      fonte: "AMB/ABP — Transtorno Obsessivo-Compulsivo: Tratamento, 2011"
    }
]
});

PSICOFARMACOS.classes.push({
  rot: "Benzodiazepínicos e hipnóticos",
  kw: "diazepam clonazepam lorazepam alprazolam bromazepam midazolam clordiazepoxido ansiolitico dependencia retirada meia vida",
  quando: "Ansiedade aguda, crise, agitação, abstinência alcoólica e insônia por prazo curto. " +
          "Sempre com prazo definido desde a PRIMEIRA receita.",
  nota: "A escolha entre eles é por MEIA-VIDA, não por potência — meia-vida longa protege " +
        "contra rebote entre doses e serve à abstinência; meia-vida curta age rápido e " +
        "produz rebote e dependência. O CAB nº 34 é direto: colocar prazo limite de algumas " +
        "semanas desde o início e negociar a redução gradual. Gotas (clonazepam e bromazepam) " +
        "permitem retirar cerca de 0,12 mg a cada 2 semanas — é o que torna a descontinuação viável.",
  farmacos: [
    {
      nome: "Diazepam",
      id: "diazepam",
      kw: "valium meia vida longa abstinencia alcoolica intramuscular",
      apres: "comprimido de 5 e 10 mg; solução injetável",
      dose: [
        { rot: "Meia-vida", val: "30 a 100 horas" },
        { rot: "Faixa terapêutica", val: "2,5 a 30 mg/dia" },
        { rot: "Dose usual", val: "10 mg" },
        { rot: "Perfil", val: "ansiolítico e para insônia terminal" },
        { rot: "Abstinência alcoólica", val: "Estágio 2 (agitação, tremor, alucinação): 10–20 mg VO de hora em hora até sintomas leves, com SAMU e encaminhamento. Estágio 3 (convulsão): 10 mg EV até de hora em hora enquanto aguarda o SAMU. Não é titulação genérica de SAA leve/APS.", f: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23" }
      ],
      porque: "Meia-vida muito longa com metabólitos ativos: o nível cai sozinho, devagar. " +
              "É exatamente o que se quer numa abstinência alcoólica — a própria " +
              "farmacocinética faz o desmame.",
      escolher: "Abstinência alcoólica, e ansiedade em que o rebote entre doses é o problema.",
      evitar: "Idoso (acumula) e hepatopata (metabolismo hepático). E a via INTRAMUSCULAR: o " +
              "CAB desaconselha, porque a absorção IM é lenta e variável — diazepam IM em " +
              "agitação é erro comum e não funciona quando se precisa.",
      contraind: "Miastenia gravis. Apneia do sono grave. Insuficiência respiratória. " +
                 "Associação a outro depressor do SNC.",
      adversos: "Sedação, queda e acidente, déficit de atenção e de fixação, tolerância, " +
                "dependência, depressão respiratória quando associado a outro sedativo.",
      monitor: "Prazo definido desde a primeira receita.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Clonazepam",
      id: "clonazepam",
      kw: "rivotril gotas retirada gradual acatisia",
      apres: "comprimido; solução oral em gotas",
      dose: [
        { rot: "Meia-vida", val: "30 a 100 horas" },
        { rot: "Faixa terapêutica", val: "0,5 a 8 mg/dia" },
        { rot: "Dose usual", val: "0,5 a 2 mg" },
        { rot: "Perfil", val: "intermediário; por vezes usado no tratamento da epilepsia" },
        { rot: "Acatisia", val: "0,5 a 2 mg/dia, como alternativa ao propranolol" },
        { rot: "Retirada", val: "em gotas, reduzir 1 gota (cerca de 0,12 mg) a cada 2 semanas ou mais" }
      ],
      porque: "Junta meia-vida longa com apresentação em gotas. A gota é o detalhe que decide: " +
              "sem ela, o degrau mínimo de retirada é grande demais e o paciente não consegue " +
              "descer.",
      escolher: "Quando se prevê que vai ser preciso RETIRAR depois — e quase sempre é. " +
                "Também é opção para acatisia.",
      evitar: "É o benzodiazepínico mais prescrito cronicamente no Brasil, e o que mais chega " +
              "à unidade como uso de anos sem indicação revista. Renovar por inércia é a " +
              "iatrogenia mais comum da atenção básica.",
      contraind: "As gerais da classe.",
      adversos: "Sedação, déficit cognitivo, tolerância, dependência.",
      monitor: "Revisar a indicação a cada renovação de receita. Não renovar sem reavaliar.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Lorazepam",
      id: "lorazepam",
      kw: "lorax hepatopata renal idoso",
      apres: "comprimido",
      dose: [
        { rot: "Meia-vida", val: "6 a 20 horas" },
        { rot: "Faixa terapêutica", val: "0,5 a 6 mg/dia" },
        { rot: "Dose usual", val: "2 mg" },
        { rot: "Perfil", val: "intermediário" }
      ],
      porque: "Não depende de oxidação hepática — é conjugado e eliminado por via renal. É o " +
              "único da lista que o fígado doente não acumula.",
      escolher: "Graus leves de insuficiência hepática. É a escolha quando o fígado é o problema.",
      evitar: "As restrições gerais da classe.",
      contraind: "As gerais da classe.",
      adversos: "Sedação, dependência.",
      monitor: "Prazo definido.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Alprazolam",
      id: "alprazolam",
      kw: "frontal panico indutor rebote dependencia",
      apres: "comprimido",
      dose: [
        { rot: "Meia-vida", val: "6 a 20 horas" },
        { rot: "Faixa terapêutica", val: "0,5 a 2,0 mg/dia" },
        { rot: "Dose usual", val: "0,5 a 2 mg" },
        { rot: "Perfil", val: "indutor do sono; útil em transtornos ansiosos, principalmente no transtorno do pânico" }
      ],
      porque: "Início rápido e meia-vida curta. O início rápido é o que alivia o pânico; a " +
              "meia-vida curta é o que produz ansiedade de rebote entre as doses, e o rebote " +
              "é o que ensina o paciente a tomar de novo.",
      escolher: "Crise de pânico, pontualmente, pela rapidez.",
      evitar: "Uso continuado. É o de maior potencial de dependência da lista, justamente pelo " +
              "ciclo alívio-rebote.",
      contraind: "As gerais da classe.",
      adversos: "Rebote, dependência rápida, retirada difícil.",
      monitor: "Prazo curto e explícito, dito em voz alta na consulta.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Bromazepam",
      id: "bromazepam",
      kw: "lexotan gotas indutor",
      apres: "comprimido; solução oral em gotas",
      dose: [
        { rot: "Meia-vida", val: "8 a 19 horas" },
        { rot: "Faixa terapêutica", val: "1,5 a 20 mg/dia" },
        { rot: "Dose usual", val: "3 mg" },
        { rot: "Perfil", val: "indutor do sono" }
      ],
      porque: "Como o clonazepam, tem gotas — e por isso serve para retirada lenta.",
      escolher: "Quando se quer a apresentação em gotas com meia-vida menor que a do clonazepam.",
      evitar: "As restrições gerais da classe.",
      contraind: "As gerais da classe.",
      adversos: "Sedação, dependência.",
      monitor: "Prazo definido.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Midazolam",
      id: "midazolam",
      kw: "dormonid agitacao intramuscular emergencia",
      apres: "comprimido; solução injetável",
      dose: [
        { rot: "Meia-vida", val: "1 a 5 horas" },
        { rot: "Faixa terapêutica", val: "7,5 a 30 mg" },
        { rot: "Dose usual", val: "15 mg" },
        { rot: "Perfil", val: "indutor do sono; baixo desenvolvimento de tolerância" }
      ],
      porque: "Hidrossolúvel no frasco e lipossolúvel no pH do corpo: por isso a absorção " +
              "intramuscular é rápida e confiável, ao contrário da do diazepam. É o que o " +
              "torna o benzodiazepínico da emergência.",
      escolher: "Agitação em que a via oral foi recusada — o CAB destaca a prescrição " +
                "intramuscular como útil nessa situação.",
      evitar: "Depressão respiratória, sobretudo associado a outro sedativo ou a álcool. " +
              "Meia-vida curta significa que o efeito passa e a agitação pode voltar.",
      contraind: "Insuficiência respiratória. Associação a outro depressor do SNC sem monitorização.",
      adversos: "Sedação profunda, depressão respiratória, amnésia anterógrada.",
      monitor: "Monitorização respiratória quando usado por via parenteral.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Clordiazepóxido",
      id: "clordiazepoxido",
      kw: "abstinencia alcoolica meia vida longa",
      apres: "comprimido",
      dose: [
        { rot: "Meia-vida", val: "30 a 100 horas" },
        { rot: "Faixa terapêutica", val: "5 a 75 mg/dia" },
        { rot: "Dose usual", val: "25 mg" },
        { rot: "Perfil", val: "ansiolítico e para insônia terminal" },
        { rot: "Abstinência alcoólica", val: "20–30 mg VO conforme sintomas, até de hora em hora; apenas em ambiente especializado com avaliação repetida de consciência, respiração e sinais vitais", p: 486, f: "Maudsley Prescribing Guidelines, 15ª ed., 2025" }
      ],
      porque: "Mesmo racional do diazepam: meia-vida longa que faz o próprio desmame.",
      escolher: "Abstinência alcoólica.",
      evitar: "Idoso e hepatopata, pelo acúmulo.",
      contraind: "As gerais da classe.",
      adversos: "Sedação, acúmulo.",
      monitor: "Prazo definido.",
      fonte: "MS — CAB nº 34, Saúde Mental, 2013"
    },
    {
      nome: "Zolpidem",
      id: "zolpidem",
      kw: "stilnox z drug hipnotico insonia queda",
      apres: "comprimido de liberação imediata; conferir se a formulação é CR",
      dose: [
        { rot: "Dose usual", val: "5 a 10 mg VO de liberação imediata ao deitar, no máximo 4 semanas", f: "ABS — Diretriz de Insônia em Adultos, 2023" },
        { rot: "Idoso", val: "iniciar 5 mg de liberação imediata; não passar de 10 mg na regular nem de 12,5 mg na CR", f: "ABS — Diretriz de Insônia em Adultos, 2023" }
      ],
      porque: "Agonista do sítio benzodiazepínico, seletivo de subunidade. Induz sono; não trata a causa da insônia.",
      escolher: "Insônia inicial no adulto quando a TCC-I não está disponível ou enquanto ela começa — curto e intermitente.",
      evitar: "Idoso com queda, apneia, uso de álcool, gravidez, parasomnia. Não é tratamento crônico.",
      contraind: "Miastenia, insuficiência respiratória grave, hipersensibilidade.",
      adversos: "Sonolência residual, amnésia, sonambulismo, queda, dependência, efeito rebote ao cortar.",
      monitor: "Queda, uso além de 4 semanas, parasomnia, uso concomitante de álcool.",
      fonte: "ABS — Diretriz de Insônia em Adultos, 2023"
    },
    {
      nome: "Melatonina",
      id: "melatonina",
      kw: "hormonio pineal sono cronobiotico",
      apres: "apresentação variável; sem registro ativo na Anvisa (CSV 2026-09-23)",
      dose: [
        { rot: "Adulto — insônia crônica", val: "a ABS não recomenda planejamento terapêutico: não há efetividade comprovada no adulto saudável", f: "ABS — Diretriz de Insônia em Adultos, 2023" },
        { rot: "Criança e adolescente", val: "acima de 5 mg o efeito tende a ser sedativo direto, não cronobiótico", p: 621, f: "Maudsley Prescribing Guidelines, 15ª ed., 2025" }
      ],
      porque: "Hormônio pineal; o exógeno tenta copiar o sinal de escuro. Não é hipnótico de primeira linha no adulto.",
      escolher: "Insônia inicial do idoso ou da criança com TEA/TDAH, depois de higiene do sono — e ainda assim a evidência é limitada.",
      evitar: "Vender como se fosse TCC-I. Produto sem grau farmacêutico. Sem registro ativo no Brasil.",
      contraind: "Hipersensibilidade. Gravidez: a ABS não indica.",
      adversos: "Sonolência, cefaleia; convulsão relatada em criança neurológica na literatura que o Maudsley cita.",
      monitor: "Horário, produto usado, crise em quem já tem epilepsia.",
      fonte: "ABS — Diretriz de Insônia em Adultos, 2023"
    }
  ]
});

PSICOFARMACOS.classes.push({
  rot: "Manejo de efeito adverso motor",
  kw: "biperideno akineton propranolol acatisia distonia parkinsonismo discinesia tardia extrapiramidal",
  quando: "Sempre que houver sintoma motor após iniciar ou aumentar antipsicótico. " +
          "Identificar QUAL é o sintoma decide o tratamento — e os tratamentos são opostos.",
  nota: "Quatro quadros, quatro condutas. Distonia aguda (horas a dias) e parkinsonismo " +
        "(semanas) respondem a ANTICOLINÉRGICO. Acatisia (dias) NÃO responde a biperideno: " +
        "trata-se reduzindo a dose, com propranolol ou benzodiazepínico. Discinesia tardia " +
        "(meses a anos) PIORA com anticolinérgico e é indicação formal de trocar por clozapina.",
  farmacos: [
    {
      nome: "Biperideno",
      id: "biperideno",
      kw: "akineton anticolinergico distonia parkinsonismo",
      apres: "comprimido; solução injetável",
      dose: [
        { rot: "Faixa", val: "1 a 16 mg/dia, divididos em 1 a 4 administrações, conforme a intensidade dos sintomas" }
      ],
      porque: "Antiparkinsoniano anticolinérgico: reequilibra a razão dopamina/acetilcolina " +
              "que o bloqueio D2 desfez. Só faz sentido nos quadros que vêm desse " +
              "desequilíbrio — distonia e parkinsonismo.",
      escolher: "Distonia aguda (torcicolo, crise oculógira, trismo) e parkinsonismo " +
                "medicamentoso. Na distonia a resposta é rápida e tranquiliza o paciente, " +
                "que costuma estar apavorado.",
      evitar: "NÃO trata acatisia — é o erro mais repetido na enfermaria. PIORA discinesia " +
              "tardia. Uso profilático crônico não se justifica. Cuidado em idoso: confusão " +
              "e retenção urinária.",
      contraind: "Glaucoma de ângulo fechado. Hiperplasia prostática com retenção. Íleo " +
                 "paralítico. Demência — o anticolinérgico piora cognição.",
      adversos: "Boca seca, visão borrada, retenção urinária, constipação, confusão em idoso, " +
                "potencial de uso abusivo.",
      monitor: "Reavaliar a necessidade periodicamente.",
      fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013"
    },
    {
      nome: "Propranolol (para acatisia)",
      id: "propranolol-para-acatisia",
      kw: "acatisia betabloqueador inquietacao ansiedade de desempenho",
      apres: "comprimido de 10, 40 e 80 mg",
      dose: [
        { rot: "Acatisia (PCDT)", val: "40 a 160 mg/dia, divididos em 2 a 3 administrações" },
        { rot: "Acatisia (CAB 34)", val: "40 a 80 mg/dia" },
        { rot: "Alternativa (CAB 34)", val: "clonazepam 0,5 a 2 mg/dia" }
      ],
      porque: "Betabloqueador não seletivo e lipossolúvel, ou seja, atravessa a barreira " +
              "hematoencefálica — é o que o diferencia do atenolol para uso em psiquiatria. " +
              "Corta o componente autonômico sem sedar.",
      escolher: "Acatisia, junto com a redução da dose do antipsicótico. Também usado no " +
                "tremor fino induzido pelo lítio.",
      evitar: "Asma e DPOC — broncoespasmo. Bradicardia e bloqueio atrioventricular. " +
              "Diabético em insulina, porque mascara os sinais adrenérgicos de hipoglicemia.",
      contraind: "Asma, DPOC, bradicardia, BAV de 2º e 3º grau, choque, insuficiência cardíaca " +
                 "descompensada.",
      adversos: "Bradicardia, hipotensão, broncoespasmo, fadiga.",
      monitor: "Frequência cardíaca e pressão arterial.",
      fonte: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; alternativa com clonazepam do CAB nº 34 (MS), 2013"
    }
  ]
});

PSICOFARMACOS.classes.push({
  rot: "Dependência química — farmacoterapia",
  kw: "alcool naltrexona acamprosato dissulfiram nicotina adesivo goma pastilha tabagismo tiamina abstinencia",
  quando: "Transtorno por uso de substância. O tabagismo tem protocolo do MS com doses; " +
          "o álcool não tem PCDT com posologia conferida.",
  farmacos: [
    {
      nome: "Terapia de reposição de nicotina",
      id: "terapia-de-reposicao-de-nicotina",
      kw: "adesivo transdermico goma pastilha nicotina cigarro",
      apres: "adesivo transdérmico de 7, 14 e 21 mg; goma de mascar de 2 mg; pastilha de 2 mg",
      dose: [
        { rot: "Regra geral", val: "repor cerca de 1 mg de nicotina para cada cigarro fumado; não ultrapassar 42 mg/dia" },
        { rot: "Até 5 cigarros/dia", val: "adesivo não indicado — iniciar com goma ou pastilha, sem ultrapassar 5 gomas ou pastilhas de 2 mg (ou 3 de 4 mg)" },
        { rot: "6 a 10 cigarros/dia", val: "adesivo de 7 mg/dia" },
        { rot: "11 a 19 cigarros/dia", val: "adesivo de 14 mg/dia" },
        { rot: "20 ou mais cigarros/dia", val: "adesivo de 21 mg/dia" },
        { rot: "Associação de adesivos", val: "21+21, 21+14 e 21+7 mg/dia para fumantes pesados e motivados" },
        { rot: "Retirada", val: "reduzir 7 mg por semana, avaliando a resposta" }
      ],
      porque: "Separa a nicotina do cigarro: mantém o nível que evita a abstinência e retira " +
              "o veículo que adoece. A forma lenta (adesivo) faz a base, a rápida (goma, " +
              "pastilha) cobre a fissura pontual — por isso a combinada rende mais que qualquer uma só.",
      escolher: "A TRN COMBINADA (uma lenta + uma rápida) é o tratamento PREFERENCIAL do " +
                "protocolo, por maior eficácia.",
      evitar: "Não usar junto com o cigarro ou outra fonte de nicotina.",
      contraind: "Conforme a bula; cautela em evento coronariano recente.",
      adversos: "Irritação de pele sob o adesivo, insônia, náusea.",
      monitor: "Consumo diário de cigarros, para ajustar a dose.",
      fonte: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020"
    },
    {
      nome: "Naltrexona",
      id: "naltrexona",
      kw: "revia alcool fissura opioide recaida",
      apres: "comprimido",
      dose: [
        {
          rot: "Dose inicial",
          val: "25 mg VO/dia na primeira semana",
          f: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004"
        },
        {
          rot: "Dose usual",
          val: "50 mg VO/dia após a primeira semana, conforme tolerância",
          f: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004"
        },
        {
          rot: "Titulação — referência complementar",
          val: "25 mg/dia por 2 dias como teste de tolerância; depois 50 mg/dia",
          p: 490,
          f: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
        }
      ],
      porque: "Antagoniza receptores opioides e reduz o reforço do álcool e recaídas no consumo pesado.",
      escolher: "Manutenção e prevenção de recaída junto de abordagem psicossocial; não trata abstinência aguda.",
      evitar: "Quem precisa de analgesia opioide. Investigar uso recente, pois pode precipitar abstinência.",
      contraind: "Uso de opioides ou dependência deles, hepatite aguda e doença hepática grave.",
      adversos: "Náusea e outros sintomas gastrointestinais; atenção à lesão hepática.",
      monitor: "Função hepática basal e no seguimento, adesão, consumo de álcool e necessidade de analgesia.",
      fonte: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004",
      diverge: "ABP/RBP, 2004, usa introdução reduzida na primeira semana; Maudsley, 2025, p. 490, usa teste mais curto. A dose de manutenção coincide. São alternativas, não esquemas cumulativos."
    },
    {
      nome: "Acamprosato",
      id: "acamprosato",
      kw: "campral alcool abstinencia glutamato renal",
      apres: "comprimido de 333 mg",
      dose: [
        {
          rot: "Manutenção — acima de 60 kg",
          val: "2 comprimidos de 333 mg VO em cada uma das três tomadas diárias, antes das refeições",
          f: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004"
        },
        {
          rot: "Manutenção — abaixo de 60 kg (fonte BR)",
          val: "1 comprimido de 333 mg VO em cada uma das três tomadas diárias; ver divergência antes de prescrever",
          f: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004"
        },
        {
          rot: "Manutenção — referência complementar",
          val: "Acima de 60 kg: 666 mg VO três vezes ao dia (1998 mg/dia). Abaixo de 60 kg: 1332 mg/dia",
          p: 489,
          f: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
        }
      ],
      porque: "Modula a hiperexcitabilidade glutamatérgica associada à dependência e ajuda a sustentar a abstinência.",
      escolher: "Pessoa que conquistou abstinência, junto de cuidado psicossocial. Conferir peso, função renal e apresentação disponível.",
      evitar: "Usar para tratar abstinência aguda ou prescrever sem função renal. Peso no limite entre faixas requer confirmar o esquema na bula vigente.",
      contraind: "Insuficiência renal grave; evitar na gestação e lactação. Hepatopatia grave exige avaliação especializada.",
      adversos: "Diarreia, náusea, dor abdominal e prurido.",
      monitor: "Função renal antes de iniciar, tolerância gastrointestinal, adesão às tomadas e consumo de álcool.",
      fonte: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004",
      diverge: "ABP/RBP, 2004, e Maudsley, 2025, p. 489, divergem na dose abaixo do limite de peso; as duas linhas ficam explícitas. Não escolher silenciosamente: confirmar bula vigente e prescrição especializada. Ambos concordam no regime para peso acima do limite."
    },
    {
      nome: "Dissulfiram",
      id: "dissulfiram",
      kw: "antabuse antietanol alcool aversivo supervisao",
      apres: "comprimido",
      dose: [
        {
          rot: "Dose usual",
          val: "250 mg VO/dia em tomada única; iniciar após pelo menos 12 horas de abstinência, com consentimento e supervisão",
          f: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004"
        }
      ],
      porque: "Inibe o metabolismo do acetaldeído e provoca reação tóxica quando há consumo de álcool; não é medicamento anticraving.",
      escolher: "Pessoa com meta de abstinência, compreensão dos riscos e tomada supervisionada, após discutir alternativas.",
      evitar: "Prescrição escondida, ausência de consentimento, incapacidade de compreender riscos e exposição a álcool em produtos.",
      contraind: "Gestação, cardiopatia importante, psicose e hepatopatia grave; cirrose com hipertensão portal e epilepsia exigem evitar a escolha.",
      adversos: "Hepatite, halitose e reação álcool-dissulfiram potencialmente grave.",
      monitor: "Função hepática basal e seriada, sinais de hepatite e adesão supervisionada. Suspender e avaliar diante de icterícia.",
      fonte: "ABP/RBP — Tratamento farmacológico da dependência do álcool, 2004",
      diverge: "ABP/RBP, 2004, orienta dose diária habitual sem carga; Maudsley, 2025, p. 491, descreve carga e manutenção diferentes. Mantida a orientação brasileira; não importar o esquema britânico automaticamente."
    },
    {
      nome: "Tiamina",
      id: "tiamina",
      kw: "vitamina b1 wernicke korsakoff alcool glicose",
      apres: "oral ou parenteral; conferir concentração e disponibilidade local",
      dose: [
        {
          rot: "Profilaxia — manejo inicial",
          val: "100 mg IM/EV em desnutrição, má absorção ou antecedente de abstinência grave, antes do encaminhamento",
          f: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23"
        },
        {
          rot: "Profilaxia — alternativa oral",
          val: "300 mg VO quando não há apresentação parenteral; via oral menos eficaz",
          f: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23"
        },
        {
          rot: "Profilaxia hospitalar — referência complementar",
          val: "200–300 mg IM/EV uma vez ao dia por 3–5 dias, com reavaliação diária",
          p: 488,
          f: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
        }
      ],
      porque: "Repõe vitamina necessária ao metabolismo energético; deficiência no uso crônico de álcool pode causar Wernicke.",
      escolher: "Prevenção na pessoa em risco. Suspeita de Wernicke é emergência hospitalar e requer tratamento parenteral, não o esquema oral profilático.",
      evitar: "Esperar a tríade completa. Dar glicose sem indicação ou atrasar a correção de hipoglicemia para esperar tiamina.",
      contraind: "Hipersensibilidade à preparação; administração parenteral em local com suporte para reação alérgica.",
      adversos: "Reações locais e hipersensibilidade, particularmente pela via parenteral.",
      monitor: "Glicemia, estado nutricional, consciência, marcha, motricidade ocular e resposta clínica. Preferir tiamina antes da glicose quando possível, sem retardar resgate da hipoglicemia.",
      fonte: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23",
      diverge: "MS — Linha de Cuidado, consulta 2026, descreve profilaxia inicial antes do encaminhamento; Maudsley, 2025, p. 488, detalha profilaxia hospitalar com dose e duração diferentes. Nenhum desses esquemas deve ser apresentado como tratamento completo de Wernicke estabelecida."
    },
    {
      nome: "Naloxona",
      id: "naloxona",
      kw: "narcan antidoto opioide overdose hipoventilacao",
      apres: "ampola 0,4 mg/mL; spray nasal em alguns serviços",
      dose: [
        { rot: "Dose inicial", val: "adulto: 0,04 mg na primeira, 0,4 mg na segunda, 2 mg na terceira e 10 mg na quarta, IV/IO/ET a cada 2 a 3 min", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
        { rot: "Faixa", val: "0,4 a 2 mg IV, repetir a cada 2 a 3 min até 10 mg; começar com 0,04 mg se ainda ventila", f: "SMS-SP — Manual de Toxicologia Clínica, 2017" }
      ],
      porque: "Antagonista opioide. Reverte hipoventilação; não trata abstinência e não previne edema pulmonar.",
      escolher: "Coma com miose e frequência respiratória baixa. Via aérea primeiro se não reverter.",
      evitar: "Alta nos minutos após a dose — o opioide dura mais. Dependente: a reversão dispara abstinência aguda.",
      contraind: "Hipersensibilidade. No dependente, a indicação permanece se há apneia — preparar para a privação.",
      adversos: "Abstinência precipitada, agitação, vômito, edema pulmonar não prevenido.",
      monitor: "Frequência respiratória por horas. Metadona e opioide de longa ação ressedam.",
      fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016"
    },
    {
      nome: "Metadona",
      id: "metadona",
      kw: "ost agonista opioide abstinencia manutencao qt",
      apres: "solução 1 mg/mL (o Maudsley manda só nessa apresentação)",
      dose: [
        { rot: "Dose inicial", val: "hospital geral: 10–20 mg, com 5–10 mg a cada 6 h se a abstinência persistir, até 40 mg em 24 h", p: 505 },
        { rot: "Dose usual", val: "manutenção usual 60–100 mg/dia", p: 503 }
      ],
      porque: "Agonista mu pleno, meia-vida longa. Primeira linha de abstinência e manutenção na diretriz brasileira.",
      escolher: "Dependência de opioide confirmada, com protocolo. Não iniciar no intoxicado.",
      evitar: "Intoxicação por álcool ou benzodiazepínico. QT longo. Criança em casa com o frasco.",
      contraind: "Intoxicação aguda por depressor. Hipersensibilidade.",
      adversos: "Depressão respiratória na titulação, QT, sedação, constipação, morte se desviar.",
      monitor: "Sedação, frequência respiratória, ECG se dose alta ou fator de QT. Não-especialista pede protocolo local.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    },
    {
      nome: "Buprenorfina",
      id: "buprenorfina",
      kw: "subutex agonista parcial opioide precipita abstinencia",
      apres: "comprimido sublingual",
      dose: [
        { rot: "Dose inicial", val: "em abstinência visível, sem fator de risco: 8 mg no primeiro dia; sem abstinência: 4 mg; com risco: 2–4 mg; no máximo 8 mg no primeiro dia fora de serviço especializado", p: 509 },
        { rot: "Dose usual", val: "manutenção 12–24 mg/dia sublingual", p: 503 }
      ],
      porque: "Agonista parcial de alta afinidade. Bloqueia o pleno; se o receptor ainda está ocupado, precipita abstinência.",
      escolher: "OST quando metadona não vai, ou em quem já está em privação visível.",
      evitar: "Iniciar com heroína ou metadona ainda no receptor. Trocar de metadona para buprenorfina sem janela.",
      contraind: "Hipersensibilidade. Intoxicação aguda.",
      adversos: "Abstinência precipitada, náusea, insônia, cefaleia. Menos QT que metadona.",
      monitor: "Sinais de privação antes da primeira dose. Não-especialista pede protocolo.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    }
]
});

PSICOFARMACOS.classes.push({
  rot: "Fármacos de outras classes usados em psiquiatria",
  kw: "cetamina ketamina escetamina esketamina spravato nmda glutamato anestesico betabloqueador anticolinergico antiepileptico off label",
  quando: "Fármacos registrados para outra finalidade que têm uso psiquiátrico estabelecido. " +
          "Alguns com registro próprio na ANVISA, outros off-label.",
  nota: "Off-label não é proibido: o Parecer CFM nº 02/2016 define como uso fora das " +
        "indicações de bula ou protocolo, e a Resolução CFM nº 1.982/2012 coloca a " +
        "indicação e a prescrição sob responsabilidade do médico. O que muda é que a " +
        "responsabilidade é sua e o registro em prontuário precisa sustentar a escolha.",
  farmacos: [
    {
      nome: "Escetamina intranasal",
      id: "escetamina-intranasal",
      kw: "spravato escetamina esketamina nmda depressao resistente suicida anvisa",
      apres: "spray nasal de cloridrato de escetamina",
      dose: [
        { rot: "Dose", val: "sem fonte datada conferida neste levantamento — confirmar na bula aprovada pela ANVISA" },
        { rot: "Ambiente", val: "exclusivamente em ambiente clínico (hospital ou clínica especializada), sempre com supervisão médica" },
        { rot: "Monitorização", val: "o paciente é monitorizado por NO MÍNIMO DUAS HORAS após a administração" },
        { rot: "Nunca isolada", val: "aprovada EM CONJUNTO com terapia antidepressiva oral, não como monoterapia" }
      ],
      porque: "Não é opioide e não age em monoamina: bloqueia o receptor NMDA, o que aumenta " +
              "a liberação de glutamato, que estimula receptores AMPA e eleva o BDNF — " +
              "reduzido no cérebro de quem tem depressão. É esse caminho que explica o efeito " +
              "antidepressivo em HORAS, que nenhum ISRS tem, e a redução rápida da ideação " +
              "suicida.",
      escolher: "Indicação aprovada pela ANVISA (Resolução-RE nº 4.413, de 29/10/2020): adulto " +
                "com Transtorno Depressivo Maior COM COMPORTAMENTO OU IDEAÇÃO SUICIDA AGUDA, " +
                "em episódio moderado a grave, que não respondeu adequadamente a pelo menos " +
                "DOIS antidepressivos diferentes (ISRS ou IRSN) em dose e duração adequadas. " +
                "O CANMAT 2023 a coloca como segunda linha adjuvante.",
      evitar: "Fora de ambiente clínico com supervisão e monitorização de 2 horas — não é " +
              "burocracia: o risco é sedação, confusão, agitação, euforia, ELEVAÇÃO DA PRESSÃO " +
              "ARTERIAL, vertigem e distúrbio visual, além de uso indevido e abuso, já que a " +
              "melhora é rápida e intensa. Não substitui o antidepressivo oral.",
      contraind: "Hipertensão não controlada e doença cerebrovascular, pelo pico pressórico. " +
                 "História de abuso de substância exige cuidado redobrado. A responsabilidade " +
                 "pelo ambiente seguro é do diretor técnico do estabelecimento (Resolução CFM " +
                 "nº 2.147/2016; RDC ANVISA nº 36/2013).",
      adversos: "Sedação, confusão mental, agitação, humor eufórico, parestesia, aumento da " +
                "pressão arterial, vertigem, distúrbios visuais. No uso prolongado, cistite.",
      monitor: "Pressão arterial antes e depois. Observação de no mínimo 2 horas. No uso " +
               "prolongado, urinálise periódica para cistite (CANMAT 2023).",
      fonte: "CFM/CREMEC — Parecer nº 14/2021 (registro ANVISA Resolução-RE nº 4.413, 2020); linha de recomendação do CANMAT 2023 (Can J Psychiatry, 2024)"
    },
    {
      nome: "Cetamina racêmica",
      id: "cetamina-racemica",
      kw: "ketamina cetamina intravenosa off label anestesico dissociativo suicidio",
      apres: "solução injetável, registrada na ANVISA originalmente para ANESTESIA",
      dose: [
        { rot: "Dose", val: "sem fonte datada conferida — protocolos de dose, frequência e formulação são altamente variáveis entre serviços (CANMAT 2023)" },
        { rot: "Via", val: "a intravenosa é a que tem evidência; oral, nasal e intramuscular são 3ª linha por variabilidade de protocolo" }
      ],
      porque: "Mesmo mecanismo NMDA da escetamina — é a mistura racêmica da qual a escetamina " +
              "é o enantiômero S. Efeito antidepressivo e antissuicida rápido: o CANMAT " +
              "registra redução da ideação suicida que se estende por até UMA SEMANA após " +
              "uma única infusão.",
      escolher: "Depressão resistente com ideação suicida, em serviço com estrutura. O CANMAT " +
                "2023 a coloca como segunda linha adjuvante (por via intravenosa).",
      evitar: "Uso em psiquiatria é OFF-LABEL no Brasil: a ANVISA registrou a cetamina para " +
              "anestesia, e só a escetamina intranasal tem registro psiquiátrico. O CANMAT " +
              "rebaixou as vias alternativas a terceira linha porque os protocolos publicados " +
              "são muito variáveis e os resultados, mistos.",
      contraind: "As mesmas da escetamina: hipertensão não controlada, doença cerebrovascular, " +
                 "risco de abuso. Exige monitorização de pressão arterial e dos sintomas dissociativos.",
      adversos: "Dissociação, elevação da pressão arterial, sedação. No uso prolongado, cistite.",
      monitor: "Pressão arterial e sintomas dissociativos durante e após. Urinálise periódica " +
               "no uso prolongado.",
      fonte: "CFM/CREMEC — Parecer nº 14/2021 (uso off-label, Resolução CFM nº 1.982/2012); linhas de recomendação do CANMAT 2023 (Can J Psychiatry, 2024)"
    },
    {
      nome: "Prazosina",
      id: "prazosina",
      kw: "minipress alfa bloqueador pesadelo tept trauma hipotensao",
      apres: "cápsula de liberação retardada; conferir se ainda há apresentação no Brasil",
      dose: [
        {
          rot: "TEPT — pesadelo e distúrbio do sono",
          val: "iniciar 1 mg à noite e titular devagar até 2–15 mg à noite, pelo risco de hipotensão",
          p: 452
        }
      ],
      porque: "Alfa-1 bloqueador. O Maudsley coloca na segunda linha do TEPT para pesadelo e sono, não como tratamento do transtorno.",
      escolher: "Pesadelo e fragmentação do sono no TEPT, depois de ISRS, quando o sono é o que mais destrói o dia.",
      evitar: "Hipotensão, primeira dose em pé, associação com inibidor de PDE-5. Sem registro ativo na Anvisa (CSV 2026-09-23) — o cartão é clínico, não uma autorização de receita.",
      contraind: "Hipersensibilidade à prazosina. A bula do Minipress SR é de hipertensão, não de TEPT.",
      adversos: "Hipotensão postural, tontura, síncope na primeira dose, priapismo raro.",
      monitor: "Pressão deitado e em pé na titulação. Avisar para tomar a primeira dose ao deitar.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    }
  ]
});

PSICOFARMACOS.classes.push({
  rot: "Antidemência",
  kw: "alzheimer donepezila rivastigmina galantamina memantina colinesterase nmda",
  quando: "Doença de Alzheimer com diagnóstico e estadiamento pelo PCDT. Não tratar demência frontotemporal nem prejuízo cognitivo da esclerose múltipla com estes fármacos.",
  nota: "Inibidor de colinesterase na leve a moderada; memantina entra na moderada a grave ou quando o inibidor não vai. Antipsicótico no BPSD só depois de causa física e medida não farmacológica — risco de AVC e morte.",
  farmacos: [
    {
      nome: "Donepezila",
      id: "donepezila",
      kw: "aricept colinesterase alzheimer",
      apres: "comprimido 5 mg e 10 mg",
      dose: [
        { rot: "Dose inicial", val: "5 mg/dia VO", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" },
        { rot: "Dose usual", val: "10 mg/dia VO após 4 a 6 semanas", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" }
      ],
      porque: "Inibe a acetilcolinesterase de modo seletivo e reversível.",
      escolher: "Doença de Alzheimer leve a grave, em monoterapia ou com memantina na grave, segundo o PCDT.",
      evitar: "Bradicardia, bloqueio, asma grave, úlcera ativa. Anticolinérgico anula o efeito.",
      contraind: "Hipersensibilidade à donepezila ou aos derivados de piperidina.",
      adversos: "Náusea, diarreia, insônia, pesadelo, cãibra, síncope, bradicardia.",
      monitor: "Peso, pulso, queda, função cognitiva e cuidador. Revisar anticolinérgico da lista.",
      fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025"
    },
    {
      nome: "Rivastigmina",
      id: "rivastigmina",
      kw: "exelon patch adesivo colinesterase alzheimer parkinson",
      apres: "cápsula 1,5 a 6 mg; solução 2 mg/mL; adesivo 4,6 e 9,5 mg/24 h",
      dose: [
        { rot: "Dose inicial", val: "3 mg/dia VO, dividido em duas tomadas com a refeição", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" },
        { rot: "Dose máxima", val: "12 mg/dia VO, com aumentos a cada 2 semanas conforme tolerância (6, 9 e 12 mg/dia)", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" }
      ],
      porque: "Inibe acetilcolinesterase e butirilcolinesterase.",
      escolher: "Alzheimer quando a via transdérmica ajuda a tolerar; o Maudsley também a cita na demência da Parkinson.",
      evitar: "Peso baixo, náusea grave, adesivo cortado (superdose). Troca de cápsula para adesivo segue regra de dose, não improviso.",
      contraind: "Hipersensibilidade à rivastigmina ou ao carbamato.",
      adversos: "Náusea, vômito, anorexia, perda de peso, tontura — menos no adesivo que na cápsula.",
      monitor: "Peso, pele sob o adesivo, pulso, queda.",
      fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025"
    },
    {
      nome: "Galantamina",
      id: "galantamina",
      kw: "reminyl colinesterase nicotinico alzheimer",
      apres: "cápsula de liberação prolongada 8, 16 e 24 mg",
      dose: [
        { rot: "Dose inicial", val: "8 mg/dia VO pela manhã, com alimento, por 4 semanas", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" },
        { rot: "Dose usual", val: "manutenção 16 mg/dia; máxima 24 mg/dia", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" }
      ],
      porque: "Inibe acetilcolinesterase e tem ação agonista nicotínica.",
      escolher: "Alzheimer leve a moderada quando donepezila ou rivastigmina não servem.",
      evitar: "Insuficiência hepática ou renal grave (contraindicada no PCDT). Na moderada, teto 16 mg/dia.",
      contraind: "Hipersensibilidade; insuficiência hepática ou renal graves no PCDT.",
      adversos: "Náusea, vômito, síncope, bradicardia.",
      monitor: "Função renal e hepática, pulso, peso.",
      fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025"
    },
    {
      nome: "Memantina",
      id: "memantina",
      kw: "ebixa nmda alzheimer moderada grave",
      apres: "comprimido 10 mg",
      dose: [
        { rot: "Dose inicial", val: "5 mg/dia VO (meio comprimido); subir 5 mg por semana até 20 mg/dia na quarta semana", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" },
        { rot: "Dose usual", val: "20 mg/dia (10 mg duas vezes ao dia)", f: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025" }
      ],
      porque: "Antagonista NMDA de afinidade baixa a moderada; reduz excitotoxicidade glutamatérgica.",
      escolher: "Alzheimer moderada a grave, só ou com inibidor de colinesterase, conforme o PCDT.",
      evitar: "Convulsão, insuficiência renal grave (teto 10 mg/dia se depuração 5 a 29 mL/min).",
      contraind: "Hipersensibilidade à memantina.",
      adversos: "Tontura, sonolência, hipertensão, constipação, cefaleia.",
      monitor: "Função renal antes de titular, queda, confusão nova.",
      fonte: "MS — PCDT Doença de Alzheimer, Portaria Conjunta SAES/SCTIE nº 27, 2025"
    }
  ]
});

PSICOFARMACOS.classes.push({
  rot: "TDAH",
  kw: "tdah metilfenidato ritalina lisdexanfetamina atomoxetina clonidina estimulante",
  quando: "TDAH com diagnóstico por quem treina o quadro, em dois ambientes, com história da infância. O PCDT brasileiro não incorpora estimulante — o SUS deste protocolo não dispensa.",
  nota: "Metilfenidato é primeira linha do Maudsley quando há fármaco. Lisdexanfetamina depois de falha. Atomoxetina quando estimulante não vai. Clonidina: tique e TDAH, hipotensão. Receita A3 no estimulante.",
  farmacos: [
    {
      nome: "Metilfenidato",
      id: "metilfenidato",
      kw: "ritalina concerta estimulante tdah",
      apres: "comprimido de liberação imediata; formulações de liberação prolongada variam de marca",
      dose: [
        { rot: "Criança e adolescente", val: "iniciar 5–10 mg/dia VO; subir 5–10 mg; máximo usual 60 mg/dia (ocasionalmente 90 mg/dia)", p: 600 },
        { rot: "Dose usual", val: "liberação imediata dura 2–4 horas; OROS (Concerta XL) inicia 18 mg pela manhã, usual até 54 mg/dia (ocasionalmente 108 mg/dia); 18 mg de OROS equivalem a 15 mg de metilfenidato", p: 600 }
      ],
      porque: "Estimulante; aumenta dopamina e noradrenalina na fenda. Primeira linha do Maudsley quando o fármaco é indicado.",
      escolher: "TDAH com prejuízo depois de medida ambiental, quando a família compra — o PCDT não incorpora no SUS.",
      evitar: "Cardiopatia, uso de cocaína ou anfetamina, psicose, glaucoma. Desvio da receita. Não promete caixa do SUS.",
      contraind: "Hipertireoidismo descompensado, glaucoma de ângulo estreito, uso de IMAO, hipersensibilidade.",
      adversos: "Insônia, anorexia, desaceleração do crescimento, taquicardia, aumento de pressão, tique, irritabilidade.",
      monitor: "Pressão, pulso, peso e altura na criança a cada retorno. Sono, humor, desvio.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    },
    {
      nome: "Lisdexanfetamina",
      id: "lisdexanfetamina",
      kw: "venvanse anfetamina prodrug tdah",
      apres: "cápsula",
      dose: [
        { rot: "Criança e adolescente", val: "iniciar 20 ou 30 mg pela manhã; máxima 70 mg/dia", p: 601 }
      ],
      porque: "Pró-droga da dexanfetamina; o efeito se estende e desvia menos que a anfetamina solta.",
      escolher: "Criança que fez seis semanas de metilfenidato em dose adequada e não rendeu o bastante (Maudsley/NICE). Adulto: primeira linha junto do metilfenidato. PCDT não incorpora.",
      evitar: "Mesmas contraindicações do estimulante. Uso de anfetamina ilícita exige juízo — o livro cita dado, não é licença para improvisar.",
      contraind: "Uso de IMAO, cardiopatia sintomática, hipersensibilidade.",
      adversos: "Anorexia, insônia, taquicardia, irritabilidade, boca seca.",
      monitor: "Pressão, pulso, peso, crescimento, humor, desvio.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    },
    {
      nome: "Atomoxetina",
      id: "atomoxetina",
      kw: "strattera nao estimulante tdah noradrenalina",
      apres: "cápsula",
      dose: [
        { rot: "Criança e adolescente", val: "iniciar 0,5 mg/kg/dia; alvo 1,2 mg/kg/dia; pode ir a 1,8 mg/kg/dia, máximo 120 mg", p: 601 },
        { rot: "Dose usual", val: "adulto: iniciar 40 mg/dia por 7 dias, depois 80 mg/dia", p: 601 }
      ],
      porque: "Inibe recaptação de noradrenalina. Não é estimulante; o efeito pleno demora semanas.",
      escolher: "Quando metilfenidato e lisdexanfetamina não vão ou não podem. Comorbidade de tique ou de uso de substância pesa a favor.",
      evitar: "Hepatite, glaucoma, IMAO. Ideação suicida no início — avisar a família.",
      contraind: "Uso de IMAO, glaucoma de ângulo estreito, feocromocitoma, hipersensibilidade.",
      adversos: "Náusea, anorexia, sonolência ou insônia, aumento de pressão e pulso, hepatotoxicidade rara, ideação suicida.",
      monitor: "Fígado (sintoma), humor e suicídio nas primeiras semanas, pressão e pulso.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    },
    {
      nome: "Clonidina",
      id: "clonidina",
      kw: "atensina alfa2 tique tdah hipotensao",
      apres: "comprimido; adesivo semanal em alguns países",
      dose: [
        { rot: "Acatisia / adjunto", val: "0,2–0,8 mg/dia VO", p: 132 },
        { rot: "Sialorreia / tique", val: "adesivo 0,1–0,2 mg por semana ou 0,1 mg VO à noite", p: 259 }
      ],
      porque: "Agonista alfa-2. No TDAH o Maudsley a cita; o lastro de dose nesta edição está em outras indicações (acatisia, tique/sialorreia). Titular pela pressão.",
      escolher: "TDAH com tique, ou quando estimulante não vai. Hipotensão limita.",
      evitar: "Cortar de golpe — hipertensão de rebote. Depressão, psicose (o livro alerta).",
      contraind: "Hipersensibilidade. Bradicardia grave, bloqueio.",
      adversos: "Sedação, hipotensão, boca seca, rebote pressórico se parar.",
      monitor: "Pressão e pulso. Não suspender de uma vez.",
      fonte: "Maudsley Prescribing Guidelines, 15ª ed., 2025"
    }
  ]
});

PSICOFARMACOS.classes.push({
  rot: "Antídotos e fármacos de emergência",
  kw: "snm serotoninergica flumazenil dantroleno bromocriptina ciproeptadina antidoto",
  quando: "Emergência por psicofármaco ou overdose. Não substituem via aérea, resfriamento e suspender o agente.",
  nota: "Dantroleno e bromocriptina são do leito clínico no SNM. Flumazenil só no benzodiazepínico isolado. Ciproeptadina na serotoninérgica refratária.",
  farmacos: [
    {
      nome: "Dantroleno",
      id: "dantroleno",
      kw: "snm hipertermia rabdomiolise relaxante muscular",
      apres: "pó liofilizado 20 mg",
      dose: [
        { rot: "Dose usual", val: "adultos e crianças: 2–3 mg/kg IV em bolus a cada 5 a 10 min, até no máximo 10 mg/kg/dia", f: "SMS-SP — Manual de Toxicologia Clínica, 2017" }
      ],
      porque: "Reduz liberação de cálcio no retículo sarcoplasmático; cai temperatura e consumo de oxigênio.",
      escolher: "SNM com hipertermia e rabdomiólise no leito clínico, depois de suspender o antipsicótico.",
      evitar: "Não substitui hidratação nem ventilação. Hepatotoxicidade.",
      contraind: "Hipersensibilidade. Doença hepática ativa pesa contra.",
      adversos: "Hepatotoxicidade, fraqueza muscular, flebite.",
      monitor: "Temperatura, CK, transaminase, via aérea.",
      fonte: "SMS-SP — Manual de Toxicologia Clínica, 2017"
    },
    {
      nome: "Bromocriptina",
      id: "bromocriptina",
      kw: "parlodel agonista dopamina snm",
      apres: "comprimido 2,5 mg; sem registro ativo na Anvisa (CSV 2026-09-23)",
      dose: [
        { rot: "Dose usual", val: "2,5–10 mg VO ou por sonda 3 a 4 vezes ao dia", f: "SMS-SP — Manual de Toxicologia Clínica, 2017" }
      ],
      porque: "Agonista dopaminérgico central. No SNM entra no leito clínico, em geral com dantroleno.",
      escolher: "SNM depois de suspender o antipsicótico. Cartão clínico; registro ativo não.",
      evitar: "Afirmar que a farmácia tem. Psicose pode piorar.",
      contraind: "Hipersensibilidade. Hipertensão não controlada, puerpério com risco vascular (bula clássica).",
      adversos: "Hipotensão, náusea, piora psicótica.",
      monitor: "Pressão, mental, temperatura.",
      fonte: "SMS-SP — Manual de Toxicologia Clínica, 2017"
    },
    {
      nome: "Ciproeptadina",
      id: "ciproeptadina",
      kw: "periactin antiserotoninergico 5ht2",
      apres: "comprimido; no Brasil frequentemente em associação — conferir a apresentação isolada",
      dose: [
        { rot: "Dose inicial", val: "adulto: 4–12 mg VO, depois 4 mg a cada hora se precisar", f: "SMS-SP — Manual de Toxicologia Clínica, 2017" },
        { rot: "Acatisia (outra indicação)", val: "16 mg/dia", p: 132, f: "Maudsley Prescribing Guidelines, 15ª ed., 2025" }
      ],
      porque: "Antagonista 5-HT2. Na síndrome serotoninérgica entra no refratário a benzodiazepínico e resfriamento.",
      escolher: "Serotoninérgica que não cede com suspender o agente, resfriar e benzodiazepínico.",
      evitar: "Glaucoma de ângulo estreito, retenção urinária — é também anticolinérgica.",
      contraind: "Glaucoma de ângulo estreito, obstrução pilórica, hipersensibilidade. A toxicologia a contraindica em ingestão de corrosivo.",
      adversos: "Sedação, boca seca, retenção urinária.",
      monitor: "Temperatura, clônus, consciência. Não substitui via aérea na hipertermia extrema.",
      fonte: "SMS-SP — Manual de Toxicologia Clínica, 2017"
    },
    {
      nome: "Flumazenil",
      id: "flumazenil",
      kw: "lanexat antagonista benzodiazepinico convulsao",
      apres: "ampola 0,5 mg em 5 mL (0,1 mg/mL)",
      dose: [
        { rot: "Dose inicial", val: "intoxicação por benzodiazepínico: 0,1 a 0,2 mg IV/IO em 15 a 30 s; repetir até reverter a hipoventilação ou até 1 mg", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
      ],
      porque: "Antagonista competitivo do sítio benzodiazepínico. Meia-vida curta: a sedação volta.",
      escolher: "Depressão respiratória por benzodiazepínico isolado, em quem não é dependente crônico.",
      evitar: "Coma de causa desconhecida, overdose mista com tricíclico, epiléptico em benzodiazepínico de longo prazo, dependente — convulsão e arritmia.",
      contraind: "Epilepsia em benzodiazepínico crônico, overdose de tricíclico, hipersensibilidade.",
      adversos: "Convulsão, arritmia, síndrome de abstinência, vômito se infundir rápido.",
      monitor: "Consciência e respiração por horas. O flumazenil acaba antes de muitos benzodiazepínicos.",
      fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016"
    }
  ]
});

/* =====================================================================
 * COMBINAÇÕES. Relação, não propriedade de um fármaco — por isso seção
 * própria, e não repetida em 40 cartões onde envelheceria em 40 lugares.
 * ===================================================================== */

PSICOFARMACOS.combos = {
  rot: "Combinações que se fazem",
  nota: "Combinar é decisão de segunda linha, não atalho. A regra que vale para quase " +
        "tudo: só combine depois de um fármaco em DOSE PLENA pelo TEMPO MÍNIMO. " +
        "Combinação precoce cria esquema difícil de desmontar e refratariedade aparente.",
  itens: [
    { id: "dep-bipolar-litio-mono",
      t: "Depressão bipolar — lítio em monoterapia",
      d: "É nível 1 no PCDT, à frente de todos. O segundo com melhor evidência é a quetiapina; " +
         "a lamotrigina tem eficácia comprovada na mesma posição. O tratamento do episódio " +
         "depressivo bipolar deve ser feito PREFERENCIALMENTE EM MONOTERAPIA. Objetivo é " +
         "remissão; tempo de 8 a 24 semanas; avaliar resposta em 4 a 6 semanas antes de trocar.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "dep-bipolar-refrataria-fluox",
      t: "Depressão bipolar refratária — fluoxetina + olanzapina, lítio OU valproato",
      d: "O único ISRS recomendado no Protocolo é a fluoxetina, e ela deve ser usada SEMPRE " +
         "em combinação com olanzapina, carbonato de lítio ou ácido valproico. A associação é " +
         "preconizada APENAS em refratariedade, contraindicação ou intolerância a lítio, " +
         "quetiapina e lamotrigina — não é primeira escolha.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "dep-resistente-antipsicotico",
      t: "Depressão unipolar resistente — potencializar com antipsicótico",
      d: "Depressão resistente é a que não remitiu após 2 ou mais tentativas adequadas de " +
         "antidepressivo. Duas rotas: TROCAR (inclusive para tricíclico ou IMAO) ou " +
         "POTENCIALIZAR com antipsicótico de segunda geração. Aripiprazol e brexpiprazol são " +
         "primeira linha adjuvante; cariprazina é segunda. A dose de potencialização é menor " +
         "que a antipsicótica.",
      f: "CANMAT 2023 (Can J Psychiatry, 2024)" },

    { id: "dep-resistente-litio-t3",
      t: "Depressão resistente — potencializar com lítio ou T3",
      d: "Lítio e triiodotironina são agentes adjuvantes de SEGUNDA linha. Se o lítio for " +
         "usado como potencializador, a monitorização é a mesma do lítio em bipolar: litemia, " +
         "eletrólitos, cálcio, creatinina, eGFR e TSH no início e a cada 6 a 12 meses, ou " +
         "sempre que o quadro clínico ou a dose mudarem.",
      f: "CANMAT 2023 (Can J Psychiatry, 2024)" },

    { id: "dep-resistente-cetamina",
      t: "Depressão resistente com ideação suicida — cetamina IV ou escetamina intranasal",
      d: "Segunda linha adjuvante. Ambas reduzem a ideação suicida de forma rápida e " +
         "independente do efeito sobre o humor, com efeito antissuicida da cetamina IV " +
         "estendendo-se por até uma semana após uma única infusão. Foram REBAIXADAS de " +
         "primeira para segunda linha por exigirem monitorização de pressão arterial e pelos " +
         "efeitos dissociativos. A escetamina intranasal é aprovada só EM CONJUNTO com " +
         "antidepressivo oral.",
      f: "CANMAT 2023 (Can J Psychiatry, 2024); registro brasileiro no Parecer CFM/CREMEC nº 14/2021" },

    { id: "esq-manejo-motor",
      t: "Esquizofrenia — antipsicótico + biperideno ou propranolol",
      d: "Não é potencialização, é manejo de efeito adverso, e a escolha depende do quadro " +
         "motor: biperideno 1 a 16 mg/dia para distonia aguda e parkinsonismo; propranolol " +
         "40 a 160 mg/dia (ou clonazepam 0,5 a 2 mg/dia) para acatisia. Trocar um pelo outro " +
         "é erro comum e não funciona.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "esq-decanoato-oral",
      t: "Esquizofrenia com má adesão — decanoato + haloperidol oral no primeiro mês",
      d: "O decanoato leva 3 a 6 meses para estabilizar a concentração plasmática. Por isso o " +
         "PCDT permite duas estratégias de cobertura no início: doses maiores e mais " +
         "frequentes (até 400 mg/mês, até semanalmente), ou dose usual SUPLEMENTADA com " +
         "haloperidol oral até 15 mg/dia conforme a tolerância, principalmente no primeiro mês.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "atipico-sulpirida",
      t: "Antipsicótico atípico + sulpirida",
      d: "A sulpirida é por vezes utilizada em associação a outro atípico para potencializar o " +
         "efeito antipsicótico. Atenção à soma de hiperprolactinemia se o parceiro for a risperidona.",
      f: "MS — CAB nº 34, Saúde Mental, 2013" },

    { id: "tabagismo-trn-bupropiona",
      t: "Tabagismo — TRN combinada, ou TRN + bupropiona",
      d: "A reposição combinada (uma forma lenta + uma rápida) é o tratamento PREFERENCIAL, " +
         "por maior eficácia. Como alternativas: bupropiona isolada, TRN isolada, ou " +
         "bupropiona associada a UMA forma de TRN. Adesivos podem ser associados entre si " +
         "(21+21, 21+14, 21+7 mg/dia) em fumantes pesados e motivados.",
      f: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020" },

    { id: "ansiedade-ad-base-bzd-ponte",
      t: "Ansiedade crônica — antidepressivo de base, benzodiazepínico só de ponte",
      d: "O tratamento de base dos sintomas de ansiedade que se cronificam é o antidepressivo, " +
         "em doses EQUIVALENTES às da depressão, ficando o ansiolítico para tratamento " +
         "sintomático e de curto prazo. O CAB é explícito: prescrever apenas benzodiazepínico " +
         "para queixa crônica de ansiedade é IATROGÊNICO.",
      f: "MS — CAB nº 34, Saúde Mental, 2013" },
    {
      id: "clz-aripiprazol",
      t: "Clozapina + aripiprazol depois de otimizar",
      d: "Adjunto, não atalho. O Maudsley admite aripiprazol após otimizar a clozapina: o ganho antipsicótico costuma ser pequeno, o metabólico e a enurese rendem mais. Sem benefício claro em 3 a 6 meses, tira — somar adverso sem efeito é prejuízo.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 220
    },
    {
      id: "trc-cross-taper",
      t: "Cross-taper de antidepressivo",
      d: "Desce o que sai enquanto sobe o que entra, no ritmo da tolerância. É o padrão quando não há evento grave e o par não é IMAO. Manter a soma das frações abaixo do teto de cada um. Parada brusca do primeiro só se o adverso for sério.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 366
    },
    {
      id: "emg-snm-dantroleno-bromocriptina",
      t: "SNM no leito clínico — dantroleno e bromocriptina depois de suspender o antipsicótico",
      d: "Na unidade psiquiátrica: parar o antipsicótico, monitorar temperatura, pulso e pressão, benzodiazepínico. No leito clínico ou na emergência: hidratação, dantroleno mais bromocriptina, ventilação se precisar. Um não substitui o outro nem a suspensão do agente.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 150
    },
    {
      id: "sub-naloxona-buprenorfina-alta",
      t: "Alta de quem usa opioide — naloxona de casa e aviso de perda de tolerância",
      d: "Os dois dias após a alta concentram morte: a tolerância cai e o opioide ilícito pode ser mais potente. Treinar quem mora junto e, se o serviço tiver, naloxona de casa. Observar depois da naloxona de reversão — metadona resseda.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 498
    }
  ]
};

PSICOFARMACOS.proibidos = {
  rot: "Combinações que não se fazem",
  nota: "Cada linha traz o par, o MECANISMO e o que acontece. Saber o mecanismo é o que " +
        "permite generalizar para o fármaco que não está nesta lista.",
  itens: [
    { id: "litio-diuretico-ieca-aine",
      t: "Lítio + diurético, IECA ou AINE",
      d: "MECANISMO: o lítio é excretado pelo rim e acompanha o sódio. Essas três classes " +
         "reduzem a depuração. DESFECHO: a litemia sobe sem que a dose tenha mudado, e acima " +
         "de 1,5 mEq/L começa a toxicidade — acima de 3,5 mEq/L é potencialmente fatal. O PCDT " +
         "manda EVITAR essas associações, assim como condições que alterem a função renal. " +
         "Sinais precoces: disartria, ataxia, tremor grosseiro.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "lamotrigina-valproico",
      t: "Lamotrigina + ácido valproico",
      d: "MECANISMO: o valproato inibe a glicuronidação da lamotrigina e eleva muito seu nível. " +
         "DESFECHO: aumenta MUITO o risco de rash cutâneo e de síndrome de Stevens-Johnson. O " +
         "PCDT diz que a combinação deve em princípio ser EVITADA; se for necessária, o " +
         "aumento de dose da lamotrigina tem de ser ainda mais gradual que o habitual.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "carbamazepina-inducao",
      t: "Carbamazepina + antipsicótico (ou quase qualquer coisa)",
      d: "MECANISMO: indução potente do citocromo P450. DESFECHO: a carbamazepina REDUZ o " +
         "nível sérico da maioria dos antipsicóticos, e afeta antidepressivos, " +
         "anticonvulsivantes, risperidona e haloperidol — o PCDT manda atentar para o ajuste " +
         "de dose quando combinada. Também derruba anticoncepcional oral e antirretroviral. " +
         "A recaída aparece semanas depois e raramente é atribuída à interação.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "isrs-triciclico-imao",
      t: "ISRS ou tricíclico + IMAO",
      d: "MECANISMO: soma de carga serotoninérgica por bloqueio de recaptação mais bloqueio " +
         "de degradação. DESFECHO: síndrome serotoninérgica, potencialmente fatal — alteração " +
         "do estado mental, disfunção autonômica e hiperatividade neuromuscular (clônus, " +
         "hiperreflexia, hipertermia). Respeitar o intervalo de washout na troca; com a " +
         "fluoxetina esse intervalo é longo, pela meia-vida.",
      f: "VERIFICAR — princípio consolidado; intervalo exato de washout a confirmar em referência datada",
      v: true },

    { id: "isrs-tramadol",
      t: "ISRS + tramadol, linezolida ou triptano",
      d: "MECANISMO: todos aumentam a atividade serotoninérgica por vias diferentes. DESFECHO: " +
         "síndrome serotoninérgica. A associação ISRS + tramadol é a causa mais citada, e " +
         "acontece o tempo todo porque o tramadol é prescrito por outro serviço, para dor, " +
         "sem ninguém olhar a lista completa.",
      f: "VERIFICAR — princípio consolidado; confirmar conduta no protocolo do serviço",
      v: true },

    { id: "ziprasidona-qt",
      t: "Ziprasidona + outro fármaco que alargue QT ou cause distúrbio hidroeletrolítico",
      d: "MECANISMO: soma de prolongamento do intervalo QT, agravada por hipocalemia e " +
         "hipomagnesemia. DESFECHO: torsade de pointes. O PCDT lista explicitamente como " +
         "contraindicação relativa o uso concomitante de fármacos capazes de produzir " +
         "desequilíbrio hidroeletrolítico, e os sinais de alerta: tontura, palpitação e síncope.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "bupropiona-limiar-convulsivo",
      t: "Bupropiona + qualquer coisa que baixe o limiar convulsivo",
      d: "MECANISMO: a bupropiona reduz o limiar convulsivo de forma dose-dependente; " +
         "somam-se a ela os antipsicóticos de baixa potência, a clozapina, a abstinência de " +
         "álcool e a de benzodiazepínico. DESFECHO: convulsão. Por isso a bupropiona é " +
         "contraindicada em epilepsia, TCE, transtorno alimentar e abstinência.",
      f: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020" },

    { id: "ad-monoterapia-tab",
      t: "Antidepressivo em monoterapia no transtorno bipolar",
      d: "MECANISMO: ativação do polo maníaco sem estabilizador que sustente o humor. " +
         "DESFECHO: virada maníaca e possível indução de ciclagem rápida. O PCDT é textual — " +
         "os antidepressivos são CLARAMENTE CONTRAINDICADOS como monoterapia no TAB. Por isso " +
         "a pergunta sobre episódio prévio de humor elevado vem ANTES da receita, sempre.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "bzd-alcool-depressor",
      t: "Benzodiazepínico + álcool ou outro depressor do SNC",
      d: "MECANISMO: potenciação GABAérgica somada. DESFECHO: depressão respiratória. O CAB " +
         "cita esse risco explicitamente entre os do grupo, junto com sedação secundária e acidentes.",
      f: "MS — CAB nº 34, Saúde Mental, 2013" },

    { id: "bzd-delirium",
      t: "Benzodiazepínico em delirium NÃO alcoólico",
      d: "MECANISMO: piora a desatenção e a flutuação do nível de consciência, que são o " +
         "núcleo do quadro. DESFECHO: delirium mais longo e mais grave. A exceção é a " +
         "abstinência de álcool ou de benzodiazepínico, onde ele é justamente o tratamento — " +
         "e é por isso que a pergunta sobre a última dose de álcool vem antes da prescrição.",
      f: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019" },

    { id: "haloperidol-parkinson-lewy",
      t: "Haloperidol em Parkinson ou demência de corpos de Lewy",
      d: "MECANISMO: bloqueio D2 potente num sistema dopaminérgico já depletado, e " +
         "hipersensibilidade a neurolépticos nos corpos de Lewy. DESFECHO: piora motora " +
         "dramática, rigidez grave, e risco aumentado de síndrome neuroléptica maligna. " +
         "Parkinson consta como contraindicação do haloperidol no PCDT.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "biperideno-acatisia-dt",
      t: "Biperideno para acatisia ou para discinesia tardia",
      d: "MECANISMO: a acatisia não vem do desequilíbrio colinérgico, e a discinesia tardia " +
         "vem de hipersensibilidade dopaminérgica que o anticolinérgico agrava. DESFECHO: na " +
         "acatisia, nada acontece e perde-se tempo; na discinesia tardia, PIORA. A conduta na " +
         "acatisia é reduzir a dose do antipsicótico com propranolol ou benzodiazepínico; na " +
         "discinesia tardia, o PCDT indica substituir por clozapina.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "clozapina-sem-hemograma",
      t: "Clozapina sem hemograma seriado",
      d: "MECANISMO: agranulocitose idiossincrática, que não dá aviso clínico antes da " +
         "infecção. DESFECHO: neutropenia grave e sepse. Não é combinação de fármacos, é " +
         "combinação de fármaco com ausência de monitorização — e é a que mais mata. " +
         "Hemograma semanal nas 18 primeiras semanas e a cada aumento de dose, mensal depois. " +
         "Febre ou dor de garganta = hemograma hoje.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "glicose-antes-tiamina",
      t: "Soro glicosado antes de tiamina no alcoolista",
      d: "MECANISMO: a metabolização da glicose CONSOME tiamina, e o alcoolista já está " +
         "carente. DESFECHO: glicose de rotina sem tiamina pode precipitar encefalopatia de " +
         "Wernicke — confusão, ataxia e oftalmoplegia — tratável, e irreversível (Korsakoff) " +
         "se não tratada. EXCEÇÃO: hipoglicemia se corrige imediatamente; dar tiamina " +
         "prontamente, sem atrasar a glicose para esperá-la.",
      f: "MS — Linha de Cuidado: Transtornos por uso de álcool no adulto, manejo inicial/conduta, consulta em 2026-09-23" },
    {
      id: "clz-parar-fumar",
      t: "Parar tabaco na clozapina sem vigiar o nível",
      d: "MECANISMO: a fumaça de tabaco induz CYP1A2 por hidrocarboneto policíclico; ao parar, a enzima cai pela metade a cada par de dias e o nível da clozapina sobe. Adesivo, vape e cigarro eletrônico não induzem. DESFECHO: sedação, convulsão, constipação grave e outros efeitos de nível alto, sobretudo na internação. Reduzir com quem prescreve e repetir nível — não esperar toxicidade.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 892
    },
    {
      id: "clz-carbamazepina",
      t: "Clozapina + carbamazepina",
      d: "MECANISMO: a carbamazepina deprime medula e ainda induz o citocromo, derrubando o nível da clozapina. DESFECHO: neutropenia somada a recaída por nível baixo. O Maudsley lista a carbamazepina entre os concomitantes hematotóxicos; mielossupressor com clozapina é contraindicação formal. Não é o anticonvulsivante da titulação.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 269
    },
    {
      id: "clz-anticolinergico-sistemico",
      t: "Anticolinérgico sistêmico de primeira linha na sialorreia da clozapina",
      d: "MECANISMO: o antimuscarínico sistêmico soma bloqueio colinérgico ao da clozapina no tubo digestivo e no cérebro. DESFECHO: hipomotilidade, íleo e piora cognitiva. A baba se trata; a primeira linha não é o comprimido anticolinérgico — o intestino mata mais que a sialorreia.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 241
    },
    {
      id: "trc-imao-washout",
      t: "ISRS, dual ou tricíclico cruzado com IMAO sem lavagem",
      d: "MECANISMO: bloqueio de recaptação somado a bloqueio de degradação de serotonina. DESFECHO: síndrome serotoninérgica. Da fluoxetina para IMAO irreversível esperar 5 a 6 semanas; da clomipramina, 3 semanas; da maior parte dos outros, 2 semanas; da fluvoxamina, 1 semana; do moclobemide, 24 horas. Do IMAO irreversível para outro antidepressivo, 2 semanas, salvo moclobemide (24 horas). O proibido isrs-triciclico-imao continua válido; esta relação traz o intervalo.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 368
    },
    {
      id: "trc-parada-brusca",
      t: "Parada brusca de antipsicótico ou de antidepressivo de meia-vida curta",
      d: "MECANISMO: ocupação receptora cai de uma vez sobre um sistema já adaptado (hipersensibilidade D2, serotonina, histamina, acetilcolina). DESFECHO: retirada somática, psicose de descontinuação e recaída concentrada nas primeiras semanas. Paroxetina e venlafaxina são o caso diário no antidepressivo; no antipsicótico o último degrau linear é o maior em D2.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 119
    },
    {
      id: "trc-litio-abrupto",
      t: "Retirada rápida de lítio",
      d: "MECANISMO: a adaptação ao lítio persiste depois da queda do nível; o corte rápido desmascara o transtorno e soma retirada. DESFECHO: mania ou depressão em semanas, mesmo em quem estava estável. Descer devagar; golpe não é atalho.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 332
    },
    {
      id: "tept-bzd-manutencao",
      t: "Benzodiazepínico de manutenção no TEPT",
      d: "MECANISMO: o TEPT já tem hipervigilância, amnésia e risco de uso. O benzodiazepínico alivia rápido, gera tolerância e retirada, e o livro o descreve como relativamente ineficaz no TEPT, com ressalva de cuidado. DESFECHO: dependência, piora da extinção do medo e desinibição. Ponte curta de crise não é tratamento do transtorno.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 460
    },
    {
      id: "dem-anticolinergico-ieca",
      t: "Anticolinérgico forte junto de inibidor de colinesterase",
      d: "MECANISMO: o anticolinérgico compete no receptor que o inibidor tenta preservar. DESFECHO: o cognitivo piora e o risco de delirium e queda sobe. Trocar ou parar o de escore alto; não 'compensar' subindo donepezila.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 654
    },
    {
      id: "dem-antipsicotico-bpsd-rotina",
      t: "Antipsicótico de rotina no BPSD",
      d: "MECANISMO: bloqueio D2 em cérebro já vulnerável soma AVC, morte, queda e Parkinsonismo. Na Lewy o risco é maior — o proibido haloperidol-parkinson-lewy continua válido. DESFECHO: sedar a agitação e acelerar o declínio. Causa física e medida não farmacológica vêm primeiro.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 667
    },
    {
      id: "ins-zolpidem-cronico",
      t: "Zolpidem contínuo além de 4 semanas como tratamento da insônia crônica",
      d: "MECANISMO: tolerância, rebote e parasomnia. A ABS limita a 4 semanas e prefere uso intermitente. DESFECHO: queda no idoso, dependência e insônia de retirada tratada com mais caixa.",
      f: "ABS — Diretriz de Insônia em Adultos, 2023"
    },
    {
      id: "tdah-estimulante-cardiopata",
      t: "Estimulante sem checar coração",
      d: "MECANISMO: metilfenidato e lisdexanfetamina sobem pressão e pulso; em cardiopatia estrutural ou história de morte súbita o risco deixa de ser teórico. DESFECHO: síncope, arritmia. O Maudsley não pede ECG de rotina no saudável — pede história e exame. Sem isso, não começa.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 599
    },
    {
      id: "tea-risperidona-autismo",
      t: "Risperidona 'para tratar autismo'",
      d: "MECANISMO: a risperidona no PCDT é para irritabilidade e agressão, depois de causa física e medida não farmacológica. Não altera o diagnóstico nem a comunicação. DESFECHO: ganho de peso, prolactina e Parkinsonismo sem o desfecho que a família pediu. Reduzir quando a crise ceder.",
      f: "MS — PCDT Comportamento Agressivo no TEA, Portaria Conjunta SAES/SCTIE/MS nº 7, 2022"
    },
    {
      id: "ta-farmaco-unico",
      t: "Fármaco como único tratamento de anorexia, bulimia ou compulsão",
      d: "MECANISMO: nenhum fármaco tem registro para anorexia; na bulimia e na compulsão o efeito é adjuvante. O eixo é realimentar e psicoterapia estruturada. DESFECHO: achar que a caixa substitui peso e terapia — a mortalidade da anorexia não cai com ISRS isolado.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 792
    },
    {
      id: "ta-bupropiona",
      t: "Bupropiona na anorexia ou na bulimia",
      d: "MECANISMO: a bupropiona emagrece e baixa o limiar convulsivo. Na anorexia isso soma catabolismo; na bulimia, o vômito e o distúrbio eletrolítico já baixam o limiar. DESFECHO: mais perda de peso e crise convulsiva. O proibido bupropiona-limiar-convulsivo continua válido; este recorta o transtorno alimentar.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 792
    },
    {
      id: "ta-risperidona-prolactina",
      t: "Risperidona, sulpirida ou amisulprida para ganhar peso na anorexia",
      d: "MECANISMO: elevam prolactina e pioram osso numa doença que já desmineraliza. Um RCT de risperidona não mostrou ganho de peso. DESFECHO: osteoporose somada a efeito extrapiramidal, sem o desfecho que se buscava.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 792
    },
    {
      id: "tpb-bzd-manutencao",
      t: "Benzodiazepínico de manutenção no transtorno de personalidade borderline",
      d: "MECANISMO: o borderline já tem impulsividade, raiva e risco de overdose. O benzodiazepínico desinibe — em ensaio a taxa de reação paradoxal chegou a mais da metade. DESFECHO: agressão, desinibição sexual, nova dependência e mais um meio letal em casa.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 471
    },
    {
      id: "per-valproato-gestante",
      t: "Valproato em quem pode engravidar",
      d: "MECANISMO: o valproato é teratógeno com associação causal a malformação e a atraso de desenvolvimento. DESFECHO: defeito de tubo neural, prejuízo cognitivo. Se for o único fármaco que a mantém, o Maudsley descreve termo de risco — não é a receita do pré-natal de rotina.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 724
    },
    {
      id: "per-litio-amamentacao",
      t: "Amamentar em lítio sem plano",
      d: "MECANISMO: o lítio equilibra através da placenta e o RID no leite chega a 12–30 por cento, com ureia e creatinina altas no lactente. DESFECHO: toxicidade neonatal. Se o lítio é imprescindível, em geral não se amamenta. Não é o mesmo que ISRS.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 745
    },
    {
      id: "ij-ad-leve-sem-terapia",
      t: "Antidepressivo na depressão leve da criança ou do adolescente sem tentativa de apoio ou terapia",
      d: "MECANISMO: NICE e AACAP, citados pelo Maudsley, não põem fármaco na depressão leve. DESFECHO: ativação, ideação e caixa sem o tratamento que muda o quadro. Moderada a grave é outro recorte.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 566
    },
    {
      id: "emg-flumazenil-convulsao",
      t: "Flumazenil no coma de causa desconhecida ou na overdose mista",
      d: "MECANISMO: o flumazenil tira de uma vez a inibição GABAérgica. Se há tricíclico, outro convulsivante ou dependência de benzodiazepínico, o córtex dispara. DESFECHO: convulsão e arritmia. Só no benzodiazepínico isolado, no não dependente, com hipoventilação.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 462
    },
    {
      id: "emg-olanzapina-im-bzd",
      t: "Olanzapina IM combinada com benzodiazepínico IM",
      d: "MECANISMO: a associação parenteral soma depressão respiratória e hipotensão, descrita na agitação. DESFECHO: hipoventilação. A ABP manda via oral primeiro e evitar intravenosa; olanzapina IM não se combina com benzodiazepínico IM.",
      f: "ABP — Diretrizes brasileiras para o manejo da agitação psicomotora, 2021"
    },
    {
      id: "sub-buprenorfina-agonista-pleno",
      t: "Buprenorfina com agonista pleno ainda no receptor",
      d: "MECANISMO: a buprenorfina tem alta afinidade e baixa atividade intrínseca; desloca heroína ou metadona e deixa o receptor a meio-gás. DESFECHO: abstinência precipitada. Só entra se a privação já está visível, ou em indução lenta protocolada.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 508
    },
    {
      id: "sub-metadona-intoxicado",
      t: "Metadona em quem ainda está intoxicado",
      d: "MECANISMO: agonista pleno soma depressão respiratória à do álcool, do benzodiazepínico ou do opioide que ainda está lá. DESFECHO: overdose. Abstinência de opioide não mata; metadona na titulação mata. Primeiro: está dependente? Vai tolerar esta dose?",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 505
    },
    {
      id: "sub-naltrexona-opioide",
      t: "Naltrexona com opioide ainda no receptor",
      d: "MECANISMO: antagonista competitivo em quem ainda tem agonista no mu. DESFECHO: abstinência precipitada, tão grave quanto a da naloxona, e mais longa. Não é tratamento de abstinência aguda. Só depois de limpeza do opioide.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 498
    },
    {
      id: "sub-metadona-bzd",
      t: "Metadona somada a benzodiazepínico no intoxicado ou na titulação cega",
      d: "MECANISMO: dois depressores respiratórios. O livro marca aumento de morte quando metadona e benzodiazepínico se somam, sobretudo na titulação. DESFECHO: apneia. Conversão de benzodiazepínico é outro protocolo, não 'mais um comprimido para ansiedade'.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 505
    }
  ]
};

PSICOFARMACOS.dosemuda = {
  rot: "Dose muda a função",
  nota: "O mesmo fármaco em dose diferente é outro remédio. Isso não é curiosidade " +
        "farmacológica: é a origem de dois erros diários — subdosar achando que tratou, e " +
        "usar dose de outra indicação achando que é a mesma coisa.",
  itens: [
    { id: "dm-amitriptilina",
      t: "Amitriptilina — abaixo de 100 mg/dia NÃO é antidepressivo",
      d: "Em dose baixa trata dor neuropática, dor crônica, profilaxia de enxaqueca e insônia. " +
         "O efeito ANTIDEPRESSIVO só aparece acima de 100 mg/dia, com máximo em torno de 200 a " +
         "250 mg/dia considerando o risco cardíaco. Prescrever 25 mg à noite e anotar " +
         "depressão tratada é o erro clássico — e está descrito no próprio CAB como caso.",
      f: "MS — CAB nº 34, Saúde Mental, 2013" },

    { id: "dm-fluoxetina",
      t: "Fluoxetina — 20 mg para depressão, 60 a 80 mg para TOC",
      d: "Sintoma obsessivo-compulsivo responde a doses normalmente MAIS ALTAS de " +
         "antidepressivo, por exemplo 60 a 80 mg/dia de fluoxetina — e ainda assim raramente " +
         "com resposta plenamente satisfatória. Já a ansiedade crônica usa doses EQUIVALENTES " +
         "às da depressão, não maiores. Três indicações, três patamares.",
      f: "MS — CAB nº 34, Saúde Mental, 2013" },

    { id: "dm-quetiapina",
      t: "Quetiapina — 300 a 600 mg na depressão bipolar, 600 a 800 mg na mania",
      d: "A mesma molécula, no mesmo transtorno, em doses diferentes conforme a FASE. E em " +
         "dose baixa (25 a 50 mg) o que age é essencialmente o bloqueio histamínico: vira " +
         "hipnótico, uso muito difundido, sem indicação em protocolo e com o risco metabólico " +
         "da classe junto.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "dm-clorpromazina",
      t: "Clorpromazina — abaixo de 150 mg/dia associa-se a MAIS recidiva",
      d: "Existe um piso, não só um teto. Doses abaixo de 150 mg/dia estão relacionadas a maior " +
         "chance de recidiva; as médias ficam entre 400 e 800 mg/dia, com 1 g como máximo. " +
         "Manter o paciente numa dose confortável e ineficaz é uma forma silenciosa de não tratar.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "dm-propranolol",
      t: "Propranolol — cardiológico numa dose, psiquiátrico na mesma faixa",
      d: "Betabloqueador anti-hipertensivo e antianginoso que, em 40 a 160 mg/dia divididos em " +
         "2 a 3 tomadas, é tratamento de ACATISIA induzida por antipsicótico. Também é o que " +
         "se usa no tremor fino do lítio. A indicação muda; a molécula e a faixa, não.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "dm-clonazepam",
      t: "Clonazepam — antiepiléptico, ansiolítico e antiacatísico",
      d: "É usado por vezes no tratamento da epilepsia; na faixa de 0,5 a 8 mg/dia é " +
         "ansiolítico; e em 0,5 a 2 mg/dia é alternativa ao propranolol na acatisia. Três " +
         "papéis, uma caixa.",
      f: "MS — CAB nº 34, Saúde Mental, 2013" },

    { id: "dm-bupropiona",
      t: "Bupropiona — antidepressivo que virou fármaco de cessação tabágica",
      d: "Registrada como antidepressivo, é o que o SUS dispensa para PARAR DE FUMAR, no " +
         "esquema de 150 mg pela manhã por 3 dias e depois 150 mg duas vezes ao dia por 84 " +
         "dias. O efeito sobre o tabagismo não depende de haver depressão.",
      f: "MS — PCDT Tabagismo, Portaria Conjunta SCTIE/SAES/MS nº 10, 2020" },

    { id: "dm-anticonvulsivantes",
      t: "Valproato, carbamazepina e lamotrigina — antiepilépticos que estabilizam humor",
      d: "Três anticonvulsivantes que são estabilizadores de primeira linha no bipolar, com " +
         "faixas e níveis séricos próprios para essa indicação. E dentro do bipolar eles não " +
         "são intercambiáveis: valproato rende mais no episódio misto e na ciclagem rápida, " +
         "lamotrigina no polo depressivo.",
      f: "MS — PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "dm-cetamina",
      t: "Cetamina — anestésico numa dose, antidepressivo em outra",
      d: "Registrada na ANVISA originalmente para ANESTESIA. Em doses sub-anestésicas tem " +
         "efeito antidepressivo e antissuicida rápido, por bloqueio NMDA. É o exemplo mais " +
         "nítido de dose que troca a função — e o uso psiquiátrico da cetamina racêmica " +
         "permanece off-label no Brasil; só a escetamina intranasal tem registro próprio.",
      f: "CFM/CREMEC — Parecer nº 14/2021 (registro ANVISA Resolução-RE nº 4.413, 2020)" },

    { id: "dm-risperidona",
      t: "Risperidona — atípica em dose baixa, praticamente típica acima de 6 mg/dia",
      d: "A manutenção fica em 3 a 6 mg/dia e o máximo em 8 mg/dia no TAB. Conforme a dose " +
         "sobe, o bloqueio D2 aumenta a ponto de o perfil extrapiramidal se aproximar do de um " +
         "antipsicótico típico — a vantagem de ser atípica se perde na dose alta.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013; e PCDT Transtorno Afetivo Bipolar do tipo I, Portaria SAS/MS nº 315, 2016" },

    { id: "dm-olanzapina",
      t: "Olanzapina — 20 mg é o teto usual, 30 mg só numa situação",
      d: "Não há evidência de que acima de 20 mg/dia seja mais eficaz em paciente NÃO " +
         "refratário. A exceção é estreita: até 30 mg/dia em refratário que teve efeito " +
         "adverso grave com clozapina (agranulocitose, cardiopatia, oclusão intestinal). E no " +
         "paciente debilitado e emagrecido o máximo é 5 mg/dia.",
      f: "MS — PCDT Esquizofrenia, Portaria SAS/MS nº 364, 2013" },

    { id: "dm-atipico-potencializador",
      t: "Antipsicótico atípico como POTENCIALIZADOR de antidepressivo",
      d: "Na depressão unipolar resistente o antipsicótico entra como adjuvante, em dose menor " +
         "que a usada para tratar psicose. Aripiprazol e brexpiprazol são primeira linha " +
         "adjuvante; cariprazina é segunda. Mesma classe, papel e patamar diferentes.",
      f: "CANMAT 2023 (Can J Psychiatry, 2024)" },
    {
      id: "toc-isrs-dose-maior",
      t: "ISRS no TOC — a dose é maior que a da depressão",
      d: "A fluoxetina no TOC vai a 60 mg; a paroxetina a 40–60 mg. A resposta inicial demora 10 a 12 semanas, mais que na depressão. Manter pelo menos 1 ano. O dm-fluoxetina do CAB (60 a 80 mg) cobre o mesmo fato pela fonte brasileira.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025",
      p: 447
    }
  ]
};
