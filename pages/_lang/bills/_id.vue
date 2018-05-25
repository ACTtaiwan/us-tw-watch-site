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
            <Row :gutter="30" v-if="this.bill.articles">
              <Col :span="24" v-for="article in this.bill.articles" :key="article.id">
                <ArticleCard class="article-card" :article="article" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  </div>
</template>

<script>
import appConfig from '~/config/app.json'
import { trimConGovAction, localTime } from '~/plugins/filters'
import BillDetailPageQuery from '~/apollo/queries/BillDetailPage'
import BillOverviewCard from '~/components/BillDetailPage/BillOverviewCard'
import BillSummaryCard from '~/components/BillSummaryCard'
import BillSponsorsMapCard from '~/components/BillDetailPage/BillSponsorsMapCard'
import BillActionsCard from '~/components/BillActionsCard'
import BillVersionsCard from '~/components/BillDetailPage/BillVersionsCard'

import ArticleCard from '~/components/HomePage/ArticleCard'

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
    },
    billLatestAction () {
      let latestActionTime = 0
      let latestAction = ''
      this.bill.actions.forEach(action => {
        if (action.datetime > latestActionTime) {
          latestAction = action.description
          latestActionTime = action.datetime
        }
      })
      if (process.browser) {
        // strip html tags from the string
        var dom = document.createElement('DIV')
        dom.innerHTML = latestAction
        latestAction = dom.textContent || dom.innerText || ''
      }
      return trimConGovAction(latestAction)
    },
    memberArea () {
      if (this.bill.sponsor.district) {
        return `${this.bill.sponsor.state}-${this.bill.sponsor.district}`
      } else {
        return `${this.bill.sponsor.state}`
      }
    },
    billIntroducedDate () {
      return localTime(this.bill.introducedDate)
    },
    billSponsorTitle () {
      const title = `${this.bill.sponsor.title} ${this.bill.sponsor.person.firstname} ${
        this.bill.sponsor.person.lastname
      }`
      return title
    },
    billSponsorTitleArea () {
      const title = `${this.bill.sponsor.title} ${this.bill.sponsor.person.firstname} ${
        this.bill.sponsor.person.lastname
      } [${this.memberArea}]`
      return title
    },
    billDescription () {
      return `This bill is sponsored by ${this.billSponsorTitle} on ${this.billIntroducedDate}. The latest action is: ${
        this.billLatestAction
      }. `
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
  head (a, b, c) {
    return {
      title: this.bill ? this.bill.title : 'Loading',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.bill ? this.billDescription : 'Loading'
        },
        {
          property: 'og:url',
          content: `${appConfig.site.url}/${this.locale}/bills/${this.$route.params.id}`
        },
        {
          property: 'og:title',
          content: this.bill ? this.bill.title : 'Loading'
        },
        {
          property: 'og:description',
          content: this.bill ? this.billDescription : 'Loading'
        },
        { property: 'twitter:label1', content: 'Current Status' },
        {
          property: 'twitter:data1',
          content: this.bill ? this.billLatestAction : 'Loading'
        },
        { property: 'twitter:label2', content: 'Sponsor' },
        {
          property: 'twitter:data2',
          content: this.bill ? this.billSponsorTitleArea : 'Loading'
        }
      ]
    }
  },
  components: {
    BillOverviewCard,
    BillSummaryCard,
    BillSponsorsMapCard,
    BillActionsCard,
    BillVersionsCard,
    ArticleCard
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
