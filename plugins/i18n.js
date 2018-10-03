import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import our own locale file
import zhTW from '~/locales/zh-tw.json'
// import locale file from components
import zhTwComponents from '~/components/zh-tw'
// import i18n texts for iView
import zhTwIview from 'iview/dist/locale/zh-TW'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'zh-tw',
    messages: {
      'zh-tw': {
        ...zhTW,
        ...zhTwComponents,
        ...zhTwIview
      }
    }
  })

  app.i18n.path = link => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }
}
