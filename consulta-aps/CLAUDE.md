# Consulta na USF (APS I) — instruções

Ficha da **consulta na USF Viveiros II** (Feira de Santana, APS I, 26/10 a 13/12/2026) cujo checklist
✗/✓ **escreve o texto do sistema da unidade**. Página irmã da `../admissao/` (mesmo motor, outro produto),
separada do copiloto de propósito: o copiloto não é prontuário; esta página escreve registro. Publicada em
`/internato-aps-2026/consulta-aps/`. **Não editar nada em `../copiloto/` a partir deste projeto** — os dados
de lá são LIDOS, nunca copiados.

## Formato do texto (decidido com o Eric em 26/10/2026, pelas fotos do sistema da unidade)

- O sistema da Viveiros II **não é o PEC/SOAP**: tem os campos **Queixas Principais · Anamnese · Exame
  Físico · Conduta** e um campo de **CID/CIAP**. A página gera **um bloco por campo, cada um com o próprio
  Copiar**, mais "Copiar tudo" (com o título de cada campo).
- **CAIXA ALTA**, como a preceptora escreve. A frase sai no estilo dela: `PACIENTE DE 50 ANOS, PORTADORA
  DE HAS, NEGA ALERGIA MEDICAMENTOSA.` · `HV: ETILISMO SOCIAL, NEGA TABAGISMO, SEDENTÁRIA.` · `HF: …` ·
  `EM USO: LOSARTANA 50 MG (1-0-0) / …` · `AOS EXAMES: …` · na conduta, `ORIENTO SOBRE …`, `SOLICITO …`,
  `PRESCREVO:` e uma linha por fármaco, `ORIENTAÇÕES GERAIS`. As fotos são referência, não regra.
- O texto vai **pelo WhatsApp ou direto no PC da USF**: nunca usa `*`, `_` ou `~` (a única exceção é o
  marcador de dose vazia `___`). Sem rodapé.

## Invariantes (não se negociam)

1. **Nada é gravado.** Sem `localStorage`, `sessionStorage`, cookie, IndexedDB, `fetch` ou rede. "Nova
   consulta" ou recarregar apagam; `beforeunload` é a única proteção.
2. **Sem PII**: nunca nome, nº de prontuário, CNS nem data de nascimento.
3. **"Não avaliado" nunca vira "nega".** Item da ficha BASE não tocado fica fora do texto. Item de QUADRO
   marcado não tocado entra no fecho da seção: `NÃO AVALIADO: A, B.` (só os itens dos quadros marcados,
   nunca o exame base inteiro).
4. Sub-item só é perguntado com o pai ✓; com o pai ✗ ou intocado, nunca vira lacuna.
5. **Dose só vem dos registros** (`../copiloto/farmacos-aps.js` e `../copiloto/psicofarmacos.js`), como
   botão (chip) com o rótulo da linha e a fonte (com a página). Cartão `v: true` não mostra dose. O caso
   de exemplo deixa a dose `___`. Fármaco fora dos registros entra digitado ("outro"), sem chip.
6. **O app não calcula escore de tratamento.** Calcula só medida (IMC, escore-z da OMS, IG e DPP) com as
   calculadoras do copiloto (`calculadoras.js`, lidas de lá).
7. **Código só da tabela** (`codigos.js`, gerado das fontes oficiais com `ferramentas/gerar-codigos.mjs`):
   CIAP-2 da tradução WONCA/SBMFC (2ª ed., 2009, com a página) e CID-10 do DATASUS (V2008). Código fora da
   tabela sai `VERIFICAR` na tela e no texto. Quadro que pede código inexistente faz o gerador falhar.
8. `quadros.js` **nunca escreve dose**: nenhum número seguido de mg, mcg, g, mL, UI ou mEq.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | o app inteiro: CSS, ficha base, gerador do texto, tela, eventos |
| `quadros.js` | **conteúdo dos quadros e o caso de exemplo. Só dados.** É o arquivo que se edita |
| `codigos.js` | **gerado** — tabela CIAP-2 e CID-10 (não editar à mão) |
| `ferramentas/gerar-codigos.mjs` | regenera `codigos.js` a partir de `../../internato-aps1-2026-2/copiloto-onda-aps1/raw/` |
| `teste/dados.mjs` | validação dos dados do `quadros.js` em node puro |
| `teste/teste.mjs` | e2e via Chrome DevTools Protocol (porta em `CDP_PORT`, padrão 9337) |
| `teste/esperado.txt` | texto do caso de exemplo, palavra por palavra |
| `teste/saidas.mjs` | gera `teste/saidas/` (texto de cada quadro: tudo ✓ / tudo ✗ / intocado; telas 390 e 1280) |

Ordem das tags `<script>`: `queixas.js`, `queixas-aps.js`, `psicofarmacos.js`, `farmacos-aps.js`,
`oms-lms.js`, `calculadoras.js` (todos do copiloto), `codigos.js`, `quadros.js`, o script do app.

## Esquema do `quadros.js`

```js
var QUADROS = [
  {
    id: 'has-dm',                    // kebab-case, único
    nome: 'HAS / DM',                // rótulo do botão (curto: cabe no celular)
    queixa: 'has-dm2-aps',           // id em QUEIXAS do copiloto: "Não perder" e formulário vêm de lá (obrigatório)
    grupo: 'outros',                 // opcional: sem a chave = "Programas da USF"
    fonte: '…',                      // fonte dos ITENS deste quadro (strings canônicas, partes com ' · ')
    ciap: ['K86', 'T90'],            // sugestões de CIAP-2 (têm de existir na fonte)
    cid: ['I10', 'E11.9'],           // sugestões de CID-10 (têm de existir no CSV do DATASUS)
    blocos: {                        // chave = seção da ficha: anamnese | ef | conduta
      anamnese: { rot: 'HAS / DM — controle', itens: [ /* itens */ ] },
      ef:       { rot: '…', itens: [ … ] },
      conduta:  { rot: '…', itens: [ … ] }
    }
  }
];
var EXEMPLO = { /* estado do caso de exemplo — MODELO DIDÁTICO, inventado, sem dose */ };
```

**Itens** (o mesmo formato da admissão, com três acréscimos):
- `{tipo:'tri', id, rot, sim, nao, simSemDet?, det?, sub?, na?, junto?, lacuna?}` — ✗ / ✓ / nada. `sim`/`nao` são
  frase (começa minúscula, sem ponto final; o app monta). `det` abre com ✓: `{tipo:'texto', ph}` (o detalhe entra
  em `{d}`; trecho entre `[ ]` some sem detalhe) ou `{tipo:'escolha', multi?, opts}`. **`simSemDet`**: frase do ✓
  quando o detalhe fica vazio. `sub`: `[{id, rot, sim, nao, na?}]`, só com o pai ✓.
- `{tipo:'escolha', id, rot, opts:[{v, rot, frase?, so?}], multi?, tpl?, tplN?, junto?}` — pílulas.
- `{tipo:'texto', id, rot, ph?, fmt?, na?, curto?, area?, linha?}` — campo livre.
- **`{tipo:'data', id, rot, calc:'dpp', na?}`** — data; com `calc:'dpp'` escreve `DUM …, IG …, DPP …` (Näegele, a
  calculadora do copiloto).
- **`{tipo:'linha', pre:'HV: '}`** — começa linha nova com prefixo; some se a linha ficar vazia (só na ficha base).
- `junto: true` emenda a frase na anterior com vírgula (o estilo da preceptora).
- Tokens de gênero: `{a}` → a/o, `{ao}` → à/ao, `{af}` → a/nada (palavra cujo masculino não termina em o: `portador{af}`).

**Regras de texto dos itens:** frase começa minúscula e não termina em ponto; sem `*`, `_`, `~`; sem dose. **Ids
únicos** na ficha inteira, com prefixo do quadro (`pn-…`, `pu-…`). A mesma pergunta em dois quadros usa o MESMO
id e o mesmo objeto: aparece uma vez, no primeiro quadro marcado. Não repetir item da ficha base (comorbidades,
alergia, cirurgias, etilismo, tabagismo, atividade física, HF, medicação em uso, exames trazidos, sinais vitais,
medidas, estado geral, oriento, solicito, prescrição, encaminho, retorno).

**O ✗ diz só o que se perguntou ou examinou.** Fonte de cada quadro = a(s) da queixa correspondente no copiloto;
o item que não vem dela leva a fonte própria no `fonte` do quadro. **Nada entra vazio**: quadro sem conteúdo real
não entra.

## Verificar antes de dar por pronto

```
node teste/dados.mjs
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --remote-debugging-port=9337 --user-data-dir=/tmp/cons-e2e \
  --allow-file-access-from-files about:blank &
node teste/teste.mjs            # CDP_PORT=… para outra porta
node teste/saidas.mjs           # regenera teste/saidas/ para revisão
```

Correção de achado entra com checagem que FALHA sem ela. Armadilhas da admissão valem aqui: `--window-size`
do headless mente (use `Emulation.setDeviceMetricsOverride`, `mobile: true`); dentro de template literal do
e2e, `\d` vira `d`; `innerText` vem vazio em `<details>` fechado; o Pages serve a versão velha por 40–60 s;
**nunca `git commit -a`** (há arquivos alheios em stage).
