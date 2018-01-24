const map = require('../../utils/wxmap.js')
const request = require('../../utils/wxrequest.js')

Page({
  data: {
    markers: [],
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
    profileWrapperLeft: '-100%',
    inputValue: ''
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
    let _this = this;

    map.getCurrLocation().
      then((res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      })

    request.wxRequest({
      path: '/location/get-locations',
      method: 'POST',
      data: {},
      cb (res) {
        // console.log(res.data);
        let markers = res.data.map((item, index) => {
          return {
            // path: '',
            id: index,
            latitude: item.latitude,
            longitude: item.longitude,
            width: 40,
            height: 40,
            callout: {
              content: item.intro,
              color: 'red',
              bgColor: 'yellow',
              display: 'BYCLICK',
              textAlign: 'center'
            }
          }
        })
        _this.setData({ markers: markers })
      }
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
          _this.setData({ profileWrapperLeft: '0' })
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
    wx.showLoading({ mask: true, title: '保存中..' })

    request.wxRequest({
      path: '/location/set-profile',
      method: 'POST',
      data: {
        location: this.data.markedLocation,
        intro: this.data.message
      },
      cb (res) {
        wx.hideLoading();
        if (res.data === 'success') {
          wx.showModal({
            title: '已经提交',
            content: `地址：` + _this.data.markedLocation.address + `；留言：` + _this.data.message,
            showCancel: false,
            success (res) {
              if (res.confirm) {
                _this.setData({ profileWrapperLeft: '-100%', inputValue: '' })
              }
            }
          })
        }
      }
    })
  }
})
