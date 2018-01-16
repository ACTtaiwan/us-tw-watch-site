<template>
    <Table class="bills-table"
      :columns="tableColumns"
      :data="filteredBills"
      :loading="loading === 1"/>
</template>

<script>
import columnRenderer from './columnRenderer'

export default {
  props: ['bills', 'loading'],
  data () {
    return {
      keywordColumnTitle: '',
      optionsColumnTitle: []
    }
  },

  computed: {
    tableColumns () {
      let vm = this
      return columnRenderer(vm)
    },
    filteredBills () {
      const bills = this.bills

      if (!bills) {
        return []
      }

      const filters = [
        bills,
        {
          key: 'title',
          value: this.optionsColumnTitle,
          keyword: this.keywordColumnTitle
        }
      ]

      const result = filters.reduce((accumulator, currentValue, currentIndex, array) => {
        const currentFilter = currentValue
        if (currentFilter.keyword) {
          return accumulator.filter(b => currentFilter.value.indexOf(b[currentFilter.key]) > -1)
        }

        return accumulator
      })

      return result
    }
  }
}
</script>


<style scoped lang="scss">

</style>


<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';

.bills-table {
  .ivu-table th {
    background: #ffffff;
  }

  .ivu-table-cell {
    font-size: 14px;
  }
}

.title-col {
  .ivu-table-cell {
    padding: 18px;
  }

  .bill-link {
    font-weight: 700;
    color: $strongTextLinkColor;

    &:hover {
      color: $normalTextLinkColor;
    }
  }
}

.sponsor-col {
  font-weight: 700;
  color: $strongTextLinkColor;
}
</style>
