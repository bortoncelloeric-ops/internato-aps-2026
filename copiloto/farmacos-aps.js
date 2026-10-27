/* Formulário de fármacos da APS — conteúdo do painel "Fármacos" no módulo APS.
 *
 * Só dados. O renderer vive no index.html. Arquivo IRMÃO do psicofarmacos.js
 * (decisão F0 do APS I, 26/10/2026): o MESMO esquema, outro registro. O
 * psicofarmacos.js não muda — a admissao/ lê PSICOFARMACOS direto.
 *
 * Fármaco de saúde mental usado na APS (fluoxetina, amitriptilina) NÃO entra
 * aqui: a queixa de APS referencia o cartão do psicofarmacos.js pelo id. Um
 * resolvedor único procura o id nos dois registros, e os ids são únicos entre
 * eles (há teste).
 *
 * REGRA DE DOSE — a mesma do psicofarmacos.js, sem exceção: toda dose carrega a
 * fonte no próprio cartão (ou na linha, `f`), lida no PDF e não lembrada.
 * `p` é a página IMPRESSA e só vale para fonte cujo .cite traz `offset=`
 * (o conferir-doses lê só aquela página e a seguinte). Sem fonte conferida, o
 * cartão sai `v: true`, com fonte "VERIFICAR…", e sem dígito de dose.
 *
 * Dose pediátrica, por faixa de peso ou idade, é o maior risco (auditoria de
 * 23/09/2026): a linha diz a população, a indicação e a formulação — número
 * certo com recorte errado já passou em todos os testes uma vez.
 *
 * Textos das fontes: ../../internato-aps1-2026-2/copiloto-onda-aps1/raw/
 *
 * Fármaco = {nome, id, kw, apres, dose:[{rot,val,f?,p?}], porque, escolher,
 *            evitar, contraind, adversos, monitor, fonte, v?, diverge?}
 */

var FARMACOS_APS = {
  atualizado: "2026-10-26",

  regra: {
    titulo: "Como ler este formulário",
    partes: [
      { rot: "A FONTE",
        txt: "Cada fármaco traz a fonte da dose no rodapé do card, e a linha que vem de " +
             "outra fonte diz qual, com a página. PCDT é portaria do Ministério da Saúde e " +
             "vale como norma no SUS; CAB é o caderno da Atenção Básica; caderneta é o que a " +
             "família leva para casa. Onde não há fonte datada, o card sai marcado VERIFICAR " +
             "e não inventa número." },
      { rot: "O SUS",
        txt: "A linha No Brasil diz se a farmácia da USF tem (RENAME 2024, componente) e que " +
             "receita usar. Prescrever o que não tem é receita que não vira tratamento." },
      { rot: "A CRIANÇA",
        txt: "Dose de criança é por faixa de peso ou de idade, e a linha diz qual. Recalcule " +
             "com o peso do dia, no conversor da queixa, e confira a formulação (gota, mL, " +
             "comprimido) antes de escrever." },
      { rot: "O LIMITE",
        txt: "Este formulário apoia a decisão, não a substitui. Primeira prescrição, troca de " +
             "esquema e qualquer decisão em gestante, criança ou idoso frágil passam pela " +
             "preceptora." }
    ]
  },

  classes: []
};

/* As classes entram por push, como em psicofarmacos.js. */

FARMACOS_APS.classes.push({
  rot: "Suplementação na infância",
  kw: "suplementacao vitamina a retinol micronutriente crianca programa megadose",
  quando: "Ação de programa nacional, por faixa etária, registrada na Caderneta da Criança — não é prescrição por queixa.",
  nota: "O ferro da criança não tem linha publicada nesta onda: o CAB nº 33 (2012) dá 6 a 24 meses pela atualização do programa; o esquema vigente está no Caderno de Suplementação de Micronutrientes de 2025, não conferido.",
  farmacos: [
    {
      nome: "Vitamina A (palmitato de retinol), megadose",
      id: "vitamina-a",
      kw: "vitamina a retinol palmitato megadose capsula programa xeroftalmia cegueira",
      apres: "cápsula gelatinosa mole de palmitato de retinol, uma concentração para cada faixa etária do programa (RENAME 2024, Componente Estratégico)",
      dose: [
        { rot: "Dose", val: "sem fonte brasileira datada conferida — confirmar no protocolo do serviço" }
      ],
      porque: "A deficiência de vitamina A é a principal causa de cegueira evitável e se associa a mortes por diarreia. Na revisão citada pelo CAB nº 33, a megadose reduziu morbidade e mortalidade entre 1 e 59 meses, mais entre 6 e 11 meses — mas esse efeito ficou restrito a populações carentes do Sul da Ásia; a indicação aqui é a do programa nacional, em área de risco.",
      escolher: "Toda criança de 6 a 59 meses que vive em área do Programa Nacional de Suplementação de Vitamina A — a Região Nordeste está entre elas. É ação de programa, por faixa etária: conferir na caderneta a data da última megadose antes de dar outra.",
      evitar: "Fora da faixa etária do programa e antes de completar o intervalo entre megadoses. Mulher em idade fértil e gestante: a administração inadequada traz risco de toxicidade e de teratogenicidade.",
      contraind: "Gestação (risco teratogênico). As demais contraindicações do programa vigente não foram conferidas — ver o Caderno de Suplementação de Micronutrientes, 2025.",
      adversos: "Nas doses do programa a megadose é segura, com baixa incidência de efeitos colaterais; vitamina em excesso faz tanto mal quanto a carência. A lista de eventos adversos do programa vigente não foi conferida.",
      monitor: "Registrar cada megadose na Caderneta da Criança, com a data, e conferir o registro antes da próxima.",
      v: true,
      fonte: "VERIFICAR — esquema vigente no Caderno dos Programas Nacionais de Suplementação de Micronutrientes, 2ª ed., 2025 (não baixado); o CAB nº 33 (2012) traz o esquema do programa de 2004"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Ferro e ácido fólico (suplementação)",
  kw: "suplementacao ferro sulfato ferroso acido folico folato anemia tubo neural gestante puerpera crianca",
  quando: "Prevenção universal da anemia ferropriva e do defeito do tubo neural na gestação e no " +
          "puerpério, e tratamento da anemia. Cada linha de dose diz a população: a de prevenção " +
          "não trata anemia.",
  nota: "A dose de ferro é escrita em ferro ELEMENTAR. O comprimido de sulfato ferroso de 200 mg " +
        "tem 40 mg de ferro elementar; a solução oral e o xarope têm concentrações diferentes. " +
        "Conferir a formulação antes de converter.",
  farmacos: [
    {
      nome: "Sulfato ferroso",
      id: "sulfato-ferroso",
      kw: "ferro ferroso sulfato anemia ferropriva suplementacao profilaxia gestante puerpera crianca lactente gotas xarope",
      apres: "comprimido equivalente a 40 mg de ferro elementar (sulfato ferroso 200 mg); solução oral " +
             "equivalente a 25 mg/mL de ferro elementar; xarope equivalente a 5 mg/mL de ferro elementar " +
             "(RENAME 2024)",
      dose: [
        { rot: "Gestante sem anemia (Hb de 11 g/dL ou mais) — prevenção",
          val: "40 mg/dia de ferro elementar (1 comprimido de 200 mg de sulfato ferroso), todos os dias, " +
               "do conhecimento da gravidez até o terceiro mês após o parto; longe das refeições, de " +
               "preferência com suco cítrico", p: 109 },
        { rot: "Gestante com anemia leve a moderada (Hb de 8 a 11 g/dL) — tratamento",
          val: "120 a 240 mg/dia de ferro elementar; o usual são 5 drágeas de 40 mg por dia (2 de manhã, " +
               "2 à tarde e 1 à noite), uma hora antes das refeições · repetir a Hb entre 30 e 60 dias: " +
               "subindo, manter até Hb de 11 g/dL e então voltar a 1 drágea por dia",
          f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
        { rot: "Puérpera sem anemia — prevenção",
          val: "40 mg/dia de ferro elementar (comprimido de 200 mg), 30 minutos antes do almoço, de " +
               "preferência com suco de fruta cítrica, até três meses após o parto", p: 135 }
      ],
      porque: "A anemia na gestação se associa a baixo peso ao nascer, mortalidade perinatal e trabalho " +
              "de parto prematuro, e a deficiência de ferro é a causa mais comum — cerca de 40% das " +
              "gestantes, no Manual de Gestação de Alto Risco 2022. A suplementação diária previne a Hb " +
              "baixa no parto e no puerpério.",
      escolher: "Prevenção para toda gestante, do diagnóstico da gravidez ao terceiro mês pós-parto " +
                "(Protocolo AB 2016; o Manual 2022 diz praticamente todas). Hb abaixo de 11 g/dL: " +
                "dose de tratamento, com parasitológico de fezes e tratamento da parasitose junto " +
                "(CAB 32). Puérpera anêmica: o CAB 32 só dá a prevenção 'para mulheres sem anemia'; " +
                "seguir a lógica da gestante — dose de tratamento até Hb de 11 g/dL e depois a de " +
                "prevenção até o terceiro mês pós-parto (o Manual 2022 mantém a dose de manutenção até " +
                "o puerpério). Intolerância ao sulfato ferroso com anemia ferropriva: a RENAME 2024 tem " +
                "ferripolimaltose no Componente Básico (Conitec nº 813). A linha diz ferro elementar: " +
                "conferir comprimido, solução oral ou xarope antes de converter.",
      evitar: "Doença com sobrecarga de ferro (anemia hemolítica, hemocromatose) não entra na " +
              "suplementação de rotina (Manual 2022). Talassemia e doença falciforme não são anemia " +
              "ferropriva: avaliar a necessidade de acompanhamento no alto risco antes de dar ferro " +
              "(Protocolo AB 2016).",
      contraind: "Doenças com sobrecarga de ferro, como anemias hemolíticas e hemocromatose — a exceção " +
                 "à suplementação de rotina no Manual de Gestação de Alto Risco 2022.",
      adversos: "Gastrointestinais: gosto metálico, náusea, flatulência e constipação; prejudicam a " +
                "adesão. Na dose de tratamento, subir a dose aos poucos reduz o efeito adverso " +
                "(Manual 2022).",
      monitor: "Hb na 1ª consulta e no 3º trimestre (Caderneta 2026). Em tratamento, Hb de novo entre " +
               "30 e 60 dias: estacionada ou caindo, ou abaixo de 8 g/dL, vai ao pré-natal de alto " +
               "risco (CAB 32). Perguntar pela adesão em toda consulta.",
      diverge: "Início da prevenção: o Protocolo AB 2016 (p. 109) manda do conhecimento da gravidez até " +
               "o terceiro mês pós-parto; o CAB 32 (2012) se contradiz — a 1ª consulta prescreve a todas, " +
               "o Quadro 13 diz a partir da 20ª semana e a Figura 9 só com fator de risco. Tratamento: o " +
               "Manual de Gestação de Alto Risco 2022 (PDF 403) usa 160 a 200 mg/dia de ferro elementar " +
               "para Hb de 9 a 11 g/dL, manutenção de 60 a 80 mg/dia depois de Hb acima de 10,5 g/dL até " +
               "o puerpério, e ferro endovenoso preferível com Hb abaixo de 9 g/dL a partir de 14 semanas. " +
               "O Fluxograma 6 do Protocolo AB 2016 escreve 200 mg/dia de sulfato ferroso, mas descreve 5 " +
               "comprimidos de 40 mg de ferro elementar: o número é de ferro elementar. A prevenção do " +
               "Manual 2022 é de 30 a 40 mg/dia.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Ácido fólico",
      id: "acido-folico",
      kw: "folato acido folico tubo neural dtn pre-concepcao gestante anemia megaloblastica",
      apres: "comprimido 5 mg; solução oral 0,2 mg/mL (RENAME 2024)",
      dose: [
        { rot: "Gestante e mulher que planeja engravidar — prevenção de defeito do tubo neural (rotina)",
          val: "0,4 mg/dia (400 µg), dose única diária — 2 mL da solução oral de 0,2 mg/mL —, desde pelo " +
               "menos 30 dias antes de engravidar até o final da gestação",
          p: 117 },
        { rot: "Pré-concepção com antecedente de defeito do tubo neural",
          val: "5 mg/dia, VO, durante 60 a 90 dias antes da concepção; quem já teve feto ou RN com DTN usa " +
               "continuamente enquanto deseja engravidar",
          f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
        { rot: "Epilepsia em uso de anticonvulsivante — pré-concepção e gestação",
          val: "4 a 5 mg/dia, desde pelo menos 3 meses antes da concepção e durante toda a gravidez",
          f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Trombofilia, inclusive síndrome antifosfolípide — gestação planejada",
          val: "5 mg/dia, desde antes da concepção e durante toda a gestação",
          f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Diabetes tipo 1 ou 2 — pré-concepção",
          val: "4 mg/dia no plano de pré-concepção",
          f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Após cirurgia bariátrica, com obesidade ou diabetes",
          val: "4 a 5 mg/dia no período periconcepcional e no 1º trimestre (sem obesidade nem diabetes: " +
               "400 a 800 mcg/dia)",
          f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Gestante com anemia megaloblástica por deficiência de folato — tratamento",
          val: "1,0 mg/dia até a normalização dos exames laboratoriais",
          f: "MS — Manual de Gestação de Alto Risco, 2022" }
      ],
      porque: "O folato periconcepcional tem forte efeito protetor contra os defeitos abertos do tubo " +
              "neural (CAB 32); por isso começa pelo menos um mês antes da concepção e segue a gestação " +
              "inteira (Manual 2022).",
      escolher: "A dose baixa é a rotina. A dose alta é para antecedente de DTN (CAB 32), epilepsia em " +
                "anticonvulsivante (CAB 32 e Manual 2022), diabetes tipo 1 ou 2, trombofilia/SAF e " +
                "pós-bariátrica com obesidade ou diabetes (Manual 2022). A RENAME 2024 lista comprimido " +
                "de dose alta e solução oral, e não lista comprimido de dose baixa: a dose baixa sai da " +
                "solução oral; conferir a apresentação da farmácia da USF antes de prescrever.",
      evitar: "Prescrever a dose alta a toda gestante por hábito (o CAB 32 ainda escreve assim na 1ª " +
              "consulta; o Protocolo AB 2016 e o Manual 2022 usam a dose baixa na rotina) — ou dar a " +
              "dose baixa à epiléptica em anticonvulsivante, à diabética, à com SAF ou à que já teve " +
              "filho com DTN. Anemia macrocítica: dosar folato e vitamina B12 antes de tratar.",
      contraind: "As fontes de pré-natal lidas não listam contraindicação; o Quadro 9 do Protocolo AB 2016 " +
                 "classifica o ácido fólico como segurança A na gestação e na lactação.",
      adversos: "As fontes de pré-natal lidas não descrevem efeito adverso relevante nas doses de " +
                "prevenção.",
      monitor: "Confirmar o uso desde a 1ª consulta. Hb com VCM acima de 100 fL sugere anemia " +
               "macrocítica: folato e vitamina B12 fazem o diagnóstico diferencial (Manual 2022).",
      diverge: "O CAB 32 (2012) prescreve 5 mg/dia a toda gestante 'para profilaxia da anemia', junto com " +
               "o ferro. O Protocolo AB 2016 (p. 66 e p. 117) usa 0,4 mg/dia, pelo menos 30 dias antes " +
               "de engravidar até o fim da gestação, e o Manual de Gestação de Alto Risco 2022 (PDF 405) " +
               "usa 0,4 a 0,8 mg/dia, a partir de pelo menos um mês antes da concepção. As duas fontes " +
               "mais recentes do MS ficam com a dose baixa na rotina.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Prevenção de pré-eclâmpsia",
  kw: "pre-eclampsia preeclampsia prevencao aas aspirina calcio gestante risco hipertensao",
  quando: "Gestante com 1 fator de alto risco ou 2 de risco moderado para pré-eclâmpsia (Quadro 1 do " +
          "capítulo de hipertensão crônica do Manual de Gestação de Alto Risco 2022). AAS e cálcio " +
          "entram juntos. Gestante sem fator de risco não usa nenhum dos dois.",
  nota: "A indicação é clínica, pelos fatores de risco, e a janela é curta: o AAS começa antes da 16ª " +
        "semana. Rever os fatores na 1ª consulta.",
  farmacos: [
    {
      nome: "Ácido acetilsalicílico (AAS)",
      id: "acido-acetilsalicilico",
      kw: "aas aspirina acido acetilsalicilico pre-eclampsia prevencao gestante risco",
      apres: "comprimido 100 mg; comprimido 500 mg (RENAME 2024)",
      dose: [
        { rot: "Gestante com 1 fator de alto risco ou 2 de risco moderado para pré-eclâmpsia — prevenção",
          val: "100 mg/dia, à noite, iniciado antes da 16ª semana de gestação e mantido até 36 semanas" }
      ],
      porque: "Na gestante de risco moderado a elevado, o AAS em baixa dose pode prevenir a " +
              "pré-eclâmpsia; na gestante sem risco não se recomenda (CAB 32, grau de recomendação A " +
              "contra o uso em gestantes normais).",
      escolher: "Indicação pelos fatores do Manual 2022. Alto risco (basta um): pré-eclâmpsia prévia, " +
                "gestação múltipla, obesidade com IMC acima de 30, hipertensão crônica, diabetes tipo 1 " +
                "ou 2, doença renal, doença autoimune como lúpus e síndrome antifosfolípide. Risco " +
                "moderado (precisa de dois): nuliparidade, mãe ou irmã com pré-eclâmpsia, baixo nível " +
                "socioeconômico, afrodescendente, idade de 35 anos ou mais, baixo peso ao nascer da " +
                "própria gestante, gestação anterior com desfecho adverso, mais de 10 anos desde a " +
                "última gestação. Prescrever junto com o cálcio.",
      evitar: "Gestante sem fator de risco (CAB 32). Começar tarde: as fontes mandam iniciar no fim do " +
              "1º trimestre ou no começo do 2º — CAB 32 entre a 12ª e a 14ª semana, Manual 2022 antes da " +
              "16ª.",
      contraind: "As fontes de pré-natal lidas não listam contraindicações do AAS em dose baixa: conferir " +
                 "na bula antes de prescrever.",
      adversos: "O Quadro 9 do Protocolo AB 2016 classifica o AAS como C/D na gestação e C na lactação; " +
                "as fontes de pré-natal lidas não detalham os efeitos adversos.",
      monitor: "Conferir a indicação na 1ª consulta e suspender com 36 semanas. PA e sinais de " +
               "pré-eclâmpsia em toda consulta (Caderneta 2026).",
      diverge: "Data de início: Manual 2022, capítulo de hipertensão crônica (43.3, PDF 440): antes da 16ª " +
               "semana até 36; capítulo de síndromes hipertensivas (PDF 163): da 12ª à 36ª semana em " +
               "quem teve pré-eclâmpsia; CAB 32: iniciar entre a 12ª e a 14ª semana. Dose: nos capítulos " +
               "de diabetes (PDF 456) e de obesidade (PDF 523) o Manual cita 100 a 150 mg/dia pela OMS; " +
               "o capítulo geral e o Protocolo AB 2016 (p. 117) usam 100 mg/dia.",
      fonte: "MS — Manual de Gestação de Alto Risco, 2022"
    },
    {
      nome: "Carbonato de cálcio",
      id: "carbonato-de-calcio",
      kw: "calcio carbonato pre-eclampsia prevencao gestante suplementacao",
      apres: "comprimido 1.250 mg, equivalente a 500 mg de cálcio elementar; também associado a " +
             "colecalciferol (RENAME 2024)",
      dose: [
        { rot: "Gestante com 1 fator de alto risco ou 2 de risco moderado para pré-eclâmpsia — prevenção, junto com o AAS",
          val: "cálcio, suplementação mínima de 1 g/dia, até o parto — o Manual não diz se é cálcio " +
               "elementar ou sal; se for 1 g de cálcio elementar, são 2 comprimidos da RENAME, de 500 mg " +
               "de cálcio elementar cada" }
      ],
      porque: "Na gestante de risco moderado a alto e com baixa ingestão de cálcio, a suplementação " +
              "oral pode ter efeito favorável na prevenção da pré-eclâmpsia; não é recomendada a quem " +
              "ingere quantidade normal (CAB 32).",
      escolher: "Mesma população do AAS no Manual 2022: cálcio e AAS entram juntos. A dose do capítulo " +
                "geral é escrita em cálcio, e o comprimido da RENAME é de carbonato, com o equivalente " +
                "em cálcio elementar na apresentação: converter antes de prescrever. Gestante " +
                "pós-bariátrica: o Manual prefere citrato de cálcio, que absorve sem depender da acidez " +
                "gástrica.",
      evitar: "Gestante sem fator de risco e com ingestão normal de cálcio: não suplementar (CAB 32, grau " +
              "de recomendação A).",
      contraind: "As fontes de pré-natal lidas não listam contraindicações: conferir na bula antes de " +
                 "prescrever.",
      adversos: "As fontes de pré-natal lidas não descrevem efeitos adversos: conferir na bula.",
      monitor: "PA e sinais de pré-eclâmpsia em toda consulta (Caderneta 2026); a suplementação não " +
               "dispensa a vigilância.",
      diverge: "O Manual de Gestação de Alto Risco 2022 não é uniforme. Capítulo de hipertensão crônica " +
               "(43.3, PDF 440), que define a população: cálcio, mínimo de 1 g/dia, até o parto. Diabetes " +
               "(PDF 456): carbonato de cálcio 1.000 mg/dia da 12ª à 36ª semana, pela OMS. Obesidade " +
               "(PDF 523): 1 g de cálcio por dia em duas tomadas, desde a 12ª semana. Doença renal " +
               "crônica (PDF 540): carbonato de cálcio 500 mg ou citrato de cálcio 1.000 mg, duas a três " +
               "vezes ao dia. O CAB 32 não define dose. Confirmar com a preceptora se a meta é em cálcio " +
               "elementar.",
      fonte: "MS — Manual de Gestação de Alto Risco, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Toxoplasmose na gestação",
  kw: "toxoplasmose gestante igm espiramicina transmissao vertical",
  quando: "Gestante com IgM reagente para toxoplasmose, com ou sem IgG: infecção aguda até prova em " +
          "contrário. A USF inicia a espiramicina no mesmo dia e encaminha ao pré-natal de alto risco.",
  farmacos: [
    {
      nome: "Espiramicina",
      id: "espiramicina",
      kw: "espiramicina rovamicina toxoplasmose gestante macrolideo",
      apres: "comprimido 1.500.000 UI (500 mg) — RENAME 2024, Componente Estratégico",
      dose: [
        { rot: "Gestante com toxoplasmose aguda (IgM reagente, com ou sem IgG) — iniciar na USF",
          val: "3 g/dia: 2 comprimidos de 500 mg de 8 em 8 horas, VO; confirmada a infecção, mantida até o " +
               "parto, salvo troca pelo esquema tríplice no serviço de referência" }
      ],
      porque: "Macrolídeo que atinge altas concentrações no tecido placentário e diminui o risco de " +
              "transmissão vertical em 60 a 70% (Manual 2022). Infecção fetal confirmada ou de alta " +
              "probabilidade muda para o esquema tríplice, no serviço de referência.",
      escolher: "IgM reagente, com ou sem IgG: iniciar no mesmo dia e encaminhar ao pré-natal de alto " +
                "risco. IgG não reagente com IgM reagente: nova sorologia em 2 a 3 semanas — IgG ainda " +
                "negativa é falso positivo, suspender. IgG e IgM reagentes até 16 semanas: avidez na " +
                "mesma amostra — alta avidez é infecção anterior à gestação, suspender (Manual 2022).",
      evitar: "Tratar e não encaminhar: a espiramicina é a ponte; investigação fetal, USG seriada e a " +
              "troca pelo esquema tríplice são do serviço de referência.",
      contraind: "As fontes de pré-natal lidas não listam contraindicações; o Quadro 9 do Protocolo AB " +
                 "2016 classifica a espiramicina como segurança B na gestação e na lactação. Conferir na " +
                 "bula.",
      adversos: "As fontes de pré-natal lidas não descrevem os efeitos adversos da espiramicina: " +
                "conferir na bula.",
      monitor: "Nova sorologia em 2 a 3 semanas quando a IgG era não reagente; na gestante em " +
               "acompanhamento ou tratamento, USG obstétrica mensal ou bimensal (Manual 2022).",
      diverge: "Dose da espiramicina igual nas fontes: Protocolo AB 2016, Fluxograma 8 (p. 111), 1 g " +
               "(3.000.000 UI) de 8/8 h, e Quadro 9 (p. 118), 3 g/dia até o término da gravidez. O que " +
               "diverge é o resto. Protocolo AB 2016: espiramicina até o fim se a infecção é antes da 30ª " +
               "semana e esquema tríplice depois da 30ª (pirimetamina 25 mg 12/12 h, sulfadiazina 1.500 mg " +
               "12/12 h, ácido folínico 10 mg/dia); no Quadro 9, pirimetamina 25 mg 8/8 h por 3 dias e " +
               "depois 12/12 h, sulfadiazina 500 a 1.000 mg 6/6 h e ácido folínico 15 mg/dia, em ciclos " +
               "de 3 semanas; suscetível repete de 3 em 3 meses. Manual 2022 (PDF 245–248, algoritmo da " +
               "NT 14/2020): tríplice a partir de 16 semanas ou no 3º trimestre, com sulfadiazina 3 g/dia, " +
               "pirimetamina 50 mg/dia e ácido folínico 10 a 20 mg 3 vezes por semana; suscetível repete " +
               "mensal ou a cada 2 meses. Nunca ácido fólico no lugar do folínico: anula o tratamento.",
      fonte: "MS — Manual de Gestação de Alto Risco, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Anti-hipertensivos — IECA e BRA",
  kw: "ieca bra enalapril captopril losartana sistema renina angiotensina hipertensao",
  quando: "Uma das classes de base da HAS no PCDT; mais indicados na proteinúria, no diabetes, na IC e na doença renal. Nunca IECA junto com BRA.",
  nota: "Doses do Quadro 18 do PCDT de HAS (adulto, via oral, p. 52). Dose de criança e adolescente (Quadro 19) não entrou nesta onda.",
  farmacos: [
    {
      nome: "Enalapril (maleato)",
      id: "enalapril",
      kw: "enalapril ieca inibidor da enzima conversora hipertensao",
      apres: "comprimido 5 mg, 10 mg e 20 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "5 a 40 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "40 mg/dia", p: 52 }
      ],
      porque: "Inibe a conversão de angiotensina I em II e reduz a degradação da bradicinina, que é vasodilatadora. Beneficia IC, doença renal do diabetes e pós-IAM. É o IECA preferencial do PCDT.",
      escolher: "Proteinúria, diabetes, IC, doença renal, pós-IAM. Uma a duas tomadas ao dia, o que ajuda a adesão. Na pessoa preta não é a primeira escolha em monoterapia: responde menos e tem mais tosse e angioedema.",
      evitar: "Nunca junto com BRA. Gestação e mulher em idade fértil sem contracepção confiável. Hipercalemia, estenose bilateral de artéria renal, angioedema prévio.",
      contraind: "Gravidez; edema angioneurótico prévio com IECA; angioedema hereditário ou idiopático; hipercalemia (potássio acima de 5,5 mmol/L); estenose arterial renal bilateral; com alisquireno no diabético; com sacubitril (intervalo de 36 horas) (PCDT, p. 35, 36 e 54).",
      adversos: "Tosse seca (até 10%, mais em afrodescendentes); piora da função renal, em geral transitória; hipercalemia na insuficiência renal; angioedema e erupção cutânea, raros (p. 36 e 42).",
      monitor: "Creatinina e potássio. Ureia e creatinina subindo mais de 30%: interromper e investigar (p. 42). Reavaliar a PA um mês depois de iniciar ou mudar (p. 58).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Captopril",
      id: "captopril",
      kw: "captopril ieca urgencia hipertensiva crise hipertensiva",
      apres: "comprimido 25 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "25 a 150 mg/dia, em 2 a 3 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "250 mg/dia", p: 52 },
        { rot: "Urgência hipertensiva com risco cardiovascular iminente (ex.: aneurisma aórtico ou cerebral)", val: "25 mg por via ORAL, não sublingual, se não houver sobrecarga de volume; pico de ação em 60 a 90 minutos", p: 47 }
      ],
      porque: "IECA de ação curta. É o único do formulário com papel descrito na urgência hipertensiva, por via oral. No tratamento crônico pede várias tomadas ao dia.",
      escolher: "Urgência hipertensiva em quem tem risco iminente (aneurisma), e PA muito alta sem diagnóstico prévio de HAS, com retorno à APS para confirmar se é HAS ou pseudocrise. No crônico, prefira o enalapril: menos tomadas, melhor adesão.",
      evitar: "Sublingual: a via é oral. Baixar rápido a PA na urgência sem lesão de órgão-alvo causa isquemia (AVE, IAM, cegueira). As restrições do IECA: gestação, junto com BRA, angioedema prévio.",
      contraind: "Hipersensibilidade a outro IECA; gravidez (não usar sem orientação médica); edema angioneurótico prévio; hipercalemia (potássio acima de 5,5 mmol/L); estenose arterial renal bilateral (PCDT, p. 35, 36 e 54).",
      adversos: "Os do IECA: tosse seca, piora transitória da função renal, hipercalemia, angioedema raro (p. 42).",
      monitor: "Urgência: observar algumas horas na unidade; liberar se assintomático e com PA em queda; retorno em 24 a 48 horas (p. 47). Crônico: creatinina e potássio.",
      diverge: "Dose máxima: o PCDT de HAS (2025, Quadro 18, p. 52) traz 250 mg/dia; o CAB nº 37 (2013, Tabela 4) trazia 150 mg/dia.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Losartana potássica",
      id: "losartana",
      kw: "losartana bra bloqueador do receptor de angiotensina hipertensao",
      apres: "comprimido 50 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "50 a 100 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "100 mg/dia", p: 52 }
      ],
      porque: "Antagoniza a ação vasoconstritora da angiotensina II no receptor. É o BRA do SUS. A hipercalemia é incomum, e é mais bem tolerado que o IECA por afrodescendentes.",
      escolher: "As mesmas indicações do IECA: proteinúria, diabetes, IC, doença renal. Na pessoa preta não é a primeira escolha em monoterapia.",
      evitar: "Nunca junto com IECA. Gestação e mulher em idade fértil sem contracepção confiável. Lactação (sem estudos suficientes). Hipercalemia, estenose bilateral de artéria renal, história de angioedema.",
      contraind: "Gravidez; hipercalemia (potássio acima de 5,5 mmol/L); estenose arterial renal bilateral; uso de IECA; história de angioedema; insuficiência hepática grave; com alisquireno em quem tem diabetes e insuficiência renal (TFG abaixo de 60) (PCDT, p. 35, 41 e 55).",
      adversos: "Alteração transitória da função renal (ureia e creatinina), hipercalemia, sobretudo na insuficiência renal; raramente exantema (p. 41).",
      monitor: "Creatinina e potássio. Creatinina subindo mais de 30%: avaliar doença renovascular (p. 39).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Anti-hipertensivos — bloqueadores dos canais de cálcio",
  kw: "bcc bloqueador de canal de calcio anlodipino nifedipino verapamil di-hidropiridinico hipertensao",
  quando: "Classe de base da HAS. Di-hidropiridínicos (anlodipino, nifedipino) quase não mexem na frequência cardíaca; o verapamil, não di-hidropiridínico, é para HAS com fibrilação atrial.",
  nota: "Doses adulto do Quadro 18 do PCDT de HAS (p. 52); a linha da gestante vem do Quadro 17 (p. 50).",
  farmacos: [
    {
      nome: "Anlodipino (besilato)",
      id: "anlodipino",
      kw: "anlodipino amlodipina bcc hipertensao",
      apres: "comprimido 5 mg e 10 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "2,5 a 10 mg/dia, em 1 tomada", p: 52 },
        { rot: "Máxima adulto", val: "10 mg/dia", p: 52 }
      ],
      porque: "Bloqueia o canal de cálcio da musculatura lisa arteriolar e vasodilata, com mínima interferência na frequência cardíaca e na função sistólica. Uma tomada ao dia.",
      escolher: "Pessoa preta, junto com tiazídico. Compõe a tripla de referência (IECA ou BRA + BCC + tiazídico). Puérpera que já usava pode continuar.",
      evitar: "Cautela em IC com fração de ejeção reduzida classe III ou IV, taquiarritmia e edema de perna grave prévio. Gestante só com orientação médica.",
      contraind: "Não deve ser usado por grávida sem orientação médica; hipersensibilidade (PCDT, p. 53).",
      adversos: "Edema maleolar, cefaleia latejante, constipação, tontura; são dose-dependentes (p. 42).",
      monitor: "Edema de tornozelo e PA a cada reavaliação.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Nifedipino",
      id: "nifedipino",
      kw: "nifedipino nifedipina bcc puerpera gestante crise hipertensiva",
      apres: "cápsula ou comprimido 10 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "10 a 60 mg/dia, em 1 a 3 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "60 mg/dia", p: 52 },
        { rot: "Gestante — crise ou emergência hipertensiva (Quadro 17), DEPOIS do sulfato de magnésio", val: "10 mg por via oral; repetir 10 mg a cada 20 a 30 minutos, se necessário; máximo 30 mg", p: 50 },
        { rot: "Gestante — HAS, manutenção (Quadro 3 do Manual de Gestação de Alto Risco, p. 150)", val: "liberação rápida: 20 a 60 mg/dia, em 2 a 3 tomadas; retard: 20 a 120 mg/dia, em 1 a 3 tomadas", f: "MS — Manual de Gestação de Alto Risco, 2022" }
      ],
      porque: "BCC di-hidropiridínico de ação curta. É a primeira escolha oral na emergência hipertensiva da gestação e o anti-hipertensivo que o PCDT prioriza na puérpera.",
      escolher: "Puérpera hipertensa. Gestante hipertensa (manutenção pelo Manual de Gestação de Alto Risco; confirmar a formulação dispensada). Emergência hipertensiva da gestação (PA mantida acima de 160 ou 110), com monitorização fetal e encaminhamento no mesmo dia. PAS ≥160 ou PAD ≥110 na gestante, mesmo sem sintoma, indica sulfato de magnésio (PCDT p. 50): o Manual de Gestação de Alto Risco manda o sulfato vir ANTES do anti-hipertensivo de ação rápida, no local do atendimento (cartão sulfato-de-magnesio).",
      evitar: "Gestação antes da 20ª semana; choque. Com rifampicina não atinge nível eficaz. Cautela em taquiarritmia e IC com fração de ejeção reduzida.",
      contraind: "Choque cardiovascular; gravidez antes da 20ª semana; amamentação (lista do PCDT, p. 53 — ver divergência); associação com rifampicina (PCDT, p. 53).",
      adversos: "Edema maleolar, cefaleia latejante, constipação, tontura (p. 42).",
      monitor: "Na crise da gestante: monitorização fetal; hipotensão com desaceleração ou bradicardia fetal pede decúbito lateral esquerdo e soro fisiológico (p. 46).",
      diverge: "Lactação: a lista de contraindicações do PCDT de HAS (p. 53) inclui a amamentação; o texto sobre puérperas do mesmo PCDT (p. 50 e 51) diz que lactantes podem usar nifedipino e manda priorizá-lo. Gestação antes da 20ª semana: a lista de contraindicações do PCDT (p. 53) exclui; o Quadro 16 do mesmo PCDT (p. 49) e o Manual de Gestação de Alto Risco 2022 recomendam o nifedipino na gestação, sem limite de idade gestacional. Decidir com a preceptora e o pré-natal de alto risco.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Verapamil (cloridrato)",
      id: "verapamil",
      kw: "verapamil bcc nao di-hidropiridinico fibrilacao atrial frequencia cardiaca",
      apres: "comprimido 80 mg e 120 mg; solução injetável 2,5 mg/mL",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "120 a 360 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "480 mg/dia", p: 52 }
      ],
      porque: "BCC não di-hidropiridínico: reduz a frequência cardíaca e a condução atrioventricular, além de vasodilatar.",
      escolher: "HAS com fibrilação atrial, para controle da frequência.",
      evitar: "Não associar a betabloqueador: o PCDT não recomenda, pela redução acentuada da frequência cardíaca (p. 40). Disfunção de ventrículo esquerdo ou IC, bradicardia, bloqueio atrioventricular de alto grau. Constipação.",
      contraind: "Choque cardiogênico; BAV de 2º ou 3º grau e doença do nó sinusal, salvo marca-passo; IC com fração de ejeção abaixo de 35% e/ou pressão pulmonar acima de 20 mmHg; flutter ou fibrilação atrial com via acessória (Wolff-Parkinson-White, Lown-Ganong-Levine) (PCDT, p. 55). Quadro 12: FE abaixo de 40% e FC abaixo de 60 (p. 35).",
      adversos: "Constipação; edema, cefaleia e tontura da classe; bradicardia (p. 35 e 42).",
      monitor: "Frequência cardíaca a cada consulta.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Anti-hipertensivos — diuréticos",
  kw: "diuretico tiazidico hidroclorotiazida espironolactona furosemida alca poupador de potassio hipertensao",
  quando: "Tiazídico é classe de base da HAS; espironolactona é a quarta classe na HAS resistente; a furosemida entra com TFG abaixo de 30 ou edema de IC.",
  nota: "Doses adulto do Quadro 18 do PCDT de HAS (p. 52). A clortalidona foi avaliada pela Conitec e não foi incorporada ao SUS (PCDT, p. 42).",
  farmacos: [
    {
      nome: "Hidroclorotiazida",
      id: "hidroclorotiazida",
      kw: "hidroclorotiazida hctz tiazidico diuretico hipertensao",
      apres: "comprimido 12,5 mg e 25 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "25 a 50 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima na HAS (adulto)", val: "50 mg/dia", f: "MS — CAB nº 37, Hipertensão Arterial Sistêmica, 2013" }
      ],
      porque: "Reduz o volume circulante e extracelular. É o diurético de escolha do PCDT. Em dose baixa diminui os eventos adversos sem perder efetividade.",
      escolher: "Primeira opção na pessoa preta, sozinho ou com BCC. Compõe a tripla de referência (IECA ou BRA + BCC + tiazídico).",
      evitar: "Gota (salvo em terapia redutora de ácido úrico). Cautela em síndrome metabólica, intolerância à glicose, hipocalemia e hipercalcemia. Perde efeito com TFG abaixo de 30: trocar por diurético de alça. Evitar diurético na gestante com HAS pré-existente.",
      contraind: "Depuração de creatinina abaixo de 30 mL/min; distúrbio hepático grave; icterícia em criança; distúrbio grave de eletrólitos; anúria; má-absorção de glicose-galactose (PCDT, p. 54). Gota (Quadro 12, p. 35).",
      adversos: "Fraqueza, cãibras, hipovolemia, disfunção erétil; hiponatremia, hipocalemia, aumento de ácido úrico e de cálcio (p. 42).",
      monitor: "Sódio, potássio, ácido úrico e cálcio (p. 42); no seguimento anual, o sódio entra para quem usa tiazídico (p. 57).",
      diverge: "O Quadro 18 do PCDT de HAS (2025, p. 52) imprime 200 mg/dia como dose máxima. Destoa da faixa habitual do próprio quadro (25 a 50), do teto de 50 mg/dia do Quadro 19 do mesmo PCDT (p. 53) e do CAB nº 37 (50 mg/dia). Em todos os outros fármacos, o teto do Quadro 19 é igual ao do Quadro 18. Na HAS, não passar de 50 mg/dia: sem meta, somar a terceira classe (PCDT p. 36).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Espironolactona",
      id: "espironolactona",
      kw: "espironolactona poupador de potassio antagonista da aldosterona hipertensao resistente",
      apres: "comprimido 25 mg e 100 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "25 a 100 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "200 mg/dia", p: 52 }
      ],
      porque: "Diurético poupador de potássio que antagoniza a aldosterona. A evidência a coloca como a quarta classe preferencial na HAS resistente.",
      escolher: "HAS resistente: PA acima da meta com IECA ou BRA, BCC e tiazídico em dose máxima e boa adesão.",
      evitar: "Hipercalemia: risco maior com TFG abaixo de 45 ou potássio basal de 4,5 ou mais, sobretudo com IECA ou BRA e na DRC. Gestação (antagonista mineralocorticoide é contraindicado).",
      contraind: "Insuficiência renal aguda, redução significativa da função renal, anúria; doença de Addison; hipercalemia; uso de eplerenona (PCDT, p. 54). Gestação (p. 50).",
      adversos: "Hipercalemia (p. 40 e 44).",
      monitor: "Potássio e creatinina, sobretudo na DRC e com IECA ou BRA (p. 40 e 44).",
      diverge: "Dose máxima: o PCDT de HAS (2025, Quadro 18, p. 52) traz 200 mg/dia; o CAB nº 37 (2013, Tabela 4) trazia 100 mg/dia.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Furosemida",
      id: "furosemida",
      kw: "furosemida diuretico de alca edema insuficiencia cardiaca doenca renal",
      apres: "comprimido 40 mg; solução injetável 10 mg/mL",
      dose: [
        { rot: "Faixa habitual diária, adulto", val: "20 a 80 mg/dia, em 1 a 3 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "depende da resposta do paciente (Quadro 18, nota b)", p: 52 }
      ],
      porque: "Diurético de alça: mantém efeito quando o tiazídico já não funciona pela queda da filtração.",
      escolher: "Doença renal com TFG abaixo de 30; edema por IC.",
      evitar: "Hipovolemia ou desidratação; hipocalemia ou hiponatremia graves; lactação.",
      contraind: "Lactantes; insuficiência renal com anúria; pré-coma e coma por encefalopatia hepática; hipopotassemia ou hiponatremia graves; hipovolemia ou desidratação; hipersensibilidade a sulfonamidas; má-absorção de glicose-galactose (PCDT, p. 54).",
      adversos: "Fraqueza, cãibras, hipovolemia, disfunção erétil (classe diurética, p. 42).",
      monitor: "Potássio, sódio e creatinina (p. 57).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Anti-hipertensivos — betabloqueadores",
  kw: "betabloqueador atenolol propranolol carvedilol metoprolol angina pos-iam frequencia cardiaca hipertensao",
  quando: "Não são tratamento inicial da HAS: aumentam o risco de AVE em relação às outras classes. Só com indicação — angina, pós-IAM, IC, cardiopatia isquêmica, controle de FC, mulher em idade fértil ou planejando gravidez.",
  nota: "Doses adulto do Quadro 18 do PCDT de HAS (p. 52); linhas da gestante do Quadro 16 (p. 49). Retirar sempre aos poucos, em 2 a 4 semanas (p. 55). O propranolol para acatisia tem cartão próprio no formulário de psicofármacos.",
  farmacos: [
    {
      nome: "Atenolol",
      id: "atenolol",
      kw: "atenolol betabloqueador cardiosseletivo",
      apres: "comprimido 50 mg e 100 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "50 a 100 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "100 mg/dia", p: 52 }
      ],
      porque: "Betabloqueador cardiosseletivo: reduz o débito cardíaco e a secreção de renina.",
      escolher: "Angina, pós-IAM, cardiopatia isquêmica, controle de FC. Para a mulher que planeja engravidar, que também é indicação de betabloqueador, NÃO é este: use metoprolol ou carvedilol.",
      evitar: "Gestação (alto risco de restrição de crescimento fetal) e lactação (grande excreção no leite). Asma, DPOC, BAV de 2º e 3º grau. Não suspender de uma vez.",
      contraind: "Bradicardia, choque cardiogênico, hipotensão, acidose metabólica, distúrbio grave da circulação arterial periférica, BAV de 2º ou 3º grau, doença do nó sinusal, feocromocitoma não tratado, IC descompensada (PCDT, p. 53). Gestação e lactação (p. 50 e 51).",
      adversos: "Broncoespasmo, bradicardia, distúrbio de condução AV, vasoconstrição periférica, insônia, pesadelos, depressão, astenia, disfunção sexual; intolerância à glicose, aumento de triglicerídeos e LDL, queda do HDL (p. 43).",
      monitor: "Frequência cardíaca, glicemia e lipídios. Retirada gradual em 2 a 4 semanas (p. 55).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Propranolol (cloridrato)",
      id: "propranolol",
      kw: "propranolol betabloqueador nao seletivo hipertensao angina",
      apres: "comprimido 10 mg e 40 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "80 a 320 mg/dia, em 2 a 3 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "640 mg/dia", p: 52 }
      ],
      porque: "Betabloqueador não seletivo. Na HAS, só com indicação específica. Este é o cartão de HAS; o uso em acatisia está no cartão propranolol-para-acatisia.",
      escolher: "Angina, pós-IAM, controle de FC. Pode ser usado na lactação.",
      evitar: "Asma ou broncoespasmo; DPOC; quem tende à hipoglicemia (jejum prolongado, reserva contrarreguladora restrita). Não suspender de uma vez.",
      contraind: "Hipotensão; bradicardia; distúrbio grave da circulação arterial periférica; doença do nó sinusal; feocromocitoma não tratado (sem alfabloqueador); IC descompensada; angina de Prinzmetal; choque cardiogênico; acidose metabólica; predisposição à hipoglicemia; BAV de 2º ou 3º grau; história de asma ou broncoespasmo (PCDT, p. 54).",
      adversos: "Os da classe: broncoespasmo, bradicardia, distúrbio de condução AV, vasoconstrição periférica, insônia, pesadelos, depressão, astenia, disfunção sexual, intolerância à glicose (p. 43).",
      monitor: "Frequência cardíaca e PA. Retirada gradual em 2 a 4 semanas (p. 55).",
      diverge: "Dose máxima: o PCDT de HAS (2025, Quadro 18, p. 52) traz 640 mg/dia; o CAB nº 37 (2013, Tabela 4) trazia 240 mg/dia.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Carvedilol",
      id: "carvedilol",
      kw: "carvedilol betabloqueador vasodilatador insuficiencia cardiaca",
      apres: "comprimido 3,125 mg, 6,25 mg, 12,5 mg e 25 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "12,5 a 50 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "50 mg/dia", p: 52 },
        { rot: "Gestante (Quadro 16)", val: "12,5 a 50 mg/dia, em 1 a 2 tomadas; iniciar com 12,5 mg/dia por 2 dias e então aumentar", p: 49 }
      ],
      porque: "Betabloqueador com ação vasodilatadora, de terceira geração: ao contrário dos outros, não contribui para a intolerância à glicose.",
      escolher: "Indicação de betabloqueador em quem tem diabetes ou síndrome metabólica; HAS com IC; gestante com indicação de betabloqueador.",
      evitar: "Asma ou DPOC com broncoespasmo; IC descompensada que exige inotrópico; insuficiência hepática manifesta. Não suspender de uma vez.",
      contraind: "IC descompensada ou instável que exige inotrópico intravenoso; insuficiência hepática clinicamente manifesta; asma ou DPOC com broncoespasmo; BAV de 2º ou 3º grau sem marca-passo; bradicardia grave (abaixo de 50 bpm); doença do nó sinusal; choque cardiogênico; hipotensão grave (PAS abaixo de 85 mmHg); insuficiência de sacarose-isomaltase (PCDT, p. 53).",
      adversos: "Os da classe, exceto a intolerância à glicose (p. 43).",
      monitor: "Frequência cardíaca e PA. Retirada gradual em 2 a 4 semanas (p. 55).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Metoprolol (succinato ou tartarato)",
      id: "metoprolol",
      kw: "metoprolol succinato tartarato betabloqueador cardiosseletivo gestante lactante",
      apres: "succinato: comprimido de liberação prolongada 25 mg, 50 mg e 100 mg; tartarato: comprimido 100 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "50 a 200 mg/dia, em 1 a 2 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "200 mg/dia", p: 52 },
        { rot: "Gestante (Quadro 16)", val: "100 a 200 mg/dia, em 1 a 2 tomadas", p: 49 }
      ],
      porque: "Betabloqueador cardiosseletivo; o succinato é de liberação prolongada. Ao contrário do atenolol, entra no quadro da gestante e pode ser usado na lactação.",
      escolher: "Indicação de betabloqueador em mulher em idade fértil, gestante ou lactante; angina, pós-IAM, controle de FC; HAS com IC.",
      evitar: "Asma grave, BAV de 2º e 3º grau, IC descompensada, bradicardia. Suspeita de IAM com FC abaixo de 45, PR acima de 0,24 s ou PAS abaixo de 100. Não suspender de uma vez.",
      contraind: "Hipersensibilidade a outros betabloqueadores; BAV de grau II ou III; IC não compensada ou instável; terapia inotrópica com agonista beta; bradicardia sinusal relevante; doença do nó sinusal sem marca-passo; choque cardiogênico; arteriopatia periférica grave; feocromocitoma não tratado; hipotensão; asma grave ou broncoespasmo grave (PCDT, p. 53 e 54).",
      adversos: "Os da classe (p. 43).",
      monitor: "Frequência cardíaca e PA. Retirada gradual em 2 a 4 semanas (p. 55).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Anti-hipertensivos — outras classes",
  kw: "metildopa hidralazina doxazosina hipertensao resistente gestante alfabloqueador vasodilatador",
  quando: "Menos usuais na HAS; o espaço delas é a HAS resistente e a gestação.",
  nota: "Doses adulto do Quadro 18 do PCDT de HAS (p. 52); linhas da gestante do Quadro 16 (p. 49).",
  farmacos: [
    {
      nome: "Metildopa",
      id: "metildopa",
      kw: "metildopa simpatolitico de acao central gestante hipertensao",
      apres: "comprimido 250 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "500 a 2.000 mg/dia, em 2 a 3 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "3 g/dia", p: 52 },
        { rot: "Gestante (Quadro 16)", val: "750 a 2.000 mg/dia, em 2 a 4 tomadas", p: 49 }
      ],
      porque: "Agonista alfa de ação central (simpatolítico). Na gestação é opção do SUS, embora betabloqueador e BCC tenham sido mais eficazes para prevenir HAS grave.",
      escolher: "Gestante hipertensa, com o acompanhamento de alto risco. Opção na HAS resistente.",
      evitar: "Hepatopatia ativa. Uso de inibidor da MAO.",
      contraind: "Hepatopatias ativas, como hepatite aguda e cirrose ativa; tratamento com inibidores da MAO (PCDT, p. 55).",
      adversos: "Febre, anemia hemolítica, galactorreia, disfunção hepática (p. 43).",
      monitor: "Sinais de hepatite e de anemia hemolítica.",
      diverge: "Dose máxima: o PCDT de HAS (2025, Quadro 18, p. 52) traz 3 g/dia; o CAB nº 37 (2013, Tabela 4) trazia 1.500 mg/dia.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Hidralazina (cloridrato)",
      id: "hidralazina",
      kw: "hidralazina vasodilatador direto gestante hipertensao resistente",
      apres: "comprimido 25 mg e 50 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "50 a 200 mg/dia, em 2 a 3 tomadas", p: 52 },
        { rot: "Máxima adulto", val: "200 mg/dia", p: 52 },
        { rot: "Gestante, via oral (Quadro 16)", val: "50 a 150 mg/dia, em 2 a 3 tomadas", p: 49 }
      ],
      porque: "Vasodilatador direto, arteriolar.",
      escolher: "Gestante hipertensa (via oral); HAS resistente.",
      evitar: "IC aguda com edema de pulmão (aumenta o trabalho cardíaco); taquicardia grave; lúpus.",
      contraind: "Lúpus eritematoso sistêmico idiopático e doenças correlatas; taquicardia grave; IC de alto débito (ex.: tireotoxicose); insuficiência miocárdica por obstrução mecânica (estenose aórtica ou mitral, pericardite constritiva); IC direita isolada por hipertensão pulmonar; aneurisma dissecante da aorta (PCDT, p. 54).",
      adversos: "Cefaleia, flushing, taquicardia reflexa, reação lupus-like (p. 43).",
      monitor: "Frequência cardíaca; sintomas de lúpus.",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    },
    {
      nome: "Doxazosina (mesilato)",
      id: "doxazosina",
      kw: "doxazosina alfabloqueador hipertensao resistente",
      apres: "comprimido 2 mg e 4 mg",
      dose: [
        { rot: "Faixa habitual diária, adulto (começar pela menor)", val: "1 a 16 mg/dia, em 1 tomada", p: 52 },
        { rot: "Máxima adulto", val: "16 mg/dia", p: 52 }
      ],
      porque: "Alfabloqueador. Pouco usual na HAS; é uma das opções da HAS resistente.",
      escolher: "HAS resistente quando a espironolactona não é possível.",
      evitar: "História de hipotensão ortostática; incontinência urinária.",
      contraind: "Hipersensibilidade a quinazolinas (prazosina, terazosina); história de hipotensão ortostática; hiperplasia prostática com congestão do trato urinário superior, infecção urinária crônica ou cálculo vesical; obstrução gastrointestinal ou esofágica; em monoterapia, bexiga com transbordamento ou anúria (PCDT, p. 54).",
      adversos: "Hipotensão postural, incontinência urinária, aumento da incidência de IC (p. 43).",
      monitor: "PA sentado e em pé (hipotensão postural).",
      fonte: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antidiabéticos orais",
  kw: "antidiabetico oral hipoglicemiante metformina glibenclamida gliclazida dapagliflozina sulfonilureia isglt2 dm2 diabetes",
  quando: "DM2: metformina primeiro, inclusive no idoso; a segunda linha (sulfonilureia, dapagliflozina ou insulina) soma-se a ela. GLP-1, iDPP-4, acarbose, glitazonas e glinidas não estão incorporados ao SUS.",
  nota: "Doses do PCDT de DM2 (2026): texto das p. 23 a 25 e Quadro 15 (p. 39). A função renal (TFG) muda a dose e a escolha.",
  farmacos: [
    {
      nome: "Metformina (cloridrato)",
      id: "metformina",
      kw: "metformina biguanida dm2 diabetes primeira linha",
      apres: "comprimido 500 mg e 850 mg; comprimido de liberação prolongada 500 mg (Farmácia Popular)",
      dose: [
        { rot: "Início", val: "500 mg ou 850 mg, uma vez ao dia, durante ou após o café da manhã ou o jantar", p: 23 },
        { rot: "Dose usual (após 5 a 7 dias)", val: "500 ou 850 mg, duas vezes ao dia", p: 23 },
        { rot: "Máxima", val: "850 mg no café, no almoço e no jantar: 2.550 mg/dia", p: 23 },
        { rot: "TFG 30 a 45", val: "no máximo 1 g/dia", p: 23 },
        { rot: "TFG abaixo de 30", val: "suspender", p: 23 }
      ],
      porque: "Biguanida: reduz a produção hepática de glicose e aumenta a captação muscular. Reduz a HbA1c em 1,5 a 2%, com baixo risco de hipoglicemia, sem ganho de peso e com baixo custo.",
      escolher: "Primeira escolha em todo DM2, inclusive no idoso; continua quando entra a insulina. Intolerância gastrointestinal: reduzir e tentar subir de novo em 3 a 6 meses, ou trocar pela de liberação prolongada.",
      evitar: "TFG abaixo de 30; insuficiência hepática descompensada; sepse; hipotensão; IC; alcoolismo. Suspender na internação e para exame com contraste. Idoso com emagrecimento progressivo e risco nutricional: considerar desprescrever.",
      contraind: "Gravidez e amamentação; TFG abaixo de 30 mL/min/1,73 m²; insuficiência hepática descompensada; insuficiência cardíaca ou pulmonar; acidose grave; infecção grave; pré e pós-operatório; exame de imagem com contraste (PCDT, p. 39).",
      adversos: "Diarreia, náusea, vômito, dor e distensão abdominal, dispepsia, alteração do paladar, flatulência; deficiência de vitamina B12; acidose láctica, rara (p. 23).",
      monitor: "TFG (define dose e suspensão). No idoso, peso e queixas gastrointestinais. Na neuropatia, lembrar a deficiência de B12, que é efeito da metformina e diagnóstico diferencial (p. 23 e 34).",
      fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026"
    },
    {
      nome: "Glibenclamida",
      id: "glibenclamida",
      kw: "glibenclamida sulfonilureia dm2 diabetes",
      apres: "comprimido 5 mg",
      dose: [
        { rot: "Dose usual", val: "5 mg/dia, em 1 a 2 tomadas", p: 24 },
        { rot: "Máxima", val: "20 mg/dia", p: 24 }
      ],
      porque: "Sulfonilureia: secretagogo de insulina. Reduz a HbA1c em 1,5 a 2%, é barata e tem segurança cardiovascular, mas é a de maior risco de hipoglicemia da classe.",
      escolher: "Segunda linha somada à metformina, em quem tem menos de 60 anos e não tem hipoglicemia recorrente. Com insulina, só enquanto a insulina for apenas basal.",
      evitar: "60 anos ou mais (não recomendada). Hipoglicemia recorrente: preferir gliclazida de liberação prolongada. TFG abaixo de 30. Gestação e lactação.",
      contraind: "Gravidez; lactação; TFG abaixo de 30 mL/min/1,73 m²; infecção grave; insuficiência hepática; não recomendada a partir dos 60 anos (PCDT, p. 40). Deficiência grave de insulina (p. 24).",
      adversos: "Hipoglicemia, maior que a das outras sulfonilureias; ganho de peso (p. 24).",
      monitor: "Perguntar por hipoglicemia em toda consulta; TFG.",
      fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026"
    },
    {
      nome: "Gliclazida",
      id: "gliclazida",
      kw: "gliclazida sulfonilureia liberacao prolongada mr idoso dm2 diabetes",
      apres: "comprimido de liberação prolongada (MR) 30 mg e 60 mg; comprimido 80 mg (posologia do de 80 mg não descrita no PCDT)",
      dose: [
        { rot: "Dose usual (liberação prolongada)", val: "30 ou 60 mg, uma vez ao dia", p: 24 },
        { rot: "Máxima (liberação prolongada)", val: "120 mg/dia", p: 24 },
        { rot: "TFG 25 a 29 (p. 24 e 33)", val: "só a de liberação prolongada, com muita cautela e em dose reduzida", p: 33 },
        { rot: "TFG abaixo de 25 (Quadro 17, p. 44)", val: "suspender e manter só insulina até o endocrinologista e o nefrologista", p: 44 },
        { rot: "TFG abaixo de 20 (Quadro 11, p. 33)", val: "evitar sulfonilureia", p: 33 }
      ],
      porque: "Sulfonilureia com eficácia similar à da glibenclamida e menor taxa de hipoglicemia.",
      escolher: "Quem tem hipoglicemia recorrente ou risco aumentado dela. Se o idoso precisar de sulfonilureia, é esta — mas o PCDT diz que a classe deve ser evitada no idoso. Doença renal leve a moderada, sob monitoramento.",
      evitar: "Gestação, lactação, insuficiência hepática, infecção grave. Idoso: o PCDT (p. 24) diz que as sulfonilureias devem ser evitadas (hipoglicemia e mortalidade) e, se usar uma, prefere a gliclazida. O parágrafo do PCDT é contraditório sobre ação curta e prolongada: decidir com a preceptora.",
      contraind: "Gravidez; lactação; TFG abaixo de 30 mL/min/1,73 m² (a MR pode ser considerada com muita cautela); infecção grave; insuficiência hepática (PCDT, p. 24 e 40).",
      adversos: "Hipoglicemia; ganho de peso (p. 24).",
      monitor: "Perguntar por hipoglicemia em toda consulta; TFG.",
      fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026"
    },
    {
      nome: "Dapagliflozina",
      id: "dapagliflozina",
      kw: "dapagliflozina isglt2 sglt2 gliflozina dm2 diabetes cardiovascular",
      apres: "comprimido 10 mg",
      dose: [
        { rot: "Dose usual", val: "10 mg, uma vez ao dia", p: 25 },
        { rot: "TFG abaixo de 25 (p. 25, 40 e 44)", val: "não iniciar; se já usa e a TFG fica persistentemente abaixo de 25, suspender e encaminhar ao endocrinologista e ao nefrologista", p: 40 }
      ],
      porque: "iSGLT2: inibe a reabsorção de glicose e sódio no túbulo proximal (glicosúria e natriurese). Reduz eventos e morte cardiovascular e hospitalização por IC, preserva a função renal, raramente dá hipoglicemia e baixa um pouco o peso e a PA.",
      escolher: "Segunda intensificação em quem tem 40 anos ou mais e doença cardiovascular estabelecida (IAM, revascularização, angioplastia, angina, AVC ou AIT, IC com fração de ejeção abaixo de 40%), ou homem a partir de 55 e mulher a partir de 60 anos com HAS, dislipidemia ou tabagismo.",
      evitar: "TFG abaixo de 25; eficácia menor abaixo de 45. Idoso, sobretudo mulher no primeiro mês: mais cetoacidose euglicêmica e infecção urogenital.",
      contraind: "Gravidez e lactação; TFG estimada persistentemente abaixo de 25 mL/min/1,73 m² (PCDT, p. 40).",
      adversos: "Infecção do trato geniturinário; cetoacidose euglicêmica; fasciíte necrotizante perineal; depleção de volume (p. 25).",
      monitor: "TFG; infecção genital e urinária; cetoacidose com glicemia normal ou pouco elevada (glicemia normal não descarta).",
      fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Insulinas",
  kw: "insulina nph regular glargina basal bolus insulinizacao dm2 diabetes",
  quando: "DM2: insulina quando os orais falham, HbA1c acima de 9% ou jejum a partir de 300, sintomas de hiperglicemia aguda ou intercorrência. Começa pela basal (NPH) ao deitar, somada ao oral; a metformina fica.",
  nota: "Doses do PCDT de DM2 (2026): texto das p. 25 a 29 e Quadro 15 (p. 39). U = unidade. Introduzir insulina bolus e esquema complexo é critério de encaminhar ao endocrinologista (p. 44).",
  farmacos: [
    {
      nome: "Insulina humana NPH",
      id: "insulina-nph",
      kw: "insulina nph basal intermediaria dm2",
      apres: "suspensão injetável 100 U/mL (frasco e caneta)",
      dose: [
        { rot: "Início (basal, somada ao oral)", val: "10 U ou 0,1 a 0,2 U/kg, à noite ao deitar (perto das 22 h, ou 8 h antes do desjejum)", p: 26 },
        { rot: "Titulação", val: "aumentar 2 U a cada 3 dias até a glicemia de jejum ficar entre 80 e 130 (idoso comprometido ou muito comprometido: até 180)", p: 26 },
        { rot: "Jejum abaixo de 70 ou hipoglicemia noturna", val: "reduzir 2 a 4 U", p: 26 },
        { rot: "Segunda dose (jejum na meta, HbA1c fora)", val: "pegar 80% da dose da noite e dividir: 2/3 antes do café e 1/3 ao deitar; titular a da manhã 1 a 3 U a cada 3 dias pela glicemia antes do jantar (80 a 130)", p: 26 },
        { rot: "Teto da basal (paciente plenamente insulinizado)", val: "abaixo de 0,5 U/kg/dia; até 0,75 U/kg/dia só em obesidade com resistência importante", p: 26 },
        { rot: "Manutenção (Quadro 15, nota b)", val: "0,3 a 0,5 U/kg", p: 39 },
        { rot: "Dose total diária (basal + bolus)", val: "0,5 a 1,0 U/kg/dia; até 1,5 U/kg/dia no obeso com resistência à insulina", p: 26 }
      ],
      porque: "Insulina basal de ação intermediária: mantém a glicemia entre as refeições e no sono. É por onde a insulina começa no DM2 ambulatorial.",
      escolher: "Falha dos orais; HbA1c acima de 9% ou jejum a partir de 300; poliúria, polidipsia e perda de peso; intercorrência ou internação pelo DM2.",
      evitar: "Subir sem olhar sinais de dose basal excessiva: queda da glicemia entre deitar e acordar maior que 50, pós-prandial acima de 180, HbA1c alta com jejum na meta, hipoglicemia, grande variabilidade.",
      contraind: "Sem contraindicação absoluta. Observar hipoglicemia; alergia é rara, em geral cutânea (PCDT, p. 40).",
      adversos: "Hipoglicemia, mais frequente ao iniciar e ao intensificar (p. 25); reação alérgica cutânea rara (p. 40).",
      monitor: "Glicemia capilar em jejum para titular (e antes do jantar, se duas doses). Automonitoramento é indicado para quem usa insulina (p. 42). Ensinar a reconhecer e tratar hipoglicemia.",
      diverge: "Alvo de jejum no idoso: o texto da titulação (p. 26) dá até 180 para o idoso comprometido ou muito comprometido; o Quadro 6 do mesmo PCDT (p. 14) dá 90 a 150 ao comprometido e 100 a 180 ao muito comprometido.",
      fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026"
    },
    {
      nome: "Insulina humana regular",
      id: "insulina-regular",
      kw: "insulina regular rapida bolus prandial correcao dm2",
      apres: "solução injetável 100 U/mL (frasco e caneta)",
      dose: [
        { rot: "Início (bolus)", val: "3 a 4 U antes da refeição com a maior glicemia pós-prandial do dia", p: 28 },
        { rot: "Titulação", val: "aumentar 1 U, duas vezes por semana, até a glicemia 2 h após a refeição ficar entre 90 e 180", p: 28 },
        { rot: "Horário", val: "30 minutos antes da refeição", p: 29 },
        { rot: "Correção (fator de correção 50)", val: "1 U para cada 50 acima do limite superior do alvo pré-refeição, somada à dose prandial", p: 28 },
        { rot: "Correção sem cálculo (Quadro 8)", val: "abaixo de 50: menos 2 U · abaixo de 70: menos 1 U · 70 a 130: 0 · 131 a 180: mais 1 U · 181 a 230: mais 2 U · 231 a 280: mais 3 U · 281 a 330: mais 4 U · acima de 330: mais 5 U", p: 28 }
      ],
      porque: "Insulina de ação rápida (bolus): cobre a glicemia depois das refeições e corrige hiperglicemia.",
      escolher: "HbA1c fora da meta com jejum na meta, já em duas doses de NPH; hiperglicemia pós-prandial acima de 180 com pré-prandial adequada.",
      evitar: "Manter sulfonilureia junto com bolus (sem benefício). Esquecer de reduzir a NPH da noite quando a glicemia pós-jantar se ajusta.",
      contraind: "Sem contraindicação absoluta. Observar hipoglicemia (PCDT, p. 40).",
      adversos: "Hipoglicemia (p. 25 e 40).",
      monitor: "Ao introduzir: 6 glicemias por dia (antes e 2 h depois de café, almoço e jantar) para achar a refeição do bolus (p. 27 e 28).",
      diverge: "Alvo da titulação: o texto (p. 28) fala em glicemia 2 h após a refeição entre 90 e 180; a nota d do Quadro 15 (p. 39) fala em glicemia pré-prandial entre 90 e 180.",
      fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026"
    },
    {
      nome: "Insulina glargina (análogo de ação prolongada)",
      id: "insulina-glargina",
      kw: "insulina glargina analogo de acao prolongada basal hipoglicemia noturna idoso dm2",
      apres: "solução injetável 100 U/mL e 300 U/mL",
      dose: [
        { rot: "Início", val: "0,1 a 0,2 U/kg/dia, uma vez ao dia; titular como a NPH, 2 U a cada 3 dias pela glicemia de jejum", p: 39 },
        { rot: "Manutenção (Quadro 15, nota b)", val: "0,3 a 0,5 U/kg", p: 39 },
        { rot: "Máxima", val: "0,5 U/kg; até 0,75 U/kg/dia em obesidade com resistência importante", p: 39 },
        { rot: "Troca a partir da NPH", val: "NPH uma vez ao dia: mesma dose (1 U : 1 U); NPH 2 ou mais vezes ao dia: somar, reduzir 20% e dar uma vez ao dia", p: 27 },
        { rot: "Horário", val: "100 U/mL: sempre no mesmo horário; 300 U/mL: tolera 3 h para mais ou para menos", p: 38 }
      ],
      porque: "Basal de ação prolongada com menos hipoglicemia, inclusive noturna, que a NPH. Em geral uma dose ao dia basta.",
      escolher: "Hipoglicemia noturna ou grave com NPH, idoso, IMC abaixo de 30, grande variabilidade glicêmica, função renal ou hepática reduzida, gestante com DM2, dificuldade com várias doses diárias. A degludeca fica para quem segue com hipoglicemia na glargina.",
      evitar: "Prescrever contando que a farmácia da USF dispensa: a incorporação para DM2 é de 2025 e a dispensação sai por Nota Técnica, de forma gradual.",
      contraind: "Sem contraindicação absoluta. Observar hipoglicemia (PCDT, p. 40).",
      adversos: "Hipoglicemia, com risco de perda de consciência nos casos graves (p. 27).",
      monitor: "Glicemia de jejum para titular a cada 3 dias; madrugada e ao acordar para detectar hipoglicemia noturna (p. 27 e 38).",
      fonte: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Emergência hipertensiva da gestação — anticonvulsivante",
  kw: "sulfato de magnesio mgso4 eclampsia pre-eclampsia iminencia gestante convulsao crise hipertensiva",
  quando: "Gestante com PAS ≥160 ou PAD ≥110, mesmo sem sintoma, pré-eclâmpsia com sinais de gravidade, iminência de eclâmpsia ou eclâmpsia: o sulfato vem ANTES do anti-hipertensivo de ação rápida e da transferência.",
  nota: "Doses do Manual de Gestação de Alto Risco (MS, 2022), Quadros 6, 7 e 8 (p. 160 a 162; a página impressa é a do PDF). O esquema intramuscular é o que o Manual recomenda para transporte e para onde não há bomba de infusão.",
  farmacos: [
    {
      nome: "Sulfato de magnésio",
      id: "sulfato-de-magnesio",
      kw: "sulfato de magnesio mgso4 eclampsia pre-eclampsia profilaxia de convulsao",
      apres: "solução injetável a 50% (ampola de 10 mL com 5 g) e a 10%",
      dose: [
        { rot: "Gestante com eclâmpsia que será transferida (nota do Quadro 6, p. 160)", val: "dose de ataque: 4 g IV + 10 g IM (5 g em cada nádega); cobre por cerca de 4 horas" },
        { rot: "Ataque IV (Quadro 7, p. 161)", val: "4 g = 8 mL da solução a 50% + 12 mL de água destilada, IV em 5 a 10 minutos" },
        { rot: "Ataque IM junto com o IV, para transporte ou sem bomba de infusão (Quadro 7, p. 161)", val: "10 mL da solução a 50% (5 g) IM no quadrante superior externo de cada glúteo — total 20 mL, 10 g" },
        { rot: "Manutenção IM (Quadro 7, p. 161)", val: "5 g (10 mL da solução a 50%) IM de 4 em 4 horas" },
        { rot: "Creatinina acima de 1,3 (Quadro 8, p. 162)", val: "metade da dose; dosar o magnésio sérico (terapêutico de 4 a 7 mEq/L)" },
        { rot: "Nova convulsão (Quadro 8, p. 162)", val: "mais 2 g IV" },
        { rot: "Antídoto — depressão respiratória (Quadro 8, p. 162)", val: "gluconato de cálcio a 10%, 10 mL (1 g) IV lento, em 3 minutos" }
      ],
      porque: "Anticonvulsivante de escolha quando há risco de convulsão: pré-eclâmpsia com sinais de deterioração, iminência de eclâmpsia, eclâmpsia, síndrome HELLP e hipertensão de difícil controle.",
      escolher: "PAS ≥160 ou PAD ≥110 na gestante, mesmo sem sintoma, indica a profilaxia de convulsão (PCDT de HAS p. 50; Manual p. 148, que remete a prescrição ao esquema da eclâmpsia). Na crise hipertensiva com suspeita de pré-eclâmpsia, o sulfato vem ANTES do anti-hipertensivo de ação rápida e é feito no local do atendimento (Manual p. 445). O PCDT (p. 46) admite indicá-lo mesmo na assintomática que vai ser removida para o centro de referência.",
      evitar: "Miastenia grave (contraindicado). Via intramuscular na síndrome HELLP com plaquetopenia. Insuficiência renal: metade da dose, com nível sérico.",
      contraind: "Miastenia grave (Manual, p. 162). Via IM: não usar na síndrome HELLP com plaquetopenia (Quadro 7, p. 161).",
      adversos: "Intoxicação rara, por acúmulo (manutenção excessiva ou insuficiência renal): bloqueio mioneural, depressão e parada respiratória; os sinais surgem acima de 7 mEq/L (p. 160). Via IM: abscesso e hematoma (0,5%).",
      monitor: "A cada 4 horas: diurese acima de 25 mL/h, reflexos tendinosos presentes, frequência respiratória acima de 12. Depressão respiratória, diurese insuficiente ou reflexo ausente: suspender (Quadro 8, p. 162).",
      fonte: "MS — Manual de Gestação de Alto Risco, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Contraceptivos hormonais",
  kw: "anticoncepcional contraceptivo contracepcao pilula injetavel emergencia planejamento reprodutivo",
  quando: "Planejamento reprodutivo: escolha informada da mulher, filtrada pelo critério de elegibilidade da OMS (categorias 1 a 4).",
  nota: "Os critérios de elegibilidade são da OMS, referência internacional: o Protocolo da Atenção Básica de 2016 usa a edição de 2010; os cartões seguem a 6ª edição, de 2025, e dizem onde as duas divergem. " +
        "Além do injetável mensal deste formulário, a RENAME 2024 lista outros dois mensais combinados: medroxiprogesterona + cipionato de estradiol e algestona acetofenida + enantato de estradiol (Conitec nº 724, Portaria SCTIE/MS nº 40/2022). " +
        "DIU de cobre, diafragma e preservativos não são fármacos: estão na queixa Planejamento reprodutivo.",
  farmacos: [
    {
      nome: "Etinilestradiol + levonorgestrel (AOC)",
      id: "etinilestradiol-levonorgestrel",
      kw: "aoc pilula anticoncepcional oral combinado monofasico microvlar ciclo 21",
      apres: "comprimido etinilestradiol 0,03 mg + levonorgestrel 0,15 mg (combinado monofásico)",
      dose: [
        { rot: "Contracepção — como tomar", val: "1 comprimido por dia, de preferência no mesmo horário; monofásico: intervalo de 7 dias entre as cartelas; iniciar de preferência entre o 1º e o 5º dia do ciclo", p: 158 },
        { rot: "Contracepção — esqueceu 1 ou 2 pílulas, ou atrasou a cartela 1 ou 2 dias", val: "tomar 1 pílula na hora e a seguinte no horário habitual; risco de gravidez muito baixo", p: 158 },
        { rot: "Contracepção — esqueceu 3 ou mais pílulas", val: "tomar 1 pílula na hora e usar método de apoio por 7 dias; se houve relação nos últimos 5 dias, avaliar contracepção de emergência", p: 158 },
        { rot: "Contracepção — vômito ou diarreia", val: "vômito nas primeiras 2 horas: tomar outra pílula; vômito ou diarreia por mais de 2 dias: conduta de esquecimento de 3 ou mais pílulas", p: 158 },
        { rot: "Sangramento uterino agudo intenso (AOC com 30 a 50 mcg de etinilestradiol)", val: "1 comprimido de 6/6 horas até cessar o sangramento; depois, 1 por dia", p: 24 },
        { rot: "Sangramento uterino aumentado crônico, padrão ovulatório", val: "1 comprimido por dia, por 21 dias", p: 25 }
      ],
      porque: "Combinado monofásico da RENAME: o mesmo comprimido todo dia. Também regulariza o ciclo e trata sangramento uterino aumentado. " +
              "A eficácia depende da usuária: no uso típico falham 8 de cada 100 mulheres no primeiro ano, contra 0,3 no uso perfeito.",
      escolher: "Mulher sem contraindicação a estrogênio que consegue tomar todo dia. Pode ser entregue em qualquer consulta para começar depois. " +
                "Fora do 1º ao 5º dia do ciclo, começar com certeza razoável de não gravidez e apoio por 7 dias. Após aborto, imediatamente. " +
                "Não amamentando: só após 6 semanas do parto (Caderneta 2026). Pela OMS 2025: categoria 3 antes de 21 dias (4 com outro fator de risco para TEV); de 21 a 42 dias, 2, ou 3 com outro fator de risco para TEV (imobilidade, transfusão, IMC acima de 30, hemorragia pós-parto, cesárea, pré-eclâmpsia, tabagismo). " +
                "Amamentando, só após 6 meses. No climatério, serve se ela for elegível — a partir dos 40 anos é categoria 2.",
      evitar: "Categoria 4 (OMS 2025): enxaqueca com aura; TVP/TEP atual ou prévia; mutação trombogênica; PA de 160/100 ou mais; doença vascular; isquemia cardíaca; AVC; " +
              "amamentação antes de 6 semanas; fumante de 35 anos ou mais com 15 ou mais cigarros por dia. Categoria 3: HAS controlada ou PA 140–159/90–99; " +
              "fumante de 35 anos ou mais com menos de 15 cigarros por dia; amamentação de 6 semanas a 6 meses; anticonvulsivante indutor; lamotrigina; rifampicina.",
      contraind: "Categoria 4 da OMS (2025), além das listadas em evitar: câncer de mama atual; cirurgia maior com imobilização prolongada; cirrose descompensada; " +
                 "adenoma hepatocelular e hepatoma; lúpus com antifosfolípide positivo ou desconhecido; valvopatia complicada. Diabetes com lesão vascular ou de mais de 20 anos: 3 ou 4.",
      adversos: "Alteração do padrão menstrual (escape, mais nos 3 primeiros meses), náusea, tontura, alteração de peso, de humor ou do desejo sexual, acne (em geral melhora), cefaleia, sensibilidade mamária.",
      monitor: "PA antes de iniciar e nos retornos. A cada renovação: enxaqueca nova (com aura, suspender), tabagismo e idade, TEV, medicação nova (indutor enzimático, lamotrigina, rifampicina). Escape: checar adesão antes de trocar.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Noretisterona (minipílula)",
      id: "noretisterona",
      kw: "minipilula pilula de progestageno amamentacao norestin progestageno isolado",
      apres: "comprimido 0,35 mg (minipílula); cartela tomada sem pausa",
      dose: [
        { rot: "Contracepção — minipílula", val: "1 comprimido por dia, no mesmo horário, sem intervalo entre as cartelas", p: 158 }
      ],
      porque: "Progestágeno isolado em dose baixa, sem estrogênio: a saída quando o estrogênio está contraindicado. Boa eficácia associada à amamentação; fora dela, é pouco eficaz.",
      escolher: "Amamentando: a OMS 2025 dá categoria 2 antes de 6 semanas e 1 depois; a Caderneta da Gestante 2026 orienta começar de 4 a 6 semanas após o parto, antes se o retorno for difícil. " +
                "Após 6 semanas amamentando, começar a qualquer momento com certeza razoável de não gravidez e apoio por 7 dias. " +
                "Também para contraindicação a estrogênio: enxaqueca com aura, TEV prévia, HAS, fumante de 35 anos ou mais.",
      evitar: "Anticonvulsivante indutor (fenitoína, carbamazepina, barbitúrico, primidona, topiramato, oxcarbazepina) e rifampicina: categoria 3 pela perda de eficácia — preferir injetável trimestral ou DIU. " +
              "Quem não consegue tomar no mesmo horário.",
      contraind: "Câncer de mama atual (categoria 4 da OMS 2025). Categoria 3: TVP/TEP aguda; câncer de mama sem doença há 5 anos; cirrose descompensada; adenoma hepatocelular e hepatoma; " +
                 "lúpus com antifosfolípide positivo; isquemia cardíaca, AVC ou enxaqueca com aura surgidos durante o uso.",
      adversos: "Sangramento irregular ou ausente, náusea, tontura, alteração de humor ou do desejo sexual, sensibilidade mamária. Dor aguda em baixo ventre: afastar gravidez ectópica.",
      monitor: "Atraso menstrual fora da amamentação: teste de gravidez. Revisar medicação indutora a cada retorno.",
      diverge: "Amamentação antes de 6 semanas: os Protocolos da Atenção Básica (2016, com a OMS de 2010) dão categoria 3 à minipílula; a OMS 6ª ed. (2025) reclassificou para 2.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Acetato de medroxiprogesterona",
      id: "medroxiprogesterona",
      kw: "injetavel trimestral depo provera contracep dmpa progestageno provera sangramento uterino terapia hormonal",
      apres: "suspensão injetável 150 mg/mL (trimestral, de depósito); comprimido 10 mg — a dose da terapia hormonal é um quarto do comprimido da RENAME",
      dose: [
        { rot: "Contracepção — injetável trimestral (dose)", val: "150 mg por injeção", p: 164 },
        { rot: "Contracepção — intervalo", val: "a cada três meses (13 semanas); pode ser adiantada ou atrasada em até duas semanas", p: 159 },
        { rot: "Contracepção — atraso de mais de duas semanas", val: "reaplicar só com certeza razoável de não gravidez (teste rápido se preciso), ou se amamenta de forma exclusiva ou quase e o parto foi há menos de seis meses; método de apoio nos primeiros 7 dias; relação desprotegida nos últimos cinco dias: oferecer levonorgestrel de emergência", p: 159 },
        { rot: "Sangramento uterino aumentado crônico, padrão ovulatório — via oral", val: "10 mg/dia do 5º ao 26º dia do ciclo", p: 25 },
        { rot: "Sangramento uterino aumentado crônico — injetável de depósito", val: "150 mg a cada três meses", p: 25 },
        { rot: "Terapia hormonal — mulher com útero, associada ao estrogênio", val: "2,5 mg/dia por via oral, cíclico (12 a 14 dias por ciclo) ou contínuo", p: 208 }
      ],
      porque: "Progestágeno isolado de depósito: sem estrogênio, uma injeção por trimestre, e a eficácia não cai com anticonvulsivante indutor nem com rifampicina (categoria 1, OMS 2025). " +
              "Por via oral, protege o endométrio na terapia hormonal da mulher com útero e trata sangramento uterino aumentado.",
      escolher: "Contracepção para quem não pode ou não quer estrogênio, esquece pílula ou usa indutor enzimático. Amamentando: OMS 2025 categoria 2 antes de 6 semanas e 1 depois; " +
                "a Caderneta 2026 orienta de 4 a 6 semanas. A amenorreia com o tempo é esperada. Na terapia hormonal, é o progestágeno da RENAME, mas é o que mais aumenta o risco de câncer de mama na terapia combinada.",
      evitar: "Abaixo de 18 e acima de 45 anos: categoria 2, pela perda de densidade óssea. Quem quer engravidar logo: o retorno da fertilidade é gradual e pode demorar. " +
              "Categoria 3: PA de 160/100 ou mais; doença vascular; vários fatores de risco cardiovascular; diabetes com lesão de órgão; isquemia cardíaca; AVC; TVP/TEP aguda; sangramento vaginal sem explicação antes de investigar; " +
              "lúpus com antifosfolípide positivo ou desconhecido; trombocitopenia grave no lúpus (para iniciar); câncer de mama sem doença há 5 anos; cirrose descompensada; adenoma hepatocelular e hepatoma.",
      contraind: "Câncer de mama atual (categoria 4 da OMS 2025). Para a via oral no sangramento uterino, o Protocolo lista: tromboflebite ou doença tromboembólica e cerebrovascular, " +
                 "insuficiência hepática grave, neoplasia de mama ou de órgão genital suspeita ou confirmada.",
      adversos: "Sangramento no início e escape frequente nos primeiros anos; amenorreia com o tempo; alteração de humor ou do desejo sexual; cefaleia. " +
                "Perda de densidade óssea durante o uso, com recuperação após suspender (OMS 2025).",
      monitor: "Data da próxima injeção anotada com a usuária. Atraso: aplicar a regra do atraso. Na terapia hormonal: PA, peso, padrão de sangramento e mama nos controles.",
      diverge: "Amamentação antes de 6 semanas: os Protocolos da Atenção Básica (2016, com a OMS de 2010) dão categoria 3 ao injetável trimestral; a OMS 6ª ed. (2025) reclassificou para 2.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Enantato de noretisterona + valerato de estradiol (injetável mensal)",
      id: "enantato-de-noretisterona-valerato-de-estradiol",
      kw: "injetavel mensal combinado mesigyna noregyna contraceptivo",
      apres: "solução injetável enantato de noretisterona 50 mg/mL + valerato de estradiol 5 mg/mL",
      dose: [
        { rot: "Contracepção — injetável mensal (dose)", val: "enantato de noretisterona 50 mg + valerato de estradiol 5 mg por injeção", p: 164 },
        { rot: "Contracepção — intervalo", val: "a cada quatro semanas (30 dias); pode ser adiantada ou atrasada em até 7 dias", p: 159 },
        { rot: "Contracepção — atraso de mais de 7 dias", val: "reaplicar só com certeza razoável de não gravidez (teste rápido se preciso) e método de apoio nos primeiros 7 dias", p: 159 }
      ],
      porque: "Combinado injetável: tem estrogênio, mas dispensa a pílula diária.",
      escolher: "Quem esquece pílula e não tem contraindicação a estrogênio. " +
                "Não amamentando: só após 6 semanas do parto (Caderneta 2026). Pela OMS 2025: categoria 3 antes de 21 dias (4 com outro fator de risco para TEV); de 21 a 42 dias, 2, ou 3 com outro fator de risco para TEV (imobilidade, transfusão, IMC acima de 30, hemorragia pós-parto, cesárea, pré-eclâmpsia, tabagismo). " +
                                "Amamentando: o Protocolo 2016 manda atrasar a primeira injeção até 6 semanas do parto ou até o leite deixar de ser o alimento principal; a OMS 2025 dá categoria 3 de 6 semanas a 6 meses.",
      evitar: "Categoria 4 (OMS 2025): enxaqueca com aura; TVP/TEP atual ou prévia; mutação trombogênica; PA de 160/100 ou mais; doença vascular; isquemia cardíaca; AVC; amamentação antes de 6 semanas. " +
              "Categoria 3: HAS controlada ou PA 140–159/90–99; fumante de 35 anos ou mais com 15 ou mais cigarros por dia; lamotrigina. Anticonvulsivante indutor e rifampicina: categoria 2.",
      contraind: "Categoria 4 da OMS (2025): enxaqueca com aura; TVP/TEP atual ou prévia; mutação trombogênica; PA de 160/100 ou mais; doença vascular; isquemia cardíaca; AVC; amamentação antes de 6 semanas; " +
                 "câncer de mama atual; cirurgia maior com imobilização prolongada; lúpus com antifosfolípide positivo ou desconhecido; valvopatia complicada. " +
                 "3 ou 4: vários fatores de risco cardiovascular; diabetes com lesão vascular ou de mais de 20 anos; hepatoma. " +
                 "3: câncer de mama sem doença há 5 anos; cirrose descompensada; adenoma hepatocelular; hepatite viral aguda (para iniciar).",
      adversos: "Alteração menstrual, alteração de peso, cefaleia, sensibilidade mamária.",
      monitor: "Data da próxima injeção anotada com a usuária. PA nos retornos. A cada aplicação: enxaqueca nova, tabagismo e idade, TEV, medicação nova.",
      diverge: "Fumante de 35 anos ou mais: os Protocolos da Atenção Básica (2016) dão ao injetável mensal categoria 3 (até 15 cigarros por dia) e 4 (mais de 15); a OMS 6ª ed. (2025) dá 2 (menos de 15) e 3 (15 ou mais).",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Levonorgestrel (contracepção de emergência)",
      id: "levonorgestrel",
      kw: "pilula do dia seguinte emergencia ahe anticoncepcao de emergencia contracepcao de emergencia postinor",
      apres: "comprimido 0,75 mg e 1,5 mg",
      dose: [
        { rot: "Contracepção de emergência — esquema preferencial", val: "1,5 mg em dose única, via oral", p: 165 },
        { rot: "Contracepção de emergência — comprimido de 0,75 mg, esquema dividido", val: "1 comprimido de 0,75 mg de 12 em 12 horas, total de 2 comprimidos", p: 165 },
        { rot: "Contracepção de emergência — comprimido de 0,75 mg, dose única", val: "2 comprimidos de 0,75 mg juntos, em dose única", f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017", p: 156 },
        { rot: "Prazo", val: "o quanto antes, de preferência nas primeiras 72 horas; limite de cinco dias", p: 165 },
        { rot: "Vômito", val: "vômito até uma hora após a dose: repetir a dose depois de antiemético e de se alimentar", p: 165 },
        { rot: "Mulher desacordada (violência sexual)", val: "pode ser usado por via vaginal", p: 165 }
      ],
      porque: "Impede ou atrasa a ovulação; não age se a mulher já está grávida e não é abortivo (OMS 2025; MS 2017). É direito da usuária, e o enfermeiro pode dispensar sem receita médica.",
      escolher: "Relação sem preservativo, falha do método (ruptura, esquecimento de pílula, atraso de injetável) ou violência sexual. Uso repetido no mesmo ciclo é categoria 1, " +
                "mas é o método menos eficaz para uso rotineiro: oferecer método regular junto. Depois de usar, iniciar ou reiniciar a pílula no mesmo dia, com apoio por 7 dias; o DIU pode ser inserido na hora.",
      evitar: "Não há categoria 3 ou 4 na OMS 2025. Categoria 2: história de doença cardiovascular grave, enxaqueca, doença hepática grave. " +
              "Obesidade (IMC de 30 ou mais) pode reduzir a eficácia, sem risco à segurança; indutor de CYP3A4 (rifampicina, fenitoína, carbamazepina, efavirenz) também pode reduzir.",
      contraind: "Nenhuma absoluta na OMS 2025. Não é indicado na gravidez, mas não há dano conhecido se usado por engano.",
      adversos: "Alteração do ciclo seguinte. Dor aguda em baixo ventre depois do uso: afastar gravidez ectópica (Protocolo 2016).",
      monitor: "Menstruação atrasada: teste de gravidez. Encaminhar ao planejamento reprodutivo e oferecer método regular. Violência sexual: profilaxia pós-exposição e notificação na mesma consulta.",
      diverge: "A Nota Técnica Conjunta nº 7/2026 (violência sexual) escreve o esquema dividido como 75 mg de 12 em 12 horas: é erro de digitação — o comprimido é de 0,75 mg (RENAME 2024; Protocolos da Atenção Básica, 2016).",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Terapia hormonal no climatério",
  kw: "terapia hormonal reposicao hormonal climaterio menopausa estrogenio progestageno fogacho atrofia vaginal",
  quando: "Sintoma vasomotor moderado a intenso ou geniturinário persistente, sem resposta à medida não farmacológica, com decisão compartilhada. Não serve para prevenir doença crônica.",
  nota: "Mulher com útero: estrogênio sistêmico sempre com progestágeno (medroxiprogesterona, no grupo dos contraceptivos, ou progesterona). " +
        "O Protocolo 2016 cita também noretisterona e drospirenona como progestágenos da terapia hormonal: no Brasil elas vêm em associação fixa com estradiol, e a dose isolada do Protocolo não é produto — não entraram como cartão. " +
        "Alternativas não hormonais (paroxetina, fluoxetina, venlafaxina, imipramina, clonidina e outras): a dose para fogacho está no Protocolo 2016, p. 206 (Quadro 4), e não nos cartões dessas drogas — conferir lá antes de prescrever.",
  farmacos: [
    {
      nome: "Estrogênios conjugados",
      id: "estrogenios-conjugados",
      kw: "estrogenio conjugado premarin terapia hormonal reposicao fogacho creme vaginal atrofia",
      apres: "comprimido 0,3 mg e 0,625 mg; creme vaginal 0,625 mg/g",
      dose: [
        { rot: "Terapia hormonal sistêmica (mulher com útero: sempre com progestágeno)", val: "0,3 a 0,625 mg por dia, via oral", p: 208 },
        { rot: "Creme vaginal — atrofia que dificulta a leitura do citopatológico", val: "0,5 g do aplicador (0,3 mg do princípio ativo), por via vaginal; nova citologia entre 5 e 7 dias após parar — frequência e duração não ficam claras na diretriz (o toda noite durante 21 dias pode valer só para o estriol)", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016", p: 41 },
        { rot: "Sangramento uterino agudo intenso", val: "0,625 mg, 4 a 8 cápsulas por dia, em dose única ou fracionada", p: 24 }
      ],
      porque: "O estrogênio oral da RENAME. Estrogênio é terapia eficaz para o fogacho. Por via vaginal trata a atrofia, mas, ao contrário do estriol, tem absorção sistêmica significativa.",
      escolher: "Fogacho moderado a intenso ou atrofia moderada a intensa que não cedeu com medida não farmacológica ou não hormonal e prejudica a vida, por decisão compartilhada. " +
                "Iniciar antes dos 60 anos e até 10 anos da menopausa. Mulher com útero: sempre com progestágeno.",
      evitar: "Iniciar mais de 10 anos após a menopausa ou acima dos 59 anos (risco cardiovascular). Usar para prevenir doença crônica ou envelhecimento. Estrogênio com inibidor de aromatase. " +
              "História de câncer de mama (o creme vaginal tem absorção sistêmica significativa).",
      contraind: "Absolutas: câncer de mama, câncer de endométrio, doença hepática grave, sangramento genital não esclarecido, história de tromboembolismo agudo e recorrente, porfiria. " +
                 "Relativas: HAS não controlada, DM não controlado, endometriose, miomatose. No sangramento uterino agudo, também: doença ou histórico tromboembólico arterial ou venoso, trombofilia conhecida, doença hepática ativa ou crônica.",
      adversos: "Náusea e distúrbio gastrointestinal (via oral), sensibilidade mamária, cefaleia, retenção de líquido, edema; pode estimular mioma e endometriose. " +
                "Risco de tromboembolismo venoso (raro entre 50 e 59 anos) e, associado a progestágeno por 3 a 5 anos, de câncer de mama.",
      monitor: "Controle aos 2 a 3 meses e aos 6 meses: adesão, efeito adverso, sangramento, PA, peso. Depois, anual, com exame da mama e mamografia anual enquanto usar. " +
               "Sangramento anormal: referenciar à ginecologia. Interromper quando o benefício for alcançado ou o risco superar; em geral, no máximo 5 anos.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Estradiol",
      id: "estradiol",
      kw: "estradiol oral adesivo transdermico gel percutaneo terapia hormonal reposicao fogacho",
      apres: "comprimido; adesivo transdérmico; gel percutâneo",
      dose: [
        { rot: "Terapia hormonal — via oral", val: "1 a 2 mg por dia", p: 208 },
        { rot: "Terapia hormonal — adesivo transdérmico", val: "25 a 50 mcg", p: 208 },
        { rot: "Terapia hormonal — gel percutâneo", val: "0,5 a 1,5 mg", p: 208 },
        { rot: "Sangramento uterino agudo intenso", val: "1 mg, 4 a 8 comprimidos por dia, em dose única ou fracionada", p: 24 }
      ],
      porque: "O mesmo estrogênio em três vias: oral, adesivo e gel. A via se escolhe pela preferência da mulher, pela indicação da terapia hormonal e pelas comorbidades.",
      escolher: "Mesma indicação dos estrogênios conjugados: fogacho moderado a intenso ou atrofia moderada a intensa sem resposta a outra medida, com prejuízo da vida e decisão compartilhada. " +
                "Iniciar antes dos 60 anos e até 10 anos da menopausa. Mulher com útero: sempre com progestágeno.",
      evitar: "Iniciar mais de 10 anos após a menopausa ou acima dos 59 anos. Usar para prevenir doença crônica ou envelhecimento. Estrogênio com inibidor de aromatase.",
      contraind: "Absolutas: câncer de mama, câncer de endométrio, doença hepática grave, sangramento genital não esclarecido, história de tromboembolismo agudo e recorrente, porfiria. " +
                 "Relativas: HAS não controlada, DM não controlado, endometriose, miomatose. No sangramento uterino agudo, também: doença ou histórico tromboembólico, trombofilia, doença hepática ativa ou crônica.",
      adversos: "Náusea e distúrbio gastrointestinal (via oral), sensibilidade mamária, cefaleia, retenção de líquido, edema; pode estimular mioma e endometriose. " +
                "Risco de tromboembolismo venoso e, com progestágeno por 3 a 5 anos, de câncer de mama.",
      monitor: "Controle aos 2 a 3 meses e aos 6 meses; depois anual, com exame da mama e mamografia anual enquanto usar. Sangramento anormal: referenciar à ginecologia. Em geral, no máximo 5 anos.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Estriol (creme vaginal)",
      id: "estriol",
      kw: "estriol creme vaginal atrofia ressecamento dispareunia sindrome geniturinaria colpite atrofica preparo citologia",
      apres: "creme vaginal 1 mg/g (0,1%)",
      dose: [
        { rot: "Ressecamento vaginal ou colpite atrófica", val: "creme a 0,1%, de preferência à noite: 21 dias com pausa de sete, ou duas vezes por semana (sempre nos mesmos dias), por um a três meses", p: 181 },
        { rot: "Preparo com atrofia antes do teste de DNA-HPV ou da colposcopia", val: "1 grama com aplicador vaginal, por 14 noites consecutivas; coletar entre cinco e sete dias após suspender", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025", p: 48 }
      ],
      porque: "Estrogênio vaginal de absorção sistêmica desprezível, disponível no SUS (NT 72/2026). Trata a síndrome geniturinária sem os riscos da terapia hormonal sistêmica.",
      escolher: "Ressecamento, dispareunia, prurido ou ardor vulvovaginal, disúria e urgência por atrofia, sem outra indicação de terapia sistêmica. Também melhora a amostra quando a atrofia atrapalha a coleta.",
      evitar: "Usuária de inibidor de aromatase. Na história de câncer de mama não está contraindicado, pela absorção mínima (Protocolo 2016); a diretriz de 2025 pede avaliação individual.",
      contraind: "Uso de inibidor de aromatase. Sangramento genital não esclarecido é contraindicação absoluta à terapia hormonal: investigar antes.",
      adversos: "As fontes não listam efeito adverso próprio do estriol vaginal; a absorção sistêmica é desprezível.",
      monitor: "Reavaliar a queixa ao fim do curso de um a três meses. Coleta citológica entre 5 e 7 dias após suspender o creme (diretrizes do INCA de 2016 e 2025, mais novas e específicas que as 48 horas do texto de 2016 da Atenção Básica). Qualquer sangramento: investigar.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Progesterona micronizada",
      id: "progesterona",
      kw: "progesterona micronizada utrogestan terapia hormonal protecao endometrial progestageno",
      apres: "cápsula",
      dose: [
        { rot: "Terapia hormonal — mulher com útero, associada ao estrogênio", val: "100 a 200 mg/dia por via oral, cíclico (12 a 14 dias por ciclo) ou contínuo", p: 208 }
      ],
      porque: "Protege o endométrio da mulher com útero em uso de estrogênio. Alternativa à medroxiprogesterona, que é o progestágeno com o maior risco de câncer de mama na terapia combinada (Protocolo 2016).",
      escolher: "Mulher com útero em terapia estrogênica. Cíclico se ela aceita sangramento mensal; contínuo se prefere ficar sem sangrar.",
      evitar: "As restrições da terapia hormonal. Na mulher sem útero, a associação com progestágeno não é mandatória.",
      contraind: "As da terapia hormonal: câncer de mama, câncer de endométrio, doença hepática grave, sangramento genital não esclarecido, história de tromboembolismo agudo e recorrente, porfiria.",
      adversos: "Dor nas mamas, cólica abdominal, alteração de humor, fadiga, depressão, irritabilidade, alteração de pele, ganho de peso, ansiedade, dor generalizada — dependem da dose e do tipo de progestágeno.",
      monitor: "Padrão de sangramento em cada controle; se anormal, referenciar à ginecologia.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    },
    {
      nome: "Tibolona",
      id: "tibolona",
      kw: "tibolona livial terapia hormonal climaterio fogacho",
      apres: "comprimido",
      dose: [
        { rot: "Terapia hormonal", val: "1,25 a 2,5 mg/dia", p: 208 }
      ],
      porque: "Esteroide sintético que, no útero, se comporta como terapia combinada contínua; sem estímulo mamário (menos risco de câncer de mama), com proteção óssea e menos fratura, e efeito androgênico. Reduz triglicerídeos e HDL.",
      escolher: "Alternativa à terapia combinada contínua quando se quer evitar sangramento e estímulo mamário.",
      evitar: "As restrições da terapia hormonal. Efeito androgênico e queda do HDL: pesar no perfil da mulher.",
      contraind: "As da terapia hormonal: câncer de mama, câncer de endométrio, doença hepática grave, sangramento genital não esclarecido, história de tromboembolismo agudo e recorrente, porfiria.",
      adversos: "Efeito androgênico; queda do HDL.",
      monitor: "Os controles da terapia hormonal: 2 a 3 meses, 6 meses e anual, com PA, peso, mama, mamografia e padrão de sangramento.",
      fonte: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Analgésicos e opioides",
  kw: "analgesico opioide dor escada analgesica oms dipirona paracetamol codeina morfina dispneia",
  quando: "Dor, pela escada analgésica da OMS: não opioide, depois opioide fraco, depois opioide forte, com ou sem adjuvante em qualquer degrau. Os opioides também aliviam a dispneia.",
  nota: "Morfina e codeína são do Componente Especializado da RENAME 2024 (PCDT Dor Crônica) e saem com Notificação de Receita A ou Receita de Controle Especial: a farmácia da USF não tem. Todo opioide sai com laxante prescrito junto.",
  farmacos: [
    {
      nome: "Dipirona",
      id: "dipirona",
      kw: "metamizol novalgina analgesico antitermico primeiro degrau",
      apres: "comprimido 500 mg; solução oral 500 mg/mL; solução injetável 500 mg/mL",
      dose: [
        { rot: "Adulto — dor", val: "500 a 2000 mg VO ou EV a cada 6 horas", p: 149 },
        { rot: "Adulto — hipodermóclise", val: "1 a 2 g até de 6/6h, diluída em SF 0,9% 20 mL, em bolus lento, em sítio exclusivo", p: 347 },
        { rot: "Reação de Jarisch-Herxheimer após a benzatina (sífilis), se necessário", val: "500 mg, 6/6h, se necessário", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022", p: 78 }
      ],
      porque: "Analgésico não opioide do primeiro degrau da escada da OMS. Não sai quando o opioide entra: soma em qualquer degrau.",
      escolher: "Dor leve, ou como base associada ao opioide na dor moderada e intensa. Está na farmácia básica nas três formas, e vai por hipodermóclise quando não há via oral nem veia.",
      evitar: "Na hipodermóclise, misturar no mesmo sítio de outro medicamento: o Manual pede sítio exclusivo e diluição máxima tolerada.",
      contraind: "Abaixo de 3 meses de idade (o Manual libera a partir dos 3 meses, cap. 31). O Manual de CP 2023 e a NT nº 2/2026 não listam outras contraindicações: conferir na bula.",
      adversos: "Não descritos no Manual de CP 2023 nem na NT nº 2/2026: conferir na bula.",
      monitor: "Dor reavaliada a cada visita, como quinto sinal vital, com a mesma escala.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    },
    {
      nome: "Paracetamol",
      id: "paracetamol",
      kw: "acetaminofeno tylenol analgesico antitermico primeiro degrau",
      apres: "comprimido 500 mg; solução oral 200 mg/mL",
      dose: [
        { rot: "Adulto — dor", val: "500 a 1000 mg VO a cada 4 ou 6 horas; máximo 4 g/dia", p: 149 },
        { rot: "Reação de Jarisch-Herxheimer após a benzatina (sífilis), se necessário", val: "500 mg, 6/6h, se necessário", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022", p: 78 }
      ],
      porque: "Analgésico não opioide do primeiro degrau, somável ao opioide em qualquer degrau da escada.",
      escolher: "Dor leve, ou base associada ao opioide. Está na farmácia básica (comprimido e solução oral).",
      evitar: "Somar sem perceber o paracetamol que já vem em associações (há associação com codeína registrada na Anvisa). A contraindicação na disfunção hepática e renal vem da tabela pediátrica do Manual; no adulto, conferir na bula.",
      contraind: "O cap. 13 do Manual (adulto, p. 149) não lista contraindicação; a tabela pediátrica (p. 374) contraindica na disfunção renal e hepática — conferir na bula para o adulto. Antídoto: acetilcisteína.",
      adversos: "Não descritos no Manual de CP 2023 nem na NT nº 2/2026: conferir na bula.",
      monitor: "Dose total do dia, contando as associações, abaixo do máximo diário.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    },
    {
      nome: "Codeína",
      id: "codeina",
      kw: "fosfato de codeina opioide fraco segundo degrau tosse dispneia diarreia",
      apres: "comprimido 30 mg e 60 mg; solução oral 3 mg/mL; solução injetável 30 mg/mL",
      dose: [
        { rot: "Adulto — dor, dose inicial", val: "15 a 30 mg a cada 4 horas, VO, por sonda nasoenteral ou gastrostomia", p: 150 },
        { rot: "Adulto — dor, máximo", val: "360 mg/dia", p: 150 },
        { rot: "Adulto sem uso prévio de opioide — dispneia leve", val: "30 mg VO a cada 6 ou 4 horas", p: 189 },
        { rot: "Adulto — tosse", val: "10 a 20 mg até de 4 em 4 horas", p: 191 },
        { rot: "Adulto — diarreia, controle sintomático, depois de excluir fecaloma e causa infecciosa", val: "até 200 mg/dia", p: 183 },
        { rot: "Equipotência", val: "1/10 da morfina oral (codeína 10 mg ≈ morfina oral 1 mg)", p: 150 }
      ],
      porque: "Opioide fraco do segundo degrau. É pró-fármaco: só faz analgesia depois de convertida em morfina no fígado, e quem não tem a enzima conversora não tem efeito.",
      escolher: "Dor que persiste com o não opioide; dispneia leve em quem nunca usou opioide; tosse; diarreia refratária, depois de excluir fecaloma (diarreia paradoxal) e causa infecciosa. O resgate, na analgesia com codeína, é com a própria codeína. Componente Especializado: não está na farmácia da USF.",
      evitar: "Via endovenosa. Prescrever sem laxante, porque é bastante obstipante. Criança: a escada pediátrica da OMS tem dois degraus justamente pela restrição à codeína. Diarreia de causa desconhecida ou gastroenterite infecciosa grave no idoso (Consenso PIM 2016).",
      contraind: "Via endovenosa: apneia e hipotensão por liberação de histamina (Manual de CP 2023, p. 150). Uso pediátrico restrito pela OMS (Manual, p. 373).",
      adversos: "Constipação marcante; reduz a tosse; os efeitos de classe dos opioides (náusea nos primeiros dias, sedação, prurido).",
      monitor: "Dor sem resposta com dose adequada: lembrar do metabolizador que não converte e subir de degrau. Hábito intestinal a cada visita.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    },
    {
      nome: "Morfina",
      id: "morfina",
      kw: "sulfato de morfina dimorf opioide forte terceiro degrau resgate dispneia liberacao prolongada hipodermoclise",
      apres: "comprimido 10 mg e 30 mg; solução oral 10 mg/mL; solução injetável 10 mg/mL; cápsula de liberação prolongada 30 mg, 60 mg e 100 mg",
      dose: [
        { rot: "Adulto — dor, dose inicial (morfina simples VO)", val: "5 mg a cada 4 horas; idoso, disfunção renal ou hepática: avaliar dose mais baixa e intervalo de 6 horas", p: 151 },
        { rot: "Teto", val: "não há dose teto: o limite é o efeito adverso, com titulação cuidadosa", p: 151 },
        { rot: "Resgate — em uso de opioide forte de horário", val: "morfina simples VO, 1/10 a 1/6 da dose diária de horário convertida em morfina oral; em codeína, o resgate é com a própria codeína; três ou mais resgates por dia: considerar ajustar a dose de horário", p: 159 },
        { rot: "Liberação prolongada", val: "a cada 12 horas; menor apresentação 30 mg de 12/12h; dose calculada a partir da dose diária de opioide já em uso", p: 152 },
        { rot: "Conversão oral para endovenosa", val: "a morfina endovenosa é três vezes mais potente que a oral", p: 151 },
        { rot: "Hipodermóclise — início em quem não usava opioide", val: "2 a 3 mg a cada 4 horas em bolus, ou 10 a 20 mg/dia em infusão contínua (SF 0,9% 100 mL); quem já usa morfina VO: converter a dose diária, não usar esta linha", p: 349 },
        { rot: "Adulto sem uso prévio de opioide — dispneia moderada ou intensa", val: "5 mg VO ou 2 mg EV/SC a cada 6 ou 4 horas; titular a cada 24 horas", p: 189 },
        { rot: "Adulto já em uso de opioide — dispneia", val: "aumentar a dose em 25%; na exacerbação, resgate de 10 a 15% da dose total diária", p: 189 },
        { rot: "Rotação para outro opioide", val: "reduzir 25 a 50% da dose calculada da nova medicação; para metadona, 50 a 75%, pelo nomograma e com quem tem experiência", p: 159 }
      ],
      porque: "Opioide forte de referência. Meia-vida curta e início rápido fazem da morfina simples a droga de escolha para titular e para o resgate de qualquer opioide forte. Na dispneia, reduz a percepção central da falta de ar com dose menor que a da dor.",
      escolher: "Dor moderada a intensa, ou dor que não cedeu ao opioide fraco; dispneia moderada ou intensa. A cápsula de liberação prolongada simplifica a posologia depois que a dose está titulada com a morfina simples.",
      evitar: "Triturar a cápsula de liberação prolongada ou dá-la por sonda (libera tudo de uma vez). Deixar o paciente confundir a de horário (liberação prolongada) com a simples de resgate. Prescrever sem laxante. Idoso e doente renal ou hepático: começar mais baixo e espaçar. No idoso, o Consenso PIM 2016 aponta constipação grave com opioide regular sem laxante, e piora cognitiva na demência fora do paliativo.",
      contraind: "O Manual de CP 2023 não lista contraindicação absoluta. Cautela na doença hepática ou renal: metabolismo hepático e excreção renal.",
      adversos: "Constipação, que não cria tolerância; náusea e vômito nos primeiros dias, que tendem a ceder em três a sete dias; sedação no início ou ao subir a dose; prurido; retenção urinária; hipotensão por liberação de histamina; hiperalgesia; mioclonia, sinal de neurotoxicidade, comum na desidratação.",
      monitor: "Sinais de intoxicação: miose bilateral, sedação e frequência respiratória abaixo de 10 — não dar a próxima dose, oxigênio e hidratação; naloxona só na intoxicação grave. Contar os resgates por dia. Hábito intestinal a cada visita.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Controle de sintomas em cuidados paliativos",
  kw: "paliativo nausea vomito antiemetico procinetico constipacao laxante sororoca broncorreia anticolinergico corticoide adjuvante",
  quando: "Náusea e vômito, constipação, sororoca e broncorreia, e corticoide adjuvante na dor: o que a NT nº 2/2026-DAET e o Manual de Cuidados Paliativos 2023 trazem para o cuidado em casa.",
  nota: "Butilbrometo de escopolamina e bisacodil não estão na RENAME 2024 nem na lista da NT nº 2/2026: a família compra. Na RENAME, o laxante irritativo é a cáscara-sagrada.",
  farmacos: [
    {
      nome: "Metoclopramida",
      id: "metoclopramida",
      kw: "plasil antiemetico procinetico nausea vomito estase gastrica antidopaminergico",
      apres: "comprimido 10 mg; solução oral 4 mg/mL; solução injetável 5 mg/mL",
      dose: [
        { rot: "Adulto — náusea e vômito de causa química", val: "10 mg EV ou VO a cada 8 ou 6 horas", p: 173 },
        { rot: "Adulto — estase gástrica", val: "até 40 mg/dia EV", p: 174 }
      ],
      porque: "Antagonista dopaminérgico na zona quimiorreceptora do vômito e procinético: serve quando a náusea vem de trânsito gástrico lento, como a do opioide.",
      escolher: "Náusea por opioide com esvaziamento gástrico lento, estase gástrica, náusea química. Está na farmácia básica nas três formas e pode ir por hipodermóclise, com potencial de irritação local.",
      evitar: "Obstrução intestinal maligna, em que o Manual manda evitar procinético. Associar com ondansetrona ou com escopolamina (mecanismos antagônicos). Idoso fora do paliativo: o Consenso PIM 2016 manda evitar, exceto na gastroparesia (extrapiramidal e discinesia tardia, risco maior no frágil).",
      contraind: "O Manual de CP 2023 e a NT não listam contraindicação: conferir na bula. Na obstrução intestinal maligna, o Manual manda evitar procinético (p. 174).",
      adversos: "Extrapiramidais, incluindo acatisia e parkinsonismo. Na hipodermóclise, irritação local.",
      monitor: "Inquietação nova (acatisia), tremor ou rigidez. Reavaliar a náusea periodicamente e ajustar ou associar outro antiemético de mecanismo diferente.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    },
    {
      nome: "Dexametasona",
      id: "dexametasona",
      kw: "decadron corticoide adjuvante dor ossea compressao medular edema cerebral anorexia nausea",
      apres: "comprimido 4 mg; elixir 0,1 mg/mL; solução injetável 4 mg/mL",
      dose: [
        { rot: "Adulto — adjuvante analgésico (dor óssea, compressão medular, cefaleia por edema)", val: "4 a 20 mg ao dia, VO ou EV; na analgesia, não ultrapassar 20 mg/dia; de preferência pela manhã e/ou à tarde, após refeição", p: 163 },
        { rot: "Adulto — hipodermóclise", val: "4 a 24 mg/dia, diluída em SF 0,9% 50 mL, em 30 minutos, em sítio exclusivo; na analgesia, o teto da linha acima vale também por esta via", p: 347 }
      ],
      porque: "Corticoide de preferência no paliativo: ação central e baixo efeito mineralocorticoide. A ação anti-inflamatória soma analgesia na dor óssea e nas compressões.",
      escolher: "Dor óssea, síndrome de compressão medular, cefaleia por edema cerebral, vômito com hipertensão intracraniana. A NT nº 2/2026 lista também anorexia, fadiga, dispneia, náusea e soluço. Está na farmácia básica.",
      evitar: "Dose à noite: tem ação euforizante central, por isso vai pela manhã ou à tarde, após refeição. Na hipodermóclise, dividir sítio com outro medicamento.",
      contraind: "Não listada no Manual de CP 2023 nem na NT nº 2/2026: conferir na bula.",
      adversos: "Ação euforizante central. Na hipodermóclise, irritação local.",
      monitor: "Insônia ou agitação: rever o horário da dose. Rever a indicação a cada visita.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    },
    {
      nome: "Butilbrometo de escopolamina",
      id: "butilbrometo-de-escopolamina",
      kw: "hioscina buscopan escopolamina anticolinergico antissecretor sororoca ronco da morte broncorreia obstrucao intestinal",
      apres: "formas oral e injetável registradas na Anvisa; existe apresentação combinada com dipirona, que não é a mesma coisa",
      dose: [
        { rot: "Adulto — sororoca (fase final)", val: "20 mg EV ou SC até de 6 em 6 horas", p: 291 },
        { rot: "Adulto — broncorreia", val: "20 mg a cada 8 ou 6 horas, VO, EV ou por hipodermóclise", p: 192 },
        { rot: "Adulto — hipodermóclise", val: "40 a 120 mg/dia; bolus: diluir 1 mL em 1 mL de SF 0,9%; infusão contínua: em SF 0,9% 50 a 250 mL", p: 348 }
      ],
      porque: "Anticolinérgico antissecretor: seca a secreção acumulada na orofaringe e nas vias aéreas e reduz a secreção intestinal.",
      escolher: "Sororoca que persiste depois de reduzir hidratação e dieta e de lateralizar o paciente; broncorreia; antissecretor na obstrução intestinal maligna. Não está na RENAME 2024: a família compra.",
      evitar: "Associar com metoclopramida (mecanismos antagônicos). Trocar pela apresentação combinada com dipirona. Idoso: o Consenso PIM 2016 manda evitar antiespasmódico anticolinérgico, exceto no cuidado paliativo de curto prazo para reduzir secreção oral; na demência, efeito adverso no sistema nervoso central.",
      contraind: "Não listada no Manual de CP 2023: conferir na bula.",
      adversos: "Constipação (o Manual lista a escopolamina entre os anticolinérgicos que constipam).",
      monitor: "Ruído respiratório e o desconforto da família ao ouvi-lo. Hábito intestinal.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    },
    {
      nome: "Lactulose",
      id: "lactulose",
      kw: "laxante osmotico constipacao prisao de ventre xarope",
      apres: "xarope 667 mg/mL",
      dose: [
        { rot: "Adulto — constipação", val: "15 a 30 mL, 2 a 3 vezes ao dia", p: 179 }
      ],
      porque: "Laxante osmótico: cria meio hiperosmolar na luz intestinal, atrai água, aumenta o bolo fecal e amolece as fezes.",
      escolher: "Constipação em geral; na constipação por opioide, entra associada quando o irritativo não basta. Está na farmácia básica.",
      evitar: "Usar sozinha na constipação por opioide, em que o laxante de escolha é o irritativo.",
      contraind: "Não listada no Manual de CP 2023 nem na NT nº 2/2026: conferir na bula.",
      adversos: "Distensão e desconforto abdominal (Manual, p. 179); dor abdominal, náusea e diarreia (tabela pediátrica, p. 391).",
      monitor: "Hábito intestinal a cada visita. O alvo é a evacuação confortável para aquele paciente, não um número fixo de evacuações.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    },
    {
      nome: "Bisacodil",
      id: "bisacodil",
      kw: "dulcolax laxante irritativo estimulante constipacao por opioide",
      apres: "comprimido revestido de 5 mg",
      dose: [
        { rot: "Adulto — constipação", val: "5 a 15 mg ao dia", p: 179 }
      ],
      porque: "Laxante irritativo: estimula diretamente o plexo mioentérico e aumenta a peristalse, justamente o que o opioide reduz na parede intestinal.",
      escolher: "Laxante de escolha na constipação induzida por opioide, prescrito junto com o opioide. Não está na RENAME 2024: na farmácia do SUS, o irritativo é a cáscara-sagrada.",
      evitar: "Macerar o comprimido revestido.",
      contraind: "Não listada no Manual de CP 2023: conferir na bula.",
      adversos: "Cólica, dor abdominal e náusea (Manual de CP 2023, tabela pediátrica, p. 391).",
      monitor: "Hábito intestinal a cada visita; refratário ao irritativo, associar osmótico.",
      fonte: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antibacterianos para IST",
  kw: "ist sifilis gonorreia clamidia tricomoniase vaginose dip cancroide lgv donovanose antibiotico",
  quando: "Sífilis em todo estágio, corrimento uretral, cervicite, vaginose e tricomoníase, DIP " +
          "ambulatorial, úlcera genital bacteriana e profilaxia na violência sexual, pelo PCDT IST.",
  nota: "Na IST o fármaco quase nunca vai sozinho: gonorreia é ceftriaxona com azitromicina, DIP " +
        "é ceftriaxona com doxiciclina e metronidazol. E o tratamento não espera o resultado do " +
        "exame: colher na consulta e tratar na consulta.",
  farmacos: [
    {
      nome: "Benzilpenicilina benzatina",
      id: "penicilina-benzatina",
      kw: "penicilina benzatina benzetacil sifilis treponema gestante parceria",
      apres: "pó para suspensão injetável ou suspensão injetável de 600.000 UI e 1.200.000 UI; uso exclusivamente intramuscular",
      dose: [
        { rot: "Sífilis recente (primária, secundária ou latente recente, até 1 ano de evolução)",
          val: "2,4 milhões UI, IM, dose única (1,2 milhão UI em cada glúteo)", p: 57 },
        { rot: "Sífilis tardia (latente tardia, latente de duração ignorada ou terciária) — não gestante",
          val: "2,4 milhões UI, IM, 1x/semana por 3 semanas (1,2 milhão UI em cada glúteo); dose total 7,2 milhões UI · intervalo de 1 semana entre as doses; se passar de 14 dias, reiniciar o esquema", p: 57 },
        { rot: "Gestante — sífilis recente",
          val: "2,4 milhões UI, IM, dose única",
          f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
        { rot: "Gestante — sífilis tardia, latente de duração ignorada ou terciária",
          val: "2,4 milhões UI, IM, 1x/semana por 3 semanas · o dia da aplicação é o D0: próxima dose no D7, nunca antes, no máximo no D9 · intervalo menor que 7 ou maior que 9 dias = tratamento inadequado · dose perdida ou intervalo maior que 9 dias: reiniciar o esquema",
          f: "MS — Nota Técnica nº 14/2023 (penicilina benzatina na gestante), 2023" },
        { rot: "Parceria sexual exposta nos últimos 90 dias a pessoa com sífilis — tratamento presuntivo, qualquer estágio, com ou sem sintoma",
          val: "2,4 milhões UI, IM, dose única (1,2 milhão UI em cada glúteo)", p: 70 },
        { rot: "Violência sexual — profilaxia, teste rápido de sífilis não reagente, pessoa com mais de 45 kg (criança, adolescente ou adulto), inclusive gestante",
          val: "2,4 milhões UI, IM, dose única (1,2 milhão UI em cada glúteo)",
          f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
        { rot: "Violência sexual — profilaxia, teste rápido de sífilis não reagente, criança ou adolescente com menos de 45 kg",
          val: "50.000 UI/kg, IM, dose única (dose máxima total 2,4 milhões UI)", p: 178 }
      ],
      porque: "É o medicamento de escolha da sífilis e o único com eficácia documentada na gestação; " +
              "não há resistência descrita do T. pallidum à penicilina no Brasil nem no mundo. Na " +
              "gestante, qualquer outro tratamento é considerado não adequado e o recém-nascido é " +
              "notificado como sífilis congênita.",
      escolher: "Primeira escolha em todo estágio, exceto neurossífilis (inclusive ocular ou auditiva), " +
                "que é penicilina cristalina IV, internada. Tratar após UM teste reagente (treponêmico ou não) " +
                "em gestante, vítima de violência sexual, pessoa com risco de perda de seguimento, " +
                "sinal de sífilis primária ou secundária ou sem diagnóstico prévio de sífilis. " +
                "Gestante assintomática sem registro de tratamento prévio adequado: esquema de sífilis " +
                "tardia. Aplicar na própria USF: região ventro-glútea é a preferencial; vasto lateral " +
                "da coxa e dorso-glúteo são alternativas. Violência sexual com TR reagente: esquema de " +
                "sífilis latente tardia (3 doses), suspender se o não treponêmico vier não reagente (NT " +
                "Conjunta nº 7/2026).",
      evitar: "Silicone (prótese ou silicone líquido industrial) nos locais de aplicação impede a via " +
              "IM: fora da gestação, usar a alternativa. Gestante ou lactante com anafilaxia ou reação " +
              "grave prévia à penicilina: encaminhar ou discutir com especialista (a doxiciclina também " +
              "é contraindicada para ela); gestante comprovadamente alérgica vai para dessensibilização " +
              "hospitalar. Reação leve ou moderada sem anafilaxia não impede a aplicação na gestante " +
              "nem na lactante.",
      contraind: "Alergia à penicilina com anafilaxia ou reação cutânea grave (Stevens-Johnson); " +
                 "silicone no local de aplicação contraindica a via. Dor ou reação local, rash " +
                 "maculopapular, náusea, prurido, mal-estar, cefaleia, evento suspeito há mais de dez " +
                 "anos ou história familiar, isolados, NÃO configuram alergia à penicilina.",
      adversos: "Reação de Jarisch-Herxheimer nas 24 horas seguintes à 1ª dose, sobretudo na sífilis " +
                "primária e secundária: febre, cefaleia, artralgia, mal-estar e piora das lesões, que " +
                "regridem em 12 a 24 horas; analgésico simples, sem suspender. Na gestante pode " +
                "desencadear trabalho de parto prematuro, mas não tratar é mais arriscado. Anafilaxia " +
                "é rara (0,002%); adrenalina é a droga de escolha.",
      monitor: "Colher VDRL ou RPR no dia em que o tratamento começa (linha de base). Seguimento com " +
               "o mesmo método: a cada 3 meses até 12 meses; gestante mensal até o parto e depois " +
               "trimestral até completar 12 meses. Gestante: registrar data de cada dose e o VDRL na " +
               "caderneta; não voltou no D7: busca ativa imediata.",
      diverge: "O PCDT IST 2022 (p. 57) e o PCDT TV 2020 mandam reiniciar o esquema da gestante se o " +
               "intervalo entre as doses passar de 7 dias. A Nota Técnica nº 14/2023 ampliou o limite " +
               "para 9 dias e é a regra vigente: intervalo menor que 7 ou maior que 9 dias é tratamento " +
               "inadequado. O PCDT PEP 2024 já traz o limite de 9 dias.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    },
    {
      nome: "Doxiciclina",
      id: "doxiciclina",
      kw: "doxiciclina tetraciclina clamidia sifilis alergia penicilina dip lgv",
      apres: "comprimido 100 mg (cloridrato de doxiciclina); comprimido solúvel 100 mg",
      dose: [
        { rot: "Sífilis recente — alternativa à penicilina (não gestante, não lactante)",
          val: "100 mg, VO, 12/12h por 15 dias", p: 57 },
        { rot: "Sífilis tardia — alternativa à penicilina (não gestante, não lactante)",
          val: "100 mg, VO, 12/12h por 30 dias", p: 57 },
        { rot: "Clamídia — alternativa à azitromicina, exceto gestante",
          val: "100 mg, VO, 2x/dia por 7 dias", p: 114 },
        { rot: "Uretrite sem agente identificado (2ª opção, junto da ceftriaxona) ou uretrite não gonocócica",
          val: "100 mg, 1 comprimido, VO, 2x/dia por 7 dias", p: 125 },
        { rot: "DIP ambulatorial — junto da ceftriaxona e do metronidazol",
          val: "100 mg, 1 comprimido, VO, 2x/dia por 14 dias", p: 144 },
        { rot: "Linfogranuloma venéreo",
          val: "100 mg, 1 comprimido, VO, 2x/dia por 21 dias", p: 135 }
      ],
      porque: "Tetraciclina que cobre clamídia. Na DIP é a primeira escolha para C. trachomatis, por ser " +
              "mais estudada que a azitromicina. Na sífilis, é a alternativa à penicilina que o PCDT " +
              "aceita fora da gestação.",
      escolher: "Sífilis: só quando a benzatina não pode ser usada (anafilaxia ou reação grave à " +
                "penicilina, silicone no local da aplicação), fora da gestação e da amamentação, e com " +
                "acompanhamento clínico e sorológico rigoroso. DIP: faz parte do esquema ambulatorial. " +
                "Clamídia: alternativa à azitromicina fora da gestação.",
      evitar: "Gestante e lactante. Na sífilis da gestante nenhuma alternativa à penicilina conta como " +
              "tratamento adequado: o recém-nascido é notificado como sífilis congênita.",
      contraind: "Gestação e lactação (PCDT IST, Quadros 15, 31, 39 e 44).",
      adversos: "O PCDT IST não descreve os efeitos adversos; conferir na bula.",
      monitor: "Sífilis tratada com doxiciclina: VDRL ou RPR a cada 3 meses até 12 meses, com o mesmo " +
               "método — o seguimento rigoroso é condição do PCDT para usar a alternativa. DIP: " +
               "reavaliar em 3 dias.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    },
    {
      nome: "Ceftriaxona",
      id: "ceftriaxona",
      kw: "ceftriaxona cefalosporina gonorreia gonococo uretrite cervicite dip cancroide",
      apres: "pó para solução injetável 250 mg, 500 mg e 1 g",
      dose: [
        { rot: "Gonorreia não complicada (uretra, colo, reto, faringe), uretrite sem agente identificado e retratamento de gonorreia — sempre com azitromicina",
          val: "500 mg, IM, dose única", p: 125 },
        { rot: "DIP ambulatorial — junto da doxiciclina e do metronidazol",
          val: "500 mg, IM, dose única", p: 144 },
        { rot: "Parceria sexual de mulher com DIP (últimos 2 meses) — junto da azitromicina",
          val: "500 mg, IM, dose única", p: 145 },
        { rot: "Cancroide — alternativa à azitromicina",
          val: "250 mg, IM, dose única", p: 135 },
        { rot: "Violência sexual — profilaxia, pessoa com mais de 45 kg (criança, adolescente ou adulto), inclusive gestante — junto da azitromicina",
          val: "500 mg, IM, dose única",
          f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
        { rot: "Violência sexual — profilaxia, criança ou adolescente com menos de 45 kg — junto da azitromicina",
          val: "125 mg, IM, dose única (fração do frasco: a RENAME não tem apresentação dessa dose; usar o menor frasco)", p: 178 }
      ],
      porque: "Cefalosporina de 3ª geração. O Projeto SenGono encontrou o gonococo brasileiro resistente " +
              "a penicilina, tetraciclina e ciprofloxacino, com resistência emergente à azitromicina, e " +
              "totalmente sensível às cefalosporinas de 3ª geração.",
      escolher: "Base do tratamento de toda gonorreia e da DIP ambulatorial. Sem laboratório, entra junto " +
                "da azitromicina em todo corrimento uretral e em toda cervicite (muco-pus, colo friável, " +
                "sangramento ao toque, dor à mobilização do colo).",
      evitar: "Alergia grave a cefalosporina: na gonorreia, usar a azitromicina isolada em dose dobrada " +
              "(ver o cartão da azitromicina). Não trocar por quinolona: com a resistência do gonococo " +
              "ao ciprofloxacino, o PCDT não recomenda quinolona empírica.",
      contraind: "Alergia grave a cefalosporinas (PCDT IST, Quadro 37).",
      adversos: "O PCDT IST não descreve os efeitos adversos; conferir na bula.",
      monitor: "Uretrite: retorno 7 a 10 dias após o fim do tratamento; se o sintoma persistir após 7 " +
               "dias, rever reinfecção, adesão e outros agentes. Sem sexo desprotegido até 7 dias após a " +
               "dose única e até a parceria ser tratada.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    },
    {
      nome: "Azitromicina",
      id: "azitromicina",
      kw: "azitromicina macrolideo clamidia gonorreia cancroide lgv donovanose mycoplasma",
      apres: "comprimido 500 mg e 250 mg; pó para suspensão oral 40 mg/mL",
      dose: [
        { rot: "Clamídia, uretrite não gonocócica ou por M. genitalium; e, junto da ceftriaxona, gonorreia ou uretrite sem agente identificado",
          val: "500 mg, 2 comprimidos, VO, dose única", p: 125 },
        { rot: "Gonorreia: retratamento por falha (junto da ceftriaxona) ou alergia grave a cefalosporina (isolada)",
          val: "500 mg, 4 comprimidos, VO, dose única (dose total 2 g)", p: 125 },
        { rot: "Cancroide",
          val: "500 mg, 2 comprimidos, VO, dose única", p: 135 },
        { rot: "Linfogranuloma venéreo — alternativa à doxiciclina, preferencial na gestante",
          val: "500 mg, 2 comprimidos, VO, 1x/semana por 21 dias", p: 135 },
        { rot: "Donovanose",
          val: "500 mg, 2 comprimidos, VO, 1x/semana por pelo menos 3 semanas ou até a cicatrização das lesões", p: 135 },
        { rot: "Parceria sexual de mulher com DIP (últimos 2 meses) — junto da ceftriaxona",
          val: "1 g, VO, dose única (o mesmo que os dois comprimidos de 500 mg das outras linhas)", p: 145 },
        { rot: "Violência sexual — profilaxia, pessoa com mais de 45 kg (criança, adolescente ou adulto), inclusive gestante — junto da ceftriaxona",
          val: "500 mg, 2 comprimidos, VO, dose única (dose total 1 g)",
          f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
        { rot: "Violência sexual — profilaxia, criança ou adolescente com menos de 45 kg — junto da ceftriaxona",
          val: "20 mg/kg, VO, dose única (dose máxima total 1 g)", p: 178 }
      ],
      porque: "Macrolídeo de dose única para clamídia, M. genitalium e cancroide. Na gonorreia completa o " +
              "esquema da ceftriaxona e cobre a clamídia que costuma vir junto.",
      escolher: "Na gestante, é a opção para clamídia (doxiciclina contraindicada) e a preferencial no " +
                "linfogranuloma venéreo. Na gonorreia, sempre junto da ceftriaxona; isolada só na alergia " +
                "grave a cefalosporina, e então em dose dobrada.",
      evitar: "Azitromicina isolada, na dose habitual, para gonorreia: o gonococo já mostra resistência " +
              "emergente. Esquema estendido para M. genitalium não é mais efetivo que a dose única.",
      contraind: "Hipersensibilidade comprovada: usar a alternativa do capítulo específico do PCDT.",
      adversos: "O PCDT IST não descreve os efeitos adversos; conferir na bula.",
      monitor: "Sem sexo desprotegido até 7 dias após a dose única. Uretrite: os sintomas podem levar até " +
               "7 dias após o fim da terapia para resolver; retorno em 7 a 10 dias.",
      diverge: "O Quadro 13 do PCDT PEP 2024 (p. 26) escreve, na profilaxia da violência sexual, " +
               "\"Azitromicina 500 mg, 2 comprimidos de 250 mg, VO, dose única (Dose total: 1 g)\": dois " +
               "comprimidos de 250 mg somam 500 mg, não 1 g. O PCDT IST 2022 (Quadro 50, p. 178) e a Nota " +
               "Técnica Conjunta nº 7/2026 (Quadro 3) trazem 500 mg em 2 comprimidos, dose total de 1 g, que " +
               "é a dose deste cartão. Não copiar o quadro do PCDT PEP.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    },
    {
      nome: "Metronidazol",
      id: "metronidazol",
      kw: "metronidazol nitroimidazol vaginose tricomonas tricomoniase dip anaerobio",
      apres: "comprimido 250 mg e 400 mg; gel vaginal 100 mg/g (10%); benzoilmetronidazol suspensão oral 40 mg/mL (mg do sal, não de metronidazol base)",
      dose: [
        { rot: "Vaginose bacteriana — 1ª opção, inclusive gestante, lactante e puérpera",
          val: "250 mg, 2 comprimidos, VO, 2x/dia por 7 dias · ou gel vaginal 100 mg/g, 1 aplicador cheio à noite, ao deitar, por 5 dias", p: 115 },
        { rot: "Vaginose bacteriana recorrente",
          val: "250 mg, 2 comprimidos, VO, 2x/dia por 10 a 14 dias · ou gel vaginal 100 mg/g, 1 aplicador cheio 1x/dia por 10 dias, seguido de supressão: óvulo de ácido bórico 600 mg intravaginal ao dia por 21 dias, depois metronidazol gel 100 mg/g 2x/semana por 4 a 6 meses (regime que o PCDT diz ainda precisar de validação)", p: 115 },
        { rot: "Tricomoníase — 1ª opção, inclusive gestante, lactante e puérpera; parceria com o mesmo esquema",
          val: "400 mg, 5 comprimidos, VO, dose única (dose total 2 g) · ou 250 mg, 2 comprimidos, VO, 2x/dia por 7 dias", p: 116 },
        { rot: "DIP ambulatorial — junto da ceftriaxona e da doxiciclina",
          val: "250 mg, 2 comprimidos, VO, 2x/dia por 14 dias", p: 144 },
        { rot: "Violência sexual — profilaxia de tricomoníase, pessoa com mais de 45 kg (criança, adolescente ou adulto; não no 1º trimestre da gestação)",
          val: "400 mg, 5 comprimidos, VO, dose única (dose total 2 g) · ou 250 mg, 8 comprimidos, VO, dose única (dose total 2 g)",
          f: "MS — Nota Técnica Conjunta nº 7/2026 (PEP na violência sexual), 2026" },
        { rot: "Violência sexual — profilaxia de tricomoníase, criança ou adolescente com menos de 45 kg",
          val: "15 mg/kg/dia, divididos a cada 8 horas, por 7 dias (dose diária máxima 2 g) · a dose é de metronidazol; a suspensão da RENAME é de benzoilmetronidazol, rotulada em mg do sal, e a equivalência em metronidazol base NÃO está conferida em fonte: confirmar antes de converter em mL",
          f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024", p: 26 }
      ],
      porque: "Nitroimidazol: cobre anaeróbios e Trichomonas. Trata a vaginose bacteriana, a tricomoníase " +
              "e o componente anaeróbio da DIP.",
      escolher: "Vaginose bacteriana e tricomoníase: primeira opção também na gestante, na lactante e na " +
                "puérpera. Tricomoníase é IST: a parceria recebe o mesmo esquema. Vaginose não é IST: a " +
                "parceria não é tratada.",
      evitar: "Álcool durante o uso e até 24 horas depois (efeito antabuse). Na profilaxia da violência " +
              "sexual: não usar no 1º trimestre da gestação, e postergar se houver contracepção de " +
              "emergência ou antirretroviral no mesmo atendimento.",
      contraind: "1º trimestre da gestação, na profilaxia da violência sexual (PCDT IST, Quadro 50; PCDT " +
                 "PEP 2024, Quadro 13).",
      adversos: "Efeito antabuse com álcool: mal-estar, náuseas, tonturas e gosto metálico. Intolerância " +
                "gastrintestinal. Em PVHIV com ritonavir, separar as tomadas por 2 horas para reduzir " +
                "náusea e vômito.",
      monitor: "Manter o tratamento durante a menstruação e suspender as relações sexuais até o fim. " +
               "Tricomoníase com alteração na citologia: tratar e repetir a citologia em 3 meses.",
      diverge: "Na profilaxia da violência sexual, o PCDT IST 2022 (Quadro 50, p. 178) escreve 500 mg em " +
               "4 comprimidos; o PCDT PEP 2024 (Quadro 13) e a Nota Técnica Conjunta nº 7/2026 trazem " +
               "400 mg em 5 comprimidos ou 250 mg em 8, as apresentações da RENAME 2024. A dose total, " +
               "2 g, é a mesma.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antivirais e antifúngicos para IST e vulvovaginites",
  kw: "herpes genital candidiase vulvovaginal antiviral antifungico ulcera corrimento",
  quando: "Herpes genital (primeiro episódio, recidiva e supressão) e candidíase vulvovaginal, pelo " +
          "PCDT IST.",
  farmacos: [
    {
      nome: "Aciclovir",
      id: "aciclovir",
      kw: "aciclovir antiviral herpes hsv ulcera genital vesicula",
      apres: "comprimido 200 mg; pó para solução injetável 250 mg",
      dose: [
        { rot: "Herpes genital — primeiro episódio (também na gestante, em qualquer trimestre)",
          val: "200 mg, 2 comprimidos, VO, 3x/dia por 7 a 10 dias · ou 200 mg, 1 comprimido, VO, 5x/dia por 7 a 10 dias", p: 134 },
        { rot: "Herpes genital — recidiva, iniciar de preferência no pródromo",
          val: "200 mg, 2 comprimidos, VO, 3x/dia por 5 dias · ou 200 mg, 4 comprimidos, VO, 2x/dia por 5 dias", p: 134 },
        { rot: "Supressão — 6 ou mais episódios por ano",
          val: "200 mg, 2 comprimidos, VO, 2x/dia por até 6 meses, prorrogável até 2 anos", p: 134 },
        { rot: "Gestante — supressão a partir da 36ª semana, se a primoinfecção foi na gestação ou as recidivas foram frequentes",
          val: "400 mg, VO, 3x/dia", p: 134 }
      ],
      porque: "Antiviral: reduz a intensidade e a duração do episódio quando começa cedo. Não erradica o " +
              "vírus latente no gânglio sensitivo.",
      escolher: "Primeiro episódio: tratar já. Recidiva: começar no pródromo (ardor, prurido, sensibilidade " +
                "local). Supressão: 6 ou mais episódios por ano, como no título do Quadro 38 (o comentário do mesmo quadro diz 'mais de 6'). Imunossuprimido com lesões " +
                "extensas: tratamento intravenoso, fora da USF.",
      evitar: "Adiar o início à espera de exame: a eficácia depende do início precoce. Prometer cura: o " +
              "tratamento controla o episódio, não impede novas recorrências.",
      contraind: "O PCDT IST não descreve contraindicações; conferir na bula.",
      adversos: "O PCDT IST não descreve os efeitos adversos; na supressão prolongada indica avaliar " +
                "periodicamente as funções renal e hepática.",
      monitor: "Retorno em 1 semana para reavaliar as lesões; prolongar o tratamento se a cicatrização " +
               "estiver incompleta após 10 dias. Supressão: função renal e hepática periódicas. Lesão " +
               "herpética ativa no parto: indicação de cesariana.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    },
    {
      nome: "Nitrato de miconazol",
      id: "nitrato-de-miconazol",
      kw: "miconazol creme vaginal candidiase cvv antifungico imidazolico gestante",
      apres: "creme vaginal 2% (20 mg/g), com aplicador",
      dose: [
        { rot: "Candidíase vulvovaginal — 1ª opção, inclusive gestante e lactante",
          val: "creme vaginal 2%, 1 aplicador cheio à noite, ao deitar, por 7 dias", p: 115 },
        { rot: "Candidíase vulvovaginal complicada ou recorrente — indução",
          val: "creme vaginal, 1x/dia por 10 a 14 dias", p: 115 },
        { rot: "Candidíase vulvovaginal recorrente — manutenção",
          val: "creme vaginal, 2x/semana", p: 115 }
      ],
      porque: "Imidazólico de uso vaginal. É a via que serve para gestante e lactante, em quem o " +
              "antifúngico oral é contraindicado.",
      escolher: "Primeira opção na candidíase vulvovaginal. Na gestação a candidíase é comum e recidiva, " +
                "pelo pH vaginal da gravidez: tratar sempre por via vaginal.",
      evitar: "Tratar parceria sem sintoma (só a sintomática é tratada). Tratar colonização assintomática " +
              "por Candida, que não requer tratamento.",
      contraind: "O PCDT IST não descreve contraindicações; conferir na bula.",
      adversos: "O PCDT IST não descreve os efeitos adversos; conferir na bula.",
      monitor: "Recorrência (4 ou mais episódios sintomáticos em 1 ano) ou difícil controle: investigar " +
               "diabetes, imunodepressão (inclusive HIV) e uso de corticoide.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    },
    {
      nome: "Fluconazol",
      id: "fluconazol",
      kw: "fluconazol antifungico azolico oral candidiase vulvovaginal cvv recorrente",
      apres: "cápsula 100 mg e 150 mg; suspensão oral 10 mg/mL",
      dose: [
        { rot: "Candidíase vulvovaginal não complicada — 2ª opção (não gestante, não lactante)",
          val: "150 mg, VO, dose única", p: 115 },
        { rot: "Candidíase vulvovaginal complicada ou recorrente — indução",
          val: "150 mg, VO, 1x/dia nos dias 1, 4 e 7", p: 115 },
        { rot: "Candidíase vulvovaginal recorrente — manutenção",
          val: "150 mg, VO, 1x/semana por 6 meses", p: 115 }
      ],
      porque: "Azólico oral: segunda opção na candidíase vulvovaginal e base do esquema de indução e " +
              "manutenção da forma recorrente.",
      escolher: "Candidíase vulvovaginal fora da gestação e da lactação, quando a primeira opção (creme " +
                "vaginal) não serve. Recorrente é 4 ou mais episódios sintomáticos em 1 ano.",
      evitar: "Gestante e lactante: tratamento só por via vaginal, o oral está contraindicado. Tratar " +
              "parceria sem sintoma.",
      contraind: "Gestação e lactação (PCDT IST, Quadro 33).",
      adversos: "Raros (0,01% a 0,1%): agranulocitose, leucopenia, neutropenia, trombocitopenia, " +
                "anafilaxia, angioedema, hipertrigliceridemia, hipercolesterolemia, hipocalemia, " +
                "toxicidade e insuficiência hepática.",
      monitor: "Recorrência ou difícil controle: investigar diabetes, imunodepressão (inclusive HIV) e uso " +
               "de corticoide.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Tratamento domiciliar de verruga anogenital",
  kw: "verruga condiloma hpv anogenital autoaplicado creme",
  quando: "Verruga anogenital externa em adulto não gestante e não imunossuprimido, com lesões que a " +
          "própria pessoa consegue tratar em casa, pelo PCDT IST.",
  nota: "O tratamento destrói a lesão visível; não muda a história natural do HPV. Recidiva é comum e " +
        "não é falha de quem prescreveu.",
  farmacos: [
    {
      nome: "Imiquimode",
      id: "imiquimode",
      kw: "imiquimode verruga condiloma hpv creme autoaplicado imunomodulador",
      apres: "creme 50 mg/g, em sachê de uso único",
      dose: [
        { rot: "Verruga anogenital externa (genital ou perianal) — tratamento domiciliar, autoaplicado",
          val: "creme 50 mg/g: camada fina à noite, 3x/semana em dias alternados; deixar agir por seis a dez horas e lavar; até o desaparecimento das verrugas ou no máximo 16 semanas por episódio", p: 153 }
      ],
      porque: "Imunomodulador (induz interferon alfa e outras citocinas): não destrói o vírus, ajuda a " +
              "eliminar a verruga. Novas verrugas podem aparecer durante o tratamento.",
      escolher: "Verrugas externas em quem consegue seguir as instruções em casa. Menos efeito local que a " +
                "podofilotoxina, mas tratamento mais longo (meses contra semanas).",
      evitar: "Gestação. Uretra, vagina, colo do útero e parte interna do ânus. Sol e bronzeamento " +
              "artificial durante o tratamento. Guardar sobra de sachê para reusar.",
      contraind: "Gestação (PCDT IST, seção 11.8); aplicação em uretra, vagina, colo do útero ou canal anal.",
      adversos: "Reação local, que é o próprio mecanismo de ação: vermelhidão, descamação, erosão, " +
                "escoriação e inchaço no local.",
      monitor: "Sem melhora significativa após três sessões, ou sem desaparecer após seis, considerar " +
               "trocar a terapia. Homem não circuncidado com verruga sob o prepúcio: retrair e limpar " +
               "diariamente.",
      fonte: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antituberculosos",
  kw: "tuberculose tb esquema basico rhze rh iltb infeccao latente isoniazida rifampicina rifapentina pirazinamida etambutol piridoxina",
  quando: "Tratamento da tuberculose sensível na APS (esquema básico, caso novo e retratamento), tratamento da infecção latente (ILTB) e o adjuvante que acompanha a isoniazida.",
  nota: "Dose de TB é pela FAIXA DE PESO e muda quando o peso muda: repesar toda consulta. A partir de 10 anos, comprimidos em dose fixa combinada (RHZE, depois RH). Abaixo de 10 anos não há etambutol, e a NI nº 5/2024 trocou a formulação de 4 a 25 kg pelo comprimido dispersível em dose fixa. Na ILTB o que conta é o número de doses tomadas, não só o tempo.",
  farmacos: [
    {
      nome: "Rifampicina + isoniazida + pirazinamida + etambutol (RHZE)",
      id: "rifampicina-isoniazida-pirazinamida-etambutol",
      kw: "rhze 4 em 1 esquema basico tuberculose fase intensiva ataque dose fixa combinada",
      apres: "comprimido em dose fixa combinada (4 em 1): rifampicina 150 mg + isoniazida 75 mg + pirazinamida 400 mg + etambutol 275 mg",
      dose: [
        { rot: "Adulto e adolescente (≥ 10 anos), 20 a 35 kg — fase intensiva", val: "2 comprimidos de RHZE 150/75/400/275 mg ao dia, numa tomada só, por 2 meses", p: 106 },
        { rot: "Adulto e adolescente (≥ 10 anos), 36 a 50 kg — fase intensiva", val: "3 comprimidos de RHZE 150/75/400/275 mg ao dia, numa tomada só, por 2 meses", p: 106 },
        { rot: "Adulto e adolescente (≥ 10 anos), 51 a 70 kg — fase intensiva", val: "4 comprimidos de RHZE 150/75/400/275 mg ao dia, numa tomada só, por 2 meses", p: 106 },
        { rot: "Adulto e adolescente (≥ 10 anos), acima de 70 kg — fase intensiva", val: "5 comprimidos de RHZE 150/75/400/275 mg ao dia, numa tomada só, por 2 meses", p: 106 },
        { rot: "Nefropata com clearance de creatinina abaixo de 30 mL/min (≥ 10 anos) — esquema com dose fixa", val: "RHZE na 2ª, 4ª e 6ª-feira e RH na 3ª, 5ª, sábado e domingo, por 2 meses (comprimidos pela faixa de peso); depois RH todos os dias por 4 meses; em hemodiálise, tomar após a sessão", p: 114 }
      ],
      porque: "Quatro fármacos na fase intensiva derrubam rápido a população de bacilos, cobrem os que têm resistência natural a um deles e cortam a transmissão, que em geral já está muito reduzida após cerca de quinze dias. A dose fixa combinada reduz o número de comprimidos e impede a monoterapia acidental.",
      escolher: "Todo caso novo e todo retratamento (recidiva, volta após abandono) a partir de 10 anos, pulmonar ou extrapulmonar, conduzido na própria APS. A fase intensiva é a mesma na TB meningoencefálica e osteoarticular (muda só a manutenção, e o manejo é hospitalar e secundário) e no adolescente de 10 a menos de 16 anos com TB pulmonar não grave (NI nº 5/2024). Criança abaixo de 10 anos não usa etambutol.",
      evitar: "Abaixo de 20 kg o quadro do Manual não tem faixa: não extrapolar, decidir com a referência. Três situações têm esquema próprio, decidido com a referência: nefropata com clearance abaixo de 30 usa RHZE e RH em dias alternados (linha acima); hepatopata segue a conduta do Quadro 24 (esquema básico, reintrodução ou esquema especial, conforme as transaminases e a cirrose); PVHIV que precisa manter inibidor de protease ou dolutegravir troca a rifampicina por rifabutina.",
      contraind: "Hipersensibilidade grave prévia a um componente (o fármaco suspeito não é reintroduzido); hepatotoxicidade sem reintrodução possível; neurite óptica pelo etambutol. Nesses casos, esquema especial na referência secundária (Quadro 34 do Manual).",
      adversos: "Menores, manejadas na APS sem trocar o esquema: urina e suor alaranjados (universal), intolerância gástrica (cerca de 40%), prurido e exantema leve, artralgia, neuropatia periférica (piridoxina), hiperuricemia, cefaleia e alteração de comportamento, febre. Maiores, que suspendem: exantema moderado a grave, psicose, convulsão ou encefalopatia (isoniazida), neurite óptica (etambutol), hepatotoxicidade, plaquetopenia, anemia hemolítica, vasculite ou nefrite intersticial (rifampicina), rabdomiólise (pirazinamida).",
      monitor: "Consulta mensal com peso (trocar a faixa se o peso mudou), adesão e efeitos adversos; baciloscopia mensal na forma pulmonar; glicemia, função hepática e renal no início; raio X no 2º mês e no fim. Baciloscopia positiva no fim do 2º mês: cultura com TS e mais 30 dias de RHZE. Hepatotoxicidade: interromper se transaminases 5 vezes o normal sem sintomas, 3 vezes com sintomas ou icterícia; reintroduzir na referência (RE, depois H, depois Z). Adolescente: discriminação de cores.",
      fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019"
    },
    {
      nome: "Rifampicina + isoniazida (RH)",
      id: "rifampicina-isoniazida",
      kw: "rh 2 em 1 fase de manutencao tuberculose dose fixa combinada dispersivel",
      apres: "comprimido em dose fixa combinada: rifampicina 300 mg + isoniazida 150 mg, ou rifampicina 150 mg + isoniazida 75 mg; comprimido dispersível rifampicina 75 mg + isoniazida 50 mg (criança abaixo de 10 anos)",
      dose: [
        { rot: "Adulto e adolescente (≥ 10 anos), 20 a 35 kg — fase de manutenção", val: "1 comprimido de 300/150 mg, ou 2 comprimidos de 150/75 mg, ao dia, numa tomada só", p: 106 },
        { rot: "Adulto e adolescente (≥ 10 anos), 36 a 50 kg — fase de manutenção", val: "1 comprimido de 300/150 mg + 1 de 150/75 mg, ou 3 comprimidos de 150/75 mg, ao dia", p: 106 },
        { rot: "Adulto e adolescente (≥ 10 anos), 51 a 70 kg — fase de manutenção", val: "2 comprimidos de 300/150 mg, ou 4 comprimidos de 150/75 mg, ao dia", p: 106 },
        { rot: "Adulto e adolescente (≥ 10 anos), acima de 70 kg — fase de manutenção", val: "2 comprimidos de 300/150 mg + 1 de 150/75 mg, ou 5 comprimidos de 150/75 mg, ao dia", p: 106 },
        { rot: "Duração da manutenção — TB pulmonar ou extrapulmonar (exceto meningoencefálica e osteoarticular), ≥ 10 anos", val: "4 meses (esquema 2RHZE/4RH, 6 meses no total)", p: 106 },
        { rot: "Duração da manutenção — adolescente de 10 a menos de 16 anos com TB pulmonar NÃO grave (NI nº 5/2024, vale sobre o Manual)", val: "2 meses (esquema 2RHZE/2RH, 4 meses no total); sem evolução satisfatória, estender a manutenção para 4 meses", f: "MS — Nota Informativa nº 5/2024-CGTM (tuberculose em criança), 2024" },
        { rot: "Duração da manutenção — TB meningoencefálica ou osteoarticular, ≥ 10 anos (manejo hospitalar e secundário)", val: "10 meses (esquema 2RHZE/10RH, 12 meses no total)", p: 107 },
        { rot: "Criança abaixo de 10 anos, de 4 a 25 kg — fase de manutenção (NI nº 5/2024)", val: "comprimido dispersível de rifampicina 75 mg + isoniazida 50 mg em dose fixa; o número de comprimidos por faixa de peso NÃO está nas fontes baixadas — confirmar antes de prescrever", f: "MS — Nota Informativa nº 5/2024-CGTM (tuberculose em criança), 2024" }
      ],
      porque: "A manutenção junta os dois fármacos de maior poder bactericida e esterilizante: elimina os bacilos persistentes e é o que segura a recidiva.",
      escolher: "Logo depois dos 2 meses de RHZE, a partir de 10 anos. O comprimido de 300/150 deve ser o preferido quando disponível (menos comprimidos). Criança abaixo de 10 anos com 25 kg ou mais, e bebê de até 3 meses ou abaixo de 4 kg, usam rifampicina e isoniazida em doses individualizadas (cartões próprios).",
      evitar: "Encurtar a manutenção para 2 meses fora dos critérios de TB não grave da NI nº 5/2024, em TB grave ou em quem tem 16 anos ou mais. Prolongar a manutenção (até 7 meses, por evolução ruim) é decisão da referência secundária.",
      contraind: "As da rifampicina e da isoniazida: reação grave atribuída a uma delas leva a esquema especial na referência secundária (sem rifampicina: 2HZE-Lfx/10HE-Lfx; sem isoniazida: 2RZE-Lfx/4RE-Lfx).",
      adversos: "Urina alaranjada, intolerância gástrica, prurido, artralgia, neuropatia periférica (isoniazida), hepatotoxicidade; raros: plaquetopenia, anemia hemolítica, nefrite (rifampicina), psicose e convulsão (isoniazida). A rifampicina é indutora enzimática: reduz anticoncepcional hormonal, anticoagulante oral, inibidor de protease, enalapril, metadona, beta-agonista, teofilina, corticoide, digital e hipoglicemiante oral.",
      monitor: "Consulta mensal com peso e adesão; pelo menos 2 baciloscopias negativas na manutenção (uma no meio e outra no fim) para comprovar a cura de quem começou com exame positivo; raio X no fim do tratamento.",
      fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019"
    },
    {
      nome: "Isoniazida",
      id: "isoniazida",
      kw: "isoniazida inh h iltb 6h 9h infeccao latente quimioprofilaxia recem-nascido",
      apres: "comprimido 100 mg e 300 mg",
      dose: [
        { rot: "ILTB — adulto e adolescente (≥ 10 anos), esquema 6H ou 9H", val: "5 a 10 mg/kg/dia, máximo de 300 mg/dia", p: 168 },
        { rot: "ILTB — criança abaixo de 10 anos", val: "10 mg/kg/dia, máximo de 300 mg/dia", p: 168 },
        { rot: "ILTB — número de doses (qualquer idade)", val: "270 doses em 9 a 12 meses (preferível); 180 doses em 6 a 9 meses, em casos individuais, após avaliar a adesão", p: 168 },
        { rot: "ILTB — como tomar (qualquer idade)", val: "numa tomada só, de preferência em jejum (uma hora antes ou duas horas depois do café da manhã)", p: 169 },
        { rot: "Recém-nascido que mora com caso bacilífero — quimioprofilaxia primária (duração)", val: "3 meses e então PT: se ≥ 5 mm, manter mais três meses (seis no total) e não vacinar BCG; se < 5 mm, suspender e vacinar BCG. Vacinado por engano: seis meses, sem PT. o Manual não traz dose própria do recém-nascido; a dose da criança abaixo de 10 anos (linha de ILTB neste cartão) é a única da fonte — confirmar com a referência", p: 163 },
        { rot: "Criança abaixo de 10 anos, até 20 kg — TB, fases intensiva e de manutenção (Quadro 22; de 4 a 25 kg a NI nº 5/2024 manda o dispersível em dose fixa)", val: "10 mg/kg/dia (faixa de 7 a 15)", p: 108 },
        { rot: "Criança abaixo de 10 anos, 21 a 25 kg — TB (Quadro 22; nessa faixa a NI nº 5/2024 manda o dispersível em dose fixa; com exatamente 25 kg a NI põe a criança nas duas faixas — se for dose individualizada, é esta linha)", val: "200 mg/dia", p: 108 },
        { rot: "Criança abaixo de 10 anos, 26 kg ou mais — TB, dose individualizada (NI nº 5/2024)", val: "300 mg/dia", p: 108 }
      ],
      porque: "Bactericida potente nos bacilos em multiplicação, com décadas de uso no país. Na ILTB reduz de 60% a 90% o risco de adoecer, conforme a adesão e a duração.",
      escolher: "Esquema preferencial do Manual 2019 na ILTB, exceto em hepatopata, criança abaixo de 10 anos, pessoa acima de 50 anos e intolerância — nesses, rifampicina. É a escolha da ILTB na PVHIV em uso de inibidor de protease ou dolutegravir, em que a rifampicina é contraindicada.",
      evitar: "Iniciar ILTB sem excluir TB ativa (clínica e raio X): seria monoterapia, que seleciona resistência. Pessoa de 50 anos ou mais (hepatotoxicidade cresce com a idade). Gestante: adiar a ILTB para depois do parto; com HIV, tratar a partir do 3º mês de gestação.",
      contraind: "Psicose, crise convulsiva, encefalopatia tóxica ou hepatotoxicidade grave atribuídas à isoniazida. Hepatopatia: dar prioridade a outro esquema.",
      adversos: "Neuropatia periférica (comum; prevenir e tratar com piridoxina), hepatotoxicidade (maior com idade, álcool, outros hepatotóxicos e hepatite B ou C), intolerância gástrica, prurido, artralgia, cefaleia, insônia, euforia, ansiedade ou depressão leve; raros: psicose e convulsão. Antiácido reduz a absorção; potencializa benzodiazepínico; com fenitoína e paracetamol aumenta a hepatotoxicidade; queijos e vinhos: efeito tipo inibidor da MAO.",
      monitor: "Consulta a cada 30 dias na ILTB (até 60 se boa adesão e baixo risco de hepatotoxicidade); função hepática se alcoolista, outro hepatotóxico ou hepatite B ou C. Abandono da ILTB = 3 meses sem tomar, seguidos ou não: afastar TB ativa e, se reiniciar após 2 a 3 meses parado, raio X e recomeçar do zero.",
      fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019"
    },
    {
      nome: "Rifampicina",
      id: "rifampicina",
      kw: "rifampicina r 4r iltb infeccao latente suspensao crianca quimioprofilaxia",
      apres: "cápsula 300 mg; suspensão oral 20 mg/mL; cápsula 150 mg só dentro do blíster da PQT-U",
      dose: [
        { rot: "ILTB — adulto e adolescente (≥ 10 anos), esquema 4R", val: "10 mg/kg/dia, máximo de 600 mg/dia", p: 168 },
        { rot: "ILTB — criança abaixo de 10 anos, esquema 4R (preferido nessa idade)", val: "15 mg/kg/dia (faixa de 10 a 20), máximo de 600 mg/dia", p: 168 },
        { rot: "ILTB — número de doses (qualquer idade)", val: "no mínimo 120 doses, idealmente em 4 meses (pode-se estender até 6 meses)", p: 168 },
        { rot: "ILTB — como tomar (qualquer idade)", val: "numa tomada só, de preferência em jejum (uma hora antes ou duas horas depois do café da manhã)", p: 169 },
        { rot: "Recém-nascido que mora com caso bacilífero — quimioprofilaxia primária com a suspensão, alternativa à isoniazida (duração)", val: "3 meses e então PT: se ≥ 5 mm, manter mais um mês e não vacinar BCG; se < 5 mm, suspender e vacinar BCG. o Manual não traz dose própria do recém-nascido; a dose da criança abaixo de 10 anos (linha de ILTB neste cartão) é a única da fonte — confirmar com a referência", p: 164 },
        { rot: "Criança abaixo de 10 anos, até 20 kg — TB, fases intensiva e de manutenção (Quadro 22; de 4 a 25 kg a NI nº 5/2024 manda o dispersível em dose fixa)", val: "15 mg/kg/dia (faixa de 10 a 20)", p: 108 },
        { rot: "Criança abaixo de 10 anos, 21 a 25 kg — TB (Quadro 22; nessa faixa a NI nº 5/2024 manda o dispersível em dose fixa; com exatamente 25 kg a NI põe a criança nas duas faixas — se for dose individualizada, é esta linha)", val: "300 mg/dia", p: 108 },
        { rot: "Criança abaixo de 10 anos, 26 a 30 kg — TB, dose individualizada (NI nº 5/2024)", val: "450 mg/dia", p: 108 },
        { rot: "Criança abaixo de 10 anos, 31 a 35 kg — TB, dose individualizada", val: "500 mg/dia", p: 108 },
        { rot: "Criança abaixo de 10 anos, 36 kg ou mais — TB, dose individualizada", val: "600 mg/dia", p: 108 }
      ],
      porque: "Bactericida e esterilizante. Na ILTB, esquema mais curto que a isoniazida e com menos efeito adverso grave, sobretudo hepatotoxicidade.",
      escolher: "ILTB preferida acima de 50 anos, abaixo de 10 anos, em hepatopata, em contato de caso monorresistente à isoniazida e na intolerância à isoniazida. Voltou a ser dispensada: a NI nº 25/2025 revogou a suspensão por falta de insumo (NI nº 33/2024) e restabeleceu os esquemas do Manual 2019.",
      evitar: "PVHIV em uso de inibidor de protease ou dolutegravir: contraindicada na ILTB (usar isoniazida); no tratamento da TB, a referência troca por rifabutina. Anticoncepcional hormonal perde efeito: outro método. Nunca sozinha sem antes excluir TB ativa.",
      contraind: "Plaquetopenia, leucopenia, eosinofilia, anemia hemolítica, agranulocitose, vasculite ou nefrite intersticial atribuídas à rifampicina: não reintroduzir. Uso concomitante de inibidor de protease ou dolutegravir.",
      adversos: "Urina, suor e outras secreções alaranjados (avisar); intolerância gástrica; prurido; febre; hepatotoxicidade; raros: plaquetopenia, hemólise, nefrite. Indutora enzimática potente (citocromo P450): reduz anticoncepcional, anticoagulante oral, inibidor de protease, enalapril, metadona, beta-agonista, teofilina, propafenona, quinidina, corticoide, digital, hipoglicemiante oral e outros.",
      monitor: "ILTB: consulta a cada 30 dias, adesão, efeitos adversos e sintomas de TB. Abandono da ILTB = 2 meses sem tomar, seguidos ou não. Criança em tratamento de TB: ajustar a dose a cada ganho de peso.",
      fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019"
    },
    {
      nome: "Rifapentina + isoniazida (3HP)",
      id: "isoniazida-rifapentina",
      kw: "3hp rifapentina isoniazida iltb infeccao latente semanal dose fixa combinada tratamento preventivo",
      apres: "comprimido em dose fixa combinada rifapentina 300 mg + isoniazida 300 mg; para menor de 14 anos ou abaixo de 30 kg, rifapentina 150 mg e isoniazida 100 mg ou 300 mg isoladas",
      dose: [
        { rot: "ILTB — acima de 14 anos E acima de 30 kg (dose fixa combinada)", val: "3 comprimidos de rifapentina 300 mg + isoniazida 300 mg por semana, durante 3 meses (12 semanas), tomados com alimento; a NI não diz se é tomada única semanal — confirmar na NI nº 5/2021" },
        { rot: "ILTB — menor de 14 anos ou abaixo de 30 kg", val: "comprimidos isolados: rifapentina 150 mg + isoniazida 300 mg ou 100 mg; a dose por faixa de peso não está nas fontes baixadas — confirmar antes de prescrever" }
      ],
      porque: "Esquema de ILTB mais curto (12 semanas). A dose fixa combinada, distribuída desde 2024, foi feita para melhorar a adesão e reduzir erro de tomada em relação aos comprimidos isolados.",
      escolher: "Opção de ILTB para quem tem mais de 14 anos e mais de 30 kg, com as mesmas indicações de quem tratar do Manual 2019 (incorporado ao SUS em 2020). Abaixo disso, comprimidos isolados com dose da nota que rege a rifapentina.",
      evitar: "Gestante e lactante: uso não recomendado pela NI. Nunca iniciar sem excluir TB ativa.",
      contraind: "Gestação e amamentação (NI nº 2/2024; o Manual 2019 classifica a rifapentina como de dados limitados na gestação e manda evitar na lactação). Indicações detalhadas, efeitos adversos e interações da rifapentina estão na NI nº 5/2021, que não está nas fontes baixadas: conferir antes de prescrever em PVHIV ou em quem usa muitos fármacos.",
      adversos: "Os da isoniazida (neuropatia periférica, hepatotoxicidade). O perfil próprio da rifapentina e suas interações não estão nas fontes baixadas (NI nº 5/2021) — VERIFICAR.",
      monitor: "Seguimento da ILTB do Manual 2019: consulta a cada 30 dias com adesão, efeitos adversos e sintomas de TB; função hepática se alto risco de hepatotoxicidade.",
      fonte: "MS — Nota Informativa nº 2/2024-CGTM (3HP), 2024"
    },
    {
      nome: "Pirazinamida",
      id: "pirazinamida",
      kw: "pirazinamida z tuberculose crianca fase intensiva esquema individualizado",
      apres: "comprimido 500 mg; suspensão oral 30 mg/mL; comprimido dispersível 150 mg",
      dose: [
        { rot: "Criança abaixo de 10 anos, até 20 kg — TB, fase intensiva 2RHZ (Quadro 22; de 4 a 25 kg a NI nº 5/2024 manda o dispersível em dose fixa RHZ)", val: "35 mg/kg/dia (faixa de 30 a 40)", p: 108 },
        { rot: "Criança abaixo de 10 anos, 21 a 25 kg — TB, fase intensiva (Quadro 22; nessa faixa a NI nº 5/2024 manda o dispersível em dose fixa; com exatamente 25 kg a NI põe a criança nas duas faixas — se for dose individualizada, é esta linha)", val: "750 mg/dia", p: 108 },
        { rot: "Criança abaixo de 10 anos, 26 a 35 kg — TB, fase intensiva, dose individualizada (NI nº 5/2024)", val: "1.000 mg/dia", p: 108 },
        { rot: "Criança abaixo de 10 anos, 36 a 44 kg — TB, fase intensiva, dose individualizada", val: "1.500 mg/dia", p: 108 },
        { rot: "Criança abaixo de 10 anos, 45 kg ou mais — TB, fase intensiva, dose individualizada", val: "2.000 mg/dia", p: 108 }
      ],
      porque: "Esterilizante: age no bacilo dentro do macrófago e da lesão caseosa fechada, em meio ácido. Por isso entra só na fase intensiva.",
      escolher: "A partir de 10 anos vem dentro do RHZE. Isolada, serve à criança abaixo de 10 anos com 25 kg ou mais e ao bebê de até 3 meses ou abaixo de 4 kg (NI nº 5/2024, doses individualizadas), e ao esquema individualizado da referência.",
      evitar: "Hepatopatia: é a última a ser reintroduzida depois de hepatotoxicidade. Fora da fase intensiva não tem papel no esquema básico.",
      contraind: "Rabdomiólise com mioglobinúria e insuficiência renal atribuída à pirazinamida: suspender e trocar por esquema sem ela (2RHE/7RH, na referência).",
      adversos: "Artralgia (analgésico ou anti-inflamatório), hiperuricemia (dieta hipopurínica e, se preciso, alopurinol ou colchicina), intolerância gástrica, hepatotoxicidade, exantema; rara: rabdomiólise.",
      monitor: "Criança: ajustar a dose a cada ganho de peso; exames bioquímicos só por indicação clínica (efeito adverso é raro na criança).",
      fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019"
    },
    {
      nome: "Piridoxina (vitamina B6)",
      id: "piridoxina",
      kw: "piridoxina vitamina b6 neuropatia isoniazida gestante diabetes hiv lactente",
      apres: "comprimido 50 mg (a RENAME 2024 também lista 40 mg no Anexo I — conferir na farmácia da unidade); a dose da criança e do lactente exige fracionar ou manipular",
      dose: [
        { rot: "Gestante em esquema com isoniazida — prevenção", val: "50 mg/dia", p: 111 },
        { rot: "Diabético em uso de isoniazida — prevenção", val: "50 mg/dia durante todo o tratamento com isoniazida", p: 115 },
        { rot: "PVHIV em uso de isoniazida (com antirretroviral) — prevenção", val: "50 mg/dia durante todo o tratamento", p: 117 },
        { rot: "Neuropatia periférica pela isoniazida (reação menor) — tratamento", val: "50 mg/dia e avaliar a evolução", p: 128 },
        { rot: "PVHIV com neuropatia periférica (isoniazida + antirretroviral) — tratamento", val: "até 200 mg/dia", p: 135 },
        { rot: "Criança com TB e HIV ou desnutrição", val: "5 a 10 mg/dia", p: 108 },
        { rot: "Lactente de mãe em uso de isoniazida, só em aleitamento exclusivo", val: "1 a 2 mg/kg/dia, entre 10 e 50 mg/dia", p: 178 }
      ],
      porque: "A isoniazida esgota a vitamina B6 e causa neuropatia periférica; a piridoxina previne e trata esse efeito, e reduz o risco de efeito no sistema nervoso.",
      escolher: "Junto com a isoniazida em quem tem risco aumentado de neuropatia: gestante, diabético, PVHIV, criança com HIV ou desnutrida; e para tratar a neuropatia que aparecer.",
      evitar: "Não é motivo para trocar o esquema: neuropatia por isoniazida é reação menor, manejada na APS.",
      contraind: "O Manual de TB 2019 não descreve contraindicação.",
      adversos: "O Manual de TB 2019 não descreve.",
      monitor: "Perguntar por formigamento e dormência em toda consulta do tratamento com isoniazida.",
      fonte: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Hansenostáticos",
  kw: "hanseniase pqt pqtu poliquimioterapia rifampicina clofazimina dapsona paucibacilar multibacilar",
  quando: "Tratamento da infecção pelo M. leprae: PQT-U para todo caso de hanseníase, paucibacilar ou multibacilar, na própria APS.",
  nota: "O blíster é escolhido pelo PESO (acima de 50 kg, Adulto; 30 a 50 kg, Infantil; abaixo de 30 kg, dose por kg), e a classificação operacional define só o número de doses mensais.",
  farmacos: [
    {
      nome: "PQT-U (rifampicina + clofazimina + dapsona)",
      id: "pqt-u",
      kw: "pqt pqtu poliquimioterapia unica hanseniase rifampicina clofazimina dapsona blister paucibacilar multibacilar",
      apres: "blíster PQT-U Adulto (rifampicina 300 mg + 300 mg, clofazimina 100 mg + 50 mg, dapsona 100 mg) e PQT-U Infantil (rifampicina 300 mg + 150 mg, clofazimina 50 mg, dapsona 50 mg); para a adaptação abaixo de 30 kg, rifampicina suspensão oral 20 mg/mL e clofazimina cápsula 50 mg e 100 mg",
      dose: [
        { rot: "Acima de 50 kg (adulto ou criança) — PQT-U Adulto, dose mensal supervisionada", val: "rifampicina 600 mg + clofazimina 300 mg + dapsona 100 mg, 1 vez por mês, tomados na unidade", p: 58 },
        { rot: "Acima de 50 kg — PQT-U Adulto, dose autoadministrada", val: "clofazimina 50 mg/dia + dapsona 100 mg/dia", p: 58 },
        { rot: "30 a 50 kg (criança ou adulto) — PQT-U Infantil, dose mensal supervisionada", val: "rifampicina 450 mg + clofazimina 150 mg + dapsona 50 mg, 1 vez por mês, tomados na unidade", p: 58 },
        { rot: "30 a 50 kg — PQT-U Infantil, dose autoadministrada", val: "clofazimina 50 mg em dias alternados + dapsona 50 mg/dia", p: 58 },
        { rot: "Criança abaixo de 30 kg — adaptação da PQT-U Infantil, dose mensal supervisionada", val: "rifampicina 10 mg/kg (há suspensão oral 20 mg/mL) + clofazimina 6 mg/kg + dapsona 2 mg/kg", p: 58 },
        { rot: "Criança abaixo de 30 kg — adaptação, dose autoadministrada", val: "clofazimina 1 mg/kg/dia (somar a dose da semana e dividir em duas ou três tomadas, porque só há cápsula de 50 e 100 mg: criança de 15 kg = 105 mg por semana, uma cápsula de 50 mg duas vezes por semana) + dapsona 2 mg/kg/dia", p: 58 },
        { rot: "Duração — paucibacilar (PB)", val: "6 doses mensais supervisionadas, em até nove meses", p: 58 },
        { rot: "Duração — multibacilar (MB)", val: "12 doses mensais supervisionadas, em até 18 meses; o PCDT não autoriza estender além de 12 meses", p: 58 }
      ],
      porque: "Três antimicrobianos para todo caso: a rifampicina é o único bactericida potente do esquema e nunca vai sozinha, para não selecionar resistência; dapsona e clofazimina completam, e a clofazimina ainda tem efeito anti-inflamatório que ajuda a prevenir o eritema nodoso. Desde 2021 o Brasil usa o mesmo esquema para PB e MB: o que muda é o número de doses.",
      escolher: "A apresentação sai do PESO, não da idade: acima de 50 kg, Adulto; de 30 a 50 kg, Infantil, inclusive o adulto magro; abaixo de 30 kg, dose por kg. A classificação (PB ou MB) define só a duração; na dúvida de classificação, tratar como MB.",
      evitar: "Estender a PQT-U porque a lesão não regrediu (a regressão leva meses a anos); persistência suspeita vai para investigação de resistência. Trocar componente por efeito adverso sem avaliação criteriosa: troca inadequada gera resistência. A pigmentação da clofazimina não é motivo de suspensão, salvo risco real de abandono.",
      contraind: "O PCDT não lista contraindicação absoluta à PQT-U. Reação adversa relevante e irreversível a um componente caracteriza falha e leva ao esquema de segunda linha (Quadros 4 a 6 do PCDT). Gestação e amamentação: manter (rifampicina nas últimas semanas de gestação pode causar hemorragia pós-natal na mãe e no recém-nascido — vitamina K). Dapsona: cautela com antimalárico, deficiência de G6PD e outros fármacos hemolíticos ou mielodepressores.",
      adversos: "Dapsona: hemólise e anemia (mais em mulheres e idosos, sobretudo no primeiro trimestre de tratamento), raramente agranulocitose, hepatopatia, nefropatia, psicose e síndrome sulfônica. Clofazimina: pigmentação da pele de vermelha a castanho-escura (some em 6 a 12 meses após parar), urina, escarro e suor rosados, ictiose, cólica e diarreia. Rifampicina na dose mensal: eventos raros; aumento leve e transitório de transaminases não obriga a parar. Rifampicina pode reduzir o anticoncepcional oral: trocar ou associar método.",
      monitor: "Dose mensal supervisionada na unidade, com consulta (é ela que atesta a adesão); ANS no diagnóstico, a cada 3 meses e na última dose; hemograma nos primeiros meses (dapsona). Alta por cura com todas as doses supervisionadas feitas, avaliação clínica e ANS.",
      fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022"
    },
    {
      nome: "Clofazimina",
      id: "clofazimina",
      kw: "clofazimina eritema nodoso hansenico enh crianca reacao tipo 2 hanseniase",
      apres: "cápsula 50 mg e 100 mg (na PQT-U, a clofazimina já vem no blíster)",
      dose: [
        { rot: "Criança — eritema nodoso hansênico (decisão de clínico experiente)", val: "1,5 a 2 mg/kg três vezes ao dia no primeiro mês, duas vezes ao dia no segundo mês e uma vez ao dia no terceiro mês; máximo de 300 mg/dia; dose diária fracionada, com alimento", p: 62 },
        { rot: "Adulto e criança — tratamento da infecção (PQT-U)", val: "a dose da clofazimina na PQT-U está no cartão PQT-U, pela faixa de peso" }
      ],
      porque: "Corante de fenazina com ação antimicobacteriana e anti-inflamatória: por isso trata o eritema nodoso hansênico na criança, em quem a talidomida não é autorizada.",
      escolher: "Eritema nodoso hansênico na criança (a talidomida é proibida abaixo de 18 anos), por decisão de clínico experiente: a farmacocinética é pouco conhecida e o acúmulo depende da gordura subcutânea.",
      evitar: "Prescrever sem clínico experiente. Manter durante gastroenterite aguda: suspender por alguns dias.",
      contraind: "O PCDT não traz lista própria para esse uso; avisar a família do risco de dor abdominal aguda por sobrecarga de clofazimina.",
      adversos: "Dor abdominal aguda por sobrecarga; pigmentação da pele de vermelha a castanho-escura, urina, escarro e suor rosados, ictiose, cólica e diarreia. Antiácido e suco de laranja reduzem o nível.",
      monitor: "Dor abdominal e sintomas gastrointestinais a cada consulta; ANS como em toda reação hansênica.",
      fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Corticoide e imunomodulador",
  kw: "corticoide prednisona talidomida reacao hansenica neurite eritema nodoso imunomodulador",
  quando: "Reações hansênicas e neurite (PCDT Hanseníase 2022); a prednisona também é adjuvante na TB meningoencefálica e osteoarticular.",
  nota: "Na reação hansênica a PQT-U continua. Corticoide alivia a dor da neurite mas não protege o nervo sozinho: ANS seriada durante todo o curso.",
  farmacos: [
    {
      nome: "Prednisona",
      id: "prednisona",
      kw: "prednisona corticoide reacao reversa reacao tipo 1 neurite eritema nodoso orquite corticoterapia",
      apres: "comprimido 5 mg e 20 mg",
      dose: [
        { rot: "Adulto — reação tipo 1, neurite (inclusive silenciosa) ou reação tipo 2 com neurite, orquite ou olho acometido: dose inicial", val: "1 mg/kg/dia, via oral", p: 61 },
        { rot: "Adulto — mesma indicação: redução", val: "cerca de 10 mg a cada 15 dias até 20 mg/dia; depois 5 mg a cada 15 dias até 5 mg/dia; manter 5 mg/dia por 15 dias; depois 5 mg em dias alternados por mais 15 dias", p: 61 },
        { rot: "Adulto — mesma indicação: duração", val: "no mínimo seis meses, em média, com ANS periódica", p: 61 },
        { rot: "Criança — reação tipo 1", val: "o regime do adulto adaptado ao peso e à idade; orientação pediátrica se passar de três meses ou de 1 mg/kg; nunca suspender de repente (insuficiência adrenal)", p: 62 },
        { rot: "Adulto e adolescente (≥ 10 anos) — TB meningoencefálica ou osteoarticular, adjuvante (início no hospital ou na referência)", val: "1 a 2 mg/kg/dia por quatro semanas, com redução gradual nas quatro semanas seguintes; não suspender de uma vez (forma grave meningoencefálica: dexametasona injetável na internação)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019", p: 107 },
        { rot: "Criança abaixo de 10 anos — TB meningoencefálica ou osteoarticular, adjuvante (início no hospital ou na referência)", val: "1 a 2 mg/kg/dia por quatro semanas, com redução gradual nas quatro semanas seguintes; não suspender de uma vez (forma grave meningoencefálica: dexametasona injetável na internação)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019", p: 109 }
      ],
      porque: "Corticoide oral de escolha nas reações hansênicas e na neurite: o anti-inflamatório potente controla a inflamação do nervo e previne o dano neural permanente. Vira prednisolona, a forma ativa, no fígado.",
      escolher: "Reação tipo 1, neurite aguda e neurite silenciosa (piora da ANS mesmo sem dor) e reação tipo 2 com neurite, orquite ou episclerite. Na gestação, só se o benefício superar o risco; na amamentação pode, adiando a mamada até quatro horas depois da tomada.",
      evitar: "Suspender de repente, sobretudo na criança. Usar como analgésico da neurite sem repetir a ANS. Iniciar sem a profilaxia de estrongiloidíase (ver combinação).",
      contraind: "O PCDT não traz lista própria. Contraindicação formal ao corticoide é um dos critérios para avaliar cirurgia de descompressão neural.",
      adversos: "Dependentes de dose e duração: ganho de peso, retenção de sódio e líquido, hipertensão, hiperglicemia e descompensação do diabetes, perda de potássio, miopatia, osteoporose com fratura vertebral, necrose asséptica de cabeça de fêmur e úmero, úlcera péptica, catarata e glaucoma, alteração de humor e psicose, Cushing iatrogênico, supressão adrenal, estrongiloidíase disseminada.",
      monitor: "ANS periódica durante a corticoterapia; PA, glicemia e peso; na gestante, glicemia e PA com mais atenção. Rifampicina, fenitoína e fenobarbital reduzem o efeito do corticoide; com diurético que espolia potássio, dosar potássio.",
      fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022"
    },
    {
      nome: "Talidomida",
      id: "talidomida",
      kw: "talidomida eritema nodoso hansenico enh reacao tipo 2 teratogenica c3 imunomodulador",
      apres: "comprimido 100 mg",
      dose: [
        { rot: "Adulto (18 anos ou mais) — reação tipo 2 (eritema nodoso hansênico) SEM neurite, orquite ou episclerite", val: "100 a 400 mg/dia, via oral, conforme a intensidade do quadro; reduzir gradualmente conforme a resposta", p: 61 }
      ],
      porque: "Imunomodulador que suprime o TNF-alfa: é altamente eficaz no eritema nodoso hansênico e controla o quadro mais rápido que a pentoxifilina, com remissão mais longa.",
      escolher: "Primeira escolha no ENH sem neurite, orquite ou olho acometido — nesses, corticoide. Em mulher com potencial reprodutivo sem neurite, a pentoxifilina é a alternativa quando a talidomida não pode.",
      evitar: "Gestação e amamentação (proibida). Menor de 18 anos (não autorizada). Neuropatia periférica instalada (pode agravá-la), risco de convulsão e associação com outros sedativos: pesar risco e benefício.",
      contraind: "Gestação; amamentação; menor de 18 anos (registro só para adulto); neutrófilos abaixo de 750/mm³ (não iniciar). Mulher com potencial reprodutivo só em caso excepcional, esgotadas as alternativas: dois métodos contraceptivos ao mesmo tempo, um de alta eficácia (hormonal, de preferência injetável, implante ou DIU) e outro eficaz (preservativo masculino ou feminino, diafragma), desde quatro semanas antes até quatro semanas depois; β-hCG até 24 horas antes de começar e a cada retirada, e semanal no primeiro mês. Homem: preservativo em toda relação com mulher que pode engravidar, mesmo vasectomizado, até quatro semanas após a última dose.",
      adversos: "Teratogênica mesmo em dose única de 50 mg (focomelia, a mais comum, e malformações de crânio, olhos, orelhas, palato, coração, trato digestivo, vias urinárias e rins). Neuropatia periférica possivelmente irreversível; sonolência (soma com ansiolítico, hipnótico, antipsicótico, anti-histamínico, opioide, tricíclico e álcool); bradicardia; neutropenia; tromboembolismo quando associada a corticoide.",
      monitor: "Exame neurológico antes e durante (parestesia, fraqueza ou incoordenação: reavaliar já); β-hCG conforme acima; neutrófilos. Suspeita de exposição fetal é notificada à Anvisa pelo Vigimed. Com corticoide associado, AAS profilático (ver combinação).",
      fonte: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antirretrovirais na profilaxia do HIV (PrEP e PEP)",
  kw: "antirretroviral arv hiv prep pep profilaxia pre exposicao pos exposicao tenofovir entricitabina lamivudina dolutegravir zidovudina darunavir ritonavir violencia sexual",
  quando: "PrEP: uso contínuo ou sob demanda por quem tem exposição repetida ao HIV. PEP: até 72 horas após uma exposição de risco, por 28 dias, com teste rápido de HIV não reagente.",
  nota: "O esquema preferencial da PEP tem três fármacos: tenofovir/lamivudina + dolutegravir. " +
        "Os outros cartões desta classe são as trocas previstas no PCDT quando um dos dois não pode ser usado. " +
        "A dose pediátrica da PEP não está no PCDT PEP: a linha da criança diz a faixa de peso e manda conferir no PCDT de HIV pediátrico.",
  farmacos: [
    {
      nome: "Tenofovir + entricitabina (PrEP)",
      id: "tenofovir-entricitabina",
      kw: "prep tdf ftc truvada pre exposicao profilaxia diaria sob demanda 2 1 1",
      apres: "comprimido coformulado: fumarato de tenofovir desoproxila 300 mg + entricitabina 200 mg",
      dose: [
        { rot: "PrEP diária — qualquer pessoa elegível (acima de 15 anos e com mais de 35 kg)",
          val: "2 comprimidos no 1º dia, depois 1 comprimido por dia", p: 37 },
        { rot: "PrEP sob demanda (2 + 1 + 1) — só homem cis, pessoa não binária designada homem ao nascer, travesti e mulher trans SEM estradiol, com sexo menos de 2 vezes por semana e planejável",
          val: "2 comprimidos de 2 a 24 horas antes da relação + 1 comprimido 24 horas após a dose inicial + 1 comprimido 24 horas após a segunda dose", p: 39 },
        { rot: "Sob demanda — nova relação nos dias seguintes ao 2 + 1 + 1",
          val: "1 comprimido por dia até 48 horas após o último evento sexual; se passar mais de 1 dia sem comprimido antes da próxima relação, reiniciar o 2 + 1 + 1", p: 40 },
        { rot: "Parar com segurança — mulher cis, pessoa trans designada mulher ao nascer e qualquer pessoa em uso de estradiol",
          val: "manter 1 comprimido por dia por 7 dias após a última prática sexual", p: 42 },
        { rot: "Parar com segurança — homem cis, pessoa não binária designada homem ao nascer, travesti e mulher trans sem estradiol",
          val: "manter 1 comprimido por dia por 2 dias após a última prática sexual", p: 42 }
      ],
      porque: "Dois antirretrovirais em dose fixa tomados ANTES da exposição. É o único esquema de PrEP do SUS. " +
              "A proteção não é imediata: começa após 7 dias de uso na mulher cis, na pessoa trans designada mulher ao nascer e em quem usa estradiol, " +
              "e após 2 horas no homem cis, na pessoa não binária designada homem ao nascer e na travesti ou mulher trans sem estradiol. " +
              "A eficácia depende da adesão.",
      escolher: "Diária serve para qualquer pessoa elegível e deve ser a modalidade de escolha na hepatite B crônica (o uso intermitente pode induzir resistência do vírus B ao tenofovir). " +
                "Sob demanda só para o grupo do rótulo da dose, com sexo menos de 2 vezes por semana e capaz de planejar a tomada pelo menos 2 horas antes; " +
                "se o sexo ficar mais frequente, passa para a diária. Pode ser indicada na gestação e no aleitamento a quem tem alto risco de infecção. " +
                "Não há contraindicação à PrEP diária com hormonização feminilizante ou masculinizante (quem usa estradiol não usa a sob demanda); contraceptivo, álcool e outras drogas não reduzem a eficácia.",
      evitar: "Suspeita de infecção aguda pelo HIV: não iniciar, pedir carga viral e esperar o diagnóstico. " +
              "Sob demanda não serve para mulher cis, pessoa designada mulher ao nascer, quem usa estradiol nem para sexo neovaginal receptivo (sem evidência de proteção). " +
              "Hepatite B crônica: não interromper sem avaliação médica (flare, descompensação e óbito no cirrótico).",
      contraind: "Teste de HIV reagente (aí é TARV, não PrEP). Clearance de creatinina estimado abaixo de 60 mL/min — no seguimento, repetir em outro dia antes de suspender.",
      adversos: "Náusea, cefaleia, flatulência, fezes amolecidas ou diarreia e edema, em geral transitórios nos primeiros meses. " +
                "Queda discreta do clearance de creatinina, reversível ao parar; raros casos de insuficiência renal aguda e síndrome de Fanconi. " +
                "Redução da densidade mineral óssea que reverte com a interrupção, sem aumento de fraturas nos estudos.",
      monitor: "Teste de HIV após 1 mês e depois em toda consulta (quadrimestral); sífilis quadrimestral; clamídia e gonococo semestral; " +
               "anti-HCV quadrimestral se não reagente antes; HBsAg e anti-HBs anual em quem é suscetível; teste de gravidez quadrimestral; peso. " +
               "Creatinina inicial opcional abaixo de 30 anos sem fator de risco e obrigatória a partir de 30 anos ou com fator de risco; " +
               "depois a cada 12 meses (menos de 50 anos, sem comorbidade, ClCr inicial de 90 ou mais) ou a cada 6 meses (mais de 50 anos, HAS, diabetes ou ClCr abaixo de 90). " +
               "Adesão mínima protetora: 6 comprimidos por semana (mulher cis e quem usa estradiol) ou 4 (homem cis, travesti e mulher trans sem estradiol). " +
               "Primeira dispensação para 30 dias; consultas a cada 120 dias; após 1 ano sem interrupção, pode ir a 6 meses.",
      fonte: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025"
    },
    {
      nome: "Tenofovir + lamivudina (PEP)",
      id: "tenofovir-lamivudina",
      kw: "pep tdf 3tc pos exposicao profilaxia violencia sexual acidente perfurocortante 28 dias",
      apres: "comprimido coformulado: fumarato de tenofovir desoproxila 300 mg + lamivudina 300 mg; alternativa: comprimido de tenofovir 300 mg + comprimido de lamivudina 150 mg",
      dose: [
        { rot: "Adulto — PEP, esquema preferencial com dolutegravir (gestante: o mesmo, em qualquer idade gestacional)",
          val: "1 comprimido coformulado (300 mg + 300 mg) VO 1 vez ao dia, por 28 dias", p: 10 },
        { rot: "Adulto — sem o comprimido coformulado",
          val: "1 comprimido de tenofovir 300 mg + 2 comprimidos de lamivudina 150 mg, VO 1 vez ao dia, por 28 dias", p: 11 },
        { rot: "Criança ou adolescente — PEP",
          val: "tenofovir + lamivudina só a partir de 35 kg (de 6 a 12 anos e a partir de 12 anos, sempre com dolutegravir); abaixo de 35 kg a dupla é zidovudina + lamivudina. " +
               "A posologia pediátrica NÃO está no PCDT PEP — conferir no PCDT de HIV em crianças e adolescentes, Módulo 2", p: 16 }
      ],
      porque: "Dois inibidores da transcriptase reversa ativos contra o HIV e contra o vírus da hepatite B. " +
              "Com o dolutegravir forma o esquema preferencial de PEP: pouca toxicidade e poucos comprimidos, o que favorece completar os 28 dias.",
      escolher: "Primeira escolha para qualquer PEP indicada, qualquer que seja a exposição ou o material, inclusive gestante, pessoa com potencial de engravidar e quem vive com hepatite B " +
                "(neste caso inicia a PEP e é encaminhado ao serviço de referência; quem já trata hepatite B com tenofovir ou entecavir usa o esquema preferencial nos 28 dias). " +
                "HBsAg reagente no teste rápido não impede a PEP.",
      evitar: "Doença renal prévia ou fator de risco (diabetes, HAS descontrolada): avaliar — a exposição é curta e a toxicidade costuma reverter ao parar. " +
              "Se o tenofovir for contraindicado, trocar pela zidovudina/lamivudina. " +
              "Quem tem hepatite B pode ter flare ao terminar a PEP: orientar e encaminhar.",
      contraind: "Insuficiência renal aguda (nota do Quadro 5). Cautela com taxa de filtração glomerular abaixo de 50 mL/min.",
      adversos: "Sintomas gastrointestinais, cefaleia e fadiga, em geral leves e autolimitados; alterações laboratoriais discretas e transitórias. " +
                "Toxicidade renal, sobretudo em quem já tem doença renal. Exacerbação (flare) da hepatite B após a suspensão.",
      monitor: "Teste de HIV no atendimento, na 4ª e na 12ª semana (em sangue; não usar teste de fluido oral). " +
               "Creatinina no 1º atendimento só em alto risco ou doença renal prévia; ALT, AST e amilase se houver efeito adverso. " +
               "Retorno em 4 semanas para efeito adverso e adesão. Dispensar os 28 dias de uma vez, sem fracionar.",
      fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
    },
    {
      nome: "Dolutegravir",
      id: "dolutegravir",
      kw: "dtg pep inibidor de integrase terceiro farmaco gestante crianca dispersivel",
      apres: "comprimido revestido 50 mg; comprimido dispersível 5 mg (criança)",
      dose: [
        { rot: "Adulto — PEP, com tenofovir/lamivudina (gestante: o mesmo, em qualquer idade gestacional)",
          val: "50 mg (1 comprimido) VO 1 vez ao dia, por 28 dias", p: 10 },
        { rot: "Adulto em uso de rifampicina, carbamazepina, fenitoína ou fenobarbital",
          val: "50 mg VO de 12 em 12 horas (dose dobrada), mantendo tenofovir/lamivudina 1 vez ao dia", p: 12 },
        { rot: "Criança acima de 6 anos com 20 kg ou mais, e adolescente com 20 kg ou mais — PEP",
          val: "comprimido revestido de 50 mg, 1 vez ao dia, como no adulto. Quem não engole comprimido usa o dispersível, em dose DIFERENTE, que não está no PCDT PEP: ver Módulo 2 e bula", p: 16 },
        { rot: "Criança de 4 semanas a 6 anos, de 3 a 19 kg — PEP",
          val: "SEM DOSE NESTE CARTÃO — o PCDT PEP não traz a posologia por peso. Usar o PCDT de HIV em crianças e adolescentes (Módulo 2) e a bula do comprimido dispersível de 5 mg", p: 16 }
      ],
      porque: "Inibidor de integrase com alta barreira genética: não há registro de resistência transmitida a essa classe no Brasil. " +
              "Esquemas com dolutegravir são superiores aos outros disponíveis para PEP, com baixa toxicidade e poucos comprimidos.",
      escolher: "Terceiro fármaco de toda PEP: adulto, adolescente, gestante em qualquer idade gestacional, pessoa com potencial de engravidar e criança a partir de 4 semanas e 3 kg. " +
                "Uso no período periconcepcional e no 1º trimestre não aumenta defeito do tubo neural. " +
                "Pode ser usado com contraceptivo oral e com hormônios para feminização.",
      evitar: "Dofetilida e pilsicainida: dolutegravir não recomendado — usar darunavir + ritonavir. " +
              "Oxcarbazepina: o PCDT se contradiz na mesma página (dobrar a dose como na carbamazepina, ou trocar por darunavir + ritonavir) — decidir com a referência. " +
              "Metformina: o dolutegravir aumenta o nível dela e pode causar hipoglicemia. " +
              "Criança abaixo de 4 semanas ou de 3 kg: sem dados de segurança.",
      contraind: "Contraindicação ou intolerância ao dolutegravir; uso de dofetilida ou pilsicainida. Nestes casos o terceiro fármaco é darunavir + ritonavir.",
      adversos: "Sintomas gastrointestinais, cefaleia e fadiga, em geral leves e autolimitados. Baixo potencial de interação, com as exceções acima.",
      monitor: "Glicemia em quem tem diabetes, sobretudo se usa metformina. Conferir interações antes de prescrever (lista do PCDT e bases de interação com HIV).",
      fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
    },
    {
      nome: "Zidovudina + lamivudina (PEP sem tenofovir)",
      id: "zidovudina-lamivudina",
      kw: "azt 3tc biovir pep alternativa sem tenofovir renal crianca",
      apres: "comprimido coformulado: zidovudina 300 mg + lamivudina 150 mg",
      dose: [
        { rot: "Adulto — PEP quando o tenofovir não pode ser usado, com dolutegravir (gestante: o mesmo)",
          val: "1 comprimido (300 mg + 150 mg) VO 2 vezes ao dia, por 28 dias", p: 12 },
        { rot: "Criança ou adolescente abaixo de 35 kg, a partir de 4 semanas; abaixo de 4 semanas, Módulo 1",
          val: "zidovudina + lamivudina é a dupla abaixo de 35 kg, com dolutegravir; a posologia por peso NÃO está no PCDT PEP — conferir no PCDT de HIV em crianças e adolescentes, Módulo 2. Abaixo de 4 semanas o esquema é outro: Módulo 1", p: 16 }
      ],
      porque: "Dupla de inibidores da transcriptase reversa que substitui o tenofovir/lamivudina quando o tenofovir é contraindicado ou não tolerado. " +
              "Em criança é a dupla com mais evidência e com menos descontinuação que no adulto.",
      escolher: "Adulto com insuficiência renal aguda ou outra contraindicação ao tenofovir. " +
                "Criança abaixo de 35 kg (o tenofovir só entra a partir desse peso).",
      evitar: "Esquema de 2 tomadas por dia: pior para a adesão que o preferencial — usar só quando o tenofovir não serve. " +
              "Suspeita de anemia: pedir hemograma, sem atrasar o início da PEP.",
      contraind: "O PCDT PEP não lista contraindicação específica da zidovudina/lamivudina; ela é a alternativa justamente para quem não pode usar tenofovir.",
      adversos: "Sintomas gastrointestinais, cefaleia e fadiga. Anemia — por isso o PCDT pede hemograma quando a PEP usa zidovudina.",
      monitor: "Hemograma quando a PEP usar zidovudina. Teste de HIV no atendimento, na 4ª e na 12ª semana.",
      fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
    },
    {
      nome: "Darunavir + ritonavir (PEP sem dolutegravir)",
      id: "darunavir-ritonavir",
      kw: "drv rtv inibidor de protease pep alternativa sem dolutegravir dofetilida gestante",
      apres: "darunavir comprimido 800 mg (e 600 mg para a gestante); ritonavir comprimido 100 mg — comprimidos separados",
      dose: [
        { rot: "Adulto — PEP quando o dolutegravir não pode ser usado, com tenofovir/lamivudina",
          val: "darunavir 800 mg VO 1 vez ao dia + ritonavir 100 mg VO 1 vez ao dia, por 28 dias", p: 12 },
        { rot: "Gestante — PEP quando o dolutegravir não pode ser usado",
          val: "darunavir 600 mg + ritonavir 100 mg, ambos VO 2 vezes ao dia, por 28 dias (com tenofovir/lamivudina)", p: 14 },
        { rot: "Parto durante os 28 dias da PEP",
          val: "completar os 28 dias com darunavir 800 mg + ritonavir 100 mg, ambos 1 vez ao dia, se não há mutação de resistência ao darunavir documentada; a troca pode ser no parto ou cerca de 3 semanas depois", p: 14 },
        { rot: "Criança — PEP, só se o dolutegravir não puder ser usado",
          val: "darunavir acima de 3 anos e com 15 kg ou mais, se engolir o comprimido; abaixo disso: lopinavir/ritonavir, ver Módulo 2. A posologia por peso NÃO está no PCDT PEP — conferir no PCDT de HIV em crianças e adolescentes, Módulo 2", p: 16 }
      ],
      porque: "Inibidor de protease reforçado pelo ritonavir: o PCDT prescreve sempre o par, nunca o darunavir sozinho. " +
              "Poucos efeitos adversos e baixa perda de seguimento na PEP.",
      escolher: "Contraindicação ou intolerância ao dolutegravir; uso de dofetilida ou pilsicainida. " +
                "É a alternativa preferível se há suspeita de resistência transmitida pela pessoa-fonte ou de infecção aguda pelo HIV no exposto.",
      evitar: "Alto potencial de interação medicamentosa: conferir todos os fármacos em uso antes de prescrever. " +
              "Na gestante, não usar a dose única diária enquanto ela estiver grávida.",
      contraind: "Contraindicação a qualquer dos dois; mutação de resistência ao darunavir documentada impede a dose única diária no pós-parto.",
      adversos: "Poucos efeitos adversos no esquema de PEP; sintomas gastrointestinais, cefaleia e fadiga como nos demais.",
      monitor: "Revisar interações a cada fármaco novo durante os 28 dias. Teste de HIV no atendimento, na 4ª e na 12ª semana.",
      fonte: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
    }
  ]
});

/* =====================================================================
 * COMBINAÇÕES. Relação, não propriedade de um fármaco — por isso seção
 * própria, e não repetida em cada cartão.
 * ===================================================================== */

FARMACOS_APS.combos = {
  rot: "Combinações que se fazem",
  itens: [
    { id: "ges-aas-calcio-pe",
      t: "AAS + cálcio — prevenção de pré-eclâmpsia na gestante de risco",
      d: "Entram juntos quando há 1 fator de alto risco ou 2 de risco moderado: AAS à noite, iniciado " +
         "antes da 16ª semana e mantido até 36 semanas, e cálcio até o parto. Sem fator de risco, nenhum " +
         "dos dois.",
      f: "MS — Manual de Gestação de Alto Risco, 2022" },
    { id: "cro-dupla-inicial-has",
      t: "HAS — dois anti-hipertensivos de mecanismos diferentes desde o início",
      d: "No grau 1 com risco cardiovascular moderado ou alto, com lesão de órgão-alvo, e nos graus 2 e 3, o tratamento começa com dois anti-hipertensivos de mecanismos distintos (IECA ou BRA, BCC, tiazídico), cada um na menor dose. Associar classes é preferível a subir a dose ou trocar a monoterapia: mais controle, menos efeito adverso, menos abandono. As combinações fixas avaliadas (benazepril + anlodipino, losartana + hidroclorotiazida) não foram incorporadas: associar comprimidos separados. Exceção: idoso frágil (PCDT p. 32: 75 anos ou mais, ou ILPI, acamado, internação recente, AVE, demência, uma incapacidade funcional básica e os outros critérios da página), que começa em monoterapia.",
      f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025", p: 32 },
    { id: "cro-tripla-has",
      t: "HAS — IECA ou BRA + BCC de ação prolongada + tiazídico",
      d: "É a tripla de referência. Se a PA segue em 140/90 ou mais após seis meses com as três em dose máxima tolerada e boa adesão, é HAS resistente: a quarta classe preferencial é a espironolactona, e a suspeita de HAS resistente na APS é critério para investigar causa secundária.",
      f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025", p: 12 },
    { id: "cro-tiazidico-bcc-preta",
      t: "HAS na pessoa preta — tiazídico, sozinho ou com BCC",
      d: "Adultos pretos respondem menos à monoterapia com IECA ou BRA. O tiazídico é a primeira opção, isolado ou associado ao BCC na terapia combinada.",
      f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
    { id: "cro-metformina-segunda-linha",
      t: "DM2 — metformina + sulfonilureia, dapagliflozina ou insulina",
      d: "Fora da meta com metformina (reavaliar em 3 a 6 meses, no máximo) somar a segunda linha; com HbA1c acima de 7,5% já no diagnóstico, pode-se considerar começar combinado. A dapagliflozina entra na segunda intensificação, pelos critérios do PCDT.",
      f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026", p: 21 },
    { id: "cro-metformina-nph",
      t: "DM2 — metformina (com ou sem sulfonilureia) + insulina NPH ao deitar",
      d: "Ao iniciar a insulina basal, manter a metformina pelo benefício glicêmico e metabólico, salvo contraindicação. A sulfonilureia pode continuar enquanto a insulina for só basal (NPH ou análogo prolongado).",
      f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026" },
    { id: "mul-dupla-protecao",
      t: "Preservativo + outro método contraceptivo (dupla proteção)",
      d: "O outro método evita a gravidez; só o preservativo, masculino ou feminino, protege contra IST, HIV e hepatites virais. A dupla proteção deve ser sempre incentivada.",
      f: "MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017" },
    { id: "mul-th-estrogenio-progestageno",
      t: "Estrogênio + progestágeno na terapia hormonal da mulher com útero",
      d: "Na mulher com útero, a associação com progestágeno é mandatória: cíclica, 12 a 14 dias por ciclo (com sangramento vaginal), ou contínua por via oral (sem sangramento). Opções: medroxiprogesterona ou progesterona micronizada.",
      f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
    { id: "pal-opioide-laxante", t: "Opioide + laxante irritativo de horário",
      d: "A constipação por opioide não cria tolerância e dura todo o tratamento, por qualquer via. O laxante irritativo entra junto com o opioide, de horário; o osmótico se associa quando o irritativo não basta.",
      f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
    { id: "pal-dispneia-opioide-ansiolitico", t: "Opioide + benzodiazepínico na dispneia com ansiedade",
      d: "A ansiedade costuma andar com a dispneia. O ansiolítico tem papel, mas não se usa isolado na dispneia: entra junto com o opioide. Começar no menor degrau e vigiar sedação e frequência respiratória.",
      f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
    { id: "ist-gonorreia-dupla",
      t: "Ceftriaxona + azitromicina — gonorreia, cervicite e uretrite sem agente identificado",
      d: "A ceftriaxona trata o gonococo; a azitromicina cobre a clamídia que costuma vir junto e completa " +
         "o esquema. O gonococo brasileiro é resistente a penicilina, tetraciclina e ciprofloxacino e já " +
         "mostra resistência emergente à azitromicina: por isso ela não vai sozinha na dose habitual.",
      f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022" },
    { id: "ist-dip-tripla",
      t: "Ceftriaxona + doxiciclina + metronidazol — DIP ambulatorial",
      d: "A DIP é polimicrobiana: gonococo (ceftriaxona), clamídia (doxiciclina, mais estudada que a " +
         "azitromicina na DIP) e anaeróbios e vaginose (metronidazol). Monoterapia não é recomendada, e " +
         "quinolona empírica também não, pela resistência do gonococo. Na gestante, a DIP é tratada " +
         "internada, sem doxiciclina.",
      f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022" },
    { id: "han-corticoide-antiparasitario", t: "Prednisona da reação hansênica + albendazol ou ivermectina", d: "Adulto: ao INICIAR o corticoide da reação ou da neurite, albendazol 400 mg/dia por três dias seguidos, ou ivermectina 200 mcg/kg em dose única (p. 61). Criança: o PCDT manda o anti-helmíntico no início do corticoide, mas não traz dose pediátrica (p. 62) — VERIFICAR antes de prescrever.", f: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022", p: 61 },
    { id: "han-talidomida-corticoide-aas", t: "Talidomida + corticoide na reação tipo 2", d: "Quando a talidomida é associada ao corticoide, prescrever ácido acetilsalicílico 100 mg/dia como profilaxia de tromboembolismo; quem tem outro fator de risco trombótico precisa de avaliação própria.", f: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022", p: 61 },
    { id: "vul-pep-preferencial",
      t: "PEP preferencial — tenofovir/lamivudina + dolutegravir",
      d: "Para qualquer exposição e qualquer material de risco, inclusive gestante em qualquer idade gestacional e pessoa com potencial de engravidar. " +
         "Um comprimido de cada por dia, por 28 dias, dispensados de uma vez e sem fracionar.",
      f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024" },
    { id: "vul-pep-sem-tenofovir",
      t: "PEP sem tenofovir — zidovudina/lamivudina + dolutegravir",
      d: "Quando o tenofovir é contraindicado (insuficiência renal aguda) ou não tolerado. " +
         "A zidovudina/lamivudina é tomada 2 vezes ao dia; pedir hemograma se houver suspeita de anemia, sem atrasar o início da PEP.",
      f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024" },
    { id: "vul-pep-sem-dolutegravir",
      t: "PEP sem dolutegravir — tenofovir/lamivudina + darunavir + ritonavir",
      d: "Contraindicação ou intolerância ao dolutegravir, uso de dofetilida ou pilsicainida, suspeita de resistência transmitida pela fonte ou de infecção aguda pelo HIV no exposto. " +
         "Na gestante, darunavir 600 mg e ritonavir 2 vezes ao dia durante os 28 dias; se o parto ocorrer antes do fim, completar com a dose de 1 vez ao dia.",
      f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024" },
    { id: "vul-pep-para-prep",
      t: "PEP seguida de PrEP, sem intervalo",
      d: "Quem procura PEP repetidamente termina os 28 dias, exclui o HIV com teste rápido ou sorologia em sangue e já inicia a PrEP (tenofovir/entricitabina), " +
         "sem lacuna entre as duas, com os exames iniciais da PrEP que ainda faltarem.",
      f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" }
  ]
};

FARMACOS_APS.proibidos = {
  rot: "Combinações que NÃO se fazem",
  itens: [
    { id: "ges-ieca-bra-gestacao",
      t: "IECA ou BRA na gestante (captopril, enalapril, losartana)",
      d: "MECANISMO: os fármacos que agem no sistema renina-angiotensina trazem risco de anormalidades " +
         "fetais e de nefrotoxicidade fetal. Desfecho: dano fetal — não devem ser usados de forma alguma na " +
         "gestação e devem ser substituídos assim que a gravidez é confirmada. No puerpério, inclusive na " +
         "lactação, voltam a ser opção para o Manual (enalapril e captopril no Quadro 3); o CAB 32 (Quadro " +
         "19) põe telmisartana e valsartana como potencialmente perigosos na lactante.",
      f: "MS — Manual de Gestação de Alto Risco, 2022" },
    { id: "cro-ieca-bra",
      t: "IECA + BRA (ex.: enalapril ou captopril + losartana)",
      d: "MECANISMO: os dois bloqueiam o mesmo eixo renina-angiotensina — o IECA impede a formação da angiotensina II e o BRA bloqueia o seu receptor (PCDT p. 41 e 42). Que somados acumulem hipercalemia e piora da função renal é inferência a partir dos eventos adversos que o PCDT descreve para cada classe; o PCDT não dá o mecanismo da contraindicação. DESFECHO: o PCDT contraindica o BRA em quem já usa IECA e o IECA em quem já usa BRA.",
      f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025", p: 41 },
    { id: "cro-betabloqueador-verapamil",
      t: "Betabloqueador + verapamil (BCC não di-hidropiridínico)",
      d: "MECANISMO: os dois deprimem o nó sinusal e a condução atrioventricular; cada um, sozinho, já é contraindicado em bradicardia e em bloqueio atrioventricular de alto grau. DESFECHO: redução acentuada da frequência cardíaca. O PCDT não recomenda a associação (Figura 2, nota h).",
      f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025", p: 40 },
    { id: "cro-nifedipino-rifampicina",
      t: "Nifedipino + rifampicina",
      d: "MECANISMO: a rifampicina é indutora enzimática e acelera o metabolismo do nifedipino. DESFECHO: o nifedipino não atinge nível plasmático eficaz e a PA não controla. O PCDT contraindica a associação: no hipertenso em uso de rifampicina, escolher outra classe.",
      f: "MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025" },
    { id: "cro-sulfonilureia-insulina-bolus",
      t: "Sulfonilureia + insulina bolus (regular ou análogo rápido) — o PCDT diz 'sem benefício', não é contraindicação",
      d: "MECANISMO (inferência; o PCDT não descreve): a sulfonilureia age liberando insulina do próprio pâncreas; com a insulina das refeições aplicada, o ganho deixa de existir e fica o risco de hipoglicemia que a classe já carrega. DESFECHO: o PCDT diz que as sulfonilureias geralmente não apresentam benefício com insulina bolus e devem ser mantidas só enquanto a insulina for apenas basal (p. 38).",
      f: "MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026", p: 38 },
    { id: "mul-estrogenio-enxaqueca-aura",
      t: "Contraceptivo com estrogênio (AOC, injetável mensal) + enxaqueca com aura",
      d: "MECANISMO: a enxaqueca com aura já eleva o risco de AVC isquêmico, e o método combinado soma — usuárias de AOC com história de enxaqueca têm de 2 a 4 vezes mais AVC isquêmico. " +
         "Categoria 4 em qualquer idade, para iniciar e para continuar; enxaqueca sem aura a partir dos 35 anos é 3 para iniciar e 4 para continuar. " +
         "Saída: DIU de cobre (1) ou progestágeno isolado (2 para iniciar, 3 para continuar).",
      f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
    { id: "mul-estrogenio-tabagismo-35",
      t: "AOC + tabagismo a partir dos 35 anos",
      d: "MECANISMO: usuárias de AOC que fumam têm mais doença cardiovascular, sobretudo infarto, e o risco cresce com o número de cigarros por dia. " +
         "Categoria 3 com menos de 15 cigarros por dia e 4 com 15 ou mais; no injetável mensal, 2 e 3. Abaixo de 35 anos, 2. Saída: progestágeno isolado ou DIU (categoria 1).",
      f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
    { id: "mul-estrogenio-has",
      t: "Contraceptivo com estrogênio (AOC, injetável mensal) + hipertensão",
      d: "MECANISMO: na hipertensa, o AOC aumenta o risco de AVC, infarto e doença arterial periférica; suspender o AOC pode melhorar o controle da PA. " +
         "Categoria 3 na HAS controlada e com PA 140–159/90–99; 4 com PA de 160/100 ou mais ou doença vascular. Uma medida isolada não classifica como hipertensa. " +
         "Saída: minipílula ou implante (1 a 2), trimestral (2; 3 com PA de 160/100 ou mais), DIU de cobre (1).",
      f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
    { id: "mul-estrogenio-tev",
      t: "Contraceptivo com estrogênio + TVP/TEP atual ou prévia, ou mutação trombogênica",
      d: "MECANISMO: o método combinado aumenta o risco de tromboembolismo venoso mesmo na mulher saudável; com mutação trombogênica, a usuária de AOC tem de 2 a 20 vezes mais trombose. " +
         "Categoria 4, inclusive na anticoagulada e na cirurgia maior com imobilização prolongada. Rastrear trombofilia antes do AOC não é rotina. " +
         "Saída: DIU de cobre (1) ou progestágeno isolado (2; 3 na TVP/TEP aguda).",
      f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
    { id: "mul-estrogenio-amamentacao",
      t: "Contraceptivo com estrogênio + pós-parto (amamentando, antes de 6 meses; sem amamentar, antes de 6 semanas)",
      d: "MECANISMO: o risco de tromboembolismo venoso é máximo nas 3 primeiras semanas após o parto e volta perto do basal aos 42 dias; o efeito do estrogênio sobre a amamentação tem estudos conflitantes. " +
         "Categoria 4 antes de 6 semanas e 3 de 6 semanas a 6 meses, amamentando. Sem amamentar: 3 antes de 21 dias (4 com outro fator de risco para TEV); de 21 a 42 dias, 2, ou 3 com outro fator de risco para TEV, cesárea inclusive — a Caderneta da Gestante 2026 orienta, sem amamentação, só após 6 semanas. " +
         "Saída: progestágeno isolado (2 antes de 6 semanas, 1 depois) ou DIU de cobre (até 48 horas ou após 4 semanas).",
      f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
    { id: "mul-hormonal-oral-indutor",
      t: "AOC ou minipílula + anticonvulsivante indutor (fenitoína, carbamazepina, barbitúrico, primidona, topiramato, oxcarbazepina) ou rifampicina",
      d: "MECANISMO: esses fármacos reduzem a eficácia de AOC e minipílula — o dano não é à mulher, é a gravidez não planejada. Categoria 3 para AOC e minipílula. " +
         "Se o AOC for mesmo a escolha, usar no mínimo 30 mcg de etinilestradiol. Saída: injetável trimestral (categoria 1: a eficácia não cai) ou DIU (1).",
      f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
    { id: "mul-aoc-lamotrigina",
      t: "Contraceptivo combinado (AOC, injetável mensal) + lamotrigina",
      d: "MECANISMO: o AOC derruba o nível da lamotrigina, que sobe de novo na semana de pausa; houve aumento de crises em ensaio clínico. Categoria 3. " +
         "Não se aplica se a lamotrigina já é usada com valproato ou carbamazepina. Progestágeno isolado e DIU: categoria 1.",
      f: "OMS — Medical eligibility criteria for contraceptive use, 6th ed., 2025" },
    { id: "mul-th-tev",
      t: "Terapia hormonal com estrogênio + história de tromboembolismo agudo e recorrente",
      d: "MECANISMO: o estrogênio, isolado ou associado a progestágeno, aumenta o risco de tromboembolismo venoso (raro entre 50 e 59 anos na mulher sem antecedente). " +
         "História de tromboembolismo agudo e recorrente é contraindicação absoluta (Protocolo 2016, p. 207). Saída para o fogacho: antidepressivo, clonidina ou gabapentina.",
      f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
    { id: "mul-th-cancer-mama",
      t: "Terapia hormonal sistêmica + câncer de mama",
      d: "MECANISMO: estrogênio associado a progestágeno por 3 a 5 anos aumenta o risco de câncer de mama, mais com medroxiprogesterona; câncer de mama é contraindicação absoluta à terapia hormonal sistêmica. " +
         "Via vaginal: o estriol tem absorção sistêmica desprezível e o Protocolo 2016 não o contraindica na história de câncer de mama (exceto com inibidor de aromatase); as diretrizes do INCA pedem avaliação individual. " +
         "O estrogênio conjugado vaginal tem absorção significativa: não é equivalente.",
      f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
    { id: "pal-metoclopramida-ondansetrona", t: "Metoclopramida + ondansetrona",
      d: "MECANISMO: a metoclopramida tem ação agonista serotoninérgica e a ondansetrona é antagonista 5-HT3 — as duas se anulam. Desfecho: dois antieméticos e menos antiemese.",
      f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
    { id: "pal-bzd-delirium", t: "Benzodiazepínico no delirium (fora da abstinência e da sedação paliativa)",
      d: "MECANISMO: piora a desatenção e a flutuação da consciência. Desfecho: delirium mais longo. Exceções: abstinência de álcool ou benzodiazepínico, e sedação paliativa no delirium refratário, decidida em equipe.",
      f: "MS/HSL — Manual de Cuidados Paliativos, 2ª ed., 2023" },
    { id: "ist-metronidazol-alcool",
      t: "Metronidazol + álcool",
      d: "MECANISMO: interação dos derivados imidazólicos com o álcool, efeito antabuse (dissulfiram-" +
         "símile). Desfecho: mal-estar, náuseas, tonturas e gosto metálico. Evitar bebida alcoólica " +
         "durante o uso e até 24 horas depois.",
      f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022", p: 144 },
    { id: "tb-rifampicina-inducao", t: "Rifampicina + anticoncepcional hormonal, anticoagulante oral, inibidor de protease, enalapril, metadona, beta-agonista, teofilina, propafenona ou quinidina", d: "MECANISMO: a rifampicina é indutora enzimática potente (citocromo P450) e reduz o nível sérico desses fármacos. DESFECHO: perda de efeito — gravidez não planejada durante o tratamento de TB, anticoagulação insuficiente, falha do antirretroviral, pressão descontrolada. O Manual manda evitar o uso concomitante: anticoncepcional, trocar por outro método; inibidor de protease ou dolutegravir, a referência troca a rifampicina por rifabutina no tratamento e usa isoniazida na ILTB; metadona, avaliar ajuste de dose e evitar. Antiácido junto reduz a absorção da rifampicina: separar. Cetoconazol e fluconazol: preferir outro agente. Corticoide, digital, barbitúrico e hipoglicemiante oral (no diabético, monitorar glicemia e considerar insulina) também caem: avaliar ajuste e monitorar.", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" }
  ]
};

FARMACOS_APS.dosemuda = {
  rot: "Dose muda a função",
  itens: [
    { id: "ges-ferro-prevencao-tratamento",
      t: "Sulfato ferroso — 1 drágea por dia previne, 5 por dia tratam a anemia da gestante",
      d: "A mesma drágea de 40 mg de ferro elementar muda de função com a dose: 1 por dia é a " +
         "suplementação; 5 por dia tratam a anemia leve a moderada (Hb de 8 a 11 g/dL). Manter a dose de " +
         "prevenção na gestante anêmica deixa a anemia sem tratamento.",
      f: "MS — CAB nº 32, Atenção ao Pré-natal de Baixo Risco, 2012" },
    { id: "mul-medroxiprogesterona-funcao",
      t: "Medroxiprogesterona — contracepção, sangramento uterino ou terapia hormonal",
      d: "Injetável de depósito, 150 mg a cada três meses: contraceptivo, e também trata sangramento uterino aumentado. Oral, 10 mg/dia do 5º ao 26º dia: sangramento uterino aumentado crônico. " +
         "Oral, 2,5 mg/dia: proteção do endométrio na terapia hormonal da mulher com útero — não é o esquema contraceptivo do Protocolo.",
      f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
    { id: "ist-benzatina-estagio",
      t: "Benzilpenicilina benzatina — dose única na sífilis recente, 3 doses semanais na tardia",
      d: "A mesma ampola trata estágios diferentes conforme o tempo de infecção. Até 1 ano: 2,4 milhões " +
         "UI uma vez. Mais de 1 ano ou duração ignorada: 2,4 milhões UI por semana, por 3 semanas (7,2 " +
         "milhões UI). Dose única em quem precisava de três é tratamento incompleto — na gestante, " +
         "tratamento inadequado e recém-nascido notificado como sífilis congênita.",
      f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022", p: 57 },
    { id: "ist-azitromicina-dose",
      t: "Azitromicina — 1 g trata clamídia; 2 g é para a gonorreia que falhou (junto da ceftriaxona) ou para a alergia grave a cefalosporina (sozinha)",
      d: "Dois comprimidos de 500 mg em dose única tratam clamídia e M. genitalium e completam a " +
         "ceftriaxona na gonorreia. Quatro comprimidos (2 g) são para o retratamento da gonorreia, junto " +
         "da ceftriaxona, ou para a alergia grave a cefalosporina, isolada. Usar a dose de clamídia " +
         "sozinha na gonorreia é subtratar um germe com resistência emergente. Reinfecção não é falha: " +
         "tratar com as doses habituais.",
      f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022", p: 125 },
    { id: "han-rifampicina-mensal", t: "Rifampicina — dose MENSAL na hanseníase", d: "Na PQT-U a rifampicina vai só na dose mensal supervisionada: acima de 50 kg, 600 mg uma vez por mês; de 30 a 50 kg, 450 mg. É por isso que os efeitos adversos que ela causa no tratamento diário da tuberculose quase não aparecem na hanseníase. Não transpor a frequência de um esquema para o outro.", f: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022" },
    { id: "tb-corticoide-limiar-iltb", t: "Corticoide — o limiar que indica tratar ILTB depende da idade", d: "Adulto e adolescente (≥ 10 anos): corticoide equivalente a mais de 15 mg/dia de prednisona por mais de 1 mês indica tratar ILTB se PT ≥ 5 mm (p. 166). Criança abaixo de 10 anos que vai iniciar imunossupressor: PT mesmo sem contato; PT ≥ 5 mm trata ILTB, sem corte de dose (p. 166).", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019", p: 166 },
    { id: "han-corticoide-limiar-bcg", t: "Corticoide — o limiar que contraindica revacinar BCG no contato de hanseníase", d: "Contato de hanseníase: não revacinar BCG em quem usa prednisona (ou equivalente) de 2 mg/kg/dia ou mais até 10 kg, ou de 20 mg/dia ou mais acima de 10 kg, por mais de duas semanas (p. 102).", f: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022", p: 102 }
  ]
};
