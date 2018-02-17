<template>
  <div class="actions-card" :class="{ phone: this.isPhone }">
    <h1 class="actions-card-title">Actions</h1>
    <div class="actions-card-body">
      <Timeline>
        <TimelineItem v-for="action in actions" :key="action.index">
          <p class="time">{{ action.datetime | localTime }}</p>
          <p class="content">{{ action.description | trimConGovAction }}</p>
        </TimelineItem>
      </Timeline>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    isPhone () {
      return this.$store.getters.isPhone
    },
    actions () {
      return this.bill.actions.map((action, index) => {
        if (process.browser) {
          // strip html tags from the string
          var dom = document.createElement('DIV')
          dom.innerHTML = action.description
          return {
            index,
            datetime: action.datetime,
            description: dom.textContent || dom.innerText || ''
          }
        }
        return action
      })
    }
  },
  components: {}
}
</script>

<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.ivu-timeline-item-content {
  color: $twGrayDark;
  font-size: 14px;

  .time {
    font-size: 13px;
    font-weight: $twBold;
    letter-spacing: 0.02em;
    margin-bottom: 5px;
  }
}
</style>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.actions-card {
  @extend .card;
  margin-bottom: 20px;

  .actions-card-title {
    @extend .card-title;
  }
}

.actions-card-body {
  max-height: 700px;
  overflow: scroll;
}
</style>
