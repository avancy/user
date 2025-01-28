const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './constrants/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundColor: {
        'primary-hover':
          'linear-gradient(90deg, rgba(18, 210, 214, 0.01) 0%, rgba(18, 210, 214, 0.08) 100%)',
      },
      screens: {
        sm: '576px',
        xs: '640px',
        md: '868px',
        xd: '946px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        grotesque: ['Darker Grotesque', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        helvetica: ['Helvetica Neue', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '2xl': '40rem',
      },
      colors: {
        footer: '#D9D9D9',
        primary: 'var(--color-primary)',
        secundary: 'var(--color-secondary)',
        'brand-primary': {
          DEFAULT: '#195578',
          100: '#2578AA',
          200: '#226D9A',
          300: '#195578',
          400: '#0A3851',
          500: '#00283D',
        },
        'brand-gradient-primary': '#2581A9',
        'brand-gradient-secondary': '#24EEA0',
        'brand-secondary': {
          DEFAULT: '#24EFA1',
          100: '#D3FCEC',
          200: '#A7F9D9',
          300: '#7CF5C7',
          400: '#50F2B4',
          500: '#24EFA1',
        },
        softBlue: '#195578',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
