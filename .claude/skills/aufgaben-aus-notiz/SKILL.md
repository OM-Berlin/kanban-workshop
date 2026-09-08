---
name: aufgaben-aus-notiz
description: Macht aus einer rohen Notiz saubere Aufgabenkarten. Nutze diesen Skill, wenn ich ein Besprechungsprotokoll, eine Sprachnotiz, eine Mail oder eine Stichwortliste hinwerfe und daraus Aufgaben werden sollen — auch bei "mach Karten draus", "was ist hier zu tun", "sortier das mal".
---

# Aus einer Notiz werden Aufgaben

Rohe Notizen sind ein Durcheinander aus Beschlüssen, Aufgaben, Meinungen und
Geplauder. Dieser Skill zieht heraus, was zu tun ist — und lässt den Rest liegen.

## Ablauf

1. **Die Notiz lesen, ohne zu sortieren.** Erst am Ende entscheiden.

2. **Jeden Satz einer der vier Sorten zuordnen:**

   | Sorte | Erkennungszeichen | Wohin |
   |---|---|---|
   | Aufgabe | jemand tut etwas, das noch offen ist | wird eine Karte |
   | Entscheidung | „wir machen es so" | nach `decisions/log.md` |
   | Wissen | gilt auch nächsten Monat noch | nach `wiki/` |
   | Rest | Meinung, Geplauder, Wiederholung | bleibt liegen |

3. **Jede Aufgabe auf eine Zeile bringen.** Regeln für den Kartentext:
   - Fängt mit einem Verb an: „Angebot schreiben", nicht „Angebot".
   - Höchstens acht Wörter.
   - Eine Sache je Karte. Steht ein „und" drin, sind es zwei Karten.
   - Keine Namen im Kartentext, wenn ohnehin klar ist, wer es macht.

4. **Nachfragen, statt zu erfinden.** Wenn unklar bleibt, ob etwas eine
   Aufgabe ist, danach fragen. Lieber eine Rückfrage als eine erfundene Karte.

5. **Am Ende zeigen, was liegen geblieben ist** — in einem Satz. Damit sichtbar
   ist, was ich weggelassen habe, und ich widersprechen kann.

## Ausgabe

Erst die Karten als einfache Liste, danach getrennt die Entscheidungen und die
Wissenspunkte. Nichts direkt in Dateien schreiben, ohne zu fragen.

## Beispiel

Notiz:

> kurz mit Frau Berger telefoniert, die will das Angebot bis Freitag, ich
> glaube die sind preislich eh raus. wir bleiben bei 14 Tagen Zahlungsziel,
> das hatten wir ja so beschlossen. ach und der Drucker spinnt wieder

Ergebnis:

**Karten**
- Angebot für Frau Berger schreiben (bis Freitag)
- Drucker prüfen lassen

**Entscheidung**
- Zahlungsziel bleibt bei 14 Tagen

**Liegen geblieben:** die Vermutung, dass der Kunde preislich nicht infrage
kommt — eine Einschätzung, keine Aufgabe.
