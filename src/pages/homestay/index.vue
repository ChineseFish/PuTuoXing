<template>
  <main-page title="民宿预订" back headerClass="gradient-style" class="homestay-index">
    <template slot="scroll">
      <l-header-image type="homestay"></l-header-image>

      <div class="block-section">
        <div @click="() => showCalendar = true" class="homestyle-date-choose-wrapper">
          <div class="checkin">
            <span class="title">入住日期</span>
            <span class="date" v-if="checkInDate">{{ checkInDate | dateFormat }}</span>
            <span class="date" v-else>--月 --日</span>
          </div>
          <div class="checkout">
            <span class="title">离店日期</span>
            <span class="date" v-if="checkOutDate">{{ checkOutDate | dateFormat }}</span>
            <span class="date" v-else>--月 --日</span>
          </div>
        </div>
        <l-input
          class="homestay-keywords-input"
          @click.native="onSearch"
          v-model="searchValue"
          clearable
          readonly
          placeholder="关键字 / 位置 / 民宿名"></l-input>

        <div class="commit-btn" @click="toList">查找民宿</div>

        <hot-search @onItem="toList"></hot-search>
      </div>
      <div class="block-section">
        <div class="section-title">
          <span class="iconfont icon-hot"></span>
          <span class="text">热门房源</span>
        </div>
        <div class="hot-list-wrapper">
          <div class="hot-list-item" v-for="(item, index) of hotList" :key="index" @click="toDetail(item)">
            <div class="image-wrapper">
              <img :src="item.image">
            </div>
            <div class="item-content-wrapper">
              <div class="title">
                {{ item.name }}
              </div>
              <!-- <div class="price">
                ¥{{ item.price }}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </template>

    <calendar :show.sync="showCalendar"
      :checkInTimeStamp="checkInTimeStamp"
      :checkOutTimeStamp="checkOutTimeStamp"
      @choosed="choosed"></calendar>

    <popup-container :show.sync="showSearchView" position="right" appendToBody>
      <search-view v-model="searchValue" @hidden="showSearchView = false" @commit="commitSearch"></search-view>
    </popup-container>
  </main-page>
</template>

<script>
import Calendar from '@/components/calendar'
import { formatDateYYMMDD } from '@/utils/date-format'
import SearchItem from '@/components/header/search-header'
import { getHotHomestayList } from '@/api'
import HotSearch from './components/hot-search'
import { mapGetters } from 'vuex'
import PopupContainer from '@/components/layouts/popup-container'
import SearchView from './components/search-view'

export default {
  components: {
    Calendar,
    SearchItem,
    HotSearch,
    SearchView,
    PopupContainer
  },
  computed: {
    checkInTimeStamp () {
      return +new Date(this.checkInDate) / 1000
    },
    checkOutTimeStamp () {
      return +new Date(this.checkOutDate) / 1000
    },
    ...mapGetters([
      'checkInDate',
      'checkOutDate'
    ])
  },
  data () {
    return {
      showCalendar: false,
      hotList: [],
      showSearchView: false,
      searchValue: ''
    }
  },
  watch: {
    searchValue (newVal) {
      this.$store.commit('SET_HOMESTAY_KEYWORDS', newVal)
    }
  },
  mounted () {
    this.getHotHomestayList()
  },
  methods: {
    checkIn () {
      this.showCalendar = true
    },
    checkOut () {
      this.showCalendar = true
    },
    choosed (checkIn, checkOut) {
      console.log(checkIn, checkOut)
      this.$store.commit('SET_CHECK_IN_DATE', formatDateYYMMDD(checkIn))
      this.$store.commit('SET_CHECK_OUT_DATE', formatDateYYMMDD(checkOut))
    },
    toDetail (item) {
      this.$router.push({ path: `/homestay/detail/${item.id}` })
    },
    async getHotHomestayList () {
      let res = await getHotHomestayList({ pageSize: 8 })
      this.hotList = res.data
    },
    toList (value) {
      if (!this.checkInDate || !this.checkOutDate) {
        this.$toast('请选择入住日期')
        return
      }
      if (typeof value === 'string') {
        this.$store.commit('SET_HOMESTAY_KEYWORDS', value)
      } else if (!this.searchValue) {
        this.$store.commit('SET_HOMESTAY_KEYWORDS', '')
      }
      console.log('-----', this.$store.getters.homestayKeywords)
      this.$router.push({ path: `homestay/list` })
    },
    onSearch () {
      this.showSearchView = true
    },
    commitSearch (val) {
      console.log('val: ', val)
      this.showSearchView = false
      this.searchValue = val
    }
  }
}
</script>

<style lang="scss">
.homestay-index {
  .block-section {
    padding-top: vw(10);
  }

  .homestay-keywords-input {
    margin-bottom: vw(10);
    font-size: vw(16);
  }

  .homestyle-date-choose-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: vw(10);

    .title {
      font-size: vw(12);
      // margin-right: vw(5);
      color: #555;
    }
    .date {
      font-size: vw(20);
    }
  }

  .commit-btn {
    // background-image: linear-gradient(-89deg, #ff8440 2%, #ff6a50 100%);
    background-image: linear-gradient(-89deg, #16cfff 2%, #26a2ff 100%);
    color: #fff;
    padding: vw(5) vw(10);
    border-radius: vw(5);
    text-align: center;
    letter-spacing: vw(4);
    font-size: vw(18);
    margin: 0 0 vw(10);
  }

  .section-title {
    color: #ff8440;
    font-size: vw(16);
    padding: 0 0 vw(10);
  }

  .hot-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .hot-list-item {
      width: vw(165);
      .image-wrapper {
        width: 100%;
        border-radius: vw(5);
        overflow: hidden;
        img {
          width: 100%;
          height: vw(124);
        }
      }
      // flex-shrink: 1;
      .item-content-wrapper {
        padding: vw(5) 0 vw(10);
      }
    }
  }
}
</style>
