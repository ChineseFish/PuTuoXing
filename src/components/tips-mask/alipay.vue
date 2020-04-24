<template>
  <div class="alipay-mask-wrapper" @click="onMask" v-show="show">
    <div class="close-button" v-if="hasClose">
      <i class="iconfont icon-close3"></i>
    </div>
    <img :src="imgSrc">
  </div>
</template>

<script>
import { systemInfo } from '@/utils/runtime-env'
export default {
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    hasClose: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgSrc () {
      const isIOS = systemInfo.isIOS()
      return isIOS ? 'static/images/alipay-tips-ios.png' : 'static/images/alipay-tips-android.png'
    }
  },
  mounted () {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
  },
  destroyed () {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    onMask () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss">
.alipay-mask-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;

  .close-button {
    position: absolute;
    top: vw(10);
    left: vw(10);
    color: #fff;
    .iconfont {
      font-size: vw(30);
    }
  }
}
</style>
