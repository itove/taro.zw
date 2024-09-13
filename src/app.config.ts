export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/loc/index',
    'pages/discover/index',
    'pages/user/index',
    'pages/nav/index',
    'pages/me/info',
    'pages/node/index',
    'pages/leyou/index',
    'pages/me/index',
    'pages/me/name',
    'pages/me/setting',
    'pages/feedback/index',
    'pages/me/login',
    'pages/node/show',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
    backgroundColor: '#ed7373', // 窗口的背景色 WTF? https://taro-docs.jd.com/docs/app-config#window
  },
  tabBar: {
    // custom: true,
    color: '#c9cad6',
    selectedColor: '#2b7afb',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": './icons/home.png',
        "selectedIconPath": './icons/home-fill.png',
      },
      {
        "pagePath": "pages/leyou/index",
        "text": "定位",
        "iconPath": './icons/loc.png',
        "selectedIconPath": './icons/loc-fill.png'
      },
      {
        "pagePath": "pages/discover/index",
        "text": "发现",
        "iconPath": './icons/discover.png',
        "selectedIconPath": './icons/discover-fill.png'
      },
      {
        "pagePath": "pages/user/index",
        "text": "我的",
        "iconPath": './icons/user.png',
        "selectedIconPath": './icons/user-fill.png'
      },
    ]
  },
 requiredPrivateInfos: [
   "getLocation",
 ],
 permission: {
   'scope.userLocation': {
     desc: "你的位置信息将用于显示景点距离"
   }
 },
 lazyCodeLoading: 'requiredComponents',
})
