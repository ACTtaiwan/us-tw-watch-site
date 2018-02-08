import Vue from 'vue'

export function localTime (epoch) {
  const date = new Date(Number(epoch))
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
}

const filters = {
  localTime
}
export default filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
