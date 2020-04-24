<template>
  <div class="ship-station-area-list-item-wrapper" ref="listWrapper">
    <div class="ship-station-area-list-item"
      v-for="(item, index) of listKeys"
      :key="index">
      <div class="area">
        <div v-if="isDept"><span class="area-text">{{ item }}</span> 出发</div>
        <div v-else>前往 <span class="area-text">{{ item }}</span></div>
      </div>
      <div class="ship-station-area-list-child">
        <div v-for="(stationItem, stationIndex) of list[item].shipStation"
          :key="stationIndex" @click="picked(stationItem)"
          class="child-item">
          <span class="child-item-label" v-if="stationItem.toStation.id === 37">
            {{ stationItem.fromStation.cname }} < -- > {{ stationItem.toStation.cname }}
          </span>
          <span class="child-item-label" v-else>
            {{ stationItem.fromStation.cname }} --> {{ stationItem.toStation.cname }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listKeys: Array,
    list: Object,
    isDept: {
      type: Number,
      default: 1
    }
  },
  methods: {
    picked (value) {
      this.$emit('picked', value)
    }
  }
}
</script>

<style lang="scss">
.ship-station-area-list {
  &-item {
    &-wrapper {
      // padding-bottom: vw(5);
    }
    .area {
      background-color: #efefef;
      padding: vw(3) vw(10);
      font-size: vw(10);
      // border-bottom: 1px solid #ddd;
      color: #777;
      &-text {
        font-size: vw(14);
        font-weight: 450;
        color: #333;
        color: $default-color;
        // color: #000;
      }
    }
  }

  &-child {
    padding: vw(0) vw(0) vw(0) vw(30);
    height: auto;

    .child-item {
      // margin: vw(8) 0;
      display: flex;
      &:not(:last-child) {
        border-bottom: 1px solid #ddd;
      }
      &-label {
        flex: 1;
        padding: vw(12) vw(10) vw(12) 0;
      }
    }
  }
}
</style>
