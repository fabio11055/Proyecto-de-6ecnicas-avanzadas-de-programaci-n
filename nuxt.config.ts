import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Configuración de la URL del servidor backend (HTTP o HTTPS)
  runtimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3001',
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:3001',
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  pinia: {
    storesDirs: ['./app/stores/**', './stores/**'],
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [
      // @ts-expect-error
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  modules: ['@pinia/nuxt'],
})
