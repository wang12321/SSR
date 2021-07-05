import api from '@/services/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    gamelist: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_Gamelist: (state, data) => {
    state.gamelist = data
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    const { login } = api.user
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then((response) => {
        commit('SET_TOKEN', 'data.token')
        setToken('data.token')
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', 'SSR')
      resolve([1, 2, 3])
    })
  },
  Gamelist ({ commit, state }) {
    const { gamelist } = api.user
    return new Promise((resolve, reject) => {
      gamelist().then((response) => {
        const { data } = response
        commit('SET_Gamelist', data)
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  //
  // // user logout
  logout ({ commit, state }) {
    const { logout } = api.user
    return new Promise((resolve, reject) => {
      logout(getToken()).then(() => {
        removeToken() // must remove  token  first
        // resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
