<template>
  <Card id="tooltip">
    <p slot="title" class="title">{{ title }}</p>
    <p class="sponsor" v-for="sponsor in sponsors" :key="sponsor.id">
      <Icon type="ios-circle-filled" :style="getPartyStyleObject(sponsor.color)"></Icon>
      <span class="name">{{ sponsor.name }}</span>
    </p>
  </Card>
</template>
<script>
import { path } from '@/plugins/locale'

export default {
  props: [
    'title',
    'sponsors'
  ],

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
<style scoped>
#tooltip {	
  position: absolute;			
  z-index: 10;
  visibility: hidden;
  text-align: left;
  padding: 15px;
  font: 12px sans-serif;
  line-height: 12px;
  background: rgba(0, 0, 0, 0.8);
  border: 0px;
  border-radius: 3px;
  pointer-events: none;
}
.title, .name {
  color: white;
}
.sponsor {
  margin-bottom: 10px;
}
</style>
