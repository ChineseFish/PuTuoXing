<template>
  <div class="train-ticket-header">
    <section class="train-ticket-header-top">
       <section class="train-ticket-header-left">
        <div class="station-name">{{ info.fromStationName }}</div>
        <div class="time">{{ info.fromTime }}</div>
      </section>
      <section class="train-ticket-header-center">
        <div class="cost-time"><span>{{ info.costTime }}</span></div>
        <div class="stop-info" @click="toShowStopInfo">
          <span>经停信息</span>
        </div>
        <span class="query-date">{{ info.queryDate | dateFormat }}</span>
      </section>
      <section class="train-ticket-header-right">
        <div class="station-name">{{ info.toStationName }}</div>
        <div class="time">{{ info.toTime }}</div>
      </section>
    </section>
    <section class="train-ticket-header-bottom">
      <div>
        <span>{{ info.trainNumber }}</span>
        <span>
          {{ info.ticketType }}
          <span class="price">￥<span class="price-num">{{ info.price }}</span></span>
        </span>
        <!-- <span>手续费<span class="price">￥{{ info.handlingFee }}</span></span> -->
      </div>
      <div class="notice" @click="toShowBookNotice">订票须知</div>
    </section>
    <popup-container :show.sync="showStopInfo">
      <stop-info-container v-if="showStopInfo"
        @hide="toHideStopInfo"
        :info="stopInfo"
        :trainNumber="info.trainNumber">
      </stop-info-container>
    </popup-container>
  </div>
</template>

<script>
import { getTrainStopList } from 'api'
import PopupContainer from '@/components/layouts/popup-container'
import StopInfoContainer from './stop-info-container'

export default {
  components: {
    PopupContainer,
    StopInfoContainer
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showStopInfo: false,
      stopInfo: []
    }
  },
  methods: {
    async toShowStopInfo () {
      const params = {
        trainNumber: this.info.trainNumber,
        date: this.info.queryDate
      }
      let res = await getTrainStopList(params)
      this.stopInfo = res
      this.showStopInfo = true
    },
    toHideStopInfo () {
      this.showStopInfo = false
    },
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'train')
    }
  }
}
</script>

<style lang="scss">
.train-ticket-header {
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
    .cost-time {
      font-size: vw(10);
      span {
        font-size: vw(14);
      }
    }
    .stop-info {
      font-size: vw(11);
      margin: vw(3) 0;
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
  .query-date {
    font-size: vw(14);
    color: #fdff00;
  }
  &-bottom {
    padding: vw(5) 0;
    font-size: vw(12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .price {
      color: #fdff00;
    }
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
  }
}
</style>
