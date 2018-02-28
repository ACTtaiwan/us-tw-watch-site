<template>
  <div class="analytic-card" :class="{ phone: this.isPhone }">
    <h1 class="analytic-card-title">Sponsorship of bills by states</h1>
    <div class="analytic-card-body">
      <div class="analytic-card-info-block">
        <span class="label">Congress ({{ this.congressRange[0] }} - {{ this.congressRange[1] }})</span>
        <Slider class="slider" v-model="congressRange" @on-change="updateChart" :step="1" show-stops range :min="this.congressMin" :max="this.congressMax"></Slider>
      </div>
      <div class="chart-container">
        <BillCountMap v-if="mapUtils && bills && isInitiated"
          v-show="!isChartLoading"
          mapId="sponsored-bill-count-map"
          :bills="bills"
          :usMap="usMap"
          :stateToFips="stateToFips"
          :fipsToState="fipsToState">
        </BillCountMap>
        <!-- loader -->
        <div class="overlay-container" v-if="isChartLoading && isInitiated">
          <div class="overlay-block">
            <Spinner></Spinner>
          </div>
        </div>
        <!-- Initializer -->
        <div class="overlay-container" v-if="!isInitiated">
          <div class="overlay-block">
            <TwButton label="Start Analysis" @press="onInitChart"></TwButton>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Spinner from '~/components/Spinner'
import TwButton from '~/components/TwButton'
import BillCountMap from '~/components/Analytics/BillCountMap'
// Queries
import queryMapUtils from '~/apollo/queries/mapUtils'
import PrefetchBillsByCongressQuery from '~/apollo/queries/Analytics/PrefetchBillsByCongress'
import BillSponsorQuery from '~/apollo/queries/Analytics/BillSponsor'

export default {
  props: {},
  data () {
    return {
      isChartLoading: true,
      isInitiated: false,
      congressRange: [114, 115],
      mapUtils: null,
      bills: null
    }
  },
  mounted () {
    // this.updateChart()
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    congressMax () {
      return this.$store.state.currentCongress
    },
    congressMin () {
      return this.$store.state.earliestCongress
    },
    congress () {
      let congress = []
      for (var i = this.congressRange[0]; i <= this.congressRange[1]; i++) {
        congress.push(i)
      }
      return congress
    },
    usMap () {
      return JSON.parse(this.mapUtils.usMap)
    },
    stateToFips () {
      return JSON.parse(this.mapUtils.stateToFips)
    },
    fipsToState () {
      return JSON.parse(this.mapUtils.fipsToState)
    }
  },
  methods: {
    onInitChart () {
      this.isInitiated = true
      this.updateChart()
    },
    prefetchBillIds ({ congress }) {
      return this.$apollo.query({
        query: PrefetchBillsByCongressQuery,
        variables: { lang: this.locale, congress }
      })
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillSponsorQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    async asyncForEach (array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
      }
    },
    getChunckedArray (array, chunckSize = 10) {
      let chunck = 0
      const chunckedIds = []
      for (var i = 0; i < array.length; i += chunckSize) {
        chunckedIds[chunck] = array.slice(i, i + chunckSize)
        chunck++
      }
      return chunckedIds
    },
    async updateChart () {
      this.isChartLoading = true

      let response = await this.prefetchBillIds({ congress: this.congress })
      let billIds = response.data.bills[0].prefetchIds
      let bills = []
      await this.asyncForEach(this.getChunckedArray(billIds, 40), async idsSubset => {
        let result = await this.fetchBills(idsSubset)
        bills = [...bills, ...result.data.bills]
        console.log('+++++')
      })

      this.isChartLoading = false

      console.log('wwwww', bills)
      this.bills = bills
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
    }
  },
  components: {
    Spinner,
    TwButton,
    BillCountMap
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.analytic-card {
  @extend .card;
  margin-bottom: 20px;

  .analytic-card-title {
    @extend .card-title;
  }
}

.analytic-card-info-block {
  @extend .card-info-block;
}

.overlay-container {
  padding-top: 55%;
  position: relative;
  display: flex;
  justify-content: center;

  .overlay-block {
    position: absolute;
    top: 40%;
  }
}

.slider {
  margin: 0 5px;
}

.chart-container {
  position: inherit;
}
</style>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-slider-bar {
  background: $twIndigo;
}

.ivu-slider-button,
.ivu-slider-button-dragging,
.ivu-slider-button:hover {
  border-color: $twIndigo;
}
</style>
