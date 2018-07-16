import Vue from 'vue'

export default {
  SET_LOCALE (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      Vue.set(state, 'locale', locale)
    }
  },

  SET_WINDOW_WIDTH (state, width) {
    Vue.set(state, 'clientWidth', width)
  },

  SET_USER (state, user) {
    console.log('SET_USER (state, user) {');
    state.user = user || null
  }  
}
