<template>
  <div class="bus-item-wrapper" :class="{'disable-item': isDisable}" v-is-link>
    <div class="cell-box">
      <div class="cell-item cell-time" v-if="depTime">
        <div class="depart-time">{{depTime}}</div>
        <div class="travel-time" v-if="travelTime">{{travelTime}}</div>
        <div class="back-time" v-if="backTime">
          <span class="back-time-tips">返</span>
          <span class="back-time-text">{{ backTime }}</span>
        </div>
      </div>
      <div class="cell-item cell-station">
        <div class="station">
          <div class="station-icon"></div>
          <div class="station-info">
            <div class="depart-station">{{startPort}}</div>
            <div class="arr-station">{{endPort}}</div>
          </div>
        </div>
        <div class="bus-type" v-if="busType">
          <i class="iconfont icon-qichepiao"></i>
          <span class="type">{{busType}}</span>
        </div>
      </div>
      <div class="cell-item cell-ticket">
        <div class="current-price" v-if="price">
          <span class="price-symbol">￥</span>
          <span class="price-number">{{price}}</span>
        </div>
        <span class="amount" v-if="amount">{{amount}}</span>
        <span class="disable-reason" v-if="isDisable">{{reason}}</span>
        <!-- <span class="" v-if="showTicketInfo">{{ showTicketInfo }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaneBusItem',
  props: {
    depTime: {
      type: String,
      default: ''
    },
    travelTime: {
      type: String,
      default: ''
    },
    toTime: String,
    backTime: String,
    startPort: {
      type: String,
      default: ''
    },
    endPort: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: ''
    },
    busType: {
      type: String,
      default: ''
    },
    amount: {
      type: [Number, String],
      default: 0
    },
    disable: {
      type: Boolean,
      default: false
    },
    reason: {
      type: String
    },
    showTicketInfo: {
      type: String
    }
  },
  computed: {
    isDisable () {
      return this.disable
    }
  }
}
</script>

<style lang="scss">
.bus-item-wrapper {
  margin-bottom: vw(3);
  padding: vw(10) vw(28) vw(10) $padding-aside;
  border-bottom: vw(1) solid $line-color-light;
  background-color: $white;
  font-size: vw(14);
  &.disable-item {
    color: $disable-color!important;
    .station-icon {
      &:before, &::after{
        border-color: $disable-color!important;
      }
    }
    .current-price, .bus-type, .price-symbol {
      color: $disable-color!important;
    }
  }
  .cell-box {
    display: flex;
    width: 100%;
    .cell-time {
      min-width: 29%;
      display: flex;
      margin-right: vw(10);
    }
    .cell-item {
      flex-direction: column;
      justify-content: center;
    }
    .back-time {
      &-tips {
        color: $default-color-orange;
      }
      &-text {
        font-size: vw(12)
      }
    }
    .depart-time {
      font-size: vw(20);
      text-align: center;
    }
    .travel-time {
      @extend %minor-font;
    }
    .cell-station {
      overflow: hidden;
      flex-grow: 1;
      display: flex;
      line-height: 1.7;
    }
    .station {
      display: flex;
    }
    .station-icon {
      width: vw(2);
      height: vw(14);
      background-color: $line-color-light;
      position: relative;
      top: vw(16);
      left: vw(7);
      &::before, &::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        left: vw(-2);
        border-radius: 50%;
        width: vw(6);
        height: vw(6);
      }
      &::before {
        top: vw(-8);
        border: vw(2) solid green;
      }
      &::after {
        bottom: vw(-8);
        border: vw(2) solid red;
      }
    }
    .station-info {
      overflow: hidden;
      flex-grow: 1;
      margin-left: vw(20);
    }
    .depart-station, .arr-station {
      @include text-overflow();
    }
    .bus-type {
      display: flex;
      align-items: center;
      @extend %minor-font;
      .type {
        padding-left: vw(6);
      }
    }
    .cell-ticket {
      width: 23%;
      display: flex;
      text-align: right;
    }
    .current-price {
      color: $price-color;
      font-size: 0;
      .price-symbol {
        font-size: vw(12);
      }
      .price-number {
        font-size: vw(20);
      }
    }
    .amount {
      font-size: vw(12);
    }
  }
}
</style>
