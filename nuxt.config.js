module.exports = {
  // render: {
  //   bundleRenderer: {
  //     cache: require('lru-cache')({
  //       max: 1000,
  //       maxAge: 1000 * 60 * 15
  //     }),
  //     shouldPreload: (file, type) => {
  //       return ['script', 'style', 'font'].includes(type)
  //     }
  //   }
  // },
  // css: [
  //   {
  //     src: '@/assets/css/main.css',
  //     lang: 'scss'
  //   }
  // ],
  env: {
    baseUrl: '/'
  },
  // generate: {
  //   routes: ['/zh-tw']
  // },
  router: {
    // middleware: ['user-agent'],
    base: '/'
  },
  srcDir: 'src/',
  build: {
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
