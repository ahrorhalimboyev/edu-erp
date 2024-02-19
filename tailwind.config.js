/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        global1: "#12486B",
        error_color: "red",
      },
    },
  },
  plugins: [],
};
