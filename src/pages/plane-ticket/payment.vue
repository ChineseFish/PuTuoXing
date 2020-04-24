<template>
  <main-page class="payment-container" title="订单" :back="$store.getters.haveRouteFrom">
    <template slot="scroll">
      <payment-ticket :title="title"
                  :subTitle="subTitle"
                  :price="price"
                  tag="单程"
                  class="payment-pay-ticket"
                  :status="paymentStatus">
        <payment-detail :detail="orderDetail"></payment-detail>
      </payment-ticket>
      <payment-status type="plane" :orderInfo="orderDetail" :status.sync="paymentStatus"></payment-status>
    </template>
  </main-page>
</template>

<script>
import PaymentTicket from '@/components/payment/payment-ticket'
import PaymentWay from '@/components/payment/payment-way'
import PaymentDetail from '@/components/payment/payment-detail'
import { getOrderDetail } from '@/api'
import { formatDateMMDD, getWeekday, formatDateHHMM } from '@/utils/date-format'
import PaymentStatus from '@/components/payment/payment-status'

export default {
  components: {
    PaymentTicket,
    PaymentWay,
    PaymentDetail,
    PaymentStatus
  },

  props: {
    orderNo: {
      type: [String, Number]
    }
  },

  computed: {
    title () {
      let startCity = this.orderDetail.startCity || ''
      let endCity = this.orderDetail.endCity || ''
      return `${startCity} - ${endCity}`
    },
    subTitle () {
      const date = formatDateMMDD(this.orderDetail.startTime)
      const weekday = getWeekday(this.orderDetail.startTime)
      const time = formatDateHHMM(this.orderDetail.startTime)
      return `出发时间 ${date} (${weekday}) ${time}`
    },
    price () {
      return this.orderDetail.totalPrice
    }
  },

  data () {
    return {
      orderDetail: {},
      paymentStatus: 0
    }
  },

  created () {
  },

  async beforeRouteEnter (to, from, next) {
    console.log(to.query)
    let res = await getOrderDetail({orderNo: to.query.orderNo})
    next(vm => vm.setData(res))
  },
  methods: {
    async getOrderInfo () {
      const params = {
        orderNo: this.orderNo
      }
      let res = await getOrderDetail(params)
      this.setData(res)
    },
    setData (res) {
      this.orderDetail = res
      this.paymentStatus = res.status
    }
  }
}
</script>

<style lang="scss">
.payment {
  &-container {
    // background: #fff;
    height: 100vh;
  }
  &-pay-ticket {
    margin: vw(5) vw(10);
  }
}
</style>
