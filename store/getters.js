export default {
  isDesktop(state) {
    // (state, getters)
    return state.clientWidth > 850
  },
  isTablet(state) {
    // (state, getters)
    return !!(state.clientWidth > 550 && state.clientWidth <= 850)
  },
  isPhone(state) {
    // (state, getters)
    return !(state.clientWidth > 550)
  }
}
