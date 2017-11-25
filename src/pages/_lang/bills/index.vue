<template>
  <div class="bills-page">
    <section class="banner">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ this.$t('billsPage.bannerTitle') }}</h1>
      </div>
    </section>
    <div class="table-section">
      <div class="table-section-wrapper">
        <bill-table :bills="bills" :loading="loading" />
      </div>
    </div>
  </div>
</template>
<script>
import BillTable from '~/components/bill-table'
import allBillsQuery from '~/apollo/queries/allBills'

export default {
  head () {
    return {
      title: `${this.$t('site.title.billsPageTitle')} | ${this.$t('site.title.mainTitle')}`
    }
  },
  data () {
    return {
      bills: [],
      loading: 0
    }
  },

  methods: {},
  computed: {
    lang () {
      return this.$i18n.locale.split('-')[0]
    }
  },
  apollo: {
    $loadingKey: 'loading',
    bills: {
      fetchPolicy: 'network-only',
      query: allBillsQuery,
      variables () {
        return { lang: this.lang }
      }
    }
  },
  components: {
    BillTable
  }
}
</script>
<style scoped lang="scss">
@import 'src/assets/css/app';

.banner {
  background-color: #fff;
  border-bottom: 1px solid #eeeeed;
  position: relative;

  .banner-wrapper {
    height: 200px;
    display: flex;
    align-items: center;
    @extend .pageWrapper-large;

    .banner-title {
      font-size: 2.5em;
      font-weight: 400;
      letter-spacing: 0.05em;
    }
  }
}

.table-section {
  background-color: #f8f8f9;
  padding: 40px 0;

  .table-section-wrapper {
    @extend .pageWrapper-large;
  }
}
</style>
