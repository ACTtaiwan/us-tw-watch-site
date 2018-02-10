<template>
  <Row :gutter="20">
    <Col :span="this.isTablet ? 12 : 24" class="filter-block">
      <h2 class="filter-title">Congress</h2>
      <div class="filter-field-block">
        <div class="filter-field">
          <span class="filter-field-title">from</span>
          <InputNumber class="filter-field-value" :value="filterForm.congressFrom"></InputNumber>
        </div>
        <div class="filter-field">
          <span class="filter-field-title">to</span>
          <InputNumber class="filter-field-value" :value="filterForm.congressTo"></InputNumber>
        </div>
      </div>
    </Col>
    <Col :span="this.isTablet ? 12 : 24" class="filter-block" :class="{ tablet: this.isTablet }">
      <h2 class="filter-title">Category</h2>
      <Select multiple v-model="selectedCategories" @on-change="onCategorySelect" placeholder="select bill categories">
        <Option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</Option>
      </Select>
    </Col>
    <Col :span="this.isTablet ? 12 : 24" class="filter-block" :class="{ tablet: this.isTablet }">
      <h2 class="filter-title">Sponsor</h2>
      <Select v-model="selectedSponsorId" @on-change="onSponsorSelect" clearable remote :remote-method="getSponsorSuggestList" placeholder="select a sponsor">
        <Option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</Option>
      </Select>
    </Col>
    <Col :span="24" class="filter-block">
      <TwButton label="Search"></TwButton>
    </Col>
  </Row>
</template>

<script>
import TwButton from '~/components/TwButton'
import allCategoriesQuery from '~/apollo/queries/allCategories'

export default {
  data () {
    return {
      filterForm: {
        congressFrom: 115,
        congressTo: 115,
        congressMin: 96,
        congressMax: 115
      },
      selectedCategories: [],
      selectedSponsorId: ''
    }
  },
  methods: {
    onCategorySelect (selected) {
      console.log('DDDDDD', this.selectedCategories)
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
    TwButton
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.filter-block {
  margin-bottom: 20px;

  .filter-title {
    color: $twGrayDark;
    font-size: 1.2em;
    font-weight: $twBold;
    margin-bottom: 10px;
  }

  .filter-field-block {
    display: flex;
    align-items: center;

    .filter-field {
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 10px;

      &:last-child {
        margin-right: 0px;
      }

      .filter-field-title {
        font-size: 12px;
        font-weight: $twSemiBold;
        color: $twGrayLight;
        margin-right: 10px;
      }

      .filter-field-value {
        min-width: 50px;
        width: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.ivu-input-number-input {
  font-weight: $twMedium;
  color: $twGrayDark;
}

.ivu-select-placeholder {
  font-weight: $twMedium !important;
  color: $twGrayLight !important;
}

.ivu-select-multiple .ivu-select-selection {
  padding: 0 24px 1px 4px;

  .ivu-tag {
    height: 24px;
  }
}

.ivu-select-dropdown-list {
  .ivu-select-item {
    font-weight: $twMedium;
    color: $twGrayDark;

    &.ivu-select-item-selected {
      background: $twIndigo;
      color: $twWhite;
    }
  }
}

.ivu-select-selected-value {
  font-weight: $twMedium;
  color: $twGrayDark;
}

.ivu-tag-text {
  font-weight: $twMedium;
  color: $twGrayDark;
}
</style>
