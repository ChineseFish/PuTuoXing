<template>
  <div class="payment-ticket-wrapper">
    <div class="payment-ticket-title">
      <div class="payment-ticket-title-tag" v-if="tag">
        <span>{{ tag }}</span>
      </div>
      <div class="payment-ticket-title-content">
        <div class="payment-ticket-title-primary">
          <span>{{ title }}</span>
        </div>
        <div class="payment-ticket-title-sub">
          <span v-if="subTitle">{{ subTitle }}</span>
          <slot name="subTitle"></slot>
        </div>
        <div class="payment-ticket-title-status" :class="statusClass">{{ statusText }}</div>
      </div>
    </div>
    <div class="payment-ticket-detail" :style="detailStyle">
      <slot></slot>
    </div>
    <div class="payment-ticket-price">
      <div class="payment-ticket-price-content">
        <span class="payment-ticket-price-title">应付金额:</span>
        <span class="payment-ticket-price-number price">{{ `￥${price}` }}</span>
      </div>
      <div class="payment-ticket-detail-btn" @click="ShowDetailChange">
        <span class="payment-ticket-detail-text">订单详情</span>
        <i class="iconfont icon-forward" :style="detailIconStyle"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    price: {
      type: [String, Number],
      default: '0.00'
    },
    tag: {
      type: String
    },
    status: {
      tuype: Number,
      default: 0
    },
    orderNo: {
      type: String,
      default: ''
    }
  },
  computed: {
    detailIconStyle () {
      const style = {
        transition: 'ease-in-out 0.2s'
      }
      style.transform = this.showDetail ? 'rotate(-90deg)' : 'rotate(90deg)'
      return style
    },
    detailStyle () {
      const style = { transition: 'max-height 0.8s' }
      style.maxHeight = this.showDetail ? '400px' : 0
      // style.display = this.showDetail ? 'block' : 'none'
      return style
    },
    statusClass () {
      return `status-${['prepay', 'paid', 'cancel', 'refunding', 'refunded', 'issued'][this.status]}`
    },
    statusText () {
      console.log('this.orderNo:', this.orderNo)
      return this.orderNo.indexOf('Homestay') > -1
        ? this.homestayStatusObj[this.status]
        : this.statusObj[this.status]
    }
  },
  data () {
    return {
      showDetail: true,
      statusObj: ['未支付', '已支付', '已取消', '退票审核中', '已退票', '已出票'],
      homestayStatusObj: ['未支付', '已支付', '已取消', '退款审核中', '已退款', '已确认预订']
    }
  },
  watch: {
    status (newVal) {
      console.log('----:', newVal)
      if (parseInt(newVal) === 1) {
        this.showDetail = false
      }
    }
  },
  methods: {
    ShowDetailChange () {
      this.showDetail = !this.showDetail
    }
  }
}
</script>

<style lang="scss">
.payment-ticket {
  $ticket-background-color: #fff;
  &-wrapper {
    margin: vw(5) vw(10);
  }
  $raduis: 5px;
  &-title {
    position: relative;
    padding: vw(10) $padding-aside;
    border-top-left-radius: $raduis;
    border-top-right-radius: $raduis;
    @include inner-round-corner($ticket-background-color, $raduis, 'bottom-left', 'bottom-right');
    display: flex;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: $raduis;
      right: $raduis;
      border-top: 1px dashed $line-color;
    }
    &-primary {
      font-size: vw(16);
      color: $default-color;
      margin-bottom: vw(5);
      margin-right: vw(50);
    }
    &-tag {
      padding-right: vw(10);
    }
    &-content {
      flex: 1;
    }
    &-tag>span {
      background-color: $default-color;
      border-radius: $raduis;
      color: #fff;
      font-size: vw(12);
      padding: vw(1) vw(3);
    }
    &-sub {
      @extend %minor-font;
    }
    &-status {
      position: absolute;
      right: vw(10);
      top: vw(10);
      font-size: vw(12);
      &.status-cancel {
        color: $default-color-orange;
      }
      &.status-prepayment {
        color: $default-color;
      }
      &.status-paid, &.status-issued {
        color: $default-color-green;
      }
    }
  }
  &-detail {
    overflow: hidden;
    margin: 0 $raduis;
    margin-top: -1px;
    padding: 0 vw(10);
    background: $ticket-background-color;
    border-bottom: 1px dashed $line-color;
    // box-shadow: inset 0 0px 6px 6px $line-color-light;
  }
  &-price {
    padding: vw(10) $padding-aside;
    border-bottom-left-radius: $raduis;
    border-bottom-right-radius: $raduis;
    @include inner-round-corner($ticket-background-color, $raduis, 'top-left', 'top-right');
    display: flex;
    justify-content: space-between;
  }
  &-detail-btn {
    color: $default-color;
    display: flex;
    align-items: center;
    position: relative;
  }
  &-detail-text {
    margin-right: 5px;
  }
}
</style>
