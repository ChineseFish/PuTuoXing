<template>
  <main-page :title="travel"
             :isLoading="!isLoaded"
             :data="allBusList"
             back
             ref="main-page"
             class="luxury-bus-ticket-container">
    <datepick-bar v-model="pickedDate" :canWebBuyDays="canWebBuyDays"></datepick-bar>
    <section class="bus-ticket-list-container" slot="scroll">
      <div>
        <bus-item-canbuy v-for="(item, index) in busListCanBuy"
                :key="index"
                :startPort="item.fromStationName"
                :endPort="item.toStationShow || item.toStationName"
                :price="item.fullPrice"
                :busType="item.busType"
                :depTime="item.fromTime"
                :toTime="item.toDateTime"
                :backTime="item.backDateTime"
                @click.native="getSingle(item)">
      </bus-item-canbuy>
      </div>
      <div>
        <bus-item-disable v-for="(item, index) in busListDisable"
                :key="index"
                :depTime="item.fromTime"
                :startPort="item.fromStationName"
                :endPort="item.toStationShow || item.toStationNamee"
                :price="item.fullPrice"
                :busType="item.busType"
                disable
                :reason="item.disableReason">
      </bus-item-disable>
      </div>
    </section>

    <!-- <list-sort-bar v-model="sortSelected" :list="busListCanBuy" slot="bottom">
      <list-sort-bar-item sortKey="time" sortText="时间" icon="time-xianxing" @click.native="touchSort"></list-sort-bar-item>
      <list-sort-bar-item sortKey="price" sortText="价格" icon="caiwu-xianxing" @click.native="touchSort"></list-sort-bar-item>
    </list-sort-bar> -->

    <l-dialog :show.sync="dialogIsShow" class="disable-tip-dialog-wrapper">
      <p class="msg-content">{{msgContent}}</p>
    </l-dialog>

    <ticket-type-choose :show.sync="showLuxuryTicketInfo"
      :ticketTypes="luxuryTicketInfo"
      @choose="toBusOrder">
    </ticket-type-choose>
  </main-page>
</template>

<script>
import DatepickBar from '@/components/common/datepick-bar'
import BusItem from '../components/bus-item'
import TicketTypeChoose from '@/components/ticket/ticket-type-choose'
import { ListSortBar, ListSortBarItem } from '@/components/list-sort-bar'
import { queryLuxuryBusList, queryLuxuryBusSingle } from 'api'
import { formatDateMMDD, formatDateYYMMDD } from '@/utils/date-format'
import { mapGetters } from 'vuex'

export default {
  components: {
    DatepickBar,
    BusItemCanbuy: BusItem,
    BusItemDisable: BusItem,
    ListSortBar,
    ListSortBarItem,
    TicketTypeChoose
  },

  props: {
    tripName: {
      type: String,
      default: ''
    },
    tripId: {
      type: [String, Number],
      default: ''
    },
    time: {
      type: [String, Number]
    }
  },
  data () {
    return {
      flag: 1,
      pickedDate: this.time || this.queryDate || formatDateYYMMDD(new Date()),
      isLoaded: false,
      dialogIsShow: false,
      msgContent: '',
      minTicketAmounts: 1, // 余票小于该值时不可订票
      timeToDep: 10, // 距发车时间该分钟内不能订票
      allBusList: [],
      busListCanBuy: [],
      busListDisable: [],
      luxuryTicketInfo: [],
      showLuxuryTicketInfo: false,
      busItem: {},
      sortSelected: 0
    }
  },
  computed: {
    ...mapGetters([
      'queryHistory',
      'queryDate',
      'canWebBuyDays'
    ]),
    lastHistory () {
      let queryHistoryItem = this.queryHistory['luxbus']
      return queryHistoryItem && queryHistoryItem.slice(-1)[0]
    },
    travel () {
      return this.tripName || (this.lastHistory && this.lastHistory.trip.name)
    },
    id () {
      return this.tripId || (this.lastHistory && this.lastHistory.trip.id)
    }
  },
  mounted () {
    console.log('this.pickedDate: ', this.pickedDate)
    const cur = new Date()
    if (new Date(this.pickedDate).getTime() < cur.getTime()) {
      this.pickedDate = formatDateYYMMDD(cur)
    }

    console.log('this.pickedDate: ', this.pickedDate)
    this.getLuxuryBusList()
  },
  methods: {
    async getSingle (busItem) {
      const reason = busItem.disableReason
      if (reason) {
        this.showDialog(`该班次${reason},请选择当日其他班次或换个日期试试`)
        return
      }
      const params = {
        id: this.id,
        busNumber: busItem.busNumber,
        date: this.pickedDate
      }
      let res = await queryLuxuryBusSingle(params)

      this.luxuryTicketInfo = res.luxuryTicketInfo.filter((value, index, array) => {
        if (value.ticketType === '儿童特票') {
          return false
        }

        if (value.ticketType === '成人票(怀抱婴幼儿)') {
          return false
        }

        if (value.ticketType === '儿童票' || value.ticketType === '儿童/军残') {
          busItem.childPrice = value.price
          return false
        }

        if (value.ticketType === '成人票') {
          value.ticketType = '通票'
        }
        return value
      })
      // this.luxuryTicketInfo = res.luxuryTicketInfo
      if (!this.luxuryTicketInfo || this.luxuryTicketInfo.length === 0) {
        this.$toast('该班次票均已售完')
        return
      }

      this.luxuryTicketInfo.filter((item, index) => {
        if (parseInt(item.surplusTicket) === 1) {
          item.surplusTicket = 0
        }
      })
      this.showLuxuryTicketInfo = true
      this.busItem = busItem
    },
    toBusOrder (info = {}) {
      if (this.showLuxuryTicketInfo) {
        this.showLuxuryTicketInfo = false
      }

      if (parseInt(info.surplusTicket) > 0) {
        const params = Object.assign({}, this.busItem, {
          queryDate: this.pickedDate,
          fullPrice: info.price,
          surplusTicket: info.surplusTicket,
          ticketType: info.ticketType,
          handlingFee: 0,
          category: 'luxury-bus',
          tripId: this.id,
          limit: this.busItem.orderTicketCount < info.surplusTicket
            ? this.busItem.orderTicketCount
            : info.surplusTicket
        })
        this.$store.commit('SET_DETAILDATA', { type: 'bus', value: params })
        this.$router.push({
          path: 'luxury-bus-list/order'
        })
      } else {
        this.showDialog('余票不足，无法订票')
      }
    },
    async getLuxuryBusList () {
      // 如果参数不存在则不请求
      if (!this.id || !this.pickedDate) {
        return
      }
      const params = {
        id: this.id,
        date: this.pickedDate
      }
      this.isLoaded = false
      this.allBusList = await queryLuxuryBusList(params)
      this.busListCanBuy = this.filterBusList(this.allBusList, true)
      this.busListDisable = this.filterBusList(this.allBusList, false)
      this.isLoaded = true
    },
    filterBusList (initList, flag) {
      const nowTime = Date.now()
      const queryDate = this.pickedDate.replace(/-/g, '/')
      return initList.filter(item => {
        const depTime = new Date(`${queryDate} ${item.fromTime}`).getTime()
        if (item.backTime) {
          item.toDateTime = `${formatDateMMDD(this.queryDate)} ${item.fromTime}`
          item.backDateTime = `${formatDateMMDD(item.backDate)} ${item.backTime}`
        }
        if (flag) {
          return depTime - nowTime >= this.timeToDep * 60 * 1000
        } else {
          if (depTime <= nowTime) {
            item.disableReason = '已发车'
            return false
          }
          if (depTime - nowTime <= this.timeToDep * 60 * 1000) {
            item.disableReason = '暂停售票'
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
      // store.set('LUXBUS_QUERY_DATE', newVal)
      this.getLuxuryBusList()
    }
  }
}
</script>

<style lang="scss">
.luxury-bus-ticket-container {
  .bus-ticket-list-container {
    // padding-bottom: vw(55);
  }
  .bus-list-container {
    .scroll-container {
      overflow: hidden;
      height: calc(100vh - #{$header-height + vw(50)});
    }
  }
  .sort-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 210;
  }
  .bus-ticket-info-dialog {
    .dialog-title {
      font-size: vw(18);
      font-weight: 500;
      text-align: center;
    }
    .dialog-content {
      padding-top: vw(20);
    }
    .ticket-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 3;
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }

      &-right {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
