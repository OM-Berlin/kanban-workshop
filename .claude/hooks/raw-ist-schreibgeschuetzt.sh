#!/usr/bin/env bash
# Laeuft vor jedem Schreibvorgang. Wer in raw/ schreiben will, wird gestoppt.
#
# raw/ ist fremdes Material. Es wird gelesen, nie geaendert — sonst weiss
# spaeter niemand mehr, was davon Original war und was wir dazugetan haben.
#
# Der Hook bekommt den Werkzeugaufruf als JSON auf die Standardeingabe.
# Rueckgabe 2 heisst: abbrechen, und was auf der Standardfehlerausgabe steht,
# bekommt Claude als Begruendung zu lesen.
set -euo pipefail

EINGABE=$(cat)
PFAD=$(printf '%s' "$EINGABE" | /usr/bin/python3 -c \
  'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' \
  2>/dev/null || true)

case "$PFAD" in
  */raw/*|raw/*)
    echo "Abgebrochen: $PFAD liegt in raw/. Dieser Ordner wird nur gelesen." >&2
    echo "Wenn daraus etwas Eigenes werden soll, leg es unter wiki/ neu an." >&2
    exit 2
    ;;
esac
exit 0
