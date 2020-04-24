// import Vue from 'vue'
import store from 'store'
import { isWeiXin } from '@/utils/runtime-env'
import { getUrlQuery } from '@/utils/common'
import { getWxUserInfo } from '@/api'

const USER_TOKEN = 'ZYB_TOKEN'
const WXUSERINFO_KEY = 'ZYB_WXUSERINFO'

const state = {
  showLogin: false,
  loginOptions: {},
  token: '',
  wxUserInfo: store.get(WXUSERINFO_KEY) || {}
}

const getters = {
  showLogin: (state) => state.showLogin,
  loginOptions: (state) => state.loginOptions,
  token: (state) => {
    return state.token || store.get(USER_TOKEN)
  },
  wxUserInfo: state => state.wxUserInfo
}

const mutations = {
  SHOW_LOGIN (state, options = {}) {
    state.showLogin = true
    state.loginOptions = options
  },
  CHANGE_LOGIN_STATE (state, value) {
    state.showLogin = value === undefined ? true : value
  },
  HIDE_LOGIN (state) {
    state.showLogin = false
  },
  LOGIN_SUCCESS (state, token) {
    state.token = token
    store.set(USER_TOKEN, token)
    if (typeof state.loginOptions.success === 'function') {
      state.loginOptions.success()
    }
  },
  LOGIN_CLOSE (state) {
    if (typeof state.loginOptions.close === 'function') {
      state.loginOptions.close()
    }
  },
  AUTH_LOGOUT (state) {
    state.token = ''
    store.remove(USER_TOKEN)
  },
  SET_WXUSERINFO (state, data) {
    state.wxUserInfo = data || {}
    store.set(WXUSERINFO_KEY, data)
  },
  WXUSERINFO_CLEAN (state) {
    state.wxUserInfo = {}
    store.remove(WXUSERINFO_KEY)
  },
  SET_USER_TOKEN (state, data) {
    state.token = data
    store.set(USER_TOKEN, data)
  }
}

const actions = {
  tokenInvalid: ({ commit }) => {
    commit('AUTH_LOGOUT')
    commit('SHOW_LOGIN', {
      success: () => {
        // 这里成功登录以后最好可以重新获取一次数据，使用router.go(0)应该可以实现
        window.history.go(0)
      }
    })
  },
  wxAccessLogin: async ({ commit }) => {
    if (!isWeiXin()) {
      return
    }

    if (state.wxUserInfo.openid) {
      return
    }

    const code = getUrlQuery('code')
    if (code) {
      try {
        let res = await getWxUserInfo({ code, openType: 'wechat' })
        commit('SET_WXUSERINFO', res)
        // let params = this.$route.params
        // delete params.code
        // this.$router.replace({ path: this.$route.path, params })
      } catch (err) {
        // getWxLoginCode()
        window.alert(err.message)
      }
      return
    }
    getWxLoginCode()
  },
  userLogout: ({ commit }) => {
    commit('AUTH_LOGOUT')
    commit('WXUSERINFO_CLEAN')
  }
}

const getWxLoginCode = (state = '') => {
  const appid = 'wx50abc5fc2c2d7e2e'
  const redirectUri = window.location.origin + window.location.pathname + window.location.hash
  const encodeRedirectUrl = encodeURIComponent(redirectUri)
  console.log(encodeRedirectUrl)
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeRedirectUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
}

export default {
  state,
  getters,
  mutations,
  actions
}
