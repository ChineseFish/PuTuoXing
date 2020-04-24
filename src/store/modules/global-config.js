const state = {
  globalConfig: {
    minTicketAmounts: 1,
    timeToDep: 10,
    disableTimePeriodStart: '00:00',
    disableTimePeriodEnd: '06:00'
  }
}

const getters = {
  config: (state) => state.globalConfig
}
export default {
  state,
  getters
}
