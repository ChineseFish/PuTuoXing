<template>
  <payment-way-item text="农信e支付" class="payment-wxpay">
    <img src="static/images/nongxin.png" class="icon-image" alt="" slot="icon">
  </payment-way-item>
</template>

<script>
import PaymentWayItem from './payment-way-item'
export default {
  components: {
    PaymentWayItem
  }
}
</script>

<style lang="scss">
.payment-wxpay {
  .icon-image {
    width: vw(26);
    height: vw(26);
  }
}
</style>
