<template>
  <div id="app" class="app">
    <AppHeader></AppHeader>
    <main id="main-content" class="main-content">
      <router-view></router-view>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  data () {
    return {}
  },
  computed: {},
  methods: {},
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/css/app';

.main-content {
  padding-top: $appHeaderHeight;
  min-height: calc(100vh - #{$appFooterHeight});
  background: $backgroundColorLight;
}
</style>
