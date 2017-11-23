<template>
  <footer>
    Copyright © TaiwanWatch.org 2017
    <a class="powerByG0v" href="https://grants.g0v.tw/power/" alt="power by g0v" data-reactid="76">
      <img src="https://image.goodjob.life/logo-g0v-white.svg" alt="g0v" data-reactid="77">
    </a>
  </footer>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>>

<style scoped lang="scss">
@import 'src/assets/css/app';

footer {
  height: $appFooterHeight;
  color: hsla(0, 0%, 100%, 0.7);
  background: #4a505e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.powerByG0v {
  display: flex;
  align-items: center;
  margin-left: 10px;

  img {
    width: 160px;
  }
}
</style>
