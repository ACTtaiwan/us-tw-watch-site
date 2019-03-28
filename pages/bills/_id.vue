<template>
  <div class="bill-page">
    <no-ssr>
      <section
        v-if="bill"
        :class="{ phone: isPhone }"
        class="bill-section">
        <div class="bill-section-wrapper">
          <Row>
            <i-col
              :span="isTablet || isPhone ? 24 : 18"
              :class="{ mobile: isTablet || isPhone }"
              class="main-block">
              <BillOverviewCard :bill="bill" />
              <BillSummaryCard
                v-if="bill.summary && bill.summary.paragraphs"
                :bill="bill" />
              <BillSponsorsMapCard v-if="bill.sponsor" :bill="bill" :mapLocale="'zh'" />
              <BillVersionsCard
                v-if="bill.versions && bill.versions.length > 0 && !isPhone"
                :bill="bill" />
            </i-col>
            <i-col
              :span="isTablet || isPhone ? 24 : 6"
              class="detail-block">
              <BillActionsCard v-if="bill.actions" :bill="bill" />
              <Row
                v-if="bill.articles"
                :gutter="30">
                <i-col
                  v-for="article in bill.articles"
                  :key="article.id"
                  :span="24" >
                  <ArticleCard
                    :article="article"
                    class="article-card" />
                </i-col>
              </Row>
            </i-col>
          </Row>
        </div>
      </section>
    </no-ssr>
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
import _ from 'lodash'

import ArticleCard from '~/components/HomePage/ArticleCard'

export default {
  components: {
    BillOverviewCard,
    BillSummaryCard,
    BillSponsorsMapCard,
    BillActionsCard,
    BillVersionsCard,
    ArticleCard
  },
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
      if (!_.isEmpty(this.bill.actions)) {
        this.bill.actions.forEach(action => {
          if (action.datetime > latestActionTime) {
            latestAction = action.description
            latestActionTime = action.datetime
          }
        })
      }
      if (process.browser) {
        // strip html tags from the string
        var dom = document.createElement('DIV')
        dom.innerHTML = latestAction
        latestAction = dom.textContent || dom.innerText || ''
      }
      return trimConGovAction(latestAction)
    },
    memberArea () {
      if (!this.bill.sponsor) {
        return ''
      }

      if (this.bill.sponsor.role.district) {
        return `${this.bill.sponsor.role.state}-${this.bill.sponsor.role.district}`
      } else {
        return `${this.bill.sponsor.role.state}`
      }
    },
    billIntroducedDate () {
      return localTime(this.bill.introducedDate)
    },
    billSponsorTitle () {
      if (this.bill.sponsor) {
        const title = this.bill.sponsor.role.title || ''
        const firstName = this.bill.sponsor.firstName || ''
        const lastName = this.bill.sponsor.lastName || ''
        return `${title} ${firstName} ${lastName}`
      } else {
        return ''
      }
    },
    billSponsorTitleArea () {
      if (this.bill.sponsor) {
        const title = this.bill.sponsor.role.title || ''
        const firstName = this.bill.sponsor.firstName || ''
        const lastName = this.bill.sponsor.lastName || ''
        const memberArea = !!this.memberArea ? `[${this.memberArea}]` : ''
        return `${title} ${firstName} ${memberArea}`
      } else {
        return ''
      }
    },
    billDescription () {
      return `此案由${this.billSponsorTitle}於${
        this.billIntroducedDate
      }提出. 此案最新進度為: ${this.billLatestAction}. `
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
        let bill =  _.cloneDeep(data.bills[0])

        // find correlated sponsor role
        if (bill && bill.sponsor && bill.sponsor.congressRoles) {
          const roles = bill.sponsor.congressRoles;
          const sortCngrRoles = _.orderBy(roles, 'endDate', 'desc')
          const sponsoredTime = parseInt(bill.introducedDate)
          bill.sponsor.role = _.find(sortCngrRoles, r => sponsoredTime >= r.startDate && sponsoredTime < r.endDate)
        }

        // find correlated co-sponsor role
        if (!_.isEmpty(bill.cosponsors)) {
          _.each(bill.cosponsors, cosponsor => {
            const roles = cosponsor.member.congressRoles;
            const sortCngrRoles = _.orderBy(roles, 'endDate', 'desc')
            const cosponsoredTime = parseInt(cosponsor.dateCosponsored)
            cosponsor.role = _.find(sortCngrRoles, r => cosponsoredTime >= r.startDate && cosponsoredTime < r.endDate)
          });
        }

        return bill
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
          content: `${appConfig.site.url}/bills/${this.$route.params.id}`
        },
        {
          property: 'og:title',
          content: this.bill ? this.bill.title : 'Loading'
        },
        {
          property: 'og:description',
          content: this.bill ? this.billDescription : 'Loading'
        },
        { property: 'og:image', content: `${appConfig.previewBaseUrl}/bill/${this.$route.params.id}.png` },
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
