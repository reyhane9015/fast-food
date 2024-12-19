/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
         primary: '#f13a01',
         secondery: '#f75b2b',
         third: '#f8d617',
         fourth: '#ffbba6',
         light: {
            background: '#FFFFFF',
            SBackground: '#f8f8f8',
            text: '#000000',
          },
          dark: {
            background: '#1A1A2E',
            SBackground: '#0f0f1b',
            text: '#FFFFFF',
          },
       },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
