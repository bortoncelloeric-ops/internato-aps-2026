/* Como anotar a consulta — conteúdo do painel "Como anotar".
 *
 * Só dados. O renderer vive no index.html, como o das queixas.
 *
 * Por que isto está dentro do app: a nota que o médico digita é a entrada tanto
 * do "Gerar guia" daqui quanto do prontuário que o Copiloto APS devolve. As duas
 * camadas falham do mesmo jeito quando a nota não diz o que foi examinado — e é
 * essa disciplina que este painel ensina. Ver a nota de desenho no topo de
 * guia-contrato.js: modelo de linguagem preenche lacuna com plausibilidade, e
 * exame físico normal é a lacuna mais fácil de preencher.
 */

var ANOTACAO = {
  atualizado: "2026-09-05",

  /* Sempre aberto: é o que se esquece na hora. */
  modelo: {
    titulo: "O registro tem quatro partes",
    partes: [
      { rot: "HMA",
        txt: "Queixa e há quanto tempo. Caracterização. O que já tentou e o que usa. " +
             "O que a pessoa acha que tem e o que teme. Contexto que muda a conduta. " +
             "Fecha com as negativas — só as que você perguntou." },
      { rot: "EXAME FÍSICO",
        txt: "Sinais vitais como número, na primeira linha. Depois só os segmentos " +
             "que você examinou de fato." },
      { rot: "SD",
        txt: "Duas a quatro hipóteses, cada uma terminando em ponto de interrogação. " +
             "CIAP-2 embaixo. CID-10 só quando o diagnóstico fecha." },
      { rot: "CONDUTA",
        txt: "Não farmacológica primeiro. Farmacológica com a marca de conferência. " +
             "Retorno com prazo. Sinais de alarme em linguagem de leigo." }
    ]
  },

  secoes: [

    { id: "quando",
      rot: "Quando usar, na ordem da consulta",
      itens: [
        { t: "Durante, com o paciente na sala",
          d: "Você anota; a ferramenta fica fora. O trabalho aqui é colher — colhendo " +
             "como quem sabe que outra cabeça vai ler a nota sem ter estado na sala." },
        { t: "Últimos 30 segundos, antes de liberar",
          d: "Passa os olhos nas seis travas. É o único momento em que dá para " +
             "consertar uma lacuna sem custo." },
        { t: "Depois, entre pacientes",
          d: "Cola a nota crua. Sem formatar, sem passar a limpo. Formatar é trabalho " +
             "da ferramenta; passar a limpo antes só apaga o que o paciente falou." }
      ] },

    { id: "caderno",
      rot: "O que não pode faltar na nota",
      itens: [
        { t: "Iniciais, número do prontuário e idade",
          d: "É o que permite reconhecer a pessoa num retorno. Nome completo, CPF, CNS, " +
             "endereço e telefone não entram: o prontuário identificado é o e-SUS." },
        { t: "A queixa nas palavras dele",
          d: "\"Uma agulhada que sobe pro peito\" carrega o que \"dor torácica atípica\" apaga. " +
             "Anote entre aspas antes de traduzir." },
        { t: "Início, localização, irradiação, caráter, intensidade, melhora, piora, associados",
          d: "É daqui que saem os discriminadores entre as hipóteses. História rala " +
             "devolve hipótese rala." },
        { t: "O que ele acha que tem e o que teme",
          d: "Muda a conduta e muda a conversa. Quem veio com dor de cabeça temendo tumor " +
             "não sai satisfeito com \"é tensional\" — sai satisfeito quando o medo é nomeado." },
        { t: "O que a queixa está impedindo",
          d: "Trabalho, sono, cuidar de alguém. Separa incômodo de incapacidade." },
        { t: "Com quem mora, quem cuida de quem, vínculo com o ACS",
          d: "Sem isso a conduta sai genérica. Com isso entram busca ativa, divisão de " +
             "tarefa e sobrecarga de cuidador." },
        { t: "Sinais vitais como número",
          d: "PA, FC, FR, Tax, SatO₂, peso. Impressão não vira número: \"PA parecia alta\" " +
             "fica entre aspas e vai para as lacunas, nunca vira 150/95." },
        { t: "Só o que você examinou — e escreva que não examinou o resto",
          d: "Segmento não examinado não entra no registro, nem como normal. Escrever " +
             "\"não examinei o resto\" é informação útil, não confissão." },
        { t: "No retorno: o que foi feito e se ele tomou mesmo",
          d: "Falha terapêutica é falha de adesão até prova em contrário. Sem esse dado " +
             "se escala tratamento em cima de remédio que nunca foi tomado." },
        { t: "No retorno: é a terceira consulta pela mesma queixa?",
          d: "Padrão de repetição é achado clínico por si só." }
      ] },

    { id: "travas",
      rot: "As seis travas da receita",
      nota: "Faltando qualquer uma, a posologia não fecha e a receita volta com lacuna. " +
            "São as que valem conferir com o paciente ainda na sala.",
      itens: [
        { t: "Peso",
          d: "Obrigatório em criança e em qualquer dose por quilo." },
        { t: "Alergia medicamentosa",
          d: "Perguntada, não presumida." },
        { t: "Gestação, DUM ou possibilidade de gravidez",
          d: "Muda antibiótico, analgésico e antidepressivo. Em mulher em idade fértil, sempre." },
        { t: "Idade",
          d: "Criança, gestante, lactante e idoso frágil saem das faixas de dose de adulto." },
        { t: "Medicações em uso",
          d: "Inclusive as que ele toma por conta. É o que evita AINE sobre anti-hipertensivo." },
        { t: "Função renal, quando o fármaco pedir",
          d: "Nitrofurantoína, AINE em hipertenso, metformina. Sem o exame, registre que não tem." }
      ] },

    { id: "nota",
      rot: "Como escrever a nota crua",
      nota: "Telegráfico serve. Português torto serve. Sem acento serve. " +
            "O que não serve é apagar o que o paciente disse para caber num formato.",
      exemplo:
        "M.R.S., 54a, F, pront. 8812.\n" +
        "Dor lombar ha 5 dias, comecou depois de carregar caixas na mudanca.\n" +
        "Piora ao levantar da cadeira, melhora deitada.\n" +
        "\"achei que fosse pedra no rim\" - tem medo de ser rim.\n" +
        "Nega febre, perda de peso, alteracao urinaria ou de fezes. Nega trauma.\n" +
        "Tomou dipirona de casa, ajudou pouco.\n" +
        "HAS, losartana 50mg 1x/dia. Nega alergia. Nao gestante (menopausa ha 3a).\n" +
        "Mora com marido, cuida da mae acamada - nao consegue parar de levantar peso.\n" +
        "\n" +
        "PA 148/88. FC 78. Nao pesei.\n" +
        "Olhei so a coluna: dor a palpacao paravertebral lombar bilateral,\n" +
        "sem dor sobre processo espinhoso. Lasegue negativo bilateral.\n" +
        "Nao examinei o resto.",
      itens: [
        { t: "Três linhas fazem o trabalho",
          d: "O medo entre aspas, o \"não pesei\" e o \"não examinei o resto\". São elas que " +
             "fazem a saída ser honesta em vez de plausível." }
      ] },

    { id: "volta",
      rot: "O que volta, e o que fazer com cada parte",
      itens: [
        { t: "1. Registro para o prontuário",
          d: "Bloco em caixa alta, nas quatro partes. É o único que vai para o e-SUS. " +
             "Linha de bloqueio acima do bloco é para você, não copie junto." },
        { t: "2. Hipóteses",
          d: "Com o que sustenta, o que enfraquece e o discriminador. O discriminador é a " +
             "sua pergunta do próximo encontro. Mais o bloco do que não pode passar." },
        { t: "3. Exames",
          d: "Cada um com a pergunta que responde. A seção \"não pedir\" é obrigatória e é " +
             "a que protege da cascata — leia ela primeiro." },
        { t: "4. Conduta",
          d: "Não farmacológica antes da receita. Toda dose com a marca de conferência e a " +
             "procedência. Retorno com prazo e com o que reavaliar." },
        { t: "5. Lacunas",
          d: "Não cole em lugar nenhum. É a sua lista: o que faltou perguntar e o que " +
             "registrar no próximo encontro." }
      ] },

    { id: "armadilhas",
      rot: "Armadilhas",
      itens: [
        { t: "Toda dose sai marcada para conferência",
          d: "A marca significa conferir no REMUME ou no protocolo local antes do receituário. " +
             "Ela não sai da minuta sozinha." },
        { t: "A procedência da linha muda o peso dela",
          d: "[cola] é fonte pessoal sem revisão formal, com erro conhecido. [protocolo] é " +
             "fonte oficial. Confira as duas; desconfie mais da primeira." },
        { t: "Algumas entradas são recusadas de propósito",
          d: "Violência sexual, candidíase oral e o corticoide inalatório da asma têm erro " +
             "na fonte e estão em quarentena. Se houver recusa com motivo, o certo é o protocolo." },
        { t: "Não existe dose pediátrica na cola",
          d: "A fonte é de adulto. Em criança volta o esquema com lacuna para preencher no " +
             "protocolo pediátrico." },
        { t: "O documento é seu",
          d: "O que volta é minuta. Quem assina é você, sob supervisão do preceptor." }
      ] }

  ]
};
