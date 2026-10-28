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
 * Bloco 2 (2026-09-23): os 45 cartões que existiam então.
 * Bloco 3 (2026-09-23): +18 cartões da onda 2 (total 63).
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
  },
  "donepezila": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (comprimido 5 mg e 10 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "rivastigmina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (cápsula; adesivo no PCDT Alzheimer)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "galantamina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (cápsula de liberação prolongada 8 mg, 16 mg e 24 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "memantina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado (comprimido 10 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "zolpidem": {
    receita: "B1 — Notificação de Receita B",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "melatonina": {
    receita: "não se aplica — sem registro no Brasil",
    sus: "não consta da RENAME 2024",
    registro: "sem registro ativo na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metilfenidato": {
    receita: "A3 — Notificação de Receita A",
    sus: "não consta da RENAME 2024 — PCDT TDAH (Portaria Conjunta nº 14/2022) não incorporou",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "lisdexanfetamina": {
    receita: "A3 — Notificação de Receita A",
    sus: "não consta da RENAME 2024 — PCDT TDAH (Portaria Conjunta nº 14/2022) não incorporou",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "atomoxetina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "clonidina": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "prazosina": {
    receita: "não se aplica — sem registro no Brasil",
    sus: "não consta da RENAME 2024",
    registro: "sem registro ativo na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "naloxona": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (solução injetável 0,4 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metadona": {
    receita: "A1 — Notificação de Receita A",
    sus: "RENAME 2024 — Componente Especializado (comprimido 5 mg e 10 mg; solução injetável 10 mg/mL) pelo PCDT Dor Crônica, não para dependência de opioide",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "buprenorfina": {
    receita: "A1 — Notificação de Receita A",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dantroleno": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "bromocriptina": {
    receita: "não se aplica — sem registro no Brasil",
    sus: "RENAME 2024 — Componente Especializado (comprimido 2,5 mg; PCDT Hiperprolactinemia, não SNM)",
    registro: "sem registro ativo na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ciproeptadina": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa só em associação (com cobamamida ou polivitamínico); sem apresentação isolada ativa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "flumazenil": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (solução injetável 0,1 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },

  /* Bloco 4 (2026-10-26): cartões do farmacos-aps.js (APS I). */
  "vitamina-a": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (palmitato de retinol cápsula mole 100.000 UI e 200.000 UI); Componente Básico (palmitato de retinol solução oral 150.000 UI/mL) — a megadose do programa é a cápsula (Estratégico); a solução oral é outro produto",
    registro: "registrado na Anvisa (Far-Manguinhos Vitamina A, Fiocruz — registro ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "sulfato-ferroso": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido equivalente a 40 mg de ferro elementar; solução oral equivalente a 25 mg/mL; xarope equivalente a 5 mg/mL de ferro elementar); medicamento do Programa Nacional de Suplementação de Ferro",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "acido-folico": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 5 mg; solução oral 0,2 mg/mL); medicamento do Programa Nacional de Suplementação de Ferro. A RENAME não lista comprimido de 0,4 mg",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "acido-acetilsalicilico": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 100 mg, antiagregante; comprimido 500 mg, analgésico)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "espiramicina": {
    receita: "sem controle especial (fora das listas da Portaria 344); a regra de retenção de receita de antimicrobianos não foi conferida — VERIFICAR",
    sus: "RENAME 2024 — Componente Estratégico (comprimido 1.500.000 UI)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "carbonato-de-calcio": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 1.250 mg, equivalente a 500 mg de cálcio elementar; também associado a colecalciferol 200 UI ou 400 UI, e 1.500 mg equivalente a 600 mg de cálcio elementar + 400 UI)",
    registro: "registrado na Anvisa (há também produtos notificados como medicamento de baixo risco)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "enalapril": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 5 mg, 10 mg e 20 mg); também no Farmácia Popular (comprimido 10 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "captopril": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 25 mg); também no Farmácia Popular (comprimido 25 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "losartana": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 50 mg); também no Farmácia Popular (comprimido 50 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "anlodipino": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 5 mg e 10 mg); também no Farmácia Popular (comprimido 5 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "nifedipino": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (cápsula e comprimido 10 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "verapamil": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 80 mg e 120 mg; solução injetável 2,5 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "hidroclorotiazida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 12,5 mg e 25 mg); também no Farmácia Popular (comprimido 25 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "espironolactona": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 25 mg e 100 mg); também no Farmácia Popular (comprimido 25 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "furosemida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 40 mg; solução injetável 10 mg/mL); também no Farmácia Popular (comprimido 40 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "atenolol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 50 mg e 100 mg); no Farmácia Popular, comprimido 25 mg",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "propranolol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 10 mg e 40 mg); também no Farmácia Popular (comprimido 40 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "carvedilol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 3,125 mg, 6,25 mg, 12,5 mg e 25 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metoprolol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (succinato: comprimido de liberação prolongada 25 mg, 50 mg e 100 mg; tartarato: comprimido 100 mg); no Farmácia Popular, succinato 25 mg",
    registro: "registrado na Anvisa (succinato e tartarato)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Hipertensão Arterial Sistêmica, Portaria SECTICS/MS nº 49, 2025 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metildopa": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 250 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "hidralazina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 25 mg e 50 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "doxazosina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 2 mg e 4 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metformina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 500 mg e 850 mg); a de liberação prolongada 500 mg está no Farmácia Popular",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "glibenclamida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 5 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "gliclazida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido de liberação prolongada 30 mg e 60 mg; comprimido 80 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dapagliflozina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Especializado (dapagliflozina propanodiol, comprimido 10 mg): não é da farmácia da USF. A incorporação para DM2 de 2023 (Portaria Sectics/MS nº 9/2023, RENAME p. 231) é para idade entre 40 e 64 anos; o PCDT de 2026 não tem teto de idade — conferir o que a farmácia de medicamentos especializados exige",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "insulina-nph": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (suspensão injetável 100 UI/mL); o MS adquire e distribui, em frasco e caneta",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "insulina-regular": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (solução injetável 100 UI/mL); o MS adquire e distribui, em frasco e caneta",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "sulfato-de-magnesio": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (solução injetável a 10% e a 50%); se a USF tem a ampola e quem aplica é do fluxo local",
    registro: "registrado na Anvisa (sulfato de magnésio heptaidratado)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "insulina-glargina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Especializado (insulina análoga de ação prolongada, 100 UI/mL e 300 UI/mL); a incorporação para DM2 (Portaria SECTICS/MS nº 949/2025) é posterior à RENAME e a dispensação sai por Nota Técnica do MS, de forma gradual",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Diabete Melito Tipo 2, Portaria SCTIE/MS nº 13, 2026 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "etinilestradiol-levonorgestrel": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 0,03 mg + 0,15 mg); contraceptivos do Programa Saúde da Mulher são adquiridos e distribuídos pelo Ministério da Saúde",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "noretisterona": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 0,35 mg); contraceptivos do Programa Saúde da Mulher são adquiridos e distribuídos pelo Ministério da Saúde",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "medroxiprogesterona": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (suspensão injetável 150 mg/mL e 50 mg/mL; comprimido 10 mg); o injetável trimestral é adquirido e distribuído pelo Ministério da Saúde (Programa Saúde da Mulher)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "enantato-de-noretisterona-valerato-de-estradiol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (Anexo I: solução injetável 50 mg/mL + 5 mg/mL); a RENAME lista também outros dois injetáveis mensais combinados",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "levonorgestrel": {
    receita: "sem controle especial — a dispensação de levonorgestrel de emergência não exige receita médica e pode ser feita pelo enfermeiro",
    sus: "RENAME 2024 — Componente Básico (comprimido 0,75 mg e 1,5 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · MS — Proteger e cuidar da saúde de adolescentes na atenção básica, 2ª ed., 2017"
  },
  "estrogenios-conjugados": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 0,3 mg e 0,625 mg; creme vaginal 0,625 mg/g)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "estradiol": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024 (estradiol isolado; a RENAME só traz ésteres de estradiol dentro de injetáveis contraceptivos)",
    registro: "registrado na Anvisa (estradiol hemi-hidratado: comprimido, adesivo e gel com registro ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "estriol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (Anexo I: creme vaginal 1 mg/g); aquisição e dispensação por estados e municípios (NT Conjunta nº 72/2026)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · MS — Nota Técnica Conjunta nº 72/2026 (transição menopausal), 2026"
  },
  "progesterona": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "tibolona": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dipirona": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 500 mg; solução oral 500 mg/mL; solução injetável 500 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "paracetamol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 500 mg; solução oral 200 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "codeina": {
    receita: "A2 — Notificação de Receita A; pelo adendo 2 da lista A2, comprimidos de 30 mg e 60 mg e solução oral 3 mg/mL (0,3%) vão em Receita de Controle Especial, em 2 vias; a injetável de 30 mg/mL (3%) passa de 2,5%: Notificação de Receita A",
    sus: "RENAME 2024 — Componente Especializado, PCDT Dor Crônica (solução oral 3 mg/mL; comprimido 30 mg e 60 mg; solução injetável 30 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "morfina": {
    receita: "A1 — Notificação de Receita A",
    sus: "RENAME 2024 — Componente Especializado, PCDT Dor Crônica (comprimido 10 mg e 30 mg; solução oral 10 mg/mL; solução injetável 10 mg/mL; cápsula de liberação prolongada 30 mg, 60 mg e 100 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metoclopramida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 10 mg; solução injetável 5 mg/mL; solução oral 4 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dexametasona": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 4 mg; elixir 0,1 mg/mL; solução injetável 4 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "butilbrometo-de-escopolamina": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "lactulose": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (xarope 667 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "bisacodil": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "penicilina-benzatina": {
    receita: "sem controle especial (fora das listas da Portaria 344); a regra de retenção de receita de antimicrobianos não foi conferida — VERIFICAR",
    sus: "RENAME 2024 — Componente Básico e Estratégico (pó para suspensão injetável e suspensão injetável 1.200.000 UI); 600.000 UI no Componente Básico",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "doxiciclina": {
    receita: "sem controle especial (fora das listas da Portaria 344); a regra de retenção de receita de antimicrobianos não foi conferida — VERIFICAR",
    sus: "RENAME 2024 — Componente Estratégico (cloridrato de doxiciclina comprimido 100 mg; doxiciclina comprimido solúvel 100 mg e pó para solução injetável 100 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ceftriaxona": {
    receita: "sem controle especial (fora das listas da Portaria 344); a regra de retenção de receita de antimicrobianos não foi conferida — VERIFICAR",
    sus: "RENAME 2024 — Componente Básico (pó para solução injetável 250 mg, 500 mg e 1 g)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "azitromicina": {
    receita: "sem controle especial (fora das listas da Portaria 344); a regra de retenção de receita de antimicrobianos não foi conferida — VERIFICAR",
    sus: "RENAME 2024 — Componente Básico e Estratégico (comprimido 500 mg; pó para suspensão oral 40 mg/mL); comprimido 250 mg no Componente Estratégico",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metronidazol": {
    receita: "sem controle especial (fora das listas da Portaria 344); a regra de retenção de receita de antimicrobianos não foi conferida — VERIFICAR",
    sus: "RENAME 2024 — Componente Básico (comprimido 250 mg e 400 mg; gel vaginal 100 mg/g; benzoilmetronidazol suspensão oral 40 mg/mL, rotulada em mg do sal)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "aciclovir": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 200 mg; pó para solução injetável 250 mg; creme 50 mg/g)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "nitrato-de-miconazol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (creme vaginal 2%, 20 mg/g)",
    registro: "no CSV de registrados ativos, o creme vaginal de miconazol isolado não aparece (só associações com tinidazol ou metronidazol, e o gel oral); disponibilidade na farmácia da USF — VERIFICAR",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "fluconazol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (cápsula 100 mg e 150 mg; suspensão oral 10 mg/mL); solução injetável 2 mg/mL no Componente Estratégico",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "imiquimode": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (creme 50 mg/g)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "rifampicina-isoniazida-pirazinamida-etambutol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (comprimido rifampicina 150 mg + isoniazida 75 mg + pirazinamida 400 mg + etambutol 275 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "rifampicina-isoniazida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (comprimido 150 mg + 75 mg e 300 mg + 150 mg; comprimido dispersível 75 mg + 50 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "isoniazida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (comprimido 100 mg e 300 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "rifampicina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — cápsula 300 mg (Componente Básico e Estratégico); suspensão oral 20 mg/mL (Estratégico); cápsula 150 mg só no blíster da PQT-U (Estratégico)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "isoniazida-rifapentina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (comprimido rifapentina 300 mg + isoniazida 300 mg; rifapentina 150 mg isolada)",
    registro: "sem registro ativo na base aberta da Anvisa (consulta de 2026-09-23: o único registro de rifapentina listado está inativo); o SUS distribui pela RENAME 2024",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "pirazinamida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (comprimido 500 mg; suspensão oral 30 mg/mL; comprimido dispersível 150 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "piridoxina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — 50 mg (tabela por ATC: Básico; Anexo II: Estratégico); o Anexo I (Básico) lista 40 mg — conferir na farmácia da unidade",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "pqt-u": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico, por componente: rifampicina 150 mg e dapsona 50 mg só no blíster da PQT-U; clofazimina cápsula 50 mg e 100 mg; dapsona 100 mg; rifampicina 300 mg e suspensão 20 mg/mL",
    registro: "sem registro ativo da PQT-U nem da clofazimina na base aberta da Anvisa (consulta de 2026-09-23); rifampicina e dapsona isoladas têm registro ativo; o SUS distribui pela RENAME 2024",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "clofazimina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (cápsula 50 mg e 100 mg)",
    registro: "sem registro ativo na base aberta da Anvisa (consulta de 2026-09-23: os registros de clofazimina listados estão inativos); o SUS distribui pela RENAME 2024",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "prednisona": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico e Estratégico (comprimido 5 mg e 20 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "talidomida": {
    receita: "C3 — imunossupressora, Notificação de Receita Especial da talidomida, com Termo de Esclarecimento ao usuário (Anexo VII); as regras próprias da talidomida estão na RDC nº 11/2011, não baixada",
    sus: "RENAME 2024 — Componente Estratégico (comprimido 100 mg)",
    registro: "registrado na Anvisa (FUNED)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "tenofovir-entricitabina": {
    receita: "sem controle especial (nenhum antirretroviral nas listas vigentes da Portaria 344); retirada na Unidade Dispensadora de Medicamentos com o formulário do Siclom, até 7 dias após o teste de HIV",
    sus: "RENAME 2024 — Componente Estratégico (fumarato de tenofovir desoproxila + entricitabina, comprimido 300 mg + 200 mg)",
    registro: "registrado na Anvisa (genérico e similar com registro ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · MS — PCDT PrEP oral ao HIV, Portaria SECTICS/MS nº 55/2024, 2025"
  },
  "tenofovir-lamivudina": {
    receita: "sem controle especial (nenhum antirretroviral nas listas vigentes da Portaria 344); dispensação pública com o formulário de dispensação de ARV para profilaxias (Siclom)",
    sus: "RENAME 2024 — Componente Estratégico (fumarato de tenofovir desoproxila + lamivudina, comprimido 300 mg + 300 mg; tenofovir 300 mg e lamivudina 150 mg também isolados)",
    registro: "registrado na Anvisa (genérico e marca com registro ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
  },
  "dolutegravir": {
    receita: "sem controle especial (nenhum antirretroviral nas listas vigentes da Portaria 344); dispensação pública com o formulário de dispensação de ARV para profilaxias (Siclom)",
    sus: "RENAME 2024 — Componente Estratégico (dolutegravir sódico, comprimido 50 mg; comprimido dispersível 5 mg, incorporado pela Portaria Sectics/MS nº 36/2023)",
    registro: "registrado na Anvisa (genéricos e a apresentação dispersível com registro ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
  },
  "zidovudina-lamivudina": {
    receita: "sem controle especial (nenhum antirretroviral nas listas vigentes da Portaria 344); dispensação pública com o formulário de dispensação de ARV para profilaxias (Siclom)",
    sus: "RENAME 2024 — Componente Estratégico (zidovudina + lamivudina, comprimido 300 mg + 150 mg)",
    registro: "registrado na Anvisa (laboratórios oficiais com registro ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
  },
  "darunavir-ritonavir": {
    receita: "sem controle especial (nenhum antirretroviral nas listas vigentes da Portaria 344); dispensação pública com o formulário de dispensação de ARV para profilaxias (Siclom)",
    sus: "RENAME 2024 — Componente Estratégico, em comprimidos separados (darunavir 75 mg, 150 mg, 600 mg e 800 mg; ritonavir 100 mg)",
    registro: "registrado na Anvisa (darunavir e ritonavir com genérico ou similar ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · MS — PCDT PEP de risco ao HIV, IST e hepatites virais, Portaria SECTICS/MS nº 14, 2024"
  },

  /* Bloco 5 (2026-10-27): cartões do farmacos-aps.js (APS II). */
  "sinvastatina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 10 mg, 20 mg e 40 mg): é a estatina da farmácia da UBS",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "atorvastatina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Especializado, pelo PCDT de Dislipidemia (comprimido 10 mg, 20 mg, 40 mg e 80 mg): não é da farmácia da UBS",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "digoxina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 0,25 mg; elixir 0,05 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "sacubitril-valsartana": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Especializado, Grupo 1B, pelo PCDT de Insuficiência Cardíaca com Fração de Ejeção Reduzida (comprimido 50 mg, 100 mg e 200 mg): não é da farmácia da UBS",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "mononitrato-de-isossorbida": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 20 mg e 40 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "omeprazol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (cápsula 10 mg e 20 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "claritromicina": {
    receita: "sem controle especial (fora das listas da Portaria 344); antimicrobiano da lista da IN nº 360/2025 — receita com retenção (RDC nº 471/2021, alterada pela RDC nº 973/2025)",
    sus: "RENAME 2024 — Componente Básico (cápsula 500 mg; comprimido 250 mg e 500 mg; grânulo para suspensão oral 50 mg/mL); classificação AWaRe: Alerta",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · Anvisa — RDC nº 973/2025 (altera a RDC nº 471/2021), 2025"
  },
  "sais-de-reidratacao-oral": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (pó para solução oral: cloreto de sódio, glicose anidra, cloreto de potássio, citrato de sódio di-hidratado)",
    registro: "registrado na Anvisa (há também produtos com zinco, que não são a SRO da RENAME)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "cloreto-de-sodio-0-9": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (solução injetável 9 mg/mL, 0,9%); a solução de Ringer com lactato também está no Componente Básico",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ondansetrona": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (cloridrato de ondansetrona: comprimido 4 mg e 8 mg; comprimido orodispersível 4 mg e 8 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ciprofloxacino": {
    receita: "sem controle especial (fora das listas da Portaria 344); antimicrobiano da lista da IN nº 360/2025 (ciprofloxacina) — receita com retenção (RDC nº 471/2021, alterada pela RDC nº 973/2025)",
    sus: "RENAME 2024 — Componente Básico (comprimido 250 mg e 500 mg); classificação AWaRe: Alerta",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · Anvisa — RDC nº 973/2025 (altera a RDC nº 471/2021), 2025"
  },
  "albendazol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — comprimido mastigável 400 mg (Componente Básico e Estratégico); suspensão oral 40 mg/mL (Componente Básico)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ivermectina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (comprimido 6 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "praziquantel": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (comprimido 600 mg); o MS o distribui aos estados e municípios para a esquistossomose",
    registro: "registrado na Anvisa (um registro ativo no CSV, de Farmanguinhos)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "sofosbuvir-daclatasvir": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Estratégico (sofosbuvir comprimido 400 mg; daclatasvir comprimido 30 mg e 60 mg); dispensação nas unidades dispensadoras de medicamentos, com prescrição da APS conforme o PCDT",
    registro: "registrados na Anvisa (sofosbuvir e dicloridrato de daclatasvir, isolados)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "levotiroxina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (levotiroxina sódica: comprimido 12,5 mcg, 25 mcg, 37,5 mcg, 50 mcg e 100 mcg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "metimazol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (tiamazol: comprimido 5 mg e 10 mg)",
    registro: "registrado na Anvisa (um registro ativo de tiamazol isolado no CSV)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "propiltiouracil": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (propiltiouracila: comprimido 100 mg)",
    registro: "registrado na Anvisa (um registro ativo de propiltiouracila isolada no CSV)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "cianocobalamina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (solução injetável 500 mcg/mL); a forma oral não consta da RENAME 2024",
    registro: "registrado na Anvisa (um registro ativo de cianocobalamina isolada no CSV; a maioria é associação com outras vitaminas do complexo B)",
    f: "Portaria SVS/MS nº 344/1998 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "amoxicilina": {
    receita: "sem controle especial (fora das listas da Portaria 344); antimicrobiano da lista da IN nº 360/2025 — uso sob prescrição com retenção da receita (RDC nº 471/2021); a receita pode ser eletrônica com assinatura avançada; número de vias e validade da receita do antimicrobiano não conferidos no texto da RDC 471 (não baixado) — VERIFICAR",
    sus: "RENAME 2024 — Componente Básico (cápsula 500 mg, comprimido 500 mg e suspensão oral 50 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · Anvisa — RDC nº 973/2025 (altera a RDC nº 471/2021), 2025 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "amoxicilina-clavulanato": {
    receita: "sem controle especial (fora das listas da Portaria 344); amoxicilina e ácido clavulânico estão na lista de antimicrobianos da IN nº 360/2025 — uso sob prescrição com retenção da receita (RDC nº 471/2021); número de vias e validade da receita não conferidos no texto da RDC 471 (não baixado) — VERIFICAR",
    sus: "RENAME 2024 — Componente Básico (comprimido 500 mg + 125 mg e suspensão oral 50 mg/mL + 12,5 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · Anvisa — RDC nº 973/2025 (altera a RDC nº 471/2021), 2025 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "oseltamivir": {
    receita: "sem controle especial (fora das listas da Portaria 344); receituário simples (Guia de manejo e tratamento de influenza 2023, p. 24)",
    sus: "RENAME 2024 — Componente Estratégico (fosfato de oseltamivir cápsula 30 mg, 45 mg e 75 mg); não é da farmácia básica comum — o ponto de retirada em Feira de Santana não foi conferido",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · MS — Guia de manejo e tratamento de influenza, 2023 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "salbutamol": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (suspensão aerossol 100 mcg/dose, solução para inalação 5 mg/mL e solução injetável 0,5 mg/mL); salbutamol 100 mcg e 5 mg também no Aqui Tem Farmácia Popular, sem a forma especificada (PCDT Asma 2026, p. 38)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "brometo-de-ipratropio": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (solução para inalação 0,25 mg/mL e solução aerossol 20 mcg/dose)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "umeclidinio-vilanterol": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Especializado (pó inalatório 62,5 mcg + 25 mcg), pelo PCDT DPOC: exige LME no CEAF, não sai da farmácia da UBS",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "beclometasona": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (solução aerossol 50, 200 e 250 mcg/dose; pó para inalação oral 200 e 400 mcg/dose; cápsula para inalação oral 200 e 400 mcg/dose; suspensão para inalação nasal 50 mcg/dose); beclometasona 50, 200 e 250 mcg também no Aqui Tem Farmácia Popular, sem a forma especificada (PCDT Asma 2026, p. 38)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · MS — PCDT Asma, Portaria Conjunta SAES/SCTIE nº 43, 2026 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "budesonida": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — inalatória no Componente Especializado (aerossol oral, cápsula e pó 200 mcg; cápsula 400 mcg), com LME; suspensão nasal 32, 50 e 64 mcg no Componente Básico",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "formoterol-budesonida": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Especializado (cápsula e pó inalatório 6 mcg + 200 mcg e 12 mcg + 400 mcg), pelo PCDT Asma: exige LME no CEAF, não sai da farmácia da UBS nem da Farmácia Popular",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "prednisolona": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (fosfato sódico de prednisolona, solução oral 1 mg/mL e 3 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ibuprofeno": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (comprimido 200 mg, 300 mg e 600 mg; cápsula 600 mg; suspensão oral 50 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "naproxeno": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Especializado, grupo 2 (comprimido 250 mg e 500 mg); pelos PCDT Dor Crônica (só artrose de joelho ou quadril), Artrite Reumatoide, Artrite Psoríaca, Artrite Reativa, Espondilite Ancilosante e Artrite Idiopática Juvenil, com LME",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "ciclobenzaprina": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "alopurinol": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (comprimido 100 mg e 300 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "nortriptilina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Básico (cápsula 10 mg, 25 mg, 50 mg e 75 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "gabapentina": {
    receita: "C1 — Receita de Controle Especial, em 2 vias",
    sus: "RENAME 2024 — Componente Especializado, grupo 2 (cápsula 300 mg e 400 mg); pelo PCDT Dor Crônica ou pelo PCDT Epilepsia, com LME",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dimenidrinato": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "não consta da RENAME 2024",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "epinefrina": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (solução injetável 1 mg/mL)",
    registro: "registrado na Anvisa (ampola: Adren, Hyfren, Efrinalin, epinefrina genérica); nenhum autoinjetor (caneta) consta entre os registros ativos — o paciente não sai com caneta prescrita pelo SUS nem compra na farmácia",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "prometazina": {
    receita: "sem controle especial (o adendo da lista C1 da Portaria 344 excetua a prometazina)",
    sus: "RENAME 2024 — Componente Básico (solução injetável 25 mg/mL; comprimido 25 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "glicose-hipertonica": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (solução injetável 50%, 10% e 5%); glicose 25% não consta",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "glucagon": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "não consta da RENAME 2024 — a UBS em geral não tem",
    registro: "registrado na Anvisa (GlucaGen, um único registro ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dinitrato-de-isossorbida": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (comprimido sublingual 5 mg)",
    registro: "registrado na Anvisa (Isordil; os demais registros de dinitrato constam como inativos)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "hidrocortisona": {
    receita: "sem controle especial (fora das listas da Portaria 344)",
    sus: "RENAME 2024 — Componente Básico (succinato sódico, pó para solução injetável 100 mg e 500 mg)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "nitrofurantoina": {
    receita: "sem controle especial (fora das listas da Portaria 344); antimicrobiano da IN nº 360/2025: venda com retenção da receita, válida por 10 dias",
    sus: "RENAME 2024 — Componente Básico (cápsula 100 mg; suspensão oral 5 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "fosfomicina": {
    receita: "sem controle especial (fora das listas da Portaria 344); antimicrobiano da IN nº 360/2025: venda com retenção da receita, válida por 10 dias",
    sus: "não consta da RENAME 2024 — a paciente compra",
    registro: "registrado na Anvisa (fosfomicina trometamol, genérico e similares ativos)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "cefalexina": {
    receita: "sem controle especial (fora das listas da Portaria 344); antimicrobiano da IN nº 360/2025: venda com retenção da receita, válida por 10 dias",
    sus: "RENAME 2024 — Componente Básico (cápsula 500 mg; comprimido 500 mg; suspensão oral 50 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "sulfametoxazol-trimetoprima": {
    receita: "sem controle especial (fora das listas da Portaria 344); antimicrobiano da IN nº 360/2025: venda com retenção da receita, válida por 10 dias",
    sus: "RENAME 2024 — Componente Básico (comprimido 400 mg + 80 mg; suspensão oral 40 mg/mL + 8 mg/mL; solução injetável 80 mg/mL + 16 mg/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · Anvisa — Instrução Normativa nº 360/2025 (antimicrobianos e agonistas de GLP-1), 2025 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "permetrina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (loção 1% e loção 5%)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "cetoconazol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (xampu 2%); cetoconazol oral e creme não constam da RENAME",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "nistatina": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (suspensão oral 100.000 UI/mL)",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "itraconazol": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (solução oral 10 mg/mL); cápsula 100 mg nos Componentes Básico e Estratégico",
    registro: "registrado na Anvisa",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "terbinafina": {
    receita: "sem controle especial",
    sus: "não consta da RENAME 2024 — o paciente compra",
    registro: "registrado na Anvisa (cloridrato de terbinafina, genérico ativo)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "dexametasona-creme": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (creme dermatológico 0,1%)",
    registro: "registrado na Anvisa (acetato de dexametasona)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  },
  "hidrocortisona-creme": {
    receita: "sem controle especial",
    sus: "RENAME 2024 — Componente Básico (acetato de hidrocortisona, creme 1%)",
    registro: "registrado na Anvisa (acetato de hidrocortisona)",
    f: "Portaria SVS/MS nº 344/1998 · RDC Anvisa nº 1.036/2026 · RENAME 2024 · Anvisa — dados abertos de medicamentos registrados, consulta em 2026-09-23"
  }
};
