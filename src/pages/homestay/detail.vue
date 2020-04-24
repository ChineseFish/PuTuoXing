<template>
  <main-page :title="detailData.name" back headerClass="gradient-style" class="homestay-detail-wrapper">
    <template slot="scroll">

      <detail-header-image
        :image="detailData.image"
        :imageInfo="detailData.imageInfo">
      </detail-header-image>

      <div class="block-section header-title-section">
        <l-tag-wrapper :tagList="detailData.tagList"></l-tag-wrapper>
        <div class="title">
          {{ detailData.name }}
        </div>
        <!-- <div class="price">
          ¥ <span class="price-num">{{ detailData.price }}</span>
        </div> -->
        <div class="bottom">
          <div class="line">
            <b class="bold">{{ detailData.layout }}</b>
            <span>{{` /${detailData.houseSize}平/`}}</span>
            <b>{{ detailData.bedType }}({{ detailData.bedNum }}张)</b>
            <i class="iconfont icon-wenhao" @click="showBedTypes = true"></i>
          </div>
        </div>
      </div>

      <div class="block-section" v-is-link @click="onAddress">
        <div class="section-title">
          地址
        </div>
        <div>{{ detailData.address }}</div>
      </div>

      <div class="block-section">
        <div class="section-title">
          房屋描述
        </div>
        <div v-html="detailData.description"></div>
      </div>
      <div class="block-section">
        <div class="section-title">
          入离日期
        </div>
        <div class="date-choose-content">
          <div @click="checkIn" class="checkin-content">
            <div class="title">入住</div>
            <div class="have-date" v-if="checkInDate">{{ checkInDate | dateFormat }}<span class="weekday">{{ checkInWeekday }}</span></div>
            <div v-else class="no-date">请选择入住日期</div>
          </div>
          <div class="homestay-during-days">{{ duringDays }}晚</div>
          <div @click="checkOut" class="checkout-content">
            <div class="title">离店</div>
            <div class="have-date" v-if="checkInDate">{{ checkOutDate | dateFormat }}<span class="weekday">{{ checkOutWeekday }}</span></div>
            <div v-else class="no-date">请选择离店日期</div>
          </div>
        </div>
      </div>

      <div class="block-section">
        <div class="section-title">
          入住须知
        </div>

        <div class="content">
          <div v-if="detailData.checkInTime">入住时间：{{ detailData.checkInTime }}</div>
          <div v-if="detailData.checkOutTime">退房时间：{{ detailData.checkOutTime }}</div>
          <div v-if="detailData.receptionTime">接待时间：{{ detailData.receptionTime }}</div>
          <div>退订说明：<span class="refund-instruction">{{ detailData.cancelText }}</span></div>
          <!-- <div>房屋守则：</div> -->
        </div>
      </div>

      <div class="block-section other-section">
        <div class="item" v-is-link @click="showFacilityInfo = true">配套设施</div>
        <div class="item" v-is-link @click="showServiceInfo = true">额外服务</div>
      </div>
    </template>

    <!-- <div slot="bottom" class="bottom-btn-wrapper">
      <div class="price-content">¥<span>{{ totalPrice }}</span>元</div>
      <div class="button">立即预定</div>
    </div> -->
    <topay-bar slot="bottom" payText="立即预定" v-model="totalPrice" @commit="toOrder()"></topay-bar>

    <calendar :show.sync="show"
      :checkInTimeStamp="checkInTimeStamp"
      :checkOutTimeStamp="checkOutTimeStamp"
      :unableBookArr="unableBookArr"
      :rmCalendarObj="rmCalendarObj"
      @choosed="choosed"></calendar>
    <mu-dialog :open.sync="showBedTypes" title="铺位">
      <div class="beds" v-for="(bed, bedIndex) of detailData.bedInfo" :key="bedIndex">
        - {{ bed.name }} | {{ bed.width }}米*{{ bed.length }}米 | {{ bed.quantity }}张
      </div>
    </mu-dialog>
    <mu-dialog :open.sync="showFacilityInfo" title="配套设施" scrollable>
      <div v-for="(item, groupName) of facilityInfo" :key="groupName">
        <div>{{ groupName }}</div>
        <l-tag-wrapper :tagList="item" itemClass="font-size-12"></l-tag-wrapper>
      </div>
    </mu-dialog>
    <mu-dialog :open.sync="showServiceInfo" title="额外服务">
      <div class="" v-for="(item, index) of serviceInfo" :key="index">
        <span>{{ item.name }}: </span>
        <span style="color: #333;">{{ item.description }}</span>
      </div>
    </mu-dialog>
  </main-page>
</template>

<script>
import Calendar from '@/components/calendar'
import { formatDateYYMMDD } from '@/utils/date-format'
import { getHomestayDetail, getHomestayPrice } from '@/api'
import DetailHeaderImage from './components/detail-header-image'
import TopayBar from '@/components/order/topay-bar'
import { mapGetters } from 'vuex'

const weekday = ['日', '一', '二', '三', '四', '五', '六']

export default {
  components: {
    Calendar,
    DetailHeaderImage,
    TopayBar
  },
  computed: {
    ...mapGetters([
      'checkInDate',
      'checkOutDate'
    ]),
    checkInTimeStamp () {
      return +new Date(this.checkInDate) / 1000
    },
    checkOutTimeStamp () {
      return +new Date(this.checkOutDate) / 1000
    },
    checkInWeekday () {
      return `周${weekday[new Date(this.checkInDate).getDay()]}`
    },
    checkOutWeekday () {
      return `周${weekday[new Date(this.checkOutDate).getDay()]}`
    },
    duringDays () {
      if (!this.checkInDate || !this.checkOutDate) {
        return 0
      }
      return (this.checkOutTimeStamp - this.checkInTimeStamp) / (24 * 60 * 60)
    },
    totalPrice () {
      if (!this.checkInDate || !this.checkOutDate || !this.rmCalendarObj) {
        return 0
      }

      let price = 0
      let curTimeStamp = this.checkInTimeStamp
      while (curTimeStamp < this.checkOutTimeStamp) {
        price += this.rmCalendarObj[curTimeStamp].price
        curTimeStamp += 24 * 60 * 60
      }
      return price
    }
  },
  data () {
    return {
      show: false,
      rmCalendarObj: null,
      unableBookArr: [],
      detailData: {},
      facilityInfo: {},
      serviceInfo: [],
      showFacilityInfo: false,
      showServiceInfo: false,
      showBedTypes: false
    }
  },
  mounted () {
    console.log('detail----')
    this.getHomestayDetail().then(() => {
      this.getPrice()
    })
  },
  methods: {
    checkIn () {
      this.show = true
    },
    checkOut () {
      this.show = true
    },
    setHomestayDate (checkInDate, checkOutDate) {
      this.$store.commit('SET_CHECK_IN_DATE', checkInDate)
      this.$store.commit('SET_CHECK_OUT_DATE', checkOutDate)
    },
    filterRoomCalendar (array) {
      const rmCalendarObj = {}
      array.filter((item, index, arr) => {
        const date = item.date.split(' ')[0]
        const timeStamp = new Date(date).getTime() / 1000
        if (!item.issell) {
          this.unableBookArr.push(timeStamp)
        }
        rmCalendarObj[timeStamp] = item
      })

      // console.log('rmCalendarObj: ', rmCalendarObj, this.unableBookArr)

      return rmCalendarObj
    },
    filterFacilityInfo (facilityInfo) {
      this.facilityInfo = {}
      facilityInfo.forEach((value) => {
        if (!this.facilityInfo[value.groupName]) {
          this.facilityInfo[value.groupName] = []
        }
        this.facilityInfo[value.groupName].push(value.name)
      })
    },
    choosed (checkIn, checkOut) {
      this.setHomestayDate(formatDateYYMMDD(checkIn), formatDateYYMMDD(checkOut))
    },
    async getHomestayDetail () {
      if (!this.$route.params.id) {
        return Promise.reject(Error('id不能为空'))
      }

      this.detailData = await getHomestayDetail({ id: this.$route.params.id })

      if (this.detailData.facilityInfo && this.detailData.facilityInfo.length > 0) {
        this.filterFacilityInfo(this.detailData.facilityInfo)
        this.serviceInfo = this.detailData.serviceInfo
      } else {
        this.serviceInfo = []
      }
    },
    async getPrice () {
      const { homestayId } = this.detailData
      const res = await getHomestayPrice({ homestayId, roomId: this.detailData.id })
      this.rmCalendarObj = this.filterRoomCalendar(res)
    },
    onAddress () {
      const { address, latitude, longitude, name } = this.detailData
      this.$router.push({ path: `/homestay/map`, query: { keyword: address, lat: latitude, lng: longitude, title: name } })
    },
    toOrder () {
      if (!this.checkInDate) {
        this.$toast('请选择入住日期')
        return
      }

      this.$store.commit('SET_DETAILDATA', {
        value: {
          ...this.detailData,
          totalPrice: this.totalPrice,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate
        },
        type: 'homestay'
      })
      this.$router.push({ path: `${this.$route.path}/booking` })
    }
  }
}
</script>

<style lang="scss">
.homestay-detail-wrapper {
  .header-title-section {
    .title {
      font-size: vw(18);
      font-weight: 500;
    }

    .price-num {
      font-size: vw(18);
    }

    .bottom {
      .line {
        display: flex;
        align-items: center;
      }
      .bold {
        font-size: vw(16);
      }
      .beds {
        @extend %minor-font;
        font-size: vw(11);
      }
    }
  }

  .block-section {
    padding: vw(10) vw(15);
    .section-title {
      font-size: vw(18);
    }
    .refund-instruction {
      color: $default-color-orange;
    }
  }

  .other-section {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      flex: 1;
      text-align: center;
      position: relative;
      &:not(:last-child)::after {
        content: '';
        border-right: vw(1) solid red;
        position: absolute;
        right: vw(-1);
        // border-right:
      }
    }
  }

  .date-choose-content {
    display: flex;
    align-items: center;

    .checkin-content {
      flex: 1;
    }
    .checkout-content {
      flex: 1;
    }

    .title {
      @extend %minor-font;
    }

    .have-date, .no-date {
      font-size: vw(18);
    }

    .no-date {
      color: $minor-color;
    }

    .have-date {
      font-weight: 500;
      .weekday {
        font-size: vw(14);
        font-weight: 400;
        margin-left: vw(5);
      }
    }
  }

  .bottom-btn-wrapper {
    display: flex;
    height: vw(60);
    border-top: vw(1) solid $line-color;
    background-color: #fff;

    .price-content {
    }

    .button {
      background-color: $default-color;
      color: #fff;
      margin: vw(5);
    }
  }

  .homestay-during-days {
    margin: 0 vw(20) 0 0;
    font-size: vw(11);
    border-radius: vw(5);
    padding: vw(1) vw(8);
    background-color: $default-color-orange;
    color: #fff;
  }
}
</style>
