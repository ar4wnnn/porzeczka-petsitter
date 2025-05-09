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
        frost: '#F0F4F8',
        stone: {
          light: '#D1D5DB',
          medium: '#9CA3AF',
          DEFAULT: '#8A8A8A',
          dark: '#4B5563',
        },
        sky: {
          light: '#BAE6FD',
          medium: '#38BDF8',
          DEFAULT: '#38BDF8',
          dark: '#0EA5E9',
        },
        primary: 'var(--sky-dark)',
        secondary: 'var(--stone-medium)',
        background: 'var(--frost)',
        textcolor: 'var(--stone-dark)',
        accent: 'var(--sky-light)',
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
        'gradient-sky': 'linear-gradient(90deg, var(--sky-dark), var(--sky-medium), var(--sky-light))',
        'gradient-stone': 'linear-gradient(90deg, var(--stone-dark), var(--stone-medium), var(--stone-light))',
      }
    },
  },
  plugins: [],
  important: true, // This helps ensure Tailwind styles take precedence
} 