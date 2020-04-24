<template>
  <main-page back title="旅游专线列表">
    <!-- <template slot="scroll">
      <div class="travel-line-list">
        <div v-for="(item, index) of travelLineList"
          :key="index"
          class="item"
          @click="toTravelLineItem(item)">
          <img :src="item.image" alt="">
          <div class="content">
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </template> -->
    <travel-line-list slot="scroll"></travel-line-list>
  </main-page>
</template>

<script>
import { mapGetters } from 'vuex'
import TravelLineList from '@/components/section/travel-line-list'
export default {
  components: {
    TravelLineList
  },
  computed: {
    ...mapGetters([
      'travelLineList'
    ])
  },
  methods: {
    toTravelLineItem (item) {
      item.routerPath && this.$router.push(this.$route.path + item.routerPath)
      console.log(this.$route)
    }
  }
}
</script>

<style lang="scss">
.travel-line-list {
  padding-top: vw(15);
  .item {
    margin: 0 vw(15);
    overflow: hidden;
    display: flex;
    &:not(:last-child) {
      margin-bottom: vw(15);
    }
    .content {
      flex: 1;
      background-color: #fff;
      padding: vw(10);
    }
    .title {
      margin-bottom: vw(5);
      font-weight: 500;
    }
    .desc {
      @extend %minor-font;
    }
    img {
      border-top-left-radius: vw(10);
      border-bottom-left-radius: vw(10);
      width: vw(150);
      height: vw(90);
    }
  }
}
</style>
