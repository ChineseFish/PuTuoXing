<template>
  <main-page class="plane-ticket-container" title="机票" noHeader>
    <!-- <span slot="header-right" @click="toLoginView">登录</span> -->
    <template slot="scroll">
      <l-header-image type="plane" back></l-header-image>
      <section class="plane-ticket-form-section">
        <ticket-form @commit="commit" type="plane" :canWebBuyDays="30">
          <ticket-form-city slot="city" type="plane"></ticket-form-city>
          <icon-btn type="order" slot="bottom-btn"></icon-btn>
          <icon-btn type="tel" slot="bottom-btn"></icon-btn>
          <icon-btn type="feedback" slot="bottom-btn"></icon-btn>
          <icon-btn type="home" slot="bottom-btn"></icon-btn>
        </ticket-form>
      </section>

      <!-- <section class="plane-ticket-slogan-section">
        <span class="">自游宝 | 自游出行宝</span>
      </section> -->
    </template>

    <!-- <section class="plane-ticket-like-section">
      <div class="like-header">
        <i class="iconfont icon-xihuan-xianxing"></i>
        <span>猜你喜欢</span>
      </div>
      <div class="like-list">
        <div class="" v-for="item in lowPricePlaneTickets">

        </div>
      </div>
    </section> -->

    <!-- <goto-old-btn type="Plane" class="plane-ticket-goto-old"></goto-old-btn> -->

  </main-page>
</template>

<script>
import TicketForm from '@/components/form/ticket-form'
import TicketFormCity from '@/components/form/ticket-form-city'

export default {
  components: {
    TicketForm,
    TicketFormCity
  },

  data () {
    return {
      lowPricePlaneTickets: [

      ]
    }
  },

  methods: {
    commit (formData) {
      // 跳转
      this.$router.push({
        name: 'PlaneTicketList',
        query: {
          from: formData.start.code,
          to: formData.end.code,
          time: formData.dateTime,
          category: (formData.start.category === 2 || formData.end.category === 2) ? 2 : 1
        }
      })
    },
    toLoginView () {
      this.$store.commit('SHOW_LOGIN')
    }
  }
}
</script>

<style lang="scss">
.plane-ticket {
  &-container {
  }
  &-form-section {
    margin: vw(5);
    .ticket-form {
      border-radius: 5px;
    }
  }
  &-form-bottom {
    padding: vw(10) 0;
  }
  &-slogan-section {
    text-align: center;
    @extend %minor-font;
  }
  &-like-section {
    padding: vw(10) 0;
    .like-header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
