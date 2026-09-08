---
titel: Begriffe rund um das Board
type: concept
stand: 2026-09-15
---

# Begriffe rund um das Board

Die Wörter, die in diesem Projekt immer wieder vorkommen. Wenn ich sie hier
einmal festlege, muss ich sie nicht in jedem Auftrag neu erklären.

## Spalte

Eine senkrechte Bahn auf dem Board. Sie sagt, in welchem Zustand eine Aufgabe
ist — nicht, wer sie macht und nicht, wie dringend sie ist. Drei Spalten
reichen für den Anfang: Zu erledigen, In Arbeit, Fertig.

## Karte

Eine einzelne Aufgabe. Eine Karte wandert über das Board, sie wird nicht
kopiert. Was der Text einer Karte können muss, steht im Skill
[aufgaben-aus-notiz](../.claude/skills/aufgaben-aus-notiz/SKILL.md).

## Zugriffsregel

Die Regel in der Datenbank, die festlegt, wer welche Zeilen sehen darf.
Englisch *Row Level Security*. Sie sitzt in der Datenbank, nicht im Programm —
deshalb gilt sie auch dann, wenn jemand am Programm vorbei zugreift.

Das ist der Grund, warum der öffentliche Schlüssel im Browser stehen darf: er
öffnet nichts, solange die Regel steht.

## Umgebungsvariable

Ein Wert, der nicht im Programmtext steht, sondern daneben — in `.env.local`
auf dem eigenen Rechner, bei Vercel in den Einstellungen. Schlüssel gehören
dorthin, damit sie beim Hochladen nicht mitgehen.
