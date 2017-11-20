<template>
  <div>
    <bill-table />
    <cd-map />
  </div>
</template>
<script>
import CdMap from '~/components/cd-map.vue'
import BillTable from '~/components/bill-table.vue'

export default {
  head () {
    return {
      title: `${this.$t('title.billsPageTitle')} | ${this.$t('title.siteMainTitle')}`
    }
  },

  components: {
    CdMap,
    BillTable
  }
}
</script>
