<template>
  <div class="bill-page">

    <!-- Bill -->
    <section v-if="bill" class="bill-section" :class="{ phone: this.isPhone }">
      <div class="bill-section-wrapper">

        <div class="bill-meta">
          <span class="bill-code">{{ bill.billCode}}</span>
          <span class="bill-type">{{ this.billType }}</span>
        </div>
        <h1 class="bill-title">{{ bill.title }}</h1>


        <Row>
          <Col :span="this.isTablet || this.isPhone ? 24 : 18"  class="overview-block" :class="{ mobile: this.isTablet || this.isPhone }">
            <!-- Overview -->
            <div class="section-block">
              <h1 class="section-title">Overview</h1>
              <Row>
                <Col :span="24" class="info-block">
                  <!-- Sponsor -->
                  <!-- <div class="bill-sponsor">
                    <img class="avatar" :src="defaultAvatar" :style="style" />
                    <span class="name">{{ bill.sponsor.title }} {{ bill.sponsor.person.firstname }} {{ bill.sponsor.person.lastname }}</span>
                    <span class="area">{{ this.area }} </span>
                  </div> -->
                </Col>

              </Row>
            </div>
            <!-- Support Map -->
            <div class="section-block">
              <h1 class="section-title">Cosponsor Map</h1>
              <SponsorsMap
                v-if="isMapDataLoaded"
                :sponsors="sponsors"
                :usMap="usMap"
                :stateToFips="stateToFips"
                :fipsToState="fipsToState"
                :congressMap="congressMap"/>
            </div>
          </Col>


          <!-- Summary -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="summary-block">
            <div class="section-block">
              <h1 class="section-title">Actions</h1>
              <Timeline>
                <TimelineItem>
                  <p class="time">1976年</p>
                  <p class="content">Apple I 问世</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">1984年</p>
                  <p class="content">发布 Macintosh</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2007年</p>
                  <p class="content">发布 iPhone</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2010年</p>
                  <p class="content">发布 iPad</p>
                </TimelineItem>
                <TimelineItem>
                  <p class="time">2011年10月5日</p>
                  <p class="content">史蒂夫·乔布斯去世</p>
                </TimelineItem>
              </Timeline>
            </div>
          </Col>

        </Row>

      </div>
    </section>



    <div v-if="bill" class="bill-meta-section">
      <div class="bill-meta-section-wrapper">
        <div class="meta-item">
          <h1 class="item-title">Congress</h1>
          <p class="item-value">{{ bill.congress }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Bill code</h1>
          <p class="item-value">{{ bill.billCode }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Introduced</h1>
          <p class="item-value">{{ bill.introducedDate | localTime }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Sponsor</h1>
          <p class="item-value">{{ `${bill.sponsor.person.firstname} ${bill.sponsor.person.lastname} (${bill.sponsor.state}, ${bill.sponsor.party})` }}</p>
        </div>
        <div class="meta-item">
          <h1 class="item-title">Co-Sponsors</h1>
          <div class="cosponsors-block">
            <Tag v-for="cosponsor in bill.cosponsors"
              :key="cosponsor.role.id"
              :name="cosponsor.role.id"
              :color="{Republican: 'red', Democrat: 'blue'}[cosponsor.role.party]"
              type="dot">{{ `${cosponsor.role.person.firstname} ${cosponsor.role.person.lastname} (${cosponsor.role.state})` }}</Tag>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import billsQuery from '~/apollo/queries/bills'
import queryMapUtils from '~/apollo/queries/mapUtils'
import queryCdMap from '~/apollo/queries/cdMap'

import { path } from '@/plugins/locale'
import SponsorsMap from '~/components/SponsorsMap'

export default {
  data () {
    return {
      formLabelWidth: 100
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    },
    isMapDataLoaded () {
      let loaded = false
      if (this.mapUtils && this.cdMap) {
        loaded = true
      }
      return loaded
    },
    usMap () {
      return JSON.parse(this.mapUtils.usMap)
    },
    stateToFips () {
      return JSON.parse(this.mapUtils.stateToFips)
    },
    fipsToState () {
      return JSON.parse(this.mapUtils.fipsToState)
    },
    congressMap () {
      return JSON.parse(this.cdMap)
    },
    // pdfUrl () {
    //   let url = ''
    //   if (this.bill && this.bill.versions) {
    //     let numOfVersions = this.bill.versions.length
    //     let latestVersion = this.bill.versions[numOfVersions - 1]
    //     let bucketKey = latestVersion.documents.filter(doc => doc.contentType === 'pdf')[0].bucketKey
    //     url = `https://s3.amazonaws.com/volunteer.bills/${bucketKey}`
    //   }
    //   console.log('url', url)
    //   return url
    // },
    billType () {
      return {
        s: 'Bill',
        hr: 'Bill',
        hconres: 'Concurrent Resolution',
        sconres: 'Concurrent Resolution',
        hres: 'Resolution',
        sres: 'Resolution',
        hjres: 'Joint Resolution',
        sjres: 'Joint Resolution'
      }[this.bill.billType.code]
    },
    sponsors () {
      const sponsor = this.bill.sponsor
      const cosponsors = this.bill.cosponsors
      const hasCosponsors = cosponsors && cosponsors.length > 0
      const mainSponsorArray = [sponsor]
      const sponsors = hasCosponsors
        ? mainSponsorArray.concat(cosponsors.map(cosponsor => cosponsor.role))
        : mainSponsorArray
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
    bill: {
      query: billsQuery,
      fetchPolicy: 'cache-and-network',
      // Add prefetch for SSR
      // https://github.com/Akryum/vue-apollo#server-side-rendering
      prefetch: ({ route, app }) => ({
        ids: [route.params.id],
        lang: app.store.state.locale
      }),
      variables () {
        return {
          ids: [this.$route.params.id],
          lang: this.locale
        }
      },
      update (data) {
        return data.bills[0]
      }
    },
    mapUtils: {
      query: queryMapUtils,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          lang: this.locale
        }
      },
      update (data) {
        return data.maps[0]
      }
    },
    cdMap: {
      query: queryCdMap,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          congress: 115,
          lang: this.locale
        }
      },
      update (data) {
        return data.maps[0].cdMap
      }
    }
  },

  head () {
    return {
      title: this.bill ? this.bill.title : 'Loading',
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: this.bill ? this.bill.id : 'Loading'
        }
      ]
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

<style lang="scss">
.ivu-row {
  position: inherit;
}
</style>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.bill-section {
  padding: 40px 0;

  &.phone {
    .section-block {
      margin-left: calc(15px * -1);
      margin-right: calc(15px * -1);
      border-radius: 0px;
    }
  }

  .bill-section-wrapper {
    @extend .pageWrapper-large;
  }
}

.bill-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .bill-code {
    font-size: 1.1em;
    font-weight: $twSemiBold;
    color: $twWhite;
    background: $twGrayLight;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;
  }
  .bill-type {
    font-size: 1.1em;
    font-weight: $twSemiBold;
    color: $twWhite;
    background: $twGrayLight;
    border-radius: 10px;
    padding: 1px 8px;
  }
}

.bill-title {
  font-size: 1.8em;
  font-weight: $twSemiBold;
  color: $twGrayDark;
  margin-bottom: 20px;
}

.section-block {
  position: inherit;
  background: $twWhite;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: box-shadow;
  margin-bottom: 20px;

  .section-title {
    font-weight: $twSemiBold;
    color: $twGrayDark;
    font-size: 1.4em;
    margin-bottom: 20px;
  }
}

.overview-block {
  padding-right: 40px;
  position: inherit;

  &.mobile {
    padding-right: 0px;
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
</style>
