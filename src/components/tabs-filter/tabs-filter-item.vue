<template>
  <div class="tabs-filter-item"
    @click="onItem()">
    <div class="item-text" :class="itemTextClass">
      <span>{{ label }}</span>
      <i class="iconfont icon-downarrow"></i>
    </div>
    <div class="dropdown-container" v-show="showDropdown">
      <div class="dropdown-wrapper" :style="dropdownStyle">
        <div v-for="(item, index) of options"
          :key="index"
          @click.stop="onSubItem(item)"
          class="dropdown-subitem"
          :class="subItemClass(item)">
          {{ item.label || item }}
        </div>
      </div>
      <div class="dropdown-mask" :style="dropdownStyle" @click.stop="showDropdown = false"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {},
    value: '',
    defaultLabel: ''
  },
  computed: {
    itemTextClass () {
      return this.label === this.defaultLabel ? 'item-text-default' : 'item-text-filter'
    }
  },
  data () {
    return {
      dropdownStyle: '',
      showDropdown: false,
      label: this.defaultLabel
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log('parent', this.$parent)
      this.dropdownStyle = {
        top: `${this.$parent.$el.offsetTop + this.$parent.$el.offsetHeight}px`
      }
    })
  },
  methods: {
    onItem () {
      const children = this.$parent.$children
      for (let child of children) {
        child.showDropdown = false
      }
      this.showDropdown = true
      console.log('onItem!')
    },
    onSubItem (item) {
      this.showDropdown = false
      this.label = item.label || item
      this.$emit('input', item.value === undefined ? item : item.value)
      this.$emit('selected')
    },
    subItemClass (item) {
      return this.value === item.value ? 'item-selected' : ''
    }
  }
}
</script>

<style lang="scss">

.tabs-filter-item {
  flex: 1;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  .item-text {
    align-items: center;
    display: flex;
    position: relative;
    &.item-text-default {
      color: #333;
    }

    &.item-text-filter {
      color: $default-color;
    }
  }

  .dropdown-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    max-height: 70vw;
    z-index: 10;
    background-color: #fff;
    border-bottom: vw(1) solid $line-color;
    padding: vw(10) vw(15);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .dropdown-subitem {
      line-height: 2;
    }
    .item-selected {
      color: $default-color;
      position: relative;

      &::after {
        content: '✓';
        color: $default-color;
      }
    }
  }

  .dropdown-mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    z-index: 9;
  }
}
</style>
