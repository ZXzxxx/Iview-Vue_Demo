import Vue from 'vue'
import iView from 'iview';
import Router from 'vue-router'
import Table from '@/views/table/crud-table.vue'

Vue.use(Router);   //使用路由

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table-demo',
      component: Table
    }
  ]
})
