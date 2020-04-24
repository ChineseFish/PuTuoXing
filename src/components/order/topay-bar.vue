<template>
  <div class="topay-bar">
    <span class="topay-bar-price">￥{{value || 0}}</span>
    <button class="topay-bar-btn" @click="toPay">{{ payText }}</button>
  </div>
</template>

<script>
import { creatOrder } from 'api'
import { verifyPassenger, verifyCollector } from '@/utils/validate'
import { mapGetters } from 'vuex'

export default {
  props: {
    isRealName: {
      type: Boolean,
      default: false
    },
    orderObj: {
      type: Object,
      default: null
    },
    value: {
      type: [Number, String],
      default: '-/-'
    },
    type: {
      type: String,
      validator: (value) => {
        return ['plane', 'bus', 'train', 'ship', 'scenery', 'homestay'].indexOf(value) > -1
      }
    },
    payText: {
      type: String,
      default: '去支付'
    }
  },
  computed: {
    ...mapGetters([
      'fromPlatform',
      'wxUserInfo'
    ])
  },
  methods: {
    toPay () {
      this.$emit('commit')
      // 如果是有自定义的按钮事件触发则不执行内部的事件处理函数
      if (!this.$listeners.commit) {
        this.toPayMethod()
      }
    },
    async toPayMethod () {
      console.log('toPay: ', this.orderObj)
      if (this.orderObj.surplusTicket <= 2) {
        this.$toast('余票不足，请选其他班次下单')
        return
      }

      try {
        const collector = this.orderObj.collector
        if ((this.type === 'scenery' || this.type === 'homestay') && !this.isRealName) {
          verifyCollector(collector)
        } else {
          const passengers = this.$store.getters.passengerValues
          this.orderObj.passengers = passengers
          verifyPassenger(passengers)
          verifyCollector(collector)
          this.$store.commit('SET_PASSENGERS_LIST')
        }

        if (this.isRealName && (this.orderObj.ticket && this.orderObj.passengers) &&
          this.orderObj.ticket.number < this.orderObj.passengers.length) {
          this.$toast('票数量不能少于游客数量')
          return
        }
        // 在提交之前存到localStorage里
        this.$store.commit('SET_COLLECTOR', { value: collector })
      } catch (err) {
        this.$toast(err.message)
        return
      }

      this.orderObj.fromPlatform = this.fromPlatform
      this.orderObj.unionid = this.wxUserInfo.unionid || ''

      let res = await creatOrder(this.orderObj, this.type)

      this.$router.push({
        path: this.$route.path + '/payment',
        query: {
          orderNo: res.orderNo
        }
      })
    },
    checkFieldIsEmpty (field, tips) {
      if (Object.prototype.toString.call(field) === '[object Array]' && field.length === 0) {
        this.$toast(tips)
        return false
      }
      if (Object.prototype.toString.call(field) === '[object Array]' &&
      Object.prototype.toString.call(field[0]) === '[object Object]') {
        for (const item of field) {
          for (const key in item) {
            if (item[key] === '') {
              this.$toast(tips)
              return false
            }
          }
        }
      }
      if (Object.prototype.toString.call(field) === '[object Object]') {
        for (const key in field) {
          if (field[key] === '') {
            this.$toast(tips)
            return false
          }
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss">
.topay-bar {
  padding: vw(12) $padding-aside;
  height: $header-height + vw(20);
  width: 100%;
  background-color: #fff;
  box-shadow: 0 vw(-1) vw(5) $line-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: vw(16);
  &-price {
    font-size: vw(20);
    color: $default-color-orange;
  }
  &-btn {
    padding: 0 vw(16);
    height: $header-height - vw(4);
    border: none;
    border-radius: vw(5);
    color: #fff;
    background-color: $default-color-orange;
 }
}
</style>
