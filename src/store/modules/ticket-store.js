import store from 'store'
import Vue from 'vue'

const COLLECTOR_KEY = 'ZYB_COLLECTOR'
const PASSENGERS_KEY = 'ZYB_PASSENGERS'
const DETAILDATA_KEY = 'ZYB_DETAILDATA'
const QUERY_HISTORY = 'ZYB_QUERY_HISTORY'
// const QUERY_DATE = 'ZYB_QUERY_DATE'

const state = {
  passengerFields: [
    { prop: 'name', title: '姓名', value: '', placeholder: '请输入姓名' },
    { prop: 'id', type: 1, value: '', moreType: true }
    // { prop: 'tel', title: '手机号', value: '', placeholder: '用于接收航班动态信息' }
  ],
  passengerValues: [],
  passengerListValues: store.get(`${PASSENGERS_KEY}_LIST`) || [],
  collector: {},
  detailData: {},
  queryHistory: {},
  queryDate: '',
  shipStationList: {
    zs: {},
    nb: {},
    tz: {},
    wz: {}
  },
  defaultPassengerTypes: {
    1: '成人票'
  },
  defaultIdTypes: {
    1: '身份证',
    3: '护照'
  },
  ticketFormData: {},
  sceneryDetailData: store.get(`${DETAILDATA_KEY}_SCENERY`) || {}
}

const getters = {
  passengerFields: state => state.passengerFields,
  // 表示用户选定的乘客数据
  passengerValues: state => {
    console.log('passengerValues changed: ', state.passengerListValues)
    return state.passengerListValues.filter((value) => {
      return value.checked
    })
  },
  // 表示整个列表的的乘客数据
  passengerListValues: state => state.passengerListValues,
  collector: state => state.collector,
  detailData: state => state.detailData,
  queryHistory: state => state.queryHistory,
  queryDate: state => state.queryDate,
  shipStationList: state => state.shipStationList,
  shipStationListKeys: state => state.shipStationListKeys,
  defaultPassengerTypes: state => state.defaultPassengerTypes,
  defaultIdTypes: state => state.defaultIdTypes,
  ticketFormData: state => state.ticketFormData,
  sceneryDetailData: state => state.sceneryDetailData
}

const mutations = {
  GET_COLLECTOR: (state) => {
    state.collector = store.get(`${COLLECTOR_KEY}`) ||
      store.get(`${COLLECTOR_KEY}`) || {}
  },
  SET_COLLECTOR: (state, options = {}) => {
    if (options.value) {
      state.collector = options.value
    }

    store.set(`${COLLECTOR_KEY}`, state.collector)
  },
  GET_PASSENGERS: (state, options = {}) => {
    state.passengerValues = store.get(`${PASSENGERS_KEY}_${options.type.toUpperCase()}`) || []
  },
  SET_PASSENGERS: (state, options = {}) => {
    state.passengerValues = options.value
    store.set(`${PASSENGERS_KEY}_${options.type.toUpperCase()}`, options.value)
  },
  SET_PASSENGERS_LIST: (state, value) => {
    if (value) {
      state.passengerListValues = value
    }
    store.set(`${PASSENGERS_KEY}_LIST`, state.passengerListValues)
  },
  GET_DETAILDATA: (state, options = {}) => {
    if (!state.detailData[options.type]) {
      Vue.set(state.detailData, options.type, store.get(`${DETAILDATA_KEY}_${options.type.toUpperCase()}`) || {})
    }
  },
  SET_DETAILDATA: (state, options = {}) => {
    state.detailData[options.type] = options.value
    store.set(`${DETAILDATA_KEY}_${options.type.toUpperCase()}`, options.value)
  },
  GET_QUERY_HISTORY: (state, options = {}) => {
    state.queryHistory = store.get(`${QUERY_HISTORY}`) || {}
  },
  SET_QUERY_HISTORY: (state, options = {}) => {
    Vue.set(state.queryHistory, options.type, options.value)
    store.set(`${QUERY_HISTORY}`, state.queryHistory)
  },
  SET_QUERY_DATE: (state, data) => {
    state.queryDate = data
  },
  STORE_SHIP_STATION_LIST: (state, options = {}) => {
    state.shipStationList[options.type][options.isDept || 0] = options.list
  },
  SET_TICKET_FORM_DATA: (state, data) => {
    state.ticketFormData = Object.assign({}, data)
  },
  SET_SCENERY_DETAIL_DATA: (state, data) => {
    state.sceneryDetailData = Object.assign({}, data)
    store.set(`${DETAILDATA_KEY}_SCENERY`, data)
  }
}

const actions = {
  getCollector: async ({commit}, type) => {
    return store.get(`${COLLECTOR_KEY}_${type.toUpperCase()}`)
  },
  getPassengers: ({commit}, type) => {
    return store.get(`${PASSENGERS_KEY}_${type.toUpperCase()}`)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
