import Vue from 'vue'
import iView from 'iview';
import Router from 'vue-router'
import crudTable from '@/views/table_view/CrudTableBody.vue'

Vue.use(Router);   //使用路由

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table-demo',
      component: crudTable
    }
  ]
})
