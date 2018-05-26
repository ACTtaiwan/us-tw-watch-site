import { path } from '@/plugins/utils'

const columnRenderer = vm => {
  return [
    {
      title: vm.$t('billsPage.table.congressColLabel'),
      key: 'congress',
      className: 'congress-col table-col',
      width: 120,
      sortable: true,
      sortType: 'desc'
    },
    {
      title: vm.$t('billsPage.table.billCodeColLabel'),
      key: 'billCode',
      className: 'congress-col table-col',
      width: 120
    },
    {
      title: vm.$t('billsPage.table.titleColLabel'),
      key: 'title',
      className: 'title-col table-col',
      render: (h, params) => {
        const bill = params.row
        const dataObject = {
          props: {
            to: path(vm, `/bills/${bill.id}`),
            replace: true
          },
          attrs: {
            class: 'bill-link'
          }
        }
        return h('nuxt-link', dataObject, bill.title)
      }
    },
    {
      title: vm.$t('billsPage.table.chamberColLabel'),
      key: 'chamber',
      className: 'chamber-col table-col',
      width: 110,
      render: (h, params) => {
        return h('div', params.row.billType.chamber)
      }
    },
    {
      title: vm.$t('billsPage.table.partyColLabel'),
      key: 'party',
      className: 'party-col table-col',
      width: 150,
      render: (h, params) => {
        let party = params.row.sponsor.party
        let color = 'gray'
        if (party === 'Democrat') color = 'blue'
        if (party === 'Republican') color = 'red'
        return h('Tag', { props: { type: 'dot', color: color } }, party)
      }
    },
    {
      title: vm.$t('billsPage.table.sponsorColLabel'),
      key: 'sponsor',
      className: 'sponsor-col table-col',
      width: 180,
      render: (h, params) => {
        const person = params.row.sponsor.person
        const fullName = `${person.firstname} ${person.lastname}`
        return h('div', fullName)
      }
    }
  ]
}

export default columnRenderer
