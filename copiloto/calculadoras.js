/* Copiloto Clínico APS — registro de calculadoras.
 *
 * REGRA DE CORTE (não afrouxar sem discutir):
 * Só entra calculadora de aritmética pura sobre fórmula publicada inequívoca,
 * cujo resultado seja uma MEDIDA ou uma CLASSIFICAÇÃO.
 * Escore cujo resultado implique limiar de TRATAMENTO fica de fora até haver
 * fonte brasileira datada e conferida. Calculadora errada é pior que nenhuma,
 * porque parece autoridade.
 *
 * Fora por essa regra, hoje: risco CV (SBC/PREVENT/Framingham), FINDRISC,
 * CHA2DS2-VASc, HAS-BLED, FRAX, AUDIT-C.
 *
 * Campo: {id, rot, un?, tipo:"num"|"opt"|"data", opts?, min?, max?, passo?}
 * calc(v) devolve número (usa `faixas`) ou string (renderiza direto).
 * faixas: [limiteInferior, rótulo, cor] em ordem decrescente; pega a 1ª que bate.
 */

const CALCS = [];

/* Escala Likert compartilhada por PHQ-9 e GAD-7 (mesma máquina, sem motor novo). */
const L4 = [
  [0, "Nenhum dia"],
  [1, "Vários dias"],
  [2, "Mais da metade dos dias"],
  [3, "Quase todos os dias"]
];

const likert = (id, rot) => ({ id, rot, tipo: "opt", opts: L4 });
const soma = v => Object.keys(v).reduce((s, k) => s + Number(v[k]), 0);

CALCS.push({
  id: "imc",
  nome: "IMC",
  un: "kg/m²",
  campos: [
    { id: "peso", rot: "Peso", un: "kg", tipo: "num", min: 1, max: 400, passo: "0.1" },
    { id: "alt", rot: "Altura", un: "m", tipo: "num", min: 0.4, max: 2.5, passo: "0.01" }
  ],
  calc: v => v.peso / (v.alt * v.alt),
  faixas: [
    [40, "Obesidade grau III", "red"],
    [35, "Obesidade grau II", "red"],
    [30, "Obesidade grau I", "amb"],
    [25, "Sobrepeso", "amb"],
    [18.5, "Eutrofia", "acc"],
    [0, "Baixo peso", "amb"]
  ],
  fonte: "OMS — classificação de IMC para adultos.",
  nota: "Não se aplica a crianças, gestantes ou atletas. Circunferência abdominal acrescenta informação que o IMC não captura."
});

CALCS.push({
  id: "ckdepi",
  nome: "TFG — CKD-EPI 2021",
  un: "mL/min/1,73 m²",
  campos: [
    { id: "cr", rot: "Creatinina", un: "mg/dL", tipo: "num", min: 0.1, max: 20, passo: "0.01" },
    { id: "idade", rot: "Idade", un: "anos", tipo: "num", min: 18, max: 120, passo: "1" },
    { id: "sexo", rot: "Sexo", tipo: "opt", opts: [["f", "Feminino"], ["m", "Masculino"]] }
  ],
  calc: v => {
    const f = v.sexo === "f";
    const k = f ? 0.7 : 0.9;
    const a = f ? -0.241 : -0.302;
    return 142
      * Math.pow(Math.min(v.cr / k, 1), a)
      * Math.pow(Math.max(v.cr / k, 1), -1.200)
      * Math.pow(0.9938, v.idade)
      * (f ? 1.012 : 1);
  },
  faixas: [
    [90, "G1 — normal ou alta", "blu"],
    [60, "G2 — redução leve", "blu"],
    [45, "G3a — leve a moderada", "amb"],
    [30, "G3b — moderada a grave", "amb"],
    [15, "G4 — grave", "red"],
    [0, "G5 — falência renal", "red"]
  ],
  fonte: "Inker LA et al. NEJM 2021;385:1737 (CKD-EPI 2021, sem coeficiente de raça). Estágios: KDIGO.",
  nota: "Estagiamento KDIGO completo exige albuminúria e cronicidade ≥3 meses — a TFG sozinha não estadia. Não vale em lesão renal aguda, gestação, amputação ou extremos de massa muscular."
});

CALCS.push({
  id: "dpp",
  nome: "DPP e idade gestacional (Näegele)",
  campos: [
    { id: "dum", rot: "Data da última menstruação", tipo: "data" }
  ],
  calc: v => {
    const [y, m, d] = v.dum.split("-").map(Number);
    /* Näegele é SEQUENCIAL: soma 7 dias, DEPOIS volta 3 meses, DEPOIS soma 1 ano.
       Fazer tudo numa Date.UTC só erra quando o dia estoura o mês (DUM 31/12 dava
       08/10 em vez de 07/10), porque o estouro cai no mês errado. */
    const mais7 = new Date(Date.UTC(y, m - 1, d + 7));
    const dpp = new Date(Date.UTC(
      mais7.getUTCFullYear() + 1, mais7.getUTCMonth() - 3, mais7.getUTCDate()
    ));
    const dum = Date.UTC(y, m - 1, d);
    const hoje = new Date();
    const hojeUTC = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const dias = Math.floor((hojeUTC - dum) / 86400000);
    const br = dpp.toISOString().slice(0, 10).split("-").reverse().join("/");
    if (dias < 0) return "DPP " + br + " — DUM está no futuro, conferir a data";
    return "DPP " + br + " · IG hoje: " + Math.floor(dias / 7) + " semanas e " + (dias % 7) + " dias";
  },
  fonte: "Regra de Näegele. MS — Caderno de Atenção Básica 32 (pré-natal de baixo risco).",
  nota: "Vale para ciclo regular de 28 dias e DUM confiável. Ultrassonografia precoce prevalece sobre a DUM quando há divergência."
});

CALCS.push({
  id: "phq9",
  nome: "PHQ-9 — sintomas depressivos",
  intro: "Nas últimas 2 semanas, com que frequência a pessoa foi incomodada por:",
  campos: [
    likert("q1", "Pouco interesse ou prazer em fazer as coisas"),
    likert("q2", "Sentir-se para baixo, deprimida ou sem perspectiva"),
    likert("q3", "Dificuldade para pegar no sono, dormir continuamente ou dormir demais"),
    likert("q4", "Sentir-se cansada ou com pouca energia"),
    likert("q5", "Falta de apetite ou comer demais"),
    likert("q6", "Sentir-se mal consigo mesma, um fracasso, ou ter decepcionado a família"),
    likert("q7", "Dificuldade de concentração"),
    likert("q8", "Lentidão para se mover ou falar, ou o oposto: agitação e inquietação"),
    likert("q9", "Pensar em se ferir de alguma maneira ou que seria melhor estar morta")
  ],
  calc: soma,
  faixas: [
    [20, "Depressão grave", "red"],
    [15, "Moderadamente grave", "red"],
    [10, "Moderada", "amb"],
    [5, "Leve", "amb"],
    [0, "Mínima", "acc"]
  ],
  alerta: v => Number(v.q9) > 0
    ? "Item 9 positivo. Avaliar risco de suicídio AGORA, antes de encerrar a consulta."
    : null,
  fonte: "Kroenke K, Spitzer RL, Williams JBW. J Gen Intern Med 2001;16:606.",
  nota: "É instrumento de rastreio e acompanhamento, não de diagnóstico. A pontuação não substitui a entrevista clínica."
});

CALCS.push({
  id: "gad7",
  nome: "GAD-7 — sintomas ansiosos",
  intro: "Nas últimas 2 semanas, com que frequência a pessoa foi incomodada por:",
  campos: [
    likert("q1", "Sentir-se nervosa, ansiosa ou no limite"),
    likert("q2", "Não conseguir parar ou controlar as preocupações"),
    likert("q3", "Preocupar-se demais com coisas diferentes"),
    likert("q4", "Dificuldade para relaxar"),
    likert("q5", "Ficar tão inquieta que se torna difícil permanecer sentada"),
    likert("q6", "Ficar facilmente aborrecida ou irritada"),
    likert("q7", "Sentir medo como se algo terrível fosse acontecer")
  ],
  calc: soma,
  faixas: [
    [15, "Ansiedade grave", "red"],
    [10, "Moderada", "amb"],
    [5, "Leve", "amb"],
    [0, "Mínima", "acc"]
  ],
  fonte: "Spitzer RL et al. Arch Intern Med 2006;166:1092.",
  nota: "Rastreio, não diagnóstico. Descartar causa orgânica e uso de substância antes de fechar transtorno de ansiedade."
});
