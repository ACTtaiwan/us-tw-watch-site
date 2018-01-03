<template>
  <div v-if="bill" class="bill-page">
    <section class="banner">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ bill.title }} <Button class="pdfBtn" shape="circle" icon="ios-paper-outline" @click="openPdf"></Button></h1>
      </div>
    </section>
    <div class="bill-meta-section">
      <div class="bill-meta-section-wrapper">
        <div class="meta-item">
          <h1 class="item-title">Congress</h1>
          <p class="item-value">{{ bill.congress }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Bill code</h1>
          <p class="item-value">{{ `${bill.billType.display} ${bill.billNumber}` }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Introduced</h1>
          <p class="item-value">{{ bill.introducedDate }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Sponsor</h1>
          <p class="item-value">{{ `${bill.sponsor.person.firstname} ${bill.sponsor.person.lastname} (${bill.sponsor.state}, ${bill.sponsor.party})` }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Co-Sponsors</h1>
          <div class="cosponsors-block">
            <Tag v-for="cosponsor in bill.cosponsors"
              :key="cosponsor.id"
              :name="cosponsor.id"
              :color="{Republican: 'red', Democrat: 'blue'}[cosponsor.party]"
              type="dot">{{ `${cosponsor.person.firstname} ${cosponsor.person.lastname} (${cosponsor.state})` }}</Tag>
          </div>
        </div>
      </div>
    </div>
    <div class="map-section">
      <div class="map-section-wrapper">
        <cd-map :mapStyle="mapStyle" :sponsors="sponsors"/>
      </div>
    </div>
  </div>
</template>

<script>
import queryBill from '~/apollo/queries/bill'
import { path } from '@/plugins/locale'
import CdMap from '~/components/cd-map'

export default {
  data () {
    const mapStyle = {
      position: 'absolute',
      top: 0,
      left: '300px'
    }
    return {
      formLabelWidth: 100,
      mapStyle
    }
  },
  computed: {
    bill () {
      console.log('the bill', this.bills)
      return this.bills && this.bills[0]
    },
    pdfUrl () {
      let url = ''
      if (this.bill && this.bill.versions) {
        let numOfVersions = this.bill.versions.length
        let latestVersion = this.bill.versions[numOfVersions - 1]
        let bucketKey = latestVersion.documents.filter(doc => doc.contentType === 'pdf')[0].bucketKey
        url = `https://s3.amazonaws.com/volunteer.bills/${bucketKey}`
      }
      console.log('url', url)
      return url
    },
    sponsors () {
      const sponsor = this.bill.sponsor
      const cosponsors = this.bill.cosponsors

      // const showDistrict = sponsor.district
      // const fakeCosponsors = [
      //   {
      //     id: '1',
      //     roleType: 'senator',
      //     party: 'Democrat',
      //     state: 'TX',
      //     district: showDistrict && 10,
      //     person: {
      //       lastname: 'Manchin',
      //       firstname: 'Joe'
      //     }
      //   },
      //   {
      //     id: '2',
      //     roleType: 'representative',
      //     party: 'Republican',
      //     state: 'CA',
      //     district: showDistrict && 42,
      //     person: {
      //       lastname: 'Calvert',
      //       firstname: 'Ken'
      //     }
      //   },
      //   {
      //     id: '3',
      //     roleType: 'senator',
      //     party: 'Democrat',
      //     state: 'FL',
      //     district: showDistrict && 3,
      //     person: {
      //       lastname: 'Rubio',
      //       firstname: 'Marco'
      //     }
      //   }
      // ]
      // const onlyOneSponsor = Math.random() >= 0.5
      // const sponsors = onlyOneSponsor ? mainSponsorArray : mainSponsorArray.concat(cosponsors)
      const hasCosponsors = cosponsors && cosponsors.length > 0
      const mainSponsorArray = [sponsor]
      const sponsors = hasCosponsors ? mainSponsorArray.concat(cosponsors) : mainSponsorArray

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
    path,
    openPdf () {
      window.open(this.pdfUrl, '_blank')
    }
  },

  components: {
    CdMap
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/css/app';

#details {
  width: 400px;
  margin-top: 100px;
  margin-left: 50px;
  text-align: left;
}

.banner {
  background-color: #fff;
  border-bottom: 1px solid #eeeeed;
  position: relative;

  .banner-wrapper {
    min-height: 200px;
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    align-items: center;
    @extend .pageWrapper-large;

    .banner-title {
      font-size: 2.5em;
      font-weight: 400;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
    }

    .pdfBtn {
      margin-left: 10px;
    }
  }
}

.bill-meta-section {
  background-color: #f8f8f9;
  padding: 40px 0;
  text-align: left;

  .bill-meta-section-wrapper {
    @extend .pageWrapper-large;
  }

  .meta-item {
    display: flex;
    margin-bottom: 10px;

    .item-title {
      font-weight: 600;
      font-size: 1.5em;
      width: 130px;
    }

    .item-value {
      font-size: 1.5em;
      font-weight: 400;
    }
  }

  .cosponsors-block {
    flex: 1;
  }
}

.map-section {
  background-color: #f8f8f9;
  padding: 0 0 40px 0;

  .map-section-wrapper {
    @extend .pageWrapper-large;
  }
}
</style>
