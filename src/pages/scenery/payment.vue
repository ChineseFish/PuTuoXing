<template>
  <main-page title="订单详情" :back="$store.getters.haveRouteFrom" class="scenery-ticket-payment-container">
    <template slot="scroll">
      <payment-ticket :title="title"
                  :subTitle="subTitle"
                  :price="price"
                  tag="旅游"
                  class="payment-pay-ticket"
                  :status="paymentStatus">
        <payment-detail :detail="orderDetail" type="scenery"></payment-detail>
      </payment-ticket>
      <payment-status type="scenery" :orderInfo="orderDetail" :status.sync="orderDetail.status || 0"></payment-status>
    </template>
  </main-page>
</template>

<script>
import PaymentTicket from '@/components/payment/payment-ticket'
import PaymentDetail from '@/components/payment/payment-detail'
import PaymentStatus from '@/components/payment/payment-status'
import { getScenicOrderDetail } from '@/api'

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
      return this.orderDetail.goodName
    },
    subTitle () {
      return this.orderDetail.queryDate
        ? `使用日期：${this.orderDetail.queryDate}`
        : this.orderDetail.address
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
    let res = await getScenicOrderDetail({orderNo: to.query.orderNo})
    console.log('res: ', res)
    next(vm => vm.setData(res))
  },
  methods: {
    async getOrderInfo () {
      const params = {
        orderNo: this.orderNo
      }
      let res = await getScenicOrderDetail(params)
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
.scenery-ticket-payment-container {

}
</style>
