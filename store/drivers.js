import dayjs from "dayjs";
export const state = () => ({
  drivers: [],
  driver: {},
  isLoading: true,
  count: '',
  isShowAddDriver: false,
  isShowEditDriver: false,
  isShowDeleteDriver: false,
  isShowNotify: false,
  history: [],
  isShowDocuments: false,
  documents: {}
})

export const mutations = {
  SET_DRIVERS(state, payload) {
    state.drivers = payload
    state.drivers.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
      item.user_full_name = `${item.user.first_name} ${item.user.last_name}`
    })
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SHOW_ADDDRIVER(state, payload) {
    state.isShowAddDriver = payload
  },
  SHOW_EDITDRIVER(state, payload) {
    state.isShowEditDriver = payload
  },
  SHOW_DELETEDRIVER(state, payload) {
    state.isShowDeleteDriver = payload
  },
  SET_DRIVER(state, payload) {
    state.driver = payload
    // state.driver = Object.assign(state.driver, payload)
  },
  SHOW_NOTIFY(state, payload) {
    state.isShowNotify = payload
  },
  SET_HISTORY(state, payload) {
    state.history = payload
    state.history.map((item) => {
      item.history_date = dayjs(item.history_date).format('YYYY-MM-DD HH:mm')
    })
  },
  SHOW_DOCUMENTS(state, payload) {
    state.isShowDocuments = payload
  },
  SET_DOCUMENTS(state, payload) {
    state.documents = payload
    if(state.documents.length > 0) {
      state.documents = state.documents[0].driver
    } else state.documents = {}
  }
}

export const getters = {
  driversWithoutCodriver(state) {
    return state.drivers.filter((driver) => !driver.co_driver)
  }
}

export const actions = {
  async get_drivers({commit}, search) {
    commit('SET_DRIVERS', [])
    commit('SET_LOADING', true)
    let filter = ''
    for(let key in search) {
      if(search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`drivers/?${filter}`)
    commit('SET_DRIVERS', res.data.results)
    commit('SET_LOADING', false)
    commit('SET_COUNT', res.data.count)
  },
  async create_driver({commit, dispatch}, form) {
    let res = await this.$axios.post('drivers/', form)
    commit('SET_DRIVER', res.data)
    dispatch('get_drivers', {page: 1})
  },
  async change_driver({commit, dispatch}, {id, form}) {
    Object.keys(form).forEach(key => {
      if(typeof form[key] === 'boolean') {
        form[key] = form[key] ? 1 : 0
      }
    })
    let res = await this.$axios.put(`drivers/${id}/`, form)
    commit('SET_DRIVER', res.data)
    dispatch('get_drivers', {page: 1})
  },
  async get_driver({commit}, id) {
    let res = await this.$axios.get(`drivers/${id}/`)
    commit('SET_DRIVER', res.data)
  },
  async delete_driver({commit, dispatch}, id) {
    await this.$axios.delete(`drivers/${id}/`)
    commit('SHOW_DELETEDRIVER', false)
    dispatch('get_drivers')
  },
  async get_history({commit}, id) {
    commit('SET_HISTORY', [])
    commit('SET_LOADING', true)
    let res = await this.$axios.get(`driver-histories/?id=${id}`)
    commit('SET_HISTORY', res.data.results)
    commit('SET_LOADING', false)
  },
  async save_file({dispatch}, {form, id}) {
    const formData = new FormData()
    for(let key in form) {
      formData.append(key, form[key])
    }
    await this.$axios.post('driver-files/', formData)
  },
  async delete_file({dispatch}, {fileId, id}) {
    await this.$axios.delete(`driver-files/${fileId}/`)
    dispatch('get_driver', id)
  },
  async get_documents({commit}, id) {
    commit('SET_DOCUMENTS', {})
    let res = await this.$axios.get(`driver-files/?id=${id}`)
    commit('SET_DOCUMENTS', res.data.results)
  }
}
