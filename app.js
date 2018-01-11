const config = require('./config.js')

//app.js
App({
  onLaunch: function () {
    // wx.getUserInfo({
    //   success (res) {
    //     console.log(res);
    //   }
    // })
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: config.domain + '/getSessionKeyAndOpenId',
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})
