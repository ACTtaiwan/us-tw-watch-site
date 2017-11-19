<template>
  <Menu mode="horizontal" theme="dark" :active-name="activeMenuItem" @on-select="onMenuSelect">
    <div class="header">
      <div class="header-menu-hamburger" :class="{isMenuOpen: isMenuOpen}" @click="onHamburgerClick">
        <span></span>
      </div>
      <Logo></Logo>
      <div class="header-nav" :class="{isMenuOpen: isMenuOpen}">
        <!-- MENU -->
        <div class="header-menu">
          <nuxt-link class="menu-item" :class="{'menu-item-selected': activeMenuItem === 'bills'}" :to="path(this, '/bills')">
            <MenuItem name="bills" >
              <Icon type="ios-navigate"></Icon>
              {{ $t('menu.billItemText') }}
            </MenuItem>
          </nuxt-link>
          <nuxt-link class="menu-item" :class="{'menu-item-selected': activeMenuItem === 'votes'}" :to="path(this, '/votes')">
            <MenuItem name="votes">
              <Icon type="ios-navigate"></Icon>
              {{ $t('menu.votesItemText') }}
            </MenuItem>
          </nuxt-link>
          <nuxt-link class="menu-item" :class="{'menu-item-selected': activeMenuItem === 'members'}" :to="path(this, '/members')">
            <MenuItem name="members">
              <Icon type="ios-keypad"></Icon>
              {{ $t('menu.congressMemberItemText') }}
            </MenuItem>
          </nuxt-link>
        </div>
        <!-- INFO -->
        <div class="header-info">
          <!-- <UserInfo></UserInfo> -->
          <LangSwitch></LangSwitch>
        </div>
      </div>
    </div>
  </Menu>
</template>

<script>
import Logo from './Logo'
import UserInfo from './UserInfo'
import LangSwitch from './LangSwitch'
import { path } from '@/plugins/locale'

export default {
  props: {},
  data () {
    return {
      isMenuOpen: false
    }
  },
  computed: {
    localeStrippedPath () {
      let regex = new RegExp('/' + this.$i18n.locale + '/', 'g')
      return this.$route.fullPath.replace(regex, '/')
    },
    activeMenuItem () {
      let currentItem = this.localeStrippedPath.split('/')[1]
      return currentItem === '' ? 'home' : currentItem
    }
  },
  methods: {
    onHamburgerClick (event) {
      this.isMenuOpen = !this.isMenuOpen
    },
    onMenuSelect (selectedItemName) {
      this.activeMenuItem = selectedItemName
    },
    path
  },
  components: {
    Logo,
    UserInfo,
    LangSwitch
  }
}
</script>>

<style scoped lang="scss">
@import 'src/assets/css/app';

.header {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 1264px;
  padding-left: 64px;
  padding-right: 64px;
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.header-menu-hamburger {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  display: block;
  transform: translate(0);
  padding: 13px 20px 0;

  &.isMenuOpen span {
    opacity: 0;
  }

  span {
    background: #fff;
    border-radius: 3px;
    content: '';
    display: block;
    height: 2px;
    margin: 7px 0;
    transition: all 0.2s ease-out;
    transform-origin: 50% 50%;
    width: 26px;
  }

  &.isMenuOpen:before {
    transform: rotate(45deg) translate(4px, 8px);
  }

  &.isMenuOpen:after {
    transform: rotate(-45deg) translate(4px, -8px);
  }

  &:before {
    background: #fff;
    border-radius: 3px;
    content: '';
    display: block;
    height: 2px;
    margin: 7px 0;
    transition: all 0.2s ease-out;
    transform-origin: 50% 50%;
    width: 26px;
  }

  &:after {
    background: #fff;
    border-radius: 3px;
    content: '';
    display: block;
    height: 2px;
    margin: 7px 0;
    transition: all 0.2s ease-out;
    transform-origin: 50% 50%;
    width: 26px;
  }
}

.header-menu {
  display: flex;
  justify-content: center;
}

.menu-item-selected {
  background-color: #40444f;
}

.header-info {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: #{$largeDeviceWidth}) {
  .header-nav {
    opacity: 0;
    transition: opacity 0.3s;
    visibility: hidden;
    background-color: #4a505e;
    color: #fff;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    flex-direction: column;
    justify-content: flex-start;

    &.isMenuOpen {
      opacity: 1;
      visibility: visible;
    }
  }

  .header-menu {
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
  }

  .menu-item {
    width: 100%;
    display: flex;
    justify-content: center;

    .ivu-menu-item {
      font-size: 1.15em;
    }
  }
}

@media screen and (min-width: #{$largeDeviceWidthPlusOne}) {
  .header-menu-hamburger {
    display: none;
  }
}
</style>
