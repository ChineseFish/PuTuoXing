<template>
  <div class="l-nav-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="l-nav-item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="l-nav-item-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LNavItem',
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1
    }
  }
}
</script>

<style lang="scss">
.l-nav {
  &-item {
    text-align: center;
    height: 100%;
    width: 100%;
    font-size: vw(13);
    &.is-selected {
      color: $default-color;
    }
  }
}
</style>
