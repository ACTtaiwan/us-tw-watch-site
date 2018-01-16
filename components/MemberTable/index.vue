<template>
  <Table class="members-table"
    :columns="tableColumns"
    :data="filteredMembers"
    :loading="loading === 1"
  />
</template>

<script>
import columnRenderer from './columnRenderer'

export default {
  props: ['members', 'loading'],
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
    filteredMembers () {
      const members = this.members

      if (!members) {
        return []
      }

      const filters = [
        members,
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

.members-table {
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

  .member-link {
    font-weight: 700;
    color: $strongTextLinkColor;

    &:hover {
      color: $normalTextLinkColor;
    }
  }
}

.name-col {
  font-weight: 700;
  color: $strongTextLinkColor;
}
</style>
