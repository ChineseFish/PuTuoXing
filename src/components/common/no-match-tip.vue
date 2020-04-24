<template>
  <div class="no-match-tip">
    <p class="no-match-tip-icon"><i class="iconfont icon-noresult"></i></p>
    <p class="no-match-tip-text">{{text}}</p>
  </div>
</template>

<script>
export default {
  name: 'NoMatchTip',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.no-match-tip {
  padding: vw(80);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .icon-noresult  {
    color: $minor-color;
    font-size: vw(50);
  }
}
</style>
