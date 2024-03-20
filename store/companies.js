export const state = () => ({
  companies: [
    {
      id: 1,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 2,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 3,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 4,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 5,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 6,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 7,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 8,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 9,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
    {
      id: 10,
      name: 'Fins Transportation Inc',
      address: 'VEHICLEID changed from N/A to 990',
      usdot: '2985220',
      phone: '453456465456',
    },
  ],
  isLoading: false,
  count: 50,
  isShowAddCompany: false,
  isShowEditCompany: false,
  isShowDeleteCompany: false
})

export const mutations = {
  SET_COMPANIES(state, payload) {
    state.maintenances = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SHOW_ADDCOMPANY(state, payload) {
    state.isShowAddCompany = payload
  },
  SHOW_EDITCOMPANY(state, payload) {
    state.isShowEditCompany = payload
  },
  SHOW_DELETECOMPANY(state, payload) {
    state.isShowDeleteCompany = payload
  }
}

export const getters = {
}

export const actions = {
}
