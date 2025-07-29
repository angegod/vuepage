// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-06-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
  },
  ssr: false, // 避免使用 SSR
  app: {
      baseURL: process.env.NODE_ENV === 'production' ? '/TestNuxtPage/' : '/',
      head: {
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, // 預設格式
          ]
      }
  },
})
