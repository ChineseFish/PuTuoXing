<template>
  <div class="l-input-wrapper">
    <input :type="type"
           :placeholder="placeholder"
           :maxlength="maxLength"
           :readonly="readonly"
           v-model="curValue"
           @focus="onFocus"
           @blur="onBlur">
    <i class="iconfont icon-close2" @click.stop="clear" v-if="curValue && (isFocus || clearable)"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: String
    },
    maxLength: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      curValue: this.value,
      isFocus: false
    }
  },

  watch: {
    value (newVal) {
      this.curValue = newVal
    },
    curValue (newVal) {
      this.$emit('input', newVal)
    }
  },

  methods: {
    clear () {
      this.curValue = ''
    },
    onFocus () {
      this.isFocus = true
    },
    onBlur () {
      // 马上失去焦点icon将会马上隐藏，则无法触发clear事件
      this.$nextTick(() => {
        this.isFocus = false
      })
      // 因弹出键盘将页面往上顶，需将其回归原位，加上体验不佳，不加safari浏览器会有问题（后续考虑针对Safari Hack）
      // document.body.scrollTop = 0
    }
  }
}
</script>

<style lang="scss">
.l-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    padding: vw(5) 0;
    padding-right: vw(30);
  }
  .iconfont {
    color: $placeholder-color;
    font-size: vw(16);
  }
}
</style>
