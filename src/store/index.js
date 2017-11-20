import axios from 'axios'
// import axios_factory from '~/plugins/axios_factory'

export const state = () => ({
  locales: ['en-us', 'zh-tw'],
  locale: 'en-us',
  authUser: null,
  visits: [],
  bills: []
})

export const mutations = {
  LOADING (state) {
    state.loading = true
  },

  SET_BILLS (state, bills) {
    state.loading = false
    state.bills = bills
  },

  SET_LOCALE (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  SET_USER (state, user) {
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
  },

  async getBills ({ commit }) {
    commit('LOADING')

    try {
      const { data } = await axios.get(`${process.env.baseUrl}api/bills`)
      commit('SET_BILLS', data)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('Not found')
      }
      throw error
    }
  }
}
