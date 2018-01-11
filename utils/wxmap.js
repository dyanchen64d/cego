module.exports = (function () {
  return {
    getCurrLocation (type = 'wgs84') {
      return new Promise(function (resolve, reject) {
        try {
          wx.getLocation({
            type: type,
            success: function(res) {
              resolve({
                latitude: res.latitude,
                longitude: res.longitude
              })
            }
          })
        } catch (e) {
          reject(e)
        }
      })
    },
    chooseLocation () {
      return new Promise((resolve, reject) => {
        try {
          wx.chooseLocation({
            success (res) {
              resolve(res);
            }
          })
        } catch (e) {
          reject(e);
        }
      })
    }
  }
})();
