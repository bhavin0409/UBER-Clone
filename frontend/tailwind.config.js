/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js,ts,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

console.log(require('path').resolve('./src/**/*.{js,ts,jsx,tsx,vue}'));



