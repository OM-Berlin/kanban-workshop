#!/usr/bin/env bash
# Laeuft beim Start jeder Sitzung und zeigt die letzte Uebergabe an.
# Damit faengt keine Sitzung bei null an.
set -euo pipefail

ORDNER="brainstorms"
[ -d "$ORDNER" ] || exit 0

LETZTE=$(ls -t "$ORDNER"/*uebergabe*.md 2>/dev/null | head -1 || true)
[ -n "$LETZTE" ] || exit 0

echo "── Letzte Uebergabe: $LETZTE ──"
head -20 "$LETZTE"
echo "── Weiterlesen mit: cat $LETZTE ──"
