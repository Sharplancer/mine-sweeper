/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      animation: {
        'tile-focus': 'zoomOutIn 1s ease-in-out',
        'icon-appear': 'zoomOut 0.2s ease-in-out',
      },
      keyframes: {
        zoomOutIn: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.1)' },
          '60%': { transform: 'scale(1)' },
          '70%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        zoomOut: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      colors: {
        'tile-primary': '#2f4553',
        'tile-hover': '#557086',
        'title-secondary': '#071824',
      },
      boxShadow: {
        'tile': '0 0.3em 0 0 #213743',
      },
      translate: {
        'tile-hover': '-0.15em',
      },
    },
  },
  plugins: [],
}
