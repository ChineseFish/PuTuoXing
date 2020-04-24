<template>
  <div class="order-list-item-left">
    <span class="order-list-item-station">
      {{ data.goodName }}
    </span>
    <span class="order-list-item-date">{{ data.checkInDate }}入住 {{ data.checkOutDate }}离店</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {}
  }
}
</script>

<style lang="scss">

</style>
