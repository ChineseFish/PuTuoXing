<template>
  <div class="y-sort-item">
    <a class="y-sort-label" @click="labelClicked" :style="activeStyle">{{labelText}}</a>
  </div>
</template>

<script>
export default {
  name: 'YSortItem',
  props: {
    sortText: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: null
    },
    field: {
      type: String
    },
    value: {
      type: Number
    }
  },
  data () {
    return {
      flag: this.value
    }
  },
  computed: {
    id () {
      return (this.$parent.$children.length || 1) - 1
    },
    isActive () {
      return this.$parent.value === this.id
    },
    activeStyle () {
      return {
        color: this.isActive ? this.$parent.activeColor : ''
      }
    },
    labelText () {
      if (!this.isActive) {
        return `根据${this.sortText}排序`
      }
      let text
      switch (this.flag) {
        case -1: text = `${this.sortText}降序`
          break
        case 0: text = `根据${this.sortText}排序`
          break
        case 1: text = `${this.sortText}升序`
          break
        default: text = ''
      }
      return text
    }
  },
  methods: {
    labelClicked () {
      this.flag = this.flag === 0 ? 1 : -this.flag
      this.$parent.$emit('input', this.id)
    },
    sortBy (flag) {
      if (flag === 0) return
      const reg = /^[0-2][0-9]:[0-5][0-9]$/
      this.list.sort((a, b) => {
        if (reg.test(a[this.field])) {
          a = this.resolveHHMM(a[this.field])
          b = this.resolveHHMM(b[this.field])
        } else {
          a = parseInt(a[this.field])
          b = parseInt(b[this.field])
        }
        return a < b
          ? (flag > 0 ? -1 : 1)
          : (flag > 0 ? 1 : -1)
      })
    },
    resolveHHMM (HHMM) {
      let arr = HHMM.split(':')
      return 60 * parseInt(arr[0]) + parseInt(arr[1])
    }
  },
  watch: {
    isActive (newVal) {
      this.flag = newVal ? 1 : 0
    },
    flag (newVal) {
      this.sortBy(newVal)
    }
  }
}
</script>

<style lang="scss">
.y-sort-item {
  .y-sort-label {
    color: #fff;
  }
  .y-sort-panel {
    overflow: hidden;
    padding: 0 $padding-aside;
    position: absolute;
    top: vw(40);
    right: 0;
    left: 0;
    max-height: 0;
    text-align: left;
    background-color: #fff;
    transition: max-height 0.1s;
    z-index: 200;
    .list {

    }
    .item {
      padding: vw(8) 0;
      &:not(:last-child) {
        border-bottom: 1px solid $line-color-light;
      }
    }
  }
}
</style>
