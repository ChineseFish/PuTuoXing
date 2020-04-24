import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { BusTicket, BusTicketPaymentQuery } from './bus-ticket'
import { TravelLineRoute, TravelLinePaymentQuery } from './travel-line'
import { SceneryDetail } from './scenery-detail'
import { HomestayDetail, HomestayTicketPaymentQuery } from './homestay-detail'

const Index = () => import('pages/index')
// const BusList = () => import('pages/bus-ticket/bus/bus-list')
// const PlaneBusList = () => import('pages/bus-ticket/plane-bus/plane-bus-list')
// const LuxuryBusList = () => import('pages/bus-ticket/luxury-bus/luxury-bus-list')
// const BusOrder = () => import('pages/bus-order')
// const BusTicketPayment = () => import('pages/bus-pay')

const PlaneTicket = () => import('pages/plane-ticket')
const PlaneTicketList = () => import('pages/plane-ticket/list')
const PlaneTicketDetail = () => import('pages/plane-ticket/detail')
const PlaneTicketPayment = () => import('pages/plane-ticket/payment')

const TrainTicket = () => import('pages/train-ticket')
const TrainTicketList = () => import('pages/train-ticket/list')
const TrainTicketDetail = () => import('pages/train-ticket/detail')
const TrainTicketPayment = () => import('pages/train-ticket/payment')

const ShipTicketNav = () => import('pages/ship-ticket/nav-page')
const ShipTicketIndex = () => import('pages/ship-ticket')
const ShipTicketIframe = () => import('pages/iframe')
const ShipDynamics = () => import('pages/ship-ticket/ship-dynamics')

const TravelLineList = () => import('pages/travel-line-ticket/list')

const AuthLogin = () => import('pages/auth/login')

const OrderList = () => import('pages/order/list')

const Development = () => import('pages/others/development')
// const MapContainer = () => import('pages/map')

const FeedbackPage = () => import('pages/feedback')
const WeatherPage = () => import('pages/weather')

const MineSettings = () => import('pages/settings')
const BindTelephone = () => import('pages/bind-telephone')

const JhQa = () => import('pages/questionAndAnswer/jhQa')

const SceneryTicket = () => import('pages/scenery/index')
const SceneryTicketList = () => import('pages/scenery/list')
// const SceneryTicketDetail = () => import('pages/scenery/detail')
// const SceneryTicketBooking = () => import('pages/scenery/booking')
const SceneryTicketPayment = () => import('pages/scenery/payment')
const ShowTicket = () => import('pages/scenery/show-index')

const HomestayTicket = () => import('pages/homestay')
const HomestayTicketList = () => import('pages/homestay/list')
const HomestayTicketRoomList = () => import('pages/homestay/room-list')
const HomestayTicketSearch = () => import('pages/homestay/search')

const OpenTicketList = () => import('pages/open-ticket')

Vue.use(Router)

const TravelLineListRoute = {
  path: 'travel-line-list',
  component: TravelLineList,
  children: [TravelLineRoute]
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { title: '行普陀' },
    children: [
      BusTicket,
      TravelLineRoute,
      TravelLineListRoute,
      { // 飞机票
        path: '/plane-ticket',
        name: 'PlaneTicket',
        component: PlaneTicket,
        meta: { title: '机票预订' },
        children: [
          {
            path: '/plane-ticket/list',
            name: 'PlaneTicketList',
            component: PlaneTicketList,
            meta: { title: '机票预订' },
            props: (route) => ({ ...route.query }),
            children: [
              {
                path: 'detail',
                name: 'PlaneTicketDetail',
                component: PlaneTicketDetail,
                meta: { title: '机票预订' },
                props: true,
                children: [
                  {
                    path: 'payment',
                    name: 'PlaneTicketPayment',
                    component: PlaneTicketPayment,
                    meta: { title: '机票订单' },
                    props: (route) => ({ ...route.query })
                  }
                ]
              }
            ]
          }
        ]
      }, { // 火车票
        path: '/train-ticket',
        name: 'TrainTicket',
        component: TrainTicket,
        meta: { title: '火车票预订' },
        children: [
          {
            path: 'list',
            name: 'TrainTicketList',
            component: TrainTicketList,
            meta: { title: '火车票预订' },
            props: (route) => ({ ...route.query }),
            children: [{
              path: 'detail',
              name: 'TrainTicketDetail',
              component: TrainTicketDetail,
              meta: { title: '火车票预订' },
              props: true,
              children: [
                {
                  path: 'payment',
                  name: 'TrainTicketPayment',
                  component: TrainTicketPayment,
                  meta: { title: '火车票订单' },
                  props: (route) => ({ ...route.query })
                }
              ]
            }]
          }
        ]
      }, { // 船票
        path: '/ship-ticket',
        name: 'ShipTicketNav',
        component: ShipTicketNav,
        meta: { title: '船票' },
        children: [
          TravelLineListRoute,
          TravelLineRoute,
          {
            path: ':area',
            name: 'ShipTicketIndex',
            props: true,
            component: ShipTicketIndex,
            meta: { title: '船票' },
            children: [
              TravelLineListRoute,
              TravelLineRoute,
              {
                path: 'dynamics',
                component: ShipDynamics,
                meta: { title: '船班动态' }
              }, {
                path: ':system',
                props: true,
                name: 'ShipTicketIframe',
                component: ShipTicketIframe,
                meta: { title: '船票' }
              }, {
                path: 'weather',
                name: 'ShipTicketWeather',
                component: WeatherPage,
                meta: { title: '舟山气象' }
              }
            ]
          }
        ]
      }, {
        path: 'scenery',
        name: 'SceneryTicket',
        component: SceneryTicket,
        meta: { title: '旅游门票' },
        children: [{
          path: 'list',
          name: 'SceneryTicketList',
          component: SceneryTicketList,
          props: (route) => ({ ...route.query }),
          meta: {
            title: '旅游门票列表'
          },
          children: [SceneryDetail]
        }, SceneryDetail]
      }, {
        path: 'show',
        name: 'ShowTicket',
        component: ShowTicket,
        meta: { title: '演出门票' },
        children: [{
          path: 'list',
          name: 'SceneryTicketList',
          component: SceneryTicketList,
          props: (route) => ({ ...route.query }),
          meta: {
            title: '演出门票列表'
          },
          children: [SceneryDetail]
        }, SceneryDetail]
      }, {
        path: 'homestay',
        name: 'HomestayTicket',
        component: HomestayTicket,
        meta: { title: '民宿预订' },
        children: [HomestayDetail, {
          path: 'list',
          component: HomestayTicketList,
          props: (route) => ({ ...route.query }),
          meta: { title: '民宿列表' },
          children: [{
            path: '/homestay/room-list/:id',
            component: HomestayTicketRoomList,
            mata: { title: '房间列表' },
            children: [HomestayDetail]
          }]
        }]
      },
      {
        path: 'open-ticket-list',
        name: 'OpenTicketList',
        component: OpenTicketList,
        meta: { title: '发票列表' }
      }, {
        path: 'settings',
        name: 'MineSettings',
        component: MineSettings,
        meta: { title: '设置' }
      }, {
        path: 'bind-telehpne',
        name: 'BindTelephone',
        component: BindTelephone,
        meta: { title: '绑定手机号码' }
      }
    ]
  }, { // 问题反馈
    path: '/feedback',
    props: (route) => ({ ...route.query }),
    name: 'Feedback',
    component: FeedbackPage,
    meta: { title: '问题反馈' }
  }, {
    path: '/homestay/search',
    component: HomestayTicketSearch,
    name: 'HomestayTicketSearch',
    meta: { title: '民宿搜索' }
  }, { // 正在开发中页面
    path: '/devlopment',
    name: 'Development',
    component: Development
  }, { // Auth 登录/注册
    path: '/auth/login',
    name: 'AuthLogin',
    component: AuthLogin,
    meta: { title: '登录/注册' }
  }, { // 订单
    path: '/order-list',
    name: 'OrderList',
    component: OrderList,
    meta: { needLogin: true, title: '订单列表' },
    children: [
      BusTicketPaymentQuery,
      {
        path: 'payment',
        name: 'OrderQueryPlane',
        component: PlaneTicketPayment,
        meta: { title: '机票订单' },
        props: (route) => ({ ...route.query })
      }, {
        path: 'payment',
        name: 'OrderQueryTrain',
        component: TrainTicketPayment,
        meta: { title: '火车票订单' },
        props: (route) => ({ ...route.query })
      },
      {
        path: 'payment',
        name: 'OrderQueryScenery',
        component: SceneryTicketPayment,
        meta: { title: '旅游门票订单' },
        props: (route) => ({ ...route.query })
      },
      TravelLinePaymentQuery,
      HomestayTicketPaymentQuery
    ]
  }, {
    path: '/jh-qa',
    component: JhQa,
    name: 'JhQa',
    meta: { title: '建行龙支付常见问题' }
  }, {
    path: '/bind-telephone',
    component: BindTelephone,
    meta: { title: '绑定手机号码' }
  }
]

const router = new Router({
  // mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  // if (to.path !== '/ship-ticket/zs') {
  //   store.dispatch('wxAccessLogin')
  // }

  // 如果将要跳转的路由需要登录的话
  console.log('to: ', to)
  if (from.path === '/') {
    store.commit('SET_ROUTE_FROM_STATE', false)
  } else {
    store.commit('SET_ROUTE_FROM_STATE', true)
  }

  // 如果URL中包含来源，则将来源存到store内
  if (to.query.fromPlatform) {
    store.commit('SET_FROM_PLATFORM', to.query.fromPlatform)
  }

  if (to.meta.needLogin) {
    // 这里应该判断先是否有token，有token的情况下跳转到后续页面并请求
    if (store.getters.token) {
      next()
    } else {
      // 如果token不存在且存在unionid的时候，让用户绑定手机号码
      if (store.getters.wxUserInfo.unionid && !store.getters.wxUserInfo.mobile) {
        // Vue.$router.push('/bind-telephone')
        next('/bind-telephone')
      } else {
        store.commit('SHOW_LOGIN', {
          success: () => {
            next()
          },
          close: () => {
            // router.back()
          }
        })
      }
    }
  } else {
    next()
  }
  // next()
})

router.afterEach((to) => {
  // Google Analytics supports SPA
  if (window.gtag) {
    // window.ga('set', 'page', to.fullPath)
    // window.ga('send', 'pageview')
    window.gtag('config', 'UA-119312529-1', {
      'page_title': to.meta.title,
      'page_path': to.fullPath
    })
  }

  if (window._hmt) {
    window._hmt.push(['_trackPageview', to.fullPath])
  }

  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = ''
  }
})

export default router
