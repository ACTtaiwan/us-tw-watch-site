var appConfig = require('./config/app.json')

module.exports = {
  head: {
    titleTemplate: '',
    meta: [
      {
        property: 'og:image',
        content: 'https://s3.amazonaws.com/taiwanwatch-static/assets/tw-site-banner.png'
      },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' }
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
  plugins: ['~/plugins/locale', '~/plugins/i18n.js', '~/plugins/iview'],
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
