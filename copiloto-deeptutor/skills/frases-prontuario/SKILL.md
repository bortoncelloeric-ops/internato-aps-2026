---
name: frases-prontuario
description: Andaimes de redação para o registro — abertura da HMA, segmentos de exame físico e fórmulas de fechamento da CONDUTA, em voz de APS. Checklist do que perguntar e examinar, nunca texto pronto para colar.
always: false
---

# Frases de prontuário

Carregue esta skill junto com `prontuario-atendimento` sempre que houver notas de atendimento para registrar. Ela não muda o contrato de saída — dá o vocabulário para preencher o bloco do e-SUS mais rápido.

## A regra que vem antes de tudo

**Estas frases são checklist, não texto pronto.**

Um exame físico normal completo é o jeito mais fácil de um registro ganhar dado que ninguém colheu. "AR: MVBD sem ruídos adventícios" descreve uma ausculta que aconteceu — se não aconteceu, essa linha é falsificação, e é falsificação convincente porque está bem escrita.

Como eu uso os blocos abaixo:

- Ofereço o segmento **como pergunta**: "auscultou o tórax?" — não como linha já preenchida.
- Só entra no registro o segmento que a nota do interno sustenta.
- Segmento não examinado **não vira "sem alterações" e nem vira "não examinado"** no bloco do e-SUS: simplesmente não aparece. A ausência é registrada na seção 6 (lacunas).
- Frase que afirma estado global — "estável hemodinamicamente", "bom estado geral" — exige o dado que a sustenta. Sem PA e FC registradas, não escrevo estabilidade hemodinâmica; escrevo o que foi medido.

## Abertura da HMA

Molde da história, com os campos que a queixa exige:

```
Paciente comparece à unidade queixando-se de ___ há ___.
Localização, irradiação, caráter, intensidade, frequência, duração.
Fatores de melhora e de piora. Sintomas associados.
Medicação em uso e o que já tentou para isso.
```

Em APS, três campos entram na abertura que o pronto-atendimento costuma pular, e que mudam conduta:

- **o que ele acha que tem e o que teme** — a ideia e o medo do paciente, nas palavras dele;
- **o que a queixa está impedindo** de fazer — trabalho, sono, cuidado de outra pessoa;
- **contexto** — com quem mora, quem cuida, vínculo com o ACS, condição de moradia quando pertinente.

Fecho de negativas só com o que foi realmente perguntado: `nega outras queixas, comorbidades e alergias medicamentosas` vale se as três perguntas foram feitas — não é rodapé automático.

## Segmentos de exame físico

Escolha por queixa. Exame em APS é dirigido; varredura completa em consulta de 15 minutos raramente aconteceu de verdade.

| Segmento | Frase de normalidade |
|---|---|
| Geral | Bom estado geral, lúcido e orientado em tempo e espaço, corado, hidratado, acianótico, anictérico, afebril ao toque |
| Sinais vitais | PA ___ mmHg, FC ___ bpm, FR ___ irpm, Tax ___ °C, SatO₂ ___%, peso ___ kg |
| Segmento cefálico | Sem pontos dolorosos à palpação, oroscopia sem alterações, sem linfonodomegalia, sem limitação de movimento cervical |
| Cardiovascular | Precórdio calmo, BRNF em 2T, sem sopros |
| Respiratório | MVBD, sem ruídos adventícios |
| Abdome | Semigloboso, flácido, RHA presentes, timpanismo difuso, indolor à palpação superficial e profunda, sem VMG palpáveis, sem sinais de irritação peritoneal |
| Extremidades | Sem edemas, sem sinais de TVP, pulsos pedioso e tibial posterior palpáveis |
| Neurológico | Glasgow 15, sem déficits motores focais aparentes, pupilas isocóricas e fotorreagentes, sem sinais de irritação meníngea |
| Pele | Descrever lesão: tipo, número, distribuição, tamanho, bordas |

Sinais vitais e peso não têm frase de normalidade — são número ou não são nada. Impressão do interno ("PA parecia alta") vai entre aspas no S e para as lacunas, nunca vira valor no O.

## Fechamento da CONDUTA

O pronto-atendimento fecha com alta ou internamento. APS fecha com **continuidade** — o desfecho quase sempre é o próximo encontro.

| Situação | Fórmula |
|---|---|
| Encerramento com retorno programado | Orientações fornecidas, paciente compreende. Retorno em ___ dias/semanas para reavaliar ___ |
| Retorno condicionado | Orientado a retornar antes do prazo se ___ (sinais de alarme em linguagem de leigo) |
| Exames solicitados | Solicito ___ para responder ___ . Reavaliação com resultado em ___ |
| Encaminhamento | Encaminho para ___ pelo critério ___ , tendo sido tentado e documentado ___ . Segue em acompanhamento nesta equipe |
| Discussão com equipe | Caso a ser discutido com equipe multiprofissional / matriciamento antes de encaminhar |
| Busca ativa | Solicito visita domiciliar do ACS para ___ |
| Urgência | Oriento procurar imediatamente unidade com recurso adequado por ___ . Paciente orientado e compreende |
| Falta ao chamado | Chamado três vezes, não compareceu ao chamado |

Encaminhamento sem critério nomeado não é conduta, é transferência de responsabilidade — e continua meu caso: em APS o paciente não sai da equipe quando vai ao especialista.

## O que eu não escrevo em APS

Vocabulário de porta de entrada que não se aplica aqui, e que costuma vir junto quando se copia modelo de UPA:

- **alta** — em APS não se dá alta, se agenda retorno;
- **admissão / internamento na unidade / ficha de regulação** — não é competência da UBS;
- **"retornar se necessário"** — o `prontuario-atendimento` exige prazo e gatilho explícitos;
- **nome de hospital de referência decorado** — a referência é a da rede do território, não a de outro município.

## Procedência

Os moldes vieram de uma cola pessoal de rotinas de UPA, adaptados aqui para APS. É material de terceiro sem revisão formal: serve como andaime de redação e nada além disso. Nenhuma dose, esquema terapêutico ou conduta desse material entra nas minhas respostas — posologia segue o que o `prontuario-soap` manda, RENAME/REMUME com `⚠` para conferência no protocolo local.
