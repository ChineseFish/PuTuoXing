<template>
  <main-page noHeader class="bus-ticket-container">
    <template slot="scroll">
      <l-header-image type="bus" back></l-header-image>
      <dynamic-notice-bar type="bus"></dynamic-notice-bar>
      <index-nav-wrapper :navItems="navItems" :defaultSelected="0"></index-nav-wrapper>
    </template>
  </main-page>
</template>

<script>
import IndexNavWrapper from '@/components/layouts/index-nav-wrapper'
import Bus from '@/pages/bus-ticket/bus'
import PlaneBus from '@/pages/bus-ticket/plane-bus'
import LuxuryBus from '@/pages/bus-ticket/luxury-bus'
import BaoBus from '@/pages/bus-ticket/bao-bus'

export default {
  components: {
    IndexNavWrapper,
    Bus,
    PlaneBus,
    LuxuryBus,
    BaoBus
  },

  data () {
    return {
      navItems: [
        { title: '国内大巴', component: Bus },
        { title: '机场大巴', component: PlaneBus },
        { title: '上海杭州专线', component: LuxuryBus }
      ]
    }
  },
  methods: {
    toShowBookNotice () {
      this.$store.dispatch('showBookTicketNotice', 'bus')
    }
  }
}
</script>

<style lang="scss">
$tab-h: vw(40);
.bus-ticket-container {
  .bus-ticket {
    &-header-buttons {
      position: absolute;
      display: flex;
      top: vw(10);
      &>:not(:last-child) {
        margin-right: vw(10);
      }
      .iconfont {
        font-size: vw(20);
        color: #fff;
      }

      &.right {
        right: vw(10);
      }

      &.left {
        left: vw(10);
      }
    }
    &-header-img {
      width: 100%;
      height: vw(170);
    }
    &-notice {
      text-align: center;
      padding: vw(5);
      font-size: vw(12);
    }
  }
}
</style>
