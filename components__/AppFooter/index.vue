<template>
  <footer :class="{ phone: this.isPhone}">
    <span class="copyright">Copyright © TaiwanWatch.org 2018</span>
    <a class="powerBy"  target="_blank" href="https://grants.g0v.tw/power/" alt="power by g0v" data-reactid="76">
      <img src="https://s3.amazonaws.com/taiwanwatch-static/assets/poweredby-g0v-long.png" alt="g0v" data-reactid="77">
    </a>
  </footer>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  },
  methods: {},
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    }
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';

footer {
  height: $appFooterHeight;
  color: $twWhite;
  background: $twGray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;

  .copyright {
    margin-bottom: 3px;
  }

  .powerBy {
    display: flex;
    align-items: center;
    margin-left: 14px;

    img {
      width: 160px;
    }
  }

  &.phone {
    height: $appFooterHeightPhone;
    flex-direction: column;

    .powerBy {
      margin-left: 0px;
    }
  }
}
</style>
