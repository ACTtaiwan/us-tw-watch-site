export default {
  isDesktop (state, getters) {
    return state.clientWidth > 850
  },
  isTablet (state, getters) {
    return !!(state.clientWidth > 550 && state.clientWidth <= 850)
  },
  isPhone (state, getters) {
    return !(state.clientWidth > 550)
  }
}
