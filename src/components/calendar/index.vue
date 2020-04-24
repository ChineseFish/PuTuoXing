<template>
  <div class="calendar-wrapper" @click.self="onMask" v-show="showCalendar">
    <div class="calendar-header-wrapper" ref="calendar-header">
      <div class="calendar-header">
        <div class="header-button-left" @click="cancel">取消</div>
        <div class="header-title">选择日期</div>
        <div class="header-button-right"></div>
      </div>

      <div class="calendar-weekend-wrapper">
        <div class="weekend-item" v-for="(item, index) of weekend" :key="index" :style="(index + 1) % 7 <= 1 ? highLightStyle: ''">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="calendar-content-wrapper" :style="calendarContentStyle">
      <div v-for="(item, index) of monthDays" :key="index">
        <div class="month-title">{{ `${item.year}年${item.month}月` }}</div>
        <div class="month-days-wrapper">
          <div class="days-item item-empty" v-for="(emptyItem, emptyIndex) of item.weekDays" :key="emptyIndex">
            <!-- <span>空白</span> -->
          </div>
          <template v-for="(dayItem, dayIndex) of item.oneMonthDays">
            <!-- <div class="days-item"
              :key="`${item.year}-${item.month}-${dayIndex}`"
              v-if="rmCalendarObj && rmCalendarObj[getTimeStamp(item.timeStamp, dayIndex)]">
              <span class="days-number" :style="daysItemStyle(dayIndex, item.weekDays, getTimeStamp(item.getTimeStamp, dayIndex))">
                {{ dayIndex + 1 }}
              </span>
              <span class="bottom">
                <span class="days-price">￥{{ rmCalendarObj[getTimeStamp(item.timeStamp, dayIndex)].price }}</span>
              </span>
            </div>
            <div class="days-item disabled" :key="`${item.year}-${item.month}-${dayIndex}`" v-else>
              <span class="days-number">
                {{ dayIndex + 1 }}
              </span>
            </div> -->
            <template>
              <calendar-item
                :timeStamp="getTimeStamp(item.timeStamp, dayIndex)"
                :key="`${item.year}-${item.month}-${dayIndex}`"
                :checkInTimeStamp.sync="checkIn"
                :checkOutTimeStamp.sync="checkOut"
                :rmCalendarObj="rmCalendarObj"
                :day="dayIndex + 1"
                :mode="rmCalendarObj ? 'withprice' : ''"
                class="days-item"
                @choose="choose">
              </calendar-item>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarItem from './calender-item'

export default {
  components: {
    CalendarItem
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    checkInTimeStamp: {
      type: Number
    },
    checkOutTimeStamp: {
      type: Number
    },
    rmCalendarObj: {
      type: Object,
      default: null
    },
    unableBookArr: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    date: () => new Date(),
    checkedCnt () {
      let cnt = 0
      if (this.checkIn) {
        ++cnt
      }
      if (this.checkOut) {
        ++cnt
      }
      return cnt
    }
  },
  data () {
    return {
      weekend: ['日', '一', '二', '三', '四', '五', '六'],
      monthDays: [],
      calendarContentStyle: '',
      highLightStyle: 'color: red;',
      disableStyle: 'color: #b7b7b7;',
      showCalendar: this.show,
      checkIn: this.checkInTimeStamp,
      checkOut: this.checkOutTimeStamp
    }
  },
  watch: {
    showCalendar (newVal) {
      console.log('newValendar: ', newVal)
      this.$emit('update:show', newVal)
    },
    show (newVal) {
      this.showCalendar = this.show
      if (newVal) {
        this.resetChoose()
        this.$nextTick(() => {
          const headerTop = this.$refs['calendar-header'] ? this.$refs['calendar-header'].clientHeight : 0
          this.calendarContentStyle = `top: ${headerTop}px;`
        })
      }
    }
  },
  mounted () {
    this.monthDays = this.initMonthDays(6)
    console.log('this.monthDays: ', this.monthDays)
    this.checkBookable(this.checkIn, +new Date())
  },
  methods: {
    onMask () {
      this.showCalendar = false
      console.log('mask!')
    },
    initMonthDays (cnt) {
      let year = this.date.getFullYear()
      let month = this.date.getMonth()

      const monthDays = []

      for (let i = 0; i < cnt; ++i) {
        if (month >= 12) {
          month = 0
          ++year
        }
        const oneMonthDays = this.getOneMonthDays(year, month++)
        const formatMonth = month < 10 ? `0${month}` : month.toString()
        const date = new Date(`${year}-${formatMonth}-01`)
        const weekDays = new Date(`${year}-${formatMonth}-01`).getDay()
        const timeStamp = date.getTime() / 1000
        monthDays.push({ year, month, weekDays, oneMonthDays, timeStamp })
      }

      return monthDays
    },
    getOneMonthDays (year, month) {
      let isLeap = false
      if ((year % 400 === 0) ||
          ((year % 4 === 0) &&
           (year % 100 !== 0))) {
        isLeap = true
      }

      const days = [
        31, isLeap ? 29 : 28, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
      ]

      return days[month]
    },
    getTimeStamp (timeStamp, index) {
      return timeStamp + 86400 * index
    },
    daysItemStyle (index, weekdays, obj = null) {
      console.log('obj: ', obj)
      if (obj && !obj.issell) {
        return this.disableStyle
      }

      // return (index + weekdays + 1) % 7 <= 1 ? this.highLightStyle : ''
      return ''
    },
    cancel () {
      this.showCalendar = false
    },
    choose (timeStamp) {
      // 在住店离店时间都有的情况下，需要先清空该数据
      if (this.checkedCnt !== 1) {
        if (this.rmCalendarObj && this.rmCalendarObj[timeStamp] && !this.rmCalendarObj[timeStamp].issell) {
          this.$toast('该日期无法预订')
          return
        }
        this.checkIn = 0
        this.checkOut = 0
      }

      if (!this.checkIn) {
        this.setCheckIn(timeStamp)
      } else {
        if (timeStamp < this.checkIn) {
          return this.setCheckIn(timeStamp)
        }

        // 判断区间内是否存在不能选择的日期
        if (!this.checkBookable(this.checkIn, timeStamp)) {
          this.setCheckOut(0)
          return
        }

        this.setCheckIn(this.checkIn)
        this.setCheckOut(timeStamp)

        this.chooseSuccess()
      }
    },
    resetChoose () {
      this.checkIn = this.checkInTimeStamp
      this.checkOut = this.checkOutTimeStamp
    },
    setCheckIn (val) {
      this.checkIn = val
    },
    setCheckOut (val) {
      this.checkOut = val
    },
    chooseSuccess () {
      console.log(this.checkIn, this.checkOut)
      this.$emit('choosed', this.checkIn * 1000, this.checkOut * 1000)
      this.showCalendar = false
    },
    checkBookable (checkIn, checkOut) {
      if (checkIn === checkOut) {
        this.$toast('不能选择同一天的日期')
        return false
      }

      for (let timeStamp of this.unableBookArr) {
        if (checkIn < timeStamp && checkOut > timeStamp) {
          this.$toast('区间存在无法预订的日期')
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss">
.calendar {
  &-wrapper {
    position: fixed;
    top: vw(120);
    bottom: 0;
    width: 100vw;
    background-color: #fff;
    z-index: 1001;
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
      z-index: 1;
    }
  }

  &-header-wrapper {
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: 2;
    background-color: #fff;

    border-top-left-radius: vw(10);
    border-top-right-radius: vw(10);
  }

  &-header {
    display: flex;
    align-items: center;

    .header-button-left, .header-button-right {
      padding: vw(10) vw(13);
      flex: 1;
      font-size: vw(12);
    }

    .header-title {
      flex: 5;
      text-align: center;
      font-size: vw(16);
      font-weight: 500;
    }
  }

  &-weekend-wrapper {
    display: flex;
    padding: vw(5) 0;
    background-color: #f7f7f7;

    .weekend-item {
      flex: 1;
      text-align: center;
      font-weight: 300;
    }
  }

  &-content-wrapper {
    position: absolute;
    bottom: 0;
    width: 100vw;
    z-index: 2;
    padding-bottom: vw(30);
    background-color: #fff;

    overflow: scroll;

    .month-title {
      padding: vw(30) 0 vw(5);
      text-align: center;
      font-size: vw(16);
    }

    .month-days-wrapper {
      display: flex;
      flex-wrap: wrap;

      .days-item {
        width: calc(100vw / 7);
        height: 14vw;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: vw(10);

        &.disabled {
          color: #b7b7b7;
        }
      }
    }
  }
}
</style>
