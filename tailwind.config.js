/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gyoza: {
          bg: '#FAE8E8',
          primary: '#9B1C3A',
          accent: '#F2B8C6',
          surface: '#FFF8F8',
          ink: '#1A1A1A',
          gold: '#D4A843',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
