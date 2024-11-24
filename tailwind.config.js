/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This allows you to toggle dark mode using a class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
        fira: ["Fira Sans"]
      }
    },
  },
  plugins: [
  ],
}