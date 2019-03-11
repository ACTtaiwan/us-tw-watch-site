<template>
  <div id="app">
    <!-- Header -->
    <AppHeader/>
    <!-- Body -->
    <main id="main-content" class="main-content">
      <nuxt nuxtChildKey="none"/>
    </main>
    <!-- Footer -->
    <AppFooter
      :showPoweredby="footerMenu.showPoweredby"
      :sections="footerMenu.sections"
      :copyright="footerMenu.copyright"
      :fbLikeBtn="footerMenu.fbLikeBtn"
      :lineAddBtn="footerMenu.lineAddBtn"
      :logo="footerMenu.logo"
      :logoImgAlt="footerMenu.logoImgAlt"
    />
    <!-- Subscription Popup -->
    <Subscription :show="showSubscription" :list="'ustw'" @close="showSubscription = false"/>
    <!-- Donation Popup -->
    <Donorbox :show="showDonation" @close="showDonation = false"/>
  </div>
</template>

<script>
import _ from 'lodash'
import appConfig from '~/config/app.json'
import footerConfig from '~/config/footer.js'

// components
import AppHeader from '~/components/AppHeaderUSTW'
import AppFooter from '~/components/AppFooter'
import Subscription from '~/components/Subscription'
import Donorbox from '~/components/Donorbox'

export default {
  components: {
    AppHeader,
    AppFooter,
    Subscription,
    Donorbox
  },
  data (context) {
    let urlQuery = context.$route.query

    return {
      footerMenu: footerConfig(this)
    }
  },
  head () {
    return {
      link: [
        // We use $route.path since we don't use query parameters
        { rel: 'canonical', href: `${appConfig.site.url}${this.$route.path}` }
      ]
    }
  },
  computed: {
    showSubscription: {
      get: function () {
        return this.$store.getters.showSubscription
      },
      set: function (value) {
        this.$store.commit('SET_SUBSCRIPTION', value)
      }
    },
    showDonation: {
      get: function () {
        return this.$store.getters.showDonation
      },
      set: function (value) {
        this.$store.commit('SET_DONATION', value)
      }
    }
  },
  mounted () {
    let urlQuery = this.$route.query

    // detect window size
    window.addEventListener('resize', _.debounce(this.parseWindowWidth, 500))
    this.parseWindowWidth()

    // detect subscription
    if (urlQuery.subscription) {
      this.$store.commit('SET_SUBSCRIPTION', urlQuery.subscription === 'true' ? true : false)
    }
    // detect donation
    if (urlQuery.donation) {
      this.$store.commit('SET_DONATION', urlQuery.donation === 'true' ? true : false)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.parseWindowWidth)
  },
  methods: {
    parseWindowWidth (event) {
      this.$store.commit('SET_WINDOW_WIDTH', document.documentElement.clientWidth)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/css/site';
@import 'assets/css/app';
@import 'assets/css/colors';

.main-content {
  padding-top: $appHeaderHeight;
  background: $backgroundColorLight;
}
</style>
