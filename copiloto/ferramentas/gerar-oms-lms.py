#!/usr/bin/env python3
"""Gera copiloto/oms-lms.js a partir das expanded tables oficiais da OMS.

O arquivo de dados é grande e não deve ser editado à mão: se algum número
precisar mudar, muda-se a planilha de origem e roda-se este script de novo.

Uso:
    pip install openpyxl
    python3 ferramentas/gerar-oms-lms.py ~/Downloads/oms-lms-fontes

As planilhas de origem vêm de cdn.who.int — as URLs estão em URLS abaixo.
Atenção: a OMS é inconsistente na nomenclatura. Estatura/idade 0-5a usa
"expandable-tables" (não "expanded-"), peso/estatura usa "expanded-table" no
singular, e os arquivos de peso/idade 5-10a estão publicados com o nome
"hfa-*" dentro da pasta weight-for-age (conferido: o conteúdo é peso, M=18,26
kg aos 61 meses). As URLs de 5-19a carregam GUID e só saem da página do
indicador.

Licença dos dados: WHO, CC BY-NC-SA 3.0 IGO.
"""
import sys, os, json
import openpyxl

# (chave, arquivo, unidade do eixo)  — o eixo é dia (0-5a) ou mês (5-19a)
TABELAS = [
    ("wfa",     "wfa_{s}.xlsx",      "dia"),   # peso/idade 0-5a
    ("lhfa",    "lhfa_{s}.xlsx",     "dia"),   # comprimento-estatura/idade 0-5a
    ("bfa",     "bfa_{s}.xlsx",      "dia"),   # IMC/idade 0-5a
    ("hcfa",    "hcfa_{s}.xlsx",     "dia"),   # perímetro cefálico/idade 0-5a
    ("wfa519",  "wfa519_{s}.xlsx",   "mes"),   # peso/idade 5-10a
    ("hfa519",  "hfa519_{s}.xlsx",   "mes"),   # estatura/idade 5-19a
    ("bmi519",  "bmi519_{s}.xlsx",   "mes"),   # IMC/idade 5-19a
]

URLS = """
  0-5a  https://cdn.who.int/media/docs/default-source/child-growth/child-growth-standards/
        indicators/<indicador>/expanded-tables/<sigla>-<sexo>-zscore-expanded-tables.xlsx
  5-19a https://cdn.who.int/media/docs/default-source/child-growth/growth-reference-5-19-years/
        <indicador>/<sigla>-<sexo>-z-who-2007-exp_<guid>.xlsx
"""


def num(x, casas):
    """Arredonda e devolve a menor representação textual possível."""
    v = round(float(x), casas)
    if v == int(v):
        return str(int(v))
    return repr(v)


def ler(caminho):
    ws = openpyxl.load_workbook(caminho, read_only=True).active
    linhas = ws.iter_rows(values_only=True)
    cab = [str(c).strip() if c is not None else "" for c in next(linhas)]
    ix = {n: i for i, n in enumerate(cab)}
    eixo = ix.get("Day", ix.get("Month"))
    dados = {}
    for r in linhas:
        if r is None or r[eixo] is None:
            continue
        dados[int(r[eixo])] = (r[ix["L"]], r[ix["M"]], r[ix["S"]])
    return dados


def serie(dados):
    """Devolve (inicio, L[], M[], S[]) numa grade contígua, sem buracos."""
    chaves = sorted(dados)
    ini, fim = chaves[0], chaves[-1]
    faltando = [k for k in range(ini, fim + 1) if k not in dados]
    if faltando:
        raise SystemExit("buraco na grade: %s" % faltando[:5])
    L = [num(dados[k][0], 6) for k in range(ini, fim + 1)]
    M = [num(dados[k][1], 5) for k in range(ini, fim + 1)]
    S = [num(dados[k][2], 6) for k in range(ini, fim + 1)]
    return ini, L, M, S


def main():
    origem = os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~/Downloads/oms-lms-fontes")
    saida = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "oms-lms.js")

    partes = []
    for chave, molde, unidade in TABELAS:
        por_sexo = []
        for sexo, sigla in (("m", "boys"), ("f", "girls")):
            caminho = os.path.join(origem, molde.format(s=sigla))
            ini, L, M, S = serie(ler(caminho))
            por_sexo.append('  %s:{ini:%d,L:[%s],M:[%s],S:[%s]}'
                            % (sexo, ini, ",".join(L), ",".join(M), ",".join(S)))
        partes.append(' %s:{un:"%s",\n%s\n }' % (chave, unidade, ",\n".join(por_sexo)))

    cab = (
        "/* Tabelas LMS da OMS — GERADO, NÃO EDITAR À MÃO.\n"
        " * Regenerar com: python3 ferramentas/gerar-oms-lms.py <pasta-com-xlsx>\n"
        " *\n"
        " * Origem: expanded tables oficiais da OMS.\n" + URLS.rstrip() + "\n"
        " *\n"
        " * WHO Child Growth Standards (2006), 0 a 5 anos, grade DIÁRIA (dia 0 a 1856).\n"
        " * WHO Growth Reference (2007), 5 a 19 anos, grade MENSAL.\n"
        " * Peso/idade só existe até 10 anos (mês 120) — a OMS não publica acima disso,\n"
        " * porque o peso isolado deixa de ser interpretável na puberdade. Use IMC/idade.\n"
        " *\n"
        " * Licença: WHO, CC BY-NC-SA 3.0 IGO.\n"
        " *\n"
        " * z = ((X/M)^L - 1) / (L*S), com a correção da OMS além de +-3 DP para os\n"
        " * indicadores baseados em peso. Ver antropoZ() em calculadoras.js.\n"
        " */\n"
    )
    js = cab + "const OMS_LMS = {\n" + ",\n".join(partes) + "\n};\n"

    with open(saida, "w") as f:
        f.write(js)
    print("%s — %.0f KB" % (os.path.normpath(saida), len(js) / 1024))


if __name__ == "__main__":
    main()
