<template>
  <ticket-form @commit="commit" type="luxbus" isTripType :canWebBuyDays="15">
    <ticket-form-trip slot="city" :tripList="trips"></ticket-form-trip>
    <icon-btn type="order" slot="bottom-btn"></icon-btn>
    <icon-btn type="tel" slot="bottom-btn"></icon-btn>
    <icon-btn type="feedback" slot="bottom-btn"></icon-btn>
    <icon-btn type="home" slot="bottom-btn"></icon-btn>
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
      trips: [{
        title: '单程',
        tips: '豪华',
        data: [{
          id: 6,
          name: '定海南站 - 上海黄浦旅游集散站'
        },
        {
          id: 601,
          name: '普陀客运站 - 上海黄浦旅游集散站'
        },
        {
          id: 5,
          name: '上海黄浦旅游集散站 - 舟山',
          tipMessage: '定海、新城、普陀'
        },
        {
          id: 17,
          name: '定海盐仓站 - 杭州吴山广场（杭州西站）'
        },
        {
          id: 1701,
          name: '新城客运站 - 杭州吴山广场（杭州西站）'
        },
        {
          id: 1702,
          name: '普陀客运站 - 杭州吴山广场（杭州西站）'
        },
        {
          id: 216,
          name: '杭州吴山广场 - 舟山',
          tipMessage: '定海、新城、普陀'
        }, {
          name: '杭州西站 - 舟山',
          tipMessage: '定海、新城、普陀',
          from: '杭州汽车西站',
          to: '舟山'
        }]
      }, {
        title: '往返',
        tips: '豪华',
        data: [{
          id: 7,
          name: '上海黄浦-普陀山（朱家尖） 二日往返'
        }, {
          id: 8,
          name: '上海黄浦-普陀山（朱家尖） 三日往返'
        }]
      }]
    }
  },
  methods: {
    commit (formData) {
      if (!formData.trip.id) {
        this.$router.push({
          path: 'bus-ticket/list',
          query: {
            from: formData.trip.from,
            to: formData.trip.to,
            time: formData.dateTime
          }
        })
      } else {
        this.$router.push({
          path: 'bus-ticket/luxury-bus-list',
          query: {
            tripName: formData.trip.name,
            tripId: formData.trip.id,
            time: formData.dateTime
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
