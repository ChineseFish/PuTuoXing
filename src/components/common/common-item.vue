<template>
  <div class="common-item-wrapper">
    <div v-if="deletable" class="common-item-delete" @click="deleteThis">
      <i class="iconfont icon-del"></i><span class="text">删除</span>
    </div>
    <div :class="{ 'common-item-flex': flex }" ref="common-item" :style="{ transform: `translate3D(${distancePercent}%, 0, 0)` }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const CAN_MOVE_DISTANCE = 5

export default {
  props: {
    deletable: {
      type: Boolean,
      default: false
    },
    maxDistance: {
      type: Number,
      default: 80
    },
    minDistance: {
      type: Number,
      default: 30
    },
    flex: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      startX: 0,
      startY: 0,
      moveX: 0,
      distance: 0,
      moveStart: false
    }
  },

  computed: {
    distancePercent () {
      let width = document.body.clientWidth
      if (document.body.clientWidth < 768) {
        return this.distance / width * 100
      } else {
        return this.distance / (width * 0.7) * 100
      }
    }
  },

  mounted () {
    this.addEvent()
  },
  methods: {
    addEvent () {
      this.$nextTick(() => {
        if (this.deletable) {
          this.$refs['common-item'].addEventListener('touchstart', this.touchStart)
          this.$refs['common-item'].addEventListener('touchmove', this.touchMove)
          this.$refs['common-item'].addEventListener('touchend', this.touchEnd)
        }
      })
    },
    touchStart (event) {
      // event.stopPropagation()
      // event.preventDefault()
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    },
    touchMove (event) {
      const curX = event.touches[0].clientX
      const curY = event.touches[0].clientY

      let value = this.moveX + curX - this.startX

      if (Math.abs(curX - this.startX) > CAN_MOVE_DISTANCE &&
        !(Math.abs(curY - this.startY) > CAN_MOVE_DISTANCE && this.moveX === 0)) {
        this.moveStart = true
      }

      if (value > 0 || value < -this.maxDistance) {
        return
      }

      if (this.moveStart) {
        this.distance = value
      }
    },
    touchEnd (event) {
      if (this.moveX !== 0) {
        event.stopPropagation()
        event.preventDefault()
      }

      if (this.distance - this.moveX < -this.minDistance) {
        this.distance = -this.maxDistance
      } else {
        this.distance = 0
      }
      this.moveX = this.distance
      this.moveStart = false
    },
    deleteThis () {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss">
.common-item {
  &-flex {
    display: flex;
    align-items: center;
    background-color: #fff;
  }
  &-wrapper {
    position: relative;
    width: 100%;
  }
  &-delete {
    color: #fff;
    position: absolute;
    right: 0;
    height: 100%;
    width: 80%;
    background: $default-color-orange;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: vw(20);
    .iconfont {
      font-size: vw(18);
      margin-right: vw(5);
    }
    .text {
      font-size: vw(12);
    }
  }
}
</style>
