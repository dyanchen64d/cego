//app.js
App({
  onLaunch: function () {
    wx.getUserInfo({
      success (res) {
        console.log(res);
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
