<template>
  <div class="l-form-item list-item">
    <div class="l-form-item-title" @click="onTitle">
      <span>{{ title }}</span>
      <slot name="icon"></slot>
    </div>
    <l-input
      :placeholder="placeholder"
      v-model="curValue"
      :maxLength="maxLength"
      v-if="type === 'input'"></l-input>
    <slot></slot>
  </div>
</template>

<script>
import LInput from '@/components/common/input'
export default {

  components: {
    LInput
  },

  props: {
    title: {
      type: String
    },
    prop: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    maxLength: {
      type: [Number, String],
      default: 999
    },
    canTouchTitle: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'input'
    }
  },

  data () {
    return {
      curValue: this.value
    }
  },

  watch: {
    value (newVal) {
      this.curValue = this.value
    },
    curValue (newVal) {
      this.$emit('input', newVal)
    }
  },

  methods: {
    clear () {
      this.curValue = ''
    },
    onTitle () {
      if (this.canTouchTitle) {
        this.$emit('onTitle')
      }
    }
  }
}
</script>

<style lang="scss">
.l-form-item {
  display: flex;
  align-items: center;
  &-title {
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: vw(10);
  }
}
</style>
