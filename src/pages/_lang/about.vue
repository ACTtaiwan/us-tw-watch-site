<template>
  <div>
    <div class="Content">
      <div class="container">
        <h1 class="Content__Title">{{ $t('about.title') }}</h1>
        <p>{{ $t('about.introduction') }}</p>
      </div>

      <div class="container">
        <h1>About page</h1>
        <p>Check the source code to see the custom meta tags added with our custom component <code>twitter-head-card</code></p>
        <twitter-head-card></twitter-head-card>
        <p><nuxt-link to="/">Home page</nuxt-link></p>
      </div>
    </div>

    <div class="container">
      <h1 class="title">Another Page</h1>
      <p><nuxt-link to="/" class="button is-medium is-info hvr-wobble-vertical">Another button</nuxt-link></p>
      <p><nuxt-link to="/">Back home</nuxt-link></p>
    </div>

    <p>Hi from {{ name }}</p>

    <div class="container">
      <img :src="thumbnailUrl" />
      <p><nuxt-link to="/">Home</nuxt-link> - About</p>
    </div>

    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
import TwitterHeadCard from '~/components/twitter-head-card.vue'

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
  layout: 'dark',

  transition: 'bounce',

  head () {
    return {
      title: this.$t('about.title'),
      meta: [
        { hid: 'description', name: 'description', content: 'About page description' }
      ]
    }
  },

  async asyncData ({ isStatic, isServer }) {
    const nb = Math.max(1, Math.round(Math.random() * 10))
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${nb}`)
    data.name = isStatic ? 'static' : (isServer ? 'server' : 'client')

    await timeout(1000)
    return data
  },

  components: {
    TwitterHeadCard
  }
}
</script>

<style>
.container {
  text-align: center;
  margin-top: 150px;
  font-size: 20px;
}
</style>
