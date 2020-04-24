<template>
  <button-styles :float="float" :class="float ? 'is-float' : ''" v-show="isShow" @click.native="goBack" class="button-styles-wrapper">
    <i class="iconfont icon-back"></i>
  </button-styles>
</template>

<script>
import ButtonStyles from './button-styles'
export default {
  components: {
    ButtonStyles
  },
  props: {
    float: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShow () {
      // return window.history.length > 1
      return true
    }
  },
  mounted () {
    console.log('$route: ', this.$route)
  },
  methods: {
    goBack () {
      console.log('this.$route: ', this.$route)
      // if (window.history.length === 1) {
      //   this.$router.replace('/')
      // }

      // if (this.$route.query.backMode === 'goBack') {
      //   this.$router.go(-1)
      //   return
      // }

      // let matched = this.$route.matched
      // let curPath = this.$route.path
      // let backPath = '/'
      // let matchedLength = matched.length
      // const whitePathList = ['/ship-ticket/:area', '/scenery/list']

      // if ((matchedLength > 1 && whitePathList.indexOf(matched[matchedLength - 1].path) > -1)) {
      //   console.log('matched[index].path: ', matched[matchedLength - 1].path)
      //   // alert( matched[index].path)
      //   this.$router.go(-1)
      //   return
      // }

      // for (let index = 0; index < matchedLength; ++index) {
      //   let item = matched[index]
      //   if (item.regex.test(curPath) && index > 0) {
      //     backPath = matched[index - 1].path || '/'
      //   }
      // }

      // console.log('backPathe: ', backPath)
      // this.$router.push(backPath)

      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.button-styles-wrapper {
  .icon-back {
    padding: vw(10);
  }
  &.is-float {
    margin-left: vw(10);
  }
  .iconfont {
    font-size: vw(22);
  }
}
</style>
