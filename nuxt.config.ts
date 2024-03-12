// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },
  typescript: {
    typeCheck: true
  },
  nitro: {
    routeRules: {
      '/api/**': { proxy: 'http://10.0.0.167:8000/api/**', cors: true, headers: { 'access-control-allow-methods': 'GET' } },
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap' }
      ]
    },
  },
  modules: ['@nuxt/ui'],
})