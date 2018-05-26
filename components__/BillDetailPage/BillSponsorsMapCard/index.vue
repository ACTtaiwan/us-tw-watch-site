<template>
  <div class="sponsors-map-card" :class="{ phone: this.isPhone }">
    <h1 class="sponsors-map-card-title">Sponsors Map</h1>
    <div class="sponsors-map-card-body">
      <div class="sponsors">
        <!-- {{cosponsor.role.person.id}} -->
        <router-link v-for="cosponsor in bill.cosponsors" :key="cosponsor.role.id" :to="path(getThis(), `/members/${cosponsor.role.person.id}`)">
          <Tag :name="cosponsor.role.id"
            :color="{Republican: 'red', Democrat: 'blue'}[cosponsor.role.party]"
            type="dot">
            {{ `${cosponsor.role.person.firstname} ${cosponsor.role.person.lastname} (${cosponsor.role.state})` }}
          </Tag>
        </router-link>

      </div>
      <Spinner v-if="!isMapDataLoaded"></Spinner>
      <SponsorsMap
        v-if="isMapDataLoaded"
        :sponsors="sponsors"
        :usMap="usMap"
        :stateToFips="stateToFips"
        :fipsToState="fipsToState"
        :congressMap="congressMap"/>
    </div>
  </div>

</template>

<script>
import { path } from '@/plugins/utils'
import queryMapUtils from '~/apollo/queries/mapUtils'
import queryCdMap from '~/apollo/queries/cdMap'
import SponsorsMap from '~/components/SponsorsMap'
import Spinner from '~/components/Spinner'

export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    style () {
      return `
        object-fit: cover;
        width: ${this.size}px;
        height: ${this.size}px;
      `
    },
    isMapDataLoaded () {
      let loaded = false
      if (this.mapUtils && this.cdMap) {
        loaded = true
      }
      return loaded
    },
    usMap () {
      return JSON.parse(this.mapUtils.usMap)
    },
    stateToFips () {
      return JSON.parse(this.mapUtils.stateToFips)
    },
    fipsToState () {
      return JSON.parse(this.mapUtils.fipsToState)
    },
    congressMap () {
      return JSON.parse(this.cdMap)
    },
    sponsors () {
      const sponsor = this.bill.sponsor
      const cosponsors = this.bill.cosponsors
      const hasCosponsors = cosponsors && cosponsors.length > 0
      const mainSponsorArray = [sponsor]
      const sponsors = hasCosponsors ? mainSponsorArray.concat(cosponsors.map(cosponsor => cosponsor.role)) : mainSponsorArray
      return sponsors
    }
  },
  apollo: {
    mapUtils: {
      query: queryMapUtils,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          lang: this.locale
        }
      },
      update (data) {
        return data.maps[0]
      }
    },
    cdMap: {
      query: queryCdMap,
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          congress: 115,
          lang: this.locale
        }
      },
      update (data) {
        return data.maps[0].cdMap
      }
    }
  },
  methods: {
    path,
    getThis () {
      return this
    }
  },
  components: {
    SponsorsMap,
    Spinner
  }
}
</script>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-tag-text {
  color: $twGrayDark;
  font-size: 14px;
  font-weight: $twRegular;
}
</style>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.sponsors-map-card {
  @extend .card;
  margin-bottom: 20px;

  .sponsors-map-card-title {
    @extend .card-title;
  }

  .sponsors-map-card-body {
    text-align: center;

    .sponsors {
      text-align: left;
      @extend .textFont;
      margin-bottom: 20px;
    }
  }
}

.paragraph {
  margin-bottom: 20px;
  color: $twGrayDark;
  font-size: 1em;
}
</style>
