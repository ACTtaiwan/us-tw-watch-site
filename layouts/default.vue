<template>
  <div id="app">
    <AppHeader></AppHeader>
    <main id="main-content" class="main-content">
      <nuxt nuxt-child-key="none"></nuxt>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
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
  }
}
</script>

<style lang="scss">
@import 'assets/css/site';
@import 'assets/css/app';

.main-content {
  padding-top: $appHeaderHeight;
  min-height: calc(100vh - #{$appFooterHeight});
  background: $backgroundColorLight;
}
</style>
