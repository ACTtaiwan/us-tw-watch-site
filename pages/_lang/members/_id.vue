<template>
  <div class="bill-page">

    <!-- Member -->
    <section v-if="members" class="member-section" :class="{ phone: this.isPhone }">
      <div class="member-section-wrapper">
        <Row>
          <!-- Main -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 18"  class="main-block" :class="{ mobile: this.isTablet || this.isPhone }">
            <!-- Overview -->
            <MemberOverviewCard v-if="this.ppMember"
              :ppMember="this.ppMember"
              :members="this.members"
              :memberTitle="memberTitle"
              :sponsoredBills="sponsoredBills"
              :cosponsoredBills="cosponsoredBills">
            </MemberOverviewCard>
            <!-- Summary -->
            <!-- <BillSummaryCard v-if="this.bill.summary.paragraphs" :bill="this.bill"></BillSummaryCard> -->
            <!-- Support Map -->
            <!-- <BillSponsorsMapCard :bill="this.bill"></BillSponsorsMapCard> -->
          </Col>
          <!-- Summary -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="detail-block">
            <!-- <BillActionsCard :bill="this.bill"></BillActionsCard> -->
          </Col>
        </Row>
      </div>
    </section>



  </div>
</template>

<script>
import axios from 'axios'
// Components
import MemberOverviewCard from '~/components/MemberOverviewCard'
import BillSummaryCard from '~/components/BillSummaryCard'
import BillSponsorsMapCard from '~/components/BillSponsorsMapCard'
import BillActionsCard from '~/components/BillActionsCard'

// Queries
import StateListQuery from '~/apollo/queries/StateList'
import MemberQuery from '~/apollo/queries/MemberDetailPage/Member'
import BillsQuery from '~/apollo/queries/MemberDetailPage/Bills'

export default {
  data () {
    return {
      sponsoredBills: null,
      cosponsoredBills: null,
      ppMember: null
    }
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
    person () {
      return this.members ? this.members[0].person : {}
    },
    member () {
      return this.members ? this.members[0] : {}
    },
    memberTitle () {
      const lang = { 'en-us': 'en', 'zh-tw': 'zh' }[this.$store.state.locale]

      if (!this.states || !this.members) return ''
      if (this.members[0].district) {
        return `${this.members[0].titleLong} for ${this.states[this.members[0].state][lang]}'s ${this.members[0].district}th congressional district`
      } else {
        return `${this.members[0].titleLong} for ${this.states[this.members[0].state][lang]}`
      }
    }
  },
  methods: {
    async fetchSupportBills (members) {
      let sponsored = []
      let cosponsored = []

      members.forEach(member => {
        sponsored = member.billIdSponsored ? [...sponsored, ...member.billIdSponsored] : sponsored
        cosponsored = member.billIdCosponsored ? [...cosponsored, ...member.billIdCosponsored] : cosponsored
      })

      const sponsoredBills = await this.fetchBills(sponsored)
      const cosponsoredBills = await this.fetchBills(cosponsored)

      this.sponsoredBills = sponsoredBills.data.bills
      this.cosponsoredBills = cosponsoredBills.data.bills
    },
    async fetchProPublicaMember (bioGuideId) {
      const response = await axios({
        method: 'GET',
        url: `https://api.propublica.org/congress/v1/members/${bioGuideId}.json`,
        headers: { 'X-API-Key': 'syre14A0ZO81RzG81d5L4PbjkjF4Uu0aFWSjfNqf' }
      })
      this.ppMember = response.data.results[0]
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillsQuery,
        variables: { lang: this.locale, ids: ids }
      })
    }
  },
  apollo: {
    members: {
      query: MemberQuery,
      fetchPolicy: 'cache-and-network',
      // Add prefetch for SSR
      // https://github.com/Akryum/vue-apollo#server-side-rendering
      prefetch: ({ route, app }) => ({
        personIds: [route.params.id],
        lang: app.store.state.locale
      }),
      variables () {
        return {
          personIds: [this.$route.params.id],
          lang: this.locale
        }
      },
      update (data) {
        return data.members
      },
      result (result) {
        this.fetchSupportBills(result.data.members)
        this.fetchProPublicaMember(result.data.members[0].person.bioGuideId)
      }
    },
    states: {
      query: StateListQuery,
      fetchPolicy: 'cache-and-network',
      prefetch: ({ route, app }) => ({
        lang: app.store.state.locale,
        stateList: true
      }),
      variables () {
        return { lang: this.locale, stateList: true }
      },
      update (data) {
        return JSON.parse(data.maps[0].states)
      }
    }
  },
  head () {
    return {
      title: this.person ? `${this.person.firstname} ${this.person.lastname}` : 'Loading',
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: this.memberTitle ? this.memberTitle : 'Loading'
        }
      ]
    }
  },
  components: {
    MemberOverviewCard,
    BillSummaryCard,
    BillSponsorsMapCard,
    BillActionsCard
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

.member-section {
  padding: 40px 0;

  .member-section-wrapper {
    @extend .pageWrapper-large;
  }
}

.bill-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .bill-code {
    font-size: 1.1em;
    font-weight: $twSemiBold;
    color: $twWhite;
    background: $twGrayLight;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;
  }
  .bill-type {
    font-size: 1.1em;
    font-weight: $twSemiBold;
    color: $twWhite;
    background: $twGrayLight;
    border-radius: 10px;
    padding: 1px 8px;
  }
}

.bill-title {
  font-size: 1.8em;
  font-weight: $twSemiBold;
  color: $twGrayDark;
  margin-bottom: 20px;
}

.main-block {
  padding-right: 40px;
  position: inherit;

  &.mobile {
    padding-right: 0px;
  }
}
</style>
