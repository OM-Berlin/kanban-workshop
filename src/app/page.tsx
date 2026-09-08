import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { abmelden } from "./aktionen";

export const dynamic = "force-dynamic";

export default async function Startseite() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-white p-6 dark:bg-neutral-950">
      <header className="mb-10 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Ihr Board
          </h1>
          <p className="text-sm text-neutral-500">{user.email}</p>
        </div>
        <form action={abmelden}>
          <button className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
            Abmelden
          </button>
        </form>
      </header>

      <section className="mx-auto max-w-md rounded-2xl border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-700">
        <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          Hier entsteht Ihr Board
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Die Anmeldung steht, die Datenbank ist verbunden. Was fehlt, sind die
          Spalten und die Karten — das bauen Sie im naechsten Block.
        </p>
      </section>
    </main>
  );
}
