<template>
  <div v-if="bill">
    <h3>{{ bill.id }} {{ bill.congress }}</h3>
    <p><nuxt-link :to="path(this, '/bills')">{{ `< Back to Bills` }}</nuxt-link></p>
    

  </div>
</template>

<script>
import queryBill from '~/apollo/queries/bill'
import { path } from '@/plugins/locale'

export default {
  computed: {
    bill () {
      return this.bills && this.bills[0]
    }
  },

  apollo: {
    bills: {
      query: queryBill,
      prefetch: ({ route }) => {
        return { id: route.params.id }
      },
      variables () {
        return { id: this.$route.params.id }
      }
    }
  },

  head () {
    return {
      title: (this.bill ? this.bill.title : 'Loading')
    }
  },

  methods: {
    path
  }
}
</script>
