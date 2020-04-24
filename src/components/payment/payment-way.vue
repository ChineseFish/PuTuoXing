<template>
  <div class="payment-way-wrapper" @click="toChangePayWay">
    <component :is="payWayObj[selectedPayWay].component"></component>
    <div class="payment-way-change-text">更换</div>

    <l-dialog :show.sync="showPayWays" appendToBody>
      <div v-for="(item, word) in payWayObj" :key="word">
        <component :is="item.component" @click.native="choosePayWay(word)"></component>
      </div>
    </l-dialog>
  </div>
</template>

<script>
import Wxpay from './payment-way-wxpay'
import Alipay from './payment-way-alipay'
import Nxinpay from './payment-way-nxinpay'
import JhSDKPay from './payment-way-jhsdk'
import { isWeiXin, systemInfo } from '@/utils/runtime-env'

export default {
  components: {
    Wxpay,
    Alipay
  },
  props: {
    value: {
      type: String,
      default: 'wxpay'
    },
    isAndroid: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      payWayObj: {
        'wxpay': {
          component: Wxpay
        },
        'alipay': {
          component: Alipay
        },
        'nxinpay': {
          component: Nxinpay
        }
      },
      isIOSWebview: systemInfo.isIOSWebview() && !isWeiXin(),
      selectedPayWay: this.value,
      showPayWays: false
    }
  },
  mounted () {
    // 判断是否为IOS，是则添加建行SDK支付入口
    if (this.isIOSWebview || isWeiXin()) {
      this.$set(this.payWayObj, 'jhsdkpay', { component: JhSDKPay })
    }
  },
  methods: {
    toChangePayWay () {
      this.showPayWays = true
    },
    choosePayWay (word) {
      this.selectedPayWay = word
      this.showPayWays = false
      this.$emit('input', word)
    }
  },
  watch: {
    value (newVal) {
      this.selectedPayWay = newVal
    },
    isAndroid (newVal) {
      if (newVal) {
        this.$set(this.payWayObj, 'jhsdkpay', { component: JhSDKPay })
      }
    }
  }
}
</script>

<style lang="scss">
.payment-way {
  &-wrapper {
    background-color: #fff;
    border-radius: 5px;
    font-size: vw(18);
    overflow: hidden;
    position: relative;
  }
  &-change-text {
    position: absolute;
    top: 50%;
    right: vw(15);
    transform: translate3d(0, -50%, 0);
    font-size: vw(10);
    color: $default-color;
  }
}
</style>
