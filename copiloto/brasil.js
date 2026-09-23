/* Camada "No Brasil" do formulário — SÓ DADOS.
 *
 * O Maudsley responde qual fármaco e quanto. Não responde as três perguntas que
 * decidem se a receita vira tratamento aqui: que receita usar (Portaria SVS/MS
 * nº 344/1998, com as listas atualizadas por RDC), se o SUS dispensa (RENAME,
 * PCDT) e se existe registro na Anvisa.
 *
 * Mora fora do psicofarmacos.js de propósito: é outra fonte, e muda por RDC,
 * não por revisão clínica. O renderer lê BRASIL[id] e põe a linha logo abaixo
 * da dose — a pergunta seguinte a "quanto" é "com que receita, e a farmácia tem".
 *
 * Entrada = { receita, sus, registro, f, v? }. `receita` começa pela lista
 * (A1–A3, B1–B2, C1–C5), por "sem controle especial" ou por "não se aplica".
 * `f` separa fontes por " · ", cada parte com ano. Há teste para tudo isso.
 */
var BRASIL = {};
