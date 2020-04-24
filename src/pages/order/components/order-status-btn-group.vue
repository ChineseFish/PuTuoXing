<template>
  <div class="order-status-btn-group">
    <span class="order-status-btn status-cancel" v-if="status == 0" @click.stop="cancelOrder">取消订单</span>
    <span class="order-status-btn status-topay" v-if="status == 0" @click.stop="continueToPay">继续支付</span>

    <span class="order-status-btn status-topay" v-if="canRefund" @click.stop="refundOrder">
      <span>申请退款</span>
    </span>
    <l-dialog
      v-if="canRefund"
      :show.sync="showRefundDialog"
      appendToBody
      confirmStyle
      title="您确认要退款吗"
      class="order-status-btn-group-dialog"
      @handleConfirm="handleConfirm"
      confirmText="提交申请"
      @handleCancel="handleCancel">
      <p>退款说明：</p>
      <div v-html="refundMsg"></div>
      <!-- <p class="content">{{ info1 }}</p>
      <p class="content">{{ info2 }}</p>
      <p class="content">3. 退票成功后将会在3个工作日内到账。</p>
      <p class="content">4. 部分车票不受理网上退票，如有疑问请联系客服热线咨询：<a href="tel://0580-2266222">0580-2266222</a></p> -->
    </l-dialog>
    <!-- <i class="iconfont icon-wenhao" v-if="status == 1" @click.stop="showRefundNotice"></i> -->
  </div>
</template>

<script>
import { getRefundTicketNotice } from '@/api'
export default {
  props: {
    status: Number,
    canRefund: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      showRefundDialog: false,
      refundMsg: ''
    }
  },
  mounted () {
  },
  methods: {
    cancelOrder () {
      this.$emit('cancelOrder')
    },
    continueToPay () {
      this.$emit('continueToPay')
    },
    async refundOrder () {
      this.refundMsg = await getRefundTicketNotice({ category: this.type })
      this.$nextTick(() => {
        this.showRefundDialog = true
      })
    },
    handleConfirm () {
      this.showRefundDialog = false
      this.$emit('refundOrder')
    },
    handleCancel () {
      this.showRefundDialog = false
    }
  }
}
</script>

<style lang="scss">
.order-status-btn {
  padding: vw(3) vw(8);
  border-radius: vw(6);
  margin: vw(10) 0 0;
  margin-left: vw(15);
  font-size: vw(12);

  &-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .iconfont {
      margin: vw(10) 0 0 vw(3);
    }
    .status-cancel {
      border: 1px solid #bbb;
    }
    .status-topay {
      background-color: $default-color;
      color: white;
    }

    &-dialog {
      .content {
        @extend %minor-font;
        padding-top: vw(10);
      }
    }
  }
}
</style>
