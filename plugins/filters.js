import Vue from 'vue'
import moment from 'moment'

export function localTime (epoch) {
  return moment(new Date(Number(epoch)))
    .utcOffset(-5 * 60)
    .format('MM/DD/YYYY')
}

export function trimConGovAction (description) {
  let result = description
  const parenRegExp = /\(([^)]+)\)/g
  const stripKeywords = ['TXT', 'PDF', 'CR ']

  // Remove "Action By"
  // It will always be the last part
  result = result.split(' Action By')[0]

  // Remove unnecessary parenthesis
  let matched = result.match(parenRegExp)
  if (matched && matched.length) {
    matched.forEach(parentheses => {
      stripKeywords.forEach(keyword => {
        if (parentheses.indexOf(keyword) >= 0) {
          result = result.replace(' ' + parentheses, '')
        }
      })
    })
  }

  return result.trim()
}

export function truncate (text, length = 30) {
  const clamp = '...'

  if (!text || text.length <= length) return text

  var tcText = text.slice(0, length - clamp.length)
  var last = tcText.length - 1
  while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length

  tcText = tcText.slice(0, last)

  return tcText + ' ' + clamp
}

const filters = {
  localTime,
  trimConGovAction,
  truncate
}
export default filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
