const map = require('../../utils/wxmap.js')
const request = require('../../utils/wxrequest.js')

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
    longitude: '',
    markedLocation: {},
    message: '',
    leavingMessageTop: '-100vh',
    submitting: false
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
  setProfile: function () {
    let _this = this;
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: scope.userLocation,
            success () {
              _this.chooseLocation()
            }
          })
        } else {
          _this.chooseLocation()
        }
      }
    })
  },
  chooseLocation () {
    let _this = this;
    map.chooseLocation().
      then((res) => {
        _this.setData({
          markedLocation: res
        }, function () {
          // console.log(_this.data.markedLocation);
          _this.setData({
            leavingMessageTop: 0
          })
        })
      })
  },
  messageInput (e) {
    // console.log(e.detail.value);
    this.setData({
      message: e.detail.value
    })
  },
  messageSubmit () {
    // console.log(this.data.message);
    let _this = this
    if (_this.data.submitting) return;
    _this.data.submitting = true

    request.wxRequest({
      path: '/set-profile',
      method: 'POST',
      data: {
        location: this.data.markedLocation,
        intro: this.data.message
      },
      cb (res) {
        if (res.data === 'success') {
          wx.showModal({
            title: '已经提交',
            content: `地址：` + _this.data.markedLocation.address + `；留言：` + _this.data.message,
            showCancel: false,
            success (res) {
              if (res.confirm) {
                _this.setData({ leavingMessageTop: '-100vh' }, () => {
                  _this.data.submitting = false
                })
              }
            }
          })
        }
      }
    })
  },
  closeLeavingMessage (e) {
    if (e.target.id === 'liuyan') {
      this.setData({ leavingMessageTop: '-100vh' })
    }
  }
})
