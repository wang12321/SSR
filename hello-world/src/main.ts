import Vue from 'vue'
import App from './App.vue'
import createRouter from "./router";
// import createStore from "./store";
// import { sync } from "vuex-router-sync";

Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

export function createApp() {
  // 创建 router
  const router = createRouter();
  const app = new Vue({
    router,
    render: (h) => h(App),
  });
  return { app, router };
}
