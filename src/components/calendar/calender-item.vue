<template>
  <div class="calendar-item-wrapper" :class="getCalendarItemClass()" @click="choose" :style="daysItemStyle">
    <span class="days-number">{{ day }}</span>
    <span class="days-price" v-if="!rmCalendarItemObj.issell && rmCalendarItemObj.price">不可订</span>
    <span class="days-price" v-else>{{ daysPrice || '' }}</span>
  </div>
</template>

<script>

export default {
  props: {
    timeStamp: {
      type: Number
    },
    day: {
      type: Number
    },
    rmCalendarObj: {
      type: Object
    },
    checkInTimeStamp: {
      type: Number
    },
    checkOutTimeStamp: {
      type: Number
    },
    mode: String
  },
  computed: {
    rmCalendarItemObj () {
      if (this.rmCalendarObj) {
        return this.rmCalendarObj[this.timeStamp] || {}
      }
      return {}
    },
    daysPrice () {
      return this.rmCalendarItemObj.price ? `￥${this.rmCalendarItemObj.price}` : ''
    },
    daysItemStyle () {
      return ''
    },
    earliest () {
      return this.timeStamp + 60 * 60 * 24 < +new Date() / 1000
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    // console.log('this.timeStamp: ', this.timeStamp)
  },
  methods: {
    getCalendarItemClass () {
      // console.log(this.timeStamp, this.checkInTimeStamp, this.checkOutTimeStamp)
      if (this.checkInTimeStamp === this.timeStamp ||
          this.checkOutTimeStamp === this.timeStamp) {
        return 'calendar-item-selected'
      }

      if (this.checkInTimeStamp < this.timeStamp &&
          this.checkOutTimeStamp > this.timeStamp) {
        return 'calendar-item-range'
      }

      if ((this.rmCalendarItemObj && !this.rmCalendarItemObj.issell && this.mode) || this.earliest) {
        return 'calendar-item-disabled'
      }
    },
    choose () {
      if (this.canChoose()) {
        this.$emit('choose', this.timeStamp)
      }
    },
    canChoose () {
      if (this.earliest) {
        this.$toast('该日期无法选择')
        return false
      }

      return true
    }
  }
}
</script>

<style lang="scss">
.calendar-item-wrapper {
  margin-bottom: vw(1);
  margin-top: vw(1);
  .days-number {
    font-size: vw(18);
  }
  .days-price {
    font-size: vw(11);
    margin-top: vw(-5);
  }
  &.calendar-item {
    &-selected {
      background: #ff6a50;
      color: #fff;
      border-radius: vw(4);
    }

    &-range {
      background: #fdeeeb;
    }

    &-disabled {
      color: #b7b7b7;
    }
  }
}
</style>
