<template>
    <div>
      <Table
        :columns="billSchema"
        :data="bills"
        :loading="loading"
      >
      </Table>
    </div>
</template>
<script>
export default {
  beforeCreate () {
    this.$store.dispatch('getBills')
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },

    bills () {
      return this.$store.state.bills
    },

    billSchema () {
      const schema = [
        {
          title: 'Bill',
          key: 'billNumber'
        },
        {
          title: 'Chamber',
          key: 'chamber'
        },
        {
          title: 'LastUpdated',
          key: 'lastUpdated'
        },
        {
          title: 'Sponsor',
          key: 'sponsor'
        },
        {
          title: 'Congress',
          key: 'congress'
        },
        {
          title: 'Title',
          key: 'title'
        }
      ]

      return schema
    }
  }
}
</script>
