<template>
  <div>
    <p>The bill number is {{ biiNum }}</p>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData ({ isStatic, isServer }) {
    return {
      biiNum: Math.floor(Math.random() * 100)
    }
  }
}
</script>
