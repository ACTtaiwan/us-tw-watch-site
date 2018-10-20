<template>
  <div class="landing">

    <!-- Banner -->
    <section :style="bannerStyle" class="banner">
      <div :class="{ tablet: isTablet, phone: isPhone }" class="banner-wrapper">
        <div class="image-container" >
          <img :src="people" class="front-img">
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
        <h1 class="section-title">{{ $t('landingPage.introSection.title') }}</h1>
        <div class="info-cards-section-wrapper">
          <h3 class="intro-text">{{ $t('landingPage.introSection.text') }}</h3>
        </div>
        <div class="actions-wrapper">
          <ActionCard
            :card="actionCardSubscribe"
            :showImage="true"
            :showTitle="true"
            :showSubtitle="true"
            @press="showSubscription = true"/>
          <router-link :to="`/bills`">
            <ActionCard
              :card="actionCardTakeAction"
              :showImage="true"
              :showTitle="true"
              :showSubtitle="true"/>
          </router-link>
          <ActionCard
            :card="actionCardDonate"
            :showImage="true"
            :showTitle="true"
            :showSubtitle="true"
            @press="showDonorbox = true"/>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section class="articles section">
      <div class="section-wrapper">
        <h1 class="section-title">{{ $t('landingPage.articleSection.title') }}</h1>
        <div class="info-cards-section-wrapper">
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
        <router-link :to="`/articles`">
          <div class="more-btn">
            <TwButton label="More Articles" color="gray" fontSize="1.3em" width="100%" height="100%"/>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Bills Updates -->
    <section class="bills section">
      <div class="section-wrapper">
        <h1 class="section-title">Bill updates</h1>
        <div class="info-cards-section-wrapper">
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
        <router-link :to="`/bills`">
          <div class="more-btn">
            <TwButton label="More Bills" color="gray" fontSize="1.3em" width="100%" height="100%"/>
          </div>
        </router-link>
      </div>
    </section>

  </div>
</template>

<script>
// libraries
import _ from 'lodash'
import appConfig from '~/config/app.json'
// images
import congress from '~/assets/img/banner-home.png'
import people from '~/assets/img/banner-people.png'
import actionImgSubscribe from '~/assets/img/keep-posted.svg'
import actionImgTakeAction from '~/assets/img/take-action.svg'
import actionImgSupportAct from '~/assets/img/support-act.svg'
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
      numberOfBillCards: 6,
      numberOfArticleCards: 6,
      isBillUpdateLoading: true,
      isArticleUpdateLoading: true,
      bills: [],
      billIds: [],
      articles: [],
      congress,
      people,
      showSubscription: urlQuery.subscribe === 'true' ? true : false,
      showDonorbox: urlQuery.donate === 'true' ? true : false,
      actionCardSubscribe: {
        imageUrl: actionImgSubscribe,
        title: this.$t('landingPage.actionCards.subscribe.title'),
        subtitle: this.$t('landingPage.actionCards.subscribe.subtitle')
      },
      actionCardTakeAction: {
        imageUrl: actionImgTakeAction,
        title: this.$t('landingPage.actionCards.takeAction.title'),
        subtitle: this.$t('landingPage.actionCards.takeAction.subtitle')
      },
      actionCardDonate: {
        imageUrl: actionImgSupportAct,
        title: this.$t('landingPage.actionCards.supportAct.title'),
        subtitle: this.$t('landingPage.actionCards.supportAct.subtitle')
      }
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
      return `background-image: url("${this.congress}"); background-size: cover;`
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
