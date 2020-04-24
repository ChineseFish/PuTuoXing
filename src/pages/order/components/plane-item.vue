<template>
  <div class="order-list-item-left">
    <span class="order-list-item-station">
      {{ data.startCity }} - {{ data.endCity }}
    </span>
    <span class="order-list-item-date">{{ data.startTime | dateTimeFormat }} 出发</span>
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
