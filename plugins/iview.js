import 'iview/dist/styles/iview.css'
import Vue from 'vue'
import iView from 'iview'

export default ({ app }) => {
  Vue.use(iView, {
    i18n: (key, value) => app.i18n.t(key, value)
  })
}
