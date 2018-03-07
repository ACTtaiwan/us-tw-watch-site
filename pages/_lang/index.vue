<template>
  <div class="landing">

    <!-- Banner -->
    <section class="banner" :style="bannerStyle">
      <div class="banner-wrapper" :class="{ tablet: this.isTablet, phone: this.isPhone }">
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

    <!-- Bills Updates -->
    <section class="bills section">
      <div class="section-wrapper">
        <h1 class="section-title">Bill updates</h1>
        <div class="info-cards-section-wrapper">
          <Spinner v-if="isBillUpdateLoading" ></Spinner>
          <Row :gutter="30">
            <Col :span="isPhone ? 24 : isTablet ? 12 : 8" v-for="bill in bills" :key="bill.id">
              <BillCard class="bill-card" :bill="bill" />
            </Col>
          </Row>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section class="articles section">
      <div class="section-wrapper">
        <h1 class="section-title">Articles</h1>
        <div class="info-cards-section-wrapper">
          <Spinner v-if="isArticleUpdateLoading" ></Spinner>
          <Row :gutter="30">
            <Col :span="isPhone ? 24 : isTablet ? 12 : 8" v-for="article in articles" :key="article.id">
              <ArticleCard class="article-card" :article="article" />
            </Col>
          </Row>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// libraries
import _ from 'lodash'
// images
import congress from '~/assets/img/banner-home.png'
import people from '~/assets/img/banner-people.png'
// components
import Spinner from '~/components/Spinner'
import BillCard from '~/components/HomePage/BillCard'
import ArticleCard from '~/components/ArticleCard'
// queriess
import PrefetchBillIdsQuery from '~/apollo/queries/HomePage/PrefetchBillIds'
import BillsQuery from '~/apollo/queries/HomePage/Bills'
import ArticlesQuery from '~/apollo/queries/HomePage/Articles'

export default {
  data () {
    return {
      numberOfBillCards: 6,
      isBillUpdateLoading: true,
      isArticleUpdateLoading: true,
      bills: [],
      billIds: [],
      articles: [],
      congress,
      people
    }
  },
  head () {
    return {
      title: this.$t('site.title.mainTitle'),
      meta: [{ hid: 'description', name: 'description', content: this.$t('site.description.mainDescription') }]
    }
  },
  methods: {
    getLatestActionDate (actions) {
      let latestActionTime = 0
      actions.forEach(action => {
        if (action.datetime > latestActionTime) {
          latestActionTime = action.datetime
        }
      })
      return parseInt(latestActionTime)
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillsQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    getUpdatedBills () {
      this.fetchBills(this.billIds)
        .then(({ data }) => {
          // the returned bill order is not the same as the bill id order provided
          // TODO: move this to graphql server side
          const billsMap = _.keyBy(data.bills, 'id')
          this.bills = this.billIds
            .map(id => billsMap[id])
            .sort((a, b) => this.getLatestActionDate(b.actionsAll) - this.getLatestActionDate(a.actionsAll))
            .filter((bill, index) => index < this.numberOfBillCards)

          this.isBillUpdateLoading = false
        })
        .catch(error => {
          console.log('get bills error', error)
        })
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
    bannerStyle () {
      return `background-image: url("${this.congress}"); background-size: cover;`
    }
  },
  apollo: {
    billIds: {
      query: PrefetchBillIdsQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          lang: this.locale,
          congress: [115]
        }
      },
      update (data) {
        return data.bills[0].prefetchIds
      },
      result (result) {
        if (!result.loading) {
          this.getUpdatedBills()
        }
      }
    },
    articles: {
      query: ArticlesQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          lang: this.locale
        }
      },
      update (data) {
        return _.orderBy(data.articles, article => parseInt(article.publishedAt), ['desc'])
      },
      result (result) {
        if (!result.loading) {
          this.isArticleUpdateLoading = false
        }
      }
    }
  },
  components: {
    BillCard,
    ArticleCard,
    Spinner
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

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
      font-size: 3em;
      font-weight: $twSemiBold;
      line-height: 1.1em;
      padding-top: 50px;
      text-align: left;
      margin-bottom: 20px;
      color: $twWhite;
    }

    .news {
      .news-title {
        font-weight: 400;
        font-size: 1.8em;
        line-height: 1.1em;
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

.banner-wrapper.tablet {
  height: 300px;
  text-align: center;
  justify-content: initial;

  .image-container {
    order: 0;
    margin-right: 50px;
    justify-content: center;

    .front-img {
      width: 260px;
    }
  }

  .text-container {
    order: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .banner-title {
      font-size: 2.4em;
      margin-bottom: 10px;
    }

    .news {
      .news-title {
        font-size: 1.4em;
      }
      .news-content {
        display: none;
      }
    }
  }
}

.banner-wrapper.phone {
  height: 320px;
  flex-direction: column;

  .image-container {
    order: 1;
    margin-right: 0px;
    justify-content: center;

    .front-img {
      width: 240px;
    }
  }

  .text-container {
    order: 0;

    .banner-title {
      font-size: 2.2em;
      margin-bottom: 20px;
      text-align: center;
    }

    .news {
      display: none;
    }
  }
}

.section {
  padding: 40px 0 0 0;

  .section-wrapper {
    @extend .pageWrapper-large;

    .section-title {
      color: $twGrayDark;
      font-size: 1.8em;
      font-weight: $twSemiBold;
      margin-bottom: 20px;
    }
  }

  &:last-child {
    margin-bottom: 40px;
  }
}
</style>
