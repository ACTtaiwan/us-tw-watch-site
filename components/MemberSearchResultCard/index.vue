<template>
  <div class="member-card" :class="{ phone: this.isPhone }">
    <div class="member-meta">
      <span class="member-meta-info">{{ memberAreaCode }}</span>
      <span class="member-meta-info">{{ member.party}}</span>
    </div>
    <div class="member-profile">
      <img class="avatar" :class="avatarClass" :src="avatarSource" :style="avatarStyle" />
      <div class="member-name-title">
        <router-link :to="path(this, `/members/${member.id}`)">
          <h1 class="member-name">{{ member.title }} {{ member.person.firstname }} {{ member.person.middlename }} {{ member.person.lastname }}</h1>
        </router-link>
        <p class="area">{{ this.memberTitle }} </p>
      </div>
    </div>

    <div class="member-info">
      <Row>
        <Col :span="this.isDesktop ? 6 : 12" class="member-card-info-block">
          <!-- Sponsored -->
          <span class="label">Sponsored bills</span>
          <p class="value">{{ billIdSponsored }}</p>
        </Col>
        <Col :span="this.isDesktop ? 6 : 12" class="member-card-info-block">
          <!-- Cosponsored -->
          <span class="label">Cosponsored bills</span>
          <p class="value">{{ billIdCosponsored }}</p>
        </Col>
        <Col :span="this.isDesktop ? 6 : 12" class="member-card-info-block">
          <!-- Social media -->
          <span class="label">Social media</span>
          <!-- <p class="value">{{ bill.cosponsors ? bill.cosponsors.length : 0 }}</p> -->
        </Col>
        <Col :span="this.isDesktop ? 6 : 12" class="member-card-info-block">
          <!-- Website -->
          <span class="label">Website</span>
          <!-- <div v-if="bill.categories">
            <span class="value bill-category" v-for="category in bill.categories" :key="category.id">
              <Icon type="social-codepen-outline"></Icon>
            </span>
          </div>
          <span v-else class="value">none</span> -->
        </Col>
      </Row>
    </div>
    <div class="bill-footer">
      <div class="social">
        <TwButton class="social-button" icon="android-bookmark" type="icon" style="light"></TwButton>
        <TwButton class="social-button" icon="android-share" type="icon" style="light"></TwButton>
      </div>
      <router-link :to="path(this, `/members/${member.id}`)">
        <TwButton label="More"></TwButton>
      </router-link>
    </div>
  </div>
</template>
<script>
import { path } from '@/plugins/locale'
import defaultAvatar from '~/assets/img/tw-logo-color.png'
import TwButton from '~/components/TwButton'
// Queries
import RolesQuery from '~/apollo/queries/MemberLandingPage/Roles'

export default {
  props: {
    member: {
      type: Object,
      required: true
    },
    states: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      size: 50,
      billIdCosponsored: 0,
      billIdSponsored: 0
    }
  },
  mounted () {
    this.fetchMemberRoles({ personIds: [this.member.person.id] })
      .then(result => {
        this.billIdCosponsored = result.data.members.reduce((accumulator, member) => {
          const billNum = member.billIdCosponsored ? member.billIdCosponsored.length : 0
          return accumulator + billNum
        }, 0)
        this.billIdSponsored = result.data.members.reduce((accumulator, member) => {
          const billNum = member.billIdSponsored ? member.billIdSponsored.length : 0
          return accumulator + billNum
        }, 0)
      })
      .catch(error => {
        console.log('get all roles data error -->', error)
      })
  },
  computed: {
    locale () {
      return this.$store.state.locale
    },
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    avatarSource () {
      const pictures = this.member.person.profilePictures
      return pictures && pictures.tiny ? pictures.tiny : defaultAvatar
    },
    avatarStyle () {
      return `
        object-fit: cover;
        width: ${this.size}px;
        height: ${this.size}px;
      `
    },
    avatarClass () {
      let color = ''
      switch (this.member.party) {
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
      if (this.member.district) {
        return `${this.member.state}-${this.member.district}`
      } else {
        return `${this.member.state}`
      }
    },
    memberTitle () {
      const lang = { 'en-us': 'en', 'zh-tw': 'zh' }[this.$store.state.locale]

      if (!this.states) return ''
      if (this.member.district) {
        return `${this.member.titleLong} for ${this.states[this.member.state][lang]}'s ${this.member.district}th district`
      } else {
        return `${this.member.titleLong} for ${this.states[this.member.state][lang]}`
      }
    },
    billType () {
      return {
        s: 'Bill',
        hr: 'Bill',
        hconres: 'Concurrent Resolution',
        sconres: 'Concurrent Resolution',
        hres: 'Resolution',
        sres: 'Resolution',
        hjres: 'Joint Resolution',
        sjres: 'Joint Resolution'
      }[this.bill.billType.code]
    },
    billProgress () {
      const totalSteps = this.bill.trackers.length
      let currentStep
      this.bill.trackers.forEach((step, index) => {
        if (step.selected) currentStep = index + 1
      })
      return currentStep / totalSteps * 100
    },
    billLatestAction () {
      let latestActionTime = 0
      let latestAction = ''
      this.bill.actions.forEach(action => {
        if (action.datetime > latestActionTime) {
          latestAction = action.description
          latestActionTime = action.datetime
        }
      })
      // strip html tags from the string
      var dom = document.createElement('DIV')
      dom.innerHTML = latestAction
      return dom.textContent || dom.innerText || ''
    }
  },
  methods: {
    path,
    fetchMemberRoles ({ personIds }) {
      return this.$apollo.query({
        query: RolesQuery,
        variables: { lang: this.locale, personIds }
      })
    }
  },
  components: {
    TwButton
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.member-card {
  @extend .card;
  margin-bottom: 20px;
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

      &:hover {
        color: $twIndigo;
      }
    }
  }
}

.member-card-info-block {
  @extend .card-info-block;
}

.bill-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;

  .social {
    .social-button {
      margin-right: 10px;

      &:last-child {
        margin-right: 0px;
      }
    }
  }
}
</style>
