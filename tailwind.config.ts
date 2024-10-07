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
        white: 'var(--white)',
        black: 'var(--black)',
        gray: 'var(--gray)',
        lightgray: 'var(--lightgray)',
        red: 'var(--red)',
      },
    },
  },
  plugins: [],
};
export default config;
