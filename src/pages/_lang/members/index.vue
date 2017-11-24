<template>
  <div class="bills-page">
    <section class="banner">
      <div class="banner-wrapper">
        <h1 class="banner-title">{{ this.$t('membersPage.bannerTitle') }}</h1>
      </div>
    </section>
    <div class="table-section">
      <div class="table-section-wrapper">
        <member-table :members="members" :loading="loading" />
      </div>
    </div>
  </div>
</template>
<script>
import MemberTable from '~/components/member-table'
import allMembersQuery from '~/apollo/queries/allMembers'

export default {
  head () {
    return {
      title: `${this.$t('site.title.billsPageTitle')} | ${this.$t('site.title.mainTitle')}`
    }
  },
  data () {
    return {
      members: [],
      loading: 0,
      loading1: false,
      options1: [],
      model14: [],
      loading2: false,
      options2: [],
      placeholder: ''
    }
  },

  methods: {},
  computed: {
    lang () {
      return this.$i18n.locale.split('-')[0]
    }
  },
  apollo: {
    $loadingKey: 'loading',
    members: {
      fetchPolicy: 'network-only',
      query: allMembersQuery
    }
  },
  components: {
    MemberTable
  }
}
</script>
<style scoped lang="scss">
@import 'src/assets/css/app';

.banner {
  background-color: #fff;
  border-bottom: 1px solid #eeeeed;
  position: relative;

  .banner-wrapper {
    height: 200px;
    display: flex;
    align-items: center;
    @extend .pageWrapper-large;

    .banner-title {
      font-size: 2.5em;
      font-weight: 400;
      letter-spacing: 0.05em;
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
