<template>
  <main-page class="plane-ticket-detail-container" back>
    <div class="l-header-title" slot="header-center">
      <span>{{ detailData.startCityCHN }}</span>
      <i class="iconfont icon-city-to"></i>
      <span>{{ detailData.endCityCHN }}</span>
    </div>
    <div slot="header-right" @click="toLoginView" v-if="!isLogin">登录</div>

    <template slot="scroll">
      <section class="plane-ticket-detail-top block-section">
        <div class="top-info" v-is-link @click="showTicket">
          <span>{{ detailData.startTime | dateFormat }}</span>
          <span>{{ detailData.startTime | weekdayFormat }}</span>
          <span>{{ detailData.startTime | timeFormat }}</span>
          <span>{{ `${detailData.startAirport}-${detailData.endAirport}` }}</span>
        </div>
        <div class="ticket-info">
          <div class="ticket-price">
            <div class="ticket-price-number price">
              <span class="price-symbol">￥</span>{{ detailData.nowPrice }}
            </div>
            <div class="ticket-cabin">经济舱</div>
          </div>
          <div class="ticket-desc">
            <div class="detail">机建+燃油 ￥{{ detailData.airportPrice }}</div>
            <div class="tips">
              <i class="iconfont icon-time-xianxing"></i>
              <span>支付成功后1小时内出票</span>
            </div>
          </div>
        </div>
      </section>

      <section class="plane-ticket-detail-passenger block-section">
        <!-- <div class="title" v-if="passengerValues && passengerValues.length > 0">乘机人</div> -->
        <ticket-passenger-form
          :fields="passengerFields"
          :values="passengerValues"
          type="plane"
          addText="乘机人">
        </ticket-passenger-form>
      </section>

      <ticket-collector v-model="collector" class="block-section"></ticket-collector>

      <insurance :list="insuranceList"
                 @change="insurance = arguments[0]"
                 class="block-section">
      </insurance>

      <order-price-detail :list="priceDetailList" class="plane-ticket-detail-order-price">
        <div class="protocol">
          <p>订单包含票费、附加选购产品、服务费，点击去支付表示已阅读并同意<a class="protocol-link" @click="toShowBookNotice">预订协议</a></p>
        </div>
      </order-price-detail>
    </template>

    <topay-bar :orderObj="orderObj" v-model="totalPrice" type="plane" slot="bottom"></topay-bar>
    <!-- <div class="plane-ticket-detail-bottom" slot="bottom">
      <div class="price-info" @click="openPriceDetail">
        <div class="price-number">
          <span class="price"><span class="price-symbol">￥</span>{{ totalPrice }}</span>
          <span class="text">(含机建+燃油)</span>
        </div>
      </div>
      <div class="submit" @click="submit">提交订单</div>
    </div> -->

    <l-dialog :show.sync="msgDialog" class="ticket-msg-dialog">
      <p class="msg-content">{{ message }}</p>
    </l-dialog>

    <l-dialog :show.sync="ticketDialog" class="ticket-info-dialog">
      <div class="ticket-title">
        <span>{{ detailData.startTime | dateFormat }}</span>
        <span>{{ detailData.startTime | weekdayFormat }}</span>
        <span>{{ `${detailData.startCityCHN} - ${detailData.endCityCHN}` }}</span>
      </div>
      <div class="ticket-info">
        <div class="place">
          <div class="datetime">{{ detailData.startTime | timeFormat }}</div>
          <div class="airport">{{ detailData.startAirport }}</div>
        </div>
        <div class="icon-arrow">
          <span class="ticket-during-time">{{ (detailData.endTime - detailData.startTime) | duringTimeFormat }}</span>
          <i class="city-to"></i>
        </div>
        <div class="place">
          <div class="datetime">{{ detailData.endTime | timeFormat }}</div>
          <div class="airport">{{ detailData.endAirport }}</div>
        </div>
      </div>
    </l-dialog>
  </main-page>
</template>

<script>
import TicketPassengerForm from '@/components/order/ticket-passenger-form'
import LCheckbox from '@/components/common/checkbox'
import MainPage from '@/components/layouts/main-page'
import TicketCollector from '@/components/order/ticket-collector'
import { postPlaneTicketDetail } from '@/api'
import store from 'store'
import { mapGetters } from 'vuex'
import detailMixins from '@/mixins/order-detail'
import TopayBar from '@/components/order/topay-bar'
import Insurance from '@/components/order/insurance'
import OrderPriceDetail from '@/components/order/order-price-detail'

const STORE_DETAIL_KEY = 'PLANE_DETAIL'
export default {
  components: {
    TicketPassengerForm,
    LCheckbox,
    MainPage,
    TicketCollector,
    TopayBar,
    Insurance,
    OrderPriceDetail
  },

  mixins: [detailMixins],

  computed: {
    ...mapGetters([
      'passengerFields',
      'passengerValues',
      'collector'
    ]),
    totalPrice () {
      let price = this.detailData.nowPrice
      let airportPrice = this.detailData.airportPrice
      let passengerCnt = this.passengerValues.length

      return (price + airportPrice + this.insurancePrice) * passengerCnt
    },
    insurancePrice () {
      let price = 0

      for (let item of this.insurance) {
        price += item.checked ? parseInt(item.price) : 0
      }
      console.log('insurancePrice: ', price)
      return price
    },
    detailData () {
      return this.$store.getters.detailData['plane'] || {}
    },
    orderObj () {
      return {
        startCity: this.detailData.startCityCHN,
        endCity: this.detailData.endCityCHN,
        startAirport: this.detailData.startAirport,
        endAirport: this.detailData.endAirport,
        startTime: this.detailData.startTime,
        endTime: this.detailData.endTime,
        flightNo: this.detailData.flightNo,
        price: this.detailData.nowPrice,
        airportPrice: this.detailData.airportPrice,
        passengers: this.passengerValues,
        collector: this.collector,
        insurancePrice: this.insurancePrice,
        discount: this.detailData.discount,
        category: this.detailData.category,
        fromCode: this.detailData.fromCode,
        toCode: this.detailData.toCode
      }
    }
  },

  data () {
    return {
      ticketDialog: false,
      priceDetail: false,
      insuranceList: [
        {
          id: '11',
          type: 2,
          name: '20元航空意外险',
          price: '20',
          msg: `保险注意事项`,
          checked: true,
          introduce: ''
        }
      ],
      msgDialog: false,
      message: '',
      insurance: []
    }
  },

  created () {
    this.$store.commit('GET_COLLECTOR')
    this.$store.commit('GET_PASSENGERS', { type: 'plane' })
    this.insurance = this.insuranceList.filter((item) => {
      return item.checked
    })
  },

  mounted () {
    if (!this.detailData || !this.detailData.queryDate) {
      this.$store.commit('GET_DETAILDATA', { type: 'plane' })
    }
  },

  methods: {
    showTicket () {
      this.ticketDialog = true
    },
    hideTicket () {
      this.ticketDialog = false
    },
    hideMsg () {
      this.msgDialog = false
    },
    openPriceDetail () {
      this.priceDetail = true
    },
    closePriceDetail () {
      this.priceDetail = false
    },
    async submit () {
      const params = {
        startCity: this.detailData.startCityCHN,
        endCity: this.detailData.endCityCHN,
        startAirport: this.detailData.startAirport,
        endAirport: this.detailData.endAirport,
        startTime: this.detailData.startTime,
        endTime: this.detailData.endTime,
        flightNo: this.detailData.flightNo,
        handlingFee: this.detailData.handlingFee,
        price: this.detailData.nowPrice,
        airportPrice: this.detailData.airportPrice,
        passengers: this.passengerValues,
        collector: this.collector,
        insurancePrice: this.insurancePrice,
        discount: this.detailData.discount,
        category: this.detailData.category,
        fromCode: this.detailData.fromCode,
        toCode: this.detailData.toCode
      }

      this.$store.commit('SET_COLLECTOR', { type: 'plane', value: this.collector })
      this.$store.commit('SET_PASSENGERS', { type: 'plane', value: this.passengerValues })
      let res = await postPlaneTicketDetail(params)
      this.$router.push({ name: 'PlaneTicketPayment', query: { orderNo: res.orderNo } })
    },
    getDetail () {
      // 页面刷新的时候可以考虑读取localStorage
      if (!this.detail) {
        // this.$router.back()
        let detail = store.get(STORE_DETAIL_KEY)
        return detail
      }
      return this.detail
    },
    insuranceChange (item) {
      item.checked = !item.checked
    },
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'plane')
    }
  }
}
</script>

<style lang="scss">
%palne-ticket-block-title {
  padding: vw(10) 0;
  color: #333;
  font-weight: 600;
  font-size: vw(16);
}
.plane-ticket-detail {
  &-container {
    background: $background-color;
    // margin-top: 44px;
    margin-bottom: vw(50);
  }

  &-popup-wrapper {
    margin-bottom: 44px;
    width: 100%;
  }

  &-top {
    .top-info {
      padding: vw(10) 0;
      border-bottom: 1px dotted $line-color;
    }

    .ticket {
      &-info {
        display: flex;
      }

      &-price {
        padding: vw(10) vw(30);
        margin: vw(10) 0;
        border-right: 1px dotted $line-color;
        &-number {
          font-size: vw(16);
        }
      }

      &-cabin {
        @extend %minor-font;
      }

      &-desc {
        padding: vw(20);
        flex: 1;
        .detail {

        }
        .tips {
          @extend %minor-font;
        }
      }
    }
  }

  &-order-price {
    padding: 0 vw(10) vw(10);
  }

  &-passenger {
    .title {
      @extend %palne-ticket-block-title;
    }
  }

  &-insurance {
    .title {
      @extend %palne-ticket-block-title;
    }

    .sub-title {
      font-size: vw(12);
      font-weight: 400;
      color: $default-color-orange;
    }

    .insurance-list {
      margin-bottom: vw(10);
    }
    .insurance-item {
      padding: vw(10) 0;
    }
    .insurance-price {
      flex-grow: 1;
      text-align: right;
    }
    .icon-wenhao {
      margin-left: vw(5);
      color: $minor-color;
    }
  }

  &-bottom {
    height: vw(44);
    border-top: 1px solid $line-color;
    display: flex;
    align-items: center;
    background-color: #fff;

    .price-info {
      flex: 1;
      padding: 0 vw(15);
      .text {
        font-size: vw(11);
        color: #777;
      }
      .price {
        font-size: vw(18);
      }
    }

    .is-link {
      transform: rotateZ(-135deg);
    }

    .submit {
      background-color: $default-color-orange;
      color: #fff;
      width: vw(150);
      line-height: vw(44);
      text-align: center;
    }
  }

  &-dialog {
    border-radius: 4px;
    width: 90%;
  }
}

.ticket-msg-dialog {
  .msg-content {
    word-break: break-word;
  }
}

.ticket-info-dialog {
  %bold-font {
    font-weight: 500;
    color: #333;
  }
  .ticket-title {
    font-size: vw(14);
    @extend %bold-font;
  }
  .ticket-info {
    display: flex;
    justify-content: space-between;
    padding-top: vw(10);
    .datetime {
      font-size: vw(20);
      @extend %bold-font;
    }
    .airport {
      font-size: vw(12);
    }
    .icon-arrow {
      width: 100%;
    }
    .ticket-during-time {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -10px);
      font-size: vw(12);
    }
  }
}
</style>
