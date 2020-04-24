<template>
  <div @click="onItem"
    class="list-sort-bar-item"
    :class="{ 'is-selected': isSelected }">
    <i v-if="icon" class="iconfont" :class="`icon-${icon}`"></i>
    <slot></slot>
    <span v-if="sortTexts">{{ sortTexts[sortMode] }}</span>
    <span v-else-if="sortText">{{ showText }}</span>
  </div>
</template>

<script>
export default {
  props: {
    sortKey: {
      type: String,
      required: true
    },
    sortTexts: {
      type: Array
    },
    sortText: {
      type: String
    },
    icon: {
      type: String
    }
  },
  computed: {
    id () {
      return (this.$parent.$children.length || 1) - 1
    },
    isSelected () {
      return this.$parent.value === this.id
    },
    showText () {
      if (this.sortMode === 0) {
        return `根据${this.sortText}排序`
      }
      if (this.sortMode === 1) {
        return `${this.sortText}升序`
      }
      if (this.sortMode === 2) {
        return `${this.sortText}降序`
      }
    }
  },
  data () {
    return {
      sortMode: 0
    }
  },
  watch: {
    isSelected (newVal) {
      if (!newVal) {
        this.sortMode = 0
      }
    }
  },
  mounted () {
    if (this.isSelected) {
      this.filterList()
    }
  },
  methods: {
    onItem () {
      this.$parent.$emit('input', this.id)
      // 需要再$emit input生效以后再进行操作
      this.$nextTick(() => {
        if (this.isSelected) {
          this.filterList()
        }
      })
    },
    filterList () {
      if (++this.sortMode > 2) {
        this.sortMode = 1
      }
      this.sortByKey(this.sortMode === 1)
    },
    sortByKey (inc = true) {
      this.$parent.list.sort((a, b) => {
        return inc
          ? (a[this.sortKey] > b[this.sortKey] ? 1 : -1)
          : (a[this.sortKey] < b[this.sortKey] ? 1 : -1)
      })
    }
  }
}
</script>

<style lang="scss">
.list-sort-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  &.is-selected {
    color: $default-color-orange;
  }
}
</style>
