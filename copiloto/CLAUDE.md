# Copiloto Clínico APS — instruções

Apoio à decisão durante o atendimento, para uso próprio do Eric no rodízio de APS II
(USF Tiquaruçu). Roda em `file://`, offline, sem servidor e sem build.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | o app inteiro: CSS, renderer, busca, motor de calculadora |
| `queixas.js` | **conteúdo clínico. Só dados.** É o arquivo que se edita |
| `anotacao.js` | **conteúdo do painel "Como anotar". Só dados.** Manual de como anotar a consulta |
| `eem.js` | **conteúdo do painel "EEM". Só dados.** Os 12 domínios do exame do estado mental |
| `psicofarmacos.js` | **conteúdo do painel "Psicofármacos". Só dados.** Formulário por classe e fármaco, mais as três seções de combinação |
| `calculadoras.js` | registro das calculadoras (contém funções puras) |
| `oms-lms.js` | **gerado, não editar.** Tabelas LMS da OMS, 318 KB |
| `ferramentas/gerar-oms-lms.py` | regenera o `oms-lms.js` a partir dos `.xlsx` da OMS |
| `testes.html` | casos de teste + lint de fontes. Abrir no navegador |
| `e2e.mjs` | verificação de interação via Chrome DevTools Protocol |

A ordem das tags `<script>` importa: `oms-lms.js` antes de `calculadoras.js`,
nos dois arquivos que carregam o app (`index.html` e `testes.html`).

## Como uma consulta funciona

O app não é um livro de consulta: ele acompanha o atendimento do começo ao fim.

1. Abrir uma queixa **inicia a consulta**. Ela entra em `naConsulta` e passa a aparecer
   marcada como "nesta consulta" na lista.
2. Várias queixas cabem na mesma consulta (HAS + DM2 + a queixa do dia). A marcação
   de uma não zera a da outra.
3. **Red flags são marcáveis.** Marcar significa "procurei e descartei". O botão
   "Revisar consulta" mostra no header quantas ainda faltam.

Os painéis **"Como anotar"**, **"EEM"** e **"Psicofármacos"** ficam fora desse fluxo:
são referência estática, não guardam estado, não entram na revisão de fechamento e
"Novo paciente" não os zera — são manual, não dado de paciente. Renderizam uma vez e
ficam em cache. Os três dividem o mesmo renderer (`painelHTML`).

**Os três botões só aparecem na lista.** Sete botões no header quebram em três linhas
no celular e empurram a busca para fora da tela — e referência não se consulta no meio
de uma queixa aberta, se consulta antes ou depois. Há e2e para os dois lados disso.
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
`redflags` · `perguntas` · `exame` · `naoperder` · `ddx` · `exames` · `farmaco` ·
`conduta` · `erros`

`farmaco` entrou em 16/09/2026 com o módulo de psiquiatria. Nas queixas de APS o
tratamento cabia em `conduta`; em psiquiatria a escolha do fármaco **é** a consulta,
e misturar as duas coisas escondia a decisão no meio da lista. O detalhe por fármaco
mora no painel Psicofármacos, para a mesma tabela não se repetir em oito queixas.

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

### Tipos de campo e de resultado

Campo: `{id, rot, un?, tipo, opts?, min?, max?, passo?, opc?}` —
`tipo` é `num` | `opt` | `data` | `texto`, e `opc: true` deixa o campo opcional
(a calculadora roda sem ele; é assim que a antropometria aceita só o peso).

`calc(v)` devolve **número** (usa `faixas`), **string** (renderiza direto),
**array** de `{rot, val, cls}` (uma linha por resultado, cada uma com a própria
cor) ou **`null`** quando ainda não há o que mostrar.

### A regra vale para dose também — e foi alterada em 16/09/2026

**A regra da calculadora não mudou:** `dose-peso` continua a **converter, não a
decidir**. A posologia vem do médico e o app faz a multiplicação. Nenhuma
calculadora emite dose. O modelo do "Gerar guia" continua proibido de emitir
dígito de dose — devolve o princípio ativo no campo `farmaco` e manda usar o
conversor.

**O que mudou:** o conteúdo estático passou a poder trazer dígito de dose. A
decisão foi do Eric, em 16/09/2026, para o módulo de psiquiatria: guia de bolso
de psiquiatria sem dose não serve no CAPS nem na emergência. A condição que ele
aceitou junto **não é negociável**:

1. **Toda dose carrega a fonte no próprio cartão ou item.** Não existe número
   órfão. `psicofarmacos.js` tem `fonte` por fármaco, não por classe — quem
   precisa responder de onde veio é o número.
2. **Sem fonte brasileira datada e conferida, o cartão sai marcado `v: true`** e
   a dose é substituída pela frase que diz que não há fonte. Quatro cartões
   estão assim hoje, de propósito.
3. **A fonte é lida, não lembrada.** Os PDFs estão em
   `../../internato-sm-sc-2026-2/raw/fonte-*.pdf` e o mapa de conferência em
   `../../internato-sm-sc-2026-2/.fontes-conferidas.md`. Texto extraído com
   `pdftotext -layout` e lido antes de escrever.
4. **Há teste travando as três coisas acima**, em `testes.html` (dados) e em
   `e2e.mjs` (DOM). Sem eles a condição seria promessa. Se algum cair, a dose sai
   antes de o teste ser afrouxado.

Fontes conferidas: PCDT Esquizofrenia (Portaria SAS/MS nº 364, 2013), PCDT
Transtorno Afetivo Bipolar do tipo I (Portaria SAS/MS nº 315, 2016), CAB nº 34
Saúde Mental (MS, 2013), PCDT Tabagismo (Portaria Conjunta SCTIE/SAES/MS nº 10,
2020), Dalgalarrondo 3ª ed. (Artmed, 2019), CFM/CREMEC Parecer nº 14/2021 e
CANMAT 2023 (Can J Psychiatry, 2024).

### O array `dose` só pode conter DOSE

Aprendido na onda 1.5, com o teste acusando. Uma linha de recomendação
("1ª linha como potencializador…") foi escrita dentro de `dose` e o teste do
dígito acusou o cartão, que é marcado VERIFICAR. O teste estava certo: critério
de escolha vai em `escolher`, monitorização em `monitor`, e `dose` fica só com
dose. Se esse teste acusar de novo, mova o dado — não relaxe o teste.

### As três seções de combinação

`PSICOFARMACOS.combos`, `.proibidos` e `.dosemuda` vivem FORA de `classes`:

- **combos** — combinações que se fazem, por situação clínica
- **proibidos** — as que não se fazem; todo item declara o **MECANISMO**, e há
  teste exigindo essa palavra. Sem mecanismo o item vira decoreba e não
  generaliza para o fármaco que não está na lista
- **dosemuda** — mesmo fármaco, dose diferente, indicação diferente

Combinação é **relação**, não propriedade de um fármaco. Repetida em 39 cartões,
envelheceria em 39 lugares. Item = `{t, d, f, v?}` — `f` é a fonte, obrigatória,
e há teste.

A ressalva de licença segue de pé: CAB e PCDT são CC BY-NC-ND. O que entra aqui
é **fato posológico com citação**, não transcrição de obra.

### Três respostas possíveis, não duas

A "Conferência da nota" pode responder de três formas, e a terceira é a que
costuma faltar em ferramenta clínica:

1. **Calculei** — o dado estava lá.
2. **Achei uma contradição** — a nota traz dois valores que divergem.
3. **Falta um dado que a conta exige** — e diz *qual* e *o que ele destrava*.

A nota do ex1 (7 anos, feridas) não traz peso. Calcular seria inventar; calar
seria deixar o médico descobrir sozinho na hora de prescrever. A lista mora em
`FALTAS`, no topo do bloco. Cada entrada diz a consequência, não só o nome do
campo: `"peso — sem ele não sai dose por peso nem IMC para idade"`.

Só aparece depois que algo foi reconhecido na nota — nota em branco não pode
virar lista de cobranças. Há teste para isso.

### Antropometria: o escore manda, o rótulo acompanha

`omsZ()` devolve o escore-z e `sisvan()` o diagnóstico nutricional. Três coisas
que parecem detalhe e não são:

- **O mesmo escore-z muda de nome aos 5 anos.** IMC/idade de +1,5 é "risco de
  sobrepeso" abaixo de 5 anos e "sobrepeso" a partir daí. Há teste travando os
  dois lados da fronteira. Não unificar os quadros.
- **Estatura para idade não tem corte superior no SISVAN**, então +3,05 sai como
  "adequada". Por isso a linha fora de ±3 DP é forçada para âmbar: verde ao lado
  de um alerta pedindo para conferir lê como "está tudo bem".
- **Peso para idade só existe até 10 anos.** Acima disso `omsZ` devolve `null` e
  a tela diz que está fora do intervalo publicado — não extrapola.

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

## Armadilha de escape no e2e — me pegou três vezes

Dentro de um template literal do JavaScript, `\d` vira a letra `d` e `\/` fecha a
expressão regular cedo (erro "Invalid regular expression flags"). Como o `evalJS`
do `e2e.mjs` monta a expressão dentro de crase, **toda regex com contrabarra
escrita ali está errada de véspera** — e o teste falha por motivo falso, ou pior,
passa testando a coisa errada.

Regra: em asserção de `evalJS`, nada de contrabarra. Use `[0-9]` no lugar de `\d`,
`new RegExp('...')` com string quando precisar de barra, ou simplesmente
`.includes()`. Prima da armadilha do `innerText`, que devolve string vazia em
`<details>` fechado — nesse caso use `textContent`.

## Limites que não se negociam

- **Nenhum dado de paciente é gravado.** Sem `localStorage`, sem `sessionStorage`,
  sem cookie. O estado vive só em memória e morre no botão "Novo paciente" ou ao
  recarregar. Levar marcação de um paciente para o próximo é dano clínico, não
  conveniência.
- **Existe um campo de texto livre**, a nota da "Conferência da nota". Ele é a
  única exceção e continua sob a mesma regra: nada sai do computador, nada é
  gravado, e "Novo paciente" apaga — há verificação e2e para as duas coisas.
  Digitar a nota já habilita o "Novo paciente", justamente para que exista o
  gesto de encerrar.
- **Não é prontuário** e não substitui o registro oficial do serviço.
- Se aparecer a vontade de "só um campinho para anotar", isso virou outro produto.
