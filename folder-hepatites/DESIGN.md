---
name: Folder Hepatites — sistema editorial
surface: brand
fonts:
  display: Charter
  text: Charter
typeScale: [12, 15, 20, 28, 56]
spacing: [4, 8, 16, 24, 32, 48]
radii: [0]
colors:
  ink: "#17181A"
  inkMuted: "#5A6068"
  accent: "#E8A200"
  rule: "#DCDCD8"
  paper: "#FFFFFF"
---

# Folder Hepatites — sistema de design

**Resumo**: Sistema editorial para peça **impressa** A4 paisagem dobrada em três. Uma família tipográfica, um acento, zero caixas. Hierarquia por tamanho, peso e espaço.

**Superfície**: papel. Sem interação, sem dark mode, sem responsividade.

**Visitor mode**: `Read` nos cinco painéis de conteúdo, `Persuade` no painel de chamada.

---

## Tipografia

**Charter** (Matthew Carter). Uma família só. Desenhada para impressão em baixa resolução — mantém a forma em impressora laser e papel poroso de unidade de saúde. Não está na lista de fontes saturadas do detector.

Family única, então a *Two-Face Rule* não se aplica: a distinção de voz vem de peso e tamanho, não de corte.

| px | pt | Papel |
|---|---|---|
| 12 | 9 | Nota de rodapé, marcador curto em caixa-alta |
| 15 | 11,25 | **Corpo** |
| 20 | 15 | Lead, abertura de painel |
| 28 | 21 | Título de painel |
| 56 | 42 | Display (capa) |

Razões entre degraus: 1,25 · 1,33 · 1,40 · 2,0 — todas ≥1,25.

- Corpo: `line-height 1.55`, tracking 0, **alinhado à esquerda** (nunca justificado).
- Caixa-alta só em marcadores de até três palavras, tracking `0.08em`.
- Display: tracking `-0.02em`. Piso absoluto: `-0.04em`.

## Espaçamento

Escala fechada, base 4: **4 · 8 · 16 · 24 · 32 · 48**.

Ritmo obrigatório: **40px acima de um título, 16px abaixo.** Um título pertence ao que vem depois dele, não ao que veio antes.

Margem interna do painel: **34px** nas laterais. Isso é a margem de segurança da dobra — nenhum elemento entra na zona de vinco.

## Cor

Um acento só. O âmbar é o do Julho Amarelo, campanha nacional de hepatites virais.

| Token | Valor | Papel |
|---|---|---|
| `--ink` | `#17181A` | Texto primário |
| `--ink-muted` | `#5A6068` | Secundário, nota |
| `--accent` | `#E8A200` | **Só em escala display e preenchimento sólido** |
| `--rule` | `#DCDCD8` | Hairline |
| papel | sem tinta | Fundo |

**Gold-By-Size-On-Paper.** O âmbar reprova contraste em corpo sobre papel claro. Ele nunca colore texto pequeno. Aparece como: filete sob título, preenchimento sólido do bloco de chamada, e o ícone de display da capa. Sobre preenchimento âmbar o texto é `--ink`, nunca cinza.

## Elevação

**Declarada uma vez: hairline de 1px.** Zero sombra. Zero card. Zero canto arredondado. A peça é impressa: sombra em CMYK vira sujeira e banding.

## Ícones

Healthicons (biblioteca real, licença livre), tingidos por máscara CSS. Uso escasso e funcional: o **laço na capa** em escala display (88px), e a lista de serviços do SUS, onde ajudam a varrer. **Nunca acima de um título, nunca dentro de um quadrado.**

**O laço é a marca da peça.** É o símbolo do Julho Amarelo, campanha nacional de hepatites virais — dá reconhecimento imediato antes de qualquer leitura. Usar a versão **cheia**, nunca a de contorno: haste fina fecha em impressora laser sobre papel poroso de unidade de saúde.

---

## Desvios deliberados das regras do impeccable

**1. Branco puro no fundo.** Regra de tela. No papel o branco é o substrato — imprimir uma camada de tinta clara na folha inteira custa dinheiro, suja em laser e produz banding. Fundo sem tinta. A regra irmã, *nunca preto puro*, é mantida: o texto é `#17181A`.

**2. Medida de leitura curta.** `line-length` pede 45–75 caracteres; um painel de 99mm dá cerca de 42 a 15px. A correção "certa" seria reduzir o corpo, e não vou: é sala de espera de UBS, com idosos e baixa escolaridade lendo. Waiver inline registrado no HTML com justificativa.

## Do not

- Rótulo pequeno acima de um título. Banimento absoluto.
- Números de seção. A sequência já é dada pela dobra.
- Card, card aninhado, borda lateral colorida grossa, ícone em quadrado arredondado.
- Gradiente, glow, vidro, sombra.
- Texto justificado sem hifenização.
- Cinza sobre superfície colorida.
- Emoji ou glifo Unicode no lugar de ícone.
