// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//webpack的入口!!!!!!

import Vue from 'vue';
import App from './App';   //引入App.vue
import router from './router';  //引入router路由
import VueRouter from 'vue-router';
import iView from 'iview';   //引入iview
import 'iview/dist/styles/iview.css';    //引入iview的一些css
import store from './store';//把数据中心引入

Vue.config.productionTip = false  //不需要Vue提示信息
Vue.use(VueRouter)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    
  }
})
