// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import globalComponents from '@/components'
import directives from '@/directives'
import filters from '@/filters'
// import VueSocketio from 'vue-socket.io'
import '@/styles/reset.scss'
import '@/styles/common.scss'
import '@/styles/font/iconfont.css'

import 'muse-ui/lib/styles/base.less'
import { DateInput, Checkbox, Button, Radio, Dialog } from 'muse-ui'
import 'muse-ui/lib/styles/theme.less'

import Toast from '@/components/toast'

Vue.use(Toast)
Vue.use(DateInput)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(globalComponents)
// Vue.use(VueSocketio)

FastClick.attach(document.body)

Vue.config.productionTip = false

// const ua = window.navigator.userAgent
document.body.addEventListener('focusout', () => {
  // 软键盘收起的事件处理
  setTimeout(() => {
    // 判断当前是否没有active element
    const activeElement = document.activeElement
    console.log(document.activeElement.tagName)
    // if (activeElement !== 'INPUT' && activeElement !== 'TEXTAREA' && (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0)) {
    if (activeElement !== 'INPUT' && activeElement !== 'TEXTAREA') {
      // 键盘收齐页面空白问题
      // document.body.scrollTop = document.body.scrollHeight
      const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
      window.scrollTo(0, Math.max(scrollHeight - 1, 0))
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  directives,
  filters,
  components: { App },
  template: '<App/>'
})

// document.addEventListener('deviceready', () => {
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     directives,
//     filters,
//     components: { App },
//     template: '<App/>'
//   })
//   window.navigator.splashscreen.hide()
// }, false)
