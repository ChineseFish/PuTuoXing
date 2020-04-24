<template>
  <button-styles class="goto-home-btn" :float="float">
    <i @click="gotoHome" class="iconfont icon-shouye-xianxing"></i>
  </button-styles>
</template>

<script>
import ButtonStyles from './button-styles'
export default {
  components: {
    ButtonStyles
  },
  props: {
    url: {
      type: String,
      default: 'xpt.ziubao.com/'
    },
    float: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      componentName: 'Index'
    }
  },
  methods: {
    gotoHome () {
      if (this.componentName) {
        this.$router.push({ name: this.componentName })
      } else {
        window.location.href = this.url
      }
    }
  }
}
</script>

<style lang="scss">
</style>
