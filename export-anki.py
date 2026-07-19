#!/usr/bin/env python3
"""Converte flashcards-aps.md (frente;verso) em flashcards-aps.txt (TAB) para o Anki.

Ignora cabeçalhos, listas e linhas em branco. Valida que cada cartão tem
exatamente um ponto-e-vírgula — mais que isso quebra a importação.

Uso: python3 export-anki.py
"""
import sys
from pathlib import Path

SRC = Path(__file__).parent / "flashcards-aps.md"
DST = Path(__file__).parent / "flashcards-aps.txt"


def main() -> int:
    if not SRC.exists():
        print(f"erro: {SRC.name} não encontrado", file=sys.stderr)
        return 1

    cards, erros, bloco = [], [], "?"
    for n, raw in enumerate(SRC.read_text(encoding="utf-8").splitlines(), 1):
        line = raw.strip()
        if line.startswith("## "):
            bloco = line[3:].strip()
        if not line or line.startswith(("#", "-", ">", "|", "`")):
            continue
        # cartão só conta se estiver sob um "## Bloco"; crase = texto explicativo
        if bloco == "?" or "`" in line:
            continue
        if ";" not in line:
            continue
        if line.count(";") != 1:
            erros.append(f"  linha {n}: {line.count(';')} ponto-e-vírgulas -> {line[:60]}")
            continue
        frente, verso = (p.strip() for p in line.split(";"))
        if not frente or not verso:
            erros.append(f"  linha {n}: frente ou verso vazio -> {line[:60]}")
            continue
        cards.append((frente, verso, bloco))

    if erros:
        print("cartões inválidos (não exportados):", file=sys.stderr)
        print("\n".join(erros), file=sys.stderr)

    vistos, dups, unicos = set(), [], []
    for f, v, b in cards:
        if f.lower() in vistos:
            dups.append(f)
            continue
        vistos.add(f.lower())
        unicos.append((f, v, b))

    DST.write_text("".join(f"{f}\t{v}\n" for f, v, _ in unicos), encoding="utf-8")

    por_bloco: dict[str, int] = {}
    for _, _, b in unicos:
        por_bloco[b] = por_bloco.get(b, 0) + 1

    print(f"{DST.name}: {len(unicos)} cartões")
    for b, q in por_bloco.items():
        print(f"  {b}: {q}")
    if dups:
        print(f"  duplicados removidos: {len(dups)}")
    return 1 if erros else 0


if __name__ == "__main__":
    sys.exit(main())
