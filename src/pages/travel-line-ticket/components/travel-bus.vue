<template>
  <ticket-form @commit="commit" :type="type" :canWebBuyDays="canWebBuyDays" isTripType>
    <ticket-form-trip slot="city" :tripList="travelLineTrips[$route.params.type].bus"></ticket-form-trip>
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
      return `travel-line-bus-${this.$route.params.type}`
    },
    canWebBuyDays () {
      return 7
    },
    ...mapGetters([
      'travelLineTrips'
    ])
  },

  data () {
    return {}
  },

  mounted () {
    console.log('travel-bus mounted: ', this.$route.params.type)
  },

  methods: {
    commit (formData) {
      console.log('formData: ', formData)
      this.$store.commit('SET_QUERY_DATE', formData.dateTime)
      if (!formData.trip) {
        return
      }
      if (formData.trip.componentPath) {
        this.$router.push({
          path: `${this.$route.params.type}/${formData.trip.componentPath}`,
          query: {
            tripName: formData.trip.name,
            tripId: formData.trip.id,
            type: this.type,
            time: formData.dateTime
          }
        })
      } else {
        this.$router.push({
          path: `${this.$route.params.type}/list`,
          query: {
            from: formData.trip.fromStationName,
            to: formData.trip.toStationName,
            time: formData.dateTime
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
