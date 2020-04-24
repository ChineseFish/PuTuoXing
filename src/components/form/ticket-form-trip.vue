<template>
  <div class="ticket-form-item">
    <p class="ticket-form-item-city to" @click="toTripPicker" v-is-link>
      <span v-if="tripName">{{tripName}}</span>
      <span v-else class="placeholder">请选择行程</span>
    </p>
    <popup-container :show.sync="isShow" title="行程选择">
      <trip-picker v-model="isShow">
        <section v-for="(trip, index) in tripList" :key="index" class="trip-section">
          <div class="title">
            <span class="title-tips" v-if="trip.tips">{{ trip.tips }}</span>
            <span class="title-text">{{ trip.title }}</span>
          </div>
          <div v-for="(item, TripIndex) in trip.data"
            :key="TripIndex"
            @click="picked(item)"
            class="trip-item">
            <span class="name"> |-- {{ item.name }}</span>
            <span class="tip" v-if="item.isBack">返程</span>
            <span class="tip" v-if="item.tipMessage">{{ item.tipMessage }}</span>
            <span class="tip" v-if="item.canWebBuyDays">{{ item.canWebBuyDays === 1 ? '仅售当日' : `可售${item.canWebBuyDays}日内` }}</span>
          </div>
        </section>
      </trip-picker>
    </popup-container>
  </div>
</template>

<script>
import TripPicker from '@/components/trip-picker'
import TripItem from '@/components/trip-picker/trip-item'
import PopupContainer from '@/components/layouts/popup-container'

export default {
  name: 'TicketFormTrip',
  components: {
    TripPicker,
    TripItem,
    PopupContainer
  },
  props: {
    tripList: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isShow: false,
      tripName: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tripName = this.$parent.ticketFormData.trip ? this.$parent.ticketFormData.trip.name : ''
    })
  },
  methods: {
    toTripPicker () {
      this.isShow = true
    },
    picked (trip) {
      this.tripName = trip.name
      this.$set(this.$parent.ticketFormData, 'trip', trip)
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket-form-item {
  // position: relative;
  .trip-section {
    padding: vw(10);
    .title {
      display: flex;
      align-items: center;
      &-tips {
        font-size: vw(9);
        border: 1px solid $default-color-green;
        border-radius: vw(3);
        color: $default-color-green;
        padding: vw(1) vw(2);
        margin-right: vw(5);
      }

      &-text {
        color: $default-color;
        font-size: vw(16);
      }
    }

    .trip-item {
      padding: vw(8) vw(25);
      &:not(:last-child) {
        border-bottom: 1px solid $line-color;
      }
      font-size: vw(14);
      color: #555;
      display: flex;
      align-items: center;
      .name {
        margin-right: vw(5);
      }
      .tip {
        border: vw(1) solid $default-color;
        border-radius: vw(4);
        font-size: vw(10);
        color: $default-color;
        padding: vw(2) vw(4);
        margin-right: vw(5);
      }
    }
  }
}
</style>
