<template>
  <div class="langSwitch">
    <!-- English -->
    <router-link class="locale" :class="{ active: $i18n.locale === 'en-us' }" :to="localeStrippedPath">
      {{ $t('locales.' + 'en-us') }}
    </router-link>
    <!-- Chinese -->
    <router-link class="locale" :class="{ active: $i18n.locale === 'zh-tw' }" :to="`/zh-tw` + localeStrippedPath">
      {{ $t('locales.' + 'zh-tw') }}
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      locales: ['en-us', 'zh-tw']
    }
  },
  computed: {
    localeStrippedPath () {
      let regex = new RegExp('/' + this.$i18n.locale + '/', 'g')
      return this.$route.fullPath.replace(regex, '/')
    }
  }
}
</script>>

<style scoped lang="scss">
.langSwitch {
  width: 62px;

  .locale {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      font-weight: 500;
      border-bottom: 1px solid #2d8cf0;
    }
  }
}
</style>
