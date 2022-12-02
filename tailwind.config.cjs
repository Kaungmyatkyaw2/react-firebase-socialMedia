/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'sans' : "Libre Franklin",
        'pop' : "Poppins"
      },
      colors : {
        'primary' : '#1877F2'
      },
      boxShadow: {
        cus :  '0px 8px 24px rgba(149, 157, 165, 0.2)'
      }
    },
  },
  plugins: [],
}
