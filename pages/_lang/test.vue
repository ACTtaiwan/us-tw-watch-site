<template>
  <div>
    <h1>This is the test page</h1>
    <FbShareWrapper url="https://www.google.com/">
      <p>Hello</p>
    </FbShareWrapper>
  </div>
</template>

<script>
import FbShareWrapper from '~/components/FbShareWrapper'

export default {
  components: {
    FbShareWrapper
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';
</style>
