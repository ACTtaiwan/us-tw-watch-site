<template>
  <div>
    <nuxt-link to="/">
      Home
    </nuxt-link>

    <ul>
      <li v-for="bill in bills">
        <nuxt-link :to="`bills/${bill.id}`">
          {{ bill.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import allCars from '~/apollo/queries/allCars'
import allBillsQuery from '~/apollo/queries/allBills'

export default {
  apollo: {
    // allCars: {
    //   prefetch: true,
    //   query: allCars
    // },
    bills: {
      // fetchPolicy: 'network-only',
      prefetch: true,
      query: allBillsQuery,
      variables () {
        return { lang: 'en' }
      }
    }
  },
  head: {
    title: 'Cars with Apollo'
  }
}
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
a {
  text-decoration: none;
  color: #3498DB;
}
a:hover {
  border-bottom: 1px solid;
}
</style>
