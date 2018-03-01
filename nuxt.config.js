var appConfig = require('./config/app.json')

module.exports = {
  head: {
    titleTemplate: '',
    meta: [
      { property: 'og:image', content: 'https://s3.amazonaws.com/taiwanwatch-static/assets/tw-og-image.png' },
      { property: 'og:site_name', content: 'Taiwan Watch' },
      { property: 'fb:app_id', content: '2017625051893386' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'dns-prefetch', href: appConfig.api.url }]
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
  build: {
    vendor: ['vue-i18n', 'd3', 'topojson'],
    // run ESLINT on save
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
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  }
}
