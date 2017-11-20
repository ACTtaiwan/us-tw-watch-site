<template>
  <div>
    <bill-table
      :bills="bills"
      :loading="loading"
    />
    <cd-map />
  </div>
</template>
<script>
import CdMap from '~/components/cd-map.vue'
import BillTable from '~/components/bill-table.vue'
import allBills from '@/apollo/queries/allBills.gql'

export default {
  head () {
    return {
      title: `${this.$t('title.billsPageTitle')} | ${this.$t('title.siteMainTitle')}`
    }
  },

  data () {
    return {
      loading: 0
    }
  },

  apollo: {
    $loadingKey: 'loading',
    bills: {
      prefetch: true,
      query: allBills
    }
  },

  components: {
    CdMap,
    BillTable
  }
}
</script>
<style scoped>
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
