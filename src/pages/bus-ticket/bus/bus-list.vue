<template>
  <main-page :title="`${start} - ${end}`"
             :isLoading="!isLoaded"
             :data="allBusList"
             back
             class="bus-list-container"
             ref="main-page">
    <datepick-bar v-model="pickedDate" :canWebBuyDays="canWebBuyDays"></datepick-bar>
    <section class="bus-ticket-list-container" slot="scroll">
      <div class="recommend-route-item" v-if="recommendData.tripId" @click="toRecommendRoute(recommendData)" v-is-link>
        <span class="tips">推荐乘坐的豪华大巴</span>
        <div class="title">{{ recommendData.tripName }}</div>
        <div class="labels-wrapper">
          <div v-for="(item, index) of recommendData.labels" :key="index" v-if="recommendData.labels" class="label-item" :style="{color: item.labelColor}">
            <span class="label">{{ item.title }}</span>
          </div>
        </div>
        <div class="price-wrapper">
          <span class="price">{{ recommendData.minPrice }}</span>起
        </div>
      </div>
      <div>
        <bus-item-canbuy v-for="(item, index) in busListCanBuy"
                :key="index"
                :depTime="item.fromTime"
                :startPort="item.fromStationName"
                :endPort="item.toStationShow || item.toStationName"
                :price="item.fullPrice"
                :busType="item.busType"
                :amount="item.showTicketInfo"
                @click.native="toBusOrder(item)">
      </bus-item-canbuy>
      </div>
      <div>
        <bus-item-disable v-for="(item, index) in busListDisable"
                :key="index"
                :depTime="item.fromTime"
                :startPort="item.fromStationName"
                :endPort="item.toStationShow || item.toStationName"
                :price="item.fullPrice"
                :busType="item.busType"
                disable
                :reason="item.showTicketInfo">
      </bus-item-disable>
      </div>
    </section>

    <list-sort-bar v-model="sortSelected" :list="busListCanBuy" slot="bottom">
      <list-sort-bar-item sortKey="fromTime" sortText="时间" icon="time-xianxing" @click.native="touchSort" ref="time-sort-item"></list-sort-bar-item>
      <list-sort-bar-item sortKey="fullPrice" sortText="价格" icon="caiwu-xianxing" @click.native="touchSort"></list-sort-bar-item>
    </list-sort-bar>

    <l-dialog :show.sync="dialogIsShow" class="disable-tip-dialog-wrapper">
      <p class="msg-content">{{msgContent}}</p>
    </l-dialog>
  </main-page>
</template>

<script>
import DatepickBar from '@/components/common/datepick-bar'
import BusItem from '../components/bus-item'
import { ListSortBar, ListSortBarItem } from '@/components/list-sort-bar'
import { formatDateYYMMDD } from '@/utils/date-format'
import { queryBusList, canCreateBusOrder } from 'api'
import { mapGetters } from 'vuex'

export default {
  components: {
    DatepickBar,
    BusItemCanbuy: BusItem,
    BusItemDisable: BusItem,
    ListSortBar,
    ListSortBarItem
  },

  props: {
    from: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    time: {
      type: [String, Number]
    }
  },
  data () {
    return {
      sortId: -1,
      flag: 0,
      pickedDate: this.time,
      isLoaded: false,
      dialogIsShow: false,
      msgContent: '',
      disableTimePeriodStart: 0,
      disableTimePeriodEnd: 6,
      minTicketAmounts: 1, // 余票小于该值时不可订票
      timeToDep: 30, // 距发车时间该分钟内不能订票
      allBusList: [],
      busListCanBuy: [],
      busListDisable: [],
      sortSelected: 0,
      recommendData: {}
    }
  },
  computed: {
    ...mapGetters([
      'queryHistory',
      'queryDate',
      'canWebBuyDays'
    ]),
    lastHistory () {
      let queryHistoryItem = this.queryHistory['bus']
      return queryHistoryItem && queryHistoryItem.slice(-1)[0]
    },
    start () {
      return this.from || (this.lastHistory && this.lastHistory.start.cname)
    },
    end () {
      return this.to || (this.lastHistory && this.lastHistory.end.cname)
    }
  },
  mounted () {
    console.log('from:', this.from, 'to: ', this.to)
    console.log('this.ticketFormData: ', this.ticketFormData)
    const cur = new Date()
    this.pickedDate = this.time || this.queryDate || formatDateYYMMDD(cur)
    if (new Date(this.pickedDate).getTime() < cur.getTime()) {
      this.pickedDate = formatDateYYMMDD(cur)
    }

    // 引导用户 上海线路 到豪华大巴
    this.relatedQuerySH()
    this.getBusList()
  },
  methods: {
    relatedQuerySH () {
      console.log('start: ', this.start, ', end: ', this.end)
      const mapList = ['定海', '新城', '舟山', '普陀']
      if (this.start === '上海' && mapList.indexOf(this.end) > -1) {
        this.recommendData = {
          tripName: `上海黄浦旅游集散站 - 舟山`,
          tripId: 5,
          time: this.pickedDate
        }
      }

      if (mapList.indexOf(this.start) > -1 && this.end === '上海') {
        this.recommendData = {
          tripName: `普陀客运站 - 上海黄浦旅游集散站`,
          tripId: 601,
          time: this.pickedDate
        }
      }

      if (this.start === '定海' && this.end === '上海') {
        this.recommendData = {
          tripName: `定海南站 - 上海黄浦旅游集散站`,
          tripId: 6,
          time: this.pickedDate
        }
      }

      this.recommendData.labels = [
        {
          title: '更豪华',
          labelColor: '#ff7d13'
        }, {
          title: '更舒适',
          labelColor: '#26a2ff'
        }, {
          title: '更便捷',
          labelColor: 'green'
        }
      ]
      this.recommendData.minPrice = 150
    },
    toRecommendRoute (recommendData) {
      if (recommendData.tripId) {
        const { tripName, tripId, time } = recommendData
        this.$router.push({ path: '/bus-ticket/luxury-bus-list', query: { tripName, tripId, time } })
      }
    },
    async toBusOrder (busItem) {
      // const currentHours = new Date().getHours()
      // if (currentHours < 6) {
      //   this.showDialog('对不起，00:00-06:00时间段暂不支持在线订票')
      //   return
      // }

      const reason = busItem.disableReason
      if (reason) {
        this.showDialog(`该班次${reason},请选择当日其他班次或换个日期试试`)
        return
      }

      const { sbId, busCode, depotId, beginStationId, fullPrice, endStationId, circleRun } = busItem
      const verifyParams = {
        sbId,
        busCode,
        depotId,
        beginStationId,
        endStationId,
        circleRun,
        fullPrice,
        busId: busItem.busNumber,
        endStationName: busItem.toStationName,
        leaveDate: this.pickedDate,
        leaveTime: busItem.fromTime,
        beginStationName: busItem.fromStationName
      }
      console.log('verifyParams: ', verifyParams)
      let res = await canCreateBusOrder(verifyParams)
      if (res && 'childPrice' in res) {
        busItem.childPrice = res.childPrice
      }

      const params = Object.assign({}, busItem, {
        queryDate: this.pickedDate,
        limit: busItem.orderTicketCount < busItem.surplusTicket
          ? busItem.orderTicketCount
          : busItem.surplusTicket,
        category: 'bus'
      })
      console.log('----params: ', params)
      this.$store.commit('SET_DETAILDATA', { type: 'bus', value: params })
      this.$router.push({
        path: 'list/order'
      })
    },
    async getBusList () {
      // 如果参数不存在则不请求
      if (!this.start || !this.end || !this.pickedDate) {
        return
      }
      const params = {
        sCity: this.start,
        eCity: this.end,
        date: this.pickedDate
      }

      this.cityAlais(params, '杭州西站', '杭州汽车西站')

      this.isLoaded = false
      this.allBusList = await queryBusList(params) || []
      this.busListCanBuy = this.filterBusList(this.allBusList, true)
      this.busListDisable = this.filterBusList(this.allBusList, false)
      this.busListCanBuy.sort((a, b) => {
        return a['fromTime'] > b['fromTime'] ? 1 : -1
      })
      this.isLoaded = true
    },
    cityAlais (params, before, after) {
      if (params.sCity === before) {
        params.sCity = after
      }

      if (params.eCity === before) {
        params.eCity = after
      }

      return params
    },
    filterBusList (initList, flag) {
      const nowTime = Date.now()
      const queryDate = this.pickedDate.replace(/-/g, '/')
      return initList.filter(item => {
        const depTime = new Date(`${queryDate} ${item.fromTime}`).getTime()
        const surplusTicketMatched = item.showTicketInfo.match(/^[0-9]+/)
        const surplusTicket = surplusTicketMatched && surplusTicketMatched[0]
        item.surplusTicket = surplusTicket || ''

        if (flag) {
          return (
            surplusTicket > this.minTicketAmounts && depTime - nowTime >= this.timeToDep * 60 * 1000
          )
        } else {
          if (depTime <= nowTime) {
            item.showTicketInfo = '已发车'
            return false
          }
          if (depTime - nowTime <= this.timeToDep * 60 * 1000) {
            item.showTicketInfo = '暂停售票'
            return true
          }
          if (surplusTicket <= this.minTicketAmounts) {
            item.showTicketInfo = '无票'
            return true
          }
          return false
        }
      })
    },
    showDialog (tips) {
      this.dialogIsShow = true
      this.msgContent = tips
    },
    touchSort () {
      this.$refs['main-page'].scrollToTop(0)
    }
  },
  watch: {
    pickedDate (newVal) {
      // store.set('BUS_QUERY_DATE', newVal)
      this.getBusList()
    }
  }
}
</script>

<style lang="scss">
.bus-list-container {
  .bus-ticket-list-container {
    padding-bottom: vw(50);
    .tips {
      @extend %minor-font;
    }
    .title {
      padding: vw(1) 0 vw(5);
      font-size: vw(16);
    }
    .recommend-route-item {
      position: relative;
      background-color: #fff;
      margin-bottom: vw(5);
      padding: $padding-aside;
      .labels-wrapper {
        display: flex;
        align-items: center;
        .label-item {
          padding: vw(2) vw(5);
          margin-right: vw(5);
          border: vw(1) solid;
          font-size: vw(12);
          line-height: 1;
          border-radius: vw(2);
        }
      }
      .price-wrapper {
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        right: vw(25);
        font-size: vw(10);
        color: #777;
        .price {
          font-size: vw(20);
        }
      }
    }
  }
}
.msg-content {
  text-align: center;
}
.sort-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 210;
}
</style>
