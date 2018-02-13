import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default () => {
  return new Vuex.Store({
    state: {
      locales: ['en-us', 'zh-tw'],
      locale: 'en-us',
      clientWidth: null,
      earliestCongress: 96,
      currentCongress: 115
    },
    actions,
    mutations,
    getters
  })
}
