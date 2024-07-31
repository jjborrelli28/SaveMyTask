/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        }
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      colors: {
        white: '#fff',
        white: '#f5f5f5',
        'light-gray': '#efefef',
        gray: '#e0e0e0',
        'dark-gray': 'cfcfcf',
        black: '#000',
        black: '#333333',
        background: '#f0d9d1',
        lilac: '#bba8d6',
        green: '#2ecc71',
        yellow: '#f6ce7c',
        orange: '#f39c12',
        red: '#e74c3c'
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem'
      }
    },
    keyframes: {
      'blink-background-gray': {
        '0%, 100%': { backgroundColor: 'rgba(224, 224, 224, 0.5)' },
        '50%': { backgroundColor: 'rgba(224, 224, 224, 1)' }
      },
      'blink-text-black': {
        '0%, 100%': { color: 'rgba(51, 51, 51, 1)' },
        '50%': { color: 'rgba(51, 51, 51, 0.5)' }
      },
      'draw-border-black': {
        '0%': {
          'border-bottom-height': '0',
          'border-bottom-color': 'transparent'
        },
        '100%': {
          'border-bottom-width': '100px',
          'border-bottom-color': '#333333'
        }
      }
    },
    animation: {
      'blink-background-gray': 'blink-background-gray 1s infinite',
      'blink-text-black': 'blink-text-black 1s infinite',
      'draw-border-black': 'draw-border-black 1s ease-out forwards'
    }
  },
  plugins: []
};
