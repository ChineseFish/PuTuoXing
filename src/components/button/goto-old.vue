<template>
  <div class="goto-old-btn" @click="gotoOld">回到旧版</div>
</template>

<script>

const OldVersionUri = {
  Bus: 'http://m.ziubao.com/carTickets.htm',
  Plane: 'http://m.ziubao.com/airTicketsSelect.htm'
}

export default {
  props: {
    type: String,
    default: 'Bus',
    validator (value) {
      return ['Bus', 'Plane'].indexOf(value)
    }
  },

  mounted () {
    // this.$parent.$el
  },

  methods: {
    gotoOld () {
      window.location.href = OldVersionUri[this.type]
    }
  }
}
</script>

<style lang="scss">
.goto-old-btn {
  position: absolute;
  bottom: vw(20);
  left: 50%;
  transform: translateX(-50%);
  color: #777;
  padding: vw(3) vw(10);
  border: 1px solid #777;
  border-radius: 5px;
}
</style>
