import { localTime } from '@/plugins/filters'

const columnRenderer = vm => {
  return [
    {
      title: 'Version',
      key: 'version',
      className: 'version-col table-col',
      width: 200,
      render: (h, params) => {
        const versionName = params.row.name
        const dataObject = {
          attrs: {
            href: params.row.url,
            target: '_blank'
          }
        }
        return h('a', dataObject, versionName)
      }
    },
    {
      title: 'Date',
      key: 'date',
      className: 'date-col table-col',
      width: 120,
      render: (h, params) => {
        const date = params.row.date
        return h('p', localTime(date))
      }
    },
    {
      title: 'Description',
      key: 'description',
      className: 'description-col table-col',
      render: (h, params) => {
        const description = params.row.description
        return h('p', description)
      }
    }
  ]
}

export default columnRenderer
