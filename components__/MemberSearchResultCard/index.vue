<template>
  <div class="member-card" :class="{ phone: this.isPhone }">
    <div class="member-meta">
      <span class="member-meta-info">{{ memberAreaCode }}</span>
      <span class="member-meta-info">{{ member.party}}</span>
    </div>
    <div class="member-profile">
      <img class="avatar" :class="avatarClass" :src="avatarSource" :style="avatarStyle" />
      <div class="member-name-title">
        <router-link :to="path(this, `/members/${member.person.id}`)">
          <h1 class="member-name">{{ member.title }} {{ member.person.firstname }} {{ member.person.middlename }} {{ member.person.lastname }}</h1>
        </router-link>
        <p class="area">{{ this.memberTitle }} </p>
      </div>
    </div>

    <div class="member-info">
      <Row>
        <Col :span="this.isDesktop ? 8 : 12" class="member-card-info-block">
          <!-- Sponsored -->
          <span class="label">Sponsored bills</span>
          <p class="value">{{ billIdSponsored }}</p>
        </Col>
        <Col :span="this.isDesktop ? 8 : 12" class="member-card-info-block">
          <!-- Cosponsored -->
          <span class="label">Cosponsored bills</span>
          <p class="value">{{ billIdCosponsored }}</p>
        </Col>
        <Col :span="this.isDesktop ? 8 : 12" class="member-card-info-block">
          <!-- Social Media -->
          <span class="label">Social Media</span>
          <p class="value">
            <a v-if="twitterLink" :href="twitterLink" target="_blank"><img class="social twitter" :src="twitterLogo"/></a>
            <a v-if="youtubeLink" :href="youtubeLink" target="_blank"><img class="social youtube" :src="youtubeLogo"/></a>
            <a v-if="facebookLink" :href="facebookLink" target="_blank"><img class="social facebook" :src="facebookLogo"/></a>
            <a v-if="cspanLink" :href="cspanLink" target="_blank"><img class="social cspan" :src="cspanLogo"/></a>
          </p>
        </Col>
        <Col :span="this.isDesktop ? 8 : 12" class="member-card-info-block">
          <!-- Website -->
          <span class="label">Website</span>
          <a class="value link" :href="member.website" target="_blank">{{ member.website }}</a>
        </Col>
        <Col :span="24" class="member-card-info-block" v-if="lastSupportBill.time">
          <!-- Last Support Bill -->
          <span class="label">Last supported bill</span>
          <p class="value">{{ lastSupportBill.bill.billCode }} - {{ lastSupportBill.bill.title | truncate(200) }}
            <span class="support-bill">({{ lastSupportBill.role }} on <span class="date">{{ lastSupportBill.time | localTime }}</span>)</span>
          </p>
        </Col>
      </Row>
    </div>
    <div class="bill-footer">
      <div class="social">
        <TwButton class="social-button" icon="android-bookmark" type="icon" style="light"></TwButton>
        <FbShareWrapper :url="path(this, `/members/${member.person.id}`)">
          <TwButton class="social-button" icon="android-share" type="icon" style="light"></TwButton>
        </FbShareWrapper>
      </div>
      <router-link :to="path(this, `/members/${member.person.id}`)">
        <TwButton label="More"></TwButton>
      </router-link>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { path, get } from '@/plugins/utils'
import TwButton from '~/components/TwButton'
import defaultAvatar from '~/assets/img/tw-logo-color.png'
import FbShareWrapper from '~/components/FbShareWrapper'

// logos
import cspanLogo from '~/assets/img/cspan_logo.svg'
import facebookLogo from '~/assets/img/facebook_logo.svg'
import youtubeLogo from '~/assets/img/youtube_logo.svg'
import twitterLogo from '~/assets/img/twitter_logo.svg'

// Queries
import RolesQuery from '~/apollo/queries/MemberLandingPage/Roles'
import BillsQuery from '~/apollo/queries/MemberLandingPage/Bills'

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
      cspanLogo,
      facebookLogo,
      youtubeLogo,
      twitterLogo,
      ppMember: null,
      size: 50,
      billIdCosponsored: 0,
      billIdSponsored: 0,
      lastSupportBill: false
    }
  },
  mounted () {
    const personBioGuideId = this.member.person.bioGuideId
    const personId = this.member.person.id
    this.fetchMemberRoles({ personIds: [personId] })
      .then(result => {
        let sponsored = []
        let cosponsored = []
        let latestBills = []
        let latestCongress = 0

        result.data.members.forEach(member => {
          const maxCongressNumber = _.max(member.congressNumbers)
          if (maxCongressNumber > latestCongress && (member.billIdCosponsored || member.billIdSponsored)) {
            latestCongress = _.max(member.congressNumbers)
            latestBills = []
            latestBills = member.billIdCosponsored ? [...latestBills, ...member.billIdCosponsored] : latestBills
            latestBills = member.billIdSponsored ? [...latestBills, ...member.billIdSponsored] : latestBills
          }
          cosponsored = member.billIdCosponsored ? [...cosponsored, ...member.billIdCosponsored] : cosponsored
          sponsored = member.billIdSponsored ? [...sponsored, ...member.billIdSponsored] : sponsored
        })

        this.billIdCosponsored = cosponsored.length
        this.billIdSponsored = sponsored.length

        return this.fetchBills(latestBills)
      })
      .then(({ data }) => {
        let lastSupportBill = { role: '', time: null, bill: '' }

        data.bills.forEach(bill => {
          if (bill.sponsor.person.id === personId && Number(bill.introducedDate) > lastSupportBill.time) {
            lastSupportBill.role = 'sponsored'
            lastSupportBill.time = Number(bill.introducedDate)
            lastSupportBill.bill = bill
          }
          bill.cosponsors.forEach(cosponsor => {
            if (cosponsor.role.person.id === personId && Number(cosponsor.dateCosponsored) > lastSupportBill.time) {
              lastSupportBill.role = 'cosponsored'
              lastSupportBill.time = Number(cosponsor.dateCosponsored)
              lastSupportBill.bill = bill
            }
          })
        })

        this.lastSupportBill = lastSupportBill
      })
      .catch(error => {
        console.log('get all roles data error -->', error)
      })
    this.fetchProPublicaMember(personBioGuideId)
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
    twitterLink () {
      return this.ppMember && this.ppMember.twitter_account ? `https://twitter.com/${this.ppMember.twitter_account}` : null
    },
    facebookLink () {
      return this.ppMember && this.ppMember.facebook_account ? `https://www.facebook.com/${this.ppMember.facebook_account}` : null
    },
    youtubeLink () {
      return this.ppMember && this.ppMember.youtube_account ? `https://www.youtube.com/user/${this.ppMember.youtube_account}` : null
    },
    cspanLink () {
      return this.ppMember && this.ppMember.cspan_id ? `https://www.c-span.org/person/?${this.ppMember.cspan_id}` : null
    }
  },
  methods: {
    path,
    fetchMemberRoles ({ personIds }) {
      return this.$apollo.query({
        query: RolesQuery,
        variables: { lang: this.locale, personIds }
      })
    },
    fetchBills (ids) {
      return this.$apollo.query({
        query: BillsQuery,
        variables: { lang: this.locale, ids: ids }
      })
    },
    async fetchProPublicaMember (bioGuideId) {
      const response = await get(`https://api.propublica.org/congress/v1/members/${bioGuideId}.json`)
      this.ppMember = response.data.results[0]
    }
  },
  components: {
    TwButton,
    FbShareWrapper
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

  .social {
    margin-right: 12px;
  }

  .twitter {
    width: 18px;
  }

  .youtube {
    width: 22px;
  }

  .facebook {
    width: 16px;
  }

  .cspan {
    width: 44px;
    margin-bottom: 2px;
  }

  .link {
    color: $twIndigo;
    text-decoration: underline;
  }

  .support-bill {
    color: $twGrayLight;
  }
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
