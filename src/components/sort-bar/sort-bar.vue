<template>
  <div class="y-sort-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YSortBar',
  props: {
    value: [String, Number],
    activeColor: {
      type: String,
      default: '#ff7d13'
    }
  }
}
</script>

<style lang="scss">
.y-sort-bar {
  box-sizing: border-box;
  padding: vw(5) $padding-aside;
  display: flex;
  justify-content: center;
  align-items: center;
  height: vw(40);
  background-color: rgba(35, 180, 255, 0.5);
  text-align: center;
  .y-sort-item {
    flex: 1;
  }
}
</style>
