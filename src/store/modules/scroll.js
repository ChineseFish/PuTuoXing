const state = {
  bsScrollPos: null
}

const getters = {
  bsScrollPos: (state) => state.bsScrollPos
}

const mutations = {
  'ON_BS_SCROLL': (state, pos) => {
    state.bsScrollPos = pos
  }
}

export default {
  state,
  getters,
  mutations
}
