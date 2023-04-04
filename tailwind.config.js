/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1280': '1280px'
      },
      screens: {
        '575': '575px'
      },
      colors: {
        'main': '#3478f5'
      },
      maxWidth: {
        '1280': '1280px'
      }
    },
    fontFamily: {
      'poppins': ['poppins', 'system-ui', 'sans-serif']
    }
  },
  plugins: [],
}
