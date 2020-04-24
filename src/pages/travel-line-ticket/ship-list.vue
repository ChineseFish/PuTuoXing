<template>
  <main-page
    back
    :title="this.travel || '旅游专线列表'"
    class="tavel-line-ticket-list"
    :isLoading="!isLoaded"
    :data="list"
    ref="main-page">

    <datepick-bar v-model="dateTime" :canWebBuyDays="canWebBuyDays"></datepick-bar>

    <notication-bar :text="activeMsg" v-if="activeMsg"></notication-bar>

    <section class="tavel-line-ticket-list-wrapper" slot="scroll">
      <div class="tavel-line-ticket-list-item"
          v-for="(item, index) of list"
          :key="index"
          @click="toShowTicketSeats(item)">
        <div class="tavel-line-ticket-list-item-content">
          <div class="from-section">
            <div class="from-station">{{ item.fromStationName }}</div>
            <div class="from-time">{{ item.fromTime }}</div>
          </div>
          <div class="icon-arrow">
            <div class="arrow-top">{{ item.shipType }}</div>
            <i class="city-to"></i>
          </div>
          <div class="to-section">
            <div class="to-station">{{ item.toStationName }}</div>
          </div>
          <div class="other-section">
            <div class="surplus-ticket">
              <span>剩余:</span>
              <span class="cnt">{{ item.surplusTicket }}</span>
              <span v-if="item.surplusTicket !== '有'"> 张</span>
            </div>
            <div class="price-wrapper" v-if="item.minPrice">
              <span class="price">￥{{ item.minPrice }}</span>
              <span class="price-text">起</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ticket-type-choose :show.sync="showTicketTypes"
      :ticketTypes="ticketSeatsInfo"
      @choose="chooseTicket">
    </ticket-type-choose>

  </main-page>
</template>

<script>
import DatepickBar from '@/components/common/datepick-bar'
import { getTravelLineShipList } from 'api'
import { mapGetters } from 'vuex'
import TicketTypeChoose from '@/components/ticket/ticket-type-choose'
import { isDayAfter } from '@/utils/common'

export default {
  components: {
    DatepickBar,
    TicketTypeChoose
  },
  props: {
    tripName: String,
    tripId: [String, Number],
    type: String,
    time: String,
    fromType: String
  },
  computed: {
    ...mapGetters([
      'queryHistory',
      'queryDate',
      'canWebBuyDays'
    ]),
    // lastHistory () {
    //   let queryHistoryItem = this.queryHistory[this.type]
    //   console.log('queryHistoryItem', queryHistoryItem)
    //   return queryHistoryItem && queryHistoryItem.slice(-1)[0]
    // },
    travel () {
      return this.tripName
    },
    id () {
      return this.tripId
    },
    activeMsg () {
      return (isDayAfter(this.dateTime, 2) && this.id === 502) ? '该日班次6:30开售' : ''
    }
  },
  data () {
    return {
      dateTime: this.time,
      list: [],
      isLoaded: false,
      showTicketTypes: false,
      choosedItem: {},
      ticketSeatsInfo: []
    }
  },
  created () {
    console.log('created.')
  },
  mounted () {
    this.dateTime = this.time || this.queryDate
    this.getTravelLineShipList()
  },
  watch: {
    dateTime () {
      this.getTravelLineShipList()
    }
  },
  methods: {
    toShowTicketSeats (item) {
      if (Number(item.surplusTicket) === 0) {
        this.$toast('余票不足，请选择其他班次')
        return
      }

      this.choosedItem = item
      this.ticketSeatsInfo = item.showShipPriceList
      this.showTicketTypes = true
    },
    chooseTicket (item) {
      console.log('chooseTicket: ', item, this.choosedItem)
      let childPrice = 0
      for (let shipPrice of this.choosedItem.shipPriceList) {
        if (item.seatTypeCode === shipPrice.seatTypeCode && shipPrice.ticketTypeCode === '02') {
          childPrice = shipPrice.price
        }
      }
      this.showTicketTypes = false
      const shipInfo = Object.assign({}, this.choosedItem, {
        category: 'ship',
        queryDate: this.dateTime,
        childPrice,
        ...item
      })
      this.$store.commit('SET_DETAILDATA', { type: 'ship', value: shipInfo })
      this.$router.push({
        path: 'ship-list/detail',
        params: { shipInfo }
      })
    },
    async getTravelLineShipList () {
      // 如果参数不存在则不请求
      if (!this.id || !this.dateTime) {
        return
      }
      const params = {
        routeID: this.id,
        date: this.dateTime
      }
      this.isLoaded = false
      const res = await getTravelLineShipList(params, this.fromType)
      this.isLoaded = true
      res.filter((value, index, array) => {
        // 只保留成人票
        let minPrice = Number.MAX_VALUE
        value.showShipPriceList = value.shipPriceList.filter((seat) => {
          if (seat.ticketType === '儿童票' || seat.ticketType === '半票') {
            return false
          }
          if (seat.ticketType === '成人票') {
            seat.ticketType = '通票'
          }

          const seatPrice = parseInt(seat.price)
          minPrice = minPrice > seatPrice ? seatPrice : minPrice
          return seat
        })

        if (value.shipPriceList.length === 0) {
          value.minPrice = 0
        } else {
          value.minPrice = minPrice
        }

        if (this.type === 'travel-line-ship-pts' && value.shipTypeCode === '01') {
          console.log('value: ', value)
          array.splice(index, 1)
          array.unshift(value)
        }
      })
      console.log(res)
      this.list = res
    }
  }
}
</script>

<style lang="scss">
.tavel-line-ticket-list {
  &-wrapper {
    padding-bottom: vw(10);
  }
  &-item {
    background: #fff;
    margin: vw(5);
    border-radius: 5px;
    &-content {
      display: flex;
      align-items: center;
      padding: vw(10) vw(10) vw(5);
      .icon-arrow {
        width: 25%;
        .arrow-top {
          position: absolute;
          top: vw(-10);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          @extend %minor-font;
        }
        .arrow-bottom {
          position: absolute;
          top: vw(5);
          left: 50%;
          transform: translateX(-50%);
          @extend %minor-font;
        }
      }
      .to-station {
        font-size: vw(18);
      }
      .other-section {
        text-align: right;
        flex: 1;
        .surplus-ticket {
          font-size: vw(12);
          color: #aaa;
          .cnt {
            font-size: vw(16);
            color: #333;
          }
        }
        .price {
          font-size: vw(16);
        }
        .price-text {
          font-size: vw(12);
        }
      }
    }
    &-seats {
      display: flex;
      padding: vw(5) vw(10);
      border-top: 1px solid #eee;
      span {
        width: 20%;
        font-size: vw(11);
      }
    }
  }
}
</style>
