"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function lesen(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const passwort = String(formData.get("passwort") ?? "");
  return { email, passwort };
}

export async function anmelden(_zustand: string | null, formData: FormData) {
  const { email, passwort } = lesen(formData);
  if (!email || !passwort) return "Bitte E-Mail und Passwort ausfüllen.";

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: passwort,
  });
  if (error) return "Anmeldung fehlgeschlagen. Stimmen E-Mail und Passwort?";

  revalidatePath("/", "layout");
  redirect("/");
}

export async function registrieren(
  _zustand: string | null,
  formData: FormData,
) {
  const { email, passwort } = lesen(formData);
  if (!email || !passwort) return "Bitte E-Mail und Passwort ausfüllen.";
  if (passwort.length < 8) return "Das Passwort braucht mindestens 8 Zeichen.";

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password: passwort });
  if (error) return "Registrierung fehlgeschlagen: " + error.message;

  revalidatePath("/", "layout");
  redirect("/");
}
