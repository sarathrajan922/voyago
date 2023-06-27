/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        'custom': '.5px'
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        customBlue: '#0C1326',
        customFontColorBlack:'#2A3B4F'
      }
    },
  },
  plugins: [
    flowbitePlugin
  ],
});