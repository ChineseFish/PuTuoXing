<template>
  <div class="datepick-bar">
    <div class="datepick-btn" :class="{'disabled': cannotPickPreDay}" @click="pickBrotherDate(curTime)">
      <i class="iconfont icon-back"></i><span>前一天</span>
    </div>
    <div class="datepick-btn date-picker">
      <span class="current-date">{{formatTime}} {{`${weekday}`}}</span>
      <i class="iconfont icon-rili-xianxing-xi"></i>
      <!-- <mu-date-picker class="datepicker" v-model="curDate" :minDate="minDate" :maxDate="maxDate" autoOk></mu-date-picker> -->
      <mu-date-input
        v-model="curDate"
        container="bottomSheet"
        value-format="YYYY-MM-DD"
        :minDate="minDate"
        :maxDate="maxDate"
        class="datepicker">
      </mu-date-input>
    </div>
    <div class="datepick-btn" :class="{'disabled': cannotPickAfterDay }" @click="pickBrotherDate(curTime, true)">
      <span>后一天</span><i class="iconfont icon-forward"></i>
    </div>
  </div>
</template>

<script>
import { formatDateYYMMDD, formatDateMMDD, getWeekday } from '@/utils/date-format'

export default {
  props: {
    value: {
      type: [String, Number],
      default: formatDateYYMMDD()
    },
    category: {
      type: String,
      default: ''
    },
    canWebBuyDays: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      // 确保时间戳是一个Number而不是String，否则无法转成成Date()
      curDate: this.value,
      oneDayMs: 24 * 60 * 60 * 1000
    }
  },
  computed: {
    weekday () {
      return getWeekday(this.curTime)
    },
    curTime () {
      return new Date(this.curDate).getTime()
    },
    formatTime () {
      return formatDateMMDD(new Date(this.curTime))
    },
    minDate () {
      return new Date()
    },
    minDateTime () {
      return parseInt(this.minDate.getTime() / this.oneDayMs) * this.oneDayMs
    },
    maxDate () {
      let curMinDateTime = this.minDateTime
      console.log('---this.canWebBuyDays---', this.canWebBuyDays, this.category)
      let day = 14
      if (this.canWebBuyDays > 0) {
        day = this.canWebBuyDays - 1
      }
      return new Date(curMinDateTime + this.oneDayMs * day)
    },
    cannotPickPreDay () {
      return this.curTime <= this.minDate.getTime()
    },
    cannotPickAfterDay () {
      return this.curTime >= this.maxDate.getTime()
    }
  },

  methods: {
    pickBrotherDate (ms, isNext) {
      // 如果传入初始日期，则在初始日期上进行前后日期选择
      let time = ms || new Date().getTime()
      if ((this.cannotPickPreDay && !isNext) ||
        (this.cannotPickAfterDay && isNext)) {
        return
      }
      const oneDayMs = 24 * 60 * 60 * 1000
      this.curDate = formatDateYYMMDD(isNext ? (time + oneDayMs) : (time - oneDayMs))
    }
  },
  watch: {
    curDate (newDate) {
      this.$store.commit('SET_QUERY_DATE', newDate)
      this.$emit('input', newDate)
    }
  }
}
</script>

<style lang="scss">
.datepick-bar {
  box-sizing: border-box;
  padding: vw(10) $padding-aside;
  width: 100%;
  height: vw(50);
  background-color: $default-color;
  display: flex;
  line-height: vw(30);
  color: $default-font-color;
  .datepick-btn:nth-child(1) {
    text-align: left;
    letter-spacing: vw(2);
  }
  .datepick-btn:nth-child(2) {
    text-align: center;
  }
  .datepick-btn:nth-child(3) {
    text-align: right;
    letter-spacing: vw(2);
  }
  .datepick-btn {
    flex-grow: 1;
    flex-shrink: 0;
    &.disabled {
      color: $minor-color + #595959;
    }
    &.date-picker {
      max-width: vw(300);
      position: relative;
      border-radius: vw(3);
      background-color: $default-color + #181818;
      .iconfont {
        margin-left: vw(3);
        position: relative;
        top: vw(1);
      }
    }
  }
  .datepicker {
    opacity: 0;
    @include absolute(0);
    width: auto;
    z-index: 10;
    .mu-text-field {
      width: 100%;
      height: 100%;
      min-height: 100%;
      .mu-text-field-input {
        width: 100%;
      }
    }
  }
}

</style>
