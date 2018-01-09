<template>
  <div v-if="Bill">
    <h3>{{ Bill.title }}</h3>
    <p><nuxt-link to="/bills">Back to Bills</nuxt-link></p>
  </div>
</template>

<script>
// import car from '~/apollo/queries/car'
import queryBill from '~/apollo/queries/bill'

export default {
  apollo: {
    // Car: {
    //   query: car,
    //   prefetch: ({ route }) => ({ id: route.params.id }),
    //   variables() {
    //     return { id: this.$route.params.id }
    //   }
    // },
    bills: {
      query: queryBill,
      prefetch: ({ route }) => ({ id: route.params.id }),
      // fetchPolicy: 'network-only',
      variables () {
        return { id: this.$route.params.id }
      }
    }
  },
  computed: {
    Bill () {
      return this.bills && this.bills[0]
    }
  }
}
</script>

<style>
img {
  max-width: 600px;
}
</style>
