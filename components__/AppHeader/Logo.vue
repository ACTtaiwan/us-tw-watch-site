<template>
  <nuxt-link class="logo" :to="path(this, '/')">
    <img class="logo-img" :src="logo" alt="logo" />
    <span class="logo-text">U.S. TAIWAN WATCH</span>
  </nuxt-link>
</template>

<script>
import logo from '~/assets/img/tw-logo-color.png'
import { path } from '@/plugins/utils'

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
@import 'assets/css/colors';
@import 'assets/css/typography';

.logo {
  width: 300px;
  height: 40px;
  position: relative;
  top: 10px;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 36px;
  display: block;
}

.logo-text {
  color: $twBlack;
  margin-left: 10px;
  font-weight: $twSemiBold;
  letter-spacing: 1px;
}

@media screen and (max-width: #{$largeDeviceWidth}) {
  .logo {
    margin-right: auto;
  }
}
</style>
