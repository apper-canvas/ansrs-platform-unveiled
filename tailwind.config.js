/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#1B4D89',
          600: '#164073',
          700: '#12345B'
        },
        secondary: {
          400: '#2E7BB6',
          500: '#2E7BB6',
          600: '#1E5A8A'
        },
        accent: {
          400: '#00A8CC',
          500: '#00A8CC',
          600: '#0088A3'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}