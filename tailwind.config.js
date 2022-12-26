const plugin = require('tailwindcss/plugin')
export default {
  mode: 'jit',
  prefix: 'tw-',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './app.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    // './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '0px 0px 3px rgb(0 0 0)',
        },
      })
    }),
  ],
}
