<template>
  <span class="button-styles" :class="float ? 'float-class' : ''" >
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    float: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.button-styles {
  &.float-class {
    background: rgba(7, 17, 27, .5);
    width: vw(30);
    height: vw(30);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
}
</style>
