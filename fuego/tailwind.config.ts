import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Variables Figma (get_variable_defs), vérifiées sur le screenshot
      colors: {
        cream: "#fffef6",
        charbon: "#1a000b",
        burgundy: "#4c020c",
        blue: "#a0d1ff",
      },
      fontFamily: {
        // Variables définies dans src/app/fonts.ts (next/font/local)
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      // Largeur du cadre Figma
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
