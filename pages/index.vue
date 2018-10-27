<template>
  <div class="landing">

    <!-- Banner -->
    <section :style="bannerStyle" class="banner">
      <div :class="{ tablet: isTablet, phone: isPhone }" class="banner-wrapper">
        <div class="image-container" >
          <img :src="bannerFg" class="front-img">
        </div>
        <div class="text-container">
          <div class="text-wrapper">
            <h1 class="banner-title">{{ this.$t('landingPage.bannerTitle') }}</h1>
            <p class="banner-content">{{ this.$t('landingPage.bannerContent') }}</p>
            <TwButton label="看法案" color="gray-light" fontSize="14px" lineHeight="22px" />
          </div>
        </div>
      </div>
    </section>

    <!-- Intro -->
    <section class="intro section">
      <div class="section-wrapper">
        <div class="hero-block why">
          <div class="text-area" style="padding-right: 30px;">
            <h1 class="title">為何觀測？</h1>
            <p class="description">走出兩岸對壘窄巷</p>
            <p class="content">台灣在國際上的處境艱辛，與各個盟國之間的交往互動更顯重要。然而，在台灣島內卻鮮少看到對於台灣國際關係的報導，主流媒體永遠只報導兩岸關係，似乎台灣的外交困境只能從兩岸尋求解方。但事實是，光以美國為例，從過去到現在提出的法案中有相當大的比例都是在為台灣爭取自由民主以及保障國際空間。是以，從美國國會作為觀測對象，就能知道美國決策圈是如何看待台灣議題以及其態度。長期以來台灣人對於自身的地位常常被鎖在兩岸關係對壘的窄巷中，資訊蓬勃發展的時代，或許我們在這個方面也是時候與國際接軌，看看其他國家怎麼看我們。</p>
          </div>
          <div class="img-area" style="position: relative;">
            <img
              :src="sail"
              style="position: absolute; bottom: 0;"
              class="twBillImg">
          </div>
        </div>
      </div>
    </section>

    <!-- Bills -->
    <section class="bills section">
      <div class="section-wrapper">
        <div class="hero-block tw-bill">
          <div class="img-area">
            <img
              :src="twBill"
              class="twBillImg">
          </div>
          <div class="text-area">
            <h1 class="title">台灣相關法案</h1>
            <p class="content">台灣和美國之間雖沒有正式的外交關係，但官方和民間長期以來卻保有高度互動，為了管理以及保障這類的互動交流，美國國會長期以來提出許多台灣相關法案。這些法案一旦通過美國國會，即成為美國國內法，約束著美國相關機關與台灣往來等外交政策。如果要了解美國的政策決策者是如何理解看待台灣，就從台灣相關法案開始吧。</p>
            <TwButton label="更多法案" fontSize="14px" lineHeight="22px" />
          </div>

        </div>

        <Spinner v-if="isBillUpdateLoading" />
        <Row :gutter="30">
          <i-col
            v-for="bill in bills"
            :key="bill.id"
            :span="isPhone ? 24 : isTablet ? 12 : 8">
            <BillCard
              :bill="bill"
              class="bill-card" />
          </i-col>
        </Row>
      </div>
    </section>

    <!-- Memebers -->
    <section class="members section">
      <div class="section-wrapper">
        <div class="hero-block tw-bill">
          <div class="img-area">
            <img
              :src="twMember"
              class="twBillImg">
          </div>
          <div class="text-area">
            <h1 class="title">挺台議員</h1>
            <p class="content">台灣和美國之間雖沒有正式的外交關係，但官方和民間長期以來卻保有高度互動，為了管理以及保障這類的互動交流，美國國會長期以來提出許多台灣相關法案。這些法案一旦通過美國國會，即成為美國國內法，約束著美國相關機關與台灣往來等外交政策。如果要了解美國的政策決策者是如何理解看待台灣，就從台灣相關法案開始吧。</p>
            <TwButton label="更多議員" fontSize="14px" lineHeight="22px" />
          </div>

        </div>

        <Spinner v-if="isBillUpdateLoading" />
        <Row :gutter="30">
          <i-col
            v-for="bill in bills"
            :key="bill.id"
            :span="isPhone ? 24 : isTablet ? 12 : 8">
            <BillCard
              :bill="bill"
              class="bill-card" />
          </i-col>
        </Row>
      </div>
    </section>

    <!-- Articles -->
    <section class="articles section">
      <div class="section-wrapper">
        <div class="hero-block tw-bill">
          <div class="img-area">
            <img
              :src="twBill"
              class="twBillImg">
          </div>
          <div class="text-area">
            <h1 class="title">台美議題</h1>
            <p class="content">台灣和美國之間雖沒有正式的外交關係，但官方和民間長期以來卻保有高度互動，為了管理以及保障這類的互動交流，美國國會長期以來提出許多台灣相關法案。這些法案一旦通過美國國會，即成為美國國內法，約束著美國相關機關與台灣往來等外交政策。如果要了解美國的政策決策者是如何理解看待台灣，就從台灣相關法案開始吧。</p>
            <TwButton label="更多新聞" fontSize="14px" lineHeight="22px" />
          </div>

        </div>

        <Spinner v-if="isArticleUpdateLoading" />
        <Row :gutter="30">
          <i-col
            v-for="article in articles"
            :key="article.id"
            :span="isPhone ? 24 : isTablet ? 12 : 8">
            <ArticleCard
              :article="article"
              imgNoMargin
              class="article-card" />
          </i-col>
        </Row>
      </div>
    </section>

  </div>
</template>

<script>
// libraries
import _ from 'lodash'
import appConfig from '~/config/app.json'
// images
import bannerBg from '~/assets/img/banner-home.png'
import bannerFg from '~/assets/img/banner-people.png'

import sail from '~/assets/img/sail.png'
import twBill from '~/assets/img/intro-tw-bill.png'
import twMember from '~/assets/img/intro-tw-member.png'

// components
import Spinner from '~/components/Spinner'
import BillCard from '~/components/HomePage/BillCard'
import ArticleCard from '~/components/HomePage/ArticleCard'
import Subscription from '~/components/Subscription'
import Donorbox from '~/components/Donorbox'
import TwButton from '~/components/TwButton'
import ActionCard from '~/components/ActionCard'
// queriess
import PrefetchBillIdsQuery from '~/apollo/queries/HomePage/PrefetchBillIds'
import BillsQuery from '~/apollo/queries/HomePage/Bills'
import ArticlesQuery from '~/apollo/queries/HomePage/Articles'

import axios from 'axios'

export default {
  components: {
    BillCard,
    ArticleCard,
    Spinner,
    Subscription,
    Donorbox,
    TwButton,
    ActionCard
  },
  data (context) {
    let urlQuery = context.$route.query

    return {
      numberOfBillCards: 3,
      numberOfArticleCards: 3,
      isBillUpdateLoading: true,
      isArticleUpdateLoading: true,
      bills: [],
      billIds: [],
      articles: [],
      bannerBg,
      bannerFg,
      twBill,
      twMember,
      sail,
      showSubscription: urlQuery.subscribe === 'true' ? true : false,
      showDonorbox: urlQuery.donate === 'true' ? true : false
    }
  },
  head () {
    return {
      title: this.$t('site.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('landingPage.description') },
        { property: 'og:url', content: appConfig.site.url },
        { property: 'og:title', content: this.$t('landingPage.title') },
        { property: 'og:description', content: this.$t('landingPage.description') }
      ]
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
      return `background-image: url("${this.bannerBg}"); background-size: cover;`
    }
  },
  methods: {
    getLatestActionDate (actions) {
      let latestActionTime = 0
      if (actions && actions.length > 0) {
        actions.forEach(action => {
          if (action.datetime > latestActionTime) {
            latestActionTime = action.datetime
          }
        })
      }
      return parseInt(latestActionTime)
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillsQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    getUpdatedBills () {
      this.fetchBills(this.billIds.slice(0, this.numberOfBillCards))
        .then(({ data }) => {
          // the returned bill order is not the same as the bill id order provided
          // TODO: move this to graphql server side

          // const billsMap = _.keyBy(data.bills, 'id')
          // this.bills = this.billIds
          //   .map(id => billsMap[id])
          //   .filter(x => !!x.actionsAll)
          //   .sort(
          //     (a, b) =>
          //       this.getLatestActionDate(b.actionsAll) - this.getLatestActionDate(a.actionsAll)
          //   )
          //   .filter((bill, index) => index < this.numberOfBillCards)

          this.bills = data.bills

          this.isBillUpdateLoading = false
        })
        .catch(error => {
          console.log('get bills error', error)
        })
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
          list: appConfig.articleList
        }
      },
      update (data) {
        return _.orderBy(data.articles, article => parseInt(article.date), ['desc']).slice(
          0,
          this.numberOfArticleCards
        )
      },
      result (result) {
        if (!result.loading) {
          this.isArticleUpdateLoading = false
        }
      }
    }
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
    display: flex;
    align-items: center;

    .text-wrapper {
      .banner-title {
        @extend .displayFont;
        font-size: 3em;
        font-weight: $twLight;
        line-height: 1em;
        text-align: left;
        margin-bottom: 20px;
        color: $twWhite;
      }

      .banner-content {
        font-weight: $twMedium;
        font-size: 18px;
        line-height: 1em;
        color: $twWhite;
        letter-spacing: 2px;
        margin-bottom: 20px;
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
  padding: 40px 0;

  &.bills,
  &.articles {
    background-color: #f0f0f0;
  }

  .section-wrapper {
    @extend .pageWrapper-large;

    .section-title {
      color: $twGrayDark;
      font-size: 1.8em;
      font-weight: $twSemiBold;
      margin-bottom: 20px;
    }
  }

  .section-wrapper-medium {
    @extend .pageWrapper-medium;
  }

  &:last-child {
    margin-bottom: 40px;
  }
}

.hero-block {
  display: flex;
  justify-content: space-between;
  margin: 10px auto 50px;
  padding: 30px 0;

  .text-area {
    .title {
      @extend .displayFont;
      font-size: 30px;
      font-weight: $twMedium;
      text-align: left;
      margin-bottom: 10px;
      color: $twBlack;
    }

    .description {
      @extend .textFont;
      font-size: 20px;
      font-weight: $twSemiBold;
      letter-spacing: 1px;
      text-align: left;
      margin-bottom: 30px;
      color: $twIndigoLight;
    }

    .content {
      @extend .textFont;
      font-size: 16px;
      line-height: 26px;
      font-weight: $twRegular;
      text-align: left;
      margin-bottom: 30px;
      color: $twBlack;
    }
  }

  .img-area {
    img {
      width: 100%;
    }
  }
}

.why {
  .text-area {
    flex: 2;
  }

  .img-area {
    flex: 1;
  }
}

.tw-bill {
  .text-area {
    flex: 4;
  }

  .img-area {
    flex: 1;
    padding-right: 100px;
  }
}

.more-btn {
  margin: 20px auto;
  width: 200px;
  height: 50px;
}

.actions-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
