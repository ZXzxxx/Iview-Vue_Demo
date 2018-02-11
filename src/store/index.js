import Vuex from 'vuex'
import Vue from 'vue'   //引入它是因为要使用Vue.use

// import app from './modules/app';
// import user from './modules/user';

import tableList from './modules/tableList';

Vue.use(Vuex);

//进行模块化构建
const store = new Vuex.Store({

    modules: {  //数据模型
        tableList
        // app,
        // user
    }
});

export default store;   //必须暴露出来，外部才可以找到

