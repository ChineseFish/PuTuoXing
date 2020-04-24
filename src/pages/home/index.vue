<template>
  <div class="home-container">
    <template>
      <!-- <div class="home-swiper">
        <img src="../../assets/home.png" class="home-header-img">
      </div> -->
      <swiper :options="swiperOption" class="swiper-wrapper">
        <swiper-slide v-for="(item, index) of swiperImages['home']" :key="index">
          <img :src="item.src" class="home-header-img" :alt="item.alt" @click="navImageJump(item)">
          <!-- <img src="static/images/swiper1.jpg" class="home-header-img"> -->
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
      <section class="block-section">
        <div class="home-navs">
          <div class="home-navs-item" v-for="(item, index) in navItems" :key="index" @click="jumpTo(item)">
            <div class="home-navs-item-inner" :style="{ backgroundColor: item.color }">
              <i class="iconfont" :class="`icon-${item.icon}`"></i>
              <span class="label" v-if="item.label">{{ item.label }}</span>
            </div>
            <p>{{ item.title }}</p>
          </div>
        </div>
        <dynamic-notice-bar type="home" v-is-link></dynamic-notice-bar>
      </section>
      <!-- <section class="block-section">
        <div class="home-recommend-header">
          <div class="home-recommend-header-title">
            <i class="iconfont icon-haoping"></i>
            <span>好物推荐</span>
          </div>
          <div class="more">
            <span>查看更多</span>
            <i class="iconfont icon-forward"></i>
          </div>
        </div>
        <div class="home-recommend-content">
          <div class="home-recommend-item" v-for="(item, index) in recommendItems" :key="index" @click="jumpTo(item)">
            <img :src="item.image">
          </div>
        </div>
      </section> -->
      <travel-line-section></travel-line-section>
    </template>
  </div>
</template>

<script>
import HomePage from '@/components/layouts/main-page'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import TravelLineSection from '@/components/section/travel-line'
import { mapGetters } from 'vuex'

export default {
  components: {
    HomePage,
    swiper,
    swiperSlide,
    TravelLineSection
  },
  computed: {
    ...mapGetters([
      'swiperImages'
    ])
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        // slidesPerView: 1,
        autoplay: {
          delay: 4000
        }
        // loop: true
      },
      // swiperImages: [],
      navItems: [
        {
          icon: 'home-plane',
          title: '机票',
          isRouter: true,
          componentName: 'PlaneTicket',
          color: '#EFD47F'
        }, {
          icon: 'home-ship',
          title: '船票',
          // uri: 'http://m.ziubao.com/cpzxyd.htm',
          componentName: 'ShipTicketNav',
          color: '#E8997F'
        }, {
          icon: 'home-bus',
          title: '大巴票',
          isRouter: true,
          componentName: 'BusTicketIndex',
          color: '#A080EA'
        }, {
          icon: 'home-train',
          title: '火车票',
          isRouter: true,
          componentName: 'TrainTicket',
          color: '#D8F28D'
        // }, {
        //   icon: 'home-cart',
        //   title: '袋鼠商城',
        //   color: '#E98AB9'
        }, {
          icon: 'home-ticket',
          title: '景区门票',
          color: '#E98AB9',
          componentName: 'SceneryTicket',
          label: 'Hot'
        }, {
          icon: 'home-hotel',
          title: '民宿预订',
          color: '#9ED3F1',
          componentName: 'HomestayTicket',
          label: 'New'
        }, {
          icon: 'home-sailboat',
          title: '帆船运动',
          // componentName: 'SailboatTicket',
          routerPath: '/scenery/list?category=sailboat',
          color: '#7E9EF4',
          label: 'New'
        }, {
          icon: 'yanchu',
          title: '演出门票',
          componentName: 'ShowTicket',
          color: '#89E9DA',
          label: 'New'
        }
      ],
      recommendItems: [
        {
          image: 'static/images/1.png',
          uri: '',
          isRouter: true,
          componentName: 'Development'
        }, {
          image: 'static/images/2.png',
          uri: '',
          isRouter: true,
          componentName: 'Development'
        }, {
          image: 'static/images/3.png',
          uri: '',
          isRouter: true,
          componentName: 'Development'
        }, {
          image: 'static/images/4.png',
          uri: '',
          isRouter: true,
          componentName: 'Development'
        }
      ],
      noticeMessage: null
    }
  },
  mounted () {
    if (!this.swiperImages['home'] || this.swiperImages['home'].length === 0) {
      this.$store.dispatch('getSwiperImages', 'home')
    }
  },
  methods: {
    jumpTo (item) {
      const { uri, componentName, routerPath } = item
      if (uri) {
        window.location.href = item.uri
      } else if (componentName) {
        this.$router.push({ name: componentName })
      } else if (routerPath) {
        this.$router.push(routerPath)
      } else {
        this.$toast('该功能尚在开发中，敬请期待')
      }
    },
    navImageJump (item) {
      if (item.path) {
        this.$router.push({ path: item.path })
      } else if (item.link) {
        window.location.href = item.link
      }
    },
    onNotications () {
      // this.$router.push({ name: 'JhQa' })
      this.$router.push({ path: this.noticeMessage.path })
    }
  }
}
</script>

<style lang="scss">
.home {
  &-header-img {
    width: 100%;
    height: vw(200);
  }
  &-container {
    .more {
      display: flex;
      align-items: center;
      @extend %minor-font;
    }

    .swiper-wrapper {
      height: vw(200);
    }
  }

  &-navs {
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    // align-items: center;
    text-align: center;
    margin: 0 vw(-15);
    padding: vw(10) 0;
    background: #fff;
    &-item {
      flex: 0 0 25%;
      margin: vw(5) 0;
      &-inner {
        width: vw(54);
        height: vw(54);
        margin: vw(5) auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 50%;
        color: #fff;
        position: relative;
        .iconfont {
          font-size: vw(30);
        }

        .label {
          position: absolute;
          background: linear-gradient(to right,#f94242,#ffa25f);
          color: #fff;
          right: vw(-8);
          top: vw(-3);
          font-size: vw(9);
          padding: vw(0) vw(5);
          border-top-left-radius: vw(5);
          border-bottom-right-radius: vw(5);
        }
      }
    }
  }

  // &-notications {
  //   color: $default-color-orange;
  //   display: flex;
  //   align-items: center;
  //   padding-bottom: vw(5);
  //   .iconfont {
  //     margin-right: vw(10);
  //   }
  //   &-tips {
  //     padding: 0 vw(5);
  //     border: vw(1) solid $default-color-orange;
  //     font-size: vw(9);
  //     border-radius: vw(4);
  //     margin-right: vw(10);
  //   }
  //   &-title {
  //     @extend %minor-font;
  //   }
  // }

  &-recommend {
    &-header {
      display: flex;
      justify-content: space-between;

      &-title {
        color: $default-color-orange;
        display: flex;
        align-items: center;
      }
    }
    &-content {
      display: flex;
      flex-wrap: wrap;
      margin: 0 vw(-10);
    }
    &-item {
      flex: 0 0 50%;
      padding: vw(5);
    }
  }
}
</style>
