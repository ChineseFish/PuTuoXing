<template>
  <div class="num-adjust-wrapper">
    <div @click="onMinus" class="ctl-btn"><i class="iconfont icon-sub2" :class="number === 1 ? 'disable-sub': ''"></i></div>
    <input v-model="number" :max="maxNumber" type="number" class="input" />
    <div @click="onPlus" class="ctl-btn"><i class="iconfont icon-add2" :class="number === maxNumber ? 'disable-add': ''"></i></div>
  </div>
</template>

<script>

export default {
  props: {
    num: {
      default: 1
    }
  },
  watch: {
    'number' (newVal) {
      if (newVal >= this.maxNumber) {
        this.number = this.maxNumber
      }

      if (newVal <= this.minNumber) {
        this.number = this.minNumber
      }
      this.$emit('update:num', this.number)
    },
    'num' (newVal) {
      this.number = this.num
    }
  },
  data () {
    return {
      number: this.num,
      maxNumber: 99,
      minNumber: 1
    }
  },
  methods: {
    onMinus () {
      if (this.number > 1) {
        --this.number
      }
    },
    onPlus () {
      ++this.number
    }
  }
}
</script>

<style lang="scss">
.num-adjust-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input {
    width: vw(22);
    text-align: center;
  }
  .ctl-btn {
    .iconfont {
      margin: auto;
      font-size: vw(22);

      &.disable-sub, &.disable-add {
        color: $minor-color;
      }
    }
  }
}
</style>
