<template>
  <header>
    <Menu mode="horizontal" theme="light" :active-name="activeMenuItem">
      <div class="header-wrapper">
        <div class="header-menu-hamburger" :class="{isMenuOpen: isMenuOpen}" @click="onHamburgerClick">
          <span></span>
        </div>
        <Logo></Logo>
        <div class="header-nav" :class="{isMenuOpen: isMenuOpen}">
          <!-- MENU -->
          <div class="header-menu">
            <router-link class="menu-item" :class="{'menu-item-selected': activeMenuItem === 'bills'}" :to="path(this, '/bills')">
              <MenuItem name="bills" >
                {{ $t('site.menu.billItemText') }}
              </MenuItem>
            </router-link>
            <!-- <router-link class="menu-item" :class="{'menu-item-selected': activeMenuItem === 'votes'}" :to="path(this, '/votes')">
              <MenuItem name="votes">
                {{ $t('site.menu.votesItemText') }}
              </MenuItem>
            </router-link> -->
            <router-link class="menu-item" :class="{'menu-item-selected': activeMenuItem === 'members'}" :to="path(this, '/members')">
              <MenuItem name="members">
                {{ $t('site.menu.congressMemberItemText') }}
              </MenuItem>
            </router-link>
          </div>
          <!-- INFO -->
          <div class="header-info">
            <UserInfo></UserInfo>
            <LangSwitch></LangSwitch>
          </div>
        </div>
      </div>
    </Menu>
  </header>
</template>

<script>
import Logo from './Logo'
import UserInfo from './UserInfo'
import LangSwitch from './LangSwitch'
import { path } from '@/plugins/utils'

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
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}

.header-wrapper {
  display: flex;
  justify-content: center;
  @extend .pageWrapper-large;
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
    background: $twBlack;
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
    background: $twBlack;
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
    background: $twBlack;
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

.menu-item {
  .ivu-menu-item {
    color: $twBlack;
    font-weight: $twMedium;
    font-size: 1.1em;

    &:hover {
      border-bottom: none;
    }
  }
}

.menu-item-selected {
  .ivu-menu-item {
    border-bottom: none;
  }
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
