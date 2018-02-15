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
          <Col :span="this.isTablet || this.isPhone ? 24 : 18"  class="main-block" :class="{ mobile: this.isTablet || this.isPhone }">
            <!-- Overview -->
            <BillOverviewCard :bill="this.bill"></BillOverviewCard>
            <!-- Summary -->
            <BillSummaryCard v-if="this.bill.summary.paragraphs" :bill="this.bill"></BillSummaryCard>
            <!-- Support Map -->
            <BillSponsorsMapCard :bill="this.bill"></BillSponsorsMapCard>
          </Col>


          <!-- Summary -->
          <Col :span="this.isTablet || this.isPhone ? 24 : 6" class="detail-block">
            <div class="section-block">
              <h1 class="section-title">Actions</h1>
              <!-- <Timeline>
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
              </Timeline> -->
            </div>
          </Col>
        </Row>
      </div>
    </section>



  </div>
</template>

<script>
import BillDetailPageQuery from '~/apollo/queries/BillDetailPage'
import BillOverviewCard from '~/components/BillOverviewCard'
import BillSummaryCard from '~/components/BillSummaryCard'
import BillSponsorsMapCard from '~/components/BillSponsorsMapCard'

export default {
  data () {
    return {}
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
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
    }
  },

  apollo: {
    bill: {
      query: BillDetailPageQuery,
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
  components: {
    BillOverviewCard,
    BillSummaryCard,
    BillSponsorsMapCard
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
  font-weight: $twMedium;
  color: $twGrayDark;
  margin-bottom: 20px;
}

.main-block {
  padding-right: 40px;
  position: inherit;

  &.mobile {
    padding-right: 0px;
  }
}
</style>
