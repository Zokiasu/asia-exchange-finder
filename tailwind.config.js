module.exports = {
  purge: [
    './index.html', 
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '4rem',
    },
    screens: {
      'ms': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2048px',
    },
    topmarge: {
      'top-36': '8.5rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
