<template>
  <b-scroll class="city-list" :ref="scrollRef">
    <ul class="city-list-main" :ref="cityListMainRef">
      <div class="city-list-history" v-if="historyCities && historyCities.length > 0">
        <p class="title-word">历史城市</p>
        <div class="history-city-list-wrapper city-list">
          <div class="history-city-item city-item"
            v-for="(item, index) of historyCities"
            :key="index"
            @click="selectCity(item)">
            {{ item.cname }}
          </div>
        </div>
      </div>
      <li v-for="(word, index) in words"
          :key="index"
          class="city-list-main-items">
        <div v-if="word === '热门'">
          <p class="title-word">热门城市</p>
          <ul class="city-list">
            <li v-for="(item, itemiIndex) in cityList[word]"
                :key="itemiIndex"
                @click="selectCity(item)"
                class="city-item">
              <span>{{item.cname}}</span>
            </li>
          </ul>
        </div>

        <div v-else>
          <p class="city-list-main-word" @click="showCities(word)" :style="{height: `${wordTitleHeight}px`}">{{word}}</p>
          <p v-for="(item, itemIndex) in cityList[word]"
            :key="itemIndex"
            @click="selectCity(item)"
            class="city-list-main-item">
            <span>{{ item.cname }}</span>
            <span class="city-list-main-item-abbr">{{ item.short }}</span>
          </p>
        </div>
      </li>
    </ul>

    <ul class="city-list-rapid-select-bar" v-if="!search" :ref="rapidSelectBarRef">
      <!-- :class="{fastSelActive: index === curCityListIndex}" -->
      <li class="rapid-sel-item"
          v-for="(word, index) in words"
          :key="index"
          @touchstart="onRapidTouchStart($event, index)"
          @touchmove.stop.prevent="onRapidTouchMove"
          @touchend="onRapidTouchEnd($event, index)">
          {{ word }}
      </li>
    </ul>

    <div v-if="touched" class="city-list-touched-word">{{ curWord }}</div>
  </b-scroll>
</template>

<script>
import BScroll from '@/components/better-scroll'
import { getCityList } from '@/api'

export default {

  components: {
    BScroll
  },

  props: {
    search: {
      type: String,
      default: ''
    },
    hotCityObj: {
      type: Object
    },
    category: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      listPos: [],
      rapidSelectSize: {},
      touched: false,
      curWord: '热门',
      cityList: Object.assign({}, this.hotCityObj),
      words: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      wordTitleHeight: 40,
      scrollRef: `scroll`,
      cityListMainRef: `city-list-main`,
      rapidSelectBarRef: `rapid-select-bar`
    }
  },

  computed: {
    historyCities () {
      const list = this.$store.getters.historyCities[this.category] || []
      console.log('historyCities list: ', list)
      return list
    }
  },
  mounted () {
    this.calculateHeight()
  },
  activated () {
    this.$refs[this.scrollRef].scrollTo(0, 0)
  },
  methods: {
    calculateHeight () {
      this.$nextTick(() => {
        const cityList = this.$refs[this.cityListMainRef].children
        for (let item of cityList) {
          this.listPos.push(item.offsetTop)
        }
        const rapidSelectBar = this.$refs[this.rapidSelectBarRef]
        if (!rapidSelectBar) {
          return
        }
        const rapidSelectList = rapidSelectBar.children
        this.rapidSelectSize = {
          offsetTop: rapidSelectBar.offsetTop,
          itemOffsetHeight: rapidSelectList[0].offsetHeight
        }
      })
    },
    selectCity (item) {
      console.log('category: ', this.category, 'item: ', item)
      this.$store.commit('ADD_HISTORY_CITIES', { category: this.category, item })
      this.$emit('selected', item)
    },
    onRapidTouchStart (e, index) {
      this.$refs[this.scrollRef].scrollTo(0, -this.listPos[index])
      this.curWord = this.words[index]
      this.touched = true
    },
    onRapidTouchMove (e) {
      const curTouch = e.touches[0]
      const offsetHeight = curTouch.clientY - this.rapidSelectSize.offsetTop
      const index = parseInt(offsetHeight / this.rapidSelectSize.itemOffsetHeight)
      this.$refs[this.scrollRef].scrollTo(0, -this.listPos[index])
      this.curWord = this.words[index]
    },
    onRapidTouchEnd (e, index) {
      this.touched = false
      // 释放的时候做请求
      if (this.curWord !== '热门') {
        this.getCities(this.curWord)
      }
    },
    showCities (word) {
      this.getCities(word)
    },
    async getCities (word) {
      // 数据存在则不需要继续请求
      if (!this.cityList[word]) {
        let cities = await getCityList({ letter: word }, this.category)
        if (cities) {
          // this.cityList[word] = cities
          this.$set(this.cityList, word, cities)
        }
        this.calItemHeight(word)
      }

      this.$nextTick(() => {
        const index = this.words.indexOf(word)
        this.$refs[this.scrollRef].scrollTo(0, -this.listPos[index])
      })
    },
    calItemHeight (word) {
      let index = this.words.indexOf(word)

      this.$nextTick(() => {
        this.$refs[this.scrollRef].refresh()
        let addItemHeight = this.$refs[this.cityListMainRef].children[index].offsetHeight
        for (let i = index + 1; i < this.listPos.length; ++i) {
          this.listPos[i] += (addItemHeight - this.wordTitleHeight)
        }
      })
    },
    cityFilter (obj, cb) {
      let result = {}
      result.list = []
      for (let key in obj) {
        typeof cb === 'function' && cb(obj, key, result)
      }
      return result
    }
  }
}
</script>

<style lang="scss">
.city-list {
  position: relative;
  background: #fff;
  .title-word {
    padding: vw(8) $padding-aside;
    background: $city-picker-theme-color;
    color: $default-color;
  }
  &-history {
    background-color: $city-picker-theme-color;
  }
  .city-list {
    padding: vw(6) ($padding-aside + vw(25)) vw(10) $padding-aside ;
    background-color: $city-picker-theme-color;
  }

  .city-item {
    display: inline-block;
    box-sizing: border-box;
    border: vw(1) solid $line-color;
    border-radius: vw(4);
    margin: vw(6) vw(10) 0 0;
    width: vw(70);
    height: vw(30);
    line-height: vw(30);
    text-align: center;
    background-color: $white;
    @include text-overflow();
  }

  &-rapid-select-bar {
    position: fixed;
    // height: 100vh;
    right: vw(10);
    top: vw(100);
    text-align: center;
    color: $default-color;
    font-size: vw(13);
  }

  &-touched-word {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: vw(60);
    height: vw(60);
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(7, 17, 27, .6);
    color: #fff;
  }
}
</style>
