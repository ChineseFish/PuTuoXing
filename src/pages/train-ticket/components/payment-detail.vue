<template>
  <div class="order-detail">
    <div class="order-detail-item">
      <div class="order-detail-item-title">费用明细</div>
      <div class="order-detail-item-content">
        <div class="content-item" v-if="detail.oneTicketPrice">
          <p>成人</p>
          <p>￥{{ detail.oneTicketPrice }} * {{ detail.passengers.length }}</p>
        </div>
        <div class="content-item" v-if="detail.insurancePrice">
          <p>保险</p>
          <p>￥{{ detail.insurancePrice }} * {{ detail.passengers.length }}</p>
        </div>
      </div>
    </div>
    <div class="order-detail-item">
      <div class="order-detail-item-title">乘坐人</div>
      <div class="order-detail-item-content" v-if="detail.passengers">
        <div v-for="(item, index) in detail.passengers" :key="index">
          <p>{{ item.name }}</p>
          <p class="id">身份证：{{ item.id }}</p>
        </div>
      </div>
    </div>
    <div class="order-detail-item">
      <div class="order-detail-item-title">联系人</div>
      <div class="order-detail-item-content" v-if="detail.collector">
        <p>{{ detail.collector.name }}</p>
        <p class="tel">手机：{{ detail.collector.tel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
.order-detail {
  color: #333;
  %content-minor-font {
    font-size: vw(12);
    color: #999;
  }
  &-item {
    display: flex;
    padding: vw(5) 0;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }

    &-title {
      width: vw(80);
    }

    &-content {
      flex: 1;
      .tel, .id {
        @extend %content-minor-font;
      }

      .content-item {
        display: flex;
        justify-content: space-between;
        &:not(:first-child) {
          padding-top: vw(5);
        }
        &:not(:last-child) {
          padding-bottom: vw(5);
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
</style>
