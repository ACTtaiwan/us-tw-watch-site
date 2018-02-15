<template>
  <div class="summary-card" :class="{ phone: this.isPhone }">
    <h1 class="summary-card-title">Summary</h1>
    <div class="summary-card-body">
      <p class="paragraph" v-for="paragraph in paragraphs">{{ paragraph }}</p>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    style () {
      return `
        object-fit: cover;
        width: ${this.size}px;
        height: ${this.size}px;
      `
    },
    paragraphs () {
      return this.bill.summary.paragraphs.map(paragraph => {
        if (process.browser) {
          // strip html tags from the string
          var dom = document.createElement('DIV')
          dom.innerHTML = paragraph
          return dom.textContent || dom.innerText || ''
        }
        return paragraph
      })
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.summary-card {
  @extend .card;
  margin-bottom: 20px;

  .summary-card-title {
    @extend .card-title;
  }

  .summary-card-body {
    max-height: 500px;
    overflow: scroll;
  }
}

.paragraph {
  margin-bottom: 20px;
  color: $twGrayDark;
  font-size: 1em;
}
</style>
