"use client";

import { useActionState } from "react";
import { anmelden, registrieren } from "./aktionen";

export default function LoginSeite() {
  const [fehlerAnmeldung, anmeldeAktion, laeuftAnmeldung] = useActionState(
    anmelden,
    null,
  );
  const [fehlerRegistrierung, registrierAktion, laeuftRegistrierung] =
    useActionState(registrieren, null);

  const fehler = fehlerAnmeldung ?? fehlerRegistrierung;
  const laeuft = laeuftAnmeldung || laeuftRegistrierung;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-6 dark:bg-neutral-950">
      <form className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-sm dark:bg-neutral-900">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            Ihr Board
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Anmelden oder beim ersten Mal ein Konto anlegen.
          </p>
        </div>

        <label className="block space-y-1">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            E-Mail
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-400"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            Passwort
          </span>
          <input
            name="passwort"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-400"
          />
        </label>

        {fehler && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
          >
            {fehler}
          </p>
        )}

        <div className="flex gap-2">
          <button
            formAction={anmeldeAktion}
            disabled={laeuft}
            className="flex-1 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900"
          >
            Anmelden
          </button>
          <button
            formAction={registrierAktion}
            disabled={laeuft}
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-50"
          >
            Konto anlegen
          </button>
        </div>
      </form>
    </main>
  );
}
