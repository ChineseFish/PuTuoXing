<template>
  <div class="ticket-form-item">
    <span class="ticket-form-item-city from-city" @click="toCityPicker('start')">
      <p v-if="!startCity" class="placeholder">{{ startPlaceholder }}</p>
      <p v-else>{{ startCity.cname }}</p>
    </span>
    <div class="ticket-form-item-icon" @click="swapCity">
      <i class="iconfont icon-jiaohuan"></i>
    </div>
    <span class="ticket-form-item-city to-city" @click="toCityPicker('end')">
      <p v-if="!endCity" class="placeholder">{{ endPlaceholder }}</p>
      <p v-else>{{ endCity.cname }}</p>
    </span>

    <popup-container :show.sync="isShow">
      <city-picker @selected="picked" :type="mode" :isDept="isDept"></city-picker>
    </popup-container>
  </div>
</template>

<script>
import CityPicker from '@/components/city-picker'
import PopupContainer from '@/components/layouts/popup-container'
import { mapGetters } from 'vuex'

export default {
  name: 'TicketFormCity',
  components: {
    CityPicker,
    PopupContainer
  },
  props: {
    mode: {
      type: String,
      default: 'plane'
    },
    startPlaceholder: {
      type: String,
      default: '出发地'
    },
    endPlaceholder: {
      type: String,
      default: '目的地'
    }
  },
  data () {
    return {
      isShow: false,
      type: '',
      isDept: 1
    }
  },
  computed: {
    ...mapGetters([
      'ticketFormData'
    ]),
    startCity () {
      return this.$parent.ticketFormData.start
    },
    endCity () {
      return this.$parent.ticketFormData.end
    }
  },
  mounted () {
  },
  methods: {
    toCityPicker (type) {
      this.type = type
      this.isShow = true
      if (type === 'start') {
        this.isDept = 1
      } else {
        this.isDept = 0
      }
    },
    picked (value) {
      console.log('picked!!!: ', this.mode, value)
      // planebus的时候在选择出发地的时候需要清除目的地
      if (this.mode === 'planebus' && this.isDept) {
        this.$set(this.$parent.ticketFormData, 'end', null)
      }
      this.$set(this.$parent.ticketFormData, this.type, value)
    },
    swapCity () {
      if (this.mode === 'planebus') {
        return
      }
      this.swaped(this.$parent.ticketFormData)
    },
    swaped (obj) {
      if (!obj.start || !obj.end) {
        return
      }

      const tmp = obj.start
      obj.start = obj.end
      obj.end = tmp
    }
  }
}
</script>

<style lang="scss">

</style>
