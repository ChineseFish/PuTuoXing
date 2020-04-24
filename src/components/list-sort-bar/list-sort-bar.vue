<template>
  <div class="list-sort-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.list-sort-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(35, 180, 255, 0.7);
  color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: vw(12);
  height: vw(50);
}
</style>
