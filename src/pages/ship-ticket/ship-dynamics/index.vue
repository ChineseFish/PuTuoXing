<template>
  <main-page title="船班动态" back class="ship-dynamics-wrapper" ref="main-page">
    <l-tab v-model="selected">
      <l-tab-item v-for="(item, index) of list" :key="index" class="area-item">
        {{ item.name }}
      </l-tab-item>
    </l-tab>
    <div class="ship-dynamics-content" slot="scroll" ref="scroller">
      <template v-if="name && dynamicsInfo[name]">
        <div v-for="(dynamicsItem, dynamicsIndex) of dynamicsInfo[name]"
          :key="dynamicsIndex"
          class="dynamics-item">
          <div class="title">
            {{ dynamicsItem.confrom }}
          </div>
          <div class="desc">
            {{ dynamicsItem.description }}
          </div>
          <div class="datetime">
            {{ dynamicsItem.datetime }}
          </div>
        </div>
      </template>
      <div v-else class="show-info-text">{{ isLoading ? '正在获取船班动态...' : '暂无船班动态' }}</div>
    </div>
  </main-page>
</template>

<script>
import { getShipArea, getShipDynamics } from '@/api'
import { LTab, LTabItem } from '@/components/tab'

export default {
  components: {
    LTab,
    LTabItem
  },
  data () {
    return {
      list: [],
      selected: 0,
      dynamicsInfo: {},
      name: '',
      isLoading: true
    }
  },
  watch: {
    'selected' (newVal) {
      this.$refs['main-page'].scrollToTop()
      this.name = this.list[this.selected].name
      this.getShipDynamics()
    }
  },
  mounted () {
    this.getShipArea()
  },
  methods: {
    async getShipArea () {
      this.list = await getShipArea({ isQueryBoatInfo: 1 })
      console.log(this.list)
      try {
        this.name = this.list[0].name
        this.getShipDynamics()
      } catch (err) {
        throw new Error('获取船班动态失败')
      }
    },
    async getShipDynamics () {
      const params = {
        area: this.name,
        pageSize: 30
      }
      this.isLoading = true
      try {
        const res = await getShipDynamics(params)
        this.isLoading = false
        this.$set(this.dynamicsInfo, this.name, res)
      } catch (err) {
        this.isLoading = false
        throw new Error('获取船班动态失败')
      }
    }
  }
}
</script>

<style lang="scss">
.ship-dynamics {
  &-wrapper {
    .area-item {
      padding: vw(5) vw(10);
    }
  }
  &-content {
    padding-bottom: vw(20);
    .dynamics-item {
      margin: vw(10);
      padding: vw(10);
      background-color: #fff;
      border-radius: vw(5);
      .title {
        font-weight: 500;
        font-size: vw(16);
      }
      .datetime {
        @extend %minor-font;
      }
    }
    .show-info-text {
      padding: vw(10);
      text-align: center;
    }
  }
}
</style>
