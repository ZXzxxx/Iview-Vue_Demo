
// <template>
//     <div>
//         <template v-for="(item, index) in menuList">
//             <div style="text-align: center;" :key="index">
//                 <!-- iview之 下拉框 
//                  transfer 是否将下拉框弹框放置于 body 内，默认是false, 建议添加此属性，它将不受父级样式影响，从而达到更好的效果
//                  placement  设置下拉框出现的位置
//                  默认是鼠标悬浮在上面就出现下拉框 
//                  on-click DropdownItem 的 name 值 -->

//                  <!--有多个子菜单-->
//                 <Dropdown transfer v-if="item.children.length!==1" placement="right-start" :key="index" @on-click="changeMenu">
//                     <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
//                         <Icon :size="20" :color="white" :type="item.icon"></Icon>
//                     </Button>
//                     <!--子菜单
//                       slot = “list” 必须这样写 -->                    
//                     <DropdownMenu style="width: 200px;" slot="list">
//                         <template v-for="(child, i) in item.children">
//                             <DropdownItem :name="child.name" :key="i">
//                                 <Icon :type="child.icon"></Icon>
//                                 <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
//                             </DropdownItem>
//                         </template>
//                     </DropdownMenu>
//                 </Dropdown>

//                 <!--没有子菜单    就显示自己-->
//                 <Dropdown transfer v-else placement = "right-start" :key="index" @on-click="changeMenu">
//                     <Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
//                         <Icon :size="20" :color="white" :type="item.children[0].icon || item.icon"></Icon>
//                     </Button>
//                     <DropdownMenu style="width: 200px;" slot="list">
//                         <DropdownItem :name="item.children[0].name" :key="'d' + index">
//                             <Icon :type="item.children[0].icon || item.icon"></Icon>
//                             <span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span>
//                         </DropdownItem>
//                     </DropdownMenu>                    
//                 </Dropdown>
//             </div>
//         </template>
//     </div>
// </template>

// <script>
// export default {
//     name: 'sidebarMenuShrink',
//     props: {
//         menuList: {
//             type: Array
//         },
//     },
//     methods: {
//         changeMenu (active) {
//             this.$emit('on-change', active);
//         },
//         itemTitle (item) {
//             if (typeof item.title === 'object') {
//                 return this.$t(item.title.i18n);
//             } else {
//                 return item.title;
//             }
//         }
//     }
// };
// </script>



