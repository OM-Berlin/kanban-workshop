# Kanban-Board — Referenzprojekt zum Claude-Code-Intensivkurs

Der Arbeitsordner, wie er im Kurs entsteht. Jeder Tag endet mit einem festen
Stand. Wer hängen bleibt, holt sich den Stand des Vortags und macht weiter.

| Marke | Stand am Ende von |
|---|---|
| `tag-1-montag` | Montag — Einrichtung, erstes CLAUDE.md, Ordnung im Projekt |
| `tag-2-dienstag` | Dienstag — eigene Skill, zwei Hooks, angebundene Ablage, erste Wissensseite |
| `startvorlage` | Mittwochvormittag — die Vorlage zum Klonen: Anmeldung und Datenbank stehen, das Board ist leer |
| `tag-3-mittwoch` | Mittwoch — das fertige Board, im Netz erreichbar |
| `tag-4-donnerstag` | Donnerstag — dazu das Bild- und Videomaterial |

Einen Stand holen:

```bash
git clone https://github.com/OM-Berlin/kanban-workshop.git
cd kanban-workshop
git checkout tag-2-dienstag
```

Ab `startvorlage` steht in dieser Datei auch, wie die Anwendung in Betrieb
geht. Solange hier noch keine Anwendung liegt, gibt es nichts zu starten —
der Ordner ist Arbeitsplatz, noch kein Programm.
