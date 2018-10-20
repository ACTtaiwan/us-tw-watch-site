<template>
  <div id="app">
    <AppHeader />
    <main
      id="main-content"
      :class="{ phone: isPhone}"
      class="main-content">
      <nuxt nuxtChildKey="none" />
    </main>
    <AppFooter/>
  </div>
</template>

<script>
import _ from 'lodash'
import AppHeader from '~/components/AppHeaderUSTW'
import AppFooter from '~/components/AppFooterUSTW'
import appConfig from '~/config/app.json'

export default {
  head () {
    return {
      link: [
        // We use $route.path since we don't use query parameters
        { rel: 'canonical', href: `${appConfig.site.url}${this.$route.path}` }
      ]
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    }
  },
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
  min-height: calc(100vh - #{$appFooterHeight});
  background: $backgroundColorLight;

  &.phone {
    min-height: calc(100vh - #{$appFooterHeightPhone});
  }
}
</style>
