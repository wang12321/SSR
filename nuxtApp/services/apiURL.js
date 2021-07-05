/**
   * @author ff
   * @date 2021/4/28
   * @Description:apiURL配置
   * @update by:
   */

const development = {
  UnifiedLogin: 'http://login.xq5.com',
  user: '/apics/'
}
const developmentsw = {
  UnifiedLogin: 'http://login.xq668.com',
  user: '/apiswcs/'
}
const developmentnew = {
  UnifiedLogin: 'http://login.xq556.com',
  user: '/apinewcs/'

}
const production = {
  UnifiedLogin: 'http://login.xq5.com',
  user: '/api/'

}
const productionnew = {
  UnifiedLogin: 'http://login.xq556.com',
  user: '/apinew/'

}
const productionsw = {
  UnifiedLogin: 'http://login.xq668.com',
  user: '/apisw/'

}
module.exports = {
  development,
  developmentsw,
  developmentnew,
  production,
  productionnew,
  productionsw
}
