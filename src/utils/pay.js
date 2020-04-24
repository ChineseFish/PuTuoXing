/* eslint-disable */
export const wxAppWay = (orderNo, uri, type) => {
  WeChatTongDaPay.showAndroidWXSDKPay(orderNo, uri, type)
}

export const showAndroidCCBPay = (orderNo, price) => {
  WeChatTongDaPay.showAndroidCCBPay(orderNo, price)
}

export const checkAndroidVersion = () => {
  WeChatTongDaPay.checkAndroidVersion()
}

export const jhSDKPay = (orderNo, price, cb) => {
  try {
    cordova.exec((status) => {
      cb(status)
    }, (status) => {
      cb(status)
    }, 
    'LPaymentPlugin',
    'jhNativeSDKPay',
    [orderNo, price])
  } catch (err) {
    jhNativeSDKPay(orderNo, price, cb)
  }
}
