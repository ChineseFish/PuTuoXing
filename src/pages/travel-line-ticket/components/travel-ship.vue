<template>
  <ticket-form @commit="commit" :type="type" :canWebBuyDays="canWebBuyDays" isTripType>
    <ticket-form-trip slot="city" :tripList="travelLineTrips[$route.params.type].ship"></ticket-form-trip>
    <icon-btn type="order" slot="bottom-btn"></icon-btn>
    <icon-btn type="tel" slot="bottom-btn"></icon-btn>
    <icon-btn type="feedback" slot="bottom-btn"></icon-btn>
    <icon-btn type="home" slot="bottom-btn"></icon-btn>
  </ticket-form>
</template>

<script>
import TicketForm from '@/components/form/ticket-form'
import TicketFormTrip from '@/components/form/ticket-form-trip'
import { mapGetters } from 'vuex'
export default {
  components: {
    TicketForm,
    TicketFormTrip
  },

  computed: {
    type () {
      return `travel-line-ship-${this.$route.params.type}`
    },
    canWebBuyDays () {
      if (this.$route.params.type === 'thd') {
        return 3
      }
      return 4
    },
    ...mapGetters([
      'travelLineTrips',
      'wxUserInfo'
    ])
  },

  data () {
    return {
    }
  },

  methods: {
    commit (formData) {
      console.log(formData)
      if (formData.trip.url) {
        window.location.href = formData.trip.url
      } else if (formData.trip.href) {
        window.location.href = `${formData.trip.href}&date=${formData.dateTime}&unionid=${this.wxUserInfo.unionid || ''}`
      } else {
        this.$store.commit('SET_QUERY_DATE', formData.dateTime)
        this.$router.push({
          path: `${this.$route.params.type}/ship-list`,
          query: {
            tripId: formData.trip.id,
            travelName: formData.trip.name,
            type: this.type,
            time: this.$store.getters.queryDate,
            fromType: formData.trip.type
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
