import { InMemoryCache } from 'apollo-cache-inmemory'
import app from '~/config/app.json'

export default ctx => {
  // auth token
  // let token = ctx.isServer ? ctx.req.session : window.__NUXT__.state.session
  let token = null

  // change the apollo config based on:
  // https://github.com/Akryum/vue-cli-plugin-apollo/issues/47

  return {
    httpEndpoint: app.api.url,
    httpLinkOptions: {
      credentials: 'same-origin',
      headers: {
        'x-api-key': process.env.FRONTEND_API_KEY
      }
    },
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id
    })
  }
}
