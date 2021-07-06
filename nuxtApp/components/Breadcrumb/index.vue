<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <a v-if="index === 0" :style="{'color':navbarColor }" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        <span v-else class="no-redirect" :style="{'color':navbarColor }">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { routerFun } from '@/router/routerName'
import getPageTitle from '@/utils/get-page-title'
export default {
  data () {
    return {
      levelList: null
    }
  },
  computed: {
    navbarColor () {
      return this.$store.state.settings.navbarColor
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      const routerData = routerFun(this.$router.options.routes)
      let router = []
      routerData.forEach((item) => {
        if (this.$route.path.includes(item.path)) {
          item.children.forEach((childrenItem) => {
            if (this.$route.path === childrenItem.path && item.path !== '') {
              router = [item, childrenItem]
            }
          })
        }
      })
      if (router.length === 0) {
        router = this.$route.matched
      }

      let matched = router.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
      }

      // 处理动态显示title
      if (process.browser) {
        document.title = getPageTitle(matched[matched.lastIndex].meta.title)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      const name = (route && route.name) || (route && route.children && route.children[0].name)
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'index'.toLocaleLowerCase()
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
