import { getBookTicketNotice, getInsuranceNotice } from '@/api'

const state = {
  showDialog: false,
  dialogMsg: ''
}

const getters = {
  showDialog: (state) => state.showDialog,
  dialogMsg: (state) => state.dialogMsg
}

const mutations = {
  SHOW_DIALOG: (state, value) => {
    state.dialogMsg = value
    state.showDialog = true
  },
  HIDE_DIALOG: (state) => {
    state.showDialog = false
  },
  SHOW_BOOK_NOTICE: (state, data) => {
    state.showDialog = true
    state.dialogMsg = data
  },
  SHOW_INSURANCE: (state, data) => {
    state.showDialog = true
    state.dialogMsg = data
  },
  DIALOG_STATUS_CHANGE: (state, value) => {
    state.showDialog = value
  }
}

const actions = {
  showBookTicketNotice: async ({ commit }, category) => {
    const data = await getBookTicketNotice({ category })
    commit('SHOW_BOOK_NOTICE', data)
  },
  showInsuranceNotice: async ({ commit }, insuranceId) => {
    const data = await getInsuranceNotice({ insuranceId })
    commit('SHOW_INSURANCE', data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
