<template>
  <div class="order-list-item-left">
    <span class="order-list-item-station">
      {{ data.fromStationName }} - {{ data.toStationName }}
    </span>
    <span class="order-list-item-date">{{ data.queryDate }} {{ data.fromTime }} 出发</span>
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
