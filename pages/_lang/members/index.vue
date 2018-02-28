<template>
  <div class="members-page">
    <!-- Banner -->
    <section class="banner" :style="bannerStyle" :class="{ tablet: this.isTablet, phone: this.isPhone }">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('membersPage.bannerTitle') }}</h1>
          <div class="tabs">
            <TabButton class="tab-button" icon="ios-paper" label="Members" :selected="this.membersTabSelected" @select="selectTab({members: true, insight: false})"/>
            <TabButton class="tab-button" icon="stats-bars" label="Insight" :selected="this.insightTabSelected" @select="selectTab({members: false, insight: true})"/>
          </div>
        </div>
        <div class="image-container" >
          <img class="front-img" :src="bannerMembers" />
        </div>
      </div>
    </section>
    <!-- Members -->
    <section v-if="this.membersTabSelected" class="members-section">
      <div class="members-section-wrapper">
        <Row>
          <!-- Filters -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="filters" :class="{ mobile: this.isTablet || this.isPhone }">
            <MembersFilters :states="states" @on-filter="filterMembers" :loading="filterLoading"></MembersFilters>
          </Col>
          <!-- List -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 18" class="list" :class="{ mobile: this.isTablet || this.isPhone, phone: this.isPhone }">
            <Row>
              <Col span="24" v-for="member in members" :key="member.id">
                <MemberSearchResultCard :member="member" :states="states" />
              </Col>
            </Row>
            <InfiniteLoading ref="infiniteLoading" @infinite="moreItems">
              <span slot="spinner">
                <Spinner></Spinner>
              </span>
              <span slot="no-more">
                no more data 😂
              </span>
              <span slot="no-results">
                no results 😭
              </span>
            </InfiniteLoading>
          </Col>
        </Row>
      </div>
    </section>
    <!-- Insights -->
    <section v-if="this.insightTabSelected" class="insights-section">
      <div class="insights-section-wrapper">
        <Row :gutter="20">
          <Col :span="this.isTablet || this.isPhone ? 24 : 12" class="map-chart-container">
            <SponsoredBillCountMapCard></SponsoredBillCountMapCard>
          </Col>
          <Col :span="this.isTablet || this.isPhone ? 24 : 12" class="map-chart-container">
            <CosponsoredBillCountMapCard></CosponsoredBillCountMapCard>
          </Col>
        </Row>
      </div>
    </section>
  </div>
</template>
<script>
// Packages
import _ from 'lodash'
import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue'
// Images
import bannerBackground from '~/assets/img/banner.png'
import bannerMembers from '~/assets/img/banner-members.png'
// Components
import MemberSearchResultCard from '~/components/MemberSearchResultCard'
import TabButton from '~/components/TabButton'
import Spinner from '~/components/Spinner'
import MembersFilters from '~/components/MembersFilters'
import SponsoredBillCountMapCard from '~/components/Analytics/SponsoredBillCountMapCard'
import CosponsoredBillCountMapCard from '~/components/Analytics/CosponsoredBillCountMapCard'
// Queries
import MembersPrefetchQuery from '~/apollo/queries/MemberLandingPage/MembersPrefetch'
import MembersQuery from '~/apollo/queries/MemberLandingPage/Members'
import StateListQuery from '~/apollo/queries/StateList'

export default {
  head () {
    return {
      title: `${this.$t('site.title.membersPageTitle')} | ${this.$t('site.title.mainTitle')}`
    }
  },
  data () {
    return {
      members: [],
      memberIds: [],
      page: 0,
      pageSize: 10,
      membersTabSelected: true,
      insightTabSelected: false,
      filterLoading: false,
      filterData: {},
      bannerBackground,
      bannerMembers,
      bannerStyle: `background-image: url("${bannerBackground}"); background-size: cover;`
    }
  },

  methods: {
    selectTab ({ members, insight }) {
      this.membersTabSelected = members
      this.insightTabSelected = insight
    },
    resetPage () {
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset()
      }
      this.members = []
      this.memberIds = []
      this.page = 0
    },
    prefetchMemberIds () {
      return this.$apollo.query({
        query: MembersPrefetchQuery,
        variables: { lang: this.locale, congress: this.congress, states: this.selectedStates }
      })
    },
    fetchMembers (ids) {
      return this.$apollo.query({
        query: MembersQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    getCurrentPageItems () {
      return this.memberIds.filter((id, index) => index >= this.page * this.pageSize && index < (this.page + 1) * this.pageSize)
    },
    async moreItems ($state) {
      // make sure memberIds is fetched
      if (!this.memberIds.length) {
        try {
          let result = await this.prefetchMemberIds()
          console.log('prefetch ids: ', result)
          this.memberIds = result.data.members[0].prefetchIds
        } catch (error) {
          console.log('no data :(', error)
        }
      }

      const items = this.getCurrentPageItems()

      if (items.length > 0) {
        this.fetchMembers(items)
          .then(({ data }) => {
            this.filterLoading = false
            const membersMap = _.keyBy(data.members, 'id')
            const members = items.map(id => membersMap[id])
            this.members = [...this.members, ...members]
            this.page++
            $state.loaded()
            console.log('BBBBB', data.members)
          })
          .catch(error => {
            this.filterLoading = false
            console.log('get members error', error)
            $state.complete()
          })
      } else {
        this.filterLoading = false
        $state.complete()
      }
    },
    filterMembers (filterData) {
      this.filterLoading = true
      this.resetPage()
      this.filterData = filterData
      console.log('filterData', filterData.selectedStates)
    }
  },
  computed: {
    locale () {
      // when locale changes, reset the current page
      this.resetPage()
      return this.$store.state.locale
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    },
    congress () {
      return [this.$store.state.currentCongress]
    },
    selectedStates () {
      return this.filterData.selectedStates ? this.filterData.selectedStates : []
    }
  },
  apollo: {
    states: {
      query: StateListQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale, stateList: true }
      },
      update (data) {
        return JSON.parse(data.maps[0].states)
      }
    }
  },
  components: {
    MembersFilters,
    InfiniteLoading,
    MemberSearchResultCard,
    Spinner,
    TabButton,
    SponsoredBillCountMapCard,
    CosponsoredBillCountMapCard
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.banner {
  // desktop
  .banner-wrapper {
    height: 180px;
    display: flex;
    justify-content: space-between;
    @extend .pageWrapper-large;

    .text-container {
      order: 0;
      padding-top: 50px;

      .banner-title {
        display: inline-block;
        font-size: 2em;
        font-weight: $twMedium;
        line-height: 1.1em;
        text-align: left;
        letter-spacing: 0.02em;
        color: $twWhite;
        margin-right: 20px;
      }

      .tabs {
        display: inline-block;
        vertical-align: bottom;
        margin-top: 15px;

        .tab-button {
          margin-right: 10px;

          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }

    .image-container {
      order: 1;
      display: flex;
      margin-right: 100px;

      .front-img {
        width: 200px;
        margin: auto 30px 10px 0;
      }
    }
  }

  // tablet
  &.tablet {
    .banner-wrapper {
      .image-container {
        display: none;
      }
    }
  }

  // phone
  &.phone {
    .banner-wrapper {
      .image-container {
        display: none;
      }
    }
  }
}

.members-section {
  padding: 40px 0;

  .members-section-wrapper {
    @extend .pageWrapper-large;
  }
}

.filters {
  padding-right: 40px;
  margin-bottom: 20px;

  &.mobile {
    padding-right: 0px;
  }
}

.insights-section {
  padding: 40px 0;

  .insights-section-wrapper {
    @extend .pageWrapper-large;

    .map-chart-container {
      position: inherit;
    }
  }
}
</style>

<style lang="scss">
.ivu-row {
  position: inherit;
}
</style>
