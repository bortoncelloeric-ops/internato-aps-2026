/* Casos de referência do eval — as duas consultas reais de 05/08/2026.
 *
 * NÃO É PRONTUÁRIO E NÃO SUBSTITUI FONTE. Isto existe para medir o modelo, não
 * para atender ninguém. Os dados estão anonimizados: idade, sexo, peso, estatura
 * e queixa, sem nome, sem data e sem unidade.
 *
 * `deter` é o que a camada determinística já calculou e que entra no prompt como
 * FATO DADO — o modelo não recalcula nem discute. É a fronteira do desenho: o que
 * precisa estar certo é tabela, o que precisa de julgamento é modelo.
 */

export const CASOS = [
  {
    id: "ex1",
    nota:
      "Paciente, 7 anos, feminino. QP: Feridas aquosas no nariz, mao e perna, ha 7 dias. " +
      "Relata que estoura em media em 1 dia. Sem cartao de vacina presente. Teve febre ha 2 " +
      "semanas T: 37/38 C. Em uso de nistatina na regiao das feridas. " +
      "Medicamentos: dipirona, antialergico (budesonida).",
    /* Sem peso na nota. É o caso da terceira categoria: a conduta pede dose e o
       dado não existe. O certo não é calcular nem calar — é cobrar o peso. */
    deter: {
      lido: "idade 7 anos · feminino",
      falta: ["peso — sem ele não sai dose por peso nem IMC para idade",
              "estatura — sem ela não sai IMC para idade"],
      contradicoes: [],
      antropometria: null
    },
    espera: {
      hipotese: /impetigo/i,
      /* o achado que o ChatGPT acertou e que não se pode perder */
      pontos: [/nistatina/i,
      /* o achado que o ChatGPT PERDEU: budesonida é corticoide, não antialérgico */
               /budesonida|corticoid/i],
      /* o cartão de vacina ausente não pode sumir do DDx (ancoragem) */
      ddx: /varicela/i
    }
  },
  {
    id: "ex2",
    nota:
      "Paciente, 7 meses, feminina. Queixa de sintomas gripais, ha 3 dias. Relata coriza e " +
      "espirros. Nega febre, perda de apetite, diarreia, vomito. Um pouco mais irritada que o " +
      "cotidiano.\nIdade: 8 meses  Peso 8,650kg  Altura: 76 cm.",
    /* Escores conferidos contra as expanded tables da OMS lidas do .xlsx.
       A contradição de idade move a estatura de +3,05 para +3,76 — por isso ela
       entra no prompt como fato, e não como coisa a resolver depois. */
    deter: {
      lido: "idade 7 meses / 8 meses · peso 8,65 kg · 76 cm · feminino",
      falta: [],
      contradicoes: ["a nota traz 7 meses e 8 meses — divergem"],
      antropometria: {
        "peso para idade": "z +0,69 · P75 — Peso adequado para a idade",
        "estatura para idade": "z +3,05 · P99,9 — Estatura adequada para a idade",
        "IMC para idade": "z −1,33 · P9,2 — Eutrofia",
        "peso para estatura": "z −0,86 · P20 — Eutrofia (deitado)",
        alerta: "Fora de ±3 DP: estatura/idade +3,05. Conferir a medida e a idade antes de interpretar."
      }
    },
    espera: {
      hipotese: /resfriado|ivas|via[s]? a[eé]rea|rinofaringite|viral/i,
      pontos: [/7 meses|8 meses|idade/i],
      ddx: null
    }
  }
];
