// import { path } from '@/plugins/locale'

const columnRenderer = vm => {
  return [
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
    },
    {
      title: vm.$t('membersPage.table.congressColLabel'),
      key: 'congressNumbers',
      className: 'congress-col table-col',
      width: 120,
      render: (h, params) => {
        const memeber = params.row
        const congressNumbersDisplay = memeber.congressNumbers.join(', ')
        return h('div', congressNumbersDisplay)
      }
    },
    {
      title: 'State',
      key: 'state',
      className: 'congress-col table-col',
      width: 120,
      render: (h, params) => {
        const memeber = params.row
        const state = memeber.state
        return state
      }
    },
    {
      title: 'Name',
      key: 'name',
      className: 'title-col table-col',
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
      title: 'Level',
      key: 'type',
      className: 'chamber-col table-col',
      width: 200,
      render: (h, params) => {
        const member = params.row
        const role = member.roleTypeDisplay
        const senatorClass = member.senatorClassDisplay
        const rank = member.senatorRankDisplay
        const level = `${senatorClass}, ${rank} ${role}`

        return h('div', level)
      }
    },
    {
      title: 'Phone',
      key: 'phone',
      className: 'sponsor-col table-col',
      width: 180
    }
  ]
}

export default columnRenderer
