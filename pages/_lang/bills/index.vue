<template>
  <div class="bills-page">
    <!-- Banner -->
    <section class="banner">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ this.$t('billsPage.bannerTitle') }}</h1>
      </div>
    </section>
    <!-- Tabs -->
    <div class="tab-section">
      <div class="tab-section-wrapper">
        <TabButton class="tab-button" icon="ios-paper" label="Bills" :selected="this.billsTabSelected" @select="selectTab({bills: true, insight: false})"/>
        <TabButton class="tab-button" icon="stats-bars" label="Insight" :selected="this.insightTabSelected" @select="selectTab({bills: false, insight: true})"/>
      </div>
    </div>
    <!-- Bills -->
    <div v-if="this.billsTabSelected" class="bills-section">
      <div class="bills-section-wrapper">
        <Row>
          <!-- Filters -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="filters" :class="{ mobile: this.isTablet || this.isPhone }">
            <Row :gutter="20">
              <Col :span="this.isTablet ? 12 : 24" class="filter-block" :class="{ tablet: this.isTablet }">
                <h2 class="filter-title">Category</h2>
                <Select multiple v-model="selectedCategories" @on-change="onCategorySelect" placeholder="Select bill categories">
                  <Option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</Option>
                </Select>
              </Col>
              <Col :span="this.isTablet ? 12 : 24" class="filter-block" :class="{ tablet: this.isTablet }">
                <h2 class="filter-title">Sponsor</h2>
                <Select v-model="selectedSponsorId" @on-change="onSponsorSelect" clearable remote :remote-method="getSponsorSuggestList" placeholder="Select a sponsor">
                  <Option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</Option>
                </Select>
              </Col>
            </Row>

          </Col>
          <!-- List -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 18" class="list" :class="{ mobile: this.isTablet || this.isPhone }">
            <Row :gutter="30" type="flex" justify="space-around">
              <Col span="24" v-for="bill in filterredBills" :key="bill.id">
                <bill-card :bill="bill" />
              </Col>
              <Spinner :show="loadingBills"></Spinner>
            </Row>
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
import BillCard from '~/components/BillCard'
import TabButton from '~/components/TabButton'
import Spinner from '~/components/Spinner'
import allBillsQuery from '~/apollo/queries/allBills'
import allCategoriesQuery from '~/apollo/queries/allCategories'

export default {
  head () {
    return {
      title: `${this.$t('site.title.billsPageTitle')} | ${this.$t('site.title.mainTitle')}`
    }
  },
  data () {
    return {
      bills: [],
      loadingBills: true,
      loadingCategories: true,
      selectedCategories: [],
      selectedSponsorId: '',
      billsTabSelected: true,
      insightTabSelected: false
    }
  },
  methods: {
    onCategorySelect (selected) {
      console.log('111', this.selectedCategories)
    },
    selectTab ({ bills, insight }) {
      this.billsTabSelected = bills
      this.insightTabSelected = insight
    },
    onSponsorSelect () {},
    getSponsorSuggestList () {}
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    },
    filterredBills () {
      let that = this

      // when no category selected, return all bills
      if (!this.selectedCategories || this.selectedCategories.length === 0) return this.bills

      let bills = this.bills.filter(bill => {
        if (!bill.categories || bill.categories.length === 0) return false
        let mactched = false
        bill.categories.forEach(category => {
          if (that.selectedCategories.indexOf(category.id) >= 0) {
            mactched = true
          }
        })
        return mactched
      })
      return bills
    }
  },
  apollo: {
    bills: {
      fetchPolicy: 'cache-and-network',
      query: allBillsQuery,
      variables () {
        return { lang: this.locale }
      },
      watchLoading (isLoading, countModifier) {
        this.loadingBills = isLoading
      }
    },
    categories: {
      query: allCategoriesQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale }
      },
      watchLoading (isLoading, countModifier) {
        this.loadingCategories = isLoading
      }
    }
  },
  components: {
    BillCard,
    TabButton,
    Spinner
  }
}
</script>
<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typograghy';

.banner {
  background-color: #fff;
  border-bottom: 1px solid #eeeeed;
  position: relative;

  .banner-wrapper {
    height: 200px;
    display: flex;
    align-items: center;
    @extend .pageWrapper-large;

    .banner-title {
      font-size: 2.5em;
      font-weight: 400;
      letter-spacing: 0.05em;
    }
  }
}

.tab-section {
  padding: 40px 0 0 0;
  text-align: center;

  .tab-section-wrapper {
    @extend .pageWrapper-medium;
  }

  .tab-button {
    margin-right: 10px;

    &:last-child {
      margin-right: 0px;
    }
  }

  .category-filter-block {
    display: flex;
    align-self: center;
    h1 {
      font-weight: 600;
      font-size: 1.5em;
      margin-right: 10px;
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

  .filter-block {
    margin-bottom: 20px;

    .filter-title {
      color: $twGray;
      font-size: 1.4em;
      font-weight: $twBold;
      margin-bottom: 10px;
    }
  }
}

.list {
}
</style>
