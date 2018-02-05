// <style lang="less">
//     @import '../styles/menu.less';
// </style>

// <!--可收缩菜单-->
// <template>
//     <div class="ivu-shrinkable-menu">
//         <!--此处是插入一个logo-->
//         <slot name="top"></slot><!--具名插槽：父组件，标签标注slot为该slot的name的内容，插入此处-->
//         <sidebar-menu 
//             v-show="!shrink"  
//             :menu-list="menuList"
//             :open-names="openNames"
//             @on-change="handleChange"> <!--这个和sidebarMenu组件中定义的实例方法名要对应-->
//         </sidebar-menu>
//         <sidebar-menu-shrink
//             v-show="shrink"
//             :menu-list="menuList"
//             @on-change="handleChange">
//         </sidebar-menu-shrink>
//     </div>
// </template>

// <script>
// import sidebarMenu from './components/sidebarMenu.vue';
// import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
// export default {
//     name: 'shrinkableMenu',
//     components: {
//         sidebarMenu,
//         sidebarMenuShrink
//     },
//     props: {
//         shrink: {
//             type: Boolean,
//             default: false       
//         },
//         menuList: {
//             type: Array,
//             required: true //必须传的参数
//         },
//         beforePush: {  //????
//             type: Function
//         },
//         openNames: {
//             type: Array
//         }
//     },
//     // computed: {   //计算属性
//         // bgColor () {
//         //     return this.theme === 'dark' ? '#495060' : '#fff';
//         // },
//         // shrinkIconColor () {
//         //     return this.theme === 'dark' ? '#fff' : '#495060';
//         // }        
//     // },
//     methods: {
//         handleChange (name) {   //?????
//             let willpush = true;  //???
//             if (this.beforePush !== undefined) {
//                 if(!this.beforePush(name)){
//                     willpush = false;
//                 }
//             }
//             if (willpush) {
//                 this.$router.push({  //????
//                     name: name
//                 });
//             }
//             this.$emit('on-change', name);
//         }
//     }

// }
// </script>


