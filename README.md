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

## In Betrieb nehmen

Ab dem Stand `startvorlage` liegt hier eine Anwendung.

1. **Abhängigkeiten installieren**

   ```bash
   npm install
   ```

2. **Supabase-Projekt anlegen** auf [supabase.com](https://supabase.com) —
   das kostenlose Kontingent reicht für den Kurs.

3. **Tabellen und Zugriffsregel einspielen.** Im Supabase-Dashboard auf
   *SQL Editor*, den Inhalt von [`supabase/schema.sql`](supabase/schema.sql)
   einfügen, *Run*.

4. **Schlüssel eintragen.** `.env.example` nach `.env.local` kopieren und die
   beiden Werte aus *Project Settings → API Keys* einsetzen.

5. **E-Mail-Bestätigung ausschalten**, damit im Kurs niemand auf eine Mail
   wartet: *Authentication* → *Sign In / Providers* → *Email* →
   *Confirm email* aus.

6. **Starten**

   ```bash
   npm run dev
   ```

   Dann [localhost:3000](http://localhost:3000) öffnen, Konto anlegen, fertig.

## Ins Netz stellen

Auf [vercel.com](https://vercel.com) mit dem GitHub-Konto anmelden, dieses
Repository auswählen. Die beiden Werte aus `.env.local` müssen dort unter
*Environment Variables* noch einmal eingetragen werden — Vercel kann
`.env.local` nicht sehen, und das ist gut so.

## Was wo liegt

| Datei | Zweck |
|---|---|
| `supabase/schema.sql` | Tabellen, Zugriffsregel, Startspalten |
| `src/proxy.ts` | Frischt die Anmeldung auf und schickt Nicht-Angemeldete zu `/login` |
| `src/lib/supabase/` | Die Verbindung zur Datenbank, einmal für den Browser, einmal für den Server |
| `src/app/page.tsx` | Lädt Spalten und Karten und zeigt das Board |
| `src/app/aktionen.ts` | Alles, was schreibt |
| `src/app/login/` | Anmelden und Konto anlegen |
