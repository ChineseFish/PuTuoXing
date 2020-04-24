<template>
  <div class="bus-info">
    <p class="bus-info-time">
      <span>{{depDate | dateFormat}}</span>
      <span>{{depTime}}</span>
      出发
    </p>
    <p class="bus-info-station">
      <span class="from">{{fromSta}}</span>
      <i v-if="toSta" class="iconfont icon-city-to"></i>
      <span class="to" v-if="toSta">{{toSta}}</span>
      <span class="bus-info-time back-time" v-if="backDate || backTime">
        <span>（{{ backDate | dateFormat }}</span>
        <span>{{ `${backTime} 返程` }}）</span>
      </span>
    </p>
    <p class="bus-info-price">
      <span>票价<span class="price">￥{{price}}</span></span>
      <span v-if="handlingFee">代订服务费<span class="price">￥{{handlingFee}}</span></span>
      <span v-if="surplus">余票: <span class="surplus">{{surplus}}</span></span>
    </p>
    <slot name="labels"></slot>
  </div>
</template>

<script>
export default {
  props: {
    fromSta: {
      type: String,
      default: ''
    },
    toSta: {
      type: String,
      default: ''
    },
    depDate: {
      type: String
    },
    depTime: {
      type: [String, Number]
    },
    price: {
      type: [String, Number],
      default: 0
    },
    handlingFee: {
      type: [String, Number],
      default: 0
    },
    surplus: {
      type: String,
      default: ''
    },
    backDate: {
      type: String
    },
    backTime: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.bus-info {
  padding: vw(10) $padding-aside;
  background-color: #fff;
  &-time {
    font-size: vw(18);
    &.back-time {
      font-size: vw(12);
    }
  }
  &-station {
    display: flex;
    align-items: center;
    .from {
      flex-shrink: 0;
    }
    .to {
      @include text-overflow();
    }
  }
  &-price {
    .surplus {
      color: $default-color-orange;
    }
  }
}
</style>
