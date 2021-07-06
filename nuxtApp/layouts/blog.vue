<template>
  <div>
    <el-header class="header_blog">
      <div class="header_title_blog">
        <img src="@/static/icon.png" alt="">
        <span>FF个人博客</span>
      </div>
      <div class="header_menu_blog">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <nuxt-link to="/blog">
              首页
            </nuxt-link>
          </el-menu-item>
          <el-submenu index="2">
            <template #title>
              我的工作台
            </template>
            <el-menu-item index="2-1">
              <nuxt-link to="/">
                VUE
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <nuxt-link to="/">
                React
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <nuxt-link to="/">
                Node
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <nuxt-link to="/">
                IOS
              </nuxt-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <nuxt-link to="/blog/blog_message">
              消息中心
            </nuxt-link>
          </el-menu-item>
          <el-menu-item index="4">
            <nuxt-link to="/">
              旅游中心
            </nuxt-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="header_dr_blog">
        <nuxt-link to="/login">
          <span>登录/注册</span>
        </nuxt-link>
      </div>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data () {
    return {
      activeIndex: '1'
    }
  },
  mounted () {
    console.log(this.$route)
    if (this.$route.path.includes('/blog_message')) {
      this.activeIndex = '3'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>

<style lang="scss" scoped>
.el-menu.el-menu--horizontal{
  border-bottom:none;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none;
  font-weight: bold;
  color: red;
}
.el-menu-item{
  color: #fff;
}

.el-menu{
  background-color: rgba(0,0,0,0);
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 60px;
    line-height: 60px;
    border-bottom: 2px solid transparent;
    color: #FFF;
  }
}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  background-color: rebeccapurple;
  color: #fff;
}
.header_blog{
  background-color: #015a9e;
  position: relative;
  .header_title_blog{
    height: 60px;
    line-height: 60px;
    color: #fff;
    font-weight: bold;
  }
  .header_title_blog img{
    width: 60px;
    height: 60px;
    float: left;
  }
}
.header_dr_blog{
  position: absolute;
  width: 100px;
  height: 60px;
  right: 0px;
  top: 0px;
  line-height: 60px;
  font-size: 14px;
  color: #fff;
}

.header_menu_blog{
  position: absolute;
  width: 500px;
  height: 60px;
  right: 100px;
  top: 0px;
  line-height: 60px;
  font-size: 14px;
}

</style>
