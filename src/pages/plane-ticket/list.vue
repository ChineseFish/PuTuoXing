<template>
  <main-page class="plane-ticket-list-container"
             back
             :isLoading="!isLoaded"
             :data="list"
             ref="main-page">
    <div class="l-header-title" slot="header-center">
      <!-- <span>{{ from }}</span>
      <i class="iconfont icon-city-to"></i>
      <span>{{ to }}</span> -->
      机票列表
    </div>

    <datepick-bar v-model="dateTime" :canWebBuyDays="canWebBuyDays"></datepick-bar>

    <section class="plane-ticket-list-wrapper" slot="scroll">
      <div class="plane-ticket-list-item"
          v-for="(item, index) of list"
          :key="index"
          @click="toDetail(item)"
          v-is-link>
        <div class="plane-ticket-list-item-content">
          <div class="place">
            <div class="datetime">{{ item.startTime | timeFormat }}</div>
            <div class="airport">{{ item.startAirport }}</div>
          </div>
          <div class="icon-arrow">
            <i class="city-to"></i>
          </div>
          <div class="place">
            <div class="datetime">{{ item.endTime | timeFormat }}</div>
            <div class="airport">{{ item.endAirport }}</div>
          </div>
          <div class="price-wrapper">
            <div class="price">
              <span class="price-symbol">￥</span><span>{{ item.nowPrice }}</span>
            </div>
            <div class="tips">{{ item.discount }}</div>
          </div>
        </div>
        <div class="plane-ticket-list-item-company">
          <span>{{ item.airCorp }} {{ item.flightNo }}</span>
        </div>
      </div>
    </section>

    <list-sort-bar v-model="sortSelected" :list="list" slot="bottom">
      <list-sort-bar-item sortKey="startTime" :sortTexts="timeTexts" icon="time-xianxing" @click.native="touchSort"></list-sort-bar-item>
      <list-sort-bar-item sortKey="nowPrice" :sortTexts="priceTexts" icon="caiwu-xianxing" @click.native="touchSort"></list-sort-bar-item>
    </list-sort-bar>

  </main-page>
</template>

<script>
import DatepickBar from '@/components/common/datepick-bar'
import MainPage from '@/components/layouts/main-page'
import { ListSortBar, ListSortBarItem } from '@/components/list-sort-bar'
import { getPlaneTicketList } from '@/api'
import { mapGetters } from 'vuex'

export default {
  components: {
    DatepickBar,
    MainPage,
    ListSortBar,
    ListSortBarItem
  },
  props: {
    from: String,
    to: String,
    time: String,
    category: [Number, String]
  },
  computed: {
    ...mapGetters([
      'queryHistory',
      'queryDate',
      'canWebBuyDays'
    ]),
    lastHistory () {
      let queryHistoryItem = this.queryHistory['plane']
      return queryHistoryItem.slice(-1)[0]
    },
    fromStationCode () {
      return this.from || (this.lastHistory && this.lastHistory.start.code)
    },
    toStationCode () {
      return this.to || (this.lastHistory && this.lastHistory.end.code)
    },
    planeCategory () {
      return parseInt(this.category) === 2 ? 'foreign-plane' : 'internal-plane'
    }
  },
  data () {
    return {
      list: [],
      scrollHeight: 0,
      dateTime: this.time,
      isLoaded: false,
      priceTexts: ['按价格排序', '价格从低到高', '价格从高到低'],
      timeTexts: ['按时间排序', '时间从早到晚', '时间从晚到早'],
      sortSelected: 0
    }
  },
  mounted () {
    this.dateTime = this.time || this.queryDate
    this.getList()
  },
  methods: {
    toDetail (item) {
      const planeInfo = Object.assign({}, item, {
        category: this.planeCategory,
        fromCode: this.fromStationCode,
        toCode: this.toStationCode,
        date: this.dateTime
      })
      this.$store.commit('SET_DETAILDATA', { type: 'plane', value: planeInfo })
      this.$router.push({ name: 'PlaneTicketDetail' })
    },
    async getList () {
      let params = {
        sCityCode: this.from,
        eCityCode: this.to,
        date: this.dateTime,
        category: this.category
      }
      this.isLoaded = false
      this.list = await getPlaneTicketList(params) || []
      if (this.list) {
        this.list = this.list.filter(value => {
          if (value.discount === '10折') {
            value.discount = '全价'
          }

          if (value.size > 1) {
            return false
          }

          return value
        })
      }
      this.isLoaded = true
    },
    touchSort () {
      this.$refs['main-page'].scrollToTop(0)
    }
  },
  watch: {
    dateTime () {
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.plane-ticket-list {
  &-container {
    background-color: $background-color;
  }

  &-wrapper {
    padding-bottom: vw(55);
  }

  &-item {
    background-color: #fff;
    border-bottom: 1px solid $line-color;
    padding: vw(10);

    &-content {
      display: flex;
      align-items: center;
      margin-right: vw(20);
    }
    &-company {
      @extend %minor-font;
      padding-top: vw(10);
    }

    .place {
      display: flex;
      flex-direction: column;
      // flex: 1;
    }

    .icon-arrow {
      flex: 1;
    }

    .datetime {
      font-size: vw(20);
    }

    .airport {
      @extend %minor-font;
    }

    .price-wrapper {
      overflow: hidden;
      flex-grow: 1;
      text-align: right;
      font-size: vw(20);
      display: flex;
      flex-direction: column;

      .tips {
        @extend %minor-font;
      }
    }

    .city-to {
      // width: vw(100);
      // height: 1px;
    }
  }

  &-sort {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: vw(50);
    background: rgba(44, 136, 211, 0.6);
    color: #fff;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: vw(12);
    .sort-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-checked {
        color: $default-color-orange;
      }
    }
  }
}
</style>
