<template>
  <router-link :to="path(this, `/bills/${bill.id}`)">
    <div class="card" :class="{ phone: this.isPhone }">
      <div class="bill-meta">
        <span class="bill-code">{{ bill.billCode}}</span>
        <span class="bill-type">{{ this.billType }}</span>
      </div>
      <h1 class="bill-title">{{ bill.title }}</h1>
      <div class="bill-info">
        <Row>
          <Col :span="24" class="info-block">
            <!-- Sponsor -->
            <div class="bill-sponsor">
              <img class="avatar" :src="defaultAvatar" :style="style" />
              <span class="name">{{ bill.sponsor.title }} {{ bill.sponsor.person.firstname }} {{ bill.sponsor.person.lastname }}</span>
              <span class="area">{{ this.area }} </span>
            </div>
          </Col>
          <Col :span="this.isDesktop ? 6 : 12" class="info-block">
            <!-- Congress -->
            <span class="label">Congress</span>
            <span class="value">{{ bill.congress }}th</span>
          </Col>
          <Col :span="this.isDesktop ? 6 : 12" class="info-block">
            <!-- Introduced Date -->
            <span class="label">Introduced</span>
            <span class="value">{{ bill.introducedDate }}</span>
          </Col>
          <Col :span="this.isDesktop ? 6 : 12" class="info-block">
            <!-- Cosponsors -->
            <span class="label">Cosponsors</span>
            <span class="value">{{ bill.cosponsors ? bill.cosponsors.length : 0 }}</span>
          </Col>
          <Col :span="this.isDesktop ? 6 : 12" class="info-block">
            <!-- Categories -->
            <span class="label">Categories</span>
            <div v-if="bill.categories">
              <span class="value bill-category" v-for="category in bill.categories" :key="category.id">
                <Icon type="social-codepen-outline"></Icon>
              </span>
            </div>
            <span v-else class="value">none</span>
          </Col>
          <Col :span="24" class="info-block">
            <span class="label">Status</span>
            <span class="value">Introduced to House</span>
            <BillTracker class="tracker" :progress="20"></BillTracker>
          </Col>
        </Row>
      </div>
    </div>
  </router-link>
</template>
<script>
import { path } from '@/plugins/locale'
import defaultAvatar from '~/assets/img/defaultAvatar.jpeg'
import BillTracker from '~/components/BillTracker'

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
      size: 30
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
    area () {
      if (this.bill.sponsor.district) {
        return `, ${this.bill.sponsor.state}-${this.bill.sponsor.district}`
      } else {
        return `, ${this.bill.sponsor.state}`
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
    }
  },
  methods: {
    path
  },
  components: {
    BillTracker
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/typography';
@import 'assets/css/colors';

.card {
  background-color: #ffffff;
  padding: 20px;
  color: #000000;
  text-align: left;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: box-shadow;
  border-radius: 5px;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  &.phone {
    border-radius: 0px;
  }
}

.bill-meta {
  display: flex;
  align-items: flex-start;

  .bill-code {
    font-size: 1.2em;
    color: $twBlue;
    font-weight: $twBold;
    margin-right: 10px;
  }
  .bill-type {
    font-size: 1em;
    color: $twGrayLight;
    font-weight: $twSemiBold;
    background: $twGrayLighter;
    border-radius: 10px;
    padding: 1px 8px;
  }
}

.bill-title {
  font-size: 1.2em;
  font-weight: $twRegular;
  margin-bottom: 30px;
}

.bill-sponsor {
  display: flex;
  align-items: center;

  .avatar {
    border-radius: 50%;
    border: 2px solid $twBlue;
    margin-right: 10px;
  }

  .name {
    font-size: 1em;
    color: $twBlack;
    font-weight: $twSemiBold;
  }

  .area {
    font-size: 1em;
    color: $twBlack;
    font-weight: $twSemiBold;
  }
}

.tracker {
  margin-top: 5px;
}

.bill-info {
  .info-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    .label {
      font-size: 0.8em;
      color: $twGrayLight;
      font-weight: $twSemiBold;
      text-transform: uppercase;
    }

    .value {
      font-size: 1em;
      color: $twBlack;
      font-weight: $twSemiBold;
      margin-right: 5px;

      &:last-child {
        margin-right: 0px;
      }

      &.bill-category {
        font-size: 1.2em;
      }
    }
  }
}
</style>
