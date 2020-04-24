<template>
  <div class="city-picker">
    <search-header class="city-picker-header"
                 v-model="searchValue"
                 @back="back"
                 placeholder="输入城市关键字">
    </search-header>
    <!-- 搜索结果显示区 -->
    <div v-if="searchValue" class="city-list-main-wrapper">
      <p class="city-list-main-word">搜索结果</p>
      <b-scroll ref="scroller" class="query-result-wrapper">
        <ul class="hot-list">
          <li v-for="(item, itemiIndex) in queryResults"
              :key="itemiIndex"
              @click="selectCity(item)"
              class="city-list-main-item">
            <span>{{ item.cname }}</span>
            <span class="city-list-main-item-abbr">{{ item.short }}</span>
          </li>
        </ul>
      </b-scroll>
    </div>
    <!-- 非搜索状态显示区 -->
    <div v-else-if="type === 'plane'" class="city-list-main-wrapper air-city-list">
      <l-tab v-model="planeType"
           class="city-tab"
           activeColor="#26a2ff">
        <l-tab-item @click.native="category = 1">国内</l-tab-item>
        <l-tab-item @click.native="category = 2">国际/港澳台</l-tab-item>
      </l-tab>
      <keep-alive>
        <internal-air-list class="city-picker-list"
                  v-if="category === 1"
                  :search="searchValue"
                  @selected="selectCity"
                  :hotCityObj="hotCityObj"
                  :category="1">
        </internal-air-list>
      </keep-alive>
      <keep-alive>
        <foreign-air-list class="city-picker-list"
                  v-if="category === 2"
                  :search="searchValue"
                  @selected="selectCity"
                  :hotCityObj="ForeignHotCityObj"
                  :category="2">
        </foreign-air-list>
      </keep-alive>
    </div>
    <div v-else-if="type === 'bus'" class="city-list-main-wrapper bus-city-list">
      <keep-alive>
        <bus-city-list class="city-picker-list"
                  v-if="category === 3"
                  :search="searchValue"
                  @selected="selectCity"
                  :hotCityObj="busHotCity"
                  :category="3">
        </bus-city-list>
      </keep-alive>
    </div>
    <div v-else-if="type === 'train'" class="city-list-main-wrapper train-city-list">
      <keep-alive>
        <bus-city-list class="city-picker-list"
                  v-if="category === 4"
                  :search="searchValue"
                  @selected="selectCity"
                  :hotCityObj="trainHotCity"
                  :category="4">
        </bus-city-list>
      </keep-alive>
    </div>
    <b-scroll v-else-if="type === 'planebus'" class="city-list-main-wrapper plane-bus-city-list">
      <plane-bus-city-list
        class="city-picker-list"
        :search="searchValue"
        @selected="selectCity"
        :category="31"
        :isDept="isDept">
      </plane-bus-city-list>
    </b-scroll>
  </div>
</template>

<script>
import SearchHeader from '@/components/header/search-header'
import CityList from './city-list'
import { LTab, LTabItem } from '@/components/tab'
import InternalHotCity from './hot-city'
import ForeignHotCity from './foreign-hot-city'
import BusHotCity from './bus-hot-city'
import TrainHotCity from './train-hot-city'
import { getCityList, getPlaneBusStationList } from '@/api'
import PlaneBusCityList from './plane-bus-city-list'
import { mapGetters } from 'vuex'

export default {
  components: {
    SearchHeader,
    InternalAirList: CityList,
    ForeignAirList: CityList,
    BusCityList: CityList,
    LTab,
    LTabItem,
    PlaneBusCityList
  },

  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'plane',
      validator (value) {
        return ['plane', 'bus', 'train', 'planebus'].indexOf(value) > -1
      }
    },
    isDept: {
      type: Number,
      default: 1
    }
  },

  computed: {
    ...mapGetters([
      'ticketFormData'
    ])
  },

  data () {
    return {
      searchValue: '',
      planeType: 0,
      queryResults: null,
      hotCityObj: InternalHotCity,
      ForeignHotCityObj: ForeignHotCity,
      busHotCity: BusHotCity,
      trainHotCity: TrainHotCity,
      category: 1 // 0 国内外机场，1 国内，2 国外，3 大巴，4 火车
    }
  },

  mounted () {
    this.initCategory()
  },

  methods: {
    initCategory () {
      const categories = {
        'plane': 1,
        'bus': 3,
        'train': 4,
        'planebus': 31
      }

      this.category = categories[this.type] || 'plane'
    },
    back () {
      this.$parent.hide()
    },
    selectCity (value) {
      value.category = this.category
      this.$emit('selected', value)
      this.back()
    },
    async queryCity (keyword) {
      let params = {
        keyword: keyword
      }

      if (this.category === 31) {
        params.isDept = this.isDept
        if ('start' in this.ticketFormData && !this.isDept) {
          params.sCity = this.ticketFormData.start.cname
        }
        this.queryResults = await getPlaneBusStationList(params)
      } else {
        this.queryResults = await getCityList(params, this.category)
      }
    }
  },
  watch: {
    searchValue (newVal) {
      if (newVal) {
        this.queryCity(newVal)
      }
    },
    queryResults () {
      if (this.$refs.scroller) {
        this.$refs.scroller.refresh()
      }
    }
  }
}
</script>

<style lang="scss">
.city-picker {
  &-header {
    height: $header-height;
  }
  .city-list-main {
    &-items:not(:first-child) {
      &:not(:first-child) .city-list-main-word {
        border-bottom: 1px solid $line-color + #111;
      }
    }

    &-word {
      padding: vw(8) $padding-aside;
      background: $city-picker-theme-color;
      color: $default-color;
    }

    &-item {
      padding: vw(8) $padding-aside;
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
      &-abbr {
        color: #d7dbde;
      }
    }
  }
  .query-result-wrapper {
    overflow: hidden;
    height: (100vh - #{$header-height + vw(40)});
  }
  .air-city-list &-list {
    overflow: hidden;
    height: calc(100vh - #{$header-height + vw(40)});
  }
  .bus-city-list &-list {
    overflow: hidden;
    height: calc(100vh - #{$header-height});
  }
  .train-city-list &-list {
    overflow: hidden;
    height: calc(100vh - #{$header-height});
  }
  .plane-bus-city-list {
    overflow: hidden;
    height: calc(100vh - #{$header-height});
  }
}
</style>
