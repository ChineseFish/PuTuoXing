<template>
  <main-page back title="订单详情" class="train-detail-container">
    <div slot="header-right" @click="toLoginView" v-if="!isLogin">登录</div>

    <travel-ship-ticket-info :info="detailData" class="train-detail-ticket-info"></travel-ship-ticket-info>
    <template slot="scroll">
      <ticket-passenger-form
        :fields="passengerFields"
        :values="passengerValues"
        type="ship"
        addText="乘客"
        :hasChild="!!detailData.childPrice"
        :limit="detailData.orderTicketCount >= detailData.surplusTicket
          ? detailData.surplusTicket
          : detailData.orderTicketCount"
        class="block-section passenger">
      </ticket-passenger-form>
      <ticket-collector v-model="collector" class="block-section"></ticket-collector>
      <insurance :list="insuranceList"
                 @change="insurance = arguments[0]"
                 class="block-section"></insurance>
      <order-price-detail :list="priceDetailList" class="train-detail-order-price">
        <div class="protocol">
          <p>订单包含票费、附加选购产品、服务费，点击去支付表示已阅读并同意<a class="protocol-link" @click="toShowBookNotice">预订协议</a></p>
        </div>
      </order-price-detail>
    </template>
    <topay-bar
      v-model="priceToPay"
      :orderObj="orderInfoObj"
      type="ship"
      slot="bottom"
      class="train-detail-topay-bar">
    </topay-bar>
  </main-page>
</template>

<script>
import TravelShipTicketInfo from './components/travel-ship-ticket-info'
import TicketPassengerForm from '@/components/order/ticket-passenger-form'
import TicketCollector from '@/components/order/ticket-collector'
import TopayBar from '@/components/order/topay-bar'
import Insurance from '@/components/order/insurance'
import OrderPriceDetail from '@/components/order/order-price-detail'
import { mapGetters } from 'vuex'
import detailMixin from '@/mixins/order-detail'

export default {
  components: {
    TravelShipTicketInfo,
    TicketPassengerForm,
    TicketCollector,
    TopayBar,
    Insurance,
    OrderPriceDetail
  },

  props: {
    shipInfo: Object,
    default: () => {}
  },

  mixins: [detailMixin],

  computed: {
    ...mapGetters([
      'passengerFields',
      'passengerValues',
      'collector'
    ]),
    orderInfoObj () {
      return {
        ...this.detailData,
        insurance: this.insurance
      }
    },
    detailData () {
      return this.$store.getters.detailData['ship'] || {}
    }
  },

  data () {
    return {
      insuranceList: [
        {
          id: '31',
          type: 4,
          name: '5元意外险',
          price: '5',
          introduce: '',
          checked: true
        },
        {
          id: '32',
          type: 4,
          name: '10元意外险',
          price: '10',
          introduce: ''
        }
      ],
      insurance: []
    }
  },

  created () {
    this.$store.commit('GET_COLLECTOR')
  },

  mounted () {
    if (!this.detailData || !this.detailData.queryDate) {
      this.$store.commit('GET_DETAILDATA', { type: 'ship' })
    }

    // 取消默认勾选
    if (['302', '303'].indexOf(this.detailData.routeID) > -1) {
      this.insuranceList[0].checked = false
    }

    // 默认选中的保险列表
    this.insurance = this.insuranceList.filter((item) => {
      return item.checked
    })
    this.detailData.insurance = this.insurance
    this.detailData.passengers = this.passengerValues
    this.detailData.collector = this.collector
  },

  methods: {
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'ship')
    }
  }
}
</script>

<style lang="scss">
.train-detail {
  &-container {
    .passenger {
      margin-top: vw(10);
    }
  }
  &-topay-bar {

  }
  &-order-price {
    padding: 0 vw(10) vw(10);
  }
  &-ticket-info {
    padding: 0 $padding-aside;
  }
}
</style>
