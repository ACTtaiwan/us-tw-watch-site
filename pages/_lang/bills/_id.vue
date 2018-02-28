<template>
  <div class="bill-page">
    <!-- Bill -->
    <section v-if="bill" class="bill-section" :class="{ phone: this.isPhone }">
      <div class="bill-section-wrapper">
        <Row>
          <Col :span="this.isTablet || this.isPhone ? 24 : 18"  class="main-block" :class="{ mobile: this.isTablet || this.isPhone }">
            <!-- Overview -->
            <BillOverviewCard :bill="this.bill"></BillOverviewCard>
            <!-- Summary -->
            <BillSummaryCard v-if="this.bill.summary.paragraphs" :bill="this.bill"></BillSummaryCard>
            <!-- Support Map -->
            <BillSponsorsMapCard :bill="this.bill"></BillSponsorsMapCard>
            <!-- Versions -->
            <BillVersionsCard v-if="this.bill.versions.length > 0" :bill="this.bill"></BillVersionsCard>
          </Col>
          <!-- Summary -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="detail-block">
            <BillActionsCard :bill="this.bill"></BillActionsCard>
          </Col>
        </Row>
      </div>
    </section>
  </div>
</template>

<script>
import BillDetailPageQuery from '~/apollo/queries/BillDetailPage'
import BillOverviewCard from '~/components/BillDetailPage/BillOverviewCard'
import BillSummaryCard from '~/components/BillSummaryCard'
import BillSponsorsMapCard from '~/components/BillDetailPage/BillSponsorsMapCard'
import BillActionsCard from '~/components/BillActionsCard'
import BillVersionsCard from '~/components/BillDetailPage/BillVersionsCard'

export default {
  data () {
    return {}
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    }
  },

  apollo: {
    bill: {
      query: BillDetailPageQuery,
      fetchPolicy: 'cache-and-network',
      // Add prefetch for SSR
      // https://github.com/Akryum/vue-apollo#server-side-rendering
      prefetch: ({ route, app }) => ({
        ids: [route.params.id],
        lang: app.store.state.locale
      }),
      variables () {
        return {
          ids: [this.$route.params.id],
          lang: this.locale
        }
      },
      update (data) {
        return data.bills[0]
      }
    }
  },
  head () {
    return {
      title: this.bill ? this.bill.title : 'Loading',
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: this.bill ? this.bill.id : 'Loading'
        }
      ]
    }
  },
  components: {
    BillOverviewCard,
    BillSummaryCard,
    BillSponsorsMapCard,
    BillActionsCard,
    BillVersionsCard
  }
}
</script>

<style lang="scss">
.ivu-row {
  position: inherit;
}
</style>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.bill-section {
  padding: 40px 0;

  .bill-section-wrapper {
    @extend .pageWrapper-large;
  }
}

.main-block {
  padding-right: 40px;
  position: inherit;

  &.mobile {
    padding-right: 0px;
  }
}
</style>
