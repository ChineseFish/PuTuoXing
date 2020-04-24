import { isWeiXin } from '@/utils/runtime-env'

const initFromPlatform = () => {
  if (window.cordova) {
    return 'ziubao-ios-app'
  }
  return isWeiXin() ? 'weixin' : ''
}

const state = {
  haveRouteFrom: true,
  fromPlatform: initFromPlatform()
}

const getters = {
  haveRouteFrom: (state) => state.haveRouteFrom,
  fromPlatform: (state) => state.fromPlatform
}

const mutations = {
  SET_ROUTE_FROM_STATE: (state, value) => {
    state.haveRouteFrom = value
  },
  SET_FROM_PLATFORM: (state, value) => {
    state.fromPlatform = value
  }
}

export default {
  state,
  getters,
  mutations
}
