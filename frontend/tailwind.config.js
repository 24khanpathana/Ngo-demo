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
        primary: '#0f9f8f',
        primaryHover: '#0b7f73',
        darkBg: '#071513',
        darkCard: '#10211f',
        honey: '#f59e0b',
        mist: '#f7faf6',
      }
    },
  },
  plugins:[],
}
