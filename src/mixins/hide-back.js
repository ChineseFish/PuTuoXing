export default {
  data () {
    return {
      isHideBack: false
    }
  },
  watch: {
    '$router': {
      handler (newVal, oldVal) {
        if (!oldVal) {
          this.isHideBack = true
        } else {
          this.isHideBack = false
        }
      },
      immediate: true
    }
  }
}
