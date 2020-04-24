<template>
  <div class="l-list-item" @click="onItem" v-if="!item.isHide">
    <div class="icon-wrapper" v-if="item.icon">
      <i class="iconfont" :class="`icon-${item.icon}`" :style="{ color: item.iconColor }"></i>
    </div>
    <div class="title">{{ item.title }}</div>
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onItem () {
      const item = this.item
      if (item.componentName) {
        this.$router.push({ name: item.componentName, query: item.query })
      } else if (item.url) {
        window.location.href = item.url
      } else if (item.method && typeof item.method === 'function') {
        item.method()
      }
    }
  }
}
</script>

<style lang="scss">
.l-list-item {
  display: flex;
  align-items: center;
  padding: vw(10) vw(0);
  margin: 0 vw(15);
  .icon-wrapper {
    min-width: vw(28);
  }
  .title {
    margin-left: vw(10);
    flex: 1;
  }
}
</style>
