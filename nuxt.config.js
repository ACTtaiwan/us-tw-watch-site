var appConfig = require('./config/app.json')

module.exports = {
  head: {
    titleTemplate: '',
    meta: [
      { property: 'og:image', content: 'https://s3.amazonaws.com/taiwanwatch-static/assets/tw-fb-og-image.png' },
      { property: 'og:site_name', content: 'Taiwan Watch' },
      { property: 'og:type', content: 'website' },
      { property: 'fb:app_id', content: '2017625051893386' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: appConfig.api.url }
    ]
  },
  loading: {
    color: '#3762CC'
  },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: '#3762CC'
  },
  env: {
    baseUrl: '/'
  },
  router: {
    middleware: ['https', 'i18n'],
    base: '/'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      // https://ssr.vuejs.org/en/caching.html#component-level-caching
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ],
    '@nuxtjs/apollo'
  ],

  /*
  ** Apollo settings
  */
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  plugins: [
    '~/plugins/utils',
    '~/plugins/i18n.js',
    '~/plugins/filters',
    '~/plugins/iview',
    '~/plugins/vue-chartjs',
    '~/plugins/asyncComputed',
    '~/plugins/fb-sdk'
  ],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-i18n', 'd3', 'topojson'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // run ESLINT on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** Customize runtime options for rendering pages
  */
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  }
}
