export const state = () => ({
  maintenances: [
    {
      id: 1,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 2,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 3,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 4,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 5,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 6,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 7,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 8,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 9,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
    {
      id: 10,
      name: 'Jane Cooper',
      vehicle: '990',
      model: 'Volvo / VNL',
      vin: '4V4NC9EH6PN609725',
      notes: '990'
    },
  ],
  isLoading: false,
  count: 50,
  isShowAddMaintenance: false,
  isShowEditMaintenance: false,
  isShowDeleteMaintenance: false,
  isShowServices: false,
  services: [
    {
      id: 1,
      name: 'Service mileage',
      serviceDate: '2023-12-15',
      nextService: '2023-12-15',
      status: 'Approved'
    },
    {
      id: 2,
      name: 'Service mileage',
      serviceDate: '2023-12-15',
      nextService: '2023-12-15',
      status: 'End soon'
    },
    {
      id: 3,
      name: 'Service mileage',
      serviceDate: '2023-12-15',
      nextService: '2023-12-15',
      status: 'Expired'
    },
    {
      id: 4,
      name: 'Service mileage',
      serviceDate: '2023-12-15',
      nextService: '2023-12-15',
      status: 'Expired'
    },
    {
      id: 5,
      name: 'Service mileage',
      serviceDate: '2023-12-15',
      nextService: '2023-12-15',
      status: 'Expired'
    },
    {
      id: 6,
      name: 'Service mileage',
      serviceDate: '2023-12-15',
      nextService: '2023-12-15',
      status: 'Expired'
    },
    {
      id: 7,
      name: 'Service mileage',
      serviceDate: '2023-12-15',
      nextService: '2023-12-15',
      status: 'End soon'
    },
  ]
})

export const mutations = {
  SET_MAINTENANCES(state, payload) {
    state.maintenances = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SHOW_ADDMAINTENANCE(state, payload) {
    state.isShowAddMaintenance = payload
  },
  SHOW_EDITMAINTENANCE(state, payload) {
    state.isShowEditMaintenance = payload
  },
  SHOW_DELETEMAINTENANCE(state, payload) {
    state.isShowDeleteMaintenance = payload
  },
  SHOW_SERVICES(state, payload) {
    state.isShowServices = payload
  }
}

export const getters = {
}

export const actions = {
}
