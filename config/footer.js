export default Vue => {
  return {
    sections: [
      {
        title: '美國國會',
        items: [
          { text: '法案', link: '/bills', router: true, action: '' },
          { text: '議員', link: '/members', router: true, action: '' },
          { text: '觀測文章', link: '/articles', router: true, action: '' },
          { text: '洞察資料', link: '/insights', router: true, action: '' }
        ]
      },
      {
        title: '觀測站',
        items: [
          { text: '關於我們', link: '/about', router: true, action: '' },
          {
            text: '聯絡我們',
            link: 'mailto:feedback@acttaiwan.org',
            router: false,
            action: ''
          },
          {
            text: '訂閱最新消息',
            link: '',
            router: false,
            action: () => {
              Vue.$store.commit('SET_SUBSCRIPTION', true)
            }
          },
          {
            text: '抖內✨',
            link: '',
            router: false,
            action: () => {
              Vue.$store.commit('SET_DONATION', true)
            }
          }
        ]
      },
      {
        title: '成為粉絲',
        items: [
          {
            text: 'Facebook',
            link: 'http://www.facebook.com/AmericanCitizensforTaiwan',
            router: false,
            action: '',
            target: '_blank'
          },
          {
            text: 'Instagram',
            link: 'https://www.instagram.com/ustaiwanwatch/',
            router: false,
            action: '',
            target: '_blank'
          },
          {
            text: 'LINE',
            link: 'https://line.me/R/ti/p/%40pfw3848l',
            router: false,
            action: '',
            target: '_blank'
          },
          {
            text: 'Medium',
            link: 'https://medium.com/ustaiwanwatch',
            router: false,
            action: '',
            target: '_blank'
          }
        ]
      }
    ],
    line: {
      link: 'https://line.me/R/ti/p/%40pfw3848l',
      text: '加入好友',
      imgSrc: 'https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png'
    },
    fbLikeBtn: 'ustw',
    lineAddBtn: 'ustw',
    showPoweredby: true,
    copyright: 'Copyright © U.S. Taiwan Watch 2019',
    logo: 'ustw',
    logoImgAlt: 'U.S. Taiwan Watch'
  }
}
