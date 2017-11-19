<template>
  <div class="layout">
    <AppHeader></AppHeader>
    <div id="layout-content" class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  data () {
    return {}
  },
  computed: {},
  methods: {},
  components: {
    AppHeader
  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/css/app';

.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.layout-content {
  min-height: 200px;
  height: calc(100% - #{$appHeaderHeight});
  overflow: scroll;
  background: #fff;
  border-radius: 4px;
  padding: 40px;
}
</style>
