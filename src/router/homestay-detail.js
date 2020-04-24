const HomestayTicketDetail = () => import('pages/homestay/detail')
const HomestayTicketBooking = () => import('pages/homestay/booking')
const HomestayTicketPayment = () => import('pages/homestay/payment')
const HomestayImagesInfo = () => import('pages/homestay/more-images')
const MapContainer = () => import('pages/map')

export const HomestayDetail = {
  path: '/homestay/detail/:id',
  component: HomestayTicketDetail,
  meta: { title: '民宿预订详情' },
  children: [{
    path: '/homestay/more-images',
    meta: { title: '更多民宿图片' },
    component: HomestayImagesInfo
  }, {
    path: 'booking',
    component: HomestayTicketBooking,
    meta: { title: '民宿预订确认' },
    children: [{
      path: 'payment',
      component: HomestayTicketPayment,
      meta: { title: '民宿支付' }
    }]
  }, {
    path: '/homestay/map',
    component: MapContainer,
    meta: { title: '地图' },
    props: (route) => ({ ...route.query })
  }]
}

export const HomestayTicketPaymentQuery = {
  path: 'payment',
  name: 'OrderQueryHomestay',
  component: HomestayTicketPayment,
  meta: { title: '民宿订单' },
  props: (route) => ({ ...route.query })
}
