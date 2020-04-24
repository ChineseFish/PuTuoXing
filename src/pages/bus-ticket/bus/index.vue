<template>
  <ticket-form @commit="commit" type="bus" :canWebBuyDays="canWebBuyDays">
    <ticket-form-city slot="city" mode="bus" type="bus"></ticket-form-city>
    <icon-btn type="order" slot="bottom-btn"></icon-btn>
    <icon-btn type="tel" slot="bottom-btn"></icon-btn>
    <icon-btn type="feedback" slot="bottom-btn"></icon-btn>
    <icon-btn type="home" slot="bottom-btn"></icon-btn>
  </ticket-form>
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
      canWebBuyDays: 15
    }
  },
  methods: {
    commit (formData) {
      this.$router.push({
        path: `bus-ticket/list`,
        query: {
          from: formData.start.cname,
          to: formData.end.cname,
          time: formData.dateTime
        }
      })
    }
  }
}
</script>

<style>

</style>
