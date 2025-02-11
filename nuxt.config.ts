// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  vite: {
    plugins: [
      svgLoader({})
    ]
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    "notivue/nuxt"
  ],
  tailwindcss: {
    cssPath: [
      '~/src/core/assets/css/tailwind.css',
      { injectPosition: "first" },
    ],
  },
  i18n: {
    locales: [
      { code: 'ru', language: 'ru-RU' },
    ],
    defaultLocale: 'ru',
  },
  notivue: {
    position: 'bottom-right',
    enqueue: true,
    notifications: {
      global: {
        duration: 2500
      }
    }
  },
  css: [
    'notivue/notification.css',
    'notivue/animations.css',
    'vue-final-modal/style.css',
    '~/src/core/assets/css/default.css'
  ]
})
