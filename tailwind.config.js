/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Incluye todos los archivos dentro de src
    "./public/index.html"          // También el index.html si usas clases ahí
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
