<template>
  <div class="main-page">
    <l-header :title="showTitle" :back="back && !headerClass" v-if="!noHeader" :class="headerClass" ref="main-page-header">
      <template slot="left">
        <slot name="header-left"></slot>
      </template>
      <template slot="center">
        <slot name="header-center"></slot>
      </template>
      <template slot="right">
        <slot name="header-right"></slot>
      </template>
    </l-header>

    <go-back-btn v-if="headerClass && back" class="main-page-go-back-btn"></go-back-btn>

    <slot></slot>

    <loading v-if="isLoading"></loading>
    <b-scroll ref="scroller"
      :style="{ marginBottom: `${bottomElHeight}px` }"
      @scroll="onScroll"
      :pullDownRefresh="pullDownRefresh"
      :pullup="pullup"
      @pulldown="scroll => $emit('pulldown', scroll)"
      @scrollToEnd="scroll => $emit('scrollToEnd', scroll)"
      class="main-page-scroller"
      v-if="$slots.scroll && !isLoading">
      <!-- <pulldown-loading v-if="pullDownRefresh"></pulldown-loading> -->
      <slot name="no-data">
        <no-match-tip v-if="data && data.length === 0" :text="noMatchText"></no-match-tip>
      </slot>

      <div class="main-page-scoller-wrapper" :style="{ paddingBottom: `${paddingBottom}px` }">
        <slot name="scroll"></slot>
      </div>
    </b-scroll>

    <div ref="bottom" class="main-page-bottom" v-if="$slots.bottom">
      <slot name="bottom"></slot>
    </div>

    <div ref="bottom-fixed" class="main-page-bottom-fixed" v-if="$slots.bottomFixed">
      <slot name="bottomFixed"></slot>
    </div>

    <transition name="page-move" mode="out-in">
      <router-view v-if="!noChildren"></router-view>
    </transition>
  </div>
</template>

<script>
import NoMatchTip from '@/components/common/no-match-tip'
import Loading from '@/components/common/loading'
import PulldownLoading from '@/components/common/pulldown-loading'
import { systemInfo } from '@/utils/runtime-env'

export default {
  components: {
    Loading,
    NoMatchTip,
    PulldownLoading
  },
  provide () {
    return {
      listenScroll: true,
      probeType: 3
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    back: {
      type: Boolean,
      default: false
    },
    noChildren: {
      type: Boolean,
      default: false
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    doRefresh: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    noMatchText: {
      type: String,
      default: '今日已无班次信息'
    },
    pullup: {
      type: [Boolean, Object],
      default: false
    },
    pullDownRefresh: {
      type: [Boolean, Object],
      default: false
    },
    headerClass: {
      type: String
    }
  },
  computed: {
    innerHeight () {
      // console.log(this.innerHeight)
      return window.innerHeight
      // return document.body.offsetHeight
    },
    scrollHeight () {
      // console.log(this.offsetTop, this.innerHeight, this.bottomElHeight)
      return window.innerHeight - this.offsetTop - this.bottomElHeight
    }
  },
  data () {
    return {
      offsetTop: 0,
      bottomElHeight: 0,
      paddingBottom: 0,
      headerAlpha: this.headerClass ? 1 : 0,
      showTitle: this.title,
      headerStyle: null,
      headerHeight: 0,
      scrollY: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calcScrollHeight()
    })
    if (systemInfo.isSafari()) {
      this.paddingBottom = 60
    }
    window.onresize = () => {
      // this.calcScrollHeight()
    }

    this.$nextTick(() => {
      if (this.$refs['main-page-header']) {
        const el = this.$refs['main-page-header'].$el
        this.headerStyle = el.style
        this.headerHeight = el.clientHeight
        console.log('this.headerHeight: ', this.headerHeight)
      }
    })
  },
  methods: {
    calcScrollHeight () {
      if (!this.$slots.scroll || !this.$refs.scroller) {
        return
      }
      let scrollEl = this.$refs.scroller.$el
      this.offsetTop = scrollEl.offsetTop
      this.bottomElHeight = this.$refs.bottom ? this.$refs.bottom.offsetHeight : 0
    },
    orientationchange (e) {
      this.$nextTick(() => {
        this.calcScrollHeight()
      })
    },
    scrollToTop () {
      if (this.$refs.scroller) {
        this.$refs.scroller.scrollTo(0, 0)
      }
    },
    scrollTo (x, y) {
      if (this.$refs.scroller) {
        this.$refs.scroller.scrollTo(x, y)
      }
    },
    stop () {
      if (this.$refs.scroller) {
        this.$refs.scroller.stop()
      }
    },
    onScroll (value) {
      this.scrollY = value.y
      this.calcHeaderOpacity(value.y)
      this.$emit('scroll', value)
    },
    calcHeaderOpacity (scrollY) {
      if (this.headerClass &&
          this.headerClass === 'gradient-style') {
        if (scrollY >= 0) {
          this.headerAlpha = 0
        } else if (scrollY > -80 && scrollY < 0) {
          this.headerAlpha = scrollY / -80
        } else if (scrollY <= -80) {
          this.headerAlpha = 1
        }
        this.headerStyle['opacity'] = this.headerAlpha
      }
    }
  },
  watch: {
    isLoading (newVal) {
      this.$nextTick(() => {
        this.calcScrollHeight()
      })
    },
    doRefresh () {
      this.$nextTick(() => {
        this.$refs.scroller.refresh()
      })
    },
    innerHeight () {
      this.calcScrollHeight()
    },
    title: {
      immediate: true,
      handler (newVal) {
        this.showTitle = newVal
      }
    }
  }
}
</script>

<style lang="scss">
.main-page {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: $background-color;
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: vw(-2) vw(2) vw(8) #ccc;
  &-go-back-btn {
    position: fixed;
    line-height: $header-height;
    color: #fff;
    z-index: 10;
  }
  .gradient-style {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    opacity: 0;
  }
  &-scroller {
    overflow: hidden;
    flex: 1;
  }
  &-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .page-move-enter, .page-move-leave-active {
    transform: translate(105%, 0);
  }

  .page-move-enter-active, .page-move-leave-active {
    transition: transform .35s;
  }
}
</style>
