<template>
  <div>
    <svg width="960" height="500"></svg>
  </div>
</template>
<script>
export default {
  methods: {
    renderChart () {
      const d3 = require('d3')
      const svg = d3.select('svg')
      const margin = {top: 20, right: 80, bottom: 30, left: 50}
      const width = svg.attr('width') - margin.left - margin.right
      const height = svg.attr('height') - margin.top - margin.bottom
      const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      const parseTime = d3.timeParse('%Y%m%d')

      const x = d3.scaleTime().range([0, width])
      const y = d3.scaleLinear().range([height, 0])
      const z = d3.scaleOrdinal(d3.schemeCategory10)

      const line = d3.line()
        .curve(d3.curveBasis)
        .x((d) => { return x(d.date) })
        .y((d) => { return y(d.temperature) })

      d3.tsv('data.tsv', type, (error, data) => {
        if (error) throw error

        const cities = data.columns.slice(1).map((id) => {
          return {
            id: id,
            values: data.map((d) => {
              return {date: d.date, temperature: d[id]}
            })
          }
        })

        x.domain(d3.extent(data, (d) => { return d.date }))

        y.domain([
          d3.min(cities, (c) => { return d3.min(c.values, (d) => { return d.temperature }) }),
          d3.max(cities, (c) => { return d3.max(c.values, (d) => { return d.temperature }) })
        ])

        z.domain(cities.map((c) => { return c.id }))

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
            .attr('fill', '#000')
            .text('Temperature, ºF')

        var city = g.selectAll('.city')
          .data(cities)
          .enter().append('g')
            .attr('class', 'city')

        city.append('path')
            .attr('class', 'line')
            .attr('d', (d) => { return line(d.values) })
            .style('stroke', (d) => { return z(d.id) })

        city.append('text')
            .datum((d) => { return {id: d.id, value: d.values[d.values.length - 1]} })
            .attr('transform', (d) => { return 'translate(' + x(d.value.date) + ',' + y(d.value.temperature) + ')' })
            .attr('x', 3)
            .attr('dy', '0.35em')
            .style('font', '10px sans-serif')
            .text((d) => { return d.id })
      })

      function type (d, _, columns) {
        d.date = parseTime(d.date)
        for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c]
        return d
      }
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
.axis--x path {
  display: none;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
}
</style>
