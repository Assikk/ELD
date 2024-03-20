import dayjs from "dayjs";
export const state = () => ({
  vehicles: [],
  vehicle: {},
  count: '',
  isLoading: true,
  isShowAddVehicle: false,
  isShowEditVehicle: false,
  isShowDeleteVehicle: false,
  history: [],
  isShowDocuments: false,
  documents: {}
})

export const mutations = {
  SET_VEHICLES(state, payload) {
    state.vehicles = payload
    state.vehicles.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_VEHICLE(state, payload) {
    state.vehicle = payload
    if(!state.vehicle.annual_inspection_files) {
      state.vehicle.annual_inspection_files = []
    }
    if(!state.vehicle.registration_files) {
      state.vehicle.registration_files = []
    }
    if(!state.vehicle.other_document_files) {
      state.vehicle.other_document_files = []
    }
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDVEHICLE(state, payload) {
    state.isShowAddVehicle = payload
  },
  SHOW_EDITVEHICLE(state, payload) {
    state.isShowEditVehicle = payload
  },
  SHOW_DELETEVEHICLE(state, payload) {
    state.isShowDeleteVehicle = payload
  },
  SET_HISTORY(state, payload) {
    state.history = payload
  },
  SHOW_DOCUMENTS(state, payload) {
    state.isShowDocuments = payload
  },
  SET_DOCUMENTS(state, payload) {
    state.documents = payload
    if(state.documents.length > 0) {
      state.documents = state.documents[0].vehicle
    } else state.documents = {}
  }
}

export const getters = {
  vehiclesWithoutDriver(state) {
    return state.vehicles.filter((vehicle) => vehicle.drivers.length == 0)
  }
}

export const actions = {
  async get_vehicles({commit}, search) {
    commit('SET_VEHICLES', [])
    commit('SET_LOADING', true)
    let filter = ''
    for(let key in search) {
      if(search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`vehicles/?${filter}`)
    commit('SET_VEHICLES', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_vehicle({commit, dispatch}, form) {
    let res = await this.$axios.post('vehicles/', form)
    commit('SET_VEHICLE', res.data)
    dispatch('get_vehicles')
  },
  async get_vehicle({commit}, id) {
    commit('SET_VEHICLE', {})
    let res = await this.$axios.get(`vehicles/${id}/`)
    commit('SET_VEHICLE', res.data)
  },
  async edit_vehicle({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`vehicles/${id}/`, form)
    commit('SET_VEHICLE', res.data)
    dispatch('get_vehicles')
  },
  async delete_vehicle({commit, dispatch}, id) {
    await this.$axios.delete(`vehicles/${id}/`)
    commit('SHOW_DELETEVEHICLE', false)
    dispatch('get_vehicles', {page: 1})
  },
  async save_file({dispatch}, form) {
    const formData = new FormData()
    for(let key in form) {
      formData.append(key, form[key])
    }
    await this.$axios.post('vehicle-files/', formData)
    dispatch('get_vehicle', form.vehicle)
  },
  async delete_file({dispatch}, {fileId, id}) {
    await this.$axios.delete(`vehicle-files/${fileId}/`)
    dispatch('get_vehicle', id)
  },
  async get_history({commit}, id) {
    commit('SET_LOADING', true)
    commit('SET_HISTORY', [])
    let res = await this.$axios.get(`vehicle-histories?id=${id}`)
    commit('SET_HISTORY', res.data.results)
    commit('SET_LOADING', false)
  },
  async get_documents({commit}, id) {
    commit('SET_DOCUMENTS', {})
    let res = await this.$axios.get(`vehicle-files/?id=${id}`)
    commit('SET_DOCUMENTS', res.data.results)
  }
}
