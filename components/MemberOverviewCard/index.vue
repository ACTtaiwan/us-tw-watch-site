<template>
  <div class="overview-card" :class="{ phone: this.isPhone }">
    <div class="member-meta">
      <span class="member-meta-info">{{ memberAreaCode }}</span>
      <span class="member-meta-info">{{ members[0].party}}</span>
    </div>
    <div class="member-profile">
      <img class="avatar" :class="avatarClass" :src="avatarSource" :style="avatarStyle" />
      <div class="member-name-title">
        <h1 class="member-name">{{ members[0].title }} {{ members[0].person.firstname }} {{ members[0].person.middlename }} {{ members[0].person.lastname }}</h1>
        <p class="area">{{ memberTitle }} </p>
        <p class="area">{{ members[0].person.bioGuideId }} </p>
      </div>
    </div>
    <Row>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Sponsored -->
        <span class="label">In office</span>
        <p class="value" v-if="sponsoredBills">{{ sponsoredBills.length }}</p>
        <BeatLoader v-else />
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Sponsored -->
        <span class="label">Sponsored</span>
        <p class="value" v-if="sponsoredBills">{{ sponsoredBills.length }}</p>
        <BeatLoader v-else />
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Cosponsored -->
        <span class="label">Cosponsored</span>
        <p class="value" v-if="cosponsoredBills">{{ cosponsoredBills.length }}</p>
        <BeatLoader v-else />
      </Col>
      <Col :span="this.isDesktop ? 12 : 24" class="overview-card-info-block">
        <!-- Cosponsors -->
        <span class="label">Cosponsors</span>
        <DoughnutChart class="chart" :class="{ isLoading: this.isChartLoading }" ref="chart" :chartData="this.chartData" :options="this.chartOptions"></DoughnutChart>
        <!-- <p class="value">{{ bill.cosponsors ? bill.cosponsors.length : 0 }}</p> -->
      </Col>
    </Row>
  </div>

</template>

<script>
import defaultAvatar from '~/assets/img/tw-logo-color.png'
import BeatLoader from '~/components/BeatLoader'

export default {
  props: {
    ppMember: {
      type: Object,
      required: true
    },
    members: {
      type: Array,
      required: true
    },
    memberTitle: {
      type: String,
      required: true
    },
    sponsoredBills: {
      type: Array,
      required: false
    },
    cosponsoredBills: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      avatarSize: 50,
      chartOptions: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    style () {
      return `
        object-fit: cover;
        width: ${this.size}px;
        height: ${this.size}px;
      `
    },
    avatarSource () {
      const pictures = this.members[0].person.profilePictures
      return pictures && pictures.medium ? pictures.medium : defaultAvatar
    },
    avatarStyle () {
      return `
        object-fit: cover;
        width: ${this.avatarSize}px;
        height: ${this.avatarSize}px;
      `
    },
    avatarClass () {
      let color = ''
      switch (this.members[0].party) {
        case 'Republican':
          color = 'red'
          break
        case 'Democrat':
          color = 'blue'
          break
        default:
          color = 'gray'
          break
      }
      return color
    },
    memberAreaCode () {
      if (this.members[0].district) {
        return `${this.members[0].state}-${this.members[0].district}`
      } else {
        return `${this.members[0].state}`
      }
    },
    chartData () {
      // const labels = this.categories.map(category => category.name.replace(' & ', '&').split(' '))
      // const data = this.categories.map(category => this.billIdsByCategory[category.id])
      const dataSet = {
        backgroundColor: ['#D46763', '#4792D5', '#333333', '#D46763', '#4792D5'],
        borderColor: 'rgba(0, 51, 78, 1)',
        borderWidth: 1,
        data: [3, 5, 6, 3, 2]
      }
      return {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [dataSet]
      }
    }
  },
  components: {
    BeatLoader
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.overview-card {
  @extend .card;
  margin-bottom: 20px;

  .overview-card-title {
    font-weight: $twSemiBold;
    color: $twGrayDark;
    font-size: 1.4em;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}

.member-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .member-meta-info {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twGrayLight;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;
  }
}

.member-profile {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  .avatar {
    border-radius: 50%;
    border-style: solid;
    border-width: 3px;
    margin-right: 10px;

    &.red {
      border-color: $twRed;
    }

    &.blue {
      border-color: $twBlue;
    }

    &.gray {
      border-color: $twGrayLight;
    }
  }

  .member-name-title {
    .member-name {
      font-size: 1.4em;
      color: $twGrayDark;
      font-weight: $twSemiBold;
    }
  }
}

.overview-card-info-block {
  @extend .card-info-block;
}

.chart {
  max-height: 140px;
  position: relative;
  display: flex;

  &.isLoading {
    opacity: 0.5;
  }
}

.bill-sponsor {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .avatar {
    border-radius: 50%;
    border-style: solid;
    border-width: 3px;
    margin-right: 10px;

    &.red {
      border-color: $twRed;
    }

    &.blue {
      border-color: $twBlue;
    }

    &.gray {
      border-color: $twGrayLight;
    }
  }

  .name {
    font-size: 1em;
    color: $twGrayDark;
    // font-weight: $twSemiBold;
  }

  .area {
    font-size: 1em;
    color: $twGrayDark;
    // font-weight: $twSemiBold;
  }
}

.bill-tracker {
  margin-top: 20px;
}
</style>
