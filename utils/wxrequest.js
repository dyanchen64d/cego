const config = require('../config.js')

module.exports = (function () {
  return {
    wxRequest: function ({path, method, data, cb}) {
      let _this = this;

      wx.request({
        url: config.domain + path,
        method: method,
        header: {
          'Cookie': 'token=' + wx.getStorageSync('3rd_session')
        },
        data: data,
        success (res) {
          // 如果 3rd_session 过期，重新 wxLogin
          if (res.data === 'expired') {
            console.log('3rd_session expires3rd....');
            _this.wxLogin({path, method, data, cb});
          } else {
            cb(res)
          }
        },
        fail (err) {
          console.log('wxRequest err....', err);
        }
      })
    },
    wxLogin ({path, method, data, cb}) {
      let _this = this;
      console.log('wxLogin....');

      wx.login({
        success: function(res) {
          if (res.code) {
            wx.request({
              url: config.domain + '/code2session',
              method: 'POST',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json', // 默认值
              },
              success (res) {
                // console.log(res);
                wx.setStorage({
                  key: "3rd_session",
                  data: res.data,
                  success () {
                    if (path) {
                      _this.wxRequest({path, method, data, cb})
                    }
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  }
})();
