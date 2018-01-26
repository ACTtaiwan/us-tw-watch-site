<template>
  <div class="landing">
    <section class="banner" :style="style">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ this.$t('landingPage.bannerTitle') }}</h1>
        <!-- <h1 class="banner-title">115屆法案全面上線！</h1> -->
        <p></p>
        <div class="image-container" >
          <img class="front-img" :src="people" />
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
import congress from '~/assets/img/banner-home.png'
import people from '~/assets/img/banner-people.png'
import BillUpdateCard from '~/components/BillUpdateCard'
import allBillsQuery from '~/apollo/queries/allBills.gql'

export default {
  data () {
    return {
      loading: 0,
      congress,
      people,
      style: `background-image: url("${congress}"); background-size: cover;`
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
    order: 0;
    font-size: 2em;
    font-weight: 400;
    padding-top: 50px;
    text-align: left;
    color: #fff;
  }

  .image-container {
    order: 1;
    display: flex;

    .front-img {
      margin-top: auto;
      width: 380px;
    }
  }
}

@media (max-width: $mediumDeviceWidth) {
  .banner-wrapper {
    height: 400px;
    text-align: center;
    flex-direction: column;
    justify-content: initial;

    .banner-title {
      text-align: center;
      padding-top: 50px;
    }

    .image-container {
      justify-content: center;

      .front-img {
        width: 300px;
      }
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
