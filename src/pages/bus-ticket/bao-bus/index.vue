<template>
  <ticket-form @commit="commit" type="baobus">
    <ticket-form-trip slot="city" :tripList="trips"></ticket-form-trip>
  </ticket-form>
</template>

<script>
import TicketForm from '@/components/form/ticket-form'
import TicketFormTrip from '@/components/form/ticket-form-trip'
export default {
  components: {
    TicketForm,
    TicketFormTrip
  },
  data () {
    return {
      trips: [
        {name: '舟山到宁波包车'},
        {name: '舟山到杭州包车'},
        {name: '舟山到上海包车'},
        {name: '宁波到舟山包车'},
        {name: '杭州到舟山包车'},
        {name: '上海到舟山包车'}
      ]
    }
  },
  methods: {
    commit (formData) {
      this.$router.push({
        name: 'BaoList',
        query: {
          trip: formData.trip,
          time: formData.dateTime
        }
      })
    }
  }
}
</script>

<style>

</style>
