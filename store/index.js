import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default () => {
  return new Vuex.Store({
    state: {
      locales: ['zh-tw'],
      locale: 'zh-tw',
      clientWidth: null,
      earliestCongress: 96,
      currentCongress: 116,
      subscription: false,
      donation: false,
      sharedEnv: {}
    },
    actions,
    mutations,
    getters
  })
}
