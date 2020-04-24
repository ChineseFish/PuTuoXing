<template>
  <main-page
    back
    title="火车票列表"
    class="train-ticket-list"
    :isLoading="!isLoaded"
    :data="list"
    ref="main-page">

    <datepick-bar v-model="dateTime" :canWebBuyDays="canWebBuyDays"></datepick-bar>

    <!-- <notication-bar text="火车票不受理改签业务，需改签请前往车站办理。"></notication-bar> -->

    <section class="train-ticket-list-wrapper" slot="scroll">
      <div class="train-ticket-list-item"
          v-for="(item, index) of list"
          :key="index"
          @click="toDetail(item)">
        <div class="train-ticket-list-item-content">
          <div class="place place-from">
            <div class="station">{{ item.fromStationName }}</div>
            <div class="datetime">{{ item.fromTime }}</div>
          </div>
          <div class="icon-arrow">
            <div class="arrow-top">{{ item.trainNumber }}</div>
            <i class="city-to"></i>
            <div class="arrow-bottom">{{ item.costTime }}</div>
          </div>
          <div class="place place-to">
            <div class="station">{{ item.toStationName }}</div>
            <div class="datetime">{{ item.toTime }}</div>
          </div>
          <div class="price-wrapper">
            <span class="price">
              <span class="price-symbol">￥</span><span>{{ item.minPrice }}</span>
            </span>
            <span>起</span>
            <div class="tips"></div>
          </div>
        </div>
        <div class="train-ticket-list-item-seats">
          <template v-if="item.seatInfo && item.seatInfo.length !== 0">
            <span v-for="(seatItem, seatIndex) of item.seatInfo" :key="seatIndex">
              {{ `${seatItem.ticketType}:` }}
              <!-- <span>{{ seatItem. }}</span> -->
              <span v-html="seatItem.template"></span>
            </span>
          </template>
          <div v-else class="info">该班次因特殊原因停售</div>
        </div>
      </div>
    </section>

    <list-sort-bar v-model="sortSelected" :list="list" slot="bottom">
      <list-sort-bar-item sortKey="fromTime" :sortTexts="timeTexts" icon="time-xianxing" @click.native="touchSort"></list-sort-bar-item>
      <list-sort-bar-item sortKey="minPrice" :sortTexts="priceTexts" icon="caiwu-xianxing" @click.native="touchSort"></list-sort-bar-item>
    </list-sort-bar>

    <ticket-type-choose :show.sync="showTicketTypes" @choose="chooseTicket" :ticketTypes="choosedItem.seatInfo"></ticket-type-choose>
  </main-page>
</template>

<script>
import DatepickBar from '@/components/common/datepick-bar'
import TicketTypeChoose from '@/components/ticket/ticket-type-choose'
import { ListSortBar, ListSortBarItem } from '@/components/list-sort-bar'
import { getTrainList } from 'api'
import { mapGetters } from 'vuex'

export default {
  components: {
    DatepickBar,
    TicketTypeChoose,
    ListSortBar,
    ListSortBarItem
  },
  props: {
    from: String,
    to: String,
    time: String
  },
  computed: {
    ...mapGetters([
      'queryHistory',
      'queryDate',
      'canWebBuyDays'
    ]),
    lastHistory () {
      let queryHistoryItem = this.queryHistory['train']
      return queryHistoryItem.slice(-1)[0]
    },
    fromStationCode () {
      return this.from || (this.lastHistory && this.lastHistory.start.code)
    },
    toStationCode () {
      return this.to || (this.lastHistory && this.lastHistory.end.code)
    }
  },
  data () {
    return {
      dateTime: this.time,
      list: [],
      isLoaded: false,
      showTicketTypes: false,
      choosedItem: {},
      sortSelected: 0,
      priceTexts: ['按价格排序', '价格从低到高', '价格从高到低'],
      timeTexts: ['按时间排序', '时间从早到晚', '时间从晚到早']
    }
  },
  mounted () {
    this.dateTime = this.time || this.queryDate
    this.getTrainList()
  },
  watch: {
    dateTime () {
      this.getTrainList()
    }
  },
  methods: {
    toDetail (item) {
      if (item.seatInfo && item.seatInfo.length === 0) {
        return
      }
      this.choosedItem = item
      this.showTicketTypes = true
    },
    chooseTicket (item) {
      this.showTicketTypes = false
      const trainInfo = Object.assign({}, this.choosedItem, {
        category: 'train',
        queryDate: this.dateTime,
        ticketType: item.ticketType,
        price: item.price,
        surplusTicket: parseInt(item.surplusTicket) || 99,
        fromStationCode: this.fromStationCode,
        toStationCode: this.toStationCode
      })
      this.$store.commit('SET_DETAILDATA', { type: 'train', value: trainInfo })
      this.$router.push({ name: 'TrainTicketDetail' })
    },
    async getTrainList () {
      const params = {
        sCityCode: this.fromStationCode,
        eCityCode: this.toStationCode,
        date: this.dateTime
      }
      this.isLoaded = false
      const res = await getTrainList(params)
      if (!res) {
        return
      }

      this.isLoaded = true
      this.list = res
      this.list.filter((value, index) => {
        for (let item of value.seatInfo) {
          const onColor = '#26a2ff'
          const offColor = '#bbb'
          if (isNaN(item.surplusTicket)) {
            if (item.surplusTicket === '有') {
              item.template = `<span style="color: ${onColor}">${item.surplusTicket}票</span>`
            }
            if (item.surplusTicket === '无') {
              item.template = `<span style="color: ${offColor}">${item.surplusTicket}票</span>`
            }
          } else {
            item.template = `<span><span style="color: ${onColor}">${item.surplusTicket}</span>张</span>`
          }
        }
        return value
      })
    },
    touchSort () {
      this.$refs['main-page'].scrollToTop(0)
    }
  }
}
</script>

<style lang="scss">
.train-ticket-list {
  &-wrapper {
    padding-bottom: vw(55);
  }
  &-item {
    background: #fff;
    margin: vw(5);
    border-radius: 5px;
    &-content {
      display: flex;
      padding: vw(10) vw(10) vw(5);
      .icon-arrow {
        width: 25%;
        .arrow-top {
          position: absolute;
          top: vw(-10);
          left: 50%;
          transform: translateX(-50%);
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
      .price-wrapper {
        text-align: right;
        flex: 1;
      }
      .place {
        .datetime {
          font-size: vw(18);
        }
        .station {
          @extend %minor-font;
        }
        &-from {
          width: 20%;
        }
        &-to {
          width: 20%;
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
      .info {
        text-align: center;
        font-size: vw(12);
        flex: 1;
      }
    }
  }
}
</style>
