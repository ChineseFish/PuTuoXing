<template>
  <main-page back title="订单查询"
    class="order-list-container"
    :pullDownRefresh="pullDownRefresh"
    :data="list"
    :isLoading="!loaded"
    noMatchText="暂无订单数据">
    <!-- <span slot="header-right" @click="toChangeUser">
      {{ $store.getters.token ? '切换账号' : '登录' }}
    </span> -->
    <l-tab v-model="selected">
      <l-tab-item v-for="(item, index) in tabItems" :key="index">
        <span>{{ item.title }}</span>
      </l-tab-item>
    </l-tab>

    <template slot="scroll">
      <div class="order-list-content">
        <template v-for="item of list">
          <order-common-item :data="item"
            :key="item.__ob__.dep.id"
            :type="type"
            @cancelItem="handleCancel"
            @deleteItem="handleDelete"></order-common-item>
        </template>
      </div>
    </template>
  </main-page>
</template>

<script>
import { LTab, LTabItem } from '@/components/tab'
import OrderCommonItem from './components/order-common-item'
import { queryOrderList } from '@/api'

export default {
  components: {
    LTab,
    LTabItem,
    OrderCommonItem
  },
  computed: {
    type () {
      return this.tabItems[this.selected].type
    },
    list () {
      return this.tabItems[this.selected].list
    }
  },
  data () {
    return {
      selected: 0,
      tabItems: [
        {
          title: '大巴票',
          type: 'bus',
          list: []
        },
        { title: '船票', type: 'boat', url: `http://yds.ziubao.com/allOrders.jsp?unionid=${this.$store.getters.wxUserInfo.unionid}` },
        { title: '飞机票', type: 'plane', list: [] },
        { title: '火车票', type: 'train', list: [] },
        { title: '专线-船票', type: 'ship', list: [] },
        { title: '门票', type: 'scenery', list: [] },
        { title: '民宿', type: 'homestay', list: [] }
      ],
      pullDownRefresh: {
        threshold: 50,
        stop: 20
      },
      loaded: false
    }
  },
  watch: {
    // 切换的时候获取数据
    selected (newVal) {
      if (this.tabItems[newVal].url) {
        console.log(this.tabItems[newVal].url)
        location.href = this.tabItems[newVal].url
      } else {
        this.getOrderList()
      }
    }
  },
  created () {
    console.log('this.$router.query: ', this.$route.query, this.tabItems)
    this.reorderTabItems()
  },
  mounted () {
    const { type } = this.$route.query
    if (type) {
      for (let index = 0; index < this.tabItems.length; ++index) {
        let item = this.tabItems[index]
        if (item.type === type) {
          this.selected = index
        }
      }
    }
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const params = {
        type: this.tabItems[this.selected].type
      }
      this.loaded = false
      let res = await queryOrderList(params)
      this.tabItems[this.selected].list = res

      setTimeout(() => {
        this.loaded = true
      }, 500)
    },
    toChangeUser () {
      this.$store.commit('SHOW_LOGIN', {
        success: () => {
          this.getOrderList()
        }
      })
    },
    handleCancel (item) {
    },
    handleDelete (item) {
      // let list = this.tabItems[this.selected].list
      let deleteIndex = this.list.indexOf(item)
      if (deleteIndex > -1) {
        this.tabItems[this.selected].list = this.list.filter((value, index) => {
          return index !== deleteIndex
        })
      }
    },
    reorderTabItems () {
      let type = this.$route.query.type
      let item = null
      let itemIndex = 0
      this.tabItems.forEach((value, index) => {
        if (value.type === type) {
          item = value
          itemIndex = index
        }
      })

      if (item) {
        this.tabItems.splice(itemIndex, 1)
        this.tabItems.unshift(item)
      }
    }
  }
}
</script>

<style lang="scss">
.order-list {
  &-container {
  }

  &-content {
    padding-bottom: vw(10);
    .order-bus-item {
      &-wrapper {
        background: white;
        margin: vw(10);
        padding: vw(10) $padding-aside;
        border-radius: vw(6);
      }

      &-content {
        display: flex;
        justify-content: space-between;
      }

      &-left {
        display: flex;
        flex-direction: column;
      }

      &-station {
        font-size: vw(16);
      }

      &-date {
        @extend %minor-font;
      }

      &-right {
        display: flex;
        flex-direction: column;
        text-align: right;
        .status-text {
          font-size: vw(12);
        }
      }

      &-btn-group {
      }
    }
  }
}
</style>
