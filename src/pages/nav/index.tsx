import React, { useState, useEffect } from 'react'
import { View, WebView, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)
  const url = 'https://map.vjingkeji.com/%E6%B1%9F%E8%A5%BF%E9%BE%99%E5%8D%97'
  const url0 = Env.baseUrl + 'map'

  useEffect(() => {
  }, [])

  return (
    <View className="">
      <View className="top">
        <View className="icon">
          <img src={Env.iconUrl + 'search.png'} />
        </View>
        <View className="item active"> 景点 </View>
        <View className="item"> 卫生间 </View>
        <View className="item"> 出入口 </View>
        <View className="item"> 服务点 </View>
        <View className="icon">
          <img src={Env.iconUrl + 'gird.png'} />
        </View>
      </View>
      // <WebView src={url0} />
    </View>
  )
}

export default Index
