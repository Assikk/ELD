export const state = () => ({
  devices: [],
})

export const mutations = {
  SET_DEVICES(state, payload) {
    state.devices = payload
  },
}

export const getters = {
}

export const actions = {
  async get_devices({commit}) {
    let res = await this.$axios.get('eld-devices')
    commit('SET_DEVICES', res.data.results)
  }
}
