import axios from 'axios'
// import axios_factory from '~/plugins/axios_factory'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  authUser: null,
  visits: []
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_USER: function (state, user) {
    state.authUser = user
  },
  ADD_VISIT (state, path) {
    state.visits.push({
      path,
      date: new Date().toJSON()
    })
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post(`${process.env.baseUrl}api/login`, { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.post(`${process.env.baseUrl}api/logout`)
    commit('SET_USER', null)
  }
}
