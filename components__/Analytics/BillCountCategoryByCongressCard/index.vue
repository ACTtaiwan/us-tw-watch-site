<template>
  <div class="analytic-card" :class="{ phone: this.isPhone }">
    <h1 class="analytic-card-title">Bill count by congress</h1>
    <div class="analytic-card-body">
      <div class="analytic-card-info-block">
        <span class="label">Congress ({{ this.congressRange[0] }} - {{ this.congressRange[1] }})</span>
        <Slider class="slider" v-model="congressRange" @on-change="updateChart" :step="1" show-stops range :min="this.congressMin" :max="this.congressMax"></Slider>
      </div>
      <div class="chart-container">
        <div class="chart-loading-overlay" v-if="isChartLoading">
          <Spinner></Spinner>
        </div>
        <LineChart class="chart" :class="{ isLoading: this.isChartLoading }" ref="chart" :chartData="this.chartData" :options="this.chartOptions"></LineChart>
      </div>
    </div>
  </div>

</template>

<script>
import Spinner from '~/components/Spinner'
import CategoryByCongressQuery from '~/apollo/queries/Analytics/CategoryByCongress'
import BillCongressQuery from '~/apollo/queries/Analytics/BillCongress'

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
      congressRange: [112, 115],
      billIdsByCongress: [],
      categoryColorMap: {
        // International Participation
        '6ca1b2d8-9c15-471d-b680-8a5a3712b052': {
          color: 'rgba(54, 162, 235, 1)',
          colorLight: 'rgba(54, 162, 235, 0.3)'
        },
        // Trade & Economy
        'ea86372b-69e5-4102-a087-2e61b73a129a': {
          color: 'rgba(21,170,191, 1)',
          colorLight: 'rgba(21,170,191, 0.3)'
        },
        // Democracy
        '9a6cb046-2f66-4d4b-8148-10b57793341b': {
          color: 'rgba(64,192,87,1)',
          colorLight: 'rgba(64,192,87,0.3)'
        },
        // Arms Sales & Transfer
        '88911008-392b-4934-b05e-516e3574f4bb': {
          color: 'rgba(255, 205, 86, 1)',
          colorLight: 'rgba(255, 205, 86, 0.3)'
        },
        // U.S.-Taiwan Relations
        'a3442a55-c606-42bb-914f-27b876df26c7': {
          color: 'rgba(255, 99, 132, 1)',
          colorLight: 'rgba(238, 110, 133, 0.3)'
        },
        // Appropriation
        '37504cbc-ac87-4146-996a-e2f036f716b8': {
          color: 'rgba(255, 159, 64, 1)',
          colorLight: 'rgba(255, 159, 64, 0.3)'
        },
        // Taiwan's Defense
        '4fcc4e02-4cb5-4248-9be2-70f4c244d8b6': {
          color: 'rgba(130,201,30,1)',
          colorLight: 'rgba(130,201,30,0.3)'
        },
        // Taiwan Relations Act
        'a054cf33-978d-4d74-adeb-a4114da4f96f': {
          color: 'rgba(153, 102, 255, 1)',
          colorLight: 'rgba(153, 102, 255, 0.3)'
        },
        // Other
        '51bd7b94-a7f7-4417-bff6-f41ac6b00c08': {
          color: 'rgba(201, 203, 207, 1)',
          colorLight: 'rgba(201, 203, 207, 0.3)'
        }
      },
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
          display: true,
          position: 'bottom'
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
      // const data = this.categories.map(category => this.billIdsByCongress[category.id])
      console.log('+++', this.billIdsByCongress)
      const datasets = this.billIdsByCongress.map(category => {
        return {
          backgroundColor: this.categoryColorMap[category.id].colorLight,
          borderColor: this.categoryColorMap[category.id].color,
          borderWidth: 2,
          data: category.data,
          fill: false,
          label: category.name,
          lineTension: 0
        }
      })
      return {
        labels: this.congress,
        datasets: datasets
      }
    }
  },
  methods: {
    prefetchBillIds ({ congress, categories }) {
      return this.$apollo.query({
        query: CategoryByCongressQuery,
        variables: { lang: this.locale, congress, categories }
      })
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillCongressQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    async updateChart () {
      this.isChartLoading = true

      Promise.all(
        this.categories.map(async category => {
          let billIds = await this.prefetchBillIds({ congress: this.congress, categories: [category.id] })
          let billsResult = await this.fetchBills(billIds.data.bills[0].prefetchIds)
          let congressMap = {}
          billsResult.data.bills.forEach(bill => {
            congressMap[bill.congress] = congressMap[bill.congress] ? congressMap[bill.congress] + 1 : 1
          })
          return {
            id: category.id,
            name: category.name,
            data: this.congress.map(congress => (congressMap[congress] ? congressMap[congress] : 0))
          }
        })
      )
        .then(result => {
          this.isChartLoading = false
          this.billIdsByCongress = result
        })
        .catch(error => {
          console.log('cannot fetch chart data', error)
        })

      // Promise.all(
      //   this.categories.map(async category => {
      //     let result = await Promise.all(this.congress.map(congress => this.prefetchBillIds({ congress: [congress], categories: [category.id] })))
      //     return {
      //       id: category.id,
      //       name: category.name,
      //       data: result.map(billsByCongress => billsByCongress.data.bills[0].prefetchIds.length)
      //     }
      //   })
      // )
      //   .then(result => {
      //     this.isChartLoading = false
      //     this.billIdsByCongress = result
      //   })
      //   .catch(error => {
      //     console.log('cannot fetch chart data', error)
      //   })
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
