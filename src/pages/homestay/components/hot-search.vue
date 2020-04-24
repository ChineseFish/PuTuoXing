<template>
  <div class="homestay-hot-search-list">
    <div v-for="(item, index) of hotSearchValues"
      :key="index"
      class="homestay-hot-search-item"
      @click="onHotSearchValue(item)">
      {{ item }}
    </div>
  </div>
</template>

<script>
import { getHomestayHotSearchList } from '@/api'

export default {
  data () {
    return {
      hotSearchValues: []
    }
  },
  mounted () {
    this.getHomestayHotSearchList()
  },
  methods: {
    onHotSearchValue (item) {
      this.$emit('onItem', item)
    },
    async getHomestayHotSearchList () {
      this.hotSearchValues = await getHomestayHotSearchList()
    }
  }
}
</script>

<style lang="scss">
.homestay-hot-search-list {
  display: flex;
  align-items: center;
  // justify-content: space-around;
  flex-wrap: wrap;
  margin: vw(10) 0;
  .homestay-hot-search-item {
    background-color: #eee;
    width: calc(25% - #{vw(10)});
    margin: vw(5) vw(5);
    padding: vw(3);
    text-align: center;
    border-radius: vw(3);
    color: #333;
  }
}
</style>
