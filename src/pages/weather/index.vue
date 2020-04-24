<template>
  <main-page back title="舟山气象">
    <div class="weather-container" slot="scroll">
      <div class="title">{{ title }}</div>
      <div v-if="content" v-html="content"></div>
    </div>
  </main-page>
</template>

<script>
import { getWeatherInfo } from '@/api'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  mounted () {
    // window.tpwidget('show')
    this.getWeatherInfo()
  },
  destroyed () {
    console.log('destroyed')
    // window.tpwidget('destroy')
  },
  methods: {
    async getWeatherInfo () {
      const { title, content } = await getWeatherInfo()
      this.title = title
      this.content = content
    }
  }
}
</script>

<style lang="scss">
.weather-container {
  background-color: #fff;
  padding: vw(15);
  .title {
    font-size: vw(16);
    padding-bottom: vw(10);
  }
}
</style>
