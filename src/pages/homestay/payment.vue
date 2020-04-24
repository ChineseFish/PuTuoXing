<template>
  <main-page class="homestay-payment-wrapper" title="订单" :back="$store.getters.haveRouteFrom">
    <template slot="scroll">
      <payment-ticket :title="orderDetail.goodName"
        :price="orderDetail.totalPrice"
        :tag="orderDetail.houseType"
        :orderNo="orderDetail.orderNo"
        :subTitle="orderDetail.address"
        :status="paymentStatus">
        <payment-detail :detail="orderDetail" collectorTitle="入住联系人"></payment-detail>
      </payment-ticket>
      <payment-status type="homestay" :orderInfo="orderDetail" :status.sync="paymentStatus"></payment-status>
    </template>
  </main-page>
</template>

<script>
import PaymentTicket from '@/components/payment/payment-ticket'
import PaymentDetail from '@/components/payment/payment-detail'
import PaymentWay from '@/components/payment/payment-way'
import PaymentStatus from '@/components/payment/payment-status'
import { getHomestayOrderDetail } from '@/api'

export default {
  components: {
    PaymentTicket,
    PaymentWay,
    PaymentStatus,
    PaymentDetail
  },

  props: {
    orderNo: {
      type: [String, Number]
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
    let res = await getHomestayOrderDetail({orderNo: to.query.orderNo})
    next(vm => vm.setData(res))
  },
  methods: {
    async getOrderInfo () {
      const params = {
        orderNo: this.orderNo
      }
      let res = await getHomestayOrderDetail(params)
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
.homestay-payment-wrapper {

}
</style>
