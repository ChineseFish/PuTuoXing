<template>
  <div class="plane-bus-item">
    <div class="cell-box">
      <div class="cell-item cell-time">
        <div class="depart-time">{{depTime}}</div>
        <div class="travel-time" v-if="travelTime">{{travelTime}}</div>
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
          <span class="type">{{busTpe}}</span>
        </div>
      </div>
      <div class="cell-item cell-ticket">
        <div class="current-price" v-if="price">
          <span class="price-symbol">￥</span>
          <span class="price-number">{{price}}</span>
        </div>
        <span class="amount" v-if="amount">{{amount}}张</span>
        <span v-else><i class="iconfont icon-forward"></i></span>
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
    }
  }
}
</script>

<style lang="scss">
.plane-bus-item {
  margin-bottom: vw(3);
  padding: vw(10) $padding-aside;
  border-bottom: vw(1) solid $line-color-light;
  background-color: $white;
  font-size: vw(14);
  .cell-box {
    display: flex;
    width: 100%;
    .cell-time {
      width: 29%;
      display: flex;
    }
    .cell-item {
      flex-direction: column;
      justify-content: center;
    }
    .depart-time {
      font-size: vw(20);
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
