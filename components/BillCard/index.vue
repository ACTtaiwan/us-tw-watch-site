<template>
  <router-link :to="path(this, `/bills/${bill.id}`)">
    <div class="card">
      <div class="bill-meta">
        <span class="bill-code">{{ bill.billCode}}</span>
        <span class="bill-congress"> ・  {{ bill.congress }}th Congress</span>
      </div>
      <h1 class="bill-title">{{ bill.title }}</h1>
      <div class="bill-sponsor">
        <img class="avatar" :src="defaultAvatar" :style="style" />
        <span class="name">{{ bill.sponsor.title }} {{ bill.sponsor.person.firstname }} {{ bill.sponsor.person.lastname }}</span>
        <span class="area">{{ this.area }} </span>
      </div>
    </div>
  </router-link>
</template>
<script>
import { path } from '@/plugins/locale'
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
      size: 40
    }
  },
  computed: {
    style () {
      return `
        object-fit: cover;
        width: ${this.size}px;
        height: ${this.size}px;
      `
    },
    area () {
      if (this.bill.sponsor.district) {
        return `${this.bill.sponsor.state}-${this.bill.sponsor.district}`
      } else {
        return this.bill.sponsor.state
      }
    }
  },
  methods: {
    path
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/typograghy';
@import 'assets/css/colors';

.card {
  background-color: #ffffff;
  padding: 30px;
  color: #000000;
  text-align: left;
  margin-bottom: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: box-shadow;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

.bill-meta {
  display: flex;
  align-items: center;

  .bill-code {
    font-size: 1.2em;
    color: $twBlue;
    font-weight: $twBold;
  }
  .bill-congress {
    font-size: 1em;
    color: $twGrayLight;
    font-weight: $twRegular;
  }
}

.bill-title {
  font-size: 1.4em;
  font-weight: $twRegular;
  margin-bottom: 20px;
}

.bill-sponsor {
  display: flex;
  align-items: center;

  .avatar {
    border-radius: 50%;
    border: 3px solid $twBlue;
    margin-right: 10px;
  }

  .name {
    font-size: 1em;
    color: $twBlack;
    font-weight: $twSemiBold;
    margin-right: 10px;
  }

  .area {
    font-size: 1em;
    color: $twBlack;
    font-weight: $twSemiBold;
    background: $twGrayLighter;
    border-radius: 3px;
    padding: 0 5px;
  }
}
</style>
