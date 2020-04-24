<template>
  <div class="tabbar-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="item-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LTabbarItem',
  component: 'LTabbarItem',
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1
    }
  }
}
</script>

<style lang="scss">

.tabbar-item {
  text-align: center;
  margin: 5px auto;
  width: 100%;
  color: #888;
  &.is-selected {
    color: $default-color;
  }
  .item-icon {
    .iconfont {
      font-size: vw(22);
    }
  }
  .item-text {
    font-size: vw(10);
  }
}
</style>
