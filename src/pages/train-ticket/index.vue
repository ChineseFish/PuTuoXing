<template>
  <main-page title="火车票" noHeader class="train-ticket-wrapper">
    <template slot="scroll">
      <l-header-image type="train" back></l-header-image>
      <section class="train-ticket-form-section">
        <ticket-form @commit="commit" type="train" :canWebBuyDays="30">
          <ticket-form-city slot="city" mode="train"></ticket-form-city>
          <icon-btn type="order" slot="bottom-btn"></icon-btn>
          <icon-btn type="tel" slot="bottom-btn"></icon-btn>
          <icon-btn type="feedback" slot="bottom-btn"></icon-btn>
          <icon-btn type="home" slot="bottom-btn"></icon-btn>
          <div class="tips-wrapper">
            <span class="text" @click="$router.push({ name: 'JhQa' })">- 龙支付常见问题 -</span>
          </div>
        </ticket-form>
      </section>
    </template>
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
  methods: {
    commit (formData) {
      this.$router.push({
        name: 'TrainTicketList',
        query: {
          from: formData.start.code,
          to: formData.end.code,
          time: formData.dateTime
        }
      })
    }
  }
}
</script>

<style lang="scss">
.train-ticket-wrapper {
  .tips-wrapper {
    text-align: center;
    .text {
      padding: vw(5) vw(10);
      font-size: vw(12);
      border-radius: vw(10);
      background-color: #e7e8e9;
      color: #333;
    }
  }
}
</style>
