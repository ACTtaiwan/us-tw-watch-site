<template>
  <router-link :to="path(this, `/bills/${bill.id}`)">
    <Card :style="styleObject" v-if="bill">
      <p slot="title">{{ bill.title }}</p>
      <p>{{ `Code: ${bill.billCode}` }}</p>
      <!-- <p>{{ `Sponsor: ${getFullName(bill)}` }}</p> -->
      <!-- <p>{{ `Party: ${bill.sponsor.party}` }}</p> -->
    </Card>
  </router-link>
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
    path,
    getFullName (value) {
      const person = value.sponsor.person
      return `${person.firstname} ${person.lastname}`
    }
  }
}
</script>
<style scoped>

</style>
