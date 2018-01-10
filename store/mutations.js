import Vue from 'vue'

export default {
  SET_LOCALE (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      Vue.set(state, 'locale', locale)
    }
  }
}
