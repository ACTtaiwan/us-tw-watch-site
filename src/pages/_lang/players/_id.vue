<template>
  <div class="player">
    <h1>ID {{ id }}</h1>
    <h2>#{{ number }}</h2>
    <h3>{{ name }}</h3>
    <p><nuxt-link to="/players">Back to the list</nuxt-link></p>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return !isNaN(+params.id)
  },

  asyncData ({ params, env, error }) {
    const player = env.players.find((player) => String(player.id) === String(params.id))

    if (!player) {
      return error({ message: 'Player not found', statusCode: 404 })
    }

    return player
  },

  head () {
    return {
      title: this.name
    }
  }
}
</script>

<style scoped>
.player {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
