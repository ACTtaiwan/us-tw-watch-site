<template>
  <div class="landing">

    <!-- Banner -->
    <section class="banner" :style="style">
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
    <section class="bills-update section">
      <div class="section-wrapper">
        <h1 class="section-title">Bill updates</h1>
        <div class="info-cards-section-wrapper">
          <Row :gutter="30" type="flex">
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section class="bills-update section">
      <div class="section-wrapper">
        <h1 class="section-title">Articles</h1>
        <div class="info-cards-section-wrapper">
          <Row :gutter="30" type="flex">
            <Col style="margin-bottom: 30px;" :span="cardSpan" >
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
            <Col style="margin-bottom: 30px;" :span="cardSpan">
              <Card >
                <p slot="title">No border title</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import congress from '~/assets/img/banner-home.png'
import people from '~/assets/img/banner-people.png'

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
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    },
    cardSpan () {
      let span = 8
      if (this.$store.getters.isTablet) span = 12
      if (this.$store.getters.isPhone) span = 24
      return span
    }
  },
  components: {}
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
      font-size: 2em;
      font-weight: $twSemiBold;
      margin-bottom: 20px;
    }
  }
}
</style>
