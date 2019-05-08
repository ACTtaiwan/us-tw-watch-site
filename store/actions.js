function getSharedEnv () {
  return process.server
    ? { STAGE: process.env.STAGE || 'dev' }
    : {}
}

export default {
  NUXT_SERVER_INIT ({ commit }) {
    if (process.server) {
      commit('SET_SHARED_ENV', getSharedEnv())
    }
  }
}
