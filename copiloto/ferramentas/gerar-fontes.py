#!/usr/bin/env python3
"""Gera copiloto/fontes.js — o allowlist de fontes citáveis e as páginas da wiki.

Por que existe: o campo `fonte` de cada item de conduta era memória do modelo.
Ele escrevia "SBP, Tratado de Pediatria, 2021" e ninguém conferia se aquilo era
real. Com este arquivo o modelo só pode citar o que está na lista, e o app
valida a string antes de mostrar — citação fora da lista vira VERIFICAR.

Duas origens, ambas já conferidas por humano:

1. A tabela de `30-RECURSOS/medicina-wiki/wiki/fontes-e-hierarquia.md`, saída do
   deep-research de 29/05/2026 (24 fontes primárias, verificação adversarial).
2. Os campos `fonte:` já escritos em queixas.js, que passaram pelo lint de
   fontes e pela regra de ouro do projeto.

O texto das páginas da wiki entra junto para o modelo ter o conteúdo, não só o
rótulo. `fetch()` de arquivo local é bloqueado em file://, então tem de virar JS.

Uso:  python3 ferramentas/gerar-fontes.py
"""
import io, json, os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
COPILOTO = os.path.normpath(os.path.join(AQUI, ".."))
WIKI = os.path.normpath(os.path.join(COPILOTO, "..", "..", "..", "..",
                                     "30-RECURSOS", "medicina-wiki", "wiki"))

# Páginas de conteúdo. index.md e log.md ficam de fora: são meta, não fato clínico.
PAGINAS = {
    "mfc-aps": ("mfc-aps-fatos.md",
                "aps atencao primaria starfield longitudinalidade integralidade "
                "coordenacao acesso vinculo equipe esf acolhimento mccp"),
    "materno-infantil": ("materno-infantil-fatos.md",
                         "crianca lactente bebe recem-nascido neonato gestante gestacao "
                         "pre-natal puerperio amamentacao vacina icterica diarreia pediatria"),
    "saude-mental": ("saude-mental-fatos.md",
                     "depressao ansiedade suicidio insonia psiquiatrico humor panico "
                     "benzodiazepinico antidepressivo caps sofrimento"),
    "etica": ("etica-medica-fatos.md",
              "sigilo etica atestado notificacao obito prontuario consentimento menor"),
    "clinica-ampla": ("apa-amplo-fatos.md",
                      "adulto idoso hipertensao diabetes cirurgia urgencia trauma sus "
                      "saude coletiva epidemiologia"),
}


def fontes_da_wiki(txt):
    """Extrai a tabela | Tema | Fonte | Ano | como rótulos citáveis."""
    achadas = []
    for linha in txt.split("\n"):
        cels = [c.strip() for c in linha.split("|")[1:-1]]
        if len(cels) != 3:
            continue
        tema, fonte, ano = cels
        if tema.lower().startswith("tema") or set(tema) <= set("-: "):
            continue
        fonte = re.sub(r"\s+", " ", fonte.replace("⚠️", "")).strip()
        if not fonte or not ano:
            continue
        achadas.append("%s, %s" % (fonte, ano))
    return achadas


# Fontes externas já conferidas dentro deste projeto, com o lugar onde a
# conferência aconteceu. Ficam explícitas aqui em vez de raspadas de queixas.js
# porque os `fonte:` de lá são PROCEDÊNCIA INTERNA ("copiei do guia-bolso"), não
# autoridade externa — citar "guia-bolso-aps.html" num guia clínico não diz nada
# a quem lê.
FONTES_DO_PROJETO = [
    # transcrita do PDF do MS em 05/08/2026; base da queixa crianca-aidpi
    "MS/OPAS/UNICEF — Manual de Quadros de Procedimentos AIDPI Criança, 2 meses a 5 anos, 2017",
    # quadros 5 a 9 e 13 a 14, transcritos verbatim; base da classificação antropométrica
    "MS — Norma Técnica do SISVAN, 2011",
    # tabelas LMS expandidas, geradas do .xlsx oficial por ferramentas/gerar-oms-lms.py
    "WHO Child Growth Standards, 2006",
    "WHO Growth Reference, 2007",
]


def fontes_das_queixas(txt):
    """Só o que é autoridade externa. Pega tanto `fonte:` de seção quanto `f:`
    de item — as duas são curadas e passam pelo lint. Referência a arquivo do
    próprio vault é procedência, não fonte citável, e entraria como ruído."""
    achadas = []
    for m in re.finditer(r'\b(?:fonte|f):\s*"((?:[^"\\]|\\.)*)"', txt):
        bruto = re.sub(r"\s+", " ", m.group(1).replace('\\"', '"')).strip()
        if not bruto or bruto.startswith("VERIFICAR"):
            continue
        # " · " separa fontes distintas no mesmo campo
        for f in [x.strip() for x in bruto.split(" · ")]:
            if re.search(r"\.html|\.md|wiki/", f):
                continue
            # citação sem ano não é citável: quase sempre é nota em prosa que
            # escorregou para o campo `fonte`. Guarda contra o erro que já
            # aconteceu uma vez.
            if not re.search(r"\b(19|20)\d\d\b", f):
                continue
            achadas.append(f)
    return achadas


def main():
    fontes, paginas = [], {}

    caminho_fh = os.path.join(WIKI, "fontes-e-hierarquia.md")
    fontes += fontes_da_wiki(io.open(caminho_fh, encoding="utf-8").read())

    fontes += FONTES_DO_PROJETO
    fontes += fontes_das_queixas(
        io.open(os.path.join(COPILOTO, "queixas.js"), encoding="utf-8").read())

    for chave, (arq, kw) in PAGINAS.items():
        caminho = os.path.join(WIKI, arq)
        if not os.path.exists(caminho):
            print("  ! faltando: %s" % arq)
            continue
        texto = io.open(caminho, encoding="utf-8").read().strip()
        paginas[chave] = {"kw": kw, "texto": texto}

    # dedup preservando ordem — a ordem é a da tabela da wiki, que é temática
    vistas, unicas = set(), []
    for f in fontes:
        if f not in vistas:
            vistas.add(f); unicas.append(f)

    cab = (
        "/* Fontes citáveis e páginas da wiki — GERADO, NÃO EDITAR À MÃO.\n"
        " * Regenerar: python3 ferramentas/gerar-fontes.py\n"
        " *\n"
        " * FONTES_VALIDAS é o allowlist do campo `fonte` do guia. O modelo só pode\n"
        " * citar uma destas strings, verbatim, ou o literal VERIFICAR — e o app\n"
        " * valida antes de mostrar. Sem isto o campo era memória do modelo, que é\n"
        " * exatamente o que a regra de ouro do projeto proíbe.\n"
        " *\n"
        " * Origem: tabela de 30-RECURSOS/medicina-wiki/wiki/fontes-e-hierarquia.md\n"
        " * (deep-research 29/05/2026) + os campos `fonte:` já curados em queixas.js.\n"
        " *\n"
        " * WIKI_PAGINAS entra no prompt por palavra-chave, para o modelo ter o\n"
        " * conteúdo e não só o rótulo. RAG vetorial seria overkill: são %d KB no\n"
        " * total, e busca lexical vence embedding em corpus pequeno de vocabulário\n"
        " * técnico fechado.\n"
        " */\n" % (sum(len(p["texto"]) for p in paginas.values()) // 1024)
    )
    js = (cab
          + "var FONTES_VALIDAS = " + json.dumps(unicas, ensure_ascii=False, indent=1) + ";\n\n"
          + "var WIKI_PAGINAS = " + json.dumps(paginas, ensure_ascii=False, indent=1) + ";\n")

    saida = os.path.join(COPILOTO, "fontes.js")
    io.open(saida, "w", encoding="utf-8").write(js)
    print("fontes.js — %d fontes válidas, %d páginas, %.0f KB"
          % (len(unicas), len(paginas), len(js) / 1024))
    for f in unicas:
        print("   ·", f)


if __name__ == "__main__":
    main()
