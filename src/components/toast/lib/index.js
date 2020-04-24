const Toast = {}
let showToast = false // 存储toast显示状态
let showLoad = false // 存储loading显示状态
let toastVM = null // 存储toast vm
let loadNode = null // 存储loading节点元素

Toast.install = function (Vue, options) {
  const opt = {
    defaultType: 'center',
    duration: '1300',
    wordWrap: false
  }

  for (const property in options) {
    opt[property] = options[property]
  }

  Vue.prototype.$toast = (tips, type) => {
    const curType = type || opt.defaultType
    const wordWrap = opt.wordWrap ? 'lx-word-wrap' : ''
    const style = opt.width ? 'style="width: ' + opt.width + '"' : ''
    const tmp = '<div v-show="show" :class="type" class="lx-toast ' + wordWrap + '" ' + style + '>{{tip}}</div>'

    if (showToast) {
      // 如果toast还在，则不再执行
      return
    }

    if (!toastVM) {
      let ToastTpl = Vue.extend({
        data () {
          return {
            show: showToast,
            tip: tips,
            type: 'lx-toast-' + curType
          }
        },
        template: tmp
      })
      toastVM = new ToastTpl()

      const tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }

    toastVM.type = 'lx-toast-' + curType
    toastVM.tip = tips
    toastVM.show = showToast = true

    setTimeout(() => {
      toastVM.show = showToast = false
    }, opt.duration)
  }

  ['bottom', 'center', 'top'].forEach((type) => {
    Vue.prototype.$toast[type] = (tips) => {
      return Vue.prototype.$toast(tips, type)
    }
  })

  Vue.prototype.$loading = (tips, type) => {
    if (type === 'close') {
      if (!loadNode) {
        return
      }
      loadNode.show = showLoad = false
      const markNode = document.querySelector('.lx-load-mark')
      if (markNode) markNode.remove()
    } else {
      if (showLoad) {
        // 如果loading还在，则不再执行
        return
      }
      let LoadTpl = Vue.extend({
        data () {
          return {
            show: showLoad
          }
        },
        template: '<div v-show="show" class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="lx-load-content">' + tips + '</div></div></div>'
      })
      loadNode = new LoadTpl()
      const tpl = loadNode.$mount().$el

      document.body.appendChild(tpl)
      loadNode.show = showLoad = true
    }
  }

  ['open', 'close'].forEach((type) => {
    Vue.prototype.$loading[type] = (tips) => {
      return Vue.prototype.$loading(tips, type)
    }
  })
}

export default Toast
