<template>
  <main-page :title="trip" class="bus-list-container" back :isLoading="!isDataLoaded">
    <datepick-bar v-model="pickedDate"></datepick-bar>
    <section class="bus-ticket-list-container" slot="scroll">
      <bao-bus-item @click.native="toBusOrder"></bao-bus-item>
    </section>
  </main-page>
</template>

<script>
import DatepickBar from '@/components/common/datepick-bar'
import BaoBusItem from './bao-bus-item'

export default {
  components: {
    DatepickBar,
    BaoBusItem
  },

  props: {
    trip: {
      type: String,
      default: ''
    },
    time: {
      type: [String, Number]
    }
  },
  data () {
    return {
      pickedDate: this.time,
      isDataLoaded: false,
      getting: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    toBusOrder () {
      this.$router.push({ name: 'BaoBusOrder' })
    },
    // 模拟异步获取数据过程
    getData () {
      this.isDataLoaded = false
      if (this.getting) {
        clearTimeout(this.getting)
      }
      this.getting = setTimeout(() => {
        this.isDataLoaded = true
      }, 1000)
    }
  },
  watch: {
    pickedDate () {
      this.getData()
    }
  }
}
</script>

<style lang="scss">
.bus-list-container {

}
</style>
