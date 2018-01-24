Component({
  properties: {
    paneRightDistance: String
  },
  data: {
    // 'DEF', 'Debuff', 'Evade', 'Guts', 'Hit', 'Damage', 'Focus',, 'HP', 'ATK', 'Points', 'QP'
    array: ['全部', 'Buster', 'Arts', 'Quick', 'NP', 'Critical'],
    index: 0,
    indexStyle: '',
    index2: 0,
    index2Style: '',
    atkhp: {
      all: 'selectedButton',
      atk: '',
      hp: '',
      atkhp: ''
    },
    rarity: {
      all: 'selectedButton',
      yichi: '',
      ni: '',
      san: '',
      yon: '',
      go: ''
    },
    no: ''
  },
  methods: {
    closePane: function () {
      this.setData({ paneRightDistance: '-100%' })
    },
    getStyledKey (obj) {
      for (let key in obj) {
        if (obj[key] === 'selectedButton') {
          return key;
        }
      }
    },

    atkhpSelectAll (e) {
      this.setData({
        atkhp: { all: 'selectedButton', atk: '', hp: '', atkhp: '' }
      })
    },
    atkhpSelectAtk (e) {
      this.setData({
        atkhp: { all: '', atk: 'selectedButton', hp: '', atkhp: '' }
      })
    },
    atkhpSelectHp (e) {
      this.setData({
        atkhp: { all: '', atk: '', hp: 'selectedButton', atkhp: '' }
      })
    },
    atkhpSelectAtkHp (e) {
      this.setData({
        atkhp: { all: '', atk: '', hp: '', atkhp: 'selectedButton' }
      })
    },

    raritySelectAll () {
      this.setData({
        rarity: { all: 'selectedButton', yichi: '', ni: '', san: '', yon: '', go: '' }
      })
    },
    raritySelectYichi () {
      this.setData({
        rarity: { all: '', yichi: 'selectedButton', ni: '', san: '', yon: '', go: '' }
      })
    },
    raritySelectNi () {
      this.setData({
        rarity: { all: '', yichi: '', ni: 'selectedButton', san: '', yon: '', go: '' }
      })
    },
    raritySelectSan () {
      this.setData({
        rarity: { all: '', yichi: '', ni: '', san: 'selectedButton', yon: '', go: '' }
      })
    },
    raritySelectYon () {
      this.setData({
        rarity: { all: '', yichi: '', ni: '', san: '', yon: 'selectedButton', go: '' }
      })
    },
    costSelectGo () {
      this.setData({
        cost: { all: '', yichi: '', ni: '', san: '', yon: '', go: 'selectedButton' }
      })
    },

    submit () {

      let no = Number(this.data.no)
      if (isNaN(no)) {
        wx.showToast({
          title: '你输的都是些什么玩意？',
          icon: 'none',
          duration: 2000
        })
        return;
      }

      let obj = {
        atkhp: this.getStyledKey(this.data.atkhp),
        rarity: this.getStyledKey(this.data.rarity),
        effect: [this.data.array[this.data.index], this.data.array[this.data.index2]],
        no: no
      }
      this.triggerEvent('querysumbit', obj)
      this.setData({ paneRightDistance: '-100%' })
    },
    reset () {
      this.setData({
        index: 0,
        indexStyle: '',
        index2: 0,
        indexStyle2: '',
        atkhp: {
          all: 'selectedButton',
          atk: '',
          hp: '',
          atkhp: ''
        },
        rarity: {
          all: 'selectedButton',
          yichi: '',
          ni: '',
          san: '',
          yon: '',
          go: ''
        },
        no: ''
      })
    },

    bindPickerChange (e) {
      // console.log(this.data.array[e.detail.value])
      this.setData({ index: Number(e.detail.value) })
      if (this.data.index === 0) {
        this.setData({ indexStyle: '' })
      } else {
        this.setData({ indexStyle: 'selectedButton' })
      }
    },
    bindPickerChange2 (e) {
      // console.log(this.data.array[e.detail.value])
      this.setData({ index2: Number(e.detail.value) })
      if (this.data.index2 === 0) {
        this.setData({ indexStyle2: '' })
      } else {
        this.setData({ indexStyle2: 'selectedButton' })
      }
    },

    noInput (e) {
      // console.log(e.detail.value);
      this.setData({ no: e.detail.value })
    }
  }
})
