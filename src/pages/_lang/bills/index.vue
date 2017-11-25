<template>
  <div class="bills-page">
    <section class="banner">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ this.$t('billsPage.bannerTitle') }}</h1>
      </div>
    </section>
    <div class="search-section">
      <div class="search-section-wrapper">
        <Row>
          <!-- Category -->
          <Col span="24" class="category-filter-block">
            <h1>Category</h1>
            <Select multiple
              style="width: 400px"
              v-model="selectedCategories"
              @on-change="onCategorySelect"
              placeholder="Select bill categories">
              <Option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</Option>
            </Select>
          </Col>
          <!-- Sponsor -->
          <!-- <Col span="8">
            <Select
              v-model="selectedSponsorId"
              @on-change="onSponsorSelect"
              clearable
              remote
              :remote-method="getSponsorSuggestList"
              placeholder="Select a sponsor">
              <Option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</Option>
            </Select>
          </Col> -->
        </Row>
      </div>
    </div>
    <div class="table-section">
      <div class="table-section-wrapper">
        <bill-table :bills="filterredBills" :loading="loading" />
      </div>
    </div>
  </div>
</template>
<script>
import BillTable from '~/components/bill-table'
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
      loading: 0,
      selectedCategories: [],
      selectedSponsorId: ''
    }
  },
  methods: {
    onCategorySelect (selected) {
      console.log('000', selected)
      console.log('111', this.selectedCategories)
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale.split('-')[0]
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
    $loadingKey: 'loading',
    bills: {
      fetchPolicy: 'network-only',
      query: allBillsQuery,
      variables () {
        return { lang: this.lang }
      }
    },
    categories: {
      query: allCategoriesQuery,
      fetchPolicy: 'network-only'
    }
  },
  components: {
    BillTable
  }
}
</script>
<style scoped lang="scss">
@import 'src/assets/css/app';

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

.search-section {
  background-color: #f8f8f9;
  padding: 40px 0 0 0;
  text-align: left;

  .search-section-wrapper {
    @extend .pageWrapper-medium;
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

.table-section {
  background-color: #f8f8f9;
  padding: 40px 0;

  .table-section-wrapper {
    @extend .pageWrapper-large;
  }
}
</style>
