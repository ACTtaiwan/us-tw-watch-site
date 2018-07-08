import Vue from 'vue'

export default {
  SET_WINDOW_WIDTH (state, width) {
    Vue.set(state, 'clientWidth', width)
  }
}
