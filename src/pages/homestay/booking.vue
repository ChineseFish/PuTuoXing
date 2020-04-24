<template>
  <main-page class="homestay-booking-wrapper" back title="预订信息">
    <template slot="scroll">
      <div class="block-section detail-wrapper">
        <img :src="detailData.image" class="thumb">
        <div class="right-content">
          <div class="title">{{ detailData.name }}</div>
          <div class="sub-title">{{ detailData.layout }} | {{ detailData.houseType }}</div>
        </div>
      </div>

      <div class="block-section">
        <div class="title">入离日期</div>
        <div class="date-wrapper">
          <div><span class="date-num">{{ detailData.checkInDate | dateFormat }}</span>入住</div>
          <div class="homestay-during-days">{{ duringDays }}晚</div>
          <div><span class="date-num">{{ detailData.checkOutDate | dateFormat }}</span>离店</div>
        </div>
      </div>

      <div class="block-section">
        <div class="title">入住人信息</div>
        <ticket-collector v-model="collector" type="homestay"></ticket-collector>
      </div>

      <div class="block-section">
        <div class="title">发票</div>
        <div>如需发票，可向房东索取</div>
      </div>

      <div class="block-section" v-is-link>
        <div @click="toShowBookingNotice" style="display: flex; align-items: center;">
          <span>境外/港澳台人士入住须知</span>
          <i class="iconfont icon-wenhao" style="margin-left: 5px;"></i></div>
      </div>
    </template>

    <topay-bar slot="bottom" v-model="detailData.totalPrice" :orderObj="detailData" type="homestay"></topay-bar>
    <mu-dialog :open.sync="showBookingNotice" scrollable :padding="80" title="境外/港澳台入住须知">
      <div v-html="bookNoticeText"></div>
    </mu-dialog>
  </main-page>
</template>

<script>
import TicketCollector from '@/components/order/ticket-collector'
import TopayBar from '@/components/order/topay-bar'

export default {
  components: {
    TicketCollector,
    TopayBar
  },
  computed: {
    detailData () {
      return this.$store.getters.detailData['homestay']
    },
    collector () {
      return this.$store.getters.collector
    },
    duringDays () {
      if (!this.detailData.checkInDate || !this.detailData.checkOutDate) {
        return 0
      }
      return (+new Date(this.detailData.checkOutDate) - +new Date(this.detailData.checkInDate)) / (24 * 60 * 60 * 1000)
    },
    bookNoticeText () {
      return `
        <p>根据我国法律规定，外国人、港澳台居民应当在抵达住宿地后24小时内办理住宿登记。住宿宾馆的，请在宾馆内办理。住宿宾馆以外地区的，请前往居住地派出所办理。未依法办理住宿登记将承担相应法律责任。</p>
        <p>请随身携带您的出入境证件以备公安机关查验。</p>
        <div style="margin-top: 15px;">
          <p>According to the Chinese laws, foreign nationals and residents from Hong Kong, Macao and Taiwan should register their accommodation within 24 hours of arrival. The hotel residents can complete it in the hotel. Those who stay elsewhere should go to the local police station for registration. Failure to comply with the regulations will result in legal liability.</p>
          <p>Please carry your travel document with you for possible examination by the police.</p>
        </div>
      `
    }
  },
  data () {
    return {
      showBookingNotice: false
    }
  },
  created () {
    this.$store.commit('GET_COLLECTOR')
    this.$store.commit('GET_DETAILDATA', { type: 'homestay' })
  },
  mounted () {
    this.detailData.collector = this.collector
  },
  methods: {
    toShowBookingNotice () {
      this.showBookingNotice = true
    }
  }
}
</script>

<style lang="scss">
.homestay-booking-wrapper {
  .block-section {
    &>.title {
      font-size: vw(16);
      color: $default-color;
    }
  }
  .detail-wrapper {
    display: flex;
    align-items: center;
    .thumb {
      width: vw(125);
      height: vw(80);
      border-radius: vw(5);
    }

    .right-content {
      margin-left: vw(10);

      .title {
        font-size: vw(18);
        font-weight: 500;
      }

      .sub-title {
        @extend %minor-font;
      }
    }
  }

  .date-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .date-num {
      font-size: vw(18);
    }
  }
}
</style>
