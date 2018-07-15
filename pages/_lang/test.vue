<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';
</style>

<template>
  <div>
    <div v-if="isAuthenticated">
      Top secret only seen when loggedin
    </div>
    <div class="content">
      <h1>Hello, {{ loggedUser ? loggedUser.username : 'friend' }}!</h1>
      <p>
        This is a super simple example of how to use <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt.js</a> and <a hrf="https://auth0.com" target="_blank">Auth0</a> together.
      </p>
      <p v-if="!isAuthenticated">
        You're not authenticated yet. Maybe you want to <nuxt-link to="/sign-in" class="link">sign in</nuxt-link> and see what happens?
      </p>
      <p v-else>
        Now that you're authenticated, maybe you should try going to our!
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    loggedUser () {
      return this.$store.state.loggedUser
    },
  }
  // computed: 
  // mapGetters([
  //   'isAuthenticated',
  //   'loggedUser'
  // ]),
}
</script>

<style scoped>
.content {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
}
</style>
