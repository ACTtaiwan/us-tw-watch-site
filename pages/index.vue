<template>
  <div class="landing">
    <!-- Banner -->
    <section :style="bannerStyle" class="banner">
      <div class="banner-wrapper">
        <div class="image-container">
          <img :src="bannerFgUrl" class="front-img">
        </div>
        <div class="text-container">
          <div class="text-wrapper">
            <h1 class="banner-title">{{ this.$t('landingPage.bannerTitle') }}</h1>
            <p class="banner-content">{{ this.$t('landingPage.bannerContent') }}</p>
            <router-link :to="`/bills`">
              <TwButton label="看法案" color="gray-light" fontSize="14px" lineHeight="22px"/>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Intro -->
    <section class="intro section">
      <div class="section-wrapper">
        <div class="hero-block why">
          <div class="text-area">
            <h1 class="title">為何觀測？</h1>
            <p class="description">走出兩岸對壘窄巷</p>
            <p
              class="content"
            >台灣在國際上的處境艱辛，與各個盟國之間的交往互動更顯重要。然而，在台灣島內卻鮮少看到對於台灣國際關係的報導，主流媒體永遠只報導兩岸關係，似乎台灣的外交困境只能從兩岸尋求解方。但事實是，光以美國為例，從過去到現在提出的法案中有相當大的比例都是在為台灣爭取自由民主以及保障國際空間。是以，從美國國會作為觀測對象，就能知道美國決策圈是如何看待台灣議題以及其態度。長期以來台灣人對於自身的地位常常被鎖在兩岸關係對壘的窄巷中，資訊蓬勃發展的時代，或許我們在這個方面也是時候與國際接軌，看看其他國家怎麼看我們。</p>
          </div>
          <div class="img-area banner-img">
            <img :src="sailUrl">
          </div>
        </div>
      </div>
    </section>

    <!-- Bills -->
    <section class="bills section">
      <div class="section-wrapper">
        <div class="hero-block tw-bill">
          <div class="img-area">
            <img :src="twBillUrl">
          </div>
          <div class="text-area">
            <h1 class="title">台灣相關法案</h1>
            <p
              class="content"
            >台灣和美國之間雖沒有正式的外交關係，但官方和民間長期以來卻保有高度互動，為了管理以及保障這類的互動交流，美國國會長期以來提出許多台灣相關法案。這些法案一旦通過美國國會，即成為美國國內法，約束著美國相關機關與台灣往來等外交政策。如果要了解美國的政策決策者是如何理解看待台灣，就從台灣相關法案開始吧。</p>
            <router-link :to="`/bills`">
              <TwButton label="更多法案" fontSize="14px" lineHeight="22px"/>
            </router-link>
          </div>
        </div>

        <Spinner v-if="isBillUpdateLoading"/>
        <Row :gutter="30">
          <i-col v-for="bill in bills" :key="bill.id" :span="isPhone ? 24 : isTablet ? 12 : 8">
            <BillSimpleCard :bill="bill" class="bill-card"/>
          </i-col>
        </Row>
      </div>
    </section>

    <!-- Memebers -->
    <section class="members section">
      <div class="section-wrapper">
        <div class="hero-block tw-bill">
          <div class="img-area">
            <img :src="twMemberUrl">
          </div>
          <div class="text-area">
            <h1 class="title">挺台議員</h1>
            <p
              class="content"
            >你知道美國國會幾十年來有許多超級挺台的議員嗎？聽過『台灣連線』和『四人幫』嗎？從過去到現在，許多台美人、官方及非官方的組織或個人，在國會不遺餘力地推動台美關係，遊說國會議員挺台，來看看我們精選的超狂挺台議員丟出了哪些超狂挺台法案？或點選『更多議員』查看本屆國會所有成員的挺台檔案！</p>
            <router-link :to="`/members`">
              <TwButton label="更多議員" fontSize="14px" lineHeight="22px"/>
            </router-link>
          </div>
        </div>

        <Spinner v-if="isMemberLoading"/>
        <Row :gutter="30">
          <i-col v-for="member in members" :key="member.id" :span="isPhone ? 24 : isTablet ? 12 : 8">
            <MemberSimpleCard :member="member" :states="states" class="member-card"/>
          </i-col>
        </Row>
      </div>
    </section>

    <!-- Articles -->
    <section class="articles section">
      <div class="section-wrapper">
        <div class="hero-block tw-bill">
          <div class="img-area">
            <img :src="twIssuesUrl">
          </div>
          <div class="text-area">
            <h1 class="title">台美議題</h1>
            <p
              class="content"
            >台美議題時時刻刻都不斷在變化，牽涉到的因素何其之多！美國政治現況、台灣政治現況、美中關係、經貿往來、國防戰略佈局、地緣政治、國際組織等，太多不斷變動的因素時刻牽引著台美關係的發展，請一同關注我們在美國最前緣的觀察分析，為台美議題、台灣相關法案帶來第一手的消息和評論。</p>
            <router-link :to="`/articles`">
              <TwButton label="更多文章" fontSize="14px" lineHeight="22px"/>
            </router-link>
          </div>
        </div>

        <Spinner v-if="isArticleUpdateLoading"/>
        <Row :gutter="30">
          <i-col v-for="article in articles" :key="article.id" :span="isPhone ? 24 : isTablet ? 12 : 8">
            <ArticleCard :article="article" imgNoMargin class="article-card"/>
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

// components
import Spinner from '~/components/Spinner'
import BillSimpleCard from '~/components/BillSimpleCard'
import MemberSimpleCard from '~/components/MemberSimpleCard'
import ArticleCard from '~/components/HomePage/ArticleCard'
import TwButton from '~/components/TwButton'

// queriess
import PrefetchBillIdsQuery from '~/apollo/queries/HomePage/PrefetchBillIds'
import BillsQuery from '~/apollo/queries/HomePage/Bills'
import ArticlesQuery from '~/apollo/queries/HomePage/Articles'
import MembersQuery from '~/apollo/queries/MemberLandingPage/Members'
import StateListQuery from '~/apollo/queries/StateList'

import axios from 'axios'

export default {
  components: {
    BillSimpleCard,
    MemberSimpleCard,
    ArticleCard,
    Spinner,
    TwButton
  },
  data () {
    return {
      numberOfBillCards: 3,
      numberOfArticleCards: 3,
      isBillUpdateLoading: true,
      isMemberLoading: true,
      isArticleUpdateLoading: true,
      bills: [],
      billIds: [],
      members: [],
      memberIds: appConfig.highlightMemberIds,
      articles: [],
      bannerBgUrl: `${appConfig.assets.baseUrl}/banner-home.png`,
      bannerFgUrl: `${appConfig.assets.baseUrl}/banner-people.png`,
      sailUrl: `${appConfig.assets.baseUrl}/sail.png`,
      twBillUrl: `${appConfig.assets.baseUrl}/intro-tw-bill.png`,
      twMemberUrl: `${appConfig.assets.baseUrl}/intro-tw-member.png`,
      twIssuesUrl: `${appConfig.assets.baseUrl}/intro-tw-issues.png`
    }
  },
  head () {
    return {
      title: this.$t('site.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('landingPage.description') },
        { property: 'og:url', content: appConfig.site.url },
        { property: 'og:image', content: appConfig.thumbnail },
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
      return `background-image: url("${this.bannerBgUrl}"); background-size: cover;`
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
          congress: [this.$store.state.currentCongress]
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
    members: {
      query: MembersQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale, ids: this.memberIds }
      },
      update (data) {
        this.isMemberLoading = false
        return data.members
      }
    },
    states: {
      query: StateListQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return { lang: this.locale, stateList: true }
      },
      update (data) {
        return JSON.parse(data.maps[0].states)
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
    flex-direction: column;
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

.section {
  padding: 40px 0;

  &.bills,
  &.articles {
    background-color: #eef2f6;
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

    &.banner-img {
      position: relative;
      padding: 0px 0px 0px 30px;

      img {
        position: absolute;
        bottom: 0;
      }
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
    flex: 6;
  }

  .img-area {
    flex: 1;
    padding-right: 40px;
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

// desktop
@media screen and (min-width: $mediumDeviceWidth) {
}

// tablet
@media screen and (max-width: $mediumDeviceWidth - 1) {
  .banner-wrapper {
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

      .text-wrapper {
        .banner-title {
          font-size: 2.4em;
          margin-top: 40px;
          margin-bottom: 10px;
        }
      }
    }
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
  .hero-block {
    flex-direction: column;

    .text-area {
      order: 1;
    }

    .img-area {
      padding: 0px 25% 30px;
      order: 0;

      &.banner-img {
        padding: 0px 10% 30px;

        img {
          position: relative;
        }
      }
    }
  }

  .banner-wrapper {
    height: 320px;
    flex-direction: column;

    .image-container {
      order: 1;
      margin-right: 0px;
      margin-top: 20px;
      flex-direction: row;
      justify-content: center;

      .front-img {
        height: 100%;
        width: 200px;
      }
    }

    .text-container {
      order: 0;

      .text-wrapper {
        text-align: center;

        .banner-title {
          font-size: 2.2em;
          margin-bottom: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
