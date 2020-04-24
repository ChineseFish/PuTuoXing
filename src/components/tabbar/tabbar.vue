<template>
  <div class="l-tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LTabbar',
  component: 'LTabbar',
  props: {
    value: {}
  }
}
</script>

<style lang="scss">
.l-tabbar {
  width: 100%;
  height: auto;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #eee;
}
</style>
