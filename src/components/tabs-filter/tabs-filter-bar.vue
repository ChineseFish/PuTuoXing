<template>
  <div class="tabs-filter-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {}
  }
}
</script>

<style lang="scss">
.tabs-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: vw(40);
  background-color: #fff;
  border-bottom: vw(1) solid $line-color;
}
</style>
