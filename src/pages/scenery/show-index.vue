<template>
  <scenery-index :navList="navList" category="show" title="演出门票"></scenery-index>
</template>

<script>

import SceneryIndex from './component/index'
export default {
  components: {
    SceneryIndex
  },
  data () {
    return {
      navList: [
        {
          title: '保利大剧院',
          address: '保利大剧院',
          subTitle: '普陀保利大剧院'
        }, {
          title: '印象普陀',
          detailId: '21',
          subTitle: '印象普陀剧场'
        }, {
          title: '舟山体育场',
          address: '舟山体育场',
          subTitle: '比赛、演出'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
