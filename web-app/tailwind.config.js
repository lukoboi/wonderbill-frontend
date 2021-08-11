module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ['wb-grey']: {
          DEFAULT: '#8d99aa',
          dark: '#445368',
          light: '#d0d5dc',
        },
        ['wb-blue']: {
          DEFAULT: '#00b3f5',
        },
        ['wb-green']: {
          DEFAULT: '#00cd50',
        },
        ['wb-red']: {
          DEFAULT: '#c81a0d',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
