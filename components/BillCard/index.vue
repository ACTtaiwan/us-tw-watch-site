<template>
  <router-link :to="path(this, `/bills/${bill.id}`)">
    <div class="card">
      <div class="bill-meta">{{ bill.congress }}th Congress ・ {{ bill.billCode}} </div>
      <h1 class="bill-title">{{ bill.title }}</h1>
      <div class="bill-sponsor">{{ bill.sponsor.person.firstname }} {{ bill.sponsor.person.lastname }}</div>
    </div>
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
  computed: {},
  methods: {
    path
  }
}
</script>

<style scoped lang="scss">
.card {
  background-color: #ffffff;
  padding: 30px;
  color: #000000;
  text-align: left;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: box-shadow;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

.bill-meta {
  font-size: 14px;
}

.bill-title {
  font-weight: 400;
  line-height: 1.2em;
  margin: 14px 0;
}
</style>
