export const state = () => ({
  states: [],
})

export const mutations = {
  SET_STATES(state, payload) {
    state.states = payload
  }
}

export const getters = {
}

export const actions = {
  async get_states({commit}) {
    let res = await this.$axios.get('states')
    commit('SET_STATES', res.data.results)
  }
}
