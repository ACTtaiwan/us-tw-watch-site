<template>
</template>

<script>
// color: '#4FC08D',
// failedColor: '#bf5050',
// duration: 1500

export default {
  mounted () {
    const d3 = require('d3')
    // const queue = require('d3-queue')
    const topojson = require('topojson')

    const width = 960
    const height = 600

    const projection = d3.geo.albersUsa()
        .scale(1280)
        .translate([width / 2, height / 2])

    const path = d3.geo.path()
        .projection(projection)

    const svg = d3.select('#layout-content').append('svg')
        .attr('width', width)
        .attr('height', height)

    // queue()
    //     .defer(d3.json, require('~/assets/us.json'))
    //     .defer(d3.json, require('~/assets/us-cd115-topo.json'))
    //     .await(ready)

    ready(null, require('@/assets/us.json'), require('@/assets/us-cd115-topo.json'))

    function ready (error, us, congress) {
      console.log('us: ', us)
      console.log('congress: ', congress)

      if (error) throw error

      svg.append('defs').append('path')
          .attr('id', 'land')
          .datum(topojson.feature(us, us.objects.land))
          .attr('d', path)

      svg.append('clipPath')
          .attr('id', 'clip-land')
        .append('use')
          .attr('xlink:href', '#land')

      svg.append('g')
          .attr('class', 'districts')
          .attr('clip-path', 'url(#clip-land)')
        .selectAll('path')
          .data(topojson.feature(congress, congress.objects.districts).features)
        .enter().append('path')
          .attr('d', path)
        .append('title')
          .text(function (d) { return d.id })

      svg.append('path')
          .attr('class', 'district-boundaries')
          .datum(topojson.mesh(congress, congress.objects.districts, function (a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0) }))
          .attr('d', path)

      svg.append('path')
          .attr('class', 'state-boundaries')
          .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b }))
          .attr('d', path)
    }

    d3.select(self.frameElement).style('height', height + 'px')
  }
}
</script>

<style>
path {
  stroke-linejoin: round;
  stroke-linecap: round;
}

.districts {
  fill: #bbb;
}

.districts :hover {
  fill: orange;
}

.district-boundaries {
  pointer-events: none;
  fill: none;
  stroke: #fff;
  stroke-width: .5px;
}

.state-boundaries {
  pointer-events: none;
  fill: none;
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
