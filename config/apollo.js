import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import app from '~/config/app.json'

export default ctx => {
  const httpLink = new HttpLink({ uri: app.api.url })
  // auth token
  // let token = ctx.isServer ? ctx.req.session : window.__NUXT__.state.session
  let token = null

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { 'x-api-key': process.env.FRONTEND_API_KEY }
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
