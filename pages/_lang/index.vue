<template>
  <div class="landing">
    <section class="banner">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ this.$t('landingPage.bannerTitle') }}</h1>
        <div class="image-container">
          <img class="congress-img" :src="congress" />
        </div>
      </div>
    </section>
    <div class="info-cards-section">
      <div class="info-cards-section-wrapper">
        <Row :gutter="30" type="flex" justify="space-around">
          <Col style="margin-bottom: 30px;" span="8" v-for="bill in bills" :key="bill.id">
            <bill-update-card :bill="bill" />
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import congress from '~/assets/img/congress.png'
import BillUpdateCard from '~/components/BillUpdateCard'
import allBillsQuery from '~/apollo/queries/allBills.gql'

export default {
  data () {
    return {
      loading: 0,
      congress
    }
  },
  head () {
    return {
      title: this.$t('site.title.mainTitle'),
      meta: [{ hid: 'description', name: 'description', content: this.$t('site.description.mainDescription') }]
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    }
  },
  components: {
    BillUpdateCard
  },
  apollo: {
    bills: {
      query: allBillsQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale }
      },
      prefetch: true
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';

.banner {
  background-color: #fff;
  border-bottom: 1px solid #eeeeed;
  position: relative;
}

.banner-wrapper {
  height: 300px;
  display: flex;
  justify-content: space-between;
  @extend .pageWrapper-large;

  .banner-title {
    font-size: 2.5em;
    font-weight: 400;
    letter-spacing: 0.05em;
    padding-top: 50px;
  }
}

.image-container {
  display: flex;

  .congress-img {
    margin-top: auto;
    width: 400px;
  }

  @media (max-width: $mediumDeviceWidth) {
    .congress-img {
      width: 300px;
    }
  }
}

.info-cards-section {
  background-color: #f8f8f9;
  padding: 40px 0;

  .info-cards-section-wrapper {
    @extend .pageWrapper-large;
  }
}
</style>
