const config = require('./config.js')
const wxApi = require('./utils/wxrequest.js')

//app.js
App({
  onLaunch: function () {
    // wx.getUserInfo({
    //   success (res) {
    //     console.log(res);
    //   }
    // })
    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
        console.log('wx.checkSession success');
      },
      fail: function(){
        //登录态过期
        wxApi.wxLogin()
      }
    })
    // wxApi.wxLogin()
  },
  globalData: {
    userInfo: null
  }
})
