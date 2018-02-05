1. webpack的入口文件是main.js
2. 需要有一个最外层的大div包裹着所有的东西，作为根实例的挂载入口，把这个div抽成一个组件，是APP.vue
3. 组件都存放在文件夹views里面，主页面的大框架组件文件是Main.vue
4. 把主页分割成可收缩的左侧菜单[shrinkable-menu]+面包屑[breadcrumb-nav]+组件，存放在src/views/main-components里面
5. 所有的路由跳转都写在 src/router/router.js里面，并在src/router/router.js初次调用，在main.js里面最终调用。
6. 
