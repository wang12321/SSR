<template>
  <div :class="classObj" class="app-wrapper">
    <div>
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div>
        <div class="app-main">
          <nuxt :keep-alive="true" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import { routerFun } from '@/router/routerName'
import { getToken } from '@/utils/auth' // get token from cookie

export default {
  name: 'Default',
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {
      routerData: []
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    fixedHeader () {
      return this.$store.state.settings.fixedHeader
    },
    device () {
      return this.$store.state.app.device
    },
    classObj () {
      // console.log(this.sidebar)
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted () {
    if (getToken()) {
      this.routerData = routerFun(this.$router.options.routes)
      this.$store.dispatch('user/getInfo').then((res) => {
        this.$store.dispatch('permission/generateRoutes', { router: this.routerData, roles: res }).then((row) => {
          console.log(2222, row)
        })
      })
    } else {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/mixin.scss";

@import "../assets/variables.scss";
@import "../assets/index.scss";
//.sidebar-container {
//  position: fixed;
//  top: 0;
//  bottom: 0;
//  left: 0;
//  z-index: 1001;
//  width: $sideBarWidth !important;
//  height: 100%;
//  overflow: hidden;
//  font-size: 0;
//  background-color: $menuBg;
//  transition: width .28s;
//
//  // reset element-ui css
//  .horizontal-collapse-transition {
//    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
//  }
//}

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;

  @include clearfix;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .3;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width .28s;
}

.fixed-header-layout {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width .28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}

.hasTagsView {

  .app-main {
    min-height: calc(100vh - 100px);
  }

  .fixed-header+.app-main {
    padding-top: 100px;
  }
}
.app-main {
  /*50 = navbar  */
  //min-height: calc(100vh - 60px);
  width: 100%;
  position: absolute;
  overflow: hidden;
  text-align: left;
  margin-top: 55px;
}
</style>
