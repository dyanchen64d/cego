const config = require('./config.js')
const wxApi = require('./utils/wxrequest.js')

//app.js
App({
  onLaunch: function () {
    // wxApi.wxLogin()
  },
  globalData: {
    userInfo: null
  }
})
