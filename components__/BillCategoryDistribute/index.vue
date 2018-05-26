<template>
  <div>
    <Slider 
      v-model="congressListRange" 
      :step="1" 
      :min="congressListMin"
      :max="congressListMax"
      @on-change="onCongressListRangeChanged"
      show-stops
    range />

    <svg width="960" height="500"></svg>
  </div>
</template>
<script>
export default {
  data () {
    return {
      congressListMin: 110,
      congressListMax: 115,
      congressListRange: [110, 115],
      congressList: [
        110,
        111,
        112,
        114,
        115
      ],
      billCountByCongress: {
        '110': 5,
        '111': 10,
        '112': 34,
        '113': 78,
        '114': 12,
        '115': 87
      }
    }
  },

  methods: {
    onCongressListRangeChanged (value) {
      console.log(value)

      const min = value[0]
      const max = value[1]

      const result = []

      for (let i = min; i <= max; i++) {
        result.push(i)
      }
      this.congressList = result

      console.log('result: ', result)
      console.log('this.congressList: ', this.congressList)
    },
    renderChart () {
      const d3 = require('d3')
      const svg = d3.select('svg')

      svg.selectAll('*').remove()

      const margin = {top: 20, right: 20, bottom: 30, left: 40}
      const width = +svg.attr('width') - margin.left - margin.right
      const height = +svg.attr('height') - margin.top - margin.bottom

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
      const y = d3.scaleLinear().rangeRound([height, 0])

      const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      const ids = this.congressList
      const countById = this.billCountByCongress

      x.domain(ids.map((id) => { return id }))
      y.domain([0, d3.max(ids, (id) => { return countById[id] })])

      g.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x))

      g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3.axisLeft(y))
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Count')

      g.selectAll('.bar')
        .data(ids)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (id) => { return x(id) })
          .attr('y', (id) => { return y(countById[id]) })
          .attr('width', x.bandwidth())
          .attr('height', (id) => { return height - y(countById[id]) })
    }
  },

  mounted () {
    this.renderChart()
  },

  updated () {
    console.log('udpated')
    this.renderChart()
  }
}
</script>
<style scoped>

.bar {
  fill: steelblue;
}

.bar:hover {
  fill: brown;
}

.axis--x path {
  display: none;
}
</style>
