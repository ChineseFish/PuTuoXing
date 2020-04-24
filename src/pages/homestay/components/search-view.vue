<template>
  <div class="homestay-search-view">
    <main-page noHeader>
      <search-header v-model="searchKeywords"
        placeholder="关键字 / 位置 / 民宿名"
        @back="$emit('hidden')"
        @commit="commitSearch"
        searchBtnText="查找"></search-header>
      <template slot="scroll">
        <div class="hot-search-wrapper block-section">
          <div class="title">热门搜索</div>
          <hot-search @onItem="onSearch"></hot-search>
        </div>

        <div class="block-section history-search-wrapper">
          <div class="title">
            历史搜索
            <div class="clear-search"
              v-if="historyList.length > 0"
              @click="clearHistory">
              清除搜索
            </div>
          </div>
          <div class="history-search-list" v-if="historyList.length > 0">
            <div v-for="(item, index) of historyList"
              :key="index"
              class="history-search-item"
              @click="onSearch(item)">
              {{ item }}
            </div>
          </div>
          <div v-else class="hisotry-search-empty">
            -- 暂无搜索历史 --
          </div>
        </div>
      </template>
    </main-page>
  </div>
</template>

<script>
import SearchHeader from '@/components/header/search-header'
import HotSearch from './hot-search'
import store from 'store'

const ZYB_HOMESTAY_HISTORY_SEARCH = 'ZYB_HOMESTAY_HISTORY_SEARCH'
const HISTORY_MAX_LENGTH = 10

export default {
  components: {
    SearchHeader,
    HotSearch
  },
  props: {
    value: String
  },
  data () {
    return {
      searchKeywords: this.value,
      historyList: []
    }
  },
  watch: {
    searchKeywords (newVal) {
      this.$emit('input', newVal)
    },
    value (newVal) {
      this.searchKeywords = newVal
    }
  },
  created () {
    this.getHistorySearch()
  },
  methods: {
    onSearch (val) {
      this.searchKeywords = val
      this.$nextTick(() => {
        this.commitSearch(val)
      })
    },
    commitSearch (val) {
      this.saveHistorySearch(val)
      this.getHistorySearch()
      this.$emit('commit', val)
    },
    saveHistorySearch (val) {
      if (val) {
        let matchItem = null
        let matchItemIndex = 0
        this.historyList.forEach((value, index) => {
          if (value === val) {
            matchItem = value
            matchItemIndex = index
          }
        })

        // 匹配则调整history排序
        if (matchItem) {
          this.historyList.splice(matchItemIndex, 1)
          this.historyList.unshift(matchItem)
        } else {
          this.historyList.unshift(val)
        }

        if (this.historyList.length > HISTORY_MAX_LENGTH) {
          this.historyList.pop()
        }

        store.set(ZYB_HOMESTAY_HISTORY_SEARCH, this.historyList)
      }
    },
    getHistorySearch () {
      this.historyList = store.get(ZYB_HOMESTAY_HISTORY_SEARCH) || []
    },
    clearHistory () {
      this.historyList = []
      store.remove(ZYB_HOMESTAY_HISTORY_SEARCH)
    }
  }
}
</script>

<style lang="scss">
.homestay-search-view {
  .block-section {
    .title {
      padding: vw(5) 0 0;
      font-weight: 500;
      font-size: vw(18);
      position: relative;
      .clear-search {
        position: absolute;
        right: 0;
        top: vw(10);
        @extend %minor-font;
      }
    }
  }
  .history-search-wrapper {
    .history-search-list {
      margin: vw(10) 0;
      .history-search-item {
        background-color: #eee;
        margin: vw(5) vw(5);
        padding: vw(3);
        text-align: center;
        border-radius: vw(3);
        color: #333;
      }
    }
  }
  .hisotry-search-empty {
    @extend %minor-font;
    text-align: center;
    margin-bottom: vw(10);
  }
}
</style>
