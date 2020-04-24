<template>
  <div class="development-container">
    <div class="development-icon-wrapper">
      <i class="iconfont icon-development"></i>
    </div>
    <div class="development-content-wrapper">
      <p>{{ showText }}</p>
    </div>

    <div class="development-button-wrapper">
      <div class="go-back-home" @click="goBackHomde" v-if="showBackBtn">返回首页</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showBackBtn () {
      if (this.$route.name !== 'Index') {
        return true
      }
      return false
    }
  },
  data () {
    return {
      text: '功能升级中，敬请期待...',
      showText: '',
      interval: null
    }
  },
  mounted () {
    this.typeWriter()
  },
  methods: {
    typeWriter () {
      let step = 0
      this.interval = setInterval(() => {
        if (this.showText.length >= this.text.length) {
          clearInterval(this.interval)
          return
        }
        this.showText = this.text.substring(0, step++)
      }, 200)
    },
    goBackHomde () {
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang="scss">
.development {
  &-container {
    background: #fff;
    height: 100vh;
    padding-top: 30%;
    // position: relative;
  }
  &-icon-wrapper {
    .iconfont {
      font-size: vw(120);
      color: $default-color;
    }
    text-align: center;
  }
  &-content-wrapper {
    text-align: center;
    font-size: vw(18);
    color: $default-color;
  }
  &-button-wrapper {
    position: absolute;
    bottom: vw(80);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .go-back-home {
      padding: vw(5) vw(10);
      color: $default-color;
      border: 1px solid $default-color;
      border-radius: 5px;
    }
  }
}
</style>
