<template>
  <div id="app" class="app">
    <AppHeader></AppHeader>
    <main id="main-content" class="main-content">
    </main>
    <AppFooter></AppFooter>
    <div class="container">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occured</h1>
      <nuxt-link to="/">Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  props: ['error'],
  data () {
    return {}
  },
  computed: {},
  methods: {},
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped>
.container {
  font-family: sans-serif;
  padding-top: 10%;
  text-align: center;
}
h1 {
  font-size: 20px;
}
</style>
