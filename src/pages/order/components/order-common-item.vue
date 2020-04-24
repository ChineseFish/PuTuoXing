<template>
  <common-item deletable @delete="handleDelete">
    <div class="order-bus-item-wrapper" @click="toOrderDetail">
      <div class="order-bus-item-content">
        <div class="order-bus-item-left">
          <!-- <span class="order-bus-item-station">
            {{ data.fromStationName }} - {{ data.toStationName }}
          </span>
          <span class="order-bus-item-date">{{ data.queryDate }} {{ data.fromTime }}出发</span> -->
          <component :is="items[type].component" :data="data" v-if="data.orderNo"></component>
        </div>
        <div class="order-bus-item-right" :class="statusClass">
          <span class="price">￥{{ data.totalPrice }}</span>
          <span class="status-text">{{ statusText }}</span>
        </div>
      </div>
      <order-status-btn-group
        :status="status"
        :canRefund="canRefund"
        :type="data.category || type"
        class="order-bus-item-btn-group"
        @cancelOrder="handleCancel"
        @refundOrder="handleRefund"
        @continueToPay="toOrderDetail">
      </order-status-btn-group>
    </div>
  </common-item>
</template>

<script>
import OrderStatusBtnGroup from './order-status-btn-group'
import CommonItem from '@/components/common/common-item'
import BusItem from './bus-item'
import PlaneItem from './plane-item'
import TrainItem from './train-item'
import ShipItem from './ship-item'
import SceneryItem from './scenery-item'
import HomestayItem from './homestay-item'
import { cancelOrder, deleteOrder, refundOrder } from '@/api'

export default {
  components: {
    OrderStatusBtnGroup,
    CommonItem
  },
  props: {
    data: {},
    type: {
      type: String,
      default: 'bus'
    }
  },
  computed: {
    status () {
      let status = parseInt(this.data.status)
      if (isNaN(status)) {
        return -1
      }
      return status
    },
    statusText () {
      if (this.type === 'homestay') {
        return ['未支付', '已支付', '已取消', '退款审核中', '已退款', '已确认预订'][this.status]
      }
      return ['未支付', '已支付', '已取消', '退票审核中', '已退票', '已出票'][this.status]
    },
    statusClass () {
      return ['prepay', 'paid', 'cancel', 'refunding', 'refunded', 'issued'][this.status]
    },
    canRefund () {
      let valid = [1, 5]
      return this.data.canRefund && valid.indexOf(this.data.status) > -1
    }
  },
  data () {
    return {
      items: {
        bus: {
          component: BusItem,
          name: 'OrderQueryBus'
        },
        plane: {
          component: PlaneItem,
          name: 'OrderQueryPlane'
        },
        train: {
          component: TrainItem,
          name: 'OrderQueryTrain'
        },
        ship: {
          component: ShipItem,
          name: 'OrderQueryShip'
        },
        scenery: {
          component: SceneryItem,
          name: 'OrderQueryScenery'
        },
        homestay: {
          component: HomestayItem,
          name: 'OrderQueryHomestay'
        }
      }
    }
  },
  methods: {
    toOrderDetail () {
      this.$router.push({ name: this.items[this.type].name, query: { orderNo: this.data.orderNo } })
    },
    async handleDelete () {
      // 删除操作
      const params = {
        type: this.type,
        orderNo: [this.data.orderNo]
      }
      await deleteOrder(params)
      this.$emit('deleteItem', this.data)
    },
    async handleCancel () {
      const params = {
        type: this.type,
        orderNo: this.data.orderNo
      }
      try {
        await cancelOrder(params)
        this.data.status = 2
        this.$emit('cancelItem', this.data)
      } catch (err) {
        this.$toast('取消订单失败')
      }
    },
    async handleRefund () {
      const params = {
        type: this.type,
        orderNo: this.data.orderNo
      }
      await refundOrder(params)
      // this.$emit('refundOrder', this.data)
      // 状态改为 退票中...
      this.$set(this.data, 'status', 3)
    }
  }
}
</script>

<style lang="scss">
.order-list-item {
  &-wrapper {
    background: white;
    margin: vw(10);
    padding: vw(10) $padding-aside;
    border-radius: vw(6);
  }

  &-content {
    display: flex;
    justify-content: space-between;
  }

  &-left {
    display: flex;
    flex-direction: column;
  }

  &-station {
    font-size: vw(16);
  }

  &-date {
    @extend %minor-font;
  }

  &-right {
    display: flex;
    flex-direction: column;
    text-align: right;
    .status-text {
      font-size: vw(12);
    }
    &.paid, &.issued {
      .status-text {
        color: $default-color-green;
      }
    }

    &.cancel {
      color: $minor-color;
      .price {
        color: inherit;
      }
    }
  }

  &-btn-group {

  }
}
</style>
