import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  components: ['@/components', '@/components/layout'],
  modules: ['@nuxtjs/tailwindcss'],
  buildModules: ['@nuxtjs/eslint-module'],
})
