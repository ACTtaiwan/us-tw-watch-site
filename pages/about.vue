<template>
  <div class="about-page">
    <!-- Banner -->
    <section :style="bannerStyle" class="banner">
      <div class="banner-wrapper">
        <div class="text-container">
          <h1 class="banner-title">關於我們</h1>
        </div>
        <div class="image-container">
          <img :src="bannerForeImg" class="front-img">
        </div>
      </div>
    </section>

    <!-- About us -->
    <section id="data-source" class="section about">
      <div class="section-wrapper">
        <h1 class="section-title">觀測員們</h1>
        <p class="content">
          觀測站臉書專頁成立這一年多來，收到不少讀者來信詢問我們是不是民進黨、外交部、FAPA，或是AIT的附隨組織。但其實呢，我們只是一群
          <span class="underscore">
            <span>來自各個不同領域的熱血志工</span>
          </span>
          ：大部分在美國，少部分在台灣及世界各地。大家都有各自的全職工作與專業，但都對美台關係和美國國會台灣相關法案動態充滿熱情。這個專案在2017年6月剛開始時，原本只是一個科技專案，內容就是現在這個網站的雛形，成員大多是工程師。但在有幸獲得2017年秋季
          <a
            href="https://grants.g0v.tw/"
            target="_blank"
          >g0v公民科技創新獎助金</a>
          後，越來越多不同領域志同道合的朋友加入，我們在臉書上經營的文字內容也越來越獲得關注，我們開始意識到自身作為橋接美台雙邊資訊的角色和影響力。於是，我們在2018年和長期以來向美國人教育台灣對美重要性的在地非營利組織
          <a
            href="https://acttaiwan.org"
            target="_blank"
          >美台會（American Citizens for Taiwan）</a>合併，希望透過各自針對美、台雙邊的受眾倡議台灣相關法案和提升美台關係。
        </p>

        <div class="support-us">
          <div class="block left">
            <div class="content">
              <p>觀測站的成員包括工程師、老師、政治及外交學者、政治學研究生，大家都是利用空閒時間義務幫忙，憑著一腔熱血將精力貢獻於此專案，因此我們特別需要您的資助，幫助我們能繼續發展。如果您覺得我們整理的法案、議員資料受用，或者如果您也關心台美議題發展，請給我們一點鼓勵，小額捐款將是我們能繼續走下去最大的支柱！</p>
              <Button label="捐款贊助" fontSize="14px" lineHeight="22px" @click.native="onClickDonateButton"/>
            </div>
          </div>
          <div :style="donateImgBlockStyle" class="block right"/>
        </div>
      </div>
    </section>

    <!-- Data -->
    <section id="data-source" class="section data">
      <div class="section-wrapper">
        <h1 class="section-title">本站資料</h1>
        <p class="content">
          觀測站所使用的資料以及這個網站的原始碼也都是
          <span class="underscore">
            <span>開源授權</span>
          </span>。我們主要的資訊來源有美國國會官網
          <a href="http://congress.gov/" target="_blank">Congress.gov</a>，以及非官方的國會資訊服務像是
          <a href="https://www.govtrack.us/" target="_blank">GovTrack</a>、
          <a href="https://www.propublica.org/" target="_blank">ProPublica</a>。目前我們總共整理了超過1,000筆台灣相關法案，以及超過12,000位議員的資料。在我們網站，你會看到「台灣相關法案」和「台灣法案」這兩個名詞，兩者的定義略有不同。
          <span class="underscore">
            <span>台灣相關法案</span>
          </span>指的是法案的標題或是內文有出現台灣關鍵字（taiwan, formosa, free china等）就算，這些法案有時候對台灣的針對性較低；而
          <span class="underscore">
            <span>台灣法案</span>
          </span>指的是，法案標題中只有台灣（或是台灣及美國）而沒有其他國家名稱的法案，這類法案對台灣的針對性最高。
        </p>
      </div>
    </section>

    <!-- Follow Us -->
    <section id="data-source" class="section follow">
      <div class="section-wrapper">
        <h1 class="section-title">成為粉絲</h1>
        <!-- <Row :gutter="30">
        <i-col v-for="social in accounts" :key="social.name" :span="isPhone ? 24 : isTablet ? 8 : 6">-->
        <div class="platforms">
          <SocialMediaCard v-for="social in accounts" :key="social.name" :source="social" class="media"/>
        </div>
        <!-- </i-col>
        </Row>-->
      </div>
    </section>

    <!-- Join Us -->
    <section id="data-source" class="section join">
      <div class="section-wrapper">
        <h1 class="section-title">加入我們</h1>
        <p class="content">
          觀測站是一群由不同領域志工組成的專案。如果你的專長是
          <span class="underscore">
            <span>美台關係</span>
          </span>或是
          <span class="underscore">
            <span>國際關係</span>
          </span>，歡迎加入成為一起研究台灣的外交現狀與策略。如果你是
          <span class="underscore">
            <span>工程師</span>
          </span>，對於有資料蒐集處理有OCD，我們這裡一堆法案、議員資料、會議發言紀錄、投票表決等著你（抖）。當然，任何資訊的有效傳達仰賴好的
          <span class="underscore">
            <span>資訊設計</span>
          </span>以及
          <span class="underscore">
            <span>社群媒體經營</span>
          </span>，不管你是前端工程師、設計師、社群小編，都給我來一點。那如果我只是個對
          <span class="underscore">
            <span>改善美台關係</span>
          </span>有興趣的路人，我能幫忙嗎？當然可以，其實許多國會資料的整理是很繁複的，雖然我們有厲害的工程師，但在人工智慧力有未殆之處，我們還是需要大量的「工人智慧」😝，很需要大家一起協力幫忙，有興趣的朋友可以
          <a
            href="mailto:liho@uswatch.tw"
          >聯絡我們</a>。
        </p>
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
import Donation from '~/components/Donation'
import SocialMediaCard from '~/components/SocialMediaCard'
import Button from '~/components/TwButton'

export default {
  components: {
    Donation,
    SocialMediaCard,
    Button
  },
  data (context) {
    let urlQuery = context.$route.query
    return {
      bannerForeImg,
      bannerBackImg,
      bannerStyle: `background-image: url("${bannerBackImg}"); background-size: cover;`,
      lineIcon,
      birdImgUrl: `${appConfig.assets.baseUrl}/donate-bird-2.png`,
      donateImgBlockStyle: `background-image: url("${
        appConfig.assets.baseUrl
      }/donate-bird-2.png"); background-size: cover;`,
      accounts: [
        {
          name: 'fb',
          url: 'https://www.facebook.com/ustaiwanwatch/',
          title: 'Facebook',
          description: '最新美台關係新聞和動態'
        },
        {
          name: 'ig',
          url: 'https://www.instagram.com/ustaiwanwatch/',
          title: 'Instagram',
          description: '即時國會新聞動態和小編幕後五四三'
        },
        {
          name: 'line',
          url: 'https://line.me/R/ti/p/%40pfw3848l/',
          title: 'LINE',
          description: '觀測站文章重點摘要整理給你'
        },
        {
          name: 'medium',
          url: 'https://medium.com/ustaiwanwatch',
          title: 'Medium',
          description: '深度文章剖析美台關係和外交動態'
        }
      ]
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
  methods: {
    onClickDonateButton (event) {
      this.$store.commit('SET_DONATION', true)
    }
  }
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
  padding: 40px 0;

  &.about,
  &.follow {
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

    .content {
      color: $twGrayDark;
      margin-top: 20px;
      text-align: left;
      font-size: 16px;
      font-weight: 400;
    }
  }

  &:last-child {
    margin-bottom: 40px;
  }
}

.support-us {
  @extend .card;
  padding: 0;
  margin-top: 20px;
  min-height: 400px;

  display: flex;

  .block {
    position: relative;

    &.left {
      flex: 3;
      padding: 40px;

      display: flex;
      flex-direction: column;
      justify-content: center;

      .content {
        text-align: center;

        p {
          margin: auto 0;
          color: $twIron;
          text-align: left;
          font-size: 18px;
          line-height: 30px;
          font-weight: 400;
          font-style: italic;
          margin-bottom: 30px;
        }
      }
    }

    &.right {
      flex: 2;
    }
  }
}

.platforms {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin-left: -10px;
  margin-right: -10px;

  .media {
    position: relative;
    flex: 1;
    flex-basis: 140px;
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 10px;
  }
}

// tablet
@media screen and (max-width: $mediumDeviceWidth - 1) {
  .support-us {
    min-height: 300px;
    .block {
      &.right {
        display: none;
      }
    }
  }
}
</style>
