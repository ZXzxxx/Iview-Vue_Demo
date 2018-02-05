<!-- 最外层的大组件-->

<template>
  <div id="app" class="app-main">
    <!-- <img src="./assets/logo.png"> -->
    <!-- 这个是啥?为啥必须有-->
    <router-view/>  
  </div>
</template>

<script>
export default {
  name: 'App'  //为什么要有name??哪里用到了
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
