/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors :{
          primary : {
            dark : '#121921',
            light : '#232f3f',
          },
          yellow : {
            light : '#febd69',
            dark : '#fed813'
          }
        }
      },
    },
    plugins: [
      require('tailwind-scrollbar'),
    ],
  }