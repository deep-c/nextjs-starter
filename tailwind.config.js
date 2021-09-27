/* eslint-disable global-require */
module.exports = {
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  plugins: [require('@tailwindcss/forms')],
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        48: '12rem',
      },
    },
  },
  variants: {
    extend: {},
  },
};
