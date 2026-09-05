---
name: prontuario-atendimento
description: Contrato de saída do atendimento na UBS — bloco de registro em HMA / EXAME FÍSICO / SD / CONDUTA pronto para colar no e-SUS, seguido do raciocínio — hipóteses, exames justificados, conduta detalhada e mapa de lacunas.
always: true
---

# Prontuário — contrato de saída

Aplica-se sempre que chegarem notas de um atendimento. Cinco seções, nesta ordem.

Este é o registro do **atendimento real na unidade**, escrito ao lado da médica. Não é o formato de apresentação de caso da aula teórica — lá vale SOAP, e é outra tarefa, com outro contrato.

Vocabulário de redação: `frases-prontuario`. Dose: `posologia-cola`.

## 1. Registro para o prontuário

Abre a resposta, antes de qualquer raciocínio. É o texto que vai para o e-SUS.

Bloco de texto puro dentro de crases triplas, **inteiro em caixa alta**, sem negrito, sem título de markdown, sem marcador de lista. Formatação de markdown colada no e-SUS vira lixo.

Quatro partes, nesta ordem: **HMA · EXAME FÍSICO · SD · CONDUTA**.

- **Ausência não vira linha.** Prontuário não registra o que não foi feito: sem peso, não escreva "PESO NÃO REGISTRADO" — simplesmente não mencione peso. O mapa de lacunas é a seção 5 e não é para colar.
- Frase curta, voz técnica, abreviação consagrada.
- Alvo: cabe numa tela sem rolar.

Faltando dado sem o qual o registro não pode ser assinado com segurança — peso antes de dose pediátrica, sinal vital em suspeita de infecção, extensão de lesão antes de escolher via — escreva **uma linha** de bloqueio *acima* do bloco, fora dele, para não ser copiada junto.

### HMA

Abre com a fórmula: `PACIENTE COMPARECE À UNIDADE QUEIXANDO-SE DE ___ HÁ ___`.

Depois, na mesma corrida de texto: caracterização da queixa (localização, irradiação, caráter, intensidade, fatores de melhora e piora, sintomas associados), o que já tentou e a medicação em uso, comorbidades relevantes.

Três coisas de APS entram aqui quando registradas, e só quando registradas:
- o que a pessoa **acha que tem e o que teme**;
- o que a queixa **está impedindo** de fazer;
- **contexto** que muda a conduta — quem cuida de quem, condição de moradia, trabalho.

Fecha com as negativas: `NEGA ...`. **Só o que foi perguntado.** Um `NEGA ALERGIAS MEDICAMENTOSAS` que ninguém perguntou é afirmação sem lastro num documento assinado — e é o erro que este modelo mais convida, porque a fórmula do rodapé já vem pronta.

### EXAME FÍSICO

Primeira linha: **sinais vitais e antropometria medidos**, como número. `PA ___ MMHG, FC ___ BPM, FR ___ IRPM, TAX ___ °C, SATO₂ ___%, PESO ___ KG`.

Impressão não vira número. "PA parecia alta" fica entre aspas na HMA e vai para as lacunas — nunca vira 150/95.

Depois, **só os segmentos efetivamente examinados**, um por linha, com a sigla consagrada em caixa alta: `SEG. CEFÁLICO`, `ACV`, `AR`, `ABD`, `EXTREMIDADES`, `NEURO`, ou o segmento dirigido da queixa (`COLUNA LOMBAR`, `OTOSCOPIA`, `PELE`).

Segmento não examinado **não aparece** — nem como normal, nem como "não examinado". A ausência é registrada na seção 5.

Frase de estado global — `BEG`, `ESTÁVEL HEMODINAMICAMENTE`, `AFEBRIL AO TOQUE` — só com o dado que a sustenta. Sem PA e FC registradas, não se afirma estabilidade hemodinâmica.

### SD (SUSPEITA DIAGNÓSTICA)

Cabeçalho `# SD (SUSPEITA DIAGNÓSTICA)`, seguido de duas a quatro linhas iniciadas por `>>`.

**Termina em `?` enquanto for hipótese.** Essa é a força deste modelo: ele obriga a assumir a incerteza em vez de nomear doença cedo demais. Só cai o ponto de interrogação quando o diagnóstico está fechado por critério explícito.

Fecha com o código, na linha seguinte:
- **CIAP-2 sempre.** Queixa sem diagnóstico fica no CIAP-2 do sintoma.
- **CID-10 só quando houver diagnóstico fechado.**

### CONDUTA

Cabeçalho `# CONDUTA:`, seguido de linhas iniciadas por `>>`, nesta ordem:

1. **Não farmacológica**, específica e negociada — não genérica.
2. **Farmacológica**, com `⚠` em toda dose para conferência no protocolo local.
3. **Retorno com prazo e com o que reavaliar nele.**
4. **Orientação e sinais de alarme**, em linguagem de leigo, fechando com `PACIENTE COMPREENDE` quando foi de fato orientado.

Desfechos de APS — o menu completo está em `frases-prontuario`: retorno programado, retorno condicionado, exames solicitados, encaminhamento com critério nomeado, matriciamento, busca ativa do ACS, urgência.

**Nunca `RETORNAR SE NECESSÁRIO`.** Prazo explícito, mais o gatilho de retorno antecipado.

Não escrever `ALTA`, `INTERNAMENTO` nem `FICHA DE REGULAÇÃO`: são desfechos de pronto-atendimento e não são competência da UBS.

### Exemplo do bloco pronto

```
HMA: PACIENTE COMPARECE À UNIDADE QUEIXANDO-SE DE DOR LOMBAR HÁ 5 DIAS,
INICIADA APÓS CARREGAR CAIXAS EM MUDANÇA. PIORA AO LEVANTAR-SE DA CADEIRA,
MELHORA EM DECÚBITO. POUCO ALÍVIO COM DIPIRONA DOMICILIAR. REFERE TEMER
DOENÇA RENAL. CUIDADORA DA MÃE ACAMADA, SEM POSSIBILIDADE DE REDUZIR
ESFORÇO NO DOMICÍLIO. HAS EM USO DE LOSARTANA 50 MG/DIA. NEGA FEBRE, PERDA
PONDERAL, ALTERAÇÃO URINÁRIA OU INTESTINAL, TRAUMA DIRETO E ALERGIAS
MEDICAMENTOSAS.

EXAME FÍSICO: PA 148/88 MMHG, FC 78 BPM.
COLUNA LOMBAR: DOR À PALPAÇÃO PARAVERTEBRAL BILATERAL, SEM DOR SOBRE
PROCESSOS ESPINHOSOS. LASÈGUE NEGATIVO BILATERAL.

# SD (SUSPEITA DIAGNÓSTICA)
>> LOMBALGIA MECÂNICA AGUDA?
>> SOBRECARGA POSTURAL RELACIONADA AO CUIDADO?
CIAP-2: L03

# CONDUTA:
>> ORIENTADA MANUTENÇÃO DE ATIVIDADES LEVES CONFORME TOLERÂNCIA; EVITAR
   CARGA E ROTAÇÃO DE TRONCO. NEGOCIADA DIVISÃO TEMPORÁRIA DAS TAREFAS DE
   CUIDADO COM A FAMÍLIA.
>> ⚠ ANALGESIA SIMPLES CONFORME PROTOCOLO LOCAL. EVITAR AINE SISTÊMICO —
   HAS EM USO DE LOSARTANA, FUNÇÃO RENAL NÃO REGISTRADA.
>> RETORNO EM 7 DIAS PARA REAVALIAR DOR, FUNÇÃO, EXAME NEUROLÓGICO E PA.
>> ORIENTADA A PROCURAR ATENDIMENTO IMEDIATO SE FRAQUEZA EM MEMBROS
   INFERIORES, DORMÊNCIA EM SELA, PERDA DO CONTROLE URINÁRIO OU INTESTINAL,
   FEBRE OU DOR PROGRESSIVA. PACIENTE COMPREENDE.
```

Repare no que **não** está no bloco: peso, que não foi aferido, e os segmentos que não foram examinados. Nem como linha de ausência.

## 2. Hipóteses diagnósticas

De três a cinco, ordenadas por probabilidade **no contexto de APS** — prevalência de atenção primária, não de enfermaria terciária. Para cada uma:

- o que na história e no exame sustenta;
- o que enfraquece;
- o discriminador: qual dado ainda não coletado separaria essa das demais.

Depois, em bloco próprio, **o que não pode passar**: as hipóteses de baixa probabilidade e alta gravidade que exigem exclusão ativa, com o gatilho que dispara a suspeita.

## 3. Exames complementares

Cada exame responde a uma pergunta de uma hipótese acima. Escreva a pergunta ao lado. Exame sem pergunta não entra.

- **Pedir agora** — muda a conduta nesta consulta ou na próxima.
- **Pedir se** — condicionado a gatilho explícito: piora, falha terapêutica, resultado de outro exame.
- **Não pedir** — o que seria intuitivo solicitar e não se justifica, com o motivo.

A seção "não pedir" é obrigatória. Considere o que a UBS dispõe e o tempo de fila: exame indisponível na rede não é plano, é intenção.

Quando o diagnóstico for clínico, diga isso e não peça nada — é resposta legítima e frequente em APS.

## 4. Conduta

O detalhamento do que foi telegrafado no bloco. Cinco frentes:

- **Não farmacológica primeiro.** Específica e negociada: "caminhar 30 min, 5x/semana, começando por 10 min" vale; "praticar exercícios" não vale.
- **Farmacológica.** Princípio ativo, dose, via, intervalo, duração. Priorize **RENAME/REMUME**. `⚠` em toda dose e procedência declarada, conforme `posologia-cola`.
- **Retorno.** Prazo explícito e o que reavaliar nele.
- **Encaminhamento.** Só com critério nomeado: o que precisa estar tentado e documentado antes, e o que vai na carta de referência. Entre encaminhar e manejar, considere matriciamento.
- **Sinais de alarme.** Frase pronta, em linguagem de leigo, do jeito que se fala com a família.

Dimensão familiar e territorial registrada entra aqui como parte do plano.

## 5. Lacunas

Fecha o atendimento. Duas listas curtas, para o interno — não para o prontuário:

- **O que faltou perguntar ou examinar** — e por que mudaria a conduta.
- **O que registrar no próximo encontro** — para dar longitudinalidade ao acompanhamento.

É aqui que a ausência aparece por escrito. O bloco da seção 1 omite; esta seção nomeia.

## Quando as notas forem insuficientes

Diga na primeira linha e entregue o que der, com as lacunas mapeadas. Um registro com HMA preenchida e exame vazio é o registro honesto de uma triagem; um registro com exame inventado é falsificação de documento.
