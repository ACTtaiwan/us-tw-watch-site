// import { path } from '@/plugins/utils'

const columnRenderer = vm => {
  return [
    {
      title: vm.$t('membersPage.table.congressColLabel'),
      key: 'congressNumbers',
      className: 'congress-col table-col',
      width: 120,
      sortable: true,
      sortType: 'desc',
      render: (h, params) => {
        const memeber = params.row
        const congressNumbersDisplay = memeber.congressNumbers.join(', ')
        return h('div', congressNumbersDisplay)
      }
    },
    {
      title: vm.$t('membersPage.table.nameColLabel'),
      key: 'name',
      className: 'sponsor-col table-col',
      width: 180,
      render: (h, params) => {
        const memeber = params.row
        const person = memeber.person
        const fullName = `${person.firstname} ${person.lastname}`
        const memberLink = memeber.website

        const dataObject = {
          attrs: {
            class: 'member-link'
          },
          domProps: {
            href: memberLink,
            target: '_blank',
            innerHtml: fullName
          }
        }
        return h('a', dataObject, fullName)
      }
    },
    {
      title: vm.$t('membersPage.table.titleColLabel'),
      key: 'title',
      className: 'title-col table-col',
      width: 300,
      sortable: true,
      render: (h, params) => {
        const member = params.row
        const role = member.roleTypeDisplay
        const isSenator = role === 'Senator'

        if (!isSenator) {
          return h('div', role)
        }

        const senatorClass = member.senatorClassDisplay
        const rank = member.senatorRankDisplay
        const level = `${senatorClass}, ${rank} ${role}`

        return h('div', level)
      }
    },
    {
      title: 'State',
      key: 'state',
      className: 'congress-col table-col',
      width: 120,
      sortable: true
    },
    {
      title: 'District',
      key: 'district',
      className: 'district-col table-col',
      width: 120,
      sortable: true,
      render: (h, params) => {
        const member = params.row
        const district = member.district

        if (!district) {
          return '--'
        }

        return district
      }
    },
    {
      title: vm.$t('membersPage.table.partyColLabel'),
      key: 'party',
      className: 'party-col table-col',
      width: 150,
      sortable: true,
      render: (h, params) => {
        let party = params.row.party
        let color = 'gray'
        if (party === 'Democrat') color = 'blue'
        if (party === 'Republican') color = 'red'
        return h('Tag', { props: { type: 'dot', color: color } }, party)
      }
    }
  ]
}

export default columnRenderer
