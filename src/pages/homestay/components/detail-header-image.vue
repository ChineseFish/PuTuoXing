<template>
  <div class="detail-header-image">
    <swiper :options="swiperOption" @click.native="onImage" class="swiper-wrapper" v-if="swiperImages.length > 0">
      <swiper-slide v-for="(image, index) of swiperImages" :key="index">
        <img :src="image" class="image">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <img :src="image" alt="" class="image" v-else>
    <!-- <div class="swiper-pagination"></div> -->

    <div class="more-images" @click="onImage" v-if="imageInfo.length > 0">- 查看多图 -</div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper, swiperSlide
  },
  props: {
    image: '',
    imageInfo: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    swiperImages () {
      let imageArr = []
      this.imageInfo.forEach((value, index) => {
        imageArr = imageArr.concat(value.images)
      })
      return imageArr
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      showMoreImages: false
    }
  },
  watch: {
    imageInfo (newVal) {
      console.log('imageInfo', newVal)
    }
  },
  methods: {
    onImage () {
      this.$store.commit('SET_HOMESTAY_IMAGES_INFO', this.imageInfo)
      this.$router.push({ path: '/homestay/more-images' })
    },
    onerror () {
      console.log('----------------error')
    }
  }
}
</script>

<style lang="scss">
.detail-header-image {
  position: relative;
  .swiper-wrapper {
    height: vw(260);
  }
  .image {
    width: 100vw;
    height: vw(260);
  }

  .more-images {
    position: absolute;
    bottom: vw(10);
    right: vw(10);
    background: rgba(7, 17, 27, 0.5);
    color: #fff;
    padding: vw(1) vw(8);
    border-radius: vw(8);
    font-size: vw(12);
    pointer-events: none;
    z-index: 100;
  }
}

.homestay-detail-images-title {
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: vw(10) 0 vw(5);
  .text {
    padding: vw(3) vw(15);
    border-radius: vw(10);
    background: linear-gradient(rgba(38, 122, 255, .85), rgba(18, 200, 255, .7));
    color: #fff;
  }
}
</style>
