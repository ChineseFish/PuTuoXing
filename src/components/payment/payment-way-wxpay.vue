<template>
  <payment-way-item text="微信支付" class="payment-wxpay">
    <i class="iconfont icon-weixinzhifu" slot="icon"></i>
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
  .iconfont {
    color: $weixin-color;
    font-size: vw(26);
  }
}
</style>
