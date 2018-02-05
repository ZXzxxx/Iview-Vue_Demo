// import Main from '@/views/Main.vue'


// //不作为Main组件的子页面展示的页面单独写


// //作为Main组件的子页面展示，但不在左侧菜单显示的路由，写在otherRouter里面


// //作为Main组件的子页面展示，并且在左侧菜单显示的路由写在appRouter
// export const appRouter = [
//     {
//         path: '/tableDemo',
//         icon: 'ios-grid-view',
//         name: 'table',
//         title: '表格模板',
//         component: Main,
//         children: [
//             { 
//                 path: 'crudTable', 
//                 title: 'CRUD表格模板', 
//                 name: 'crud-table', 
//                 icon: 'edit', 
//                 component: () => import('@/views/table/crud-table.vue') 
//             },
//             // { 
//             //     path: 'exportableTable', 
//             //     title: '表格导出数据模板', 
//             //     name: 'exportable-table', 
//             //     icon: 'code-download', 
//             //     component: () => import('@/views/tables/exportable-table.vue') 
//             // },
//         ]
//     },
//     {
//         path: '/error-page',
//         icon: 'android-sad',
//         title: '错误页面',
//         name: 'errorpage',
//         component: Main,
//         children: [
//             {
//                 path: 'index', 
//                 title: '错误页面',
//                 name: 'errorpage_index',
//                 component: () => import('@/views/error-page/error-page.vue'),
//             }
//         ]
//     }
// ];

// //所有上面定义的路由都写在下面的routers里面
// export const routers = [
//     ...appRouter,   //里面定义有多个路由
// ];

