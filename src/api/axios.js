import axios from 'axios'
import defaultConfig from '../config'
import Vue from 'vue'
import Toast from '@/components/toast'
import store from '../store'

Vue.use(Toast)

const instance = axios.create({
  baseURL: defaultConfig.baseUrl,
  timeout: 30000
})

instance.interceptors.request.use((conf) => {
  conf.headers.Authorization = store.getters.token || ''
  console.log('store.getts: ', store.getters.token)
  return conf
}, (error) => {
  console.error('req error: ', error.message)
  Vue.prototype.$toast(error.message)
  return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
  Vue.prototype.$loading.close()

  const token = res.headers['Authorization'] || res.headers['authorization']
  if (token) {
    store.commit('SET_USER_TOKEN', token)
  }

  // 请求成功
  try {
    const responseData = res.data
    // console.log('response: ', responseData)
    const code = parseInt(responseData.code)

    if (code === 0) {
      // 如果存在分页则需要把参数一起传递过去
      if (responseData.page) {
        return responseData
      }
      return responseData.data || {}
    } else {
      console.log(responseData.error)
      switch (code) {
        case 1:
        case 2:
        case 3: {
          Vue.prototype.$toast(responseData.error)
          break
        }
        case 101: // token无效
        case 102: { // token过期
          Vue.prototype.$toast('token 无效，请重新登录')
          store.dispatch('tokenInvalid')
        }
      }
      return Promise.reject(responseData.error)
    }
  } catch (error) {
    console.error('error: ', error.message)
    return Promise.reject(error)
  }
}, (error) => {
  Vue.prototype.$loading.close()
  console.error('res error: ', error.message)
  return Promise.reject(error)
})

export default {
  GET: (url = '/', data = {}, options = {}) => {
    // url = /^\/.*/.test(url) ? url : '/' + url
    const config = options.config || {}
    if (options.showLoading) {
      Vue.prototype.$loading(options.loadingText || 'Loading...')
    }
    console.log('config: ', config)
    return instance.get(url, { params: data, ...config })
  },
  POST: (url = '/', data = {}, options = {}) => {
    if (options.showLoading) {
      Vue.prototype.$loading(options.loadingText || 'Loading...')
    }
    const config = options.config || {}
    return instance.post(url, data, config)
  },
  REST: (url = '/', data = {}, methods = 'GET', options = {}) => {
    if (options.showLoading) {
      Vue.prototype.$loading(options.loadingText || 'Loading...')
    }
    const config = { ...options.config, baseURL: defaultConfig.restapiBaseUrl } || {}

    const method = methods.toLocaleUpperCase()
    switch (method) {
      case 'GET': return instance.get(url, { params: data, ...config })
      case 'POST': return instance.post(url, data, config)
      case 'DELETE': return instance.delete(url, data, config)
      case 'PUT': return instance.put(url, data, config)
    }
  }
}
