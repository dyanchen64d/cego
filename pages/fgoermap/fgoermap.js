const map = require('../../utils/wxmap.js')

Page({
  data: {
    markers: [{
      // iconPath: '/assets/craft_essence_702.jpg',
      id: 0,
      latitude: 31.187577,
      longitude: 121.525088,
      width: 40,
      height: 40,
      callout: {
        content: '这里刚入坑不久的非洲萌新_(:з」∠)_求加好友w',
        color: 'red',
        bgColor: 'yellow',
        display: 'BYCLICK',
        textAlign: 'center'
      }
    }],
    controls: [{
      id: 1,
      iconPath: '/assets/location.png',
      position: {
        left: 20,
        top: 40,
        width: 24,
        height: 24
      },
      clickable: true
    }],
    latitude: '',
    longitude: ''
  },
  regionchange(e) {
    // console.log(e.type)
  },
  markertap(e) {
    // console.log(e.markerId)
  },
  controltap(e) {
    // console.log(e.controlId)
    if (e.controlId === 1) {
      this.mapCtx.moveToLocation()
    }
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  onLoad: function () {
    map.getCurrLocation().
      then((res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      })
  },
  gotoProfile: function () {
    wx.navigateTo({
      url: '../profile/profile'
    })
  }
})
