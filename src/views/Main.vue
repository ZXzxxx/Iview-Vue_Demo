// <!--整个大的main框架
//     菜单、头部、显示内容部分被分成三个大的子组件
//     这三个大的子组件又由各自的小组件组件
// -->

// <style lang="less">
//     @import "./main.less";
// </style>

// <template>
// <!-- : class  加个收缩属性 -->
//   <div class="main" :class="{'main-hide-text': shrink}">
//       <!-- 左侧菜单 -->
//       <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
//           <shrinkable-menu 
//               :shrink="shrink"
//               @on-change="handleSubmenuChange"
            
//               :before-push="beforePush"
//               :open-names="openedSubmenuArr"
//               :menu-list="menuList">
//               <div slot="top" class="logo-con">
//                   <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
//                   <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
//               </div>
//           </shrinkable-menu>
//       </div>    

//       <!-- 头部 -->
//       <!--  根据菜单收缩还是没收缩，距离左边的间距不同-->
//         <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
//             <div class="main-header">
//                 <!--头部左侧-->
//                 <div class="navicon-con">
//                     <!--几个杠杠的按钮，控制菜单的收缩还是不收缩-->
//                     <!--css  transform 旋转属性  沿着Z轴3D旋转  deg是旋转度数的单位-->
//                     <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
//                         <Icon type="navicon" size="32"></Icon>
//                     </Button>
//                 </div>
//                 <!--头部  首页/菜单1/菜单11 ———— 面包屑 -->
//                 <div class="header-middle-con">  
//                     <div class="main-breadcrumb">
//                         <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
//                     </div>
//                 </div>
//                 <div class="header-avator-con">
//                     <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
//                     <lock-screen></lock-screen>
//                     <message-tip v-model="mesCount"></message-tip>
//                     <theme-switch></theme-switch>
                    
//                     <div class="user-dropdown-menu-con">
//                         <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
//                             <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
//                                 <a href="javascript:void(0)">
//                                     <span class="main-user-name">{{ userName }}</span>
//                                     <Icon type="arrow-down-b"></Icon>
//                                 </a>
//                                 <DropdownMenu slot="list">
//                                     <DropdownItem name="ownSpace">个人中心</DropdownItem>
//                                     <DropdownItem name="loginout" divided>退出登录</DropdownItem>
//                                 </DropdownMenu>
//                             </Dropdown>
//                             <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
//                         </Row>
//                     </div>
//                 </div>
//             </div>
//             <div class="tags-con">
//                 <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
//             </div>
//         </div>


//   </div>
// </template>

// <script>
// import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';  

// export default {
  
// }
// </script>


