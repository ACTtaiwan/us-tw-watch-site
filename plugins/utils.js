import axios from 'axios'

export const path = (vm, url) => {
  return vm.$i18n.locale === vm.$i18n.fallbackLocale ? url : '/' + vm.$i18n.locale + url
}

export const get = url => {
  return axios({
    method: 'GET',
    url,
    headers: { 'X-API-Key': 'syre14A0ZO81RzG81d5L4PbjkjF4Uu0aFWSjfNqf' }
  })
}
