// import {appRouter} from '@/router/router';
// import Util from '@/libs/util';  
// import Cookies from 'js-cookie';
// import Vue from 'vue';

// const app = {
//     state: {
//         cachePage: [],
//         lang: '',    //??语言
//         openedSubmenuArr: [], // 要展开的菜单数组
//      //   menuTheme: 'dark', // 主题   【更改这里，就可以更改菜单的颜色主题】
//      //   themeColor: '', // 主题颜色
//         pageOpenedList: [{   //???这是打开的首页面????
//             title: '首页',
//             path: '',
//             name: 'home_index'
//         }],
//         currentPageName: '',  //当前页面名称???
//         currentPath: [        //当前路径
//             {
//                 title: '首页',
//                 path: '',
//                 name: 'home_index'
//             }
//         ], 
//         menuList: [],   //菜单项的数组
//         routers: [      //路由
//             ...appRouter   //菜单项路由
//         ],
//         // tagsList: [...otherRouter.children],//???tab标签吗???
//         // messageCount: 0,  //???
//         // dontCache: ['text-editor', 'artical-publish'] // ???在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
//     },
//     mutations: {
//         // setTagsList (state, list) {
//         //     state.tagsList.push(...list);
//         // },
//         updateMenulist (state) {
//             // let accessCode = parseInt(Cookies.get('access'));
//             let menuList = [];   //存放菜单项的数组
//             appRouter.forEach((item, index) => {   //遍历appRouter路由
//                 if (item.access !== undefined) {
//                     if (Util.showThisRoute(item.access, accessCode)) {
//                         if (item.children.length === 1) {
//                             menuList.push(item);
//                         } else {
//                             let len = menuList.push(item);
//                             let childrenArr = [];
//                             childrenArr = item.children.filter(child => {
//                                 if (child.access !== undefined) {
//                                     if (child.access === accessCode) {
//                                         return child;
//                                     }
//                                 } else {
//                                     return child;
//                                 }
//                             });
//                             menuList[len - 1].children = childrenArr;
//                         }
//                     }
//                 } else {
//                     if (item.children.length === 1) {
//                         menuList.push(item);
//                     } else {
//                         let len = menuList.push(item);
//                         let childrenArr = [];
//                         childrenArr = item.children.filter(child => {
//                             if (child.access !== undefined) {
//                                 if (Util.showThisRoute(child.access, accessCode)) {
//                                     return child;
//                                 }
//                             } else {
//                                 return child;
//                             }
//                         });
//                         if (childrenArr === undefined || childrenArr.length === 0) {
//                             menuList.splice(len - 1, 1);
//                         } else {
//                             let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
//                             handledItem.children = childrenArr;
//                             menuList.splice(len - 1, 1, handledItem);
//                         }
//                     }
//                 }
//             });
//             state.menuList = menuList;
//         },
//         changeMenuTheme (state, theme) {
//             state.menuTheme = theme;
//         },
//         changeMainTheme (state, mainTheme) {
//             state.themeColor = mainTheme;
//         },
//         addOpenSubmenu (state, name) {
//             let hasThisName = false;
//             let isEmpty = false;
//             if (name.length === 0) {
//                 isEmpty = true;
//             }
//             if (state.openedSubmenuArr.indexOf(name) > -1) {
//                 hasThisName = true;
//             }
//             if (!hasThisName && !isEmpty) {
//                 state.openedSubmenuArr.push(name);
//             }
//         },
//         closePage (state, name) {
//             state.cachePage.forEach((item, index) => {
//                 if (item === name) {
//                     state.cachePage.splice(index, 1);
//                 }
//             });
//         },
//         initCachepage (state) {
//             if (localStorage.cachePage) {
//                 state.cachePage = JSON.parse(localStorage.cachePage);
//             }
//         },
//         removeTag (state, name) {
//             state.pageOpenedList.map((item, index) => {
//                 if (item.name === name) {
//                     state.pageOpenedList.splice(index, 1);
//                 }
//             });
//         },
//         pageOpenedList (state, get) {
//             let openedPage = state.pageOpenedList[get.index];
//             if (get.argu) {
//                 openedPage.argu = get.argu;
//             }
//             if (get.query) {
//                 openedPage.query = get.query;
//             }
//             state.pageOpenedList.splice(get.index, 1, openedPage);
//             localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
//         },
//         clearAllTags (state) {
//             state.pageOpenedList.splice(1);
//             state.cachePage.length = 0;
//             localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
//         },
//         clearOtherTags (state, vm) {
//             let currentName = vm.$route.name;
//             let currentIndex = 0;
//             state.pageOpenedList.forEach((item, index) => {
//                 if (item.name === currentName) {
//                     currentIndex = index;
//                 }
//             });
//             if (currentIndex === 0) {
//                 state.pageOpenedList.splice(1);
//             } else {
//                 state.pageOpenedList.splice(currentIndex + 1);
//                 state.pageOpenedList.splice(1, currentIndex - 1);
//             }
//             let newCachepage = state.cachePage.filter(item => {
//                 return item === currentName;
//             });
//             state.cachePage = newCachepage;
//             localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
//         },
//         setOpenedList (state) {
//             state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
//         },
//         setCurrentPath (state, pathArr) {
//             state.currentPath = pathArr;
//         },
//         setCurrentPageName (state, name) {
//             state.currentPageName = name;
//         },
//         setAvator (state, path) {
//             localStorage.avatorImgPath = path;
//         },
//         switchLang (state, lang) {
//             state.lang = lang;
//             Vue.config.lang = lang;
//         },
//         clearOpenedSubmenu (state) {
//             state.openedSubmenuArr.length = 0;
//         },
//         setMessageCount (state, count) {
//             state.messageCount = count;
//         },
//         increateTag (state, tagObj) {
//             if (!Util.oneOf(tagObj.name, state.dontCache)) {
//                 state.cachePage.push(tagObj.name);
//                 localStorage.cachePage = JSON.stringify(state.cachePage);
//             }
//             state.pageOpenedList.push(tagObj);
//             localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
//         }
//     }
// };

// export default app;
