<template>
  <div class="navbar" :style="{'background':navbarBackground }">
    <div>
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="breadcrumb-container" />
      <div class="right-menu">
        <template v-if="device!=='mobile'">
          <search v-if="searchShow" id="header-search" class="right-menu-item" :style="{'color':navbarColor }" />
          <screenfull id="screenfull" class="right-menu-item hover-effect" :style="{'color':navbarColor }" />
        </template>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper" :style="{'color':navbarColor }">
            <span>{{ name }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="logout">
              <span style="display: block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/hamburger'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'
// import { setIsUseMasterApiKey, getIsUseMasterApiKey } from '@/utils/auth'
// import Logo from './Sidebar/Logo'

export default {
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull,
    Search
  },
  data () {
    return {
      // isSwitch: process.env.NODE_ENV.includes('development') && getIsUseMasterApiKey() === 'true'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'device'
    ]),
    breadcrumb () {
      return this.$store.state.settings.breadcrumb
    },
    searchShow () {
      return this.$store.state.settings.IsSearch
    },
    navbarBackground () {
      return this.$store.state.settings.navbarBackground
    },
    navbarColor () {
      return this.$store.state.settings.navbarColor
    }
  },
  methods: {
    switchAction () {
      if (process.env.NODE_ENV.includes('development')) {
        this.isSwitch = !this.isSwitch
        // setIsUseMasterApiKey(this.isSwitch)
        window.location.reload()
      }
    },
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/variables.scss";

.select {
  ::v-deep .el-input--suffix .el-input__inner {
    padding-right: 30px;
    height: 33px;
    line-height: 33px;
  }
}

.navbarLogo {
  padding-left: 210px;
}

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
