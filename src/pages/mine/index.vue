<template>
  <div class="mine-container">
    <div class="header">
      <span @click="toChangeUser" v-if="$store.getters.token" class="header-right-button">
        -切换账号-
      </span>
      <div class="header-content">
        <img class="image-area" :src="wxUserInfo.headimgurl" alt="" v-if="wxUserInfo.headimgurl && wxUserInfo.mobile">
        <div class="nickname" v-if="wxUserInfo.nickname && wxUserInfo.mobile">{{ wxUserInfo.nickname }}</div>
        <div class="nickname">{{ '- 欢迎使用自游宝预订 -' }}</div>
      </div>
    </div>

    <div class="content">
      <div class="content-top">
        <div v-for="(item, index) of topList" :key="index" class="item" @click="toOrder(item)">
          <i class="iconfont" :class="item.icon" :style="{ color: item.iconColor }"></i>
          <span>{{ item.title }}</span>
        </div>
      </div>
      <l-list-item v-for="(item, index) of list"
        :key="index"
        :item="item"
        v-is-link
        class="item">
      </l-list-item>
    </div>

    <div class="bottom"></div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'wxUserInfo'
    ])
  },
  data () {
    return {
      list: [
        {
          icon: 'boat-left-to-right',
          iconColor: '#26a2ff',
          title: '船票订单',
          isLink: true,
          url: 'http://yds.ziubao.com/allOrders.jsp'
        }, {
        //   icon: 'dingdan',
        //   iconColor: '#E55B2D',
        //   title: '其他订单',
        //   isLink: true,
        //   componentName: 'OrderList'
        // }, {
          icon: 'ticket',
          iconColor: '#30C07A',
          title: '我的发票',
          componentName: 'OpenTicketList'
        }, {
          icon: 'telephone',
          iconColor: 'red',
          title: '绑定手机号',
          componentName: 'BindTelephone',
          isHide: !this.$store.getters.wxUserInfo.unionid
        }, {
          icon: 'shezhi-xianxing',
          iconColor: '#70C04A',
          title: '设置',
          componentName: 'MineSettings',
          method: () => {
            this.$store.commit('WXUSERINFO_CLEAN')
          }
        }
      ],
      topList: [
        {
        //   title: '船票订单',
        //   icon: 'icon-boat-left-to-right',
        //   iconColor: '#26a2ff',
        //   type: 'boat',
        //   url: `http://yds.ziubao.com/allOrders.jsp`
        // }, {
          title: '大巴订单',
          icon: 'icon-home-bus',
          iconColor: 'rgb(160, 128, 234)',
          componentName: 'OrderList',
          type: 'bus'
        }, {
          title: '机票订单',
          icon: 'icon-home-plane',
          iconColor: 'rgb(239, 212, 127)',
          componentName: 'OrderList',
          type: 'plane'
        }, {
          title: '火车订单',
          icon: 'icon-home-train',
          iconColor: 'rgb(216, 242, 141)',
          componentName: 'OrderList',
          type: 'train'
        }, {
          title: '专线船票订单',
          icon: 'icon-travel-line',
          iconColor: '#ff7d13',
          componentName: 'OrderList',
          type: 'ship'
        }, {
          title: '门票订单',
          icon: 'icon-home-ticket',
          iconColor: 'rgb(233, 138, 185)',
          componentName: 'OrderList',
          type: 'scenery'
        }, {
          title: '民宿订单',
          icon: 'icon-home-hotel',
          iconColor: 'rgb(158, 211, 241)',
          componentName: 'OrderList',
          type: 'homestay'
        }
      ]
    }
  },
  methods: {
    toOrder (item) {
      console.log('this.wxUserInfo.mobile: ', this.wxUserInfo)
      if (this.wxUserInfo.unionid && !this.wxUserInfo.mobile) {
        this.$router.push({ name: 'BindTelephone' })
      } else if (item.type === 'boat') {
        location.href = `${item.url}?unionid=${this.$store.getters.wxUserInfo.unionid || ''}`
      } else if (item.componentName) {
        this.$router.push({ name: item.componentName, query: { type: item.type } })
      }
    },
    toChangeUser () {
      this.$store.commit('SHOW_LOGIN')
    }
  }
}
</script>

<style lang="scss">
.mine-container {
  .header {
    position: relative;
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: vw(30) 0 vw(50);
      background-color: $default-color;

      .image-area {
        width: vw(100);
        height: vw(100);
        background-color: #eee;
        border-radius: vw(25);
        border: vw(1) solid #eee;
      }

      .nickname {
        line-height: 3;
        color: #fff;
      }
    }

    &-right-button {
      position: absolute;
      right: vw(10);
      top: vw(10);
      color: #fff;
      font-size: vw(12);
    }
  }

  .content {
    position: relative;
    margin: vw(-30) vw(30);
    background-color: #fff;
    border-radius: vw(5);
    box-shadow: vw(5) vw(5) vw(5) #789;

    &>:not(:last-child) {
      border-bottom: vw(1) solid #eee;
    }

    &>.item {
      padding-left: vw(10);
    }

    .content-top {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 0 vw(20);
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33%;
        padding: vw(10) 0;
        .iconfont {
          font-size: vw(20);
        }
        span {
          font-size: vw(12);
        }
      }
    }
  }
  .bottom {
    height: vw(50);
  }
}
</style>
