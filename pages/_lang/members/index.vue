<template>
  <div class="members-page">

    <!-- Banner -->
    <section class="banner" :style="bannerStyle" :class="{ tablet: this.isTablet, phone: this.isPhone }">
      <div class="banner-wrapper">

        <div class="text-container">
          <h1 class="banner-title">{{ this.$t('membersPage.bannerTitle') }}</h1>
          <div class="tabs">
            <TabButton class="tab-button" icon="ios-paper" label="Bills" :selected="this.billsTabSelected" @select="selectTab({bills: true, insight: false})"/>
            <TabButton class="tab-button" icon="stats-bars" label="Insight" :selected="this.insightTabSelected" @select="selectTab({bills: false, insight: true})"/>
          </div>
        </div>

        <div class="image-container" >
          <img class="front-img" :src="bannerMembers" />
        </div>
      </div>
    </section>

    <div class="table-section">
      <div class="table-section-wrapper">
        <Spinner :show="loadingMembers"></Spinner>
        <MemberTable :members="members" :loading="loadingMembers" />
      </div>
    </div>
  </div>
</template>
<script>
import bannerBackground from '~/assets/img/banner.png'
import bannerMembers from '~/assets/img/banner-members.png'

import TabButton from '~/components/TabButton'
import Spinner from '~/components/Spinner'
import MemberTable from '~/components/MemberTable'

// import allMembersQuery from '~/apollo/queries/allMembers'

export default {
  head () {
    return {
      title: `${this.$t('site.title.billsPageTitle')} | ${this.$t('site.title.mainTitle')}`
    }
  },
  data () {
    return {
      members: [],
      loadingMembers: true,
      loading1: false,
      options1: [],
      model14: [],
      loading2: false,
      options2: [],
      placeholder: '',
      billsTabSelected: true,
      insightTabSelected: false,
      bannerBackground,
      bannerMembers,
      bannerStyle: `background-image: url("${bannerBackground}"); background-size: cover;`
    }
  },

  methods: {
    selectTab ({ bills, insight }) {
      this.billsTabSelected = bills
      this.insightTabSelected = insight
    }
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    isTablet () {
      return this.$store.getters.isTablet
    }
  },
  apollo: {
    // members: {
    //   fetchPolicy: 'cache-and-network',
    //   query: allMembersQuery,
    //   variables () {
    //     return { lang: this.locale }
    //   },
    //   watchLoading (isLoading, countModifier) {
    //     this.loadingMembers = isLoading
    //   }
    // }
  },
  components: {
    MemberTable,
    Spinner,
    TabButton
  }
}
</script>
<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';
@import 'assets/css/typography';

.banner {
  // desktop
  .banner-wrapper {
    height: 180px;
    display: flex;
    justify-content: space-between;
    @extend .pageWrapper-large;

    .text-container {
      order: 0;
      padding-top: 50px;

      .banner-title {
        display: inline-block;
        font-size: 2em;
        font-weight: $twMedium;
        line-height: 1.1em;
        text-align: left;
        letter-spacing: 0.02em;
        color: $twWhite;
        margin-right: 20px;
      }

      .tabs {
        display: inline-block;
        vertical-align: bottom;
        margin-top: 15px;

        .tab-button {
          margin-right: 10px;

          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }

    .image-container {
      order: 1;
      display: flex;
      margin-right: 100px;

      .front-img {
        width: 200px;
        margin: auto 30px 10px 0;
      }
    }
  }

  // tablet
  &.tablet {
    .banner-wrapper {
      .image-container {
        display: none;
      }
    }
  }

  // phone
  &.phone {
    .banner-wrapper {
      .image-container {
        display: none;
      }
    }
  }
}

.table-section {
  background-color: #f8f8f9;
  padding: 40px 0;

  .table-section-wrapper {
    @extend .pageWrapper-large;
  }
}
</style>
