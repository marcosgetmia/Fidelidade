/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:       '#003087',
        'navy-mid': '#004A9F',
        'bi-blue':  '#005EB8',
        'blue-mid': '#0077C8',
        accent:     '#0096D6',
        'blue-light':'#D6E8F7',
        'bi-green': '#1A7A4A',
        slate:      '#2C4A7C',
        'gray-bg':  '#F2F4F7',
        'gray-line':'#DDE2EA',
        'gray-txt': '#5A6375',
        dark:       '#1C2333',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
