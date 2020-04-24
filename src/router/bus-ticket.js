import BusTicketPayment from 'pages/bus-pay'

const BusList = () => import('pages/bus-ticket/bus/bus-list')
const PlaneBusList = () => import('pages/bus-ticket/plane-bus/plane-bus-list')
const LuxuryBusList = () => import('pages/bus-ticket/luxury-bus/luxury-bus-list')
const BusOrder = () => import('pages/bus-order')
// const BusTicketPayment = import('pages/bus-pay')
const MapContainer = () => import('pages/map')
const BusLineInquire = () => import('pages/line-inquire/bus')
const BusTicketIndex = () => import('pages/bus-ticket')

export const BusTicketPaymentQuery = {
  path: 'payment',
  name: 'OrderQueryBus',
  component: BusTicketPayment,
  meta: { title: '大巴订单' },
  props: (route) => ({ ...route.query })
}

export const BusTicketList = {
  path: 'list',
  component: BusList,
  meta: { title: '大巴票预订-普通大巴' },
  props: (route) => ({ ...route.query }),
  children: [
    {
      path: 'order',
      component: BusOrder,
      props: true,
      meta: { title: '大巴票预订-普通大巴' },
      children: [
        {
          path: 'map',
          component: MapContainer,
          meta: { title: '车站地图' },
          props: (route) => ({ ...route.query })
        },
        {
          path: 'payment',
          component: BusTicketPayment,
          meta: { title: '大巴订单' },
          props: (route) => ({ ...route.query })
        }
      ]
    }
  ]
}

export const LuxuryBusTicketList = {
  path: 'luxury-bus-list',
  component: LuxuryBusList,
  meta: { title: '大巴票预订-豪华大巴' },
  props: (route) => ({ ...route.query }),
  children: [
    {
      path: 'order',
      component: BusOrder,
      meta: { title: '大巴票预订-豪华大巴' },
      props: true,
      children: [
        {
          path: 'map',
          component: MapContainer,
          meta: { title: '车站地图' },
          props: (route) => ({ ...route.query })
        },
        {
          path: 'payment',
          component: BusTicketPayment,
          meta: { title: '豪华大巴订单' },
          props: (route) => ({ ...route.query })
        }
      ]
    }
  ]
}

export const PlaneBusTicketList = {
  path: 'plane-bus-list',
  name: 'PlaneBusList',
  component: PlaneBusList,
  meta: { title: '大巴票预订-机场大巴' },
  props: (route) => ({ ...route.query }),
  children: [
    {
      path: 'order',
      name: 'PlaneBusOrder',
      component: BusOrder,
      meta: { title: '大巴票预订-机场大巴' },
      props: true,
      children: [
        {
          path: 'map',
          component: MapContainer,
          meta: { title: '车站地图' },
          props: (route) => ({ ...route.query })
        },
        {
          path: 'payment',
          component: BusTicketPayment,
          meta: { title: '机场大巴订单' },
          props: (route) => ({ ...route.query })
        }
      ]
    }
  ]
}

export const BusTicket = { // 大巴票
  path: '/bus-ticket',
  name: 'BusTicketIndex',
  component: BusTicketIndex,
  meta: { title: '大巴票预订' },
  children: [
    BusTicketList,
    PlaneBusTicketList,
    LuxuryBusTicketList,
    {
      path: 'bus-line-inquire',
      name: 'BusLineInquire',
      component: BusLineInquire,
      meta: { title: '大巴票线路查询' }
    }
  ]
}
