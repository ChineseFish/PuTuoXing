<template>
  <div class="ship-station-form-item-wrapper">
    <span class="ship-station-form-item-picker start">
      <div class="title">出发港选择</div>
      <div @click="toStationPicker('start')">
        <p v-if="!startStation" class="placeholder">{{ startPlaceholder }}</p>
        <p v-else>{{ startStation.cname }}</p>
      </div>
    </span>
    <div class="ship-station-form-item-icon" v-if="startStationId === '26'">
      <i class="iconfont icon-jiaohuan"></i>
    </div>
    <div class="ship-station-form-item-icon">
      <i class="iconfont icon-boat-left-to-right"></i>
    </div>
    <span class="ship-station-form-item-picker end">
      <div class="title">目的港选择</div>
      <div @click="toStationPicker('end')">
        <p v-if="!endStation" class="placeholder">{{ endPlaceholder }}</p>
        <p v-else>{{ endStation.cname }}</p>
      </div>
    </span>

    <popup-container :show.sync="isShow" appendToBody>
      <ship-station-picker @selected="picked" :isDept="isDept" @hide="hide"></ship-station-picker>
    </popup-container>
  </div>
</template>

<script>
import PopupContainer from '@/components/layouts/popup-container'
import ShipStationPicker from './ship-station-picker'

export default {
  name: 'ShipStationFormItem',
  components: {
    PopupContainer,
    ShipStationPicker
  },
  props: {
    startPlaceholder: {
      type: String,
      default: '出发港'
    },
    endPlaceholder: {
      type: String,
      default: '目的港'
    }
  },
  computed: {
    startStation () {
      return this.$parent.ticketFormData.start
    },
    endStation () {
      return this.$parent.ticketFormData.end
    },
    startStationId () {
      console.log('xxxx', this.$parent.ticketFormData.start)
      return this.startStation ? this.startStation.id : ''
    },
    endStationId () {
      return this.endStation ? this.endStation.id : ''
    }
  },
  data () {
    return {
      isShow: false,
      isDept: 1
    }
  },
  methods: {
    toStationPicker (type) {
      if (type === 'start') {
        this.isDept = 1
      } else {
        this.isDept = 0
      }
      this.isShow = true
    },
    picked (value) {
      this.isShow = false
      this.$set(this.$parent.ticketFormData, 'start', value.fromStation)
      this.$set(this.$parent.ticketFormData, 'end', value.toStation)
      this.$set(this.$parent.ticketFormData, 'url', value.baseUrl)
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss">
.ship-station-form-item {
  &-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: vw(10);
    position: relative;
  }
  &-picker {
    flex: 1;
    border-bottom: 1px solid #d7dbde;
    padding: vw(5) 0;
    &.start {
      margin-right: vw(35);
    }
    &.end {
      margin-left: vw(35);
      text-align: right;
    }
    .title {
      font-size: vw(12);
      margin-bottom: vw(-3);
      color: #aaa;
    }
  }
  &-icon {
    position: absolute;
    left: 50%;
    top: vw(10);
    transform: translate3d(-50%, 0, 0);
    .iconfont {
      font-size: vw(30);
      color: $default-color;
    }
  }
}
</style>
