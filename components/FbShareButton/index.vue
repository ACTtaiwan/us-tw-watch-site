<template>
  <div id="shareBtn" class="btn btn-success clearfix">Share</div>
</template>

<script>
export default {
  mounted () {
    window.fbAsyncInit = function () {
      // eslint-disable-next-line no-undef
      FB.init({
        appId: '2017625051893386',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.12'
      })

      document.getElementById('shareBtn').onclick = function () {
        // eslint-disable-next-line no-undef
        FB.ui({
          method: 'share',
          display: 'popup',
          href: 'https://dev.taiwanwatch.org/bills/df717157-4d7b-4a55-acf4-eae451f2ff64'
        }, function (response) {})
      }
    };

    (function (d, s, id) {
      let js
      let fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      js = d.createElement(s); js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/colors';
@import 'assets/css/typography';

.button {
  font-size: 0.9em;
  background: $twIndigo;
  color: $twWhite;
  padding: 6px 12px;
  border: none;
  font-weight: $twSemiBold;
}

.iconButton {
  border: none;
  color: $twGrayLight;
  background: $twGrayLighter;
  font-size: 1em;
  width: 30px;
  height: 30px;

  &:hover {
    color: $twGray;
    background: $twGrayLighter;
  }
}
</style>
