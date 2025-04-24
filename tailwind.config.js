/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,html,mdx}',
    // Case-sensitive paths for different project structures
    './Pages/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
    './App/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#78A9FF',
        secondary: '#98BDFF',
        background: '#F0F8FF',
        textcolor: '#2C3E50',
        accent: '#B2DAFF',
        'cat-light': '#DCEBFF',
        'cat-dark': '#5B87C7',
        'blue-dark': '#1E3A5F',
        'blue-medium': '#3B6AA0',
        'blue-light': '#B2DAFF',
        'blue-pale': '#D6E8FF',
        'blue-accent': '#5B87C7'
      },
      fontFamily: {
        'nunito': ['Nunito Sans', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'text-shimmer': 'textShimmer 3s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(90deg, #1E3A5F, #78A9FF, #B2DAFF)',
        'gradient-ocean': 'linear-gradient(90deg, #3B6AA0, #98BDFF, #D6E8FF)'
      }
    },
  },
  plugins: [],
  important: true, // This helps ensure Tailwind styles take precedence
} 