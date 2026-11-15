import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blanc: "#fcfcfc",
        gris: "#f0f0f0",
        "bleu-fonce": "#01292c",
        "bleu-fluo": "#3cfff2",
        violet: "#241039",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Styles Figma : H1 / H2 / Button / Txt_Medium (tracking -6%)
        h1: ["60px", { lineHeight: "1", letterSpacing: "-0.06em" }],
        h2: ["40px", { lineHeight: "1", letterSpacing: "-0.06em" }],
        button: ["20px", { lineHeight: "1", letterSpacing: "-0.06em" }],
        txt: ["16px", { lineHeight: "1", letterSpacing: "-0.06em" }],
        card: ["18px", { lineHeight: "1.14", letterSpacing: "-0.04em" }],
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
