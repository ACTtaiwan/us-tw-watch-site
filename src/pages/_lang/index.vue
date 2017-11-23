<template>
  <div class="landing">
    <section class="banner">
      Here is the banner
    </section>
    <Row :gutter="30" type="flex" justify="space-around">
      <Col style="margin-bottom: 30px;" span="8" v-for="bill in bills" :key="bill.id">
        <bill-card :bill="bill" />
      </Col>
    </Row>
  </div>
</template>

<script>
import BillCard from '@/components/bill-card'
import queryAllBills from '@/apollo/queries/allBills.gql'

export default {
  data () {
    return {
      bills: [],
      loading: 0
    }
  },

  head () {
    return {
      title: this.$t('title.siteMainTitle')
    }
  },

  components: {
    BillCard
  },

  apollo: {
    $loadingKey: 'loading',
    bills: {
      query: queryAllBills,
      prefetch: true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
