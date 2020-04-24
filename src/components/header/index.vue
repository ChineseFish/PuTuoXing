<template>
  <header
    class="l-header"
    :class="{ 'is-fixed': fixed }">
    <div class="l-header-button is-left">
      <i class="iconfont icon-back" v-if="back || $listeners.onBack" @click.once="toBack"></i>
      <slot name="left"></slot>
    </div>
    <div class="is-center">
      <h1 class="l-header-title" v-text="title" v-if="title"></h1>
      <slot name="center"></slot>
    </div>
    <div class="l-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LHeader',
  components: {
  },
  props: {
    fixed: Boolean,
    title: String,
    back: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toBack ($event) {
      this.$emit('onBack')

      if (this.$listeners.onBack) {
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.l-header {
  align-items: center;
  background-color: $header-color;
  box-sizing: border-box;
  color: $default-font-color;
  display: flex;
  font-size: vw(16);
  height: $header-height;
  line-height: 1.5;
  // padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;

  &-button {
    flex: .5;

    &>:first-child {
      background-color: transparent;
      border: 0;
      box-shadow: none;
      color: inherit;
      display: inline-block;
      padding: 0;
      padding-right: 10px;
      font-size: inherit;
      &:after {
        content: none;
      }
    }
  }

  .is-left {
    text-align: left;
    font-size: vw(13);
    &>.iconfont {
      margin-left: vw(10);
    }
  }

  .is-right {
    text-align: right;
    font-size: vw(13);
  }

  .is-center {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    font-size: vw(16);
    font-weight: normal;
    .l-header-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: inherit;
      font-weight: 400;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
  }

  .iconfont {
    font-size: vw(20);
  }

  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    z-index: 201;
  }
}
</style>
