<template>
  <div>
    <div class="Content">
      <div class="container">
        <h1 class="Content__Title">{{ $t('home.title') }}</h1>
        <p>{{ $t('home.introduction') }}</p>
      </div>
    </div>

    <div class="container">
      <h1>Cached components</h1>
      <p>Look at the source code and see how the timestamp is not reloaded before 10s after refreshing the page.</p>
      <p>Timestamp: {{ date }}</p>
    </div>

    <div class="container">
      <p><button @click="showLoginError">Notif me!</button></p>
    </div>

    <h1>Welcome!</h1>

    <div>
      <nuxt-link to="/about">About page</nuxt-link>
    </div>

    <div>
      <nuxt-link to="/posts">Blog</nuxt-link>
    </div>

    <div>
      <nuxt-link to="/foobarbaz">Foobarbaz to demo 'Middleware'</nuxt-link>
    </div>

    <div>
      <nuxt-link to="/players">Players to demo 'Nested Routes'</nuxt-link>
    </div>

    <div>
      <nuxt-link to="/accounts">Accounts</nuxt-link>
    </div>

    <div>
      <h1 class="title">Custom CSS!</h1>
      <p><nuxt-link to="/about" class="button is-medium is-primary hvr-float-shadow">I am a button</nuxt-link></p>
      <p><nuxt-link to="/about">About page</nuxt-link></p>
    </div>

    <div class="container">
      <h2>Users</h2>
      <ul class="users">
        <li v-for="user in users">
          <nuxt-link :to="'/users/'+user.id">{{ user.name }}</nuxt-link>
        </li>
      </ul>
    </div>

    <div class="container">
      <h1>Please login to see the secret content</h1>
      <form v-if="!$store.state.authUser" @submit.prevent="login">
        <p class="error" v-if="formError">{{ formError }}</p>
        <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
        <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
        <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
        <button type="submit">Login</button>
      </form>
      <div v-else>
        Hello {{ $store.state.authUser.username }}!
        <pre>I am the secret content, I am shown only when the use is connected.</pre>
        <p><i>You can also refresh this page, you'll still be connected!</i></p>
        <button @click="logout">Logout</button>
      </div>
      <p><nuxt-link to="/secret">Super secret page</nuxt-link></p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 100px;
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
.error {
  color: red;
}
.users {
  list-style-type: none;
}
.users li a {
  display: inline-block;
  width: 200px;
  border: 1px #ddd solid;
  padding: 10px;
  text-align: left;
  color: #222;
  text-decoration: none;
}
.users li a:hover {
  color: orange;
}
</style>

<script>
import axios from 'axios'

let miniToastr
if (process.browser) {
  miniToastr = require('mini-toastr')
}

export default {
  mounted () {
    miniToastr.init()
  },

  notifications: {
    showLoginError: {
      title: 'Welcome!',
      message: 'Hello from nuxt.js',
      type: 'info'
    }
  },

  head () {
    return { title: this.$t('home.title') }
  },

  name: 'date',

  serverCacheKey () {
    // Will change every 10 secondes
    return Math.floor(Date.now() / 10000)
  },

  async asyncData () {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return { users: data }
  },

  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
      date: Date.now()
    }
  },

  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>
