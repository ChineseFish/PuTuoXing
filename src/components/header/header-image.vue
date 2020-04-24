<template>
  <header class="l-header-image-container">
    <img :src="imgSrc" class="l-header-image" v-if="imgSrc">
    <swiper :options="swiperOption" class="swiper-wrapper" v-else-if="images && images.length > 0">
      <swiper-slide v-for="(item, index) of images" :key="index">
        <img :src="item.src" class="home-header-img" :alt="item.alt" @click="navImageJump(item)">
      </swiper-slide>
    </swiper>
    <swiper :options="swiperOption" class="swiper-wrapper" v-else>
      <swiper-slide v-for="(item, index) of swiperImages" :key="index">
        <img :src="item.src" class="home-header-img" :alt="item.alt" @click="navImageJump(item)">
      </swiper-slide>
    </swiper>
    <div class="l-header-image-buttons left">
      <go-back-btn float v-if="back" class="l-header-image-button"></go-back-btn>
    </div>
    <div class="l-header-image-center">
      <slot name="center"></slot>
    </div>
    <div class="l-header-image-buttons right">
      <telephone-btn float v-if="telephone" class="l-header-image-button" :number="telephone || '0580-2266222'"></telephone-btn>
    </div>
    <div class="l-header-image-bottom-inner" v-if="$slots['image-bottom-inner']">
      <slot name="image-bottom-inner"></slot>
    </div>
  </header>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper, swiperSlide
  },
  props: {
    imgSrc: {
      type: String
    },
    back: {
      type: Boolean,
      default: false
    },
    telephone: {
      type: String
    },
    type: String,
    images: Array
  },

  computed: {
    swiperImages () {
      return this.type ? this.$store.getters.swiperImages[this.type] : []
    }
  },

  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 4000
        }
      }
    }
  },

  mounted () {
    this.getSwiperImages()
  },

  methods: {
    async getSwiperImages () {
      let swiperImages = ''
      if (this.type) {
        swiperImages = this.$store.getters.swiperImages[this.type]

        if (!swiperImages || swiperImages.length === 0) {
          await this.$store.dispatch('getSwiperImages', this.type)
        }
      }
    },
    navImageJump (item) {
      // 有path的情况下通过路由的方式跳转
      if (item.path) {
        this.$router.push({ path: item.path })
      } else if (item.link) {
        window.location.href = item.link
      }
    }
  }
}
</script>

<style lang="scss">
.l-header-image {
  &-container {
    display: flex;
    align-items: center;
    position: relative;
    max-height: 30vh;
    img {
      margin: 0 auto;
      width: 100%;
      height: auto;
      max-height: inherit;
    }
    .swiper-wrapper {
      min-height: vw(165);
    }
  }
  &-buttons {
    position: absolute;
    color: #fff;
    z-index: 10;
    &.left {
      left: 0;
      top: 0;
    }
    &.right {
      right: 0;
      top: 0;
    }
  }
  &-button {
    margin: vw(10);
  }
  &-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  &-bottom-inner {
    background-image: linear-gradient(-180deg,rgba(51,51,51,0.1) 0,rgba(51,51,51,.6) 100%);
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 $padding-aside;
    z-index: 1;
  }
}
</style>
