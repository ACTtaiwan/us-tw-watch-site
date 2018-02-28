<template>
  <div class="contact-card" :class="{ phone: this.isPhone }">
    <h1 class="contact-card-title">Contact</h1>
    <div class="contact-card-body">
      <Row>
        <Col v-if="member.url" :span="24" class="contact-card-info-block">
          <!-- Website -->
          <span class="label">Website</span>
          <a :href="member.url" target="_blank" class="value link" >{{ member.url }}</a>
        </Col>
        <Col :span="24" class="contact-card-info-block">
          <!-- Socail Media -->
          <span class="label">Social Media</span>
          <p class="value">
            <a v-if="twitterLink" :href="twitterLink" target="_blank"><img class="social twitter" :src="twitterLogo"/></a>
            <a v-if="youtubeLink" :href="youtubeLink" target="_blank"><img class="social youtube" :src="youtubeLogo"/></a>
            <a v-if="facebookLink" :href="facebookLink" target="_blank"><img class="social facebook" :src="facebookLogo"/></a>
            <a v-if="cspanLink" :href="cspanLink" target="_blank"><img class="social cspan" :src="cspanLogo"/></a>
          </p>
        </Col>
        <Col v-if="member.roles[0].phone" :span="24" class="contact-card-info-block">
          <!-- Phone -->
          <span class="label">Phone</span>
          <p class="value" >{{ member.roles[0].phone }}</p>
        </Col>
        <Col v-if="member.roles[0].fax" :span="24" class="contact-card-info-block">
          <!-- Fax -->
          <span class="label">Fax</span>
          <p class="value" >{{ member.roles[0].fax }}</p>
        </Col>
        <Col v-if="member.roles[0].office" :span="24" class="contact-card-info-block">
          <!-- Office -->
          <span class="label">Office</span>
          <p class="value" >{{ member.roles[0].office }}</p>
        </Col>
      </Row>
    </div>
  </div>

</template>

<script>
// logos
import cspanLogo from '~/assets/img/cspan_logo.svg'
import facebookLogo from '~/assets/img/facebook_logo.svg'
import youtubeLogo from '~/assets/img/youtube_logo.svg'
import twitterLogo from '~/assets/img/twitter_logo.svg'

export default {
  props: {
    member: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cspanLogo,
      facebookLogo,
      youtubeLogo,
      twitterLogo
    }
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    twitterLink () {
      return this.member.twitter_account ? `https://twitter.com/${this.member.twitter_account}` : null
    },
    facebookLink () {
      return this.member.facebook_account ? `https://www.facebook.com/${this.member.facebook_account}` : null
    },
    youtubeLink () {
      return this.member.youtube_account ? `https://www.youtube.com/user/${this.member.youtube_account}` : null
    },
    cspanLink () {
      return this.member.cspan_id ? `https://www.c-span.org/person/?${this.member.cspan_id}` : null
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.contact-card {
  @extend .card;
  margin-bottom: 20px;

  .contact-card-title {
    @extend .card-title;
  }

  .contact-card-body {
    max-height: 700px;
    overflow: scroll;
  }
}

.contact-card-info-block {
  @extend .card-info-block;

  .link {
    color: $twIndigo;
    text-decoration: underline;
    word-wrap: break-word;
    @extend .textFont;
  }

  .social {
    margin-right: 16px;
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
}
</style>
