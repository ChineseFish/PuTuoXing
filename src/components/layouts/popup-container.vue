<template>
  <transition :name="`slide-${position}`">
    <div class="popup-container" v-if="show">
      <l-header :title="title" v-if="title" :style="{ zIndex: 1000 }">
        <i class="iconfont icon-close3" slot="left" @click="hide"></i>
      </l-header>
      <div class="popup-container-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'right',
      validator: (value) => {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) > -1
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    title: ''
  },

  mounted () {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
  },
  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },

  methods: {
    hide () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss">
.popup-container {
  font-size: vw(14);
  z-index: 1000;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  -webkit-transition: all .2s ease-out;
  transition: all .2s ease-out;
  display: flex;
  flex-direction: column;
  &-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.slide-left-enter, .slide-left-leave-active{
  transform: translateX(-100%);
}
.slide-right-enter, .slide-right-leave-active{
  transform: translateX(100%);
}
.slide-up-enter, .slide-up-leave-active {
  transform: translateY(-100%);
}
.slide-bottom-enter, .slide-bottom-leave-active {
  transform: translateY(100%);
}
</style>
