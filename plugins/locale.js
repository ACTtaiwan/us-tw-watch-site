export const path = (vm, url) => {
  return vm.$i18n.locale === vm.$i18n.fallbackLocale ? url : '/' + vm.$i18n.locale + url
}
