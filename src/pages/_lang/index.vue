<template>
  <div class="home">
    <div class="home-banner">
      <p>This is home banner</p>
    </div>

    <div class="home-highlight">
      <p>This is home highlight</p>
    </div>

    <div class="home-bills">
      <div class="bill">
        <div class="bill-title">
        </div>
        <div class="bill-author">
        </div>
        <div class="bill-date">
        </div>
        <div class="bill-description">
        </div>
        <div class="bill-more">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return { title: this.$t('home.title') }
  }
}
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    --banner-height: 30vh;
    --highlight-height: 120px;
  }
  .home .home-banner {
    width: 100%;
    height: var(--banner-height);
    background: #ddd;
    text-align: center;
    line-height: var(--banner-height);
  }
  .home .home-highlight {
    width: 100%;
    height: var(--highlight-height);
    background: #999;
    text-align: center;
    line-height: var(--highlight-height);
  }
</style>
