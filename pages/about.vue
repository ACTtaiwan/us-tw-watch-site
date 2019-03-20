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

    <!-- About us -->
    <section id="data-source" class="section">
      <div class="section-wrapper">
        <div class="social-btns">
          <Tooltip content="Facebook">
            <a href="https://www.facebook.com/ustaiwanwatch/" target="_blank">
              <Button class="social-btn fb-btn" type="primary" shape="circle" icon="logo-facebook"/>
            </a>
          </Tooltip>
          <Tooltip content="Instagram">
            <a href="https://www.instagram.com/ustaiwanwatch/" target="_blank">
              <Button class="social-btn ig-btn" type="primary" shape="circle" icon="logo-instagram"/>
            </a>
          </Tooltip>
          <Tooltip content="Line">
            <a href="https://line.me/R/ti/p/%40pfw3848l/" target="_blank">
              <Button class="social-btn line-btn" type="primary" shape="circle">
                <img :src="lineIcon"></img>
              </Button>
            </a>
          </Tooltip>
          <Tooltip content="Email us">
            <a href="mailto:liho@uswatch.tw">
              <Button class="social-btn email-btn" type="primary" shape="circle" icon="md-mail"/>
            </a>
          </Tooltip>
        </div>
        <Card :bordered="false" class="section-card">
          國會是美國的立法單位，關係著美國內政外交的政策走向。秉持著開放資料、開放政府的精神，我們希望透過集結及整理美國國會台灣相關法案，讓更多人能了解、甚至參與美國的政策決策圈。
        </Card>
      </div>
    </section>

    <!-- Support us -->
    <section id="support" class="section">
      <div class="section-wrapper">
        <h1 class="section-title">支持我們</h1>
        <Card :bordered="false" class="section-card">
          <DonorboxContent :config="'ustw'"/>
        </Card>
      </div>
    </section>

    <!-- Data source -->
    <section id="data-source" class="section">
      <div class="section-wrapper">
        <h1 class="section-title">資料來源</h1>
        <Card :bordered="false" class="section-card">
          <ul class="data-list">
            <li><a href="https://www.govtrack.us/" target="_blank">GovTrack</a></li>
            <li><a href="http://congress.gov/" target="_blank">Congress.gov</a></li>
            <li><a href="https://www.propublica.org/" target="_blank">ProPublica</a></li>
          </ul>
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
import lineIcon from '~/assets/img/line-icon-outline.png'

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
      lineIcon
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

.data-list {
  margin-left: 16px;
}

.social-cards {
  display: flex;

  .slot {
    display: flex;
    align-items: center;
  }

  .twitter-card {
    margin-left: 30px;
    flex-grow: 1;
  }

  .hide {
    display: none;
  }
}

$fb-color: #3C5A99;
$ig-color: #fb3958;
$line-color: #00C200;

@mixin social-button($color) {
  background-color: $color;
  border-color: $color;

  &:hover {
    background-color: lighten($color, 20%);
    border-color: lighten($color, 20%);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba($color, .2);
  }
}
.social-btns {
  display: flex;
  justify-content: center;
  padding: 10px 0 32px 0;

  .social-btn {
    margin: 0 10px;
  }

  .fb-btn {
    @include social-button($fb-color);
  }

  .ig-btn {
    @include social-button($ig-color);
  }

  .line-btn {
    @include social-button($line-color);
    width: 32px;
    height: 32px;

    img {
      width: 20px;
      height: 20px;
      left: -10px;
      top: 1px;
      position: relative;
    }
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
