<template>
  <div class="layout">
    <div class="layout-header-area"></div>
    
    <div class="layout-header">
      <div class="layout-logo">
        <nuxt-link class="logo-link" :to="path('/')" exact>
          {{ $t('links.home') }}
        </nuxt-link>
      </div>
      <ul class="layout-nav">
        <li>
          <nuxt-link class="header-link" :to="path('/about')" exact>
            {{ $t('links.about') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="header-link" :to="path('/bills')" exact>
            {{ $t('links.bills') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="header-link" v-if="$i18n.locale === 'en'" :to="`/zh-tw` + $route.fullPath" active-class="none" exact>
            {{ $t('links.chinese') }}
          </nuxt-link>
          <nuxt-link class="header-link" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
            {{ $t('links.english') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="layout-content">
      <nuxt/>
    </div>
    <div class="layout-footer">
      2017 &copy; TaiwanWatch
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('home.title')
    }
  },

  methods: {
    path (url) {
      return (this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url)
    }
  }
}
</script>

<style scoped>
.layout {
  --header-height: 60px;
  --footer-height: 60px;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.layout .header-link {
  font-size: 16px;
  color: #fff;
  border: 1px solid #fff;
  padding: 7px 12px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
}
.layout .header-link:hover {
  color: #2e2f30;
  background-color: #fff;
}
.layout .layout-header {
  width: 100%;
  height: var(--header-height);
  background: #1F1F1F;
  position: fixed;
  top: 0;
  left: 0;
}
.layout .layout-header-area {
  width: 100%;
  height: var(--header-height);
}
.layout .layout-logo {
  width: 10%;
  height: 100%;
  background: #5b6270;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center; 
}
.layout .logo-link {
  font-size: 16px;
  color: #fff;
  padding: 7px 12px;
  text-transform: uppercase;
  text-decoration: none;
}
.layout .layout-nav {
  width: 33%;
  float: right;
  height: var(--header-height);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.layout .layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout .layout-content {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow: hidden;
  background: red;
}
.layout .layout-footer {
  height: var(--footer-height);
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
</style>
