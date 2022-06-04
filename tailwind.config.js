export default {
  mode: 'jit',
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
  plugins: [],
}
