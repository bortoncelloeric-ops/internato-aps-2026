/* Contrato da camada generativa — prompt, schema e montagem do bloco determinístico.
 *
 * ARQUIVO COMPARTILHADO, e é esse o ponto: o app carrega isto por <script> e o
 * eval carrega o mesmo arquivo. Se o prompt vivesse duplicado nos dois, eles
 * divergiriam na primeira edição e o eval passaria a medir uma coisa que não é
 * a que roda no consultório.
 *
 * Depende de calculadoras.js (lerNota, omsZ, omsPesoEstatura, sisvan, fmtZ, fmtP)
 * e de oms-lms.js. Carregar depois dos dois.
 */

/* Um campo por seção. O schema é o contrato anti-alucinação.
 *
 * S e O do SOAP NÃO estão aqui, e a ausência é o desenho. Nos dois PDFs de
 * referência o ChatGPT devolveu ausculta pulmonar normal e orofaringe sem
 * exsudato numa nota sem exame físico, e inventou linfonodomegalia com
 * "afebril" numa nota que registra febre. Colado no prontuário, isso é registro
 * de ato não praticado. S e O são montados por concatenação literal do que o
 * médico digitou — ver montarSOAP() no fim deste arquivo. */
var GUIA_SCHEMA = {
  type: "object",
  properties: {
    sintese: { type: "string" },
    hipotese_principal: { type: "string" },
    diferenciais: { type: "array", items: { type: "string" } },
    anamnese_dirigida: { type: "array", items: { type: "string" } },
    exame_dirigido: { type: "array", items: { type: "string" } },
    pontos_atencao: { type: "array", items: { type: "string" } },
    dados_faltantes: { type: "array", items: { type: "string" } },
    conduta: {
      type: "array",
      items: {
        type: "object",
        properties: {
          item: { type: "string" },
          /* nome do fármaco quando a conduta envolve prescrição, para o app
             preencher a dose a partir do peso. String vazia quando não envolve. */
          farmaco: { type: "string" },
          fonte: { type: "string" }
        },
        required: ["item", "farmaco", "fonte"],
        additionalProperties: false
      }
    },
    avaliacao_soap: { type: "string" },
    plano_soap: { type: "string" }
  },
  required: ["sintese", "hipotese_principal", "diferenciais", "anamnese_dirigida",
             "exame_dirigido", "pontos_atencao", "dados_faltantes", "conduta",
             "avaliacao_soap", "plano_soap"],
  additionalProperties: false
};

var GUIA_SYS = [
  "Você é apoio à decisão clínica na Atenção Primária brasileira, para uso de um médico.",
  "Recebe a nota de uma consulta e o que a camada determinística já calculou, e devolve o guia DESTE caso.",
  "",
  "REGRAS QUE NÃO SE NEGOCIAM:",
  "",
  "1. Os números da camada determinística são FATO. Reproduza-os como vieram. Nunca recalcule,",
  "   nunca relativize, nunca escreva \"próximo de\", \"em torno de\" ou \"vale conferir\" sobre um",
  "   escore que já foi calculado.",
  "2. NUNCA escreva dose numérica: nem mg, nem mg/kg, nem mL. Ponha SÓ o nome do princípio",
  "   ativo no campo \"farmaco\" e pare — o aplicativo calcula a dose a partir do peso.",
  "   Se o item não envolve prescrição, \"farmaco\" é string vazia: não escreva \"nenhum\",",
  "   \"não medicamentoso\" nem nada parecido ali. Escrever \"conforme o peso\" é proibido —",
  "   se falta o peso, isso vai em dados_faltantes.",
  "2b. Ao citar um fármaco que o paciente JÁ usa e que não combina com a hipótese, diga a",
  "   classe dele e por que não serve. \"Sem indicação clara\" não basta: o que ajuda é",
  "   \"X é antifúngico e o quadro é bacteriano\" ou \"Y é corticoide, não anti-histamínico\".",
  "3. dados_faltantes lista o que a conduta exige e a nota não tem, dizendo o que cada dado",
  "   destrava. Se a nota traz tudo, devolva lista vazia.",
  "4. Em conduta, \"fonte\" NUNCA é vazia — ao contrário de \"farmaco\", que pode ser. Se não",
  "   tiver fonte brasileira datada para aquele item, escreva o literal \"VERIFICAR\".",
  "   Não invente referência. Item de conduta sem fonte nem VERIFICAR é recusado.",
  "5. pontos_atencao é onde entra o que o médico pode não ter percebido na própria nota:",
  "   contradição, fármaco de classe errada para a hipótese, dado que contraria a conclusão.",
  "6. avaliacao_soap e plano_soap são só o A e o P. Não escreva S nem O: você não examinou",
  "   o paciente e não pode registrar achado que não foi feito.",
  "7. Escreva para quem está com o paciente na frente: frase curta, resolvida numa linha."
].join("\n");

/* Roda a camada determinística sobre a nota e as medidas digitadas, e devolve o
   que vai virar FATO no prompt. É o encontro das duas camadas: o que sai daqui
   o modelo não recalcula nem discute. */
function montarDeterministica(nota, med) {
  med = med || {};
  var a = lerNota(nota || "");
  var meses = function (n) {
    return n % 12 === 0 && n >= 12 ? (n / 12) + (n === 12 ? " ano" : " anos") : n + " meses";
  };
  var num = function (x) { return String(x).replace(".", ","); };

  var lidos = [];
  if (a.idade.length) lidos.push("idade " + a.idade.map(meses).join(" / "));
  if (a.peso.length) lidos.push("peso " + a.peso.map(num).join(" / ") + " kg");
  if (a.altura.length) lidos.push(a.altura.map(num).join(" / ") + " cm");
  if (a.sexo.length) lidos.push(a.sexo.join(" / "));

  var contradicoes = [];
  if (a.idade.length > 1) contradicoes.push("a nota traz " + a.idade.map(meses).join(" e ") + " — divergem");
  if (a.peso.length > 1) contradicoes.push("a nota traz " + a.peso.map(num).join(" kg e ") + " kg — divergem");
  if (a.altura.length > 1) contradicoes.push("a nota traz " + a.altura.map(num).join(" cm e ") + " cm — divergem");
  if (a.sexo.length > 1) contradicoes.push("a nota traz " + a.sexo.join(" e ") + " — divergem");

  var falta = [];
  FALTAS.forEach(function (f) { if (!a[f.k].length) falta.push(f.t); });

  /* Antropometria só quando as medidas foram digitadas nos campos — não se
     adivinha a partir da nota, justamente porque a nota pode se contradizer. */
  var antro = null, alerta = null;
  if (med.sexo && med.meses >= 0 && (med.peso > 0 || med.est > 0)) {
    var calc = CALCS.filter(function (c) { return c.id === "antropo-infantil"; })[0];
    var linhas = calc.calc(med);
    if (linhas && linhas.length) {
      antro = {};
      linhas.forEach(function (l) { antro[l.rot] = l.val; });
      alerta = calc.alerta(med);
    }
  }

  return { lido: lidos.join(" · "), contradicoes: contradicoes, falta: falta,
           antropometria: antro, alertaAntro: alerta };
}

/* O bloco que vai como mensagem do usuário. Rótulos em caixa alta no que não
   pode ser suavizado — é o que o modelo tende a relativizar. */
function guiaPrompt(nota, deter) {
  var l = ["NOTA DA CONSULTA:", nota, "",
           "CAMADA DETERMINÍSTICA (fatos já calculados — reproduza, não recalcule):",
           "- lido na nota: " + (deter.lido || "nada reconhecido")];
  l.push(deter.contradicoes.length
    ? "- CONTRADIÇÕES: " + deter.contradicoes.join("; ")
    : "- contradições: nenhuma");
  l.push(deter.falta.length
    ? "- DADOS QUE FALTAM: " + deter.falta.join("; ")
    : "- dados que faltam: nenhum");
  if (deter.antropometria) {
    l.push("- antropometria: " + Object.keys(deter.antropometria).map(function (k) {
      return k + ": " + deter.antropometria[k];
    }).join(" | "));
    if (deter.alertaAntro) l.push("- ALERTA ANTROPOMÉTRICO: " + deter.alertaAntro);
  } else {
    l.push("- antropometria: não calculável (falta peso e/ou estatura)");
  }
  return l.join("\n");
}

/* S e O por concatenação literal. O modelo nunca escreve estas duas letras.
   O que não foi digitado sai como lacuna visível, não como achado inventado. */
function montarSOAP(nota, guia) {
  var vazio = "[não registrado]";
  return [
    "S: " + ((nota || "").trim() || vazio),
    "O: " + vazio + "  (preencher com o exame realizado)",
    "A: " + ((guia && guia.avaliacao_soap) || vazio),
    "P: " + ((guia && guia.plano_soap) || vazio)
  ].join("\n");
}
