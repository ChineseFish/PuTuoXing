<template>
  <main-page title="确认订单" :back="$store.getters.haveRouteFrom">
    <template slot="scroll">
      <payment-ticket :title="title"
                  :subTitle="subTitle"
                  :price="price"
                  tag="单程"
                  class="payment-pay-ticket"
                  :status="paymentStatus">
        <payment-detail :detail="orderDetail"></payment-detail>
      </payment-ticket>
      <payment-status type="train" :orderInfo="orderDetail" :status.sync="paymentStatus"></payment-status>
    </template>
  </main-page>
</template>

<script>
import PaymentTicket from '@/components/payment/payment-ticket'
import PaymentDetail from '@/components/payment/payment-detail'
import PaymentStatus from '@/components/payment/payment-status'
import { getTrainOrderDetail } from '@/api'
import { formatDateMMDD, getWeekday } from '@/utils/date-format'

export default {
  components: {
    PaymentTicket,
    PaymentDetail,
    PaymentStatus
  },
  props: {
    orderNo: String
  },
  computed: {
    title () {
      let fromStationName = this.orderDetail.fromStationName || ''
      let toStationName = this.orderDetail.toStationName || ''
      return `${fromStationName} - ${toStationName}`
    },
    subTitle () {
      const date = formatDateMMDD(this.orderDetail.queryDate)
      const weekday = getWeekday(this.orderDetail.queryDate)
      const time = this.orderDetail.fromTime
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
  async beforeRouteEnter (to, from, next) {
    console.log(to.query)
    let res = await getTrainOrderDetail({orderNo: to.query.orderNo})
    next(vm => vm.setData(res))
  },
  methods: {
    async getOrderInfo () {
      const params = {
        orderNo: this.orderNo
      }
      let res = await getTrainOrderDetail(params)
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

</style>
