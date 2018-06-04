<template>
  <div class="bills-page">
    <!-- Banner -->
    <section
      :style="bannerStyle"
      :class="{ tablet: isTablet, phone: isPhone }"
      class="banner">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('billsPage.bannerTitle') }}</h1>
          <div class="tabs">
            <TabButton
              :selected="billsTabSelected"
              class="tab-button"
              icon="ios-paper"
              label="Bills"
              @select="selectTab({bills: true, insight: false})"/>
            <TabButton
              :selected="insightTabSelected"
              class="tab-button"
              icon="stats-bars"
              label="Insight"
              @select="selectTab({bills: false, insight: true})"/>
          </div>
        </div>
        <div class="image-container" >
          <img
            :src="bannerBills"
            class="front-img">
        </div>
      </div>
    </section>
    <!-- Bills -->
    <section
      v-if="billsTabSelected"
      class="bills-section">
      <div class="bills-section-wrapper">
        <Row>
          <!-- Filters -->
          <i-col
            :span="isTablet || isPhone ? 24 : 6"
            :class="{ mobile: isTablet || isPhone }"
            class="filters">
            <BillsFilters
              :categories="categories"
              :loading="filterLoading"
              @on-filter="filterBills" />
          </i-col>
          <!-- List -->
          <i-col
            :span="isTablet || isPhone ? 24 : 18"
            :class="{ mobile: isTablet || isPhone, phone: isPhone }"
            class="list">
            <Row>
              <i-col
                v-for="bill in bills"
                :key="bill.id"
                span="24">
                <BillSearchResultCard :bill="bill" />
              </i-col>
            </Row>
            <InfiniteLoading
              ref="infiniteLoading"
              @infinite="moreItems">
              <span slot="spinner">
                <Spinner />
              </span>
              <span slot="no-more">
                no more data 😂
              </span>
            </InfiniteLoading>
          </i-col>
        </Row>
      </div>
    </section>
    <!-- Insights -->
    <section
      v-if="insightTabSelected"
      class="insights-section">
      <div class="insights-section-wrapper">
        <Row :gutter="20">
          <i-col :span="isTablet || isPhone ? 24 : 12">
            <BillCountCongressByCategoryCard :categories="categories" />
          </i-col>
          <i-col :span="isTablet || isPhone ? 24 : 12">
            <BillCountCategoryByCongressCard :categories="categories" />
          </i-col>
        </Row>
      </div>
    </section>
  </div>
</template>
<script>
import appConfig from '~/config/app.json'
// Packages
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
import PrefetchBillIdsQuery from '~/apollo/queries/BillLandingPage/PrefetchBillIds'
import BillsQuery from '~/apollo/queries/BillLandingPage/Bills'
import CategoriesQuery from '~/apollo/queries/BillLandingPage/Categories'

export default {
  head () {
    return {
      title: `${this.$t('billsPage.title')} | ${this.$t('site.title.mainTitle')}`,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('billsPage.description') },
        { property: 'og:url', content: `${appConfig.site.url}/${this.locale}/bills` },
        {
          property: 'og:title',
          content: `${this.$t('billsPage.title')} | ${this.$t('site.title.mainTitle')}`
        },
        { property: 'og:description', content: this.$t('billsPage.description') }
      ]
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
        query: PrefetchBillIdsQuery,
        variables: {
          lang: this.locale,
          congress: this.selectedCongress,
          categories: this.selectedCategories
        }
      })
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillsQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    getCurrentPageItems () {
      return this.billIds.filter(
        (id, index) => index >= this.page * this.pageSize && index < (this.page + 1) * this.pageSize
      )
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
            const bills = data.bills
            this.bills = [...this.bills, ...bills]
            this.page++
            $state.loaded()
            console.log('fetched bills', data.bills)
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
  apollo: {
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
