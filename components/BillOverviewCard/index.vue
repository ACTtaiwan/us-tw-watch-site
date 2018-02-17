<template>
  <div class="overview-card" :class="{ phone: this.isPhone }">
    <h1 class="overview-card-title">Overview</h1>
    <Row>
      <Col :span="24" class="overview-card-info-block">
        <!-- Sponsor -->
        <span class="label">Sponsor</span>
        <div class="bill-sponsor">
          <img class="avatar" :src="defaultAvatar" :style="avatarStyle" />
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
        <div v-if="bill.categories">
          <span class="value bill-category" v-for="category in bill.categories" :key="category.id">
            <Icon type="social-codepen-outline"></Icon>
          </span>
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
import defaultAvatar from '~/assets/img/defaultAvatar.jpeg'

export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      defaultAvatar,
      avatarSize: 40
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
    avatarStyle () {
      return `
        object-fit: cover;
        width: ${this.avatarSize}px;
        height: ${this.avatarSize}px;
      `
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
}

.bill-sponsor {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .avatar {
    border-radius: 50%;
    border: 2px solid $twBlue;
    margin-right: 10px;
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
