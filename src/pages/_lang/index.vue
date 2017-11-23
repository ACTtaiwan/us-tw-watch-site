<template>
  <div class="landing">
    <section class="banner">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ this.$t('landingPage.bannerTitle') }}</h1>
        <div class="image-container">
          <img class="congress-img" :src="congress" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import congress from '@/assets/img/congress.png'

export default {
  head () {
    return {
      title: this.$t('title.siteMainTitle')
    }
  },
  data () {
    return {
      congress
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/css/app';

.banner {
  background-color: #fff;
  border-bottom: 1px solid #eeeeed;
  position: relative;
}

.banner-wrapper {
  height: 300px;
  display: flex;
  justify-content: space-between;
  @extend .pageWrapper-large;

  .banner-title {
    font-size: 2.5em;
    font-weight: 400;
    letter-spacing: 0.05em;
    padding-top: 50px;
  }
}

.image-container {
  display: flex;

  .congress-img {
    margin-top: auto;
    width: 400px;
  }

  @media (max-width: $mediumDeviceWidth) {
    .congress-img {
      width: 300px;
    }
  }
}
</style>
