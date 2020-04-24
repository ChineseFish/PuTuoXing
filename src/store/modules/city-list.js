import store from 'store'

const HISTORY_CITIES_KEY = 'HISTORY_CITIES_KEY'

const state = {
  historyCities: store.get(HISTORY_CITIES_KEY) || {}
}

const getters = {
  historyCities: state => state.historyCities
}

const mutations = {
  SET_HISTORY_CITIES: (state, params) => {
    const { category, list } = params
    state.historyCities[category] = list
    store.set(HISTORY_CITIES_KEY, state.historyCities)
  },
  ADD_HISTORY_CITIES: (state, params) => {
    const { category, item } = params
    if (!state.historyCities[category]) {
      state.historyCities[category] = []
    }

    state.historyCities[category].unshift(item)

    // 删除重复字段
    const mapCities = {}
    let deleteIndex = -1
    state.historyCities[category].forEach((value, index) => {
      if (!mapCities[value.cname]) {
        mapCities[value.cname] = true
      } else {
        deleteIndex = index
      }
    })
    if (deleteIndex > -1) {
      state.historyCities[category].splice(deleteIndex, 1)
    }

    if (state.historyCities[category].length > 8) {
      state.historyCities[category].pop()
    }

    store.set(HISTORY_CITIES_KEY, state.historyCities)
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
