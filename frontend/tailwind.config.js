/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        }
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif']
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
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '5rem'
      },
      colors: {
        green: '#388e3c',
        yellow: '#fbc02d',
        orange: '#f57c00',
        red: '#c62828'
      },
      minHeight: { 'screen-with-navbar': 'calc(100vh - 64px)' },
      height: { 'screen-with-navbar': 'calc(100vh - 64px)' },
      maxHeight: { 'screen-with-navbar': 'calc(100vh - 64px)' },
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
        '0%, 100%': { backgroundColor: 'rgba(229, 231, 235, 0.5)' },
        '50%': { backgroundColor: 'rgba(229, 231, 235, 1)' }
      },
      'blink-text-black': {
        '0%, 100%': { color: 'rgba(0, 0, 0, 0.5)' },
        '50%': { color: 'rgba(0, 0, 0, 1)' }
      },
      'draw-border-black': {
        '0%': {
          'border-bottom-height': '0',
          'border-bottom-color': 'transparent'
        },
        '100%': {
          'border-bottom-width': '100px',
          'border-bottom-color': '#000'
        },
        'slide-in': {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '0 0' }
        }
      },
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    },
    animation: {
      'blink-background-gray': 'blink-background-gray 1s infinite',
      'blink-text-black': 'blink-text-black 1s infinite',
      'draw-border-black': 'draw-border-black 1s ease-out forwards',
      spin: 'spin 1s linear infinite',
      'slide-in': 'slideIn 0.3s ease-out forwards'
    }
  },
  plugins: []
};
