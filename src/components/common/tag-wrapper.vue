<template>
  <div class="l-tag-wrapper">
    <span class="tag-item" :class="itemClass" v-for="(tag, tagIndex) of tagList" :key="tagIndex">
      {{ tag }}
    </span>
  </div>
</template>

<script>

export default {
  props: {
    tagList: {},
    itemClass: ''
  }
}
</script>

<style lang="scss">
.l-tag-wrapper {
  .tag-item {
    background-color: $default-color;
    // background-image: linear-gradient(137deg, #f55 0, #ff46b7 100%);
    background-image: linear-gradient(-89deg, #16cfff 2%, #26a2ff 100%);
    border-radius: vw(4);
    color: #fff;
    font-size: vw(10);
    padding: vw(1) vw(4);
    word-break: keep-all;
    margin: vw(3) 0;
    margin-right: vw(8);
    line-height: 2;
    &.font-size-12 {
      font-size: vw(12);
      padding: vw(1) vw(4);
    }
    &.font-size-16 {
      font-size: vw(16);
      padding: vw(2) vw(6);
    }
  }
}
</style>
