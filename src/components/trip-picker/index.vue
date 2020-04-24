<template>
  <main-page class="trip-list-wrapper">
    <div class="trip-list" slot="scroll">
      <slot></slot>
    </div>
  </main-page>
</template>

<script>
export default {
  props: {
    title: String,
    value: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    back () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss">
.trip-list {
  background-color: #fff;
  font-size: vw(16);
  &-wrapper {
  }
}
</style>
