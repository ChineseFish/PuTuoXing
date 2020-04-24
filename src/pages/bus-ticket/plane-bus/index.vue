<template>
  <div class="plane-bus-container">
    <ticket-form @commit="commit" type="planebus" :canWebBuyDays="11">
      <!-- <ticket-form-plane-bus-trip slot="city"
        :tripList="trips">
      </ticket-form-plane-bus-trip> -->
      <ticket-form-city slot="city" mode="planebus"></ticket-form-city>
      <icon-btn type="order" slot="bottom-btn"></icon-btn>
      <icon-btn type="tel" slot="bottom-btn"></icon-btn>
      <icon-btn type="feedback" slot="bottom-btn"></icon-btn>
      <icon-btn type="home" slot="bottom-btn"></icon-btn>
    </ticket-form>
  </div>
</template>

<script>
import TicketForm from '@/components/form/ticket-form'
import TicketFormPlaneBusTrip from '@/components/form/ticket-form-trip'
import TicketFormCity from '@/components/form/ticket-form-city'

export default {
  components: {
    TicketForm,
    TicketFormPlaneBusTrip,
    TicketFormCity
  },
  data () {
    return {
      // 机场大巴线路写死
      trips: [{
        title: '宁波栎社机场',
        tips: '机场',
        data: [{
          id: 9993,
          name: '定海盐仓站 - 宁波机场'
        }, {
          id: 9996,
          name: '新城客运站 - 宁波机场'
        }, {
          id: 9994,
          name: '普陀客运站 - 宁波机场'
        }, {
          id: 9995,
          name: '朱家尖 - 宁波机场'
        }, {
          id: 10010,
          name: '宁波机场 - 舟山',
          tipMessage: '返程仅可查'
        }]
      }, {
        title: '杭州萧山机场',
        tips: '机场',
        data: [{
          id: 20003,
          name: '定海盐仓站 - 杭州萧山机场'
        }, {
          id: 20002,
          name: '新城客运站 - 杭州萧山机场'
        }, {
          id: 20001,
          name: '普陀客运站 - 杭州萧山机场'
        }, {
          id: 20010,
          name: '杭州萧山机场 - 舟山',
          isBack: true,
          canWebBuyDays: 1
        }]
      }, {
        title: '上海浦东机场',
        tips: '机场',
        data: [{
          id: 30003,
          name: '定海盐仓站 - 上海浦东机场'
        }, {
          id: 30002,
          name: '新城客运站 - 上海浦东机场'
        }, {
          id: 30001,
          name: '普陀客运站 - 上海浦东机场'
        }, {
          id: 30010,
          name: '上海浦东机场 - 舟山',
          isBack: true
        }]
      }]
    }
  },
  methods: {
    commit (formData) {
      console.log('commit formData:', formData)
      this.$router.push({
        path: 'bus-ticket/plane-bus-list',
        query: {
          // tripName: formData.trip.name,
          // tripId: formData.trip.id,
          // time: formData.dateTime
          from: formData.start.cname,
          to: formData.end.cname,
          time: formData.dateTime
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
