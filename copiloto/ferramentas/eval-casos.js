/* Casos de referência do eval — as duas consultas reais de 05/08/2026.
 *
 * NÃO É PRONTUÁRIO E NÃO SUBSTITUI FONTE. Isto existe para medir o modelo, não
 * para atender ninguém. Anonimizado: idade, sexo, peso, estatura e queixa, sem
 * nome, sem data e sem unidade.
 *
 * `med` são as medidas como o médico as digitaria nos campos da antropometria.
 * Os escores NÃO ficam escritos aqui: o eval roda a camada determinística real
 * sobre eles (montarDeterministica), então o que o modelo recebe é exatamente o
 * que o app produziria. Escore escrito à mão aqui viraria mais uma cópia para
 * divergir.
 */

export const CASOS = [
  {
    id: "ex1",
    nota:
      "Paciente, 7 anos, feminino. QP: Feridas aquosas no nariz, mao e perna, ha 7 dias. " +
      "Relata que estoura em media em 1 dia. Sem cartao de vacina presente. Teve febre ha 2 " +
      "semanas T: 37/38 C. Em uso de nistatina na regiao das feridas. " +
      "Medicamentos: dipirona, antialergico (budesonida).",
    /* Sem peso nem estatura: é o caso da terceira categoria. A conduta pede dose
       e o dado não existe — o certo não é calcular nem calar, é cobrar o peso. */
    med: { sexo: "f", meses: 84 },
    espera: {
      /* GABARITO CONFIRMADO pelo Eric em 05/08: era impetigo. Ele atendeu a
         paciente. Não afrouxar para aceitar varicela — o Haiku 4.5 responde
         varicela em 3 de 5 rodadas e justifica com pródromo de 2 semanas, sendo
         que o da varicela é de 1 a 2 dias. É erro clínico do modelo. */
      hipotese: /impetigo|piodermite/i
    }
  },
  {
    id: "ex2",
    nota:
      "Paciente, 7 meses, feminina. Queixa de sintomas gripais, ha 3 dias. Relata coriza e " +
      "espirros. Nega febre, perda de apetite, diarreia, vomito. Um pouco mais irritada que o " +
      "cotidiano.\nIdade: 8 meses  Peso 8,650kg  Altura: 76 cm.",
    /* 8 meses é o que o médico digitaria; a nota diz 7 no topo, e a camada
       determinística aponta a divergência sozinha. */
    med: { sexo: "f", meses: 8, peso: 8.650, est: 76 },
    espera: { hipotese: /resfriado|ivas|via[s]? a[eé]rea|rinofaringite|viral/i }
  }
];
