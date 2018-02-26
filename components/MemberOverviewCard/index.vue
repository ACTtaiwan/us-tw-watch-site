<template>
  <div class="overview-card" :class="{ phone: this.isPhone }">
    <h1 class="overview-card-title">Overview</h1>
    <div class="member-meta">
      <span class="member-meta-info">{{ memberAreaCode }}</span>
      <span class="member-meta-info">{{ members[0].party}}</span>
      <span v-if="isInCongress" class="member-meta-info success">In Congress</span>
    </div>
    <div class="member-profile">
      <img class="avatar" :class="avatarClass" :src="avatarSource" :style="avatarStyle" />
      <div class="member-name-title">
        <h1 class="member-name">{{ members[0].title }} {{ members[0].person.firstname }} {{ members[0].person.middlename }} {{ members[0].person.lastname }}</h1>
        <p class="member-title">{{ memberTitle }} </p>
      </div>
    </div>
    <Row>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Terms -->
        <span class="label">Terms</span>
        <div v-if="terms" class="poptip-block">
          <p class="value stats">{{ terms.length }}</p>
          <Poptip class="poptip" :trigger="this.isPhone ? 'click' : 'hover'" placement="right">
            <Icon type="information-circled"></Icon>
            <div class="poptip-content" slot="content">
              <p v-for="term in terms" :key="term">{{ term }}th</p>
            </div>
          </Poptip>
        </div>
        <BeatLoader v-else class="stats-loader" />
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Vote with party -->
        <span class="label">Vote with party</span>
        <div v-if="ppMember" class="poptip-block">
          <p class="value stats">{{ Number.parseFloat(ppMember.roles[0].votes_with_party_pct).toPrecision(2) }}%</p>
          <Poptip class="poptip" trigger="hover" placement="right">
            <Icon type="information-circled"></Icon>
            <div class="poptip-content" slot="content">
              <p>This is calculated for {{ppMember.roles[0].congress}}th Congress</p>
            </div>
          </Poptip>
        </div>
        <BeatLoader v-else class="stats-loader"/>
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Sponsored -->
        <span class="label">Sponsored bills</span>
        <p class="value stats" v-if="sponsoredBills">{{ sponsoredBills.length }}</p>
        <BeatLoader v-else class="stats-loader" />
      </Col>
      <Col :span="this.isDesktop ? 6 : 12" class="overview-card-info-block">
        <!-- Cosponsored -->
        <span class="label">Cosponsored bills</span>
        <p class="value stats" v-if="cosponsoredBills">{{ cosponsoredBills.length }}</p>
        <BeatLoader v-else class="stats-loader" />
      </Col>
      <Col :span="24" class="overview-card-info-block">
        <!-- Committees -->
        <span class="label">Current Committees</span>
        <p class="value" v-for="committee in ppMember.roles[0].committees" :key="committee.code">{{ committee.name }}
          <span class="note">({{ committee.title.toLowerCase() }})</span>
        </p>
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
      avatarSize: 50
    }
  },
  asyncComputed: {},
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    currentCongress () {
      return this.$store.state.currentCongress
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
    terms () {
      return this.ppMember.roles.map(role => role.congress)
    },
    isInCongress () {
      let isInCongress = false
      this.ppMember.roles.forEach(role => {
        const roleEndDate = new Date(role.end_date).getTime()
        const now = new Date().getTime()
        if (roleEndDate >= now) {
          isInCongress = true
        }
      })
      return isInCongress
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
    @extend .card-title;
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

    &.success {
      color: $twWhite;
      background: $twGreen;
    }
  }
}

.member-profile {
  display: flex;
  align-items: center;
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

    .member-title {
      font-size: 1em;
      color: $twGray;
    }
  }
}

.overview-card-info-block {
  @extend .card-info-block;

  .stats {
    font-size: 1.6em;
  }

  .stats-loader {
    font-size: 1.6em;
  }

  .note {
    color: $twGrayLight;
  }
}

.poptip-block {
  display: flex;

  .poptip {
    margin-left: 5px;
    color: $twGrayLight;
    cursor: pointer;
    font-size: 1em;
  }

  .poptip-content {
    padding: 10px;
    color: $twGrayDark;
    font-size: 14px;
  }
}

.chart {
  max-height: 140px;
  position: relative;
  display: flex;

  &.isLoading {
    opacity: 0.5;
  }
}
</style>
