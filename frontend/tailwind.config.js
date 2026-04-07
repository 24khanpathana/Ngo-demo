/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans:['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#10b981', // Modern Emerald
        primaryHover: '#059669',
        darkBg: '#0f172a', // Slate 900
        darkCard: '#1e293b', // Slate 800
      }
    },
  },
  plugins:[],
}