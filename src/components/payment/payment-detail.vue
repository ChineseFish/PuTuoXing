<template>
  <div class="order-detail">
    <div class="order-detail-item">
      <div class="order-detail-item-title">明细</div>
      <div class="order-detail-item-content">
        <div class="content-item" v-if="detail.ticket">
          <p>{{ detail.ticket.ticketName }}</p>
          <p>￥{{ detail.ticket.price }} * {{ detail.ticket.count }}</p>
        </div>
        <div class="content-item" v-if="detail.insurPrice">
          <p>保险</p>
          <p>￥{{ detail.insurPrice }} * {{ detail.passengers.length }}</p>
        </div>
        <div class="content-item" v-if="detail.airportPrice">
          <p>机建费+燃油费</p>
          <p>￥{{ detail.airportPrice }} * {{ detail.passengers.length }}</p>
        </div>
        <div class="content-item" v-if="detail.handlingFee">
          <p>代订服务费</p>
          <p>￥{{ detail.handlingFee }} * {{ detail.passengers.length }}</p>
        </div>
      </div>
    </div>
    <div class="order-detail-item" v-if="detail.passengers">
      <div class="order-detail-item-title">乘客</div>
      <div class="order-detail-item-content">
        <div v-for="(item, index) in detail.passengers" :key="index">
          <p>
            <span>{{ item.name }}</span>
            <span class="label">{{ item.passengerType == '2' ? '儿童票' : '成人票' }}</span>
            <span class="passenger-price" v-if="item.price">￥{{ item.price }}</span>
          </p>
          <p class="id">{{ idTypeName(item) }}：{{ item.id }}</p>
          <div class="seat" v-if="item.seatNo">座位：{{ item.seatNo }}</div>
        </div>
      </div>
    </div>
    <div class="order-detail-item" v-if="detail.collector">
      <div class="order-detail-item-title">{{ collectorTitle }}</div>
      <div class="order-detail-item-content">
        <p class="name">{{ detail.collector.name }}</p>
        <p v-if="detail.collector.id" class="id">{{ idTypeName(detail.collector) }}：
          <span>{{ detail.collector.id }}</span>
        </p>
        <p class="tel">手机：<span class="important">{{ detail.collector.tel }}</span></p>
      </div>
    </div>
    <div class="order-detail-item" v-if="detail.checkInDate && detail.checkOutDate">
      <div class="order-detail-item-title">入离日期</div>
      <div class="order-detail-item-content" v-if="detail.collector">
        {{ detail.checkInDate | dateFormat }}入住 - {{ detail.checkOutDate | dateFormat }}离店
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object
    },
    type: {
      type: String
    },
    collectorTitle: {
      type: String,
      default: '联系人'
    }
  },
  methods: {
    idTypeName (item) {
      const idType = item.idType || item.type
      return parseInt(idType) === 3 ? '护照' : '身份证'
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
    align-items: center;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }

    &-title {
      width: vw(80);
    }

    &-content {
      flex: 1;
      p {
        display: flex;
        align-items: center;
      }
      .label {
        font-size: vw(9);
        padding: vw(2) vw(5);
        margin-left: vw(5);
        border: vw(1) solid #999;
        color: #777;
        border-radius: vw(5);
      }
      .passenger-price {
        flex: 1;
        text-align: right;
        @extend %content-minor-font;
      }
      .tel, .id .seat {
        @extend %content-minor-font;
      }

      .important {
        font-size: vw(15);
        color: $default-color;
      }

      .name {
        font-size: vw(14);
      }

      .content-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:not(:first-child) {
          padding-top: vw(5);
        }
        &:not(:last-child) {
          padding-bottom: vw(5);
          border-bottom: 1px solid #eee;
        }
        p {
          @extend %content-minor-font;
        }
      }
    }
  }
}
</style>
