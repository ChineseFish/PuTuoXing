<template>
  <div class="payment-recommend-wrapper">
    <div class="title">更多推荐</div>
    <div class="commend-list">
      <div v-for="(item, index) of commendList" :key="index" class="commend-item" @click="onItem(item)">
        <i class="iconfont" :class="item.icon" v-if="item.icon"></i>
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    type: String
  },
  data () {
    return {
      commendList: [
        {
          title: '预订大巴票',
          icon: 'icon-home-bus',
          path: '/bus-ticket'
        }, {
          title: '预订机票',
          icon: 'icon-home-plane',
          path: '/plane-ticket'
        }, {
          title: '预订火车票',
          icon: 'icon-home-train',
          path: '/train-ticket'
        }
      ]
    }
  },
  methods: {
    onItem (item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="scss">
.payment-recommend-wrapper {
  background-color: #fff;
  margin: vw(10);
  border-radius: vw(5);
  overflow: hidden;
  .title {
    background-image: linear-gradient(137deg, $default-color 0, #99aaff 100%);
    color: #fff;
    padding: vw(5) vw(10);
    // padding: 0 vw(10);
    // color: $default-color-orange;
    // margin-bottom: vw(10);
  }

  .commend-list {
    display: flex;
    justify-content: space-around;
    padding: vw(10) 0;
    .commend-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $default-color;
      font-size: vw(12);
      .iconfont {
        font-size: vw(26);
      }
    }
  }
}
</style>
