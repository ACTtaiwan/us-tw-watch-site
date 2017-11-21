const renderTableColumns = (vm) => {
  return [
    {
      title: 'ID',
      key: 'id',
      renderHeader: (h, { column, index }) => {
        function remoteMethodId (query) {
          if (query !== '') {
            vm.loadingColumnId = true
            setTimeout(() => {
              vm.loadingColumnId = false
              vm.optionsColumnId = vm.listColumnId.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) > -1)
            }, 200)
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
