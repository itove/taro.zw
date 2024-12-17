export default defineAppConfig({
  pages: [
  'pages/index/index',
  'pages/wenti/index',
  'pages/jing/index',
  'pages/meishi/index',
  'pages/zhu/index',
  'pages/wan/index',
  'pages/caizhai/index',
  'pages/service/index',
  'pages/techan/index',
  'pages/shangchao/index',
  'pages/loc/index',
  'pages/discover/index',
  'pages/user/index',
  'pages/nav/index',
  'pages/me/info',
  'pages/node/index',
  'pages/explore/index',
  'pages/me/index',
  'pages/me/name',
  'pages/me/setting',
  'pages/search/index',
  'pages/search/result',
  'pages/feedback/index',
  'pages/feedback/new',
  'pages/me/login',
  'pages/node/show',
  'pages/node/rate',
  'pages/node/show0',
  'pages/fav/index',
  'pages/list/index',
  'pages/list/card',
  'pages/list/grid',
  'pages/youji/index',
  'pages/youji/new',
  'pages/youji/edit',
  'pages/youji/show',
  ],


  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#ed7373' // 窗口的背景色 WTF? https://taro-docs.jd.com/docs/app-config#window
  },
  tabBar: {
    // custom: true,
    color: '#999999',
    selectedColor: '#7E9CF4',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
    {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": './icons/home.png',
      "selectedIconPath": './icons/home-fill.png'
    },
    {
      "pagePath": "pages/nav/index",
      "text": "探索",
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
      "pagePath": "pages/me/index",
      "text": "我的",
      "iconPath": './icons/user.png',
      "selectedIconPath": './icons/user-fill.png'
    }]

  },
  requiredPrivateInfos: [
  "getLocation"],

  permission: {
    'scope.userLocation': {
      desc: "你的位置信息将用于显示景点距离"
    }
  },
  lazyCodeLoading: 'requiredComponents'
});
