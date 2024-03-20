export const state = () => ({
  models: [],
})

export const mutations = {
  SET_MODELS(state, payload) {
    state.models = payload
  }
}

export const getters = {
}

export const actions = {
  async get_models({commit}) {
    let res = await this.$axios.get('vehicle-models')
    commit('SET_MODELS', res.data.results)
  }
}
