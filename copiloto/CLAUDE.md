# Copiloto Clínico APS — instruções

Apoio à decisão durante o atendimento, para uso próprio do Eric no rodízio de APS II
(USF Tiquaruçu). Roda em `file://`, offline, sem servidor e sem build.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | o app inteiro: CSS, renderer, busca, motor de calculadora |
| `queixas.js` | **conteúdo clínico. Só dados.** É o arquivo que se edita |
| `calculadoras.js` | registro das calculadoras (contém funções puras) |
| `testes.html` | casos de teste + lint de fontes. Abrir no navegador |
| `e2e.mjs` | verificação de interação via Chrome DevTools Protocol |

## Como uma consulta funciona

O app não é um livro de consulta: ele acompanha o atendimento do começo ao fim.

1. Abrir uma queixa **inicia a consulta**. Ela entra em `naConsulta` e passa a aparecer
   marcada como "nesta consulta" na lista.
2. Várias queixas cabem na mesma consulta (HAS + DM2 + a queixa do dia). A marcação
   de uma não zera a da outra.
3. **Red flags são marcáveis.** Marcar significa "procurei e descartei". O botão
   "Revisar consulta" mostra no header quantas ainda faltam.
4. **Revisar consulta** lista, por queixa, o que ficou para trás: red flags não
   descartadas (em vermelho, primeiro) e itens de anamnese e exame em branco.
5. **Novo paciente** encerra: apaga marcações, campos de calculadora e a lista de
   queixas da consulta. É o único lugar onde o estado morre, e morre inteiro.

Tudo isso vive em variáveis JavaScript. Recarregar a página também zera.

## Regra de ouro

**Sem fonte → marcar `VERIFICAR`, nunca inventar.**

Herdada de `../../../30-RECURSOS/medicina-wiki/CLAUDE.md`. Hierarquia de fontes:
MS (PNAB / CAB / PCDT / PNI) > SBMFC > sociedades (SBC, SBD, FEBRASGO, SBP).

**Ler antes de re-pesquisar.** Antes de escrever qualquer conteúdo novo, consultar nesta ordem:

1. `../../../30-RECURSOS/medicina-wiki/wiki/index.md` e as páginas de fatos
2. `../guia-bolso-aps.html` — conteúdo já validado em campo, com fonte citada
3. `../flashcards-aps.md`, `../internato-aps-2026.html`
4. Só então pesquisar fora, e registrar a fonte com data

Dose, corte numérico e limiar de tratamento são a categoria de maior risco.
Na dúvida, escrever o item com `v: true` em vez de escrever um número errado.

## Nada entra vazio

O projeto `../../../projetos/dr-house/` criou 12 checklists e nunca preencheu:
108 seções "A preencher." que apodreceram. **Não repetir.**

- Não criar queixa como esqueleto. Só entra queixa com conteúdo real.
- Não criar seção vazia. Seção ausente não é renderizada — e isso é proposital:
  numa tela clínica, uma seção de red flags vazia lê como "não há com o que se preocupar".

## Como adicionar uma queixa

Acrescentar um `QUEIXAS.push({...})` no fim de `queixas.js`. Nenhum outro arquivo muda.

```js
QUEIXAS.push({
  id: "dor-lombar",                       // kebab-case, único
  nome: "Dor lombar",                     // aparece no card
  kw: "lombalgia coluna ciatica hernia",  // sinônimos p/ busca, sem acento, minúsculo
  tag: "Agudo",                           // Agudo | Crônico | Programa | Registro
  atualizado: "2026-08-05",               // data de hoje, formato ISO

  redflags: {
    fonte: "MS — CAB nº 28",
    itens: [
      "Item como string simples herda a fonte da seção",
      { t: "Item com fonte própria", f: "SBMFC" },
      { t: "Item cuja fonte ainda falta", v: true }
    ]
  },
  perguntas: { fonte: "…", itens: [ ... ] },
  exame:     { fonte: "…", itens: [ ... ] },
  naoperder: { fonte: "…", itens: [ ... ] },
  ddx:       { fonte: "…", itens: [ ... ] },
  exames:    { fonte: "…", itens: [ ... ] },
  conduta:   { fonte: "…", itens: [ ... ] },
  erros:     { fonte: "…", itens: [ ... ] },

  scores: ["imc"]                          // ids de calculadoras.js
});
```

**Chaves de seção** (todas opcionais; omitir é melhor que deixar vazia):
`redflags` · `perguntas` · `exame` · `naoperder` · `ddx` · `exames` · `conduta` · `erros`

**Item** = string **ou** `{ t, f?, v? }` — `t` texto, `f` fonte só deste item,
`v: true` marca `VERIFICAR` (tarja âmbar na tela).

**A ordem na tela é decidida pelo renderer, não pelos dados.** Red flags primeiro e
sempre aberta; `perguntas` e `exame` ganham checkbox por serem as seções que se
executam. Não tentar reordenar pelo `queixas.js`.

### Escrevendo bem para uso com paciente na frente

- Frase curta, resolvida numa linha. Quem lê está com alguém esperando.
- No DDx, colocar a **pista discriminante** junto, separada por travessão:
  `"Vaginite — corrimento e prurido, disúria externa e não interna"`.
- Em "erros comuns", escrever o erro, não a regra: `"Pedir urocultura em toda cistite
  não complicada"` funciona melhor que `"A urocultura é indicada quando…"`.
- Sem emoji. Sem eufemismo.

## Como adicionar uma calculadora

**Regra de corte, não afrouxar sem discutir:** só entra aritmética pura sobre fórmula
publicada inequívoca cujo resultado seja **medida** ou **classificação**. Escore cujo
resultado implique limiar de **tratamento** fica de fora até haver fonte brasileira
datada e conferida. Calculadora errada é pior que nenhuma, porque parece autoridade.

Hoje bloqueadas por essa regra: risco CV (SBC/PREVENT/Framingham), FINDRISC,
CHA₂DS₂-VASc, HAS-BLED, FRAX, AUDIT-C.

Acrescentar em `calculadoras.js` e **sempre** um caso de teste em `testes.html`.

## Verificar antes de dar por pronto

1. `open testes.html` — todos os casos verdes e lint sem seção sem fonte.
2. `open index.html` — a queixa aparece, a busca acha por sinônimo, red flags no topo.
3. Interação completa (opcional, mais lento):
   ```
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
     --remote-debugging-port=9333 --user-data-dir=/tmp/cop-e2e \
     --allow-file-access-from-files about:blank &
   node e2e.mjs
   ```
4. Design: `node ../.impeccable/cli/bin/cli.js detect copiloto/` a partir da raiz do repo.
   Usar `node`, nunca `bun` — jsdom no bun trava por minutos.

O sistema visual está em `../DESIGN.md` e é vinculante: cinco tamanhos de fonte,
três raios, acento verde só para ação e estado. Tamanho literal fora da escala é drift.

## Limites que não se negociam

- **Nenhum dado de paciente é gravado.** Sem `localStorage`, sem `sessionStorage`,
  sem cookie, sem campo de texto livre. O estado dos checkboxes vive só em memória e
  morre no botão "Novo paciente" ou ao recarregar. Levar marcação de um paciente para
  o próximo é dano clínico, não conveniência.
- **Não é prontuário** e não substitui o registro oficial do serviço.
- Se aparecer a vontade de "só um campinho para anotar", isso virou outro produto.
