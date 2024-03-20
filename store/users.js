export const state = () => ({
  users: [
    {
      id: 1,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 2,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 3,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 4,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 5,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 6,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 7,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 8,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 9,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
    {
      id: 10,
      name: 'Jane Cooper',
      ID: 'Admin',
      email: 'example@gmail.com',
      phone: '1232424324'
    },
  ],
  isLoading: false,
  count: 50,
  isShowAddUser: false,
  isShowEditUser: false,
  isShowDeleteUser: false
})

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SHOW_ADDUSER(state, payload) {
    state.isShowAddUser = payload
  },
  SHOW_EDITUSER(state, payload) {
    state.isShowEditUser = payload
  },
  SHOW_DELETEUSER(state, payload) {
    state.isShowDeleteUser = payload
  }
}

export const getters = {
}

export const actions = {
}
