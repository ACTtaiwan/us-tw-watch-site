<template>
  <div :style="mapStyle">
    <div id="cd-map">
    </div>
    <tooltip
      :title="tooltipTitle"
      :sponsors="tooltipSponsors"
    />
  </div>
</template>

<script>
import tooltip from './tooltip'

export default {
  components: {
    tooltip
  },

  props: [
    'mapStyle',
    'state',
    'district',
    'highlightColor',
    'sponsors'
  ],

  data () {
    const stateCodeToFipsMap = require('@/assets/json/stateCodeToFips.json')
    const fipsToStateMap = require('@/assets/json/fipsToState.json')

    return {
      stateCodeToFipsMap,
      fipsToStateMap,
      tooltipTitle: '',
      tooltipSponsors: []
    }
  },

  methods: {
    getGeoNameFromGeoId (id) {
      let name

      if (id.length >= 4) {
        const district = id.slice(-2)
        const fips = id.slice(-4, -2)
        const state = this.fipsToStateMap[fips]
        name = `${state}, ${district}`
      } else {
        const fips = id.slice(-2)
        const state = this.fipsToStateMap[fips]
        name = `${state}`
      }

      return name
    },

    getColorFromSponsor (sponsor) {
      const party = sponsor.party

      if (party === 'Republican') {
        return 'red'
      }

      if (party === 'Democrat') {
        return 'blue'
      }

      return 'gray'
    },

    getFipsFromStateCode (stateCode) {
      const fips = this.stateCodeToFipsMap[stateCode]
      return fips
    },

    getId (value) {
      return `ID-${value}`
    },

    getGeoIdFromSponsor (sponsor) {
      const fips = this.getFipsFromStateCode(sponsor.state)
      const formattedFips = this.getFormattedNumber(fips)

      if (!sponsor.district) {
        return formattedFips
      }

      const formattedDistrict = this.getFormattedNumber(sponsor.district)
      const geoId = `${formattedFips}${formattedDistrict}`

      return geoId
    },

    getFormattedNumber (value) {
      const formattedNumber = ('0' + value).slice(-2)
      return formattedNumber
    },

    drawMap ({
      mapStyle,
      getId,
      getGeoNameFromGeoId,
      getGeoIdFromSponsor,
      getColorFromSponsor,
      sponsors,
      d3,
      topojson,
      showDistrict,
      vm
    }) {
      const ratio = 1.5
      const width = 960 * ratio
      const height = 600 * ratio

      const projection = d3.geo
        .albersUsa()
        .scale(width)
        .translate([width / 2, height / 2])

      const path = d3.geo.path().projection(projection)

      const svg = d3
        .select('#cd-map')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      const tooltip = d3.select('#tooltip')

      const us = require('@/assets/json/us.json')

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

      if (showDistrict) {
        const congress = require('@/assets/json/us-cd115-topo.json')

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

        svg
          .append('path')
          .attr('class', 'district-boundaries')
          .datum(
            topojson.mesh(congress, congress.objects.districts, function (a, b) {
              return a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0)
            })
          )
          .attr('d', path)
      } else {
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

        svg
          .append('path')
          .attr('class', 'state-boundaries')
          .datum(
            topojson.mesh(us, us.objects.states, function (a, b) {
              return a !== b
            })
          )
          .attr('d', path)
      }

      const offsetX = parseInt(mapStyle.left.replace('px', ''))
      const checkedStateOrDistrict = {}

      sponsors.forEach((s) => {
        const geoId = getGeoIdFromSponsor(s)
        const selectedId = getId(geoId)
        const name = `${s.person.firstname} ${s.person.lastname}`
        const color = getColorFromSponsor(s)
        const isDuplicate = Object.keys(checkedStateOrDistrict).indexOf(geoId) > -1

        const sponsor = {
          id: s.id,
          party: s.party,
          name,
          color
        }

        if (!isDuplicate) {
          checkedStateOrDistrict[geoId] = [sponsor]
        } else {
          checkedStateOrDistrict[geoId].push(sponsor)
        }

        const sameGeoSponsors = checkedStateOrDistrict[geoId]

        const firstParty = sameGeoSponsors[0].party
        const areSameParty = sameGeoSponsors.slice(1).every((s) => s.party === firstParty)

        d3
          .select(`#${selectedId}`)
          .attr('class', 'selected')
          .style('fill', areSameParty ? color : '#875F82')
          .on('mouseover', function (d) {
            const geoName = getGeoNameFromGeoId(geoId)

            vm.tooltipTitle = geoName
            vm.tooltipSponsors = sameGeoSponsors

            tooltip.style('visibility', 'visible')

            return tooltip
          })
          .on('mousemove', function () {
            tooltip
              .style('top', (d3.event.pageY - 10) + 'px')
              .style('left', (d3.event.pageX + 10 - offsetX) + 'px')

            return tooltip
          })
          .on('mouseout', function () {
            return tooltip.style('visibility', 'hidden')
          })
      })
    }
  },

  mounted () {
    const sponsors = this.sponsors
    const getColorFromSponsor = this.getColorFromSponsor
    const getId = this.getId
    const getGeoNameFromGeoId = this.getGeoNameFromGeoId
    const getStateFromFips = this.getStateFromFips
    const getGeoIdFromSponsor = this.getGeoIdFromSponsor
    const d3 = require('d3')
    const topojson = require('topojson')
    const mapStyle = this.mapStyle

    const showDistrict = !!sponsors[0].district

    this.drawMap({
      mapStyle,
      sponsors,
      getColorFromSponsor,
      getGeoNameFromGeoId,
      getId,
      getStateFromFips,
      getGeoIdFromSponsor,
      d3,
      topojson,
      showDistrict,
      vm: this
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
  fill: #EFEFEF;
}

.states :hover {
  fill: #FFCC00;
}

.districts {
  fill: #EFEFEF;
}

.districts :hover {
  fill: #FFCC00;
}

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
