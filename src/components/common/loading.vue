<template>
  <div class="loading">
    <div class="loading-box">
      <img src="../../assets/loading.svg">
    </div>
    <div>别急，我正在努力加载中...</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.loading {
  padding: vw(80);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: $minor-color;
  &-box {
    margin-bottom: vw(14);
  }
}
</style>
