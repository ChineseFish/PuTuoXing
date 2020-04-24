<template>
  <div class="l-nav">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LNav',
  props: {
    value: {}
  }
}
</script>

<style lang="scss">
.l-nav {
  width: 100%;
  display: flex;
  align-items: center;
  // justify-content: space-around;
}
</style>
