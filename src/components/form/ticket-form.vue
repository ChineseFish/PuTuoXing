<template>
  <keep-alive>
    <div class="ticket-form">
      <slot name="city"></slot>
      <div class="ticket-form-item datetime">
        <p class="tip">日期选择：</p>
        <!-- <p class="week" v-if="weekday">{{ `${weekday}` }}</p> -->
        <mu-date-input
          v-model="dateTime"
          hintText="请选择出行时间"
          container="bottomSheet"
          label-float
          full-width
          value-format="YYYY-MM-DD"
          :minDate="minDate"
          :maxDate="maxDate"
          class="date-picker">
          <span class="label">{{ nowDay }}</span>
        </mu-date-input>
      </div>
      <div class="ticket-form-button" @click="commit">查询</div>
      <div class="query-history">
        <ul class="query-history-list">
          <li v-for="(item, index) of queryHistoryList"
              :key="index"
              @click="historyItemClicked(item)"
              class="query-history-item">
            <span v-if="item.start"
                  class="query-history-item-text">
              {{item.start.cname}}<i class="iconfont icon-city-to"></i>{{item.end.cname}}
            </span>
            <span v-if="item.trip" class="query-history-item-text">{{item.trip.name}}</span>
          </li>
        </ul>
      </div>
      <div class="ticket-form-bottom">
        <slot name="bottom-btn"></slot>
      </div>
      <slot></slot>
    </div>
  </keep-alive>
</template>

<script>
import { formatDateYYMMDD, getWeekday } from '@/utils/date-format'
// import { localStorage } from '@/utils/storage'
import { mapGetters } from 'vuex'

export default {

  components: {

  },

  props: {
    type: {
      type: String
      // validator: (value) => {
      //   return [
      //     'bus', 'plane', 'train', 'baobus', 'planebus', 'luxbus', 'travel-line'
      //   ].indexOf(value) > -1
      // }
    },
    canWebBuyDays: {
      type: Number,
      default: -1
    },
    isTripType: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dateTime: '',
      // ticketFormData: {},
      historySize: 6
    }
  },
  computed: {
    ...mapGetters([
      'queryHistory',
      'queryDate',
      'ticketFormData'
    ]),
    queryHistoryItem () {
      return this.queryHistory[this.type] || []
    },
    weekday () {
      return getWeekday(this.dateTime)
    },
    queryHistoryList () {
      let queryHistory = this.queryHistoryItem
      return queryHistory
    },
    minDate () {
      return new Date()
    },
    maxDate () {
      let curMinDateTime = this.minDate.getTime()
      const oneDayMs = 24 * 60 * 60 * 1000
      let day = 14
      let canWebBuyDays = this.canWebBuyDays
      if (this.ticketFormData.trip && this.ticketFormData.trip.canWebBuyDays) {
        canWebBuyDays = this.ticketFormData.trip.canWebBuyDays
      }
      this.$store.commit('SET_CAN_WEB_BUY_DAYS', canWebBuyDays)

      if (canWebBuyDays > 0) {
        day = canWebBuyDays - 1
      } else if (this.type === 'planebus') {
        day = 10
      } else if (this.type === 'bus') {
        day = 6
      }
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
    }
  },
  mounted () {
    // this.$store.commit('GET_QUERY_DATE', { type: this.type })
    this.dateTime = this.getDateTime()
    this.$store.commit('GET_QUERY_HISTORY', { type: this.type })

    // this.ticketFormData = Object.assign({}, this.queryHistoryItem[0] || {})
    this.$store.commit('SET_TICKET_FORM_DATA', this.queryHistoryItem[0] || {})
    this.ticketFormData.dateTime = this.dateTime
  },

  methods: {
    commit () {
      // 提交之前先储存到本地localStorage
      if (this.isTripType) {
        if (!this.ticketFormData.trip) {
          this.$toast('请选择行程')
          return
        }
      } else {
        if (!this.ticketFormData.start) {
          this.$toast('请选择始发地')
          return
        }

        if (!this.ticketFormData.end) {
          this.$toast('请选择到达地')
          return
        }

        if (this.ticketFormData.start.cname === this.ticketFormData.end.cname) {
          this.$toast('始发地和到达地不能相同')
          return
        }
      }
      this.updateStorage()

      console.log('ticketFormData: ', this.ticketFormData)
      this.$emit('commit', this.ticketFormData)
    },
    updateStorage () {
      // 将查询历史存储到localstorage
      // store.set(this.queryDateStoreKey, this.dateTime)
      // this.$store.commit('SET_QUERY_DATE', { type: this.type, value: this.dateTime })
      let queryHistoryItem = {}
      if (this.isTripType) {
        queryHistoryItem.trip = this.ticketFormData.trip
      } else {
        queryHistoryItem.start = this.ticketFormData.start
        queryHistoryItem.end = this.ticketFormData.end
        if (this.ticketFormData.url) {
          queryHistoryItem.url = this.ticketFormData.url
        }
      }
      // 如果历史中已有相同记录，则先删除
      for (let i = 0; i < this.queryHistoryItem.length; i++) {
        if (JSON.stringify(this.queryHistoryItem[i].start) === JSON.stringify(queryHistoryItem.start) &&
            JSON.stringify(this.queryHistoryItem[i].end) === JSON.stringify(queryHistoryItem.end)) {
          this.queryHistoryItem.splice(i, 1)
          break
        }
      }
      let size = this.queryHistoryItem.length
      if (size >= this.historySize) {
        this.queryHistoryItem.splice(this.historySize - 1, size - this.historySize + 1)
      }
      this.queryHistoryItem.unshift(queryHistoryItem)
      this.$store.commit('SET_QUERY_HISTORY', { type: this.type, value: this.queryHistoryItem })
    },
    historyItemClicked (data) {
      this.ticketFormData = Object.assign(this.ticketFormData, data)
      this.commit()
    },
    getDateTime () {
      // const oneDayTIme = 24 * 60 * 60 * 1000
      // new Date(this.queryDate).getTime() > this.minDate ? this.queryDate : formatDateYYMMDD()
      return formatDateYYMMDD(new Date().getTime())
    }
  },
  watch: {
    dateTime (newTime) {
      console.log('newTime: ', newTime)
      this.$set(this.ticketFormData, 'dateTime', newTime)
    }
  }
}
</script>

<style lang="scss">
.ticket-form {
  background: #fff;
  padding: vw(10) vw(20);
  font-size: vw(18);

  %form-item {
    padding: vw(10) 0;
    border-bottom: 1px solid $line-color;
  }

  &-item {
    display: flex;
    // align-items: center;
    min-height: vw(40);
    &-city {
      flex: 1;
      @extend %form-item;
      &.to-city {
        text-align: right;
      }
    }
    &-icon {
      width: vw(36);
      height: vw(36);
      border: 1px solid #eee;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 vw(20);
    }

    &.datetime {
      flex-direction: column;
      align-items: left;
      padding-top: vw(10);
      // @extend %form-item;
      .tip {
        font-size: vw(12);
        margin-bottom: vw(-8);
        color: #aaa;
      }
      .week {
        font-size: vw(12);
        margin-bottom: vw(-8);
        color: #aaa;
      }

      .mu-text-field-input {
        font-size: vw(20);
      }

      .mu-input {
        margin-bottom: 0;
      }
      .date-picker {
        .mu-text-field-input {
          width: 100%;
        }
        .mu-input-content {
          position: relative;
          .label {
            position: absolute;
            left: vw(115);
            top: vw(4);
            pointer-events: none;
          }
        }
      }
    }
  }

  &-button {
    // background: #f06925;
    background-color: $default-color-orange;
    color: #fff;
    width: 100%;
    padding: vw(5);
    border-radius: vw(5);
    margin: vw(10) 0 vw(15);
    text-align: center;
    box-sizing: border-box;
  }

  .query-history {
    text-align: center;
    @extend %minor-font;
    &-list {
      overflow-x: auto;
      padding: vw(8) 0;
      display: flex;
    }
    &-item {
      &:not(:first-child) {
        margin-left: vw(10);
      }
      border-radius: vw(14);
      height: vw(28);
      line-height: vw(28);
      background-color: $city-picker-theme-color;
      flex-shrink: 0;
      &-text {
        display: flex;
        box-sizing: content-box;
        padding: 0 vw(10);
        align-items: center;
      }
    }
  }

  &-bottom {
    padding: vw(10) 0;
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    &>* {
      width: 25%;
      margin-bottom: vw(15);
    }
  }

  .iconfont {
    font-size: vw(22);
  }
}
</style>
