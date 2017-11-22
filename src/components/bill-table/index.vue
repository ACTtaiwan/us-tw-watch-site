<template>
    <div>
      {{ optionsColumnId }}
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
    'loading'
  ],

  data () {
    const vm = this

    return {
      showBorder: true,
      showStripe: true,
      showHeader: true,
      tableHeight: 500,
      tableSize: 'large',
      tableColumns: renderTableColumns(vm),
      loadingColumnId: false,
      keywordColumnId: '',
      optionsColumnId: []
      // listColumnId: (this.bills && this.bills.map(b => b.id)) || []
    }
  },

  computed: {
    // optionsColumnId: {
    //   get () {
    //     return
    //   },
    //   set () {

    //   }
    // },
    listColumnId () {
      return (this.bills && this.bills.map(b => b.id)) || []
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
          key: 'id',
          value: this.optionsColumnId,
          keyword: this.keywordColumnId
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
