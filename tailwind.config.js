/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        wef: {
          pink: '#D4387A',
          'pink-light': '#E8559A',
          'pink-dark': '#A52960',
          purple: '#6B21A8',
          'purple-light': '#9333EA',
          'purple-dark': '#4C1481',
          rose: '#F4A6C8',
          'rose-light': '#FDE8F3',
          cream: '#FFF8FC',
          charcoal: '#1A1A2E',
          gray: '#6B7280',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1A0A2E 0%, #4C1481 40%, #8B2673 70%, #D4387A 100%)',
        'section-gradient': 'linear-gradient(180deg, #FFF8FC 0%, #FDE8F3 100%)',
        'card-gradient': 'linear-gradient(135deg, #ffffff 0%, #FDE8F3 100%)',
        'cta-gradient': 'linear-gradient(135deg, #4C1481 0%, #8B2673 50%, #D4387A 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
