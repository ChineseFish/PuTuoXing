<template>
  <div class="travel-line-list-wrapper">
    <div v-for="(item, index) of travelLineList"
      :key="index"
      class="item"
      @click="toTravelLineItem(item)">
      <img :src="item.image" alt="">
      <div class="content">
        <div class="title-header">
          <p class="title">{{ item.title }}</p>
        </div>
        <div class="labels-wrapper">
          <span class="label" v-for="(labelItem, labelIndex) of item.labels" :key="labelIndex">
            {{ labelItem.text }}
          </span>
        </div>
        <p class="desc">{{ item.desc }}</p>
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
  flex-direction: column;
  .item {
    padding: vw(10) vw(5);
    margin: 0 vw(10);
    overflow: hidden;
    display: flex;
    &:not(:last-child) {
      // padding-bottom: vw(15);
      border-bottom: vw(1) solid $line-color;
    }
    .content {
      flex: 1;
      background-color: #fff;
      padding: 0 vw(10);
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      // &>*:not(:last-child) {
      //   margin-bottom: vw(2);
      // }
    }
    .title-header {
      display: flex;
      align-items: center;
      .title {
        font-weight: 500;
      }
    }
    .labels-wrapper {
      margin-bottom: vw(2);
      .label {
        &:not(:first-child) {
          margin-left: vw(5);
        }
        font-size: vw(9);
        padding: vw(1) vw(3);
        border: vw(1) solid $default-color-orange;
        color: $default-color-orange;
        border-radius: vw(3);
      }
    }
    .desc {
      @extend %minor-font;
    }
    img {
      border-top-left-radius: vw(15);
      border-top-right-radius: vw(5);
      border-bottom-left-radius: vw(5);
      width: vw(112);
      height: vw(70);
    }
  }
}
</style>
