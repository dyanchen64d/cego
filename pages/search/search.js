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
    //
  },
  scrollToLower () {
    let _this = this

    if (this.data.index >= 400) {
      wx.showToast({
        title: '列表太长了，请用搜索~',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.query === {}) {
      //
    }
    else {
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
    this.setData({ query: e.detail })
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
  }
})
