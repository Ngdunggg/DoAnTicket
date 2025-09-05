/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'bg-black': '#01060F',
        'bg-yellow': '#FCCB62',
        'text-white': '#FFFFFF',
        'text-yellow': '#FCCB62',
        'text-black': '#01060F',
        'text-gray': '#F7F7F1',
        'text-gray-2': '#6C757D',
        'text-red': '#E03E2D',
      },
      backgroundColor: {
        'bg-black': '#01060F',
        'bg-yellow': '#FCCB62',
      },
      textColor: {
        'text-white': '#FFFFFF',
        'text-yellow': '#FCCB62',
        'text-black': '#01060F',
        'text-gray': '#F7F7F1',
        'text-gray-2': '#6C757D',
        'text-red': '#E03E2D',
      },
      borderColor: {
        'bg-yellow': '#FCCB62',
        'text-yellow': '#FCCB62',
      }
    },
  },
  plugins: [],
}
