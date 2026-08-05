---
name: Internato APS 2026.2
description: Sistema clínico claro para material de bolso e apoio à decisão em atenção primária.
colors:
  acc: "#0d7a5f"
  acc-w: "#e8f4f0"
  red: "#c0392b"
  red-w: "#fdecea"
  amb: "#9a6700"
  amb-w: "#fff6e0"
  blu: "#1f5f9e"
  blu-w: "#eaf2fb"
  bg: "#f6f7f8"
  card: "#ffffff"
  ink: "#16191d"
  mut: "#5d666f"
  line: "#e2e6ea"
  shadow-ambient: "rgba(0,0,0,.14)"
typography:
  tag:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.06em"
  section-label:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.09em"
  field:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-wide:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
rounded:
  sm: "5px"
  md: "10px"
  lg: "12px"
spacing:
  xs: "0.28rem"
  sm: "0.55rem"
  md: "0.85rem"
  lg: "1.6rem"
components:
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.85rem 0.95rem"
  card-summary:
    typography: "{typography.card-title}"
    height: "44px"
    padding: "0.85rem 0.95rem"
  header:
    backgroundColor: "{colors.acc}"
    textColor: "#ffffff"
    padding: "0.7rem 0.9rem"
  search-input:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.72rem 0.9rem"
  tag-urgente:
    backgroundColor: "{colors.red-w}"
    textColor: "{colors.red}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.42rem"
    typography: "{typography.tag}"
  tag-rotina:
    backgroundColor: "{colors.acc-w}"
    textColor: "{colors.acc}"
    rounded: "{rounded.sm}"
    padding: "0.2rem 0.42rem"
    typography: "{typography.tag}"
  button-primary:
    backgroundColor: "{colors.acc}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.6rem 0.9rem"
    height: "44px"
---

# Design System: Internato APS 2026.2

## Overview

Sistema clínico claro, desenhado para leitura em pé, sob luz de consultório, com um paciente na frente. A referência mental é guia de bolso impresso, não dashboard: superfície branca sobre cinza frio, uma única cor de marca (verde clínico), e cores restantes usadas apenas como semântica de gravidade.

O repositório contém **dois** sistemas, e eles não se misturam:

1. **Clínico claro** (este documento) — `index.html`, `guia-bolso-aps.html` e o copiloto. É o sistema normativo para qualquer superfície interativa ou de uso em campo.
2. **Estudo escuro** — apenas `internato-aps-2026.html`, um documento longo de leitura sentada (`--bg:#0f1115`, `--accent:#5b9dff`). Não estender para superfícies novas.

Modo de operação: **Operate**. A ferramenta deve desaparecer dentro da tarefa. Familiaridade é feature; estranheza sem propósito é o modo de falha.

## Colors

### Primary

`acc` `#0d7a5f` — verde clínico. Único portador de identidade. Usado no header sólido, na ação primária e como indicador de estado ativo. **Nunca como decoração.**

### Semantic

Cada cor semântica tem um par `-w` (wash) para fundo, garantindo texto escuro sobre fundo claro em vez de texto claro sobre cor saturada.

| Token | Cor | Wash | Significado |
|---|---|---|---|
| `red` | `#c0392b` | `#fdecea` | Red flag, gravidade, "não posso perder" |
| `amb` | `#9a6700` | `#fff6e0` | `VERIFICAR`, pendência, atenção |
| `blu` | `#1f5f9e` | `#eaf2fb` | Informação, referência, programa |
| `acc` | `#0d7a5f` | `#e8f4f0` | Rotina, confirmado, ação |

### Neutral

`bg` `#f6f7f8` (fundo da página) · `card` `#ffffff` (superfície elevada) · `ink` `#16191d` (texto) · `mut` `#5d666f` (texto secundário e rótulos) · `line` `#e2e6ea` (borda de 1 px).

### Named Rules

- **Vermelho é reservado.** Só red flag e gravidade clínica. Nunca erro de formulário, nunca destaque estético.
- **Âmbar significa dívida declarada.** É a cor do `VERIFICAR` — conteúdo sem fonte confirmada. Não usar para nada além disso.
- **Uma cor por significado.** Se um novo estado precisa de cor, ele primeiro precisa de significado.

## Typography

Uma família só: a pilha de sistema. Não há pareamento display/corpo — é UI de produto, e o texto é clínico, não editorial.

Escala **fixa em `rem`, nunca fluida**. Nada de `clamp()`: o usuário lê em DPI constante, e título que encolhe conforme o container piora a leitura.

### Hierarchy

Cinco degraus, razão ~1,17 — a faixa apertada que UI de produto pede. Toda superfície nova usa **só** estes; tamanho literal fora da escala é drift, não decisão.

| Token | Tamanho | Onde |
|---|---|---|
| `--fs-xs` | 0.625rem | tag, selo VERIFICAR |
| `--fs-sm` | 0.75rem | rótulo de seção, procedência, metadados, contador |
| `--fs-md` | 0.875rem | rótulo de campo, controles de formulário, texto auxiliar |
| `--fs-lg` | 1rem | corpo, título de card |
| `--fs-xl` | 1.125rem | `h1`, resultado de calculadora, marca no header |

Base do corpo: 16px, subindo para **17px a partir de 640px**. Isso é aumento de base, não um sexto degrau — a escala inteira acompanha.

Pesos carregam a hierarquia junto com o tamanho: 800 (tag), 700 (rótulo de seção), 600 (título), 400 (corpo).

### Named Rules

- **Rótulo de seção é pequeno e discreto**, não grande e forte. A hierarquia vem do peso e da caixa alta, não do tamanho — assim o conteúdo clínico domina a tela.
- **Nunca `text-transform: uppercase` em texto clínico.** Só em rótulo estrutural e tag.

## Layout

Coluna única, `max-width` 820px, centrada. Sem sidebar, sem grid de colunas — a tela é operada com uma mão e lida de cima para baixo.

- Header `sticky` no topo, com a busca dentro dele. A busca nunca sai de alcance.
- `padding-bottom: 4rem` no corpo, para o último card não colar no fim da tela.
- `env(safe-area-inset)` respeitado no header.
- Responsividade é **estrutural**, não tipográfica: tabelas ganham `overflow-x` em `.wrap`; a coluna de rótulo de `table.def` cai de 34% para 30% abaixo de 420px.
- Único breakpoint real: 640px (corpo vai a 17px).

## Elevation & Depth

Profundidade é mínima e funcional. Superfície de card se distingue do fundo por **borda de 1 px**, não por sombra.

| Nome | Valor | Uso |
|---|---|---|
| `--shadow` | `0 2px 10px rgba(0,0,0,.14)` | única sombra do sistema; separa o header sticky do conteúdo que rola sob ele |

Cards, tags e callouts não têm sombra. Um card dentro de outro card é proibido.

## Shapes

Três raios, e só três: `--rs` 5px (tag, selo) · `--rm` 10px (input, botão, checkbox, item destacado) · `--r` 12px (card, seção).

Foco usa `--ring` (`0 0 0 3px rgba(13,122,95,.35)`), nunca `outline:none` sem substituto.

Callout (`.box`) usa borda-esquerda de 3 px na cor semântica e raio assimétrico `0 8px 8px 0` — a barra vertical carrega o significado, o raio só suaviza a saída.

## Components

Todo componente interativo carrega os cinco estados: `default · hover · focus · active · disabled`. `focus` visível nunca é removido sem substituto — a navegação por teclado (`/` foca a busca, `Esc` volta) é requisito de uso.

- **Card `<details>`** — `summary` com `min-height: 44px`, marcador nativo removido, chevron `›` rotacionado por `transform` em 150ms. Aberto ganha borda inferior no summary.
- **Busca** — input dentro do header verde, fundo branco, `focus` com `outline: 3px solid rgba(255,255,255,.55)`. Contador de resultados abaixo, em 0.75rem.
- **Tag** — pastilha de wash + texto na cor semântica, à esquerda do título do card.
- **Callout `.box`** — barra esquerda de 3px, fundo wash, rótulo em caixa alta de 0.72rem na cor semântica.
- **Tabela** — cabeçalho em 0.7rem caixa alta cor `mut`; primeira coluna em peso 600; linha separada por `border-bottom` de 1px.
- **Botão primário** — o único lugar onde `acc` vira fundo sólido em um controle.

Motion: 150–250ms, apenas para transmitir estado. Sem sequência coreografada na carga da página.

## Do's and Don'ts

**Do**

- Reusar os tokens acima em qualquer superfície nova. O sistema é vinculante, não sugestão.
- Manter densidade: informação clínica junta é uma virtude, não um problema de respiro.
- Exibir a procedência do conteúdo (`.src`) junto do conteúdo, não escondida em rodapé.
- Alvos de toque ≥44px em tudo que é clicável.

**Don't**

- Emoji. Em nenhuma superfície.
- Sombra para criar hierarquia — use borda e espaço.
- Card dentro de card.
- Tipografia fluida (`clamp()`) em UI.
- Vermelho ou âmbar fora do significado clínico definido acima.
- Gradiente, ícone em tile arredondado acima de título, ou qualquer ornamento sem função.
- Modal. Conteúdo abre inline; se algo precisar sobrepor, use `<dialog>` ou `position: fixed` para escapar de container com `overflow`.

---

*Sidecar `.impeccable/design.json` deliberadamente não gerado: neste repositório `.impeccable/` é o submódulo git do próprio Impeccable, e escrever estado lá sujaria o submódulo. Sombras, movimento e breakpoints estão nas seções canônicas acima.*
