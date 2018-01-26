Component({
  properties: {
    paneRightDistance: String
  },
  data: {
    // 'DEF', 'Debuff', 'Evade', 'Guts', 'Hit',
    // 'Damage', 'Focus',, 'HP', 'ATK', 'Points', 'QP'
    array: ['全部', 'Buster', 'Arts', 'Quick', 'NP', 'Critical'],
    index: 0,
    indexStyle: '',
    index2: 0,
    index2Style: '',
    atkhp: {
      atk: 'selectedButton',
      hp: '',
      atkhp: ''
    },
    rarity: {
      yichi: '',
      ni: '',
      san: '',
      yon: '',
      go: 'selectedButton'
    }
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

    atkhpSelectAtk (e) {
      this.setData({
        atkhp: { atk: 'selectedButton', hp: '', atkhp: '' }
      })
    },
    atkhpSelectHp (e) {
      this.setData({
        atkhp: { atk: '', hp: 'selectedButton', atkhp: '' }
      })
    },
    atkhpSelectAtkHp (e) {
      this.setData({
        atkhp: { atk: '', hp: '', atkhp: 'selectedButton' }
      })
    },

    raritySelectYichi () {
      this.setData({
        rarity: { yichi: 'selectedButton', ni: '', san: '', yon: '', go: '' }
      })
    },
    raritySelectNi () {
      this.setData({
        rarity: { yichi: '', ni: 'selectedButton', san: '', yon: '', go: '' }
      })
    },
    raritySelectSan () {
      this.setData({
        rarity: { yichi: '', ni: '', san: 'selectedButton', yon: '', go: '' }
      })
    },
    raritySelectYon () {
      this.setData({
        rarity: { yichi: '', ni: '', san: '', yon: 'selectedButton', go: '' }
      })
    },
    raritySelectGo () {
      this.setData({
        rarity: { yichi: '', ni: '', san: '', yon: '', go: 'selectedButton' }
      })
    },

    submit () {
      let effect1, effect2
      effect1 = (this.data.array[this.data.index] === '全部') ? 'all' : this.data.array[this.data.index]
      effect2 = (this.data.array[this.data.index2] === '全部') ? 'all' : this.data.array[this.data.index2]

      this.triggerEvent('querysumbit', {
        atkhp: this.getStyledKey(this.data.atkhp),
        rarity: this.getStyledKey(this.data.rarity),
        effect: effect1 + ',' + effect2
      })
      this.setData({ paneRightDistance: '-100%' })
    },
    reset () {
      this.setData({
        index: 0,
        indexStyle: '',
        index2: 0,
        indexStyle2: '',
        atkhp: {
          atk: 'selectedButton',
          hp: '',
          atkhp: ''
        },
        rarity: {
          yichi: '',
          ni: '',
          san: '',
          yon: '',
          go: 'selectedButton'
        }
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
    }
  }
})
