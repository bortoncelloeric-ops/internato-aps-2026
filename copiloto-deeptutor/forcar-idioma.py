#!/usr/bin/env python3
"""Força o idioma das respostas do DeepTutor.

O DeepTutor só oferece inglês e chinês na interface, mas a camada de prompt já
sabe montar a diretiva em outros idiomas (`_LANGUAGE_LABELS` inclui "pt").
Este script liga os dois: injeta um override em `language_directive()`, que é o
ponto único por onde passam chat, Book, quiz e research.

Uso:
    python forcar-idioma.py pt        # respostas em português
    python forcar-idioma.py en        # volta ao original (sem forçar)
    python forcar-idioma.py --status  # mostra o estado atual

Reaplique depois de `pip install -U deeptutor` — o upgrade sobrescreve o arquivo.
Reinicie o `deeptutor start` para a mudança valer.
"""

from __future__ import annotations

from pathlib import Path
import sys

ALVO = (
    Path(__file__).parent
    / ".venv/lib/python3.13/site-packages/deeptutor/services/prompt/language.py"
)
ORIGINAL = ALVO.with_suffix(".py.orig")

MARCA = "_FORCED_LANGUAGE"

# O par de linhas dentro de `language_directive` — `language_label` tem uma
# linha igual à primeira, então as duas juntas são o que identifica o lugar certo.
ANCORA = "    code = normalize_language(language)\n    label = language_label(code)"
SUBSTITUTO = (
    "    code = _FORCED_LANGUAGE or normalize_language(language)\n"
    "    label = language_label(code)"
)


def ler_original() -> str:
    """Devolve o conteúdo sem patch, criando o backup na primeira execução."""
    if ORIGINAL.exists():
        return ORIGINAL.read_text(encoding="utf-8")
    atual = ALVO.read_text(encoding="utf-8")
    if MARCA in atual:
        sys.exit(
            f"ERRO: {ALVO.name} já está patchado mas o backup {ORIGINAL.name} sumiu.\n"
            "Rode `pip install --force-reinstall --no-deps deeptutor` e tente de novo."
        )
    ORIGINAL.write_text(atual, encoding="utf-8")
    return atual


def status() -> None:
    atual = ALVO.read_text(encoding="utf-8")
    if MARCA not in atual:
        print("Estado: original (idioma segue a interface — inglês ou chinês)")
        return
    for linha in atual.splitlines():
        if linha.startswith(f"{MARCA} ="):
            print(f"Estado: forçado — {linha.split('=', 1)[1].strip()}")
            return
    print("Estado: patchado, mas não consegui ler o idioma")


def aplicar(idioma: str) -> None:
    base = ler_original()

    if idioma == "en":
        ALVO.write_text(base, encoding="utf-8")
        print("Restaurado o arquivo original — o idioma volta a seguir a interface.")
        return

    if ANCORA not in base:
        sys.exit(
            "ERRO: não achei o trecho esperado em language.py.\n"
            "A estrutura do arquivo mudou numa versão nova do DeepTutor — "
            "o patch precisa ser refeito à mão."
        )

    novo = base.replace(ANCORA, SUBSTITUTO, 1).replace(
        "\n\ndef normalize_language(",
        f'\n\n{MARCA} = "{idioma}"\n\n\ndef normalize_language(',
        1,
    )
    ALVO.write_text(novo, encoding="utf-8")

    rotulo = "Português" if idioma == "pt" else idioma
    print(f"Aplicado: todas as respostas passam a sair em {rotulo}.")
    print("Reinicie o `deeptutor start` para valer.")


if __name__ == "__main__":
    if not ALVO.exists():
        sys.exit(f"ERRO: não encontrei {ALVO}")

    arg = sys.argv[1] if len(sys.argv) > 1 else "--status"
    if arg == "--status":
        status()
    else:
        aplicar(arg.lower().strip())
