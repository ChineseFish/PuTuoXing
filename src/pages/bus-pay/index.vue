<template>
  <main-page class="bus-pay-wrapper" title="支付方式" :back="$store.getters.haveRouteFrom">
    <template slot="scroll">
      <payment-ticket :title="title"
        :price="price"
        :status="paymentStatus"
        :tag="tag">
        <template slot="subTitle">
          <p class="sub-title-time">{{ `始：${orderInfo.queryDate} ${orderInfo.fromTime}` }}</p>
          <p class="sub-title-time" v-if="orderInfo.backDate || orderInfo.backTime">
            {{ `返：${orderInfo.backDate} ${orderInfo.backTime}` }}
          </p>
          <p>车票余票变动频繁，支付越早越容易成功出票哦~</p>
        </template>
        <payment-detail :detail="orderInfo">
        </payment-detail>
      </payment-ticket>
      <payment-status type="bus" :orderInfo="orderInfo" :status.sync="paymentStatus"></payment-status>
    </template>
  </main-page>
</template>

<script>
import PaymentTicket from '@/components/payment/payment-ticket'
import PaymentWay from '@/components/payment/payment-way'
import PaymentDetail from '@/components/payment/payment-detail'
import CountDown from '@/components/count-down'
// import { formatDateYYMMDD, getWeekday, formatDateHHMM } from '@/utils/date-format'
import { queryBusOrder } from 'api'
import PaymentStatus from '@/components/payment/payment-status'

export default {
  props: {
    orderNo: {
      type: String,
      default: ''
    }
  },
  components: {
    PaymentTicket,
    PaymentDetail,
    CountDown,
    PaymentWay,
    PaymentStatus
  },
  data () {
    return {
      orderInfo: {},
      paymentStatus: 0
    }
  },
  computed: {
    title () {
      return `${this.orderInfo.fromStationName}-${this.orderInfo.toStationName}`
    },
    subTitle () {
      const YYMMDD = this.orderInfo.queryDate || ''
      // const weekday = getWeekday(this.orderInfo.depTime)
      const time = this.orderInfo.fromTime || ''
      const tip = '汽车票余票变动频繁，请尽量在5分钟内完成支付，可提高出票成功率哦~'
      let str = `出发：${YYMMDD} ${time}`
      if (this.orderInfo.backDate) {
        str += ` 返程：${this.orderInfo.backDate} ${this.orderInfo.backTime} `
      }
      return str + tip
    },
    price () {
      // return this.orderInfo.price
      if ('passengers' in this.orderInfo) {
        return this.orderInfo.totalPrice
      }
      return 0
    },
    tag () {
      return this.orderInfo.backDate ? '往返' : '单程'
    }
  },
  created () {
  },
  mounted () {
    console.log('orderNo: ', this.orderNo)
    // this.getOrderInfo()
  },
  async beforeRouteEnter (to, from, next) {
    let res = await queryBusOrder({orderNo: to.query.orderNo})
    next(vm => vm.setData(res))
  },
  methods: {
    async getOrderInfo () {
      const params = {
        orderNo: this.orderNo
      }
      let res = await queryBusOrder(params)
      this.setData(res)
    },
    setData (res) {
      this.orderInfo = res
      this.paymentStatus = res.status
    }
  }
}
</script>

<style lang="scss">
.bus-pay-wrapper {
  .sub-title-time {
    color: $default-color;
    font-size: vw(14);
  }
  .msg-content {
    text-align: center;
  }
}
</style>
