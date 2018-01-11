const map = require('../../utils/wxmap.js')

Page({
  data: {
    locatoinStr: '',
    locatonObj: {},
    areaValue: ''
  },
  btnChooseLocation () {
    let that = this;
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: scope.userLocation,
            success () {
              map.chooseLocation().
                then((res) => {
                  that.setData({
                    locatonObj: res,
                    locatoinStr: JSON.stringify(res)
                  })
                })
            }
          })
        } else {
          map.chooseLocation().
            then((res) => {
              that.setData({
                locatonObj: res,
                locatoinStr: JSON.stringify(res)
              })
            })
        }
      }
    })
  },
  btnSetProfile () {
    // 将设置的留言保存到服务器
    let post = {
      userInfo: {},
      locationObj: this.data.locatonObj,
      profiles: {
        intro: this.data.areaValue
      }
    }
    console.log(post);
    wx.showToast({
      icon: 'success',
      title: '设置成功'
    })
  },
  areaInput (e) {
    // console.log(e.detail);
    this.setData({
      areaValue: e.detail.value
    })
  },
  areaConfirm (e) {
    // console.log(e.detail);
  }
})
