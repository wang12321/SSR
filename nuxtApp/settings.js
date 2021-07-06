module.exports = {
  logo: 'component', // 配置logo 只处理了svg的
  title: 'Nuxt FF', // 配置title
  breadcrumb: false, // 配置面包屑
  IsSearch: true, // 配置菜单搜索
  fixedHeader: true, // 是否固定头部导航栏
  sidebarLogo: true, // 是否显示Logo和title
  navbarBackground: '#324151', // 头部导航栏背景颜色
  navbarColor: '#fff', // 头部导航栏字体和图标颜色

  isSwitchEnvironment: process.env.NODE_ENV.includes('development') // 是否切换环境
}
