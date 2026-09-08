"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Alle Schreibvorgänge laufen über diese Datei. Sie läuft auf dem Server —
 * der Browser ruft sie nur auf. Die user_id kommt aus der Sitzung, nie aus
 * dem Formular: sonst könnte jemand fremde Karten anlegen.
 */

async function angemeldet() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export async function karteAnlegen(formData: FormData) {
  const listId = String(formData.get("listId") ?? "");
  const titel = String(formData.get("titel") ?? "").trim();
  if (!listId || !titel) return;

  const { supabase, user } = await angemeldet();

  const { data: letzte } = await supabase
    .from("cards")
    .select("position")
    .eq("list_id", listId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("cards").insert({
    user_id: user.id,
    list_id: listId,
    title: titel.slice(0, 200),
    position: (letzte?.position ?? -1) + 1,
  });

  revalidatePath("/");
}

export async function karteVerschieben(
  karteId: string,
  zielListeId: string,
  zielPosition: number,
) {
  const { supabase } = await angemeldet();

  await supabase
    .from("cards")
    .update({ list_id: zielListeId, position: zielPosition })
    .eq("id", karteId);

  revalidatePath("/");
}

export async function karteLoeschen(formData: FormData) {
  const karteId = String(formData.get("karteId") ?? "");
  if (!karteId) return;

  const { supabase } = await angemeldet();
  await supabase.from("cards").delete().eq("id", karteId);

  revalidatePath("/");
}

export async function spalteAnlegen(formData: FormData) {
  const titel = String(formData.get("titel") ?? "").trim();
  if (!titel) return;

  const { supabase, user } = await angemeldet();

  const { data: letzte } = await supabase
    .from("lists")
    .select("position")
    .eq("user_id", user.id)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("lists").insert({
    user_id: user.id,
    title: titel.slice(0, 80),
    position: (letzte?.position ?? -1) + 1,
  });

  revalidatePath("/");
}

export async function abmelden() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
