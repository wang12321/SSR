// import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth'
import { routerFun } from '@/router/routerName' // get token from cookie
// const whiteList = ['/login'] // no redirect whitelist

export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    // if (process.browser) {
    //    document.title = getPageTitle(to.meta.title)
    // }
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
      } else if (!store.getters.name) {
        const routerData = routerFun(app.router.options.routes)
        store.dispatch('user/getInfo').then((res) => {
          store.dispatch('permission/generateRoutes', { router: routerData, roles: res }).then(() => {
            next()
          })
        })
      } else {
        next()
      }
    } else {
      /* has no token */
      // eslint-disable-next-line no-lonely-if
      next()
    }
  })

  app.router.afterEach((to, from, next) => {
    // 实现自动生成路由配置文件======================================
  })
}
