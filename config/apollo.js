import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import app from '~/config/app.json'

export default context => {
  context.store.dispatch('NUXT_SERVER_INIT', context)
  const sharedEnv = { ...context.store.state.sharedEnv }

  const apiEndpoint = sharedEnv.STAGE === 'prod' ? app.api.prod : app.api.dev
  const httpLink = new HttpLink({ uri: apiEndpoint })
  // auth token
  // let token = ctx.isServer ? ctx.req.session : window.__NUXT__.state.session
  let token = null

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { 'x-api-key': sharedEnv.FRONTEND_API_KEY }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache({
      dataIdFromObject: o => o.id
    })
  }
}
