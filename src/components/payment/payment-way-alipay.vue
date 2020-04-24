<template>
  <payment-way-item text="支付宝支付" class="payment-alipay">
    <i class="iconfont icon-zhifubaozhifu" slot="icon"></i>
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
.payment-alipay {
  .iconfont {
    color: $ali-color;
    font-size: vw(26);
  }
}
</style>
