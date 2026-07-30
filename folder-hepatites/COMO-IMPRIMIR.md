# Como imprimir e dobrar

## Duas versões — escolha uma

| Arquivo | Desenho |
|---|---|
| `folder-hepatites.pdf` | **v1** — azul e âmbar, caixas coloridas, sans-serif. Denso e sinalizado. |
| `folder-hepatites-v2.pdf` | **v2** — editorial. Charter, um acento âmbar, zero caixa, muito branco. |

Ambas têm o mesmo conteúdo e as mesmas fontes do Ministério da Saúde (`FONTES.md`), o mesmo formato e a mesma dobra. Imprima uma de cada e decida no papel — é o único teste que resolve.

O sistema de design da v2 está em `DESIGN.md`. Para rechecar qualquer uma das duas: `./verificar folder-hepatites-v2.html`.

---

**As instruções abaixo valem para as duas** (2 páginas, A4 paisagem).

## Impressão

| Ajuste | Valor |
|---|---|
| Papel | A4 |
| Orientação | Paisagem (horizontal) |
| Frente e verso | **Sim** |
| Virar na borda | **CURTA** (short edge) |
| Escala | **100% / Tamanho real** — nunca "ajustar à página" |
| Cor | Colorido |
| Margens | Nenhuma / mínimas |

> **A escala é o erro mais comum.** Se marcar "ajustar à página", tudo encolhe e as dobras deixam de bater nos terços.

Papel sugerido: sulfite 90g ou couché 115g. Sulfite 75g comum funciona, só fica mais mole.

## Confira antes de rodar 200 cópias

Imprima **uma** e verifique: o verso da capa (HEPATITE B e C) tem de ser o painel **"O que é"**.

Se não for, seu equipamento vira na borda longa — troque para **borda longa** e imprima de novo.

## Dobra

Sanfona (zigue-zague), em três partes iguais de 99 mm. As **linhas tracejadas** no PDF marcam onde dobrar.

```
FACE EXTERNA (impressa na página 1)
┌──────────┬──────────┬──────────┐
│   SUS    │  TESTE   │  CAPA    │
│ de graça │  RÁPIDO  │          │  ← capa à direita
└──────────┴──────────┴──────────┘

Dobre o painel ESQUERDO (SUS) para dentro, por cima do do meio.
Depois dobre o conjunto por trás da CAPA.
Resultado: capa para fora.

FACE INTERNA (página 2) — é o que se lê com o folder aberto
┌──────────┬──────────┬──────────┐
│ O QUE É  │COMO PEGA │ PREVENIR │
│          │ /NÃO PEGA│ E TRATAR │
└──────────┴──────────┴──────────┘
     leitura da esquerda para a direita
```

## Para reeditar

Edite o `.html` e rode a verificação — ela já regenera o PDF e o PNG:

```bash
./verificar folder-hepatites-v2.html
```

O script checa cinco coisas: detector de design do impeccable, **transbordo de painel**, MediaBox, número de páginas e contraste. Rode sempre depois de mexer em texto ou altura.

**Por que o transbordo tem check próprio:** o painel é `overflow:hidden`, então conteúdo a mais é cortado **em silêncio** — o PDF sai bonito e sem erro, com o rodapé faltando. Foi exatamente o que aconteceu na v2 durante a montagem. O mesmo `flex` que corta também esmaga elementos de altura fixa (o filete âmbar sumiu por isso). Olhar o PDF não basta; rode o script.

Conteúdo e rastreabilidade das afirmações: `FONTES.md`. Sistema de design da v2: `DESIGN.md`.
