<template>
  <scenery-index :navList="navList" category="beauty" title="景区门票"></scenery-index>
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
          title: '普陀山',
          place: '普陀山',
          subTitle: '海天佛国',
          detailId: 4
        }, {
          title: '朱家尖',
          place: '朱家尖',
          subTitle: '金沙、青山'
        }, {
          title: '桃花岛',
          place: '桃花岛',
          subTitle: '桃花、金庸'
        }, {
          title: '嵊泗',
          place: '嵊泗',
          subTitle: '海岛、沙滩'
        }, {
          title: '岱山',
          place: '岱山',
          subTitle: '古镇、公园'
        }, {
          title: '西湖',
          place: '西湖',
          subTitle: '西湖游船'
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
