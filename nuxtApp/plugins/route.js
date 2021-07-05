// import getPageTitle from '@/utils/get-page-title'

import { getToken } from '@/utils/auth' // get token from cookie
// const whiteList = ['/login'] // no redirect whitelist

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      /* has no token */
      // eslint-disable-next-line no-lonely-if
      next()
    }

    // if (process.browser) {
    //   console.log(to)
    //   console.log(process.browser, document)
    //   // document.title = getPageTitle(to.meta.title)
    // }
  })

  app.router.afterEach((to, from, next) => {
    // 实现自动生成路由配置文件======================================
  })
}
