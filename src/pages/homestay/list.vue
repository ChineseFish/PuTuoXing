<template>
  <main-page class="homestay-list-wrapper" noHeader
    :pullDownRefresh="{ threshold: 50, stop: 20 }"
    :pullup="true"
    @pulldown="pulldown"
    @scrollToEnd="scrollToEnd"
    ref="main-page"
    :data="list"
    :isLoading="!isLoaded"
    noMatchText="未找到匹配民宿">
    <search-header @back="() => $router.back()"
      @onSearch="onSearch"
      v-model="searchValue"
      placeholder="关键字 / 位置 / 民宿名"></search-header>
    <!-- <button @click="onSearch">点我搜索</button> -->
    <tabs-filter-bar>
      <tabs-filter-item v-for="(item, key) of filterObj"
        :key="key"
        :defaultLabel="item.defaultLabel"
        v-model="filterValues[key]"
        :options="item.options"
        @selected="filterSelected">
      </tabs-filter-item>
    </tabs-filter-bar>
    <div class="list-wrapper" slot="scroll">
      <div class="list-item-wrapper" v-for="(item, index) of list" :key="index" @click="toDetail(item)">
        <div class="image-wrapper">
          <img :src="item.image">
        </div>
        <l-tag-wrapper class="tag-wrapper" :tagList="item.tagList"></l-tag-wrapper>
        <div class="item-name">{{ item.name }}</div>
        <div class="sub-content-wrapper">
          <!-- <span>{{ item.layout }}</span>
          <span>/</span>
          <span>{{ item.bedType }}</span>
          <span>/</span> -->
          <span>{{ item.address }}</span>
        </div>
        <div class="price-wrapper" v-if="item.price" style="align-items: baseline;">
          <span>¥</span>
          <span class="price">{{ item.price }}</span>
          <span>起</span>
        </div>
        <!-- <div class="price-wrapper">
          <span class="price-sign">¥</span>
          <span class="price">{{item.price}}</span>
        </div> -->
      </div>
    </div>

    <popup-container :show.sync="showSearchView" position="right" appendToBody>
      <search-view v-model="searchValue" @hidden="showSearchView = false" @commit="commitSearch"></search-view>
    </popup-container>
  </main-page>
</template>

<script>
import { getHotelList, getHomestayHotSearchList } from '@/api'
import { TabsFilterBar, TabsFilterItem } from '@/components/tabs-filter'
import ListMixins from '@/mixins/list'
import SearchHeader from '@/components/header/search-header'
import PopupContainer from '@/components/layouts/popup-container'
import SearchView from './components/search-view'
import { mapGetters } from 'vuex'

export default {
  components: {
    TabsFilterBar,
    TabsFilterItem,
    SearchHeader,
    PopupContainer,
    SearchView
  },
  mixins: [ListMixins],
  computed: {
    ...mapGetters([
      'homestayKeywords'
    ])
  },
  data () {
    return {
      list: [],
      filterObj: {
        orderBy: {
          options: [{
            label: '默认排序',
            value: 0
          }, {
            label: '高价优先',
            value: 1
          }, {
            label: '低价优先',
            value: 2
          }],
          defaultLabel: '默认排序'
        },
        price: {
          options: [{
            label: '默认价格',
            value: '0,99999'
          }, {
            label: '0-100元',
            value: '0,100'
          }, {
            label: '100-300元',
            value: '100,300'
          }, {
            label: '300-500元',
            value: '300,500'
          }, {
            label: '500-1000元',
            value: '500,1000'
          }, {
            label: '1000元以上',
            value: '1000,99999'
          }],
          defaultLabel: '默认价格'
        },
        zone: {
          options: [{
            label: '默认区域',
            value: ''
          }, {
            label: '东极岛',
            value: '东极'
          }, {
            label: '庙子湖',
            value: '庙子湖'
          }, {
            label: '青浜岛',
            value: '青浜'
          }, {
            label: '东福山岛',
            value: '东福山'
          }],
          defaultLabel: '默认区域'
        }
      },
      filterValues: {
        orderBy: 0,
        price: '0,99999',
        zone: ''
      },
      searchValue: '',
      showSearchView: false
    }
  },
  watch: {
    searchValue (newVal) {
      this.$store.commit('SET_HOMESTAY_KEYWORDS', newVal)
    }
  },
  created () {
    this.getListMethod = getHotelList
    this.listParams = { ...this.filterValues, keywords: this.homestayKeywords || '' }
  },
  mounted () {
    this.getHomestayZoneList()
    this.searchValue = this.homestayKeywords
  },
  methods: {
    async getHomestayZoneList () {
      const zone = await getHomestayHotSearchList()
      const options = [{
        label: '默认区域',
        value: ''
      }]
      for (let value of zone) {
        options.push({ label: value, value })
      }
      this.filterObj.zone.options = options
    },
    filterSelected () {
      console.log('filterObj', this.filterValues)
      this.listParams = { ...this.filterValues }
      this.getList()
      this.$refs['main-page'].scrollToTop()
    },
    toDetail (item) {
      this.$router.push({ path: `/homestay/room-list/${item.id}` })
    },
    onSearch () {
      this.showSearchView = true
    },
    commitSearch (val) {
      console.log('commitSearch val: ', val)
      this.showSearchView = false
      this.listParams.keywords = val
      this.searchValue = this.homestayKeywords
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.homestay-list-wrapper {
  .list-wrapper {
    padding: 0 $padding-aside;
    background-color: #fff;
    .list-item-wrapper {
      position: relative;
      padding: vw(10) 0;
      img {
        border-radius: vw(5);
        overflow: hidden;
      }

      .sub-content-wrapper {
        margin-right: vw(80);
      }

      .price-wrapper {
        color: $default-color-orange;
        position: absolute;
        right: 0;
        bottom: vw(8);
        font-size: vw(11);
        display: flex;
        align-items: baseline;
      }

      .tag-wrapper {
        margin-top: vw(5);
        .tag-item {
          background-color: $default-color;
          // background-image: linear-gradient(137deg, #f55 0, #ff46b7 100%);
          background-image: linear-gradient(-89deg, #16cfff 2%, #26a2ff 100%);
          border-radius: vw(4);
          color: #fff;
          font-size: vw(10);
          padding: vw(1) vw(4);
          margin-right: vw(8);
        }
      }
      .item-name {
        font-size: vw(18);
        font-weight: 500;
      }

      .price-wrapper {
        display: flex;
        align-items: center;
        .price-sign {
          color: $default-color-orange;
        }
        .price {
          font-size: vw(18);
        }

        .discount-tag-wrapper {
          .tag-item {
            background-color: $default-color;
            background-image: linear-gradient(137deg, #f55 0, #ff46b7 100%);
            border-radius: vw(4);
            color: #fff;
            font-size: vw(10);
            padding: vw(1) vw(4);
            margin-left: vw(8);
          }
        }
      }
    }
  }
}
</style>
