/**
 * @author ff
 * @date 2021/4/28
 * @Description:api接口管理
 * @update by:
 */

import myserver from '@/services/getRequest'

const user = {
  login: {
    url: 'user/login',
    type: 'post'
  },
  getInfo: {
    url: 'user/info',
    type: 'get'
  },
  gamelist: {
    url: 'user/gamelist',
    type: 'get'
  },
  logout: {
    url: 'user/logout',
    type: 'post'
  },
  getPageMenu: {
    url: 'user/menu',
    type: 'post'
  }

}
myserver.postData('user', user)
export default myserver
