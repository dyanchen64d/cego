//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: ''
  },
  //事件处理函数
  gotoCESearch: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  gotoFGOerSearch: function () {
    wx.navigateTo({
      url: '../fgoermap/fgoermap'
    })
  }
})
