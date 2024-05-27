export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/leyou/index',
    'pages/nav/index',
    'pages/me/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0FB99F',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
    backgroundColor: '#ed7373', // 窗口的背景色 WTF? https://taro-docs.jd.com/docs/app-config#window
  },
  tabBar: {
    // custom: true,
    color: '#808080',
    selectedColor: '#0FB99F',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        "pagePath": "pages/index/index",
        "text": "走进东沟",
        "iconPath": './icons/hill.png',
        "selectedIconPath": './icons/hill-fill.png',
      },
      {
        "pagePath": "pages/leyou/index",
        "text": "乐游东沟",
        "iconPath": './icons/hill-river.png',
        "selectedIconPath": './icons/hill-river-fill.png'
      },
      {
        "pagePath": "pages/nav/index",
        "text": "智慧导览",
        "iconPath": './icons/pavilion.png',
        "selectedIconPath": './icons/pavilion-fill.png'
      },
      {
        "pagePath": "pages/me/index",
        "text": "个人中心",
        "iconPath": './icons/user.png',
        "selectedIconPath": './icons/user-fill.png'
      },
    ]
  }
})
