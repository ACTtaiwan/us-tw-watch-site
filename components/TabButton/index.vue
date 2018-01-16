<template>
  <Button class="tab-button" :class="{ enabled: selected }" type="ghost" shape="circle" :icon="this.icon" @click="select">{{ this.label }}</Button>
</template>
<script>
export default {
  props: {
    selected: {
      type: Boolean,
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

  methods: {
    select () {
      this.$emit('select')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/colors';
@import 'assets/css/typograghy';

.tab-button {
  font-size: 1rem;
  background: #ffffff;
  color: $twGrayLight;
  padding: 10px 20px;
  font-weight: $twBold;
}
.enabled {
  color: $twBlack;
}
</style>
