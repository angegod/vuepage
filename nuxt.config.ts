// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-06-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/vuepage/' : '/',
  },
})
