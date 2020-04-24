import { LuxuryBusTicketList, BusTicketList } from './bus-ticket'

const TravelLineTicket = () => import('pages/travel-line-ticket')
const TLTShipList = () => import('pages/travel-line-ticket/ship-list')
const TLTShipDetail = () => import('pages/travel-line-ticket/ship-detail')
const TLTShipPayment = () => import('pages/travel-line-ticket/ship-payment')

export const TravelLineRoute = { // 旅游专线
  path: 'travel-line-ticket/:type',
  component: TravelLineTicket,
  meta: { title: '旅游专线' },
  children: [
    LuxuryBusTicketList,
    BusTicketList,
    {
      path: 'ship-list',
      component: TLTShipList,
      props: (route) => ({ ...route.query }),
      children: [{
        path: 'detail',
        component: TLTShipDetail,
        meta: { title: '旅游专线' },
        props: true,
        children: [{
          path: 'payment',
          component: TLTShipPayment,
          meta: { title: '船票订单' },
          props: (route) => ({ ...route.query })
        }]
      }]
    }
  ]
}

export const TravelLinePaymentQuery = {
  path: 'payment',
  name: 'OrderQueryShip',
  component: TLTShipPayment,
  meta: { title: '船票订单' },
  props: (route) => ({ ...route.query })
}
