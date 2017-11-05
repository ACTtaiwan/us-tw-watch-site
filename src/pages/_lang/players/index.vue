<template>
  <div class="container">
    <h2>Please select an player.</h2>
    <ul>
      <li v-for="player in players">
        <nuxt-link :to="{ name: 'players-id', params: { id: player.id } }">{{ player.name + "#" + player.number }}</nuxt-link>
      </li>
    </ul>
    <p><nuxt-link to="/">Back to home page</nuxt-link></p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Please select an player'
  },
  data: () => ({
    players: process.env.players
  })
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  border: 1px #ddd solid;
  padding: 20px;
  text-align: left;
}
ul li a {
  color: gray;
}
p {
  font-size: 20px;
}
a {
  color: #41B883;
}
</style>
