import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-helvetica)', 'sans-serif'],
      },
      colors: {
        'arti-black': '#191919',
        'arti-dark': '#272626',
        'arti-gray': '#656565',
        'arti-light': '#F2F2F2',
        'white': '#FFFFFF',
      },
      fontSize: {
        'display': ['100px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'giant': ['312px', { lineHeight: '1.0' }],
        'h1': ['50px', { lineHeight: '1.2' }],
        'h2': ['45px', { lineHeight: '63px' }],
        'lead': ['22px', { lineHeight: '30.8px' }],
        'body': ['16px', { lineHeight: '23.04px' }],
        'small': ['14px', { lineHeight: '20.16px' }]
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [],
};
export default config;