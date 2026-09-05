# Copiloto APS — partner do DeepTutor

Backup versionado do partner que roda no DeepTutor. **A origem é
`~/deeptutor/data/partners/copiloto-aps/`, que não é um repositório git** — se
aquela pasta for perdida ou sobrescrita por um upgrade, é daqui que se restaura.

Não confundir com `../copiloto/`, que é outra coisa: aplicativo offline em
`file://`, determinístico, para consulta durante o atendimento. O partner é
conversacional e devolve o prontuário escrito.

## O que é cada arquivo

| Arquivo | O que é |
|---|---|
| `SOUL.md` | identidade e limites do partner |
| `PROFILE.md` | perfil do usuário — personaliza o tom, não o rigor |
| `config.yaml` | nome, descrição, idioma, modelo |
| `skills/prontuario-atendimento/` | contrato de saída (`always: true`) |
| `skills/frases-prontuario/` | vocabulário de redação do registro |
| `skills/posologia-cola/` | posologia de referência + quarentena |
| `skills/longitudinalidade/` | acompanhamento entre consultas, pseudonimização |
| `forcar-idioma.py` | patch de idioma; reaplicar após `pip install -U deeptutor` |

## O formato de saída

Cinco seções. A primeira é o bloco de colar no e-SUS, em caixa alta, em quatro
partes: **HMA · EXAME FÍSICO · SD · CONDUTA**. Depois: hipóteses, exames,
conduta detalhada e lacunas.

**SOAP não é o formato daqui.** SOAP é o que a faculdade cobra nas apresentações
de caso da aula teórica (ver os `caso-clinico.md` das ATPs). Este partner escreve
o registro do atendimento real na unidade. São duas tarefas diferentes e o SOUL
diz isso explicitamente.

## A knowledge base

O partner consulta a KB `copiloto-aps` — 14 documentos, ~4.400 linhas, curados
pelo critério "serve na consulta, não na prova". Ficaram **de fora** de
propósito: `divergencias-de-banca`, o `raw/` inteiro da wiki (simulado ENAMED,
flashcards, deep-research) e `apa-amplo-fatos` — material de prova puxa o
copiloto para o raciocínio errado quando se pede conduta.

O staging fica em `~/deeptutor/data/user/workspace/kb-copiloto-aps/`. Para
recriar:

```sh
cd ~/deeptutor
.venv/bin/deeptutor kb create copiloto-aps \
  --docs-dir ~/deeptutor/data/user/workspace/kb-copiloto-aps
```

Depois, provisionar no workspace do partner:

```py
from deeptutor.services.partners.workspace import provision_assets
provision_assets("copiloto-aps", knowledge_bases=["copiloto-aps"])
```

## Armadilhas já pagas

- **Nome de arquivo colide.** A KB copia os documentos por basename. Três casos
  chamavam `caso-clinico.md` e dois foram sobrescritos em silêncio — o sintoma é
  `raw_documents` menor que `last_indexed_count` no `kb info`. Por isso o staging
  usa nomes únicos.
- **Dois-pontos no `description:` do frontmatter quebra o YAML.** O loader cai
  num parser de fallback que lê nome e descrição mas **perde o `always`** — a
  skill fica disponível e nunca é injetada. Validar com `yaml.safe_load` depois
  de editar.
- **Embedding é local.** `nomic-embed-text` via Ollama em `localhost:11434`. Sem
  o Ollama de pé, a KB indexa zero.
- **A conta ChatGPT não aceita todo modelo do catálogo.** `gpt-5.6-sol`,
  `gpt-5.4` e `gpt-5.3-codex-spark` devolvem HTTP 400. O partner usa
  `gpt-5.6-luna`.
