import { path } from '@/plugins/locale'

const renderTableColumns = (vm) => {
  return [
    {
      title: 'Title',
      key: 'title',
      renderHeader: (h, { column, index }) => {
        function remoteMethodTitle (query) {
          const keyword = (query !== '') && (query.trim() !== '') && query.trim()
          vm.keywordColumnTitle = keyword
          if (keyword) {
            vm.loadingColumnTitle = true
            vm.optionsColumnTitle = vm.listColumnTitle.filter(item => item.toLowerCase().indexOf(keyword.toLowerCase()) > -1)

            setTimeout(() => {
              vm.loadingColumnTitle = false
            }, 200)
          } else {
            vm.optionsColumnTitle = vm.listColumnTitle
          }
        }

        const dataObject = {
          props: {
            filterable: true,
            remote: true,
            'remote-method': remoteMethodTitle,
            loading: vm.loadingColumnTitle,
            'loading-text': 'Loading....',
            'not-found-text': 'Not found'
          }
        }
        return h('Select', dataObject)
      }
    },
    {
      title: 'Congress',
      key: 'congress'
    },
    {
      title: 'Code',
      key: 'billCode',
      sortable: true
    },
    {
      title: 'Party',
      key: 'party',
      sortable: true,
      render: (h, params) => {
        const bill = params.row
        const party = bill.sponsor.party
        const dataObject = {
          domProps: {
            innerHTML: party
          }
        }

        return h('span', dataObject)
      }
    },
    {
      title: 'Sponsor',
      key: 'sponsor',
      render: (h, params) => {
        const bill = params.row
        const person = bill.sponsor.person
        const fullName = `${person.firstname} ${person.lastname}`
        const dataObject = {
          domProps: {
            innerHTML: fullName
          }
        }

        return h('span', dataObject)
      }
    },
    {
      title: 'Link',
      key: 'link',
      render: (h, params) => {
        const bill = params.row

        const dataObject = {
          props: {
            to: path(vm, `/bills/${bill.id}`),
            replace: true
          },
          domProps: {
            innerHTML: 'link'
          }
        }

        return h('router-link', dataObject)
      }
    }
  ]
}

export default renderTableColumns
