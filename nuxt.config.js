module.exports = {
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  css: [
    {
      src: '@/assets/css/main.css',
      lang: 'scss'
    }
  ],
  env: {
    baseUrl: '/'
  },
  loading: '~/components/loading.vue',
  plugins: [
    // ssr: false to only include it on client-side
    { src: '~/plugins/i18n.js', ssr: true },
    { src: '~/plugins/vue-notifications.js', ssr: false },
    { src: '~/plugins/iview', ssr: true }
  ],
  generate: {
    routes: [
      '/zh-tw'
    ]
  },
  router: {
    middleware: ['visits', 'user-agent', 'i18n'],
    base: '/'
  },
  head: {
    titleTemplate: '',
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  srcDir: 'src/',
  build: {
    vendor: [
      'axios',
      'mini-toastr',
      'vue-notifications',
      'vue-i18n',
      'd3',
      'd3-queue',
      'topojson'
    ],

    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: ['@nuxtjs/apollo'],
  apollo: {
    networkInterfaces: {
      default: '~/apollo/network-interfaces/default.js'
    }
  }
}
