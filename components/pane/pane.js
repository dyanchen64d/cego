Component({
  properties: {
    paneRightDistance: String
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    closePane: function () {
      this.setData({
        paneRightDistance: '-100%'
      })
    },
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);
    }
  }
})
