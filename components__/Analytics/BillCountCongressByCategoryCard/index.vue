<template>
  <div class="analytic-card" :class="{ phone: this.isPhone }">
    <h1 class="analytic-card-title">Bill count by category</h1>
    <div class="analytic-card-body">
      <div class="analytic-card-info-block">
        <span class="label">Congress ({{ this.congressRange[0] }} - {{ this.congressRange[1] }})</span>
        <Slider class="slider" v-model="congressRange" @on-change="updateChart" :step="1" show-stops range :min="this.congressMin" :max="this.congressMax"></Slider>
      </div>
      <div class="chart-container">
        <div class="chart-loading-overlay" v-if="isChartLoading">
          <Spinner></Spinner>
        </div>
        <BarChart class="chart" :class="{ isLoading: this.isChartLoading }" ref="chart" :chartData="this.chartData" :options="this.chartOptions"></BarChart>
      </div>
    </div>
  </div>

</template>

<script>
import Spinner from '~/components/Spinner'
import CategoryByCongressQuery from '~/apollo/queries/Analytics/CategoryByCongress'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isChartLoading: true,
      congressRange: [114, 115],
      billIdsByCategory: {},
      chartOptions: {
        layout: {
          padding: {
            left: 0,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              categoryPercentage: 1.0,
              barPercentage: 0.5
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.updateChart()
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
    chartData () {
      const labels = this.categories.map(category => category.name.replace(' & ', '&').split(' '))
      const data = this.categories.map(category => this.billIdsByCategory[category.id])
      const dataSet = {
        backgroundColor: 'rgba(0, 51, 78, 0.3)',
        borderColor: 'rgba(0, 51, 78, 1)',
        borderWidth: 1,
        data: data
      }
      return {
        labels,
        datasets: [dataSet]
      }
    }
  },
  methods: {
    prefetchBillIdsByCategory (categoryId) {
      return this.$apollo.query({
        query: CategoryByCongressQuery,
        variables: { lang: this.locale, congress: this.congress, categories: [categoryId] }
      })
    },
    async updateChart () {
      let self = this
      let bills = {}

      this.isChartLoading = true

      Promise.all(this.categories.map(category => this.prefetchBillIdsByCategory(category.id))).then(function (results) {
        self.categories.forEach((category, index) => {
          bills[category.id] = results[index].data.bills[0].prefetchIds.length
          console.log('000', results[index].data.bills[0].prefetchIds.length)
        })
        console.log('bills', bills)
        self.isChartLoading = false
        self.billIdsByCategory = bills
      })
    }
  },
  components: {
    Spinner
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

.slider {
  margin: 0 5px;
}

.chart-container {
  position: relative;

  .chart-loading-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart {
    max-height: 360px;
    position: relative;

    &.isLoading {
      opacity: 0.5;
    }
  }
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
