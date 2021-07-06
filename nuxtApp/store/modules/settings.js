import defaultSettings from '@/settings'

const state = {
  fixedHeader: defaultSettings.fixedHeader,
  sidebarLogo: defaultSettings.sidebarLogo,
  logo: defaultSettings.logo,
  title: defaultSettings.title,
  breadcrumb: defaultSettings.breadcrumb,
  IsSearch: defaultSettings.IsSearch,
  navbarBackground: defaultSettings.navbarBackground,
  navbarColor: defaultSettings.navbarColor,
  NODE_ENV: process.env.NODE_ENV,

  isSwitchEnvironment: defaultSettings.isSwitchEnvironment
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
