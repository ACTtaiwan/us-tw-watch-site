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
    <div v-if="this.billsTabSelected" class="bills-section">
      <div class="bills-section-wrapper">
        <Row>
          <!-- Filters -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="filters" :class="{ mobile: this.isTablet || this.isPhone }">
            <BillsFilters :categories="categories"></BillsFilters>
          </Col>
          <!-- List -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 18" class="list" :class="{ mobile: this.isTablet || this.isPhone, phone: this.isPhone }">
            <Row>
              <Col class="card-row" span="24" v-for="bill in bills" :key="bill.id">
                <bill-card :bill="bill" />
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
    </div>
    <!-- Insights -->
    <div v-if="this.insightTabSelected" class="insights-section">
      <div class="insights-section-wrapper">
        XDDDD
      </div>
    </div>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue'

import bannerBackground from '~/assets/img/banner.png'
import bannerBills from '~/assets/img/banner-bills.png'

import BillCard from '~/components/BillCard'
import TabButton from '~/components/TabButton'
import Spinner from '~/components/Spinner'
import BillsFilters from '~/components/BillsFilters'

// Queries
import prefetchBillsQuery from '~/apollo/queries/prefetchBills'
import billsQuery from '~/apollo/queries/bills'
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
      filterByCongress: null,
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
      console.log('reset page')
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset()
      }
      this.bills = []
      this.billIds = []
    },
    prefetchBillIds () {
      return this.$apollo.query({
        query: prefetchBillsQuery,
        variables: { lang: this.locale, congress: this.congress }
      })
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: billsQuery,
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
            this.bills = [...this.bills, ...data.bills]
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
      return this.filterByCongress ? this.filterByCongress : this.$store.state.currentCongress
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
    BillCard,
    TabButton,
    Spinner,
    BillsFilters
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

  &.mobile {
    padding-right: 0px;
  }
}

.list {
  &.phone {
    .card-row {
      margin-left: calc(15px * -1);
      margin-right: calc(15px * -1);
      width: 100%;
      width: -moz-available; /* WebKit-based browsers will ignore this. */
      width: -webkit-fill-available;
    }
  }
}
</style>
