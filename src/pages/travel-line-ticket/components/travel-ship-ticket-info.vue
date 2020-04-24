<template>
  <div class="ship-ticket-header">
    <section class="ship-ticket-header-top">
       <section class="ship-ticket-header-left">
        <div class="station-name">{{ info.fromStationName }}</div>
        <div class="time">
          {{ info.fromTime }}
          <div class="date">{{ info.fromDate | dateFormat }}</div>
        </div>
      </section>
      <section class="ship-ticket-header-center">
        <div>{{ info.shipNumber }}</div>
        <div class="ship-type">
          <span>{{ info.shipType }}</span>
        </div>
      </section>
      <section class="ship-ticket-header-right">
        <div class="station-name">{{ info.toStationName }}</div>
        <div class="time">{{ info.toTime }}</div>
      </section>
    </section>
    <section class="ship-ticket-header-bottom">
      <div>
        <span>
          {{ info.ticketType }}
          <span class="price">￥<span class="price-num">{{ info.price }}</span></span>
        </span>
        <!-- <span>手续费<span class="price">￥{{ info.handlingFee }}</span></span> -->
      </div>
      <div class="notice" @click="toShowBookNotice">订票须知</div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'ship')
    }
  }
}
</script>

<style lang="scss">
.ship-ticket-header {
  background-color: $default-color;
  color: #fff;
  box-shadow: 0 vw(1) vw(5) $line-color;
  &-top {
    display: flex;
    padding-bottom: vw(5);
    border-bottom: 1px dashed #fff;
    .station-name {
      font-size: vw(13);
    }
    .time {
      font-size: vw(20);
    }
    .date {
      font-size: vw(12);
      line-height: 1;
    }
    .ship-type {
      font-size: vw(11);
      margin-top: vw(3);
      %line {
        content: '';
        position: absolute;
        width: 15px;
        height: 0;
        border-bottom: 1px solid #fff;
        top: 50%;
        transform: translateY(-50%);
      }
      &>span {
        padding: vw(1) vw(5);
        border: 1px solid #fff;
        border-radius: 3px;
        position: relative;
        white-space: nowrap;
        &:before {
          @extend %line;
          left: -15px;
        }
        &:after {
          @extend %line;
          right: -15px;
        }
      }
    }
  }
  &-bottom {
    padding: vw(5) 0;
    font-size: vw(12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .price-num {
      font-size: vw(16);
    }
    .notice {
    }
  }
  &-left {
    width: 40%;
  }
  &-center {
    flex: 1;
    text-align: center;
  }
  &-right {
    width: 40%;
    text-align: right;
    .station-name {
      font-size: vw(18);
    }
  }
}
</style>
