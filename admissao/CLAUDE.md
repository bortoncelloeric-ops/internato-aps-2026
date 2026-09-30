# Admissão psiquiátrica — instruções

Ficha de admissão da **emergência psiquiátrica do HELR** cujo checklist ✗/✓ **escreve o
prontuário**. O Eric preenche no notebook ou no **celular**, clica em Copiar e leva o texto para o
PC do hospital pelo **WhatsApp para si mesmo**. Publicada no mesmo repo do copiloto, em
`admissao/` (GitHub Pages: `/internato-aps-2026/admissao/`), **separada do copiloto de propósito**:
o copiloto não é prontuário e tem um só campo de texto livre; esta página é outro produto e as
duas regras não valem aqui. **Não editar nada em `../copiloto/` a partir deste projeto.**

Origem: protótipo de 30/09/2026 em
`../../internato-sm-sc-2026-2/prototipo-admissao/` (`DECISOES.md` tem as 10 decisões do Eric).
Formato da nota: handoff do Hermes
`/Users/fhilipe/Downloads/hermes_cofre/.hermes/plans/2026-09-30_114348-anamnese-psiquiatrica-modelos-handoff.md`
(Zuardi 1996 + Cordioli 2005 + APA 2015).

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | o app inteiro: CSS, ficha base, gerador do texto, tela, eventos |
| `quadros.js` | **conteúdo clínico dos quadros. Só dados.** É o arquivo que se edita para acrescentar quadro |
| `../copiloto/psicofarmacos.js` | LIDO, não copiado: dose, rótulo e fonte de cada fármaco |
| `../copiloto/queixas.js` | LIDO, não copiado: red flags, diferenciais e formulário de cada quadro (campo `queixa`) |
| `teste/teste.mjs` | e2e via Chrome DevTools Protocol (porta 9335) |
| `teste/dados.mjs` | validação dos dados do `quadros.js` em node puro |
| `teste/esperado.txt` | texto do caso de exemplo, palavra por palavra |

Ordem das tags `<script>`: `psicofarmacos.js`, `queixas.js`, `quadros.js`, depois o script do app.

## Invariantes (não se negociam)

1. **Nada é gravado.** Sem `localStorage`, `sessionStorage`, cookie, IndexedDB, `fetch` ou rede.
   O estado vive em memória; "Nova admissão" ou recarregar apagam. O aviso de "sair mesmo?"
   (`beforeunload`) é a única proteção contra perder o preenchido.
2. **O texto vai para o WhatsApp:** nunca tem nome, nº de prontuário ou nascimento; não usa `*`,
   `_` ou `~` (formatação do WhatsApp) — a única exceção é o marcador de dose vazia `___`;
   títulos de seção em CAIXA ALTA; sem rodapé.
3. **"Não avaliado" nunca vira "nega".** Item não tocado entra no fecho da seção:
   `Não avaliado: a, b.`; seção inteira intocada sai `Não avaliado nesta consulta.`
4. Sub-critério que só vale com o pai ✓ (plano, meio, intenção) não vira lacuna quando o pai é ✗.
5. Sinais vitais vazios → `Não aferido: FR, HGT.` / `Sinais vitais não aferidos.`
6. **Estimativa de risco é escolha do médico**; o app não calcula escore nenhum.
7. **Dose só vem do `psicofarmacos.js`.** Só vira botão (chip) a linha de `dose` com número em
   mg/mcg, sempre com o RÓTULO (Dose usual · Idoso · Criança…) e a FONTE no botão. Fármaco com
   `v: true` não mostra dose. O caso de exemplo deixa a dose `___` (o handoff proíbe dose
   apresentada como conduta em exemplo).
8. **`quadros.js` nunca escreve dose**: nenhum número seguido de mg, mcg, g, mL, UI ou mEq.
9. Racional da prescrição = `papel` do formulário da queixa para aquele fármaco, a menos que o
   médico já tenha escrito outro.
10. "Exame normal" só sai do que foi marcado. O atalho "Sem alterações nos achados" marca ✗ só no
    que ainda não foi avaliado e nunca sobrescreve um ✓.

## Esquema do `quadros.js` (contrato entre dados e app)

```js
var QUADROS = [
  {
    id: 'mania',                    // kebab-case, único
    nome: 'Mania',                  // rótulo do botão (curto: cabe no celular)
    queixa: 'transtorno-bipolar',   // id em QUEIXAS do copiloto — red flags, ddx e formulário vêm de lá
    fonte: '…',                     // fonte dos ITENS deste quadro (string exata usada no copiloto)
    blocos: {                       // chave = id de seção da ficha base
      hda: {
        rot: 'Revisão de sintomas — mania',            // subtítulo na tela
        grupos: { rev: {pre: 'Revisão de mania: ', conj: ' e '},
                  revneg: {pre: 'Nega ', conj: ' e '} },
        itens: [ /* itens, mesmo formato da ficha base */ ]
      },
      ef: { rot: 'Achados dirigidos — mania', itens: [ … ] }
    }
  }
];
```

Seções que um bloco pode estender: `hda`, `pregressa`, `subst`, `clinica`, `ef`, `eem`, `risco`,
`hetero`. O app insere os itens do bloco **no fim da seção**, na ordem de `QUADROS`, com o `rot`
como subtítulo; no texto, cada bloco começa em linha nova e as lacunas de todos os blocos entram
no MESMO `Não avaliado:` da seção. Chaves de `grupos` são locais ao bloco (o app prefixa).

**Itens** (iguais aos da ficha base do `index.html`):

- `{tipo:'tri', id, rot, sim, nao, na?, det?, sub?}` — ✗ / ✓ / nada. `sim`/`nao` são frase
  própria (string: vira frase com maiúscula e ponto) **ou** `{g, t}` para entrar num grupo.
  `det` abre com ✓: `{tipo:'texto', ph}` (o detalhe entra no `{d}`; trecho entre `[ ]` some sem
  detalhe) ou `{tipo:'escolha', multi?, substitui?, opts}`. `sub`: `[{id, rot, sim, nao, na?}]`,
  só perguntado com o pai ✓.
- `{tipo:'escolha', id, rot, opts:[{v, rot, frase?, so?}], multi?, tpl?, tplN?, na?, junto?}` —
  pílulas. `frase` padrão = `rot`. `so: true` = opção exclusiva ("sem alterações"): marcá-la
  desmarca as outras e vice-versa.
- `{tipo:'texto', id, rot, ph?, fmt?, na?, curto?}` — campo livre.

**Regras de texto dos itens:** frase começa minúscula e não termina em ponto (o app monta a frase);
sem `*`, `_`, `~`; sem dose; `{a}` → a/o e `{ao}` → à/ao pelo campo Sexo. `na` curto quando o
`rot` é longo ou tem pergunta. **Ids únicos** na ficha inteira, com prefixo do quadro
(`man-sono`). A mesma pergunta em dois quadros usa o MESMO id e o mesmo objeto: o app mostra uma
vez só, no primeiro quadro marcado. Não repetir item que já existe na ficha base.

**Nada entra vazio.** Quadro sem conteúdo real não entra; seção de bloco sem item não existe.

## Tela

- Até 979 px: uma coluna, alvos de toque ≥ 44 px, campos com fonte de 16 px (abaixo disso o iOS
  dá zoom ao focar), barra fixa embaixo com Nova admissão · Ver texto · Copiar. Sem rolagem
  horizontal da página em 360 px.
- A partir de 980 px: ficha à esquerda, texto gerado fixo à direita.
- Sistema visual: `../DESIGN.md` (vinculante). Vermelho só em red flag, âmbar só em VERIFICAR.

## Verificar antes de dar por pronto

```
node teste/dados.mjs
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --remote-debugging-port=9335 --user-data-dir=/tmp/adm-e2e \
  --allow-file-access-from-files about:blank &
node teste/teste.mjs
```

## Armadilhas já pagas (valem aqui)

- **`--window-size` do Chrome headless mente**: pedir 390 renderiza 500. Largura de celular só com
  CDP `Emulation.setDeviceMetricsOverride` (`mobile: true`), e overflow se mede por
  `scrollWidth > clientWidth`, nunca por `innerWidth` (ele cresce junto com o conteúdo que vaza).
- Dentro de template literal do e2e, `\d` vira `d` e `\/` fecha a regex: usar `[0-9]`,
  `new RegExp('…')` ou `.includes()`.
- `innerText` devolve vazio em `<details>` fechado: usar `textContent`.
- GitHub Pages serve a versão velha com HTTP 200 por 40–60 s: conferir por CONTEÚDO.
- Repo: conferir a branch (`main`) antes de commitar; há arquivos alheios em stage — **nunca
  `git commit -a`**, sempre `git commit -- admissao/`.
