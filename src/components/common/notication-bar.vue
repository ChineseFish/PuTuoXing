<template>
  <div class="notication-bar-wrapper">
    <i class="iconfont icon-tongzhi"></i>
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
.notication-bar-wrapper {
  background-color: #fff3f3;
  color: #555;
  box-shadow: 1px 1px 1px #dfdfdf;
  padding: vw(5) vw(10);
  margin-bottom: 1px;

  display: flex;
  align-items: center;

  .iconfont {
    margin-right: vw(5);
    color: $default-color;
  }
}
</style>
