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
@import 'assets/css/typography';

.tab-button {
  font-size: 1em;
  background: white;
  color: $twGrayLight;
  padding: 5px 10px;
  border: none;
  letter-spacing: 0.02em;
  font-weight: $twMedium;

  &:hover {
    color: $twGrayDark;
  }
}

.enabled {
  color: $twGrayDark;
}
</style>
