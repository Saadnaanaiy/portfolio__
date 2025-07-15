/** @type {import('tailwindcss').Config} */ export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lightHover: '#fcf4ff',
        darkHover: '#2a004a',
        darkThem: '#11001f',
      },
      fontFamily: { Outfit: ['Outfit', 'sans-serif'], Ovo: ['Ovo', 'serif'] },
      boxShadow: { black: '4px 4px 0 #000', white: '4px 4px 0 #fff' },
      gridTemplateColumns: { auto: 'repeat(auto-fit, minmax(200px, 1fr))' },
      animation: { 'fade-in': 'fadeIn 1s ease-out' },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
