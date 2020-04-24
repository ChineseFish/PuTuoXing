<template>
  <div class="payment-status-wrapper">
    <!-- 未付款 -->
    <template v-if="paymentStatus === 0">
      <div class="payment-status-tips">
        请在
        <count-down class="time" :time="nowSystemTime + orderInfo.remainingTime" @timeout="paymentTimeout"></count-down>
        内完成支付，以免耽误行程
      </div>
      <div class="activity-msg-wrapper" v-if="activityMsg">
        <!-- APP内使用建行龙支付，可享满减优惠活动，首单最高立减50元！ -->
        <p>{{ activityMsg }}</p>
        <div @click="$router.push({ name: 'JhQa' })" class="jh-qa-item">【点此查看】建行龙支付常见问题</div>
      </div>
      <!-- <payment-way class="payment-status-pay-way" v-model="payWay" :isAndroid="isAndroid"></payment-way> -->
      <div class="payment-status-tips" v-if="isIOSWebview">App内如无法支付，请更新App到最新版本再尝试</div>
      <div class="payment-status-commit-btn" @click="toShowPayWay">立即支付</div>
      <div class="payment-status-goto-home" @click="toReOrder">重新下单</div>
      <div class="payment-status-goto-home" @click="toRefreshOrder">刷新订单</div>
    </template>

    <l-dialog :show.sync="dialogTimeout" class="payment-status-timeout-dialog-wrapper" appendToBody>
      <p class="msg-content">订单超时，请重新下单</p>
    </l-dialog>

    <!-- 订单取消 -->
    <template v-if="paymentStatus >= 2">
      <div class="payment-status-tips">
        <!-- <span>订单已取消</span> -->
      </div>
      <div class="payment-status-button-wrapper">
        <div class="payment-status-goto-home" @click="toReOrder">再下一单</div>
        <div class="payment-status-open-ticket" @click="openTicket" v-if="paymentStatus >= 4">我要开票</div>
      </div>
    </template>

    <!-- 已支付 -->
    <template v-if="paymentStatus === 1">
      <div class="payment-status-success-info">
        <div class="payment-status-success">
          <i class="iconfont icon-zhengquewancheng-yuankuang"></i>
          <span>支付成功</span>
        </div>
        <div class="item">
          <span class="title">订单号：</span>
          <span class="content">{{ orderInfo.orderNo }}</span>
        </div>
        <div class="item">
          <span class="title">下单时间：</span>
          <span class="content">{{ orderInfo.createTime | dateTimeFormat }}</span>
        </div>
      </div>
      <div class="payment-status-success-tips">
        如需要退票，请前往-<span @click="toMyOrder">我的订单</span>-进行操作
      </div>
      <div class="payment-status-goto-home" @click="toReOrder">再下一单</div>
    </template>

    <div class="payment-status-goto-home" @click="toHome" v-if="!$store.getters.haveRouteFrom">返回首页</div>

    <payment-recommend v-if="paymentStatus !== 0"></payment-recommend>

    <!-- <div class="test" style="color: #efefef;" @click="alipay(orderInfo.orderNo, encodeURIComponent('http://xpt.ziubao.com'))">支付宝支付</div> -->
    <!-- <button style="opacity: 0;" @click="jhsdkpay">建行支付测试</button> -->
    <mu-dialog title="提示" :open.sync="showUpdateDialog">
      龙支付唤起失败，请更新到最新版本
      <mu-button slot="actions" flat color="primary" @click="toUpload">立即更新</mu-button>
    </mu-dialog>

    <l-dialog :show.sync="showPayWayDialog" appendToBody title="请选择支付方式">
      <!-- <div slot="">请选择支付方式</div> -->
      <div style="borderTop: 1px dashed #dfdfdf;">
        <div v-for="(item, word) in payWayObj" :key="word">
          <component :is="item.component" @click.native="toPay(word)"></component>
        </div>
      </div>
    </l-dialog>

    <popup-container
      :show.sync="showOpenTicketDialog"
      appendToBody
      position="bottom"
      title="填写开票申请信息">
      <open-ticket
        v-if="orderInfo && orderInfo.collector"
        :canHandlingFee="orderInfo.canHandlingFee"
        :canServerFee="orderInfo.canServerFee"
        :mobile="orderInfo.collector.tel"
        :colletorName="orderInfo.collector.name"
        :refundServerFee="orderInfo.refundServerFee"
        :orderNo="orderInfo.orderNo"
        :handlingFee="handlingFee"
        :price="price"
        :canBusInvoiced="orderInfo.canBusInvoiced || false"
        @applyBilling="applyBilling">
      </open-ticket>
    </popup-container>

    <alipay-tips-mask :show.sync="showAlipayTipsMask" appendToBody></alipay-tips-mask>
  </div>
</template>

<script>
import PaymentRecommend from '@/components/recommend/payment-recommend'
import PaymentWay from './payment-way'
import CountDown from '@/components/count-down'
import Wxpay from './payment-way-wxpay'
import Alipay from './payment-way-alipay'
import JhSDKPay from './payment-way-jhsdk'
import Nxinpay from './payment-way-nxinpay'
import { isWeiXin, systemInfo } from '@/utils/runtime-env'
import { wxjhPay, wxjhCardPay, getJhOrderId, getActivityMessage } from '@/api'
import { wxAppWay, jhSDKPay, showAndroidCCBPay, checkAndroidVersion } from '@/utils/pay'
import AlipayTipsMask from '@/components/tips-mask/alipay'
import OpenTicket from '@/components/open-ticket'
import PopupContainer from '@/components/layouts/popup-container'

export default {
  components: {
    PaymentWay,
    CountDown,
    PaymentRecommend,
    AlipayTipsMask,
    OpenTicket,
    PopupContainer
  },
  props: {
    type: {
      type: String,
      default: 'plane',
      validator: (value) => {
        return ['plane', 'bus', 'train', 'ship', 'scenery', 'homestay'].indexOf(value) > -1
      }
    },
    orderInfo: {
      type: Object,
      default: () => {}
    },
    status: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    isAndroid () {
      return this.orderInfo && systemInfo.isAndroidWebview(this.orderInfo.appId)
    },
    protocol () {
      return window.location.protocol === 'file:' ? 'https:' : (window.location.protocol || 'https:')
    },
    handlingFee () {
      if (this.orderInfo && this.orderInfo.passengers) {
        return this.orderInfo.passengers.length * this.orderInfo.handlingFee
      }

      return 0
    },
    price () {
      if (this.orderInfo && this.orderInfo.passengers) {
        return this.orderInfo.passengers.length * this.orderInfo.price
      }

      return this.orderInfo.price
    }
  },
  data () {
    return {
      dialogTimeout: false,
      payUri: '',
      payWay: 'wxpay',
      showOpenTicketDialog: false,
      showAlipayTipsMask: false,
      componentsName: {
        plane: 'PlaneTicket',
        bus: 'BusTicketIndex',
        train: 'TrainTicket',
        ship: 'Index',
        scenery: 'Index',
        homestay: 'Index'
      },
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
      paymentStatus: this.status,
      showUpdateDialog: false,
      showPayWayDialog: false,
      activityMsg: '',
      nowSystemTime: new Date().getTime()
    }
  },
  mounted () {
    window.jsSDKPaymentResult = this.jsSDKPaymentResult
    // 判断是否为IOS，是则添加建行SDK支付入口
    if (this.isIOSWebview || isWeiXin()) {
      this.$set(this.payWayObj, 'jhsdkpay', { component: JhSDKPay })
    }

    console.log(window.location.href, window.location)
    this.getActivityMessage()
  },
  destroyed () {
    this.showOpenTicketDialog = false
  },
  methods: {
    toPay (word) {
      const redirectSuccess = encodeURIComponent(this.protocol + '//xpt.ziubao.com/' + window.location.hash)
      switch (word) {
        case 'wxpay': {
          this.wxpay(this.orderInfo.orderNo, redirectSuccess)
          break
        }
        case 'alipay': {
          this.alipay(this.orderInfo.orderNo, redirectSuccess)
          break
        }
        case 'jhsdkpay': {
          this.jhsdkpay(redirectSuccess)
          break
        }
        case 'nxinpay': {
          this.nxinpay(this.orderInfo.orderNo, redirectSuccess)
          break
        }
        default: break
      }
    },
    toShowPayWay () {
      // 1. 显示支付方式
      this.showPayWayDialog = true
    },
    async wxpay (orderNo, uri) {
      // Android原生
      if (this.isAndroid) {
        wxAppWay(orderNo, uri)
        return
      }

      // iOS原生，这里需要注意的是微信浏览器本身也是webview
      // if (systemInfo.isIOSWebview() && !isWeiXin()) {
      //   return
      // }

      let wxpayUri = 'h5wx/pay'
      if (isWeiXin()) {
        wxpayUri = 'wx/pay'
        this.$loading('正在前往支付...')
        try {
          const res = await wxjhPay({ orderNo, redirectSuccess: uri })
          if (res) {
            window.location.href = res
            this.$loading.close()
          }
          return
        } catch (err) {
          throw new Error('支付失败')
        }
      }
      const payUri = `${this.protocol}//xpt.ziubao.com/${wxpayUri}?orderNo=${orderNo}&redirectSuccess=${uri}&redirectFail=${uri}`
      this.$loading('正在前往支付...')

      setTimeout(() => {
        window.location.href = payUri
        this.$loading.close()
      }, 300)
    },
    alipay (orderNo, uri) {
      if (isWeiXin()) {
        // this.$toast('如需支付宝支付请从浏览器访问')
        this.showPayWayDialog = false
        this.showAlipayTipsMask = true
        return
      }
      const alipayUri = 'ali/pay'
      const payUri = `${this.protocol}//xpt.ziubao.com/${alipayUri}?orderNo=${orderNo}&redirectSuccess=${uri}&redirectFail=${uri}`
      this.$loading('正在前往支付...')
      setTimeout(() => {
        window.location.href = payUri
        this.$loading.close()
      }, 300)
    },
    nxinpay (orderNo, uri) {
      const nxinpayUri = 'nsBank/nsBankEpay'
      const payUri = `${this.protocol}//xpt.ziubao.com/${nxinpayUri}?orderNo=${orderNo}&redirectSuccess=${uri}&redirectFail=${uri}`
      this.$loading('正在前往支付...')
      setTimeout(() => {
        window.location.href = payUri
        this.$loading.close()
      }, 300)
    },
    toReOrder () {
      console.log('this.componentsName[this.type]: ', this.componentsName[this.type])
      this.$router.push({ name: this.componentsName[this.type] })
    },
    toHome () {
      this.$router.push('/')
    },
    paymentTimeout () {
      this.dialogTimeout = true
    },
    async jhsdkpay (redirectSuccess) {
      this.$loading('正在前往支付...')
      if (isWeiXin()) {
        let href = await wxjhCardPay({ orderNo: this.orderInfo.orderNo, redirectSuccess })
        if (href) {
          window.location.href = href
        }
        return
      }

      let res = await getJhOrderId({ orderNo: this.orderInfo.orderNo, redirectSuccess })
      this.$loading.close()
      console.log('res: ', res)

      try {
        if (this.isAndroid) {
          showAndroidCCBPay(res, this.orderInfo.totalPrice)
        } else {
          jhSDKPay(res, this.orderInfo.totalPrice, (status) => {
            this.jsSDKPaymentResult(status)
          })
        }
      } catch (err) {
        // 这里出错的原因应该只有找不到该方法，所以提示更新app即可
        // this.$store.commit('SHOW_DIALOG', `请更新APP到最新版本`)
        if (!this.isAndroid) {
          this.showUpdateDialog = true
        } else {
          checkAndroidVersion()
        }
      }
    },
    // 建行SDK支付OC发起的回调处理，mounted需要挂载到window上
    jsSDKPaymentResult (status) {
      const iStatus = parseInt(status)
      // 支付成功
      switch (iStatus) {
        case 1: {
          // this.$toast('取消支付')
          break
        }
        case 0: {
          this.paymentStatus = 1
          this.$emit('update:status', this.paymentStatus)
          break
        }
        default: break
      }
    },
    toUpload () {
      window.location.href = 'https://itunes.apple.com/cn/app/%E8%87%AA%E6%B8%B8%E5%AE%9D/id1267969547?mt=8'
      this.showUpdateDialog = false
    },
    toMyOrder () {
      this.$router.push({ name: 'OrderList' })
    },
    async getActivityMessage () {
      const data = await getActivityMessage({ id: 1 })
      this.activityMsg = data.content
    },
    openTicket () {
      this.showOpenTicketDialog = true
    },
    applyBilling () {
      this.$toast('提交审核成功')
      setTimeout(() => {
        this.showOpenTicketDialog = false
      }, 500)
    },
    toRefreshOrder () {
      this.$router.go(0)
    }
  },
  watch: {
    dialogTimeout (newVal) {
      if (!newVal) {
        this.toHome()
      }
    },
    status (newVal) {
      this.paymentStatus = newVal
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
.payment-status {
  &-wrapper {
    .activity-msg-wrapper {
      margin: vw(10) vw(15);
      padding: vw(10);
      border: 1px dashed $default-color-orange;
      border-radius: vw(5);
      color: $default-color-orange;
      background-color: white;
      background: rgba($color: $default-color-orange, $alpha: .1);
      .jh-qa-item {
        background-color: $default-color-orange;
        color: #fff;
        text-align: center;
        font-size: vw(12);
        padding: vw(5);
        border-radius: vw(5);
        margin-top: vw(3);
      }
    }
  }

  &-tips {
    text-align: center;
    @extend %minor-font;
    .time {
      color: $default-color-orange;
      font-size: vw(16);
    }
  }
  &-pay-way {
    margin: vw(5) vw(10);
  }

  &-commit-btn {
    padding: vw(10);
    margin: vw(10);
    text-align: center;
    color: #fff;
    background-color: $default-color-orange;
    border-radius: 5px;
  }

  &-button-wrapper {
    display: flex;
  }

  &-goto-home {
    flex: 1;
    padding: vw(10);
    margin: vw(10);
    text-align: center;
    color: #fff;
    background-color: $default-color;
    border-radius: 5px;
  }

  &-open-ticket {
    flex: 1;
    padding: vw(10);
    margin: vw(10);
    text-align: center;
    color: $default-color;
    background-color: #fff;
    border: 1px dotted $default-color;
    border-radius: 5px;
  }

  &-success {
    color: $default-color-green;
    display: flex;
    align-items: center;
    font-size: vw(22);
    justify-content: center;
    margin: vw(10);
    .iconfont {
      margin-right: vw(5);
      font-size: inherit;
    }

    &-info {
      padding: vw(10) vw(10) 0 vw(10);
      margin: vw(10);
      background-color: #fff;
      .item {
        padding: vw(10);
        display: flex;
        justify-content: space-between;
        &:not(:last-child) {
          border-bottom: 1px dashed #eee;
        }
        .content {
          color: #777;
        }
      }
    }

    &-tips {
      &>span {
        color: $default-color;
      }
      text-align: center;
      color: $default-color-orange;
    }
  }
}
</style>
