<template>
  <button-styles class="telephone-btn-wrapper" :float="float">
    <a class="iconfont icon-telephone" :href="`tel://${number}`"></a>
  </button-styles>
</template>

<script>
import ButtonStyles from './button-styles'
export default {
  components: {
    ButtonStyles
  },
  props: {
    number: {
      type: String,
      default: '0580-2266222'
    },
    float: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.telephone-btn-wrapper {
  a {
    color: #fff;
  }
}
</style>
