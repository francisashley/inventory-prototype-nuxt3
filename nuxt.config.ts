import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/css/tailwind.css'],
  components: ['@/components'],
  modules: ['@nuxtjs/tailwindcss'],
  buildModules: ['@nuxtjs/eslint-module'],
  router: {
    base: '/inventory-prototype-nuxt3/',
  },
})
