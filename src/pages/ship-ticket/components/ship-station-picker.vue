<template>
  <div class="ship-station-area-list-wrapper">
    <search-header class="ship-station-area-list-header"
                 v-model="searchValue"
                 @back="back"
                 placeholder="输入关键字搜索(拼音，首字母均可)">
    </search-header>
    <div class="ship-station-area-list">
      <template v-if="searchValue">
        <div class="no-matched" v-if="queryResultsKeys && queryResultsKeys.length === 0">没有找到匹配的线路</div>
        <b-scroll class="ship-station-area-list-item-scroll-wrapper" v-else>
          <ship-station-picker-list
            :listKeys="queryResultsKeys"
            :list="queryResults"
            @picked="picked"
            :isDept="isDept">
          </ship-station-picker-list>
        </b-scroll>
      </template>
      <template v-else>
        <!-- <div class="ship-station-area-list-desc">根据 <span class="focus"></span> 选择</div> -->
        <b-scroll class="ship-station-area-list-keys-scroll-wrapper">
          <div class="ship-station-area-list-keys-wrapper">
            <div class="ship-station-area-list-keys title">{{ isDept ? '出发港' : '目的港' }}</div>
            <div class="ship-station-area-list-keys"
              :class="checked === item ? 'checked' : ''"
              v-for="(item, index) of listKeys"
              :key="index"
              @click="onClickAreaKey(item)">
              {{ item }}
            </div>
          </div>
        </b-scroll>
        <b-scroll class="ship-station-area-list-item-scroll-wrapper" ref="scrollRef">
          <ship-station-picker-list
            :listKeys="listKeys"
            :list="list"
            @picked="picked"
            :isDept="isDept"
            ref="pickerList">
          </ship-station-picker-list>
        </b-scroll>
      </template>
    </div>
  </div>
</template>

<script>
import { getShipStation } from '@/api'
import SearchHeader from '@/components/header/search-header'
import ShipStationPickerList from './ship-station-picker-list'

export default {
  components: {
    SearchHeader,
    ShipStationPickerList
  },

  props: {
    isDept: {
      type: Number,
      default: 1
    }
  },

  computed: {
    area () {
      return this.$route.params.area
    },
    // listKeys () {
    //   return Object.keys(this.list || {}).sort((a, b) => {
    //     return this.list[a].sort > this.list[b].sort ? 1 : -1
    //   }) || []
    // },
    queryResultsKeys () {
      return Object.keys(this.queryResults || {}) || []
    },
    cityName () {
      return this.area === 'nb' ? '宁波' : ''
    }
  },

  data () {
    return {
      list: {},
      offsetTopObj: {},
      offsetTopFirst: 0,
      checked: '',
      searchValue: '',
      queryResults: {},
      listKeys: []
    }
  },

  watch: {
    searchValue (newVal) {
      if (newVal) {
        this.querySearch(newVal)
      }
    }
  },

  mounted () {
    this.list = this.$store.getters.shipStationList[this.area][this.isDept]
    if (!this.list || this.list.length === 0) {
      this.getShipStation()
    } else {
      this.calculateHeight()
    }
  },

  methods: {
    calculateHeight () {
      this.getListKeys()
      this.$nextTick(() => {
        const list = this.$refs['pickerList'].$el.children
        const offsetTopArr = []
        for (let item of list) {
          offsetTopArr.push(item.offsetTop)
        }

        if (offsetTopArr.length > 0) {
          this.offsetTopFirst = offsetTopArr[0]
        }

        this.listKeys.forEach((value, index) => {
          this.offsetTopObj[value] = offsetTopArr[index]
        })

        if (this.listKeys.length > 0) {
          this.checked = this.listKeys[0]
        }
      })
    },
    async getShipStation () {
      const params = {
        isDept: this.isDept,
        cityName: this.cityName
      }
      let res = await getShipStation(params)

      // 将数据结构从数组转化成对象映射
      this.list = {}
      res.forEach((item, index) => {
        this.$set(this.list, item.areaName, item)
      })

      // 减少请求次数，仅第一次打开的时候请求数据，存入vuex
      this.$store.commit('STORE_SHIP_STATION_LIST', { type: this.area, list: this.list, isDept: this.isDept })
      this.calculateHeight()
    },
    getListKeys () {
      this.listKeys = Object.keys(this.list || {}).sort((a, b) => {
        return this.list[a].sort < this.list[b].sort ? 1 : -1
      }) || []
    },
    picked (shipStation) {
      console.log('selected')
      this.$emit('selected', shipStation)
    },
    onClickAreaKey (key) {
      this.checked = key
      this.$refs['scrollRef'].scrollTo(0, -(this.offsetTopObj[key] - this.offsetTopFirst))
    },
    back () {
      console.log('back')
      this.$emit('hide')
    },
    async querySearch (keyword) {
      const params = {
        isDept: this.isDept,
        keyword: keyword,
        cityName: this.cityName
      }
      let res = await getShipStation(params)
      this.queryResults = {}
      res.forEach((item, index) => {
        this.$set(this.queryResults, item.areaName, item)
      })
    }
  }
}
</script>

<style lang="scss">
.ship-station-area-list {
  display: flex;
  flex: 1;
  .no-matched {
    flex: 1;
    text-align: center;
    padding: vw(10);
    @extend %minor-font;
  }
  &-desc {
    border-bottom: 1px solid #ddd;
    padding: vw(5) vw(15);
    color: $minor-color;
    font-size: vw(12);
    text-align: center;
    .focus {
      font-size: vw(16);
      color: $default-color;
    }
  }
  &-wrapper {
    background-color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &-keys {
    padding: vw(12) vw(15);
    font-size: vw(13);
    border-bottom: 1px solid #ddd;
    &.title {
      padding: 0 vw(5);
      line-height: vw(30);
      background: $default-color;
      background: linear-gradient($default-color, ($default-color)+#333);
      color: #fff;
    }
    &.checked {
      position: relative;
      color: $default-color;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: vw(3);
        background: $default-color;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: vw(-1);
        bottom: 0;
        width: vw(1);
        background: inherit;
      }
    }

    &-scroll-wrapper {
      overflow: hidden;
      border-right: 1px solid #ddd;
      height: calc(100vh - #{$header-height});
    }

    &-wrapper {
      text-align: center;
    }
  }

  &-item {
    &-scroll-wrapper {
      height: calc(100vh - #{$header-height});
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
