<template>
  <div class="travel-line-list-wrapper-3">
    <div v-for="(item, index) of travelLineList"
      :key="index"
      class="item"
      @click="toTravelLineItem(item)">
      <img :src="item.image" alt="">
      <div class="content">
        <p class="title">{{ item.title }}</p>
        <p class="desc">{{ item.desc }}</p>
      </div>
      <div class="labels-wrapper">
        <span class="label" v-for="(labelItem, labelIndex) of item.labels" :key="labelIndex">
          {{ labelItem.text }}
        </span>
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
.travel-line-list-wrapper-3 {
  background-color: #fff;
  display: flex;
  padding: 0 vw(5);
  .item {
    position: relative;
    width: calc(33.3vw - #{vw(10 / 3)});
    padding: 0 vw(5);
    padding-bottom: vw(20);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .labels-wrapper {
      position: absolute;
      top: vw(5);
      left: vw(3);
      font-size: vw(8);
      .label {
        background-image: linear-gradient(137deg,#f55 0,#ff46b7 100%);
        color: #fff;
        padding: vw(1) vw(3);
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: vw(13);
        text-align: center;
        // color: #25125f;
        font-weight: 500;
        line-height: 2;
      }
      .desc {
        font-size: vw(10);
        text-align: center;
        color: $minor-color;
        @include text-overflow(2);
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
      width: 100%;
      height: vw(70);
    }
  }
}
</style>
