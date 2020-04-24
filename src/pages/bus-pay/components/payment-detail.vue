<template>
  <div class="payment-detail">
    <div class="payment-detail-item passenger" v-if="passengers">
      <span class="label">乘车人</span>
      <ul class="passenger-list">
        <li class="info-item passenger-item"
            v-for="(item, index) in passengers"
            :key="index">
          <p class="info-main">{{item.name}}</p>
          <p class="info-sub">证件号码：{{item.id}}</p>
        </li>
      </ul>
    </div>
    <div class="payment-detail-item receiver" v-if="collector">
      <span class="label">取票人</span>
      <div class="info-item receiver-info">
        <p class="info-main">{{collector.name}}</p>
        <p class="info-sub" v-if="collector.id">证件号码：{{collector.id}}</p>
      </div>
    </div>
    <div class="payment-detail-item tel" v-if="collector">
      <span class="label">联系电话</span>
      <div class="info-item tel-info">
        <p>{{collector.tel}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    passengers: {
      type: Array,
      default: null
    },
    collector: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.payment-detail {
  background-color: #fff;
  .payment-detail-item {
    display: flex;
    padding: vw(6) 0;
    &:not(:last-child) {
      border-bottom: 1px solid $line-color-light;
    }
    font-size: vw(13);
    .label {
      width: vw(100);
      padding-right: vw(20);
      font-size: vw(15);
    }
    .info-main {
      font-size: vw(14);
    }
    .info-sub {
      @extend %minor-font;
    }
  }
  .passenger {
    &-list {
      flex: 1;
    }
    &-item {
      &:not(:first-child) {
        padding: vw(6) 0;
        border-top: 1px solid $line-color-light;
      }
      &:last-child {
        padding-bottom: 0;
      }
      &:first-child {
        padding-bottom: vw(6);
      }
    }
  }
}
</style>
