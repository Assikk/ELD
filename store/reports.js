export const state = () => ({
  reports: [],
  isLoading: false,
  count: null
})

export const mutations = {
  SET_REPORTS(state, payload) {
    state.reports = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  }
}

export const getters = {
}

export const actions = {
}
