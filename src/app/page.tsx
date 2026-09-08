import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Board, { type Karte, type Spalte } from "./board";
import { abmelden, spalteAnlegen } from "./aktionen";

export const dynamic = "force-dynamic";

export default async function Startseite() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Die Zugriffsregel in der Datenbank sorgt dafür, dass hier nur die eigenen
  // Zeilen ankommen. Ein zusätzliches Filtern im Code wäre kein Schutz.
  const [{ data: spalten }, { data: karten }] = await Promise.all([
    supabase.from("lists").select("id, title").order("position"),
    supabase.from("cards").select("id, list_id, title").order("position"),
  ]);

  return (
    <main className="min-h-screen bg-white p-6 dark:bg-neutral-950">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Ihr Board
          </h1>
          <p className="text-sm text-neutral-500">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <form action={spalteAnlegen}>
            <input
              name="titel"
              placeholder="Neue Spalte …"
              maxLength={80}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50"
            />
          </form>
          <form action={abmelden}>
            <button className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              Abmelden
            </button>
          </form>
        </div>
      </header>

      <Board
        spalten={(spalten ?? []) as Spalte[]}
        karten={(karten ?? []) as Karte[]}
      />
    </main>
  );
}
