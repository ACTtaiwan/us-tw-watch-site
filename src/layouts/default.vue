<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="1">
                    <Icon type="ios-navigate"></Icon>
                    <nuxt-link id="A_16" :to="'/about'" exact>
                      {{ $t('links.about') }}
                    </nuxt-link>
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>
                    <nuxt-link id="A_18" :to="'/bills'" exact>
                      {{ $t('links.bills') }}
                    </nuxt-link>
                </MenuItem>
                <MenuItem name="3">
                  <nuxt-link id="A_20" v-if="$i18n.locale === 'en'" :to="`/zh-tw` + $route.fullPath" active-class="none" exact>
                    {{ $t('links.chinese') }}
                  </nuxt-link>
                  <nuxt-link id="A_20" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
                    {{ $t('links.english') }}
                  </nuxt-link>
                </MenuItem>
            </div>
        </Menu>
        <div class="layout-content">
            <Row>
                <Col span="5">
                    <Menu active-name="1-2" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
                <Col span="19">
                    <div class="layout-content-main">Content</div>
                </Col>
            </Row>
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
    }
  }
</script>

<style scoped>
  :root {
    --header-height: 60px;
    --footer-height: 60px;
  }
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
  }
  .layout-logo{
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
  }
  .layout-nav{
      width: 420px;
      margin: 0 auto;
  }
  .layout-breadcrumb{
      padding: 10px 15px 0;
  }
  .layout-content{
      height: calc(100vh - var(--header-height) - var(--footer-height));
      overflow: hidden;
      background: #fff;
  }
  .layout-content-main{
      padding: 10px;
  }
  .layout-footer {
      height: var(--footer-height);
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
  }
</style>
