const request = require('../../utils/wxrequest.js')

Page({
  data: {
    celist: [],
    paneRightDistance: '-100%',
    count: 20,
    index: 0,
    query: {},
    scrollTop: 0
  },
  showPane: function () {
    this.setData({ paneRightDistance: '0' })
  },
  onLoad: function () {
    let _this = this
    wx.showLoading({ mask: true, title: 'loading' })

    request.wxRequest({
      path: '/craft-essence/craft-essences',
      method: 'GET',
      data: {
        index: this.data.index,
        count: this.data.count,
        ...this.data.query
      },
      cb (res) {
        wx.hideLoading()
        _this.setData({ celist: res.data.list, index: res.data.index })
      }
    })
  },
  scrollToLower () {
    let _this = this

    if (this.data.index >= 400) {
      wx.showToast({
        title: '列表太长了，请用搜索~',
        icon: 'none',
        duration: 2000
      })
    } else {
      request.wxRequest({
        path: '/craft-essence/craft-essences',
        method: 'GET',
        data: {
          index: this.data.index + this.data.count,
          count: this.data.count,
          ...this.data.query
        },
        cb (res) {
          let oldlist = _this.data.celist
          let newlist = [...oldlist, ...res.data.list]
          if (newlist.length < oldlist.length + 20) {
            if (res.data.list.length > 0) {
              _this.setData({ celist: newlist, index: res.data.index })
            }
          } else {
            _this.setData({ celist: newlist, index: res.data.index })
          }
        }
      })
    }
  },
  querySumbit (e) {
    this.setQuery(e.detail)
    let _this = this
    wx.showLoading({ mask: true, title: 'loading' })

    request.wxRequest({
      path: '/craft-essence/craft-essences',
      method: 'GET',
      data: { index: 0, count: this.data.count, ...this.data.query },
      cb (res) {
        wx.hideLoading()
        _this.setData({ celist: res.data.list, index: res.data.index, scrollTop: 0 })
      }
    })
  },
  setQuery (detail) {
    let resetStr = '{"atkhp":"all","rarity":"all","effect":["全部","全部"],"no":0}'
    let queryDetail = Object.assign({}, detail)

    queryDetail.effect = []
    for (let i=0; i<detail.effect.length; i++) {
      if (detail.effect[i] === '全部') {
        queryDetail.effect.push('all')
      } else {
        queryDetail.effect.push(detail.effect[i])
      }
    }
    queryDetail.effect = queryDetail.effect.join(',')

    if (JSON.stringify(detail) === resetStr) {
      this.setData({ query: {} })
    } else {
      this.setData({ query: queryDetail })
    }
  }
})
