import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Variables de la maquette Figma « Landing gîte »
      colors: {
        creme: "#fff9f0",
        blanc: "#fcfcfc",
        framboise: "#25040f",
        rose: "#f580a0",
        vert: "#b2a837",
        sapin: "#202304",
        jaune: "#fadf99",
        bleu: "#bfe2fd",
        marron: "#210e02",
        violet: "#241039",
        sable: "#fdf3d9",
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-gsf)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        // Google Sans Flex est variable : ExtraLight 200 → Bold 700
        extralight: "200",
      },
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
