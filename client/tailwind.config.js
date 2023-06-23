/** @type {import('tailwindcss').Config} */
// import flowbitePlugin from 'flowbite/plugin';
export const content = ["./src/**/*.{html,js,ts,jsx,tsx}"];
export const theme = {
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
};
export const plugins= [];

// module.exports = {
//   darkMode: 'class',
//   purge: ['./src/**/*.{html,js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       padding: {
//         'custom': '.5px',
//       },
//       fontFamily: {
//         sans: ['Roboto', 'Arial', 'sans-serif'],
//         serif: ['Merriweather', 'serif'],
//       },
//       colors: {
//         customBlue: '#0C1326',
//         customFontColorBlack: '#2A3B4F',
//       },
//     },
//   },
//   plugins: [],
// };



