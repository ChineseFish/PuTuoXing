import Vue from 'vue'
import store from '../store'
import { HHMMtoMinutes } from '@/utils/date-format'

// console.log(store)
const config = store.getters.globalConfig

const limitClick = Vue.directive('limit-click', {
  bind: (el, binding, vnode) => {
    el.addEventListener('click', () => {
      const curMinutes = Date.now().getHours() * 60 + Date.now().getMinutes()
      const start = HHMMtoMinutes(config.disableTimePeriodStart)
      const end = HHMMtoMinutes(config.disableTimePeriodEnd)
      if (start < curMinutes && curMinutes < end) {
        store.dispatch('SHOW_DIALOG', `对不起，${config.disableTimePeriodStart}-${config.disableTimePeriodEnd}时间段暂不支持在线订票`)
        return
      }
      if (typeof binding.value === 'function') {
        binding.value()
      }
    })
  }
})

export default limitClick
