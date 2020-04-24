<template>
  <div class="plane-bus-city-list-wrapper">
    <div v-for="(item, index) of list" :key="index" @click="onItem(item)" class="item">
      {{ startName }} {{ item.alias }}
    </div>
  </div>
</template>

<script>
import { getPlaneBusStationList } from '@/api'
import { mapGetters } from 'vuex'

export default {
  props: {
    isDept: {
      type: Number,
      defualt: 1
    }
  },
  computed: {
    ...mapGetters([
      'ticketFormData'
    ]),
    startName () {
      return this.ticketFormData.start && !this.isDept
        ? `${this.ticketFormData.start.alias} => `
        : ''
    }
  },

  data () {
    return {
      list: []
    }
  },

  mounted () {
    console.log('this.isDept: ', this.$parent)
    this.getPlaneBusStationList()

    console.log(this.ticketFormData)
  },

  methods: {
    async getPlaneBusStationList () {
      const params = {
        isDept: this.isDept
      }

      if ('start' in this.ticketFormData && !this.isDept) {
        params.sCity = this.ticketFormData.start.cname
      }

      this.list = await getPlaneBusStationList(params)
    },
    onItem (item) {
      this.$emit('selected', item)
    }
  }
}
</script>

<style lang="scss">
.plane-bus-city-list-wrapper {
  // padding: $padding-aside;
  margin: 0 $padding-aside;
  .item {
    padding: vw(10) vw(10) vw(10) 0;
    &:not(:last-child) {
      border-bottom: vw(1) solid $line-color;
    }
  }
}
</style>
