/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#E57373',
          dark: '#C62828',
          light: '#FFCDD2',
        },
        secondary: {
          DEFAULT: '#81C784',
          dark: '#388E3C',
          light: '#C8E6C9',
        },
      },
    },
  },
  plugins: [],
} 