/* eslint-disable no-undef */
import Vue from 'vue'

Vue.prototype.$initFbSdk = () => {
  ;(function (d, s, id) {
    let js
    let fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/zh_TW/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')

  window.fbAsyncInit = () => {
    FB.init({
      appId: '2017625051893386',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.2'
    })
    FB.AppEvents.logPageView()
    Vue.prototype.FB = FB
    window.dispatchEvent(new Event('fb-sdk-ready'))
  }
}
