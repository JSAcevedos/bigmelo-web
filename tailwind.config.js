/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './routes/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#20262E',
        'primary-hover': '#4b5563',
        'secondary': '#0D1114',
        'title': '#34B7F1',
        'paragraph' : '#5B718F',
        'button' : '#34D3A3',
        'button-hover' : '#45E4B4',
        'phoneBody' : '#D9D9D9',
        'userMessage':'#00a884',
        'botMessage':'#343f46',
        'border':'#5B718F',
        'error': '#d13030',
        'success': '#37d108',
      },
      screens: {
        'slider-text':'1207px',
        'responsive-l':'1164px',
        'responsive-m':'1017px',
        'responsive': '750px',
      }
    },
    
  },
  plugins: [],
}

