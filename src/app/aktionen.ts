"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Alles, was in die Datenbank schreibt, gehoert in diese Datei. Sie laeuft auf
 * dem Server — der Browser ruft sie nur auf. Bisher steht hier nur das
 * Abmelden; Karten und Spalten kommen in der Uebung dazu.
 */

export async function abmelden() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
