/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/**/*.{js,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Mantém as cores padrão do Tailwind
        // Você pode adicionar cores customizadas aqui se necessário
      },
    },
  },
  plugins: [],
}

