<template>
  <div class="analytic-card" :class="{ phone: this.isPhone }">
    <h1 class="analytic-card-title">Category distribution</h1>
    <div class="analytic-card-body">
      <div class="analytic-card-info-block">
        <span class="label">Congress ({{ this.congressRange[0] }} - {{ this.congressRange[1] }})</span>
        <Slider class="slider" v-model="congressRange" @on-change="updateChart" :step="1" show-stops range :min="this.congressMin" :max="this.congressMax"></Slider>
      </div>
      <ChartjsBar class="chart" ref="chart" :chartData="this.chartData" :options="this.chartOptions"></ChartjsBar>
    </div>
  </div>

</template>

<script>
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
              }
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
        backgroundColor: '#4b8fea',
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

      Promise.all(this.categories.map(category => this.prefetchBillIdsByCategory(category.id))).then(function (results) {
        self.categories.forEach((category, index) => {
          bills[category.id] = results[index].data.bills[0].prefetchIds.length
          console.log('000', results[index].data.bills[0].prefetchIds.length)
        })
        console.log('bills', bills)
        self.billIdsByCategory = bills
      })

      // this.categories.forEach(async category => {
      //   let result = await this.prefetchBillIdsByCategory(category.id)
      //   bills[category.id] = result.data.bills[0].prefetchIds.length
      //   console.log('pp')
      // })

      // for (var i = 0; i < this.categories.length; i++) {
      //   const category = this.categories[i]
      //   let result = await this.prefetchBillIdsByCategory(category.id)
      //   bills[category.id] = result.data.bills[0].prefetchIds.length
      // }
      // console.log('ddd', bills)
      // this.billIdsByCategory = bills
      // console.log('chart', this.$refs.chart)
      // this.$refs.chart.update()
    }
  },
  components: {}
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

.chart {
  height: 400px;
  position: relative;
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
