<template>
  <section class="block-section travel-line-section">
    <section-title title="旅游专线" icon="icon-travel-line" @toMore="toMoreTravelLine" moreText="更多专线"></section-title>
    <!-- <div class="travel-line-content">
      <div class="travel-line-item"
        v-for="(item, index) of travelLineList"
        :key="index"
        v-if="item.showHome"
        @click="toTravelLine(item)">
        <div class="image-wrapper">
          <img :src="item.image" />
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div> -->
    <travel-line-list class="travel-line-content"></travel-line-list>
  </section>
</template>

<script>
import SectionTitle from './section-title'
import TravelLineList from './travel-line-list-3'
import { mapGetters } from 'vuex'

export default {
  components: {
    SectionTitle,
    TravelLineList
  },
  computed: {
    ...mapGetters([
      'travelLineList'
    ])
  },
  methods: {
    toMoreTravelLine () {
      console.log('toMoreTravelLine')
      console.log(this.$route)
      this.$router.push(`${this.$route.path === '/' ? '' : this.$route.path}/travel-line-list`)
    },
    toTravelLine (item) {
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
.travel-line {
  &-content {
    display: flex;
    flex-wrap: wrap;
    margin-left: -$padding-aside;
    margin-right: -$padding-aside;
  }

  &-item {
    width: 50%;
    padding-right: vw(10);
    padding-bottom: vw(10);
    // .image-wrapper {
    //   overflow: hidden;
    //   border-radius: 5px;
    //   position: relative;

    //   img {
    //     filter: hue-rotate(340deg) contrast(0.7) saturate(3.8) sepia(.6);
    //     width: 100%;
    //   }

    //   .title {
    //     background-color: rgba(103, 226, 248, 0.7);
    //     background: linear-gradient(rgba(103, 226, 248, 0.7), rgba(105, 156, 208, 0.7));
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate3d(-50%, -50%, 0);
    //     color: #fff;
    //     // background: rgba(7, 17, 27, .7);
    //     padding: vw(3) vw(15);
    //     border-radius: vw(5);
    //     white-space: nowrap;
    //     font-size: vw(16);
    //     text-decoration: underline;
    //   }
    // }
    // &:nth-child(2n) {
    //   margin-right: vw(-10);
    // }
  }
}
</style>
