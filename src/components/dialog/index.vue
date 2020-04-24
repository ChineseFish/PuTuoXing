<template>
  <div class="l-dialog">
    <transition name="l-mask">
      <l-mask v-show="show" @hide="hide"></l-mask>
    </transition>
    <transition name="l-dialog">
      <div v-show="show" class="dialog-wrapper" ref="wrapper">
        <div class="title" v-if="title" ref="header">{{ title }}</div>
        <div class="dialog-content-wrapper has-button-group" ref="content"
          :style="{
            height: (isScrollContent) ? realContentHeight + footerHeight + 'px' : 'auto'
          }"
          :class="{'is-scroll-content': isScrollContent}">
          <slot></slot>
        </div>
        <div class="button-group" v-if="$listeners.handleConfirm || $listeners.handleCancel" ref="footer">
          <div v-if="$listeners.handleCancel" class="cancel-button" @click="handleCancel">{{ cancelText }}</div>
          <div v-if="$listeners.handleConfirm" class="confirm-button" @click="handleConfirm">{{ confirmText }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import LMask from '../common/mask'
export default {
  components: {
    LMask
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    handle: {
      type: Function,
      default: null
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    confirmStyle: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    preventClose: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wrapperHeight () {
      return this.$refs['wrapper'] ? this.$refs['wrapper'].clientHeight : 0
    },
    headerHeight () {
      return this.$refs['header'] ? this.$refs['header'].clientHeight : 0
    },
    footerHeight () {
      return this.$refs['footer'] ? this.$refs['footer'].clientHeight : 0
    },
    contentHeight () {
      return this.$refs['content'] ? this.$refs['content'].clientHeight : 0
    },
    availableHeight () {
      return this.wrapperHeight - this.headerHeight - this.footerHeight
    }
  },
  data () {
    return {
      realContentHeight: 0,
      isScrollContent: false
    }
  },
  mounted () {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
    console.log('this.$listeners', this.$listeners, this.$refs, this.$refs.wrapper)
  },
  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },

  methods: {
    hide () {
      // 阻止点击mask关闭
      if (this.preventClose) {
        return
      }

      this.$emit('update:show', false)
      if (this.handle && typeof this.handle === 'function') {
        this.handle()
      }
    },
    scrollToTop () {
      this.$nextTick(() => {
        this.$refs.wrapper.scrollTop = 0
        this.$refs.content.scrollTop = 0
      })
    },
    calcContentHeight () {
      this.isScrollContent = false
      this.$nextTick(() => {
        console.log('availableHeight: ', this.availableHeight)
        if (this.contentHeight > this.availableHeight) {
          this.realContentHeight = this.availableHeight
          this.isScrollContent = true
        }
        // this.realContentHeight = Math.min(this.contentHeight, this.availableHeight)
      })
    },
    handleCancel () {
      this.$emit('handleCancel')
    },
    handleConfirm () {
      this.$emit('handleConfirm')
    }
  },
  watch: {
    'show' (newValue) {
      console.log(this.$refs)
      this.$emit('update:show', newValue)
      if (newValue) {
        this.$emit('show')
        this.calcContentHeight()
        this.scrollToTop()
      } else {
        this.$emit('hide')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/transition.scss';

.l-dialog {
  .dialog-wrapper {
    position: absolute;
    z-index: 5000;
    width: 90%;
    max-height: 70vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    // text-align: center;
    border-radius: 3px;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;

    .title {
      text-align: center;
      font-size: vw(16);
      font-weight: 600;
      padding-bottom: vw(10);
    }

    .dialog-content-wrapper {
      overflow-y: auto;
      padding: vw(10);
      margin: vw(-10);
      -webkit-overflow-scrolling: touch;
    }
    .is-scroll-content {
      padding-bottom: vw(50);
    }

    .button-group {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: vw(16);
      background-color: #fff;
      // height: vw(70);
      &>* {
        flex: 1;
        text-align: center;
        padding: vw(10);
      }
      &>:not(:last-child) {
        border-right: 1px solid #eee;
      }
      .confirm-button {
        color: $default-color;
      }
      .cancel-button {
        color: $minor-color;
      }

      &:after {
        content: '';
        border-top: 1px solid #eee;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
    }
  }
}
</style>
