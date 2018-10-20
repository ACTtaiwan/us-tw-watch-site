<template>
  <div class="insights-page">
    <!-- Banner -->
    <section :style="bannerStyle" class="banner">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('insightsPage.bannerTitle') }}</h1>
        </div>
        <div class="image-container" >
          <img :src="bannerMembers" class="front-img">
        </div>
      </div>
    </section>
    <!-- Insights -->
    <section class="insights-section">
      <div class="insights-section-wrapper">
        <Row>
          <!-- Filters -->
          <i-col :xs="{ span: 24 }" :sm="{ span: 6 }" class="filters">
            <MembersFilters :states="states" :loading="filterLoading" @on-filter="filterMembers"/>
          </i-col>
          <!-- List -->
          <i-col :xs="{ span: 24 }" :sm="{ span: 18 }" class="list">
            <Row :gutter="20">
              <i-col>
                <BillCountCongressByCategoryCard :categories="categories" />
              </i-col>
              <i-col>
                <BillCountCategoryByCongressCard :categories="categories" />
              </i-col>
              <i-col class="map-chart-container">
                <SponsoredBillCountMapCard />
              </i-col>
              <i-col class="map-chart-container">
                <CosponsoredBillCountMapCard />
              </i-col>
            </Row>
          </i-col>
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
import BillCountCategoryByCongressCard from '~/components/Analytics/BillCountCategoryByCongressCard'
import BillCountCongressByCategoryCard from '~/components/Analytics/BillCountCongressByCategoryCard'
// Queries
import MembersPrefetchQuery from '~/apollo/queries/MemberLandingPage/MembersPrefetch'
import MembersQuery from '~/apollo/queries/MemberLandingPage/Members'
import StateListQuery from '~/apollo/queries/StateList'
import CategoriesQuery from '~/apollo/queries/BillLandingPage/Categories'

export default {
  head () {
    return {
      title: `${this.$t('site.title.membersPageTitle')} | ${this.$t('site.title')}`
    }
  },
  components: {
    MembersFilters,
    InfiniteLoading,
    MemberSearchResultCard,
    Spinner,
    TabButton,
    SponsoredBillCountMapCard,
    CosponsoredBillCountMapCard,
    BillCountCategoryByCongressCard,
    BillCountCongressByCategoryCard
  },
  data () {
    return {
      categories: [],
      members: [],
      memberIds: [],
      page: 0,
      pageSize: 10,
      filterLoading: false,
      filterData: {},
      bannerBackground,
      bannerMembers,
      bannerStyle: `background-image: url("${bannerBackground}"); background-size: cover;`
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    congress () {
      return [this.$store.state.currentCongress]
    },
    selectedStates () {
      return this.filterData.selectedStates ? this.filterData.selectedStates : []
    }
  },
  methods: {
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
      return this.memberIds.filter(
        (id, index) => index >= this.page * this.pageSize && index < (this.page + 1) * this.pageSize
      )
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
    },
    categories: {
      query: CategoriesQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale }
      }
    }
  }
}
</script>


<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.banner {
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
        margin-top: 15px;
        margin-right: 20px;
      }
    }

    .image-container {
      .front-img {
        width: 200px;
        margin: auto 30px 10px 0;
      }
    }
  }
}

.insights-section {
  padding: 40px 0;

  .insights-section-wrapper {
    @extend .pageWrapper-large;
  }
}

.filters {
  padding-right: 40px;
  margin-bottom: 20px;
}

// desktop
@media screen and (min-width: $mediumDeviceWidth + 1) {
  .image-container {
    order: 1;
    display: flex;
    margin-right: 100px;
  }
}

// tablet
@media screen and (max-width: $mediumDeviceWidth) {
  .banner-wrapper {
    .image-container {
      display: none;
    }
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth) {
  .banner-wrapper {
    .image-container {
      display: none;
    }
  }

  .filters {
    padding-right: 0px;
  }
}
</style>

<style lang="scss">
.ivu-row {
  position: inherit;
}
</style>