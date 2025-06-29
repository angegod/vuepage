/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
  ],
  darkMode: false, // 或 'media' 或 'class'，視需求
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

