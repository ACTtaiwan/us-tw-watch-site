<template>
  <div class="cosponsored-bills-card" :class="{ phone: this.isPhone }">
    <h1 class="cosponsored-bills-card-title">Cosponsored Bills ({{ cosponsoredBills.length }})</h1>
    <div class="cosponsored-bills-card-body">
      <Row class="cosponsored-bills-card-charts">
        <Col :span="this.isPhone ? 24 : 18" class="cosponsored-bills-card-info-block">
          <div class="chart-container">
            <DoughnutChart ref="chart"
              class="chart"
              :chartData="this.chartData"
              :options="this.chartOptions">
            </DoughnutChart>
          </div>
        </Col>
      </Row>
      <div class="sponsored-bill-block" v-for="bill in cosponsoredBills" :key="bill.id" :vm="this">
        <div class="bill-meta">
          <span class="bill-code">{{ bill.billCode}}</span>
          <span class="bill-type">{{ bill.billType.code | billType }}</span>
        </div>
        <router-link :to="path(getThis(), `/bills/${bill.id}`)">
          <h1 class="bill-title">{{ bill.title }}</h1>
        </router-link>
        <Row>
          <Col :span="getIsDesktop() ? 6 : 12" class="cosponsored-bills-card-info-block">
            <!-- Congress -->
            <span class="label">Congress</span>
            <p class="value" >{{ bill.congress }}</p>
          </Col>
          <Col :span="getIsDesktop() ? 6 : 12" class="cosponsored-bills-card-info-block">
            <!-- Cosponsors -->
            <span class="label">Cosponsors</span>
            <p class="value" >{{ bill.cosponsors.length }}</p>
          </Col>
          <Col :span="getIsDesktop() ? 6 : 12" class="cosponsored-bills-card-info-block">
            <!-- Introduced Date -->
            <span class="label">Introduced</span>
            <p class="value">{{ bill.introducedDate | localTime }}</p>
          </Col>
          <Col :span="getIsDesktop() ? 6 : 12" class="cosponsored-bills-card-info-block">
            <!-- Categories -->
            <span class="label">Categories</span>
            <div class="categories" v-if="bill.categories">
              <Tooltip class="value category" v-for="category in bill.categories" :key="category.id" :content="category.name">
                <img :src="categoryMap[category.code]"/>
              </Tooltip>
            </div>
            <span v-else class="value">none</span>
          </Col>
          <Col :span="24" class="cosponsored-bills-card-info-block">
            <!-- Tracker -->
            <span class="label">Status</span>
            <p class="value">{{ getBillLatestAction(bill) | trimConGovAction }}</p>
            <BillTracker class="tracker" :steps="bill.trackers" :progress="getBillProgress(bill)"></BillTracker>
          </Col>
        </Row>
        <div class="bill-footer">
          <router-link class="more-btn" :to="path(getThis(), `/bills/${bill.id}`)">
            <TwButton label="More"></TwButton>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { path } from '@/plugins/utils'

// logos
import cspanLogo from '~/assets/img/cspan_logo.svg'
import facebookLogo from '~/assets/img/facebook_logo.svg'
import youtubeLogo from '~/assets/img/youtube_logo.svg'
import twitterLogo from '~/assets/img/twitter_logo.svg'

// categories icons
import catAppropriation from '~/assets/img/cat-appropriation.svg'
import catArms from '~/assets/img/cat-arms.svg'
import catUsTw from '~/assets/img/cat-ustaiwan.svg'
import catDemocracy from '~/assets/img/cat-democracy.svg'
import catTrade from '~/assets/img/cat-trade.svg'
import catInternational from '~/assets/img/cat-international.svg'
import catDefense from '~/assets/img/cat-defense.svg'
import catOther from '~/assets/img/cat-other.svg'

// components
import BillTracker from '~/components/BillTracker'
import TwButton from '~/components/TwButton'

export default {
  props: {
    member: {
      type: Object,
      required: true
    },
    cosponsoredBills: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      cspanLogo,
      facebookLogo,
      youtubeLogo,
      twitterLogo,
      categoryMap: {
        arm: catArms,
        int: catInternational,
        trade: catTrade,
        other: catOther,
        dem: catDemocracy,
        ustw: catUsTw,
        appn: catAppropriation,
        def: catDefense,
        tra: catAppropriation
      },
      chartOptions: {
        legend: {
          display: true,
          position: 'right'
        },
        responsive: true,
        maintainAspectRatio: false
      },
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
      }
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    chartData () {
      let map = {}
      this.cosponsoredBills.forEach(bill => {
        bill.categories.forEach(category => {
          if (!map[category.id]) {
            map[category.id] = { name: category.name, count: 0 }
          }
          map[category.id].count++
        })
      })
      let categories = _.map(map, (value, prop) => ({ id: prop, value: value }))
      const dataSet = {
        backgroundColor: categories.map(category => this.categoryColorMap[category.id].color),
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
        data: categories.map(category => category.value.count)
      }
      return {
        labels: categories.map(category => category.value.name),
        datasets: [dataSet]
      }
    }
  },
  methods: {
    getIsDesktop () {
      return this.$store.getters.isDesktop
    },
    getThis () {
      return this
    },
    getBillLatestAction (bill) {
      let latestActionTime = 0
      let latestAction = ''
      bill.actions.forEach(action => {
        if (action.datetime > latestActionTime) {
          latestAction = action.description
          latestActionTime = action.datetime
        }
      })
      // strip html tags from the string
      var dom = document.createElement('DIV')
      dom.innerHTML = latestAction
      return dom.textContent || dom.innerText || ''
    },
    getBillProgress (bill) {
      const totalSteps = bill.trackers.length
      let currentStep
      bill.trackers.forEach((step, index) => {
        if (step.selected) currentStep = index + 1
      })
      return currentStep / totalSteps * 100
    },
    path
  },
  components: {
    BillTracker,
    TwButton
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.cosponsored-bills-card {
  @extend .card;
  margin-bottom: 20px;

  .cosponsored-bills-card-title {
    @extend .card-title;
  }

  .cosponsored-bills-card-body {
    // max-height: 700px;
    // overflow: scroll;
  }
}

.sponsored-bill-block {
  margin-bottom: 20px;
  border-bottom: 2px solid $twGrayLighter;

  &:last-child {
    border-bottom: none;
  }
}

.bill-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .bill-code {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twGrayLight;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;
  }
  .bill-type {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twGrayLight;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
  }
}

.bill-title {
  font-size: 1.4em;
  color: $twGrayDark;
  font-weight: $twMedium;
  margin-bottom: 20px;

  &:hover {
    color: $twIndigo;
  }
}

.cosponsored-bills-card-charts {
  margin-bottom: 20px;

  .chart-container {
    position: relative;

    .chart {
      max-height: 210px;
      position: relative;
    }
  }
}

.tracker {
  margin-top: 10px;
}

.bill-footer {
  display: flex;
  margin-bottom: 20px;

  .more-btn {
    margin-left: auto;
  }
}

.cosponsored-bills-card-info-block {
  @extend .card-info-block;

  .categories {
    display: flex;
    flex-wrap: wrap;

    .category {
      margin-right: 10px;
      background: $twGrayLighter;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;

      &:last-child {
        margin-right: 0px;
      }

      img {
        height: 14px;
      }
    }
  }
}
</style>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-tooltip-rel {
  display: inherit;
}
</style>
