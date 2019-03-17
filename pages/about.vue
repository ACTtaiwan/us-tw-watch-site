<template>
  <div class="about-page">
    <!-- Banner -->
    <section :style="bannerStyle" class="banner">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">關於我們</h1>
        </div>
        <div class="image-container" >
          <img :src="bannerForeImg" class="front-img">
        </div>
      </div>
    </section>

    <!-- Support us -->
    <section id="support" class="section">
      <div class="section-wrapper">
        <h1 class="section-title">支持我們</h1>
        <Card :bordered="false" class="section-card">
          <DonorboxContent />
        </Card>
      </div>
    </section>
  </div>
</template>

<script>
// libraries
import _ from 'lodash'
import appConfig from '~/config/app.json'
import bannerForeImg from '~/assets/img/banner-bills.png'
import bannerBackImg from '~/assets/img/banner.png'

// components
import DonorboxContent from '~/components/DonorboxContent'

export default {
  components: {
    DonorboxContent
  },
  data (context) {
    let urlQuery = context.$route.query
    return {
      bannerForeImg,
      bannerBackImg,
      bannerStyle: `background-image: url("${bannerBackImg}"); background-size: cover;`,
    }
  },
  head () {
    return {
      title: `${this.$t('aboutPage.title')} | ${this.$t('site.title')}`,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('aboutPage.description') },
        { property: 'og:url', content: appConfig.site.url },
        { property: 'og:title', content: this.$t('aboutPage.title') },
        { property: 'og:description', content: this.$t('aboutPage.description') }
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
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
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

    .about-card-background {
      background-position: right;
      background-size: auto 100%;
      background-repeat: no-repeat;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        opacity: 0.85;
        background-color: white;
      }
    }

    .about-card-content {
      position: relative;
    }
  }

  &:last-child {
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 880px) {
  .slot {
    flex-wrap: wrap;
  }

  .twitter-follow-btn,
  .fb-share-btn {
    margin-top: 10px;
  }
}

@media screen and (max-width: 780px) {
  .social-cards {
    flex-direction: column;

    .twitter-follow-btn,
    .fb-share-btn {
      display: none;
    }

    .tw-timeline-wrapper,
    .fb-page {
      display: none;
    }

    .twitter-card {
      margin-left: 0;
      margin-top: 20px;
      flex-grow: 0;
      width: 100%;
    }

    .fb-card {
      width: 100%;
    }
  }
}

// phone
@media screen and (max-width: $smallDeviceWidth - 1) {
  .section-card {
    margin: auto -15px;
  }

  .social-cards {
    .twitter-card {
      margin-left: -15px;
      width: auto;
    }
  }
}
</style>
