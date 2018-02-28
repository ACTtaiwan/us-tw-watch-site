<template>
  <div :id="mapId + '-' + 'tooltip'" class="tooltip">
    <p slot="title" class="title">{{ title }}</p>
    <P class="count">{{ count }}</P>
  </div>
</template>
<script>
import { path } from '@/plugins/utils'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    mapId: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
    path,
    getPartyStyleObject (color) {
      return {
        color,
        'margin-right': '10px'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.tooltip {
  position: absolute;
  z-index: 10;
  visibility: hidden;
  text-align: left;
  padding: 15px;
  line-height: 12px;
  background: rgba(0, 0, 0, 0.8);
  border: 0px;
  border-radius: 3px;
  pointer-events: none;

  .title {
    color: white;
    font-size: 16px;
    margin-bottom: 15px;
  }

  .count {
    color: aquamarine;
  }
}
</style>
