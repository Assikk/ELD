export const state = () => ({
  logs: [],
  log: {},
  isLoading: true,
  count: ''
})

export const mutations = {
  SET_LOGS(state, payload) {
    state.logs = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_LOG(state, payload) {
    state.log = payload
  }
}

export const getters = {
}

export const actions = {
  async get_logs({commit}, search) {
    commit('SET_LOGS', [])
    commit('SET_LOADING', true)
    let filter = ''
    for(let key in search) {
      if(search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`logs/?${filter}`)
    commit('SET_LOGS', res.data.results)
    commit('SET_LOADING', false)
    commit('SET_COUNT', res.data.count)
  },
  async get_log({commit}, id) {
    let res = await this.$axios.get(`trips/${id}/`)
    commit('SET_LOG', res.data)
  }
}
