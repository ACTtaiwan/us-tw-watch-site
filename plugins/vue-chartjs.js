import Vue from 'vue'
import { Bar, Line, mixins } from 'vue-chartjs'

// https://gist.github.com/rvanzon/096132b7b46be43659cf26360c664e9a

Vue.component('BarChart', {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

Vue.component('LineChart', {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
