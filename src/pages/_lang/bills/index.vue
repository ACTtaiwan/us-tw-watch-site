<template>
  <div>
      <Select
        v-model="model13"
        filterable
        remote
        :placeholder="placeholder"
        :remote-method="remoteMethod1"
        :loading="loading1">
        <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
    <bill-table
      :bills="bills"
      :loading="loading"
    />
    <cd-map />
  </div>
</template>
<script>
import CdMap from '~/components/cd-map.vue'
import BillTable from '~/components/bill-table'
import allBills from '@/apollo/queries/allBills.gql'

export default {
  head () {
    return {
      title: `${this.$t('title.billsPageTitle')} | ${this.$t('title.siteMainTitle')}`
    }
  },

  data () {
    return {
      loading: 0,
      model13: '',
      loading1: false,
      options1: [],
      model14: [],
      loading2: false,
      options2: [],
      placeholder: '',
      list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
    }
  },

  methods: {
    remoteMethod1 (query) {
      if (query !== '') {
        this.loading1 = true

        setTimeout(() => {
          this.loading1 = false

          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            }
          })

          this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        this.options1 = []
      }
    }
  },

  apollo: {
    $loadingKey: 'loading',
    bills: {
      prefetch: true,
      query: allBills
    }
  },

  components: {
    CdMap,
    BillTable
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
a {
  text-decoration: none;
  color: #3498DB;
}
a:hover {
  border-bottom: 1px solid;
}
</style>
