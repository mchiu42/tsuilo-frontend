/** @type {import('tailwindcss').Config} */
const customColors = {
  'primary-1': '#FF006E',
  'primary-2': '#FF4D9A',
  'primary-3': '#FFC3DC',
  'primary-1': '#FF006E',
  'primary-2': '#FF4D9A',
  'primary-3': '#FFC3DC',
  'secondary-1': '#00B3F0',
  'secondary-2': '#90D8F0',
  'secondary-3': '#D6EDF5',
  'neutral-1:': '#080808',
  'neutral-2:': '#3A3A3B',
  'neutral-3:': '#6D6D6E',
  'neutral-4:': '#B8BaBa',
  'neutral-5:': '#EBECED',
  'black': '#222426',
  'lightgray': '#F5F5F5',
  'white': '#FFFFFF',
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...customColors
      },
      backgroundColor: {
        ...customColors
      },
      borderColor:{
        ...customColors
      },
      textColor: {
        ...customColors
      }
    },
  },
  plugins: [],
}

