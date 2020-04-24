import { zeroFill } from './zero-fill'
import { isDate } from './type-judgement'

export const formartDateTime = (input, type) => {
  return `${formatDateYYMMDD(input)} ${formatDateHHMMSS(input)}`
}

export const formatDateMMDD = (input, separator) => {
  let time = covertToDate(input)

  const month = zeroFill(time.getMonth() + 1)
  const date = zeroFill(time.getDate())
  if (separator === '-') {
    return `${month}-${date}`
  }
  if (separator === '/') {
    return `${month}/${date}`
  }
  return `${month}月${date}日`
}

export const formatDateYYMMDD = (input) => {
  let time = covertToDate(input)

  const year = time.getFullYear()
  const month = zeroFill(time.getMonth() + 1)
  const date = zeroFill(time.getDate())

  return `${year}-${month}-${date}`
}

export const formatDateHHMM = (input) => {
  let time = covertToDate(input)

  const hours = zeroFill(time.getHours())
  const minutes = zeroFill(time.getMinutes())

  return `${hours}:${minutes}`
}

export const formatDateHHMMSS = (input) => {
  let time = covertToDate(input)

  const hours = zeroFill(time.getHours())
  const minutes = zeroFill(time.getMinutes())
  const second = zeroFill(time.getSeconds())

  return `${hours}:${minutes}:${second}`
}

export const formatDateMMSS = (input) => {
  let time = covertToDate(input)

  const minutes = zeroFill(time.getMinutes())
  const second = zeroFill(time.getSeconds())

  return `${minutes}:${second}`
}

export const formatDuringTimeHHMM = (input) => {
  let time = covertToDate(input).getTime() / 1000

  const hours = parseInt(time / (60 * 60))
  const minutes = parseInt((time - hours * 60 * 60) / 60)

  return `${hours}小时${minutes}分`
}

export const getWeekday = (input) => {
  let time = covertToDate(input)

  const weekdayArr = ['日', '一', '二', '三', '四', '五', '六']
  return `周${weekdayArr[time.getDay()]}`
}

const covertToDate = (input) => {
  if (!input) {
    return new Date()
  }

  if (!isDate(input)) {
    try {
      return new Date(input)
    } catch (err) {
      console.error(`${input} cannot be convert to Date.`)
      return new Date()
    }
  }
  return input
}

// 类似09:50格式的时间转化成多少分钟，以比较先后
export const HHMMtoMinutes = (HHMM) => {
  let arr = HHMM.split(':')
  return 60 * parseInt(arr[0]) + parseInt(arr[1])
}
