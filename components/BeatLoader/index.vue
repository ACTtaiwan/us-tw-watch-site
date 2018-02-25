<template>
<div class="v-spinner" v-show="loading">
    <div class="v-beat v-beat-odd" v-bind:style="spinnerStyle">
    </div><div class="v-beat v-beat-even" v-bind:style="spinnerStyle">
    </div><div class="v-beat v-beat-odd" v-bind:style="spinnerStyle">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeatLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#9b9b9b'
    },
    size: {
      type: String,
      default: '10px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.size,
        width: this.size,
        margin: this.margin,
        borderRadius: this.radius
      }
    }
  }
}
</script>

<style>
.v-spinner .v-beat {
  -webkit-animation: v-beatStretchDelay 1.2s infinite linear;
  animation: v-beatStretchDelay 1.2s infinite linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  display: inline-block;
}
.v-spinner .v-beat-odd {
  animation-delay: 0s;
}
.v-spinner .v-beat-even {
  animation-delay: 0.5s;
}
@-webkit-keyframes v-beatStretchDelay {
  50% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
    -webkit-opacity: 0.2;
    opacity: 0.2;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
}
@keyframes v-beatStretchDelay {
  50% {
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
    -webkit-opacity: 0.2;
    opacity: 0.2;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
}
</style>
