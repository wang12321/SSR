<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}" :style="{'background':!Layout?navbarBackground:variables.menuBg }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <svg-icon v-if="logo" :icon-class="logo" class="sidebar-logo sidebar-logo-collapse" :style="{'color':!Layout?navbarColor:variables.menuText}" />
        <h1 v-else class="sidebar-title" :style="{'color':!Layout?navbarColor:variables.menuText}">
          {{ title }}
        </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <svg-icon v-if="logo" :icon-class="logo" class="sidebar-logo" :style="{'color':!Layout?navbarColor:variables.menuText}" />
        <h1 class="sidebar-title" :style="{'color':!Layout?navbarColor:variables.menuText}">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import variables from '@/assets/variables.scss'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    logo () {
      return this.$store.state.settings.logo
    },
    navbarBackground () {
      return this.$store.state.settings.navbarBackground
    },
    navbarColor () {
      return this.$store.state.settings.navbarColor
    },
    title () {
      return this.$store.state.settings.title
    },
    Layout () {
      return this.$store.state.settings.Layout
    },
    variables () {
      return variables
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo-collapse {
      margin-left: 12px;
    }

    & .sidebar-logo {
      width: 22px;
      height: 16px;
      color: #fff;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      //margin-right: 0;
    }
  }
}
</style>
