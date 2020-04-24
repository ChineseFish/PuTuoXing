<template>
  <main-page class="scenery-list-container" back :title="`旅游门票${this.place ? '-'+this.place : '列表'}`">
    <template slot="scroll">
      <!-- <l-header-image imgSrc="/static/images/ship-nav-home.jpg"></l-header-image> -->
      <!-- <l-header-image type="scenery"></l-header-image> -->
      <div class="scenery-list-content-wrapper">
        <div class="scenery-list-item-wrapper" v-for="(item, index) of list" :key="index" @click="toSceneryDetail(item)">
          <img :src="item.image" alt="" class="item-image">
          <div class="item-right-content">
            <div class="title">{{ item.title }}</div>
            <l-labels :labels="item.labels"></l-labels>
            <div class="sold-counts" v-if="item.soldCounts > 10">已售{{ item.soldCounts }}份</div>
            <div class="sold-counts new" v-else>新品</div>
            <div class="city-place">{{ item.city }} {{ item.place }}</div>
          </div>
          <div class="price-wrapper">
            <span class="guide-price" v-if="item.guidePrice && parseInt(item.guidePrice) !== 0">￥<span class="price-num">{{ item.guidePrice }}</span></span>
            <span class="price">￥<span class="price-num">{{ item.price }}</span>起</span>
          </div>
        </div>
        <l-part-line v-if="list.length === 0" :text="nullMessage"></l-part-line>
      </div>
    </template>
  </main-page>
</template>

<script>
import { getScenicList } from '@/api'
import LPartLine from '@/components/common/part-line'
export default {
  components: {
    LPartLine
  },
  props: {
    place: String,
    category: String,
    address: String
  },
  computed: {
    nullMessage () {
      const messageMap = {
        'beauty': '暂无景点信息',
        'show': '暂无演出信息，敬请期待'
      }
      return messageMap[this.category] || ''
    }
  },
  data () {
    return {
      list: null,
      query: this.$router.query
    }
  },
  mounted () {
    this.getScenicList()
    console.log('query: ', this.query, this.category)
  },
  methods: {
    toSceneryDetail (item) {
      this.$router.push({ path: `list/detail/${item.id}` })
    },
    async getScenicList () {
      const res = await getScenicList({ place: this.place, category: this.category, address: this.address })
      this.list = res.data
    }
  }
}
</script>

<style lang="scss">
.scenery-list {
  &-container {
  }

  &-content-wrapper {
    background-color: #fff;

    &>:not(:last-child) {
      border-bottom: vw(1) solid $line-color;
    }
  }

  &-item-wrapper {
    position: relative;
    display: flex;
    padding: vw(10);
    .item-image {
      width: vw(110);
      height: vw(70);
      margin-right: vw(10);
    }
    .item-right-content {
      display: flex;
      flex-direction: column;
      // align-items: center;
      .title {
        font-weight: 600;
      }
      .sold-counts {
        @extend %minor-font;
        font-size: vw(11);
        &.new {
          color: $default-color-orange;
        }
      }
      .labels-wrapper {
        display: flex;
        align-items: center;
        padding: vw(3) 0;
        .label {
          padding: 0 vw(2);
          border: vw(0.5) solid;
          color: $default-color;
          font-size: vw(10);
          margin-right: vw(2);
        }
      }
      .city-place {
        @extend %minor-font;
        font-size: vw(11);
      }
    }
    .price-wrapper {
      position: absolute;
      right: vw(10);
      bottom: vw(10);
      font-size: vw(10);
      color: #999;
      // display: flex;
      // flex-direction: column;
      .price-num {
        font-size: vw(18);
      }
      .guide-price {
        text-decoration: line-through;
        .price-num {
          font-size: vw(14);
        }
      }
    }
  }
}
</style>
