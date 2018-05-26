<template>
  <div class="overview-card" :class="{ phone: this.isPhone }">
    <h1 class="overview-card-title">Overview</h1>
    <div class="bill-meta">
      <span class="bill-meta-info">{{ bill.billCode}}</span>
      <span class="bill-meta-info">{{ bill.billType.code | billType }}</span>
    </div>
    <h1 class="bill-title">{{ bill.title }}</h1>
    <Row>
      <Col :span="24" class="overview-card-info-block">
        <!-- Sponsor -->
        <span class="label">Sponsor</span>
        <div class="bill-sponsor">
          <img class="avatar" :class="avatarClass" :src="avatarSource" :style="avatarStyle" />
          <p class="name">{{ bill.sponsor.title }} {{ bill.sponsor.person.firstname }} {{ bill.sponsor.person.lastname }}</p>
          <p class="area">{{ this.memberArea }} </p>
        </div>
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Congress -->
        <span class="label">Congress</span>
        <p class="value">{{ bill.congress }}th</p>
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Introduced Date -->
        <span class="label">Introduced</span>
        <p class="value">{{ bill.introducedDate | localTime }}</p>
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Cosponsors -->
        <span class="label">Cosponsors</span>
        <p class="value">{{ bill.cosponsors ? bill.cosponsors.length : 0 }}</p>
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Categories -->
        <span class="label">Categories</span>
        <div class="categories" v-if="bill.categories">
          <Tooltip class="value category" v-for="category in bill.categories" :key="category.id" :content="category.name">
            <img :src="categoryMap[category.code]"/>
          </Tooltip>
        </div>
        <span v-else class="value">none</span>
      </Col>
      <Col :span="24" class="overview-card-info-block">
        <!-- Tracker -->
        <span class="label">Status</span>
        <p class="value">{{ billLatestAction | trimConGovAction }}</p>
        <BillTracker class="bill-tracker" :steps="bill.trackers" :progress="billProgress"></BillTracker>
      </Col>
    </Row>
  </div>

</template>

<script>
import BillTracker from '~/components/BillTracker'
import defaultAvatar from '~/assets/img/tw-logo-color.png'

// categories icons
import catAppropriation from '~/assets/img/cat-appropriation.svg'
import catArms from '~/assets/img/cat-arms.svg'
import catUsTw from '~/assets/img/cat-ustaiwan.svg'
import catDemocracy from '~/assets/img/cat-democracy.svg'
import catTrade from '~/assets/img/cat-trade.svg'
import catInternational from '~/assets/img/cat-international.svg'
import catDefense from '~/assets/img/cat-defense.svg'
import catOther from '~/assets/img/cat-other.svg'

export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      avatarSize: 40,
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
      const pictures = this.bill.sponsor.person.profilePictures
      return pictures && pictures.tiny ? pictures.tiny : defaultAvatar
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
      switch (this.bill.sponsor.party) {
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
    memberArea () {
      if (this.bill.sponsor.district) {
        return `, ${this.bill.sponsor.state}-${this.bill.sponsor.district}`
      } else {
        return `, ${this.bill.sponsor.state}`
      }
    },
    billProgress () {
      const totalSteps = this.bill.trackers.length
      let currentStep
      this.bill.trackers.forEach((step, index) => {
        if (step.selected) currentStep = index + 1
      })
      return currentStep / totalSteps * 100
    },
    billLatestAction (a, b, c) {
      let latestActionTime = 0
      let latestAction = ''
      this.bill.actions.forEach(action => {
        if (action.datetime > latestActionTime) {
          latestAction = action.description
          latestActionTime = action.datetime
        }
      })
      if (process.browser) {
        // strip html tags from the string
        var dom = document.createElement('DIV')
        dom.innerHTML = latestAction
        latestAction = dom.textContent || dom.innerText || ''
      }
      return latestAction
    }
  },
  components: {
    BillTracker
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
    @extend .card-title;
  }
}

.overview-card-info-block {
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

.bill-meta {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .bill-meta-info {
    font-size: 1em;
    font-weight: $twSemiBold;
    color: $twGrayLight;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
    margin-right: 5px;

    &.success {
      color: $twWhite;
      background: $twGreen;
    }
  }
}

.bill-title {
  font-size: 1.4em;
  font-weight: $twSemiBold;
  color: $twGrayDark;
  margin-bottom: 20px;
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

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-tooltip-rel {
  display: inherit;
}
</style>
