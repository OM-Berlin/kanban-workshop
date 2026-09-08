import { createBrowserClient } from "@supabase/ssr";

/** Supabase-Client für alles, was im Browser läuft (Client-Komponenten). */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
