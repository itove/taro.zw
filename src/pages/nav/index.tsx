import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import Search from '../../icons/search.png'
import Grid from '../../icons/grid.png'

function Index() {
  return (
    <View className="">
      <View className="top">
        <View className="icon">
          <img src={Search} />
        </View>
        <View className="item active"> 景点 </View>
        <View className="item"> 卫生间 </View>
        <View className="item"> 出入口 </View>
        <View className="item"> 服务点 </View>
        <View className="icon">
          <img src={Grid} />
        </View>
      </View>
    </View>
  )
}

export default Index
