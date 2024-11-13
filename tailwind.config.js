/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': 'var(--color-primary)',
        'textGray': 'rgba(17, 17, 17, 0.5)'
      },
      boxShadow: {
        'custom': '0px 1px 0px rgba(17, 17, 17, 0.1)',
      },
    },
  },
  plugins: [],
}

