import axios from './axios'
import store from '@/store'
import Vue from 'vue'
import Toast from '@/components/toast'
import { judgeIdCard } from '@/utils/form-rules'
import config from '../config'

Vue.use(Toast)

// 微信建行支付
export const wxjhPay = (params) => axios.POST('/wxjhPay', params)
export const wxjhCardPay = (params) => axios.POST('/wxjhCardPay', params)

// export const nxinEpay = (params) => axios.GET('/')

// 获取建行订单
export const getJhOrderId = (params) => axios.GET('/getJhOrderID', params)

// Plane
export const getPlaneTicketList = async (params) => {
  switch (parseInt(params.category)) {
    case 1: {
      return axios.GET('/airTicket/Chinese', params)
    }
    case 2: {
      return axios.GET('/airTicket/International', params)
    }
    default: {
      console.error('Category is invalid.')
    }
  }
}
// 提交机票订单
export const postPlaneTicketDetail = (params) => axios.POST('/jpOrder', params, { showLoading: true, loadingText: '生成订单中...' })
// 获取机票订单详情
export const getOrderDetail = (params) => axios.GET('/orderDetail', params)
// 获取城市列表
export const getCityList = (params, category, type) => {
  let showLoading = true
  if ('keyword' in params) {
    showLoading = false
  }

  return axios.GET('/getCity', { ...params, category }, { showLoading })
}
export const getPlaneBusStationList = (params) => {
  let showLoading = true
  if ('keyword' in params) {
    showLoading = false
  }

  return axios.GET('/getAirportBusStation', params, { showLoading })
}

export const getHotCity = (params) => axios.GET('/getHotCity', params)

// Bus
// 普通大巴列表
export const queryBusList = (params) => axios.GET('/busTicket/Ordinary', params)
// 机场大巴列表
export const queryPlaneBusList = (params) => axios.GET('/busTicket/Airport', params)
// 豪华大巴列表
export const queryLuxuryBusList = (params) => axios.GET('/busTicket/Luxury', params)
// export const queryLuxuryBusList = (params) => axios.GET('/busTicket/LuxuryBus', params)

export const queryLuxuryBusSingle = (params) => axios.GET('/busTicket/LuxurySingle', params, { showLoading: true, loadingText: '正在获取座位信息中...' })

export const creatBusOrder = (params) => axios.POST('/busOrder', params, { showLoading: true, loadingText: '生成订单中...' })

export const queryBusOrder = (params) => axios.GET('/busDetail', params)

export const canCreateBusOrder = (params) => axios.POST('/busTicket/canCreateOrder', params, { showLoading: true })

// Train
export const getTrainList = (params) => axios.GET('/trainTicket', params)
export const getTrainOrderDetail = (params) => axios.GET('/trainDetail', params)
export const createTrainOrder = (params) => axios.POST('/trainOrder', params, { showLoading: true, loadingText: '生成订单中...' })
export const getTrainStopList = (params) => axios.GET('/trainTicket/getTrainStopList', params, { showLoading: true, loadingText: '正在查询...' })

export const creatOrder = (params, type) => {
  switch (type) {
    case 'plane': {
      return postPlaneTicketDetail(params)
    }
    case 'bus': {
      return creatBusOrder(params)
    }
    case 'train': {
      return createTrainOrder(params)
    }
    case 'ship': {
      return createShipOrder(params)
    }
    case 'scenery': {
      return createScenicOrder(params)
    }
    case 'homestay': {
      return createHomestayOrder(params)
    }
  }
}

// Ship
export const getShipStation = (params) => axios.GET('/getShipStation', params, { showLoading: true })
export const getShipArea = (params) => axios.GET('/getArea', params)
export const getShipDynamics = (params) => axios.GET('/getShipDynamics', params)

// 旅游专线
export const getTravelLineShipList = (params, type) => {
  if (type === 'dsjt') {
    return axios.GET('/shipTicket/dsjt', params)
  } else if (type === 'ssly') {
    return axios.GET('shipTicket/ssly', params)
  }
  return axios.GET('/shipTicket/hxSpecial', params)
}
export const createShipOrder = (params) => axios.POST('/shipOrder', params, { showLoading: true, loadingText: '生成订单中...' })
export const getShipOrderDetail = (params) => axios.GET('/shipDetail', params)

// 发送手机验证码
export const sendTelCode = (params) => axios.POST('/sendMsg', params)
// 绑定手机号码
export const bindTelephone = (params) => axios.POST('/bindingMobile', params)

// 登录接口
export const authLogin = (params) => axios.POST('/login', params)

// 请求订单列表 type: plane | bus | train
export const queryOrderList = (params) => axios.GET('/orderList', params)

// 取消订单 category、orderNo
export const cancelOrder = (params) => axios.POST('/cancelOrder', params, { showLoading: true, loadingText: '取消订单中...' })
// 删除订单
export const deleteOrder = (params) => axios.POST('/delOrder', params, { showLoading: true })
// 申请退票
export const refundOrder = (params) => axios.POST('/refundTicket', params, { showLoading: true, loadingText: '退票申请发起中...' })

// 添加乘客信息
export const addPassenger = async (params) => {
  const passengerListValues = store.getters.passengerListValues
  let addValue = params

  if (!store.getters.token) {
    if (!judgeIdCard(params.id, parseInt(params.type))) {
      throw new Error('id 验证不通过')
    }

    if (!params.name) {
      Vue.prototype.$toast('姓名必填')
      throw new Error('姓名必填')
    }
    passengerListValues.forEach(item => {
      if (item.id === params.id) {
        Vue.prototype.$toast('不能添加证件号码相同的乘客')
        throw new Error('不能添加证件号码相同的乘客')
      }
    })
  } else {
    try {
      addValue = await axios.POST('/addPassenger', params)
    } catch (err) {
      throw new Error('更新乘客信息失败')
    }
  }
  Vue.set(addValue, 'checked', true)
  passengerListValues.push(addValue)
  store.commit('SET_PASSENGERS_LIST', passengerListValues)
  return passengerListValues
}
// 获取乘客列表
export const getPassengerList = async (params) => {
  let list = store.getters.passengerListValues
  if (store.getters.token) {
    try {
      list = await axios.GET('/getPassengerList', params, { showLoading: true })
    } catch (err) {
      throw new Error('获取乘客列表失败')
    }
  }
  store.commit('SET_PASSENGERS_LIST', list)
  return list
}
// 更新乘客信息
export const updatePassenger = async (newValues, oldValues) => {
  if (!store.getters.token) {
    if (!judgeIdCard(newValues.id, parseInt(newValues.type))) {
      throw new Error(`id 验证不通过`)
    }
    if (!newValues.name) {
      Vue.prototype.$toast('姓名必填')
      throw new Error('姓名必填')
    }
  } else {
    try {
      await axios.POST('/updatePassenger', newValues, { showLoading: true, loadingText: '更新中...' })
    } catch (err) {
      throw new Error('更新乘客失败')
    }
  }

  let passengerListValues = store.getters.passengerListValues
  passengerListValues.forEach((item, index) => {
    if (item.id === oldValues.id) {
      Vue.set(passengerListValues, index, newValues)
    }
  })
  store.commit('SET_PASSENGERS_LIST', passengerListValues)
  return newValues
}
// 删除乘客
export const deletePassenger = async (params, index) => {
  const passengerListValues = store.getters.passengerListValues
  if (store.getters.token) {
    try {
      let { passengerID } = params
      await axios.POST('/delPassenger', { passengerID })
    } catch (err) {
      throw new Error('删除乘客失败：')
    }
  }
  passengerListValues.splice(index, 1)
  store.commit('SET_PASSENGERS_LIST', passengerListValues)
}

// feedbacks
const feedbacksUrl = '/feedbacks'
export const getFeedbacks = (params) => axios.GET(
  feedbacksUrl, params, {
    config: { baseURL: config.restapiBaseUrl }
  }
)
export const createFeedback = (params) => axios.REST(feedbacksUrl, params, 'POST')

// 轮播图
export const getSwiperImages = (params) => axios.REST('/swiper-images', params, 'GET')

// 获取活动信息
export const getActivityMessage = (params) => axios.REST(`/activity-messages/${params.id}`)

export const getWeatherInfo = (params) => axios.GET('/getWeatherInfo', params)

export const getWxUserInfo = (params) => axios.GET('getWxUserInfo', params)

// 获取订票须知、退票须知、保险说明
export const getBookTicketNotice = (params) => axios.GET('/getNotice', { ...params, noticeType: 1 })
export const getRefundTicketNotice = (params) => axios.GET('/getNotice', { ...params, noticeType: 2 })
export const getInsuranceNotice = (params) => axios.GET('/getNotice', { ...params, noticeType: 3 })

export const getScenicList = (params) => axios.GET('/scenic/list', params)
export const getScenicBoatTicket = (params) => axios.GET('/scenic/list', { ...params, category: 'boat' })
export const getScenicDetail = (params) => axios.GET('/scenic/detail', params)
export const createScenicOrder = (params) => axios.POST('/scenic/makeOrder', params, { showLoading: true, loadingText: '生成订单中...' })
export const getScenicOrderDetail = (params) => axios.GET('/scenic/orderDetail', params)

// 提交开票审核（电子发票）
export const applyBilling = (params) => axios.GET('/billing/applyBilling', params, { showLoading: true, loadingText: '提交中...' })
export const getBillingList = (params) => axios.GET('/billingList', params)

// 民宿接口
export const getHotelList = (params) => axios.POST('/hotel/hotelList', params)
export const getHotelInfo = (params) => axios.GET('/hotel/hotelInfo', params)
export const getHomestayList = (params) => axios.GET('/homestay/list', params)
export const getHotHomestayList = (params) => axios.GET('/homestay/hotList', params)
export const getHomestayDetail = (params) => axios.GET('/homestay/detail', params)
export const getHomestayPrice = (params) => axios.GET('/homestay/getPrice', params)
export const createHomestayOrder = (params) => axios.POST('/homestay/makeOrder', params, { showLoading: true, loadingText: '生成订单中...' })
export const getHomestayOrderDetail = (params) => axios.GET('/homestay/orderDetail', params)
export const getHomestayHotSearchList = (params) => axios.GET('/homestay/hotSearchList', params)
export const getHomestayZoneList = (params) => axios.GET('/admin/hotel/zoneList', params)

export const getNoticeMessages = (params) => axios.GET('/comm/getNoticeMsg', params)
