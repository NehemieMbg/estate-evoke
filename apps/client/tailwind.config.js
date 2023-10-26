/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
