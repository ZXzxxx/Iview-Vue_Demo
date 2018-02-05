// <script>
// export default {
//     name: 'themeSwitch',
//     data () {
//         return {
//             themeList: [
//                 {
//                     name: 'black_b',
//                     menu: '#495060',
//                     element: '#2d8cf0'
//                 },
//                 {
//                     name: 'black_g',
//                     menu: '#495060',
//                     element: '#00a854'
//                 },
//                 {
//                     name: 'black_y',
//                     menu: '#495060',
//                     element: '#e96500'
//                 },
//                 {
//                     name: 'black_r',
//                     menu: '#495060',
//                     element: '#e43e31'
//                 },
//                 {
//                     name: 'light_b',
//                     menu: '#495060',
//                     element: '#2d8cf0'
//                 },
//                 {
//                     name: 'light_g',
//                     menu: '#495060',
//                     element: '#00a854'
//                 },
//                 {
//                     name: 'light_y',
//                     menu: '#495060',
//                     element: '#e96500'
//                 },
//                 {
//                     name: 'light_r',
//                     menu: '#495060',
//                     element: '#e43e31'
//                 }
//             ]
//         };
//     },
//     methods: {
//         setTheme (themeFile) {
//             let menuTheme = themeFile.substr(0, 1);
//             let mainTheme = themeFile.substr(-1, 1);
//             if (menuTheme === 'b') {
//                 // 黑色菜单
//                 this.$store.commit('changeMenuTheme', 'dark');
//                 menuTheme = 'dark';
//             } else {
//                 this.$store.commit('changeMenuTheme', 'light');
//                 menuTheme = 'light';
//             }
//             let path = '';
//             let themeLink = document.querySelector('link[name="theme"]');
//             let userName = Cookies.get('user');
//             if (localStorage.theme) {
//                 let themeList = JSON.parse(localStorage.theme);
//                 let index = 0;
//                 let hasThisUser = themeList.some((item, i) => {
//                     if (item.userName === userName) {
//                         index = i;
//                         return true;
//                     } else {
//                         return false;
//                     }
//                 });
//                 if (hasThisUser) {
//                     themeList[index].mainTheme = mainTheme;
//                     themeList[index].menuTheme = menuTheme;
//                 } else {
//                     themeList.push({
//                         userName: userName,
//                         mainTheme: mainTheme,
//                         menuTheme: menuTheme
//                     });
//                 }
//                 localStorage.theme = JSON.stringify(themeList);
//             } else {
//                 localStorage.theme = JSON.stringify([{
//                     userName: userName,
//                     mainTheme: mainTheme,
//                     menuTheme: menuTheme
//                 }]);
//             }
//             let stylePath = '';
//             if (config.env.indexOf('dev') > -1) {
//                 stylePath = './src/views/main-components/theme-switch/theme/';
//             } else {
//                 stylePath = 'dist/';
//             }
//             if (mainTheme !== 'b') {
//                 path = stylePath + mainTheme + '.css';
//             } else {
//                 path = '';
//             }
//             themeLink.setAttribute('href', path);
//         }
//     },
// </script>
