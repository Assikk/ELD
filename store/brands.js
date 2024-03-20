export const state = () => ({
  brands: [],
})

export const mutations = {
  SET_BRANDS(state, payload) {
    state.brands = payload
  }
}

export const getters = {
}

export const actions = {
  async get_brands({commit}) {
    let res = await this.$axios.get('vehicle-brands')
    commit('SET_BRANDS', res.data.results)
  }
}
