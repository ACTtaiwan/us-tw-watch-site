import 'iview/dist/styles/iview.css'
import Vue from 'vue'
import iView from 'iview'
import VueI18n from 'vue-i18n'
import enUS from '@/locales/en-us.json'
import zhTW from '@/locales/zh-tw.json'

const i18n = new VueI18n({
  locale: Vue.config.lang,
  fallbackLocale: 'en-us',
  messages: {
    'en-us': enUS,
    'zh-tw': zhTW
  }
})
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
