<template>
  <div class="bills-page">
    <!-- Banner -->
    <section class="banner" :style="bannerStyle" :class="{ tablet: this.isTablet, phone: this.isPhone }">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('billsPage.bannerTitle') }}</h1>
          <div class="tabs">
            <TabButton class="tab-button" icon="ios-paper" label="Bills" :selected="this.billsTabSelected" @select="selectTab({bills: true, insight: false})"/>
            <TabButton class="tab-button" icon="stats-bars" label="Insight" :selected="this.insightTabSelected" @select="selectTab({bills: false, insight: true})"/>
          </div>
        </div>
        <div class="image-container" >
          <img class="front-img" :src="bannerBills" />
        </div>
      </div>
    </section>
    <!-- Bills -->
    <section v-if="this.billsTabSelected" class="bills-section">
      <div class="bills-section-wrapper">
        <Row>
          <!-- Filters -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="filters" :class="{ mobile: this.isTablet || this.isPhone }">
            <BillsFilters :categories="categories" @on-filter="filterBills" :loading="filterLoading"></BillsFilters>
          </Col>
          <!-- List -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 18" class="list" :class="{ mobile: this.isTablet || this.isPhone, phone: this.isPhone }">
            <Row>
              <Col span="24" v-for="bill in bills" :key="bill.id">
                <BillSearchResultCard :bill="bill" />
              </Col>
            </Row>
            <InfiniteLoading ref="infiniteLoading" @infinite="moreItems">
              <span slot="spinner">
                <Spinner></Spinner>
              </span>
              <span slot="no-more">
                no more data 😂
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
          <Col :span="this.isTablet || this.isPhone ? 24 : 12">
            <BillCountCongressByCategoryCard :categories="this.categories"></BillCountCongressByCategoryCard>
          </Col>
          <Col :span="this.isTablet || this.isPhone ? 24 : 12">
            <BillCountCategoryByCongressCard :categories="this.categories"></BillCountCategoryByCongressCard>
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
import bannerBills from '~/assets/img/banner-bills.png'
// Components
import BillSearchResultCard from '~/components/BillSearchResultCard'
import TabButton from '~/components/TabButton'
import Spinner from '~/components/Spinner'
import BillsFilters from '~/components/BillsFilters'
import BillCountCategoryByCongressCard from '~/components/Analytics/BillCountCategoryByCongressCard'
import BillCountCongressByCategoryCard from '~/components/Analytics/BillCountCongressByCategoryCard'
// Queries
import prefetchBillsQuery from '~/apollo/queries/prefetchBills'
import billsQuery from '~/apollo/queries/BillLandingPage'
import allCategoriesQuery from '~/apollo/queries/allCategories'

export default {
  head () {
    return {
      title: `${this.$t('site.title.billsPageTitle')} | ${this.$t('site.title.mainTitle')}`
    }
  },
  data () {
    return {
      categories: [],
      bills: [],
      billIds: [],
      page: 0,
      pageSize: 10,
      billsTabSelected: true,
      insightTabSelected: false,
      filterLoading: false,
      filterData: {},
      bannerBackground,
      bannerBills,
      bannerStyle: `background-image: url("${bannerBackground}"); background-size: cover;`
    }
  },
  methods: {
    selectTab ({ bills, insight }) {
      this.billsTabSelected = bills
      this.insightTabSelected = insight
    },
    resetPage () {
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset()
      }
      this.bills = []
      this.billIds = []
      this.page = 0
    },
    prefetchBillIds () {
      return this.$apollo.query({
        query: prefetchBillsQuery,
        variables: {
          lang: this.locale,
          congress: this.selectedCongress,
          categories: this.selectedCategories
        }
      })
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: billsQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    getCurrentPageItems () {
      return this.billIds.filter((id, index) => index >= this.page * this.pageSize && index < (this.page + 1) * this.pageSize)
    },
    async moreItems ($state) {
      // make sure billIds is fetched
      if (!this.billIds.length) {
        try {
          let result = await this.prefetchBillIds()
          this.billIds = result.data.bills[0].prefetchIds
        } catch (error) {
          console.log('no data :(', error)
        }
      }

      const items = this.getCurrentPageItems()

      if (items.length > 0) {
        this.fetchBills(items)
          .then(({ data }) => {
            this.filterLoading = false
            const billsMap = _.keyBy(data.bills, 'id')
            const bills = items.map(id => billsMap[id])
            this.bills = [...this.bills, ...bills]
            this.page++
            $state.loaded()
            console.log('BBBBB', data.bills)
          })
          .catch(error => {
            console.log('get bills error', error)
            $state.complete()
          })
      } else {
        $state.complete()
      }
    },
    filterBills (filterData) {
      this.filterLoading = true
      this.resetPage()
      this.filterData = filterData
      console.log('filterData', filterData)
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
    selectedCategories () {
      return this.filterData.selectedCategories ? this.filterData.selectedCategories : []
    },
    selectedCongress () {
      let congress = []
      if (this.filterData.congressFrom && this.filterData.congressTo) {
        for (var i = this.filterData.congressFrom; i <= this.filterData.congressTo; i++) {
          congress.push(i)
        }
      } else {
        congress.push(this.$store.state.currentCongress)
      }
      return congress
    }
  },
  apollo: {
    categories: {
      query: allCategoriesQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale }
      }
    }
  },
  components: {
    InfiniteLoading,
    BillSearchResultCard,
    TabButton,
    Spinner,
    BillsFilters,
    BillCountCategoryByCongressCard,
    BillCountCongressByCategoryCard
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
        margin-top: auto;
        width: 280px;
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

.bills-section {
  padding: 40px 0;

  .bills-section-wrapper {
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
  }
}
</style>
