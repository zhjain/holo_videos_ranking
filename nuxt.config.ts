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
      '/api/**': { proxy: 'http://127.0.0.1:9090/api/**', cors: true, headers: { 'access-control-allow-methods': 'GET' } },
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap' }
      ]
    },
  },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt'], // , 'nuxt-clarity-analytics'
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'zh_CN',
        file: 'zh_CN.json'
      },
    ],
    langDir: 'locales',
    defaultLocale: 'zh_CN'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3062
  }
})