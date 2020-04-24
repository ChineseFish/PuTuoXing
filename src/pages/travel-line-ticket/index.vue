<template>
  <main-page noHeader class="travel-line-ticket-container">
    <template slot="scroll">
      <l-header-image :imgSrc="imgSrc" back></l-header-image>
      <index-nav-wrapper :navItems="navItems"></index-nav-wrapper>
      <!-- <div class="bottom">售票时间为: 6:00 - 23:00</div> -->
    </template>
  </main-page>
</template>

<script>
import IndexNavWrapper from '@/components/layouts/index-nav-wrapper'
import TravelShipTicket from './components/travel-ship'
import TravelBusTicket from './components/travel-bus'
import { mapGetters } from 'vuex'

export default {
  components: {
    IndexNavWrapper
  },

  computed: {
    ...mapGetters([
      'travelLineList'
    ]),
    type () {
      return this.$route.params.type || 'pts'
    },
    imgSrc () {
      for (let item of this.travelLineList) {
        if (item.type === this.type) {
          return item.image
        }
      }

      return ''
    }
  },

  data () {
    return {
      navItems: [
        { title: '船票', component: TravelShipTicket, options: {} },
        { title: '大巴', component: TravelBusTicket, options: {} },
        { title: '景区门票', path: '/scenery', componentName: 'SceneryTicket', query: { backMode: 'goBack' } },
        { title: '民宿', path: '/homestay', componentName: 'HomestayTicket' }
        // { title: '火车票', path: '/train-ticket', componentName: 'TrainTicket', query: { backMode: 'goBack' } },
        // { title: '飞机票', path: '/plane-ticket', componentName: 'PlaneTicket', query: { backMode: 'goBack' } }
      ]
    }
  },

  mounted () {
    console.log('route: ', this.$route)
  },

  methods: {
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'ship')
    }
  }
}
</script>

<style lang="scss">
.travel-line-ticket-container {
  .bottom {
    padding: vw(5);
    text-align: center;
    @extend %minor-font;
  }
}
</style>
