<template>
  <Button v-if="this.type === 'icon'" class="iconButton" shape="circle" :icon="this.icon" @click="press"></Button>
  <Button v-else class="button" shape="circle" :icon="this.icon" @click="press" :loading="loading">{{ this.label }}</Button>
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
    },
    type: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {}
  },
  computed: {
    buttonClass () {
      let classes = []
      if (this.type) {
        classes.push(`${this.type}-type`)
      }
      console.log(this.label)
      return classes
    }
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
  background: $twIndigo;
  color: $twWhite;
  padding: 6px 12px;
  border: none;
  font-weight: $twSemiBold;
}

.iconButton {
  border: none;
  color: $twGrayLight;
  background: $twGrayLighter;
  font-size: 1em;
  width: 30px;
  height: 30px;

  &:hover {
    color: $twGray;
    background: $twGrayLighter;
  }
}
</style>
