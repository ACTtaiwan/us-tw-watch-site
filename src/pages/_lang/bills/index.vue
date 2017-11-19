<template>
  <cd-map />
</template>
<script>
import CdMap from '~/components/cd-map.vue'

export default {
  head () {
    return {
      title: `${this.$t('title.billsPageTitle')} | ${this.$t('title.siteMainTitle')}`
    }
  },

  components: {
    CdMap
  }
}
</script>
