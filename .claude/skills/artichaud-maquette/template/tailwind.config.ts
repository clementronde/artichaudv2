import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // __COULEURS__ : reprendre les noms et valeurs des variables Figma (get_variable_defs), vérifiées sur le screenshot
      colors: {
        fond: "#ffffff",
        texte: "#111111",
        accent: "#000000",
      },
      fontFamily: {
        // Variables définies dans src/app/layout.tsx (next/font/local)
        titre: ["var(--font-titre)", "Georgia", "serif"],
        sans: ["var(--font-texte)", "system-ui", "sans-serif"],
      },
      // Largeur du cadre Figma (souvent 1440 ou 1512)
      maxWidth: { site: "1512px" },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
