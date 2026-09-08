import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Läuft vor jeder Anfrage. Zwei Aufgaben:
 * 1. Die Anmelde-Sitzung auffrischen, damit niemand mitten im Arbeiten
 *    herausfliegt.
 * 2. Wer nicht angemeldet ist, landet auf /login.
 *
 * In Next.js 16 heißt diese Datei proxy.ts — früher middleware.ts.
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Zwischen createServerClient und getUser() gehört kein Code. Ein Fehler an
  // dieser Stelle führt dazu, dass Nutzer scheinbar zufällig abgemeldet werden.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pfad = request.nextUrl.pathname;
  if (!user && !pfad.startsWith("/login") && !pfad.startsWith("/auth")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Diese Antwort muss unverändert zurückgegeben werden, sonst laufen Browser
  // und Server bei den Cookies auseinander.
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
