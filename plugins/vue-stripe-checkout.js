import Vue from 'vue'
import VueStripeCheckout from 'vue-stripe-checkout'

export default ({ app }) => {
  Vue.use(VueStripeCheckout, app.store.state.sharedEnv.STRIPE_PUBLIC_KEY)
}
