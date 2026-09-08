import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ohne diese Zeile sucht Next.js die package-lock.json aufwaerts im
  // Dateisystem und findet unter Umstaenden eine fremde ausserhalb des
  // Projekts. Gemeint ist die Wurzel dieses Projekts, sonst nichts.
  turbopack: { root: __dirname },
};

export default nextConfig;
