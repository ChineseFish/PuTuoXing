<template>
  <main-page class="scenery-detail-container"
    back
    headerClass="gradient-style"
    :title="detailData.title"
    @scroll="onScroll"
    ref="main-page">
    <l-tab v-model="selected" ref="tab-fixed" class="scenery-detail-tab scenery-detail-tab-fixed" v-if="showFixedTab">
      <l-tab-item
        @click.native="onItem"
        v-for="(tabItem, tabIndex) of tabList"
        :key="tabIndex">{{ tabItem }}
      </l-tab-item>
    </l-tab>

    <template slot="scroll">
      <l-header-image :images="detailData.images">
        <div class="image-bottom-inner-title" slot="image-bottom-inner">{{ detailData.title }}</div>
      </l-header-image>
      <div class="scenery-detail-header-bottom block-section">
        <div class="item">
          <div class="subtitle">{{ detailData.subTitle }}</div>
          <l-labels :labels="detailData.labels"></l-labels>
        </div>
        <div class="item" @click="toAddressMap">
          <div class="address">
            <i class="iconfont icon-ditu"></i>
            <span>{{ detailData.address }}</span>
          </div>
        </div>
      </div>
      <l-tab v-model="selected" ref="tab" class="scenery-detail-tab">
        <l-tab-item
          @click.native="onItem"
          v-for="(tabItem, tabIndex) of tabList"
          :key="tabIndex">{{ tabItem }}
        </l-tab-item>
      </l-tab>
      <div class="scenery-detail-content block-section" ref="content-0">
        <div class="section-title">
          <!-- <i class="iconfont icon-home-ticket"></i> -->
          <span>票种</span>
        </div>
        <div class="ticket-item-wrapper">
          <div class="ticket-item"
            v-for="(ticketItem, ticketIndex) of detailData.ticketList"
            :key="ticketIndex"
            v-if="isExpandMoreTickets || ticketIndex < 6">
            <div class="left-wrapper">
              <div class="title">{{ ticketItem.showTicketName || ticketItem.ticketName }}</div>
              <div class="sub-title">
                <div class="sold-counts" v-if="ticketItem.soldCounts">已售{{ ticketItem.soldCounts }}</div>
                <div class="sold-counts new" v-else>新品</div>
                <span class="ticket-info" @click="showTicketInfo(ticketItem.ticketInfo)" v-if="ticketItem.ticketInfo">票种说明></span>
              </div>
            </div>
            <div class="right-wrapper">
              <div class="price-wrapper">
                <span class="original-price" v-if="ticketItem.guidePrice">
                  ￥<span class="price-num">{{ ticketItem.guidePrice }}</span>
                </span>
                <span class="price">
                  ￥<span class="price-num">{{ ticketItem.price }}</span>
                </span>
              </div>
              <div class="topay-btn" @click="toBooking(ticketItem)">立即预订</div>
            </div>
          </div>
        </div>
        <div class="ticket-type-more-wrapper" v-if="moreTickets" @click="toShowMoreTickets">
          <span>{{ isExpandMoreTickets ? '收起' : '显示更多票种' }}</span>
        </div>
        <div v-if="!detailData.ticketList || detailData.ticketList.length === 0" class="content-empty">暂不支持网上预订</div>
      </div>
      <div class="scenery-detail-content block-section" ref="content-1">
        <div class="section-title">
          <span>图文详情</span>
        </div>
        <div v-html="detailData.contents" v-if="detailData.contents" class="content"></div>
        <div class="content-empty" v-else>暂无图文详情信息</div>
      </div>
      <div class="scenery-detail-content block-section" ref="content-2">
        <div class="" v-if="detailData.playGuide">
          <div class="section-title">游玩指南</div>
          <div v-html="detailData.playGuide" class="content"></div>
        </div>
        <div class="content-empty" v-else>暂无游玩指南</div>
      </div>
      <div class="scenery-detail-content block-section" ref="content-3">
        <div v-if="detailData.notices && detailData.notices.length !== 0" class="notice-content">
          <div class="notice-item" v-for="(noticeItem, noticeIndex) of detailData.notices" :key="noticeIndex">
            <div class="title">{{ noticeItem.define }}</div>
            <div class="notice-content" v-html="noticeItem.notice"></div>
          </div>
        </div>
        <div class="content-empty" v-else>暂无预订说明信息</div>
      </div>
      <div class="scenery-detail-content block-section" ref="content-4">
        <div class="section-title"><span>优待政策</span></div>
        <div v-html="detailData.preferentialPolicy" v-if="detailData.preferentialPolicy" class="content"></div>
        <div class="content-empty" v-else>暂无优待政策</div>
      </div>
      <!-- <div class="scenery-detail-content block-section" ref="content-4">
        <div v-html="detailData.trafficInfo" v-if="detailData.trafficInfo" class="content"></div>
        <div class="content-empty" v-else>暂无交通出行信息</div>
      </div> -->
    </template>
  </main-page>
</template>

<script>
import { LTab, LTabItem } from '@/components/tab'
import { getScenicDetail } from '@/api'

export default {
  components: {
    LTab, LTabItem
  },
  props: {
    backMode: 'goBack'
  },
  computed: {
    headerHeight () {
      return this.$refs['main-page'].headerHeight
    },
    tabOffsetTop () {
      if (this.$refs['tab'].$el) {
        return this.$refs['tab'].$el.offsetTop
      }
    },
    tabHeight () {
      if (this.$refs['tab'].$el) {
        return this.$refs['tab'].$el.clientHeight
      }
    },
    moreTickets () {
      if (this.detailData.ticketList && this.detailData.ticketList.length > 4) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      detailData: {},
      tabList: ['票种', '图文详情', '游玩指南', '预订说明', '优待政策'],
      selected: 0,
      showFixedTab: false,
      contentOffsetTop: [],
      isExpandMoreTickets: false
    }
  },
  watch: {
    selected (newVal) {
    },
    isExpandMoreTickets (newVal) {
      // 展开收拢的时候重新计算
      this.calcContentOffsetTop()
    }
  },
  mounted () {
    this.getScenicDetail()
  },
  methods: {
    showTicketInfo (value) {
      this.$store.commit('SHOW_DIALOG', value)
    },
    toShowMoreTickets () {
      this.isExpandMoreTickets = !this.isExpandMoreTickets
    },
    async getScenicDetail () {
      this.detailData = await getScenicDetail({ id: this.$route.params.id })
      this.detailData.ticketList.filter((value, index) => {
        switch (value.periodType) {
          case 'day': {
            value.showTicketName = value.ticketName + '-白天'
            break
          }
          case 'night': {
            value.showTicketName = value.ticketName + '-夜晚'
            break
          }
          default:
        }
        return value
      })

      // 可能图片资源未加载完，计算会有偏差
      this.calcContentOffsetTop()

      // 过1000ms再执行一次
      setTimeout(() => {
        this.calcContentOffsetTop()
      }, 1000)
    },
    onScroll (value) {
      this.controlTabFixedShow(value.y)
      this.controlTabSelected(value.y)
    },
    controlTabFixedShow (scrollY) {
      if (-scrollY > this.tabOffsetTop - this.headerHeight) {
        this.showFixedTab = true
      } else {
        this.showFixedTab = false
      }
    },
    controlTabSelected (scrollY) {
      for (let index = 0; index < this.contentOffsetTop.length; ++index) {
        if (-scrollY < this.contentOffsetTop[index] + this.tabHeight) {
          this.selected = index
          break
        }
      }
    },
    calcContentOffsetTop () {
      this.$nextTick(() => {
        for (let index in this.tabList) {
          this.contentOffsetTop[index] = this.$refs[`content-${index}`].offsetTop
        }
        console.log('this.contentOffsetTop', this.contentOffsetTop)
      })
    },
    onItem () {
      const offsetTop = this.contentOffsetTop[this.selected] - this.headerHeight - this.tabHeight
      console.log('offsetTop: ', offsetTop)
      this.$refs['main-page'].calcHeaderOpacity(-offsetTop)
      this.controlTabFixedShow(-offsetTop)
      this.$refs['main-page'].scrollTo(0, -offsetTop)
    },
    toBooking (item) {
      console.log('this.$route: ', this.$route)
      const sceneryDetailData = { ...this.detailData, ticket: item }
      console.log('sceneryDetailData: ', sceneryDetailData)
      this.$store.commit('SET_SCENERY_DETAIL_DATA', sceneryDetailData)
      this.$router.push({ path: `${this.$route.fullPath}/booking` })
      // this.$router.push({ name: 'SceneryTicketBooking' })
    },
    toAddressMap () {
      const { latitude, longitude, address, title } = this.detailData
      this.$router.push({ path: `${this.$route.path}/map`, query: { keyword: address, lat: latitude, lng: longitude, name: title } })
    }
  }
}
</script>

<style lang="scss">
.scenery-detail {
  &-container {
    .image-bottom-inner-title {
      font-size: vw(15);
    }
    .block-section {
      .iconfont {
        color: $default-color;
        margin-right: vw(5);
      }
      .content {
        padding: vw(10) 0;
        p {
          margin: vw(10) 0;
        }
        h2 {
          line-height: 2;
        }
      }

      .content-empty {
        padding: vw(10) 0;
        @extend %minor-font;
      }
    }
    .notice-content {
      overflow: hidden;
    }
    .notice-item {
      margin: vw(10) 0;
      .title {
        font-weight: 600;
        margin-bottom: vw(5);
      }
      .notice-content {
        font-size: vw(12);
      }
    }
  }
  &-header-bottom {
    &>.item:not(:last-child) {
      border-bottom: vw(1) solid #efefef;
    }

    &>.item {
      padding: vw(5);

      .address {
        display: flex;
        align-items: center;
        font-size: vw(12);
      }
    }
  }
  &-content {
    .section-title {
      padding: vw(5) $padding-aside;
      margin-left: -$padding-aside;
      margin-right: -$padding-aside;
      background-color: #f7f7f7;
      display: flex;
      align-items: center;
      border-bottom: vw(1) solid #efefef;
      font-weight: 600;
    }

    .ticket-item {
      position: relative;
      padding: vw(10);
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:not(:last-child) {
        border-bottom: vw(1) solid #efefef;
      }
      .title {
        font-weight: 600;
      }
      .sub-title {
        display: flex;
        align-items: center;
      }
      .ticket-info {
        color: $default-color;
        font-size: vw(10);
        margin-right: vw(10);
        padding: vw(5);
        margin: vw(-5);
      }
      .sold-counts {
        @extend %minor-font;
        font-size: vw(10);
        padding: vw(5);
        margin: vw(-5);
        margin-right: vw(5);
        &.new {
          color: $default-color-orange;
        }
      }
      .right-wrapper {
        flex-shrink: 0;
        text-align: right;
        .topay-btn {
          text-align: right;
          background-color: $default-color-orange;
          color: #fff;
          font-size: vw(12);
          padding: vw(4) vw(10);
          border-radius: vw(2);
          display: inline-block;
        }
        .price {
          font-size: vw(10);
          .price-num {
            font-size: vw(18);
          }
        }
        .original-price {
          @extend %minor-font;
          font-size: vw(10);
          text-decoration: line-through;
          .price-num {
            font-size: vw(12);
          }
        }
      }
    }

    .ticket-type-more-wrapper {
      display: flex;
      justify-content: space-around;
      span {
        position: relative;
        padding: vw(10);
        color: $span-line-color;

        &::before {
          @extend %span-line-style;
          left: calc(#{vw(-5)} - #{$span-line-width});
        }

        &::after {
          @extend %span-line-style;
          right: calc(#{vw(-5)} - #{$span-line-width});
        }
      }
    }
  }
  &-tab-fixed {
    position: fixed !important;
    z-index: 10;
    top: $header-height;
  }
}
</style>
