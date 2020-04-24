<template>
  <main-page class="scenery-index-container" back headerClass="gradient-style" :title="title">
    <template slot="scroll">
      <!-- <l-header-image imgSrc="/static/images/ship-nav-home.jpg"></l-header-image> -->
      <l-header-image type="scenery"></l-header-image>
      <div class="scenery-index-section scenery-index-nav-wrapper">
        <div class="section-title">
          <i class="iconfont icon-scenery"></i><span>类别推荐</span>
        </div>
        <div class="nav-list-wrapper">
          <div class="nav-item-wrapper" v-for="(item, index) of navList" :key="index" @click="toSceneryList(item)">
            <div class="nav-item">
              <span class="title">{{ item.title }}</span>
              <span class="sub-title">{{ item.subTitle }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scenery-index-section scenery-index-content-wrapper">
        <div class="section-title">
          <i class="iconfont icon-hot"></i><span>热门推荐</span>
        </div>
        <div class="scenery-index-list-wrapper">
          <div class="scenery-index-item-wrapper" v-for="(item, index) of list" :key="index" @click="toSceneryDetail(item.id)">
            <img :src="item.image" alt="" class="item-image">
            <div class="item-right-content">
              <div class="title">{{ item.title }}</div>
              <l-labels :labels="item.labels"></l-labels>
              <div class="sold-counts" v-if="item.soldCounts > 20">已售{{ item.soldCounts }}份</div>
              <div class="sold-counts new" v-else>新品</div>
              <div class="city-place">{{ item.city }} {{ item.place }}</div>
            </div>
            <div class="price-wrapper">
              <span class="guide-price" v-if="item.guidePrice && parseInt(item.guidePrice) !== 0">￥<span class="price-num">{{ item.guidePrice }}</span></span>
              <span class="price">￥<span class="price-num">{{ item.price }}</span>起</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </main-page>
</template>

<script>
import { getScenicList } from '@/api'
export default {
  props: {
    navList: Array,
    category: {
      type: String,
      default: ''
    },
    title: String,
    address: String
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getScenicList()
  },
  methods: {
    toSceneryDetail (id) {
      this.$router.push({ path: `${this.$route.path}/detail/${id}` })
    },
    async getScenicList () {
      const res = await getScenicList({ category: this.category })
      this.list = res.data
    },
    toSceneryList (item) {
      console.log('09999999-', this.$route)
      if (item.detailId) {
        this.toSceneryDetail(item.detailId)
      } else {
        this.$router.push({ path: `${this.$route.path}/list`, query: { place: item.place, category: this.category, address: item.address } })
      }
    }
  }
}
</script>

<style lang="scss">
.scenery-index {
  &-container {
    .nav-list-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: vw(5) vw(10) vw(10);
      .nav-item-wrapper {
        width: 33%;
        padding: vw(5);
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: vw(7);
          // border: vw(1) solid rgba(0, 0, 0, .13);
          border-radius: vw(4);
          box-shadow: 2px 2px 10px rgba(0, 0, 0, .20);
          background-color: #fff;
          .title {
            font-weight: 400;
            font-size: vw(16);
            color: #444;
          }
          .sub-title {
            font-size: vw(10);
            color: #888;
          }
        }
      }
    }

    .scenery-index-section {
      &>.section-title {
        padding: vw(5) vw(10) 0;
        color: $default-color-orange;
        font-size: vw(15);
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: vw(5);
        }
      }
    }
  }

  &-content-wrapper {
    // background-color: #fff;
    background-color: #fafafa;
  }

  &-list-wrapper {
    &>:not(:last-child) {
      border-bottom: vw(1) solid $line-color;
    }
  }

  &-nav-wrapper {
    background-color: #fff;
    background-color: #fafafa;
    margin-bottom: vw(10);
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
