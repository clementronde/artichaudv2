import type { NextConfig } from "next";
import path from "node:path";

// `npm run preview:static` produit un export statique autonome (dossier `out/`), aux chemins relatifs,
// pour publier un aperçu en ligne sans serveur. Le build normal reste un site Next classique (Vercel).
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  turbopack: { root: path.join(__dirname) },
  images: isStatic ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  ...(isStatic ? { output: "export" as const, assetPrefix: "." } : {}),
};

export default nextConfig;
