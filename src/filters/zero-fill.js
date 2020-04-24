import Vue from 'vue'
import { zeroFill } from '@/utils/zero-fill'

const fill = Vue.filter('zeroFill', (...arg) => {
  return zeroFill(arg)
})

export default fill
