<template>
  <main-page back title="订单详情" class="train-detail-container">
    <div slot="header-right" @click="toLoginView" v-if="!isLogin">登录</div>

    <train-ticket-info :info="detailData" class="train-detail-ticket-info"></train-ticket-info>
    <template slot="scroll">
      <ticket-passenger-form
        :fields="passengerFields"
        :values="passengerValues"
        addText="乘客"
        type="train"
        :limit="detailData.orderTicketCount < detailData.surplusTicket
          ? detailData.orderTicketCount
          : detailData.surplusTicket"
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
      v-model="priceTotal"
      :orderObj="orderInfoObj"
      type="train"
      slot="bottom"
      class="train-detail-topay-bar">
    </topay-bar>
  </main-page>
</template>

<script>
import TrainTicketInfo from './components/train-ticket-info'
import TicketPassengerForm from '@/components/order/ticket-passenger-form'
import TicketCollector from '@/components/order/ticket-collector'
import TopayBar from '@/components/order/topay-bar'
import Insurance from '@/components/order/insurance'
import OrderPriceDetail from '@/components/order/order-price-detail'
import { mapGetters } from 'vuex'
import detailMixin from '@/mixins/order-detail'

export default {
  components: {
    TrainTicketInfo,
    TicketPassengerForm,
    TicketCollector,
    TopayBar,
    Insurance,
    OrderPriceDetail
  },

  mixins: [detailMixin],

  computed: {
    ...mapGetters([
      'passengerFields',
      'passengerValues',
      'collector'
    ]),
    priceDetailList () {
      let arr = []
      arr.push({
        name: '票价',
        price: this.detailData.price,
        count: this.passengerValues.length
      })

      if (this.detailData.handlingFee) {
        arr.push({
          name: '代订服务费',
          price: this.detailData.handlingFee,
          count: this.passengerValues.length
        })
      }

      if (this.insurance && this.insurance.length !== 0) {
        for (const item of this.insurance) {
          arr.push({
            name: item.name,
            price: item.price,
            count: this.passengerValues.length
          })
        }
      }
      return arr
    },
    priceTotal () {
      let result = 0
      for (const item of this.priceDetailList) {
        result += item.price * item.count
      }
      return result
    },
    orderInfoObj () {
      return {
        ...this.detailData,
        insurance: this.insurance
      }
    },
    detailData () {
      return this.$store.getters.detailData['train']
    }
  },

  data () {
    return {
      insuranceList: [
        {
          id: '21',
          type: 3,
          name: '5元意外险',
          price: '5',
          introduce: '',
          checked: true
        }, {
          id: '22',
          type: 3,
          name: '10元意外险',
          price: '10',
          introduce: ''
        }, {
          id: '23',
          type: 3,
          name: '极速出票套餐（含意外险）',
          price: '20',
          introduce: ''
        }
      ],
      insurance: []
    }
  },

  created () {
    this.$store.commit('GET_COLLECTOR')
    this.$store.commit('GET_PASSENGERS', { type: 'train' })

    this.insurance = this.insuranceList.filter((item) => {
      return item.checked
    })
  },

  mounted () {
    console.log(this.detailData, this.detailData.queryDate)
    if (!this.detailData || !this.detailData.queryDate) {
      this.$store.commit('GET_DETAILDATA', { type: 'train' })
    }
    this.detailData.insurance = this.insurance
    this.detailData.passengers = this.passengerValues
    this.detailData.collector = this.collector
    this.detailData.handlingFee = this.detailData.handlingFee

    // 默认选中的保险列表
    this.insurance = this.insuranceList.filter((item) => {
      return item.checked
    })
  },

  methods: {
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'train')
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
