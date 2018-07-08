import axios from 'axios'

export const get = url => {
  return axios({
    method: 'GET',
    url,
    headers: { 'X-API-Key': 'syre14A0ZO81RzG81d5L4PbjkjF4Uu0aFWSjfNqf' }
  })
}
