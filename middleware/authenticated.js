export default function ({ store, route, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/test')
  }
}

// export default function ({ isHMR, app, store, route, params, error, redirect }) {
//   // If middleware is called from hot module replacement, ignore it
//   if (isHMR) return
//   // Get locale from params
//   const locale = params.lang || app.i18n.fallbackLocale
//   if (store.state.locales.indexOf(locale) === -1) {
//     return error({ message: 'This page could not be found.', statusCode: 404 })
//   }
//   // Set locale
//   store.commit('SET_LOCALE', locale)
//   app.i18n.locale = store.state.locale

//   // If route is /en-us/... -> redirect to /...
//   if (locale === app.i18n.fallbackLocale && route.fullPath.indexOf('/' + app.i18n.fallbackLocale) === 0) {
//     let regex = new RegExp('/' + app.i18n.fallbackLocale + '/', 'g')
//     return redirect(route.fullPath.replace(regex, '/'))
//   }
// }

