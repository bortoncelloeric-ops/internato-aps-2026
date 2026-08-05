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
 * Campo: {id, rot, un?, tipo:"num"|"opt"|"data"|"texto", opts?, min?, max?, passo?, opc?}
 * `opc: true` = campo opcional; a calculadora roda sem ele.
 * calc(v) devolve:
 *   número  → usa `faixas`
 *   string  → renderiza direto
 *   array   → [{rot, val, cls?}] uma linha por resultado (cls: acc|amb|red|blu)
 *   null    → nada a mostrar ainda
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

/* ==========================================================================
   ANTROPOMETRIA INFANTIL — escore-z da OMS e classificação do SISVAN.
   Depende de oms-lms.js (tabelas oficiais, grade diária até 5 anos).
   ========================================================================== */

/* Valor da medida no escore-z pedido. L = 0 cai no ramo exponencial. */
function lmsValor(L, M, S, z) {
  return L === 0 ? M * Math.exp(S * z) : M * Math.pow(1 + L * S * z, 1 / L);
}

/* Φ(z) — Abramowitz & Stegun 26.2.17, erro < 7,5e-8. Só para exibir percentil. */
function normalAcum(z) {
  var b = [0.319381530, -0.356563782, 1.781477937, -1.821255978, 1.330274429];
  var x = Math.abs(z), t = 1 / (1 + 0.2316419 * x);
  var poly = ((((b[4] * t + b[3]) * t + b[2]) * t + b[1]) * t + b[0]) * t;
  var v = 1 - 0.39894228 * Math.exp(-x * x / 2) * poly;
  return z >= 0 ? v : 1 - v;
}

/* Indicadores: cada um aponta para a tabela de 0-5a (diária) e a de 5+ (mensal).
   `peso: true` marca os índices baseados em peso, que recebem a correção da OMS
   além de ±3 DP (a OMS não corrige estatura/idade nem perímetro cefálico). */
var OMS_IND = {
  peso:     { ate5: "wfa",  acima: "wfa519",  peso: true  },
  estatura: { ate5: "lhfa", acima: "hfa519",  peso: false },
  imc:      { ate5: "bfa",  acima: "bmi519",  peso: true  },
  pc:       { ate5: "hcfa", acima: null,      peso: false }
};

/* Escore-z de um indicador. Devolve {z, p} ou null quando a idade está fora
   do intervalo publicado — peso/idade, por exemplo, só existe até 10 anos.
   `meses` aceita decimal. Mês = 30,4375 dias, a conversão da própria OMS. */
function omsZ(indicador, sexo, meses, valor) {
  var cfg = OMS_IND[indicador];
  if (!cfg || !(valor > 0) || !(meses >= 0)) return null;

  var tab, i;
  if (meses < 61) {
    tab = OMS_LMS[cfg.ate5];
    i = Math.round(meses * 30.4375);
  } else {
    if (!cfg.acima) return null;
    tab = OMS_LMS[cfg.acima];
    i = Math.round(meses);
  }
  var s = tab[sexo];
  if (!s) return null;
  var j = i - s.ini;
  if (j < 0 || j >= s.M.length) return null;

  var L = s.L[j], M = s.M[j], S = s.S[j];
  var z = L === 0 ? Math.log(valor / M) / S : (Math.pow(valor / M, L) - 1) / (L * S);

  /* Correção da OMS nas caudas: além de ±3 DP a distribuição LMS deixa de ser
     confiável, então a OMS extrapola linearmente usando a distância entre o
     2º e o 3º desvio. Só para índices baseados em peso. */
  if (cfg.peso) {
    if (z > 3) {
      var p3 = lmsValor(L, M, S, 3), p2 = lmsValor(L, M, S, 2);
      z = 3 + (valor - p3) / (p3 - p2);
    } else if (z < -3) {
      var n3 = lmsValor(L, M, S, -3), n2 = lmsValor(L, M, S, -2);
      z = -3 + (valor - n3) / (n2 - n3);
    }
  }
  return { z: z, p: normalAcum(z) * 100 };
}

/* Diagnóstico nutricional do SISVAN. Os quadros são por índice E por faixa
   etária: IMC/idade abaixo de 5 anos fala em "risco de sobrepeso", e a partir
   de 5 anos o mesmo escore-z já se chama "sobrepeso". Não unificar. */
function sisvan(indicador, meses, z) {
  var f = function (lista) {
    for (var i = 0; i < lista.length; i++) if (z >= lista[i][0]) return lista[i];
    return null;
  };
  if (indicador === "peso") {
    if (meses > 120) return null;                       /* a OMS não publica peso/idade acima de 10 anos */
    return f([[2.0000001, "Peso elevado para a idade", "amb"],
              [-2, "Peso adequado para a idade", "acc"],
              [-3, "Baixo peso para a idade", "red"],
              [-Infinity, "Muito baixo peso para a idade", "red"]]);
  }
  if (indicador === "estatura") {
    return f([[-2, "Estatura adequada para a idade", "acc"],
              [-3, "Baixa estatura para a idade", "amb"],
              [-Infinity, "Muito baixa estatura para a idade", "red"]]);
  }
  if (indicador === "imc") {
    return meses < 60
      ? f([[3.0000001, "Obesidade", "red"],
           [2.0000001, "Sobrepeso", "amb"],
           [1.0000001, "Risco de sobrepeso", "amb"],
           [-2, "Eutrofia", "acc"],
           [-3, "Magreza", "amb"],
           [-Infinity, "Magreza acentuada", "red"]])
      : f([[3.0000001, "Obesidade grave", "red"],
           [2.0000001, "Obesidade", "red"],
           [1.0000001, "Sobrepeso", "amb"],
           [-2, "Eutrofia", "acc"],
           [-3, "Magreza", "amb"],
           [-Infinity, "Magreza acentuada", "red"]]);
  }
  return null;                                          /* perímetro cefálico não tem quadro no SISVAN */
}

function fmtZ(z) {
  return (z >= 0 ? "+" : "−") + Math.abs(z).toFixed(2).replace(".", ",");
}
/* Arredondar a cauda para "P100" ou "P0" inventa um percentil que não existe.
   Acima de 99 e abaixo de 1 o número perde resolução útil de qualquer forma:
   o que informa ali é o escore-z, não a casa decimal do percentil. */
function fmtP(p) {
  if (p >= 99.9) return "P>99,9";
  if (p <= 0.1) return "P<0,1";
  if (p > 99 || p < 1) return "P" + p.toFixed(1).replace(".", ",");
  return "P" + (p >= 10 ? Math.round(p) : p.toFixed(1).replace(".", ","));
}

CALCS.push({
  id: "antropo-infantil",
  nome: "Antropometria infantil — escore-z OMS",
  intro: "Idade em meses, com decimal se precisar (1 ano e 6 meses = 18). Preencher só o que foi medido.",
  campos: [
    { id: "sexo", rot: "Sexo", tipo: "opt", opts: [["f", "Feminino"], ["m", "Masculino"]] },
    { id: "meses", rot: "Idade", un: "meses", tipo: "num", min: 0, max: 228, passo: "0.5" },
    { id: "peso", rot: "Peso", un: "kg", tipo: "num", min: 0.5, max: 150, passo: "0.001", opc: true },
    { id: "est", rot: "Comprimento ou estatura", un: "cm", tipo: "num", min: 30, max: 210, passo: "0.1", opc: true },
    { id: "pc", rot: "Perímetro cefálico", un: "cm", tipo: "num", min: 20, max: 70, passo: "0.1", opc: true }
  ],
  calc: function (v) {
    var linhas = [], m = v.meses, s = v.sexo;

    var add = function (ind, rot, valor) {
      if (!(valor > 0)) return;
      var r = omsZ(ind, s, m, valor);
      if (!r) {
        linhas.push({ rot: rot, val: "fora do intervalo publicado pela OMS para esta idade", cls: "" });
        return;
      }
      var cl = sisvan(ind, m, r.z);
      /* Fora de ±3 DP a cor NÃO pode ser a do SISVAN. Estatura para idade não
         tem corte superior no quadro, então +3,05 sai como "adequada" — pintar
         isso de verde lê como "está tudo bem" ao lado de um alerta pedindo para
         conferir a medida. O escore mandou; o rótulo acompanha. */
      var cor = cl ? cl[2] : "";
      if (Math.abs(r.z) >= 3) cor = "amb";
      linhas.push({
        rot: rot,
        val: "z " + fmtZ(r.z) + " · " + fmtP(r.p) + (cl ? " — " + cl[1] : ""),
        cls: cor
      });
    };

    add("peso", "Peso para idade", v.peso);
    add("estatura", "Estatura para idade", v.est);
    if (v.peso > 0 && v.est > 0) {
      var alt = v.est / 100;
      add("imc", "IMC para idade", v.peso / (alt * alt));
    }
    add("pc", "Perímetro cefálico", v.pc);

    return linhas.length ? linhas : null;
  },
  alerta: function (v) {
    /* Escore extremo quase sempre é erro de aferição ou de idade, e é justamente
       onde a classificação sozinha engana: estatura/idade não tem corte superior
       no SISVAN, então +3 DP ainda sai como "adequada". */
    var m = v.meses, s = v.sexo, fora = [];
    var ver = function (ind, rot, valor) {
      if (!(valor > 0)) return;
      var r = omsZ(ind, s, m, valor);
      if (r && Math.abs(r.z) >= 3) fora.push(rot + " " + fmtZ(r.z));
    };
    ver("peso", "peso/idade", v.peso);
    ver("estatura", "estatura/idade", v.est);
    if (v.peso > 0 && v.est > 0) ver("imc", "IMC/idade", v.peso / Math.pow(v.est / 100, 2));
    ver("pc", "perímetro cefálico", v.pc);
    return fora.length
      ? "Fora de ±3 DP: " + fora.join(", ") + ". Conferir a medida e a idade antes de interpretar."
      : null;
  },
  fonte: "Escore-z: WHO Child Growth Standards 2006 (0 a 5 anos) e WHO Growth Reference 2007 (5 a 19 anos), tabelas LMS expandidas. Classificação: MS — Norma Técnica do SISVAN, 2011, quadros 5 a 9 e 13 a 14.",
  nota: "Peso para idade só existe até 10 anos; acima disso interpretar pelo IMC. Perímetro cefálico não tem classificação no SISVAN — sai só o escore. Medir deitado até 2 anos e em pé a partir daí; a curva é a mesma, a técnica não."
});

/* ==========================================================================
   CONVERSOR DE DOSE — aritmética pura sobre a posologia que o médico escolheu.
   Não existe base aberta e datada de mg/kg por fármaco em português: RENAME não
   traz posologia, o Formulário Terapêutico Nacional é de 2010, e os CAB e PCDT
   são majoritariamente CC BY-NC-ND, que proíbe obra derivada. Embutir tabela de
   dose seria, além disso, escolha terapêutica com aparência de aritmética — o
   que a regra de corte deste arquivo bloqueia. Então o app só converte.
   ========================================================================== */
CALCS.push({
  id: "dose-peso",
  nome: "Dose por peso",
  intro: "A posologia é sua; o app só faz a conta. Confira o fármaco na fonte antes de prescrever.",
  campos: [
    { id: "peso", rot: "Peso", un: "kg", tipo: "num", min: 0.5, max: 150, passo: "0.001" },
    { id: "mgkg", rot: "Dose", un: "mg/kg/dose", tipo: "num", min: 0.01, max: 500, passo: "0.01" },
    { id: "vezes", rot: "Tomadas por dia", tipo: "opt",
      opts: [["1", "1 (24/24 h)"], ["2", "2 (12/12 h)"], ["3", "3 (8/8 h)"], ["4", "4 (6/6 h)"], ["6", "6 (4/4 h)"]] },
    { id: "conc", rot: "Concentração do frasco", un: "mg/mL", tipo: "num", min: 0.1, max: 1000, passo: "0.1", opc: true },
    { id: "teto", rot: "Dose máxima por tomada", un: "mg", tipo: "num", min: 1, max: 10000, passo: "1", opc: true }
  ],
  calc: function (v) {
    var porDose = v.peso * v.mgkg, n = Number(v.vezes), porDia = porDose * n;
    var num = function (x, casas) { return x.toFixed(casas).replace(".", ","); };
    var linhas = [
      { rot: "Por tomada", val: num(porDose, 1) + " mg", cls: "blu" },
      { rot: "Por dia", val: num(porDia, 1) + " mg em " + n + (n > 1 ? " tomadas" : " tomada"), cls: "" }
    ];
    if (v.conc > 0) {
      linhas.splice(1, 0, { rot: "Volume por tomada", val: num(porDose / v.conc, 2) + " mL", cls: "blu" });
    }
    if (v.teto > 0 && porDose > v.teto) {
      linhas.push({ rot: "Teto", val: "excede a máxima de " + num(v.teto, 0) + " mg por tomada", cls: "red" });
    }
    return linhas;
  },
  alerta: function (v) {
    return (v.teto > 0 && v.peso * v.mgkg > v.teto)
      ? "A dose calculada passa do teto que você informou. Reveja antes de prescrever."
      : null;
  },
  fonte: "Aritmética. O app não escolhe fármaco, dose nem intervalo — todos vêm de você.",
  nota: "Conferir sempre a apresentação disponível na farmácia da unidade: a mesma suspensão existe em concentrações diferentes, e é aí que o erro de volume acontece."
});

/* ==========================================================================
   CONFERÊNCIA DA NOTA — só o que é verificável por aritmética.
   Acha número repetido e divergente (a nota que diz "7 meses" no alto e
   "8 meses" embaixo) e mostra o que a ferramenta leu, para o erro aparecer
   antes de virar conta. Contradição de sentido — "nega febre" com temperatura
   de 38 — não é regex e não está aqui.
   ========================================================================== */
function lerNota(txt) {
  var t = " " + String(txt).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + " ";
  var achado = { idade: [], peso: [], altura: [], sexo: [] };

  var push = function (lista, valor) { if (lista.indexOf(valor) < 0) lista.push(valor); };

  /* Idade: "7 meses", "3 anos e 2 meses". Duração não é idade — "há 7 dias",
     "faz 2 semanas" e "desde 3 meses" descrevem o tempo de sintoma. */
  var reIdade = /(?:^|[^a-z0-9])(\d{1,3})\s*(anos?|meses|mes|m)(?![a-z])/g, mt;
  while ((mt = reIdade.exec(t))) {
    var antes = t.slice(Math.max(0, mt.index - 14), mt.index);
    if (/\b(ha|faz|desde|durante|por|apos|depois)\s*$/.test(antes)) continue;
    var n = Number(mt[1]);
    push(achado.idade, /^an/.test(mt[2]) ? n * 12 : n);
  }

  var re = function (rx, lista, div) {
    var m2;
    while ((m2 = rx.exec(t))) push(lista, Number(m2[1].replace(",", ".")) / (div || 1));
  };
  re(/(\d{1,3}(?:[.,]\d{1,3})?)\s*kg\b/g, achado.peso);
  re(/(\d{2,3}(?:[.,]\d{1,2})?)\s*cm\b/g, achado.altura);

  if (/\bfeminin[ao]\b|\bmenina\b|\bsexo f\b/.test(t)) push(achado.sexo, "feminino");
  if (/\bmasculin[ao]\b|\bmenino\b|\bsexo m\b/.test(t)) push(achado.sexo, "masculino");

  return achado;
}

/* Cada dado que falta, e o que ele destrava. Dizer só "falta peso" transfere
   para quem lê o trabalho de lembrar por que aquilo importa com paciente na
   frente. A ordem é a da consequência: sem idade nada roda, sem peso não há
   dose. */
var FALTAS = [
  { k: "idade",  t: "idade — sem ela não sai escore-z nem classificação do SISVAN" },
  { k: "peso",   t: "peso — sem ele não sai dose por peso nem IMC para idade" },
  { k: "sexo",   t: "sexo — a curva da OMS é uma para cada" },
  { k: "altura", t: "estatura — sem ela não sai IMC para idade" }
];

CALCS.push({
  id: "nota-conferencia",
  nome: "Conferência da nota",
  intro: "Colar ou digitar a nota da consulta. Nada sai do computador e nada é gravado.",
  campos: [
    { id: "nota", rot: "Nota da consulta", tipo: "texto" }
  ],
  calc: function (v) {
    var a = lerNota(v.nota), linhas = [];
    var meses = function (n) {
      return n % 12 === 0 && n >= 12 ? (n / 12) + (n === 12 ? " ano" : " anos") : n + " meses";
    };
    var num = function (x) { return String(x).replace(".", ","); };

    if (a.idade.length > 1) {
      linhas.push({ rot: "Idade", val: "a nota traz " + a.idade.map(meses).join(" e ") + " — divergem", cls: "red" });
    }
    if (a.peso.length > 1) {
      linhas.push({ rot: "Peso", val: "a nota traz " + a.peso.map(num).join(" kg e ") + " kg — divergem", cls: "red" });
    }
    if (a.altura.length > 1) {
      linhas.push({ rot: "Estatura", val: "a nota traz " + a.altura.map(num).join(" cm e ") + " cm — divergem", cls: "red" });
    }
    if (a.sexo.length > 1) {
      linhas.push({ rot: "Sexo", val: "a nota traz " + a.sexo.join(" e ") + " — divergem", cls: "red" });
    }

    var lidos = [];
    if (a.idade.length) lidos.push("idade " + a.idade.map(meses).join(" / "));
    if (a.peso.length) lidos.push("peso " + a.peso.map(num).join(" / ") + " kg");
    if (a.altura.length) lidos.push(a.altura.map(num).join(" / ") + " cm");
    if (a.sexo.length) lidos.push(a.sexo.join(" / "));
    if (!lidos.length) return null;

    /* O que a conta exige e a nota não tem. É a terceira resposta possível,
       ao lado de "calculei" e "achei uma contradição": a nota do ex1 não traz
       peso, e o certo ali não é calcular nem calar — é dizer qual dado falta
       e o que ele destrava. Só aparece depois que algo foi reconhecido, senão
       campo em branco viraria uma lista de cobranças. */
    FALTAS.forEach(function (f) {
      if (!a[f.k].length) linhas.push({ rot: "Falta", val: f.t, cls: "amb" });
    });

    linhas.push({ rot: "Lido na nota", val: lidos.join(" · "), cls: linhas.length ? "" : "acc" });
    return linhas;
  },
  alerta: function (v) {
    var a = lerNota(v.nota);
    return (a.idade.length > 1 || a.peso.length > 1 || a.altura.length > 1 || a.sexo.length > 1)
      ? "A nota se contradiz. Resolver antes de calcular escore-z ou dose — a idade muda o resultado."
      : null;
  },
  fonte: "Aritmética sobre o texto. Não interpreta conteúdo clínico.",
  nota: "Só acha número repetido e divergente. Contradição de sentido, como negar febre e registrar 38 °C, passa batido aqui."
});
