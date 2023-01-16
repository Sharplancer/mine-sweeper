/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      animation: {
        'out-in': 'zoomOutIn 0.85s ease-in-out',
        'out': 'zoomOut 1s ease-in-out',
        'fast-out': 'fastZoomOut 0.15s ease-in-out',
        'rotate-out': 'rotateOut 1s ease-in-out infinite',
        'appear': 'appear 0.15s ease-in-out'
      },
      keyframes: {
        zoomOutIn: {
          '0%': {
            background: '#2f4553',
            boxShadow: '0 0.3em 0 0 #213743',
            transform: 'scale(1)',
          },
          '30%': {
            background: '#2f4553',
            boxShadow: '0 0.3em 0 0 #213743',
            transform: 'scale(1.1)',
          },
          '60%': {
            background: '#2f4553',
            boxShadow: '0 0.3em 0 0 #213743',
            transform: 'scale(1)',
          },
          '80%': {
            background: '#2f4553',
            boxShadow: '0 0.3em 0 0 #213743',
            transform: 'scale(1)',
          },
          '100%': {
            background: '#2f4553',
            boxShadow: '0 0.3em 0 0 #213743',
            transform: 'scale(0)',
          },
        },
        zoomOut: {
          '0%': {
            transform: 'scale(0)'
          },
          '85%': {
            transform: 'scale(0)'
          },
          '100%': {
            transform: 'scale(1)'
          },
        },
        fastZoomOut: {
          '0%': {
            transform: 'scale(0)'
          },
          '100%': {
            transform: 'scale(1)'
          },
        },
        rotateOut: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '20%': {
            transform: 'rotate(-90deg)',
          },
          '40%': {
            transform: 'rotate(0deg)',
          },
          '60%': {
            transform: 'scale(0.5)',
          },
          '80%': {
            transform: 'scale(1)',
          }
        },
        appear: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          }
        }
      },
      colors: {
        'board-primary': '#0f212e',
        'board-secondary': '#213743',
        'tile-primary': '#2f4553',
        'tile-hover': '#557086',
        'title-secondary': '#071824',
        'font-primary': '#b1bad3',
        'button-primary': '#00e701',
        'button-grey-hover': '#3d5564',
        'button-green-hover': '#1fff20',
        'button-green-disabled': '#00e701',
        'button-secondary': '#013e01',
        'input-border': '#557086',
      },
      boxShadow: {
        'tile': '0 0.3em 0 0 #213743',
        'input': '0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 2px 0 rgba(0, 0, 0, .12);',
      },
      translate: {
        'tile-hover': '-0.15em',
      },
    },
  },
  plugins: [],
}
