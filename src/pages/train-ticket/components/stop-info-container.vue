<template>
  <main-page noHeader class="stop-info-container">
    <l-header :title="`${trainNumber}经停信息`">
      <div slot="left">
        <i class="iconfont icon-back" @click="hide"></i>
      </div>
    </l-header>
    <section class="stop-info-container-labels">
      <span>车站名称</span>
      <span>到达</span>
      <span>出发</span>
      <span>停留</span>
    </section>
    <section slot="scroll">
      <div v-for="(item, index) in info" :key="index" class="stop-info-container-items">
        <span class="station-name">
          <span>{{ item.stationName }}</span>
        </span>
        <span>{{ index === 0 ? '----' : item.arrivalTime }}</span>
        <span>{{ index === info.length - 1 ? '----' : item.setOffTime }}</span>
        <span>{{ item.stationStayTime === '0' ? '----' : `${item.stationStayTime}分钟` }}</span>
      </div>
    </section>
  </main-page>
</template>

<script>

export default {
  props: {
    info: {
      type: Array,
      default: () => []
    },
    trainNumber: String
  },
  data () {
    return {

    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
.stop-info-container {
  &-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    color: #555;
    height: vw(40);
    border-bottom: 1px solid #eee;
    span {
      text-align: center;
      flex: 2;
    }
    &>:nth-child(1) {
      flex: 3;
    }
  }
  &-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    color: #333;
    height: vw(40);
    span {
      text-align: center;
      flex: 2;
    }
    .station-name {
      flex: 3;
      position: relative;
      text-align: left;
      text-indent: vw(40);
    }
  }
}
</style>
