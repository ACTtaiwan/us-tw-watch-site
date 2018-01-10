<template>
  <div>
    <h3>Bills</h3>

    <nuxt-link :to="`bills`">
      Go to bills
    </nuxt-link>

  </div>
</template>

<script>
// import allCars from '~/apollo/queries/allCars'
// import allBillsQuery from '~/apollo/queries/allBills'

export default {
  // apollo: {
  //   // allCars: {
  //   //   prefetch: true,
  //   //   query: allCars
  //   // },
  //   bills: {
  //     // fetchPolicy: 'network-only',
  //     prefetch: true,
  //     query: allBillsQuery,
  //     variables () {
  //       return { lang: 'en' }
  //     }
  //   }
  // },
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
  color: #3498db;
}
</style>
