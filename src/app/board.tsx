"use client";

import { useState } from "react";
import { karteAnlegen, karteLoeschen, karteVerschieben } from "./aktionen";

export type Spalte = { id: string; title: string };
export type Karte = { id: string; list_id: string; title: string };

/**
 * Das Board. Ziehen und Fallenlassen läuft über die eingebaute Funktion des
 * Browsers (draggable + onDrop) — dafür braucht es keine zusätzliche Bibliothek.
 */
export default function Board({
  spalten,
  karten,
}: {
  spalten: Spalte[];
  karten: Karte[];
}) {
  const [ueberSpalte, setUeberSpalte] = useState<string | null>(null);

  async function fallenlassen(zielSpalteId: string, karteId: string) {
    setUeberSpalte(null);
    if (!karteId) return;
    const anzahl = karten.filter((k) => k.list_id === zielSpalteId).length;
    await karteVerschieben(karteId, zielSpalteId, anzahl);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {spalten.map((spalte) => {
        const eigene = karten.filter((k) => k.list_id === spalte.id);
        const aktiv = ueberSpalte === spalte.id;

        return (
          <section
            key={spalte.id}
            onDragOver={(e) => {
              e.preventDefault();
              setUeberSpalte(spalte.id);
            }}
            onDragLeave={() => setUeberSpalte(null)}
            onDrop={(e) => {
              e.preventDefault();
              fallenlassen(spalte.id, e.dataTransfer.getData("text/karte"));
            }}
            className={`flex w-72 shrink-0 flex-col gap-3 rounded-2xl p-3 transition-colors ${
              aktiv
                ? "bg-neutral-200 dark:bg-neutral-800"
                : "bg-neutral-100 dark:bg-neutral-900"
            }`}
          >
            <header className="flex items-baseline justify-between px-1">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {spalte.title}
              </h2>
              <span className="text-xs text-neutral-500">{eigene.length}</span>
            </header>

            <ul className="flex flex-col gap-2">
              {eigene.map((karte) => (
                <li
                  key={karte.id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/karte", karte.id)
                  }
                  className="group flex items-start justify-between gap-2 rounded-xl bg-white p-3 text-sm text-neutral-900 shadow-sm active:cursor-grabbing dark:bg-neutral-800 dark:text-neutral-100"
                >
                  <span className="break-words">{karte.title}</span>
                  <form action={karteLoeschen}>
                    <input type="hidden" name="karteId" value={karte.id} />
                    <button
                      type="submit"
                      aria-label={`Karte „${karte.title}" löschen`}
                      className="opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                    >
                      <span aria-hidden className="text-neutral-400">
                        ×
                      </span>
                    </button>
                  </form>
                </li>
              ))}
            </ul>

            <form action={karteAnlegen} className="px-1">
              <input type="hidden" name="listId" value={spalte.id} />
              <input
                name="titel"
                placeholder="Neue Karte …"
                maxLength={200}
                className="w-full rounded-lg border border-transparent bg-white/60 px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-300 dark:bg-neutral-800/60 dark:text-neutral-100 dark:focus:border-neutral-600"
              />
            </form>
          </section>
        );
      })}
    </div>
  );
}
