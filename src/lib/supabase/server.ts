import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase-Client für alles, was auf dem Server läuft — Server-Komponenten,
 * Server-Aktionen, Route-Handler. Muss pro Anfrage neu erzeugt werden, weil
 * die Sitzung in den Cookies dieser einen Anfrage steckt.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Aus einer Server-Komponente heraus lassen sich keine Cookies
            // setzen. Das ist unkritisch: proxy.ts frischt die Sitzung auf.
          }
        },
      },
    },
  );
}
