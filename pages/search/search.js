const request = require('../../utils/wxrequest.js')

Page({
  data: {
    celist: [],
    paneRightDistance: '-100%',
    count: 20,
    index: 0,
    cost: '',
    atkhp: '' // atk, hp, atkhp
  },
  showPane: function () {
    this.setData({ paneRightDistance: '0' })
  },
  onLoad: function () {
    let _this = this

    request.wxRequest({
      path: '/craft-essence/craft-essences',
      method: 'GET',
      data: {
        index: this.data.index,
        count: this.data.count
      },
      cb (res) {
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
          count: this.data.count
        },
        cb (res) {
          let oldlist = _this.data.celist
          let newlist = [...oldlist, ...res.data.list]
          // console.log('newlist: ' + newlist.length , 'oldlist: ' + oldlist.length);
          if (newlist.length < oldlist.length + 20) {
            wx.showToast({
              title: '已经没有更多了！',
              icon: 'none',
              duration: 2000
            })
          } else {
            _this.setData({ celist: newlist, index: res.data.index })
          }
        }
      })
    }
  },
  querySumbit (e) {
    console.log(e.detail);
  }
})
