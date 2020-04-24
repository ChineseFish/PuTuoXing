import Vue from 'vue'
import { formatDateHHMM, formatDateMMDD, getWeekday, formatDuringTimeHHMM, formartDateTime } from '../utils/date-format'

export const timeFormat = Vue.filter('timeFormat', (time) => {
  return formatDateHHMM(time)
})

export const dateTimeFormat = Vue.filter('dateTimeFormat', (time) => {
  return formartDateTime(time)
})

export const dateFormat = Vue.filter('dateFormat', (date, formatType) => {
  return formatDateMMDD(date)
})

export const weekdayFormat = Vue.filter('weekdayFormat', (time) => {
  return getWeekday(time)
})

export const duringTimeFormat = Vue.filter('duringTimeFormat', (time) => {
  return formatDuringTimeHHMM(time)
})
