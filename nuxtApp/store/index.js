import request from '~/common/request'
import { menuEach, menuRecursion } from '~/common/common'

export const state = () => ({
  token: '',
  menusList: [],
  curMenu: null,
  breadcrumb: [],
  tagsView: []
})

export const getters = {
  menus (state) {
    const list = state.menusList
    const menus = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].parentId === 0) {
        menus.push({
          index: list[i],
          value: menuRecursion(list, list[i])
        })
      }
    }
    return menus
  },
  menuActive (state) {
    return state.curMenu ? state.curMenu.menuId + '' : '0-0'
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
    request.defaults.headers.common.token = token
  },
  removeToken (state) {
    state.token = ''
    sessionStorage.setItem('token', '')
    request.defaults.headers.common.token = ''
  },
  setMenus (state, data) {
    state.menusList = data.list
  },
  setCurMenu (state, route) {
    if (route.name === 'index') {
      state.curMenu = null
      return
    }
    const menus = state.menusList
    for (let i = 0; i < menus.length; i++) {
      if ((route.name === 'frame' && menus[i].url === route.query.url) || route.path.slice(1) === menus[i].url) {
        state.curMenu = menus[i]
        break
      }
    }
  },
  setBreadcrumb (state) {
    const level = []
    if (state.curMenu) {
      level.push(state.curMenu)
      menuEach(state.menusList, state.curMenu, level)
      state.breadcrumb = level.reverse()
    } else {
      state.breadcrumb = []
    }
  },
  setTagsView (state) {
    if (state.curMenu) {
      let flag = true
      // eslint-disable-next-line array-callback-return
      state.tagsView.map((v) => {
        v.menuId === state.curMenu.menuId && (flag = false)
      })
      flag && state.tagsView.push(state.curMenu)
    }
  },
  removeTagView (state, menu) {
    const i = state.tagsView.indexOf(menu)
    console.log('i', i)
    if (i !== -1) {
      state.tagsView.splice(i, 1)
    }
  }
}

export const actions = {
  async login ({ commit }, params) {
    const data = await request.post('sys/login', params)
    data && commit('setToken', data.token)
  },
  async getMenus ({ commit }) {
    const data = await request.get('/sys/menu/list')
    data && commit('setMenus', data)
  },
  async logout ({ commit }) {
    await request.get('/sys/logout')
    commit('removeToken')
  }
}
