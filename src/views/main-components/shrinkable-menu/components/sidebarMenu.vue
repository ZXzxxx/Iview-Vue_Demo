// <!--不收缩的菜单组件-->

// <style lang="less">
//     @import '.././styles/menu.less';
// </style>

// <!--iview之垂直菜单——子菜单内嵌在菜单区域-->
// <template>
//         <!--ref    $refs可以.这个ref就是找到了这个menu
//             active-name  ？？？
//             open-names    ??? 
//             绑定选择菜单项就触发的事件——changeMenu
//         -->
//     <Menu ref="sideMenu" :active-name="$route.name" 
//                          :open-names="openNames" 
//                          width="auto" @on-select="changeMenu">
//         <template v-for="item in menuList">
//             <!-- 这个menuItem干啥？？？？只有一个子菜单或没有-->
//             <!--有相同父元素的子元素必须具有不同的key，相同的key会造成渲染错误，因为vue有虚拟dom的复用性能-->
//             <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
//                 <!--子菜单的图标-->
//                 <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
//                 <!--子菜单的名字-->
//                 <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
//             </MenuItem>

//             <!-- 有多个子菜单-->
//             <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
//                 <template slot="title">
//                     <Icon :type="item.icon" :size="iconSize"></Icon>
//                     <span class="layout-text">{{ itemTitle(item) }}</span>              
//                 </template>
//                 <template v-for="child in item.children">
//                     <MenuItem :name="child.name" :key="'menuitem' + child.name">
//                         <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
//                         <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
//                     </MenuItem>
//                 </template>
//             </Submenu>
//         </template>
//     </Menu>
// </template>

// <script>
// //组件基本属性
// //this.$..是实例属性[查找vue官网API]
// export default {
//     name: 'sidebarMenu',
//     props: { //设置传来的参数的类型
//         menuList: Array,
//         iconSize: Number,
//         openNames: {
//             type: Array
//         },
//     },
//     methods: {
//         changeMenu (active) {
//             //触发当前实例上的事件。附加参数都会传给监听器回调。
//             this.$emit('on-change',active);//自定义父组件调用子组件时，在子组件上绑定的事件
//         },
//         itemTitle (item) {
//             if (typeof item.title == 'object') {
//                 return this.$t(item.title.i18n);//????
//             } else {
//                 return item.title;
//             }
//         }
//     },
//     updated () {
//         //将回调延迟到下次dom更新后
//         this.$nextTick(()=>{
//             if (this.$refs.sideMenu) {
//                 this.$refs.sideMenu.updateOpened(); //手动更新展开的子目录，必须在$nextTick中调用
//             }
//         });
//     }
// };
// </script>


