<template>
  <div class="bill-page">
    <!-- Member -->
    <section
      v-if="members"
      :class="{ phone: isPhone }"
      class="member-section">
      <div class="member-section-wrapper">
        <Row>
          <!-- Main -->
          <i-col
            :span="isTablet || isPhone ? 24 : 18"
            :class="{ mobile: isTablet || isPhone }"
            class="main-block">
            <MemberOverviewCard
              v-if="ppMember"
              :ppMember="ppMember"
              :members="members"
              :memberTitle="memberTitle"
              :sponsoredBills="sponsoredBills"
              :cosponsoredBills="cosponsoredBills"/>
            <Spinner v-else />
            <!-- Sponsored Bills -->
            <SponsoredBillsCard
              v-if="ppMember && sponsoredBills && sponsoredBills.length > 0"
              :member="ppMember"
              :sponsoredBills="sponsoredBills" />
            <!-- Cosponsored Bills -->
            <CosponsoredBillsCard
              v-if="ppMember && cosponsoredBills && cosponsoredBills.length > 0"
              :member="ppMember"
              :cosponsoredBills="cosponsoredBills"/>
          </i-col>
          <!-- Summary -->
          <i-col
            :span="isTablet || isPhone ? 24 : 6"
            class="detail-block">
            <ContactCard
              v-if="ppMember"
              :member="ppMember" />
          </i-col>
        </Row>
      </div>
    </section>



  </div>
</template>

<script>
import _ from 'lodash'
import { get } from '@/plugins/utils'
// Components
import MemberOverviewCard from '~/components/MemberOverviewCard'
import ContactCard from '~/components/MemberDetailPage/ContactCard'
import SponsoredBillsCard from '~/components/MemberDetailPage/SponsoredBillsCard'
import CosponsoredBillsCard from '~/components/MemberDetailPage/CosponsoredBillsCard'
import Spinner from '~/components/Spinner'

// Queries
import StateListQuery from '~/apollo/queries/StateList'
import MemberQuery from '~/apollo/queries/MemberDetailPage/Member'
import BillsQuery from '~/apollo/queries/MemberDetailPage/Bills'

export default {
  components: {
    MemberOverviewCard,
    ContactCard,
    SponsoredBillsCard,
    CosponsoredBillsCard,
    Spinner
  },
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
        return `${this.members[0].titleLong} for ${this.states[this.members[0].state][lang]}'s ${
          this.members[0].district
        }th congressional district`
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

      this.sponsoredBills = _.orderBy(sponsoredBills.data.bills, bill => Number(bill.introducedDate), ['desc'])
      this.cosponsoredBills = _.orderBy(cosponsoredBills.data.bills, bill => Number(bill.introducedDate), ['desc'])
    },
    async fetchProPublicaMember (bioGuideId) {
      const response = await get(`https://api.propublica.org/congress/v1/members/${bioGuideId}.json`)
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
        if (!result.loading) {
          this.fetchSupportBills(result.data.members)
          this.fetchProPublicaMember(result.data.members[0].person.bioGuideId)
        }
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
        { hid: 'description', name: 'description', content: this.memberTitle ? this.memberTitle : 'Loading' },
        { name: 'og:title', content: this.person ? `${this.person.firstname} ${this.person.lastname}` : 'Loading' },
        { name: 'twitter:label1', content: 'Sponsored bills' },
        { name: 'twitter:data1', content: this.sponsoredBills ? this.sponsoredBills.length : 0 },
        { name: 'twitter:label2', content: 'Cosponsored bills' },
        { name: 'twitter:data2', content: this.cosponsoredBills ? this.cosponsoredBills.length : 0 }
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
