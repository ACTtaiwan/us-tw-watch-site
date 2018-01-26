<template>
  <div class="landing">
    <section class="banner" :style="style">
      <div class="banner-wrapper">
        <div class="image-container" >
          <img class="front-img" :src="people" />
        </div>
        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('landingPage.bannerTitle') }}</h1>
          <div class="news">
            <h1 class="news-title">{{ this.$t('landingPage.newsTitle') }}</h1>
            <p class="news-content">{{ this.$t('landingPage.newsContent') }}</p>
          </div>
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
@import 'assets/css/colors';

.banner {
  background-color: #fff;
  border-bottom: 1px solid #eeeeed;
  position: relative;
}

.banner-wrapper {
  height: 300px;
  display: flex;
  @extend .pageWrapper-large;

  .image-container {
    order: 0;
    display: flex;
    margin-right: 100px;

    .front-img {
      margin-top: auto;
      width: 340px;
    }
  }

  .text-container {
    order: 1;

    .banner-title {
      font-size: 2.4em;
      font-weight: 500;
      padding-top: 50px;
      letter-spacing: 2px;
      text-align: left;
      margin-bottom: 20px;
      color: $twWhite;
    }

    .news {
      .news-title {
        font-weight: 400;
        font-size: 1.8em;
        color: $twWhite;
        letter-spacing: 1px;
        margin-bottom: 5px;
      }

      .news-content {
        color: $twWhite;
        max-width: 350px;
      }
    }
  }
}

@media (max-width: $mediumDeviceWidth) {
  .banner-wrapper {
    height: 300px;
    text-align: center;
    flex-direction: column;
    justify-content: initial;

    .text-container {
      order: 0;

      .banner-title {
        text-align: center;
        padding-top: 50px;
        font-size: 1.6em;
      }

      .news {
        display: none;
      }
    }

    .image-container {
      order: 1;
      margin-right: 0px;
      justify-content: center;

      .front-img {
        width: 250px;
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
