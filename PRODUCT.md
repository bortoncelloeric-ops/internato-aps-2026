# PRODUCT

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Um único usuário: Eric Bortoncello, interno de medicina da UNEXMED FSA, cursando o rodízio de **APS II na USF Tiquaruçu** (Feira de Santana/BA) desde 20/07/2026. Não é programador — é médico em formação, empresário e tech enthusiast.

Duas situações de uso, distintas e não intercambiáveis:

1. **Estudo** (material existente): sentado, revisando para o ENAMED e para as avaliações do rodízio. Tolera densidade e leitura longa.
2. **Consulta** (o copiloto): de pé ou sentado com um paciente na frente, na USF, sob observação do preceptor. Segundos importam; atenção é o recurso escasso, não tempo.

O usuário tem TDAH misto e TEA nível 1. Isso não é uma nota de acessibilidade genérica: significa que ambiguidade custa caro, que uma tela precisa ser escaneável sem leitura linear, e que fricção de captura mata a ferramenta.

## Product Purpose

Repositório de material clínico e de estudo do internato, publicado como HTML autocontido. Contém hoje o guia de bolso de APS, o material do rodízio, casos de aula, flashcards e um folheto de sala de espera.

A superfície ativa é o **Copiloto Clínico APS**: apoio à decisão durante o atendimento — red flags, checklists de anamnese, diagnósticos diferenciais, "não posso perder", erros comuns e calculadoras que calculam de verdade. Sucesso é chegar da queixa à informação que importa em dois toques e menos de dez segundos.

## Positioning

Um copiloto que carrega o conteúdo clínico **do próprio usuário**, rastreado à hierarquia de fontes brasileiras que ele já mantém (MS/PNAB/CAB/PCDT → SBMFC → sociedades), rodando offline num arquivo local. MDCalc e UpToDate não têm o protocolo da USF nem o recorte do rodízio; um EMR não faz apoio à decisão. A rastreabilidade da fonte, visível na tela, é o mecanismo — não um rodapé jurídico.

## Operating Context

- Roda em `file://` no Mac, aberto com duplo clique. Sem servidor, sem build, sem `npm install`, sem rede.
- O repositório publica por GitHub Pages, mas o copiloto não depende disso.
- Fonte de verdade do conteúdo clínico: `../../30-RECURSOS/medicina-wiki/` (padrão LLM Wiki), cuja regra de ouro é **ler antes de re-pesquisar** e **sem fonte → `VERIFICAR`, nunca inventar**.
- Regras de segurança herdadas de `../../projetos/dr-house/SAFETY.md`: nada de PII, nada de diagnóstico ou prescrição autônoma, toda dose/corte com fonte datada.
- Conteúdo novo entra por prompt ao Claude Code, não por edição de código.

## Capabilities and Constraints

**Faz:** navegação por queixa, busca sem acento, checklists marcáveis, calculadoras declarativas, exibição obrigatória de fonte.

**Não faz, por decisão:** não guarda dado de paciente, não tem campo de texto livre, não persiste estado (`localStorage` proibido — estado de um paciente vazando para o próximo é dano clínico), não é prontuário, não substitui o registro oficial do serviço.

**Restrições técnicas:** um HTML mais dois arquivos de dados carregados por `<script src>` (não `fetch`, que o `file://` bloqueia por CORS). Zero dependência de runtime.

**Corte de calculadora:** entram apenas as de aritmética pura sobre fórmula publicada inequívoca cujo resultado é uma medida ou classificação. Escores cujo output implique limiar de **tratamento** ficam de fora até haver fonte datada e conferida.

**Indefinido:** data de término do rodízio (a planilha da coordenação traz data anterior ao início); se há portfólio exigido.

## Brand Commitments

A identidade visual incumbente é `guia-bolso-aps.html`, já usado em campo — verde clínico `--acc:#0d7a5f` com pares de wash semânticos, header sticky, cards `<details>`, alvos de toque de 44 px. É vinculante: o copiloto estende esse sistema, não propõe outro.

Sem emoji, em nenhuma superfície. Português do Brasil. Terminologia clínica correta e sem eufemismo.

## Evidence on Hand

- `guia-bolso-aps.html` — 466 linhas, sistema visual e mecanismo de busca reaproveitáveis.
- `../../30-RECURSOS/medicina-wiki/wiki/saude-mental-fatos.md` — conteúdo clínico real, com fonte datada (2026-08-03).
- `../../projetos/dr-house/checklists/` — 12 checklists **vazios** ("A preencher." em 9 seções cada). A estrutura serve; o conteúdo não existe.
- `flashcards-aps.md`, `internato-aps-2026.html`, `folder-hepatites/` — material publicado.

**Ausências que não podem ser inventadas:** não existe protocolo da USF Tiquaruçu no repositório; não existe conteúdo clínico pronto para as outras queixas de APS. Preencher isso exige fonte real ou marcação `VERIFICAR` visível.

## Product Principles

1. **Nada entra vazio.** O projeto irmão morreu com 108 seções "A preencher". Seção sem conteúdo não é renderizada — em tela clínica, uma seção de red flags vazia lê como "não há com o que se preocupar".
2. **A fonte é parte do conteúdo.** Toda afirmação exibe origem ou `VERIFICAR` em destaque. Conteúdo sem procedência não vai para a tela silenciosamente.
3. **A ferramenta desaparece dentro da tarefa.** Familiaridade é feature; estranheza sem propósito é o modo de falha.
4. **Red flag primeiro.** Com paciente na frente, o que causa dano é o que passa despercebido — nunca atrás de um clique.
5. **Adicionar conteúdo nunca é escrever código.** Se preencher uma queixa exigir tocar no renderer, o desenho está errado.

## Accessibility & Inclusion

Operação por teclado é requisito de uso, não cortesia: `/` foca a busca e `Esc` volta para a lista, então `focus` visível nunca é removido sem substituto. Alvos de toque ≥44 px. Contraste alto por necessidade real de leitura sob luz de consultório.
