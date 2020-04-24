const SceneryTicketDetail = () => import('pages/scenery/detail')
const SceneryTicketBooking = () => import('pages/scenery/booking')
const SceneryTicketPayment = () => import('pages/scenery/payment')
const MapContainer = () => import('pages/map')

export const SceneryDetail = {
  path: 'detail/:id',
  component: SceneryTicketDetail,
  meta: { title: '门票详情' },
  children: [{
    path: 'booking',
    component: SceneryTicketBooking,
    meta: { title: '门票预订' },
    children: [{
      path: 'payment',
      component: SceneryTicketPayment
    }]
  }, {
    path: 'map',
    component: MapContainer,
    props: (route) => ({ ...route.query }),
    meta: { title: '地图' }
  }]
}
