<template>
  <div class="order-way-wrapper">
    <slot name="icon"></slot>
    <span>{{ text }}</span>
    <span class="order-way-tips-wrapper" v-if="tipsText">
      <i class="order-way-tips">{{ tipsText }}</i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    tipsText: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.order-way {
  &-wrapper {
    background-color: #fff;
    padding: vw(10);
    font-size: vw(18);
    display: flex;
    align-items: center;
    &>:not(:last-child) {
      margin-right: vw(10);
    }
  }
  &-tips-wrapper {
    margin-top: vw(-10);
  }
  &-tips {
    font-size: vw(10);
    background-color: $default-color-orange;
    color: #fff;
    padding: vw(1) vw(5);
    border-radius: 4px;
    position: relative;
    &:before {
      content: "";
      background: $default-color-orange;
      position: absolute;
      width: vw(5);
      height: vw(5);
      top: 50%;
      left: vw(-4);
      transform: rotate(45deg) translateY(-50%);
    }
  }
}
</style>
