<template>
  <div class="progress">

    <div class="progress-bar" :style="this.style" />
    <div class="stages">
      <Tooltip class="dot" content="Introduced"></Tooltip>
      <Tooltip class="dot" content="Passed House"></Tooltip>
      <Tooltip class="dot" content="Passed Senate"></Tooltip>
      <Tooltip class="dot" content="To President"></Tooltip>
      <Tooltip class="dot" content="Become Law"></Tooltip>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  data () {
    return {}
  },
  computed: {
    style () {
      return `width: ${this.progress}%;`
    }
  },
  methods: {
    select () {
      this.$emit('select')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/colors';
@import 'assets/css/typography';

$bar-height: 14px;
$bg: #393943;

$button-size: $bar-height - 8;
$button-offset: #{4}px;

.stages {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
}

.dot {
  display: block;
  text-align: center;
  font-size: 0.8em;
  font-weight: $twSemiBold;
  color: $twGray;
  height: 100%;
  width: 20%;

  &:after {
    content: '';
    background-color: rgba(0, 0, 0, 0.2);
    width: $button-size;
    height: $button-size;
    float: right;
    margin-top: 5px;
    margin-right: 5px;
    border-radius: $button-size / 2;
    box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(255, 255, 255, 0.5);
  }
}

.progress {
  height: $bar-height + 1;
  width: 100%;
  border-radius: $bar-height / 2;
  background-color: $twGrayLightest;
  position: relative;

  .progress-bar {
    display: block;
    overflow: hidden;
    position: relative;
    height: 100%;
    background: $twIronLight;
    border-radius: $bar-height / 2;
    min-width: 13px;
  }
}
</style>
