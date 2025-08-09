/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",         // Include index.html
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in src
  ],
  theme: {
    extend: {
      fontFamily:{
        blauer: ['"Blauer Nue"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
