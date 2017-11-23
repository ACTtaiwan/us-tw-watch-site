<template>
    <div>
      <Table
        :columns="tableColumns"
        :data="filteredBills"
        :border="showBorder"
        :stripe="showStripe"
        :show-header="showHeader"
        :height="tableHeight"
        :size="tableSize" 
        :loading="isLoading"
      />
    </div>
</template>
<script>
import renderTableColumns from './renderTableColumns'

export default {
  props: [
    'bills',
    'loading',
    'customHeight'
  ],

  data () {
    const vm = this

    return {
      showBorder: true,
      showStripe: true,
      showHeader: true,
      defaulTableHeight: 500,
      tableSize: 'large',
      tableColumns: renderTableColumns(vm),
      loadingColumnTitle: false,
      keywordColumnTitle: '',
      optionsColumnTitle: []
      // listColumnId: (this.bills && this.bills.map(b => b.id)) || []
    }
  },

  computed: {
    tableHeight () {
      const customHeight = this.customHeight

      if (!customHeight) {
        return this.defaulTableHeight
      }

      return customHeight
    },
    // optionsColumnId: {
    //   get () {
    //     return
    //   },
    //   set () {

    //   }
    // },
    listColumnTitle () {
      return (this.bills && this.bills.map(b => b.title)) || []
    },

    isLoading () {
      return this.loading === 1
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
