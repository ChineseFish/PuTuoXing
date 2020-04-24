<template>
  <main-page noHeader ref="indexMain" class="index-container">
    <template slot="scroll">
      <swiper>
        <swiper-slide>
          <img src="static/images/xpt/scroll_3.png" class="home-header-img" />
        </swiper-slide>
      </swiper>

      <section class="block-section">
        <div class="icon-list-wrapper">
          <div class="icon-item" v-for="(item, index) of iconList" :key="index" @click="onItem(item)">
            <img :src="item.image" />
            <div>{{ item.title }}</div>
          </div>
        </div>
      </section>
      <section class="block-section">
        <a href="http://m.zsptxtky.com/bus.htm">
          <img src="static/images/xpt/buspt.jpg" />
        </a>
      </section>
      <section class="block-section">
        <div class="section-title">出行套餐</div>
        <div class="images-wrapper">
          <img src="static/images/xpt/11.png" />
          <img src="static/images/xpt/12.png" />
          <img src="static/images/xpt/13.png" />
          <img src="static/images/xpt/14.png" />
        </div>
      </section>

      <div class="icp-wrapper">
        <a href="http://beian.miit.gov.cn">浙ICP备18006025号</a>
      </div>
    </template>
  </main-page>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"
import Vue from 'vue'

export default {
  components: {
    swiper,
    swiperSlide
  },
  computed: {},
  data () {
    return {
      iconList: [
        {
          image: 'static/images/xpt/1.png',
          title: '船票',
          path: '/ship-ticket/zs'
        }, {
          image: 'static/images/xpt/2.png',
          title: '飞机票',
          // href: 'http://xpt.ziubao.com/#/plane-ticket'
        }, {
          image: 'static/images/xpt/3.png',
          title: '火车票',
          // href: 'http://xpt.ziubao.com/#/train-ticket'

        }, {
          image: 'static/images/xpt/4.png',
          title: '大巴票',
          // href: 'http://xpt.ziubao.com/#/bus-ticket'

        }, {
          image: 'static/images/xpt/5.png',
          title: '导游',
          // href: 'http://m.zsptxtky.com:9999/mobile/cicerone_show.aspx?id=14'

        }, {
          image: 'static/images/xpt/6.png',
          title: '景点门票',
          // href: 'http://xpt.ziubao.com/#/scenery'

        }, {
          image: 'static/images/xpt/7.png',
          title: '民宿',
          // href: 'http://xpt.ziubao.com/#/homestay'

        }, {
          image: 'static/images/xpt/8.png',
          title: '旅行指南',
          // href: 'http://m.ziubao.com/dongtai.htm'

        }, {
          image: 'static/images/xpt/9.png',
          title: '订餐',
          // href: 'http://xpt.ziubao.com/#/reservation'

        }, {
          image: 'static/images/xpt/10.png',
          title: '商城',
          // href: 'http://shop.ziubao.com'

        }
      ]
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onItem (item) {
      if (item.href) {
        window.location.href = item.href
      } else if (item.path) {
        this.$router.push({ path: item.path })
      } else {
        Vue.prototype.$toast('对不起，功能还未开放');
      }
    }
  }
}
</script>

<style lang="scss">
.index-container {
  .icon-list-wrapper {
    padding: vw(10) 0;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;

    .icon-item {
      width: 20%;
      // margin: 0 vw(6);
      padding-bottom: vw(10);
      text-align: center;
    }

    img {
      width: vw(50);
      height: vw(50);
      margin-bottom: vw(5);
    }
  }

  .section-title {
    position: relative;
    text-indent: vw(10);
    margin: vw(10) 0;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      background-color: #56bbcb;
      width: vw(3);
    }
  }

  .images-wrapper {
    display: flex;
    flex-wrap: wrap;
    &>img {
      height: vw(100);
    }
    &>:nth-child(1) {
      width: 33.3%;
    }
    &>:nth-child(2) {
      width: 66.6%;
    }
    &>:nth-child(3) {
      width: 66.6%;
    }
    &>:nth-child(4) {
      width: 33.3%;
    }
  }

  .icp-wrapper {
    text-align: center;
    font-weight: 500;
    a {
      color: #555;
    }
  }
}
</style>
