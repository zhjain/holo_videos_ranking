/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        header: '1260px',
        content: '1080px'
      },
      fontFamily: {
        mine: ['ZCOOL KuaiLe', 'sans-serif']
      }

    }
  },
  plugins: []
}
