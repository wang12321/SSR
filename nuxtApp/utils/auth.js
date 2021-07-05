import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_zonst_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

const preSetLocalStorageKey = 'preSetLocalStorage'
export function setPreSetLocalStorage (data) {
  return Cookies.set(preSetLocalStorageKey, data)
}
export function getPreSetLocalStorage () {
  return Cookies.get(preSetLocalStorageKey)
}

// 切换环境
const isUseMasterApiKey = 'isUseMasterApiKey'
export function setIsUseMasterApiKey (data) {
  return Cookies.set(isUseMasterApiKey, data)
}
export function getIsUseMasterApiKey () {
  return Cookies.get(isUseMasterApiKey)
}

const isGameIdKey = 'isGameIdKey'
export function setIsGameIdKey (data) {
  return Cookies.set(isGameIdKey, data)
}
export function getIsGameIdKey () {
  return Cookies.get(isGameIdKey)
}
