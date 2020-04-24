<template>
  <main-page class="scenery-booking-container" title="旅游门票预订" back>
    <template slot="scroll">
      <div class="block-section">
        <div class="title">
          {{ sceneryDetailData.title }}
        </div>
        <div v-if="sceneryDetailData.noDate" class="address-wrapper">
          {{ sceneryDetailData.address }}
        </div>
        <div class="datetime-wrapper" v-else>
          <p class="tip">使用日期选择：</p>
          <mu-date-input
            v-model="dateTime"
            container="bottomSheet"
            label-float
            full-width
            value-format="YYYY-MM-DD"
            :minDate="minDate"
            :maxDate="maxDate"
            class="date-picker">
            <span class="nowday-label">{{ nowDay }}</span>
          </mu-date-input>
        </div>
      </div>

      <div class="block-section">
        <div class="title">
          票种价格及数量
        </div>
        <div class="content ticket-wrapper">
          <div class="ticket-title">{{ sceneryDetailData.ticket.ticketName }}</div>
          <div class="ticket-content">
            <div class="price-wrapper">
              <span>单价：</span>
              <span class="price">￥{{ sceneryDetailData.ticket.price }}</span>
            </div>
            <number-adjust :num.sync="number"></number-adjust>
          </div>
        </div>
      </div>

      <ticket-passenger-form
        v-if="isRealName"
        :fields="passengerFields"
        :values="passengerValues"
        addText="游客"
        type="scenery"
        :limit="number"
        class="block-section passenger">
      </ticket-passenger-form>

      <div class="block-section">
        <div class="title">
          <span>联系人信息</span>
          <span class="sub-title">仅需提供一人信息</span>
        </div>
        <ticket-collector v-model="collector" class="" type="scenery" :isRealName="isRealName"></ticket-collector>
      </div>
    </template>

    <topay-bar
      :isRealName="isRealName"
      v-model="priceToPay"
      :orderObj="sceneryDetailData"
      type="scenery"
      slot="bottom">
    </topay-bar>
  </main-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDateYYMMDD, getWeekday } from '@/utils/date-format'
import TicketCollector from '@/components/order/ticket-collector'
import TicketPassengerForm from '@/components/order/ticket-passenger-form'
import TopayBar from '@/components/order/topay-bar'

export default {
  components: {
    TicketCollector,
    TicketPassengerForm,
    TopayBar
  },
  computed: {
    ...mapGetters([
      'sceneryDetailData',
      'collector',
      'passengerFields',
      'passengerValues'
    ]),
    weekday () {
      return getWeekday(this.dateTime)
    },
    minDate () {
      return new Date()
    },
    maxDate () {
      let curMinDateTime = this.minDate.getTime()
      const oneDayMs = 24 * 60 * 60 * 1000
      let day = 14
      return new Date(curMinDateTime + oneDayMs * day)
    },
    nowDay () {
      let str = ''
      const oneDayMs = 24 * 60 * 60 * 1000
      const offsetGMT = new Date().getTimezoneOffset() * 60 * 1000
      let timeDiff = +new Date(this.dateTime) + oneDayMs - +new Date() + offsetGMT
      if (timeDiff - oneDayMs < 0) {
        str = '(今天)'
      } else if (timeDiff - oneDayMs * 2 < 0) {
        str = '(明天)'
      } else if (timeDiff - oneDayMs * 3 < 0) {
        str = '(后天)'
      }
      return this.weekday + str
    },
    priceToPay () {
      const ticket = this.sceneryDetailData.ticket
      let price = 0
      if (ticket) {
        price = ticket.price * this.number
      }
      return price
    },
    isRealName () {
      if (this.sceneryDetailData && this.sceneryDetailData.ticket && this.sceneryDetailData.ticket.isRealName) {
        return this.sceneryDetailData.ticket.isRealName
      }
      return false
    }
  },
  data () {
    return {
      dateTime: formatDateYYMMDD(new Date().getTime()),
      number: 1
    }
  },
  created () {
    this.$store.commit('GET_COLLECTOR')
  },
  mounted () {
    if (!this.sceneryDetailData.title) {
      this.$router.back()
    }

    this.sceneryDetailData.collector = this.collector
    this.sceneryDetailData.ticket.number = this.number
    if (!this.sceneryDetailData.noDate) {
      this.sceneryDetailData.date = this.dateTime
    }
    if (this.isRealName) {
      this.sceneryDetailData.passengers = this.passengerValues
    }
  },
  watch: {
    number (newVal) {
      console.log('newVal: ', newVal)
      this.sceneryDetailData.ticket.number = newVal
    },
    dateTime (newVal) {
      this.sceneryDetailData.date = newVal
    }
  }
}
</script>

<style lang="scss">
.scenery-booking {
  &-container {
    .block-section {
      margin: vw(10);
      border-radius: vw(5);
      box-shadow: 2px 2px 1px #aaa;
      overflow: hidden;
      .title {
        padding: vw(10) $padding-aside;
        margin-left: -$padding-aside;
        margin-right: -$padding-aside;
        background-color: $default-color;
        color: #fff;
        .sub-title {
          font-size: vw(10);
          color: #cf7;
          // color: $default-color-orange;
        }
      }
      .content {
        padding: vw(10) 0;
      }
      .ticket-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .address-wrapper {
      padding: vw(10) vw(5);
    }
    .datetime-wrapper {
      display: flex;
      align-items: center;
      white-space: nowrap;
      justify-content: space-between;
      .mu-input {
        margin-bottom: 0;
        line-height: 1.5;
        min-height: auto;
        padding: vw(6) 0 vw(10);
      }
      .date-picker {
        width: vw(200);
      }
      .nowday-label {
        position: absolute;
        right: vw(5);
        top: 50%;
        transform: translate3d(0, -50%, 0);
        pointer-events: none;
      }
    }

  }
}
</style>
