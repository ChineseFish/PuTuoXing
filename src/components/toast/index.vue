<template>
  <div class="l-toast">
    <transition name="l-mask">
      <l-mask v-show="show" @hide="hide"></l-mask>
    </transition>
    <transition name="l-dialog">
      <div v-show="show" class="toast-wrapper">
        <slot></slot>
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
    }
  },
  methods: {
    hide () {
      this.$emit('update:show', false)
    }
  },
  watch: {
    'show' (newValue) {
      this.$emit('update:show', newValue)
      if (newValue) {
        this.$emit('show')
      } else {
        this.$emit('hide')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
