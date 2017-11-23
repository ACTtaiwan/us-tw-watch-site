import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enUS from '@/locales/en-us.json'
import zhTW from '@/locales/zh-tw.json'
// import i18n texts for iView
import enIview from 'iview/dist/locale/en-US'
import zhIview from 'iview/dist/locale/zh-TW'

Vue.use(VueI18n)

export default ({ app, isClient, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en-us',
    messages: {
      'en-us': {
        ...enUS,
        ...enIview
      },
      'zh-tw': {
        ...zhTW,
        ...zhIview
      }
    }
  })
}
