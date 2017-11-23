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
    <Row :gutter="30" type="flex" justify="space-around">
      <Col style="margin-bottom: 30px;" span="8" v-for="bill in bills" :key="bill.id">
        <bill-card :bill="bill" />
      </Col>
    </Row>
  </div>
</template>

<script>
import congress from '@/assets/img/congress.png'
import BillCard from '@/components/bill-card'
import queryAllBills from '@/apollo/queries/allBills.gql'

export default {
  data () {
    return {
      bills: [],
      loading: 0,
      congress
    }
  },

  head () {
    return {
      title: this.$t('title.siteMainTitle')
    }
  },

  components: {
    BillCard
  },

  apollo: {
    $loadingKey: 'loading',
    bills: {
      query: queryAllBills,
      fetchPolicy: 'network-only'
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/css/app';

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
</style>
