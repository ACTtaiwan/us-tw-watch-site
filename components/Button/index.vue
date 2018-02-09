<template>
  <Button class="button" type="ghost" shape="circle" :icon="this.icon" @click="press">{{ this.label }}</Button>
</template>
<script>
export default {
  props: {
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
    press () {
      this.$emit('press')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/colors';
@import 'assets/css/typography';

.button {
  font-size: 0.9em;
  background: $twBlue;
  color: $twWhite;
  padding: 6px 12px;
  border: none;
  font-weight: $twSemiBold;

  &:hover {
    background: $twIndigo;
  }
}
</style>
