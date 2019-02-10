import Vue from 'vue'

export default {
  SET_WINDOW_WIDTH (state, width) {
    Vue.set(state, 'clientWidth', width)
  },
  SET_SUBSCRIPTION (state, value) {
    Vue.set(state, 'subscription', value)
  },
  SET_DONATION (state, value) {
    Vue.set(state, 'donation', value)
  }
}
