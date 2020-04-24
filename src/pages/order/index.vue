<template>
  <div class="order-container">
    <div class="item" @click="toShipOrder">船票订单</div>
    <div class="item" @click="toOrder">其他订单</div>
  </div>
</template>

<script>
export default {
  methods: {
    toOrder () {
      this.$router.push({ name: 'OrderList' })
    },
    toShipOrder () {
      window.location.href = 'http://m.ziubao.com/grzx.htm'
    }
  }
}
</script>

<style lang="scss">
.order-container {
  background-color: white;
  padding: $padding-aside;
  .item {
    margin-bottom: vw(10);
    border: 1px solid #eee;
    border-radius: vw(10);
    background-color: $default-color;
    background: linear-gradient($default-color, rgb(126, 158, 244));
    color: white;
    padding: vw(10);
    text-align: center;
  }
}
</style>
