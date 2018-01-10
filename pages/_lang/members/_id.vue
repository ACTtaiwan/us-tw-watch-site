<template>
  <div v-if="bill">
    <Card id="details">
      <h3 slot="title">{{ bill.title }}</h3>
      <h4>{{ `Congress: ${bill.congress}` }}</h4>
      <h4>{{ `State: ${bill.sponsor.state}` }}</h4>
      <h4>{{ `District: ${bill.sponsor.district}` }}</h4>
      <h4>{{ `Sponsor: ${bill.sponsor.person.firstname} ${bill.sponsor.person.lastname}` }}</h4>
      <h4>
        {{ `Party: ` }}
        <span :style="{ color: this.partyColor }">
          {{ bill.sponsor.party}}
        </span>
      </h4>
    </Card>
    <SponsorsMap
      :mapStyle="mapStyle"
      :sponsors="sponsors"
    />
  </div>
</template>

<script>
import queryBill from '~/apollo/queries/bill'
import { path } from '@/plugins/locale'
import SponsorsMap from '~/components/SponsorsMap'

export default {
  data () {
    const mapStyle = {
      position: 'absolute',
      top: 0,
      left: '300px'
    }

    return {
      mapStyle
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    bill () {
      return this.bills && this.bills[0]
    },
    sponsors () {
      const sponsor = this.bill.sponsor
      const cosponsors = this.bill.cosponsors
      const sponsors = [sponsor].concat(cosponsors)
      return sponsors
    },
    partyColor () {
      const party = this.bill.sponsor.party

      if (party === 'Republican') {
        return '#E53A4C'
      }

      if (party === 'Democrat') {
        return '#2984B8'
      }

      return '#333333'
    }
  },

  apollo: {
    bills: {
      query: queryBill,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          id: this.$route.params.id,
          lang: this.locale
        }
      }
    }
  },

  head () {
    return {
      title: this.bill ? this.bill.title : 'Loading'
    }
  },

  methods: {
    path
  },

  components: {
    SponsorsMap
  }
}
</script>
<style>
#details {
  width: 400px;
  margin-top: 100px;
  margin-left: 50px;
  text-align: left;
}
</style>
