<template>
  <a @click="onClick">
    <slot>
      <Button>share</Button>
    </slot>
  </a>
</template>

<script>
/* eslint-disable no-undef */

export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {}
  },
  mounted () {
    if (!this.FB) {
      this.$initFbSdk()
    }
    // window.addEventListener('fb-sdk-ready', this.onFbReady)
  },
  beforeDestroy: function () {
    // window.removeEventListener('fb-sdk-ready', this.onFbReady)
  },
  methods: {
    onClick () {
      if (this.FB) {
        this.shareLink()
      }
    },
    shareLink () {
      FB.ui(
        {
          method: 'share',
          display: 'popup',
          href: `${location.protocol}//${window.location.hostname}${location.port ? ':' + location.port : ''}${this.url}`
        },
        response => {
          console.log('share the link', response)
        }
      )
    }
  }
}
</script>
