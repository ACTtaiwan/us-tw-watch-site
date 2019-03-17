<template>
  <div class="article-page">
    <!-- Banner -->
    <!-- <section :style="bannerStyle" class="banner">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('aritclesPage.bannerTitle') }}</h1>
        </div>
        <div class="image-container" >
          <img :src="bannerBills" class="front-img">
        </div>
      </div>
    </section> -->

    <!-- Carousel -->
    <Carousel
      :autoplaySpeed="5000"
      v-model="carouselPage"
      autoplay
      trigger="click"
      arrow="hover"
      dots="outside">
      <CarouselItem v-for="article in bannerArticles" :key="article.id">
        <ArticleBannerCard :article="article" class="article-banner-card"/>
      </CarouselItem>
    </Carousel>

    <!-- Article cards -->
    <section id="join" class="section">
      <div class="section-wrapper">
        <h1 class="section-title">Articles</h1>
        <div class="info-cards-section-wrapper">
          <Spinner v-if="isArticleUpdateLoading" />
          <Row :gutter="30" type="flex">
            <i-col
              :span="isPhone ? 24 : isTablet ? 12 : 8">
              <ArticleCard
                v-for="article in articlesOfCol(0)"
                :key="article.id"
                :article="article"
                showSubtitle
                showAuthor
                showDate
                showIntro
                imgNoMargin
                class="article-card" />
            </i-col>
            <i-col
              v-if="!isPhone"
              :span="isTablet ? 12 : 8">
              <ArticleCard
                v-for="article in articlesOfCol(1)"
                :key="article.id"
                :article="article"
                showSubtitle
                showAuthor
                showDate
                showIntro
                imgNoMargin
                class="article-card" />
            </i-col>
            <i-col
              v-if="!isPhone && !isTablet"
              :span="8">
              <ArticleCard
                v-for="article in articlesOfCol(2)"
                :key="article.id"
                :article="article"
                showSubtitle
                showAuthor
                showDate
                showIntro
                imgNoMargin
                class="article-card" />
            </i-col>
          </Row>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// libraries
import _ from 'lodash'
import appConfig from '~/config/app.json'
// images
import bannerBackground from '~/assets/img/banner.png'
import bannerBills from '~/assets/img/banner-bills.png'
// queries
import ArticlesQuery from '~/apollo/queries/HomePage/Articles'
// components
import Spinner from '~/components/Spinner'
import ArticleCard from '~/components/HomePage/ArticleCard'
import ArticleBannerCard from '~/components/ArticleBannerCard'

export default {
  head () {
    return {
      title: `${this.$t('aritclesPage.title')} | ${this.$t('site.title')}`
    }
  },
  components: {
    ArticleCard,
    ArticleBannerCard,
    Spinner
  },
  data () {
    return {
      bannerBackground,
      bannerBills,
      bannerStyle: `background-image: url("${bannerBackground}"); background-size: cover;`,
      articles: [],
      isArticleUpdateLoading: true,
      carouselPage: 0
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    },
    bannerArticles () {
      return this.articles.slice(0, 5)
    }
  },
  apollo: {
    articles: {
      query: ArticlesQuery,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          list: appConfig.articleList
        }
      },
      update (data) {
        console.log(`[Article update()] ${data}`)
        return _.orderBy(data.articles, article => parseInt(article.date), ['desc'])
      },
      result (result) {
        console.log(`[Article result()] ${result}`)
        if (!result.loading) {
          this.isArticleUpdateLoading = false
        }
      }
    }
  },
  methods: {
    articlesOfCol (col) {
      if (this.isPhone) {
        return this.articles
      } else if (this.isTablet) {
        return _.filter(this.articles, (x, i) => i % 2 == col)
      } else {
        return _.filter(this.articles, (x, i) => i % 3 == col)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.banner {
  .banner-wrapper {
    height: 180px;
    display: flex;
    justify-content: space-between;
    @extend .pageWrapper-large;

    .text-container {
      order: 0;
      padding-top: 50px;

      .banner-title {
        display: inline-block;
        font-size: 2em;
        font-weight: $twMedium;
        line-height: 1.1em;
        text-align: left;
        letter-spacing: 0.02em;
        color: $twWhite;
        margin-top: 15px;
        margin-right: 20px;
      }
    }

    .image-container {
      .front-img {
        width: 200px;
        margin: auto 30px 10px 0;
      }
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

.article-banner-card {
  height: 30vh;
}

// tablet
@media screen and (max-width: $mediumDeviceWidth - 1) {
  .article-banner-card {
    height: 25vh;
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
  .article-banner-card {
    height: 20vh;
  }
}
</style>

