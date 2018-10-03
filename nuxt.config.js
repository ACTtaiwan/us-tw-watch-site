const pkg = require('./package')
const app = require('./config/app')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:image', content: app.thumbnail },
      { property: 'og:site_name', content: app.name },
      { property: 'og:type', content: 'website' },
      { property: 'fb:app_id', content: app.fbAppId },
      { property: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: app.api.url }
    ]
  },

  /*
  ** Define environment variables
  */
  env: {
    baseUrl: '/',
    FRONTEND_API_KEY: process.env.FRONTEND_API_KEY
  },

  /*
  ** Overwrite the default Nuxt.js configuration of Vue Router
  */
  router: {
    middleware: ['https'],
    base: '/'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3762CC'
  },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
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
      default: '~/config/apollo.js'
    }
  },

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
      if (ctx.isClient) {
        config.devtool = 'eval-source-map'
      } else {
        config.devtool = 'inline-source-map'
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
