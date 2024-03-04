/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/*.jsx', './src/App.jsx'],
  theme: {
    extend: {
      colors: {
        'light-accent': '#bae6fd',
        'dark-accent': '#1e3a8a',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true
  }
}

