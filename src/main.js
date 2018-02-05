// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//webpack的入口!!!!!!

import Vue from 'vue'
import App from './App'   //引入App.vue
import router from './router'  //引入router文件夹？？
import VueRouter from 'vue-router'
import iView from 'iview'   //引入iview
import 'iview/dist/styles/iview.css'    //引入iview的一些css


Vue.config.productionTip = false  //???
Vue.use(VueRouter)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
