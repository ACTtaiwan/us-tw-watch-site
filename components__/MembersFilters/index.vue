<template>
  <Row :gutter="20">
    <Col :span="this.isTablet ? 12 : 24" class="filter-block" :class="{ tablet: this.isTablet }">
      <h2 class="filter-title">State</h2>
      <Select multiple v-model="filterData.selectedStates" @on-change="onStateSelect" placeholder="select member states">
        <Option v-for="state in stateList" :value="state.code" :key="state.code">{{ locale === 'en-us' ? state.en : state.zh }}</Option>
      </Select>
    </Col>
    <Col :span="24" class="filter-block">
      <TwButton label="Search" @press="submit" :loading="loading"></TwButton>
    </Col>
  </Row>
</template>

<script>
import TwButton from '~/components/TwButton'

export default {
  props: {
    states: {
      type: Object,
      required: false
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      filterData: {
        selectedStates: []
      }
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isTablet () {
      return this.$store.getters.isTablet
    },
    stateList () {
      let stateList = []
      if (this.states) {
        stateList = Object.keys(this.states).map(code => ({
          code: code,
          en: this.states[code].en,
          zh: this.states[code].zh
        }))
      }
      return stateList
    }
  },
  methods: {
    onStateSelect (selected) {
      console.log('select state', this.filterData.selectedStates)
    },
    submit () {
      this.$emit('on-filter', this.filterData)
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
    margin: 2px 0;

    &.ivu-select-item-selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      background: none;

      &:after {
        color: $twIndigo;
        display: inline-block;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        -webkit-font-feature-settings: normal;
        font-feature-settings: normal;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        float: right;
        font-size: 24px;
        content: '\F3FD';
      }
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
