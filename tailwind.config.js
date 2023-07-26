/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'til': {
        900: '#3f9db2',
        200: '#3f9db2a6',
        100: '#65afc1'
      },
      'blc': '#212529'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-dir')(),
  ],
  variants: {
    space: ['responsive', 'direction'],
  },
}