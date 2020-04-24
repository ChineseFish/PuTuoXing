import { formatDateYYMMDD } from './date-format'
export const getStrLen = (str) => {
  let len = 0
  for (let index in str) {
    let charCode = str.charCodeAt(index)
    len += (charCode >= 0x0001 && charCode <= 0x007e) ||
      (charCode >= 0xff60 && charCode <= 0xff9f) ? 1 : 2
  }
  return len
}

export const getUrlQuery = (key) => {
  const pattern = new RegExp(`[\\?&#]${key}=([^&#]+)`)
  const ma = location.search.match(pattern)

  return ma ? ma[1] : ma
}

export const isDayAfter = (nowDate, day = 1) => {
  const oneDayMSeconds = 24 * 60 * 60 * 1000
  const newDate = new Date((+new Date() + oneDayMSeconds * day))
  console.log(formatDateYYMMDD(newDate))
  return nowDate === formatDateYYMMDD(newDate)
}
