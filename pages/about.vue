<template>
  <div class="landing">關於我們</div>
</template>

<script>
// libraries
import _ from 'lodash'
import appConfig from '~/config/app.json'

export default {
  components: {},
  data (context) {
    let urlQuery = context.$route.query

    return {}
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
</style>
