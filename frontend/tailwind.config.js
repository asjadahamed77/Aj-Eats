/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'large': {'max': '1537px'},
        'desktop': {'max': '1441px'},
        'laptop': {'max': '1025px'},
        'tab': {'max': '769px'},
        'phoneMax': {'max': '432px'},
        'phone': {'max': '376px'},
      },
      fontFamily: {
        NotoSans: ['Noto Sans', 'sans-serif'],
        eduHand: ['"Edu AU VIC WA NT Hand"', 'cursive'],
      },
      colors: {
        main: '#ff580f',
        secondary: '#ff7e26',
      },
      backgroundImage: {
        // Add any custom background images here
      },
      textShadow: {
        'red-glow': '1px 0 10px red',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-red-glow': {
          textShadow: '1px 0 10px red',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none' /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none' /* Chrome, Safari, and Opera */
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
