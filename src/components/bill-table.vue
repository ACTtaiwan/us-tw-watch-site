<template>
    <div>
      <Table
        :columns="billSchema"
        :data="bills"
        :loading="isLoading"
      >
      </Table>
    </div>
</template>
<script>
export default {
  // beforeCreate () {
  //   this.$store.dispatch('getBills')
  // },

  props: [
    'bills',
    'loading'
  ],

  computed: {
    isLoading () {
      return this.loading === 1
    },

    // bills () {
    //   return this.$store.state.bills
    // },

    billSchema () {
      const schema = [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: 'Title',
          key: 'title'
        },
        {
          title: 'Congress',
          key: 'congress'
        }
      ]

      return schema
    }
  }
}
</script>
