# Internato — APS II · 1º Rodízio (2026.2)

**Status:** guia de bolso v1 + Blocos 0 e 1 completos · **Atualizado:** 19/07/2026
**Publicado:** https://bortoncelloeric-ops.github.io/internato-aps-2026/

Material de estudo e de campo do 1º rodízio do 2º semestre. Sucede
[[../internato-provas-2026-06/index|Provas Junho/2026]], de onde vêm o padrão de HTML,
o formato de flashcards e o simulador de OSCE.

---

## O rodízio

| Campo | Valor |
|---|---|
| Código | P15a · Grupo E |
| Unidade | USF Tiquaruçu (equipe única) |
| Início | 20/07/2026 |
| Término | `VERIFICAR` — planilha diz "09/07/26", anterior ao início (erro de digitação) |

**Semana padrão:** 8 turnos na equipe + 1 turno janela verde + **terça 14h–18h teórica na UNEX**
(Curso Preparatório de APS para Residência Médica, presença obrigatória).

**Restrição central:** o Eric **não teve APS I**. As 7 temáticas oficiais assumem uma base
(SUS, PNAB, território, e-SUS/CIAP, programas do MS) que ele não recebeu — daí os blocos 0 e 8,
que a ementa não prevê.

---

## Fontes — decisão

O **ENAMED não publica bibliografia**. A Portaria Inep nº 478/2025 institui a Matriz de
Referência Comum e lista áreas, competências e conteúdos — nenhum livro. O Edital ENAMED 2026
(nº 71/2026) fixa em vez disso um **marco temporal normativo: 03/07/2026**.

Duas consequências que orientam todo o material:

1. **Documento do MS vale mais que livro-texto** — é gratuito, oficial e mais atual.
2. **APS é o cenário da prova, não uma matéria dela.** Portaria 478/2025, Art. 7º §único:
   os exames priorizam "os cenários da Atenção Primária e Secundária, sobretudo os espaços
   de atuação médica comunitária".

**Hierarquia:** MS (PNAB, CAB, PCDT, PNI, INCA) > SBMFC > sociedades de especialidade.
Todo corte/idade/dose citado com fonte e data, **≤ 03/07/2026**.
Fatos de junho já calibrados ficam em [[../../../30-RECURSOS/medicina-wiki/wiki/index|medicina-wiki]] — ler antes de re-pesquisar.

**Política:** nada entra na wiki nem no HTML a partir de cópia não licenciada de obra
protegida — o material é publicado em link público. Livros consultados por canal legítimo
(Minha Biblioteca / AccessArtmed via UNEX, a verificar) orientam o estudo; o que o material
cita são as fontes oficiais.

---

## Os 9 blocos

| # | Bloco | Origem | Status |
|---|---|---|---|
| 0 | Base de APS (SUS, PNAB, SOAP/CIAP, financiamento, epidemiologia) | lacuna do APS I | ✅ |
| 1 | Comunicação, raciocínio centrado na pessoa, bioética | temática oficial | ✅ |
| 2 | Gestão da clínica, equipe, interprofissionalidade | temática oficial | ⬜ |
| 3 | Cardiorrenal-metabólica (DM, HAS, IC) | temática oficial | ⬜ |
| 4 | Digestivo-nutricional-metabólica (tireoide, GI) | temática oficial | ⬜ |
| 5 | Pulmonar/respiratória (DPOC, asma, agudas, TB) | temática oficial | ⬜ |
| 6 | Neuromuscular e musculoesquelética (dor crônica, neuro) | temática oficial | ⬜ |
| 7 | Urgências e emergências na APS | temática oficial | ⬜ |
| 8 | Rotina da unidade (pré-natal, puericultura, vacina, mental, ISTs) | vai atender no campo | ⬜ |

---

## Material produzido

- `guia-bolso-aps.html` — **guia de bolso v1** ✅ 16 cards, busca com sinônimos,
  mobile-first. Cobre: SOAP · MCCP · CIAP-2 · acolhimento · pré-natal · puericultura ·
  vacinação · planos A/B/C · dengue · anafilaxia · hipoglicemia · asma/convulsão/dor
  torácica · HAS e DM2 · saúde mental · encaminhamento · atributos da APS.
- `index.html` — página inicial do site publicado.
- `internato-aps-2026.html` — **HTML de estudo** ✅ Bloco 1 completo (MCCP e os 4 componentes,
  roteiro prático de consulta em 9 passos, SPIKES, entrevista motivacional, estágios de mudança,
  bioética, sigilo, adolescente, documentos médicos) + **26 questões comentadas estilo ENAMED** (14 no Bloco 0, 12 no Bloco 1).
  Blocos 2–8 com esqueleto e âncora, marcados "a construir".
- `flashcards-aps.md` / `.txt` — **Anki** ✅ 112 cartões (63 do Bloco 0 + 49 do Bloco 1)
- `export-anki.py` — script `.md → .txt` TAB, com validação (custo zero de token)
- `osce-casos/aps-01..03.json` — estações simuladas ⬜

## Convenções

- Resumos em tabela escaneável, fato de prova em destaque, fonte citada ao lado do corte.
- Questões em **estilo ENAMED**: caso clínico em cenário de APS, 4 alternativas, gabarito
  comentado (por que a certa acerta + por que cada errada erra).
- Flashcards `frente;verso`, um fato por cartão, exportados para `.txt` separado por TAB.
- Sem fonte → marcar `VERIFICAR`. Nunca inventar corte, idade ou dose.

## Achados que corrigem material desatualizado

1. **Previne Brasil não é mais o modelo de financiamento.** A Portaria nº 2.979/2019 foi
   substituída pelo novo cofinanciamento federal da APS — **Portaria GM/MS nº 3.493/2024**,
   atualizada pela **nº 6.907/2025**. Ensinar "os 7 indicadores do Previne" é ensinar modelo
   revogado. `VERIFICAR` ainda: número e nome exatos dos componentes (fontes secundárias
   divergem entre 3 e 5) e a lista dos novos indicadores — o portal do MS bloqueou acesso automatizado.
2. **NASF-AB não existe mais.** Substituído pelas **eMulti** (Portaria GM/MS nº 635/2023),
   modalidades Ampliada, Complementar e Estratégica.
3. **PNAB 2.436/2017 segue vigente** — sem indício de substituição.
4. **Provável erro na `medicina-wiki`:** ela registra "EC 29: União = IPCA". A correção pelo
   IPCA era a regra da **EC 95/2016**, substituída pelo novo arcabouço fiscal em 2023.
   Estados 12% e Municípios 15% seguem válidos. **Corrigir a wiki.**

## Pendências

1. Data de término do rodízio (planilha com erro)
2. Datas das provas da faculdade (APA/OSCE/ATI)
3. Ordem das 7 temáticas nas terças
4. UNEX dá acesso ao Minha Biblioteca / AccessArtmed?
