function getSharedEnv () {
  return process.server
    ? {
        STAGE: process.env.STAGE || 'dev',
        FRONTEND_API_KEY: process.env.FRONTEND_API_KEY,
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
      }
    : {}
}

export default {
  NUXT_SERVER_INIT ({ commit }) {
    if (process.server) {
      commit('SET_SHARED_ENV', getSharedEnv())
    }
  }
}
