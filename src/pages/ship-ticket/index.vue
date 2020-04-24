<template>
  <main-page noHeader class="ship-ticket-index-container">
    <template slot="scroll">
      <l-header-image :imgSrc="imgSrc[area]" back telephone="0580-2626888"></l-header-image>
      <div class="tips" v-if="noticeMessages && noticeMessages.length > 0"><i class="iconfont icon-tongzhi"></i>
        <div v-for="(item, index) of noticeMessages" :key="index">
          {{ item.notice }}
        </div>
      </div>
      <ticket-form @commit="commit" :type="`ship-${this.area}`" :canWebBuyDays="3">
        <ship-station-form-item slot="city"></ship-station-form-item>
        <template slot="bottom-btn">
          <icon-btn type="shipOrder" @click.native="toShipOrder"></icon-btn>
          <icon-btn icon="home-ship" color="#E8997F" text="船班动态" @click.native="toBoatDynamics"></icon-btn>
          <icon-btn icon="meteor" color="#65DDD3" text="舟山气象" @click.native="toZsMeteor"></icon-btn>
          <icon-btn type="feedback" :options="{ category: 'ship' }"></icon-btn>
          <!-- <icon-btn type="bus"></icon-btn>
          <icon-btn type="plane"></icon-btn>
          <icon-btn type="train"></icon-btn>
          <icon-btn icon="shouye-xianxing" color="rgb(126, 158, 244)" text="返回首页" @click.native="toHome"></icon-btn> -->
        </template>
      </ticket-form>
      <!-- <div class="ship-ticket-bottom-text" @click="toShipOldSystem">如遇问题，点此切换到旧页面</div> -->
      <!-- <travel-line-section></travel-line-section> -->
    </template>
  </main-page>
</template>

<script>
import IndexNavWrapper from '@/components/layouts/index-nav-wrapper'
import TicketForm from '@/components/form/ticket-form'
import ShipStationFormItem from './components/ship-station-form-item'
import TravelLineSection from '@/components/section/travel-line'
import { mapGetters } from 'vuex'
import { getNoticeMessages } from '@/api'

export default {
  components: {
    IndexNavWrapper,
    TicketForm,
    ShipStationFormItem,
    TravelLineSection
  },

  props: {
    area: String
  },

  computed: {
    ...mapGetters([
      'wxUserInfo'
    ])
  },

  data () {
    return {
      imgSrc: {
        zs: 'static/images/ship-nav-1.jpg',
        nb: 'static/images/ship-nav-2.jpg'
      },
      href: '',
      noticeMessages: []
    }
  },

  mounted () {
    console.log('this.area: ', this.area)
    this.getNoticeMessages()
  },

  methods: {
    commit (value) {
      console.log(value)
      this.href = `${value.url}?sCity=${value.start.alias}&eCity=${value.end.alias}&date=${value.dateTime}&unionid=${this.wxUserInfo.unionid || ''}`
      this.$loading('正在跳转...')
      window.location.href = this.href
      setTimeout(() => {
        this.$loading.close()
      }, 1000)
      // this.$router.push({ name: 'ShipTicketIframe', params: { system: 'query', url: this.href } })
    },
    toBoatDynamics () {
      this.$router.push({ path: `${this.area}/dynamics` })
    },
    toZsMeteor () {
      // this.$router.push({
      //   name: 'ShipTicketIframe',
      //   params: {
      //     system: 'meteor',
      //     url: 'http://www.zs121.com.cn/wap/tqyb_detail.asp?aid=002',
      //     back: true,
      //     title: '舟山气象'
      //   }
      // })
      this.$router.push({ name: 'ShipTicketWeather' })
    },
    toShipOldSystem () {
      window.location.href = 'http://xpt.ziubao.com/djcp.htm'
    },
    toHome () {
      // this.$router.push({ name: 'ShipTicketNav' })
    },
    async getNoticeMessages () {
      this.noticeMessages = await getNoticeMessages({ type: 'ship' })
    },
    toShipOrder () {
      window.location.href = 'http://m.zsptxtky.com/grzx.htm'
    }
  }
}
</script>

<style lang="scss">
.ship-ticket-index-container {
  .tips {
    padding: vw(3) vw(10);
    color: $default-color-orange;
    background: grb(244, 244, 244);
    display: flex;
    align-items: center;

    i {
      margin-right: vw(5);
    }
  }
  .ship-ticket-bottom-text {
    @extend %minor-font;
    text-align: center;
    padding: vw(10);
  }
}
</style>
