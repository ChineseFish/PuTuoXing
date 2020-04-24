<template>
  <div class="trip-picker-trip-item">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="scss">
.trip-picker-trip-item {
  width: 96%;
  margin: 0 auto;
  padding: vw(8) vw(3);

  &:not(:last-child) {
    // border-bottom: vw(1) solid $line-color;
  }
}
</style>
