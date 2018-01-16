<template>
  <nuxt-link class="logo" :to="path(this, '/')">
    <img class="logo-img" :src="logo" alt="logo" />
    <span class="logo-text">TAIWAN WATCH</span>
  </nuxt-link>
</template>

<script>
import logo from '~/assets/img/tw-logo.png'
import { path } from '@/plugins/locale'

export default {
  data () {
    return {
      logo
    }
  },
  methods: {
    path
  }
}
</script>>

<style scoped lang="scss">
@import 'assets/css/app';

.logo {
  width: 200px;
  height: 40px;
  position: relative;
  top: 10px;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  display: block;
}

.logo-text {
  color: white;
  margin-left: 10px;
  font-weight: 500;
  letter-spacing: 1px;
}

@media screen and (max-width: #{$largeDeviceWidth}) {
  .logo {
    margin-right: auto;
  }
}
</style>
