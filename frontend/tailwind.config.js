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
        primary: '#44C3E6',
        primaryHover: '#9A5734',
        darkBg: '#9A5734',
        darkCard: '#9A5734',
        black: '#000000',
        honey: '#E26B29',
        clay: '#9A5734',
        sand: '#C5A180',
        mist: '#FBFFFA',
        linen: '#EAED71',
      }
    },
  },
  plugins:[],
}
