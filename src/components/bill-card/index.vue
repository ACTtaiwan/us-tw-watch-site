<template>
  <nuxt-link :to="path(this, `/bills/${bill.id}`)" replace>
    <Card :style="styleObject" v-if="bill">
      <p slot="title">{{ bill.title }}</p>
      <p>{{ `Code: ${bill.billCode}` }}</p>
      <p>{{ `Sponsor: ${getFullName(bill)}` }}</p>
      <p>{{ `Party: ${bill.sponsor.party}` }}</p>
    </Card>
  </nuxt-link>
</template>
<script>
import { path } from '@/plugins/locale'

export default {
  props: [
    'bill'
  ],

  data () {
    return {
      styleObject: {
        color: 'black',
        'text-align': 'left'
      }
    }
  },

  methods: {
    path,
    getFullName (value) {
      const person = value.sponsor.person
      const fullName = `${person.firstname} ${person.lastname}`

      return fullName
    }
  }
}
</script>
<style scoped>
.bill-card {

}
</style>
