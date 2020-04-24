<template>
  <div class="city-header">
    <i class="iconfont icon-back" @click="back"></i>
    <div class="city-header-search-wrapper">
      <input class="city-header-search-input"
             autocomplete="off"
             placeholder="输入城市关键字"
             v-model="keyword">
      <i class="iconfont icon-close" @click="clear" v-if="keyword"></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },

  methods: {
    back () {
      this.$emit('back')
    },
    clear () {
      this.keyword = ''
    }
  },

  watch: {
    keyword (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>

<style lang="scss">
.city-header {
  display: flex;
  align-items: center;
  // height: vw(40);
  background: $default-color;
  box-sizing: border-box;
  padding: 0 $padding-aside 0 vw(10);

  .icon-back {
    margin-right: vw(10);
    color: #fff;
  }
  &-search-wrapper {
    flex-grow: 1;
    padding: vw(5) vw(10);
    background: #fff;
    border-radius: vw(3);
    display: flex;
    align-items: center;
    .iconfont {
      @extend %minor-font;
    }
  }
  &-search-input {
    width: 100%;
  }
}
</style>
