<template>
  <div v-if="bill">
    <h3>{{ `Title: ${bill.title}` }}</h3>
    <h3>{{ `Congress: ${bill.congress}` }}</h3>
    <h3>{{ `State: ${bill.sponsor.state}` }}</h3>
    <h3>{{ `District: ${bill.sponsor.district}` }}</h3>
    <h3>{{ `Sponsor: ${bill.sponsor.person.firstname} ${bill.sponsor.person.lastname}` }}</h3>
    <h3>
      {{ `Party: ` }}
      <span :style="{ color: this.partyColor }">
        {{ bill.sponsor.party}}
      </span>
    </h3>
    <cd-map
      :sponsors="sponsors"
    />
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

    sponsors () {
      const sponsor = this.bill.sponsor

      const showDistrict = sponsor.district

      const cosponsors = [
        {
          id: '1',
          roleType: 'senator',
          party: 'Democrat',
          state: 'TX',
          district: showDistrict && 10,
          person: {
            lastname: 'Manchin',
            firstname: 'Joe'
          }
        },
        {
          id: '2',
          roleType: 'representative',
          party: 'Republican',
          state: 'CA',
          district: showDistrict && 42,
          person: {
            lastname: 'Calvert',
            firstname: 'Ken'
          }
        },
        {
          id: '3',
          roleType: 'senator',
          party: 'Democrat',
          state: 'FL',
          district: showDistrict && 3,
          person: {
            lastname: 'Rubio',
            firstname: 'Marco'
          }
        }
      ]

      const onlyOneSponsor = Math.random() >= 0.5
      const mainSponsorArray = [sponsor]
      const sponsors = onlyOneSponsor ? mainSponsorArray : mainSponsorArray.concat(cosponsors)

      return sponsors
    },

    partyColor () {
      const party = this.bill.sponsor.party

      if (party === 'Republican') {
        return 'red'
      }

      if (party === 'Democrat') {
        return 'blue'
      }

      return 'gray'
    }
  },

  apollo: {
    bills: {
      query: queryBill,
      fetchPolicy: 'network-only',
      variables () {
        return { id: this.$route.params.id }
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
    CdMap
  }
}
</script>
