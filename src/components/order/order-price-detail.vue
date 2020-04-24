<template>
  <div class="order-price-detail">
    <div class="detail">
      <p class="detail-item"
         v-for="(item, index) in list"
         :key="index"
         v-if="item.price && item.count">
        <span>{{item.name}}</span>
        <span>￥{{item.price}} x {{item.count}}</span>
      </p>
      <!-- <p class="detail-tips">7x24小时在线预订，专业客服贴心服务，无需排队放心购票</p> -->
      <!-- <p class="detail-tips">承诺服务费低价，差价核实100%补偿！</p> -->
      <p class="detail-sum-price">总金额：￥{{ total || 0}}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      protocol: ''
    }
  },
  computed: {
    total () {
      let result = 0
      for (const item of this.list) {
        if (item.price) {
          result += item.price * item.count
        }
      }
      return result
    }
  },
  methods: {
    getProtocol () {
      this.protocol = '汽车票预订协议内容'
    },
    showProtocol () {
      this.getProtocol()
      this.$emit('showProtocol', this.protocol)
    }
  }
}
</script>

<style lang="scss">
.order-price-detail {
  color: $minor-color;
  .detail {
    padding: vw(4) vw(10);
    border-radius: vw(4);
    background-color: $background-color -#111;
    &-item {
      margin: vw(5) 0;
      display: flex;
      justify-content: space-between;
      &:last-child {
        margin-bottom: vw(10);
      }
    }
    &-tips {
      font-size: vw(12);
    }
    &-sum-price {
      font-size: vw(16);
      color: $default-color-orange;
      text-align: right;
    }
  }
  .protocol {
    padding: vw(15) 0 vw(20) 0;
    font-size: vw(13);
    &-link {
      color: $default-color;
    }
  }
}
</style>
