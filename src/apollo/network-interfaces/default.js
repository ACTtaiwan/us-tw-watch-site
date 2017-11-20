
import { createNetworkInterface } from 'apollo-client'

export default (ctx) => {
  return createNetworkInterface({ uri: 'https://api.taiwanwatch.org/dev/api' })
}
