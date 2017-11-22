import { path } from '@/plugins/locale'

const renderTableColumns = (vm) => {
  return [
    {
      title: 'ID',
      key: 'id',
      renderHeader: (h, { column, index }) => {
        function remoteMethodId (query) {
          const keyword = (query !== '') && (query.trim() !== '') && query.trim()
          vm.keywordColumnId = keyword
          if (keyword) {
            vm.loadingColumnId = true
            vm.optionsColumnId = vm.listColumnId.filter(item => item.toLowerCase().indexOf(keyword.toLowerCase()) > -1)

            setTimeout(() => {
              vm.loadingColumnId = false
            }, 200)
          } else {
            vm.optionsColumnId = vm.listColumnId
          }
        }

        const dataObject = {
          props: {
            filterable: true,
            remote: true,
            'remote-method': remoteMethodId,
            loading: vm.loadingColumnId,
            'loading-text': 'Loading....',
            'not-found-text': 'Not found'
          }
        }
        return h('Select', dataObject)
      }
    },
    {
      title: 'Link',
      key: 'link',
      render: (h, params) => {
        const bill = params.row

        const dataObject = {
          props: {
            to: path(vm, `/bills/${bill.id}`)
          },
          domProps: {
            innerHTML: 'link'
          }
        }

        return h('nuxt-link', dataObject)
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
      title: 'Title',
      key: 'title'
    }
  ]
}

export default renderTableColumns
