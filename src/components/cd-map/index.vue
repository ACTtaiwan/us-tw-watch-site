<template>
  <div id="cd-map" />
</template>

<script>
export default {
  props: ['state', 'district', 'highlightColor'],

  data () {
    const stateCodeToFipsMap = require('@/assets/json/stateCodeToFips.json')
    return {
      stateCodeToFipsMap
    }
  },

  methods: {
    getFipsFromStateCode (stateCode) {
      const fips = this.stateCodeToFipsMap[stateCode]
      return fips
    },

    getId (value) {
      return `ID-${value}`
    },

    getFormattedNumber (value) {
      const formattedNumber = ('0' + value).slice(-2)
      return formattedNumber
    },

    drawMap ({ getId, selectedId, selectedColor, d3, topojson }) {
      const width = 960
      const height = 600

      const projection = d3.geo
        .albersUsa()
        .scale(1280)
        .translate([width / 2, height / 2])

      const path = d3.geo.path().projection(projection)

      const svg = d3
        .select('#cd-map')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      const us = require('@/assets/json/us.json')
      const congress = require('@/assets/json/us-cd115-topo.json')

      svg
        .append('defs')
        .append('path')
        .attr('id', 'land')
        .datum(topojson.feature(us, us.objects.land))
        .attr('d', path)

      svg
        .append('clipPath')
        .attr('id', 'clip-land')
        .append('use')
        .attr('xlink:href', '#land')

      svg
        .append('g')
        .attr('class', 'districts')
        .attr('clip-path', 'url(#clip-land)')
        .selectAll('path')
        .data(topojson.feature(congress, congress.objects.districts).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('id', function (d) {
          const GEOID = d.properties.GEOID
          const id = getId(GEOID)
          return id
        })
        .append('title')
        .text(function (d) {
          return d.properties.GEOID
        })

      svg
        .append('path')
        .attr('class', 'district-boundaries')
        .datum(
          topojson.mesh(congress, congress.objects.districts, function (a, b) {
            return a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0)
          })
        )
        .attr('d', path)

      svg
        .append('path')
        .attr('class', 'state-boundaries')
        .datum(
          topojson.mesh(us, us.objects.states, function (a, b) {
            return a !== b
          })
        )
        .attr('d', path)

      svg
        .append('g')
        .attr('class', 'states')
        .attr('clip-path', 'url(#clip-land)')
        .selectAll('path')
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('id', function (d) {
          const fips = d.id
          const id = getId(fips)
          return id
        })

      // d3.select(self.frameElement).style('height', height + 'px')
      d3.select(`#${selectedId}`).style('fill', selectedColor)
    }
  },

  computed: {
    selectedId () {
      const fips = this.getFipsFromStateCode(this.state)
      const formattedFips = this.getFormattedNumber(fips)

      if (!this.district) {
        return this.getId(formattedFips)
      }

      const formattedDistrict = this.getFormattedNumber(this.district)
      const GEOID = this.getId(`${formattedFips}${formattedDistrict}`)
      return GEOID
    }
  },

  mounted () {
    const getId = this.getId
    const selectedId = this.selectedId
    const selectedColor = this.highlightColor
    const d3 = require('d3')
    const topojson = require('topojson')

    this.drawMap({
      getId,
      selectedId,
      selectedColor,
      d3,
      topojson
    })
  }
}
</script>

<style>
path {
  stroke-linejoin: round;
  stroke-linecap: round;
}

.states {
  fill: transparent;
}

.districts {
  fill: #bbb;
}

.districts :hover {
  fill: orange;
}

/* .districts.selected{
  fill: red;
} */

/* #ID-5501 {
  fill: red;
} */

.district-boundaries {
  pointer-events: none;
  fill: none;
  stroke: #fff;
  stroke-width: 0.5px;
}

.state-boundaries {
  pointer-events: none;
  fill: none;
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
