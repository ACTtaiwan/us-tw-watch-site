<template>
  <div v-if="bill">
    <h3>{{ `Congress: ${bill.congress}` }}</h3>
    <h3>{{ `State: ${bill.sponsor.state}` }}</h3>
    <h3>{{ `District: ${bill.sponsor.district}` }}</h3>
    <h3>{{ `Sponsor: ${bill.sponsor.person.firstname} ${bill.sponsor.person.lastname}` }}</h3>
    <h3>
      {{ `Party: ` }}
      <span :style="{ color: this.highlightColor }">
        {{ bill.sponsor.party}}
      </span>
    </h3>
    <p><nuxt-link :to="path(this, '/bills')">{{ `< Back to Bills` }}</nuxt-link></p>
    <nuxt-link class="logo" :to="path(this, '/')" />
    <cd-map :state="bill.sponsor.state" :district="bill.sponsor.district" :highlightColor="this.highlightColor" />
  </div>
</template>

<script>
import queryBill from '~/apollo/queries/bill'
import { path } from '@/plugins/locale'
import CdMap from '~/components/cd-map'

export default {
  computed: {
    bill () {
      return this.bills && this.bills[0]
    },

    highlightColor () {
      const party = this.bill.sponsor.party

      if (party === 'Republican') {
        return 'red'
      }

      return 'blue'
    }
  },

  apollo: {
    bills: {
      query: queryBill,
      prefetch: ({ route }) => {
        return { id: route.params.id }
      },
      variables () {
        return { id: this.$route.params.id }
      }
    }
  },

  head () {
    return {
      title: (this.bill ? this.bill.title : 'Loading')
    }
  },

  methods: {
    path
  },

  components: {
    CdMap
  }
}
</script>
