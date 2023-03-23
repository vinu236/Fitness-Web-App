/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "custom-gym":'#f36100',
        "custom-head":'#E50914',
        'custom-green':'#66bb6a',
        
      }
    },
  },
  plugins: [],
}
