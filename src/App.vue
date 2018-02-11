<!-- 最外层的大组件-->

<template>
  <div id="app" class="app-main">
    <!-- <img src="./assets/logo.png"> -->
    <!-- router-view指的是路由下的数据，用来展示当前下面路由所利用的组件
        子页面的内容注入到  router-view中 -->
    <router-view/>  
  </div>
</template>

<script>
export default {
  // name: 'App'  //为什么要有name??哪里用到了
}
</script>

<style>
/* 最外层有的样式，里面的肯定也能用 */
html,body{
    width: 100%;
    height: 100%;
    background: #fcfcfc;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
