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
 *
 * Bloco 2 (2026-09-23): os 45 cartões que existem agora. Os 18 da onda 2 que
 * ainda não têm cartão entram quando o Bloco 3 integrar.
 */
var BRASIL = {
  "haloperidol": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (comprimido 1 mg e 5 mg; solução oral 2 mg/mL; solução injetável 5 mg/mL e 50 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "decanoato-de-haloperidol": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (haloperidol solução injetável 50 mg/mL; a lista não usa o nome decanoato)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "clorpromazina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (comprimido 25 mg e 100 mg; solução oral 40 mg/mL; solução injetável 5 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "levomepromazina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "risperidona": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (comprimido 1 mg, 2 mg e 3 mg; solução oral 1 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "olanzapina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (comprimido 5 mg e 10 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "quetiapina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (comprimido 25 mg, 100 mg, 200 mg e 300 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ziprasidona": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (cápsula 40 mg e 80 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "clozapina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (comprimido 25 mg e 100 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "sulpirida": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "aripiprazol": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "carbonato-de-litio": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (comprimido 300 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "acido-valproico-valproato": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (ácido valproico comprimido 250 mg, 300 mg e 500 mg; solução oral e xarope 50 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "carbamazepina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (comprimido 200 mg e 400 mg; suspensão oral 20 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "lamotrigina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (comprimido 50 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "fluoxetina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (cápsula e comprimido 20 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "sertralina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "escitalopram": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "paroxetina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "citalopram": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "amitriptilina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (comprimido 25 mg e 75 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "clomipramina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (comprimido 10 mg e 25 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "imipramina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "bupropiona": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Estratégico (comprimido de liberação prolongada 150 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "venlafaxina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "mirtazapina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "trazodona": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "duloxetina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "fluvoxamina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "diazepam": {
    receita: "B1 — Notificação de Receita B",
    sus: "RENAME 2024 — Componente Básico (comprimido 5 mg e 10 mg; solução injetável 5 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "clonazepam": {
    receita: "B1 — Notificação de Receita B",
    sus: "RENAME 2024 — Componente Básico (solução oral 2,5 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "lorazepam": {
    receita: "B1 — Notificação de Receita B",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "alprazolam": {
    receita: "B1 — Notificação de Receita B",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "bromazepam": {
    receita: "B1 — Notificação de Receita B",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "midazolam": {
    receita: "B1 — Notificação de Receita B",
    sus: "RENAME 2024 — Componente Básico (solução oral 2 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "clordiazepoxido": {
    receita: "B1 — Notificação de Receita B",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "biperideno": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (comprimido 2 mg; comprimido de liberação prolongada 4 mg; lactato solução injetável 5 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "propranolol-para-acatisia": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 10 mg e 40 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "terapia-de-reposicao-de-nicotina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (adesivo 7 mg, 14 mg e 21 mg; goma 2 mg; pastilha 2 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "naltrexona": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "acamprosato": {
    receita: "não se aplica — sem registro no Brasil",
    sus: "não consta da RENAME 2024",
    registro: "sem registro ativo na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dissulfiram": {
    receita: "não se aplica — sem registro no Brasil",
    sus: "não consta da RENAME 2024",
    registro: "sem registro ativo na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "tiamina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 300 mg). Forma parenteral não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "escetamina-intranasal": {
    receita: "B1 — Notificação de Receita B",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "cetamina-racemica": {
    receita: "B1 — Notificação de Receita B",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  }
};
