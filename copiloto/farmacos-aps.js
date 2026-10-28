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
  atualizado: "2026-10-27",

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
               "preferência com suco de fruta cítrica, até três meses após o parto", p: 135 },
        { rot: "Adulto não gestante — anemia ferropriva, tratamento (PCDT)", val: "120 mg/dia de ferro elementar VO (3 comprimidos de 40 mg), longe das refeições, até 6 meses depois que a Hb normalizar", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014", p: 36 },
        { rot: "Adulto não gestante, inclusive idoso (o TeleCondutas não separa o idoso) — anemia ferropriva, faixa e esquemas", val: "120 a 200 mg/dia de ferro elementar VO, em dose única ou em 2 a 3 tomadas; na intolerância, dose única em dias alternados — tratar de 3 a 6 meses", f: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023", p: 19 },
        { rot: "Idoso — anemia ferropriva, depois de corrigida a causa do sangramento (PCDT)", val: "15 mg/dia de ferro elementar VO — não há comprimido dessa dose: usar a solução oral ou o xarope, convertendo pela concentração do frasco; o TeleCondutas não separa o idoso", f: "MS — PCDT Anemia por Deficiência de Ferro, Portaria SAS/MS nº 1.247, 2014", p: 36 }
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
          f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Adulto — deficiência de ácido fólico por ingestão inadequada", val: "5 mg/dia VO por 4 meses; causa irreversível: manter indefinidamente — se a vitamina B12 também estiver baixa, repor a B12 antes", f: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023", p: 28 }
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
          val: "100 mg/dia, à noite, iniciado antes da 16ª semana de gestação e mantido até 36 semanas" },
        { rot: "Adulto — suspeita de síndrome coronariana aguda", val: "100 a 300 mg VO, mastigado", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 127 },
        { rot: "Adulto — suspeita de síndrome coronariana aguda (protocolo do SAMU)", val: "300 mg VO, macerado e mastigado", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
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
        { rot: "Máxima adulto", val: "40 mg/dia", p: 52 },
        { rot: "Adulto — ICFEr (Quadro 5 do PCDT de IC)", val: "início 2,5 mg 2 vezes ao dia; alvo 10 a 20 mg 2 vezes ao dia", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 },
        { rot: "Adulto com DRC — dose inicial com depuração plasmática de creatinina abaixo de 80 e acima de 30 mL/min (Quadro 4 do PCDT de DRC)", val: "5 a 10 mg/dia — só nesta faixa; com 30 mL/min ou menos a dose inicial é menor (linha abaixo)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 },
        { rot: "Adulto com DRC — dose inicial com depuração plasmática de creatinina de 30 mL/min ou menos e acima de 10 (Quadro 4)", val: "2,5 a 5 mg/dia", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 },
        { rot: "Adulto com DRC — depuração plasmática de creatinina de 10 mL/min ou menos, em geral em diálise (Quadro 4)", val: "2,5 mg nos dias de diálise — nos outros dias, ajustar pela PA (o enalapril é dialisável)", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 }
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
        { rot: "Urgência hipertensiva com risco cardiovascular iminente (ex.: aneurisma aórtico ou cerebral)", val: "25 mg por via ORAL, não sublingual, se não houver sobrecarga de volume; pico de ação em 60 a 90 minutos", p: 47 },
        { rot: "Adulto — ICFEr (Quadro 5 do PCDT de IC)", val: "início 6,25 mg 3 vezes ao dia; alvo 50 mg 3 vezes ao dia", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 },
        { rot: "Adulto com DRC — dose recomendada (PCDT de DRC)", val: "25 mg VO de 8 em 8 horas, uma hora antes das refeições", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 },
        { rot: "Adulto com DRC — nefropatia diabética com insuficiência renal leve a moderada", val: "75 a 100 mg/dia, divididos em três tomadas", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 },
        { rot: "Adulto com DRC — insuficiência renal significativa", val: "dose inicial reduzida, com aumentos menores e titulação lenta, a intervalos de uma a duas semanas", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 },
        { rot: "Adulto — urgência hipertensiva, PA que segue elevada depois de repouso e tranquilização (inclusive sem diagnóstico prévio de HAS)", val: "12,5 a 25 mg VO, deglutido, não sublingual; início de ação em 20 a 30 minutos", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
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
        { rot: "Máxima adulto", val: "100 mg/dia", p: 52 },
        { rot: "Adulto — ICFEr com intolerância ao IECA (Quadro 5 do PCDT de IC)", val: "início 25 mg 1 vez ao dia; alvo 150 mg ao dia, em dose única ou dividida em 2 tomadas — o alvo da IC passa do teto da HAS", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 },
        { rot: "Adulto com DRC (PCDT de DRC)", val: "50 mg 1 vez ao dia, podendo subir para 100 mg 1 vez ao dia conforme a PA — sem ajuste inicial na insuficiência renal, inclusive em diálise", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 }
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
        { rot: "Máxima na HAS (adulto)", val: "50 mg/dia", f: "MS — CAB nº 37, Hipertensão Arterial Sistêmica, 2013" },
        { rot: "Adulto — ICFEr com congestão (Quadro 5 do PCDT de IC; a furosemida é a preferida, e os dois se associam na congestão resistente)", val: "início 25 mg 1 vez ao dia; dose usual 12,5 a 100 mg/dia — a faixa da IC passa do máximo da HAS (linha 'Máxima na HAS'); só com congestão", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 }
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
        { rot: "Máxima adulto", val: "200 mg/dia", p: 52 },
        { rot: "Adulto — ICFEr, NYHA II a IV (Quadro 5 do PCDT de IC)", val: "início 12,5 a 25 mg 1 vez ao dia; alvo 25 a 50 mg 1 vez ao dia — dosar potássio na primeira semana e no primeiro mês", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 },
        { rot: "Adulto com DRC estágios 1 a 4 — RAC de 300 ou mais, hipertrofia ventricular esquerda ou IC (PCDT de DRC, p. 8)", val: "25 a 50 mg/dia, em 1 tomada — sem ajuste inicial na DRC; ao incluí-la, reduzir a dose do IECA", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 10 }
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
        { rot: "Máxima adulto", val: "depende da resposta do paciente (Quadro 18, nota b)", p: 52 },
        { rot: "Adulto — ICFEr com congestão (Quadro 5 do PCDT de IC)", val: "início 20 a 40 mg 1 vez ao dia; dose usual 40 a 240 mg/dia, ajustada pela congestão, em 1 a 3 tomadas", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 },
        { rot: "Adulto — edema agudo de pulmão na UBS, até a remoção (CAB nº 28, vol. II)", val: "40 mg EV — cautela na hipotensão; paciente sentado com as pernas pendentes, oxigênio e acesso venoso, enquanto aguarda o SAMU", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 73 }
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
        { rot: "Máxima adulto", val: "640 mg/dia", p: 52 },
        { rot: "Adulto — sintomas adrenérgicos do hipertireoidismo", val: "10 a 40 mg VO, 3 a 4 vezes ao dia — reduzir aos poucos quando o hipertireoidismo for controlado", f: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021", p: 7 },
        { rot: "Adulto — profilaxia de migrânea", val: "dose-alvo de 40 a 240 mg/dia VO, em 2 a 3 tomadas — 240 mg/dia é o máximo", f: "SBCe — Consenso para o tratamento profilático da migrânea episódica, parte I, Arq Neuropsiquiatr, 2022" }
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
        { rot: "Gestante (Quadro 16)", val: "12,5 a 50 mg/dia, em 1 a 2 tomadas; iniciar com 12,5 mg/dia por 2 dias e então aumentar", p: 49 },
        { rot: "Adulto — ICFEr (Quadro 5 do PCDT de IC)", val: "início 3,125 mg 2 vezes ao dia; alvo 25 mg 2 vezes ao dia — começar só no paciente compensado (não congesto)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 }
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
        { rot: "Gestante (Quadro 16)", val: "100 a 200 mg/dia, em 1 a 2 tomadas", p: 49 },
        { rot: "Adulto — ICFEr, só o succinato de liberação prolongada (Quadro 5 do PCDT de IC)", val: "início 12,5 a 25 mg 1 vez ao dia; alvo 200 mg 1 vez ao dia — começar só no paciente compensado (não congesto)", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 }
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
        { rot: "Gestante, via oral (Quadro 16)", val: "50 a 150 mg/dia, em 2 a 3 tomadas", p: 49 },
        { rot: "Adulto — ICFEr, associada a nitrato (Quadro 5 do PCDT de IC)", val: "início 12,5 a 25 mg 3 vezes ao dia; alvo 50 a 100 mg 3 vezes ao dia — o alvo da IC passa do máximo da HAS (linha 'Máxima adulto'); só na ICFEr, com nitrato", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 }
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
        { rot: "TFG abaixo de 25 (p. 25, 40 e 44)", val: "não iniciar; se já usa e a TFG fica persistentemente abaixo de 25, suspender e encaminhar ao endocrinologista e ao nefrologista", p: 40 },
        { rot: "Adulto — ICFEr (NYHA II a IV, fração de ejeção abaixo de 40%, sintomático), somada à terapia padrão", val: "10 mg 1 vez ao dia — é a dose inicial e a dose-alvo", f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 },
        { rot: "Adulto com DRC e TFG entre 25 e 75, com DM2 ou, sem diabetes, com RAC acima de 300 — somada ao IECA ou BRA", val: "10 mg 1 vez ao dia, a qualquer hora, sem ajuste pela função renal — pelo PCDT de DRC, manter até a terapia renal substitutiva; no DM2 com TFG persistentemente abaixo de 25, o PCDT de DM2 manda suspender (linha 'TFG abaixo de 25'): divergência, decidir com o nefrologista", f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024", p: 11 }
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
        { rot: "Correção sem cálculo (Quadro 8)", val: "abaixo de 50: menos 2 U · abaixo de 70: menos 1 U · 70 a 130: 0 · 131 a 180: mais 1 U · 181 a 230: mais 2 U · 231 a 280: mais 3 U · 281 a 330: mais 4 U · acima de 330: mais 5 U", p: 28 },
        { rot: "Adulto com diabetes em uso de insulina — glicemia acima de 250 com cetonúria, sem desidratação, vômito nem hálito cetônico", val: "20% da dose diária total, como regular — com cetonúria de 2+ ou mais, a SBD pede gasometria para excluir cetoacidose: sem ela, discutir a remoção antes da dose extra; reavaliar em 4 horas e repetir a dose se a glicemia seguir acima de 250", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" },
        { rot: "Adulto com diabetes em uso de insulina — glicemia acima de 250 sem cetonúria, com sintomas", val: "10% da dose diária total, como regular; glicemia de 4 em 4 horas até estabilizar", f: "MS — CAB nº 36, Diabetes Mellitus, 2013" }
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
        { rot: "Preparo com atrofia antes do teste de DNA-HPV ou da colposcopia", val: "1 grama com aplicador vaginal, por 14 noites consecutivas; coletar entre cinco e sete dias após suspender", f: "INCA/MS — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, Parte I: DNA-HPV, 2025", p: 48 },
        { rot: "Pós-menopausa — prevenção de ITU de repetição", val: "creme vaginal 1 mg/g: 0,5 mg (1 aplicador cheio) por dia, por 2 semanas; depois a mesma dose 2x/semana, sem prazo para parar", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" }
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
        { rot: "Reação de Jarisch-Herxheimer após a benzatina (sífilis), se necessário", val: "500 mg, 6/6h, se necessário", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022", p: 78 },
        { rot: "Adulto — osteoartrite de joelho ou quadril (PCDT Dor Crônica)", val: "500 mg, um a dois comprimidos VO até quatro vezes ao dia", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024", p: 14 },
        { rot: "Adulto — crise de migrânea ou de cefaleia tipo tensão", val: "500 a 1.000 mg VO; nova dose em 4 a 6 h se preciso; máximo 3.000 mg/dia", f: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016" },
        { rot: "Adulto — dengue (febre e dor)", val: "1 comprimido de 500 mg ou 20 gotas (solução 500 mg/mL) até de 6/6 horas", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 77 },
        { rot: "Criança a partir de 3 meses e com 5 kg ou mais — dengue (febre e dor)", val: "10 mg/kg/dose até de 6/6 horas (gotas 500 mg/mL: 1 mL = 20 gotas; solução oral 50 mg/mL) — respeitar a dose máxima por peso e idade, nunca acima da dose do adulto (linha do adulto — dengue); abaixo dessa idade ou desse peso, não usar dipirona oral (manual de chikungunya)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 77 },
        { rot: "Acima de 15 anos — chikungunya, fase aguda (em horário fixo)", val: "1 a 2 comprimidos de 500 mg, ou 20 a 40 gotas, de 6/6 horas, em horário fixo — o manual de chikungunya contraindica na gravidez e na lactação", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024", p: 33 }
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
        { rot: "Reação de Jarisch-Herxheimer após a benzatina (sífilis), se necessário", val: "500 mg, 6/6h, se necessário", f: "MS — PCDT IST, Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022", p: 78 },
        { rot: "Adulto — osteoartrite de joelho ou quadril (PCDT Dor Crônica)", val: "500 mg, um a dois comprimidos VO, três a quatro vezes ao dia, em horário regular; máximo 4 g/dia", f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024", p: 14 },
        { rot: "Adulto — crise de migrânea ou de cefaleia tipo tensão", val: "750 a 1.000 mg VO; nova dose em 4 a 6 h se preciso; máximo 4.000 mg/dia", f: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016" },
        { rot: "Adulto — dengue (febre e dor)", val: "1 comprimido de 500 mg (ou 40 gotas) de 4/4 horas, ou 2 comprimidos (ou 60 gotas) até de 6/6 horas — não passar de 4 g em 24 horas; as gotas não equivalem aos comprimidos (40 gotas dão menos que 1 comprimido)", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 77 },
        { rot: "Criança a partir de 2 meses — dengue (febre e dor)", val: "10 mg/kg/dose até de 6/6 horas (gotas 200 mg/mL: 1 mL = 20 gotas) — respeitar a dose máxima para peso e idade, nunca acima da dose do adulto (linha do adulto — dengue); dose maior é hepatotóxica; contar as gotas pelo conta-gotas do frasco — o manual de chikungunya conta outra quantidade de gotas por mL para a mesma solução", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 77 }
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
        { rot: "Equipotência", val: "1/10 da morfina oral (codeína 10 mg ≈ morfina oral 1 mg)", p: 150 },
        { rot: "Adulto — chikungunya fase aguda, dor intensa, junto do analgésico comum", val: "30 a 60 mg VO de 4/4 horas, 3 a 4 vezes ao dia; máximo 360 mg/dia — idoso: começar com 15 mg; o fluxograma do mesmo manual usa 30 mg de 6/6 h; não usar na diarreia por colite pseudomembranosa ou por envenenamento nem na dependência de álcool ou drogas", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024", p: 34 }
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
        { rot: "Adulto — estase gástrica", val: "até 40 mg/dia EV", p: 174 },
        { rot: "Adulto — neurite vestibular ou labirintite aguda: sintomático, no máximo 3 dias", val: "5 a 10 mg VO de 6/6 h, por no máximo 3 dias", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022", p: 29 }
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
        { rot: "Adulto — constipação", val: "15 a 30 mL, 2 a 3 vezes ao dia", p: 179 },
        { rot: "Adulto — constipação crônica que não respondeu a fibras e medidas (APS)", val: "15 a 30 mL/dia VO, pela manhã ou à noite", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025", p: 45 }
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
          val: "50.000 UI/kg, IM, dose única (dose máxima total 2,4 milhões UI)", p: 178 },
        { rot: "Criança de 2 meses a 5 anos — infecção moderada de garganta (nesta idade vale esta linha, não a do CAB 28)", val: "IM, dose única: abaixo de 20 kg, 600.000 UI; acima de 20 kg, 1.200.000 UI", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 91 },
        { rot: "Faringoamigdalite estreptocócica — criança acima de 5 anos, adolescente e adulto (CAB 28)", val: "IM, dose única: 1.200.000 UI a partir de 27 kg; 600.000 UI abaixo de 27 kg — observar 30 minutos na UBS depois da aplicação", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 113 }
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
          val: "20 mg/kg, VO, dose única (dose máxima total 1 g)", p: 178 },
        { rot: "Adulto — pneumonia adquirida na comunidade ambulatorial (sozinha no hígido sem fator de risco; com comorbidade, junto do betalactâmico)", val: "500 mg VO 1 vez ao dia, por 3 a 5 dias sozinha ou 5 a 7 dias junto do betalactâmico — Quadros 5 e 6 da SBPT", f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
        { rot: "Adulto — otite média aguda em alérgico à penicilina (reação tipo I)", val: "500 mg/dia VO por 5 dias", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 108 },
        { rot: "Faringoamigdalite estreptocócica em alérgico à penicilina — criança, adolescente ou adulto", val: "12 mg/kg VO uma vez ao dia, máximo 500 mg, por 5 dias", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 113 }
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
          f: "MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024", p: 26 },
        { rot: "Adulto — giardíase", val: "250 mg VO 3x/dia por 5 a 7 dias, ou 500 mg (2 comprimidos de 250 mg) VO 2x/dia por 5 a 7 dias", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024", p: 27 },
        { rot: "Criança — giardíase", val: "15 mg/kg/dia VO, divididos em 3 tomadas, por 5 a 7 dias; máximo de 250 mg por dose — a suspensão da RENAME é de benzoilmetronidazol, em mg do sal: conferir a equivalência antes de converter em mL", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024", p: 27 },
        { rot: "Adulto — amebíase intestinal leve ou assintomática", val: "500 mg VO 3x/dia por 5 dias — a RENAME não tem comprimido de 500 mg: conferir a apresentação na farmácia", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010", p: 93 },
        { rot: "Adulto — amebíase intestinal sintomática (inclusive disenteria) ou extraintestinal", val: "750 mg VO 3x/dia por 10 dias — a RENAME não tem comprimido de 750 mg; abscesso hepático: hospital", f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010", p: 93 },
        { rot: "Adulto — H. pylori, terapia concomitante (com amoxicilina, claritromicina e IBP)", val: "400 mg VO de 8/8 h, ou 500 mg de 12/12 h (a RENAME não tem comprimido de 500 mg), por 14 dias — 14 dias pelo V Consenso; a Tabela 3 do V Consenso imprime metronidazol 500 mg 4x/dia na concomitante: conferir com a preceptora", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024", p: 25 }
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
          val: "creme vaginal, 2x/semana", p: 115 },
        { rot: "Tinea corporis (e cruris, mesmo esquema) — tópico de 1ª linha", val: "creme dermatológico 2%, 2x/dia, até a lesão sumir e mais 1 a 2 semanas (em geral 2 a 6 semanas no total)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 8 },
        { rot: "Tinea pedis ou manuum — tópico de 1ª linha", val: "creme dermatológico 2%, 1 a 2x/dia, até a lesão sumir e mais 1 a 2 semanas (em geral 1 a 6 semanas no total)", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 16 },
        { rot: "Intertrigo por Candida, leve a moderado", val: "creme dermatológico 2%, 2x/dia, até a melhora completa (cerca de 2 a 4 semanas)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 38 },
        { rot: "Pitiríase versicolor — tópico de 1ª escolha", val: "creme ou loção dermatológica 2%, 1 a 2x/dia, por 1 a 4 semanas", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 39 },
        { rot: "Dermatite seborreica de face e corpo", val: "creme dermatológico 2%, 2x/dia, por até 4 semanas", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 37 },
        { rot: "Candidíase orofaríngea — adulto, criança e bebê", val: "gel oral 2%: 1,25 mL, 4x/dia, por 7 a 14 dias — idade mínima e interação com anticoagulante: conferir na bula", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 38 }
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
          val: "150 mg, VO, 1x/semana por 6 meses", p: 115 },
        { rot: "Adulto — tinea corporis extensa ou que falhou no tópico", val: "150 a 200 mg VO 1x/semana, por 2 a 4 semanas", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 9 },
        { rot: "Criança — tinea corporis extensa ou que falhou no tópico", val: "6 mg/kg VO 1x/semana (máximo 200 mg por semana), por 2 a 4 semanas", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 9 },
        { rot: "Adulto — tinea cruris extensa ou que falhou no tópico (alternativa à terbinafina e ao itraconazol)", val: "150 a 200 mg VO 1x/semana, por 2 a 6 semanas", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 14 },
        { rot: "Adulto — tinea pedis ou manuum que falhou no tópico", val: "150 mg VO 1x/semana, por 2 a 6 semanas", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 17 },
        { rot: "Adulto e criança — tinea capitis (2ª linha: eficácia menor que a da griseofulvina e da terbinafina)", val: "6 mg/kg VO 1x/dia (máximo 400 mg), por 3 a 6 semanas · alternativa: 6 mg/kg 1x/semana, por 6 a 12 semanas", f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 11 },
        { rot: "Adulto — pitiríase versicolor extensa, recorrente ou refratária", val: "300 mg VO 1x/semana, por 2 a 4 semanas", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 39 },
        { rot: "Adulto — intertrigo por Candida extenso ou que falhou no tópico", val: "150 mg VO 1x/semana, por 2 a 6 semanas", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 38 },
        { rot: "Adulto — candidíase orofaríngea sem resposta ao tópico, extensa ou recorrente", val: "150 mg VO 1x/dia, por 7 a 14 dias", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 38 },
        { rot: "Criança a partir de 2 meses — candidíase orofaríngea sem resposta ao tópico", val: "6 mg/kg VO no 1º dia, depois 3 mg/kg/dia, por 7 a 14 dias (máximo 200 mg/dia) — o guia de bolso do MS manda evitar fluconazol na criança com candidíase oral; esta dose é do protocolo do TelessaúdeRS: usar só sem resposta à nistatina ou ao miconazol gel, com a preceptora; o limite de idade é a regra do app, não da fonte", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 38 }
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
        { rot: "Criança abaixo de 10 anos — TB meningoencefálica ou osteoarticular, adjuvante (início no hospital ou na referência)", val: "1 a 2 mg/kg/dia por quatro semanas, com redução gradual nas quatro semanas seguintes; não suspender de uma vez (forma grave meningoencefálica: dexametasona injetável na internação)", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019", p: 109 },
        { rot: "Adolescente (12 anos ou mais) e adulto — exacerbação de asma (o PCDT dá esta dose para a exacerbação grave)", val: "40 a 50 mg/dia VO por 5 a 7 dias, pela manhã, em dose única; uso por menos de 2 semanas dispensa desmame", f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026", p: 38 },
        { rot: "Adulto — exacerbação moderada ou grave de DPOC", val: "40 mg/dia VO por 5 dias; sem melhora no quinto dia, sobretudo na grave, estender para 10 a 14 dias", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025", p: 22 },
        { rot: "Adulto — rinossinusite crônica sem resposta ao tratamento inicial, com edema grave de mucosa ou agudizada (junto do antibiótico)", val: "20 mg VO 2 vezes ao dia por 5 dias, depois 20 mg 1 vez ao dia por mais 5 dias (10 dias no total)", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023", p: 27 },
        { rot: "Adulto — síndrome do túnel do carpo (tratamento clínico)", val: "10 mg VO de 12/12 h por 14 dias", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
        { rot: "Adulto — chikungunya pós-aguda (15 a 90 dias) com artrite ou tenossinovite", val: "0,5 mg/kg/dia VO, máximo 40 mg/dia; com boa resposta depois de quatro semanas, reduzir um quarto da dose a cada sete dias (total de oito semanas) — não suspender de uma vez (rebote); o fluxograma do mesmo manual fala em até três semanas: confirmar", f: "MS — Chikungunya: manejo clínico, 2ª ed., 2024", p: 35 }
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
    },
    {
      nome: "Hidrocortisona (succinato sódico)",
      id: "hidrocortisona",
      kw: "hidrocortisona solucortef corticoide venoso injetavel crise de asma grave dpoc exacerbacao anafilaxia",
      apres: "pó para solução injetável 100 mg e 500 mg (RENAME 2024)",
      dose: [
        { rot: "Adulto — crise grave de asma, até a remoção (vale também para o adolescente com puberdade iniciada)", val: "200 a 300 mg EV" },
        { rot: "Adulto — exacerbação de DPOC sem possibilidade de via oral", val: "200 mg EV de 6/6 h até passar à via oral", f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025", p: 22 },
        { rot: "Adulto — anafilaxia que persiste depois da adrenalina (segunda linha; vale também para o adolescente com puberdade iniciada)", val: "5 a 10 mg/kg EV; máximo 100 mg" },
        { rot: "Criança de 2 meses até o início da puberdade — anafilaxia, segunda linha depois da adrenalina", val: "5 a 10 mg/kg EV; máximo 250 mg" },
        { rot: "Criança de 2 meses até o início da puberdade — crise de asma grave ou muito grave", val: "4 mg/kg EV; máximo 250 mg" }
      ],
      porque: "Corticoide de uso venoso da farmácia básica e da lista de urgência da UBS, para quem não pode tomar pela boca. O início de ação é mais tardio: não substitui a adrenalina na anafilaxia nem o broncodilatador na crise.",
      escolher: "Crise grave de asma e exacerbação de DPOC em quem não consegue a via oral; anafilaxia que persiste depois da adrenalina (o SAMU a dá no pré-hospitalar porque pode ajudar a prevenir a reação bifásica). Se engole, o corticoide oral é o preferido (PCDT DPOC).",
      evitar: "Via venosa quando a oral é possível: a parenteral tem mais toxicidade (PCDT DPOC). Dar o corticoide e adiar a adrenalina na anafilaxia.",
      contraind: "Na urgência, as fontes lidas não trazem contraindicação. Para o corticoide sistêmico, o PCDT DPOC lista hipersensibilidade, varicela, ceratite herpética, infecção fúngica sistêmica não tratada e infecção não controlada; cautela na úlcera péptica ativa, HAS grave, diabetes descompensado, osteoporose grave, psicose prévia e tuberculose não tratada.",
      adversos: "Hiperglicemia, hipertensão, retenção de líquido, alteração de humor; no uso prolongado, supressão adrenal e osteoporose (PCDT DPOC).",
      monitor: "Glicemia (sobretudo no diabético) e PA. Ao voltar a engolir, seguir com o corticoide oral pelo tempo do protocolo.",
      diverge: "Teto na anafilaxia: o protocolo de adulto do SAMU (AC33) limita a 100 mg e o pediátrico (APed26) a 250 mg — reproduzido como está na fonte.",
      fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016"
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

FARMACOS_APS.classes.push({
  rot: "Hipolipemiantes — estatinas",
  kw: "estatina hipolipemiante sinvastatina atorvastatina colesterol ldl dislipidemia prevencao cardiovascular",
  quando: "Prevenção de eventos cardiovasculares pelo RISCO, não pela meta de LDL (PCDT de Dislipidemia, 2019). Indicação sem calcular risco: doença aterosclerótica, LDL ≥190, DRC estágio 3 ou mais, diabetes a partir dos 40 anos, HAS com lesão de órgão-alvo (PCDT de HAS, 2025).",
  nota: "O PCDT de 2019 considera sinvastatina, pravastatina e atorvastatina. A farmácia da UBS tem a sinvastatina (RENAME 2024, Componente Básico); atorvastatina e pravastatina são do Componente Especializado. Rosuvastatina e ezetimiba não constam da RENAME 2024, e o PCDT não preconiza a ezetimiba (não incorporada). Doses da Tabela 1 do PCDT (p. 10).",
  farmacos: [
    {
      nome: "Sinvastatina",
      id: "sinvastatina",
      kw: "sinvastatina estatina colesterol ldl dislipidemia prevencao cardiovascular",
      apres: "comprimido 10 mg, 20 mg e 40 mg (RENAME 2024, Componente Básico)",
      dose: [
        { rot: "Adulto — prevenção de eventos cardiovasculares (dose inicial, Tabela 1)", val: "20 mg VO, 1 vez ao dia, de preferência à noite", p: 10 },
        { rot: "Adulto — dose máxima do PCDT (Tabela 1)", val: "80 mg/dia — o rodapé da tabela avisa: risco aumentado de toxicidade", p: 10 },
        { rot: "Adulto em uso de amiodarona — dose máxima (SBC)", val: "20 mg/dia — a amiodarona inibe o CYP3A4 e aumenta a exposição à sinvastatina", f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
        { rot: "Adulto em uso de anlodipino ou verapamil — dose máxima (SBC)", val: "20 mg/dia — o BCC inibe o metabolismo da sinvastatina (CYP3A4) e aumenta o risco de miopatia", f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" }
      ],
      porque: "Inibidor da HMG-CoA redutase: reduz a síntese hepática de colesterol e aumenta a depuração do LDL (SBC). É, com a pravastatina, a estatina com a evidência mais contundente de redução de mortalidade (PCDT, p. 6). É a estatina que a farmácia da UBS dispensa.",
      escolher: "Quem tem indicação de estatina pelo risco cardiovascular e é atendido na UBS: é a do Componente Básico. Dose única diária, de preferência à noite, para o efeito máximo (PCDT, p. 10). O tratamento é contínuo.",
      evitar: "Gestação e mulher em idade fértil sem contracepção segura. Junto com genfibrozila, nunca. Com claritromicina ou eritromicina (inibem o CYP3A4; a azitromicina pode ser usada, segundo a SBC). Dose máxima: o PCDT avisa toxicidade e a SBC a considera proscrita. Hipotireoidismo descompensado: tratar antes. Com inibidor de protease do HIV: evitar (SBC); o PCDT prefere a pravastatina com antirretroviral (p. 5). Itraconazol: contraindicado (SBC). Verapamil aumenta a toxicidade da sinvastatina (CAB nº 37). Com anlodipino, verapamil ou amiodarona: não passar do teto das linhas próprias de dose (SBC).",
      contraind: "Gestação (TER, p. 20). Critérios de exclusão do PCDT (p. 4): hipotireoidismo descompensado (TSH acima de 10), gestante ou mulher em idade fértil sem pelo menos dois métodos contraceptivos seguros ou contracepção definitiva, doença hepática aguda ou crônica grave (aminotransferases acima de 3 vezes o normal, icterícia, tempo de protrombina prolongado), hipersensibilidade ou evento adverso prévio.",
      adversos: "Frequentes: prisão de ventre, diarreia, gases, dor de estômago, tontura, dor de cabeça, náusea, alergia de pele. Menos frequentes e graves (atenção médica imediata): dor muscular, cãibras, febre, cansaço e fraqueza — miopatia ou rabdomiólise. Raros: impotência, insônia (TER do PCDT, p. 20).",
      monitor: "TGO/TGP e CPK no início, aos 6 meses e a cada mudança de dose ou acréscimo de fármaco que aumente a toxicidade (PCDT, p. 10 e 11). Suspender se mialgia, CPK acima de 10 vezes o normal ou aminotransferases acima de 3 vezes (p. 10). Pelo PCDT, o perfil lipídico não precisa ser repetido depois de iniciar (p. 10).",
      diverge: "Monitorização e meta: o PCDT de 2019 decide pelo risco, não pela busca do LDL-alvo (p. 7) — só cita, no diagnóstico, LDL abaixo de 100 para a maioria de risco elevado (p. 2 e 3) — e dispensa repetir o perfil lipídico (p. 10); a SBC 2025 persegue metas de LDL por categoria de risco e repete o perfil cerca de 4 semanas depois de iniciar ou ajustar. Dose máxima: o PCDT admite 80 mg/dia com aviso de toxicidade (Tabela 1, p. 10); a SBC chama a sinvastatina 80 mg de proscrita. CK e TGO/TGP: o PCDT manda repetir aos 6 meses e a cada mudança de dose (p. 10); a SBC recomenda contra dosagens rotineiras sem sintoma muscular, sinal de hepatotoxicidade ou mudança na terapia.",
      fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019"
    },
    {
      nome: "Atorvastatina cálcica",
      id: "atorvastatina",
      kw: "atorvastatina estatina colesterol ldl dislipidemia muito alto risco prevencao secundaria",
      apres: "comprimido 10 mg, 20 mg, 40 mg e 80 mg (RENAME 2024, Componente Especializado)",
      dose: [
        { rot: "Adulto — prevenção de eventos cardiovasculares (dose inicial e usual, Tabela 1)", val: "10 mg VO, 1 vez ao dia, de preferência à noite", p: 10 },
        { rot: "Adulto de muito alto risco (Framingham acima de 20% ou prevenção secundária com fatores de risco maiores mantidos) — dose máxima", val: "até 80 mg/dia — restrita a casos especiais; o PCDT sugere avaliar esses casos na atenção terciária", p: 10 }
      ],
      porque: "Estatina com a dose alta prevista no PCDT para o muito alto risco: em dose alta foi superior à pravastatina em dose usual e à própria atorvastatina em dose baixa na prevenção secundária, e reduziu eventos maiores depois do IAM em comparação à sinvastatina, sem mudar a mortalidade total (PCDT, p. 6 e 7).",
      escolher: "Paciente de muito alto risco (Framingham acima de 20% em 10 anos, ou prevenção secundária com fator de risco maior mantido) candidato a terapia agressiva com dose alta, avaliado na atenção terciária (PCDT, p. 4 e 5). Componente Especializado: dispensada pelos critérios do PCDT, fora da farmácia da UBS. Com antirretroviral, o PCDT prefere a pravastatina (p. 5).",
      evitar: "Gestação e mulher em idade fértil sem contracepção segura. Junto com genfibrozila. Com claritromicina ou eritromicina (CYP3A4, segundo a SBC). Dose alta fora dos casos especiais do PCDT.",
      contraind: "Gestação (TER, p. 20). Critérios de exclusão do PCDT (p. 4): hipotireoidismo descompensado (TSH acima de 10), gestante ou mulher em idade fértil sem pelo menos dois métodos contraceptivos seguros ou contracepção definitiva, doença hepática aguda ou crônica grave (aminotransferases acima de 3 vezes o normal, icterícia, tempo de protrombina prolongado), hipersensibilidade ou evento adverso prévio.",
      adversos: "Os da classe (TER do PCDT, p. 20): prisão de ventre, diarreia, dor de estômago, náusea, cefaleia, alergia de pele; dor muscular, cãibras, febre, cansaço e fraqueza pedem atenção imediata (miopatia, rabdomiólise). A SBC lembra que o risco de sintoma muscular cresce com a dose e a potência.",
      monitor: "TGO/TGP e CPK no início, aos 6 meses e a cada mudança de dose (PCDT, p. 10). Suspender se mialgia, CPK acima de 10 vezes o normal ou aminotransferases acima de 3 vezes (p. 10).",
      diverge: "O PCDT de 2019 restringe a dose máxima a casos especiais (p. 5 e p. 10) e decide pelo risco, não pela busca do LDL-alvo (p. 7); só cita, no diagnóstico, LDL abaixo de 100 para a maioria de risco elevado (p. 2 e 3). A SBC 2025 recomenda estatina de alta intensidade (estatina potente em dose alta, que reduz o LDL em 50% ou mais) já no início para alto, muito alto e extremo risco, quase sempre com ezetimiba — que o SUS não tem. CK e TGO/TGP: o PCDT repete aos 6 meses e a cada mudança de dose (p. 10); a SBC recomenda contra dosagens rotineiras sem sintoma, sinal de hepatotoxicidade ou mudança na terapia.",
      fonte: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Insuficiência cardíaca — digitálico, nitrato e sacubitril-valsartana",
  kw: "insuficiencia cardiaca icfer digoxina sacubitril valsartana mononitrato nitrato hidralazina",
  quando: "ICFEr (fração de ejeção abaixo de 40%) que segue sintomática apesar do tratamento padrão (IECA ou BRA, betabloqueador, espironolactona, diurético se congesto) e da dapagliflozina — Figura 2 do PCDT de IC (p. 11).",
  nota: "Doses do Quadro 5 do PCDT de IC (p. 16). Os outros fármacos da IC já têm cartão (enalapril, captopril, losartana, carvedilol, metoprolol, espironolactona, furosemida, hidroclorotiazida, dapagliflozina, hidralazina), com a linha 'Adulto — ICFEr'. O dinitrato de isossorbida é o cartão dinitrato-de-isossorbida.",
  farmacos: [
    {
      nome: "Digoxina",
      id: "digoxina",
      kw: "digoxina digitalico insuficiencia cardiaca icfer",
      apres: "comprimido 0,25 mg; elixir 0,05 mg/mL (RENAME 2024, Componente Básico)",
      dose: [
        { rot: "Adulto não idoso — ICFEr sintomática apesar de tratamento otimizado (Quadro 5, dose inicial)", val: "0,125 mg em dias alternados a 0,25 mg 1 vez ao dia — começar pela dose baixa; o nível sérico ajuda a ajustar", p: 16 },
        { rot: "Idoso — ICFEr", val: "no máximo 0,125 mg/dia — acima disso é medicamento potencialmente inapropriado no idoso; começar pela dose baixa e ajustar pelo sintoma e pela digoxinemia", f: "Oliveira MG et al. — Consenso Brasileiro de Medicamentos Potencialmente Inapropriados para Idosos, Geriatr Gerontol Aging, 2016" },
        { rot: "Baixo peso, função renal alterada ou dificuldade de entender o uso — ICFEr", val: "começar pela dose baixa e ajustar pelo sintoma e pela digoxinemia", p: 15 }
      ],
      porque: "Digitálico. O benefício se restringe a quem segue sintomático apesar do tratamento otimizado com as doses dos estudos (IECA ou BRA ou sacubitril-valsartana, betabloqueador, espironolactona, dapagliflozina) (PCDT, p. 15).",
      escolher: "Último degrau da Figura 2 do PCDT, como alternativa ao nitrato com hidralazina, em quem continua sintomático (p. 11 e 15). Doses baixas são preferíveis.",
      evitar: "Começar em dose cheia. Cautela redobrada na função renal alterada, no baixo peso, no idoso e em quem tem dificuldade de entender o uso (p. 15). No idoso, passar do teto da linha 'Idoso — ICFEr' (Consenso PIM 2016). Hipocalemia não corrigida; verapamil (aumenta a toxicidade) (CAB nº 37). Usar sem que o resto do tratamento esteja otimizado.",
      contraind: "O PCDT de IC não lista contraindicação formal além da hipersensibilidade (TER, p. 25); destaca a janela terapêutica estreita (p. 15 e 24).",
      adversos: "Arritmias, redução da condução atrioventricular, bradicardia sinusal, náusea, vômitos, diarreia e distúrbios visuais (p. 15); alterações eletrocardiográficas (TER, p. 24).",
      monitor: "Digoxinemia para ajustar a dose ou na suspeita de intoxicação (p. 15 e 16); potássio, sobretudo com furosemida ou hidroclorotiazida, que aumentam a toxicidade da digoxina (a espironolactona também aumenta o efeito dela); ECG e FC com betabloqueador (bloqueio atrioventricular) (CAB nº 37); sintomas gastrointestinais e visuais; função renal.",
      diverge: "O texto do PCDT (p. 15) escreve a dose baixa como '0,125 pg/mL em dias alternados' — unidade errada; o Quadro 5 (p. 16) dá 0,125 mg em dias alternados.",
      fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024"
    },
    {
      nome: "Sacubitril-valsartana (sacubitril valsartana sódica hidratada)",
      id: "sacubitril-valsartana",
      kw: "sacubitril valsartana inra inibidor da neprilisina insuficiencia cardiaca icfer",
      apres: "comprimido 50 mg, 100 mg e 200 mg (RENAME 2024, Componente Especializado)",
      dose: [
        { rot: "Adulto — ICFEr, dose inicial", val: "50 mg VO 2 vezes ao dia", p: 14 },
        { rot: "Adulto — ICFEr que já usava IECA ou BRA em dose alta, com PA preservada (acima de 100 mmHg) (dose inicial)", val: "100 mg VO 2 vezes ao dia", p: 14 },
        { rot: "Adulto — ICFEr, titulação até a dose-alvo", val: "aumentar a cada 2 a 4 semanas até 200 mg 2 vezes ao dia — conferindo função renal, eletrólitos e hipotensão", p: 14 }
      ],
      porque: "Associa um inibidor da neprilisina (sacubitril), que impede a degradação de substâncias vasodilatadoras, a um BRA (valsartana). Reduziu mortalidade e hospitalização na ICFEr com BNP ou NT-proBNP elevados (PCDT, p. 13 e 14).",
      escolher: "Substitui o IECA ou o BRA em adulto com menos de 75 anos, NYHA II, fração de ejeção reduzida, BNP acima de 150 ou NT-proBNP acima de 600 (pg/mL), em tratamento otimizado e ainda sintomático (p. 8 e 14). A prescrição inicial é preferencialmente do especialista; o acompanhamento pode ser na APS (p. 14). Quem cumpre os critérios dos dois começa pela dapagliflozina (Conitec, p. 29).",
      evitar: "Junto com IECA ou com outro BRA, nunca. Iniciar antes de 36 horas da última dose de IECA. Gestação.",
      contraind: "Gestantes; uso concomitante com IECA ou BRA; hipersensibilidade (TER do PCDT, p. 25).",
      adversos: "Hipotensão e tontura, os mais comuns; angioedema relatado; risco de perda de função renal (p. 14).",
      monitor: "Função renal, eletrólitos e PA a cada aumento de dose (p. 14).",
      diverge: "Fração de ejeção: os critérios de inclusão (p. 8) dizem ≤35%; o texto e a nota da Figura 2 (p. 11 e 14) dizem abaixo de 35%.",
      fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024"
    },
    {
      nome: "Mononitrato de isossorbida",
      id: "mononitrato-de-isossorbida",
      kw: "mononitrato de isossorbida nitrato vasodilatador insuficiencia cardiaca hidralazina",
      apres: "comprimido 20 mg e 40 mg (RENAME 2024, Componente Básico)",
      dose: [
        { rot: "Adulto — ICFEr, associado à hidralazina (Quadro 5)", val: "início 10 a 20 mg VO 3 vezes ao dia; alvo 40 mg 3 vezes ao dia", p: 16 }
      ],
      porque: "Nitrato. Com a hidralazina, foi a primeira conduta vasodilatadora com benefício clínico provável na IC; começa em dose baixa e sobe conforme a tolerância (PCDT, p. 14).",
      escolher: "Sempre com a hidralazina: ICFEr com intolerância a IECA e a BRA por hipercalemia ou perda de função renal; ou NYHA III e IV apesar do tratamento otimizado, sobretudo na população negra (p. 14 e 15).",
      evitar: "Pressão arterial baixa (TER, p. 24). Junto com sildenafila, tadalafila ou outro remédio para disfunção erétil (SAMU). Usar sozinho na IC: o PCDT preconiza a associação com hidralazina.",
      contraind: "Pressão arterial baixa; hipersensibilidade (TER do PCDT, p. 24 e 25). Uso de inibidor da fosfodiesterase-5 — sildenafila, vardenafila ou lodenafila nas últimas 24 horas, tadalafila nas últimas 48 horas (contraindicação do nitrato no protocolo AC17 do SAMU 192, 2016).",
      adversos: "Cefaleia, hipotensão, hipotensão postural, síncope (TER, p. 24).",
      monitor: "PA sentado e em pé; cefaleia; tolerância a cada aumento.",
      diverge: "O PCDT de IC dá, no Quadro 5 (p. 16), a mesma posologia numa linha só para o dinitrato de 5 mg e o mononitrato de 20 e 40 mg; o esquema de 3 tomadas não foi conferido em outra fonte para o mononitrato (a bula e as Diretrizes de IC da Portaria Conjunta nº 17/2020 não foram baixadas).",
      fonte: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antissecretores e esquemas para H. pylori",
  kw: "ibp omeprazol dispepsia drge refluxo azia ulcera h pylori helicobacter erradicacao claritromicina",
  quando: "Dispepsia, DRGE e úlcera péptica na APS, e os esquemas de erradicação do H. pylori que a " +
          "farmácia do SUS permite montar.",
  nota: "Bismuto e vonoprazana, que o V Consenso (2026) prefere, não estão na RENAME 2024; a tetraciclina " +
        "está, mas a quádrupla clássica sem bismuto não é o esquema validado. Os combos abaixo dizem de " +
        "qual fonte é cada esquema.",
  farmacos: [
    {
      nome: "Omeprazol",
      id: "omeprazol",
      kw: "omeprazol ibp inibidor bomba protons azia pirose refluxo drge dispepsia ulcera gastrite h pylori",
      apres: "cápsula 10 mg e 20 mg (RENAME 2024); a dose de 40 mg são 2 cápsulas de 20 mg",
      dose: [
        { rot: "Adulto — dose padrão (dispepsia, DRGE)", val: "20 mg VO 1x/dia, 30 min antes do café", p: 24 },
        { rot: "Adulto — dose plena (tratamento otimizado da DRGE e da dispepsia)", val: "40 mg VO 1x/dia, 30 min antes do café", p: 24 },
        { rot: "Adulto — dose máxima (DRGE refratária, junto com o pedido de EDA)", val: "40 mg VO 2x/dia, 30 min antes do café e do jantar", p: 24 },
        { rot: "Adulto — H. pylori, nos esquemas do TeleCondutas (base: IV Consenso)",
          val: "20 mg VO de 12/12 h, durante todo o esquema", p: 25 },
        { rot: "Adulto — H. pylori, esquemas com IBP em dose padrão (concomitante; quádrupla ou tríplice com bismuto) — não na terapia dupla",
          val: "40 mg VO 2x/dia (dose padrão do Consenso, em equivalente de omeprazol), 30 a 60 min antes da refeição, nos 14 dias do esquema",
          f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
        { rot: "Adulto — úlcera péptica, depois do esquema de erradicação",
          val: "manter o IBP por mais 4 a 8 semanas após o fim do esquema", p: 25 },
        { rot: "Adulto — gastroproteção com AINE por mais de 5 dias em quem já teve evento gastrointestinal (PCDT Dor Crônica, na osteoartrite de joelho e de quadril)",
          val: "10 ou 20 mg VO em jejum, antes do café da manhã",
          f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024", p: 14 }
      ],
      porque: "Inibe a bomba de prótons da célula parietal e reduz a secreção ácida. IBP é o fármaco de escolha " +
              "no refluxo ácido, e o efeito não muda entre os IBP disponíveis (FBG 2024).",
      escolher: "DRGE erosiva ou não erosiva (o tratamento é o mesmo); dispepsia sem sinal de alarme; úlcera " +
                "péptica; parte de todo esquema contra o H. pylori. Na DRGE, tratamento otimizado é IBP em dose " +
                "plena com medidas comportamentais por 2 meses; sem controle, EDA (Protocolo de Gastroenterologia " +
                "2025). Controlado, a manutenção pode ser contínua ou sob demanda (FBG 2024).",
      evitar: "Prova terapêutica com IBP em quem tem sinal de alarme: o caminho é a EDA. Teste de H. pylori em " +
              "uso de IBP: suspender o IBP 14 dias antes (V Consenso 2026). Manter por anos sem rever a " +
              "indicação, sobretudo no idoso.",
      contraind: "Não listada no TeleCondutas 2024 nem no Protocolo de Gastroenterologia 2025: conferir na bula.",
      adversos: "Uso prolongado: atenção no idoso, no imunossuprimido e em quem tem risco de doença óssea, renal " +
                "ou de deficiência de ferro, vitamina B12 e magnésio; riscos maiores não foram comprovados (FBG " +
                "2024). Reduz a absorção do ferro oral (TeleCondutas Anemia 2023) e da levotiroxina " +
                "(TeleCondutas Hipotireoidismo 2020). Pode elevar enzimas hepáticas (Quadro 5 do Protocolo de " +
                "Gastroenterologia 2025).",
      monitor: "Reavaliar a resposta ao fim de 2 meses de dose plena. Ferro oral: tomar 2 horas antes ou 4 " +
               "horas depois do IBP (TeleCondutas Anemia 2023).",
      diverge: "Dose de IBP nos esquemas de H. pylori: o TeleCondutas 2024 (adaptado do IV Consenso, 2018) usa " +
               "omeprazol 20 mg de 12/12 h; o V Consenso 2026 define a dose padrão como 40 mg de equivalente de " +
               "omeprazol 2x/dia e, na terapia dupla, IBP em dose alta 3 ou 4 vezes ao dia.",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024"
    },
    {
      nome: "Claritromicina",
      id: "claritromicina",
      kw: "claritromicina macrolideo h pylori helicobacter erradicacao ulcera tripla concomitante",
      apres: "cápsula 500 mg; comprimido 250 mg e 500 mg; grânulo para suspensão oral 50 mg/mL (RENAME 2024)",
      dose: [
        { rot: "Adulto — erradicação do H. pylori, na terapia concomitante (a tríplice com IBP só com resistência abaixo de 15% ou sensibilidade confirmada)",
          val: "500 mg VO de 12/12 h por 14 dias — sempre com amoxicilina e IBP (ver os combos)", p: 25 }
      ],
      porque: "Macrolídeo que entra nos esquemas de erradicação do H. pylori junto com amoxicilina e IBP. A " +
              "resistência do H. pylori à claritromicina é o que derruba a tríplice clássica (V Consenso 2026).",
      escolher: "Só dentro de esquema de erradicação. O V Consenso 2026 desencoraja a tríplice com IBP, salvo " +
                "resistência local baixa ou sensibilidade confirmada; a terapia concomitante (com metronidazol) " +
                "e a tríplice otimizada com bismuto ou vonoprazana são as formas que o Consenso mantém.",
      evitar: "Repetir em quem já usou claritromicina num esquema anterior (V Consenso 2026). Cautela em quem " +
              "tem intervalo QT prolongado (V Consenso 2026). Junto com sinvastatina ou atorvastatina: ver o " +
              "proibido car-sinvastatina-macrolideo (SBC 2025).",
      contraind: "O TeleCondutas 2024 e o V Consenso 2026 não listam contraindicação absoluta: conferir na bula, " +
                 "inclusive as interações do macrolídeo.",
      adversos: "Elevação de enzimas hepáticas por reação idiossincrásica (macrolídeos no Quadro 5 do Protocolo " +
                "de Gastroenterologia 2025). Os demais não foram conferidos: ver a bula.",
      monitor: "Confirmar a erradicação com teste respiratório com ureia ou antígeno fecal, pelo menos 4 semanas " +
               "depois do antibiótico e 14 dias sem IBP (V Consenso 2026); na úlcera péptica, EDA de controle em " +
               "8 a 12 semanas (Protocolo de Gastroenterologia 2025).",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Diarreia aguda: reidratação, antiemético e antibiótico",
  kw: "diarreia desidratacao sro soro reidratacao oral plano a plano b plano c vomito ondansetrona disenteria ciprofloxacino soro fisiologico",
  quando: "Diarreia aguda pelo cartaz do MS (2023): planos A, B e C, antiemético no plano B e antibiótico só na " +
          "disenteria com comprometimento do estado geral.",
  nota: "Criança de 2 meses a 5 anos: seguir o guia AIDPI (zinco e doses de criança pequena estão lá). Antidiarreico " +
        "não se usa (cartaz 2023).",
  farmacos: [
    {
      nome: "Sais para reidratação oral (SRO)",
      id: "sais-de-reidratacao-oral",
      kw: "sro soro caseiro reidratacao oral sais envelope diarreia desidratacao plano a plano b",
      apres: "pó para solução oral em envelope (cloreto de sódio, glicose anidra, cloreto de potássio, citrato de " +
             "sódio di-hidratado) — RENAME 2024",
      dose: [
        { rot: "Todas as idades — plano A (prevenir desidratação em casa)",
          val: "após cada evacuação diarreica: menor de 1 ano, 50 a 100 mL; de 1 a 10 anos, 100 a 200 mL; acima de 10 anos, o quanto aceitar — em pequenas quantidades e mais vezes" },
        { rot: "Todas as idades — plano B (com desidratação, na unidade)",
          val: "50 a 100 mL/kg (média de 75 mL/kg) em 4 a 6 horas, só como orientação inicial — o volume segue a sede; continuar até sumirem os sinais de desidratação" },
        { rot: "Adulto (13 anos ou mais) — dengue, grupos A e B: volume do dia", val: "60 mL/kg/dia de líquido, 1/3 como SRO e 2/3 como líquidos caseiros; 1/3 do total nas primeiras 4 a 6 horas — ex.: 70 kg = 4,2 L/dia, 1,4 L nas primeiras 4 a 6 h; escrever o volume na receita", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 30 },
        { rot: "Criança abaixo de 13 anos — dengue, grupos A e B: volume do dia", val: "até 10 kg, 130 mL/kg/dia; acima de 10 até 20 kg, 100 mL/kg/dia; acima de 20 kg, 80 mL/kg/dia — 1/3 como SRO; 1/3 do total nas primeiras 4 a 6 horas; manter o peito e a comida", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 30 }
      ],
      porque: "Repõe água e eletrólitos perdidos nas fezes e no vômito; é o tratamento da diarreia aguda. Os " +
              "antidiarreicos não devem ser usados (cartaz 2023).",
      escolher: "Plano A: diarreia sem desidratação, em casa (líquidos caseiros ou SRO). Plano B: com desidratação " +
                "(dois ou mais sinais), na própria unidade, até a reidratação completa (cartaz 2023).",
      evitar: "Misturar a SRO com chá, leite ou refrigerante; usá-la no lugar das refeições (CAB nº 28). No plano A, " +
              "não usar refrigerante e, de preferência, não adoçar o chá ou o suco (cartaz 2023).",
      contraind: "Contraindicam a terapia de reidratação oral e indicam a via venosa: perda de peso ou ganho " +
                 "insuficiente nas primeiras horas, vômitos persistentes, recusa persistente, distensão abdominal " +
                 "grave ou íleo paralítico, alteração da consciência, choque (CAB nº 28, Quadro 18).",
      adversos: "Não listados no cartaz de 2023 nem no CAB nº 28: conferir na bula.",
      monitor: "No plano B, reavaliar com o quadro de avaliação do estado de hidratação: sem sinais, plano A; " +
               "continua desidratado, sonda nasogástrica; piora, plano C. Sem melhora em 6 horas, hospital " +
               "(cartaz 2023). Preparo: seguir a instrução do envelope — o cartaz manda ensinar o preparo, mas não " +
               "traz o volume de água.",
      fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023"
    },
    {
      nome: "Cloreto de sódio 0,9% (soro fisiológico) — reidratação venosa",
      id: "cloreto-de-sodio-0-9",
      kw: "soro fisiologico sf cloreto de sodio ringer lactato plano c desidratacao grave choque expansao venosa",
      apres: "solução injetável 9 mg/mL (0,9%), RENAME 2024; a solução de Ringer com lactato também consta da " +
             "RENAME 2024 e serve no mesmo esquema",
      dose: [
        { rot: "A partir de 1 ano, inclusive adulto — diarreia com desidratação grave (plano C), fase de expansão",
          val: "30 mL/kg EV em 30 minutos e, em seguida, 70 mL/kg em 2 horas e 30 minutos — SF 0,9% ou Ringer lactato; criança abaixo de 5 anos com cardiopatia grave: começar com 10 mL/kg; se não melhorar, aumentar a velocidade" },
        { rot: "Menor de 1 ano — diarreia com desidratação grave (plano C), fase de expansão",
          val: "30 mL/kg EV em 1 hora e, em seguida, 70 mL/kg em 5 horas — SF 0,9% ou Ringer lactato; recém-nascido ou cardiopatia grave: começar com 10 mL/kg" },
        { rot: "Adulto — suspeita de cetoacidose ou de estado hiperglicêmico hiperosmolar, até a remoção: 1ª hora", val: "1.000 mL EV — atenção ao coração e ao rim (cardiopata, idoso, doença renal): somar o volume total para a ficha de referência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 53 },
        { rot: "Adulto — suspeita de cetoacidose ou de estado hiperglicêmico hiperosmolar, até a remoção: depois", val: "500 mL/h até boa diurese — atenção ao coração e ao rim (cardiopata, idoso, doença renal): somar o volume total para a ficha de referência", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 53 },
        { rot: "Criança até o início da puberdade — suspeita de cetoacidose, até a remoção: 1ª hora", val: "10 a 20 mL/kg EV na 1ª hora — depois, só com a regulação: o Caderno manda manter até a glicemia chegar a cerca de 250, e o SAMU pede hidratação lenta pelo risco de edema cerebral", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 53 },
        { rot: "Adulto — anafilaxia com choque", val: "1 a 2 L EV rápido: 5 a 10 mL/kg nos primeiros 5 a 10 minutos", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
        { rot: "Dengue grupo C (sinal de alarme), adulto e criança — começar na UBS e manter no transporte", val: "10 mL/kg EV na primeira hora; na segunda hora, 10 mL/kg/hora até o hematócrito (no máximo 20 mL/kg em duas horas por fase); sem melhora, repetir a fase até três vezes", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 33 },
        { rot: "Dengue grupo D (choque), adulto e criança — começar na UBS e manter no transporte", val: "20 mL/kg EV em até 20 minutos; repetir até três vezes, conforme a avaliação clínica", f: "MS — Dengue: diagnóstico e manejo clínico, adulto e criança, 6ª ed., 2024", p: 36 }
      ],
      porque: "Expansão venosa que começa na UBS e segue no transporte: plano C da diarreia, dengue grupos C e D, cetoacidose e anafilaxia com choque; cada linha diz a indicação (cartaz 2023 para o plano C).",
      escolher: "Plano C: dois ou mais sinais de desidratação, ao menos um grave (comatoso, hipotônico, letárgico " +
                "ou inconsciente; não consegue beber; pulso fraco ou ausente). Na UBS, iniciar enquanto a remoção " +
                "chega (CAB nº 28). A fase de manutenção e reposição está no cartaz e no AIDPI.",
      evitar: "Dar a fase de expansão cheia à criança abaixo de 5 anos com cardiopatia grave: começar com volume menor, como diz a linha do cartão (cartaz 2023, nota 3). Esperar a transferência sem começar a reidratação venosa. Interromper o soro antes de o paciente " +
              "beber SRO o bastante para se manter hidratado (cartaz 2023).",
      contraind: "O cartaz de 2023 não lista contraindicação para a expansão no plano C: conferir na bula e no " +
                 "protocolo do serviço.",
      adversos: "Não listados no cartaz de 2023: conferir na bula.",
      monitor: "Reavaliar continuamente; começar a SRO assim que puder beber (em geral 2 a 3 horas após o início " +
               "da via venosa); observar por pelo menos 6 horas e manter na unidade até estar hidratado e mantendo " +
               "a hidratação por via oral (cartaz 2023). Auscultar o pulmão: hiper-hidratação no idoso e no cardiopata (Dengue 2024, pp. 34 e 36).",
      diverge: "O CAB nº 28 (2012) dava, no adulto, volumes iguais de SF 0,9% e Ringer lactato somando cerca de " +
               "10% do peso em cerca de 2 horas; o cartaz de 2023 é o esquema vigente.",
      fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023"
    },
    {
      nome: "Ondansetrona",
      id: "ondansetrona",
      kw: "ondansetrona antiemetico vomito nausea diarreia plano b",
      apres: "comprimido 4 mg e 8 mg; comprimido orodispersível 4 mg e 8 mg (RENAME 2024)",
      dose: [
        { rot: "Adulto e criança acima de 10 anos (mais de 30 kg) — vômitos persistentes no plano B", val: "8 mg, dose única — não usar na gestante" },
        { rot: "Criança de 2 a 10 anos (até 30 kg) — vômitos persistentes no plano B", val: "4 mg, dose única" },
        { rot: "Criança de 6 meses a 2 anos — vômitos persistentes no plano B", val: "2 mg, dose única (0,2 a 0,4 mg/kg, em geral 2 mg)" }
      ],
      porque: "Antiemético antagonista 5-HT3: no plano B, garante que o paciente consiga beber a SRO e se " +
              "reidratar (cartaz 2023).",
      escolher: "Só com vômitos persistentes durante o plano B (cartaz 2023). O cartaz não diz a via; a RENAME " +
                "tem comprimido e comprimido orodispersível.",
      evitar: "Gestante (cartaz 2023: não utilizar). Abaixo de 6 meses: o cartaz não dá dose. Associar com metoclopramida — mecanismos que se anulam (ver " +
              "pal-metoclopramida-ondansetrona). Dar fora do plano B, como rotina na diarreia.",
      contraind: "Gestação (cartaz 2023). As demais não foram conferidas: ver a bula.",
      adversos: "Não listados no cartaz de 2023: conferir na bula.",
      monitor: "Reavaliar a aceitação da SRO depois da dose; vômitos que persistem contraindicam a via oral e " +
               "levam ao plano C (CAB nº 28).",
      diverge: "O AIDPI 2017 dá 0,2 mg/kg/dose até três vezes ao dia (2 mg dos 6 meses aos 2 anos; 4 mg acima de " +
               "2 anos, sublingual); o cartaz de 2023 dá dose única. Abaixo de 5 anos, seguir o guia AIDPI.",
      fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023"
    },
    {
      nome: "Ciprofloxacino",
      id: "ciprofloxacino",
      kw: "ciprofloxacino ciprofloxacina quinolona disenteria diarreia com sangue shigella antibiotico",
      apres: "comprimido 250 mg e 500 mg (RENAME 2024)",
      dose: [
        { rot: "Adulto, adolescente e criança acima de 10 anos com mais de 30 kg — disenteria com comprometimento do estado geral",
          val: "500 mg VO de 12/12 h por 3 dias" },
        { rot: "Mulher adulta não gestante — ITU complicada ou com sintoma sistêmico, quando há como tratar em casa", val: "500 mg VO de 12/12 horas, por 7 a 14 dias — colher urocultura antes e reavaliar em 24 horas", f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016", p: 61 },
        { rot: "Homem adulto — pielonefrite leve, sem comorbidade e com bom estado geral", val: "500 mg VO de 12/12 horas, por 10 a 14 dias — reavaliar em 48 horas", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 79 },
        { rot: "Homem adulto — cistite (alternativa à cefalexina)", val: "500 mg VO de 12/12 horas, por 7 dias", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 77 },
        { rot: "Homem adulto — prostatite bacteriana aguda (alternativa ao SMX-TMP)", val: "500 mg VO de 12/12 horas, por três a quatro semanas", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 78 }
      ],
      porque: "Fluoroquinolona oral para infecção bacteriana invasiva: disenteria com comprometimento do estado geral " +
              "(cartaz de 2023), ITU complicada e pielonefrite leve tratadas em casa (Protocolos AB 2016; CAB nº 28) e " +
              "prostatite ou cistite do homem (CAB nº 28).",
      escolher: "Disenteria com comprometimento do estado geral, febre alta persistente, dor abdominal, tenesmo " +
                "ou comprometimento sistêmico, ou cólera grave (cartaz 2023); ITU complicada da mulher e pielonefrite " +
                "leve tratadas em casa (Protocolos AB 2016); cistite e prostatite do homem (CAB nº 28). Nunca na " +
                "cistite não complicada da mulher nem na gestante (consenso 2020). Em outras diarreias, o antibiótico " +
                "é ineficaz e gera resistência (cartaz 2023). Criança de até 30 kg: o cartaz usa azitromicina (ver a queixa).",
      evitar: "Diarreia aquosa sem sangue. Gestante: o CAB nº 28 (2012) contraindica quinolona na gestante e na " +
              "criança; o cartaz de 2023 não trata da gestante — decidir com a preceptora. Cautela especial no idoso, " +
              "no portador de doença renal, no transplantado e em quem usa corticoide: risco maior de lesão de tendão " +
              "(consenso de ITU 2020, citando a EMA 2019).",
      contraind: "Gestação: quinolonas são contraindicadas por poderem levar a danos fetais (MS — Manual de Gestação " +
                 "de Alto Risco, 2022, p. 571; também o CAB nº 28, 2012). As demais não foram conferidas: ver a bula.",
      adversos: "Hepatotoxicidade idiossincrásica (fluoroquinolonas no Quadro 5 do Protocolo de Gastroenterologia " +
                "2025). Incapacidade associada à fluoroquinolona (FDA 2016; EMA 2019): tendinite e ruptura de tendão, " +
                "fraqueza muscular, neuropatia periférica, disfunção autonômica e cognitiva, convulsão, demência, " +
                "distúrbios psiquiátricos, ruptura de aneurisma de aorta, arritmias e disglicemia (consenso de ITU 2020). " +
                "Os demais não foram conferidos: ver a bula.",
      monitor: "Reavaliar em 2 dias. Sangue nas fezes depois de 48 horas: com boas condições gerais, seguir só a " +
               "hidratação, sem antibiótico; com condições comprometidas, ceftriaxona ou internação (cartaz 2023).",
      diverge: "O CAB nº 28 (Quadro 20) contraindica quinolona também na criança; o cartaz de 2023 a usa acima de 10 anos e de 30 kg.",
      fonte: "MS — Manejo do paciente com diarreia (cartaz), 2023"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antiparasitários",
  kw: "verme verminose parasitose lombriga ascaris ancilostomo amarelao oxiuro enterobius estrongiloides tenia solitaria esquistossomose xistose barriga dagua escabiose albendazol ivermectina praziquantel",
  quando: "Parasitoses intestinais e esquistossomose na APS. Cada linha diz a parasitose e a população.",
  nota: "O guia de bolso do MS é de 2010 e cita fármacos que nenhuma fonte mais nova recomenda; a dose de " +
        "criança vem da SBP (2020) ou do GVS (2024), e a linha diz de qual. Mebendazol, nitazoxanida, " +
        "secnidazol e tinidazol não estão na RENAME 2024.",
  farmacos: [
    {
      nome: "Albendazol",
      id: "albendazol",
      kw: "albendazol zentel verme lombriga ascaridiase ancilostomiase amarelao enterobiase oxiuro teniase giardiase geo-helmintiase",
      apres: "comprimido mastigável 400 mg; suspensão oral 40 mg/mL (RENAME 2024)",
      dose: [
        { rot: "Adulto — ascaridíase", val: "400 mg VO, dose única", p: 98 },
        { rot: "Adulto — ancilostomíase", val: "2 comprimidos (1 comprimido = 200 mg) VO, dose única", p: 96 },
        { rot: "Adulto — enterobíase", val: "400 mg VO, dose única — o teto da dose de 10 mg/kg do guia", p: 167 },
        { rot: "Adulto — teníase", val: "400 mg/dia VO por 3 dias", p: 388 },
        { rot: "Adulto — giardíase (alternativa ao metronidazol)", val: "400 mg VO 1x/dia por 5 dias",
          f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024", p: 27 },
        { rot: "Tricuríase (SBP, guia pediátrico; sem linha do MS)", val: "400 mg VO 1x/dia por 3 a 7 dias",
          f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020", p: 7 },
        { rot: "Adulto — diarreia crônica: tratamento empírico de parasitose na APS", val: "400 mg/dia VO por 5 dias",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Gastroenterologia adulto, 3ª ed., 2025", p: 44 },
        { rot: "Criança a partir de 2 anos (SBP) — ascaridíase, ancilostomíase ou enterobíase",
          val: "400 mg VO, dose única; na enterobíase, repetir em 2 semanas",
          f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020", p: 7 },
        { rot: "Criança de 12 a 24 meses (SBP) — ascaridíase ou ancilostomíase", val: "200 mg VO, dose única",
          f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020", p: 2 }
      ],
      porque: "Benzimidazólico ovicida, larvicida e vermicida (guia de bolso 2010); é a 1ª escolha nas " +
              "geo-helmintíases e o que a rede dá de graça (GVS 2024).",
      escolher: "Ascaridíase, ancilostomíase, tricuríase e enterobíase; teníase; giardíase como alternativa ao " +
                "metronidazol (TeleCondutas 2024); tratamento empírico de parasitose na diarreia crônica " +
                "(Protocolo de Gastroenterologia 2025). Na estrongiloidíase, a escolha é a ivermectina (SBP 2020).",
      evitar: "Gestação (GVS 2024; guia de bolso 2010). Estrongiloidíase: usar a ivermectina — a dose de " +
              "albendazol impressa no guia de bolso para essa parasitose não bate com a apresentação do " +
              "comprimido e não foi usada aqui.",
      contraind: "Gestação: os anti-helmínticos não devem ser usados (GVS 2024, p. 974). As demais não foram " +
                 "conferidas: ver a bula.",
      adversos: "Dor abdominal transitória, náusea ou diarreia, sobretudo com carga alta de vermes (SBP 2020).",
      monitor: "Controle de cura com parasitológico de fezes no 7º, 14º e 21º dia na ancilostomíase (guia de bolso " +
               "2010). Enterobíase: tratar todos da casa acima de 6 meses (SBP 2020).",
      diverge: "Criança na ascaridíase: o guia de bolso de 2010 dá 10 mg/kg em dose única; a SBP (2020) dá 400 mg a " +
               "partir de 2 anos e 200 mg de 12 a 24 meses — as linhas acima seguem a SBP.",
      fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010"
    },
    {
      nome: "Ivermectina",
      id: "ivermectina",
      kw: "ivermectina revectina estrongiloidiase strongyloides escabiose sarna piolho verme hiperinfeccao",
      apres: "comprimido 6 mg (RENAME 2024)",
      dose: [
        { rot: "Pessoa com 15 kg ou mais — estrongiloidíase (guia de bolso MS)",
          val: "dose única VO, por faixa de peso: 15 a 24 kg, ½ comprimido; 25 a 35 kg, 1; 36 a 50 kg, 1½; 51 a 65 kg, 2; 65 a 79 kg, 2½; 80 kg ou mais, 3 comprimidos", p: 177 },
        { rot: "Pessoa com 15 kg ou mais — escabiose (guia de bolso MS)",
          val: "dose única VO, pela mesma faixa de peso (15 a 24 kg, ½ comprimido; 25 a 35 kg, 1; 36 a 50 kg, 1½; 51 a 65 kg, 2; 65 a 79 kg, 2½; 80 kg ou mais, 3); pode repetir após 1 semana", p: 169 },
        { rot: "Criança com 15 kg ou mais (SBP) — estrongiloidíase", val: "200 mcg/kg VO por 2 dias — na hiperinfecção, prolongar",
          f: "SBP — Guia Prático de Atualização nº 7, Parasitoses intestinais: diagnóstico e tratamento, 2020", p: 8 }
      ],
      porque: "1ª linha na estrongiloidíase (SBP 2020); também trata escabiose (guia de bolso 2010).",
      escolher: "Estrongiloidíase; escabiose. Quem vai usar corticoide em dose alta ou imunossupressor deve ser " +
                "avaliado e tratado para estrongiloides antes (guia de bolso 2010; SBP 2020).",
      evitar: "Abaixo de 15 kg e na gestação: segurança não estabelecida (SBP 2020). Lactante (CAB nº 28, p. 86). Dar sem pesar o paciente.",
      contraind: "Abaixo de 15 kg e gestação, pela SBP (2020); lactação (CAB nº 28, 2012, p. 86, na escabiose). As demais não foram conferidas: ver a bula.",
      adversos: "Não descritos no guia de bolso 2010 nem na SBP 2020: conferir na bula.",
      monitor: "Estrongiloidíase: três parasitológicos de fezes, no 7º, 14º e 21º dia (guia de bolso 2010). Tomar " +
               "com o estômago vazio, com água (SBP 2020). O guia de bolso escreve 'comprimido' sem a concentração; " +
               "a escala corresponde ao comprimido de 6 mg da RENAME.",
      diverge: "Estrongiloidíase: o guia de bolso (2010) dá dose única pela faixa de peso; a SBP (2020) dá 200 " +
               "mcg/kg por 2 dias.",
      fonte: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010"
    },
    {
      nome: "Praziquantel",
      id: "praziquantel",
      kw: "praziquantel esquistossomose xistose barriga dagua schistosoma teniase solitaria",
      apres: "comprimido 600 mg (RENAME 2024, Componente Estratégico)",
      dose: [
        { rot: "Adulto — esquistossomose mansoni", val: "50 mg/kg VO, de preferência em dose única — repouso de pelo menos 3 horas depois", p: 962 },
        { rot: "Criança de 2 anos ou mais — esquistossomose mansoni (o GVS não define a idade em que passa a 50 mg/kg)",
          val: "60 mg/kg VO, de preferência em dose única — sem teto na fonte: em criança grande ou adolescente, conferir com a preceptora antes de passar da dose do adulto; abaixo de 2 anos, só a critério médico", p: 962 },
        { rot: "Adulto — teníase (guia de bolso MS)", val: "5 a 10 mg/kg VO, dose única",
          f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010", p: 388 }
      ],
      porque: "É o único fármaco que o MS distribui para a esquistossomose (GVS 2024).",
      escolher: "Esquistossomose com ovos de S. mansoni nas fezes (GVS 2024). Teníase: alternativa do guia de bolso " +
                "(2010); a RENAME o lista no Componente Estratégico, para a esquistossomose — conferir a " +
                "dispensação para teníase no município.",
      evitar: "Gestação; amamentação (a lactante com forma grave é tratada sob supervisão médica); menor de 2 anos, " +
              "a critério médico (GVS 2024).",
      contraind: "Gestação; insuficiência hepática grave (fase descompensada da forma hepatoesplênica); insuficiência " +
                 "renal ou outras descompensações graves, a critério médico (GVS 2024, p. 962).",
      adversos: "Predominam diarreia e dor abdominal; náusea e tontura passageiras. Não há evidência de lesão tóxica " +
                "grave no fígado ou em outros órgãos (GVS 2024, Quadro 1).",
      monitor: "Pesar antes de calcular. Fracionar o comprimido expõe sabor amargo, o que dificulta na criança (GVS " +
               "2024). Casos graves, hospitalizados ou de área não endêmica: notificar no Sinan.",
      fonte: "MS — Guia de Vigilância em Saúde, vol. 2, 6ª ed. rev., 2024"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antivirais da hepatite C na APS",
  kw: "hepatite c hcv antiviral daa sofosbuvir daclatasvir apri tratamento aps",
  quando: "Hepatite C com APRI abaixo de 1, sem cirrose e sem os critérios de encaminhamento do PCDT de 2026: a " +
          "APS prescreve e a unidade dispensadora entrega.",
  farmacos: [
    {
      nome: "Sofosbuvir + daclatasvir (esquema da APS na hepatite C)",
      id: "sofosbuvir-daclatasvir",
      kw: "sofosbuvir daclatasvir hepatite c hcv antiviral acao direta daa apri",
      apres: "sofosbuvir comprimido 400 mg; daclatasvir comprimido 30 mg e 60 mg — comprimidos separados (RENAME " +
             "2024, Componente Estratégico)",
      dose: [
        { rot: "Adulto com hepatite C, APRI abaixo de 1 e sem cirrose — tratamento inicial ou reinfecção",
          val: "sofosbuvir 400 mg 1 comprimido + daclatasvir 60 mg 1 comprimido (ou daclatasvir 30 mg, 2 comprimidos), juntos, VO, 1x/dia, por 12 semanas", p: 46 }
      ],
      porque: "Dois antivirais de ação direta de classes diferentes, pangenotípicos; a chance de cura supera 90% " +
              "(PCDT Hepatite C 2026).",
      escolher: "Toda pessoa com HCV-RNA detectável tem indicação de tratar, aguda ou crônica. Na APS: APRI abaixo " +
                "de 1, sem cirrose e sem coinfecção HIV ou HBV, gestação, idade abaixo de 18 anos, depuração de " +
                "creatinina abaixo de 30, quimioterapia, transplante, neoplasia, anticonvulsivante de 1ª geração ou " +
                "amiodarona, manifestação extra-hepática grave ou falha prévia de DAA (PCDT 2026). APRI de 1 ou mais " +
                "ou cirrose: outro esquema, no serviço especializado.",
      evitar: "Gestação e amamentação (PCDT Hepatite C 2026: o tratamento não deve ser feito em grávidas e, na amamentação, aguardar o término); teste de gravidez e contracepção antes de iniciar. Rifampicina, rifabutina, rifapentina, " +
              "carbamazepina, oxcarbazepina, fenitoína e fenobarbital: nenhum DAA pode ser usado junto; amiodarona: " +
              "evitar (PCDT 2026).",
      contraind: "Gestação e aleitamento (PCDT Hepatite C 2026, pp. 36 e 58-59); uso concomitante dos indutores " +
                 "listados acima (PCDT 2026).",
      adversos: "Poucos ou nenhum efeito adverso, pelo PCDT 2026; o perfil detalhado não foi conferido — ver a bula.",
      monitor: "Rever interações de todo medicamento, inclusive os não prescritos, antes e durante o tratamento. " +
               "Cura (RVS): HCV-RNA indetectável a partir de 12 semanas após o fim do esquema. Evitar gravidez " +
               "durante e até 6 meses depois (GVS 2024).",
      fonte: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Tireoide",
  kw: "tireoide hipotireoidismo hipertireoidismo graves bocio tsh t4 levotiroxina tiamazol metimazol propiltiouracila",
  quando: "Hipotireoidismo primário tratado na APS; hipertireoidismo iniciado na APS até a consulta com o " +
          "endocrinologista; gestante com tireoidopatia.",
  farmacos: [
    {
      nome: "Levotiroxina",
      id: "levotiroxina",
      kw: "levotiroxina puran synthroid euthyrox t4 hipotireoidismo hashimoto tsh alto",
      apres: "comprimido 12,5 mcg, 25 mcg, 37,5 mcg, 50 mcg e 100 mcg (RENAME 2024)",
      dose: [
        { rot: "Adulto saudável abaixo de 60 anos — hipotireoidismo primário franco",
          val: "1,6 mcg/kg/dia VO, dose plena desde o início — em jejum, 30 minutos antes do café da manhã", p: 6 },
        { rot: "Idoso ou cardiopata — hipotireoidismo primário franco",
          val: "início 25 mcg/dia VO; subir 12,5 a 25 mcg/dia a cada duas semanas, até a dose adequada pelo TSH", p: 6 },
        { rot: "Idoso acima de 80 anos, ou com coronariopatia ou insuficiência cardíaca (SBEM)",
          val: "início 12,5 a 25 mcg/dia VO; titular a cada 4 a 8 semanas",
          f: "SBEM — Abordagem do adulto com hipotireoidismo primário em situações especiais, Arch Endocrinol Metab, 2022" },
        { rot: "Adulto — hipotireoidismo subclínico com indicação de tratar", val: "25 a 75 mcg/dia VO", p: 6 },
        { rot: "Gestante — hipotireoidismo franco diagnosticado na gestação",
          val: "100 a 150 mcg/dia VO, ou 1,6 mcg/kg/dia, começando já", p: 8 },
        { rot: "Gestante que já usava levotiroxina — ao confirmar a gestação", val: "aumentar a dose em 25 a 30%", p: 8 },
        { rot: "Gestante — hipotireoidismo subclínico com TSH acima de 4,0, com indicação de tratar",
          val: "cerca de 1,0 mcg/kg/dia VO", p: 9 },
        { rot: "Gestante — TSH entre 2,6 e 4,0, quando se opta por tratar", val: "50 mcg/dia VO", p: 9 }
      ],
      porque: "Repõe o T4 no hipotireoidismo primário; o tratamento depende sobretudo da dose certa e da adesão, e " +
              "raramente precisa de endocrinologista (TeleCondutas 2020).",
      escolher: "Hipotireoidismo primário franco: sempre. Subclínico: TSH persistentemente acima de 10; de 7 a 10 " +
                "com menos de 65 anos, ou 65 ou mais com sintomas muito sugestivos; acima do normal e abaixo de 7, " +
                "com menos de 65 anos e anti-TPO alto, bócio ou sintomas muito sugestivos (TeleCondutas 2020). No " +
                "idoso, o subclínico com TSH acima de 10 pode ser tratado; acima de 80 anos, cautela (SBEM 2022).",
      evitar: "Tomar com o café da manhã ou junto com ferro, carbonato de cálcio, suplementos minerais, hidróxido de " +
              "alumínio ou omeprazol, que reduzem a absorção (TeleCondutas 2020). Usar para reduzir nódulo em quem " +
              "não tem hipotireoidismo (TeleCondutas Nódulo 2022).",
      contraind: "O TeleCondutas 2020 não lista contraindicação: conferir na bula. Excesso de dose no idoso aumenta " +
                 "fibrilação atrial e fratura (SBEM 2022).",
      adversos: "Os de dose excessiva: palpitação, hiperatividade, perda de peso com aumento do apetite — antecipar " +
                "a consulta (TeleCondutas 2020).",
      monitor: "TSH 6 a 8 semanas depois de iniciar ou ajustar, até normalizar; depois, a cada 6 meses no 1º ano e " +
               "então anual. Não precisa de T4 livre nem de T3 no seguimento do hipotireoidismo primário. Mais de " +
               "2,5 mcg/kg/dia sem controle: rever adesão, absorção e fenobarbital, fenitoína ou carbamazepina; " +
               "persistindo, endocrinologista (TeleCondutas 2020). Gestante: TSH mensal até a metade da gestação. " +
               "Idoso: alvo de TSH de 2,0 a 6,0 (SBEM 2022).",
      diverge: "Início no idoso: o TeleCondutas 2020 manda começar baixo em todo idoso ou cardiopata; a SBEM (2022) " +
               "aceita dose plena no idoso saudável abaixo de 80 anos e reserva o início baixo para 80 anos ou mais " +
               "e comorbidade grave. Titulação no cardiopata: o TeleCondutas sobe a cada 2 semanas; a SBEM, no coronariopata e na " +
               "insuficiência cardíaca, a cada 4 a 8 semanas, com alvo de TSH de 2,0 a 6,0 no idoso.",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipotireoidismo, 2020"
    },
    {
      nome: "Tiamazol (metimazol)",
      id: "metimazol",
      kw: "tiamazol metimazol tapazol antitireoidiano hipertireoidismo graves bocio toxico",
      apres: "comprimido 5 mg e 10 mg (RENAME 2024)",
      dose: [
        { rot: "Adulto — hipertireoidismo franco, T4 livre de 1 a 1,5 vez o valor normal", val: "5 a 10 mg VO 1x/dia", p: 6 },
        { rot: "Adulto — hipertireoidismo franco, T4 livre de 1,5 a 2 vezes o valor normal", val: "10 a 20 mg VO 1x/dia", p: 7 },
        { rot: "Adulto — hipertireoidismo franco, T4 livre de 2 a 3 vezes o valor normal", val: "20 a 40 mg/dia VO, em 1 ou 2 tomadas", p: 7 },
        { rot: "Adulto — manutenção, com T3 e T4 livre normais",
          val: "reduzir a dose em 30 a 50% e repetir os exames em 4 a 6 semanas; em geral, 5 a 10 mg/dia bastam", p: 7 },
        { rot: "Adulto — hipertireoidismo subclínico com indicação de tratar", val: "5 a 10 mg/dia VO", p: 10 },
        { rot: "Gestante a partir de 16 semanas — doença de Graves", val: "5 a 30 mg/dia VO, em dose única", p: 15 }
      ],
      porque: "Antitireoidiano de 1ª escolha por ter menor risco de hepatotoxicidade grave que o propiltiouracila " +
              "(TeleCondutas 2021).",
      escolher: "Hipertireoidismo franco (Graves, bócio multinodular tóxico, adenoma tóxico): iniciar na APS e " +
                "encaminhar ao endocrinologista. Subclínico: pelo Quadro 2 do TeleCondutas (idade, TSH, " +
                "comorbidade). Amamentação: é o de escolha (TeleCondutas 2021), e o Manual de Gestação de Alto Risco (MS, 2022) o aceita na amamentação (ver o campo de divergência).",
      evitar: "1º trimestre da gestação: trocar pelo propiltiouracila. Tireotoxicose gestacional transitória e " +
              "tireoidite subaguda: antitireoidiano não está indicado (TeleCondutas 2021).",
      contraind: "1º trimestre da gestação (TeleCondutas 2021). As demais não foram conferidas: ver a bula.",
      adversos: "Hepatotoxicidade grave é menos frequente que com o propiltiouracila (TeleCondutas 2021). Os demais, " +
                "inclusive o risco hematológico, não foram conferidos em fonte desta onda: ver a bula. Agranulocitose e hepatite " +
                "medicamentosa, raras: suspender o fármaco (MS — Manual de Gestação de Alto Risco, 2022, dito para a gestante).",
      monitor: "T4 livre e T3 total a cada 4 a 6 semanas até estabilizar a dose; depois, a cada 3 a 6 meses. O TSH " +
               "pode ficar suprimido de 6 a 12 meses: não usar o TSH para ajustar no início. Graves: manter de 12 a " +
               "18 meses (TeleCondutas 2021).",
      diverge: "Lactante: o Manual de Gestação de Alto Risco (MS, 2022) aceita até 30 mg/dia. Gestante: o mesmo Manual dá tiamazol 10 a 30 mg/dia em 1 ou 2 tomadas, prefere o PTU " +
               "e só troca por intolerância; o TeleCondutas 2021 troca para tiamazol a partir de 16 semanas. A gestante vai ao " +
               "pré-natal de alto risco, que decide.",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021"
    },
    {
      nome: "Propiltiouracila",
      id: "propiltiouracil",
      kw: "propiltiouracila propiltiouracil ptu antitireoidiano gestacao primeiro trimestre graves",
      apres: "comprimido 100 mg (RENAME 2024)",
      dose: [
        { rot: "Gestante no 1º trimestre — doença de Graves",
          val: "200 a 450 mg/dia VO, divididos em 2 a 3 tomadas — a partir de 16 semanas, trocar por tiamazol", p: 15 }
      ],
      porque: "Menor risco de malformação fetal que o tiamazol no 1º trimestre (TeleCondutas 2021).",
      escolher: "1º trimestre da gestação, inclusive em quem engravidou usando tiamazol; crise tireotóxica, no " +
                "hospital (TeleCondutas 2021). Fora disso, o tiamazol é o de escolha.",
      evitar: "Depois de 16 semanas de gestação e fora da gestação: mais hepatotóxico que o tiamazol (TeleCondutas " +
              "2021).",
      contraind: "O TeleCondutas 2021 não lista contraindicação absoluta: conferir na bula.",
      adversos: "Hepatotoxicidade, maior que a do tiamazol (TeleCondutas 2021). Agranulocitose e hepatite medicamentosa, " +
                "raras: suspender o fármaco (MS — Manual de Gestação de Alto Risco, 2022, dito para a gestante). Os demais " +
                "não foram conferidos: ver a bula.",
      monitor: "Gestante: T4 total e TSH a cada 2 a 4 semanas no início ou ajuste; controlada, a cada 4 semanas. O " +
               "alvo é T4 total até 1,5 vez o limite superior para não gestante. Encaminhar ao pré-natal de alto " +
               "risco (TeleCondutas 2021).",
      diverge: "O Manual de Gestação de Alto Risco (MS, 2022) dá PTU 100 a 450 mg/dia em 3 ou 4 tomadas, prefere o PTU e só troca " +
               "por intolerância; o TeleCondutas 2021 troca para tiamazol a partir de 16 semanas. A gestante vai ao " +
               "pré-natal de alto risco, que decide.",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Hipertireoidismo, 2021"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Vitamina B12",
  kw: "vitamina b12 cianocobalamina anemia megaloblastica macrocitica deficiencia metformina neuropatia",
  quando: "Deficiência de vitamina B12 no adulto: fase de ataque e, quando a causa não se reverte, manutenção.",
  farmacos: [
    {
      nome: "Cianocobalamina (vitamina B12)",
      id: "cianocobalamina",
      kw: "cianocobalamina vitamina b12 citoneurin anemia megaloblastica macrocitica neuropatia metformina vegano",
      apres: "solução injetável 500 mcg/mL (RENAME 2024): 1.000 mcg são 2 mL; a forma oral não está na RENAME e, " +
             "no comércio, costuma vir associada a B1 e B6 (5.000 mcg)",
      dose: [
        { rot: "Adulto sem sintoma neurológico — deficiência de B12, ataque IM", val: "1.000 mcg IM 3x/semana por 2 semanas", p: 26 },
        { rot: "Adulto sem sintoma neurológico — deficiência de B12, ataque VO",
          val: "1.000 mcg/dia VO; sem tempo estabelecido, sugerem-se 4 a 6 meses", p: 26 },
        { rot: "Adulto com sintoma neurológico — deficiência de B12, ataque",
          val: "1.000 mcg IM 1x/dia por 1 a 5 dias; depois, 1.000 a 2.000 mcg/dia VO por 4 a 6 meses", p: 26 },
        { rot: "Adulto — manutenção, quando a causa não se reverte",
          val: "1.000 mcg IM 1x/mês; sem sintoma neurológico, também 1.000 a 2.000 mcg/dia VO", p: 26 },
        { rot: "Adulto — deficiência ligada à dieta, manutenção",
          val: "50 a 150 mcg/dia VO, ou 2.000 mcg VO 1x/semana", p: 26 }
      ],
      porque: "Repõe a B12 na anemia megaloblástica e nos sintomas neurológicos da deficiência; a via oral é tão " +
              "eficaz quanto a IM em quem adere (TeleCondutas Anemia 2023).",
      escolher: "Deficiência confirmada. Preferir IM com anemia sintomática ou sintoma neuropsiquiátrico, na gestação " +
                "e na suspeita de absorção prejudicada. Manutenção por toda a vida em bariátrica, gastrectomia, " +
                "ressecção de íleo, Crohn, celíaca, anemia perniciosa e dieta vegana persistente (TeleCondutas " +
                "Anemia 2023).",
      evitar: "Começar o ácido fólico antes da B12 quando as duas faltam — precipita degeneração combinada subaguda " +
              "da medula (TeleCondutas Anemia 2023).",
      contraind: "O TeleCondutas Anemia 2023 não lista contraindicação: conferir na bula.",
      adversos: "Na 1ª semana, piora transitória das parestesias. Associações com B6: risco de superdose de B6 se " +
                "passar de 1 g/dia por mais de 2 meses (TeleCondutas Anemia 2023).",
      monitor: "Com alteração hematológica: hemograma e reticulócitos em 7 a 10 dias e em 8 semanas; o VCM deve " +
               "normalizar em 8 semanas. Ataque oral: dosar B12 em 8 semanas. Sintoma neurológico melhora em 1 " +
               "semana e resolve entre 6 semanas e 1 ano (TeleCondutas Anemia 2023).",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Anemia, 2023"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antibacterianos para infecções respiratórias",
  kw: "antibiotico pneumonia pac otite oma sinusite rinossinusite faringite amigdalite amoxicilina clavulanato",
  quando: "Otite média aguda, rinossinusite bacteriana, pneumonia adquirida na comunidade e a segunda linha da " +
          "AIDPI na criança de 2 meses a 5 anos. Resfriado, faringite viral e bronquite aguda não levam antibiótico.",
  nota: "A faringoamigdalite estreptocócica é penicilina benzatina (cartão dos antibacterianos para IST) e o " +
        "alérgico tipo I vai para a azitromicina: os dois cartões ganharam a linha respiratória. Na criança, a " +
        "tabela da AIDPI vai de 4 a 24 kg e não vale fora dessa faixa.",
  farmacos: [
    {
      nome: "Amoxicilina",
      id: "amoxicilina",
      kw: "amoxicilina amoxil penicilina betalactamico pneumonia pac otite oma sinusite rinossinusite crianca aidpi",
      apres: "cápsula 500 mg e comprimido 500 mg; pó para suspensão oral 50 mg/mL (o mesmo que 250 mg/5 mL)",
      dose: [
        { rot: "Criança de 2 meses a 5 anos — pneumonia (respiração rápida, sem sinal geral de perigo)",
          val: "50 mg/kg/dia VO, divididos em 2 tomadas de 12/12 h (metade da dose diária por tomada), por 7 dias — suspensão 250 mg/5 mL; a tabela da AIDPI vai de 4 a 24 kg", p: 90 },
        { rot: "Criança de 2 meses a 5 anos — infecção aguda do ouvido",
          val: "50 mg/kg/dia VO, divididos em 2 tomadas de 12/12 h (metade da dose diária por tomada), por 8 dias — mesma tabela de peso (4 a 24 kg)", p: 90 },
        { rot: "Criança de 2 meses a 5 anos — infecção aguda do ouvido que não melhorou em dois dias de amoxicilina",
          val: "80 mg/kg/dia VO, de 12/12 h (ou trocar por amoxicilina + clavulanato) — reavaliar em 48 h; sem melhora no segundo retorno, referir", p: 169 },
        { rot: "Adulto — otite média aguda",
          val: "500 mg VO de 8/8 h ou 875 mg VO de 12/12 h, por 10 dias — a RENAME só tem a de 500 mg",
          f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 108 },
        { rot: "Adulto — rinossinusite bacteriana aguda (piora depois do 5º dia ou sintomas por mais de 10 a 14 dias)",
          val: "1,5 a 4 g/dia VO, divididos de 8/8 h ou de 12/12 h — manter até cinco a sete dias depois da melhora (em média 10 a 14 dias no total)",
          f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 171 },
        { rot: "Adulto previamente hígido, sem comorbidade, sem antibiótico recente e sem fator de risco para resistência — pneumonia adquirida na comunidade ambulatorial",
          val: "500 mg VO de 8/8 h por 5 a 7 dias — 5 dias na PAC leve pelo texto da SBPT; 7 dias na tabela (Quadro 5); dose da errata do Quadro 6",
          f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
        { rot: "Adulto com comorbidade, antibiótico nos últimos 3 meses ou risco de pneumococo resistente — PAC ambulatorial, sempre junto de um macrolídeo",
          val: "1 g VO de 8/8 h, por sete a dez dias",
          f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 65 },
        { rot: "Adulto — H. pylori, concomitante (TeleCondutas); a tríplice só com resistência à claritromicina abaixo de 15% ou sensibilidade confirmada", val: "1 g (2 cápsulas de 500 mg) VO de 12/12 h por 14 dias — com claritromicina e IBP; na concomitante, também metronidazol", f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024", p: 25 },
        { rot: "Adulto — H. pylori, terapia dupla em dose alta (V Consenso)", val: "1 g (2 cápsulas de 500 mg) VO 3 ou 4 vezes ao dia (3 a 4 g/dia) por 14 dias, com IBP em dose alta; na obesidade, 1 g 4x/dia", f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
        { rot: "Gestante — bacteriúria assintomática (escolha para estreptococo do grupo B e Enterococcus faecalis)", val: "500 mg VO de 8/8 horas ou 875 mg VO de 12/12 horas, por 7 dias", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" }
      ],
      porque: "Betalactâmico de primeira escolha nas infecções respiratórias bacterianas da comunidade: cobre o " +
              "pneumococo, principal agente da PAC, da otite média aguda e da rinossinusite. Os dados brasileiros " +
              "citados pela SBPT 2018 indicam que a resistência do pneumococo à penicilina não preocupa na PAC não grave.",
      escolher: "Primeira escolha na otite média aguda do adulto e da criança, na rinossinusite bacteriana aguda do " +
                "adulto e na PAC ambulatorial: sozinha no adulto hígido; em dose alta e junto de um macrolídeo quando " +
                "há comorbidade, antibiótico recente ou risco de pneumococo resistente. Na criança de 2 meses a 5 anos, " +
                "a tabela de peso da AIDPI.",
      evitar: "Alergia à penicilina com urticária ou anafilaxia (reação tipo I): usar azitromicina ou claritromicina. " +
              "Resfriado, faringite viral e bronquite aguda: antibiótico não tem indicação. Usar a tabela da AIDPI " +
              "fora da faixa de peso dela, ou a dose do adulto na criança.",
      contraind: "Hipersensibilidade à penicilina (reação tipo I: urticária ou anafilaxia).",
      adversos: "As fontes usadas (AIDPI, CAB 28, SBPT 2018) não descrevem os eventos adversos da amoxicilina; conferir na bula.",
      monitor: "PAC: reavaliar a cada dois dias do início e orientar ir ao pronto-socorro se piorar antes do retorno; " +
               "primeira dose na própria UBS, sobretudo na criança (CAB 28). OMA da criança: retorno em dois dias (AIDPI). " +
               "A suspensão da RENAME (50 mg/mL) tem a mesma concentração da tabela da AIDPI (250 mg/5 mL): recalcular " +
               "o volume com o peso do dia.",
      diverge: "PAC com comorbidade: o CAB 28 (2012, Quadro 24) dá 7 a 10 dias de betalactâmico + macrolídeo; a SBPT " +
               "2018 (Quadro 5) dá 5 a 7 dias. Faringoamigdalite estreptocócica: o CAB 28 (Quadro 40) cita amoxicilina " +
               "por peso por 10 dias, sem dose máxima e sem separar criança de adulto — essa linha não entrou; a escolha " +
               "é a penicilina benzatina. Na associação, a azitromicina segue a mesma duração da fonte escolhida (CAB 28: 7 a 10 dias; " +
               "SBPT: 5 a 7 dias). OMA da criança: o CAB 28 (2012, p. 107) cita 80 a 90 mg/kg/dia; a AIDPI 2017 usa 50 mg/kg/dia e " +
               "sobe para 80 só na falha — este cartão segue a AIDPI.",
      fonte: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017"
    },
    {
      nome: "Amoxicilina + clavulanato de potássio",
      id: "amoxicilina-clavulanato",
      kw: "amoxicilina clavulanato clavulin betalactamase otite sinusite rinossinusite pneumonia pac falha aidpi",
      apres: "comprimido 500 mg + 125 mg; pó para suspensão oral 50 mg/mL + 12,5 mg/mL",
      dose: [
        { rot: "Adulto — otite média aguda com falha da amoxicilina ou recorrente",
          val: "500 mg VO de 8/8 h ou 875 mg VO de 12/12 h (dose de amoxicilina), por 10 a 14 dias", p: 108 },
        { rot: "Adulto — rinossinusite bacteriana aguda moderada a grave, ou leve em quem usou antibiótico nas últimas 4 a 6 semanas",
          val: "amoxicilina 1,5 a 4 g/dia + clavulanato 250 mg/dia VO, divididos de 8/8 h ou de 12/12 h — até cinco a sete dias depois da melhora", p: 171 },
        { rot: "Adulto — rinossinusite crônica sem resposta ao tratamento inicial, com edema grave de mucosa ou agudizada (junto da prednisona)",
          val: "500 mg VO 3 vezes ao dia ou 875 mg VO 2 vezes ao dia, por 10 a 14 dias",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023", p: 27 },
        { rot: "Adulto — PAC ambulatorial (alternativa à amoxicilina no hígido; com comorbidade, junto de um macrolídeo)",
          val: "875/125 mg VO de 12/12 h ou 500/125 mg VO de 8/8 h, por 7 dias sozinha ou 5 a 7 dias junto do macrolídeo — errata do Quadro 6 da SBPT; a RENAME só tem o comprimido de 500 + 125",
          f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
        { rot: "Criança de 2 meses a 5 anos — segunda linha na pneumonia",
          val: "50 mg/kg/dia de amoxicilina VO, divididos de 12/12 h, por 7 dias — tabela da AIDPI de 4 a 24 kg; conferir a concentração do frasco (monitor)",
          f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 90 },
        { rot: "Criança de 2 meses a 5 anos — segunda linha na infecção aguda do ouvido",
          val: "50 mg/kg/dia de amoxicilina VO, divididos de 12/12 h, por 8 dias — tabela da AIDPI de 4 a 24 kg; conferir a concentração do frasco (monitor)",
          f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 90 },
        { rot: "Criança de 2 meses a 5 anos — segunda linha na infecção moderada de garganta",
          val: "50 mg/kg/dia de amoxicilina VO, divididos de 12/12 h, por 10 dias — tabela da AIDPI de 4 a 24 kg; conferir a concentração do frasco (monitor)",
          f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 90 },
        { rot: "Mulher adulta, gestante ou não — cistite (2ª linha)", val: "500/125 mg VO de 8/8 horas ou 875/125 mg VO de 12/12 horas, por 7 dias — a RENAME só tem o comprimido de 500 + 125", f: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020" }
      ],
      porque: "Amoxicilina com inibidor de betalactamase: amplia a cobertura para H. influenzae e M. catarrhalis " +
              "produtores de betalactamase. Por isso é a opção na falha da amoxicilina e quando há risco de germe resistente.",
      escolher: "Falha da amoxicilina ou recorrência na otite média aguda; rinossinusite bacteriana moderada a grave, ou " +
                "em quem usou antibiótico nas últimas quatro a seis semanas; rinossinusite crônica agudizada; PAC " +
                "ambulatorial; segunda linha da AIDPI na criança.",
      evitar: "Usar no lugar da amoxicilina simples sem motivo: o clavulanato em dose alta dá diarreia com frequência. " +
              "Alergia à penicilina tipo I.",
      contraind: "Hipersensibilidade à penicilina (reação tipo I).",
      adversos: "Diarreia, com risco grande quando o clavulanato vai em dose alta (CAB 28, p. 108). Demais eventos: conferir na bula.",
      monitor: "Para dose alta de amoxicilina, usar apresentação com mais amoxicilina sem aumentar o clavulanato (CAB 28). " +
               "Criança: a tabela da AIDPI está montada para a suspensão de 250 mg/5 mL de amoxicilina 'na formulação BD'; " +
               "a suspensão da RENAME 2024 é 50 mg/mL de amoxicilina + 12,5 mg/mL de clavulanato. Os volumes da tabela " +
               "valem só para 50 mg/mL de amoxicilina: conferir no frasco a concentração e o intervalo indicado antes de " +
               "converter em mL. Com a suspensão da RENAME (4:1), a dose de clavulanato fica acima da que o CAB 28 usa na criança — conferir com a preceptora. " +
               "Com o comprimido da RENAME (500 mg + 125 mg), cada comprimido leva 125 mg de clavulanato: 3 por dia já passam dos 250 mg/dia do Quadro 56 do CAB 28. " +
               "Não multiplicar o comprimido para chegar à dose alta de amoxicilina — conferir com a preceptora como montar a dose alta com o que a farmácia tem.",
      diverge: "PAC do adulto com comorbidade: o CAB 28 (2012, Quadro 24) escreve amoxicilina-clavulanato 1 g de 12/12 h; " +
               "a errata do Quadro 6 da SBPT 2018 dá 875/125 mg de 12/12 h ou 500/125 mg de 8/8 h, que é a linha deste cartão.",
      fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antiviral da influenza",
  kw: "influenza gripe sindrome gripal srag antiviral oseltamivir tamiflu",
  quando: "Síndrome gripal com condição ou fator de risco para complicação (mesmo vacinado, mesmo no ambulatório), " +
          "toda SRAG e toda gestante ou puérpera com síndrome gripal, pelo Guia de manejo e tratamento de influenza 2023.",
  nota: "O CAB 28 (2012) dizia 'a critério médico' para quem tem fator de risco: está superado pelo Guia 2023, que " +
        "indica para todos eles. O tratamento não espera o resultado do exame. Corticoide que conta como imunossupressão: " +
        "prednisona acima de 20 mg/dia por mais de 2 semanas (Guia, p. 18).",
  farmacos: [
    {
      nome: "Fosfato de oseltamivir",
      id: "oseltamivir",
      kw: "oseltamivir tamiflu influenza gripe sindrome gripal srag antiviral gestante puerpera crianca renal quimioprofilaxia",
      apres: "cápsula 30 mg, 45 mg e 75 mg (sem suspensão na RENAME 2024: o Guia ensina a diluir a cápsula no Anexo B)",
      dose: [
        { rot: "Adulto — tratamento (síndrome gripal com fator de risco, SRAG, gestante e puérpera)",
          val: "75 mg VO de 12/12 h, por 5 dias", p: 24 },
        { rot: "Criança de 1 ano ou mais, até 15 kg — tratamento", val: "30 mg VO de 12/12 h por 5 dias", p: 24 },
        { rot: "Criança de 1 ano ou mais, acima de 15 até 23 kg — tratamento", val: "45 mg VO de 12/12 h por 5 dias", p: 24 },
        { rot: "Criança de 1 ano ou mais, acima de 23 até 40 kg — tratamento", val: "60 mg VO de 12/12 h por 5 dias", p: 24 },
        { rot: "Criança de 1 ano ou mais, acima de 40 kg — tratamento", val: "75 mg VO de 12/12 h por 5 dias", p: 24 },
        { rot: "Lactente de 29 dias a 8 meses — tratamento (recém-nascido até 28 dias: linha pela idade gestacional)",
          val: "3 mg/kg por dose VO, de 12/12 h, por 5 dias", p: 24 },
        { rot: "Criança de 9 a 11 meses — tratamento",
          val: "3,5 mg/kg por dose VO, de 12/12 h, por 5 dias", p: 24 },
        { rot: "Recém-nascido (até 28 dias) — tratamento, pela idade gestacional",
          val: "abaixo de 38 semanas: 1 mg/kg; de 38 a 40 semanas: 1,5 mg/kg; acima de 40 semanas: 3 mg/kg — por dose, de 12/12 h, por 5 dias", p: 25 },
        { rot: "Adulto com insuficiência renal — tratamento, pelo clearance de creatinina (mL/min)",
          val: "acima de 60 a 90: 75 mg de 12/12 h; acima de 30 a 60: 30 mg de 12/12 h; acima de 10 a 30: 30 mg 1 vez ao dia; hemodiálise: 30 mg depois de cada sessão (três doses em cinco dias); diálise peritoneal: dose única de 30 mg logo depois da troca", p: 25 },
        { rot: "Adulto — quimioprofilaxia, só nas situações do Guia (imunossupressão grave depois de contato; surto em ILP: ver o monitor)",
          val: "75 mg VO 1 vez ao dia, por 10 dias", p: 36 }
      ],
      porque: "Inibidor da neuraminidase do vírus influenza: o tratamento precoce reduz a duração dos sintomas e, " +
              "sobretudo, as complicações em quem tem condição ou fator de risco. Não age sobre covid-19 nem sobre outros " +
              "vírus respiratórios.",
      escolher: "Toda síndrome gripal com condição ou fator de risco para complicação, independentemente da vacina e " +
                "mesmo no ambulatório; toda SRAG, já, sem esperar o exame; toda gestante e puérpera com síndrome gripal, " +
                "mesmo vacinada e sem sinal de agravamento. Sem fator de risco: a critério clínico, de preferência nas " +
                "primeiras 48 horas; com sinal de agravamento, iniciar já. Maior benefício até 48 horas do início; com " +
                "fator de risco e SRAG ainda há benefício até cinco dias. Quimioprofilaxia só nas indicações do Guia e " +
                "nunca se a última exposição passou de 48 horas.",
      evitar: "Covid-19 e outros vírus respiratórios: não indicado. Quimioprofilaxia para a população em geral. " +
              "Interromper antes de completar os cinco dias (menos efeito e risco de resistência).",
      contraind: "O Guia 2023 não lista contraindicação; não é contraindicado na gestação (categoria C, segurança " +
                 "comprovada). Hipersensibilidade: conferir na bula.",
      adversos: "O Guia 2023 não descreve os eventos adversos; conferir na bula. Vomitou até uma hora depois da tomada: dar uma dose adicional.",
      monitor: "Receituário simples (Guia, p. 24). Monitorar critérios de SRAG e sinais de agravamento, com retorno " +
               "orientado. Ajustar a dose pelo clearance. Sem suspensão: abrir a cápsula na hora e diluir o conteúdo em " +
               "um pouco de água com alimento adocicado; a cápsula de 75 mg em 5 mL de água dá 15 mg/mL (Guia, Anexo B). " +
               "Imunocomprometido pode precisar de tratamento mais longo. Afastado o diagnóstico de influenza, suspender (CAB 28). " +
               "Surto em ILP: o Guia manda manter a profilaxia na instituição por no mínimo 2 semanas e até 7 dias depois do último caso (p. 36); " +
               "ajuste renal da profilaxia na Tabela 5 (p. 25).",
      fonte: "MS — Guia de manejo e tratamento de influenza, 2023"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Broncodilatadores inalatórios",
  kw: "broncodilatador bombinha spray salbutamol aerolin ipratropio atrovent umeclidinio vilanterol saba sama lama laba asma dpoc sibilancia",
  quando: "Alívio da asma (sempre junto de corticoide inalatório) e da DPOC, exacerbação leve a moderada na UBS, " +
          "sibilância da criança de 2 meses a 5 anos (AIDPI) e a manutenção da DPOC dos grupos B e E.",
  nota: "Na UBS saem salbutamol e ipratrópio (Componente Básico). Nenhum broncodilatador de longa ação sai da " +
        "farmácia básica: umeclidínio + vilanterol é Componente Especializado e exige LME.",
  farmacos: [
    {
      nome: "Sulfato de salbutamol",
      id: "salbutamol",
      kw: "salbutamol aerolin bombinha spray saba beta2 alivio crise asma dpoc sibilancia nebulizacao espacador",
      apres: "suspensão aerossol 100 mcg/dose e solução para inalação 5 mg/mL (a RENAME traz também solução injetável, fora do uso da APS)",
      dose: [
        { rot: "Exacerbação leve a moderada de asma — spray com espaçador (a linha do PCDT não separa idade) — criança de até 5 anos: conferir com a preceptora (a AIDPI usa 2 a 4 jatos por dose)",
          val: "4 a 10 jatos de 100 mcg a cada 20 minutos na primeira hora; depois, 4 a 10 jatos a cada 3 a 4 horas ou 6 a 10 jatos a cada 1 a 2 horas, conforme a resposta", p: 39 },
        { rot: "Adulto com DPOC — alívio dos sintomas ou antes do esforço",
          val: "200 a 400 mcg (2 a 4 jatos do spray) em dose única antes do esforço, ou a cada 4 a 6 horas até melhorar",
          f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025", p: 19 },
        { rot: "Adulto com DPOC muito debilitado, que não consegue usar o spray — nebulização",
          val: "2,5 mg por nebulização a cada 4 a 6 horas; na exacerbação, pode repetir a cada 20 minutos nas primeiras horas, sob monitoramento médico",
          f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025", p: 20 },
        { rot: "Criança de 2 meses a 5 anos — sibilância, tratamento em casa (spray de 100 mcg por jato, com espaçador)",
          val: "de 6/6 h por cinco dias: abaixo de 2 anos, 2 a 3 jatos por dose; a partir de 2 anos, 2 a 4 jatos por dose",
          f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 105 },
        { rot: "Criança de 2 meses a 5 anos — sibilância, nebulização quando não há spray",
          val: "1 gota para cada 3 kg de peso por nebulização, no máximo dez gotas, de 6/6 h por cinco dias",
          f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 105 },
        { rot: "Adulto — exacerbação de DPOC, até a remoção (protocolo do SAMU)", val: "4 a 8 jatos (400 a 800 mcg) com espaçador a cada 10 a 20 minutos, até 3 repetições", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
      ],
      porque: "Beta-2 agonista de curta ação: broncodilata em minutos e o efeito dura de 4 a 6 horas. É o alívio do " +
              "broncoespasmo — não trata a inflamação da asma.",
      escolher: "Asma: sempre junto de um corticoide inalatório — é o alívio do regime 2 do PCDT 2026 e o broncodilatador " +
                "da exacerbação na UBS. DPOC: alívio sob demanda em todos os grupos; sozinho, só no grupo A. Criança com " +
                "sibilância: tratar a sibilância antes de classificar a tosse (AIDPI). A linha 'Exacerbação leve a moderada' é o esquema de crise na " +
                "unidade, não a receita de alívio para casa; o PCDT 2026 não traz a dose do alívio fora da crise.",
      evitar: "Asma tratada só com salbutamol: não é mais recomendado (mais exacerbação grave e morte). Uso diário como " +
              "manutenção na DPOC dos grupos B e E. Uso excessivo (mais de três frascos de 200 doses por ano) é sinal de " +
              "asma mal controlada, não motivo para dar mais frascos.",
      contraind: "Hipersensibilidade ao salbutamol. Cautela em doença cardiovascular, hipertireoidismo, diabetes e uso " +
                 "de outro simpatomimético (PCDT DPOC).",
      adversos: "Tremor, taquicardia, palpitação, cefaleia, nervosismo, cãibras; hipocalemia em dose alta ou uso " +
                "prolongado; menos frequentes: arritmia, broncoespasmo paradoxal, urticária e angioedema (PCDT DPOC). " +
                "Com uso regular, o tremor e a taquicardia tendem a ceder em 1 a 2 semanas (PCDT Asma).",
      monitor: "Ver a técnica com espaçador em toda consulta; o espaçador pode ser artesanal, de garrafa plástica (CAB 28). " +
               "Nebulização do adulto: diluir em 2 a 4 mL de soro fisiológico (PCDT DPOC). Nebulização da criança: " +
               "preparar com 3 mL de soro fisiológico e nebulizar até acabar (AIDPI). Contar os frascos usados no ano. " +
               "Gestante com SABA em dose alta nas 48 horas antes do parto: monitorar a glicemia do recém-nascido.",
      fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026"
    },
    {
      nome: "Brometo de ipratrópio",
      id: "brometo-de-ipratropio",
      kw: "ipratropio atrovent sama anticolinergico dpoc broncodilatador nebulizacao spray exacerbacao",
      apres: "solução para inalação 0,25 mg/mL e solução aerossol 20 mcg/dose",
      dose: [
        { rot: "Adulto com DPOC estável — spray (20 mcg por jato)",
          val: "40 mcg (2 jatos) por via inalatória, 3 a 4 vezes ao dia; máximo 240 mcg/dia", p: 20 },
        { rot: "Adulto com DPOC — nebulização (solução 0,25 mg/mL)",
          val: "0,25 a 0,5 mg (20 a 40 gotas) a cada 4 a 6 horas, até a melhora clínica", p: 20 },
        { rot: "Adulto — crise grave de asma ou exacerbação grave de DPOC, junto do beta-2 (protocolo do SAMU)", val: "40 gotas em nebulização com 5 mL de soro fisiológico, depois do salbutamol spray", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" },
        { rot: "Criança até o início da puberdade — crise de asma grave ou muito grave, junto do beta-2 (protocolo pediátrico do SAMU)", val: "nebulização com 5 mL de soro fisiológico: até 10 kg, 10 gotas; de 11 a 30 kg, 20 gotas; acima de 30 kg, 40 gotas", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
      ],
      porque: "Antimuscarínico de curta ação: broncodilata pelo bloqueio do receptor M3; começa em 1 a 3 minutos, tem " +
              "pico em 1,5 a 2 horas e dura 4 a 6 horas — mais lento que o salbutamol.",
      escolher: "DPOC: alívio sob demanda ou em esquema fixo no grupo A e associado ao salbutamol nas exacerbações. É o " +
                "antimuscarínico que a farmácia da UBS tem.",
      evitar: "Glaucoma de ângulo fechado, retenção urinária, hiperplasia prostática e distúrbio de motilidade " +
              "gastrintestinal: usar com cautela. Não substitui o broncodilatador de longa ação dos grupos B e E.",
      contraind: "Hipersensibilidade ao ipratrópio, à atropina ou a derivados.",
      adversos: "Tosse, boca seca, náusea, cefaleia, tontura, irritação na garganta; incomuns: palpitação, taquicardia " +
                "supraventricular, broncoespasmo, retenção urinária, visão turva, aumento da pressão intraocular; raros: " +
                "fibrilação atrial, anafilaxia, glaucoma de ângulo fechado (sobretudo com o aerossol atingindo os olhos).",
      monitor: "Ensinar a não deixar o aerossol atingir os olhos; dor ou desconforto ocular, visão embaçada ou halos " +
               "com olho vermelho sugerem glaucoma. Nebulização: diluir em soro fisiológico até completar 3 a 4 mL.",
      fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025"
    },
    {
      nome: "Brometo de umeclidínio + trifenatato de vilanterol",
      id: "umeclidinio-vilanterol",
      kw: "umeclidinio vilanterol anoro lama laba dpoc grupo b grupo e manutencao broncodilatador longa acao lme",
      apres: "pó inalatório 62,5 mcg + 25 mcg",
      dose: [
        { rot: "Adulto com DPOC sintomático do grupo B ou do grupo E, independentemente do grau de obstrução — manutenção",
          val: "62,5 mcg + 25 mcg por via inalatória, 1 vez ao dia, sempre no mesmo horário", p: 20 }
      ],
      porque: "Associação de antimuscarínico de longa ação (LAMA) com beta-2 agonista de longa ação (LABA): a " +
              "broncodilatação dupla melhora sintomas e qualidade de vida mais que cada um isolado. É o tratamento " +
              "inicial preferencial dos grupos B e E no PCDT DPOC 2025.",
      escolher: "DPOC muito sintomático (mMRC 2 ou mais, ou CAT 10 ou mais) do grupo B, ou do grupo E, sem depender do " +
                "VEF1. Na USF: preencher o LME — não sai da farmácia básica.",
      evitar: "Asma, ou suspeita de asma junto da DPOC (sobreposição asma-DPOC): nunca LAMA + LABA sem corticoide inalatório — o tratamento segue o PCDT da Asma, com CI (risco de exacerbação grave e morte). Alergia grave à proteína do leite.",
      contraind: "Hipersensibilidade ao umeclidínio, ao vilanterol ou aos componentes; alergia grave à proteína do leite.",
      adversos: "Infecção urinária, nasofaringite, sinusite, faringite, dor orofaríngea, tosse, constipação, boca seca, " +
                "dor torácica; menos frequentes: taquicardia, arritmia, tremor, disgeusia; raros: anafilaxia, " +
                "broncoespasmo paradoxal, visão turva, aumento da pressão intraocular, retenção urinária.",
      monitor: "Sem ajuste no idoso nem na insuficiência renal ou hepática leve a moderada. Broncoespasmo paradoxal: " +
               "suspender e trocar. Ver a técnica do pó seco; com obstrução muito grave o paciente pode não gerar fluxo suficiente.",
      fonte: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Corticoides na asma, na DPOC e na rinite",
  kw: "corticoide inalatorio ci beclometasona budesonida formoterol corticoide nasal prednisolona asma dpoc rinite rinossinusite exacerbacao",
  quando: "Controle da asma (todo paciente com asma recebe corticoide inalatório), terapia tripla da DPOC, corticoide " +
          "nasal na rinite e na rinossinusite crônica e corticoide oral de curso curto na exacerbação.",
  nota: "O que a UBS e a Farmácia Popular entregam para asma é beclometasona + salbutamol (regime 2). Formoterol + " +
        "budesonida, o regime 1 preferido pelo PCDT Asma 2026, e a budesonida inalatória são Componente " +
        "Especializado (LME). A prednisona, que também serve aqui, está no cartão de corticoide e imunomodulador.",
  farmacos: [
    {
      nome: "Dipropionato de beclometasona",
      id: "beclometasona",
      kw: "beclometasona clenil miflasona corticoide inalatorio ci asma dpoc nasal rinite bombinha spray",
      apres: "spray (solução aerossol) 50, 200 e 250 mcg/dose; pó e cápsula para inalação 200 e 400 mcg; suspensão nasal 50 mcg/dose",
      dose: [
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — dose baixa, a de início e de manutenção da maioria (spray de partícula padrão)",
          val: "200 a 500 mcg/dia", p: 38 },
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — dose média",
          val: "acima de 500 até 1.000 mcg/dia", p: 38 },
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — dose alta (só por tempo limitado, com reavaliação)",
          val: "acima de 1.000 mcg/dia", p: 38 },
        { rot: "Criança de 6 a 11 anos com asma — dose baixa (spray de partícula padrão)",
          val: "100 a 200 mcg/dia", p: 38 },
        { rot: "Criança de 6 a 11 anos com asma — dose média",
          val: "acima de 200 até 400 mcg/dia", p: 38 },
        { rot: "Criança de até 5 anos — teste terapêutico de asma (2 a 3 meses)",
          val: "100 mcg de 12/12 h; com resposta, reduzir para 50 mcg de 12/12 h", p: 13 },
        { rot: "Adolescente e adulto com asma — intervalo entre as doses",
          val: "dividir o total diário de 12/12 h — o PCDT dá só o total; o intervalo é do TelessaúdeRS",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Pneumologia adulto, 2023", p: 19 },
        { rot: "Adulto com DPOC — só dentro da terapia tripla (com LAMA + LABA), nunca sozinha",
          val: "400 mcg duas vezes ao dia (800 mcg/dia)",
          f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025", p: 21 },
        { rot: "Adulto — rinite alérgica ou rinossinusite crônica (suspensão nasal 50 mcg por jato)",
          val: "1 a 2 jatos, 2 vezes ao dia — o quadro não diz se é por narina",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023", p: 28 }
      ],
      porque: "Corticoide inalatório: trata a inflamação das vias aéreas e previne sintomas e exacerbações. É o " +
              "corticoide inalatório que a UBS e a Farmácia Popular entregam.",
      escolher: "Asma: base do regime 2 do PCDT 2026 — CI de dose baixa sempre que usar o salbutamol (etapa 1) ou CI " +
                "diário de dose baixa com salbutamol de alívio (etapa 2); doses maiores, com ou sem LABA, nas etapas 3 e " +
                "4. A maioria controla com dose baixa. DPOC: só como parte da terapia tripla. Via nasal: rinite " +
                "alérgica e rinossinusite crônica.",
      evitar: "Monoterapia na DPOC. Suspender totalmente o CI na asma (só temporariamente, para confirmar o diagnóstico) " +
              "ou na gestação. Spray e pó no mesmo paciente (técnicas diferentes confundem).",
      contraind: "O PCDT não lista contraindicação além de hipersensibilidade; inibidores do citocromo P450 associados " +
                 "aumentam o risco de supressão adrenal.",
      adversos: "Candidíase orofaríngea e disfonia (menos com espaçador e enxágue da boca, cuspindo); com dose alta por " +
                "longo prazo: osteoporose, catarata, glaucoma e supressão adrenal; na DPOC, dose alta aumenta o risco de pneumonia.",
      monitor: "Técnica e adesão em toda consulta; espaçador com o spray; enxaguar a boca e cuspir depois. Com a asma " +
               "estável por 3 meses, reduzir o CI de 25 a 50%. Densitometria em quem usa dose alta por longo prazo. As " +
               "faixas do PCDT são do spray de partícula padrão; para o pó e a cápsula de inalação o PCDT não dá " +
               "equivalência — conferir com a preceptora.",
      diverge: "O Protocolo de Otorrinolaringologia do TelessaúdeRS (2023) diz que a budesonida é o único corticoide " +
               "nasal do SUS; a RENAME 2024 também lista a suspensão nasal de beclometasona no Componente Básico.",
      fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026"
    },
    {
      nome: "Budesonida",
      id: "budesonida",
      kw: "budesonida busonid pulmicort corticoide inalatorio nasal rinite rinossinusite asma dpoc",
      apres: "inalatória: aerossol oral, pó e cápsula 200 mcg e cápsula 400 mcg; suspensão nasal 32, 50 e 64 mcg/dose",
      dose: [
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — dose baixa",
          val: "200 a 400 mcg/dia", p: 38 },
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — dose média",
          val: "acima de 400 até 800 mcg/dia", p: 38 },
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — dose alta (só por tempo limitado, com reavaliação)",
          val: "acima de 800 mcg/dia", p: 38 },
        { rot: "Criança de 6 a 11 anos com asma — dose baixa",
          val: "100 a 200 mcg/dia", p: 38 },
        { rot: "Criança de 6 a 11 anos com asma — dose média",
          val: "acima de 200 até 400 mcg/dia", p: 38 },
        { rot: "Adulto com DPOC — só dentro da terapia tripla aberta (com LAMA + LABA), nunca sozinha",
          val: "400 a 800 mcg uma vez ao dia — ficar nos 400 mcg em quem tem risco de pneumonia",
          f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025", p: 21 },
        { rot: "Adulto — rinite alérgica ou rinossinusite crônica (spray nasal 32 mcg por jato)",
          val: "1 a 2 jatos, 1 vez ao dia; controlados os sintomas, reduzir à menor dose que mantém o controle — o quadro não diz se é por narina",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023", p: 28 }
      ],
      porque: "Corticoide inalatório; o benefício é efeito de classe — maior potência não é maior eficácia. Pela via " +
              "nasal, é corticoide tópico para rinite e rinossinusite crônica.",
      escolher: "Asma: CI alternativo à beclometasona (a inalatória só sai pelo Componente Especializado); combinada ao " +
                "formoterol é o regime 1 do PCDT. DPOC: só na terapia tripla. Spray nasal: rinite alérgica e " +
                "rinossinusite crônica sem pólipo, com lavagem salina.",
      evitar: "Monoterapia na DPOC; dose alta crônica na DPOC (osteoporose, fratura e pneumonia).",
      contraind: "Hipersensibilidade; as fontes não listam outras.",
      adversos: "Candidíase oral, disfonia, tosse e irritação na garganta (dependem da dose); com dose alta prolongada: " +
                "supressão adrenal, hiperglicemia, acne, glaucoma, catarata; retardo de crescimento relatado em criança.",
      monitor: "Técnica e adesão; enxaguar a boca e cuspir depois. Spray nasal: limpar o nariz com soro antes; reavaliar " +
               "a rinossinusite crônica em 8 a 12 semanas.",
      fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026"
    },
    {
      nome: "Fumarato de formoterol + budesonida",
      id: "formoterol-budesonida",
      kw: "formoterol budesonida alenia symbicort ci formoterol air mart regime 1 asma lme especializado",
      apres: "cápsula ou pó inalatório 6 mcg + 200 mcg e 12 mcg + 400 mcg",
      dose: [
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — etapas 1 e 2, alívio anti-inflamatório sob demanda (AIR)",
          val: "1 inalação de 6/200 mcg sob demanda, nos sintomas ou antes do exercício ou da exposição ao alérgeno", p: 39 },
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — etapa 3 (MART: manutenção e alívio com o mesmo inalador)",
          val: "1 inalação de 6/200 mcg uma ou duas vezes ao dia + 1 inalação sob demanda", p: 39 },
        { rot: "Adolescente (12 anos ou mais) e adulto com asma — etapas 4 e 5 (MART)",
          val: "2 inalações de 6/200 mcg duas vezes ao dia + 1 inalação sob demanda", p: 39 },
        { rot: "Adolescente e adulto — máximo diário (manutenção e alívio somados)",
          val: "12 inalações de 6/200 mcg por dia (72 mcg de formoterol)", p: 39 }
      ],
      porque: "Corticoide inalatório com formoterol, um LABA de início rápido: o mesmo inalador alivia o sintoma e trata " +
              "a inflamação. É o regime 1, o preferido do PCDT Asma 2026, adaptado da GINA 2025.",
      escolher: "Asma no adolescente e no adulto: etapas 1 e 2 como alívio sob demanda (AIR); etapas 3 a 5 como " +
                "manutenção e alívio (MART). Não precisa de intervalo mínimo entre as doses de alívio, desde que respeite " +
                "o máximo diário. Na USF: preencher o LME. Quando o regime 1 não é viável, o PCDT aceita o regime 2 " +
                "(beclometasona + salbutamol).",
      evitar: "Usar como alívio em quem faz manutenção com outro LABA que não o formoterol. Criança de 6 a 11 anos: o " +
              "PCDT prefere a apresentação de menor dose de budesonida, que não está na RENAME 2024. DPOC sem asma: LABA " +
              "com CI não é a opção preferencial.",
      contraind: "Hipersensibilidade aos componentes.",
      adversos: "Do formoterol: taquicardia, cefaleia, cãibras; do corticoide: candidíase oral e disfonia.",
      monitor: "Ensinar o dispositivo de pó; contar as inalações do dia e respeitar o máximo. Quem está em MART de dose " +
               "média e vai iniciar imunobiológico não deve trocar para CI-LABA convencional + SABA. Broncoespasmo " +
               "paradoxal: suspender.",
      diverge: "No item 7.4.1 o PCDT escreve '1 a 2 doses' sob demanda; o Quadro 11, que é a tabela de dose, escreve 1 " +
               "inalação sob demanda em todas as etapas. Este cartão segue o Quadro 11.",
      fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026"
    },
    {
      nome: "Fosfato sódico de prednisolona",
      id: "prednisolona",
      kw: "prednisolona predsim prelone corticoide oral solucao exacerbacao asma dpoc sibilancia crianca",
      apres: "solução oral 1 mg/mL e 3 mg/mL",
      dose: [
        { rot: "Criança de 2 meses a 5 anos — sibilância moderada que melhorou na unidade, ou leve sem melhora com beta-2 correto há 24 h ou mais",
          val: "1 a 2 mg/kg/dia VO pela manhã, em dose única, por três dias; máximo 40 mg/dia",
          f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 107 },
        { rot: "Criança de 6 a 11 anos — exacerbação de asma",
          val: "1 a 2 mg/kg/dia VO, máximo 40 mg/dia, por 3 a 5 dias", p: 38 },
        { rot: "Adolescente (12 anos ou mais) e adulto — exacerbação de asma (o PCDT dá esta dose para a exacerbação grave)",
          val: "40 a 50 mg/dia VO por 5 a 7 dias, pela manhã, em dose única; uso por menos de 2 semanas dispensa desmame", p: 38 },
        { rot: "Adulto — exacerbação moderada ou grave de DPOC",
          val: "40 mg/dia VO por 5 dias; sem melhora no quinto dia, sobretudo na grave, estender para 10 a 14 dias",
          f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025", p: 22 }
      ],
      porque: "Corticoide sistêmico: acelera a melhora da exacerbação e reduz hospitalização e recaída precoce. A via " +
              "oral é tão eficaz quanto a venosa, mais barata e menos tóxica.",
      escolher: "Exacerbação de asma (criança e adulto) e exacerbação moderada ou grave de DPOC. Na criança de 2 meses a " +
                "5 anos com sibilância moderada, a primeira dose é na unidade e o curso continua em casa (AIDPI). A " +
                "solução oral facilita a dose por peso.",
      evitar: "Curso repetido ou uso contínuo sem rever o controle da asma: os efeitos adversos se acumulam. Início em " +
              "casa por decisão do cuidador na criança de até 5 anos (sem evidência, PCDT Asma). Abaixo de 1 ano, uso " +
              "criterioso (AIDPI).",
      contraind: "Hipersensibilidade, varicela, ceratite herpética, infecção fúngica sistêmica não tratada e infecção " +
                 "não controlada; cautela em úlcera péptica ativa, hipertensão grave, diabetes descompensado, " +
                 "osteoporose grave, psicose prévia e tuberculose latente ou ativa não tratada (PCDT DPOC).",
      adversos: "Curto prazo: hiperglicemia, insônia, alteração de humor, aumento do apetite, refluxo, retenção de " +
                "líquido, e também sepse e tromboembolismo (PCDT Asma); com cursos repetidos ou uso contínuo: diabetes, osteoporose, catarata, glaucoma, hipertensão e " +
                "supressão adrenal.",
      monitor: "Glicemia no diabético. Asma: reavaliar em 2 a 7 dias depois de exacerbação grave (criança, 1 a 2 dias) e " +
               "antes de suspender o corticoide. Uso por mais de 3 semanas: retirada lenta (PCDT DPOC). A RENAME rotula a " +
               "solução como fosfato sódico de prednisolona: conferir no frasco se a concentração está em prednisolona " +
               "base antes de converter mg em mL.",
      fonte: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Anti-inflamatórios e relaxante muscular da dor musculoesquelética",
  kw: "aine anti-inflamatorio ibuprofeno naproxeno relaxante muscular ciclobenzaprina artrose osteoartrite lombalgia fibromialgia cefaleia",
  quando: "Artrose de joelho e quadril, lombalgia, crise de cefaleia e fibromialgia, conforme o PCDT Dor Crônica 2024 e os protocolos do TelessaúdeRS.",
  nota: "O AINE da farmácia básica é o ibuprofeno; o naproxeno sai pelo Componente Especializado só para artrose de joelho ou quadril. Diclofenaco oral e AINE tópico não foram incorporados para dor crônica (PCDT 2024, p. 14). Relaxante muscular: o PCDT não recomenda na dor crônica; a ciclobenzaprina está fora da RENAME.",
  farmacos: [
    {
      nome: "Ibuprofeno",
      id: "ibuprofeno",
      kw: "ibuprofeno aine anti-inflamatorio artrose osteoartrite lombalgia cefaleia enxaqueca dor",
      apres: "comprimido 200 mg, 300 mg e 600 mg; cápsula 600 mg; suspensão oral 50 mg/mL",
      dose: [
        { rot: "Adulto — osteoartrite de joelho ou quadril, quando paracetamol ou dipirona não bastam", val: "400 mg VO a cada 6 a 8 horas", p: 14 },
        { rot: "Adulto — dor (posologia geral do PCDT Dor Crônica, Quadro 2)", val: "200 a 600 mg VO, 3 a 4 vezes ao dia; máximo 3.200 mg/dia", p: 18 },
        { rot: "Adulto — crise de cefaleia leve a moderada (migrânea ou tipo tensão)", val: "600 a 1.200 mg VO; nova dose em 4 a 6 h se preciso; máximo 2.400 mg/dia", f: "TelessaúdeRS-UFRGS — Resumo clínico: Cefaleia, 2016" }
      ],
      porque: "Anti-inflamatório não esteroide não seletivo. Na lombalgia e na artrose dá melhora modesta, porém considerável, da dor (PCDT), à custa de risco gastrointestinal e cardiovascular.",
      escolher: "Artrose de joelho ou quadril quando paracetamol ou dipirona não bastam (troca ou soma); lombalgia; crise de cefaleia leve a moderada. É o AINE da farmácia básica (RENAME 2024).",
      evitar: "Doença renal crônica, em qualquer estágio: evitar — o PCDT de DRC manda orientar a evitar nefrotóxicos, AINE à frente (PCDT DRC 2024, p. 8). Idoso: evitar uso prolongado, sobretudo acima de 75 anos ou com corticoide, anticoagulante ou antiplaquetário (Consenso PIM 2016, Quadro 1), e evitar na DRC 4 e 5, na insuficiência cardíaca, na hipertensão moderada a grave e na úlcera prévia sem gastroprotetor (Quadro 2). Hipertensão: o AINE antagoniza o anti-hipertensivo — medir a PA no uso repetido (CAB nº 37). Quem toma AAS em dose baixa contínua: paracetamol ou dipirona, sem AINE (PCDT, p. 15). Somado ao paracetamol, o risco de sangramento gastrointestinal sobe (PCDT, p. 14).",
      contraind: "Úlcera péptica ativa ou sangramento gastrointestinal; uso com bebida alcoólica; abaixo de 6 meses de idade; terceiro trimestre da gravidez (PCDT, Termo de Esclarecimento, p. 34). Uso concomitante de anticoagulante, distúrbio da coagulação e doença renal (Protocolos da AB: Saúde das Mulheres 2016, p. 24 e 25).",
      adversos: "Tontura, cefaleia, dispepsia, dor e distensão abdominal, sangramento gastrointestinal; hipertensão; hematúria, nefrite intersticial, disfunção renal, síndrome nefrótica, necrose papilar; raros agranulocitose, anemia aplástica, hemólise, plaquetopenia (PCDT, Quadro 3, p. 21).",
      monitor: "Menor dose pelo menor tempo. AINE oral por mais de cinco dias em quem tem história de evento gastrointestinal: omeprazol junto (PCDT, p. 14). PA e função renal no uso repetido, pelos eventos adversos do Quadro 3.",
      diverge: "Teto diário diverge: PCDT Dor Crônica 2024, Quadro 2 (p. 18), 3.200 mg/dia; TSRS Resumo Cefaleia 2016 (crise), 2.400 mg/dia; CAB nº 28 (2012), 1.200 mg/dia na dor lombar (p. 120) e na crise fraca de cefaleia (p. 36).",
      fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024"
    },
    {
      nome: "Naproxeno",
      id: "naproxeno",
      kw: "naproxeno aine artrose osteoartrite joelho quadril risco cardiovascular componente especializado",
      apres: "comprimido 250 mg e 500 mg",
      dose: [
        { rot: "Adulto — osteoartrite de joelho ou quadril com risco cardiovascular (texto do PCDT)", val: "250 a 500 mg VO, duas vezes ao dia", p: 14 },
        { rot: "Adulto — osteoartrite de joelho ou quadril, posologia do Quadro 2 do PCDT", val: "250 mg VO 1 a 2 vezes ao dia, ou 500 mg 1 vez ao dia — não passar de 500 mg/dia salvo prescrição médica", p: 19 }
      ],
      porque: "AINE que o SUS ampliou para a artrose de joelho e de quadril (Portaria SCTIE/MS nº 53/2017); o PCDT o reserva para quem tem risco de evento cardiovascular.",
      escolher: "Artrose de joelho ou de quadril com risco cardiovascular, quando paracetamol, dipirona e ibuprofeno não bastam. Componente Especializado: sai com LME, só para essa indicação.",
      evitar: "Outras indicações: o PCDT preconiza o naproxeno apenas na artrose de joelho e quadril. Doença renal crônica: evitar AINE (PCDT DRC 2024, p. 8). Idoso: uso prolongado (Consenso PIM 2016, Quadro 1), e evitar na DRC 4 e 5, na insuficiência cardíaca, na hipertensão moderada a grave e na úlcera prévia sem gastroprotetor (Quadro 2). Com AAS em dose baixa contínua: paracetamol ou dipirona (PCDT, p. 15).",
      contraind: "Hipersensibilidade; asma, rinite, pólipo nasal ou urticária por AAS ou outro AINE; insuficiência cardíaca grave; sangramento ativo, ou sangramento ou perfuração anterior por AINE; úlcera péptica ativa ou recorrente; depuração de creatinina abaixo de 30 mL/min (PCDT, Termo de Esclarecimento, p. 34); uso concomitante de anticoagulante, distúrbio da coagulação e doença renal (Protocolos da AB: Saúde das Mulheres 2016, p. 24 e 25).",
      adversos: "Edema, hipertensão, insuficiência cardíaca, infarto e AVC; úlcera, sangramento ou perfuração gastrointestinal, às vezes fatal, sobretudo no idoso; hematúria, nefrite intersticial, disfunção renal; raros Stevens-Johnson e necrólise epidérmica (PCDT, Quadro 3, p. 21).",
      monitor: "Menor dose pelo menor tempo; omeprazol se passar de cinco dias em quem tem história gastrointestinal (PCDT, p. 14). Na insuficiência hepática, renal ou cardíaca e no idoso, pode ser preciso reduzir a dose (PCDT, p. 19).",
      diverge: "O PCDT diverge dele mesmo: o texto (p. 14) dá 250 a 500 mg duas vezes ao dia na artrose de joelho e quadril; o Quadro 2 (p. 19) dá 250 mg uma a duas vezes ao dia ou 500 mg uma vez, sem passar de 500 mg/dia salvo prescrição. O TSRS Reumatologia 2022 (Quadro 13) usa 500 mg de 12/12 h, como o texto.",
      fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024"
    },
    {
      nome: "Ciclobenzaprina (cloridrato)",
      id: "ciclobenzaprina",
      kw: "ciclobenzaprina relaxante muscular fibromialgia lombalgia sono",
      apres: "comprimido — fora da RENAME 2024; concentrações: conferir na bula",
      dose: [
        { rot: "Adulto — fibromialgia (modulação da dor e do sono)", val: "5 a 10 mg VO à noite; subir conforme tolerância até 40 mg/dia (10 mg de manhã e 30 mg à noite)", p: 33 },
        { rot: "Adulto — lombalgia aguda (relaxante muscular)", val: "10 mg VO de 8/8 h", f: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012", p: 120 }
      ],
      porque: "Relaxante muscular. Na fibromialgia, em dose baixa à noite, melhora sobretudo o sono; o efeito sobre dor e fadiga é inconsistente (SBR 2026).",
      escolher: "Fibromialgia com distúrbio do sono marcado (SBR 2026; TSRS 2022). Na lombalgia aguda, o CAB nº 28 o lista entre os relaxantes musculares.",
      evitar: "Idoso: relaxante muscular é inapropriado, por efeito anticolinérgico, sedação e risco de fratura (Consenso PIM 2016). Dor crônica em geral: o PCDT 2024 não recomenda relaxante muscular. Dose alta seda muito (TSRS 2022).",
      contraind: "Não listada nas fontes da pasta (TSRS 2022, CAB nº 28, SBR 2026): conferir na bula.",
      adversos: "Sedação, maior em dose alta (TSRS 2022); no idoso, efeito anticolinérgico, sedação e queda com fratura (Consenso PIM 2016).",
      monitor: "Fator de risco para morte súbita ou doença cardiovascular prévia: considerar ECG de repouso se precisar de dose elevada (TSRS 2022, Quadro 15).",
      diverge: "Relaxante muscular na dor: o PCDT Dor Crônica 2024 (p. 15) não recomenda, por evidência incerta e efeito clinicamente insignificante; a SBR 2026 recomenda a ciclobenzaprina na fibromialgia, em dose baixa ao deitar; o TSRS 2022 a põe no tratamento otimizado da fibromialgia.",
      fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Hipouricemiante (gota)",
  kw: "gota acido urico hiperuricemia hipouricemiante alopurinol tofo",
  quando: "Gota com crises recorrentes: tratamento hipouricemiante, junto com a profilaxia das crises (TSRS Reumatologia 2022).",
  nota: "A colchicina, que o TSRS usa na profilaxia das crises, não está na RENAME 2024 e nenhuma fonte da pasta dá a dose: não há cartão. Meta de ácido úrico abaixo de 6 mg/dL em quem trata gota (SBR/SBPC-ML 2024).",
  farmacos: [
    {
      nome: "Alopurinol",
      id: "alopurinol",
      kw: "alopurinol gota acido urico hiperuricemia hipouricemiante tofo",
      apres: "comprimido 100 mg e 300 mg",
      dose: [
        { rot: "Adulto — gota: teto do tratamento otimizado", val: "até 800 mg/dia", p: 11 },
        { rot: "Adulto — dose inicial e titulação", val: "sem fonte brasileira datada conferida — confirmar no protocolo do serviço" }
      ],
      porque: "Hipouricemiante: mantém o ácido úrico sérico abaixo da solubilidade, o que previne a precipitação do urato e permite reabsorver o cristal já depositado (SBR/SBPC-ML 2024).",
      escolher: "Gota com crises recorrentes: compõe o tratamento otimizado, com a profilaxia das crises, exigido antes de encaminhar à Reumatologia (TSRS 2022). Está na farmácia básica (RENAME 2024).",
      evitar: "Mexer no esquema de quem está estável, sem crise e aderente só porque o ácido úrico está fora do alvo (TSRS 2022).",
      contraind: "Não listada nas fontes da pasta (TSRS 2022, SBR/SBPC-ML 2024): conferir na bula.",
      adversos: "Eosinofilia (TSRS Hematologia 2023); linfonodomegalia (TSRS Hematologia e Otorrino); neutropenia quando associado ao captopril (PCDT DRC 2024). O resto: conferir na bula.",
      monitor: "Ácido úrico sérico até a meta: abaixo de 6 mg/dL em quem trata gota (SBR/SBPC-ML 2024); abaixo de 5 mg/dL com tofo (MS/UFRGS 2016). Creatinina com TFG: DRC 4 ou 5 (TFG abaixo de 30) vai à Medicina Interna ou à Nefrologia (TSRS 2022).",
      fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Adjuvantes da dor neuropática",
  kw: "dor neuropatica neuropatia diabetica pos-herpetica triciclico nortriptilina gabapentina gabapentinoide anticonvulsivante",
  quando: "Dor neuropática (neuropatia diabética, pós-herpética, radiculopatia) e dor crônica, pelo PCDT Dor Crônica 2024. A amitriptilina, a carbamazepina e a duloxetina são cartões da psiquiatria, com a linha da indicação de dor.",
  nota: "Pregabalina e duloxetina não foram incorporadas para dor neuropática nem fibromialgia (PCDT 2024). A gabapentina sai pelo Componente Especializado com LME; nortriptilina e amitriptilina estão na farmácia básica.",
  farmacos: [
    {
      nome: "Nortriptilina (cloridrato)",
      id: "nortriptilina",
      kw: "nortriptilina triciclico dor neuropatica neuropatia diabetica pos-herpetica dor cronica",
      apres: "cápsula 10 mg, 25 mg, 50 mg e 75 mg",
      dose: [
        { rot: "Adulto — dor neuropática (titulação do TSRS)", val: "início 10 a 25 mg VO; manutenção 25 a 150 mg à noite, subindo a cada 3 a 7 dias", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
        { rot: "Adulto — dor crônica (PCDT Dor Crônica, Quadro 2)", val: "25 mg VO, 3 ou 4 vezes ao dia; máximo 150 mg/dia — o PCDT não dá dose inicial: começar pela titulação da linha do TSRS", p: 18 },
        { rot: "Idoso — dor crônica (PCDT Dor Crônica, Quadro 2)", val: "30 a 50 mg/dia VO, em duas ou três tomadas ou dose única — manter a menor dose eficaz", p: 18 }
      ],
      porque: "Antidepressivo tricíclico com ação analgésica: os tricíclicos têm a evidência mais robusta na dor neuropática (lesão medular, pós-herpética, diabética, pós-AVE) e melhoram dor e sono na dor nociplástica (PCDT).",
      escolher: "Dor neuropática: primeira linha na neuropatia diabética e na pós-herpética (TSRS 2020). Efeitos adversos menos intensos que os da amitriptilina (TSRS 2020). Farmácia básica (RENAME 2024).",
      evitar: "Idoso: tricíclico é potencialmente inapropriado (anticolinérgico, sedativo, hipotensão ortostática), mas aceitável para tratar dor, na menor dose eficaz (Consenso PIM 2016; PCDT). Uso cauteloso em glaucoma, cardiopatia, hiperplasia prostática, distúrbio da motilidade intestinal e com outros sedativos (TSRS 2020).",
      contraind: "Associação com IMAO, até 14 dias antes ou depois; fase de recuperação aguda do infarto do miocárdio (PCDT, Termo de Esclarecimento, p. 33).",
      adversos: "Hipotensão ortostática, taquicardia, arritmia; boca seca, constipação, retenção urinária, visão borrada; confusão, alucinação, desorientação e delirium, sobretudo no idoso; sonolência, tremor, convulsão (PCDT, p. 20 e 33).",
      monitor: "Pressão em pé (hipotensão ortostática), pulso, confusão no idoso, constipação e micção. Reavaliar a dor com a mesma escala a cada retorno (PCDT, p. 4); persistindo com dose otimizada, somar um fármaco de outra classe (TSRS 2020).",
      fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024"
    },
    {
      nome: "Gabapentina",
      id: "gabapentina",
      kw: "gabapentina gabapentinoide anticonvulsivante dor neuropatica neuropatia diabetica pos-herpetica componente especializado",
      apres: "cápsula 300 mg e 400 mg",
      dose: [
        { rot: "Adulto — dor neuropática (titulação do TSRS)", val: "início 300 mg VO; manutenção 900 a 3.600 mg/dia, em três tomadas", f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" },
        { rot: "Adulto — fibromialgia (TSRS; a SBR 2026 acha a evidência insuficiente para recomendar)", val: "300 mg VO à noite, subindo conforme tolerância até 1.200 a 2.400 mg/dia, de 8/8 h", f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Reumatologia adulto, 2022", p: 33 },
        { rot: "Adulto — dor crônica, dose máxima (PCDT Dor Crônica)", val: "3.600 mg/dia", p: 18 }
      ],
      porque: "Anticonvulsivante que o PCDT destaca na dor neuropática pós-herpética, na neuropatia diabética, na dor neuropática mista e na hanseníase, onde superou o placebo.",
      escolher: "Dor neuropática, sobretudo diabética e pós-herpética: primeira linha (TSRS 2020). Componente Especializado: sai com LME do PCDT Dor Crônica (CID R52.1 ou R52.2).",
      evitar: "Fibromialgia: a SBR 2026 acha a evidência insuficiente para recomendar — embora o TSRS 2022 a use. Doença renal crônica: cautela e dose menor (TSRS 2020; PCDT).",
      contraind: "Hipersensibilidade à gabapentina ou aos componentes; gravidez (PCDT, Termo de Esclarecimento, p. 34).",
      adversos: "Ganho de peso, sedação, tontura e vertigem, incoordenação, edema periférico, cefaleia, tremor, fadiga, visão turva, nistagmo; leucopenia (PCDT, p. 21 e 34; TSRS 2020).",
      monitor: "Função renal: o PCDT manda reduzir a dose com depuração de creatinina abaixo de 79 mL/min (p. 18); o ajuste por faixa não está no PCDT — conferir na bula. Sedação e queda no idoso.",
      fonte: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antivertiginoso (sintomático da vertigem aguda)",
  kw: "vertigem tontura labirintite neurite vestibular neuronite antivertiginoso anti-histaminico dimenidrinato nausea",
  quando: "Neurite vestibular ou labirintite aguda: sintomático só nos três primeiros dias (protocolo MS/UFRGS de Neurologia 2022; TSRS Otorrino 2023). Na VPPB, o tratamento é a manobra de Epley.",
  nota: "Dimenidrinato, meclizina, betaistina, cinarizina e flunarizina não estão na RENAME 2024. Na farmácia básica (Componente Básico) há prometazina, metoclopramida, ondansetrona e diazepam em comprimido.",
  farmacos: [
    {
      nome: "Dimenidrinato",
      id: "dimenidrinato",
      kw: "dimenidrinato antivertiginoso anti-histaminico vertigem labirintite neurite vestibular nausea enjoo",
      apres: "fora da RENAME 2024 — forma e concentração: conferir na bula",
      dose: [
        { rot: "Adulto — neurite vestibular ou labirintite aguda: sintomático, no máximo 3 dias", val: "50 mg VO de 6/6 h, por no máximo 3 dias", p: 24 }
      ],
      porque: "Anti-histamínico usado como antivertiginoso e antiemético no alívio sintomático da vertigem aguda (CAB nº 28; TSRS 2023).",
      escolher: "Neurite vestibular ou labirintite aguda com náusea, só nos três primeiros dias. Fora da RENAME 2024: a família compra; a farmácia básica tem prometazina e metoclopramida.",
      evitar: "Passar de três dias: atrasa a compensação pelo sistema nervoso central (MS/UFRGS 2022; TSRS 2023). Idoso: anti-histamínico de primeira geração é inapropriado — sedação, confusão, queda (Consenso PIM 2016; CAB nº 28). VPPB: a crise dura menos de um minuto e o remédio quase não ajuda; trata-se com a manobra (CAB nº 28).",
      contraind: "Não listada nas fontes da pasta (TSRS 2023, CAB nº 28): conferir na bula.",
      adversos: "Sonolência, menos concentração e atenção, efeito somado ao do álcool e de outros depressores do SNC; no idoso, sedação, queda, retenção urinária e confusão (CAB nº 28, p. 188).",
      monitor: "Suspender no terceiro dia. Sem melhora progressiva em 15 dias de tratamento conservador: Otorrino; nenhuma resposta em 7 dias ou sintoma incapacitante: urgência (TSRS 2023, p. 5).",
      fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Urgência na UBS — até a remoção",
  kw: "urgencia emergencia ubs usf maleta carrinho samu remocao anafilaxia hipoglicemia sindrome coronariana cetoacidose choque",
  quando: "A urgência que chega à UBS: o que usar enquanto o SAMU não chega, com o que a unidade tem.",
  nota: "A lista de medicamentos de urgência da UBS (Portaria GM/MS nº 2.048/2002, cap. III, item 1.3) é de 2002 e está desatualizada: não traz AAS, salbutamol nem prometazina, e traz dobutamina, dopamina, deslanosídeo e meperidina. Conferir o que a maleta da USF tem de fato.",
  farmacos: [
    {
      nome: "Epinefrina (adrenalina)",
      id: "epinefrina",
      kw: "adrenalina epinefrina anafilaxia choque anafilatico alergia grave reacao a vacina picada de inseto edema de glote",
      apres: "solução injetável 1 mg/mL (1:1.000) (RENAME 2024)",
      dose: [
        { rot: "Adulto — anafilaxia (vale também para o adolescente com puberdade iniciada)", val: "0,01 mg/kg IM na coxa; máximo 0,5 mg" },
        { rot: "Criança — anafilaxia (protocolo pediátrico do SAMU: de 29 dias até o início da puberdade)", val: "0,01 mg/kg IM na coxa; máximo 0,3 mg" }
      ],
      porque: "É a droga de escolha na anafilaxia e deve ser dada de imediato, sem esperar confirmação diagnóstica. Corticoide e anti-histamínico só ajudam a evitar a evolução arrastada; não tratam a fase aguda (CAB nº 28).",
      escolher: "Anafilaxia por qualquer dos três critérios do SAMU: pele ou mucosa com comprometimento respiratório ou queda da PA; dois ou mais sistemas logo após um alérgeno provável; queda da PA após alérgeno conhecido. Edema de glote na urticária ou no angioedema também. A via é a intramuscular, no terço médio da face anterolateral da coxa.",
      evitar: "Via subcutânea: a intramuscular age mais rápido (CAB nº 28). Via venosa fora do choque: a EV, diluída e em infusão lenta com monitor, fica reservada à iminência de choque ou ao choque estabelecido, e é conduta do SAMU. Atrasar a adrenalina para dar antes anti-histamínico ou corticoide.",
      contraind: "Na anafilaxia, as fontes lidas (SAMU 2016, CAB nº 28) não trazem contraindicação. Em uso de betabloqueador a resposta pode ser fraca e o quadro mais grave, mas a adrenalina não deve ser evitada (ASBAI 2013).",
      adversos: "Depois da dose certa, é esperado e passa: palidez, tremor, ansiedade, palpitação, tontura e cefaleia — sinal de que a dose terapêutica foi dada (SAMU, protocolo pediátrico). A própria anafilaxia pode desmascarar doença coronariana, com isquemia e arritmia, com ou sem adrenalina (ASBAI 2013).",
      monitor: "Repetir a cada 5 a 15 minutos, pela gravidade e pela resposta à dose anterior. Volume da solução 1 mg/mL: 0,01 mL/kg; teto de 0,5 mL no adulto e de 0,3 mL na criança. Seringa de 1 mL e agulha 25 × 7 (30 × 8 na obesidade), na coxa, até por cima da roupa. Anotar o horário de cada dose. Deitado com as pernas elevadas, sem sentar nem levantar de repente. PA, FC e oximetria até a remoção. A reação pode voltar em 8 a 12 horas (bifásica, cerca de 20% dos casos — ASBAI 2013): remover para observação mesmo se melhorar. Em uso de IMAO, a adrenalina tem risco maior (ASBAI 2013): monitorar PA e FC depois da dose.",
      diverge: "O CAB nº 28 vol. II (2012, p. 26 e no quadro da p. 28) traz '0,3 a 0,5 mL IM ou SC' no adulto e '0,01 mg/kg/dia' na criança: a via SC e a unidade 'por dia' estão erradas. Vale o SAMU 2016: 0,01 mg/kg por aplicação, IM na coxa, teto de 0,5 mg no adulto e de 0,3 mg na criança. O guia de bolso do rodízio põe teto de 0,5 mg também na criança; o protocolo pediátrico do SAMU usa 0,3 mg.",
      fonte: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016"
    },
    {
      nome: "Prometazina",
      id: "prometazina",
      kw: "prometazina fenergan anti-histaminico injetavel anafilaxia urticaria angioedema alergia",
      apres: "solução injetável 25 mg/mL; comprimido 25 mg (RENAME 2024)",
      dose: [
        { rot: "Adulto — anafilaxia (adjuvante, depois da adrenalina) ou urticária e angioedema", val: "25 mg IM; pode repetir em 2 horas", p: 28 },
        { rot: "Criança de 5 a 10 anos — mesma indicação", val: "6,25 a 12,5 mg IM; máximo 0,5 mg/kg por dose", p: 28 },
        { rot: "Adulto — neurite vestibular ou labirintite aguda: sintomático, no máximo 3 dias", val: "25 mg VO de 8/8 h, por no máximo 3 dias", f: "MS/UFRGS — Protocolos de encaminhamento da APS para a atenção especializada, vol. 16: Neurologia adulto, 2022", p: 29 }
      ],
      porque: "Anti-histamínico injetável da farmácia básica. Na anafilaxia é adjuvante: ajuda a evitar a evolução arrastada, mas não trata a fase aguda (CAB nº 28).",
      escolher: "Depois da adrenalina, na anafilaxia; urticária e angioedema sem sinal de anafilaxia. O protocolo de anafilaxia do SAMU não usa anti-histamínico. Entre 2 e 5 anos o CAB nº 28 não traz dose: não improvisar.",
      evitar: "Usar no lugar da adrenalina. No idoso, anti-histamínico de primeira geração é potencialmente inapropriado (sedação, quedas, efeito anticolinérgico), embora possa ser apropriado na reação alérgica grave (Consenso PIM 2016).",
      contraind: "Abaixo de 2 anos (CAB nº 28). As demais não estão nas fontes lidas: conferir na bula.",
      adversos: "Sedação e efeito anticolinérgico (confusão, boca seca, constipação); no idoso, hipotensão postural e piora do parkinsonismo (Consenso PIM 2016).",
      monitor: "Sonolência, nível de consciência e PA depois da aplicação, sobretudo no idoso.",
      fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012"
    },
    {
      nome: "Glicose hipertônica (50% e 10%)",
      id: "glicose-hipertonica",
      kw: "glicose 50 glicose hipertonica soro glicosado 10 hipoglicemia grave coma hipoglicemico convulsao",
      apres: "solução injetável a 50% (500 mg/mL) e a 10% (100 mg/mL) (RENAME 2024)",
      dose: [
        { rot: "Adulto — hipoglicemia grave (não engole, confuso, convulsionando ou inconsciente; vale também para o adolescente com puberdade iniciada)", val: "25 mL de glicose 50% EV, a 3 mL/min" },
        { rot: "Adulto — hipoglicemia grave: depois do bolus", val: "manter a veia com glicose 10% até recuperar a consciência ou glicemia acima de 60; depois, via oral" },
        { rot: "Criança de 2 meses a 5 anos — doença grave com hipoglicemia, antes de referir", val: "5 a 10 mL/kg de glicose 10% EV em flush; depois manter glicose 10%", f: "MS/OPAS/UNICEF — Manual AIDPI Criança: 2 meses a 5 anos, 2017", p: 100 },
        { rot: "Criança de mais de 5 anos até o início da puberdade — hipoglicemia (glicemia abaixo de 60) que não pode ser tratada pela boca", val: "0,5 a 1 g/kg de glicose EV em bolus (com a glicose 10% da UBS: 5 a 10 mL/kg); glicemia em 10 minutos e repetir se seguir abaixo de 60 — o SAMU escreve a dose como glicose 25%, 2 a 4 mL/kg a 1 mL/min, que não vem pronta; nunca usar esse volume com a glicose 50%", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
      ],
      porque: "Repõe glicose de imediato pela veia em quem não consegue engolir. A hipoglicemia grave leva a convulsão, coma e morte.",
      escolher: "Hipoglicemia nível 3 — rebaixamento, convulsão, coma ou quem precisa de outra pessoa para se tratar, qualquer que seja o valor (PCDT DM2). Consciente e engolindo: carboidrato pela boca, não glicose EV. Também na crise convulsiva com glicemia baixa.",
      evitar: "Glicose EV em quem engole bem. Atrasar a glicose para esperar a tiamina no etilista: a tiamina vai antes, mas não segura a glicose. Liberar logo quem usa sulfonilureia: a hipoglicemia volta.",
      contraind: "As fontes lidas não trazem contraindicação ao tratamento da hipoglicemia grave.",
      adversos: "As fontes lidas não descrevem eventos adversos; o CAB nº 36 pede veia de grande calibre e infusão lenta.",
      monitor: "Glicemia capilar logo depois do bolus e de novo enquanto aguarda. Insulina: observar enquanto durar o pico; sulfonilureia: observar 48 a 72 horas (CAB nº 36) — combinar com a regulação onde. A glicose 25% da linha pediátrica do SAMU não vem pronta (a RENAME tem 50% e 10%) e o preparo não está na fonte: confirmar com a regulação ao acionar o SAMU.",
      diverge: "Adulto: o CAB nº 36 (2013, Quadro 11) dá 25 mL de glicose 50%; o SAMU (2016, AC29) dá 30 a 50 mL; o CAB nº 28 (2012, Quadro 13, crise convulsiva) escreve 'SG 50% 5 mL', provável erro de digitação — não usar esse número. Criança: a dose do SAMU é em gramas por kg; 5 a 10 mL/kg de glicose 10% é a mesma dose, e é a formulação que o AIDPI usa de 2 meses a 5 anos.",
      fonte: "MS — CAB nº 36, Diabetes Mellitus, 2013"
    },
    {
      nome: "Glucagon",
      id: "glucagon",
      kw: "glucagon glucagen hipoglicemia grave sem acesso venoso diabetes tipo 1 familia",
      apres: "pó liofilizado com diluente, para injeção (fora da RENAME 2024)",
      dose: [
        { rot: "Adulto e criança de 8 anos ou mais — hipoglicemia moderada a grave, sem acesso venoso", val: "1 mg IM", p: 51 },
        { rot: "Criança abaixo de 8 anos — mesma indicação", val: "0,5 mg IM", p: 51 }
      ],
      porque: "Alternativa intramuscular à glicose venosa na hipoglicemia, que pode ser feita antes da ida ao hospital, inclusive pela família treinada (CAB nº 28).",
      escolher: "Hipoglicemia moderada a grave sem acesso venoso, quando houver glucagon; família de criança com DM1 que já tem o produto e foi treinada.",
      evitar: "Contar com ele na UBS: é caro, não está na RENAME e em geral não está no estoque. Atrasar o SAMU por causa dele.",
      contraind: "O CAB nº 28 não traz contraindicação: conferir na bula.",
      adversos: "O CAB nº 28 não descreve: conferir na bula.",
      monitor: "É um pó que precisa ser misturado ao diluente antes da aplicação, e a família precisa de instrução prévia (CAB nº 28). Glicemia capilar de novo e SAMU acionado.",
      fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012"
    },
    {
      nome: "Dinitrato de isossorbida (sublingual)",
      id: "dinitrato-de-isossorbida",
      kw: "isordil isossorbida dinitrato nitrato sublingual angina dor toracica infarto sindrome coronariana edema agudo de pulmao",
      apres: "comprimido sublingual 5 mg (RENAME 2024)",
      dose: [
        { rot: "Adulto — suspeita de síndrome coronariana aguda, dor que persiste", val: "5 mg SL a cada 5 a 10 min; máximo 15 mg", p: 127 },
        { rot: "Adulto — edema agudo de pulmão com PAS acima de 90, até a remoção", val: "5 mg SL a cada 5 a 10 minutos — antes de cada comprimido, PAS acima de 90; o SAMU não dá teto no EAP", f: "MS — SAMU 192, Protocolos de Suporte Avançado de Vida, 2016" }
      ],
      porque: "Nitrato sublingual da farmácia básica e da lista de urgência da UBS. Na dor torácica isquêmica, entra junto com AAS e oxigênio quando indicado; no edema agudo de pulmão, só com PAS acima de 90 (SAMU).",
      escolher: "Dor torácica com suspeita de SCA que persiste, enquanto aguarda a remoção; edema agudo de pulmão com PAS acima de 90. Antes de cada comprimido: PA, FC e as contraindicações.",
      evitar: "Baixar demais a PA: limitar a queda a 10% no normotenso e a 30% no hipertenso (SAMU). Usar a melhora com nitrato como prova de que a dor é cardíaca: a dor do esôfago também melhora com nitrato (CAB nº 28).",
      contraind: "Na SCA (SAMU AC17): PAS abaixo de 90; FC abaixo de 50 ou acima de 100; suspeita de infarto de ventrículo direito, ou de parede inferior que possa envolver o VD; sildenafila, vardenafila ou lodenafila nas últimas 24 horas, tadalafila nas últimas 48 horas, ou alprostadil, fentolamina ou ioimbina nas últimas 24 horas. No edema agudo de pulmão (SAMU AC24), o protocolo só exige PAS acima de 90: a taquicardia do EAP não impede o nitrato; perguntar o inibidor de PDE5 também (o AC24 não o cita — confirmar com a regulação).",
      adversos: "Hipotensão — por isso a PA antes de cada dose. As fontes lidas não detalham os demais.",
      monitor: "PA e FC antes de cada comprimido; repetir só se a dor persistir e a PAS se mantiver. Anotar horário e número de doses para a ficha de referência.",
      diverge: "Intervalo entre doses: CAB nº 28 (2012, p. 127) 5 a 10 minutos; SAMU (2016, AC17) 3 a 5 minutos, até duas repetições. O teto é o mesmo.",
      fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antibacterianos para ITU e pele",
  kw: "itu cistite infeccao urinaria bacteriuria pielonefrite prostatite impetigo erisipela piodermite antibiotico",
  quando: "Cistite, bacteriúria da gestante, prostatite; impetigo e erisipela tratados na APS. O ciprofloxacino (ITU complicada, pielonefrite leve, homem) está na classe “Diarreia aguda: reidratação, antiemético e antibiótico”, com as linhas de ITU.",
  nota: "Todos aqui são antimicrobianos da IN nº 360/2025 (venda com retenção da receita, válida por 10 dias). Na cistite não complicada da mulher a quinolona saiu da 1ª linha (consenso de 2020); a fosfomicina, 1ª linha, não está na RENAME 2024.",
  farmacos: [
    {
      nome: "Nitrofurantoína",
      id: "nitrofurantoina",
      kw: "nitrofurantoina macrodantina cistite itu infeccao urinaria bacteriuria gestante profilaxia",
      apres: "cápsula 100 mg; suspensão oral 5 mg/mL",
      dose: [
        { rot: "Mulher adulta não gestante — cistite não complicada (1ª linha)", val: "100 mg VO de 6/6 horas, por 5 dias" },
        { rot: "Gestante até 37 semanas — bacteriúria assintomática ou cistite", val: "100 mg VO de 6/6 horas, por 5 dias — depois de 37 semanas, o Manual recomenda trocar por cefalexina",
          f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Gestante — profilaxia até o parto: depois de pielonefrite, ou quando a bacteriúria ou a cistite se repete", val: "100 mg VO 1x/dia — depois de 37 semanas, trocar por cefalexina (risco de icterícia neonatal)",
          f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Mulher não gestante — profilaxia de ITU de repetição, por 6 a 12 meses", val: "100 mg VO 1x/dia ao deitar (contínua), ou 100 mg depois da relação sexual (pós-coito)" }
      ],
      porque: "Antibacteriano que se concentra na urina, com resistência baixa: a E. coli da cistite no Brasil foi sensível em mais de 90% nos estudos do consenso. Cobre E. coli, Enterococcus, S. aureus, S. saprophyticus e estreptococo do grupo B.",
      escolher: "Primeira linha na cistite não complicada da mulher, junto da fosfomicina, e a única das duas na farmácia da USF. Na gestante, bacteriúria, cistite e profilaxia até 37 semanas.",
      evitar: "ITU complicada e pielonefrite: pouca penetração no tecido (Protocolos da AB, Saúde das Mulheres, 2016, p. 61). Proteus e Pseudomonas têm resistência intrínseca: se a urocultura mostrar, trocar. Profilaxia longa sem reavaliar.",
      contraind: "Gestação a partir de 37 semanas (consenso 2020; o CAB nº 32, de 2012, corta em 36) — risco de icterícia e de hemólise no recém-nato. Lactação: o CAB nº 32 (2012) não recomenda (anemia hemolítica no bebê com deficiência de G6PD). As demais: conferir na bula, sobretudo na função renal reduzida (o corte de depuração não está nas fontes da pasta).",
      adversos: "Pneumonite no uso por mais de 14 dias, com risco maior na idosa e na disfunção renal. As fontes não detalham outros efeitos: conferir na bula.",
      monitor: "Melhora clínica em 48 horas; sem melhora, urocultura e trocar. Gestante: urocultura de controle 1 a 2 semanas depois do fim. Na profilaxia longa, perguntar por tosse e falta de ar.",
      fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020"
    },
    {
      nome: "Fosfomicina trometamol",
      id: "fosfomicina",
      kw: "fosfomicina trometamol monuril cistite itu dose unica gestante profilaxia",
      apres: "fosfomicina trometamol 3 g para dose oral única (apresentação comercial: conferir na farmácia); fora da RENAME 2024",
      dose: [
        { rot: "Mulher adulta não gestante — cistite não complicada (1ª linha)", val: "3 g VO em dose única" },
        { rot: "Gestante — bacteriúria assintomática ou cistite", val: "3 g VO em dose única", f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Mulher não gestante — profilaxia de ITU de repetição, por 6 a 12 meses", val: "3 g VO a cada 10 dias" }
      ],
      porque: "Mecanismo de ação próprio e resistência baixa; ativa contra E. coli (inclusive a produtora de ESBL), Enterococcus, S. aureus e S. epidermidis.",
      escolher: "Primeira linha na cistite não complicada, com a vantagem da dose única. Não está na RENAME 2024: a paciente compra. Na gestante, uma das opções do Manual de Alto Risco.",
      evitar: "Suspeita de S. saprophyticus (atividade limitada). Pielonefrite: as fontes só a indicam na ITU baixa.",
      contraind: "As fontes não listam contraindicação: conferir na bula.",
      adversos: "As fontes não descrevem: conferir na bula.",
      monitor: "Melhora em 48 horas; sem melhora, urocultura. Gestante: urocultura de controle 1 a 2 semanas depois.",
      fonte: "SBI/FEBRASGO/SBU/SBPC-ML — Joint report: infecção do trato urinário na mulher, Braz J Infect Dis, 2020"
    },
    {
      nome: "Cefalexina",
      id: "cefalexina",
      kw: "cefalexina keflex cefalosporina gestante itu bacteriuria profilaxia impetigo erisipela piodermite",
      apres: "cápsula e comprimido 500 mg; suspensão oral 50 mg/mL",
      dose: [
        { rot: "Gestante — bacteriúria assintomática ou cistite", val: "500 mg VO de 6/6 horas, por 7 dias", f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Gestante — profilaxia até o parto (depois de pielonefrite ou de episódio repetido; e, depois de 37 semanas, no lugar da nitrofurantoína)", val: "250 a 500 mg VO 1x/dia", f: "MS — Manual de Gestação de Alto Risco, 2022" },
        { rot: "Homem adulto — cistite (infecção complicada)", val: "250 a 500 mg VO de 6/6 horas, por 7 dias", p: 77 },
        { rot: "Adulto — impetigo com lesões disseminadas e estado geral comprometido", val: "250 a 500 mg VO quatro vezes ao dia, por sete dias", p: 81 },
        { rot: "Adulto — erisipela sem comprometimento importante do estado geral", val: "250 a 500 mg VO quatro vezes ao dia, por sete dias", p: 82 }
      ],
      porque: "Cefalosporina de 1ª geração: cobre o estafilococo e o estreptococo da pele e é usada na gestação.",
      escolher: "Gestante (bacteriúria, cistite e profilaxia, inclusive depois de 37 semanas); cistite no homem; impetigo e erisipela, preferida quando se suspeita de estafilococo (CAB nº 28); infecção secundária da dermatite atópica, onde a cefalosporina é a 1ª escolha (SBD, 2019). Está na farmácia da USF. Criança: o CAB nº 28 dá a dose por kg sem teto, por isso ela não entrou no cartão.",
      evitar: "Na cistite da gestante, o consenso de 2020 aponta mais falha com cefalosporina de 1ª geração e amoxicilina: quando houver, guiar pelo antibiograma.",
      contraind: "As fontes não listam contraindicação: conferir na bula.",
      adversos: "As fontes não descrevem: conferir na bula.",
      monitor: "Gestante: urocultura de controle 2 semanas depois. Erisipela sem melhora ou com piora do estado geral: avaliação hospitalar (CAB nº 28, p. 82).",
      fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012"
    },
    {
      nome: "Sulfametoxazol + trimetoprima",
      id: "sulfametoxazol-trimetoprima",
      kw: "sulfametoxazol trimetoprima smx tmp bactrim cotrimoxazol prostatite cistite",
      apres: "comprimido 400 mg + 80 mg; suspensão oral 40 mg/mL + 8 mg/mL; solução injetável 80 mg/mL + 16 mg/mL",
      dose: [
        { rot: "Homem adulto — prostatite bacteriana aguda", val: "800/160 mg VO de 12/12 horas, por três a quatro semanas", p: 78 },
        { rot: "Homem adulto — prostatite bacteriana crônica (1ª escolha)", val: "800/160 mg VO de 12/12 horas, por quatro a 12 semanas", p: 78 },
        { rot: "Mulher não gestante — cistite não complicada, só com urocultura mostrando sensibilidade", val: "800/160 mg VO de 12/12 horas, por 3 dias",
          f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016", p: 61 }
      ],
      porque: "Associação de duas drogas que bloqueiam etapas seguidas da síntese de folato da bactéria.",
      escolher: "Prostatite: 1ª escolha na crônica e opção na aguda (CAB nº 28, 2012, a única fonte brasileira da pasta para o homem). Cistite da mulher: o Protocolo de 2016 a põe em 1ª linha, mas o consenso de 2020 mostra a E. coli sensível em só 55 a 63% no Brasil — usar quando a urocultura mostrar sensibilidade. Está na farmácia da USF.",
      evitar: "Tratamento empírico da cistite sem antibiograma (resistência alta). Gestante: evitar no 1º trimestre (teratogenicidade da trimetoprima) e no 3º (kernicterus, sobretudo no prematuro) — CAB nº 32, 2012, p. 191.",
      contraind: "1º e 3º trimestres da gestação (CAB nº 32, 2012). As demais: conferir na bula.",
      adversos: "As fontes não descrevem: conferir na bula.",
      monitor: "Prostatite: reavaliar estado geral e resposta; internação e antibiótico venoso se piorar ou não responder (CAB nº 28, p. 78). 800/160 mg = 2 comprimidos de 400/80 mg da RENAME.",
      fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Antifúngicos e escabicida de uso na pele",
  kw: "micose tinha tinea frieira impingem pitiriase versicolor pano branco candidiase sapinho intertrigo onicomicose escabiose sarna antifungico escabicida",
  quando: "Escabiose, dermatofitoses (tineas), pitiríase versicolor, candidíase mucocutânea e onicomicose na APS. O miconazol (creme, loção, gel oral) e o fluconazol são cartões do formulário de IST, com as linhas da pele.",
  nota: "Tópico primeiro, oral se extensa ou se o tópico falhou; tinea capitis é sempre oral. Nistatina não trata tinea e cetoconazol oral não se usa em micose superficial.",
  farmacos: [
    {
      nome: "Permetrina",
      id: "permetrina",
      kw: "permetrina escabiose sarna escabicida locao creme contatos",
      apres: "loção 5% (50 mg/mL) e loção 1% (10 mg/mL) na RENAME; o CAB nº 28 cita o creme 5%",
      dose: [
        { rot: "Escabiose — adulto e criança a partir de três meses (escolha, CAB nº 28)", val: "creme ou loção 5%: do pescoço aos pés, 8 a 12 horas, sem repetir", p: 86 },
        { rot: "Escabiose — esquema do guia de bolso do MS", val: "creme 5%: uma aplicação à noite por 6 noites",
          f: "MS — Doenças infecciosas e parasitárias: guia de bolso, 8ª ed. rev., 2010", p: 169 }
      ],
      porque: "Escabicida tópico de escolha, com boa tolerância local.",
      escolher: "Escabiose em adulto e em criança a partir de três meses, tratando todos os contatos ao mesmo tempo. A RENAME 2024 tem a loção 5% e a loção 1% (Componente Básico).",
      evitar: "Aplicar logo depois de banho quente (absorve mais e pode dar dermatite de contato) e repetir sem necessidade (irrita a pele).",
      contraind: "Segurança não estabelecida abaixo de três meses, na gestante e na lactante (CAB nº 28). Abaixo de três meses e na gestante, o CAB indica enxofre em vaselina (fora da RENAME); para a lactante, nenhuma das fontes indica alternativa.",
      adversos: "Boa tolerância local; o uso repetido e desnecessário irrita a pele e pode dar dermatite de contato.",
      monitor: "O prurido e alguns nódulos podem durar semanas depois do tratamento. Falha: sinais e sintomas depois de 2 semanas; voltar depois de 4 semanas é reinfestação (guia de bolso do MS, 2010, p. 170).",
      diverge: "CAB nº 28 (2012): uma aplicação, sem repetir; enxofre 5% em vaselina abaixo de 3 meses e na gestante. Guia de bolso (2010): 6 noites; enxofre 10% em petrolato na gestante e abaixo de 2 anos.",
      fonte: "MS — CAB nº 28, vol. II, Queixas mais comuns na Atenção Básica, 2012"
    },
    {
      nome: "Cetoconazol (xampu)",
      id: "cetoconazol",
      kw: "cetoconazol xampu shampoo pitiriase versicolor pano branco dermatite seborreica caspa tinea capitis",
      apres: "xampu 2% (20 mg/mL)",
      dose: [
        { rot: "Pitiríase versicolor — tratamento tópico", val: "xampu 2% na pele afetada: deixar 5 a 10 minutos, 1x/dia, por 1 a 4 semanas", p: 39 },
        { rot: "Pitiríase versicolor recorrente — profilaxia", val: "xampu 2% no corpo todo, deixar 10 minutos, 1x/mês (sobretudo nos meses quentes)", p: 39 },
        { rot: "Dermatite seborreica do couro cabeludo", val: "xampu 2%: deixar agir 3 a 5 minutos, 2 a 5x/semana, por 2 a 4 semanas; depois 1 a 2x/semana como manutenção", p: 37 },
        { rot: "Tinea capitis — junto do antifúngico oral, no paciente e nos contatos da casa sem lesão", val: "xampu 2%: lavar o couro cabeludo, deixar agir 5 minutos e enxaguar, 2x/semana, por 2 a 4 semanas",
          f: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025", p: 12 }
      ],
      porque: "Antifúngico azólico de uso tópico: o xampu age sobre a Malassezia (pitiríase versicolor, dermatite seborreica) e reduz os esporos de dermatófito no couro cabeludo.",
      escolher: "Pitiríase versicolor, dermatite seborreica do couro cabeludo e adjuvante da tinea capitis. É a única forma de cetoconazol da RENAME 2024 (xampu 2%, Componente Básico).",
      evitar: "Cetoconazol por via oral: contraindicado nas micoses superficiais, por mais efeitos adversos (alerta da Anvisa de reação hepática grave, citado pelo TeleCondutas de 2025).",
      contraind: "Via oral em tinea e em pitiríase versicolor. Para o xampu, as fontes não listam: conferir na bula.",
      adversos: "As fontes não descrevem os do xampu: conferir na bula.",
      monitor: "Pitiríase versicolor: avisar que a mancha clara pode levar meses para repigmentar, mesmo curada.",
      fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023"
    },
    {
      nome: "Nistatina",
      id: "nistatina",
      kw: "nistatina micostatin sapinho candidiase oral orofaringea suspensao",
      apres: "suspensão oral 100.000 UI/mL",
      dose: [
        { rot: "Adulto e criança — candidíase orofaríngea", val: "suspensão 100.000 UI/mL: bochechar e engolir 4 a 6 mL, 4x/dia, por 7 a 14 dias", p: 38 },
        { rot: "Bebê — candidíase oral (sapinho)", val: "suspensão 100.000 UI/mL: 2 mL (1 mL em cada bochecha), 4x/dia, por 7 a 14 dias", p: 38 }
      ],
      porque: "Antifúngico de ação local na mucosa (uso tópico).",
      escolher: "Candidíase oral do adulto, da criança e do bebê, como 1ª opção junto do miconazol gel oral. É a única forma de nistatina da RENAME 2024 (suspensão oral, Componente Básico).",
      evitar: "Tinea (dermatofitose): a nistatina não é efetiva e não deve ser usada (TeleCondutas, 2025, p. 8).",
      contraind: "As fontes não listam: conferir na bula.",
      adversos: "As fontes não descrevem: conferir na bula.",
      monitor: "Sem resposta, extensa ou recorrente: fluconazol (cartão próprio) e procurar diabetes e imunossupressão. Dentadura: tratar a prótese junto. Bebê: ferver bicos e brinquedos e examinar o mamilo da mãe que amamenta.",
      fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023"
    },
    {
      nome: "Itraconazol",
      id: "itraconazol",
      kw: "itraconazol antifungico oral tinea micose pitiriase versicolor onicomicose intertrigo candida",
      apres: "cápsula 100 mg; solução oral 10 mg/mL",
      dose: [
        { rot: "Adulto — tinea corporis extensa ou que falhou no tópico", val: "200 mg VO 1x/dia, por 1 semana", p: 9 },
        { rot: "Criança — tinea corporis extensa ou que falhou no tópico", val: "3 a 5 mg/kg VO 1x/dia (máximo 200 mg/dia), por 1 semana", p: 9 },
        { rot: "Adulto — tinea cruris extensa ou que falhou no tópico", val: "200 mg VO 1x/dia, por 1 a 3 semanas", p: 14 },
        { rot: "Adulto — tinea pedis ou manuum que falhou no tópico", val: "200 mg VO 2x/dia, por 1 semana", p: 17 },
        { rot: "Adulto e criança — tinea capitis (2ª linha: eficácia menor que a da griseofulvina e da terbinafina)", val: "3 a 5 mg/kg VO 1x/dia (máximo 200 mg/dia), por 4 a 8 semanas · alternativa: a mesma dose 1 semana por mês, por 2 a 3 meses", p: 11 },
        { rot: "Adulto — pitiríase versicolor extensa, recorrente ou refratária", val: "200 mg VO 1x/dia, por 5 a 7 dias",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 39 },
        { rot: "Adulto — intertrigo por Candida extenso ou que falhou no tópico", val: "200 mg VO 2x/dia, por 2 a 6 semanas",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 38 },
        { rot: "Adulto — onicomicose, em pulso (nos pés, 2ª linha depois da terbinafina)", val: "2 cápsulas de 100 mg VO 2x/dia, 1 semana por mês, por 2 meses (mãos) ou 3 meses (pés)",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 40 }
      ],
      porque: "Azólico oral contra dermatófitos e Candida.",
      escolher: "Tinea extensa ou que falhou no tópico, tinea capitis quando terbinafina e griseofulvina não são acessíveis, pitiríase versicolor extensa, intertrigo por Candida e onicomicose. Está na RENAME 2024 (cápsula e solução oral). Tomar junto da refeição.",
      evitar: "Uso junto com sinvastatina e na insuficiência cardíaca; cautela com fator de risco para IC. Atenção às interações.",
      contraind: "Uso concomitante de sinvastatina; insuficiência cardíaca (Protocolo de Dermatologia, 2023, p. 38 a 40). Gestação e lactação: as fontes não tratam — não prescrever sem conferir na bula.",
      adversos: "Sintomas gastrointestinais, erupção cutânea, cefaleia, vertigem e alteração de transaminases.",
      monitor: "Uso diário por mais de 3 a 4 semanas, hepatopatia, hepatite medicamentosa prévia ou outro hepatotóxico: AST e ALT antes e a cada 4 semanas. O pulso, sem esses fatores, dispensa exame prévio.",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025"
    },
    {
      nome: "Terbinafina",
      id: "terbinafina",
      kw: "terbinafina lamisil antifungico oral tinea capitis onicomicose micose de unha dermatofitose",
      apres: "comprimido 250 mg (não há solução oral: na criança, fracionar o comprimido)",
      dose: [
        { rot: "Adulto — tinea corporis extensa ou que falhou no tópico", val: "250 mg VO 1x/dia, por 1 a 3 semanas", p: 9 },
        { rot: "Criança — tinea corporis extensa ou que falhou no tópico", val: "pelo peso, 1x/dia, por 1 a 3 semanas: 10 a 20 kg, 62,5 mg; 20 a 40 kg, 125 mg; acima de 40 kg, 250 mg", p: 9 },
        { rot: "Adulto — tinea cruris extensa ou que falhou no tópico", val: "250 mg VO 1x/dia, por 1 a 3 semanas", p: 14 },
        { rot: "Adulto — tinea pedis ou manuum que falhou no tópico", val: "250 mg VO 1x/dia, por 2 semanas", p: 17 },
        { rot: "Adulto — tinea capitis (1ª escolha, com a griseofulvina)", val: "250 mg VO 1x/dia, por 3 a 6 semanas", p: 11 },
        { rot: "Criança a partir de 4 anos — tinea capitis (1ª escolha)", val: "pelo peso, 1x/dia, por 3 a 6 semanas: 10 a 20 kg, 62,5 mg; 20 a 40 kg, 125 mg; acima de 40 kg, 250 mg", p: 11 },
        { rot: "Adulto — onicomicose das mãos por dermatófito", val: "250 mg VO 1x/dia, por 6 semanas",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 40 },
        { rot: "Adulto — onicomicose dos pés (sistêmica)", val: "250 mg VO 1x/dia, por 3 meses",
          f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023", p: 40 }
      ],
      porque: "Antifúngico oral (alilamina) contra dermatófitos.",
      escolher: "Primeira escolha oral na tinea capitis (com a griseofulvina) e na onicomicose; opção na tinea extensa. NÃO está na RENAME 2024: o paciente compra (há genérico registrado).",
      evitar: "Atrasar o início à espera de exame em quem não tem doença hepática conhecida (TeleCondutas, 2025, p. 11).",
      contraind: "As fontes não listam: conferir na bula, sobretudo na doença hepática. Gestação e lactação: as fontes não tratam — não prescrever sem conferir na bula.",
      adversos: "Sintomas gastrointestinais, alteração do paladar, cefaleia, aumento de transaminases e erupção cutânea.",
      monitor: "Uso previsto por mais de 3 a 4 semanas: AST e ALT antes, de preferência; repetir em 4 a 6 semanas só com doença hepática, álcool, hepatite medicamentosa prévia ou sintomas (náusea, vômito, icterícia, colúria, acolia).",
      fonte: "TelessaúdeRS-UFRGS — TeleCondutas: Dermatofitoses, 2ª ed., 2025"
    }
  ]
});

FARMACOS_APS.classes.push({
  rot: "Corticoides tópicos",
  kw: "corticoide topico pomada creme eczema dermatite atopica dermatite de contato seborreica",
  quando: "Eczema da dermatite atópica, de contato e seborreica, pela potência adequada à idade e ao local (Quadro 12 do Protocolo de Dermatologia de 2023).",
  nota: "Os dois do Componente Básico da RENAME 2024 são de baixa potência. O clobetasol 0,05% (muito alta; creme e solução capilar) está no Componente Especializado, não na farmácia da USF; a betametasona não consta da RENAME.",
  farmacos: [
    {
      nome: "Dexametasona creme 0,1%",
      id: "dexametasona-creme",
      kw: "dexametasona creme corticoide topico baixa potencia eczema dermatite",
      apres: "creme dermatológico 0,1% (1 mg/g)",
      dose: [
        { rot: "Dermatite atópica — áreas de eczema", val: "creme 0,1%: 1 ou 2x/dia nas áreas de eczema, por 2 a 4 semanas", p: 36 },
        { rot: "Dermatite de contato — depois de afastar o desencadeante", val: "creme 0,1%: 2x/dia, por 2 a 4 semanas", p: 37 },
        { rot: "Dermatite seborreica de face e dobras", val: "creme 0,1%: 1 a 2x/dia até melhorar, pelo menor tempo possível", p: 37 }
      ],
      porque: "Corticoide tópico de baixa potência: anti-inflamatório para o eczema.",
      escolher: "Eczema da dermatite atópica, de contato e seborreica; a baixa potência é a indicada na face e nas dobras. Está na RENAME 2024 (Componente Básico).",
      evitar: "Lesão de micose (o corticoide tópico predispõe ao granuloma de Majocchi, TeleCondutas 2025); eczema disidrótico, que pede alta potência.",
      contraind: "As fontes não listam contraindicação formal; o Protocolo de 2023 manda tratar a infecção cutânea associada (bacteriana, fúngica ou viral). Conferir na bula.",
      adversos: "Atrofia da pele e, no uso extenso, supressão adrenal (consenso da SBD, 2019).",
      monitor: "Reavaliar em 2 a 4 semanas; refratária a 1 mês de tratamento otimizado, com adesão conferida: dermatologia.",
      fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023"
    },
    {
      nome: "Acetato de hidrocortisona creme 1%",
      id: "hidrocortisona-creme",
      kw: "hidrocortisona creme corticoide topico baixa potencia eczema dermatite face crianca",
      apres: "creme 1% (10 mg/g)",
      dose: [
        { rot: "Dermatite atópica — áreas de eczema", val: "creme 1%: 1 ou 2x/dia nas áreas de eczema, por 2 a 4 semanas — posologia geral do corticoide tópico (Quadro 11); hidrocortisona 1% é de baixa potência (Quadro 12)", p: 36 },
        { rot: "Dermatite de contato — depois de afastar o desencadeante", val: "creme 1%: 2x/dia, por 2 a 4 semanas", p: 37 },
        { rot: "Dermatite seborreica de face e dobras", val: "creme 1%: 1 a 2x/dia até melhorar, pelo menor tempo possível", p: 37 }
      ],
      porque: "Corticoide tópico de baixa potência: anti-inflamatório para o eczema.",
      escolher: "As mesmas indicações da dexametasona creme; baixa potência, indicada na face e nas dobras. Está na RENAME 2024 (Componente Básico).",
      evitar: "Lesão de micose (o corticoide tópico predispõe ao granuloma de Majocchi, TeleCondutas 2025); eczema disidrótico, que pede alta potência.",
      contraind: "As fontes não listam contraindicação formal; o Protocolo de 2023 manda tratar a infecção cutânea associada (bacteriana, fúngica ou viral). Conferir na bula.",
      adversos: "Atrofia da pele e, no uso extenso, supressão adrenal (consenso da SBD, 2019).",
      monitor: "Reavaliar em 2 a 4 semanas; refratária a 1 mês de tratamento otimizado, com adesão conferida: dermatologia.",
      fonte: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Dermatologia, 2023"
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
      f: "MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025" },
    { id: "car-ic-terapia-padrao",
      t: "ICFEr — IECA (ou BRA) + betabloqueador + espironolactona, diurético se congesto, e dapagliflozina",
      d: "O tratamento padrão do PCDT é IECA (BRA se não tolerar, sobretudo por tosse), betabloqueador (carvedilol ou succinato de metoprolol) e espironolactona na NYHA II a IV, com diurético só se houver congestão. Sintomático apesar disso, com fração de ejeção abaixo de 40%: somar dapagliflozina. Começar cada um em dose baixa e subir até a maior dose tolerada; reavaliar os sintomas quatro semanas depois de otimizar o último fármaco.",
      f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 11 },
    { id: "car-hidralazina-nitrato",
      t: "Hidralazina + nitrato de isossorbida — ICFEr sem IECA nem BRA, ou NYHA III e IV apesar de otimizado",
      d: "Indicada a quem não tolera IECA nem BRA por hipercalemia ou perda de função renal, e a quem segue em classe III ou IV apesar do tratamento otimizado (IECA ou BRA ou sacubitril-valsartana, betabloqueador, espironolactona, dapagliflozina) — sobretudo na população negra, em que a evidência é maior. Começar em dose baixa e subir conforme a tolerância.",
      f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 14 },
    { id: "car-drc-ieca-dapagliflozina",
      t: "DRC — IECA ou BRA + dapagliflozina",
      d: "IECA ou BRA no diabético com DRC e albuminúria (RAC de 30 ou mais) e no não diabético com RAC de 300 ou mais, com ou sem hipertensão. Com TFG entre 25 e 75 e, além disso, DM2 ou (sem diabetes) RAC acima de 300, somar a dapagliflozina à terapia padrão; pelo PCDT de DRC, mantê-la até o início da terapia renal substitutiva, mesmo que a TFG caia ou a RAC melhore (no DM2 com TFG persistentemente abaixo de 25, o PCDT de DM2 manda suspender: divergência). A prescrição pode ser feita na APS.",
      f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024" },
    { id: "car-drc-espironolactona",
      t: "DRC — espironolactona somada ao IECA ou BRA (RAC de 300 ou mais, hipertrofia ventricular ou IC)",
      d: "Indicada na DRC estágios 1 a 4 com RAC de 300 ou mais, hipertrofia ventricular esquerda ou insuficiência cardíaca, com ou sem hipertensão. Ao incluí-la, reduzir a dose do IECA: a soma favorece hipercalemia grave. Creatinina e potássio em 2 a 4 semanas.",
      f: "MS — PCDT Estratégias para Atenuar a Progressão da Doença Renal Crônica, Portaria Conjunta SAES/SECTICS nº 11, 2024" },
    { id: "dig-tripla-claritromicina-h-pylori",
      t: "Omeprazol + amoxicilina + claritromicina (H. pylori — tríplice do TeleCondutas; o V Consenso desencoraja como 1ª linha empírica)",
      d: "Só com resistência local baixa à claritromicina ou sensibilidade confirmada (V Consenso). Omeprazol 20 mg de 12/12 h + amoxicilina 1 g de 12/12 h + claritromicina 500 mg de 12/12 h, por 14 dias; " +
         "na úlcera péptica, IBP por mais 4 a 8 semanas. É o esquema padrão de 1ª linha do TeleCondutas, adaptado do " +
         "IV Consenso. O V Consenso desencoraja esta tríplice com IBP, salvo resistência local baixa à claritromicina " +
         "ou sensibilidade confirmada: ver a seção de tratamento da queixa.",
      f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024", p: 25 },
    { id: "dig-concomitante-h-pylori",
      t: "Omeprazol + amoxicilina + claritromicina + metronidazol (H. pylori — terapia concomitante)",
      d: "IBP de 12/12 h + amoxicilina 1 g de 12/12 h + claritromicina 500 mg de 12/12 h + metronidazol 500 mg de " +
         "12/12 h (ou 400 mg de 8/8 h, quando não houver o de 500 mg), por 14 dias (V Consenso; o TeleCondutas, que a lista como " +
         "esquema alternativo ou de 2ª linha, aceita 10 a 14). O V Consenso a aceita como opção de 1ª linha sem bismuto. Monta-se toda com a RENAME.",
      f: "TelessaúdeRS-UFRGS — TeleCondutas: Alterações Endoscópicas, 2ª ed., 2024", p: 25 },
    { id: "dig-dupla-amoxicilina-h-pylori",
      t: "Amoxicilina em dose alta + IBP em dose alta (H. pylori sem bismuto — V Consenso)",
      d: "Amoxicilina 3 a 4 g/dia, divididos em 3 ou 4 tomadas (750 a 1000 mg cada; na obesidade, 1 g 4x/dia), com " +
         "IBP em dose alta 3 ou 4 vezes ao dia, por 14 dias. É a 1ª linha do V Consenso quando não há bismuto e se " +
         "monta só com a RENAME (omeprazol e amoxicilina). O Consenso define IBP em dose alta como 54 a 128 mg de " +
         "equivalente de omeprazol 2x/dia, mas no esquema duplo escreve 3 ou 4 tomadas: a dose de omeprazol por " +
         "tomada não está fixada — combinar com a preceptora.",
      f: "FBG/NBEHPM — V Consenso Brasileiro sobre infecção por Helicobacter pylori, Arq Gastroenterol, 2026" },
    { id: "resp-pac-betalactamico-macrolideo",
      t: "Amoxicilina (ou amoxicilina-clavulanato) + azitromicina na PAC ambulatorial com comorbidade",
      d: "Com comorbidade (DPOC, doença hepática ou renal, câncer, diabetes, insuficiência cardíaca, alcoolismo, " +
         "imunossupressão), antibiótico nos últimos três meses ou risco de pneumococo resistente, o betalactâmico vai junto " +
         "de um macrolídeo; no hígido sem fator de risco, um dos dois sozinho basta. Na DPOC, a azitromicina é preferida à " +
         "claritromicina por cobrir melhor o H. influenzae.",
      f: "SBPT — Recomendações para o manejo da pneumonia adquirida na comunidade, J Bras Pneumol, 2018" },
    { id: "resp-asma-beclometasona-salbutamol",
      t: "Beclometasona + salbutamol — o regime 2 da asma, o que a UBS entrega",
      d: "Etapa 1: CI de dose baixa sempre que usar o salbutamol (no mesmo inalador ou separado, o CI logo depois do SABA). " +
         "Etapa 2: CI diário de dose baixa + salbutamol sob demanda. O PCDT 2026 prefere o regime 1 (formoterol + " +
         "budesonida, Componente Especializado); o regime 2 é a alternativa quando o 1 não é viável, ou no paciente " +
         "estável, aderente e sem exacerbação no último ano.",
      f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
    { id: "resp-dpoc-exacerbacao-saba-sama",
      t: "Salbutamol + ipratrópio na exacerbação da DPOC",
      d: "Na exacerbação ajusta-se o broncodilatador de curta ação, e o antimuscarínico de curta ação pode ser associado ao " +
         "SABA. Junto: corticoide oral por cinco dias nas exacerbações moderadas e graves, e antibiótico só na exacerbação " +
         "infecciosa, com critério.",
      f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
    { id: "resp-rsc-antibiotico-corticoide",
      t: "Amoxicilina-clavulanato + prednisona na rinossinusite crônica sem resposta ou agudizada",
      d: "Depois de 8 a 12 semanas de lavagem salina e corticoide nasal sem resposta, ou com edema grave de mucosa, ou na " +
         "agudização: curso curto de antibiótico oral por 10 a 14 dias junto de prednisona por 10 dias no total.",
      f: "TelessaúdeRS-UFRGS/SES-RS — Protocolo de encaminhamento: Otorrinolaringologia adulto, 2023" },
    { id: "neu-aine-omeprazol", t: "AINE oral + omeprazol na artrose com história gastrointestinal",
      d: "Artrose de joelho ou quadril: AINE oral na menor dose individual efetiva pelo menor tempo; se o uso passar de cinco dias em quem tem história de evento gastrointestinal, associar omeprazol em jejum.",
      f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024" },
    { id: "neu-dor-neuropatica-duas-classes", t: "Dois fármacos de classes diferentes na dor neuropática que persiste (tricíclico + gabapentinoide ou IRSN)",
      d: "Dor que persiste com um fármaco em dose otimizada: associar um segundo de classe diferente. O tratamento clínico otimizado que justifica encaminhar ao Tratamento da Dor é o uso de pelo menos dois fármacos em dose otimizada.",
      f: "TelessaúdeRS-UFRGS — Protocolo de encaminhamento para Tratamento da Dor, 2020" }
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
    { id: "tb-rifampicina-inducao", t: "Rifampicina + anticoncepcional hormonal, anticoagulante oral, inibidor de protease, enalapril, metadona, beta-agonista, teofilina, propafenona ou quinidina", d: "MECANISMO: a rifampicina é indutora enzimática potente (citocromo P450) e reduz o nível sérico desses fármacos. DESFECHO: perda de efeito — gravidez não planejada durante o tratamento de TB, anticoagulação insuficiente, falha do antirretroviral, pressão descontrolada. O Manual manda evitar o uso concomitante: anticoncepcional, trocar por outro método; inibidor de protease ou dolutegravir, a referência troca a rifampicina por rifabutina no tratamento e usa isoniazida na ILTB; metadona, avaliar ajuste de dose e evitar. Antiácido junto reduz a absorção da rifampicina: separar. Cetoconazol e fluconazol: preferir outro agente. Corticoide, digital, barbitúrico e hipoglicemiante oral (no diabético, monitorar glicemia e considerar insulina) também caem: avaliar ajuste e monitorar.", f: "MS — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019" },
    { id: "car-sacubitril-ieca",
      t: "Sacubitril-valsartana + IECA (ou + outro BRA)",
      d: "MECANISMO: o sacubitril inibe a neprilisina e impede a degradação de substâncias vasodilatadoras; o IECA também reduz a degradação de vasodilatadores (bradicinina) e a valsartana já bloqueia o eixo da angiotensina — a soma acumula o efeito vasodilatador e o bloqueio duplo (inferência a partir do que o PCDT descreve de cada um). DESFECHO: angioedema e perda de função renal. O PCDT proíbe o uso conjunto e manda esperar pelo menos 36 horas depois da última dose de IECA para começar o sacubitril-valsartana.",
      f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 14 },
    { id: "car-estatina-genfibrozila",
      t: "Estatina + genfibrozila",
      d: "MECANISMO: estatinas e fibratos causam miopatia, e a genfibrozila inibe a glucuronidação das estatinas, o que aumenta a concentração delas (mecanismo descrito pela SBC). DESFECHO: rabdomiólise. O PCDT diz que a genfibrozila nunca deve ser administrada junto com estatina; se precisar de fibrato com estatina, outro fibrato (fenofibrato), tomado pela manhã, longe da estatina.",
      f: "MS — PCDT Dislipidemia: prevenção de eventos cardiovasculares e pancreatite, Portaria Conjunta nº 8, 2019", p: 10 },
    { id: "car-sinvastatina-macrolideo",
      t: "Sinvastatina (ou atorvastatina) + claritromicina ou eritromicina",
      d: "MECANISMO: claritromicina e eritromicina são os inibidores mais potentes do CYP3A4, a enzima que metaboliza sinvastatina e atorvastatina; a concentração da estatina sobe. DESFECHO: miotoxicidade. A SBC manda evitar a associação; a azitromicina pode ser usada com todas as estatinas, e rosuvastatina, fluvastatina e pravastatina não são afetadas de modo significativo.",
      f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
    { id: "dig-daa-indutores",
      t: "Sofosbuvir + daclatasvir + rifampicina, rifabutina, rifapentina, carbamazepina, oxcarbazepina, fenitoína ou fenobarbital",
      d: "MECANISMO: interação impeditiva com os antivirais de ação direta — o PCDT proíbe o uso conjunto com todos os " +
         "DAA disponíveis; o detalhe farmacocinético está no material suplementar de interações, não conferido. " +
         "Desfecho: falha do tratamento. Conduta: o especialista decide trocar ou suspender o outro fármaco antes de " +
         "começar o DAA.",
      f: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026" },
    { id: "dig-daa-amiodarona",
      t: "Sofosbuvir + daclatasvir + amiodarona",
      d: "MECANISMO: interação potencialmente grave entre a amiodarona e os antivirais da hepatite C do SUS, descrita " +
         "no PCDT; o detalhe está no material suplementar, não conferido. Desfecho: arritmia cardíaca. Conduta: trocar " +
         "o antiarrítmico sempre que possível; quem usa amiodarona vai ao serviço especializado.",
      f: "MS — PCDT Hepatite C e Coinfecções, Portaria SCTIE/MS nº 39, 2026" },
    { id: "resp-saba-isolado-asma",
      t: "Salbutamol (SABA) sozinho, sem corticoide inalatório, na asma do adolescente, do adulto e da criança de 6 a 11 anos",
      d: "MECANISMO: o SABA alivia o broncoespasmo em minutos e não trata a inflamação das vias aéreas; o alívio esconde a " +
         "piora, e o uso isolado ou excessivo aumenta o risco de exacerbação grave e de morte. Desfecho: o PCDT Asma 2026 não " +
         "recomenda tratar asma só com SABA — a partir de 6 anos todo paciente recebe CI (beclometasona com o salbutamol, ou formoterol + budesonida). " +
         "Na criança de até 5 anos o PCDT é outro: etapa 1 é SABA sob demanda com curso intermitente de CI no início das viroses; " +
         "CI diário quando há sintomas mais de 2 vezes por semana ou exacerbação grave no último ano.",
      f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
    { id: "resp-laba-sem-ci-asma",
      t: "LABA ou LAMA (formoterol, salmeterol, umeclidínio + vilanterol, tiotrópio + olodaterol) sem corticoide inalatório na asma ou na sobreposição asma-DPOC",
      d: "MECANISMO: o broncodilatador de longa ação controla o sintoma sem controlar a inflamação, que progride sem aviso. " +
         "Desfecho: risco aumentado de exacerbação grave e de morte; na asma e na sobreposição asma-DPOC, LABA e LAMA vão sempre junto do CI (PCDT Asma, Quadro 5).",
      f: "MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026" },
    { id: "resp-ci-isolado-dpoc",
      t: "Corticoide inalatório sozinho (beclometasona ou budesonida) na DPOC",
      d: "MECANISMO: na DPOC o CI sozinho não altera o declínio do VEF1 nem reduz a mortalidade; a base do " +
         "tratamento é o broncodilatador de longa ação. Desfecho: paciente sem tratamento eficaz e com mais risco de " +
         "pneumonia; o CI só entra na terapia tripla, com eosinófilos altos ou exacerbações frequentes.",
      f: "MS — PCDT Doença Pulmonar Obstrutiva Crônica, Portaria Conjunta SAES/SCTIE nº 29, 2025" },
    { id: "neu-aine-aas-baixa-dose", t: "AINE (ibuprofeno, naproxeno) + AAS em dose baixa contínua",
      d: "MECANISMO: o AAS é antiagregante plaquetário e aumenta o risco de sangramento; o AINE causa úlcera, sangramento e perfuração gastrointestinal — os riscos se somam. Desfecho: na artrose de joelho ou quadril, o PCDT manda paracetamol ou dipirona e evitar AINE seletivo ou não seletivo; fora da artrose, o AAS é fator de risco gastrointestinal do AINE (TSRS 2022) e, no idoso, o Consenso PIM manda evitar AINE crônico com antiplaquetário.",
      f: "MS — PCDT Dor Crônica, Portaria Conjunta SAES/SAPS/SECTICS nº 1, 2024" },
    { id: "neu-aine-anticoagulante", t: "AINE (ibuprofeno, naproxeno) + anticoagulante",
      d: "MECANISMO: o AINE causa úlcera, sangramento e perfuração gastrointestinal, e o anticoagulante impede a hemostasia — o sangramento fica mais provável e mais grave. Desfecho: o protocolo do MS lista o uso concomitante de anticoagulante como contraindicação ao AINE; no idoso, o Consenso PIM manda evitar o AINE crônico com anticoagulante.",
      f: "MS — Protocolos da Atenção Básica: Saúde das Mulheres, 2016" },
    { id: "ap1-isrs-tamoxifeno", t: "Paroxetina ou fluoxetina + tamoxifeno",
      d: "MECANISMO: a paroxetina (inibidor potente) e a fluoxetina (moderado a potente) bloqueiam o CYP2D6, que converte o tamoxifeno, um pró-fármaco, no metabólito ativo. Desfecho: menos efeito do tamoxifeno, com mais recidiva e mortalidade por câncer de mama. Na mulher em tamoxifeno, a venlafaxina inibe o CYP2D6 só fracamente.",
      f: "Maudsley Prescribing Guidelines, 15ª ed., 2025", p: 401 }
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
    { id: "han-corticoide-limiar-bcg", t: "Corticoide — o limiar que contraindica revacinar BCG no contato de hanseníase", d: "Contato de hanseníase: não revacinar BCG em quem usa prednisona (ou equivalente) de 2 mg/kg/dia ou mais até 10 kg, ou de 20 mg/dia ou mais acima de 10 kg, por mais de duas semanas (p. 102).", f: "MS — PCDT Hanseníase, Portaria SCTIE nº 67, 2022", p: 102 },
    { id: "car-losartana-ic-has",
      t: "Losartana — na IC o alvo passa do teto da HAS",
      d: "Na HAS a faixa vai de 50 a 100 mg por dia (Quadro de doses do PCDT de HAS). Na ICFEr a losartana começa com 25 mg 1 vez ao dia e o alvo é 150 mg ao dia, em dose única ou dividida em 2 tomadas (Quadro 5 do PCDT de IC). Parar no teto da HAS deixa a IC subtratada; usar o alvo da IC num hipertenso sem IC é dose acima da prevista.",
      f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 },
    { id: "car-sinvastatina-bcc-amiodarona",
      t: "Sinvastatina com anlodipino, verapamil ou amiodarona — teto de 20 mg/dia",
      d: "MECANISMO: anlodipino, verapamil e amiodarona inibem o CYP3A4, que metaboliza a sinvastatina; a exposição sobe. DESFECHO: miopatia e rabdomiólise. Teto da sinvastatina: 20 mg/dia (SBC, Tabela 8.2), contra os 80 da Tabela 1 do PCDT.",
      f: "SBC — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose, Arq Bras Cardiol, 2025" },
    { id: "car-hidralazina-ic-has",
      t: "Hidralazina — na IC o alvo passa do máximo da HAS",
      d: "Na HAS o máximo é 200 mg/dia (PCDT de HAS). Na ICFEr, com nitrato, o alvo é 50 a 100 mg 3 vezes ao dia (Quadro 5 do PCDT de IC). Fora da ICFEr, o teto é o da HAS.",
      f: "MS — PCDT Insuficiência Cardíaca com Fração de Ejeção Reduzida, Portaria Conjunta SAES/SECTICS nº 10, 2024", p: 16 }
  ]
};
