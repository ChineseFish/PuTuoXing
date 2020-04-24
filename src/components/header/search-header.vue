<template>
  <div class="search-header">
    <i class="iconfont icon-back" @click="back"></i>
    <div class="search-header-search-wrapper" v-if="$listeners.onSearch" @click="onSearch()">
      <input class="search-header-search-input"
             autocomplete="off"
             v-model="keyword"
             :placeholder="placeholder"
             readonly>
    </div>
    <div class="search-header-search-wrapper" v-else>
      <input class="search-header-search-input"
             autocomplete="off"
             :placeholder="placeholder"
             v-model="keyword">
      <i class="iconfont icon-close" @click="clear" v-if="keyword"></i>
    </div>
    <div v-if="$listeners.commit" @click="$emit('commit', keyword)" class="search-btn">{{ searchBtnText }}</div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: String,
    searchBtnText: {
      type: String,
      default: '搜索'
    }
  },

  data () {
    return {
      keyword: this.value
    }
  },

  methods: {
    back () {
      this.$emit('back')
    },
    clear () {
      this.keyword = ''
    },
    onSearch () {
      this.$emit('onSearch')
    }
  },

  watch: {
    keyword (newVal) {
      this.$emit('input', newVal)
    },
    value (newVal) {
      this.keyword = newVal
    }
  }
}
</script>

<style lang="scss">
.search-header {

  display: flex;
  align-items: center;
  height: vw(44);
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
  .search-btn {
    margin-left: vw(10);
    color: #fff;
  }
}
</style>
