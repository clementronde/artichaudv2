import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blanc: '#F2F2F2',
        noir: '#191919',
        orange: '#FF6F00',
        'orange-fonce': '#FF4400',
        rouge: '#FF0000',
        'rouge-fonce': '#C30000',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        instrument: ['var(--font-instrument)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease',
        'fade-in-up': 'fadeInUp 1s ease',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
