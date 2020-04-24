<template>
  <div class="section-title-wrapper">
    <div class="home-recommend-header-title">
      <i class="iconfont" :class="icon"></i>
      <span>{{ title }}</span>
    </div>
    <div class="more" v-if="$listeners.toMore" @click="toMore">
      <span>{{ moreText || '查看更多' }}</span>
      <i class="iconfont icon-forward"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMore: {
      type: Boolean,
      default: false
    },
    moreText: '',
    title: '',
    icon: ''
  },

  mounted () {
    console.log(this)
  },

  methods: {
    toMore () {
      this.$emit('toMore')
    }
  }
}
</script>

<style lang="scss">
.section-title-wrapper {
  display: flex;
  align-items: center;
  padding: vw(10) 0;
  justify-content: space-between;
}
</style>
