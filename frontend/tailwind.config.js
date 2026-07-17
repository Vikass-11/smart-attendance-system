/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode toggling via className="dark" on <html>
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Overrides default sans font with Inter
      },
    },
  },
  plugins: [],
}