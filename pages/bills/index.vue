<template>
  <div class="bills-page">
    <!-- Banner -->
    <section :style="bannerStyle" class="banner">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('billsPage.bannerTitle') }}</h1>
        </div>
        <div class="image-container" >
          <img :src="bannerBills" class="front-img">
        </div>
      </div>
    </section>
    <!-- Bills -->
    <section class="bills-section">
      <div class="bills-section-wrapper">
        <Row>
          <!-- Filters -->
          <i-col :xs="{ span: 24 }" :sm="{ span: 6 }" class="filters">
            <BillsFilters :categories="categories" :loading="filterLoading" @on-filter="filterBills" />
          </i-col>
          <!-- List -->
          <i-col :xs="{ span: 24 }" :sm="{ span: 18 }" class="list">
            <Row>
              <i-col v-for="bill in bills" :key="bill.id" span="24">
                <BillSearchResultCard :bill="bill" />
              </i-col>
            </Row>
            <InfiniteLoading ref="infiniteLoading" @infinite="moreItems">
              <span slot="spinner">
                <Spinner />
              </span>
              <span slot="no-more">
                no more data 😂
              </span>
              <span slot="no-results">
                no results 😭
              </span>
            </InfiniteLoading>
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
import Spinner from '~/components/Spinner'
import BillsFilters from '~/components/BillsFilters'
// Queries
import PrefetchBillIdsQuery from '~/apollo/queries/BillLandingPage/PrefetchBillIds'
import BillsQuery from '~/apollo/queries/BillLandingPage/Bills'
import CategoriesQuery from '~/apollo/queries/BillLandingPage/Categories'

export default {
  head () {
    return {
      title: `${this.$t('billsPage.title')} | ${this.$t('site.title')}`,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('billsPage.description') },
        { property: 'og:url', content: `${appConfig.site.url}/${this.locale}/bills` },
        {
          property: 'og:title',
          content: `${this.$t('billsPage.title')} | ${this.$t('site.title')}`
        },
        { property: 'og:description', content: this.$t('billsPage.description') }
      ]
    }
  },
  components: {
    InfiniteLoading,
    BillSearchResultCard,
    Spinner,
    BillsFilters
  },
  data () {
    return {
      categories: [],
      bills: [],
      billIds: [],
      page: 0,
      pageSize: 10,
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

.bills-section {
  padding: 40px 0;

  .bills-section-wrapper {
    @extend .pageWrapper-large;
  }
}

.filters {
  padding-right: 40px;
  margin-bottom: 20px;
}

// desktop
@media screen and (min-width: $mediumDeviceWidth) {
  .image-container {
    order: 1;
    display: flex;
    margin-right: 100px;
  }
}

// tablet
@media screen and (max-width: $mediumDeviceWidth - 1) {
  .banner-wrapper {
    .image-container {
      display: none;
    }
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
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
