<template>
  <main-page class="bus-pay-container" noHeader @scroll="handleScroll">
    <l-header class="header" back ref="header">
      <div slot="center" class="header-center">
        <div class="tip" ref="fadeTip">
          <p>订单填写</p>
        </div>
        <div class="info" ref="fadeInfo">
          <p class="header-bus-time">
            <span>{{detailData.queryDate | dateFormat}}</span>
            <span>{{detailData.fromTime}}</span>
          </p>
          <p class="header-station" v-if="detailData.fromStationName && detailData.toStationName">
            <span class="from">{{detailData.fromStationName}}</span>
            <i class="iconfont icon-toright"></i>
            <span class="to">{{detailData.toStationShow || detailData.toStationName}}</span>
          </p>
          <p class="header-trip" v-if="detailData.tripName">
            <span>{{detailData.tripName}}</span>
          </p>
        </div>
      </div>
      <div slot="right" @click="toLoginView" v-if="!isLogin">登录</div>
    </l-header>

    <template slot="scroll">
      <div class="bus-pay-main">
        <section class="section bus">
          <bus-info :fromSta="detailData.fromStationName || detailData.tripName"
                    :toSta="detailData.toStationShow || detailData.toStationName || ''"
                    :depDate="detailData.queryDate"
                    :depTime="detailData.fromTime"
                    :backDate="detailData.backDate"
                    :backTime="detailData.backTime"
                    :price="detailData.fullPrice"
                    :surplus="detailData.category === 'luxury-bus' ? detailData.surplusTicket : ''">
          </bus-info>
          <div class="notice" @click="toShowBookNotice">订票须知</div>
        </section>
        <div slot="labels" class="labels-wrapper">
          <span class="label blue-color" v-if="busCategoryLabel">
            {{ busCategoryLabel }}
          </span>
          <span class="label blue-color" v-if="!detailData.handlingFee">
            免服务费
          </span>
          <span v-if="detailData.noReund" class="label">
            不支持网上退改签
          </span>
          <span v-if="!detailData.childPrice" class="label">
            不能购买儿童票
          </span>
          <span v-if="detailData.busType && detailData.busType.indexOf('加班') > -1" class="label">
            加班车不退不改
          </span>
        </div>

        <section class="section station-address" v-if="detailData.fromStationAddress" v-is-link @click="toAddress">
          <div class="section-title-with-border-left">取票、乘车地</div>
          <div class="address">
            <i class="iconfont icon-weizhi-xianxing"></i>
            {{ detailData.fromStationAddress || detailData.fromStationName }}
          </div>
          <div class="station-telephone" v-if="detailData.fromStationTelephone">
            <i class="iconfont icon-telephone"></i>
            车站热线(<a :href="`tel://${detailData.fromStationTelephone}`">{{ detailData.fromStationTelephone }}</a>)
          </div>
        </section>

        <section class="section passenger">
          <ticket-passenger-form
            :fields="passengerFields"
            :values="passengerValues"
            addText="乘客"
            type="bus"
            :hasChild="!!detailData.childPrice"
            :limit="detailData.limit">
          </ticket-passenger-form>
        </section>
        <section class="section collector">
          <ticket-collector v-model="collector"></ticket-collector>
        </section>
        <section class="section insurance">
          <insurance :list="insuranceList"
                     @change="insurance = arguments[0]"
                     @showInsIntroduce="showDialog">
          </insurance>
        </section>
        <section class="section price-detail">
          <order-price-detail :list="priceDetailList">
            <div class="protocol">
              <p>订单包含汽车票、附加选购产品、部分车站含服务费</p>
              <p>点击去支付表示已阅读并同意<a class="protocol-link" @click="toShowBookNotice">汽车票预订协议</a></p>
            </div>
          </order-price-detail>
        </section>
      </div>
    </template>

    <l-dialog :show.sync="dialogShowing">
      <div v-html="dialogMsg" class="dialig-msg"></div>
    </l-dialog>

    <!-- <footer class="footer" ref="footer"> -->
    <topay-bar v-model="priceToPay" :orderObj="orderInfoObj" type="bus" slot="bottom"></topay-bar>
    <!-- </footer> -->

  </main-page>
</template>

<script>
import BusInfo from './components/bus-info'
import TicketPassengerForm from '@/components/order/ticket-passenger-form'
import TicketCollector from '@/components/order/ticket-collector'
import OrderPriceDetail from '@/components/order/order-price-detail'
import TopayBar from '@/components/order/topay-bar'
import Insurance from '@/components/order/insurance'
import BusInsuranceData from '@/data/bus-insurance'
import { mapGetters } from 'vuex'
import detailMixins from '@/mixins/order-detail'

export default {
  components: {
    BusInfo,
    TicketPassengerForm,
    TicketCollector,
    Insurance,
    OrderPriceDetail,
    TopayBar
  },
  props: {
    detail: Object
  },
  mixins: [detailMixins],
  provide () {
    return {
      listenScroll: true,
      probeType: 3
    }
  },
  data () {
    return {
      fadeStartY: 60,
      dialogShowing: false,
      dialogMsg: '',
      detailDataStoreKey: 'BUS_INFO',
      insuranceList: [
        {
          id: '1',
          type: 1,
          name: '5元汽意险',
          price: '5',
          introduce: BusInsuranceData,
          checked: true
        }, {
          id: '2',
          type: 1,
          name: '10元汽意险',
          price: '10',
          introduce: BusInsuranceData
        }, {
          id: '3',
          type: 1,
          name: '极速出票套餐（含汽意险）',
          price: '20',
          introduce: ''
        }
      ],
      insurance: null
    }
  },
  computed: {
    ...mapGetters([
      'passengerFields',
      'passengerValues',
      'collector'
    ]),
    detailData () {
      return this.$store.getters.detailData['bus'] || {}
    },
    // detail () {
    //   return this.$route.query.detail
    // },
    passengerFields () {
      return [
        { prop: 'name', title: '姓名', value: '', placeholder: '请输入姓名' },
        { prop: 'id', type: 1, value: '', moreType: this.detailData.category !== 'plane-bus' }
      ]
    },
    busCategoryLabel () {
      switch (this.detailData.category) {
        case 'luxury-bus': return '豪华舒适大巴'
        case 'plane-bus': return '暂仅支持身份证'
        case 'bus': return '大巴类型-' + this.detailData.busType
      }
      return ''
    },
    scrollPaddingBottom () {
      let bottomElHeight = this.$refs.footer ? this.$refs.footer.offsetHeight : 0
      return bottomElHeight
    },
    scrollHeight () {
      let scrollEl = this.$refs.scroll.$el
      return window.innerHeight - scrollEl.offsetTop - (this.scrollPaddingBottom + 5)
    },
    orderInfoObj () {
      if (!this.detailData) {
        return {}
      }
      console.log('this.passengerValues: ', this.passengerValues)
      return {
        ...this.detailData,
        price: this.detailData.fullPrice,
        insurance: this.insurance,
        passengers: this.passengerValues,
        collector: this.collector,
        handlingFee: this.detailData.handlingFee,
        category: this.detailData.category
      }
    }
  },
  created () {
    // if (this.detail) {
    //   this.$store.commit('SET_DETAILDATA', { type: 'bus', value: this.detail })
    // } else {
    //   this.$store.commit('GET_DETAILDATA', { type: 'bus' })
    // }
    this.$store.commit('GET_COLLECTOR')
  },
  mounted () {
    if (!this.detailData || !this.detailData.queryDate) {
      this.$store.commit('GET_DETAILDATA', { type: 'bus' })
    }
    console.log('detailData ', this.detailData, this.$store.getters.detailData)
    // 默认选中的保险列表
    this.insurance = this.insuranceList.filter((item) => {
      return item.checked
    })
  },
  methods: {
    // 顶部过渡效果
    handleScroll (pos) {
      let y = -pos.y
      let tipEle = this.$refs.fadeTip
      let infoEle = this.$refs.fadeInfo
      if (y > this.fadeStartY) {
        infoEle.style.opacity = 1
        tipEle.style.opacity = 0
        infoEle.parentNode.style.transform = `translate3d(0, ${-infoEle.offsetHeight}px, 0)`
      } else {
        infoEle.style.opacity = 0
        tipEle.style.opacity = 1
        infoEle.parentNode.style.transform = `translate3d(0, 0, 0)`
      }
    },
    showDialog (content) {
      this.dialogShowing = true
      this.dialogMsg = content
    },
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'bus')
    },
    insuranceChange (value) {

    },
    toAddress () {
      let address = this.detailData.fromStationAddress || this.detailData.fromStationName
      this.$router.push({
        path: 'order/map',
        query: {
          keyword: address,
          city: this.detailData.fromCityName,
          name: this.detailData.fromStationName,
          tel: this.detailData.fromStationTelephone,
          lat: this.detailData.latitude || '',
          lng: this.detailData.longitude || ''
        }
      })
    }
  }
}
</script>

<style lang="scss">
.bus-pay {
  &-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $background-color;
    z-index: 310;
    * {
      box-sizing: border-box;
    }
    .header {
      color: $default-font-color;
      .is-center {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      &-center {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 1;
        transition: transform .5s ease;
        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: $header-height;
          opacity: 0;
          transition: opacity .5s ease;
        }
        .tip {
          height: $header-height;
          line-height: $header-height;
          opacity: 1;
          transition: opacity .5s ease;
        }
      }
      &-bus-time {
        margin-top: vw(5);
        font-size: vw(18);
      }
      &-station, &-trip {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: vw(13);
        .from, .to {
          // flex: 1;
          padding: vw(5) vw(3);
          line-height: 1;
          @include text-overflow();
        }
      }
    }
    .scroll-container {
      overflow: hidden;
      height: calc(100vh - #{2 * $header-height + vw(20)});
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    .dialig-msg {
      p {
        margin-bottom: vw(10);
      }
    }
  }
  &-main {
    .section {
      position: relative;
      .notice {
        position: absolute;
        right: vw(10);
        bottom: vw(10);
        color: $default-color;
        font-size: vw(12);
      }
      &:not(:first-child) {
        margin-top: $section-gap-width;
        padding: 0 $padding-aside;
        background-color: #fff;
      }

      &.station-address {
        padding-top: $padding-aside;
        padding-bottom: $padding-aside;
        position: relative;
        .address {
          @extend %minor-font;
        }
        .station-telephone {
          @extend %minor-font;
        }
      }
    }
    .passenger {
      background-color: #fff;
    }
    .section.price-detail {
      background-color: transparent;
    }
    .labels-wrapper {
      padding: vw(8) $padding-aside;
      background: #fbf2eb;
      box-shadow: 3px 3px 3px #eee;
    }
    .label {
      padding: vw(2) vw(4);
      margin-right: vw(5);
      border: 1px solid $default-color-orange;
      border-radius: vw(5);
      color: $default-color-orange;
      font-size: vw(12);

      &.blue-color {
        border-color: $default-color;
        color: $default-color;
      }
    }
  }
}
</style>
