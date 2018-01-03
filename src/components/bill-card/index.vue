<template>
  <nuxt-link :to="path(this, `/bills/${bill.id}`)" replace>
    <p>card</p>
  </nuxt-link>
</template>
<script>
import { path } from '@/plugins/locale'

export default {
  props: ['bill'],

  data () {
    return {
      styleObject: {
        color: 'black',
        'text-align': 'left'
      }
    }
  },

  methods: {
    path
  }
}
</script>

<style scoped>

</style>
