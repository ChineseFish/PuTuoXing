<template>
  <div class="travel-line-list-wrapper">
    <div v-for="(item, index) of travelLineList"
      :key="index"
      class="item"
      @click="toTravelLineItem(item)">
      <img :src="item.image" alt="">
      <div class="content">
        <p class="title">{{ item.title }}</p>
        <div class="labels-wrapper">
          <span class="label" v-for="(labelItem, labelIndex) of item.labels" :key="labelIndex">
            {{ labelItem.text }}
          </span>
        </div>
        <!-- <p class="desc">{{ item.desc }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'travelLineList'
    ])
  },
  methods: {
    toTravelLineItem (item) {
      if (item.routerPath) {
        this.$router.push((this.$route.path === '/' ? '' : this.$route.path) + item.routerPath)
      } else {
        this.$toast('该专线尚未开启，敬请期待')
      }
    }
  }
}
</script>

<style lang="scss">
.travel-line-list-wrapper {
  background-color: #fff;
  display: flex;
  .item {
    position: relative;
    width: 33.3vw;
    padding: 0 vw(10);
    padding-bottom: vw(20);
    overflow: hidden;
    display: flex;
    .labels-wrapper {
      position: absolute;
      top: vw(-5);
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: vw(8);
      .label {
        background-image: linear-gradient(137deg,#f55 0,#ff46b7 100%);
        color: #fff;
        padding: vw(1) vw(3);
      }
    }
    .content {
      position: absolute;
      background: white;
      bottom: vw(10);
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
      width: 22vw;
      height: vw(40);
      border-bottom-left-radius: vw(5);
      border-bottom-right-radius: vw(5);
      .title {
        font-size: vw(12);
        position: absolute;
        text-align: center;
        width: 22vw;
        color: #25125f;
        top: 50%;
        transform: translate3d(0, -50%, 0);
      }
    }
    // .labels-wrapper {
    //   margin-bottom: vw(2);
    //   .label {
    //     &:not(:first-child) {
    //       margin-left: vw(5);
    //     }
    //     font-size: vw(9);
    //     padding: vw(1) vw(3);
    //     border: vw(1) solid $default-color-orange;
    //     color: $default-color-orange;
    //     border-radius: vw(3);
    //   }
    // }
    // .desc {
    //   @extend %minor-font;
    // }
    img {
      border-top-left-radius: vw(5);
      border-top-right-radius: vw(5);
      // border-bottom-left-radius: vw(5);
      width: vw(150);
      height: vw(70);
    }
  }
}
</style>
