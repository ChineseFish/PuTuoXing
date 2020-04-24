<template>
  <div class="order-list-item-left order-list-item-scenery-wrapper">
    <span class="order-list-item-name">
      {{ data.goodName }}
      <span class="book-count">({{ data.bookCount }}张)</span>
    </span>
    <span class="order-list-item-date">限 {{ data.queryDate }} 有效</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {}
  }
}
</script>

<style lang="scss">
.order-list-item-scenery-wrapper {
  .order-list-item-name {
    font-size: vw(16);

    .book-count {
      font-size: vw(12);
    }
  }
}
</style>
