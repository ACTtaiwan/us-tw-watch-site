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
    <!-- Subscription -->
    <Subscription :show="showSubscription" @close="showSubscription = false"/>
    <!-- Donorbox -->
    <Donorbox :show="showDonorbox" @close="showDonorbox = false"/>
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
  data () {
    return {
      footerMenu: footerConfig(this),
      showSubscription: false,
      showDonorbox: false
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
  computed: {},
  mounted () {
    window.addEventListener('resize', _.debounce(this.parseWindowWidth, 500))
    this.parseWindowWidth()
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
