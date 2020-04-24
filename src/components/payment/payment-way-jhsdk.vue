<template>
  <payment-way-item :text="text" class="payment-jhsdkpay" :tipsText="tipsText">
    <i class="iconfont icon-jianhang" slot="icon"></i>
  </payment-way-item>
</template>

<script>
import PaymentWayItem from './payment-way-item'
import { isWeiXin } from '@/utils/runtime-env'
export default {
  computed: {
    tipsText () {
      return (+new Date() < +new Date('2019-03-31') && !isWeiXin()) ? '享立减特惠' : ''
    }
  },
  data () {
    return {
      text: '建行龙支付'
    }
  },
  mounted () {
    if (isWeiXin()) {
      this.text = '建行e支付'
    }
  },
  components: {
    PaymentWayItem
  }
}
</script>

<style lang="scss">
.payment-jhsdkpay {
  .iconfont {
    color: $ccb-color;
    font-size: vw(26);
  }
}
</style>
