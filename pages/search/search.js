//logs.js
const data = require('../../utils/data.js')

Page({
  data: {
    data: [],
    paneRightDistance: '-100%'
  },
  showPane: function () {
    this.setData({
      paneRightDistance: '0'
    })
  },
  onLoad: function () {
    this.setData({
      data: data
    })
  }
})
