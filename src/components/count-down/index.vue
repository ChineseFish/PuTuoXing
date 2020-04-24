<template>
  <span class="count-time">{{ showTime }}</span>
</template>

<script>
import { formatDateMMSS } from '@/utils/date-format.js'
export default {
  props: {
    time: {
      type: [String, Number]
    }
  },

  computed: {
    showTime () {
      if (this.second > 0) {
        return formatDateMMSS(this.second * 1000)
      } else if (this.second < 0) {
        this.$emit('timeout')
        return '-'
      }
    }
  },

  data () {
    return {
      interval: null,
      second: 0
    }
  },

  beforeDestroy () {
    clearInterval(this.interval)
  },

  methods: {
    countDown () {
      if (!this.second) {
        return
      }

      this.interval = setInterval(() => {
        if (this.second > 0) {
          --this.second
        } else {
          clearInterval(this.interval)
        }
      }, 1000)
    }
  },

  watch: {
    time (newVal) {
      this.second = (newVal - new Date().getTime()) / 1000
      this.countDown()
    }
  }
}
</script>

<style lang="scss">
.count-time {
  color: $default-color-orange;
}
</style>
