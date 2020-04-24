<template>
  <div class="l-labels-wrapper">
    <span class="label" v-for="(label, labelIndex) of labels" :key="labelIndex">
      {{ label.title }}
    </span>
  </div>
</template>

<script>

export default {
  props: {
    labels: {
      type: Array
    }
  }
}
</script>

<style lang="scss">
.l-labels-wrapper {
  display: flex;
  align-items: center;
  padding: vw(3) 0;
  .label {
    border-radius: vw(2);
    padding: vw(1) vw(3);
    border: vw(0.5) solid;
    color: $default-color;
    font-size: vw(9);
    margin-right: vw(4);
    background-color: rgba($default-color + #750, 0.2);
  }
}
</style>
