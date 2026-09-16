/* Exame do Estado Mental — conteúdo do painel "EEM".
 *
 * Só dados. O renderer vive no index.html, o mesmo de "Como anotar".
 *
 * Por que isto existe: o exame físico do psiquiatra é o EEM, e ele falha de um
 * jeito específico — o examinador VÊ o achado e não tem a palavra para escrevê-lo.
 * "Paciente agitado" cobre acatisia, mania, delirium e abstinência, que têm
 * condutas opostas. Por isso cada domínio aqui traz o TERMO e o que ele sugere,
 * não uma lista de perguntas: o que falta na beira do leito é vocabulário
 * descritivo, não roteiro.
 *
 * Fonte base: Dalgalarrondo P. Psicopatologia e Semiologia dos Transtornos
 * Mentais. 3ª ed. Porto Alegre: Artmed, 2019 — a semiologia brasileira padrão.
 * Onde um achado tem consequência de conduta datada em protocolo do MS, o item
 * carrega a própria fonte.
 */

var EEM = {
  atualizado: "2026-09-16",

  /* Sempre aberto: é a ordem que se esquece quando o paciente é difícil. */
  modelo: {
    titulo: "O EEM tem uma ordem, e ela não é opcional",
    partes: [
      { rot: "OBSERVA",
        txt: "Aparência, atitude, consciência, psicomotricidade e afeto são colhidos " +
             "olhando, antes da primeira pergunta. Quem começa perguntando perde isso." },
      { rot: "TESTA",
        txt: "Orientação, atenção, memória e inteligência exigem tarefa. Não dá para " +
             "inferir de conversa fluida — paciente orientado e paciente confabulando " +
             "conversam igual." },
      { rot: "ESCUTA",
        txt: "Pensamento, linguagem e sensopercepção saem da fala espontânea. Deixe " +
             "falar dois minutos sem interromper antes de dirigir." },
      { rot: "FECHA",
        txt: "Consciência do eu, juízo crítico e prospecção. O juízo crítico decide " +
             "internação e capacidade; a prospecção é onde mora o risco de suicídio. " +
             "Nunca termine o EEM sem os dois." }
    ]
  },

  secoes: [
    {
      rot: "1. Aparência, atitude e contato",
      nota: "Colhido da porta até a cadeira. É o único domínio que se perde se você olhar para a tela primeiro.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Cuidado pessoal / autonegligência",
          d: "Higiene, roupa, odor, cabelo. Descuido marcado aponta depressão grave, esquizofrenia com sintomas negativos, demência ou uso de substância — e é dado objetivo, não julgamento estético." },
        { t: "Idade aparente maior que a real",
          d: "Sugere doença crônica, uso pesado de substância ou depressão de longa data." },
        { t: "Atitude cooperativa",
          d: "Aceita o exame, responde ao que se pergunta. É a linha de base." },
        { t: "Atitude arredia / desconfiada / hostil",
          d: "Esquiva do olhar, respostas curtas, vigilância do ambiente. Frequente em quadro paranoide — e a conduta é reduzir ameaça (distância, porta livre, sem plateia), não confrontar." },
        { t: "Atitude querelante",
          d: "Exige, reclama, ameaça processar. Comum em transtorno delirante persecutório e em personalidade paranoide." },
        { t: "Atitude sedutora ou desinibida",
          d: "Intimidade precoce, piada sexual, invasão de espaço. Sugere mania, intoxicação, lesão frontal ou personalidade histriônica." },
        { t: "Contato sintônico × contato pragmático frio",
          d: "Sintônico: você sente que há alguém do outro lado, o afeto é ressoado. Frio ou bizarro é o achado clássico do espectro esquizofrênico e é descritível mesmo sem delírio nenhum." }
      ]
    },

    {
      rot: "2. Consciência — nível e lucidez",
      nota: "Primeiro domínio a examinar e primeiro a excluir. Consciência rebaixada ou flutuante derruba todo o resto do EEM: não se diagnostica transtorno primário em cima de delirium.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Vigil / lúcido",
          d: "Desperto, contato pleno, mantém a linha da conversa. É o pré-requisito do exame." },
        { t: "Obnubilação",
          d: "Lentificação leve, precisa de estímulo para sustentar atenção, responde com atraso. O grau mais fácil de perder porque parece só cansaço." },
        { t: "Torpor / sopor",
          d: "Só responde a estímulo vigoroso e volta a desligar. Emergência clínica." },
        { t: "Flutuação ao longo do dia",
          d: "Melhor de manhã, pior ao entardecer. É o marcador de delirium e vale mais que qualquer teste isolado — pergunte ao acompanhante, não ao paciente." },
        { t: "Estreitamento da consciência",
          d: "Campo reduzido a um foco (estado crepuscular, dissociativo, pós-ictal). O paciente age mas depois não recorda." },
        { t: "Regra de corte",
          d: "Início agudo + curso flutuante + desatenção = delirium até prova em contrário. Investigar causa orgânica ANTES de atribuir a quadro psiquiátrico ou a demência." }
      ]
    },

    {
      rot: "3. Orientação",
      nota: "Testa-se, não se presume. Perguntar direto, sem rodeio e sem pedir licença.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Alopsíquica — tempo",
          d: "Dia da semana, mês, ano, período do dia. É a primeira a se perder em qualquer causa orgânica." },
        { t: "Alopsíquica — espaço",
          d: "Onde estamos, que tipo de lugar é este, em que cidade. Perde-se depois do tempo." },
        { t: "Autopsíquica — quem é",
          d: "Nome, idade, quem é a pessoa que o acompanha. Perde-se por último; quando cai precocemente, pensar em quadro dissociativo ou simulação." },
        { t: "Desorientação × desatenção",
          d: "Paciente desatento erra a data porque não sustentou a pergunta; desorientado erra porque a informação não está lá. Testar atenção antes de concluir desorientação." }
      ]
    },

    {
      rot: "4. Atenção",
      nota: "Exige tarefa. Conversa fluida não mede atenção.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Como testar à beira do leito",
          d: "Meses do ano de trás para frente, ou soletrar MUNDO ao contrário, ou subtrair de 7 em 7 a partir de 100. Falha grosseira nesses testes é desatenção, não burrice." },
        { t: "Hipoprosexia",
          d: "Atenção globalmente reduzida. Depressão, delirium, demência, intoxicação, quadro ansioso grave." },
        { t: "Hiperprosexia / hipervigilância",
          d: "Atenção aumentada e dispersa, varre o ambiente. Mania, intoxicação por estimulante, paranoia, TEPT." },
        { t: "Distraibilidade",
          d: "Qualquer ruído desvia o curso. Marcador forte de mania e de TDAH." },
        { t: "Desatenção na mania × no TDAH",
          d: "Na mania é episódica e vem com humor elevado e menos sono; no TDAH está presente desde a infância e é contínua, não em surtos." }
      ]
    },

    {
      rot: "5. Memória",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Imediata / de trabalho",
          d: "Repetir 3 palavras ou uma sequência de dígitos na hora. Depende de atenção — se a atenção caiu, este teste não vale." },
        { t: "Recente (anterógrada)",
          d: "As mesmas 3 palavras após 3 a 5 minutos de distração. É a que cai primeiro na doença de Alzheimer e em delirium." },
        { t: "Remota (retrógrada)",
          d: "História de vida, eventos antigos. Preservada por muito tempo na Alzheimer — paciente conta a infância em detalhe e não sabe o que almoçou." },
        { t: "Confabulação",
          d: "Preenche a lacuna com narrativa plausível, sem intenção de mentir. Clássica de Korsakoff (carência de tiamina no alcoolismo)." },
        { t: "Queixa de memória com testes normais",
          d: "Em idoso deprimido, a queixa costuma ser MAIOR que o déficit; na demência é o contrário — quem se queixa é a família. Inverter isso é o erro mais comum." }
      ]
    },

    {
      rot: "6. Sensopercepção",
      nota: "Perguntar direto não induz sintoma. Quem esconde alucinação o faz por medo de internação, não por falta de oportunidade.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Como perguntar",
          d: "Você já ouviu alguém chamar seu nome sem ter ninguém? Já viu coisa que os outros não viram? Sem eufemismo e sem tom de acusação." },
        { t: "Alucinação auditiva verbal",
          d: "Vozes que comentam, xingam ou conversam entre si. A mais típica da esquizofrenia. Perguntar sempre se a voz MANDA fazer algo." },
        { t: "Alucinação de comando",
          d: "Voz que ordena. É red flag de risco imediato para si ou para terceiro — muda a conduta na hora." },
        { t: "Alucinação visual",
          d: "Aponta causa orgânica até prova em contrário: delirium, demência de corpos de Lewy, intoxicação, abstinência. Visual isolada não é o padrão da esquizofrenia." },
        { t: "Alucinação tátil (zoopsia)",
          d: "Bichos na pele. Abstinência alcoólica e uso de cocaína/crack." },
        { t: "Ilusão",
          d: "Deformação de estímulo real (sombra vira vulto). Comum em delirium e em ansiedade intensa — não é o mesmo que alucinação." },
        { t: "Alucinação hipnagógica e hipnopômpica",
          d: "Ao adormecer e ao despertar. Podem ser fisiológicas; sozinhas não fecham psicose." }
      ]
    },

    {
      rot: "7. Pensamento — curso, forma e conteúdo",
      nota: "Três eixos independentes. Descrever os três separadamente é o que diferencia laudo de impressão.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "CURSO — acelerado / fuga de ideias",
          d: "Pula de tema em tema por associação sonora ou trivial, difícil interromper. Mania." },
        { t: "CURSO — lentificado",
          d: "Demora a responder, poucas ideias, latência longa. Depressão grave, hipotireoidismo, demência." },
        { t: "CURSO — bloqueio",
          d: "Para no meio da frase e perde o fio, sem fadiga que explique. Sugestivo de esquizofrenia." },
        { t: "FORMA — desagregação / afrouxamento associativo",
          d: "As frases não se ligam entre si; você entende as palavras e não o conjunto. Achado formal central da esquizofrenia." },
        { t: "FORMA — prolixidade / circunstancialidade",
          d: "Rodeia muito mas CHEGA lá. Não é desagregação — comum em epilepsia, demência incipiente e em personalidade obsessiva." },
        { t: "FORMA — tangencialidade",
          d: "Sai pela tangente e NÃO volta ao ponto." },
        { t: "CONTEÚDO — delírio persecutório",
          d: "Convicção de estar sendo perseguido, vigiado, envenenado. Irredutível à evidência — argumentar contra rompe o vínculo e não corrige." },
        { t: "CONTEÚDO — delírio de grandeza",
          d: "Poder, missão, riqueza, identidade especial. Mania e esquizofrenia." },
        { t: "CONTEÚDO — delírio de ruína, culpa ou negação de órgão",
          d: "Está falido, é culpado de tudo, o intestino apodreceu (Cotard). Depressão psicótica — risco de suicídio muito alto." },
        { t: "CONTEÚDO — ideia prevalente × delírio",
          d: "Na ideia prevalente a crença é extrema mas o paciente admite a possibilidade de estar errado. No delírio não há essa fresta." },
        { t: "CONTEÚDO — obsessão",
          d: "Ideia intrusiva, repetitiva, reconhecida como absurda e como PRÓPRIA, que gera angústia. É o que separa TOC de delírio." },
        { t: "CONTEÚDO — ideação suicida",
          d: "Investigar sempre, e nos cinco eixos: ideia, plano, meio disponível, tentativa prévia, suporte social." }
      ]
    },

    {
      rot: "8. Linguagem",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Volume, ritmo e latência",
          d: "Fala alta, rápida e difícil de interromper (pressão de discurso) sugere mania; fala baixa, lenta e com latência longa sugere depressão." },
        { t: "Mutismo",
          d: "Não fala, com aparelho fonador íntegro. Catatonia, depressão grave, quadro dissociativo — ou recusa deliberada." },
        { t: "Neologismo",
          d: "Palavra inventada com sentido privado. Esquizofrenia." },
        { t: "Ecolalia",
          d: "Repete o que o examinador diz. Catatonia, TEA, demência frontotemporal." },
        { t: "Disartria × afasia × desagregação",
          d: "Disartria é articular mal (orgânico/intoxicação); afasia é falha de linguagem com pensamento preservado (lesão focal — pedir neuro); desagregação é falha do pensamento com fala bem articulada. Confundir os três leva a conduta errada." }
      ]
    },

    {
      rot: "9. Afetividade e humor",
      nota: "Humor é o que o paciente relata sentir ao longo do tempo. Afeto é o que VOCÊ observa na consulta. Descrever os dois e a congruência entre eles.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Hipotimia",
          d: "Humor rebaixado. Descrever intensidade e há quanto tempo." },
        { t: "Hipertimia / humor elevado",
          d: "Eufórico, expansivo. Em mania frequentemente vem IRRITÁVEL em vez de alegre — irritabilidade não exclui mania, é apresentação comum." },
        { t: "Anedonia",
          d: "Perde o prazer no que gostava. Sintoma cardinal da depressão, junto com humor deprimido." },
        { t: "Embotamento afetivo",
          d: "Redução da expressividade: rosto pouco móvel, voz monótona. Sintoma negativo da esquizofrenia — e é o que mais se confunde com depressão." },
        { t: "Incongruência afetiva",
          d: "Ri ao contar tragédia. Esquizofrenia." },
        { t: "Labilidade afetiva",
          d: "Vira de choro a riso em minutos. Mania, personalidade borderline, lesão cerebral." },
        { t: "Disforia",
          d: "Mistura de irritação, tensão e mal-estar. Comum em abstinência e em episódio misto." },
        { t: "Ansiedade × angústia",
          d: "Ansiedade é antecipação apreensiva; angústia tem corpo junto (aperto no peito, nó na garganta). Vale registrar qual das duas o paciente descreve." }
      ]
    },

    {
      rot: "10. Psicomotricidade e volição",
      nota: "O domínio com maior consequência imediata de conduta, porque a agitação é o que chega na emergência.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Agitação psicomotora",
          d: "Descrever o QUE se vê, não só o rótulo: anda sem parar, gesticula, eleva a voz, ameaça. O rótulo sozinho não orienta conduta." },
        { t: "Acatisia",
          d: "Inquietação SUBJETIVA (não consegue ficar parado, alivia ao movimentar), surge dias após iniciar ou aumentar antipsicótico. A conduta é REDUZIR a dose — aumentar piora num ciclo vicioso." },
        { t: "Lentificação psicomotora",
          d: "Movimento e fala reduzidos. Depressão melancólica, catatonia, parkinsonismo medicamentoso." },
        { t: "Catatonia",
          d: "Imobilidade, mutismo, negativismo, catalepsia, flexibilidade cérea, ecopraxia. É emergência, tem tratamento próprio e é subdiagnosticada." },
        { t: "Distonia aguda",
          d: "Contração sustentada: torcicolo, crise oculógira, trismo. Aparece em horas a dias após antipsicótico. Assusta e é revertida com anticolinérgico." },
        { t: "Parkinsonismo medicamentoso",
          d: "Rigidez, bradicinesia, tremor de repouso, fácies em máscara. Semanas após antipsicótico." },
        { t: "Discinesia tardia",
          d: "Movimentos coreiformes de língua, boca e face, após uso prolongado. Pode ser irreversível — anticolinérgico PIORA." },
        { t: "Estereotipia e maneirismo",
          d: "Movimento repetitivo sem função, ou gesto bizarro e teatral. Esquizofrenia, TEA." },
        { t: "Abulia / hipobulia",
          d: "Redução da iniciativa e da vontade. Depressão e sintomas negativos — não é preguiça e não responde a cobrança." }
      ]
    },

    {
      rot: "11. Consciência do eu",
      nota: "Domínio que quase ninguém examina e que sustenta o diagnóstico de esquizofrenia.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Despersonalização",
          d: "Sente-se estranho a si mesmo, como se observasse de fora. Ansiedade grave, dissociação, uso de cannabis." },
        { t: "Desrealização",
          d: "O mundo parece irreal, de filme, com vidro no meio." },
        { t: "Vivências de influência / passividade",
          d: "Alguém controla seus movimentos, implanta ou rouba seus pensamentos, transmite o que ele pensa. Muito sugestivo de esquizofrenia — e não sai sem perguntar diretamente." },
        { t: "Perda dos limites do eu",
          d: "Não distingue onde termina ele e começa o outro. Psicose grave." }
      ]
    },

    {
      rot: "12. Juízo crítico (insight) e prospecção",
      nota: "As duas últimas coisas do EEM, e as duas que decidem conduta. Não termine sem elas.",
      fonte: "Dalgalarrondo, Psicopatologia e Semiologia dos Transtornos Mentais, 3ª ed., Artmed, 2019",
      itens: [
        { t: "Juízo crítico preservado",
          d: "Reconhece que está doente, que os sintomas são do adoecimento, e aceita tratar. Sustenta manejo ambulatorial." },
        { t: "Juízo crítico parcial",
          d: "Admite que algo está errado mas não atribui à doença. O cenário mais comum, e onde a negociação vale mais que o confronto." },
        { t: "Juízo crítico ausente",
          d: "Nega qualquer adoecimento. Somado a risco, é o que fundamenta internação involuntária — e tem de estar escrito no prontuário com o achado, não só com o rótulo." },
        { t: "Prospecção",
          d: "O que espera do futuro, que planos tem. Ausência total de projeção futura é achado de risco de suicídio, mesmo sem ideação declarada." },
        { t: "O que registrar",
          d: "Escreva o achado que sustenta a conclusão, não só a conclusão. Juízo crítico ausente sem a frase do paciente que mostra isso não se sustenta em revisão nem em juízo." }
      ]
    }
  ]
};
