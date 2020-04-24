export default {
  computed: {
    isLogin () {
      return this.$store.getters.token
    },
    // 金额明细
    priceDetailList () {
      let arr = []
      let childCnt = 0

      console.log('passenger: ', this.passengerValues, this.detailData)
      this.passengerValues.filter((passenger, index) => {
        // 如果该用户的类型是儿童，但是当前无法购买儿童票时，应该把该乘客剔除
        if (parseInt(passenger.passengerType) === 2 && !this.detailData.childPrice) {
          this.passengerValues.splice(index, 1)
        } else if (parseInt(passenger.passengerType) === 2) {
          childCnt++
        }
      })

      arr.push({
        name: '成人票',
        price: this.detailData.fullPrice || this.detailData.price || this.detailData.nowPrice,
        count: this.passengerValues.length - childCnt
      })

      arr.push({
        name: '儿童票',
        price: this.detailData.childPrice,
        count: childCnt
      })

      arr.push({
        name: '机建+燃油费',
        price: this.detailData.airportPrice,
        count: this.passengerValues.length
      })

      arr.push({
        name: '代订服务费',
        price: this.detailData.handlingFee,
        count: this.passengerValues.length
      })

      if (this.insurance && this.insurance.length !== 0) {
        for (const item of this.insurance) {
          arr.push({
            name: item.name,
            price: item.price,
            count: this.passengerValues.length
          })
        }
      }
      return arr
    },
    // 总共需要支付的金额
    priceToPay () {
      let result = 0
      for (const item of this.priceDetailList) {
        if (item.price) {
          result += item.price * item.count
        }
      }
      return result
    }
  },

  methods: {
    toLoginView () {
      this.$store.commit('SHOW_LOGIN')
    }
  }
}
