import React, { useState, useEffect } from 'react'
import { View, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'
import { Popup } from '@nutui/nutui-react-taro'


function Index() {
  const [showPop, setShowPop] = useState(false)

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
    </View>
  )
}

export default Index
