import { getSwiperImages } from '@/api'
import Vue from 'vue'
import store from 'store'
import { formatDateYYMMDD } from '@/utils/date-format'

const CANWEBBUYDAYS = 'ZYB_CANWEBBUYDAYS'

const state = {
  swiperImages: { 'home': [] },
  selected: 0,
  canWebBuyDays: store.get(CANWEBBUYDAYS) || -1,
  homestayImagesInfo: null,
  homestayKeywords: '',
  checkInDate: formatDateYYMMDD(new Date()),
  checkOutDate: formatDateYYMMDD(new Date(+new Date() + 24 * 3600 * 1000))
}

const getters = {
  swiperImages: state => state.swiperImages,
  homestayImagesInfo: state => state.homestayImagesInfo,
  selected: state => state.selected,
  canWebBuyDays: state => state.canWebBuyDays,
  homestayKeywords: state => state.homestayKeywords,
  checkInDate: state => state.checkInDate,
  checkOutDate: state => state.checkOutDate
}

const mutations = {
  SET_SELECTED: (state, data) => {
    state.selected = data
  },
  SET_CAN_WEB_BUY_DAYS: (state, data) => {
    state.canWebBuyDays = data
    store.set(CANWEBBUYDAYS, data)
  },
  SET_HOMESTAY_IMAGES_INFO: (state, data) => {
    state.homestayImagesInfo = data
  },
  SET_HOMESTAY_KEYWORDS: (state, data) => {
    state.homestayKeywords = data
  },
  SET_CHECK_IN_DATE: (state, date) => {
    state.checkInDate = date
  },
  SET_CHECK_OUT_DATE: (state, date) => {
    state.checkOutDate = date
  }
}

const actions = {
  getSwiperImages: async ({ commit }, type) => {
    let res = await getSwiperImages({ type }) || []
    Vue.set(state.swiperImages, type, res)
    console.log('state.swiperImages: ', state.swiperImages, res)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
