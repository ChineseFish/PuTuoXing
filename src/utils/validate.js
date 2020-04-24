export const verifyPassenger = (passengers) => {
  if ((Object.prototype.toString.call(passengers) === '[object Array]' &&
    passengers.length === 0) || !passengers) {
    throw new Error('请添加乘客')
  }

  let childCnt = 0
  for (let passenger of passengers) {
    if (passenger.name.length < 2 || containNum(passenger.name)) {
      throw new Error('乘客姓名格式不符合要求')
    }

    // 儿童计数
    passenger.passengerType === 2 && ++childCnt
  }

  if (childCnt * 2 > passengers.length) {
    throw new Error('乘客儿童票不得少于成人票')
  }
}

export const verifyCollector = (collector) => {
  if (!collector) {
    throw new Error('请将联系人信息填写完整')
  } else if (Object.prototype.toString.call(collector) === '[object Object]') {
    for (const key in collector) {
      if (!collector[key]) {
        throw new Error('请将联系人信息填写完整')
      }
    }
  }

  if (!collector.name || collector.name.length < 2 || containNum(collector.name)) {
    throw new Error('联系人的姓名格式不符合要求')
  }
}

const containNum = (param) => {
  const reg = /\d+/
  return reg.test(param)
}
