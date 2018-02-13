<template>
  <div class="bill-map">
    <div class="map" id="cd-map" />
    <tooltip :title="tooltipTitle" :sponsors="tooltipSponsors"/>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as topojson from 'topojson'
import tooltip from './tooltip'

export default {
  components: {
    tooltip
  },
  props: ['sponsors', 'usMap', 'stateToFips', 'fipsToState', 'congressMap'],
  data () {
    return {
      tooltipTitle: '',
      tooltipSponsors: [],
      defaultWidth: 900,
      defaultHeight: 500
    }
  },
  computed: {
    projection () {
      return d3
        .geoAlbersUsa()
        .scale(this.defaultWidth)
        .translate([this.defaultWidth / 2, this.defaultHeight / 2])
    },
    svg () {
      let zoom = d3
        .zoom()
        .scaleExtent([1, 12])
        .on('zoom', this.zoomed)

      return d3
        .select('#cd-map')
        .classed('svg-container', true)
        .append('svg')
        .attr('viewBox', `0 0 ${this.defaultWidth} ${this.defaultHeight}`)
        .classed('svg-content-responsive', true)
        .append('g')
        .call(zoom)
        .append('g')
    }
  },

  mounted () {
    this.drawMap()
  },

  methods: {
    zoomed () {
      this.svg.attr('transform', d3.event.transform)
    },
    getGeoNameFromGeoId (id) {
      let name

      if (id.length >= 4) {
        const district = id.slice(-2)
        const fips = id.slice(-4, -2)
        const state = this.fipsToState[fips]
        name = `${state}, ${district}`
      } else {
        const fips = id.slice(-2)
        const state = this.fipsToState[fips]
        name = `${state}`
      }
      console.log('000', id, name)
      return name
    },

    getColorFromSponsor (sponsor) {
      let color = 'gray'

      if (sponsor.party === 'Republican') {
        color = 'red'
      }

      if (sponsor.party === 'Democrat') {
        color = 'blue'
      }

      return color
    },

    getFipsFromStateCode (stateCode) {
      return this.stateToFips[stateCode]
    },

    getId (value) {
      return value.length > 2 ? `ID-${value}` : `ID-${Number(value)}`
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
      return ('0' + value).slice(-2)
    },

    drawMap () {
      let self = this
      const path = d3.geoPath().projection(this.projection)
      const tooltip = d3.select('#tooltip')
      const showDistrict = !!this.sponsors[0].district
      const congress = this.congressMap

      this.svg
        .append('defs')
        .append('path')
        .attr('id', 'land')
        .datum(topojson.feature(this.usMap, this.usMap.objects.land))
        .attr('d', path)

      this.svg
        .append('clipPath')
        .attr('id', 'clip-land')
        .append('use')
        .attr('xlink:href', '#land')

      if (showDistrict) {
        this.svg
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
            const id = self.getId(GEOID)
            return id
          })

        this.svg
          .append('path')
          .attr('class', 'district-boundaries')
          .datum(
            topojson.mesh(congress, congress.objects.districts, function (a, b) {
              return a !== b && ((a.id / 1000) | 0) === ((b.id / 1000) | 0)
            })
          )
          .attr('d', path)
      } else {
        this.svg
          .append('g')
          .attr('class', 'states')
          .attr('clip-path', 'url(#clip-land)')
          .selectAll('path')
          .data(topojson.feature(this.usMap, this.usMap.objects.states).features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('id', function (d) {
            const fips = d.id
            const id = self.getId(fips)
            return id
          })

        this.svg
          .append('path')
          .attr('class', 'state-boundaries')
          .datum(
            topojson.mesh(this.usMap, this.usMap.objects.states, function (a, b) {
              return a !== b
            })
          )
          .attr('d', path)
      }

      const checkedStateOrDistrict = {}

      this.sponsors.forEach(s => {
        const geoId = self.getGeoIdFromSponsor(s)
        const selectedId = self.getId(geoId)
        const name = `${s.person.firstname} ${s.person.lastname}`
        const color = this.getColorFromSponsor(s)
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
        const areSameParty = sameGeoSponsors.slice(1).every(s => s.party === firstParty)

        d3
          .select(`#${selectedId}`)
          .attr('class', 'selected')
          .style('fill', areSameParty ? color : '#875F82')
          .on('mouseover', function (d) {
            const geoName = self.getGeoNameFromGeoId(geoId)
            self.tooltipTitle = geoName
            self.tooltipSponsors = sameGeoSponsors
            return tooltip.style('visibility', 'visible')
          })
          .on('mousemove', function (d) {
            return tooltip.style('top', event.pageY - 10 + 'px').style('left', event.pageX + 10 + 'px')
          })
          .on('mouseout', function () {
            return tooltip.style('visibility', 'hidden')
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bill-map {
  text-align: left;

  .map {
    background: #fff;
    text-align: center;
  }
}
</style>

<style>
path {
  stroke-linejoin: round;
  stroke-linecap: round;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 55%; /* aspect ratio */
  vertical-align: top;
  overflow: hidden;
}
.svg-content-responsive {
  display: inline-block;
  position: absolute;
  left: 0;
}

.states {
  fill: #efefef;
}

.states :hover {
  fill: #a5a5a5;
}

.districts {
  fill: #efefef;
}

.districts :hover {
  fill: #a5a5a5;
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

button {
  padding: 10px 20px;
}
</style>
