<template>
  <main-page noHeader class="ship-ticket-nav-wrapper">
    <template slot="scroll">
      <l-header-image type="ship" back></l-header-image>
      <section class="ship-ticket-nav block-section">
        <div class="ship-ticket-nav-item"
          v-for="(item, index) of navList"
          :key="index"
          @click="toShipTicket(item)">
          <div class="icon" :style="{ backgroundColor: item.iconColor }">
            <!-- <span class="icon-text">{{ item.iconText }}</span> -->
            <img :src="item.image" />
          </div>
          <span>{{ item.title }}</span>
        </div>
      </section>
      <travel-line-section></travel-line-section>
    </template>

    <l-dialog :show.sync="showDialog" preventClose>
      <!-- <img src="../../assets/loading.svg"> -->
      <div class="dialog-msg">正在接入舟山市水上客运官方平台...</div>
    </l-dialog>
  </main-page>
</template>

<script>
import TravelLineSection from '@/components/section/travel-line'
export default {
  components: {
    TravelLineSection
  },
  data () {
    return {
      navList: [{
        title: '舟山群岛',
        iconText: '舟',
        iconColor: '#E8D489',
        image: 'static/images/ship-zs.png',
        type: 'zs'
      }, {
        title: '宁波',
        iconText: '宁',
        iconColor: '#DB9C84',
        image: 'static/images/ship-nb.png',
        type: 'nb',
        isDeveloping: true
      }, {
        title: '温州',
        iconText: '温',
        iconColor: '#9B81E1',
        image: 'static/images/ship-wz.png',
        type: 'wz',
        url: 'http://ceshi.zjsajgw.com/ '
      }, {
        title: '台州',
        iconText: '台',
        iconColor: '#DBF099',
        image: 'static/images/ship-tz.png',
        type: 'tz',
        isDeveloping: true
      }],
      showDialog: false
    }
  },

  methods: {
    toShipTicket (item) {
      if (item.isDeveloping) {
        this.$toast('该功能尚在开发中，敬请期待')
      } else if (item.type === 'zs') {
        this.showDialog = true
        // this.$loading('正在接入官方平台...')
        setTimeout(() => {
          this.showDialog = false
          // this.$loading.close()
          this.$router.push({ name: 'ShipTicketIndex', params: { area: item.type } })
        }, 1000)
      } else if (item.url) {
        window.location.href = item.url
      } else {
        this.$router.push({ name: 'ShipTicketIndex', params: { area: item.type } })
      }
    }
  }
}
</script>

<style lang="scss">
.ship-ticket-nav {
  padding: vw(20) vw(10);
  display: flex;
  justify-content: space-around;
  background-color: #fff;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      flex: 1;
      color: #fff;
      width: vw(54);
      height: vw(54);
      border-radius: 50%;
      margin-bottom: vw(5);
      position: relative;
      &-text {
        font-size: vw(25);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        backface-visibility: hidden;
        perspective: 1000;
      }
    }
  }

  &-wrapper {
    .dialog-msg {
      text-align: center;
      font-weight: 400;
      font-size: vw(16);
    }
  }
}
</style>
