<template>
  <div class="versions-card" :class="{ phone: this.isPhone }">
    <h1 class="versions-card-title">Versions</h1>
    <Table :columns="tableColumns" :data="tableData"></Table>
  </div>

</template>

<script>
import columnRenderer from './columnRenderer'

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
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    isPhone () {
      return this.$store.getters.isPhone
    },
    tableColumns () {
      let vm = this
      return columnRenderer(vm)
    },
    tableData () {
      return this.bill.versions
        .map(version => {
          let url = ''
          let type = 'notset'
          const priorities = ['notset', 'txt', 'xml', 'pdf']

          version.documents.forEach(doc => {
            const currentLevel = priorities.indexOf(type)
            const level = priorities.indexOf(doc.contentType)
            if (level > currentLevel) {
              url = doc.s3Entity
              type = doc.contentType
            }
          })

          return { ...version, url }
        })
        .sort((a, b) => parseInt(b.date) - parseInt(a.date))
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';
@import 'assets/css/typography';
@import 'assets/css/colors';

.versions-card {
  @extend .card;
  margin-bottom: 20px;

  .versions-card-title {
    @extend .card-title;
  }
}

.versions-card-info-block {
  @extend .card-info-block;
}
</style>


<style lang="scss">
@import 'assets/css/app';
@import 'assets/css/colors';

.ivu-table {
  font-size: 14px;

  thead {
    .ivu-table-cell {
      padding: 18px;
      font-size: 0.9em;
      color: $twGrayDark;
      font-weight: $twBold;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
  }

  .ivu-table-body {
    .ivu-table-cell {
      padding: 18px;
    }

    .table-col {
      font-size: 1em;
    }

    .version-col {
      .ivu-table-cell {
        @extend .textFont;
      }
    }
  }
}
</style>
