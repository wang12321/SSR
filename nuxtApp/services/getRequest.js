/**
 * @author ff
 * @date 2021/4/28
 * @Description: 配置生成api接口
 * @update by:
 */
import { getIsUseMasterApiKey } from '@/utils/auth' // get token from cookie
import server from './server'
import apiURL from './apiURL'

function myserver () {
  this.server = server
}
myserver.prototype.postData = function (name, urlObj) {
  // 配置不同模块api
  let accounts
  // 当测试环境时,可以切换为正式环境
  if (getIsUseMasterApiKey() === 'true' && process.env.NODE_ENV.includes('development')) {
    accounts = apiURL.production[name]
  } else {
    accounts = ''
  }
  this[name] = {}
  Object.keys(urlObj).forEach((apiName) => {
    // eslint-disable-next-line max-len
    this[name][apiName] = this.sendMes.bind(this, name, apiName, `${accounts}${urlObj[apiName].url}`, urlObj[apiName].type)
  })
}
myserver.prototype.sendMes = function (modeleName, apiName, url, type, dataP, config) {
  // eslint-disable-next-line no-var,no-redeclare
  var config = config || {}
  // eslint-disable-next-line no-redeclare,no-var
  var type = type || 'get'
  let data = dataP || {}
  if (type === 'get' && typeof dataP === 'object') {
    data = { params: dataP }
  }
  if (type === 'delete' && typeof dataP !== 'object') {
    data = { params: { id: dataP } }
  }
  // 处理效果
  const before = function (res) {
    return res
  }
  // 处理数据
  const defaultFn = function (res) {
    return res
  }
  const errer = function (err) {
    return err
  }
  const success = config.success || defaultFn

  if (type === 'get' && typeof data !== 'object') {
    return this.server[type](`${url}/${data}`).then(before).then(success).catch(errer)
  } else if (type === 'put' && typeof data === 'object') {
    return this.server[type](`${url}/${data.id}`, data).then(before).then(success).catch(errer)
  }
  return this.server[type](url, data).then(before).then(success).catch(errer)
}
// eslint-disable-next-line new-cap
export default new myserver()
