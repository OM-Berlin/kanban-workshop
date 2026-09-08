# Mein Projekt — Arbeitsregeln für Claude Code

Hier entsteht ein einfaches Kanban-Board: Spalten, Karten, verschieben.
Wie bei Trello, nur selbst gebaut.

Diese Datei liest Claude Code bei jedem Start. Was hier steht, gilt — ohne
dass ich es jedes Mal neu sagen muss.

## Über mich

Ich bin kein Programmierer. Erklär mir, was du tust, in normalen Sätzen.
Wenn ein Fachwort unvermeidlich ist, schreib in Klammern dazu, was es heißt.

## Sprache

Deutsch. Auch in Kommentaren und Commit-Nachrichten.

## Wie wir arbeiten

- **Erst sagen, dann machen.** Bei allem, was mehr als eine Datei berührt:
  kurz den Plan nennen, auf mein Ja warten.
- **Nichts löschen ohne Rückfrage.** Auch keine Dateien, die überflüssig
  aussehen.
- **Kleine Schritte.** Lieber fünf Mal etwas Kleines, das läuft, als einmal
  alles auf einmal.
- **Wenn etwas nicht geht, sag es.** Kein Herumraten, keine erfundene Lösung.

## Was wo liegt

| Ordner | Wofür |
|---|---|
| `brainstorms/` | Überlegungen und Übergaben zwischen Sitzungen |
| `decisions/` | Entscheidungen mit Datum und Begründung. Wird nie gelöscht |
| `wiki/` | Wissen, das ich nachschlage. Von Claude gepflegt |
| `raw/` | Fremdes Material, unbearbeitet. Nur lesen |
| `outputs/` | Fertige Ergebnisse |

## Am Ende jeder Sitzung

Eine Übergabe nach `brainstorms/` schreiben: Was ist passiert, was ist offen,
womit geht es weiter. Damit die nächste Sitzung nicht bei null anfängt.

---

*Ab hier: dazugekommen am Dienstag.*

## Wie du antwortest

Kurz. Kein „Gerne!", kein „Ich hoffe, das hilft!". Sag, was du getan hast und
was als Nächstes ansteht — mehr nicht. Wenn ich mehr wissen will, frage ich.

## Was ich mir gebaut habe

| Werkzeug | Was es tut |
|---|---|
| `.claude/skills/aufgaben-aus-notiz/` | Macht aus einer rohen Notiz saubere Aufgabenkarten |
| `.claude/hooks/letzte-uebergabe.sh` | Zeigt beim Start der Sitzung die letzte Übergabe |
| `.claude/hooks/raw-ist-schreibgeschuetzt.sh` | Bricht ab, wenn jemand in `raw/` schreiben will |
| `.mcp.json` | Bindet einen einzelnen Ordner meiner Ablage an |

Ein Hook ist keine Bitte, sondern eine Sperre. Wenn der zweite Hook zuschlägt,
ist das kein Fehler — dann war der Schreibversuch falsch.

## Wissen pflegen

Was ich in vier Wochen noch einmal nachschlage, gehört nach `wiki/` — mit
einer Zeile in `wiki/index.md`, sonst findet es niemand wieder. Was nur heute
gilt, gehört nicht dorthin.

Harte Entscheidungen kommen nach `decisions/log.md`, unten angehängt, mit
Datum und Begründung. Alte Einträge werden nicht geändert.

## Schlüssel

Kommen nie in eine Datei, die hochgeladen wird. Sie stehen in `.env.local`.
Wenn dir ein Schlüssel irgendwo anders begegnet, sag es mir, statt ihn zu
verschieben.

---

*Ab hier: dazugekommen am Mittwoch, als die Anwendung anfing.*

## Die Anwendung

Next.js im Browser, Supabase als Datenbank, Vercel fuers Hosting.

- **Geschrieben wird nur in `src/app/aktionen.ts`.** Alle anderen Dateien
  lesen. Wer eine neue Schreibfunktion braucht, legt sie dort an.
- **Die `user_id` kommt aus der Sitzung, nie aus dem Formular.** Sonst kann
  jemand Karten unter fremdem Namen anlegen.
- **Row Level Security bleibt an.** Wenn eine Abfrage nichts zurueckgibt, ist
  fast immer die Zugriffsregel gemeint, nicht der Code. Regel pruefen, nicht
  Sicherheit abschalten.
- **Keine zusaetzliche Bibliothek fuers Ziehen und Fallenlassen.** Der Browser
  kann das selbst.
- **Schema-Aenderungen gehoeren nach `supabase/schema.sql`** und werden so
  geschrieben, dass das Skript mehrfach laufen kann (`create table if not
  exists`, `drop policy if exists`). Sonst kann niemand den Stand nachbauen.

Bevor etwas als fertig gilt:

```bash
npm run lint
npm run build
```
