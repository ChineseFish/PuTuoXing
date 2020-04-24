<template>
  <main-page :title="travel"
             :isLoading="!isLoaded"
             :data="allBusList"
             back
             class="bus-ticket-list-container"
             ref="main-page">
    <datepick-bar v-model="pickedDate" category="plane-bus" :canWebBuyDays="canWebBuyDays"></datepick-bar>
    <section class="bus-ticket-list-wrapper" slot="scroll">
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
                :reason="item.disableReason"
                @click.native="toBusOrder(item)">
      </bus-item-disable>
      </div>
    </section>

    <list-sort-bar v-model="sortSelected" :list="busListCanBuy" slot="bottom">
      <list-sort-bar-item sortKey="fromTime" sortText="时间" icon="time-xianxing" @click.native="touchSort"></list-sort-bar-item>
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
import { queryPlaneBusList } from 'api'
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
    // tripName: {
    //   type: String,
    //   default: ''
    // },
    // tripId: {
    //   type: [String, Number],
    //   default: ''
    // },
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
      flag: 1,
      pickedDate: this.time,
      isLoaded: false,
      dialogIsShow: false,
      msgContent: '',
      minTicketAmounts: 1, // 余票小于该值时不可订票
      timeToDep: 30, // 距发车时间该分钟内不能订票
      allBusList: [],
      busListCanBuy: [],
      busListDisable: [],
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
      let queryHistoryItem = this.queryHistory['planebus']
      return queryHistoryItem && queryHistoryItem.slice(-1)[0]
    },
    travel () {
      return '机场大巴'
    },
    start () {
      return this.from || (this.lastHistory && this.lastHistory.start.cname)
    },
    end () {
      return this.to || (this.lastHistory && this.lastHistory.end.cname)
    }
    // id () {
    //   return this.tripId || (this.lastHistory && this.lastHistory.trip.id)
    // }
  },
  mounted () {
    this.pickedDate = this.time || this.queryDate
    this.getPlaneBusList()
  },
  methods: {
    toBusOrder (busItem) {
      if (busItem.notBookable) {
        this.$store.commit('SHOW_DIALOG', `
          <p><b>注：该线路不支持网上预订</b></p>
          <p><b>线路：</b>${busItem.routeName}</p>
          <p>
            <b>机场热线：</b>
            <a href="tel://${busItem.fromStationTelephone}">${busItem.fromStationTelephone}</a>
          </p>
        `)
        return
      }

      const reason = busItem.disableReason
      if (reason) {
        this.$store.commit('SHOW_DIALOG', `该班次${reason},请选择当日其他班次或换个日期试试`)
        return
      }
      const params = Object.assign({}, busItem, {
        queryDate: this.pickedDate,
        handlingFee: busItem.handlingFee || 2,
        category: 'plane-bus',
        limit: busItem.orderTicketCount < busItem.surplusTicket
          ? busItem.orderTicketCount
          : busItem.surplusTicket
      })
      this.$store.commit('SET_DETAILDATA', { type: 'bus', value: params })
      this.$router.push({
        path: 'plane-bus-list/order'
      })
    },
    async getPlaneBusList () {
      // 如果参数不存在则不请求
      if (!this.start || !this.end || !this.pickedDate) {
        return
      }
      const params = {
        date: this.pickedDate,
        sCity: this.start,
        eCity: this.end
      }
      this.isLoaded = false
      let res = await queryPlaneBusList(params)

      this.allBusList = res
      this.busListCanBuy = this.filterBusList(this.allBusList, true)
      this.busListDisable = this.filterBusList(this.allBusList, false)
      this.isLoaded = true
    },
    filterBusList (initList, flag) {
      const nowTime = Date.now()
      const queryDate = this.pickedDate.replace(/-/g, '/')
      return initList.filter(item => {
        const depTime = new Date(`${queryDate} ${item.fromTime}`).getTime()
        const surplusTicketMatched = item.showTicketInfo.match(/^[0-9]+/)
        const surplusTicket = surplusTicketMatched && surplusTicketMatched[0]
        item.surplusTicket = surplusTicket || ''

        if (!flag && item.notBookable) {
          return true
        }

        if (flag) {
          return surplusTicket > this.minTicketAmounts && (depTime - nowTime >= this.timeToDep * 60 * 1000)
        } else {
          if (depTime <= nowTime) {
            item.disableReason = '已发车'
            return false
          }
          if (depTime - nowTime <= this.timeToDep * 60 * 1000) {
            item.disableReason = '暂停售票'
            return true
          }
          if (surplusTicket <= this.minTicketAmounts) {
            item.disableReason = '无票'
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
      // store.set('PLANEBUS_QUERY_DATE', newVal)
      this.getPlaneBusList()
    }
  }
}
</script>

<style lang="scss">
.bus-ticket-list {
  &-container {

  }
  &-wrapper {
    padding-bottom: vw(55);
  }
}
</style>
